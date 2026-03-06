import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "VMware to OpenStack", href: "/migrations/vmware-to-openstack" },
    { name: "Hyper-V to OpenStack", href: "/migrations/hyperv-to-openstack" },
    { name: "Proxmox to OpenStack", href: "/migrations/proxmox-to-openstack" },
    { name: "KVM to OpenStack", href: "/migrations/kvm-to-openstack" },
    { name: "Proxmox to Proxmox", href: "/migrations/proxmox-to-proxmox" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Resources: [
    { name: "API Documentation", href: "#" },
    { name: "Migration Guide", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                  <polyline points="7.5 19.79 7.5 14.6 3 12" />
                  <polyline points="21 12 16.5 14.6 16.5 19.79" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <span className="text-lg font-bold text-text-primary">VM Migrator</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Automated VM migration to OpenStack and VHI. Snapshot-based, zero-downtime, agentless.
            </p>
            <p className="mt-6 text-sm text-text-muted">
              Built by{" "}
              <a href="https://www.leapswitch.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                Leapswitch Networks
              </a>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-text-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Leapswitch Networks. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-text-muted transition-colors hover:text-text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-text-muted transition-colors hover:text-text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
