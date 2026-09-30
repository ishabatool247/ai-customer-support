"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Headphones,
  LayoutDashboard,
  MessageSquare,
  Minus,
  Users,
  Zap,
} from "lucide-react";

type Range = "7 days" | "30 days" | "90 days";

const navigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chatbots", label: "AI Chatbots", icon: Bot, badge: "3" },
  { href: "/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/integrations", label: "Integrations", icon: Zap },
  { href: "/human-support", label: "Human Support", icon: Headphones },
];

const chartData: Record<
  Range,
  { day: string; conversations: number; resolved: number }[]
> = {
  "7 days": [
    { day: "Mon", conversations: 182, resolved: 169 },
    { day: "Tue", conversations: 214, resolved: 201 },
    { day: "Wed", conversations: 198, resolved: 186 },
    { day: "Thu", conversations: 246, resolved: 231 },
    { day: "Fri", conversations: 228, resolved: 214 },
    { day: "Sat", conversations: 164, resolved: 153 },
    { day: "Sun", conversations: 192, resolved: 181 },
  ],
  "30 days": [
    { day: "W1", conversations: 824, resolved: 771 },
    { day: "W2", conversations: 968, resolved: 914 },
    { day: "W3", conversations: 1042, resolved: 987 },
    { day: "W4", conversations: 1184, resolved: 1123 },
  ],
  "90 days": [
    { day: "Jan", conversations: 3240, resolved: 3024 },
    { day: "Feb", conversations: 3680, resolved: 3452 },
    { day: "Mar", conversations: 4218, resolved: 3981 },
  ],
};

const intents = [
  { name: "Product Questions", value: 31, count: 1482 },
  { name: "Billing & Payments", value: 22, count: 1054 },
  { name: "Technical Support", value: 19, count: 908 },
  { name: "Account & Login", value: 15, count: 716 },
  { name: "General Questions", value: 8, count: 382 },
  { name: "Other", value: 5, count: 239 },
];

function formatNumber(value: number) {
  return value.toLocaleString();
}

