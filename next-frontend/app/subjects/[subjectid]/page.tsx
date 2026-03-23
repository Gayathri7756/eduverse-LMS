'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';

export default function SubjectPage() {
  const { subjectid } = useParams();
  const router = useRouter();

  useEffect(() => {
    // Fetch the tree to find the first unlocked/uncompleted video
    apiClient.get(`/subjects/${subjectid}/tree`)
      .then(({ data }) => {
        const firstUnlocked = data.sections
          .flatMap((s: any) => s.videos)
          .find((v: any) => !v.locked && !v.isCompleted) 
          || data.sections[0]?.videos[0];

        if (firstUnlocked) {
          router.replace(`/subjects/${subjectid}/video/${firstUnlocked.id}`);
        }
      })
      .catch(console.error);
  }, [subjectid, router]);

  return (
    <div className="flex items-center justify-center h-full">
      Redirecting to course content...
    </div>
  );
}
