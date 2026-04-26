-- ════════════════════════════════════════════════════════════
-- SECURITY HARDENING — RUN IN SUPABASE SQL EDITOR
-- Fixes RLS policies that were too permissive
-- ════════════════════════════════════════════════════════════

-- ─── 1. Fix QA Posts: only owner or vote RPC can update ───
DROP POLICY IF EXISTS "Anyone can update posts" ON public.qa_posts;

CREATE POLICY "Users can update own posts"
  ON public.qa_posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Voting still works because vote_post() uses SECURITY DEFINER
-- and updates only the votes column with proper validation

-- ─── 2. Fix QA Answers: only owner or vote RPC can update ───
DROP POLICY IF EXISTS "Anyone can update answers" ON public.qa_answers;

CREATE POLICY "Users can update own answers"
  ON public.qa_answers
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── 3. Add DELETE policies (only owner can delete) ───
DROP POLICY IF EXISTS "Users can delete own posts" ON public.qa_posts;
CREATE POLICY "Users can delete own posts"
  ON public.qa_posts
  FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own answers" ON public.qa_answers;
CREATE POLICY "Users can delete own answers"
  ON public.qa_answers
  FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own messages" ON public.chat_messages;
CREATE POLICY "Users can delete own messages"
  ON public.chat_messages
  FOR DELETE
  USING (auth.uid() = sender_id);

-- ─── 4. Restrict feedback insert to authenticated or anon with rate ───
-- Feedback table — allow inserts from anyone but with size limits
ALTER TABLE public.feedback ALTER COLUMN message TYPE varchar(5000);
ALTER TABLE public.feedback ALTER COLUMN name TYPE varchar(200);
ALTER TABLE public.feedback ALTER COLUMN email TYPE varchar(320);

-- ─── 5. Length constraints to prevent DOS via huge messages ───
ALTER TABLE public.chat_messages 
  ADD CONSTRAINT chat_message_length CHECK (char_length(text) <= 5000);

ALTER TABLE public.qa_posts 
  ADD CONSTRAINT post_title_length CHECK (char_length(title) <= 300),
  ADD CONSTRAINT post_body_length CHECK (char_length(body) <= 20000);

ALTER TABLE public.qa_answers 
  ADD CONSTRAINT answer_body_length CHECK (char_length(body) <= 20000);

ALTER TABLE public.user_blogs
  ADD CONSTRAINT blog_title_length CHECK (char_length(title) <= 300),
  ADD CONSTRAINT blog_content_length CHECK (char_length(content) <= 100000);

-- ─── 6. Verify all RLS is enabled ───
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- All tables should show rowsecurity = true
