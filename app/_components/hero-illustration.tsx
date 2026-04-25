import {
  ChartBar,
  CheckCircle,
  Sparkle,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[560px]">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-primary-action-light blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-visual-purple-light blur-3xl" />

      {/* Main mock dashboard card */}
      <div className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              This week
            </span>
            <h3>Revenue overview</h3>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-success-bg px-2 py-1 text-xs font-medium text-success">
            <TrendUp size={14} weight="bold" />
            +12.4%
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { label: "MRR", value: "$48.2k" },
            { label: "Customers", value: "1,284" },
            { label: "Churn", value: "0.8%" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 rounded-lg bg-default-secondary p-3"
            >
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <span className="text-lg font-semibold text-foreground">
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Chart bars */}
        <div className="mb-4 flex h-32 items-end gap-2">
          {[40, 65, 50, 80, 55, 90, 70, 95, 75, 88, 100, 82].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-primary-action"
              style={{ height: `${h}%`, opacity: 0.35 + h / 200 }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ChartBar size={14} />
          <span>Mon – Sun · 7 day rolling</span>
        </div>
      </div>

      {/* Floating toast-style card */}
      <div className="absolute -left-4 bottom-10 hidden w-64 rounded-xl border border-border bg-card p-4 shadow-popover sm:block">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-bg text-success">
            <CheckCircle size={20} weight="fill" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              Deal closed
            </span>
            <span className="text-xs text-muted-foreground">
              Northwind Inc. · $4,200
            </span>
          </div>
        </div>
      </div>

      {/* Floating AI card */}
      <div className="absolute -right-4 -top-6 hidden w-56 rounded-xl border border-border bg-card p-4 shadow-popover sm:block">
        <div className="flex items-center gap-2">
          <Sparkle size={16} weight="fill" className="text-primary-action" />
          <span className="text-sm font-medium text-foreground">AI summary</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          You&apos;re up 12% WoW. Biggest mover: enterprise tier.
        </p>
      </div>
    </div>
  );
}
