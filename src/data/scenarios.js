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
  // ─── VSAM SCENARIOS ───
  {
    id:"s7", category:"VSAM", difficulty:"Beginner",
    question:"You need to create a VSAM KSDS cluster for an employee master file. The key is a 6-byte employee ID starting at position 1. How do you define it?",
    answer:`IDCAMS DEFINE CLUSTER:\n\n//DEFVSAM  EXEC PGM=IDCAMS\n//SYSPRINT DD SYSOUT=*\n//SYSIN    DD *\n  DEFINE CLUSTER -\n    (NAME(PROD.EMPLOYEE.MASTER) -\n     INDEXED -\n     KEYS(6 0) -\n     RECORDSIZE(200 250) -\n     FREESPACE(20 10) -\n     SHAREOPTIONS(2 3) -\n     CYLINDERS(50 10)) -\n  DATA -\n    (NAME(PROD.EMPLOYEE.MASTER.DATA) -\n     CISZ(4096)) -\n  INDEX -\n    (NAME(PROD.EMPLOYEE.MASTER.INDEX) -\n     CISZ(2048))\n/*\n\nKEY PARAMETERS:\n- KEYS(6 0) = 6-byte key starting at offset 0\n- RECORDSIZE(200 250) = average 200, max 250 bytes\n- FREESPACE(20 10) = 20% CI free, 10% CA free for inserts\n- SHAREOPTIONS(2 3) = multiple read, single write across systems\n- CISZ = Control Interval Size for data and index`,
    tags:["vsam","ksds","idcams","define"]
  },
  {
    id:"s8", category:"VSAM", difficulty:"Advanced",
    question:"A production VSAM KSDS has 45% CI splits and response time has degraded from 2ms to 50ms. What's your recovery plan?",
    answer:`VSAM CI SPLIT RECOVERY PLAN:\n\n1. IMMEDIATE ASSESSMENT:\n   LISTCAT ENTRIES(PROD.VSAM.FILE) ALL\n   Check: SPLITS-CI, SPLITS-CA, FREESPACE-%, EXTENTS\n\n2. EMERGENCY REORG:\n   Step 1 — REPRO to sequential backup:\n   //STEP1  EXEC PGM=IDCAMS\n   //SYSIN  DD *\n     REPRO INFILE(VSAMDD) OUTFILE(SEQDD)\n   \n   Step 2 — DELETE and REDEFINE with better FREESPACE:\n     DELETE PROD.VSAM.FILE CLUSTER\n     DEFINE CLUSTER ... FREESPACE(30 15)\n   \n   Step 3 — REPRO back:\n     REPRO INFILE(SEQDD) OUTFILE(VSAMDD)\n\n3. ROOT CAUSE ANALYSIS:\n   - Sequential inserts at end? → FREESPACE not helping\n   - Random inserts? → Increase CI FREESPACE to 30%\n   - Growing rapidly? → Increase CA FREESPACE to 15%\n   - Key range hot spots? → Consider key-range partitioning\n\n4. PREVENTION:\n   - Schedule weekly REORG\n   - Monitor splits via SMF Type 64 records\n   - Set FREESPACE based on insert patterns`,
    tags:["vsam","performance","ci-splits","reorg"]
  },
  // ─── REXX SCENARIOS ───
  {
    id:"s9", category:"REXX", difficulty:"Beginner",
    question:"Write a REXX exec that checks if a dataset exists and displays its attributes. If it doesn't exist, create it.",
    answer:`/* REXX - Check and create dataset */\nPARSE ARG DSNAME\nIF DSNAME = '' THEN DO\n  SAY 'Usage: DSCHK datasetname'\n  EXIT 8\nEND\n\n/* Check existence */\nX = SYSDSN(\"'\"DSNAME\"'\")\nIF X = 'OK' THEN DO\n  SAY DSNAME 'exists.'\n  /* Get attributes using LISTDSI */\n  X = LISTDSI(\"'\"DSNAME\"'\")\n  SAY '  RECFM  :' SYSRECFM\n  SAY '  LRECL  :' SYSLRECL\n  SAY '  BLKSIZE:' SYSBLKSIZE\n  SAY '  DSORG  :' SYSDSORG\n  SAY '  VOLUME :' SYSVOLUME\n  SAY '  USED   :' SYSUSED 'tracks'\nEND\nELSE DO\n  SAY DSNAME 'not found ('X'). Creating...'\n  "ALLOC DA('"DSNAME"') NEW CATALOG",\n    "SPACE(10,5) CYLINDERS",\n    "RECFM(F B) LRECL(80) BLKSIZE(27920)"\n  IF RC = 0 THEN SAY 'Created successfully.'\n  ELSE SAY 'Error RC=' RC\nEND\nEXIT 0\n\nKEY CONCEPTS:\n- SYSDSN() returns 'OK' if dataset exists\n- LISTDSI() populates system variables with dataset attributes\n- TSO ALLOC command creates datasets from REXX`,
    tags:["rexx","dataset","tso","automation"]
  },
  {
    id:"s10", category:"REXX", difficulty:"Intermediate",
    question:"Create a REXX exec that monitors a job's status using SDSF and sends an email alert if it abends.",
    answer:`/* REXX - Monitor job and alert on abend */\nARG JOBNAME\nRC = ISFCALLS('ON')\nISFPREFIX = JOBNAME\nISFCOLS = 'JNAME RETCODE QUEUE'\nADDRESS SDSF \"ISFEXEC ST\"\n\nFOUND = 0\nDO IX = 1 TO JNAME.0\n  IF JNAME.IX = JOBNAME THEN DO\n    FOUND = 1\n    IF POS('ABEND',RETCODE.IX) > 0 THEN DO\n      SAY 'ALERT:' JOBNAME 'ABENDED -' RETCODE.IX\n      /* Send email via SMTP */\n      QUEUE 'HELO mainframe.company.com'\n      QUEUE 'MAIL FROM:<batch@company.com>'\n      QUEUE 'RCPT TO:<oncall@company.com>'\n      QUEUE 'DATA'\n      QUEUE 'Subject: ABEND Alert -' JOBNAME\n      QUEUE JOBNAME 'ended with' RETCODE.IX\n      QUEUE 'Please investigate immediately.'\n      QUEUE '.'\n      QUEUE 'QUIT'\n      \"ALLOC FI(SMTP) DA('TCPIP.SMTP.QUEUE') SHR\"\n      \"EXECIO * DISKW SMTP (FINIS\"\n      \"FREE FI(SMTP)\"\n    END\n    ELSE SAY JOBNAME '- RC:' RETCODE.IX '(OK)'\n  END\nEND\nIF \\FOUND THEN SAY JOBNAME 'not found in SDSF'\nRC = ISFCALLS('OFF')\nEXIT 0\n\nNOTES:\n- ISFCALLS interfaces with SDSF programmatically\n- ISFEXEC ST queries the Status display\n- Can be scheduled via CA7 to run after critical jobs`,
    tags:["rexx","sdsf","monitoring","alert"]
  },
  // ─── IMS SCENARIOS ───
  {
    id:"s11", category:"IMS", difficulty:"Intermediate",
    question:"An IMS batch program fails with U0778 abend after a DL/I GU call. How do you diagnose and fix it?",
    answer:`U0778 ABEND DIAGNOSIS:\n\nU0778 means the program encountered a DL/I status code it didn't handle. The status code is in the PCB mask.\n\nSTEPS:\n1. CHECK THE PCB STATUS CODE:\n   Look at PCB-STATUS-CODE in the dump\n   Common codes after GU:\n   - 'GE' = Segment not found (no match for SSA)\n   - 'AI' = Open failure on database\n   - 'AO' = I/O error on database\n\n2. CHECK YOUR SSA:\n   If GU used a qualified SSA like:\n   CALL 'CBLTDLI' USING GU-FUNC PCB-MASK\n     EMPLOYEE-SEGMENT\n     SSA-EMPID\n   Verify SSA-EMPID contains valid search data\n\n3. FIX — Always check status after every DL/I call:\n   CALL 'CBLTDLI' USING GU-FUNC ...\n   IF PCB-STATUS = SPACES\n     CONTINUE PROCESSING\n   ELSE IF PCB-STATUS = 'GE'\n     DISPLAY 'SEGMENT NOT FOUND'\n   ELSE\n     DISPLAY 'DL/I ERROR: ' PCB-STATUS\n     MOVE 16 TO RETURN-CODE\n     GOBACK\n   END-IF\n\n4. PREVENTION:\n   - ALWAYS check PCB status after every DL/I call\n   - Handle GE (not found) as valid business logic\n   - Log unexpected status codes before abending`,
    tags:["ims","dli","abend","u0778"]
  },
  {
    id:"s12", category:"IMS", difficulty:"Expert",
    question:"IMS Fast Path DEDB response time has degraded from 0.5ms to 15ms during peak hours. What's your approach?",
    answer:`IMS FAST PATH DEDB PERFORMANCE TUNING:\n\n1. CHECK BUFFER POOL:\n   /DIS POOL ALL\n   Look at: Buffer hits vs physical reads\n   If hit ratio < 95%: increase DEDB buffer pool\n   In DFSVSMxx: VSRBF=2048 (increase from default)\n\n2. CHECK CI SPLITS:\n   Use IMS Monitor or DBDGEN output\n   If UOW (Unit of Work) areas are full:\n   - DEDB online REORG using OLR (Online Reorganization)\n   - /START OLREORG AREA areaname\n\n3. ANALYZE LOCK CONTENTION:\n   /DIS THREAD ALL — check for enqueue waits\n   High contention on same CI:\n   - Increase RANDOMIZER spread\n   - Consider RAP (Root Anchor Point) redistribution\n\n4. CHECK SEQUENTIAL DEPENDENT SEGMENTS:\n   SDEP overflow can cause scan time increase\n   Run SDEP REORG: DFSURGS0 utility\n\n5. VSAM BUFFERS:\n   Check OSAM/VSAM buffer allocation\n   For DEDB, VSAM LSR is critical\n   AMP=('BUFND=50,BUFNI=20')\n\n6. HARDWARE:\n   Ensure DEDB datasets on high-speed DASD\n   Consider zHyperLink for sub-millisecond I/O`,
    tags:["ims","fastpath","dedb","performance"]
  },
  // ─── z/OS SCENARIOS ───
  {
    id:"s13", category:"z/OS", difficulty:"Beginner",
    question:"What is the difference between a JOB, STEP, and TASK in z/OS? A batch job has 3 steps — explain how z/OS processes them.",
    answer:`z/OS JOB PROCESSING:\n\nJOB = A unit of work submitted to JES2/JES3\n- Defined by JOB card: //MYJOB JOB ...\n- Contains 1-255 steps\n- Gets a unique JOB ID (e.g., JOB12345)\n\nSTEP = One program execution within a job\n- Defined by EXEC card: //STEP1 EXEC PGM=MYPROGRAM\n- Each step runs one program\n- Has its own DD statements for file allocation\n- Gets a STEP completion code (RC 0-4095)\n\nTASK = An operating system dispatchable unit\n- Each step creates at least one task (TCB)\n- Programs can create subtasks (ATTACH macro)\n- z/OS dispatcher schedules tasks for CPU time\n\nPROCESSING FLOW:\n1. JES2 receives job from card reader/internal reader\n2. JES2 converts JCL (resolves PROCs, symbols)\n3. JES2 assigns job to initiator based on CLASS\n4. Initiator processes STEP1:\n   - Allocates datasets (DD statements)\n   - Loads program into memory\n   - Gives control to program\n   - Program runs and sets return code\n   - Datasets deallocated\n5. Initiator checks COND codes\n6. If COND is satisfied, processes STEP2, then STEP3\n7. Job output goes to JES2 output queue\n8. JES2 prints/routes output`,
    tags:["zos","fundamentals","batch","jes2"]
  },
  {
    id:"s14", category:"z/OS", difficulty:"Advanced",
    question:"A production LPAR is experiencing S80A abends across multiple batch jobs during month-end processing. What's your diagnosis approach?",
    answer:`S80A ABEND — VIRTUAL STORAGE SHORTAGE:\n\nS80A = insufficient virtual storage (REGION) for the address space.\n\n1. IMMEDIATE TRIAGE:\n   Check JESMSGLG for the failing job:\n   IEF374I STEP /STEPNAME / ABEND=S80A U0000\n   Look at: IEA memory usage in dump header\n\n2. REGION ANALYSIS:\n   D A,L — Display active address spaces\n   Check REGION allocation vs actual usage\n   Month-end = more data = more GETMAIN requests\n\n3. COMMON CAUSES:\n   a. REGION=0M or REGION=8M too small\n      Fix: REGION=0M allows max below-the-line\n      Better: REGION=0M,MEMLIMIT=2G (above the bar)\n   b. COBOL tables loaded entirely in memory\n      Fix: Use VSAM/DB2 instead of in-memory tables\n   c. Sort work area too large\n      Fix: SORTWORK DD statements to disk\n   d. Buffer pool too large\n      Fix: Reduce BUFND/BUFNI\n\n4. SYSTEM-WIDE FIXES:\n   SMFPRMxx: Increase MAXUSER if needed\n   IEFUSIxx: Set IEFUSI exit for REGION limits\n   Check CSA/SQA usage: D CSA\n\n5. LONG-TERM:\n   Use SMF Type 30 to trend memory usage\n   Implement MEMLIMIT for 64-bit storage\n   Move large programs to 64-bit (AMODE 64)`,
    tags:["zos","abend","s80a","storage","region"]
  },
  // ─── PERFORMANCE / SMF SCENARIOS ───
  {
    id:"s15", category:"Performance", difficulty:"Intermediate",
    question:"CPU utilization hit 98% during the batch window. How do you identify the culprit job and fix it?",
    answer:`CPU SPIKE DIAGNOSIS:\n\n1. REAL-TIME IDENTIFICATION:\n   D A,L — Display all active address spaces with CPU usage\n   RMF Monitor II: Sort by CPU percentage\n   Look for the top CPU consumer\n\n2. SMF ANALYSIS:\n   Extract SMF Type 30 subtype 3 (step termination):\n   //CPURPT EXEC PGM=SORT\n   //SORTIN DD DSN=MY.SMF.DUMP,DISP=SHR\n   //SYSIN  DD *\n     INCLUDE COND=(6,1,BI,EQ,X'1E',&,23,1,BI,EQ,X'03')\n     SORT FIELDS=(340,4,BI,D)\n   Sort by CPU time descending — top entry is your culprit\n\n3. COMMON CAUSES:\n   a. Infinite loop in COBOL PERFORM\n   b. Full table scan in DB2 (missing index)\n   c. VSAM sequential read of entire file\n   d. Sort of very large file\n   e. Data volume increase (month-end)\n\n4. IMMEDIATE ACTIONS:\n   - CANCEL jobname — if confirmed runaway\n   - P jobname — gentler purge\n   - Check WLM: is job in wrong service class?\n\n5. FIX:\n   - Add/rebuild DB2 indexes (RUNSTATS first)\n   - Optimize COBOL loops (binary search vs linear)\n   - Add VSAM buffers\n   - Split large jobs into parallel streams`,
    tags:["performance","cpu","smf","monitoring"]
  },
  {
    id:"s16", category:"Performance", difficulty:"Expert",
    question:"A CICS region has response time SLA of 200ms but peak hour response is 800ms. DB2 thread waits are high. How do you tune it?",
    answer:`CICS-DB2 PERFORMANCE TUNING:\n\n1. IDENTIFY BOTTLENECK:\n   CICS Statistics: EXEC CICS INQUIRE SYSTEM\n   Check: MAXTASKS, DSALIMIT, task suspensions\n   DB2: -DIS THREAD(*) TYPE(ACTIVE)\n   Look for: lock waits, thread reuse, plan binds\n\n2. DB2 THREAD OPTIMIZATION:\n   Current: THREADS=50 in RCT\n   Increase: THREADS=100,TWAIT=POOL,THRDMAX=200\n   Enable thread reuse: THRDA=50 (protected threads)\n   This eliminates THREAD CREATE/TERMINATE overhead\n\n3. SQL OPTIMIZATION:\n   Run EXPLAIN on top SQL:\n   - Replace tablespace scans with index access\n   - Add covering indexes for frequently used queries\n   - Use FETCH FIRST n ROWS for list displays\n   - Avoid DISTINCT — use EXISTS instead\n\n4. LOCK CONTENTION:\n   -DIS DB(dbname) USE — check lock holders\n   Fix: ISOLATION(CS) instead of RR\n   Use CURRENTDATA(NO) for read-mostly\n   COMMIT every 100 rows in batch updates\n\n5. CICS TUNING:\n   MAXTASK=200 (allow more concurrent tasks)\n   DSALIM=512M (increase if DSA pressure)\n   Enable MRO for workload distribution\n\n6. VSAM LSR POOLS:\n   Dedicated LSR pool for hot VSAM files\n   LSRPOOL=2,MAXK=32768,DATA=20,INDEX=10`,
    tags:["cics","db2","performance","tuning","sla"]
  },
  // ─── MORE JCL SCENARIOS ───
  {
    id:"s17", category:"JCL", difficulty:"Intermediate",
    question:"A job needs to conditionally execute STEP3 only if STEP1 RC=0 AND STEP2 RC<=4. How do you code this in JCL?",
    answer:`CONDITIONAL EXECUTION IN JCL:\n\nMethod 1 — COND parameter (traditional):\n//STEP3 EXEC PGM=MYPROG,\n//  COND=((0,NE,STEP1),(4,LT,STEP2))\n\nThis means: SKIP STEP3 if:\n- STEP1 RC is NOT EQUAL to 0 (i.e., skip if STEP1 failed)\n- STEP2 RC is LESS THAN 4 is FALSE... \n\nWARNING: COND is confusing! It tests when to SKIP.\n\nMethod 2 — IF/THEN/ELSE (preferred, clearer):\n//  IF (STEP1.RC = 0 & STEP2.RC <= 4) THEN\n//STEP3  EXEC PGM=MYPROG\n//INPUT  DD DSN=MY.DATA,DISP=SHR\n//OUTPUT DD DSN=MY.OUTPUT,DISP=(NEW,CATLG)\n//  ENDIF\n\nMethod 3 — SET + IF for dynamic control:\n// SET RUNSTP3=YES\n//  IF (STEP1.RC > 0) THEN\n// SET RUNSTP3=NO\n//  ENDIF\n//  IF (STEP2.RC > 4) THEN\n// SET RUNSTP3=NO\n//  ENDIF\n//  IF (&RUNSTP3 = YES) THEN\n//STEP3  EXEC PGM=MYPROG\n//  ENDIF\n\nBEST PRACTICE: Always use IF/THEN/ELSE over COND.`,
    tags:["jcl","conditional","cond","if-then"]
  },
  {
    id:"s18", category:"JCL", difficulty:"Expert",
    question:"Design a JCL job that processes 100 million records using 5 parallel steps, merges results, and handles any step failure gracefully.",
    answer:`PARALLEL PROCESSING JCL PATTERN:\n\n//PARJOB  JOB ,'PARALLEL',CLASS=A,NOTIFY=&SYSUID,\n//  REGION=0M,MEMLIMIT=4G\n//*\n//* Split input into 5 ranges by key\n//SPLIT   EXEC PGM=SORT\n//SORTIN  DD DSN=PROD.MASTER.INPUT,DISP=SHR\n//OUT1    DD DSN=&&PART1,DISP=(NEW,PASS)\n//OUT2    DD DSN=&&PART2,DISP=(NEW,PASS)\n//OUT3    DD DSN=&&PART3,DISP=(NEW,PASS)\n//OUT4    DD DSN=&&PART4,DISP=(NEW,PASS)\n//OUT5    DD DSN=&&PART5,DISP=(NEW,PASS)\n//SYSIN   DD *\n  SORT FIELDS=COPY\n  OUTFIL FNAMES=OUT1,INCLUDE=(1,2,CH,LE,C'CF')\n  OUTFIL FNAMES=OUT2,INCLUDE=(1,2,CH,GT,C'CF',&,...LE,C'KZ')\n  OUTFIL FNAMES=OUT3,...(similar ranges)\n  OUTFIL FNAMES=OUT4,...\n  OUTFIL FNAMES=OUT5,SAVE\n/*\n//*\n//* Process each part (submit as separate jobs or use GDG)\n//PROC1   EXEC PGM=PROCESS,PARM='PART1'\n//PROC2   EXEC PGM=PROCESS,PARM='PART2'\n//PROC3   EXEC PGM=PROCESS,PARM='PART3'\n//PROC4   EXEC PGM=PROCESS,PARM='PART4'\n//PROC5   EXEC PGM=PROCESS,PARM='PART5'\n//*\n//* Merge all results\n//  IF (PROC1.RC <= 4 & PROC2.RC <= 4 &\n//      PROC3.RC <= 4 & PROC4.RC <= 4 &\n//      PROC5.RC <= 4) THEN\n//MERGE   EXEC PGM=SORT\n//IN1-5   DD ... (all 5 outputs)\n//SORTOUT DD DSN=PROD.FINAL.OUTPUT,...\n//  ELSE\n//FAILSTEP EXEC PGM=IEFBR14\n// Set RC=16 to trigger alerts\n//  ENDIF\n\nNOTE: For true parallel execution, submit 5 separate\njobs via CA7 with a common successor merge job.`,
    tags:["jcl","parallel","sort","performance","expert"]
  },
  // ─── MORE COBOL SCENARIOS ───
  {
    id:"s19", category:"COBOL", difficulty:"Beginner",
    question:"What is the difference between COMP, COMP-1, COMP-2, and COMP-3 in COBOL? When do you use each?",
    answer:`COBOL COMPUTATIONAL FORMATS:\n\nCOMP (BINARY):\n  Storage: 2, 4, or 8 bytes\n  PIC S9(4) COMP = 2 bytes (halfword)\n  PIC S9(9) COMP = 4 bytes (fullword)\n  PIC S9(18) COMP = 8 bytes (doubleword)\n  USE: Counters, subscripts, indexes\n  FAST for arithmetic on IBM Z\n\nCOMP-1 (Single-precision float):\n  Storage: 4 bytes\n  Range: ~7 significant digits\n  USE: Scientific calculations (RARE in business)\n  AVOID: Financial calculations (rounding errors!)\n\nCOMP-2 (Double-precision float):\n  Storage: 8 bytes\n  Range: ~16 significant digits\n  USE: Engineering/scientific only\n  AVOID: Money calculations\n\nCOMP-3 (Packed Decimal):\n  Storage: (digits+1)/2 bytes\n  PIC S9(7) COMP-3 = 4 bytes\n  Each byte holds 2 digits, last nibble = sign\n  USE: All financial/business calculations\n  This is THE standard for mainframe business data\n\nBEST PRACTICES:\n- Financial data → COMP-3 (always)\n- Loop counters → COMP (fastest)\n- Array subscripts → COMP\n- Never use COMP-1/COMP-2 for money\n- Use COMP-3 for file/DB2 fields`,
    tags:["cobol","comp","data-types","fundamentals"]
  },
  {
    id:"s20", category:"COBOL", difficulty:"Expert",
    question:"A COBOL batch program processes 50 million records and takes 4 hours. Management wants it under 1 hour. What optimization strategies do you apply?",
    answer:`COBOL PERFORMANCE OPTIMIZATION (4hr → 1hr):\n\n1. I/O OPTIMIZATION (Biggest wins):\n   - BLKSIZE: Increase to half-track (27998 for 3390)\n     DCB=(RECFM=FB,LRECL=200,BLKSIZE=27800)\n   - BUFNO: Add buffers\n     AMP=('BUFND=20') for VSAM\n   - Replace sequential READ with BLOCK READ\n\n2. USE SORT INSTEAD OF COBOL LOGIC:\n   If filtering/summarizing: DFSORT is 10-100x faster\n   //STEP1 EXEC PGM=SORT not PGM=MYPROG\n\n3. COBOL CODE CHANGES:\n   a. BINARY counters:\n      01 WS-COUNT PIC S9(9) COMP.  (not DISPLAY)\n   b. Replace COMPUTE with ADD/SUBTRACT for simple math\n   c. Minimize PERFORM VARYING — use inline code\n   d. SEARCH ALL (binary) instead of SEARCH (linear)\n   e. Avoid STRING/UNSTRING in inner loops\n   f. Use reference modification: WS-DATA(1:5)\n\n4. DB2 OPTIMIZATION:\n   - Multi-row FETCH: FETCH FIRST 100 ROWS\n   - OPTIMIZE FOR 100 ROWS\n   - Use ROWSET positioning\n   - Avoid singleton SELECT in loops\n\n5. ARCHITECTURE:\n   - Split into 5 parallel streams by key range\n   - Process each stream in separate job step\n   - Merge results at end\n   Expected: 4hr / 5 = 48 minutes`,
    tags:["cobol","performance","optimization","batch"]
  },
  // ─── MORE DB2 SCENARIOS ───
  {
    id:"s21", category:"DB2", difficulty:"Beginner",
    question:"Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN in DB2 with examples.",
    answer:`DB2 JOIN TYPES:\n\nSample tables:\n  EMPLOYEE: (EMPID, NAME, DEPTID)\n  DEPARTMENT: (DEPTID, DEPTNAME)\n\n1. INNER JOIN — Only matching rows from both:\n   SELECT E.NAME, D.DEPTNAME\n   FROM EMPLOYEE E\n   INNER JOIN DEPARTMENT D ON E.DEPTID = D.DEPTID\n   Result: Only employees who have a valid department\n   Employees with NULL DEPTID are EXCLUDED\n\n2. LEFT JOIN — All from left + matching from right:\n   SELECT E.NAME, D.DEPTNAME\n   FROM EMPLOYEE E\n   LEFT JOIN DEPARTMENT D ON E.DEPTID = D.DEPTID\n   Result: ALL employees, even those without department\n   DEPTNAME shows NULL for unmatched employees\n\n3. FULL OUTER JOIN — All from both sides:\n   SELECT E.NAME, D.DEPTNAME\n   FROM EMPLOYEE E\n   FULL OUTER JOIN DEPARTMENT D ON E.DEPTID = D.DEPTID\n   Result: All employees + all departments\n   NULLs appear on both sides where no match exists\n\nPERFORMANCE TIP:\n- INNER JOIN is fastest (less data)\n- LEFT JOIN for master-detail reports\n- FULL OUTER JOIN is slowest — avoid in OLTP\n- Always join on indexed columns`,
    tags:["db2","sql","joins","fundamentals"]
  },
  {
    id:"s22", category:"DB2", difficulty:"Expert",
    question:"A DB2 SQL query that ran in 2 seconds yesterday now takes 45 seconds. Code hasn't changed. Diagnose and fix.",
    answer:`DB2 PERFORMANCE REGRESSION DIAGNOSIS:\n\n1. CHECK STATISTICS (Most likely cause):\n   RUNSTATS was either: not run, or ran and changed access path\n   SELECT CARD, NPAGES FROM SYSIBM.SYSTABLES\n   WHERE NAME = 'MYTABLE'\n   If CARD = -1: stats are stale → run RUNSTATS\n\n2. EXPLAIN THE QUERY:\n   EXPLAIN ALL SET QUERYNO=999 FOR\n   SELECT ... (your query)\n   \n   Check PLAN_TABLE:\n   SELECT ACCESSTYPE, MATCHCOLS, INDEXONLY, METHOD\n   FROM PLAN_TABLE WHERE QUERYNO=999\n   \n   Look for: ACCESSTYPE='R' (tablespace scan = bad)\n   Should be: ACCESSTYPE='I' (index access)\n\n3. FIX ACCESS PATH:\n   a. Run RUNSTATS:\n      RUNSTATS TABLESPACE dbname.tsname\n        TABLE(schema.table) INDEX(ALL)\n        SHRLEVEL REFERENCE\n   b. REBIND the package:\n      REBIND PACKAGE(collection.package)\n   c. If still bad: CREATE INDEX on join/filter columns\n\n4. CHECK LOCK CONTENTION:\n   -DIS THREAD(*) — check for lock waits\n   DISPLAY DATABASE(db) SPACENAM(ts) USE\n   Someone holding locks on the table?\n\n5. OTHER CAUSES:\n   - Buffer pool pressure (BP flushed by month-end batch)\n   - Index CLUSTERRATIO dropped (needs REORG)\n   - Data volume tripled (month-end)\n   - LPAR CPU change affecting parallelism`,
    tags:["db2","performance","explain","runstats"]
  },
  // ─── MORE CICS SCENARIOS ───
  {
    id:"s23", category:"CICS", difficulty:"Beginner",
    question:"What is the difference between COMMAREA and CHANNEL/CONTAINER in CICS? When should you use each?",
    answer:`CICS DATA PASSING MECHANISMS:\n\nCOMMAREA (Communication Area):\n  Max size: 32,763 bytes (32KB)\n  How: EXEC CICS LINK PROGRAM('PROG1')\n       COMMAREA(WS-COMM) LENGTH(500)\n  Pros: Simple, well-understood, fast\n  Cons: 32KB limit, single flat data structure\n  Use when: Data fits in 32KB, simple request/response\n\nCHANNEL/CONTAINER:\n  Max size: Unlimited (limited by storage)\n  How:\n  EXEC CICS PUT CONTAINER('REQUEST')\n       CHANNEL('MYSERVICE')\n       FROM(WS-REQUEST-DATA)\n       FLENGTH(LENGTH OF WS-REQUEST-DATA)\n  \n  EXEC CICS LINK PROGRAM('PROG1')\n       CHANNEL('MYSERVICE')\n  \n  EXEC CICS GET CONTAINER('RESPONSE')\n       CHANNEL('MYSERVICE')\n       INTO(WS-RESPONSE)\n  \n  Pros: No size limit, named containers, structured\n  Cons: Slightly more code\n  Use when: Data > 32KB, XML/JSON payloads,\n            microservices pattern, web services\n\nBEST PRACTICE:\n  New development → Always use CHANNEL/CONTAINER\n  Existing programs → Keep COMMAREA if < 32KB\n  z/OS Connect APIs → Requires CHANNEL/CONTAINER`,
    tags:["cics","commarea","channel","container"]
  },
  {
    id:"s24", category:"CICS", difficulty:"Advanced",
    question:"CICS transactions are experiencing ATSP abends during peak. What does this mean and how do you fix it?",
    answer:`ATSP ABEND — DEADLOCK TIMEOUT:\n\nATSP = Transaction purged because it exceeded DTIMOUT (deadlock timeout).\n\n1. IMMEDIATE DIAGNOSIS:\n   CICS LOG: Check CSMT log for ATSP messages\n   EXEC CICS INQUIRE SYSTEM — check MAXTASKS, active tasks\n   What resource was the task waiting for?\n\n2. COMMON CAUSES:\n   a. DB2 lock contention:\n      Transaction A holds lock on row 1, wants row 2\n      Transaction B holds lock on row 2, wants row 1\n      → Deadlock! DB2 resolves but CICS times out\n   b. VSAM record-level locking:\n      Multiple tasks updating same VSAM record\n   c. CICS enqueue waits:\n      ENQ on shared resource with NOSUSPEND missing\n\n3. IMMEDIATE FIX:\n   Increase DTIMOUT:\n   CEDA ALTER TRANS(XXXX) DTIMOUT(60)\n   (Default is often 30 seconds)\n\n4. ROOT CAUSE FIXES:\n   a. DB2: COMMIT more frequently\n      Don't hold locks across CICS SEND/RECEIVE\n      Use ISOLATION(CS) not ISOLATION(RR)\n   b. VSAM: READ UPDATE only when needed\n      Release lock with REWRITE/DELETE quickly\n   c. Design: Access resources in consistent order\n      Always lock TABLE A before TABLE B\n\n5. MONITORING:\n   Track ATSP count in CICS statistics\n   Alert if > 10 per hour`,
    tags:["cics","atsp","deadlock","performance"]
  },
  // ─── TSO / ISPF SCENARIOS ───
  {
    id:"s25", category:"TSO", difficulty:"Beginner",
    question:"You're new to a mainframe environment. How do you navigate ISPF to find a dataset, edit it, submit JCL, and check output?",
    answer:`ISPF NAVIGATION GUIDE:\n\n1. FIND A DATASET:\n   ISPF 3.4 (Dataset List Utility)\n   Enter: PROD.BATCH.** in DSNAME LEVEL\n   Press ENTER — shows all matching datasets\n   Type 'B' next to dataset to Browse\n   Type 'E' to Edit\n\n2. EDIT A MEMBER:\n   ISPF 2 (Edit)\n   Enter: 'PROD.SOURCE.JCL(MYJOB)'\n   Edit commands:\n   I = Insert line\n   D = Delete line\n   C/CC = Copy, M/MM = Move\n   F string = Find text\n   CHANGE string1 string2 ALL = Replace all\n   SAVE = Save changes\n   SUBMIT = Submit as JCL job\n\n3. SUBMIT JCL:\n   In editor: Type SUBMIT on command line\n   Or: =SD (Submit from DSLIST)\n   Note the job number: JOB12345\n\n4. CHECK OUTPUT:\n   ISPF SD.ST (SDSF Status Display)\n   Or: TSO command: STATUS MYJOB\n   In SDSF:\n   - ST = Status of jobs\n   - H = Held output\n   - Type 'S' next to job to see output\n   - Type '?' to see all DDNAMEs\n   - Check JESMSGLG for JCL errors\n   - Check SYSOUT for program output\n\nSHORTCUTS:\n  =3.4 from any panel goes to DSLIST\n  =SD goes to SDSF\n  =2 goes to Edit`,
    tags:["tso","ispf","navigation","beginner"]
  },
  // ─── SECURITY / RACF ───
  {
    id:"s26", category:"RACF", difficulty:"Expert",
    question:"Audit found 200+ RACF user IDs with SPECIAL attribute. How do you remediate this security risk?",
    answer:`RACF SPECIAL ATTRIBUTE REMEDIATION:\n\nSPECIAL = Full RACF administrative authority.\nShould be limited to 3-5 security admins maximum.\n\n1. IDENTIFY ALL SPECIAL USERS:\n   SEARCH CLASS(USER) SPECIAL\n   Output: List of all user IDs with SPECIAL\n\n2. CATEGORIZE:\n   a. True security admins (keep SPECIAL): 3-5 users\n   b. System programmers (need OPERATIONS instead)\n   c. Application support (need group-level authority)\n   d. Historical/legacy (remove immediately)\n   e. Service accounts (should NEVER have SPECIAL)\n\n3. REMOVE SPECIAL:\n   ALTUSER userid NOSPECIAL\n   Do in batches, document each change\n\n4. REPLACE WITH PROPER AUTHORITY:\n   For group admins:\n   CONNECT userid GROUP(grpname) AUTH(USE) ADSP\n   \n   For dataset admins:\n   PERMIT 'HLQ.**' CLASS(DATASET) ID(userid) ACCESS(ALTER)\n   \n   For system programmers:\n   ALTUSER userid OPERATIONS  (instead of SPECIAL)\n\n5. PREVENT RECURRENCE:\n   Implement SETROPTS AUDIT for:\n   SETROPTS AUDIT(SPECIAL)\n   This logs every SPECIAL attribute change\n   \n   Create monthly report:\n   SEARCH CLASS(USER) SPECIAL\n   Alert if count > 5\n\n6. COMPLIANCE:\n   Document the remediation for SOX/PCI-DSS\n   Update security policy to require dual approval\n   for SPECIAL attribute grants`,
    tags:["racf","security","audit","compliance","expert"]
  },
  // ─── MODERNIZATION SCENARIOS ───
  {
    id:"s27", category:"Modernization", difficulty:"Intermediate",
    question:"Leadership wants to expose a 30-year-old CICS/COBOL application as a mobile REST API. Timeline: 3 months. What's your plan?",
    answer:`MAINFRAME API MODERNIZATION PLAN:\n\nWeek 1-2: DISCOVERY & MAPPING\n- Inventory all CICS transactions (CEDA DISPLAY)\n- Map transactions to REST resources:\n  CINQ → GET /api/customers/{id}\n  CUPD → PUT /api/customers/{id}\n  CORD → POST /api/orders\n- Document COMMAREA/copybook structures\n- Identify which transactions are suitable for API\n\nWeek 3-4: z/OS CONNECT SETUP\n- Install z/OS Connect EE\n- Configure CICS connection:\n  cicsConnection → point to target CICS region\n- Set up API requester for outbound calls\n\nWeek 5-8: SERVICE DEFINITIONS\n- For each API endpoint:\n  1. Create Service: maps JSON ↔ COBOL copybook\n  2. Create API: defines REST endpoint + HTTP methods\n  3. Test with Swagger UI\n- Example service.json:\n  { "name":"getCustomer", "connection":{\n    "cicsServer":"CICSPROD",\n    "transactionId":"CINQ",\n    "commarea":{"requestCopybook":"CINQREQ",\n                "responseCopybook":"CINQRSP"}}}\n\nWeek 9-10: SECURITY & AUTH\n- Configure OAuth 2.0 via API Connect or z/OS Connect\n- Map JWT tokens to RACF user IDs\n- Set up SSL/TLS certificates\n\nWeek 11-12: TESTING & GO-LIVE\n- Performance test: target < 200ms response\n- Load test: simulate 1000 concurrent mobile users\n- Deploy to production with API gateway\n\nKEY: Zero changes to existing COBOL code!`,
    tags:["modernization","api","zos-connect","cics","rest"]
  },
  {
    id:"s28", category:"Modernization", difficulty:"Expert",
    question:"Your company wants to migrate 5000 COBOL programs to Java. You need to present a strategy to the CTO. What do you recommend?",
    answer:`COBOL MIGRATION STRATEGY — CTO PRESENTATION:\n\nRECOMMENDATION: Do NOT rewrite everything.\n75% of rewrite projects fail. Use the Strangler Fig pattern.\n\nPHASE 1 — EXPOSE (Month 1-6):\n  Don't touch COBOL. Wrap it with APIs.\n  - z/OS Connect exposes CICS transactions as REST\n  - New mobile/web frontends call these APIs\n  - COBOL continues running untouched\n  - Zero risk, immediate value\n\nPHASE 2 — EXTEND (Month 6-18):\n  Build NEW features in modern tech.\n  - New microservices in Java/Node on OpenShift\n  - They call mainframe APIs for existing data\n  - New UI talks to both old APIs + new services\n  - Gradually route traffic to new services\n\nPHASE 3 — EXTRACT (Month 18-36):\n  Selectively rewrite high-value programs.\n  - Identify top 20% programs (80% of transactions)\n  - Rewrite THESE in Java, one at a time\n  - Keep mainframe running for remaining 80%\n  - Each rewrite: redirect API traffic to new service\n\nPHASE 4 — EVALUATE (Ongoing):\n  Some COBOL may NEVER need rewriting.\n  - If it works, it works\n  - Cost of rewrite > cost of maintenance?\n  - Keep on mainframe — it's reliable\n\nCOST COMPARISON:\n  Full rewrite: $50-100M, 5 years, high risk\n  Strangler Fig: $5-15M, 3 years, low risk\n  The mainframe isn't the problem — the interface is.`,
    tags:["modernization","migration","strategy","architecture"]
  },
