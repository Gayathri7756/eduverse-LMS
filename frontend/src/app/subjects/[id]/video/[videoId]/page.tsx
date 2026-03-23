'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import YouTube from 'react-youtube';
import apiClient from '@/lib/apiClient';
import SubjectSidebar from '@/components/SubjectSidebar';

export default function VideoPlayerPage() {
  const { id: subjectId, videoId } = useParams();
  const [tree, setTree] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await apiClient.get(`/subjects/${subjectId}/tree`);
        setTree(data);
        const video = data.sections.flatMap((s: any) => s.videos).find((v: any) => v.id === videoId);
        setCurrentVideo(video);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [subjectId, videoId]);

  useEffect(() => {
    if (!currentVideo || !videoId) return;

    const heartbeat = setInterval(async () => {
      const player = (window as any).ytPlayer; // Assume we can get player instance or use state
      if (player && player.getPlayerState() === 1) { // 1 = playing
        const currentTime = player.getCurrentTime();
        try {
          await apiClient.post(`/progress/videos/${videoId}`, { lastPosition: currentTime });
        } catch (err) {
          console.error('Heartbeat failed:', err);
        }
      }
    }, 15000);

    return () => clearInterval(heartbeat);
  }, [videoId, currentVideo]);

  const onVideoEnd = async () => {
    try {
      await apiClient.post(`/progress/videos/${videoId}`, { status: 'COMPLETED' });
      // Go to next video
      if (currentVideo?.nextVideoId) {
        router.push(`/subjects/${subjectId}/video/${currentVideo.nextVideoId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onReady = (event: any) => {
    (window as any).ytPlayer = event.target;
  };

  const onStateChange = async (event: any) => {
    // Optional: immediate save on pause or state change
    if (event.data === 2) { // Paused
      const currentTime = event.target.getCurrentTime();
      await apiClient.post(`/progress/videos/${videoId}`, { lastPosition: currentTime });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!tree || !currentVideo) return <div>Video not found or locked.</div>;

  return (
    <div className="flex h-screen bg-white">
      <SubjectSidebar tree={tree} currentVideoId={videoId} subjectId={subjectId} />
      <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <YouTube
              videoId={currentVideo.url.split('v=')[1] || currentVideo.url}
              opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1 } }}
              onReady={onReady}
              onEnd={onVideoEnd}
              onStateChange={onStateChange}
              className="w-full h-full"
            />
          </div>
          <div className="mt-8">
            <h1 className="text-2xl font-bold text-gray-900">{currentVideo.title}</h1>
            <p className="mt-4 text-gray-600">{currentVideo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
