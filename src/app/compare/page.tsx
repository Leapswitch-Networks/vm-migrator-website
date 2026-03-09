import type { Metadata } from "next";
import {
  ShieldCheck,
  Zap,
  CloudUpload,
  HardDrive,
  Monitor,
  RefreshCw,
  Search,
  Server,
  Check,
  X,
  Minus,
  Network,
  Cpu,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Compare — VM Migrator vs Hystax vs Coriolis",
  description:
    "See how VM Migrator compares to Hystax Acura and Coriolis. Agentless migration, block-level replication, direct volume streaming, and self-hosted deployment.",
  keywords: [
    "VM migration comparison",
    "Hystax alternative",
    "Coriolis alternative",
    "VM migration tools",
    "OpenStack migration comparison",
    "VMware migration tools comparison",
  ],
  openGraph: {
    title: "Compare VM Migrator vs Hystax vs Coriolis",
    description:
      "Feature-by-feature comparison of VM Migrator, Hystax Acura, and Coriolis for OpenStack and cloud migrations.",
  },
  alternates: { canonical: "/compare" },
};

const advantages = [
  {
    icon: ShieldCheck,
    title: "Truly Agentless — No Guest Modifications",
    description:
      "VM Migrator talks directly to the hypervisor via APIs — Proxmox REST, virsh, PowerShell, vSphere. No software is installed inside your VMs. Ever.",
    comparison:
      "Hystax requires agents inside every VM (Linux .deb/.rpm, Windows MSI) except VMware which needs an OVA appliance. Coriolis claims agentless but still requires external workers and cloud endpoint connectivity.",
  },
  {
    icon: RefreshCw,
    title: "Block-Level Continuous Replication",
    description:
      "Initial full sync to Cinder volumes, then incremental ZFS/LVM snapshot-based delta syncs. Schedule cutover to a specific time — final delta sync + boot = seconds of downtime.",
    comparison:
      "Hystax supports replication but with 15+ minute RPO and requires per-VM agents. Coriolis offers scheduled replicas but each cycle is a full snapshot — no true incremental block-level sync.",
  },
  {
    icon: CloudUpload,
    title: "Direct Volume Streaming via Cloud Agent",
    description:
      "A lightweight Cloud Agent in your target OpenStack streams disks directly into Cinder volumes via NBD. No intermediate storage, no double the storage cost. Supports multiple concurrent migrations per agent.",
    comparison:
      "Hystax also uses cloud agents but they are heavier (2 vCPU, 4GB RAM per target). Coriolis uses worker VMs and uploads images — no direct volume streaming.",
  },
  {
    icon: HardDrive,
    title: "Snapshot-Based Live Export — Zero Disruption",
    description:
      "All four source hypervisors use point-in-time snapshots of running VMs. VMware uses quiesced snapshots, Hyper-V uses checkpoints, Proxmox and KVM use ZFS/LVM snapshots. Source VMs never shut down.",
    comparison:
      "Hystax is agentless only for VMware — other platforms require agents running inside the VM. Coriolis supports live snapshots but doesn't cover KVM/libvirt as a direct source.",
  },
  {
    icon: Search,
    title: "Comprehensive Pre-flight Validation",
    description:
      "Before a single byte transfers, automated checks verify: OpenStack quota availability, source/target connectivity, flavor matching, network existence, local disk space, and tool availability (nbdcopy, qemu-img).",
    comparison:
      "Hystax performs basic connectivity checks. Coriolis has minimal pre-flight — most errors surface during the migration itself, wasting time and resources.",
  },
  {
    icon: Network,
    title: "Multi-Disk + Multi-NIC with BIOS/UEFI Detection",
    description:
      "Every disk, NIC, VLAN tag, MAC address, and firmware type is auto-discovered. Each NIC maps to target OpenStack networks with VLAN preservation and optional MAC preservation. BIOS or UEFI — detected and configured automatically.",
    comparison:
      "Hystax handles multi-disk but network mapping is less granular. Coriolis has good multi-disk support but BIOS/UEFI handling and NIC-level VLAN mapping are less detailed.",
  },
  {
    icon: Monitor,
    title: "Real-Time WebSocket Progress with ETA",
    description:
      "Watch every migration live — current phase, bytes transferred, rolling transfer speed average, ETA countdown, and per-disk progress. Multiple clients can monitor simultaneously.",
    comparison:
      "Hystax provides a dashboard with progress updates but no WebSocket real-time streaming. Coriolis relies on API polling only — no push-based updates.",
  },
  {
    icon: Zap,
    title: "Resumable 8-Phase Pipeline",
    description:
      "Each migration tracks 8 phases with individual completion flags. If upload fails at 90%, resume from that exact point — don't re-export or re-convert. Every phase is checkpointed and idempotent.",
    comparison:
      "Hystax can retry but typically restarts the full replication cycle. Coriolis has phase tracking but with limited granularity on resume points.",
  },
  {
    icon: Server,
    title: "Self-Hosted — No Vendor Lock-in",
    description:
      "Runs entirely on your infrastructure with Docker Compose. PostgreSQL, Redis, Celery — standard open-source stack. No SaaS dependency, no per-VM licensing fees, no data leaving your network.",
    comparison:
      "Hystax is SaaS-first with an expensive on-premises option and per-VM pricing. Coriolis is proprietary software requiring Cloudbase licensing.",
  },
  {
    icon: Cpu,
    title: "VirtIO Driver Injection + Hardware Metadata",
    description:
      "Windows VMs get VirtIO drivers injected automatically via virt-v2v. 10+ hardware properties are set on the target: firmware type, disk bus, SCSI model, machine type, video model, OS type, and QEMU guest agent — so your VM boots correctly the first time.",
    comparison:
      "Hystax provides basic driver handling but less granular metadata control. Coriolis has virt-v2v integration but fewer configurable hardware metadata properties.",
  },
];

