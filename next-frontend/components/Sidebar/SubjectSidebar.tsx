'use client';

import { useEffect } from 'react';
import { useSidebarStore } from '@/store/sidebarStore';
import { Lock, PlayCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SubjectSidebar({ subjectId }: { subjectId: string }) {
  const { tree, loading, fetchTree } = useSidebarStore();
  const params = useParams();
  const currentVideoId = params.videold;

  useEffect(() => {
    fetchTree(subjectId);
  }, [subjectId, fetchTree]);

  if (loading && !tree) return <div className="w-80 border-r border-slate-800 p-4">Loading structure...</div>;
  if (!tree) return null;

  return (
    <div className="w-80 border-r border-slate-800 flex flex-col h-full bg-slate-900/30 overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <h2 className="font-bold text-lg">{tree.title}</h2>
      </div>
      <div className="flex-grow">
        {tree.sections.map((section) => (
          <div key={section.id} className="mb-4">
            <div className="px-6 py-3 bg-slate-800/20 text-xs font-bold uppercase tracking-widest text-slate-500">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.videos.map((video) => {
                const isActive = currentVideoId === video.id;
                return (
                  <Link
                    key={video.id}
                    href={video.locked ? '#' : `/subjects/${subjectId}/video/${video.id}`}
                    className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                      isActive ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-slate-800/40 text-slate-300'
                    } ${video.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {video.locked ? (
                      <Lock size={16} />
                    ) : video.isCompleted ? (
                      <CheckCircle size={16} className="text-emerald-400" />
                    ) : (
                      <PlayCircle size={16} />
                    )}
                    <span className="text-sm truncate">{video.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