// ─── FILL ALL GAPS: Every category × Every level ───

// JCL - Advanced
{ id:"s29", category:"JCL", difficulty:"Advanced", question:"A production GDG (Generation Data Group) has reached its LIMIT and new generations are failing with NOT CATLGD 2. How do you resolve this without losing data?", answer:`GDG LIMIT RESOLUTION:\n\n1. CHECK CURRENT STATE:\n   LISTCAT ENT('PROD.PAYROLL.GDG') GDG ALL\n   Shows: LIMIT(30), current generations, SCRATCH/NOSCRATCH\n\n2. IMMEDIATE FIX — Increase limit:\n   //GDGFIX EXEC PGM=IDCAMS\n   //SYSIN DD *\n     ALTER PROD.PAYROLL.GDG LIMIT(50)\n   /*\n\n3. IF GENERATIONS NEED CLEANUP:\n   Delete oldest generations:\n   DELETE PROD.PAYROLL.GDG.G0001V00 NOSCRATCH\n   Or let GDG roll off naturally with SCRATCH attribute\n\n4. BEST PRACTICES:\n   - Set LIMIT based on retention needs (e.g., 30 days = LIMIT(30))\n   - Use SCRATCH option to auto-delete oldest when limit reached\n   - EMPTY vs NOEMPTY: EMPTY deletes all on rolloff, NOEMPTY keeps\n   - Monitor GDG usage in monthly housekeeping jobs`, tags:["jcl","gdg","catalog","production"] },

