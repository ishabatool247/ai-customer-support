"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Code2,
  Edit3,
  Eye,
  Filter,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";

type ChatbotStatus = "Active" | "Draft";

type Chatbot = {
  id: number;
  name: string;
  description: string;
  status: ChatbotStatus;
  conversations: number;
  resolution: number;
  responseTime: string;
  updated: string;
  initials: string;
};

const defaultChatbots: Chatbot[] = [
  {
    id: 1,
    name: "Support Assistant",
    description:
      "Handles customer questions and common support requests.",
    status: "Active",
    conversations: 1284,
    resolution: 94,
    responseTime: "1.2s",
    updated: "2 hours ago",
    initials: "SA",
  },
  {
    id: 2,
    name: "Sales Assistant",
    description:
      "Helps visitors discover products and convert more leads.",
    status: "Active",
    conversations: 846,
    resolution: 89,
    responseTime: "1.5s",
    updated: "Yesterday",
    initials: "SS",
  },
  {
    id: 3,
    name: "Knowledge Bot",
    description:
      "Answers questions using your connected knowledge base.",
    status: "Active",
    conversations: 632,
    resolution: 91,
    responseTime: "1.3s",
    updated: "2 days ago",
    initials: "KB",
  },
  {
    id: 4,
    name: "Website Assistant",
    description:
      "Website support assistant currently being configured.",
    status: "Draft",
    conversations: 0,
    resolution: 0,
    responseTime: "—",
    updated: "3 days ago",
    initials: "WA",
  },
];

