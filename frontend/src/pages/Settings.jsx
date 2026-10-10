
import { useState } from "react";
import { Settings as SettingsIcon, Bell, Palette, ShieldCheck, Save } from "lucide-react";

const defaultSettings = {
  emailNotifications: true,
  taskReminders: true,
  weeklySummary: false,
  compactMode: false,
};

export default function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      return {
        ...defaultSettings,
        ...JSON.parse(localStorage.getItem("taskflowSettings") || "{}"),
      };
    } catch {
      return defaultSettings;
    }
  });

  const [saved, setSaved] = useState(false);

  const toggleSetting = (name) => {
    setSettings((current) => ({
      ...current,
      [name]: !current[name],
    }));
    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem("taskflowSettings", JSON.stringify(settings));
    setSaved(true);
  };

  const options = [
    {
      name: "emailNotifications",
      title: "Email Notifications",
      description: "Receive updates about your workspace.",
    },
    {
      name: "taskReminders",
      title: "Task Reminders",
      description: "Keep reminders for tasks on your preference list.",
    },
    {
      name: "weeklySummary",
      title: "Weekly Summary",
      description: "Include a weekly productivity summary preference.",
    },
    {
      name: "compactMode",
      title: "Compact Mode",
      description: "Save your preference for a more compact layout.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <div>
        <p className="text-sm font-medium text-indigo-600">PREFERENCES</p>
        <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate-900">
          <SettingsIcon className="text-indigo-600" /> Settings
        </h1>
        <p className="mt-2 text-slate-500">
          Manage your TaskFlow preferences.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
            <Bell size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Notifications</h2>
            <p className="text-sm text-slate-500">
              Choose which notification preferences you want.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {options.slice(0, 3).map((option) => (
            <div
              key={option.name}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  {option.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {option.description}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={settings[option.name]}
                onClick={() => toggleSetting(option.name)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  settings[option.name] ? "bg-indigo-600" : "bg-slate-300"
                }`}
                aria-label={option.title}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    settings[option.name] ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
            <Palette size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Appearance</h2>
            <p className="text-sm text-slate-500">
              Manage display preferences.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 py-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Compact Mode
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Save a preference for a more compact layout.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.compactMode}
            onClick={() => toggleSetting("compactMode")}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              settings.compactMode ? "bg-indigo-600" : "bg-slate-300"
            }`}
            aria-label="Compact Mode"
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                settings.compactMode ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-600" size={24} />
          <div>
            <h2 className="font-bold text-slate-900">Account Security</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your protected pages require a login token.
            </p>
          </div>
        </div>
      </section>

      {saved && (
        <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
          Preferences saved in this browser.
        </p>
      )}

      <button
        onClick={saveSettings}
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        <Save size={18} /> Save Settings
      </button>
    </div>
  );
}
