import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Server, Search, Settings, Zap, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Step-by-step guide to migrating VMs with VM Migrator. Connect infrastructure, discover VMs, choose your strategy, run the 8-phase pipeline, and validate.",
};

const steps = [
  {
    icon: Server,
    number: "01",
    title: "Connect Your Infrastructure",
    description: "Add your source hypervisors and target platforms via the web dashboard.",
    details: [
      {
        subtitle: "Source Hypervisors",
        items: [
          "VMware vCenter or ESXi — provide vSphere API endpoint and credentials. Connection is pure API, no SSH to ESXi needed.",
          "Hyper-V — provide Windows Server host address with SSH access. VM Migrator uses PowerShell cmdlets over SSH.",
          "Proxmox VE — provide cluster API URL with token authentication. SSH access for disk operations.",
          "KVM/libvirt — provide host SSH credentials. VM Migrator uses virsh commands and domain XML parsing.",
        ],
      },
      {
        subtitle: "Target Platforms",
        items: [
          "OpenStack — provide Keystone endpoint, project credentials, and target network/flavor preferences.",
          "VHI (Virtuozzo Hybrid Infrastructure) — same as OpenStack. VHI exposes standard OpenStack APIs.",
          "Proxmox VE — provide target cluster API URL, authentication token, and TLS fingerprint for remote migration.",
        ],
      },
      {
        subtitle: "What Happens",
        items: [
          "Credentials are validated against the source/target APIs immediately.",
          "Connection status is shown in the dashboard — green for healthy, alerts for issues.",
          "You can add multiple sources and targets for different migration scenarios.",
        ],
      },
    ],
  },
  {
    icon: Search,
    number: "02",
    title: "Discover Your VMs",
    description: "Automatic discovery pulls complete VM inventory from every connected source.",
    details: [
      {
        subtitle: "What Gets Discovered",
        items: [
          "VM name, unique identifier, and power state (running, stopped, paused).",
          "Operating system type and version (Linux, Windows, specific distros).",
          "CPU count, memory (MB), and total disk size (GB).",
          "All disks — device name, bus type, format (VMDK, VHD, QCOW2, RAW), and individual sizes.",
          "All network interfaces — bridge/switch names, MAC addresses.",
          "Firmware type — BIOS or UEFI (auto-detected from hypervisor config).",
          "Boot disk identification and boot order.",
        ],
      },
      {
        subtitle: "Eligibility Checks",
        items: [
          "Templates and snapshots-only VMs are flagged as not migratable.",
          "PCI passthrough devices are detected — these VMs need manual intervention.",
          "Shared VHDX disks (Hyper-V) are flagged — cannot be migrated while shared.",
          "Clear notes explain why a VM is ineligible and what to do about it.",
        ],
      },
      {
        subtitle: "Periodic Sync",
        items: [
          "Scheduled Celery tasks re-discover VMs automatically.",
          "New VMs appear in your inventory without manual action.",
          "Changed specs (more RAM, new disks) are updated automatically.",
        ],
      },
    ],
  },
  {
    icon: Settings,
    number: "03",
    title: "Choose Your Migration Strategy",
    description: "Select VMs, map networks, and pick one-time migration or continuous replication.",
    details: [
      {
        subtitle: "Option A: One-Time Migration",
        items: [
          "Select one or more VMs from the inventory.",
          "Map each source network to a target network in OpenStack/VHI.",
          "Choose target flavor (auto-matched from source CPU/RAM) or override manually.",
          "Start migration — the 8-phase pipeline runs once, end to end.",
          "Best for scheduled maintenance windows or smaller environments.",
        ],
      },
      {
        subtitle: "Option B: Continuous Replication + Cutover",
        items: [
          "Set up replication schedule (e.g., every 15 minutes).",
          "Initial full sync copies the entire disk to a Cinder volume via Cloud Agent.",
          "Subsequent syncs transfer only changed blocks (ZFS/LVM snapshots or CBT).",
          "When ready, trigger cutover: final delta sync, then boot on target.",
          "Best for production-critical workloads with near-zero-downtime requirements.",
        ],
      },
      {
        subtitle: "Preflight Checks",
        items: [
          "Before any migration starts, preflight validation runs automatically.",
          "Checks: source connectivity, target resources, disk format compatibility, network mapping validity.",
          "Any issues are reported clearly — fix them before committing.",
        ],
      },
    ],
  },
  {
    icon: Zap,
    number: "04",
    title: "The 8-Phase Automated Pipeline",
    description: "Every migration follows this pipeline. Each phase is tracked, resumable, and logged.",
    details: [
      {
        subtitle: "The Phases",
        items: [
          "Phase 1: PREFLIGHT — Validate connectivity, check compatibility, verify network mappings.",
          "Phase 2: DISCOVERY — Query source for latest VM details, detect disks, NICs, firmware type, boot device.",
          "Phase 3: DISK EXPORT — Create snapshot on running VM, export disk data. VMware: HTTPS download. Hyper-V: checkpoint + AVHDX. Proxmox/KVM: snapshot + local copy or NBD stream.",
          "Phase 4: DISK CONVERT — Convert to QCOW2 via qemu-img. For Windows VMs: virt-v2v injects VirtIO drivers automatically. Progress tracked in real-time.",
          "Phase 5: IMAGE UPLOAD — Upload QCOW2 to Glance (chunked, resumable) or stream to Cinder volume via Cloud Agent. Transfer speed and ETA calculated live.",
          "Phase 6: VM CREATE — Create Nova instance from Glance image or Cinder volume. Flavor matched to source specs. Hardware properties set: firmware, disk bus, SCSI model, video model.",
          "Phase 7: NETWORK SETUP — Map source networks to target Neutron networks. Create ports, assign IPs, optionally preserve MAC addresses. Apply security groups.",
          "Phase 8: VALIDATION + CLEANUP — Verify VM is running (or stopped, per config). Check IP assignment. Delete temporary snapshots, exported disks, and temp files. Mark migration complete.",
        ],
      },
      {
        subtitle: "Real-Time Monitoring",
        items: [
          "WebSocket pushes live updates to the dashboard as each phase progresses.",
          "Current phase, completion percentage, transfer speed (MB/s), and ETA visible at a glance.",
          "Detailed logs accessible for each migration — every action recorded.",
        ],
      },
      {
        subtitle: "Failure Handling",
        items: [
          "Each phase records completion status independently.",
          "If phase 5 fails (upload), retrying resumes from phase 5 — not from the beginning.",
          "Upload has resume capability with byte offset tracking for large disks.",
          "Clear error messages in logs help diagnose issues quickly.",
        ],
      },
    ],
  },
  {
    icon: CheckCircle,
    number: "05",
    title: "Validate & Cutover",
    description: "Verify the migrated VM, update DNS, and decommission the source.",
    details: [
      {
        subtitle: "Automatic Validation",
        items: [
          "VM power state confirmed on target (running or stopped as configured).",
          "IP address assignment detected automatically.",
          "Checksum validation available (SHA256) for data integrity verification.",
          "Validation result recorded: passed, failed, or partial.",
        ],
      },
      {
        subtitle: "Post-Migration Steps",
        items: [
          "Log in to the migrated VM and verify applications are working.",
          "Update DNS records or load balancer configs to point to the new IP.",
          "If using continuous replication: replication stops automatically after cutover.",
          "Temporary resources (snapshots, export files) are cleaned up automatically.",
        ],
      },
      {
        subtitle: "Source Decommission",
        items: [
          "The source VM is not modified or deleted during migration.",
          "When satisfied with the target VM, manually decommission the source.",
          "Migration history and logs are retained for audit purposes.",
        ],
      },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              How It Works
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              From Source to Target in{" "}
              <span className="gradient-text">Five Steps</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              A detailed walkthrough of the VM Migrator workflow — from connecting your infrastructure to final cutover and validation.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      {steps.map((step, index) => (
        <section
          key={step.number}
          className={`py-20 ${index % 2 === 1 ? "border-t border-b border-border bg-surface/30" : ""}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Step header */}
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white">
                {step.number}
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-2 text-lg text-text-secondary">{step.description}</p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {step.details.map((detail) => (
                <div key={detail.subtitle} className="glass-card rounded-2xl p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {detail.subtitle}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {detail.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Pipeline overview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The 8-Phase Pipeline at a Glance"
            description="Every migration follows this sequence. Each phase is independently tracked and resumable."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {[
              { phase: "1", name: "Preflight" },
              { phase: "2", name: "Discovery" },
              { phase: "3", name: "Export" },
              { phase: "4", name: "Convert" },
              { phase: "5", name: "Upload" },
              { phase: "6", name: "Create VM" },
              { phase: "7", name: "Network" },
              { phase: "8", name: "Validate" },
            ].map((p) => (
              <div key={p.phase} className="glass-card flex flex-col items-center rounded-xl p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                  {p.phase}
                </div>
                <span className="mt-2 text-xs font-medium text-text-secondary">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to See It in Action?"
        description="Book a demo and we'll walk through a live migration with your infrastructure."
      />
    </>
  );
}
