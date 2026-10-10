
import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const changeMonth = (amount) => {
    setCurrentDate(new Date(year, month + amount, 1));
  };

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">PLANNING</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Calendar</h1>
        <p className="mt-2 text-slate-500">
          View dates and plan your work.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{monthName}</h2>

          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              className="rounded-lg border p-2 hover:bg-slate-50"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="rounded-lg border p-2 hover:bg-slate-50"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-3 text-center text-xs font-semibold text-slate-400"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: firstDay }, (_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {Array.from({ length: totalDays }, (_, index) => {
            const day = index + 1;

            return (
              <button
                key={day}
                onClick={() =>
                  setCurrentDate(new Date(year, month, day))
                }
                className={`flex min-h-12 items-center justify-center rounded-xl text-sm transition sm:min-h-16 ${
                  isToday(day)
                    ? "bg-indigo-600 font-bold text-white"
                    : "text-slate-700 hover:bg-indigo-50"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-indigo-50 p-4">
          <CalendarDays className="mt-0.5 text-indigo-600" size={20} />
          <div>
            <p className="font-semibold text-slate-800">
              {currentDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Calendar date selected. Task scheduling can be connected to your
              backend next.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
