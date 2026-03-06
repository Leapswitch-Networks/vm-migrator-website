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
    <section className="relative overflow-hidden border-t border-border py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Book a Demo
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border border-border px-8 py-3.5 text-sm font-medium text-text-secondary transition-colors hover:border-text-muted hover:text-text-primary"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
