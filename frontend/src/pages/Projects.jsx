
import { FolderKanban, Plus, ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Website Development",
    description: "Plan and track website development activities.",
    progress: 65,
    status: "In Progress",
    color: "bg-indigo-600",
  },
  {
    name: "UI/UX Improvements",
    description: "Improve the user experience and interface.",
    progress: 40,
    status: "In Progress",
    color: "bg-blue-600",
  },
  {
    name: "Project Documentation",
    description: "Organize requirements and technical documents.",
    progress: 100,
    status: "Completed",
    color: "bg-emerald-600",
  },
];

export default function Projects() {
  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">WORKSPACE</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Projects</h1>
          <p className="mt-2 text-slate-500">
            Organize your work and monitor project progress.
          </p>
        </div>

        <button
          onClick={() => alert("Project creation API abhi connect nahi hai.")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <FolderKanban size={24} />
              </div>
              <ArrowUpRight size={19} className="text-slate-400" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              {project.name}
            </h2>
            <p className="mt-2 min-h-10 text-sm leading-6 text-slate-500">
              {project.description}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Progress
              </span>
              <span className="text-sm font-bold text-slate-800">
                {project.progress}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${project.color}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {project.status}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
