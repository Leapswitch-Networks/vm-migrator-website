# VM Migrator — Product Website Plan (Final)

## Competitive Research Summary

### Coriolis (Cloudbase Solutions)
- "Cloud Migration as a Service (CMaaS)" + DRaaS
- Agentless, Secure, Scalable, Zero-downtime replication, REST API, Scheduler
- 9 sources → 13 targets as logo grid
- Validated OpenStack distribution logos (Canonical, Red Hat, Virtuozzo)
- Prominent contact form, technical docs, step-by-step guides

### Hystax Acura
- "Fully automated, any-to-any cloud migration software"
- Dedicated SEO landing page per migration target
- Migration path page template: Hero → "What is [Platform]?" → 3 scenarios → 6 benefits → 5-step process → testimonials → CTAs
- Enterprise logos + case studies with metrics ("4,500+ VMs migrated")
- Partner-focused: white-labeling, MSP dashboard

### Patterns to Adopt
1. Dedicated pages per migration path (SEO + targeted messaging)
2. Step-by-step process visualization
3. Platform logos grid
4. Multiple CTAs throughout every page
5. Comparison table (manual vs automated)
6. Contact form accessible from every page

---

## Our REAL Capabilities (From Code Review)

### Migration Engine
- **8-phase pipeline**: Preflight → Discovery → Disk Export → Disk Convert → Image Upload → Network Setup → VM Create → Validation/Cleanup
- **Snapshot-based export** — ALL source types snapshot running VMs, NO shutdown required:
  - VMware: Quiesced snapshots via VMware Tools (crash-consistent fallback)
  - Hyper-V: Checkpoint strategy — freeze parent VHDX, export differencing disk
  - Proxmox: Snapshot mode + vzdump backup
  - KVM: ZFS/LVM snapshots, NBD streaming
- **Disk conversion**: qemu-img (format) + virt-v2v (Windows VirtIO driver injection)
- **Formats**: VMDK, VHD, VHDX, QCOW2, RAW → always outputs QCOW2 for OpenStack
- **Multi-disk**: Each disk migrated independently to separate Cinder volumes
- **Resumable**: Phase-based completion tracking, retry from point of failure
- **Checksums**: SHA256 validation for data integrity

### Continuous Replication
- **Incremental sync**: Snapshot-based changed block sync (not just one-time lift-and-shift)
- **Configurable schedule**: Default every 15 minutes
- **Replication modes**: SNAPSHOT (ZFS/LVM incremental), CBT (Changed Block Tracking), CONTINUOUS, FULL
- **Cutover support**: Final sync after source quiesce, then boot from volume
- **Boot from Cinder volume**: Instance boots directly from replicated volume (no Glance upload needed)

### Cloud Agents (Volume Streaming)
- **Cloud Agents**: OpenStack Nova instances on target side that act as streaming workers
- **Volume streaming**: Source disk data streams directly to Cinder volumes via Cloud Agent
  - Proxmox/KVM: Agent SSH-pulls via NBD
  - Hyper-V: qemu-nbd writable, source pushes
  - VMware: nbdkit-vddk plugin + nbdcopy via VDDK
- **No local disk needed**: Works for VMs larger than available migration server disk
- **Concurrent**: Atomic agent selection with slot reservation, multiple migrations per agent

### Source Hypervisors
- **VMware ESXi/vCenter**: vSphere API (pyvmomi), VMDK download via HTTPS, quiesced snapshots, no SSH needed
- **Hyper-V**: SSH + PowerShell, checkpoint-based export, VHDX/VHD support
- **Proxmox VE**: REST API + SSH, vzdump backup, qm remote-migrate (online/offline)
- **KVM/libvirt**: SSH + virsh, domain XML parsing, ZFS/LVM/file-based disks, NBD streaming

### Target Platforms
- **OpenStack**: Glance (images), Nova (compute), Neutron (networking), Cinder (volumes)
  - Chunked upload with resume
  - Flavor matching based on source specs
  - Hardware properties: firmware (BIOS/UEFI), disk bus, SCSI model, video model
  - Multi-NIC with MAC preservation option
  - Security group assignment
