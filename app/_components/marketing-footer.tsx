import Link from "next/link";
import { Logo } from "./logo";

const columns: { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    items: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Customers", href: "/#testimonials" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Help center", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Community", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="mt-auto border-t border-divider bg-default-secondary">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-6 py-12 md:grid-cols-4 md:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-base font-semibold tracking-tight text-foreground">
              Lumen
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            The calm, opinionated operating system for modern teams.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <h4>{col.heading}</h4>
            <ul className="flex flex-col gap-2">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-divider">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-muted-foreground md:flex-row md:px-8">
          <span>© 2026 Lumen Labs. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
