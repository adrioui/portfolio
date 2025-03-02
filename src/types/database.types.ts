
// This file defines TypeScript types that match our Supabase database schema

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  ascii_art: string;
  demo_link: string;
  stress_level: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type ProjectEmoji = {
  id: string;
  project_id: string;
  icon: string;
  meaning: string;
}

export type ProjectMetric = {
  id: string;
  project_id: string;
  label: string;
  value: string;
  is_component: boolean;
}

export type ProjectTechStack = {
  id: string;
  project_id: string;
  name: string;
  level: number;
  comment: string;
  snippet: string | null;
}

export type ProjectProblem = {
  id: string;
  project_id: string;
  issue: string;
  solution: string;
}

export type ProjectChallenge = {
  id: string;
  project_id: string;
  title: string;
  status: 'OPEN' | 'CLOSED' | 'WONTFIX' | 'PATCHED';
  description: string | null;
}

export type Skill = {
  id: string;
  name: string;
  level: number;
  humorous_label: string;
  category: 'LANGUAGE' | 'TOOL' | 'FRAMEWORK' | 'OTHER';
  user_id: string;
}

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  featured_image: string | null;
  excerpt: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export type Profile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  job_title: string;
  location: string;
  bio: string;
  twitter_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
}

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
      };
      project_emojis: {
        Row: ProjectEmoji;
        Insert: Omit<ProjectEmoji, 'id'>;
        Update: Partial<Omit<ProjectEmoji, 'id'>>;
      };
      project_metrics: {
        Row: ProjectMetric;
        Insert: Omit<ProjectMetric, 'id'>;
        Update: Partial<Omit<ProjectMetric, 'id'>>;
      };
      project_tech_stack: {
        Row: ProjectTechStack;
        Insert: Omit<ProjectTechStack, 'id'>;
        Update: Partial<Omit<ProjectTechStack, 'id'>>;
      };
      project_problems: {
        Row: ProjectProblem;
        Insert: Omit<ProjectProblem, 'id'>;
        Update: Partial<Omit<ProjectProblem, 'id'>>;
      };
      project_challenges: {
        Row: ProjectChallenge;
        Insert: Omit<ProjectChallenge, 'id'>;
        Update: Partial<Omit<ProjectChallenge, 'id'>>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, 'id'>;
        Update: Partial<Omit<Skill, 'id'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'read'>;
        Update: Partial<Omit<ContactMessage, 'id' | 'created_at'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
