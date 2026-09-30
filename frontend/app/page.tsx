"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileText,
  Headphones,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Settings,
  Sparkles,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";

const stats = [
  {
    title: "Total conversations",
    value: "12,486",
    change: "+18.2%",
    description: "vs last month",
    icon: MessageSquare,
  },
  {
    title: "AI resolution rate",
    value: "87.4%",
    change: "+6.8%",
    description: "vs last month",
    icon: Bot,
  },
  {
    title: "Active customers",
    value: "2,841",
    change: "+12.5%",
    description: "vs last month",
    icon: Users,
  },
  {
    title: "Avg. response time",
    value: "1.8s",
    change: "-24.3%",
    description: "faster than last month",
    icon: Zap,
  },
];

const activityData = [
  { day: "Mon", value: 4210 },
  { day: "Tue", value: 5800 },
  { day: "Wed", value: 5100 },
  { day: "Thu", value: 7600 },
  { day: "Fri", value: 6400 },
  { day: "Sat", value: 8800 },
  { day: "Sun", value: 7300 },
];

const bots = [
  {
    name: "Customer Support",
    description: "General customer assistance",
    status: "Online",
    conversations: "8,421",
    resolution: "91.2%",
    trend: "+8.4%",
  },
  {
    name: "Sales Assistant",
    description: "Lead qualification & sales",
    status: "Online",
    conversations: "2,846",
    resolution: "84.7%",
    trend: "+5.1%",
  },
  {
    name: "Order Support",
    description: "Orders, shipping & refunds",
    status: "Training",
    conversations: "1,219",
    resolution: "79.5%",
    trend: "+3.7%",
  },
];

const liveFeed = [
  {
    name: "Sarah Williams",
    message: "Asked about order tracking",
    time: "2 min ago",
    icon: MessageSquare,
  },
  {
    name: "Michael Chen",
    message: "AI resolved a refund request",
    time: "5 min ago",
    icon: Zap,
  },
  {
    name: "Emma Davis",
    message: "Asked about payment methods",
    time: "8 min ago",
    icon: MessageSquare,
  },
  {
    name: "James Wilson",
    message: "Conversation escalated to human",
    time: "12 min ago",
    icon: Headphones,
  },
];

const navigation = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/chatbots",
    label: "AI Chatbots",
    icon: Bot,
    badge: "3",
  },
  {
    href: "/conversations",
    label: "Conversations",
    icon: MessageSquare,
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/knowledge-base",
    label: "Knowledge Base",
    icon: BookOpen,
  },
  {
    href: "/integrations",
    label: "Integrations",
    icon: Zap,
  },
];

