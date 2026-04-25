"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  ChartPieSlice,
  UsersThree,
  CreditCard,
  ChartBar,
  UserCircle,
  Gear,
  SignOut,
  BookOpen,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@sarunyu/system-one";
import { Logo } from "../../_components/logo";
import { clearUser } from "../../_lib/auth";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: ChartPieSlice, exact: true },
  { href: "/dashboard/customers", label: "Customers", icon: UsersThree },
  { href: "/dashboard/analytics", label: "Analytics", icon: ChartBar },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

const FOOTER_NAV = [
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Gear },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const handleSignOut = () => {
    clearUser();
    router.push("/login");
  };

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-divider bg-card lg:flex">
      <Link
        href="/dashboard"
        className="flex h-16 items-center gap-2 border-b border-divider px-6"
      >
        <Logo />
        <span className="text-base font-semibold tracking-tight text-foreground">
          Lumen
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        <span className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-default-tertiary">
          Workspace
        </span>
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "flex items-center gap-3 rounded-lg bg-selected-bg px-3 py-2 text-sm font-medium text-primary-action"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-hover-bg hover:text-foreground"
              }
            >
              <Icon size={18} weight={active ? "fill" : "regular"} />
              {item.label}
            </Link>
          );
        })}

        <span className="mt-6 px-3 py-2 text-xs font-medium uppercase tracking-wide text-default-tertiary">
          Account
        </span>
        {FOOTER_NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "flex items-center gap-3 rounded-lg bg-selected-bg px-3 py-2 text-sm font-medium text-primary-action"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-hover-bg hover:text-foreground"
              }
            >
              <Icon size={18} weight={active ? "fill" : "regular"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-divider p-4">
        <div className="flex flex-col gap-3 rounded-xl bg-primary-action-light p-4">
          <div className="flex items-center gap-2 text-primary-action">
            <BookOpen size={18} weight="fill" />
            <span className="text-sm font-medium">Getting started</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Invite teammates and wire up your first integration.
          </p>
          <Button variant="outline" size="xs" className="w-full">
            View guide
          </Button>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-hover-bg hover:text-foreground"
        >
          <SignOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
