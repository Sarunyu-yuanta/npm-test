import Link from "next/link";
import { ReactNode } from "react";
import { Logo } from "./logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      {/* Form column */}
      <div className="flex flex-col justify-between p-6 md:p-10">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-base font-semibold tracking-tight text-foreground">
            Lumen
          </span>
        </Link>

        <div className="mx-auto w-full max-w-[480px] py-10">
          <div className="mb-8 flex flex-col gap-2">
            <h1>{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>

        <div className="text-sm text-muted-foreground">{footer}</div>
      </div>

      {/* Brand column */}
      <div className="relative hidden overflow-hidden border-l border-divider bg-default-secondary lg:block">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-action-light blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-visual-purple-light blur-3xl" />
        <div className="relative flex h-full flex-col justify-center px-12 py-10">
          <blockquote className="flex flex-col gap-6">
            <p className="text-2xl leading-8 text-foreground">
              &ldquo;Lumen became the place my whole company comes to work.
              Calm, fast, and thoughtful — exactly what our team needed.&rdquo;
            </p>
            <footer className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-action text-on-primary-action">
                PN
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  Priya Natarajan
                </span>
                <span className="text-sm text-muted-foreground">
                  Head of Operations, Northwind
                </span>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
