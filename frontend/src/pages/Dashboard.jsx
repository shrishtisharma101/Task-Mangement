
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckSquare,
  Clock3,
  CircleDashed,
  ListTodo,
  Plus,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import api from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/tasks");

        const taskData = Array.isArray(response.data)
          ? response.data
          : response.data?.tasks || response.data?.data || [];

        setTasks(taskData);
      } catch (err) {
        console.error("Dashboard tasks error:", err);
        setError("Tasks load nahi ho paaye. Please refresh karke try karein.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatus = (task) =>
    String(task.status || "todo")
      .toLowerCase()
      .replace(/[\s_-]/g, "");

  const completedTasks = tasks.filter((task) =>
    ["completed", "done"].includes(getStatus(task))
  ).length;

  const inProgressTasks = tasks.filter((task) =>
    ["inprogress", "progress"].includes(getStatus(task))
  ).length;

  const todoTasks = tasks.filter((task) =>
    ["todo", "pending", "notstarted"].includes(getStatus(task))
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      iconStyle: "bg-indigo-100 text-indigo-600",
      description: "All your tasks",
    },
    {
      title: "To Do",
      value: todoTasks,
      icon: CircleDashed,
      iconStyle: "bg-amber-100 text-amber-600",
      description: "Waiting to start",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock3,
      iconStyle: "bg-blue-100 text-blue-600",
      description: "Currently working",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      iconStyle: "bg-emerald-100 text-emerald-600",
      description: "Successfully finished",
    },
  ];

  const getStatusStyle = (status) => {
    const normalized = String(status || "todo")
      .toLowerCase()
      .replace(/[\s_-]/g, "");

    if (["completed", "done"].includes(normalized)) {
      return "bg-emerald-50 text-emerald-700";
    }

    if (["inprogress", "progress"].includes(normalized)) {
      return "bg-blue-50 text-blue-700";
    }

    return "bg-amber-50 text-amber-700";
  };

  const formatDate = (date) => {
    if (!date) return "No due date";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "No due date";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.name ? user.name.split(" ")[0] : "there";

  const completionPercentage =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  return (
    <div className="w-full min-w-0 space-y-6 overflow-x-hidden">
      {/* Welcome Section */}
      <section className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold tracking-wider text-indigo-600 sm:text-sm">
            YOUR WORKSPACE
          </p>

          <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {firstName}!
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's an overview of your tasks and productivity.
          </p>
        </div>

        <Link
          to="/tasks"
          className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:px-5"
        >
          <Plus size={18} />
          Manage Tasks
        </Link>
      </section>

      {/* Statistics Cards */}
      <section className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
                >
                  <Icon size={22} />
                </div>

                <span className="text-[10px] font-semibold tracking-wider text-slate-400 sm:text-xs">
                  OVERVIEW
                </span>
              </div>

              <p className="mt-4 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {loading ? "—" : stat.value}
                </h2>

                <p className="text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Task Progress */}
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Task Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your overall completion.
            </p>
          </div>

          <span className="text-2xl font-bold text-indigo-600">
            {loading ? "—" : `${completionPercentage}%`}
          </span>
        </div>

        <div
          className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={loading ? 0 : completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion progress"
        >
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{
              width: loading ? "0%" : `${completionPercentage}%`,
            }}
          />
        </div>

        <p className="mt-3 text-xs text-slate-500">
          {loading
            ? "Loading progress..."
            : `${completedTasks} of ${tasks.length} tasks completed`}
        </p>
      </section>

      {/* Recent Tasks */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A quick look at your latest work.
            </p>
          </div>

          <Link
            to="/tasks"
            className="inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View all tasks
            <ArrowRight size={16} />
          </Link>
        </div>

        {error && (
          <div className="m-4 rounded-xl bg-red-50 p-4 text-sm text-red-700 sm:m-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Loading tasks...
          </div>
        ) : !error && tasks.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <CheckSquare size={30} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900">
              No tasks yet
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Your tasks will appear here once you create them.
            </p>

            <Link
              to="/tasks"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={17} />
              Go to Tasks
            </Link>
          </div>
        ) : (
          !error && (
            <div className="divide-y divide-slate-100">
              {tasks.slice(0, 5).map((task, index) => (
                <div
                  key={task._id || task.id || index}
                  className="flex min-w-0 flex-col gap-3 px-4 py-4 transition hover:bg-slate-50 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 shrink-0 rounded-lg bg-indigo-50 p-2 text-indigo-600">
                      <CheckSquare size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold text-slate-800">
                        {task.title || task.name || "Untitled Task"}
                      </h3>

                      <p className="mt-1 line-clamp-2 break-words text-sm text-slate-500">
                        {task.description || "No description available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-wrap items-center gap-3 pl-11 lg:shrink-0 lg:pl-0">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(task.status)}`}
                    >
                      {task.status || "To Do"}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays size={14} className="shrink-0" />
                      {formatDate(task.dueDate || task.deadline)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </section>
    </div>
  );
}
