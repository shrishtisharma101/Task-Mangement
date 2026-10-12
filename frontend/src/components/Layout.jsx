
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Fixed Sidebar */}
      <aside className="h-full shrink-0 overflow-hidden">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Fixed Navbar */}
        <header className="z-20 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-4 sm:px-5 md:px-8">
          <span className="font-semibold text-slate-700">
            Task Management
          </span>

          <div className="ml-auto truncate pl-3 text-sm text-slate-500">
            Welcome, {user.name || "User"}
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
