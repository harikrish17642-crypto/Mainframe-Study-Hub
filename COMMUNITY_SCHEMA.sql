-- ═══════════════════════════════════════════════════════════
-- MainframeStudyHub V6.5 — Community Tables
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

-- 1. COMMUNITY CHAT MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_role TEXT DEFAULT 'Member',
  sender_color TEXT DEFAULT '#0071e3',
  sender_emoji TEXT DEFAULT '🧑‍💻',
  msg_type TEXT DEFAULT 'text' CHECK (msg_type IN ('text','job','doubt','thought','system','poll')),
  content TEXT NOT NULL,
  reply_to BIGINT REFERENCES public.chat_messages(id) ON DELETE SET NULL,
  poll_options JSONB,
  reactions JSONB DEFAULT '{}',
  deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;
CREATE POLICY "Anyone can read chat messages"
  ON public.chat_messages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert messages" ON public.chat_messages;
CREATE POLICY "Authenticated users can insert messages"
  ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update own messages" ON public.chat_messages;
CREATE POLICY "Users can update own messages"
  ON public.chat_messages FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- 2. Q&A POSTS
CREATE TABLE IF NOT EXISTS public.qa_posts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  title TEXT NOT NULL,
  body TEXT,
  topic TEXT DEFAULT 'General',
  votes INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.qa_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read posts" ON public.qa_posts;
CREATE POLICY "Anyone can read posts"
  ON public.qa_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.qa_posts;
CREATE POLICY "Authenticated users can insert posts"
  ON public.qa_posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can update posts" ON public.qa_posts;
CREATE POLICY "Anyone can update posts"
  ON public.qa_posts FOR UPDATE USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.qa_posts;

-- 3. Q&A ANSWERS
CREATE TABLE IF NOT EXISTS public.qa_answers (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT REFERENCES public.qa_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  body TEXT NOT NULL,
  votes INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.qa_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read answers" ON public.qa_answers;
CREATE POLICY "Anyone can read answers"
  ON public.qa_answers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert answers" ON public.qa_answers;
CREATE POLICY "Authenticated users can insert answers"
  ON public.qa_answers FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can update answers" ON public.qa_answers;
CREATE POLICY "Anyone can update answers"
  ON public.qa_answers FOR UPDATE USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.qa_answers;

-- 4. ONLINE PRESENCE (tracks who's online)
CREATE TABLE IF NOT EXISTS public.user_presence (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  role TEXT,
  emoji TEXT DEFAULT '🧑‍💻',
  color TEXT DEFAULT '#0071e3',
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_presence ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read presence" ON public.user_presence;
CREATE POLICY "Anyone can read presence"
  ON public.user_presence FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can upsert own presence" ON public.user_presence;
CREATE POLICY "Users can upsert own presence"
  ON public.user_presence FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own presence" ON public.user_presence;
CREATE POLICY "Users can update own presence"
  ON public.user_presence FOR UPDATE USING (auth.uid() = user_id);

-- 5. SEED MESSAGES (optional — add some starter content)
INSERT INTO public.chat_messages (sender_name, sender_role, sender_color, sender_emoji, msg_type, content)
VALUES
  ('MainframeStudyHub', 'System', '#0071e3', '🖥️', 'system', 'Welcome to MainframeStudyHub Community! Start sharing, learning, and growing together.'),
  ('MainframeStudyHub', 'Admin', '#00b365', '👑', 'text', 'Welcome everyone! 🎉 This is our space to learn, share, post jobs & help each other grow in the mainframe world. All messages here are real and visible to everyone!'),
  ('MainframeStudyHub', 'Admin', '#00b365', '👑', 'thought', 'COBOL is experiencing a renaissance — banks desperately need devs who understand legacy systems. Golden opportunity for anyone willing to learn!')
ON CONFLICT DO NOTHING;

-- 6. USER BLOGS
CREATE TABLE IF NOT EXISTS public.user_blogs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  author TEXT,
  author_role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.user_blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read blogs" ON public.user_blogs FOR SELECT USING (true);
CREATE POLICY "Auth users can insert blogs" ON public.user_blogs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own blogs" ON public.user_blogs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own blogs" ON public.user_blogs FOR DELETE USING (auth.uid() = user_id);

-- 7. USER DATA (key-value store for streaks, daily challenges, weekly cache)
CREATE TABLE IF NOT EXISTS public.user_data (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, key)
);
ALTER TABLE public.user_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own data" ON public.user_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own data" ON public.user_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own data" ON public.user_data FOR UPDATE USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════
-- 6. USER BLOGS
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.user_blogs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  author TEXT NOT NULL,
  author_role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.user_blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read blogs" ON public.user_blogs FOR SELECT USING (true);
CREATE POLICY "Auth users can insert blogs" ON public.user_blogs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete own blogs" ON public.user_blogs FOR DELETE USING (auth.uid() = user_id);

-- 7. USER PROGRESS (quiz, streaks, daily challenge, weekly cache)
CREATE TABLE IF NOT EXISTS public.user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, key)
);
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users upsert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own progress" ON public.user_progress FOR DELETE USING (auth.uid() = user_id);
