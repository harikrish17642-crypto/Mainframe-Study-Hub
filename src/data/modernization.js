export const MODERNIZATION_TOPIC = {
  id:"modernization", icon:"🔀", title:"Modernization", subtitle:"IBM Z Modernization Strategies", color:"#a855f7", level:"All Levels",
  description:"The future of mainframe is hybrid, API-first, and DevOps-enabled. Modernize without migration risk.",
  sections:[
    { title:"Modernization Landscape", level:"Beginner",
      content:`Mainframe modernization is the #1 strategic initiative at most large enterprises. But "modernization" means very different things to different stakeholders.

The 6Rs of Modernization:
  1. Retire      — Identify and decommission unused applications
  2. Retain      — Keep as-is (if it works, don't touch it)
  3. Rehost      — Move to cloud with no code changes (lift & shift)
  4. Replatform  — Minor changes to leverage new infrastructure
  5. Refactor    — Restructure code for modern patterns (APIs, microservices)
  6. Replace     — Replace with SaaS or new application (most risk)

Why Most Enterprises DON'T Just "Move Off" Mainframe:
  • $3 trillion in daily transactions depend on mainframe reliability
  • 40+ years of embedded business rules in COBOL code
  • Rewrite projects have a 75% failure rate historically
  • Mainframe processing cost per transaction is actually lower than cloud
  • Compliance and audit requirements favor mainframe security

What "Modern Mainframe" Looks Like Today:
  • z/OS 3.1+ with container extensions (zCX)
  • COBOL programs exposed as REST APIs via z/OS Connect
  • CI/CD pipelines with Git, Jenkins, and IBM Dependency Based Build
  • Zowe CLI and VS Code replacing green screens
  • Hybrid multi-cloud integration with IBM Cloud Pak
  • Python, Node.js, Java running alongside COBOL on z/OS
  • AI integration for code analysis and testing

Modernization Anti-Patterns to Avoid:
  • "Big bang" rewrite — trying to rewrite everything at once
  • Ignoring data gravity — data is hardest to move
  • Underestimating business rules — decades of logic in code
  • Cloud-only thinking — not everything belongs in cloud
  • Neglecting skills — modernize people, not just technology`
    },
    { title:"API-First with z/OS Connect", level:"Intermediate",
      content:`z/OS Connect — Expose Mainframe as RESTful APIs:

z/OS Connect Enterprise Edition (z/OS Connect EE) transforms existing COBOL, CICS, IMS, and batch programs into modern REST/JSON APIs — without changing a single line of legacy code.

How It Works:
  1. z/OS Connect sits between consumers and backend systems
  2. It receives REST/JSON requests from web/mobile/cloud
  3. Transforms JSON → COBOL copybook format (or CICS COMMAREA)
  4. Invokes the existing program
  5. Transforms the response back to JSON
  6. Returns REST response to the consumer

Supported Backend Systems:
  • CICS Transaction Server (via CICS service provider)
  • IMS Transaction Manager (via IMS service provider)
  • Batch programs via z/OS Connect Batch service provider
  • DB2 via z/OS Connect DB2 service provider
  • MQ via z/OS Connect MQ service provider

API Architecture:
  Service → API → Operation

  Service:  Connects to backend (CICS, IMS, batch)
  API:      Groups operations under a base path
  Operation: Individual endpoint (GET /employees/{id})

Key Features:
  • OpenAPI 3.0 / Swagger specification auto-generated
  • JSON schema mapping from COBOL copybooks
  • API rate limiting and throttling
  • OAuth 2.0 and JWT authentication
  • API discovery and management
  • Request/response logging and auditing

Benefits:
  • Zero code changes to existing programs
  • Instant API economy participation
  • Mobile and web apps can now call mainframe
  • Microservices can integrate with mainframe data
  • API gateway integration (IBM API Connect, Apigee, Kong)`,
      code:`// Example: Calling a mainframe CICS program via REST API
// The COBOL program doesn't change — z/OS Connect handles everything

// Consumer (React/Node.js app) makes a simple REST call:
const response = await fetch('https://mainframe.company.com:9443/api/v1/employees/100234', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer <jwt-token>',
    'Content-Type': 'application/json'
  }
});

const employee = await response.json();
// Returns: { "empId": "100234", "name": "John Smith", "dept": "FIN", "salary": 85000.00 }

// POST example — create new employee
const newEmp = await fetch('https://mainframe.company.com:9443/api/v1/employees', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <jwt-token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "Jane Doe",
    "dept": "IT",
    "salary": 92000.00,
    "startDate": "2025-03-01"
  })
});
// Behind the scenes: JSON → COBOL copybook → CICS LINK → COBOL program
// The 40-year-old COBOL program processes it without knowing it came from a REST API`
    },
    { title:"DevOps & CI/CD on z/OS", level:"Intermediate",
      content:`DevOps for Mainframe — Modern Development Practices:

Mainframe development is adopting the same CI/CD practices as distributed systems. The tools are different, but the principles are identical.

Modern Mainframe DevOps Pipeline:

  1. CODE — Developer writes COBOL/JCL in VS Code (not ISPF)
     • Zowe Explorer extension for VS Code
     • Git for version control (replacing Endevor/Changeman in some shops)
     • COBOL Language Support extension (syntax highlighting, code completion)

  2. BUILD — Automated compilation
     • IBM Dependency Based Build (DBB)
     • Groovy build scripts (like Gradle for mainframe)
     • Only recompile changed programs and their dependents
     • Runs on z/OS USS (Unix System Services)

  3. TEST — Automated testing
     • IBM Z Virtual Test Platform (record & playback production transactions)
     • Unit testing frameworks (zUnit)
     • IBM Wazi Analyze for code analysis
     • Test in isolated environments (IBM Wazi Sandbox)

  4. DEPLOY — Automated deployment
     • IBM UrbanCode Deploy for z/OS
     • Ansible for z/OS automation
     • Blue-green deployments for CICS regions
     • Canary releases for batch programs

  5. MONITOR — Observability
     • IBM Z OMEGAMON for performance monitoring
     • SMF data exported to Splunk/ELK
     • OpenTelemetry integration
     • Grafana dashboards for z/OS metrics

Key DevOps Tools for Mainframe:
  Git              — Version control (replacing SCLM, Endevor for source)
  Jenkins/GitLab CI — Pipeline orchestration
  IBM DBB          — Dependency-based build on z/OS
  Ansible          — z/OS automation (ibm.ibm_zos collection)
  UrbanCode Deploy — Release management
  Zowe CLI         — Command-line z/OS interaction
  VS Code          — Modern IDE with Zowe extensions
  SonarQube        — Static code analysis for COBOL
  Artifactory      — Binary repository for load modules`,
      code:`# Ansible playbook for z/OS deployment
# File: deploy-cobol-app.yml
---
- name: Deploy COBOL Application to z/OS
  hosts: zos_prod
  collections:
    - ibm.ibm_zos_core

  vars:
    src_pds: "DEV.COBOL.SOURCE"
    load_pds: "PROD.LOADLIB"
    program: "PAYROLL"

  tasks:
    - name: Copy source from Git to z/OS PDS
      zos_copy:
        src: "/u/devops/git/payroll/src/PAYROLL.cbl"
        dest: "{{ src_pds }}({{ program }})"
        remote_src: true
        encoding:
          from: UTF-8
          to: IBM-1047

    - name: Compile COBOL program
      zos_job_submit:
        src: "/u/devops/jcl/compile.jcl"
        location: USS
        wait_time_s: 120
      register: compile_result

    - name: Verify compilation success
      assert:
        that: compile_result.jobs[0].ret_code.code <= 4
        fail_msg: "Compile failed with RC={{ compile_result.jobs[0].ret_code.code }}"

    - name: Run unit tests
      zos_job_submit:
        src: "/u/devops/jcl/unittest.jcl"
        location: USS
        wait_time_s: 300
      register: test_result

    - name: Deploy to production LOADLIB
      zos_copy:
        src: "DEV.LOADLIB({{ program }})"
        dest: "{{ load_pds }}({{ program }})"
        remote_src: true
        force: true
      when: test_result.jobs[0].ret_code.code == 0

    - name: Refresh CICS program definition
      zos_operator:
        cmd: "F CICSPROD,CEMT S PROG({{ program }}) NEW"
      when: test_result.jobs[0].ret_code.code == 0`
    },
    { title:"Zowe & Modern Tooling", level:"Intermediate",
      content:`Zowe — The Open Source Mainframe Framework:

Zowe is an open-source project (part of the Linux Foundation) that provides modern interfaces to z/OS. It's the single most important modernization tool for mainframe developers.

Zowe Components:

1. Zowe CLI (Command Line Interface):
   Interact with z/OS from your terminal — no 3270 needed.
   • Submit JCL jobs
   • Download/upload datasets and USS files
   • Query job status and output
   • Manage z/OSMF resources
   • Scriptable — use in CI/CD pipelines

2. Zowe Explorer (VS Code Extension):
   Browse and manage z/OS resources visually:
   • Dataset tree view (browse, edit, create PDS members)
   • USS file explorer
   • Job tree (submit, view output, purge)
   • Integrated terminal for Zowe CLI

3. Zowe API Mediation Layer:
   A gateway that provides:
   • Single sign-on (SSO) to all z/OS services
   • API catalog (discover available mainframe APIs)
   • Load balancing across z/OS services
   • TLS/SSL termination
   • Service discovery

4. Zowe Desktop (Virtual Desktop):
   Web-based desktop environment on z/OS:
   • 3270 terminal emulator in browser
   • MVS Explorer (datasets)
   • JES Explorer (jobs)
   • USS Explorer (Unix files)
   • Extensible with custom apps

Zowe Conformance Program:
  ISVs can certify their products as "Zowe Conformant"
  Ensures interoperability across the Zowe ecosystem
  Look for the Zowe Conformant badge on vendor products`,
      code:`# ─── Zowe CLI Examples ────────────────────────────────

# List datasets matching a pattern
zowe zos-files list ds "USER01.COBOL.*"

# Download a PDS member to local file
zowe zos-files download ds "USER01.COBOL.SOURCE(PAYROLL)" -f payroll.cbl

# Upload local file to z/OS dataset
zowe zos-files upload ftu payroll.cbl "USER01.COBOL.SOURCE(PAYROLL)"

# Submit JCL and wait for completion
zowe zos-jobs submit ds "USER01.JCL(COMPILE)" --wfo

# View job output (spool files)
zowe zos-jobs view sfbi JOB12345 2

# Execute TSO command
zowe zos-tso issue cmd "LISTDS 'USER01.COBOL.SOURCE' MEMBERS"

# Execute console command
zowe zos-console issue cmd "D A,L"

# ─── Zowe CLI in CI/CD Pipeline (Jenkins) ─────────────
# Jenkinsfile example:
# pipeline {
#   agent any
#   stages {
#     stage('Upload Source') {
#       steps {
#         sh 'zowe zos-files upload ftu src/PAYROLL.cbl "PROD.COBOL.SOURCE(PAYROLL)"'
#       }
#     }
#     stage('Compile') {
#       steps {
#         sh 'zowe zos-jobs submit ds "PROD.JCL(COMPILE)" --wfo --rfj'
#       }
#     }
#     stage('Test') {
#       steps {
#         sh 'zowe zos-jobs submit ds "PROD.JCL(UNITTEST)" --wfo --rfj'
#       }
#     }
#   }
# }`
    },
    { title:"z/OS Container Extensions (zCX)", level:"Advanced",
      content:`zCX — Run Docker Containers on z/OS:

z/OS Container Extensions (zCX) is a game-changer — it allows you to run Linux Docker containers directly on z/OS, inside a z/OS address space.

What zCX Enables:
  • Run Linux applications on z/OS without a separate Linux partition
  • Deploy Node.js, Python, Java, Go applications on z/OS
  • Use standard Docker images from Docker Hub
  • Co-locate middleware next to mainframe data (zero network latency)
  • Run modern databases (MongoDB, PostgreSQL) on z/OS

Architecture:
  z/OS → zCX Address Space → Docker Engine → Containers
  Each zCX instance is a z/OS address space running a Linux kernel
  Containers see a standard Linux environment
  Networking bridges z/OS TCP/IP and container networking

Use Cases:
  • API gateway (Kong, Nginx) running next to CICS
  • Monitoring agents (Prometheus, Grafana) on z/OS
  • Microservices that need direct access to mainframe data
  • Development tools (Git servers, CI/CD agents)
  • Data transformation services (ETL in Python/Node.js)
  • Machine learning inference models close to data

Performance Benefits:
  • Zero network hop between container and z/OS data
  • z/OS I/O subsystem for data access
  • Hardware compression and encryption
  • Shared memory communication with z/OS services

Limitations:
  • x86 Docker images won't work (must be s390x architecture)
  • Not all Linux apps are available for s390x
  • Resource allocation through z/OS WLM
  • Requires z/OS 2.4+ and z15 or z16 hardware`,
      code:`# ─── zCX Docker Commands (from z/OS USS or SSH) ──────

# Pull an s390x image
docker pull --platform linux/s390x node:18-alpine

# Run a Node.js API server next to CICS
docker run -d \\
  --name api-gateway \\
  --platform linux/s390x \\
  -p 3000:3000 \\
  -e DB2_HOST=localhost \\
  -e DB2_PORT=446 \\
  -e CICS_HOST=localhost \\
  -e CICS_PORT=3001 \\
  my-api-gateway:latest

# Run Prometheus monitoring
docker run -d \\
  --name prometheus \\
  --platform linux/s390x \\
  -p 9090:9090 \\
  -v /etc/prometheus:/etc/prometheus \\
  prom/prometheus:latest

# Run Grafana dashboard
docker run -d \\
  --name grafana \\
  --platform linux/s390x \\
  -p 3001:3000 \\
  grafana/grafana:latest

# Check running containers
docker ps

# View container logs
docker logs api-gateway --follow`
    },
    { title:"Hybrid Cloud Integration", level:"Advanced",
      content:`Hybrid Cloud — Connecting Mainframe to Cloud:

Most enterprises run a hybrid model: mission-critical workloads on mainframe, innovation workloads in cloud, connected via APIs and event streams.

Integration Patterns:

1. API Integration:
   Mainframe exposes APIs via z/OS Connect
   Cloud apps consume these APIs
   API gateway manages traffic, security, rate limiting
   Tools: IBM API Connect, Apigee, Kong

2. Event-Driven Integration:
   Mainframe publishes events to message queues
   Cloud services subscribe and react
   Tools: IBM MQ, Kafka on z/OS, CICS Event Processing

3. Data Integration:
   Replicate mainframe data to cloud databases
   Real-time CDC (Change Data Capture) from DB2
   Tools: IBM InfoSphere CDC, Debezium, IBM DataStage

4. File Transfer:
   Batch file exchange between mainframe and cloud
   Secure managed file transfer (MFT)
   Tools: IBM Sterling Connect:Direct, SFTP

5. Direct Database Access:
   Cloud apps connect directly to DB2 for z/OS
   DRDA protocol over TCP/IP
   JDBC/ODBC drivers for DB2 z/OS

IBM Cloud Pak for Integration on Z:
   • API management
   • Application integration (App Connect)
   • Messaging (MQ)
   • Event streaming (Kafka)
   • High-speed data transfer

AWS/Azure/GCP Mainframe Integration:
   • AWS Mainframe Modernization service
   • Azure Logic Apps with IBM 3270 connector
   • GCP Cloud Run calling mainframe APIs
   • All major clouds have mainframe connector partners

Security Considerations:
   • TLS 1.3 for all API communication
   • Mutual TLS (mTLS) for service-to-service
   • RACF integration with cloud IAM
   • API key and OAuth 2.0 token management
   • Data encryption in transit and at rest
   • Compliance: data residency requirements`
    },
    { title:"COBOL Modernization Techniques", level:"Intermediate",
      content:`Modernizing COBOL Code — Practical Approaches:

You don't need to rewrite COBOL to modernize it. These techniques bring COBOL into the modern era while preserving business logic.

1. COBOL-to-API Pattern:
   Keep COBOL business logic unchanged
   Wrap with z/OS Connect or CICS web services
   Expose as REST/JSON APIs
   New frontends (React, Angular) call the APIs
   Result: 40-year-old logic, modern UI

2. Refactoring to Services:
   Identify cohesive business functions in monolithic programs
   Extract into smaller, independent COBOL programs
   Each becomes a callable service
   Enables composition and reuse
   Gradually decompose monoliths

3. Modern COBOL Features (Enterprise COBOL V6+):
   • JSON GENERATE / JSON PARSE — native JSON handling
   • XML GENERATE / XML PARSE — native XML support
   • UTF-8 support (PIC N for national characters)
   • Dynamic-length items
   • Longer data names (up to 30 characters)
   • FREE format source (no column restrictions)
   • Improved debugging with DWARF symbols

4. COBOL + Java Interop:
   Call Java methods from COBOL (and vice versa)
   Use Java for complex tasks (HTTP calls, cloud SDKs)
   COBOL handles the business logic, Java handles integration
   Runs under Language Environment on z/OS

5. Code Analysis & Documentation:
   IBM Wazi Analyze — understand COBOL application structure
   EZSource — visualize program dependencies
   IBM Application Discovery — map business rules
   Generate documentation from code automatically

6. Technical Debt Reduction:
   Remove dead code (IBM Application Discovery identifies it)
   Standardize coding patterns across programs
   Introduce COPY members for common structures
   Add proper error handling where missing
   Replace GO TO logic with structured programming

Testing Modernization:
   IBM Z Virtual Test Platform — record production data
   Use recorded data for automated regression testing
   No more manual testing of 10,000+ batch programs
   Test in parallel with production — "virtual environment"`
    },
    { title:"Linux on IBM Z", level:"Intermediate",
      content:`Linux on Z — Open Source Meets Enterprise:

IBM Z hardware runs Linux natively alongside z/OS. This gives you the best of both worlds: mainframe reliability with the Linux ecosystem.

Linux on Z Options:

1. Linux on LPAR:
   Dedicated logical partition running Linux
   Direct access to hardware resources
   Best performance for Linux workloads
   Distributions: RHEL, SUSE, Ubuntu for s390x

2. Linux on z/VM:
   z/VM hypervisor runs many Linux guests
   Extremely efficient — thousands of Linux instances on one machine
   Virtual networking between guests
   Dynamic resource sharing

3. Linux in zCX (z/OS Container Extensions):
   Docker containers on z/OS
   Tightest integration with z/OS
   No separate partition needed

Architecture (s390x):
   Linux on Z uses the s390x architecture
   Compatible with standard Linux but compiled for IBM Z processors
   Most open-source software is available for s390x
   Docker images must be s390x or multi-arch

What Runs on Linux on Z:
   • Web servers (Apache, Nginx)
   • Application servers (WildFly, Tomcat, Node.js)
   • Databases (PostgreSQL, MariaDB, MongoDB)
   • Container platforms (Kubernetes, OpenShift)
   • AI/ML frameworks (TensorFlow, PyTorch)
   • DevOps tools (Jenkins, Ansible, Git)
   • Monitoring (Prometheus, Grafana, ELK)
   • Message brokers (Kafka, RabbitMQ)

Red Hat OpenShift on Z:
   Full Kubernetes platform on IBM Z
   Run containerized workloads on mainframe hardware
   Hybrid cloud management across x86 and Z
   Operator framework for automated management

Performance Advantages:
   • Crypto Express cards for hardware encryption
   • Compression acceleration (hardware zEDC)
   • High I/O throughput (FICON channels)
   • Memory — up to 40 TB per system
   • Vertical scaling — massive single instances
   • 99.999%+ availability architecture`
    },
    { title:"SMF & Performance Monitoring", level:"Advanced",
      content:`SMF (System Management Facilities) — z/OS Telemetry:

SMF is the built-in instrumentation of z/OS. Every significant event generates an SMF record — job execution, dataset access, security events, DB2 activity, CICS transactions, and more.

SMF Record Types (Key ones):

  Type 14/15 — Dataset activity (open/close, I/O counts)
  Type 30    — Job/step information (CPU, I/O, memory, timestamps)
  Type 42    — Storage management (SMS statistics)
  Type 70-79 — System resource usage (CPU, channels, paging)
  Type 80    — RACF security events
  Type 89    — Usage data (product registration)
  Type 100   — DB2 accounting
  Type 101   — DB2 buffer pool statistics
  Type 102   — DB2 performance
  Type 110   — CICS transaction data
  Type 120   — WebSphere MQ statistics

Using SMF Data:

  1. Collection: SMF writes records to SMF datasets (SYS1.MANx)
  2. Dumping: IFASMFDP utility dumps to sequential datasets
  3. Processing: Programs read and analyze the records
  4. Reporting: IBM OMEGAMON, BMC MainView, or custom reports

Performance Tuning Methodology:
  1. Establish baseline metrics (normal state)
  2. Identify bottlenecks (CPU, I/O, memory, enqueue waits)
  3. Analyze workload patterns (peak hours, batch windows)
  4. Apply tuning changes (one at a time)
  5. Measure impact and compare to baseline
  6. Iterate

Key Performance Metrics:
  CPU utilization — % of processor capacity used
  I/O rates — EXCP count per dataset
  Paging rate — pages moved to/from auxiliary storage
  Enqueue waits — contention for shared resources
  Channel busy — I/O path saturation
  Batch elapsed time — wall clock time for batch jobs
  CICS response time — average transaction response

WLM (Workload Manager):
  Controls resource allocation across all z/OS workloads
  Service classes define performance goals
  WLM dynamically adjusts resources to meet goals
  Batch, CICS, DB2, IMS all managed by WLM
  Report classes group workloads for monitoring

Modern Monitoring Integration:
  SMF → Kafka → Splunk/ELK — real-time log analysis
  zHyperLink — ultra-low-latency storage monitoring
  IBM Z Operational Log and Data Analytics (IZOLDA)
  Grafana dashboards with z/OS metrics`
    },
    { title:"PROCs & DFSORT Mastery", level:"Intermediate",
      content:`PROCs and Utilities — Production Workhorses:

Catalogued procedures (PROCs) and utility programs form the backbone of mainframe production processing. Mastering them is essential.

DFSORT / ICETOOL Advanced Techniques:

DFSORT can replace many COBOL programs for data manipulation:

SPLICE — Join records from multiple files (like SQL JOIN):
  Join employee master with transaction file using ICETOOL SPLICE
  Match on key field, merge data from both files

OCCUR — Count occurrences of field values:
  ICETOOL OCCUR: how many employees per department
  Like SQL GROUP BY with COUNT

RANGE — Select records with values in a range:
  ICETOOL RANGE FROM(field) TO(field) ON(field)

DISPLAY — Create formatted reports:
  ICETOOL DISPLAY with headers, totals, page breaks

DFSORT Symbols:
  Use symbolic parameters in SORT control statements
  Pass values from JCL SET statement to SORT
  Dynamic INCLUDE/OMIT criteria

DFSORT Tricks:
  • Generate sequence numbers: OUTREC FIELDS=(SEQNUM,8,ZD)
  • Date formatting: OUTREC FIELDS=(1,8,Y4T,TRAN=MDYY)
  • Conditional output: IFTHEN=(WHEN=(...),...)
  • Padding and trimming: SQZ, TRAN=LTRIM/RTRIM
  • Lookup tables: JOINKEYS for matching

ICETOOL Multi-File Operations:
  Process multiple operations in a single job step
  Chain operations: SORT → SPLICE → DISPLAY
  Error handling with SET MAXCC

Production PROC Best Practices:
  • Use meaningful symbolic parameter names
  • Always provide default values
  • Include standard error handling
  • Document parameters in comments
  • Version PROCs with date/change markers
  • Test with TYPRUN=SCAN before production use`,
      code:`//* ─── ICETOOL: Join two files (like SQL JOIN) ─────────
//JOINJOB  EXEC PGM=ICETOOL
//TOOLMSG  DD SYSOUT=*
//DFSMSG   DD SYSOUT=*
//MASTER   DD DSN=MY.EMPLOYEE.MASTER,DISP=SHR       ← File 1
//TRANS    DD DSN=MY.MONTHLY.TRANSACTIONS,DISP=SHR   ← File 2
//JOINED   DD DSN=MY.JOINED.OUTPUT,                   ← Output
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(20,10),RLSE),
//            DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//TOOLIN   DD *
  SPLICE FROM(MASTER) TO(JOINED) ON(1,6,CH) -
        USING(CTL1) WITHALL WITH(TRANS)
/*
//CTL1CNTL DD *
  SORT FIELDS=(1,6,CH,A)
  OUTREC FIELDS=(1,100,            From master record
                 101:1,6,           Employee ID
                 107:50,8,ZD,EDIT=(IIIIIIIT.TT),  Transaction amount
                 115:70,10)         Transaction desc
/*
//*
//* ─── DFSORT: Conditional reformatting with IFTHEN ──
//CONDFMT  EXEC PGM=SORT
//SORTIN   DD DSN=MY.INPUT.FILE,DISP=SHR
//SORTOUT  DD DSN=MY.OUTPUT.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE)
//SYSIN    DD *
  SORT FIELDS=(1,6,CH,A)
  OUTREC IFTHEN=(WHEN=(80,1,CH,EQ,C'A'),
                  OVERLAY=(90:C'ACTIVE   ')),
         IFTHEN=(WHEN=(80,1,CH,EQ,C'I'),
                  OVERLAY=(90:C'INACTIVE ')),
         IFTHEN=(WHEN=NONE,
                  OVERLAY=(90:C'UNKNOWN  '))
/*
//SYSOUT   DD SYSOUT=*`
    },
    { title:"SMP/E — System Modification Program", level:"Advanced",
      content:`SMP/E (System Modification Program/Extended):

SMP/E is the software lifecycle manager for z/OS. It handles installation, maintenance, and tracking of all z/OS software products and their fixes.

Why SMP/E Matters:
  Every z/OS product, PTF (fix), APAR (bug report), and service update is managed by SMP/E. Understanding SMP/E is critical for system programmers.

SMP/E Concepts:

  SYSMOD (System Modification):
    The unit of change managed by SMP/E.
    Types:
    • FUNCTION — A new product or feature (base install)
    • PTF — Program Temporary Fix (a bug fix)
    • APAR — Authorized Program Analysis Report (bug report)
    • USERMOD — User-written modification
    • HOLDDATA — Information about fix dependencies

  CSI (Consolidated Software Inventory):
    SMP/E's database. Tracks everything installed on the system.
    Three zones:
    • GLOBAL zone — Master record of all SYSMODs received
    • TARGET zone — Tracks what's installed in target libraries (live)
    • DLIB zone — Tracks distribution libraries (backup/source)

  Target Libraries:
    Where active code runs from. E.g., SYS1.LINKLIB, SYS1.MACLIB
    Updated by SMP/E APPLY command.

  Distribution Libraries (DLIBs):
    Backup/source copies. Used to rebuild target libraries.
    Updated by SMP/E ACCEPT command.

SMP/E Commands:

  RECEIVE — Bring a SYSMOD into the GLOBAL zone
    Reads fix tapes, FTP downloads, or HOLDDATA

  APPLY — Install SYSMOD into TARGET libraries
    Checks prerequisites and conflicts
    CHECK mode: simulate without installing
    APPLY CHECK — always run this first!

  ACCEPT — Copy SYSMOD to DISTRIBUTION libraries
    Permanent installation, harder to back out
    Run after testing confirms the fix works

  RESTORE — Remove a SYSMOD from TARGET libraries
    Back out a fix that caused problems
    Only works if not yet ACCEPTed

  LIST — Query the CSI for installed software
    Show what's installed, prerequisites, dependents

Maintenance Workflow:
  1. Download PTFs from IBM (ShopZ or FIXCAT)
  2. RECEIVE the PTFs into GLOBAL zone
  3. APPLY CHECK — verify prerequisites and no conflicts
  4. APPLY — install into target libraries
  5. IPL or refresh (if needed)
  6. Test the fix
  7. ACCEPT — permanent installation into DLIBs`
    },
    { title:"Mainframe Skills & Career Path", level:"All Levels",
      content:`Mainframe Career — High Demand, High Reward:

The mainframe skills gap is one of the biggest challenges in enterprise IT. As experienced mainframers retire, demand for mainframe skills is skyrocketing.

Career Paths:

1. Mainframe Application Developer:
   Skills: COBOL, JCL, DB2, CICS, VSAM
   Role: Write and maintain business applications
   Salary: $70K-$130K (US) depending on experience
   Demand: Very high — most unfilled positions

2. Mainframe Systems Programmer:
   Skills: z/OS internals, SMP/E, RACF, WLM, JES
   Role: Install, configure, and maintain z/OS
   Salary: $90K-$160K (US)
   Demand: Critical — aging workforce

3. Mainframe DBA (DB2):
   Skills: DB2, SQL, performance tuning, backup/recovery
   Role: Manage DB2 databases, optimize SQL, ensure availability
   Salary: $85K-$150K (US)
   Demand: High — DB2 on z/OS is mission-critical

4. Mainframe Security Administrator:
   Skills: RACF, ACF2, Top Secret, security compliance
   Role: Manage security policies, access control, auditing
   Salary: $95K-$155K (US)
   Demand: Very high — compliance-driven

5. Mainframe DevOps Engineer (Emerging):
   Skills: Zowe, Git, Jenkins, Ansible, z/OS Connect
   Role: Build CI/CD pipelines, modernize tooling
   Salary: $100K-$165K (US)
   Demand: Rapidly growing — every shop needs this

Learning Path Recommendation:

  Month 1-2: z/OS Fundamentals & TSO/ISPF
    → Understand the platform, navigate the environment

  Month 3-4: JCL Mastery
    → Job submission, dataset management, utilities

  Month 5-7: COBOL Programming
    → Learn the language, file handling, DB2 integration

  Month 8-9: VSAM & DB2
    → Data management, SQL, performance

  Month 10-11: CICS Transaction Processing
    → Online programming, BMS maps, CICS commands

  Month 12: Specialization
    → Choose: Security, Systems Programming, DevOps, or DBA

Certifications:
  • IBM Certified Developer — Mainframe Application
  • IBM Z Xplore badges (Concepts, Advanced, All Star)
  • IBM Certified System Administrator — z/OS
  • IBM Certified Database Administrator — DB2 for z/OS

Resources for Continuous Learning:
  • IBM Redbooks (free, in-depth technical guides)
  • SHARE conference (annual mainframe conference)
  • IBM Z Community (online forums and events)
  • Open Mainframe Project (Linux Foundation)
  • This website — Mainframe OS Hub!`
    },

    { title:"Zowe — Open Source Mainframe Interface", level:"Beginner",
      content:`Zowe provides modern interfaces to z/OS — CLI, REST APIs, and VS Code extension.

Components:
  Zowe CLI — Command-line access to z/OS from any workstation
  Zowe Explorer (VS Code) — Browse, edit, submit JCL from VS Code
  Zowe API Mediation Layer — API gateway for z/OS services
  Zowe Desktop — Web-based z/OS interface

Zowe CLI Examples:
  zowe zos-files list ds "MY.PDS.*" — List datasets
  zowe zos-files download ds "MY.FILE" — Download file
  zowe zos-jobs submit lf "my.jcl" — Submit JCL
  zowe zos-jobs list jobs — List jobs

VS Code + Zowe Explorer:
  Browse PDS members in VS Code file explorer.
  Edit COBOL, JCL, REXX with modern editor.
  Submit JCL and view output — all from VS Code.

Benefits:
  • Developers use familiar tools (VS Code, CLI, Git)
  • No 3270 emulator needed for basic tasks
  • Scriptable (CI/CD pipelines)
  • Open source (Apache 2.0 license)

Pro Tip: Zowe CLI + VS Code is the modern mainframe developer experience. Learn it — it's the future of z/OS interaction.`
    },

    { title:"z/OS Connect — REST APIs", level:"Intermediate",
      content:`z/OS Connect exposes mainframe programs as REST APIs automatically.

How It Works:
  1. COBOL program with COMMAREA/container interface (no changes needed)
  2. z/OS Connect generates API from program interface
  3. Maps: HTTP request → JSON → COBOL data structure → process → JSON → HTTP response

Creating an API:
  1. Build Service Archive (.sar) from CICS/IMS program
  2. Deploy to z/OS Connect server
  3. Configure endpoint (URL mapping)
  4. API available at https://server/api/v1/customers

Swagger/OpenAPI:
  z/OS Connect auto-generates Swagger documentation.
  Frontend developers see standard API docs.
  No mainframe knowledge needed to consume the API.

Supported Backends:
  CICS — Via CICS service provider
  IMS — Via IMS service provider
  DB2 — Via DB2 service provider
  MQ — Via MQ service provider

Pro Tip: z/OS Connect is the easiest way to REST-enable mainframe programs. Zero COBOL changes — just configuration.`
    },

    { title:"CI/CD for Mainframe", level:"Intermediate",
      content:`Modern DevOps pipelines for mainframe application delivery.

Pipeline Stages:
  1. Code (Git) → 2. Build (DBB/Rocket) → 3. Test (zUnit) → 4. Deploy (UCD/Ansible)

IBM Dependency Based Build (DBB):
  Compiles COBOL/PL1 on z/OS.
  Understands copybook dependencies — builds only what changed.
  Integrates with Jenkins/GitHub Actions.

Git for Mainframe:
  Source code in Git (not Endevor/ChangeMan).
  Feature branches, pull requests, code reviews.
  Same workflow as distributed development.

Testing:
  zUnit — Unit testing for COBOL
  IBM Debug for z/OS — Interactive debugging
  Galasa — Integration testing framework

Deployment:
  IBM UrbanCode Deploy (UCD) — Deploy to z/OS
  Ansible — Automate z/OS tasks
  Wazi Deploy — Cloud-native deployment to z/OS

Jenkins Pipeline Example:
  node { checkout → DBB build on z/OS → zUnit test → UCD deploy }

Pro Tip: Start with Git + DBB for build. Add testing and automated deployment incrementally. Don't try to change everything at once.`
    },

    { title:"IBM Wazi — Cloud IDE for Mainframe", level:"Intermediate",
      content:`IBM Wazi provides cloud-based development tools for mainframe.

Wazi for VS Code:
  VS Code extension for z/OS development.
  COBOL/PL1 language support (syntax, autocomplete).
  Integrated debugger for mainframe programs.
  Connect to z/OS or use local Wazi sandbox.

Wazi Sandbox:
  Local z/OS development environment.
  Runs on x86 (Docker/Podman container).
  Develop and test without mainframe access.
  Includes: COBOL compiler, CICS, DB2 (subset).

Wazi Analyze:
  Understand legacy code before modifying.
  Dependency graphs, impact analysis, complexity metrics.
  "What programs are affected if I change this copybook?"

Wazi Deploy:
  Cloud-native deployment to z/OS.
  Integrates with GitOps workflows.

Benefits:
  • Attract new developers (modern tools)
  • Faster development (local sandbox)
  • Better code quality (analysis tools)
  • CI/CD integration

Pro Tip: Wazi Sandbox lets new developers practice mainframe development without production mainframe access. Perfect for training.`
    },

    { title:"API Mediation Layer", level:"Advanced",
      content:`API gateway that unifies access to z/OS services.

What It Does:
  Single entry point for all z/OS APIs.
  Authentication, routing, load balancing, monitoring.

Components:
  API Gateway — Routes requests to backend services
  Discovery Service — Services register themselves
  API Catalog — Swagger/OpenAPI documentation portal
  Caching Service — Performance optimization

How It Works:
  Client → API Gateway → Discovers service → Routes to z/OS backend → Response
  All through HTTPS with SSO.

SSO (Single Sign-On):
  Authenticate once with API ML → Access all registered services.
  Supports: z/OS credentials, MFA, client certificates, JWT tokens.

Service Registration:
  z/OS Connect, CICS, IMS services register with Discovery Service.
  API Catalog shows all available APIs with documentation.

Benefits:
  • One URL to access all mainframe APIs
  • Consistent security and authentication
  • Auto-generated API documentation
  • Monitoring and rate limiting

Pro Tip: API Mediation Layer + z/OS Connect + Zowe = complete modernization stack. All open source or IBM-supported.`
    },

    { title:"Mainframe & Microservices", level:"Advanced",
      content:`Patterns for integrating mainframe with microservices architecture.

Strangler Fig Pattern:
  Gradually replace monolith functionality with microservices.
  Route specific endpoints to new services, rest to mainframe.
  Over time, more traffic goes to microservices.

API Wrapper:
  Wrap existing COBOL with REST API (z/OS Connect).
  Microservices call mainframe via API.
  No COBOL changes — just a new interface.

Event Streaming:
  Mainframe → MQ/Kafka → Microservices
  CICS/IMS transactions publish events.
  Microservices subscribe and react.

Data Synchronization:
  CDC (Change Data Capture) from DB2.
  IIDR (IBM InfoSphere Data Replication).
  Mainframe data → Kafka → Distributed database.

Hybrid Architecture:
  Core transactions: CICS/COBOL on z/OS (proven, fast)
  New features: Microservices on cloud (agile, scalable)
  Connected via: APIs, MQ, event streams

Anti-Pattern:
  Don't rewrite working COBOL to Java. Risk is enormous.
  Wrap, extend, connect — don't replace.

Pro Tip: "Modernize the interface, keep the engine" — wrap COBOL with APIs, build new features as microservices.`
    },

    { title:"Ansible for z/OS", level:"Intermediate",
      content:`Automate z/OS operations with Ansible — no agents needed.

IBM z/OS Core Collection:
  Ansible modules for z/OS operations:
  zos_data_set — Create, delete, manage datasets
  zos_copy — Copy files to/from z/OS
  zos_job_submit — Submit JCL and check results
  zos_tso_command — Execute TSO commands
  zos_operator — Issue operator commands

Example Playbook:
  - hosts: zos_servers
    tasks:
      - name: Submit batch job
        ibm.ibm_zos_core.zos_job_submit:
          src: PROD.JCL(PAYROLL)
          location: DATA_SET
        register: job_result
      - name: Check result
        assert:
          that: job_result.jobs[0].ret_code.code == 0

Use Cases:
  • Automated deployment (promote load modules)
  • Environment setup (create datasets, configure)
  • Health checks (verify systems, check jobs)
  • Disaster recovery automation

Benefits:
  Same Ansible for z/OS AND distributed — unified automation.

Pro Tip: Start with simple automation (dataset management, JCL submission). Build complexity gradually.`
    },

    { title:"Mainframe Testing Strategies", level:"Intermediate",
      content:`Modern testing approaches for mainframe applications.

Unit Testing (zUnit):
  Test individual COBOL paragraphs.
  Mock file I/O and DB2 calls.
  Assert expected output for given input.

Integration Testing:
  Test complete job streams end-to-end.
  Galasa framework — Define test scenarios declaratively.
  Automated: Setup test data → Run jobs → Verify output → Cleanup.

Regression Testing:
  Compare output before/after code changes.
  File compare utilities (SUPERC, DFSORT ICETOOL).
  Automated comparison in CI/CD pipeline.

Performance Testing:
  Measure impact of code changes on CPU/elapsed time.
  Compare SMF Type 30 before and after.
  Benchmark critical batch jobs.

Test Data Management:
  Subset production data for testing.
  Mask sensitive data (names, SSN, account numbers).
  IBM InfoSphere Optim for test data management.

Pro Tip: Automated testing on mainframe is achievable. Start with regression tests (compare output files) — highest value, lowest effort.`
    },


    { title:"Interview Questions", level:"All Levels",
      content:`Modernization Interview Questions — 15+ Q&A.

Q: What is mainframe modernization?
A: Updating mainframe applications using modern practices: APIs, DevOps, cloud integration, microservices patterns — while keeping core systems.

Q: What is Zowe?
A: Open-source framework for z/OS modernization. Zowe CLI, API Mediation Layer, Zowe Explorer (VS Code extension). Makes z/OS accessible to modern developers.

Q: What is IBM Z DevOps?
A: CI/CD pipelines for z/OS: Git for source control, Jenkins/IBM DBB for builds, automated testing, IDz for modern IDE experience.

Q: What are mainframe APIs?
A: Expose COBOL/CICS programs as REST APIs using CICS Web Services, z/OS Connect, or API Mediation Layer. Enables mobile/web access to mainframe data.

Q: Should we rewrite COBOL to Java?
A: Usually no. Risks: losing business logic, performance regression, huge cost. Better: wrap existing programs with APIs, modernize the interface layer.

💡 Study Tip: Know Zowe, z/OS Connect, API Mediation Layer, and DevOps pipeline concepts.`,
    },

    { title:"Modernization Cheat Sheet", level:"All Levels",
      content:`Modernization Quick Reference

═══ KEY TECHNOLOGIES ═══
Zowe — Open-source z/OS framework
z/OS Connect — API gateway for z/OS
IBM DBB — Dependency-based build
IDz — IBM Developer for z/OS (Eclipse)
Zowe Explorer — VS Code extension for z/OS

═══ MODERNIZATION APPROACHES ═══
API Enablement — Expose as REST/SOAP
DevOps — CI/CD pipelines for z/OS
Cloud Integration — Hybrid cloud patterns
UI Modernization — Replace 3270 with web`,
    },
    { title:"Interview Questions — Modernization", level:"All Levels",
      content:`Modernization Interview Questions:

Q: What is z/OS Connect and how does it work?
A: z/OS Connect Enterprise Edition transforms existing COBOL, CICS, and IMS programs into REST/JSON APIs without changing the legacy code. It acts as a middleware layer that receives REST requests, transforms JSON to COBOL copybook format, invokes the program, and returns JSON responses. It auto-generates OpenAPI 3.0 specs and supports OAuth 2.0 authentication.

Q: How would you implement CI/CD for mainframe applications?
A: Modern mainframe CI/CD uses: (1) Git for source control, (2) IBM Dependency Based Build (DBB) for compilation on z/OS, (3) Jenkins or GitLab CI for pipeline orchestration, (4) Zowe CLI for z/OS interaction from pipelines, (5) Automated testing with IBM Z Virtual Test Platform, (6) IBM UrbanCode Deploy for deployment management. The pipeline triggers on Git push, compiles only changed programs and dependents, runs tests, and promotes through environments.

Q: What is zCX and when would you use it?
A: z/OS Container Extensions lets you run Docker containers directly on z/OS. Use cases include: API gateways (Kong/Nginx) next to CICS, monitoring agents (Prometheus/Grafana), microservices needing direct mainframe data access, and development tools. Key limitation: containers must be s390x architecture, not x86.

Q: Compare the approaches: rewrite vs refactor vs wrap.
A: Rewrite = complete redevelopment on a new platform. Highest risk (75% failure rate), highest cost, but results in modern code. Refactor = restructure existing code into services/APIs while keeping COBOL. Moderate risk, preserves business logic. Wrap = expose existing programs as APIs via z/OS Connect without code changes. Lowest risk, fastest time-to-value, but doesn't address technical debt.

Q: How does Ansible work with z/OS?
A: The ibm.ibm_zos_core Ansible collection provides modules for z/OS automation: zos_copy (file transfer), zos_job_submit (JCL execution), zos_operator (console commands), zos_tso_command, zos_data_set (dataset management). Playbooks automate deployment, configuration, and operations across z/OS systems, enabling infrastructure-as-code for mainframes.

Q: What is SMP/E and why is it important?
A: SMP/E is the software lifecycle manager for z/OS. It handles installation and maintenance of all z/OS products and fixes. Key commands: RECEIVE (download fixes), APPLY CHECK (verify prerequisites), APPLY (install), ACCEPT (permanent). It tracks all software in a CSI database and manages dependencies between fixes.`
    },

    { title:"24 — DevOps for Mainframe", level:"Advanced",
      content:`DevOps practices adapted for mainframe.

Principles: Git version control, IBM DBB build, zUnit testing, Jenkins/GitLab CI, UrbanCode Deploy, Ansible.
Toolchain: Git (Rocket/IBM), IDz/VS Code + Zowe, IBM DBB, Jenkins, UrbanCode.
Challenges: Cultural shift, tooling integration, test environments, change management.

Pro Tip: Start with one application. Prove value with metrics before expanding.`,
      code:``
    },

    { title:"25 — VS Code + Zowe Development", level:"Intermediate",
      content:`Modern mainframe development using VS Code.

Zowe Explorer: Browse datasets, edit COBOL/JCL, submit JCL, view output.
Zowe CLI: zowe files list/download, zowe jobs submit/list, zowe console issue.
COBOL extension: Syntax highlighting, IntelliSense, copybook resolution.

Pro Tip: VS Code + Zowe is the fastest way to onboard new developers to mainframe.`,
      code:``
    },

    { title:"26 — IBM Wazi and Cloud Development", level:"Advanced",
      content:`Cloud-based mainframe development and testing.

Components: Wazi Analyze (dependencies), Wazi Code (IDE), Wazi Deploy (pipeline), Wazi Sandbox (personal z/OS on x86).
Wazi Analyze: Visualize call graphs, identify copybook dependencies, impact analysis.

Pro Tip: Use Wazi Analyze before any legacy COBOL changes — shows all downstream impacts.`,
      code:``
    },

    { title:"27 — API-Enabling Legacy Applications", level:"Advanced",
      content:`Expose mainframe logic as REST APIs without rewriting.

z/OS Connect EE: CICS/IMS transactions to REST/JSON. No COBOL changes. API management built in.
Flow: JSON request -> z/OS Connect -> COMMAREA -> CICS transaction -> response -> JSON.
Alternatives: CICS Web Services, MQ gateway, DataPower, Node.js + Zowe SDK.

Pro Tip: Start with read-only APIs (inquiries) — lowest risk.`,
      code:``
    },

    { title:"28 — Mainframe Data Modernization", level:"Intermediate",
      content:`Making mainframe data accessible to modern applications.

Patterns: Real-time API, CDC (Change Data Capture), Batch ETL, Replication, Virtualization.
CDC: Capture DB2/VSAM changes in real-time, stream to Kafka/cloud. Tools: IBM InfoSphere CDC, Attunity.
Cloud: AWS/Azure Mainframe Modernization, IBM Cloud Pak for Integration.

Pro Tip: CDC + Kafka is the most popular pattern for real-time mainframe data streaming.`,
      code:``
    },

    { title:"29 — Modernization Anti-Patterns", level:"Expert",
      content:`Common modernization mistakes.

1. Big Bang Rewrite: 75% fail (Gartner). Use incremental approach.
2. Lift and Shift: Same problems, higher cost. Refactor interfaces instead.
3. Ignoring Data Gravity: Moving apps without data kills performance. Use CDC.
4. Technology-First: Start with business problem, not technology choice.
5. Ignoring Operations: Modernize the entire pipeline, not just development.

Successful pattern: Assess -> API-enable -> Extend -> Refactor -> Never abandon mainframe.

Expert Tip: The most successful modernizations keep the mainframe as a powerful backend service.`,
      code:``
    },

    { title:"30 — Modernization Interview Q&A + Cheat Sheet", level:"Beginner",
      content:`Common modernization interview questions.

Q: What is modernization? A: Making mainframe apps accessible and integrated with modern tech.
Q: z/OS Connect? A: Exposes CICS/IMS as REST APIs without code changes.
Q: Zowe? A: Open-source framework for modern mainframe interaction.
Q: Should we rewrite COBOL? A: Usually no. API-enable and build new features in modern languages.

Cheat Sheet:
  Zowe — Open-source framework
  z/OS Connect — REST API gateway
  IBM DBB — Git-based build
  Wazi — Cloud dev/test
  Ansible — z/OS automation
  CDC — Real-time data streaming
  Strategy: API-enable > Extend > Refactor`,
      code:``
    },

    { title:"24 — DevOps for Mainframe", level:"Advanced",
      content:`DevOps practices adapted for mainframe.

Key Principles: Version control (Git), automated build (IBM DBB), automated testing (zUnit), CI/CD (Jenkins/GitLab with z/OS plugins), infrastructure as code (Ansible).

Toolchain: Git (Rocket/IBM), IBM DBB (build), zUnit (test), Jenkins/GitLab (pipeline), UrbanCode Deploy/Ansible (deploy).

Challenges: Cultural shift, tooling integration, expensive test environments, change management processes.

💡 Pro Tip: Start with a single application. Prove value with metrics before expanding.`,
      code:``
    },
    { title:"25 — VS Code + Zowe Development", level:"Intermediate",
      content:`Modern mainframe development using VS Code.

Zowe Explorer: Browse datasets/USS files, edit COBOL/JCL/REXX with syntax highlighting, submit JCL and view output, create/delete datasets.

Zowe CLI: zowe files list, zowe files download, zowe jobs submit, zowe jobs list, zowe console issue command.

COBOL Language Support: Syntax highlighting, IntelliSense, copybook resolution, error diagnostics.

💡 Pro Tip: VS Code + Zowe is the fastest way to onboard new developers to mainframe.`,
      code:``
    },
    { title:"26 — IBM Wazi Cloud Development", level:"Advanced",
      content:`Cloud-based mainframe development and testing.

Components: Wazi Analyze (understand app structure), Wazi Code (VS Code IDE), Wazi Deploy (automated deployment), Wazi Sandbox (personal z/OS on x86).

Wazi Analyze: Visualize COBOL call graphs, identify dependencies, impact analysis, generate documentation.

Benefits: Developers do not need mainframe access for development. Test environments on demand. Lower cost.

💡 Pro Tip: Use Wazi Analyze before making changes to legacy COBOL — shows all downstream impacts.`,
      code:``
    },
    { title:"27 — API-Enabling Legacy Applications", level:"Advanced",
      content:`Expose mainframe business logic as modern APIs without rewriting.

z/OS Connect EE: Transforms CICS/IMS transactions into REST/JSON APIs. No changes to COBOL programs. API management with rate limiting and security.

Flow: Existing CICS transaction -> z/OS Connect maps JSON to COMMAREA -> REST endpoint -> Mobile/web calls API.

Alternatives: CICS Web Services, MQ as API gateway, IBM DataPower, custom Node.js + Zowe SDK.

💡 Pro Tip: Start with read-only APIs (inquiries) — lowest risk. Then add update APIs with transaction management.`,
      code:``
    },
    { title:"28 — Mainframe Data Modernization", level:"Intermediate",
      content:`Making mainframe data accessible to modern applications.

Data Access Patterns: Real-time API (z/OS Connect), CDC/Change Data Capture (stream to Kafka/cloud), batch ETL, replication, data virtualization.

CDC: Capture DB2/VSAM changes in real-time. Stream to Kafka, cloud databases. Tools: IBM InfoSphere CDC, Attunity.

Cloud Integration: AWS/Azure Mainframe Modernization, IBM Cloud Pak, hybrid cloud patterns.

💡 Pro Tip: CDC + Kafka is the most popular pattern. Keeps mainframe as system of record while feeding real-time data to cloud.`,
      code:``
    },
    { title:"29 — Modernization Anti-Patterns", level:"Expert",
      content:`Common mistakes and how to avoid them.

Big Bang Rewrite: 75% fail (Gartner). Use incremental modernization instead.

Lift and Shift: Same problems, higher cost. Refactor interfaces, keep core on Z.

Ignoring Data Gravity: Moving apps but leaving data causes latency. Co-locate or use CDC.

Technology-First: Start with business problem, not technology choice.

Successful Pattern: Assess -> Expose (API-enable) -> Extend (new features in modern stack) -> Refactor (gradually extract services).

💡 Expert Tip: Most successful modernizations do NOT remove the mainframe. They make it a powerful backend behind modern interfaces.`,
      code:``
    },
    { title:"30 — Modernization Interview Q&A + Cheat Sheet", level:"Beginner",
      content:`Common interview questions.

Q: What is mainframe modernization? A: Making apps accessible, maintainable, and integrated with modern tech without replacing them.

Q: What is z/OS Connect? A: Exposes CICS/IMS/batch as REST/JSON APIs without code changes.

Q: What is Zowe? A: Open-source framework for modern mainframe interaction.

Q: Should we rewrite COBOL in Java? A: Usually no. API-enable COBOL and build new features in modern languages.

Cheat Sheet:
  Zowe — Open-source framework
  z/OS Connect — REST API gateway
  IBM DBB — Git-based build
  Wazi — Cloud dev/test
  Ansible for z/OS — Automation
  CDC — Change Data Capture
  Strategies: API-enable > Extend > Refactor`,
      code:``
    },
  ]
};
