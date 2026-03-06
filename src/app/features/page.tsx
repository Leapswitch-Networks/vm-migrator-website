import type { Metadata } from "next";
import {
  Zap,
  RefreshCw,
  CloudUpload,
  HardDrive,
  Monitor,
  Shield,
  Server,
  Settings,
  Search,
  CheckCircle,
  Lock,
  Layers,
  Cpu,
  Network,
  Database,
  Terminal,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Features",
  description:
    "VM Migrator features: 8-phase migration pipeline, continuous replication, volume streaming, multi-disk support, VirtIO injection, real-time dashboard, and more.",
  openGraph: {
    title: "Features | VM Migrator",
    description: "8-phase migration pipeline, continuous replication, volume streaming, multi-disk support, VirtIO injection, and real-time dashboard.",
  },
  alternates: { canonical: "/features" },
};

const featureCategories = [
  {
    title: "Migration Engine",
    description: "The core pipeline that moves your VMs safely and automatically.",
    features: [
      {
        icon: Zap,
        name: "8-Phase Automated Pipeline",
        detail: "Preflight validation, discovery, disk export, disk conversion, image upload, network setup, VM creation, and validation/cleanup — fully automated and resumable.",
      },
      {
        icon: HardDrive,
        name: "Snapshot-Based Export",
        detail: "All source types use snapshots on running VMs. VMware uses quiesced snapshots via VMware Tools, Hyper-V uses checkpoints, Proxmox and KVM use ZFS/LVM snapshots. No VM shutdown needed.",
      },
      {
        icon: Settings,
        name: "Disk Format Conversion",
        detail: "Automatic conversion between VMDK, VHD, VHDX, QCOW2, and RAW formats. Uses qemu-img for format conversion and virt-v2v for Windows VirtIO driver injection.",
      },
      {
        icon: Layers,
        name: "Multi-Disk Migration",
        detail: "Boot disk and data disks are migrated independently. Boot disk goes to Glance, data disks to separate Cinder volumes. All sizes and formats detected automatically.",
      },
      {
        icon: CheckCircle,
        name: "Preflight Validation",
        detail: "Before migration starts, preflight checks validate source/target connectivity, disk format compatibility, network mappings, and resource availability. Issues flagged before you commit.",
      },
      {
        icon: RefreshCw,
        name: "Phase-Based Resumability",
        detail: "Each of the 8 phases tracks completion independently. If a migration fails at phase 5, retry picks up from phase 5 — no re-exporting or re-converting.",
      },
    ],
  },
  {
    title: "Continuous Replication",
    description: "Incremental sync for near-zero-downtime cutover.",
    features: [
      {
        icon: RefreshCw,
        name: "Incremental Snapshot Sync",
        detail: "After the initial full sync, only changed blocks are transferred on each cycle. Uses ZFS/LVM snapshots or Changed Block Tracking (CBT) depending on the source.",
      },
      {
        icon: Settings,
        name: "Configurable Schedule",
        detail: "Set your replication interval — every 15 minutes, hourly, or custom. The scheduler runs sync cycles automatically via Celery Beat.",
      },
      {
        icon: Zap,
        name: "Final Cutover",
        detail: "When ready, trigger the cutover: one last delta sync, then boot the VM on the target. Cutover downtime is limited to the time for the final sync — typically seconds to minutes.",
      },
      {
        icon: Database,
        name: "Boot from Cinder Volume",
        detail: "With replication, the VM boots directly from the Cinder volume — no need to re-upload to Glance. Faster provisioning and less storage duplication.",
      },
    ],
  },
  {
    title: "Volume Streaming (Cloud Agents)",
    description: "Stream disk data directly to target storage without local disk.",
    features: [
      {
        icon: CloudUpload,
        name: "Cloud Agent Architecture",
        detail: "Cloud Agents are Nova instances on the target cloud that act as streaming endpoints. They receive disk data over the network and write directly to Cinder volumes.",
      },
      {
        icon: Server,
        name: "No Local Disk Needed",
        detail: "Disk data streams from source hypervisor through the Cloud Agent to a Cinder volume. No temporary local copy needed on the migration server. Migrate 2TB VMs without 2TB of free disk.",
      },
      {
        icon: Network,
        name: "Protocol Support",
        detail: "VMware: nbdkit-vddk plugin for direct VDDK streaming. Proxmox/KVM: NBD (Network Block Device) pull. Hyper-V: qemu-nbd writable endpoint with source push.",
      },
      {
        icon: Layers,
        name: "Concurrent Migrations",
        detail: "Multiple Cloud Agents with configurable concurrent migration slots. Atomic slot reservation with row-level locking prevents race conditions.",
      },
    ],
  },
  {
    title: "Source Hypervisors",
    description: "Native integration with each hypervisor's management API.",
    features: [
      {
        icon: Server,
        name: "VMware ESXi / vCenter",
        detail: "Pure vSphere API integration via pyvmomi. VMDK download over HTTPS using session cookies. Quiesced snapshots with VMware Tools, crash-consistent fallback. No SSH to ESXi needed.",
      },
      {
        icon: Server,
        name: "Microsoft Hyper-V",
        detail: "SSH + PowerShell cmdlets. Checkpoint-based export: creates checkpoint on running VM, freezes parent VHDX, exports differencing disk. Supports VHD, VHDX (Fixed, Dynamic, Differencing).",
      },
      {
        icon: Server,
        name: "Proxmox VE",
        detail: "REST API + SSH. Snapshot mode for running VMs, vzdump full backup, and native qm remote-migrate for Proxmox-to-Proxmox. Supports ZFS, LVM, local, and QCOW2 storage backends.",
      },
      {
        icon: Server,
        name: "KVM / libvirt",
        detail: "SSH + virsh commands. Domain XML parsing for full VM metadata. ZFS/LVM snapshots, file-based disk copy, NBD (Network Block Device) streaming. Detects host distro and nbdcopy availability.",
      },
    ],
  },
  {
    title: "Target Platforms",
    description: "Full integration with OpenStack services and Proxmox.",
    features: [
      {
        icon: CloudUpload,
        name: "OpenStack (Full Stack)",
        detail: "Glance for image upload (chunked with resume), Nova for VM provisioning, Neutron for network mapping, Cinder for block storage volumes. Hardware properties preserved: firmware type, disk bus, SCSI model, video model.",
      },
      {
        icon: CloudUpload,
        name: "Virtuozzo Hybrid Infrastructure (VHI)",
        detail: "VHI is built on OpenStack. VM Migrator works natively with VHI via the same OpenStack APIs — Glance, Nova, Neutron, Cinder. No special configuration needed.",
      },
      {
        icon: Server,
        name: "Proxmox VE (Target)",
        detail: "Native qm remote-migrate for Proxmox-to-Proxmox with online (live memory transfer) and offline modes. Fallback via vzdump + rsync + qmrestore with network bridge remapping.",
      },
    ],
  },
  {
    title: "Discovery & Intelligence",
    description: "Automatic VM inventory with full metadata.",
    features: [
      {
        icon: Search,
        name: "Auto-Discovery",
        detail: "Connects to each source hypervisor and enumerates all VMs automatically. No manual VM registration — just add the source and VMs appear in your inventory.",
      },
      {
        icon: Cpu,
        name: "Full VM Metadata",
        detail: "Name, OS type and version, vCPUs, memory, all disks (with sizes, formats, bus types), all NICs, BIOS/UEFI firmware type, boot order, and power state.",
      },
      {
        icon: CheckCircle,
        name: "Eligibility Detection",
        detail: "Automatically flags VMs that can't be migrated: templates, VMs with PCI passthrough devices, shared VHDX disks. Clear notes explain why and what to do.",
      },
      {
        icon: RefreshCw,
        name: "Periodic Re-Sync",
        detail: "Scheduled Celery tasks re-discover VMs periodically. New VMs appear automatically, removed VMs are flagged. Your inventory stays current without manual refresh.",
      },
    ],
  },
  {
    title: "Dashboard & Monitoring",
    description: "Real-time visibility into every migration.",
    features: [
      {
        icon: Monitor,
        name: "Real-Time Progress",
        detail: "WebSocket-powered dashboard showing live migration progress. Current phase, completion percentage, transfer speed (MB/s), and estimated time remaining.",
      },
      {
        icon: Terminal,
        name: "Migration Logs",
        detail: "Detailed per-migration logging. Every phase records its actions, errors, and timing. Full audit trail for compliance and debugging.",
      },
      {
        icon: Layers,
        name: "VM Inventory",
        detail: "Browse all discovered VMs across all sources. Filter by source, OS, size, eligibility. Select and queue migrations directly from the inventory.",
      },
      {
        icon: Server,
        name: "Cloud Agent Status",
        detail: "Monitor Cloud Agent utilization: active migrations, available slots, connection health. See which agents are busy and which are available.",
      },
    ],
  },
  {
    title: "Security & Access Control",
    description: "Enterprise security from authentication to shell safety.",
    features: [
      {
        icon: Shield,
        name: "Role-Based Access Control",
        detail: "Three roles: Admin (full access), Operator (manage migrations), Viewer (read-only monitoring). JWT token authentication with secure token management.",
      },
      {
        icon: Lock,
        name: "Agentless Architecture",
        detail: "Nothing is installed on source VMs. VM Migrator connects to hypervisor management APIs only. Your guest VMs are never touched directly.",
      },
      {
        icon: Shield,
        name: "Encrypted Transfers",
        detail: "All data transfer over HTTPS and SSH. vSphere VMDK download uses authenticated HTTPS sessions. Hypervisor credentials stored securely.",
      },
      {
        icon: Lock,
        name: "Shell Injection Protection",
        detail: "All shell commands use shlex.quote() and dedicated validators. VMID, storage names, paths, hostnames, and SSH users are all validated before use in any command.",
      },
    ],
  },
];

export default function FeaturesPage() {
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
              Features
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Everything You Need for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">Enterprise VM Migration</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Purpose-built for migrating VMs to OpenStack and VHI. Snapshot-based export, continuous replication, volume streaming, and a full web dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, catIndex) => (
        <section
          key={category.title}
          className={`py-24 ${catIndex % 2 === 1 ? "section-purple-light" : ""}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={category.title}
              description={category.description}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {category.features.map((feature) => (
                <div key={feature.name} className="feature-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary">{feature.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{feature.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