- **VHI (Virtuozzo Hybrid Infrastructure)**: Compatible via OpenStack APIs
- **Proxmox VE**: Native qm remote-migrate (online with live memory, offline)

### Discovery
- **Auto-discovery** per hypervisor via API
- Captures: name, OS type/version, vCPUs, RAM, disk sizes/formats, NICs, BIOS type, boot order
- **Migration eligibility detection**: Flags templates, PCI passthrough, shared VHDX as ineligible
- Periodic re-sync via Celery scheduled tasks

### Platform Features
- **Web Dashboard**: React UI — sources, targets, VMs, migrations, Cloud Agents
- **Real-time Progress**: WebSocket — phase status, transfer speed, ETA
- **RBAC**: Admin, Operator, Viewer roles with JWT auth
- **REST API**: Full API documented via Swagger/ReDoc
- **Preflight Checks**: Validates connectivity, compatibility, network mappings before migration
- **BIOS/UEFI**: Auto-detected and preserved from source to target
- **VirtIO Drivers**: Automatic injection for Windows VMs via virt-v2v
- **Concurrent Migrations**: Celery workers with row-level locking for safe concurrency

---

## Positioning

**Tagline**: "Automated VM Migration to OpenStack & VHI"
**Hero line**: "Migrate Running VMs — No Downtime, No Agents, Fully Automated"

**Our real differentiators**:
- **Snapshot-based, zero-downtime**: All sources use snapshots on running VMs — no shutdown required
- **Continuous replication with cutover**: Not just lift-and-shift — incremental sync + final cutover
- **Volume streaming via Cloud Agents**: Stream directly to Cinder volumes, no local disk bottleneck
- **Multi-hypervisor to OpenStack/VHI**: VMware, Hyper-V, Proxmox, KVM → single target platform
- **Web dashboard with real-time progress**: Not just CLI — visual progress, logs, ETA
- **Windows VirtIO injection**: Automatic driver injection via virt-v2v
- **Self-hostable**: Deploy on your own infrastructure, full control

---

## Pages & Routes

### 1. Home Page (`/`)

**Hero Section**
- Headline: "Migrate Running VMs to OpenStack & VHI — No Downtime, No Agents"
- Subheading: "Snapshot-based migration from VMware, Hyper-V, Proxmox, and KVM with continuous replication, volume streaming, and a real-time web dashboard."
- CTAs: "Book a Demo" (primary gradient) + "See How It Works" (outline)
- Hero visual: Animated source→target flow with snapshot + stream visualization

**Supported Platforms Bar**
- Source logos: VMware ESXi, Hyper-V, Proxmox, KVM
- Arrow/flow
- Target logos: OpenStack, VHI, Proxmox
- Text: "4 source hypervisors. 3 target platforms. Zero downtime."

**Migration Paths Grid** (cards linking to dedicated pages)
- VMware ESXi → OpenStack / VHI
- Hyper-V → OpenStack / VHI
- Proxmox → OpenStack / VHI
- KVM/libvirt → OpenStack / VHI
- Proxmox → Proxmox (native remote-migrate)

**Key Features Section** (6 cards)
1. **Zero-Downtime Snapshots** — Snapshot running VMs on any hypervisor. VMware quiesced snapshots, Hyper-V checkpoints, ZFS/LVM snapshots. No VM shutdown needed.
2. **Continuous Replication** — Incremental snapshot-based sync on a configurable schedule. Changed blocks only. Final cutover with minimal downtime window.
3. **Volume Streaming** — Cloud Agents stream disk data directly to Cinder volumes. No local disk needed. Migrate VMs larger than your server's storage.
4. **Multi-Disk & Multi-NIC** — Each disk migrated independently. Network interfaces mapped with optional MAC preservation. BIOS/UEFI auto-detected.
5. **Windows VirtIO Injection** — Automatic VirtIO driver injection for Windows VMs via virt-v2v. Works with VMDK, VHD, VHDX sources.
6. **Real-Time Dashboard** — WebSocket-powered progress tracking. Phase status, transfer speed, ETA, and detailed logs for every migration.

