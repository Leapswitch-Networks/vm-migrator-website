import Link from "next/link";
import {
  ArrowRight,
  Zap,
  RefreshCw,
  CloudUpload,
  HardDrive,
  Monitor,
  Shield,
  Server,
  Check,
  X,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

const sourceHypervisors = [
  { name: "VMware ESXi", short: "VMware" },
  { name: "Microsoft Hyper-V", short: "Hyper-V" },
  { name: "Proxmox VE", short: "Proxmox" },
  { name: "KVM / libvirt", short: "KVM" },
];

const targetPlatforms = [
  { name: "OpenStack" },
  { name: "VHI (Virtuozzo)" },
  { name: "Proxmox VE" },
];

const migrationPaths = [
  {
    source: "VMware ESXi",
    target: "OpenStack / VHI",
    href: "/migrations/vmware-to-openstack",
    description: "Escape Broadcom licensing. Quiesced snapshots via vSphere API, VMDK-to-QCOW2 conversion, VirtIO driver injection for Windows.",
    highlight: true,
  },
  {
    source: "Hyper-V",
    target: "OpenStack / VHI",
    href: "/migrations/hyperv-to-openstack",
    description: "Checkpoint-based export of running VMs. VHD/VHDX conversion with automatic VirtIO drivers for Windows guests.",
  },
  {
    source: "Proxmox",
    target: "OpenStack / VHI",
    href: "/migrations/proxmox-to-openstack",
    description: "Snapshot-based export via REST API. Supports ZFS, LVM, and file-based storage backends.",
  },
  {
    source: "KVM / libvirt",
    target: "OpenStack / VHI",
    href: "/migrations/kvm-to-openstack",
    description: "SSH + virsh integration. ZFS/LVM snapshots and NBD streaming. QCOW2 disks may skip conversion entirely.",
  },
  {
    source: "Proxmox",
    target: "Proxmox",
    href: "/migrations/proxmox-to-proxmox",
    description: "Native qm remote-migrate with online live memory transfer. Zero-downtime cluster-to-cluster migration.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Zero-Downtime Snapshots",
    description:
      "Snapshot running VMs on any hypervisor. VMware quiesced snapshots, Hyper-V checkpoints, ZFS/LVM snapshots for Proxmox and KVM. No VM shutdown required.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Replication",
    description:
      "Incremental snapshot-based sync on a configurable schedule. Only changed blocks are transferred. Trigger a final cutover with minimal downtime.",
  },
  {
    icon: CloudUpload,
    title: "Volume Streaming",
    description:
      "Cloud Agents stream disk data directly to Cinder volumes on the target. No local disk space needed. Migrate VMs larger than your server's storage.",
  },
  {
    icon: HardDrive,
    title: "Multi-Disk & Multi-NIC",
    description:
      "Each disk is migrated independently to separate Cinder volumes. All network interfaces are mapped with optional MAC address preservation. BIOS/UEFI auto-detected.",
  },
  {
    icon: Monitor,
    title: "Real-Time Dashboard",
    description:
      "WebSocket-powered progress tracking for every migration. Phase status, transfer speed, ETA, and detailed logs — all in a clean web interface.",
  },
  {
    icon: Shield,
    title: "Windows VirtIO Injection",
    description:
      "Automatic VirtIO driver injection for Windows VMs via virt-v2v. Works with VMDK, VHD, and VHDX sources. No manual driver installation needed.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect",
    description:
      "Add your source hypervisors (VMware, Hyper-V, Proxmox, KVM) and target clouds (OpenStack, VHI, Proxmox) via the web dashboard. Credentials are validated automatically.",
  },
  {
    number: "02",
    title: "Discover",
    description:
      "VM Migrator auto-discovers all VMs with full metadata — CPU, RAM, disks, NICs, OS type, BIOS/UEFI, and boot order. Periodic re-sync keeps your inventory current.",
  },
  {
    number: "03",
    title: "Configure",
    description:
      "Select VMs to migrate, map source networks to target networks, and choose your strategy: one-time migration or continuous replication. Preflight checks validate everything before you start.",
  },
  {
    number: "04",
    title: "Migrate",
    description:
      "The 8-phase automated pipeline runs: snapshot, export, convert, upload or stream, provision, configure networking, validate, and clean up. Track every phase in real time.",
  },
  {
    number: "05",
    title: "Cutover",
    description:
      "Final sync completes, VM boots on the target. Verify networking and functionality, update DNS, and decommission the source VM when you're satisfied.",
  },
];

const comparisonRows = [
  { feature: "VM Shutdown Required", manual: "Usually yes", migrator: "No — snapshot-based" },
  { feature: "Disk Conversion", manual: "Manual qemu-img per disk", migrator: "Automatic with VirtIO injection" },
  { feature: "Multi-Disk VMs", manual: "One disk at a time", migrator: "All disks independently" },
  { feature: "Network Config", manual: "Recreate manually", migrator: "Auto-mapped with MAC preservation" },
  { feature: "Progress Tracking", manual: "SSH and hope", migrator: "Real-time dashboard with ETA" },
  { feature: "Incremental Sync", manual: "Not possible", migrator: "Continuous replication" },
  { feature: "Large VM Support", manual: "Need local disk space", migrator: "Volume streaming — no local disk" },
  { feature: "Resume on Failure", manual: "Start over", migrator: "Resume from last phase" },
  { feature: "Windows Drivers", manual: "Manual VirtIO install", migrator: "Automatic via virt-v2v" },
];

const useCases = [
  {
    icon: Server,
    title: "VMware Exit",
    description:
      "Escape Broadcom licensing costs. Migrate your VMware workloads to OpenStack or VHI with quiesced snapshots and automated VMDK-to-QCOW2 conversion.",
  },
  {
    icon: CloudUpload,
    title: "Data Center Modernization",
    description:
      "Move from legacy Hyper-V, Proxmox, or standalone KVM to an enterprise OpenStack cloud with self-service, multi-tenant, API-driven infrastructure.",
  },
  {
    icon: HardDrive,
    title: "Infrastructure Consolidation",
    description:
      "Converge workloads from multiple hypervisors into a single OpenStack or VHI platform. One migration tool for all your source environments.",
  },
  {
    icon: RefreshCw,
    title: "Proxmox Cluster Migration",
    description:
      "Migrate between Proxmox clusters using native qm remote-migrate with live memory transfer for online migrations, or vzdump for offline moves.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="dot-pattern absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              Automated VM Migration Platform
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Migrate Running VMs to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">OpenStack & VHI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Snapshot-based migration from VMware, Hyper-V, Proxmox, and KVM.
              Continuous replication, volume streaming, and a real-time web
              dashboard. No agents. No downtime.
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
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SUPPORTED PLATFORMS ===== */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-6">
            {/* Sources */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {sourceHypervisors.map((h) => (
                <div
                  key={h.name}
                  className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 shadow-sm"
                >
                  <Server className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-text-secondary">{h.short}</span>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <div className="hidden lg:block">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <div className="lg:hidden">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Targets */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {targetPlatforms.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2.5"
                >
                  <CloudUpload className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-text-muted">
            4 source hypervisors. 3 target platforms. Zero downtime.
          </p>
        </div>
      </section>

      {/* ===== MIGRATION PATHS ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Migration Paths"
            title="Every Path to OpenStack & VHI"
            description="Dedicated migration pipelines for each source hypervisor, optimized for their native export mechanisms."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {migrationPaths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className={`feature-card group relative p-6 transition-all duration-300 ${
                  path.highlight ? "purple-glow" : ""
                }`}
              >
                {path.highlight && (
                  <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-text-primary">{path.source}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">{path.target}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {path.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="section-purple-light py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Features"
            title="Built for Real-World Migration"
            description="Every feature is based on production experience migrating workloads across hypervisors."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="How It Works"
            title="Five Steps to Migration"
            description="From connecting your infrastructure to final cutover — fully automated."
          />
          <div className="mt-16 space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="feature-card flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:p-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              See detailed walkthrough <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MIGRATION MODES ===== */}
      <section className="section-purple-light py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Migration Modes"
            title="One-Time or Continuous — Your Choice"
            description="Choose the migration strategy that fits your downtime requirements."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* One-time */}
            <div className="feature-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-text-primary">One-Time Migration</h3>
              <p className="mt-2 text-text-secondary">Lift-and-shift in a single pass.</p>
              <ul className="mt-6 space-y-3">
                {[
                  "Snapshot running VM on source",
                  "Export and convert disk to QCOW2",
                  "Upload to Glance, provision via Nova",
                  "Configure networking via Neutron",
                  "Validate and clean up",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-surface p-3">
                <p className="text-xs text-text-muted">
                  <strong className="text-text-secondary">Best for:</strong> Scheduled maintenance windows, smaller environments, Proxmox-to-Proxmox moves.
                </p>
              </div>
            </div>

            {/* Continuous */}
            <div className="feature-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-text-primary">Continuous Replication + Cutover</h3>
              <p className="mt-2 text-text-secondary">Incremental sync with near-zero cutover downtime.</p>
              <ul className="mt-6 space-y-3">
                {[
                  "Initial full sync to Cinder volume",
                  "Incremental syncs on schedule (e.g. every 15 min)",
                  "Only changed blocks transferred",
                  "Trigger cutover when ready — final delta sync",
                  "Boot directly from Cinder volume",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-surface p-3">
                <p className="text-xs text-text-muted">
                  <strong className="text-text-secondary">Best for:</strong> Near-zero-downtime requirements, large environments, production-critical workloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Comparison"
            title="VM Migrator vs Manual Migration"
            description="Stop running qemu-img and nova boot by hand."
          />
          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[600px] overflow-hidden rounded-2xl border border-border">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Manual Migration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">VM Migrator</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-surface"}>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">{row.feature}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-text-muted">
                        <X className="h-4 w-4 text-danger" />
                        {row.manual}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-text-primary">
                        <Check className="h-4 w-4 text-success" />
                        {row.migrator}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section className="section-purple-light py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Use Cases"
            title="Built for These Scenarios"
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div key={uc.title} className="feature-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
                  <uc.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-text-primary">{uc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CTASection />
    </>
  );
}
