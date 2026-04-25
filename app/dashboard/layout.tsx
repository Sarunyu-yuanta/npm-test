import { ReactNode } from "react";
import { Sidebar } from "./_components/sidebar";
import { Topbar } from "./_components/topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <div className="flex-1 bg-default-secondary">{children}</div>
      </div>
    </div>
  );
}
