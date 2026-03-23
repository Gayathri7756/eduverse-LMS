'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import VideoPlayer from '@/components/Video/VideoPlayer';
import { useSidebarStore } from '@/store/sidebarStore';
import { ChevronRight, ChevronLeft, Lock } from 'lucide-react';

export default function VideoPage() {
  const { videold, subjectid } = useParams();
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fetchTree = useSidebarStore((s) => s.fetchTree);

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/videos/${videold}`)
      .then(({ data }) => setVideo(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [videold]);

  const handleCompleted = () => {
    // Refresh sidebar to unlock next video
    fetchTree(subjectid as string);
    if (video?.nextVideoId) {
      router.push(`/subjects/${subjectid}/video/${video.nextVideoId}`);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full">Loading video...</div>;
  if (!video) return <div>Video not found</div>;

  if (video.locked) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <div className="p-4 bg-slate-900/50 rounded-full border border-slate-800">
          <Lock size={48} className="text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold">Content Locked</h2>
        <p className="text-slate-400 max-w-sm">
          {video.unlockReason || 'Please complete the previous videos to unlock this content.'}
        </p>
        <button 
          onClick={() => router.back()}
          className="text-blue-400 hover:underline flex items-center gap-1"
        >
          <ChevronLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <VideoPlayer 
        videoId={video.id}
        youtubeUrl={video.youtubeUrl}
        initialTime={0} // Ideally fetch from progress endpoint as well
        onCompleted={handleCompleted}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold">{video.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{video.sectionTitle}</p>
        </div>
        <div className="flex gap-4">
          {video.prevVideoId && (
            <button 
              onClick={() => router.push(`/subjects/${subjectid}/video/${video.prevVideoId}`)}
              className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={18} /> Prev
            </button>
          )}
          {video.nextVideoId && (
            <button 
              onClick={() => router.push(`/subjects/${subjectid}/video/${video.nextVideoId}`)}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Next <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="glass p-8 rounded-2xl">
        <h3 className="text-lg font-bold mb-4">About this lesson</h3>
        <p className="text-slate-300 leading-relaxed">{video.description || 'No description provided.'}</p>
      </div>
    </div>
  );
}
