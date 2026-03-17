export const JCL_TOPIC = {
  id:"jcl", icon:"⚙️", title:"JCL", subtitle:"Job Control Language", color:"#0071e3", level:"Beginner → Expert",
  description:"The command language of z/OS batch. Every production job on the planet's busiest systems starts here.",
  sections:[

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 1: INTRODUCTION TO JCL (5 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"1.1 — What is JCL?", level:"Beginner",
      content:`Job Control Language (JCL) is the scripting language used to instruct IBM z/OS how to run batch jobs. It acts as the interface between your program and the operating system — telling z/OS which program to run, what data to use, and what to do with the results.

JCL was introduced with OS/360 in 1964 and has evolved through MVS, OS/390, and z/OS. Despite its age, JCL remains the backbone of mainframe batch processing.

Every JCL job stream consists of three fundamental statement types:
  • JOB statement   — Identifies the job and provides accounting info
  • EXEC statement  — Names the program or procedure to run
  • DD statement    — Defines every dataset (file) the program uses

JCL is column-sensitive in positions 1–72. Columns 73–80 are the sequence number field (ignored by z/OS). All JCL statements begin with // in columns 1–2.

Why JCL still matters:
  • 68% of the world's transactions pass through mainframes
  • Every bank, airline, insurance company runs JCL daily
  • A single JCL error can halt millions in processing
  • Understanding JCL is the gateway to every mainframe technology

Key Terminology:
  • Job — A unit of work submitted to z/OS for batch execution
  • Step — One program execution within a job (max 255 steps)
  • Dataset — A mainframe file (sequential, partitioned, or VSAM)
  • SPOOL — Temporary storage for job output managed by JES
  • Initiator — A z/OS address space that selects and runs batch jobs
  • Catalog — The master index of all datasets on the system

💡 Interview Tip: JCL is often called the "glue" of mainframe batch. Explain how JOB, EXEC, and DD work together.`,
      code:`//MYJOB    JOB  (ACCT),'MY FIRST JOB',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=IEFBR14
//SYSPRINT DD   SYSOUT=*
//`
    },

    { title:"1.2 — JCL Processing Flow", level:"Beginner",
      content:`Understanding how z/OS processes JCL is essential for debugging. The journey from submission to completion:

Phase 1 — Submission:
  Submit through TSO/ISPF (SUBMIT command), a scheduler like CA-7 or TWS, the internal reader, or FTP.

Phase 2 — Conversion:
  JES reads JCL and validates syntax. Checks for missing commas, invalid parameters, unmatched quotes. If JES finds a syntax error, the job fails with JCL ERROR before execution. JES assigns a JOB number (e.g., JOB12345).

Phase 3 — Input Queue:
  The job enters the input queue, prioritized by CLASS and PRTY parameters.

Phase 4 — Execution:
  An initiator selects the job and processes each step sequentially. For each EXEC, z/OS locates the program (STEPLIB → JOBLIB → link list → LPA). For each DD, z/OS allocates datasets. The program runs and sets a return code.

Phase 5 — Output Processing:
  Output goes to SPOOL based on MSGCLASS. JESMSGLG shows messages, JESYSMSG shows allocations.

Phase 6 — Purge:
  After output is processed, the job is purged from SPOOL.

Common Failure Points:
  • JCL ERROR — Syntax problem during conversion
  • NOT CATLG 2 — Dataset already exists
  • S0C7 — Data exception (bad data in program)
  • S806 — Program not found in library chain
  • SB37 — Dataset ran out of space

💡 Pro Tip: Always check JESMSGLG first when a job fails.`,
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
      content:`JES (Job Entry Subsystem) manages job input, scheduling, and output. Every z/OS runs one version.

JES2 — The Most Common (~85% of sites):
  Each z/OS system operates independently. Jobs selected locally by CLASS and PRTY.
  • Job Classes (A-Z, 0-9) — Which initiator picks up the job
  • Message Classes — Where output goes
  • $HASP messages — JES2 system messages
  • Commands use $ prefix ($DA, $DQ, $DU)

JES3 — Centralized (~15% of sites):
  Global Processor controls scheduling across all systems.
  • Centralized resource management
  • Device allocation before execution
  • Built-in deadline scheduling
  • Commands use * prefix

  Feature             │ JES2              │ JES3
  ────────────────────┼───────────────────┼──────────────────
  Scheduling          │ Local per system  │ Global processor
  Device allocation   │ At step execution │ Before execution
  Commands            │ $ prefix          │ * prefix

JES2 JECL Statements:
  • /*JOBPARM — Set execution parameters (SYSAFF, TIME)
  • /*ROUTE — Route job/output to another system
  • /*PRIORITY — Override job priority
  • /*OUTPUT — Control output processing

💡 Interview Tip: Most companies use JES2. Mention $ commands like $DA (display active).`,
      code:`/*JOBPARM  SYSAFF=SYS1,TIME=30
/*ROUTE    PRINT NODEA.RMT1
/*PRIORITY 6
//*
//JESJOB   JOB  (ACCT),'JES2 DEMO',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//* JES2 operator commands:
//*   $DA  — Display active jobs
//*   $DQ  — Display job queues
//*   $PI  — Purge a job
//*   $HJ  — Hold a job
//STEP1    EXEC PGM=IEFBR14`
    },

    { title:"1.4 — Submitting & Monitoring Jobs", level:"Beginner",
      content:`Submitting JCL and monitoring execution are the first practical skills every mainframe developer needs.

Submitting via TSO/ISPF:
  1. Open JCL member in ISPF editor (option 2)
  2. Type SUBMIT (or SUB) on command line
  3. You see: "IKJ56250I JOB jobname(JOBnnnnn) SUBMITTED"

Other Methods:
  • TSO: SUBMIT 'MY.JCL.LIBRARY(MEMBER)'
  • Internal Reader: //DD DD SYSOUT=(,INTRDR)
  • Schedulers: CA-7, TWS, Control-M
  • Batch TSO: IKJEFT01

Monitoring with SDSF:
  Key Panels:
  • DA — Display Active (running jobs)
  • ST — Status (output queue)
  • I — Input (waiting jobs)
  • H — Held Output

  Line Commands:
  • S — Browse output     • P — Purge
  • C — Cancel            • SJ — Show JCL

Reading Job Output:
  • JESMSGLG — JES messages (start/end/notify)
  • JESJCL — JCL as interpreted by JES
  • JESYSMSG — Allocation messages (critical for debugging)
  • SYSPRINT — Program output

Return Codes:
  • RC=0000 — Success     • RC=0004 — Warning
  • RC=0008 — Error       • RC=0012 — Severe
  • ABEND — Program crash

💡 Best Practice: Set NOTIFY=&SYSUID on every job for completion notification.`,
      code:`//MYJOB    JOB  (ACCT),'MONITOR DEMO',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             TYPRUN=SCAN
//*
//* TYPRUN=SCAN — Syntax check only, no execution
//* TYPRUN=HOLD — Submit but hold in queue
//*
//STEP1    EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.INPUT.DATA,DISP=SHR
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY`
    },

    { title:"1.5 — JCL Best Practices", level:"Beginner",
      content:`Following conventions makes JCL readable, maintainable, and error-free.

Naming Conventions:
  Job Names — USERID + identifier (HARI01A) or app prefix (PAY001)
  Step Names — Descriptive: COMPILE, SORTIT, BACKUP. Or numbered: STEP010, STEP020
  DD Names — Standard: SYSUT1, SYSPRINT. Custom: INFILE, OUTFILE, RPTFILE
  Datasets — HLQ.APP.TYPE.DESC format. Max 44 chars. Example: HARI.PAYROLL.MASTER.DATA

Comment Standards:
  • Header block: purpose, author, date, dependencies, change log
  • Comment before each step explaining business logic
  • Use //* separators for visual clarity

Code Layout:
  • Align parameters vertically
  • Consistent indentation on continuations
  • One parameter per line for complex DDs
  • Keep lines under 71 characters

Common Mistakes:
  • Forgetting comma between parameters (rest becomes comment)
  • Spaces inside quoted strings
  • Using column 72+ (becomes sequence numbers)
  • Not testing with TYPRUN=SCAN first
  • Hardcoding values that should be symbolic

💡 Pro Tip: TYPRUN=SCAN validates syntax without executing. Always use for new JCL.`,
      code:`//*============================================================*
//*  JOB: PAYROLL MONTHLY RUN                                  *
//*  PROGRAMMER: HARIKRISHNAN K                                *
//*  DATE: 2026-03-16                                          *
//*  PURPOSE: Extract and sort monthly payroll                 *
//*  CHANGE LOG:                                               *
//*  2026-03-16 HARI  Initial creation                         *
//*============================================================*
//PAYMON   JOB  (ACCT,DEPT),'PAYROLL MONTHLY',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M,TIME=30
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
  Columns 1–2:    // (identifies JCL statement)
  Column 3:       Name field begins (optional, 1-8 chars)
  After name:     Space, then operation (JOB/EXEC/DD)
  After operation: Space, then operand field
  After operand:  Space, then comments
  Columns 73–80:  Sequence numbers (ignored by JES)

Name Field Rules:
  • Must start in column 3
  • 1-8 characters: A-Z, 0-9, @, #, $
  • First char must be alphabetic or @, #, $
  • Step names unique within job
  • DD names unique within step

Operand Field:
  • Parameters separated by commas — NO spaces between them
  • Positional parameters first, then keyword parameters
  • Values with special chars in single quotes

Critical Rule: A space in the operand field signals end of operands. Everything after = comment. This is the #1 source of JCL bugs.

💡 Mistake: DSN=MY.DATA, DISP=SHR (space after comma). DISP=SHR becomes a comment!`,
      code:`//*  Column Layout:
//*  Col: 123456789012345678...
//*       //NAME___OP___OPERANDS_____COMMENTS
//*
//MYJOB    JOB  (ACCT),'NAME',CLASS=A     JOB STMT
//STEP1    EXEC PGM=IEFBR14               EXEC STMT
//INPUT    DD   DSN=MY.DATA,DISP=SHR      DD STMT
//*
//* Positional vs Keyword:
//MYJOB    JOB  (ACCT),'PROGRAMMER',CLASS=A,MSGCLASS=X
//*              ^^^^^^  ^^^^^^^^^^^  keyword  keyword
//*              Pos #1   Pos #2
//*
//* WRONG (space after comma):
//*  //DD1 DD DSN=MY.DATA, DISP=SHR
//* RIGHT:
//DD1      DD   DSN=MY.DATA,DISP=SHR`
    },

    { title:"2.2 — Continuation Rules", level:"Beginner",
      content:`JCL statements often exceed one line. Continuation rules let you spread across lines.

Basic Continuation:
  1. End current line after a comma (within columns 1-71)
  2. Next line: // in columns 1-2
  3. Column 3 blank
  4. Continue operand in columns 4-16

Rules:
  • Break AFTER a comma, not before
  • Never break inside a keyword=value pair
  • Last continuation line should NOT end with comma
  • Convention: align at column 16

DD Concatenation vs Continuation:
  Continuation = one statement across lines.
  Concatenation = multiple datasets under one DD name.

Common Errors:
  • Forgetting // on continuation line
  • Starting continuation after column 16
  • Breaking mid-parameter
  • Trailing comma on last line

💡 Pro Tip: Align all continuations at column 16.`,
      code:`//* Basic Continuation:
//STEP1    EXEC PGM=MYPROGRAM,
//             PARM='OPTION1',
//             REGION=0M,
//             TIME=10
//*
//* DD Continuation:
//OUTPUT   DD   DSN=MY.OUTPUT.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=SYSDA,
//             SPACE=(CYL,(100,50),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)
//*
//* DD Concatenation (NOT continuation):
//STEPLIB  DD   DSN=MY.LOAD.LIB1,DISP=SHR
//         DD   DSN=MY.LOAD.LIB2,DISP=SHR
//         DD   DSN=MY.LOAD.LIB3,DISP=SHR`
    },

    { title:"2.3 — Comments & Documentation", level:"Beginner",
      content:`Well-documented JCL separates maintainable jobs from nightmares.

Comment Lines (//*):
  Any line starting with //* is ignored by JES. Place anywhere in JCL.

Inline Comments:
  After the operand field, text after a space = comment.
  Warning: Don't put inline comments on continuation lines.

Required Documentation:
  Job Header — purpose, application, author, date, dependencies, restart instructions, change history
  Step Comments — what this step does, input/output, expected return codes

Commenting Out Code:
  Change // to //* to disable a line:
  • Active:   //STEP3 EXEC PGM=REALRUN
  • Disabled: //*STEP3 EXEC PGM=REALRUN

💡 Best Practice: Write comments for someone debugging at 3 AM. That's when they'll be read.`,
      code:`//*============================================================*
//*  JOB: GLPOST01 — Daily GL Posting                          *
//*  SCHEDULE: Daily 06:00 via CA-7                            *
//*  CONTACT: HARIKRISHNAN K (x1234)                           *
//*  PREDECESSOR: GLEXT01 (must RC=0)                          *
//*  SUCCESSOR: GLRPT01                                        *
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
      content:`Beyond JOB, EXEC, and DD, JCL has special-purpose statements.

Null Statement (//) — Marks end of job. Required when multiple jobs concatenated.

Delimiter (/*) — Marks end of in-stream data (DD * or DD DATA).

JCLLIB — Must appear after JOB, before any EXEC. Tells JES where to find PROCs.
  //  JCLLIB ORDER=(MY.PROC.LIB,SYS1.PROCLIB)

SET — Defines/overrides symbolic parameters. Can appear after JOB statement.
  //  SET ENV=PROD

INCLUDE — Pulls JCL from a PDS member. Fetched from JCLLIB ORDER libraries.
  //  INCLUDE MEMBER=STDDD01

OUTPUT — Controls SYSOUT processing. Referenced by DD OUTPUT= parameter.
  //RPTOUT OUTPUT DEST=RMT1,COPIES=3

💡 Pro Tip: JCLLIB + INCLUDE is powerful for modular JCL. Define common DD groups once, INCLUDE everywhere.`,
      code:`//* Delimiter (end of in-stream data):
//STEP1   EXEC PGM=SORT
//SYSIN   DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//*
//* JCLLIB (procedure library search):
//MYJOB   JOB  (ACCT),'DEMO'
//         JCLLIB ORDER=(MY.PROC.LIB,SYS1.PROCLIB)
//STEP1   EXEC MYPROC
//*
//* SET (symbolic parameters):
//         SET  ENV=PROD
//         SET  HLQ=PAY.&ENV
//STEP1   EXEC PGM=MYPROG
//INPUT   DD   DSN=&HLQ..MASTER,DISP=SHR
//*
//* INCLUDE:
//         INCLUDE MEMBER=STDDD01
//*
//* OUTPUT:
//RPTOUT  OUTPUT DEST=RMT1,COPIES=3
//REPORT  DD   SYSOUT=*,OUTPUT=*.RPTOUT`
    },

    { title:"2.5 — Positional vs Keyword Parameters", level:"Beginner",
      content:`Every JCL parameter is positional or keyword. Understanding the difference prevents errors.

Positional Parameters:
  • Order matters — identified by position
  • Must appear before keyword parameters
  • Skip with comma placeholder

  JOB positional: (accounting),'programmer name'
  EXEC: PGM=program (technically keyword but must be first)

Keyword Parameters:
  • KEYWORD=VALUE format
  • Any order after positional params
  • Self-documenting: CLASS=A, MSGCLASS=X, REGION=0M

Sub-parameters (in parentheses):
  • DISP=(status,normal-end,abnormal-end) — positional sub-params
  • DCB=(RECFM=FB,LRECL=80) — keyword sub-params
  • SPACE=(unit,(primary,secondary,directory),RLSE) — mixed

Omitting Sub-parameters:
  Code the comma to skip:
  • DISP=(,CATLG) — skip status, specify normal=CATLG
  • DISP=(SHR,,DELETE) — skip normal, specify abnormal=DELETE

💡 Interview Tip: Explain DISP=(NEW,CATLG,DELETE): "New dataset, catalog on success, delete on failure."`,
      code:`//* Positional Parameters:
//MYJOB    JOB  (ACCT123,ROOM42),
//             'HARIKRISHNAN K',
//             CLASS=A,MSGCLASS=X
//*              Pos #1            Pos #2
//*
//* Skipping positional:
//MYJOB    JOB  ,'HARIKRISHNAN K',CLASS=A
//*              ^ comma skips accounting
//*
//* DISP sub-parameters:
//DD1      DD   DSN=MY.FILE,DISP=(NEW,CATLG,DELETE)
//*                               ^^^  ^^^^^  ^^^^^^
//*                               Stat Normal Abnrml
//*
//* Skip normal disposition:
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
      content:`The JOB statement is the first statement in every job. It identifies the job, sets defaults, and controls scheduling.

Syntax: //jobname JOB positional-params,keyword-params

Positional Parameters:
  1. Accounting: (account,sub-account,...) for charge-back
  2. Programmer Name: 'Name' in quotes, up to 20 chars

Categories of Keyword Parameters:
  Scheduling: CLASS, PRTY, TYPRUN
  Resource: REGION, TIME, BYTES, LINES, PAGES
  Output: MSGCLASS, MSGLEVEL, NOTIFY
  Security: USER, PASSWORD, GROUP
  Processing: COND, RESTART, JOBRC

Essential Parameters for Daily Work:
  • CLASS — Which initiator runs the job
  • MSGCLASS — Where output goes
  • MSGLEVEL — How much JCL/allocation info shown
  • NOTIFY — Who gets completion notification
  • REGION — Maximum memory
  • TIME — Maximum CPU time

💡 Pro Tip: REGION=0M = unlimited memory. TIME=1440 = unlimited CPU (24hrs). Use for testing; production should have proper limits.`,
      code:`//* Minimal:
//MINJOB   JOB
//*
//* Typical Production:
//PRODJOB  JOB  (ACCT001,DEPT42),
//             'HARIKRISHNAN K',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M,TIME=30
//*
//* With Security:
//SECJOB   JOB  (ACCT),'SECURE JOB',
//             CLASS=A,MSGCLASS=X,
//             USER=MYUSERID,GROUP=MYGROUP,
//             NOTIFY=&SYSUID
//*
//* With Restart:
//RSTJOB   JOB  (ACCT),'RESTART JOB',
//             CLASS=A,MSGCLASS=X,
//             RESTART=STEP030,NOTIFY=&SYSUID`
    },

    { title:"3.2 — CLASS & MSGCLASS", level:"Beginner",
      content:`CLASS controls job scheduling. MSGCLASS controls output routing.

CLASS (Job Class):
  Syntax: CLASS=character (A-Z, 0-9)
  Determines which initiator picks up your job. Each site configures classes differently.
  Typical setup:
  • A — General batch (most common)
  • B — Long-running jobs
  • S — STC (started tasks)
  • 1-9 — Special processing

  If no initiator services your class, the job waits forever in the input queue.

MSGCLASS (Message Class):
  Syntax: MSGCLASS=character (A-Z, 0-9)
  Controls where the JES message log and JCL listing go.
  Typical setup:
  • X or H — Hold for viewing in SDSF (most common for dev)
  • A — Print immediately
  • T — Purge after execution

  Pro Tip: Always use MSGCLASS=X during development so you can review output.

These are installation-defined — ask your sysprog or check your shop standards.

💡 Interview Tip: "CLASS determines when/where the job runs; MSGCLASS determines where the output goes."`,
      code:`//* CLASS=A — General purpose batch
//* MSGCLASS=X — Hold output for viewing
//MYJOB    JOB  (ACCT),'CLASS DEMO',
//             CLASS=A,
//             MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//* Different classes for different purposes:
//* CLASS=A — Short-running jobs (<5 min)
//* CLASS=B — Long-running jobs (>5 min)
//* CLASS=C — CPU-intensive jobs
//*
//* MSGCLASS destinations:
//* MSGCLASS=X — Hold in SDSF
//* MSGCLASS=A — Print immediately
//* MSGCLASS=T — Purge after execution`
    },

    { title:"3.3 — MSGLEVEL Parameter", level:"Beginner",
      content:`MSGLEVEL controls how much information appears in your job output. Syntax: MSGLEVEL=(statements,messages)

First sub-parameter (statements — what JCL to show):
  0 — Show only the JOB statement
  1 — Show all JCL (including PROC expansions) ← most useful
  2 — Show only input JCL (no PROC expansions)

Second sub-parameter (messages — what allocation messages to show):
  0 — Show allocation messages only for steps that ABEND
  1 — Show ALL allocation/deallocation messages ← most useful

Best Practice — Always use MSGLEVEL=(1,1):
  This shows you everything: the full JCL as interpreted by JES (including PROC expansions with //++ markers) and every dataset allocation and deallocation. This is invaluable for debugging.

Why (1,1) matters:
  When a job fails, JESYSMSG with MSGLEVEL=(1,1) shows exactly which datasets were allocated to which DD names, what volumes were used, and where allocation failed. Without this, debugging is much harder.

💡 Pro Tip: Never submit production JCL without MSGLEVEL=(1,1) — the extra output costs nothing and saves hours of debugging.`,
      code:`//* MSGLEVEL=(1,1) — Show everything (recommended)
//FULLJOB  JOB  (ACCT),'FULL OUTPUT',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),NOTIFY=&SYSUID
//*
//* MSGLEVEL=(0,0) — Minimal output
//MINJOB   JOB  (ACCT),'MINIMAL',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(0,0),NOTIFY=&SYSUID
//*
//* MSGLEVEL=(2,0) — Input JCL only, messages on ABEND
//MEDJOB   JOB  (ACCT),'MEDIUM',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(2,0),NOTIFY=&SYSUID`
    },

    { title:"3.4 — REGION & TIME", level:"Beginner",
      content:`REGION controls memory. TIME controls CPU. Both are critical for resource management.

REGION (Memory):
  Syntax: REGION=nK or REGION=nM
  • On JOB — sets default for all steps
  • On EXEC — overrides for that step only
  • REGION=0M — Unlimited memory (common for batch)
  • REGION=4M — 4 megabytes
  • REGION=2048K — 2048 kilobytes

  z/OS allocates memory above and below the 16MB line. REGION controls the below-the-line allocation. Most modern programs run above the line.

TIME (CPU Time):
  Syntax: TIME=(minutes,seconds) or TIME=minutes
  • On JOB — total CPU time for entire job
  • On EXEC — CPU time for that step only
  • TIME=1440 — Unlimited (1440 min = 24 hrs)
  • TIME=NOLIMIT — Same as 1440
  • TIME=5 — 5 minutes
  • TIME=(2,30) — 2 minutes 30 seconds

  If exceeded, job ABENDs with S322 (CPU time exceeded).

Production Considerations:
  • Set realistic limits to prevent runaway jobs
  • A COBOL program with an infinite loop will burn CPU until TIME expires
  • REGION=0M is common but some shops restrict it
  • TIME on JOB limits total job; TIME on EXEC limits per step

💡 Common Mistake: S322 ABEND = CPU time exceeded. Increase TIME or fix the program logic.`,
      code:`//* REGION on JOB (applies to all steps):
//MYJOB    JOB  (ACCT),'RESOURCE DEMO',
//             CLASS=A,MSGCLASS=X,
//             REGION=0M,
//             TIME=30,
//             NOTIFY=&SYSUID
//*
//* TIME on individual steps:
//STEP1    EXEC PGM=FASTPROG,TIME=2
//STEP2    EXEC PGM=SLOWPROG,TIME=(10,30)
//STEP3    EXEC PGM=BIGPROG,REGION=256M,TIME=60
//*
//* Unlimited:
//BIGJOB   JOB  (ACCT),'UNLIMITED',
//             CLASS=A,MSGCLASS=X,
//             REGION=0M,TIME=1440`
    },

    { title:"3.5 — NOTIFY & TYPRUN", level:"Beginner",
      content:`NOTIFY tells you when the job finishes. TYPRUN controls how the job is processed.

NOTIFY:
  Syntax: NOTIFY=userid or NOTIFY=&SYSUID
  • Sends a TSO message when the job completes
  • &SYSUID = current TSO user ID (most common)
  • NOTIFY=HARI — notify user HARI
  • Without NOTIFY, you must check SDSF manually

TYPRUN — Controls processing mode:
  TYPRUN=SCAN — Syntax check only. JES validates JCL but does NOT execute.
  • Use this to validate new/modified JCL
  • No datasets allocated, no programs run
  • Shows JCL errors in JESYSMSG

  TYPRUN=HOLD — Submit to input queue but hold.
  • Job stays in input queue until released ($A command)
  • Useful for scheduling: submit now, release later

  TYPRUN=COPY — Copy input to SYSOUT without executing.
  • Rarely used, mainly for diagnostics

  TYPRUN=JCLHOLD — Hold during conversion.

Testing Workflow:
  1. Code JCL with TYPRUN=SCAN
  2. Submit — check for JCL errors
  3. Fix any errors
  4. Remove TYPRUN (or change to TYPRUN=HOLD)
  5. Submit for real execution

💡 Pro Tip: Make TYPRUN=SCAN your habit for all new JCL. Catches 90% of errors before execution.`,
      code:`//* NOTIFY — get notified on completion:
//MYJOB    JOB  (ACCT),'NOTIFY DEMO',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//* TYPRUN=SCAN — syntax check only:
//TESTJOB  JOB  (ACCT),'SCAN TEST',
//             CLASS=A,MSGCLASS=X,
//             TYPRUN=SCAN,
//             NOTIFY=&SYSUID
//STEP1    EXEC PGM=MYPROG
//INPUT    DD   DSN=MY.DATA,DISP=SHR
//*
//* TYPRUN=HOLD — submit but hold:
//HOLDJOB  JOB  (ACCT),'HELD JOB',
//             CLASS=A,MSGCLASS=X,
//             TYPRUN=HOLD,
//             NOTIFY=&SYSUID
//* Release with: $A HOLDJOB`
    },

    { title:"3.6 — PRTY & Job Scheduling", level:"Intermediate",
      content:`PRTY controls job priority within the input queue. Higher priority = selected first.

PRTY (Priority):
  Syntax: PRTY=n (0-15 for JES2, 0-14 for JES3)
  • Higher number = higher priority
  • Default depends on installation
  • 0 = lowest, 15 = highest
  • Jobs with same CLASS are ordered by PRTY

  Important: PRTY only affects queue ordering. It doesn't preempt running jobs. A PRTY=15 job waits if all initiators are busy, even if lower-priority jobs are running.

SCHENV (Scheduling Environment):
  Syntax: SCHENV=name
  • Directs job to a specific WLM scheduling environment
  • Used in Parallel Sysplex for workload distribution
  • Example: SCHENV=BATCH, SCHENV=CICSPROD

JOBRC (Job Return Code):
  Syntax: JOBRC=MAXRC or JOBRC=LASTRC or JOBRC=(stepname,procstep)
  • MAXRC — Job RC = highest step RC (default)
  • LASTRC — Job RC = last executed step RC
  • Useful for controlling successor job behavior

💡 Interview Tip: Understand that PRTY affects queue order, not execution order within a job.`,
      code:`//* PRTY — high priority job:
//URGENT   JOB  (ACCT),'HIGH PRIORITY',
//             CLASS=A,MSGCLASS=X,
//             PRTY=12,
//             NOTIFY=&SYSUID
//*
//* PRTY=1 — low priority background:
//BACKGRND JOB  (ACCT),'LOW PRIORITY',
//             CLASS=B,MSGCLASS=X,
//             PRTY=1,
//             NOTIFY=&SYSUID
//*
//* JOBRC — control return code reporting:
//RCJOB    JOB  (ACCT),'RC CONTROL',
//             CLASS=A,MSGCLASS=X,
//             JOBRC=LASTRC,
//             NOTIFY=&SYSUID`
    },

    { title:"3.7 — COND Parameter (Job Level)", level:"Intermediate",
      content:`COND on the JOB statement provides a global condition check. If ANY step returns a code meeting the COND criteria, the REMAINING steps are skipped (flushed).

Syntax: COND=(code,operator)
  Operators: GT, GE, EQ, LT, LE, NE

Logic (counterintuitive!):
  COND tests whether to SKIP (bypass) remaining steps. If the condition is TRUE, the step is SKIPPED.

  COND=(4,LT) means: "If 4 is LESS THAN any previous step's return code, skip the step." In other words: "If any step returned > 4, skip."

  This is the OPPOSITE of what most people expect. Think of it as: "Skip if this condition about the return code is true."

Common Usage:
  • COND=(0,NE) — Skip if any step returned non-zero
  • COND=(4,LT) — Skip if any step returned > 4
  • COND=(8,LT) — Skip if any step returned > 8

COND vs IF/THEN/ELSE:
  COND is older and confusing. IF/THEN/ELSE (covered in Chapter 7) is modern and readable. Most shops now prefer IF/THEN/ELSE, but you must understand COND because legacy JCL uses it everywhere.

💡 Pro Tip: The easiest way to remember COND: "The job SKIPS the step if the COND is TRUE."`,
      code:`//* COND on JOB — skip remaining if any RC > 0:
//MYJOB    JOB  (ACCT),'COND JOB',
//             CLASS=A,MSGCLASS=X,
//             COND=(0,NE),
//             NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=PROG1
//STEP2    EXEC PGM=PROG2
//* If STEP1 RC=4: COND test (0 NE 4) = TRUE → STEP2 SKIPPED
//*
//* COND=(4,LT) — skip if any RC > 4:
//MYJOB2   JOB  (ACCT),'COND GT4',
//             CLASS=A,MSGCLASS=X,
//             COND=(4,LT),
//             NOTIFY=&SYSUID
//* If STEP1 RC=4: COND test (4 LT 4) = FALSE → STEP2 RUNS
//* If STEP1 RC=8: COND test (4 LT 8) = TRUE → STEP2 SKIPPED`
    },

    { title:"3.8 — RESTART Parameter", level:"Intermediate",
      content:`RESTART tells z/OS to skip steps and begin execution at a specific step. Essential for job recovery after failures.

Syntax:
  RESTART=stepname — Restart from this step
  RESTART=(stepname,procstep) — Restart from a step within a PROC
  RESTART=* — Restart from the first step (same as no RESTART)

How It Works:
  All steps before the restart point are skipped (not executed). z/OS starts executing from the named step. Datasets that were created by earlier steps must still exist (they were created in the original run).

Recovery Scenario:
  Your 5-step job fails in STEP3 with SB37 (out of space):
  1. Fix the space problem (increase allocation or delete old data)
  2. Add RESTART=STEP3 to the JOB statement
  3. Resubmit — STEP1 and STEP2 are skipped
  4. STEP3 runs with the fix
  5. Remove RESTART for next scheduled run

Important Considerations:
  • Steps before RESTART don't execute — their DD allocations don't happen
  • If STEP3 needs output from STEP2, that output must still exist from the original run
  • Temporary datasets (&&TEMP) from earlier steps are gone — restart won't work if later steps need them
  • RESTART works with COND — flushed steps are still considered "executed" for COND testing

GDG Considerations:
  When restarting with GDGs, be careful — the relative generation numbers (+1, 0, -1) refer to the catalog state at restart time, not the original submission.

💡 Best Practice: Design jobs to be restartable — avoid temporary datasets between steps that need restart capability.`,
      code:`//* Basic RESTART from STEP3:
//MYJOB    JOB  (ACCT),'RESTART DEMO',
//             CLASS=A,MSGCLASS=X,
//             RESTART=STEP030,
//             NOTIFY=&SYSUID
//*
//STEP010  EXEC PGM=EXTRACT    ← SKIPPED
//STEP020  EXEC PGM=SORT       ← SKIPPED
//STEP030  EXEC PGM=LOAD       ← STARTS HERE
//STEP040  EXEC PGM=REPORT     ← RUNS NORMALLY
//*
//* RESTART in a PROC:
//MYJOB    JOB  (ACCT),'PROC RESTART',
//             CLASS=A,MSGCLASS=X,
//             RESTART=(STEP2,LINK)
//*
//STEP1    EXEC MYPROC         ← SKIPPED
//STEP2    EXEC COMPPROC       ← Starts at LINK step`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 4: EXEC STATEMENT (7 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"4.1 — EXEC Statement Overview", level:"Beginner",
      content:`The EXEC statement tells z/OS which program to execute or which procedure to invoke.

Syntax:
  //stepname EXEC PGM=program-name   ← Run a program
  //stepname EXEC PROC=proc-name     ← Invoke a procedure
  //stepname EXEC proc-name          ← Short form (PROC= implied)

Step Name:
  • 1-8 characters, same naming rules as JOB
  • Must be unique within the job
  • Required (though technically optional)
  • Used for referbacks, COND, RESTART

PGM Parameter:
  The program must exist in the search order:
  1. STEPLIB DD (if coded for this step)
  2. JOBLIB DD (if coded on the JOB)
  3. System link list (LNKLSTxx)
  4. Link Pack Area (LPA)

  If not found → S806 ABEND

Key EXEC Parameters:
  • PGM= — Program name (required if not invoking a PROC)
  • PARM= — Pass parameters to the program
  • COND= — Conditional execution (step level)
  • REGION= — Memory override for this step
  • TIME= — CPU time override for this step
  • ACCT= — Step-level accounting

💡 Interview Tip: Know the program search order: STEPLIB → JOBLIB → Link List → LPA.`,
      code:`//* Execute a program:
//STEP1    EXEC PGM=IEBGENER
//*
//* Execute with parameters:
//STEP2    EXEC PGM=IKJEFT01,
//             PARM='MYCOMMAND'
//*
//* Invoke a procedure:
//STEP3    EXEC PROC=MYPROC
//STEP4    EXEC MYPROC          (short form)
//*
//* With step-level overrides:
//STEP5    EXEC PGM=BIGPROG,
//             REGION=512M,
//             TIME=60,
//             COND=(4,LT)
//*
//* Program search order:
//STEP6    EXEC PGM=MYPROG
//STEPLIB  DD   DSN=MY.LOADLIB,DISP=SHR  (1st)
//*        If not found → JOBLIB (if any)
//*        If not found → Link List
//*        If not found → LPA
//*        If not found → S806 ABEND`
    },

    { title:"4.2 — PARM Parameter", level:"Beginner",
      content:`PARM passes a character string to the executing program. The program receives it via the JCL PARM mechanism.

Syntax: PARM='value' or PARM=value

Rules:
  • Maximum 100 characters
  • Must be in quotes if it contains special chars or spaces
  • The program receives the length (2 bytes) followed by the string
  • COBOL: Available in LINKAGE SECTION via PARM parameter
  • Assembler: Register 1 points to address of parm
  • IKJEFT01: Pass TSO commands

Common Uses:
  • Pass runtime options: PARM='DEBUG'
  • Pass file names: PARM='INPUT01'
  • Pass DB2 plan: PARM='/DBPLAN'
  • COBOL compile options: PARM='LIB,MAP,XREF'

Multiple Sub-parameters:
  PARM='value1,value2,value3' — program parses the commas
  PARM=('value1','value2') — JCL concatenates without commas

For DB2 Programs (DSNREXX or IKJEFT01):
  //STEP1 EXEC PGM=IKJEFT01,
  //           PARM='DSN SYSTEM(DB2P) -'

💡 Common Mistake: PARM longer than 100 chars → JCL ERROR. Use SYSIN DD for longer input.`,
      code:`//* Simple PARM:
//STEP1    EXEC PGM=MYPROG,PARM='DEBUG'
//*
//* PARM with special characters (use quotes):
//STEP2    EXEC PGM=MYPROG,PARM='OPT1,OPT2,/DB2'
//*
//* COBOL compile with options:
//COMPILE  EXEC PGM=IGYCRCTL,
//             PARM='LIB,MAP,XREF,OFFSET'
//*
//* DB2 bind through IKJEFT01:
//BIND     EXEC PGM=IKJEFT01,
//             PARM='DSN SYSTEM(DB2P)'
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   *
  BIND PLAN(MYPLAN) MEMBER(MYPROG) -
       ACT(REP) ISOLATION(CS)
/*
//*
//* Multiple sub-parameters:
//STEP3    EXEC PGM=MYPROG,
//             PARM=('FIRST','SECOND')`
    },

    { title:"4.3 — COND on EXEC (Step Level)", level:"Intermediate",
      content:`COND on EXEC controls whether THIS specific step executes, based on return codes from PREVIOUS steps.

Syntax: COND=((code,op),(code,op,stepname),...)

Step-Level COND adds the ability to reference specific steps:
  COND=(4,LT,STEP1) — Skip this step if 4 < STEP1's RC (i.e., STEP1 RC > 4)

Multiple Conditions (up to 8):
  COND=((4,LT,STEP1),(0,NE,STEP2))
  "Skip if STEP1 RC > 4 OR STEP2 RC ≠ 0"
  Conditions are ORed — if ANY is true, step is skipped.

Special Values:
  COND=EVEN — Execute even if a previous step ABENDed
  COND=ONLY — Execute ONLY if a previous step ABENDed
  COND=((4,LT),EVEN) — Combine condition with EVEN

Without stepname, the condition checks against ALL previous steps.

Remember the Logic:
  Condition TRUE → Step SKIPPED
  Condition FALSE → Step RUNS
  All conditions ORed → ANY true = skip

💡 Pro Tip: For cleanup steps, use COND=EVEN to ensure they run even after ABENDs.`,
      code:`//* Skip STEP2 if STEP1 RC > 4:
//STEP1    EXEC PGM=PROG1
//STEP2    EXEC PGM=PROG2,COND=(4,LT,STEP1)
//*
//* Skip STEP3 if ANY previous RC > 0:
//STEP3    EXEC PGM=PROG3,COND=(0,NE)
//*
//* Multiple conditions (ORed):
//STEP4    EXEC PGM=PROG4,
//             COND=((4,LT,STEP1),(0,NE,STEP2))
//*
//* COND=EVEN — run even after ABEND:
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN
//DELTEMP  DD   DSN=MY.TEMP.FILE,DISP=(OLD,DELETE)
//*
//* COND=ONLY — run ONLY after ABEND:
//ERRRPT   EXEC PGM=ERRRPT01,COND=ONLY`
    },

    { title:"4.4 — STEPLIB, JOBLIB & Library Search", level:"Intermediate",
      content:`When you code PGM=MYPROG, z/OS must find the load module. The search order is critical.

STEPLIB (Step Library):
  Coded as a DD statement within a step. Only applies to that step.
  //STEPLIB DD DSN=MY.LOADLIB,DISP=SHR
  Can concatenate multiple libraries — searched in order:
  //STEPLIB DD DSN=MY.LIB1,DISP=SHR
  //        DD DSN=MY.LIB2,DISP=SHR

JOBLIB (Job Library):
  Coded immediately after JOB statement, before any EXEC. Applies to ALL steps.
  //MYJOB  JOB ...
  //JOBLIB DD DSN=MY.LOADLIB,DISP=SHR
  //STEP1  EXEC PGM=MYPROG    ← searches JOBLIB

STEPLIB vs JOBLIB:
  • STEPLIB overrides JOBLIB for that step
  • If STEPLIB is coded, JOBLIB is NOT searched for that step
  • JOBLIB cannot be coded if any step uses STEPLIB (some shops allow both)

Full Search Order:
  1. STEPLIB (if coded for the step)
  2. JOBLIB (if coded and no STEPLIB)
  3. LNKLSTxx (system link list — LNKLST concatenation)
  4. LPA (Link Pack Area — frequently used modules)

If not found → S806 ABEND (program not found)

💡 Common Mistake: Coding both STEPLIB and JOBLIB expecting both to be searched. STEPLIB replaces JOBLIB for that step.`,
      code:`//* JOBLIB — applies to all steps:
//MYJOB    JOB  (ACCT),'LIB DEMO',
//             CLASS=A,MSGCLASS=X
//JOBLIB   DD   DSN=MY.PROD.LOADLIB,DISP=SHR
//         DD   DSN=MY.COMMON.LOADLIB,DISP=SHR
//*
//STEP1    EXEC PGM=PROG1    ← searches JOBLIB
//STEP2    EXEC PGM=PROG2    ← searches JOBLIB
//*
//* STEPLIB — overrides JOBLIB for this step:
//STEP3    EXEC PGM=PROG3
//STEPLIB  DD   DSN=MY.TEST.LOADLIB,DISP=SHR
//*        ↑ JOBLIB NOT searched for STEP3
//*
//* Concatenated STEPLIB:
//STEP4    EXEC PGM=PROG4
//STEPLIB  DD   DSN=MY.APP.LOADLIB,DISP=SHR
//         DD   DSN=MY.COMMON.LOADLIB,DISP=SHR
//         DD   DSN=MY.UTILITY.LOADLIB,DISP=SHR`
    },

    { title:"4.5 — Common Programs (IEFBR14, SORT, IDCAMS)", level:"Beginner",
      content:`Some IBM-supplied programs are used in almost every JCL job.

IEFBR14 — The "Do Nothing" Program:
  Executes no logic but triggers DD statement processing. Used to:
  • Create empty datasets (via DD DISP=(NEW,CATLG))
  • Delete datasets (via DD DISP=(OLD,DELETE))
  • Create/delete multiple datasets in one step

SORT (DFSORT/ICEMAN):
  Sorts, merges, copies, and reformats data. One of the most-used utilities.
  //STEP1 EXEC PGM=SORT (or PGM=ICEMAN)
  Required DDs: SORTIN, SORTOUT, SYSIN, SYSOUT

IDCAMS — Access Method Services:
  The Swiss army knife for dataset management. Handles VSAM and non-VSAM:
  • DEFINE CLUSTER — Create VSAM datasets
  • DELETE — Delete any dataset
  • REPRO — Copy data between datasets
  • PRINT — Display dataset contents
  • LISTCAT — Show catalog information

IEBGENER — Sequential Copy:
  Copies one sequential dataset to another. Simple but common.
  Required DDs: SYSUT1 (input), SYSUT2 (output), SYSIN (DUMMY), SYSPRINT

IKJEFT01 — TSO in Batch:
  Runs TSO commands in batch mode. Used for DB2 operations (BIND, RUN).

💡 Interview Tip: Know IEFBR14 creates/deletes via DD processing. It's asked in nearly every interview.`,
      code:`//* IEFBR14 — Create an empty dataset:
//CREATE   EXEC PGM=IEFBR14
//NEWFILE  DD   DSN=MY.NEW.DATASET,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(10,5)),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)
//*
//* IEFBR14 — Delete a dataset:
//DELETE   EXEC PGM=IEFBR14
//OLDFILE  DD   DSN=MY.OLD.DATASET,DISP=(OLD,DELETE)
//*
//* SORT:
//SORTIT   EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.SORTED,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),DCB=*.SORTIN
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD   SYSOUT=*
//*
//* IDCAMS — Delete if exists, ignore error:
//DELSTEP  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.OLD.FILE PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*`
    },

    { title:"4.6 — ACCT & Override Parameters", level:"Intermediate",
      content:`EXEC parameters can override JOB-level defaults and provide step-specific accounting.

ACCT (Step Accounting):
  Syntax: ACCT=accounting-info or ACCT=(acct1,acct2)
  Provides accounting at the step level instead of (or in addition to) JOB-level accounting.

Overridable Parameters:
  These JOB-level parameters can be overridden on EXEC:
  • REGION= — Memory for this step
  • TIME= — CPU time for this step
  • COND= — Condition for this step
  • ACCT= — Accounting for this step

Parameters that CANNOT be on EXEC:
  • CLASS, MSGCLASS, MSGLEVEL — JOB-level only
  • NOTIFY, PRTY, TYPRUN — JOB-level only

Procedure Step Overrides:
  When invoking a PROC, you can override EXEC parameters:
  //STEP1 EXEC MYPROC,REGION.COMPILE=512M,TIME.LINK=5
  The format is PARM.stepname=value (stepname is within the PROC).

💡 Pro Tip: REGION and TIME on EXEC override JOB values. Useful when one step needs more resources.`,
      code:`//* Override REGION and TIME per step:
//MYJOB    JOB  (ACCT),'OVERRIDE',
//             CLASS=A,MSGCLASS=X,
//             REGION=64M,TIME=10,
//             NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=SMALLPROG
//*        Uses JOB defaults: REGION=64M,TIME=10
//*
//STEP2    EXEC PGM=BIGPROG,REGION=512M,TIME=60
//*        Override: more memory and time
//*
//STEP3    EXEC PGM=QUICKPROG,TIME=1
//*        Override: less time
//*
//* PROC overrides:
//STEP4    EXEC MYPROC,
//             PARM.COMPILE='MAP,LIST',
//             REGION.COMPILE=256M,
//             TIME.LINK=5`
    },

    { title:"4.7 — Executing Procedures", level:"Intermediate",
      content:`Procedures (PROCs) are pre-written JCL stored in a library. EXEC invokes them.

Invoking a PROC:
  //STEP1 EXEC PROC=MYPROC
  //STEP1 EXEC MYPROC          (PROC= optional)

Where PROCs Are Found:
  1. In-stream PROC (coded within the same JCL between //name PROC and // PEND)
  2. JCLLIB ORDER libraries
  3. System PROCLIB (SYS1.PROCLIB)

Overriding PROC DDs:
  You can add or override DD statements in a PROC step:
  //STEP1.DD1 DD DSN=MY.OVERRIDE,DISP=SHR
  Format: stepname.ddname where stepname is from INSIDE the PROC.

Overriding PROC Parameters:
  //STEP1 EXEC MYPROC,PARM.COMPILE='MAP',REGION.GO=256M

Symbolic Parameters:
  PROCs use &SYMBOL for variable values. Override at invocation:
  //STEP1 EXEC MYPROC,ENV=PROD,HLQ=PAY.PROD

  Inside PROC: DSN=&HLQ..MASTER → resolves to PAY.PROD.MASTER

In-stream PROC (within the job):
  //MYPROC PROC HLQ=DEFAULT
  //STEP1  EXEC PGM=MYPROG
  //INPUT  DD   DSN=&HLQ..DATA,DISP=SHR
  //       PEND

💡 Pro Tip: PROCs are essential for standardization. One change to the PROC updates all jobs that use it.`,
      code:`//* Invoke catalogued PROC:
//MYJOB    JOB  (ACCT),'PROC DEMO',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID
//         JCLLIB ORDER=(MY.PROC.LIB)
//*
//STEP1    EXEC MYPROC,ENV=PROD,HLQ=PAY.PROD
//STEP1.INPUT DD DSN=PAY.SPECIAL.FILE,DISP=SHR
//*        ↑ Overrides INPUT DD inside MYPROC
//*
//* In-stream PROC:
//CPYPROC  PROC FROM=,TO=
//COPY     EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=&FROM,DISP=SHR
//SYSUT2   DD   DSN=&TO,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2)),DCB=*.SYSUT1
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY
//         PEND
//*
//STEP1    EXEC CPYPROC,
//             FROM='MY.SOURCE.DATA',
//             TO='MY.TARGET.DATA'`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 5: DD STATEMENT (15 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"5.1 — DD Statement Overview", level:"Beginner",
      content:`The DD (Data Definition) statement defines every dataset a program uses. It connects a program's logical file reference to a physical dataset.

Syntax: //ddname DD parameters

DD Name:
  • 1-8 characters, same naming rules
  • Must match what the program expects
  • Standard names: SYSUT1, SYSPRINT, SYSIN, SYSOUT
  • Program-specific names: INFILE, OUTFILE, CUSTMAST

Purpose:
  The DD statement tells z/OS:
  • WHERE the data is (DSN=)
  • HOW to access it (DISP=)
  • WHAT it looks like (DCB=)
  • HOW MUCH space to allocate (SPACE=)
  • WHERE to put it (UNIT=, VOL=)

Categories of DD Statements:
  1. Existing datasets — DSN=name,DISP=SHR
  2. New datasets — DSN=name,DISP=(NEW,CATLG),SPACE=,DCB=
  3. Temporary datasets — DSN=&&TEMP,DISP=(NEW,PASS)
  4. SYSOUT (print/output) — SYSOUT=class
  5. In-stream data — DD * or DD DATA
  6. DUMMY — No I/O performed
  7. Concatenation — Multiple datasets under one DD

💡 Interview Tip: "DD connects program's logical file to physical dataset." Know DSN, DISP, DCB, SPACE.`,
      code:`//* Existing dataset (read):
//INPUT    DD   DSN=MY.MASTER.FILE,DISP=SHR
//*
//* New dataset (create):
//OUTPUT   DD   DSN=MY.NEW.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//*
//* Temporary dataset:
//TEMP     DD   DSN=&&TEMPFILE,
//             DISP=(NEW,PASS),
//             SPACE=(TRK,(50,10))
//*
//* SYSOUT (print):
//SYSPRINT DD   SYSOUT=*
//*
//* In-stream data:
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//*
//* DUMMY (no I/O):
//OPTIONAL DD   DUMMY`
    },

    { title:"5.2 — DSN (Dataset Name)", level:"Beginner",
      content:`DSN (or DSNAME) specifies the name of the dataset.

Syntax: DSN=dataset-name

Naming Rules:
  • Up to 44 characters total
  • Qualifiers separated by periods
  • Each qualifier: 1-8 chars, starts with letter or @/#/$
  • Examples: HARI.PAYROLL.MASTER, SYS1.PROCLIB

  Common patterns:
  HLQ.APPLICATION.FILETYPE.DESCRIPTION
  HARI.PAYROLL.MASTER.DATA
  PROD.GL.DAILY.EXTRACT

Temporary Datasets:
  DSN=&&name — Double ampersand prefix
  • Automatically deleted at job end
  • Can be passed between steps with DISP=(,PASS)
  • System generates a unique name
  • Maximum 8 chars after &&

Referbacks:
  DSN=*.stepname.ddname — Reference a dataset from a previous step
  DSN=*.STEP1.OUTPUT — Use whatever STEP1.OUTPUT resolved to

Member Names (PDS):
  DSN=MY.LIBRARY(MEMBER) — Specific member of a PDS
  DSN=MY.JCL.CNTL(MYJOB) — JCL member MYJOB

GDG (Generation Data Group):
  DSN=MY.GDG.BASE(+1) — Create new generation
  DSN=MY.GDG.BASE(0)  — Current generation
  DSN=MY.GDG.BASE(-1) — Previous generation

💡 Pro Tip: Always use full dataset names. Avoid relying on TSO prefix concatenation in JCL.`,
      code:`//* Standard dataset name:
//INPUT    DD   DSN=PROD.PAYROLL.MASTER.DATA,DISP=SHR
//*
//* Temporary dataset:
//TEMP     DD   DSN=&&SORTWORK,DISP=(NEW,PASS),
//             SPACE=(CYL,(20,10))
//*
//* PDS member:
//SOURCE   DD   DSN=PROD.COBOL.SOURCE(PAYCALC),DISP=SHR
//*
//* Referback:
//STEP1    EXEC PGM=PROG1
//OUTPUT   DD   DSN=MY.STEP1.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2))
//*
//STEP2    EXEC PGM=PROG2
//INPUT    DD   DSN=*.STEP1.OUTPUT,DISP=SHR
//*
//* GDG generations:
//NEWGEN   DD   DSN=MY.DAILY.GDG(+1),
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5))
//CURGEN   DD   DSN=MY.DAILY.GDG(0),DISP=SHR`
    },

    { title:"5.3 — DISP Parameter (Disposition)", level:"Beginner",
      content:`DISP is the most critical DD parameter. It tells z/OS the dataset's status and what to do with it when the step ends.

Syntax: DISP=(status,normal-disposition,abnormal-disposition)

Sub-parameter 1 — Status (what is the dataset now?):
  NEW — Dataset doesn't exist, create it
  OLD — Dataset exists, exclusive access (no sharing)
  SHR — Dataset exists, shared access (others can read)
  MOD — If exists, open for append. If not, create new.

Sub-parameter 2 — Normal Disposition (step ends successfully):
  CATLG — Keep and catalog (register in system catalog)
  KEEP — Keep but don't catalog (rare)
  DELETE — Delete the dataset
  PASS — Pass to next step (temporary handoff)
  UNCATLG — Remove from catalog but keep on disk (rare)

Sub-parameter 3 — Abnormal Disposition (step ABENDs):
  Same options as normal disposition.
  If omitted, defaults to normal disposition.

Defaults:
  If DISP not coded: DISP=(NEW,DELETE,DELETE)
  If only status: DISP=SHR → DISP=(SHR,KEEP,KEEP)
  If no abnormal: DISP=(NEW,CATLG) → DISP=(NEW,CATLG,CATLG)

Common Patterns:
  DISP=SHR — Read existing file (shared)
  DISP=OLD — Update existing file (exclusive)
  DISP=(NEW,CATLG,DELETE) — Create, keep on success, delete on failure
  DISP=(MOD,CATLG) — Append to existing or create new
  DISP=(NEW,PASS) — Create temp, pass to next step

💡 Interview Favorite: Explain DISP=(NEW,CATLG,DELETE): "Create new, catalog on success, delete on failure."`,
      code:`//* Read existing (shared):
//INPUT    DD   DSN=MY.FILE,DISP=SHR
//*
//* Read existing (exclusive):
//MASTER   DD   DSN=MY.FILE,DISP=OLD
//*
//* Create new:
//OUTPUT   DD   DSN=MY.NEW.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),
//             DCB=(RECFM=FB,LRECL=80)
//*
//* Append to existing:
//LOGFILE  DD   DSN=MY.LOG.FILE,DISP=MOD
//*
//* Pass to next step:
//TEMP     DD   DSN=&&WORK,DISP=(NEW,PASS),
//             SPACE=(CYL,(20,10))
//*
//* Delete on success, keep on failure:
//CLEANUP  DD   DSN=MY.OLD.FILE,
//             DISP=(OLD,DELETE,KEEP)`
    },

    { title:"5.4 — SPACE Parameter", level:"Beginner",
      content:`SPACE allocates disk space for new datasets.

Syntax: SPACE=(unit,(primary,secondary,directory),RLSE,,round)

Unit — What to allocate in:
  TRK — Tracks (smallest unit, ~56KB on 3390)
  CYL — Cylinders (15 tracks, ~840KB on 3390)
  blksize — Block size in bytes (z/OS calculates tracks needed)

Primary — Initial allocation. Must be enough for expected data.
Secondary — Extension when primary fills up (up to 15 extensions).
Directory — PDS directory blocks (only for PDS, not PDSE).
RLSE — Release unused space when dataset is closed.

Common Patterns:
  SPACE=(CYL,(100,50),RLSE) — 100 cyls primary, 50 secondary, release unused
  SPACE=(TRK,(10,5)) — Small dataset
  SPACE=(CYL,(500,100),RLSE) — Large dataset
  SPACE=(CYL,(10,5,20)) — PDS with 20 directory blocks

Sizing Guidelines:
  • 1 CYL ≈ 840KB on 3390 disk
  • 1 TRK ≈ 56KB on 3390 disk
  • For FB records: records per track = TRUNC(56664 / LRECL)
  • Always code secondary — without it, no extensions possible
  • RLSE returns unused tracks on CLOSE

SB37 ABEND — Out of Space:
  Primary + (15 × secondary) all filled. Solutions:
  • Increase SPACE
  • Compress PDS (if PDS)
  • Code RLSE on upstream datasets

💡 Pro Tip: Always code RLSE for batch output files. It returns unused space automatically.`,
      code:`//* Small dataset:
//SMALL    DD   DSN=MY.SMALL.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80)
//*
//* Large dataset:
//BIG      DD   DSN=MY.BIG.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(500,100),RLSE),
//             DCB=(RECFM=FB,LRECL=200)
//*
//* PDS (Partitioned Dataset):
//LIBRARY  DD   DSN=MY.NEW.PDS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5,20)),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920,
//             DSORG=PO)
//*
//* Block size allocation:
//BLOCKED  DD   DSN=MY.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(27920,(100,50),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)`
    },

    { title:"5.5 — DCB Parameter", level:"Beginner",
      content:`DCB (Data Control Block) describes the record format and characteristics of a dataset.

Syntax: DCB=(RECFM=xx,LRECL=nnn,BLKSIZE=nnnnn)

RECFM (Record Format):
  F — Fixed length records
  FB — Fixed Blocked (most common for batch)
  V — Variable length
  VB — Variable Blocked
  FBA/VBA — With ASA print control characters
  U — Undefined (load modules)

LRECL (Logical Record Length):
  • Fixed: Exact length of each record (e.g., 80, 100, 200)
  • Variable: Maximum record length including 4-byte RDW

BLKSIZE (Block Size):
  • How many bytes per physical block on disk
  • BLKSIZE=0 — Let system calculate optimal (recommended)
  • For FB: BLKSIZE must be multiple of LRECL
  • Optimal: Use 27920 for 3390 (half-track blocking)
  • Larger blocks = better I/O performance

Common DCB Combinations:
  DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920) — Source code
  DCB=(RECFM=FB,LRECL=100,BLKSIZE=0) — Let system optimize
  DCB=(RECFM=VB,LRECL=32760,BLKSIZE=32764) — Variable
  DCB=(RECFM=FBA,LRECL=133,BLKSIZE=0) — Print with ASA

DCB Referback:
  DCB=*.stepname.ddname — Copy DCB from another DD
  DCB=*.STEP1.INPUT — Useful for matching formats

💡 Pro Tip: Use BLKSIZE=0 and let SMS/system choose. Manual BLKSIZE is legacy practice.`,
      code:`//* Fixed Blocked (most common):
//OUTPUT   DD   DSN=MY.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)
//*
//* System-optimized blocksize:
//OPTIMAL  DD   DSN=MY.FILE2,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//*
//* Variable Blocked:
//VARFILE  DD   DSN=MY.VARFILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=VB,LRECL=32760,BLKSIZE=32764)
//*
//* Print file with ASA control:
//REPORT   DD   DSN=MY.REPORT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE),
//             DCB=(RECFM=FBA,LRECL=133,BLKSIZE=0)
//*
//* DCB referback:
//SORTOUT  DD   DSN=MY.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=*.SORTIN`
    },

    { title:"5.6 — SYSOUT & Print Datasets", level:"Beginner",
      content:`SYSOUT directs output to JES-managed print/spool rather than a physical dataset.

Syntax: //ddname DD SYSOUT=class

SYSOUT Class:
  SYSOUT=* — Use job's MSGCLASS
  SYSOUT=A — Class A (typically print)
  SYSOUT=X — Class X (typically held)

Additional SYSOUT Parameters:
  SYSOUT=(class,,form) — Specify forms
  SYSOUT=*,DEST=dest — Route to destination
  SYSOUT=*,COPIES=3 — Print 3 copies
  SYSOUT=*,HOLD=YES — Hold output

OUTPUT Statement (modern approach):
  //MYOUT   OUTPUT DEST=RMT1,COPIES=3,FORMS=STD
  //REPORT  DD SYSOUT=*,OUTPUT=*.MYOUT

Common DD Names for SYSOUT:
  SYSPRINT — Program messages and reports
  SYSOUT — Utility messages
  SYSLMOD — Load module output
  SYSUDUMP — Formatted dump on ABEND
  SYSABEND — Unformatted dump

💡 Pro Tip: SYSOUT=* is the safest choice — it follows the MSGCLASS setting.`,
      code:`//* Standard output:
//SYSPRINT DD   SYSOUT=*
//*
//* Held output:
//REPORT   DD   SYSOUT=X
//*
//* Multiple copies to printer:
//LISTING  DD   SYSOUT=A,COPIES=3
//*
//* Route to remote destination:
//REMOTE   DD   SYSOUT=*,DEST=NEWYORK
//*
//* Using OUTPUT statement:
//RPTOUT   OUTPUT DEST=RMT1,COPIES=2,FORMS=INVOICE
//INVOICE  DD   SYSOUT=A,OUTPUT=*.RPTOUT
//*
//* Dump DDs (for ABEND debugging):
//SYSUDUMP DD   SYSOUT=*
//SYSABEND DD   SYSOUT=*`
    },

    { title:"5.7 — In-stream Data (DD *, DD DATA)", level:"Beginner",
      content:`In-stream data lets you embed data directly in the JCL stream.

DD * — Data follows, ends with /* or another // statement:
  //SYSIN DD *
  SORT FIELDS=(1,10,CH,A)
  /*

DD DATA — Same but allows // within the data:
  //SYSIN DD DATA
  //THIS LINE IS DATA NOT JCL
  //ANOTHER DATA LINE
  /*

DD DATA,DLM=xx — Custom delimiter:
  //SYSIN DD DATA,DLM=ZZ
  data lines here...
  /* this is data, not delimiter
  ZZ    ← this ends the data

Common Uses:
  • SYSIN for utility control statements (SORT, IDCAMS, IEBGENER)
  • SYSTSIN for TSO commands in IKJEFT01
  • CNTL for program parameters

Rules:
  • In-stream data starts on the line AFTER the DD statement
  • /* on its own line ends the data
  • // in column 1-2 also ends data (for DD *)
  • Data lines are columns 1-80 (column 1 starts the data)
  • No JCL continuation rules apply within data

💡 Pro Tip: Use DD DATA,DLM=xx when your data contains /* or // characters.`,
      code:`//* DD * — standard in-stream data:
//STEP1    EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.OUTPUT,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5))
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A,15,5,ZD,D)
  INCLUDE COND=(20,2,CH,EQ,C'NY')
/*
//SYSOUT   DD   SYSOUT=*
//*
//* DD DATA — allows // in data:
//STEP2    EXEC PGM=IKJEFT01
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   DATA
DSN SYSTEM(DB2P)
RUN PROGRAM(MYPROG) PLAN(MYPLAN) -
    PARMS('/INPUT01')
END
/*
//*
//* Custom delimiter:
//STEP3    EXEC PGM=MYPROG
//INPUT    DD   DATA,DLM=$$
Line with /* in it
Line with // in it
$$`
    },

    { title:"5.8 — DUMMY & Temporary Datasets", level:"Beginner",
      content:`DUMMY suppresses I/O. Temporary datasets exist only during job execution.

DUMMY:
  //ddname DD DUMMY
  • Program's READ returns end-of-file immediately
  • Program's WRITE succeeds but data is discarded
  • Useful for optional files or testing

  Use Cases:
  • Skip optional report: //REPORT DD DUMMY
  • Suppress input: //OPTIONAL DD DUMMY
  • Testing without real data

Temporary Datasets (&&):
  //ddname DD DSN=&&name,DISP=(NEW,PASS)
  • && prefix makes it temporary
  • Deleted automatically at end of job
  • PASS disposition hands to next step
  • Next step receives with DISP=(OLD,DELETE) or DISP=(OLD,PASS)

  Lifecycle:
  STEP1: DSN=&&TEMP,DISP=(NEW,PASS) — Creates and passes
  STEP2: DSN=&&TEMP,DISP=(OLD,DELETE) — Uses and deletes
  Or: DSN=&&TEMP,DISP=(OLD,PASS) — Uses and passes to STEP3

Unnamed Temporary (no DSN):
  //WORK DD SPACE=(CYL,(10,5))
  System generates a unique name. Cannot reference from another step.

💡 Pro Tip: DUMMY is invaluable for testing. Replace real inputs with DUMMY to test downstream steps.`,
      code:`//* DUMMY — suppress I/O:
//STEP1    EXEC PGM=MYPROG
//INFILE   DD   DSN=MY.REAL.INPUT,DISP=SHR
//OUTFILE  DD   DSN=MY.REAL.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(10,5))
//REPORT   DD   DUMMY
//*        ↑ Report generation skipped
//*
//* Temporary datasets between steps:
//STEP1    EXEC PGM=EXTRACT
//OUTPUT   DD   DSN=&&EXTRACT,
//             DISP=(NEW,PASS),
//             SPACE=(CYL,(50,20)),
//             DCB=(RECFM=FB,LRECL=200)
//*
//STEP2    EXEC PGM=SORT
//SORTIN   DD   DSN=&&EXTRACT,DISP=(OLD,PASS)
//SORTOUT  DD   DSN=&&SORTED,
//             DISP=(NEW,PASS),SPACE=(CYL,(50,20))
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//*
//STEP3    EXEC PGM=REPORT
//INPUT    DD   DSN=&&SORTED,DISP=(OLD,DELETE)
//REPORT   DD   SYSOUT=*`
    },

    { title:"5.9 — DD Concatenation", level:"Beginner",
      content:`Concatenation chains multiple datasets under one DD name. The program sees them as one continuous file.

Syntax:
  //ddname DD DSN=FIRST.FILE,DISP=SHR
  //       DD DSN=SECOND.FILE,DISP=SHR
  //       DD DSN=THIRD.FILE,DISP=SHR

The second and third DDs have NO name — they continue the first.

Rules:
  • All concatenated datasets must have compatible record formats
  • Maximum 255 datasets in a concatenation
  • Largest BLKSIZE must be in the FIRST dataset (or code BLKSIZE on first DD)
  • If BLKSIZE varies, code the largest on the first DD

Common Uses:
  STEPLIB — Search multiple load libraries
  Input files — Combine daily files into one stream
  SYSPROC — Multiple REXX/CLIST libraries

Important: BLKSIZE Rule:
  If SECOND.FILE has BLKSIZE=27920 but FIRST.FILE has BLKSIZE=6160, you get S001 ABEND. Fix: Code DCB=(BLKSIZE=27920) on the first DD.

💡 Pro Tip: For STEPLIB, put the most frequently used library first for performance.`,
      code:`//* STEPLIB concatenation:
//STEP1    EXEC PGM=MYPROG
//STEPLIB  DD   DSN=MY.APP.LOADLIB,DISP=SHR
//         DD   DSN=MY.COMMON.LOADLIB,DISP=SHR
//         DD   DSN=SYS1.COBLIB,DISP=SHR
//*
//* Input file concatenation:
//INPUT    DD   DSN=DAILY.FILE.MONDAY,DISP=SHR
//         DD   DSN=DAILY.FILE.TUESDAY,DISP=SHR
//         DD   DSN=DAILY.FILE.WEDNESDAY,DISP=SHR
//*
//* BLKSIZE fix (largest first):
//INPUT    DD   DSN=FILE.BIG.BLOCKS,DISP=SHR,
//             DCB=BLKSIZE=27920
//         DD   DSN=FILE.SMALL.BLOCKS,DISP=SHR`
    },

    { title:"5.10 — UNIT & VOL Parameters", level:"Intermediate",
      content:`UNIT and VOL control where datasets are physically stored.

UNIT — Device type:
  UNIT=SYSDA — Any DASD (Direct Access Storage Device) — most common
  UNIT=SYSALLDA — Any DASD including non-storage-managed
  UNIT=3390 — Specific device type
  UNIT=TAPE — Tape device
  UNIT=(SYSDA,2) — Two volumes

VOL (Volume):
  VOL=SER=volume — Specific volume serial
  VOL=SER=(vol1,vol2) — Multiple volumes
  VOL=REF=*.stepname.ddname — Same volume as another DD

SMS (Storage Management Subsystem):
  In most modern shops, SMS manages storage automatically:
  • STORCLAS — Storage class (performance tier)
  • MGMTCLAS — Management class (retention rules)
  • DATACLAS — Data class (DCB attributes)

  When SMS is active, you often don't need UNIT or VOL at all — SMS assigns them based on dataset name patterns and storage policies.

When to Use UNIT/VOL:
  • Tape processing: UNIT=TAPE required
  • Specific volume placement: VOL=SER=PROD01
  • Multi-volume datasets: UNIT=(SYSDA,2)
  • Non-SMS managed datasets

💡 Pro Tip: In SMS-managed environments, skip UNIT and VOL. SMS handles it. Only code them for tape or special requirements.`,
      code:`//* Standard (SMS-managed, no UNIT needed):
//OUTPUT   DD   DSN=MY.NEW.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//*
//* Specific device:
//TAPE     DD   DSN=MY.BACKUP.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=TAPE,
//             VOL=SER=TAPE01,
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=32760)
//*
//* Specific volume:
//VOLSPEC  DD   DSN=MY.CRITICAL.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             UNIT=SYSDA,
//             VOL=SER=PROD01,
//             SPACE=(CYL,(100,50))
//*
//* Volume referback:
//SAMEVOL  DD   DSN=MY.RELATED.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             VOL=REF=*.STEP1.OUTPUT,
//             SPACE=(CYL,(10,5))`
    },

    { title:"5.11 — Dataset Types & Organization", level:"Intermediate",
      content:`z/OS supports several dataset organizations. Understanding each is fundamental.

Sequential (PS — Physical Sequential):
  • Records stored one after another
  • Read from beginning to end
  • Most common for batch processing
  • DSORG=PS (default for most allocations)

Partitioned (PO — PDS/PDSE):
  PDS — Collection of members, each like a small sequential file
  • Source code, JCL, load modules stored in PDS
  • Has a directory at the beginning
  • Fixed number of directory blocks
  • Members accessed by name: DSN=MY.PDS(MEMBER)

  PDSE — PDS Extended (modern replacement)
  • Dynamic directory (no fixed blocks)
  • Supports sharing better
  • Automatic space reuse when members deleted
  • DSNTYPE=LIBRARY to create PDSE

VSAM (Virtual Storage Access Method):
  • KSDS — Key-Sequenced (like indexed file)
  • ESDS — Entry-Sequenced (append-only)
  • RRDS — Relative Record (by number)
  • LDS — Linear (byte-addressable)
  • Created via IDCAMS DEFINE CLUSTER

HFS/zFS:
  • UNIX file systems on z/OS
  • Used by USS (UNIX System Services)
  • Not typically managed via JCL DDs

💡 Interview Tip: Know PS vs PDS vs VSAM KSDS. Explain when to use each.`,
      code:`//* Sequential dataset:
//SEQFILE  DD   DSN=MY.SEQ.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=100,DSORG=PS)
//*
//* PDS (old style):
//PDSLIB   DD   DSN=MY.SOURCE.PDS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5,50)),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920,
//             DSORG=PO)
//*
//* PDSE (modern):
//PDSELIB  DD   DSN=MY.SOURCE.PDSE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5,1)),
//             DSNTYPE=LIBRARY,
//             DCB=(RECFM=FB,LRECL=80)
//*
//* Access PDS member:
//INPUT    DD   DSN=MY.SOURCE.PDS(MYPROG),DISP=SHR
//*
//* VSAM (defined via IDCAMS, used via DD):
//VSAMFILE DD   DSN=MY.VSAM.KSDS,DISP=SHR`
    },

    { title:"5.12 — GDG (Generation Data Groups)", level:"Intermediate",
      content:`GDGs maintain versions of a dataset. Each run creates a new "generation" while keeping previous ones accessible.

Concept:
  A GDG base is defined in the catalog. Each generation is a separate dataset with a version suffix. Relative references (+1, 0, -1) make JCL generic.

Relative References:
  (+1) — New generation (create)
  (0)  — Current/latest generation (read)
  (-1) — Previous generation (read)
  (-2) — Two generations back (read)

  At submission time, JES resolves relative to absolute:
  MY.DAILY.GDG.G0045V00 (generation 45, version 0)

Creating a GDG Base (via IDCAMS):
  DEFINE GDG (NAME(MY.DAILY.GDG) LIMIT(30) SCRATCH NOEMPTY)
  • LIMIT — Max generations to keep
  • SCRATCH — Delete dataset when uncataloged
  • EMPTY/NOEMPTY — What happens when limit reached

Using in JCL:
  //NEWGEN DD DSN=MY.DAILY.GDG(+1),DISP=(NEW,CATLG,DELETE),SPACE=...
  //CURGEN DD DSN=MY.DAILY.GDG(0),DISP=SHR

Within a single job, +1 created in STEP1 becomes (0) for STEP2 if referenced absolutely. But relative references within the same job all resolve at submission time.

💡 Pro Tip: GDGs are ideal for daily batch cycles. Create (+1) each day, read (0) and (-1) for comparisons.`,
      code:`//* Define GDG base (run once via IDCAMS):
//DEFGDG   EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DEFINE GDG (NAME(MY.DAILY.GDG) -
              LIMIT(30) -
              SCRATCH -
              NOEMPTY)
/*
//*
//* Daily job using GDG:
//DAILY    JOB  (ACCT),'GDG DEMO',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID
//*
//* Create new generation:
//STEP1    EXEC PGM=EXTRACT
//INPUT    DD   DSN=MY.MASTER,DISP=SHR
//OUTPUT   DD   DSN=MY.DAILY.GDG(+1),
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200)
//*
//* Compare today vs yesterday:
//STEP2    EXEC PGM=COMPARE
//TODAY    DD   DSN=MY.DAILY.GDG(+1),DISP=SHR
//YESTER   DD   DSN=MY.DAILY.GDG(0),DISP=SHR
//REPORT   DD   SYSOUT=*`
    },

    { title:"5.13 — LIKE & Model DCB", level:"Intermediate",
      content:`LIKE copies attributes from an existing dataset, saving you from specifying DCB and SPACE manually.

LIKE Parameter:
  //OUTPUT DD DSN=MY.NEW.FILE,LIKE=MY.EXISTING.FILE,
  //           DISP=(NEW,CATLG,DELETE)

  Copies from the model dataset:
  • DCB attributes (RECFM, LRECL, BLKSIZE)
  • SPACE allocation
  • DSNTYPE
  • Does NOT copy data — only attributes

DCB Referback (alternative):
  DCB=*.stepname.ddname — Copy DCB from a DD in a previous step
  //SORTOUT DD DSN=MY.OUTPUT,DCB=*.SORTIN,...

  Only copies DCB (RECFM, LRECL, BLKSIZE), not SPACE.

DATACLAS (SMS Data Class):
  In SMS-managed environments, DATACLAS= provides attributes:
  //OUTPUT DD DSN=MY.FILE,DATACLAS=STDFILE,...
  The data class defines RECFM, LRECL, SPACE, etc.

Order of Precedence:
  1. Explicitly coded parameters on the DD
  2. LIKE model dataset attributes
  3. DATACLAS attributes
  4. DCB referback

💡 Pro Tip: LIKE is cleaner than DCB referback. Use it to ensure consistency across related datasets.`,
      code:`//* LIKE — copy attributes from model:
//OUTPUT   DD   DSN=MY.NEW.FILE,
//             LIKE=MY.EXISTING.FILE,
//             DISP=(NEW,CATLG,DELETE)
//*
//* LIKE with override:
//OUTPUT   DD   DSN=MY.NEW.FILE,
//             LIKE=MY.EXISTING.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(50,20),RLSE)
//*        ↑ SPACE overrides LIKE, DCB comes from LIKE
//*
//* DCB referback:
//STEP1    EXEC PGM=PROG1
//INPUT    DD   DSN=MY.INPUT.FILE,DISP=SHR
//*
//STEP2    EXEC PGM=PROG2
//OUTPUT   DD   DSN=MY.OUTPUT.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             DCB=*.STEP1.INPUT,
//             SPACE=(CYL,(10,5),RLSE)`
    },

    { title:"5.14 — SMS Parameters", level:"Intermediate",
      content:`SMS (Storage Management Subsystem) automates storage management. Most modern z/OS shops use SMS.

SMS Classes:
  STORCLAS (Storage Class) — Performance/availability tier
  • Determines device type, caching, dual-copy
  • Example: STORCLAS=STANDARD, STORCLAS=HIGHPERF

  MGMTCLAS (Management Class) — Lifecycle management
  • Backup frequency, retention period, migration rules
  • Example: MGMTCLAS=DAILY, MGMTCLAS=ARCHIVE30

  DATACLAS (Data Class) — Dataset attributes
  • Predefined RECFM, LRECL, SPACE, etc.
  • Example: DATACLAS=STDFILE, DATACLAS=LARGEFILE

How SMS Works:
  The SMS ACS (Automatic Class Selection) routines examine the dataset name, owner, and other criteria to assign classes automatically. You may not need to code any SMS parameters — the system assigns them based on naming conventions.

When to Code SMS Parameters:
  • Override default assignments
  • Request specific performance tier
  • Specify retention requirements
  • Your shop standards require explicit coding

AVGREC — SMS Space Specification:
  AVGREC=U — Units (actual count)
  AVGREC=K — Thousands
  AVGREC=M — Millions
  SPACE=(lrecl,(primary,secondary)) with AVGREC
  Example: SPACE=(100,(5000,1000)),AVGREC=K — 5 million records

💡 Pro Tip: Check your shop's SMS policies. Most dataset attributes are auto-assigned by naming convention.`,
      code:`//* SMS-managed (classes auto-assigned):
//OUTPUT   DD   DSN=PROD.PAYROLL.EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//*
//* Explicit SMS classes:
//CRITICAL DD   DSN=PROD.CRITICAL.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             STORCLAS=HIGHPERF,
//             MGMTCLAS=DAILY,
//             DATACLAS=LARGEFILE,
//             SPACE=(CYL,(100,50))
//*
//* AVGREC — record-based allocation:
//BIGFILE  DD   DSN=MY.BIG.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(200,(5000,1000)),
//             AVGREC=K,
//             DCB=(RECFM=FB,LRECL=200)`
    },

    { title:"5.15 — Common DD Mistakes & Debugging", level:"Intermediate",
      content:`DD statement errors are the most common JCL failures. Know these patterns to debug quickly.

NOT CATLG 2 (Dataset Already Exists):
  Cause: DISP=(NEW,CATLG) but dataset name already in catalog
  Fix: Delete the existing dataset first, or use DISP=MOD, or use a different name

S013 (Open Error — DCB Mismatch):
  Cause: Program expects different RECFM/LRECL than dataset has
  Fix: Match DCB to actual dataset attributes. Check with LISTCAT or ISPF 3.4

SB37 (Out of Space):
  Cause: Primary + 15 secondary extensions filled
  Fix: Increase SPACE. Code RLSE on upstream. Delete unneeded datasets on the volume.

S001 (I/O Error):
  Cause: Often BLKSIZE mismatch in concatenation
  Fix: Code largest BLKSIZE on first DD in concatenation

SD37 (End of Volume, No Secondary):
  Cause: Secondary space = 0 or not coded
  Fix: Add secondary allocation: SPACE=(CYL,(10,5))

IEC141I (Dataset Not Found):
  Cause: DSN= name doesn't exist in catalog
  Fix: Check spelling, check catalog (LISTCAT), verify HLQ

DISP Confusion:
  • DISP=OLD on a dataset someone else has open → wait/fail
  • DISP=SHR when you need to write → data corruption
  • Forgetting DISP on new dataset → defaults to (NEW,DELETE,DELETE)

💡 Debugging Checklist:
  1. Check JESYSMSG for allocation messages
  2. Verify dataset exists (ISPF 3.4 or LISTCAT)
  3. Compare JCL DCB with actual dataset DCB
  4. Check SPACE allocation vs data volume
  5. Verify DISP matches your intent`,
      code:`//* Fix NOT CATLG 2 — delete first:
//CLEANUP  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.OUTPUT.FILE PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//STEP1    EXEC PGM=MYPROG
//OUTPUT   DD   DSN=MY.OUTPUT.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//*
//* Fix SB37 — increase space:
//BIGOUT   DD   DSN=MY.BIG.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(500,100),RLSE)
//*
//* Fix S001 — concatenation BLKSIZE:
//INPUT    DD   DSN=FILE.LARGE.BLK,DISP=SHR,
//             DCB=BLKSIZE=27920
//         DD   DSN=FILE.SMALL.BLK,DISP=SHR
//*
//* Check dataset attributes:
//LISTIT   EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  LISTCAT ENT(MY.OUTPUT.FILE) ALL
/*`
    },


    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 6: JCL PROCEDURES (8 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"6.1 — What Are Procedures?", level:"Intermediate",
      content:`Procedures (PROCs) are pre-written, reusable JCL stored in a procedure library. They standardize processing and reduce duplication.

Types:
  Catalogued PROCs — Stored in a PDS (SYS1.PROCLIB or JCLLIB ORDER libraries)
  In-stream PROCs — Coded within the JCL between PROC and PEND statements

Benefits:
  • One change updates all jobs using the PROC
  • Standardized processing across teams
  • Less JCL to maintain
  • Fewer errors (tested once, used many times)
  • Symbolic parameters make PROCs flexible

PROC Statement: //name PROC parameter-defaults
PEND Statement: // PEND (ends in-stream PROC)

💡 Pro Tip: Every compile-link-go, sort, backup, and utility job should be a PROC.`,
      code:`//* In-stream PROC:
//CPYPROC  PROC FROM=,TO=,RECFM=FB,LRECL=80
//COPY     EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=&FROM,DISP=SHR
//SYSUT2   DD   DSN=&TO,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE),
//             DCB=(RECFM=&RECFM,LRECL=&LRECL,BLKSIZE=0)
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY
//         PEND
//*
//* Invoke the PROC:
//STEP1    EXEC CPYPROC,
//             FROM='MY.SOURCE.DATA',
//             TO='MY.TARGET.DATA'`
    },

    { title:"6.2 — Symbolic Parameters", level:"Intermediate",
      content:`Symbolic parameters make PROCs flexible. They're variables replaced at invocation time.

Syntax: &SYMBOL (ampersand + 1-8 character name)

Defining Defaults (in PROC statement):
  //MYPROC PROC HLQ=DEFAULT,ENV=TEST,LRECL=80

Overriding at Invocation:
  //STEP1 EXEC MYPROC,HLQ=PROD.PAY,ENV=PROD

Resolution Rules:
  • Coded value on EXEC overrides PROC default
  • If no value and no default → JCL error
  • &SYSUID = current TSO user (system symbol)
  • Double ampersand && for temp datasets (not symbolic)

In Dataset Names:
  DSN=&HLQ..MASTER.DATA → PROD.PAY.MASTER.DATA
  Note the double period (..) — first period ends the symbol, second is the DSN qualifier separator.

SET Statement:
  //  SET ENV=PROD
  Sets symbols outside of PROCs. Can be overridden by subsequent SET statements.

💡 Common Mistake: Forgetting the double period. &HLQ.MASTER resolves to PROD.PAYMASTER (no separator).`,
      code:`//* PROC with symbolic parameters:
//RUNPROC  PROC HLQ=TEST.PAY,ENV=TEST,
//             PROG=PAYCALC,LR=200
//RUN      EXEC PGM=&PROG,REGION=0M
//STEPLIB  DD   DSN=&HLQ..LOADLIB,DISP=SHR
//INPUT    DD   DSN=&HLQ..MASTER.DATA,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..&ENV..EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=&LR,BLKSIZE=0)
//SYSPRINT DD   SYSOUT=*
//         PEND
//*
//* Test invocation:
//TEST     EXEC RUNPROC
//*        Uses defaults: HLQ=TEST.PAY, ENV=TEST
//*
//* Production invocation:
//PROD     EXEC RUNPROC,
//             HLQ=PROD.PAY,ENV=PROD,PROG=PAYCALC`
    },

    { title:"6.3 — PROC Overrides", level:"Intermediate",
      content:`You can override or add DD statements in a PROC without modifying the PROC itself.

DD Override Syntax: //procstep.ddname DD parameters
  //STEP1.SYSPRINT DD SYSOUT=X   ← Override SYSPRINT in STEP1 of PROC

Adding a New DD: Same syntax — if ddname doesn't exist in PROC, it's added.
  //STEP1.STEPLIB DD DSN=MY.TEST.LOAD,DISP=SHR

Override Rules:
  • Must reference procstep.ddname format
  • Override replaces the entire DD (not individual parameters)
  • Order matters: overrides must appear in the same order as in the PROC
  • You can override DDs from any step in the PROC

Overriding EXEC Parameters:
  //STEP1 EXEC MYPROC,PARM.COMPILE='MAP',REGION.GO=512M,TIME.LINK=5
  Format: PARM.procstep=value

Common Override Scenario:
  Production PROC uses PROD datasets. For testing, override to TEST datasets:
  //TEST EXEC PAYPROC
  //RUN.INPUT DD DSN=TEST.PAY.MASTER,DISP=SHR
  //RUN.OUTPUT DD DSN=TEST.PAY.EXTRACT,DISP=(NEW,CATLG,DELETE),SPACE=(TRK,(5,2))

💡 Pro Tip: Overrides let you test with different data without touching the PROC.`,
      code:`//* PROC definition:
//PAYPROC  PROC
//EXTRACT  EXEC PGM=PAYEXT
//STEPLIB  DD   DSN=PROD.PAY.LOADLIB,DISP=SHR
//INPUT    DD   DSN=PROD.PAY.MASTER,DISP=SHR
//OUTPUT   DD   DSN=PROD.PAY.EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(50,20),RLSE)
//SYSPRINT DD   SYSOUT=*
//         PEND
//*
//* Invoke with overrides for testing:
//STEP1    EXEC PAYPROC
//EXTRACT.STEPLIB DD DSN=TEST.PAY.LOADLIB,DISP=SHR
//EXTRACT.INPUT DD DSN=TEST.PAY.MASTER,DISP=SHR
//EXTRACT.OUTPUT DD DSN=TEST.PAY.EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(5,2),RLSE)`
    },

    { title:"6.4 — JCLLIB & PROC Libraries", level:"Intermediate",
      content:`JCLLIB tells JES where to find PROCs and INCLUDE members.

Syntax: // JCLLIB ORDER=(lib1,lib2,lib3)

Rules:
  • Must appear after JOB, before first EXEC
  • Specifies search order for PROCs and INCLUDE members
  • Up to 15 libraries
  • Libraries searched in order specified

Search Order for PROCs:
  1. In-stream PROCs (within the JCL)
  2. JCLLIB ORDER libraries (in order)
  3. System PROCLIB (SYS1.PROCLIB and JES2 PROCLIB concatenation)

Without JCLLIB:
  Only system PROCLIB is searched. Your custom PROCs won't be found.

Multiple JCLLIB:
  Only ONE JCLLIB statement is allowed per job. Combine all libraries in the ORDER.

💡 Pro Tip: Always code JCLLIB when using custom PROCs. Put your application PROC library first, then common, then system.`,
      code:`//MYJOB    JOB  (ACCT),'JCLLIB DEMO',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//*
//* JCLLIB — search order for PROCs:
//         JCLLIB ORDER=(MY.APP.PROCLIB,
//             MY.COMMON.PROCLIB,
//             SYS1.PROCLIB)
//*
//* Now JES finds PROCs in these libraries:
//STEP1    EXEC MYAPPPROC
//STEP2    EXEC COMMONPROC
//STEP3    EXEC SYSTEMPROC`
    },

    { title:"6.5 — INCLUDE Statement", level:"Intermediate",
      content:`INCLUDE pulls in JCL from a PDS member at the point where it appears. It's like a macro or copy/paste at JES time.

Syntax: // INCLUDE MEMBER=membername

The member is fetched from JCLLIB ORDER libraries. It can contain any JCL except JOB statements.

Common Uses:
  • Standard DD groups (STEPLIB concatenation, SYSOUT DDs)
  • Environment-specific overrides
  • Standard utility steps

Example:
  INCLUDE member STDLIBS contains:
    //STEPLIB DD DSN=PROD.COMMON.LOAD,DISP=SHR
    //        DD DSN=PROD.DB2.LOAD,DISP=SHR

  In your JCL:
    //STEP1 EXEC PGM=MYPROG
    //      INCLUDE MEMBER=STDLIBS
    //INPUT DD DSN=MY.DATA,DISP=SHR

Rules:
  • INCLUDE cannot be inside in-stream data (DD *)
  • INCLUDE cannot contain another INCLUDE (no nesting)
  • The included JCL is inserted as-is
  • JCLLIB must be coded for INCLUDE to find members

💡 Pro Tip: INCLUDE + JCLLIB = modular JCL. Define standard components once, include everywhere.`,
      code:`//* Job with INCLUDE:
//MYJOB    JOB  (ACCT),'INCLUDE DEMO',
//             CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//         JCLLIB ORDER=(MY.JCL.INCLUDE)
//*
//STEP1    EXEC PGM=MYPROG
//*
//* Pull in standard library DDs:
//         INCLUDE MEMBER=STDLIBS
//*
//* Pull in standard output DDs:
//         INCLUDE MEMBER=STDOUT
//*
//INPUT    DD   DSN=MY.INPUT.FILE,DISP=SHR
//OUTPUT   DD   DSN=MY.OUTPUT.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)`
    },

    { title:"6.6 — Nested PROCs", level:"Advanced",
      content:`A PROC can invoke another PROC, creating nested (cascaded) procedures.

JES2 supports up to 15 levels of nesting. Each level expands the called PROC within the calling PROC.

When to Use:
  • COMPILE PROC calls LINK PROC which calls BIND PROC
  • Standard processing chains
  • Layered application architectures

Overriding Nested PROCs:
  //STEP1 EXEC OUTER,PARM.INNER.COMPILE='MAP'
  Format: PARM.outerstep.innerstep=value

Considerations:
  • Deep nesting makes JCL hard to debug
  • MSGLEVEL=(1,1) shows full expansion (//++ lines)
  • Most shops limit nesting to 2-3 levels
  • Symbolic parameters pass through levels

💡 Pro Tip: Keep nesting shallow. 2 levels is common, 3 is maximum for readability.`,
      code:`//* INNERPROC (in PROC library):
//INNERP   PROC PROG=IEFBR14
//RUN      EXEC PGM=&PROG
//SYSPRINT DD   SYSOUT=*
//         PEND
//*
//* OUTERPROC calls INNERPROC:
//OUTERP   PROC ENV=TEST
//SETUP    EXEC PGM=IEFBR14
//MAIN     EXEC INNERP,PROG=MYPROG
//         PEND
//*
//* Job invokes outer (which invokes inner):
//MYJOB    JOB  (ACCT),'NESTED',CLASS=A,MSGCLASS=X
//         JCLLIB ORDER=(MY.PROCLIB)
//STEP1    EXEC OUTERP,ENV=PROD
//MAIN.RUN.STEPLIB DD DSN=PROD.LOADLIB,DISP=SHR`
    },

    { title:"6.7 — Compile-Link-Go PROC", level:"Intermediate",
      content:`The most common PROC pattern in mainframe development: compile COBOL source, link-edit the object module, and execute the resulting program.

Three Steps:
  COMPILE — Run the COBOL compiler (IGYCRCTL) to produce an object module
  LINK — Run the linkage editor (IEWL) to create a load module
  GO — Execute the program

This PROC is used hundreds of times daily in every COBOL shop. IBM provides standard PROCs like IGYWCLG, but most shops customize their own.

Each step has specific DD requirements. Understanding them is essential for debugging compile/link errors.

💡 Pro Tip: Know the standard compile-link-go DDs. Interviewers love asking about them.`,
      code:`//* Compile-Link-Go PROC:
//COBCLG   PROC MEMBER=,
//             SRCLIB='MY.COBOL.SOURCE',
//             LNKLIB='MY.LOAD.LIBRARY'
//*
//* STEP1: COMPILE
//COMPILE  EXEC PGM=IGYCRCTL,
//             PARM='LIB,MAP,XREF,OFFSET',
//             REGION=0M
//STEPLIB  DD   DSN=SYS1.SIGYCOMP,DISP=SHR
//SYSIN    DD   DSN=&SRCLIB(&MEMBER),DISP=SHR
//SYSLIB   DD   DSN=MY.COPYBOOK.LIB,DISP=SHR
//SYSLIN   DD   DSN=&&OBJ,DISP=(NEW,PASS),
//             SPACE=(TRK,(10,5))
//SYSPRINT DD   SYSOUT=*
//SYSUT1   DD   SPACE=(TRK,(10,10))
//SYSUT5   DD   SPACE=(TRK,(10,10))
//*
//* STEP2: LINK-EDIT
//LINK     EXEC PGM=IEWL,PARM='MAP,LIST',
//             COND=(4,LT,COMPILE)
//SYSLIN   DD   DSN=&&OBJ,DISP=(OLD,DELETE)
//SYSLMOD  DD   DSN=&LNKLIB(&MEMBER),DISP=SHR
//SYSPRINT DD   SYSOUT=*
//SYSUT1   DD   SPACE=(TRK,(10,10))
//*
//* STEP3: GO (execute)
//GO       EXEC PGM=*.LINK.SYSLMOD,
//             COND=((4,LT,COMPILE),(4,LT,LINK))
//STEPLIB  DD   DSN=&LNKLIB,DISP=SHR
//SYSOUT   DD   SYSOUT=*
//         PEND
//*
//* Invoke:
//STEP1    EXEC COBCLG,MEMBER=PAYCALC`
    },

    { title:"6.8 — PROC Best Practices", level:"Intermediate",
      content:`Design PROCs for maximum reuse, clarity, and maintainability.

Design Principles:
  • Single responsibility — each PROC does one logical thing
  • Meaningful symbolic parameters with good defaults
  • Document all symbols in PROC header comments
  • Keep PROCs in version-controlled libraries
  • Test PROCs thoroughly before promoting to production

Naming Conventions:
  • PROC name = function: COBCOMP, SRTUTIL, BKUPDLY
  • Symbolic names = descriptive: &INPUTDS, &OUTFILE, &ENV

Default Values:
  • Provide sensible defaults for all symbols
  • Use TEST environment as default (safer)
  • Override to PROD at invocation

Error Handling:
  • Code COND parameters between steps
  • Include cleanup steps with COND=EVEN
  • Return meaningful codes from utility steps

Documentation:
  Comment block at top of PROC: purpose, parameters, examples, change log.

💡 Pro Tip: A well-designed PROC library is one of the most valuable assets in a mainframe shop.`,
      code:`//*============================================================*
//*  PROC: SORTUTIL — Standard Sort Procedure                  *
//*  PARMS:                                                    *
//*    &INFILE  — Input dataset (required)                     *
//*    &OUTFILE — Output dataset (required)                    *
//*    &SORTFLD — SORT FIELDS string (required)                *
//*    &INCL    — INCLUDE condition (optional)                 *
//*    &SPACE   — Output space in CYL (default: 50)            *
//*  EXAMPLE:                                                  *
//*    //S1 EXEC SORTUTIL,                                     *
//*    //       INFILE='MY.INPUT',                             *
//*    //       OUTFILE='MY.OUTPUT',                           *
//*    //       SORTFLD='(1,10,CH,A)'                          *
//*============================================================*
//SORTUTIL PROC INFILE=,OUTFILE=,SORTFLD=,
//             INCL=,SPACE=50
//SORT     EXEC PGM=SORT,REGION=0M
//SORTIN   DD   DSN=&INFILE,DISP=SHR
//SORTOUT  DD   DSN=&OUTFILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(&SPACE,10),RLSE),
//             DCB=*.SORTIN
//SYSIN    DD   *,SYMBOLS=JCLONLY
  SORT FIELDS=&SORTFLD
  &INCL
/*
//SYSOUT   DD   SYSOUT=*
//         PEND`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 7: CONDITIONAL PROCESSING (5 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"7.1 — IF/THEN/ELSE/ENDIF", level:"Intermediate",
      content:`IF/THEN/ELSE/ENDIF is the modern way to control step execution. Much clearer than COND.

Syntax:
  //name IF condition THEN
  //stepname EXEC ...
  //name ELSE
  //stepname EXEC ...
  //name ENDIF

Condition Operators:
  RC — Return code of a step
  ABEND — Whether a step ABENDed
  ABENDCC — ABEND code
  RUN — Whether a step actually ran

Comparison Operators: =, !=, >, <, >=, <=, GT, LT, GE, LE, EQ, NE
Logical Operators: AND (&), OR (|), NOT (¬)

Examples:
  IF STEP1.RC = 0 THEN — If STEP1 succeeded
  IF STEP1.RC <= 4 THEN — If STEP1 OK or warning
  IF STEP1.ABEND THEN — If STEP1 ABENDed
  IF (STEP1.RC = 0) & (STEP2.RC = 0) THEN — Both succeeded

💡 Pro Tip: Always prefer IF/THEN/ELSE over COND. It reads like English and is self-documenting.`,
      code:`//* Basic IF/THEN/ELSE:
//STEP1    EXEC PGM=EXTRACT
//*
//CHK1     IF  STEP1.RC = 0 THEN
//STEP2    EXEC PGM=SORT
//CHK1     ELSE
//ERRSTEP  EXEC PGM=ERRRPT
//CHK1     ENDIF
//*
//* Multiple conditions:
//CHK2     IF  (STEP1.RC <= 4) & (STEP2.RC = 0) THEN
//STEP3    EXEC PGM=LOAD
//CHK2     ENDIF
//*
//* ABEND check:
//CHK3     IF  STEP1.ABEND THEN
//RECOVER  EXEC PGM=RECOVER
//CHK3     ENDIF
//*
//* Nested IF:
//CHK4     IF  STEP1.RC = 0 THEN
//CHK5     IF  STEP2.RC = 0 THEN
//STEP3    EXEC PGM=FINAL
//CHK5     ENDIF
//CHK4     ENDIF`
    },

    { title:"7.2 — Complex IF Conditions", level:"Intermediate",
      content:`IF statements can combine multiple conditions for sophisticated flow control.

AND Conditions:
  IF (STEP1.RC = 0) & (STEP2.RC = 0) THEN
  Both must be true.

OR Conditions:
  IF (STEP1.RC > 4) | (STEP2.RC > 4) THEN
  Either can be true.

NOT Conditions:
  IF ¬STEP1.ABEND THEN — If STEP1 did NOT ABEND
  IF ¬(STEP1.RC = 0) THEN — If STEP1 RC is NOT 0

Mixed:
  IF ((STEP1.RC = 0) | (STEP1.RC = 4)) & ¬STEP2.ABEND THEN
  "If STEP1 returned 0 or 4, AND STEP2 did not ABEND"

RUN Condition:
  IF STEP1.RUN THEN — If STEP1 actually executed (wasn't flushed)
  Useful to check if a step was skipped by a prior IF.

ABENDCC:
  IF STEP1.ABENDCC = S0C7 THEN — Specific ABEND code check
  IF STEP1.ABENDCC = U1000 THEN — User ABEND check

💡 Pro Tip: Use parentheses generously in complex conditions. Clarity prevents logic errors.`,
      code:`//* AND — both must succeed:
//BOTH     IF  (STEP1.RC = 0) & (STEP2.RC <= 4) THEN
//STEP3    EXEC PGM=PROCESS
//BOTH     ENDIF
//*
//* OR — either failure triggers error:
//EITHE    IF  (STEP1.RC > 4) | (STEP2.RC > 4) THEN
//ERROR    EXEC PGM=ERRRPT
//EITHE    ENDIF
//*
//* NOT — didn't abend:
//NOABN    IF  ¬STEP1.ABEND THEN
//NEXT     EXEC PGM=CONTINUE
//NOABN    ENDIF
//*
//* Complex combined:
//CMPLX    IF  ((STEP1.RC = 0) | (STEP1.RC = 4)) &
//             ¬STEP2.ABEND & (STEP3.RUN) THEN
//FINAL    EXEC PGM=FINALIZE
//CMPLX    ENDIF`
    },

    { title:"7.3 — COND vs IF/THEN/ELSE", level:"Intermediate",
      content:`Both control step execution. IF/THEN/ELSE is modern and preferred. But you MUST know COND because legacy JCL is everywhere.

COND (Old Way):
  Tests whether to SKIP a step. TRUE = SKIP.
  COND=(4,LT,STEP1) — If 4 < STEP1.RC (RC > 4), skip.
  Confusing because it's the opposite of how we think.

IF/THEN/ELSE (Modern Way):
  Tests whether to EXECUTE a step. TRUE = EXECUTE.
  IF STEP1.RC <= 4 THEN — If RC ≤ 4, execute.
  Reads like English.

Migration Example:
  Old: //STEP3 EXEC PGM=PROG3,COND=((4,LT,STEP1),(0,NE,STEP2))
  "Skip STEP3 if STEP1 RC > 4 OR STEP2 RC ≠ 0"

  New: //CHK IF (STEP1.RC <= 4) & (STEP2.RC = 0) THEN
       //STEP3 EXEC PGM=PROG3
       //CHK ENDIF
  "Execute STEP3 if STEP1 RC ≤ 4 AND STEP2 RC = 0"

When COND Still Used:
  • Legacy JCL (don't rewrite just for style)
  • COND=EVEN and COND=ONLY (run despite/because of ABEND)
  • Simple single-condition cases

💡 Interview Tip: Know both. Explain that you prefer IF/THEN/ELSE but can read COND.`,
      code:`//* COND (old way) — confusing:
//STEP1    EXEC PGM=PROG1
//STEP2    EXEC PGM=PROG2,COND=(0,NE,STEP1)
//* "Skip STEP2 if 0 ≠ STEP1.RC"
//* = "Skip STEP2 if STEP1 failed"
//*
//* IF/THEN (new way) — clear:
//STEP1    EXEC PGM=PROG1
//CHK1     IF  STEP1.RC = 0 THEN
//STEP2    EXEC PGM=PROG2
//CHK1     ENDIF
//* "Execute STEP2 if STEP1 succeeded"
//*
//* COND=EVEN — still useful:
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN
//DELTEMP  DD   DSN=&&TEMP,DISP=(OLD,DELETE)
//* Runs even after ABEND — no IF equivalent`
    },

    { title:"7.4 — Step Return Code Management", level:"Intermediate",
      content:`Managing return codes is how you control job flow. Every step sets an RC that subsequent steps can check.

Standard Return Codes:
  0 — Success
  4 — Warning (usually acceptable)
  8 — Error (needs investigation)
  12 — Severe error
  16 — Terminal error

Setting RC in Programs:
  COBOL: MOVE 0 TO RETURN-CODE
  IDCAMS: SET MAXCC = 0
  SORT: Returns 0 (success), 16 (failure)

IDCAMS Return Codes:
  0 — Success
  4 — Warning (e.g., dataset not found for DELETE)
  8 — Error
  12 — Severe
  Common pattern: IF LASTCC = 8 THEN SET MAXCC = 0
  (Ignore "dataset not found" error for DELETE)

JOBRC Parameter (on JOB):
  JOBRC=MAXRC — Job RC = highest step RC (default)
  JOBRC=LASTRC — Job RC = last executed step RC

Checking with IF:
  IF STEP1.RC = 0 THEN — Exact match
  IF STEP1.RC <= 4 THEN — Acceptable range
  IF STEP1.RC > 8 THEN — Severe error

💡 Pro Tip: In schedulers (CA-7, TWS), the JOB RC determines if successor jobs trigger. JOBRC=MAXRC is safest.`,
      code:`//* Return code-driven flow:
//MYJOB    JOB  (ACCT),'RC DEMO',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID,
//             JOBRC=MAXRC
//*
//STEP1    EXEC PGM=EXTRACT
//STEP2    EXEC PGM=VALIDATE
//*
//* Branch on RC:
//CHK      IF  (STEP1.RC = 0) & (STEP2.RC <= 4) THEN
//STEP3    EXEC PGM=LOAD
//CHK      ELSE
//ERRSTEP  EXEC PGM=ERRRPT
//CHK      ENDIF
//*
//* Always run cleanup:
//CLEANUP  EXEC PGM=IDCAMS,COND=EVEN
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.TEMP.FILE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*`
    },

    { title:"7.5 — Practical Conditional Patterns", level:"Intermediate",
      content:`Real-world conditional patterns used daily in production jobs.

Pattern 1 — Skip-on-Error:
  Run STEP2 only if STEP1 succeeded. Most common pattern.

Pattern 2 — Error Report:
  If any step fails, generate an error report.

Pattern 3 — Cleanup Always:
  Delete temp files regardless of success/failure (COND=EVEN).

Pattern 4 — Multi-Path:
  Different processing based on RC values (0=normal, 4=exception, 8+=error).

Pattern 5 — Conditional Delete-and-Create:
  Delete existing output (ignore if not found), then create new.

💡 Pro Tip: The DELETE + IF LASTCC=8 THEN SET MAXCC=0 pattern is in virtually every production job.`,
      code:`//* Pattern 1: Skip-on-Error
//STEP1    EXEC PGM=EXTRACT
//C1       IF STEP1.RC = 0 THEN
//STEP2    EXEC PGM=TRANSFORM
//C1       ENDIF
//*
//* Pattern 2: Error Report
//C2       IF STEP1.RC > 4 THEN
//ERRRPT   EXEC PGM=SENDALERT
//C2       ENDIF
//*
//* Pattern 3: Cleanup Always
//CLEANUP  EXEC PGM=IDCAMS,COND=EVEN
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.TEMP.WORK1
  IF LASTCC = 8 THEN SET MAXCC = 0
  DELETE MY.TEMP.WORK2
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//*
//* Pattern 5: Delete-then-Create
//DELETE   EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.OUTPUT.FILE PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//CREATE   EXEC PGM=MYPROG
//OUTPUT   DD   DSN=MY.OUTPUT.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 8: JCL UTILITIES (15 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"8.1 — IDCAMS: DELETE & DEFINE", level:"Intermediate",
      content:`IDCAMS (Access Method Services) is the primary utility for dataset management. DELETE and DEFINE are its most-used commands.

DELETE:
  DELETE dataset-name [PURGE] [NOSCRATCH] [ERASE]
  • PURGE — Override retention period
  • NOSCRATCH — Uncatalog only (don't delete from disk)
  • Handles VSAM and non-VSAM

DEFINE CLUSTER (VSAM):
  DEFINE CLUSTER (NAME(my.vsam.file) -
    INDEXED/NONINDEXED/NUMBERED -
    RECORDSIZE(avg max) -
    KEYS(length offset) -
    SHAREOPTIONS(2 3)) -
  DATA (CYLINDERS(10 5)) -
  INDEX (CYLINDERS(1 1))

Error Handling: IF LASTCC = 8 THEN SET MAXCC = 0
  Suppresses "not found" error on DELETE.

💡 Interview Tip: Know DELETE + IF LASTCC pattern. Used in every production shop.`,
      code:`//IDCSTEP  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  /* Delete existing (ignore not found) */
  DELETE MY.VSAM.KSDS CLUSTER PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
  /* Define new VSAM KSDS */
  DEFINE CLUSTER -
    (NAME(MY.VSAM.KSDS) -
     INDEXED -
     RECORDSIZE(200 200) -
     KEYS(10 0) -
     SHAREOPTIONS(2 3)) -
  DATA -
    (NAME(MY.VSAM.KSDS.DATA) -
     CYLINDERS(50 20) -
     FREESPACE(10 10)) -
  INDEX -
    (NAME(MY.VSAM.KSDS.INDEX) -
     CYLINDERS(5 2))
/*`
    },

    { title:"8.2 — IDCAMS: REPRO & PRINT", level:"Intermediate",
      content:`REPRO copies data between datasets. PRINT displays dataset contents. Both essential for testing and debugging.

REPRO:
  REPRO INFILE(ddname) OUTFILE(ddname) [COUNT(n)] [SKIP(n)] [REPLACE/NOREPLACE]
  • Copies VSAM to VSAM, VSAM to sequential, sequential to VSAM
  • COUNT — Copy only n records
  • SKIP — Skip first n records
  • REPLACE — Replace existing records in target (KSDS)

PRINT:
  PRINT INFILE(ddname) [CHARACTER/HEX/DUMP] [COUNT(n)] [SKIP(n)] [FROMKEY(key)/TOKEY(key)]
  • CHARACTER — Readable text
  • HEX — Hex display
  • DUMP — Both character and hex

💡 Pro Tip: REPRO with COUNT is great for creating test data subsets.`,
      code:`//REPSTEP  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//INDD     DD   DSN=PROD.VSAM.MASTER,DISP=SHR
//OUTDD    DD   DSN=TEST.VSAM.MASTER,DISP=SHR
//SEQOUT   DD   DSN=MY.SEQ.BACKUP,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,10),RLSE)
//SYSIN    DD   *
  /* Copy first 1000 records to test VSAM */
  REPRO INFILE(INDD) OUTFILE(OUTDD) -
    COUNT(1000) REPLACE
  /* Backup VSAM to sequential */
  REPRO INFILE(INDD) OUTFILE(SEQOUT)
  /* Print first 50 records */
  PRINT INFILE(INDD) CHARACTER COUNT(50)
/*`
    },

    { title:"8.3 — SORT (DFSORT/ICEMAN)", level:"Intermediate",
      content:`DFSORT is the most-used utility on z/OS. Sorts, copies, reformats, selects, and summarizes data.

Basic Sort:
  SORT FIELDS=(start,length,format,order,...)
  Formats: CH (character), ZD (zoned decimal), PD (packed), BI (binary), FI (fixed integer)
  Order: A (ascending), D (descending)

INCLUDE/OMIT:
  INCLUDE COND=(start,length,format,operator,value)
  OMIT COND=(start,length,format,operator,value)
  Operators: EQ, NE, GT, LT, GE, LE

OUTREC (Reformat):
  OUTREC FIELDS=(start,length,...) — Select/reorder fields
  OUTREC BUILD=(start:length,...) — More flexible format

SUM (Summarize):
  SUM FIELDS=(start,length,format,...) — Add numeric fields for duplicate keys
  SUM FIELDS=NONE — Remove duplicates (keep first)

💡 Pro Tip: DFSORT can replace many COBOL programs. Learn OUTREC and INREC for data transformation.`,
      code:`//SORTSTEP EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT.FILE,DISP=SHR
//SORTOUT  DD   DSN=MY.SORTED.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
* Sort by department (1-4) then name (5-30):
  SORT FIELDS=(1,4,CH,A,5,26,CH,A)
* Only include active employees:
  INCLUDE COND=(50,1,CH,EQ,C'A')
* Reformat output (select fields):
  OUTREC FIELDS=(1,4,      dept
                 5,26,      name
                 40,10,ZD,  salary
                 80:X)      newline
* Remove duplicates by dept:
  SUM FIELDS=NONE
/*`
    },

    { title:"8.4 — SORT: INREC, OUTREC & BUILD", level:"Intermediate",
      content:`INREC processes records BEFORE sorting. OUTREC processes AFTER. Both use the same syntax.

INREC — Modify input records before sort:
  INREC FIELDS=(1,50) — Truncate to 50 bytes
  INREC BUILD=(1,10,C' - ',15,20) — Reformat with literals

OUTREC — Modify output records after sort:
  OUTREC BUILD=(1,10,20:5,8) — Place fields at specific positions

BUILD Syntax:
  position,length — Copy field
  C'literal' — Insert literal string
  X'hexvalue' — Insert hex value
  position:length — Start at output position
  SEQNUM,8,ZD — Insert sequence number

IFTHEN — Conditional processing:
  INREC IFTHEN=(WHEN=(1,1,CH,EQ,C'H'),BUILD=(C'HEADER:',8,60))
  INREC IFTHEN=(WHEN=NONE,BUILD=(C'DETAIL:',8,60))

Common Transformations:
  • Add headers/trailers
  • Convert date formats
  • Concatenate fields
  • Pad with spaces/zeros

💡 Pro Tip: DFSORT IFTHEN can replace hundreds of lines of COBOL for simple data transformations.`,
      code:`//SORTSTEP EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
* INREC: Reformat before sorting
  INREC BUILD=(1,10,          employee ID
               C',',          comma
               15,30,         name
               C',',          comma
               50,10,ZD,      salary
               SEQNUM,8,ZD)   sequence number
* Sort by salary descending:
  SORT FIELDS=(50,10,ZD,D)
* OUTREC: Add header
  OUTREC IFTHEN=(WHEN=INIT,
    BUILD=(C'EMPID,NAME,SALARY,SEQ'))
  OUTREC IFTHEN=(WHEN=NONE,
    BUILD=(1,60))
/*`
    },

    { title:"8.5 — IEBGENER: Sequential Copy", level:"Beginner",
      content:`IEBGENER copies one sequential dataset to another. Simple but frequently used.

Required DDs:
  SYSUT1 — Input dataset
  SYSUT2 — Output dataset
  SYSPRINT — Messages
  SYSIN — Control statements (DUMMY for simple copy)

With SYSIN DUMMY: Straight copy from SYSUT1 to SYSUT2.
With SYSIN control: Can rename members, generate data, reformat.

Modern Alternative: ICEGENER (DFSORT wrapper). Many shops alias IEBGENER to ICEGENER for better performance.

💡 Pro Tip: For simple copies, IEBGENER with SYSIN DUMMY is the fastest JCL to write.`,
      code:`//* Simple sequential copy:
//COPY     EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.SOURCE.DATA,DISP=SHR
//SYSUT2   DD   DSN=MY.TARGET.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=*.SYSUT1
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY
//*
//* Copy to SYSOUT (print):
//PRINT    EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.DATA,DISP=SHR
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY`
    },

    { title:"8.6 — IEBCOPY: PDS Copy/Compress", level:"Intermediate",
      content:`IEBCOPY copies, compresses, and manages Partitioned Datasets.

Functions:
  • COPY — Copy members between PDS/PDSE
  • COMPRESS — Reclaim unused space in a PDS (in-place)
  • UNLOAD — Create a sequential backup of a PDS
  • LOAD — Restore PDS from a sequential backup

DDs:
  SYSUT1 — Input PDS (INDD)
  SYSUT2 — Output PDS (OUTDD)
  SYSUT3, SYSUT4 — Work datasets (SPACE needed)
  SYSPRINT — Messages
  SYSIN — Control statements

Compress in Place:
  COPY OUTDD=SYSUT1,INDD=SYSUT1
  This reclaims space from deleted members. Essential for PDS maintenance.

💡 Pro Tip: Compress PDS regularly. When a PDS fills up with dead space, you get SB37 even though plenty of space is allocated.`,
      code:`//* Copy selected members:
//COPYMBR  EXEC PGM=IEBCOPY
//SYSUT1   DD   DSN=MY.SOURCE.PDS,DISP=SHR
//SYSUT2   DD   DSN=MY.TARGET.PDS,DISP=SHR
//SYSUT3   DD   SPACE=(TRK,(5,5))
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  COPY INDD=SYSUT1,OUTDD=SYSUT2
  SELECT MEMBER=((PROG1,,R),(PROG2,,R))
/*
//*
//* Compress PDS in place:
//COMPRESS EXEC PGM=IEBCOPY
//SYSUT1   DD   DSN=MY.PDS.LIBRARY,DISP=OLD
//SYSUT2   DD   DSN=MY.PDS.LIBRARY,DISP=OLD
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  COPY INDD=SYSUT1,OUTDD=SYSUT2
/*`
    },

    { title:"8.7 — IEFBR14: Create & Delete", level:"Beginner",
      content:`IEFBR14 is the "do nothing" program. It executes (RC=0) but performs no logic. Its power comes from DD statement processing.

When IEFBR14 runs, z/OS processes all DD statements — creating new datasets and deleting old ones. The program itself does nothing.

Common Uses:
  • Create empty datasets before a job chain
  • Delete datasets at job end or start
  • Create/delete multiple datasets in one step

Why Not Just Use IDCAMS DELETE?
  IEFBR14 is simpler for basic create/delete. No SYSIN needed. No control statements. Just DD parameters.

💡 Pro Tip: IEFBR14 + DISP=(NEW,CATLG) creates. IEFBR14 + DISP=(OLD,DELETE) deletes.`,
      code:`//* Create multiple empty datasets:
//CREATE   EXEC PGM=IEFBR14
//FILE1    DD   DSN=MY.NEW.FILE1,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=80)
//FILE2    DD   DSN=MY.NEW.FILE2,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,10),RLSE),
//             DCB=(RECFM=FB,LRECL=200)
//*
//* Delete multiple datasets:
//DELETE   EXEC PGM=IEFBR14
//DEL1     DD   DSN=MY.OLD.FILE1,DISP=(OLD,DELETE)
//DEL2     DD   DSN=MY.OLD.FILE2,DISP=(OLD,DELETE)
//DEL3     DD   DSN=MY.TEMP.WORK,DISP=(OLD,DELETE)`
    },

    { title:"8.8 — IKJEFT01: TSO in Batch", level:"Intermediate",
      content:`IKJEFT01 runs TSO commands in batch mode. Essential for DB2 operations.

DDs:
  SYSTSPRT — TSO command output
  SYSTSIN — TSO commands to execute
  SYSPRINT — Program output

Primary Use — DB2 Operations:
  DSN SYSTEM(subsystem) starts a DB2 session.
  Then: BIND, RUN, FREE commands.

Other Uses:
  • LISTCAT, LISTDS (list dataset info)
  • TRANSMIT/RECEIVE
  • ALLOCATE (dynamic allocation)
  • Any TSO command

💡 Pro Tip: IKJEFT01 is how you bind DB2 plans and run DB2 programs in batch.`,
      code:`//* Run DB2 program in batch:
//RUNDB2   EXEC PGM=IKJEFT01,REGION=0M
//STEPLIB  DD   DSN=DB2.SDSNLOAD,DISP=SHR
//SYSTSPRT DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*
//SYSTSIN  DD   *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(MYPROG) PLAN(MYPLAN) -
      PARMS('/DAILY')
  END
/*
//*
//* BIND DB2 plan:
//BIND     EXEC PGM=IKJEFT01
//STEPLIB  DD   DSN=DB2.SDSNLOAD,DISP=SHR
//DBRMLIB  DD   DSN=MY.DBRM.LIBRARY,DISP=SHR
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   *
  DSN SYSTEM(DB2P)
  BIND PLAN(MYPLAN) MEMBER(MYPROG) -
       ACT(REP) ISOLATION(CS)
  END
/*`
    },

    { title:"8.9 — IEBUPDTE: Source Update", level:"Intermediate",
      content:`IEBUPDTE adds, replaces, or modifies members in a PDS. Commonly used for maintaining source libraries and applying patches.

DDs: SYSUT1 (input PDS), SYSUT2 (output PDS), SYSIN (control + data), SYSPRINT

Control Statements:
  ./ ADD NAME=member — Add new member
  ./ REPL NAME=member — Replace existing member
  ./ ENDUP — End of updates

Used in SMP/E processing and automated deployments.

💡 Pro Tip: IEBUPDTE is legacy. Modern shops use IEBCOPY or PDSE operations instead.`,
      code:`//UPDATE   EXEC PGM=IEBUPDTE,PARM=NEW
//SYSUT2   DD   DSN=MY.SOURCE.PDS,DISP=SHR
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
./ ADD NAME=NEWPROG
       IDENTIFICATION DIVISION.
       PROGRAM-ID. NEWPROG.
       PROCEDURE DIVISION.
           DISPLAY 'HELLO'.
           STOP RUN.
./ REPL NAME=OLDPROG
       IDENTIFICATION DIVISION.
       PROGRAM-ID. OLDPROG.
       PROCEDURE DIVISION.
           DISPLAY 'UPDATED'.
           STOP RUN.
./ ENDUP
/*`
    },

    { title:"8.10 — ICETOOL: Multi-Function Utility", level:"Advanced",
      content:`ICETOOL is DFSORT's power tool. Runs multiple SORT operations in one step with reporting and cross-file operations.

Operators:
  SORT — Sort a file
  COPY — Copy a file
  COUNT — Count records
  SELECT — Select unique/duplicate records
  DISPLAY — Display statistics
  UNIQUE — Extract unique records
  RANGE — Select records in a range
  VERIFY — Verify sort order

Benefits over plain SORT:
  • Multiple operations in one step
  • Cross-referencing between files
  • Statistical reporting
  • Complex record selection

💡 Pro Tip: ICETOOL SELECT NODUPS extracts unique records — a common interview question.`,
      code:`//TOOLSTEP EXEC PGM=ICETOOL
//TOOLMSG  DD   SYSOUT=*
//DFSMSG   DD   SYSOUT=*
//IN1      DD   DSN=MY.INPUT.FILE,DISP=SHR
//OUT1     DD   DSN=MY.UNIQUE.RECORDS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),DCB=*.IN1
//OUT2     DD   DSN=MY.DUPLICATES,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2)),DCB=*.IN1
//TOOLIN   DD   *
  SORT FROM(IN1) USING(SRT1)
  SELECT FROM(IN1) TO(OUT1) ON(1,10,CH) NODUPS
  SELECT FROM(IN1) TO(OUT2) ON(1,10,CH) ALLDUPS
/*
//SRT1CNTL DD   *
  SORT FIELDS=(1,10,CH,A)
/*`
    },

    { title:"8.11 — ADRDSSU: Dump & Restore", level:"Advanced",
      content:`ADRDSSU (DFSMSdss) performs logical and physical dump/restore operations. Used for backups, migrations, and disaster recovery.

Functions:
  DUMP — Backup datasets to dump file
  RESTORE — Restore from dump file
  COPY — Copy datasets between volumes
  PRINT — Print dump contents
  RELEASE — Release unused space

Advantages over IEBCOPY/REPRO:
  • Handles all dataset types (VSAM, PDS, sequential, HFS)
  • Volume-level operations
  • Concurrent copy support
  • Compression during dump

💡 Pro Tip: ADRDSSU DUMP with COMPRESS is the standard backup method in production.`,
      code:`//* DUMP datasets to backup:
//BACKUP   EXEC PGM=ADRDSSU
//SYSPRINT DD   SYSOUT=*
//DUMPOUT  DD   DSN=MY.BACKUP.DUMP,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(100,50)),UNIT=SYSDA
//SYSIN    DD   *
  DUMP DATASET( -
    INCLUDE(MY.PROD.**) -
  ) -
  OUTDDNAME(DUMPOUT) -
  COMPRESS TOLERATE(ENQFAILURE)
/*
//*
//* RESTORE from backup:
//RESTORE  EXEC PGM=ADRDSSU
//SYSPRINT DD   SYSOUT=*
//DUMPIN   DD   DSN=MY.BACKUP.DUMP,DISP=SHR
//SYSIN    DD   *
  RESTORE DATASET( -
    INCLUDE(MY.PROD.**) -
  ) -
  INDDNAME(DUMPIN) -
  REPLACE
/*`
    },

    { title:"8.12 — SORT: JNF & JOINKEYS", level:"Advanced",
      content:`DFSORT JOINKEYS joins two files like a database JOIN. Incredibly powerful — replaces COBOL match-merge programs.

Join Types:
  JOINKEYS FILE=F1,FIELDS=(1,10,A) — Key definition for file 1
  JOINKEYS FILE=F2,FIELDS=(1,10,A) — Key definition for file 2
  JOIN UNPAIRED,F1,F2 — Include unmatched from both (FULL OUTER)
  JOIN UNPAIRED,F1 — Include unmatched from F1 (LEFT OUTER)
  JOIN PAIRED — Only matched records (INNER JOIN)

REFORMAT — Define output record:
  REFORMAT FIELDS=(F1:1,50,F2:1,30) — Combine fields from both files

This replaces hundreds of lines of COBOL match-merge logic with a few DFSORT control statements.

💡 Pro Tip: JOINKEYS is underutilized. It can replace entire COBOL programs for file matching.`,
      code:`//JOINSTEP EXEC PGM=SORT
//SORTJNF1 DD   DSN=MY.EMPLOYEE.FILE,DISP=SHR
//SORTJNF2 DD   DSN=MY.DEPARTMENT.FILE,DISP=SHR
//SORTOUT  DD   DSN=MY.JOINED.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
* Join employees with departments
  JOINKEYS FILE=F1,FIELDS=(1,4,A)
  JOINKEYS FILE=F2,FIELDS=(1,4,A)
  JOIN UNPAIRED,F1
  REFORMAT FIELDS=(F1:1,50,F2:5,30)
  SORT FIELDS=(1,4,CH,A)
/*`
    },

    { title:"8.13 — File Compare Utilities", level:"Intermediate",
      content:`Comparing datasets is a common need: QA testing, migration validation, audit compliance.

SUPERC (ISRSUPC) — Sophisticated compare:
  • Compares sequential datasets or PDS members
  • Line-by-line or record-by-record
  • Produces listing with differences highlighted
  • Can ignore columns (COLHEAD, SEQ NUM columns)

IEBCOMPR — Simple sequential compare:
  • Byte-for-byte comparison
  • Less flexible than SUPERC
  • Returns RC=0 (equal) or RC=12 (unequal)

IDCAMS REPRO + SORT:
  Alternative approach — REPRO both files, SORT with EQUALS, compare sorted output.

💡 Pro Tip: SUPERC is the preferred tool. It produces clear, readable difference reports.`,
      code:`//* SUPERC — Compare two files:
//COMPARE  EXEC PGM=ISRSUPC,
//             PARM='DELTAL,LINECMP'
//NEWDD    DD   DSN=MY.NEW.FILE,DISP=SHR
//OLDDD    DD   DSN=MY.OLD.FILE,DISP=SHR
//OUTDD    DD   DSN=MY.COMPARE.REPORT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE),
//             DCB=(RECFM=FBA,LRECL=133)
//SYSIN    DD   *
  CMPCOLM 1:80
/*
//*
//* IEBCOMPR — Simple compare:
//SIMPCMP  EXEC PGM=IEBCOMPR
//SYSUT1   DD   DSN=MY.FILE1,DISP=SHR
//SYSUT2   DD   DSN=MY.FILE2,DISP=SHR
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY`
    },

    { title:"8.14 — SORT: OUTFIL & Multiple Outputs", level:"Advanced",
      content:`OUTFIL writes to multiple output files from a single sort pass. Incredibly efficient.

OUTFIL Syntax:
  OUTFIL FNAMES=ddname,parameters

Uses:
  • Split file by criteria (records to different outputs)
  • Create reports with headers/trailers
  • Convert formats between outputs
  • Produce summary statistics

STARTREC/ENDREC — Write specific record ranges
INCLUDE/OMIT — Filter per output
BUILD — Reformat per output

This means one sort pass can produce 5 different output files with different formats and selection criteria.

💡 Pro Tip: OUTFIL replaces multiple sort steps and COBOL programs.`,
      code:`//SORTSTEP EXEC PGM=SORT
//SORTIN   DD   DSN=MY.TRANS.FILE,DISP=SHR
//EAST     DD   DSN=MY.EAST.TRANS,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2)),DCB=*.SORTIN
//WEST     DD   DSN=MY.WEST.TRANS,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2)),DCB=*.SORTIN
//ERRORS   DD   DSN=MY.ERROR.TRANS,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(1,1)),DCB=*.SORTIN
//SYSOUT   DD   SYSOUT=*
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
  OUTFIL FNAMES=EAST,
    INCLUDE=(50,4,CH,EQ,C'EAST')
  OUTFIL FNAMES=WEST,
    INCLUDE=(50,4,CH,EQ,C'WEST')
  OUTFIL FNAMES=ERRORS,
    INCLUDE=(80,1,CH,EQ,C'E')
/*`
    },

    { title:"8.15 — Utility Quick Reference", level:"Intermediate",
      content:`Quick reference for the most commonly used z/OS utilities.

Data Manipulation:
  SORT/DFSORT — Sort, merge, copy, reformat, select, join
  ICETOOL — Multi-operation sort tool
  IEBGENER — Sequential copy
  IDCAMS REPRO — Copy (especially VSAM)

Dataset Management:
  IDCAMS — Define, delete, alter, listcat, print
  IEFBR14 — Create/delete via DD processing
  IEBCOPY — PDS copy, compress, unload/load
  ADRDSSU — Dump, restore, copy volumes

Program Execution:
  IKJEFT01 — TSO in batch (DB2 bind/run)
  IRXJCL — REXX in batch
  IGYCRCTL — COBOL compiler
  IEWL — Linkage editor

Comparison:
  ISRSUPC (SUPERC) — Compare files with report
  IEBCOMPR — Simple compare

Print/Display:
  IDCAMS PRINT — Display dataset contents
  IEBPTPCH — Print/punch utility

💡 Pro Tip: Master SORT, IDCAMS, and IKJEFT01. They cover 80% of utility JCL needs.`,
      code:`//* === QUICK REFERENCE JCL ===
//*
//* DELETE + CREATE:
//DEL      EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.FILE PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//* COPY:
//COPY     EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=MY.INPUT,DISP=SHR
//SYSUT2   DD   DSN=MY.OUTPUT,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),DCB=*.SYSUT1
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY
//* SORT:
//SORT     EXEC PGM=SORT
//SORTIN   DD   DSN=MY.INPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.OUTPUT,DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5))
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD   SYSOUT=*`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 9: ADVANCED JCL (10 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"9.1 — Multi-Step Job Design", level:"Advanced",
      content:`Production jobs often have 5-20+ steps. Designing them well is a critical skill.

Design Principles:
  • Each step has a single purpose
  • Clear naming: STEP010, STEP020 (gaps for inserts)
  • Error handling after critical steps
  • Cleanup steps with COND=EVEN
  • Temporary datasets between steps
  • Restartability consideration

Typical Job Pattern:
  STEP010: Delete old output (IDCAMS, ignore not found)
  STEP020: Extract data from source
  STEP030: Validate/transform data
  STEP040: Sort data
  STEP050: Load to target
  STEP060: Generate reports
  STEP070: Cleanup temporary datasets (COND=EVEN)

Step Dependencies:
  • Use IF/THEN/ELSE for conditional flow
  • COND=EVEN for cleanup that must always run
  • Temporary datasets (&&) for inter-step data
  • RESTART= for recovery

💡 Pro Tip: Number steps in tens (010, 020, 030) so you can insert steps later without renumbering.`,
      code:`//ETLJOB   JOB  (ACCT),'DAILY ETL',CLASS=A,
//             MSGCLASS=X,MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,REGION=0M
//*
//* STEP010: Delete old output
//STEP010  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE PROD.DAILY.OUTPUT PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//* STEP020: Extract
//STEP020  EXEC PGM=EXTRACT
//INPUT    DD   DSN=PROD.MASTER,DISP=SHR
//OUTPUT   DD   DSN=&&EXTRACT,DISP=(NEW,PASS),
//             SPACE=(CYL,(50,20))
//*
//C1       IF  STEP020.RC = 0 THEN
//* STEP030: Sort
//STEP030  EXEC PGM=SORT
//SORTIN   DD   DSN=&&EXTRACT,DISP=(OLD,PASS)
//SORTOUT  DD   DSN=PROD.DAILY.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(50,20),RLSE)
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD   SYSOUT=*
//C1       ENDIF
//*
//* STEP070: Cleanup (always runs)
//STEP070  EXEC PGM=IEFBR14,COND=EVEN
//DEL1     DD   DSN=&&EXTRACT,DISP=(OLD,DELETE)`
    },

    { title:"9.2 — Symbolic Parameters & SET", level:"Advanced",
      content:`SET statement and symbolic parameters make JCL dynamic and environment-aware.

SET Statement:
  //  SET ENV=PROD
  //  SET HLQ=PAY.&ENV    ← Resolves to PAY.PROD

System Symbols:
  &SYSUID — Current TSO user ID
  &SYSNAME — System name (LPAR)
  &SYSDATE — Current date (yy.ddd)
  &SYSTIME — Current time (hh.mm.ss)
  &SYSJOBNAME — Current job name

SYMBOLS=JCLONLY:
  On DD * statements, tells JES to resolve symbols in in-stream data:
  //SYSIN DD *,SYMBOLS=JCLONLY
  This allows &ENV to resolve inside the data.

Environment Switching:
  One JCL, multiple environments:
  //  SET ENV=TEST   ← Change to PROD for production
  //  SET HLQ=PAY.&ENV
  All DSN=&HLQ..* references automatically switch.

💡 Pro Tip: Use SET for environment switching. One JCL works for TEST, QA, and PROD.`,
      code:`//* Environment-driven JCL:
//MYJOB    JOB  (ACCT),'DYNAMIC',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID
//*
//         SET  ENV=PROD
//         SET  HLQ=PAY.&ENV
//         SET  DB2=DB2P
//*
//STEP1    EXEC PGM=IKJEFT01,REGION=0M
//STEPLIB  DD   DSN=&HLQ..LOADLIB,DISP=SHR
//         DD   DSN=DB2.&DB2..SDSNLOAD,DISP=SHR
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   *,SYMBOLS=JCLONLY
  DSN SYSTEM(&DB2)
  RUN PROGRAM(PAYCALC) PLAN(PAYPLAN)
  END
/*
//INPUT    DD   DSN=&HLQ..MASTER.DATA,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..DAILY.EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)`
    },

    { title:"9.3 — OUTPUT Statement & SYSOUT Control", level:"Advanced",
      content:`The OUTPUT JCL statement provides centralized control over SYSOUT processing.

Syntax: //name OUTPUT parameters

Parameters:
  DEST=destination — Route output (node.userid, RMTn, LOCAL)
  COPIES=n — Number of copies (1-255)
  FORMS=formname — Special forms
  JESDS=ALL/LOG/MSG/JCL — Which JES datasets to include
  OUTDISP=(normal,abnormal) — Output disposition (HOLD, WRITE, PURGE, KEEP)

Referenced by DD: //REPORT DD SYSOUT=*,OUTPUT=*.outputname

Benefits:
  • Define once, reference from multiple DDs
  • Centralized print control
  • Different destinations for different outputs
  • JES3 output processing control

💡 Pro Tip: OUTPUT statements with DEST= are how you route reports to specific printers or users.`,
      code:`//* OUTPUT statements:
//MYJOB    JOB  (ACCT),'OUTPUT DEMO',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID
//*
//RPTOUT   OUTPUT DEST=NEWYORK,COPIES=2,FORMS=INVOICE
//LOGOUT   OUTPUT DEST=LOCAL,OUTDISP=(HOLD,HOLD)
//MAILOUT  OUTPUT DEST=MYID
//*
//STEP1    EXEC PGM=RPTPROG
//INVOICE  DD   SYSOUT=A,OUTPUT=*.RPTOUT
//LOGFILE  DD   SYSOUT=*,OUTPUT=*.LOGOUT
//SUMMARY  DD   SYSOUT=*,OUTPUT=*.MAILOUT`
    },

    { title:"9.4 — JCLLIB, INCLUDE & Modular JCL", level:"Advanced",
      content:`Combine JCLLIB, INCLUDE, SET, and PROCs for highly modular, maintainable JCL.

Architecture:
  • JCLLIB points to include/proc libraries
  • SET defines environment variables
  • INCLUDE pulls in standard DD groups
  • PROCs encapsulate standard processing

Standard Include Members:
  STDLIBS — Standard STEPLIB concatenation
  STDOUT — Standard SYSOUT DDs (SYSPRINT, SYSUDUMP)
  ENVSET — SET statements for environment

Benefits:
  • Change one INCLUDE member → all jobs updated
  • Environment switching via SET
  • Standardized across teams
  • Easier auditing and compliance

💡 Pro Tip: This pattern is how large mainframe shops manage thousands of production jobs.`,
      code:`//* Modular JCL Architecture:
//MYJOB    JOB  (ACCT),'MODULAR',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID
//*
//         JCLLIB ORDER=(MY.INCLUDE.LIB,
//             MY.PROC.LIB)
//*
//* Environment setup (from include member):
//         INCLUDE MEMBER=ENVPROD
//*  (Contains: SET ENV=PROD, SET HLQ=PAY.PROD, etc.)
//*
//STEP1    EXEC PGM=MYPROG
//*
//* Standard libraries (from include):
//         INCLUDE MEMBER=STDLIBS
//*  (Contains: STEPLIB concatenation)
//*
//* Standard output DDs:
//         INCLUDE MEMBER=STDOUT
//*  (Contains: SYSPRINT, SYSUDUMP, CEEDUMP)
//*
//INPUT    DD   DSN=&HLQ..MASTER,DISP=SHR`
    },

    { title:"9.5 — Referbacks (Backward References)", level:"Advanced",
      content:`Referbacks let you reference datasets or attributes from earlier in the JCL without repeating them.

DSN Referback:
  DSN=*.stepname.ddname — Use the dataset from that DD
  DSN=*.STEP1.OUTPUT — Whatever STEP1.OUTPUT resolved to
  DSN=*.stepname.procstep.ddname — Within a PROC

DCB Referback:
  DCB=*.stepname.ddname — Copy DCB attributes
  DCB=*.STEP1.INPUT — Use same RECFM, LRECL, BLKSIZE

VOL Referback:
  VOL=REF=*.stepname.ddname — Use same volume

PGM Referback:
  PGM=*.stepname.ddname — Load program from that DD's output
  PGM=*.LINK.SYSLMOD — Common in compile-link-go

Rules:
  • Can only reference EARLIER steps (not later)
  • The referenced step must have actually executed
  • Referbacks resolve at allocation time

💡 Pro Tip: DCB=*.stepname.ddname ensures output format matches input. Very useful for copy/sort chains.`,
      code:`//* DSN Referback:
//STEP1    EXEC PGM=EXTRACT
//OUTPUT   DD   DSN=MY.EXTRACT.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),
//             DCB=(RECFM=FB,LRECL=200)
//*
//STEP2    EXEC PGM=SORT
//SORTIN   DD   DSN=*.STEP1.OUTPUT,DISP=SHR
//SORTOUT  DD   DSN=MY.SORTED.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             DCB=*.SORTIN,
//             SPACE=(CYL,(10,5))
//*
//* PGM Referback (compile-link-go):
//LINK     EXEC PGM=IEWL
//SYSLMOD  DD   DSN=&&GOLIB(MYPROG),DISP=(,PASS),
//             SPACE=(TRK,(10,10,1))
//*
//GO       EXEC PGM=*.LINK.SYSLMOD`
    },

    { title:"9.6 — JCL for COBOL Programs", level:"Intermediate",
      content:`Running COBOL programs requires specific DD names that match the program's SELECT/ASSIGN clauses.

Standard COBOL DDs:
  Program assigns files with SELECT...ASSIGN TO ddname.
  SELECT CUSTOMER-FILE ASSIGN TO CUSTMAST → //CUSTMAST DD ...
  SELECT REPORT-FILE ASSIGN TO RPTFILE → //RPTFILE DD ...

Compile JCL:
  PGM=IGYCRCTL (IBM Enterprise COBOL compiler)
  SYSIN — Source code input
  SYSLIB — Copybook library
  SYSLIN — Object module output

DB2 COBOL:
  Compile with DB2 precompiler first, or use integrated precompiler.
  Run via IKJEFT01 with DSN SYSTEM command.

Common COBOL DD Names:
  SYSOUT, SYSPRINT — Display output
  SYSIN — Accept input
  SYSABEND/SYSUDUMP — Dump on ABEND

💡 Pro Tip: Always match DD names exactly to COBOL SELECT ASSIGN. Case-insensitive but must be 1-8 chars.`,
      code:`//* Run COBOL program:
//RUNCOB   JOB  (ACCT),'COBOL RUN',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID
//JOBLIB   DD   DSN=MY.LOADLIB,DISP=SHR
//*
//STEP1    EXEC PGM=PAYCALC,REGION=0M
//CUSTMAST DD   DSN=PROD.CUSTOMER.MASTER,DISP=SHR
//TRANSIN  DD   DSN=PROD.DAILY.TRANS,DISP=SHR
//PAYFILE  DD   DSN=PROD.PAYROLL.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,10),RLSE),
//             DCB=(RECFM=FB,LRECL=200)
//ERRFILE  DD   DSN=PROD.PAYROLL.ERRORS,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(5,2),RLSE),
//             DCB=(RECFM=FB,LRECL=200)
//SYSOUT   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*`
    },

    { title:"9.7 — JCL for DB2 Programs", level:"Advanced",
      content:`DB2 programs run through IKJEFT01 (TSO batch) or via DSNREXX. The JCL pattern is specific and must be followed exactly.

Pattern:
  //STEP1 EXEC PGM=IKJEFT01,REGION=0M
  //STEPLIB DD DSN=DB2.SDSNLOAD,DISP=SHR  ← DB2 load library
  //SYSTSPRT DD SYSOUT=*                    ← TSO output
  //SYSTSIN DD *                            ← TSO commands
  DSN SYSTEM(DB2P)                          ← Connect to DB2
  RUN PROGRAM(prog) PLAN(plan) PARMS('/')   ← Run program
  END

BIND (before first run or after DBRM changes):
  DSN SYSTEM(DB2P)
  BIND PLAN(plan) MEMBER(prog) ACT(REP) ISOLATION(CS)
  END

Key DDs:
  STEPLIB — Must include DB2 SDSNLOAD
  SYSTSPRT — TSO command output
  SYSTSIN — TSO commands (DSN session)
  Plus all application DDs (files the COBOL program uses)

💡 Pro Tip: DB2 subsystem name (DB2P, DB2T, DB2D) changes per environment. Use SET &DB2SYS for flexibility.`,
      code:`//* DB2 COBOL program execution:
//DB2RUN   JOB  (ACCT),'DB2 RUN',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID
//         SET  DB2=DB2P
//*
//STEP1    EXEC PGM=IKJEFT01,REGION=0M
//STEPLIB  DD   DSN=MY.LOADLIB,DISP=SHR
//         DD   DSN=DB2.&DB2..SDSNLOAD,DISP=SHR
//INPUT    DD   DSN=PROD.INPUT.FILE,DISP=SHR
//OUTPUT   DD   DSN=PROD.OUTPUT.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSPRINT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*
//SYSTSPRT DD   SYSOUT=*
//SYSTSIN  DD   *,SYMBOLS=JCLONLY
  DSN SYSTEM(&DB2)
  RUN PROGRAM(MYPROG) PLAN(MYPLAN) -
      PARMS('/DAILY')
  END
/*`
    },

    { title:"9.8 — Performance Tuning JCL", level:"Advanced",
      content:`JCL choices directly impact job performance. Key areas to optimize:

BLKSIZE:
  • Use BLKSIZE=0 (system optimal) or half-track (27920 for 3390)
  • Larger blocks = fewer I/Os = faster processing
  • Small BLKSIZE wastes DASD and increases CPU

BUFNO (Buffer Count):
  • BUFNO=5 or higher for sequential reads
  • More buffers = more read-ahead = faster I/O
  • Trade-off: memory vs I/O performance

SPACE:
  • Adequate primary prevents secondary extensions
  • Each extension = overhead
  • RLSE returns unused space

Multi-Volume:
  • Split large files across volumes for parallel I/O
  • UNIT=(SYSDA,2) for two-volume spread

REGION:
  • Too small = ABEND. Too large = waste.
  • REGION=0M common but may impact WLM

Sort Performance:
  • HIPROC=YES for high-speed sort
  • DYNALLOC for sort work datasets
  • Adequate SORTWK space

💡 Pro Tip: The biggest performance gain is proper BLKSIZE. BLKSIZE=80 on an 80-byte file is 350x slower than BLKSIZE=27920.`,
      code:`//* Performance-optimized JCL:
//PERFSTEP EXEC PGM=MYPROG,REGION=256M
//*
//* Optimal BLKSIZE:
//INPUT    DD   DSN=MY.INPUT,DISP=SHR,
//             DCB=BUFNO=10
//*
//* System-optimal blocking:
//OUTPUT   DD   DSN=MY.OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(100,50),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//*
//* Sort with work datasets:
//SORTSTEP EXEC PGM=SORT,REGION=512M
//SORTIN   DD   DSN=MY.BIGFILE,DISP=SHR
//SORTOUT  DD   DSN=MY.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(200,100),RLSE)
//SORTWK01 DD   SPACE=(CYL,(100)),UNIT=SYSDA
//SORTWK02 DD   SPACE=(CYL,(100)),UNIT=SYSDA
//SORTWK03 DD   SPACE=(CYL,(100)),UNIT=SYSDA
//SYSIN    DD   *
  SORT FIELDS=(1,20,CH,A)
  OPTION HIPROCS=YES
/*
//SYSOUT   DD   SYSOUT=*`
    },

    { title:"9.9 — Common Abend Codes", level:"Intermediate",
      content:`Every mainframe developer must know the most common ABENDs and their causes.

System ABENDs (Sxxx):
  S001 — I/O error (BLKSIZE mismatch in concatenation)
  S013 — Open error (DCB conflict, member not found in PDS)
  S0C1 — Operation exception (invalid instruction)
  S0C4 — Protection exception (addressing error, subscript out of range)
  S0C7 — Data exception (non-numeric data in numeric field — MOST COMMON)
  S222 — Job cancelled by operator or user
  S322 — CPU time exceeded (TIME parameter too small or infinite loop)
  S806 — Module not found (check STEPLIB/JOBLIB)
  SB37 — Dataset full, no more extents available
  SD37 — No secondary space specified

User ABENDs (Uxxx):
  U1000-U4095 — Program-defined errors
  U0016 — COBOL SORT failure
  U1026 — COBOL file status error

JCL Errors:
  JCL ERROR — Syntax error (missing comma, bad parameter)
  NOT CATLG 2 — Dataset already catalogued
  IEFC452I — Substitution JCL error (symbolic not resolved)

💡 Pro Tip: S0C7 is #1 in interviews. Answer: "Non-numeric data in a numeric field. Check INITIALIZE, input validation, and data conversions."`,
      code:`//* Debugging ABENDs — common fixes:
//*
//* S806 — Add the load library:
//STEP1    EXEC PGM=MYPROG
//STEPLIB  DD   DSN=MY.LOADLIB,DISP=SHR
//*
//* S322 — Increase time:
//STEP2    EXEC PGM=LONGPROG,TIME=60
//*
//* SB37 — Increase space:
//OUTPUT   DD   DSN=MY.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(500,100),RLSE)
//*
//* NOT CATLG 2 — Delete first:
//DEL      EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.FILE PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//* S0C7 — Add dump for analysis:
//STEP3    EXEC PGM=MYPROG
//SYSUDUMP DD   SYSOUT=*`
    },

    { title:"9.10 — Restart & Recovery", level:"Advanced",
      content:`Designing restartable jobs is essential for production reliability.

Restart Strategies:
  1. From-scratch restart — Rerun entire job (simplest)
  2. Step restart — Use RESTART= to skip completed steps
  3. Checkpoint restart — COBOL CHECKPOINT/RESTART

Making Jobs Restartable:
  • Delete-before-create pattern (delete output at job start)
  • Avoid temporary datasets between restart points
  • Catalog all intermediate datasets
  • Use GDGs for versioned output
  • Make steps idempotent (safe to rerun)

RESTART= Parameter:
  //MYJOB JOB ...,RESTART=STEP030
  Skips steps before STEP030.

Checkpoint/Restart (COBOL):
  Programs call CHECKPOINT, z/OS records the state. On restart, processing resumes from the last checkpoint. Requires SYSCHK DD.

Scheduler Integration:
  CA-7, TWS, Control-M have built-in restart capabilities:
  • Automatic restart on failure
  • Restart from last successful step
  • Conditional restart based on error type

💡 Pro Tip: Every production job should be restartable. Design for failure from day one.`,
      code:`//* Restartable job design:
//ETLJOB   JOB  (ACCT),'RESTARTABLE',CLASS=A,
//             MSGCLASS=X,MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID
//*  To restart: Add RESTART=STEP030 (or whichever step)
//*
//* STEP010: Cleanup (always safe to rerun)
//STEP010  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE MY.OUTPUT.FILE PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
  DELETE MY.SORTED.FILE PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//* STEP020: Extract (idempotent — reads only)
//STEP020  EXEC PGM=EXTRACT
//INPUT    DD   DSN=PROD.MASTER,DISP=SHR
//OUTPUT   DD   DSN=MY.OUTPUT.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(50,20),RLSE)
//*
//* STEP030: Sort (uses cataloged file, safe to rerun)
//STEP030  EXEC PGM=SORT
//SORTIN   DD   DSN=MY.OUTPUT.FILE,DISP=SHR
//SORTOUT  DD   DSN=MY.SORTED.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(50,20),RLSE)
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD   SYSOUT=*`
    },

    // ═══════════════════════════════════════════════════════════════════
    //  CHAPTER 10: REAL-WORLD JCL & INTERVIEW PREP (5 Lessons)
    // ═══════════════════════════════════════════════════════════════════

    { title:"10.1 — Production Job Patterns", level:"Advanced",
      content:`Real production jobs follow established patterns. Understanding these gets you productive on day one.

Pattern 1 — Daily Extract-Transform-Load (ETL):
  Delete old output → Extract from source → Validate → Sort → Load → Report

Pattern 2 — Compile-Link-Test:
  Compile COBOL → Link-edit → Run with test data

Pattern 3 — Backup-Process-Archive:
  Backup source → Process → Archive output → Cleanup

Pattern 4 — DB2 Batch:
  BIND plan → Run program via IKJEFT01 → Verify → Report

Pattern 5 — File Transfer:
  Receive/FTP → Validate → Convert → Load

Each pattern uses the same JCL building blocks: JOB/EXEC/DD statements, conditional processing, utility programs.

💡 Pro Tip: Learn your shop's patterns. Every mainframe shop has 5-10 standard patterns that cover 90% of jobs.`,
      code:`//* Pattern: Daily ETL Job
//DAILYETL JOB  (ACCT),'DAILY ETL',CLASS=A,
//             MSGCLASS=X,MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,REGION=0M
//*
//         SET  ENV=PROD
//         SET  HLQ=PAY.&ENV
//*
//* Delete old output:
//STEP010  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE &HLQ..DAILY.EXTRACT PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//* Extract:
//STEP020  EXEC PGM=PAYEXT01
//STEPLIB  DD   DSN=&HLQ..LOADLIB,DISP=SHR
//INPUT    DD   DSN=&HLQ..MASTER,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..DAILY.EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,10),RLSE)
//SYSPRINT DD   SYSOUT=*
//*
//C1       IF  STEP020.RC <= 4 THEN
//* Sort:
//STEP030  EXEC PGM=SORT
//SORTIN   DD   DSN=&HLQ..DAILY.EXTRACT,DISP=SHR
//SORTOUT  DD   DSN=&HLQ..DAILY.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,10),RLSE)
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD   SYSOUT=*
//C1       ENDIF`
    },

    { title:"10.2 — Debugging JCL Failures", level:"Intermediate",
      content:`A systematic approach to debugging saves hours.

Step 1 — Check the Return Code:
  Look at the job output. Which step failed? What RC or ABEND code?

Step 2 — Read JESMSGLG:
  The JES message log shows job-level messages. Look for error messages.

Step 3 — Read JESYSMSG:
  Allocation messages show what happened with each DD. Look for:
  • IEF285I — Dataset allocation/deallocation
  • IEF236I — Allocation failure
  • IEF212I — Dataset not found
  • IGD messages — SMS/catalog errors

Step 4 — Check SYSPRINT:
  Program-specific messages. SORT errors, IDCAMS errors, COBOL DISPLAY output.

Step 5 — Check the Dump:
  For S0Cx ABENDs, SYSUDUMP shows the offset and register contents. Use the compiler listing to find the failing statement.

Common Patterns:
  • JCL ERROR → Fix syntax, resubmit
  • NOT CATLG 2 → Delete existing file, resubmit
  • S806 → Check STEPLIB/JOBLIB
  • S0C7 → Check data, add INITIALIZE
  • SB37 → Increase SPACE

💡 Pro Tip: 80% of JCL failures are the same 5 issues. Know them cold and you'll debug in minutes.`,
      code:`//* Debugging toolkit JCL:
//*
//* 1. Check dataset exists:
//CHK      EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  LISTCAT ENT(MY.SUSPECT.FILE) ALL
/*
//*
//* 2. Check dataset contents:
//PRINT    EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//INDD     DD   DSN=MY.SUSPECT.FILE,DISP=SHR
//SYSIN    DD   *
  PRINT INFILE(INDD) COUNT(10) CHARACTER
/*
//*
//* 3. Syntax-check JCL:
//MYJOB    JOB  ...,TYPRUN=SCAN
//*
//* 4. Get detailed output:
//MYJOB    JOB  ...,MSGLEVEL=(1,1)
//*
//* 5. Dump on ABEND:
//STEP1    EXEC PGM=MYPROG
//SYSUDUMP DD   SYSOUT=*`
    },

    { title:"10.3 — JCL for Job Scheduling", level:"Advanced",
      content:`Production jobs don't run manually — they're scheduled by tools like CA-7, TWS (Tivoli Workload Scheduler), or Control-M.

Scheduler Integration:
  • Jobs submitted automatically at scheduled times
  • Dependencies: Job B waits for Job A to complete RC=0
  • Calendars: Run on business days, month-end, etc.
  • Alerts: Notify operations on failure
  • Restart: Automatic restart capabilities

JCL Considerations for Scheduling:
  • NOTIFY= may go to a group ID, not personal
  • CLASS= may differ for scheduled vs manual
  • TYPRUN= never used in production (remove before scheduling)
  • JOBRC= affects successor triggering
  • COND=/IF-THEN controls internal flow; scheduler controls external flow

Predecessor/Successor:
  Job A (Extract) → Job B (Transform) → Job C (Load)
  Defined in scheduler, not in JCL. JCL just defines what each job does.

Month-End Processing:
  Schedulers trigger special jobs on the last business day. JCL uses SET and symbolic parameters for date-driven processing.

💡 Pro Tip: Understand your scheduler. JCL defines WHAT to do; the scheduler defines WHEN and in WHAT ORDER.`,
      code:`//* Production-ready JCL for scheduling:
//PAYEXT   JOB  (PAY,001),'PAY EXTRACT',
//             CLASS=P,
//             MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=PAYOPS,
//             REGION=0M,
//             TIME=30,
//             JOBRC=MAXRC
//*
//*  SCHEDULE: Daily 06:00 (CA-7 JOB# PAY001)
//*  PREDECESSOR: GLCLOSE (must RC=0)
//*  SUCCESSOR: PAYSORT (triggers on RC<=4)
//*  ON-CALL: Pay team (ext 5555)
//*
//         SET  ENV=PROD
//         SET  HLQ=PAY.&ENV
//STEP010  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE &HLQ..DAILY.EXTRACT PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//STEP020  EXEC PGM=PAYEXT01
//STEPLIB  DD   DSN=&HLQ..LOADLIB,DISP=SHR
//INPUT    DD   DSN=&HLQ..MASTER,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..DAILY.EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(50,20),RLSE)
//SYSPRINT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*`
    },

    { title:"10.4 — Interview Questions & Answers", level:"All Levels",
      content:`Top JCL interview questions with answers.

Q: What are the three basic JCL statements?
A: JOB (identifies job), EXEC (runs program/proc), DD (defines datasets).

Q: Explain DISP=(NEW,CATLG,DELETE)?
A: Create new dataset, catalog it if step succeeds, delete it if step ABENDs.

Q: What is IEFBR14?
A: A "do nothing" program. Used to create/delete datasets through DD processing.

Q: Difference between STEPLIB and JOBLIB?
A: JOBLIB applies to all steps. STEPLIB overrides JOBLIB for one step. STEPLIB coded for a step = JOBLIB not searched for that step.

Q: What causes S0C7?
A: Non-numeric data in a numeric field. Fix: INITIALIZE variables, validate input.

Q: What causes SB37?
A: Dataset out of space. Fix: Increase SPACE, add secondary allocation, code RLSE.

Q: COND=(4,LT,STEP1) — what does this mean?
A: "If 4 is less than STEP1's RC, skip this step." = "Skip if STEP1 RC > 4."

Q: Difference between PDS and PDSE?
A: PDS has fixed directory blocks, no space reuse. PDSE has dynamic directory, automatic space reuse, better sharing.

Q: How to pass data between steps?
A: Temporary datasets (&&TEMP with DISP=(NEW,PASS)), cataloged datasets, or SYSOUT/SYSIN chaining.

Q: What is GDG?
A: Generation Data Group. Maintains versions of a dataset. Use (+1) to create new, (0) for current, (-1) for previous.

Q: How to make a job restartable?
A: Delete-before-create pattern, avoid temp datasets at restart points, catalog intermediates, use RESTART= parameter.

Q: What is REGION=0M?
A: Unlimited memory below the 16MB line. Common for batch but some shops restrict it.`,
      code:`//* Interview demo: Complete production job
//PAYDLY   JOB  (PAY,ACCT),'DAILY PAYROLL',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),NOTIFY=&SYSUID,
//             REGION=0M,TIME=30
//*
//         SET  HLQ=PAY.PROD
//*
//* Delete old output (ignore not found):
//STEP010  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE &HLQ..DAILY.EXTRACT PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//* Extract from master:
//STEP020  EXEC PGM=PAYEXT01
//STEPLIB  DD   DSN=&HLQ..LOADLIB,DISP=SHR
//INPUT    DD   DSN=&HLQ..MASTER,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..DAILY.EXTRACT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,10),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//SYSPRINT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*
//*
//* Sort if extract succeeded:
//C1       IF  STEP020.RC = 0 THEN
//STEP030  EXEC PGM=SORT
//SORTIN   DD   DSN=&HLQ..DAILY.EXTRACT,DISP=SHR
//SORTOUT  DD   DSN=&HLQ..DAILY.SORTED,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(20,10),RLSE),
//             DCB=*.SORTIN
//SYSIN    DD   *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD   SYSOUT=*
//C1       ENDIF`
    },

    { title:"10.5 — JCL Cheat Sheet", level:"All Levels",
      content:`Quick reference for everyday JCL coding.

Essential Parameters:
  JOB: CLASS=A,MSGCLASS=X,MSGLEVEL=(1,1),NOTIFY=&SYSUID,REGION=0M
  EXEC: PGM=name,PARM='value',COND=,REGION=,TIME=
  DD: DSN=name,DISP=(status,normal,abnormal),SPACE=,DCB=

DISP Quick Reference:
  DISP=SHR — Read shared
  DISP=OLD — Read/write exclusive
  DISP=(NEW,CATLG,DELETE) — Create new
  DISP=(MOD,CATLG) — Append or create
  DISP=(NEW,PASS) — Temp between steps
  DISP=(OLD,DELETE) — Delete dataset

SPACE Quick Reference:
  SPACE=(TRK,(10,5)) — Small file
  SPACE=(CYL,(100,50),RLSE) — Large file with release
  SPACE=(CYL,(10,5,20)) — PDS with directory

DCB Quick Reference:
  DCB=(RECFM=FB,LRECL=80,BLKSIZE=0) — Fixed blocked, system block
  DCB=(RECFM=VB,LRECL=32760,BLKSIZE=32764) — Variable blocked

Common Utilities:
  IEFBR14 — Create/delete via DD
  IDCAMS — Delete, define, repro, print, listcat
  SORT — Sort, copy, reformat, select, join
  IEBGENER — Simple sequential copy
  IEBCOPY — PDS copy/compress
  IKJEFT01 — TSO/DB2 in batch

Return Codes: 0=OK, 4=Warning, 8=Error, 12+=Severe
Common ABENDs: S0C7(data), S806(pgm not found), SB37(space), S322(time), S013(DCB)

💡 Pro Tip: Bookmark this lesson. You'll reference it daily until these become muscle memory.`,
      code:`//* === JCL TEMPLATE ===
//JOBNAME  JOB  (ACCT),'DESCRIPTION',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M,TIME=30
//*
//         SET  HLQ=MY.ENV
//*
//* Delete old output:
//STEP010  EXEC PGM=IDCAMS
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   *
  DELETE &HLQ..OUTPUT PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//* Main processing:
//STEP020  EXEC PGM=MYPROG
//STEPLIB  DD   DSN=&HLQ..LOADLIB,DISP=SHR
//INPUT    DD   DSN=&HLQ..INPUT,DISP=SHR
//OUTPUT   DD   DSN=&HLQ..OUTPUT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE),
//             DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//SYSPRINT DD   SYSOUT=*
//SYSUDUMP DD   SYSOUT=*`
    },

  ]
};
