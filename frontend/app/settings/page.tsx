"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Bell,
  Bot,
  Check,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Globe,
  Headphones,
  KeyRound,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Palette,
  Save,
  Settings,
  Shield,
  Sparkles,
  User,
  Users,
  Zap,
} from "lucide-react";

type SettingsTab =
  | "general"
  | "ai"
  | "notifications"
  | "security"
  | "team"
  | "billing";

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-cyan-500" : "bg-slate-700"
      }`}
      aria-label="Toggle setting"
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-white/[0.06] py-5 last:border-b-0">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-slate-300">
          <Icon size={18} />
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">{title}</h3>
          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [saved, setSaved] = useState(false);

  const [workspaceName, setWorkspaceName] = useState("SupportFlow");
  const [timezone, setTimezone] = useState("Asia/Karachi");
  const [language, setLanguage] = useState("English");

  const [autoReply, setAutoReply] = useState(true);
  const [conversationSummary, setConversationSummary] = useState(true);
  const [sentimentDetection, setSentimentDetection] = useState(true);
  const [knowledgeSearch, setKnowledgeSearch] = useState(true);
  const [humanEscalation, setHumanEscalation] = useState(true);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [escalationNotifications, setEscalationNotifications] =
    useState(true);
  const [dailyReports, setDailyReports] = useState(false);
  const [browserNotifications, setBrowserNotifications] = useState(true);

  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionProtection, setSessionProtection] = useState(true);

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setSavedMessage(true);

    setTimeout(() => {
      setSaved(false);
      setSavedMessage(false);
    }, 2500);
  };

  const tabs: {
    id: SettingsTab;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "general", label: "General", icon: Settings },
    { id: "ai", label: "AI Configuration", icon: Bot },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "team", label: "Team", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/[0.06] bg-[#0a0f19] lg:flex lg:flex-col">
          <div className="flex h-16 items-center border-b border-white/[0.06] px-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/10">
                <Sparkles size={18} className="text-white" />
              </div>

              <div>
                <div className="text-sm font-semibold text-white">
                  SupportFlow
                </div>
                <div className="text-[10px] text-slate-500">
                  AI Support Platform
                </div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {[
              {
                href: "/",
                label: "Dashboard",
                icon: LayoutDashboard,
              },
              {
                href: "/chatbots",
                label: "AI Chatbots",
                icon: Bot,
              },
              {
                href: "/conversations",
                label: "Conversations",
                icon: MessageSquare,
              },
              {
                href: "/analytics",
                label: "Analytics",
                icon: Activity,
              },
              {
                href: "/knowledge-base",
                label: "Knowledge Base",
                icon: Globe,
              },
              {
                href: "/integrations",
                label: "Integrations",
                icon: Zap,
              },
              {
                href: "/human-support",
                label: "Human Support",
                icon: Headphones,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/[0.06] p-3">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2.5 text-sm text-white"
            >
              <Settings size={17} />
              Settings
            </Link>

            <div className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-xs font-semibold">
                IB
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">
                  Isha Batool
                </div>
                <div className="truncate text-[11px] text-slate-500">
                  Administrator
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="min-w-0 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#070b14]/90 px-5 backdrop-blur-xl lg:px-8">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={17} />
              </Link>

              <div>
                <h1 className="text-base font-semibold text-white">
                  Settings
                </h1>
                <p className="hidden text-xs text-slate-500 sm:block">
                  Manage your workspace and AI support configuration
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/10 transition hover:opacity-90"
            >
              {saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? "Saved" : "Save Changes"}
            </button>
          </header>

          <div className="mx-auto max-w-7xl p-5 lg:p-8">
            {/* Profile Banner */}
            <div className="mb-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b111c]">
              <div className="h-24 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10" />

              <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end">
                <div className="-mt-10 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-[#0b111c] bg-gradient-to-br from-cyan-400 to-indigo-500 text-xl font-bold">
                  IB
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">
                    Isha Batool
                  </h2>
                  <p className="text-sm text-slate-500">
                    Administrator · SupportFlow Workspace
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Workspace Active
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
              {/* Settings navigation */}
              <div className="h-fit rounded-2xl border border-white/[0.07] bg-[#0b111c] p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                        active
                          ? "bg-white/[0.07] text-white"
                          : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
                      }`}
                    >
                      <Icon size={17} />
                      <span className="flex-1">{tab.label}</span>
                      {active && <ChevronRight size={14} />}
                    </button>
                  );
                })}
              </div>

              {/* Settings content */}
              <div className="space-y-6">
                {/* GENERAL */}
                {activeTab === "general" && (
                  <>
                    <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c]">
                      <div className="border-b border-white/[0.06] p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                            <Settings size={19} />
                          </div>

                          <div>
                            <h2 className="font-semibold text-white">
                              General Settings
                            </h2>
                            <p className="text-xs text-slate-500">
                              Basic workspace configuration
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="grid gap-5 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-400">
                              Workspace Name
                            </label>

                            <input
                              value={workspaceName}
                              onChange={(e) =>
                                setWorkspaceName(e.target.value)
                              }
                              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-400">
                              Language
                            </label>

                            <select
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                              className="w-full rounded-xl border border-white/[0.08] bg-[#101722] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                            >
                              <option>English</option>
                              <option>Urdu</option>
                              <option>Arabic</option>
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-400">
                              Timezone
                            </label>

                            <select
                              value={timezone}
                              onChange={(e) => setTimezone(e.target.value)}
                              className="w-full rounded-xl border border-white/[0.08] bg-[#101722] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                            >
                              <option value="Asia/Karachi">
                                Asia/Karachi (PKT)
                              </option>
                              <option value="UTC">UTC</option>
                              <option value="America/New_York">
                                America/New_York
                              </option>
                              <option value="Europe/London">
                                Europe/London
                              </option>
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-400">
                              Workspace URL
                            </label>

                            <div className="flex overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
                              <span className="flex items-center border-r border-white/[0.06] px-3 text-xs text-slate-600">
                                app/
                              </span>

                              <input
                                defaultValue="supportflow"
                                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-6">
                      <h3 className="font-semibold text-white">
                        Workspace Preferences
                      </h3>

                      <div className="mt-2 divide-y divide-white/[0.06]">
                        <SettingRow
                          icon={Palette}
                          title="Compact interface"
                          description="Use tighter spacing throughout the dashboard."
                        >
                          <Toggle
                            enabled={false}
                            onChange={() => {}}
                          />
                        </SettingRow>

                        <SettingRow
                          icon={Globe}
                          title="Automatic timezone"
                          description="Automatically detect timezone from the administrator's browser."
                        >
                          <Toggle
                            enabled={false}
                            onChange={() => {}}
                          />
                        </SettingRow>
                      </div>
                    </div>
                  </>
                )}

                {/* AI */}
                {activeTab === "ai" && (
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c]">
                    <div className="border-b border-white/[0.06] p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300">
                          <Bot size={19} />
                        </div>

                        <div>
                          <h2 className="font-semibold text-white">
                            AI Configuration
                          </h2>
                          <p className="text-xs text-slate-500">
                            Configure how your AI support agents behave
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-6">
                      <SettingRow
                        icon={MessageSquare}
                        title="Automatic replies"
                        description="Allow AI agents to automatically respond to incoming customer messages."
                      >
                        <Toggle
                          enabled={autoReply}
                          onChange={setAutoReply}
                        />
                      </SettingRow>

                      <SettingRow
                        icon={Sparkles}
                        title="Conversation summaries"
                        description="Generate an AI summary when a conversation is completed."
                      >
                        <Toggle
                          enabled={conversationSummary}
                          onChange={setConversationSummary}
                        />
                      </SettingRow>

                      <SettingRow
                        icon={Activity}
                        title="Sentiment detection"
                        description="Detect positive, neutral, and negative customer sentiment."
                      >
                        <Toggle
                          enabled={sentimentDetection}
                          onChange={setSentimentDetection}
                        />
                      </SettingRow>

                      <SettingRow
                        icon={Globe}
                        title="Knowledge base search"
                        description="Let AI agents search your connected knowledge base before answering."
                      >
                        <Toggle
                          enabled={knowledgeSearch}
                          onChange={setKnowledgeSearch}
                        />
                      </SettingRow>

                      <SettingRow
                        icon={Headphones}
                        title="Human escalation"
                        description="Automatically escalate conversations when AI confidence is low."
                      >
                        <Toggle
                          enabled={humanEscalation}
                          onChange={setHumanEscalation}
                        />
                      </SettingRow>
                    </div>

                    <div className="m-6 rounded-xl border border-indigo-400/10 bg-indigo-400/[0.04] p-4">
                      <div className="flex gap-3">
                        <Sparkles
                          size={18}
                          className="mt-0.5 shrink-0 text-indigo-300"
                        />

                        <div>
                          <p className="text-sm font-medium text-white">
                            AI model configuration
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Your AI agents currently use the workspace default
                            model. Model-specific controls can be configured
                            from the chatbot settings.
                          </p>

                          <Link
                            href="/chatbots"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-300 hover:text-indigo-200"
                          >
                            Manage AI Chatbots
                            <ChevronRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === "notifications" && (
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c]">
                    <div className="border-b border-white/[0.06] p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                          <Bell size={19} />
                        </div>

                        <div>
                          <h2 className="font-semibold text-white">
                            Notifications
                          </h2>
                          <p className="text-xs text-slate-500">
                            Choose when SupportFlow should notify you
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-6">
                      <SettingRow
                        icon={Bell}
                        title="Email notifications"
                        description="Receive important workspace notifications by email."
                      >
                        <Toggle
                          enabled={emailNotifications}
                          onChange={setEmailNotifications}
                        />
                      </SettingRow>

                      <SettingRow
                        icon={Headphones}
                        title="Human escalation alerts"
                        description="Notify you whenever a customer conversation is escalated to a human."
                      >
                        <Toggle
                          enabled={escalationNotifications}
                          onChange={setEscalationNotifications}
                        />
                      </SettingRow>

                      <SettingRow
                        icon={Activity}
                        title="Daily reports"
                        description="Receive a daily summary of conversations, resolution rate, and AI performance."
                      >
                        <Toggle
                          enabled={dailyReports}
                          onChange={setDailyReports}
                        />
                      </SettingRow>

                      <SettingRow
                        icon={Globe}
                        title="Browser notifications"
                        description="Show real-time browser notifications for important support events."
                      >
                        <Toggle
                          enabled={browserNotifications}
                          onChange={setBrowserNotifications}
                        />
                      </SettingRow>
                    </div>
                  </div>
                )}

                {/* SECURITY */}
                {activeTab === "security" && (
                  <>
                    <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c]">
                      <div className="border-b border-white/[0.06] p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                            <Shield size={19} />
                          </div>

                          <div>
                            <h2 className="font-semibold text-white">
                              Security
                            </h2>
                            <p className="text-xs text-slate-500">
                              Protect your SupportFlow workspace
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-6">
                        <SettingRow
                          icon={Lock}
                          title="Two-factor authentication"
                          description="Add an additional verification step when signing in."
                        >
                          <Toggle
                            enabled={twoFactor}
                            onChange={setTwoFactor}
                          />
                        </SettingRow>

                        <SettingRow
                          icon={Shield}
                          title="Login alerts"
                          description="Receive an alert when a new device signs into your account."
                        >
                          <Toggle
                            enabled={loginAlerts}
                            onChange={setLoginAlerts}
                          />
                        </SettingRow>

                        <SettingRow
                          icon={KeyRound}
                          title="Session protection"
                          description="Automatically protect sessions from suspicious activity."
                        >
                          <Toggle
                            enabled={sessionProtection}
                            onChange={setSessionProtection}
                          />
                        </SettingRow>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-white">
                            Password
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            Last changed 24 days ago
                          </p>
                        </div>

                        <button className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* TEAM */}
                {activeTab === "team" && (
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c]">
                    <div className="flex items-center justify-between border-b border-white/[0.06] p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                          <Users size={19} />
                        </div>

                        <div>
                          <h2 className="font-semibold text-white">
                            Team Members
                          </h2>
                          <p className="text-xs text-slate-500">
                            Manage people who can access your workspace
                          </p>
                        </div>
                      </div>

                      <button className="rounded-xl bg-white/[0.06] px-4 py-2 text-xs font-medium text-white transition hover:bg-white/[0.1]">
                        Invite Member
                      </button>
                    </div>

                    <div className="divide-y divide-white/[0.06]">
                      {[
                        {
                          name: "Isha Batool",
                          email: "isha@example.com",
                          role: "Administrator",
                          initials: "IB",
                        },
                        {
                          name: "Support Agent",
                          email: "agent@supportflow.app",
                          role: "Agent",
                          initials: "SA",
                        },
                        {
                          name: "AI Operations",
                          email: "ai@supportflow.app",
                          role: "AI Manager",
                          initials: "AI",
                        },
                      ].map((member) => (
                        <div
                          key={member.email}
                          className="flex items-center justify-between gap-4 px-6 py-5"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-xs font-semibold text-cyan-200">
                              {member.initials}
                            </div>

                            <div>
                              <p className="text-sm font-medium text-white">
                                {member.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {member.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="hidden rounded-full bg-white/[0.05] px-3 py-1 text-[11px] text-slate-400 sm:block">
                              {member.role}
                            </span>

                            <button className="text-xs text-slate-500 hover:text-white">
                              Manage
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* BILLING */}
                {activeTab === "billing" && (
                  <>
                    <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-6">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300">
                              <CreditCard size={19} />
                            </div>

                            <div>
                              <h2 className="font-semibold text-white">
                                Pro Plan
                              </h2>
                              <p className="text-xs text-slate-500">
                                AI-powered customer support
                              </p>
                            </div>
                          </div>

                          <p className="mt-5 text-3xl font-bold text-white">
                            $49
                            <span className="text-sm font-normal text-slate-500">
                              /month
                            </span>
                          </p>
                        </div>

                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                          Active
                        </span>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {[
                          ["AI conversations", "10,000"],
                          ["Team members", "10"],
                          ["Knowledge articles", "Unlimited"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                          >
                            <p className="text-xs text-slate-500">{label}</p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <button className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-white/[0.06]">
                        Manage Subscription
                      </button>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-6">
                      <h3 className="font-semibold text-white">
                        Current Usage
                      </h3>

                      <div className="mt-5 space-y-5">
                        {[
                          ["AI Conversations", 64],
                          ["Team Members", 30],
                          ["Knowledge Storage", 42],
                        ].map(([label, value]) => (
                          <div key={label as string}>
                            <div className="mb-2 flex justify-between text-xs">
                              <span className="text-slate-400">
                                {label as string}
                              </span>
                              <span className="text-slate-500">
                                {value as number}%
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Save notification */}
                {savedMessage && (
                  <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-[#101722] px-4 py-3 shadow-2xl">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                      <Check size={15} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Settings saved
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Your changes have been applied.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Help */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#0b111c] p-5 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400">
                <CircleHelp size={18} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  Need help with your workspace?
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Check the documentation or contact the SupportFlow team.
                </p>
              </div>

              <button className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
                Contact Support
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}