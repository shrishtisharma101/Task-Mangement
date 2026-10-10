
import { useEffect, useState } from "react";
import { LayoutGrid, CircleDashed, Clock3, CheckCircle2 } from "lucide-react";
import api from "../services/api";

const columns = [
  { title: "To Do", status: "todo", icon: CircleDashed, color: "amber" },
  { title: "In Progress", status: "inprogress", icon: Clock3, color: "blue" },
  { title: "Completed", status: "completed", icon: CheckCircle2, color: "emerald" },
];

export default function Board() {
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
        setError("Tasks load nahi ho paaye.");
      })
      .finally(() => setLoading(false));
  }, []);

  const normalize = (status) =>
    String(status || "todo").toLowerCase().replace(/[\s_-]/g, "");

  const belongsToColumn = (task, status) => {
    const value = normalize(task.status);
    if (status === "todo") {
      return ["todo", "pending", "notstarted"].includes(value);
    }
    if (status === "inprogress") {
      return ["inprogress", "progress"].includes(value);
    }
    return ["completed", "done"].includes(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">WORKSPACE</p>
        <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate-900">
          <LayoutGrid className="text-indigo-600" /> Board View
        </h1>
        <p className="mt-2 text-slate-500">
          See your tasks grouped by their current status.
        </p>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <p className="p-8 text-center text-slate-500">Loading board...</p>
      ) : (
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
          {columns.map((column) => {
            const Icon = column.icon;
            const items = tasks.filter((task) =>
              belongsToColumn(task, column.status)
            );

            return (
              <section
                key={column.status}
                className="rounded-2xl bg-slate-100 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-bold text-slate-800">
                    <Icon size={19} />
                    {column.title}
                  </h2>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600">
                    {items.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((task, index) => (
                    <article
                      key={task._id || task.id || index}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <h3 className="font-semibold text-slate-800">
                        {task.title || task.name || "Untitled Task"}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {task.description || "No description"}
                      </p>
                      <p className="mt-4 text-xs text-slate-400">
                        Due: {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString("en-IN")
                          : "Not set"}
                      </p>
                    </article>
                  ))}

                  {items.length === 0 && (
                    <p className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-400">
                      No tasks in this column
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
