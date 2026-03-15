export const SMF_TOPIC = {
  id:"smf", icon:"📊", title:"SMF & Performance", subtitle:"Monitoring, Measurement & Tuning", color:"#06b6d4", level:"Intermediate → Expert",
  description:"Every z/OS event generates telemetry. SMF records are the goldmine for performance analysis and capacity planning.",
  sections:[
    { title:"Introduction to SMF", level:"Intermediate",
      content:`SMF (System Management Facilities) is z/OS's built-in instrumentation system. Every significant event on z/OS generates an SMF record — from job execution to dataset access, security events, DB2 activity, and CICS transactions.

Why SMF Matters:
  • Every job's CPU time, I/O count, memory usage is recorded
  • Every dataset open/close is logged
  • Every security event (login, access denied) is tracked
  • DB2, CICS, MQ, IMS all write detailed SMF records
  • Billing, chargeback, capacity planning all depend on SMF

SMF Record Structure:
  Every SMF record starts with a standard header:
  • Record length (halfword)
  • System indicator flags
  • Record type (1 byte) — identifies what kind of event
  • Date and time stamps
  • System ID (which LPAR generated the record)

  After the header: record-specific data (varies by type)

SMF Datasets (SYS1.MANx):
  z/OS writes SMF records to active datasets (SYS1.MAN1, SYS1.MAN2, etc.)
  When one fills, z/OS switches to the next (automatic switching)
  IFASMFDP utility dumps records from MANx to permanent datasets
  Records are then available for analysis

SMF Collection Control:
  SMFPRMxx PARMLIB member controls what's collected:
  SYS(TYPE(30,70:79,80,89,100:102,110))
  — Collect types 30, 70-79, 80, 89, 100-102, 110

  Trade-offs:
  • More record types = more detail but more I/O and storage
  • Production: collect the types you actually analyze
  • Problem determination: may need to temporarily enable more types`
    },
    { title:"Key SMF Record Types", level:"Intermediate",
      content:`SMF Record Types — Essential Reference:

Job & Step Records:
  Type 4   — Step end (basic job info)
  Type 5   — Job end (basic)
  Type 30  — Common Address Space Work (the most important!)
    Subtypes:
    1 — Job/session start
    2 — Interval (for long-running)
    3 — Step/job termination
    4 — Step total
    5 — Job total
    Contains: CPU time, I/O count, memory, elapsed time, program name

Dataset Activity:
  Type 14  — Dataset close (input datasets)
  Type 15  — Dataset close (output datasets)
  Type 42  — SMS statistics
  Type 62  — VSAM activity
  Type 64  — VSAM component statistics
  Contains: dataset name, I/O count, volume, device type

System Resources:
  Type 70  — Processor activity (CPU utilization per processor)
  Type 71  — Paging activity
  Type 72  — Workload activity (WLM service classes)
  Type 73  — Channel path activity
  Type 74  — Device activity
  Type 75  — Page/swap dataset activity
  Type 78  — I/O queuing activity
  Type 79  — Coupling Facility activity

Security:
  Type 80  — RACF processing (every security decision)
  Type 81  — RACF initialization
  Type 83  — RACF audit records

DB2:
  Type 100 — DB2 accounting (per thread/user)
  Type 101 — DB2 buffer pool and EDM pool statistics
  Type 102 — DB2 performance data (locking, logging, I/O)

CICS:
  Type 110 — CICS transaction data
    Contains: transaction ID, response time, CPU, I/O, abend info
    The primary source for CICS performance analysis

MQ:
  Type 115 — MQ accounting
  Type 116 — MQ statistics

UNIX System Services:
  Type 92  — USS process data

Usage:
  Type 89  — Product usage (for licensing)`
    },
    { title:"WLM — Workload Manager", level:"Advanced",
      content:`WLM (Workload Manager) — z/OS Performance Control:

WLM is the brain of z/OS performance management. It dynamically allocates resources (CPU, memory, I/O priority) to ensure each workload meets its performance goals.

WLM Concepts:

  Service Class:
  Defines a performance goal for a group of work.
  Examples:
    • PRDONLN — Production online (response time < 0.5 sec)
    • PRDBATCH — Production batch (velocity 50%)
    • TSOHIGH — TSO interactive (response time < 1 sec)

  Goal Types:
  • Response Time — average or percentile target (for online)
  • Velocity — percentage of time the work is not waiting (for batch)
  • Discretionary — no goal, use leftover resources

  Service Class Periods:
  Each service class can have up to 8 periods
  Work moves through periods as it consumes resources
  Period 1: highest importance, best resources
  Period 2+: lower importance as work ages

  Classification Rules:
  How WLM assigns work to service classes:
  • Subsystem type (JES, CICS, DB2, TSO, etc.)
  • Transaction name (CICS)
  • Job name or account info (batch)
  • User ID or group
  • Scheduling environment

  Report Classes:
  Group work for reporting without affecting scheduling
  Used for monitoring and measurement

WLM Policy Management:
  Service definition created via WLM ISPF panels or API
  Activated by system programmer
  Can be changed dynamically (no IPL needed)
  VARY WLM,POLICY=policyname — switch active policy

WLM Tuning Process:
  1. Define service classes with performance goals
  2. Create classification rules to route work to correct classes
  3. Monitor actual performance vs goals (RMF reports)
  4. Adjust goals, classification, or resource allocation
  5. Repeat

Key Principle: WLM is goal-oriented, not resource-oriented
  You define WHAT performance you want, not HOW to achieve it
  WLM figures out the resource allocation automatically`
    },
    { title:"RMF — Resource Measurement Facility", level:"Advanced",
      content:`RMF (Resource Measurement Facility):

RMF is the primary performance monitoring tool for z/OS. It collects, stores, and displays performance data from SMF and direct measurement.

RMF Components:

  Monitor I (Long-term):
  Collects data at intervals (typically 15 minutes)
  Writes to SMF datasets for batch reporting
  Used for: capacity planning, trend analysis, SLA reporting

  Monitor II (Short-term):
  Real-time display of system activity
  Session-based, interactive via TSO/ISPF
  Used for: problem determination, real-time monitoring

  Monitor III (Address Space):
  Detailed per-address-space data
  Shows CPU, I/O, wait states for specific jobs
  Used for: individual job performance analysis

  Postprocessor:
  Batch program that reads SMF/RMF data and creates reports
  Formats: text reports, CSV for spreadsheets, XML
  Custom reporting with ERBRMFPP

Key RMF Reports:

  CPU Activity:
  • CPU utilization by processor type (CP, zIIP, zAAP)
  • LPAR CPU usage and capping
  • Service units consumed per address space

  Memory:
  • Real storage utilization and paging rates
  • Auxiliary storage (page datasets) usage
  • Working set sizes per address space
  • 64-bit memory usage

  I/O:
  • Channel path utilization
  • Device busy and pending rates
  • Response time components (connect, disconnect, pending)
  • Cache hit ratios (DS8000 storage)

  Workload:
  • WLM service class performance vs goals
  • Transaction response times
  • Batch job execution times
  • Goal achievement percentages
  • Delay analysis (CPU, I/O, storage, queue delays)

  Coupling Facility:
  • CF structure utilization
  • Request rates and response times
  • Duplexing statistics
  • Path busy analysis`
    },
    { title:"Batch Performance Tuning", level:"Advanced",
      content:`Batch Job Performance Tuning:

Batch processing is the backbone of mainframe workloads. Optimizing batch jobs can save hours in processing windows and reduce costs.

Identifying Bottlenecks:

  1. CPU Bound:
     High CPU time relative to elapsed time
     CPU usage ratio (CPU/elapsed) near 1.0
     Tune: optimize program logic, use COMP-3 for arithmetic,
           reduce unnecessary PERFORM loops, use SORT instead of COBOL

  2. I/O Bound:
     High EXCP (I/O) count
     Large gap between CPU time and elapsed time
     Tune: increase BLKSIZE, buffer with BUFNO/BUFND,
           use VSAM LSR (Local Shared Resources), reduce file operations

  3. Memory Bound:
     Excessive paging (page faults)
     REGION too small
     Tune: increase REGION, optimize data structures,
           use 64-bit addressing for large tables

  4. Enqueue Bound:
     Waiting for exclusive access to resources
     Contention for datasets or system resources
     Tune: use DISP=SHR where possible, reduce lock duration,
           schedule conflicting jobs sequentially

Tuning Techniques:

  DFSORT vs COBOL:
  DFSORT is 10-100x faster than COBOL for sort/merge/copy
  Use DFSORT for data transformation when possible
  ICETOOL for multi-step operations in one program

  BLKSIZE Optimization:
  Larger blocks = fewer I/O operations
  Optimal: largest multiple of LRECL fitting in half a track
  For 3390: half track = 27,998 bytes
  BLKSIZE=0 lets SMS/system choose optimal size

  VSAM Buffers:
  BUFND (data buffers) and BUFNI (index buffers)
  More buffers = fewer I/O operations
  For sequential: BUFND=5-10 is usually sufficient
  For random: BUFND = number of concurrent requests
  For batch sequential: BUFND=20-50 can dramatically help

  DB2 Tuning for Batch:
  COMMIT frequency — too frequent hurts, too infrequent risks
  FETCH FIRST n ROWS — limit result sets
  Use LOAD utility instead of INSERT for bulk data
  Bind with ISOLATION(UR) for read-only jobs

  Parallel Processing:
  Split large files and process segments concurrently
  Use GDG generations for parallel output
  Partition by key ranges across multiple steps/jobs
  z/OS Parallel Sysplex for cross-system parallelism`
    },
    { title:"CICS Performance Monitoring", level:"Advanced",
      content:`CICS Performance — Response Time Analysis:

CICS transaction response time is the most visible performance metric for online systems. Users notice when transactions slow down.

Response Time Decomposition:
  Total Response = CPU + I/O Wait + Network + Queue + Other

  CPU Time:
  Time spent executing application code and CICS system code
  Measured by SMF 110 records

  I/O Wait:
  Time waiting for VSAM, DB2, MQ, or file I/O
  Often the largest component

  Network Time:
  Time for terminal I/O (3270) or TCP/IP communication
  Less relevant for API-driven transactions

  Queue Time:
  Time waiting for a CICS thread (MAXTASK limit)
  Indicates CICS region is overloaded

  Suspend Time:
  Time waiting for locks, enqueues, or other resources

Monitoring Tools:
  CICS Performance Analyzer (CPA):
  Reads SMF 110 records, produces detailed reports
  Transaction-level and region-level analysis
  Historical trending and comparison

  CICS Statistics:
  CEMT INQUIRE STATS — current statistics
  CICS statistics intervals (recorded to SMF)
  File, program, transaction, and region statistics

  OMEGAMON for CICS:
  Real-time monitoring of CICS regions
  Alert on response time thresholds
  Drill-down from transaction to program to DB2 call

Key CICS Tuning Areas:
  1. MAXTASK — max concurrent transactions (too low = queuing)
  2. DSA/EDSA size — memory allocation for CICS region
  3. Program compression — reclaim storage from inactive programs
  4. VSAM LSR pools — shared buffer pools for VSAM files
  5. DB2 thread reuse — avoid thread create/destroy overhead
  6. Autoinstall — dynamic resource management
  7. CICS MRO/ISC — cross-region workload balancing`
    },
    { title:"Capacity Planning", level:"Expert",
      content:`Capacity Planning — Right-Sizing IBM Z:

Capacity planning ensures you have enough resources for current and future workloads — without over-spending.

Capacity Planning Methodology:

  1. Baseline:
     Measure current resource utilization
     CPU (MSU), memory, I/O, disk space
     By workload: batch, online, DB2, development
     During: normal operations, peak periods, month-end

  2. Growth Projection:
     Business growth forecast (transactions, users, data volume)
     New application deployments
     Migration workloads (moving to Z or away from Z)
     Seasonal patterns

  3. What-If Analysis:
     Model scenarios: new application, hardware upgrade, consolidation
     IBM SCRT (Sub-Capacity Reporting Tool) data
     IBM zPCR (Processor Capacity Reference) for hardware comparisons
     IBM IZUAM (Usage and Accounting Manager)

  4. Recommendation:
     Hardware upgrade timing and sizing
     Software tier optimization (MLC pricing)
     Workload distribution across LPARs
     zIIP offload opportunities

IBM Z Pricing (MLC — Monthly License Charge):
  Based on rolling 4-hour average (R4HA) of MSU consumption
  Calculated per LPAR and aggregated
  Tailored Fit Pricing — flat monthly fee based on capacity
  Container pricing — pay per container on zCX

MSU (Million Service Units):
  Standard measure of z/OS processing capacity
  Each processor model has an MSU rating
  z16 A01 (single book) ≈ 8,000+ MSU
  Sub-capacity licensing: pay for what you use

Cost Optimization:
  • zIIP offload: DB2, Java, XML, TLS — free processors
  • WLM tuning: reduce peak MSU through workload spreading
  • Batch window optimization: spread batch across off-peak hours
  • zEDC compression: reduce I/O costs
  • Container pricing for zCX workloads
  • Tailored Fit Pricing for predictable costs

Tools:
  IBM zPCR — compare processor models
  IBM SCRT — sub-capacity usage reporting
  BMC Cost Analyzer — detailed chargeback
  Broadcom MICS — capacity and performance analysis`
    },
    { title:"IFASMFDP & SMF Processing", level:"Intermediate",
      content:`Processing SMF Data — From Raw Records to Insight:

SMF records must be processed to be useful. Here's the complete workflow:

Step 1: Dump SMF Records (IFASMFDP):
  Copies records from active SYS1.MANx datasets to permanent storage.
  Can filter by: record type, date/time range, system ID, job name.

Step 2: Sort/Filter (DFSORT or ICETOOL):
  Sort and filter SMF records for specific analysis.
  Extract specific record types, date ranges, or job names.

Step 3: Analyze (Custom programs or tools):
  Write COBOL or REXX programs to read and format records
  Use IBM reporting tools (RMF Postprocessor, CPA)
  Export to external tools (Splunk, ELK, Grafana)

Step 4: Report/Alert:
  Generate reports for management
  Set up alerts for threshold violations
  Feed dashboards for real-time visibility`,
      code:`//* ─── DUMP SMF RECORDS ────────────────────────────────
//SMFDUMP  EXEC PGM=IFASMFDP
//DUMPIN   DD DSN=SYS1.MAN1,DISP=SHR        ← Active SMF dataset
//DUMPOUT  DD DSN=MY.SMF.DUMP,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(100,50),RLSE),
//            DCB=(RECFM=VBS,LRECL=32760,BLKSIZE=0)
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  INDD(DUMPIN,OPTIONS(DUMP))
  OUTDD(DUMPOUT,TYPE(30,80,100:102,110))
  DATE(2025060,2025061)
  START(0000)
  END(2359)
/*
//*
//* ─── SORT SMF TYPE 30 BY JOB NAME ──────────────────
//SMFSORT  EXEC PGM=SORT
//SORTIN   DD DSN=MY.SMF.DUMP,DISP=SHR
//SORTOUT  DD DSN=MY.SMF.TYPE30.SORTED,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(50,25),RLSE)
//SYSIN    DD *
  SORT FIELDS=(19,8,CH,A)
  INCLUDE COND=(6,1,BI,EQ,X'1E')
/*
//SYSOUT   DD SYSOUT=*
//*
//* ─── EXPORT SMF TO CSV (for Splunk/ELK) ────────────
//* Custom REXX or COBOL program reads SMF records
//* and creates CSV output for external tools
//EXPORT   EXEC PGM=SMFTOCSV
//STEPLIB  DD DSN=MY.TOOLS.LOADLIB,DISP=SHR
//INPUT    DD DSN=MY.SMF.DUMP,DISP=SHR
//OUTPUT   DD DSN=MY.SMF.CSV,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(50,25),RLSE),
//            DCB=(RECFM=VB,LRECL=2048,BLKSIZE=0)
//PARMS    DD *
  TYPES=30,110
  FORMAT=CSV
  FIELDS=JOBNAME,CPU_TIME,ELAPSED,EXCP_COUNT,STEPNAME
/*`
    },
    { title:"Interview Questions — Performance", level:"All Levels",
      content:`Performance & SMF Interview Questions:

Q: What is an SMF record and why is it important?
A: SMF (System Management Facilities) records are z/OS event logs generated automatically for significant system events. Each record type captures specific data: Type 30 for job/step info, Type 80 for security, Type 100-102 for DB2, Type 110 for CICS. They're essential for performance analysis, capacity planning, billing, security auditing, and troubleshooting.

Q: Explain WLM goals and how they work.
A: WLM (Workload Manager) uses performance goals to dynamically allocate resources. Goal types: Response Time (target average or percentile for online work), Velocity (percentage of time work is not delayed, for batch), and Discretionary (no goal, uses leftover resources). WLM monitors actual performance against goals and adjusts CPU priority, memory allocation, and I/O priority automatically. You define WHAT performance you want, WLM figures out HOW.

Q: How would you diagnose a batch job running slower than expected?
A: 1) Check SMF Type 30 for CPU time vs elapsed time. If CPU/elapsed is near 1.0, it's CPU-bound. If much less, check I/O. 2) Check EXCP counts — high EXCP may indicate poor BLKSIZE or too many small I/Os. 3) Check for enqueue waits (dataset contention). 4) Review SDSF output for S322 (CPU timeout) or SB37 (space). 5) Compare to baseline — has anything changed in data volume, program logic, or system configuration?

Q: What is the difference between RMF Monitor I, II, and III?
A: Monitor I collects data at intervals (15 min) to SMF for long-term trend analysis and capacity planning. Monitor II provides real-time interactive display via TSO for immediate problem diagnosis. Monitor III provides detailed per-address-space data for analyzing individual job performance. Use I for reporting, II for firefighting, III for deep analysis.

Q: How does MSU-based pricing work?
A: IBM z/OS software pricing (MLC) is based on the Rolling 4-Hour Average (R4HA) of MSU (Million Service Units) consumption. The system records MSU usage every 5 minutes, calculates the highest rolling 4-hour average, and software charges are based on this peak. This incentivizes spreading workloads to avoid peaks — batch scheduling, zIIP offload, and WLM tuning all reduce the R4HA and thus software costs.`
    }
  ]
};
