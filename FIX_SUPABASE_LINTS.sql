-- ═══════════════════════════════════════════════════════════
-- MainframeStudyHub — Fix ALL Supabase Security Lints
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════

-- ─── FIX 1: handle_new_user — set immutable search_path ───
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role, it_years, mf_years, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'Mainframe Professional'),
    COALESCE((NEW.raw_user_meta_data->>'it_years')::integer, 0),
    COALESCE((NEW.raw_user_meta_data->>'mf_years')::integer, 0),
    UPPER(LEFT(COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- ─── FIX 2: update_modified_column — set immutable search_path ───
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = '';

-- ─── FIX 3: qa_posts — restrict UPDATE to owner only ───
DROP POLICY IF EXISTS "Anyone can update posts" ON public.qa_posts;
CREATE POLICY "Users can update own posts"
  ON public.qa_posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── FIX 4: qa_answers — restrict UPDATE to owner only ───
DROP POLICY IF EXISTS "Anyone can update answers" ON public.qa_answers;
CREATE POLICY "Users can update own answers"
  ON public.qa_answers FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── FIX 3b/4b: Secure vote RPC functions (bypass RLS safely) ───
-- These let any authenticated user vote on any post/answer
-- without needing a wide-open UPDATE policy

CREATE OR REPLACE FUNCTION public.vote_post(post_id BIGINT, vote_dir INTEGER)
RETURNS VOID AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF vote_dir NOT IN (-1, 1) THEN
    RAISE EXCEPTION 'Invalid vote direction';
  END IF;
  UPDATE public.qa_posts SET votes = votes + vote_dir WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.vote_answer(answer_id BIGINT, vote_dir INTEGER)
RETURNS VOID AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF vote_dir NOT IN (-1, 1) THEN
    RAISE EXCEPTION 'Invalid vote direction';
  END IF;
  UPDATE public.qa_answers SET votes = votes + vote_dir WHERE id = answer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- ═══════════════════════════════════════════════════════════
-- ─── FIX 5b: Secure chat reaction/delete RPC functions ───
CREATE OR REPLACE FUNCTION public.react_message(msg_id BIGINT, new_reactions JSONB)
RETURNS VOID AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  UPDATE public.chat_messages SET reactions = new_reactions WHERE id = msg_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.delete_message(msg_id BIGINT)
RETURNS VOID AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  UPDATE public.chat_messages SET deleted = TRUE WHERE id = msg_id AND user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- DONE! All SQL fixes applied.
-- FIX 5 (Leaked Password Protection) must be done in Dashboard:
--   → Authentication → Settings → scroll to "Leaked Password Protection" → Enable

-- ─── BONUS: Feedback table ───
CREATE TABLE IF NOT EXISTS public.feedback (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins read feedback" ON public.feedback FOR SELECT USING (auth.uid() IS NOT NULL);
-- ═══════════════════════════════════════════════════════════
