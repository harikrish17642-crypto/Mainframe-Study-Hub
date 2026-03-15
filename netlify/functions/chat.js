// Netlify Function — proxies chat requests to Claude API
// API key stays server-side, never exposed to browser
exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: '{"error":"POST only"}' };

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return { statusCode: 500, headers, body: '{"error":"API key not configured. Go to Netlify Site settings → Environment variables → Add ANTHROPIC_API_KEY"}' };

  try {
    const { messages, system } = JSON.parse(event.body);
    const trimmed = (messages || []).slice(-20);

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
        system: system || "",
        messages: trimmed,
      }),
    });

    const data = await res.json();
    if (!res.ok) return { statusCode: res.status, headers, body: JSON.stringify({ error: data.error?.message || "API error" }) };
    return { statusCode: 200, headers, body: JSON.stringify({ content: data.content }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
