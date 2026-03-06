import type { Metadata } from "next";
import MigrationPathPage from "@/components/MigrationPathPage";

export const metadata: Metadata = {
  title: "VMware to OpenStack / VHI Migration",
  description:
    "Migrate VMware ESXi and vCenter VMs to OpenStack or VHI. Quiesced snapshots, VMDK-to-QCOW2 conversion, VirtIO driver injection. No agents, no shutdown.",
  keywords: [
    "VMware to OpenStack",
    "VMware to VHI",
    "VMware exit strategy",
    "Broadcom VMware alternative",
    "ESXi to OpenStack migration",
    "VMDK to QCOW2",
  ],
  openGraph: {
    title: "VMware to OpenStack / VHI Migration | VM Migrator",
    description: "Migrate VMware ESXi and vCenter VMs to OpenStack or VHI. Quiesced snapshots, VMDK-to-QCOW2 conversion, VirtIO driver injection.",
  },
  alternates: { canonical: "/migrations/vmware-to-openstack" },
};

export default function VMwareToOpenStackPage() {
  return (
    <MigrationPathPage
      badge="VMware to OpenStack / VHI"
      title="Migrate from VMware to OpenStack & VHI"
      subtitle="Escape Broadcom licensing. Migrate running VMware VMs with quiesced snapshots, automatic VMDK-to-QCOW2 conversion, and VirtIO driver injection. No agents on your VMs, no ESXi shell access needed."
      whyMigrateTitle="Why Migrate from VMware?"
      whyMigrateReasons={[
        "Broadcom's acquisition of VMware has driven licensing costs up dramatically — 300% to 1000%+ increases reported by customers worldwide.",
        "Perpetual licenses are being eliminated in favor of expensive subscription bundles that force you to pay for features you don't use.",
        "OpenStack and VHI provide equivalent enterprise compute, storage, and networking on an open-source KVM/QEMU foundation — no vendor lock-in.",
        "VHI (Virtuozzo Hybrid Infrastructure) is built on OpenStack and provides a familiar management experience with enterprise support.",
        "KVM is the same hypervisor used by AWS, Google Cloud, and Oracle Cloud — production-proven at massive scale.",
      ]}
      targetEducation={{
        title: "What is VHI?",
        description:
          "Virtuozzo Hybrid Infrastructure (VHI) is an enterprise cloud platform built on OpenStack. It combines compute, storage, and networking into a single, easy-to-manage platform.",
        points: [
          "Built on OpenStack — all standard OpenStack APIs work natively, including Glance, Nova, Neutron, and Cinder.",
          "VM Migrator connects to VHI using the same OpenStack integration it uses for any OpenStack cloud. No special configuration needed.",
          "Provides enterprise features like high availability, distributed storage, and multi-tenancy out of the box.",
          "Strong VMware alternative with commercial support from Virtuozzo.",
        ],
      }}
      howItWorks={{
        title: "How VMware Migration Works",
        points: [
          "Connection: VM Migrator connects to your vCenter or ESXi host via the vSphere API (pyvmomi). This is a pure API integration — no SSH access to ESXi is needed.",
          "Snapshot: A quiesced snapshot is created via VMware Tools for application-consistent state. If VMware Tools isn't available, a crash-consistent snapshot is used as fallback.",
          "Export: VMDK disk data is downloaded over HTTPS using the existing vSphere session cookie. Thin-provisioned disks are handled efficiently.",
          "Conversion: VMDK is converted to QCOW2 via qemu-img. For Windows VMs, virt-v2v is used instead — it handles the format conversion AND injects VirtIO drivers automatically.",
          "Volume Streaming (alternative): Cloud Agents can stream VMware disks directly to Cinder volumes using the nbdkit-vddk plugin with VDDK, bypassing local disk entirely.",
          "Provisioning: A Nova instance is created from the Glance image (or Cinder volume) with hardware properties preserved — firmware type (BIOS/UEFI), disk bus, SCSI model, and video model.",
          "Networking: Source vSwitch/distributed port group networks are mapped to Neutron networks. Ports are created with optional MAC address preservation.",
        ],
      }}
      supported={[
        "VMware vSphere / ESXi (API-based connection)",
        "All VMDK disk types (thin, thick, eager zeroed)",
        "Windows and Linux guest operating systems",
        "BIOS and UEFI firmware (auto-detected, preserved)",
        "Multi-disk VMs (boot disk + data disks)",
        "Multi-NIC with MAC address preservation",
        "VirtIO driver injection for Windows (via virt-v2v)",
        "One-time migration or continuous replication",
        "Volume streaming via VDDK (no local disk needed)",
        "Quiesced snapshots (VMware Tools) or crash-consistent fallback",
      ]}
      steps={[
        { number: "1", title: "Connect to vCenter / ESXi", description: "Provide vSphere API endpoint and credentials. Connection is validated immediately. All VMs on the host or cluster are discovered automatically." },
        { number: "2", title: "Discover VMware VMs", description: "All VMs are enumerated with full metadata: VMDK disks, vNICs, OS type, firmware, power state. Migration eligibility is assessed (templates flagged, passthrough devices noted)." },
        { number: "3", title: "Select and Configure", description: "Choose VMs to migrate, map VMware networks to OpenStack/VHI Neutron networks, select target flavor. Preflight checks run before you commit." },
        { number: "4", title: "Automated Migration", description: "Quiesced snapshot created on running VM. VMDK exported via HTTPS, converted to QCOW2 (with VirtIO injection for Windows), uploaded to Glance or streamed to Cinder. Nova instance provisioned." },
        { number: "5", title: "Validate and Cutover", description: "VM verified running on OpenStack/VHI. IP address detected, networking confirmed. Review logs, test the VM, update DNS, decommission source when ready." },
      ]}
    />
  );
}
