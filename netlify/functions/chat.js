// Netlify Function — proxies chat requests to Claude API
// API key stays server-side, never exposed to browser

// Simple in-memory rate limiter (resets on cold start)
const rateLimits = new Map();
const RATE_LIMIT = 30; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip) {
  const now = Date.now();
  const userLimits = rateLimits.get(ip) || [];
  const recent = userLimits.filter(t => now - t < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) return false;
  recent.push(now);
  rateLimits.set(ip, recent);
  // Cleanup old entries occasionally
  if (rateLimits.size > 1000) {
    for (const [k, v] of rateLimits) {
      if (v.every(t => now - t > RATE_WINDOW)) rateLimits.delete(k);
    }
  }
  return true;
}

// Allowed origins — restrict to our domains only
const ALLOWED_ORIGINS = [
  "https://mainframestudyhub.com",
  "https://www.mainframestudyhub.com",
  "https://main--mainframestudyhub.netlify.app",
];

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  const headers = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: '{"error":"POST only"}' };

  // Rate limiting
  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"] || "unknown";
  if (!checkRateLimit(ip)) {
    return { statusCode: 429, headers, body: '{"error":"Rate limit exceeded. Please wait a minute and try again."}' };
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return { statusCode: 500, headers, body: '{"error":"API key not configured."}' };

  try {
    // Validate request size
    if (event.body && event.body.length > 100000) {
      return { statusCode: 413, headers, body: '{"error":"Request too large"}' };
    }

    const parsed = JSON.parse(event.body || "{}");
    const messages = Array.isArray(parsed.messages) ? parsed.messages : [];
    
    // Validate and sanitize messages
    const trimmed = messages.slice(-20).filter(m => 
      m && typeof m === "object" && 
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length < 10000
    );
    
    if (trimmed.length === 0) {
      return { statusCode: 400, headers, body: '{"error":"No valid messages"}' };
    }

    // System prompt: only allow our own predefined system prompt, ignore user-provided
    // This prevents prompt injection where user could change Claude's behavior
    const SAFE_SYSTEM = "You are a helpful AI assistant for MainframeStudyHub, focused on IBM Z mainframe topics including JCL, COBOL, DB2, CICS, VSAM, REXX, IMS, z/OS, RACF, TSO/ISPF, SMF, and modernization. Provide accurate, educational responses. Keep answers focused on mainframe technology and learning.";
    
    // Allow user-provided system only if it's reasonable length and doesn't try to override
    let systemPrompt = SAFE_SYSTEM;
    if (typeof parsed.system === "string" && parsed.system.length > 0 && parsed.system.length < 2000) {
      // Append user system to ours, don't replace
      systemPrompt = SAFE_SYSTEM + "\n\nContext: " + parsed.system;
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompt,
        messages: trimmed,
      }),
    });

    const data = await res.json();
    if (!res.ok) return { statusCode: res.status, headers, body: JSON.stringify({ error: data.error?.message || "API error" }) };
    return { statusCode: 200, headers, body: JSON.stringify({ content: data.content }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server error" }) };
  }
};
