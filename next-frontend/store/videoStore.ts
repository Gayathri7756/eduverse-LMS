import { create } from 'zustand';
import apiClient from '@/lib/apiClient';

interface VideoState {
  currentVideoId: string | null;
  subjectId: string | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isCompleted: boolean;
  nextVideoId: string | null;
  prevVideoId: string | null;
  setVideo: (videoId: string, subjectId: string) => void;
  updateProgress: (time: number, duration: number) => void;
  markCompleted: () => Promise<void>;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  currentVideoId: null,
  subjectId: null,
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  isCompleted: false,
  nextVideoId: null,
  prevVideoId: null,
  
  setVideo: (videoId, subjectId) => {
    set({ currentVideoId: videoId, subjectId, currentTime: 0, isCompleted: false });
  },

  updateProgress: async (time, duration) => {
    const { currentVideoId, isCompleted } = get();
    set({ currentTime: time, duration });

    // Periodically sync with backend (e.g. every 10 seconds or on pause)
    // For simplicity here, we'll let the component handle the interval/debounce
  },

  markCompleted: async () => {
    const { currentVideoId, duration } = get();
    if (!currentVideoId) return;

    try {
      await apiClient.post(`/progress/videos/${currentVideoId}`, {
        lastPosSec: Math.floor(duration),
        isCompleted: true,
      });
      set({ isCompleted: true });
    } catch (err) {
      console.error('Failed to mark video as completed', err);
    }
  },
}));
