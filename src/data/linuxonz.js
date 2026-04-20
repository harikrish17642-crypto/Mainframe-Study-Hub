export const LINUXONZ_TOPIC = {
  id:"linuxonz", icon:"🐧", title:"Linux on Z", subtitle:"Open Source on IBM Z Hardware", color:"#f59e0b", level:"All Levels",
  description:"Enterprise Linux powered by mainframe hardware — the best of both worlds for cloud-native workloads.",
  sections:[
    { title:"Introduction to Linux on Z", level:"Beginner",
      content:`Linux on IBM Z combines the open-source Linux ecosystem with the legendary reliability, security, and I/O throughput of IBM Z hardware.

Why Run Linux on Mainframe?

  Hardware Advantages:
  • 99.999% uptime — 26 seconds of unplanned downtime per year
  • Up to 40 TB memory per system
  • Hardware encryption at no CPU cost (CPACF)
  • zIIP processors — discounted processing for Linux workloads
  • Massive I/O bandwidth (FICON, OSA-Express)
  • Single-system image up to 200+ LPARs

  Software Advantages:
  • Standard Linux — RHEL, SUSE, Ubuntu
  • Full open-source ecosystem: Docker, Kubernetes, PostgreSQL, Kafka, etc.
  • Same tools as x86 Linux (gcc, bash, systemd, rpm/apt)
  • Enormous vertical scalability (scale UP, not just out)

Deployment Options:
  1. Native LPAR:
     Linux runs directly on a dedicated logical partition
     Best raw performance
     Used for high-throughput workloads

  2. z/VM Guest:
     z/VM hypervisor runs many Linux guests (hundreds to thousands)
     Extremely efficient memory sharing (CMM)
     Best consolidation ratio
     Most popular option

  3. KVM on Z (IBM Z Host Foundation):
     KVM hypervisor on s390x
     More familiar for Linux-only teams
     Integrated with libvirt, QEMU, virt-manager

  4. zCX (z/OS Container Extensions):
     Docker containers on z/OS
     Tightest integration with z/OS data
     No separate partition needed

Architecture: s390x
  The Linux s390x architecture is fully maintained by IBM and the community.
  Most packages in RHEL, SUSE, and Ubuntu are built for s390x.
  Docker Hub has s390x images for popular software.
  Multi-arch images work automatically (docker pull detects s390x).`
    },
    { title:"z/VM Virtualization", level:"Intermediate",
      content:`z/VM — The Most Efficient Hypervisor:

z/VM has been virtualizing workloads since 1972 — decades before VMware existed. It remains the most efficient hypervisor for consolidating Linux instances.

z/VM Capabilities:
  • Run thousands of Linux guests on a single z/VM system
  • Each guest gets a virtual machine with virtual CPUs, memory, disks, network
  • Hardware-assisted virtualization (SIE instruction)
  • Near-zero overhead for CPU virtualization

Key z/VM Features:

  Memory Management:
  • CMM (Collaborative Memory Management) — z/VM and Linux cooperate
  • Memory overcommit — allocate more virtual memory than physical
  • Page sharing — identical memory pages shared between guests
  • Ballooning — dynamically adjust guest memory

  Virtual Networking:
  • Guest LAN — virtual network between z/VM guests (no physical network)
  • VSWITCH — Layer 2 virtual switch with VLAN support
  • HiperSockets — memory-to-memory communication (microsecond latency)
  • OSA-Express — shared physical network adapters

  Virtual Storage:
  • Minidisks — virtual disks from DASD volumes
  • EDEV (Emulated Devices) — FCP/SCSI pass-through
  • SCSI over FCP — Linux standard storage
  • Shared disks between guests (for clustering)

  Live Guest Relocation:
  Move running Linux guests between z/VM systems
  Zero downtime migration for hardware maintenance
  SSI (Single System Image) cluster of up to 4 z/VM systems

z/VM Commands (CP and CMS):
  CP — Control Program (hypervisor)
    QUERY VIRTUAL — show virtual devices
    DEFINE STORAGE — set guest memory
    LINK — attach shared disk
    COUPLE — connect to virtual network

  CMS — Conversational Monitor System (interactive environment)
    Used for z/VM administration
    DIRMAINT — directory management
    SMAPI — Systems Management API`
    },
    { title:"Installing Linux on Z", level:"Intermediate",
      content:`Installing Linux on IBM Z — Step by Step:

Prerequisites:
  • Access to z/VM or LPAR (from your system programmer)
  • Linux installation ISO for s390x (RHEL, SUSE, or Ubuntu)
  • Network configuration details (IP, gateway, DNS)
  • Storage: DASD (3390) or FCP/SCSI LUNs

Installation Process (z/VM Guest):

  1. Create z/VM Guest Definition:
     System programmer creates a z/VM user directory entry
     Defines: CPU count, memory, minidisks, network adapters

  2. IPL (Boot) the Linux Installer:
     Transfer installation kernel and initrd to CMS minidisk
     IPL from CMS reader or directly from kernel/initrd

  3. Network Configuration:
     Configure OSA or HiperSockets adapter
     Set IP address, gateway, DNS
     Connect to installation server (HTTP, FTP, or NFS)

  4. Storage Configuration:
     DASD: activate (chccwdev -e) and format (dasdfmt)
     FCP: configure zFCP driver, scan for LUNs
     Create partitions and filesystems

  5. Package Installation:
     Standard Linux installation (YaST, Anaconda, or d-i)
     Select packages (server, desktop, minimal)
     Configure root password and user accounts

  6. Boot Configuration:
     zipl — z Systems Initial Program Loader (like GRUB for s390x)
     Configure /etc/zipl.conf
     Run zipl command to write boot record

  7. Post-Installation:
     Register with RHEL subscription or SUSE connect
     Configure z/VM network (VSWITCH, guest LAN)
     Install monitoring agents
     Configure LPAR/z/VM performance monitoring

Key Differences from x86 Linux:
  • Boot loader: zipl (not GRUB)
  • Disk format: dasdfmt for DASD (not needed for SCSI)
  • Network: OSA, HiperSockets (in addition to standard ethernet)
  • Device addressing: CCW (Channel Command Word) for I/O
  • No graphics console — serial/3270/SSH only
  • Architecture: s390x (similar to but different from x86_64)`
    },
    { title:"Red Hat OpenShift on Z", level:"Advanced",
      content:`OpenShift on IBM Z — Enterprise Kubernetes:

Red Hat OpenShift Container Platform (OCP) runs natively on IBM Z (s390x), bringing full Kubernetes orchestration to mainframe hardware.

Why OpenShift on Z?

  • Run containerized workloads alongside z/OS
  • Consolidate x86 clusters onto Z hardware (massive efficiency)
  • Hardware encryption for container workloads
  • Single management plane across x86 and Z (OpenShift)
  • z/OS integration via APIs and shared networking

Architecture:
  IBM Z hardware → z/VM or KVM → RHEL CoreOS → OpenShift
  Or: IBM Z → LPAR → RHEL CoreOS → OpenShift (bare metal)

  Control plane: 3 master nodes (s390x)
  Compute: Worker nodes (s390x) — add as needed
  Storage: NFS, local storage, IBM Spectrum, or Portworx

What Runs on OpenShift on Z:
  • Microservices (Java, Node.js, Go, Python)
  • Databases (PostgreSQL, MongoDB, Redis)
  • Message brokers (Kafka, RabbitMQ, IBM MQ)
  • CI/CD tools (Tekton, ArgoCD)
  • Monitoring (Prometheus, Grafana)
  • Service mesh (Istio)
  • AI/ML inference (TensorFlow Serving)

Multi-Architecture Clusters:
  OpenShift supports mixed-architecture clusters
  x86 and s390x nodes in the same cluster
  Schedule workloads on the right architecture
  Use node selectors and tolerations for placement

Operator Framework:
  Operators automate application lifecycle on OpenShift
  IBM provides operators for: MQ, Db2, CICS integration
  Red Hat provides: PostgreSQL, Kafka, Elasticsearch operators
  Custom operators for mainframe-specific workloads`
    },
    { title:"Networking on Linux on Z", level:"Intermediate",
      content:`Networking — Connecting Linux on Z:

Linux on Z supports both standard and Z-specific network technologies:

Standard Networking:
  • TCP/IP — same as any Linux system
  • VLANs, bonding, bridges — all standard Linux features
  • Firewalld, iptables, nftables — standard firewalls
  • NetworkManager or systemd-networkd

IBM Z Specific Networking:

  OSA-Express (Open Systems Adapter):
  • Physical network adapter shared among LPARs/guests
  • Supports Ethernet (10GbE, 25GbE)
  • CHPID type OSD (Layer 3) or OSX (Layer 2)
  • Device driver: qeth

  HiperSockets:
  • Memory-to-memory networking between LPARs
  • Microsecond latency (no physical network)
  • Internal to the IBM Z machine
  • Used for: z/OS to Linux, Linux to Linux, high-performance
  • Device driver: qeth (same as OSA)

  z/VM VSWITCH:
  • Virtual Layer 2 switch in z/VM
  • Connects z/VM guests to each other and to OSA
  • VLAN support, port isolation, trunking
  • Can bridge to external networks via OSA

  z/VM Guest LAN:
  • Virtual network between z/VM guests only
  • No external connectivity (internal only)
  • Very fast (memory-to-memory within z/VM)
  • Good for cluster heartbeat, replication

Network Configuration:
  • CCW device addresses: read (0.0.0800), write (0.0.0801), data (0.0.0802)
  • chccwdev -e 0.0.0800,0.0.0801,0.0.0802 — bring devices online
  • znetconf — z-specific network configuration tool
  • /etc/sysconfig/network-scripts/ifcfg-encXXXX — RHEL
  • /etc/netplan/*.yaml — Ubuntu

  Example qeth configuration (RHEL):
  DEVICE=enc800
  TYPE=Ethernet
  BOOTPROTO=static
  IPADDR=10.1.2.100
  NETMASK=255.255.255.0
  GATEWAY=10.1.2.1
  SUBCHANNELS=0.0.0800,0.0.0801,0.0.0802
  NETTYPE=qeth
  LAYER2=1
  PORTNO=0
  ONBOOT=yes`
    },
    { title:"Storage on Linux on Z", level:"Intermediate",
      content:`Storage — DASD and FCP/SCSI:

Linux on Z supports two primary storage types:

1. DASD (Direct Access Storage Device):
  Traditional mainframe disk storage
  Connected via FICON channels
  Addressed by CCW device numbers
  Format: 3390 (count-key-data)

  Managing DASD:
  • chccwdev -e 0.0.0100 — bring DASD online
  • dasdfmt -b 4096 /dev/dasda — format for Linux
  • fdasd /dev/dasda — partition (replaces fdisk for DASD)
  • mkfs.ext4 /dev/dasda1 — create filesystem

  DASD Characteristics:
  • Fixed geometry (tracks, cylinders)
  • Different from standard block devices
  • Volume serial number (VOLSER)
  • Can be shared between z/VM guests (with appropriate locking)

2. FCP/SCSI (Fibre Channel Protocol):
  Standard SCSI disks via Fibre Channel
  Used with SAN (Storage Area Network) storage
  Multipathing supported (dm-multipath)
  Looks like standard Linux SCSI disks (/dev/sdX)

  Managing FCP:
  • Configure zFCP adapter: chccwdev -e 0.0.01fc
  • Scan for LUNs: echo "port wwpn lun_id" > /sys/bus/ccw/.../port_add
  • Standard Linux tools: fdisk, mkfs, mount, lvm

  FCP Advantages:
  • Standard SAN infrastructure
  • Larger disk sizes than DASD
  • Familiar to Linux admins
  • Multipath for high availability
  • Live migration with shared storage

LVM and Filesystem:
  Both DASD and FCP can use LVM (Logical Volume Manager)
  Supported filesystems: ext4, XFS, Btrfs
  Swap space on DASD or FCP
  /boot on DASD or FCP (zipl compatible)

Performance Considerations:
  • DASD: excellent random I/O (mainframe I/O subsystem)
  • FCP: good throughput, standard SAN performance
  • HyperPAV for DASD — parallel access for better throughput
  • zHyperLink — ultra-low latency DASD access`
    },
    { title:"Performance & Crypto", level:"Advanced",
      content:`Performance Tuning & Hardware Crypto on Linux on Z:

Performance Advantages:

  Processor:
  • IFL (Integrated Facility for Linux) — dedicated processors for Linux
  • Each IFL handles high single-thread workloads
  • SMT (Simultaneous Multi-Threading) on z15+ — 2 threads per core
  • Large caches (up to 256 MB L4 per drawer)

  Memory:
  • Up to 40 TB per system
  • Large page support (1 MB pages)
  • CMM (Collaborative Memory Management) with z/VM
  • NUMA-aware memory allocation

  I/O:
  • FICON channels: high-throughput, low-latency
  • HiperSockets: microsecond inter-LPAR networking
  • zEDC: hardware compression (2-5x compression ratios)
  • zHyperLink: 10 microsecond storage access

Hardware Cryptography (CPACF + Crypto Express):

  CPACF (CP Assist for Cryptographic Functions):
  • Built into every processor — no additional cost
  • AES-128/192/256, SHA-256/384/512, DES/TDES
  • Transparent to applications (libica, OpenSSL uses it automatically)
  • Line-speed encryption — no CPU overhead

  Crypto Express Adapter:
  • Dedicated crypto co-processor (CCA or EP11 mode)
  • RSA key operations (up to 4096-bit)
  • Secure key management (keys never in clear memory)
  • PKCS#11 support
  • PCI HSM (Hardware Security Module) compliant

  Pervasive Encryption:
  • Encrypt all data at rest and in transit
  • Dataset encryption (z/OS), dm-crypt/LUKS (Linux)
  • TLS acceleration for all network traffic
  • No performance penalty (hardware accelerated)

  Enabling Crypto in Linux:
  • Load ibmca engine for OpenSSL
  • Configure libica for application crypto
  • Use dm-crypt with hardware acceleration
  • TLS 1.3 with hardware AES-GCM

Tuning Tips:
  • Use large pages: vm.nr_hugepages in sysctl
  • Enable IRQ balancing: irqbalance service
  • Tune I/O scheduler: mq-deadline for DASD/FCP
  • Use HiperSockets for inter-LPAR communication
  • Enable zEDC compression for Db2 and large datasets`
    },
    { title:"Ansible for z/OS & Linux on Z", level:"Intermediate",
      content:`Ansible Automation for IBM Z:

Ansible is the leading automation tool for IBM Z, supporting both z/OS and Linux on Z with dedicated collections.

Ansible Collections for IBM Z:

  ibm.ibm_zos_core — z/OS automation:
  • zos_copy — transfer files to/from z/OS
  • zos_job_submit — submit and monitor JCL jobs
  • zos_data_set — create, delete, manage datasets
  • zos_tso_command — execute TSO commands
  • zos_operator — execute console commands
  • zos_encode — convert character encodings

  ibm.ibm_zhmc — Z Hardware Management Console:
  • zhmc_partition — manage LPARs
  • zhmc_nic — manage network adapters
  • zhmc_hba — manage storage adapters
  • zhmc_crypto_attachment — manage crypto resources

  Standard Collections (for Linux on Z):
  • All standard Ansible modules work on s390x Linux
  • ansible.builtin — core modules
  • community.general — extended modules
  • containers.podman / kubernetes.core — container orchestration

Use Cases:
  1. Provisioning: Create z/VM guests, install Linux, configure networking
  2. Configuration: Apply consistent configs across all Linux on Z instances
  3. Deployment: Deploy applications to z/OS and Linux on Z
  4. Patching: Automated OS and application patching
  5. Compliance: Verify security configurations match policy
  6. Disaster Recovery: Automated failover procedures`,
      code:`# ─── Ansible Playbook: Configure Linux on Z ──────────
---
- name: Configure Linux on Z Guest
  hosts: linux_on_z
  become: yes

  tasks:
    - name: Enable crypto hardware
      modprobe:
        name: "{{ item }}"
        state: present
      loop:
        - aes_s390
        - sha_common
        - sha256_s390
        - des_s390

    - name: Configure large pages
      sysctl:
        name: vm.nr_hugepages
        value: '256'
        state: present
        reload: yes

    - name: Bring DASD online
      command: chccwdev -e 0.0.0200
      register: dasd_result
      changed_when: "'already online' not in dasd_result.stderr"

    - name: Configure qeth network
      template:
        src: ifcfg-enc800.j2
        dest: /etc/sysconfig/network-scripts/ifcfg-enc800
      notify: restart network

    - name: Install monitoring packages
      package:
        name:
          - prometheus-node-exporter
          - sysstat
          - s390-tools
        state: present

    - name: Start and enable services
      systemd:
        name: "{{ item }}"
        state: started
        enabled: yes
      loop:
        - node_exporter
        - sysstat

  handlers:
    - name: restart network
      service:
        name: NetworkManager
        state: restarted`
    },

    { title:"Linux on Z — Installation Methods", level:"Beginner",
      content:`Three ways to run Linux on IBM Z hardware.

LPAR (Logical Partition):
  Dedicated hardware partition for Linux.
  Full hardware isolation. Best performance.
  Used for: Production workloads, database servers.

z/VM Guest:
  Linux runs as a virtual machine under z/VM.
  Hundreds of Linux instances on one machine.
  Used for: Development, test, large-scale consolidation.

KVM on Z:
  Open-source hypervisor (like KVM on x86).
  Linux host runs KVM → Linux guests on top.
  Used for: Cloud-like deployment, OpenStack integration.

Installation:
  1. Create LPAR or z/VM guest
  2. Network boot (FTP, HTTP, NFS)
  3. Standard Linux installer (RHEL, SUSE, Ubuntu)
  4. Configure networking, storage, DASD/FCP

Supported Distributions:
  RHEL (Red Hat Enterprise Linux)
  SLES (SUSE Linux Enterprise Server)
  Ubuntu Server
  All certified for IBM Z.

Pro Tip: z/VM is the most common deployment model. One z/VM can host 100+ Linux guests efficiently.`
    },

    { title:"Linux on Z — Storage", level:"Intermediate",
      content:`Storage options for Linux on IBM Z.

DASD (Direct Access Storage):
  Traditional mainframe disk.
  Appears as /dev/dasdX in Linux.
  Use dasdfmt to format before use.
  ECKD format (Count-Key-Data).

FCP (Fibre Channel Protocol):
  SAN storage via zFCP adapter.
  Appears as standard SCSI devices in Linux.
  /dev/sdX, /dev/dm-X (multipath).

EDEV (Emulated FBA):
  FBA (Fixed Block Architecture) disk.
  Simpler than ECKD. Used in z/VM environments.

Multipath:
  Multiple paths to same disk for redundancy.
  device-mapper-multipath in Linux.
  Active-active or active-passive failover.

File Systems:
  ext4 — Standard Linux (most common)
  XFS — High-performance, large files
  NFS — Network file system

Storage Management:
  LVM for flexible volume management.
  Same Linux tools as x86 (fdisk, lsblk, mount).

Pro Tip: Use multipath for all production storage. Single-path = single point of failure.`
    },

    { title:"Linux on Z — Networking", level:"Intermediate",
      content:`Network configuration for Linux on IBM Z.

OSA (Open Systems Adapter):
  Hardware network adapter. OSD (OSA-Express Direct).
  QETH driver in Linux. Appears as ethX or encX.

HiperSockets:
  Internal high-speed networking between LPARs/guests.
  No physical network traversal — memory-to-memory.
  Microsecond latency. Used for: z/OS to Linux communication.

VSWITCH (Virtual Switch):
  z/VM provides virtual switches for guest networking.
  Guests connect to VSWITCH → VSWITCH connects to OSA.
  Like VMware vSwitch.

Configuration:
  NetworkManager or /etc/sysconfig/network-scripts (RHEL)
  wicked or /etc/sysconfig/network (SLES)
  netplan (Ubuntu)

Bonding:
  Combine multiple network interfaces for redundancy/throughput.
  Mode 1 (active-backup) most common on Z.

Pro Tip: HiperSockets for z/OS↔Linux communication (ultra-fast). OSA for external network. VSWITCH for guest-to-guest under z/VM.`
    },

    { title:"Linux on Z — z/VM Integration", level:"Intermediate",
      content:`z/VM is the hypervisor that makes Linux on Z scalable.

z/VM Architecture:
  z/VM runs on LPAR → Creates virtual machines → Linux runs in VMs.
  CP (Control Program) = hypervisor
  CMS (Conversational Monitor System) = z/VM user environment

Guest Management:
  DEFINE virtual machine (CPU, memory, storage)
  IPL (boot) Linux from DASD or network
  ATTACH devices to guests

Resource Sharing:
  Memory overcommit — Allocate more memory than physical (CMM)
  CPU sharing — z/VM scheduler distributes CPU across guests
  Shared read-only disks — One copy, many guests

z/VM SMAPI:
  System Management API for programmatic guest management.
  Create, start, stop, clone VMs via API.

Performance Features:
  CMM (Collaborative Memory Management) — z/VM + Linux cooperate on memory
  VDISK — In-memory virtual disk (fast temp storage)
  IRD (Intelligent Resource Director) — Dynamic resource balancing

Pro Tip: z/VM can run 100+ Linux guests on a single LPAR. It's the most efficient virtualization platform for Linux on Z.`
    },

    { title:"Linux on Z — Containers & Cloud", level:"Advanced",
      content:`Modern cloud-native workloads on IBM Z.

Docker on Z:
  Standard Docker runs on s390x architecture.
  s390x container images available for most popular software.
  docker pull redis:latest — Works on Z (multi-arch images).

Kubernetes on Z:
  Full Kubernetes on Linux on Z.
  Managed: Red Hat OpenShift on Z.
  Self-managed: Kubernetes from SUSE, Canonical.

OpenShift on Z:
  Enterprise Kubernetes platform on IBM Z.
  Hybrid cloud: Same platform on Z, x86, Power, cloud.
  Deploy same containers across architectures.

Cloud Integration:
  IBM Cloud Pak for Applications on Z
  Ansible for z/OS automation
  Terraform for infrastructure provisioning

Benefits:
  • Run cloud-native apps on Z hardware
  • Leverage Z security, reliability, crypto
  • Hybrid cloud consistency
  • Data gravity — Keep processing near mainframe data

Pro Tip: OpenShift on Z is the future for modernizing mainframe workloads. Same DevOps, same containers, Z reliability.`
    },

    { title:"Linux on Z — Security", level:"Advanced",
      content:`IBM Z hardware provides unique security features for Linux.

Pervasive Encryption:
  z15/z16 hardware encrypts everything — data at rest, in transit, in use.
  CPACF acceleration — no performance impact.
  dm-crypt for disk encryption with hardware acceleration.

Secure Execution (SE):
  Protected virtual machines — even z/VM admin can't see guest memory.
  Confidential computing for sensitive workloads.
  Perfect for: multi-tenant environments, regulated data.

Crypto Express:
  Hardware Security Module (HSM) built into Z hardware.
  PKCS#11 for key management.
  Used by: TLS certificates, digital signing, key storage.

SELinux:
  Standard Linux security module, fully supported on Z.
  Mandatory access control.

LDAP/RACF Integration:
  Linux can authenticate against RACF via LDAP.
  Single sign-on between z/OS and Linux.

Pro Tip: IBM Z Secure Execution is unique — no other platform offers true confidential computing at this scale.`
    },

    { title:"Linux on Z — Use Cases", level:"Beginner",
      content:`Why run Linux on Z instead of x86?

Server Consolidation:
  Replace 100+ x86 servers with one Z system.
  Lower: power, cooling, floor space, networking, licenses.
  Higher: utilization (z/VM drives 80%+ CPU utilization).

Data Serving:
  Database servers close to mainframe data.
  PostgreSQL, MongoDB, MariaDB on Linux on Z.
  Low-latency access to DB2 z/OS via DRDA or HiperSockets.

Middleware:
  WebSphere, Apache, Nginx on Linux on Z.
  Java application servers near mainframe backends.

Analytics:
  Spark, Kafka, ELK stack on Linux on Z.
  Process mainframe data without moving it off-platform.

DevOps:
  Git, Jenkins, Ansible on Linux on Z.
  CI/CD pipelines for mainframe and distributed apps.

Cost Model:
  Z hardware is expensive. But: fewer servers, less admin, higher utilization, lower power, included crypto.
  Break-even typically at 10-20 x86 servers consolidated.

Pro Tip: The sweet spot for Linux on Z is workloads that need mainframe data, security, or reliability but want Linux flexibility.`
    },


    { title:"Interview Questions", level:"All Levels",
      content:`Linux on Z Interview Questions — 15+ Q&A.

Q: What is Linux on Z?
A: Linux running on IBM Z hardware, either natively in an LPAR or as a guest under z/VM. Combines Linux flexibility with Z reliability.

Q: What is z/VM?
A: Virtualization hypervisor for IBM Z. Runs hundreds/thousands of Linux guests efficiently. Each guest gets virtual hardware.

Q: Why run Linux on Z instead of x86?
A: Consolidation (hundreds of Linux instances on one box), I/O throughput, crypto hardware, 99.999% availability, co-location with z/OS data.

Q: What is an LPAR vs z/VM guest?
A: LPAR = hardware partition (dedicated resources). z/VM guest = software virtualization (shared resources, more flexible).

💡 Study Tip: Know z/VM, LPAR, consolidation benefits, and hybrid architecture concepts.`,
    },

    { title:"Linux on Z Cheat Sheet", level:"All Levels",
      content:`Linux on Z Quick Reference

═══ DEPLOYMENT OPTIONS ═══
Native LPAR — Dedicated hardware partition
z/VM Guest — Virtualized (most common)
KVM — Linux KVM on Z

═══ KEY ADVANTAGES ═══
Consolidation, I/O throughput, crypto hardware, co-location with z/OS, 99.999% availability`,
    },
    { title:"Interview Questions — Linux on Z", level:"All Levels",
      content:`Linux on Z Interview Questions:

Q: What are the advantages of running Linux on IBM Z vs x86?
A: IBM Z offers: (1) 99.999% availability architecture, (2) hardware encryption at zero CPU cost (CPACF), (3) massive vertical scalability (40TB RAM, 200+ LPARs), (4) superior I/O subsystem (FICON channels), (5) extreme consolidation with z/VM (thousands of Linux guests), (6) Pervasive Encryption for all data at rest and in transit, and (7) proximity to mainframe data (zero-hop access when running alongside z/OS).

Q: What is z/VM and how does it differ from VMware/KVM?
A: z/VM is IBM's hypervisor for System Z, running since 1972. Unlike VMware/KVM, z/VM can efficiently run thousands of Linux guests on a single system through hardware-assisted virtualization (SIE instruction), memory sharing between guests, and extremely low overhead. z/VM also supports live guest relocation (like vMotion) and SSI clusters of up to 4 z/VM systems.

Q: How does DASD differ from SCSI/FCP storage?
A: DASD uses count-key-data format native to mainframes, connected via FICON channels. It requires dasdfmt (format) and fdasd (partition) instead of fdisk. FCP/SCSI uses standard SCSI protocol over Fibre Channel, appears as /dev/sdX, and uses standard Linux tools. DASD has excellent random I/O due to the mainframe I/O subsystem, while FCP integrates with standard SAN infrastructure.

Q: Explain HiperSockets and when you'd use them.
A: HiperSockets provide memory-to-memory networking between LPARs on the same IBM Z machine, with microsecond latency and no physical network hardware. Use them for: (1) z/OS to Linux communication, (2) inter-Linux high-performance networking, (3) database replication between LPARs, (4) cluster heartbeat. They use the qeth driver, same as OSA adapters.

Q: What is the boot process for Linux on Z?
A: Linux on Z boots using zipl (z/VM Initial Program Loader), configured via /etc/zipl.conf. The process: (1) z/VM IPL command loads the kernel from a designated device, (2) kernel and initrd loaded into memory, (3) kernel initializes s390x hardware (CCW devices, crypto), (4) systemd takes over standard Linux boot. Key difference: no BIOS/UEFI/GRUB — it's all zipl.

Q: How does encryption work on IBM Z hardware?
A: Two levels: (1) CPACF — built into every processor, provides AES, SHA, DES at no additional cost. OpenSSL/libica use it automatically. (2) Crypto Express — dedicated co-processor for RSA operations and secure key management (HSM). Together they enable "Pervasive Encryption" — encrypting all data at rest (LUKS/dm-crypt) and in transit (TLS) with zero performance impact.`
    },

    { title:"19 — Linux on Z Performance Tuning", level:"Advanced",
      content:`Performance optimization for Linux running on IBM Z.

CPU: Use dedicated IFLs, configure SHARE values in z/VM, use SMT on z15+.
Memory: Large pages for databases, Collaborative Memory Management with z/VM.
I/O: FCP for SAN, ECKD DASD with PAV, use deadline/noop I/O scheduler.
Network: HiperSockets for inter-LPAR (memory-speed), OSA-Express external, VSWITCH in z/VM.

Pro Tip: IFLs are priced separately and don't count toward MLC software licensing.`,
      code:``
    },

    { title:"20 — RHEL on Z Installation", level:"Intermediate",
      content:`Red Hat Enterprise Linux is the most popular Linux on Z.

Installation: via z/VM guest, LPAR direct, or KVM.
Tools: lscss (channel devices), chccwdev (configure CCW), znetconf (network), dasd_configure (DASD).
Key differences from x86: IPL boot, DASD/FCP storage, HiperSockets/OSA network.

Pro Tip: Always test RHEL upgrades in a z/VM guest clone before production.`,
      code:``
    },

    { title:"21 — z/VM Hypervisor Essentials", level:"Intermediate",
      content:`z/VM enables running hundreds of Linux guests on a single IBM Z.

Architecture: CP (hypervisor), CMS (interactive), Guests (virtual machines).
Concepts: Virtual Machine, Minidisk, VSWITCH, SHARE weight.

CP Commands:
  QUERY NAMES — List logged-on guests
  INDICATE LOAD — Show utilization
  FORCE userid — Force logoff

Capacity: Thousands of guests, up to 64 vCPUs each, memory overcommitment.

Pro Tip: z/VM memory overcommitment and CPU sharing makes Linux on Z cost-effective.`,
      code:``
    },

    { title:"22 — HiperSockets and Virtual Networking", level:"Advanced",
      content:`HiperSockets provide memory-speed networking between LPARs.

HiperSockets: Internal TCP/IP, ~15 microsecond latency, up to 32 Gbps. No physical hardware needed.
VSWITCH: z/VM virtual switch connecting guests. VLAN support, port-based isolation.

Network Design:
  HiperSockets for z/OS to Linux data flows
  VSWITCH for Linux to Linux
  OSA-Express for external access

Pro Tip: Use HiperSockets between app tier (Linux) and DB tier (z/OS DB2) for dramatic latency reduction.`,
      code:``
    },

    { title:"23 — Containers on IBM Z", level:"Advanced",
      content:`Container technologies run natively on IBM Z with s390x support.

Platforms: Docker, Podman (RHEL 8+), OpenShift, IBM Cloud Pak.
OpenShift on Z: Full Kubernetes, hybrid cloud (x86 + Z same cluster).
Images: Must be built for s390x. Multi-arch images support both architectures.

Benefits: Consolidation, pervasive encryption, hardware crypto acceleration, hybrid deployment.

Pro Tip: Start with stateless microservices in containers. Keep databases on traditional z/OS.`,
      code:``
    },

    { title:"24 — Ansible for Linux on Z", level:"Intermediate",
      content:`Ansible automates Linux on Z management using standard playbooks.

Setup: Control node on any Linux, managed nodes via SSH, no agent.
Automation: Provisioning, package management, patching, compliance, z/VM guest management.
z/VM modules: Guest define/start/stop, DASD management, VSWITCH configuration.

Pro Tip: Use Ansible Tower for scheduled patching, compliance checks, on-demand provisioning.`,
      code:``
    },

    { title:"25 — Migrating Workloads to Linux on Z", level:"Intermediate",
      content:`Strategies for moving distributed workloads to Z.

Good candidates: Database servers, Java apps, middleware (MQ, Kafka), web servers, containers.
Poor candidates: Windows-only, GPU-dependent, tiny workloads.

Approaches: Rehost (as-is), Replatform (minor changes), Refactor (redesign), Hybrid.
ROI: Server consolidation (10-50 x86 to 1 Z), reduced licensing (IFL-based), lower ops cost.

Pro Tip: Start with Java workloads — they run identically on s390x with no code changes.`,
      code:``
    },

    { title:"26 — IBM Secure Execution", level:"Expert",
      content:`Hardware-based isolation for Linux workloads on Z.

What it does: Encrypts guest memory, hardware isolation, attestation, zero-trust.
How: Guest image encrypted, Ultravisor verifies integrity, memory pages encrypted by hardware.

Use cases: Multi-tenant cloud, regulated industries, confidential computing.

Expert Tip: Secure Execution is a major Z differentiator — no other platform offers hardware-enforced memory encryption at this level.`,
      code:``
    },

    { title:"27 — Monitoring Linux on Z", level:"Intermediate",
      content:`Standard Linux tools plus Z-specific utilities.

Linux: top, vmstat, iostat, sar, Prometheus + Grafana.
Z-specific: lscss, lsdasd, lszfcp, vmcp, hyptop (z/VM-aware top).
z/VM: INDICATE LOAD (system), INDICATE USER (per-guest).

Key Metrics: CPU steal time, DASD response time, HiperSocket throughput, swap usage.

Pro Tip: CPU steal time above 5% means your guest needs more CPU — increase SHARE.`,
      code:``
    },

    { title:"28 — High Availability on Linux on Z", level:"Advanced",
      content:`HA configurations for Linux on IBM Z.

Architectures: z/VM Guest Clustering, Linux HA (Pacemaker/Corosync), GDPS, Stretch Cluster.
z/VM Live Guest Relocation: Move running guest between z/VM hosts with zero downtime.
Storage HA: DS8K Metro Mirror (sync), Global Mirror (async), Multipath I/O.

Pro Tip: z/VM Live Guest Relocation is unique to Z — zero downtime hypervisor maintenance.`,
      code:``
    },

    { title:"29 — Cost Optimization on Z", level:"Intermediate",
      content:`Minimizing cost of running Linux on IBM Z.

IFLs: Dedicated Linux processors, don't count toward z/OS MLC cost.
Consolidation: Replace 50 x86 servers with 4 IFLs — one frame, no switches, central management.
Licensing: Open source = zero. RHEL per-IFL (not per-guest).
Rightsizing: Dynamic CPU/memory via z/VM. Monitor with hyptop.

Pro Tip: Break-even is typically 5-10 guests. Below that, distributed may be cheaper.`,
      code:``
    },

    { title:"30 — Linux on Z Interview Q&A + Cheat Sheet", level:"Beginner",
      content:`Common interview questions.

Q: Why Linux on Z? A: Consolidation, co-location with z/OS, hardware encryption, extreme reliability.
Q: What is IFL? A: Integrated Facility for Linux — dedicated processor, no MLC cost.
Q: What is z/VM? A: Hypervisor for running multiple virtual machines on Z.
Q: HiperSockets? A: Memory-speed internal networking, ~15 microsecond latency.
Q: Containers on Z? A: Docker, Podman, OpenShift all support s390x natively.

Cheat Sheet:
  IFL — Linux processor
  z/VM — Hypervisor
  HiperSockets — Internal networking
  VSWITCH — Virtual switch
  OSA-Express — Physical NIC
  lscss — List devices
  hyptop — z/VM-aware top
  Secure Execution — Memory encryption`,
      code:``
    },

    { title:"19 — Linux on Z Performance Tuning", level:"Advanced",
      content:`Performance optimization for Linux on IBM Z hardware.

CPU: Use IFLs (dedicated Linux processors). Configure SHARE values in z/VM. Use SMT on z15+.

Memory: Large pages (1MB) for databases. Collaborative Memory Management with z/VM. Swap should be minimal.

I/O: FCP for SAN storage, ECKD DASD with PAV, multipath I/O, deadline/noop I/O scheduler.

Network: HiperSockets for inter-LPAR (memory-speed), OSA-Express for external, VSWITCH in z/VM.

💡 Pro Tip: IFLs are priced separately and do not count toward MLC software licensing — significant cost savings.`,
      code:``
    },
    { title:"20 — RHEL on Z Installation", level:"Intermediate",
      content:`Red Hat Enterprise Linux is the most popular distribution on IBM Z.

Installation Methods: z/VM guest, direct LPAR, KVM on Z.

RHEL-Specific Tools: lscss (list channel devices), chccwdev (configure CCW), znetconf (network), dasd_configure (bring DASD online).

Key Differences from x86: Boot via IPL instead of BIOS/UEFI, DASD/FCP storage instead of local disk, HiperSockets/OSA instead of NIC.

💡 Pro Tip: Always test RHEL upgrades in a z/VM guest clone before upgrading production.`,
      code:``
    },
    { title:"21 — z/VM Hypervisor Essentials", level:"Intermediate",
      content:`z/VM enables running hundreds of Linux guests on a single IBM Z.

Architecture: CP (Control Program/hypervisor kernel), CMS (interactive environment), Guests (virtual machines).

Key Concepts: Virtual Machine (virtual CPU/memory/I/O per guest), Minidisk (virtual DASD), VSWITCH (virtual network), SHARE (CPU allocation weight).

CP Commands: QUERY NAMES (list guests), INDICATE LOAD (system utilization), FORCE userid (force logoff).

💡 Pro Tip: z/VM memory overcommitment and CPU sharing is what makes Linux on Z so cost-effective for consolidation.`,
      code:``
    },
    { title:"22 — HiperSockets and Virtual Networking", level:"Advanced",
      content:`HiperSockets provide memory-speed networking between LPARs.

HiperSockets: Internal TCP/IP, ~15 microsecond latency, up to 32 Gbps, no physical hardware needed. Used for z/OS to Linux and Linux to Linux communication.

VSWITCH: Software-defined switch in z/VM. Connects guests to each other and external network. VLAN support for segmentation.

Network Design: HiperSockets for z/OS-Linux data flows, VSWITCH for Linux-Linux, OSA-Express for external access.

💡 Pro Tip: Use HiperSockets between app tier (Linux) and database tier (z/OS DB2) for dramatic latency reduction.`,
      code:``
    },
    { title:"23 — Containers on IBM Z", level:"Advanced",
      content:`Container technologies run natively on IBM Z with s390x architecture.

Supported Platforms: Docker, Podman (preferred for RHEL 8+), OpenShift (enterprise Kubernetes), IBM Cloud Pak.

OpenShift on Z: Full Kubernetes on IBM Z, runs on RHEL/z/VM, supports hybrid cloud (x86 + Z in same cluster).

Benefits: Consolidation (hundreds of containers per LPAR), hardware encryption, high I/O throughput, same container runs on Z and x86.

💡 Pro Tip: Start with stateless microservices in containers. Keep stateful workloads on traditional z/OS until comfortable with container storage.`,
      code:``
    },
    { title:"24 — Ansible for Linux on Z", level:"Intermediate",
      content:`Ansible automates Linux on Z management using standard playbooks.

Setup: Control node can be any Linux/Mac. Managed nodes are Linux on Z. SSH communication. No agent needed.

Common Automation: System provisioning (deploy new guests), package management, configuration, patching (rolling updates), compliance enforcement.

z/VM Modules: Guest management, DASD management, network configuration.

💡 Pro Tip: Use Ansible Tower/AWX for scheduled automation — weekly patching, daily compliance checks, on-demand provisioning.`,
      code:``
    },
    { title:"25 — Migrating Workloads to Linux on Z", level:"Intermediate",
      content:`Strategies for moving distributed workloads to IBM Z.

Good Candidates: Database servers (PostgreSQL, MongoDB), app servers (Java, Node.js), middleware (MQ, Kafka), web servers, container workloads.

Poor Candidates: Windows-only apps, GPU-dependent workloads, x86-specific binaries, very small workloads.

ROI Factors: Server consolidation (10-50 x86 servers to 1 Z), reduced licensing (IFL-based), lower operational cost, improved security.

💡 Pro Tip: Start with Java workloads — they run identically on s390x with no code changes and often perform better due to hardware crypto.`,
      code:``
    },
    { title:"26 — IBM Secure Execution", level:"Expert",
      content:`Hardware-based isolation for Linux workloads on Z.

What It Does: Encrypts guest memory (even z/VM admins cannot read it), hardware isolation, attestation (prove trusted code), zero-trust for cloud.

How It Works: Guest image encrypted with host key. During boot, SE verifies integrity. Memory pages encrypted/decrypted by hardware. Hypervisor sees only encrypted memory.

Ultravisor: Firmware below z/VM that enforces isolation.

💡 Expert Tip: Secure Execution is a major differentiator — no other platform offers hardware-enforced memory encryption at this level.`,
      code:``
    },
    { title:"27 — Monitoring Linux on Z", level:"Intermediate",
      content:`Standard Linux tools plus Z-specific utilities.

Standard: top/htop, vmstat, iostat, sar, Prometheus + Grafana.

Z-Specific: lscss (channel devices), lsdasd (DASD), vmcp (z/VM commands from Linux), hyptop (z/VM-aware top).

Key Metrics: CPU steal time (time waiting for physical CPU), DASD response time, HiperSocket throughput, swap usage (should be near zero).

💡 Pro Tip: CPU steal time above 5% means your guest is not getting enough CPU — increase SHARE value or add IFLs.`,
      code:``
    },
    { title:"28 — High Availability on Linux on Z", level:"Advanced",
      content:`HA configurations for Linux on IBM Z.

Architectures: z/VM Guest Clustering, Linux HA (Pacemaker/Corosync), GDPS (site failover), Stretch Cluster (active-active).

z/VM Live Guest Relocation: Move running Linux guest between z/VM hosts with zero downtime. Enables rolling z/VM maintenance.

Storage HA: DS8K Metro Mirror (synchronous), Global Mirror (asynchronous), multipath I/O.

💡 Pro Tip: z/VM Live Guest Relocation is unique to Z — no other platform can live-migrate guests with zero downtime for hypervisor maintenance.`,
      code:``
    },
    { title:"29 — Cost Optimization on Z", level:"Intermediate",
      content:`Strategies to minimize cost of running Linux on IBM Z.

IFLs: Specialty processors for Linux only. Do NOT count toward z/OS MLC software cost. z/VM license based on IFL count, not guest count.

Consolidation: Replace 50 x86 servers with 4 IFLs. Reduce networking (HiperSockets free), storage connections, admin overhead, power/cooling.

Rightsizing: z/VM allows dynamic CPU/memory adjustment. Monitor with hyptop. Capacity on Demand (CoD) for burst.

💡 Pro Tip: Break-even is typically 5-10 Linux guests. Below that, distributed may be cheaper. Above that, Z wins on TCO.`,
      code:``
    },
    { title:"30 — Linux on Z Interview Q&A + Cheat Sheet", level:"Beginner",
      content:`Common interview questions.

Q: Why run Linux on IBM Z?
A: Consolidation, co-location with z/OS data, hardware encryption, extreme reliability.

Q: What is an IFL?
A: Integrated Facility for Linux — dedicated processor that does not count toward z/OS licensing.

Q: What is z/VM?
A: IBM hypervisor for running multiple virtual machines on shared hardware.

Q: What are HiperSockets?
A: Internal memory-speed TCP/IP networking between LPARs (~15 microsecond latency).

Cheat Sheet:
  IFL — Linux-only processor
  z/VM — Hypervisor
  HiperSockets — Memory-speed networking
  VSWITCH — Virtual network switch
  lscss — List channel devices
  hyptop — z/VM-aware top
  Secure Execution — Hardware memory encryption
  OSA-Express — Physical network adapter`,
      code:``
    },
  ]
};
