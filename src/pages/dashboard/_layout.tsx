// src/pages/dashboard/_layout.tsx
import { Sidebar } from "@/components/Dashboard/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
