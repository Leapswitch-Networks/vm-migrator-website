"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const migrationPaths = [
  { name: "VMware to OpenStack / VHI", href: "/migrations/vmware-to-openstack" },
  { name: "Hyper-V to OpenStack / VHI", href: "/migrations/hyperv-to-openstack" },
  { name: "Proxmox to OpenStack / VHI", href: "/migrations/proxmox-to-openstack" },
  { name: "KVM to OpenStack / VHI", href: "/migrations/kvm-to-openstack" },
  { name: "Proxmox to Proxmox", href: "/migrations/proxmox-to-proxmox" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            <Link href="/features" className="rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-white/5">
              Features
            </Link>
            <Link href="/how-it-works" className="rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-white/5">
              How It Works
            </Link>

            {/* Migration Paths Dropdown */}
            <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-white/5">
                Migration Paths
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 top-full pt-1">
                  <div className="w-64 rounded-xl border border-border bg-surface p-2 shadow-2xl">
                    {migrationPaths.map((path) => (
                      <Link
                        key={path.href}
                        href={path.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                      >
                        {path.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-white/5">
              About
            </Link>
            <Link href="/contact" className="rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-white/5">
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-text-secondary" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link href="/features" className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-white/5 hover:text-text-primary" onClick={() => setMobileOpen(false)}>
              Features
            </Link>
            <Link href="/how-it-works" className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-white/5 hover:text-text-primary" onClick={() => setMobileOpen(false)}>
              How It Works
            </Link>
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Migration Paths</div>
            {migrationPaths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="block rounded-lg px-3 py-2.5 pl-6 text-sm text-text-secondary hover:bg-white/5 hover:text-text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {path.name}
              </Link>
            ))}
            <Link href="/about" className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-white/5 hover:text-text-primary" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-white/5 hover:text-text-primary" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/contact"
                className="block rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-center text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
