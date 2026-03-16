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
];
