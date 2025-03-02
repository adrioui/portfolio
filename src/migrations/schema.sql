
-- Note: This is the SQL schema that would be used in Supabase
-- You can use this as a reference for creating your tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create auth schema if it doesn't exist (Supabase usually creates this)
CREATE SCHEMA IF NOT EXISTS auth;

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  job_title TEXT,
  location TEXT,
  bio TEXT,
  twitter_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  overview TEXT NOT NULL,
  ascii_art TEXT,
  demo_link TEXT,
  stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Project emojis
CREATE TABLE public.project_emojis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  icon TEXT NOT NULL,
  meaning TEXT NOT NULL
);

-- Project metrics
CREATE TABLE public.project_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  is_component BOOLEAN DEFAULT FALSE
);

-- Project tech stack
CREATE TABLE public.project_tech_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  snippet TEXT
);

-- Project problems
CREATE TABLE public.project_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  issue TEXT NOT NULL,
  solution TEXT NOT NULL
);

-- Project challenges
CREATE TABLE public.project_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('OPEN', 'CLOSED', 'WONTFIX', 'PATCHED')),
  description TEXT
);

-- Skills table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 5),
  humorous_label TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('LANGUAGE', 'TOOL', 'FRAMEWORK', 'OTHER')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  featured_image TEXT,
  excerpt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_blog_posts_user_id ON public.blog_posts(user_id);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_project_emojis_project_id ON public.project_emojis(project_id);
CREATE INDEX idx_project_metrics_project_id ON public.project_metrics(project_id);
CREATE INDEX idx_project_tech_stack_project_id ON public.project_tech_stack(project_id);
CREATE INDEX idx_project_problems_project_id ON public.project_problems(project_id);
CREATE INDEX idx_project_challenges_project_id ON public.project_challenges(project_id);
CREATE INDEX idx_skills_category ON public.skills(category);
CREATE INDEX idx_contact_messages_read ON public.contact_messages(read);

-- Row-level security policies
-- Only authenticated users can insert/update their own data

-- Projects RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to create projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Similar RLS policies for other tables
-- (I've abbreviated this section, but in practice you would create
-- similar policies for each table as shown above)

-- Functions
-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update timestamps
CREATE TRIGGER update_projects_modtime
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_blog_posts_modtime
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