// COBOL - Advanced
{ id:"s30", category:"COBOL", difficulty:"Advanced", question:"Your COBOL program needs to call a REST API on a distributed server and process the JSON response. How do you implement this on z/OS?", answer:`COBOL REST API INTEGRATION:\n\nOption 1 — z/OS Connect (Recommended):\n  COBOL calls CICS LINK to a z/OS Connect service\n  z/OS Connect handles HTTP/JSON externally\n  COBOL only sees copybook structures — zero JSON parsing\n\nOption 2 — Enterprise COBOL V6.3 JSON PARSE:\n  01 WS-JSON-RESPONSE PIC X(5000).\n  01 WS-EMPLOYEE.\n    05 EMP-NAME    PIC X(30).\n    05 EMP-SALARY  PIC 9(8)V99.\n  \n  CALL 'HWTJSCRE' USING ... (create HTTP request)\n  CALL 'HWTJCONN' USING ... (connect to server)\n  CALL 'HWTJREQ'  USING ... (send GET request)\n  CALL 'HWTJRSPS' USING ... (receive response)\n  \n  JSON PARSE WS-JSON-RESPONSE\n    INTO WS-EMPLOYEE\n    NAME OF EMP-NAME IS 'name'\n    NAME OF EMP-SALARY IS 'salary'\n  END-JSON\n\nOption 3 — CICS Web Services:\n  EXEC CICS WEB OPEN HOST('api.server.com')\n  EXEC CICS WEB SEND (HTTP request)\n  EXEC CICS WEB RECEIVE INTO(WS-RESPONSE)\n  Then JSON PARSE the response\n\nBest practice: Use z/OS Connect — no COBOL changes needed.`, tags:["cobol","api","json","rest","advanced"] },

