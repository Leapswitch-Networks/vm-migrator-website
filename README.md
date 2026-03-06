# VM Migrator — Product Website

Marketing website for VM Migrator — automated VM migration to OpenStack & VHI.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
```

Static export to `out/` directory (configured via `next.config.ts` with `output: "export"`).

## Stack

- Next.js 15 (React 19)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React icons

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/features` | Features |
| `/how-it-works` | How It Works |
| `/migrations/vmware-to-openstack` | VMware to OpenStack/VHI |
| `/migrations/hyperv-to-openstack` | Hyper-V to OpenStack/VHI |
| `/migrations/proxmox-to-openstack` | Proxmox to OpenStack/VHI |
| `/migrations/kvm-to-openstack` | KVM to OpenStack/VHI |
| `/migrations/proxmox-to-proxmox` | Proxmox to Proxmox |
| `/contact` | Contact Us |
| `/about` | About |
