'use client';
import React from 'react';
import { ChevronDown, ChevronRight, PlayCircle, Lock } from 'lucide-react';
import Link from 'next/link';

export default function SubjectSidebar({ tree, currentVideoId, subjectId }: any) {
  return (
    <div className="w-80 h-full border-r bg-white overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{tree.title}</h2>
      </div>
      <div className="p-2">
        {tree.sections?.map((section: any) => (
          <div key={section.id} className="mb-4">
            <div className="flex items-center px-4 py-2 font-semibold text-gray-700">
              <ChevronDown className="mr-2 h-4 w-4" />
              {section.title}
            </div>
            <div className="ml-6 mt-1 space-y-1">
              {section.videos?.map((video: any) => (
                <Link
                  key={video.id}
                  href={!video.locked ? `/subjects/${subjectId}/video/${video.id}` : '#'}
                  className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                    video.id === currentVideoId
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : !video.locked
                      ? 'text-gray-600 hover:bg-gray-100'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {!video.locked ? (
                    <PlayCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <Lock className="mr-2 h-4 w-4 text-gray-300" />
                  )}
                  <span className="truncate">{video.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
