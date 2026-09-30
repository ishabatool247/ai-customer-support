"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Edit3,
  FileText,
  FolderOpen,
  Headphones,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
  Zap,
} from "lucide-react";

type Article = {
  id: number;
  title: string;
  category: string;
  content: string;
  status: "Published" | "Draft";
  views: number;
  updated: string;
};

const navigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chatbots", label: "AI Chatbots", icon: Bot, badge: "3" },
  { href: "/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/integrations", label: "Integrations", icon: Zap },
  { href: "/human-support", label: "Human Support", icon: Headphones },
];

const initialArticles: Article[] = [
  {
    id: 1,
    title: "How to reset your password",
    category: "Account",
    content:
      "To reset your password, open the login page and select Forgot Password. Enter your registered email address and follow the instructions sent to your inbox.",
    status: "Published",
    views: 1248,
    updated: "2 hours ago",
  },
  {
    id: 2,
    title: "Understanding your subscription",
    category: "Billing",
    content:
      "Your subscription includes access to AI support, knowledge base management, analytics, and integrations. You can review your current plan from Settings.",
    status: "Published",
    views: 986,
    updated: "Yesterday",
  },
  {
    id: 3,
    title: "Connecting your website chatbot",
    category: "Getting Started",
    content:
      "Create a chatbot, configure its knowledge sources, then copy the generated widget code into your website before the closing body tag.",
    status: "Published",
    views: 824,
    updated: "2 days ago",
  },
  {
    id: 4,
    title: "Supported file formats",
    category: "Knowledge Base",
    content:
      "The knowledge base supports common document formats including PDF, TXT, DOCX and Markdown files. Upload documents from the Knowledge Base workspace.",
    status: "Published",
    views: 642,
    updated: "3 days ago",
  },
  {
    id: 5,
    title: "Human support escalation rules",
    category: "Support",
    content:
      "Conversations can be escalated to a human agent when the customer requests a person, when confidence is low, or when a configured escalation rule is triggered.",
    status: "Draft",
    views: 0,
    updated: "4 days ago",
  },
  {
    id: 6,
    title: "API authentication guide",
    category: "Developers",
    content:
      "Use your workspace API key in the Authorization header when making authenticated API requests. Keep API credentials private and rotate them when necessary.",
    status: "Published",
    views: 431,
    updated: "1 week ago",
  },
];

