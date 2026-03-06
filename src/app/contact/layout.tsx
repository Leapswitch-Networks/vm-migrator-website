import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the VM Migrator team. Book a demo, request pricing, or ask about migrating VMware, Hyper-V, Proxmox, and KVM to OpenStack and VHI.",
  openGraph: {
    title: "Contact Us | VM Migrator",
    description: "Book a demo or request pricing for VM Migrator.",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
