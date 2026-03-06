import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import CTASection from "./CTASection";

interface MigrationStep {
  number: string;
  title: string;
  description: string;
}

interface MigrationPathPageProps {
  badge: string;
  title: string;
  subtitle: string;
  whyMigrateTitle: string;
  whyMigrateReasons: string[];
  targetEducation?: {
    title: string;
    description: string;
    points: string[];
  };
  howItWorks: {
    title: string;
    points: string[];
  };
  supported: string[];
  steps: MigrationStep[];
}

export default function MigrationPathPage({
  badge,
  title,
  subtitle,
  whyMigrateTitle,
  whyMigrateReasons,
  targetEducation,
  howItWorks,
  supported,
  steps,
}: MigrationPathPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="dot-pattern absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              {badge}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:shadow-lg hover:shadow-white/20"
              >
                Book a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See Full Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Migrate */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              {whyMigrateTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {whyMigrateReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="leading-relaxed text-text-secondary">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Target Education (optional) */}
      {targetEducation && (
        <section className="section-purple-light py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                {targetEducation.title}
              </h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                {targetEducation.description}
              </p>
              <ul className="mt-6 space-y-3">
                {targetEducation.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-muted">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* How It Works for This Path */}
      <section className={`py-20 ${targetEducation ? "" : "section-purple-light"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              {howItWorks.title}
            </h2>
            <ul className="mt-8 space-y-4">
              {howItWorks.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed text-text-secondary">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What We Support */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              What We Support
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {supported.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Migration Steps */}
      <section className="section-purple-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Migration Process
            </h2>
            <div className="mt-10 space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="feature-card flex items-start gap-5 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start This Migration?"
        description="Book a demo and we'll plan your migration together."
      />
    </>
  );
}
