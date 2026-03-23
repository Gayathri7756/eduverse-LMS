import { create } from 'zustand';
import apiClient from '@/lib/apiClient';

interface VideoNode {
  id: string;
  title: string;
  locked: boolean;
  isCompleted: boolean;
}

interface SectionNode {
  id: string;
  title: string;
  videos: VideoNode[];
}

interface Tree {
  id: string;
  title: string;
  sections: SectionNode[];
}

interface SidebarState {
  tree: Tree | null;
  loading: boolean;
  error: string | null;
  fetchTree: (subjectId: string) => Promise<void>;
  markVideoCompleted: (videoId: string) => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  tree: null,
  loading: false,
  error: null,
  fetchTree: async (subjectId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get(`/subjects/${subjectId}/tree`);
      set({ tree: data });
    } catch (err: any) {
      set({ error: 'Failed to load course structure' });
    } finally {
      set({ loading: false });
    }
  },
  markVideoCompleted: (videoId) => {
    const tree = get().tree;
    if (!tree) return;

    const newSections = tree.sections.map((section) => ({
      ...section,
      videos: section.videos.map((video) => {
        if (video.id === videoId) return { ...video, isCompleted: true };
        return video;
      }),
    }));
    
    // Note: Re-calculating locks in the store is possible, 
    // but usually handled by a fresh fetchTree after substantial progress.
    set({ tree: { ...tree, sections: newSections } });
  },
}));
