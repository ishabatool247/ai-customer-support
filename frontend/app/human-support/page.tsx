"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Search,
  Send,
  Sparkles,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";

type Priority = "High" | "Medium" | "Low";
type Status = "Waiting" | "In Progress" | "Resolved";

type Conversation = {
  id: number;
  customer: string;
  email: string;
  initials: string;
  subject: string;
  lastMessage: string;
  time: string;
  priority: Priority;
  status: Status;
  channel: string;
  agent: string | null;
  messages: {
    sender: "customer" | "agent";
    text: string;
    time: string;
  }[];
};

const navigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chatbots", label: "AI Chatbots", icon: Bot, badge: "3" },
  { href: "/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/knowledge-base", label: "Knowledge Base", icon: Sparkles },
  { href: "/integrations", label: "Integrations", icon: Zap },
  { href: "/human-support", label: "Human Support", icon: Headphones },
];

const initialConversations: Conversation[] = [
  {
    id: 1,
    customer: "James Wilson",
    email: "james.wilson@example.com",
    initials: "JW",
    subject: "Payment was charged twice",
    lastMessage:
      "I can see two charges on my card for the same subscription.",
    time: "2 min ago",
    priority: "High",
    status: "Waiting",
    channel: "Website",
    agent: null,
    messages: [
      {
        sender: "customer",
        text: "Hi, I think I was charged twice for my subscription.",
        time: "10:41 PM",
      },
      {
        sender: "agent",
        text: "Thanks for reaching out. I'll check the billing details for you.",
        time: "10:42 PM",
      },
      {
        sender: "customer",
        text: "I can see two charges on my card for the same subscription.",
        time: "10:44 PM",
      },
    ],
  },
  {
    id: 2,
    customer: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    initials: "SA",
    subject: "Unable to access account",
    lastMessage: "The password reset email isn't arriving.",
    time: "8 min ago",
    priority: "High",
    status: "In Progress",
    channel: "Website",
    agent: "You",
    messages: [
      {
        sender: "customer",
        text: "I cannot access my account anymore.",
        time: "10:30 PM",
      },
      {
        sender: "customer",
        text: "The password reset email isn't arriving.",
        time: "10:31 PM",
      },
      {
        sender: "agent",
        text: "I'm looking into the account and password reset issue now.",
        time: "10:33 PM",
      },
    ],
  },
  {
    id: 3,
    customer: "Michael Chen",
    email: "michael.chen@example.com",
    initials: "MC",
    subject: "Enterprise plan question",
    lastMessage: "Can someone explain the enterprise features?",
    time: "14 min ago",
    priority: "Medium",
    status: "Waiting",
    channel: "Chat",
    agent: null,
    messages: [
      {
        sender: "customer",
        text: "Hello, I'm interested in the enterprise plan.",
        time: "10:20 PM",
      },
      {
        sender: "customer",
        text: "Can someone explain the enterprise features?",
        time: "10:22 PM",
      },
    ],
  },
  {
    id: 4,
    customer: "Emily Carter",
    email: "emily.carter@example.com",
    initials: "EC",
    subject: "Feature not working",
    lastMessage: "The chatbot widget isn't showing on my website.",
    time: "21 min ago",
    priority: "Medium",
    status: "In Progress",
    channel: "Website",
    agent: "You",
    messages: [
      {
        sender: "customer",
        text: "The chatbot widget isn't showing on my website.",
        time: "10:13 PM",
      },
      {
        sender: "agent",
        text: "Could you confirm whether the widget script is installed?",
        time: "10:16 PM",
      },
      {
        sender: "customer",
        text: "Yes, I added the script but it still doesn't appear.",
        time: "10:18 PM",
      },
    ],
  },
  {
    id: 5,
    customer: "Daniel Smith",
    email: "daniel.smith@example.com",
    initials: "DS",
    subject: "Refund request",
    lastMessage: "I'd like to request a refund for my last payment.",
    time: "32 min ago",
    priority: "Low",
    status: "Resolved",
    channel: "Email",
    agent: "You",
    messages: [
      {
        sender: "customer",
        text: "I'd like to request a refund for my last payment.",
        time: "9:58 PM",
      },
      {
        sender: "agent",
        text: "Your refund request has been submitted successfully.",
        time: "10:04 PM",
      },
    ],
  },
];

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
            const active = item.href === "/human-support";

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
              <Headphones size={14} className="text-cyan-400" />
            </div>

            <span className="text-xs font-semibold text-white">
              Human Support
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            You are online
          </div>
        </div>
      </div>
    </aside>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0b111c] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]">
          <Icon size={15} className="text-cyan-400" />
        </div>

        <div>
          <p className="text-[10px] text-slate-600">{label}</p>
          <p className="text-base font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function HumanSupportPage() {
  const [conversations, setConversations] = useState<Conversation[]>(
    initialConversations
  );
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [priorityFilter, setPriorityFilter] = useState<
    "All" | Priority
  >("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [reply, setReply] = useState("");
  const [agentOnline, setAgentOnline] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const selectedConversation =
    conversations.find((item) => item.id === selectedId) ?? null;

  const filteredConversations = useMemo(() => {
    const query = search.toLowerCase().trim();

    return conversations.filter((conversation) => {
      const matchesSearch =
        !query ||
        conversation.customer.toLowerCase().includes(query) ||
        conversation.email.toLowerCase().includes(query) ||
        conversation.subject.toLowerCase().includes(query);

      const matchesStatus =
        filter === "All" || conversation.status === filter;

      const matchesPriority =
        priorityFilter === "All" ||
        conversation.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [conversations, search, filter, priorityFilter]);

  const waiting = conversations.filter(
    (item) => item.status === "Waiting"
  ).length;

  const active = conversations.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolved = conversations.filter(
    (item) => item.status === "Resolved"
  ).length;

  const updateConversation = (
    id: number,
    updates: Partial<Conversation>
  ) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? { ...conversation, ...updates }
          : conversation
      )
    );
  };

  const assignConversation = () => {
    if (!selectedConversation) return;

    updateConversation(selectedConversation.id, {
      agent: "You",
      status: "In Progress",
    });
  };

  const resolveConversation = () => {
    if (!selectedConversation) return;

    updateConversation(selectedConversation.id, {
      status: "Resolved",
      agent: "You",
    });
  };

  const sendReply = () => {
    if (!selectedConversation || !reply.trim()) return;

    const newMessage = {
      sender: "agent" as const,
      text: reply.trim(),
      time: "Just now",
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
              lastMessage: reply.trim(),
              time: "Just now",
              agent: "You",
              status: "In Progress",
            }
          : conversation
      )
    );

    setReply("");
  };

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-[72px] items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-3 sm:px-8">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Human Support
            </h1>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Manage conversations that need human assistance
            </p>
          </div>

          <button
            onClick={() => setAgentOnline((value) => !value)}
            className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b111c] px-3 py-2 text-[11px] font-medium text-slate-300 transition hover:bg-white/[0.05]"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                agentOnline ? "bg-emerald-400" : "bg-slate-600"
              }`}
            />
            {agentOnline ? "Online" : "Offline"}
            <ChevronDown size={13} className="text-slate-600" />
          </button>
        </header>

        <div className="border-b border-white/[0.06] p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat
              icon={Headphones}
              label="Waiting for support"
              value={waiting.toString()}
            />

            <Stat
              icon={Users}
              label="In progress"
              value={active.toString()}
            />

            <Stat
              icon={CheckCircle2}
              label="Resolved today"
              value={resolved.toString()}
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <section className="w-full shrink-0 border-b border-white/[0.06] lg:w-[360px] lg:border-b-0 lg:border-r">
            <div className="border-b border-white/[0.06] p-4">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search conversations..."
                  className="h-10 w-full rounded-xl border border-white/[0.07] bg-[#0b111c] pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
                />
              </div>

              <div className="mt-3 flex gap-2">
                <div className="flex flex-1 overflow-x-auto rounded-lg border border-white/[0.06] bg-[#0b111c] p-1">
                  {(["All", "Waiting", "In Progress", "Resolved"] as const).map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-[9px] font-medium transition ${
                          filter === item
                            ? "bg-white/[0.08] text-white"
                            : "text-slate-600 hover:text-slate-300"
                        }`}
                      >
                        {item === "In Progress" ? "Active" : item}
                      </button>
                    )
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setShowFilterMenu((value) => !value)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-[#0b111c] text-slate-500 hover:text-white"
                  >
                    <MoreHorizontal size={15} />
                  </button>

                  {showFilterMenu && (
                    <div className="absolute right-0 top-11 z-30 w-36 rounded-xl border border-white/[0.08] bg-[#101722] p-1.5 shadow-2xl">
                      {(["All", "High", "Medium", "Low"] as const).map(
                        (item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setPriorityFilter(item);
                              setShowFilterMenu(false);
                            }}
                            className={`w-full rounded-lg px-3 py-2 text-left text-[10px] ${
                              priorityFilter === item
                                ? "bg-white/[0.07] text-white"
                                : "text-slate-500 hover:bg-white/[0.04] hover:text-white"
                            }`}
                          >
                            {item === "All"
                              ? "All priorities"
                              : `${item} priority`}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="max-h-[550px] overflow-y-auto lg:max-h-[calc(100vh-220px)]">
              {filteredConversations.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <Search
                    size={20}
                    className="mx-auto text-slate-700"
                  />
                  <p className="mt-3 text-xs text-slate-500">
                    No conversations found
                  </p>
                </div>
              ) : (
                filteredConversations.map((conversation) => {
                  const selected = conversation.id === selectedId;

                  return (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedId(conversation.id)}
                      className={`w-full border-b border-white/[0.05] p-4 text-left transition ${
                        selected
                          ? "bg-white/[0.045]"
                          : "hover:bg-white/[0.025]"
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-[10px] font-bold text-slate-300">
                          {conversation.initials}

                          {conversation.status === "Waiting" && (
                            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#070b14] bg-amber-400" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-xs font-semibold text-white">
                              {conversation.customer}
                            </span>

                            <span className="shrink-0 text-[9px] text-slate-600">
                              {conversation.time}
                            </span>
                          </div>

                          <p className="mt-1 truncate text-[10px] font-medium text-slate-400">
                            {conversation.subject}
                          </p>

                          <p className="mt-1 truncate text-[10px] text-slate-600">
                            {conversation.lastMessage}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`rounded-md px-1.5 py-0.5 text-[8px] font-semibold ${
                                conversation.priority === "High"
                                  ? "bg-rose-400/10 text-rose-400"
                                  : conversation.priority === "Medium"
                                    ? "bg-amber-400/10 text-amber-400"
                                    : "bg-slate-400/10 text-slate-500"
                              }`}
                            >
                              {conversation.priority}
                            </span>

                            <span
                              className={`text-[8px] ${
                                conversation.status === "Waiting"
                                  ? "text-amber-400"
                                  : conversation.status === "In Progress"
                                    ? "text-cyan-400"
                                    : "text-emerald-400"
                              }`}
                            >
                              {conversation.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          <section className="flex min-h-[620px] min-w-0 flex-1 flex-col">
            {selectedConversation ? (
              <>
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-[10px] font-bold text-slate-300">
                      {selectedConversation.initials}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-sm font-semibold text-white">
                          {selectedConversation.customer}
                        </h2>

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            selectedConversation.status === "Resolved"
                              ? "bg-emerald-400"
                              : "bg-cyan-400"
                          }`}
                        />
                      </div>

                      <p className="truncate text-[10px] text-slate-600">
                        {selectedConversation.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowDetails((value) => !value)}
                    className="flex h-8 items-center gap-2 rounded-lg border border-white/[0.06] px-2.5 text-[10px] text-slate-500 hover:bg-white/[0.04] hover:text-white"
                  >
                    <UserRound size={13} />
                    <span className="hidden sm:inline">Details</span>
                  </button>
                </div>

                <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#090e18]/50 px-5 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-600">
                      {selectedConversation.channel}
                    </span>

                    <span className="h-3 w-px bg-white/[0.08]" />

                    <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <Clock3 size={11} />
                      {selectedConversation.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedConversation.agent ? (
                      <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-[9px] font-semibold text-cyan-400">
                        Assigned to {selectedConversation.agent}
                      </span>
                    ) : (
                      <button
                        onClick={assignConversation}
                        className="rounded-md bg-cyan-400/10 px-2 py-1 text-[9px] font-semibold text-cyan-400 transition hover:bg-cyan-400/15"
                      >
                        Assign to me
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-5 overflow-y-auto p-5">
                  <div className="mx-auto flex max-w-md items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.025] px-4 py-3">
                    <Sparkles
                      size={14}
                      className="shrink-0 text-cyan-400"
                    />
                    <p className="text-[10px] leading-4 text-slate-500">
                      AI escalated this conversation because it requires
                      human assistance.
                    </p>
                  </div>

                  <div className="mx-auto max-w-2xl space-y-4">
                    {selectedConversation.messages.map((message, index) => (
                      <div
                        key={`${message.time}-${index}`}
                        className={`flex ${
                          message.sender === "agent"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[78%] ${
                            message.sender === "agent"
                              ? "items-end"
                              : "items-start"
                          } flex flex-col`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-3 text-xs leading-5 ${
                              message.sender === "agent"
                                ? "rounded-br-md bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-slate-200"
                                : "rounded-bl-md border border-white/[0.06] bg-[#0b111c] text-slate-400"
                            }`}
                          >
                            {message.text}
                          </div>

                          <span className="mt-1.5 px-1 text-[9px] text-slate-700">
                            {message.sender === "agent" ? "You" : selectedConversation.customer}{" "}
                            · {message.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/[0.06] bg-[#090e18]/60 p-4">
                  {selectedConversation.status === "Resolved" ? (
                    <div className="flex items-center justify-between rounded-xl border border-emerald-400/10 bg-emerald-400/[0.035] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={15}
                          className="text-emerald-400"
                        />
                        <span className="text-[10px] text-slate-400">
                          This conversation has been resolved.
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          updateConversation(selectedConversation.id, {
                            status: "In Progress",
                          })
                        }
                        className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300"
                      >
                        Reopen
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-end gap-2">
                        <textarea
                          value={reply}
                          onChange={(event) => setReply(event.target.value)}
                          onKeyDown={(event) => {
                            if (
                              event.key === "Enter" &&
                              !event.shiftKey
                            ) {
                              event.preventDefault();
                              sendReply();
                            }
                          }}
                          rows={2}
                          placeholder="Type your reply..."
                          className="min-h-[72px] flex-1 resize-none rounded-xl border border-white/[0.07] bg-[#0b111c] px-3 py-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
                        />

                        <button
                          onClick={sendReply}
                          disabled={!reply.trim()}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Send size={15} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[9px] text-slate-700">
                          Press Enter to send · Shift + Enter for new line
                        </span>

                        <button
                          onClick={resolveConversation}
                          className="flex items-center gap-1.5 rounded-lg border border-emerald-400/10 bg-emerald-400/5 px-3 py-1.5 text-[9px] font-semibold text-emerald-400 transition hover:bg-emerald-400/10"
                        >
                          <CheckCircle2 size={12} />
                          Resolve
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {showDetails && (
                  <div className="absolute right-5 top-[90px] z-20 w-72 rounded-2xl border border-white/[0.08] bg-[#101722] p-4 shadow-2xl shadow-black/40">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xs font-semibold text-white">
                        Customer Details
                      </h3>

                      <button
                        onClick={() => setShowDetails(false)}
                        className="text-slate-600 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                          Customer
                        </p>
                        <p className="mt-1 text-xs text-slate-300">
                          {selectedConversation.customer}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                          Email
                        </p>
                        <p className="mt-1 break-all text-xs text-slate-300">
                          {selectedConversation.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                          Priority
                        </p>
                        <p className="mt-1 text-xs text-slate-300">
                          {selectedConversation.priority}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                          Channel
                        </p>
                        <p className="mt-1 text-xs text-slate-300">
                          {selectedConversation.channel}
                        </p>
                      </div>

                      <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.035] p-3">
                        <div className="flex gap-2">
                          <AlertCircle
                            size={13}
                            className="mt-0.5 shrink-0 text-amber-400"
                          />
                          <p className="text-[9px] leading-4 text-slate-500">
                            This conversation was escalated from the AI
                            support queue.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04]">
                    <Headphones size={20} className="text-slate-600" />
                  </div>
                  <p className="mt-4 text-xs text-slate-500">
                    Select a conversation
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}