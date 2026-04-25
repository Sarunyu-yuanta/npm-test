"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Notification, SearchInput } from "@sarunyu/system-one";
import type { NotificationGroup } from "@sarunyu/system-one";
import { List } from "@phosphor-icons/react/dist/ssr";
import { loadUser } from "../../_lib/auth";

const notificationGroups: NotificationGroup[] = [
  {
    label: "Today",
    items: [
      {
        id: "1",
        title: "New customer signed up",
        description: "Field Labs joined on the Growth plan.",
        time: "2m",
        unread: true,
        type: "icon",
      },
      {
        id: "2",
        title: "Invoice paid",
        description: "Northwind · $4,200 marked as paid.",
        time: "1h",
        unread: true,
        type: "icon",
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "3",
        title: "Team digest ready",
        description: "Last week's summary is available.",
        time: "Yesterday",
        type: "icon",
      },
    ],
  },
];

export function Topbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const u = loadUser();
    if (!u) {
      router.replace("/login");
      return;
    }
    setUser(u);
  }, [router]);

  const initials = user
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "·";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-divider bg-card px-4 md:px-8">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-hover-bg lg:hidden"
        aria-label="Open menu"
      >
        <List size={20} />
      </button>

      <div className="hidden max-w-sm flex-1 md:block">
        <SearchInput
          placeholder="Search customers, invoices, or docs…"
          size="sm"
          value={query}
          onChange={setQuery}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Notification
          groups={notificationGroups}
          panelWidth={375}
          emptyText="You're all caught up"
        />
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-hover-bg"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-action text-sm font-medium text-on-primary-action">
            {initials}
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium text-foreground">
              {user?.name ?? "Loading…"}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.email ?? ""}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