function Sidebar() {
  return (
    <aside className="hidden w-[250px] shrink-0 border-r border-white/[0.06] bg-[#090e18] lg:flex lg:flex-col">
      <div className="flex h-[72px] items-center border-b border-white/[0.06] px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20">
            <Bot size={20} className="text-white" />
          </div>

          <div>
            <div className="text-[15px] font-bold tracking-tight text-white">
              SupportFlow
            </div>
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              AI Support
            </div>
          </div>
        </Link>
      </div>

      <div className="px-3 py-5">
        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Workspace
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/analytics";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${
                  active
                    ? "bg-white/[0.07] text-white shadow-sm"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                }`}
              >
                <Icon
                  size={17}
                  className={
                    active
                      ? "text-cyan-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  }
                />

                <span className="flex-1">{item.label}</span>

                {item.badge && (
                  <span className="rounded-md border border-cyan-400/10 bg-cyan-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#101827] to-[#0b111c] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10">
              <Activity size={14} className="text-cyan-400" />
            </div>
            <span className="text-xs font-semibold text-white">
              System Status
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            All systems operational
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean | null;
  icon: typeof MessageSquare;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5 transition hover:border-white/[0.11]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
          <Icon size={19} className="text-cyan-400" />
        </div>

        <div
          className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold ${
            positive === true
              ? "bg-emerald-400/10 text-emerald-400"
              : positive === false
                ? "bg-rose-400/10 text-rose-400"
                : "bg-white/[0.05] text-slate-400"
          }`}
        >
          {positive === true ? (
            <ArrowUpRight size={12} />
          ) : positive === false ? (
            <ArrowDownRight size={12} />
          ) : (
            <Minus size={12} />
          )}
          {change}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
          {value}
        </p>
        <p className="mt-1 text-[11px] text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("7 days");
  const [showRangeMenu, setShowRangeMenu] = useState(false);
  const [exported, setExported] = useState(false);

  const data = chartData[range];

  const totals = useMemo(() => {
    const conversations = data.reduce(
      (sum, item) => sum + item.conversations,
      0
    );

    const resolved = data.reduce((sum, item) => sum + item.resolved, 0);

    return {
      conversations,
      resolved,
      resolutionRate: Math.round((resolved / conversations) * 100),
    };
  }, [data]);

  const maxValue = Math.max(...data.map((item) => item.conversations));

  const handleExport = () => {
    const rows = [
      ["Period", "Conversations", "Resolved"],
      ...data.map((item) => [
        item.day,
        item.conversations.toString(),
        item.resolved.toString(),
      ]),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `supportflow-analytics-${range
      .replace(" ", "-")
      .toLowerCase()}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setExported(true);
    window.setTimeout(() => setExported(false), 1800);
  };

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-white/[0.06] bg-[#070b14]/90 px-5 backdrop-blur-xl sm:px-8">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Analytics
            </h1>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Monitor your AI support performance
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowRangeMenu((value) => !value)}
                className="flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0b111c] px-3 text-xs font-medium text-slate-300 transition hover:border-white/[0.14] hover:text-white"
              >
                <CalendarDays size={14} className="text-slate-500" />
                {range}
                <ChevronDown size={13} className="text-slate-500" />
              </button>

              {showRangeMenu && (
                <div className="absolute right-0 top-11 z-30 w-32 overflow-hidden rounded-xl border border-white/[0.08] bg-[#101722] p-1.5 shadow-2xl shadow-black/40">
                  {(["7 days", "30 days", "90 days"] as Range[]).map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setRange(option);
                          setShowRangeMenu(false);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                          range === option
                            ? "bg-white/[0.07] text-white"
                            : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleExport}
              className="flex h-9 items-center gap-2 rounded-xl bg-white/[0.06] px-3 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.09]"
            >
              <Download size={14} />
              <span className="hidden sm:inline">
                {exported ? "Exported" : "Export"}
              </span>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] p-5 sm:p-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Conversations"
              value={formatNumber(totals.conversations)}
              change="+12.8%"
              positive
              icon={MessageSquare}
              description="vs previous period"
            />

            <StatCard
              title="Resolution Rate"
              value={`${totals.resolutionRate}%`}
              change="+3.2%"
              positive
              icon={CheckCircle2}
              description="AI-resolved conversations"
            />

            <StatCard
              title="Avg. Response Time"
              value="1.4s"
              change="-18.4%"
              positive
              icon={Clock3}
              description="faster than previous period"
            />

            <StatCard
              title="Human Handoffs"
              value="6.8%"
              change="-2.1%"
              positive
              icon={Users}
              description="of total conversations"
            />
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Conversation Overview
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Conversations and successfully resolved requests
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    Conversations
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    Resolved
                  </div>
                </div>
              </div>

              <div className="mt-8 h-[290px]">
                <div className="relative h-[240px]">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div
                      key={line}
                      className="absolute left-0 right-0 border-t border-white/[0.045]"
                      style={{ top: `${line * 25}%` }}
                    />
                  ))}

                  <div className="absolute inset-0 flex items-end gap-3 px-1 sm:gap-6">
                    {data.map((item) => {
                      const conversationHeight =
                        (item.conversations / maxValue) * 88;

                      const resolvedHeight =
                        (item.resolved / maxValue) * 88;

                      return (
                        <div
                          key={item.day}
                          className="flex h-full flex-1 items-end justify-center gap-1"
                        >
                          <div
                            className="group relative w-[35%] max-w-8 rounded-t-md bg-cyan-400/70 transition hover:bg-cyan-300"
                            style={{
                              height: `${conversationHeight}%`,
                            }}
                          >
                            <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/[0.08] bg-[#111827] px-2 py-1 text-[9px] text-white shadow-xl group-hover:block">
                              {item.conversations}
                            </div>
                          </div>

                          <div
                            className="group relative w-[35%] max-w-8 rounded-t-md bg-indigo-400/70 transition hover:bg-indigo-300"
                            style={{
                              height: `${resolvedHeight}%`,
                            }}
                          >
                            <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/[0.08] bg-[#111827] px-2 py-1 text-[9px] text-white shadow-xl group-hover:block">
                              {item.resolved}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 px-1 pt-3 sm:gap-6">
                  {data.map((item) => (
                    <div
                      key={item.day}
                      className="flex-1 text-center text-[10px] font-medium text-slate-600"
                    >
                      {item.day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5 sm:p-6">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Resolution Performance
                </h2>
                <p className="mt-1 text-[11px] text-slate-500">
                  How conversations are being handled
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#22d3ee_0_68%,#6366f1_68%_86%,#334155_86%_100%)]">
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#0b111c]">
                    <span className="text-3xl font-bold text-white">94%</span>
                    <span className="mt-1 text-[10px] text-slate-500">
                      resolved
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    AI Resolved
                  </div>
                  <span className="text-xs font-semibold text-white">68%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    Human Resolved
                  </div>
                  <span className="text-xs font-semibold text-white">18%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-slate-700" />
                    Unresolved
                  </div>
                  <span className="text-xs font-semibold text-white">6%</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Top Conversation Intents
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Most common reasons customers contact support
                  </p>
                </div>

                <MessageSquare size={17} className="text-slate-600" />
              </div>

              <div className="mt-6 space-y-5">
                {intents.map((intent) => (
                  <div key={intent.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">
                        {intent.name}
                      </span>

                      <span className="text-[10px] text-slate-500">
                        {formatNumber(intent.count)} · {intent.value}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                        style={{ width: `${intent.value * 3.2}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5 sm:p-6">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  AI Performance
                </h2>
                <p className="mt-1 text-[11px] text-slate-500">
                  Key metrics across your AI support agents
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2">
                    <Zap size={15} className="text-cyan-400" />
                    <span className="text-[11px] text-slate-500">
                      Avg. Response
                    </span>
                  </div>
                  <div className="mt-3 text-xl font-bold text-white">1.4s</div>
                  <div className="mt-1 text-[10px] text-emerald-400">
                    18.4% faster
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2">
                    <Bot size={15} className="text-indigo-400" />
                    <span className="text-[11px] text-slate-500">
                      AI Resolution
                    </span>
                  </div>
                  <div className="mt-3 text-xl font-bold text-white">68%</div>
                  <div className="mt-1 text-[10px] text-emerald-400">
                    5.6% increase
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <span className="text-[11px] text-slate-500">
                      Accuracy
                    </span>
                  </div>
                  <div className="mt-3 text-xl font-bold text-white">96.2%</div>
                  <div className="mt-1 text-[10px] text-emerald-400">
                    2.4% increase
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2">
                    <Users size={15} className="text-amber-400" />
                    <span className="text-[11px] text-slate-500">
                      Handoff Rate
                    </span>
                  </div>
                  <div className="mt-3 text-xl font-bold text-white">6.8%</div>
                  <div className="mt-1 text-[10px] text-emerald-400">
                    2.1% decrease
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                    <Activity size={15} className="text-cyan-400" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Performance insight
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Your AI agents are resolving most customer requests
                      without human intervention while maintaining a fast
                      average response time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Support Efficiency
                </h2>
                <p className="mt-1 text-[11px] text-slate-500">
                  Current workspace efficiency indicators
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/5 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium text-emerald-400">
                  Healthy
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div>
                <div className="mb-2 flex justify-between text-[11px]">
                  <span className="text-slate-500">Automation Coverage</span>
                  <span className="font-semibold text-white">82%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.05]">
                  <div className="h-full w-[82%] rounded-full bg-cyan-400" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-[11px]">
                  <span className="text-slate-500">Knowledge Accuracy</span>
                  <span className="font-semibold text-white">94%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.05]">
                  <div className="h-full w-[94%] rounded-full bg-indigo-400" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-[11px]">
                  <span className="text-slate-500">Customer Satisfaction</span>
                  <span className="font-semibold text-white">91%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.05]">
                  <div className="h-full w-[91%] rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}