**How It Works** (5 steps)
1. **Connect** — Add source hypervisors and target clouds via the web dashboard. Credentials validated automatically.
2. **Discover** — Auto-discover all VMs with full metadata: CPU, RAM, disks, NICs, OS type, BIOS/UEFI, boot order.
3. **Configure** — Select VMs, map networks, choose replication schedule or one-time migration. Preflight checks validate everything.
4. **Migrate** — 8-phase automated pipeline: snapshot → export → convert → upload/stream → provision → configure → validate → cleanup.
5. **Cutover** — Final sync, boot on target, verify. Review logs, confirm networking, decommission source when ready.

**Migration Modes Section**
Two approaches depending on your needs:

**One-Time Migration (Lift & Shift)**
- Snapshot → Export → Convert → Upload to Glance → Provision via Nova
- Best for: Scheduled maintenance windows, smaller environments
- Typical downtime: Minutes (snapshot + final boot)

**Continuous Replication + Cutover**
- Initial full sync → Incremental syncs every N minutes → Final cutover
- Volume streaming directly to Cinder (no Glance upload)
- Best for: Zero-downtime requirements, large environments
- Cutover downtime: Seconds to minutes (final delta sync + boot)

**Why VM Migrator vs Manual Migration**
| | Manual | VM Migrator |
|---|---|---|
| VM Shutdown Required | Usually yes | No — snapshot-based |
| Disk Conversion | Manual qemu-img per disk | Automatic with VirtIO injection |
| Multi-disk VMs | One disk at a time | All disks in parallel |
| Network Config | Recreate manually | Auto-mapped with MAC preservation |
| Progress Visibility | SSH and hope | Real-time dashboard with ETA |
| Incremental Sync | Not possible | Continuous replication |
| Large VM Handling | Need local disk space | Volume streaming — no local disk |
| Resume on Failure | Start over | Resume from last completed phase |
| Windows Drivers | Manual VirtIO install | Automatic injection via virt-v2v |

**Use Cases Section**
- **VMware Exit** — Escape Broadcom licensing. Migrate VMware workloads to OpenStack or VHI with quiesced snapshots and zero downtime.
- **Data Center Modernization** — Move from legacy Hyper-V, Proxmox, or KVM to enterprise OpenStack cloud.
- **Infrastructure Consolidation** — Converge multiple hypervisors into a single OpenStack/VHI platform.
- **Proxmox Cluster Migration** — Migrate between Proxmox clusters using native qm remote-migrate with live memory transfer.

**CTA Banner**
- "Ready to migrate your VMs?"
- "Book a Demo" + "Contact Sales"

**Footer**
- Product: Features, How It Works, Migration Paths
- Company: About, Contact
- Resources: API Docs
- Legal: Privacy Policy, Terms
- "Built by Leapswitch Networks"

---

### 2. Features Page (`/features`)

**Hero**: "Enterprise VM Migration — Every Feature You Need"

#### Migration Engine
- 8-phase automated pipeline with preflight validation
- Snapshot-based export — safe for running VMs on all hypervisors
- Disk format conversion: VMDK, VHD, VHDX, QCOW2, RAW → QCOW2
- VirtIO driver injection for Windows VMs (via virt-v2v)
- Multi-disk migration — each disk handled independently
- Checksums (SHA256) for data integrity verification
- Phase-based resumability — retry from point of failure
- Concurrent migrations with Celery workers and row-level locking

#### Continuous Replication
- Incremental snapshot-based sync (ZFS/LVM/CBT)
- Configurable sync schedule (default every 15 minutes)
- Replication modes: SNAPSHOT, CBT, CONTINUOUS, FULL
- Final cutover sync with minimal downtime
- Boot directly from Cinder volume (no Glance re-upload)

#### Volume Streaming (Cloud Agents)
- Cloud Agents: Nova instances on target that act as streaming workers
- Stream disk data directly to Cinder volumes over the network
- No local disk space needed on migration server
- Proxmox/KVM: NBD pull streaming
- Hyper-V: qemu-nbd push streaming
- VMware: VDDK + nbdkit streaming
- Atomic agent selection with slot reservation for concurrency