const comparisonTable = [
  { feature: "Guest agent required", vm: "No", hystax: "Yes (except VMware)", coriolis: "No" },
  { feature: "Continuous replication", vm: "Block-level incremental", hystax: "Agent-based, 15min+ RPO", coriolis: "Full snapshot replicas" },
  { feature: "Direct volume streaming", vm: "Yes (Cloud Agent + NBD)", hystax: "Via cloud agent", coriolis: "No (image upload)" },
  { feature: "Pre-flight validation", vm: "Comprehensive (6+ checks)", hystax: "Basic", coriolis: "Minimal" },
  { feature: "Real-time WebSocket", vm: "Yes", hystax: "No", coriolis: "No" },
  { feature: "Resumable phases", vm: "8 checkpointed phases", hystax: "Restart cycle", coriolis: "Limited" },
  { feature: "Deployment model", vm: "Self-hosted (Docker)", hystax: "SaaS or on-prem license", coriolis: "Licensed software" },
  { feature: "BIOS/UEFI auto-detect", vm: "Yes", hystax: "Partial", coriolis: "Partial" },
  { feature: "VirtIO injection", vm: "Automatic", hystax: "Basic", coriolis: "Via virt-v2v" },
  { feature: "Source: VMware ESXi", vm: "Yes", hystax: "Yes", coriolis: "Yes" },
  { feature: "Source: Hyper-V", vm: "Yes", hystax: "Yes", coriolis: "Yes" },
  { feature: "Source: Proxmox VE", vm: "Yes", hystax: "No", coriolis: "No" },
  { feature: "Source: KVM / libvirt", vm: "Yes", hystax: "Yes (agent)", coriolis: "No" },
  { feature: "Target: OpenStack / VHI", vm: "Yes", hystax: "Yes", coriolis: "Yes" },
  { feature: "Target: Proxmox", vm: "Yes (native qm migrate)", hystax: "No", coriolis: "Yes" },
  { feature: "Multi-disk migration", vm: "Yes (boot + data disks)", hystax: "Yes", coriolis: "Yes" },
  { feature: "Multi-NIC / VLAN mapping", vm: "Yes (per-NIC mapping)", hystax: "Basic", coriolis: "Basic" },
  { feature: "Per-VM pricing", vm: "No", hystax: "Yes", coriolis: "Licensed" },
];

