import { createClient } from "@supabase/supabase-js";

// ═══════════════════════════════════════════════════════════
// SUPABASE CONFIGURATION — Replace with your project keys
// Get these from: https://supabase.com/dashboard → Settings → API
// ═══════════════════════════════════════════════════════════
const SUPABASE_URL = "https://xnvxdnltimsmlelpyxeq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhudnhkbmx0aW1zbWxlbHB5eGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMzcyMjAsImV4cCI6MjA4NzkxMzIyMH0.PFEldS3f6MgegbF5FfnujP5I59kAnFnvXvGzr-vgh9o";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
