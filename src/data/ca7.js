export const CA7_TOPIC = {
  id:"ca7", icon:"📅", title:"CA7", subtitle:"Workload Automation Scheduler", color:"#f97316", level:"Beginner → Expert",
  description:"The scheduler that never sleeps. Millions of jobs, zero missed SLAs, full dependency management.",
  sections:[
    { title:"Introduction to CA7", level:"Beginner",
      content:`CA7 (now Broadcom AutoSys Workload Automation for z/OS, but universally known as CA7) is the dominant workload automation scheduler on IBM z/OS mainframes. It controls when, how, and in what order batch jobs run.

Why Scheduling Matters:
  A typical mainframe data center runs 50,000–500,000+ batch jobs per day. These jobs have complex dependencies — Job B can't run until Job A finishes, Job C needs a file from Job B, and Job D must complete before 6 AM. CA7 manages all of this automatically.

What CA7 Does:
  • Schedules jobs based on time, dependencies, or events
  • Manages job dependencies (predecessor/successor relationships)
  • Triggers jobs when required datasets become available
  • Monitors job execution and handles failures
  • Provides forecasting — what will run and when
  • Manages workload balancing across systems
  • Sends alerts when SLAs are at risk
  • Maintains history for audit and analysis

CA7 vs Other Schedulers:
  CA7      — Broadcom (formerly CA Technologies). Most common on z/OS.
  Control-M — BMC Software. Multi-platform, growing on mainframe.
  OPC/TWS  — IBM Tivoli Workload Scheduler. IBM's native scheduler.
  ESP      — Broadcom (formerly Cybermation). Another z/OS scheduler.
  Zeke     — Older scheduler, still used in some shops.

CA7 Architecture:
  CA7 runs as a started task (STC) in its own address space.
  Components:
  • CA7 Server — The main scheduling engine
  • CA7 Database — Stores job definitions, schedules, dependencies
  • CA7 ISPF Panels — Operator/developer interface
  • CA7 Batch Interface — Define/modify via batch commands
  • CA7 Log — Audit trail of all activities

Job Lifecycle in CA7:
  1. DEFINITION — Job is defined with JCL, schedule, dependencies
  2. TRIGGERING — CA7 determines the job should run (time/dependency met)
  3. SUBMISSION — CA7 submits the JCL to JES
  4. MONITORING — CA7 tracks execution status
  5. COMPLETION — Job completes (success or failure)
  6. POST-PROCESSING — Triggers dependent jobs, sends notifications`
    },
    { title:"Defining Jobs in CA7", level:"Beginner",
      content:`Job Definition in CA7:

Every job CA7 manages must be defined in the CA7 database. The definition includes the job name, JCL location, schedule, dependencies, and notification settings.

Key Panels for Job Definition:

DB.1 — Job Definition (Main):
  SYSTEM  : CA7JOB1                ← Job name (1-8 chars)
  JOBNM   : CA7JOB1                ← JCL member name (usually same)
  JCLID   : 00                     ← JCL library index (from CA7 JCL libraries)
  JCLMBR  : CA7JOB1                ← Member name in JCL library
  RELOAD   : Y                     ← Reload JCL each time (Y/N)
  HOLD     : N                     ← Hold job from running (Y/N)
  EXEC     : Y                     ← Execute job (Y=yes, N=no)
  MAINID   : ALL                   ← Which system can run this job
  LEADTM   : 0000                  ← Lead time before deadline (HH:MM)
  DEADLTM  : 0600                  ← Deadline time (must complete by)

DB.2 — Scheduling:
  SCHID    : 001                   ← Schedule ID
  TYPE     : D                     ← Type: D=daily, W=weekly, M=monthly
  FREQ     : 1                     ← Frequency: every 1 day
  DAYS     : MON,TUE,WED,THU,FRI  ← Which days
  SCAL     : BUSCAL                ← Calendar (business days, holidays)
  TIME     : 0200                  ← Earliest start time (HH:MM)

DB.3 — Predecessor/Successor Dependencies:
  PRED    : JOB001                 ← Must complete before this job runs
  PRED    : JOB002                 ← AND this job must also complete
  SUCC    : JOB005                 ← After this job, trigger JOB005

DB.4 — Dataset Dependencies:
  DSN     : PROD.DAILY.EXTRACT    ← Job requires this dataset
  TRIGRN  : Y                     ← Dataset trigger: run when file arrives

DB.5 — Documentation:
  Free-text description of what the job does, who to contact, etc.

Job States:
  PEND  — Pending: waiting for schedule/trigger time
  READY — Ready: all dependencies met, waiting for resources
  SUBMIT— Submitted to JES
  EXEC  — Executing
  COMP  — Completed successfully
  FAIL  — Failed (non-zero return code or abend)
  HELD  — Held by operator or CA7`,
      code:`* ─── CA7 BATCH COMMANDS TO DEFINE A JOB ──────────────
* (Submitted as batch input to CA7)
*
ADDJOB,SYSTEM=DLYEXTR,
       JOBNM=DLYEXTR,
       JCLID=00,
       JCLMBR=DLYEXTR,
       RELOAD=Y,
       EXEC=Y,
       MAINID=ALL
*
ADDSCHD,SYSTEM=DLYEXTR,
        SCHID=001,
        TYPE=D,
        SCAL=BUSCAL,
        STIMEH=02,STIMEM=00
*
ADDPRED,SYSTEM=DLYEXTR,
        PRED=FILERECV
*
ADDSUCC,SYSTEM=DLYEXTR,
        SUCC=DLYLOAD
*
ADDDTRG,SYSTEM=DLYEXTR,
        DSN=PROD.DAILY.FEED,
        TRIGRN=Y`
    },
    { title:"Dependencies & Triggers", level:"Intermediate",
      content:`Job Dependencies — The Core of Scheduling:

Dependencies determine the order in which jobs run. CA7 supports several types:

1. Job Dependencies (Predecessor/Successor):
   The most common type. Job B depends on Job A.
   Job A (predecessor) must complete SUCCESSFULLY before Job B runs.
   
   Chain example: EXTRACT → SORT → TRANSFORM → LOAD → REPORT
   Each job is a predecessor of the next.

2. Dataset Dependencies (Triggers):
   Job runs when a specific dataset is created or updated.
   Useful when files arrive from external systems at unpredictable times.
   Example: Run PROCESS_FEED when VENDOR.DAILY.FILE arrives

3. Network Dependencies:
   A network is a collection of related jobs that form a workflow.
   CA7 manages the entire network as a unit.
   You can trigger, hold, or restart an entire network.

4. Cross-Platform Dependencies:
   CA7 can wait for jobs on other systems (XPS, remote z/OS)
   Useful in multi-system environments.

5. Manual Dependencies:
   A job waits for an operator to manually post a requirement.
   Used for human-in-the-loop workflows.

Dependency Logic:
  All dependencies must be satisfied (AND logic).
  If Job X requires predecessor A AND predecessor B AND dataset C:
    A must complete RC=0 → AND
    B must complete RC=0 → AND
    C must exist/be updated → THEN Job X can run

Maximum Return Code (MAXRC):
  You can set the maximum acceptable return code:
  MAXRC = 4 means RC 0 and 4 are acceptable, RC 8+ is a failure.
  This affects successor triggering.

Virtual Resources:
  CA7 can manage abstract resources (like "only 3 DB2 batch threads at once").
  Jobs acquire/release virtual resources, preventing contention.

Triggering Methods:
  DEMAND — Run on demand (operator or another job requests it)
  TRGD   — Triggered by dataset creation
  SCHD   — Scheduled (time-based)
  BOTH   — Both scheduled and triggered (whichever comes first)`,
      code:`* ─── COMPLEX DEPENDENCY EXAMPLE ───────────────────────
*
* Job flow:
*   EXTRACT1 ─┐
*   EXTRACT2 ─┼──→ MERGE ──→ TRANSFORM ──→ LOAD ──→ REPORT
*   EXTRACT3 ─┘              (wait for       (DB2)    (email)
*                              file too)
*
ADDJOB,SYSTEM=MERGE01,JOBNM=MERGE01
ADDPRED,SYSTEM=MERGE01,PRED=EXTRAC1
ADDPRED,SYSTEM=MERGE01,PRED=EXTRAC2
ADDPRED,SYSTEM=MERGE01,PRED=EXTRAC3
*
ADDJOB,SYSTEM=TRANSF1,JOBNM=TRANSF1
ADDPRED,SYSTEM=TRANSF1,PRED=MERGE01
ADDDTRG,SYSTEM=TRANSF1,
        DSN=PROD.LOOKUP.TABLE,
        TRIGRN=Y
*
ADDJOB,SYSTEM=DBLOAD1,JOBNM=DBLOAD1
ADDPRED,SYSTEM=DBLOAD1,PRED=TRANSF1
*
ADDJOB,SYSTEM=REPORT1,JOBNM=REPORT1
ADDPRED,SYSTEM=REPORT1,PRED=DBLOAD1
*
* ─── VIRTUAL RESOURCE (limit DB2 threads) ────────────
ADDRSC,RSCNAME=DB2THRD,LIMIT=3
ADDJRSC,SYSTEM=DBLOAD1,RSCNAME=DB2THRD,COUNT=1`
    },
    { title:"Scheduling & Calendars", level:"Intermediate",
      content:`Scheduling in CA7:

Schedules define WHEN a job should run. CA7 provides flexible scheduling that handles business calendars, holidays, and complex patterns.

Schedule Types:
  Daily (D)    — Runs every day or every N days
  Weekly (W)   — Runs on specific days of the week
  Monthly (M)  — Runs on specific days of the month
  Yearly (Y)   — Runs on specific days of the year

Schedule Parameters:
  SCHID — Schedule ID (multiple schedules per job allowed)
  TYPE  — D, W, M, or Y
  STIMEH/STIMEM — Start time (hours/minutes)
  FREQ  — Frequency (every N days/weeks/months)
  DAYS  — Specific days (MON-SUN, 1-31, or day-of-year)
  SCAL  — Calendar name (for business days)

Calendars:
  Calendars define which days are active (business days) and which are
  holidays or non-processing days.

  BUSCAL — Business calendar (Mon-Fri, excluding holidays)
  ALLCAL — All days (7 days a week)
  CUSTOM — Custom calendars for specific needs

  Calendar Resolution:
    If a job is scheduled for a holiday, CA7 can:
    • PRIOR — Run on the prior business day
    • NEXT  — Run on the next business day
    • SKIP  — Don't run at all
    • RUN   — Run anyway (even on holiday)

Schedule Examples:
  1. Every weekday at 2:00 AM:
     TYPE=D, SCAL=BUSCAL, STIMEH=02, STIMEM=00

  2. Every Monday and Thursday at 6:00 PM:
     TYPE=W, DAYS=MON+THU, STIMEH=18, STIMEM=00

  3. First and fifteenth of each month:
     TYPE=M, DAYS=01+15, STIMEH=05, STIMEM=00

  4. Last business day of month:
     TYPE=M, DAYS=LAST, SCAL=BUSCAL, STIMEH=22, STIMEM=00

  5. Quarterly (Jan, Apr, Jul, Oct first business day):
     TYPE=Y, DAYS=001+091+182+274, SCAL=BUSCAL

Due-Out and Deadlines:
  DEADLTM — Must complete by this time (absolute)
  LEADTM  — Warning lead time before deadline
  If deadline is at risk, CA7 sends alerts.
  SLA monitoring depends on proper deadline settings.`
    },
    { title:"CA7 Panels & Commands", level:"Intermediate",
      content:`CA7 ISPF Interface — Panels and Commands:

CA7 operators and developers interact with the system primarily through ISPF panels (TSO/ISPF) or command-line interface.

Main CA7 Panels:

DB Panels (Database/Definition):
  DB.1   — Job Definition
  DB.2   — Schedule Definition
  DB.3   — Predecessor/Successor Dependencies
  DB.4   — Dataset Triggers
  DB.5   — Job Documentation
  DB.6   — JCL Override
  DB.7   — Network Definition
  DB.10  — Virtual Resource Definition

QM Panels (Queue Management — Runtime):
  QM.1   — Request Queue (all pending/ready jobs)
  QM.2   — Ready Queue (jobs ready to submit)
  QM.3   — Active Queue (currently executing)
  QM.4   — Completed Queue (finished jobs)
  QM.5   — Input Queue (submitted to JES)
  QM.6   — Prior Run Queue (historical)

LRDY — List Ready Jobs:
  Shows all jobs currently in READY state.

Common Online Commands:
  DEMAND,JOB=jobname        — Submit a job on demand
  CANCEL,JOB=jobname        — Cancel a running job
  HOLD,JOB=jobname          — Hold a job from running
  RELEASE,JOB=jobname       — Release a held job
  RESTART,JOB=jobname       — Restart a failed job
  FORCE,JOB=jobname         — Force-complete a job
  POST,JOB=jobname          — Post (mark complete) a dependency
  RERUN,JOB=jobname         — Rerun a completed job
  EDIT,JOB=jobname          — Edit job definition
  LJOB,JOB=jobname          — List job details
  LSCHD,JOB=jobname         — List schedule details
  LPRED,JOB=jobname         — List predecessors
  LSUCC,JOB=jobname         — List successors

FORECAST Command:
  Shows what jobs are scheduled to run in a future time window.
  FORECAST,DATE=250301,THRU=250302
  Invaluable for capacity planning and SLA management.

QUEUE Command:
  QUEUE,READY               — Show all ready jobs
  QUEUE,ACTIVE              — Show all active jobs
  QUEUE,FAIL                — Show all failed jobs`
    },
    { title:"Job Failure Handling & Recovery", level:"Intermediate",
      content:`When Jobs Fail — CA7 Recovery Procedures:

Job failures are inevitable. How you handle them determines system reliability.

What Happens When a Job Fails:
  1. JES sends completion status to CA7
  2. CA7 marks the job as FAILED (return code exceeded MAXRC or abend)
  3. All successor jobs are HELD (dependency not met)
  4. CA7 sends notifications (console message, email, pager)
  5. The entire downstream chain waits for recovery

Recovery Actions:

RESTART — Re-run from a specific step:
  RESTART,JOB=DLYLOAD,STEPNAME=STEP030
  Job is resubmitted starting from STEP030.
  Used when the failure is correctable without rerunning everything.

RERUN — Re-run the entire job:
  RERUN,JOB=DLYLOAD
  Job is resubmitted from the beginning.
  Used when the job needs to start fresh.

FORCE COMPLETE — Mark as done:
  FORCE,JOB=DLYLOAD,COMP
  Marks the job as completed without actually running it.
  Used when the data was manually corrected or the job is not needed.
  CAUTION: All successors will trigger as if the job ran successfully.

BYPASS — Skip the job:
  The job is skipped for this run cycle.
  Successors may or may not trigger depending on configuration.

POST — Post a manual dependency:
  POST,JOB=NEXTJOB,DEP=DLYLOAD
  Manually tells CA7 that the dependency is satisfied.

Recovery Best Practices:
  1. Always check job output (SDSF) to understand the failure
  2. Fix the root cause before rerunning
  3. Check if data was partially written (may need cleanup)
  4. Consider downstream impacts before FORCE COMPLETE
  5. Document the recovery action in the CA7 log
  6. For recurring failures, update the job or add error handling

Automated Recovery:
  CA7 can be configured with automatic recovery actions:
  • Auto-restart with step override on specific abend codes
  • Auto-hold and notify for specific return codes
  • Auto-escalate to on-call team after N failures
  • Retry logic with delay between attempts

SLA Monitoring:
  CA7 tracks deadlines and sends proactive alerts:
  • WARN — Job is at risk of missing its deadline
  • CRIT — Job has missed its deadline
  • INFO — Job completed within deadline`
    },
    { title:"Networks & Job Flows", level:"Advanced",
      content:`CA7 Networks — Managing Complex Workflows:

A network in CA7 is a group of related jobs managed as a unit. Networks provide a higher level of control over complex job streams.

Network Benefits:
  • Trigger/hold/release an entire workflow with one command
  • Visual representation of job flow
  • SLA tracking at the workflow level
  • Easier management of large job streams
  • Sub-networks for modular design

Defining a Network:
  DB.7 panel or batch commands:
  ADDNET,NETWORK=DAILYETL
  ADDNJOB,NETWORK=DAILYETL,JOB=EXTRACT1
  ADDNJOB,NETWORK=DAILYETL,JOB=EXTRACT2
  ADDNJOB,NETWORK=DAILYETL,JOB=MERGE01
  ADDNJOB,NETWORK=DAILYETL,JOB=TRANSF1
  ADDNJOB,NETWORK=DAILYETL,JOB=DBLOAD1
  ADDNJOB,NETWORK=DAILYETL,JOB=REPORT1

Network Operations:
  DEMAND,NET=DAILYETL      — Run the entire network
  HOLD,NET=DAILYETL        — Hold all network jobs
  RELEASE,NET=DAILYETL     — Release all network jobs
  LNET,NET=DAILYETL        — List network status
  FRCCOMP,NET=DAILYETL     — Force complete the network

Cross-System Networks:
  In a sysplex environment, CA7 can manage job flows across multiple z/OS systems:
  • Jobs can run on different LPARs
  • Dependencies span systems
  • Central monitoring of distributed workloads

Network Scheduling:
  Networks can have their own schedule, separate from individual job schedules.
  The network schedule triggers the first jobs in the network.
  Subsequent jobs trigger based on dependencies.

Parallel Execution:
  Jobs without mutual dependencies run in parallel within a network:
  EXTRACT1 ──→ MERGE ──→ ...
  EXTRACT2 ──↗
  EXTRACT3 ──↗
  All three EXTRACTs run simultaneously, MERGE waits for all three.`
    },
    { title:"CA7 JCL Overrides", level:"Advanced",
      content:`JCL Overrides in CA7 — Dynamic JCL Modification:

CA7 can modify JCL on the fly before submitting a job to JES. This is powerful for:
  • Changing dataset names per environment
  • Adjusting REGION, TIME, or CLASS parameters
  • Swapping STEPLIB for test vs production
  • Adding/removing JCL statements

Override Types:

1. JCL ID Override (JCLID):
   Point to different JCL libraries:
   JCLID=00 → production library
   JCLID=01 → test library
   Quick way to switch between environments.

2. Insert Override:
   Insert additional JCL statements at a specific point:
   INSERT,BEFORE=STEPLIB,TEXT='// DD DSN=TEST.LOADLIB,DISP=SHR'

3. Replace Override:
   Replace specific text in the JCL:
   REPLACE,OLD='PROD.LOADLIB',NEW='TEST.LOADLIB'

4. Symbolic Override:
   Override JCL symbolic parameters:
   SETVAR,SYM=HLQUAL,VALUE=TEST
   SETVAR,SYM=ENV,VALUE=UAT

5. Runtime Parameter Override:
   Change EXEC PARM at submission time:
   PARM='REGION=0M,TIME=1440'

Override Precedence:
  1. Job-level overrides (DB.6 panel)
  2. Network-level overrides
  3. Demand-time overrides (specified when demanding)
  4. Default JCL (from library)

Environment Management:
  Common pattern — same job runs in DEV, UAT, PROD:
  Base JCL uses symbolic: DSN=&ENV..DATA.FILE
  CA7 override sets: SETVAR,SYM=ENV,VALUE=PROD
  Different schedules for each environment.

Best Practices:
  • Keep overrides minimal — prefer parameterized JCL
  • Document all overrides in DB.5
  • Test overrides in non-production before production
  • Review overrides during change management
  • Use version control for JCL libraries`
    },
    { title:"Other Schedulers: Control-M & TWS", level:"Intermediate",
      content:`Beyond CA7 — Alternative Mainframe Schedulers:

While CA7 is the most common, understanding other schedulers is valuable for career flexibility.

Control-M (BMC Software):
  • Multi-platform scheduler (z/OS, Linux, Windows, Cloud)
  • Growing market share on mainframes
  • Modern web-based interface alongside ISPF
  • Strong REST API integration
  • "Jobs-as-Code" — define workloads in JSON/YAML
  • BMC Helix integration for AIOps

  Control-M on z/OS:
  • Control-M/Server manages scheduling
  • Control-M/Agent on each managed system
  • Control-M/EM (Enterprise Manager) for central monitoring
  • Supports JES2 and JES3

OPC/TWS (IBM Tivoli Workload Scheduler):
  • IBM's native z/OS scheduler
  • Tightly integrated with z/OS
  • Uses Long Term Plan (LTP) and Current Plan (CP)
  • Operations Planning — graphical job flow editor
  • IBM Workload Automation with z-centric deployments

  Key Concepts:
  • Application — Group of related job streams
  • Operation — A single job or task
  • Current Plan — Today's execution plan
  • Long Term Plan — Future scheduling plan
  • Run Cycle — When an application runs

Comparison:
  Feature          CA7        Control-M    OPC/TWS
  ─────────────────────────────────────────────────
  Primary platform z/OS       Multi        z/OS
  Interface        ISPF       Web+ISPF     Web+ISPF
  Dependencies     Excellent  Excellent    Good
  Multi-platform   Limited    Excellent    Good
  Cloud support    No         Yes          Yes
  REST API         Limited    Excellent    Good
  Market share     Largest    Growing      Moderate

Migration Considerations:
  • Moving between schedulers is a major project
  • Job definitions must be translated
  • Dependency logic may differ
  • Calendar systems are different
  • Testing is critical — production impact is severe`
    },

    { title:"CA-7 Job Definition", level:"Beginner",
      content:`Defining jobs in CA-7 for automated scheduling.

DB.1 — Job Definition:
  EDIT: JOB=PAYROLL01
  SYSTEM=PROD
  JCLID=1
  EXEC-SCHED-ID=001
  MAINID=
  LEADTM=0030
  REQUIREMENT-RESOLVE-TIME=Y

Key Fields:
  JOB — Job name (up to 8 characters)
  SYSTEM — System where job runs
  JCLID — JCL library ID (where JCL is stored)
  EXEC-SCHED-ID — Which schedule to follow
  LEADTM — Minutes before scheduled time to start processing
  REQUIREMENT-RESOLVE-TIME — Check requirements at schedule time

JCL Library:
  DB.10 — Define JCL library
  JCLLIB member contains the actual JCL.
  CA-7 retrieves JCL at submission time.

Pro Tip: Always set LEADTM to allow enough time for predecessors to complete. Too short = missed schedule.`
    },

    { title:"CA-7 Predecessors & Successors", level:"Beginner",
      content:`Dependencies control job execution order.

Predecessors (DB.2.1):
  Job won't start until ALL predecessors complete successfully.
  EDIT: JOB=REPORTS01
  PRED: PAYROLL01 — Must complete first
  PRED: EXTRACT01 — Must complete first

Types:
  JOB predecessor — Another CA-7 job
  DSN predecessor — Dataset trigger (file created/updated)
  NWK predecessor — Network predecessor

Successors:
  Automatically triggered when current job completes.
  Defined via predecessor on the successor job.

Virtual Resources:
  EDIT: JOB=BATCHJOB1
  RESOURCE: RES=TAPE01,TYPE=EXC
  Locks shared resources (tape drives, databases).
  Prevents two jobs from using same resource simultaneously.

Dependency Chain:
  JOB A → JOB B → JOB C (sequential)
  JOB A + JOB B → JOB C (parallel then merge)

Pro Tip: Draw dependency diagrams before defining in CA-7. Visual representation catches circular dependencies.`
    },

    { title:"CA-7 Scheduling", level:"Intermediate",
      content:`Schedule IDs control WHEN jobs run.

DB.3 — Schedule Definition:
  SCHDID=001
  SCHD: TYPE=DAILY
  RUN: EVERYDAY

Schedule Types:
  DAILY — Runs every day (or specific days)
  WEEKLY — Specific days of week
  MONTHLY — Specific days of month
  YEARLY — Specific days of year
  INTERVAL — Every N hours/minutes

Day Selection:
  RUN MON,TUE,WED,THU,FRI — Weekdays only
  RUN 01,15 — 1st and 15th of month
  EXCEPT HOLIDAY — Skip holidays

Calendar:
  Define holiday calendars. Jobs skip holidays automatically.
  DB.12 — Calendar maintenance.

Multiple Schedules:
  One job can have multiple schedule IDs.
  EXEC-SCHED-ID=001,002 — Runs on both schedules.

Pro Tip: Use calendars for holidays and business dates. Manual schedule overrides are error-prone.`
    },

    { title:"CA-7 — DEMAND & FORCE", level:"Intermediate",
      content:`Manual job submission overrides.

DEMAND:
  DEMAND JOB=MYJOB — Submit job NOW, check predecessors.
  If predecessors not met → job waits in queue.
  Used for: Rerun after failure, ad-hoc execution.

FORCE:
  FORCE JOB=MYJOB — Submit NOW, IGNORE predecessors.
  Dangerous — job runs without dependency checks.
  Used for: Emergency processing, testing.

RUN:
  RUN JOB=MYJOB — Schedule job for next normal run.
  Follows normal scheduling rules.

HOLD/RELEASE:
  HOLD JOB=MYJOB — Prevent job from running
  RELEASE JOB=MYJOB — Allow job to run again

CANCEL:
  CANCEL JOB=MYJOB — Remove job from queue
  CANCEL JOB=MYJOB,EXEC — Cancel executing job

RESTART:
  RESTART JOB=MYJOB — Restart from last checkpoint
  RESTART JOB=MYJOB,STEP=STEP3 — Restart from specific step

Pro Tip: Use DEMAND (not FORCE) for reruns — it validates dependencies. FORCE is for emergencies only and requires approval.`
    },

    { title:"CA-7 — Job Monitoring", level:"Beginner",
      content:`Monitor job execution in real-time.

QM (Queue Manager):
  QM.1 — Queue display
  Shows: READY, ACTIVE, COMPLETE, FAILED jobs
  Filter by: Job name, system, status

Status Values:
  READY — Waiting to run (predecessors met)
  WAITING — Waiting for predecessors
  ACTIVE — Currently executing
  COMPLETE — Finished successfully
  FAILED — Ended with error
  HELD — Manually held

Alerts:
  CA-7 can send alerts on:
  Late jobs — Past expected completion time
  Failed jobs — Non-zero return code
  Long-running jobs — Exceeding time estimate
  Missed schedules — Job didn't start on time

Log:
  DB.6 — Job history log
  Shows: All executions with timestamps, return codes, elapsed times.

Pro Tip: Set up alerts for all critical batch jobs. Late-running jobs often cascade into missed deadlines downstream.`
    },

    { title:"CA-7 — Restart & Recovery", level:"Intermediate",
      content:`Handling job failures and restarts in CA-7.

Automatic Restart:
  Define restart parameters in job definition.
  RESTART=Y — Allow automatic restart
  CA-7 can automatically resubmit failed jobs.

Manual Restart:
  1. Check failure: QM.1 → Find failed job → Check return code
  2. Fix issue (data, space, authority)
  3. RESTART JOB=name — Restart from failure point
  4. Or RESTART JOB=name,STEP=stepname — Specific step

Step-Level Restart:
  CA-7 tracks which steps completed.
  Restart skips completed steps (if job supports it).
  Requires RESTART parameter in JCL.

Override JCL:
  DB.8 — JCL overrides for restart
  Change DISP, add RESTART parameter, modify COND.

Post-Failure Checklist:
  1. What failed? (Check JES output, SYSPRINT)
  2. Why? (Space, data, authority, abend code)
  3. Fix the root cause
  4. Clean up partial output if needed
  5. Restart from appropriate point
  6. Verify downstream jobs not affected

Pro Tip: Document restart procedures for every critical job. When it fails at 3 AM, clear instructions save hours.`
    },

    { title:"CA-7 — Cross-System Dependencies", level:"Advanced",
      content:`Managing dependencies across multiple z/OS systems and schedulers.

Cross-System Jobs:
  Job on System A depends on job on System B.
  CA-7 XPS (Cross-Platform Scheduling) handles this.

Network Dependencies:
  Define network between CA-7 instances.
  NWK predecessor connects jobs across systems.

External Events:
  Dataset triggers — File arrives → Start job
  Time-based triggers — Run at specific time
  Manual triggers — Operator action

ETL Dependencies:
  Source system extract → FTP to mainframe → Trigger CA-7 job → Process → Output
  CA-7 monitors for file arrival (DSN trigger).

SLA Management:
  Define deadlines for critical jobs.
  CA-7 tracks: Will this job complete on time?
  Automatic alerts when SLA at risk.

Pro Tip: Cross-system dependencies are the hardest to manage. Document them clearly — they're invisible when everything works but critical when something breaks.`
    },


    { title:"CA7 Interview Questions", level:"All Levels",
      content:`CA-7/Job Scheduling Interview Questions — 15+ Q&A.

Q: What is CA-7?
A: Job scheduling tool from Broadcom. Automates job submission based on time, predecessor completion, and resource availability.

Q: What is a predecessor/successor?
A: Predecessor=job that must complete before this job runs. Successor=job triggered after this job completes. Forms a directed acyclic graph.

Q: What is a job stream?
A: Sequence of jobs linked by dependencies. E.g., Extract → Sort → Load → Report. CA-7 manages the flow.

Q: What happens when a job fails?
A: CA-7 holds successors, alerts operators, records failure. Operators fix the issue, restart the job, CA-7 resumes the stream.

Q: What is a schedule ID?
A: Calendar definition determining WHEN jobs run. Business days, month-end, holidays. Jobs connected to schedule IDs.

💡 Study Tip: Know predecessor/successor, schedule IDs, restart procedures, and basic CA-7 panels.`,
    },

    { title:"CA7 Cheat Sheet", level:"All Levels",
      content:`CA-7/Scheduling Quick Reference

═══ KEY CONCEPTS ═══
Job Stream — Linked sequence of jobs
Predecessor — Must complete first
Successor — Triggered after completion
Schedule ID — Calendar-based trigger

═══ COMMON SCHEDULERS ═══
CA-7 (Broadcom), TWS (IBM), Control-M (BMC), Zeke`,
    },
  ]
};