#### Source Hypervisors
- **VMware ESXi/vCenter** — vSphere API (pyvmomi), VMDK via HTTPS, quiesced snapshots, no SSH
- **Hyper-V** — SSH + PowerShell, checkpoint-based VHDX export, differencing disk support
- **Proxmox VE** — REST API + SSH, vzdump + snapshot export, qm remote-migrate
- **KVM/libvirt** — SSH + virsh, domain XML parsing, ZFS/LVM/file disks, NBD

#### Target Platforms
- **OpenStack** — Glance, Nova, Neutron, Cinder full integration
  - Chunked upload with resume capability
  - Flavor auto-matching from source specs
  - Hardware properties: firmware, disk bus, SCSI model, video model
  - Multi-NIC with MAC preservation
  - Security group assignment
- **VHI** — Virtuozzo Hybrid Infrastructure via OpenStack APIs
- **Proxmox VE** — Native qm remote-migrate (online/offline)

#### Discovery & Preflight
- Auto-discovery from all source hypervisors via API
- VM metadata: name, OS, CPU, RAM, disks, NICs, BIOS type, boot order
- Migration eligibility checks (flags templates, PCI passthrough, shared VHDX)
- Preflight validation: connectivity, compatibility, network mappings
- Periodic re-sync via scheduled tasks

#### Dashboard & Monitoring
- Real-time WebSocket progress (phase, percentage, speed, ETA)
- Migration history and detailed logs
- VM inventory management
- Source/target connection management
- Cloud Agent status and utilization

#### Security & Access Control
- RBAC: Admin, Operator, Viewer roles
- JWT token authentication
- Encrypted transfers (HTTPS/SSH)
- Agentless — nothing installed on source VMs
- Audit logging
- Shell injection protection (shlex.quote + validators)

#### Architecture
- FastAPI async backend
- Celery distributed workers (horizontally scalable)
- PostgreSQL state persistence
- Redis cache and task queue
- React 19 frontend
- Full REST API (Swagger/ReDoc)

---

### 3. How It Works Page (`/how-it-works`)

**Step 1: Connect Your Infrastructure**
- Add source hypervisors: VMware vCenter/ESXi, Hyper-V hosts, Proxmox clusters, KVM hosts
- Add target platforms: OpenStack clouds, VHI environments, Proxmox clusters
- Each connection validated automatically (API connectivity, credentials, permissions)
- Diagram: Dashboard source/target configuration

**Step 2: Discover Your VMs**
- Automatic discovery scans all VMs on connected sources
- Captures: VM name, OS type/version, vCPUs, RAM, all disks (sizes, formats, bus types), all NICs, BIOS/UEFI, boot order
- Migration eligibility flagged automatically (templates, passthrough devices marked ineligible)
- Periodic re-sync keeps inventory current
- Diagram: VM inventory with metadata

**Step 3: Choose Your Migration Strategy**

*Option A: One-Time Migration*
- Select VMs → Map networks → Start migration
- 8-phase pipeline runs: Snapshot → Export → Convert → Upload → Provision → Configure → Validate → Cleanup
- Best for scheduled windows or smaller environments

*Option B: Continuous Replication + Cutover*
- Set up replication schedule (e.g., every 15 min)
- Initial full sync to Cinder volume via Cloud Agent
- Incremental syncs transfer only changed blocks
- When ready: trigger cutover → final sync → boot on target
- Best for near-zero-downtime requirements

- Diagram: Both migration flows side by side

**Step 4: Monitor in Real-Time**
- WebSocket dashboard shows live progress for every migration
- Phase-by-phase tracking with completion percentage
- Transfer speed and ETA calculation
- Detailed logs accessible per migration
- If a phase fails: diagnose from logs, retry from that phase
- Diagram: Migration detail page with progress bars

**Step 5: Validate & Cutover**
- VM automatically validated on target (power state, IP assignment)
- Review migration logs and checksums
- Test migrated VM on target platform
- Update DNS/networking to point to new VM
- Decommission source VM when satisfied
- Diagram: Validation results and completion

---

### 4. Migration Path Pages (Template + Specific Pages)

**Page Template Structure:**
1. **Hero** — "[Source] to [Target] Migration — Automated & Zero Downtime"
2. **Why migrate?** — Business case (licensing, modernization, etc.)
3. **What is [Target]?** — Education block for VHI pages
4. **How it works for [Source]** — Source-specific technical details
5. **What we support** — Disk formats, OS types, features for this path
6. **Migration modes** — One-time vs continuous replication
7. **5-step process** — Visual with source-specific details
8. **CTA** — Contact form + "Book a Demo"