function CellIcon({ value }: { value: string }) {
  const lower = value.toLowerCase();
  if (lower === "yes" || lower === "no" && value === "No") {
    // For the "Guest agent required" row, "No" is good
    return null;
  }
  return null;
}

function CellStyle({ value, isVm }: { value: string; isVm: boolean }) {
  const lower = value.toLowerCase();
  const isPositive =
    lower === "yes" ||
    lower.startsWith("yes ") ||
    lower.includes("automatic") ||
    lower.includes("comprehensive") ||
    lower.includes("block-level") ||
    lower.includes("self-hosted") ||
    lower.includes("8 checkpointed");
  const isNegative =
    lower === "no" ||
    lower.startsWith("no ") ||
    lower === "minimal" ||
    lower === "basic" ||
    lower === "limited" ||
    lower.includes("restart");

  if (isVm && isPositive)
    return "text-primary font-semibold";
  if (!isVm && isNegative) return "text-red-500";
  return "text-text-secondary";
}

export default function ComparePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="hero-gradient absolute inset-0" />
        <div className="dot-pattern absolute inset-0" />
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-200">
            Comparison
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">
              VM Migrator
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            See how VM Migrator compares to Hystax Acura and Coriolis.
            Agentless architecture, block-level replication, direct volume streaming,
            and full self-hosted deployment — at no per-VM cost.
          </p>
        </div>
      </section>

      {/* 10 Advantages */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="10 Key Advantages"
            title="Feature-by-Feature Breakdown"
            description="Real capabilities from our codebase, compared honestly against the competition."
          />
          <div className="mt-16 space-y-8">
            {advantages.map((item, idx) => (
              <div key={idx} className="feature-card rounded-2xl p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-text-primary">
                      <span className="mr-3 text-primary">{String(idx + 1).padStart(2, "0")}.</span>
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                    <div className="mt-4 rounded-xl bg-surface p-4 border border-border-light">
                      <p className="text-sm font-medium text-text-muted">
                        <span className="text-primary font-semibold">vs competitors: </span>
                        {item.comparison}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-purple-light py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Side-by-Side"
            title="Comparison Table"
            description="A quick-reference view of how the three tools stack up across key capabilities."
          />
          <div className="mt-16 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-tl-2xl bg-[#1a1a2e] px-6 py-4 text-left text-sm font-semibold text-white">
                    Feature
                  </th>
                  <th className="bg-primary px-6 py-4 text-center text-sm font-semibold text-white">
                    VM Migrator
                  </th>
                  <th className="bg-[#1a1a2e] px-6 py-4 text-center text-sm font-semibold text-white">
                    Hystax Acura
                  </th>
                  <th className="rounded-tr-2xl bg-[#1a1a2e] px-6 py-4 text-center text-sm font-semibold text-white">
                    Coriolis
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-border-light ${
                      idx % 2 === 0 ? "bg-white" : "bg-surface"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">
                      {row.feature}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm ${getCellClass(row.vm, true)}`}>
                      {row.vm}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm ${getCellClass(row.hystax, false)}`}>
                      {row.hystax}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm ${getCellClass(row.coriolis, false)}`}>
                      {row.coriolis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-text-muted">
            Comparison based on publicly available documentation and product specifications as of 2026.
          </p>
        </div>
      </section>

      {/* Platform Support Summary */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Platform Coverage"
            title="Source & Target Support"
            description="VM Migrator focuses on the migration paths that matter most — hypervisor to cloud."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Sources */}
            <div className="feature-card rounded-2xl p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Source Hypervisors</h3>
              <div className="space-y-4">
                {[
                  { name: "VMware ESXi / vCenter", method: "vSphere API + VDDK streaming", all: [true, true, true] },
                  { name: "Microsoft Hyper-V", method: "PowerShell + Checkpoint export", all: [true, true, true] },
                  { name: "Proxmox VE", method: "REST API + SSH + vzdump", all: [true, false, false] },
                  { name: "KVM / libvirt", method: "virsh + domain XML + NBD", all: [true, true, false] },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-surface p-4 border border-border-light">
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{s.name}</p>
                      <p className="text-xs text-text-muted mt-0.5">{s.method}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      {s.all[1] ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                          <Check className="h-3.5 w-3.5 text-gray-400" />
                        </span>
                      ) : (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                          <X className="h-3.5 w-3.5 text-red-400" />
                        </span>
                      )}
                      {s.all[2] ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                          <Check className="h-3.5 w-3.5 text-gray-400" />
                        </span>
                      ) : (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                          <X className="h-3.5 w-3.5 text-red-400" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-end gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-primary/20" /> VM Migrator</span>
                <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-gray-200" /> Hystax</span>
                <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-gray-200" /> Coriolis</span>
              </div>
            </div>

            {/* Targets */}
            <div className="feature-card rounded-2xl p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Target Platforms</h3>
              <div className="space-y-4">
                {[
                  { name: "OpenStack", method: "Glance + Nova + Neutron + Cinder", all: [true, true, true] },
                  { name: "VHI (Virtuozzo)", method: "OpenStack-compatible API", all: [true, true, true] },
                  { name: "Proxmox VE", method: "Native qm remote-migrate", all: [true, false, true] },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-surface p-4 border border-border-light">
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{t.name}</p>
                      <p className="text-xs text-text-muted mt-0.5">{t.method}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      {t.all[1] ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                          <Check className="h-3.5 w-3.5 text-gray-400" />
                        </span>
                      ) : (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                          <X className="h-3.5 w-3.5 text-red-400" />
                        </span>
                      )}
                      {t.all[2] ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                          <Check className="h-3.5 w-3.5 text-gray-400" />
                        </span>
                      ) : (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                          <X className="h-3.5 w-3.5 text-red-400" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-end gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-primary/20" /> VM Migrator</span>
                <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-gray-200" /> Hystax</span>
                <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-gray-200" /> Coriolis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="section-purple-light py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Bottom Line"
            title="Built for OpenStack Migrations"
            description="VM Migrator is purpose-built for migrating VMs to OpenStack and VHI. While Hystax and Coriolis spread across many cloud targets, we go deeper on what matters: agentless architecture, block-level replication, direct volume streaming, and a self-hosted model with no per-VM fees."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { label: "No Per-VM Fees", detail: "Flat deployment, unlimited migrations" },
              { label: "Your Infrastructure", detail: "Self-hosted, data stays in your network" },
              { label: "Proxmox Native", detail: "Only tool with Proxmox as source + target" },
            ].map((item, i) => (
              <div key={i} className="feature-card rounded-2xl p-6 text-center">
                <p className="text-lg font-bold text-primary">{item.label}</p>
                <p className="mt-2 text-sm text-text-secondary">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="See VM Migrator in Action"
        description="Book a demo to see how VM Migrator compares in your environment. We'll run a test migration on your actual infrastructure."
      />
    </>
  );
}

function getCellClass(value: string, isVm: boolean): string {
  const lower = value.toLowerCase();
  const isPositive =
    lower === "yes" ||
    lower.startsWith("yes ") ||
    lower.includes("automatic") ||
    lower.includes("comprehensive") ||
    lower.includes("block-level") ||
    lower.includes("self-hosted") ||
    lower.includes("8 checkpointed") ||
    lower === "no" && isVm; // "No" for guest agent is good for VM Migrator

  const isNegative =
    lower === "no" ||
    lower.startsWith("no ") ||
    lower === "minimal" ||
    lower === "basic" ||
    lower === "limited" ||
    lower.includes("restart");

  if (isVm) return "text-primary font-semibold";
  if (isNegative) return "text-red-500";
  return "text-text-secondary";
}
