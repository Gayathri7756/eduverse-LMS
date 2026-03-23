'use client';

import YouTube, { YouTubeProps } from 'react-youtube';
import { useVideoStore } from '@/store/videoStore';
import { useEffect, useRef } from 'react';
import apiClient from '@/lib/apiClient';

interface Props {
  videoId: string;
  youtubeUrl: string;
  initialTime: number;
  onCompleted: () => void;
}

export default function VideoPlayer({ videoId, youtubeUrl, initialTime, onCompleted }: Props) {
  const updateProgress = useVideoStore((s) => s.updateProgress);
  const markCompleted = useVideoStore((s) => s.markCompleted);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Extract ID from URL if needed (minimalist helper)
  const getYTId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+\/|\/ytscreeningroom\?v=))([\w\-]{11})/);
    return match ? match[1] : url;
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      intervalRef.current = setInterval(async () => {
        const time = event.target.getCurrentTime();
        const duration = event.target.getDuration();
        updateProgress(time, duration);
        
        // Auto-save progress every 15s
        if (Math.floor(time) % 15 === 0) {
          apiClient.post(`/progress/videos/${videoId}`, {
            lastPosSec: Math.floor(time),
            isCompleted: false,
          }).catch(console.error);
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const onEnd = async () => {
    await markCompleted();
    onCompleted();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      start: Math.floor(initialTime),
    },
  };

  return (
    <div className="aspect-video w-full rounded-2xl overflow-hidden glass shadow-2xl">
      <YouTube
        videoId={getYTId(youtubeUrl)}
        opts={opts}
        onStateChange={onStateChange}
        onEnd={onEnd}
        className="w-full h-full"
      />
    </div>
  );
}