// DB2 - Intermediate
{ id:"s31", category:"DB2", difficulty:"Intermediate", question:"You need to write a DB2 query that finds all employees who earn more than their department average. How do you approach this?", answer:`DB2 CORRELATED SUBQUERY SOLUTION:\n\nMethod 1 — Correlated subquery:\n  SELECT E.EMPID, E.NAME, E.SALARY, E.DEPTID\n  FROM EMPLOYEE E\n  WHERE E.SALARY > (\n    SELECT AVG(E2.SALARY)\n    FROM EMPLOYEE E2\n    WHERE E2.DEPTID = E.DEPTID\n  )\n  ORDER BY E.DEPTID, E.SALARY DESC\n\nMethod 2 — CTE (Common Table Expression) — often faster:\n  WITH DEPT_AVG AS (\n    SELECT DEPTID, AVG(SALARY) AS AVG_SAL\n    FROM EMPLOYEE\n    GROUP BY DEPTID\n  )\n  SELECT E.EMPID, E.NAME, E.SALARY, \n         D.AVG_SAL AS DEPT_AVERAGE\n  FROM EMPLOYEE E\n  JOIN DEPT_AVG D ON E.DEPTID = D.DEPTID\n  WHERE E.SALARY > D.AVG_SAL\n  ORDER BY E.DEPTID\n\nMethod 3 — OLAP function (most elegant):\n  SELECT * FROM (\n    SELECT EMPID, NAME, SALARY, DEPTID,\n           AVG(SALARY) OVER(PARTITION BY DEPTID) AS DEPT_AVG\n    FROM EMPLOYEE\n  ) T\n  WHERE SALARY > DEPT_AVG\n\nPerformance: CTE > OLAP > Correlated subquery`, tags:["db2","sql","subquery","intermediate"] },

