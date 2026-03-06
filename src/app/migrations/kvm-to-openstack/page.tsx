import type { Metadata } from "next";
import MigrationPathPage from "@/components/MigrationPathPage";

export const metadata: Metadata = {
  title: "KVM to OpenStack / VHI Migration",
  description:
    "Migrate KVM/libvirt VMs to OpenStack or VHI. SSH + virsh integration, ZFS/LVM snapshots, NBD streaming. QCOW2 disks may skip conversion entirely.",
  keywords: [
    "KVM to OpenStack",
    "KVM to VHI",
    "libvirt migration",
    "KVM cloud migration",
    "virsh migration",
  ],
};

export default function KVMToOpenStackPage() {
  return (
    <MigrationPathPage
      badge="KVM to OpenStack / VHI"
      title="Migrate from KVM/libvirt to OpenStack & VHI"
      subtitle="Formalize your KVM infrastructure. SSH + virsh integration, ZFS/LVM snapshots, NBD streaming. QCOW2 disks may need zero conversion — same hypervisor under the hood."
      whyMigrateTitle="Why Migrate from KVM to OpenStack/VHI?"
      whyMigrateReasons={[
        "Move from ad-hoc KVM/libvirt management to a proper cloud platform with self-service, REST API, and multi-tenant isolation.",
        "OpenStack runs on KVM — your VMs are already using the right hypervisor. Migration is mostly about wrapping them in cloud infrastructure.",
        "Gain features that standalone KVM lacks: self-service portal, project quotas, SDN networking (Neutron), block storage (Cinder), image service (Glance).",
        "QCOW2 disks from KVM may not need any format conversion at all — fastest possible migration path.",
        "VHI provides a managed platform with enterprise support while keeping KVM/QEMU as the hypervisor.",
      ]}
      howItWorks={{
        title: "How KVM Migration Works",
        points: [
          "Connection: VM Migrator connects to your KVM host via SSH. All operations use virsh commands and direct disk access.",
          "Discovery: 'virsh list --all' enumerates all domains. 'virsh dumpxml' retrieves the full domain XML, which is parsed for CPU, memory, all disks (with paths, bus types, formats), NICs, BIOS/UEFI firmware.",
          "Disk Size Detection: Disk sizes are resolved via 'blockdev --getsize64' (for block devices), 'qemu-img info' (for image files), or 'stat' (fallback). Host distro and nbdcopy availability are also detected for optimization decisions.",
          "Snapshot: ZFS or LVM snapshots capture the disk state while the VM continues running. For file-based disks, direct copy or NBD streaming is used.",
          "Export: Disk data is transferred via NBD (Network Block Device) streaming for efficiency, or direct file copy over SSH for simpler setups.",
          "Conversion: QCOW2 sources may skip conversion entirely — just upload to Glance. RAW disks are converted to QCOW2. Windows VMs get VirtIO drivers via virt-v2v.",
          "Volume Streaming: Cloud Agents can NBD-pull from the KVM host, streaming disk data directly to a Cinder volume.",
          "Provisioning: Nova instance created with hardware properties mapped from the libvirt domain XML — firmware type, disk bus, video model, CPU model.",
        ],
      }}
      supported={[
        "KVM/libvirt hosts via SSH + virsh",
        "ZFS-backed disks (/dev/zvol/*)",
        "LVM-backed disks (/dev/vg*)",
        "File-based QCOW2 and RAW disks",
        "NBD (Network Block Device) streaming",
        "Domain XML parsing for full VM metadata",
        "BIOS and UEFI firmware detection (loader path)",
        "Multi-disk VMs with mixed storage backends",
        "Multi-NIC with bridge-to-Neutron mapping",
        "Linux and Windows guests (VirtIO injection for Windows)",
      ]}
      steps={[
        { number: "1", title: "Connect to KVM Host", description: "Provide SSH credentials for the KVM host. VM Migrator validates the connection, detects the host distro, and checks for nbdcopy availability." },
        { number: "2", title: "Discover KVM Domains", description: "All libvirt domains enumerated via virsh. Domain XML parsed for complete VM config: disks (ZFS, LVM, file), NICs, firmware. Disk sizes resolved automatically." },
        { number: "3", title: "Select and Configure", description: "Choose VMs, map KVM bridge networks to Neutron networks. QCOW2 disks auto-detected — may skip conversion step. Preflight validates disk access and target resources." },
        { number: "4", title: "Automated Migration", description: "ZFS/LVM snapshot taken (or file copy initiated). Disk streamed via NBD or converted to QCOW2. Uploaded to Glance or streamed to Cinder volume. Nova instance created with matching specs." },
        { number: "5", title: "Validate and Cutover", description: "VM running on OpenStack/VHI — same KVM hypervisor underneath. Verify networking, check applications. Decommission source KVM domain when ready." },
      ]}
    />
  );
}
