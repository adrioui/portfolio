
import { useState, useEffect } from 'react';
import { 
  getProjects, 
  getProjectById, 
  getSkills, 
  getBlogPosts, 
  getBlogPostBySlug,
  getProfileData 
} from '@/utils/db-helpers';
import type { 
  Project, 
  Skill, 
  BlogPost, 
  Profile 
} from '@/types/database.types';
import { useToast } from '@/components/ui/use-toast';

// Hook to fetch all projects
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error in useProjects:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
        toast({
          title: "Error fetching projects",
          description: "There was a problem loading the projects data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [toast]);

  return { projects, loading, error };
}

// Hook to fetch a single project by ID
export function useProject(id: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProject() {
      if (!id) {
        setProject(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getProjectById(id);
        setProject(data);
        setError(null);
      } catch (err) {
        console.error(`Error in useProject for id ${id}:`, err);
        setError(err instanceof Error ? err : new Error(`Failed to fetch project with id ${id}`));
        toast({
          title: "Error fetching project",
          description: "There was a problem loading the project data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id, toast]);

  return { project, loading, error };
}

// Hook to fetch all skills
export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        const data = await getSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        console.error('Error in useSkills:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch skills'));
        toast({
          title: "Error fetching skills",
          description: "There was a problem loading the skills data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, [toast]);

  return { skills, loading, error };
}

// Hook to fetch blog posts
export function useBlogPosts(limit = 10, includeUnpublished = false) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        const data = await getBlogPosts(limit, includeUnpublished);
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error in useBlogPosts:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
        toast({
          title: "Error fetching blog posts",
          description: "There was a problem loading the blog posts.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, [limit, includeUnpublished, toast]);

  return { posts, loading, error };
}

// Hook to fetch a single blog post by slug
export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) {
        setPost(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getBlogPostBySlug(slug);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error(`Error in useBlogPost for slug ${slug}:`, err);
        setError(err instanceof Error ? err : new Error(`Failed to fetch blog post with slug ${slug}`));
        toast({
          title: "Error fetching blog post",
          description: "There was a problem loading the blog post.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug, toast]);

  return { post, loading, error };
}

// Hook to fetch profile data
export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const data = await getProfileData();
        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error in useProfile:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch profile data'));
        toast({
          title: "Error fetching profile",
          description: "There was a problem loading the profile data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [toast]);

  return { profile, loading, error };
}
