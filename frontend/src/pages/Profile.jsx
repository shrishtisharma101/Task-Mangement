
import { useState } from "react";
import { UserRound, Mail, Save } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    setUser((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <div>
        <p className="text-sm font-medium text-indigo-600">ACCOUNT</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-2 text-slate-500">
          View and update your account details.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-indigo-600 shadow-sm">
            {(user.name || "U").charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-xl font-bold text-white">
            {user.name || "Your Name"}
          </h2>
          <p className="mt-1 text-sm text-indigo-100">
            {user.email || "No email available"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="email"
                type="email"
                value={user.email || ""}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {saved && (
            <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              Profile details saved in this browser.
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Save size={18} /> Save Changes
          </button>
        </form>
      </section>
    </div>
  );
}
