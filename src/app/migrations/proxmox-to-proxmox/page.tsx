import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Zap, HardDrive } from "lucide-react";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Proxmox to Proxmox Migration",
  description:
    "Migrate between Proxmox clusters with native qm remote-migrate. Online migration with live memory transfer or offline via vzdump + qmrestore.",
  keywords: [
    "Proxmox to Proxmox",
    "Proxmox cluster migration",
    "qm remote-migrate",
    "Proxmox live migration",
    "Proxmox remote migration",
  ],
  openGraph: {
    title: "Proxmox to Proxmox Migration | VM Migrator",
    description: "Migrate between Proxmox clusters with native qm remote-migrate. Online or offline migration with vzdump fallback.",
  },
  alternates: { canonical: "/migrations/proxmox-to-proxmox" },
};

export default function ProxmoxToProxmoxPage() {
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
              Proxmox to Proxmox
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Migrate Between Proxmox Clusters —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">Online & Native</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Two migration methods: native qm remote-migrate with live memory transfer for zero downtime, or vzdump backup + qmrestore for maximum compatibility. VM Migrator selects the best method automatically.
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

      {/* Why */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Why Proxmox-to-Proxmox?
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Migrate VMs between clusters during hardware upgrades or datacenter moves.",
                "Consolidate multiple smaller Proxmox clusters into a larger one.",
                "Online migration transfers live memory — the VM stays running during migration with near-zero downtime.",
                "No format conversion needed — Proxmox native backup format is preserved end to end.",
                "Storage and network bridge remapping handles differences between source and target clusters.",
              ].map((reason, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="leading-relaxed text-text-secondary">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Two Methods */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Two Migration Methods
            </h2>
            <p className="mt-4 text-text-secondary">
              VM Migrator automatically selects the best method based on your target configuration.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Method 1: qm remote-migrate */}
            <div className="feature-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text-primary">
                qm remote-migrate
              </h3>
              <div className="mt-1 inline-flex rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                Preferred
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                Native Proxmox remote migration command. Single atomic operation — no intermediate files or conversion.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Online mode: Live memory transfer — VM stays running, near-zero downtime",
                  "Offline mode: VM stopped, migrated, started on target",
                  "Single-step: export + transfer + provision happens atomically",
                  "Requires: target API token, secret, and TLS fingerprint",
                  "Storage mapping between source and target",
                  "Network bridge remapping",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-surface p-3">
                <p className="text-xs text-text-muted">
                  <strong className="text-text-secondary">Auto-selected when:</strong> Target has API token + TLS fingerprint configured.
                </p>
              </div>
            </div>

            {/* Method 2: vzdump + rsync + qmrestore */}
            <div className="feature-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                <HardDrive className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text-primary">
                vzdump + rsync + qmrestore
              </h3>
              <div className="mt-1 inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                Fallback
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                Full VM backup, transfer to target, and restore. Works when remote-migrate isn't available.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Phase 1: vzdump creates complete VM backup on source",
                  "Phase 2: rsync transfers backup file to target cluster",
                  "Phase 3: qmrestore restores VM from backup on target",
                  "Phase 4: Network bridge remapped if source/target differ",
                  "No special token or fingerprint needed — SSH access only",
                  "Works across Proxmox versions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-surface p-3">
                <p className="text-xs text-text-muted">
                  <strong className="text-text-secondary">Auto-selected when:</strong> Target doesn't have API token or TLS fingerprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported */}
      <section className="section-purple-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              What We Support
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Proxmox VE clusters (source and target)",
                "Online migration with live memory (qm remote-migrate --online)",
                "Offline migration (stop → migrate → start)",
                "All storage backends: ZFS, LVM, local, Ceph",
                "Storage mapping between different backends",
                "Network bridge remapping",
                "vzdump backup with all compression types",
                "Automatic method selection (remote-migrate vs vzdump)",
                "Manual override of migration method",
                "BIOS and UEFI VMs",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Migration Process
            </h2>
            <div className="mt-10 space-y-6">
              {[
                { number: "1", title: "Connect Both Clusters", description: "Add source and target Proxmox clusters. For remote-migrate: provide target API token and TLS fingerprint. For vzdump fallback: SSH access is sufficient." },
                { number: "2", title: "Discover VMs on Source", description: "All QEMU VMs on the source cluster are discovered with full config: storage backends, disk paths, network bridges, BIOS type. Migration eligibility assessed." },
                { number: "3", title: "Select and Configure", description: "Choose VMs, map storage backends (e.g., local-zfs on source → ceph on target), map network bridges. Choose online or offline mode if using remote-migrate." },
                { number: "4", title: "Execute Migration", description: "VM Migrator selects the best method automatically. For remote-migrate: single atomic command. For vzdump: backup → rsync → restore → bridge remap. Progress tracked in real time." },
                { number: "5", title: "Verify on Target", description: "VM running on target cluster with correct storage and networking. Verify applications, update any external references, decommission source VM." },
              ].map((step) => (
                <div key={step.number} className="feature-card flex items-start gap-5 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need to Move VMs Between Proxmox Clusters?"
        description="Book a demo to see live online migration between Proxmox clusters."
      />
    </>
  );
}