---

#### 4a. VMware to OpenStack / VHI (`/migrations/vmware-to-openstack`)

**Hero**: "Migrate from VMware to OpenStack & VHI — Escape Broadcom, Keep Running"
- Subtext: "Quiesced snapshots of running VMs. Automatic VMDK→QCOW2 conversion. VirtIO driver injection for Windows. No agents, no shutdown."

**Why Migrate from VMware?**
- Broadcom acquisition → licensing cost explosion (300-1000%+ increases reported)
- Vendor lock-in with proprietary stack
- OpenStack/VHI provides equivalent enterprise features on open-source foundation
- KVM/QEMU hypervisor is production-proven at massive scale

**What is VHI?**
- Virtuozzo Hybrid Infrastructure — enterprise cloud platform built on OpenStack
- Compute, storage, networking in a single platform
- OpenStack API compatible — VM Migrator works natively with VHI
- Strong VMware alternative with familiar management paradigm

**How VMware Migration Works**
- **Connection**: vSphere API (pyvmomi) — connects to vCenter or ESXi directly
- **Snapshot**: Quiesced snapshot via VMware Tools (application-consistent). Falls back to crash-consistent if Tools unavailable.
- **Export**: VMDK download via HTTPS using vSphere session — no SSH to ESXi needed
- **Conversion**: VMDK → QCOW2 via qemu-img. Windows VMs get VirtIO drivers via virt-v2v.
- **Volume Streaming**: Cloud Agent uses nbdkit-vddk plugin for direct VDDK streaming to Cinder
- **Provisioning**: Nova instance with proper hardware properties (firmware, disk bus, video model)

**Supported**
- VMware vSphere / ESXi (API-based, no ESXi shell access needed)
- All VMDK disk types (thin, thick, eager zeroed)
- Windows and Linux guests
- BIOS and UEFI firmware
- Multi-disk VMs (boot + data disks)
- Multi-NIC with MAC preservation
- One-time migration or continuous replication

**5-Step Process**
1. Connect to vCenter/ESXi via vSphere API
2. Discover all VMware VMs (auto-populated with full metadata)
3. Select VMs, map networks, configure target settings
4. Automated migration: quiesced snapshot → VMDK export → QCOW2 conversion → upload/stream → provision
5. Validate on OpenStack/VHI, cutover when ready

---

#### 4b. Hyper-V to OpenStack / VHI (`/migrations/hyperv-to-openstack`)

**Hero**: "Migrate from Hyper-V to OpenStack & VHI — No VM Shutdown Required"

**Why Migrate from Hyper-V?**
- Move Windows workloads to open cloud infrastructure
- Reduce Windows Server licensing overhead
- Consolidate Hyper-V silos into unified OpenStack platform
- VHI runs Windows guests with full VirtIO performance

**How Hyper-V Migration Works**
- **Connection**: SSH to Windows Server + PowerShell cmdlets
- **Snapshot**: Checkpoint strategy — creates checkpoint on running VM, freezes parent VHDX
- **Export**: Differencing disk (AVHDX) + parent VHDX exported without VM shutdown
- **Conversion**: VHD/VHDX → QCOW2. Windows VMs get VirtIO drivers via virt-v2v.
- **Volume Streaming**: Cloud Agent receives via qemu-nbd
- **Provisioning**: Nova instance with Windows-appropriate hardware properties

**Supported**
- Microsoft Hyper-V on Windows Server
- VHD and VHDX disk formats (Fixed, Dynamic, Differencing)
- Checkpoint-based export (no VM shutdown)
- Windows and Linux guests
- Multi-disk, multi-NIC
- Automatic VirtIO driver injection for Windows

---

#### 4c. Proxmox to OpenStack / VHI (`/migrations/proxmox-to-openstack`)

**Hero**: "Migrate from Proxmox to OpenStack & VHI — Scale Beyond Single Clusters"

