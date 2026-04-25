"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  Chip,
  Dropdown,
  Input,
  Modal,
  SearchInput,
  StatusTag,
  Table,
  TableCell,
  TableHeaderCell,
  TableRow,
  Tag,
  Toast,
  useIsMobile,
  BottomSheet,
} from "@sarunyu/system-one";
import type { StatusTagType } from "@sarunyu/system-one";
import {
  DotsThreeVertical,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react/dist/ssr";

type Plan = "Starter" | "Growth" | "Enterprise";
type CustomerStatus = "active" | "trial" | "past-due" | "churned";

type Customer = {
  id: string;
  name: string;
  contact: string;
  email: string;
  plan: Plan;
  status: CustomerStatus;
  mrr: number;
  joined: string;
};

const seed: Customer[] = [
  {
    id: "c1",
    name: "Northwind Inc.",
    contact: "Priya Natarajan",
    email: "priya@northwind.com",
    plan: "Growth",
    status: "active",
    mrr: 1200,
    joined: "2025-11-14",
  },
  {
    id: "c2",
    name: "Field Labs",
    contact: "Marcus Chen",
    email: "marcus@field.io",
    plan: "Growth",
    status: "active",
    mrr: 880,
    joined: "2025-12-02",
  },
  {
    id: "c3",
    name: "Parallax",
    contact: "Ines Okafor",
    email: "ines@parallax.studio",
    plan: "Enterprise",
    status: "active",
    mrr: 4200,
    joined: "2025-08-11",
  },
  {
    id: "c4",
    name: "Atlas & Co.",
    contact: "Tomás Rivera",
    email: "tomas@atlas.co",
    plan: "Starter",
    status: "trial",
    mrr: 0,
    joined: "2026-04-01",
  },
  {
    id: "c5",
    name: "Ember Corp",
    contact: "Aiko Tanaka",
    email: "aiko@ember.corp",
    plan: "Growth",
    status: "past-due",
    mrr: 960,
    joined: "2025-09-24",
  },
  {
    id: "c6",
    name: "Axiom Studio",
    contact: "Jonas Berg",
    email: "jonas@axiom.studio",
    plan: "Starter",
    status: "churned",
    mrr: 0,
    joined: "2025-05-06",
  },
];

const statusConfig: Record<CustomerStatus, { label: string; type: StatusTagType }> = {
  active: { label: "Active", type: "success" },
  trial: { label: "Trial", type: "processing" },
  "past-due": { label: "Past due", type: "error" },
  churned: { label: "Churned", type: "hold" },
};

const planOptions = [
  { label: "Starter", value: "Starter" },
  { label: "Growth", value: "Growth" },
  { label: "Enterprise", value: "Enterprise" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Trial", value: "trial" },
  { label: "Past due", value: "past-due" },
  { label: "Churned", value: "churned" },
];

const filters: { id: "all" | CustomerStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "trial", label: "Trial" },
  { id: "past-due", label: "Past due" },
  { id: "churned", label: "Churned" },
];

type Draft = {
  name: string;
  contact: string;
  email: string;
  plan: Plan;
  status: CustomerStatus;
  mrr: string;
};

const emptyDraft: Draft = {
  name: "",
  contact: "",
  email: "",
  plan: "Starter",
  status: "trial",
  mrr: "0",
};

export default function CustomersPage() {
  const isMobile = useIsMobile();
  const [rows, setRows] = useState<Customer[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | CustomerStatus>("all");

  const [editor, setEditor] = useState<
    { mode: "create" } | { mode: "edit"; id: string } | null
  >(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [draftErrors, setDraftErrors] = useState<Partial<Record<keyof Draft, string>>>({});

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const [toast, setToast] = useState<{ status: "success" | "information"; message: string } | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.contact.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || r.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [rows, query, filter]);

  const openCreate = () => {
    setDraft(emptyDraft);
    setDraftErrors({});
    setEditor({ mode: "create" });
  };

  const openEdit = (c: Customer) => {
    setDraft({
      name: c.name,
      contact: c.contact,
      email: c.email,
      plan: c.plan,
      status: c.status,
      mrr: String(c.mrr),
    });
    setDraftErrors({});
    setEditor({ mode: "edit", id: c.id });
    setMenuOpenFor(null);
  };

  const closeEditor = () => setEditor(null);

  const validateDraft = (): Partial<Record<keyof Draft, string>> => {
    const errs: Partial<Record<keyof Draft, string>> = {};
    if (!draft.name.trim()) errs.name = "Company name required";
    if (!draft.contact.trim()) errs.contact = "Primary contact required";
    if (!draft.email.trim()) errs.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()))
      errs.email = "Enter a valid email";
    if (draft.mrr !== "" && isNaN(Number(draft.mrr)))
      errs.mrr = "MRR must be a number";
    return errs;
  };

  const saveDraft = () => {
    const errs = validateDraft();
    setDraftErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (editor?.mode === "create") {
      const newCustomer: Customer = {
        id: `c${Date.now()}`,
        name: draft.name.trim(),
        contact: draft.contact.trim(),
        email: draft.email.trim(),
        plan: draft.plan,
        status: draft.status,
        mrr: Number(draft.mrr || 0),
        joined: new Date().toISOString().slice(0, 10),
      };
      setRows((prev) => [newCustomer, ...prev]);
      setToast({ status: "success", message: `${newCustomer.name} added` });
    } else if (editor?.mode === "edit") {
      const id = editor.id;
      setRows((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                name: draft.name.trim(),
                contact: draft.contact.trim(),
                email: draft.email.trim(),
                plan: draft.plan,
                status: draft.status,
                mrr: Number(draft.mrr || 0),
              }
            : r,
        ),
      );
      setToast({ status: "success", message: "Customer updated" });
    }
    closeEditor();
  };

  const confirmDelete = () => {
    if (!deletingId) return;
    const target = rows.find((r) => r.id === deletingId);
    setRows((prev) => prev.filter((r) => r.id !== deletingId));
    setDeletingId(null);
    setToast({
      status: "information",
      message: `${target?.name ?? "Customer"} removed`,
    });
  };

  const editorTitle =
    editor?.mode === "create" ? "Add customer" : "Edit customer";

  const editorBody = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Company name"
        value={draft.name}
        onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
        forceState={draftErrors.name ? "error" : undefined}
        errorMessage={draftErrors.name}
        required
      />
      <Input
        placeholder="Primary contact"
        value={draft.contact}
        onChange={(v) => setDraft((d) => ({ ...d, contact: v }))}
        forceState={draftErrors.contact ? "error" : undefined}
        errorMessage={draftErrors.contact}
        required
      />
      <Input
        placeholder="Email"
        type="email"
        value={draft.email}
        onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
        forceState={draftErrors.email ? "error" : undefined}
        errorMessage={draftErrors.email}
        required
      />
      <Dropdown
        placeholder="Plan"
        options={planOptions}
        value={draft.plan}
        onChange={(v) => setDraft((d) => ({ ...d, plan: v as Plan }))}
      />
      <Dropdown
        placeholder="Status"
        options={statusOptions}
        value={draft.status}
        onChange={(v) => setDraft((d) => ({ ...d, status: v as CustomerStatus }))}
      />
      <Input
        placeholder="MRR"
        unit="USD"
        value={draft.mrr}
        onChange={(v) => setDraft((d) => ({ ...d, mrr: v }))}
        forceState={draftErrors.mrr ? "error" : undefined}
        errorMessage={draftErrors.mrr}
      />
    </div>
  );

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 p-6 md:p-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <h1>Customers</h1>
          <p className="text-muted-foreground">
            Manage accounts, plans, and lifecycle across your book of business.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus weight="bold" />}
          onClick={openCreate}
        >
          Add customer
        </Button>
      </header>

      <Card size="desktop" className="w-full">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-sm">
              <SearchInput
                placeholder="Search customers…"
                value={query}
                onChange={setQuery}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <Chip
                  key={f.id}
                  label={f.label}
                  selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                />
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <h4>No customers match this view</h4>
              <p className="text-sm text-muted-foreground">
                Try clearing your filters or searching for something else.
              </p>
            </div>
          ) : (
            <Table>
              <thead>
                <TableRow>
                  <TableHeaderCell>Company</TableHeaderCell>
                  <TableHeaderCell>Contact</TableHeaderCell>
                  <TableHeaderCell>Plan</TableHeaderCell>
                  <TableHeaderCell>MRR</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell sortable={false}>Actions</TableHeaderCell>
                </TableRow>
              </thead>
              <tbody>
              {visible.map((c) => {
                const status = statusConfig[c.status];
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-foreground">
                          {c.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Joined {c.joined}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-foreground">{c.contact}</span>
                        <span className="text-xs text-muted-foreground">
                          {c.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Tag
                        text={c.plan}
                        variant={
                          c.plan === "Enterprise"
                            ? "blue"
                            : c.plan === "Growth"
                            ? "green"
                            : "gray"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {c.mrr > 0 ? `$${c.mrr.toLocaleString()}` : "—"}
                    </TableCell>
                    <TableCell>
                      <StatusTag type={status.type} text={status.label} />
                    </TableCell>
                    <TableCell>
                      <div className="relative inline-flex w-full justify-end">
                        <Button
                          variant="plain-black"
                          size="icon-sm"
                          aria-label="Row actions"
                          onClick={() =>
                            setMenuOpenFor((cur) => (cur === c.id ? null : c.id))
                          }
                        >
                          <DotsThreeVertical size={18} weight="bold" />
                        </Button>
                        {menuOpenFor === c.id ? (
                          <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-border bg-card shadow-popover">
                            <button
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-hover-bg"
                              onClick={() => openEdit(c)}
                            >
                              <PencilSimple size={16} />
                              Edit
                            </button>
                            <button
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-error-bg"
                              onClick={() => {
                                setDeletingId(c.id);
                                setMenuOpenFor(null);
                              }}
                            >
                              <Trash size={16} />
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              </tbody>
            </Table>
          )}
        </div>
      </Card>

      {/* Editor: BottomSheet on mobile, Modal on desktop */}
      {editor ? (
        isMobile ? (
          <BottomSheet
            open={!!editor}
            onOpenChange={(o) => {
              if (!o) closeEditor();
            }}
            title={editorTitle}
            rightSide="action"
            actionLabel="Save"
            onActionClick={saveDraft}
          >
            {editorBody}
          </BottomSheet>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
            <Modal
              variant="content"
              responsive="desktop"
              actionLayout="double"
              title={editorTitle}
              primaryLabel="Save"
              secondaryLabel="Cancel"
              onPrimaryClick={saveDraft}
              onSecondaryClick={closeEditor}
              onClose={closeEditor}
            >
              {editorBody}
            </Modal>
          </div>
        )
      ) : null}

      {/* Delete confirmation */}
      {deletingId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <Modal
            variant="dialog"
            actionLayout="double"
            title="Delete this customer?"
            description="This will remove them from your workspace. You can re-add them later."
            primaryLabel="Delete"
            secondaryLabel="Cancel"
            onPrimaryClick={confirmDelete}
            onSecondaryClick={() => setDeletingId(null)}
            onClose={() => setDeletingId(null)}
          />
        </div>
      ) : null}

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-4 right-4 z-50 w-[343px]">
          <Toast
            status={toast.status}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      ) : null}
    </main>
  );
}
