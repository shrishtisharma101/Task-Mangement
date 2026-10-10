
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  KanbanSquare,
  FolderKanban,
  Users,
  ChartNoAxesCombined,
  Bell,
  UserRound,
  Settings,
  LogOut,
  CheckSquare,
} from "lucide-react";

const menuGroups = [
  {
    title: "WORKSPACE",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "My Tasks", path: "/tasks", icon: ListTodo },
      { name: "Calendar", path: "/calendar", icon: CalendarDays },
      { name: "Board View", path: "/board", icon: KanbanSquare },
      { name: "Projects", path: "/projects", icon: FolderKanban },
      { name: "Team Members", path: "/team", icon: Users },
    ],
  },
  {
    title: "INSIGHTS",
    items: [
      {
        name: "Reports & Analytics",
        path: "/reports",
        icon: ChartNoAxesCombined,
      },
      { name: "Notifications", path: "/notifications", icon: Bell },
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      { name: "My Profile", path: "/profile", icon: UserRound },
      { name: "Settings", path: "/settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
    }`;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white">

      {/* Fixed Logo */}
      <div className="shrink-0 px-4 pb-5 pt-5">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <CheckSquare size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              TaskFlow
            </h1>
            <p className="text-[10px] font-semibold tracking-widest text-slate-400">
              TASK MANAGEMENT
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation and Card */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-4">
        <nav className="space-y-7">
          {menuGroups.map((group) => (
            <section key={group.title}>
              <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-400">
                {group.title}
              </p>

              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={linkClass}
                    >
                      <Icon size={19} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        {/* Productivity Card */}
        <div className="mt-7 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-4 text-white">
          <h3 className="text-sm font-bold">Stay Productive!</h3>

          <p className="mt-2 text-xs leading-5 text-indigo-100">
            Organize your tasks and achieve your daily goals.
          </p>

          <NavLink
            to="/tasks"
            className="mt-4 block rounded-lg bg-white px-3 py-2 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-50"
          >
            View My Tasks
          </NavLink>
        </div>
      </div>

      {/* Fixed Logout */}
      <div className="shrink-0 border-t border-slate-100 bg-white p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