// CICS - Expert
{ id:"s32", category:"CICS", difficulty:"Expert", question:"Design a CICS microservices architecture where 5 CICS regions handle different domains. How do you implement inter-region communication and transaction coordination?", answer:`CICS MICROSERVICES ARCHITECTURE:\n\n1. REGION DESIGN:\n   CICS-CUST: Customer management\n   CICS-ORD:  Order processing\n   CICS-INV:  Inventory\n   CICS-PAY:  Payments\n   CICS-REPT: Reporting\n\n2. INTER-REGION COMMUNICATION:\n   MRO (Multi-Region Operation):\n   - Function shipping: CICS-ORD reads customer via CICS-CUST\n   - Transaction routing: route CINQ to CICS-CUST\n   - DPL (Distributed Program Link): synchronous calls\n   \n   IPIC (IP Interconnectivity):\n   - Modern TCP/IP based connection\n   - Supports channels/containers (no 32KB limit)\n   - Better for z/OS Connect integration\n\n3. TRANSACTION COORDINATION:\n   Two-Phase Commit across regions:\n   - CICS-ORD creates order (SYNCPOINT)\n   - CICS-INV decrements stock\n   - CICS-PAY charges customer\n   - All commit together or all rollback\n   Configure: SYSID, CONNECTION, SESSIONS in CSD\n\n4. SERVICE MESH PATTERN:\n   Each region exposes APIs via z/OS Connect\n   API Gateway routes to correct region\n   Circuit breaker pattern via CICS policy rules\n   Health checks via CICS WEB services\n\n5. MONITORING:\n   CICSPlex SM for cross-region management\n   Workload balancing across AORs`, tags:["cics","microservices","mro","architecture","expert"] },

// VSAM - Intermediate
{ id:"s33", category:"VSAM", difficulty:"Intermediate", question:"How do you use IDCAMS REPRO to backup a VSAM KSDS, and what's the difference between REPRO and EXPORT?", answer:`VSAM BACKUP METHODS:\n\nREPRO (Logical copy — records only):\n  //BACKUP EXEC PGM=IDCAMS\n  //VSAMDD DD DSN=PROD.VSAM.KSDS,DISP=SHR\n  //SEQDD  DD DSN=BACKUP.SEQ.FILE,DISP=(NEW,CATLG),\n  //          SPACE=(CYL,(100,50)),DCB=(RECFM=VB,LRECL=32756)\n  //SYSIN  DD *\n    REPRO INFILE(VSAMDD) OUTFILE(SEQDD)\n  /*\n  \n  Pros: Platform independent, human-readable\n  Cons: Loses cluster definition, slower\n  Restore: REPRO INFILE(SEQDD) OUTFILE(VSAMDD)\n  NOTE: Target VSAM must exist before restore\n\nEXPORT (Physical copy — data + catalog info):\n  //EXPORT EXEC PGM=IDCAMS\n  //SYSIN  DD *\n    EXPORT PROD.VSAM.KSDS -\n      OUTFILE(EXPDD) -\n      TEMPORARY\n  /*\n  //EXPDD DD DSN=BACKUP.EXPORT.FILE,...\n  \n  Pros: Preserves cluster definition, faster\n  Cons: z/OS specific format\n  Restore: IMPORT INFILE(IMPDD) OUTDATASET(PROD.VSAM.KSDS)\n  NOTE: IMPORT recreates cluster automatically\n\nBEST PRACTICE:\n  Daily backup: EXPORT (faster, self-contained)\n  Migration/archive: REPRO (portable)\n  Always verify: VERIFY DATASET(PROD.VSAM.KSDS)`, tags:["vsam","backup","repro","export","idcams"] },

// VSAM - Expert
{ id:"s34", category:"VSAM", difficulty:"Expert", question:"A VSAM KSDS serving online CICS transactions has 200ms response time instead of target 5ms. LISTCAT shows 127 extents and 60% CI splits. Design a complete recovery and prevention plan.", answer:`VSAM CRITICAL PERFORMANCE RECOVERY:\n\n1. EMERGENCY ASSESSMENT:\n   LISTCAT ENT(PROD.CICS.KSDS) ALL\n   Key metrics:\n   - EXTENTS: 127 (max 255 before failure!)\n   - CI-SPLITS: 60% (terrible — causes random I/O)\n   - CA-SPLITS: Check count\n   - FREESPACE: Likely 0% remaining\n   - REC-TOTAL vs REC-DELETED (fragmentation)\n\n2. EMERGENCY REORG (coordinate with CICS):\n   Step 1: Close file in CICS: CEMT SET FILE(xxxx) CLOSE\n   Step 2: EXPORT for safety:\n     EXPORT PROD.CICS.KSDS OUTFILE(BKUP) TEMPORARY\n   Step 3: DELETE and REDEFINE:\n     DELETE PROD.CICS.KSDS CLUSTER\n     DEFINE CLUSTER(NAME(PROD.CICS.KSDS) -\n       INDEXED KEYS(10 0) -\n       RECSZ(500 600) -\n       FREESPACE(30 20) -\n       SHAREOPTIONS(2 3) -\n       CISZ(8192) -\n       CYLINDERS(200 50))\n   Step 4: IMPORT INFILE(BKUP) OUTDATASET(...)\n   Step 5: CEMT SET FILE(xxxx) OPEN\n\n3. PREVENTION PLAN:\n   - Weekly automated REORG job via CA7\n   - SMF Type 64 monitoring for split alerts\n   - FREESPACE(30 20) for high-insert workloads\n   - CISZ tuned to record size (4K-8K optimal)\n   - Primary allocation large enough to avoid extents\n   - BUFND=30,BUFNI=15 in CICS FCT`, tags:["vsam","performance","reorg","cics","expert"] },

// REXX - Advanced
{ id:"s35", category:"REXX", difficulty:"Advanced", question:"Write a REXX exec that reads a PDS directory, finds all members modified in the last 7 days, and generates a report.", answer:`/* REXX - PDS Member Modification Report */\nARG PDSNAME\nIF PDSNAME = '' THEN DO\n  SAY 'Usage: PDSRPT pds.name'\n  EXIT 8\nEND\n\n/* Get member list using ISPF services */\nADDRESS ISPEXEC\n\"LMINIT DATAID(DID) DATASET('\"PDSNAME\"') ENQ(SHR)\"\n\"LMOPEN DATAID(\"DID\") OPTION(INPUT)\"\n\nCOUNT = 0\nSAY COPIES('=',60)\nSAY 'PDS MODIFICATION REPORT:' PDSNAME\nSAY 'Generated:' DATE() TIME()\nSAY COPIES('=',60)\nSAY LEFT('MEMBER',10) LEFT('MODIFIED',12) LEFT('USER',8) 'SIZE'\nSAY COPIES('-',60)\n\nMBR = ''\nDO FOREVER\n  \"LMMLIST DATAID(\"DID\") OPTION(LIST) MEMBER(MBR)\"\n  IF RC \\= 0 THEN LEAVE\n  \n  /* Get member stats */\n  \"LMMFIND DATAID(\"DID\") MEMBER(\"MBR\") STATS(YES)\"\n  \n  /* Check if modified within 7 days */\n  MODDATE = ZLMDATE  /* YYYY/MM/DD format */\n  TODAY = DATE('S')  /* YYYYMMDD */\n  MDATE = TRANSLATE(MODDATE,,'/')\n  DIFF = TODAY - MDATE\n  \n  IF DIFF <= 7 THEN DO\n    COUNT = COUNT + 1\n    SAY LEFT(MBR,10) LEFT(ZLMDATE,12) LEFT(ZLMUSER,8) ZLCNORC\n  END\nEND\n\nSAY COPIES('=',60)\nSAY 'Members modified in last 7 days:' COUNT\n\n\"LMCLOSE DATAID(\"DID\")\"\n\"LMFREE DATAID(\"DID\")\"\nEXIT 0\n\nNOTES:\n- Uses ISPF LM services for reliable PDS access\n- ZLMDATE, ZLMUSER, ZLCNORC are ISPF variables\n- Can be extended to email the report or write to dataset`, tags:["rexx","pds","ispf","report","advanced"] },

