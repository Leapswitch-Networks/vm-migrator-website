"use client";

import { useState } from "react";
import { Mail, Calendar, FileText, ChevronDown, ChevronUp } from "lucide-react";

const migrationTypes = [
  "VMware ESXi",
  "Microsoft Hyper-V",
  "Proxmox VE",
  "KVM / libvirt",
  "Multiple Sources",
  "Other",
];

const targetTypes = [
  "OpenStack",
  "VHI (Virtuozzo Hybrid Infrastructure)",
  "Proxmox VE",
  "Other",
];

const vmCounts = ["1 - 10", "11 - 50", "51 - 200", "200+"];

const timelines = ["Immediate", "1 - 3 months", "3 - 6 months", "Just evaluating"];

const faqs = [
  {
    question: "Do VMs need to be shut down for migration?",
    answer:
      "No. VM Migrator uses snapshot-based export on all hypervisors. VMware uses quiesced snapshots via VMware Tools, Hyper-V uses checkpoints to freeze the parent disk, Proxmox and KVM use ZFS/LVM snapshots. Your VMs keep running throughout the migration process.",
  },
  {
    question: "How long does a typical migration take?",
    answer:
      "It depends on disk size and network speed. A 100GB VM over a 1Gbps link takes roughly 15-20 minutes for the data transfer phase. The full pipeline (including discovery, conversion, provisioning) adds a few minutes on each end. With continuous replication, the final cutover takes only seconds to minutes since most data is already synced.",
  },
  {
    question: "Do I need to install agents on my VMs?",
    answer:
      "No. VM Migrator is fully agentless. It connects to hypervisor management APIs — vSphere API for VMware, PowerShell over SSH for Hyper-V, REST API for Proxmox, and virsh over SSH for KVM. Nothing is ever installed on your guest VMs.",
  },
  {
    question: "What about Windows VMs?",
    answer:
      "Fully supported. When migrating Windows VMs, VM Migrator uses virt-v2v to automatically inject VirtIO drivers (disk, network, balloon, serial) during the conversion step. The Windows VM boots on OpenStack/VHI with VirtIO drivers already installed — no manual driver installation needed.",
  },
  {
    question: "Can I migrate multiple VMs at once?",
    answer:
      "Yes. You can queue multiple migrations and each one is tracked independently in the dashboard. Celery workers process migrations concurrently (one per worker, horizontally scalable). Real-time progress is shown for every active migration.",
  },
  {
    question: "What if a migration fails mid-way?",
    answer:
      "Migrations are resumable. Each of the 8 phases tracks its completion status independently. If the upload phase fails (for example, due to a network interruption), retrying resumes from the upload phase — it doesn't re-export or re-convert the disk. The upload itself supports byte-offset resume for large files.",
  },
  {
    question: "Do I need lots of local disk space?",
    answer:
      "Not with volume streaming. Cloud Agents stream disk data from the source hypervisor directly to Cinder volumes on the target cloud. No intermediate copy is stored on the migration server. This means you can migrate a 2TB VM without needing 2TB of free disk on the server running VM Migrator.",
  },
  {
    question: "What's the difference between one-time migration and continuous replication?",
    answer:
      "One-time migration does a single pass: snapshot, export, convert, upload, provision. It's the simplest approach, best for scheduled maintenance windows. Continuous replication does an initial full sync followed by periodic incremental syncs (changed blocks only). When you're ready, trigger a cutover — one final delta sync and the VM boots on the target. Cutover downtime is typically seconds to minutes.",
  },
  {
    question: "What OpenStack services does VM Migrator need?",
    answer:
      "Glance (image service) for uploading disk images, Nova (compute) for creating VM instances, and Neutron (networking) for port/network configuration. Cinder (block storage) is used for continuous replication (boot from volume) and multi-disk migrations. Keystone (identity) for authentication.",
  },
  {
    question: "What is VHI and why does it work with VM Migrator?",
    answer:
      "VHI (Virtuozzo Hybrid Infrastructure) is an enterprise cloud platform built on OpenStack. It exposes standard OpenStack APIs — Glance, Nova, Neutron, Cinder. VM Migrator connects to VHI using the exact same OpenStack integration, no special configuration needed. If it works with OpenStack, it works with VHI.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Contact Us
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Let&apos;s Plan Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">Migration</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Tell us about your environment and we&apos;ll help you plan the right migration strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="feature-card p-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                    <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-text-primary">Thank You!</h2>
                  <p className="mt-3 text-text-secondary">
                    We&apos;ve received your message and will get back to you within 1 business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="feature-card p-8">
                  <h2 className="text-xl font-semibold text-text-primary">Get in Touch</h2>
                  <p className="mt-1 text-sm text-text-muted">All fields marked with * are required.</p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="you@company.com"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-text-secondary">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Company name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-secondary">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    {/* Source Platform */}
                    <div>
                      <label htmlFor="source" className="block text-sm font-medium text-text-secondary">
                        Source Platform
                      </label>
                      <select
                        id="source"
                        name="source"
                        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select source...</option>
                        {migrationTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Target Platform */}
                    <div>
                      <label htmlFor="target" className="block text-sm font-medium text-text-secondary">
                        Target Platform
                      </label>
                      <select
                        id="target"
                        name="target"
                        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select target...</option>
                        {targetTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* VM Count */}
                    <div>
                      <label htmlFor="vmcount" className="block text-sm font-medium text-text-secondary">
                        Number of VMs
                      </label>
                      <select
                        id="vmcount"
                        name="vmcount"
                        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select range...</option>
                        {vmCounts.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-text-secondary">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select timeline...</option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary">
                      Tell us about your migration needs
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Describe your current environment, number of VMs, any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
                  >
                    Get in Touch
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="feature-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-text-primary">Email Us</h3>
                <p className="mt-1 text-sm text-text-muted">For sales inquiries and migration planning.</p>
                <a href="mailto:sales@leapswitch.com" className="mt-3 block text-sm font-medium text-primary hover:underline">
                  sales@leapswitch.com
                </a>
              </div>

              <div className="feature-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-4 font-semibold text-text-primary">Schedule a Demo</h3>
                <p className="mt-1 text-sm text-text-muted">See VM Migrator in action with a live walkthrough.</p>
                <p className="mt-3 text-sm text-text-secondary">
                  Fill out the form and we&apos;ll schedule a demo at your convenience.
                </p>
              </div>

              <div className="feature-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20">
                  <FileText className="h-5 w-5 text-success" />
                </div>
                <h3 className="mt-4 font-semibold text-text-primary">Documentation</h3>
                <p className="mt-1 text-sm text-text-muted">API reference and migration guides.</p>
                <p className="mt-3 text-sm text-text-secondary">
                  Access our Swagger/ReDoc API docs for technical details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-purple-light py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-text-secondary">
              Common questions about VM Migrator and the migration process.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="feature-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="pr-4 text-sm font-medium text-text-primary">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-text-muted" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-text-muted" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="border-t border-border px-5 py-4">
                    <p className="text-sm leading-relaxed text-text-muted">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
