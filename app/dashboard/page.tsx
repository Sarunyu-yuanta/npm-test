"use client";

import { useState } from "react";
import {
  Card,
  Tag,
  TabGroup,
  Button,
  StatusTag,
  Table,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@sarunyu/system-one";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendUp,
  CurrencyDollar,
  UsersThree,
  Receipt,
  ChartPieSlice,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

type Stat = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
  icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill"; className?: string }>;
};

const stats: Stat[] = [
  {
    label: "Monthly recurring revenue",
    value: "$48,210",
    delta: "+12.4%",
    direction: "up",
    icon: CurrencyDollar,
  },
  {
    label: "Active users",
    value: "1,284",
    delta: "+3.2%",
    direction: "up",
    icon: UsersThree,
  },
  {
    label: "Open invoices",
    value: "23",
    delta: "-8.1%",
    direction: "down",
    icon: Receipt,
  },
  {
    label: "Churn rate",
    value: "0.8%",
    delta: "-0.3pp",
    direction: "down",
    icon: ChartPieSlice,
  },
];

const activity = [
  {
    id: "1",
    actor: "Priya Natarajan",
    action: "upgraded their plan to",
    target: "Growth",
    time: "2 minutes ago",
    type: "success" as const,
  },
  {
    id: "2",
    actor: "Marcus Chen",
    action: "closed deal",
    target: "Northwind — $4,200",
    time: "1 hour ago",
    type: "success" as const,
  },
  {
    id: "3",
    actor: "Invoice #INV-00932",
    action: "is",
    target: "overdue",
    time: "3 hours ago",
    type: "error" as const,
  },
  {
    id: "4",
    actor: "Ines Okafor",
    action: "invited",
    target: "5 teammates",
    time: "Yesterday",
    type: "processing" as const,
  },
  {
    id: "5",
    actor: "Payment",
    action: "received from",
    target: "Parallax — $1,800",
    time: "Yesterday",
    type: "success" as const,
  },
];

const recentDeals = [
  { id: "1", customer: "Northwind Inc.", amount: "$4,200", stage: "success" as const, stageLabel: "Closed" },
  { id: "2", customer: "Field Labs", amount: "$2,400", stage: "processing" as const, stageLabel: "Negotiation" },
  { id: "3", customer: "Parallax", amount: "$1,800", stage: "success" as const, stageLabel: "Closed" },
  { id: "4", customer: "Atlas & Co.", amount: "$3,100", stage: "hold" as const, stageLabel: "On hold" },
  { id: "5", customer: "Ember Corp", amount: "$5,600", stage: "processing" as const, stageLabel: "Negotiation" },
];

const weeks = ["M", "T", "W", "T", "F", "S", "S"];
const revenueBars = [52, 68, 61, 80, 72, 55, 90];

export default function DashboardOverview() {
  const [range, setRange] = useState("7d");

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 p-6 md:p-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <h1>Good morning, welcome back</h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your workspace today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="md">
            Export
          </Button>
          <Button variant="primary" size="md" rightIcon={<ArrowRight weight="bold" />}>
            New deal
          </Button>
        </div>
      </header>

      {/* Stat cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} size="desktop" className="w-full">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-action-light text-primary-action">
                    <Icon size={20} weight="fill" />
                  </div>
                  <span
                    className={
                      s.direction === "up"
                        ? "flex items-center gap-1 rounded-full bg-success-bg px-2 py-0.5 text-xs font-medium text-success"
                        : "flex items-center gap-1 rounded-full bg-error-bg px-2 py-0.5 text-xs font-medium text-destructive"
                    }
                  >
                    {s.direction === "up" ? (
                      <ArrowUpRight size={12} weight="bold" />
                    ) : (
                      <ArrowDownRight size={12} weight="bold" />
                    )}
                    {s.delta}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="text-3xl font-semibold tracking-tight text-foreground">
                    {s.value}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Chart + activity */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue chart */}
        <Card size="desktop" className="w-full lg:col-span-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <h3>Revenue</h3>
                <p className="text-sm text-muted-foreground">
                  Tracking against last period
                </p>
              </div>
              <TabGroup
                items={[
                  { id: "7d", title: "7D" },
                  { id: "30d", title: "30D" },
                  { id: "90d", title: "90D" },
                ]}
                activeId={range}
                onChange={setRange}
                size="sm"
              />
            </div>

            <div className="flex items-end gap-4">
              <span className="text-4xl font-semibold text-foreground">
                $48,210
              </span>
              <span className="flex items-center gap-1 pb-1 text-sm font-medium text-success">
                <TrendUp size={14} weight="bold" />
                +12.4% vs last week
              </span>
            </div>

            <div className="flex h-48 items-end gap-3">
              {revenueBars.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-md bg-primary-action"
                      style={{ height: `${h}%`, opacity: 0.35 + h / 200 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{weeks[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Activity */}
        <Card size="desktop" className="w-full">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3>Activity</h3>
              <Tag text="Live" variant="green" size="small" />
            </div>
            <ul className="flex flex-col gap-4">
              {activity.map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <div
                    className={
                      a.type === "success"
                        ? "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-success"
                        : a.type === "error"
                        ? "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive"
                        : "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-action"
                    }
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{a.actor}</span> {a.action}{" "}
                      <span className="font-medium">{a.target}</span>
                    </p>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      {/* Deals table */}
      <section>
        <Card size="desktop" className="w-full">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3>Recent deals</h3>
                <p className="text-sm text-muted-foreground">
                  The latest activity across your pipeline
                </p>
              </div>
              <Button variant="plain" size="sm" rightIcon={<ArrowRight />}>
                View all
              </Button>
            </div>
            <Table>
              <thead>
                <TableRow>
                  <TableHeaderCell>Customer</TableHeaderCell>
                  <TableHeaderCell>Amount</TableHeaderCell>
                  <TableHeaderCell sortable={false}>Stage</TableHeaderCell>
                </TableRow>
              </thead>
              <tbody>
                {recentDeals.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.customer}</TableCell>
                    <TableCell>{d.amount}</TableCell>
                    <TableCell>
                      <StatusTag type={d.stage} text={d.stageLabel} />
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </section>
    </main>
  );
}
