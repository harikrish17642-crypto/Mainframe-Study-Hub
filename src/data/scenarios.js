export const SCENARIOS = [
  {
    id:"s1", category:"JCL", difficulty:"Beginner",
    question:"Your JCL job abended with ABEND S0C7 in STEP2. What does this mean and how do you diagnose it?",
    answer:`S0C7 is a Data Exception abend — it occurs when a program attempts arithmetic on a field that does not contain valid numeric data (packed decimal or zoned decimal).

DIAGNOSIS STEPS:
1. Check SYSOUT/JESMSGLG for the exact PSW (Program Status Word) and offset
2. SYSUDUMP or SYSABEND will contain a formatted dump showing:
   - Registers at time of abend
   - Storage areas around the failing instruction
3. Use IPCS (Interactive Problem Control System) to analyze dump:
   IPCS SUBCOMMAND VERBEXIT ABEND
4. The offset from the dump + your COBOL listing will pinpoint the exact COMPUTE/MOVE statement

COMMON CAUSES:
  - Moving non-numeric data into a COMP-3 field (e.g., spaces into PIC S9(7) COMP-3)
  - Reading a file with wrong LRECL (misaligned record)
  - Uninitialized working storage field used in calculation
  - File with non-numeric data in numeric column

PREVENTION:
  MOVE ZEROS TO WS-NUMERIC-FIELD before using it
  Use NUMERIC class test: IF WS-FIELD IS NUMERIC ...
  Define WORKING-STORAGE with VALUE clauses`,
    tags:["abend","s0c7","debugging","jcl"]
  },
  {
    id:"s2", category:"COBOL", difficulty:"Intermediate",
    question:"You need to process 10 million records from a VSAM KSDS daily. The current batch job takes 6 hours. How do you reduce this to under 1 hour?",
    answer:`PERFORMANCE OPTIMIZATION STRATEGY:

1. BUFFER TUNING (Biggest impact, easiest win)
   Add to your COBOL FD or JCL DD:
   COBOL: SELECT VSAM-FILE ... ACCESS MODE SEQUENTIAL
   JCL:   //VSAMFILE DD DSN=MY.VSAM.FILE,DISP=SHR,
   //             AMP=('BUFND=20,BUFNI=10')
   BUFND = number of data buffers
   BUFNI = number of index buffers
   Rule: 20 data buffers + 10 index buffers is a good start

2. READ AHEAD / SEQUENTIAL PREFETCH
   Process sequentially not randomly:
   OPEN VSAM-FILE INPUT
   READ VSAM-FILE NEXT AT END ...
   (Sequential reads are 10x faster than random)

3. SORT INPUT BEFORE PROCESSING
   If doing random reads by key: sort your input by key first
   Then use START + READNEXT (skip-sequential)
   Converts random I/O to sequential I/O

4. PARALLEL PROCESSING — Partition the work:
   Split key range into 4 parts:
   Job 1: Keys 0000000001–0002500000
   Job 2: Keys 0002500001–0005000000
   Job 3: Keys 0005000001–0007500000
   Job 4: Keys 0007500001–9999999999
   Run simultaneously in JES with TYPRUN or external scheduler

5. INCREASE REGION SIZE
   More virtual storage = more buffers
   REGION=0M on EXEC statement

6. HIPERSPACE / DATA SPACE
   DFSMS SMS can use expanded storage (HiperSpace)
   Dramatically speeds VSAM I/O for hot datasets

7. VSAM REORG if CI/CA splits are high:
   Run IDCAMS EXAMINE to check split statistics
   IDCAMS REPRO + REDEFINE to reorganize`,
    tags:["performance","vsam","cobol","optimization"]
  },
  {
    id:"s3", category:"DB2", difficulty:"Advanced",
    question:"A DB2 query that normally takes 2 seconds is now taking 45 minutes after a weekend batch load. What do you check?",
    answer:`ROOT CAUSE: Stale statistics after bulk data load. Classic DB2 performance issue.

IMMEDIATE STEPS:

1. Run EXPLAIN on the slow query:
   EXPLAIN PLAN SET QUERYNO = 1 FOR
   SELECT ... (your query)
   
   Check PLAN_TABLE:
   - ACCESSTYPE = 'R' means full tablespace scan (BAD if table is large)
   - MATCHCOLS = 0 means index not being used efficiently
   - Compare with pre-load EXPLAIN (if you saved it)

2. Check if RUNSTATS is needed:
   SELECT CARDF, NPAGES, SPACE
   FROM   SYSIBM.SYSTABLESPACE
   WHERE  NAME = 'YOUR_TS';
   
   If CARDF is old (doesn't reflect new row count) → run RUNSTATS

3. Run RUNSTATS immediately:
   RUNSTATS TABLESPACE YOURDB.YOURTS
       TABLE(ALL)
       INDEX(ALL)
       SHRLEVEL CHANGE;

4. REBIND the package:
   REBIND PACKAGE(YOURPLAN.YOURPKG.()) EXPLAIN(YES);

5. Verify fix:
   Re-run EXPLAIN — ACCESSTYPE should now show 'I' (index)
   Test query performance

LONG-TERM FIX:
   Add RUNSTATS + REBIND to your batch completion JCL
   This is standard practice after any significant data load
   
   Consider RUNSTATS with FREQVAL for skewed data distributions`,
    tags:["db2","performance","runstats","explain"]
  },
  {
    id:"s4", category:"CICS", difficulty:"Intermediate",
    question:"CICS transaction PAYQ is abending with AICA (runaway task). How do you investigate and fix this?",
    answer:`AICA — Runaway Task Abend

WHAT IT MEANS:
AICA occurs when a CICS task exceeds the ICVR (Runaway Task Time) limit.
The default is usually 500,000 microseconds (0.5 seconds) of CPU without
an EXEC CICS command that relinquishes control.

IMMEDIATE INVESTIGATION:

1. Check CICS job log for AICA message:
   DFHAP0001 - TRANSACTION PAYQ, TASK 1234 ABEND CODE AICA
   Note: task number and transaction ID

2. Get CICS dump (CDUMP):
   EXEC CICS PERFORM DUMP DUMPCODE('MYCD') END-EXEC
   Or check auto-generated CICS dump for AICA

3. Analyze the dump — look for:
   - What COBOL paragraph was executing
   - Infinite loop (PERFORM UNTIL with condition never met)
   - Recursive calls
   - Very large table processing without yields

COMMON CAUSES:
  1. INFINITE LOOP:
     PERFORM UNTIL WS-EOF  (but WS-EOF never gets set to 'Y')
  
  2. LARGE TABLE SCAN:
     Searching 500,000-row table with linear search

FIXES:
  1. Fix the infinite loop — add proper exit condition
  2. For large processing: use EXEC CICS SUSPEND every N iterations
     to yield control and reset the runaway timer:
     PERFORM VARYING I FROM 1 BY 1 UNTIL I > MAX-ROWS
         PERFORM PROCESS-ROW
         IF FUNCTION MOD(I, 1000) = 0
             EXEC CICS SUSPEND END-EXEC  ← Yield every 1000 rows
         END-IF
     END-PERFORM
  3. Increase ICVR in SIT (System Initialization Table) — temporary fix
  4. Use EXEC CICS DELAY INTERVAL(0) to yield (zero delay, but resets timer)`,
    tags:["cics","abend","aica","debugging","performance"]
  },
  {
    id:"s5", category:"RACF", difficulty:"Advanced",
    question:"Audit found that 15 users have UPDATE access to PROD.PAYROLL datasets. How do you remediate and prevent recurrence?",
    answer:`SECURITY REMEDIATION PLAN:

IMMEDIATE ACTIONS:

1. Document current access (audit trail):
   RLIST DATASET 'PROD.PAYROLL.**' ALL > payroll-access-report.txt
   
   Save the RACF report showing all PERMITs

2. Review each user's business justification:
   For each of the 15 users:
   - Is this person in the Payroll department?
   - Do they have a business need for UPDATE?
   - Were they added by proper change request?

3. Remove unauthorized access:
   PERMIT 'PROD.PAYROLL.**' ID(UNAUTHORIZED-USER) DELETE
   (Repeat for each user who should not have UPDATE)

4. Grant minimum necessary access:
   - Payroll processors: UPDATE
   - Payroll viewers/auditors: READ
   - Developers: no direct PROD access

5. Verify removal:
   RLIST DATASET 'PROD.PAYROLL.**' ALL
   RACF will show remaining permits

PREVENTION CONTROLS:

1. Enable RACF Auditing on the profile:
   ALTDSD 'PROD.PAYROLL.**' AUDIT(ALL(UPDATE))
   Now every UPDATE access generates SMF Type 80 record

2. Regular access review process:
   Quarterly RLIST reports reviewed by data owner
   Automated IRRDBU00 unload + report for management

3. SOD (Segregation of Duties):
   People who run payroll should NOT update payroll files directly
   Use a service account (started task) for file updates

4. Change Management:
   RACF PERMIT changes require approved change request
   Automated RACF command logging (SMF 80 subtype 4)

5. Periodic recertification:
   IAM tools (Sailpoint, CyberArk) integrated with RACF
   Managers certify access quarterly`,
    tags:["racf","security","audit","compliance"]
  },
  {
    id:"s6", category:"CA7", difficulty:"Intermediate",
    question:"Your critical EOD (End of Day) batch network normally completes by 11 PM. Tonight it's 1 AM and still running. How do you triage?",
    answer:`EOD BATCH TRIAGE PROCEDURE:

1. ASSESS THE SITUATION (CA7 commands):
   LQ,Q=ACTIVE           ← What's currently running?
   LQ,Q=REQUEST          ← What's waiting for dependencies?
   LQ,Q=READY            ← What's ready but not picked up?
   DPND,NET=EOD-NETWORK  ← Show network dependency status

2. IDENTIFY THE BOTTLENECK:
   Look for:
   a) Jobs in ACTIVE queue for too long (hung?)
   b) Jobs in REQUEST queue waiting for predecessor that failed
   c) Large gap in schedule (job completed late, delaying successors)

3. CHECK FAILED JOBS:
   LQ,Q=POST,RC=FAIL     ← Show failed jobs
   If a critical predecessor failed, all successors are blocked

4. FOR HUNG JOBS:
   Check SDSF: Is the job actually running or stuck?
   $D J,jobname in SDSF  ← JES status
   If job is in WAIT state: check for ENQ contention, DASD errors
   CANCEL JOBNAME in SDSF if truly hung

5. FOR FAILED PREDECESSORS:
   Investigate failure, fix the issue, then:
   RSTRT,JOB=FAILEDNAME  ← Restart the failed job
   OR
   SATISFY manually if job can be skipped:
   SATISFY,JOB=NEXTJOB,TYPE=JOB,NAME=FAILEDJOB

6. ESCALATION COMMUNICATION:
   Notify business stakeholders immediately
   Estimate new completion time
   Determine business impact (can morning processing start late?)

7. ROOT CAUSE (after crisis):
   Review CA7 history: LHIST,JOB=SLOWJOB,BACK=30 ← Last 30 days
   Was tonight slower? Compare ELAPSED times
   Check for data volume change (more records = longer run)`,
    tags:["ca7","scheduling","batch","incident-management"]
  },
];
