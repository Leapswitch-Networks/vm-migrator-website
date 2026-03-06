import Link from "next/link";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export default function CTASection({
  title = "Ready to Migrate Your VMs?",
  description = "Get started with VM Migrator. Book a demo to see how we can automate your migration to OpenStack or VHI.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="hero-gradient absolute inset-0" />
      <div className="dot-pattern absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:shadow-lg hover:shadow-white/20"
          >
            Book a Demo
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
