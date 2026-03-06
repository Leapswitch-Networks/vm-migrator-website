import type { Metadata } from "next";
import MigrationPathPage from "@/components/MigrationPathPage";

export const metadata: Metadata = {
  title: "Proxmox to OpenStack / VHI Migration",
  description:
    "Migrate Proxmox VE VMs to OpenStack or VHI. REST API integration, snapshot-based export, support for ZFS/LVM/local storage.",
  keywords: [
    "Proxmox to OpenStack",
    "Proxmox to VHI",
    "Proxmox migration",
    "Proxmox VE cloud migration",
  ],
};

export default function ProxmoxToOpenStackPage() {
  return (
    <MigrationPathPage
      badge="Proxmox to OpenStack / VHI"
      title="Migrate from Proxmox to OpenStack & VHI"
      subtitle="Scale beyond Proxmox clusters. REST API-driven discovery, snapshot-based export of running VMs, support for ZFS, LVM, and file-based storage."
      whyMigrateTitle="Why Migrate from Proxmox to OpenStack/VHI?"
      whyMigrateReasons={[
        "Grow from Proxmox cluster management to a full enterprise cloud platform with self-service, multi-tenancy, and API-driven automation.",
        "OpenStack provides a standardized API (Nova, Neutron, Cinder, Glance) that integrates with CI/CD, Terraform, Ansible, and other DevOps tooling.",
        "VHI offers Proxmox-like simplicity with OpenStack scale — familiar concepts, enterprise support.",
        "Centralize workloads from multiple Proxmox clusters into a single, unified platform.",
        "Gain features like project-based resource quotas, Neutron SDN, Cinder block storage, and Heat orchestration that Proxmox doesn't provide natively.",
      ]}
      targetEducation={{
        title: "What is VHI?",
        description:
          "Virtuozzo Hybrid Infrastructure (VHI) is built on OpenStack and provides a simpler management layer on top. If you're familiar with Proxmox's ease of use, VHI will feel approachable while giving you OpenStack-scale capabilities.",
        points: [
          "Standard OpenStack APIs — everything that works with OpenStack works with VHI.",
          "Integrated compute, storage, and networking in a single platform.",
          "Easy web-based management panel similar in spirit to Proxmox's web UI.",
          "Commercial enterprise support from Virtuozzo.",
        ],
      }}
      howItWorks={{
        title: "How Proxmox to OpenStack Migration Works",
        points: [
          "Connection: VM Migrator connects to your Proxmox cluster via the REST API (with token auth) plus SSH for disk-level operations.",
          "Discovery: All QEMU VMs across all cluster nodes are enumerated. VM config is parsed for CPU, memory, disks, networks, BIOS type, boot order, and storage backend.",
          "Snapshot: Proxmox snapshot mode creates a point-in-time snapshot of the running VM. Safe for all storage types.",
          "Export: Disk data is exported via vzdump full backup or direct snapshot-based disk copy. Storage-specific handling for ZFS, LVM, and file-based backends.",
          "Conversion: If the source disk is QCOW2 on file-based storage, minimal or no conversion is needed. Other formats are converted to QCOW2 via qemu-img.",
          "Volume Streaming: Cloud Agents can NBD-pull disk data directly from the Proxmox host, streaming to a Cinder volume with no local copy.",
          "Provisioning: Nova instance created with matched specs. Neutron networks mapped from Proxmox bridge names. Firmware type preserved.",
        ],
      }}
      supported={[
        "Proxmox VE clusters (REST API + SSH)",
        "All storage backends: ZFS, LVM, local directory, QCOW2",
        "Snapshot-based export (safe for running VMs)",
        "vzdump full backup support",
        "BIOS and UEFI firmware detection",
        "Boot disk auto-detection from Proxmox config",
        "Multi-disk VMs (each disk handled independently)",
        "Multi-NIC with bridge-to-Neutron mapping",
        "Linux and Windows guest operating systems",
        "One-time migration or continuous replication",
      ]}
      steps={[
        { number: "1", title: "Connect to Proxmox Cluster", description: "Provide Proxmox API URL and token credentials, plus SSH access for disk operations. Connection validated against all cluster nodes." },
        { number: "2", title: "Discover Proxmox VMs", description: "All QEMU VMs discovered across all nodes. Full config parsed: storage backend, disk paths, network bridges, BIOS type. Templates flagged as ineligible." },
        { number: "3", title: "Select and Configure", description: "Choose VMs, map Proxmox bridges to Neutron networks. Select target flavor or let VM Migrator auto-match. Preflight validates storage and network compatibility." },
        { number: "4", title: "Automated Migration", description: "Snapshot created on running VM. Disk exported (vzdump or direct copy), converted to QCOW2 if needed, uploaded to Glance or streamed to Cinder. Nova instance provisioned with correct specs." },
        { number: "5", title: "Validate and Cutover", description: "VM confirmed running on OpenStack/VHI. Networking verified, logs reviewed. Decommission the Proxmox VM when you're satisfied with the target." },
      ]}
    />
  );
}
