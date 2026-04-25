import Link from "next/link";
import { Button, Card, Tag } from "@sarunyu/system-one";
import {
  Lightning,
  ChartLineUp,
  Users,
  ShieldCheck,
  Sparkle,
  Plugs,
  Check,
  ArrowRight,
  Quotes,
} from "@phosphor-icons/react/dist/ssr";
import { HeroIllustration } from "./_components/hero-illustration";
import { MarketingNav } from "./_components/marketing-nav";
import { MarketingFooter } from "./_components/marketing-footer";

const features = [
  {
    icon: Lightning,
    title: "Ship faster",
    body: "Automations and templates turn weekly rituals into a single keyboard shortcut.",
  },
  {
    icon: ChartLineUp,
    title: "Insights you trust",
    body: "Real-time dashboards pull from every tool in your stack. No SQL required.",
  },
  {
    icon: Users,
    title: "Built for teams",
    body: "Granular roles, comment threads, and activity feeds keep everyone aligned.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    body: "SSO, SCIM, audit logs, and SOC 2 Type II — enterprise ready on day one.",
  },
  {
    icon: Sparkle,
    title: "AI that actually helps",
    body: "Draft updates, summarize threads, and answer questions with team context.",
  },
  {
    icon: Plugs,
    title: "Plays well with others",
    body: "80+ integrations across Slack, GitHub, Stripe, HubSpot, Notion, and more.",
  },
];

const testimonials = [
  {
    quote:
      "Lumen replaced four tools in our stack and gave us back half a day each week. The onboarding took an afternoon.",
    name: "Priya Natarajan",
    role: "Head of Operations, Northwind",
  },
  {
    quote:
      "The dashboards are the first place my team checks every morning. It's quietly become the operating manual for the company.",
    name: "Marcus Chen",
    role: "Co-founder, Field Labs",
  },
  {
    quote:
      "Beautiful product, careful defaults. It feels like it was designed by people who ship for a living.",
    name: "Ines Okafor",
    role: "Staff PM, Parallax",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/ forever",
    blurb: "Everything you need to get organized.",
    features: [
      "Up to 5 teammates",
      "Unlimited projects",
      "2 integrations",
      "Community support",
    ],
    cta: "Start free",
    variant: "outline" as const,
    highlight: false,
  },
  {
    name: "Growth",
    price: "$24",
    cadence: "/ user / month",
    blurb: "For teams moving quickly and shipping often.",
    features: [
      "Unlimited teammates",
      "Advanced dashboards",
      "50+ integrations",
      "Priority email support",
      "AI assistant",
    ],
    cta: "Start 14-day trial",
    variant: "primary" as const,
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    blurb: "Security, scale, and bespoke workflows.",
    features: [
      "SSO & SCIM provisioning",
      "Audit logs & data residency",
      "Dedicated success manager",
      "Custom integrations",
      "99.99% SLA",
    ],
    cta: "Talk to sales",
    variant: "outline" as const,
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MarketingNav />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-divider">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-20 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex">
              <Tag text="New · AI workflows are here" variant="blue" />
            </div>
            <h1>The operating system for teams who ship.</h1>
            <p className="text-lg text-muted-foreground">
              Lumen is the calm, opinionated home for your projects, pipelines,
              and people. Built on careful defaults — so you can spend less
              time in tools and more time in flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight weight="bold" />}>
                  Start free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Sign in
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check weight="bold" className="text-success" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <Check weight="bold" className="text-success" />
                Free for 5 users
              </span>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-b border-divider bg-default-secondary py-10">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8">
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Loved by product and operations teams at
          </p>
          <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
            {["Northwind", "Field Labs", "Parallax", "Atlas", "Ember", "Axiom"].map((brand) => (
              <div
                key={brand}
                className="text-center text-lg font-semibold tracking-tight text-default-tertiary"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8 space-y-8">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-3 text-center">
            <Tag text="Features" variant="gray" size="small" />
            <h2>Everything your team needs, none of the noise.</h2>
            <p className="text-muted-foreground">
              Six carefully shaped surfaces that work together out of the box.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <Card key={title} size="desktop" className="w-full">
                <div className="flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-action-light text-primary-action">
                    <Icon size={22} weight="duotone" />
                  </div>
                  <h4>{title}</h4>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="border-y border-divider bg-default-secondary py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8 space-y-8">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-3 text-center">
            <Tag text="Loved by teams" variant="green" size="small" />
            <h2>Quiet confidence, real results.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} size="desktop" className="w-full">
                <div className="flex flex-col gap-4">
                  <Quotes size={22} weight="fill" className="text-primary-action" />
                  <p className="text-base leading-6 text-foreground">{t.quote}</p>
                  <div className="mt-2 flex flex-col gap-0.5 border-t border-divider pt-4">
                    <span className="text-sm font-medium text-foreground">{t.name}</span>
                    <span className="text-sm text-muted-foreground">{t.role}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8 space-y-8">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-3 text-center">
            <Tag text="Pricing" variant="blue" size="small" />
            <h2>Fair, predictable pricing.</h2>
            <p className="text-muted-foreground">
              Start free. Upgrade only when your team needs more horsepower.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.highlight
                    ? "relative flex flex-col gap-6 rounded-2xl border border-brand bg-card p-8 shadow-card"
                    : "relative flex flex-col gap-6 rounded-2xl border border-border bg-card p-8"
                }
              >
                {plan.highlight ? (
                  <div className="absolute -top-3 left-8">
                    <Tag text="Most popular" variant="blue" size="small" />
                  </div>
                ) : null}
                <div className="flex flex-col gap-2">
                  <h3>{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.blurb}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                  {plan.cadence ? (
                    <span className="text-sm text-muted-foreground">{plan.cadence}</span>
                  ) : null}
                </div>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check
                        weight="bold"
                        className="mt-0.5 shrink-0 text-primary-action"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="mt-auto">
                  <Button variant={plan.variant} size="md" className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-divider py-20">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-6 text-center">
          <h2>Ready to see your team in flow?</h2>
          <p className="text-muted-foreground">
            Spin up your workspace in under two minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/signup">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight weight="bold" />}>
                Create your workspace
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="plain" size="lg">
                I already have an account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
