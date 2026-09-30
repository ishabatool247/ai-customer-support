"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  Globe,
  MessageSquare,
  Plug,
  Search,
  Settings,

  Sparkles,
  Webhook,
  X,
} from "lucide-react";
import Link from "next/link";

type Integration = {
  id: string;
  name: string;
  description: string;
  category: "Communication" | "Developer Tools" | "Automation";
  icon: React.ReactNode;
  connected: boolean;
  color: string;
};

const initialIntegrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Send AI support notifications and conversation alerts to Slack.",
    category: "Communication",
    icon: <MessageSquare size={22} />,
    connected: true,
    color: "text-purple-400",
  },
  {
    id: "webchat",
    name: "Web Chat",
    description: "Embed your AI customer support assistant directly on your website.",
    category: "Communication",
    icon: <MessageSquare size={22} />,
    connected: true,
    color: "text-cyan-400",
  },
  {
    id: "webhook",
    name: "Webhooks",
    description: "Connect SupportFlow with your own backend and external services.",
    category: "Developer Tools",
    icon: <Webhook size={22} />,
    connected: false,
    color: "text-orange-400",
  },
  {
    id: "api",
    name: "REST API",
    description: "Build custom integrations using the SupportFlow API.",
    category: "Developer Tools",
    icon: <Code2 size={22} />,
    connected: false,
    color: "text-emerald-400",
  },
  {
    id: "zapier",
    name: "Automation",
    description: "Automate support workflows with external applications.",
    category: "Automation",
    icon: <Sparkles size={22} />,
    connected: false,
    color: "text-yellow-400",
  },
  {
    id: "website",
    name: "Website",
    description: "Connect a website and deploy your AI assistant to your customers.",
    category: "Communication",
    icon: <Globe size={22} />,
    connected: false,
    color: "text-blue-400",
  },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] =
    useState<Integration[]>(initialIntegrations);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);

  const [showApiModal, setShowApiModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = ["All", "Communication", "Developer Tools", "Automation"];

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(search.toLowerCase()) ||
      integration.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      integration.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const connectedCount = integrations.filter(
    (integration) => integration.connected
  ).length;

  const toggleConnection = (id: string) => {
    setIntegrations((current) =>
      current.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              connected: !integration.connected,
            }
          : integration
      )
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      "https://api.supportflow.ai/v1"
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#080c14] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <Plug className="text-cyan-400" size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Integrations
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Connect SupportFlow with your existing tools and workflows.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowApiModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0c111b] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-[#111827]"
          >
            <Code2 size={17} />
            API Access
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0c111b] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Available Integrations
              </span>

              <Plug size={18} className="text-cyan-400" />
            </div>

            <div className="text-2xl font-semibold">
              {integrations.length}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c111b] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Connected
              </span>

              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>

            <div className="text-2xl font-semibold">
              {connectedCount}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c111b] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                API Status
              </span>

              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
            </div>

            <div className="text-2xl font-semibold">
              Operational
            </div>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search integrations..."
              className="w-full rounded-xl border border-white/10 bg-[#0c111b] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-lg px-3.5 py-2 text-sm transition ${
                  activeCategory === category
                    ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Integration Cards */}
        {filteredIntegrations.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredIntegrations.map((integration) => (
              <div
                key={integration.id}
                className="group rounded-2xl border border-white/10 bg-[#0c111b] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-[#0e141f]"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] ${integration.color}`}
                  >
                    {integration.icon}
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      integration.connected
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-slate-400/10 text-slate-400"
                    }`}
                  >
                    {integration.connected ? "Connected" : "Not connected"}
                  </span>
                </div>

                <h2 className="text-base font-semibold text-white">
                  {integration.name}
                </h2>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-400">
                  {integration.description}
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedIntegration(integration)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06]"
                  >
                    <Settings size={15} />
                    Manage
                  </button>

                  <button
                    onClick={() => toggleConnection(integration.id)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      integration.connected
                        ? "border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-red-400/10 hover:text-red-300"
                        : "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:opacity-90"
                    }`}
                  >
                    {integration.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#0c111b] px-6 py-16 text-center">
            <Search className="mx-auto mb-4 text-slate-600" size={30} />

            <h2 className="text-lg font-semibold">
              No integrations found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try a different search term or category.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.06] to-blue-500/[0.04] p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={17} className="text-cyan-400" />

                <span className="text-sm font-medium text-cyan-300">
                  Build custom workflows
                </span>
              </div>

              <h2 className="text-lg font-semibold">
                Connect SupportFlow to your own applications.
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Use API access and webhooks to create custom support
                experiences.
              </p>
            </div>

            <button
              onClick={() => setShowApiModal(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Explore API
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Manage Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131e] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ${selectedIntegration.color}`}
                >
                  {selectedIntegration.icon}
                </div>

                <div>
                  <h2 className="font-semibold">
                    {selectedIntegration.name}
                  </h2>

                  <p className="text-xs text-slate-500">
                    Integration settings
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedIntegration(null)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Connection status
                </label>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div>
                    <p className="text-sm text-white">
                      {selectedIntegration.connected
                        ? "Integration is active"
                        : "Integration is currently disconnected"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Toggle the connection for this integration.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      toggleConnection(selectedIntegration.id);

                      setSelectedIntegration({
                        ...selectedIntegration,
                        connected: !selectedIntegration.connected,
                      });
                    }}
                    className={`rounded-lg px-3 py-2 text-xs font-medium ${
                      selectedIntegration.connected
                        ? "bg-red-400/10 text-red-300"
                        : "bg-emerald-400/10 text-emerald-300"
                    }`}
                  >
                    {selectedIntegration.connected
                      ? "Disconnect"
                      : "Connect"}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-slate-400">
                  {selectedIntegration.description}
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-white/10 px-6 py-4">
              <button
                onClick={() => setSelectedIntegration(null)}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Modal */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131e] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="font-semibold">
                  API Access
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Connect your own applications to SupportFlow.
                </p>
              </div>

              <button
                onClick={() => setShowApiModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    API Base URL
                  </span>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 size={13} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <code className="break-all text-sm text-slate-200">
                  https://api.supportflow.ai/v1
                </code>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <Code2 size={18} className="mb-3 text-cyan-400" />
                  <p className="text-sm font-medium">
                    REST API
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Build custom integrations and applications.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <Webhook size={18} className="mb-3 text-orange-400" />
                  <p className="text-sm font-medium">
                    Webhooks
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Receive real-time events from SupportFlow.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4 text-sm leading-6 text-slate-400">
                API credentials and webhook secrets can be configured
                from your workspace settings.
              </div>
            </div>

            <div className="flex justify-end border-t border-white/10 px-6 py-4">
              <button
                onClick={() => setShowApiModal(false)}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
