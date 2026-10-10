
import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Clock3,
  Info,
  Trash2,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Welcome to TaskFlow",
    message: "Your workspace is ready. Start organizing your tasks.",
    time: "Just now",
    read: false,
    icon: Info,
  },
  {
    id: 2,
    title: "Stay on track",
    message: "Review your pending tasks and plan your next steps.",
    time: "Today",
    read: false,
    icon: Clock3,
  },
  {
    id: 3,
    title: "Productivity tip",
    message: "Break large tasks into smaller, manageable steps.",
    time: "Earlier",
    read: true,
    icon: Check,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const markAllRead = () => {
    setNotifications((items) =>
      items.map((item) => ({ ...item, read: true }))
    );
  };

  const markRead = (id) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">UPDATES</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate-900">
            <Bell className="text-indigo-600" /> Notifications
          </h1>
          <p className="mt-2 text-slate-500">
            Stay updated with your workspace.
          </p>
        </div>

        <button
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          <CheckCheck size={18} /> Mark all as read
        </button>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <p className="text-sm text-slate-500">
            {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="mx-auto text-slate-300" size={34} />
            <p className="mt-3 font-semibold text-slate-800">You're all caught up!</p>
            <p className="mt-1 text-sm text-slate-500">No notifications to show.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className={`flex gap-4 p-5 ${item.read ? "" : "bg-indigo-50/50"}`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-slate-900">{item.title}</h2>
                      {!item.read && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{item.message}</p>
                    <p className="mt-2 text-xs text-slate-400">{item.time}</p>
                  </div>

                  <div className="flex items-start gap-1">
                    {!item.read && (
                      <button
                        onClick={() => markRead(item.id)}
                        title="Mark as read"
                        className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-indigo-600"
                      >
                        <Check size={17} />
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(item.id)}
                      title="Delete notification"
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
