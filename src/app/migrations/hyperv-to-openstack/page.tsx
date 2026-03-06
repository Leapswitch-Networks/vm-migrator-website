import type { Metadata } from "next";
import MigrationPathPage from "@/components/MigrationPathPage";

export const metadata: Metadata = {
  title: "Hyper-V to OpenStack / VHI Migration",
  description:
    "Migrate Hyper-V VMs to OpenStack or VHI. Checkpoint-based export of running VMs, VHD/VHDX conversion, automatic VirtIO driver injection for Windows.",
  keywords: [
    "Hyper-V to OpenStack",
    "Hyper-V to VHI",
    "Hyper-V cloud migration",
    "VHD to QCOW2",
    "Windows VM migration",
  ],
  openGraph: {
    title: "Hyper-V to OpenStack / VHI Migration | VM Migrator",
    description: "Migrate Hyper-V VMs to OpenStack or VHI. Checkpoint-based export, VHD/VHDX conversion, automatic VirtIO driver injection.",
  },
  alternates: { canonical: "/migrations/hyperv-to-openstack" },
};

export default function HyperVToOpenStackPage() {
  return (
    <MigrationPathPage
      badge="Hyper-V to OpenStack / VHI"
      title="Migrate from Hyper-V to OpenStack & VHI"
      subtitle="Checkpoint-based export of running VMs. VHD/VHDX-to-QCOW2 conversion with automatic VirtIO driver injection. No VM shutdown required."
      whyMigrateTitle="Why Migrate from Hyper-V?"
      whyMigrateReasons={[
        "Move Windows and Linux workloads from Hyper-V to an open, API-driven cloud platform without vendor lock-in.",
        "Reduce Windows Server and System Center licensing overhead by consolidating onto OpenStack or VHI.",
        "Gain self-service provisioning, multi-tenant isolation, and full REST API that Hyper-V standalone doesn't offer.",
        "OpenStack and VHI run Windows guests with full VirtIO performance — no compromises on disk or network speed.",
        "Centralize management of workloads from multiple Hyper-V hosts into a single cloud platform.",
      ]}
      targetEducation={{
        title: "What is VHI?",
        description:
          "Virtuozzo Hybrid Infrastructure (VHI) is an enterprise cloud platform built on OpenStack. VM Migrator connects to VHI using standard OpenStack APIs.",
        points: [
          "Full OpenStack API compatibility — Glance, Nova, Neutron, Cinder all work natively.",
          "Runs Windows VMs with VirtIO drivers for near-native disk and network performance.",
          "Built-in high availability and distributed storage.",
          "Commercial support from Virtuozzo for production environments.",
        ],
      }}
      howItWorks={{
        title: "How Hyper-V Migration Works",
        points: [
          "Connection: VM Migrator connects to your Windows Server host via SSH. PowerShell cmdlets are used for all Hyper-V operations.",
          "Discovery: Get-VM, Get-VMHardDiskDrive, Get-VHD, and Get-VMNetworkAdapter cmdlets enumerate all VMs with full metadata including disk format and type.",
          "Snapshot: A checkpoint is created on the running VM. This freezes the parent VHDX and creates a differencing disk (AVHDX). The VM continues running.",
          "Export: The frozen parent VHDX and differencing disk are exported via SSH. The VM is never shut down during this process.",
          "Conversion: VHD/VHDX is converted to QCOW2. For Windows VMs, virt-v2v handles conversion and injects VirtIO drivers (disk, network, balloon, serial) automatically.",
          "Volume Streaming: Cloud Agents can receive disk data via qemu-nbd writable endpoint. The source Hyper-V host pushes data directly to the Cinder volume.",
          "Provisioning: Nova instance created with Windows-appropriate hardware properties — SCSI disk bus, VGA video model, and correct firmware type.",
        ],
      }}
      supported={[
        "Microsoft Hyper-V on Windows Server",
        "VHD and VHDX disk formats",
        "Fixed, Dynamic, and Differencing disk types",
        "Checkpoint-based export (no VM shutdown)",
        "Windows and Linux guest operating systems",
        "BIOS and UEFI firmware (Generation 1 & 2 VMs)",
        "Multi-disk VMs (boot + data disks)",
        "Multi-NIC with network mapping",
        "Automatic VirtIO driver injection for Windows",
        "Shared VHDX detection (flagged as ineligible with explanation)",
      ]}
      steps={[
        { number: "1", title: "Connect to Hyper-V Host", description: "Provide Windows Server hostname and SSH credentials. VM Migrator validates the connection and detects Hyper-V role and Windows version." },
        { number: "2", title: "Discover Hyper-V VMs", description: "All VMs discovered via PowerShell: disk formats and sizes via Get-VHD, network adapters, generation (1/2), power state. Shared VHDX flagged as ineligible." },
        { number: "3", title: "Select and Configure", description: "Choose VMs, map Hyper-V virtual switches to Neutron networks, select target flavor. Preflight validates disk formats and target resources." },
        { number: "4", title: "Automated Migration", description: "Checkpoint created on running VM. Parent VHDX exported, converted to QCOW2 with VirtIO drivers injected for Windows. Uploaded to Glance or streamed via Cloud Agent. Nova instance provisioned." },
        { number: "5", title: "Validate and Cutover", description: "Windows/Linux VM confirmed running on OpenStack/VHI with VirtIO drivers active. Network connectivity verified. Update DNS and decommission source when satisfied." },
      ]}
    />
  );
}