**Why Migrate from Proxmox?**
- Grow from Proxmox clusters to enterprise OpenStack cloud
- Gain full API-driven infrastructure automation
- Centralized multi-tenant management
- VHI provides Proxmox-like simplicity with OpenStack scale

**How Proxmox Migration Works**
- **Connection**: Proxmox REST API + SSH
- **Snapshot**: Proxmox snapshot mode (safe for running VMs)
- **Export**: vzdump full backup or snapshot-based disk export
- **Storage**: ZFS, LVM, local files, QCOW2 — all supported
- **Conversion**: To QCOW2 for OpenStack target
- **Volume Streaming**: Cloud Agent NBD pull from source

**Supported**
- Proxmox VE clusters (REST API)
- All storage types: ZFS, LVM, local, QCOW2
- vzdump backup-based export
- BIOS and UEFI VMs
- Multi-disk, multi-NIC
- Linux and Windows guests

---

#### 4d. KVM to OpenStack / VHI (`/migrations/kvm-to-openstack`)

**Hero**: "Migrate from KVM/libvirt to OpenStack & VHI — Formalize Your Infrastructure"

**Why Migrate from KVM?**
- Move from ad-hoc KVM management to proper cloud platform
- Gain self-service, multi-tenant, API-driven infrastructure
- Same KVM hypervisor under the hood — minimal guest changes
- QCOW2 disks may need zero conversion

**How KVM Migration Works**
- **Connection**: SSH to KVM host + virsh commands
- **Discovery**: virsh list + dumpxml for full domain XML parsing
- **Snapshot**: ZFS/LVM snapshots or direct file copy
- **Export**: NBD streaming, direct disk copy, or file-based
- **Conversion**: Minimal — QCOW2 sources may skip conversion entirely
- **Volume Streaming**: Cloud Agent NBD pull from source

**Supported**
- KVM/libvirt hosts via SSH
- Disk types: ZFS, LVM, file-based (QCOW2, RAW)
- NBD (Network Block Device) streaming
- Domain XML parsing for full VM metadata
- BIOS and UEFI firmware detection
- Multi-disk, multi-NIC

---

#### 4e. Proxmox to Proxmox (`/migrations/proxmox-to-proxmox`)

**Hero**: "Migrate Between Proxmox Clusters — Online, Native, Seamless"

**Why Proxmox-to-Proxmox?**
- Migrate VMs between clusters during upgrades or consolidation
- Live migration with memory transfer (online mode)
- Native Proxmox tooling — no format conversion needed
- Move VMs across datacenters

**How It Works**
- **Method 1: qm remote-migrate** (preferred)
  - Native Proxmox command
  - Online mode: Live migration with memory transfer — zero downtime
  - Offline mode: Stop → migrate → start
  - Requires: Target API token + TLS fingerprint
  - Single atomic operation — no intermediate steps

- **Method 2: vzdump + rsync + qmrestore** (fallback)
  - Full vzdump backup → rsync to target → qmrestore
  - Network bridge remapping
  - Works when remote-migrate isn't available

---

### 5. Contact Us Page (`/contact`)

**Hero**: "Let's Plan Your Migration"

**Contact Form**
- Full name (required)
- Business email (required)
- Company name (required)
- Phone number (optional)
- Source platform: VMware ESXi, Hyper-V, Proxmox, KVM, Multiple, Other
- Target platform: OpenStack, VHI, Proxmox, Other
- Number of VMs: 1-10, 11-50, 51-200, 200+
- Timeline: Immediate, 1-3 months, 3-6 months, Evaluating
- Message / requirements (textarea)
- Submit: "Get in Touch"

**Contact Info Cards**
- Email: sales@leapswitch.com (placeholder)
- Schedule a Demo: calendar link
- API Documentation: link

