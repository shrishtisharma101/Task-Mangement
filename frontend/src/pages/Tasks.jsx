
import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, X, ListTodo } from "lucide-react";
import api from "../services/api";

const initialForm = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  dueDate: "",
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/tasks", {
        params: {
          search: search || undefined,
          status: statusFilter || undefined,
          priority: priorityFilter || undefined,
        },
      });

      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, statusFilter, priorityFilter]);

  const openCreateForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
    setNotice("");
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });

    setEditingId(task._id);
    setError("");
    setNotice("");
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...form,
        dueDate: form.dueDate || null,
      };

      if (editingId) {
        await api.put(`/tasks/${editingId}`, payload);
        setNotice("Task updated successfully");
      } else {
        await api.post("/tasks", payload);
        setNotice("Task created successfully");
      }

      setForm(initialForm);
      setEditingId(null);
      setShowForm(false);

      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save task");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await api.delete(`/tasks/${id}`);
      setNotice("Task deleted successfully");
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete task");
    }
  };

  const handleStatusChange = async (task, status) => {
    setError("");
    setNotice("");

    try {
      await api.put(`/tasks/${task._id}`, { status });
      await loadTasks();
      setNotice("Task status updated");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update status");
    }
  };

  const priorityClass = (priority) => {
    if (priority === "High") return "bg-red-50 text-red-700";
    if (priority === "Medium") return "bg-amber-50 text-amber-700";
    return "bg-emerald-50 text-emerald-700";
  };

  const statusClass = (status) => {
    if (status === "Completed") return "bg-emerald-50 text-emerald-700";
    if (status === "In Progress") return "bg-blue-50 text-blue-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">My Tasks</h1>
          <p className="mt-2 text-sm text-slate-500">
            Create, organize and track your work.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} /> Add Task
        </button>
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {notice && (
        <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
          {notice}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-indigo-500"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Task" : "Create New Task"}
            </h2>

            <button
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
              aria-label="Close form"
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Task Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Create login page"
                required
                maxLength={150}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your task..."
                rows={3}
                className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-indigo-500"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-indigo-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-end gap-3">
              <button
                disabled={saving}
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Task"
                    : "Create Task"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-300 px-4 py-3 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-bold">All Tasks ({tasks.length})</h2>
        </div>

        {loading ? (
          <p className="p-8 text-center text-slate-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <div className="p-12 text-center">
            <ListTodo size={42} className="mx-auto mb-3 text-slate-300" />
            <p className="font-semibold">No tasks found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing the filters or create a new task.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex flex-col gap-4 p-5 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="break-words font-semibold">{task.title}</h3>

                  {task.description && (
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-500">
                      {task.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClass(task.priority)}`}>
                      {task.priority} Priority
                    </span>

                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(task.status)}`}>
                      {task.status}
                    </span>

                    {task.dueDate && (
                      <span className="text-xs text-slate-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label={`Change status for ${task.title}`}
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                    className="max-w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm"
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>

                  <button
                    onClick={() => openEditForm(task)}
                    aria-label={`Edit ${task.title}`}
                    className="rounded-lg border border-slate-200 p-2 text-indigo-600 hover:bg-indigo-50"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDelete(task._id)}
                    aria-label={`Delete ${task.title}`}
                    className="rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
