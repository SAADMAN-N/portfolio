"use client";

import {
  AlignJustify,
  Calendar,
  Check,
  Flag,
  Inbox,
  Info,
  ListPlus,
  PanelLeft,
  Plus,
  Search,
} from "lucide-react";
import { memo, useMemo, useState } from "react";
import { getCompletedCount, remindersData } from "../data/remindersData";

const PANEL = {
  TODAY: "today",
  SCHEDULED: "scheduled",
  ALL: "all",
  FLAGGED: "flagged",
  COMPLETED: "completed",
  MY_LIST: "mylist",
};

const shellStyle = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(0,0,0,0.22)",
  boxShadow:
    "0 20px 40px rgba(0,0,0,0.45), 0 8px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
};

const fontSans =
  'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif';

function TrafficLights({ onMinimize }) {
  return (
    <div className="flex items-center gap-1.5" role="presentation">
      <button
        type="button"
        title="Close"
        aria-label="Close (decorative)"
        className="h-3 w-3 shrink-0 rounded-full border border-black/15 bg-[#ff5f57] shadow-sm"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        title="Minimize"
        aria-label="Minimize Reminders"
        className="h-3 w-3 shrink-0 rounded-full border border-black/15 bg-[#febc2e] shadow-sm"
        onClick={(e) => {
          e.stopPropagation();
          onMinimize?.();
        }}
      />
      <button
        type="button"
        title="Zoom"
        aria-label="Zoom (decorative)"
        className="h-3 w-3 shrink-0 rounded-full border border-black/15 bg-[#28c840] shadow-sm"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function filterForPanel(panel) {
  switch (panel) {
    case PANEL.TODAY:
      return remindersData.filter((r) => r.category === "today");
    case PANEL.SCHEDULED:
      return remindersData.filter((r) => r.category === "scheduled");
    case PANEL.ALL:
    case PANEL.MY_LIST:
      return [...remindersData];
    case PANEL.FLAGGED:
      return remindersData.filter((r) => r.priority === "high");
    case PANEL.COMPLETED:
      return remindersData.filter((r) => r.completed);
    default:
      return [...remindersData];
  }
}

function titleForPanel(panel) {
  switch (panel) {
    case PANEL.TODAY:
      return "Today";
    case PANEL.SCHEDULED:
      return "Scheduled";
    case PANEL.ALL:
      return "All";
    case PANEL.FLAGGED:
      return "Flagged";
    case PANEL.COMPLETED:
      return "Completed";
    case PANEL.MY_LIST:
      return "Reminders";
    default:
      return "Reminders";
  }
}

const Reminders = memo(function Reminders({
  position = { top: 200, left: 600 },
  isMinimized = false,
  onMinimize,
}) {
  const [panel, setPanel] = useState(PANEL.TODAY);

  const counts = useMemo(() => {
    const today = remindersData.filter((r) => r.category === "today").length;
    const scheduled = remindersData.filter(
      (r) => r.category === "scheduled",
    ).length;
    const flagged = remindersData.filter((r) => r.priority === "high").length;
    return {
      today,
      scheduled,
      all: remindersData.length,
      flagged,
      completed: getCompletedCount(),
    };
  }, []);

  const visible = useMemo(() => {
    const rows = filterForPanel(panel);
    if (panel === PANEL.COMPLETED) {
      return rows;
    }
    return [...rows].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  }, [panel]);

  const calendarDay = useMemo(() => new Date().getDate(), []);
  const scheduledDay = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.getDate();
  }, []);

  if (isMinimized) {
    return (
      <div
        className="absolute z-10 flex select-none items-center rounded-3xl border border-black/20 px-3 py-2 shadow-lg"
        style={{
          top: position.top,
          left: position.left,
          width: 400,
          height: 40,
          ...shellStyle,
          fontFamily: fontSans,
        }}
      >
        <div className="flex w-full min-w-0 items-center gap-2">
          <TrafficLights onMinimize={onMinimize} />
          <button
            type="button"
            className="min-w-0 flex-1 cursor-pointer py-0.5 text-left text-sm font-medium text-white/90 transition-colors hover:text-white"
            onClick={onMinimize}
            aria-label="Expand Reminders"
          >
            Reminders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute z-10 flex select-none flex-col overflow-hidden rounded-3xl"
      style={{
        top: position.top,
        left: position.left,
        width: 580,
        height: 455,
        ...shellStyle,
        fontFamily: fontSans,
      }}
    >
      <div className="flex min-h-0 flex-1">
        {/* Sidebar — macOS Reminders left pane */}
        <aside className="flex w-[202px] shrink-0 flex-col border-r border-white/[0.06] bg-[#2c2c2e]">
          <div className="flex items-center justify-between gap-1 px-2.5 pt-2.5">
            <TrafficLights onMinimize={onMinimize} />
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                title="Add list"
                aria-label="Add list (decorative)"
                className="rounded-md p-1 text-[#8e8e93] transition-colors hover:bg-white/10 hover:text-white"
              >
                <ListPlus className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                title="Sidebar"
                aria-label="Sidebar (decorative)"
                className="rounded-md p-1 text-[#8e8e93] transition-colors hover:bg-white/10 hover:text-white"
              >
                <PanelLeft className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div className="mt-2 space-y-1.5 px-2 pb-2">
            <div className="grid grid-cols-2 gap-1.5">
              <SmartTile
                label="Today"
                count={counts.today}
                big={calendarDay}
                icon={<Calendar className="h-3.5 w-3.5 opacity-90" />}
                tone="blue"
                active={panel === PANEL.TODAY}
                onClick={() => setPanel(PANEL.TODAY)}
              />
              <SmartTile
                label="Scheduled"
                count={counts.scheduled}
                big={scheduledDay}
                icon={<Calendar className="h-3.5 w-3.5 opacity-90" />}
                tone="rose"
                active={panel === PANEL.SCHEDULED}
                onClick={() => setPanel(PANEL.SCHEDULED)}
              />
              <SmartTile
                label="All"
                count={counts.all}
                big={counts.all}
                icon={<Inbox className="h-3.5 w-3.5 opacity-90" />}
                tone="slate"
                active={panel === PANEL.ALL}
                onClick={() => setPanel(PANEL.ALL)}
              />
              <SmartTile
                label="Flagged"
                count={counts.flagged}
                big={counts.flagged}
                icon={<Flag className="h-3.5 w-3.5 opacity-90" />}
                tone="orange"
                active={panel === PANEL.FLAGGED}
                onClick={() => setPanel(PANEL.FLAGGED)}
              />
            </div>
            <button
              type="button"
              onClick={() => setPanel(PANEL.COMPLETED)}
              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                panel === PANEL.COMPLETED
                  ? "bg-white/12"
                  : "hover:bg-white/[0.06]"
              }`}
            >
              <Check className="h-3.5 w-3.5 text-[#8e8e93]" strokeWidth={2.5} />
              <span className="flex-1 text-[12px] font-medium text-white/90">
                Completed
              </span>
              <span className="text-[12px] tabular-nums text-[#8e8e93]">
                {counts.completed}
              </span>
            </button>
          </div>

          <div className="px-2.5 pb-1 pt-1">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-wide text-[#6e6e73]">
              My Lists
            </p>
            <button
              type="button"
              onClick={() => setPanel(PANEL.MY_LIST)}
              className={`mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                panel === PANEL.MY_LIST
                  ? "bg-[#0a84ff]/35"
                  : "hover:bg-white/[0.06]"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0a84ff] text-[10px] text-white">
                <AlignJustify className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <span className="flex-1 text-[13px] font-medium text-white">
                Reminders
              </span>
              <span className="text-[12px] tabular-nums text-[#8e8e93]">
                {counts.all}
              </span>
            </button>
          </div>
        </aside>

        {/* Main list */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#1c1c1e]">
          <header className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] px-3 py-2">
            <button
              type="button"
              title="New reminder"
              aria-label="New reminder (decorative)"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[#0a84ff] transition-colors hover:bg-white/12"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8e8e93]"
                strokeWidth={2}
              />
              <input
                type="search"
                readOnly
                placeholder="Search"
                aria-label="Search (decorative)"
                className="w-full rounded-full border border-white/[0.08] bg-[#2c2c2e] py-1.5 pl-8 pr-3 text-[13px] text-white placeholder:text-[#8e8e93] outline-none"
              />
            </div>
          </header>

          <div
            className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-3"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.2) transparent",
            }}
          >
            <h1 className="mb-3 text-[26px] font-bold leading-tight tracking-tight text-[#0a84ff]">
              {titleForPanel(panel)}
            </h1>
            <ul className="space-y-0.5">
              {visible.map((reminder) => (
                <li key={reminder.id}>
                  <div className="group flex gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-white/[0.04]">
                    <div className="mt-0.5 shrink-0">
                      <div
                        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-colors ${
                          reminder.completed
                            ? "border-[#0a84ff] bg-[#0a84ff]"
                            : "border-[#636366] bg-transparent"
                        }`}
                      >
                        {reminder.completed && (
                          <Check
                            className="h-2.5 w-2.5 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-[13px] leading-snug ${
                            reminder.completed
                              ? "text-[#8e8e93] line-through"
                              : "text-white"
                          }`}
                        >
                          {reminder.priority === "high" &&
                            !reminder.completed && (
                              <span className="mr-1 font-semibold text-[#0a84ff]">
                                !!!
                              </span>
                            )}
                          {reminder.text}
                        </p>
                        <button
                          type="button"
                          title="Info"
                          aria-label="Info (decorative)"
                          className="shrink-0 rounded p-0.5 text-[#636366] opacity-0 transition-opacity hover:text-[#8e8e93] group-hover:opacity-100"
                        >
                          <Info className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                      </div>
                      {reminder.subtitle && (
                        <p
                          className={`mt-0.5 text-[11px] leading-relaxed ${
                            reminder.completed
                              ? "text-[#636366]"
                              : "text-[#8e8e93]"
                          }`}
                        >
                          {reminder.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

function SmartTile({ label, count, big, icon, tone, active, onClick }) {
  const tones = {
    blue: "border-[#0a84ff]/35 bg-[#0a84ff]/15",
    rose: "border-rose-400/30 bg-rose-500/15",
    slate: "border-white/10 bg-[#3a3a3c]/80",
    orange: "border-orange-400/35 bg-orange-500/12",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col rounded-[10px] border p-2 text-left transition-colors ${
        tones[tone]
      } ${active ? "ring-1 ring-white/25" : "hover:brightness-110"}`}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="text-[#8e8e93]">{icon}</span>
        <span className="text-[22px] font-semibold leading-none tabular-nums text-white/90">
          {big}
        </span>
      </div>
      <span className="mt-1.5 text-[11px] font-semibold leading-none text-white">
        {label}
      </span>
      <span className="sr-only">{count} items</span>
    </button>
  );
}

export default Reminders;
