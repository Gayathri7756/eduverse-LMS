'use client';
import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import Link from 'next/link';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const { data } = await apiClient.get('/subjects');
        setSubjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubjects();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/subjects/${subject.id}`}>
            <div className="rounded-xl border bg-white shadow hover:shadow-lg transition-shadow overflow-hidden">
              <img src={subject.thumbnail || '/placeholder.jpg'} alt={subject.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{subject.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{subject.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
