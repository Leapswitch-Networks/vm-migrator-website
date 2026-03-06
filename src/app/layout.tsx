import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const BASE_URL = "https://vm-migrator.apps.in-west3.cloudpe.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VM Migrator — Automated VM Migration to OpenStack & VHI",
    template: "%s | VM Migrator",
  },
  description:
    "Migrate running VMs from VMware, Hyper-V, Proxmox, and KVM to OpenStack and VHI. Snapshot-based, zero-downtime, agentless migration with continuous replication and real-time dashboard.",
  keywords: [
    "VM migration",
    "OpenStack migration",
    "VHI migration",
    "VMware to OpenStack",
    "Hyper-V to OpenStack",
    "Proxmox migration",
    "KVM migration",
    "cloud migration",
    "agentless migration",
    "zero downtime migration",
    "Broadcom VMware alternative",
    "Virtuozzo Hybrid Infrastructure",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "VM Migrator — Automated VM Migration to OpenStack & VHI",
    description:
      "Migrate running VMs with snapshot-based, zero-downtime, agentless migration. Supports VMware, Hyper-V, Proxmox, and KVM to OpenStack and VHI.",
    type: "website",
    siteName: "VM Migrator",
    url: BASE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VM Migrator — Automated VM Migration to OpenStack & VHI",
    description:
      "Migrate running VMs with snapshot-based, zero-downtime, agentless migration.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Leapswitch Networks",
    url: "https://www.leapswitch.com",
    logo: `${BASE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "sales@leapswitch.com",
      contactType: "sales",
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VM Migrator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Linux",
    description:
      "Automated VM migration platform. Migrate running VMs from VMware, Hyper-V, Proxmox, and KVM to OpenStack and VHI with snapshot-based, zero-downtime, agentless migration.",
    url: BASE_URL,
    author: {
      "@type": "Organization",
      name: "Leapswitch Networks",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
      description: "Contact for pricing",
    },
    featureList: [
      "Snapshot-based zero-downtime migration",
      "Continuous replication with incremental sync",
      "Volume streaming via Cloud Agents",
      "Multi-disk and multi-NIC support",
      "Automatic VirtIO driver injection for Windows",
      "Real-time WebSocket dashboard",
      "8-phase automated migration pipeline",
      "Role-based access control",
      "REST API with Swagger documentation",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do VMs need to be shut down for migration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. VM Migrator uses snapshot-based export on all hypervisors. VMware uses quiesced snapshots, Hyper-V uses checkpoints, Proxmox and KVM use ZFS/LVM snapshots. Your VMs keep running.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install agents on my VMs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. VM Migrator is fully agentless. It connects to hypervisor management APIs — vSphere API for VMware, PowerShell over SSH for Hyper-V, REST API for Proxmox, and virsh over SSH for KVM.",
        },
      },
      {
        "@type": "Question",
        name: "What source hypervisors are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VMware ESXi/vCenter, Microsoft Hyper-V, Proxmox VE, and KVM/libvirt.",
        },
      },
      {
        "@type": "Question",
        name: "What target platforms are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "OpenStack (Glance, Nova, Neutron, Cinder), Virtuozzo Hybrid Infrastructure (VHI) via OpenStack APIs, and Proxmox VE (native qm remote-migrate).",
        },
      },
      {
        "@type": "Question",
        name: "What about Windows VMs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fully supported. VirtIO drivers are automatically injected via virt-v2v during conversion. No manual driver installation needed.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
