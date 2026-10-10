
import { useEffect, useState } from "react";
import { BarChart3, CheckCircle2, Clock3, ListTodo } from "lucide-react";
import api from "../services/api";

export default function Reports() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/tasks")
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.tasks || response.data.data || [];
        setTasks(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Report data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  const normalize = (status) =>
    String(status || "todo").toLowerCase().replace(/[\s_-]/g, "");

  const completed = tasks.filter((task) =>
    ["completed", "done"].includes(normalize(task.status))
  ).length;

  const inProgress = tasks.filter((task) =>
    ["inprogress", "progress"].includes(normalize(task.status))
  ).length;

  const todo = tasks.filter((task) =>
    ["todo", "pending", "notstarted"].includes(normalize(task.status))
  ).length;

  const stats = [
    { label: "Total Tasks", value: tasks.length, icon: ListTodo, color: "text-indigo-600 bg-indigo-50" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "In Progress", value: inProgress, icon: Clock3, color: "text-blue-600 bg-blue-50" },
    { label: "To Do", value: todo, icon: BarChart3, color: "text-amber-600 bg-amber-50" },
  ];

  const categories = [
    { label: "Completed", value: completed, color: "bg-emerald-500" },
    { label: "In Progress", value: inProgress, color: "bg-blue-500" },
    { label: "To Do", value: todo, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-indigo-600">INSIGHTS</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Reports & Analytics
        </h1>
        <p className="mt-2 text-slate-500">
          Understand your task status and overall progress.
        </p>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <Icon size={23} />
              </div>
              <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {loading ? "—" : stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Task Distribution</h2>
        <p className="mt-1 text-sm text-slate-500">
          Breakdown of tasks by current status.
        </p>

        {loading ? (
          <p className="py-8 text-sm text-slate-500">Loading report...</p>
        ) : tasks.length === 0 ? (
          <p className="py-8 text-sm text-slate-500">
            No tasks available to generate a report.
          </p>
        ) : (
          <div className="mt-6 space-y-6">
            {categories.map((item) => {
              const percentage = Math.round((item.value / tasks.length) * 100);

              return (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-500">
                      {item.value} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
