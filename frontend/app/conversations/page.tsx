"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  Headphones,
  MessageSquare,
  MoreHorizontal,
  Search,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";

type ConversationStatus = "Open" | "Resolved" | "Human";

type Conversation = {
  id: number;
  name: string;
  email: string;
  preview: string;
  time: string;
  status: ConversationStatus;
  agent: string;
  unread: number;
};

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    preview: "I need help tracking my recent order.",
    time: "2 min ago",
    status: "Open",
    agent: "Support Assistant",
    unread: 2,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    preview: "Can I change my subscription plan?",
    time: "8 min ago",
    status: "Open",
    agent: "Sales Assistant",
    unread: 1,
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    preview: "Thanks, that solved my issue.",
    time: "21 min ago",
    status: "Resolved",
    agent: "Knowledge Bot",
    unread: 0,
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@example.com",
    preview: "I'd like to speak with a support representative.",
    time: "35 min ago",
    status: "Human",
    agent: "Human Support",
    unread: 3,
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.brown@example.com",
    preview: "Where can I find the invoice for my account?",
    time: "1 hr ago",
    status: "Resolved",
    agent: "Support Assistant",
    unread: 0,
  },
];

function StatusBadge({ status }: { status: ConversationStatus }) {
  const styles = {
    Open: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Resolved: "border-slate-400/20 bg-slate-400/10 text-slate-300",
    Human: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Open"
            ? "bg-emerald-400"
            : status === "Human"
              ? "bg-violet-400"
              : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

export default function ConversationsPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | ConversationStatus>("All");
  const [message, setMessage] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    conversations[0];

  const filteredConversations = useMemo(() => {
    const query = search.toLowerCase().trim();

    return conversations.filter((conversation) => {
      const matchesSearch =
        !query ||
        conversation.name.toLowerCase().includes(query) ||
        conversation.email.toLowerCase().includes(query) ||
        conversation.preview.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || conversation.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [conversations, search, filter]);

  const openCount = conversations.filter(
    (conversation) => conversation.status === "Open"
  ).length;

  const humanCount = conversations.filter(
    (conversation) => conversation.status === "Human"
  ).length;

  const resolvedCount = conversations.filter(
    (conversation) => conversation.status === "Resolved"
  ).length;

  function sendMessage() {
    if (!message.trim()) return;

    setMessage("");
  }

  function markResolved(id: number) {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? { ...conversation, status: "Resolved", unread: 0 }
          : conversation
      )
    );
  }

  function assignToHuman(id: number) {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? { ...conversation, status: "Human", agent: "Human Support" }
          : conversation
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[250px] shrink-0 border-r border-white/[0.06] bg-[#0a0f19] lg:block">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/[0.06] px-6 py-5">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/10">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold">SupportFlow</div>
                  <div className="text-[11px] text-slate-500">
                    AI Support Platform
                  </div>
                </div>
              </Link>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-5">
              {[
                { href: "/", label: "Dashboard", icon: Sparkles },
                { href: "/chatbots", label: "AI Chatbots", icon: Bot },
                {
                  href: "/conversations",
                  label: "Conversations",
                  icon: MessageSquare,
                  active: true,
                },
                { href: "/analytics", label: "Analytics", icon: Clock3 },
                {
                  href: "/knowledge-base",
                  label: "Knowledge Base",
                  icon: MessageSquare,
                },
                {
                  href: "/integrations",
                  label: "Integrations",
                  icon: Sparkles,
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
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      item.active
                        ? "bg-white/[0.07] text-white"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/[0.06] p-4">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-slate-300">
                    AI systems operational
                  </span>
                </div>
                <p className="text-[11px] leading-5 text-slate-500">
                  Your support agents are processing conversations normally.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="min-w-0 flex-1">
          <header className="flex min-h-[76px] items-center justify-between border-b border-white/[0.06] px-5 sm:px-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Link
                  href="/"
                  className="flex items-center gap-1 hover:text-slate-300"
                >
                  <ArrowLeft size={13} />
                  Dashboard
                </Link>
                <span>/</span>
                <span>Conversations</span>
              </div>
              <h1 className="mt-1 text-xl font-semibold tracking-tight">
                Conversations
              </h1>
            </div>

            <Link
              href="/human-support"
              className="hidden items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-2.5 text-sm font-medium text-violet-300 transition hover:bg-violet-400/15 sm:flex"
            >
              <Headphones size={16} />
              Human Support
            </Link>
          </header>

          <div className="p-5 sm:p-8">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.06] bg-[#0b111c] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Active conversations
                  </span>
                  <MessageSquare
                    size={18}
                    className="text-cyan-400"
                  />
                </div>
                <div className="text-2xl font-semibold">{openCount}</div>
                <p className="mt-1 text-xs text-slate-500">
                  Currently waiting for a response
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-[#0b111c] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Human handoffs
                  </span>
                  <Headphones
                    size={18}
                    className="text-violet-400"
                  />
                </div>
                <div className="text-2xl font-semibold">{humanCount}</div>
                <p className="mt-1 text-xs text-slate-500">
                  Conversations assigned to support
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-[#0b111c] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Resolved
                  </span>
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400"
                  />
                </div>
                <div className="text-2xl font-semibold">
                  {resolvedCount}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Successfully completed conversations
                </p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search conversations..."
                  className="w-full rounded-xl border border-white/[0.07] bg-[#0b111c] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
                />
              </div>

              <div className="relative flex gap-2">
                <button
                  onClick={() => setShowFilters((value) => !value)}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b111c] px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.04]"
                >
                  <Filter size={16} />
                  Filter
                  <ChevronDown size={14} />
                </button>

                {showFilters && (
                  <div className="absolute right-0 top-14 z-30 w-44 rounded-xl border border-white/[0.08] bg-[#101722] p-2 shadow-2xl">
                    {["All", "Open", "Human", "Resolved"].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setFilter(item as "All" | ConversationStatus);
                          setShowFilters(false);
                        }}
                        className={`flex w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                          filter === item
                            ? "bg-white/[0.07] text-white"
                            : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}

                <button className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b111c] px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.04] sm:flex">
                  <Clock3 size={16} />
                  Recent
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Conversation workspace */}
            <div className="mt-6 grid min-h-[600px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b111c] lg:grid-cols-[340px_minmax(0,1fr)]">
              {/* List */}
              <div className="border-b border-white/[0.06] lg:border-b-0 lg:border-r">
                <div className="border-b border-white/[0.06] px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      Inbox
                    </span>
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs text-slate-400">
                      {filteredConversations.length}
                    </span>
                  </div>
                </div>

                <div className="max-h-[600px] overflow-y-auto">
                  {filteredConversations.length === 0 ? (
                    <div className="p-8 text-center">
                      <Search
                        size={24}
                        className="mx-auto mb-3 text-slate-600"
                      />
                      <p className="text-sm text-slate-400">
                        No conversations found
                      </p>
                    </div>
                  ) : (
                    filteredConversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedId(conversation.id)}
                        className={`w-full border-b border-white/[0.05] p-4 text-left transition ${
                          selectedId === conversation.id
                            ? "bg-white/[0.05]"
                            : "hover:bg-white/[0.025]"
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-sm font-semibold text-cyan-300">
                            {conversation.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate text-sm font-medium text-white">
                                {conversation.name}
                              </span>
                              <span className="shrink-0 text-[10px] text-slate-600">
                                {conversation.time}
                              </span>
                            </div>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {conversation.preview}
                            </p>

                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-[10px] text-slate-600">
                                {conversation.agent}
                              </span>

                              <div className="flex items-center gap-2">
                                <StatusBadge status={conversation.status} />
                                {conversation.unread > 0 && (
                                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1.5 text-[10px] font-semibold text-slate-950">
                                    {conversation.unread}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Conversation */}
              {selectedConversation && (
                <div className="flex min-h-[600px] flex-col">
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-sm font-semibold text-cyan-300">
                        {selectedConversation.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-semibold">
                            {selectedConversation.name}
                          </h2>
                          <StatusBadge
                            status={selectedConversation.status}
                          />
                        </div>
                        <p className="text-xs text-slate-500">
                          {selectedConversation.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          assignToHuman(selectedConversation.id)
                        }
                        title="Assign to human support"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.05] hover:text-violet-300"
                      >
                        <Headphones size={17} />
                      </button>

                      <button
                        onClick={() =>
                          markResolved(selectedConversation.id)
                        }
                        title="Mark resolved"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.05] hover:text-emerald-300"
                      >
                        <CheckCircle2 size={17} />
                      </button>

                      <button className="rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.05] hover:text-white">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 space-y-5 overflow-y-auto p-5">
                    <div className="flex justify-center">
                      <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1 text-[10px] text-slate-600">
                        Today
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700/50">
                        <User size={15} className="text-slate-400" />
                      </div>

                      <div className="max-w-[75%]">
                        <div className="rounded-2xl rounded-tl-md border border-white/[0.06] bg-[#101722] px-4 py-3">
                          <p className="text-sm leading-6 text-slate-300">
                            {selectedConversation.preview}
                          </p>
                        </div>
                        <span className="mt-1 block text-[10px] text-slate-600">
                          {selectedConversation.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start justify-end gap-3">
                      <div className="max-w-[75%]">
                        <div className="rounded-2xl rounded-tr-md border border-cyan-400/10 bg-cyan-400/[0.06] px-4 py-3">
                          <p className="text-sm leading-6 text-slate-300">
                            I&apos;d be happy to help with that. Let me check
                            the available information and guide you through
                            the next steps.
                          </p>
                        </div>
                        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-600">
                          <Bot size={11} />
                          AI Assistant
                        </div>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/10">
                        <Bot size={15} className="text-cyan-400" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.06] p-4">
                    <div className="flex items-end gap-2 rounded-xl border border-white/[0.07] bg-[#101722] p-2">
                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            sendMessage();
                          }
                        }}
                        rows={1}
                        placeholder="Type a reply..."
                        className="max-h-28 min-h-[42px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-600"
                      />

                      <button
                        onClick={sendMessage}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400 text-slate-950 transition hover:bg-cyan-300"
                      >
                        <Send size={16} />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between px-1">
                      <span className="text-[10px] text-slate-600">
                        Press Enter to send · Shift + Enter for new line
                      </span>

                      <span className="flex items-center gap-1 text-[10px] text-slate-600">
                        <Sparkles size={11} />
                        AI-assisted
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}