-- Allow unauthenticated inserts for development (single-user scenario)
-- This allows testing save functionality without authentication
CREATE POLICY "Allow unauthenticated project creation for development"
ON public.projects
FOR INSERT
WITH CHECK (user_id IS NULL);

-- Allow viewing projects without user_id for development
CREATE POLICY "Allow viewing projects without user_id for development"
ON public.projects
FOR SELECT
USING (user_id IS NULL);

-- Allow updating projects without user_id for development
CREATE POLICY "Allow updating projects without user_id for development"
ON public.projects
FOR UPDATE
USING (user_id IS NULL);

-- Allow deleting projects without user_id for development
CREATE POLICY "Allow deleting projects without user_id for development"
ON public.projects
FOR DELETE
USING (user_id IS NULL);