import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
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
  ],
  openGraph: {
    title: "VM Migrator — Automated VM Migration to OpenStack & VHI",
    description: "Migrate running VMs with snapshot-based, zero-downtime, agentless migration.",
    type: "website",
    siteName: "VM Migrator",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
