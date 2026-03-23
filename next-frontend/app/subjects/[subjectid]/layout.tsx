import SubjectSidebar from "@/components/Sidebar/SubjectSidebar";
import AuthGuard from "@/components/Auth/AuthGuard";

export default function SubjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { subjectid: string };
}) {
  return (
    <AuthGuard>
      <div className="flex h-[calc(100vh-80px)] overflow-hidden">
        <SubjectSidebar subjectId={params.subjectid} />
        <div className="flex-grow overflow-y-auto bg-slate-950/50 p-6">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
