import { Card, Tag } from "@sarunyu/system-one";
import { ChartBar } from "@phosphor-icons/react/dist/ssr";

export default function AnalyticsPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 p-6 md:p-8">
      <header className="flex flex-col gap-2">
        <h1>Analytics</h1>
        <p className="text-muted-foreground">
          Deep dives on acquisition, retention, and revenue.
        </p>
      </header>
      <Card size="desktop" className="w-full">
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-action-light text-primary-action">
            <ChartBar size={28} weight="fill" />
          </div>
          <Tag text="Coming soon" variant="blue" size="small" />
          <h3>Dashboards are being stitched together</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            We&apos;re rolling out cohort, funnel, and revenue views next week.
          </p>
        </div>
      </Card>
    </main>
  );
}
