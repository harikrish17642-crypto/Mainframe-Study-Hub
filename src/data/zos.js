export const ZOS_TOPIC = {
  id:"zos", icon:"\uD83D\uDDA5\uFE0F", title:"z/OS Fundamentals", subtitle:"The Operating System That Runs the World", color:"#1d4ed8", level:"Beginner \u2192 Expert",
  description:"z/OS is the most reliable operating system ever built. Understanding its architecture is the foundation of everything mainframe.",
  sections:[
    { title:"What is z/OS?", level:"Beginner",
      content:"z/OS \u2014 The Operating System of Enterprise Computing:\n\nz/OS is IBM\u2019s flagship operating system for the IBM Z mainframe platform. It is the most robust, secure, and reliable operating system ever created \u2014 designed for continuous operation with 99.999% uptime.\n\nz/OS by the Numbers:\n  \u2022 Powers 68% of all worldwide transactions\n  \u2022 Processes 30 billion business transactions per day\n  \u2022 Handles 87% of all credit card transactions\n  \u2022 Supports 96 of the world\u2019s top 100 banks\n  \u2022 Runs at 44 of the top 50 retailers\n  \u2022 Manages 90% of airline reservation systems\n\nz/OS History:\n  1964 \u2014 OS/360 (the original)\n  1974 \u2014 MVS (Multiple Virtual Storage)\n  1988 \u2014 MVS/ESA (Enterprise Systems Architecture)\n  1995 \u2014 OS/390 (rebranded, TCP/IP integrated)\n  2001 \u2014 z/OS (current generation, 64-bit)\n  2023 \u2014 z/OS 3.1 (latest, container extensions)\n\nWhy z/OS Still Dominates:\n  1. Reliability \u2014 designed for zero unplanned downtime\n  2. Security \u2014 RACF, built-in encryption, EAL5+ certification\n  3. Scalability \u2014 single system handles millions of transactions/sec\n  4. Data integrity \u2014 never loses a transaction\n  5. Backward compatibility \u2014 programs from 1970s still run\n  6. Workload management \u2014 automatic performance optimization\n  7. I/O throughput \u2014 unmatched by any other platform"
    },
    { title:"z/OS Architecture Overview", level:"Beginner",
      content:"z/OS Architecture \u2014 How It All Fits Together:\n\nAddress Spaces:\n  Every program on z/OS runs in its own \"address space\" \u2014 an isolated virtual memory environment. Think of it as a container (before containers existed).\n\n  Types of address spaces:\n  \u2022 System address spaces \u2014 z/OS kernel, JES2, VTAM, catalog\n  \u2022 Subsystem address spaces \u2014 CICS, DB2, IMS, MQ\n  \u2022 Batch job address spaces \u2014 each running batch job gets its own\n  \u2022 TSO user address spaces \u2014 each logged-in user gets one\n  \u2022 Started tasks \u2014 system services (like Linux daemons)\n\nVirtual Storage:\n  z/OS uses virtual storage (memory) extensively:\n  \u2022 Each address space sees its own 16 EB (exabytes) of virtual memory\n  \u2022 31-bit programs: 2 GB addressable\n  \u2022 64-bit programs: 16 EB addressable\n  \u2022 Real (physical) memory shared by all address spaces\n  \u2022 Paging moves data between real storage and disk when needed\n\nThe \"Bar\" and \"Line\":\n  \u2022 \"Below the line\" \u2014 first 16 MB (24-bit addressing from MVS days)\n  \u2022 \"Below the bar\" \u2014 first 2 GB (31-bit addressing)\n  \u2022 \"Above the bar\" \u2014 beyond 2 GB (64-bit addressing)\n\nz/OS Subsystems:\n  \u2022 JES2/JES3 \u2014 Job Entry Subsystem (batch job management)\n  \u2022 VTAM \u2014 Virtual Telecommunications Access Method (networking)\n  \u2022 TCP/IP \u2014 Internet protocol stack\n  \u2022 RACF \u2014 Resource Access Control Facility (security)\n  \u2022 WLM \u2014 Workload Manager (performance)\n  \u2022 SMS \u2014 Storage Management Subsystem (storage automation)\n\nSystem Datasets (SYS1.xxx):\n  \u2022 SYS1.PARMLIB \u2014 System parameters (like /etc on Linux)\n  \u2022 SYS1.PROCLIB \u2014 System procedures (started task JCL)\n  \u2022 SYS1.LINKLIB \u2014 System programs (like /usr/bin)\n  \u2022 SYS1.LPALIB \u2014 Programs loaded into memory at IPL\n  \u2022 SYS1.NUCLEUS \u2014 z/OS kernel modules"
    },
    { title:"IPL & System Startup", level:"Intermediate",
      content:"IPL (Initial Program Load) \u2014 Booting z/OS:\n\nIPL is the mainframe equivalent of \"booting.\" The process is carefully controlled.\n\nIPL Process:\n  1. Hardware Initialization:\n     Operator selects LOAD from HMC (Hardware Management Console)\n     Processor loads the IPL program from a designated volume\n\n  2. Nucleus Initialization Program (NIP):\n     Loads z/OS kernel modules from SYS1.NUCLEUS\n     Reads IEASYSxx PARMLIB member for system parameters\n\n  3. Master Scheduler Initialization:\n     Starts the master address space\n     Initializes subsystem interface (SSI)\n\n  4. JES2/JES3 Start:\n     Job Entry Subsystem starts and opens SPOOL datasets\n\n  5. Automation & Started Tasks:\n     COMMNDxx PARMLIB member issues automatic commands\n     Started tasks begin (CICS, DB2, VTAM, TCP/IP)\n\nPARMLIB \u2014 System Configuration:\n  IEASYSxx \u2014 System parameters (storage, SMF, WLM, catalogs)\n  COMMNDxx \u2014 Commands executed at IPL\n  SMFPRMxx \u2014 SMF recording parameters\n  PROGxx   \u2014 APF list, link list, LPA list\n  IKJTSOxx \u2014 TSO parameters\n  LOADxx   \u2014 IPL parameters (what to load)"
    },
    { title:"Datasets \u2014 z/OS File System", level:"Beginner",
      content:"Datasets \u2014 How z/OS Stores Data:\n\nOn z/OS, files are called \"datasets.\" Understanding datasets is fundamental.\n\nDataset Naming:\n  \u2022 Maximum 44 characters\n  \u2022 Qualifiers separated by periods (.)\n  \u2022 Each qualifier: 1-8 characters\n  \u2022 High-Level Qualifier (HLQ) is usually user ID or group name\n  \u2022 Examples: USER01.COBOL.SOURCE, PROD.PAYROLL.MASTER\n\nDataset Types:\n  1. Sequential (PS): Records stored one after another\n  2. Partitioned (PDS): Contains \"members\" \u2014 like a folder with files\n  3. PDS/E (PDSE): Modern replacement for PDS\n  4. VSAM: High-performance indexed files (KSDS, ESDS, RRDS, LDS)\n  5. Unix files: z/OS USS has standard Unix filesystem\n\nDASd (Direct Access Storage Device):\n  Physical disk storage on mainframes.\n  Track \u2248 56,664 bytes. Cylinder = 15 tracks \u2248 849,960 bytes.\n\nCatalog:\n  The system catalog maps dataset names to physical locations.\n  Master Catalog \u2192 User Catalogs \u2192 Dataset entries."
    },
    { title:"TSO/ISPF \u2014 The User Interface", level:"Beginner",
      content:"TSO (Time Sharing Option) provides interactive access to z/OS.\nISPF (Interactive System Productivity Facility) provides the panel-driven interface.\n\nISPF Primary Option Menu:\n  0 \u2014 Settings\n  1 \u2014 View (read-only browse of datasets)\n  2 \u2014 Edit (edit PDS members or sequential files)\n  3 \u2014 Utilities (dataset utilities, move/copy, search)\n  4 \u2014 Foreground (compile, link, run interactively)\n  5 \u2014 Batch (submit JCL for batch execution)\n  6 \u2014 Command (enter TSO commands)\n  SD \u2014 SDSF (job output viewer)\n\nISPF Editor Line Commands:\n  I  \u2014 Insert line(s)\n  D  \u2014 Delete line(s)\n  C  \u2014 Copy line(s)\n  M  \u2014 Move line(s)\n  R  \u2014 Repeat line(s)\n  A  \u2014 After (destination)\n  B  \u2014 Before (destination)\n\nISPF Editor Primary Commands:\n  FIND string \u2014 search forward\n  CHANGE old new \u2014 find and replace\n  SAVE \u2014 save changes\n  SUBMIT \u2014 submit as JCL job\n  HILITE JCL/COBOL \u2014 syntax highlighting"
    },
    { title:"JES2 \u2014 Job Entry Subsystem", level:"Intermediate",
      content:"JES2 manages the lifecycle of every batch job on z/OS.\n\nJES2 Functions:\n  1. Job Reception \u2014 accept jobs from TSO, NJE, internal reader\n  2. Conversion \u2014 parse JCL, expand PROCs, resolve symbols\n  3. Scheduling \u2014 queue jobs by class and priority\n  4. Execution \u2014 assign jobs to initiators\n  5. Output Processing \u2014 manage SYSOUT\n  6. Purge \u2014 clean up after job completion\n\nJob Classes: Single character (A-Z, 0-9) defining job category.\nJob Priority: PRTY parameter (0-15, higher = sooner)\n\nSDSF Panels:\n  DA \u2014 Display Active (currently running jobs)\n  I  \u2014 Input Queue (waiting to run)\n  O  \u2014 Output Queue (completed)\n  H  \u2014 Held Output Queue\n  ST \u2014 Status (all jobs)\n  LOG \u2014 System log\n\nSDSF Commands:\n  S  \u2014 Select (view job output)\n  ?  \u2014 Browse JCL\n  P  \u2014 Purge (delete job)\n  C  \u2014 Cancel running job"
    },
    { title:"RACF \u2014 z/OS Security", level:"Intermediate",
      content:"RACF (Resource Access Control Facility) controls who can access what on z/OS.\n\nRACF Concepts:\n  Users: Every person/service has a RACF profile\n  Groups: Organize users hierarchically\n  Resources: Everything protected (datasets, programs, terminals)\n\n  Access Levels:\n  NONE    \u2014 no access\n  READ    \u2014 read only\n  UPDATE  \u2014 read and write\n  CONTROL \u2014 full control (VSAM)\n  ALTER   \u2014 owner-level access\n\nRACF Commands:\n  ADDUSER  \u2014 create a user\n  ALTUSER  \u2014 modify a user\n  PERMIT   \u2014 grant access to a resource\n  ADDSD    \u2014 create dataset profile\n  LISTUSER \u2014 display user info\n  SEARCH   \u2014 search RACF database\n\nAccess Decision Logic:\n  1. Discrete profile for exact resource? \u2192 Use it\n  2. Generic profile matching? \u2192 Use most specific\n  3. OPERATIONS attribute? \u2192 Allow\n  4. No match \u2192 Default to UACC (Universal Access)"
    },
    { title:"USS \u2014 Unix System Services", level:"Intermediate",
      content:"z/OS Unix System Services (USS) is a POSIX-compliant Unix environment built into z/OS.\n\nWhy USS Matters:\n  \u2022 Run open-source software on z/OS (Java, Python, Node.js, Git)\n  \u2022 Unix shell scripting for automation\n  \u2022 Required by: Zowe, Java, DB2 utilities, WebSphere\n  \u2022 z/OS Container Extensions (zCX) runs on USS\n\nUSS Components:\n  Shell: /bin/sh (Bourne), /bin/bash\n  File System: Hierarchical zFS, like any Unix\n  Users: RACF user IDs map to Unix UIDs\n  Commands: ls, cd, cp, mv, rm, mkdir, grep, find, chmod\n\nAccessing USS:\n  From TSO: OMVS command\n  From ISPF: ISHELL command\n  SSH: ssh user@hostname\n  From batch: BPXBATCH program in JCL\n\nKey Directories:\n  /bin \u2014 standard Unix commands\n  /usr \u2014 user programs and libraries\n  /etc \u2014 configuration files\n  /u   \u2014 user home directories\n\nEBCDIC vs ASCII:\n  z/OS native encoding is EBCDIC (not ASCII)\n  USS files can be tagged with encoding\n  iconv converts between codepages",
      code:"# Access USS from TSO\nOMVS\n\n# Navigate\ncd /u/user01\nls -la\n\n# Copy MVS dataset to USS file\ncp \"//'USER01.COBOL.SOURCE(PAYROLL)'\" ./payroll.cbl\n\n# Copy USS file to MVS dataset\ncp ./payroll.cbl \"//'USER01.COBOL.SOURCE(PAYROLL)'\"\n\n# Run Java on z/OS\nexport JAVA_HOME=/usr/lpp/java/J17.0_64\njava -version\n\n# Run Python on z/OS\npython3 myscript.py\n\n# Git on z/OS\ngit clone https://github.com/myorg/myrepo.git\ngit add . && git commit -m \"Updated COBOL\"\n\n# Run USS commands from JCL (BPXBATCH)\n# //STEP1 EXEC PGM=BPXBATCH,\n# //       PARM='SH /u/user01/scripts/myscript.sh'\n# //STDOUT DD SYSOUT=*\n# //STDERR DD SYSOUT=*"
    },
    { title:"Parallel Sysplex", level:"Advanced",
      content:"A Parallel Sysplex is a cluster of up to 32 z/OS systems working as a single entity.\n\nComponents:\n  Coupling Facility (CF): Shared memory and locking between systems\n  Sysplex Timer: Synchronized time across all systems\n  GDPS: Extends sysplex across data centers (up to 300km)\n\nBenefits:\n  1. Availability \u2014 if one system fails, others take over\n  2. Scalability \u2014 add systems to handle more workload\n  3. Workload Balancing \u2014 spread work dynamically\n  4. Rolling Maintenance \u2014 upgrade one system while others run\n  5. Data Sharing \u2014 all systems access same DB2 data\n\nDB2 Data Sharing:\n  All systems access the same databases simultaneously.\n  Coupling Facility manages locking and caching.\n  If one DB2 fails, others continue without interruption.\n\nCICS in Sysplex:\n  CICSPlex SM manages multiple CICS regions.\n  Workload routing distributes transactions.\n  AOR failover is automatic."
    },
    { title:"z/OS Storage Concepts", level:"Intermediate",
      content:"z/OS Storage (Memory) Management:\n\nVirtual Storage Layout (31-bit):\n  2 GB \u2014 Extended Private (your program above 16MB)\n  16 MB \u2014 \"The Line\" boundary\n  Below \u2014 Private Area (below 16MB, legacy)\n  Common Area \u2014 CSA, SQA, LPA (shared system storage)\n  System Area \u2014 z/OS nucleus\n\nKey Storage Areas:\n  Private Area: Your job's workspace (REGION parameter)\n  CSA: Shared memory for inter-address-space communication\n  SQA: System control blocks and tables\n  LPA: Shared reentrant programs loaded at IPL\n  64-bit: \"Above the bar\" for large data structures\n\nREGION Parameter:\n  REGION=4M   \u2014 4 MB (small programs)\n  REGION=64M  \u2014 64 MB (typical COBOL)\n  REGION=0M   \u2014 maximum available\n\nCommon Storage Abends:\n  S878 \u2014 Virtual storage not available\n  S80A \u2014 Insufficient virtual storage\n  S804 \u2014 GETMAIN failed\n  S40D \u2014 Insufficient storage for OPEN"
    },
    { title:"Interview Questions", level:"All Levels",
      content:`z/OS Interview Questions — 25+ Q&A.

=== BEGINNER ===

Q: What is z/OS?
A: IBM's flagship mainframe operating system. Runs on IBM Z hardware. Supports batch, online (CICS/IMS), and UNIX workloads simultaneously.

Q: What is an LPAR?
A: Logical Partition — a virtual mainframe within a physical mainframe. Each LPAR runs its own z/OS instance independently.

Q: What is TSO?
A: Time Sharing Option — interactive command-line interface to z/OS. Users log on to TSO to access ISPF, submit jobs, manage datasets.

Q: What is ISPF?
A: Interactive System Productivity Facility — menu-driven interface on top of TSO. Panels for editing, browsing, dataset management, job submission.

Q: What is a dataset?
A: z/OS equivalent of a file. Types: Sequential (PS), Partitioned (PO/PDS/PDSE), VSAM (KSDS/ESDS/RRDS). Named up to 44 characters with dot-separated qualifiers.

Q: What is JES?
A: Job Entry Subsystem — manages batch job input, scheduling, and output. JES2 (most common) or JES3.

Q: What is the catalog?
A: Master index that maps dataset names to physical locations (volumes). MASTER CATALOG → USER CATALOGS → datasets.

=== INTERMEDIATE ===

Q: What is WLM?
A: Workload Manager — manages z/OS resources to meet performance goals. Assigns service classes, manages priorities, controls resource distribution.

Q: Explain the z/OS address space.
A: Each job/task gets its own virtual address space (up to 16 exabytes in 64-bit mode). Below the line (16MB) for legacy, above the line for modern programs.

Q: What is SMS?
A: Storage Management Subsystem — automates storage management. ACS routines assign STORCLAS/MGMTCLAS/DATACLAS based on naming rules.

Q: What is SYS1.PARMLIB?
A: System parameter library. Contains members that configure z/OS behavior: IEASYSxx (system params), JES2 params, SMF params, etc.

Q: What is the link list?
A: Concatenation of libraries (LNKLSTxx) searched for programs. System-wide. Avoid putting application programs here.

Q: What is LPA?
A: Link Pack Area — programs loaded into shared memory at IPL. Reentrant modules used by many address spaces. Saves memory.

💡 Study Tip: Know LPAR, TSO/ISPF, JES, catalog, SMS, and WLM — these are z/OS fundamentals interviewers expect.`,
    },

    { title:"z/OS Fundamentals Cheat Sheet", level:"All Levels",
      content:`z/OS Quick Reference — Cheat Sheet

═══ KEY SUBSYSTEMS ═══
JES2/JES3 — Job management     TSO — Interactive access
ISPF — Menu interface          WLM — Workload management
SMS — Storage management       RACF — Security
SMF — System metrics           RMF — Resource monitoring

═══ DATASET TYPES ═══
PS — Physical Sequential      PO — Partitioned (PDS/PDSE)
VSAM KSDS — Key-Sequenced    VSAM ESDS — Entry-Sequenced
VSAM RRDS — Relative Record  VSAM LDS — Linear

═══ KEY LIBRARIES ═══
SYS1.PARMLIB — System parameters
SYS1.PROCLIB — System procedures
SYS1.LINKLIB — System programs
SYS1.LPALIB — Link Pack Area modules
SYS1.NUCLEUS — z/OS kernel

═══ COMMON ISPF OPTIONS ═══
1 — View/Browse    2 — Edit
3 — Utilities      3.4 — Dataset list
6 — TSO command    S — SDSF/SD`,
    },
    { title:"Interview Questions \u2014 z/OS", level:"All Levels",
      content:"z/OS Fundamentals Interview Questions:\n\nQ: What is an address space?\nA: An isolated virtual memory environment on z/OS. Every batch job, TSO user, CICS region runs in its own address space with up to 2 GB (31-bit) or 16 EB (64-bit) of virtual memory.\n\nQ: What is the difference between \"below the line\" and \"above the bar\"?\nA: \"The line\" = 16 MB boundary (24-bit). \"The bar\" = 2 GB boundary (31-bit). Programs using 24-bit addressing access only first 16 MB. 64-bit programs access beyond 2 GB.\n\nQ: Explain the IPL process.\nA: (1) Hardware loads IPL program from DASD, (2) NIP loads kernel and reads PARMLIB, (3) Master Scheduler starts, (4) JES2 starts, (5) Started tasks begin (CICS, DB2, VTAM).\n\nQ: What is a Parallel Sysplex?\nA: A cluster of up to 32 z/OS systems sharing a Coupling Facility. Benefits: automatic failover, rolling maintenance, workload balancing, DB2 data sharing.\n\nQ: How does RACF protect resources?\nA: RACF uses profiles to define access rules. Checks discrete profile, then generic profile, evaluates access level (NONE/READ/UPDATE/CONTROL/ALTER), logs to SMF Type 80."
    }
  ]
};