// REXX - Expert
{ id:"s36", category:"REXX", difficulty:"Expert", question:"Design a REXX automation framework that monitors 50 production batch jobs, detects abends in real-time via SDSF, and triggers recovery actions automatically.", answer:`/* REXX - Production Job Monitor Framework */\n\nDESIGN:\n1. CONFIGURATION TABLE (PDS member):\n   JOBNAME  RECOVERY_ACTION  ALERT_EMAIL  MAX_RETRIES\n   PAYJOB01 RESTART          oncall@co.com 3\n   GLPOST01 RERUN_STEP3      gl@co.com     2\n   RPTJOB01 NOTIFY_ONLY      mgr@co.com    0\n\n2. MAIN MONITOR LOOP:\n   RC = ISFCALLS('ON')\n   DO FOREVER\n     ISFPREFIX = '*'\n     ADDRESS SDSF \"ISFEXEC ST\"\n     DO I = 1 TO JNAME.0\n       IF POS('ABEND',RETCODE.I) > 0 THEN\n         CALL HANDLE_ABEND JNAME.I RETCODE.I\n       IF POS('JCL ERROR',RETCODE.I) > 0 THEN\n         CALL HANDLE_JCLERR JNAME.I\n     END\n     CALL SLEEP 30  /* Check every 30 seconds */\n   END\n\n3. RECOVERY ACTIONS:\n   HANDLE_ABEND:\n     PARSE ARG JOBNAME, RETCODE\n     /* Lookup in config table */\n     ACTION = GET_CONFIG(JOBNAME,'ACTION')\n     SELECT\n       WHEN ACTION = 'RESTART' THEN DO\n         \"SUBMIT 'PROD.JCL(\"JOBNAME\")'\"\n         CALL LOG 'Restarted' JOBNAME\n       END\n       WHEN ACTION = 'RERUN_STEP3' THEN DO\n         /* Modify JCL to restart from step */\n         CALL EDIT_RESTART JOBNAME, 'STEP3'\n       END\n       OTHERWISE CALL SEND_ALERT JOBNAME RETCODE\n     END\n\n4. ALERTING:\n   SEND_ALERT: Uses SMTP to email\n   Also writes to operator console:\n   \"WTO 'MONITOR: \"JOBNAME\" ABENDED \"RETCODE\"'\"\n\n5. LOGGING:\n   All actions logged to VSAM KSDS with timestamp\n   Monthly report generated from log`, tags:["rexx","automation","monitoring","sdsf","expert"] },

// IMS - Beginner
{ id:"s37", category:"IMS", difficulty:"Beginner", question:"What is the difference between IMS DB (Database) and IMS TM (Transaction Manager)? Explain with a real-world example.", answer:`IMS COMPONENTS EXPLAINED:\n\nIMS DB (Database Manager):\n  - Manages HIERARCHICAL databases\n  - Data organized as parent-child segments (like a tree)\n  - Example: Bank Account database\n    CUSTOMER (root)\n      └── ACCOUNT (child)\n           └── TRANSACTION (grandchild)\n  - Access via DL/I calls: GU, GN, GNP, ISRT, REPL, DLET\n  - Types: HDAM, HIDAM, HISAM, DEDB (Fast Path)\n\nIMS TM (Transaction Manager):\n  - Handles online transaction processing (like CICS)\n  - Receives messages from terminals/networks\n  - Routes to application programs (MPPs)\n  - Manages message queues\n  - Example flow:\n    Terminal → IMS Connect → IMS TM → MPP → IMS DB\n\nREAL-WORLD EXAMPLE (Bank ATM):\n  1. Customer inserts card at ATM\n  2. ATM sends message to IMS Connect (TCP/IP)\n  3. IMS TM receives, routes to MPP program ATMBAL\n  4. ATMBAL issues DL/I GU call to IMS DB\n     GU CUSTOMER(CUSTID='12345')\n        ACCOUNT(ACCTTYPE='CHECKING')\n  5. IMS DB returns account segment with balance\n  6. ATMBAL sends balance back through IMS TM\n  7. ATM displays: Balance $5,432.10\n\nIMS processes 50,000+ transactions per second.`, tags:["ims","fundamentals","database","transaction"] },

// IMS - Advanced
{ id:"s38", category:"IMS", difficulty:"Advanced", question:"An IMS HIDAM database is experiencing degraded performance on GN (Get Next) calls. Root cause analysis and fix?", answer:`IMS HIDAM PERFORMANCE DIAGNOSIS:\n\nHIDAM = Hierarchical Indexed Direct Access Method\nGN calls traverse segments sequentially under a root.\n\n1. CHECK DATABASE STATISTICS:\n   /DIS DB dbname\n   Look at: buffer pool hit ratio, I/O counts\n   IMS Monitor: Check random vs sequential I/O\n\n2. COMMON CAUSES OF SLOW GN:\n   a. Database needs REORG:\n      - Segments stored out of physical sequence\n      - Pointer chains fragmented\n      - Fix: Run DFSURGL0 (offline REORG)\n      - Or HALDB Online Reorg for 24/7 systems\n   \n   b. Insufficient buffers:\n      - VSAM LSR pool too small\n      - Fix: Increase DFSVSAMP buffers\n        VSRBF=8192,20  (20 buffers of 8K)\n   \n   c. Index needs rebuild:\n      - Primary index (HIDAM index) fragmented\n      - Fix: REORG the index dataset\n   \n   d. Long twin chains:\n      - Many child segments under one parent\n      - GN scans entire chain sequentially\n      - Fix: Add secondary index on search field\n        Or restructure DBD with more segment types\n\n3. TUNING:\n   - PROCOPT=G (read only) instead of PROCOPT=A\n   - Use GNP (Get Next within Parent) not GN\n   - Limit SSA qualifications to reduce I/O\n   - Consider converting to DEDB for hot data`, tags:["ims","hidam","performance","reorg","advanced"] },

// z/OS - Intermediate
{ id:"s39", category:"z/OS", difficulty:"Intermediate", question:"Explain WLM (Workload Manager) service classes and how they prioritize batch vs online work on z/OS.", answer:`z/OS WORKLOAD MANAGER (WLM):\n\nWLM controls HOW z/OS allocates CPU, memory, and I/O to different workloads.\n\nSERVICE CLASSES (priority groups):\n  1. SYSSTC (System tasks) — Highest priority\n     JES2, VTAM, TCP/IP, catalog\n  2. ONLINE (CICS, IMS TM) — High priority\n     Goal: 95% of transactions < 200ms\n  3. TSO INTERACTIVE — Medium-high\n     Goal: Response time < 1 second\n  4. BATCH PRODUCTION — Medium\n     Goal: Complete within batch window\n  5. BATCH DEVELOPMENT — Low\n     Goal: Best effort, no SLA\n  6. BATCH DISCRETIONARY — Lowest\n     Runs only when spare capacity\n\nHOW WLM WORKS:\n  - Each job assigned to service class by CLASSIFICATION RULES\n  - Rules match on: JOB name, JOB class, user ID, accounting\n  - WLM continuously monitors response time goals\n  - If CICS is missing its 200ms goal:\n    → WLM steals CPU from low-priority batch\n    → Adjusts dispatching priority dynamically\n  - If batch window is at risk:\n    → WLM boosts batch priority temporarily\n\nPRACTICAL EXAMPLE:\n  Month-end: batch jobs spike\n  WLM detects CICS degradation\n  WLM reduces batch dispatching priority\n  CICS recovers to 200ms goal\n  After peak: batch priority restored\n\nKEY: WLM is GOAL-BASED not PRIORITY-BASED.`, tags:["zos","wlm","workload","performance"] },

// z/OS - Expert
{ id:"s40", category:"z/OS", difficulty:"Expert", question:"Design a z/OS Sysplex configuration for a bank that needs 99.999% availability. What components and failover strategies do you implement?", answer:`z/OS PARALLEL SYSPLEX — 99.999% DESIGN:\n\n1. HARDWARE:\n   - 2 IBM z16 frames (different power grids)\n   - Coupling Facility (CF) on each frame\n   - FICON directors for cross-frame connectivity\n   - GDPS (Geographically Dispersed Parallel Sysplex)\n     for disaster recovery at remote site\n\n2. z/OS CONFIGURATION:\n   - 4 LPARs total (2 per frame)\n   - XCF (Cross-System Coupling Facility) links all 4\n   - Each LPAR runs: z/OS, CICS, DB2, IMS\n   - Shared DASD via PPRC (Peer-to-Peer Remote Copy)\n\n3. DATA SHARING:\n   - DB2 Data Sharing: all 4 members access same data\n   - VSAM RLS (Record Level Sharing) for CICS files\n   - Shared catalog (coupling facility structures)\n   - GRS (Global Resource Serialization) for ENQ\n\n4. FAILOVER:\n   - ARM (Automatic Restart Manager):\n     If CICS region fails → ARM restarts on same LPAR\n     If LPAR fails → ARM restarts on surviving LPAR\n   - WLM routes work away from failing system\n   - VTAM Generic Resources: CICS accessible via single name\n   - DB2 Group Attach: apps connect to DB2 group, not member\n\n5. DISASTER RECOVERY:\n   - GDPS: synchronous replication to DR site (< 50km)\n   - RPO = 0 (zero data loss)\n   - RTO < 10 minutes (automated failover)\n   - Annual DR test required for audit\n\nRESULT: No single point of failure at any level.`, tags:["zos","sysplex","availability","architecture","expert"] },

// Performance - Beginner
{ id:"s41", category:"Performance", difficulty:"Beginner", question:"What is SMF (System Management Facilities) and how is it used for performance monitoring on z/OS?", answer:`SMF — z/OS PERFORMANCE DATA:\n\nSMF records EVERYTHING that happens on z/OS:\n  - Every job that runs (start, end, resources used)\n  - Every dataset accessed\n  - Every CICS transaction\n  - Every DB2 query\n  - Security events (RACF)\n  - Hardware utilization\n\nKEY SMF RECORD TYPES:\n  Type 14/15: Dataset activity (open/close)\n  Type 30:    Job/step accounting (CPU, elapsed time)\n  Type 42:    Storage/paging activity\n  Type 70-79: RMF (system performance)\n  Type 80:    RACF security events\n  Type 89:    Usage data (software pricing)\n  Type 100:   DB2 accounting\n  Type 101:   DB2 performance\n  Type 110:   CICS transaction data\n\nHOW TO USE:\n  1. SMF records written to SMF datasets (SYS1.MANx)\n  2. IFASMFDP dumps records to sequential file\n  3. DFSORT/ICETOOL processes specific record types\n  4. Reports created using SAS, MXG, or custom programs\n\nEXAMPLE — Find top CPU jobs:\n  //CPURPT EXEC PGM=SORT\n  //SORTIN DD DSN=MY.SMF.DUMP\n  //SYSIN DD *\n    INCLUDE COND=(6,1,BI,EQ,X'1E')  ← Type 30\n    SORT FIELDS=(340,4,BI,D)  ← Sort by CPU desc\n\nSMF is the foundation of ALL z/OS performance analysis.`, tags:["performance","smf","monitoring","beginner"] },