const notifications = [
  {
    title: "AI system is healthy",
    description: "All support services are operating normally.",
    time: "2 min ago",
    type: "success",
  },
  {
    title: "New conversation",
    description: "A customer started a new support conversation.",
    time: "5 min ago",
    type: "info",
  },
  {
    title: "Knowledge base updated",
    description: "3 new documents were indexed successfully.",
    time: "18 min ago",
    type: "info",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function PremiumSidebar() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="sticky top-0 hidden h-screen w-[268px] shrink-0 flex-col border-r border-white/[0.06] bg-[#080c14] lg:flex">
      {/* BRAND */}
      <div className="px-5 pb-5 pt-6">
        <Link
          href="/"
          className="group flex items-center justify-between rounded-2xl border border-white/[0.05] bg-white/[0.018] px-3.5 py-3 transition duration-200 hover:border-cyan-400/10 hover:bg-white/[0.03]"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_35px_rgba(34,211,238,0.2)]">
              <div className="absolute inset-[1px] rounded-[12px] bg-gradient-to-br from-cyan-300/20 to-transparent" />

              <Sparkles
                size={18}
                strokeWidth={2.2}
                className="relative text-white"
              />

              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#080c14] bg-emerald-400" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-[13px] font-bold tracking-[-0.01em] text-white">
                SupportFlow
              </h1>

              <p className="mt-0.5 text-[9px] font-medium text-slate-500">
                AI Customer Support
              </p>
            </div>
          </div>

          <ChevronRight
            size={13}
            className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-400"
          />
        </Link>
      </div>

      {/* CREATE */}
      <div className="px-4">
        <Link
          href="/chatbots"
          className="group relative flex w-full items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-4 py-3 text-[10px] font-semibold text-white shadow-[0_12px_35px_rgba(14,165,233,0.16)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(14,165,233,0.25)]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition group-hover:opacity-100" />

          <span className="relative flex h-6 w-6 items-center justify-center rounded-lg bg-white/15">
            <Plus size={14} />
          </span>

          <span className="relative flex-1 text-left">
            Create AI chatbot
          </span>

          <ArrowUpRight
            size={13}
            className="relative opacity-70 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* WORKSPACE */}
      <div className="mt-8 px-3">
        <div className="mb-3 flex items-center justify-between px-3">
          <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-slate-600">
            Workspace
          </p>

          <span className="h-1 w-1 rounded-full bg-slate-700" />
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[10px] font-medium transition-all duration-200 ${
                  active
                    ? "border-cyan-400/[0.10] bg-gradient-to-r from-cyan-400/[0.10] to-blue-500/[0.04] text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]"
                    : "border-transparent text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                )}

                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
                    active
                      ? "bg-cyan-400/[0.10] text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.06)]"
                      : "bg-white/[0.025] text-slate-600 group-hover:bg-white/[0.05] group-hover:text-slate-300"
                  }`}
                >
                  <Icon size={14} />
                </span>

                <span className="flex-1">{item.label}</span>

                {item.badge && (
                  <span
                    className={`rounded-md border px-1.5 py-0.5 text-[7px] font-semibold ${
                      active
                        ? "border-cyan-400/15 bg-cyan-400/[0.10] text-cyan-300"
                        : "border-cyan-400/10 bg-cyan-400/[0.07] text-cyan-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* MANAGE */}
      <div className="mt-7 px-3">
        <div className="mb-3 px-3">
          <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-slate-600">
            Manage
          </p>
        </div>

        <nav className="space-y-1">
          <Link
            href="/settings"
            className={`group relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[10px] font-medium transition ${
              isRouteActive(pathname, "/settings")
                ? "border-cyan-400/[0.10] bg-cyan-400/[0.06] text-cyan-300"
                : "border-transparent text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
            }`}
          >
            {isRouteActive(pathname, "/settings") && (
              <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            )}

            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                isRouteActive(pathname, "/settings")
                  ? "bg-cyan-400/[0.10] text-cyan-300"
                  : "bg-white/[0.025] text-slate-600 group-hover:bg-white/[0.05] group-hover:text-slate-300"
              }`}
            >
              <Settings size={14} />
            </span>

            <span className="flex-1">Settings</span>

            <ChevronRight
              size={12}
              className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-400"
            />
          </Link>
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="mt-auto px-4 pb-4">
        {/* AI STATUS */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0d1624] to-[#0a101a] p-4">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/[0.07] blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </span>

              <span className="text-[9px] font-semibold text-slate-300">
                AI system online
              </span>
            </div>

            <span className="rounded-md border border-emerald-400/10 bg-emerald-400/[0.05] px-1.5 py-1 text-[6px] font-bold uppercase tracking-wider text-emerald-400">
              99.98%
            </span>
          </div>

          <p className="relative mt-2 text-[8px] leading-4 text-slate-600">
            All support services are operating normally.
          </p>

          <div className="relative mt-3 grid grid-cols-3 gap-1.5">
            {["RAG", "GROQ", "API"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-1 rounded-lg border border-white/[0.045] bg-white/[0.025] py-1.5"
              >
                <span className="h-1 w-1 rounded-full bg-emerald-400" />

                <span className="text-[6px] font-semibold text-slate-600">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PROFILE */}
        <div className="relative mt-3">
          {profileOpen && (
            <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101722] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <Link
                href="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[9px] text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                <User size={13} />
                Profile & workspace
              </Link>

              <Link
                href="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[9px] text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Settings size={13} />
                Settings
              </Link>

              <div className="my-1 border-t border-white/[0.05]" />

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[9px] text-slate-500 transition hover:bg-red-400/[0.05] hover:text-red-300"
              >
                <LogOut size={13} />
                Sign out
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setProfileOpen((value) => !value)}
            aria-expanded={profileOpen}
            className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.018] p-2.5 text-left transition hover:border-white/[0.09] hover:bg-white/[0.03]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 text-[8px] font-bold text-white">
              JD
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-semibold text-slate-300">
                John Doe
              </p>

              <p className="truncate text-[7px] text-slate-600">
                Workspace Admin
              </p>
            </div>

            <ChevronDown
              size={13}
              className={`text-slate-600 transition ${
                profileOpen ? "rotate-180 text-slate-300" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}

function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <aside className="relative flex h-full w-[290px] max-w-[88vw] flex-col border-r border-white/[0.08] bg-[#080c14] shadow-[20px_0_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_25px_rgba(34,211,238,0.18)]">
              <Sparkles size={17} className="text-white" />
            </div>

            <div>
              <p className="text-[13px] font-bold text-white">
                SupportFlow
              </p>
              <p className="mt-0.5 text-[8px] text-slate-600">
                AI Customer Support
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-4 pt-5">
          <Link
            href="/chatbots"
            onClick={onClose}
            className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-4 py-3 text-[10px] font-semibold text-white shadow-[0_12px_35px_rgba(14,165,233,0.16)]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15">
              <Plus size={14} />
            </span>

            <span className="flex-1">Create AI chatbot</span>

            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="mt-7 overflow-y-auto px-3 pb-5">
          <div className="mb-3 px-3">
            <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-slate-600">
              Workspace
            </p>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`relative flex items-center gap-3 rounded-xl border px-3 py-3 text-[10px] font-medium transition ${
                    active
                      ? "border-cyan-400/[0.10] bg-cyan-400/[0.07] text-cyan-300"
                      : "border-transparent text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-cyan-400" />
                  )}

                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      active
                        ? "bg-cyan-400/[0.10] text-cyan-300"
                        : "bg-white/[0.025] text-slate-600"
                    }`}
                  >
                    <Icon size={15} />
                  </span>

                  <span className="flex-1">{item.label}</span>

                  {item.badge && (
                    <span className="rounded-md border border-cyan-400/10 bg-cyan-400/[0.07] px-1.5 py-0.5 text-[7px] font-semibold text-cyan-400">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-7 mb-3 px-3">
            <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-slate-600">
              Manage
            </p>
          </div>

          <Link
            href="/settings"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-[10px] font-medium transition ${
              isRouteActive(pathname, "/settings")
                ? "border-cyan-400/[0.10] bg-cyan-400/[0.07] text-cyan-300"
                : "border-transparent text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.025]">
              <Settings size={15} />
            </span>

            <span>Settings</span>
          </Link>

          <div className="mt-7 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0d1624] to-[#0a101a] p-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[9px] font-semibold text-slate-300">
                AI system online
              </span>
            </div>

            <p className="mt-2 text-[8px] leading-4 text-slate-600">
              All support services are operating normally.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {["RAG", "GROQ", "API"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-1 rounded-lg border border-white/[0.045] bg-white/[0.025] py-1.5"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span className="text-[6px] font-semibold text-slate-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/settings"
            onClick={onClose}
            className="mt-3 flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.018] p-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 text-[8px] font-bold text-white">
              JD
            </div>

            <div>
              <p className="text-[9px] font-semibold text-slate-300">
                John Doe
              </p>
              <p className="mt-0.5 text-[7px] text-slate-600">
                Workspace Admin
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeBotMenu, setActiveBotMenu] = useState<string | null>(null);

  const maxValue = 10000;

  const chartPoints = activityData.map((item, index) => {
    const x = 55 + index * 100;
    const y = 225 - (item.value / maxValue) * 180;

    return {
      ...item,
      x,
      y,
    };
  });

  const linePath = chartPoints
    .map((point, index) =>
      index === 0
        ? `M ${point.x} ${point.y}`
        : `L ${point.x} ${point.y}`,
    )
    .join(" ");

  const areaPath = `${linePath} L ${
    chartPoints[chartPoints.length - 1].x
  } 225 L ${chartPoints[0].x} 225 Z`;

  const total = activityData.reduce((sum, item) => sum + item.value, 0);
  const average = Math.round(total / activityData.length);
  const peak = Math.max(...activityData.map((item) => item.value));

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="flex min-h-screen">
        <PremiumSidebar />

        <MobileSidebar
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <section className="min-w-0 flex-1">
          {/* MOBILE HEADER */}
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#080c14] px-5 py-4 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_25px_rgba(34,211,238,0.18)]">
                <Sparkles size={16} />
              </div>

              <div>
                <p className="text-[12px] font-bold">SupportFlow</p>

                <p className="text-[8px] text-slate-600">
                  AI Customer Support
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:text-white"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* DESKTOP HEADER */}
          <header className="sticky top-0 z-30 hidden border-b border-white/[0.06] bg-[#070b14]/90 px-5 py-4 backdrop-blur-xl md:px-8 lg:block">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-[16px] font-semibold tracking-tight">
                    AI Customer Support
                  </h2>

                  <span className="rounded-md border border-cyan-400/10 bg-cyan-400/[0.07] px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-cyan-400">
                    Live
                  </span>
                </div>

                <p className="mt-1 text-[10px] text-slate-600">
                  Your intelligent customer support command center
                </p>
              </div>

              <div className="relative flex items-center gap-2.5">
                <div className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" />

                  <span className="text-[9px] font-medium text-slate-500">
                    All systems operational
                  </span>
                </div>

                {/* NOTIFICATIONS */}
                <button
                  type="button"
                  aria-label="Notifications"
                  aria-expanded={notificationsOpen}
                  onClick={() => {
                    setNotificationsOpen((value) => !value);
                    setHelpOpen(false);
                  }}
                  className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <Bell size={15} />

                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.8)]" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-[92px] top-12 z-50 w-[330px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101722] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3.5">
                      <div>
                        <p className="text-[10px] font-semibold text-white">
                          Notifications
                        </p>

                        <p className="mt-0.5 text-[8px] text-slate-600">
                          Recent workspace activity
                        </p>
                      </div>

                      <span className="rounded-md bg-cyan-400/[0.08] px-2 py-1 text-[7px] font-semibold text-cyan-400">
                        3 new
                      </span>
                    </div>

                    <div className="p-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.title}
                          className="flex gap-3 rounded-xl p-3 transition hover:bg-white/[0.035]"
                        >
                          <div
                            className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                              notification.type === "success"
                                ? "bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.6)]"
                                : "bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.5)]"
                            }`}
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-[9px] font-semibold text-slate-300">
                                {notification.title}
                              </p>

                              <span className="shrink-0 text-[7px] text-slate-700">
                                {notification.time}
                              </span>
                            </div>

                            <p className="mt-1 text-[8px] leading-4 text-slate-600">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/conversations"
                      onClick={() => setNotificationsOpen(false)}
                      className="flex items-center justify-center border-t border-white/[0.06] px-4 py-3 text-[8px] font-medium text-slate-500 transition hover:bg-white/[0.025] hover:text-cyan-400"
                    >
                      View activity
                      <ArrowUpRight size={10} className="ml-1" />
                    </Link>
                  </div>
                )}

                {/* HELP */}
                <button
                  type="button"
                  aria-label="Help"
                  aria-expanded={helpOpen}
                  onClick={() => {
                    setHelpOpen((value) => !value);
                    setNotificationsOpen(false);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <CircleHelp size={15} />
                </button>

                {helpOpen && (
                  <div className="absolute right-[46px] top-12 z-50 w-[270px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101722] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <div className="rounded-xl bg-gradient-to-br from-cyan-400/[0.08] to-blue-500/[0.04] p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/[0.10] text-cyan-400">
                          <CircleHelp size={14} />
                        </div>

                        <div>
                          <p className="text-[9px] font-semibold text-white">
                            Support Center
                          </p>

                          <p className="text-[7px] text-slate-600">
                            Quick access to your workspace
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/knowledge-base"
                      onClick={() => setHelpOpen(false)}
                      className="mt-1 flex items-center gap-3 rounded-xl p-3 text-[9px] text-slate-500 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <BookOpen size={13} />
                      Knowledge base
                    </Link>

                    <Link
                      href="/conversations"
                      onClick={() => setHelpOpen(false)}
                      className="flex items-center gap-3 rounded-xl p-3 text-[9px] text-slate-500 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <MessageSquare size={13} />
                      Conversation help
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setHelpOpen(false)}
                      className="flex items-center gap-3 rounded-xl p-3 text-[9px] text-slate-500 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <Settings size={13} />
                      Workspace settings
                    </Link>
                  </div>
                )}

                <Link
                  href="/settings"
                  className="hidden h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 text-[10px] font-semibold text-white transition hover:from-slate-500 hover:to-slate-700 sm:flex"
                >
                  JD
                </Link>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="p-5 md:p-8">
            <div className="mx-auto max-w-[1450px]">
              {/* HERO */}
              <div className="relative mb-7 overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-[#0d1726] via-[#0b121f] to-[#09101b] p-6 md:p-7">
                <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-3xl" />

                <div className="pointer-events-none absolute bottom-[-100px] right-[25%] h-56 w-56 rounded-full bg-blue-500/[0.05] blur-3xl" />

                <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                        <Sparkles size={12} />
                      </span>

                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                        AI Overview
                      </span>
                    </div>

                    <h3 className="text-[24px] font-semibold tracking-[-0.035em] text-white md:text-[28px]">
                      Your support is running smoothly.
                    </h3>

                    <p className="mt-2 max-w-xl text-[11px] leading-5 text-slate-500">
                      Monitor conversations, AI performance, customers and
                      knowledge activity from one intelligent workspace.
                    </p>
                  </div>

                  <Link
                    href="/conversations"
                    className="flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-[10px] font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Open conversations
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </div>

              {/* STATS */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.title}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20"
                    >
                      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-cyan-400/[0.025] blur-2xl transition group-hover:bg-cyan-400/[0.07]" />

                      <div className="relative flex items-start justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.07] text-cyan-400">
                          <Icon size={16} />
                        </div>

                        <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.07] px-2 py-1 text-[8px] font-semibold text-emerald-400">
                          {stat.change}
                        </span>
                      </div>

                      <p className="relative mt-5 text-[10px] font-medium text-slate-600">
                        {stat.title}
                      </p>

                      <p className="relative mt-1 text-[25px] font-semibold tracking-[-0.04em] text-white">
                        {stat.value}
                      </p>

                      <p className="relative mt-1 text-[9px] text-slate-700">
                        {stat.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* ANALYTICS */}
              <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
                {/* CHART */}
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5">
                  <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/[0.035] blur-3xl" />

                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[13px] font-semibold text-white">
                          Conversation analytics
                        </h4>

                        <span className="rounded-md border border-cyan-400/10 bg-cyan-400/[0.06] px-2 py-1 text-[7px] font-semibold tracking-wider text-cyan-400">
                          LIVE
                        </span>
                      </div>

                      <p className="mt-1 text-[9px] text-slate-600">
                        Customer conversations across your AI support system
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2 sm:flex">
                      <span className="text-[8px] font-medium text-slate-500">
                        Last 7 days
                      </span>
                      <ChevronDown size={11} className="text-slate-600" />
                    </div>
                  </div>

                  <div className="relative mt-6 flex flex-wrap items-end justify-between gap-5">
                    <div>
                      <p className="text-[9px] font-medium text-slate-600">
                        Total conversations
                      </p>

                      <div className="mt-1 flex items-end gap-3">
                        <span className="text-[30px] font-semibold tracking-[-0.05em] text-white">
                          12,486
                        </span>

                        <span className="mb-1 flex items-center gap-1 rounded-full bg-emerald-400/[0.08] px-2 py-1 text-[8px] font-semibold text-emerald-400">
                          <ArrowUpRight size={10} />
                          18.2%
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2">
                        <p className="text-[7px] uppercase tracking-wider text-slate-700">
                          Peak
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-slate-300">
                          {formatNumber(peak)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2">
                        <p className="text-[7px] uppercase tracking-wider text-slate-700">
                          Daily avg
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-slate-300">
                          {formatNumber(average)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-7 h-[285px] w-full overflow-hidden rounded-2xl border border-white/[0.045] bg-[#09101a]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(34,211,238,0.07),transparent_35%)]" />

                    <div className="absolute bottom-10 left-3 top-5 z-10 flex flex-col justify-between">
                      {["10k", "7.5k", "5k", "2.5k", "0"].map((label) => (
                        <span
                          key={label}
                          className="text-[7px] font-medium text-slate-700"
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    <div className="absolute inset-x-10 bottom-10 top-5 flex flex-col justify-between">
                      {[0, 1, 2, 3, 4].map((line) => (
                        <div
                          key={line}
                          className="border-t border-dashed border-white/[0.055]"
                        />
                      ))}
                    </div>

                    <svg
                      viewBox="0 0 700 250"
                      preserveAspectRatio="none"
                      className="absolute inset-x-10 bottom-10 top-5 h-[225px] w-[calc(100%-80px)] overflow-visible"
                    >
                      <defs>
                        <linearGradient
                          id="areaGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#22d3ee"
                            stopOpacity="0.30"
                          />

                          <stop
                            offset="65%"
                            stopColor="#2563eb"
                            stopOpacity="0.10"
                          />

                          <stop
                            offset="100%"
                            stopColor="#2563eb"
                            stopOpacity="0"
                          />
                        </linearGradient>

                        <linearGradient
                          id="lineGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#67e8f9" />
                        </linearGradient>

                        <filter
                          id="chartGlow"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feGaussianBlur
                            stdDeviation="5"
                            result="blur"
                          />
                        </filter>
                      </defs>

                      <path d={areaPath} fill="url(#areaGradient)" />

                      <path
                        d={linePath}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.18"
                        filter="url(#chartGlow)"
                      />

                      <path
                        d={linePath}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {chartPoints.map((point) => (
                        <g key={point.day}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="7"
                            fill="#22d3ee"
                            opacity="0.08"
                          />

                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="3.5"
                            fill="#07111c"
                            stroke="#67e8f9"
                            strokeWidth="2"
                          >
                            {/* Hydration-safe: one string child */}
                            <title>{`${point.day}: ${formatNumber(point.value)} conversations`}</title>
                          </circle>
                        </g>
                      ))}
                    </svg>

                    <div className="absolute inset-x-10 bottom-10 top-5">
                      {chartPoints.map((point, index) => {
                        const left = `${
                          (index / (activityData.length - 1)) * 100
                        }%`;

                        const top = `${((point.y - 5) / 225) * 100}%`;

                        return (
                          <div
                            key={point.day}
                            className="group absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left, top }}
                          >
                            <div className="h-5 w-5 rounded-full bg-transparent" />

                            <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-cyan-400/15 bg-[#101a29]/95 px-3 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl group-hover:block">
                              <p className="text-[7px] uppercase tracking-wider text-slate-500">
                                {point.day}
                              </p>

                              <p className="mt-0.5 text-[11px] font-semibold text-cyan-300">
                                {formatNumber(point.value)}
                              </p>

                              <p className="text-[7px] text-slate-600">
                                conversations
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute bottom-2 left-10 right-10 flex justify-between">
                      {activityData.map((item) => (
                        <span
                          key={item.day}
                          className="text-[7px] font-medium text-slate-700"
                        >
                          {item.day}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                      <span className="text-[8px] text-slate-600">
                        AI conversations
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="hidden text-[8px] text-slate-700 sm:inline">
                        Compared with previous period
                      </span>

                      <span className="flex items-center gap-1 text-[8px] font-semibold text-emerald-400">
                        <ArrowUpRight size={10} />
                        18.2%
                      </span>
                    </div>
                  </div>
                </div>

                {/* SYSTEM HEALTH */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-semibold text-white">
                        System health
                      </h4>

                      <p className="mt-1 text-[9px] text-slate-600">
                        AI infrastructure status
                      </p>
                    </div>

                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2.5 py-1 text-[8px] font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Healthy
                    </span>
                  </div>

                  <div className="mt-7 space-y-5">
                    {[
                      ["AI response engine", "99.9%", "99%"],
                      ["Knowledge retrieval", "98.7%", "98%"],
                      ["API availability", "99.8%", "99%"],
                    ].map(([label, value, width]) => (
                      <div key={label}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9px] text-slate-600">
                            {label}
                          </span>

                          <span className="text-[9px] font-medium text-slate-300">
                            {value}
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                      <p className="text-[8px] text-slate-600">
                        Avg. latency
                      </p>

                      <p className="mt-1 text-[16px] font-semibold text-white">
                        184ms
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                      <p className="text-[8px] text-slate-600">Uptime</p>

                      <p className="mt-1 text-[16px] font-semibold text-white">
                        99.98%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI ASSISTANTS + LIVE FEED */}
              <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
                {/* AI ASSISTANTS */}
                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b111c]">
                  <div className="border-b border-white/[0.06] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-[13px] font-semibold text-white">
                            AI assistants
                          </h4>

                          <span className="rounded-md border border-emerald-400/10 bg-emerald-400/[0.06] px-2 py-1 text-[7px] font-semibold text-emerald-400">
                            3 ACTIVE
                          </span>
                        </div>

                        <p className="mt-1 text-[9px] text-slate-600">
                          Performance of your customer support agents
                        </p>
                      </div>

                      <Link
                        href="/chatbots"
                        className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-[8px] font-medium text-slate-500 transition hover:bg-white/[0.05] hover:text-cyan-400"
                      >
                        Manage bots
                        <ChevronRight size={11} />
                      </Link>
                    </div>
                  </div>

                  <div className="hidden grid-cols-[1.7fr_0.65fr_0.7fr_1fr_0.8fr_30px] gap-4 border-b border-white/[0.05] px-5 py-3 md:grid">
                    <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-slate-700">
                      Assistant
                    </span>

                    <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-slate-700">
                      Status
                    </span>

                    <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-slate-700">
                      Chats
                    </span>

                    <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-slate-700">
                      Resolution
                    </span>

                    <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-slate-700">
                      Trend
                    </span>

                    <span />
                  </div>

                  <div>
                    {bots.map((bot, index) => (
                      <div
                        key={bot.name}
                        className="group border-b border-white/[0.045] px-5 py-4 transition hover:bg-white/[0.025]"
                      >
                        <div className="grid items-center gap-4 md:grid-cols-[1.7fr_0.65fr_0.7fr_1fr_0.8fr_30px]">
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                                index === 0
                                  ? "border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-400"
                                  : index === 1
                                    ? "border-blue-400/15 bg-blue-400/[0.07] text-blue-400"
                                    : "border-violet-400/15 bg-violet-400/[0.07] text-violet-400"
                              }`}
                            >
                              <Bot size={16} />

                              {bot.status === "Online" && (
                                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b111c] bg-emerald-400" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-[10px] font-semibold text-slate-200">
                                {bot.name}
                              </p>

                              <p className="mt-1 truncate text-[8px] text-slate-700">
                                {bot.description}
                              </p>
                            </div>
                          </div>

                          <div>
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[7px] font-semibold ${
                                bot.status === "Online"
                                  ? "border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-400"
                                  : "border-amber-400/10 bg-amber-400/[0.06] text-amber-400"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  bot.status === "Online"
                                    ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]"
                                    : "bg-amber-400"
                                }`}
                              />

                              {bot.status}
                            </span>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold text-slate-200">
                              {bot.conversations}
                            </p>

                            <p className="mt-0.5 text-[7px] text-slate-700">
                              conversations
                            </p>
                          </div>

                          <div>
                            <div className="mb-1.5 flex items-center justify-between">
                              <span className="text-[7px] text-slate-700">
                                AI resolution
                              </span>

                              <span className="text-[8px] font-semibold text-cyan-400">
                                {bot.resolution}
                              </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                                style={{ width: bot.resolution }}
                              />
                            </div>
                          </div>

                          <div>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/[0.06] px-2 py-1 text-[7px] font-semibold text-emerald-400">
                              <ArrowUpRight size={9} />
                              {bot.trend}
                            </span>

                            <p className="mt-1 text-[7px] text-slate-700">
                              this month
                            </p>
                          </div>

                          {/* BOT MENU */}
                          <div className="relative hidden md:block">
                            <button
                              type="button"
                              aria-label={`Actions for ${bot.name}`}
                              onClick={() =>
                                setActiveBotMenu(
                                  activeBotMenu === bot.name
                                    ? null
                                    : bot.name,
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-white/[0.06] hover:text-slate-300"
                            >
                              <MoreHorizontal size={15} />
                            </button>

                            {activeBotMenu === bot.name && (
                              <div className="absolute right-0 top-9 z-40 w-36 overflow-hidden rounded-xl border border-white/[0.08] bg-[#101722] p-1 shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
                                <Link
                                  href="/chatbots"
                                  onClick={() => setActiveBotMenu(null)}
                                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[8px] text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                  <Bot size={12} />
                                  Open assistant
                                </Link>

                                <Link
                                  href="/analytics"
                                  onClick={() => setActiveBotMenu(null)}
                                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[8px] text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                  <BarChart3 size={12} />
                                  View analytics
                                </Link>

                                <Link
                                  href="/settings"
                                  onClick={() => setActiveBotMenu(null)}
                                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[8px] text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                  <Settings size={12} />
                                  Configure
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* MOBILE BOT INFO */}
                        <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
                          <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                            <p className="text-[7px] text-slate-700">
                              Resolution
                            </p>

                            <p className="mt-1 text-[11px] font-semibold text-cyan-400">
                              {bot.resolution}
                            </p>
                          </div>

                          <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                            <p className="text-[7px] text-slate-700">
                              Monthly trend
                            </p>

                            <p className="mt-1 text-[11px] font-semibold text-emerald-400">
                              {bot.trend}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.6)]" />

                      <span className="text-[8px] text-slate-600">
                        All assistants operational
                      </span>
                    </div>

                    <Link
                      href="/analytics"
                      className="flex items-center gap-1 text-[8px] font-medium text-slate-600 transition hover:text-cyan-400"
                    >
                      View performance
                      <ArrowUpRight size={10} />
                    </Link>
                  </div>
                </div>

                {/* LIVE FEED */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-semibold text-white">
                        Live activity
                      </h4>

                      <p className="mt-1 text-[9px] text-slate-600">
                        Recent customer events
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />

                        <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      </span>

                      <span className="text-[8px] font-medium text-cyan-400">
                        LIVE
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-1">
                    {liveFeed.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={index}
                          className="group flex gap-3 rounded-xl p-3 transition hover:bg-white/[0.025]"
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.025] text-cyan-400">
                            <Icon size={13} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate text-[9px] font-semibold text-slate-300">
                                {item.name}
                              </p>

                              <span className="shrink-0 text-[8px] text-slate-700">
                                {item.time}
                              </span>
                            </div>

                            <p className="mt-1 text-[9px] text-slate-600">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href="/conversations"
                    className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-white/[0.07] py-2.5 text-[9px] font-medium text-slate-500 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    View all conversations
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>

              {/* KNOWLEDGE BASE */}
              <div className="mt-5 overflow-hidden rounded-2xl border border-cyan-400/[0.09] bg-gradient-to-r from-[#0c1724] to-[#0b111c] p-5">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.07] text-cyan-400">
                      <BookOpen size={18} />
                    </div>

                    <div>
                      <h4 className="text-[12px] font-semibold text-white">
                        Knowledge base
                      </h4>

                      <p className="mt-1 text-[9px] text-slate-600">
                        Your AI has access to 248 indexed knowledge documents.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-2 sm:flex">
                      <FileText size={13} className="text-emerald-400" />

                      <span className="text-[9px] font-medium text-emerald-400">
                        248 indexed
                      </span>
                    </div>

                    <Link
                      href="/knowledge-base"
                      className="rounded-xl bg-white px-4 py-2.5 text-[9px] font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Manage knowledge
                    </Link>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-6 flex flex-col items-center justify-between gap-2 px-1 pb-3 text-[8px] text-slate-700 sm:flex-row">
                <div className="flex items-center gap-2">
                  <Activity size={11} />
                  SupportFlow AI infrastructure
                </div>

                <div className="flex items-center gap-3">
                  <span>RAG connected</span>
                  <span>•</span>
                  <span>Groq connected</span>
                  <span>•</span>
                  <span>Django API connected</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}