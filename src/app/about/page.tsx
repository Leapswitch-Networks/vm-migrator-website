import type { Metadata } from "next";
import { Server, Shield, Zap, CloudUpload, Monitor, Lock } from "lucide-react";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "VM Migrator is built by Leapswitch Networks — an infrastructure and cloud services company. Purpose-built for migrating VMs to OpenStack and VHI.",
  openGraph: {
    title: "About | VM Migrator",
    description: "Built by Leapswitch Networks. Purpose-built for migrating VMs to OpenStack and VHI.",
  },
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Zap,
    title: "Automation Over Manual Work",
    description:
      "Every step that can be automated, is automated. From VM discovery to disk conversion to network mapping — the goal is to eliminate manual, error-prone steps from the migration process.",
  },
  {
    icon: Shield,
    title: "Honesty Over Hype",
    description:
      "We don't claim features we don't have. VM Migrator does snapshot-based migration and continuous replication to OpenStack, VHI, and Proxmox. That's what we do, and we do it well.",
  },
  {
    icon: Lock,
    title: "Self-Hosted & Secure",
    description:
      "Deploy on your own infrastructure. Your data never leaves your network. Agentless architecture means nothing is installed on your VMs. Full REST API for automation.",
  },
  {
    icon: Server,
    title: "Production-Tested",
    description:
      "Every feature in VM Migrator comes from real-world experience migrating production workloads. The 8-phase pipeline, Cloud Agents, volume streaming — all built to solve actual problems.",
  },
];

const deploymentFeatures = [
  {
    icon: Server,
    title: "Self-Hosted",
    description: "Runs entirely on your infrastructure. Single Docker Compose command to deploy. No cloud dependency, no SaaS subscription, no data leaving your network.",
  },
  {
    icon: CloudUpload,
    title: "Scalable Workers",
    description: "Add more migration workers to handle more concurrent migrations. Each worker processes one migration at a time for safety, but you can run as many workers as you need.",
  },
  {
    icon: Monitor,
    title: "Web Dashboard + REST API",
    description: "Manage everything through the web dashboard, or automate with the full REST API. Swagger and ReDoc documentation built in.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Role-based access control with Admin, Operator, and Viewer roles. JWT authentication. Encrypted data transfer over HTTPS and SSH. Agentless — nothing installed on guest VMs.",
  },
];

export default function AboutPage() {
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
              About
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Built by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">Leapswitch Networks</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              VM Migrator is built by Leapswitch Networks, an infrastructure and cloud services company. We built this tool because we needed it — and because migrating VMs shouldn&apos;t require weeks of manual work.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-purple-light py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Why We Built VM Migrator
          </h2>
          <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
            <p>
              Migrating virtual machines between hypervisors is one of those tasks that sounds simple but quickly becomes a nightmare of manual steps: export disks, convert formats, upload images, create instances, configure networking, inject drivers, validate — for every single VM.
            </p>
            <p>
              We went through this pain ourselves. Migrating customer workloads from VMware to OpenStack, moving Proxmox VMs to new clusters, consolidating Hyper-V hosts. Every time, it was the same tedious, error-prone manual process.
            </p>
            <p>
              VM Migrator automates the entire workflow. Connect your source hypervisor, discover VMs, hit migrate. The 8-phase pipeline handles disk export, format conversion, VirtIO driver injection, image upload, VM provisioning, and network configuration. For production-critical workloads, continuous replication syncs incrementally until you&apos;re ready for a near-zero-downtime cutover.
            </p>
            <p>
              We built it for ourselves first. Now we&apos;re making it available to anyone who needs to migrate VMs to OpenStack, VHI, or between Proxmox clusters.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              How We Build
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="feature-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="section-purple-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Deployment & Architecture
            </h2>
            <p className="mt-4 text-text-secondary">
              Deploy on your infrastructure with a single command. Scale as you grow.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {deploymentFeatures.map((feature) => (
              <div key={feature.title} className="feature-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Ecosystem */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            OpenStack Ecosystem
          </h2>
          <p className="mt-4 text-center text-text-secondary">
            VM Migrator is purpose-built for the OpenStack ecosystem. It integrates with the core services that every OpenStack deployment provides.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { service: "Glance", purpose: "Image upload and management" },
              { service: "Nova", purpose: "VM instance creation and management" },
              { service: "Neutron", purpose: "Network port and subnet mapping" },
              { service: "Cinder", purpose: "Block storage volumes for multi-disk and replication" },
              { service: "Keystone", purpose: "Authentication and project scoping" },
            ].map((item) => (
              <div key={item.service} className="feature-card p-4">
                <span className="text-sm font-semibold text-accent">{item.service}</span>
                <p className="mt-1 text-sm text-text-muted">{item.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Learn More?"
        description="Get in touch to discuss your migration needs or schedule a demo."
      />
    </>
  );
}
