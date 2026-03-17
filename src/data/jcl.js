export const JCL_TOPIC = {
  id:"jcl", icon:"⚙️", title:"JCL", subtitle:"Job Control Language", color:"#0071e3", level:"Beginner → Expert",
  description:"The command language of z/OS batch. Every production job on the planet's busiest systems starts here. 80 comprehensive lessons from fundamentals to expert techniques.",
  sections:[

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 1: INTRODUCTION TO JCL (5 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"1.1 — What is JCL?", level:"Beginner",
      content:`Job Control Language (JCL) is the scripting language used to instruct IBM z/OS how to run batch jobs. It acts as the interface between your program and the operating system — telling z/OS which program to run, what data to use, and what to do with the results.

JCL was introduced with OS/360 in 1964 and has evolved through MVS, OS/390, and z/OS. Despite its age, JCL remains the backbone of mainframe batch processing because of its precision, reliability, and integration with z/OS subsystems.

Every JCL job stream consists of three fundamental types of statements:
  • JOB statement   — Identifies the job and provides accounting info
  • EXEC statement  — Names the program or catalogued procedure to run
  • DD statement    — Defines every dataset (file) the program uses

JCL is column-sensitive in positions 1–72. Position 73–80 is the sequence number field (ignored by z/OS). All JCL statements begin with // in columns 1–2.

Why JCL still matters:
  • 68% of the world's transactions pass through mainframes
  • Every bank, airline, insurance company runs JCL daily
  • A single JCL error can halt millions of dollars in processing
  • Understanding JCL is the gateway to every other mainframe technology

Key Terminology:
  • Job — A unit of work submitted to z/OS for batch execution
  • Step — One program execution within a job (max 255 steps)
  • Dataset — A mainframe file (sequential, partitioned, or VSAM)
  • SPOOL — Temporary storage for job output managed by JES
  • Initiator — A z/OS address space that selects and runs batch jobs
  • Catalog — The master index of all datasets on the system

💡 Interview Tip: JCL is the "glue" of mainframe batch. Be ready to explain how JOB, EXEC, and DD work together.`,
      code:`//MYJOB    JOB  (ACCT),'MY FIRST JOB',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=IEFBR14
//SYSPRINT DD   SYSOUT=*
//`
    },

    { title:"1.2 — JCL Processing Flow", level:"Beginner",
      content:`Understanding how z/OS processes JCL is essential for debugging failed jobs.

Phase 1 — Submission:
  You submit JCL through TSO/ISPF (SUBMIT command), a scheduler like CA-7 or TWS, the internal reader, or FTP. The JCL stream enters JES2/JES3.

Phase 2 — Conversion:
  JES reads the JCL and validates syntax — checking for missing commas, invalid parameters, unmatched quotes. If JES finds a syntax error, the job fails with JCL ERROR before any step executes. JES assigns a JOB number (e.g., JOB12345).

Phase 3 — Input Queue:
  The job enters the input queue, prioritized by CLASS and PRTY parameters from the JOB statement.

Phase 4 — Execution:
  An initiator selects the job and processes each step:
  • Locates the program in STEPLIB → JOBLIB → link list → LPA
  • Allocates datasets for each DD statement
  • Runs the program; on completion sets a return code (0=success, 4=warning, 8=error)

Phase 5 — Output Processing:
  Job output goes to SPOOL based on MSGCLASS. JES message log shows allocation messages, step completion codes, and resource usage.

Phase 6 — Purge:
  After output is processed, the job is purged from SPOOL.

Common Failure Points:
  • JCL ERROR — Syntax problem during conversion
  • NOT CATLG 2 — Dataset already exists
  • ABEND S0C7 — Data exception (bad data)
  • ABEND S806 — Program not found
  • ABEND SB37 — Dataset out of space

💡 Pro Tip: Always check JESMSGLG first when a job fails. It tells you exactly where and why.`,
      code:`//PROCFLOW JOB  (ACCT),'FLOW DEMO',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=INPUT.FILE,DISP=SHR
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY`
    },

    { title:"1.3 — JES2 vs JES3", level:"Beginner",
      content:`JES (Job Entry Subsystem) manages job input, scheduling, and output. Every z/OS system runs either JES2 or JES3.

JES2 — Used by ~85% of installations. Each z/OS system operates independently with its own initiators. Jobs are selected locally based on CLASS and PRTY.

Key JES2 concepts:
  • Job Classes (A-Z, 0-9) — Determine which initiator picks up the job
  • Message Classes — Control where output goes
  • $HASP messages — JES2 system messages

JES3 — Uses a Global Processor for centralized scheduling across systems. Provides device allocation before execution and built-in dependent job control.

Practical Differences:
  Feature             │ JES2              │ JES3
  ────────────────────┼───────────────────┼──────────────────
  Scheduling          │ Local per system  │ Global processor
  Device allocation   │ At step execution │ Before execution
  Commands            │ $ prefix          │ * prefix
  Popularity          │ ~85% of sites     │ ~15% of sites

JES2 JECL Statements:
  • /*JOBPARM — Set execution parameters
  • /*ROUTE — Route job/output to another system
  • /*PRIORITY — Override job priority

💡 Interview Tip: Most companies use JES2. Mention $ commands like $DA (display active) and $DQ (display queues).`,
      code:`//* JES2 JECL Statements
/*JOBPARM  SYSAFF=SYS1,TIME=30
/*ROUTE    PRINT NODEA.RMT1
/*PRIORITY 6
//*
//JESJOB   JOB  (ACCT),'JES2 DEMO',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//* Common JES2 commands:
//*   $DA  — Display active jobs
//*   $DQ  — Display job queues
//*   $PI  — Purge a job
//*   $HJ  — Hold a job
//STEP1    EXEC PGM=IEFBR14`
    },

    { title:"1.4 — Submitting & Monitoring Jobs", level:"Beginner",
      content:`Every mainframe developer needs to know how to submit JCL and monitor execution.

Submitting via TSO/ISPF:
  1. Open JCL member in ISPF editor
  2. Type SUBMIT (or SUB) on command line
  3. Note the job number from the confirmation message

Other Methods:
  • TSO: SUBMIT 'MY.JCL.LIBRARY(MEMBER)'
  • Internal Reader: //DD DD SYSOUT=(,INTRDR)
  • Schedulers: CA-7, TWS, Control-M
  • FTP to internal reader

Monitoring with SDSF:
  Key panels: DA (active jobs), ST (output), I (input queue), H (held output)
  Line commands: S (browse), P (purge), C (cancel), SJ (view JCL)

Reading Job Output:
  • JESMSGLG — JES messages (start/end, NOTIFY)
  • JESJCL — JCL as interpreted by JES
  • JESYSMSG — Allocation messages (critical for debugging)
  • SYSPRINT — Program output

Return Codes:
  • RC=0000 — Success
  • RC=0004 — Warning
  • RC=0008 — Error
  • RC=0012+ — Severe
  • ABEND — Program crash

💡 Best Practice: Set NOTIFY=&SYSUID on every job. Use TYPRUN=SCAN to validate syntax without executing.`,
      code:`//MYJOB    JOB  (ACCT),'MONITOR DEMO',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             TYPRUN=SCAN
//*
//* TYPRUN=SCAN — Syntax check only
//* TYPRUN=HOLD — Hold in input queue
//*
//STEP1    EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.INPUT.DATA,DISP=SHR
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY`
    },

    { title:"1.5 — Coding Conventions & Best Practices", level:"Beginner",
      content:`Following conventions makes JCL readable, maintainable, and less error-prone.

Naming Conventions:
  Job Names — USERID + identifier (HARI01A) or application prefix (PAY001)
  Step Names — Descriptive: COMPILE, SORTIT, BACKUP. Or numbered: STEP010, STEP020
  DD Names — Standard: SYSUT1, SYSPRINT. Custom: INFILE, OUTFILE
  Dataset Names — HLQ.APP.TYPE.DESC format, max 44 chars total

Comment Practices:
  • Job header block: purpose, author, dependencies, change log
  • Step descriptions explaining business logic
  • //* separators for visual clarity
  • Restart/recovery instructions

Code Layout:
  • Align parameters vertically
  • One parameter per line for complex DD statements
  • Keep lines under 71 characters
  • Consistent indentation on continuation lines

Common Mistakes:
  • Missing comma between parameters (rest becomes comment)
  • Using column 72+ (treated as sequence numbers)
  • Spaces inside parameters
  • Not testing with TYPRUN=SCAN first

💡 Pro Tip: Write comments for the person debugging your job at 3 AM during an abend.`,
      code:`//*============================================================*
//*  JOB: PAYROLL MONTHLY RUN                                  *
//*  PROGRAMMER: HARIKRISHNAN K                                *
//*  DATE: 2026-03-16                                          *
//*  PURPOSE: Extract, sort, summarize monthly payroll         *
//*  CHANGE LOG:                                               *
//*  2026-03-16 HARI  Initial creation                         *
//*============================================================*
//PAYMON   JOB  (ACCT,DEPT),'PAYROLL MONTHLY',
//             CLASS=A,
//             MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M
//*
//*------------------------------------------------------------*
//*  STEP010: EXTRACT MONTHLY RECORDS                          *
//*------------------------------------------------------------*
//STEP010  EXEC PGM=PAYEXT01
//STEPLIB  DD   DSN=PAY.PROD.LOADLIB,DISP=SHR
//INFILE   DD   DSN=PAY.MASTER.DATA,DISP=SHR
//OUTFILE  DD   DSN=PAY.MONTHLY.EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//SYSPRINT DD   SYSOUT=*`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 2: JCL STRUCTURE & SYNTAX (5 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"2.1 — Statement Format & Columns", level:"Beginner",
      content:`JCL is column-sensitive. Every character position matters.

Column Layout:
  Columns 1–2:   // (identifies JCL statement)
  Column 3:      Name field starts (or blank)
  After name:    Space, then operation (JOB/EXEC/DD)
  After operation: Space, then operands
  After operands: Space, then comments
  Columns 73–80: Sequence numbers (ignored by JES)

Name Field Rules:
  • 1–8 chars: A-Z, 0-9, @, #, $
  • Must start with letter or @, #, $
  • Step names unique within job
  • DD names unique within step

Operand Field:
  • Parameters separated by commas, NO spaces between
  • Positional parameters first, then keyword parameters
  • Values with special chars in single quotes

Critical Rule: A space in the operand field signals end of operands. Everything after becomes a comment!

💡 Common Mistake: DSN=MY.DATA, DISP=SHR (space after comma) — DISP=SHR becomes a comment!`,
      code:`//* Column Layout:
//*  //NAME___OP___OPERANDS_________COMMENTS
//*
//MYJOB    JOB  (ACCT),'NAME',CLASS=A     JOB STMT
//STEP1    EXEC PGM=IEFBR14               EXEC STMT
//INPUT    DD   DSN=MY.DATA,DISP=SHR      DD STMT
//*
//* Positional vs Keyword:
//MYJOB    JOB  (ACCT),'PROGRAMMER',CLASS=A,MSGCLASS=X
//*              ^^^^^^  ^^^^^^^^^^^  ^^^^^^^  ^^^^^^^^^
//*              Pos #1  Pos #2       Keyword  Keyword
//*
//* WRONG — space breaks operands:
//*   //DD1 DD DSN=MY.DATA, DISP=SHR
//* RIGHT — no space:
//DD1      DD   DSN=MY.DATA,DISP=SHR`
    },

    { title:"2.2 — Continuation Rules", level:"Beginner",
      content:`JCL statements often exceed one line (columns 1–71). Continuation rules let you spread parameters across lines.

Basic Continuation:
  1. End current line after a complete parameter (after a comma)
  2. Comma must be within columns 1–71
  3. Next line starts with // in columns 1–2
  4. Column 3 blank
  5. Continue operand in columns 4–16

Rules:
  • Always break AFTER a comma, not before
  • Never break inside a keyword=value pair
  • Last continuation line should NOT end with comma
  • Standard convention: start continuations in column 16

DD Concatenation vs Continuation:
  Continuation = ONE statement across multiple lines
  Concatenation = MULTIPLE datasets under one DD name (unnamed DDs)

Common Errors:
  • Forgetting // on continuation line
  • Starting continuation after column 16
  • Trailing comma on last line (expects more operands)

💡 Pro Tip: Align all continuations at column 16 for readability.`,
      code:`//* Basic Continuation
//STEP1    EXEC PGM=MYPROGRAM,
//             PARM='OPTION1',
//             REGION=0M,
//             TIME=10
//*
//* DD with many parameters
//OUTPUT   DD   DSN=MY.OUTPUT.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=SYSDA,
//             SPACE=(CYL,(100,50),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)
//*
//* DD Concatenation (NOT continuation)
//STEPLIB  DD   DSN=MY.LOAD.LIB1,DISP=SHR
//         DD   DSN=MY.LOAD.LIB2,DISP=SHR
//         DD   DSN=MY.LOAD.LIB3,DISP=SHR`
    },

    { title:"2.3 — Comments & Documentation", level:"Beginner",
      content:`Well-documented JCL is critical for production maintainability.

Comment Lines (//*):
  Any line starting with //* is ignored by JES. Place anywhere in the JCL stream.

Inline Comments:
  Text after a space following the last operand is a comment. Warning: Don't use on continuation lines.

Documentation Standards:
  Job Header — Purpose, application, programmer, date, dependencies, restart instructions, change history
  Step Comments — Purpose, input/output files, expected return codes

Commenting Out Code:
  Change //STEP3 to //*STEP3 to disable a step temporarily.

💡 Best Practice: Include restart/recovery instructions in every production job header.`,
      code:`//*============================================================*
//*  JOB NAME: GLPOST01                                        *
//*  PURPOSE:  Post daily GL transactions                      *
//*  SCHEDULE: Daily 06:00 via CA-7                            *
//*  CONTACT:  HARIKRISHNAN K (x1234)                          *
//*  DEPENDENCIES:                                             *
//*    PREDECESSOR: GLEXT01 (must complete RC=0)               *
//*    SUCCESSOR:   GLRPT01                                    *
//*  RESTART: Rerun from STEP020 after fixing input            *
//*  CHANGE LOG:                                               *
//*  2026-01-15 HARI  Created                                  *
//*  2026-02-20 HARI  Added STEP030 audit trail                *
//*============================================================*
//GLPOST01 JOB  (GL,ACCT),'GL DAILY POST',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),NOTIFY=&SYSUID`
    },

    { title:"2.4 — Special Statements", level:"Beginner",
      content:`Beyond JOB, EXEC, DD — JCL has special-purpose statements.

Null Statement (//) — Marks end of job in input stream. Required when multiple jobs concatenated.

Delimiter (/*) — Marks end of in-stream data after DD * or DD DATA.

JCLLIB — Must appear after JOB, before EXEC. Tells JES where to find PROCs and INCLUDE members.

SET — Defines/overrides symbolic parameter values. Appears after JOB statement.

INCLUDE — Pulls in JCL from a PDS member at that point. Member fetched from JCLLIB ORDER libraries.

OUTPUT — Controls SYSOUT processing (destination, copies, forms). Referenced by DD OUTPUT= parameter.

IF/THEN/ELSE/ENDIF — Conditional step execution based on return codes.

💡 Pro Tip: JCLLIB + INCLUDE is powerful for modular JCL. Define common DD groups once and INCLUDE everywhere.`,
      code:`//* Null Statement (end of job)
//MYJOB   JOB  (ACCT),'DEMO'
//STEP1   EXEC PGM=IEFBR14
//
//* Delimiter (end of in-stream data)
//STEP2   EXEC PGM=SORT
//SYSIN   DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//* JCLLIB + INCLUDE
//MYJOB   JOB  (ACCT),'DEMO'
//         JCLLIB ORDER=(MY.PROC.LIB)
//         INCLUDE MEMBER=STDDD01
//*
//* SET symbolic parameter
//         SET  ENV=PROD
//         SET  HLQ=PAY.&ENV
//STEP1   EXEC PGM=MYPROG
//INPUT   DD   DSN=&HLQ..MASTER,DISP=SHR
//*
//* OUTPUT statement
//RPTOUT  OUTPUT DEST=RMT1,COPIES=3
//STEP1   EXEC PGM=RPTPROG
//REPORT  DD   SYSOUT=*,OUTPUT=*.RPTOUT`
    },

    { title:"2.5 — Positional vs Keyword Parameters", level:"Beginner",
      content:`Every JCL parameter is either positional or keyword.

Positional Parameters:
  • Identified by position (order matters)
  • Must appear before keyword parameters
  • If skipping one, code comma as placeholder

  JOB positional: (accounting-info),'programmer-name'
  EXEC positional: PGM=program (technically keyword but must be first)

Keyword Parameters:
  • KEYWORD=VALUE format, any order after positional
  • Self-documenting: CLASS=A, MSGCLASS=X, REGION=0M

Sub-parameters (within parentheses):
  • DISP=(status,normal-end,abnormal-end) — positional sub-params
  • DCB=(RECFM=FB,LRECL=80) — keyword sub-params
  • SPACE=(unit,(primary,secondary),RLSE) — mixed

Omitting Sub-parameters:
  Skip positional sub-params with comma: DISP=(,CATLG) skips status, DISP=(SHR,,DELETE) skips normal.

💡 Interview Tip: Explain DISP=(NEW,CATLG,DELETE) as "New dataset, catalog on success, delete on failure."`,
      code:`//* Positional Parameters on JOB
//MYJOB    JOB  (ACCT123,ROOM42),
//             'HARIKRISHNAN K',
//             CLASS=A,MSGCLASS=X
//*              ^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^
//*              Positional #1     Positional #2
//*
//* Skipping positional with comma:
//MYJOB    JOB  ,'HARIKRISHNAN K',CLASS=A
//*
//* DISP sub-parameters:
//DD1      DD   DSN=MY.FILE,DISP=(NEW,CATLG,DELETE)
//*                               ^^^  ^^^^^  ^^^^^^
//*                               Stat Normal Abnormal
//*
//* Skip normal disp:
//DD2      DD   DSN=MY.FILE,DISP=(SHR,,DELETE)
//*
//* DCB keyword sub-parameters:
//DD3      DD   DSN=MY.FILE,DISP=(NEW,CATLG),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920),
//             SPACE=(TRK,(100,50),RLSE)`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 3: JOB STATEMENT (8 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"3.1 — JOB Statement Overview", level:"Beginner",
      content:`The JOB statement is always first. It identifies the job to z/OS and JES.

Syntax: //jobname JOB positional-params,keyword-params

Positional: (accounting-info),'programmer-name' — both optional but often required by shop standards.

Key Parameter Categories:
  Scheduling: CLASS, PRTY, TYPRUN
  Resource: REGION, TIME, BYTES, LINES, PAGES
  Output: MSGCLASS, MSGLEVEL, NOTIFY
  Security: USER, PASSWORD, GROUP
  Processing: COND, RESTART, JOBRC

Most Used Parameters:
  • CLASS — Which initiator runs the job
  • MSGCLASS — Where output goes
  • MSGLEVEL — How much JCL/allocation info shows
  • NOTIFY — Who gets completion message
  • REGION — Max memory
  • TIME — Max CPU time

💡 Pro Tip: REGION=0M = unlimited memory. TIME=1440 = unlimited CPU (24hrs). Use for testing; production jobs should have limits.`,
      code:`//* Minimal JOB
//MINJOB   JOB
//*
//* Typical Production JOB
//PRODJOB  JOB  (ACCT001,DEPT42),
//             'HARIKRISHNAN K',
//             CLASS=A,
//             MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M,
//             TIME=30
//*
//* JOB with Security
//SECJOB   JOB  (ACCT),'SECURE JOB',
//             CLASS=A,MSGCLASS=X,
//             USER=MYUSERID,
//             GROUP=MYGROUP,
//             NOTIFY=&SYSUID
//*
//* JOB with Restart
//RSTJOB   JOB  (ACCT),'RESTART JOB',
//             CLASS=A,MSGCLASS=X,
//             RESTART=STEP030,
//             NOTIFY=&SYSUID`
    },

    { title:"3.2 — CLASS & MSGCLASS", level:"Beginner",
      content:`CLASS controls execution, MSGCLASS controls output.

CLASS (Job Class) — CLASS=character (A-Z, 0-9)
  Determines which initiator picks up the job. Each site configures initiators for specific classes:
  • Class A — General batch (most common)
  • Class B — Long-running jobs
  • Class S — System maintenance
  • Class T — Test/development
  Each initiator is started with: START INITxx,CLASS=A,B,C

MSGCLASS (Message Class) — MSGCLASS=character
  Controls where the JES message log and JCL listing go:
  • X or H — Hold on SPOOL for viewing in SDSF
  • A — Print immediately
  • Z — Purge immediately (no output saved)

Best Practice: Use MSGCLASS=X during development (holds output for review), switch to MSGCLASS=A for production printing.

The relationship: CLASS gets your job running, MSGCLASS determines what happens to the output after it runs.

💡 Common Mistake: Using a CLASS that no initiator services — your job sits in the input queue forever.`,
      code:`//* CLASS determines execution
//DEVJOB   JOB  (ACCT),'DEV JOB',
//             CLASS=T,             DEV/TEST CLASS
//             MSGCLASS=X,          HOLD OUTPUT
//             NOTIFY=&SYSUID
//*
//PRODJOB  JOB  (ACCT),'PROD JOB',
//             CLASS=A,             PRODUCTION CLASS
//             MSGCLASS=A,          PRINT OUTPUT
//             NOTIFY=&SYSUID
//*
//* JES2 Initiator config (operator command):
//*   $SI1,CLASS=A,B       Start initiator for classes A,B
//*   $PI1                  Stop initiator 1
//*   $DI                   Display all initiators`
    },

    { title:"3.3 — MSGLEVEL Parameter", level:"Beginner",
      content:`MSGLEVEL controls how much information appears in the job output. It has two positional sub-parameters.

Syntax: MSGLEVEL=(statements,messages)

First sub-parameter (statements):
  0 — Print only the JOB statement
  1 — Print all JCL statements (including PROC expansion)
  2 — Print only submitted JCL (no PROC expansion)

Second sub-parameter (messages):
  0 — Print allocation/termination messages only if job ABENDs
  1 — Print ALL allocation/termination messages (always)

Common Combinations:
  MSGLEVEL=(1,1) — Show everything. Best for development and debugging. You see all JCL (with PROC expansion) plus all allocation messages.
  MSGLEVEL=(0,0) — Minimal output. Only JOB statement and messages on ABEND.
  MSGLEVEL=(1,0) — Show all JCL but allocation messages only on ABEND.
  MSGLEVEL=(2,1) — Show submitted JCL (no PROC) with all messages.

💡 Best Practice: Always use MSGLEVEL=(1,1) during development. In production, some shops use (1,0) to reduce SPOOL space but still see full JCL on failure.`,
      code:`//* MSGLEVEL=(1,1) — Full output (recommended)
//FULLJOB  JOB  (ACCT),'FULL OUTPUT',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID
//*
//* MSGLEVEL=(0,0) — Minimal output
//MINJOB   JOB  (ACCT),'MINIMAL',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(0,0)
//*
//* What you see with MSGLEVEL=(1,1):
//* JESMSGLG — JES messages
//* JESJCL   — All JCL with PROC expansions
//* JESYSMSG — Every allocation/deallocation msg
//* SYSPRINT — Program output`
    },

    { title:"3.4 — REGION & TIME", level:"Beginner",
      content:`REGION and TIME control resource limits for the job.

REGION — Maximum virtual storage (memory)
  Syntax: REGION=valueK or REGION=valueM
  • REGION=4M — 4 megabytes
  • REGION=0M — Unlimited (up to system limit). Most common in modern JCL.
  • REGION=2048K — 2048 kilobytes
  Can be on JOB (applies to all steps) or EXEC (per step). EXEC overrides JOB.

TIME — Maximum CPU time
  Syntax: TIME=(minutes,seconds) or TIME=minutes
  • TIME=5 — 5 minutes of CPU time
  • TIME=(1,30) — 1 minute 30 seconds
  • TIME=1440 — Unlimited (24 hours, convention for no limit)
  • TIME=NOLIMIT — Explicitly unlimited
  • TIME=MAXIMUM — Same as NOLIMIT
  Can be on JOB (total for all steps) or EXEC (per step).

Important: TIME measures CPU time, not elapsed wall-clock time. A job that runs for 2 hours elapsed might only use 5 minutes of CPU.

Common Scenarios:
  • SORT jobs — May need TIME=10 or more for large files
  • COBOL batch — TIME=5 for most programs
  • DB2 queries — TIME varies greatly; set generous limits
  • IEFBR14 — Uses near-zero CPU time

💡 Common Mistake: Setting TIME too low causes S322 ABEND (CPU time exceeded). Set TIME too high and a runaway program wastes resources.`,
      code:`//* REGION and TIME on JOB (applies to all steps)
//MYJOB    JOB  (ACCT),'RESOURCE DEMO',
//             CLASS=A,MSGCLASS=X,
//             REGION=0M,
//             TIME=30,
//             NOTIFY=&SYSUID
//*
//* REGION and TIME on EXEC (per step, overrides JOB)
//STEP1    EXEC PGM=BIGSORT,
//             REGION=512M,
//             TIME=15
//*
//STEP2    EXEC PGM=SMALLPGM,
//             REGION=4M,
//             TIME=(0,30)
//*
//* Common ABEND codes for resource limits:
//*   S322 — CPU time exceeded (TIME too low)
//*   S878 — REGION too small (virtual storage)
//*   S80A — REGION not available`
    },

    { title:"3.5 — NOTIFY & TYPRUN", level:"Beginner",
      content:`NOTIFY tells z/OS who to message when the job completes. TYPRUN controls submission behavior.

NOTIFY=userid
  Sends a TSO message when the job finishes. The message includes the job name, job number, and completion status.
  • NOTIFY=&SYSUID — Notify the submitter (most common, uses system symbol)
  • NOTIFY=USERID1 — Notify a specific user
  • NOTIFY=(&SYSUID,USERID2) — Notify multiple users (JES2 only)

TYPRUN controls what happens at submission:
  • TYPRUN=SCAN — JES checks syntax only. No execution. Perfect for validating new JCL.
  • TYPRUN=HOLD — Job enters input queue but is held. Must be released with $A operator command.
  • TYPRUN=COPY — Copies input directly to SYSOUT (no execution)
  • TYPRUN=JCLHOLD — JCL conversion held until released

Development Workflow:
  1. Code JCL with TYPRUN=SCAN
  2. Submit — check for JCL errors
  3. Fix errors
  4. Remove TYPRUN=SCAN
  5. Submit for real execution

💡 Best Practice: Always use TYPRUN=SCAN for new JCL. A clean scan doesn't guarantee success (data issues, program logic), but catches all JCL syntax errors.`,
      code:`//* NOTIFY — Send completion message
//MYJOB    JOB  (ACCT),'NOTIFY DEMO',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//* TYPRUN=SCAN — Syntax check only
//SCANJOB  JOB  (ACCT),'SCAN TEST',
//             CLASS=A,MSGCLASS=X,
//             TYPRUN=SCAN,
//             NOTIFY=&SYSUID
//STEP1    EXEC PGM=MYPROG
//INPUT    DD   DSN=MY.DATA,DISP=SHR
//OUTPUT   DD   DSN=MY.OUT,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//*
//* TYPRUN=HOLD — Submit but hold
//HOLDJOB  JOB  (ACCT),'HELD JOB',
//             CLASS=A,MSGCLASS=X,
//             TYPRUN=HOLD
//* Release with: $A HOLDJOB (JES2 command)`
    },

    { title:"3.6 — PRTY & Scheduling", level:"Intermediate",
      content:`PRTY (Priority) controls how quickly your job gets selected from the input queue.

PRTY=value
  JES2: 0–15 (0=lowest, 15=highest)
  JES3: 0–15

Higher priority jobs are selected before lower priority jobs of the same class. Default is usually set by the installation (often 1).

Scheduling Considerations:
  • Production jobs typically get higher PRTY than development
  • Urgent reruns may get PRTY=15 (with operator approval)
  • Don't abuse high priority — it starves other jobs

SCHENV (Scheduling Environment):
  Specifies WLM (Workload Manager) scheduling environment. Used for jobs that require specific system resources (like DB2 or MQ).
  SCHENV=DB2PROD — Run only where DB2 production is active

JOBRC Parameter:
  Controls what return code the job reports to JES:
  • JOBRC=MAXRC — Job RC = highest step RC (default)
  • JOBRC=LASTRC — Job RC = last executed step RC
  • JOBRC=(STEP,stepname) — Job RC = specific step RC

💡 Pro Tip: Use JOBRC=MAXRC (default) for most jobs. Schedulers like CA-7 use the job RC to determine success/failure.`,
      code:`//* PRTY — Job priority
//URGENTJ  JOB  (ACCT),'URGENT RERUN',
//             CLASS=A,MSGCLASS=X,
//             PRTY=15,
//             NOTIFY=&SYSUID
//*
//* SCHENV — Scheduling environment
//DB2JOB   JOB  (ACCT),'DB2 JOB',
//             CLASS=A,MSGCLASS=X,
//             SCHENV=DB2PROD,
//             NOTIFY=&SYSUID
//*
//* JOBRC — Control job return code
//MYJOB    JOB  (ACCT),'JOBRC DEMO',
//             CLASS=A,MSGCLASS=X,
//             JOBRC=MAXRC,
//             NOTIFY=&SYSUID
//STEP1    EXEC PGM=PROG1
//STEP2    EXEC PGM=PROG2
//* Job RC = highest of STEP1/STEP2 RCs`
    },

    { title:"3.7 — Security: USER, PASSWORD, GROUP", level:"Intermediate",
      content:`Security parameters on the JOB statement control which RACF (or equivalent) identity runs the job.

USER=userid
  The RACF user ID under which the job executes. If omitted, the job runs under the submitter's ID. Required when submitting jobs for another user or from a scheduler.

GROUP=groupname
  The RACF group the job connects to. Determines which group-level permissions apply. If omitted, uses the user's default group.

PASSWORD (deprecated):
  Legacy parameter for RACF password. Modern systems use PassTickets or RACF propagation instead. Never code actual passwords in JCL.

Surrogate Submission:
  Allows one user to submit jobs as another user. Requires RACF SURROGAT class authorization.
  Example: Scheduler submits jobs with USER=PRODUSER

Security Scenarios:
  • Development: Usually no USER/GROUP needed (runs as submitter)
  • Production: USER=service-account, GROUP=PRODGRP
  • Scheduled: USER required because scheduler ID differs from job owner

💡 Interview Tip: Never hardcode passwords in JCL. Modern z/OS uses RACF surrogate, PassTickets, or certificate-based auth.`,
      code:`//* Basic security
//SECJOB   JOB  (ACCT),'SECURE JOB',
//             CLASS=A,MSGCLASS=X,
//             USER=BATCHUSR,
//             GROUP=PRODGRP,
//             NOTIFY=&SYSUID
//*
//* Surrogate submission (scheduler scenario)
//* RACF setup required:
//*   RDEFINE SURROGAT BATCHUSR.SUBMIT
//*     UACC(NONE)
//*   PERMIT BATCHUSR.SUBMIT CLASS(SURROGAT)
//*     ID(SCHEDID) ACCESS(READ)
//*
//SCHEDJOB JOB  (ACCT),'SCHEDULED',
//             CLASS=A,MSGCLASS=X,
//             USER=BATCHUSR,
//             NOTIFY=&SYSUID`
    },

    { title:"3.8 — RESTART Parameter", level:"Intermediate",
      content:`RESTART tells z/OS to skip steps and begin execution at a specific step. Essential for production restart/recovery.

Syntax:
  RESTART=stepname — Restart from this step
  RESTART=(stepname,procstep) — Restart from a step within a PROC
  RESTART=* — Restart from the beginning (same as no RESTART)

How It Works:
  When RESTART=STEP030 is coded, z/OS skips STEP010 and STEP020 entirely (no allocation, no execution). Execution begins at STEP030. All steps after STEP030 run normally.

Important Considerations:
  • Datasets created in skipped steps must already exist (they won't be created again)
  • Datasets deleted in skipped steps may still exist (potential NOT CATLG 2)
  • COND parameters still apply to restarted and subsequent steps
  • The job's condition code history is empty for skipped steps

Production Restart Procedure:
  1. Job fails at STEP030
  2. Investigate root cause (data issue, space, program bug)
  3. Fix the problem
  4. Determine if STEP030 needs to rerun or if STEP040 can continue
  5. If data is partially written, clean up first
  6. Add RESTART=STEP030 to JOB statement
  7. Submit
  8. After successful run, remove RESTART parameter

💡 Best Practice: Document restart procedures in the job header. Include which datasets to delete and which steps are restartable.`,
      code:`//* Normal job (no restart)
//MYJOB    JOB  (ACCT),'PRODUCTION',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//* Restart from STEP030
//MYJOB    JOB  (ACCT),'RESTARTED',
//             CLASS=A,MSGCLASS=X,
//             RESTART=STEP030,
//             NOTIFY=&SYSUID
//*
//STEP010  EXEC PGM=EXTRACT    ← SKIPPED
//STEP020  EXEC PGM=SORT       ← SKIPPED
//STEP030  EXEC PGM=VALIDATE   ← STARTS HERE
//STEP040  EXEC PGM=LOAD       ← RUNS NORMALLY
//*
//* Restart from step within PROC
//MYJOB    JOB  (ACCT),'PROC RESTART',
//             RESTART=(STEP01,LKED)
//STEP01   EXEC COBPROC
//* Restarts from LKED step inside COBPROC`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 4: EXEC STATEMENT (7 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"4.1 — EXEC Statement Overview", level:"Beginner",
      content:`The EXEC statement tells z/OS which program to run or which procedure to invoke for this job step.

Syntax:
  //stepname EXEC PGM=program-name — Execute a program
  //stepname EXEC PROC=proc-name — Execute a procedure
  //stepname EXEC proc-name — Short form (PROC= is optional)

PGM= identifies the load module to execute. z/OS searches for it in: STEPLIB → JOBLIB → Link List → LPA → Link Pack Area.

PROC= (or just the name) invokes a catalogued procedure from JCLLIB ORDER or system PROCLIB.

The stepname is required and must be unique within the job. It's used in COND, IF/THEN, DD overrides, and referbacks.

Key EXEC Parameters:
  • PARM — Pass data to the program
  • COND — Conditional execution
  • REGION — Memory for this step
  • TIME — CPU time for this step
  • ACCT — Step-level accounting
  • DYNAMNBR — Dynamic allocation limit

💡 Interview Tip: Know the program search order: STEPLIB → JOBLIB → Link List → LPA. STEPLIB is step-level, JOBLIB is job-level.`,
      code:`//* Execute a program
//STEP1    EXEC PGM=IEBGENER
//*
//* Execute with PARM
//STEP2    EXEC PGM=MYPROG,
//             PARM='OPTION1,OPTION2'
//*
//* Execute a catalogued PROC
//STEP3    EXEC PROC=COBCLG
//*
//* Short form (PROC= optional)
//STEP4    EXEC COBCLG
//*
//* With REGION and TIME override
//STEP5    EXEC PGM=BIGSORT,
//             REGION=256M,
//             TIME=15`
    },

    { title:"4.2 — PARM Parameter", level:"Beginner",
      content:`PARM passes data to the executing program. The program receives it in its PARM field (COBOL: LINKAGE SECTION, Assembler: R1 points to parameter list).

Syntax: PARM='value' or PARM=value (quotes needed if special chars/spaces)

Rules:
  • Maximum 100 characters (after all substitutions)
  • Enclose in quotes if it contains spaces, commas, or special chars
  • Use two single quotes for embedded apostrophe: PARM='O''BRIEN'
  • For PROCs: PARM.stepname='value' to pass to specific step

Common Uses:
  • SORT: PARM='MSG=AP' (print all messages)
  • COBOL compile: PARM='LIB,LIST,MAP'
  • IKJEFT01: PARM='%REXXPGM' (run a REXX exec)
  • Application programs: PARM='ENV=PROD,DATE=20260316'

How Programs Receive PARM:
  COBOL — PROCEDURE DIVISION USING parm-field. The first 2 bytes are a halfword length, followed by the parameter string.
  Assembler — R1 points to address of parameter. First halfword is length.

💡 Common Mistake: Exceeding 100 chars causes truncation. Use SYSIN DD * for longer inputs instead.`,
      code:`//* Simple PARM
//STEP1    EXEC PGM=MYPROG,PARM='DAILY'
//*
//* PARM with special characters
//STEP2    EXEC PGM=MYPROG,
//             PARM='OPT1,OPT2,DATE=2026-03-16'
//*
//* PARM for SORT
//SORT01   EXEC PGM=SORT,PARM='MSG=AP'
//*
//* PARM for COBOL compile
//COB      EXEC PGM=IGYCRCTL,
//             PARM='LIB,LIST,MAP,RENT,OPT(2)'
//*
//* PARM for IKJEFT01 (TSO in batch)
//TSO      EXEC PGM=IKJEFT01,
//             PARM='%MYREXX ARG1 ARG2'
//*
//* PARM for PROC step
//STEP1    EXEC MYPROC,
//             PARM.COMPILE='LIST,MAP',
//             PARM.LKED='LIST,XREF'`
    },

    { title:"4.3 — COND Parameter (Step-Level)", level:"Intermediate",
      content:`COND on EXEC controls whether this step executes based on return codes from prior steps.

Syntax: COND=(code,operator) or COND=((code,op,stepname),(code,op,stepname))

Logic: If the condition is TRUE, the step is BYPASSED (skipped). This is counterintuitive — think of COND as "skip if."

Operators: GT, GE, EQ, NE, LT, LE

COND=(0,NE) — Skip if any prior RC ≠ 0 (i.e., only run if all prior steps returned 0)
COND=(4,LT) — Skip if any prior RC < 4 (i.e., skip if RC=0 which is less than 4)
COND=(8,LE,STEP1) — Skip if STEP1 RC ≤ 8

Special: COND=EVEN — Execute even if prior step ABENDed
         COND=ONLY — Execute only if prior step ABENDed

These can be combined: COND=(EVEN,(0,NE,STEP1)) — Run even on ABEND, but only if STEP1 RC=0

JOB-Level COND:
  On the JOB statement, COND= tests apply to ALL steps. If any step meets the condition, the remaining steps are flushed.
  COND=(8,LE) on JOB — Flush remaining steps if any RC ≤ 8

💡 Pro Tip: COND is confusing. Use IF/THEN/ELSE instead for readability. But you MUST know COND for legacy JCL.`,
      code:`//* COND=(0,NE) — Only run if all prior RCs = 0
//STEP2    EXEC PGM=MYPROG,COND=(0,NE)
//*
//* COND with stepname reference
//STEP3    EXEC PGM=MYPROG,COND=(4,LT,STEP1)
//* Skip STEP3 if STEP1 RC < 4
//*
//* Multiple conditions (OR logic)
//STEP4    EXEC PGM=MYPROG,
//             COND=((4,LT,STEP1),(8,LE,STEP2))
//* Skip if STEP1 RC<4 OR STEP2 RC<=8
//*
//* COND=EVEN — Run even if prior ABEND
//CLEANUP  EXEC PGM=CLEANUP,COND=EVEN
//*
//* COND=ONLY — Run ONLY if prior ABEND
//ERRHAND  EXEC PGM=ERRPROG,COND=ONLY
//*
//* COND on JOB — applies to all steps
//MYJOB    JOB  (ACCT),'JOB COND',
//             COND=(8,LE)`
    },

    { title:"4.4 — STEPLIB & JOBLIB", level:"Beginner",
      content:`Programs must be in a load library z/OS can find. STEPLIB and JOBLIB tell z/OS where to look.

STEPLIB — DD on a specific step. z/OS searches this library first for the program in that step only.

JOBLIB — DD after the JOB statement, before the first EXEC. z/OS searches this library for ALL steps (unless a step has its own STEPLIB).

Search Order:
  1. STEPLIB (if coded for this step)
  2. JOBLIB (if coded and no STEPLIB)
  3. LNKLSTxx (system link list)
  4. LPA (Link Pack Area — common modules)

Rules:
  • STEPLIB overrides JOBLIB for that step
  • Both can concatenate multiple libraries
  • JOBLIB goes between JOB and first EXEC
  • Authorized programs (APF) require authorized libraries

When to Use:
  • JOBLIB — When all steps use the same libraries
  • STEPLIB — When steps need different libraries
  • Neither — When programs are in the system link list

💡 Common Mistake: ABEND S806 means program not found. Check STEPLIB/JOBLIB concatenation order and dataset names.`,
      code:`//* JOBLIB — applies to all steps
//MYJOB    JOB  (ACCT),'JOBLIB DEMO',
//             CLASS=A,MSGCLASS=X
//JOBLIB   DD   DSN=MY.PROD.LOADLIB,DISP=SHR
//         DD   DSN=MY.COMMON.LOADLIB,DISP=SHR
//*
//STEP1    EXEC PGM=PROG1     searches JOBLIB
//STEP2    EXEC PGM=PROG2     searches JOBLIB
//*
//* STEPLIB — overrides JOBLIB for this step
//STEP3    EXEC PGM=PROG3
//STEPLIB  DD   DSN=MY.TEST.LOADLIB,DISP=SHR
//         DD   DSN=MY.PROD.LOADLIB,DISP=SHR
//* STEP3 searches STEPLIB, NOT JOBLIB
//*
//* ABEND S806 troubleshooting:
//* 1. Verify DSN spelling in STEPLIB/JOBLIB
//* 2. Check if program name is correct
//* 3. Verify library is cataloged
//* 4. Check concatenation order`
    },

    { title:"4.5 — Program Search Order", level:"Intermediate",
      content:`When z/OS encounters PGM=MYPROG, it searches a specific chain of libraries to find the load module.

Full Search Order:
  1. STEPLIB (if coded for this step)
  2. JOBLIB (if coded and no STEPLIB for this step)
  3. LNKLSTxx (Link List — system-wide concatenation)
  4. LPALST (Link Pack Area — modules loaded into memory at IPL)
  5. Fixed LPA (IBM-supplied modules like IEFBR14, SORT)

LNKLSTxx:
  Defined in SYS1.PARMLIB(LNKLSTxx). Contains commonly used load libraries like SYS1.LINKLIB, ISP.SISPLOAD. Programs here don't need STEPLIB/JOBLIB.

LPA (Link Pack Area):
  Modules loaded into shared memory during IPL. Very fast — no I/O needed. Contains frequently used programs.

APF Authorization:
  Some programs require APF (Authorized Program Facility) authorization. All libraries in the search chain for an APF-authorized program must themselves be APF-authorized.

Performance Tip:
  • Fewer libraries in STEPLIB = faster program fetch
  • Place most-used library first in concatenation
  • Programs in LPA are fastest (no I/O)

💡 Interview Tip: "What happens when you get S806?" — Program not found. Check STEPLIB, JOBLIB, verify DSN, check if module exists with ISPF 3.4.`,
      code:`//* Search Order Demo:
//*
//* z/OS searches for PGM=MYPROG:
//*   1. STEPLIB DD DSN=MY.STEP.LOAD
//*   2. (skipped — STEPLIB found)
//*   3. LNKLSTxx libraries
//*   4. LPALST libraries
//*
//MYJOB    JOB  (ACCT),'SEARCH ORDER'
//JOBLIB   DD   DSN=MY.JOB.LOADLIB,DISP=SHR
//*
//STEP1    EXEC PGM=MYPROG
//STEPLIB  DD   DSN=MY.STEP.LOADLIB,DISP=SHR
//*   Searches: STEPLIB → LNKLSTxx → LPA
//*   (JOBLIB NOT searched — STEPLIB present)
//*
//STEP2    EXEC PGM=MYPROG
//*   No STEPLIB, searches: JOBLIB → LNKLSTxx → LPA
//*
//* Check if module exists:
//*   TSO: LISTDS 'MY.LOADLIB' MEMBERS
//*   ISPF 3.4: browse the PDS`
    },

    { title:"4.6 — Executing PROCs", level:"Intermediate",
      content:`A PROC (Procedure) is pre-written JCL stored in a PDS. Instead of repeating the same JCL in every job, you invoke the PROC by name.

Invoking a PROC:
  //STEP1 EXEC PROC=COBCLG — Full syntax
  //STEP1 EXEC COBCLG — Short form (most common)

Where PROCs are Found:
  1. In-stream PROC (defined within the same JCL member)
  2. JCLLIB ORDER libraries
  3. System PROCLIB (SYS1.PROCLIB)

Overriding PROC Parameters:
  You can override DD statements and EXEC parameters in a PROC:
  //STEP1 EXEC MYPROC,PARM.COB='LIST' — Override PARM for COB step
  //STEP1.COB.SYSLIB DD DSN=MY.COPYLIB,DISP=SHR — Override DD

Override Naming: stepname.procstep.ddname
  • stepname = your EXEC step that calls the PROC
  • procstep = the step within the PROC
  • ddname = the DD to override

Adding DDs to a PROC step:
  Code the DD after the last DD of that PROC step. z/OS adds it to the step.

💡 Pro Tip: Use MSGLEVEL=(1,1) to see PROC expansion in job output. Critical for debugging PROC overrides.`,
      code:`//* Invoke a catalogued PROC
//STEP1    EXEC COBCLG
//*
//* Override PARM for step within PROC
//STEP1    EXEC COBCLG,
//             PARM.COB='LIB,LIST,MAP',
//             PARM.LKED='LIST,XREF'
//*
//* Override DD in PROC
//STEP1.COB.SYSLIB DD DSN=MY.COPYLIB,DISP=SHR
//                 DD DSN=SYS1.COPYLIB,DISP=SHR
//*
//* In-stream PROC definition
//MYPROC   PROC ENV=PROD,HLQ=PAY
//EXTRACT  EXEC PGM=PAYEXT
//INPUT    DD   DSN=&HLQ..&ENV..MASTER,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..&ENV..EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//         PEND
//*
//STEP1    EXEC MYPROC,ENV=TEST,HLQ=MYID`
    },

    { title:"4.7 — DYNAMNBR & ADDRSPC", level:"Advanced",
      content:`Less common EXEC parameters that advanced JCL coders should know.

DYNAMNBR=number
  Specifies the number of datasets the program can dynamically allocate (using SVC 99 / DYNALLOC). Default is 0.
  • Programs that allocate datasets at runtime need DYNAMNBR
  • DB2 programs, CICS, TSO utilities often use dynamic allocation
  • Example: DYNAMNBR=50 allows 50 dynamic allocations

ADDRSPC=VIRT|REAL
  Controls whether the step runs in virtual or real storage.
  • ADDRSPC=VIRT — Virtual storage (default, page-able)
  • ADDRSPC=REAL — Real storage (non-page-able, for performance-critical steps)

PERFORM=nnn
  Assigns a WLM performance group. Rarely used in modern z/OS (WLM handles this).

RD (Restart Definition):
  Controls automatic restart: RD=R (restart), RD=RNC (restart, no checkpoint), RD=NR (no restart), RD=NC (no checkpoint).

DPRTY (Dispatching Priority):
  Sets step dispatching priority. Rarely used — WLM manages priorities now.

💡 Pro Tip: Most modern programs handle dynamic allocation internally. Code DYNAMNBR only when the program or its documentation requires it.`,
      code:`//* DYNAMNBR for DB2 program
//STEP1    EXEC PGM=IKJEFT01,
//             DYNAMNBR=50,
//             REGION=0M
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(MYPROG) PLAN(MYPLAN)
  END
/*
//*
//* ADDRSPC — Real storage (rare)
//FASTJOB  EXEC PGM=FASTPROG,
//             ADDRSPC=REAL,
//             REGION=16M
//*
//* RD — Restart Definition
//RSTJOB   EXEC PGM=MYPROG,
//             RD=R`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 5: DD STATEMENT (15 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"5.1 — DD Statement Overview", level:"Beginner",
      content:`The DD (Data Definition) statement is the most complex and most frequently used JCL statement. It defines every dataset a program uses.

Syntax: //ddname DD parameters

The ddname links the JCL to the program's file definition:
  • COBOL: SELECT INFILE ASSIGN TO INFILE → //INFILE DD ...
  • Assembler: DCB DDNAME=MYFILE → //MYFILE DD ...
  • Standard names: SYSUT1, SYSUT2, SYSIN, SYSPRINT, SYSOUT

Essential DD Parameters:
  • DSN/DSNAME — Dataset name
  • DISP — Dataset disposition (status, normal-end, abnormal-end)
  • UNIT — Device type
  • SPACE — Space allocation for new datasets
  • DCB — Data control block attributes
  • SYSOUT — Route output to JES SPOOL

DD Types:
  • Regular dataset: //DD1 DD DSN=MY.DATA,DISP=SHR
  • SYSOUT: //SYSPRINT DD SYSOUT=*
  • In-stream data: //SYSIN DD *
  • Temporary dataset: //TEMP DD DSN=&&TEMP,...
  • DUMMY: //DD1 DD DUMMY (no I/O)
  • Concatenation: Multiple DDs without names

💡 Interview Tip: The DD statement is where 80% of JCL errors occur. Master DSN, DISP, SPACE, and DCB.`,
      code:`//* Regular dataset
//INPUT    DD   DSN=MY.INPUT.DATA,DISP=SHR
//*
//* SYSOUT (output to SPOOL)
//SYSPRINT DD   SYSOUT=*
//*
//* In-stream data
//SYSIN    DD   *
  Control card data goes here
/*
//*
//* Temporary dataset
//TEMP     DD   DSN=&&TEMP,DISP=(NEW,PASS),
//             SPACE=(CYL,(5,2)),
//             DCB=(RECFM=FB,LRECL=80)
//*
//* DUMMY (no I/O performed)
//OPTFILE  DD   DUMMY
//*
//* Concatenation
//STEPLIB  DD   DSN=MY.LIB1,DISP=SHR
//         DD   DSN=MY.LIB2,DISP=SHR`
    },

    { title:"5.2 — DSN (Dataset Name)", level:"Beginner",
      content:`DSN (or DSNAME) specifies the dataset name.

Rules:
  • Max 44 characters total
  • Each qualifier: max 8 characters
  • Qualifiers separated by dots
  • First char of each qualifier: A-Z, @, #, $
  • Remaining chars: A-Z, 0-9, @, #, $, -
  • Convention: HLQ.APPLICATION.TYPE.DESCRIPTION

Types of DSN:
  • Cataloged: DSN=MY.PROD.DATA (z/OS finds it via catalog)
  • Temporary: DSN=&&TEMPNAME (exists only during job, && prefix)
  • Referback: DSN=*.STEP1.DD1 (references another DD in same job)
  • GDG relative: DSN=MY.GDG(+1) (next generation), DSN=MY.GDG(0) (current)
  • PDS member: DSN=MY.LIBRARY(MEMBER)

Temporary Datasets:
  • DSN=&&name — Created in one step, used in later steps
  • Automatically deleted when job ends
  • Must DISP=(NEW,PASS) in creating step
  • Must DISP=(OLD,DELETE) or DISP=(OLD,PASS) in subsequent steps
  • If DSN is omitted entirely, z/OS creates an unnamed temp dataset

Referbacks:
  • DSN=*.stepname.ddname — Use same dataset as another DD
  • DSN=*.stepname.procstep.ddname — Referback into a PROC
  • Saves retyping long dataset names
  • Works for DSN, DCB, and VOL referbacks

💡 Pro Tip: Double dots after symbolic parameters: DSN=&HLQ..DATA — the first dot ends the symbol, the second is the qualifier separator.`,
      code:`//* Cataloged dataset
//DD1      DD   DSN=PROD.PAYROLL.MASTER,DISP=SHR
//*
//* PDS member
//DD2      DD   DSN=MY.SOURCE.LIB(PROGRAM1),DISP=SHR
//*
//* Temporary dataset
//STEP1    EXEC PGM=PROG1
//TEMPOUT  DD   DSN=&&MYTEMP,DISP=(NEW,PASS),
//             SPACE=(CYL,(5,2)),
//             DCB=(RECFM=FB,LRECL=80)
//STEP2    EXEC PGM=PROG2
//INPUT    DD   DSN=&&MYTEMP,DISP=(OLD,DELETE)
//*
//* Referback
//STEP3    EXEC PGM=PROG3
//INPUT    DD   DSN=*.STEP1.TEMPOUT,DISP=(OLD,DELETE)
//*
//* GDG (Generation Data Group)
//NEWGEN   DD   DSN=MY.GDG.BASE(+1),
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//CURGEN   DD   DSN=MY.GDG.BASE(0),DISP=SHR`
    },

    { title:"5.3 — DISP (Disposition)", level:"Beginner",
      content:`DISP is the most important DD parameter. It tells z/OS the current status of the dataset and what to do with it after the step.

Syntax: DISP=(status,normal-end,abnormal-end)

Status (first sub-parameter):
  • NEW — Dataset doesn't exist, create it
  • OLD — Dataset exists, exclusive access (no other job can use it)
  • SHR — Dataset exists, shared access (multiple jobs can read)
  • MOD — Append. If exists, open for output at end. If doesn't exist, create it.

Normal Disposition (second sub-parameter):
  • KEEP — Keep the dataset (don't delete, don't catalog)
  • DELETE — Delete the dataset
  • CATLG — Catalog the dataset (add to system catalog)
  • UNCATLG — Remove from catalog but keep on disk
  • PASS — Pass to next step in job (temporary datasets)

Abnormal Disposition (third sub-parameter):
  Same options as normal disposition. Applied when step ABENDs.

Defaults:
  If you omit sub-parameters: DISP=(NEW,DELETE,DELETE) — created, deleted on success, deleted on failure. DISP=SHR defaults to DISP=(SHR,KEEP,KEEP).

Common Patterns:
  • DISP=SHR — Read existing dataset (shared)
  • DISP=OLD — Update existing dataset (exclusive)
  • DISP=(NEW,CATLG,DELETE) — Create, catalog on success, delete on failure
  • DISP=(NEW,PASS) — Create temp, pass to next step
  • DISP=(MOD,CATLG) — Append to existing or create new
  • DISP=(OLD,DELETE) — Delete a dataset

💡 Interview Tip: Be able to explain every DISP combination. "DISP=(NEW,CATLG,DELETE)" = "Create new, catalog if step succeeds, delete if step fails."`,
      code:`//* Read existing (shared)
//INPUT    DD   DSN=MY.DATA,DISP=SHR
//*
//* Read existing (exclusive)
//MASTER   DD   DSN=MY.MASTER,DISP=OLD
//*
//* Create new, catalog on success
//OUTPUT   DD   DSN=MY.NEW.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//*
//* Append to existing
//LOGFILE  DD   DSN=MY.LOG.DATA,DISP=MOD
//*
//* Temp dataset — pass to next step
//WORK     DD   DSN=&&WORK,
//             DISP=(NEW,PASS),
//             SPACE=(TRK,(50,20))
//*
//* Delete a dataset
//DELSTEP  EXEC PGM=IEFBR14
//DELDD    DD   DSN=MY.OLD.DATA,DISP=(OLD,DELETE)`
    },

    { title:"5.4 — SPACE Parameter", level:"Beginner",
      content:`SPACE allocates disk space for new datasets. Only needed with DISP=(NEW,...).

Syntax: SPACE=(unit,(primary,secondary,directory),RLSE,,round)

Unit Types:
  • TRK — Tracks (smallest unit, ~56KB on 3390)
  • CYL — Cylinders (15 tracks, ~840KB on 3390)
  • blksize — Block size in bytes (e.g., SPACE=(80,(1000,200)))
  • Note: Modern best practice is TRK or CYL

Primary Allocation: Initial space. Allocated when dataset is created.
Secondary Allocation: Additional space when primary fills up. Can extend up to 15 times (max 16 extents per volume).
Directory Blocks: For PDS only. Each block holds ~5-6 members.

RLSE (Release): Returns unused space when dataset is closed. Always use for new datasets.

Examples:
  SPACE=(CYL,(10,5),RLSE) — 10 cylinders primary, 5 secondary, release unused
  SPACE=(TRK,(100,50),RLSE) — 100 tracks primary, 50 secondary
  SPACE=(CYL,(5,2,10),RLSE) — PDS with 10 directory blocks
  SPACE=(TRK,0) — Zero space (used with IEFBR14 to catalog empty dataset)

Estimation Guide (3390 disk):
  1 track ≈ 56,664 bytes
  1 cylinder = 15 tracks ≈ 849,960 bytes ≈ 0.8 MB
  For FB/80: ~680 records per track, ~10,200 per cylinder

Common ABEND: SB37 — Primary and all secondary extents full. Increase SPACE or add UNIT=SYSDA to allow multi-volume.

💡 Pro Tip: Over-allocate slightly and use RLSE. Running out of space (SB37) is much worse than wasting a few tracks.`,
      code:`//* CYL allocation
//OUTPUT   DD   DSN=MY.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)
//*
//* TRK allocation
//SMALL    DD   DSN=MY.SMALL.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(20,10),RLSE)
//*
//* PDS with directory
//PDSLIB   DD   DSN=MY.NEW.PDS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2,20),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920,DSORG=PO)
//*
//* Zero space (IEFBR14 catalog trick)
//EMPTY    DD   DSN=MY.CATALOG.ENTRY,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,0)`
    },

    { title:"5.5 — DCB (Data Control Block)", level:"Beginner",
      content:`DCB defines the physical characteristics of a dataset — record format, record length, and block size.

Syntax: DCB=(RECFM=xx,LRECL=nnn,BLKSIZE=nnnnn)

RECFM (Record Format):
  • F — Fixed length records
  • FB — Fixed Blocked (most common)
  • V — Variable length records
  • VB — Variable Blocked
  • FBA — Fixed Blocked with ASA print control
  • VBA — Variable Blocked with ASA print control
  • U — Undefined (load modules)

LRECL (Logical Record Length):
  • FB: Exact record size (e.g., 80, 133, 200)
  • VB: Maximum record size (includes 4-byte RDW)
  • Common: 80 (source), 133 (print), 200-2000 (data)

BLKSIZE (Block Size):
  • How many bytes per physical block on disk
  • Larger blocks = better I/O performance
  • Must be multiple of LRECL for FB
  • BLKSIZE=0 — Let z/OS calculate optimal (RECOMMENDED)
  • Max: 32,760 (half-track) or system-managed

Common DCB Patterns:
  • DCB=(RECFM=FB,LRECL=80,BLKSIZE=0) — Source code, JCL
  • DCB=(RECFM=FB,LRECL=133,BLKSIZE=0) — Print files
  • DCB=(RECFM=VB,LRECL=32756,BLKSIZE=0) — Variable data
  • DCB=(RECFM=U,BLKSIZE=32760) — Load modules

DCB Merge Rules:
  z/OS merges DCB from multiple sources: JCL DD → dataset label → program. JCL overrides everything.

💡 Best Practice: Always use BLKSIZE=0 for new datasets. z/OS picks the optimal block size for the device.`,
      code:`//* Fixed Blocked (most common)
//OUTPUT   DD   DSN=MY.FB.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//*
//* Variable Blocked
//VARDATA  DD   DSN=MY.VB.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=VB,LRECL=2000,BLKSIZE=0)
//*
//* Print file with ASA control
//PRINT    DD   DSN=MY.REPORT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE),
//             DCB=(RECFM=FBA,LRECL=133,BLKSIZE=0)
//*
//* Load module library
//LOADLIB  DD   DSN=MY.LOADLIB,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5,50),RLSE),
//             DCB=(RECFM=U,BLKSIZE=32760,DSORG=PO)`
    },

    { title:"5.6 — SYSOUT & Output Processing", level:"Beginner",
      content:`SYSOUT routes program output to the JES SPOOL instead of a dataset. This is how reports, logs, and print output are handled.

Syntax: //ddname DD SYSOUT=class or SYSOUT=*

SYSOUT=* — Use the MSGCLASS from the JOB statement
SYSOUT=A — Route to output class A (typically print)
SYSOUT=X — Route to output class X (typically held)

Additional SYSOUT Parameters:
  • SYSOUT=(class,,formname) — Specify forms (for printers)
  • SYSOUT=*,OUTPUT=*.outname — Use OUTPUT statement settings
  • COPIES=n — Number of copies
  • DEST=destination — Route to specific printer/node

OUTPUT Statement (centralized control):
  //RPTOUT OUTPUT DEST=RMT1,COPIES=3,FORMS=STD
  //REPORT DD SYSOUT=*,OUTPUT=*.RPTOUT

Common DD Names That Use SYSOUT:
  • SYSPRINT — Program messages (almost every utility)
  • SYSOUT — Additional output
  • SYSMSG — System messages
  • SYSUDUMP — Formatted dump on ABEND
  • SYSABEND — Unformatted dump on ABEND
  • CEEDUMP — LE runtime dump

💡 Pro Tip: Always code SYSPRINT DD SYSOUT=* and SYSOUT DD SYSOUT=* in your JCL. Missing these causes S013 ABEND when the program tries to write.`,
      code:`//* Basic SYSOUT
//SYSPRINT DD   SYSOUT=*
//SYSOUT   DD   SYSOUT=*
//*
//* Specific output class
//REPORT   DD   SYSOUT=A
//*
//* With OUTPUT statement
//RPTCTL   OUTPUT DEST=PRINTER1,COPIES=3,FORMS=STD
//STEP1    EXEC PGM=RPTPROG
//REPORT   DD   SYSOUT=*,OUTPUT=*.RPTCTL
//*
//* Dump DDs (for ABEND debugging)
//SYSUDUMP DD   SYSOUT=*
//SYSABEND DD   SYSOUT=*
//CEEDUMP  DD   SYSOUT=*`
    },

    { title:"5.7 — In-Stream Data (DD * and DD DATA)", level:"Beginner",
      content:`In-stream data lets you include data directly in the JCL instead of reading from a dataset.

DD * (Delimited by /*):
  //SYSIN DD *
  data lines go here
  /*

  JES reads lines between DD * and /* as input data. The data is stored on SPOOL and passed to the program as if it were a dataset.

DD DATA (Delimited by /*):
  //SYSIN DD DATA
  data lines including // in columns 1-2
  /*

  DD DATA allows lines starting with // in the data (DD * would treat them as JCL).

DLM= (Custom Delimiter):
  //SYSIN DD *,DLM=ZZ
  data including /* and // lines
  ZZ

  DLM lets you specify a custom 2-character delimiter. Useful when data contains /* or //.

Common Uses:
  • SORT control cards: SORT FIELDS=(1,10,CH,A)
  • IDCAMS commands: DELETE, DEFINE, REPRO
  • SQL for DB2: SELECT * FROM TABLE
  • COBOL SYSIN input for testing
  • Utility control statements

Rules:
  • Data lines are columns 1–80
  • /* in columns 1–2 ends the data (for DD *)
  • Maximum data depends on SPOOL space
  • In-stream data cannot be in a PROC (use SYSIN override instead)

💡 Common Mistake: Forgetting /* at the end of in-stream data. The rest of your JCL becomes data input!`,
      code:`//* DD * with sort control cards
//SORT     EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.SORTED,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A,11,5,ZD,D)
  OUTREC FIELDS=(1,80)
/*
//*
//* DD DATA — allows // in data
//SYSIN    DD   DATA
//THIS LINE STARTS WITH SLASHES
DATA CONTINUES HERE
/*
//*
//* Custom delimiter
//SYSIN    DD   *,DLM=$$
  This data contains /* characters
  And // at start of lines
$$`
    },

    { title:"5.8 — DUMMY & NULLFILE", level:"Beginner",
      content:`DUMMY tells z/OS to accept I/O requests but not actually read or write any data. It's like /dev/null on Unix.

Syntax: //ddname DD DUMMY

Behavior:
  • READ operations: Returns end-of-file immediately
  • WRITE operations: Accepts data but discards it
  • The program runs normally — it just gets no input or produces no output for that DD

NULLFILE:
  Same as DUMMY. //ddname DD DSN=NULLFILE is equivalent to //ddname DD DUMMY.

Common Uses:
  • Skip optional output: //REPORT DD DUMMY (don't generate report)
  • Testing without input: //INFILE DD DUMMY (test with empty input)
  • Suppress utility output: //SYSPRINT DD DUMMY (no messages)
  • Conditional processing: DUMMY out files you don't need for a particular run

AFF= (Affinity):
  //DD1 DD DUMMY,AFF=REALDD — DUMMY dataset with affinity to another DD's device.

DUMMY in Production:
  Some jobs use DUMMY strategically. Example: A monthly job has //DAILYRPT DD DUMMY in the monthly version because daily reports aren't needed.

💡 Pro Tip: When debugging, temporarily change a DD to DUMMY to isolate whether that file is causing the problem.`,
      code:`//* DUMMY — suppress output
//STEP1    EXEC PGM=MYPROG
//INPUT    DD   DSN=MY.INPUT,DISP=SHR
//OUTPUT   DD   DSN=MY.OUTPUT,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//REPORT   DD   DUMMY
//SYSPRINT DD   SYSOUT=*
//*
//* DUMMY — test with no input
//STEP2    EXEC PGM=MYPROG
//INPUT    DD   DUMMY
//OUTPUT   DD   SYSOUT=*
//*
//* NULLFILE (same as DUMMY)
//DD1      DD   DSN=NULLFILE`
    },

    { title:"5.9 — DD Concatenation", level:"Intermediate",
      content:`Concatenation chains multiple datasets under one DD name. The program sees them as one continuous file.

Syntax: Name the first DD, leave subsequent DDs unnamed.
  //INPUT DD DSN=FILE1,DISP=SHR
  //      DD DSN=FILE2,DISP=SHR
  //      DD DSN=FILE3,DISP=SHR

The program reads FILE1 first, then FILE2, then FILE3, seamlessly.

Rules:
  • Max 255 datasets in a concatenation
  • All datasets should have compatible DCB attributes
  • Largest LRECL/BLKSIZE must be first (or specify DCB on first DD)
  • Can mix regular datasets and SYSOUT (rarely done)
  • Can concatenate PDS libraries (very common for STEPLIB, SYSLIB)

Common Uses:
  • STEPLIB/JOBLIB — Multiple load libraries
  • SYSLIB — Multiple copy libraries (COBOL compile)
  • Input files — Reading from multiple sources
  • SYSPROC — Multiple REXX/CLIST libraries

Order Matters:
  For PDS concatenation (STEPLIB, SYSLIB), the first library with a matching member is used. Put the most specific library first.

DCB Issues:
  If concatenated datasets have different LRECL/BLKSIZE, z/OS uses the first DD's attributes. If a later dataset has larger blocks, you get S001 ABEND. Solution: Code DCB on the first DD with the largest values.

💡 Best Practice: For STEPLIB, put your test/project library first, then production. This way your test version overrides production.`,
      code:`//* STEPLIB concatenation (search order)
//STEPLIB  DD   DSN=MY.TEST.LOADLIB,DISP=SHR
//         DD   DSN=MY.PROD.LOADLIB,DISP=SHR
//         DD   DSN=SYS1.COMMON.LOADLIB,DISP=SHR
//*
//* SYSLIB concatenation (COBOL copybooks)
//SYSLIB   DD   DSN=MY.PROJECT.COPYLIB,DISP=SHR
//         DD   DSN=MY.COMMON.COPYLIB,DISP=SHR
//         DD   DSN=SYS1.COPYLIB,DISP=SHR
//*
//* Input file concatenation
//INPUT    DD   DSN=REGION.EAST.DATA,DISP=SHR
//         DD   DSN=REGION.WEST.DATA,DISP=SHR
//         DD   DSN=REGION.CENTRAL.DATA,DISP=SHR
//*
//* DCB on first DD (prevents S001)
//INPUT    DD   DSN=FILE.A,DISP=SHR,
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=27800)
//         DD   DSN=FILE.B,DISP=SHR`
    },

    { title:"5.10 — UNIT & VOL Parameters", level:"Intermediate",
      content:`UNIT and VOL control where new datasets are physically placed.

UNIT — Specifies the device type:
  • UNIT=SYSDA — Any DASD (disk) device (most common)
  • UNIT=3390 — Specific device type
  • UNIT=TAPE — Tape device
  • UNIT=SYSALLDA — All DASD including non-standard
  • UNIT=(SYSDA,2) — Allocate across 2 volumes
  • UNIT=VIO — Virtual I/O (memory-based temp storage, very fast)

VOL — Specifies the volume serial:
  • VOL=SER=VOL001 — Specific volume
  • VOL=SER=(VOL001,VOL002) — Multi-volume
  • VOL=REF=*.STEP1.DD1 — Same volume as another DD

When to Use UNIT:
  Most modern shops use SMS (Storage Management Subsystem) which handles device selection automatically. UNIT=SYSDA is usually sufficient. Only code specific volumes for special cases.

SMS (Storage Management Subsystem):
  Modern z/OS uses SMS to manage storage. Instead of UNIT and VOL, you specify:
  • STORCLAS — Storage class (where to put it)
  • MGMTCLAS — Management class (how long to keep it)
  • DATACLAS — Data class (DCB attributes)

  SMS eliminates the need for most UNIT/VOL specifications.

💡 Pro Tip: Use UNIT=VIO for temporary datasets that don't need to survive a system failure. It's significantly faster than disk.`,
      code:`//* UNIT=SYSDA (any disk — most common)
//OUTPUT   DD   DSN=MY.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=SYSDA,
//             SPACE=(CYL,(10,5),RLSE)
//*
//* UNIT=VIO (fast temp in memory)
//TEMP     DD   DSN=&&TEMP,
//             DISP=(NEW,PASS),
//             UNIT=VIO,
//             SPACE=(CYL,(5,2))
//*
//* Specific volume
//SPECIAL  DD   DSN=MY.SPECIAL.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=SYSDA,
//             VOL=SER=PROD01,
//             SPACE=(CYL,(50,10),RLSE)
//*
//* SMS-managed (modern approach)
//SMSDATA  DD   DSN=MY.SMS.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             STORCLAS=STANDARD,
//             MGMTCLAS=MONTHLY,
//             SPACE=(CYL,(10,5),RLSE)`
    },

    { title:"5.11 — Dataset Types & Organization", level:"Beginner",
      content:`z/OS supports several dataset organizations. Understanding them is essential for coding correct DD statements.

Sequential (PS — Physical Sequential):
  Records stored one after another. Read sequentially from start to end. Most common for batch data files. DSORG=PS in DCB.

PDS (Partitioned Data Set):
  A directory + members. Like a folder with files. Used for source code, JCL, copybooks, load modules. Each member has a name (1-8 chars). DSORG=PO in DCB.

PDSE (PDS Extended):
  Modern replacement for PDS. Better space management, no need to compress. Supports longer member names. Same JCL as PDS — z/OS handles it transparently.

VSAM (Virtual Storage Access Method):
  High-performance access method with 4 types:
  • KSDS — Key Sequenced (like indexed file)
  • ESDS — Entry Sequenced (like sequential)
  • RRDS — Relative Record (by record number)
  • LDS — Linear (byte-stream)
  VSAM is defined by IDCAMS, not JCL DD parameters.

GDG (Generation Data Group):
  A collection of sequentially numbered datasets sharing a base name. Each generation is a regular sequential dataset. MY.GDG.BASE(0) = current, (+1) = new, (-1) = previous.

Temporary:
  DSN=&&name datasets that exist only during the job. Automatically deleted when job ends.

💡 Interview Tip: Know when to use each type. Sequential for batch data, PDS for libraries, VSAM for online applications, GDG for daily/weekly files.`,
      code:`//* Sequential dataset (PS)
//SEQFILE  DD   DSN=MY.SEQ.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//*
//* PDS (library with members)
//SRCLIB   DD   DSN=MY.SOURCE.PDS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2,50),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0,DSORG=PO)
//*
//* PDS member access
//PGMSRC   DD   DSN=MY.SOURCE.PDS(MYPROG),DISP=SHR
//*
//* VSAM (accessed via IDCAMS or program)
//VSAMFILE DD   DSN=MY.VSAM.KSDS,DISP=SHR
//*
//* GDG generations
//NEWGEN   DD   DSN=MY.DAILY.GDG(+1),
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//CURGEN   DD   DSN=MY.DAILY.GDG(0),DISP=SHR
//PREVGEN  DD   DSN=MY.DAILY.GDG(-1),DISP=SHR`
    },

    { title:"5.12 — LIKE & REFDD", level:"Intermediate",
      content:`LIKE and REFDD let you copy DCB attributes from an existing dataset or DD, avoiding repetitive coding.

LIKE=dsname:
  Copies DCB attributes (RECFM, LRECL, BLKSIZE) and SPACE from an existing cataloged dataset. You still specify DSN, DISP, and can override any attribute.

REFDD=*.stepname.ddname:
  Copies DCB from another DD in the same job. More dynamic than LIKE since the reference is resolved at execution time.

DCB=*.stepname.ddname:
  Older syntax for referencing DCB from another DD. Same function as REFDD for DCB attributes.

When to Use:
  • LIKE — When creating a dataset identical to an existing template
  • REFDD — When creating a dataset identical to another DD in the same job
  • Explicit DCB — When you need specific values or no reference exists

💡 Pro Tip: LIKE is great for ensuring new datasets match existing ones. But verify the model dataset has the attributes you expect.`,
      code:`//* LIKE — copy attributes from existing dataset
//OUTPUT   DD   DSN=MY.NEW.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             LIKE=MY.EXISTING.DATA,
//             SPACE=(CYL,(20,10),RLSE)
//*
//* REFDD — copy DCB from another DD
//STEP1    EXEC PGM=MYPROG
//INPUT    DD   DSN=MY.INPUT.DATA,DISP=SHR
//OUTPUT   DD   DSN=MY.OUTPUT.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             REFDD=*.STEP1.INPUT,
//             SPACE=(CYL,(10,5),RLSE)
//*
//* DCB referback
//OUTPUT2  DD   DSN=MY.OUT2,
//             DISP=(NEW,CATLG,DELETE),
//             DCB=*.STEP1.INPUT,
//             SPACE=(CYL,(10,5),RLSE)`
    },

    { title:"5.13 — GDG (Generation Data Groups)", level:"Intermediate",
      content:`GDGs let you maintain multiple generations of a dataset. Think of them as versioned files — daily extracts, weekly backups, monthly reports.

Concept: A GDG base entry in the catalog + individual generation datasets.
  MY.DAILY.DATA — GDG base (defined by IDCAMS)
  MY.DAILY.DATA.G0001V00 — Generation 1
  MY.DAILY.DATA.G0002V00 — Generation 2

Relative References in JCL:
  • (+1) — New generation (next)
  • (0) — Current generation (latest)
  • (-1) — Previous generation
  • (-2) — Two generations back

Creating a GDG Base:
  Use IDCAMS DEFINE GDG command to create the base entry specifying max generations and disposition options.

GDG Parameters:
  • LIMIT(n) — Max number of generations (1-255)
  • NOEMPTY — When limit reached, only oldest is deleted
  • EMPTY — When limit reached, ALL generations deleted
  • SCRATCH — Delete dataset when uncataloged
  • NOSCRATCH — Keep dataset on disk when uncataloged

JCL for GDG:
  Creating (+1) requires DISP=(NEW,CATLG) and SPACE/DCB. Reading (0) or (-1) requires DISP=SHR. At job end, z/OS rolls generations: (+1)→(0), (0)→(-1), etc.

💡 Best Practice: Use NOEMPTY/SCRATCH. This keeps the most recent N generations and cleans up old ones automatically.`,
      code:`//* IDCAMS — Define GDG base
//DEFGDG   EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DEFINE GDG -
    (NAME(MY.DAILY.DATA) -
     LIMIT(7) -
     NOEMPTY -
     SCRATCH)
/*
//*
//* Create new generation
//STEP1    EXEC PGM=MYPROG
//OUTPUT   DD   DSN=MY.DAILY.DATA(+1),
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//*
//* Read current and previous
//CURGEN   DD   DSN=MY.DAILY.DATA(0),DISP=SHR
//PREVGEN  DD   DSN=MY.DAILY.DATA(-1),DISP=SHR`
    },

    { title:"5.14 — Temporary Datasets", level:"Beginner",
      content:`Temporary datasets exist only during the job. They're automatically deleted when the job ends — no cleanup needed.

Two Types:
  Named Temp: DSN=&&name — Has a name for referencing in later steps
  Unnamed Temp: Omit DSN entirely — z/OS generates a name

Creating a Temp:
  //WORK DD DSN=&&WORKFILE,DISP=(NEW,PASS),SPACE=(CYL,(5,2))
  DISP=(NEW,PASS) creates the temp and passes it to the next step.

Using a Temp in Later Steps:
  //INPUT DD DSN=&&WORKFILE,DISP=(OLD,DELETE)
  Or with referback: //INPUT DD DSN=*.STEP1.WORK,DISP=(OLD,DELETE)

VIO (Virtual I/O):
  UNIT=VIO puts the temp dataset entirely in memory/paging. Much faster than disk for small to medium temps.

Rules:
  • Temp datasets are NOT cataloged (no CATLG disposition)
  • Must use PASS to share between steps
  • Deleted automatically at job end
  • Cannot be accessed by other jobs
  • Can use referback for DSN and DCB

When to Use:
  • Sort work files
  • Intermediate processing results
  • Any data that doesn't need to persist after the job

💡 Pro Tip: Use &&TEMP with UNIT=VIO for sort work. It's much faster than disk.`,
      code:`//* Named temporary dataset
//STEP1    EXEC PGM=EXTRACT
//OUTPUT   DD   DSN=&&EXTRACT,
//             DISP=(NEW,PASS),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//*
//STEP2    EXEC PGM=SORT
//SORTIN   DD   DSN=&&EXTRACT,DISP=(OLD,PASS)
//SORTOUT  DD   DSN=&&SORTED,
//             DISP=(NEW,PASS),
//             SPACE=(CYL,(10,5),RLSE)
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//*
//STEP3    EXEC PGM=LOAD
//INPUT    DD   DSN=&&SORTED,DISP=(OLD,DELETE)
//*
//* VIO temp (in-memory, very fast)
//WORK     DD   DSN=&&VIOWORK,
//             DISP=(NEW,PASS),
//             UNIT=VIO,
//             SPACE=(CYL,(5,2))
//*
//* Unnamed temp (z/OS generates name)
//SCRATCH  DD   DISP=(NEW,DELETE),
//             SPACE=(TRK,(10,5)),
//             DCB=(RECFM=FB,LRECL=80)`
    },

    { title:"5.15 — Multi-Volume & Large Datasets", level:"Advanced",
      content:`When a dataset is too large for one volume, z/OS can spread it across multiple volumes.

Multi-Volume Allocation:
  UNIT=(SYSDA,2) — Allow up to 2 volumes
  VOL=SER=(VOL01,VOL02,VOL03) — Specific volumes
  SPACE=(CYL,(500,100),RLSE) — Large primary + secondary

Extended Format:
  DSNTYPE=LARGE — Allows datasets larger than 65,535 tracks per volume
  DSNTYPE=EXTREQ — Extended format required
  DSNTYPE=EXTPREF — Extended format preferred

Striped Datasets:
  Data spread across multiple volumes simultaneously for better I/O:
  UNIT=(3390,3) with extended format — 3-way striping

DATACLAS with SMS:
  Modern approach — let SMS handle multi-volume automatically based on data class rules.

Common ABENDs:
  • SB37 — Out of space, can't extend
  • SD37 — Can't extend on this volume (no secondary space coded)
  • SE37 — Max extents reached (16 per volume for non-extended)

Recovery:
  1. SB37: Add UNIT=(SYSDA,2) or increase SPACE
  2. SD37: Code secondary allocation
  3. SE37: Compress/reorganize, or use extended format

💡 Pro Tip: For very large datasets (100GB+), use SMS storage classes designed for large files and extended format.`,
      code:`//* Multi-volume allocation
//BIGFILE  DD   DSN=MY.LARGE.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=(SYSDA,5),
//             SPACE=(CYL,(3000,500),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//*
//* Extended format (large dataset support)
//EXTDATA  DD   DSN=MY.EXTENDED.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             DSNTYPE=LARGE,
//             SPACE=(CYL,(5000,1000),RLSE),
//             DCB=(RECFM=FB,LRECL=500,BLKSIZE=0)
//*
//* Specific volumes
//SPECVOL  DD   DSN=MY.MULTI.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=SYSDA,
//             VOL=SER=(VOL01,VOL02),
//             SPACE=(CYL,(1000,200),RLSE)`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 6: JCL PROCEDURES (8 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"6.1 — What are PROCs?", level:"Intermediate",
      content:`A PROC (Procedure) is reusable JCL stored in a PDS member. Instead of copying the same JCL into every job, you invoke the PROC.

Benefits: Consistency (everyone uses the same JCL), maintainability (change once, affects all jobs), reduced errors (tested, proven JCL).

Two Types:
  Catalogued PROC — Stored in a PROCLIB library (system or JCLLIB)
  In-stream PROC — Defined within the JCL member itself, between //name PROC and // PEND

Invoking: //STEP1 EXEC MYPROC or //STEP1 EXEC PROC=MYPROC

Where z/OS Finds PROCs:
  1. In-stream (within same JCL)
  2. JCLLIB ORDER= libraries
  3. System PROCLIB (SYS1.PROCLIB)

PROCs can contain symbolic parameters (&VAR) that are substituted at invocation time, making them flexible.

💡 Interview Tip: PROCs are like functions in programming — reusable, parameterized, and maintained centrally.`,
      code:`//* In-stream PROC
//MYPROC   PROC ENV=PROD,HLQ=PAY
//STEP1    EXEC PGM=MYPROG
//INPUT    DD   DSN=&HLQ..&ENV..DATA,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..&ENV..RESULT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//         PEND
//*
//* Invoke with defaults
//RUN1     EXEC MYPROC
//*
//* Invoke with overrides
//RUN2     EXEC MYPROC,ENV=TEST,HLQ=MYID`
    },

    { title:"6.2 — Symbolic Parameters", level:"Intermediate",
      content:`Symbolic parameters make PROCs flexible. They're variables prefixed with & that get substituted at invocation.

Defining: On the PROC statement: //name PROC VAR1=default,VAR2=default
Using: Anywhere in PROC: DSN=&HLQ..&ENV..DATA

Rules:
  • Start with & followed by 1-8 alphanumeric chars
  • First char after & must be alphabetic
  • Default values defined on PROC statement
  • Overridden on EXEC statement: //STEP EXEC MYPROC,VAR1=value
  • Double dot (..) after symbolic in DSN: &HLQ..DATA (first dot ends symbol, second is separator)
  • &SYSUID, &SYSNAME, &LYYMMDD are system symbols

SET Statement:
  //SET VAR=value — Defines symbolics outside PROCs. Useful for making regular JCL dynamic.

Nullifying: To set a symbolic to blank, code VAR= (equals with no value).

💡 Common Mistake: Single dot after symbolic: &HLQ.DATA becomes PAYDATA (dot consumed). Use &HLQ..DATA for PAY.DATA.`,
      code:`//* PROC with symbolics
//EXTPROC  PROC ENV=PROD,
//             HLQ=PAY,
//             REGION=0M
//EXTRACT  EXEC PGM=PAYEXT,REGION=&REGION
//INPUT    DD   DSN=&HLQ..&ENV..MASTER,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..&ENV..EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSPRINT DD   SYSOUT=*
//         PEND
//*
//* Override symbolics
//STEP1    EXEC EXTPROC,ENV=TEST,HLQ=MYID
//*
//* SET for non-PROC JCL
//         SET ENV=PROD
//         SET HLQ=PAY
//STEP1    EXEC PGM=MYPROG
//INPUT    DD   DSN=&HLQ..&ENV..DATA,DISP=SHR`
    },

    { title:"6.3 — PROC DD Overrides", level:"Intermediate",
      content:`You can override or add DD statements in a PROC when invoking it.

Override Syntax: //stepname.procstep.ddname DD parameters

Rules:
  • stepname = your EXEC step that calls the PROC
  • procstep = the step name INSIDE the PROC
  • ddname = the DD name to override
  • Override replaces the entire DD (not individual parameters)
  • Overrides must be in the same order as the PROC's DDs

Adding DDs:
  Code new DDs after the last DD of the PROC step. z/OS adds them.

Adding to Concatenation:
  To add datasets to a concatenated DD in a PROC, code the additional DDs after the override.

Nullifying a DD:
  //stepname.procstep.ddname DD DUMMY — Replace with DUMMY
  //stepname.procstep.ddname DD override — Replace with different dataset

💡 Pro Tip: Use MSGLEVEL=(1,1) to see PROC expansion with your overrides in job output. Essential for debugging.`,
      code:`//* PROC definition
//COMPPROC PROC
//COMPILE  EXEC PGM=IGYCRCTL,PARM='LIB'
//STEPLIB  DD   DSN=SYS1.COBCOMP,DISP=SHR
//SYSLIB   DD   DSN=SYS1.COPYLIB,DISP=SHR
//SYSPRINT DD   SYSOUT=*
//SYSLIN   DD   DSN=&&OBJ,DISP=(NEW,PASS),
//             SPACE=(TRK,(20,10))
//         PEND
//*
//* Invoke with overrides
//COB      EXEC COMPPROC
//*
//* Override SYSLIB (add project copylib)
//COB.COMPILE.SYSLIB DD DSN=MY.PROJECT.COPYLIB,DISP=SHR
//                   DD DSN=SYS1.COPYLIB,DISP=SHR
//*
//* Add a DD not in PROC
//COB.COMPILE.DBRMLIB DD DSN=MY.DBRM.LIB(MYPROG),
//                   DISP=SHR`
    },

    { title:"6.4 — Nested PROCs", level:"Intermediate",
      content:`A PROC can call another PROC. This is nesting. z/OS supports up to 15 levels of nesting.

Example: Job calls PROC_A which calls PROC_B. Overrides use multi-level qualification.

Override Naming for Nested PROCs:
  //jobstep.procstep.ddname — One level
  //jobstep.outerproc.innerproc.ddname — Not directly supported

In practice, deep nesting makes JCL hard to debug. Most shops limit to 2 levels.

💡 Best Practice: Keep nesting to 1-2 levels maximum for maintainability.`,
      code:`//* Inner PROC (in PROCLIB)
//INNER    PROC
//SORT     EXEC PGM=SORT
//SORTIN   DD   DSN=&&SORTIN,DISP=(OLD,DELETE)
//SORTOUT  DD   DSN=&&SORTOUT,DISP=(NEW,PASS),
//             SPACE=(CYL,(5,2))
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   DUMMY
//         PEND
//*
//* Outer PROC calls inner
//OUTER    PROC HLQ=PROD
//EXTRACT  EXEC PGM=EXTRACT
//INPUT    DD   DSN=&HLQ..MASTER,DISP=SHR
//OUTPUT   DD   DSN=&&SORTIN,DISP=(NEW,PASS),
//             SPACE=(CYL,(10,5))
//DOSORT   EXEC INNER
//         PEND
//*
//* Job calls outer PROC
//STEP1    EXEC OUTER,HLQ=TEST`
    },

    { title:"6.5 — JCLLIB Statement", level:"Intermediate",
      content:`JCLLIB ORDER tells JES where to search for PROCs and INCLUDE members. It must appear after JOB and before any EXEC.

Syntax: // JCLLIB ORDER=(lib1,lib2,lib3)

Search Order:
  1. In-stream PROCs (within same JCL)
  2. Libraries listed in JCLLIB ORDER (left to right)
  3. System PROCLIB

Rules:
  • Must be coded after JOB, before first EXEC
  • Only one JCLLIB per job
  • Max 255 libraries in ORDER list
  • Also used for INCLUDE members

💡 Best Practice: Put project-specific PROC libraries first, then shared/system libraries.`,
      code:`//MYJOB    JOB  (ACCT),'JCLLIB DEMO',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//         JCLLIB ORDER=(MY.PROJECT.PROCLIB,
//             MY.SHARED.PROCLIB,
//             SYS1.PROCLIB)
//*
//STEP1    EXEC MYPROC
//STEP2    EXEC STDPROC
//*
//* z/OS searches for MYPROC:
//*   1. In-stream (not found)
//*   2. MY.PROJECT.PROCLIB
//*   3. MY.SHARED.PROCLIB
//*   4. SYS1.PROCLIB`
    },

    { title:"6.6 — INCLUDE Statement", level:"Intermediate",
      content:`INCLUDE pulls in JCL from a PDS member at the point where it appears. Think of it as #include in C.

Syntax: // INCLUDE MEMBER=membername

The member is fetched from JCLLIB ORDER libraries. The included JCL is inserted as if it were coded directly.

Uses:
  • Standard DD groups (DB2 DDs, SORT DDs)
  • Common utility steps
  • Site-standard headers or footers
  • Reusable dataset definitions

Rules:
  • JCLLIB must be coded for INCLUDE to work
  • Cannot be inside a PROC
  • Symbolic parameters work in INCLUDEd members

💡 Pro Tip: INCLUDE is simpler than PROCs for reusing DD groups. Use PROCs for reusable steps, INCLUDE for reusable DD sets.`,
      code:`//* Member STDDB2DD in MY.PROJECT.PROCLIB:
//*   //DSNLOAD  DD DSN=DB2.SDSNLOAD,DISP=SHR
//*   //SYSPRINT DD SYSOUT=*
//*   //SYSTSPRT DD SYSOUT=*
//*   //SYSUDUMP DD SYSOUT=*
//*
//MYJOB    JOB  (ACCT),'INCLUDE DEMO',
//             CLASS=A,MSGCLASS=X
//         JCLLIB ORDER=(MY.PROJECT.PROCLIB)
//*
//STEP1    EXEC PGM=IKJEFT01,DYNAMNBR=50
//         INCLUDE MEMBER=STDDB2DD
//SYSTSIN  DD   *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(MYPROG) PLAN(MYPLAN)
  END
/*`
    },

    { title:"6.7 — PROC vs INCLUDE", level:"Intermediate",
      content:`Both PROCs and INCLUDE promote reuse, but they serve different purposes.

PROC — Reusable STEPS:
  • Contains EXEC + DD statements (complete steps)
  • Supports symbolic parameters for flexibility
  • Can be overridden from calling JCL
  • Can be nested (PROC calls PROC)
  • Invoked via EXEC statement

INCLUDE — Reusable JCL FRAGMENTS:
  • Contains any JCL statements (DDs, SET, etc.)
  • Supports symbolics (from SET or PROC context)
  • Inserted literally at the INCLUDE point
  • Cannot be overridden
  • Used via INCLUDE MEMBER=

When to Use Each:
  PROC: Complete compile-link-go procedures, standard batch job templates, multi-step processes
  INCLUDE: Standard DD groups (DB2, SORT), common dataset definitions, site headers

💡 Best Practice: Use PROCs for step-level reuse, INCLUDE for DD-level reuse. They complement each other.`,
      code:`//* PROC — reusable step
//SORTPROC PROC SORTFLD='(1,10,CH,A)'
//SORT     EXEC PGM=SORT
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *,SYMBOLS=JCLONLY
  SORT FIELDS=&SORTFLD
/*
//         PEND
//*
//* INCLUDE — reusable DD group
//* Member DBDDS in PROCLIB:
//*   //DSNLOAD DD DSN=DB2.LOAD,DISP=SHR
//*   //DBRMLIB DD DSN=MY.DBRM,DISP=SHR
//*
//MYJOB    JOB  (ACCT),'DEMO'
//         JCLLIB ORDER=(MY.PROCLIB)
//*
//STEP1    EXEC PGM=IKJEFT01
//         INCLUDE MEMBER=DBDDS
//SYSTSIN  DD   *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(MYPROG)
  END
/*`
    },

    { title:"6.8 — Common IBM PROCs", level:"Intermediate",
      content:`IBM provides standard PROCs for common tasks. Knowing these saves time.

Compile/Link/Go PROCs:
  • IGYWCLG — COBOL compile, link, go (Enterprise COBOL)
  • IGYWCL — COBOL compile and link (no go)
  • IGYWC — COBOL compile only
  • ASMACLG — Assembler compile, link, go
  • CBCCL — C compile and link

Steps inside IGYWCLG:
  COBOL — Compile (PGM=IGYCRCTL)
  LKED — Link-edit (PGM=IEWL)
  GO — Execute the program

DB2 PROCs:
  • DSNHCOB2 — DB2 precompile + COBOL compile + link
  • DSNTEP2 — Run SPUFI/dynamic SQL in batch
  • DSNTIAD — Run static SQL in batch

Sort PROCs:
  • SORT — Invoke DFSORT (usually a simple PROC or direct PGM=SORT)

💡 Pro Tip: View IBM PROC internals with ISPF 3.4: browse SYS1.PROCLIB(IGYWCLG) to understand what each step does.`,
      code:`//* COBOL Compile-Link-Go
//COB      EXEC IGYWCLG
//COB.COBOL.SYSIN DD DSN=MY.SOURCE(MYPROG),DISP=SHR
//COB.COBOL.SYSLIB DD DSN=MY.COPYLIB,DISP=SHR
//                 DD DSN=SYS1.COPYLIB,DISP=SHR
//COB.LKED.SYSLMOD DD DSN=MY.LOADLIB(MYPROG),DISP=SHR
//COB.GO.INPUT DD DSN=MY.TEST.DATA,DISP=SHR
//COB.GO.OUTPUT DD SYSOUT=*
//*
//* COBOL Compile Only
//COMP     EXEC IGYWC,
//             PARM.COBOL='LIB,LIST,MAP,RENT,OPT(2)'
//COMP.COBOL.SYSIN DD DSN=MY.SOURCE(MYPROG),DISP=SHR
//COMP.COBOL.SYSLIB DD DSN=MY.COPYLIB,DISP=SHR`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 7: CONDITIONAL PROCESSING (5 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"7.1 — IF/THEN/ELSE/ENDIF", level:"Intermediate",
      content:`IF/THEN/ELSE provides readable conditional step execution, replacing the confusing COND parameter.

Syntax:
  //name IF condition THEN
  //step EXEC PGM=...
  //name ELSE
  //step EXEC PGM=...
  //name ENDIF

Conditions can test:
  • RC — Return code: IF RC = 0, IF RC > 4, IF RC <= 8
  • stepname.RC — Specific step: IF STEP1.RC = 0
  • ABEND — Did a step ABEND: IF STEP1.ABEND
  • ABENDCC — ABEND code: IF STEP1.ABENDCC = S0C7
  • RUN — Did step run: IF STEP1.RUN

Operators: = (EQ), > (GT), < (LT), >= (GE), <= (LE), ¬= (NE)
Boolean: AND (&), OR (|), NOT (¬)

Rules:
  • IF/ENDIF must be paired
  • Can be nested
  • ELSE is optional
  • All steps between IF and ELSE (or ENDIF) are controlled

💡 Pro Tip: Always use IF/THEN instead of COND for new JCL. It's much more readable.`,
      code:`//* Basic IF/THEN/ELSE
//         IF STEP1.RC = 0 THEN
//STEP2    EXEC PGM=PROCESS
//INPUT    DD   DSN=MY.DATA,DISP=SHR
//         ELSE
//ERRSTEP  EXEC PGM=ERRHANDL
//ERRDD    DD   SYSOUT=*
//         ENDIF
//*
//* Complex condition
//         IF (STEP1.RC <= 4 AND STEP2.RC = 0) THEN
//STEP3    EXEC PGM=FINAL
//         ENDIF
//*
//* ABEND check
//         IF STEP1.ABEND THEN
//CLEANUP  EXEC PGM=CLEANUP,COND=EVEN
//         ENDIF
//*
//* Nested IF
//         IF STEP1.RC = 0 THEN
//           IF STEP2.RC = 0 THEN
//STEP3      EXEC PGM=SUCCESS
//           ELSE
//STEP3E     EXEC PGM=PARTIAL
//           ENDIF
//         ENDIF`
    },

    { title:"7.2 — COND Parameter Deep Dive", level:"Intermediate",
      content:`COND is the legacy conditional parameter. You'll encounter it in millions of lines of existing JCL.

Key Rule: If the COND test is TRUE, the step is SKIPPED. Think "skip if."

COND on EXEC (step level):
  COND=(code,operator) — Test against ALL prior steps
  COND=(code,operator,stepname) — Test specific step
  COND=((code,op),(code,op,step)) — Multiple tests (OR logic)

COND on JOB (job level):
  Tests apply to ALL remaining steps. If true, remaining steps are flushed.

COND=EVEN — Execute even if prior step ABENDed
COND=ONLY — Execute ONLY if prior step ABENDed

Truth Table Examples:
  COND=(0,NE) → Skip if ANY prior RC ≠ 0 → Only run if all prior RC=0
  COND=(4,LT) → Skip if ANY prior RC < 4 → Only run if all prior RC ≥ 4
  COND=(8,LE,STEP1) → Skip if STEP1 RC ≤ 8

💡 Interview Tip: Be able to trace through COND logic. "What runs if STEP1=4, STEP2=8?" is a common interview question.`,
      code:`//* Only run if all prior steps RC=0
//STEP3    EXEC PGM=MYPROG,COND=(0,NE)
//*
//* Only run if STEP1 was successful
//STEP4    EXEC PGM=MYPROG,COND=(0,NE,STEP1)
//*
//* Cleanup — run even on ABEND
//CLEAN    EXEC PGM=CLEANUP,COND=EVEN
//*
//* Error handler — run ONLY on ABEND
//ERRHNDL  EXEC PGM=ERRPROG,COND=ONLY
//*
//* Multiple conditions (OR logic)
//STEP5    EXEC PGM=MYPROG,
//             COND=((0,NE,STEP1),(4,LT,STEP2))
//* Skip if STEP1 RC≠0 OR STEP2 RC<4
//*
//* Trace exercise:
//* STEP1 RC=0, STEP2 RC=8, STEP3 RC=4
//* STEP4 COND=(4,LE) → 0≤4? YES → SKIP
//* STEP5 COND=(4,LT) → 0<4? YES → SKIP`
    },

    { title:"7.3 — Return Code Testing Patterns", level:"Intermediate",
      content:`Common patterns for testing return codes and controlling job flow.

Pattern 1 — Stop on First Error:
  Every step has COND=(0,NE) — only runs if all prior RCs = 0. The job short-circuits on first error.

Pattern 2 — Continue on Warning:
  Use COND=(4,LT) — skips only if prior RC < 4 (i.e., RC 0-3 are ok). Allows RC=4 warnings to proceed.

Pattern 3 — Cleanup Regardless:
  Final cleanup step has COND=EVEN — runs even if prior steps ABENDed.

Pattern 4 — IF/THEN for Modern JCL:
  IF STEP1.RC = 0 THEN → much more readable than COND.

Pattern 5 — Error Notification:
  IF STEP1.ABEND OR STEP1.RC > 8 THEN → send error notification.

💡 Best Practice: Use IF/THEN for new JCL. Understand COND for maintaining legacy code. Always include a COND=EVEN cleanup step.`,
      code:`//* Pattern: Stop on first error + cleanup
//STEP010  EXEC PGM=EXTRACT
//STEP020  EXEC PGM=VALIDATE,COND=(0,NE)
//STEP030  EXEC PGM=SORT,COND=(0,NE)
//STEP040  EXEC PGM=LOAD,COND=(0,NE)
//CLEANUP  EXEC PGM=TIDYUP,COND=EVEN
//*
//* Pattern: IF/THEN equivalent (modern)
//STEP010  EXEC PGM=EXTRACT
//         IF STEP010.RC = 0 THEN
//STEP020  EXEC PGM=VALIDATE
//         ENDIF
//         IF STEP010.RC = 0 AND STEP020.RC <= 4 THEN
//STEP030  EXEC PGM=LOAD
//         ENDIF
//*
//* Pattern: Error notification
//         IF STEP030.ABEND OR STEP030.RC > 8 THEN
//NOTIFY   EXEC PGM=IKJEFT01
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   *
  SEND 'JOB FAILED - CHECK STEP030' USER(HARI)
/*
//         ENDIF`
    },

    { title:"7.4 — JOBRC & Job-Level Return Code", level:"Intermediate",
      content:`JOBRC on the JOB statement controls what the overall job return code is.

JOBRC=MAXRC (default) — Job RC = highest RC from any executed step
JOBRC=LASTRC — Job RC = last executed step's RC
JOBRC=(STEP,stepname) — Job RC = specific step's RC

Why It Matters:
  Schedulers (CA-7, TWS, Control-M) use the job RC to determine success or failure. If your job has a high RC in a non-critical step, it might fail the schedule.

Scenario:
  STEP1 RC=0, STEP2 RC=8 (non-critical), STEP3 RC=0
  • JOBRC=MAXRC → Job RC=8 (scheduler sees failure)
  • JOBRC=LASTRC → Job RC=0 (scheduler sees success)
  • JOBRC=(STEP,STEP3) → Job RC=0

💡 Best Practice: Use MAXRC (default) unless you have a specific reason. If a step's high RC is acceptable, document why you use LASTRC.`,
      code:`//* JOBRC=MAXRC (default)
//MYJOB    JOB  (ACCT),'MAX RC',
//             CLASS=A,MSGCLASS=X,
//             JOBRC=MAXRC
//STEP1    EXEC PGM=PROG1        RC=0
//STEP2    EXEC PGM=PROG2        RC=8
//STEP3    EXEC PGM=PROG3        RC=0
//* Job RC = 8 (highest)
//*
//* JOBRC=LASTRC
//MYJOB    JOB  (ACCT),'LAST RC',
//             CLASS=A,MSGCLASS=X,
//             JOBRC=LASTRC
//* Job RC = 0 (last step)
//*
//* JOBRC=(STEP,stepname)
//MYJOB    JOB  (ACCT),'STEP RC',
//             CLASS=A,MSGCLASS=X,
//             JOBRC=(STEP,STEP3)
//* Job RC = STEP3's RC only`
    },

    { title:"7.5 — COND=EVEN & COND=ONLY", level:"Intermediate",
      content:`COND=EVEN and COND=ONLY are special values for handling ABEND scenarios.

COND=EVEN — Execute this step EVEN IF a prior step ABENDed. Without COND=EVEN, all steps after an ABEND are flushed (skipped).

COND=ONLY — Execute this step ONLY IF a prior step ABENDed. If all prior steps completed normally, this step is skipped.

Combining with RC Tests:
  COND=(EVEN,(0,NE,STEP1)) — Run even on ABEND, but only if STEP1 RC=0
  COND=(ONLY,(0,NE,STEP1)) — Run only on ABEND and only if STEP1 RC=0

Use Cases:
  • COND=EVEN: Cleanup steps (delete temp files, release resources)
  • COND=ONLY: Error notification, error recovery

IF/THEN Equivalent:
  IF STEP1.ABEND THEN → same as COND=ONLY logic
  Always use cleanup: code cleanup after ENDIF with COND=EVEN

💡 Best Practice: Every production job should have a cleanup step with COND=EVEN to handle both normal and abnormal endings.`,
      code:`//* COND=EVEN — Always cleanup
//STEP1    EXEC PGM=PROCESS
//STEP2    EXEC PGM=VALIDATE,COND=(0,NE)
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN
//DELTEMP  DD   DSN=&&WORK,DISP=(OLD,DELETE)
//*
//* COND=ONLY — Error handler
//ERRSTEP  EXEC PGM=ERRNOTFY,COND=ONLY
//ERRMSG   DD   SYSOUT=*
//*
//* IF/THEN equivalent
//STEP1    EXEC PGM=PROCESS
//         IF STEP1.ABEND THEN
//ERRHAND  EXEC PGM=ERRNOTFY
//         ELSE
//STEP2    EXEC PGM=CONTINUE
//         ENDIF
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN
//DELTEMP  DD   DSN=&&WORK,DISP=(OLD,DELETE)`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 8: JCL UTILITIES (15 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"8.1 — IEFBR14 (Do-Nothing Program)", level:"Beginner",
      content:`IEFBR14 is the simplest program on z/OS — it does absolutely nothing. It receives control and immediately returns RC=0.

So why is it useful? Because z/OS allocates all DD datasets BEFORE the program runs and deallocates them AFTER. You use IEFBR14 to create, delete, or catalog datasets using only DD statements.

Common Uses:
  • Create empty datasets: DISP=(NEW,CATLG)
  • Delete datasets: DISP=(OLD,DELETE)
  • Catalog existing datasets: DISP=(OLD,CATLG)
  • Create GDG base entries (with IDCAMS instead usually)

💡 Pro Tip: IEFBR14 is pronounced "I-E-F-B-R-fourteen" and stands for "IEF" (z/OS prefix) + "BR 14" (branch to register 14, which is the return address in Assembler).`,
      code:`//* Create an empty sequential dataset
//CREATE   EXEC PGM=IEFBR14
//NEWFILE  DD   DSN=MY.NEW.DATASET,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//*
//* Delete a dataset
//DELETE   EXEC PGM=IEFBR14
//DELDD    DD   DSN=MY.OLD.DATASET,
//             DISP=(OLD,DELETE)
//*
//* Create empty PDS
//MKPDS    EXEC PGM=IEFBR14
//NEWPDS   DD   DSN=MY.NEW.PDS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2,20),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0,DSORG=PO)`
    },

    { title:"8.2 — IEBGENER (Copy Utility)", level:"Beginner",
      content:`IEBGENER copies a sequential dataset (or PDS member) to another. It's the simplest copy utility.

DD Names:
  SYSUT1 — Input dataset
  SYSUT2 — Output dataset
  SYSPRINT — Messages
  SYSIN — Control statements (DD DUMMY for simple copy)

Uses:
  • Copy sequential dataset
  • Copy PDS member
  • Convert record formats (with control statements)
  • Print a dataset (SYSUT2 DD SYSOUT=*)

Notes:
  IEBGENER is being replaced by ICEGENER in many shops (ICEGENER is DFSORT-based and much faster). If your shop has ICEGENER aliased to IEBGENER, you're already using the faster version.

💡 Pro Tip: Use ICEGENER or REPRO (IDCAMS) for better performance. IEBGENER is simple but not optimized.`,
      code:`//* Copy a sequential dataset
//COPY     EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.SOURCE.DATA,DISP=SHR
//SYSUT2   DD   DSN=MY.TARGET.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY
//*
//* Print a dataset to SYSOUT
//PRINT    EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.DATA,DISP=SHR
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY`
    },

    { title:"8.3 — IDCAMS (Access Method Services)", level:"Intermediate",
      content:`IDCAMS is the Swiss Army knife of z/OS utilities. It manages VSAM datasets, catalogs, and performs many data operations.

DD Names:
  SYSPRINT — Messages and output
  SYSIN — Control statements (commands)

Key Commands:
  DELETE — Delete datasets or catalog entries
  DEFINE CLUSTER — Create VSAM datasets
  DEFINE GDG — Create GDG base
  REPRO — Copy data (sequential, VSAM, any-to-any)
  LISTCAT — List catalog entries
  ALTER — Modify catalog attributes
  PRINT — Print dataset contents
  VERIFY — Fix VSAM end-of-file pointer

IDCAMS Condition Codes: 0=success, 4=warning, 8=error, 12+=severe

IF-THEN-ELSE in IDCAMS:
  IDCAMS has its own conditional logic separate from JCL:
  IF LASTCC = 0 THEN DO ... END
  IF MAXCC <= 4 THEN SET MAXCC = 0

💡 Pro Tip: Use SET MAXCC=0 after expected DELETE errors (when the dataset might not exist). Prevents unnecessary COND failures.`,
      code:`//* Delete (ignore if not found)
//DELSTEP  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.OLD.DATA PURGE
  IF LASTCC = 8 THEN -
    SET MAXCC = 0
/*
//*
//* Define VSAM KSDS
//DEFVSAM  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DEFINE CLUSTER -
    (NAME(MY.VSAM.KSDS) -
     INDEXED -
     KEYS(10 0) -
     RECORDSIZE(200 200) -
     SHAREOPTIONS(2 3)) -
  DATA -
    (CYLINDERS(10 5)) -
  INDEX -
    (CYLINDERS(1 1))
/*
//*
//* REPRO (copy)
//REPRO    EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//INDD     DD   DSN=MY.SEQ.DATA,DISP=SHR
//OUTDD    DD   DSN=MY.VSAM.KSDS,DISP=SHR
//SYSIN    DD   *
  REPRO INFILE(INDD) OUTFILE(OUTDD)
/*`
    },

    { title:"8.4 — DFSORT (Sort Utility)", level:"Intermediate",
      content:`DFSORT (or SORT) is one of the most used z/OS utilities. It sorts, merges, copies, and transforms data.

DD Names:
  SORTIN — Input dataset
  SORTOUT — Output dataset
  SYSIN — Control statements
  SYSOUT — Messages
  SORTWKxx — Work files (SORTWK01-SORTWK06)

Key Control Statements:
  SORT FIELDS=(pos,len,format,order,...) — Sort specification
  INCLUDE COND=(pos,len,format,operator,value) — Filter records
  OMIT COND=(...) — Exclude records
  OUTREC FIELDS=(pos,len,...) — Reformat output
  INREC FIELDS=(...) — Reformat input before sort
  SUM FIELDS=(pos,len,format,...) — Summarize numeric fields
  OUTFIL — Multiple output files with different criteria

Format Types: CH (character), ZD (zoned decimal), PD (packed), BI (binary), FI (fixed), FL (float)
Order: A (ascending), D (descending)

💡 Pro Tip: DFSORT can replace many custom programs. Master INCLUDE, OUTREC, and OUTFIL — they can do 80% of data transformation tasks.`,
      code:`//* Basic sort
//SORT     EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A,11,5,ZD,D)
/*
//*
//* Sort with INCLUDE filter
//FILTER   EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.FILTERED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
  INCLUDE COND=(15,2,CH,EQ,C'NY')
  OUTREC FIELDS=(1,10,15,2,25,30)
/*`
    },

    { title:"8.5 — SORT: INCLUDE, OMIT & OUTREC", level:"Intermediate",
      content:`Advanced DFSORT features for filtering and reformatting data.

INCLUDE COND — Keep only matching records:
  INCLUDE COND=(1,5,CH,EQ,C'ACTIVE')
  INCLUDE COND=(10,8,ZD,GT,+1000000)
  INCLUDE COND=(1,2,CH,EQ,C'NY',OR,1,2,CH,EQ,C'CA')

OMIT COND — Remove matching records (opposite of INCLUDE):
  OMIT COND=(50,1,CH,EQ,C'D') — Remove deleted records

OUTREC FIELDS — Reformat output records:
  OUTREC FIELDS=(1,10,21,30,C' TOTAL: ',51,10)
  Can add literals, reorder fields, insert constants.

INREC FIELDS — Reformat BEFORE sorting:
  Useful when sort key needs to be constructed from multiple fields.

OPTION COPY — Copy without sorting (like IEBGENER but faster):
  When you need INCLUDE/OUTREC but don't need sorting.

💡 Pro Tip: SORT with OPTION COPY + INCLUDE + OUTREC can replace many COBOL extract programs. Much faster to write and maintain.`,
      code:`//* INCLUDE with multiple conditions
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
  INCLUDE COND=((1,2,CH,EQ,C'NY',OR,
                 1,2,CH,EQ,C'CA'),AND,
                 50,1,CH,NE,C'D')
/*
//*
//* OUTREC — reformat output
//SYSIN    DD   *
  OPTION COPY
  INCLUDE COND=(1,2,CH,EQ,C'NY')
  OUTREC FIELDS=(1,10,        ACCOUNT
                 21,30,        NAME
                 C' - ',       LITERAL
                 51,10,        BALANCE
                 80:X)         PAD TO 80
/*
//*
//* OUTFIL — multiple outputs
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//EAST     DD   DSN=MY.EAST,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE)
//WEST     DD   DSN=MY.WEST,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE)
//SYSIN    DD   *
  OPTION COPY
  OUTFIL FNAMES=EAST,INCLUDE=(1,2,CH,EQ,C'E')
  OUTFIL FNAMES=WEST,INCLUDE=(1,2,CH,EQ,C'W')
/*`
    },

    { title:"8.6 — IEBCOPY (PDS Copy/Compress)", level:"Intermediate",
      content:`IEBCOPY copies, compresses, and manages PDS and PDSE libraries.

Key Operations:
  COPY — Copy members between PDS libraries
  COMPRESS — Reclaim wasted space in a PDS (in-place)
  UNLOAD — Create a sequential backup of a PDS
  LOAD — Restore a PDS from sequential backup

DD Names:
  SYSUT1 — Input PDS (for COPY) or PDS to compress
  SYSUT2 — Output PDS (for COPY)
  SYSUT3, SYSUT4 — Work files
  SYSPRINT — Messages
  SYSIN — Control statements

💡 Pro Tip: Use COMPRESS to fix B14 ABENDs (PDS directory full). But PDSE libraries don't need compression — they manage space automatically.`,
      code:`//* Copy entire PDS
//COPYALL  EXEC PGM=IEBCOPY
//SYSPRINT DD   SYSOUT=*
//SYSUT1   DD   DSN=MY.SOURCE.PDS,DISP=SHR
//SYSUT2   DD   DSN=MY.TARGET.PDS,DISP=OLD
//SYSIN    DD   *
  COPY INDD=SYSUT1,OUTDD=SYSUT2
/*
//*
//* Copy specific members
//COPYSEL  EXEC PGM=IEBCOPY
//SYSPRINT DD   SYSOUT=*
//INLIB    DD   DSN=MY.SOURCE.PDS,DISP=SHR
//OUTLIB   DD   DSN=MY.TARGET.PDS,DISP=OLD
//SYSIN    DD   *
  COPY INDD=INLIB,OUTDD=OUTLIB
  SELECT MEMBER=(PROG1,PROG2,PROG3)
/*
//*
//* Compress a PDS in-place
//COMPR    EXEC PGM=IEBCOPY
//SYSPRINT DD   SYSOUT=*
//SYSUT1   DD   DSN=MY.PDS.LIBRARY,DISP=OLD
//SYSUT2   DD   DSN=MY.PDS.LIBRARY,DISP=OLD
//SYSIN    DD   DUMMY`
    },

    { title:"8.7 — IKJEFT01 (TSO in Batch)", level:"Intermediate",
      content:`IKJEFT01 runs TSO commands and REXX execs in batch mode. It's the bridge between interactive TSO and batch JCL.

DD Names:
  SYSTSPRT — TSO command output
  SYSTSIN — TSO commands to execute
  SYSEXEC — REXX exec library (for REXX programs)

Common Uses:
  • Run REXX programs in batch
  • Execute DB2 commands via DSN
  • Run ISPF services in batch
  • Execute TSO commands (LISTDS, LISTCAT, etc.)

DB2 via IKJEFT01:
  This is the standard way to run DB2 programs in batch — through the DSN command processor.

💡 Pro Tip: IKJEFT01 with DYNAMNBR is essential for DB2 batch. Always include DYNAMNBR on the EXEC.`,
      code:`//* Run REXX in batch
//REXX     EXEC PGM=IKJEFT01,DYNAMNBR=20
//SYSEXEC  DD   DSN=MY.REXX.LIBRARY,DISP=SHR
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   *
  %MYREXX ARG1 ARG2
/*
//*
//* Run DB2 program in batch
//DB2STEP  EXEC PGM=IKJEFT01,DYNAMNBR=50,
//             REGION=0M
//STEPLIB  DD   DSN=DB2.SDSNLOAD,DISP=SHR
//SYSTSPRT DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*
//SYSTSIN  DD   *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(MYPROG) PLAN(MYPLAN) -
      LIB('MY.LOADLIB')
  END
/*`
    },

    { title:"8.8 — IEBUPDTE (Sequential Update)", level:"Intermediate",
      content:`IEBUPDTE modifies sequential datasets or PDS members in place. It can add, replace, or delete records.

Uses:
  • Apply fixes/patches to source code members
  • Create multiple PDS members from sequential input
  • Insert or replace records in a dataset

Control Statements:
  ./ ADD NAME=member — Create new PDS member
  ./ REPL NAME=member — Replace existing member
  ./ CHANGE NAME=member — Modify specific records
  ./ ENDUP — End of updates

DD Names:
  SYSUT1 — Input (existing PDS or sequential)
  SYSUT2 — Output (updated PDS or sequential)
  SYSIN — Control statements + data
  SYSPRINT — Messages

💡 Pro Tip: IEBUPDTE is powerful but less commonly used today. Most shops use ISPF edit or source control systems instead.`,
      code:`//* Create PDS members from in-stream data
//UPDATE   EXEC PGM=IEBUPDTE,PARM=NEW
//SYSUT2   DD   DSN=MY.SOURCE.PDS,DISP=OLD
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
./ ADD NAME=MEMBER1
This is the content of MEMBER1
Line 2 of MEMBER1
./ ADD NAME=MEMBER2
This is MEMBER2 content
Another line
./ ENDUP
/*`
    },

    { title:"8.9 — ADRDSSU (Dump/Restore)", level:"Advanced",
      content:`ADRDSSU (Data Facility Storage Management Subsystem - DFSMSdss) dumps, restores, copies, and moves datasets at the physical level. It's the primary backup/restore utility.

Operations:
  DUMP — Back up datasets to a dump file
  RESTORE — Restore from a dump file
  COPY — Physical copy (including VSAM)
  PRINT — Print dump dataset contents

Advantages over IEBCOPY/IEBGENER:
  • Can copy VSAM datasets
  • Physical copy is faster for large datasets
  • Handles multi-volume datasets
  • Supports compression
  • Can rename during copy/restore

💡 Pro Tip: ADRDSSU DUMP is the standard for dataset backups. Include it in your disaster recovery procedures.`,
      code:`//* DUMP datasets to backup
//DUMP     EXEC PGM=ADRDSSU
//SYSPRINT DD   SYSOUT=*
//DASD     DD   DISP=OLD,UNIT=SYSDA,VOL=SER=PROD01
//TAPE     DD   DSN=BACKUP.PROD.DATA,
//             DISP=(NEW,CATLG),UNIT=TAPE
//SYSIN    DD   *
  DUMP DATASET( -
    INCLUDE(PROD.PAY.**) -
  ) -
  OUTDDNAME(TAPE) -
  COMPRESS
/*
//*
//* RESTORE from backup
//RESTORE  EXEC PGM=ADRDSSU
//SYSPRINT DD   SYSOUT=*
//TAPE     DD   DSN=BACKUP.PROD.DATA,DISP=SHR
//SYSIN    DD   *
  RESTORE DATASET( -
    INCLUDE(PROD.PAY.**) -
  ) -
  INDDNAME(TAPE) -
  REPLACE
/*`
    },

    { title:"8.10 — SORT Work Files & Performance", level:"Intermediate",
      content:`DFSORT uses temporary work files (SORTWKxx) for large sorts. Proper configuration ensures good performance.

When Work Files are Needed:
  • Sort data exceeds available memory
  • DFSORT spills intermediate data to disk
  • Not needed for small sorts or OPTION COPY

SORTWKxx DDs:
  SORTWK01 through SORTWK06. More work files = more parallelism. Typically 3 is sufficient.

Sizing: Each work file should be approximately 2x the input data size divided by the number of work files. Over-allocate with RLSE.

DFSORT can also use dynamic work files (no SORTWKxx DDs needed) if your site is configured for it. Check with your systems programmer.

Performance Tips:
  • Use HIPROC/DFSORT options for memory-based sorting
  • More SORTWKxx files on different volumes = better parallelism
  • OPTION EQUALS preserves input order for equal keys (slight overhead)

💡 Pro Tip: Most modern shops configure DFSORT for dynamic work files. You may not need SORTWKxx DDs at all.`,
      code:`//* Sort with explicit work files
//BIGSORT  EXEC PGM=SORT,REGION=256M
//SORTIN   DD   DSN=MY.LARGE.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.LARGE.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(500,100),RLSE)
//SORTWK01 DD   SPACE=(CYL,(200,50)),UNIT=SYSDA
//SORTWK02 DD   SPACE=(CYL,(200,50)),UNIT=SYSDA
//SORTWK03 DD   SPACE=(CYL,(200,50)),UNIT=SYSDA
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  SORT FIELDS=(1,20,CH,A)
  OPTION EQUALS
/*`
    },

    { title:"8.11 — SORT: OUTFIL & Multiple Outputs", level:"Intermediate",
      content:`OUTFIL lets you write to multiple output files from a single sort pass. This eliminates multiple passes over the same input.

OUTFIL FNAMES=ddname — Route records to a specific DD
  Can include its own INCLUDE, OUTREC, and other options per output file.

OUTFIL Features:
  • INCLUDE/OMIT — Filter per output
  • OUTREC — Reformat per output
  • HEADER1/TRAILER1 — Add headers/trailers per output
  • SECTIONS — Create report sections
  • REMOVECC — Remove carriage control

Practical Example: Split a transaction file into region-specific files, each with its own format and headers.

💡 Pro Tip: OUTFIL with SECTIONS and HEADER1/TRAILER1 can generate formatted reports, replacing many COBOL report programs.`,
      code:`//* Split input into multiple outputs
//SPLIT    EXEC PGM=SORT
//SORTIN   DD   DSN=MY.TRANS.DATA,DISP=SHR
//EAST     DD   DSN=MY.EAST.TRANS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE)
//WEST     DD   DSN=MY.WEST.TRANS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE)
//ERRORS   DD   DSN=MY.ERROR.TRANS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(1,1),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  OPTION COPY
  OUTFIL FNAMES=EAST,
    INCLUDE=(1,2,CH,EQ,C'E'),
    OUTREC=(1,10,21,30,51,10)
  OUTFIL FNAMES=WEST,
    INCLUDE=(1,2,CH,EQ,C'W'),
    OUTREC=(1,10,21,30,51,10)
  OUTFIL FNAMES=ERRORS,
    INCLUDE=(80,1,CH,EQ,C'X')
/*`
    },

    { title:"8.12 — ICETOOL (DFSORT Batch Tool)", level:"Advanced",
      content:`ICETOOL extends DFSORT's capabilities with operations that would otherwise need custom programs.

Key Operations:
  SORT — Sort with full DFSORT control
  COPY — Copy with transformation
  SELECT — Select unique/duplicate records
  UNIQUE — Remove duplicates
  COUNT — Count records
  STATS — Calculate statistics (MIN, MAX, AVG, TOT)
  RANGE — Find records within ranges
  VERIFY — Check sort order
  DISPLAY — Create formatted reports

DD Names:
  TOOLMSG — ICETOOL messages
  DFSMSG — DFSORT messages
  Other DDs as referenced in control statements

💡 Pro Tip: ICETOOL SELECT with FIRST/LAST is incredibly useful for finding duplicates or getting unique records.`,
      code:`//* ICETOOL — Count records
//TOOL     EXEC PGM=ICETOOL
//TOOLMSG  DD   SYSOUT=*
//DFSMSG   DD   SYSOUT=*
//INDD     DD   DSN=MY.INPUT.DATA,DISP=SHR
//SYSIN    DD   *
  COUNT FROM(INDD)
/*
//*
//* ICETOOL — Statistics
//TOOL     EXEC PGM=ICETOOL
//TOOLMSG  DD   SYSOUT=*
//DFSMSG   DD   SYSOUT=*
//INDD     DD   DSN=MY.TRANS.DATA,DISP=SHR
//SYSIN    DD   *
  STATS FROM(INDD) ON(51,10,ZD)
/*
//*
//* ICETOOL — Select unique records
//TOOL     EXEC PGM=ICETOOL
//TOOLMSG  DD   SYSOUT=*
//DFSMSG   DD   SYSOUT=*
//INDD     DD   DSN=MY.INPUT,DISP=SHR
//OUTDD    DD   DSN=MY.UNIQUE,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE)
//SYSIN    DD   *
  SELECT FROM(INDD) TO(OUTDD) ON(1,10,CH) FIRST
/*`
    },

    { title:"8.13 — IEBPTPCH (Print/Punch)", level:"Beginner",
      content:`IEBPTPCH prints or punches (creates 80-byte records) from sequential datasets or PDS members.

DD Names:
  SYSUT1 — Input dataset
  SYSUT2 — Output (SYSOUT for print, dataset for punch)
  SYSPRINT — Utility messages
  SYSIN — Control statements

Common Uses:
  • Print datasets in hexadecimal format (for debugging)
  • Print PDS member directories
  • Convert data to printable format
  • Quick dataset content dump

💡 Pro Tip: For quick hex dumps, IEBPTPCH with TYPORG=PS,MAXFLDS=1 is simpler than writing a program.`,
      code:`//* Print dataset in hex
//HEXDUMP  EXEC PGM=IEBPTPCH
//SYSUT1   DD   DSN=MY.DATA,DISP=SHR
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  PRINT TYPORG=PS,MAXFLDS=1,TOTCONV=XE
  RECORD FIELD=(80)
/*
//*
//* Print dataset (character)
//CHARPRNT EXEC PGM=IEBPTPCH
//SYSUT1   DD   DSN=MY.DATA,DISP=SHR
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  PRINT TYPORG=PS,MAXFLDS=1
  RECORD FIELD=(80)
/*`
    },

    { title:"8.14 — Common Utility Reference", level:"Intermediate",
      content:`Quick reference for z/OS utilities you'll encounter regularly.

Data Utilities:
  • IEBGENER — Copy sequential datasets
  • IEBCOPY — Copy/compress PDS
  • IEBUPDTE — Update sequential/PDS members
  • IEBPTPCH — Print/punch utility
  • IEBCOMPR — Compare datasets
  • IDCAMS — VSAM/catalog management
  • DFSORT — Sort, merge, filter, transform

System Utilities:
  • IEFBR14 — Do nothing (create/delete datasets)
  • IKJEFT01 — TSO in batch
  • ADRDSSU — Dump/restore/copy datasets
  • IEHPROGM — Scratch/rename datasets (legacy)
  • IEHLIST — List VTOC/PDS directories

DB2 Utilities:
  • DSNTEP2 — Dynamic SQL in batch
  • DSNTIAD — Static SQL in batch
  • DSNUPROC — DB2 utility PROC (LOAD, UNLOAD, REORG, etc.)

💡 Pro Tip: Keep a cheat sheet of utility DD names. Each utility has its own required DDs, and a missing DD causes an ABEND.`,
      code:`//* Quick Reference: Common Utility DD Names
//*
//* IEBGENER:  SYSUT1(in) SYSUT2(out) SYSPRINT SYSIN
//* IEBCOPY:   SYSUT1(in) SYSUT2(out) SYSUT3 SYSUT4
//*            SYSPRINT SYSIN
//* IDCAMS:    SYSPRINT SYSIN + custom DDs
//* DFSORT:    SORTIN SORTOUT SORTWKxx SYSOUT SYSIN
//* IKJEFT01:  SYSTSPRT SYSTSIN SYSEXEC
//* IEFBR14:   (just DD statements for create/delete)
//* ADRDSSU:   SYSPRINT SYSIN + custom DDs
//* IEBPTPCH:  SYSUT1(in) SYSUT2(out) SYSPRINT SYSIN`
    },

    { title:"8.15 — File-AID & Other Vendor Utilities", level:"Intermediate",
      content:`Beyond IBM utilities, many shops use vendor products for data management.

File-AID (BMC):
  Powerful file browsing, editing, copying, and comparison tool. Runs as PGM=FILEAID with control statements. Can handle VSAM, DB2, IMS, sequential files.

SYNCSORT:
  Alternative to DFSORT. Compatible syntax but may have additional features. Most JCL works with either.

CA-IDMS/DB2 Utilities:
  Vendor-specific utilities for database management.

SAS on z/OS:
  Statistical analysis and data manipulation. Runs in batch with PGM=SAS.

Abend-AID (BMC):
  Provides enhanced ABEND debugging information in job output.

Expeditor/XPEDITER:
  Interactive and batch debugging tools for COBOL/Assembler.

💡 Pro Tip: Know which vendor tools your shop uses. They often replace multiple IBM utilities with a single, more powerful tool.`,
      code:`//* File-AID example (BMC)
//FILECOPY EXEC PGM=FILEAID
//SYSPRINT DD   SYSOUT=*
//DD01     DD   DSN=MY.INPUT.DATA,DISP=SHR
//DD01O    DD   DSN=MY.OUTPUT.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSIN    DD   *
$$DD01 COPY
/*`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 9: ADVANCED JCL (10 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"9.1 — Multi-Step Job Design", level:"Advanced",
      content:`Production jobs typically have multiple steps that work together. Good design ensures reliability, restartability, and maintainability.

Design Principles:
  1. Each step should do ONE thing well
  2. Use meaningful step names (EXTRACT, SORT, LOAD)
  3. Create temp datasets between steps (&&name)
  4. Include cleanup step with COND=EVEN
  5. Document restart points
  6. Test with TYPRUN=SCAN first

Common Patterns:
  • Extract-Transform-Load (ETL): EXTRACT → SORT → VALIDATE → LOAD
  • Compile-Link-Go: COMPILE → LNKEDIT → GORUN
  • Backup-Process-Verify: BACKUP → PROCESS → VERIFY → CLEANUP

Step Dependencies:
  Use IF/THEN/ELSE or COND to control flow based on prior step results.

💡 Best Practice: Design every job to be restartable from any step. This means each step should be idempotent or have proper cleanup.`,
      code:`//* ETL Job Pattern
//ETLJOB   JOB  (ACCT),'ETL DAILY',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),NOTIFY=&SYSUID
//*
//STEP010  EXEC PGM=EXTRACT
//INPUT    DD   DSN=PROD.TRANS.DATA,DISP=SHR
//OUTPUT   DD   DSN=&&EXTRACT,DISP=(NEW,PASS),
//             SPACE=(CYL,(50,20),RLSE)
//*
//         IF STEP010.RC = 0 THEN
//STEP020  EXEC PGM=SORT
//SORTIN   DD   DSN=&&EXTRACT,DISP=(OLD,PASS)
//SORTOUT  DD   DSN=&&SORTED,DISP=(NEW,PASS),
//             SPACE=(CYL,(50,20),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//         ENDIF
//*
//         IF STEP010.RC = 0 AND STEP020.RC = 0 THEN
//STEP030  EXEC PGM=VALIDATE
//INPUT    DD   DSN=&&SORTED,DISP=(OLD,DELETE)
//GOOD     DD   DSN=&&VALID,DISP=(NEW,PASS),
//             SPACE=(CYL,(40,10),RLSE)
//BAD      DD   DSN=PROD.REJECT.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE)
//         ENDIF
//*
//         IF STEP030.RC = 0 THEN
//STEP040  EXEC PGM=DBLOAD
//INPUT    DD   DSN=&&VALID,DISP=(OLD,DELETE)
//         ENDIF
//*
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN`
    },

    { title:"9.2 — Symbolic Parameters & SET", level:"Intermediate",
      content:`SET defines symbolic parameters outside PROCs, making regular JCL dynamic and environment-aware.

Syntax: // SET SYMBOL=value

Common Patterns:
  Environment-based: SET ENV=PROD, SET ENV=TEST
  Date-based: SET RUNDATE=20260316
  HLQ-based: SET HLQ=PAY.PROD

System Symbols:
  • &SYSUID — Current user ID
  • &SYSNAME — System name (LPAR)
  • &SYSLYYMMDD — System date
  • &SYSJOBNAME — Current job name

Rules:
  • SET must appear after JOB, before first use of the symbol
  • Multiple SET statements allowed
  • Later SET overrides earlier SET for same symbol
  • Double dot after symbol in DSN: &HLQ..DATA

💡 Pro Tip: Use SET to create environment-independent JCL. One JCL with SET ENV=PROD or SET ENV=TEST.`,
      code:`//* Environment-based JCL
//MYJOB    JOB  (ACCT),'DYNAMIC JCL',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*
//         SET ENV=PROD
//         SET HLQ=PAY
//         SET SUFF=DAILY
//*
//STEP1    EXEC PGM=EXTRACT
//INPUT    DD   DSN=&HLQ..&ENV..MASTER,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..&ENV..&SUFF..EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//*
//* To switch to TEST: just change SET ENV=TEST
//* All DSNs automatically adjust:
//*   PAY.PROD.MASTER → PAY.TEST.MASTER
//*   PAY.PROD.DAILY.EXTRACT → PAY.TEST.DAILY.EXTRACT`
    },

    { title:"9.3 — Referbacks", level:"Intermediate",
      content:`Referbacks let you reference attributes from another DD statement, avoiding repetition and ensuring consistency.

DSN Referback: DSN=*.stepname.ddname — Use same dataset name
DCB Referback: DCB=*.stepname.ddname — Copy DCB attributes
VOL Referback: VOL=REF=*.stepname.ddname — Use same volume

For PROCs: DSN=*.stepname.procstep.ddname

Rules:
  • The referenced DD must appear earlier in the JCL
  • Referback resolves at allocation time
  • Can't referback to a DUMMY or SYSOUT DD for DSN

💡 Pro Tip: DSN referback is the most common. Use it when multiple steps need the same dataset — change the name in one place.`,
      code:`//* DSN Referback
//STEP1    EXEC PGM=PROG1
//OUTPUT   DD   DSN=MY.LONG.DATASET.NAME.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//*
//STEP2    EXEC PGM=PROG2
//INPUT    DD   DSN=*.STEP1.OUTPUT,DISP=SHR
//*
//* DCB Referback
//STEP3    EXEC PGM=PROG3
//OUTPUT   DD   DSN=MY.NEW.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             DCB=*.STEP1.OUTPUT,
//             SPACE=(CYL,(10,5),RLSE)`
    },

    { title:"9.4 — OUTPUT Statement", level:"Intermediate",
      content:`The OUTPUT JCL statement provides centralized control over SYSOUT processing — where it goes, how many copies, what forms to use.

Syntax: //name OUTPUT parameters

Key Parameters:
  DEST — Destination printer/node
  COPIES — Number of copies
  FORMS — Forms name (paper type)
  CLASS — Output class
  DEFAULT=YES — Apply to all SYSOUT DDs without explicit OUTPUT reference

Referencing OUTPUT from DD:
  //REPORT DD SYSOUT=*,OUTPUT=*.outname

Benefits: Define output characteristics once, reference from multiple DDs. Change destination in one place.

💡 Pro Tip: Use OUTPUT with DEFAULT=YES for consistent output routing across all SYSOUT DDs in the job.`,
      code:`//* OUTPUT statement with DD reference
//MYJOB    JOB  (ACCT),'OUTPUT DEMO'
//*
//RPTOUT   OUTPUT DEST=PRINTER1,COPIES=3,FORMS=STD
//LOGOUT   OUTPUT DEST=LOCAL,CLASS=X
//*
//STEP1    EXEC PGM=RPTPROG
//REPORT   DD   SYSOUT=*,OUTPUT=*.RPTOUT
//SUMMARY  DD   SYSOUT=*,OUTPUT=*.RPTOUT
//LOGFILE  DD   SYSOUT=*,OUTPUT=*.LOGOUT
//SYSPRINT DD   SYSOUT=*
//*
//* DEFAULT=YES — applies to all SYSOUT
//DEFOUT   OUTPUT DEFAULT=YES,DEST=MYNODE,CLASS=A
//STEP1    EXEC PGM=MYPROG
//SYSPRINT DD   SYSOUT=*
//SYSOUT   DD   SYSOUT=*`
    },

    { title:"9.5 — DFSORT Advanced: JOINKEYS", level:"Advanced",
      content:`JOINKEYS matches records from two input files based on a common key — like a SQL JOIN but in DFSORT.

Types of Joins:
  • Inner Join (default) — Only matching records
  • Full Outer — All records from both files
  • Left Outer — All from F1, matching from F2
  • Right Outer — All from F2, matching from F1

DD Names:
  SORTJNF1 — First input file
  SORTJNF2 — Second input file
  SORTOUT — Output (or OUTFIL)
  SYSIN — Control statements

💡 Pro Tip: JOINKEYS can replace many COBOL match-merge programs. It's simpler and much faster.`,
      code:`//* JOINKEYS — Match two files
//JOIN     EXEC PGM=SORT
//SORTJNF1 DD   DSN=MY.MASTER.FILE,DISP=SHR
//SORTJNF2 DD   DSN=MY.TRANS.FILE,DISP=SHR
//SORTOUT  DD   DSN=MY.MATCHED.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  JOINKEYS FILE=F1,FIELDS=(1,10,A)
  JOINKEYS FILE=F2,FIELDS=(1,10,A)
  JOIN UNPAIRED,F1,F2
  REFORMAT FIELDS=(F1:1,80,F2:11,40)
/*`
    },

    { title:"9.6 — SMS (Storage Management)", level:"Advanced",
      content:`SMS (Storage Management Subsystem) automates storage management. Instead of specifying UNIT/VOL, you specify classes and let SMS decide.

SMS Classes:
  STORCLAS — Storage Class: WHERE to store (performance, availability)
  MGMTCLAS — Management Class: HOW LONG to keep (expiration, migration)
  DATACLAS — Data Class: WHAT attributes (DCB, SPACE defaults)

Benefits:
  • No need to know volume names or device types
  • Automatic space management and migration
  • Consistent policies across the enterprise
  • Simplified JCL

SMS-Managed JCL:
  If your site is SMS-managed, UNIT and VOL are usually unnecessary. SMS assigns them based on storage class rules.

💡 Pro Tip: Ask your storage admin what STORCLAS/MGMTCLAS/DATACLAS to use. It varies by installation.`,
      code:`//* SMS-managed dataset
//OUTPUT   DD   DSN=MY.SMS.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             STORCLAS=STANDARD,
//             MGMTCLAS=DAILY,
//             DATACLAS=DCFB80,
//             SPACE=(CYL,(10,5),RLSE)
//*
//* Without SMS (old style)
//OUTPUT   DD   DSN=MY.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=SYSDA,
//             VOL=SER=PROD01,
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)`
    },

    { title:"9.7 — JCL for DB2 Programs", level:"Intermediate",
      content:`Running DB2 programs in batch requires specific JCL patterns using IKJEFT01 (TSO in batch) or the DSN command.

Standard Pattern:
  1. EXEC PGM=IKJEFT01 with DYNAMNBR
  2. STEPLIB pointing to DB2 load library
  3. SYSTSPRT/SYSPRINT for output
  4. SYSTSIN with DSN commands

DSN Command Syntax:
  DSN SYSTEM(subsystem-name)
  RUN PROGRAM(program) PLAN(plan) LIB('load.library')
  END

DB2 Bind:
  Before running, the program must be bound (BIND PLAN or BIND PACKAGE). This connects the program's SQL to the DB2 subsystem.

💡 Pro Tip: Always include SYSUDUMP DD SYSOUT=* for DB2 batch — it provides critical diagnostic info on ABEND.`,
      code:`//* DB2 batch program execution
//DB2JOB   JOB  (ACCT),'DB2 BATCH',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//DB2STEP  EXEC PGM=IKJEFT01,
//             DYNAMNBR=50,REGION=0M
//STEPLIB  DD   DSN=DB2.SDSNLOAD,DISP=SHR
//         DD   DSN=MY.LOADLIB,DISP=SHR
//SYSPRINT DD   SYSOUT=*
//SYSTSPRT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*
//SYSTSIN  DD   *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(PAYUPD01) -
      PLAN(PAYPLAN) -
      LIB('MY.PROD.LOADLIB')
  END
/*`
    },

    { title:"9.8 — JCL for COBOL Compile & Run", level:"Intermediate",
      content:`Compiling and running COBOL programs involves multiple steps: precompile (if DB2), compile, link-edit, and execute.

Simple Compile-Link-Go:
  Use IBM PROC IGYWCLG (or IGYWCL for compile-link only).

Manual Steps:
  1. COMPILE: PGM=IGYCRCTL (Enterprise COBOL compiler)
  2. LINK: PGM=IEWL (Linkage Editor)
  3. GO: PGM=your-program

Key Compiler Options (PARM):
  LIB — Enable COPY statement processing
  LIST — Generate object listing
  MAP — Generate data map
  RENT — Reentrant code
  OPT(2) — Optimization level 2
  TEST — Generate debug info

💡 Pro Tip: For production, use OPT(2),RENT. For debugging, use TEST,LIST,MAP,NOOPT.`,
      code:`//* COBOL Compile-Link-Go (using PROC)
//COBRUN   JOB  (ACCT),'COBOL CLG',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//         JCLLIB ORDER=(SYS1.PROCLIB)
//*
//CLG      EXEC IGYWCLG,
//             PARM.COBOL='LIB,LIST,MAP,RENT,OPT(2)'
//*
//* Source input
//CLG.COBOL.SYSIN DD DSN=MY.SOURCE(MYPROG),DISP=SHR
//*
//* Copybook libraries
//CLG.COBOL.SYSLIB DD DSN=MY.COPYLIB,DISP=SHR
//                 DD DSN=SYS1.COPYLIB,DISP=SHR
//*
//* Load module output
//CLG.LKED.SYSLMOD DD DSN=MY.LOADLIB(MYPROG),DISP=SHR
//*
//* Runtime DDs
//CLG.GO.INPUT  DD DSN=MY.TEST.DATA,DISP=SHR
//CLG.GO.OUTPUT DD SYSOUT=*`
    },

    { title:"9.9 — Tape Processing", level:"Advanced",
      content:`While disk is dominant, tape is still used for backups, archives, and large data transfers.

Tape Parameters:
  UNIT=TAPE or UNIT=3490 or UNIT=3590
  VOL=SER=tapevolume
  LABEL=(seq,SL) — Standard labeled, sequence number
  EXPDT=yyyyddd — Expiration date
  RETPD=days — Retention period

Multi-file Tapes:
  LABEL=(1,SL) — First file on tape
  LABEL=(2,SL) — Second file on tape

Tape Management Systems:
  Most shops use CA-1 (TLMS), DFSMSrmm, or similar to manage tape volumes automatically. You may not need to specify volume serials.

💡 Pro Tip: Tape processing is declining but still appears in interviews. Know the basics of LABEL and multi-file tape concepts.`,
      code:`//* Write to tape
//TAPE     EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.DISK.DATA,DISP=SHR
//SYSUT2   DD   DSN=MY.TAPE.BACKUP,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=TAPE,
//             LABEL=(1,SL),
//             RETPD=30
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY
//*
//* Read from tape
//READTAPE EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.TAPE.BACKUP,
//             DISP=OLD,
//             UNIT=TAPE,
//             VOL=SER=TAP001
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY`
    },

    { title:"9.10 — Performance Tuning JCL", level:"Advanced",
      content:`JCL choices significantly impact job performance. These tips can cut runtime dramatically.

SPACE: Over-allocate slightly with RLSE. SB37 restarts are expensive.

BLKSIZE: Use BLKSIZE=0 (system-optimal) or large blocks (27920 for FB80). Larger blocks = fewer I/O operations.

BUFNO: Increase buffer count for sequential I/O: DCB=(BUFNO=20). More buffers = more read-ahead.

SORT Work Files: Use multiple SORTWKxx on different volumes. Use UNIT=VIO for small sorts.

REGION: Don't over-restrict. REGION=0M lets the program use what it needs.

Temporary Datasets: Use UNIT=VIO for &&TEMP files. Memory-based I/O is orders of magnitude faster.

Concatenation Order: Put most-likely datasets first in STEPLIB concatenation.

DISP=SHR vs OLD: SHR allows concurrent access. Only use OLD when exclusive access is required.

💡 Pro Tip: The biggest performance wins come from BLKSIZE optimization and SORT tuning. A bad BLKSIZE can make a job 10x slower.`,
      code:`//* Optimized JCL
//OPTJOB   JOB  (ACCT),'OPTIMIZED',
//             CLASS=A,MSGCLASS=X,
//             REGION=0M
//*
//STEP1    EXEC PGM=EXTRACT
//* Large block size for fast I/O
//INPUT    DD   DSN=PROD.BIG.DATA,DISP=SHR,
//             DCB=BUFNO=20
//* VIO temp for speed
//OUTPUT   DD   DSN=&&EXTRACT,DISP=(NEW,PASS),
//             UNIT=VIO,
//             SPACE=(CYL,(50,20),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=27800)
//*
//STEP2    EXEC PGM=SORT,REGION=256M
//SORTIN   DD   DSN=&&EXTRACT,DISP=(OLD,DELETE)
//SORTOUT  DD   DSN=PROD.SORTED.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(100,50),RLSE)
//* Multiple work files on different volumes
//SORTWK01 DD   SPACE=(CYL,(100)),UNIT=SYSDA
//SORTWK02 DD   SPACE=(CYL,(100)),UNIT=SYSDA
//SORTWK03 DD   SPACE=(CYL,(100)),UNIT=SYSDA
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 10: REAL-WORLD JCL (7 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"10.1 — Production Job Template", level:"Intermediate",
      content:`A standardized production job template ensures consistency across all jobs in your shop.

Template Components:
  1. Job header with documentation block
  2. JOB statement with standard parameters
  3. JCLLIB for PROC/INCLUDE libraries
  4. SET for environment variables
  5. Processing steps with IF/THEN flow control
  6. Error notification step
  7. Cleanup step with COND=EVEN
  8. Footer comments

Every production job should be: Documented, Restartable, Monitored (NOTIFY), Cleaned up (COND=EVEN), and Tested (TYPRUN=SCAN first).

💡 Best Practice: Create a template and enforce it via code review. Consistency saves hours during production incidents.`,
      code:`//*============================================================*
//*  JOB:     PAYMON01                                         *
//*  SYSTEM:  Payroll                                          *
//*  PURPOSE: Monthly payroll extract and load                 *
//*  SCHEDULE: Monthly, 1st business day, after PAYDLY99       *
//*  CONTACT:  HARIKRISHNAN K (x1234)                          *
//*  RESTART:  STEP020 — delete EXTRACT first                  *
//*============================================================*
//PAYMON01 JOB  (PAY,DEPT01),
//             'PAYROLL MONTHLY',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M,
//             TIME=60
//         JCLLIB ORDER=(PAY.PROD.PROCLIB)
//         SET ENV=PROD
//         SET HLQ=PAY.&ENV
//*
//STEP010  EXEC PGM=PAYEXT01
//STEPLIB  DD   DSN=&HLQ..LOADLIB,DISP=SHR
//INPUT    DD   DSN=&HLQ..MASTER,DISP=SHR
//OUTPUT   DD   DSN=&&EXTRACT,DISP=(NEW,PASS),
//             SPACE=(CYL,(50,20),RLSE)
//SYSPRINT DD   SYSOUT=*
//*
//         IF STEP010.RC = 0 THEN
//STEP020  EXEC PGM=SORT
//SORTIN   DD   DSN=&&EXTRACT,DISP=(OLD,DELETE)
//SORTOUT  DD   DSN=&HLQ..MONTHLY.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(50,20),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  SORT FIELDS=(1,8,CH,A,9,6,PD,A)
/*
//         ENDIF
//*
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN`
    },

    { title:"10.2 — Restart & Recovery", level:"Advanced",
      content:`When production jobs fail, you need a clear restart procedure to get back on track quickly.

Restart Strategy:
  1. Identify the failed step from SDSF output
  2. Determine root cause (JESYSMSG, SYSPRINT, dumps)
  3. Fix the problem (data, space, program, authorization)
  4. Determine restart point
  5. Clean up partial output from the failed step
  6. Add RESTART= to JOB statement
  7. Submit and monitor

Restartable Design:
  • Use DISP=(MOD,...) for append operations
  • Delete and recreate output datasets in each step
  • Use IF/THEN to handle partial completions
  • Include a pre-cleanup step for each major output

Common Restart Scenarios:
  S0C7 — Fix data, restart from failed step
  SB37 — Increase SPACE, restart from failed step
  S806 — Fix STEPLIB, restart from failed step
  NOT CATLG 2 — Delete existing dataset, restart

💡 Best Practice: Document restart instructions in every job's header comments. Include which datasets to delete and which step to restart from.`,
      code:`//* Restart procedure example
//*
//* Normal run:
//MYJOB    JOB  (ACCT),'NORMAL RUN',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*
//* Restart from STEP030 (after cleanup):
//MYJOB    JOB  (ACCT),'RESTARTED',
//             CLASS=A,MSGCLASS=X,
//             RESTART=STEP030,
//             NOTIFY=&SYSUID
//*
//* Pre-cleanup for restart (delete partial output)
//PRECLEAN EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.STEP030.OUTPUT PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//*
//STEP030  EXEC PGM=MYPROG
//OUTPUT   DD   DSN=MY.STEP030.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,10),RLSE)`
    },

    { title:"10.3 — Common JCL Errors & Fixes", level:"Beginner",
      content:`Quick reference for the most common JCL errors and how to fix them.

JCL ERRORS (caught during conversion):
  • IEFC001I: MISPLACED DD — DD before EXEC, wrong order
  • IEFC002I: INVALID CHARACTER — Typo in statement
  • IEFC003I: UNBALANCED QUOTES — Missing closing quote
  • IEFC621I: DUPLICATE NAME — Same step or DD name used twice
  • IEFC630I: UNRECOGNIZED KEYWORD — Misspelled parameter

ALLOCATION ERRORS:
  • NOT CATLG 2 — Dataset already exists. Delete first or use DISP=MOD
  • NOT FOUND — Dataset doesn't exist. Check DSN spelling
  • IEF212I: DATASET NOT FOUND — Catalog entry missing

ABEND CODES:
  • S0C7 — Data exception (bad packed decimal data)
  • S0C4 — Protection exception (memory access violation)
  • S806 — Program not found (check STEPLIB)
  • S913 — Security violation (no RACF access)
  • SB37 — Out of space (increase SPACE parameter)
  • S322 — CPU time exceeded (increase TIME)
  • S222 — Job cancelled by operator

💡 Pro Tip: When you see an error, check JESYSMSG FIRST — it shows allocation details and the exact point of failure.`,
      code:`//* Fix NOT CATLG 2: Delete before recreate
//CLEANUP  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.OUTPUT.DATA PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//STEP1    EXEC PGM=MYPROG
//OUTPUT   DD   DSN=MY.OUTPUT.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//*
//* Fix S806: Check STEPLIB
//STEP2    EXEC PGM=MYPROG
//STEPLIB  DD   DSN=MY.CORRECT.LOADLIB,DISP=SHR
//*
//* Fix SB37: Increase SPACE
//BIGOUT   DD   DSN=MY.BIG.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(100,50),RLSE),
//             UNIT=(SYSDA,2)`
    },

    { title:"10.4 — JCL for Batch Scheduling", level:"Intermediate",
      content:`Production jobs are scheduled by automation tools, not submitted manually. Understanding scheduling integration is essential.

Common Schedulers: CA-7 (Broadcom), TWS (IBM Tivoli), Control-M (BMC), ESP (Cybermation)

How Schedulers Use JCL:
  • Submit jobs at scheduled times
  • Monitor return codes for success/failure
  • Trigger dependent jobs based on completion
  • Handle restarts automatically
  • Override JCL parameters (CLASS, TIME, etc.)

JCL Considerations for Scheduling:
  • NOTIFY — Scheduler user ID or suppress
  • CLASS — May be overridden by scheduler
  • COND/IF — Scheduler reads job RC, not step RCs
  • JOBRC — Controls what RC scheduler sees
  • TYPRUN — Never use in scheduled JCL (prevents execution)

Scheduler-Specific JCL:
  Some schedulers insert their own JECL or JCL. CA-7 may add /*JOBPARM. Control-M uses %%TAG variables.

💡 Pro Tip: Test scheduling JCL by submitting manually with the scheduler's USER/GROUP first. Verify RACF access and all dataset authorities.`,
      code:`//* Production scheduled job
//PAYMON01 JOB  (PAY,DEPT01),
//             'PAYROLL MONTHLY',
//             CLASS=A,
//             MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=OPSUSER,
//             REGION=0M,
//             TIME=120,
//             JOBRC=MAXRC
//*
//* Scheduler sees JOBRC to determine success
//* RC=0: trigger next job in chain
//* RC>0: alert operations team
//* ABEND: page on-call support`
    },

    { title:"10.5 — Debugging JCL Problems", level:"Intermediate",
      content:`Systematic debugging saves hours. Follow this checklist for any JCL failure.

Step 1 — Check JESMSGLG:
  Job start/end messages, NOTIFY status, job-level return code.

Step 2 — Check JESJCL:
  See the JCL as JES interpreted it. With MSGLEVEL=(1,1), shows PROC expansion. Look for unexpected substitutions.

Step 3 — Check JESYSMSG:
  Every dataset allocation and deallocation. Shows exactly which datasets were found/not found, which volumes were used, and where space was allocated.

Step 4 — Check SYSPRINT:
  Program-specific output. Error messages, processing counts, diagnostic info.

Step 5 — Check Dumps (if ABEND):
  SYSUDUMP, SYSABEND, or CEEDUMP. Shows register contents, PSW, storage at time of failure.

Common Debugging Tips:
  • IEF285I — Shows DISP applied to each dataset
  • IEF236I — Allocation details (volume, device)
  • IEC141I — I/O error details
  • IGD messages — SMS-related issues

💡 Pro Tip: When debugging, use MSGLEVEL=(1,1) and add SYSUDUMP DD SYSOUT=* to every step. The extra output is invaluable.`,
      code:`//* Debugging-friendly JCL
//DEBUGJOB JOB  (ACCT),'DEBUGGING',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M,
//             TIME=30
//*
//STEP1    EXEC PGM=MYPROG
//STEPLIB  DD   DSN=MY.LOADLIB,DISP=SHR
//INPUT    DD   DSN=MY.INPUT,DISP=SHR
//OUTPUT   DD   DSN=MY.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSPRINT DD   SYSOUT=*
//SYSOUT   DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*
//SYSABEND DD   SYSOUT=*
//CEEDUMP  DD   SYSOUT=*`
    },

    { title:"10.6 — JCL Security Best Practices", level:"Advanced",
      content:`Security in JCL involves RACF, dataset protection, and job submission controls.

RACF Dataset Protection:
  Every dataset access is checked against RACF profiles. If your job gets S913, you need RACF authority.

Principles:
  • Never hardcode passwords in JCL
  • Use surrogate submission for scheduler jobs
  • Minimize DISP=OLD (exclusive locks block other jobs)
  • Use RACF groups for team-based access
  • Protect production JCL libraries with RACF

Dataset Naming for Security:
  Use HLQ-based RACF rules. PROD.** protected differently than TEST.**

Sensitive Data:
  • Don't write passwords/keys to SYSOUT
  • Use encrypted datasets for sensitive data
  • Clean up temp datasets (they persist on SPOOL until purge)

💡 Best Practice: Request minimum required access. Don't ask for ALTER when READ is sufficient.`,
      code:`//* Secure job submission
//SECJOB   JOB  (ACCT),'SECURE',
//             CLASS=A,MSGCLASS=X,
//             USER=BATCHUSR,
//             GROUP=PRODGRP,
//             NOTIFY=&SYSUID
//*
//* RACF commands (run by security admin):
//*   ADDSD 'PROD.PAY.**' UACC(NONE)
//*   PERMIT 'PROD.PAY.**' ID(PRODGRP) ACCESS(UPDATE)
//*   PERMIT 'PROD.PAY.**' ID(DEVGRP) ACCESS(READ)
//*
//* Never do this:
//*   //STEP1 EXEC PGM=MYPROG,
//*              PARM='PASSWORD=SECRET123'
//*   (Visible in SPOOL output!)`
    },

    { title:"10.7 — Interview Questions (50+ Q&A)", level:"All Levels",
      content:`Comprehensive JCL interview questions organized by difficulty. Study these to ace any mainframe interview.

=== BEGINNER LEVEL ===

Q: What are the three basic JCL statements?
A: JOB (identifies the job to z/OS), EXEC (specifies which program or PROC to execute), DD (defines datasets used by the program).

Q: What is the purpose of the JOB statement?
A: It identifies the job, provides accounting info, sets scheduling class, message class, region, time limits, and notification.

Q: Explain DISP=(NEW,CATLG,DELETE).
A: Create a new dataset. If the step succeeds, catalog it (register in system catalog). If the step ABENDs, delete it so you don't leave partial files.

Q: What does DISP=SHR mean?
A: The dataset already exists and can be shared with other jobs for reading. Multiple jobs can have DISP=SHR simultaneously.

Q: Difference between DISP=OLD and DISP=SHR?
A: OLD gives exclusive access (no other job can use it). SHR gives shared read access. Use OLD when writing, SHR when reading.

Q: What is IEFBR14?
A: A program that does nothing — it simply returns RC=0. Its purpose is to trigger DD statement processing, which creates or deletes datasets based on DISP parameters.

Q: What does SYSOUT=* mean?
A: Route output to the JES spool using the MSGCLASS defined on the JOB statement. The output can be viewed in SDSF.

Q: What is a DD DUMMY?
A: It tells z/OS to perform no I/O for this DD. READs return end-of-file immediately, WRITEs are discarded. Useful for testing.

Q: What is MSGLEVEL=(1,1)?
A: First parameter 1 = show all JCL (including PROC expansions). Second parameter 1 = show all allocation messages. This gives maximum debugging information.

Q: What is NOTIFY=&SYSUID?
A: Sends a TSO message to the submitting user when the job completes. &SYSUID resolves to the current TSO user ID.

Q: What is TYPRUN=SCAN?
A: JES performs a syntax check on the JCL without actually executing any steps. Use it to validate new or modified JCL.

Q: What are the standard return codes?
A: 0 = Success, 4 = Warning, 8 = Error, 12 = Severe, 16 = Terminal. ABEND means abnormal end (program crash).

=== INTERMEDIATE LEVEL ===

Q: Difference between STEPLIB and JOBLIB?
A: JOBLIB is coded after JOB, before first EXEC — applies to all steps. STEPLIB is coded within a step — applies only to that step. If STEPLIB is present, JOBLIB is NOT searched for that step.

Q: What is the program search order?
A: STEPLIB (if coded) → JOBLIB (if coded and no STEPLIB) → Link List (LNKLSTxx) → LPA (Link Pack Area). If not found anywhere → S806 ABEND.

Q: What causes S0C7 ABEND?
A: Data exception — non-numeric data found in a numeric field (e.g., spaces in a COMP-3 field). Fix: INITIALIZE working storage, validate input data, check REDEFINES.

Q: What causes SB37 ABEND?
A: Out of space — the dataset used all primary space plus 15 secondary extensions. Fix: Increase SPACE, code RLSE on upstream files, or delete old data.

Q: What is a GDG?
A: Generation Data Group — maintains versioned datasets. (+1) creates a new generation, (0) references current, (-1) references previous. Defined with IDCAMS DEFINE GDG.

Q: Explain COND=(4,LT,STEP1).
A: "If 4 is Less Than STEP1's return code, skip this step." In practical terms: skip if STEP1 RC > 4. COND tests whether to BYPASS, not whether to execute.

Q: How is IF/THEN/ELSE different from COND?
A: IF/THEN/ELSE tests whether to EXECUTE (readable, like English). COND tests whether to BYPASS (confusing, backwards). IF is modern and preferred, COND is legacy but ubiquitous.

Q: What is COND=EVEN? COND=ONLY?
A: COND=EVEN — Execute this step even if a previous step ABENDed. COND=ONLY — Execute ONLY if a previous step ABENDed. Both are used for cleanup/error-handling steps.

Q: What is a PROC?
A: A pre-written, reusable set of JCL steps stored in a procedure library. Invoked with EXEC procname. Can accept symbolic parameters for flexibility.

Q: How do you override a DD in a PROC?
A: //procstep.ddname DD new-parameters. The entire DD is replaced. Order of overrides must match the order in the PROC.

Q: What is the difference between PDS and PDSE?
A: PDS has fixed directory blocks and doesn't reclaim space when members are deleted (needs IEBCOPY compress). PDSE has dynamic directory, automatic space reuse, and better sharing. Create PDSE with DSNTYPE=LIBRARY.

Q: What is the PARM parameter limit?
A: 100 characters maximum. For longer input, use SYSIN DD * with in-stream data.

Q: Explain DD concatenation.
A: Multiple datasets under one DD name. Second and subsequent DDs have no name — they chain to the first. All must have compatible RECFM. Largest BLKSIZE must be on the first DD.

Q: What is a referback?
A: DSN=*.stepname.ddname references the dataset from an earlier step. DCB=*.stepname.ddname copies DCB attributes. Avoids repeating long DSN or DCB.

Q: What does REGION=0M mean?
A: Unlimited memory below the 16MB line. Common for batch. Some shops restrict this for WLM (Workload Manager) reasons.

Q: What does TIME=1440 mean?
A: Unlimited CPU time (1440 minutes = 24 hours). Use for long-running jobs. For production, set a realistic limit so runaway jobs are caught.

=== ADVANCED LEVEL ===

Q: How would you design a restartable job?
A: Delete-before-create pattern (IDCAMS DELETE at job start), avoid temporary datasets at restart points, catalog all intermediate files, use RESTART= parameter, make steps idempotent.

Q: Explain IF LASTCC = 8 THEN SET MAXCC = 0 in IDCAMS.
A: When IDCAMS DELETE fails because the dataset doesn't exist, it sets LASTCC=8. This statement resets MAXCC to 0, effectively ignoring the "not found" error. Standard pattern in every production shop.

Q: What is JCLLIB ORDER?
A: Specifies the search order for PROCs and INCLUDE members. Must appear after JOB, before first EXEC. Up to 15 libraries.

Q: Explain DFSORT JOINKEYS.
A: Joins two files like a database JOIN. JOINKEYS defines keys for each file. JOIN PAIRED = inner join, JOIN UNPAIRED = outer join. REFORMAT combines fields from both files.

Q: What is SMS? How does it affect JCL?
A: Storage Management Subsystem automates storage. ACS routines assign STORCLAS, MGMTCLAS, DATACLAS based on dataset names. In SMS shops, you often don't need UNIT or VOL — SMS handles placement.

Q: How do you run a DB2 program in batch?
A: EXEC PGM=IKJEFT01 with SYSTSIN containing DSN SYSTEM(subsystem) and RUN PROGRAM(prog) PLAN(plan). STEPLIB must include the DB2 SDSNLOAD library.

Q: What is the difference between SORT and ICETOOL?
A: SORT handles single operations. ICETOOL runs multiple SORT operations in one step with cross-file operations, record selection (NODUPS, ALLDUPS), and statistical reporting.

Q: How do symbolic parameters resolve?
A: At JES conversion time. Coded values on EXEC override PROC defaults. SET statements can define/override symbols. &SYSUID and other system symbols are resolved automatically.

Q: What is OUTFIL in DFSORT?
A: Writes to multiple output files from a single sort pass. Each OUTFIL can have different INCLUDE/OMIT criteria and BUILD reformatting. Extremely efficient for splitting files.

Q: How does ADRDSSU differ from IEBCOPY for backups?
A: ADRDSSU handles all dataset types (VSAM, PDS, sequential, HFS), supports compression during dump, concurrent copy, and volume-level operations. IEBCOPY only handles PDS.

💡 Study Tip: Focus on Beginner + Intermediate for initial interviews. Advanced questions come in senior-level interviews. Always give real-world examples when answering.`,
      code:`//* Quick reference — JCL you'll write most often:
//*
//* 1. Delete if exists:
//DEL      EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.FILE PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//*
//* 2. Create new dataset:
//CREATE   EXEC PGM=IEFBR14
//NEWFILE  DD   DSN=MY.FILE,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//*
//* 3. Sort a file:
//SORT     EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.OUTPUT,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5))
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD   SYSOUT=*
//*
//* 4. Run DB2 program:
//STEP1    EXEC PGM=IKJEFT01
//STEPLIB  DD   DSN=MY.LOADLIB,DISP=SHR
//         DD   DSN=DB2.SDSNLOAD,DISP=SHR
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(MYPROG) PLAN(MYPLAN)
  END
/*`
    },

    { title:"10.8 — JCL Cheat Sheet", level:"All Levels",
      content:`Complete JCL quick reference. Bookmark this lesson.

═══ JOB STATEMENT ═══
CLASS=A         — Job class (which initiator)
MSGCLASS=X      — Output class (where output goes)
MSGLEVEL=(1,1)  — Show all JCL + all allocation msgs
NOTIFY=&SYSUID  — Notify on completion
REGION=0M       — Unlimited memory
TIME=30         — 30 min CPU time
PRTY=8          — Priority (0-15, higher=first)
TYPRUN=SCAN     — Syntax check only
RESTART=STEP030 — Restart from step
COND=(0,NE)     — Skip remaining if any RC≠0
JOBRC=MAXRC     — Job RC = highest step RC

═══ EXEC STATEMENT ═══
PGM=program     — Execute program
PROC=procname   — Invoke procedure
PARM='value'    — Pass parameter (max 100 chars)
COND=(4,LT,STEP1) — Skip if STEP1 RC > 4
COND=EVEN       — Run even after ABEND
COND=ONLY       — Run only after ABEND
REGION=256M     — Step memory override
TIME=5          — Step CPU time override

═══ DD STATEMENT ═══
DSN=name        — Dataset name (max 44 chars)
DISP=SHR        — Shared read
DISP=OLD        — Exclusive access
DISP=(NEW,CATLG,DELETE) — Create, catalog/delete
DISP=(MOD,CATLG) — Append or create
DISP=(NEW,PASS)  — Temp between steps
DISP=(OLD,DELETE) — Delete dataset
SPACE=(CYL,(pri,sec),RLSE) — Allocate space
DCB=(RECFM=FB,LRECL=80,BLKSIZE=0) — Record format
SYSOUT=*        — Print to spool
DUMMY           — No I/O (suppress)

═══ DISP VALUES ═══
Status:   NEW | OLD | SHR | MOD
Normal:   CATLG | KEEP | DELETE | PASS | UNCATLG
Abnormal: Same as normal (defaults to normal)

═══ SPACE UNITS ═══
TRK   — Tracks (~56KB on 3390)
CYL   — Cylinders (~840KB on 3390, = 15 tracks)
RLSE  — Release unused space on close

═══ DCB VALUES ═══
RECFM: F(fixed) FB(fixed blocked) V(variable) VB(var blocked) U(undefined)
LRECL: Record length (bytes)
BLKSIZE: Block size (0 = system optimal)

═══ COMMON PROGRAMS ═══
IEFBR14    — Do nothing (create/delete via DD)
SORT       — Sort, copy, reformat, select, join
IDCAMS     — Delete, define, repro, print, listcat
IEBGENER   — Sequential copy
IEBCOPY    — PDS copy, compress
IKJEFT01   — TSO/DB2 in batch
IGYCRCTL   — COBOL compiler
IEWL       — Linkage editor
ISRSUPC    — File compare (SUPERC)
ADRDSSU    — Dump/restore

═══ COMMON ABENDS ═══
S001   — I/O error (BLKSIZE mismatch in concat)
S013   — Open error (DCB conflict, member not found)
S0C1   — Operation exception (invalid instruction)
S0C4   — Protection exception (addressing error)
S0C7   — Data exception (non-numeric in numeric field)
S222   — Job cancelled by operator
S322   — CPU time exceeded
S806   — Module not found (STEPLIB/JOBLIB)
SB37   — Out of space (no more extents)
SD37   — No secondary space specified

═══ JES2 COMMANDS ═══
$DA      — Display active jobs
$DQ      — Display queues
$DU      — Display units
$PI job  — Purge job
$HJ job  — Hold job
$AJ job  — Release job

═══ SDSF LINE COMMANDS ═══
S — Browse output  |  P — Purge  |  C — Cancel
H — Hold  |  A — Release  |  SJ — Show JCL

═══ IDCAMS PATTERNS ═══
DELETE name PURGE / IF LASTCC=8 THEN SET MAXCC=0
DEFINE CLUSTER (NAME(x) INDEXED KEYS(n m) RECSZ(a b))
REPRO INFILE(dd) OUTFILE(dd) COUNT(n)
PRINT INFILE(dd) CHARACTER COUNT(n)
LISTCAT ENT(name) ALL

═══ DFSORT PATTERNS ═══
SORT FIELDS=(pos,len,fmt,ord)
INCLUDE COND=(pos,len,fmt,op,value)
OUTREC BUILD=(pos,len,C'literal')
SUM FIELDS=NONE (remove duplicates)
OUTFIL FNAMES=dd,INCLUDE=(...),BUILD=(...)
JOINKEYS FILE=F1,FIELDS=(pos,len,ord)

💡 Print this cheat sheet. Every mainframe developer has one at their desk.`,
      code:`//* === JCL TEMPLATE (copy-paste ready) ===
//*============================================================*
//*  JOB: [NAME]                                               *
//*  PURPOSE: [DESCRIPTION]                                    *
//*  AUTHOR: [YOUR NAME]                                       *
//*  DATE: [DATE]                                              *
//*============================================================*
//JOBNAME  JOB  (ACCT),'DESCRIPTION',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M,TIME=30
//*
//         SET  HLQ=MY.ENV
//*
//*--- Delete old output ---
//STEP010  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE &HLQ..OUTPUT PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//*--- Main processing ---
//STEP020  EXEC PGM=MYPROG
//STEPLIB  DD   DSN=&HLQ..LOADLIB,DISP=SHR
//INPUT    DD   DSN=&HLQ..INPUT,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//SYSPRINT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*
//*--- Conditional next step ---
//CHK      IF  STEP020.RC = 0 THEN
//STEP030  EXEC PGM=NEXTSTEP
//INPUT    DD   DSN=&HLQ..OUTPUT,DISP=SHR
//REPORT   DD   SYSOUT=*
//CHK      ENDIF
//*--- Cleanup (always runs) ---
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN`
    },

  ]
};
