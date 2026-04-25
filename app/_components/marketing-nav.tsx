import Link from "next/link";
import { Button } from "@sarunyu/system-one";
import { Logo } from "./logo";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-card">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-base font-semibold tracking-tight text-foreground">
            Lumen
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/#testimonials"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden sm:inline-flex">
            <Button variant="plain" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Start free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