// Performance - Advanced
{ id:"s42", category:"Performance", difficulty:"Advanced", question:"A z/OS LPAR is experiencing high paging rates (500 pages/second). How do you diagnose and resolve the real storage shortage?", answer:`z/OS PAGING DIAGNOSIS:\n\n1. IMMEDIATE CHECK:\n   D ASM — Display Auxiliary Storage Manager\n   Shows: page dataset usage, slot counts\n   D PROG,LPA — Check LPA usage\n   RMF Monitor II: Check UIC (Unreferenced Interval Count)\n   UIC < 3 = CRITICAL storage pressure\n\n2. IDENTIFY THE CAUSE:\n   D A,L — Show all address spaces with storage\n   Look for: unusually large REGION consumers\n   \n   SMF Type 42 analysis:\n   - Page fault rate by address space\n   - Working set size vs frames allocated\n   - Which jobs are being stolen from?\n\n3. COMMON CAUSES:\n   a. Over-committed real storage:\n      Total virtual > available real frames\n      Fix: Add memory or reduce workload\n   b. Single job with huge REGION:\n      REGION=0M on a data-heavy program\n      Fix: Cap REGION via IEFUSI exit\n   c. Too many address spaces:\n      Fix: Reduce MAXUSER in IEASYSxx\n   d. Large CSA/SQA allocation:\n      Fix: Review system-level storage settings\n\n4. TUNING:\n   - RSM: IEAOPTxx RSMCTADJ=YES (automatic tuning)\n   - Page datasets: 3+ page datasets on separate volumes\n   - LFAREA: Reserve frames for large pages\n   - 64-bit: Move eligible workloads above the bar\n   - zIIP offload: Reduce GP frame pressure`, tags:["performance","paging","storage","advanced"] },

// Modernization - Beginner
{ id:"s43", category:"Modernization", difficulty:"Beginner", question:"What is Zowe, and how does it help modernize mainframe development? Give practical examples.", answer:`ZOWE — OPEN SOURCE MAINFRAME FRAMEWORK:\n\nZowe makes mainframes accessible to modern developers.\n\nCOMPONENTS:\n  1. Zowe CLI (Command Line Interface):\n     Works from Mac, Windows, Linux terminal\n     zowe files list ds "PROD.JCL.*"\n     zowe jobs submit ds "PROD.JCL(MYJOB)"\n     zowe jobs view sfbi JOB12345 102  ← view output\n     zowe files download uss "/u/user/script.sh"\n\n  2. Zowe Explorer (VS Code Extension):\n     Browse datasets in VS Code sidebar\n     Edit PDS members directly\n     Submit JCL with one click\n     View job output in VS Code\n     Like ISPF but in your favorite editor!\n\n  3. Zowe API Mediation Layer:\n     Single gateway to all z/OS services\n     Unified authentication (SSO)\n     Service discovery and routing\n     Swagger/OpenAPI documentation\n\nPRACTICAL EXAMPLES:\n  Before Zowe:\n    Login to TSO → Navigate ISPF → Edit member → Submit\n  After Zowe:\n    VS Code → Open PDS → Edit → Ctrl+Shift+P → Submit JCL\n  \n  CI/CD Pipeline:\n    git push → Jenkins → zowe jobs submit → zowe jobs wait\n    → zowe files download output → verify results\n\nZowe is FREE and open source (zowe.org)`, tags:["modernization","zowe","vscode","cli","beginner"] },

// Modernization - Advanced
{ id:"s44", category:"Modernization", difficulty:"Advanced", question:"Design a CI/CD pipeline for mainframe COBOL applications using Git, Jenkins, and IBM DBB. Include testing and deployment.", answer:`MAINFRAME CI/CD PIPELINE:\n\n1. DEVELOPER WORKFLOW:\n   VS Code + Zowe Explorer + IBM Z Open Editor\n   - Edit COBOL/JCL locally or directly on z/OS\n   - Syntax highlighting, error checking\n   - Git integration for version control\n\n2. GIT REPOSITORY STRUCTURE:\n   mainframe-app/\n   ├── cobol/       ← COBOL source\n   ├── copybook/    ← Copybooks\n   ├── jcl/         ← JCL procedures\n   ├── bms/         ← CICS BMS maps\n   ├── test/        ← Unit test scripts\n   └── Jenkinsfile  ← Pipeline definition\n\n3. JENKINS PIPELINE:\n   pipeline {\n     stages {\n       stage('Checkout') {\n         git 'https://github.com/myorg/mainframe-app'\n       }\n       stage('Build') {\n         // IBM Dependency Based Build\n         sh 'groovyz dbb/build.groovy --sourceDir .'\n       }\n       stage('Unit Test') {\n         sh 'groovyz dbb/test.groovy --suite PAYROLL'\n       }\n       stage('Deploy TEST') {\n         sh 'zowe jobs submit ds "TEST.JCL(DEPLOY)"'\n         sh 'zowe jobs wait --jobid $JOBID'\n       }\n       stage('Integration Test') {\n         sh 'python test/integration_tests.py'\n       }\n       stage('Deploy PROD') {\n         when { branch 'main' }\n         input 'Approve production deploy?'\n         sh 'zowe jobs submit ds "PROD.JCL(DEPLOY)"'\n       }\n     }\n   }\n\n4. DBB (Dependency Based Build):\n   - Analyzes COBOL COPY statements\n   - Only compiles changed programs + dependents\n   - 10x faster than full rebuild`, tags:["modernization","cicd","jenkins","dbb","git","advanced"] },

// RACF - Beginner
{ id:"s45", category:"RACF", difficulty:"Beginner", question:"What is RACF and how do you create a new user ID, grant dataset access, and check permissions?", answer:`RACF FUNDAMENTALS:\n\nRACF = Resource Access Control Facility\nControls WHO can access WHAT on z/OS.\n\n1. CREATE A USER ID:\n   ADDUSER NEWUSER -\n     NAME('John Smith') -\n     PASSWORD(TEMP1234) -\n     DFLTGRP(DEVGRP) -\n     OWNER(ADMIN01) -\n     TSO(ACCTNUM(ACCT01) PROC(TSOPROC))\n   \n   User must change password on first login.\n\n2. GRANT DATASET ACCESS:\n   Levels: NONE, READ, UPDATE, CONTROL, ALTER\n   \n   PERMIT 'PROD.PAYROLL.**' -\n     CLASS(DATASET) -\n     ID(NEWUSER) -\n     ACCESS(READ)\n   \n   This grants READ to all datasets starting with PROD.PAYROLL.\n\n3. CHECK PERMISSIONS:\n   LISTUSER NEWUSER ALL  ← Show user profile\n   LISTDSD 'PROD.PAYROLL' AUTH  ← Show who has access\n   SEARCH CLASS(DATASET) USER(NEWUSER)  ← All user's access\n\n4. COMMON COMMANDS:\n   ALTUSER userid REVOKE  ← Disable user\n   ALTUSER userid RESUME  ← Re-enable\n   ALTUSER userid PASSWORD(RESET)  ← Reset password\n   CONNECT userid GROUP(grp) AUTH(USE)  ← Add to group\n   REMOVE userid GROUP(grp)  ← Remove from group\n\nGOLDEN RULE: Principle of least privilege.\nGrant minimum access needed for the job.`, tags:["racf","security","beginner","fundamentals"] },

// RACF - Intermediate
{ id:"s46", category:"RACF", difficulty:"Intermediate", question:"How do you implement RACF dataset protection rules using generic profiles? Explain with practical examples for a production environment.", answer:`RACF GENERIC PROFILE STRATEGY:\n\nGeneric profiles protect GROUPS of datasets with wildcards.\n\n1. NAMING CONVENTION (critical foundation):\n   HLQ.ENV.APPLICATION.TYPE.QUALIFIER\n   PROD.PAYROLL.COBOL.SOURCE\n   PROD.PAYROLL.JCL.CNTL\n   TEST.PAYROLL.COBOL.SOURCE\n\n2. GENERIC PROFILE HIERARCHY:\n   Level 1: Top-level protection\n     ADDSD 'PROD.**' UACC(NONE) OWNER(SECADM)\n     → No one can access ANY prod dataset by default\n   \n   Level 2: Application-level\n     ADDSD 'PROD.PAYROLL.**' UACC(NONE)\n     PERMIT 'PROD.PAYROLL.**' ID(PAYGRP) ACCESS(READ)\n     → Payroll group gets read access\n   \n   Level 3: Specific overrides\n     ADDSD 'PROD.PAYROLL.COBOL.LOAD' UACC(NONE)\n     PERMIT 'PROD.PAYROLL.COBOL.LOAD' ID(PAYADM) ACCESS(UPDATE)\n     → Only payroll admin can update load library\n\n3. CONDITIONAL ACCESS:\n   PERMIT 'PROD.**' ID(BATCHUSR) ACCESS(UPDATE) -\n     WHEN(PROGRAM(PAYROLL1))\n   → BATCHUSR gets UPDATE only when running PAYROLL1 program\n\n4. AUDIT SETTINGS:\n   ALTDSD 'PROD.**' AUDIT(ALL(READ))\n   → Log all READ access to production datasets\n   → Creates SMF Type 80 records for compliance\n\n5. VERIFICATION:\n   LISTDSD 'PROD.PAYROLL.**' AUTH ALL\n   Shows: profile type, access list, audit settings`, tags:["racf","generic-profiles","security","intermediate"] },

// TSO - Intermediate
{ id:"s47", category:"TSO", difficulty:"Intermediate", question:"How do you use ISPF EDIT macros to automate repetitive coding tasks? Create an example macro.", answer:`ISPF EDIT MACROS — AUTOMATION:\n\nEdit macros are REXX programs that run inside the ISPF editor.\n\nEXAMPLE 1 — Add standard COBOL header:\n  /* REXX - COBHDR macro */\n  "ISREDIT MACRO"\n  "ISREDIT LINE_BEFORE 1 = (HDR1)"\n  /* Insert header lines */\n  "ISREDIT LINE_BEFORE 1 = '      *================================================'"\n  "ISREDIT LINE_BEFORE 2 = '      * PROGRAM:  '"\n  "ISREDIT LINE_BEFORE 3 = '      * AUTHOR:   '"\n  "ISREDIT LINE_BEFORE 4 = '      * DATE:     '"DATE()'"\n  "ISREDIT LINE_BEFORE 5 = '      *================================================'"\n  EXIT 0\n  Usage: Type COBHDR on command line in ISPF editor\n\nEXAMPLE 2 — Find and mark all TODO comments:\n  /* REXX - FINDTODO macro */\n  "ISREDIT MACRO"\n  "ISREDIT CURSOR = 1 0"\n  COUNT = 0\n  DO FOREVER\n    "ISREDIT FIND 'TODO' NEXT"\n    IF RC > 0 THEN LEAVE\n    "ISREDIT (LN) = CURSOR"\n    "ISREDIT LABEL" LN "= .T"COUNT\n    COUNT = COUNT + 1\n  END\n  SAY 'Found' COUNT 'TODO items'\n  EXIT 0\n\nEXAMPLE 3 — Reformat JCL alignment:\n  "ISREDIT MACRO"\n  "ISREDIT CHANGE '  DD ' ' DD ' ALL"\n  "ISREDIT CHANGE '  EXEC ' ' EXEC ' ALL"\n  EXIT 0\n\nSAVING MACROS:\n  Store in your SYSPROC or SYSEXEC concatenation\n  Typically: userid.EXEC or SITE.ISPF.EXEC`, tags:["tso","ispf","macros","rexx","intermediate"] },

