
// Helper functions for database operations
import { supabase } from '@/lib/supabase';
import type { Project, Skill } from '@/types/database.types';

// Projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_emojis(*),
      project_metrics(*),
      project_tech_stack(*),
      project_problems(*),
      project_challenges(*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data || [];
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_emojis(*),
      project_metrics(*),
      project_tech_stack(*),
      project_problems(*),
      project_challenges(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    return null;
  }
  
  return data;
}

// Skills
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  
  return data || [];
}

// Blog posts
export async function getBlogPosts(limit = 10, includeUnpublished = false) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (!includeUnpublished) {
    query = query.eq('published', true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data || [];
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
  
  return data;
}

// Contact messages
export async function submitContactMessage(message: { name: string; email: string; message: string }) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{
      ...message,
      read: false,
      created_at: new Date().toISOString()
    }]);
  
  if (error) {
    console.error('Error submitting contact message:', error);
    return false;
  }
  
  return true;
}

// Profile
export async function getProfileData() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single();
  
  if (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
  
  return data;
}
