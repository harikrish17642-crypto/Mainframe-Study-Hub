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
    }
  ]
};