const categories = [
  "All",
  "Account",
  "Billing",
  "Getting Started",
  "Knowledge Base",
  "Support",
  "Developers",
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
            const active = item.href === "/knowledge-base";

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
              <Sparkles size={14} className="text-cyan-400" />
            </div>
            <span className="text-xs font-semibold text-white">
              AI Knowledge
            </span>
          </div>

          <p className="text-[10px] leading-4 text-slate-500">
            Keep your knowledge base updated so your AI agents can provide
            accurate answers.
          </p>
        </div>
      </div>
    </aside>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
          <Icon size={17} className="text-cyan-400" />
        </div>

        <div>
          <p className="text-[11px] text-slate-500">{label}</p>
          <p className="mt-0.5 text-xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("Getting Started");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"Published" | "Draft">("Published");

  const filteredArticles = useMemo(() => {
    const query = search.toLowerCase().trim();

    return articles.filter((article) => {
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || article.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [articles, search, category]);

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const published = articles.filter(
    (article) => article.status === "Published"
  ).length;
  const drafts = articles.filter(
    (article) => article.status === "Draft"
  ).length;

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle("");
    setArticleCategory("Getting Started");
    setContent("");
    setStatus("Published");
    setShowModal(true);
  };

  const openEditModal = (article: Article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setArticleCategory(article.category);
    setContent(article.content);
    setStatus(article.status);
    setOpenMenu(null);
    setShowModal(true);
  };

  const saveArticle = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingArticle) {
      setArticles((current) =>
        current.map((article) =>
          article.id === editingArticle.id
            ? {
                ...article,
                title: title.trim(),
                category: articleCategory,
                content: content.trim(),
                status,
                updated: "Just now",
              }
            : article
        )
      );
    } else {
      const newArticle: Article = {
        id: Date.now(),
        title: title.trim(),
        category: articleCategory,
        content: content.trim(),
        status,
        views: 0,
        updated: "Just now",
      };

      setArticles((current) => [newArticle, ...current]);
    }

    setShowModal(false);
  };

  const deleteArticle = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmed) return;

    setArticles((current) => current.filter((article) => article.id !== id));
    setOpenMenu(null);
  };

  const toggleStatus = (id: number) => {
    setArticles((current) =>
      current.map((article) =>
        article.id === id
          ? {
              ...article,
              status:
                article.status === "Published" ? "Draft" : "Published",
              updated: "Just now",
            }
          : article
      )
    );

    setOpenMenu(null);
  };

  const previewArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowPreview(true);
    setOpenMenu(null);

    setArticles((current) =>
      current.map((item) =>
        item.id === article.id
          ? { ...item, views: item.views + 1 }
          : item
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-[72px] items-center justify-between gap-4 border-b border-white/[0.06] bg-[#070b14]/90 px-5 py-3 backdrop-blur-xl sm:px-8">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Knowledge Base
            </h1>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Manage the content your AI agents use to answer customers
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-3.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:brightness-110"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">New Article</span>
          </button>
        </header>

        <div className="mx-auto max-w-[1500px] p-5 sm:p-8">
          <section className="grid gap-4 sm:grid-cols-3">
            <StatCard
              icon={FileText}
              label="Total Articles"
              value={articles.length.toString()}
            />

            <StatCard
              icon={CheckCircle2}
              label="Published"
              value={published.toString()}
            />

            <StatCard
              icon={BarChart3}
              label="Total Views"
              value={totalViews.toLocaleString()}
            />
          </section>

          <section className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0b111c] p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search articles..."
                  className="h-10 w-full rounded-xl border border-white/[0.07] bg-[#080d16] pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowCategoryMenu((value) => !value)}
                  className="flex h-10 w-full items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-[#080d16] px-3 text-xs text-slate-300 sm:w-52"
                >
                  <span className="flex items-center gap-2">
                    <FolderOpen size={14} className="text-slate-500" />
                    {category}
                  </span>
                  <ChevronDown size={14} className="text-slate-600" />
                </button>

                {showCategoryMenu && (
                  <div className="absolute right-0 top-12 z-30 w-52 rounded-xl border border-white/[0.08] bg-[#101722] p-1.5 shadow-2xl">
                    {categories.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setCategory(item);
                          setShowCategoryMenu(false);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                          category === item
                            ? "bg-white/[0.07] text-white"
                            : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mt-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Articles
                </h2>
                <p className="mt-1 text-[11px] text-slate-600">
                  {filteredArticles.length} article
                  {filteredArticles.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="hidden items-center gap-2 text-[10px] text-slate-600 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                AI indexed content
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/[0.08] bg-[#0b111c] px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04]">
                  <Search size={20} className="text-slate-600" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white">
                  No articles found
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-[11px] leading-5 text-slate-600">
                  Try another search term or create a new knowledge base
                  article.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="group relative rounded-2xl border border-white/[0.07] bg-[#0b111c] p-5 transition hover:border-white/[0.12] hover:bg-[#0d1420]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                        <FileText size={18} className="text-cyan-400" />
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === article.id ? null : article.id
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/[0.05] hover:text-white"
                        >
                          <MoreHorizontal size={17} />
                        </button>

                        {openMenu === article.id && (
                          <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-white/[0.08] bg-[#101722] p-1.5 shadow-2xl">
                            <button
                              onClick={() => previewArticle(article)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-400 hover:bg-white/[0.05] hover:text-white"
                            >
                              <FileText size={13} />
                              Preview
                            </button>

                            <button
                              onClick={() => openEditModal(article)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-400 hover:bg-white/[0.05] hover:text-white"
                            >
                              <Edit3 size={13} />
                              Edit
                            </button>

                            <button
                              onClick={() => toggleStatus(article.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-400 hover:bg-white/[0.05] hover:text-white"
                            >
                              {article.status === "Published" ? (
                                <>
                                  <Clock3 size={13} />
                                  Move to Draft
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 size={13} />
                                  Publish
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => deleteArticle(article.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-rose-400 hover:bg-rose-400/5"
                            >
                              <Trash2 size={13} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-md bg-white/[0.05] px-2 py-1 text-[9px] font-semibold text-slate-500">
                          {article.category}
                        </span>

                        <span
                          className={`flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-semibold ${
                            article.status === "Published"
                              ? "bg-emerald-400/10 text-emerald-400"
                              : "bg-amber-400/10 text-amber-400"
                          }`}
                        >
                          <span className="h-1 w-1 rounded-full bg-current" />
                          {article.status}
                        </span>
                      </div>

                      <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white">
                        {article.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-[11px] leading-5 text-slate-500">
                        {article.content}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                        <BarChart3 size={12} />
                        {article.views.toLocaleString()} views
                      </div>

                      <span className="text-[10px] text-slate-600">
                        {article.updated}
                      </span>
                    </div>

                    <button
                      onClick={() => previewArticle(article)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] py-2.5 text-[11px] font-semibold text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      <FileText size={13} />
                      View Article
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-6 rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.035] to-indigo-500/[0.035] p-5 sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                  <Upload size={19} className="text-cyan-400" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Add knowledge to your AI
                  </h3>
                  <p className="mt-1 max-w-xl text-[11px] leading-5 text-slate-500">
                    Upload documents or create articles to give your AI agents
                    more context when answering customer questions.
                  </p>
                </div>
              </div>

              <button
                onClick={openCreateModal}
                className="flex h-9 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 text-xs font-semibold text-white transition hover:bg-white/[0.08]"
              >
                <Plus size={14} />
                Add Content
              </button>
            </div>
          </section>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101722] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div>
                <h2 className="text-sm font-bold text-white">
                  {editingArticle ? "Edit Article" : "Create Article"}
                </h2>
                <p className="mt-0.5 text-[10px] text-slate-600">
                  Add useful information for your AI knowledge base
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.05] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-[11px] font-medium text-slate-400">
                  Article Title
                </label>

                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. How to reset your password"
                  className="h-10 w-full rounded-xl border border-white/[0.07] bg-[#080d16] px-3 text-xs text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-medium text-slate-400">
                    Category
                  </label>

                  <select
                    value={articleCategory}
                    onChange={(event) =>
                      setArticleCategory(event.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-white/[0.07] bg-[#080d16] px-3 text-xs text-slate-300 outline-none focus:border-cyan-400/30"
                  >
                    {categories
                      .filter((item) => item !== "All")
                      .map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-medium text-slate-400">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value as "Published" | "Draft")
                    }
                    className="h-10 w-full rounded-xl border border-white/[0.07] bg-[#080d16] px-3 text-xs text-slate-300 outline-none focus:border-cyan-400/30"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-medium text-slate-400">
                  Content
                </label>

                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Write the information your AI should know..."
                  rows={8}
                  className="w-full resize-none rounded-xl border border-white/[0.07] bg-[#080d16] p-3 text-xs leading-5 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
                />
              </div>

              {(!title.trim() || !content.trim()) && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-400/10 bg-amber-400/5 px-3 py-2.5 text-[10px] text-amber-400">
                  <AlertCircle size={13} />
                  Title and content are required.
                </div>
              )}

              <div className="flex justify-end gap-2 border-t border-white/[0.06] pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/[0.07] px-4 py-2.5 text-xs font-medium text-slate-400 hover:bg-white/[0.04] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={saveArticle}
                  disabled={!title.trim() || !content.trim()}
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2.5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {editingArticle ? "Save Changes" : "Create Article"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreview && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101722] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
                  <FileText size={17} className="text-cyan-400" />
                </div>

                <div>
                  <p className="text-[10px] text-slate-600">
                    {selectedArticle.category}
                  </p>
                  <h2 className="text-sm font-bold text-white">
                    Article Preview
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setShowPreview(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.05] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[calc(85vh-70px)] overflow-y-auto p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-md px-2 py-1 text-[9px] font-semibold ${
                    selectedArticle.status === "Published"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-amber-400/10 text-amber-400"
                  }`}
                >
                  {selectedArticle.status}
                </span>

                <span className="text-[10px] text-slate-600">
                  {selectedArticle.views.toLocaleString()} views
                </span>
              </div>

              <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
                {selectedArticle.title}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-600">
                <Clock3 size={12} />
                Updated {selectedArticle.updated}
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[#0b111c] p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {selectedArticle.content}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                <div className="flex gap-3">
                  <Sparkles
                    size={16}
                    className="mt-0.5 shrink-0 text-cyan-400"
                  />
                  <p className="text-[11px] leading-5 text-slate-500">
                    This article is available as context for AI-powered
                    customer support when its status is set to Published.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}