const STORAGE_KEY = "supportflow-chatbots";

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>(defaultChatbots);
  const [mounted, setMounted] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Draft"
  >("All");

  const [showCreate, setShowCreate] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [editingBot, setEditingBot] = useState<Chatbot | null>(null);
  const [previewBot, setPreviewBot] = useState<Chatbot | null>(null);
  const [configBot, setConfigBot] = useState<Chatbot | null>(null);
  const [deleteBot, setDeleteBot] = useState<Chatbot | null>(null);

  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    setMounted(true);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setChatbots(parsed);
        }
      }
    } catch {
      console.error("Unable to load saved chatbots.");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatbots));
    } catch {
      console.error("Unable to save chatbots.");
    }
  }, [chatbots, mounted]);

  const filteredChatbots = useMemo(() => {
    const query = search.trim().toLowerCase();

    return chatbots.filter((bot) => {
      const matchesSearch =
        !query ||
        bot.name.toLowerCase().includes(query) ||
        bot.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || bot.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [chatbots, search, statusFilter]);

  const activeBots = chatbots.filter(
    (bot) => bot.status === "Active",
  ).length;

  const totalConversations = chatbots.reduce(
    (total, bot) => total + bot.conversations,
    0,
  );

  const avgResolution =
    activeBots > 0
      ? Math.round(
          chatbots
            .filter((bot) => bot.status === "Active")
            .reduce((total, bot) => total + bot.resolution, 0) /
            activeBots,
        )
      : 0;

  const createChatbot = () => {
    const name = newName.trim();
    const description = newDescription.trim();

    if (!name) return;

    const newBot: Chatbot = {
      id: Date.now(),
      name,
      description:
        description || "New AI assistant ready to be configured.",
      status: "Draft",
      conversations: 0,
      resolution: 0,
      responseTime: "—",
      updated: "Just now",
      initials: getInitials(name),
    };

    setChatbots((current) => [newBot, ...current]);

    setNewName("");
    setNewDescription("");
    setShowCreate(false);
  };

  const startEditing = (bot: Chatbot) => {
    setEditingBot(bot);
    setEditName(bot.name);
    setEditDescription(bot.description);
    setOpenMenu(null);
  };

  const saveEdit = () => {
    if (!editingBot || !editName.trim()) return;

    setChatbots((current) =>
      current.map((bot) =>
        bot.id === editingBot.id
          ? {
              ...bot,
              name: editName.trim(),
              description:
                editDescription.trim() ||
                "AI assistant for your workspace.",
              initials: getInitials(editName.trim()),
              updated: "Just now",
            }
          : bot,
      ),
    );

    setEditingBot(null);
  };

  const toggleStatus = (id: number) => {
    setChatbots((current) =>
      current.map((bot) =>
        bot.id === id
          ? {
              ...bot,
              status: bot.status === "Active" ? "Draft" : "Active",
              updated: "Just now",
            }
          : bot,
      ),
    );

    setOpenMenu(null);
  };

  const confirmDelete = () => {
    if (!deleteBot) return;

    setChatbots((current) =>
      current.filter((bot) => bot.id !== deleteBot.id),
    );

    setDeleteBot(null);
    setOpenMenu(null);
  };

  const resetDemoData = () => {
    setChatbots(defaultChatbots);
  };

  return (
    <main
      className="min-h-screen bg-[#080c14] text-white"
      onClick={() => setOpenMenu(null)}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#080c14]/95 backdrop-blur-xl">
        <div className="flex h-[76px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:border-cyan-400/30 hover:text-white"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Workspace
              </p>

              <h1 className="mt-0.5 text-xl font-semibold tracking-tight">
                AI Chatbots
              </h1>
            </div>
          </div>

          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHelp(true)}
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:border-white/[0.14] hover:text-white sm:flex"
            >
              <CircleHelp size={18} />
            </button>

            <Link
              href="/settings"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:border-white/[0.14] hover:text-white"
            >
              <Settings size={17} />
            </Link>

            <button
              onClick={() => setShowCreate(true)}
              className="ml-1 flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:from-cyan-400 hover:to-blue-400"
            >
              <Plus size={17} />

              <span className="hidden sm:inline">
                Create AI Chatbot
              </span>

              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:py-9">
        {/* HERO */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1.5 text-xs font-medium text-cyan-300">
                <Sparkles size={13} />
                AI Workspace
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Your AI assistants
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Create, manage and monitor AI-powered assistants from
                one workspace.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
              AI system online
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={<Bot size={18} />}
            label="Total Chatbots"
            value={chatbots.length.toString()}
            detail={`${activeBots} active`}
          />

          <StatCard
            icon={<MessageSquare size={18} />}
            label="Conversations"
            value={totalConversations.toLocaleString()}
            detail="All assistants"
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="Resolution Rate"
            value={`${avgResolution}%`}
            detail="Average active bots"
          />

          <StatCard
            icon={<Zap size={18} />}
            label="System Status"
            value="99.98%"
            detail="Service uptime"
          />
        </section>

        {/* SEARCH / FILTER */}
        <section className="mb-6 rounded-2xl border border-white/[0.07] bg-[#0c111b] p-3 shadow-2xl shadow-black/10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search AI chatbots..."
                className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/30 focus:bg-white/[0.04]"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as
                        | "All"
                        | "Active"
                        | "Draft",
                    )
                  }
                  className="h-11 appearance-none rounded-xl border border-white/[0.07] bg-[#101722] px-10 pr-9 text-sm text-slate-300 outline-none transition focus:border-cyan-400/30"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>

                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>

              <div className="hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5 text-xs text-slate-500 sm:block">
                {filteredChatbots.length} chatbot
                {filteredChatbots.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </section>

        {/* CHATBOTS */}
        {filteredChatbots.length > 0 ? (
          <section className="grid gap-4 xl:grid-cols-2">
            {filteredChatbots.map((bot) => (
              <ChatbotCard
                key={bot.id}
                bot={bot}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                onEdit={startEditing}
                onPreview={(selected) => {
                  setPreviewBot(selected);
                  setOpenMenu(null);
                }}
                onConfigure={(selected) => {
                  setConfigBot(selected);
                  setOpenMenu(null);
                }}
                onToggle={toggleStatus}
                onDelete={(selected) => {
                  setDeleteBot(selected);
                  setOpenMenu(null);
                }}
              />
            ))}
          </section>
        ) : (
          <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.09] bg-[#0c111b] px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] text-slate-500">
              <Search size={22} />
            </div>

            <h3 className="text-base font-semibold">
              No chatbots found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Try changing your search or create a new AI chatbot.
            </p>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/[0.06]"
              >
                Clear filters
              </button>

              <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-sm font-semibold"
              >
                <Plus size={16} />
                Create chatbot
              </button>
            </div>
          </section>
        )}

        {/* BOTTOM CTA */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.06] via-[#0c111b] to-blue-500/[0.05]">
          <div className="flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300">
                <Code2 size={19} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Connect your AI assistant
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  Deploy your chatbot to your website and start
                  handling customer conversations automatically.
                </p>
              </div>
            </div>

            <Link
              href="/integrations"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.07]"
            >
              View integrations
              <ArrowLeft size={15} className="rotate-180" />
            </Link>
          </div>
        </section>

        {/* RESET DEMO */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={resetDemoData}
            className="text-[11px] text-slate-600 transition hover:text-slate-400"
          >
            Reset demo data
          </button>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <Modal onClose={() => setShowCreate(false)}>
          <div className="flex items-start justify-between">
            <ModalHeading
              icon={<Bot size={19} />}
              title="Create AI Chatbot"
              description="Set up a new assistant for your workspace."
            />

            <CloseButton onClick={() => setShowCreate(false)} />
          </div>

          <div className="mt-6 space-y-4">
            <InputField
              label="Chatbot name"
              value={newName}
              onChange={setNewName}
              placeholder="e.g. Customer Support Bot"
              autoFocus
            />

            <TextareaField
              label="Description"
              value={newDescription}
              onChange={setNewDescription}
              placeholder="What should this AI assistant help with?"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <SecondaryButton
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </SecondaryButton>

            <PrimaryButton
              onClick={createChatbot}
              disabled={!newName.trim()}
            >
              <Plus size={16} />
              Create chatbot
            </PrimaryButton>
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {editingBot && (
        <Modal onClose={() => setEditingBot(null)}>
          <div className="flex items-start justify-between">
            <ModalHeading
              icon={<Edit3 size={18} />}
              title="Edit chatbot"
              description="Update your assistant details."
            />

            <CloseButton onClick={() => setEditingBot(null)} />
          </div>

          <div className="mt-6 space-y-4">
            <InputField
              label="Chatbot name"
              value={editName}
              onChange={setEditName}
              placeholder="Chatbot name"
              autoFocus
            />

            <TextareaField
              label="Description"
              value={editDescription}
              onChange={setEditDescription}
              placeholder="Describe your AI assistant..."
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <SecondaryButton
              onClick={() => setEditingBot(null)}
            >
              Cancel
            </SecondaryButton>

            <PrimaryButton
              onClick={saveEdit}
              disabled={!editName.trim()}
            >
              <CheckCircle2 size={16} />
              Save changes
            </PrimaryButton>
          </div>
        </Modal>
      )}

      {/* PREVIEW MODAL */}
      {previewBot && (
        <Modal onClose={() => setPreviewBot(null)}>
          <div className="flex items-start justify-between">
            <ModalHeading
              icon={<Eye size={18} />}
              title="Chatbot preview"
              description={`Previewing ${previewBot.name}`}
            />

            <CloseButton onClick={() => setPreviewBot(null)} />
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080c14]">
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#101722] p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-blue-500/15 text-xs font-semibold text-cyan-300">
                {previewBot.initials}
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {previewBot.name}
                </p>

                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  AI assistant online
                </div>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.035] px-4 py-3 text-xs leading-5 text-slate-400">
                Hi! I&apos;m {previewBot.name}. How can I help you
                today?
              </div>

              <div className="ml-auto max-w-[75%] rounded-2xl rounded-tr-md bg-gradient-to-r from-cyan-500/15 to-blue-500/15 px-4 py-3 text-xs leading-5 text-slate-300">
                I need help with my account.
              </div>

              <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.035] px-4 py-3 text-xs leading-5 text-slate-400">
                Absolutely. I can help you with account settings,
                support questions, and more.
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <SecondaryButton onClick={() => setPreviewBot(null)}>
              Close preview
            </SecondaryButton>
          </div>
        </Modal>
      )}

      {/* CONFIGURE MODAL */}
      {configBot && (
        <Modal onClose={() => setConfigBot(null)}>
          <div className="flex items-start justify-between">
            <ModalHeading
              icon={<Code2 size={18} />}
              title="Configure chatbot"
              description={`Manage settings for ${configBot.name}.`}
            />

            <CloseButton onClick={() => setConfigBot(null)} />
          </div>

          <div className="mt-6 space-y-3">
            <ConfigRow
              title="Status"
              value={configBot.status}
              active={configBot.status === "Active"}
            />

            <ConfigRow
              title="Knowledge Base"
              value="Connected"
              active
            />

            <ConfigRow
              title="AI Response Mode"
              value="Automatic"
              active
            />

            <ConfigRow
              title="Website Widget"
              value="Ready to connect"
              active={false}
            />
          </div>

          <div className="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
            <p className="text-xs font-medium text-cyan-300">
              Next step
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Connect your knowledge base and website integration to
              start receiving real customer conversations.
            </p>
          </div>

          <div className="mt-6 flex justify-between">
            <Link
              href="/knowledge-base"
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/[0.06]"
            >
              Knowledge Base
            </Link>

            <button
              onClick={() => setConfigBot(null)}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {deleteBot && (
        <Modal onClose={() => setDeleteBot(null)}>
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
                <Trash2 size={18} />
              </div>

              <h3 className="text-lg font-semibold">
                Delete chatbot?
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                This will remove{" "}
                <span className="text-slate-300">
                  {deleteBot.name}
                </span>{" "}
                from your workspace.
              </p>
            </div>

            <CloseButton onClick={() => setDeleteBot(null)} />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <SecondaryButton
              onClick={() => setDeleteBot(null)}
            >
              Cancel
            </SecondaryButton>

            <button
              onClick={confirmDelete}
              className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/15"
            >
              <Trash2 size={15} />
              Delete chatbot
            </button>
          </div>
        </Modal>
      )}

      {/* HELP MODAL */}
      {showHelp && (
        <Modal onClose={() => setShowHelp(false)}>
          <div className="flex items-start justify-between">
            <ModalHeading
              icon={<CircleHelp size={18} />}
              title="AI Chatbots"
              description="Manage your AI assistants from this workspace."
            />

            <CloseButton onClick={() => setShowHelp(false)} />
          </div>

          <div className="mt-6 space-y-3">
            <HelpItem
              number="01"
              title="Create"
              text="Create a new AI chatbot and start it as a draft."
            />

            <HelpItem
              number="02"
              title="Manage"
              text="Preview, edit, configure or change the status of a chatbot."
            />

            <HelpItem
              number="03"
              title="Connect"
              text="Use integrations and your knowledge base to prepare your assistant for real conversations."
            />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton
              onClick={() => setShowHelp(false)}
            >
              Close
            </SecondaryButton>
          </div>
        </Modal>
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function ChatbotCard({
  bot,
  openMenu,
  setOpenMenu,
  onEdit,
  onPreview,
  onConfigure,
  onToggle,
  onDelete,
}: {
  bot: Chatbot;
  openMenu: number | null;
  setOpenMenu: (id: number | null) => void;
  onEdit: (bot: Chatbot) => void;
  onPreview: (bot: Chatbot) => void;
  onConfigure: (bot: Chatbot) => void;
  onToggle: (id: number) => void;
  onDelete: (bot: Chatbot) => void;
}) {
  return (
    <article className="group rounded-2xl border border-white/[0.07] bg-[#0c111b] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/15 hover:shadow-xl hover:shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 text-xs font-semibold text-cyan-300">
            {bot.initials}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-white">
                {bot.name}
              </h3>

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  bot.status === "Active"
                    ? "border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300"
                    : "border border-white/[0.08] bg-white/[0.03] text-slate-500"
                }`}
              >
                {bot.status}
              </span>
            </div>

            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
              {bot.description}
            </p>
          </div>
        </div>

        <div
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() =>
              setOpenMenu(openMenu === bot.id ? null : bot.id)
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/[0.05] hover:text-slate-300"
          >
            <MoreHorizontal size={17} />
          </button>

          {openMenu === bot.id && (
            <div className="absolute right-0 top-9 z-30 w-40 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111824] p-1 shadow-2xl">
              <MenuButton
                icon={<Eye size={13} />}
                label="Preview"
                onClick={() => onPreview(bot)}
              />

              <MenuButton
                icon={<Edit3 size={13} />}
                label="Edit"
                onClick={() => onEdit(bot)}
              />

              <MenuButton
                icon={<Code2 size={13} />}
                label="Configure"
                onClick={() => onConfigure(bot)}
              />

              <MenuButton
                icon={<Zap size={13} />}
                label={
                  bot.status === "Active"
                    ? "Set as draft"
                    : "Activate"
                }
                onClick={() => onToggle(bot.id)}
              />

              <div className="my-1 border-t border-white/[0.06]" />

              <MenuButton
                danger
                icon={<Trash2 size={13} />}
                label="Delete"
                onClick={() => onDelete(bot)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.06] rounded-xl border border-white/[0.05] bg-white/[0.018] py-3">
        <Metric
          label="Conversations"
          value={bot.conversations.toLocaleString()}
        />

        <Metric
          label="Resolution"
          value={
            bot.resolution ? `${bot.resolution}%` : "—"
          }
        />

        <Metric
          label="Response"
          value={bot.responseTime}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-600">
          Updated {bot.updated}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPreview(bot)}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Eye size={13} />
            Preview
          </button>

          <button
            onClick={() => onConfigure(bot)}
            className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/[0.09]"
          >
            Manage
            <ArrowLeft
              size={12}
              className="rotate-180"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0c111b] p-4 transition hover:border-white/[0.11]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-cyan-300">
          {icon}
        </div>

        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      </div>

      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-slate-600">
        {detail}
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-3 text-center">
      <p className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-300">
        {value}
      </p>
    </div>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition ${
        danger
          ? "text-red-400 hover:bg-red-400/[0.06]"
          : "text-slate-300 hover:bg-white/[0.05]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.09] bg-[#0d131e] p-5 shadow-2xl shadow-black/40 sm:p-6">
        {children}
      </div>
    </div>
  );
}

function ModalHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/[0.08] text-cyan-300">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

function CloseButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
    >
      <X size={18} />
    </button>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  autoFocus = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
      />
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
    >
      {children}
    </button>
  );
}

function ConfigRow({
  title,
  value,
  active,
}: {
  title: string;
  value: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
      <span className="text-xs text-slate-500">{title}</span>

      <div className="flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-cyan-400" : "bg-slate-600"
          }`}
        />

        <span
          className={`text-xs font-medium ${
            active ? "text-cyan-300" : "text-slate-500"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function HelpItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
      <span className="text-[10px] font-semibold text-cyan-400">
        {number}
      </span>

      <div>
        <p className="text-xs font-semibold text-slate-300">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}

function getInitials(name: string) {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}