
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";

export default function Layout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", { replace: true });

      Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

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

          <div className="ml-auto flex items-center gap-3 pl-3">
            <span className="truncate text-sm text-slate-500">
              Welcome, {user.name || "User"}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              Logout
            </button>
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