// TSO - Advanced
{ id:"s48", category:"TSO", difficulty:"Advanced", question:"Design an ISPF dialog application with panels, skeletons, and tables for a dataset management tool.", answer:`ISPF DIALOG APPLICATION DESIGN:\n\n1. COMPONENTS:\n   Panel:    ISPF screen layout (like HTML form)\n   Skeleton: JCL/output template with variables\n   Table:    In-memory data table\n   REXX:     Business logic\n\n2. MAIN PANEL (DSMMENU):\n   )ATTR\n     % TYPE(TEXT) INTENS(HIGH)\n     + TYPE(TEXT) INTENS(LOW)\n     _ TYPE(INPUT) INTENS(HIGH)\n   )BODY\n   %--- Dataset Manager ---\n   +\n   + Enter HLQ: _HLQ     +\n   + Option:    _OPT+  (L=List, D=Delete, C=Copy)\n   +\n   )INIT\n     &OPT = 'L'\n   )PROC\n     VER(&HLQ,NB,MSG=ENTER HLQ)\n     VER(&OPT,NB,LIST,L,D,C)\n   )END\n\n3. REXX DRIVER:\n   ADDRESS ISPEXEC\n   DO FOREVER\n     "DISPLAY PANEL(DSMMENU)"\n     IF RC > 0 THEN LEAVE\n     SELECT\n       WHEN OPT = 'L' THEN CALL LIST_DS HLQ\n       WHEN OPT = 'D' THEN CALL DEL_DS HLQ\n       WHEN OPT = 'C' THEN CALL COPY_DS HLQ\n     END\n   END\n\n4. TABLE DISPLAY:\n   "TBCREATE DSTABLE KEYS(DSNAME) NAMES(RECFM LRECL USED)"\n   /* Populate from LISTDSI */\n   "TBSORT DSTABLE FIELDS(DSNAME,C,A)"\n   "TBDISPL DSTABLE PANEL(DSLIST)"\n\n5. SKELETON (for batch delete):\n   )CM Dataset delete JCL\n   //&USERID.D JOB ,'DELETE',CLASS=A\n   //DEL EXEC PGM=IDCAMS\n   //SYSIN DD *\n   )DOT\n     DELETE &DSNAME\n   )ENDDOT\n   /*`, tags:["tso","ispf","dialog","panels","advanced"] },

// TSO - Expert
{ id:"s49", category:"TSO", difficulty:"Expert", question:"Build a TSO/ISPF application that integrates with DB2, reads tables dynamically, and generates reports with drill-down capability.", answer:`TSO/ISPF + DB2 DYNAMIC APPLICATION:\n\n1. ARCHITECTURE:\n   ISPF Panel → REXX → DSNREXX (DB2 interface) → DB2\n   With dynamic SQL and scrollable ISPF tables\n\n2. DB2 CONNECTION VIA DSNREXX:\n   /* REXX */\n   CALL RXSUBCOM 'DSNREXX','DSNREXX','ADD'\n   SIGNAL ON SQLERROR\n   ADDRESS DSNREXX "CONNECT DB2P"\n   \n   /* Dynamic SQL */\n   SQLSTMT = "SELECT EMPID, NAME, SALARY",\n             "FROM EMPLOYEE",\n             "WHERE DEPT = '"DEPTID"'",\n             "ORDER BY SALARY DESC"\n   ADDRESS DSNREXX "EXECSQL PREPARE S1 FROM :SQLSTMT"\n   ADDRESS DSNREXX "EXECSQL DECLARE C1 CURSOR FOR S1"\n   ADDRESS DSNREXX "EXECSQL OPEN C1"\n\n3. POPULATE ISPF TABLE:\n   ADDRESS ISPEXEC\n   "TBCREATE EMPTBL KEYS(EMPID) NAMES(ENAME SALARY DEPT)"\n   DO WHILE SQLCODE = 0\n     ADDRESS DSNREXX "EXECSQL FETCH C1 INTO :EID,:ENAME,:SAL"\n     IF SQLCODE = 0 THEN DO\n       EMPID = EID; SALARY = SAL; DEPT = DEPTID\n       "TBADD EMPTBL"\n     END\n   END\n   "TBSORT EMPTBL FIELDS(SALARY,N,D)"\n   "TBDISPL EMPTBL PANEL(EMPLIST)"\n\n4. DRILL-DOWN:\n   When user selects row (ZTDSELS > 0):\n   "TBGET EMPTBL"\n   /* Fetch detail for selected EMPID */\n   CALL SHOW_DETAIL EMPID  ← Opens detail panel\n\n5. REPORT GENERATION:\n   Use ISPF skeleton + FTINCL to generate:\n   - CSV export to dataset\n   - Formatted report to SYSOUT\n   - Email via SMTP`, tags:["tso","ispf","db2","dsnrexx","dynamic-sql","expert"] },

// CA7 - Beginner
{ id:"s50", category:"CA7", difficulty:"Beginner", question:"What is CA7 (now Broadcom AutoSys WA) and how do you use it to schedule and monitor batch jobs?", answer:`CA7 FUNDAMENTALS:\n\nCA7 = Enterprise job scheduling system for z/OS\n(Now called Broadcom AutoSys Workload Automation)\n\nWHAT IT DOES:\n  - Schedules batch jobs to run at specific times\n  - Manages job dependencies (Job B runs after Job A)\n  - Monitors job status in real-time\n  - Handles failures and restarts\n  - Manages calendars (business days, holidays)\n\nBASIC COMMANDS:\n  1. View job status:\n     LJOB,JOB=PAYROLL01\n     Shows: status, last run time, schedule\n\n  2. Submit a job on demand:\n     DEMAND,JOB=PAYROLL01\n\n  3. View job schedule:\n     LSCHD,JOB=PAYROLL01\n     Shows: next scheduled run, calendar\n\n  4. Check predecessors:\n     LPRQ,JOB=PAYROLL01\n     Shows: which jobs must complete first\n\n  5. Hold a job:\n     HOLD,JOB=PAYROLL01,AFTER\n     Prevents next scheduled run\n\n  6. Release a held job:\n     RLSE,JOB=PAYROLL01\n\nEXAMPLE SCHEDULE:\n  PAYROLL01: Runs Monday-Friday at 06:00\n  Predecessors: EXTRACT01, VALIDATE01\n  Calendar: BUSINESS (excludes holidays)\n  On failure: Alert oncall team, hold successors`, tags:["ca7","scheduling","beginner","batch"] },

// CA7 - Advanced
{ id:"s51", category:"CA7", difficulty:"Advanced", question:"Design a CA7 scheduling strategy for month-end processing that involves 500 jobs across 3 systems with critical path management.", answer:`CA7 MONTH-END SCHEDULING STRATEGY:\n\n1. JOB NETWORK DESIGN:\n   Phase 1 — Extract (200 jobs, 3 systems):\n     SYSA: Customer extracts (50 jobs)\n     SYSB: Transaction extracts (80 jobs)\n     SYSC: Reference data extracts (70 jobs)\n     Cross-system deps via NJE triggers\n   \n   Phase 2 — Transform (150 jobs):\n     Validation, cleansing, aggregation\n     Run after ALL Phase 1 complete\n   \n   Phase 3 — Load & Report (150 jobs):\n     DB2 loads, GL posting, regulatory reports\n     Critical path: GL must complete by 06:00\n\n2. CRITICAL PATH MANAGEMENT:\n   Identify: PAYEXT→PAYVLD→PAYAGG→GLPOST→GLRPT\n   Total estimated: 4.5 hours\n   Batch window: 8 hours (22:00–06:00)\n   Slack: 3.5 hours\n   \n   CA7 commands:\n   DEMAND,JOB=PAYEXT,PRIORITY=HIGH\n   Set LEADTM=0000 for critical path jobs\n\n3. FAILURE HANDLING:\n   AUTO-RESTART rules in CA7:\n   ARF: JOB=PAY*,ABEND=S*,ACTION=RESTART,TRIES=2\n   If restart fails: HOLD successors + page oncall\n   \n   Fallback jobs:\n   If GLPOST misses 06:00 deadline:\n   DEMAND,JOB=GLPOST_EMERGENCY (simplified version)\n\n4. MONITORING:\n   LQ — Show all queued jobs\n   LACT — Show active jobs\n   LDOWN — Show which jobs are late\n   Set: LEADTM on critical jobs for early warnings`, tags:["ca7","month-end","scheduling","critical-path","advanced"] },

// CA7 - Expert
{ id:"s52", category:"CA7", difficulty:"Expert", question:"CA7 database corruption is suspected — jobs are triggering out of sequence. How do you diagnose and recover without losing schedule data?", answer:`CA7 DATABASE RECOVERY:\n\n1. SYMPTOMS OF CORRUPTION:\n   - Jobs running out of dependency order\n   - LPRQ shows incorrect predecessors\n   - LJOB shows wrong schedule IDs\n   - Duplicate entries in job network\n\n2. IMMEDIATE ACTIONS:\n   a. Stop new job submissions:\n      /ES CA7 — Quiesce CA7 gracefully\n   b. Document current state:\n      LACT — Capture all active jobs\n      LQ — Capture all queued jobs\n   c. Force-complete critical running jobs\n\n3. DIAGNOSIS:\n   a. Run CA7 CAIRIM diagnostic:\n      DBPRINT utility — Dump CA7 database\n      Check for: broken pointer chains\n      Cross-reference: SCHD vs DBJOB entries\n   b. Compare with last good backup:\n      Diff the DBPRINT outputs\n\n4. RECOVERY OPTIONS:\n   Option A — Restore from backup:\n     DBRESTORE from last night's CA7 DB backup\n     Re-apply today's schedule changes manually\n     Safest but loses today's changes\n   \n   Option B — Selective repair:\n     DBUPDATE to fix specific corrupted records\n     DBREORG to rebuild pointer chains\n     Faster but requires expert knowledge\n   \n   Option C — Rebuild affected jobs:\n     DELETE affected job definitions\n     Re-add from source documentation\n     DBADD,JOB=xxx,... for each job\n\n5. PREVENTION:\n   - Nightly CA7 DB backup (DBBACKUP)\n   - Weekly DBREORG\n   - Audit trail of all DB changes\n   - Restrict CA7 UPDATE authority to 2-3 admins`, tags:["ca7","database","recovery","expert"] },

];
