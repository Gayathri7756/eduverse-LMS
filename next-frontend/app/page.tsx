'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import Link from 'next/link';

export default function HomePage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/subjects')
      .then(({ data }) => setSubjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">Courses</h1>
      {loading ? (
        <div className="flex justify-center py-20">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <Link 
              key={subject.id} 
              href={`/subjects/${subject.id}`}
              className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer group"
            >
              <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400">{subject.title}</h2>
              <p className="text-slate-400 line-clamp-3">{subject.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
