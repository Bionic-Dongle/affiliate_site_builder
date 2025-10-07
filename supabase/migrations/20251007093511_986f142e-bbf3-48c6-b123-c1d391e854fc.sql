-- Create directory entries table
CREATE TABLE public.directory_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  category TEXT,
  rating NUMERIC(2,1),
  website TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  google_place_id TEXT,
  raw_data JSONB,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.directory_entries ENABLE ROW LEVEL SECURITY;

-- Users can view their own directory entries
CREATE POLICY "Users can view their own directory entries"
ON public.directory_entries
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = directory_entries.project_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can create directory entries for their projects
CREATE POLICY "Users can create directory entries"
ON public.directory_entries
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = directory_entries.project_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can update their own directory entries
CREATE POLICY "Users can update their own directory entries"
ON public.directory_entries
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = directory_entries.project_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can delete their own directory entries
CREATE POLICY "Users can delete their own directory entries"
ON public.directory_entries
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = directory_entries.project_id
    AND projects.user_id = auth.uid()
  )
);

-- Anyone can view published directory entries
CREATE POLICY "Anyone can view published directory entries"
ON public.directory_entries
FOR SELECT
USING (published = true);

-- Add trigger for updated_at
CREATE TRIGGER update_directory_entries_updated_at
BEFORE UPDATE ON public.directory_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();