**FAQ Section**
- **Do VMs need to be shut down?** — No. VM Migrator uses snapshot-based export on all hypervisors. VMware uses quiesced snapshots, Hyper-V uses checkpoints, Proxmox/KVM use ZFS/LVM snapshots. Your VMs keep running.
- **How long does migration take?** — Depends on disk size and network speed. With volume streaming, a 100GB VM over 1Gbps takes about 15-20 minutes. Continuous replication reduces cutover to seconds.
- **Do I need to install agents?** — No. VM Migrator connects to hypervisor APIs (vSphere, PowerShell, Proxmox REST, virsh). Nothing installed on guest VMs.
- **What about Windows VMs?** — Fully supported. VirtIO drivers are automatically injected via virt-v2v during conversion. BIOS/UEFI firmware is auto-detected and preserved.
- **Can I migrate multiple VMs at once?** — Yes. Queue multiple migrations, track each in the dashboard. Celery workers handle concurrent execution.
- **What if a migration fails mid-way?** — Migrations are resumable. Each of the 8 phases tracks completion. Retry picks up from the last successful phase.
- **Do I need lots of local disk space?** — Not with volume streaming. Cloud Agents stream disk data directly to Cinder volumes on the target. No local disk copy needed.
- **What's the difference between one-time and replication?** — One-time migration does a single snapshot→export→provision cycle. Continuous replication syncs incrementally and allows a near-zero-downtime cutover.

---

### 6. About Page (`/about`)

- **Company**: Leapswitch Networks — Infrastructure and cloud services
- **Mission**: Making VM migration automated, reliable, and accessible
- **Story**: Built from real-world experience migrating production workloads
- **Technology**: Open architecture — FastAPI, React, Celery, PostgreSQL
- **OpenStack native**: Purpose-built for OpenStack ecosystem

---

## Design System

### Colors (Dark Theme)
```
Background:     #0a0a0f
Surface:        #111827
Card:           #1a1f2e
Border:         #2a2f3e
Primary:        #3b82f6 → #8b5cf6 (blue-purple gradient)
Accent:         #06b6d4 (cyan)
Success:        #10b981
Text Primary:   #f8fafc
Text Secondary: #94a3b8
Text Muted:     #64748b
```

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, tracking-tight
- Body: Regular, text-base/lg

### Components
- Glass cards: `bg-white/5 backdrop-blur-lg border border-white/10`
- Gradient CTAs: `bg-gradient-to-r from-blue-500 to-purple-600`
- Hover: Scale + subtle glow
- Icons: Lucide React in gradient circles

### Responsive
- Mobile: < 768px (single column)
- Tablet: 768-1024px (2 columns)
- Desktop: > 1024px (full layout)

---

## Tech Stack
- React 19 + Vite + TypeScript
- Tailwind CSS v4 + shadcn/ui
- React Router v7
- Framer Motion (animations)
- Lucide React (icons)
- React Hook Form + Zod (contact form)

---

## SEO Keywords

| Page | Primary Keywords |
|------|-----------------|
| Home | VM migration tool, automated VM migration, OpenStack migration, VHI migration |
| Features | agentless VM migration, continuous replication, volume streaming, zero downtime migration |
| VMware→OpenStack | VMware to OpenStack, VMware to VHI, VMware exit, Broadcom alternative |
| Hyper-V→OpenStack | Hyper-V to OpenStack, Hyper-V to VHI, Hyper-V cloud migration |
| Proxmox→OpenStack | Proxmox to OpenStack, Proxmox to VHI |
| KVM→OpenStack | KVM to OpenStack, libvirt to OpenStack |
| Proxmox→Proxmox | Proxmox cluster migration, qm remote-migrate |

---

## Go-to-Market Checklist

### Pre-Launch
- [ ] Website live with all pages
- [ ] Contact form → email notification
- [ ] SEO meta tags + sitemap.xml
- [ ] Analytics (Plausible or GA4)
- [ ] SSL certificate

### Launch
- [ ] LinkedIn / Twitter announcement
- [ ] OpenStack community forums
- [ ] Proxmox community forums
- [ ] Reddit: r/homelab, r/selfhosted, r/openstack
- [ ] Hacker News (Show HN)

### Content (Post-Launch)
- [ ] Blog: "Migrate VMware VMs to OpenStack — Complete Guide"
- [ ] Blog: "VMware Exit Strategy: Moving to VHI"
- [ ] Blog: "Zero-Downtime VM Migration with Continuous Replication"
- [ ] Demo video walkthrough
- [ ] Case study after first customer

### Partnerships
- [ ] Virtuozzo / VHI partnership
- [ ] OpenStack ecosystem listing
- [ ] Hosting providers running OpenStack
