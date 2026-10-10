import { Users, Mail, Search } from "lucide-react";
import { useState } from "react";

const members = [
  { name: "Alex Morgan", role: "Project Manager", email: "alex@example.com", color: "bg-indigo-100 text-indigo-700" },
  { name: "Sarah Wilson", role: "Frontend Developer", email: "sarah@example.com", color: "bg-pink-100 text-pink-700" },
  { name: "David Miller", role: "Backend Developer", email: "david@example.com", color: "bg-blue-100 text-blue-700" },
  { name: "Emily Davis", role: "UI/UX Designer", email: "emily@example.com", color: "bg-amber-100 text-amber-700" },
];

export default function Team() {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.role} ${member.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-indigo-600">
          COLLABORATION
        </p>

        <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate-900">
          <Users className="text-indigo-600" />
          Team Members
        </h1>

        <p className="mt-2 text-slate-500">
          View your team and their roles.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search team members..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        <p className="text-sm text-slate-500">
          Total members: {filteredMembers.length}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Member
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  Email
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr
                  key={member.email}
                  className="transition hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold ${member.color}`}
                      >
                        {member.name.charAt(0)}
                      </div>

                      <span className="font-semibold text-slate-900">
                        {member.name}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm text-indigo-700">
                      {member.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Mail size={16} className="shrink-0" />
                      <span>{member.email}</span>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMembers.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3">
          <p className="text-xs text-slate-500">
            Showing {filteredMembers.length} of {members.length} members
          </p>
        </div>
      </div>
    </div>
  );
}