import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduVerse LMS",
  description: "A production-ready learning management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600">EduVerse</Link>
            <div className="space-x-4">
              <Link href="/subjects" className="text-gray-600 hover:text-indigo-600">Courses</Link>
              <Link href="/login" className="text-gray-600 hover:text-indigo-600">Sign In</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
