const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Hero3D-bxrnT4wW.js","assets/react-vendor-l7B-ugng.js","assets/supabase-B4W4BUrO.js"])))=>i.map(i=>d[i]);
import{r as Ao,a as r,R as Ie}from"./react-vendor-l7B-ugng.js";import{c as Ro}from"./supabase-B4W4BUrO.js";(function(){const T=document.createElement("link").relList;if(T&&T.supports&&T.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))A(u);new MutationObserver(u=>{for(const L of u)if(L.type==="childList")for(const O of L.addedNodes)O.tagName==="LINK"&&O.rel==="modulepreload"&&A(O)}).observe(document,{childList:!0,subtree:!0});function f(u){const L={};return u.integrity&&(L.integrity=u.integrity),u.referrerPolicy&&(L.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?L.credentials="include":u.crossOrigin==="anonymous"?L.credentials="omit":L.credentials="same-origin",L}function A(u){if(u.ep)return;u.ep=!0;const L=f(u);fetch(u.href,L)}})();var an={},sa=Ao;an.createRoot=sa.createRoot,an.hydrateRoot=sa.hydrateRoot;const Oo="modulepreload",ho=function(d){return"/"+d},ia={},go=function(T,f,A){let u=Promise.resolve();if(f&&f.length>0){document.getElementsByTagName("link");const O=document.querySelector("meta[property=csp-nonce]"),w=O?.nonce||O?.getAttribute("nonce");u=Promise.allSettled(f.map(m=>{if(m=ho(m),m in ia)return;ia[m]=!0;const v=m.endsWith(".css"),W=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${W}`))return;const M=document.createElement("link");if(M.rel=v?"stylesheet":Oo,v||(M.as="script"),M.crossOrigin="",M.href=m,w&&M.setAttribute("nonce",w),document.head.appendChild(M),v)return new Promise((E,U)=>{M.addEventListener("load",E),M.addEventListener("error",()=>U(new Error(`Unable to preload CSS for ${m}`)))})}))}function L(O){const w=new Event("vite:preloadError",{cancelable:!0});if(w.payload=O,window.dispatchEvent(w),!w.defaultPrevented)throw O}return u.then(O=>{for(const w of O||[])w.status==="rejected"&&L(w.reason);return T().catch(L)})};var ua={exports:{}},Dt={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fo=r,Lo=Symbol.for("react.element"),Po=Symbol.for("react.fragment"),No=Object.prototype.hasOwnProperty,yo=fo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Mo={key:!0,ref:!0,__self:!0,__source:!0};function ma(d,T,f){var A,u={},L=null,O=null;f!==void 0&&(L=""+f),T.key!==void 0&&(L=""+T.key),T.ref!==void 0&&(O=T.ref);for(A in T)No.call(T,A)&&!Mo.hasOwnProperty(A)&&(u[A]=T[A]);if(d&&d.defaultProps)for(A in T=d.defaultProps,T)u[A]===void 0&&(u[A]=T[A]);return{$$typeof:Lo,type:d,key:L,ref:O,props:u,_owner:yo.current}}Dt.Fragment=Po;Dt.jsx=ma;Dt.jsxs=ma;ua.exports=Dt;var e=ua.exports;const bo="https://xnvxdnltimsmlelpyxeq.supabase.co",Uo="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhudnhkbmx0aW1zbWxlbHB5eGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMzcyMjAsImV4cCI6MjA4NzkxMzIyMH0.PFEldS3f6MgegbF5FfnujP5I59kAnFnvXvGzr-vgh9o",g=Ro(bo,Uo),xo={id:"jcl",icon:"⚙️",title:"JCL",subtitle:"Job Control Language",color:"#0071e3",level:"Beginner → Expert",description:"The command language of z/OS batch. Every production job on the planet's busiest systems starts here. 80 comprehensive lessons from fundamentals to expert techniques.",sections:[{title:"1.1 — What is JCL?",level:"Beginner",content:`Job Control Language (JCL) is the scripting language used to instruct IBM z/OS how to run batch jobs. It acts as the interface between your program and the operating system — telling z/OS which program to run, what data to use, and what to do with the results.

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

💡 Interview Tip: JCL is the "glue" of mainframe batch. Be ready to explain how JOB, EXEC, and DD work together.`,code:`//MYJOB    JOB  (ACCT),'MY FIRST JOB',
//             CLASS=A,MSGCLASS=X,
//             NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=IEFBR14
//SYSPRINT DD   SYSOUT=*
//`},{title:"1.2 — JCL Processing Flow",level:"Beginner",content:`Understanding how z/OS processes JCL is essential for debugging failed jobs.

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

💡 Pro Tip: Always check JESMSGLG first when a job fails. It tells you exactly where and why.`,code:`//PROCFLOW JOB  (ACCT),'FLOW DEMO',
//             CLASS=A,MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=IEBGENER
//SYSUT1   DD   DSN=INPUT.FILE,DISP=SHR
//SYSUT2   DD   SYSOUT=*
//SYSPRINT DD   SYSOUT=*
//SYSIN    DD   DUMMY`},{title:"1.3 — JES2 vs JES3",level:"Beginner",content:`JES (Job Entry Subsystem) manages job input, scheduling, and output. Every z/OS system runs either JES2 or JES3.

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

💡 Interview Tip: Most companies use JES2. Mention $ commands like $DA (display active) and $DQ (display queues).`,code:`//* JES2 JECL Statements
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
//STEP1    EXEC PGM=IEFBR14`},{title:"1.4 — Submitting & Monitoring Jobs",level:"Beginner",content:`Every mainframe developer needs to know how to submit JCL and monitor execution.

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

💡 Best Practice: Set NOTIFY=&SYSUID on every job. Use TYPRUN=SCAN to validate syntax without executing.`,code:`//MYJOB    JOB  (ACCT),'MONITOR DEMO',
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
//SYSIN    DD   DUMMY`},{title:"1.5 — Coding Conventions & Best Practices",level:"Beginner",content:`Following conventions makes JCL readable, maintainable, and less error-prone.

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

💡 Pro Tip: Write comments for the person debugging your job at 3 AM during an abend.`,code:`//*============================================================*
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
//SYSPRINT DD   SYSOUT=*`},{title:"2.1 — Statement Format & Columns",level:"Beginner",content:`JCL is column-sensitive. Every character position matters.

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

💡 Common Mistake: DSN=MY.DATA, DISP=SHR (space after comma) — DISP=SHR becomes a comment!`,code:`//* Column Layout:
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
//DD1      DD   DSN=MY.DATA,DISP=SHR`},{title:"2.2 — Continuation Rules",level:"Beginner",content:`JCL statements often exceed one line (columns 1–71). Continuation rules let you spread parameters across lines.

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

💡 Pro Tip: Align all continuations at column 16 for readability.`,code:`//* Basic Continuation
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
//         DD   DSN=MY.LOAD.LIB3,DISP=SHR`},{title:"2.3 — Comments & Documentation",level:"Beginner",content:`Well-documented JCL is critical for production maintainability.

Comment Lines (//*):
  Any line starting with //* is ignored by JES. Place anywhere in the JCL stream.

Inline Comments:
  Text after a space following the last operand is a comment. Warning: Don't use on continuation lines.

Documentation Standards:
  Job Header — Purpose, application, programmer, date, dependencies, restart instructions, change history
  Step Comments — Purpose, input/output files, expected return codes

Commenting Out Code:
  Change //STEP3 to //*STEP3 to disable a step temporarily.

💡 Best Practice: Include restart/recovery instructions in every production job header.`,code:`//*============================================================*
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
//             MSGLEVEL=(1,1),NOTIFY=&SYSUID`},{title:"2.4 — Special Statements",level:"Beginner",content:`Beyond JOB, EXEC, DD — JCL has special-purpose statements.

Null Statement (//) — Marks end of job in input stream. Required when multiple jobs concatenated.

Delimiter (/*) — Marks end of in-stream data after DD * or DD DATA.

JCLLIB — Must appear after JOB, before EXEC. Tells JES where to find PROCs and INCLUDE members.

SET — Defines/overrides symbolic parameter values. Appears after JOB statement.

INCLUDE — Pulls in JCL from a PDS member at that point. Member fetched from JCLLIB ORDER libraries.

OUTPUT — Controls SYSOUT processing (destination, copies, forms). Referenced by DD OUTPUT= parameter.

IF/THEN/ELSE/ENDIF — Conditional step execution based on return codes.

💡 Pro Tip: JCLLIB + INCLUDE is powerful for modular JCL. Define common DD groups once and INCLUDE everywhere.`,code:`//* Null Statement (end of job)
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
//REPORT  DD   SYSOUT=*,OUTPUT=*.RPTOUT`},{title:"2.5 — Positional vs Keyword Parameters",level:"Beginner",content:`Every JCL parameter is either positional or keyword.

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

💡 Interview Tip: Explain DISP=(NEW,CATLG,DELETE) as "New dataset, catalog on success, delete on failure."`,code:`//* Positional Parameters on JOB
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
//             SPACE=(TRK,(100,50),RLSE)`},{title:"3.1 — JOB Statement Overview",level:"Beginner",content:`The JOB statement is always first. It identifies the job to z/OS and JES.

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

💡 Pro Tip: REGION=0M = unlimited memory. TIME=1440 = unlimited CPU (24hrs). Use for testing; production jobs should have limits.`,code:`//* Minimal JOB
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
//             NOTIFY=&SYSUID`},{title:"3.2 — CLASS & MSGCLASS",level:"Beginner",content:`CLASS controls execution, MSGCLASS controls output.

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

💡 Common Mistake: Using a CLASS that no initiator services — your job sits in the input queue forever.`,code:`//* CLASS determines execution
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
//*   $DI                   Display all initiators`},{title:"3.3 — MSGLEVEL Parameter",level:"Beginner",content:`MSGLEVEL controls how much information appears in the job output. It has two positional sub-parameters.

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

💡 Best Practice: Always use MSGLEVEL=(1,1) during development. In production, some shops use (1,0) to reduce SPOOL space but still see full JCL on failure.`,code:`//* MSGLEVEL=(1,1) — Full output (recommended)
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
//* SYSPRINT — Program output`},{title:"3.4 — REGION & TIME",level:"Beginner",content:`REGION and TIME control resource limits for the job.

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

💡 Common Mistake: Setting TIME too low causes S322 ABEND (CPU time exceeded). Set TIME too high and a runaway program wastes resources.`,code:`//* REGION and TIME on JOB (applies to all steps)
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
//*   S80A — REGION not available`},{title:"3.5 — NOTIFY & TYPRUN",level:"Beginner",content:`NOTIFY tells z/OS who to message when the job completes. TYPRUN controls submission behavior.

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

💡 Best Practice: Always use TYPRUN=SCAN for new JCL. A clean scan doesn't guarantee success (data issues, program logic), but catches all JCL syntax errors.`,code:`//* NOTIFY — Send completion message
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
//* Release with: $A HOLDJOB (JES2 command)`},{title:"3.6 — PRTY & Scheduling",level:"Intermediate",content:`PRTY (Priority) controls how quickly your job gets selected from the input queue.

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

💡 Pro Tip: Use JOBRC=MAXRC (default) for most jobs. Schedulers like CA-7 use the job RC to determine success/failure.`,code:`//* PRTY — Job priority
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
//* Job RC = highest of STEP1/STEP2 RCs`},{title:"3.7 — Security: USER, PASSWORD, GROUP",level:"Intermediate",content:`Security parameters on the JOB statement control which RACF (or equivalent) identity runs the job.

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

💡 Interview Tip: Never hardcode passwords in JCL. Modern z/OS uses RACF surrogate, PassTickets, or certificate-based auth.`,code:`//* Basic security
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
//             NOTIFY=&SYSUID`},{title:"3.8 — RESTART Parameter",level:"Intermediate",content:`RESTART tells z/OS to skip steps and begin execution at a specific step. Essential for production restart/recovery.

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

💡 Best Practice: Document restart procedures in the job header. Include which datasets to delete and which steps are restartable.`,code:`//* Normal job (no restart)
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
//* Restarts from LKED step inside COBPROC`},{title:"4.1 — EXEC Statement Overview",level:"Beginner",content:`The EXEC statement tells z/OS which program to run or which procedure to invoke for this job step.

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

💡 Interview Tip: Know the program search order: STEPLIB → JOBLIB → Link List → LPA. STEPLIB is step-level, JOBLIB is job-level.`,code:`//* Execute a program
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
//             TIME=15`},{title:"4.2 — PARM Parameter",level:"Beginner",content:`PARM passes data to the executing program. The program receives it in its PARM field (COBOL: LINKAGE SECTION, Assembler: R1 points to parameter list).

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

💡 Common Mistake: Exceeding 100 chars causes truncation. Use SYSIN DD * for longer inputs instead.`,code:`//* Simple PARM
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
//             PARM.LKED='LIST,XREF'`},{title:"4.3 — COND Parameter (Step-Level)",level:"Intermediate",content:`COND on EXEC controls whether this step executes based on return codes from prior steps.

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

💡 Pro Tip: COND is confusing. Use IF/THEN/ELSE instead for readability. But you MUST know COND for legacy JCL.`,code:`//* COND=(0,NE) — Only run if all prior RCs = 0
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
//             COND=(8,LE)`},{title:"4.4 — STEPLIB & JOBLIB",level:"Beginner",content:`Programs must be in a load library z/OS can find. STEPLIB and JOBLIB tell z/OS where to look.

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

💡 Common Mistake: ABEND S806 means program not found. Check STEPLIB/JOBLIB concatenation order and dataset names.`,code:`//* JOBLIB — applies to all steps
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
//* 4. Check concatenation order`},{title:"4.5 — Program Search Order",level:"Intermediate",content:`When z/OS encounters PGM=MYPROG, it searches a specific chain of libraries to find the load module.

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

💡 Interview Tip: "What happens when you get S806?" — Program not found. Check STEPLIB, JOBLIB, verify DSN, check if module exists with ISPF 3.4.`,code:`//* Search Order Demo:
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
//*   ISPF 3.4: browse the PDS`},{title:"4.6 — Executing PROCs",level:"Intermediate",content:`A PROC (Procedure) is pre-written JCL stored in a PDS. Instead of repeating the same JCL in every job, you invoke the PROC by name.

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

💡 Pro Tip: Use MSGLEVEL=(1,1) to see PROC expansion in job output. Critical for debugging PROC overrides.`,code:`//* Invoke a catalogued PROC
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
//STEP1    EXEC MYPROC,ENV=TEST,HLQ=MYID`},{title:"4.7 — DYNAMNBR & ADDRSPC",level:"Advanced",content:`Less common EXEC parameters that advanced JCL coders should know.

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

💡 Pro Tip: Most modern programs handle dynamic allocation internally. Code DYNAMNBR only when the program or its documentation requires it.`,code:`//* DYNAMNBR for DB2 program
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
//             RD=R`},{title:"5.1 — DD Statement Overview",level:"Beginner",content:`The DD (Data Definition) statement is the most complex and most frequently used JCL statement. It defines every dataset a program uses.

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

💡 Interview Tip: The DD statement is where 80% of JCL errors occur. Master DSN, DISP, SPACE, and DCB.`,code:`//* Regular dataset
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
//         DD   DSN=MY.LIB2,DISP=SHR`},{title:"5.2 — DSN (Dataset Name)",level:"Beginner",content:`DSN (or DSNAME) specifies the dataset name.

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

💡 Pro Tip: Double dots after symbolic parameters: DSN=&HLQ..DATA — the first dot ends the symbol, the second is the qualifier separator.`,code:`//* Cataloged dataset
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
//CURGEN   DD   DSN=MY.GDG.BASE(0),DISP=SHR`},{title:"5.3 — DISP (Disposition)",level:"Beginner",content:`DISP is the most important DD parameter. It tells z/OS the current status of the dataset and what to do with it after the step.

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

💡 Interview Tip: Be able to explain every DISP combination. "DISP=(NEW,CATLG,DELETE)" = "Create new, catalog if step succeeds, delete if step fails."`,code:`//* Read existing (shared)
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
//DELDD    DD   DSN=MY.OLD.DATA,DISP=(OLD,DELETE)`},{title:"5.4 — SPACE Parameter",level:"Beginner",content:`SPACE allocates disk space for new datasets. Only needed with DISP=(NEW,...).

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

💡 Pro Tip: Over-allocate slightly and use RLSE. Running out of space (SB37) is much worse than wasting a few tracks.`,code:`//* CYL allocation
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
//             SPACE=(TRK,0)`},{title:"5.5 — DCB (Data Control Block)",level:"Beginner",content:`DCB defines the physical characteristics of a dataset — record format, record length, and block size.

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

💡 Best Practice: Always use BLKSIZE=0 for new datasets. z/OS picks the optimal block size for the device.`,code:`//* Fixed Blocked (most common)
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
//             DCB=(RECFM=U,BLKSIZE=32760,DSORG=PO)`},{title:"5.6 — SYSOUT & Output Processing",level:"Beginner",content:`SYSOUT routes program output to the JES SPOOL instead of a dataset. This is how reports, logs, and print output are handled.

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

💡 Pro Tip: Always code SYSPRINT DD SYSOUT=* and SYSOUT DD SYSOUT=* in your JCL. Missing these causes S013 ABEND when the program tries to write.`,code:`//* Basic SYSOUT
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
//CEEDUMP  DD   SYSOUT=*`},{title:"5.7 — In-Stream Data (DD * and DD DATA)",level:"Beginner",content:`In-stream data lets you include data directly in the JCL instead of reading from a dataset.

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

💡 Common Mistake: Forgetting /* at the end of in-stream data. The rest of your JCL becomes data input!`,code:`//* DD * with sort control cards
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
$$`},{title:"5.8 — DUMMY & NULLFILE",level:"Beginner",content:`DUMMY tells z/OS to accept I/O requests but not actually read or write any data. It's like /dev/null on Unix.

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

💡 Pro Tip: When debugging, temporarily change a DD to DUMMY to isolate whether that file is causing the problem.`,code:`//* DUMMY — suppress output
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
//DD1      DD   DSN=NULLFILE`},{title:"5.9 — DD Concatenation",level:"Intermediate",content:`Concatenation chains multiple datasets under one DD name. The program sees them as one continuous file.

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

💡 Best Practice: For STEPLIB, put your test/project library first, then production. This way your test version overrides production.`,code:`//* STEPLIB concatenation (search order)
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
//         DD   DSN=FILE.B,DISP=SHR`},{title:"5.10 — UNIT & VOL Parameters",level:"Intermediate",content:`UNIT and VOL control where new datasets are physically placed.

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

💡 Pro Tip: Use UNIT=VIO for temporary datasets that don't need to survive a system failure. It's significantly faster than disk.`,code:`//* UNIT=SYSDA (any disk — most common)
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
//             SPACE=(CYL,(10,5),RLSE)`},{title:"5.11 — Dataset Types & Organization",level:"Beginner",content:`z/OS supports several dataset organizations. Understanding them is essential for coding correct DD statements.

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

💡 Interview Tip: Know when to use each type. Sequential for batch data, PDS for libraries, VSAM for online applications, GDG for daily/weekly files.`,code:`//* Sequential dataset (PS)
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
//PREVGEN  DD   DSN=MY.DAILY.GDG(-1),DISP=SHR`},{title:"5.12 — LIKE & REFDD",level:"Intermediate",content:`LIKE and REFDD let you copy DCB attributes from an existing dataset or DD, avoiding repetitive coding.

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

💡 Pro Tip: LIKE is great for ensuring new datasets match existing ones. But verify the model dataset has the attributes you expect.`,code:`//* LIKE — copy attributes from existing dataset
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
//             SPACE=(CYL,(10,5),RLSE)`},{title:"5.13 — GDG (Generation Data Groups)",level:"Intermediate",content:`GDGs let you maintain multiple generations of a dataset. Think of them as versioned files — daily extracts, weekly backups, monthly reports.

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

💡 Best Practice: Use NOEMPTY/SCRATCH. This keeps the most recent N generations and cleans up old ones automatically.`,code:`//* IDCAMS — Define GDG base
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
//PREVGEN  DD   DSN=MY.DAILY.DATA(-1),DISP=SHR`},{title:"5.14 — Temporary Datasets",level:"Beginner",content:`Temporary datasets exist only during the job. They're automatically deleted when the job ends — no cleanup needed.

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

💡 Pro Tip: Use &&TEMP with UNIT=VIO for sort work. It's much faster than disk.`,code:`//* Named temporary dataset
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
//             DCB=(RECFM=FB,LRECL=80)`},{title:"5.15 — Multi-Volume & Large Datasets",level:"Advanced",content:`When a dataset is too large for one volume, z/OS can spread it across multiple volumes.

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

💡 Pro Tip: For very large datasets (100GB+), use SMS storage classes designed for large files and extended format.`,code:`//* Multi-volume allocation
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
//             SPACE=(CYL,(1000,200),RLSE)`},{title:"6.1 — What are PROCs?",level:"Intermediate",content:`A PROC (Procedure) is reusable JCL stored in a PDS member. Instead of copying the same JCL into every job, you invoke the PROC.

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

💡 Interview Tip: PROCs are like functions in programming — reusable, parameterized, and maintained centrally.`,code:`//* In-stream PROC
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
//RUN2     EXEC MYPROC,ENV=TEST,HLQ=MYID`},{title:"6.2 — Symbolic Parameters",level:"Intermediate",content:`Symbolic parameters make PROCs flexible. They're variables prefixed with & that get substituted at invocation.

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

💡 Common Mistake: Single dot after symbolic: &HLQ.DATA becomes PAYDATA (dot consumed). Use &HLQ..DATA for PAY.DATA.`,code:`//* PROC with symbolics
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
//INPUT    DD   DSN=&HLQ..&ENV..DATA,DISP=SHR`},{title:"6.3 — PROC DD Overrides",level:"Intermediate",content:`You can override or add DD statements in a PROC when invoking it.

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

💡 Pro Tip: Use MSGLEVEL=(1,1) to see PROC expansion with your overrides in job output. Essential for debugging.`,code:`//* PROC definition
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
//                   DISP=SHR`},{title:"6.4 — Nested PROCs",level:"Intermediate",content:`A PROC can call another PROC. This is nesting. z/OS supports up to 15 levels of nesting.

Example: Job calls PROC_A which calls PROC_B. Overrides use multi-level qualification.

Override Naming for Nested PROCs:
  //jobstep.procstep.ddname — One level
  //jobstep.outerproc.innerproc.ddname — Not directly supported

In practice, deep nesting makes JCL hard to debug. Most shops limit to 2 levels.

💡 Best Practice: Keep nesting to 1-2 levels maximum for maintainability.`,code:`//* Inner PROC (in PROCLIB)
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
//STEP1    EXEC OUTER,HLQ=TEST`},{title:"6.5 — JCLLIB Statement",level:"Intermediate",content:`JCLLIB ORDER tells JES where to search for PROCs and INCLUDE members. It must appear after JOB and before any EXEC.

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

💡 Best Practice: Put project-specific PROC libraries first, then shared/system libraries.`,code:`//MYJOB    JOB  (ACCT),'JCLLIB DEMO',
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
//*   4. SYS1.PROCLIB`},{title:"6.6 — INCLUDE Statement",level:"Intermediate",content:`INCLUDE pulls in JCL from a PDS member at the point where it appears. Think of it as #include in C.

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

💡 Pro Tip: INCLUDE is simpler than PROCs for reusing DD groups. Use PROCs for reusable steps, INCLUDE for reusable DD sets.`,code:`//* Member STDDB2DD in MY.PROJECT.PROCLIB:
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
/*`},{title:"6.7 — PROC vs INCLUDE",level:"Intermediate",content:`Both PROCs and INCLUDE promote reuse, but they serve different purposes.

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

💡 Best Practice: Use PROCs for step-level reuse, INCLUDE for DD-level reuse. They complement each other.`,code:`//* PROC — reusable step
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
/*`},{title:"6.8 — Common IBM PROCs",level:"Intermediate",content:`IBM provides standard PROCs for common tasks. Knowing these saves time.

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

💡 Pro Tip: View IBM PROC internals with ISPF 3.4: browse SYS1.PROCLIB(IGYWCLG) to understand what each step does.`,code:`//* COBOL Compile-Link-Go
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
//COMP.COBOL.SYSLIB DD DSN=MY.COPYLIB,DISP=SHR`},{title:"7.1 — IF/THEN/ELSE/ENDIF",level:"Intermediate",content:`IF/THEN/ELSE provides readable conditional step execution, replacing the confusing COND parameter.

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

💡 Pro Tip: Always use IF/THEN instead of COND for new JCL. It's much more readable.`,code:`//* Basic IF/THEN/ELSE
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
//         ENDIF`},{title:"7.2 — COND Parameter Deep Dive",level:"Intermediate",content:`COND is the legacy conditional parameter. You'll encounter it in millions of lines of existing JCL.

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

💡 Interview Tip: Be able to trace through COND logic. "What runs if STEP1=4, STEP2=8?" is a common interview question.`,code:`//* Only run if all prior steps RC=0
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
//* STEP5 COND=(4,LT) → 0<4? YES → SKIP`},{title:"7.3 — Return Code Testing Patterns",level:"Intermediate",content:`Common patterns for testing return codes and controlling job flow.

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

💡 Best Practice: Use IF/THEN for new JCL. Understand COND for maintaining legacy code. Always include a COND=EVEN cleanup step.`,code:`//* Pattern: Stop on first error + cleanup
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
//         ENDIF`},{title:"7.4 — JOBRC & Job-Level Return Code",level:"Intermediate",content:`JOBRC on the JOB statement controls what the overall job return code is.

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

💡 Best Practice: Use MAXRC (default) unless you have a specific reason. If a step's high RC is acceptable, document why you use LASTRC.`,code:`//* JOBRC=MAXRC (default)
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
//* Job RC = STEP3's RC only`},{title:"7.5 — COND=EVEN & COND=ONLY",level:"Intermediate",content:`COND=EVEN and COND=ONLY are special values for handling ABEND scenarios.

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

💡 Best Practice: Every production job should have a cleanup step with COND=EVEN to handle both normal and abnormal endings.`,code:`//* COND=EVEN — Always cleanup
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
//DELTEMP  DD   DSN=&&WORK,DISP=(OLD,DELETE)`},{title:"8.1 — IEFBR14 (Do-Nothing Program)",level:"Beginner",content:`IEFBR14 is the simplest program on z/OS — it does absolutely nothing. It receives control and immediately returns RC=0.

So why is it useful? Because z/OS allocates all DD datasets BEFORE the program runs and deallocates them AFTER. You use IEFBR14 to create, delete, or catalog datasets using only DD statements.

Common Uses:
  • Create empty datasets: DISP=(NEW,CATLG)
  • Delete datasets: DISP=(OLD,DELETE)
  • Catalog existing datasets: DISP=(OLD,CATLG)
  • Create GDG base entries (with IDCAMS instead usually)

💡 Pro Tip: IEFBR14 is pronounced "I-E-F-B-R-fourteen" and stands for "IEF" (z/OS prefix) + "BR 14" (branch to register 14, which is the return address in Assembler).`,code:`//* Create an empty sequential dataset
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
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0,DSORG=PO)`},{title:"8.2 — IEBGENER (Copy Utility)",level:"Beginner",content:`IEBGENER copies a sequential dataset (or PDS member) to another. It's the simplest copy utility.

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

💡 Pro Tip: Use ICEGENER or REPRO (IDCAMS) for better performance. IEBGENER is simple but not optimized.`,code:`//* Copy a sequential dataset
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
//SYSIN    DD   DUMMY`},{title:"8.3 — IDCAMS (Access Method Services)",level:"Intermediate",content:`IDCAMS is the Swiss Army knife of z/OS utilities. It manages VSAM datasets, catalogs, and performs many data operations.

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

💡 Pro Tip: Use SET MAXCC=0 after expected DELETE errors (when the dataset might not exist). Prevents unnecessary COND failures.`,code:`//* Delete (ignore if not found)
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
/*`},{title:"8.4 — DFSORT (Sort Utility)",level:"Intermediate",content:`DFSORT (or SORT) is one of the most used z/OS utilities. It sorts, merges, copies, and transforms data.

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

💡 Pro Tip: DFSORT can replace many custom programs. Master INCLUDE, OUTREC, and OUTFIL — they can do 80% of data transformation tasks.`,code:`//* Basic sort
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
/*`},{title:"8.5 — SORT: INCLUDE, OMIT & OUTREC",level:"Intermediate",content:`Advanced DFSORT features for filtering and reformatting data.

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

💡 Pro Tip: SORT with OPTION COPY + INCLUDE + OUTREC can replace many COBOL extract programs. Much faster to write and maintain.`,code:`//* INCLUDE with multiple conditions
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
/*`},{title:"8.6 — IEBCOPY (PDS Copy/Compress)",level:"Intermediate",content:`IEBCOPY copies, compresses, and manages PDS and PDSE libraries.

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

💡 Pro Tip: Use COMPRESS to fix B14 ABENDs (PDS directory full). But PDSE libraries don't need compression — they manage space automatically.`,code:`//* Copy entire PDS
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
//SYSIN    DD   DUMMY`},{title:"8.7 — IKJEFT01 (TSO in Batch)",level:"Intermediate",content:`IKJEFT01 runs TSO commands and REXX execs in batch mode. It's the bridge between interactive TSO and batch JCL.

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

💡 Pro Tip: IKJEFT01 with DYNAMNBR is essential for DB2 batch. Always include DYNAMNBR on the EXEC.`,code:`//* Run REXX in batch
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
/*`},{title:"8.8 — IEBUPDTE (Sequential Update)",level:"Intermediate",content:`IEBUPDTE modifies sequential datasets or PDS members in place. It can add, replace, or delete records.

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

💡 Pro Tip: IEBUPDTE is powerful but less commonly used today. Most shops use ISPF edit or source control systems instead.`,code:`//* Create PDS members from in-stream data
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
/*`},{title:"8.9 — ADRDSSU (Dump/Restore)",level:"Advanced",content:`ADRDSSU (Data Facility Storage Management Subsystem - DFSMSdss) dumps, restores, copies, and moves datasets at the physical level. It's the primary backup/restore utility.

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

💡 Pro Tip: ADRDSSU DUMP is the standard for dataset backups. Include it in your disaster recovery procedures.`,code:`//* DUMP datasets to backup
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
/*`},{title:"8.10 — SORT Work Files & Performance",level:"Intermediate",content:`DFSORT uses temporary work files (SORTWKxx) for large sorts. Proper configuration ensures good performance.

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

💡 Pro Tip: Most modern shops configure DFSORT for dynamic work files. You may not need SORTWKxx DDs at all.`,code:`//* Sort with explicit work files
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
/*`},{title:"8.11 — SORT: OUTFIL & Multiple Outputs",level:"Intermediate",content:`OUTFIL lets you write to multiple output files from a single sort pass. This eliminates multiple passes over the same input.

OUTFIL FNAMES=ddname — Route records to a specific DD
  Can include its own INCLUDE, OUTREC, and other options per output file.

OUTFIL Features:
  • INCLUDE/OMIT — Filter per output
  • OUTREC — Reformat per output
  • HEADER1/TRAILER1 — Add headers/trailers per output
  • SECTIONS — Create report sections
  • REMOVECC — Remove carriage control

Practical Example: Split a transaction file into region-specific files, each with its own format and headers.

💡 Pro Tip: OUTFIL with SECTIONS and HEADER1/TRAILER1 can generate formatted reports, replacing many COBOL report programs.`,code:`//* Split input into multiple outputs
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
/*`},{title:"8.12 — ICETOOL (DFSORT Batch Tool)",level:"Advanced",content:`ICETOOL extends DFSORT's capabilities with operations that would otherwise need custom programs.

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

💡 Pro Tip: ICETOOL SELECT with FIRST/LAST is incredibly useful for finding duplicates or getting unique records.`,code:`//* ICETOOL — Count records
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
/*`},{title:"8.13 — IEBPTPCH (Print/Punch)",level:"Beginner",content:`IEBPTPCH prints or punches (creates 80-byte records) from sequential datasets or PDS members.

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

💡 Pro Tip: For quick hex dumps, IEBPTPCH with TYPORG=PS,MAXFLDS=1 is simpler than writing a program.`,code:`//* Print dataset in hex
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
/*`},{title:"8.14 — Common Utility Reference",level:"Intermediate",content:`Quick reference for z/OS utilities you'll encounter regularly.

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

💡 Pro Tip: Keep a cheat sheet of utility DD names. Each utility has its own required DDs, and a missing DD causes an ABEND.`,code:`//* Quick Reference: Common Utility DD Names
//*
//* IEBGENER:  SYSUT1(in) SYSUT2(out) SYSPRINT SYSIN
//* IEBCOPY:   SYSUT1(in) SYSUT2(out) SYSUT3 SYSUT4
//*            SYSPRINT SYSIN
//* IDCAMS:    SYSPRINT SYSIN + custom DDs
//* DFSORT:    SORTIN SORTOUT SORTWKxx SYSOUT SYSIN
//* IKJEFT01:  SYSTSPRT SYSTSIN SYSEXEC
//* IEFBR14:   (just DD statements for create/delete)
//* ADRDSSU:   SYSPRINT SYSIN + custom DDs
//* IEBPTPCH:  SYSUT1(in) SYSUT2(out) SYSPRINT SYSIN`},{title:"8.15 — File-AID & Other Vendor Utilities",level:"Intermediate",content:`Beyond IBM utilities, many shops use vendor products for data management.

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

💡 Pro Tip: Know which vendor tools your shop uses. They often replace multiple IBM utilities with a single, more powerful tool.`,code:`//* File-AID example (BMC)
//FILECOPY EXEC PGM=FILEAID
//SYSPRINT DD   SYSOUT=*
//DD01     DD   DSN=MY.INPUT.DATA,DISP=SHR
//DD01O    DD   DSN=MY.OUTPUT.DATA,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5),RLSE)
//SYSIN    DD   *
$$DD01 COPY
/*`},{title:"9.1 — Multi-Step Job Design",level:"Advanced",content:`Production jobs typically have multiple steps that work together. Good design ensures reliability, restartability, and maintainability.

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

💡 Best Practice: Design every job to be restartable from any step. This means each step should be idempotent or have proper cleanup.`,code:`//* ETL Job Pattern
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
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN`},{title:"9.2 — Symbolic Parameters & SET",level:"Intermediate",content:`SET defines symbolic parameters outside PROCs, making regular JCL dynamic and environment-aware.

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

💡 Pro Tip: Use SET to create environment-independent JCL. One JCL with SET ENV=PROD or SET ENV=TEST.`,code:`//* Environment-based JCL
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
//*   PAY.PROD.DAILY.EXTRACT → PAY.TEST.DAILY.EXTRACT`},{title:"9.3 — Referbacks",level:"Intermediate",content:`Referbacks let you reference attributes from another DD statement, avoiding repetition and ensuring consistency.

DSN Referback: DSN=*.stepname.ddname — Use same dataset name
DCB Referback: DCB=*.stepname.ddname — Copy DCB attributes
VOL Referback: VOL=REF=*.stepname.ddname — Use same volume

For PROCs: DSN=*.stepname.procstep.ddname

Rules:
  • The referenced DD must appear earlier in the JCL
  • Referback resolves at allocation time
  • Can't referback to a DUMMY or SYSOUT DD for DSN

💡 Pro Tip: DSN referback is the most common. Use it when multiple steps need the same dataset — change the name in one place.`,code:`//* DSN Referback
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
//             SPACE=(CYL,(10,5),RLSE)`},{title:"9.4 — OUTPUT Statement",level:"Intermediate",content:`The OUTPUT JCL statement provides centralized control over SYSOUT processing — where it goes, how many copies, what forms to use.

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

💡 Pro Tip: Use OUTPUT with DEFAULT=YES for consistent output routing across all SYSOUT DDs in the job.`,code:`//* OUTPUT statement with DD reference
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
//SYSOUT   DD   SYSOUT=*`},{title:"9.5 — DFSORT Advanced: JOINKEYS",level:"Advanced",content:`JOINKEYS matches records from two input files based on a common key — like a SQL JOIN but in DFSORT.

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

💡 Pro Tip: JOINKEYS can replace many COBOL match-merge programs. It's simpler and much faster.`,code:`//* JOINKEYS — Match two files
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
/*`},{title:"9.6 — SMS (Storage Management)",level:"Advanced",content:`SMS (Storage Management Subsystem) automates storage management. Instead of specifying UNIT/VOL, you specify classes and let SMS decide.

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

💡 Pro Tip: Ask your storage admin what STORCLAS/MGMTCLAS/DATACLAS to use. It varies by installation.`,code:`//* SMS-managed dataset
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
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)`},{title:"9.7 — JCL for DB2 Programs",level:"Intermediate",content:`Running DB2 programs in batch requires specific JCL patterns using IKJEFT01 (TSO in batch) or the DSN command.

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

💡 Pro Tip: Always include SYSUDUMP DD SYSOUT=* for DB2 batch — it provides critical diagnostic info on ABEND.`,code:`//* DB2 batch program execution
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
/*`},{title:"9.8 — JCL for COBOL Compile & Run",level:"Intermediate",content:`Compiling and running COBOL programs involves multiple steps: precompile (if DB2), compile, link-edit, and execute.

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

💡 Pro Tip: For production, use OPT(2),RENT. For debugging, use TEST,LIST,MAP,NOOPT.`,code:`//* COBOL Compile-Link-Go (using PROC)
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
//CLG.GO.OUTPUT DD SYSOUT=*`},{title:"9.9 — Tape Processing",level:"Advanced",content:`While disk is dominant, tape is still used for backups, archives, and large data transfers.

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

💡 Pro Tip: Tape processing is declining but still appears in interviews. Know the basics of LABEL and multi-file tape concepts.`,code:`//* Write to tape
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
//SYSIN    DD   DUMMY`},{title:"9.10 — Performance Tuning JCL",level:"Advanced",content:`JCL choices significantly impact job performance. These tips can cut runtime dramatically.

SPACE: Over-allocate slightly with RLSE. SB37 restarts are expensive.

BLKSIZE: Use BLKSIZE=0 (system-optimal) or large blocks (27920 for FB80). Larger blocks = fewer I/O operations.

BUFNO: Increase buffer count for sequential I/O: DCB=(BUFNO=20). More buffers = more read-ahead.

SORT Work Files: Use multiple SORTWKxx on different volumes. Use UNIT=VIO for small sorts.

REGION: Don't over-restrict. REGION=0M lets the program use what it needs.

Temporary Datasets: Use UNIT=VIO for &&TEMP files. Memory-based I/O is orders of magnitude faster.

Concatenation Order: Put most-likely datasets first in STEPLIB concatenation.

DISP=SHR vs OLD: SHR allows concurrent access. Only use OLD when exclusive access is required.

💡 Pro Tip: The biggest performance wins come from BLKSIZE optimization and SORT tuning. A bad BLKSIZE can make a job 10x slower.`,code:`//* Optimized JCL
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
/*`},{title:"10.1 — Production Job Template",level:"Intermediate",content:`A standardized production job template ensures consistency across all jobs in your shop.

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

💡 Best Practice: Create a template and enforce it via code review. Consistency saves hours during production incidents.`,code:`//*============================================================*
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
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN`},{title:"10.2 — Restart & Recovery",level:"Advanced",content:`When production jobs fail, you need a clear restart procedure to get back on track quickly.

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

💡 Best Practice: Document restart instructions in every job's header comments. Include which datasets to delete and which step to restart from.`,code:`//* Restart procedure example
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
//             SPACE=(CYL,(20,10),RLSE)`},{title:"10.3 — Common JCL Errors & Fixes",level:"Beginner",content:`Quick reference for the most common JCL errors and how to fix them.

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

💡 Pro Tip: When you see an error, check JESYSMSG FIRST — it shows allocation details and the exact point of failure.`,code:`//* Fix NOT CATLG 2: Delete before recreate
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
//             UNIT=(SYSDA,2)`},{title:"10.4 — JCL for Batch Scheduling",level:"Intermediate",content:`Production jobs are scheduled by automation tools, not submitted manually. Understanding scheduling integration is essential.

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

💡 Pro Tip: Test scheduling JCL by submitting manually with the scheduler's USER/GROUP first. Verify RACF access and all dataset authorities.`,code:`//* Production scheduled job
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
//* ABEND: page on-call support`},{title:"10.5 — Debugging JCL Problems",level:"Intermediate",content:`Systematic debugging saves hours. Follow this checklist for any JCL failure.

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

💡 Pro Tip: When debugging, use MSGLEVEL=(1,1) and add SYSUDUMP DD SYSOUT=* to every step. The extra output is invaluable.`,code:`//* Debugging-friendly JCL
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
//CEEDUMP  DD   SYSOUT=*`},{title:"10.6 — JCL Security Best Practices",level:"Advanced",content:`Security in JCL involves RACF, dataset protection, and job submission controls.

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

💡 Best Practice: Request minimum required access. Don't ask for ALTER when READ is sufficient.`,code:`//* Secure job submission
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
//*   (Visible in SPOOL output!)`},{title:"10.7 — Interview Questions (50+ Q&A)",level:"All Levels",content:`Comprehensive JCL interview questions organized by difficulty. Study these to ace any mainframe interview.

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

💡 Study Tip: Focus on Beginner + Intermediate for initial interviews. Advanced questions come in senior-level interviews. Always give real-world examples when answering.`,code:`//* Quick reference — JCL you'll write most often:
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
/*`},{title:"10.8 — JCL Cheat Sheet",level:"All Levels",content:`Complete JCL quick reference. Bookmark this lesson.

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

💡 Print this cheat sheet. Every mainframe developer has one at their desk.`,code:`//* === JCL TEMPLATE (copy-paste ready) ===
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
//CLEANUP  EXEC PGM=IEFBR14,COND=EVEN`}]},vo={id:"cobol",icon:"📝",title:"COBOL",subtitle:"Common Business Oriented Language",color:"#ff6b35",level:"Beginner → Expert",description:"Powers $3 trillion in daily commerce. 220 billion lines in production. The language that runs the world.",sections:[{title:"What is COBOL?",level:"Beginner",content:`COBOL (Common Business Oriented Language) is the world's most-used business programming language. Created in 1959 by a committee including Grace Hopper, it processes $3 trillion in daily commerce.

Why COBOL Matters Today:
  • 95% of ATM transactions use COBOL
  • 80% of in-person financial transactions use COBOL
  • 220+ billion lines of COBOL in production
  • Banks, insurance, government, airlines depend on it

Key Characteristics:
  • English-like syntax — reads like prose
  • Column-sensitive format (columns 1-6, 7, 8-11, 12-72, 73-80)
  • Four divisions: IDENTIFICATION, ENVIRONMENT, DATA, PROCEDURE
  • Strongly typed — all variables declared with PIC clause
  • Compiled language — COBOL source → object → load module

Column Layout (Fixed Format):
  Cols 1-6:  Sequence numbers (ignored by compiler)
  Col 7:     Indicator (* = comment, - = continuation, D = debug)
  Cols 8-11: Area A (divisions, sections, paragraphs, 01/77 levels)
  Cols 12-72: Area B (statements, subordinate data items)
  Cols 73-80: Identification (ignored)

💡 Interview Tip: Know why COBOL survives — cost of replacement, billions of lines, proven reliability.`,code:`       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       AUTHOR. HARIKRISHNAN.
      *
       ENVIRONMENT DIVISION.
      *
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-MESSAGE     PIC X(30)
                           VALUE 'HELLO MAINFRAME WORLD!'.
      *
       PROCEDURE DIVISION.
       MAIN-PARA.
           DISPLAY WS-MESSAGE
           STOP RUN.`},{title:"IDENTIFICATION DIVISION",level:"Beginner",content:`The first division. Identifies the program. Only PROGRAM-ID is required.

Required Paragraph:
  PROGRAM-ID. program-name.
  • 1-30 characters (first 8 significant for z/OS)
  • Used by CALL statement and load module name

Optional Paragraphs:
  AUTHOR. name.
  INSTALLATION. location.
  DATE-WRITTEN. date.
  DATE-COMPILED. (compiler inserts actual date)
  SECURITY. classification.

💡 Pro Tip: Only PROGRAM-ID matters to the compiler. Others are documentation.`,code:`       IDENTIFICATION DIVISION.
       PROGRAM-ID. PAYCALC.
       AUTHOR. HARIKRISHNAN K.
       DATE-WRITTEN. 2026-03-16.
       DATE-COMPILED.`},{title:"ENVIRONMENT DIVISION",level:"Beginner",content:`Maps the program to its runtime environment. Two sections: CONFIGURATION and INPUT-OUTPUT.

CONFIGURATION SECTION:
  SOURCE-COMPUTER. IBM-Z.
  OBJECT-COMPUTER. IBM-Z.
  SPECIAL-NAMES. (map special chars, switches, currency)

INPUT-OUTPUT SECTION:
  FILE-CONTROL. — Maps logical file names to physical DDs
    SELECT file-name ASSIGN TO dd-name
      ORGANIZATION IS SEQUENTIAL/INDEXED/RELATIVE
      ACCESS MODE IS SEQUENTIAL/RANDOM/DYNAMIC
      FILE STATUS IS ws-status-field
      RECORD KEY IS key-field (for INDEXED)

  The SELECT statement is critical — it connects your program's file names to JCL DD names. ASSIGN TO 'CUSTMAST' means //CUSTMAST DD in JCL.

💡 Interview Tip: Always code FILE STATUS. Check it after every I/O operation.`,code:`       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SOURCE-COMPUTER. IBM-Z.
       OBJECT-COMPUTER. IBM-Z.
      *
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT CUSTOMER-FILE
               ASSIGN TO CUSTMAST
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS CUST-ID
               FILE STATUS IS WS-CUST-FS.
      *
           SELECT REPORT-FILE
               ASSIGN TO RPTFILE
               ORGANIZATION IS SEQUENTIAL
               FILE STATUS IS WS-RPT-FS.`},{title:"DATA DIVISION Overview",level:"Beginner",content:`The DATA DIVISION declares all data — files, variables, constants, parameters. Four sections:

FILE SECTION:
  Describes record layouts for files defined in SELECT statements.
  FD (File Description) → 01 record → subordinate fields.

WORKING-STORAGE SECTION:
  Variables that persist throughout program execution. Most program variables live here.

LOCAL-STORAGE SECTION:
  Variables reinitialized each time the program is called. Used in called subprograms.

LINKAGE SECTION:
  Variables passed from calling program via CALL...USING. Also receives JCL PARM data.

💡 Pro Tip: WORKING-STORAGE is initialized once (at load). LOCAL-STORAGE reinitializes on every CALL.`,code:`       DATA DIVISION.
       FILE SECTION.
       FD  CUSTOMER-FILE.
       01  CUST-RECORD.
           05  CUST-ID          PIC 9(8).
           05  CUST-NAME        PIC X(30).
           05  CUST-BALANCE     PIC S9(9)V99 COMP-3.
      *
       WORKING-STORAGE SECTION.
       01  WS-FLAGS.
           05  WS-EOF-FLAG      PIC X VALUE 'N'.
               88  EOF-REACHED  VALUE 'Y'.
           05  WS-CUST-FS       PIC XX VALUE '00'.
      *
       LINKAGE SECTION.
       01  LS-PARM.
           05  LS-PARM-LEN      PIC S9(4) COMP.
           05  LS-PARM-DATA     PIC X(100).`},{title:"PIC Clause — Defining Data",level:"Beginner",content:`PICTURE (PIC) clause defines a field's type, size, and format.

Alphanumeric:
  X — Any character. PIC X(30) = 30-char string.
  A — Alphabetic only. PIC A(20) = letters/spaces only.

Numeric:
  9 — Digit. PIC 9(5) = 5-digit number.
  S — Sign. PIC S9(5) = signed number (+/-).
  V — Implied decimal. PIC 9(5)V99 = 5 digits, 2 decimal places.
  P — Assumed decimal scaling. Rarely used.

Edited (for display/reports):
  Z — Zero suppress. PIC ZZZ,ZZ9.99 → "  1,234.56"
  $ — Currency. PIC $ZZZ,ZZ9.99
  - — Sign. PIC -(5)9 shows negative sign.
  CR/DB — Credit/Debit indicators.

Common Patterns:
  PIC X(10) — 10-char text
  PIC 9(5) — 5-digit integer
  PIC S9(7)V99 COMP-3 — Packed decimal (money)
  PIC S9(4) COMP — Binary halfword
  PIC X VALUE SPACES — Initialized text
  PIC 9 VALUE ZERO — Initialized number

💡 Interview Favorite: "What's PIC S9(5)V99 COMP-3?" Answer: "Signed 5.2 packed decimal, stores 7 digits + sign in 4 bytes. Used for financial calculations." `,code:`       01  WS-EXAMPLES.
           05  WS-NAME          PIC X(30).
           05  WS-AGE           PIC 99.
           05  WS-SALARY        PIC S9(7)V99 COMP-3.
           05  WS-COUNT         PIC S9(4) COMP.
           05  WS-RATE          PIC 9V9(4).
           05  WS-EDITED-SAL    PIC $ZZZ,ZZ9.99.
           05  WS-DATE-DISP     PIC 9(4)/99/99.`},{title:"Level Numbers & Data Hierarchy",level:"Beginner",content:`Level numbers define the structure of data — parent-child relationships.

Level Numbers:
  01    — Record level (Area A). Group or elementary item.
  02-49 — Subordinate fields. Higher number = deeper nesting.
  66    — RENAMES (redefines a range of fields).
  77    — Standalone elementary item (Area A). No subordinates.
  88    — Condition name (boolean values for a field).

Group vs Elementary:
  Group item — Has subordinates, treated as PIC X (alphanumeric).
  Elementary item — Has PIC clause, no subordinates.

Example Hierarchy:
  01 EMPLOYEE-RECORD (group)
    05 EMP-ID (elementary)
    05 EMP-NAME (group)
      10 FIRST-NAME (elementary)
      10 LAST-NAME (elementary)
    05 EMP-SALARY (elementary)

88-Level (Condition Names):
  05 GENDER PIC X.
    88 MALE VALUE 'M'.
    88 FEMALE VALUE 'F'.
  IF MALE ... (instead of IF GENDER = 'M')

💡 Pro Tip: Use 05, 10, 15 increments — leaves room for inserting levels later.`,code:`       01  EMPLOYEE-RECORD.
           05  EMP-ID              PIC 9(6).
           05  EMP-NAME.
               10  EMP-FIRST       PIC X(20).
               10  EMP-LAST        PIC X(25).
           05  EMP-DEPT            PIC X(4).
           05  EMP-STATUS          PIC X.
               88  ACTIVE          VALUE 'A'.
               88  TERMINATED      VALUE 'T'.
               88  ON-LEAVE        VALUE 'L'.
           05  EMP-SALARY          PIC S9(7)V99 COMP-3.
      *
       77  WS-COUNTER             PIC S9(4) COMP VALUE 0.`},{title:"COMP Types — Storage Formats",level:"Beginner",content:`USAGE clause controls how data is stored in memory. Critical for performance and storage.

DISPLAY (Default):
  One byte per digit. PIC 9(5) = 5 bytes.
  Human-readable. Used for input/output files.

COMP (BINARY):
  Binary format. PIC S9(4) COMP = 2 bytes (halfword).
  PIC S9(9) COMP = 4 bytes (fullword).
  PIC S9(18) COMP = 8 bytes (doubleword).
  Best for: Subscripts, counters, loop variables.

COMP-1 (Single-precision float):
  4 bytes. Approximate values. Rarely used in business.

COMP-2 (Double-precision float):
  8 bytes. More precision than COMP-1. Rarely used in business.

COMP-3 (Packed Decimal):
  Two digits per byte, last nibble = sign.
  PIC S9(5) COMP-3 = 3 bytes (5 digits + sign).
  PIC S9(7)V99 COMP-3 = 5 bytes.
  Best for: All financial calculations, money, amounts.

  Why COMP-3? z/OS has hardware instructions for packed decimal arithmetic. It's fast and exact (no floating-point rounding).

💡 Interview Tip: "For money, always COMP-3. For subscripts/counters, always COMP." `,code:`       01  WS-STORAGE-EXAMPLES.
      *    DISPLAY — 5 bytes
           05  WS-DISP        PIC 9(5).
      *    COMP (binary) — 2 bytes
           05  WS-BINARY      PIC S9(4) COMP.
      *    COMP-3 (packed) — 4 bytes
           05  WS-PACKED      PIC S9(5)V99 COMP-3.
      *    COMP-1 (float) — 4 bytes
           05  WS-FLOAT       COMP-1.
      *    COMP-2 (double) — 8 bytes
           05  WS-DOUBLE      COMP-2.`},{title:"MOVE Statement",level:"Beginner",content:`MOVE copies data from source to destination. The most-used COBOL statement.

Basic: MOVE source TO destination
  MOVE 'HELLO' TO WS-NAME
  MOVE 0 TO WS-COUNTER
  MOVE SPACES TO WS-RECORD

MOVE Rules:
  • Alphanumeric → left-justified, padded with spaces
  • Numeric → right-justified, padded with zeros
  • Truncation occurs if destination is smaller
  • MOVE SPACES TO group-item — fills entire group with spaces

MOVE CORRESPONDING:
  MOVE CORRESPONDING group-1 TO group-2
  Moves fields with matching names between groups.

Special Figurative Constants:
  SPACES / SPACE — fill with spaces
  ZEROS / ZEROES / ZERO — fill with zeros
  HIGH-VALUES — fill with X'FF'
  LOW-VALUES — fill with X'00'

💡 Common Mistake: MOVE numeric-display TO comp-3 field when source has spaces → S0C7.`,code:`           MOVE 'HARIKRISHNAN' TO WS-NAME
           MOVE ZEROS TO WS-COUNTER
           MOVE SPACES TO WS-OUTPUT-REC
           MOVE HIGH-VALUES TO WS-COMPARE
      *
      *    MOVE CORRESPONDING:
           MOVE CORRESPONDING INPUT-REC TO OUTPUT-REC
      *
      *    Truncation example:
      *    WS-SHORT PIC X(5)
           MOVE 'HELLO WORLD' TO WS-SHORT
      *    Result: 'HELLO' (truncated)`},{title:"Arithmetic Statements",level:"Beginner",content:`COBOL provides English-like arithmetic. All support ON SIZE ERROR for overflow detection.

ADD: ADD A TO B  (B = B + A)
  ADD A B TO C   (C = C + A + B)
  ADD A TO B GIVING C  (C = A + B, B unchanged)

SUBTRACT: SUBTRACT A FROM B  (B = B - A)
  SUBTRACT A FROM B GIVING C

MULTIPLY: MULTIPLY A BY B  (B = B * A)
  MULTIPLY A BY B GIVING C

DIVIDE: DIVIDE A INTO B  (B = B / A)
  DIVIDE A INTO B GIVING C REMAINDER D

COMPUTE (most flexible):
  COMPUTE WS-RESULT = (A + B) * C / D ** 2
  Supports: + - * / ** (exponent)
  Follows mathematical precedence rules.

ON SIZE ERROR:
  ADD A TO B ON SIZE ERROR PERFORM OVERFLOW-HANDLER
  Fires when result exceeds destination size.

ROUNDED:
  COMPUTE WS-AVG ROUNDED = WS-TOTAL / WS-COUNT
  Rounds to the decimal places of the receiving field.

💡 Pro Tip: Use COMPUTE for complex math. It's cleaner than chained ADD/SUBTRACT.`,code:`           ADD WS-AMOUNT TO WS-TOTAL
           SUBTRACT WS-TAX FROM WS-GROSS
               GIVING WS-NET
           MULTIPLY WS-HOURS BY WS-RATE
               GIVING WS-PAY ROUNDED
           DIVIDE WS-TOTAL BY WS-COUNT
               GIVING WS-AVERAGE ROUNDED
               REMAINDER WS-REMAINDER
      *
           COMPUTE WS-RESULT ROUNDED =
               (WS-BASE * WS-RATE) +
               (WS-BONUS * 0.85) -
               WS-DEDUCTIONS
               ON SIZE ERROR
                   MOVE 99999 TO WS-RESULT
                   DISPLAY 'OVERFLOW IN CALC'
           END-COMPUTE`},{title:"IF/ELSE Conditional Logic",level:"Beginner",content:`IF tests conditions and branches logic accordingly.

Basic: IF condition THEN statements ELSE statements END-IF

Comparison Operators:
  = or EQUAL TO     > or GREATER THAN
  < or LESS THAN    >= or NOT LESS THAN
  NOT = or NOT EQUAL TO

Compound Conditions:
  AND — Both must be true
  OR — Either can be true
  NOT — Negation

Class Tests:
  IF WS-FIELD IS NUMERIC
  IF WS-FIELD IS ALPHABETIC
  IF WS-FIELD IS SPACES
  IF WS-FIELD IS ZEROS

88-Level Conditions:
  IF ACTIVE (instead of IF EMP-STATUS = 'A')
  SET ACTIVE TO TRUE (sets underlying field to 'A')

Nested IF:
  Use END-IF to scope each level. Avoid deep nesting — use EVALUATE instead.

💡 Pro Tip: Always use END-IF (not periods) to terminate IF blocks. Periods end ALL nested IFs.`,code:`           IF WS-BALANCE > 1000
               DISPLAY 'HIGH BALANCE'
           ELSE IF WS-BALANCE > 0
               DISPLAY 'POSITIVE'
           ELSE
               DISPLAY 'ZERO OR NEGATIVE'
           END-IF
      *
           IF WS-AGE >= 18 AND WS-STATUS = 'A'
               PERFORM PROCESS-ADULT
           END-IF
      *
           IF WS-AMOUNT IS NUMERIC
               ADD WS-AMOUNT TO WS-TOTAL
           ELSE
               DISPLAY 'INVALID AMOUNT'
           END-IF
      *
      *    88-level condition:
           IF ACTIVE
               PERFORM ACTIVE-PROCESSING
           END-IF`},{title:"PERFORM Statement",level:"Beginner",content:`PERFORM is COBOL's loop and subroutine mechanism. Most important control statement.

Basic PERFORM (call a paragraph):
  PERFORM para-name

PERFORM THRU:
  PERFORM para-name THRU para-exit
  Executes all paragraphs from para-name to para-exit.

PERFORM N TIMES:
  PERFORM PROCESS-RECORD 10 TIMES

PERFORM UNTIL (while loop):
  PERFORM PROCESS-RECORD UNTIL WS-EOF = 'Y'
  Tests condition BEFORE each iteration (TEST BEFORE is default).

PERFORM WITH TEST AFTER:
  PERFORM PROCESS-RECORD WITH TEST AFTER UNTIL WS-EOF = 'Y'
  Executes at least once (like DO...WHILE).

PERFORM VARYING (for loop):
  PERFORM PROCESS-ITEM
    VARYING WS-IDX FROM 1 BY 1
    UNTIL WS-IDX > WS-MAX

Inline PERFORM:
  PERFORM UNTIL WS-EOF = 'Y'
    READ INPUT-FILE INTO WS-RECORD
      AT END SET EOF-REACHED TO TRUE
    END-READ
    IF NOT EOF-REACHED
      PERFORM PROCESS-RECORD
    END-IF
  END-PERFORM

💡 Interview Tip: Know the difference between PERFORM UNTIL (test before) and PERFORM WITH TEST AFTER (test after).`,code:`       PROCEDURE DIVISION.
       MAIN-PARA.
           PERFORM INIT-PARA
           PERFORM PROCESS-PARA
               UNTIL EOF-REACHED
           PERFORM CLEANUP-PARA
           STOP RUN.
      *
       INIT-PARA.
           OPEN INPUT CUST-FILE
           READ CUST-FILE INTO WS-CUST-REC
               AT END SET EOF-REACHED TO TRUE
           END-READ.
      *
       PROCESS-PARA.
           ADD 1 TO WS-COUNT
           PERFORM VALIDATE-RECORD
           READ CUST-FILE INTO WS-CUST-REC
               AT END SET EOF-REACHED TO TRUE
           END-READ.
      *
       CLEANUP-PARA.
           CLOSE CUST-FILE
           DISPLAY 'RECORDS: ' WS-COUNT.`},{title:"EVALUATE (Switch/Case)",level:"Beginner",content:`EVALUATE replaces nested IF statements. Like switch/case in other languages.

EVALUATE TRUE:
  EVALUATE TRUE
    WHEN condition-1  statement-1
    WHEN condition-2  statement-2
    WHEN OTHER        default-statement
  END-EVALUATE

EVALUATE variable:
  EVALUATE WS-DEPT
    WHEN 'HR'    PERFORM PROCESS-HR
    WHEN 'FIN'   PERFORM PROCESS-FINANCE
    WHEN 'IT'    PERFORM PROCESS-IT
    WHEN OTHER   PERFORM PROCESS-DEFAULT
  END-EVALUATE

EVALUATE with ALSO (multiple variables):
  EVALUATE WS-STATUS ALSO WS-TYPE
    WHEN 'A' ALSO 'R'  PERFORM ACTIVE-REGULAR
    WHEN 'A' ALSO ANY  PERFORM ACTIVE-OTHER
    WHEN ANY ALSO ANY  PERFORM DEFAULT-ACTION
  END-EVALUATE

EVALUATE with THRU (ranges):
  EVALUATE WS-SCORE
    WHEN 90 THRU 100  MOVE 'A' TO WS-GRADE
    WHEN 80 THRU 89   MOVE 'B' TO WS-GRADE
    WHEN 70 THRU 79   MOVE 'C' TO WS-GRADE
    WHEN OTHER         MOVE 'F' TO WS-GRADE
  END-EVALUATE

💡 Pro Tip: Always prefer EVALUATE over nested IF. It's cleaner and easier to maintain.`,code:`           EVALUATE TRUE
               WHEN WS-AMOUNT > 10000
                   MOVE 'HIGH' TO WS-CATEGORY
                   PERFORM HIGH-VALUE-CHECK
               WHEN WS-AMOUNT > 1000
                   MOVE 'MED' TO WS-CATEGORY
               WHEN WS-AMOUNT > 0
                   MOVE 'LOW' TO WS-CATEGORY
               WHEN OTHER
                   MOVE 'ERR' TO WS-CATEGORY
                   PERFORM ERROR-HANDLER
           END-EVALUATE
      *
           EVALUATE WS-ACTION ALSO WS-STATUS
               WHEN 'ADD' ALSO 'A'
                   PERFORM ADD-ACTIVE
               WHEN 'DEL' ALSO ANY
                   PERFORM DELETE-RECORD
               WHEN OTHER
                   DISPLAY 'INVALID COMBINATION'
           END-EVALUATE`},{title:"DISPLAY & ACCEPT",level:"Beginner",content:`DISPLAY writes to SYSOUT (or terminal). ACCEPT reads from SYSIN (or terminal).

DISPLAY:
  DISPLAY 'HELLO WORLD'
  DISPLAY 'COUNT: ' WS-COUNT
  DISPLAY WS-REC (displays entire variable)
  DISPLAY 'TOTAL=' WS-TOTAL UPON SYSOUT

ACCEPT:
  ACCEPT WS-INPUT FROM SYSIN
  ACCEPT WS-DATE FROM DATE (YYMMDD format)
  ACCEPT WS-TIME FROM TIME (HHMMSSss format)
  ACCEPT WS-DAY FROM DAY (YYDDD format)
  ACCEPT WS-DAY-OF-WEEK FROM DAY-OF-WEEK (1=Mon)

DISPLAY is your primary debugging tool in batch COBOL. Unlike print statements in other languages, DISPLAY goes to the JES SYSOUT spool.

💡 Pro Tip: Use DISPLAY liberally during development. Add variable dumps before S0C7-prone code. Remove (or use compiler directives) for production.`,code:`           DISPLAY '*** PROGRAM STARTED ***'
           ACCEPT WS-RUN-DATE FROM DATE YYYYMMDD
           DISPLAY 'RUN DATE: ' WS-RUN-DATE
      *
           PERFORM VARYING WS-I FROM 1 BY 1
               UNTIL WS-I > 10
               DISPLAY 'PROCESSING RECORD: ' WS-I
           END-PERFORM
      *
           DISPLAY 'TOTAL RECORDS: ' WS-COUNT
           DISPLAY 'TOTAL AMOUNT:  ' WS-TOTAL
           DISPLAY '*** PROGRAM ENDED RC=0 ***'`},{title:"Sequential File Processing",level:"Beginner",content:`Most COBOL programs process sequential files — read input, process, write output.

Pattern: OPEN → READ (loop) → PROCESS → WRITE → CLOSE

File Handling Steps:
  1. SELECT in ENVIRONMENT DIVISION
  2. FD in FILE SECTION
  3. OPEN in PROCEDURE DIVISION
  4. READ...AT END (detect EOF)
  5. WRITE (output records)
  6. CLOSE when done

OPEN Modes:
  OPEN INPUT file — Read only
  OPEN OUTPUT file — Write only (creates new)
  OPEN I-O file — Read and write (update in place)
  OPEN EXTEND file — Append to end

READ:
  READ file INTO ws-record AT END SET EOF TO TRUE END-READ

WRITE:
  WRITE record-name FROM ws-record

FILE STATUS — Always check after I/O:
  00=success, 10=EOF, 35=file not found, 22=dup key, 23=rec not found

💡 Interview Tip: The read-process-write loop is in every COBOL interview. Know it by heart.`,code:`       PROCEDURE DIVISION.
       MAIN-LOGIC.
           OPEN INPUT  IN-FILE
           OPEN OUTPUT OUT-FILE
           PERFORM READ-INPUT
           PERFORM PROCESS-LOOP
               UNTIL WS-EOF = 'Y'
           CLOSE IN-FILE OUT-FILE
           DISPLAY 'RECORDS: ' WS-COUNT
           STOP RUN.
      *
       READ-INPUT.
           READ IN-FILE INTO WS-IN-REC
               AT END MOVE 'Y' TO WS-EOF
           END-READ.
      *
       PROCESS-LOOP.
           ADD 1 TO WS-COUNT
           MOVE WS-IN-REC TO WS-OUT-REC
           WRITE OUT-RECORD FROM WS-OUT-REC
           PERFORM READ-INPUT.`},{title:"STRING & UNSTRING",level:"Intermediate",content:`STRING concatenates multiple fields. UNSTRING splits a delimited string.

STRING:
  STRING field-1 DELIMITED BY SIZE
         field-2 DELIMITED BY ','
         field-3 DELIMITED BY SIZE
    INTO ws-result
    WITH POINTER ws-ptr
    ON OVERFLOW PERFORM ERROR-RTN
  END-STRING

  DELIMITED BY SIZE — use entire field
  DELIMITED BY ',' — stop at comma
  WITH POINTER — position tracker in result

UNSTRING:
  UNSTRING ws-input DELIMITED BY ','
    INTO field-1 field-2 field-3
    TALLYING IN ws-count
    ON OVERFLOW PERFORM ERROR-RTN
  END-UNSTRING

  Splits comma-separated data into individual fields.

Common Uses:
  • Building CSV output
  • Parsing CSV/delimited input
  • Constructing messages with variable parts
  • Building SQL strings dynamically

💡 Pro Tip: UNSTRING with TALLYING tells you how many fields were found — great for validation.`,code:`      *    STRING — Build full name:
           STRING WS-FIRST DELIMITED BY '  '
                  ' ' DELIMITED BY SIZE
                  WS-LAST DELIMITED BY '  '
             INTO WS-FULL-NAME
             WITH POINTER WS-PTR
           END-STRING
      *
      *    UNSTRING — Parse CSV line:
      *    Input: "HARI,DEVELOPER,NYC,50000"
           UNSTRING WS-CSV-LINE
               DELIMITED BY ','
               INTO WS-NAME
                    WS-ROLE
                    WS-CITY
                    WS-SALARY
               TALLYING IN WS-FIELD-COUNT
           END-UNSTRING`},{title:"INSPECT (Tallying & Replacing)",level:"Intermediate",content:`INSPECT scans a field and counts or replaces characters.

INSPECT TALLYING (count occurrences):
  INSPECT ws-field TALLYING ws-count FOR ALL 'A'
  INSPECT ws-field TALLYING ws-count FOR LEADING ZEROS
  INSPECT ws-field TALLYING ws-count FOR CHARACTERS BEFORE INITIAL SPACE

INSPECT REPLACING (change characters):
  INSPECT ws-field REPLACING ALL ',' BY '.'
  INSPECT ws-field REPLACING LEADING ZEROS BY SPACES
  INSPECT ws-field REPLACING FIRST 'OLD' BY 'NEW'

INSPECT CONVERTING (translate characters):
  INSPECT ws-field CONVERTING 'abcdefghijklmnopqrstuvwxyz'
    TO 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  (Converts lowercase to uppercase)

💡 Pro Tip: INSPECT CONVERTING is the fastest way to do case conversion in COBOL.`,code:`      *    Count spaces in a field:
           MOVE 0 TO WS-SPACE-COUNT
           INSPECT WS-NAME TALLYING
               WS-SPACE-COUNT FOR ALL SPACES
      *
      *    Replace commas with periods:
           INSPECT WS-AMOUNT
               REPLACING ALL ',' BY '.'
      *
      *    Convert to uppercase:
           INSPECT WS-INPUT CONVERTING
               'abcdefghijklmnopqrstuvwxyz'
               TO 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      *
      *    Remove leading zeros:
           INSPECT WS-ACCT
               REPLACING LEADING '0' BY ' '`},{title:"Reference Modification",level:"Intermediate",content:`Extract a substring from any field using position and length.

Syntax: field-name(start:length)

  WS-NAME(1:5) — first 5 characters
  WS-DATE(5:2) — 2 characters starting at position 5
  WS-RECORD(WS-POS:WS-LEN) — dynamic position/length

Rules:
  • 1-based indexing (first character is position 1)
  • Start and length can be data items (variables)
  • Length is optional — omit for "rest of field"
  • Works on group items and elementary items

Common Uses:
  • Extract year from date: WS-DATE(1:4)
  • Parse fixed-width records
  • Build output from record positions

💡 Pro Tip: Reference modification is faster than UNSTRING for fixed-position data.`,code:`      *    Extract parts of a date (YYYYMMDD):
           MOVE WS-DATE(1:4) TO WS-YEAR
           MOVE WS-DATE(5:2) TO WS-MONTH
           MOVE WS-DATE(7:2) TO WS-DAY
      *
      *    Dynamic substring:
           MOVE WS-RECORD(WS-START:WS-LENGTH)
               TO WS-FIELD
      *
      *    Compare first 3 chars:
           IF WS-CODE(1:3) = 'PAY'
               PERFORM PAYROLL-PROCESS
           END-IF`},{title:"Tables & OCCURS",level:"Intermediate",content:`Tables (arrays) use the OCCURS clause. Critical for batch processing.

Basic Table:
  01 WS-TABLE.
    05 WS-ITEM OCCURS 100 TIMES PIC X(50).
  Access: WS-ITEM(3) — third element.

Table with Subscript:
  Use COMP variables as subscripts for best performance.
  01 WS-IDX PIC S9(4) COMP.
  MOVE WS-ITEM(WS-IDX) TO WS-OUTPUT.

INDEXED BY:
  05 WS-ITEM OCCURS 100 TIMES
    INDEXED BY WS-IX.
  SET WS-IX TO 1. (not MOVE)
  SET WS-IX UP BY 1. (increment)

OCCURS DEPENDING ON:
  05 WS-ITEM OCCURS 1 TO 100 TIMES
    DEPENDING ON WS-ACTUAL-COUNT PIC 9(3).
  Variable-length table.

Multi-dimensional:
  05 WS-ROW OCCURS 10 TIMES.
    10 WS-COL OCCURS 5 TIMES PIC 9(3).
  Access: WS-COL(3, 2) — row 3, column 2.

💡 Pro Tip: Always use COMP subscripts. DISPLAY subscripts cause a conversion on every access.`,code:`       01  WS-DEPT-TABLE.
           05  WS-DEPT-ENTRY OCCURS 50 TIMES
                   INDEXED BY WS-DEPT-IX.
               10  WS-DEPT-CODE     PIC X(4).
               10  WS-DEPT-NAME     PIC X(30).
               10  WS-DEPT-TOTAL    PIC S9(9)V99 COMP-3.
      *
       01  WS-SUB              PIC S9(4) COMP.
      *
      * Loading a table:
           PERFORM VARYING WS-SUB FROM 1 BY 1
               UNTIL WS-SUB > 50
               READ DEPT-FILE INTO WS-DEPT-ENTRY(WS-SUB)
                   AT END MOVE WS-SUB TO WS-DEPT-COUNT
                          SET EOF-REACHED TO TRUE
               END-READ
           END-PERFORM`},{title:"SEARCH & SEARCH ALL",level:"Intermediate",content:`SEARCH looks up values in tables. Two types: sequential and binary.

SEARCH (Sequential):
  SET index TO 1 first!
  SEARCH table-item
    AT END PERFORM NOT-FOUND
    WHEN condition PERFORM FOUND
  END-SEARCH
  • Linear scan from current index position
  • Works on any table
  • Slower for large tables

SEARCH ALL (Binary Search):
  SEARCH ALL table-item
    AT END PERFORM NOT-FOUND
    WHEN KEY-FIELD = search-value PERFORM FOUND
  END-SEARCH
  • Table MUST be sorted on the KEY
  • Requires ASCENDING/DESCENDING KEY clause on OCCURS
  • Much faster for large tables (log n vs n)
  • Can only test with = (not > or <)

KEY Clause:
  05 WS-ENTRY OCCURS 1000 TIMES
    ASCENDING KEY IS WS-EMP-ID
    INDEXED BY WS-IX.

💡 Interview Tip: "When do you use SEARCH vs SEARCH ALL?" Answer: "SEARCH for small/unsorted tables, SEARCH ALL for large sorted tables. SEARCH ALL requires KEY IS clause." `,code:`      *    Sequential SEARCH:
           SET WS-DEPT-IX TO 1
           SEARCH WS-DEPT-ENTRY
               AT END
                   DISPLAY 'DEPT NOT FOUND'
               WHEN WS-DEPT-CODE(WS-DEPT-IX)
                   = WS-INPUT-DEPT
                   MOVE WS-DEPT-NAME(WS-DEPT-IX)
                       TO WS-OUTPUT-NAME
           END-SEARCH
      *
      *    Binary SEARCH ALL:
           SEARCH ALL WS-DEPT-ENTRY
               AT END
                   DISPLAY 'DEPT NOT FOUND'
               WHEN WS-DEPT-CODE(WS-DEPT-IX)
                   = WS-INPUT-DEPT
                   MOVE WS-DEPT-NAME(WS-DEPT-IX)
                       TO WS-OUTPUT-NAME
           END-SEARCH`},{title:"COPY & REPLACE",level:"Intermediate",content:`COPY includes a copybook from a library. Essential for standardization.

COPY:
  COPY CUSTREC.
  Includes member CUSTREC from SYSLIB DD at compile time.
  Copybooks contain: record layouts, constant definitions, common routines.

COPY...REPLACING:
  COPY CUSTREC REPLACING ==:PREFIX:== BY ==CUST==.
  Replaces text patterns during copy. Allows one copybook for multiple uses.

Why Copybooks Matter:
  • One record layout shared by all programs
  • Change copybook → recompile affected programs → consistent
  • DB2 DCLGEN generates copybooks from table definitions
  • Standard definitions reduce errors

REPLACE Statement:
  REPLACE ==old-text== BY ==new-text==.
  Global replacement within the program until REPLACE OFF.

💡 Pro Tip: Every DB2 table should have a DCLGEN copybook. Every file layout should be in a copybook.`,code:`      *    In the program:
           COPY CUSTREC.
      *
      *    CUSTREC copybook contains:
      *    05  CUST-ID         PIC 9(8).
      *    05  CUST-NAME       PIC X(30).
      *    05  CUST-BALANCE    PIC S9(9)V99 COMP-3.
      *
      *    COPY with REPLACING:
           COPY GENREC REPLACING
               ==:TAG:== BY ==INP==.
      *    If GENREC has :TAG:-FIELD, becomes INP-FIELD
      *
      *    DCLGEN for DB2 table:
           EXEC SQL INCLUDE DCUSTMER END-EXEC`},{title:"REDEFINES",level:"Intermediate",content:`REDEFINES allows two data definitions to share the same memory location.

Syntax:
  01 WS-DATE PIC X(8).  (e.g., '20260316')
  01 WS-DATE-R REDEFINES WS-DATE.
    05 WS-YEAR PIC 9(4).
    05 WS-MONTH PIC 99.
    05 WS-DAY PIC 99.

Rules:
  • REDEFINES must be at the same level as the original
  • Must appear immediately after the original (no intervening items at same level)
  • Cannot REDEFINE an OCCURS item (use within OCCURS group instead)
  • Redefining item can be larger or smaller, but be careful

Common Uses:
  • Parse dates (char → year/month/day)
  • Interpret record types (different layouts based on record type)
  • View numeric data as alphanumeric (for validation)
  • Convert between data representations

💡 Common Mistake: REDEFINES with different-sized items can cause data corruption if you're not careful with which definition you write through.`,code:`       01  WS-DATE-CHAR     PIC X(8).
       01  WS-DATE-NUM REDEFINES WS-DATE-CHAR.
           05  WS-YEAR        PIC 9(4).
           05  WS-MONTH       PIC 99.
           05  WS-DAY         PIC 99.
      *
      *    Multi-format record:
       01  WS-RECORD          PIC X(100).
       01  WS-HEADER REDEFINES WS-RECORD.
           05  WS-H-TYPE      PIC X.
           05  WS-H-DATE      PIC 9(8).
           05  FILLER         PIC X(91).
       01  WS-DETAIL REDEFINES WS-RECORD.
           05  WS-D-TYPE      PIC X.
           05  WS-D-ACCT      PIC 9(10).
           05  WS-D-AMOUNT    PIC S9(9)V99 COMP-3.
           05  FILLER         PIC X(84).`},{title:"Subprograms & CALL",level:"Intermediate",content:`CALL invokes another COBOL program. Essential for modular design.

Static CALL:
  CALL 'SUBPROG' USING WS-PARM1 WS-PARM2
  Program linked at compile time. Faster. Cannot CANCEL.

Dynamic CALL:
  MOVE 'SUBPROG' TO WS-PROG-NAME
  CALL WS-PROG-NAME USING WS-PARM1 WS-PARM2
  Program loaded at runtime. Can CANCEL to free memory. Flexible.

Parameter Passing:
  BY REFERENCE — Subprogram accesses caller's memory (default)
  BY CONTENT — Subprogram gets a copy (caller's data protected)
  BY VALUE — Passes the value itself (for C/Java interop)

In the Called Program:
  LINKAGE SECTION.
  01 LS-PARM1 PIC X(100).
  PROCEDURE DIVISION USING LS-PARM1.

CANCEL:
  CANCEL 'SUBPROG' — Frees dynamically loaded program from memory.
  Next CALL reloads it (getting fresh WORKING-STORAGE).

RETURN-CODE:
  MOVE 0 TO RETURN-CODE — Set return code visible to caller.

💡 Interview Tip: "BY REFERENCE lets subprogram modify caller's data. BY CONTENT protects it." `,code:`      *    Calling program:
           CALL 'VALIDATE' USING
               BY REFERENCE WS-INPUT-REC
               BY CONTENT   WS-TABLE
               BY REFERENCE WS-RESULT
           IF RETURN-CODE NOT = 0
               DISPLAY 'VALIDATION FAILED'
           END-IF
      *
      *    Called program (VALIDATE):
      *    LINKAGE SECTION.
      *    01  LS-INPUT    PIC X(100).
      *    01  LS-TABLE    PIC X(5000).
      *    01  LS-RESULT   PIC X(10).
      *    PROCEDURE DIVISION USING
      *        LS-INPUT LS-TABLE LS-RESULT.
      *        ... validation logic ...
      *        MOVE 0 TO RETURN-CODE.
      *        GOBACK.`},{title:"VSAM File Processing",level:"Intermediate",content:`COBOL accesses VSAM files through SELECT with ORGANIZATION IS INDEXED.

SELECT for KSDS:
  SELECT CUST-FILE ASSIGN TO CUSTVSAM
    ORGANIZATION IS INDEXED
    ACCESS MODE IS DYNAMIC
    RECORD KEY IS CUST-KEY
    ALTERNATE RECORD KEY IS CUST-NAME WITH DUPLICATES
    FILE STATUS IS WS-FS.

ACCESS MODES:
  SEQUENTIAL — Read in key order
  RANDOM — Direct access by key
  DYNAMIC — Both sequential and random in same program

READ (Random):
  MOVE search-key TO CUST-KEY
  READ CUST-FILE INTO WS-REC INVALID KEY PERFORM NOT-FOUND

READ (Sequential/Browse):
  START CUST-FILE KEY >= WS-START-KEY
  PERFORM UNTIL WS-FS NOT = '00'
    READ CUST-FILE NEXT INTO WS-REC AT END EXIT PERFORM
  END-PERFORM

WRITE: WRITE CUST-RECORD FROM WS-REC INVALID KEY PERFORM DUP-KEY
REWRITE: REWRITE CUST-RECORD FROM WS-REC INVALID KEY PERFORM ERR
DELETE: DELETE CUST-FILE INVALID KEY PERFORM NOT-FOUND

💡 Pro Tip: Always use DYNAMIC access if your program does both random and sequential reads.`,code:`           MOVE WS-SEARCH-KEY TO CUST-KEY
           READ CUST-FILE INTO WS-CUST-REC
               INVALID KEY
                   DISPLAY 'NOT FOUND: ' WS-SEARCH-KEY
                   MOVE 'N' TO WS-FOUND-FLAG
               NOT INVALID KEY
                   MOVE 'Y' TO WS-FOUND-FLAG
           END-READ
      *
      *    Browse from a starting point:
           MOVE WS-START TO CUST-KEY
           START CUST-FILE KEY >= CUST-KEY
           PERFORM UNTIL WS-FS NOT = '00'
               READ CUST-FILE NEXT INTO WS-REC
                   AT END EXIT PERFORM
               END-READ
               DISPLAY CUST-KEY ' ' CUST-NAME
           END-PERFORM`},{title:"File Status Codes",level:"Intermediate",content:`FILE STATUS is a 2-byte code set after every I/O. ALWAYS check it.

Key Status Codes:
  00 — Success
  02 — Success, duplicate alternate key
  04 — Record length mismatch
  10 — End of file
  21 — Sequence error (key out of order on write)
  22 — Duplicate primary key
  23 — Record not found
  24 — Disk full / boundary violation
  35 — File not found (OPEN failed)
  37 — File type mismatch
  39 — File attribute conflict (DCB mismatch)
  41 — File already open
  42 — File already closed
  46 — Read failed, no valid next
  47 — READ on file not opened INPUT/I-O
  48 — WRITE on file not opened OUTPUT/I-O
  97 — OPEN failed (various VSAM reasons)

Checking Pattern:
  READ CUST-FILE INTO WS-REC
  EVALUATE WS-FS
    WHEN '00' CONTINUE
    WHEN '10' SET EOF TO TRUE
    WHEN '23' PERFORM RECORD-NOT-FOUND
    WHEN OTHER PERFORM FILE-ERROR
  END-EVALUATE

💡 Interview Favorite: "What is file status 23?" Answer: "Record not found — READ with invalid key or START with non-existent key." `,code:`       PERFORM READ-RECORD
       EVALUATE WS-CUST-FS
           WHEN '00'
               CONTINUE
           WHEN '10'
               SET EOF-REACHED TO TRUE
           WHEN '22'
               DISPLAY 'DUPLICATE KEY: ' CUST-KEY
           WHEN '23'
               DISPLAY 'NOT FOUND: ' CUST-KEY
           WHEN '35'
               DISPLAY 'FILE NOT FOUND'
               MOVE 8 TO RETURN-CODE
               STOP RUN
           WHEN OTHER
               DISPLAY 'FILE ERROR: ' WS-CUST-FS
               MOVE 12 TO RETURN-CODE
               STOP RUN
       END-EVALUATE`},{title:"Embedded SQL (DB2)",level:"Intermediate",content:`COBOL programs access DB2 using EXEC SQL...END-EXEC blocks.

Setup:
  Include SQLCA: EXEC SQL INCLUDE SQLCA END-EXEC
  Include DCLGEN: EXEC SQL INCLUDE DCUSTMER END-EXEC

SELECT INTO (single row):
  EXEC SQL
    SELECT CUST_NAME, BALANCE
    INTO :WS-NAME, :WS-BALANCE
    FROM CUSTOMER
    WHERE CUST_ID = :WS-CUST-ID
  END-EXEC

Host Variables:
  Prefixed with colon (:) inside SQL.
  :WS-NAME refers to COBOL variable WS-NAME.

SQLCODE Checking:
  0 — Success
  100 — Not found (SELECT) or no more rows (FETCH)
  Negative — Error (-805 plan not found, -811 multi-row, -904 resource unavailable)

Cursor Processing (multiple rows):
  EXEC SQL DECLARE cur CURSOR FOR SELECT... END-EXEC
  EXEC SQL OPEN cur END-EXEC
  PERFORM UNTIL SQLCODE = 100
    EXEC SQL FETCH cur INTO :vars END-EXEC
  END-PERFORM
  EXEC SQL CLOSE cur END-EXEC

INSERT/UPDATE/DELETE:
  EXEC SQL INSERT INTO table VALUES (:var1, :var2) END-EXEC
  EXEC SQL UPDATE table SET col = :var WHERE key = :key END-EXEC
  EXEC SQL DELETE FROM table WHERE key = :key END-EXEC

💡 Pro Tip: Always check SQLCODE after EVERY SQL statement. Don't assume success.`,code:`           EXEC SQL
               SELECT CUST_NAME, CUST_BALANCE
               INTO :WS-CUST-NAME, :WS-CUST-BAL
               FROM CUSTOMER
               WHERE CUST_ID = :WS-CUST-ID
           END-EXEC
           EVALUATE SQLCODE
               WHEN 0    CONTINUE
               WHEN 100  DISPLAY 'NOT FOUND'
               WHEN OTHER
                   DISPLAY 'SQL ERROR: ' SQLCODE
           END-EVALUATE
      *
      *    Cursor processing:
           EXEC SQL OPEN CUST-CURSOR END-EXEC
           PERFORM UNTIL SQLCODE = 100
               EXEC SQL
                   FETCH CUST-CURSOR
                   INTO :WS-ID, :WS-NAME, :WS-BAL
               END-EXEC
               IF SQLCODE = 0
                   PERFORM PROCESS-ROW
               END-IF
           END-PERFORM
           EXEC SQL CLOSE CUST-CURSOR END-EXEC`},{title:"SORT Verb",level:"Intermediate",content:`COBOL's SORT verb sorts files within the program — no external DFSORT needed.

Basic SORT:
  SORT SORT-FILE
    ON ASCENDING KEY SORT-DEPT
    ON DESCENDING KEY SORT-SALARY
    USING INPUT-FILE
    GIVING OUTPUT-FILE

With INPUT/OUTPUT PROCEDURE:
  SORT SORT-FILE
    ON ASCENDING KEY SORT-KEY
    INPUT PROCEDURE IS SELECT-RECORDS
    OUTPUT PROCEDURE IS FORMAT-OUTPUT

INPUT PROCEDURE — filter/modify before sort:
  RELEASE sort-record FROM ws-record (sends records to sort)

OUTPUT PROCEDURE — process after sort:
  RETURN sort-file INTO ws-record AT END SET DONE TO TRUE

MERGE:
  MERGE MERGE-FILE ON ASCENDING KEY M-KEY
    USING FILE-1 FILE-2 FILE-3
    GIVING MERGED-FILE

Required: SD (Sort Description) in FILE SECTION instead of FD.

💡 Pro Tip: USING/GIVING is simpler. INPUT/OUTPUT PROCEDURE gives you filtering and transformation control.`,code:`       FILE SECTION.
       SD  SORT-FILE.
       01  SORT-RECORD.
           05  SORT-DEPT       PIC X(4).
           05  SORT-NAME       PIC X(30).
           05  SORT-SALARY     PIC S9(7)V99 COMP-3.
      *
       PROCEDURE DIVISION.
           SORT SORT-FILE
               ON ASCENDING KEY SORT-DEPT
               ON DESCENDING KEY SORT-SALARY
               INPUT PROCEDURE IS FILTER-RECS
               GIVING OUTPUT-FILE
           STOP RUN.
      *
       FILTER-RECS.
           OPEN INPUT INPUT-FILE
           PERFORM UNTIL WS-EOF = 'Y'
               READ INPUT-FILE INTO WS-REC
                   AT END MOVE 'Y' TO WS-EOF
               END-READ
               IF WS-STATUS = 'A'
                   MOVE WS-REC TO SORT-RECORD
                   RELEASE SORT-RECORD
               END-IF
           END-PERFORM
           CLOSE INPUT-FILE.`},{title:"Report Writing",level:"Intermediate",content:`Generating formatted reports is a core COBOL task. Headers, detail lines, footers, page breaks.

Report Structure:
  • Page header (company name, report title, column headers)
  • Detail lines (one per record)
  • Group totals (subtotals by department, etc.)
  • Page footer (page number)
  • Report footer (grand totals)

Line Counter Pattern:
  Track WS-LINE-COUNT. When it exceeds WS-LINES-PER-PAGE (e.g., 55), write headers on new page.

WRITE...AFTER ADVANCING:
  WRITE PRINT-LINE AFTER ADVANCING 1 LINE (single space)
  WRITE PRINT-LINE AFTER ADVANCING 2 LINES (double space)
  WRITE PRINT-LINE AFTER ADVANCING PAGE (new page)

Control Break Logic:
  Detect when a sort key changes. Print subtotals for previous group, reset accumulators, start new group.

💡 Pro Tip: Always format amounts with edited PIC (ZZZ,ZZ9.99) for readability in reports.`,code:`       01  PRINT-LINE          PIC X(133).
       01  HDR-LINE.
           05  FILLER           PIC X(45)
               VALUE '  DEPT  NAME                    SALARY'.
       01  DTL-LINE.
           05  FILLER           PIC X(2) VALUE SPACES.
           05  DTL-DEPT         PIC X(4).
           05  FILLER           PIC X(2) VALUE SPACES.
           05  DTL-NAME         PIC X(25).
           05  FILLER           PIC X(2) VALUE SPACES.
           05  DTL-SALARY       PIC $$$,$$$,$$9.99.
      *
           ADD 1 TO WS-LINE-COUNT
           IF WS-LINE-COUNT > 55
               PERFORM WRITE-HEADERS
           END-IF
           MOVE WS-DEPT TO DTL-DEPT
           MOVE WS-NAME TO DTL-NAME
           MOVE WS-SAL  TO DTL-SALARY
           WRITE PRINT-LINE FROM DTL-LINE
               AFTER ADVANCING 1 LINE`},{title:"Error Handling & Debugging",level:"Intermediate",content:`Production COBOL must handle errors gracefully.

FILE STATUS Checking:
  Check after EVERY I/O operation. Handle each non-00 status.

ON SIZE ERROR:
  Traps arithmetic overflow.
  ADD A TO B ON SIZE ERROR PERFORM OVERFLOW-RTN END-ADD

DECLARATIVES:
  USE AFTER ERROR PROCEDURE ON file-name.
  Automatic error handler for file I/O errors.

Debugging Techniques:
  • DISPLAY variable values at key points
  • DISPLAY 'REACHED PARA: ' para-name (trace execution)
  • Check FILE STATUS after every I/O
  • Use SYSUDUMP DD for formatted ABEND dumps
  • Compiler option: LIST,MAP,XREF,OFFSET for debugging listings

Common ABENDs:
  S0C7 — Non-numeric data in numeric field
    Fix: INITIALIZE working storage, validate input with IF NUMERIC
  S0C4 — Addressing error (subscript out of range)
    Fix: Check table bounds before accessing
  S0C1 — Invalid operation
    Fix: Check for uninitialized variables, bad CALL

RETURN-CODE:
  MOVE 0 TO RETURN-CODE (success)
  MOVE 8 TO RETURN-CODE (error)
  Controls JCL conditional processing.

💡 Pro Tip: Add DISPLAY tracing in development. Use compiler DEBUG option for D-lines.`,code:`       PROCEDURE DIVISION.
      *    Robust file open:
           OPEN INPUT CUST-FILE
           IF WS-CUST-FS NOT = '00'
               DISPLAY 'OPEN FAILED: ' WS-CUST-FS
               MOVE 12 TO RETURN-CODE
               STOP RUN
           END-IF
      *
      *    Safe arithmetic:
           COMPUTE WS-RESULT =
               WS-TOTAL / WS-COUNT
               ON SIZE ERROR
                   DISPLAY 'DIVIDE ERROR'
                   MOVE 0 TO WS-RESULT
           END-COMPUTE
      *
      *    Validate before using:
           IF WS-INPUT IS NUMERIC
               ADD WS-INPUT TO WS-TOTAL
           ELSE
               DISPLAY 'BAD DATA: ' WS-INPUT
               ADD 1 TO WS-ERROR-COUNT
           END-IF`},{title:"INITIALIZE Statement",level:"Intermediate",content:`INITIALIZE sets all fields to appropriate default values.

Basic:
  INITIALIZE WS-RECORD
  • Alphanumeric fields → SPACES
  • Numeric fields → ZEROS
  • COMP/COMP-3 → binary zeros

INITIALIZE...REPLACING:
  INITIALIZE WS-RECORD
    REPLACING ALPHANUMERIC DATA BY 'N/A'
    REPLACING NUMERIC DATA BY -1

Why INITIALIZE matters:
  Uninitialized COMP-3 fields contain garbage — accessing them causes S0C7. INITIALIZE is your #1 defense against S0C7 ABENDs.

Best Practice:
  INITIALIZE all working storage records before first use.
  INITIALIZE output records before building each output.
  INITIALIZE accumulators before each control group.

💡 Interview Tip: "How do you prevent S0C7?" Answer: "INITIALIZE working storage, validate input with IF NUMERIC, check for spaces in numeric fields." `,code:`      *    Initialize entire record:
           INITIALIZE WS-OUTPUT-RECORD
      *
      *    Initialize with custom defaults:
           INITIALIZE WS-CUST-REC
               REPLACING ALPHANUMERIC DATA BY '*'
               REPLACING NUMERIC DATA BY 0
      *
      *    Always initialize before building:
           PERFORM VARYING WS-I FROM 1 BY 1
               UNTIL WS-I > WS-COUNT
               INITIALIZE WS-OUT-REC
               MOVE ... TO ...
               WRITE OUT-REC FROM WS-OUT-REC
           END-PERFORM`},{title:"CICS Programming Basics",level:"Advanced",content:`CICS programs are pseudo-conversational and use EXEC CICS commands.

Pseudo-Conversational Flow:
  1. Program sends screen (SEND MAP)
  2. Program ends (RETURN TRANSID COMMAREA)
  3. User enters data
  4. CICS starts new task → program restarts
  5. Check EIBCALEN to detect if first time or return
  6. RECEIVE MAP → process → SEND MAP → RETURN

Key Concepts:
  COMMAREA — Data passed between interactions (max 32KB)
  EIBCALEN — Length of received COMMAREA (0 = first time)
  BMS MAP — Screen definition
  TRANSID — 4-character transaction identifier

Common CICS Commands:
  SEND MAP('map') MAPSET('mset') — Display screen
  RECEIVE MAP('map') — Get user input
  READ DATASET('file') INTO(rec) RIDFLD(key) — Read VSAM
  WRITE DATASET('file') FROM(rec) RIDFLD(key) — Write VSAM
  LINK PROGRAM('prog') COMMAREA(data) — Call subprogram
  XCTL PROGRAM('prog') — Transfer control
  RETURN TRANSID('tran') COMMAREA(data) — End and wait

💡 Pro Tip: Master pseudo-conversational pattern. It's the most asked CICS-COBOL interview topic.`,code:`       PROCEDURE DIVISION.
           IF EIBCALEN = 0
      *        First time — send empty screen
               PERFORM SEND-MAP-FIRST
           ELSE
      *        Returning — process input
               MOVE DFHCOMMAREA TO WS-COMMAREA
               PERFORM RECEIVE-AND-PROCESS
           END-IF.
      *
       SEND-MAP-FIRST.
           EXEC CICS SEND MAP('CUSTMAP')
               MAPSET('CUSTMST') MAPONLY ERASE
           END-EXEC
           EXEC CICS RETURN
               TRANSID('CUST')
               COMMAREA(WS-COMMAREA)
           END-EXEC.
      *
       RECEIVE-AND-PROCESS.
           EXEC CICS RECEIVE MAP('CUSTMAP')
               MAPSET('CUSTMST')
           END-EXEC
           PERFORM PROCESS-REQUEST
           EXEC CICS SEND MAP('CUSTMAP')
               MAPSET('CUSTMST') DATAONLY
           END-EXEC
           EXEC CICS RETURN
               TRANSID('CUST')
               COMMAREA(WS-COMMAREA)
           END-EXEC.`},{title:"Compile, Link & Run",level:"Advanced",content:`The COBOL build process: source → compile → link-edit → load module.

Step 1 — Compile:
  PGM=IGYCRCTL (IBM Enterprise COBOL compiler)
  Input: SYSIN (source), SYSLIB (copybooks)
  Output: SYSLIN (object module), SYSPRINT (listing)
  Options: LIB, MAP, XREF, OFFSET, LIST, SOURCE

Step 2 — Link-Edit:
  PGM=IEWL (or IEWBLINK)
  Input: SYSLIN (object), SYSLIB (system libs)
  Output: SYSLMOD (load module in loadlib)
  Options: MAP, LIST, RENT, AMODE, RMODE

Step 3 — Run:
  PGM=your-program
  STEPLIB (or JOBLIB) points to load library

DB2 COBOL — Extra Steps:
  1. DB2 Precompile (DSNHPC) → extracts SQL → produces DBRM
  2. Compile COBOL
  3. Link-Edit
  4. BIND (creates plan/package from DBRM)

Compiler Options to Know:
  LIB — Enable COPY statement
  MAP — Data map in listing (shows offsets)
  XREF — Cross-reference listing
  OFFSET — Condensed listing with offsets (for debugging ABENDs)
  OPTIMIZE — Performance optimization

💡 Pro Tip: For ABEND debugging, compile with OFFSET and LIST. The listing shows which source line matches the ABEND offset.`,code:`      *    COMPILE step:
      //COMPILE  EXEC PGM=IGYCRCTL,
      //         PARM='LIB,MAP,XREF,OFFSET'
      //STEPLIB  DD DSN=SYS1.SIGYCOMP,DISP=SHR
      //SYSIN    DD DSN=MY.COBOL.SRC(PAYCALC),DISP=SHR
      //SYSLIB   DD DSN=MY.COPYBOOK.LIB,DISP=SHR
      //SYSLIN   DD DSN=&&OBJ,DISP=(NEW,PASS)
      //SYSPRINT DD SYSOUT=*
      //*
      //LINK     EXEC PGM=IEWL,COND=(4,LT,COMPILE)
      //SYSLIN   DD DSN=&&OBJ,DISP=(OLD,DELETE)
      //SYSLMOD  DD DSN=MY.LOADLIB(PAYCALC),DISP=SHR
      //SYSPRINT DD SYSOUT=*`},{title:"Performance Best Practices",level:"Advanced",content:`Optimize COBOL for z/OS performance — every CPU cycle costs money.

Data Types:
  • COMP-3 for all business calculations (hardware packed decimal)
  • COMP for subscripts and counters (hardware binary)
  • Avoid DISPLAY numeric in calculations (conversion overhead)

Table Processing:
  • SEARCH ALL (binary) for large sorted tables
  • COMP subscripts (not DISPLAY)
  • Load tables once, search many times

I/O Optimization:
  • Minimize file OPEN/CLOSE operations
  • Use block READ (READ INTO) rather than individual
  • SORT with USING/GIVING (less code, often faster)
  • Use FILE STATUS instead of DECLARATIVES

String Operations:
  • Reference modification faster than UNSTRING for fixed positions
  • INSPECT CONVERTING faster than INSPECT REPLACING for character translation

Program Design:
  • Avoid deep PERFORM nesting
  • Minimize CALLs to external programs (overhead per call)
  • Use LOCAL-STORAGE for reentrant programs
  • Avoid unnecessary MOVEs (move only what changes)

DB2 Optimization:
  • Use static SQL (bound plan) over dynamic SQL
  • FETCH with array host variables for bulk reads
  • COMMIT every N rows to release locks

💡 Pro Tip: The #1 COBOL performance gain is using COMP-3 for calculations instead of DISPLAY numeric.`,code:`      *    COMP subscript (fast):
       01  WS-IDX    PIC S9(4) COMP.
      *    vs DISPLAY subscript (slow):
       01  WS-IDX-SLOW PIC 9(4).
      *
      *    Efficient table lookup:
           SEARCH ALL WS-TABLE-ENTRY
               AT END PERFORM NOT-FOUND
               WHEN WS-KEY(WS-IX) = WS-SEARCH
                   PERFORM FOUND
           END-SEARCH
      *
      *    Batch commit pattern (DB2):
           ADD 1 TO WS-COMMIT-COUNT
           IF WS-COMMIT-COUNT >= 1000
               EXEC SQL COMMIT END-EXEC
               MOVE 0 TO WS-COMMIT-COUNT
           END-IF`},{title:"FILLER & Data Alignment",level:"Beginner",content:`FILLER is an unnamed field used for spacing, padding, and alignment in record layouts.

Uses of FILLER:
  • Pad records to exact lengths
  • Create spacing in report lines
  • Skip unused positions in input records
  • Align fields to specific columns

Syntax:
  05  FILLER  PIC X(10) VALUE SPACES.
  05  FILLER  PIC X(5) VALUE 'TOTAL'.

In COBOL 85+, FILLER keyword is optional:
  05  PIC X(10) VALUE SPACES.  (same as FILLER)

Record Padding:
  If your file has LRECL=200 but your fields only use 150 bytes:
  05  FILLER  PIC X(50) VALUE SPACES.  (pad remaining 50)

Report Line Layout:
  Use FILLER for column spacing between printed fields.

💡 Pro Tip: Always pad records to exact LRECL. Unpadded records cause S013 or data corruption.`,code:`       01  REPORT-HEADER.
           05  FILLER       PIC X(5) VALUE SPACES.
           05  FILLER       PIC X(10) VALUE 'EMPLOYEE'.
           05  FILLER       PIC X(5) VALUE SPACES.
           05  FILLER       PIC X(12) VALUE 'DEPARTMENT'.
           05  FILLER       PIC X(5) VALUE SPACES.
           05  FILLER       PIC X(10) VALUE 'SALARY'.
      *
       01  DETAIL-LINE.
           05  FILLER       PIC X(5) VALUE SPACES.
           05  DL-NAME      PIC X(10).
           05  FILLER       PIC X(5) VALUE SPACES.
           05  DL-DEPT      PIC X(12).
           05  FILLER       PIC X(5) VALUE SPACES.
           05  DL-SALARY    PIC $$$$,$$9.99.`},{title:"VALUE Clause & Initialization",level:"Beginner",content:`VALUE sets initial values for data items at program load time.

Syntax:
  05  WS-NAME   PIC X(20) VALUE 'DEFAULT'.
  05  WS-COUNT  PIC 9(5) VALUE ZEROS.
  05  WS-FLAG   PIC X VALUE SPACE.

Figurative Constants:
  SPACES / SPACE — Fill with spaces (X'40')
  ZEROS / ZEROES / ZERO — Fill with zeros
  HIGH-VALUES — Fill with X'FF' (highest value)
  LOW-VALUES — Fill with X'00' (lowest value)
  QUOTES / QUOTE — Fill with quotation marks
  ALL literal — Fill with repeated literal

VALUE in 88-Levels:
  05  WS-STATUS PIC X.
      88  ACTIVE    VALUE 'A'.
      88  INACTIVE  VALUE 'I'.
      88  VALID-STATUS VALUES ARE 'A' 'I' 'S'.

VALUE Not Allowed:
  • FILE SECTION items (except 88-levels)
  • LINKAGE SECTION items
  • Items with REDEFINES (the redefining item)

💡 Pro Tip: INITIALIZE resets fields at runtime. VALUE sets them at compile/load time. Use both strategically.`,code:`       01  WS-DEFAULTS.
           05  WS-NAME      PIC X(30) VALUE SPACES.
           05  WS-AMOUNT    PIC S9(7)V99 COMP-3 VALUE +0.
           05  WS-FLAG      PIC X VALUE 'N'.
               88  PROCESS-YES  VALUE 'Y'.
               88  PROCESS-NO   VALUE 'N'.
           05  WS-HIGH      PIC X(10) VALUE HIGH-VALUES.
           05  WS-PATTERN   PIC X(20) VALUE ALL '*'.
           05  WS-MSG       PIC X(40)
               VALUE 'PROGRAM STARTED SUCCESSFULLY'.`},{title:"GOBACK vs STOP RUN",level:"Beginner",content:`Both end program execution, but they work differently.

STOP RUN:
  • Terminates the entire run unit
  • Returns control to the operating system
  • All files closed automatically
  • All programs in the call chain are terminated
  • Use in the MAIN program only

GOBACK:
  • Returns to the calling program (if called via CALL)
  • If it IS the main program, behaves like STOP RUN
  • Called program's files are NOT automatically closed
  • Working storage retained (until CANCEL)
  • Use in CALLED subprograms

Best Practice:
  Main program: STOP RUN (or GOBACK)
  Subprogram: GOBACK (never STOP RUN — it kills the caller too)

EXIT PROGRAM:
  Legacy equivalent of GOBACK for called programs.
  GOBACK is preferred in modern COBOL.

💡 Interview Tip: "STOP RUN in a subprogram kills the entire call chain. GOBACK returns to caller."`,code:`      *    Main program:
       PROCEDURE DIVISION.
           CALL 'SUBPROG' USING WS-DATA
           DISPLAY 'BACK FROM SUBPROG'
           STOP RUN.
      *
      *    Subprogram (SUBPROG):
       PROCEDURE DIVISION USING LS-DATA.
           PERFORM PROCESS-LOGIC
           MOVE 0 TO RETURN-CODE
           GOBACK.`},{title:"Scope Terminators (END-IF, END-PERFORM)",level:"Beginner",content:`Scope terminators explicitly end statements. Always use them — avoid period-terminated statements.

Key Scope Terminators:
  END-IF          END-EVALUATE    END-PERFORM
  END-READ        END-WRITE       END-REWRITE
  END-DELETE      END-START       END-RETURN
  END-COMPUTE     END-ADD         END-SUBTRACT
  END-MULTIPLY    END-DIVIDE      END-STRING
  END-UNSTRING    END-SEARCH      END-CALL

Why Scope Terminators Matter:
  Without END-IF, a period ends ALL nested IFs:
  IF A = 1
    IF B = 2
      PERFORM X.     ← Period ends BOTH IFs!
  
  With END-IF, nesting is explicit:
  IF A = 1
    IF B = 2
      PERFORM X
    END-IF           ← Only inner IF ends
  END-IF             ← Outer IF ends

Rule: Use only ONE period per paragraph — at the very end. All other statement endings should use scope terminators.

💡 Pro Tip: Most S0C7 and logic bugs come from misplaced periods. Scope terminators prevent 90% of them.`,code:`      *    BAD — period-terminated:
           IF WS-A > 0
               PERFORM PROCESS-A.
           IF WS-B > 0
               PERFORM PROCESS-B.
      *    Each period ends ALL open statements!
      *
      *    GOOD — scope terminators:
           IF WS-A > 0
               IF WS-B > 0
                   PERFORM PROCESS-BOTH
               ELSE
                   PERFORM PROCESS-A-ONLY
               END-IF
           ELSE
               PERFORM PROCESS-NEITHER
           END-IF`},{title:"Paragraph & Section Design",level:"Beginner",content:`Paragraphs and sections organize PROCEDURE DIVISION into logical units.

Paragraph:
  A named block of code. Name in Area A, followed by a period.
  PROCESS-RECORD.
      statements...

Section:
  Contains one or more paragraphs. Name in Area A with SECTION keyword.
  INPUT-PROCESSING SECTION.
  READ-RECORD.
      statements...
  VALIDATE-RECORD.
      statements...

PERFORM executes paragraphs or sections:
  PERFORM PROCESS-RECORD (single paragraph)
  PERFORM INPUT-PROCESSING (entire section)
  PERFORM READ-RECORD THRU READ-EXIT (range)

EXIT Paragraph:
  Convention: Every paragraph has an exit point:
  PROCESS-RECORD.
      statements...
  PROCESS-RECORD-EXIT.
      EXIT.

Design Guidelines:
  • One logical function per paragraph
  • Max 50-60 lines per paragraph
  • Meaningful names: VALIDATE-INPUT, WRITE-REPORT, CALC-TAX
  • Use sections to group related paragraphs
  • PERFORM THRU for paragraphs with multiple paths

💡 Pro Tip: Keep paragraphs small and focused. If you can't name it clearly, it's doing too much.`,code:`       PROCEDURE DIVISION.
       MAIN-SECTION SECTION.
       MAIN-PARA.
           PERFORM INIT-PARA
           PERFORM PROCESS-SECTION
           PERFORM CLEANUP-PARA
           STOP RUN.
       MAIN-EXIT.
           EXIT.
      *
       INIT-PARA.
           OPEN INPUT  CUST-FILE
                OUTPUT RPT-FILE
           INITIALIZE WS-COUNTERS.
       INIT-EXIT.
           EXIT.
      *
       PROCESS-SECTION SECTION.
       READ-PARA.
           READ CUST-FILE INTO WS-REC
               AT END SET EOF TO TRUE
           END-READ.
       PROCESS-PARA.
           PERFORM UNTIL EOF
               PERFORM VALIDATE-PARA
               PERFORM WRITE-PARA
               PERFORM READ-PARA
           END-PERFORM.
       PROCESS-EXIT.
           EXIT.`},{title:"Condition Names (88-Level) Deep Dive",level:"Beginner",content:`88-level condition names make code self-documenting and reduce errors.

Basic:
  05  WS-STATUS PIC X.
      88  ACTIVE     VALUE 'A'.
      88  INACTIVE   VALUE 'I'.
      88  SUSPENDED  VALUE 'S'.

Multiple Values:
  88  VALID-STATUS VALUES ARE 'A' 'I' 'S'.

Range:
  05  WS-GRADE PIC 99.
      88  PASSING   VALUES ARE 60 THRU 100.
      88  FAILING   VALUES ARE 0 THRU 59.

SET Statement:
  SET ACTIVE TO TRUE — Moves 'A' to WS-STATUS
  Much clearer than: MOVE 'A' TO WS-STATUS

Using in IF:
  IF ACTIVE PERFORM PROCESS-ACTIVE
  Instead of: IF WS-STATUS = 'A' PERFORM PROCESS-ACTIVE

88 on Flags:
  05  WS-EOF-FLAG PIC X VALUE 'N'.
      88  EOF-REACHED VALUE 'Y'.
      88  NOT-EOF     VALUE 'N'.

  PERFORM UNTIL EOF-REACHED
  SET EOF-REACHED TO TRUE (when AT END fires)

💡 Pro Tip: Use 88-levels for ALL flags and status fields. Code reads like English.`,code:`       05  WS-TRANS-TYPE   PIC X.
               88  IS-DEPOSIT  VALUE 'D'.
               88  IS-WITHDRAW VALUE 'W'.
               88  IS-TRANSFER VALUE 'T'.
               88  VALID-TRANS VALUE 'D' 'W' 'T'.
      *
           IF NOT VALID-TRANS
               DISPLAY 'INVALID TYPE: ' WS-TRANS-TYPE
           END-IF
      *
           EVALUATE TRUE
               WHEN IS-DEPOSIT
                   ADD WS-AMOUNT TO WS-BALANCE
               WHEN IS-WITHDRAW
                   SUBTRACT WS-AMOUNT FROM WS-BALANCE
               WHEN IS-TRANSFER
                   PERFORM TRANSFER-LOGIC
           END-EVALUATE
      *
           SET IS-DEPOSIT TO TRUE`},{title:"ACCEPT FROM DATE/TIME",level:"Beginner",content:`ACCEPT retrieves system date and time for processing.

Date Formats:
  ACCEPT WS-DATE FROM DATE         — YYMMDD (6 digits)
  ACCEPT WS-DATE FROM DATE YYYYMMDD — YYYYMMDD (8 digits)
  ACCEPT WS-DATE FROM DAY           — YYDDD (Julian)
  ACCEPT WS-DATE FROM DAY YYYYDDD   — YYYYDDD (Julian)
  ACCEPT WS-DOW FROM DAY-OF-WEEK    — 1=Monday...7=Sunday

Time:
  ACCEPT WS-TIME FROM TIME  — HHMMSSss (8 digits, ss=hundredths)

Common Pattern:
  01  WS-CURRENT-DATE.
      05  WS-YEAR   PIC 9(4).
      05  WS-MONTH  PIC 99.
      05  WS-DAY    PIC 99.
  ACCEPT WS-CURRENT-DATE FROM DATE YYYYMMDD

FUNCTION CURRENT-DATE:
  MOVE FUNCTION CURRENT-DATE TO WS-DATETIME
  Returns: YYYYMMDDHHMMSSss±HHMM (21 characters with timezone)

💡 Pro Tip: Use FUNCTION CURRENT-DATE for timezone-aware timestamps in production.`,code:`       01  WS-DATE-WORK.
           05  WS-YEAR      PIC 9(4).
           05  WS-MONTH     PIC 99.
           05  WS-DAY       PIC 99.
       01  WS-TIME-WORK     PIC 9(8).
       01  WS-CURR-DT       PIC X(21).
      *
           ACCEPT WS-DATE-WORK FROM DATE YYYYMMDD
           ACCEPT WS-TIME-WORK FROM TIME
           MOVE FUNCTION CURRENT-DATE
               TO WS-CURR-DT
           DISPLAY 'DATE: ' WS-YEAR '/' WS-MONTH '/'
                   WS-DAY
           DISPLAY 'TIME: ' WS-TIME-WORK`},{title:"CORRESPONDING Option",level:"Intermediate",content:`CORRESPONDING (CORR) operates on matching field names between two groups.

MOVE CORRESPONDING:
  MOVE CORR INPUT-REC TO OUTPUT-REC
  Moves all fields with matching names from source to destination.
  Only elementary items with the same name are moved.

ADD CORRESPONDING:
  ADD CORR DETAIL-LINE TO TOTAL-LINE
  Adds matching numeric fields.

SUBTRACT CORRESPONDING:
  SUBTRACT CORR DEDUCTIONS TO NET-PAY

Rules:
  • Only elementary items with identical names are matched
  • Both must be group items
  • Matching is by NAME only (not position or level)
  • Non-matching fields are ignored
  • Data types should be compatible

Use Cases:
  • Copying between similar but not identical record layouts
  • Accumulating totals from detail records
  • Moving between input and output layouts

💡 Pro Tip: MOVE CORR saves code but can be hard to debug. Use sparingly and document which fields match.`,code:`       01  INPUT-REC.
           05  EMP-NAME     PIC X(30).
           05  EMP-DEPT     PIC X(4).
           05  EMP-SALARY   PIC S9(7)V99 COMP-3.
           05  EMP-BONUS    PIC S9(5)V99 COMP-3.
      *
       01  OUTPUT-REC.
           05  EMP-NAME     PIC X(30).
           05  EMP-ID       PIC 9(8).
           05  EMP-SALARY   PIC S9(7)V99 COMP-3.
           05  FILLER       PIC X(20).
      *
      *    Moves EMP-NAME and EMP-SALARY (matching names)
      *    EMP-DEPT, EMP-BONUS, EMP-ID not moved
           MOVE CORR INPUT-REC TO OUTPUT-REC`},{title:"RENAMES (66-Level)",level:"Intermediate",content:`66-level RENAMES redefines a contiguous range of fields under a new name.

Syntax:
  66  new-name RENAMES field-1 THRU field-n.

This creates an alternative view of consecutive fields without REDEFINES.

Example:
  01  DATE-RECORD.
      05  WS-YEAR   PIC 9(4).
      05  WS-MONTH  PIC 99.
      05  WS-DAY    PIC 99.
  66  WS-YEAR-MONTH RENAMES WS-YEAR THRU WS-MONTH.
  (WS-YEAR-MONTH covers YEAR+MONTH = 6 bytes)

Rules:
  • Only at 66-level
  • Must follow the last data item in the record
  • Cannot rename 01, 66, 77, or 88 level items
  • Fields must be contiguous in memory
  • Rarely used — REDEFINES is more common

💡 Pro Tip: RENAMES is mostly legacy. Use REDEFINES or reference modification instead.`,code:`       01  WS-FULL-DATE.
           05  WS-YEAR      PIC 9(4).
           05  WS-MONTH     PIC 99.
           05  WS-DAY       PIC 99.
       66  WS-YEAR-MONTH RENAMES WS-YEAR THRU WS-MONTH.
      *    WS-YEAR-MONTH = '202603' (6 bytes)
      *
       01  WS-ADDRESS.
           05  WS-STREET    PIC X(30).
           05  WS-CITY      PIC X(20).
           05  WS-STATE     PIC XX.
           05  WS-ZIP       PIC 9(5).
       66  WS-CITY-STATE RENAMES WS-CITY THRU WS-STATE.`},{title:"CONTINUE & NEXT SENTENCE",level:"Intermediate",content:`CONTINUE is a no-op placeholder. NEXT SENTENCE is legacy — avoid it.

CONTINUE:
  Does nothing. Used as a placeholder in IF/EVALUATE when no action is needed.
  IF WS-STATUS = 'A'
      CONTINUE
  ELSE
      PERFORM ERROR-HANDLER
  END-IF

NEXT SENTENCE (Legacy):
  Transfers control to the statement after the next period.
  Dangerous with scope terminators — period may be far away.
  
  NEVER use NEXT SENTENCE with END-IF. Use CONTINUE instead.

EXIT:
  Another no-op. Used as the sole statement in an exit paragraph.
  PROCESS-EXIT.
      EXIT.

EXIT PERFORM:
  Breaks out of an inline PERFORM loop (like BREAK in other languages).
  PERFORM UNTIL WS-EOF
    READ FILE AT END EXIT PERFORM END-READ
    PERFORM PROCESS
  END-PERFORM

EXIT PERFORM CYCLE:
  Skips to next iteration (like CONTINUE in C/Java).

💡 Pro Tip: Use CONTINUE in empty IF branches. Use EXIT PERFORM to break loops.`,code:`      *    CONTINUE — placeholder:
           EVALUATE WS-TYPE
               WHEN 'A' CONTINUE
               WHEN 'B' PERFORM PROCESS-B
               WHEN OTHER PERFORM ERROR-RTN
           END-EVALUATE
      *
      *    EXIT PERFORM — break loop:
           PERFORM VARYING WS-I FROM 1 BY 1
               UNTIL WS-I > 100
               IF WS-TABLE(WS-I) = WS-SEARCH
                   MOVE 'Y' TO WS-FOUND
                   EXIT PERFORM
               END-IF
           END-PERFORM
      *
      *    EXIT PERFORM CYCLE — skip iteration:
           PERFORM VARYING WS-I FROM 1 BY 1
               UNTIL WS-I > WS-COUNT
               IF WS-STATUS(WS-I) = 'I'
                   EXIT PERFORM CYCLE
               END-IF
               PERFORM PROCESS-ACTIVE
           END-PERFORM`},{title:"Intrinsic Functions",level:"Intermediate",content:`COBOL intrinsic functions perform common operations without external calls.

Math Functions:
  FUNCTION ABS(x)           — Absolute value
  FUNCTION MAX(a, b, c)     — Maximum
  FUNCTION MIN(a, b, c)     — Minimum
  FUNCTION MOD(a, b)        — Modulus
  FUNCTION INTEGER(x)       — Integer part
  FUNCTION SQRT(x)          — Square root
  FUNCTION REM(a, b)        — Remainder

String Functions:
  FUNCTION LENGTH(x)        — Length in bytes
  FUNCTION REVERSE(x)       — Reverse string
  FUNCTION UPPER-CASE(x)    — To uppercase
  FUNCTION LOWER-CASE(x)    — To lowercase
  FUNCTION TRIM(x)          — Remove spaces (COBOL 6.3+)
  FUNCTION ORD(x)           — Ordinal position

Date Functions:
  FUNCTION CURRENT-DATE     — YYYYMMDDHHMMSS±HHMM
  FUNCTION INTEGER-OF-DATE(YYYYMMDD) — Integer date
  FUNCTION DATE-OF-INTEGER(n)        — YYYYMMDD from integer
  FUNCTION WHEN-COMPILED    — Compile timestamp

Usage:
  MOVE FUNCTION UPPER-CASE(WS-NAME) TO WS-NAME
  COMPUTE WS-DAYS = FUNCTION INTEGER-OF-DATE(WS-END) - FUNCTION INTEGER-OF-DATE(WS-START)

💡 Pro Tip: Date arithmetic with INTEGER-OF-DATE is the cleanest way to calculate date differences.`,code:`      *    Uppercase conversion:
           MOVE FUNCTION UPPER-CASE(WS-INPUT)
               TO WS-OUTPUT
      *
      *    Date difference (days between):
           COMPUTE WS-DAYS =
               FUNCTION INTEGER-OF-DATE(WS-END-DATE) -
               FUNCTION INTEGER-OF-DATE(WS-START-DATE)
      *
      *    Get current timestamp:
           MOVE FUNCTION CURRENT-DATE
               TO WS-TIMESTAMP
      *
      *    Max of three values:
           MOVE FUNCTION MAX(WS-A WS-B WS-C)
               TO WS-HIGHEST
      *
      *    String length:
           COMPUTE WS-LEN =
               FUNCTION LENGTH(WS-NAME)`},{title:"OCCURS DEPENDING ON (ODO)",level:"Intermediate",content:`Variable-length tables use OCCURS DEPENDING ON. The table size changes at runtime.

Syntax:
  05  WS-ITEM OCCURS 1 TO 100 TIMES
      DEPENDING ON WS-ACTUAL-COUNT PIC 9(3).

Rules:
  • WS-ACTUAL-COUNT must be set before accessing the table
  • DEPENDING ON field must be numeric integer
  • Minimum must be 0 or 1
  • Maximum defines the space allocated
  • Only the LAST OCCURS DEPENDING ON in a record affects record length

Variable-Length Records:
  When a file has ODO, the record length varies. FD must specify RECORD IS VARYING.
  FD MY-FILE RECORD IS VARYING IN SIZE FROM min TO max DEPENDING ON WS-REC-LEN.

Common Use:
  Input records with varying number of line items (e.g., invoice with 1-50 items).

💡 Pro Tip: Always validate WS-ACTUAL-COUNT is within range before accessing ODO tables.`,code:`       01  WS-INVOICE.
           05  WS-INV-ID        PIC 9(8).
           05  WS-CUST-NAME     PIC X(30).
           05  WS-LINE-COUNT    PIC 99.
           05  WS-LINE-ITEM OCCURS 1 TO 50 TIMES
                   DEPENDING ON WS-LINE-COUNT.
               10  WS-PRODUCT   PIC X(20).
               10  WS-QTY       PIC 9(5).
               10  WS-PRICE     PIC S9(5)V99 COMP-3.
      *
      *    Process variable number of items:
           PERFORM VARYING WS-I FROM 1 BY 1
               UNTIL WS-I > WS-LINE-COUNT
               COMPUTE WS-LINE-TOTAL =
                   WS-QTY(WS-I) * WS-PRICE(WS-I)
               ADD WS-LINE-TOTAL TO WS-INV-TOTAL
           END-PERFORM`},{title:"Multi-Dimensional Tables",level:"Intermediate",content:`COBOL supports up to 7 dimensions of OCCURS nesting.

Two-Dimensional:
  01  WS-MATRIX.
      05  WS-ROW OCCURS 12 TIMES.
          10  WS-COL OCCURS 5 TIMES PIC S9(7)V99 COMP-3.

  Access: WS-COL(row, col) — e.g., WS-COL(3, 2)

Three-Dimensional:
  01  WS-CUBE.
      05  WS-YEAR-DATA OCCURS 5 TIMES.
          10  WS-MONTH-DATA OCCURS 12 TIMES.
              15  WS-DAY-DATA OCCURS 31 TIMES PIC 9(5).

  Access: WS-DAY-DATA(year, month, day)

Practical Use:
  Monthly report by department and region:
  01  WS-REPORT-TABLE.
      05  WS-DEPT OCCURS 10 TIMES INDEXED BY IX-D.
          10  WS-REGION OCCURS 4 TIMES INDEXED BY IX-R.
              15  WS-AMOUNT PIC S9(9)V99 COMP-3.

  PERFORM VARYING IX-D FROM 1 BY 1 UNTIL IX-D > 10
    PERFORM VARYING IX-R FROM 1 BY 1 UNTIL IX-R > 4
      ADD WS-TRANS-AMT TO WS-AMOUNT(IX-D, IX-R)
    END-PERFORM
  END-PERFORM

💡 Pro Tip: Use INDEXED BY for multi-dimensional tables — SET and SEARCH work with indexes.`,code:`       01  WS-MONTHLY-SALES.
           05  WS-MONTH-ENTRY OCCURS 12 TIMES
                   INDEXED BY IX-MON.
               10  WS-REGION-ENTRY OCCURS 4 TIMES
                       INDEXED BY IX-REG.
                   15  WS-SALES-AMT
                           PIC S9(9)V99 COMP-3.
                   15  WS-UNIT-COUNT
                           PIC S9(7) COMP.
      *
      *    Load: sales for March, East region
           SET IX-MON TO 3
           SET IX-REG TO 1
           ADD WS-AMOUNT TO WS-SALES-AMT(IX-MON, IX-REG)
           ADD 1 TO WS-UNIT-COUNT(IX-MON, IX-REG)`},{title:"Indexed Files (KSDS I/O)",level:"Intermediate",content:`Complete KSDS processing patterns — random, sequential, and dynamic access.

Random Read:
  MOVE key TO CUST-KEY
  READ CUST-FILE INTO WS-REC
    INVALID KEY PERFORM NOT-FOUND
    NOT INVALID KEY PERFORM FOUND
  END-READ

Random Write:
  MOVE WS-REC TO CUST-RECORD
  WRITE CUST-RECORD
    INVALID KEY PERFORM DUP-KEY
  END-WRITE

Random Update:
  READ CUST-FILE INTO WS-REC (gets lock)
  ... modify WS-REC ...
  REWRITE CUST-RECORD FROM WS-REC
    INVALID KEY PERFORM UPDATE-ERR
  END-REWRITE

Random Delete:
  MOVE key TO CUST-KEY
  DELETE CUST-FILE
    INVALID KEY PERFORM NOT-FOUND
  END-DELETE

Sequential Browse:
  MOVE start-key TO CUST-KEY
  START CUST-FILE KEY >= CUST-KEY
    INVALID KEY PERFORM NO-START
  END-START
  PERFORM UNTIL WS-FS NOT = '00'
    READ CUST-FILE NEXT INTO WS-REC
      AT END EXIT PERFORM
    END-READ
    PERFORM PROCESS-REC
  END-PERFORM

💡 Pro Tip: For update, always READ first (gets lock), then REWRITE. Never REWRITE without prior READ.`,code:`      *    Complete CRUD pattern:
      *
      *    CREATE:
           MOVE WS-NEW-REC TO CUST-RECORD
           WRITE CUST-RECORD
               INVALID KEY
                   DISPLAY 'DUP: ' CUST-KEY
           END-WRITE
      *
      *    READ:
           MOVE WS-SEARCH-KEY TO CUST-KEY
           READ CUST-FILE INTO WS-REC
               INVALID KEY
                   MOVE 'N' TO WS-FOUND
               NOT INVALID KEY
                   MOVE 'Y' TO WS-FOUND
           END-READ
      *
      *    UPDATE:
           READ CUST-FILE
           MOVE WS-NEW-BAL TO CUST-BALANCE
           REWRITE CUST-RECORD
      *
      *    DELETE:
           DELETE CUST-FILE
               INVALID KEY DISPLAY 'NOT FOUND'
           END-DELETE`},{title:"Alternate Index Processing",level:"Intermediate",content:`Alternate indexes let you access VSAM KSDS by fields other than the primary key.

Setup (JCL/IDCAMS):
  1. DEFINE AIX — Create alternate index
  2. DEFINE PATH — Create access path
  3. BLDINDEX — Build index from base cluster

COBOL SELECT:
  SELECT CUST-BY-NAME ASSIGN TO CUSTPATH
    ORGANIZATION IS INDEXED
    ACCESS MODE IS DYNAMIC
    RECORD KEY IS CUST-NAME-KEY
    FILE STATUS IS WS-AIX-FS.

  The DD name (CUSTPATH) points to the PATH, not the base cluster.

UNIQUE vs NONUNIQUE:
  UNIQUE — Each alternate key value is unique (like primary)
  NONUNIQUE — Multiple records can have the same alternate key (WITH DUPLICATES in SELECT)

When to Use:
  Primary key: Customer ID (unique)
  Alternate key: Customer Name (non-unique, access by name)
  Alternate key: ZIP code (non-unique, access by location)

💡 Pro Tip: Alternate indexes add overhead on writes (index maintained automatically). Only create AIX you actually need.`,code:`      *    SELECT for alternate index path:
           SELECT CUST-BY-NAME
               ASSIGN TO CUSTPATH
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS CUST-NAME-KEY
               FILE STATUS IS WS-AIX-FS.
      *
      *    Read by alternate key:
           MOVE 'HARIKRISHNAN' TO CUST-NAME-KEY
           READ CUST-BY-NAME INTO WS-REC
               INVALID KEY
                   DISPLAY 'NAME NOT FOUND'
           END-READ
      *
      *    Browse by alternate key:
           MOVE 'H' TO CUST-NAME-KEY
           START CUST-BY-NAME KEY >= CUST-NAME-KEY
           PERFORM UNTIL WS-AIX-FS NOT = '00'
               READ CUST-BY-NAME NEXT INTO WS-REC
                   AT END EXIT PERFORM
               END-READ
               DISPLAY CUST-NAME-KEY ' ' CUST-ID
           END-PERFORM`},{title:"Cursor Processing (DB2 Advanced)",level:"Advanced",content:`Cursors process multiple rows from DB2 queries one at a time.

Cursor Lifecycle:
  DECLARE → OPEN → FETCH (loop) → CLOSE

DECLARE CURSOR:
  EXEC SQL DECLARE CUST-CURSOR CURSOR FOR
    SELECT CUST_ID, CUST_NAME, BALANCE
    FROM CUSTOMER
    WHERE STATUS = :WS-STATUS
    ORDER BY CUST_NAME
  END-EXEC

WITH HOLD:
  DECLARE ... CURSOR WITH HOLD FOR ...
  Keeps cursor open across COMMITs. Without HOLD, COMMIT closes all cursors.

FOR UPDATE OF:
  DECLARE ... CURSOR FOR SELECT ... FOR UPDATE OF BALANCE
  Allows positioned UPDATE/DELETE on current cursor row.

Positioned UPDATE:
  EXEC SQL UPDATE CUSTOMER SET BALANCE = :WS-BAL WHERE CURRENT OF CUST-CURSOR END-EXEC

Scrollable Cursors:
  DECLARE ... SCROLL CURSOR — allows FETCH FIRST, LAST, PRIOR, ABSOLUTE n

Bulk FETCH (Performance):
  EXEC SQL FETCH CUST-CURSOR FOR :WS-ROWS ROWS INTO :WS-ARRAY END-EXEC
  Fetches multiple rows at once into host variable arrays.

💡 Pro Tip: Always use WITH HOLD if you COMMIT inside a FETCH loop. Otherwise cursor closes on COMMIT.`,code:`           EXEC SQL DECLARE CUST-CUR CURSOR
               WITH HOLD FOR
               SELECT CUST_ID, CUST_NAME, BALANCE
               FROM CUSTOMER
               WHERE REGION = :WS-REGION
               ORDER BY CUST_NAME
           END-EXEC
      *
           EXEC SQL OPEN CUST-CUR END-EXEC
           PERFORM UNTIL SQLCODE NOT = 0
               EXEC SQL FETCH CUST-CUR
                   INTO :WS-ID, :WS-NAME, :WS-BAL
               END-EXEC
               IF SQLCODE = 0
                   PERFORM PROCESS-CUSTOMER
                   ADD 1 TO WS-FETCH-COUNT
                   IF WS-FETCH-COUNT >= 500
                       EXEC SQL COMMIT END-EXEC
                       MOVE 0 TO WS-FETCH-COUNT
                   END-IF
               END-IF
           END-PERFORM
           EXEC SQL CLOSE CUST-CUR END-EXEC`},{title:"DB2 Error Handling (SQLCA)",level:"Advanced",content:`SQLCA (SQL Communication Area) provides detailed DB2 return information.

Key SQLCA Fields:
  SQLCODE — Return code (0=OK, 100=not found, negative=error)
  SQLERRM — Error message text
  SQLERRD(3) — Rows affected by INSERT/UPDATE/DELETE
  SQLWARN0-A — Warning flags

Common SQLCODEs:
  0 — Success
  100 — Not found / end of data
  -803 — Duplicate key on INSERT
  -805 — Plan/package not found
  -811 — SELECT INTO returned multiple rows
  -818 — Timestamp mismatch (needs BIND)
  -904 — Resource unavailable
  -911 — Deadlock or timeout
  -180 — Invalid date/time value
  -305 — NULL value without indicator variable

NULL Handling:
  Host variable + indicator variable:
  01 WS-NAME PIC X(30).
  01 WS-NAME-IND PIC S9(4) COMP.
  
  EXEC SQL SELECT NAME INTO :WS-NAME :WS-NAME-IND FROM...
  IF WS-NAME-IND < 0 THEN name is NULL.

💡 Pro Tip: Always use indicator variables for nullable columns. Without them, NULL causes -305.`,code:`       01  WS-SQLCODE       PIC S9(9) COMP.
      *
           EXEC SQL
               INSERT INTO CUSTOMER
               (CUST_ID, CUST_NAME, BALANCE)
               VALUES
               (:WS-ID, :WS-NAME, :WS-BAL)
           END-EXEC
      *
           MOVE SQLCODE TO WS-SQLCODE
           EVALUATE TRUE
               WHEN SQLCODE = 0
                   ADD 1 TO WS-INSERT-COUNT
               WHEN SQLCODE = -803
                   DISPLAY 'DUPLICATE: ' WS-ID
                   ADD 1 TO WS-DUP-COUNT
               WHEN SQLCODE = -904
                   DISPLAY 'RESOURCE UNAVAILABLE'
                   MOVE 12 TO RETURN-CODE
                   GOBACK
               WHEN SQLCODE < 0
                   DISPLAY 'SQL ERROR: ' SQLCODE
                   DISPLAY 'MESSAGE: ' SQLERRMC
                   MOVE 8 TO RETURN-CODE
                   GOBACK
           END-EVALUATE`},{title:"Batch Update Patterns",level:"Advanced",content:`Common batch processing patterns used in production daily.

Pattern 1 — Sequential Master Update:
  Read transaction file and master file in key order. Match/merge to apply updates.

Pattern 2 — Random Master Update:
  Read transaction sequentially, do random reads against master (VSAM KSDS or DB2).

Pattern 3 — Extract-Transform-Load (ETL):
  Extract from source → Transform/validate → Load to target.

Pattern 4 — Balance/Reconciliation:
  Read two files, compare totals, produce exception report.

Pattern 5 — Control Break Report:
  Sort by group key → detect key changes → print subtotals at each break → grand total at end.

Control Break Logic:
  SAVE previous key
  READ next record
  IF current key ≠ saved key → print subtotal, reset accumulators, save new key
  Accumulate current record
  At EOF → print final subtotal and grand total

💡 Pro Tip: The sequential master update and control break are the two most common patterns in mainframe COBOL.`,code:`      *    Control Break Pattern:
           MOVE HIGH-VALUES TO WS-PREV-DEPT
           PERFORM READ-RECORD
           PERFORM UNTIL EOF-REACHED
               IF WS-DEPT NOT = WS-PREV-DEPT
                   IF WS-PREV-DEPT NOT = HIGH-VALUES
                       PERFORM PRINT-SUBTOTAL
                   END-IF
                   INITIALIZE WS-DEPT-TOTALS
                   MOVE WS-DEPT TO WS-PREV-DEPT
               END-IF
               ADD WS-AMOUNT TO WS-DEPT-TOTAL
               ADD WS-AMOUNT TO WS-GRAND-TOTAL
               ADD 1 TO WS-DETAIL-COUNT
               PERFORM PRINT-DETAIL
               PERFORM READ-RECORD
           END-PERFORM
           PERFORM PRINT-SUBTOTAL
           PERFORM PRINT-GRAND-TOTAL`},{title:"Dynamic CALL & CANCEL",level:"Advanced",content:`Dynamic CALL loads programs at runtime. CANCEL frees them from memory.

Dynamic CALL:
  MOVE 'SUBPROG' TO WS-PROG-NAME
  CALL WS-PROG-NAME USING WS-PARM

  Program loaded from STEPLIB/JOBLIB at first CALL. Stays in memory for subsequent calls.

CANCEL:
  CANCEL WS-PROG-NAME (or CANCEL 'SUBPROG')
  Frees the program from memory. Next CALL reloads it with fresh WORKING-STORAGE.

When to Use Dynamic CALL:
  • Program name determined at runtime
  • Programs called infrequently (CANCEL frees memory)
  • Plugin architecture (different programs for different clients)

When to Use Static CALL:
  • Frequently called programs (no load overhead)
  • Performance-critical paths
  • Programs always needed

ON EXCEPTION:
  CALL WS-PROG ON EXCEPTION PERFORM CALL-FAILED END-CALL
  Traps S806 (program not found) without ABEND.

💡 Pro Tip: Use ON EXCEPTION with dynamic CALL to handle missing programs gracefully.`,code:`      *    Dynamic CALL with error handling:
           MOVE 'VALIDATE' TO WS-PROG-NAME
           CALL WS-PROG-NAME USING WS-INPUT WS-RESULT
               ON EXCEPTION
                   DISPLAY 'PROGRAM NOT FOUND: '
                           WS-PROG-NAME
                   MOVE 8 TO RETURN-CODE
           END-CALL
      *
      *    CANCEL to free memory:
           CANCEL WS-PROG-NAME
      *
      *    Plugin pattern:
           EVALUATE WS-CLIENT-TYPE
               WHEN 'BANK'  MOVE 'BNKVALID' TO WS-PGM
               WHEN 'INSUR' MOVE 'INSVALID' TO WS-PGM
               WHEN OTHER   MOVE 'GENVALID' TO WS-PGM
           END-EVALUATE
           CALL WS-PGM USING WS-DATA
               ON EXCEPTION
                   DISPLAY 'MISSING: ' WS-PGM
           END-CALL`},{title:"SPECIAL-NAMES & Configuration",level:"Advanced",content:`SPECIAL-NAMES in ENVIRONMENT DIVISION configures system-specific settings.

Common Uses:
  DECIMAL-POINT IS COMMA — European number format (1.234,56 instead of 1,234.56)
  CURRENCY SIGN IS '€' — Custom currency symbol
  CLASS — Define custom character classes
  SYMBOLIC CHARACTERS — Name specific characters

SPECIAL-NAMES.
  DECIMAL-POINT IS COMMA.
  CURRENCY SIGN IS '€' WITH PICTURE SYMBOL '€'.

CLASS definition:
  CLASS VOWELS IS 'A' 'E' 'I' 'O' 'U' 'a' 'e' 'i' 'o' 'u'.
  IF WS-CHAR IS VOWELS THEN...

REPOSITORY (OO COBOL):
  For object-oriented COBOL and Java interop.

💡 Pro Tip: Most shops use standard US format. Know DECIMAL-POINT IS COMMA for international projects.`,code:`       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SPECIAL-NAMES.
           DECIMAL-POINT IS COMMA.
      *    Now: PIC ZZZ.ZZ9,99 displays 1.234,56
      *
      *    Custom currency:
      *    CURRENCY SIGN IS '£'
      *        WITH PICTURE SYMBOL '£'.
      *    PIC ££££,££9.99
      *
      *    Custom class:
      *    CLASS VALID-CHARS IS 'A' THRU 'Z'
      *                         '0' THRU '9'
      *                         '-' '_'.
      *    IF WS-INPUT IS VALID-CHARS ...`},{title:"XML & JSON Processing",level:"Advanced",content:`Modern COBOL (Enterprise COBOL 5+) supports XML and JSON natively.

XML GENERATE:
  XML GENERATE ws-xml-output FROM ws-data-group
    COUNT IN ws-xml-length
    ON EXCEPTION PERFORM XML-ERROR
  END-XML

  Converts a COBOL data structure into XML automatically.

XML PARSE:
  XML PARSE ws-xml-input PROCESSING PROCEDURE IS xml-handler
    ON EXCEPTION PERFORM XML-ERROR
  END-XML

  Event-driven parsing. Handler receives XML-EVENT and XML-TEXT.

JSON GENERATE (COBOL 6.1+):
  JSON GENERATE ws-json-output FROM ws-data-group
    COUNT IN ws-json-length
    ON EXCEPTION PERFORM JSON-ERROR
  END-JSON

JSON PARSE (COBOL 6.1+):
  JSON PARSE ws-json-input INTO ws-data-group
    ON EXCEPTION PERFORM JSON-ERROR
  END-JSON

This enables COBOL programs to produce/consume REST API data natively.

💡 Pro Tip: JSON GENERATE/PARSE enables COBOL programs to be REST API backends — key for modernization.`,code:`       01  WS-CUSTOMER.
           05  CUST-ID       PIC 9(8) VALUE 12345678.
           05  CUST-NAME     PIC X(30)
                              VALUE 'HARIKRISHNAN'.
           05  CUST-BALANCE  PIC S9(7)V99 COMP-3
                              VALUE +15000.50.
      *
       01  WS-JSON           PIC X(500).
       01  WS-JSON-LEN       PIC 9(5).
      *
      *    Generate JSON:
           JSON GENERATE WS-JSON FROM WS-CUSTOMER
               COUNT IN WS-JSON-LEN
           END-JSON
      *    Result: {"CUST-ID":12345678,
      *      "CUST-NAME":"HARIKRISHNAN",
      *      "CUST-BALANCE":15000.50}`},{title:"Object-Oriented COBOL",level:"Expert",content:`Enterprise COBOL supports object-oriented programming for Java interop and modern design patterns.

CLASS-ID:
  IDENTIFICATION DIVISION.
  CLASS-ID. CustomerClass.

FACTORY / OBJECT:
  Factory methods (static) and instance methods.

METHOD-ID:
  Define methods within a class.

INVOKE:
  INVOKE CustomerClass 'new' RETURNING ws-customer
  INVOKE ws-customer 'getName' RETURNING ws-name

Java Interop:
  COBOL can create Java objects, call Java methods, and implement Java interfaces. Enables gradual modernization.

Practical Use:
  Most shops use procedural COBOL. OO COBOL is used for:
  • Java interoperability
  • CICS Java components
  • Gradual modernization projects

💡 Pro Tip: OO COBOL is niche. Focus on procedural COBOL for interviews unless the job specifically mentions OO.`,code:`      *    OO COBOL class definition:
      *    CLASS-ID. CustomerClass.
      *    OBJECT.
      *    WORKING-STORAGE SECTION.
      *    01 ws-name PIC X(30).
      *    01 ws-balance PIC S9(9)V99 COMP-3.
      *
      *    METHOD-ID. setName.
      *    PROCEDURE DIVISION USING ls-name.
      *        MOVE ls-name TO ws-name
      *        GOBACK.
      *    END METHOD setName.
      *
      *    In calling program:
      *    INVOKE CustomerClass 'new'
      *        RETURNING ws-cust-obj
      *    INVOKE ws-cust-obj 'setName'
      *        USING 'HARIKRISHNAN'`},{title:"COBOL & CICS Web Services",level:"Expert",content:`Expose COBOL programs as REST/SOAP web services through CICS.

Architecture:
  Client → CICS Web Services → COBOL Program → DB2/VSAM

CICS Pipeline:
  Define a PIPELINE resource that maps HTTP requests to COBOL programs. WSBIND file describes the interface.

JSON Transformation:
  CICS TS 5.2+ supports JSON natively. COBOL data structures automatically convert to/from JSON.

z/OS Connect EE:
  IBM's API gateway for z/OS. Exposes COBOL/CICS/IMS programs as REST APIs without modifying the program.

Steps:
  1. Write normal COBOL program with COMMAREA/Container interface
  2. Create WSBIND (DFHWS2LS utility)
  3. Define PIPELINE and WEBSERVICE resources
  4. Deploy — COBOL program is now a REST endpoint

Benefits:
  • No COBOL code changes needed
  • Existing programs become APIs
  • Mobile apps can access mainframe data
  • Gradual modernization path

💡 Pro Tip: z/OS Connect is the modern way to expose COBOL as APIs. No program changes required.`,code:`      *    COBOL program exposed as web service:
      *    No special code needed — standard COMMAREA
       PROCEDURE DIVISION.
           IF EIBCALEN > 0
               MOVE DFHCOMMAREA TO WS-REQUEST
               PERFORM PROCESS-REQUEST
               MOVE WS-RESPONSE TO DFHCOMMAREA
           END-IF
           EXEC CICS RETURN END-EXEC.
      *
       PROCESS-REQUEST.
           EVALUATE WS-ACTION
               WHEN 'GET'
                   PERFORM GET-CUSTOMER
               WHEN 'UPD'
                   PERFORM UPDATE-CUSTOMER
           END-EVALUATE.
      *
      *    CICS handles JSON<->COBOL conversion
      *    Client sees REST API, COBOL sees COMMAREA`},{title:"Unit Testing COBOL",level:"Advanced",content:`Modern COBOL development includes automated testing.

Testing Approaches:
  1. Batch test harness — JCL that runs program with known inputs, compares outputs
  2. IBM z/OS Debugger — Interactive debugging
  3. COBOL unit test frameworks — IBM zUnit, Compuware Topaz
  4. Test doubles — Mock files and DB2 tables

Batch Test Pattern:
  1. Create test input files with known data
  2. Run program via JCL
  3. Compare actual output to expected output (SUPERC)
  4. Check return code

IBM zUnit:
  Write test cases in COBOL or JSON. Framework calls program, validates results.

Test-Driven Development:
  • Write test case first
  • Run (should fail)
  • Write code to pass
  • Refactor

Tips:
  • Keep programs small and testable
  • Separate business logic from I/O
  • Use CALL for testable units
  • Mock external dependencies

💡 Pro Tip: Even simple batch testing (run + compare) catches 80% of bugs. Automate it in your scheduler.`,code:`      *    Test harness JCL:
      //TEST     JOB  (ACCT),'COBOL TEST',CLASS=A,
      //         MSGCLASS=X,NOTIFY=&SYSUID
      //*
      //STEP1    EXEC PGM=PAYCALC
      //STEPLIB  DD  DSN=TEST.LOADLIB,DISP=SHR
      //INFILE   DD  DSN=TEST.INPUT.DATA,DISP=SHR
      //OUTFILE  DD  DSN=TEST.ACTUAL.OUTPUT,
      //         DISP=(NEW,CATLG,DELETE),
      //         SPACE=(CYL,(1,1))
      //SYSOUT   DD  SYSOUT=*
      //*
      //COMPARE  EXEC PGM=ISRSUPC,PARM='DELTAL'
      //NEWDD    DD  DSN=TEST.ACTUAL.OUTPUT,DISP=SHR
      //OLDDD    DD  DSN=TEST.EXPECTED.OUTPUT,DISP=SHR
      //OUTDD    DD  SYSOUT=*`},{title:"Nested COPY & Large Copybooks",level:"Intermediate",content:`Managing copybooks effectively in large applications.

COPY Statement Advanced:
  COPY can include copybooks that themselves contain COPY — nested copying (if compiler supports it).

REPLACING:
  COPY GENREC REPLACING ==:PFX:== BY ==CUST==.
  Every occurrence of :PFX: in the copybook becomes CUST.
  COPY GENREC REPLACING ==:PFX:== BY ==ORDR==.  (different prefix = different usage)

Common Copybook Types:
  • Record layouts (FD and 01-level definitions)
  • DCLGEN (DB2 table layouts)
  • Constants and configuration
  • Common paragraphs (error handling)
  • SQLCA, DFHCOMMAREA (system areas)

Organization:
  Keep copybooks in dedicated PDS libraries. Compile with SYSLIB pointing to copybook libraries.

💡 Pro Tip: One copybook per DB2 table (DCLGEN). One per file layout. Change once, recompile affected programs.`},{title:"COBOL Compile Options Deep Dive",level:"Advanced",content:`Compiler options affect code generation, debugging, and performance.

Essential Options:
  LIB — Enable COPY statement processing
  MAP — Show data map (memory offsets) in listing
  XREF — Cross-reference listing (where each variable is used)
  OFFSET — Condensed listing with instruction offsets
  SOURCE — Include source code in listing
  LIST — Machine code listing

Performance Options:
  OPTIMIZE(FULL) — Aggressive optimization
  OPTIMIZE(STD) — Standard optimization
  NOOPTIMIZE — No optimization (debugging)
  TRUNC(OPT) — Optimize truncation (faster, assumes correct data)
  TRUNC(BIN) — Binary truncation (strict)

Debugging Options:
  TEST — Generate debugging info for z/OS Debugger
  SSRANGE — Runtime subscript range checking (catches S0C4)
  DISPLAY(STD) — Standard DISPLAY behavior

DB2 Options (when using integrated precompiler):
  SQL('option string') — Pass options to DB2 precompiler

Important Combinations:
  Development: LIB,MAP,XREF,OFFSET,SOURCE,TEST,SSRANGE,NOOPTIMIZE
  Production: LIB,MAP,XREF,OFFSET,OPTIMIZE(FULL),TRUNC(OPT)

💡 Pro Tip: SSRANGE catches subscript errors before they become S0C4. Use in test, remove in production.`},{title:"COBOL & Batch Restart/Checkpoint",level:"Advanced",content:`Long-running batch jobs need restart capability to avoid reprocessing.

CHECKPOINT:
  COBOL programs can write checkpoints using the CHECKPOINT routine:
  CALL 'CHECKPOINT' USING ws-chk-data, ws-chk-id

z/OS Restart:
  If job ABENDs after checkpoint 5, restart from checkpoint 5. z/OS repositions files to checkpoint state.

Application-Level Restart:
  Store commit point in a control file:
  1. Process N records
  2. COMMIT (DB2) or write control record
  3. On restart, read control record, skip already-processed records

DB2 Commit Pattern:
  PERFORM UNTIL EOF
    EXEC SQL INSERT... END-EXEC
    ADD 1 TO WS-COMMIT-CTR
    IF WS-COMMIT-CTR >= 1000
      EXEC SQL COMMIT END-EXEC
      MOVE 0 TO WS-COMMIT-CTR
      UPDATE control-table with last-processed-key
    END-IF
  END-PERFORM
  EXEC SQL COMMIT END-EXEC

Design for Restart:
  • Make processing idempotent (safe to re-run)
  • Use control tables to track progress
  • COMMIT at regular intervals
  • Log restart information to SYSOUT

💡 Pro Tip: Design every batch program to be restartable from day one. Production ABENDs happen.`},{title:"COBOL Interview Q&A (40+)",level:"All Levels",content:`COBOL Interview Questions — 40+ Q&A organized by level.

=== BEGINNER ===

Q: What is COBOL?
A: Common Business Oriented Language — English-like programming language created in 1959, processing 95% of ATM transactions and $3 trillion daily.

Q: What are the four COBOL divisions?
A: IDENTIFICATION (program name), ENVIRONMENT (hardware/file mapping), DATA (variables/files), PROCEDURE (business logic).

Q: What is the difference between Area A and Area B?
A: Area A (columns 8-11): Division/Section/Paragraph headers, 01/77 level numbers, FD entries. Area B (columns 12-72): All other statements, subordinate data items.

Q: What is WORKING-STORAGE SECTION?
A: Contains variables that persist throughout program execution. Declared in DATA DIVISION.

Q: What is a PICTURE (PIC) clause?
A: Defines data format. X=alphanumeric, 9=numeric, S=signed, V=implied decimal. PIC S9(5)V99 COMP-3 = packed 5.2 decimal.

Q: What does MOVE do?
A: Copies data. Alphanumeric left-justified/space-padded. Numeric right-justified/zero-padded.

Q: What is COMP-3?
A: Packed decimal — 2 digits per byte + sign nibble. Best for financial calculations. Hardware-optimized on z/OS.

Q: What is PERFORM?
A: Loop/subroutine mechanism. PERFORM para, PERFORM UNTIL, PERFORM VARYING, PERFORM N TIMES.

Q: What is level 88?
A: Condition name. 88 ACTIVE VALUE 'A'. Used in IF: IF ACTIVE (readable, self-documenting).

Q: What is FILE STATUS?
A: 2-byte code after every file I/O. 00=success, 10=EOF, 22=dup key, 23=not found, 35=file not found.

=== INTERMEDIATE ===

Q: COMP vs COMP-3?
A: COMP=binary (for subscripts/counters). COMP-3=packed decimal (for money/calculations).

Q: What causes S0C7?
A: Non-numeric data in numeric field. Fix: INITIALIZE variables, validate with IF NUMERIC, check REDEFINES.

Q: What is EVALUATE?
A: Switch/case. EVALUATE TRUE / WHEN condition / WHEN OTHER / END-EVALUATE. Cleaner than nested IF.

Q: Static vs Dynamic CALL?
A: Static=linked at compile (faster, can't CANCEL). Dynamic=loaded at runtime (flexible, can CANCEL to free memory).

Q: BY REFERENCE vs BY CONTENT?
A: BY REFERENCE: subprogram modifies caller's data. BY CONTENT: subprogram gets copy, caller protected.

Q: What is COPY?
A: Includes copybook from library at compile time. COPY CUSTREC. Used for shared record layouts.

Q: What is REDEFINES?
A: Two data definitions sharing same memory. Used for: date parsing, multi-format records, data type reinterpretation.

Q: SEARCH vs SEARCH ALL?
A: SEARCH=sequential (any table). SEARCH ALL=binary search (sorted table with KEY IS, = only).

=== ADVANCED ===

Q: How to prevent S0C7?
A: INITIALIZE all working storage, validate input with IF NUMERIC, check REDEFINES alignment, display suspect fields before computation.

Q: How does COBOL interact with DB2?
A: EXEC SQL...END-EXEC blocks. SQLCA for return codes. SQLCODE 0=success, 100=not found, negative=error. Cursor for multi-row.

Q: What is pseudo-conversational in CICS?
A: Program sends screen → terminates → user responds → new task starts. COMMAREA carries state. EIBCALEN=0 means first invocation.

Q: How do you optimize COBOL?
A: COMP-3 for calculations, COMP for subscripts, SEARCH ALL for large tables, minimize I/O, COMMIT every N rows in DB2.

💡 Study Tip: Master COMP-3, FILE STATUS, EVALUATE, COPY, DB2 interaction, and S0C7 prevention.`,code:`      *    Classic read-process-write pattern:
       PROCEDURE DIVISION.
       MAIN-LOGIC.
           OPEN INPUT  IN-FILE
                OUTPUT OUT-FILE
           INITIALIZE WS-COUNTERS
           PERFORM READ-INPUT
           PERFORM PROCESS-LOOP UNTIL EOF-REACHED
           PERFORM WRITE-TOTALS
           CLOSE IN-FILE OUT-FILE
           DISPLAY 'PROCESSED: ' WS-COUNT
           MOVE 0 TO RETURN-CODE
           STOP RUN.`},{title:"COBOL Cheat Sheet",level:"All Levels",content:`COBOL Quick Reference — Bookmark this.

═══ DIVISIONS ═══
IDENTIFICATION → ENVIRONMENT → DATA → PROCEDURE

═══ DATA LEVELS ═══
01=Record  02-49=Subordinate  66=RENAMES  77=Standalone  88=Condition

═══ PIC TYPES ═══
X=Alphanumeric  9=Numeric  A=Alpha  S=Sign  V=Decimal  Z=ZeroSuppress

═══ COMP TYPES ═══
DISPLAY — 1 byte/digit  |  COMP — Binary (2/4/8 bytes)
COMP-3 — Packed (2 digits/byte + sign)  |  COMP-1/2 — Float

═══ KEY VERBS ═══
MOVE COMPUTE ADD SUBTRACT MULTIPLY DIVIDE
IF/EVALUATE/PERFORM STRING/UNSTRING/INSPECT
OPEN/READ/WRITE/CLOSE/START/REWRITE/DELETE
CALL/GOBACK/STOP RUN  SEARCH/SEARCH ALL
INITIALIZE ACCEPT/DISPLAY SORT/MERGE

═══ FILE STATUS ═══
00=OK 10=EOF 22=DupKey 23=NotFound 35=FileNotFound 39=AttrConflict

═══ SQLCODE ═══
0=OK 100=NotFound -803=DupKey -811=MultiRow -805=PlanNotFound

═══ COMMON ABENDS ═══
S0C7=NonNumeric S0C4=Addressing S0C1=InvalidOp S322=TimeOut

═══ COMPILE ═══
IGYCRCTL PARM='LIB,MAP,XREF,OFFSET'`,code:`      *    COBOL TEMPLATE:
       IDENTIFICATION DIVISION.
       PROGRAM-ID. TEMPLATE.
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT IN-FILE ASSIGN TO INDD
               FILE STATUS IS WS-FS.
       DATA DIVISION.
       FILE SECTION.
       FD  IN-FILE. 01 IN-REC PIC X(100).
       WORKING-STORAGE SECTION.
       01  WS-FS        PIC XX VALUE '00'.
       01  WS-EOF        PIC X VALUE 'N'.
           88 EOF-REACHED VALUE 'Y'.
       01  WS-COUNT     PIC S9(7) COMP VALUE 0.
       PROCEDURE DIVISION.
           OPEN INPUT IN-FILE
           PERFORM UNTIL EOF-REACHED
               READ IN-FILE
                   AT END SET EOF-REACHED TO TRUE
                   NOT AT END ADD 1 TO WS-COUNT
               END-READ
           END-PERFORM
           CLOSE IN-FILE
           DISPLAY 'COUNT: ' WS-COUNT
           STOP RUN.`}]},Bo={id:"rexx",icon:"🧩",title:"REXX",subtitle:"Restructured Extended Executor",color:"#f97316",level:"Beginner → Expert",description:"The Swiss-army-knife scripting language of z/OS. Automate anything on TSO, ISPF, batch, and beyond.",sections:[{title:"REXX Fundamentals",level:"Beginner",content:`REXX (Restructured Extended Executor) is a powerful, interpreted scripting language created by Mike Cowlishaw at IBM in 1979. On z/OS, REXX is the primary automation and scripting language.

Where REXX Runs on z/OS:
  • TSO/ISPF — Interactive command automation
  • Batch — Via IRXJCL or IKJEFT01 in JCL
  • CICS — REXX programs can run under CICS
  • NetView — Network automation
  • SDSF — Automate job queue management
  • Console — MVS console commands

Why REXX:
  • No compilation needed — interpreted at runtime
  • English-like readable syntax
  • Powerful string manipulation (built for text processing)
  • Direct access to TSO commands and ISPF services
  • Can call COBOL/Assembler programs
  • Integrated with z/OS system services

REXX Program Structure:
  First line must be a comment: /* REXX */
  Statements end at line end (no period needed)
  Case insensitive for keywords
  Statements can span lines with comma continuation
  Comments: /* ... */

Data Types:
  REXX has ONE data type: character string.
  Numbers are strings that look like numbers.
  REXX automatically converts as needed.
  "123" + "456" = 579 (auto numeric conversion)

Variables:
  No declarations needed — just use them.
  Uninitialized variable = its own uppercase name.
  x = 10 sets x. SAY x displays 10.
  DROP x resets variable to uninitialized state.`},{title:"REXX Language Reference",level:"Beginner",code:`/* REXX - Language Basics */

/* Variables - no declarations needed */
name = "John Smith"
age = 35
salary = 75000.50
active = 1

/* String operations */
full = name || " - Age:" age    /* concatenation */
SAY full                         /* output: John Smith - Age: 35 */
SAY LENGTH(name)                 /* 10 */
SAY SUBSTR(name, 1, 4)          /* John */
SAY WORD(name, 2)               /* Smith */
SAY WORDS(name)                  /* 2 */
SAY POS("Smith", name)           /* 6 */
SAY REVERSE(name)                /* htimS nhoJ */
SAY TRANSLATE(name)              /* JOHN SMITH */
SAY LEFT(name, 15, '.')          /* John Smith.... */
SAY RIGHT(name, 15, '.')         /* .....John Smith */
SAY CENTER(name, 20, '-')        /* -----John Smith----- */
SAY STRIP("  hello  ")           /* hello */
SAY COPIES("=-", 10)             /* =-=-=-=-=-=-=-=-=-=- */

/* Arithmetic */
SAY 10 + 3                      /* 13 */
SAY 10 - 3                      /* 7 */
SAY 10 * 3                      /* 30 */
SAY 10 / 3                      /* 3.33333333 */
SAY 10 % 3                      /* 3 (integer division) */
SAY 10 // 3                     /* 1 (remainder) */
SAY 2 ** 10                     /* 1024 (power) */

/* Comparison */
IF name = "John Smith" THEN SAY "Match"
IF age > 30 THEN SAY "Over 30"
IF active \\= 0 THEN SAY "Active"`,content:`REXX Built-in Functions (Selected):

String Functions:
  LENGTH(string) — string length
  SUBSTR(string, start, length) — substring
  LEFT(string, n, pad) — left justify/pad
  RIGHT(string, n, pad) — right justify/pad
  CENTER(string, n, pad) — center in field
  STRIP(string, option, char) — remove leading/trailing
  COPIES(string, n) — repeat n times
  TRANSLATE(string, out, in) — character translation
  REVERSE(string) — reverse characters
  POS(needle, haystack) — find position
  LASTPOS(needle, haystack) — find last position
  OVERLAY(new, target, pos) — overlay characters
  INSERT(new, target, pos) — insert characters
  DELSTR(string, start, length) — delete substring
  SPACE(string, n) — normalize spaces

Word Functions:
  WORDS(string) — count words
  WORD(string, n) — nth word
  WORDPOS(phrase, string) — find word position
  WORDINDEX(string, n) — character position of nth word
  SUBWORD(string, n, count) — extract words
  DELWORD(string, n, count) — delete words

Numeric Functions:
  ABS(n) — absolute value
  MAX(a,b,...) — maximum
  MIN(a,b,...) — minimum
  TRUNC(n, decimals) — truncate
  FORMAT(n, before, after) — format number
  RANDOM(min, max, seed) — random number

Conversion:
  C2X(char) — character to hex
  X2C(hex) — hex to character
  C2D(char) — character to decimal
  D2C(decimal) — decimal to character
  D2X(decimal) — decimal to hex
  X2D(hex) — hex to decimal`},{title:"Control Structures",level:"Beginner",code:`/* REXX - Control Structures */

/* IF/THEN/ELSE */
IF age >= 18 THEN
  SAY "Adult"
ELSE
  SAY "Minor"

/* DO block for multiple statements */
IF salary > 50000 THEN DO
  tax_rate = 0.30
  tax = salary * tax_rate
  net = salary - tax
  SAY "High earner. Net:" net
END
ELSE DO
  tax_rate = 0.15
  tax = salary * tax_rate
  net = salary - tax
  SAY "Standard. Net:" net
END

/* SELECT (like EVALUATE/SWITCH) */
SELECT
  WHEN dept = 'FIN' THEN SAY "Finance"
  WHEN dept = 'HR'  THEN SAY "Human Resources"
  WHEN dept = 'IT'  THEN SAY "Technology"
  OTHERWISE SAY "Unknown department"
END

/* DO loop - counted */
DO i = 1 TO 10
  SAY "Iteration:" i
END

/* DO WHILE */
count = 0
DO WHILE count < 5
  count = count + 1
  SAY "Count:" count
END

/* DO UNTIL */
DO UNTIL response = "QUIT"
  SAY "Enter command (QUIT to exit):"
  PULL response
END

/* DO FOREVER with LEAVE */
DO FOREVER
  SAY "Enter value (0 to stop):"
  PULL val
  IF val = 0 THEN LEAVE
  total = total + val
END
SAY "Total:" total

/* ITERATE - skip to next iteration */
DO i = 1 TO 20
  IF i // 2 = 0 THEN ITERATE  /* skip even */
  SAY i "is odd"
END`,content:`Control Structures:

IF/THEN/ELSE:
  IF condition THEN instruction
  IF condition THEN DO ... END; ELSE DO ... END

SELECT:
  SELECT; WHEN cond1 THEN ...; WHEN cond2 THEN ...;
  OTHERWISE ...; END

DO Loops:
  DO n — execute n times
  DO i = start TO end BY step
  DO WHILE condition
  DO UNTIL condition
  DO FOREVER

Loop Control:
  LEAVE — exit the loop (like BREAK)
  ITERATE — skip to next iteration (like CONTINUE)

SIGNAL:
  SIGNAL label — unconditional jump (like GOTO)
  SIGNAL ON ERROR — set error trap
  SIGNAL ON NOVALUE — trap uninitialized variables
  SIGNAL ON SYNTAX — trap syntax errors
  SIGNAL ON HALT — trap user interrupt

NOP:
  No operation — placeholder in SELECT/IF.`},{title:"Stems (Arrays & Structures)",level:"Intermediate",code:`/* REXX - Stems (Compound Variables) */

/* Simple array using stem */
name.1 = "Alice"
name.2 = "Bob"
name.3 = "Charlie"
name.0 = 3             /* convention: .0 = count */

DO i = 1 TO name.0
  SAY i":" name.i
END

/* Associative array (like a dictionary) */
capital.US = "Washington DC"
capital.UK = "London"
capital.FR = "Paris"
capital.JP = "Tokyo"

country = "FR"
SAY country "capital:" capital.country  /* Paris */

/* Initialize all elements */
score. = 0              /* all score.xxx = 0 */
score.ALICE = 95
score.BOB = 87
SAY score.ALICE         /* 95 */
SAY score.CHARLIE       /* 0 (default) */

/* Multi-dimensional */
grid.1.1 = "X"
grid.1.2 = "O"
grid.2.1 = " "
grid.2.2 = "X"

/* Stack/Queue operations */
/* PUSH adds to top (LIFO) */
PUSH "first"
PUSH "second"
PUSH "third"
PULL item   /* item = "THIRD" (uppercased) */
PARSE PULL item  /* item = "second" (original case) */

/* QUEUE adds to bottom (FIFO) */
QUEUE "first"
QUEUE "second"
QUEUE "third"
PULL item   /* item = "FIRST" */`,content:`Stems (Compound Variables):

REXX's answer to arrays and data structures.

stem.tail = value
  stem is the variable name
  tail is the index (can be number or string)

Conventions:
  stem.0 = count of elements
  stem. = default (initialize all)

Types:
  Indexed: name.1, name.2 ... (like arrays)
  Keyed: capital.US, capital.UK (like dictionaries)
  Multi-dim: grid.1.1, grid.1.2 (like 2D arrays)

Stack/Queue (External Data Queue):
  PUSH value — add to stack top (LIFO)
  QUEUE value — add to queue bottom (FIFO)
  PULL variable — remove from top (uppercased)
  PARSE PULL variable — remove, preserve case
  QUEUED() — number of items in queue`},{title:"PARSE Instruction",level:"Intermediate",code:`/* REXX - PARSE (the most powerful instruction) */

/* PARSE VAR — parse a variable */
full_name = "John Michael Smith"
PARSE VAR full_name first middle last
SAY first     /* John */
SAY middle    /* Michael */
SAY last      /* Smith */

/* Parse with template positions */
record = "001234JOHN SMITH      NY10001"
PARSE VAR record id 7 name 25 state 27 zip 32
SAY "ID:" id "Name:" name "State:" state

/* PARSE PULL — parse user input */
SAY "Enter name and age:"
PARSE PULL user_name user_age
SAY "Hello" user_name ", you are" user_age

/* PARSE ARG — parse arguments */
/* In a function: */
calc: PARSE ARG num1, operation, num2
  SELECT
    WHEN operation = '+' THEN RETURN num1 + num2
    WHEN operation = '-' THEN RETURN num1 - num2
    WHEN operation = '*' THEN RETURN num1 * num2
  END

/* PARSE VALUE ... WITH — parse expression */
PARSE VALUE DATE('S') WITH year 5 month 7 day
SAY year"-"month"-"day

/* Parse with literal delimiters */
csv_line = "Alice,30,Finance,75000"
PARSE VAR csv_line name ',' age ',' dept ',' salary
SAY name salary    /* Alice 75000 */

/* PARSE SOURCE — get exec info */
PARSE SOURCE os invocation exec_name . . host_env
SAY "Running:" exec_name "on" os`,content:`PARSE — REXX's Most Powerful Instruction:

PARSE breaks strings into pieces using templates.

Sources:
  PARSE VAR variable — parse a variable
  PARSE PULL — parse from data queue / terminal
  PARSE ARG — parse function/subroutine arguments
  PARSE VALUE expression WITH — parse an expression
  PARSE SOURCE — get program environment info
  PARSE VERSION — get REXX interpreter version

Templates:
  Word parsing: PARSE VAR str word1 word2 rest
  Column parsing: PARSE VAR str col1 5 col2 10
  Literal delimiter: PARSE VAR str a ',' b ',' c
  Variable pattern: PARSE VAR str a (delim) b

UPPER keyword:
  PARSE UPPER VAR str ... — uppercase before parsing
  PULL is shorthand for PARSE UPPER PULL

PARSE vs Traditional Parsing:
  One PARSE instruction can replace dozens of SUBSTR calls.
  It's the key to REXX's text processing power.`},{title:"Functions & Subroutines",level:"Intermediate",code:`/* REXX - Functions & Subroutines */

/* Internal function (RETURN value) */
SAY "Tax:" calcTax(75000, 0.30)

calcTax: PROCEDURE
  PARSE ARG salary, rate
  tax = salary * rate
RETURN tax

/* PROCEDURE EXPOSE — share specific variables */
total = 0
DO i = 1 TO 5
  CALL addToTotal i * 100
END
SAY "Total:" total      /* 1500 */

addToTotal: PROCEDURE EXPOSE total
  PARSE ARG amount
  total = total + amount
RETURN

/* Subroutine (CALL, use RESULT) */
CALL greet "Alice"
SAY RESULT              /* Hello Alice! */

greet: PROCEDURE
  PARSE ARG name
RETURN "Hello" name"!"

/* Built-in function call */
today = DATE('S')       /* 20250227 */
now = TIME('N')         /* 14:30:45 */
SAY "Date:" today "Time:" now

/* Error handling with SIGNAL */
SIGNAL ON ERROR
SIGNAL ON SYNTAX

/* Normal processing */
x = 10 / 0    /* triggers SYNTAX trap */
EXIT 0

ERROR:
  SAY "Error at line" SIGL":"  SOURCELINE(SIGL)
  EXIT 8

SYNTAX:
  SAY "Syntax error" rc "at line" SIGL
  SAY "Error:" ERRORTEXT(rc)
  EXIT 12`,content:`Functions and Subroutines:

Functions (return a value):
  result = functionName(arg1, arg2)
  Defined with label: and RETURN value

Subroutines (CALL):
  CALL subroutineName arg1, arg2
  Return value in special variable RESULT

PROCEDURE Keyword:
  Isolates variables from caller (local scope).
  Without PROCEDURE: all variables are global.
  PROCEDURE EXPOSE var1 var2: share specific variables.

Error Handling:
  SIGNAL ON ERROR — trap command errors
  SIGNAL ON SYNTAX — trap syntax errors
  SIGNAL ON NOVALUE — trap uninitialized variables
  SIGNAL ON HALT — trap user interrupts

  In trap handler:
  SIGL — line number where error occurred
  RC — error code
  SOURCELINE(n) — source code at line n
  ERRORTEXT(n) — description of error n

DATE/TIME Functions:
  DATE('S') — sorted: 20250227
  DATE('N') — normal: 27 Feb 2025
  DATE('U') — USA: 02/27/25
  TIME('N') — normal: 14:30:45
  TIME('L') — long: 14:30:45.123456`},{title:"TSO & ISPF Integration",level:"Intermediate",code:`/* REXX - TSO/ISPF Integration */

/* Execute TSO commands */
"ALLOC DA('MY.DATA.FILE') F(INPUT) SHR REUSE"
"EXECIO * DISKR INPUT (STEM rec. FINIS"
"FREE F(INPUT)"

SAY "Read" rec.0 "records"
DO i = 1 TO rec.0
  SAY rec.i
END

/* Write to a dataset */
out.1 = "Header line"
out.2 = "Data line 1"
out.3 = "Data line 2"
out.0 = 3
"ALLOC DA('MY.OUTPUT.FILE') F(OUTPUT) OLD REUSE"
"EXECIO" out.0 "DISKW OUTPUT (STEM out. FINIS"
"FREE F(OUTPUT)"

/* Create new dataset */
"ALLOC DA('MY.NEW.FILE') F(NEWFILE)" ,
  "NEW CATALOG TRACKS SPACE(5,2)" ,
  "RECFM(F B) LRECL(80) BLKSIZE(0)"
"FREE F(NEWFILE)"

/* ISPF services */
ADDRESS ISPEXEC
"DISPLAY PANEL(MYPANEL)"
IF rc = 8 THEN DO
  SAY "User pressed END/RETURN"
  EXIT 0
END

/* Browse a dataset */
ADDRESS ISPEXEC "BROWSE DATASET('MY.DATA.FILE')"

/* Edit a dataset */
ADDRESS ISPEXEC "EDIT DATASET('MY.SOURCE(MYPROG)')"

/* ISPF table services */
ADDRESS ISPEXEC "TBCREATE MYTABLE NAMES(NAME AGE DEPT)"
name = "Alice"; age = 30; dept = "IT"
ADDRESS ISPEXEC "TBADD MYTABLE"
name = "Bob"; age = 25; dept = "FIN"
ADDRESS ISPEXEC "TBADD MYTABLE"
ADDRESS ISPEXEC "TBDISPL MYTABLE PANEL(TBLPANEL)"`,content:`TSO & ISPF Integration:

EXECIO — File I/O in TSO:
  Read: "EXECIO * DISKR ddname (STEM var. FINIS"
  Write: "EXECIO n DISKW ddname (STEM var. FINIS"
  Append: "EXECIO n DISKW ddname (STEM var."
  * = all records, n = specific count
  FINIS closes the file after operation

TSO Commands:
  ALLOC — Allocate (assign) a dataset to DD name
  FREE — Release DD allocation
  LISTDS — List dataset information
  DELETE — Delete a dataset
  RENAME — Rename a dataset
  SUBMIT — Submit JCL for batch execution

ADDRESS ISPEXEC — ISPF Services:
  DISPLAY PANEL — Show an ISPF panel
  BROWSE/EDIT/VIEW DATASET — File operations
  TBCREATE/TBADD/TBDISPL — Table services
  VGET/VPUT — Variable pool access
  SELECT CMD/PGM — Run commands/programs

ADDRESS TSO — Explicit TSO commands
ADDRESS ISPEXEC — ISPF dialog services
ADDRESS ISREDIT — ISPF edit macro commands`},{title:"REXX Batch Execution",level:"Intermediate",code:`//* JCL to run REXX in batch using IRXJCL
//REXXJOB  JOB ,'REXX BATCH',CLASS=A,
//              MSGCLASS=X,NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=IRXJCL,
//              PARM='MYREXX'
//SYSEXEC  DD DSN=MY.REXX.LIBRARY,DISP=SHR
//SYSTSPRT DD SYSOUT=*
//SYSTSIN  DD DUMMY
//INPUT    DD DSN=MY.INPUT.DATA,DISP=SHR
//OUTPUT   DD DSN=MY.OUTPUT.DATA,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE)
//*
//* Alternative: Run via TSO in batch
//STEP2    EXEC PGM=IKJEFT01
//SYSEXEC  DD DSN=MY.REXX.LIBRARY,DISP=SHR
//SYSTSPRT DD SYSOUT=*
//SYSTSIN  DD *
  %MYREXX ARG1 ARG2
/*
//*
//* REXX with in-stream code
//STEP3    EXEC PGM=IRXJCL,PARM='INSTREAM'
//SYSEXEC  DD *
/* REXX */
SAY "Hello from in-stream REXX"
SAY "Today is" DATE('N')
"LISTDS 'SYS1.PARMLIB' MEMBERS"
EXIT 0
//INSTREAM DD DUMMY
//SYSTSPRT DD SYSOUT=*`,content:`Running REXX in Batch:

IRXJCL — Direct REXX executor:
  PGM=IRXJCL,PARM='execname'
  SYSEXEC — library containing the REXX exec
  SYSTSPRT — SAY output goes here
  SYSTSIN — input (or DUMMY if none)

IKJEFT01 — TSO in batch:
  PGM=IKJEFT01
  SYSTSIN — TSO commands including %execname
  Full TSO environment (ALLOC, EXECIO, etc.)

DD Statements in REXX:
  REXX can read/write DDs allocated in JCL:
  "EXECIO * DISKR ddname (STEM rec. FINIS"
  DD names must match between JCL and REXX code.

Return Code:
  EXIT n — sets job step return code
  EXIT 0 = success, EXIT 8 = error, etc.`},{title:"REXX Edit Macros",level:"Advanced",code:`/* REXX - ISPF Edit Macro */
/* Run from ISPF editor command line */
ADDRESS ISREDIT "MACRO (parms)"

/* Get dataset name */
ADDRESS ISREDIT "(dsname) = DATASET"
ADDRESS ISREDIT "(member) = MEMBER"
SAY "Editing:" dsname"("member")"

/* Get line count */
ADDRESS ISREDIT "(lastline) = LINENUM .ZLAST"
SAY "Total lines:" lastline

/* Find and change text */
ADDRESS ISREDIT "FIND 'OLD-VALUE' ALL"
IF rc = 0 THEN DO
  ADDRESS ISREDIT "CHANGE 'OLD-VALUE' 'NEW-VALUE' ALL"
  SAY "Changed all occurrences"
END

/* Process each line */
DO i = 1 TO lastline
  ADDRESS ISREDIT "(line) = LINE" i
  /* Check if line is a comment */
  IF SUBSTR(STRIP(line),1,1) = '*' THEN DO
    ADDRESS ISREDIT "LABEL" i "= .COMMENT"
    ADDRESS ISREDIT "XSTATUS" i "= X"   /* exclude */
  END
END

/* Insert lines */
ADDRESS ISREDIT "LINE_BEFORE 1 = ' * Generated by macro'"
ADDRESS ISREDIT "LINE_BEFORE 1 = ' * Date:" DATE('N')"'"

ADDRESS ISREDIT "END"`,content:`ISPF Edit Macros in REXX:

Edit macros automate repetitive editing tasks.
Run from ISPF editor command line by typing the macro name.

ADDRESS ISREDIT commands:
  MACRO (parms) — declare as edit macro
  DATASET / MEMBER — get file info
  LINENUM .ZLAST — get total lines
  LINE n — get/set line content
  FIND 'text' — search
  CHANGE 'old' 'new' — find and replace
  LINE_BEFORE/AFTER n = text — insert lines
  DELETE n — delete a line
  LABEL n = .label — set label
  XSTATUS n = X/NX — exclude/show line
  CURSOR = n col — position cursor
  END — exit editor

Practical Uses:
  Auto-format COBOL code
  Generate standard headers
  Mass find-and-replace across members
  Validate coding standards
  Insert debug DISPLAY statements`},{title:"Advanced REXX Patterns",level:"Advanced",content:`Advanced REXX Techniques:

1. OUTTRAP — Capture TSO command output:
   CALL OUTTRAP 'lines.'
   "LISTDS 'SYS1.PARMLIB' MEMBERS"
   CALL OUTTRAP 'OFF'
   DO i = 1 TO lines.0
     SAY lines.i
   END

2. SYSDSN — Check if dataset exists:
   IF SYSDSN("'MY.DATA.FILE'") = "OK" THEN
     SAY "Dataset exists"
   ELSE
     SAY SYSDSN("'MY.DATA.FILE'")  /* reason */

3. LISTDSI — Get dataset attributes:
   result = LISTDSI("'MY.DATA.FILE'")
   SAY "RECFM:" SYSRECFM
   SAY "LRECL:" SYSLRECL
   SAY "DSORG:" SYSDSORG
   SAY "USED:" SYSUSED "tracks"

4. SYSCALLS — z/OS Unix from REXX:
   CALL SYSCALLS 'ON'
   ADDRESS SYSCALL 'readdir /u/myuser stem.'

5. SUBMIT JCL from REXX:
   queue "//MYJOB JOB ,'AUTO',CLASS=A"
   queue "//STEP1 EXEC PGM=IEFBR14"
   queue "/*"
   "SUBMIT * END(/*)"

6. Dynamic Code (INTERPRET):
   formula = "x * 2 + 5"
   x = 10
   INTERPRET "result =" formula
   SAY result  /* 25 */

7. Socket Programming:
   REXX can use TCP/IP sockets for network automation.

8. Regular Expressions (RXREGEXP):
   Available as external function for pattern matching.`},{title:"Interview Questions",level:"All Levels",content:`REXX Interview Questions — 25+ Q&A.

=== BEGINNER ===

Q: What is REXX?
A: Restructured Extended Executor — scripting language for z/OS automation, TSO/ISPF extensions, and batch processing.

Q: How do you run REXX on z/OS?
A: From TSO: EXEC 'library(member)' EXEC. In batch: PGM=IRXJCL or via IKJEFT01.

Q: What makes REXX different from COBOL?
A: REXX is interpreted (not compiled), dynamically typed, has built-in string functions, and is designed for scripting/automation rather than batch business logic.

Q: What is a REXX stem variable?
A: Array-like structure. stem.1='first', stem.2='second', stem.0=count. Similar to arrays in other languages.

Q: What are common REXX built-in functions?
A: SUBSTR, LENGTH, POS, WORD, WORDS, STRIP, TRANSLATE, COPIES, RIGHT, LEFT, CENTER, DATE, TIME, DATATYPE.

=== INTERMEDIATE ===

Q: How does REXX interact with TSO?
A: ADDRESS TSO sends commands. ADDRESS ISPEXEC sends ISPF services. "ALLOC" allocates datasets, "FREE" deallocates.

Q: What is OUTTRAP?
A: Captures TSO command output into stem variables. CALL OUTTRAP 'var.' → run command → output in var.1, var.2, var.0=count.

Q: Explain REXX EXECIO.
A: Reads/writes files. "EXECIO * DISKR ddname (STEM data." reads all. "EXECIO 1 DISKW ddname (STEM out." writes one record. FINIS closes.

Q: What is PARSE in REXX?
A: Powerful string parsing. PARSE VAR string word1 word2 rest. PARSE VALUE expression WITH template. Template-based extraction.

Q: How do you handle errors in REXX?
A: SIGNAL ON ERROR/SYNTAX/NOVALUE. Trap RC from commands. IF RC = 0 THEN handle error.

💡 Study Tip: Know EXECIO, OUTTRAP, stem variables, and PARSE — these are the most-used REXX features.`},{title:"REXX Cheat Sheet",level:"All Levels",content:`REXX Quick Reference — Cheat Sheet

═══ STRUCTURE ═══
/* REXX */  (first line, required comment)
SAY 'Hello'   — Display output
PULL var       — Read input
EXIT rc        — End with return code

═══ STRING FUNCTIONS ═══
SUBSTR(str,pos,len)  LENGTH(str)  POS(needle,hay)
WORD(str,n)  WORDS(str)  STRIP(str)  TRANSLATE(str)
LEFT(str,n)  RIGHT(str,n)  COPIES(str,n)  CENTER(str,n)

═══ FILE I/O (EXECIO) ═══
"EXECIO * DISKR ddname (STEM data. FINIS"   — Read all
"EXECIO 1 DISKW ddname (STEM out. FINIS"    — Write one
"EXECIO 0 DISKR ddname (OPEN"               — Open
"EXECIO 0 DISKR ddname (FINIS"              — Close

═══ TSO INTERACTION ═══
ADDRESS TSO "ALLOC FI(dd) DA('dsn') SHR"
ADDRESS TSO "FREE FI(dd)"
CALL OUTTRAP 'out.'  — Capture output
ADDRESS ISPEXEC "DISPLAY PANEL(panelname)"

═══ PARSE ═══
PARSE VAR string word1 word2 rest
PARSE VALUE expr WITH var1 ',' var2`}]},Fo={id:"vsam",icon:"🗄️",title:"VSAM",subtitle:"Virtual Storage Access Method",color:"#8b5cf6",level:"Beginner → Expert",description:"The high-performance file system powering CICS, IMS, and enterprise batch. Master VSAM, master z/OS.",sections:[{title:"Introduction to VSAM",level:"Beginner",content:`Virtual Storage Access Method (VSAM) is the primary high-performance file access method on z/OS. Unlike simple sequential datasets, VSAM provides indexed access, direct (random) access, and sophisticated space management — making it the backbone of enterprise applications.

Why VSAM Matters:
  • Powers nearly every CICS online transaction
  • Used by DB2 and IMS internally for tablespaces and indexes
  • Handles billions of records in production environments worldwide
  • Provides both sequential and random access in a single file
  • Built-in space management, buffering, and recovery features

VSAM vs Traditional Files:
  Sequential (PS): Read from start to end — no random access
  VSAM KSDS:       Read by key, by position, or sequentially — full flexibility

VSAM Dataset Types:
─────────────────────────────────────────
1. KSDS — Key-Sequenced Data Set (most common)
   Records are stored in sorted order by a primary key field.
   Supports both sequential browsing and random access by key.
   Supports alternate indexes for access by other fields.
   Think of it like a database table with a primary key.

2. ESDS — Entry-Sequenced Data Set
   Records are stored in the order they were inserted (like a log).
   No primary key — records are accessed by RBA (Relative Byte Address).
   Cannot delete or shorten records. Can update in place if same length.
   Used for: logs, journals, sequential processing with occasional direct access.

3. RRDS — Relative Record Data Set
   Records are accessed by their relative record number (slot number).
   Fixed-length slots — each slot is either occupied or empty.
   Very fast access: slot number = physical position.
   Used for: lookup tables, hash-based access, sparse datasets.

4. LDS — Linear Data Set
   Byte-stream dataset with no record structure.
   Accessed through Data-In-Virtual (DIV) or window services.
   Used internally by DB2 for tablespaces and by other subsystems.

VSAM Terminology:
  CI  — Control Interval: The unit of I/O (like a block). Contains records + control info.
  CA  — Control Area: A group of CIs. Space is allocated in CAs.
  RBA — Relative Byte Address: Physical offset from the start of the dataset.
  RDF — Record Definition Field: Describes each record within a CI.
  CIDF — Control Interval Definition Field: Describes the CI itself.
  Cluster — The combination of a DATA component and an INDEX component.
  Sphere — A base cluster plus all its alternate indexes.`},{title:"VSAM Architecture — CI, CA & Splits",level:"Beginner",content:`VSAM Internal Architecture:

Understanding how VSAM stores data internally is crucial for performance tuning and troubleshooting.

Control Interval (CI) — The Fundamental Unit:
  A CI is the smallest unit of data transfer between disk and memory.
  Default CI sizes: 4096 (4K), 8192 (8K), 12288 (12K), up to 32768 (32K).

  CI Structure:
  ┌──────────────────────────────────────────────────┐
  │ Record 1 │ Record 2 │ ... │ Free Space │ RDFs │ CIDF │
  └──────────────────────────────────────────────────┘

  • Records are stored left to right
  • Free space is in the middle
  • RDFs (Record Definition Fields) describe each record (3 bytes each)
  • CIDF (CI Definition Field) is at the end (4 bytes) — stores free space offset and length

Control Area (CA) — A Group of CIs:
  A CA contains multiple CIs. Typically maps to one track or one cylinder.
  When a new CI is needed for a CI split, VSAM looks for a free CI within the same CA.
  If no free CIs in the CA, a CA split occurs (much more expensive).

FREESPACE — Critical for Performance:
  FREESPACE(CI-percent CA-percent)
  • CI free space: Percentage of each CI left empty for future inserts
  • CA free space: Percentage of CIs in each CA left empty for CI splits

  FREESPACE(20 10) means:
  - 20% of each CI is free for new records
  - 10% of CIs in each CA are completely empty for CI splits

CI Split — What Happens When a CI Is Full:
  1. A record needs to be inserted into a full CI
  2. VSAM allocates a free CI (from CA free space)
  3. Approximately half the records from the full CI move to the new CI
  4. The index is updated to point to both CIs
  5. The new record is inserted in its correct sorted position

  CI splits degrade performance over time because:
  • Records that were adjacent are now in different CIs
  • Sequential access becomes less efficient (physical I/O pattern breaks)
  • More index levels may be needed

CA Split — More Expensive:
  When there are no free CIs in the CA for a CI split:
  1. A new CA is allocated (secondary allocation)
  2. Half the CIs from the full CA are moved to the new CA
  3. Much more data movement than a CI split
  4. Can cause significant performance impact

  CA splits indicate you need more FREESPACE or should reorganize.

VSAM Buffers:
  Data buffers: Cache CIs from the DATA component
  Index buffers: Cache CIs from the INDEX component
  More buffers = fewer physical I/Os = better performance
  BUFND (data buffers), BUFNI (index buffers)
  LSR (Local Shared Resources) pools: Shared buffer pools for multiple files
  NSR (Non-Shared Resources): Dedicated buffers per file`},{title:"KSDS — Key-Sequenced Data Set",level:"Beginner",content:`KSDS — The Most Important VSAM Type:

KSDS (Key-Sequenced Data Set) is by far the most commonly used VSAM dataset type. Records are maintained in sorted order by a primary key, enabling both random access (by key) and sequential browsing.

Components:
  DATA component — Stores the actual records
  INDEX component — B-tree index that maps keys to CI locations

Index Structure (B-tree):
  Sequence Set — Lowest level, one entry per CI in data component
  Index Set    — Higher levels that speed up key lookups
  
  Key lookup: Start at top index → navigate down → find sequence set entry → read CI

  Example with 1 million records:
  Index Level 3 (root):     1 CI
  Index Level 2:           ~20 CIs
  Index Level 1:          ~400 CIs
  Sequence Set:         ~8,000 CIs
  Data Component:      ~100,000 CIs

  To find any record: 4 index I/Os + 1 data I/O = 5 I/Os maximum
  (With buffering, index is often cached → only 1-2 I/Os)

Key Definition:
  KEYS(length offset)
  • Length: 1–255 bytes
  • Offset: Starting position of the key within the record (0-based)
  • Key must be unique (no duplicate primary keys)
  • Key values should not be changed (use delete + reinsert)

  KEYS(10 0)  — 10-byte key starting at the first byte
  KEYS(6 5)   — 6-byte key starting at position 5

Record Sizes:
  RECORDSIZE(average maximum)
  For fixed-length records: average = maximum
  For variable-length: average should be realistic for buffer calculations

  RECORDSIZE(200 200)   — Fixed 200-byte records
  RECORDSIZE(100 500)   — Variable, avg 100, max 500

SHAREOPTIONS:
  Controls concurrent access from multiple jobs/tasks.
  SHAREOPTIONS(crossRegion crossSystem)

  Cross-Region (same system):
    1 — One writer OR multiple readers (most restrictive, safest)
    2 — One writer AND multiple readers (common for batch)
    3 — Multiple writers and readers (no VSAM integrity — app must manage)
    4 — Same as 3 plus buffers refreshed for each request

  Cross-System (different LPARs in sysplex):
    3 — Multiple writers and readers (must use external serialization)
    4 — Same as 3 with buffer refresh`,code:`  DEFINE CLUSTER -
    (NAME(PROD.EMPLOYEE.MASTER) -
     INDEXED -
     KEYS(6 0) -
     RECORDSIZE(200 200) -
     FREESPACE(20 10) -
     SHAREOPTIONS(2 3) -
     SPEED -
     BUFFERSPACE(1048576)) -
    DATA -
    (NAME(PROD.EMPLOYEE.MASTER.DATA) -
     CYLINDERS(100 50) -
     CONTROLINTERVALSIZE(8192)) -
    INDEX -
    (NAME(PROD.EMPLOYEE.MASTER.INDEX) -
     CYLINDERS(10 5) -
     CONTROLINTERVALSIZE(4096))`},{title:"ESDS, RRDS & Linear Datasets",level:"Intermediate",content:`Other VSAM Dataset Types:

ESDS — Entry-Sequenced Data Set:
  Records are stored in chronological order (insertion sequence).
  No primary key index — records accessed by RBA or sequentially.

  Characteristics:
  • Records cannot be deleted (only logically marked as deleted by application)
  • Records can be updated in place IF the new record is the same length
  • Access by RBA (Relative Byte Address) for direct access
  • Very efficient for sequential processing (no index overhead)

  Use Cases:
  • Transaction logs and audit trails
  • CICS system log (DFHLOG)
  • Journal files
  • Sequential data that needs occasional direct access
  • Feeding data to batch jobs

  Define ESDS:
  DEFINE CLUSTER -
    (NAME(MY.AUDIT.LOG) -
     NONINDEXED -                          ← ESDS keyword
     RECORDSIZE(200 500) -
     SHAREOPTIONS(2 3)) -
    DATA -
    (NAME(MY.AUDIT.LOG.DATA) -
     CYLINDERS(50 25))

RRDS — Relative Record Data Set:
  Records are accessed by their relative record number (slot position).
  Each slot is a fixed size — slots can be empty or occupied.

  Characteristics:
  • Very fast direct access (slot number → physical location — no index needed)
  • Slots are fixed-length — all same size
  • Records can be inserted into empty slots and deleted (slot becomes empty)
  • Sequential access reads occupied slots in order

  Use Cases:
  • Lookup tables (e.g., product code → description)
  • Hash-based access patterns
  • When you have a natural numeric key
  • Small reference files with fast access needs

  Define RRDS:
  DEFINE CLUSTER -
    (NAME(MY.LOOKUP.TABLE) -
     NUMBERED -                            ← RRDS keyword
     RECORDSIZE(100 100) -
     SHAREOPTIONS(2 3)) -
    DATA -
    (NAME(MY.LOOKUP.TABLE.DATA) -
     CYLINDERS(5 2))

LDS — Linear Data Set:
  A byte-stream dataset with no record structure at all.

  Characteristics:
  • No records, no CIs in the traditional sense
  • Accessed through Data-In-Virtual (DIV) macro services
  • Maps directly to virtual storage pages (4K pages)
  • Used internally by system components

  Use Cases:
  • DB2 tablespaces and index spaces
  • CICS temporary storage (TS queues)
  • Coupling Facility data
  • Applications using memory-mapped file techniques

  Define LDS:
  DEFINE CLUSTER -
    (NAME(MY.LINEAR.DATA) -
     LINEAR -                              ← LDS keyword
     SHAREOPTIONS(3 3)) -
    DATA -
    (NAME(MY.LINEAR.DATA.DATA) -
     CYLINDERS(20 10))`},{title:"IDCAMS for VSAM — Define, Delete, Alter",level:"Beginner",content:`IDCAMS — The Primary Tool for VSAM Management:

All VSAM datasets are created, modified, and deleted through IDCAMS (Access Method Services). You cannot create VSAM datasets with standard JCL DD statements.

DEFINE CLUSTER — Create a VSAM Dataset:
  This is the most important IDCAMS command for VSAM.`,code:`//* ═══════════════════════════════════════════════════════
//* DEFINE A KSDS WITH ALL COMMON PARAMETERS
//* ═══════════════════════════════════════════════════════
//DEFKSDS  EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  /* Delete if exists (SET MAXCC=0 ignores "not found") */
  DELETE PROD.CUSTOMER.MASTER CLUSTER PURGE
  SET MAXCC = 0

  DEFINE CLUSTER -
    (NAME(PROD.CUSTOMER.MASTER) -
     INDEXED -
     KEYS(10 0) -
     RECORDSIZE(300 300) -
     FREESPACE(20 10) -
     SHAREOPTIONS(2 3) -
     SPEED -
     ERASE -
     SPANNED) -
    DATA -
    (NAME(PROD.CUSTOMER.MASTER.DATA) -
     CYLINDERS(200 100) -
     CONTROLINTERVALSIZE(12288) -
     BUFFERSPACE(524288)) -
    INDEX -
    (NAME(PROD.CUSTOMER.MASTER.INDEX) -
     CYLINDERS(20 10) -
     CONTROLINTERVALSIZE(4096))
/*
//*
//* ═══════════════════════════════════════════════════════
//* LOAD DATA INTO KSDS FROM FLAT FILE
//* ═══════════════════════════════════════════════════════
//LOADDATA EXEC PGM=IDCAMS
//INFILE   DD DSN=PROD.CUSTOMER.FLATFILE,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  REPRO INFILE(INFILE) -
        OUTDATASET(PROD.CUSTOMER.MASTER) -
        REPLACE
/*
//*
//* ═══════════════════════════════════════════════════════
//* LISTCAT — DISPLAY FULL DETAILS
//* ═══════════════════════════════════════════════════════
//LISTCAT  EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  LISTCAT -
    ENTRIES(PROD.CUSTOMER.MASTER) -
    ALL
/*
//*
//* ═══════════════════════════════════════════════════════
//* ALTER — CHANGE ATTRIBUTES
//* ═══════════════════════════════════════════════════════
//ALTER    EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  ALTER PROD.CUSTOMER.MASTER -
    FREESPACE(30 15) -
    BUFFERSPACE(1048576)
  ALTER PROD.CUSTOMER.MASTER.DATA -
    CYLINDERS(300 150)
/*
//*
//* ═══════════════════════════════════════════════════════
//* VERIFY — FIX END-OF-FILE AFTER ABEND
//* ═══════════════════════════════════════════════════════
//VERIFY   EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  VERIFY DATASET(PROD.CUSTOMER.MASTER)
/*
//*
//* ═══════════════════════════════════════════════════════
//* PRINT — DISPLAY CONTENTS
//* ═══════════════════════════════════════════════════════
//PRINT    EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  PRINT INDATASET(PROD.CUSTOMER.MASTER) -
        CHARACTER -
        COUNT(10)
/*`},{title:"Alternate Indexes (AIX)",level:"Intermediate",content:`Alternate Indexes — Access KSDS by Different Keys:

A VSAM KSDS has one primary key. But often you need to access records by other fields — for example, access customers by name instead of customer ID. Alternate Indexes make this possible.

How AIX Works:
  1. Define an alternate index over the base cluster
  2. Build the AIX (BLDINDEX) — creates key-pointer pairs
  3. Define a PATH — connects the AIX to the base cluster
  4. Access through the PATH name as if it were a separate file

AIX Types:
  Unique AIX:     Each alternate key value appears only once
  Non-Unique AIX: Multiple records can have the same alternate key (WITH DUPLICATES)

Example: Customer file with primary key = Customer-ID
  AIX 1: Customer-Name (non-unique — names can repeat)
  AIX 2: Customer-SSN (unique — SSN is unique per person)

Important Concepts:
  • AIX is itself a KSDS — key = alternate key, data = primary key pointer(s)
  • PATH connects AIX to base cluster for transparent access
  • When you read through a PATH, VSAM automatically follows the pointer to the base record
  • AIX must be rebuilt after batch updates to the base cluster (or use UPGRADE)

UPGRADE Attribute:
  If UPGRADE is specified, the AIX is automatically updated when:
  • Records are added to the base cluster
  • Records are deleted from the base cluster
  • The alternate key field is changed in the base cluster
  This is essential for CICS (online) access where AIX must always be current.

  NOUPGRADE: AIX is NOT automatically maintained — you must BLDINDEX after batch updates.

Performance Considerations:
  • Each UPGRADE AIX adds overhead to every write operation
  • Non-unique AIX with many duplicates can become very large
  • AIX lookups require extra I/O (AIX index → AIX data → base data)
  • Limit to 253 AIX per base cluster`,code:`//* ═══════════════════════════════════════════════════════
//* DEFINE ALTERNATE INDEX ON CUSTOMER NAME
//* ═══════════════════════════════════════════════════════
//DEFAIX   EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  /* Define the AIX */
  DEFINE ALTERNATEINDEX -
    (NAME(PROD.CUSTOMER.AIX.NAME) -
     RELATE(PROD.CUSTOMER.MASTER) -
     KEYS(30 10) -
     NONUNIQUEKEY -
     UPGRADE -
     RECORDSIZE(50 200) -
     SHAREOPTIONS(2 3)) -
    DATA -
    (NAME(PROD.CUSTOMER.AIX.NAME.DATA) -
     CYLINDERS(20 10)) -
    INDEX -
    (NAME(PROD.CUSTOMER.AIX.NAME.INDEX) -
     CYLINDERS(5 2))
/*
//*
//* ═══════════════════════════════════════════════════════
//* BUILD THE ALTERNATE INDEX
//* ═══════════════════════════════════════════════════════
//BLDAIX   EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//IDCUT1   DD UNIT=SYSDA,SPACE=(CYL,(20,10))
//IDCUT2   DD UNIT=SYSDA,SPACE=(CYL,(20,10))
//SYSIN    DD *
  BLDINDEX -
    INDATASET(PROD.CUSTOMER.MASTER) -
    OUTDATASET(PROD.CUSTOMER.AIX.NAME) -
    INTERNALSORT
/*
//*
//* ═══════════════════════════════════════════════════════
//* DEFINE PATH (connects AIX to base)
//* ═══════════════════════════════════════════════════════
//DEFPATH  EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  DEFINE PATH -
    (NAME(PROD.CUSTOMER.PATH.NAME) -
     PATHENTRY(PROD.CUSTOMER.AIX.NAME) -
     UPDATE)
/*
//*
//* ═══════════════════════════════════════════════════════
//* ACCESS BASE CLUSTER THROUGH AIX PATH
//* ═══════════════════════════════════════════════════════
//AIXREAD  EXEC PGM=MYPROG
//CUSTNAME DD DSN=PROD.CUSTOMER.PATH.NAME,DISP=SHR
//* Program reads CUSTNAME using alternate key (customer name)
//* VSAM transparently returns the full base cluster record
//SYSOUT   DD SYSOUT=*`},{title:"VSAM in COBOL Programs",level:"Intermediate",code:`       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
      * --- KSDS with dynamic access ---
           SELECT CUSTOMER-FILE
               ASSIGN TO CUSTMAST
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS CUST-ID
               ALTERNATE RECORD KEY IS CUST-NAME
                   WITH DUPLICATES
               FILE STATUS IS WS-CUST-STATUS.
      *
       DATA DIVISION.
       FILE SECTION.
       FD  CUSTOMER-FILE.
       01  CUSTOMER-RECORD.
           05 CUST-ID             PIC X(10).
           05 CUST-NAME           PIC X(30).
           05 CUST-ADDRESS        PIC X(50).
           05 CUST-BALANCE        PIC S9(09)V99 COMP-3.
           05 CUST-STATUS         PIC X(01).
      *
       WORKING-STORAGE SECTION.
       01  WS-CUST-STATUS         PIC XX.
           88 VSAM-OK                       VALUE '00'.
           88 VSAM-DUPKEY                   VALUE '22'.
           88 VSAM-NOT-FOUND                VALUE '23'.
           88 VSAM-END-OF-FILE              VALUE '10'.
      *
       PROCEDURE DIVISION.
      *
      * --- Random READ by primary key ---
           MOVE '1234567890' TO CUST-ID
           READ CUSTOMER-FILE
               INVALID KEY
                   DISPLAY 'NOT FOUND: ' CUST-ID
               NOT INVALID KEY
                   DISPLAY 'FOUND: ' CUST-NAME
           END-READ
      *
      * --- Random READ by alternate key ---
           MOVE 'SMITH JOHN' TO CUST-NAME
           READ CUSTOMER-FILE
               KEY IS CUST-NAME
               INVALID KEY
                   DISPLAY 'NAME NOT FOUND'
           END-READ
      *
      * --- Sequential browse (all records) ---
           OPEN INPUT CUSTOMER-FILE
           READ CUSTOMER-FILE NEXT
               AT END SET VSAM-END-OF-FILE TO TRUE
           END-READ
           PERFORM UNTIL VSAM-END-OF-FILE
               DISPLAY CUST-ID ' ' CUST-NAME
               READ CUSTOMER-FILE NEXT
                   AT END SET VSAM-END-OF-FILE TO TRUE
               END-READ
           END-PERFORM
      *
      * --- Positioned browse (START + READ NEXT) ---
           MOVE 'M' TO CUST-NAME
           START CUSTOMER-FILE
               KEY IS >= CUST-NAME
               INVALID KEY
                   DISPLAY 'NO RECORDS FROM M'
           END-START
           READ CUSTOMER-FILE NEXT
               AT END DISPLAY 'END OF FILE'
           END-READ
      *
      * --- INSERT new record ---
           MOVE '9999999999' TO CUST-ID
           MOVE 'NEW CUSTOMER' TO CUST-NAME
           MOVE ZEROS TO CUST-BALANCE
           MOVE 'A' TO CUST-STATUS
           WRITE CUSTOMER-RECORD
               INVALID KEY
                   DISPLAY 'DUPLICATE KEY: ' CUST-ID
           END-WRITE
      *
      * --- UPDATE existing record ---
           MOVE '1234567890' TO CUST-ID
           READ CUSTOMER-FILE
           IF VSAM-OK
               ADD 100.00 TO CUST-BALANCE
               REWRITE CUSTOMER-RECORD
                   INVALID KEY
                       DISPLAY 'REWRITE FAILED'
               END-REWRITE
           END-IF
      *
      * --- DELETE record ---
           MOVE '9999999999' TO CUST-ID
           DELETE CUSTOMER-FILE
               INVALID KEY
                   DISPLAY 'DELETE FAILED'
           END-DELETE.`,content:`VSAM File Operations in COBOL:

When working with VSAM in COBOL, you treat the file as an INDEXED organization with standard COBOL file operations. The system handles all VSAM internals transparently.

Access Modes:
  SEQUENTIAL — browse records in key order (READ NEXT)
  RANDOM — access by key (READ with key, WRITE, REWRITE, DELETE)
  DYNAMIC — both random and sequential in the same program (most flexible)

Key Operations:
  READ file-name — random read by primary key
  READ file-name KEY IS alt-key — random read by alternate key
  READ file-name NEXT — sequential read (next record in key order)
  WRITE record-name — insert a new record
  REWRITE record-name — update the record just read (must READ first)
  DELETE file-name — delete by primary key
  START file-name KEY IS >= key-field — position for sequential browse

File Status Codes (VSAM specific):
  00 — Successful
  02 — Duplicate alternate key (allowed by WITH DUPLICATES)
  10 — End of file
  22 — Duplicate primary key on WRITE
  23 — Record not found on READ/START/DELETE
  35 — File not found (DD missing or DSN wrong)
  39 — File attributes mismatch
  41 — File already open
  42 — File not open
  46 — Read after end of file
  47 — Read attempted on output-only file
  48 — Write attempted on input-only file
  49 — REWRITE/DELETE without prior READ
  92 — Logic error
  93 — VSAM resource unavailable (file in use)
  96 — VSAM cluster issue
  97 — File integrity failure

Always check file status after every VSAM operation!`},{title:"VSAM Performance Tuning",level:"Advanced",content:`VSAM Performance Tuning — Make Your Files Fly:

Poor VSAM performance is one of the most common problems in mainframe environments. Understanding and tuning these parameters can reduce I/O by 50-90%.

1. CI Size Selection:
   ────────────────────
   Larger CIs = fewer I/Os for sequential, but more data per read for random.

   Sequential processing: Use large CIs (12K-32K)
   Random processing: Use medium CIs (4K-8K) to avoid reading unnecessary data
   Mixed workload: Balance — 8K-12K is often optimal

   Rule of thumb:
   For DATA:  CI size = half-track (e.g., 18K for 3390) or reasonable multiple of record size
   For INDEX: Keep at 4K (keeps index levels shallow)

2. FREESPACE Optimization:
   ────────────────────────
   Too little: Frequent CI splits, CA splits → degraded performance
   Too much: Wasted space, more CIs to browse sequentially

   High-insert workload (>30% growth): FREESPACE(30 20)
   Moderate inserts (10-30%):          FREESPACE(20 10)
   Read-mostly (rare inserts):         FREESPACE(10 5) or (0 0)
   Sequential load:                    FREESPACE(0 0) with SPEED

   After loading, ALTER to set operational FREESPACE before online use.

3. Buffering — The Biggest Win:
   ─────────────────────────────
   VSAM buffering is the #1 performance lever.

   NSR (Non-Shared Resources):
   BUFND — Number of data buffers
   BUFNI — Number of index buffers
   Each buffer holds one CI.

   Recommendation:
   • Index buffers: At least (number of index levels + 1)
   • Data buffers: For sequential: as many as possible
                    For random: 3-5 minimum
   • BUFFERSPACE: Total bytes for all buffers

   LSR (Local Shared Resources):
   Pool of buffers shared across multiple VSAM files.
   Much more efficient than NSR when opening many files.
   Used by CICS for all VSAM file access.
   Configured with SHRPOOL parameter.

   General rule: More buffers = fewer I/Os = faster. Always.

4. CI/CA Split Monitoring:
   ────────────────────────
   Use LISTCAT ALL to check split statistics:
   • SPLITS-CI: Number of CI splits since last reorganization
   • SPLITS-CA: Number of CA splits
   • EXTENTS: Number of extents (more extents = fragmented)

   Warning signs:
   • CI splits > 10% of records → increase FREESPACE
   • CA splits > 0 → increase CA FREESPACE or reorganize
   • Extents approaching 123 (SMS) or 16 (non-SMS) → reorganize urgently

5. Reorganization:
   ─────────────────
   Over time, splits fragment the file. Reorganize periodically:
   a. REPRO to a flat file
   b. DELETE the cluster
   c. DEFINE with correct FREESPACE
   d. REPRO back from flat file

   Alternatives:
   • IDCAMS EXPORT/IMPORT — preserves catalog entry
   • Online reorganization tools (IBM, BMC, CA products)

6. Data Set Compression:
   ──────────────────────
   VSAM supports compression to reduce disk I/O:
   DEFINE CLUSTER ... COMP(IMBED) or hardware compression
   Reduces space but adds CPU overhead for compress/decompress.`},{title:"VSAM Backup & Recovery",level:"Advanced",content:`VSAM Backup & Recovery Strategies:

VSAM files are often business-critical. Having robust backup and recovery procedures is essential.

Backup Methods:

1. IDCAMS REPRO (Logical Copy):
   REPRO INDATASET(MY.VSAM.FILE) OUTDATASET(MY.BACKUP.PS)
   Creates a sequential copy of all records.
   Pros: Portable, can change attributes on restore
   Cons: Slower, no point-in-time consistency for active files

2. IDCAMS EXPORT (Full Dataset Export):
   EXPORT MY.VSAM.FILE OUTFILE(BACKUP) TEMPORARY
   Creates a portable copy including catalog information.
   IMPORT restores the cluster with all original attributes.
   TEMPORARY: Don't delete the original
   PERMANENT: Delete the original (for migration)

3. DFSMSdss DUMP (Physical Copy):
   Most common production method. Backs up at the physical level.
   Fast, can be done concurrently with access (CONCURRENT keyword).
   DFSMSdss RESTORE to recover.

4. CICS Recovery:
   CICS uses forward recovery logs and backout journals.
   VSAM files updated through CICS can be recovered to any point in time.
   Requires: FCT RECOVERY=YES, journal definition, backup copy

Recovery Scenarios:

Scenario 1: File corruption (CI damage)
  → Restore from DFSMSdss backup
  → Apply CICS forward recovery logs to catch up

Scenario 2: Application error (bad data loaded)
  → REPRO from backup
  → Or IDCAMS IMPORT from EXPORT copy

Scenario 3: Out-of-space during batch update
  → VERIFY the dataset (reset end-of-file)
  → Reorganize with more space
  → Restart the batch job

Scenario 4: Accidental deletion
  → IMPORT from EXPORT copy
  → Or RESTORE from DFSMSdss dump

VERIFY Command:
  When a VSAM file is not closed properly (due to abend), the end-of-file marker may be incorrect. VERIFY resets it:
  VERIFY DATASET(MY.VSAM.FILE)
  Always run VERIFY before accessing a VSAM file after an abend.`,code:`//* ═══════════════════════════════════════════════════════
//* VSAM BACKUP AND RECOVERY PROCEDURES
//* ═══════════════════════════════════════════════════════
//*
//* --- METHOD 1: REPRO to sequential backup ---
//BACKUP   EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//BACKUP   DD DSN=PROD.CUSTOMER.BACKUP(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(100,50),RLSE)
//SYSIN    DD *
  REPRO INDATASET(PROD.CUSTOMER.MASTER) -
        OUTFILE(BACKUP)
/*
//*
//* --- METHOD 2: EXPORT ---
//EXPORT   EXEC PGM=IDCAMS
//EXPFILE  DD DSN=PROD.CUSTOMER.EXPORT(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(100,50),RLSE)
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  EXPORT PROD.CUSTOMER.MASTER -
         OUTFILE(EXPFILE) -
         TEMPORARY
/*
//*
//* --- RESTORE FROM REPRO BACKUP ---
//RESTORE  EXEC PGM=IDCAMS
//BACKUP   DD DSN=PROD.CUSTOMER.BACKUP(0),DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  DELETE PROD.CUSTOMER.MASTER CLUSTER PURGE
  SET MAXCC = 0
  DEFINE CLUSTER -
    (NAME(PROD.CUSTOMER.MASTER) -
     INDEXED KEYS(10 0) -
     RECORDSIZE(300 300) -
     FREESPACE(20 10) SHAREOPTIONS(2 3)) -
    DATA -
    (NAME(PROD.CUSTOMER.MASTER.DATA) -
     CYLINDERS(200 100)) -
    INDEX -
    (NAME(PROD.CUSTOMER.MASTER.INDEX) -
     CYLINDERS(20 10))
  REPRO INFILE(BACKUP) -
        OUTDATASET(PROD.CUSTOMER.MASTER)
/*
//*
//* --- RESTORE FROM EXPORT ---
//IMPORT   EXEC PGM=IDCAMS
//EXPFILE  DD DSN=PROD.CUSTOMER.EXPORT(0),DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  IMPORT INFILE(EXPFILE) -
         OUTDATASET(PROD.CUSTOMER.MASTER)
/*
//*
//* --- REORGANIZE (Defragment) ---
//REORG1   EXEC PGM=IDCAMS
//TEMPFILE DD DSN=&&VSAMTEMP,DISP=(NEW,PASS),
//            SPACE=(CYL,(200,100))
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  REPRO INDATASET(PROD.CUSTOMER.MASTER) -
        OUTFILE(TEMPFILE)
/*
//REORG2   EXEC PGM=IDCAMS,COND=(0,NE,REORG1)
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  DELETE PROD.CUSTOMER.MASTER CLUSTER PURGE
  DEFINE CLUSTER -
    (NAME(PROD.CUSTOMER.MASTER) -
     INDEXED KEYS(10 0) -
     RECORDSIZE(300 300) -
     FREESPACE(20 10) SHAREOPTIONS(2 3)) -
    DATA(NAME(PROD.CUSTOMER.MASTER.DATA) -
     CYLINDERS(200 100)) -
    INDEX(NAME(PROD.CUSTOMER.MASTER.INDEX) -
     CYLINDERS(20 10))
/*
//REORG3   EXEC PGM=IDCAMS,COND=(0,NE,REORG2)
//TEMPFILE DD DSN=&&VSAMTEMP,DISP=(OLD,DELETE)
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  REPRO INFILE(TEMPFILE) -
        OUTDATASET(PROD.CUSTOMER.MASTER)
/*`},{title:"VSAM in CICS Environment",level:"Advanced",content:`VSAM Under CICS — Online File Access:

In CICS, VSAM files are the primary storage mechanism. Understanding how CICS handles VSAM is critical for online application development.

CICS File Control (FC):
  CICS provides the EXEC CICS commands for file access:
  EXEC CICS READ FILE('CUSTMAST') INTO(WS-RECORD) RIDFLD(WS-KEY)
  EXEC CICS WRITE FILE('CUSTMAST') FROM(WS-RECORD) RIDFLD(WS-KEY)
  EXEC CICS REWRITE FILE('CUSTMAST') FROM(WS-RECORD)
  EXEC CICS DELETE FILE('CUSTMAST') RIDFLD(WS-KEY)
  EXEC CICS STARTBR FILE('CUSTMAST') RIDFLD(WS-KEY)
  EXEC CICS READNEXT FILE('CUSTMAST') INTO(WS-RECORD) RIDFLD(WS-KEY)
  EXEC CICS ENDBR FILE('CUSTMAST')

FCT (File Control Table) Entry:
  Each VSAM file used by CICS must be defined in the FCT:
  DEFINE FILE(CUSTMAST)
         DSNAME(PROD.CUSTOMER.MASTER)
         ADD(YES) BROWSE(YES) DELETE(YES) READ(YES) UPDATE(YES)
         OPENTIME(FIRSTREF)
         LSRPOOLID(1)
         RECORDFORMAT(F)
         RECOVERY(BACKOUTONLY)
         STATUS(ENABLED)

LSR (Local Shared Resources) in CICS:
  CICS uses LSR pools for efficient VSAM buffering.
  All files assigned to a pool share the same buffers.
  Much more memory-efficient than NSR (dedicated buffers per file).

  LSRPOOLID — assigns file to a pool (1-8)
  Pool sizes configured in CICS SIT (System Initialization Table):
  LSRPOOLID(1) ... STRINGS(20) DATABUFS(100,8192) INDEXBUFS(50,4096)

  Strings = maximum concurrent requests to this pool
  DATABUFS = number of data buffers by CI size
  INDEXBUFS = number of index buffers by CI size

Record-Level Locking:
  CICS provides automatic record-level locking for VSAM files:
  • READ UPDATE — locks the record until REWRITE, DELETE, or UNLOCK
  • Other transactions wait if they try to read-update the same record
  • Deadlocks possible if two transactions lock records in different order
  • CICS detects deadlocks and abends one transaction (AFCR/AFCS)

  Best Practices:
  • Keep UPDATE locks as short as possible
  • Read without UPDATE for display-only operations
  • Use NOSUSPEND on READ UPDATE to handle busy records gracefully
  • Avoid locking records across conversational (multi-screen) transactions

Recovery in CICS:
  RECOVERY(BACKOUTONLY) — CICS can back out changes if transaction abends
  RECOVERY(ALL) — Both backout and forward recovery (requires journals)
  RECOVERY(NONE) — No recovery (faster but risky)

  When a transaction abends, CICS automatically backs out all changes to recoverable files — returning them to their state before the transaction started.`},{title:"VSAM Catalog & SMS Integration",level:"Advanced",content:`VSAM Catalog Structure & SMS:

VSAM Catalogs:
  Every VSAM dataset is defined in an ICF (Integrated Catalog Facility) catalog.
  The catalog stores:
  • Dataset name and type
  • Volume location
  • Space allocation
  • Key definition
  • Attributes (FREESPACE, SHAREOPTIONS, etc.)
  • Statistics (records, CI/CA splits, extents)

  Master Catalog: Top-level catalog for the system (SYS1.MASTER.CATALOG)
  User Catalogs: Catalogs for user datasets (pointed to by alias entries)

  Alias: A pointer in the master catalog that directs DSN high-level qualifiers to user catalogs.
  Example: All datasets starting with PROD.* go to CATALOG.PROD

  DEFINE ALIAS(NAME(PROD) RELATE(CATALOG.PROD))

LISTCAT — Your Diagnostic Tool:
  LISTCAT shows everything about a VSAM dataset:
  • RECORDS-TOTAL: Number of records
  • SPLITS-CI / SPLITS-CA: Split counts (high = needs reorg)
  • EXTENTS: Number of extents
  • FREESPACE: Current free space settings
  • FREESPACE-CI%: Actual CI utilization
  • REC-TOTAL / REC-DELETED / REC-INSERTED / REC-UPDATED / REC-RETRIEVED: Activity stats
  • SYSTEM-TIMESTAMP: Last update time

  Key metrics to monitor:
  • CI splits > 10% of records → increase CI FREESPACE
  • CA splits > 0 → increase CA FREESPACE or reorg
  • Extents approaching limit → reorg
  • EXCPS (I/Os) per operation → check buffering

SMS Integration:
  SMS (Storage Management Subsystem) automates VSAM management:
  • Data Class: Preset attributes (KEYS, RECORDSIZE, CISIZE, etc.)
  • Storage Class: Performance and availability tier
  • Management Class: Backup and migration policies
  • Storage Group: Which volumes to use

  With SMS, DEFINE CLUSTER becomes simpler:
  DEFINE CLUSTER(NAME(MY.FILE) DATACLAS(VSAMDC01) STORCLAS(FAST) MGMTCLAS(DAILY))

  ACS (Automatic Class Selection) routines assign classes based on dataset name patterns, job name, user ID, etc.`},{title:"VSAM Troubleshooting Guide",level:"Intermediate",content:`Common VSAM Problems & Solutions:

Problem 1: "VSAM OPEN ERROR"
  Usually File Status 35 or 39.
  35 = File not found: Check DD statement DSN, verify dataset exists (LISTCAT)
  39 = Attribute mismatch: Record format or key definition in program doesn't match the actual dataset. Check COBOL FD record length vs VSAM RECORDSIZE.
  Fix: Compare program FD with LISTCAT output for RECORDSIZE, KEYLEN, KEYPOSITION.

Problem 2: "DUPLICATE RECORD" (File Status 22)
  Attempting to WRITE a record with a key that already exists.
  Fix: READ first to check if record exists, then WRITE or REWRITE.

Problem 3: "RECORD NOT FOUND" (File Status 23)
  Key doesn't exist in the file.
  Fix: Handle INVALID KEY properly. Ensure key field is populated correctly. Check for spaces vs zeros in key.

Problem 4: CI/CA Splits causing slow performance
  Symptoms: Batch jobs running longer, CICS response times increasing.
  Diagnosis: LISTCAT ALL — check SPLITS-CI and SPLITS-CA
  Fix: Reorganize (REPRO out, DELETE, DEFINE with better FREESPACE, REPRO back)

Problem 5: "VSAM RESOURCE NOT AVAILABLE" (File Status 93)
  The file is in use exclusively by another job.
  Diagnosis: Check SHAREOPTIONS. Check if another job has DISP=OLD.
  Fix: Wait for the other job, or change SHAREOPTIONS if appropriate.

Problem 6: Out of space (File Status 24)
  Primary and all secondary extents exhausted.
  Fix: Reorganize with larger allocation. Check for runaway inserts.

Problem 7: "VERIFY needed" errors
  File was not closed properly (batch abend or CICS crash).
  Fix: Run IDCAMS VERIFY DATASET(MY.VSAM.FILE) before accessing.

Problem 8: Alternate Index out of sync
  AIX doesn't reflect recent base cluster changes.
  Diagnosis: Read through path returns wrong records or "not found."
  Fix: BLDINDEX to rebuild the AIX. Consider UPGRADE attribute.

Diagnostic Commands:
  LISTCAT ENTRIES(dsn) ALL — Full statistics and attributes
  PRINT INDATASET(dsn) CHARACTER COUNT(10) — View first 10 records
  EXAMINE INDATASET(dsn) INDEXTEST DATATEST — Check structural integrity
  VERIFY DATASET(dsn) — Reset end-of-file after abend`},{title:"VSAM Interview Questions",level:"All Levels",content:`VSAM Interview Questions — 30+ Q&A organized by level.

=== BEGINNER ===

Q: What is VSAM?
A: Virtual Storage Access Method — IBM's primary file access method on z/OS. Supports indexed, sequential, and relative record access.

Q: What are the VSAM dataset types?
A: KSDS (Key-Sequenced — indexed by key, most common), ESDS (Entry-Sequenced — append-only, like sequential), RRDS (Relative Record — by number), LDS (Linear — byte stream).

Q: What is a VSAM cluster?
A: A KSDS cluster has two components: DATA (actual records) and INDEX (B-tree for key lookup). Defined together via IDCAMS DEFINE CLUSTER.

Q: What is IDCAMS?
A: Access Method Services — the primary utility for VSAM. DEFINE, DELETE, ALTER, REPRO, PRINT, LISTCAT, VERIFY.

Q: What is an alternate index (AIX)?
A: Secondary index on a VSAM file. Allows access by a different key than the primary. Defined with DEFINE AIX, linked with DEFINE PATH.

Q: What is CI and CA?
A: CI (Control Interval) = smallest unit of I/O, like a block. CA (Control Area) = group of CIs. CI size affects performance.

=== INTERMEDIATE ===

Q: What is SHAREOPTIONS?
A: Controls multi-region/multi-system access. SHAREOPTIONS(2,3) = common. First number (cross-region): 1=exclusive, 2=read sharing, 3=multiple writers, 4=full sharing. Second (cross-system).

Q: What is FREESPACE?
A: FREESPACE(CI% CA%) — reserved space for future inserts. CI%=free space in each CI, CA%=free CIs in each CA. Reduces CI/CA splits on inserts.

Q: What is a CI split?
A: When a CI is full and a record needs inserting, VSAM splits the CI — moves half the records to a new CI. Causes performance degradation if frequent.

Q: Explain VSAM file status codes.
A: 00=OK, 10=EOF, 22=duplicate key, 23=not found, 35=file not found, 39=attribute mismatch, 97=OPEN failed. Always check after every I/O.

Q: What is VERIFY?
A: Resets the end-of-file marker after an abnormal close. VERIFY DATASET(name). Required when a program ABENDs with VSAM file open.

Q: What is REPRO?
A: Copies data between datasets. REPRO INFILE(dd) OUTFILE(dd) COUNT(n) SKIP(n). Works VSAM-to-VSAM, VSAM-to-sequential, and vice versa.

=== ADVANCED ===

Q: How do you improve VSAM performance?
A: Proper CI size (4K-32K), adequate FREESPACE, BUFFERSPACE/BUFND/BUFNI parameters, regular REORG to fix CA splits, use LSR (Local Shared Resources) buffering in CICS.

Q: What is VSAM RLS?
A: Record Level Sharing — allows multiple CICS regions to access same VSAM file with record-level locking via Coupling Facility. Requires CF structure.

💡 Study Tip: Know KSDS vs ESDS vs RRDS, CI splits, SHAREOPTIONS, and file status codes.`},{title:"VSAM Cheat Sheet",level:"All Levels",content:`VSAM Quick Reference — Cheat Sheet

═══ DATASET TYPES ═══
KSDS — Key-Sequenced (indexed, most common)
ESDS — Entry-Sequenced (append-only, sequential)
RRDS — Relative Record (by record number)
LDS  — Linear Dataset (byte-addressable)

═══ IDCAMS COMMANDS ═══
DEFINE CLUSTER (NAME(x) INDEXED KEYS(len off) RECSZ(avg max) SHROPT(2,3))
  DATA(CYLINDERS(pri sec) FREESPACE(ci% ca%) CISZ(size))
  INDEX(CYLINDERS(1 1))
DELETE name CLUSTER PURGE
REPRO INFILE(dd) OUTFILE(dd) COUNT(n)
PRINT INFILE(dd) CHARACTER COUNT(n)
LISTCAT ENT(name) ALL
VERIFY DATASET(name)
ALTER name FREESPACE(10 10)
DEFINE AIX (NAME(x) RELATE(cluster) KEYS(len off) UNIQUEKEY/NONUNIQUEKEY)
DEFINE PATH (NAME(x) PATHENTRY(aix))

═══ FILE STATUS CODES ═══
00 — OK           10 — EOF
22 — Duplicate key 23 — Not found
35 — File not found 39 — Attribute mismatch
97 — OPEN failed

═══ SHAREOPTIONS ═══
(1,x) — Single writer, no readers
(2,x) — Single writer, multiple readers
(3,x) — Multiple writers (integrity risk)
(4,x) — Full sharing via buffering`}]},wo={id:"db2",icon:"🏛️",title:"DB2",subtitle:"Relational Database for z/OS",color:"#0ea5e9",level:"Beginner → Expert",description:"IBM's crown jewel database. Petabytes of data. Millions of transactions per second. Zero downtime.",sections:[{title:"DB2 Architecture",level:"Beginner",content:`DB2 for z/OS is IBM's flagship relational database management system. It powers the most critical applications in banking, insurance, healthcare, and government — handling millions of transactions per second with legendary reliability.

DB2 Architecture — Major Components:

1. System Services:
   • Log Manager — Writes all changes to active logs for recovery
   • Buffer Manager — Manages buffer pools (data cached in memory)
   • Lock Manager (IRLM) — Controls concurrent access to data
   • Recovery Manager — Ensures data integrity after failures

2. Database Services:
   • Relational Data System (RDS) — SQL optimizer and executor
   • Data Manager — Reads/writes data pages from/to disk
   • Buffer Manager — Caches pages in buffer pools

3. Distributed Data Facility (DDF):
   • Handles distributed SQL (DRDA protocol)
   • Allows remote applications to access DB2 data
   • Enables DB2-to-DB2 and DB2-to-other-DBMS connections

DB2 Address Spaces:
  ssnmDBM1 — Database Services (main DB2 engine)
  ssnmMSTR — System Services (log, checkpoint, recovery)
  ssnmDIST — Distributed Data Facility
  IRLM     — Internal Resource Lock Manager
  (ssn = DB2 subsystem name, e.g., DB2P for production)

Storage Hierarchy:
  Database → Tablespace → Table → Page → Row
  Database → Indexspace → Index → Page → Entry

  Tablespace: Physical storage container for table data
  Indexspace: Physical storage for index entries
  Both stored as VSAM linear datasets (LDS)

Buffer Pools:
  BP0-BP49: 4K page buffer pools
  BP8K0-BP8K9: 8K page pools
  BP16K0-BP16K9: 16K page pools
  BP32K, BP32K1-BP32K9: 32K page pools

  Buffer pools are the PRIMARY performance lever in DB2.
  Data accessed from buffer pool = no disk I/O = fast.
  Data not in pool = physical read from disk = slow.

Logging:
  Active Log: Circular set of datasets for current changes
  Archive Log: Historical log datasets (on disk or tape)
  Every change is written to the log BEFORE the data page — Write-Ahead Logging.
  This guarantees recovery to any point in time.`},{title:"SQL Fundamentals — SELECT",level:"Beginner",code:`-- Basic SELECT
SELECT EMPNO, LASTNAME, SALARY
  FROM EMPLOYEE
  WHERE DEPT = 'D11'
  ORDER BY SALARY DESC;

-- Column aliases and expressions
SELECT EMPNO,
       LASTNAME || ', ' || FIRSTNME AS FULL_NAME,
       SALARY,
       SALARY * 12 AS ANNUAL_SALARY,
       SALARY * 0.20 AS TAX_ESTIMATE
  FROM EMPLOYEE
  WHERE SALARY > 50000;

-- BETWEEN, IN, LIKE
SELECT * FROM EMPLOYEE
  WHERE HIREDATE BETWEEN '2020-01-01' AND '2024-12-31'
    AND DEPT IN ('D11', 'D21', 'E01')
    AND LASTNAME LIKE 'SM%';

-- IS NULL check
SELECT EMPNO, LASTNAME, COMM
  FROM EMPLOYEE
  WHERE COMM IS NULL;

-- Aggregate functions
SELECT DEPT,
       COUNT(*) AS EMP_COUNT,
       AVG(SALARY) AS AVG_SAL,
       MAX(SALARY) AS MAX_SAL,
       MIN(SALARY) AS MIN_SAL,
       SUM(SALARY) AS TOTAL_SAL
  FROM EMPLOYEE
  GROUP BY DEPT
  HAVING COUNT(*) > 5
  ORDER BY AVG_SAL DESC;

-- CASE expression
SELECT EMPNO, LASTNAME, SALARY,
       CASE
         WHEN SALARY > 100000 THEN 'EXECUTIVE'
         WHEN SALARY > 70000  THEN 'SENIOR'
         WHEN SALARY > 40000  THEN 'MID-LEVEL'
         ELSE 'ENTRY-LEVEL'
       END AS SALARY_BAND
  FROM EMPLOYEE;

-- Scalar functions
SELECT EMPNO,
       UPPER(LASTNAME) AS NAME_UPPER,
       LENGTH(LASTNAME) AS NAME_LEN,
       SUBSTR(EMPNO, 1, 3) AS EMP_PREFIX,
       CHAR(SALARY, '999,999.99') AS SAL_FORMATTED,
       CURRENT DATE AS TODAY,
       DAYS(CURRENT DATE) - DAYS(HIREDATE) AS DAYS_EMPLOYED
  FROM EMPLOYEE;`,content:`SQL SELECT — Retrieving Data:

SELECT is the most used SQL statement. Master it thoroughly.

Clause Order:
  SELECT columns       — What to retrieve
  FROM tables          — Where to get it
  WHERE condition      — Filter rows
  GROUP BY columns     — Group for aggregation
  HAVING condition     — Filter groups (after GROUP BY)
  ORDER BY columns     — Sort results
  FETCH FIRST n ROWS ONLY — Limit rows returned

WHERE Operators:
  = , <> , < , > , <= , >=   — Comparison
  BETWEEN low AND high       — Range (inclusive)
  IN (val1, val2, val3)      — Set membership
  LIKE 'pattern'              — Pattern match (% = any, _ = single char)
  IS NULL / IS NOT NULL      — Null check
  EXISTS (subquery)          — Existence check
  AND, OR, NOT               — Logical operators

Aggregate Functions:
  COUNT(*) — Count all rows
  COUNT(column) — Count non-null values
  COUNT(DISTINCT column) — Count unique values
  SUM(column), AVG(column), MAX(column), MIN(column)

Important DB2 Specifics:
  • CURRENT DATE, CURRENT TIME, CURRENT TIMESTAMP — system values
  • DAYS(date) — converts date to integer (days since year 1)
  • CHAR(numeric, format) — format numbers as character
  • SUBSTR(string, start, length) — extract substring
  • COALESCE(col, default) — return first non-null value
  • NULLIF(expr1, expr2) — return null if equal
  • VALUE(col, default) — DB2 synonym for COALESCE`},{title:"SQL — JOINs & Subqueries",level:"Beginner",code:`-- INNER JOIN (only matching rows)
SELECT E.EMPNO, E.LASTNAME, D.DEPTNAME
  FROM EMPLOYEE E
  INNER JOIN DEPARTMENT D
    ON E.DEPT = D.DEPTNO;

-- LEFT OUTER JOIN (all employees, even without dept)
SELECT E.EMPNO, E.LASTNAME,
       COALESCE(D.DEPTNAME, 'UNASSIGNED') AS DEPT
  FROM EMPLOYEE E
  LEFT JOIN DEPARTMENT D
    ON E.DEPT = D.DEPTNO;

-- Multi-table JOIN
SELECT E.EMPNO, E.LASTNAME, D.DEPTNAME,
       P.PROJNAME, A.ACTDESC
  FROM EMPLOYEE E
  JOIN DEPARTMENT D ON E.DEPT = D.DEPTNO
  JOIN EMP_PROJECT EP ON E.EMPNO = EP.EMPNO
  JOIN PROJECT P ON EP.PROJNO = P.PROJNO
  JOIN ACTIVITY A ON EP.ACTNO = A.ACTNO
  WHERE D.DEPTNAME = 'PLANNING';

-- Correlated subquery
SELECT EMPNO, LASTNAME, SALARY, DEPT
  FROM EMPLOYEE E
  WHERE SALARY > (SELECT AVG(SALARY)
                    FROM EMPLOYEE
                    WHERE DEPT = E.DEPT);

-- EXISTS subquery
SELECT D.DEPTNO, D.DEPTNAME
  FROM DEPARTMENT D
  WHERE EXISTS (SELECT 1 FROM EMPLOYEE E
                  WHERE E.DEPT = D.DEPTNO
                    AND E.SALARY > 100000);

-- NOT EXISTS (departments with no employees)
SELECT D.DEPTNO, D.DEPTNAME
  FROM DEPARTMENT D
  WHERE NOT EXISTS (SELECT 1 FROM EMPLOYEE E
                      WHERE E.DEPT = D.DEPTNO);

-- Subquery in SELECT (scalar subquery)
SELECT EMPNO, LASTNAME, SALARY,
       (SELECT AVG(SALARY) FROM EMPLOYEE
          WHERE DEPT = E.DEPT) AS DEPT_AVG
  FROM EMPLOYEE E;

-- UNION (combine result sets)
SELECT EMPNO, LASTNAME, 'ACTIVE' AS STATUS
  FROM EMPLOYEE WHERE STATUS = 'A'
UNION ALL
SELECT EMPNO, LASTNAME, 'RETIRED' AS STATUS
  FROM RETIREES;`,content:`JOINs — Combining Tables:

INNER JOIN: Returns only rows that have matches in both tables.
LEFT OUTER JOIN: Returns all rows from left table, matched with right (NULLs for no match).
RIGHT OUTER JOIN: Returns all rows from right table.
FULL OUTER JOIN: Returns all rows from both tables.
CROSS JOIN: Cartesian product (every row × every row). Rarely used.

JOIN Performance Tips:
  • Always join on indexed columns
  • Use INNER JOIN when possible (more restrictive = faster)
  • Avoid joining on expressions or functions (prevents index use)
  • JOIN order matters — DB2 optimizer usually handles this, but awareness helps

Subqueries:
  Non-correlated: Executes once, result used for outer query
  Correlated: Executes once per row of outer query (can be slow)

  IN vs EXISTS:
  • Use EXISTS for correlated subqueries (often faster)
  • Use IN for small sets of values
  • NOT EXISTS is usually faster than NOT IN (NULL handling)

UNION vs UNION ALL:
  UNION: Removes duplicates (requires sort)
  UNION ALL: Keeps all rows (faster — no sort needed)
  Always use UNION ALL unless you specifically need deduplication.

Common Table Expressions (CTE):
  WITH dept_stats AS (
    SELECT DEPT, AVG(SALARY) AS AVG_SAL
      FROM EMPLOYEE GROUP BY DEPT
  )
  SELECT E.EMPNO, E.LASTNAME, E.SALARY, D.AVG_SAL
    FROM EMPLOYEE E
    JOIN dept_stats D ON E.DEPT = D.DEPT
    WHERE E.SALARY > D.AVG_SAL * 1.5;`},{title:"SQL — INSERT, UPDATE, DELETE",level:"Beginner",code:`-- INSERT single row
INSERT INTO EMPLOYEE
  (EMPNO, FIRSTNME, LASTNAME, DEPT, SALARY, HIREDATE)
  VALUES
  ('999001', 'JOHN', 'SMITH', 'D11', 55000.00, CURRENT DATE);

-- INSERT from SELECT
INSERT INTO EMPLOYEE_ARCHIVE
  SELECT * FROM EMPLOYEE
    WHERE HIREDATE < '2010-01-01';

-- UPDATE
UPDATE EMPLOYEE
   SET SALARY = SALARY * 1.05,
       BONUS = SALARY * 0.10
 WHERE DEPT = 'D11'
   AND SALARY < 60000;

-- UPDATE with subquery
UPDATE EMPLOYEE E
   SET SALARY = (SELECT AVG(SALARY) * 1.1
                   FROM EMPLOYEE
                   WHERE DEPT = E.DEPT)
 WHERE E.JOB = 'TRAINEE';

-- DELETE
DELETE FROM EMPLOYEE
 WHERE EMPNO = '999001';

-- DELETE with subquery
DELETE FROM EMPLOYEE
 WHERE DEPT IN (SELECT DEPTNO FROM DEPARTMENT
                  WHERE STATUS = 'CLOSED');

-- MERGE (UPSERT) — insert or update
MERGE INTO EMPLOYEE_TARGET T
USING EMPLOYEE_SOURCE S
ON T.EMPNO = S.EMPNO
WHEN MATCHED THEN
  UPDATE SET T.SALARY = S.SALARY,
             T.DEPT = S.DEPT
WHEN NOT MATCHED THEN
  INSERT (EMPNO, FIRSTNME, LASTNAME, DEPT, SALARY)
  VALUES (S.EMPNO, S.FIRSTNME, S.LASTNAME,
          S.DEPT, S.SALARY);`,content:`Data Modification Statements:

INSERT:
  Adds new rows to a table. Two forms:
  1. INSERT ... VALUES — single row with literal values
  2. INSERT ... SELECT — bulk insert from another table/query
  
  Important: The INSERT must satisfy all constraints (primary key uniqueness, foreign keys, check constraints, NOT NULL).

UPDATE:
  Modifies existing rows. Always use WHERE to avoid updating all rows.
  SET clause can reference other columns, expressions, and subqueries.
  
  ⚠️ UPDATE without WHERE updates EVERY ROW. Always double-check.

DELETE:
  Removes rows from a table. Always use WHERE.
  
  ⚠️ DELETE without WHERE deletes ALL ROWS. Be extremely careful.

MERGE (UPSERT):
  Combines INSERT and UPDATE in one statement.
  If the key matches: UPDATE the row
  If the key doesn't match: INSERT a new row
  Very efficient for ETL/batch processing.

Transaction Control:
  By default in DB2, changes are not committed until you issue COMMIT.
  COMMIT — Make all changes permanent
  ROLLBACK — Undo all changes since last COMMIT
  
  In COBOL: Changes are committed when program ends normally.
  In CICS: EXEC CICS SYNCPOINT commits.
  In SPUFI/QMF: AUTO COMMIT option controls behavior.

Concurrency:
  DB2 uses page-level or row-level locking during modifications.
  ISOLATION levels control how much concurrent access is allowed:
  • CS (Cursor Stability) — Lock only the row being processed (default)
  • RR (Repeatable Read) — Lock all rows accessed until COMMIT
  • UR (Uncommitted Read) — No locks, can see uncommitted changes
  • RS (Read Stability) — Lock qualifying rows until COMMIT`},{title:"DB2 Objects — Tables, Indexes, Views",level:"Intermediate",code:`-- Create database and tablespace
CREATE DATABASE EMPDB;

CREATE TABLESPACE EMPTS
  IN EMPDB
  USING STOGROUP SYSDEFLT
  PRIQTY 7200
  SECQTY 3600
  BUFFERPOOL BP1
  LOCKSIZE ROW
  CLOSE NO
  COMPRESS YES;

-- Create table
CREATE TABLE EMPLOYEE (
  EMPNO     CHAR(6)        NOT NULL,
  FIRSTNME  VARCHAR(30)    NOT NULL,
  LASTNAME  VARCHAR(30)    NOT NULL,
  DEPT      CHAR(3),
  JOB       CHAR(8),
  SALARY    DECIMAL(9,2)   NOT NULL WITH DEFAULT 0,
  BONUS     DECIMAL(9,2)   WITH DEFAULT 0,
  COMM      DECIMAL(9,2),
  HIREDATE  DATE           NOT NULL WITH DEFAULT,
  STATUS    CHAR(1)        NOT NULL WITH DEFAULT 'A',
  CONSTRAINT PK_EMP PRIMARY KEY (EMPNO),
  CONSTRAINT FK_DEPT FOREIGN KEY (DEPT)
    REFERENCES DEPARTMENT(DEPTNO)
    ON DELETE SET NULL,
  CONSTRAINT CK_SALARY CHECK (SALARY >= 0),
  CONSTRAINT CK_STATUS CHECK (STATUS IN ('A','I','T'))
) IN EMPDB.EMPTS;

-- Create indexes
CREATE UNIQUE INDEX IX_EMP_PK
  ON EMPLOYEE (EMPNO)
  USING STOGROUP SYSDEFLT
  BUFFERPOOL BP0
  CLOSE NO
  CLUSTER;

CREATE INDEX IX_EMP_DEPT
  ON EMPLOYEE (DEPT, SALARY DESC)
  BUFFERPOOL BP0;

CREATE INDEX IX_EMP_NAME
  ON EMPLOYEE (LASTNAME, FIRSTNME)
  INCLUDE (DEPT, SALARY);

-- Create view
CREATE VIEW ACTIVE_EMPLOYEES AS
  SELECT EMPNO, FIRSTNME, LASTNAME, DEPT, SALARY
    FROM EMPLOYEE
    WHERE STATUS = 'A'
  WITH CHECK OPTION;

-- Create alias
CREATE ALIAS PROD.EMPLOYEE
  FOR TEST.EMPLOYEE;`,content:`DB2 Objects Hierarchy:

Stogroup → Database → Tablespace → Table
                    → Indexspace → Index

Stogroup: Defines the DASD volumes where data is stored.
Database: Logical container for related tablespaces and indexspaces.
Tablespace: Physical container for table data (one or more VSAM LDS datasets).
  Simple: One table per tablespace (legacy)
  Segmented: Multiple tables, each in segments (legacy)
  Partition-by-Range (PBR): Data partitioned by key range (modern, preferred)
  Partition-by-Growth (PBG): Automatically adds partitions as data grows
  Universal (UTS): Modern tablespace type (PBR or PBG)

Table: Standard relational table with columns and rows.
  Columns: Typed fields (CHAR, VARCHAR, INTEGER, DECIMAL, DATE, etc.)
  Constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL

Index: B-tree structure for fast data lookup.
  UNIQUE: No duplicate key values allowed
  CLUSTER: Data stored in physical order of this index (huge for sequential performance)
  INCLUDE: Store extra columns in index leaf (index-only access — avoid table I/O)
  Partitioned: Each partition has its own index partition

View: Stored SQL query that behaves like a table.
  WITH CHECK OPTION: Prevents inserting/updating rows that don't satisfy the view's WHERE.
  Views can be used for: security (restrict columns), simplification, data transformation.

Alias: Alternate name for a table or view. Useful for:
  • Pointing test programs to test tables without code changes
  • Simplifying long table names

Data Types:
  CHAR(n) — Fixed-length character (1-255)
  VARCHAR(n) — Variable-length character (1-32704)
  INTEGER / SMALLINT / BIGINT — Whole numbers
  DECIMAL(p,s) — Packed decimal (precision, scale)
  DATE / TIME / TIMESTAMP — Date/time types
  CLOB(n) — Character Large Object (up to 2GB)
  BLOB(n) — Binary Large Object (up to 2GB)
  XML — Native XML storage`},{title:"Embedded SQL in COBOL",level:"Intermediate",code:`       WORKING-STORAGE SECTION.
      *
      * --- Host Variables (shared with DB2) ---
           EXEC SQL INCLUDE SQLCA END-EXEC.
      *
       01  HV-EMPNO              PIC X(06).
       01  HV-LASTNAME           PIC X(30).
       01  HV-SALARY             PIC S9(07)V99 COMP-3.
       01  HV-DEPT               PIC X(03).
       01  HV-IND-COMM           PIC S9(04) COMP.
       01  HV-COMM               PIC S9(07)V99 COMP-3.
      *
      * --- Cursor declaration ---
           EXEC SQL
             DECLARE EMP_CURSOR CURSOR FOR
               SELECT EMPNO, LASTNAME, SALARY
                 FROM EMPLOYEE
                WHERE DEPT = :HV-DEPT
                ORDER BY SALARY DESC
           END-EXEC.
      *
       PROCEDURE DIVISION.
      *
      * --- Single row SELECT INTO ---
           MOVE '000010' TO HV-EMPNO
           EXEC SQL
             SELECT LASTNAME, SALARY, COMM
               INTO :HV-LASTNAME,
                    :HV-SALARY,
                    :HV-COMM :HV-IND-COMM
               FROM EMPLOYEE
              WHERE EMPNO = :HV-EMPNO
           END-EXEC
           EVALUATE SQLCODE
             WHEN 0
               DISPLAY 'FOUND: ' HV-LASTNAME
               IF HV-IND-COMM < 0
                 DISPLAY 'COMMISSION IS NULL'
               END-IF
             WHEN 100
               DISPLAY 'NOT FOUND'
             WHEN OTHER
               DISPLAY 'SQL ERROR: ' SQLCODE
           END-EVALUATE
      *
      * --- Cursor processing (multiple rows) ---
           MOVE 'D11' TO HV-DEPT
           EXEC SQL OPEN EMP_CURSOR END-EXEC
      *
           PERFORM UNTIL SQLCODE NOT = 0
             EXEC SQL
               FETCH EMP_CURSOR
                 INTO :HV-EMPNO, :HV-LASTNAME, :HV-SALARY
             END-EXEC
             IF SQLCODE = 0
               DISPLAY HV-EMPNO ' ' HV-LASTNAME ' ' HV-SALARY
             END-IF
           END-PERFORM
      *
           EXEC SQL CLOSE EMP_CURSOR END-EXEC
      *
      * --- INSERT ---
           MOVE '999001' TO HV-EMPNO
           MOVE 'NEWGUY' TO HV-LASTNAME
           MOVE 50000.00 TO HV-SALARY
           EXEC SQL
             INSERT INTO EMPLOYEE (EMPNO, LASTNAME, SALARY)
               VALUES (:HV-EMPNO, :HV-LASTNAME, :HV-SALARY)
           END-EXEC
           IF SQLCODE = 0
             EXEC SQL COMMIT END-EXEC
           ELSE
             DISPLAY 'INSERT FAILED: ' SQLCODE
             EXEC SQL ROLLBACK END-EXEC
           END-IF.`,content:`Embedded SQL — COBOL Programs with DB2:

Most mainframe DB2 access comes from COBOL programs with embedded SQL. The SQL statements are mixed with COBOL code, delimited by EXEC SQL ... END-EXEC.

Host Variables:
  COBOL variables shared with DB2. Prefixed with : in SQL statements.
  Declared in WORKING-STORAGE just like regular COBOL variables.
  Must match DB2 column data types:
    CHAR/VARCHAR → PIC X(n)
    INTEGER      → PIC S9(9) COMP
    SMALLINT     → PIC S9(4) COMP
    DECIMAL(p,s) → PIC S9(p-s)V9(s) COMP-3
    DATE         → PIC X(10) (format: YYYY-MM-DD)

Indicator Variables:
  Detect NULL values. PIC S9(4) COMP.
  :HV-COMM :HV-IND-COMM — if IND < 0, the value is NULL
  Always use indicators for nullable columns!

SQLCA (SQL Communication Area):
  EXEC SQL INCLUDE SQLCA END-EXEC
  Contains return information after every SQL statement:
  • SQLCODE: 0 = success, 100 = not found, negative = error
  • SQLERRD(3): Number of rows affected by INSERT/UPDATE/DELETE
  • SQLWARN flags: Warning indicators

Critical SQLCODE Values:
  0     — Success
  100   — Row not found / End of cursor
  -180  — Invalid date/time/timestamp
  -204  — Object not found (table doesn't exist)
  -206  — Column not found
  -305  — Null value without indicator
  -803  — Duplicate key on INSERT
  -811  — More than one row for SELECT INTO
  -818  — Plan/program timestamp mismatch (needs rebind)
  -904  — Resource unavailable
  -911  — Deadlock or timeout (rollback occurred)
  -913  — Deadlock detected

Cursors:
  For multi-row result sets, use cursors:
  1. DECLARE — Define the SQL query
  2. OPEN — Execute the query, create result set
  3. FETCH — Retrieve one row at a time
  4. CLOSE — Release resources

  Cursor types:
  • Static: Read-only, can scroll
  • Dynamic: Updatable (FOR UPDATE OF column)
  • WITH HOLD: Keep open across COMMITs`},{title:"DB2 BIND & Application Program Lifecycle",level:"Intermediate",content:`The DB2 Application Lifecycle:

DB2 programs go through a unique build process because SQL statements must be processed by DB2 separately from the COBOL compiler.

1. PRECOMPILE (DB2 Precompiler — DSNHPC):
   • Scans COBOL source for EXEC SQL statements
   • Replaces SQL with COBOL CALL statements
   • Creates a DBRM (Database Request Module) containing the SQL
   • Creates modified COBOL source

2. COMPILE (COBOL Compiler — IGYCRCTL):
   • Compiles the modified COBOL source (no SQL — just CALL statements)
   • Creates an object module

3. LINK-EDIT (IEWBLINK):
   • Creates an executable load module
   • Links with DB2 runtime library (DSNELI)

4. BIND (DB2 BIND command):
   • Processes the DBRM (SQL statements)
   • DB2 optimizer creates an access path for each SQL statement
   • Creates a PACKAGE or PLAN
   • Access paths are stored in the DB2 catalog

   PLAN: A collection of packages. Programs run under a plan.
   PACKAGE: Access paths for one DBRM. Plans can include packages.

BIND Parameters:
  BIND PLAN(planname) — Create/replace a plan
  BIND PACKAGE(collection.packagename) — Create/replace a package
  ACTION(REPLACE) — Replace if exists, create if not
  ISOLATION(CS) — Cursor Stability (default)
  VALIDATE(BIND) — Validate SQL at BIND time
  ACQUIRE(USE) — Acquire locks when tables are accessed (not at allocation)
  RELEASE(COMMIT) — Release locks at COMMIT

When to REBIND:
  • After changing SQL in the program (new DBRM)
  • After creating/dropping indexes (access paths may change)
  • After RUNSTATS (updated statistics may improve access paths)
  • After DB2 version upgrade
  • Periodically, to pick up new statistics

FREE:
  FREE PLAN(planname) — Remove a plan
  FREE PACKAGE(collection.packagename) — Remove a package`,code:`//* ═══════════════════════════════════════════════════════
//* FULL DB2 COBOL BUILD: PRECOMPILE → COMPILE → LINK → BIND
//* ═══════════════════════════════════════════════════════
//DB2BUILD JOB ,'DB2 BUILD',CLASS=A,NOTIFY=&SYSUID
//*
//* STEP 1: DB2 PRECOMPILE
//PREC     EXEC PGM=DSNHPC,
//              PARM='HOST(IBMCOB),APOST,SOURCE,XREF'
//STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
//DBRMLIB  DD DSN=MY.DBRMLIB(PAYROLL),DISP=SHR
//SYSCIN   DD DSN=&&MODSRC,DISP=(NEW,PASS),
//            SPACE=(CYL,(5,5))
//SYSIN    DD DSN=MY.COBOL.SOURCE(PAYROLL),DISP=SHR
//SYSLIB   DD DSN=MY.COPYBOOK.LIB,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSUT1   DD UNIT=SYSDA,SPACE=(CYL,(2,2))
//SYSUT2   DD UNIT=SYSDA,SPACE=(CYL,(2,2))
//*
//* STEP 2: COBOL COMPILE
//COMP     EXEC PGM=IGYCRCTL,COND=(8,LT,PREC),
//              PARM='LIB,APOST,MAP,XREF,OFFSET'
//STEPLIB  DD DSN=IGY.SIGYCOMP,DISP=SHR
//SYSIN    DD DSN=&&MODSRC,DISP=(OLD,DELETE)
//SYSLIB   DD DSN=MY.COPYBOOK.LIB,DISP=SHR
//SYSLIN   DD DSN=&&OBJ,DISP=(NEW,PASS),
//            SPACE=(TRK,(10,10))
//SYSPRINT DD SYSOUT=*
//SYSUT1   DD UNIT=SYSDA,SPACE=(CYL,(1,1))
//SYSUT2   DD UNIT=SYSDA,SPACE=(CYL,(1,1))
//SYSUT3   DD UNIT=SYSDA,SPACE=(CYL,(1,1))
//SYSUT4   DD UNIT=SYSDA,SPACE=(CYL,(1,1))
//SYSUT5   DD UNIT=SYSDA,SPACE=(CYL,(1,1))
//SYSUT6   DD UNIT=SYSDA,SPACE=(CYL,(1,1))
//SYSUT7   DD UNIT=SYSDA,SPACE=(CYL,(1,1))
//*
//* STEP 3: LINK-EDIT
//LKED     EXEC PGM=IEWBLINK,COND=(8,LT,COMP),
//              PARM='LIST,MAP'
//SYSLIB   DD DSN=CEE.SCEELKED,DISP=SHR
//         DD DSN=DB2.SDSNLOAD,DISP=SHR
//SYSLIN   DD DSN=&&OBJ,DISP=(OLD,DELETE)
//         DD *
  INCLUDE SYSLIB(DSNELI)
/*
//SYSLMOD  DD DSN=MY.LOADLIB(PAYROLL),DISP=SHR
//SYSPRINT DD SYSOUT=*
//*
//* STEP 4: BIND PACKAGE
//BIND     EXEC PGM=IKJEFT01,COND=(4,LT,LKED)
//STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
//DBRMLIB  DD DSN=MY.DBRMLIB,DISP=SHR
//SYSTSPRT DD SYSOUT=*
//SYSTSIN  DD *
  DSN SYSTEM(DB2P)
  BIND PACKAGE(MYPKG) -
       MEMBER(PAYROLL) -
       ACTION(REPLACE) -
       ISOLATION(CS) -
       VALIDATE(BIND) -
       RELEASE(COMMIT)
  BIND PLAN(PAYPLAN) -
       PKLIST(MYPKG.*) -
       ACTION(REPLACE) -
       ISOLATION(CS)
  END
/*`},{title:"DB2 Access Tools — SPUFI & QMF",level:"Beginner",content:`Interactive SQL Tools:

SPUFI (SQL Processor Using File Input):
  Built into ISPF. Execute SQL statements interactively.
  
  How to use:
  1. Go to DB2I Primary Option Menu (usually ISPF option DB2)
  2. Select option 1 (SPUFI)
  3. Enter the input dataset (PDS member with your SQL)
  4. Enter the output dataset (where results go)
  5. Set parameters (auto-commit, max rows, etc.)
  6. Press Enter — SQL executes and results appear

  SPUFI is basic but always available. Good for:
  • Ad-hoc queries
  • DDL (CREATE, ALTER, DROP)
  • Quick data verification
  • Database administration tasks

QMF (Query Management Facility):
  More powerful interactive tool with formatting capabilities.
  
  Features:
  • Interactive query editing with prompts
  • Formatted reports (column headers, alignment, totals)
  • FORMS — Define report layouts
  • PROCS — Save and run query sequences
  • Export to PC formats
  
  QMF Commands:
  RUN QUERY — Execute the current query
  SAVE QUERY AS name — Save for reuse
  DISPLAY TABLE tablename — Quick browse
  PRINT REPORT — Print formatted output
  EXPORT DATA — Export results

DB2 Command Line (DSN):
  Batch access through IKJEFT01 utility:
  DSN SYSTEM(ssid)
  RUN PROGRAM(pgmname) PLAN(planname)
  END

  Used in JCL to run DB2 batch programs.

Other Tools:
  • Data Studio — IBM's modern graphical IDE
  • DSNTEP2 / DSNTEP4 — Batch SQL execution utilities
  • File Manager for DB2 — Browse/edit tables
  • BMC/CA products — Third-party management tools`},{title:"DB2 Performance & EXPLAIN",level:"Advanced",code:`-- Run EXPLAIN to see access path
EXPLAIN ALL SET QUERYNO = 1 FOR
  SELECT E.EMPNO, E.LASTNAME, D.DEPTNAME
    FROM EMPLOYEE E
    JOIN DEPARTMENT D ON E.DEPT = D.DEPTNO
   WHERE E.SALARY > 80000
   ORDER BY E.SALARY DESC;

-- Check PLAN_TABLE for access path
SELECT QUERYNO, QBLOCKNO, PLANNO,
       METHOD, TNAME, ACCESSTYPE,
       MATCHCOLS, ACCESSNAME,
       INDEXONLY, SORTC_GROUPBY,
       SORTC_ORDERBY, SORTN_JOIN
  FROM PLAN_TABLE
 WHERE QUERYNO = 1
 ORDER BY QUERYNO, QBLOCKNO, PLANNO;

-- RUNSTATS — Update optimizer statistics
//RUNSTAT  EXEC PGM=DSNUTILB,
//         PARM='DB2P,RUNSTATS'
//STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  RUNSTATS TABLESPACE EMPDB.EMPTS
    TABLE(EMPLOYEE)
    INDEX(ALL)
    SHRLEVEL REFERENCE
    UPDATE ALL
    REPORT YES
/*`,content:`DB2 Performance Tuning:

The DB2 Optimizer:
  DB2's cost-based optimizer chooses the most efficient way to execute each SQL statement. It considers: indexes available, table sizes, data distribution, buffer pool sizes, and more.

EXPLAIN:
  Shows the access path chosen by the optimizer. Critical for performance tuning.
  
  ACCESSTYPE values:
  I  — Index scan (best for selective queries)
  I1 — One-index scan  
  R  — Tablespace scan (reads every page — slow for large tables)
  M  — Multiple index scan
  N  — Index scan using IN-list
  MX — Index scan with OR optimization

  MATCHCOLS: Number of index columns used in the predicate match.
  Higher = more selective = better performance.

  INDEXONLY = Y: The query was answered entirely from the index
  without accessing the table data pages. This is the best case!

RUNSTATS:
  Updates the DB2 catalog with current table and index statistics.
  The optimizer uses these statistics to choose access paths.
  Run RUNSTATS after significant data changes, before REBIND.

  Key statistics collected:
  • CARDF — Number of rows in the table
  • NLEAF — Number of leaf pages in index
  • NLEVELS — Number of index levels
  • FULLKEYCARDF — Number of distinct key values
  • CLUSTERRATIOF — How well data is clustered (0-1, higher is better)
  • Column distribution statistics (COLCARDF, FREQ/QUANTILE stats)

Performance Checklist:
  1. Use appropriate indexes (most important)
  2. Write efficient SQL (avoid SELECT *, use WHERE)
  3. Run RUNSTATS regularly
  4. REBIND after RUNSTATS and index changes
  5. Size buffer pools adequately
  6. Use EXPLAIN to verify access paths
  7. Avoid Stage 2 predicates (non-indexable)
  8. Keep transactions short (reduce lock contention)
  9. Use appropriate ISOLATION level
  10. Monitor with DB2 PM / OMEGAMON`},{title:"DB2 Utilities",level:"Advanced",content:`DB2 Utilities — Database Administration:

DB2 provides powerful utilities for data management, maintenance, and recovery. Run through JCL using DSNUTILB.

LOAD:
  High-speed bulk data loading into DB2 tables.
  Much faster than INSERT for large volumes.
  Options: REPLACE (delete + load), RESUME (append), LOG NO (no logging for speed)
  
  LOAD DATA REPLACE INTO TABLE EMPLOYEE
    (EMPNO POSITION(1:6) CHAR,
     LASTNAME POSITION(7:36) CHAR,
     SALARY POSITION(37:45) DECIMAL EXTERNAL)

UNLOAD:
  Extract data from DB2 tables to sequential files.
  Faster than SELECT for full table extracts.
  
  UNLOAD DATA FROM TABLE EMPLOYEE
    SHRLEVEL REFERENCE

REORG:
  Reorganize tablespace or indexspace to reclaim space and restore clustering order.
  Essential for maintaining performance after many inserts/updates/deletes.
  
  REORG TABLESPACE EMPDB.EMPTS
    SHRLEVEL REFERENCE
    LOG NO
    SORTDATA YES
    SORTKEYS YES

CHECK DATA:
  Verify referential integrity between tables.
  CHECK DATA TABLESPACE EMPDB.EMPTS
    SCOPE ALL

CHECK INDEX:
  Verify index consistency with table data.
  CHECK INDEX(IX_EMP_PK) SHRLEVEL REFERENCE

COPY:
  Create image copy backups of tablespaces.
  COPY TABLESPACE EMPDB.EMPTS
    FULL YES SHRLEVEL REFERENCE

RECOVER:
  Restore tablespace from image copy + apply log.
  RECOVER TABLESPACE EMPDB.EMPTS
    TORBA X'00000000000C'
    TOLOGPOINT X'00000000F1A2'

MODIFY:
  Delete old entries from the DB2 catalog (SYSIBM.SYSCOPY).
  MODIFY RECOVERY TABLESPACE EMPDB.EMPTS
    DELETE AGE(30)

Utility Execution:
  All utilities run through DSNUTILB:
  //UTILSTEP EXEC PGM=DSNUTILB,PARM='DB2P,utilname'
  //STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
  //SYSPRINT DD SYSOUT=*
  //SYSIN    DD * (utility control statements)`},{title:"DB2 Locking & Concurrency",level:"Advanced",content:`DB2 Locking — Managing Concurrent Access:

DB2 uses a sophisticated locking mechanism to ensure data consistency when multiple applications access the same data simultaneously.

Lock Types:
  S (Share):     Read lock. Multiple share locks can coexist.
  U (Update):    Intent to update. Only one U lock allowed, but S locks can coexist.
  X (Exclusive): Write lock. No other locks allowed.
  IS/IX/SIX:     Intent locks at tablespace/table level.

Lock Granularity:
  Row Lock:   Locks individual rows (finest granularity)
  Page Lock:  Locks an entire 4K/8K/16K/32K page
  Table Lock: Locks an entire table
  Tablespace Lock: Locks the entire tablespace
  
  LOCKSIZE ROW (on tablespace) — Use row-level locking
  Finer granularity = more concurrency but more lock overhead

Lock Escalation:
  When too many row/page locks are held, DB2 escalates to table lock.
  This can cause unexpected contention.
  Threshold: LOCKMAX parameter on tablespace (or NUMLKTS system parameter)

Deadlocks:
  Transaction A locks Row 1, wants Row 2.
  Transaction B locks Row 2, wants Row 1.
  DB2 detects this and rolls back one transaction (SQLCODE -911).
  
  Prevention:
  • Access tables/rows in consistent order across programs
  • Keep transactions short
  • Use appropriate ISOLATION level
  • Avoid unnecessary UPDATE locks

Isolation Levels:
  CS (Cursor Stability): Default. Lock only current row. Minimal locking.
  RR (Repeatable Read): Lock all rows read until COMMIT. No phantom reads.
  RS (Read Stability): Lock qualifying rows. Middle ground.
  UR (Uncommitted Read): No locks for reads. Can see dirty data.
  
  Choose based on:
  • CS for most OLTP applications
  • RR for batch reporting needing consistency
  • UR for rough estimates where dirty reads are acceptable

Timeout:
  If a lock wait exceeds IRLMRWT (default ~30 seconds), the waiting transaction is rolled back with SQLCODE -913.

Lock Avoidance:
  DB2 uses techniques to avoid unnecessary locking:
  • Uncommitted read can avoid locks entirely
  • Lock avoidance through CLSN (Commit Log Sequence Number)
  • Optimistic locking patterns in application design`},{title:"DB2 Data Sharing & Sysplex",level:"Expert",content:`DB2 Data Sharing — Multiple DB2 Members Accessing Same Data:

In a Parallel Sysplex environment, multiple DB2 subsystems (members) can access the same database simultaneously. This provides:
  • Scalability: Add members to handle more workload
  • Availability: If one member fails, others continue
  • Workload balancing: Distribute work across members

Data Sharing Architecture:
  Coupling Facility (CF):
    Specialized hardware that provides:
    • Group Buffer Pool (GBP): Shared cache across members
    • Lock Structure: Shared locking across members
    • SCA (Shared Communications Area): Metadata coordination

  Each member has:
  • Its own buffer pool (local)
  • Access to Group Buffer Pools in CF
  • Connection to IRLM for cross-member locking

How Cross-Member Access Works:
  1. Member A updates a row (lock + local buffer + log)
  2. Member A writes changed page to GBP (so other members can see it)
  3. Member B reads the same row — checks GBP first, then disk
  4. CF lock manager coordinates so only one member updates at a time

Data Sharing Groups:
  DB2 members organized into groups. All members share:
  • Same catalog (SYSIBM tables)
  • Same data (tablespaces, indexspaces)
  • Same log (each member has own log, but recovery coordinates across group)

Benefits:
  • Near-continuous availability (planned maintenance without outage)
  • Linear scalability (add members for more throughput)
  • Workload isolation (different members for different workloads)
  • Disaster recovery (combined with GDPS)

Monitoring Data Sharing:
  • CF structure activity (GBP hit ratios)
  • Cross-invalidation (XI) rates
  • Lock contention between members
  • Inter-DB2 read/write activity`},{title:"DB2 Interview Questions",level:"All Levels",content:`DB2 Interview Questions — 40+ Q&A organized by level.

=== BEGINNER ===

Q: What is DB2?
A: IBM's relational database management system for z/OS. Stores data in tables with rows/columns. Accessed via SQL.

Q: What is SQL?
A: Structured Query Language — standard language for relational databases. SELECT, INSERT, UPDATE, DELETE for data manipulation. CREATE, ALTER, DROP for structure.

Q: What is a tablespace?
A: Physical storage for DB2 tables. Types: Simple (multiple tables), Segmented (one table per segment), Partitioned (large tables split by key range), Universal (modern default).

Q: What is a PLAN and PACKAGE?
A: PLAN = collection of packages bound together, represents application's DB2 access. PACKAGE = compiled SQL from one program. BIND creates plans/packages from DBRMs.

Q: What is SQLCODE?
A: Return code from DB2. 0=success, 100=not found/end of data, negative=error. -805=plan not found, -811=multiple rows, -904=resource unavailable.

Q: What is a primary key?
A: Unique identifier for each row. Cannot be NULL. Automatically creates a unique index.

Q: What is a foreign key?
A: Column referencing another table's primary key. Enforces referential integrity — child row can't exist without parent.

Q: What is an index?
A: B-tree structure for fast data retrieval. CREATE INDEX name ON table(col). Speeds up WHERE, JOIN, ORDER BY. Trade-off: faster reads, slower inserts.

=== INTERMEDIATE ===

Q: Difference between INNER JOIN and LEFT JOIN?
A: INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from left table plus matching rows from right (NULLs for no match).

Q: What is a cursor?
A: Mechanism to process multiple rows one at a time. DECLARE → OPEN → FETCH (loop) → CLOSE. WITH HOLD keeps cursor open across COMMITs.

Q: Explain ISOLATION levels.
A: CS (Cursor Stability) — lock current row only (default). RR (Repeatable Read) — lock all accessed rows. UR (Uncommitted Read) — no locks, read dirty data. RS (Read Stability) — lock qualifying rows.

Q: What is EXPLAIN?
A: Analyzes SQL access paths. Populates PLAN_TABLE with access method, index usage, sort needs. Essential for performance tuning.

Q: What is RUNSTATS?
A: Updates DB2 catalog statistics about table data distribution. Run after major data changes. Without current stats, DB2 optimizer makes poor access path choices.

Q: What is REORG?
A: Reorganizes tablespace/index to reclaim space, restore clustering order, and improve performance. Run after heavy INSERT/DELETE activity.

Q: What is a DBRM?
A: Database Request Module — compiled SQL extracted from program by DB2 precompiler. Input to the BIND process.

Q: Explain COMMIT and ROLLBACK.
A: COMMIT saves all changes since last commit. ROLLBACK undoes all changes. DB2 uses logging for recovery. Frequent COMMITs reduce lock contention and log usage.

Q: What are NULL values?
A: Represents unknown/missing data. Not the same as zero or spaces. Use IS NULL / IS NOT NULL to test. Indicator variables in COBOL handle NULLs.

Q: What is a stored procedure?
A: Program stored in DB2, callable via CALL statement. Can contain SQL and procedural logic. Reduces network traffic for complex operations.

=== ADVANCED ===

Q: What causes -811 SQLCODE?
A: SELECT INTO returned more than one row. Fix: Add more WHERE conditions, or use a CURSOR.

Q: What is DB2 lock escalation?
A: When too many page/row locks exist, DB2 escalates to table lock. Causes concurrency issues. Fix: COMMIT frequently, optimize SQL to touch fewer rows, use LOCKSIZE ROW.

Q: How do you tune a slow DB2 query?
A: Run EXPLAIN to check access path. Ensure RUNSTATS is current. Add/modify indexes. Rewrite SQL (avoid functions on indexed columns, avoid SELECT *). Check for lock contention.

Q: What is dynamic SQL vs static SQL?
A: Static: SQL known at compile time, bound into package (faster, more secure). Dynamic: SQL built at runtime via PREPARE/EXECUTE (flexible, but overhead for each execution).

Q: Explain DB2 utilities.
A: LOAD (bulk insert), UNLOAD (bulk extract), REORG (reorganize), RUNSTATS (update stats), COPY (backup), RECOVER (restore), CHECK (integrity check).

💡 Study Tip: Know SQLCODE values, ISOLATION levels, EXPLAIN, and CURSOR processing — core DB2 interview topics.`},{title:"DB2 Cheat Sheet",level:"All Levels",content:`DB2 Quick Reference — Cheat Sheet

═══ SQL DML ═══
SELECT col FROM table WHERE condition ORDER BY col
INSERT INTO table (cols) VALUES (vals)
UPDATE table SET col=val WHERE condition
DELETE FROM table WHERE condition

═══ JOIN TYPES ═══
INNER JOIN — Matching rows only
LEFT JOIN — All left + matching right
RIGHT JOIN — All right + matching left
FULL OUTER JOIN — All rows from both

═══ KEY SQLCODES ═══
0     — Success        100   — Not found
-803  — Duplicate key   -805  — Plan not found
-811  — Multiple rows   -818  — Timestamp mismatch
-904  — Resource unavail -911  — Deadlock/timeout
-180  — Invalid date    -305  — NULL indicator needed

═══ CURSOR PATTERN ═══
EXEC SQL DECLARE cur CURSOR FOR SELECT ... END-EXEC
EXEC SQL OPEN cur END-EXEC
PERFORM UNTIL SQLCODE = 100
  EXEC SQL FETCH cur INTO :vars END-EXEC
END-PERFORM
EXEC SQL CLOSE cur END-EXEC

═══ ISOLATION LEVELS ═══
UR — Uncommitted Read (dirty reads)
CS — Cursor Stability (default)
RS — Read Stability
RR — Repeatable Read (most restrictive)

═══ UTILITIES ═══
BIND — Create plan/package from DBRM
RUNSTATS — Update catalog statistics
REORG — Reorganize tablespace/index
COPY/RECOVER — Backup/restore
LOAD/UNLOAD — Bulk data operations`}]},Yo={id:"cics",icon:"🔄",title:"CICS",subtitle:"Customer Information Control System",color:"#eab308",level:"Beginner → Expert",description:"The world's most powerful transaction processing engine. 30 billion transactions daily. Every bank uses it.",sections:[{title:"Introduction to CICS",level:"Beginner",content:`CICS (Customer Information Control System) is IBM's enterprise transaction processing monitor for z/OS. It processes an estimated 30+ billion transactions per day worldwide — handling everything from ATM withdrawals to airline bookings.

What CICS Does:
  CICS provides the runtime environment for online (interactive) applications. While JCL/batch processes jobs in the background, CICS handles real-time user interactions — screens, inquiries, updates, and data entry.

Key Concepts:
  • Transaction: A unit of work initiated by a user or system (e.g., "withdraw $100")
  • Task: A CICS execution unit processing a transaction
  • Program: The COBOL/Assembler/Java code that runs within a task
  • Terminal: The user interface (3270 screen, web browser, API client)
  • Region: A CICS address space (one instance of CICS)

CICS Architecture:
  CICS runs as a z/OS started task (address space). Inside this single address space, hundreds or thousands of tasks run concurrently, sharing resources efficiently.

  Key CICS Components:
  • Terminal Control (TC): Manages terminal I/O and network connections
  • Task Control (KC): Manages concurrent task execution
  • Program Control (PC): Loads and manages application programs
  • File Control (FC): Manages VSAM and other file access
  • Storage Control (SC): Manages dynamic storage allocation
  • Transient Data (TD): Queue-based message passing
  • Temporary Storage (TS): Scratch pad storage for transactions
  • Interval Control (IC): Timer services and task scheduling

Why CICS Matters:
  • Processes more transactions than any other system
  • Provides ACID transaction properties (Atomicity, Consistency, Isolation, Durability)
  • Handles thousands of concurrent users in a single region
  • Integrates with DB2, MQ, VSAM, IMS, and web services
  • Near-zero downtime — available 24/7/365

CICS Regions and CICSplex:
  Production environments typically have multiple CICS regions:
  • TOR (Terminal-Owning Region): Handles user connections
  • AOR (Application-Owning Region): Runs business logic
  • FOR (File-Owning Region): Manages VSAM files
  • DOR (Data-Owning Region): Manages DB2 connections
  • WUI (Web User Interface): Browser-based management

  CICSplex: A group of CICS regions managed as a single entity.
  CICSPlex SM (System Manager): Central management tool.`},{title:"CICS Commands — EXEC CICS",level:"Beginner",content:`EXEC CICS Commands — The CICS API:

All CICS services are accessed through EXEC CICS commands embedded in your COBOL program. These are similar to embedded SQL but for CICS services.

Syntax: EXEC CICS command option(value) ... END-EXEC

Program Control:
  EXEC CICS LINK PROGRAM('SUBPROG') COMMAREA(WS-DATA) LENGTH(100) END-EXEC
  EXEC CICS XCTL PROGRAM('NEXTPROG') COMMAREA(WS-DATA) LENGTH(100) END-EXEC
  EXEC CICS RETURN END-EXEC
  EXEC CICS RETURN TRANSID('MENU') COMMAREA(WS-DATA) LENGTH(100) END-EXEC

  LINK: Call a subprogram and return here (like COBOL CALL)
  XCTL: Transfer control to another program (no return)
  RETURN: End the task. TRANSID specifies next transaction.

File Control (VSAM):
  EXEC CICS READ FILE('CUSTMAST') INTO(WS-REC) RIDFLD(WS-KEY) END-EXEC
  EXEC CICS READ FILE('CUSTMAST') INTO(WS-REC) RIDFLD(WS-KEY) UPDATE END-EXEC
  EXEC CICS WRITE FILE('CUSTMAST') FROM(WS-REC) RIDFLD(WS-KEY) END-EXEC
  EXEC CICS REWRITE FILE('CUSTMAST') FROM(WS-REC) END-EXEC
  EXEC CICS DELETE FILE('CUSTMAST') RIDFLD(WS-KEY) END-EXEC
  EXEC CICS STARTBR FILE('CUSTMAST') RIDFLD(WS-KEY) END-EXEC
  EXEC CICS READNEXT FILE('CUSTMAST') INTO(WS-REC) RIDFLD(WS-KEY) END-EXEC
  EXEC CICS ENDBR FILE('CUSTMAST') END-EXEC

Temporary Storage (TS):
  EXEC CICS WRITEQ TS QUEUE('MYQUEUE') FROM(WS-DATA) LENGTH(100) END-EXEC
  EXEC CICS READQ TS QUEUE('MYQUEUE') INTO(WS-DATA) ITEM(1) END-EXEC
  EXEC CICS DELETEQ TS QUEUE('MYQUEUE') END-EXEC

Transient Data (TD):
  EXEC CICS WRITEQ TD QUEUE('MSGL') FROM(WS-MSG) LENGTH(80) END-EXEC
  EXEC CICS READQ TD QUEUE('MSGL') INTO(WS-MSG) LENGTH(WS-LEN) END-EXEC

Interval Control:
  EXEC CICS START TRANSID('BKUP') INTERVAL(10000) END-EXEC
  EXEC CICS DELAY INTERVAL(5) END-EXEC
  EXEC CICS ASKTIME ABSTIME(WS-ABS) END-EXEC
  EXEC CICS FORMATTIME ABSTIME(WS-ABS) DATESEP('/') YYYYMMDD(WS-DATE) TIME(WS-TIME) END-EXEC`},{title:"BMS Maps — Screen Design",level:"Beginner",content:`BMS (Basic Mapping Support) — 3270 Screen Design:

BMS is CICS's screen mapping system. It separates the physical screen layout from the program logic, similar to how HTML separates layout from JavaScript.

Components:
  Physical Map: Compiled map loaded into CICS (screen layout)
  Symbolic Map: COBOL copybook generated from map definition
  The map definition (BMS macro source) produces both.

Key BMS Concepts:
  MAPSET: A collection of related maps
  MAP: One screen layout
  FIELD: An individual input/output area on the screen

Field Attributes:
  ASKIP — Protected, skip cursor past this field (labels)
  PROT — Protected (output only, cursor stops)
  UNPROT — Unprotected (user can type here — input)
  NUM — Numeric only input
  BRT — Bright (highlighted)
  DRK — Dark (hidden, e.g., passwords)
  IC — Initial Cursor position
  FSET — Modified Data Tag on (field always sent to program)

Sending and Receiving Maps:
  EXEC CICS SEND MAP('CUSTMAP') MAPSET('CUSTSET') FROM(CUSTMAPO) ERASE END-EXEC
  EXEC CICS RECEIVE MAP('CUSTMAP') MAPSET('CUSTSET') INTO(CUSTMAPI) END-EXEC

  SEND MAP: Display a screen to the user
    ERASE: Clear screen first
    ERASEAUP: Clear unprotected fields only
    CURSOR(position): Set cursor position
    DATAONLY: Send only data, not field attributes (faster refresh)
    MAPONLY: Send only map layout, no data

  RECEIVE MAP: Read what the user typed
    INTO: Target data area (symbolic map input area)

Symbolic Map Layout:
  The COBOL copybook has two structures:
  xxxMAPO (output) — Fields you send TO the screen
  xxxMAPI (input) — Fields you receive FROM the screen
  Each field has: length (L), attribute (A), color (C), and data (D/I/O) subfields.`,code:`* BMS MAP DEFINITION EXAMPLE
CUSTSET  DFHMSD TYPE=&SYSPARM,                        X
               LANG=COBOL,                              X
               MODE=INOUT,                              X
               CTRL=FREEKB,                             X
               STORAGE=AUTO
*
CUSTMAP  DFHMDI SIZE=(24,80),                          X
               LINE=1,                                  X
               COLUMN=1
*
         DFHMDF POS=(1,25),                            X
               LENGTH=30,                               X
               ATTRB=(ASKIP,BRT),                       X
               INITIAL='CUSTOMER INQUIRY SYSTEM'
*
         DFHMDF POS=(3,2),                             X
               LENGTH=12,                               X
               ATTRB=ASKIP,                             X
               INITIAL='CUSTOMER ID:'
CUSTID   DFHMDF POS=(3,15),                            X
               LENGTH=10,                               X
               ATTRB=(UNPROT,IC,FSET),                  X
               INITIAL=' '
         DFHMDF POS=(3,26),LENGTH=1,ATTRB=ASKIP
*
         DFHMDF POS=(5,2),LENGTH=5,ATTRB=ASKIP,        X
               INITIAL='NAME:'
CUSTNM   DFHMDF POS=(5,8),                             X
               LENGTH=30,                               X
               ATTRB=PROT
*
         DFHMDF POS=(7,2),LENGTH=8,ATTRB=ASKIP,        X
               INITIAL='ADDRESS:'
CUSTAD   DFHMDF POS=(7,11),                            X
               LENGTH=50,                               X
               ATTRB=PROT
*
         DFHMDF POS=(9,2),LENGTH=8,ATTRB=ASKIP,        X
               INITIAL='BALANCE:'
CUSTBL   DFHMDF POS=(9,11),                            X
               LENGTH=12,                               X
               ATTRB=PROT
*
MSGFLD   DFHMDF POS=(22,2),                            X
               LENGTH=70,                               X
               ATTRB=(ASKIP,BRT)
*
         DFHMDF POS=(24,2),                            X
               LENGTH=40,                               X
               ATTRB=ASKIP,                             X
               INITIAL='PF3=EXIT  ENTER=SEARCH'
*
         DFHMSD TYPE=FINAL
         END`},{title:"Complete CICS COBOL Program",level:"Intermediate",code:`       IDENTIFICATION DIVISION.
       PROGRAM-ID. CUSTINQ.
      *
       DATA DIVISION.
       WORKING-STORAGE SECTION.
      *
       01  WS-COMMAREA.
           05 WS-COMM-CUSTID     PIC X(10).
           05 WS-COMM-FLAG       PIC X(01).
      *
       01  WS-CUSTOMER-REC.
           05 WS-CUST-ID         PIC X(10).
           05 WS-CUST-NAME       PIC X(30).
           05 WS-CUST-ADDR       PIC X(50).
           05 WS-CUST-BAL        PIC S9(09)V99 COMP-3.
      *
       01  WS-RESP               PIC S9(08) COMP.
       01  WS-RESP2              PIC S9(08) COMP.
      *
           COPY CUSTSET.
      *
       LINKAGE SECTION.
       01  DFHCOMMAREA           PIC X(11).
      *
       PROCEDURE DIVISION.
      *
           EVALUATE TRUE
             WHEN EIBCALEN = 0
               PERFORM 1000-FIRST-TIME
             WHEN EIBAID = DFHPF3
               PERFORM 9000-RETURN-CICS
             WHEN EIBAID = DFHENTER
               PERFORM 2000-PROCESS-MAP
             WHEN OTHER
               PERFORM 3000-SEND-MAP
           END-EVALUATE
           EXEC CICS RETURN
             TRANSID('CINQ')
             COMMAREA(WS-COMMAREA)
             LENGTH(11)
           END-EXEC.
      *
       1000-FIRST-TIME.
           MOVE LOW-VALUES TO CUSTMAPO
           MOVE 'ENTER CUSTOMER ID AND PRESS ENTER'
             TO MSGFLDO
           EXEC CICS SEND MAP('CUSTMAP')
             MAPSET('CUSTSET')
             FROM(CUSTMAPO)
             ERASE
           END-EXEC.
      *
       2000-PROCESS-MAP.
           EXEC CICS RECEIVE MAP('CUSTMAP')
             MAPSET('CUSTSET')
             INTO(CUSTMAPI)
           END-EXEC
      *    Read customer file
           MOVE CUSTIDI TO WS-CUST-ID
           EXEC CICS READ FILE('CUSTMAST')
             INTO(WS-CUSTOMER-REC)
             RIDFLD(WS-CUST-ID)
             RESP(WS-RESP)
             RESP2(WS-RESP2)
           END-EXEC
      *
           EVALUATE WS-RESP
             WHEN DFHRESP(NORMAL)
               MOVE WS-CUST-NAME TO CUSTNMO
               MOVE WS-CUST-ADDR TO CUSTADO
               MOVE WS-CUST-BAL  TO CUSTBLO
               MOVE 'CUSTOMER FOUND' TO MSGFLDO
             WHEN DFHRESP(NOTFND)
               MOVE LOW-VALUES TO CUSTMAPO
               MOVE 'CUSTOMER NOT FOUND' TO MSGFLDO
             WHEN OTHER
               MOVE LOW-VALUES TO CUSTMAPO
               STRING 'FILE ERROR: RESP=' WS-RESP
                 ' RESP2=' WS-RESP2
                 DELIMITED BY SIZE INTO MSGFLDO
           END-EVALUATE
      *
           EXEC CICS SEND MAP('CUSTMAP')
             MAPSET('CUSTSET')
             FROM(CUSTMAPO)
             DATAONLY
           END-EXEC.
      *
       3000-SEND-MAP.
           MOVE LOW-VALUES TO CUSTMAPO
           MOVE 'INVALID KEY - USE ENTER OR PF3'
             TO MSGFLDO
           EXEC CICS SEND MAP('CUSTMAP')
             MAPSET('CUSTSET')
             FROM(CUSTMAPO)
             DATAONLY
           END-EXEC.
      *
       9000-RETURN-CICS.
           EXEC CICS SEND TEXT
             FROM('SESSION ENDED')
             ERASE
           END-EXEC
           EXEC CICS RETURN END-EXEC.`,content:`Anatomy of a CICS COBOL Program:

This example shows a complete Customer Inquiry program with all the essential patterns.

Key Concepts Demonstrated:

1. COMMAREA (Communication Area):
   Passes data between pseudo-conversational transactions.
   CICS does NOT keep your program in memory between screens!
   The COMMAREA is the ONLY way to preserve state.

2. Pseudo-Conversational Design:
   The program does NOT wait for user input.
   Instead: Send screen → RETURN with TRANSID → User types → CICS starts NEW task
   This frees CICS resources while the user is reading/typing.

3. EIBCALEN:
   Length of incoming COMMAREA.
   EIBCALEN = 0 means this is the first time (no previous COMMAREA).
   Use this to detect first invocation vs. subsequent interactions.

4. EIBAID:
   The AID (Attention Identifier) key the user pressed.
   DFHENTER = Enter key
   DFHPF3 = PF3 key
   DFHCLEAR = Clear key

5. RESP/RESP2:
   Error handling. RESP returns the response code.
   DFHRESP(NORMAL) = success
   DFHRESP(NOTFND) = record not found
   Always check RESP — never assume success!

6. DATAONLY vs ERASE:
   ERASE: Clear screen and send complete map (first time)
   DATAONLY: Send only data fields (faster, for updates)`},{title:"CICS Error Handling & ABEND Codes",level:"Intermediate",content:`CICS Error Handling:

Two Approaches:

1. HANDLE CONDITION (Legacy — avoid in new code):
   EXEC CICS HANDLE CONDITION
     NOTFND(NOT-FOUND-PARA)
     ERROR(ERROR-PARA)
   END-EXEC
   
   Problems: Creates GO TO-like flow, hard to maintain.

2. RESP/RESP2 (Modern — recommended):
   EXEC CICS READ FILE('CUSTMAST')
     INTO(WS-REC) RIDFLD(WS-KEY)
     RESP(WS-RESP) RESP2(WS-RESP2)
   END-EXEC
   IF WS-RESP NOT = DFHRESP(NORMAL)
     PERFORM ERROR-HANDLING
   END-IF

Common CICS ABEND Codes:

  AEI0 — PROGRAM NOT FOUND
    The program specified in LINK/XCTL doesn't exist.
    Fix: Check program name, verify it's installed.

  AEI9 — MAPFAIL
    RECEIVE MAP failed — user pressed Clear or didn't type anything.
    Fix: Handle MAPFAIL condition.

  AEIA — INVREQ (Invalid Request)
    Generic error — invalid operation for the resource state.
    Fix: Check RESP2 for specific reason.

  AEIK — LENGERR (Length Error)
    Data area too small for the received data.
    Fix: Increase INTO area size, or use SET for variable-length.

  AEIO — ITEMERR (Item Error)
    TS queue item number out of range.
    Fix: Check item number is within NUMITEMS.

  AEYH — NOSPACE
    No space on TS queue or file.
    Fix: Clean up TS queues, increase file allocation.

  AEY7 — NOTAUTH
    Not authorized to access the resource.
    Fix: Check RACF/security permissions.

  ASRA — Program Check (0C1, 0C4, 0C7 etc.)
    Application logic error — same as batch abends.
    Fix: Check COBOL code for logic errors.

  AICA — Runaway Task
    Task exceeded time limit (ICVR parameter).
    Fix: Find infinite loop in program.

  AKCS — CICS catalog corruption
    Fix: Cold start CICS or restore catalog.`},{title:"Pseudo-Conversational vs Conversational",level:"Intermediate",content:`CICS Transaction Design Patterns:

Conversational (DO NOT USE in production):
  The program sends a screen, then WAITS for the user to respond.
  The task remains active (consuming CICS resources) while the user thinks.
  
  Problem: If 1000 users are reading screens, 1000 tasks sit idle.
  This wastes memory, storage, and CICS capacity.

Pseudo-Conversational (ALWAYS USE):
  The program sends a screen, then ENDS the task.
  When the user presses Enter, CICS starts a NEW task.
  State is preserved via COMMAREA.

  Flow:
  1. User enters transaction (e.g., CINQ)
  2. CICS starts task → Program sends screen → RETURN TRANSID('CINQ') COMMAREA(data)
  3. Task ends. CICS resources freed.
  4. User reads screen, types data, presses Enter
  5. CICS starts NEW task → Program receives COMMAREA → processes input → sends new screen → RETURN
  6. Repeat...

  Benefits:
  • 100x more efficient than conversational
  • Handles thousands of concurrent users
  • Essential for production CICS applications

State Management:
  Since each interaction is a new task, you must save state:
  
  1. COMMAREA (up to 32K): Primary method
     Data passed between pseudo-conversational transactions.
     Contains: which screen, key values, mode (add/update/inquiry), flags.

  2. Temporary Storage (TS) Queues:
     For larger data (>32K) or multi-screen data.
     WRITEQ TS / READQ TS / DELETEQ TS
     Use unique queue names (include terminal ID): WS-QNM = 'CQ' || EIBTRMID

  3. CICS Channels & Containers (modern):
     EXEC CICS PUT CONTAINER('CUSTDATA') CHANNEL('MYCHAN') FROM(WS-DATA)
     EXEC CICS GET CONTAINER('CUSTDATA') CHANNEL('MYCHAN') INTO(WS-DATA)
     No 32K limit. More structured than COMMAREA.`},{title:"CICS Resource Definitions",level:"Intermediate",content:`CICS Resource Definitions — CSD (CICS System Definition):

Every resource CICS uses must be defined. Definitions are stored in the CSD (CICS System Definition file) and loaded into CICS at startup or dynamically.

CEDA — Define resources online:
  CEDA DEFINE PROGRAM(CUSTINQ) GROUP(MYGROUP)
    LANGUAGE(COBOL) DATALOCATION(ANY)
  CEDA INSTALL GROUP(MYGROUP)

Key Resource Types:

PROGRAM:
  Defines an application program.
  DEFINE PROGRAM(name) GROUP(grp)
    LANGUAGE(COBOL|ASSEMBLER|LE370|JAVA)
    DATALOCATION(ANY|BELOW)
    EXECKEY(USER|CICS)
    CONCURRENCY(QUASIRENT|THREADSAFE)

TRANSACTION:
  Defines a transaction code (4-char ID users type).
  DEFINE TRANSACTION(CINQ) GROUP(grp)
    PROGRAM(CUSTINQ)           — initial program
    PROFILE(DFHCICST)          — terminal profile
    TASKDATALOC(ANY)
    PRIORITY(1)

MAPSET:
  Defines a BMS map set.
  DEFINE MAPSET(CUSTSET) GROUP(grp)
    RESIDENT(NO)

FILE:
  Defines a VSAM file for CICS.
  DEFINE FILE(CUSTMAST) GROUP(grp)
    DSNAME(PROD.CUSTOMER.MASTER)
    ADD(YES) BROWSE(YES) DELETE(YES) READ(YES) UPDATE(YES)
    OPENTIME(FIRSTREF)
    LSRPOOLID(1)
    RECOVERY(BACKOUTONLY)
    STATUS(ENABLED)

TDQUEUE:
  Transient data queue definition.
  DEFINE TDQUEUE(MSGL) GROUP(grp)
    TYPE(INTRA|EXTRA)
    TRIGGERLEVEL(100)        — trigger after 100 records
    TRANSID(MSGT)            — transaction to trigger

TSMODEL:
  Temporary storage queue model.
  DEFINE TSMODEL(MYQS*) GROUP(grp)
    LOCATION(MAIN|AUXILIARY)
    RECOVERY(YES)

DB2CONN / DB2ENTRY / DB2TRAN:
  Define DB2 connectivity for CICS applications.

Resource Groups and Lists:
  Resources are organized into GROUPs.
  Groups are assembled into LISTs.
  CICS starts up with a list of groups to install (GRPLIST parameter).`},{title:"CICS Web Services & APIs",level:"Advanced",content:`CICS Modern Integration — Web Services, APIs & JSON:

CICS has evolved far beyond 3270 terminals. Modern CICS supports REST APIs, JSON, web services, and cloud integration.

CICS Web Services:
  Expose COBOL programs as SOAP or REST web services:
  1. Write standard COBOL program with COMMAREA or channels
  2. Use CICS assistant (DFHWS2LS) to generate web service binding
  3. Define PIPELINE and WEBSERVICE resources
  4. CICS automatically handles XML/JSON ↔ COBOL data conversion

CICS JSON Support:
  EXEC CICS TRANSFORM DATATOCONTAINER
    FROMJSON(WS-JSON-STRING)
    CHANNEL('MYCHAN')
    DATCONTAINER('DATA')
  END-EXEC

  EXEC CICS TRANSFORM CONTAINERTODATA
    CHANNEL('MYCHAN')
    DATCONTAINER('DATA')
    TOJSON INTO(WS-JSON-OUT)
  END-EXEC

  This automatically maps JSON fields to COBOL data structures!

CICS Liberty (Java):
  CICS embeds a Liberty web application server.
  Run Java applications alongside COBOL.
  Deploy Spring Boot, JAX-RS, and other Java EE apps.
  Mix COBOL and Java within the same transaction.

CICS Integration with MQ:
  CICS can send/receive messages via IBM MQ:
  EXEC CICS WRITEQ TS QUEUE(qname) FROM(msg) — Simple
  Or use MQ API calls within CICS programs.

z/OS Connect EE:
  Enterprise-grade API gateway for mainframe:
  • RESTful API exposure for CICS transactions
  • API discovery and documentation (OpenAPI/Swagger)
  • Rate limiting, authentication, monitoring
  • No changes needed to existing COBOL programs

Event Processing:
  CICS Event Binding:
  Emit events from CICS transactions.
  Events can trigger actions in other systems (MQ, IBM Cloud, etc.).
  Enables real-time integration without modifying existing programs.`},{title:"CICS Performance Tuning",level:"Advanced",content:`CICS Performance — Making Transactions Fly:

Response Time Target:
  Interactive transactions: < 1 second response
  Complex transactions: < 3 seconds
  Background tasks: Based on SLA

Key Performance Areas:

1. Program Load:
   Programs loaded from DFHRPL library concatenation.
   • RESIDENT(YES) for frequently used programs (always in memory)
   • Reentrant code allows sharing one copy among many tasks
   • THREADSAFE programs avoid TCB switching overhead

2. File I/O (VSAM):
   Biggest performance lever for CICS.
   • LSR buffering: Configure adequate buffer pool sizes
   • STRING NUMBER: Limit concurrent file requests
   • Read-only files: Use SHAREOPTIONS(2) and READONLY
   • Minimize file I/O: Cache lookup data in TS or program storage

3. DB2 Access:
   • Use THREADWAIT(NO) to avoid waits for DB2 thread
   • Connection pooling through DB2CONN definitions
   • Keep SQL simple — avoid complex joins in online transactions
   • Commit frequently to release locks

4. Storage:
   • DSA (Dynamic Storage Area) fragmentation
   • Monitor GETMAIN/FREEMAIN activity
   • Avoid large COMMAREA sizes (32K max, smaller is better)
   • Use channels/containers for large data (not TS queues)

5. Network:
   • Minimize data sent to terminal (DATAONLY vs full map)
   • Compress data for remote terminals
   • Use VTAM generic resources for workload balancing

Monitoring Tools:
  • CICS Statistics: Built-in reports
  • CICS Performance Analyzer (CPA)
  • IBM OMEGAMON for CICS
  • SMF records (type 110 for CICS)

Key Metrics:
  • Transaction response time (avg, 90th percentile)
  • CPU time per transaction
  • File I/O counts per transaction
  • DB2 elapsed time per transaction
  • Task wait time (why is the task waiting?)
  • MAXTASK (are we hitting the concurrent task limit?)
  • DSA utilization (are we running out of storage?)`},{title:"CICS Security",level:"Advanced",content:`CICS Security — Protecting Transactions and Data:

CICS integrates with RACF (or other SAF-compatible security products) to provide comprehensive security.

Security Levels:

1. Transaction Security:
   Controls who can execute which transactions.
   RACF class: TCICSTRN
   RDEFINE TCICSTRN CINQ UACC(NONE)
   PERMIT CINQ CLASS(TCICSTRN) ID(USERGRP) ACCESS(READ)

2. Resource Security:
   Controls access to CICS resources (files, TS queues, TD queues).
   RACF class: FCICSFCT (files), SCICSTST (TS), DCICSDCT (TD)

3. Command Security:
   Controls who can use system commands (CEMT, CEDA, etc.).
   RACF class: CCICSCMD

4. Surrogate Security:
   Allows one user to submit work on behalf of another.
   Used for batch-to-CICS interfaces.

CICS Security in Programs:
  EXEC CICS QUERY SECURITY
    RESTYPE('FILE')
    RESID('CUSTMAST')
    RESIDLENGTH(8)
    READ(WS-READ)
    UPDATE(WS-UPDATE)
  END-EXEC
  
  IF WS-UPDATE NOT = DFHVALUE(ALTERABLE)
    MOVE 'NO UPDATE ACCESS' TO WS-MSG
  END-IF

Authentication:
  CICS supports: RACF password sign-on, PassTickets, Kerberos, digital certificates, LDAP, and custom sign-on programs.

Audit Trail:
  SMF type 110 records capture:
  • Transaction execution (who, when, from where)
  • Security violations (rejected access)
  • Resource access patterns
  • Performance data`},{title:"CICS Recovery & Restart",level:"Advanced",content:`CICS Recovery — Ensuring Data Integrity:

CICS provides robust recovery mechanisms to protect data integrity even when transactions fail or CICS itself crashes.

Transaction Recovery:
  When a CICS task ABENDs, CICS automatically backs out all recoverable changes made by that task. This ensures atomicity (all or nothing).

  Recoverable resources:
  • VSAM files with RECOVERY(BACKOUTONLY) or RECOVERY(ALL)
  • DB2 changes (DB2's own recovery)
  • TS queues with RECOVERY(YES)
  • TD queues with RECOVERY(YES)

CICS Logging:
  System Log: Records all recoverable changes
  Used for: Backout (undo failed transactions) and Forward Recovery

  Journal: Application-defined logging
  Used for: Audit trails, custom recovery, reporting

SYNCPOINT:
  EXEC CICS SYNCPOINT END-EXEC
  Commits all recoverable changes since last syncpoint.
  In pseudo-conversational: Implicit syncpoint at RETURN.

  EXEC CICS SYNCPOINT ROLLBACK END-EXEC
  Explicitly undo all changes since last syncpoint.

CICS Restart Types:

  COLD Start:
    Starts CICS from scratch. Clears all temporary data.
    TS queues deleted, in-flight tasks lost.
    Used after: CICS upgrade, catalog corruption, major failure.

  WARM Start:
    Restores CICS to its state before the previous shutdown.
    Recoverable resources restored, in-flight tasks backed out.
    Used after: Planned shutdown, normal restart.

  EMERGENCY Restart:
    Automatic after abnormal CICS termination.
    Backs out in-flight units of work.
    Restores recoverable resources.

XRF (Extended Recovery Facility):
  Provides automatic takeover.
  Active CICS region + Standby CICS region.
  If active fails, standby takes over within seconds.
  Terminals reconnect automatically.`},{title:"CICS Interview Questions",level:"All Levels",content:`CICS Interview Questions — 35+ Q&A organized by level.

=== BEGINNER ===

Q: What is CICS?
A: Customer Information Control System — IBM's online transaction processing (OLTP) system. Handles real-time transactions like ATM withdrawals, airline bookings, and banking operations.

Q: What is a CICS transaction?
A: A unit of work identified by a 4-character TRANSID. User types transid on terminal → CICS loads and runs the associated program.

Q: What is pseudo-conversational programming?
A: The program sends a screen, then terminates (RETURN TRANSID). When user responds, CICS starts a new task. This frees resources between user interactions. Opposite of conversational (program waits for user).

Q: What is a BMS map?
A: Basic Mapping Support — defines screen layouts. DFHMSD (mapset), DFHMDI (map), DFHMDF (field). Compiled into physical and symbolic maps.

Q: What is COMMAREA?
A: Communication Area — data passed between pseudo-conversational interactions. EXEC CICS RETURN TRANSID('TRN1') COMMAREA(WS-COMM). Max 32KB.

Q: What is SEND MAP and RECEIVE MAP?
A: SEND MAP displays screen to user. RECEIVE MAP reads user input from screen into program variables.

Q: What is EIBTRNID?
A: Execute Interface Block field containing the current transaction ID. EIB fields provide CICS system info to the program.

Q: What is EIBCALEN?
A: Length of the COMMAREA received. If EIBCALEN=0, it's the first invocation (no COMMAREA passed). Used to detect first-time vs return.

=== INTERMEDIATE ===

Q: Explain CICS file control commands.
A: READ (get record), WRITE (add record), REWRITE (update), DELETE (remove), BROWSE (START/READNEXT/READPREV/ENDBR). All use EXEC CICS prefix.

Q: What is the difference between MAPONLY and DATAONLY?
A: SEND MAP MAPONLY sends layout without data (first display). SEND MAP DATAONLY sends data into existing layout (updates only). Reduces network traffic.

Q: What is a CICS program list table (PLT)?
A: Lists programs to run during CICS startup (PLTPI) or shutdown (PLTSD). Used for initialization routines.

Q: What is ASKTIME and FORMATTIME?
A: ASKTIME gets current time into EIBTIME/EIBDATE. FORMATTIME converts to readable format: EXEC CICS FORMATTIME ABSTIME(ws-time) DDMMYYYY(ws-date).

Q: Explain CICS LINK vs XCTL vs RETURN.
A: LINK=call subroutine (returns to caller). XCTL=transfer control (doesn't return). RETURN=end program (with/without TRANSID for pseudo-conversational).

Q: What is CICS HANDLE CONDITION?
A: Legacy error handling. HANDLE CONDITION NOTFND(label). Modern approach: RESP option — EXEC CICS READ ... RESP(ws-resp). Check DFHRESP(NORMAL).

Q: What is CICS Temporary Storage (TS) queue?
A: Named queues for temporary data. WRITEQ TS, READQ TS, DELETEQ TS. Can be MAIN (memory) or AUXILIARY (disk). Used for scratch pad data, session state.

Q: What is CICS Transient Data (TD) queue?
A: Destinations for sequential data. Intrapartition (within CICS) or Extrapartition (external files). Used for logging, printing, triggers.

Q: What is START command?
A: Schedules a transaction to run later. EXEC CICS START TRANSID('TRN2') INTERVAL(003000) FROM(data). Used for deferred processing.

=== ADVANCED ===

Q: How do you handle CICS abends?
A: EXEC CICS HANDLE ABEND PROGRAM('ERRPGM') or RESP option on each command. RESP(WS-RESP) avoids abend — program checks response code.

Q: What is CICS Resource Definition Online (RDO)?
A: Defines CICS resources (programs, transactions, files, TDQs, TSQs) dynamically using CEDA/CEMT commands instead of macro tables.

Q: Explain CICS journaling.
A: Records transaction activity for recovery. EXEC CICS JOURNAL. Used with Dynamic Transaction Backout (DTB) for recovery.

Q: What is CICS web services support?
A: CICS can expose COBOL programs as REST/SOAP web services. PIPELINE definitions, WS-TRUST, JSON/XML transformations. DFHWS2LS converts WSDL to language structure.

Q: How do you debug CICS programs?
A: CEDF (Execution Diagnostic Facility) — step through CICS commands interactively. CECI — test CICS commands. CEBR — browse TS queues.

💡 Study Tip: Master pseudo-conversational logic, COMMAREA, BMS maps, and file control. These are in every CICS interview.`},{title:"CICS Cheat Sheet",level:"All Levels",content:`CICS Quick Reference — Cheat Sheet

═══ CICS COMMANDS ═══
EXEC CICS SEND MAP('map') MAPSET('mset') MAPONLY/DATAONLY END-EXEC
EXEC CICS RECEIVE MAP('map') MAPSET('mset') END-EXEC
EXEC CICS RETURN TRANSID('TRN1') COMMAREA(ws-comm) END-EXEC
EXEC CICS XCTL PROGRAM('prog') COMMAREA(ws-comm) END-EXEC
EXEC CICS LINK PROGRAM('prog') COMMAREA(ws-comm) END-EXEC

═══ FILE CONTROL ═══
READ DATASET('file') INTO(ws-rec) RIDFLD(ws-key) RESP(ws-resp)
WRITE DATASET('file') FROM(ws-rec) RIDFLD(ws-key)
REWRITE DATASET('file') FROM(ws-rec)
DELETE DATASET('file') RIDFLD(ws-key)
STARTBR/READNEXT/READPREV/ENDBR — Browse operations

═══ TS QUEUE ═══
WRITEQ TS QUEUE('name') FROM(data) ITEM(n) MAIN/AUXILIARY
READQ TS QUEUE('name') INTO(data) ITEM(n)
DELETEQ TS QUEUE('name')

═══ EIB FIELDS ═══
EIBTRNID — Transaction ID    EIBCALEN — COMMAREA length
EIBTIME — Time               EIBDATE — Date
EIBTASKN — Task number        EIBAID — Attention key pressed

═══ RESP CODES ═══
DFHRESP(NORMAL)=0    DFHRESP(NOTFND)=13
DFHRESP(DUPREC)=14   DFHRESP(DUPKEY)=15
DFHRESP(ENDFILE)=20  DFHRESP(LENGERR)=22
DFHRESP(PGMIDERR)=27 DFHRESP(INVREQ)=16

═══ OPERATOR COMMANDS ═══
CEMT — Master terminal (INQ/SET resources)
CEDA — Resource definition
CEDF — Execution diagnostic facility
CECI — Command interpreter
CEBR — TS queue browser`}]},ko={id:"imsdb",icon:"🌳",title:"IMS DB",subtitle:"Hierarchical Database System",color:"#22c55e",level:"Beginner → Expert",description:"The grandfather of all databases. Still processing millions of transactions for the world's largest financial systems.",sections:[{title:"Introduction to IMS",level:"Beginner",content:`IMS (Information Management System) was developed by IBM and North American Rockwell for the Apollo space program in 1966. It is the world's first commercial database management system and remains one of the most powerful transaction processors ever built.

IMS has two major components:
  • IMS DB (Database Manager) — Hierarchical database management
  • IMS TM (Transaction Manager) — Online transaction processing

Why IMS Still Matters:
  • Processes over 50 billion transactions per day globally
  • 95% of Fortune 1000 companies use IMS
  • Banks, airlines, hospitals, and government agencies rely on IMS
  • Unmatched performance: millions of transactions per second
  • Extreme reliability: 99.999% uptime (5 nines)
  • Massive scalability: handles petabytes of data

IMS DB vs Relational Databases:
  IMS uses a hierarchical (tree) data model, not tables.
  ┌─────────────┐
  │  HOSPITAL    │  ← Root segment
  └──────┬──────┘
         ├───────────────────┐
  ┌──────┴──────┐     ┌─────┴──────┐
  │  WARD       │     │  DOCTOR    │  ← Child segments
  └──────┬──────┘     └────────────┘
         │
  ┌──────┴──────┐
  │  PATIENT    │  ← Grandchild segment
  └──────┬──────┘
         │
  ┌──────┴──────┐
  │  TREATMENT  │  ← Great-grandchild
  └─────────────┘

  Key differences from DB2/SQL:
  • No SQL (uses DL/I calls — Data Language/Interface)
  • No joins — data is pre-organized by hierarchy
  • Blazingly fast for known access patterns
  • Less flexible for ad-hoc queries
  • Segment = record, Database = collection of segment types

IMS Processing Modes:
  Batch DL/I (BMP) — High-volume batch processing with DL/I calls
  IMS TM (MPP) — Online transaction processing
  DB Batch — Batch programs accessing IMS databases
  DBCTL — IMS databases accessed from CICS (DB Control)
  ODBA — Open Database Access (from z/OS programs)
  IMS Connect — TCP/IP access for distributed applications`},{title:"Hierarchical Data Model",level:"Beginner",content:`Understanding the IMS Hierarchical Data Model:

The hierarchical model organizes data as inverted trees. Each tree is called a "database record" and consists of segments.

Key Terminology:

Segment — The basic unit of data in IMS (like a row in DB2):
  • Has a fixed or variable length
  • Contains one or more fields
  • Maximum segment size: 65,535 bytes
  • A database can have up to 255 segment types
  • Maximum hierarchy depth: 15 levels

Segment Types & Relationships:
  Root Segment — The top-level segment (every database has exactly one)
  Parent Segment — Any segment that has children below it
  Child Segment — A segment that depends on a parent
  Twin Segments — Multiple occurrences of the same segment type under one parent
  Sibling Segments — Different segment types under the same parent

Database Record:
  One occurrence of the root segment plus ALL its dependent segments.
  Example: One CUSTOMER root + all their ORDERS + all ORDER ITEMS

Hierarchical Path:
  The path from root to any segment. Each segment occurrence is unique via its path.
  HOSPITAL → WARD(ICU) → PATIENT(John) → TREATMENT(Surgery)

Segment Search Arguments (SSA):
  Used in DL/I calls to navigate the hierarchy.
  Unqualified SSA: segment-name (any occurrence)
  Qualified SSA: segment-name(field = value) (specific occurrence)

Data Hierarchy Example — Banking:
  ┌──────────────┐
  │  CUSTOMER    │  Root: Cust ID, Name, Address, Phone
  └──────┬───────┘
         ├────────────────────────┐
  ┌──────┴───────┐        ┌──────┴───────┐
  │  ACCOUNT     │        │  LOAN        │
  │  AcctNo,Type │        │  LoanNo,Rate │
  │  Balance     │        │  Balance     │
  └──────┬───────┘        └──────┬───────┘
         │                       │
  ┌──────┴───────┐        ┌──────┴───────┐
  │ TRANSACTION  │        │  PAYMENT     │
  │ Date,Amount  │        │  Date,Amount │
  │ Type,Desc    │        │  Method      │
  └──────────────┘        └──────────────┘

  In this model:
  • One CUSTOMER can have many ACCOUNTs and LOANs
  • Each ACCOUNT can have many TRANSACTIONs
  • Each LOAN can have many PAYMENTs
  • To get transactions, you MUST go through CUSTOMER → ACCOUNT → TRANSACTION
  • There is no way to directly query TRANSACTION without knowing the path`},{title:"DL/I Calls — The IMS API",level:"Intermediate",code:`      * ─── DL/I CALL FORMAT ──────────────────────────────
      * CALL 'CBLTDLI' USING function-code
      *                       pcb-name
      *                       io-area
      *                       ssa1
      *                       ssa2 ...
      *
      * ─── GET UNIQUE (GU) — Direct retrieval ───────────
           CALL 'CBLTDLI' USING GU-FUNC
                                 CUST-PCB
                                 CUST-IO-AREA
                                 CUST-SSA
      *    Qualified SSA:
      *    CUSTOMER(CUSTID  = 100234)
      *
      * ─── GET NEXT (GN) — Sequential retrieval ─────────
           CALL 'CBLTDLI' USING GN-FUNC
                                 CUST-PCB
                                 TXNS-IO-AREA
                                 CUST-SSA
                                 ACCT-SSA
                                 TXN-SSA
      *
      * ─── GET NEXT WITHIN PARENT (GNP) ─────────────────
      *    Get next child under current parent
           CALL 'CBLTDLI' USING GNP-FUNC
                                 CUST-PCB
                                 TXN-IO-AREA
                                 TXN-SSA
      *
      * ─── INSERT (ISRT) — Add new segment ──────────────
           MOVE 'NEW TRANSACTION' TO TXN-IO-AREA
           CALL 'CBLTDLI' USING ISRT-FUNC
                                 CUST-PCB
                                 TXN-IO-AREA
                                 CUST-SSA
                                 ACCT-SSA
      *
      * ─── REPLACE (REPL) — Update segment ──────────────
      *    Must do a GET HOLD first (GHU, GHN, GHNP)
           CALL 'CBLTDLI' USING GHU-FUNC
                                 CUST-PCB
                                 CUST-IO-AREA
                                 CUST-SSA
           MOVE 'NEW ADDRESS' TO CUST-ADDRESS
           CALL 'CBLTDLI' USING REPL-FUNC
                                 CUST-PCB
                                 CUST-IO-AREA
      *
      * ─── DELETE (DLET) — Remove segment ───────────────
      *    Must do a GET HOLD first
           CALL 'CBLTDLI' USING GHU-FUNC
                                 CUST-PCB
                                 TXN-IO-AREA
                                 CUST-SSA
                                 ACCT-SSA
                                 TXN-SSA
           CALL 'CBLTDLI' USING DLET-FUNC
                                 CUST-PCB
                                 TXN-IO-AREA`,content:`DL/I (Data Language/Interface) — The IMS Programming API:

DL/I is how application programs communicate with IMS databases. Every database operation is performed through a CALL to the DL/I interface.

DL/I Function Codes:

Retrieval Calls:
  GU  (Get Unique)     — Direct retrieval by key. Positions to a specific segment.
  GN  (Get Next)       — Sequential retrieval. Gets the next segment in hierarchy.
  GNP (Get Next in Parent) — Sequential within current parent only.
  GHU (Get Hold Unique)  — Same as GU but locks segment for update.
  GHN (Get Hold Next)    — Same as GN but locks for update.
  GHNP(Get Hold Next in Parent) — Same as GNP but locks for update.

Update Calls:
  ISRT (Insert)  — Add a new segment occurrence
  REPL (Replace) — Update an existing segment (requires prior Get Hold)
  DLET (Delete)  — Remove a segment and all its dependents (requires Get Hold)

Segment Search Arguments (SSA):
  Each DL/I call includes SSAs that tell IMS which segments to access.

  Unqualified SSA: Just the segment name
    CUSTOMER    ← "any customer"

  Qualified SSA: Segment name + qualification
    CUSTOMER(CUSTID  = 100234)
    ACCOUNT (ACCTNO  = 50001 )

  Command Codes (in SSA):
    *D — Path call (retrieve multiple segments in one call)
    *F — First occurrence
    *L — Last occurrence
    *N — Path call, set parentage
    *U — Maintain position at this level

PCB (Program Communication Block):
  The PCB is your program's "connection" to a specific IMS database.
  After every DL/I call, check the PCB status code:
    (blank) — Successful
    GE      — Segment not found
    GB      — End of database
    GK      — Segment type changed during GN
    II      — Insert failed (duplicate key)
    DA      — Segment not accessible
    AI      — I/O error

I/O Area:
  A working storage area where segment data is placed (on retrieval) or
  where data to be inserted/replaced is staged.`},{title:"DBD — Database Description",level:"Intermediate",content:`DBD (Database Description) — Defining IMS Database Structure:

The DBD is the physical description of an IMS database. It defines the hierarchy, segments, fields, and physical storage characteristics. Think of it as the IMS equivalent of a DB2 CREATE TABLE statement.

DBD Generation (DBDGEN):
  DBDs are defined using assembler-like macro statements and generated using the DBDGEN utility.

Key DBD Macros:

DBD Macro — Database definition:
  DBD  NAME=CUSTDB,ACCESS=HIDAM,RMNAME=(DFSDLM01)
  • NAME — Database name (1-8 characters)
  • ACCESS — Access method (HIDAM, HISAM, HDAM, HSAM, etc.)
  • RMNAME — Randomizing module for HDAM

DATASET Macro — Physical dataset:
  DATASET DD1=CUSTDB,DEVICE=3390,BLOCK=4096
  • DD1 — DD name in the JCL
  • DEVICE — Device type
  • BLOCK — Block size

SEGM Macro — Segment definition:
  SEGM  NAME=CUSTOMER,PARENT=0,BYTES=200
  SEGM  NAME=ACCOUNT,PARENT=CUSTOMER,BYTES=100
  SEGM  NAME=TRANSACT,PARENT=ACCOUNT,BYTES=80
  • NAME — Segment name
  • PARENT — Parent segment (0 = root)
  • BYTES — Segment length

FIELD Macro — Field definition:
  FIELD NAME=(CUSTID,SEQ,U),BYTES=6,START=1
  • NAME — Field name, SEQ=sequence field (key), U=unique
  • BYTES — Field length
  • START — Starting position within segment

LCHILD/XDFLD — Logical relationships and secondary indexes

Access Methods:
  HSAM — Hierarchical Sequential Access Method
    Simplest. Data stored sequentially. Good for batch-only.

  HISAM — Hierarchical Indexed Sequential
    Root segments indexed, dependents overflow. Moderate performance.

  HDAM — Hierarchical Direct Access Method
    Root accessed by hashing (randomizing). Best for random access.
    No sequential root access by key.

  HIDAM — Hierarchical Indexed Direct Access Method
    Root accessed by index (like VSAM KSDS). Both sequential and random.
    Most commonly used for production databases.

  DEDB — Data Entry Database
    High-performance, high-availability. Used for very large databases.
    Supports multiple areas, sequential dependent segments.`,code:`* ─── SAMPLE DBD GENERATION ──────────────────────────
*
         DBD   NAME=CUSTDB,                              X
               ACCESS=HIDAM,                             X
               RMNAME=(DFSDLM01)
*
         DATASET DD1=CUSTDB,DEVICE=3390
*
         SEGM  NAME=CUSTOMER,PARENT=0,                   X
               BYTES=200
         FIELD NAME=(CUSTID,SEQ,U),BYTES=6,START=1
         FIELD NAME=CUSTNAME,BYTES=30,START=7
         FIELD NAME=ADDRESS,BYTES=60,START=37
         FIELD NAME=PHONE,BYTES=15,START=97
*
         SEGM  NAME=ACCOUNT,PARENT=CUSTOMER,             X
               BYTES=100
         FIELD NAME=(ACCTNO,SEQ,U),BYTES=8,START=1
         FIELD NAME=ACCTTYPE,BYTES=2,START=9
         FIELD NAME=BALANCE,BYTES=8,START=11
*
         SEGM  NAME=TRANSACT,PARENT=ACCOUNT,             X
               BYTES=80
         FIELD NAME=(TXNDATE,SEQ),BYTES=8,START=1
         FIELD NAME=TXNAMT,BYTES=8,START=9
         FIELD NAME=TXNTYPE,BYTES=2,START=17
         FIELD NAME=TXNDESC,BYTES=40,START=19
*
         SEGM  NAME=LOAN,PARENT=CUSTOMER,                X
               BYTES=120
         FIELD NAME=(LOANNO,SEQ,U),BYTES=8,START=1
         FIELD NAME=LOANRATE,BYTES=4,START=9
         FIELD NAME=LOANBAL,BYTES=8,START=13
*
         DBDGEN
         FINISH
         END`},{title:"PSB — Program Specification Block",level:"Intermediate",content:`PSB (Program Specification Block) — Program's View of the Database:

While the DBD defines the physical database, the PSB defines what a specific program can see and do with that database. It's the IMS equivalent of a DB2 authorization grant.

Why PSBs Matter:
  • Security — Limits which segments a program can access
  • Sensitivity — Controls read/write/delete permissions per segment
  • Multiple PCBs — A program can access multiple databases
  • Logical views — Different programs see different parts of the hierarchy

PSB Generation (PSBGEN):
  PSBs are generated using assembler macros, similar to DBDs.

Key PSB Macros:

PCB Macro — Program Communication Block:
  PCB  TYPE=DB,DBDNAME=CUSTDB,KEYLEN=22,PROCOPT=A
  • TYPE — DB (database PCB), TP (IMS TM), GSAM
  • DBDNAME — Which database to access
  • KEYLEN — Concatenated key length for this PCB
  • PROCOPT — Processing options:
      A — All operations (Get, Insert, Replace, Delete)
      G — Get (read only)
      I — Insert only
      R — Replace (update) only
      D — Delete only
      GI — Get and Insert
      GR — Get and Replace
      GRD — Get, Replace, and Delete
      K — Key sensitivity only (no data access)

SENSEG Macro — Sensitive Segment:
  SENSEG NAME=CUSTOMER,PARENT=0,PROCOPT=A
  SENSEG NAME=ACCOUNT,PARENT=CUSTOMER,PROCOPT=G
  SENSEG NAME=TRANSACT,PARENT=ACCOUNT,PROCOPT=G
  • NAME — Segment name (must match DBD)
  • PARENT — Parent segment
  • PROCOPT — Override PCB-level PROCOPT for this segment

SENFLD Macro — Sensitive Field (optional):
  Restricts access to specific fields within a segment.

PSB Rules:
  • A program can have multiple PCBs (accessing multiple databases)
  • Each PCB must reference a valid DBD
  • SENSEG entries must follow the hierarchy order
  • PROCOPT at SENSEG level overrides PCB level
  • Missing SENSEG means that segment is NOT accessible`,code:`* ─── SAMPLE PSB GENERATION ──────────────────────────
* READ-ONLY PSB for reporting program
*
         PCB   TYPE=DB,                                  X
               DBDNAME=CUSTDB,                           X
               KEYLEN=22,                                X
               PROCOPT=G                                 READ ONLY
*
         SENSEG NAME=CUSTOMER,PARENT=0
         SENSEG NAME=ACCOUNT,PARENT=CUSTOMER
         SENSEG NAME=TRANSACT,PARENT=ACCOUNT
*        Note: LOAN segment not listed = not accessible
*
* ─── FULL ACCESS PSB for update program ────────────
*
         PCB   TYPE=DB,                                  X
               DBDNAME=CUSTDB,                           X
               KEYLEN=22,                                X
               PROCOPT=A                                 ALL ACCESS
*
         SENSEG NAME=CUSTOMER,PARENT=0,PROCOPT=GR
         SENSEG NAME=ACCOUNT,PARENT=CUSTOMER,PROCOPT=A
         SENSEG NAME=TRANSACT,PARENT=ACCOUNT,PROCOPT=GI
         SENSEG NAME=LOAN,PARENT=CUSTOMER,PROCOPT=G
*
* ─── MULTI-DATABASE PSB ───────────────────────────
*
         PCB   TYPE=DB,DBDNAME=CUSTDB,KEYLEN=22,PROCOPT=G
         SENSEG NAME=CUSTOMER,PARENT=0
         SENSEG NAME=ACCOUNT,PARENT=CUSTOMER
*
         PCB   TYPE=DB,DBDNAME=PRODDB,KEYLEN=16,PROCOPT=A
         SENSEG NAME=PRODUCT,PARENT=0
         SENSEG NAME=INVENTORY,PARENT=PRODUCT
*
         PSBGEN LANG=COBOL,PSBNAME=RPTPSB01
         END`},{title:"COBOL-IMS Programming",level:"Intermediate",code:`       IDENTIFICATION DIVISION.
       PROGRAM-ID. CUSTINQ.
      *
       ENVIRONMENT DIVISION.
      *
       DATA DIVISION.
       WORKING-STORAGE SECTION.
      *
      * DL/I Function Codes
       01  GU-FUNC            PIC X(04) VALUE 'GU  '.
       01  GN-FUNC            PIC X(04) VALUE 'GN  '.
       01  GNP-FUNC           PIC X(04) VALUE 'GNP '.
       01  GHU-FUNC           PIC X(04) VALUE 'GHU '.
       01  ISRT-FUNC          PIC X(04) VALUE 'ISRT'.
       01  REPL-FUNC          PIC X(04) VALUE 'REPL'.
       01  DLET-FUNC          PIC X(04) VALUE 'DLET'.
      *
      * SSA Areas
       01  CUST-SSA.
           05 FILLER           PIC X(09) VALUE 'CUSTOMER('.
           05 FILLER           PIC X(10) VALUE 'CUSTID  ='.
           05 SSA-CUSTID       PIC X(06) VALUE SPACES.
           05 FILLER           PIC X(01) VALUE ')'.
      *
       01  ACCT-SSA-UNQUAL    PIC X(09) VALUE 'ACCOUNT  '.
      *
       01  CUST-UNQUAL-SSA    PIC X(09) VALUE 'CUSTOMER '.
      *
      * I/O Areas
       01  CUST-IO-AREA.
           05 IO-CUSTID        PIC X(06).
           05 IO-CUSTNAME      PIC X(30).
           05 IO-ADDRESS       PIC X(60).
           05 IO-PHONE         PIC X(15).
           05 FILLER           PIC X(89).
      *
       01  ACCT-IO-AREA.
           05 IO-ACCTNO        PIC X(08).
           05 IO-ACCTTYPE      PIC X(02).
           05 IO-BALANCE       PIC S9(13)V99 COMP-3.
           05 FILLER           PIC X(82).
      *
      * PCB Mask
       01  CUST-PCB-MASK.
           05 PCB-DBNAME       PIC X(08).
           05 PCB-SEGLEVEL     PIC X(02).
           05 PCB-STATUS       PIC X(02).
           05 PCB-PROCOPT      PIC X(04).
           05 FILLER           PIC S9(05) COMP.
           05 PCB-SEGNAME      PIC X(08).
           05 PCB-KEYFB-LEN    PIC S9(05) COMP.
           05 PCB-NUMSENSEG    PIC S9(05) COMP.
           05 PCB-KEYAREA      PIC X(22).
      *
       LINKAGE SECTION.
       01  IO-PCB-MASK         PIC X(100).
       01  CUST-PCB            PIC X(100).
      *
       PROCEDURE DIVISION USING IO-PCB-MASK
                                CUST-PCB.
       0000-MAIN.
      *    Get Unique - retrieve specific customer
           MOVE '100234' TO SSA-CUSTID
           CALL 'CBLTDLI' USING GU-FUNC
                                 CUST-PCB
                                 CUST-IO-AREA
                                 CUST-SSA
           IF PCB-STATUS = SPACES
               DISPLAY 'Customer: ' IO-CUSTNAME
               PERFORM 1000-GET-ACCOUNTS
           ELSE IF PCB-STATUS = 'GE'
               DISPLAY 'Customer not found'
           END-IF
           GOBACK.
      *
       1000-GET-ACCOUNTS.
      *    Get all accounts for this customer
           CALL 'CBLTDLI' USING GNP-FUNC
                                 CUST-PCB
                                 ACCT-IO-AREA
                                 ACCT-SSA-UNQUAL
           PERFORM UNTIL PCB-STATUS NOT = SPACES
               DISPLAY '  Account: ' IO-ACCTNO
                       ' Type: ' IO-ACCTTYPE
                       ' Balance: ' IO-BALANCE
               CALL 'CBLTDLI' USING GNP-FUNC
                                     CUST-PCB
                                     ACCT-IO-AREA
                                     ACCT-SSA-UNQUAL
           END-PERFORM.`,content:`Writing COBOL Programs for IMS Databases:

COBOL is the most common language for IMS application programming. The interface uses DL/I calls through the CBLTDLI (COBOL to DL/I) entry point.

Program Structure for IMS:

1. PROCEDURE DIVISION USING:
   IMS programs receive PCB addresses through the USING clause.
   The first PCB is always the I/O PCB (for IMS system services).
   Subsequent PCBs are database PCBs (in PSB order).

2. Working Storage Requirements:
   • Function code variables (GU, GN, GNP, ISRT, REPL, DLET)
   • SSA definitions (one per segment in the path)
   • I/O area (buffer for segment data)
   • PCB mask (maps the PCB fields for status checking)

3. PCB Mask Fields:
   PCB-DBNAME   — Database name
   PCB-SEGLEVEL — Current segment level
   PCB-STATUS   — Status code (most important!)
   PCB-PROCOPT  — Processing options
   PCB-SEGNAME  — Current segment name
   PCB-KEYAREA  — Concatenated key of current position

4. Status Code Checking:
   ALWAYS check PCB-STATUS after every DL/I call:
   SPACES — Success
   GE     — Segment not found
   GB     — End of database
   GK     — Different segment type returned
   II     — Insert failed (duplicate)
   DJ     — No parent for insert path
   DA     — Segment not accessible

5. Termination:
   IMS programs end with GOBACK (not STOP RUN).
   STOP RUN would terminate the IMS region.

JCL for IMS Batch Programs:
   Use IMS batch region JCL with:
   //STEP EXEC PGM=DFSRRC00,
   //     PARM='DLI,progname,psbname'
   Plus IMS-specific DD statements: DFSRESLB, IEFRDER, DFSVSAMP, etc.`},{title:"Secondary Indexes",level:"Advanced",content:`Secondary Indexes in IMS:

By default, IMS can only directly access segments through the primary hierarchy (root key → child key → etc.). Secondary indexes provide alternate access paths — similar to DB2 alternate indexes.

Why Secondary Indexes:
  Without an index, to find a CUSTOMER by name you must:
  1. Read every root segment sequentially
  2. Check each name — extremely slow for large databases

  With a secondary index on CUSTNAME:
  1. Look up name in the index
  2. Go directly to the correct segment — very fast

Types of Secondary Indexes:

1. Secondary Index on Root:
   Index a field in the root segment (e.g., CUSTNAME)
   Allows GU directly using the indexed field

2. Secondary Index on Dependent:
   Index a field in a child segment (e.g., ACCTNO in ACCOUNT)
   The root segment appears to be "under" the indexed segment

3. Sparse Index:
   Index only some segment occurrences based on criteria
   Reduces index size for large databases

Index Source and Target:
  • Source Segment — The segment containing the indexed field
  • Target Segment — The segment to which the index points
  • Pointer Segment — The index entry itself (in the index database)

Secondary Index Definition:
  Defined in the DBD using LCHILD and XDFLD macros:
  LCHILD NAME=(INDEXSEG,INDEXDB),INDEX=CUSTNAME
  XDFLD  NAME=CUSTNAME,SRCH=CUSTNAME

Using Secondary Indexes in DL/I:
  The program uses a "PCB with PROCSEQ" pointing to the secondary index:
  PCB  DBDNAME=CUSTDB,PROCSEQ=INDEXDB
  Then GU/GN calls can use the indexed field as the SSA key.

Performance Considerations:
  • Indexes speed up retrieval but slow down inserts/updates
  • Each insert must also update all secondary indexes
  • Index databases need their own DASD space
  • Limit indexes to frequently-used access paths
  • Use sparse indexes for large databases`},{title:"Logical Relationships",level:"Advanced",content:`Logical Relationships — Cross-Hierarchy Links:

In a pure hierarchy, each segment has exactly one parent. Logical relationships allow a segment to appear to belong to two different hierarchies simultaneously — giving IMS some of the flexibility of relational joins.

Why Logical Relationships:
  Consider two databases:
  CUSTOMER → ORDERS
  PRODUCT → INVENTORY

  To find which products a customer ordered, you need to link ORDER to PRODUCT.
  A logical relationship connects ORDER in one hierarchy to PRODUCT in another.

Types of Logical Relationships:

1. Unidirectional:
   Child in one database points to parent in another.
   Navigation works in one direction only.

2. Bidirectional (Virtual):
   Both databases "see" each other.
   IMS creates a virtual segment in each hierarchy.

3. Physically Paired:
   Both logical child and logical parent are physically stored.
   Better performance, uses more DASD space.

4. Virtually Paired:
   Only one side is physically stored; the other is virtual.
   Saves DASD, slightly slower.

Logical Child Segment:
  Contains a pointer (concatenated key) to the logical parent.
  Appears in the physical hierarchy like any other child.
  When accessed, IMS can follow the pointer to the other database.

Concatenated Segments:
  When you access through a logical relationship, the result is a
  "concatenated segment" combining data from both the logical child
  and the logical parent.

Logical Relationship Rules:
  • A logical child must have a physical parent
  • The logical parent can be in the same or different database
  • Maximum of one logical parent per logical child
  • Logical relationships are defined in both DBDs
  • The physical storage is maintained by IMS

Real-World Example — Order Processing:
  Physical Database 1: CUSTOMER → ORDER (logical child to PRODUCT)
  Physical Database 2: PRODUCT → INVENTORY

  Program view through logical relationship:
  CUSTOMER → ORDER → PRODUCT → INVENTORY
  This allows a single DL/I call path from customer to product details.`},{title:"IMS Database Recovery & Utilities",level:"Advanced",content:`IMS Database Recovery and Maintenance:

IMS provides comprehensive recovery capabilities to protect data integrity. Understanding recovery is essential for IMS DBAs.

IMS Recovery Concepts:

Log Datasets:
  IMS logs every database change to the Online Log Dataset (OLDS) and
  System Log (SLDS). These are used for recovery.

  OLDS — Online Log Dataset (used during active processing)
  SLDS — System Log Dataset (archived OLDS)
  RLDS — Recovery Log Dataset (for database recovery)

Image Copy:
  A backup of the database at a point in time.
  Types:
  • Batch Image Copy (DFSUDMP0) — offline, full copy
  • Online Image Copy (DFSUICP0) — while IMS is running
  • Incremental Image Copy — only changed segments since last copy

Forward Recovery:
  Restore image copy + apply log records to bring database current.
  Steps:
  1. Restore the latest image copy
  2. Apply all SLDS/RLDS records since the image copy
  3. Database is now current

Backout (Backward Recovery):
  Reverse database changes to undo a failed batch job.
  Uses the log to back out changes in reverse order.

Change Accumulation:
  Consolidates multiple log datasets into a single recovery dataset.
  Reduces recovery time by applying accumulated changes.

IMS Utilities:

DFSRRC00 — IMS Batch Region Controller
  Runs all IMS batch programs.

DFSUDMP0 — Database Image Copy
  Creates backup copies of IMS databases.

DFSURGP0 — Database Recovery
  Recovers databases from image copy + logs.

DFSURGL0 — Log Recovery
  Processes and manages IMS log datasets.

DFSURCG0 — Change Accumulation
  Accumulates database changes from log datasets.

DBRC (Database Recovery Control):
  Subsystem that tracks all recovery-related information.
  Maintains the RECON (Recovery Control) datasets.
  Records: image copies, log assignments, recovery history.

RECON Datasets:
  Three datasets (RECON1, RECON2, RECON3) that track:
  • Database registration and status
  • Image copy history
  • Log assignments
  • Recovery history
  • DBRC commands and output`,code:`//* ─── IMAGE COPY JCL ──────────────────────────────────
//IMGCOPY  JOB ,'IMS IMAGE COPY',CLASS=A,NOTIFY=&SYSUID
//COPY     EXEC PGM=DFSUDMP0,
//              PARM='IMS,CUSTDB'
//STEPLIB  DD DSN=IMS.SDFSRESL,DISP=SHR
//IMS      DD DSN=IMS.DBDLIB,DISP=SHR
//DFSUDUMP DD DSN=IMS.IMGCOPY.CUSTDB(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(100,50),RLSE)
//CUSTDB   DD DSN=IMS.CUSTDB.DATA,DISP=SHR
//SYSPRINT DD SYSOUT=*
//*
//* ─── DATABASE RECOVERY JCL ────────────────────────
//RECOVER  JOB ,'IMS RECOVERY',CLASS=A,NOTIFY=&SYSUID
//RECOV    EXEC PGM=DFSURGP0,
//              PARM='IMS,CUSTDB'
//STEPLIB  DD DSN=IMS.SDFSRESL,DISP=SHR
//IMS      DD DSN=IMS.DBDLIB,DISP=SHR
//DFSURCDS DD DSN=IMS.IMGCOPY.CUSTDB(0),DISP=SHR
//DFSURLOG DD DSN=IMS.SLDS.LOG01,DISP=SHR
//         DD DSN=IMS.SLDS.LOG02,DISP=SHR
//CUSTDB   DD DSN=IMS.CUSTDB.DATA,DISP=OLD
//SYSPRINT DD SYSOUT=*`},{title:"DBCTL — IMS Databases from CICS",level:"Advanced",content:`DBCTL (Database Control) — Accessing IMS from CICS:

DBCTL allows CICS programs to access IMS databases without using the IMS Transaction Manager. This is the most common way modern applications use IMS — CICS handles the online transactions while IMS manages the hierarchical data.

How DBCTL Works:
  1. CICS program issues a DL/I call (same syntax as batch)
  2. CICS routes the call to the DBCTL region
  3. DBCTL processes the request against the IMS database
  4. Results are returned to the CICS program

  CICS Application ←→ CICS Region ←→ DBCTL Region ←→ IMS Databases

DBCTL Advantages:
  • Use CICS for online processing (BMS screens, web services)
  • Use IMS DB for high-performance hierarchical data
  • Avoid IMS TM complexity for new applications
  • Combine DB2 and IMS access in the same CICS program
  • Leverage existing IMS databases without rewriting

Programming Differences:
  In CICS-DBCTL, use EXEC DLI commands instead of CALL CBLTDLI:

  EXEC DLI GU USING PCB(1)
       SEGMENT(CUSTOMER)
       INTO(CUST-IO-AREA)
       WHERE(CUSTID = WS-CUSTID)
  END-EXEC

  Or use CALL DLI (AERTDLI) interface:
  CALL 'AERTDLI' USING function pcb io-area ssa

PSB Scheduling:
  CICS-DBCTL programs must schedule their PSB:
  EXEC DLI SCHD PSB(psbname) END-EXEC
  And terminate:
  EXEC DLI TERM END-EXEC

Commit/Rollback:
  CICS syncpoint commits IMS changes:
  EXEC CICS SYNCPOINT
  CICS rollback backs out IMS changes:
  EXEC CICS SYNCPOINT ROLLBACK

Connection Management:
  CICS connects to DBCTL during CICS startup.
  Multiple CICS regions can share one DBCTL region.
  DBCTL handles thread management and buffer pools.`},{title:"IMS Interview Questions",level:"All Levels",content:`IMS Interview Questions — 20+ Q&A.

=== BEGINNER ===

Q: What is IMS?
A: Information Management System — IBM's hierarchical database (IMS DB) and transaction manager (IMS TM/DC). Predates relational databases.

Q: What is a hierarchical database?
A: Data organized as parent-child tree. Root segment at top, dependent segments below. Fast for known access paths, rigid structure.

Q: What is a segment?
A: The basic unit of data in IMS — like a record. Segments are organized in parent-child relationships. Max 255 segment types per database.

Q: What is a PCB and PSB?
A: PCB (Program Communication Block) defines one database view. PSB (Program Specification Block) = collection of PCBs for a program.

Q: What are IMS DL/I calls?
A: Data Language/Interface — GU (Get Unique), GN (Get Next), GNP (Get Next within Parent), ISRT (Insert), REPL (Replace), DLET (Delete).

=== INTERMEDIATE ===

Q: What is SSA?
A: Segment Search Argument — specifies which segment to access. Unqualified SSA (segment name only) or Qualified SSA (with field conditions).

Q: What is a status code in IMS?
A: 2-byte code after each DL/I call. Spaces=success, GE=segment not found, GB=end of database, II=duplicate on insert.

Q: Explain IMS DB processing modes.
A: DLI (batch without TM), DBB (BMP batch), TM (online transaction). Each has different PCB handling and commit processing.

💡 Study Tip: Focus on DL/I calls (GU/GN/GNP/ISRT), PCB/PSB concepts, and hierarchical navigation.`},{title:"IMS DB Cheat Sheet",level:"All Levels",content:`IMS Quick Reference — Cheat Sheet

═══ DL/I CALLS ═══
GU   — Get Unique (direct access)
GN   — Get Next (sequential)
GNP  — Get Next within Parent
GHU/GHN/GHNP — Get Hold (for update)
ISRT — Insert segment
REPL — Replace segment
DLET — Delete segment

═══ STATUS CODES ═══
bb — Success (spaces)    GE — Not found
GB — End of database     II — Duplicate
AI — Open failure        IX — Deadlock

═══ SSA FORMAT ═══
Unqualified: segname
Qualified: segname(field OP value)
Operators: =, >=, <=, >, <, !=`}]},Go={id:"ca7",icon:"📅",title:"CA7",subtitle:"Workload Automation Scheduler",color:"#f97316",level:"Beginner → Expert",description:"The scheduler that never sleeps. Millions of jobs, zero missed SLAs, full dependency management.",sections:[{title:"Introduction to CA7",level:"Beginner",content:`CA7 (now Broadcom AutoSys Workload Automation for z/OS, but universally known as CA7) is the dominant workload automation scheduler on IBM z/OS mainframes. It controls when, how, and in what order batch jobs run.

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
  6. POST-PROCESSING — Triggers dependent jobs, sends notifications`},{title:"Defining Jobs in CA7",level:"Beginner",content:`Job Definition in CA7:

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
  HELD  — Held by operator or CA7`,code:`* ─── CA7 BATCH COMMANDS TO DEFINE A JOB ──────────────
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
        TRIGRN=Y`},{title:"Dependencies & Triggers",level:"Intermediate",content:`Job Dependencies — The Core of Scheduling:

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
  BOTH   — Both scheduled and triggered (whichever comes first)`,code:`* ─── COMPLEX DEPENDENCY EXAMPLE ───────────────────────
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
ADDJRSC,SYSTEM=DBLOAD1,RSCNAME=DB2THRD,COUNT=1`},{title:"Scheduling & Calendars",level:"Intermediate",content:`Scheduling in CA7:

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
  SLA monitoring depends on proper deadline settings.`},{title:"CA7 Panels & Commands",level:"Intermediate",content:`CA7 ISPF Interface — Panels and Commands:

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
  QUEUE,FAIL                — Show all failed jobs`},{title:"Job Failure Handling & Recovery",level:"Intermediate",content:`When Jobs Fail — CA7 Recovery Procedures:

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
  • INFO — Job completed within deadline`},{title:"Networks & Job Flows",level:"Advanced",content:`CA7 Networks — Managing Complex Workflows:

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
  All three EXTRACTs run simultaneously, MERGE waits for all three.`},{title:"CA7 JCL Overrides",level:"Advanced",content:`JCL Overrides in CA7 — Dynamic JCL Modification:

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
  • Use version control for JCL libraries`},{title:"Other Schedulers: Control-M & TWS",level:"Intermediate",content:`Beyond CA7 — Alternative Mainframe Schedulers:

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
  • Testing is critical — production impact is severe`},{title:"CA7 Interview Questions",level:"All Levels",content:`CA-7/Job Scheduling Interview Questions — 15+ Q&A.

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

💡 Study Tip: Know predecessor/successor, schedule IDs, restart procedures, and basic CA-7 panels.`},{title:"CA7 Cheat Sheet",level:"All Levels",content:`CA-7/Scheduling Quick Reference

═══ KEY CONCEPTS ═══
Job Stream — Linked sequence of jobs
Predecessor — Must complete first
Successor — Triggered after completion
Schedule ID — Calendar-based trigger

═══ COMMON SCHEDULERS ═══
CA-7 (Broadcom), TWS (IBM), Control-M (BMC), Zeke`}]},Wo={id:"security",icon:"🔐",title:"RACF & Security",subtitle:"z/OS Access Control",color:"#ec4899",level:"Beginner → Expert",description:"Protecting the world's most sensitive data. RACF, ACF2, TopSecret — z/OS security from login to dataset.",sections:[{title:"z/OS Security Fundamentals",level:"Beginner",content:`Mainframe Security — Why It's the Gold Standard:

IBM mainframes process the world's most sensitive transactions: banking, healthcare, government, insurance. z/OS security is built into the operating system at every level — it's not an add-on.

Three Pillars of z/OS Security:

1. Identification — Who are you?
   Every user has a unique user ID. No anonymous access.

2. Authentication — Prove you are who you claim to be.
   Passwords, passphrases, digital certificates, MFA, PassTickets.

3. Authorization — What are you allowed to do?
   Access to datasets, programs, CICS transactions, DB2 tables, system commands.

External Security Managers (ESMs):
  z/OS delegates security to an ESM (External Security Manager):

  RACF (Resource Access Control Facility) — IBM's native ESM
    • Most common (~70% of installations)
    • Integrated with z/OS
    • Included with z/OS license

  ACF2 (Access Control Facility 2) — Broadcom
    • Rule-based access control
    • Default-deny philosophy
    • Popular in financial institutions

  Top Secret (TSS) — Broadcom
    • Department/division-based security model
    • Good for large organizations with complex structures
    • Used by government and defense

  All three ESMs provide the same core functions but with different
  syntax, philosophy, and administrative models.

Security Layers in z/OS:
  Layer 1: Physical — Data center access, hardware security
  Layer 2: Network — Firewalls, TLS/SSL, IP filtering
  Layer 3: z/OS — ESM (RACF/ACF2/TSS), system integrity
  Layer 4: Subsystem — DB2 security, CICS security, MQ security
  Layer 5: Application — Program-level security checks
  Layer 6: Data — Encryption at rest and in transit

z/OS System Integrity:
  z/OS guarantees that no user program can:
  • Bypass security controls
  • Access another user's memory
  • Modify the operating system
  • Gain unauthorized privileges
  This is enforced by hardware (System/z architecture) and software.`},{title:"RACF User Administration",level:"Beginner",content:`RACF User Profiles — Managing Access:

Every person (and batch job) that accesses z/OS must have a RACF user profile.

Creating Users:
  ADDUSER userid NAME('First Last') -
    DFLTGRP(group) -
    OWNER(owner) -
    PASSWORD(initial) -
    TSO(ACCTNUM(acct) PROC(loginproc) SIZE(4096) MAXSIZE(0))

  Key Parameters:
  userid   — 1-8 characters, unique across the system
  NAME     — Full name (for display)
  DFLTGRP  — Default RACF group (organizational unit)
  OWNER    — Who manages this profile (user or group)
  PASSWORD — Initial password (user must change at first logon)

User Profile Segments:
  BASE     — Core identity: name, group, owner, attributes
  TSO      — TSO logon parameters: account, procedure, region
  CICS     — CICS access parameters: operator ID, timeout
  OMVS     — Unix System Services: UID, home directory, shell
  OPERPARM — Console operator parameters
  LANGUAGE — Language preferences
  KERB     — Kerberos authentication
  EIM      — Enterprise Identity Mapping

Modifying Users:
  ALTUSER userid NAME('New Name')
  ALTUSER userid PASSWORD(newpwd) NOEXPIRED
  ALTUSER userid TSO(SIZE(8192))
  ALTUSER userid REVOKE    ← Lock the account
  ALTUSER userid RESUME    ← Unlock the account

Deleting Users:
  DELUSER userid
  (All access permissions for this user are also removed)

Listing User Information:
  LISTUSER userid         ← Brief listing
  LISTUSER userid ALL     ← Complete listing
  LISTUSER userid TSO     ← TSO segment only
  LISTUSER userid OMVS    ← USS segment only

Password Rules:
  RACF enforces password policies through SETROPTS:
  • Minimum/maximum length (1-8 chars for passwords, up to 100 for passphrases)
  • Password history (prevent reuse of last N passwords)
  • Expiration interval (days between required changes)
  • Revocation after N failed attempts
  • Password complexity rules (mixed case, special chars)

  Passphrases (14-100 chars) provide much stronger security than
  traditional 8-character passwords.`,code:`/* ─── RACF USER ADMINISTRATION COMMANDS ────────────── */

/* Create a new developer user */
ADDUSER DEVUSR1 NAME('JOHN DEVELOPER') -
  DFLTGRP(DEVTEAM) -
  OWNER(DEVTEAM) -
  PASSWORD(INITIAL1) -
  TSO(ACCTNUM(DEVACCT) -
      PROC(ISPFPROC) -
      SIZE(4096) -
      MAXSIZE(0) -
      UNIT(SYSDA) -
      MSGCLASS(X) -
      JOBCLASS(A)) -
  OMVS(UID(50001) -
       HOME('/u/devusr1') -
       PROGRAM('/bin/sh'))

/* Modify user - change password, no expiration */
ALTUSER DEVUSR1 PASSWORD(NEWPASS1) NOEXPIRED

/* Revoke (lock) a user account */
ALTUSER DEVUSR1 REVOKE

/* Resume (unlock) a user account */
ALTUSER DEVUSR1 RESUME

/* Grant special attributes */
ALTUSER ADMUSER SPECIAL    /* RACF admin */
ALTUSER ADMUSER OPERATIONS /* Bypass dataset auth */
ALTUSER AUDUSER AUDITOR    /* Read any profile */

/* List user details */
LISTUSER DEVUSR1 ALL`},{title:"RACF Groups",level:"Beginner",content:`RACF Groups — Organizational Security Units:

Groups organize users and simplify access management. Instead of granting access to 50 individual users, grant it to one group.

Group Hierarchy:
  RACF groups form a hierarchy (tree):
  SYS1 (top group)
    ├── PRODTEAM
    │   ├── PRODBATCH
    │   └── PRODOPER
    ├── DEVTEAM
    │   ├── DEVCOBOL
    │   └── DEVDB2
    └── QAATEAM

Creating Groups:
  ADDGROUP DEVTEAM SUPGROUP(SYS1) OWNER(SYSADM)
  ADDGROUP DEVCOBOL SUPGROUP(DEVTEAM) OWNER(DEVLEAD)

Connecting Users to Groups:
  CONNECT userid GROUP(groupname) AUTH(authority)

  Authority Levels:
  USE     — Basic member (default)
  CREATE  — Can create datasets with this group's HLQ
  CONNECT — Can connect other users to this group
  JOIN    — Can create subgroups
  SPECIAL — Group-level RACF admin

  Example:
  CONNECT DEVUSR1 GROUP(DEVCOBOL) AUTH(USE)
  CONNECT DEVLEAD GROUP(DEVTEAM) AUTH(CONNECT)

Group Access Lists:
  When you permit a group to access a resource, ALL members inherit that access:
  PERMIT 'PROD.DATA.**' ID(PRODTEAM) ACCESS(READ)
  Every member of PRODTEAM can now read datasets matching PROD.DATA.**

Default Group:
  Every user has a default group (DFLTGRP).
  When the user creates datasets, the group name may be used as HLQ.
  The default group determines ownership of user-created profiles.

Listing Group Information:
  LISTGRP groupname           ← Brief listing
  LISTGRP groupname ALL       ← Complete details
  LISTGRP groupname MEMBERS   ← Show all members

Group Best Practices:
  • Mirror organizational structure (dept → team → role)
  • Use groups for access control, not individual users
  • Regularly audit group membership
  • Remove users from groups promptly when they transfer
  • Use meaningful group names (PRODBA, DEVCOBOL, not GROUP1)`},{title:"Dataset Protection",level:"Intermediate",content:`Protecting Datasets with RACF:

Dataset profiles control who can read, write, create, and delete datasets. This is the most common type of RACF protection.

Profile Types:

Discrete Profile — Protects exactly one dataset:
  ADDSD 'PROD.PAYROLL.MASTER' UACC(NONE) OWNER(PRODTEAM)
  Protects only PROD.PAYROLL.MASTER

Generic Profile — Protects multiple datasets matching a pattern:
  ADDSD 'PROD.PAYROLL.**' UACC(NONE) OWNER(PRODTEAM)
  Protects all datasets starting with PROD.PAYROLL

  Pattern Characters:
  * — matches one qualifier (PROD.*.MASTER)
  ** — matches one or more qualifiers (PROD.**)
  % — matches one character (PROD.FILE%%)

Access Levels (lowest to highest):
  NONE    — No access
  EXECUTE — Execute load modules only (cannot read data)
  READ    — Read only
  UPDATE  — Read and write (modify existing records)
  CONTROL — VSAM control interval access
  ALTER   — Full control: read, write, rename, delete, scratch

Granting Access (PERMIT):
  PERMIT 'PROD.PAYROLL.**' ID(PAYROLL) ACCESS(UPDATE)
  PERMIT 'PROD.PAYROLL.**' ID(AUDITORS) ACCESS(READ)
  PERMIT 'PROD.PAYROLL.**' ID(DEVUSR1) ACCESS(READ)

Universal Access (UACC):
  The default access for anyone NOT specifically permitted:
  UACC(NONE)  — Deny by default (most secure, recommended)
  UACC(READ)  — Anyone can read (public data)
  UACC(ALTER) — Anyone has full access (dangerous!)

Profile Listing:
  LISTDSD DATASET('PROD.PAYROLL.**') ALL
  Shows: owner, UACC, access list, audit settings, creation date

Searching Profiles:
  SEARCH FILTER('PROD.PAYROLL.**')  ← Find matching profiles
  SEARCH CLASS(DATASET) MASK(PROD)  ← All profiles starting with PROD

WARNING Mode:
  Test new profiles without denying access:
  ALTDSD 'PROD.PAYROLL.**' WARNING
  RACF logs access violations but allows them.
  Use this to validate profiles before enforcement.

Best Practices:
  • Always use UACC(NONE) for production datasets
  • Use generic profiles (**) to reduce administration
  • Grant access to groups, not individual users
  • Use READ as the default grant (least privilege)
  • Audit ALTER and UPDATE access regularly
  • Use WARNING mode to test before enforcing`,code:`/* ─── DATASET PROTECTION EXAMPLES ──────────────────── */

/* Protect all production payroll datasets */
ADDSD 'PROD.PAYROLL.**' UACC(NONE) -
  OWNER(PAYROLL)

/* Grant access */
PERMIT 'PROD.PAYROLL.**' ID(PAYTEAM) ACCESS(UPDATE)
PERMIT 'PROD.PAYROLL.**' ID(AUDITORS) ACCESS(READ)
PERMIT 'PROD.PAYROLL.**' ID(BATCHJOB) ACCESS(UPDATE)

/* Protect sensitive system datasets */
ADDSD 'SYS1.**' UACC(NONE) OWNER(SYSADM)
PERMIT 'SYS1.**' ID(SYSPROGS) ACCESS(ALTER)

/* Protect a specific dataset (discrete) */
ADDSD 'PROD.MASTER.FILE' UACC(NONE)
PERMIT 'PROD.MASTER.FILE' ID(APPTEAM) ACCESS(READ)

/* Check who has access */
LISTDSD DATASET('PROD.PAYROLL.**') ALL AUTHUSER

/* Remove someone's access */
PERMIT 'PROD.PAYROLL.**' ID(EXUSR01) DELETE

/* Set WARNING mode for testing */
ALTDSD 'TEST.NEWRULE.**' WARNING

/* Enable auditing on sensitive data */
ALTDSD 'PROD.PAYROLL.**' -
  AUDIT(ALL(READ)) -
  GLOBALAUDIT(ALL(UPDATE))`},{title:"General Resource Protection",level:"Intermediate",content:`General Resource Classes — Protecting Everything Else:

RACF protects much more than just datasets. General resource classes control access to system resources, transactions, commands, and more.

Common Resource Classes:

FACILITY — System facilities and services:
  BPX.SUPERUSER    — Unix superuser (root equivalent)
  BPX.SERVER       — Server-level USS permissions
  IRR.DIGTCERT.*   — Digital certificate management

TCICSTRN — CICS transactions:
  Protect individual CICS transactions
  RDEFINE TCICSTRN TRAN01 UACC(NONE)
  PERMIT TRAN01 CLASS(TCICSTRN) ID(USERGRP) ACCESS(READ)

DSNR — DB2 resources:
  Protect DB2 subsystems, plans, packages
  RDEFINE DSNR DB2P.RUN ID(BATCHGRP) ACCESS(READ)

MQQUEUE — MQ Series queues
MQCONN — MQ Series connections

PROGRAM — Program access:
  Control who can execute specific programs
  RDEFINE PROGRAM PAYROLL UACC(NONE)
  PERMIT PAYROLL CLASS(PROGRAM) ID(PAYTEAM) ACCESS(READ)

OPERCMDS — Operator commands:
  Control who can issue system commands
  MVS.VARY.*, MVS.CANCEL.*, MVS.STOP.*

SDSF — SDSF access:
  Control SDSF panel access and job manipulation

RACF Commands for General Resources:
  RDEFINE class profile UACC(access)     ← Define a profile
  RALTER class profile ...                ← Modify a profile
  RDELETE class profile                   ← Delete a profile
  RLIST class profile ALL                 ← List a profile
  PERMIT profile CLASS(class) ID(id) ACCESS(level)
  SETROPTS CLASSACT(class)               ← Activate a class
  SETROPTS RACLIST(class) REFRESH        ← Refresh in-memory profiles

Class Activation:
  Before RACF protects a resource class, the class must be ACTIVE:
  SETROPTS CLASSACT(TCICSTRN)    ← Activate CICS transaction protection
  SETROPTS RACLIST(TCICSTRN)     ← Cache profiles in memory (performance)
  SETROPTS RACLIST(TCICSTRN) REFRESH ← Reload after changes`},{title:"RACF Auditing & Reporting",level:"Intermediate",content:`Auditing — Who Did What, When:

RACF maintains a comprehensive audit trail through SMF (System Management Facilities) records. This is critical for compliance, forensics, and security monitoring.

SMF Record Types for Security:
  Type 30 — Common address space work (job info)
  Type 80 — RACF processing records (the main audit records)
  Type 81 — RACF initialization statistics
  Type 83 — RACF event notifications

What RACF Logs:
  • Successful and failed logon attempts
  • Password changes and failures
  • Dataset access (successful and failed)
  • Resource access violations
  • RACF command execution
  • Profile changes (who changed what)
  • Group connections and disconnections

Audit Settings on Profiles:
  AUDIT keyword on dataset and general resource profiles:
  AUDIT(SUCCESS(READ))     — Log all successful reads
  AUDIT(FAILURES(READ))    — Log all failed read attempts
  AUDIT(ALL(READ))         — Log both successful and failed
  AUDIT(NONE)              — No auditing (default for most)

  Global Audit (cannot be overridden by profile owner):
  GLOBALAUDIT(ALL(UPDATE)) — System-wide audit of updates

SETROPTS Audit Controls:
  SETROPTS AUDIT(DATASET)        — Enable dataset auditing
  SETROPTS LOGOPTIONS(FAILURES)  — Log all access failures
  SETROPTS SAUDIT                — Audit SPECIAL user actions
  SETROPTS OPERAUDIT             — Audit OPERATIONS user actions

RACF Reports (DSMON):
  RACF Data Security Monitor generates reports:
  • Users with SPECIAL attribute (RACF admins)
  • Users with OPERATIONS attribute
  • Datasets without RACF protection
  • Users not connected to any group
  • Users with expired passwords
  • Group hierarchy report

IRRUT100 — RACF Database Unload:
  Unloads the RACF database to a flat file for custom reporting.
  Commonly used with DFSORT or SAS for analysis.

Compliance Requirements:
  PCI-DSS — Payment card industry security
  SOX — Sarbanes-Oxley financial controls
  HIPAA — Healthcare data protection
  GDPR — European data protection
  All require comprehensive audit trails that RACF provides.`},{title:"Digital Certificates & Encryption",level:"Advanced",content:`Modern Security — Certificates, TLS, and Encryption:

Modern mainframe security extends far beyond passwords and dataset profiles.

Digital Certificates on z/OS:
  RACF manages X.509 digital certificates for:
  • TLS/SSL communication (HTTPS, FTPS, secure connections)
  • Client authentication (certificate-based logon)
  • Code signing (verify program integrity)
  • S/MIME email encryption

  RACF Certificate Commands:
  RACDCERT GENCERT — Generate a self-signed certificate
  RACDCERT CERTAUTH — Define a Certificate Authority certificate
  RACDCERT CONNECT — Associate certificate with key ring
  RACDCERT ALTER — Modify certificate properties
  RACDCERT LIST — Display certificate details

  Key Rings:
  RACDCERT ADDRING(keyring-name) — Create a key ring
  Certificates are connected to key rings.
  Applications reference key rings to find their certificates.

z/OS Encryption:
  Data at Rest:
  • z/OS dataset encryption (RACF-managed keys)
  • DB2 native encryption
  • Pervasive encryption (encrypt everything)
  • Hardware crypto (CPACF — CP Assist for Cryptographic Function)

  Data in Transit:
  • AT-TLS (Application Transparent TLS)
  • Policy-based TLS without application changes
  • TLS 1.2/1.3 support
  • IBM Crypto Express cards for hardware acceleration

  Key Management:
  • ICSF (Integrated Cryptographic Service Facility)
  • PKDS (Public Key Data Set)
  • CKDS (Cryptographic Key Data Set)
  • TKDS (Token Key Data Set)

Multi-Factor Authentication (MFA):
  IBM Z MFA adds a second factor beyond passwords:
  • TOTP (time-based one-time passwords)
  • Certificate-based authentication
  • PIV/CAC smart cards
  • RADIUS integration
  • RSA SecurID tokens

  MFA protects against:
  • Stolen passwords
  • Brute force attacks
  • Credential sharing
  • Phishing attacks`},{title:"System-Level Security",level:"Advanced",content:`z/OS System Security — Protecting the Platform:

Beyond user access control, z/OS has system-level security features that protect the operating system itself.

SETROPTS — System-Wide Security Options:
  SETROPTS controls global RACF behavior:

  SETROPTS PASSWORD(INTERVAL(30))  — Password expires every 30 days
  SETROPTS PASSWORD(REVOKE(3))     — Revoke after 3 failed attempts
  SETROPTS PASSWORD(HISTORY(8))    — Remember last 8 passwords
  SETROPTS PASSWORD(MINCHANGE(1))  — Min 1 day between changes
  SETROPTS INITSTATS(DATASET)      — Initialize statistics
  SETROPTS AUDIT(DATASET)          — Audit dataset access
  SETROPTS PROTECTALL              — All datasets require profiles
  SETROPTS ERASE(ALL)              — Erase deleted dataset space

PROTECTALL:
  When active, RACF denies access to ANY dataset that doesn't have a profile.
  This is the highest security setting — nothing slips through.

Program Control:
  SETROPTS WHEN(PROGRAM)
  Controls which programs can run and from which libraries.
  Prevents execution of unauthorized programs.
  Libraries must be PROGRAM CONTROLLED.

APF Authorization:
  Authorized Program Facility — allows specific programs to run in
  supervisor state (privileged mode).
  Only APF-authorized programs can:
  • Issue privileged SVCs
  • Modify system control blocks
  • Access other address spaces
  APF libraries are defined in PROGxx member of SYS1.PARMLIB.

System Integrity:
  z/OS + System z hardware guarantees:
  • User programs CANNOT access kernel memory
  • User programs CANNOT bypass security checks
  • Each address space is completely isolated
  • Hardware keys protect storage
  This is why mainframes are trusted for the most sensitive workloads.

SMF Security:
  SMF records themselves must be protected:
  • Prevent tampering with audit logs
  • Restrict who can read SMF data
  • Archive SMF data securely for compliance

Security Health Checks:
  IBM Health Checker for z/OS includes security checks:
  • RACF database integrity
  • Expired certificates
  • Weak encryption settings
  • Missing dataset profiles
  • Users with excessive privileges`},{title:"ACF2 & Top Secret Overview",level:"Intermediate",content:`Alternative Security Products — ACF2 and Top Secret:

While RACF is the most common ESM, many shops use ACF2 or Top Secret. Understanding all three makes you more versatile.

ACF2 (Access Control Facility 2):

Philosophy: "Everything is denied unless explicitly permitted."
  (RACF's default is to ALLOW access if no profile exists, unless PROTECTALL is set.)

Key Concepts:
  • LOGONID (LID) — equivalent to RACF user ID
  • Access Rules — define who can access what
  • Resource Rules — protect non-dataset resources
  • Entry Source — where the user logs in from

ACF2 Rule Syntax:
  $KEY(PROD)                    ← HLQ being protected
  PAYROLL.- UID(PAYTEAM) R(A)  ← PAYTEAM can access all PROD.PAYROLL.*
  DEFAULT.- UID(*) PREVENT     ← Everyone else denied

ACF2 Advantages:
  • Default-deny is inherently more secure
  • Rule-based approach can be simpler for large environments
  • Centralized rule management

Top Secret (TSS):

Philosophy: Department-based security with strict compartmentalization.

Key Concepts:
  • ACID — Access Control ID (like RACF user ID)
  • Facility — A protected subsystem or environment
  • Profile — Access rights definition
  • Department — Organizational unit
  • Division — Higher-level org unit

TSS Command Syntax:
  TSS ADD(userid) NAME('Full Name') DEPT(dept)
  TSS PER(userid) DSN(PROD.PAYROLL.**) ACC(READ)
  TSS REV(userid)   ← Revoke user

TSS Advantages:
  • Strong compartmentalization (need-to-know basis)
  • Ownership model (each department manages its own security)
  • Good for government/defense with strict classification

Comparing ESMs:
  Feature      RACF           ACF2            Top Secret
  ──────────────────────────────────────────────────────
  Default      Allow*         Deny            Deny
  Model        Profile-based  Rule-based      Dept-based
  Vendor       IBM            Broadcom        Broadcom
  z/OS bundle  Yes            No (separate)   No (separate)
  Market share ~70%           ~15%            ~15%

  * RACF allows if no profile exists; ACF2/TSS deny by default.
    RACF with PROTECTALL=ON also denies by default.`},{title:"Security Interview Questions",level:"All Levels",content:`RACF/Security Interview Questions — 20+ Q&A.

Q: What is RACF?
A: Resource Access Control Facility — z/OS security subsystem. Controls who can access what. Alternatives: ACF2, Top Secret.

Q: What are the three pillars of RACF?
A: Users (ADDUSER), Groups (ADDGROUP), Resources (dataset profiles, general resource profiles). Connect users to groups, permit access to resources.

Q: What is a RACF profile?
A: Definition of access rules. Discrete profiles (one dataset) or Generic profiles (pattern matching with * and %).

Q: What access levels does RACF provide?
A: NONE, READ, UPDATE, CONTROL, ALTER (highest). ALTER includes all others.

Q: What is a RACF group?
A: Collection of users. Used for managing access. Users connect to groups. One group is the default group.

Q: How do you give a user access to a dataset?
A: PERMIT 'dataset.name' ID(userid) ACCESS(READ). Or through group membership.

💡 Study Tip: Know ADDUSER, PERMIT, LISTDSD, and profile types.`},{title:"RACF & Security Cheat Sheet",level:"All Levels",content:`RACF Quick Reference — Cheat Sheet

═══ COMMANDS ═══
ADDUSER userid NAME('name') DFLTGRP(group) PASSWORD(pass)
ALTUSER userid NAME('new name') RESUME
DELUSER userid
CONNECT userid GROUP(group) AUTH(USE/CREATE/CONNECT/JOIN)
PERMIT 'profile' ID(userid/group) ACCESS(READ/UPDATE/ALTER)
LISTUSER userid ALL
LISTDSD DA('dataset') ALL
SEARCH FILTER(pattern)

═══ ACCESS LEVELS ═══
NONE → READ → UPDATE → CONTROL → ALTER`}]},Ho={id:"tso",icon:"🖥️",title:"TSO / ISPF",subtitle:"z/OS Interactive Environment",color:"#14b8a6",level:"Beginner → Expert",description:"The interactive command shell and editor of z/OS. Every mainframe developer's daily workspace.",sections:[{title:"Introduction to TSO & ISPF",level:"Beginner",content:`TSO (Time Sharing Option) and ISPF (Interactive System Productivity Facility) are the primary interactive interfaces on z/OS.

TSO — The Command Shell:
  TSO is z/OS's interactive command processor. Think of it as the mainframe equivalent of a Unix shell or Windows command prompt. TSO allows users to:
  • Execute commands interactively
  • Edit datasets
  • Submit batch jobs
  • Manage files and catalogs
  • Run programs and REXX scripts
  • Access system utilities

ISPF — The Full-Screen Interface:
  ISPF runs on top of TSO and provides a full-screen panel-driven interface. It's the "desktop" of the mainframe — where developers spend most of their day.

  ISPF provides:
  • A powerful text editor (option 2)
  • Dataset management utilities (option 3)
  • Job submission and output viewing
  • Search and compare tools
  • Customizable panels and dialogs
  • SDSF integration for job monitoring

How to Connect:
  Users connect to z/OS via a 3270 terminal emulator:
  • IBM Personal Communications (PCOMM)
  • Mocha TN3270 (Mac)
  • x3270 (Linux/Mac open source)
  • wc3270 (Windows open source)
  • Zowe Terminal (modern)
  • Vista TN3270 (popular)

  Connection: TN3270 to the z/OS TCP/IP address on port 23 (or custom port).
  You see the TSO logon screen → enter user ID and password → ISPF starts.

The 3270 Screen:
  The 3270 terminal is a block-mode terminal:
  • You type into fields on the screen
  • Press ENTER to send the entire screen to z/OS
  • The screen refreshes with the response
  • Function keys (PF keys) invoke specific actions

  Key PF Keys:
  PF1  — Help
  PF3  — Exit/End (go back)
  PF5  — Find (in editor)
  PF7  — Scroll Up
  PF8  — Scroll Down
  PF10 — Scroll Left
  PF11 — Scroll Right
  PF12 — Cancel/Retrieve`},{title:"ISPF Primary Option Menu",level:"Beginner",content:`ISPF Primary Option Menu:

When you log in, ISPF displays the Primary Option Menu:

  ┌──────────────────────────────────────────────┐
  │  Menu  Utilities  Compilers  Options  Status │
  │ ─────────────────────────────────────────────│
  │  0  Settings      Terminal and user settings │
  │  1  View          Display source data        │
  │  2  Edit          Create or change source    │
  │  3  Utilities     Dataset/file utilities      │
  │  4  Foreground    Interactive processing      │
  │  5  Batch         Submit jobs for processing  │
  │  6  Command       Enter TSO/ISPF commands     │
  │  7  Dialog Test   Test ISPF dialog panels     │
  │  8  LM Utilities  Library management         │
  │  9  IBM Products  IBM application aids        │
  │  10 SCLM          SW Config Library Mgr      │
  │  11 Workplace     ISPF Object Workplace      │
  │  SD SDSF          System Display & Search    │
  │  M  More          Additional ISPF options     │
  │ ─────────────────────────────────────────────│
  │ Option ===> _                                │
  └──────────────────────────────────────────────┘

Most Used Options:

Option 2 — EDIT (where developers live):
  Edit PDS members, sequential files, any text dataset.
  Full-screen editor with line commands and primary commands.

Option 3 — UTILITIES:
  3.1 — Library display (browse PDS directory)
  3.2 — Dataset allocate (create new datasets)
  3.3 — Move/Copy (copy members between PDS)
  3.4 — Dataset list (DSLIST — most used utility!)
  3.5 — Reset Statistics
  3.6 — Hardcopy
  3.7 — Merge datasets
  3.8 — Outlist (view job output)

Option 3.4 — DSLIST (Dataset List):
  The most-used ISPF utility. Enter a dataset pattern:
  DSNAME LEVEL ===> PROD.PAYROLL
  Shows all matching datasets with line commands:
  E — Edit    V — View    B — Browse
  D — Delete  R — Rename  I — Info    M — Member list

SDSF (System Display and Search Facility):
  Usually accessed from the ISPF menu as option "SD" or "S".
  The primary tool for monitoring jobs and viewing output.`},{title:"ISPF Editor",level:"Beginner",content:`ISPF Editor — The Mainframe Developer's Best Friend:

The ISPF editor is where you write code, edit JCL, modify data files, and do most of your daily work.

Entering the Editor:
  Option 2 from ISPF menu:
  ISPF LIBRARY:
    Project  ===> MY
    Group    ===> COBOL
    Type     ===> SOURCE
    Member   ===> PAYROLL    (blank for member list)

  Or OTHER DATASET:
    Data Set Name ===> 'PROD.COBOL.SOURCE(PAYROLL)'

Primary Commands (typed on the command line):
  FIND text     — Search for text (F text)
  CHANGE a b    — Replace text (C old new ALL)
  SAVE          — Save changes
  CANCEL        — Discard changes and exit
  SUBMIT        — Submit JCL for execution
  COPY          — Copy from another dataset
  MOVE          — Move from another dataset
  SORT           — Sort lines
  RESET         — Clear all line commands
  COLS          — Show column ruler
  HEX ON/OFF    — Toggle hexadecimal display
  HILITE JCL    — Syntax highlighting for JCL
  HILITE COBOL  — Syntax highlighting for COBOL
  PROFILE       — Show editor profile settings
  BOUNDS        — Set left/right edit boundaries
  NUM ON/OFF    — Toggle line numbers
  UNDO          — Undo last change

Line Commands (typed in the line number area):
  I   — Insert a blank line (I5 = insert 5 lines)
  D   — Delete line (D5 = delete 5 lines, DD/DD = block delete)
  C   — Copy line (CC/CC = block copy, then A or B to place)
  M   — Move line (MM/MM = block move, then A or B to place)
  R   — Repeat line (R5 = repeat 5 times, RR/RR = block repeat)
  A   — After (paste copied/moved lines after this line)
  B   — Before (paste copied/moved lines before this line)
  O   — Overlay (merge lines)
  X   — Exclude (hide lines)
  S   — Show (unhide excluded lines)
  TE  — Text Entry (enter multi-line text)
  TF  — Text Flow (reformat paragraph)
  TS  — Text Split (break line at cursor position)
  >   — Shift right (>5 = shift 5 columns)
  <   — Shift left (<5 = shift 5 columns)
  UC  — Uppercase
  LC  — Lowercase

FIND and CHANGE — Power Features:
  F 'PERFORM' 1 72      — Find only in columns 1-72
  F 'SECTION' NEXT      — Find next occurrence
  F 'ERROR' ALL         — Find all and count
  F 'MOVE' FIRST        — Find first occurrence
  F P'¬' 1 72           — Find non-blank (picture string)
  C 'OLD' 'NEW' ALL     — Change all occurrences
  C 'OLD' 'NEW' ALL NX  — Change all, not excluded lines
  C 'A' 'B' 10 20       — Change only in columns 10-20`},{title:"TSO Commands",level:"Intermediate",content:`TSO Commands — The z/OS Command Line:

TSO commands can be entered from ISPF option 6, the TSO READY prompt, or the ISPF command line (prefixed with TSO).

Dataset Commands:
  ALLOCATE — Create/allocate a dataset
    ALLOC DA('MY.NEW.FILE') NEW CATALOG -
      SPACE(10,5) TRACKS -
      RECFM(F B) LRECL(80) BLKSIZE(0)

  FREE — Release (deallocate) a dataset
    FREE DA('MY.FILE')

  DELETE — Delete a dataset
    DELETE 'MY.OLD.FILE'

  RENAME — Rename a dataset
    RENAME 'MY.OLD.NAME' 'MY.NEW.NAME'

  LISTDS — List dataset information
    LISTDS 'MY.FILE' STATUS MEMBERS
    Shows: DSORG, RECFM, LRECL, BLKSIZE, volumes, members

  LISTCAT — List catalog entry
    LISTCAT ENTRIES('MY.FILE') ALL

File Transfer:
  IND$FILE — Transfer files to/from PC
    Used through 3270 emulator file transfer function.
    From PC to mainframe: "send" command
    From mainframe to PC: "receive" command

Program Execution:
  CALL 'MY.LOADLIB(MYPROG)'  — Execute a program
  EXEC 'MY.REXX.LIB(MYSCRIPT)' — Run a REXX exec
  SUBMIT 'MY.JCL.LIB(MYJOB)'  — Submit JCL

System Information:
  LISTUSER        — Display your RACF user profile
  TIME            — Display system time
  STATUS          — Show active jobs for your user ID
  SEND 'message' USER(userid)  — Send message to another user
  PROFILE         — Display/change TSO profile settings

ISPF Commands (from command line):
  TSO LISTDS 'MY.FILE'  — Run TSO command from ISPF
  =3.4                   — Jump to ISPF option 3.4
  =SD                    — Jump to SDSF
  START 2                — Open second edit session (split screen)
  SWAP                   — Switch between split screen sessions
  KEYS                   — Define PF key assignments
  CUT / PASTE            — Clipboard operations`},{title:"SDSF — Job Monitoring",level:"Beginner",content:`SDSF (System Display and Search Facility):

SDSF is the essential tool for monitoring batch jobs and viewing their output. Every mainframe developer uses SDSF daily.

Accessing SDSF:
  From ISPF: Enter "SD" or "S" on the command line (installation-dependent)
  Or navigate through the ISPF menu to the SDSF option.

Main SDSF Panels:
  DA  — Display Active (currently running jobs)
  I   — Input Queue (jobs waiting to execute)
  O   — Output Queue (completed, output available)
  H   — Held Output Queue
  ST  — Status (all jobs — most comprehensive view)
  LOG — System Log (console messages)
  SYSLOG — System Log (permanent)
  SE  — Scheduler Environment
  PR  — Printers
  INIT — Initiators

Using ST (Status) Panel:
  Command ===> ST
  PREFIX ===> userid*    ← Show only your jobs (or * for all)
  OWNER  ===> *          ← Filter by owner

  Job list shows: JOBNAME, JOBID, OWNER, PRTY, C (class), STATUS, RC
  Status values: ACTIVE, INPUT, OUTPUT, HELD

Line Commands on Job List:
  S   — Select (view job output — JESMSGLG, JESJCL, JESYSMSG, sysout)
  ?   — View JCL that was submitted
  P   — Purge (delete job and all output)
  C   — Cancel (stop a running job)
  H   — Hold output
  A   — Release held output
  SJ  — Submit JCL from output
  SE  — View extended job info

Viewing Job Output (after selecting with S):
  JESMSGLG — JES message log (timestamps, job status)
  JESJCL   — Expanded JCL (with PROC expansion)
  JESYSMSG — System messages (allocation, return codes, abend info)
  SYSPRINT — Program output (your application's print)
  SYSOUT   — Other program output

  Navigation in output:
  PF7/PF8  — Scroll up/down
  PF10/PF11 — Scroll left/right
  FIND text — Search within output
  BOTTOM    — Go to end
  TOP       — Go to beginning

Finding Errors:
  1. Check RC (return code) on ST panel
  2. Select the job → go to JESYSMSG
  3. Search for "IEF" messages (allocation/deallocation)
  4. Search for "ICH" messages (security violations)
  5. Check SYSPRINT for program-specific errors
  6. Check SYSUDUMP/SYSABEND for dump information`},{title:"Dataset Utilities (3.x)",level:"Intermediate",content:`ISPF Utilities — Dataset Management:

ISPF Option 3 provides utilities for creating, copying, and managing datasets.

3.1 — Library Utility:
  Display and manage PDS members.
  Enter a PDS name → see member list with statistics:
  Name, VV.MM (version), Created, Changed, Size, Init, Mod, ID

3.2 — Dataset Allocate:
  Create new datasets:
  Data Set Name: MY.NEW.DATASET
  Management class: (SMS)
  Storage class:    (SMS)
  Volume serial:    (or SMS-managed)
  Space units:      TRACKS / CYLINDERS / KILOBYTES
  Primary quantity:  100
  Secondary:         50
  Directory blocks:  20  (for PDS)
  Record format:     FB
  Record length:     80
  Block size:        0  (system-determined)
  Data set type:     PDS / PDSE / Sequential

3.3 — Move/Copy:
  Copy or move members between PDS:
  From: MY.SOURCE.LIB
  To:   MY.TARGET.LIB
  Options: Copy, Move, Replace existing members

3.4 — Dataset List (DSLIST):
  The most powerful utility. Enter a DSN pattern:
  DSNAME LEVEL ===> MY.**
  
  Shows all matching datasets with actions:
  Line Commands:
    E — Edit             V — View (read-only)
    B — Browse           D — Delete
    R — Rename           I — Dataset Information
    M — Member list      S — Short info
    C — Catalog info     X — Print index
    Z — Compress PDS     = — Repeat last action

  Member List (from M command on a PDS):
  Shows all members with line commands:
    E — Edit member      V — View member
    B — Browse           D — Delete member
    R — Rename           S — Select
    C — Copy             P — Print

3.5 — Reset Statistics:
  Reset ISPF statistics on PDS members.

3.6 — Hardcopy:
  Print datasets to SYSOUT.

Dataset Information (I command):
  Shows comprehensive details:
  DSORG, RECFM, LRECL, BLKSIZE, creation date,
  expiration date, volumes, extents, used tracks,
  SMS classes, catalog information.`},{title:"ISPF Edit Macros",level:"Advanced",content:`Edit Macros — Automating Editor Tasks:

ISPF edit macros are REXX (or CLIST) programs that automate repetitive editing tasks. They're incredibly powerful productivity tools.

How Edit Macros Work:
  1. Write a REXX program that uses ISREDIT commands
  2. Store it in a SYSPROC or SYSEXEC library
  3. Invoke it from the ISPF editor command line

Basic Edit Macro Structure:
  /* REXX - Edit macro to add standard header */
  ADDRESS ISREDIT
  "MACRO"                     /* Declare this as a macro */
  "ISREDIT (MEMBER) = MEMBER" /* Get member name */
  "ISREDIT LINE_BEFORE 1 = MSGLINE '* ═══════════════════'"
  "ISREDIT LINE_BEFORE 1 = MSGLINE '* Program: '"member
  "ISREDIT LINE_BEFORE 1 = MSGLINE '* Date:    '"date()
  "ISREDIT LINE_BEFORE 1 = MSGLINE '* ═══════════════════'"
  EXIT

ISREDIT Commands (used in macros):
  Navigation:
    ISREDIT CURSOR = row col    — Position cursor
    ISREDIT (r,c) = CURSOR      — Get cursor position
    ISREDIT LOCATE label        — Go to a label

  Line Operations:
    ISREDIT LINE n = text       — Set line content
    ISREDIT (text) = LINE n     — Get line content
    ISREDIT LINE_BEFORE n = DATALINE text — Insert before
    ISREDIT LINE_AFTER n = DATALINE text  — Insert after
    ISREDIT DELETE n            — Delete line n
    ISREDIT (last) = LINENUM .ZLAST — Get last line number

  Find/Change:
    ISREDIT FIND text           — Find text
    ISREDIT CHANGE old new ALL  — Replace text
    ISREDIT (count) = FIND_COUNTS — Get find count

  Data Info:
    ISREDIT (member) = MEMBER   — Get member name
    ISREDIT (dsn) = DATASET     — Get dataset name
    ISREDIT (changed) = DATA_CHANGED — Was data modified?

Practical Edit Macro Examples:
  • ADDHEADER — Add standard program header
  • FIXCOLS — Fix column alignment in COBOL
  • FINDDUP — Find duplicate lines
  • LINEUP — Align COBOL VALUE clauses
  • XCOUNT — Count excluded lines
  • COMPARE — Compare with another member
  • NUMBER — Renumber COBOL sequence numbers`},{title:"Split Screen & Productivity",level:"Intermediate",content:`Power User Techniques:

Split Screen:
  ISPF supports up to 8 simultaneous screens:
  PF2  — Split screen at cursor position
  PF9  — Swap between split screens
  Or: SPLIT command, SWAP command

  Why split screen matters:
  • Edit COBOL in top half, view COPYBOOK in bottom
  • Edit JCL in one, check SDSF job output in other
  • Compare two files side by side
  • Browse documentation while coding

Command Stacking:
  Execute multiple ISPF options in sequence:
  =3.4;=2;=SD  — Jump to DSLIST, then Edit, then SDSF
  Semicolons separate commands.

Clipboard:
  CUT — Copy selected lines to clipboard
  PASTE — Paste from clipboard
  Works across split screens and even between datasets.

Dataset Name Shortcuts:
  When entering DSN, the system adds your prefix:
  If TSO prefix is USER01:
    Entering: COBOL.SOURCE → resolves to USER01.COBOL.SOURCE
    Entering: 'PROD.COBOL.SOURCE' → resolves exactly (quotes = fully qualified)

ISPF Tables and Settings:
  Use Option 0 to customize:
  • PF key assignments
  • Terminal type
  • Log/List dataset
  • Screen format

Bookmarks (Member Lists):
  In 3.4, you can save frequently-used DSN patterns.
  Create personal PDS member lists for quick navigation.

Batch from ISPF:
  You don't need to leave ISPF to submit jobs:
  1. Edit your JCL
  2. Type SUBMIT on command line (or SUB)
  3. Switch to SDSF to monitor
  4. Check output
  All without leaving the editor.

ISPF Command Table:
  Customize ISPF with your own commands:
  In the ISPF Command Table (option 3.9 or similar):
  Add shortcuts like:
    SS → SDSF
    ED → EDIT 'MY.COBOL.SOURCE'
    JL → EDIT 'MY.JCL.LIB'`},{title:"TSO/ISPF Interview Questions",level:"All Levels",content:`TSO/ISPF Interview Questions — 20+ Q&A.

Q: What is TSO?
A: Time Sharing Option — z/OS interactive command facility. Users log on to TSO, then typically enter ISPF.

Q: What is ISPF?
A: Interactive System Productivity Facility — panel-driven interface. Options: 1=View, 2=Edit, 3=Utilities, 3.4=Dataset list, 6=Command, S=SDSF.

Q: How do you submit JCL from ISPF?
A: Open in editor (option 2), type SUB on command line. Or TSO SUBMIT 'dataset(member)'.

Q: What is SDSF?
A: System Display and Search Facility — monitor jobs. DA=active, ST=output, I=input. Line commands: S=browse, P=purge, C=cancel.

Q: How do you allocate a dataset in TSO?
A: ALLOC DA('name') NEW SPACE(10,5) TRACKS RECFM(F B) LRECL(80). Or use ISPF 3.2.

Q: What are ISPF edit commands?
A: C/CC=copy, M/MM=move, D/DD=delete, R/RR=repeat, I=insert. Command line: F/FIND, C/CHANGE, SAVE, SUBMIT, RESET.

💡 Study Tip: Know ISPF options (1-6), edit line commands, and SDSF panels.`},{title:"TSO / ISPF Cheat Sheet",level:"All Levels",content:`TSO/ISPF Quick Reference — Cheat Sheet

═══ ISPF OPTIONS ═══
1 — Browse      2 — Edit        3 — Utilities
3.4 — Dataset list  6 — TSO command  S — SDSF

═══ EDIT LINE COMMANDS ═══
I — Insert after    C/CC — Copy    M/MM — Move
D/DD — Delete       R/RR — Repeat  ) — Shift right
( — Shift left      COLS — Show columns

═══ EDIT PRIMARY COMMANDS ═══
F 'text' — Find        C 'old' 'new' ALL — Change
SAVE — Save            SUB — Submit
RES — Reset            UNDO — Undo
HI OFF — Remove highlighting

═══ SDSF PANELS ═══
DA — Active jobs   ST — Output   I — Input
H — Held output    LOG — System log
PREFIX userid* — Filter jobs`}]},Xo={id:"modernization",icon:"🔀",title:"Modernization",subtitle:"IBM Z Modernization Strategies",color:"#a855f7",level:"All Levels",description:"The future of mainframe is hybrid, API-first, and DevOps-enabled. Modernize without migration risk.",sections:[{title:"Modernization Landscape",level:"Beginner",content:`Mainframe modernization is the #1 strategic initiative at most large enterprises. But "modernization" means very different things to different stakeholders.

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
  • Neglecting skills — modernize people, not just technology`},{title:"API-First with z/OS Connect",level:"Intermediate",content:`z/OS Connect — Expose Mainframe as RESTful APIs:

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
  • API gateway integration (IBM API Connect, Apigee, Kong)`,code:`// Example: Calling a mainframe CICS program via REST API
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
// The 40-year-old COBOL program processes it without knowing it came from a REST API`},{title:"DevOps & CI/CD on z/OS",level:"Intermediate",content:`DevOps for Mainframe — Modern Development Practices:

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
  Artifactory      — Binary repository for load modules`,code:`# Ansible playbook for z/OS deployment
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
      when: test_result.jobs[0].ret_code.code == 0`},{title:"Zowe & Modern Tooling",level:"Intermediate",content:`Zowe — The Open Source Mainframe Framework:

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
  Look for the Zowe Conformant badge on vendor products`,code:`# ─── Zowe CLI Examples ────────────────────────────────

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
# }`},{title:"z/OS Container Extensions (zCX)",level:"Advanced",content:`zCX — Run Docker Containers on z/OS:

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
  • Requires z/OS 2.4+ and z15 or z16 hardware`,code:`# ─── zCX Docker Commands (from z/OS USS or SSH) ──────

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
docker logs api-gateway --follow`},{title:"Hybrid Cloud Integration",level:"Advanced",content:`Hybrid Cloud — Connecting Mainframe to Cloud:

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
   • Compliance: data residency requirements`},{title:"COBOL Modernization Techniques",level:"Intermediate",content:`Modernizing COBOL Code — Practical Approaches:

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
   Test in parallel with production — "virtual environment"`},{title:"Linux on IBM Z",level:"Intermediate",content:`Linux on Z — Open Source Meets Enterprise:

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
   • 99.999%+ availability architecture`},{title:"SMF & Performance Monitoring",level:"Advanced",content:`SMF (System Management Facilities) — z/OS Telemetry:

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
  Grafana dashboards with z/OS metrics`},{title:"PROCs & DFSORT Mastery",level:"Intermediate",content:`PROCs and Utilities — Production Workhorses:

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
  • Test with TYPRUN=SCAN before production use`,code:`//* ─── ICETOOL: Join two files (like SQL JOIN) ─────────
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
//SYSOUT   DD SYSOUT=*`},{title:"SMP/E — System Modification Program",level:"Advanced",content:`SMP/E (System Modification Program/Extended):

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
  7. ACCEPT — permanent installation into DLIBs`},{title:"Mainframe Skills & Career Path",level:"All Levels",content:`Mainframe Career — High Demand, High Reward:

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
  • This website — Mainframe OS Hub!`},{title:"Interview Questions",level:"All Levels",content:`Modernization Interview Questions — 15+ Q&A.

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

💡 Study Tip: Know Zowe, z/OS Connect, API Mediation Layer, and DevOps pipeline concepts.`},{title:"Modernization Cheat Sheet",level:"All Levels",content:`Modernization Quick Reference

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
UI Modernization — Replace 3270 with web`},{title:"Interview Questions — Modernization",level:"All Levels",content:`Modernization Interview Questions:

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
A: SMP/E is the software lifecycle manager for z/OS. It handles installation and maintenance of all z/OS products and fixes. Key commands: RECEIVE (download fixes), APPLY CHECK (verify prerequisites), APPLY (install), ACCEPT (permanent). It tracks all software in a CSI database and manages dependencies between fixes.`}]},Vo={id:"linuxonz",icon:"🐧",title:"Linux on Z",subtitle:"Open Source on IBM Z Hardware",color:"#f59e0b",level:"All Levels",description:"Enterprise Linux powered by mainframe hardware — the best of both worlds for cloud-native workloads.",sections:[{title:"Introduction to Linux on Z",level:"Beginner",content:`Linux on IBM Z combines the open-source Linux ecosystem with the legendary reliability, security, and I/O throughput of IBM Z hardware.

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
  Multi-arch images work automatically (docker pull detects s390x).`},{title:"z/VM Virtualization",level:"Intermediate",content:`z/VM — The Most Efficient Hypervisor:

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
    SMAPI — Systems Management API`},{title:"Installing Linux on Z",level:"Intermediate",content:`Installing Linux on IBM Z — Step by Step:

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
  • Architecture: s390x (similar to but different from x86_64)`},{title:"Red Hat OpenShift on Z",level:"Advanced",content:`OpenShift on IBM Z — Enterprise Kubernetes:

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
  Custom operators for mainframe-specific workloads`},{title:"Networking on Linux on Z",level:"Intermediate",content:`Networking — Connecting Linux on Z:

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
  ONBOOT=yes`},{title:"Storage on Linux on Z",level:"Intermediate",content:`Storage — DASD and FCP/SCSI:

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
  • zHyperLink — ultra-low latency DASD access`},{title:"Performance & Crypto",level:"Advanced",content:`Performance Tuning & Hardware Crypto on Linux on Z:

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
  • Enable zEDC compression for Db2 and large datasets`},{title:"Ansible for z/OS & Linux on Z",level:"Intermediate",content:`Ansible Automation for IBM Z:

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
  6. Disaster Recovery: Automated failover procedures`,code:`# ─── Ansible Playbook: Configure Linux on Z ──────────
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
        state: restarted`},{title:"Interview Questions",level:"All Levels",content:`Linux on Z Interview Questions — 15+ Q&A.

Q: What is Linux on Z?
A: Linux running on IBM Z hardware, either natively in an LPAR or as a guest under z/VM. Combines Linux flexibility with Z reliability.

Q: What is z/VM?
A: Virtualization hypervisor for IBM Z. Runs hundreds/thousands of Linux guests efficiently. Each guest gets virtual hardware.

Q: Why run Linux on Z instead of x86?
A: Consolidation (hundreds of Linux instances on one box), I/O throughput, crypto hardware, 99.999% availability, co-location with z/OS data.

Q: What is an LPAR vs z/VM guest?
A: LPAR = hardware partition (dedicated resources). z/VM guest = software virtualization (shared resources, more flexible).

💡 Study Tip: Know z/VM, LPAR, consolidation benefits, and hybrid architecture concepts.`},{title:"Linux on Z Cheat Sheet",level:"All Levels",content:`Linux on Z Quick Reference

═══ DEPLOYMENT OPTIONS ═══
Native LPAR — Dedicated hardware partition
z/VM Guest — Virtualized (most common)
KVM — Linux KVM on Z

═══ KEY ADVANTAGES ═══
Consolidation, I/O throughput, crypto hardware, co-location with z/OS, 99.999% availability`},{title:"Interview Questions — Linux on Z",level:"All Levels",content:`Linux on Z Interview Questions:

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
A: Two levels: (1) CPACF — built into every processor, provides AES, SHA, DES at no additional cost. OpenSSL/libica use it automatically. (2) Crypto Express — dedicated co-processor for RSA operations and secure key management (HSM). Together they enable "Pervasive Encryption" — encrypting all data at rest (LUKS/dm-crypt) and in transit (TLS) with zero performance impact.`}]},jo={id:"smf",icon:"📊",title:"SMF & Performance",subtitle:"Monitoring, Measurement & Tuning",color:"#06b6d4",level:"Intermediate → Expert",description:"Every z/OS event generates telemetry. SMF records are the goldmine for performance analysis and capacity planning.",sections:[{title:"Introduction to SMF",level:"Intermediate",content:`SMF (System Management Facilities) is z/OS's built-in instrumentation system. Every significant event on z/OS generates an SMF record — from job execution to dataset access, security events, DB2 activity, and CICS transactions.

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
  • Problem determination: may need to temporarily enable more types`},{title:"Key SMF Record Types",level:"Intermediate",content:`SMF Record Types — Essential Reference:

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
  Type 89  — Product usage (for licensing)`},{title:"WLM — Workload Manager",level:"Advanced",content:`WLM (Workload Manager) — z/OS Performance Control:

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
  WLM figures out the resource allocation automatically`},{title:"RMF — Resource Measurement Facility",level:"Advanced",content:`RMF (Resource Measurement Facility):

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
  • Path busy analysis`},{title:"Batch Performance Tuning",level:"Advanced",content:`Batch Job Performance Tuning:

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
  z/OS Parallel Sysplex for cross-system parallelism`},{title:"CICS Performance Monitoring",level:"Advanced",content:`CICS Performance — Response Time Analysis:

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
  7. CICS MRO/ISC — cross-region workload balancing`},{title:"Capacity Planning",level:"Expert",content:`Capacity Planning — Right-Sizing IBM Z:

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
  Broadcom MICS — capacity and performance analysis`},{title:"IFASMFDP & SMF Processing",level:"Intermediate",content:`Processing SMF Data — From Raw Records to Insight:

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
  Feed dashboards for real-time visibility`,code:`//* ─── DUMP SMF RECORDS ────────────────────────────────
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
/*`},{title:"Interview Questions",level:"All Levels",content:`SMF/Performance Interview Questions — 15+ Q&A.

Q: What is SMF?
A: System Management Facilities — z/OS recording system that collects performance and accounting data as SMF records.

Q: What are common SMF record types?
A: Type 30 (job/step info), Type 14/15 (dataset activity), Type 42 (storage), Type 70-79 (RMF), Type 89 (registry), Type 101 (DB2).

Q: What is RMF?
A: Resource Measurement Facility — real-time performance monitor. Monitor I, II, III for different perspectives.

Q: How do you identify a performance problem?
A: Check CPU usage (RMF), I/O rates (SMF 14/15), paging (SMF 71), DB2 wait times (SMF 101), batch elapsed vs CPU time.

Q: What is WLM?
A: Workload Manager — assigns goals to workloads, manages priorities automatically based on service class definitions.

💡 Study Tip: Know SMF record types 14/15/30, RMF monitors, and basic WLM concepts.`},{title:"SMF & Performance Cheat Sheet",level:"All Levels",content:`SMF/Performance Quick Reference

═══ KEY SMF RECORDS ═══
14/15 — Dataset activity (open/close)
30    — Job/step accounting
42    — SMS storage group
70-79 — RMF performance data
89    — Security/registry
100   — DB2 accounting
101   — DB2 performance

═══ PERFORMANCE METRICS ═══
CPU% — Processor usage      I/O Rate — Disk operations
Paging — Virtual memory     Response — Transaction time`},{title:"Interview Questions — Performance",level:"All Levels",content:`Performance & SMF Interview Questions:

Q: What is an SMF record and why is it important?
A: SMF (System Management Facilities) records are z/OS event logs generated automatically for significant system events. Each record type captures specific data: Type 30 for job/step info, Type 80 for security, Type 100-102 for DB2, Type 110 for CICS. They're essential for performance analysis, capacity planning, billing, security auditing, and troubleshooting.

Q: Explain WLM goals and how they work.
A: WLM (Workload Manager) uses performance goals to dynamically allocate resources. Goal types: Response Time (target average or percentile for online work), Velocity (percentage of time work is not delayed, for batch), and Discretionary (no goal, uses leftover resources). WLM monitors actual performance against goals and adjusts CPU priority, memory allocation, and I/O priority automatically. You define WHAT performance you want, WLM figures out HOW.

Q: How would you diagnose a batch job running slower than expected?
A: 1) Check SMF Type 30 for CPU time vs elapsed time. If CPU/elapsed is near 1.0, it's CPU-bound. If much less, check I/O. 2) Check EXCP counts — high EXCP may indicate poor BLKSIZE or too many small I/Os. 3) Check for enqueue waits (dataset contention). 4) Review SDSF output for S322 (CPU timeout) or SB37 (space). 5) Compare to baseline — has anything changed in data volume, program logic, or system configuration?

Q: What is the difference between RMF Monitor I, II, and III?
A: Monitor I collects data at intervals (15 min) to SMF for long-term trend analysis and capacity planning. Monitor II provides real-time interactive display via TSO for immediate problem diagnosis. Monitor III provides detailed per-address-space data for analyzing individual job performance. Use I for reporting, II for firefighting, III for deep analysis.

Q: How does MSU-based pricing work?
A: IBM z/OS software pricing (MLC) is based on the Rolling 4-Hour Average (R4HA) of MSU (Million Service Units) consumption. The system records MSU usage every 5 minutes, calculates the highest rolling 4-hour average, and software charges are based on this peak. This incentivizes spreading workloads to avoid peaks — batch scheduling, zIIP offload, and WLM tuning all reduce the R4HA and thus software costs.`}]},zo={id:"procs",icon:"📋",title:"PROCs & Utilities",subtitle:"JCL PROCs, DFSORT, ICETOOL, Utilities",color:"#ef4444",level:"Beginner → Expert",description:"Production JCL is built on reusable procedures and powerful utilities. Master them and you can automate anything.",sections:[{title:"Understanding JCL PROCs",level:"Beginner",content:`JCL Procedures (PROCs) — Reusable JCL Templates:

A PROC is a pre-defined set of JCL statements stored in a library that can be invoked by multiple jobs. PROCs are fundamental to standardized, maintainable production JCL.

Types of PROCs:
  1. Catalogued PROC — stored as a member in a PROCLIB (procedure library)
  2. In-stream PROC — defined within the job itself (between PROC and PEND)

Why PROCs Are Essential:
  • Write once, use everywhere — reduce JCL duplication
  • Standardize processing — all jobs use the same tested procedure
  • Simplify maintenance — change one PROC, affect all using jobs
  • Parameterize — symbolic parameters allow customization per call
  • Enforce standards — PROCs can include required DD statements

PROC Libraries:
  Default: SYS1.PROCLIB (system procedures)
  Custom: company-defined PROCLIB datasets
  JCLLIB ORDER= specifies additional search libraries
  z/OS searches: in-stream → JCLLIB → default PROCLIBs

Symbolic Parameters:
  Variables that get replaced when the PROC is called
  &PARAM — user-defined symbolic (1-8 chars)
  &SYSUID — system symbolic (submitter's TSO ID)
  Defaults set in PROC statement or SET statement
  Overridden on EXEC statement: //STEP EXEC MYPROC,PARAM=value`,code:`//* ═══ IN-STREAM PROC ════════════════════════════════════
//MYPROC  PROC HLQ=USER01,ENV=TEST,PGM=MYPROG
//*
//STEP1    EXEC PGM=&PGM,REGION=64M
//STEPLIB  DD DSN=&HLQ..&ENV..LOADLIB,DISP=SHR
//INPUT    DD DSN=&HLQ..&ENV..INPUT,DISP=SHR
//OUTPUT   DD DSN=&HLQ..&ENV..OUTPUT,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE),
//            DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//SYSPRINT DD SYSOUT=*
//SYSOUT   DD SYSOUT=*
//*
//        PEND
//*
//* ═══ CALLING THE PROC ═══════════════════════════════
//MYJOB   JOB ,'PROC DEMO',CLASS=A,NOTIFY=&SYSUID
//*
//* Call with defaults (TEST environment)
//TESTRUN  EXEC MYPROC
//*
//* Call with overrides (PROD environment)
//PRODRUN  EXEC MYPROC,
//              HLQ=PROD,
//              ENV=LIVE,
//              PGM=PAYROLL
//*
//* Override a DD in the PROC
//PRODRUN.STEPLIB DD DSN=PROD.LIVE.LOADLIB,DISP=SHR
//         DD DSN=PROD.SHARED.LOADLIB,DISP=SHR`},{title:"DFSORT Fundamentals",level:"Beginner",content:`DFSORT (Data Facility Sort) — The Universal Data Tool:

DFSORT is IBM's high-performance sort/merge/copy utility. It is dramatically faster than COBOL for data manipulation and should be your first choice for any data transformation task.

Program Names:
  PGM=SORT    — invoke DFSORT
  PGM=ICEMAN  — same program, alternate name
  PGM=ICETOOL — invoke ICETOOL (DFSORT's multi-function wrapper)

DD Statements:
  SORTIN   — input file (for SORT/MERGE/COPY)
  SORTOUT  — primary output file
  SYSIN    — control statements
  SYSOUT   — messages and diagnostics
  SORTWKnn — work files (optional, system can auto-allocate)

Basic Operations:

  SORT:
  SORT FIELDS=(start,length,format,order,...)
  SORT FIELDS=(1,10,CH,A,15,5,ZD,D)
  → Sort ascending by chars 1-10, then descending by zoned decimal 15-19

  COPY (no sort):
  SORT FIELDS=COPY
  → Just copy input to output (useful with INCLUDE/OUTREC)

  MERGE (pre-sorted inputs):
  MERGE FIELDS=(1,10,CH,A)
  → Merge multiple pre-sorted files (SORTIN01, SORTIN02, ...)

Data Formats:
  CH — Character (EBCDIC collating)
  ZD — Zoned Decimal (numeric in display format)
  PD — Packed Decimal (COMP-3)
  BI — Binary
  FI — Fixed-point integer
  AC — ASCII character
  FL — Floating point
  Y2T, Y2W, etc. — Date formats`,code:`//* ─── BASIC SORT ──────────────────────────────────────
//STEP1    EXEC PGM=SORT
//SORTIN   DD DSN=MY.UNSORTED.FILE,DISP=SHR
//SORTOUT  DD DSN=MY.SORTED.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE)
//SYSIN    DD *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD SYSOUT=*
//*
//* ─── COPY WITH FILTER ──────────────────────────────
//STEP2    EXEC PGM=SORT
//SORTIN   DD DSN=MY.ALL.RECORDS,DISP=SHR
//SORTOUT  DD DSN=MY.ACTIVE.ONLY,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE)
//SYSIN    DD *
  SORT FIELDS=COPY
  INCLUDE COND=(80,1,CH,EQ,C'A')
/*
//SYSOUT   DD SYSOUT=*
//*
//* ─── SORT + REMOVE DUPLICATES ──────────────────────
//STEP3    EXEC PGM=SORT
//SORTIN   DD DSN=MY.FILE.WITH.DUPES,DISP=SHR
//SORTOUT  DD DSN=MY.UNIQUE.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE)
//SYSIN    DD *
  SORT FIELDS=(1,10,CH,A)
  SUM FIELDS=NONE
/*
//SYSOUT   DD SYSOUT=*`},{title:"DFSORT INCLUDE/OMIT & INREC/OUTREC",level:"Intermediate",content:`Filtering and Transforming Records:

INCLUDE/OMIT — Filter Records:
  INCLUDE keeps records matching the condition
  OMIT removes records matching the condition
  (INCLUDE and OMIT are opposites — use one, not both)

  Condition Syntax:
  (start,length,format,operator,value)

  Operators: EQ, NE, GT, GE, LT, LE
  Logical: AND (&), OR (|), NOT

  Examples:
  INCLUDE COND=(1,4,CH,EQ,C'PROD')         ← Keep if chars 1-4 = 'PROD'
  OMIT COND=(20,5,ZD,LT,+10000)            ← Remove if cols 20-24 < 10000
  INCLUDE COND=(1,2,CH,EQ,C'NY',|,          ← Keep NY or CA
                1,2,CH,EQ,C'CA')
  INCLUDE COND=(1,3,CH,EQ,C'ABC',&,         ← Keep ABC with status A
                50,1,CH,EQ,C'A')

INREC — Reformat BEFORE sorting:
  Useful to create a sort key that doesn't exist in the original record
  INREC FIELDS=(1,80,81:50,2,ZD,M10,LENGTH=4)

OUTREC — Reformat AFTER sorting:
  Most common reformatting statement
  Used to create reports, add literals, format numbers

  OUTREC Field Types:
  (start,length)     — Copy from input position
  C'literal'         — Insert character literal
  X'hexvalue'        — Insert hex literal
  nX                 — Insert n spaces
  nC'c'              — Insert n copies of character c
  start,length,format,EDIT=(mask) — Formatted number
  SEQNUM,n,format    — Sequence number
  DATE1, DATE2, etc. — Current date in various formats
  TIME1, TIME2, etc. — Current time

  EDIT Masks:
  I = digit from source (suppressed if leading zero)
  T = digit from source (always shown)
  . , / - = inserted literally
  Examples:
  EDIT=(IIIIIT.TT)     → 12345.67
  EDIT=(III,IIT.TT)    → 1,234.56
  EDIT=(TTT-TT-TTTT)   → 123-45-6789`,code:`//* ─── COMPLEX FILTER ──────────────────────────────────
//FILTER   EXEC PGM=SORT
//SORTIN   DD DSN=MY.EMPLOYEE.FILE,DISP=SHR
//SORTOUT  DD DSN=MY.FILTERED.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE)
//SYSIN    DD *
  SORT FIELDS=COPY
  INCLUDE COND=((50,1,CH,EQ,C'A'),&,
                (30,6,ZD,GE,+050000),&,
                (10,4,CH,NE,C'TEMP'))
//* Keep active employees earning >= 50000, exclude TEMP dept
/*
//SYSOUT   DD SYSOUT=*
//*
//* ─── OUTREC: Create formatted report ───────────────
//REPORT   EXEC PGM=SORT
//SORTIN   DD DSN=MY.EMPLOYEE.FILE,DISP=SHR
//SORTOUT  DD DSN=MY.REPORT,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE),
//            DCB=(RECFM=FB,LRECL=120,BLKSIZE=0)
//SYSIN    DD *
  SORT FIELDS=(1,6,CH,A)
  OUTREC FIELDS=(C'EMP: ',
                 1,6,                        Employee ID
                 C'  NAME: ',
                 10,30,                      Name
                 C'  SALARY: $',
                 50,8,ZD,EDIT=(III,IIT.TT),  Salary formatted
                 C'  STATUS: ',
                 80,1)                       Status code
/*
//SYSOUT   DD SYSOUT=*
//*
//* ─── OUTREC with IFTHEN (conditional) ──────────────
//CONDOUT  EXEC PGM=SORT
//SORTIN   DD DSN=MY.TRANS.FILE,DISP=SHR
//SORTOUT  DD DSN=MY.LABELED.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE),
//            DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//SYSIN    DD *
  SORT FIELDS=COPY
  OUTREC IFTHEN=(WHEN=(1,1,CH,EQ,C'C'),
                  OVERLAY=(90:C'CREDIT    ')),
         IFTHEN=(WHEN=(1,1,CH,EQ,C'D'),
                  OVERLAY=(90:C'DEBIT     ')),
         IFTHEN=(WHEN=NONE,
                  OVERLAY=(90:C'UNKNOWN   '))
/*
//SYSOUT   DD SYSOUT=*`},{title:"DFSORT OUTFIL — Multiple Outputs",level:"Intermediate",content:`OUTFIL — Write to Multiple Output Files:

OUTFIL lets you write to multiple output files in a single pass through the input, with different criteria for each output.

OUTFIL Syntax:
  OUTFIL FNAMES=ddname,parameters

Key OUTFIL Parameters:
  FNAMES=ddname — which DD to write to
  INCLUDE/OMIT — filter records for this output
  OUTREC — reformat records for this output
  SAVE — write records not selected by any OUTFIL
  HEADER1/HEADER2 — page/report headers
  TRAILER1/TRAILER2 — page/report trailers
  SECTIONS — group records with section headers
  REMOVECC — remove carriage control character
  LINES=n — records per page
  STARTREC/ENDREC — select record range

Report Generation:
  OUTFIL can produce professional reports with:
  • Page headers (HEADER1) with date, time, page numbers
  • Column headings (HEADER2) on each page
  • Section breaks when control fields change (SECTIONS)
  • Section totals and grand totals (TRAILER1/TRAILER2)
  • Page numbering, line counting, overflow control

This means DFSORT can replace many report-generating COBOL programs!`,code:`//* ─── SPLIT FILE BY REGION ─────────────────────────────
//SPLIT    EXEC PGM=SORT
//SORTIN   DD DSN=MY.ALL.EMPLOYEES,DISP=SHR
//EAST     DD DSN=MY.EAST.EMPLOYEES,
//            DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(5,2),RLSE)
//WEST     DD DSN=MY.WEST.EMPLOYEES,
//            DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(5,2),RLSE)
//CENTRAL  DD DSN=MY.CENTRAL.EMPLOYEES,
//            DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(5,2),RLSE)
//OTHER    DD DSN=MY.OTHER.EMPLOYEES,
//            DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(5,2),RLSE)
//SYSIN    DD *
  SORT FIELDS=(1,6,CH,A)
  OUTFIL FNAMES=EAST,INCLUDE=(40,4,CH,EQ,C'EAST')
  OUTFIL FNAMES=WEST,INCLUDE=(40,4,CH,EQ,C'WEST')
  OUTFIL FNAMES=CENTRAL,INCLUDE=(40,4,CH,EQ,C'CENT')
  OUTFIL FNAMES=OTHER,SAVE
/*
//SYSOUT   DD SYSOUT=*
//*
//* ─── GENERATE REPORT WITH HEADERS/TRAILERS ─────────
//REPORT   EXEC PGM=SORT
//SORTIN   DD DSN=MY.EMPLOYEE.FILE,DISP=SHR
//RPTOUT   DD SYSOUT=A,DCB=(RECFM=FBA,LRECL=133,BLKSIZE=0)
//SYSIN    DD *
  SORT FIELDS=(40,4,CH,A,1,6,CH,A)
  OUTFIL FNAMES=RPTOUT,
    HEADER1=(1:C'1',
             5:C'EMPLOYEE REPORT',
             50:C'DATE: ',DATE1,
             80:C'PAGE ',PAGE,EDIT=(TTTT)),
    HEADER2=(1:C' ',
             5:C'EMP-ID',
             15:C'EMPLOYEE NAME',
             50:C'DEPARTMENT',
             65:C'SALARY',
             90:C'STATUS'),
    OUTREC=(1:C' ',
            5:1,6,
            15:10,30,
            50:40,10,
            65:50,8,ZD,EDIT=(III,IIT.TT),
            90:80,1),
    TRAILER1=(1:C'-',
              5:C'TOTAL RECORDS: ',COUNT,EDIT=(IIIIIIT)),
    LINES=55
/*
//SYSOUT   DD SYSOUT=*`},{title:"ICETOOL — Multi-Function Utility",level:"Intermediate",content:`ICETOOL — The Power Tool of DFSORT:

ICETOOL is a DFSORT companion utility that performs multiple operations in a single job step. It can do things that would require multiple SORT passes or custom programs.

ICETOOL Commands:

  SORT — Sort a file (like DFSORT but within ICETOOL context)
  COPY — Copy a file with optional transformation
  MERGE — Merge pre-sorted files
  SELECT — Select records based on count of duplicate keys
  UNIQUE — Select unique records (first of each key)
  COUNT — Count records in a file
  DISPLAY — Display record counts and statistics
  STATS — Calculate statistics (min, max, avg, total)
  OCCUR — Count occurrences of each value
  RANGE — Select records with field values in a range
  VERIFY — Verify field values meet criteria
  SPLICE — Join records from multiple sources (like SQL JOIN)
  RESIZE — Change record length

ICETOOL DD Statements:
  TOOLMSG — ICETOOL messages (required)
  DFSMSG  — DFSORT messages (required)
  Additional DDs as referenced in TOOLIN control statements

SPLICE — The Most Powerful Command:
  Joins records from different files based on a common key.
  Like SQL JOIN but for flat files.
  Can do: inner join, outer join, lookup table enrichment

  SPLICE FROM(dd1) TO(output) ON(pos,len,fmt) WITH(dd2) USING(ctl)

SELECT — Count-Based Selection:
  SELECT FROM(input) TO(output) ON(pos,len,fmt) FIRST/LAST/ALLDUPS/NODUPS

  FIRST    — first occurrence of each key
  LAST     — last occurrence of each key
  ALLDUPS  — all records with duplicate keys
  NODUPS   — only records with unique keys
  HIGHER(n) — keys occurring more than n times
  LOWER(n)  — keys occurring fewer than n times
  EQUAL(n)  — keys occurring exactly n times`,code:`//* ─── ICETOOL: Multiple operations in one step ────────
//ICERUN   EXEC PGM=ICETOOL
//TOOLMSG  DD SYSOUT=*
//DFSMSG   DD SYSOUT=*
//INPUT    DD DSN=MY.EMPLOYEE.FILE,DISP=SHR
//UNIQUE   DD DSN=MY.UNIQUE.EMPS,
//            DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(5,2),RLSE)
//DUPES    DD DSN=MY.DUPLICATE.EMPS,
//            DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(1,1),RLSE)
//REPORT   DD SYSOUT=*
//TOOLIN   DD *
  SELECT FROM(INPUT) TO(UNIQUE) ON(1,6,CH) NODUPS
  SELECT FROM(INPUT) TO(DUPES) ON(1,6,CH) ALLDUPS
  DISPLAY FROM(INPUT) LIST(REPORT) -
    HEADER('Employee Count Report') -
    TITLE('Total Records: ') COUNT -
    BLANK -
    TITLE('By Department:') -
    ON(40,4,CH) -
    TITLE('  Department') HEADER('  Dept') -
    ON(50,8,ZD) -
    TITLE('  Avg Salary') HEADER(' Avg Sal') AVERAGE
/*
//*
//* ─── ICETOOL SPLICE: Join two files ─────────────────
//JOINRUN  EXEC PGM=ICETOOL
//TOOLMSG  DD SYSOUT=*
//DFSMSG   DD SYSOUT=*
//MASTER   DD DSN=MY.EMPLOYEE.MASTER,DISP=SHR
//TRANS    DD DSN=MY.MONTHLY.TRANS,DISP=SHR
//JOINED   DD DSN=MY.JOINED.DATA,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE),
//            DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//TOOLIN   DD *
  SPLICE FROM(MASTER) TO(JOINED) ON(1,6,CH) -
    WITH(TRANS) USING(CTL1) WITHALL
/*
//CTL1CNTL DD *
  SORT FIELDS=(1,6,CH,A)
  OUTREC FIELDS=(1,80,                     Master record
                 81:1,6,                    Emp ID (from trans)
                 87:50,10,                  Trans amount
                 97:70,20)                  Trans description
/*`},{title:"IBM Utility Programs",level:"Intermediate",content:`Essential IBM Utility Programs — Complete Reference:

IEBGENER / ICEGENER — Copy Sequential Files:
  Copies one sequential dataset to another.
  ICEGENER (DFSORT version) is faster and recommended.
  DD: SYSUT1 (input), SYSUT2 (output), SYSIN (DUMMY for simple copy)
  Can do simple reformatting with SYSIN control cards

IEBCOPY — PDS Management:
  Copy, compress, merge, or unload partitioned datasets.
  Operations:
    COPY — copy members between PDS/PDSE
    COMPRESS — reclaim unused space (PDS only)
    UNLOAD — convert PDS to sequential (portable format)
    LOAD — restore PDS from sequential

IEFBR14 — Do-Nothing Program:
  Returns RC=0 immediately. Used for DD processing only:
  • Create empty datasets (DISP=(NEW,CATLG))
  • Delete datasets (DISP=(OLD,DELETE))
  • Catalog/uncatalog datasets

IDCAMS — Catalog & VSAM:
  The Swiss Army knife — covered extensively in VSAM topic.
  Key commands: DEFINE, DELETE, REPRO, LISTCAT, PRINT, ALTER, VERIFY

IEBUPDTE — Batch PDS Updates:
  Add, replace, or change PDS members in batch.
  Uses ./ prefix control statements.
  Good for automated library maintenance.

IKJEFT01 — TSO Batch:
  Execute TSO commands or CLISTs in batch mode.
  Primary use: run DB2 programs (DSN command)
  DD: SYSTSIN (commands), SYSTSPRT (output)

IRXJCL — REXX Batch:
  Execute REXX programs in batch mode.
  REXX program name on EXEC PARM
  DD: SYSTSIN (input), SYSTSPRT (output)

IEHPROGM — Catalog Maintenance:
  SCRATCH — delete datasets
  CATALOG — add catalog entries
  UNCATLG — remove catalog entries
  RENAME — rename datasets

ADRDSSU (DFSMSdss) — Backup/Restore:
  DUMP — backup datasets or volumes
  RESTORE — restore from backup
  COPY — copy datasets between volumes
  DEFRAG — defragment volumes
  RELEASE — release unused space`,code:`//* ─── ICEGENER: Fast copy ─────────────────────────────
//COPY     EXEC PGM=ICEGENER
//SYSUT1   DD DSN=MY.SOURCE.FILE,DISP=SHR
//SYSUT2   DD DSN=MY.TARGET.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE)
//SYSPRINT DD SYSOUT=*
//SYSIN    DD DUMMY
//*
//* ─── IEBCOPY: Copy & compress PDS ──────────────────
//PDSCOMP  EXEC PGM=IEBCOPY
//SYSUT3   DD UNIT=SYSDA,SPACE=(TRK,(5,5))
//SYSUT4   DD UNIT=SYSDA,SPACE=(TRK,(5,5))
//INOUT    DD DSN=MY.COBOL.SOURCE,DISP=OLD
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  COPY OUTDD=INOUT,INDD=INOUT
/*
//*
//* ─── IEBCOPY: Selective member copy ────────────────
//MBRCOPY  EXEC PGM=IEBCOPY
//SYSUT3   DD UNIT=SYSDA,SPACE=(TRK,(5,5))
//SYSUT4   DD UNIT=SYSDA,SPACE=(TRK,(5,5))
//INDD     DD DSN=DEV.COBOL.SOURCE,DISP=SHR
//OUTDD    DD DSN=PROD.COBOL.SOURCE,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  COPY OUTDD=OUTDD,INDD=INDD
  SELECT MEMBER=(PAYROLL,BENEFITS,TAXCALC)
/*
//*
//* ─── ADRDSSU: Backup datasets ──────────────────────
//BACKUP   EXEC PGM=ADRDSSU
//SYSPRINT DD SYSOUT=*
//TAPE     DD DSN=MY.BACKUP.TAPE,
//            DISP=(NEW,CATLG),UNIT=TAPE
//SYSIN    DD *
  DUMP DATASET(                     -
       INCLUDE(PROD.PAYROLL.**)     -
              ) -
       OUTDDNAME(TAPE) -
       COMPRESS -
       TOLERATE(ENQFAILURE)
/*`},{title:"Advanced DFSORT Techniques",level:"Advanced",content:`Advanced DFSORT — Replace COBOL Programs:

DFSORT can do far more than simple sorts. These advanced techniques can replace entire COBOL programs.

1. JOINKEYS — Join Files by Key:
   More powerful than ICETOOL SPLICE for complex joins.
   Supports: inner join, left outer, right outer, full outer, unpaired.

   JOINKEYS FILE=F1,FIELDS=(1,6,A)
   JOINKEYS FILE=F2,FIELDS=(1,6,A)
   JOIN UNPAIRED,F1,F2
   REFORMAT FIELDS=(F1:1,80,F2:20,30)
   SORT FIELDS=(1,6,CH,A)

2. SYMNAMES — Named Fields:
   Define meaningful names for field positions.
   SYMNAMES file (pointed to by SYMNAMES DD):
   EMP-ID,1,6,CH
   EMP-NAME,10,30,CH
   SALARY,50,8,ZD
   DEPT,40,4,CH

   Then in SORT statements: SORT FIELDS=(EMP-ID,A)
   Much more readable than position numbers!

3. DFSORT Symbols:
   Pass values from JCL to SORT control statements.
   //STEP EXEC PGM=SORT
   //SYMLIST DD *
   DEPARTMENT='FIN'
   MINSALARY=+50000
   /*
   //SYSIN DD *
   INCLUDE COND=(40,4,CH,EQ,C'&DEPARTMENT',
                 &,50,8,ZD,GE,&MINSALARY)
   /*

4. TRAILER/HEADER with calculations:
   Generate summary reports with totals, averages, counts.

5. IFTHEN with WHEN=GROUP:
   Process records in groups (e.g., header-detail-trailer).
   Carry forward header data to detail records.

6. Sequence Number Generation:
   SEQNUM,n,format — add sequential numbers
   SEQNUM,8,ZD,START=1000,INCR=10

7. Date Processing:
   Convert between date formats
   Date arithmetic (add/subtract days)
   DATE1 (MM/DD/YYYY), DATE2 (DD/MM/YYYY), etc.
   Y4T — 4-digit year, TRAN=MDYY etc.`,code:`//* ─── JOINKEYS: Full outer join ────────────────────────
//FULLJOIN EXEC PGM=SORT
//MASTER   DD DSN=MY.MASTER.FILE,DISP=SHR
//TRANS    DD DSN=MY.TRANS.FILE,DISP=SHR
//SORTOUT  DD DSN=MY.JOINED.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(20,10),RLSE),
//            DCB=(RECFM=FB,LRECL=150,BLKSIZE=0)
//SYSIN    DD *
  JOINKEYS FILE=F1,FIELDS=(1,6,A)
  JOINKEYS FILE=F2,FIELDS=(1,6,A)
  JOIN UNPAIRED,F1,F2
  REFORMAT FIELDS=(F1:1,80,F2:10,30,F2:50,8)
  SORT FIELDS=(1,6,CH,A)
  OUTREC IFTHEN=(WHEN=GROUP,BEGIN=(1,6,CH,NE,PREV),
                  PUSH=(120:1,6)),
         IFTHEN=(WHEN=(81,30,CH,EQ,C' '),
                  OVERLAY=(81:C'** NO TRANSACTIONS **'))
/*
//SYSOUT   DD SYSOUT=*
//*
//* ─── SYMNAMES: Readable sort statements ─────────────
//SYMRUN   EXEC PGM=SORT
//SORTIN   DD DSN=MY.EMPLOYEE.FILE,DISP=SHR
//SORTOUT  DD DSN=MY.REPORT.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE),
//            DCB=(RECFM=FB,LRECL=133,BLKSIZE=0)
//SYMNAMES DD *
  EMP-ID,1,6,CH
  EMP-NAME,10,30,CH
  DEPARTMENT,40,4,CH
  SALARY,50,8,ZD
  STATUS,80,1,CH
/*
//SYSIN    DD *
  SORT FIELDS=(DEPARTMENT,A,EMP-NAME,A)
  INCLUDE COND=(STATUS,EQ,C'A',&,SALARY,GE,+50000)
  OUTFIL FNAMES=SORTOUT,
    HEADER1=(1:C'1',5:C'HIGH EARNER REPORT',
             50:C'RUN DATE: ',DATE1,
             80:C'PAGE ',PAGE,EDIT=(TTT)),
    OUTREC=(1:C'0',5:EMP-ID,15:EMP-NAME,
            50:DEPARTMENT,
            60:SALARY,EDIT=(III,IIT.TT)),
    TRAILER1=(1:C'-',5:C'TOTAL: ',COUNT,EDIT=(IIIIIT),
              25:C' RECORDS')
/*
//SYSOUT   DD SYSOUT=*`},{title:"Production PROC Patterns",level:"Advanced",content:`Production PROC Design Patterns:

These are battle-tested patterns used in real production environments.

1. Compile-Link-Run PROC:
   Standard procedure for building and testing programs.
   Symbolic parameters: source library, copybook library, load library, member name.
   Three steps: COMPILE → LINK → RUN

2. Extract-Transform-Load (ETL) PROC:
   Standard data processing pipeline.
   Steps: VALIDATE → SORT → TRANSFORM → LOAD → REPORT
   Symbiotics: input DSN, output DSN, date, environment

3. Backup-Process-Verify PROC:
   Safe processing pattern.
   Steps: BACKUP original → PROCESS → VERIFY output → CLEANUP
   If any step fails, original data is safe in backup.

4. Multi-Environment PROC:
   Same PROC works for DEV, QA, PROD.
   Environment-specific libraries controlled by symbolics.
   &ENV symbolic switches between TEST/QA/PROD datasets.

5. DB2 Utility PROC:
   Standard DB2 operations: REORG, RUNSTATS, COPY, RECOVER.
   Parameterized by tablespace name, database name, utility type.

PROC Testing:
  1. TYPRUN=SCAN — syntax check without execution
  2. Test with non-production data first
  3. Verify symbolic resolution with MSGLEVEL=(2,1)
  4. Check all override scenarios

PROC Documentation:
  Include a comment block at the top of every PROC:
  //* PROC:    COBCLGR
  //* PURPOSE: Compile, Link-edit, and Run COBOL program
  //* PARMS:   HLQ= (dataset high-level qualifier)
  //*          MBR= (program member name)
  //*          ENV= (environment: DEV/QA/PROD)
  //* AUTHOR:  Mainframe OS Hub
  //* DATE:    2025-01-15
  //* CHANGE LOG:
  //*   2025-01-15 Initial version
  //*   2025-02-01 Added DB2 precompile support`,code:`//* ═══════════════════════════════════════════════════════
//* PRODUCTION ETL PROC — Extract Transform Load
//* ═══════════════════════════════════════════════════════
//ETLPROC PROC HLQ=PROD,
//             ENV=LIVE,
//             SOURCE=,
//             TARGET=,
//             LOADPGM=ETLTRANS,
//             SORTKEYS='(1,10,CH,A)',
//             MAXRC=4
//*
//* STEP 1: Validate input exists
//VALID   EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  LISTCAT ENTRIES(&SOURCE) NAME
/*
//*
//* STEP 2: Sort input data
//SORTIT  EXEC PGM=SORT,COND=(&MAXRC,LT,VALID)
//SORTIN  DD DSN=&SOURCE,DISP=SHR
//SORTOUT DD DSN=&&SORTED,DISP=(NEW,PASS),
//           SPACE=(CYL,(50,25))
//SYSIN   DD *
  SORT FIELDS=&SORTKEYS
/*
//SYSOUT  DD SYSOUT=*
//*
//* STEP 3: Transform (COBOL program)
//TRANS   EXEC PGM=&LOADPGM,COND=(&MAXRC,LT,SORTIT)
//STEPLIB DD DSN=&HLQ..&ENV..LOADLIB,DISP=SHR
//INPUT   DD DSN=&&SORTED,DISP=(OLD,DELETE)
//OUTPUT  DD DSN=&&TRANSOUT,DISP=(NEW,PASS),
//           SPACE=(CYL,(50,25))
//ERRFILE DD DSN=&HLQ..&ENV..ETL.ERRORS(+1),
//           DISP=(NEW,CATLG,DELETE),
//           SPACE=(CYL,(1,1),RLSE)
//SYSPRINT DD SYSOUT=*
//*
//* STEP 4: Load to target
//LOADIT  EXEC PGM=ICEGENER,COND=(&MAXRC,LT,TRANS)
//SYSUT1  DD DSN=&&TRANSOUT,DISP=(OLD,DELETE)
//SYSUT2  DD DSN=&TARGET,
//           DISP=(NEW,CATLG,DELETE),
//           SPACE=(CYL,(100,50),RLSE)
//SYSPRINT DD SYSOUT=*
//SYSIN   DD DUMMY
//*
//       PEND`},{title:"Interview Questions",level:"All Levels",content:`DFSORT/Utilities Interview Questions — 15+ Q&A.

Q: What is DFSORT?
A: IBM's sort/merge utility for z/OS. Sorts, copies, selects, reformats, joins, and summarizes data. Most-used utility.

Q: What is ICETOOL?
A: DFSORT's multi-function tool. Runs multiple operations in one step: SORT, COPY, SELECT, COUNT, DISPLAY, UNIQUE.

Q: Explain SORT FIELDS.
A: SORT FIELDS=(position,length,format,order). Formats: CH, ZD, PD, BI, FI. Order: A (ascending), D (descending).

Q: What is OUTREC vs INREC?
A: INREC reformats BEFORE sorting. OUTREC reformats AFTER sorting. Both use BUILD syntax. OUTREC can also use IFTHEN for conditional formatting.

Q: What is JOINKEYS?
A: Joins two sorted files. Like a database JOIN. JOINKEYS FILE=F1,FIELDS=(pos,len,ord). JOIN PAIRED/UNPAIRED. REFORMAT combines fields.

Q: How do you remove duplicates?
A: SUM FIELDS=NONE after SORT. Or ICETOOL SELECT ... NODUPS.

💡 Study Tip: Master SORT FIELDS, INCLUDE/OMIT, OUTREC BUILD, and JOINKEYS.`},{title:"PROCs & Utilities Cheat Sheet",level:"All Levels",content:`DFSORT/Utilities Quick Reference

═══ SORT ═══
SORT FIELDS=(pos,len,fmt,ord)
INCLUDE COND=(pos,len,fmt,op,value)
OMIT COND=(pos,len,fmt,op,value)
OUTREC BUILD=(pos,len,C'literal',SEQNUM,8,ZD)
INREC IFTHEN=(WHEN=(condition),BUILD=(...))
SUM FIELDS=NONE — Remove duplicates
OUTFIL FNAMES=dd,INCLUDE=(...) — Multiple outputs
JOINKEYS FILE=F1,FIELDS=(pos,len,ord) — Join files

═══ FORMATS ═══
CH — Character    ZD — Zoned decimal
PD — Packed       BI — Binary
FI — Fixed integer

═══ OPERATORS ═══
EQ NE GT LT GE LE`},{title:"Interview Questions — PROCs & Utilities",level:"All Levels",content:`PROCs & Utilities Interview Questions:

Q: What is the difference between SORT, ICETOOL, and ICEGENER?
A: SORT (PGM=SORT) is the main DFSORT utility — sorts, filters, and reformats data in a single pass. ICETOOL (PGM=ICETOOL) is a wrapper that can perform multiple DFSORT operations in one step — SELECT, SPLICE, DISPLAY, OCCUR, etc. ICEGENER (PGM=ICEGENER) is a fast copy utility — replacement for IEBGENER, uses DFSORT internally for better performance.

Q: How do you remove duplicate records from a file?
A: SORT FIELDS=(key-field,A) followed by SUM FIELDS=NONE. SUM FIELDS=NONE keeps only the first record for each unique sort key, discarding all duplicates. Alternative: ICETOOL SELECT with NODUPS parameter.

Q: Explain OUTFIL SAVE.
A: When using multiple OUTFIL statements to split a file, SAVE catches all records that weren't selected by any other OUTFIL. It's like the DEFAULT or ELSE clause — ensures no records are lost. Without SAVE, records not matching any OUTFIL criteria are discarded.

Q: What is the difference between a catalogued PROC and an in-stream PROC?
A: A catalogued PROC is stored as a member in a procedure library (PROCLIB) and can be called by any job that has access to that library. An in-stream PROC is defined within the job itself between //name PROC and // PEND statements, and is only available within that job. Catalogued PROCs are better for production (shared, maintained centrally), in-stream PROCs are useful for development and testing.

Q: How do you pass parameters to a PROC?
A: Through symbolic parameters. Define parameters in the PROC statement with defaults: //MYPROC PROC HLQ=TEST,ENV=DEV. Override on the EXEC statement calling the PROC: //STEP1 EXEC MYPROC,HLQ=PROD,ENV=LIVE. System symbols (&SYSUID, &LYYMMDD) are also available.

Q: How would you join two flat files like a SQL JOIN?
A: Use ICETOOL SPLICE or DFSORT JOINKEYS. SPLICE is simpler for basic joins: SPLICE FROM(MASTER) TO(OUTPUT) ON(1,6,CH) WITH(TRANS) USING(CTL1). JOINKEYS is more powerful for complex joins including outer joins: JOINKEYS FILE=F1,FIELDS=(1,6,A) / JOINKEYS FILE=F2,FIELDS=(1,6,A) / JOIN UNPAIRED,F1,F2.`}]},Jo={id:"zos",icon:"🖥️",title:"z/OS Fundamentals",subtitle:"The Operating System That Runs the World",color:"#1d4ed8",level:"Beginner → Expert",description:"z/OS is the most reliable operating system ever built. Understanding its architecture is the foundation of everything mainframe.",sections:[{title:"What is z/OS?",level:"Beginner",content:`z/OS — The Operating System of Enterprise Computing:

z/OS is IBM’s flagship operating system for the IBM Z mainframe platform. It is the most robust, secure, and reliable operating system ever created — designed for continuous operation with 99.999% uptime.

z/OS by the Numbers:
  • Powers 68% of all worldwide transactions
  • Processes 30 billion business transactions per day
  • Handles 87% of all credit card transactions
  • Supports 96 of the world’s top 100 banks
  • Runs at 44 of the top 50 retailers
  • Manages 90% of airline reservation systems

z/OS History:
  1964 — OS/360 (the original)
  1974 — MVS (Multiple Virtual Storage)
  1988 — MVS/ESA (Enterprise Systems Architecture)
  1995 — OS/390 (rebranded, TCP/IP integrated)
  2001 — z/OS (current generation, 64-bit)
  2023 — z/OS 3.1 (latest, container extensions)

Why z/OS Still Dominates:
  1. Reliability — designed for zero unplanned downtime
  2. Security — RACF, built-in encryption, EAL5+ certification
  3. Scalability — single system handles millions of transactions/sec
  4. Data integrity — never loses a transaction
  5. Backward compatibility — programs from 1970s still run
  6. Workload management — automatic performance optimization
  7. I/O throughput — unmatched by any other platform`},{title:"z/OS Architecture Overview",level:"Beginner",content:`z/OS Architecture — How It All Fits Together:

Address Spaces:
  Every program on z/OS runs in its own "address space" — an isolated virtual memory environment. Think of it as a container (before containers existed).

  Types of address spaces:
  • System address spaces — z/OS kernel, JES2, VTAM, catalog
  • Subsystem address spaces — CICS, DB2, IMS, MQ
  • Batch job address spaces — each running batch job gets its own
  • TSO user address spaces — each logged-in user gets one
  • Started tasks — system services (like Linux daemons)

Virtual Storage:
  z/OS uses virtual storage (memory) extensively:
  • Each address space sees its own 16 EB (exabytes) of virtual memory
  • 31-bit programs: 2 GB addressable
  • 64-bit programs: 16 EB addressable
  • Real (physical) memory shared by all address spaces
  • Paging moves data between real storage and disk when needed

The "Bar" and "Line":
  • "Below the line" — first 16 MB (24-bit addressing from MVS days)
  • "Below the bar" — first 2 GB (31-bit addressing)
  • "Above the bar" — beyond 2 GB (64-bit addressing)

z/OS Subsystems:
  • JES2/JES3 — Job Entry Subsystem (batch job management)
  • VTAM — Virtual Telecommunications Access Method (networking)
  • TCP/IP — Internet protocol stack
  • RACF — Resource Access Control Facility (security)
  • WLM — Workload Manager (performance)
  • SMS — Storage Management Subsystem (storage automation)

System Datasets (SYS1.xxx):
  • SYS1.PARMLIB — System parameters (like /etc on Linux)
  • SYS1.PROCLIB — System procedures (started task JCL)
  • SYS1.LINKLIB — System programs (like /usr/bin)
  • SYS1.LPALIB — Programs loaded into memory at IPL
  • SYS1.NUCLEUS — z/OS kernel modules`},{title:"IPL & System Startup",level:"Intermediate",content:`IPL (Initial Program Load) — Booting z/OS:

IPL is the mainframe equivalent of "booting." The process is carefully controlled.

IPL Process:
  1. Hardware Initialization:
     Operator selects LOAD from HMC (Hardware Management Console)
     Processor loads the IPL program from a designated volume

  2. Nucleus Initialization Program (NIP):
     Loads z/OS kernel modules from SYS1.NUCLEUS
     Reads IEASYSxx PARMLIB member for system parameters

  3. Master Scheduler Initialization:
     Starts the master address space
     Initializes subsystem interface (SSI)

  4. JES2/JES3 Start:
     Job Entry Subsystem starts and opens SPOOL datasets

  5. Automation & Started Tasks:
     COMMNDxx PARMLIB member issues automatic commands
     Started tasks begin (CICS, DB2, VTAM, TCP/IP)

PARMLIB — System Configuration:
  IEASYSxx — System parameters (storage, SMF, WLM, catalogs)
  COMMNDxx — Commands executed at IPL
  SMFPRMxx — SMF recording parameters
  PROGxx   — APF list, link list, LPA list
  IKJTSOxx — TSO parameters
  LOADxx   — IPL parameters (what to load)`},{title:"Datasets — z/OS File System",level:"Beginner",content:`Datasets — How z/OS Stores Data:

On z/OS, files are called "datasets." Understanding datasets is fundamental.

Dataset Naming:
  • Maximum 44 characters
  • Qualifiers separated by periods (.)
  • Each qualifier: 1-8 characters
  • High-Level Qualifier (HLQ) is usually user ID or group name
  • Examples: USER01.COBOL.SOURCE, PROD.PAYROLL.MASTER

Dataset Types:
  1. Sequential (PS): Records stored one after another
  2. Partitioned (PDS): Contains "members" — like a folder with files
  3. PDS/E (PDSE): Modern replacement for PDS
  4. VSAM: High-performance indexed files (KSDS, ESDS, RRDS, LDS)
  5. Unix files: z/OS USS has standard Unix filesystem

DASd (Direct Access Storage Device):
  Physical disk storage on mainframes.
  Track ≈ 56,664 bytes. Cylinder = 15 tracks ≈ 849,960 bytes.

Catalog:
  The system catalog maps dataset names to physical locations.
  Master Catalog → User Catalogs → Dataset entries.`},{title:"TSO/ISPF — The User Interface",level:"Beginner",content:`TSO (Time Sharing Option) provides interactive access to z/OS.
ISPF (Interactive System Productivity Facility) provides the panel-driven interface.

ISPF Primary Option Menu:
  0 — Settings
  1 — View (read-only browse of datasets)
  2 — Edit (edit PDS members or sequential files)
  3 — Utilities (dataset utilities, move/copy, search)
  4 — Foreground (compile, link, run interactively)
  5 — Batch (submit JCL for batch execution)
  6 — Command (enter TSO commands)
  SD — SDSF (job output viewer)

ISPF Editor Line Commands:
  I  — Insert line(s)
  D  — Delete line(s)
  C  — Copy line(s)
  M  — Move line(s)
  R  — Repeat line(s)
  A  — After (destination)
  B  — Before (destination)

ISPF Editor Primary Commands:
  FIND string — search forward
  CHANGE old new — find and replace
  SAVE — save changes
  SUBMIT — submit as JCL job
  HILITE JCL/COBOL — syntax highlighting`},{title:"JES2 — Job Entry Subsystem",level:"Intermediate",content:`JES2 manages the lifecycle of every batch job on z/OS.

JES2 Functions:
  1. Job Reception — accept jobs from TSO, NJE, internal reader
  2. Conversion — parse JCL, expand PROCs, resolve symbols
  3. Scheduling — queue jobs by class and priority
  4. Execution — assign jobs to initiators
  5. Output Processing — manage SYSOUT
  6. Purge — clean up after job completion

Job Classes: Single character (A-Z, 0-9) defining job category.
Job Priority: PRTY parameter (0-15, higher = sooner)

SDSF Panels:
  DA — Display Active (currently running jobs)
  I  — Input Queue (waiting to run)
  O  — Output Queue (completed)
  H  — Held Output Queue
  ST — Status (all jobs)
  LOG — System log

SDSF Commands:
  S  — Select (view job output)
  ?  — Browse JCL
  P  — Purge (delete job)
  C  — Cancel running job`},{title:"RACF — z/OS Security",level:"Intermediate",content:`RACF (Resource Access Control Facility) controls who can access what on z/OS.

RACF Concepts:
  Users: Every person/service has a RACF profile
  Groups: Organize users hierarchically
  Resources: Everything protected (datasets, programs, terminals)

  Access Levels:
  NONE    — no access
  READ    — read only
  UPDATE  — read and write
  CONTROL — full control (VSAM)
  ALTER   — owner-level access

RACF Commands:
  ADDUSER  — create a user
  ALTUSER  — modify a user
  PERMIT   — grant access to a resource
  ADDSD    — create dataset profile
  LISTUSER — display user info
  SEARCH   — search RACF database

Access Decision Logic:
  1. Discrete profile for exact resource? → Use it
  2. Generic profile matching? → Use most specific
  3. OPERATIONS attribute? → Allow
  4. No match → Default to UACC (Universal Access)`},{title:"USS — Unix System Services",level:"Intermediate",content:`z/OS Unix System Services (USS) is a POSIX-compliant Unix environment built into z/OS.

Why USS Matters:
  • Run open-source software on z/OS (Java, Python, Node.js, Git)
  • Unix shell scripting for automation
  • Required by: Zowe, Java, DB2 utilities, WebSphere
  • z/OS Container Extensions (zCX) runs on USS

USS Components:
  Shell: /bin/sh (Bourne), /bin/bash
  File System: Hierarchical zFS, like any Unix
  Users: RACF user IDs map to Unix UIDs
  Commands: ls, cd, cp, mv, rm, mkdir, grep, find, chmod

Accessing USS:
  From TSO: OMVS command
  From ISPF: ISHELL command
  SSH: ssh user@hostname
  From batch: BPXBATCH program in JCL

Key Directories:
  /bin — standard Unix commands
  /usr — user programs and libraries
  /etc — configuration files
  /u   — user home directories

EBCDIC vs ASCII:
  z/OS native encoding is EBCDIC (not ASCII)
  USS files can be tagged with encoding
  iconv converts between codepages`,code:`# Access USS from TSO
OMVS

# Navigate
cd /u/user01
ls -la

# Copy MVS dataset to USS file
cp "//'USER01.COBOL.SOURCE(PAYROLL)'" ./payroll.cbl

# Copy USS file to MVS dataset
cp ./payroll.cbl "//'USER01.COBOL.SOURCE(PAYROLL)'"

# Run Java on z/OS
export JAVA_HOME=/usr/lpp/java/J17.0_64
java -version

# Run Python on z/OS
python3 myscript.py

# Git on z/OS
git clone https://github.com/myorg/myrepo.git
git add . && git commit -m "Updated COBOL"

# Run USS commands from JCL (BPXBATCH)
# //STEP1 EXEC PGM=BPXBATCH,
# //       PARM='SH /u/user01/scripts/myscript.sh'
# //STDOUT DD SYSOUT=*
# //STDERR DD SYSOUT=*`},{title:"Parallel Sysplex",level:"Advanced",content:`A Parallel Sysplex is a cluster of up to 32 z/OS systems working as a single entity.

Components:
  Coupling Facility (CF): Shared memory and locking between systems
  Sysplex Timer: Synchronized time across all systems
  GDPS: Extends sysplex across data centers (up to 300km)

Benefits:
  1. Availability — if one system fails, others take over
  2. Scalability — add systems to handle more workload
  3. Workload Balancing — spread work dynamically
  4. Rolling Maintenance — upgrade one system while others run
  5. Data Sharing — all systems access same DB2 data

DB2 Data Sharing:
  All systems access the same databases simultaneously.
  Coupling Facility manages locking and caching.
  If one DB2 fails, others continue without interruption.

CICS in Sysplex:
  CICSPlex SM manages multiple CICS regions.
  Workload routing distributes transactions.
  AOR failover is automatic.`},{title:"z/OS Storage Concepts",level:"Intermediate",content:`z/OS Storage (Memory) Management:

Virtual Storage Layout (31-bit):
  2 GB — Extended Private (your program above 16MB)
  16 MB — "The Line" boundary
  Below — Private Area (below 16MB, legacy)
  Common Area — CSA, SQA, LPA (shared system storage)
  System Area — z/OS nucleus

Key Storage Areas:
  Private Area: Your job's workspace (REGION parameter)
  CSA: Shared memory for inter-address-space communication
  SQA: System control blocks and tables
  LPA: Shared reentrant programs loaded at IPL
  64-bit: "Above the bar" for large data structures

REGION Parameter:
  REGION=4M   — 4 MB (small programs)
  REGION=64M  — 64 MB (typical COBOL)
  REGION=0M   — maximum available

Common Storage Abends:
  S878 — Virtual storage not available
  S80A — Insufficient virtual storage
  S804 — GETMAIN failed
  S40D — Insufficient storage for OPEN`},{title:"Interview Questions",level:"All Levels",content:`z/OS Interview Questions — 25+ Q&A.

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

💡 Study Tip: Know LPAR, TSO/ISPF, JES, catalog, SMS, and WLM — these are z/OS fundamentals interviewers expect.`},{title:"z/OS Fundamentals Cheat Sheet",level:"All Levels",content:`z/OS Quick Reference — Cheat Sheet

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
6 — TSO command    S — SDSF/SD`},{title:"Interview Questions — z/OS",level:"All Levels",content:`z/OS Fundamentals Interview Questions:

Q: What is an address space?
A: An isolated virtual memory environment on z/OS. Every batch job, TSO user, CICS region runs in its own address space with up to 2 GB (31-bit) or 16 EB (64-bit) of virtual memory.

Q: What is the difference between "below the line" and "above the bar"?
A: "The line" = 16 MB boundary (24-bit). "The bar" = 2 GB boundary (31-bit). Programs using 24-bit addressing access only first 16 MB. 64-bit programs access beyond 2 GB.

Q: Explain the IPL process.
A: (1) Hardware loads IPL program from DASD, (2) NIP loads kernel and reads PARMLIB, (3) Master Scheduler starts, (4) JES2 starts, (5) Started tasks begin (CICS, DB2, VTAM).

Q: What is a Parallel Sysplex?
A: A cluster of up to 32 z/OS systems sharing a Coupling Facility. Benefits: automatic failover, rolling maintenance, workload balancing, DB2 data sharing.

Q: How does RACF protect resources?
A: RACF uses profiles to define access rules. Checks discrete profile, then generic profile, evaluates access level (NONE/READ/UPDATE/CONTROL/ALTER), logs to SMF Type 80.`}]},y=[Jo,xo,vo,Bo,Fo,wo,ko,Yo,Go,Wo,Ho,zo,jo,Xo,Vo],ra=[{id:"s1",category:"JCL",difficulty:"Beginner",question:"Your JCL job abended with ABEND S0C7 in STEP2. What does this mean and how do you diagnose it?",answer:`S0C7 is a Data Exception abend — it occurs when a program attempts arithmetic on a field that does not contain valid numeric data (packed decimal or zoned decimal).

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
  Define WORKING-STORAGE with VALUE clauses`,tags:["abend","s0c7","debugging","jcl"]},{id:"s2",category:"COBOL",difficulty:"Intermediate",question:"You need to process 10 million records from a VSAM KSDS daily. The current batch job takes 6 hours. How do you reduce this to under 1 hour?",answer:`PERFORMANCE OPTIMIZATION STRATEGY:

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
   IDCAMS REPRO + REDEFINE to reorganize`,tags:["performance","vsam","cobol","optimization"]},{id:"s3",category:"DB2",difficulty:"Advanced",question:"A DB2 query that normally takes 2 seconds is now taking 45 minutes after a weekend batch load. What do you check?",answer:`ROOT CAUSE: Stale statistics after bulk data load. Classic DB2 performance issue.

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
   
   Consider RUNSTATS with FREQVAL for skewed data distributions`,tags:["db2","performance","runstats","explain"]},{id:"s4",category:"CICS",difficulty:"Intermediate",question:"CICS transaction PAYQ is abending with AICA (runaway task). How do you investigate and fix this?",answer:`AICA — Runaway Task Abend

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
  4. Use EXEC CICS DELAY INTERVAL(0) to yield (zero delay, but resets timer)`,tags:["cics","abend","aica","debugging","performance"]},{id:"s5",category:"RACF",difficulty:"Advanced",question:"Audit found that 15 users have UPDATE access to PROD.PAYROLL datasets. How do you remediate and prevent recurrence?",answer:`SECURITY REMEDIATION PLAN:

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
   Managers certify access quarterly`,tags:["racf","security","audit","compliance"]},{id:"s6",category:"CA7",difficulty:"Intermediate",question:"Your critical EOD (End of Day) batch network normally completes by 11 PM. Tonight it's 1 AM and still running. How do you triage?",answer:`EOD BATCH TRIAGE PROCEDURE:

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
   Check for data volume change (more records = longer run)`,tags:["ca7","scheduling","batch","incident-management"]},{id:"s7",category:"VSAM",difficulty:"Beginner",question:"You need to create a VSAM KSDS cluster for an employee master file. The key is a 6-byte employee ID starting at position 1. How do you define it?",answer:`IDCAMS DEFINE CLUSTER:

//DEFVSAM  EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  DEFINE CLUSTER -
    (NAME(PROD.EMPLOYEE.MASTER) -
     INDEXED -
     KEYS(6 0) -
     RECORDSIZE(200 250) -
     FREESPACE(20 10) -
     SHAREOPTIONS(2 3) -
     CYLINDERS(50 10)) -
  DATA -
    (NAME(PROD.EMPLOYEE.MASTER.DATA) -
     CISZ(4096)) -
  INDEX -
    (NAME(PROD.EMPLOYEE.MASTER.INDEX) -
     CISZ(2048))
/*

KEY PARAMETERS:
- KEYS(6 0) = 6-byte key starting at offset 0
- RECORDSIZE(200 250) = average 200, max 250 bytes
- FREESPACE(20 10) = 20% CI free, 10% CA free for inserts
- SHAREOPTIONS(2 3) = multiple read, single write across systems
- CISZ = Control Interval Size for data and index`,tags:["vsam","ksds","idcams","define"]},{id:"s8",category:"VSAM",difficulty:"Advanced",question:"A production VSAM KSDS has 45% CI splits and response time has degraded from 2ms to 50ms. What's your recovery plan?",answer:`VSAM CI SPLIT RECOVERY PLAN:

1. IMMEDIATE ASSESSMENT:
   LISTCAT ENTRIES(PROD.VSAM.FILE) ALL
   Check: SPLITS-CI, SPLITS-CA, FREESPACE-%, EXTENTS

2. EMERGENCY REORG:
   Step 1 — REPRO to sequential backup:
   //STEP1  EXEC PGM=IDCAMS
   //SYSIN  DD *
     REPRO INFILE(VSAMDD) OUTFILE(SEQDD)
   
   Step 2 — DELETE and REDEFINE with better FREESPACE:
     DELETE PROD.VSAM.FILE CLUSTER
     DEFINE CLUSTER ... FREESPACE(30 15)
   
   Step 3 — REPRO back:
     REPRO INFILE(SEQDD) OUTFILE(VSAMDD)

3. ROOT CAUSE ANALYSIS:
   - Sequential inserts at end? → FREESPACE not helping
   - Random inserts? → Increase CI FREESPACE to 30%
   - Growing rapidly? → Increase CA FREESPACE to 15%
   - Key range hot spots? → Consider key-range partitioning

4. PREVENTION:
   - Schedule weekly REORG
   - Monitor splits via SMF Type 64 records
   - Set FREESPACE based on insert patterns`,tags:["vsam","performance","ci-splits","reorg"]},{id:"s9",category:"REXX",difficulty:"Beginner",question:"Write a REXX exec that checks if a dataset exists and displays its attributes. If it doesn't exist, create it.",answer:`/* REXX - Check and create dataset */
PARSE ARG DSNAME
IF DSNAME = '' THEN DO
  SAY 'Usage: DSCHK datasetname'
  EXIT 8
END

/* Check existence */
X = SYSDSN("'"DSNAME"'")
IF X = 'OK' THEN DO
  SAY DSNAME 'exists.'
  /* Get attributes using LISTDSI */
  X = LISTDSI("'"DSNAME"'")
  SAY '  RECFM  :' SYSRECFM
  SAY '  LRECL  :' SYSLRECL
  SAY '  BLKSIZE:' SYSBLKSIZE
  SAY '  DSORG  :' SYSDSORG
  SAY '  VOLUME :' SYSVOLUME
  SAY '  USED   :' SYSUSED 'tracks'
END
ELSE DO
  SAY DSNAME 'not found ('X'). Creating...'
  "ALLOC DA('"DSNAME"') NEW CATALOG",
    "SPACE(10,5) CYLINDERS",
    "RECFM(F B) LRECL(80) BLKSIZE(27920)"
  IF RC = 0 THEN SAY 'Created successfully.'
  ELSE SAY 'Error RC=' RC
END
EXIT 0

KEY CONCEPTS:
- SYSDSN() returns 'OK' if dataset exists
- LISTDSI() populates system variables with dataset attributes
- TSO ALLOC command creates datasets from REXX`,tags:["rexx","dataset","tso","automation"]},{id:"s10",category:"REXX",difficulty:"Intermediate",question:"Create a REXX exec that monitors a job's status using SDSF and sends an email alert if it abends.",answer:`/* REXX - Monitor job and alert on abend */
ARG JOBNAME
RC = ISFCALLS('ON')
ISFPREFIX = JOBNAME
ISFCOLS = 'JNAME RETCODE QUEUE'
ADDRESS SDSF "ISFEXEC ST"

FOUND = 0
DO IX = 1 TO JNAME.0
  IF JNAME.IX = JOBNAME THEN DO
    FOUND = 1
    IF POS('ABEND',RETCODE.IX) > 0 THEN DO
      SAY 'ALERT:' JOBNAME 'ABENDED -' RETCODE.IX
      /* Send email via SMTP */
      QUEUE 'HELO mainframe.company.com'
      QUEUE 'MAIL FROM:<batch@company.com>'
      QUEUE 'RCPT TO:<oncall@company.com>'
      QUEUE 'DATA'
      QUEUE 'Subject: ABEND Alert -' JOBNAME
      QUEUE JOBNAME 'ended with' RETCODE.IX
      QUEUE 'Please investigate immediately.'
      QUEUE '.'
      QUEUE 'QUIT'
      "ALLOC FI(SMTP) DA('TCPIP.SMTP.QUEUE') SHR"
      "EXECIO * DISKW SMTP (FINIS"
      "FREE FI(SMTP)"
    END
    ELSE SAY JOBNAME '- RC:' RETCODE.IX '(OK)'
  END
END
IF \\FOUND THEN SAY JOBNAME 'not found in SDSF'
RC = ISFCALLS('OFF')
EXIT 0

NOTES:
- ISFCALLS interfaces with SDSF programmatically
- ISFEXEC ST queries the Status display
- Can be scheduled via CA7 to run after critical jobs`,tags:["rexx","sdsf","monitoring","alert"]},{id:"s11",category:"IMS",difficulty:"Intermediate",question:"An IMS batch program fails with U0778 abend after a DL/I GU call. How do you diagnose and fix it?",answer:`U0778 ABEND DIAGNOSIS:

U0778 means the program encountered a DL/I status code it didn't handle. The status code is in the PCB mask.

STEPS:
1. CHECK THE PCB STATUS CODE:
   Look at PCB-STATUS-CODE in the dump
   Common codes after GU:
   - 'GE' = Segment not found (no match for SSA)
   - 'AI' = Open failure on database
   - 'AO' = I/O error on database

2. CHECK YOUR SSA:
   If GU used a qualified SSA like:
   CALL 'CBLTDLI' USING GU-FUNC PCB-MASK
     EMPLOYEE-SEGMENT
     SSA-EMPID
   Verify SSA-EMPID contains valid search data

3. FIX — Always check status after every DL/I call:
   CALL 'CBLTDLI' USING GU-FUNC ...
   IF PCB-STATUS = SPACES
     CONTINUE PROCESSING
   ELSE IF PCB-STATUS = 'GE'
     DISPLAY 'SEGMENT NOT FOUND'
   ELSE
     DISPLAY 'DL/I ERROR: ' PCB-STATUS
     MOVE 16 TO RETURN-CODE
     GOBACK
   END-IF

4. PREVENTION:
   - ALWAYS check PCB status after every DL/I call
   - Handle GE (not found) as valid business logic
   - Log unexpected status codes before abending`,tags:["ims","dli","abend","u0778"]},{id:"s12",category:"IMS",difficulty:"Expert",question:"IMS Fast Path DEDB response time has degraded from 0.5ms to 15ms during peak hours. What's your approach?",answer:`IMS FAST PATH DEDB PERFORMANCE TUNING:

1. CHECK BUFFER POOL:
   /DIS POOL ALL
   Look at: Buffer hits vs physical reads
   If hit ratio < 95%: increase DEDB buffer pool
   In DFSVSMxx: VSRBF=2048 (increase from default)

2. CHECK CI SPLITS:
   Use IMS Monitor or DBDGEN output
   If UOW (Unit of Work) areas are full:
   - DEDB online REORG using OLR (Online Reorganization)
   - /START OLREORG AREA areaname

3. ANALYZE LOCK CONTENTION:
   /DIS THREAD ALL — check for enqueue waits
   High contention on same CI:
   - Increase RANDOMIZER spread
   - Consider RAP (Root Anchor Point) redistribution

4. CHECK SEQUENTIAL DEPENDENT SEGMENTS:
   SDEP overflow can cause scan time increase
   Run SDEP REORG: DFSURGS0 utility

5. VSAM BUFFERS:
   Check OSAM/VSAM buffer allocation
   For DEDB, VSAM LSR is critical
   AMP=('BUFND=50,BUFNI=20')

6. HARDWARE:
   Ensure DEDB datasets on high-speed DASD
   Consider zHyperLink for sub-millisecond I/O`,tags:["ims","fastpath","dedb","performance"]},{id:"s13",category:"z/OS",difficulty:"Beginner",question:"What is the difference between a JOB, STEP, and TASK in z/OS? A batch job has 3 steps — explain how z/OS processes them.",answer:`z/OS JOB PROCESSING:

JOB = A unit of work submitted to JES2/JES3
- Defined by JOB card: //MYJOB JOB ...
- Contains 1-255 steps
- Gets a unique JOB ID (e.g., JOB12345)

STEP = One program execution within a job
- Defined by EXEC card: //STEP1 EXEC PGM=MYPROGRAM
- Each step runs one program
- Has its own DD statements for file allocation
- Gets a STEP completion code (RC 0-4095)

TASK = An operating system dispatchable unit
- Each step creates at least one task (TCB)
- Programs can create subtasks (ATTACH macro)
- z/OS dispatcher schedules tasks for CPU time

PROCESSING FLOW:
1. JES2 receives job from card reader/internal reader
2. JES2 converts JCL (resolves PROCs, symbols)
3. JES2 assigns job to initiator based on CLASS
4. Initiator processes STEP1:
   - Allocates datasets (DD statements)
   - Loads program into memory
   - Gives control to program
   - Program runs and sets return code
   - Datasets deallocated
5. Initiator checks COND codes
6. If COND is satisfied, processes STEP2, then STEP3
7. Job output goes to JES2 output queue
8. JES2 prints/routes output`,tags:["zos","fundamentals","batch","jes2"]},{id:"s14",category:"z/OS",difficulty:"Advanced",question:"A production LPAR is experiencing S80A abends across multiple batch jobs during month-end processing. What's your diagnosis approach?",answer:`S80A ABEND — VIRTUAL STORAGE SHORTAGE:

S80A = insufficient virtual storage (REGION) for the address space.

1. IMMEDIATE TRIAGE:
   Check JESMSGLG for the failing job:
   IEF374I STEP /STEPNAME / ABEND=S80A U0000
   Look at: IEA memory usage in dump header

2. REGION ANALYSIS:
   D A,L — Display active address spaces
   Check REGION allocation vs actual usage
   Month-end = more data = more GETMAIN requests

3. COMMON CAUSES:
   a. REGION=0M or REGION=8M too small
      Fix: REGION=0M allows max below-the-line
      Better: REGION=0M,MEMLIMIT=2G (above the bar)
   b. COBOL tables loaded entirely in memory
      Fix: Use VSAM/DB2 instead of in-memory tables
   c. Sort work area too large
      Fix: SORTWORK DD statements to disk
   d. Buffer pool too large
      Fix: Reduce BUFND/BUFNI

4. SYSTEM-WIDE FIXES:
   SMFPRMxx: Increase MAXUSER if needed
   IEFUSIxx: Set IEFUSI exit for REGION limits
   Check CSA/SQA usage: D CSA

5. LONG-TERM:
   Use SMF Type 30 to trend memory usage
   Implement MEMLIMIT for 64-bit storage
   Move large programs to 64-bit (AMODE 64)`,tags:["zos","abend","s80a","storage","region"]},{id:"s15",category:"Performance",difficulty:"Intermediate",question:"CPU utilization hit 98% during the batch window. How do you identify the culprit job and fix it?",answer:`CPU SPIKE DIAGNOSIS:

1. REAL-TIME IDENTIFICATION:
   D A,L — Display all active address spaces with CPU usage
   RMF Monitor II: Sort by CPU percentage
   Look for the top CPU consumer

2. SMF ANALYSIS:
   Extract SMF Type 30 subtype 3 (step termination):
   //CPURPT EXEC PGM=SORT
   //SORTIN DD DSN=MY.SMF.DUMP,DISP=SHR
   //SYSIN  DD *
     INCLUDE COND=(6,1,BI,EQ,X'1E',&,23,1,BI,EQ,X'03')
     SORT FIELDS=(340,4,BI,D)
   Sort by CPU time descending — top entry is your culprit

3. COMMON CAUSES:
   a. Infinite loop in COBOL PERFORM
   b. Full table scan in DB2 (missing index)
   c. VSAM sequential read of entire file
   d. Sort of very large file
   e. Data volume increase (month-end)

4. IMMEDIATE ACTIONS:
   - CANCEL jobname — if confirmed runaway
   - P jobname — gentler purge
   - Check WLM: is job in wrong service class?

5. FIX:
   - Add/rebuild DB2 indexes (RUNSTATS first)
   - Optimize COBOL loops (binary search vs linear)
   - Add VSAM buffers
   - Split large jobs into parallel streams`,tags:["performance","cpu","smf","monitoring"]},{id:"s16",category:"Performance",difficulty:"Expert",question:"A CICS region has response time SLA of 200ms but peak hour response is 800ms. DB2 thread waits are high. How do you tune it?",answer:`CICS-DB2 PERFORMANCE TUNING:

1. IDENTIFY BOTTLENECK:
   CICS Statistics: EXEC CICS INQUIRE SYSTEM
   Check: MAXTASKS, DSALIMIT, task suspensions
   DB2: -DIS THREAD(*) TYPE(ACTIVE)
   Look for: lock waits, thread reuse, plan binds

2. DB2 THREAD OPTIMIZATION:
   Current: THREADS=50 in RCT
   Increase: THREADS=100,TWAIT=POOL,THRDMAX=200
   Enable thread reuse: THRDA=50 (protected threads)
   This eliminates THREAD CREATE/TERMINATE overhead

3. SQL OPTIMIZATION:
   Run EXPLAIN on top SQL:
   - Replace tablespace scans with index access
   - Add covering indexes for frequently used queries
   - Use FETCH FIRST n ROWS for list displays
   - Avoid DISTINCT — use EXISTS instead

4. LOCK CONTENTION:
   -DIS DB(dbname) USE — check lock holders
   Fix: ISOLATION(CS) instead of RR
   Use CURRENTDATA(NO) for read-mostly
   COMMIT every 100 rows in batch updates

5. CICS TUNING:
   MAXTASK=200 (allow more concurrent tasks)
   DSALIM=512M (increase if DSA pressure)
   Enable MRO for workload distribution

6. VSAM LSR POOLS:
   Dedicated LSR pool for hot VSAM files
   LSRPOOL=2,MAXK=32768,DATA=20,INDEX=10`,tags:["cics","db2","performance","tuning","sla"]},{id:"s17",category:"JCL",difficulty:"Intermediate",question:"A job needs to conditionally execute STEP3 only if STEP1 RC=0 AND STEP2 RC<=4. How do you code this in JCL?",answer:`CONDITIONAL EXECUTION IN JCL:

Method 1 — COND parameter (traditional):
//STEP3 EXEC PGM=MYPROG,
//  COND=((0,NE,STEP1),(4,LT,STEP2))

This means: SKIP STEP3 if:
- STEP1 RC is NOT EQUAL to 0 (i.e., skip if STEP1 failed)
- STEP2 RC is LESS THAN 4 is FALSE... 

WARNING: COND is confusing! It tests when to SKIP.

Method 2 — IF/THEN/ELSE (preferred, clearer):
//  IF (STEP1.RC = 0 & STEP2.RC <= 4) THEN
//STEP3  EXEC PGM=MYPROG
//INPUT  DD DSN=MY.DATA,DISP=SHR
//OUTPUT DD DSN=MY.OUTPUT,DISP=(NEW,CATLG)
//  ENDIF

Method 3 — SET + IF for dynamic control:
// SET RUNSTP3=YES
//  IF (STEP1.RC > 0) THEN
// SET RUNSTP3=NO
//  ENDIF
//  IF (STEP2.RC > 4) THEN
// SET RUNSTP3=NO
//  ENDIF
//  IF (&RUNSTP3 = YES) THEN
//STEP3  EXEC PGM=MYPROG
//  ENDIF

BEST PRACTICE: Always use IF/THEN/ELSE over COND.`,tags:["jcl","conditional","cond","if-then"]},{id:"s18",category:"JCL",difficulty:"Expert",question:"Design a JCL job that processes 100 million records using 5 parallel steps, merges results, and handles any step failure gracefully.",answer:`PARALLEL PROCESSING JCL PATTERN:

//PARJOB  JOB ,'PARALLEL',CLASS=A,NOTIFY=&SYSUID,
//  REGION=0M,MEMLIMIT=4G
//*
//* Split input into 5 ranges by key
//SPLIT   EXEC PGM=SORT
//SORTIN  DD DSN=PROD.MASTER.INPUT,DISP=SHR
//OUT1    DD DSN=&&PART1,DISP=(NEW,PASS)
//OUT2    DD DSN=&&PART2,DISP=(NEW,PASS)
//OUT3    DD DSN=&&PART3,DISP=(NEW,PASS)
//OUT4    DD DSN=&&PART4,DISP=(NEW,PASS)
//OUT5    DD DSN=&&PART5,DISP=(NEW,PASS)
//SYSIN   DD *
  SORT FIELDS=COPY
  OUTFIL FNAMES=OUT1,INCLUDE=(1,2,CH,LE,C'CF')
  OUTFIL FNAMES=OUT2,INCLUDE=(1,2,CH,GT,C'CF',&,...LE,C'KZ')
  OUTFIL FNAMES=OUT3,...(similar ranges)
  OUTFIL FNAMES=OUT4,...
  OUTFIL FNAMES=OUT5,SAVE
/*
//*
//* Process each part (submit as separate jobs or use GDG)
//PROC1   EXEC PGM=PROCESS,PARM='PART1'
//PROC2   EXEC PGM=PROCESS,PARM='PART2'
//PROC3   EXEC PGM=PROCESS,PARM='PART3'
//PROC4   EXEC PGM=PROCESS,PARM='PART4'
//PROC5   EXEC PGM=PROCESS,PARM='PART5'
//*
//* Merge all results
//  IF (PROC1.RC <= 4 & PROC2.RC <= 4 &
//      PROC3.RC <= 4 & PROC4.RC <= 4 &
//      PROC5.RC <= 4) THEN
//MERGE   EXEC PGM=SORT
//IN1-5   DD ... (all 5 outputs)
//SORTOUT DD DSN=PROD.FINAL.OUTPUT,...
//  ELSE
//FAILSTEP EXEC PGM=IEFBR14
// Set RC=16 to trigger alerts
//  ENDIF

NOTE: For true parallel execution, submit 5 separate
jobs via CA7 with a common successor merge job.`,tags:["jcl","parallel","sort","performance","expert"]},{id:"s19",category:"COBOL",difficulty:"Beginner",question:"What is the difference between COMP, COMP-1, COMP-2, and COMP-3 in COBOL? When do you use each?",answer:`COBOL COMPUTATIONAL FORMATS:

COMP (BINARY):
  Storage: 2, 4, or 8 bytes
  PIC S9(4) COMP = 2 bytes (halfword)
  PIC S9(9) COMP = 4 bytes (fullword)
  PIC S9(18) COMP = 8 bytes (doubleword)
  USE: Counters, subscripts, indexes
  FAST for arithmetic on IBM Z

COMP-1 (Single-precision float):
  Storage: 4 bytes
  Range: ~7 significant digits
  USE: Scientific calculations (RARE in business)
  AVOID: Financial calculations (rounding errors!)

COMP-2 (Double-precision float):
  Storage: 8 bytes
  Range: ~16 significant digits
  USE: Engineering/scientific only
  AVOID: Money calculations

COMP-3 (Packed Decimal):
  Storage: (digits+1)/2 bytes
  PIC S9(7) COMP-3 = 4 bytes
  Each byte holds 2 digits, last nibble = sign
  USE: All financial/business calculations
  This is THE standard for mainframe business data

BEST PRACTICES:
- Financial data → COMP-3 (always)
- Loop counters → COMP (fastest)
- Array subscripts → COMP
- Never use COMP-1/COMP-2 for money
- Use COMP-3 for file/DB2 fields`,tags:["cobol","comp","data-types","fundamentals"]},{id:"s20",category:"COBOL",difficulty:"Expert",question:"A COBOL batch program processes 50 million records and takes 4 hours. Management wants it under 1 hour. What optimization strategies do you apply?",answer:`COBOL PERFORMANCE OPTIMIZATION (4hr → 1hr):

1. I/O OPTIMIZATION (Biggest wins):
   - BLKSIZE: Increase to half-track (27998 for 3390)
     DCB=(RECFM=FB,LRECL=200,BLKSIZE=27800)
   - BUFNO: Add buffers
     AMP=('BUFND=20') for VSAM
   - Replace sequential READ with BLOCK READ

2. USE SORT INSTEAD OF COBOL LOGIC:
   If filtering/summarizing: DFSORT is 10-100x faster
   //STEP1 EXEC PGM=SORT not PGM=MYPROG

3. COBOL CODE CHANGES:
   a. BINARY counters:
      01 WS-COUNT PIC S9(9) COMP.  (not DISPLAY)
   b. Replace COMPUTE with ADD/SUBTRACT for simple math
   c. Minimize PERFORM VARYING — use inline code
   d. SEARCH ALL (binary) instead of SEARCH (linear)
   e. Avoid STRING/UNSTRING in inner loops
   f. Use reference modification: WS-DATA(1:5)

4. DB2 OPTIMIZATION:
   - Multi-row FETCH: FETCH FIRST 100 ROWS
   - OPTIMIZE FOR 100 ROWS
   - Use ROWSET positioning
   - Avoid singleton SELECT in loops

5. ARCHITECTURE:
   - Split into 5 parallel streams by key range
   - Process each stream in separate job step
   - Merge results at end
   Expected: 4hr / 5 = 48 minutes`,tags:["cobol","performance","optimization","batch"]},{id:"s21",category:"DB2",difficulty:"Beginner",question:"Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN in DB2 with examples.",answer:`DB2 JOIN TYPES:

Sample tables:
  EMPLOYEE: (EMPID, NAME, DEPTID)
  DEPARTMENT: (DEPTID, DEPTNAME)

1. INNER JOIN — Only matching rows from both:
   SELECT E.NAME, D.DEPTNAME
   FROM EMPLOYEE E
   INNER JOIN DEPARTMENT D ON E.DEPTID = D.DEPTID
   Result: Only employees who have a valid department
   Employees with NULL DEPTID are EXCLUDED

2. LEFT JOIN — All from left + matching from right:
   SELECT E.NAME, D.DEPTNAME
   FROM EMPLOYEE E
   LEFT JOIN DEPARTMENT D ON E.DEPTID = D.DEPTID
   Result: ALL employees, even those without department
   DEPTNAME shows NULL for unmatched employees

3. FULL OUTER JOIN — All from both sides:
   SELECT E.NAME, D.DEPTNAME
   FROM EMPLOYEE E
   FULL OUTER JOIN DEPARTMENT D ON E.DEPTID = D.DEPTID
   Result: All employees + all departments
   NULLs appear on both sides where no match exists

PERFORMANCE TIP:
- INNER JOIN is fastest (less data)
- LEFT JOIN for master-detail reports
- FULL OUTER JOIN is slowest — avoid in OLTP
- Always join on indexed columns`,tags:["db2","sql","joins","fundamentals"]},{id:"s22",category:"DB2",difficulty:"Expert",question:"A DB2 SQL query that ran in 2 seconds yesterday now takes 45 seconds. Code hasn't changed. Diagnose and fix.",answer:`DB2 PERFORMANCE REGRESSION DIAGNOSIS:

1. CHECK STATISTICS (Most likely cause):
   RUNSTATS was either: not run, or ran and changed access path
   SELECT CARD, NPAGES FROM SYSIBM.SYSTABLES
   WHERE NAME = 'MYTABLE'
   If CARD = -1: stats are stale → run RUNSTATS

2. EXPLAIN THE QUERY:
   EXPLAIN ALL SET QUERYNO=999 FOR
   SELECT ... (your query)
   
   Check PLAN_TABLE:
   SELECT ACCESSTYPE, MATCHCOLS, INDEXONLY, METHOD
   FROM PLAN_TABLE WHERE QUERYNO=999
   
   Look for: ACCESSTYPE='R' (tablespace scan = bad)
   Should be: ACCESSTYPE='I' (index access)

3. FIX ACCESS PATH:
   a. Run RUNSTATS:
      RUNSTATS TABLESPACE dbname.tsname
        TABLE(schema.table) INDEX(ALL)
        SHRLEVEL REFERENCE
   b. REBIND the package:
      REBIND PACKAGE(collection.package)
   c. If still bad: CREATE INDEX on join/filter columns

4. CHECK LOCK CONTENTION:
   -DIS THREAD(*) — check for lock waits
   DISPLAY DATABASE(db) SPACENAM(ts) USE
   Someone holding locks on the table?

5. OTHER CAUSES:
   - Buffer pool pressure (BP flushed by month-end batch)
   - Index CLUSTERRATIO dropped (needs REORG)
   - Data volume tripled (month-end)
   - LPAR CPU change affecting parallelism`,tags:["db2","performance","explain","runstats"]},{id:"s23",category:"CICS",difficulty:"Beginner",question:"What is the difference between COMMAREA and CHANNEL/CONTAINER in CICS? When should you use each?",answer:`CICS DATA PASSING MECHANISMS:

COMMAREA (Communication Area):
  Max size: 32,763 bytes (32KB)
  How: EXEC CICS LINK PROGRAM('PROG1')
       COMMAREA(WS-COMM) LENGTH(500)
  Pros: Simple, well-understood, fast
  Cons: 32KB limit, single flat data structure
  Use when: Data fits in 32KB, simple request/response

CHANNEL/CONTAINER:
  Max size: Unlimited (limited by storage)
  How:
  EXEC CICS PUT CONTAINER('REQUEST')
       CHANNEL('MYSERVICE')
       FROM(WS-REQUEST-DATA)
       FLENGTH(LENGTH OF WS-REQUEST-DATA)
  
  EXEC CICS LINK PROGRAM('PROG1')
       CHANNEL('MYSERVICE')
  
  EXEC CICS GET CONTAINER('RESPONSE')
       CHANNEL('MYSERVICE')
       INTO(WS-RESPONSE)
  
  Pros: No size limit, named containers, structured
  Cons: Slightly more code
  Use when: Data > 32KB, XML/JSON payloads,
            microservices pattern, web services

BEST PRACTICE:
  New development → Always use CHANNEL/CONTAINER
  Existing programs → Keep COMMAREA if < 32KB
  z/OS Connect APIs → Requires CHANNEL/CONTAINER`,tags:["cics","commarea","channel","container"]},{id:"s24",category:"CICS",difficulty:"Advanced",question:"CICS transactions are experiencing ATSP abends during peak. What does this mean and how do you fix it?",answer:`ATSP ABEND — DEADLOCK TIMEOUT:

ATSP = Transaction purged because it exceeded DTIMOUT (deadlock timeout).

1. IMMEDIATE DIAGNOSIS:
   CICS LOG: Check CSMT log for ATSP messages
   EXEC CICS INQUIRE SYSTEM — check MAXTASKS, active tasks
   What resource was the task waiting for?

2. COMMON CAUSES:
   a. DB2 lock contention:
      Transaction A holds lock on row 1, wants row 2
      Transaction B holds lock on row 2, wants row 1
      → Deadlock! DB2 resolves but CICS times out
   b. VSAM record-level locking:
      Multiple tasks updating same VSAM record
   c. CICS enqueue waits:
      ENQ on shared resource with NOSUSPEND missing

3. IMMEDIATE FIX:
   Increase DTIMOUT:
   CEDA ALTER TRANS(XXXX) DTIMOUT(60)
   (Default is often 30 seconds)

4. ROOT CAUSE FIXES:
   a. DB2: COMMIT more frequently
      Don't hold locks across CICS SEND/RECEIVE
      Use ISOLATION(CS) not ISOLATION(RR)
   b. VSAM: READ UPDATE only when needed
      Release lock with REWRITE/DELETE quickly
   c. Design: Access resources in consistent order
      Always lock TABLE A before TABLE B

5. MONITORING:
   Track ATSP count in CICS statistics
   Alert if > 10 per hour`,tags:["cics","atsp","deadlock","performance"]},{id:"s25",category:"TSO",difficulty:"Beginner",question:"You're new to a mainframe environment. How do you navigate ISPF to find a dataset, edit it, submit JCL, and check output?",answer:`ISPF NAVIGATION GUIDE:

1. FIND A DATASET:
   ISPF 3.4 (Dataset List Utility)
   Enter: PROD.BATCH.** in DSNAME LEVEL
   Press ENTER — shows all matching datasets
   Type 'B' next to dataset to Browse
   Type 'E' to Edit

2. EDIT A MEMBER:
   ISPF 2 (Edit)
   Enter: 'PROD.SOURCE.JCL(MYJOB)'
   Edit commands:
   I = Insert line
   D = Delete line
   C/CC = Copy, M/MM = Move
   F string = Find text
   CHANGE string1 string2 ALL = Replace all
   SAVE = Save changes
   SUBMIT = Submit as JCL job

3. SUBMIT JCL:
   In editor: Type SUBMIT on command line
   Or: =SD (Submit from DSLIST)
   Note the job number: JOB12345

4. CHECK OUTPUT:
   ISPF SD.ST (SDSF Status Display)
   Or: TSO command: STATUS MYJOB
   In SDSF:
   - ST = Status of jobs
   - H = Held output
   - Type 'S' next to job to see output
   - Type '?' to see all DDNAMEs
   - Check JESMSGLG for JCL errors
   - Check SYSOUT for program output

SHORTCUTS:
  =3.4 from any panel goes to DSLIST
  =SD goes to SDSF
  =2 goes to Edit`,tags:["tso","ispf","navigation","beginner"]},{id:"s26",category:"RACF",difficulty:"Expert",question:"Audit found 200+ RACF user IDs with SPECIAL attribute. How do you remediate this security risk?",answer:`RACF SPECIAL ATTRIBUTE REMEDIATION:

SPECIAL = Full RACF administrative authority.
Should be limited to 3-5 security admins maximum.

1. IDENTIFY ALL SPECIAL USERS:
   SEARCH CLASS(USER) SPECIAL
   Output: List of all user IDs with SPECIAL

2. CATEGORIZE:
   a. True security admins (keep SPECIAL): 3-5 users
   b. System programmers (need OPERATIONS instead)
   c. Application support (need group-level authority)
   d. Historical/legacy (remove immediately)
   e. Service accounts (should NEVER have SPECIAL)

3. REMOVE SPECIAL:
   ALTUSER userid NOSPECIAL
   Do in batches, document each change

4. REPLACE WITH PROPER AUTHORITY:
   For group admins:
   CONNECT userid GROUP(grpname) AUTH(USE) ADSP
   
   For dataset admins:
   PERMIT 'HLQ.**' CLASS(DATASET) ID(userid) ACCESS(ALTER)
   
   For system programmers:
   ALTUSER userid OPERATIONS  (instead of SPECIAL)

5. PREVENT RECURRENCE:
   Implement SETROPTS AUDIT for:
   SETROPTS AUDIT(SPECIAL)
   This logs every SPECIAL attribute change
   
   Create monthly report:
   SEARCH CLASS(USER) SPECIAL
   Alert if count > 5

6. COMPLIANCE:
   Document the remediation for SOX/PCI-DSS
   Update security policy to require dual approval
   for SPECIAL attribute grants`,tags:["racf","security","audit","compliance","expert"]},{id:"s27",category:"Modernization",difficulty:"Intermediate",question:"Leadership wants to expose a 30-year-old CICS/COBOL application as a mobile REST API. Timeline: 3 months. What's your plan?",answer:`MAINFRAME API MODERNIZATION PLAN:

Week 1-2: DISCOVERY & MAPPING
- Inventory all CICS transactions (CEDA DISPLAY)
- Map transactions to REST resources:
  CINQ → GET /api/customers/{id}
  CUPD → PUT /api/customers/{id}
  CORD → POST /api/orders
- Document COMMAREA/copybook structures
- Identify which transactions are suitable for API

Week 3-4: z/OS CONNECT SETUP
- Install z/OS Connect EE
- Configure CICS connection:
  cicsConnection → point to target CICS region
- Set up API requester for outbound calls

Week 5-8: SERVICE DEFINITIONS
- For each API endpoint:
  1. Create Service: maps JSON ↔ COBOL copybook
  2. Create API: defines REST endpoint + HTTP methods
  3. Test with Swagger UI
- Example service.json:
  { "name":"getCustomer", "connection":{
    "cicsServer":"CICSPROD",
    "transactionId":"CINQ",
    "commarea":{"requestCopybook":"CINQREQ",
                "responseCopybook":"CINQRSP"}}}

Week 9-10: SECURITY & AUTH
- Configure OAuth 2.0 via API Connect or z/OS Connect
- Map JWT tokens to RACF user IDs
- Set up SSL/TLS certificates

Week 11-12: TESTING & GO-LIVE
- Performance test: target < 200ms response
- Load test: simulate 1000 concurrent mobile users
- Deploy to production with API gateway

KEY: Zero changes to existing COBOL code!`,tags:["modernization","api","zos-connect","cics","rest"]},{id:"s28",category:"Modernization",difficulty:"Expert",question:"Your company wants to migrate 5000 COBOL programs to Java. You need to present a strategy to the CTO. What do you recommend?",answer:`COBOL MIGRATION STRATEGY — CTO PRESENTATION:

RECOMMENDATION: Do NOT rewrite everything.
75% of rewrite projects fail. Use the Strangler Fig pattern.

PHASE 1 — EXPOSE (Month 1-6):
  Don't touch COBOL. Wrap it with APIs.
  - z/OS Connect exposes CICS transactions as REST
  - New mobile/web frontends call these APIs
  - COBOL continues running untouched
  - Zero risk, immediate value

PHASE 2 — EXTEND (Month 6-18):
  Build NEW features in modern tech.
  - New microservices in Java/Node on OpenShift
  - They call mainframe APIs for existing data
  - New UI talks to both old APIs + new services
  - Gradually route traffic to new services

PHASE 3 — EXTRACT (Month 18-36):
  Selectively rewrite high-value programs.
  - Identify top 20% programs (80% of transactions)
  - Rewrite THESE in Java, one at a time
  - Keep mainframe running for remaining 80%
  - Each rewrite: redirect API traffic to new service

PHASE 4 — EVALUATE (Ongoing):
  Some COBOL may NEVER need rewriting.
  - If it works, it works
  - Cost of rewrite > cost of maintenance?
  - Keep on mainframe — it's reliable

COST COMPARISON:
  Full rewrite: $50-100M, 5 years, high risk
  Strangler Fig: $5-15M, 3 years, low risk
  The mainframe isn't the problem — the interface is.`,tags:["modernization","migration","strategy","architecture"]},{id:"s29",category:"JCL",difficulty:"Advanced",question:"A production GDG (Generation Data Group) has reached its LIMIT and new generations are failing with NOT CATLGD 2. How do you resolve this without losing data?",answer:`GDG LIMIT RESOLUTION:

1. CHECK CURRENT STATE:
   LISTCAT ENT('PROD.PAYROLL.GDG') GDG ALL
   Shows: LIMIT(30), current generations, SCRATCH/NOSCRATCH

2. IMMEDIATE FIX — Increase limit:
   //GDGFIX EXEC PGM=IDCAMS
   //SYSIN DD *
     ALTER PROD.PAYROLL.GDG LIMIT(50)
   /*

3. IF GENERATIONS NEED CLEANUP:
   Delete oldest generations:
   DELETE PROD.PAYROLL.GDG.G0001V00 NOSCRATCH
   Or let GDG roll off naturally with SCRATCH attribute

4. BEST PRACTICES:
   - Set LIMIT based on retention needs (e.g., 30 days = LIMIT(30))
   - Use SCRATCH option to auto-delete oldest when limit reached
   - EMPTY vs NOEMPTY: EMPTY deletes all on rolloff, NOEMPTY keeps
   - Monitor GDG usage in monthly housekeeping jobs`,tags:["jcl","gdg","catalog","production"]},{id:"s30",category:"COBOL",difficulty:"Advanced",question:"Your COBOL program needs to call a REST API on a distributed server and process the JSON response. How do you implement this on z/OS?",answer:`COBOL REST API INTEGRATION:

Option 1 — z/OS Connect (Recommended):
  COBOL calls CICS LINK to a z/OS Connect service
  z/OS Connect handles HTTP/JSON externally
  COBOL only sees copybook structures — zero JSON parsing

Option 2 — Enterprise COBOL V6.3 JSON PARSE:
  01 WS-JSON-RESPONSE PIC X(5000).
  01 WS-EMPLOYEE.
    05 EMP-NAME    PIC X(30).
    05 EMP-SALARY  PIC 9(8)V99.
  
  CALL 'HWTJSCRE' USING ... (create HTTP request)
  CALL 'HWTJCONN' USING ... (connect to server)
  CALL 'HWTJREQ'  USING ... (send GET request)
  CALL 'HWTJRSPS' USING ... (receive response)
  
  JSON PARSE WS-JSON-RESPONSE
    INTO WS-EMPLOYEE
    NAME OF EMP-NAME IS 'name'
    NAME OF EMP-SALARY IS 'salary'
  END-JSON

Option 3 — CICS Web Services:
  EXEC CICS WEB OPEN HOST('api.server.com')
  EXEC CICS WEB SEND (HTTP request)
  EXEC CICS WEB RECEIVE INTO(WS-RESPONSE)
  Then JSON PARSE the response

Best practice: Use z/OS Connect — no COBOL changes needed.`,tags:["cobol","api","json","rest","advanced"]},{id:"s31",category:"DB2",difficulty:"Intermediate",question:"You need to write a DB2 query that finds all employees who earn more than their department average. How do you approach this?",answer:`DB2 CORRELATED SUBQUERY SOLUTION:

Method 1 — Correlated subquery:
  SELECT E.EMPID, E.NAME, E.SALARY, E.DEPTID
  FROM EMPLOYEE E
  WHERE E.SALARY > (
    SELECT AVG(E2.SALARY)
    FROM EMPLOYEE E2
    WHERE E2.DEPTID = E.DEPTID
  )
  ORDER BY E.DEPTID, E.SALARY DESC

Method 2 — CTE (Common Table Expression) — often faster:
  WITH DEPT_AVG AS (
    SELECT DEPTID, AVG(SALARY) AS AVG_SAL
    FROM EMPLOYEE
    GROUP BY DEPTID
  )
  SELECT E.EMPID, E.NAME, E.SALARY, 
         D.AVG_SAL AS DEPT_AVERAGE
  FROM EMPLOYEE E
  JOIN DEPT_AVG D ON E.DEPTID = D.DEPTID
  WHERE E.SALARY > D.AVG_SAL
  ORDER BY E.DEPTID

Method 3 — OLAP function (most elegant):
  SELECT * FROM (
    SELECT EMPID, NAME, SALARY, DEPTID,
           AVG(SALARY) OVER(PARTITION BY DEPTID) AS DEPT_AVG
    FROM EMPLOYEE
  ) T
  WHERE SALARY > DEPT_AVG

Performance: CTE > OLAP > Correlated subquery`,tags:["db2","sql","subquery","intermediate"]},{id:"s32",category:"CICS",difficulty:"Expert",question:"Design a CICS microservices architecture where 5 CICS regions handle different domains. How do you implement inter-region communication and transaction coordination?",answer:`CICS MICROSERVICES ARCHITECTURE:

1. REGION DESIGN:
   CICS-CUST: Customer management
   CICS-ORD:  Order processing
   CICS-INV:  Inventory
   CICS-PAY:  Payments
   CICS-REPT: Reporting

2. INTER-REGION COMMUNICATION:
   MRO (Multi-Region Operation):
   - Function shipping: CICS-ORD reads customer via CICS-CUST
   - Transaction routing: route CINQ to CICS-CUST
   - DPL (Distributed Program Link): synchronous calls
   
   IPIC (IP Interconnectivity):
   - Modern TCP/IP based connection
   - Supports channels/containers (no 32KB limit)
   - Better for z/OS Connect integration

3. TRANSACTION COORDINATION:
   Two-Phase Commit across regions:
   - CICS-ORD creates order (SYNCPOINT)
   - CICS-INV decrements stock
   - CICS-PAY charges customer
   - All commit together or all rollback
   Configure: SYSID, CONNECTION, SESSIONS in CSD

4. SERVICE MESH PATTERN:
   Each region exposes APIs via z/OS Connect
   API Gateway routes to correct region
   Circuit breaker pattern via CICS policy rules
   Health checks via CICS WEB services

5. MONITORING:
   CICSPlex SM for cross-region management
   Workload balancing across AORs`,tags:["cics","microservices","mro","architecture","expert"]},{id:"s33",category:"VSAM",difficulty:"Intermediate",question:"How do you use IDCAMS REPRO to backup a VSAM KSDS, and what's the difference between REPRO and EXPORT?",answer:`VSAM BACKUP METHODS:

REPRO (Logical copy — records only):
  //BACKUP EXEC PGM=IDCAMS
  //VSAMDD DD DSN=PROD.VSAM.KSDS,DISP=SHR
  //SEQDD  DD DSN=BACKUP.SEQ.FILE,DISP=(NEW,CATLG),
  //          SPACE=(CYL,(100,50)),DCB=(RECFM=VB,LRECL=32756)
  //SYSIN  DD *
    REPRO INFILE(VSAMDD) OUTFILE(SEQDD)
  /*
  
  Pros: Platform independent, human-readable
  Cons: Loses cluster definition, slower
  Restore: REPRO INFILE(SEQDD) OUTFILE(VSAMDD)
  NOTE: Target VSAM must exist before restore

EXPORT (Physical copy — data + catalog info):
  //EXPORT EXEC PGM=IDCAMS
  //SYSIN  DD *
    EXPORT PROD.VSAM.KSDS -
      OUTFILE(EXPDD) -
      TEMPORARY
  /*
  //EXPDD DD DSN=BACKUP.EXPORT.FILE,...
  
  Pros: Preserves cluster definition, faster
  Cons: z/OS specific format
  Restore: IMPORT INFILE(IMPDD) OUTDATASET(PROD.VSAM.KSDS)
  NOTE: IMPORT recreates cluster automatically

BEST PRACTICE:
  Daily backup: EXPORT (faster, self-contained)
  Migration/archive: REPRO (portable)
  Always verify: VERIFY DATASET(PROD.VSAM.KSDS)`,tags:["vsam","backup","repro","export","idcams"]},{id:"s34",category:"VSAM",difficulty:"Expert",question:"A VSAM KSDS serving online CICS transactions has 200ms response time instead of target 5ms. LISTCAT shows 127 extents and 60% CI splits. Design a complete recovery and prevention plan.",answer:`VSAM CRITICAL PERFORMANCE RECOVERY:

1. EMERGENCY ASSESSMENT:
   LISTCAT ENT(PROD.CICS.KSDS) ALL
   Key metrics:
   - EXTENTS: 127 (max 255 before failure!)
   - CI-SPLITS: 60% (terrible — causes random I/O)
   - CA-SPLITS: Check count
   - FREESPACE: Likely 0% remaining
   - REC-TOTAL vs REC-DELETED (fragmentation)

2. EMERGENCY REORG (coordinate with CICS):
   Step 1: Close file in CICS: CEMT SET FILE(xxxx) CLOSE
   Step 2: EXPORT for safety:
     EXPORT PROD.CICS.KSDS OUTFILE(BKUP) TEMPORARY
   Step 3: DELETE and REDEFINE:
     DELETE PROD.CICS.KSDS CLUSTER
     DEFINE CLUSTER(NAME(PROD.CICS.KSDS) -
       INDEXED KEYS(10 0) -
       RECSZ(500 600) -
       FREESPACE(30 20) -
       SHAREOPTIONS(2 3) -
       CISZ(8192) -
       CYLINDERS(200 50))
   Step 4: IMPORT INFILE(BKUP) OUTDATASET(...)
   Step 5: CEMT SET FILE(xxxx) OPEN

3. PREVENTION PLAN:
   - Weekly automated REORG job via CA7
   - SMF Type 64 monitoring for split alerts
   - FREESPACE(30 20) for high-insert workloads
   - CISZ tuned to record size (4K-8K optimal)
   - Primary allocation large enough to avoid extents
   - BUFND=30,BUFNI=15 in CICS FCT`,tags:["vsam","performance","reorg","cics","expert"]},{id:"s35",category:"REXX",difficulty:"Advanced",question:"Write a REXX exec that reads a PDS directory, finds all members modified in the last 7 days, and generates a report.",answer:`/* REXX - PDS Member Modification Report */
ARG PDSNAME
IF PDSNAME = '' THEN DO
  SAY 'Usage: PDSRPT pds.name'
  EXIT 8
END

/* Get member list using ISPF services */
ADDRESS ISPEXEC
"LMINIT DATAID(DID) DATASET('"PDSNAME"') ENQ(SHR)"
"LMOPEN DATAID("DID") OPTION(INPUT)"

COUNT = 0
SAY COPIES('=',60)
SAY 'PDS MODIFICATION REPORT:' PDSNAME
SAY 'Generated:' DATE() TIME()
SAY COPIES('=',60)
SAY LEFT('MEMBER',10) LEFT('MODIFIED',12) LEFT('USER',8) 'SIZE'
SAY COPIES('-',60)

MBR = ''
DO FOREVER
  "LMMLIST DATAID("DID") OPTION(LIST) MEMBER(MBR)"
  IF RC \\= 0 THEN LEAVE
  
  /* Get member stats */
  "LMMFIND DATAID("DID") MEMBER("MBR") STATS(YES)"
  
  /* Check if modified within 7 days */
  MODDATE = ZLMDATE  /* YYYY/MM/DD format */
  TODAY = DATE('S')  /* YYYYMMDD */
  MDATE = TRANSLATE(MODDATE,,'/')
  DIFF = TODAY - MDATE
  
  IF DIFF <= 7 THEN DO
    COUNT = COUNT + 1
    SAY LEFT(MBR,10) LEFT(ZLMDATE,12) LEFT(ZLMUSER,8) ZLCNORC
  END
END

SAY COPIES('=',60)
SAY 'Members modified in last 7 days:' COUNT

"LMCLOSE DATAID("DID")"
"LMFREE DATAID("DID")"
EXIT 0

NOTES:
- Uses ISPF LM services for reliable PDS access
- ZLMDATE, ZLMUSER, ZLCNORC are ISPF variables
- Can be extended to email the report or write to dataset`,tags:["rexx","pds","ispf","report","advanced"]},{id:"s36",category:"REXX",difficulty:"Expert",question:"Design a REXX automation framework that monitors 50 production batch jobs, detects abends in real-time via SDSF, and triggers recovery actions automatically.",answer:`/* REXX - Production Job Monitor Framework */

DESIGN:
1. CONFIGURATION TABLE (PDS member):
   JOBNAME  RECOVERY_ACTION  ALERT_EMAIL  MAX_RETRIES
   PAYJOB01 RESTART          oncall@co.com 3
   GLPOST01 RERUN_STEP3      gl@co.com     2
   RPTJOB01 NOTIFY_ONLY      mgr@co.com    0

2. MAIN MONITOR LOOP:
   RC = ISFCALLS('ON')
   DO FOREVER
     ISFPREFIX = '*'
     ADDRESS SDSF "ISFEXEC ST"
     DO I = 1 TO JNAME.0
       IF POS('ABEND',RETCODE.I) > 0 THEN
         CALL HANDLE_ABEND JNAME.I RETCODE.I
       IF POS('JCL ERROR',RETCODE.I) > 0 THEN
         CALL HANDLE_JCLERR JNAME.I
     END
     CALL SLEEP 30  /* Check every 30 seconds */
   END

3. RECOVERY ACTIONS:
   HANDLE_ABEND:
     PARSE ARG JOBNAME, RETCODE
     /* Lookup in config table */
     ACTION = GET_CONFIG(JOBNAME,'ACTION')
     SELECT
       WHEN ACTION = 'RESTART' THEN DO
         "SUBMIT 'PROD.JCL("JOBNAME")'"
         CALL LOG 'Restarted' JOBNAME
       END
       WHEN ACTION = 'RERUN_STEP3' THEN DO
         /* Modify JCL to restart from step */
         CALL EDIT_RESTART JOBNAME, 'STEP3'
       END
       OTHERWISE CALL SEND_ALERT JOBNAME RETCODE
     END

4. ALERTING:
   SEND_ALERT: Uses SMTP to email
   Also writes to operator console:
   "WTO 'MONITOR: "JOBNAME" ABENDED "RETCODE"'"

5. LOGGING:
   All actions logged to VSAM KSDS with timestamp
   Monthly report generated from log`,tags:["rexx","automation","monitoring","sdsf","expert"]},{id:"s37",category:"IMS",difficulty:"Beginner",question:"What is the difference between IMS DB (Database) and IMS TM (Transaction Manager)? Explain with a real-world example.",answer:`IMS COMPONENTS EXPLAINED:

IMS DB (Database Manager):
  - Manages HIERARCHICAL databases
  - Data organized as parent-child segments (like a tree)
  - Example: Bank Account database
    CUSTOMER (root)
      └── ACCOUNT (child)
           └── TRANSACTION (grandchild)
  - Access via DL/I calls: GU, GN, GNP, ISRT, REPL, DLET
  - Types: HDAM, HIDAM, HISAM, DEDB (Fast Path)

IMS TM (Transaction Manager):
  - Handles online transaction processing (like CICS)
  - Receives messages from terminals/networks
  - Routes to application programs (MPPs)
  - Manages message queues
  - Example flow:
    Terminal → IMS Connect → IMS TM → MPP → IMS DB

REAL-WORLD EXAMPLE (Bank ATM):
  1. Customer inserts card at ATM
  2. ATM sends message to IMS Connect (TCP/IP)
  3. IMS TM receives, routes to MPP program ATMBAL
  4. ATMBAL issues DL/I GU call to IMS DB
     GU CUSTOMER(CUSTID='12345')
        ACCOUNT(ACCTTYPE='CHECKING')
  5. IMS DB returns account segment with balance
  6. ATMBAL sends balance back through IMS TM
  7. ATM displays: Balance $5,432.10

IMS processes 50,000+ transactions per second.`,tags:["ims","fundamentals","database","transaction"]},{id:"s38",category:"IMS",difficulty:"Advanced",question:"An IMS HIDAM database is experiencing degraded performance on GN (Get Next) calls. Root cause analysis and fix?",answer:`IMS HIDAM PERFORMANCE DIAGNOSIS:

HIDAM = Hierarchical Indexed Direct Access Method
GN calls traverse segments sequentially under a root.

1. CHECK DATABASE STATISTICS:
   /DIS DB dbname
   Look at: buffer pool hit ratio, I/O counts
   IMS Monitor: Check random vs sequential I/O

2. COMMON CAUSES OF SLOW GN:
   a. Database needs REORG:
      - Segments stored out of physical sequence
      - Pointer chains fragmented
      - Fix: Run DFSURGL0 (offline REORG)
      - Or HALDB Online Reorg for 24/7 systems
   
   b. Insufficient buffers:
      - VSAM LSR pool too small
      - Fix: Increase DFSVSAMP buffers
        VSRBF=8192,20  (20 buffers of 8K)
   
   c. Index needs rebuild:
      - Primary index (HIDAM index) fragmented
      - Fix: REORG the index dataset
   
   d. Long twin chains:
      - Many child segments under one parent
      - GN scans entire chain sequentially
      - Fix: Add secondary index on search field
        Or restructure DBD with more segment types

3. TUNING:
   - PROCOPT=G (read only) instead of PROCOPT=A
   - Use GNP (Get Next within Parent) not GN
   - Limit SSA qualifications to reduce I/O
   - Consider converting to DEDB for hot data`,tags:["ims","hidam","performance","reorg","advanced"]},{id:"s39",category:"z/OS",difficulty:"Intermediate",question:"Explain WLM (Workload Manager) service classes and how they prioritize batch vs online work on z/OS.",answer:`z/OS WORKLOAD MANAGER (WLM):

WLM controls HOW z/OS allocates CPU, memory, and I/O to different workloads.

SERVICE CLASSES (priority groups):
  1. SYSSTC (System tasks) — Highest priority
     JES2, VTAM, TCP/IP, catalog
  2. ONLINE (CICS, IMS TM) — High priority
     Goal: 95% of transactions < 200ms
  3. TSO INTERACTIVE — Medium-high
     Goal: Response time < 1 second
  4. BATCH PRODUCTION — Medium
     Goal: Complete within batch window
  5. BATCH DEVELOPMENT — Low
     Goal: Best effort, no SLA
  6. BATCH DISCRETIONARY — Lowest
     Runs only when spare capacity

HOW WLM WORKS:
  - Each job assigned to service class by CLASSIFICATION RULES
  - Rules match on: JOB name, JOB class, user ID, accounting
  - WLM continuously monitors response time goals
  - If CICS is missing its 200ms goal:
    → WLM steals CPU from low-priority batch
    → Adjusts dispatching priority dynamically
  - If batch window is at risk:
    → WLM boosts batch priority temporarily

PRACTICAL EXAMPLE:
  Month-end: batch jobs spike
  WLM detects CICS degradation
  WLM reduces batch dispatching priority
  CICS recovers to 200ms goal
  After peak: batch priority restored

KEY: WLM is GOAL-BASED not PRIORITY-BASED.`,tags:["zos","wlm","workload","performance"]},{id:"s40",category:"z/OS",difficulty:"Expert",question:"Design a z/OS Sysplex configuration for a bank that needs 99.999% availability. What components and failover strategies do you implement?",answer:`z/OS PARALLEL SYSPLEX — 99.999% DESIGN:

1. HARDWARE:
   - 2 IBM z16 frames (different power grids)
   - Coupling Facility (CF) on each frame
   - FICON directors for cross-frame connectivity
   - GDPS (Geographically Dispersed Parallel Sysplex)
     for disaster recovery at remote site

2. z/OS CONFIGURATION:
   - 4 LPARs total (2 per frame)
   - XCF (Cross-System Coupling Facility) links all 4
   - Each LPAR runs: z/OS, CICS, DB2, IMS
   - Shared DASD via PPRC (Peer-to-Peer Remote Copy)

3. DATA SHARING:
   - DB2 Data Sharing: all 4 members access same data
   - VSAM RLS (Record Level Sharing) for CICS files
   - Shared catalog (coupling facility structures)
   - GRS (Global Resource Serialization) for ENQ

4. FAILOVER:
   - ARM (Automatic Restart Manager):
     If CICS region fails → ARM restarts on same LPAR
     If LPAR fails → ARM restarts on surviving LPAR
   - WLM routes work away from failing system
   - VTAM Generic Resources: CICS accessible via single name
   - DB2 Group Attach: apps connect to DB2 group, not member

5. DISASTER RECOVERY:
   - GDPS: synchronous replication to DR site (< 50km)
   - RPO = 0 (zero data loss)
   - RTO < 10 minutes (automated failover)
   - Annual DR test required for audit

RESULT: No single point of failure at any level.`,tags:["zos","sysplex","availability","architecture","expert"]},{id:"s41",category:"Performance",difficulty:"Beginner",question:"What is SMF (System Management Facilities) and how is it used for performance monitoring on z/OS?",answer:`SMF — z/OS PERFORMANCE DATA:

SMF records EVERYTHING that happens on z/OS:
  - Every job that runs (start, end, resources used)
  - Every dataset accessed
  - Every CICS transaction
  - Every DB2 query
  - Security events (RACF)
  - Hardware utilization

KEY SMF RECORD TYPES:
  Type 14/15: Dataset activity (open/close)
  Type 30:    Job/step accounting (CPU, elapsed time)
  Type 42:    Storage/paging activity
  Type 70-79: RMF (system performance)
  Type 80:    RACF security events
  Type 89:    Usage data (software pricing)
  Type 100:   DB2 accounting
  Type 101:   DB2 performance
  Type 110:   CICS transaction data

HOW TO USE:
  1. SMF records written to SMF datasets (SYS1.MANx)
  2. IFASMFDP dumps records to sequential file
  3. DFSORT/ICETOOL processes specific record types
  4. Reports created using SAS, MXG, or custom programs

EXAMPLE — Find top CPU jobs:
  //CPURPT EXEC PGM=SORT
  //SORTIN DD DSN=MY.SMF.DUMP
  //SYSIN DD *
    INCLUDE COND=(6,1,BI,EQ,X'1E')  ← Type 30
    SORT FIELDS=(340,4,BI,D)  ← Sort by CPU desc

SMF is the foundation of ALL z/OS performance analysis.`,tags:["performance","smf","monitoring","beginner"]},{id:"s42",category:"Performance",difficulty:"Advanced",question:"A z/OS LPAR is experiencing high paging rates (500 pages/second). How do you diagnose and resolve the real storage shortage?",answer:`z/OS PAGING DIAGNOSIS:

1. IMMEDIATE CHECK:
   D ASM — Display Auxiliary Storage Manager
   Shows: page dataset usage, slot counts
   D PROG,LPA — Check LPA usage
   RMF Monitor II: Check UIC (Unreferenced Interval Count)
   UIC < 3 = CRITICAL storage pressure

2. IDENTIFY THE CAUSE:
   D A,L — Show all address spaces with storage
   Look for: unusually large REGION consumers
   
   SMF Type 42 analysis:
   - Page fault rate by address space
   - Working set size vs frames allocated
   - Which jobs are being stolen from?

3. COMMON CAUSES:
   a. Over-committed real storage:
      Total virtual > available real frames
      Fix: Add memory or reduce workload
   b. Single job with huge REGION:
      REGION=0M on a data-heavy program
      Fix: Cap REGION via IEFUSI exit
   c. Too many address spaces:
      Fix: Reduce MAXUSER in IEASYSxx
   d. Large CSA/SQA allocation:
      Fix: Review system-level storage settings

4. TUNING:
   - RSM: IEAOPTxx RSMCTADJ=YES (automatic tuning)
   - Page datasets: 3+ page datasets on separate volumes
   - LFAREA: Reserve frames for large pages
   - 64-bit: Move eligible workloads above the bar
   - zIIP offload: Reduce GP frame pressure`,tags:["performance","paging","storage","advanced"]},{id:"s43",category:"Modernization",difficulty:"Beginner",question:"What is Zowe, and how does it help modernize mainframe development? Give practical examples.",answer:`ZOWE — OPEN SOURCE MAINFRAME FRAMEWORK:

Zowe makes mainframes accessible to modern developers.

COMPONENTS:
  1. Zowe CLI (Command Line Interface):
     Works from Mac, Windows, Linux terminal
     zowe files list ds "PROD.JCL.*"
     zowe jobs submit ds "PROD.JCL(MYJOB)"
     zowe jobs view sfbi JOB12345 102  ← view output
     zowe files download uss "/u/user/script.sh"

  2. Zowe Explorer (VS Code Extension):
     Browse datasets in VS Code sidebar
     Edit PDS members directly
     Submit JCL with one click
     View job output in VS Code
     Like ISPF but in your favorite editor!

  3. Zowe API Mediation Layer:
     Single gateway to all z/OS services
     Unified authentication (SSO)
     Service discovery and routing
     Swagger/OpenAPI documentation

PRACTICAL EXAMPLES:
  Before Zowe:
    Login to TSO → Navigate ISPF → Edit member → Submit
  After Zowe:
    VS Code → Open PDS → Edit → Ctrl+Shift+P → Submit JCL
  
  CI/CD Pipeline:
    git push → Jenkins → zowe jobs submit → zowe jobs wait
    → zowe files download output → verify results

Zowe is FREE and open source (zowe.org)`,tags:["modernization","zowe","vscode","cli","beginner"]},{id:"s44",category:"Modernization",difficulty:"Advanced",question:"Design a CI/CD pipeline for mainframe COBOL applications using Git, Jenkins, and IBM DBB. Include testing and deployment.",answer:`MAINFRAME CI/CD PIPELINE:

1. DEVELOPER WORKFLOW:
   VS Code + Zowe Explorer + IBM Z Open Editor
   - Edit COBOL/JCL locally or directly on z/OS
   - Syntax highlighting, error checking
   - Git integration for version control

2. GIT REPOSITORY STRUCTURE:
   mainframe-app/
   ├── cobol/       ← COBOL source
   ├── copybook/    ← Copybooks
   ├── jcl/         ← JCL procedures
   ├── bms/         ← CICS BMS maps
   ├── test/        ← Unit test scripts
   └── Jenkinsfile  ← Pipeline definition

3. JENKINS PIPELINE:
   pipeline {
     stages {
       stage('Checkout') {
         git 'https://github.com/myorg/mainframe-app'
       }
       stage('Build') {
         // IBM Dependency Based Build
         sh 'groovyz dbb/build.groovy --sourceDir .'
       }
       stage('Unit Test') {
         sh 'groovyz dbb/test.groovy --suite PAYROLL'
       }
       stage('Deploy TEST') {
         sh 'zowe jobs submit ds "TEST.JCL(DEPLOY)"'
         sh 'zowe jobs wait --jobid $JOBID'
       }
       stage('Integration Test') {
         sh 'python test/integration_tests.py'
       }
       stage('Deploy PROD') {
         when { branch 'main' }
         input 'Approve production deploy?'
         sh 'zowe jobs submit ds "PROD.JCL(DEPLOY)"'
       }
     }
   }

4. DBB (Dependency Based Build):
   - Analyzes COBOL COPY statements
   - Only compiles changed programs + dependents
   - 10x faster than full rebuild`,tags:["modernization","cicd","jenkins","dbb","git","advanced"]},{id:"s45",category:"RACF",difficulty:"Beginner",question:"What is RACF and how do you create a new user ID, grant dataset access, and check permissions?",answer:`RACF FUNDAMENTALS:

RACF = Resource Access Control Facility
Controls WHO can access WHAT on z/OS.

1. CREATE A USER ID:
   ADDUSER NEWUSER -
     NAME('John Smith') -
     PASSWORD(TEMP1234) -
     DFLTGRP(DEVGRP) -
     OWNER(ADMIN01) -
     TSO(ACCTNUM(ACCT01) PROC(TSOPROC))
   
   User must change password on first login.

2. GRANT DATASET ACCESS:
   Levels: NONE, READ, UPDATE, CONTROL, ALTER
   
   PERMIT 'PROD.PAYROLL.**' -
     CLASS(DATASET) -
     ID(NEWUSER) -
     ACCESS(READ)
   
   This grants READ to all datasets starting with PROD.PAYROLL.

3. CHECK PERMISSIONS:
   LISTUSER NEWUSER ALL  ← Show user profile
   LISTDSD 'PROD.PAYROLL' AUTH  ← Show who has access
   SEARCH CLASS(DATASET) USER(NEWUSER)  ← All user's access

4. COMMON COMMANDS:
   ALTUSER userid REVOKE  ← Disable user
   ALTUSER userid RESUME  ← Re-enable
   ALTUSER userid PASSWORD(RESET)  ← Reset password
   CONNECT userid GROUP(grp) AUTH(USE)  ← Add to group
   REMOVE userid GROUP(grp)  ← Remove from group

GOLDEN RULE: Principle of least privilege.
Grant minimum access needed for the job.`,tags:["racf","security","beginner","fundamentals"]},{id:"s46",category:"RACF",difficulty:"Intermediate",question:"How do you implement RACF dataset protection rules using generic profiles? Explain with practical examples for a production environment.",answer:`RACF GENERIC PROFILE STRATEGY:

Generic profiles protect GROUPS of datasets with wildcards.

1. NAMING CONVENTION (critical foundation):
   HLQ.ENV.APPLICATION.TYPE.QUALIFIER
   PROD.PAYROLL.COBOL.SOURCE
   PROD.PAYROLL.JCL.CNTL
   TEST.PAYROLL.COBOL.SOURCE

2. GENERIC PROFILE HIERARCHY:
   Level 1: Top-level protection
     ADDSD 'PROD.**' UACC(NONE) OWNER(SECADM)
     → No one can access ANY prod dataset by default
   
   Level 2: Application-level
     ADDSD 'PROD.PAYROLL.**' UACC(NONE)
     PERMIT 'PROD.PAYROLL.**' ID(PAYGRP) ACCESS(READ)
     → Payroll group gets read access
   
   Level 3: Specific overrides
     ADDSD 'PROD.PAYROLL.COBOL.LOAD' UACC(NONE)
     PERMIT 'PROD.PAYROLL.COBOL.LOAD' ID(PAYADM) ACCESS(UPDATE)
     → Only payroll admin can update load library

3. CONDITIONAL ACCESS:
   PERMIT 'PROD.**' ID(BATCHUSR) ACCESS(UPDATE) -
     WHEN(PROGRAM(PAYROLL1))
   → BATCHUSR gets UPDATE only when running PAYROLL1 program

4. AUDIT SETTINGS:
   ALTDSD 'PROD.**' AUDIT(ALL(READ))
   → Log all READ access to production datasets
   → Creates SMF Type 80 records for compliance

5. VERIFICATION:
   LISTDSD 'PROD.PAYROLL.**' AUTH ALL
   Shows: profile type, access list, audit settings`,tags:["racf","generic-profiles","security","intermediate"]},{id:"s47",category:"TSO",difficulty:"Intermediate",question:"How do you use ISPF EDIT macros to automate repetitive coding tasks? Create an example macro.",answer:`ISPF EDIT MACROS — AUTOMATION:

Edit macros are REXX programs that run inside the ISPF editor.

EXAMPLE 1 — Add standard COBOL header:
  /* REXX - COBHDR macro */
  "ISREDIT MACRO"
  "ISREDIT LINE_BEFORE 1 = (HDR1)"
  /* Insert header lines */
  "ISREDIT LINE_BEFORE 1 = '      *================================================'"
  "ISREDIT LINE_BEFORE 2 = '      * PROGRAM:  '"
  "ISREDIT LINE_BEFORE 3 = '      * AUTHOR:   '"
  "ISREDIT LINE_BEFORE 4 = '      * DATE:     '"DATE()'"
  "ISREDIT LINE_BEFORE 5 = '      *================================================'"
  EXIT 0
  Usage: Type COBHDR on command line in ISPF editor

EXAMPLE 2 — Find and mark all TODO comments:
  /* REXX - FINDTODO macro */
  "ISREDIT MACRO"
  "ISREDIT CURSOR = 1 0"
  COUNT = 0
  DO FOREVER
    "ISREDIT FIND 'TODO' NEXT"
    IF RC > 0 THEN LEAVE
    "ISREDIT (LN) = CURSOR"
    "ISREDIT LABEL" LN "= .T"COUNT
    COUNT = COUNT + 1
  END
  SAY 'Found' COUNT 'TODO items'
  EXIT 0

EXAMPLE 3 — Reformat JCL alignment:
  "ISREDIT MACRO"
  "ISREDIT CHANGE '  DD ' ' DD ' ALL"
  "ISREDIT CHANGE '  EXEC ' ' EXEC ' ALL"
  EXIT 0

SAVING MACROS:
  Store in your SYSPROC or SYSEXEC concatenation
  Typically: userid.EXEC or SITE.ISPF.EXEC`,tags:["tso","ispf","macros","rexx","intermediate"]},{id:"s48",category:"TSO",difficulty:"Advanced",question:"Design an ISPF dialog application with panels, skeletons, and tables for a dataset management tool.",answer:`ISPF DIALOG APPLICATION DESIGN:

1. COMPONENTS:
   Panel:    ISPF screen layout (like HTML form)
   Skeleton: JCL/output template with variables
   Table:    In-memory data table
   REXX:     Business logic

2. MAIN PANEL (DSMMENU):
   )ATTR
     % TYPE(TEXT) INTENS(HIGH)
     + TYPE(TEXT) INTENS(LOW)
     _ TYPE(INPUT) INTENS(HIGH)
   )BODY
   %--- Dataset Manager ---
   +
   + Enter HLQ: _HLQ     +
   + Option:    _OPT+  (L=List, D=Delete, C=Copy)
   +
   )INIT
     &OPT = 'L'
   )PROC
     VER(&HLQ,NB,MSG=ENTER HLQ)
     VER(&OPT,NB,LIST,L,D,C)
   )END

3. REXX DRIVER:
   ADDRESS ISPEXEC
   DO FOREVER
     "DISPLAY PANEL(DSMMENU)"
     IF RC > 0 THEN LEAVE
     SELECT
       WHEN OPT = 'L' THEN CALL LIST_DS HLQ
       WHEN OPT = 'D' THEN CALL DEL_DS HLQ
       WHEN OPT = 'C' THEN CALL COPY_DS HLQ
     END
   END

4. TABLE DISPLAY:
   "TBCREATE DSTABLE KEYS(DSNAME) NAMES(RECFM LRECL USED)"
   /* Populate from LISTDSI */
   "TBSORT DSTABLE FIELDS(DSNAME,C,A)"
   "TBDISPL DSTABLE PANEL(DSLIST)"

5. SKELETON (for batch delete):
   )CM Dataset delete JCL
   //&USERID.D JOB ,'DELETE',CLASS=A
   //DEL EXEC PGM=IDCAMS
   //SYSIN DD *
   )DOT
     DELETE &DSNAME
   )ENDDOT
   /*`,tags:["tso","ispf","dialog","panels","advanced"]},{id:"s49",category:"TSO",difficulty:"Expert",question:"Build a TSO/ISPF application that integrates with DB2, reads tables dynamically, and generates reports with drill-down capability.",answer:`TSO/ISPF + DB2 DYNAMIC APPLICATION:

1. ARCHITECTURE:
   ISPF Panel → REXX → DSNREXX (DB2 interface) → DB2
   With dynamic SQL and scrollable ISPF tables

2. DB2 CONNECTION VIA DSNREXX:
   /* REXX */
   CALL RXSUBCOM 'DSNREXX','DSNREXX','ADD'
   SIGNAL ON SQLERROR
   ADDRESS DSNREXX "CONNECT DB2P"
   
   /* Dynamic SQL */
   SQLSTMT = "SELECT EMPID, NAME, SALARY",
             "FROM EMPLOYEE",
             "WHERE DEPT = '"DEPTID"'",
             "ORDER BY SALARY DESC"
   ADDRESS DSNREXX "EXECSQL PREPARE S1 FROM :SQLSTMT"
   ADDRESS DSNREXX "EXECSQL DECLARE C1 CURSOR FOR S1"
   ADDRESS DSNREXX "EXECSQL OPEN C1"

3. POPULATE ISPF TABLE:
   ADDRESS ISPEXEC
   "TBCREATE EMPTBL KEYS(EMPID) NAMES(ENAME SALARY DEPT)"
   DO WHILE SQLCODE = 0
     ADDRESS DSNREXX "EXECSQL FETCH C1 INTO :EID,:ENAME,:SAL"
     IF SQLCODE = 0 THEN DO
       EMPID = EID; SALARY = SAL; DEPT = DEPTID
       "TBADD EMPTBL"
     END
   END
   "TBSORT EMPTBL FIELDS(SALARY,N,D)"
   "TBDISPL EMPTBL PANEL(EMPLIST)"

4. DRILL-DOWN:
   When user selects row (ZTDSELS > 0):
   "TBGET EMPTBL"
   /* Fetch detail for selected EMPID */
   CALL SHOW_DETAIL EMPID  ← Opens detail panel

5. REPORT GENERATION:
   Use ISPF skeleton + FTINCL to generate:
   - CSV export to dataset
   - Formatted report to SYSOUT
   - Email via SMTP`,tags:["tso","ispf","db2","dsnrexx","dynamic-sql","expert"]},{id:"s50",category:"CA7",difficulty:"Beginner",question:"What is CA7 (now Broadcom AutoSys WA) and how do you use it to schedule and monitor batch jobs?",answer:`CA7 FUNDAMENTALS:

CA7 = Enterprise job scheduling system for z/OS
(Now called Broadcom AutoSys Workload Automation)

WHAT IT DOES:
  - Schedules batch jobs to run at specific times
  - Manages job dependencies (Job B runs after Job A)
  - Monitors job status in real-time
  - Handles failures and restarts
  - Manages calendars (business days, holidays)

BASIC COMMANDS:
  1. View job status:
     LJOB,JOB=PAYROLL01
     Shows: status, last run time, schedule

  2. Submit a job on demand:
     DEMAND,JOB=PAYROLL01

  3. View job schedule:
     LSCHD,JOB=PAYROLL01
     Shows: next scheduled run, calendar

  4. Check predecessors:
     LPRQ,JOB=PAYROLL01
     Shows: which jobs must complete first

  5. Hold a job:
     HOLD,JOB=PAYROLL01,AFTER
     Prevents next scheduled run

  6. Release a held job:
     RLSE,JOB=PAYROLL01

EXAMPLE SCHEDULE:
  PAYROLL01: Runs Monday-Friday at 06:00
  Predecessors: EXTRACT01, VALIDATE01
  Calendar: BUSINESS (excludes holidays)
  On failure: Alert oncall team, hold successors`,tags:["ca7","scheduling","beginner","batch"]},{id:"s51",category:"CA7",difficulty:"Advanced",question:"Design a CA7 scheduling strategy for month-end processing that involves 500 jobs across 3 systems with critical path management.",answer:`CA7 MONTH-END SCHEDULING STRATEGY:

1. JOB NETWORK DESIGN:
   Phase 1 — Extract (200 jobs, 3 systems):
     SYSA: Customer extracts (50 jobs)
     SYSB: Transaction extracts (80 jobs)
     SYSC: Reference data extracts (70 jobs)
     Cross-system deps via NJE triggers
   
   Phase 2 — Transform (150 jobs):
     Validation, cleansing, aggregation
     Run after ALL Phase 1 complete
   
   Phase 3 — Load & Report (150 jobs):
     DB2 loads, GL posting, regulatory reports
     Critical path: GL must complete by 06:00

2. CRITICAL PATH MANAGEMENT:
   Identify: PAYEXT→PAYVLD→PAYAGG→GLPOST→GLRPT
   Total estimated: 4.5 hours
   Batch window: 8 hours (22:00–06:00)
   Slack: 3.5 hours
   
   CA7 commands:
   DEMAND,JOB=PAYEXT,PRIORITY=HIGH
   Set LEADTM=0000 for critical path jobs

3. FAILURE HANDLING:
   AUTO-RESTART rules in CA7:
   ARF: JOB=PAY*,ABEND=S*,ACTION=RESTART,TRIES=2
   If restart fails: HOLD successors + page oncall
   
   Fallback jobs:
   If GLPOST misses 06:00 deadline:
   DEMAND,JOB=GLPOST_EMERGENCY (simplified version)

4. MONITORING:
   LQ — Show all queued jobs
   LACT — Show active jobs
   LDOWN — Show which jobs are late
   Set: LEADTM on critical jobs for early warnings`,tags:["ca7","month-end","scheduling","critical-path","advanced"]},{id:"s52",category:"CA7",difficulty:"Expert",question:"CA7 database corruption is suspected — jobs are triggering out of sequence. How do you diagnose and recover without losing schedule data?",answer:`CA7 DATABASE RECOVERY:

1. SYMPTOMS OF CORRUPTION:
   - Jobs running out of dependency order
   - LPRQ shows incorrect predecessors
   - LJOB shows wrong schedule IDs
   - Duplicate entries in job network

2. IMMEDIATE ACTIONS:
   a. Stop new job submissions:
      /ES CA7 — Quiesce CA7 gracefully
   b. Document current state:
      LACT — Capture all active jobs
      LQ — Capture all queued jobs
   c. Force-complete critical running jobs

3. DIAGNOSIS:
   a. Run CA7 CAIRIM diagnostic:
      DBPRINT utility — Dump CA7 database
      Check for: broken pointer chains
      Cross-reference: SCHD vs DBJOB entries
   b. Compare with last good backup:
      Diff the DBPRINT outputs

4. RECOVERY OPTIONS:
   Option A — Restore from backup:
     DBRESTORE from last night's CA7 DB backup
     Re-apply today's schedule changes manually
     Safest but loses today's changes
   
   Option B — Selective repair:
     DBUPDATE to fix specific corrupted records
     DBREORG to rebuild pointer chains
     Faster but requires expert knowledge
   
   Option C — Rebuild affected jobs:
     DELETE affected job definitions
     Re-add from source documentation
     DBADD,JOB=xxx,... for each job

5. PREVENTION:
   - Nightly CA7 DB backup (DBBACKUP)
   - Weekly DBREORG
   - Audit trail of all DB changes
   - Restrict CA7 UPDATE authority to 2-3 admins`,tags:["ca7","database","recovery","expert"]}],Ko=[{id:"b1",title:"Why COBOL Will Outlive All of Us (And That's a Good Thing)",date:"2025-01-15",category:"COBOL",readTime:"8 min read",content:`Every few years, a new article declares "COBOL is dead." Every few years, the people running the world's financial systems laugh quietly and go back to processing billions of transactions.

Let's look at the numbers honestly:

The COBOL Reality Check
IBM estimates there are 800 billion lines of COBOL in production today. That's not a typo — 800 billion. The global banking system processes $3 trillion through COBOL every day. The IRS processes 90% of tax filings through COBOL systems. 95% of ATM transactions touch COBOL at some point.

These aren't systems built by companies that couldn't do better. They're systems built by companies that needed the best — and COBOL was, and in many ways remains, the best tool for the job.

Why COBOL Persists (Technical Reasons)
1. Fixed-point arithmetic: COBOL's packed decimal (COMP-3) arithmetic is exact. Java's double? Not exact. When you're processing $1.2 billion in payroll, "close enough" isn't close enough.

2. File I/O maturity: The COBOL/VSAM/JCL ecosystem for batch processing is incredibly mature. Record-level locking, checkpoint/restart, and ABEND handling have been refined over 60 years.

3. Performance: Modern z/OS COBOL programs compiled with the Enterprise COBOL compiler with aggressive optimization flags can outperform equivalent Java on the same hardware.

4. Reliability: IBM's z/OS platform has reliability characteristics that no other platform matches. "Five nines" (99.999%) is the floor, not the ceiling.

The Real Challenge
The genuine problem isn't technical. It's demographic. The average age of COBOL programmers is rising. Universities stopped teaching it. But this is an opportunity, not a death sentence.

Companies like IBM, Broadcom, and Microfocus have invested in modern tooling — VS Code extensions, Git integration, CI/CD pipelines for COBOL. The language is modern; the perception is lagging.

What's Actually Happening
Smart organizations aren't rewriting their COBOL. They're:
- Exposing COBOL business logic as REST APIs
- Adding modern front-ends to existing COBOL applications  
- Integrating COBOL with cloud services via IBM MQ and z/OS Connect
- Using Zowe to let developers work in VS Code while the code runs on z/OS

The mainframe isn't dying. It's becoming invisible infrastructure — exactly what it should be.`},{id:"b2",title:"Debugging a Production Abend at 3 AM: A Survival Guide",date:"2025-02-01",category:"JCL",readTime:"12 min read",content:`The phone rings at 3 AM. The production PAYROLL job abended. 50,000 employees won't get paid tomorrow unless you fix it in the next few hours. This is the reality of mainframe operations.

Here's the systematic approach that gets you from panic to resolution.

Step 1: Don't Panic, Get Information
Before touching anything, gather:
- Exact job name and job number
- Abend code (S0C7, S322, S80A, etc.)
- Which step failed (Step name from JESMSGLG)
- Time of failure
- Was this a new deployment or has it run before?

Step 2: Know Your Abend Codes
S0C7  — Data exception (non-numeric data in numeric field)
S0C4  — Protection exception (storage violation / null pointer)
S0C1  — Operation exception (invalid instruction — usually link error)
S322  — Time exceeded (TIME= parameter exceeded)
S80A  — Virtual storage exceeded (not enough memory)
S213  — Dataset not found (JCL DISP issue)
S237  — Volume error (DASD volume not available)
S722  — Output exceeded OUTLIM (too much print output)
S806  — Load module not found (program not in STEPLIB or link list)
S878  — Virtual storage not available (getmain failure)
S9nn  — VSAM errors (S913=not authorized, S918=no space)
U1000–U4095 — User abend codes (program-specific)

Step 3: Read the Dump
SYSUDUMP in your JCL output is your friend. In SDSF:
- Navigate to the job
- Press S next to SYSUDUMP
- Look for "COMPLETION CODE" near the top
- Find "PSW AT ENTRY TO ABEND"
- Match the offset to your compiler listing

Step 4: Common Fixes by Abend

S0C7 - Data Exception:
Find the numeric field that contains non-numeric data.
Check IF WS-FIELD IS NUMERIC before using it.
Check LRECL in your JCL — misaligned records cause this.

S213 - Dataset Not Found:
Is the DSN spelled correctly?
Does the dataset exist on the volume specified?
Is the DISP correct (SHR vs OLD)?
GDG — did the previous generation get created?

S806 - Program Not Found:
Add //STEPLIB DD to point to the load library
Check that the compile/link completed successfully
Verify the member name in EXEC PGM=

Step 5: Fix, Test, Document
- Fix in the lowest environment first (if time allows)
- Implement in production
- Run the job
- Document what happened and why
- Update runbook for future occurrences

The 3 AM mindset: Methodical beats frantic. Every time.`},{id:"b3",title:"IMS vs DB2: Choosing the Right Database for Your Workload",date:"2025-02-20",category:"Database",readTime:"10 min read",content:`"Why does this bank still run IMS when DB2 exists?" is a question I hear regularly. The answer reveals something fundamental about database design philosophy that's still relevant today.

The Short Answer
IMS excels at hierarchical, high-volume, predictable access patterns.
DB2 excels at ad-hoc queries, complex relationships, and SQL flexibility.

Most large financial institutions run both — and for good reason.

IMS: When the Hierarchy is the Data
Consider a banking data model:
  Customer → Accounts → Transactions
  Customer → Loans → Payments
  Customer → Address History

This is inherently hierarchical. In IMS, navigating from a customer to their accounts to their transactions is a series of GU/GN/GNP calls — lightning fast because the physical data structure mirrors the logical structure.

IMS processes this through direct physical pointers (in HDAM) or index-based direct access (HIDAM). No joins. No parsing SQL. No query optimizer overhead. Just direct physical access.

The numbers: IMS processes approximately 50 billion transactions daily globally. That's not a typo.

DB2: When You Need Flexibility
The relational model shines when you don't know your access patterns in advance. "Show me all customers in Texas with balances over $50,000 who haven't logged in for 90 days and have at least one loan" — this is a SQL query, not an IMS use case.

DB2's query optimizer can evaluate multiple access paths and choose the most efficient one at bind time or runtime. IMS requires you to know your access patterns when you design the database.

The Hybrid Reality
Most large shops run:
- IMS for core transactional processing (new account, debit, credit)
- DB2 for reporting, analytics, and complex queries
- DB2 for application data that doesn't fit hierarchical model
- IMS for historical data that's accessed by known keys

The data often flows: IMS (OLTP) → DB2 (reporting/analytics) via batch or real-time CDC (Change Data Capture).

Modern Consideration: IMS Universal Drivers
IBM's IMS Universal Drivers allow Java applications and SQL-like access to IMS data through JDBC and SQL-like syntax. This significantly reduces the argument for "we have to move to DB2 to get SQL access" — you can get SQL-like access while keeping IMS's performance characteristics.`}],De=[{q:"What does S0C7 abend code mean?",options:["Storage violation","Data exception - non-numeric in numeric field","Program not found","Time limit exceeded"],answer:1,explanation:"S0C7 is a data exception - occurs when packed decimal or zoned decimal arithmetic is performed on a field containing non-numeric data.",topic:"z/OS"},{q:"What is the maximum addressable storage in 64-bit z/OS?",options:["2 GB","16 EB (exabytes)","4 TB","256 TB"],answer:1,explanation:"64-bit z/OS addressing supports up to 16 exabytes (2^64 bytes) of virtual storage per address space.",topic:"z/OS"},{q:"What is the '16 MB line' in z/OS?",options:["Maximum file size","24-bit addressing boundary","Network packet limit","Console buffer size"],answer:1,explanation:"The 16 MB line is the boundary of 24-bit addressing (2^24 = 16,777,216). Programs below use 24-bit addresses; above uses 31-bit.",topic:"z/OS"},{q:"What does IPL stand for in z/OS?",options:["Internal Program Load","Initial Program Load","Integrated Processing Layer","Input Program Launcher"],answer:1,explanation:"IPL = Initial Program Load. It's the mainframe equivalent of booting — loading the z/OS nucleus into memory.",topic:"z/OS"},{q:"Which z/OS component manages workload distribution?",options:["JES2","WLM","RACF","VTAM"],answer:1,explanation:"WLM (Workload Manager) distributes system resources based on business goals and service classes.",topic:"z/OS"},{q:"What does the z/OS Master Scheduler do?",options:["Schedules batch jobs","Controls system init and shutdown","Manages tape mounts","Handles network routing"],answer:1,explanation:"The Master Scheduler controls z/OS initialization, shutdown, and manages the operator console interface.",topic:"z/OS"},{q:"What is a z/OS LPAR?",options:["Logical Partition - a virtual mainframe","Load Program Archive","Library Partition","Linked Process Area"],answer:0,explanation:"LPAR (Logical Partition) divides a physical mainframe into independent virtual machines, each running its own z/OS.",topic:"z/OS"},{q:"What does S0C4 abend indicate?",options:["Data exception","Protection exception (invalid memory access)","Time exceeded","I/O error"],answer:1,explanation:"S0C4 is a protection exception — the program tried to access storage it doesn't own.",topic:"z/OS"},{q:"What is the '2 GB bar' in z/OS?",options:["Maximum dataset size","31-bit addressing limit","Network throughput cap","JES spool limit"],answer:1,explanation:"The 2 GB bar is the 31-bit addressing boundary (2^31). Storage above the bar requires AMODE 64 programs.",topic:"z/OS"},{q:"What does z/OS USS stand for?",options:["Universal Storage System","UNIX System Services","User Security Subsystem","Utility Sort Service"],answer:1,explanation:"USS = UNIX System Services. Provides a POSIX-compliant UNIX environment within z/OS.",topic:"z/OS"},{q:"Which utility creates a memory dump for debugging?",options:["IEBCOPY","AMATERSE","IEATDUMP","IDCAMS"],answer:2,explanation:"IEATDUMP creates SVC dumps for debugging. You can also use SNAP dumps or SYSMDUMP/SYSUDUMP DD statements.",topic:"z/OS"},{q:"What is a z/OS catalog?",options:["A list of all programs","An index mapping dataset names to physical locations","A security database","A job schedule"],answer:1,explanation:"The z/OS catalog maps dataset names to their physical locations on DASD volumes.",topic:"z/OS"},{q:"What is DASD in mainframe terminology?",options:["Direct Access Storage Device (disk)","Data Archive Storage Drive","Digital Analog Signal Device","Dynamic Allocation Storage"],answer:0,explanation:"DASD = Direct Access Storage Device, i.e., disk drives. Unlike tape, DASD supports random I/O access.",topic:"z/OS"},{q:"What does S878 abend code mean?",options:["Security violation","Virtual storage exhausted","Dataset not found","Program check"],answer:1,explanation:"S878 means the address space ran out of virtual storage. Increase REGION parameter or reduce memory usage.",topic:"z/OS"},{q:"Which JCL DISP value gives exclusive access to an existing dataset?",options:["SHR","NEW","MOD","OLD"],answer:3,explanation:"OLD gives exclusive access - no other job can access the dataset simultaneously.",topic:"JCL"},{q:"What does DISP=(NEW,CATLG,DELETE) mean?",options:["Create new, catalog if ok, delete if fail","New allocation, always catalog","Catalog then delete","Create and replace existing"],answer:0,explanation:"DISP=(status,normal,abnormal): NEW creates it, CATLG catalogs on success, DELETE removes on abnormal end.",topic:"JCL"},{q:"What does COND=(4,LT) on an EXEC statement mean?",options:["Skip if any prior RC < 4","Execute only if all RCs < 4","Skip if any prior RC > 4","Execute if RC = 4"],answer:0,explanation:"COND=(4,LT): skip if 4 is Less Than any prior return code. In other words, skip if any RC > 4.",topic:"JCL"},{q:"What is the purpose of the JCLLIB statement?",options:["Define job libraries","Specify PROC search order","Set JCL variables","Load program libraries"],answer:1,explanation:"JCLLIB ORDER specifies libraries JES searches to find PROCs and INCLUDEs.",topic:"JCL"},{q:"What does REGION=0M request?",options:["Zero memory","Maximum available region","Default region","Minimum region"],answer:1,explanation:"REGION=0M requests the maximum available private area below and above the 16 MB line.",topic:"JCL"},{q:"What is the maximum number of steps in a JCL job?",options:["99","255","999","Unlimited"],answer:1,explanation:"A JCL job can have a maximum of 255 steps.",topic:"JCL"},{q:"What DD parameter specifies record format?",options:["RECFM","FORMAT","RECORD","DCB"],answer:0,explanation:"RECFM specifies record format: F (fixed), V (variable), FB (fixed blocked), VB (variable blocked), U (undefined).",topic:"JCL"},{q:"What does MOD disposition do for sequential datasets?",options:["Modifies record format","Opens for append (adds to end)","Creates modified copy","Moves data"],answer:1,explanation:"MOD opens an existing sequential dataset for append — new records added after the last existing record.",topic:"JCL"},{q:"What is MSGLEVEL=(1,1) in JCL?",options:["Minimum messages","All JCL + all allocation messages","Errors only","No output"],answer:1,explanation:"MSGLEVEL=(1,1) shows all JCL statements (including PROCs) and all allocation messages — best for debugging.",topic:"JCL"},{q:"What does SPACE=(CYL,(10,5),RLSE) mean?",options:["10 cyl, 5 tracks, release","10 primary CYL, 5 secondary CYL, release unused","10 MB, 5 MB overflow","Cylinder 10 through 5"],answer:1,explanation:"Allocate 10 primary cylinders, up to 15 secondary extents of 5 cylinders each, release unused space at close.",topic:"JCL"},{q:"What is the purpose of STEPLIB DD?",options:["Step output library","Search library for load modules in this step","Step listing","Library for SYSIN data"],answer:1,explanation:"STEPLIB specifies private libraries to search for load modules before the system LNKLST. Applies to one step.",topic:"JCL"},{q:"What is a JCL PROC?",options:["A reusable set of JCL steps","A program call","A process ID","A procedure division"],answer:0,explanation:"A PROC is a pre-written set of JCL statements stored in a library. PROCs enable reuse and reduce errors.",topic:"JCL"},{q:"What does SET symbolics do in JCL?",options:["Set system time","Define symbolic parameter values","Set job priority","Configure output"],answer:1,explanation:"SET assigns values to JCL symbolic parameters which are substituted throughout the JCL before execution.",topic:"JCL"},{q:"What is the purpose of DD DUMMY?",options:["Creates empty dataset","Skips I/O — reads return EOF, writes discarded","Deletes dataset","Placeholder"],answer:1,explanation:"DD DUMMY causes reads to return EOF and writes to be discarded. Useful for testing without actual I/O.",topic:"JCL"},{q:"Which JCL parameter overrides a PROC step DD?",options:["OVERRIDE","step.DD","MODIFY","REPLACE"],answer:1,explanation:"Override PROC DDs using stepname.ddname syntax: //STEP1.SORTIN DD DSN=MY.FILE",topic:"JCL"},{q:"What does IEF212I message indicate?",options:["Job completed","Dataset not found during allocation","Security violation","JCL error"],answer:1,explanation:"IEF212I means a dataset specified in JCL was not found during allocation.",topic:"JCL"},{q:"In COBOL, what does COMP-3 (PACKED-DECIMAL) storage use?",options:["1 byte per digit","2 digits per byte plus sign nibble","4 bytes fixed","Platform-dependent"],answer:1,explanation:"COMP-3 stores 2 decimal digits per byte, with the last nibble for the sign.",topic:"COBOL"},{q:"What COBOL statement reads the next sequential record?",options:["GET NEXT","READ file NEXT","FETCH NEXT","INPUT RECORD"],answer:1,explanation:"READ filename NEXT RECORD reads the next sequential record.",topic:"COBOL"},{q:"What does INITIALIZE do in COBOL?",options:["Starts program","Sets fields to defaults (spaces/zeros)","Opens files","Allocates memory"],answer:1,explanation:"INITIALIZE sets alphanumeric fields to spaces and numeric fields to zeros.",topic:"COBOL"},{q:"What is the maximum length of a COBOL PIC X field?",options:["256","1024","32767","16777215"],answer:2,explanation:"PIC X fields can be up to 32,767 characters.",topic:"COBOL"},{q:"What does PERFORM VARYING do?",options:["Variable execution","Loop with counter incrementing","Dynamic call","Performance monitoring"],answer:1,explanation:"PERFORM VARYING creates a counted loop: PERFORM para VARYING idx FROM 1 BY 1 UNTIL idx > 100.",topic:"COBOL"},{q:"What is a COBOL COPYBOOK?",options:["A backup copy","Reusable code included at compile time","A print format","Documentation"],answer:1,explanation:"A COPYBOOK is a source member included via COPY statement at compile time. Used for shared data structures.",topic:"COBOL"},{q:"Which COBOL division contains file definitions?",options:["DATA DIVISION","ENVIRONMENT DIVISION","PROCEDURE DIVISION","IDENTIFICATION DIVISION"],answer:1,explanation:"FILE-CONTROL in ENVIRONMENT DIVISION maps logical names to physical files. FD entries in DATA DIVISION define layouts.",topic:"COBOL"},{q:"What does STRING ... DELIMITED BY do?",options:["Deletes strings","Concatenates strings with a delimiter","Splits strings","Searches strings"],answer:1,explanation:"STRING concatenates multiple source fields into one destination, using DELIMITED BY to control inclusion.",topic:"COBOL"},{q:"What is COMP (BINARY) storage format?",options:["Character","Binary integer (halfword/fullword)","Floating point","Packed decimal"],answer:1,explanation:"COMP/BINARY stores data as binary integers: PIC S9(4) COMP = 2 bytes, PIC S9(9) COMP = 4 bytes.",topic:"COBOL"},{q:"What does EVALUATE TRUE do in COBOL?",options:["Validates data","Acts as CASE/SWITCH statement","Checks boolean","Evaluates expressions"],answer:1,explanation:"EVALUATE TRUE works like a CASE statement — each WHEN tests a condition, executing the first match.",topic:"COBOL"},{q:"What is COBOL's LINKAGE SECTION for?",options:["Link to external files","Describes data passed from calling program","Define network links","Connect databases"],answer:1,explanation:"LINKAGE SECTION describes parameters passed via CALL...USING. The data exists in the caller's storage.",topic:"COBOL"},{q:"What does ON SIZE ERROR do?",options:["Checks field size","Handles arithmetic overflow","Validates screen size","Checks record length"],answer:1,explanation:"ON SIZE ERROR catches arithmetic overflow during COMPUTE/ADD/SUBTRACT/MULTIPLY/DIVIDE.",topic:"COBOL"},{q:"How do you call a subprogram dynamically?",options:["CALL literal","CALL identifier","PERFORM","INVOKE"],answer:1,explanation:"CALL identifier (variable) performs dynamic calling — program loaded at runtime. CALL literal is static.",topic:"COBOL"},{q:"What is COBOL REDEFINES used for?",options:["Redefining paragraphs","Mapping different layouts to same memory","Renaming variables","Overriding values"],answer:1,explanation:"REDEFINES allows two data descriptions to share the same physical storage — like a C union.",topic:"COBOL"},{q:"What does Enterprise COBOL V6 JSON GENERATE do?",options:["Creates JSON config","Converts COBOL data to JSON natively","Generates test data","Parses web input"],answer:1,explanation:"JSON GENERATE creates JSON from COBOL data structures. Combined with z/OS Connect, COBOL can produce API responses.",topic:"COBOL"},{q:"What is the COBOL INSPECT statement used for?",options:["Debug inspection","Counting and replacing characters in a field","File inspection","Security audit"],answer:1,explanation:"INSPECT TALLYING counts occurrences; INSPECT REPLACING substitutes characters.",topic:"COBOL"},{q:"What does GOBACK do in COBOL?",options:["Returns to previous paragraph","Returns control to caller or system","Goes to beginning","Backs up a record"],answer:1,explanation:"GOBACK returns control to the calling program or to z/OS if it's the main program. Preferred over STOP RUN.",topic:"COBOL"},{q:"What is FILE STATUS in COBOL?",options:["File open/close state","2-byte return code from file operations","File size","Disk status"],answer:1,explanation:"FILE STATUS is a 2-byte field: '00' = success, '10' = EOF, '23' = record not found, etc.",topic:"COBOL"},{q:"What does CORRESPONDING (CORR) do?",options:["Creates correspondence","Moves/adds fields with matching names between groups","Correlates files","Links records"],answer:1,explanation:"MOVE CORRESPONDING moves data between groups where subordinate fields have the same name.",topic:"COBOL"},{q:"What COBOL clause makes a program reentrant?",options:["REENTRANT","RECURSIVE","IS INITIAL","THREAD"],answer:2,explanation:"IS INITIAL reinitializes working storage each call. For true reentrancy, compile with RENT option.",topic:"COBOL"},{q:"Which VSAM type supports key-based random access?",options:["ESDS","RRDS","KSDS","LDS"],answer:2,explanation:"KSDS (Key-Sequenced Data Set) stores records sorted by key and supports random and sequential access.",topic:"VSAM"},{q:"What is a VSAM Control Interval (CI)?",options:["Time between operations","The basic unit of data transfer","A monitoring interval","Index level"],answer:1,explanation:"A CI is the smallest unit of data transfer between DASD and memory.",topic:"VSAM"},{q:"What does a CI split mean?",options:["CI corrupted","A full CI splits to fit a new record","CI backed up","CI formatting"],answer:1,explanation:"When a CI is full, VSAM splits it — moving half the records to a new CI. Frequent splits hurt performance.",topic:"VSAM"},{q:"What is FREESPACE(CI% CA%) in VSAM?",options:["Disk free space","Reserved space in CIs/CAs for inserts","Unused allocation","Memory buffer"],answer:1,explanation:"FREESPACE reserves empty space for future inserts. Reduces CI/CA splits for insert-heavy files.",topic:"VSAM"},{q:"What IDCAMS command creates a VSAM cluster?",options:["CREATE CLUSTER","DEFINE CLUSTER","ALLOCATE VSAM","BUILD CLUSTER"],answer:1,explanation:"DEFINE CLUSTER creates a new VSAM dataset with key position, record size, space, etc.",topic:"VSAM"},{q:"What is an Alternate Index (AIX)?",options:["Backup index","Secondary access path using non-primary key","Alternate file","Index copy"],answer:1,explanation:"An AIX provides access using a different key — e.g., employee file by name instead of ID.",topic:"VSAM"},{q:"What does SHAREOPTIONS(2,3) mean?",options:["2 readers, 3 writers","Cross-region(2) and cross-system(3) sharing levels","Buffer settings","2 indexes, 3 data"],answer:1,explanation:"Level 2 = multiple readers OR one writer within a system. Level 3 = multiple readers/writers across systems.",topic:"VSAM"},{q:"What is VSAM RLS?",options:["Record Level Sharing","Read Lock System","Remote Library","Record Length Spec"],answer:0,explanation:"RLS enables multiple CICS regions to access the same VSAM file with record-level locking via the coupling facility.",topic:"VSAM"},{q:"What does REPRO do in IDCAMS?",options:["Reproduce definition","Copy records between datasets","Repair files","Replace records"],answer:1,explanation:"REPRO copies records between datasets. Used for VSAM backup/restore and loading from sequential.",topic:"VSAM"},{q:"What is the max number of extents for VSAM?",options:["16","123","255","Unlimited"],answer:1,explanation:"A VSAM dataset can have up to 123 extents per volume and span up to 59 volumes.",topic:"VSAM"},{q:"What does VERIFY do in IDCAMS?",options:["Validates integrity","Corrects EOF marker after abnormal close","Verifies passwords","Checks catalog"],answer:1,explanation:"VERIFY corrects the VSAM catalog high-used RBA after an abnormal close.",topic:"VSAM"},{q:"What is a VSAM ESDS?",options:["Entry-Sequenced Data Set","Extended Sequential","Error-Safe Data Set","Enterprise Storage"],answer:0,explanation:"ESDS stores records in insertion order. No key, no delete, no variable-length rewrite. Like a log file.",topic:"VSAM"},{q:"What does LISTCAT show for VSAM?",options:["Catalog list","Detailed attributes: splits, extents, RBA","Listed categories","File contents"],answer:1,explanation:"LISTCAT ALL shows CI/CA splits, FREESPACE usage, extents, record counts — vital for VSAM health monitoring.",topic:"VSAM"},{q:"What is VSAM RRDS organization?",options:["Relative Record Data Set","Random Read Data Set","Relational Record","Recovery Record"],answer:0,explanation:"RRDS accesses records by relative record number (slot number). Fixed-length records in numbered slots.",topic:"VSAM"},{q:"In DB2, what does SQLCODE 100 mean?",options:["Successful","Row not found / End of cursor","Duplicate key","Auth error"],answer:1,explanation:"SQLCODE 100 = row not found for SELECT, or end of data for FETCH. Expected, not an error.",topic:"DB2"},{q:"What does SQLCODE -805 mean?",options:["Table not found","Package not found in plan","Column mismatch","Deadlock"],answer:1,explanation:"-805: DBRM not found in the plan/package. Usually means BIND needed after recompile.",topic:"DB2"},{q:"What is the purpose of RUNSTATS in DB2?",options:["Run statistics program","Update catalog stats for the optimizer","Monitor runtime","Calculate storage"],answer:1,explanation:"RUNSTATS collects statistics about data distribution. The optimizer uses these for access path selection.",topic:"DB2"},{q:"What does BIND do in DB2?",options:["Connects to database","Creates access plan from SQL","Binds variables","Links tables"],answer:1,explanation:"BIND compiles SQL from a DBRM into an optimized package, choosing indexes and join methods.",topic:"DB2"},{q:"What is a DB2 tablespace?",options:["Disk partition","Physical storage container for tables","Memory area","Schema definition"],answer:1,explanation:"A tablespace is the physical storage for tables. Types: simple, segmented, partitioned, universal.",topic:"DB2"},{q:"What does SQLCODE -911 mean?",options:["Syntax error","Timeout/deadlock — rollback occurred","Auth failure","Type mismatch"],answer:1,explanation:"-911: unit of work rolled back due to deadlock or timeout. Retry the transaction.",topic:"DB2"},{q:"What is DB2 EXPLAIN?",options:["Documentation","Shows optimizer's access path for SQL","Explains errors","Schema description"],answer:1,explanation:"EXPLAIN shows how DB2 will execute SQL — scans vs index, join methods, sorts. Essential for tuning.",topic:"DB2"},{q:"What does REORG do for DB2 tables?",options:["Reorganizes code","Physically reorganizes data for performance","Renames objects","Restructures SQL"],answer:1,explanation:"REORG reclaims space, restores clustering order, eliminates fragmentation.",topic:"DB2"},{q:"What is a DB2 cursor?",options:["Screen pointer","Processes multiple rows one at a time","Database pointer","Index entry"],answer:1,explanation:"Cursor processes multi-row results one at a time: DECLARE, OPEN, FETCH loop, CLOSE.",topic:"DB2"},{q:"What does WITH UR isolation do?",options:["Read committed only","Read uncommitted data (dirty read)","Update and read","Read with rollback"],answer:1,explanation:"WITH UR allows dirty reads. Highest concurrency, lowest consistency.",topic:"DB2"},{q:"What is SQLCODE -818?",options:["Plan mismatch","Timestamp mismatch precompile vs bind","Table dropped","Index error"],answer:1,explanation:"-818: DBRM timestamp doesn't match package. Recompile and rebind.",topic:"DB2"},{q:"What does DB2 QUIESCE do?",options:["Quiet mode","Establishes recovery point for tablespace","Stops queries","Reduces logging"],answer:1,explanation:"QUIESCE establishes a consistent recovery point useful for point-in-time recovery.",topic:"DB2"},{q:"What is a DB2 STOGROUP?",options:["Storage group for DASD volumes","Stored procedure group","Table group","Security group"],answer:0,explanation:"STOGROUP maps DB2 objects to physical DASD volumes for space allocation.",topic:"DB2"},{q:"What does SELECT ... FOR UPDATE OF do?",options:["Updates immediately","Locks rows for subsequent cursor UPDATE","Selects updates","Formats update"],answer:1,explanation:"FOR UPDATE OF acquires stronger locks to prevent others from changing the data you'll update.",topic:"DB2"},{q:"What is SQLCODE -803?",options:["Duplicate key on unique index","Constraint error","Data truncation","Null violation"],answer:0,explanation:"-803: INSERT/UPDATE would create a duplicate key in a unique index.",topic:"DB2"},{q:"What does DB2 RECOVER TABLESPACE do?",options:["Restores from image copy + applies log","Fixes corrupt data","Recovers dropped tables","Restores indexes"],answer:0,explanation:"RECOVER restores from image copy, then applies log to bring to current or specific point in time.",topic:"DB2"},{q:"What is a DB2 package vs plan?",options:["Same thing","Package = one program's SQL; Plan = collection of packages","Package is bigger","Plan is older"],answer:1,explanation:"Package contains access path for one DBRM. Plan binds packages together for execution.",topic:"DB2"},{q:"What does SQLCODE -904 mean?",options:["Resource unavailable","SQL syntax error","Auth failure","Connection lost"],answer:0,explanation:"-904: tablespace/index stopped, in COPY PENDING, or being recovered.",topic:"DB2"},{q:"Which CICS command reads the next record in a browse?",options:["READNEXT","GETNEXT","BROWSEFWD","READQ"],answer:0,explanation:"EXEC CICS READNEXT reads the next record in a browse started with STARTBR.",topic:"CICS"},{q:"What is the purpose of EXEC CICS SYNCPOINT?",options:["Synchronize screen","Commit current unit of work","Check system time","Synchronize files"],answer:1,explanation:"SYNCPOINT commits all updates, making DB2/VSAM changes permanent.",topic:"CICS"},{q:"What does CICS COMMAREA do?",options:["Communication area — passes data between programs","Command area","Comment storage","Commit area"],answer:0,explanation:"COMMAREA passes data between linked programs or pseudo-conversational iterations. Max 32 KB.",topic:"CICS"},{q:"What is a CICS BMS map?",options:["Basic Mapping Support — screen layouts","Business Map Service","Batch Map System","Binary Map Set"],answer:0,explanation:"BMS defines 3270 screen layouts. SEND MAP displays; RECEIVE MAP gets input.",topic:"CICS"},{q:"What does EXEC CICS LINK do?",options:["Links to website","Calls another program expecting return","Links datasets","Creates connection"],answer:1,explanation:"LINK invokes another program, passing COMMAREA. Control returns when linked program ends.",topic:"CICS"},{q:"What is pseudo-conversational programming?",options:["Fake conversation","Transaction ends between user interactions","Two-user chat","Simulated conversation"],answer:1,explanation:"Transaction ends after screen send, freeing resources. New transaction starts on Enter with COMMAREA.",topic:"CICS"},{q:"What does RESP/RESP2 do in CICS?",options:["Response time","Returns response code — replaces HANDLE CONDITION","Response text","Restart point"],answer:1,explanation:"RESP receives primary response (e.g., DFHRESP(NOTFND)). RESP2 gives detail. Modern error handling.",topic:"CICS"},{q:"What CICS abend is ASRA?",options:["Security violation","Program check (like S0C4/S0C7)","Storage violation","Timeout"],answer:1,explanation:"ASRA = program check within CICS. Same as S0Cx abends in batch.",topic:"CICS"},{q:"What is CICS CSD?",options:["System Definition — resource definitions","Central Storage Device","Customer Service DB","Control Directory"],answer:0,explanation:"CSD contains definitions for programs, transactions, files. Managed with CEDA/CEMT.",topic:"CICS"},{q:"What does EXEC CICS XCTL do?",options:["Transfer control — no return","Execute control","External call","Exit control"],answer:0,explanation:"XCTL transfers control without returning. Caller's storage freed. Unlike LINK which returns.",topic:"CICS"},{q:"What does CICS channel/container replace?",options:["BMS maps","COMMAREA — with no size limit","Files","Queues"],answer:1,explanation:"Channels/containers replace COMMAREA with no 32 KB limit. Supports structured data and microservices.",topic:"CICS"},{q:"What is CICS CEMT?",options:["Master terminal for managing resources","Error handler","Config editor","Memory tool"],answer:0,explanation:"CEMT is the operator transaction: CEMT I PROG(name), CEMT S FILE(name) OPEN, etc.",topic:"CICS"},{q:"What does ATSP abend mean?",options:["Auth failed","Transaction purged due to deadlock timeout","Storage protection","App error"],answer:1,explanation:"ATSP: transaction exceeded DTIMOUT (deadlock timeout). Usually DB2/VSAM lock contention.",topic:"CICS"},{q:"What is CICS Temporary Storage Queue?",options:["Temp disk","Named queue for data between transactions","Temp table","Sort workspace"],answer:1,explanation:"TS queues store data by name across transactions. Main (memory) or Auxiliary (disk).",topic:"CICS"},{q:"What does EXEC CICS RETURN TRANSID do?",options:["Returns error","Sets next transaction for pseudo-conversational","Returns to menu","Identifies transaction"],answer:1,explanation:"RETURN TRANSID('xxxx') COMMAREA(data) ends current transaction and sets next one for Enter key.",topic:"CICS"},{q:"What is DFHCOMMAREA?",options:["Default communication area passed to program","Configuration area","Common definition","Dynamic handler"],answer:0,explanation:"DFHCOMMAREA is the standard LINKAGE SECTION name for the communication area in CICS COBOL.",topic:"CICS"},{q:"What does CICS INQUIRE TRANSACTION do?",options:["Queries transaction definition and status","Ask user","Search logs","Check syntax"],answer:0,explanation:"Returns transaction info: status, program, priority. Used for monitoring and automation.",topic:"CICS"},{q:"What is the CICS EIB?",options:["Execute Interface Block — system info for programs","Error Info Base","External Index Block","Entry Buffer"],answer:0,explanation:"EIB contains EIBTRNID, EIBTRMID, EIBTIME, EIBDATE, response codes, etc.",topic:"CICS"},{q:"In IMS DL/I, what does GHU mean?",options:["Get Hold Unique","Get Next Unit","Get Hierarchical Update","Generic Hold Update"],answer:0,explanation:"GHU = Get Hold Unique. HOLD locks the segment for subsequent REPL or DLET.",topic:"IMS"},{q:"What is IMS PCB status code GE?",options:["Good execution","Segment not found","General error","Get error"],answer:1,explanation:"GE = segment not found. Check your SSA qualifications.",topic:"IMS"},{q:"What is a DL/I SSA?",options:["Segment Search Argument","System Security Area","Storage Segment Address","Sequential Search"],answer:0,explanation:"SSA specifies which segment to access: unqualified names the type; qualified adds WHERE (field=value).",topic:"IMS"},{q:"What does IMS Fast Path (DEDB) provide?",options:["Quick copy","Sub-millisecond access via memory-resident data","Fast backup","Accelerated batch"],answer:1,explanation:"Fast Path DEDBs keep data in memory for ultra-low latency — designed for ATM transactions.",topic:"IMS"},{q:"What does the IMS REPL call do?",options:["Replicates","Replaces (updates) a held segment","Replays","Reports"],answer:1,explanation:"REPL replaces a segment previously retrieved with a Hold call.",topic:"IMS"},{q:"What is an IMS PSB?",options:["Program Specification Block — database view for program","Physical Storage Base","Process Buffer","Primary Segment Block"],answer:0,explanation:"PSB defines which databases/segments a program can access and allowed operations.",topic:"IMS"},{q:"What IMS call inserts a new segment?",options:["ADD","ISRT","PUT","CREATE"],answer:1,explanation:"ISRT adds a new segment. The parent must exist before inserting a child.",topic:"IMS"},{q:"What does IMS status code II mean?",options:["Invalid input","Duplicate segment on insert","Info incomplete","Index invalid"],answer:1,explanation:"II = duplicate insert. Sequence field value already exists under same parent.",topic:"IMS"},{q:"What is IMS DBD?",options:["Database Description — physical definition","Data Block Def","Dynamic Buffer","Database Driver"],answer:0,explanation:"DBD defines physical structure: segment types, fields, relationships, access method, storage.",topic:"IMS"},{q:"What is IMS MFS?",options:["Message Format Service — screen layouts","Master File System","Message Filing","Mainframe Format"],answer:0,explanation:"MFS defines input/output message formats for IMS DC terminals, similar to CICS BMS.",topic:"IMS"},{q:"What does GNP call do in IMS?",options:["Get Next within Parent","General Next Process","Get Named Pointer","Go Next Position"],answer:0,explanation:"GNP retrieves the next segment under the current parent. Stops when no more children.",topic:"IMS"},{q:"What is an IMS HALDB?",options:["High Availability Large Database","Hardware Abstraction","Hierarchical Archive","Half-size DB"],answer:0,explanation:"HALDB partitions large IMS databases for better performance and availability.",topic:"IMS"},{q:"What does U0778 abend mean in IMS?",options:["DL/I status code not handled","Utility error","Unauthorized","Update failure"],answer:0,explanation:"U0778: program encountered unexpected DL/I status code and didn't handle it.",topic:"IMS"},{q:"What is IMS DB/DC?",options:["Database/Data Communications","Debug/Diagnostic","Direct/Batch Channel","Data Bridge"],answer:0,explanation:"IMS DB/DC combines database manager (DB) with transaction manager (DC/TM).",topic:"IMS"},{q:"What REXX function captures TSO command output?",options:["CAPTURE()","OUTTRAP()","TSO()","GETOUT()"],answer:1,explanation:"OUTTRAP(stem.) captures TSO command output into stem variables.",topic:"REXX"},{q:"What does PARSE ARG do in REXX?",options:["Parses arguments passed to program","Parses a file","Argues logic","Partial argument"],answer:0,explanation:"PARSE ARG retrieves and optionally parses arguments passed to the program.",topic:"REXX"},{q:"What is a REXX stem variable?",options:["Root variable","Array-like compound variable (stem.1, stem.2)","System variable","Template"],answer:1,explanation:"Stem variables act as arrays: mydata.0 = count, mydata.1 = first element.",topic:"REXX"},{q:"What does SYSDSN() return?",options:["Dataset size","'OK' if dataset exists, error if not","System DSN","Dataset name"],answer:1,explanation:`SYSDSN("'MY.DATASET'") returns 'OK' if it exists, or an error message.`,topic:"REXX"},{q:"How do you issue a TSO command from REXX?",options:["TSO 'command'","Put command in quotes","CALL TSO","EXECUTE command"],answer:1,explanation:`Enclose TSO commands in quotes: "ALLOC DA('MY.FILE') SHR". REXX passes quoted strings to TSO.`,topic:"REXX"},{q:"What does SIGNAL ON ERROR do?",options:["Sends signal","Jumps to ERROR: label on non-zero RC","Signal processing","Error logging"],answer:1,explanation:"SIGNAL ON ERROR causes REXX to jump to ERROR: label when a command returns non-zero RC.",topic:"REXX"},{q:"What is REXX INTERPRET?",options:["Translation","Dynamically executes a string as REXX code","Interprets data","Comment handler"],answer:1,explanation:"INTERPRET executes a string as code at runtime. Powerful but use sparingly.",topic:"REXX"},{q:"What does SUBSTR() do?",options:["Subtracts","Extracts a substring","Substitutes","Substructure"],answer:1,explanation:"SUBSTR(string, start, length) extracts a portion. SUBSTR('HELLO',2,3) = 'ELL'.",topic:"REXX"},{q:"How do you access ISPF from REXX?",options:["CALL ISPF","ADDRESS ISPEXEC","ISPF()","LINK ISPF"],answer:1,explanation:'ADDRESS ISPEXEC routes commands to ISPF: ADDRESS ISPEXEC "DISPLAY PANEL(MYPANEL)"',topic:"REXX"},{q:"What does QUEUED() return?",options:["Queue status","Lines on data stack","Queued jobs","Buffer count"],answer:1,explanation:"QUEUED() returns number of lines on the REXX data stack.",topic:"REXX"},{q:"What is EXECIO used for?",options:["Read/write datasets from REXX","Execute programs","I/O config","External execution"],answer:0,explanation:"EXECIO * DISKR ddname (STEM data. reads all records into stem. EXECIO 0 DISKW ddname (FINIS closes.",topic:"REXX"},{q:"What does PARSE UPPER VAR do?",options:["Parses and uppercases a variable","Parses upper memory","Gets uppercase input","Validates uppercase"],answer:0,explanation:"PARSE UPPER VAR myvar word1 word2 rest — parses contents into words while uppercasing.",topic:"REXX"},{q:"What is a REXX external function?",options:["Third-party lib","Separate program called as function","OS function","Network call"],answer:1,explanation:"External functions are separate REXX programs or compiled routines called as: result = MYFUNC(arg1).",topic:"REXX"},{q:"What does OVERLAY() do in REXX?",options:["Creates overlay","Overlays one string on another at position","Layer graphics","Overwrite file"],answer:1,explanation:"OVERLAY('XX','ABCDE',3) = 'ABXXE'. Overlays new onto target at position.",topic:"REXX"},{q:"What CA7 command satisfies a dependency manually?",options:["RELEASE","SATISFY","FORCE","OVERRIDE"],answer:1,explanation:"SATISFY manually fulfills a dependency without the predecessor completing.",topic:"CA7"},{q:"What does CA7 DEMAND command do?",options:["Demands resources","Submits a job on-demand outside schedule","Requires attention","Priority override"],answer:1,explanation:"DEMAND submits immediately, bypassing normal schedule. For reruns and ad-hoc.",topic:"CA7"},{q:"What is a CA7 SCHID?",options:["Schedule ID — identifies schedule instance","Schema ID","Scheduler","Screen ID"],answer:0,explanation:"SCHID distinguishes different schedule instances — e.g., daily vs weekly runs.",topic:"CA7"},{q:"What does CA7 LJOB do?",options:["List job definition and status","Load job","Launch job","Link job"],answer:0,explanation:"LJOB lists definition: schedule, predecessors, successors, triggers, current status.",topic:"CA7"},{q:"What is CA7 DBADD for?",options:["Add database","Add job dependencies","Add batch","Add dataset"],answer:1,explanation:"DBADD adds predecessors, dataset triggers, or resource requirements to a job.",topic:"CA7"},{q:"What does CA7 HOLD do?",options:["Pauses system","Prevents job from being submitted","Holds output","Freezes schedule"],answer:1,explanation:"HOLD prevents submission until RELEASE, even if all dependencies are met.",topic:"CA7"},{q:"What is CA7 LEADTIME?",options:["Processing delay","Time before deadline when CA7 starts tracking","Lead dev's time","Setup time"],answer:1,explanation:"LEADTIME tells CA7 when to start tracking relative to deadline. For SLA compliance.",topic:"CA7"},{q:"What does a CA7 TRIGGER do?",options:["Starts workflow","Auto-submits job when dataset created/updated","System alert","Manual kick-off"],answer:1,explanation:"Dataset trigger automatically submits a job when specified dataset is created/updated.",topic:"CA7"},{q:"What is the difference between CA7 and AutoSys?",options:["Same product","CA7 mainframe-focused; AutoSys cross-platform","CA7 newer","AutoSys batch only"],answer:1,explanation:"CA7 is mainframe-native. AutoSys is cross-platform. Many shops use both.",topic:"CA7"},{q:"What does CA7 RESTART do?",options:["Restarts CA7","Restarts failed job from specific step","Reboots mainframe","Resets schedule"],answer:1,explanation:"RESTART re-submits failed job, optionally from a specific step, preserving prior outputs.",topic:"CA7"},{q:"What is a CA7 virtual resource?",options:["Memory allocation","Logical resource controlling concurrency","Virtual machine","Cloud resource"],answer:1,explanation:"Virtual resources limit concurrent jobs — e.g., only 3 jobs using same database at once.",topic:"CA7"},{q:"What CA7 status means a job missed its deadline?",options:["FAILED","LATE","OVERDUE","MISSED"],answer:1,explanation:"LATE = job hasn't completed by deadline. CA7 triggers alerts and escalation.",topic:"CA7"},{q:"In RACF, what does UACC(NONE) mean?",options:["Universal access","No access unless explicitly permitted","Utility access","Update for owner"],answer:1,explanation:"UACC(NONE) = users without explicit PERMIT get no access. Most secure default.",topic:"RACF"},{q:"What RACF command grants READ access?",options:["GRANT READ","PERMIT dsn ID(user) ACCESS(READ)","ALLOW READ","AUTHORIZE"],answer:1,explanation:"PERMIT profile ID(userid) ACCESS(READ). Other levels: NONE, UPDATE, CONTROL, ALTER.",topic:"RACF"},{q:"What does RACF SPECIAL attribute give?",options:["Special login","Full RACF admin authority","Special output","Priority access"],answer:1,explanation:"SPECIAL gives complete RACF admin authority. Limit to very few security admins.",topic:"RACF"},{q:"What is a RACF generic profile?",options:["General purpose","Wildcard profile protecting multiple datasets","Generic user","Default profile"],answer:1,explanation:"Generic profiles use wildcards: SYS1.** protects all SYS1.* datasets.",topic:"RACF"},{q:"What does RACF OPERATIONS attribute allow?",options:["Console operation","Access to all datasets regardless of PERMIT","Operational monitoring","System operations"],answer:1,explanation:"OPERATIONS allows access to any dataset. Intended for storage admins, must be audited.",topic:"RACF"},{q:"What is a RACF PassTicket?",options:["Password replacement","One-time auth token for SSO","Entry pass","Ticket system"],answer:1,explanation:"PassTickets are one-time, time-limited tokens enabling SSO without transmitting passwords.",topic:"RACF"},{q:"What does SETROPTS RACLIST do?",options:["Lists options","Caches profiles in memory for performance","Sets router","Lists resources"],answer:1,explanation:"RACLIST caches general resource profiles in memory, improving access-check performance.",topic:"RACF"},{q:"What SMF record type logs RACF events?",options:["Type 30","Type 80","Type 110","Type 14"],answer:1,explanation:"SMF Type 80 captures RACF events: logins, violations, profile changes. Essential for auditing.",topic:"RACF"},{q:"What does AUDIT attribute on a profile do?",options:["Enables auditing","Logs all access attempts","Audits users","Financial audit"],answer:1,explanation:"AUDIT(ALL) logs every access attempt. AUDIT(FAILURES) logs denied access only. For compliance.",topic:"RACF"},{q:"What is RACF CONNECT used for?",options:["Network connection","Links user to group with authority","Connect systems","DB connection"],answer:1,explanation:"CONNECT userid GROUP(grp) AUTHORITY(level). Levels: USE, CREATE, CONNECT, JOIN.",topic:"RACF"},{q:"What does PROTECTALL do?",options:["Protect all files","Denies access to datasets without covering profile","Full protection","Enable all security"],answer:1,explanation:"PROTECTALL denies access to any dataset without a matching RACF profile.",topic:"RACF"},{q:"What is RACF FACILITY class?",options:["Building access","General resource class for subsystem auth","Network facility","Hardware"],answer:1,explanation:"FACILITY profiles control access to CICS transactions, DB2 resources, UNIX services, etc.",topic:"RACF"},{q:"What is RACF digital certificate support?",options:["Email encryption","X.509 certificate management for TLS/SSL","Doc signing","PDF certificates"],answer:1,explanation:"RACF manages X.509 certificates and key rings for TLS/SSL on z/OS.",topic:"RACF"},{q:"What does RACF REVOKE do?",options:["Permanently deletes","Disables ID — can be resumed later","Revokes permissions","Resets password"],answer:1,explanation:"REVOKE disables a user ID. Permissions remain intact. Use RESUME to reactivate.",topic:"RACF"},{q:"What does ISPF option 3.4 do?",options:["Edit member","Dataset list utility","Compile program","Submit job"],answer:1,explanation:"ISPF 3.4 lists datasets by pattern, letting you browse, edit, delete, rename, manage.",topic:"TSO/ISPF"},{q:"Where do you type ISPF line commands?",options:["Command line","In the line number area","Menu bar","Function key"],answer:1,explanation:"Line commands go in the line number area: D (delete), I (insert), C/M (copy/move), R (repeat).",topic:"TSO/ISPF"},{q:"What does ISPF CHANGE command do?",options:["Changes dataset","Find and replace: C 'old' 'new' ALL","Change permissions","Modify attributes"],answer:1,explanation:"C 'old' 'new' ALL replaces all occurrences. C ... FIRST for just the first.",topic:"TSO/ISPF"},{q:"What is SuperC (ISRSUPC)?",options:["Supercomputer","File comparison utility","Super copy","Compression"],answer:1,explanation:"SuperC compares two datasets and shows differences. Supports search and wildcards.",topic:"TSO/ISPF"},{q:"What does TSO ALLOC command do?",options:["Allocate memory","Connects dataset to DD name","Allocate users","Allocate CPU"],answer:1,explanation:"ALLOC associates dataset with DD name for TSO session. Like JCL DD statement.",topic:"TSO/ISPF"},{q:"What is SDSF?",options:["System Display and Search Facility","Structured Data Set Format","System Debug","Sequential Display"],answer:0,explanation:"SDSF shows job output, system logs, active jobs, resources. Essential for batch results.",topic:"TSO/ISPF"},{q:"What does ISPF 3.14 do?",options:["Web search","Searches for strings across PDS members","Searches catalogs","Find datasets"],answer:1,explanation:"ISPF 3.14 searches every member of a PDS for a specified string.",topic:"TSO/ISPF"},{q:"What is a TSO CLIST?",options:["Command List — TSO scripting","Close List","Clipboard","Client List"],answer:0,explanation:"CLIST is older TSO scripting language. Most shops now prefer REXX.",topic:"TSO/ISPF"},{q:"How do you filter lines in ISPF edit?",options:["SEL ALL","Use macros","X ALL then F 'string' ALL","FILTER command"],answer:2,explanation:"X ALL excludes all, F 'string' ALL reveals matching lines. Great for filtering.",topic:"TSO/ISPF"},{q:"What does TSO LISTDS show?",options:["Dataset attributes (RECFM, LRECL, etc.)","Contents","Directory listing","User datasets"],answer:0,explanation:"LISTDS 'dsname' STATUS shows DCB attributes, volume, space. MEMBERS lists PDS members.",topic:"TSO/ISPF"},{q:"What is ISPF option 2?",options:["Browse","Edit — full-screen editor","Utilities","Settings"],answer:1,explanation:"ISPF 2 is the Edit facility — full-screen editing with line commands and macros.",topic:"TSO/ISPF"},{q:"What does TSO PROFILE PREFIX do?",options:["Sets profile","Auto-prepends userid to unquoted dataset names","Creates profile","Prefix override"],answer:1,explanation:"PREFIX sets high-level qualifier for unquoted names. PREFIX(USER01): MY.FILE → USER01.MY.FILE.",topic:"TSO/ISPF"},{q:"What does DFSORT OPTION COPY do?",options:["Creates backup","Copies records without sorting","Copies control file","Duplicates all"],answer:1,explanation:"OPTION COPY processes through transforms without sorting — faster when sort isn't needed.",topic:"Utilities"},{q:"What does IEBCOPY do?",options:["Copies sequential","Copies/compresses/merges PDS members","Copies IEB data","Copies catalogs"],answer:1,explanation:"IEBCOPY copies, compresses, merges PDS members between libraries.",topic:"Utilities"},{q:"What does IEBGENER do?",options:["Generates programs","Copies sequential datasets","Generates reports","Creates test data"],answer:1,explanation:"IEBGENER copies sequential datasets. Simple but SORT COPY is often faster.",topic:"Utilities"},{q:"What is DFSORT JOINKEYS for?",options:["Joining tables","Matching/joining two files by key","Key generation","Index merge"],answer:1,explanation:"JOINKEYS performs inner, left, right, full outer joins between files.",topic:"Utilities"},{q:"What does INCLUDE/OMIT do in DFSORT?",options:["Include/exclude files","Filters records by condition (like WHERE)","Include headers","Omit duplicates"],answer:1,explanation:"INCLUDE COND=(1,5,CH,EQ,C'SALES') selects matching records. OMIT excludes them.",topic:"Utilities"},{q:"What is ICETOOL?",options:["Ice cream tool","Multi-function DFSORT utility","Index creation","Compression"],answer:1,explanation:"ICETOOL performs SPLICE, DISPLAY, SELECT, COUNT, STATS, UNIQUE in one step.",topic:"Utilities"},{q:"What does IDCAMS DELETE do?",options:["Deletes programs","Deletes datasets and catalog entries","Deletes users","Deletes jobs"],answer:1,explanation:"DELETE removes datasets + catalog entries. CLUSTER, NONVSAM keywords specify type.",topic:"Utilities"},{q:"What is DFSORT OUTREC for?",options:["Output recovery","Reformats output records","Record counting","Output recording"],answer:1,explanation:"OUTREC reformats records before writing: rearrange, add constants, convert formats.",topic:"Utilities"},{q:"What does ADRDSSU do?",options:["Dataset dump/restore/copy/move","Address resolution","DSS utilities","Compression"],answer:0,explanation:"ADRDSSU performs DUMP/RESTORE/COPY/MOVE at physical dataset/track level.",topic:"Utilities"},{q:"What does DFSORT INREC do?",options:["Input count","Reformats input before sort/copy","Internal recording","Initial record"],answer:1,explanation:"INREC reformats BEFORE sorting — create keys from transformed data or trim fields early.",topic:"Utilities"},{q:"What is IEFBR14?",options:["Does nothing — for dataset allocation/deletion","File browser","Batch runner","Error handler"],answer:0,explanation:"IEFBR14 is 'do nothing' — triggers JCL DD allocation/deallocation only.",topic:"Utilities"},{q:"What does ICETOOL SPLICE do?",options:["Joins cables","Merges records from two files by key","Splits files","Splices strings"],answer:1,explanation:"SPLICE merges fields from matching records. Simpler than JOINKEYS for basic merging.",topic:"Utilities"},{q:"What SMF type captures DB2 accounting data?",options:["Type 80","Type 100","Type 110","Type 30"],answer:2,explanation:"SMF 110 captures DB2 accounting — CPU, I/O, waits, SQL stats per thread.",topic:"SMF"},{q:"What does SMF Type 30 record?",options:["Security events","Job/step resource usage (CPU, memory, I/O)","Network traffic","Disk space"],answer:1,explanation:"Type 30: subtype 1=start, 2=interval, 3=step end, 4=job end. CPU, EXCP, elapsed time.",topic:"SMF"},{q:"What is RMF in z/OS?",options:["Resource Measurement Facility","Record Management File","Remote Monitor","Recovery Management"],answer:0,explanation:"RMF collects system-wide performance: CPU, paging, channel, I/O. For capacity planning.",topic:"SMF"},{q:"What does high paging rate indicate?",options:["Fast processing","Memory shortage","Good performance","Disk activity"],answer:1,explanation:"High paging = real storage constrained. Pages swapping to auxiliary storage. Add memory or reduce load.",topic:"SMF"},{q:"What does WLM service class period do?",options:["Billing period","Defines response goals and resource allocation","Service contract","Time limit"],answer:1,explanation:"Service class periods define performance goals. WLM adjusts priority to meet them.",topic:"SMF"},{q:"What is an EXCP?",options:["Exception","Execute Channel Program — one I/O operation","External Copy","Exit Point"],answer:1,explanation:"EXCP counts = individual I/O operations. High counts may mean inefficient I/O or small blocks.",topic:"SMF"},{q:"What does SMF Type 14/15 record?",options:["Dataset open/close events","Security events","Network data","Console messages"],answer:0,explanation:"Type 14 = dataset close for input; Type 15 = close for output. DSN, volume, EXCP count.",topic:"SMF"},{q:"What is GTF in z/OS?",options:["Generalized Trace Facility","Global Transfer","General Task File","Group Trace"],answer:0,explanation:"GTF captures detailed trace: I/O ops, SVC calls, program interrupts. High overhead.",topic:"SMF"},{q:"What does sustained high CPU busy % mean?",options:["Efficient","System at capacity — optimize or upgrade","Good health","Fast processing"],answer:1,explanation:"CPU > 85-90% sustained = capacity constraint. Optimize programs, WLM tune, or add capacity.",topic:"SMF"},{q:"What is zIIP?",options:["Zip compression","Specialty processor offloading eligible work from GP CPs","ZIP format","Zone processor"],answer:1,explanation:"zIIP offloads DB2, XML, Java, IP networking from expensive general-purpose processors.",topic:"SMF"},{q:"What does WLM velocity goal measure?",options:["Network speed","Percentage of time work is not delayed","Data rate","Processing speed"],answer:1,explanation:"Velocity = undelayed time / total time. Goal of 80 = work undelayed 80% of the time.",topic:"SMF"},{q:"What is SMF interval recording?",options:["Periodic collection","Type 30 subtype 2 at timed intervals","Interval timer","Schedule"],answer:1,explanation:"Interval recording produces Type 30 subtype 2 records at intervals for long-running address spaces.",topic:"SMF"},{q:"What Zowe CLI command submits JCL from a PDS?",options:["zowe jcl run","zowe jobs submit ds","zowe batch execute","zowe jcl submit"],answer:1,explanation:`'zowe jobs submit ds' submits from dataset: zowe jobs submit ds "USER.JCL(MYJOB)"`,topic:"Modernization"},{q:"What is z/OS Connect EE?",options:["Network connector","API gateway for CICS/IMS/batch as REST","DB connector","Email connector"],answer:1,explanation:"z/OS Connect maps RESTful APIs to CICS/IMS transactions and batch — zero code changes.",topic:"Modernization"},{q:"What is the Strangler Fig pattern?",options:["Removing old code","Gradually replacing monolith with new services","Code strangling","Legacy removal"],answer:1,explanation:"Route new features to modern services while legacy handles existing logic, eventually retiring it.",topic:"Modernization"},{q:"What does Zowe provide?",options:["New hardware","Open-source CLI, APIs, VS Code extension for z/OS","New OS","Replacement system"],answer:1,explanation:"Zowe: CLI scripting, REST APIs, VS Code extension, app framework for modern mainframe dev.",topic:"Modernization"},{q:"What is IBM Wazi?",options:["New language","Cloud-based mainframe dev/test environment","Monitoring","Database"],answer:1,explanation:"Wazi provides containerized z/OS dev/test on x86/cloud for modern DevOps workflows.",topic:"Modernization"},{q:"What is CPACF on IBM Z?",options:["Central Processing","Hardware crypto at no extra cost","Copy Facility","Cache Processor"],answer:1,explanation:"CPACF provides hardware-accelerated AES, SHA, etc. built into every Z processor for free.",topic:"Modernization"},{q:"How many Linux instances can a z16 run?",options:["50","200","Thousands","10"],answer:2,explanation:"A single z16 can run thousands of Linux instances with 10:1-20:1 consolidation ratios vs x86.",topic:"Modernization"},{q:"What is IFL in IBM Z?",options:["Integrated Facility for Linux","Internal File Layer","Index Facility","Interface Library"],answer:0,explanation:"IFL is a Z processor dedicated to Linux, not counting toward z/OS software licensing.",topic:"Modernization"},{q:"What language does Zowe CLI use for plugins?",options:["COBOL","Node.js/TypeScript","Java","Python"],answer:1,explanation:"Zowe CLI is built on Node.js. Plugins are TypeScript/JavaScript.",topic:"Modernization"},{q:"What is the main benefit of APIs over screen scraping?",options:["Prettier UI","Structured data, versioning, security, reliability","Faster screens","Less code"],answer:1,explanation:"APIs provide JSON, OAuth2, versioning, error handling — unlike fragile screen scraping.",topic:"Modernization"}],la=[{code:"S001",name:"I/O Error",category:"System",severity:"high",cause:"Record length mismatch between program and DD statement, or dataset corrupted. S001-0=wrong length, S001-4=block count.",fix:`1) Verify LRECL/BLKSIZE in JCL matches dataset.
2) IDCAMS VERIFY for VSAM.
3) Check if dataset was properly closed.`,tips:["LISTDS to compare DCB attributes","S001-0=wrong length vs S001-4=block count"]},{code:"S002",name:"I/O Error - Invalid Record",category:"System",severity:"high",cause:"Invalid record detected during I/O. Hardware error, corrupted data, or writing past end of block.",fix:`1) Rerun — may be transient hardware issue.
2) IEBPTPCH to find bad records.
3) Contact storage admin if persistent.`,tips:["Check LOGREC for hardware errors"]},{code:"S00D",name:"JES2 Spool Error",category:"System",severity:"medium",cause:"JES2 spool space exhaustion or internal error.",fix:`1) $DSPOOL to check spool usage.
2) $PJ to purge old output.
3) Check JESMSGLG.`,tips:["$DSPOOL and $VSPL show spool status"]},{code:"S013",name:"Dataset Open Error",category:"System",severity:"medium",cause:"Error opening dataset. S013-14=member not found, S013-18=OPEN failed, S013-20=invalid BLKSIZE, S013-34=wrong RECFM, S013-60=concatenation error.",fix:`1) S013-14: Verify member exists.
2) S013-18: Check DCB attributes.
3) S013-20: Correct BLKSIZE.
4) S013-34: Fix RECFM.
5) S013-60: Compatible attributes in concatenation.`,tips:["ISPF 3.4 to verify members","DCB: RECFM, LRECL, BLKSIZE must match"]},{code:"S022",name:"Operator Cancelled After Wait",category:"System",severity:"low",cause:"Job cancelled by operator while waiting for resource (tape mount, reply).",fix:`1) Check with operations.
2) Ensure tape/resource is available.
3) Check WTOR messages with D R,L.`,tips:["D R,L shows outstanding replies"]},{code:"S037",name:"Insufficient DASD Space",category:"System",severity:"medium",cause:"Unable to allocate space on DASD. No volume has sufficient contiguous space.",fix:`1) Increase SPACE parameter.
2) Specify more volumes.
3) Use SMS storage groups.`,tips:["Always specify secondary allocation"]},{code:"S03B",name:"ABEND Issued by Program",category:"System",severity:"medium",cause:"Program explicitly issued ABEND macro. Intentional termination upon detecting error.",fix:`1) Check reason code.
2) Review program logic for ABEND call.
3) Check SYSOUT for error messages.`,tips:["Reason code in R15 or ABEND macro parameter"]},{code:"S047",name:"IOS Permanent I/O Error",category:"System",severity:"high",cause:"I/O Supervisor detected permanent I/O error. Hardware failure or channel path error.",fix:`1) Retry — may be transient.
2) Check LOGREC.
3) Contact hardware team.`,tips:["D IOS,MIH shows missing interrupt handlers"]},{code:"S04E",name:"Insufficient Storage for OPEN",category:"System",severity:"medium",cause:"Not enough virtual storage for OPEN I/O buffers.",fix:`1) Increase REGION.
2) Reduce BUFNO in DCB.
3) Use smaller block sizes.`,tips:["REGION=0M gives maximum","Each buffer ≈ BLKSIZE bytes"]},{code:"S06F",name:"Open/Close/EOV Error",category:"System",severity:"medium",cause:"Error during OPEN, CLOSE, or End-of-Volume processing.",fix:`1) Verify DD statement.
2) Check catalog entry.
3) Verify volume serial.`,tips:["IEF287I identifies the failing file"]},{code:"S0C1",name:"Operation Exception",category:"System",severity:"high",cause:"Invalid instruction execution. Branching to data area, corrupted load module, or missing CALL target.",fix:`1) Recompile and relink.
2) Check CALL targets in STEPLIB/JOBLIB.
3) AMBLIST to verify load module.`,tips:["Often caused by missing CALL target","CEEOPTS for LE diagnostics"]},{code:"S0C2",name:"Privileged Operation Exception",category:"System",severity:"high",cause:"Attempted privileged instruction in problem state.",fix:`1) Remove privileged instruction.
2) Use SVCs for system services.
3) Check link authorization.`,tips:["Only supervisor programs can use LPSW, SSM"]},{code:"S0C4",name:"Protection Exception",category:"System",severity:"critical",cause:"#1 most common abend. Access to storage not owned: uninitialized pointers, subscript out of range, incorrect CALL parameters.",fix:`1) Check array subscripts — add boundary checking.
2) Verify LINKAGE SECTION matches CALL parameters.
3) Compile with SSRANGE.
4) Check BLL cells in CICS.`,tips:["SSRANGE catches subscript errors","EIBCALEN for COMMAREA length","CEEOPTS='TRAP(ON)'","PSW address → failing instruction"]},{code:"S0C5",name:"Addressing Exception",category:"System",severity:"high",cause:"Address outside virtual storage. Invalid base register, uninitialized BLL cells.",fix:`1) Check base register contents.
2) Verify SET ADDRESS OF.
3) Validate CICS pointers.`,tips:["Same debugging as S0C4","Check register contents at PSW"]},{code:"S0C6",name:"Specification Exception",category:"System",severity:"high",cause:"Invalid instruction operand. Odd address for halfword, invalid register pair.",fix:`1) Check data alignment.
2) SYNC clause for binary fields.
3) Verify register pair usage.`,tips:["SYNCHRONIZED clause ensures alignment"]},{code:"S0C7",name:"Data Exception",category:"System",severity:"critical",cause:"#2 most common abend. Arithmetic on non-numeric data: spaces in COMP-3, uninitialized storage, wrong record layout.",fix:`1) DISPLAY field before failing statement.
2) INITIALIZE group items.
3) Check record layout/copybook.
4) IF NUMERIC test for validation.`,tips:["F0-F9=valid zoned, C0-C9/D0-D9=valid packed","INITIALIZE zeros numerics, spaces alpha","DISPLAY HEX for actual contents"]},{code:"S0C8",name:"Fixed-Point Overflow",category:"System",severity:"medium",cause:"Arithmetic result exceeded register capacity.",fix:`1) Use larger data fields.
2) ON SIZE ERROR clause.
3) Check for unexpected large inputs.`,tips:["COMP max: 9(4)=halfword, 9(9)=fullword"]},{code:"S0C9",name:"Fixed-Point Divide Exception",category:"System",severity:"medium",cause:"Fixed-point division quotient too large or division by zero.",fix:`1) Check divisor ≠ zero.
2) Ensure quotient field large enough.
3) ON SIZE ERROR clause.`,tips:["Validate: IF divisor NOT = ZERO"]},{code:"S0CA",name:"Decimal Overflow",category:"System",severity:"medium",cause:"Packed decimal result too large for result field.",fix:`1) Increase result field size.
2) ON SIZE ERROR clause.
3) Check for unexpected large inputs.`,tips:["PIC 9(7)V99 max = 9999999.99"]},{code:"S0CB",name:"Decimal Divide Exception",category:"System",severity:"medium",cause:"Decimal division by zero or quotient overflow.",fix:`1) IF divisor NOT = ZERO before DIVIDE.
2) INITIALIZE working storage.
3) ON SIZE ERROR clause.`,tips:["Always validate denominators"]},{code:"S0CC",name:"Exponent Overflow",category:"System",severity:"low",cause:"Floating-point exponent overflow. Rare in COBOL.",fix:`1) Check floating-point values.
2) Use intermediate calculations.`,tips:["Rare in business COBOL"]},{code:"S0CE",name:"Exponent Underflow",category:"System",severity:"low",cause:"Floating-point result too small to represent.",fix:`1) Check very small number division.
2) Treat as zero if acceptable.`,tips:["Usually safe to ignore"]},{code:"S0E0",name:"No DD Statement",category:"System",severity:"medium",cause:"Program OPEN but corresponding DD statement missing from JCL.",fix:`1) Add missing DD statement.
2) Check SELECT…ASSIGN matches DD name.
3) For CICS, check FCT entry.`,tips:["ASSIGN clause must match DD name"]},{code:"S100",name:"Module Storage Error",category:"System",severity:"high",cause:"Not enough contiguous storage to load module.",fix:`1) Increase REGION.
2) Check module size.
3) Reduce concurrent loaded modules.`,tips:["REGION=0M for maximum","AMBLIST shows module size"]},{code:"S106",name:"Module Not Found (EXEC)",category:"System",severity:"high",cause:"Load module not found in STEPLIB, JOBLIB, or LNKLST.",fix:`1) Verify program name spelling.
2) Check STEPLIB/JOBLIB.
3) IEHLIST PDS directory.
4) Relink if recently compiled.`,tips:["S106-0C=found but load failed","Check concatenation order"]},{code:"S10D",name:"FREEMAIN Error",category:"System",severity:"medium",cause:"Invalid FREEMAIN — freeing storage not owned or corrupted control blocks.",fix:`1) Verify GETMAIN/FREEMAIN addresses match.
2) Check for storage overlays.
3) CEEOPTS='STORAGE(FE,FE,FE)'.`,tips:["Indicates storage overlay bug"]},{code:"S122",name:"Job Cancelled by Operator",category:"System",severity:"low",cause:"Operator or automation cancelled the job.",fix:`1) Check with operations.
2) Increase TIME if job ran long.
3) Check JES2 log.`,tips:["S222=user cancel vs S122=operator"]},{code:"S137",name:"End of Volume - Output",category:"System",severity:"medium",cause:"Output dataset out of space. Extents exhausted or volume full.",fix:`1) Increase SPACE.
2) Multi-volume: VOL=SER=(v1,v2).
3) SMS storage classes.`,tips:["S137-04=no space, S137-0C=max extents"]},{code:"S213",name:"Dataset Not Found on Volume",category:"System",severity:"medium",cause:"Dataset not on specified volume. DISP=OLD but doesn't exist, or catalog points wrong.",fix:`1) LISTCAT to verify.
2) Check volume serial.
3) Use DISP=(NEW,CATLG) for new datasets.
4) Recatalog if needed.`,tips:["DISP=OLD requires dataset already exists"]},{code:"S222",name:"Job Cancelled by User",category:"System",severity:"low",cause:"TSO user or SDSF cancel.",fix:`1) If intentional — no action.
2) Check time limits.
3) Review JESMSGLG.`,tips:["Check SDSF for who cancelled"]},{code:"S237",name:"Extend Error - No Volumes",category:"System",severity:"medium",cause:"Unable to extend dataset to another volume.",fix:`1) Add volumes to storage group.
2) Increase SPACE.
3) Use SMS automatic selection.`,tips:["Contact storage admin"]},{code:"S300",name:"FETCH Failed",category:"System",severity:"high",cause:"Permanent I/O error loading program module.",fix:`1) Verify library accessible.
2) Relink module.
3) Check hardware errors.`,tips:["Retry first — may be transient"]},{code:"S306",name:"Module Not Executable",category:"System",severity:"medium",cause:"Load module marked not executable. Corrupted or incomplete link-edit.",fix:`1) Relink with correct options.
2) Resolve all external references.
3) Check IEW messages.`,tips:["AMBLIST LISTIDR shows attributes"]},{code:"S322",name:"CPU Time Exceeded",category:"System",severity:"medium",cause:"Job step exceeded TIME parameter CPU limit.",fix:`1) Increase TIME=(mm,ss) or TIME=1440.
2) Check for infinite loops.
3) Verify correct input file.`,tips:["TIME=NOLIMIT removes limit","Check PERFORM UNTIL conditions"]},{code:"S337",name:"TIOT Exhausted",category:"System",severity:"medium",cause:"Too many DD statements or dynamic allocations.",fix:`1) Reduce DD statements.
2) Free unused allocations.
3) Increase TIOT size.`,tips:["Dynamic allocation without FREE causes buildup"]},{code:"S413",name:"Volume Not Mounted",category:"System",severity:"medium",cause:"Required volume not mounted or available.",fix:`1) Mount required volume.
2) Check VOL=SER in JCL.
3) Verify ATL has the tape.`,tips:["D U,,ALLOC shows mounted volumes"]},{code:"S522",name:"TSO Wait Time Exceeded",category:"System",severity:"low",cause:"TSO session idle too long. SMF timeout.",fix:`1) Reconnect to TSO.
2) Request timeout increase.
3) Keep session active.`,tips:["SMFPRM WTOLIM controls timeout"]},{code:"S613",name:"Tape I/O Error on OPEN",category:"System",severity:"medium",cause:"I/O error during tape OPEN. Bad label, wrong density, or hardware error.",fix:`1) Check tape label.
2) Try different drive.
3) Restore from backup if damaged.`,tips:["Try cleaning tape drive first"]},{code:"S706",name:"Module Not Found (LOAD)",category:"System",severity:"medium",cause:"LOAD macro couldn't find module.",fix:`1) Check STEPLIB/JOBLIB.
2) Verify name.
3) Ensure accessible library.`,tips:["Similar to S806 but LOAD vs LINK"]},{code:"S713",name:"VSAM/Access Method OPEN Error",category:"System",severity:"medium",cause:"VSAM catalog corrupted, not properly closed, or RLS contention.",fix:`1) IDCAMS VERIFY to fix.
2) LISTCAT to check.
3) Verify SHAREOPTIONS.`,tips:["VERIFY fixes most S713 issues"]},{code:"S714",name:"Catalog Error on CLOSE",category:"System",severity:"medium",cause:"Error updating catalog during CLOSE. Catalog contention.",fix:`1) Retry job.
2) Check catalog contention.
3) IDCAMS DIAGNOSE.`,tips:["May need EXPORT/IMPORT to fix"]},{code:"S804",name:"GETMAIN Failed",category:"System",severity:"high",cause:"GETMAIN failed — insufficient virtual storage.",fix:`1) Increase REGION.
2) Optimize memory.
3) FREEMAIN unused storage.`,tips:["REGION=0M for maximum","Check for memory leaks"]},{code:"S806",name:"Module Not Found (Dynamic CALL)",category:"System",severity:"high",cause:"Dynamic CALL/LINK/XCTL module not found in search path.",fix:`1) Add library to STEPLIB/JOBLIB.
2) Check name spelling.
3) Verify compiled and linked.
4) In CICS check CSD.`,tips:["S806-04=not found","S806-0C=RENT issue"]},{code:"S80A",name:"Region Too Large",category:"System",severity:"high",cause:"System can't satisfy REGION request.",fix:`1) Reduce REGION.
2) Run when less busy.
3) Check CSA/SQA usage.`,tips:["D VS,C shows storage utilization"]},{code:"S813",name:"PDS Member Not Found",category:"System",severity:"medium",cause:"Member in DSN=pds(member) not found.",fix:`1) Verify member name.
2) Check PDS contents.
3) Correct JCL.`,tips:["ISPF 3.4 → member list to verify"]},{code:"S837",name:"Extent Limit Reached",category:"System",severity:"medium",cause:"Max extents on volume (16 non-SMS, 127 SMS).",fix:`1) Increase primary SPACE.
2) Use SMS.
3) Reallocate.`,tips:["SMS allows 127 extents per volume"]},{code:"S878",name:"Virtual Storage Exceeded",category:"System",severity:"high",cause:"GETMAIN failed. REGION too small or storage leak.",fix:`1) REGION=0M.
2) Optimize memory.
3) Fix storage leaks.`,tips:["31-bit max ~2GB below bar","HEAP(32K,,,,FREE)"]},{code:"S913",name:"RACF Access Denied",category:"System",severity:"medium",cause:"RACF denied dataset/resource access.",fix:`1) RLIST DATASET 'dsn' ALL.
2) PERMIT dataset to user/group.
3) Verify RACF group.`,tips:["ICH408I shows failing dataset","OPERATIONS bypasses most checks"]},{code:"SB14",name:"Dataset Close Error",category:"System",severity:"medium",cause:"Error during CLOSE. Incomplete write or DASD error.",fix:`1) Retry.
2) Check LOGREC.
3) Verify dataset integrity.`,tips:["Often from I/O errors during buffer flush"]},{code:"SB37",name:"No Space on Volume",category:"System",severity:"high",cause:"Output dataset exhausted all space.",fix:`1) Increase SPACE secondary.
2) Multi-volume.
3) DFSMS storage groups.`,tips:["SPACE=(CYL,(100,50))","Max 127 extents SMS"]},{code:"SD37",name:"No Secondary Allocation",category:"System",severity:"medium",cause:"Needs more space but no secondary specified.",fix:`1) Add secondary: SPACE=(CYL,(10,5)).
2) Increase primary.`,tips:["Always specify secondary!"]},{code:"SE37",name:"Max Extents",category:"System",severity:"medium",cause:"Max extents reached (16 non-SMS, 127 SMS).",fix:`1) Increase primary SPACE.
2) Ensure SMS-managed.
3) Reallocate.`,tips:["REPRO and reallocate larger"]},{code:"AALL",name:"CICS - Max Tasks Exceeded",category:"CICS",severity:"high",cause:"MXT reached. CICS cannot start new tasks.",fix:`1) Increase MXT.
2) Fix long-running transactions.
3) Check for task hangs.`,tips:["CEMT I SYS shows active/max tasks"]},{code:"ABMB",name:"CICS - BMS Map Error",category:"CICS",severity:"medium",cause:"BMS map not found or structure mismatch.",fix:`1) CEMT I MAPSET to verify.
2) Reassemble map.
3) Check DFHMSD/DFHMDI macros.`,tips:["CEMT SET MAPSET NEWCOPY"]},{code:"AECA",name:"CICS - Channel/Container Error",category:"CICS",severity:"medium",cause:"Container not found, channel missing, or data conversion error.",fix:`1) Verify names match between programs.
2) Check FLENGTH.
3) PUT before GET.`,tips:["Container names are case-sensitive"]},{code:"AEIA",name:"CICS - Not Authorized",category:"CICS",severity:"medium",cause:"Transaction not authorized. RACF security violation.",fix:`1) Check RACF profiles.
2) Verify CSD security.
3) Check CICS security group.`,tips:["CEMT I TRANS for settings","SMF Type 80 for details"]},{code:"AEIO",name:"CICS - I/O Error",category:"CICS",severity:"high",cause:"I/O error on CICS resource. VSAM, TS, or TD error.",fix:`1) Check CSMT log.
2) IDCAMS VERIFY.
3) Check DFHTEMP.`,tips:["CEMT I FILE shows status"]},{code:"AEIP",name:"CICS - Program Not Found",category:"CICS",severity:"medium",cause:"Program not in CSD or DFHRPL.",fix:`1) CEDA DEFINE PROGRAM.
2) Module in DFHRPL.
3) CEMT SET PROG NEWCOPY.`,tips:["CEMT I PROG shows status","PHASEIN for zero-downtime"]},{code:"AEIQ",name:"CICS - Queue Error",category:"CICS",severity:"medium",cause:"TS or TD queue not found, full, or I/O error.",fix:`1) Check queue exists.
2) Verify definition.
3) Check DFHTEMP space.`,tips:["CEMT I TDQ/TSQ shows status"]},{code:"AEIV",name:"CICS - Invalid Request",category:"CICS",severity:"medium",cause:"CICS command invalid for current context. Wrong API sequence.",fix:`1) Check command sequence.
2) Check EIBRESP/EIBRESP2.
3) Add RESP handling.`,tips:["EIBRESP2 gives sub-reason"]},{code:"AEXL",name:"CICS - XCTL Error",category:"CICS",severity:"medium",cause:"XCTL target not found or not defined.",fix:`1) Verify CSD definition.
2) Module in DFHRPL.
3) Check name spelling.`,tips:["XCTL frees caller, LINK doesn't"]},{code:"AEY7",name:"CICS - Invalid EXEC CICS",category:"CICS",severity:"medium",cause:"EXEC CICS command not recognized. Version mismatch.",fix:`1) Recompile with correct translator.
2) Verify CICS version.
3) Check SIT.`,tips:["Recompile for target CICS level"]},{code:"AEY9",name:"CICS - Program Check (ASRA)",category:"CICS",severity:"critical",cause:"Program check — equivalent to S0C1/S0C4/S0C7 in batch.",fix:`1) Transaction dump — PSW and registers.
2) CEDF to step through.
3) Same fixes as S0C4/S0C7.`,tips:["CEDF is your best friend","EIBCALEN for COMMAREA length"]},{code:"AKCS",name:"CICS - Socket Error",category:"CICS",severity:"medium",cause:"TCP/IP connection failed, timeout, or protocol error.",fix:`1) Check TCP/IP connectivity.
2) Verify partner system.
3) Check TCPIPSERVICE definition.`,tips:["CEMT I TCPIPS shows status"]},{code:"ASRA",name:"CICS - Program Check",category:"CICS",severity:"critical",cause:"Arithmetic/addressing exception in CICS. Wraps S0C7, S0C4, etc.",fix:`1) Get transaction dump.
2) Find S-type code in DFHDU0420.
3) Apply fix for that abend.
4) CEDF + CETR for debugging.`,tips:["Dump offset → COBOL listing","TEST option for symbolic debug"]},{code:"ASRB",name:"CICS - OS Abend in Task",category:"CICS",severity:"high",cause:"Operating system abend in CICS task.",fix:`1) Check dump for S-type code.
2) Apply fix for that abend.
3) Check storage (S878, S80A).`,tips:["More severe than ASRA"]},{code:"ATSP",name:"CICS - Suspend Timeout",category:"CICS",severity:"medium",cause:"Exceeded DTIMOUT while waiting for resource.",fix:`1) Increase DTIMOUT.
2) Check resource contention.
3) Optimize wait times.`,tips:["CEMT I TRANS shows DTIMOUT"]},{code:"AEYB",name:"CICS - Deadlock Timeout",category:"CICS",severity:"medium",cause:"Deadlock timeout. Two tasks each hold lock other needs.",fix:`1) Consistent lock ordering.
2) COMMIT frequently.
3) Increase timeout.`,tips:["Check VSAM string waits","DB2 lock contention common"]},{code:"00C9",name:"DB2 - Deadlock/Timeout",category:"DB2",severity:"high",cause:"Deadlock or lock timeout. SQLCODE -911 or -913.",fix:`1) Consistent lock ordering.
2) Increase IRLMRWT.
3) COMMIT frequently.
4) Optimize SQL.`,tips:["-911 SQLERRD(3)=00C90088=timeout","-913=deadlock","ISOLATION(UR) for dirty reads"]},{code:"04E",name:"DB2 - Authorization Failure",category:"DB2",severity:"medium",cause:"SQLCODE -551. Missing privilege.",fix:`1) GRANT privilege to authid.
2) Check bind authority.
3) Verify secondary authids.`,tips:["SYSIBM.SYSTABAUTH catalog"]},{code:"047",name:"DB2 - Unhandled SQLCODE",category:"DB2",severity:"medium",cause:"Program received SQLCODE it doesn't handle.",fix:`1) Add SQLCODE checking after every SQL.
2) Check SQLCA.
3) Handle 0, 100, negatives.`,tips:["WHENEVER SQLERROR catches unhandled"]},{code:"04F",name:"DB2 - LOB Timeout",category:"DB2",severity:"medium",cause:"Deadlock/timeout on LOB data.",fix:`1) Reduce LOB lock hold time.
2) COMMIT after LOB ops.
3) Use streaming.`,tips:["LOB locks at value level"]},{code:"071",name:"DB2 - Resource Unavailable",category:"DB2",severity:"medium",cause:"Tablespace/index stopped or in utility status.",fix:`1) -DIS DB(db) SPACE(*).
2) Wait for utility.
3) -START DB(db) SPACE(sp).`,tips:["RESTRICT=utility running"]},{code:"U0102",name:"IMS - Invalid SSA",category:"IMS",severity:"medium",cause:"Invalid Segment Search Argument. SSA syntax error or invalid field.",fix:`1) Verify SSA format.
2) Check DBD field names.
3) Check SSA length.`,tips:["Qualified SSA: segname(field=value)"]},{code:"U0456",name:"IMS - Security Violation",category:"IMS",severity:"medium",cause:"Not authorized for database/segment.",fix:`1) Check RACF/IMS security.
2) Verify PSB authorization.
3) Check AGN.`,tips:["/DIS TRAN for settings"]},{code:"U0474",name:"IMS - Invalid Checkpoint",category:"IMS",severity:"medium",cause:"Checkpoint ID not found or restart data invalid.",fix:`1) Verify checkpoint in RECON.
2) Check XRST parameters.
3) Rerun from start.`,tips:["/DIS OLDS for log status"]},{code:"U0778",name:"IMS - DL/I Call Failure",category:"IMS",severity:"high",cause:"Unrecoverable DL/I error. PCB status: AI=deadlock, AK=invalid SSA, GE=not found.",fix:`1) Check PCB status code.
2) Review call sequence.
3) Verify DBD/PSB match.`,tips:["GU with GE=not found","IMS log shows failing call"]},{code:"U0928",name:"IMS - Transaction Abend",category:"IMS",severity:"high",cause:"Application abended during IMS transaction.",fix:`1) Check IMS system log.
2) Review application dump.
3) Check dependent region.`,tips:["/DIS TRAN, /STOP then /START"]},{code:"JCL ERROR",name:"JCL Syntax Error",category:"JCL",severity:"low",cause:"Syntax error: missing comma, invalid parameter, column 72 issue, unmatched quotes.",fix:`1) Check JESMSGLG for IEF6xxI messages.
2) Fix identified statement.
3) Check column 72 continuation.
4) Check parentheses/quotes.`,tips:["Column 1-2=//","Column 72=continuation","TYPRUN=SCAN validates without running"]},{code:"JCLERR",name:"JCL General Error",category:"JCL",severity:"low",cause:"General JCL error from converter or interpreter.",fix:`1) Read exact message in JESMSGLG.
2) IEF453I=invalid DD, IEF612I=invalid EXEC.
3) Fix identified statement.`,tips:["IEFC=converter, IEF=interpreter"]},{code:"U0001",name:"User Abend 0001",category:"User",severity:"medium",cause:"Application-specific. Program intentionally terminated.",fix:`1) Check program documentation.
2) Review SYSOUT/SYSPRINT.
3) Validate input data.`,tips:["U-type = application defined","Reason code gives meaning"]},{code:"U0016",name:"LE - Bad Input Data",category:"User",severity:"medium",cause:"Language Environment detected invalid input. Bad numeric in ACCEPT/READ.",fix:`1) Validate input before processing.
2) Check file status after READ.
3) ON EXCEPTION for ACCEPT.`,tips:["CEEOPTS controls LE behavior"]},{code:"U1000",name:"LE - Normal Termination",category:"User",severity:"low",cause:"Normal STOP RUN or GOBACK. LE standard termination.",fix:"Usually normal. Check RETURN-CODE if unexpected.",tips:["U1000 RC=0 is normal"]},{code:"U1026",name:"LE - AMODE Mismatch",category:"User",severity:"medium",cause:"Addressing mode incompatibility during CALL.",fix:`1) Compatible AMODE in call chain.
2) Recompile with correct AMODE.
3) Check LE enclave.`,tips:["AMODE 31→24 needs mode switching"]},{code:"U4038",name:"LE - Heap Exhausted",category:"User",severity:"high",cause:"LE heap full or corrupted. Storage leak or overlay.",fix:`1) Increase LE HEAP option.
2) Fix storage leaks.
3) HEAPCHK to detect overlay.`,tips:["CEEOPTS='HEAP(32K,,,,FREE)'","HEAPCHK(ON) catches corruption"]},{code:"U4039",name:"LE - Stack Overflow",category:"User",severity:"high",cause:"Stack overflow. Deep nesting, recursion, or large locals.",fix:`1) Increase LE STACK option.
2) Check for infinite recursion.
3) Move large locals to WORKING-STORAGE.`,tips:["CEEOPTS='STACK(128K,,,,)'","Deep PERFORM nesting exhausts stack"]},{code:"U4093",name:"LE - Math Error",category:"User",severity:"medium",cause:"Division by zero, overflow, or invalid math argument.",fix:`1) Check for zero divisors.
2) Validate arguments.
3) ON SIZE ERROR clause.`,tips:["CEEOPTS='TRAP(ON)'"]}],Qo=["All","System","CICS","DB2","IMS","JCL","User"],ut={critical:"#dc2626",high:"#ea580c",medium:"#d97706",low:"#16a34a"},qo={critical:"🔴 Critical",high:"🟠 High",medium:"🟡 Medium",low:"🟢 Low"},ca=[{level:1,title:"Trainee",subtitle:"Getting Started",icon:"🌱",color:"#22c55e",duration:"0–3 months",skills:[{name:"TSO/ISPF Navigation",topic:"tso"},{name:"z/OS Basics & MVS Concepts",topic:"zos"},{name:"JCL Fundamentals",topic:"jcl"},{name:"Basic COBOL Syntax",topic:"cobol"},{name:"Sequential File Processing",topic:"vsam"}],milestone:"Can navigate TSO, write simple JCL, and compile a COBOL program"},{level:2,title:"Junior Developer",subtitle:"Building Foundations",icon:"🔧",color:"#3b82f6",duration:"3–9 months",skills:[{name:"COBOL File Handling & Reports",topic:"cobol"},{name:"JCL PROCs & Symbolic Parameters",topic:"jcl"},{name:"VSAM (KSDS, ESDS, RRDS)",topic:"vsam"},{name:"SORT/MERGE Utilities",topic:"utilities"},{name:"Basic DB2 SQL",topic:"db2"},{name:"Abend Debugging (S0C7, S0C4)",topic:"zos"}],milestone:"Can independently develop, test, and debug batch COBOL programs"},{level:3,title:"Developer",subtitle:"Production Ready",icon:"⚡",color:"#8b5cf6",duration:"9–18 months",skills:[{name:"CICS Application Programming",topic:"cics"},{name:"BMS Maps & Screen Design",topic:"cics"},{name:"DB2 Embedded SQL & Cursors",topic:"db2"},{name:"REXX Scripting",topic:"rexx"},{name:"File Status Codes & Error Handling",topic:"cobol"},{name:"IMS/DB Basics",topic:"ims"},{name:"IDCAMS & VSAM Utilities",topic:"vsam"}],milestone:"Can build end-to-end CICS transactions with DB2 backend"},{level:4,title:"Senior Developer",subtitle:"System Expertise",icon:"🎯",color:"#ec4899",duration:"18–36 months",skills:[{name:"Performance Tuning (DB2, COBOL)",topic:"db2"},{name:"RACF Security Administration",topic:"racf"},{name:"CA7/TWS Job Scheduling",topic:"ca7"},{name:"Complex DFSORT/ICETOOL",topic:"utilities"},{name:"SMF Records & Monitoring",topic:"smf"},{name:"Production Support & Incident Mgmt",topic:"zos"},{name:"CICS Tuning & Administration",topic:"cics"}],milestone:"Can handle production incidents, tune performance, and mentor juniors"},{level:5,title:"Lead / Specialist",subtitle:"Domain Authority",icon:"🏆",color:"#f59e0b",duration:"3–6 years",skills:[{name:"Systems Programming Concepts",topic:"zos"},{name:"Capacity Planning & WLM",topic:"smf"},{name:"Disaster Recovery Procedures",topic:"zos"},{name:"z/OS Connect & API Economy",topic:"modernization"},{name:"DevOps for Mainframe (Zowe CLI)",topic:"modernization"},{name:"Cross-Platform Integration",topic:"modernization"}],milestone:"Can design systems, lead teams, and drive modernization initiatives"},{level:6,title:"Architect",subtitle:"Strategic Vision",icon:"👑",color:"#ef4444",duration:"6+ years",skills:[{name:"Enterprise Architecture (Mainframe + Cloud)",topic:"modernization"},{name:"Strangler Fig & Modernization Patterns",topic:"modernization"},{name:"Hybrid Cloud with IBM Z",topic:"modernization"},{name:"Cost Optimization & TCO Analysis",topic:"zos"},{name:"Vendor Management & IBM Strategy",topic:"zos"},{name:"Team Building & Knowledge Transfer",topic:"zos"}],milestone:"Can define enterprise mainframe strategy and drive organizational transformation"}],Zo=r.lazy(()=>go(()=>import("./Hero3D-bxrnT4wW.js"),__vite__mapDeps([0,1,2]))),on=[{name:"Harikrishnan",role:"Admin • Founder",color:"#00b365",status:"online",emoji:"👑"},{name:"Ravi Kumar",role:"Senior COBOL Dev",color:"#0071e3",status:"online",emoji:"💻"},{name:"Priya Sharma",role:"COBOL Expert",color:"#9b59b6",status:"online",emoji:"📘"},{name:"Arun Patel",role:"DB2 Specialist",color:"#e67e22",status:"away",emoji:"🗄️"},{name:"Meera Nair",role:"JCL Developer",color:"#e74c3c",status:"offline",emoji:"⚙️"},{name:"Suresh Reddy",role:"CICS Analyst",color:"#d4a017",status:"online",emoji:"🔧"},{name:"Anitha Das",role:"Trainee",color:"#27ae60",status:"online",emoji:"🌱"},{name:"Vikram Singh",role:"IMS Developer",color:"#8e44ad",status:"away",emoji:"📊"}],j={TEXT:"text",JOB:"job",DOUBT:"doubt",THOUGHT:"thought",SYS:"system",POLL:"poll"},_o=["👍","❤️","😂","🔥","💡","🎯"];function Sa(d,T=.35){const f=parseInt(d.slice(1,3),16),A=parseInt(d.slice(3,5),16),u=parseInt(d.slice(5,7),16);return`#${Math.round(f*(1-T)).toString(16).padStart(2,"0")}${Math.round(A*(1-T)).toString(16).padStart(2,"0")}${Math.round(u*(1-T)).toString(16).padStart(2,"0")}`}const da=[["#FF6B6B","#EE5A24"],["#0071e3","#7c3aed"],["#00b894","#00cec9"],["#e17055","#fdcb6e"],["#6c5ce7","#a29bfe"],["#fd79a8","#e84393"],["#00b365","#20bf6b"],["#f78fb3","#cf6a87"],["#3dc1d3","#0984e3"],["#e77f67","#f5cd79"],["#546de5","#574b90"],["#e15f41","#c44569"],["#00d2d3","#01a3a4"],["#ff9ff3","#f368e0"],["#feca57","#ff6348"],["#1dd1a1","#10ac84"],["#54a0ff","#2e86de"],["#5f27cd","#341f97"]],Ea=["🚀","⚡","🔥","💎","🌟","🎯","💻","🧠","🦊","🐉","🎮","🌈","🎸","🏆","🛡️","🔮","👾","🤖"],pa=["dots","rings","waves","grid","diamond"];function $o(d){let T=0;for(let f=0;f<(d||"").length;f++)T=(T<<5)-T+(d||"U").charCodeAt(f),T|=0;return Math.abs(T)}function Xe({name:d,size:T=36,showRing:f=!1,onClick:A,style:u}){const L=$o(d),O=da[L%da.length],w=Ea[L%Ea.length],m=pa[L%pa.length],v=(d||"U").charAt(0).toUpperCase(),W=L%3===0,[M,E]=r.useState(!1);var U="";m==="dots"?U="<circle cx='4' cy='4' r='1.5' fill='rgba(255,255,255,0.15)'/><circle cx='12' cy='12' r='1.5' fill='rgba(255,255,255,0.15)'/>":m==="rings"?U="<circle cx='8' cy='8' r='6' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5'/>":m==="waves"?U="<path d='M0 8 Q4 4 8 8 T16 8' fill='none' stroke='rgba(255,255,255,0.12)' stroke-width='1.5'/>":m==="grid"?U="<line x1='0' y1='8' x2='16' y2='8' stroke='rgba(255,255,255,0.08)' stroke-width='1'/><line x1='8' y1='0' x2='8' y2='16' stroke='rgba(255,255,255,0.08)' stroke-width='1'/>":m==="diamond"&&(U="<polygon points='8,2 14,8 8,14 2,8' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/>");const z=`url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E${encodeURIComponent(U)}%3C/svg%3E")`;return e.jsxs("div",{onClick:A,onMouseEnter:()=>E(!0),onMouseLeave:()=>E(!1),style:{position:"relative",width:T,height:T,flexShrink:0,cursor:A?"pointer":"default",perspective:"200px",transformStyle:"preserve-3d",...u},children:[f&&e.jsx("div",{style:{position:"absolute",inset:-3,borderRadius:"50%",background:`conic-gradient(${O[0]}, ${O[1]}, transparent, ${O[0]})`,animation:"spin 3s linear infinite",opacity:M?1:.7,transition:"opacity 0.3s"}}),f&&e.jsx("div",{style:{position:"absolute",inset:-6,borderRadius:"50%",background:`radial-gradient(circle, ${O[0]}40, transparent 70%)`,animation:"avatarPulse 2s ease-in-out infinite",zIndex:0}}),e.jsxs("div",{className:"avatar-3d",style:{width:T,height:T,borderRadius:"50%",background:`linear-gradient(135deg, ${O[0]}, ${O[1]})`,backgroundImage:`${z}, linear-gradient(135deg, ${O[0]}, ${O[1]})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:W?T*.5:T*.42,fontWeight:800,fontFamily:"-apple-system,sans-serif",boxShadow:M?`0 8px 25px ${O[0]}60, 0 0 15px ${O[1]}30, inset 0 -2px 6px rgba(0,0,0,0.15)`:f?`0 4px 16px ${O[0]}40, inset 0 -2px 4px rgba(0,0,0,0.1)`:`0 2px 8px ${O[0]}30, inset 0 -1px 3px rgba(0,0,0,0.1)`,border:f?"2.5px solid rgba(255,255,255,0.9)":"none",position:"relative",zIndex:1,letterSpacing:"-0.5px",textShadow:"0 1px 3px rgba(0,0,0,0.25)",transform:M?"rotateY(15deg) rotateX(-10deg) scale(1.1)":"rotateY(0) rotateX(0) scale(1)",transition:"transform 0.3s ease, box-shadow 0.3s ease",backfaceVisibility:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"8%",left:"15%",width:"35%",height:"25%",borderRadius:"50%",background:"rgba(255,255,255,0.25)",filter:"blur(3px)",pointerEvents:"none"}}),W?w:v]})]})}function Ve({style:d}){const T=r.useRef(null),f=r.useRef(null);return r.useEffect(()=>{const A=T.current;if(!A)return;const u=A.getContext("2d"),L=()=>{A.width=A.offsetWidth*2,A.height=A.offsetHeight*2,u.scale(2,2)};L(),window.addEventListener("resize",L);const O=Array.from({length:7},(W,M)=>({x:Math.random()*A.offsetWidth,y:Math.random()*A.offsetHeight,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:14+Math.random()*10,col:on[M%8].color,em:on[M%8].emoji,ph:Math.random()*Math.PI*2})),w=Array.from({length:35},()=>({x:Math.random()*A.offsetWidth,y:Math.random()*A.offsetHeight,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:1+Math.random()*2,a:.2+Math.random()*.4}));let m=0;const v=()=>{m+=.016;const W=A.offsetWidth,M=A.offsetHeight;u.clearRect(0,0,W,M);for(let E=0;E<O.length;E++)for(let U=E+1;U<O.length;U++){const z=O[E],p=O[U],B=Math.hypot(z.x-p.x,z.y-p.y);B<180&&(u.beginPath(),u.moveTo(z.x,z.y),u.lineTo(p.x,p.y),u.strokeStyle=`rgba(0,113,227,${(1-B/180)*.12})`,u.lineWidth=1,u.stroke())}w.forEach(E=>{E.x+=E.vx,E.y+=E.vy,(E.x<0||E.x>W)&&(E.vx*=-1),(E.y<0||E.y>M)&&(E.vy*=-1),u.beginPath(),u.arc(E.x,E.y,E.r,0,Math.PI*2),u.fillStyle=`rgba(0,113,227,${E.a*.4})`,u.fill()}),O.forEach(E=>{E.x+=E.vx+Math.sin(m+E.ph)*.3,E.y+=E.vy+Math.cos(m*.7+E.ph)*.3,(E.x<E.r||E.x>W-E.r)&&(E.vx*=-1),(E.y<E.r||E.y>M-E.r)&&(E.vy*=-1);const U=u.createRadialGradient(E.x,E.y,0,E.x,E.y,E.r*2.2);U.addColorStop(0,E.col+"25"),U.addColorStop(1,"transparent"),u.beginPath(),u.arc(E.x,E.y,E.r*2.2,0,Math.PI*2),u.fillStyle=U,u.fill(),u.beginPath(),u.arc(E.x,E.y,E.r,0,Math.PI*2),u.fillStyle=E.col+"18",u.strokeStyle=E.col+"40",u.lineWidth=1.5,u.fill(),u.stroke(),u.font=`${E.r*.85}px sans-serif`,u.textAlign="center",u.textBaseline="middle",u.fillText(E.em,E.x,E.y+1)}),f.current=requestAnimationFrame(v)};return f.current=requestAnimationFrame(v),()=>{cancelAnimationFrame(f.current),window.removeEventListener("resize",L)}},[]),e.jsx("canvas",{ref:T,style:{position:"absolute",inset:0,width:"100%",height:"100%",...d}})}function Ta({m:d,sz:T=34}){return e.jsxs("div",{style:{width:T,height:T,borderRadius:"50%",background:`linear-gradient(135deg,${d.color}20,${d.color}08)`,border:`2px solid ${d.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:T*.45,flexShrink:0,position:"relative"},children:[d.emoji,d.status==="online"&&e.jsx("div",{style:{position:"absolute",bottom:0,right:0,width:9,height:9,borderRadius:"50%",background:"#00b365",border:"2px solid #fff"}})]})}function es({msg:d,members:T,self:f,onReact:A,onReply:u,onDel:L,onStar:O,starred:w}){const[m,v]=r.useState(!1),[W,M]=r.useState(!1),E=d._isSelf||!1,U=d.type===j.SYS,z=U?null:{name:d._name||"User",role:d._role||"",color:d._color||"#0071e3",emoji:d._emoji||"🧑‍💻",status:"online"},p=(d.replyTo!=null,null);if(d.del)return e.jsx("div",{style:{display:"flex",justifyContent:E?"flex-end":"flex-start",padding:"2px 16px",opacity:.4},children:e.jsx("div",{style:{padding:"6px 14px",borderRadius:12,background:"#1e293b",fontStyle:"italic",fontSize:13,color:"#94a3b8"},children:"🚫 Deleted"})});if(U)return e.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 16px"},children:e.jsx("div",{style:{padding:"4px 16px",borderRadius:20,background:"rgba(0,113,227,0.12)",border:"1px solid rgba(0,113,227,0.2)",fontSize:12,color:"#94a3b8"},children:d.text})});const B={[j.JOB]:{bg:"rgba(124,58,237,0.15)",bd:"rgba(124,58,237,0.3)",ic:"💼",lb:"Job"},[j.DOUBT]:{bg:"rgba(251,191,36,0.12)",bd:"rgba(251,191,36,0.25)",ic:"❓",lb:"Doubt"},[j.THOUGHT]:{bg:"rgba(0,113,227,0.12)",bd:"rgba(0,113,227,0.25)",ic:"💭",lb:"Thought"},[j.POLL]:{bg:"rgba(168,85,247,0.12)",bd:"rgba(168,85,247,0.25)",ic:"📊",lb:"Poll"}}[d.type];return e.jsxs("div",{style:{display:"flex",justifyContent:E?"flex-end":"flex-start",padding:"3px 16px",alignItems:"flex-end",gap:8},onMouseEnter:()=>M(!0),onMouseLeave:()=>{M(!1),v(!1)},children:[!E&&z&&e.jsx(Ta,{m:z,sz:28}),e.jsxs("div",{style:{maxWidth:"75%",minWidth:100,position:"relative"},children:[W&&e.jsxs("div",{style:{position:"absolute",top:-8,[E?"left":"right"]:0,display:"flex",gap:2,background:"#111827",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"2px 4px",zIndex:5,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"},children:[e.jsx("button",{onClick:()=>v(!m),style:mt,"aria-label":"React",children:"😊"}),e.jsx("button",{onClick:()=>u(d),style:mt,"aria-label":"Reply",children:"↩️"}),e.jsx("button",{onClick:()=>O(d.id),style:mt,"aria-label":"Bookmark",children:w?"⭐":"☆"}),E&&e.jsx("button",{onClick:()=>L(d.id),style:mt,"aria-label":"Delete",children:"🗑️"})]}),m&&e.jsx("div",{style:{position:"absolute",top:-40,[E?"left":"right"]:0,display:"flex",gap:2,background:"#111827",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"4px 6px",zIndex:10,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"},children:_o.map(D=>e.jsx("button",{onClick:()=>{A(d.id,D),v(!1)},style:{background:"none",border:"none",cursor:"pointer",fontSize:18,padding:"2px 4px",borderRadius:6},"aria-label":"React with "+D,children:D},D))}),e.jsxs("div",{style:{background:E?"linear-gradient(135deg,#0071e3,#0055b0)":B?B.bg:"#1e293b",border:`1px solid ${E?"#0060c0":B?B.bd:"rgba(255,255,255,0.1)"}`,borderRadius:E?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"8px 12px"},children:[B&&e.jsxs("div",{style:{fontSize:10,fontWeight:700,color:"#94a3b8",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.5px"},children:[B.ic," ",B.lb]}),!E&&z&&e.jsxs("div",{style:{fontSize:12,fontWeight:700,color:z.color,marginBottom:3},children:[z.name," ",z.emoji]}),p,d.type===j.POLL&&d.pollOpts?e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:14,color:E?"#fff":"#e2e8f0",marginBottom:8,fontWeight:600},children:d.text}),d.pollOpts.map((D,Z)=>{const It=d.pollOpts.reduce((je,Rt)=>je+Rt.votes.length,0),At=It>0?D.votes.length/It*100:0;return e.jsxs("div",{style:{marginBottom:6,position:"relative",borderRadius:8,overflow:"hidden",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.06)"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,height:"100%",width:`${At}%`,background:"rgba(0,113,227,0.1)"}}),e.jsxs("div",{style:{position:"relative",padding:"6px 10px",display:"flex",justifyContent:"space-between",fontSize:13,color:"#f1f5f9"},children:[e.jsx("span",{children:D.text}),e.jsxs("span",{style:{color:"#0071e3",fontWeight:600},children:[D.votes.length," (",Math.round(At),"%)"]})]})]},Z)})]}):e.jsx("div",{style:{fontSize:14,color:E?"#fff":"#e2e8f0",whiteSpace:"pre-wrap",lineHeight:1.45},children:d.text}),e.jsxs("div",{style:{fontSize:10,color:E?"rgba(255,255,255,0.6)":"#64748b",marginTop:4,textAlign:"right"},children:[d.time,E&&" ✓✓"]})]}),Object.keys(d.reactions).length>0&&e.jsx("div",{style:{display:"flex",gap:4,marginTop:2,flexWrap:"wrap",justifyContent:E?"flex-end":"flex-start"},children:Object.entries(d.reactions).map(([D,Z])=>e.jsxs("span",{onClick:()=>A(d.id,D),style:{background:Z.includes(f)?"rgba(0,113,227,0.2)":"rgba(30,41,59,0.6)",border:`1px solid ${Z.includes(f)?"rgba(0,113,227,0.35)":"rgba(255,255,255,0.1)"}`,borderRadius:12,padding:"1px 6px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:3},children:[D,e.jsx("span",{style:{fontSize:10,color:"#94a3b8"},children:Z.length})]},D))})]})]})}const mt={background:"none",border:"none",cursor:"pointer",fontSize:14,padding:"2px 4px",borderRadius:4},S="-apple-system,'SF Pro Display','SF Pro Text','Helvetica Neue',Arial,sans-serif",Tt="'SF Mono','Fira Code','Cascadia Code',monospace",Ca={zos:{tip:{title:"Understanding z/OS Address Space Limits",content:`Every z/OS address space has storage limits that directly impact application behavior. The 16MB 'line' and 2GB 'bar' are architectural boundaries from 24-bit and 31-bit addressing eras. Modern applications should use 64-bit (above the bar) storage for large data buffers.

When you encounter S878 or S80A abends, the first diagnostic step is checking REGION allocation vs actual usage via SMF Type 30 records. Use IEFUSI exit to enforce region limits per job class rather than relying on JCL REGION parameters.`},scenario:{question:"A production CICS region is experiencing intermittent S80A abends during peak hours. The DSA is configured at 256MB. What's your approach?",answer:"First, check CICS statistics for DSA usage trends (EXEC CICS INQUIRE SYSTEM). Review EDSA vs DSA allocation — if EDSA is exhausted but DSA has room, programs may not be compiled with RENT/RMODE(ANY). Check for storage leaks using CICS auxiliary trace. Increase EDSALIM to 512MB as immediate relief while investigating the root cause program."},code:{title:"Check z/OS Storage Usage via REXX",snippet:`/* REXX - Display address space storage */
ARG JOBNAME
RC = ISFCALLS('ON')
ISFPREFIX = JOBNAME
ISFCOLS = 'JNAME STPCP STECP REGION'
ADDRESS SDSF "ISFEXEC DA"
DO IX = 1 TO JNAME.0
  SAY JNAME.IX 'CPU:' STPCP.IX,
      'Region:' REGION.IX
END
RC = ISFCALLS('OFF')`,explanation:"This REXX script queries SDSF to display active address space storage usage. Useful for quick capacity checks during peak processing."},facts:["z/OS can manage up to 16 EB (exabytes) of virtual storage per address space in 64-bit mode","The z/OS master scheduler address space has been running continuously since the first MVS release in 1974","IBM Z processors can execute over 12.5 billion instructions per second per core"],generatedDate:new Date().toLocaleDateString()},jcl:{tip:{title:"JCLLIB ORDER vs STEPLIB Performance",content:`A common performance pitfall is using STEPLIB on every step when JCLLIB ORDER would be more efficient. JCLLIB ORDER is resolved at JCL conversion time by JES2, meaning the system locates procedures and includes before execution begins.

STEPLIB, on the other hand, is searched at program load time for every EXEC PGM= statement. For jobs with 20+ steps, this difference can add up to measurable elapsed time. Best practice: use JCLLIB for PROCs and STEPLIB only when you need step-specific load libraries.`},scenario:{question:"A batch job JOB23456 is failing with JCL ERROR - IEF212I. The job worked fine yesterday. What do you check?",answer:"IEF212I means a dataset was not found during allocation. Steps: (1) Check JESMSGLG for the exact dataset name in error. (2) Verify the dataset exists using LISTCAT. (3) Check if a GDG rolled off — if using relative generation (+0, -1), a new generation may have shifted references. (4) Check for a renamed or migrated dataset via HSM. (5) If using symbolics, verify SET statements resolve correctly with MSGLEVEL=(2,1)."},code:{title:"Dynamic Dataset Name with System Symbols",snippet:`//DYNJOB   JOB ,'DYNAMIC DSN',CLASS=A,NOTIFY=&SYSUID
//*
// SET ENV=PROD
// SET DT=&LYYMMDD
//*
//STEP1    EXEC PGM=SORT
//SORTIN   DD DSN=&ENV..DAILY.TRANS.D&DT,DISP=SHR
//SORTOUT  DD DSN=&ENV..DAILY.SORTED.D&DT,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(50,25),RLSE)
//SYSIN    DD *
  SORT FIELDS=(1,10,CH,A)
/*
//SYSOUT   DD SYSOUT=*`,explanation:"This JCL uses system symbols (&LYYMMDD for current date) and SET statements to create dynamic dataset names. Eliminates manual date changes in production JCL."},facts:["JCL has been in continuous use since 1964 — over 60 years of backward compatibility","A single z/OS system can process over 100,000 batch jobs per day","The maximum number of steps in a single JCL job is 255"],generatedDate:new Date().toLocaleDateString()},cobol:{tip:{title:"Enterprise COBOL V6 JSON GENERATE",content:`Enterprise COBOL V6.3+ includes native JSON GENERATE and JSON PARSE statements, eliminating the need for external libraries or complex string manipulation to handle JSON data.

JSON GENERATE creates JSON from COBOL data structures automatically. Combined with z/OS Connect, this means COBOL programs can natively produce API responses. The key optimization: use the COUNT IN clause to get the exact byte count of generated JSON, and NAME OF clause to customize JSON key names from COBOL data names.`},scenario:{question:"A COBOL batch program processes 50 million records and takes 4 hours. Management wants it under 2 hours. What optimization strategies do you apply?",answer:"1) Check BLKSIZE — increase to half-track (27998 for 3390). 2) Use SORT for pre-processing instead of COBOL logic. 3) Add VSAM LSR buffers (BUFND=20+). 4) Replace COMPUTE with ADD/SUBTRACT for simple math. 5) Use BINARY (COMP) instead of DISPLAY for counters. 6) Check for unnecessary PERFORM loops. 7) Use DB2 multi-row FETCH if DB2-dependent. 8) Consider splitting into parallel streams."},code:{title:"COBOL JSON GENERATE Example",snippet:`       01 EMPLOYEE-RECORD.
          05 EMP-ID        PIC X(6).
          05 EMP-NAME      PIC X(30).
          05 EMP-SALARY    PIC 9(8)V99.
          05 EMP-DEPT      PIC X(4).
       01 JSON-OUTPUT      PIC X(500).
       01 JSON-LENGTH      PIC 9(4) COMP.

       PROCEDURE DIVISION.
           MOVE '100234' TO EMP-ID
           MOVE 'JOHN SMITH' TO EMP-NAME
           MOVE 85000.00 TO EMP-SALARY
           MOVE 'FIN'  TO EMP-DEPT

           JSON GENERATE JSON-OUTPUT
             FROM EMPLOYEE-RECORD
             COUNT IN JSON-LENGTH
             NAME OF EMP-ID IS 'employeeId'
             NAME OF EMP-NAME IS 'name'
             NAME OF EMP-SALARY IS 'salary'
             NAME OF EMP-DEPT IS 'department'
           END-JSON`,explanation:"Native JSON generation in COBOL — no external libraries needed. The NAME OF clause maps COBOL field names to clean JSON keys."},facts:["There are approximately 220 billion lines of COBOL code in active production worldwide","95% of ATM transactions globally involve COBOL code at some point","Enterprise COBOL V6 can generate optimized code that runs up to 30% faster than V4"],generatedDate:new Date().toLocaleDateString()},rexx:{tip:{title:"REXX OUTTRAP for Dynamic Output Capture",content:`OUTTRAP lets you capture TSO command output into REXX stem variables for programmatic processing. This is incredibly powerful for automation — you can issue any TSO or ISPF command and parse the results.

Combine OUTTRAP with LISTDS, LISTCAT, or SDSF commands to build monitoring scripts that check dataset status, job output, or system health without manual intervention.`},scenario:{question:"Write a REXX script that checks if a dataset exists and creates it if not.",answer:"Use SYSDSN() function: if SYSDSN(dsname)='OK' then dataset exists. Otherwise use ALLOC command to create it. Always include error handling with SIGNAL ON ERROR."},code:{title:"REXX Dataset Checker",snippet:`/* REXX - Check and create dataset */
PARSE ARG DSNAME
IF SYSDSN("'"DSNAME"'") = 'OK' THEN DO
  SAY DSNAME 'already exists'
  EXIT 0
END
ELSE DO
  SAY 'Creating' DSNAME
  "ALLOC DA('"DSNAME"') NEW CATALOG",
    "SPACE(10,5) CYLINDERS",
    "RECFM(F B) LRECL(80) BLKSIZE(27920)"
  IF RC = 0 THEN SAY 'Created successfully'
  ELSE SAY 'Error RC=' RC
END`,explanation:"Uses SYSDSN() for existence check and TSO ALLOC for creation. Production-ready pattern for automation scripts."},facts:["REXX was created by Mike Cowlishaw at IBM in 1979","REXX is the primary scripting language on z/OS, z/VM, and OS/2","The REXX language specification is an ANSI standard (X3.274-1996)"],generatedDate:new Date().toLocaleDateString()},vsam:{tip:{title:"VSAM CI/CA Split Prevention",content:`Control interval and control area splits are the #1 cause of VSAM performance degradation. CI splits cause record movement within a CI, while CA splits require allocating entire new control areas.

Prevention: schedule regular REORGs, monitor FREESPACE usage via LISTCAT, and set appropriate CI/CA FREESPACE percentages. For high-insert workloads, FREESPACE(20 10) is a good starting point.`},scenario:{question:"VSAM KSDS performance has degraded over time. LISTCAT shows 45% CI splits. What's your recovery plan?",answer:"1) REPRO the dataset to sequential backup. 2) DELETE the VSAM cluster. 3) DEFINE new cluster with better FREESPACE. 4) REPRO data back. 5) Schedule regular REORG. Also check for sequential inserts that might benefit from key-range partitioning."},code:{title:"IDCAMS Health Check",snippet:`//VSAMCHK  EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  LISTCAT ENTRIES(MY.VSAM.KSDS) -
    ALL
  IF LASTCC = 0 THEN -
    PRINT INFILE(VSAMDD) -
      COUNT(5)
/*
//VSAMDD   DD DSN=MY.VSAM.KSDS,DISP=SHR`,explanation:"LISTCAT ALL shows splits, FREESPACE usage, and extent info — essential for VSAM health monitoring."},facts:["VSAM KSDS supports up to 255 alternate indexes","A single VSAM dataset can span up to 59 volumes","VSAM RLS (Record Level Sharing) enables multi-system access in a Sysplex"],generatedDate:new Date().toLocaleDateString()},db2:{tip:{title:"DB2 EXPLAIN and Access Path Analysis",content:`Always EXPLAIN your SQL before deploying to production. DB2's optimizer chooses access paths based on statistics — if RUNSTATS hasn't been run recently, the optimizer may make poor decisions.

Key things to check in EXPLAIN output: tablespace scans (should be index access for OLTP), sort operations (expensive for large result sets), and join methods (nested loop vs merge scan vs hybrid join).`},scenario:{question:"A DB2 SQL query that ran in 2 seconds yesterday now takes 45 seconds. Code hasn't changed. What happened?",answer:"Most likely cause: stale statistics. Run RUNSTATS on the affected tables and indexes. Other causes: lock contention (check DB2 DISPLAY THREAD), buffer pool pressure (check SMF 101), index reorganization needed (check CLUSTERRATIO), or an LPAR change affecting CPU allocation."},code:{title:"DB2 Performance SQL",snippet:`SELECT SUBSTR(PROGNAME,1,8) AS PROGRAM,
       DECIMAL(CPU_TIME,10,2) AS CPU_SEC,
       DECIMAL(ELAPSED,10,2) AS ELAPSED_SEC,
       GETPAGES,
       CLASS1_ELAPSED
  FROM SYSIBM.SYSPACKSTMT
 WHERE ELAPSED > 5.0
 ORDER BY ELAPSED DESC
 FETCH FIRST 20 ROWS ONLY;`,explanation:"Query the DB2 catalog to find slow SQL statements. ELAPSED > 5 seconds flags potential performance problems for investigation."},facts:["DB2 for z/OS processes over 10 billion transactions daily across all installations","DB2 z/OS supports tables up to 128 TB with up to 750 columns","DB2 13 introduced AI-powered query optimization capabilities"],generatedDate:new Date().toLocaleDateString()},cics:{tip:{title:"CICS Channel and Container Pattern",content:`Modern CICS programming uses channels and containers instead of COMMAREAs for data passing. Channels have no size limit (COMMAREAs max at 32KB) and support named containers for structured data exchange.

This pattern enables CICS programs to exchange large XML/JSON documents and supports the microservices architecture within CICS.`},scenario:{question:"CICS transactions are experiencing ATSP abends during peak. What does this mean and how do you fix it?",answer:"ATSP means a transaction is being purged because it exceeded the DTIMOUT (deadlock timeout) value. Check: 1) DB2 lock contention via DSNV409I messages, 2) VSAM record-level locking waits, 3) CICS enqueue waits. Immediate fix: increase DTIMOUT. Root cause: reduce lock hold times, use READ UPDATE only when needed, commit frequently."},code:{title:"CICS Channel/Container Example",snippet:`       EXEC CICS PUT CONTAINER('REQUEST')
            CHANNEL('MYSERVICE')
            FROM(WS-REQUEST-DATA)
            FLENGTH(LENGTH OF WS-REQUEST-DATA)
       END-EXEC

       EXEC CICS LINK PROGRAM('SVCPROG1')
            CHANNEL('MYSERVICE')
       END-EXEC

       EXEC CICS GET CONTAINER('RESPONSE')
            CHANNEL('MYSERVICE')
            INTO(WS-RESPONSE-DATA)
            FLENGTH(WS-RESP-LEN)
       END-EXEC`,explanation:"Channel/Container pattern replaces COMMAREA for modern CICS. No 32KB limit, named data containers, cleaner interface."},facts:["CICS handles over 1.2 million transactions per second at peak globally","CICS Transaction Server has been in production since 1968","Over 80% of Fortune 500 companies use CICS for mission-critical applications"],generatedDate:new Date().toLocaleDateString()},imsdb:{tip:{title:"IMS Fast Path for Ultra-Low Latency",content:`IMS Fast Path (DEDBs and MSDBs) provides sub-millisecond response times by keeping data and indexes in memory. DEDBs (Data Entry Databases) are designed for high-insert workloads like ATM transactions.

Fast Path bypasses traditional IMS logging for certain operations, trading some recovery granularity for extreme performance.`},scenario:{question:"IMS batch program fails with U0778 abend. What's the cause?",answer:"U0778 is an IMS user abend indicating a DL/I status code that the program didn't handle. Check the PCB status code — common causes: GE (segment not found), II (duplicate key on INSERT), AI (open failure). Review the program's status code checking logic after each DL/I call."},code:{title:"IMS DL/I REPL Call",snippet:`       CALL 'CBLTDLI' USING GU-FUNC
                             PCB-MASK
                             EMPLOYEE-SEGMENT
                             SSA-EMPID.
       IF PCB-STATUS = SPACES
          MOVE NEW-SALARY TO EMP-SALARY
          CALL 'CBLTDLI' USING REPL-FUNC
                                PCB-MASK
                                EMPLOYEE-SEGMENT
       END-IF.`,explanation:"IMS GU (Get Unique) retrieves a segment, then REPL (Replace) updates it. Always check PCB status code between calls."},facts:["IMS has been in continuous production use since 1966","IMS can process over 50,000 transactions per second per IMS system","IMS manages some of the largest databases in the world — several exceeding 50TB"],generatedDate:new Date().toLocaleDateString()},ca7:{tip:{title:"CA7 Cross-Platform Scheduling",content:`Modern CA7 (now Broadcom AutoSys/CA7) integrates with distributed schedulers, enabling cross-platform job dependencies. A z/OS batch job can trigger a Linux job on completion, and vice versa.

Use CA7 XPJOB definitions for cross-platform jobs and NJE for cross-system z/OS dependencies.`},scenario:{question:"CA7 job PAYMST01 is in LATE status. Predecessor EXTRACT1 completed but CA7 didn't trigger PAYMST01. Why?",answer:"Check: 1) SCHID — does PAYMST01 have correct schedule ID for today? 2) Resource dependencies — is a required dataset or tape drive available? 3) COND code — did EXTRACT1 end with an acceptable return code? 4) Manual hold — someone may have placed a HOLD. 5) Calendar — verify the calendar allows execution today."},code:{title:"CA7 Job Definition",snippet:`//* CA7 Commands for job management
//*
//* Define a new job
DEMAND,JOB=PAYMST01,DOESSION=025,
  LEADTM=0015,JCLID=01,MAINID=ALL
//*
//* Add predecessor dependency
DBADD,JOB=PAYMST01,PRE=EXTRACT1,
  TYPE=JOB,PRESSION=025
//*
//* Check job status
LJOB,JOB=PAYMST01`,explanation:"CA7 DEMAND submits on-demand, DBADD defines dependencies. PREID links predecessor jobs."},facts:["CA7 manages over 1 million batch jobs daily at large enterprises","Broadcom AutoSys WA (formerly CA7) supports scheduling across 20+ platforms","Average enterprise runs 50,000-200,000 scheduled batch jobs per day"],generatedDate:new Date().toLocaleDateString()},security:{tip:{title:"RACF PassTicket for SSO Integration",content:`RACF PassTickets provide one-time-use authentication tokens that enable Single Sign-On (SSO) between z/OS and distributed systems. A web application authenticates the user once, generates a PassTicket, and passes it to z/OS — no password transmitted.

PassTickets are time-limited (default 10 minutes) and can only be used once, making them more secure than password-based authentication for automated processes.`},scenario:{question:"Audit found that 200+ RACF user IDs have the SPECIAL attribute. How do you remediate?",answer:"SPECIAL gives full RACF admin authority — it should be limited to 3-5 security admins maximum. Steps: 1) SEARCH CLASS(USER) SPECIAL to list all. 2) Categorize: identify true admins vs unnecessary grants. 3) Remove SPECIAL with ALTUSER id NOSPECIAL. 4) Create group-level CONNECT authorities for delegated administration instead. 5) Implement RACF auditing on SETROPTS to detect future unauthorized grants."},code:{title:"RACF Audit Report",snippet:`//* Generate RACF security audit report
//AUDIT    EXEC PGM=ICETOOL
//TOOLMSG  DD SYSOUT=*
//DFSMSG   DD SYSOUT=*
//SMFIN    DD DSN=MY.SMF.TYPE80,DISP=SHR
//REPORT   DD SYSOUT=A
//TOOLIN   DD *
  DISPLAY FROM(SMFIN) LIST(REPORT) -
    TITLE('RACF Security Events') -
    DATE TIME -
    ON(15,8,CH,HEADER('USERID')) -
    ON(30,44,CH,HEADER('RESOURCE')) -
    ON(80,1,CH,HEADER('ACCESS'))
/*`,explanation:"Process SMF Type 80 (RACF) records with ICETOOL to generate security audit reports — essential for SOX and PCI-DSS compliance."},facts:["RACF manages security for over 90% of all z/OS installations worldwide","z/OS with RACF holds EAL5+ Common Criteria certification — highest for any commercial OS","A single RACF database can contain over 10 million profiles"],generatedDate:new Date().toLocaleDateString()},tso:{tip:{title:"ISPF Edit Macros for Productivity",content:`ISPF edit macros can automate repetitive editing tasks. Written in REXX or CLIST, they execute within the ISPF editor context and can manipulate lines, search for patterns, and apply bulk changes.

Create a macro that automatically adds standard headers to COBOL programs, reformats JCL, or validates coding standards.`},scenario:{question:"How do you search across all members of a PDS for a specific string?",answer:"Use ISPF 3.14 (Search-For utility): specify the PDS name, search string, and optionally member name pattern. For more advanced searching: SuperC (ISRSUPC) supports wildcard patterns, column-specific searches, and comparison between two libraries."},code:{title:"REXX Edit Macro",snippet:`/* REXX ISPF Edit Macro */
"ISREDIT MACRO"
"ISREDIT (LN) = LINENUM .ZFIRST"
"ISREDIT (LL) = LINENUM .ZLAST"
DO I = LN TO LL
  "ISREDIT (LINE) = LINE" I
  IF POS('FIXME', LINE) > 0 THEN DO
    "ISREDIT LABEL" I "= .FX"
    SAY 'Found FIXME at line' I
  END
END
"ISREDIT CURSOR = 1 0"
EXIT 0`,explanation:"This edit macro scans all lines for 'FIXME' comments and labels them for quick navigation. Run with COMMAND ===> FINDFIX in the ISPF editor."},facts:["ISPF has been the primary mainframe development interface since 1975","TSO/ISPF supports up to 32,767 lines in a single PDS member","Over 3 million developers worldwide use ISPF daily"],generatedDate:new Date().toLocaleDateString()},procs:{tip:{title:"DFSORT JOINKEYS for Complex File Matching",content:`JOINKEYS is more powerful than ICETOOL SPLICE for complex joins. It supports inner join, left outer join, full outer join, and unpaired record handling — all in a single SORT step.

The REFORMAT statement controls which fields from each file appear in the output. Use F1: and F2: prefixes to reference fields from each input file.`},scenario:{question:"You need to compare two files and produce three outputs: matched records, records only in file 1, and records only in file 2. How?",answer:"Use DFSORT JOINKEYS with JOIN UNPAIRED,F1,F2 and three OUTFIL statements: one for matched (both F1 and F2 present), one for F1-only (F2 fields are spaces), one for F2-only (F1 fields are spaces). Check the REFORMAT fields for spaces to determine which file the record came from."},code:{title:"DFSORT 3-Way Split",snippet:`//SPLIT3  EXEC PGM=SORT
//FILE1   DD DSN=MY.OLD.MASTER,DISP=SHR
//FILE2   DD DSN=MY.NEW.EXTRACT,DISP=SHR
//MATCH   DD DSN=MY.MATCHED,DISP=(,CATLG)
//ONLY1   DD DSN=MY.DELETED,DISP=(,CATLG)
//ONLY2   DD DSN=MY.NEW.RECS,DISP=(,CATLG)
//SYSIN   DD *
  JOINKEYS FILE=F1,FIELDS=(1,10,A)
  JOINKEYS FILE=F2,FIELDS=(1,10,A)
  JOIN UNPAIRED,F1,F2
  REFORMAT FIELDS=(F1:1,80,F2:1,80)
  OUTFIL FNAMES=MATCH,
    INCLUDE=(1,80,CH,NE,C' ',&,81,80,CH,NE,C' ')
  OUTFIL FNAMES=ONLY1,
    INCLUDE=(1,80,CH,NE,C' ',&,81,80,CH,EQ,C' ')
  OUTFIL FNAMES=ONLY2,SAVE
/*`,explanation:"Full outer join with JOINKEYS produces matched and unmatched records. Three OUTFIL statements split the output based on which file contributed data."},facts:["DFSORT is installed on virtually every z/OS system worldwide","ICETOOL can process files up to 16 EB (exabytes) in size","DFSORT processes data at I/O speeds — often 10-100x faster than equivalent COBOL programs"],generatedDate:new Date().toLocaleDateString()},smf:{tip:{title:"Streaming SMF to Splunk for Real-Time Analytics",content:`Modern enterprises stream SMF records to Splunk, ELK, or Grafana in near-real-time using IBM Z IZOLDA (IBM Z Operational Log and Data Analytics) or custom programs that read SMF datasets and publish to Kafka.

This enables unified monitoring dashboards that show mainframe metrics alongside distributed system metrics — a key requirement for hybrid cloud operations.`},scenario:{question:"CPU utilization spiked to 98% during the batch window. How do you identify the culprit?",answer:"1) RMF Monitor II for real-time view of top consumers. 2) SMF Type 30 subtype 3 (step termination) sorted by CPU time. 3) Check WLM service class performance — was the spike in production batch or development? 4) Compare to baseline — is this normal for month-end? 5) Check for runaway programs (CPU loop) using D A,L console command."},code:{title:"SMF Type 30 CPU Report",snippet:`//CPURPT   EXEC PGM=SORT
//SORTIN   DD DSN=MY.SMF.DUMP,DISP=SHR
//SORTOUT  DD SYSOUT=A,
//            DCB=(RECFM=FBA,LRECL=133)
//SYSIN    DD *
  INCLUDE COND=(6,1,BI,EQ,X'1E',&,
               23,1,BI,EQ,X'03')
  SORT FIELDS=(340,4,BI,D)
  OUTFIL HEADER1=(1:C'1',5:C'TOP CPU CONSUMERS',
    50:C'DATE: ',DATE1),
    OUTREC=(1:C' ',
            5:19,8,CH,
            15:C'CPU=',340,4,BI,
            30:C'ELAPSED=',336,4,BI),
    STOPAFT=20
/*`,explanation:"Extract top 20 CPU consumers from SMF Type 30 records. Filter for subtype 3 (step termination) and sort by CPU time descending."},facts:["A busy z/OS system generates 500GB+ of SMF data per day","SMF has recorded mainframe activity continuously since 1972","Over 200 SMF record types exist, covering every subsystem on z/OS"],generatedDate:new Date().toLocaleDateString()},modernization:{tip:{title:"Strangler Fig Pattern for COBOL Modernization",content:`The Strangler Fig pattern is the safest modernization approach. Instead of rewriting everything, you gradually route new functionality to modern services while the COBOL monolith continues handling existing logic.

Use z/OS Connect as the API facade. New features are built as microservices (on OpenShift or cloud). As each function is replicated, traffic is redirected from COBOL to the new service until the original program can be retired.`},scenario:{question:"Leadership wants to expose a 30-year-old CICS/COBOL application as a mobile API. Timeline: 3 months. What's your plan?",answer:"1) Week 1-2: Inventory CICS transactions and map to REST resources. 2) Week 3-4: Install and configure z/OS Connect EE. 3) Week 5-8: Create service definitions mapping JSON to COBOL copybooks. 4) Week 9-10: Build API definitions with OpenAPI specs. 5) Week 11-12: Security (OAuth2), testing, and performance validation. Zero code changes to COBOL."},code:{title:"z/OS Connect Service Mapping",snippet:`// z/OS Connect service.json
{
  "name": "customerService",
  "version": "2.0.0",
  "description": "Customer lookup",
  "connection": {
    "type": "cicsConnection",
    "cicsServer": "CICSPROD",
    "transactionId": "CINQ",
    "commarea": {
      "requestCopybook": "CINQREQ",
      "responseCopybook": "CINQRSP"
    }
  }
}`,explanation:"z/OS Connect maps REST endpoints to CICS transactions. The COBOL copybook structure is automatically converted to/from JSON."},facts:["75% of mainframe rewrite projects fail to meet their objectives","z/OS Connect can expose a CICS transaction as a REST API in under 2 hours","IBM estimates $3 trillion in daily commerce relies on mainframe applications"],generatedDate:new Date().toLocaleDateString()},linuxonz:{tip:{title:"Hardware Crypto Acceleration on Linux on Z",content:`Linux on Z automatically benefits from CPACF (CP Assist for Cryptographic Functions) — hardware encryption built into every Z processor at no additional cost. OpenSSL and libica detect and use it automatically.

For TLS-heavy workloads (HTTPS APIs, encrypted databases), Linux on Z achieves significantly higher throughput than x86 because encryption has zero CPU overhead.`},scenario:{question:"You're consolidating 200 x86 Linux VMs onto a single z15 LPAR. What capacity planning approach do you use?",answer:"1) Measure current x86 workloads (CPU, memory, I/O). 2) Use IBM zPCR (Processor Capacity Reference) to convert x86 metrics to IFL equivalents. 3) Factor in z/VM overhead (~5-10%). 4) Account for memory sharing benefit (CMM can reduce total memory 30-50%). 5) Size for peak + 20% growth. Typically 200 x86 VMs consolidate to 8-12 IFLs."},code:{title:"Check Crypto Hardware on Linux on Z",snippet:`# Check for hardware crypto support
cat /proc/cpuinfo | grep -i 'Machine type'
lsmod | grep -i 'aes\\|sha\\|des'

# Check if OpenSSL uses hardware crypto
openssl speed -evp aes-256-gcm
openssl engine -t
# Should show: ibmca engine available

# Enable hardware crypto if not active
modprobe aes_s390
modprobe sha256_s390
modprobe des_s390`,explanation:"Verify hardware crypto is active. If ibmca engine is loaded, all TLS/encryption operations use zero-overhead hardware acceleration."},facts:["A single IBM z16 can run up to 2 million Linux Docker containers","Linux on Z with z/VM can achieve 10:1 to 20:1 consolidation ratios vs x86","IBM LinuxONE Emperor 4 holds the record for most Linux guests on a single system"],generatedDate:new Date().toLocaleDateString()}};async function ts(d){return Ca[d.id]?Ca[d.id]:{tip:{title:`${d.title} — Pro Tip of the Week`,content:`Explore the ${d.title} sections on this site for in-depth coverage. Each section includes practical examples, code samples, and interview questions to help you master ${d.title} from beginner to professional level.

Stay tuned — new tips and scenarios are added regularly to keep your mainframe skills sharp.`},scenario:{question:`What is the most common performance issue with ${d.title} and how do you diagnose it?`,answer:`Performance issues in ${d.title} typically relate to resource contention, suboptimal configuration, or inefficient code patterns. Use SMF records, RMF reports, and system traces to identify bottlenecks. Check the ${d.title} sections on this site for detailed troubleshooting guides.`},code:{title:`${d.title} Quick Reference`,snippet:`//* See the ${d.title} topic sections
//* for comprehensive code examples
//* covering beginner to expert level`,explanation:`Visit the ${d.title} topic for detailed code examples with explanations.`},facts:[`${d.title} is a critical component of IBM Z enterprise computing`,`Mastering ${d.title} is essential for mainframe professionals`,`This site covers ${d.sections?.length||10}+ sections on ${d.title}`],generatedDate:new Date().toLocaleDateString()}}async function ns(d,T){try{localStorage.setItem("weekly_"+d,JSON.stringify(T)),localStorage.setItem("lastUpdate",new Date().toISOString())}catch{}}async function as(d){try{const T=localStorage.getItem("weekly_"+d);return T?JSON.parse(T):null}catch{return null}}async function os(){try{return localStorage.getItem("lastUpdate")}catch{return null}}function ss(){var d=window.location.hash||"",T=d.includes("access_token")||d.includes("type=signup")||d.includes("type=recovery")||d.includes("error_description"),f=window.location.pathname.split("/").filter(Boolean),A=["home","topics","scenarios","blog","quiz","playground","community","abends","roadmap","weekly","about"],u=["jcl","cobol","cics","db2","vsam","rexx","imsdb","zos","security","tso","smf","ca7","linuxonz","modernization","procs"],L=f[0]==="topics"&&f[1]&&u.indexOf(f[1])>=0?f[1]:null;const O=A,w=u,[m,v]=r.useState(()=>{if(T)return"home";var t=f[0]||"";if(A.indexOf(t)>=0)return t;var n=(d||"").replace("#","");return A.indexOf(n)>=0?n:"home"}),W={jcl:{title:"JCL Tutorial — 86 Lessons | Job Control Language | MainframeStudyHub",desc:"Complete JCL tutorial with 86 lessons. JOB, EXEC, DD statements, procedures, conditional processing, DFSORT utilities, interview Q&A, and cheat sheet. Free."},cobol:{title:"COBOL Tutorial — 60 Lessons | Learn COBOL Programming | MainframeStudyHub",desc:"Learn COBOL programming with 60 lessons. All four divisions, file handling, DB2 integration, CICS, tables, string operations, interview Q&A. Free."},db2:{title:"DB2 Tutorial — SQL, Cursors, Performance | MainframeStudyHub",desc:"DB2 for z/OS tutorial. SQL, cursors, SQLCA, isolation levels, EXPLAIN, RUNSTATS, stored procedures, interview Q&A, and cheat sheet. Free."},cics:{title:"CICS Tutorial — Online Transaction Processing | MainframeStudyHub",desc:"CICS tutorial. Pseudo-conversational programming, BMS maps, file control, TS/TD queues, web services, interview Q&A. Free."},vsam:{title:"VSAM Tutorial — KSDS, ESDS, RRDS, IDCAMS | MainframeStudyHub",desc:"VSAM tutorial. KSDS, ESDS, RRDS, IDCAMS commands, alternate indexes, CI splits, performance tuning, interview Q&A. Free."},rexx:{title:"REXX Tutorial — z/OS Scripting & Automation | MainframeStudyHub",desc:"REXX tutorial for z/OS. EXECIO, OUTTRAP, stem variables, PARSE, TSO interaction, interview Q&A, and cheat sheet. Free."},imsdb:{title:"IMS DB/DC Tutorial — Hierarchical Database | MainframeStudyHub",desc:"IMS tutorial. DL/I calls, PCB/PSB, segments, SSA, status codes, batch and online processing, interview Q&A. Free."},zos:{title:"z/OS Fundamentals Tutorial — IBM Z Operating System | MainframeStudyHub",desc:"z/OS fundamentals. LPAR, TSO/ISPF, JES, catalogs, SMS, WLM, system libraries, interview Q&A, and cheat sheet. Free."},security:{title:"RACF Tutorial — Mainframe Security | MainframeStudyHub",desc:"RACF security tutorial. Users, groups, profiles, access levels, PERMIT, LISTDSD, interview Q&A, and cheat sheet. Free."},tso:{title:"TSO/ISPF Tutorial — Interactive z/OS Access | MainframeStudyHub",desc:"TSO/ISPF tutorial. ISPF options, edit commands, SDSF, dataset management, job submission, interview Q&A. Free."},smf:{title:"SMF & Performance Tutorial — System Metrics | MainframeStudyHub",desc:"SMF and performance tutorial. SMF record types, RMF monitors, WLM, performance tuning, interview Q&A. Free."},ca7:{title:"CA-7 Tutorial — Job Scheduling | MainframeStudyHub",desc:"CA-7 job scheduling tutorial. Predecessors, successors, schedule IDs, job streams, restart procedures. Free."},linuxonz:{title:"Linux on Z Tutorial — IBM Z Linux | MainframeStudyHub",desc:"Linux on Z tutorial. z/VM, LPAR, consolidation, KVM on Z, hybrid architecture, interview Q&A. Free."},modernization:{title:"Mainframe Modernization Tutorial — Zowe, APIs, DevOps | MainframeStudyHub",desc:"Mainframe modernization. Zowe, z/OS Connect, API Mediation Layer, IBM DBB, CI/CD pipelines, interview Q&A. Free."},procs:{title:"DFSORT Tutorial — Sort, ICETOOL, Utilities | MainframeStudyHub",desc:"DFSORT and utilities tutorial. SORT FIELDS, INCLUDE/OMIT, OUTREC, JOINKEYS, ICETOOL, interview Q&A. Free."}},M={home:"MainframeStudyHub — IBM Z Mainframe Learning Platform",topics:"305+ Mainframe Tutorials — JCL, COBOL, DB2, CICS, VSAM | MainframeStudyHub",quiz:"200+ Mainframe Quiz Questions — Daily Challenges | MainframeStudyHub",scenarios:"52 Real-World Mainframe Scenarios | MainframeStudyHub",community:"Mainframe Developer Community — Chat & Q&A | MainframeStudyHub",blog:"Mainframe Expert Blog — Articles & Insights | MainframeStudyHub",abends:"87 IBM Abend Codes — Instant Lookup & Fixes | MainframeStudyHub",roadmap:"Mainframe Career Roadmap — Trainee to Architect | MainframeStudyHub",weekly:"Weekly Mainframe Updates | MainframeStudyHub",playground:"AI Code Lab — JCL/COBOL Explainer & Simulator | MainframeStudyHub",about:"About MainframeStudyHub — Built by Harikrishnan K"},E={home:"MainframeStudyHub — Free IBM Z mainframe learning platform. 305+ lessons across 15 topics. AI Code Lab, 200+ quizzes, interview Q&A, cheat sheets.",topics:"305+ mainframe tutorials: JCL (86 lessons), COBOL (60 lessons), DB2, CICS, VSAM, REXX, IMS, z/OS, RACF, TSO, SMF, DFSORT. Beginner to Expert. Free.",quiz:"200+ mainframe quiz questions with daily challenges, streak tracking, and topic filtering. Test your JCL, COBOL, DB2, CICS knowledge.",scenarios:"52 real-world mainframe scenarios across 13 categories and 4 difficulty levels. Practice production problem solving.",abends:"87 IBM abend codes with instant lookup, severity levels, root causes, and fix guides. S0C7, S806, SB37, and more.",playground:"AI-powered Code Lab — explain, debug, and simulate JCL, COBOL, REXX, and SQL code. Powered by Claude AI.",community:"Join the mainframe developer community. Live WhatsApp-style chat and Stack Overflow-style Q&A forum.",blog:"Expert mainframe blog with articles and insights from mainframe professionals worldwide.",roadmap:"6-level mainframe career roadmap from Trainee to Architect. Skills, certifications, and timeline guidance.",weekly:"Weekly mainframe content updates across all 15 topics. Stay current with the latest tutorials and tips.",about:"MainframeStudyHub — Built by Harikrishnan K, Mainframe Developer. Free platform for the mainframe community."};r.useEffect(()=>{if(T)return;let t;m==="topics"&&p?t="/topics/"+p.id:m==="home"?t="/":t="/"+m,window.location.pathname!==t&&window.history.pushState(null,"",t),m==="topics"&&p&&W[p.id]?document.title=W[p.id].title:document.title=M[m]||M.home;const n=document.querySelector('link[rel="canonical"]');n&&(n.href="https://mainframestudyhub.com"+t);const o=document.querySelector('meta[name="description"]');o&&(m==="topics"&&p&&W[p.id]?o.content=W[p.id].desc:o.content=E[m]||E.home)},[m,p]),r.useEffect(()=>{const t=()=>{const n=window.location.hash;if(n&&(n.includes("access_token")||n.includes("type=signup")||n.includes("type=recovery")))return;const o=window.location.pathname.split("/").filter(Boolean),s=o[0]||"home",a=o[0]==="topics"?o[1]:null,l=O.includes(s)?s:"home";if(l!==m&&v(l),l==="topics"&&a&&w.includes(a)){const C=y.find(R=>R.id===a);C&&(B(C),Z(0))}else l==="topics"&&B(null)};return window.addEventListener("popstate",t),()=>window.removeEventListener("popstate",t)},[m]);const[U,z]=r.useState(!1);r.useEffect(()=>{if(typeof window>"u"||window.innerWidth<=768)return;let t=!1;const n=()=>{t||(t=!0,z(!0))},o=setTimeout(n,6e3),s=()=>{n(),window.removeEventListener("scroll",s)};return window.addEventListener("scroll",s,{passive:!0}),()=>{clearTimeout(o),window.removeEventListener("scroll",s)}},[]),r.useEffect(()=>{const t=()=>ya(window.innerWidth<900);return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const[p,B]=r.useState(null);r.useEffect(()=>{if(L&&!p){const t=y.find(n=>n.id===L);t&&(B(t),Z(0))}},[]);const[D,Z]=r.useState(0),[It,At]=r.useState(!1),[je,Rt]=r.useState({}),[P,le]=r.useState({index:0,score:0,selected:null,done:!1,showExp:!1}),[Ae,Da]=r.useState("All"),[c,ne]=r.useState(null),sn=Ae==="All"?De:De.filter(t=>t.topic===Ae),Ia=["All",...Array.from(new Set(De.map(t=>t.topic)))],[$,Ot]=r.useState(!1),[ze,rn]=r.useState(0),ht=r.useRef(null),Aa=()=>{const t=new Date().toISOString().slice(0,10);let n=0;for(let s=0;s<t.length;s++)n=(n<<5)-n+t.charCodeAt(s),n=n&n;const o=[...De];for(let s=o.length-1;s>0;s--){n=n*1664525+1013904223&2147483647;const a=n%(s+1);[o[s],o[a]]=[o[a],o[s]]}return o.slice(0,5)},[ln]=r.useState(Aa),Je="mfsh_daily_"+new Date().toISOString().slice(0,10),[se,gt]=r.useState(null);r.useEffect(()=>{(async()=>{try{if(c){const{data:n}=await g.from("user_data").select("value").eq("user_id",c.id).eq("key",Je).maybeSingle();if(n?.value){gt(n.value);return}}}catch{}try{const n=localStorage.getItem(Je);n&&gt(JSON.parse(n))}catch{}})()},[c]);const Ra=()=>{Ot(!0),le({index:0,score:0,selected:null,done:!1,showExp:!1}),rn(0),ht.current=setInterval(()=>rn(t=>t+1),1e3)},Oa=async t=>{clearInterval(ht.current);const n={score:t,total:5,time:ze,date:new Date().toISOString().slice(0,10)};gt(n);try{localStorage.setItem(Je,JSON.stringify(n))}catch{}const o=new Date(Date.now()-864e5).toISOString().slice(0,10);let s={count:0,lastDate:""};if(c)try{const{data:C}=await g.from("user_data").select("value").eq("user_id",c.id).eq("key","streak").maybeSingle();C?.value&&(s=C.value)}catch{}else try{s=JSON.parse(localStorage.getItem("mfsh_streak")||'{"count":0,"lastDate":""}')}catch{}const l={count:s.lastDate===o?s.count+1:1,lastDate:n.date};try{localStorage.setItem("mfsh_streak",JSON.stringify(l))}catch{}c&&(await g.from("user_data").upsert({user_id:c.id,key:Je,value:n},{onConflict:"user_id,key"}).catch(()=>{}),await g.from("user_data").upsert({user_id:c.id,key:"streak",value:l},{onConflict:"user_id,key"}).catch(()=>{}))},Ke=()=>{try{const t=JSON.parse(localStorage.getItem("mfsh_streak")||'{"count":0}'),n=new Date().toISOString().slice(0,10);return t.lastDate===n?t.count:0}catch{return 0}},[Qe,ha]=r.useState(""),[be,ga]=r.useState("All"),[qe,ft]=r.useState(null),Lt=la.filter(t=>{const n=be==="All"||t.category===be,o=!Qe||t.code.toLowerCase().includes(Qe.toLowerCase())||t.name.toLowerCase().includes(Qe.toLowerCase());return n&&o}),[Re,fa]=r.useState(null),[Pt,La]=r.useState(""),[Ze,Pa]=r.useState("all"),[Ue,Oe]=r.useState(!1),[cn,Na]=r.useState(!1),[rs,ya]=r.useState(typeof window<"u"?window.innerWidth<900:!1),[_e,Ma]=r.useState("All"),[$e,ba]=r.useState("All"),[Nt,Sn]=r.useState(null),[dn,yt]=r.useState(null),[Mt,bt]=r.useState(!1),[H,Ut]=r.useState(null),[ie,Ua]=r.useState(null),[xt,vt]=r.useState(null),[En,pn]=r.useState(null),[he,Cn]=r.useState("tip"),[Y,N]=r.useState(null),[h,x]=r.useState({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}),[un,I]=r.useState(""),[J,F]=r.useState(!1),xe=async t=>{try{const{data:n,error:o}=await g.from("profiles").select("*").eq("id",t).single();return o||!n?null:{id:n.id,name:n.name||"User",email:n.email||"",role:n.role||"Mainframe Professional",itYears:String(n.it_years||0),mfYears:String(n.mf_years||0),joinDate:n.join_date||new Date().toISOString().slice(0,10),avatar:(n.avatar||n.name?.charAt(0)||"U").toUpperCase()}}catch{return null}},ge=t=>{const n=t.user_metadata||{},o=n.name||t.email?.split("@")[0]||"User";return{id:t.id,name:o,email:t.email,role:n.role||"Mainframe Professional",itYears:String(n.it_years||0),mfYears:String(n.mf_years||0),joinDate:new Date().toISOString().slice(0,10),avatar:o.charAt(0).toUpperCase()}};r.useEffect(()=>{const t=window.location.hash;t&&(t.includes("access_token")||t.includes("type=signup")||t.includes("type=recovery"))?(async()=>{await new Promise(a=>setTimeout(a,600));try{const{data:{session:a}}=await g.auth.getSession();if(a?.user)try{const l=await xe(a.user.id);ne(l||ge(a.user))}catch{ne(ge(a.user))}}catch{}window.history.replaceState&&window.history.replaceState(null,"",window.location.pathname)})():g.auth.getSession().then(async({data:{session:s}})=>{if(s?.user)try{const a=await xe(s.user.id);ne(a||ge(s.user))}catch{ne(ge(s.user))}}).catch(()=>{});const{data:{subscription:o}}=g.auth.onAuthStateChange(async(s,a)=>{if((s==="SIGNED_IN"||s==="TOKEN_REFRESHED")&&a?.user)try{const l=await xe(a.user.id);ne(l||ge(a.user))}catch{ne(ge(a.user))}else s==="SIGNED_OUT"&&ne(null)});return()=>o.unsubscribe()},[]);const mn=async()=>{if(I(""),!h.name.trim()||!h.email.trim()||!h.password.trim()){I("Name, email, and password are required.");return}if(h.password.length<6){I("Password must be at least 6 characters.");return}F(!0);const t=setTimeout(()=>{F(!1),I("Request timed out. Please check your internet and try again.")},3e4);try{const{data:n,error:o}=await g.auth.signUp({email:h.email.trim().toLowerCase(),password:h.password,options:{data:{name:h.name.trim(),role:h.role.trim()||"Mainframe Professional",it_years:parseInt(h.itYears)||0,mf_years:parseInt(h.mfYears)||0,avatar:h.name.trim().charAt(0).toUpperCase()},emailRedirectTo:(window.location.hostname==="localhost"?window.location.origin:"https://mainframestudyhub.com")+"/confirm.html"}});if(o){clearTimeout(t);const s=o.message||"";s.includes("already registered")||s.includes("already exists")?I("This email is already registered. Try signing in instead."):s.includes("rate limit")?I("Too many attempts. Please wait a minute and try again."):s.includes("password")?I("Password must be at least 6 characters."):I(s),F(!1);return}if(n.user&&!n.session&&!n.user.identities?.length){I("This email is already registered. Try signing in instead."),F(!1);return}if(n.user)if(n.session){const s=h.name.trim(),a={id:n.user.id,name:s,email:n.user.email,role:h.role.trim()||"Mainframe Professional",itYears:h.itYears||"0",mfYears:h.mfYears||"0",joinDate:new Date().toISOString().slice(0,10),avatar:s.charAt(0).toUpperCase()};setTimeout(async()=>{try{await g.from("profiles").upsert({id:n.user.id,name:a.name,email:a.email,role:a.role,it_years:parseInt(h.itYears)||0,mf_years:parseInt(h.mfYears)||0,avatar:a.avatar},{onConflict:"id"})}catch{}},500),ne(a),N(null),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""})}else I(""),N(null),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}),alert("Account created! Please check your email to confirm your account, then sign in.")}catch(n){clearTimeout(t),I(n.message||"Something went wrong.")}clearTimeout(t),F(!1)},Tn=async()=>{if(I(""),!h.email.trim()||!h.password.trim()){I("Email and password are required.");return}F(!0);const t=setTimeout(()=>{F(!1),I("Request timed out. Please check your internet and try again.")},3e4);try{const{data:n,error:o}=await g.auth.signInWithPassword({email:h.email.trim().toLowerCase(),password:h.password});if(clearTimeout(t),o){const s=o.message||"";s.includes("Email not confirmed")?I("Please check your email inbox (and spam) for the confirmation link. Click it first, then sign in."):s.includes("Invalid login")?I("Invalid email or password. Please try again or sign up for a new account."):s.includes("rate limit")||s.includes("too many")?I("Too many attempts. Please wait a minute and try again."):I(s||"Sign in failed. Please try again."),F(!1);return}if(n.user){let s=null;try{s=await xe(n.user.id)}catch{}if(!s){const a=n.user.user_metadata||{},l=a.name||n.user.email?.split("@")[0]||"User";s={id:n.user.id,name:l,email:n.user.email,role:a.role||"Mainframe Professional",itYears:String(a.it_years||0),mfYears:String(a.mf_years||0),joinDate:new Date().toISOString().slice(0,10),avatar:l.charAt(0).toUpperCase()},g.from("profiles").upsert({id:n.user.id,name:s.name,email:s.email,role:s.role,it_years:0,mf_years:0,avatar:s.avatar},{onConflict:"id"}).catch(()=>{})}ne(s),N(null),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""})}}catch(n){clearTimeout(t),I(n.message||"Connection error. Please check your internet and try again.")}F(!1)},Dn=async()=>{await g.auth.signOut(),ne(null)},xa=async()=>{I(""),F(!0);try{const{error:t}=await g.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.hostname==="localhost"?window.location.origin:"https://mainframestudyhub.com"}});t&&(I(t.message||"Google sign-in failed. Please try again."),F(!1))}catch(t){I(t.message||"Google sign-in failed. Please check your connection."),F(!1)}},va=async()=>{if(I(""),!h.email.trim()){I("Please enter your email address first.");return}F(!0);try{const{error:t}=await g.auth.resetPasswordForEmail(h.email.trim().toLowerCase(),{redirectTo:(window.location.hostname==="localhost"?window.location.origin:"https://mainframestudyhub.com")+"/reset-password.html"});t?I(t.message):(I(""),N("forgot-sent"))}catch(t){I(t.message||"Something went wrong.")}F(!1)},[Ba,et]=r.useState(!1),[K,ve]=r.useState({name:"",role:"",itYears:"",mfYears:""}),Fa=()=>{c&&(ve({name:c.name||"",role:c.role||"",itYears:c.itYears||"0",mfYears:c.mfYears||"0"}),et(!0),N(null))},wa=async()=>{if(!(!c||!K.name.trim())){F(!0);try{const{error:t}=await g.from("profiles").update({name:K.name.trim(),role:K.role.trim()||"Mainframe Professional",it_years:parseInt(K.itYears)||0,mf_years:parseInt(K.mfYears)||0,avatar:K.name.trim().charAt(0).toUpperCase()}).eq("id",c.id);if(t)I(t.message);else{const n=await xe(c.id);ne(n),et(!1)}}catch(t){I(t.message)}F(!1)}},[Ya,tt]=r.useState(!1),[Bt,Ft]=r.useState(""),[nt,ce]=r.useState(""),In=async()=>{if(ce(""),Bt.length<6){ce("Password must be at least 6 characters.");return}F(!0);try{const{error:t}=await g.auth.updateUser({password:Bt});t?ce(t.message):(ce("✅ Password updated successfully!"),Ft(""),setTimeout(()=>{tt(!1),ce("")},1500))}catch(t){ce(t.message)}F(!1)},An=["Mainframe Developer","Systems Programmer","DB2 DBA","CICS Administrator","Storage Admin","Security Admin","Network Engineer","Operations/Batch","DevOps Engineer","Manager/Lead","Student/Intern","Career Changer","Other"],[Rn,On]=r.useState(!1),[X,hn]=r.useState(!1),[Be,at]=r.useState([{role:"assistant",content:`Hey! 👋 I'm the **MainframeStudyHub AI** — think of me as your personal mainframe expert, always here to help.

I can help with:
• **Coding** — JCL, COBOL, REXX, DB2 SQL, CICS commands
• **Debugging** — Explain any abend (S0C7, S0C4, S878...)
• **Learning** — Tutorials from beginner to architect level
• **Career** — Interview prep, salary info, learning paths
• **Modernization** — Zowe, APIs, DevOps on mainframe

Just ask me anything — I'll give you real answers with code examples, not generic fluff. Try something like *"How do I fix an S0C7?"* or *"Write JCL to sort a file"*`}]),[Se,wt]=r.useState(""),[Yt,gn]=r.useState(!1),fn=r.useRef(null);r.useEffect(()=>{fn.current?.scrollIntoView({behavior:"smooth"})},[Be]);const ka=`You are MainframeStudyHub AI — a world-class IBM Z mainframe engineer and educator, similar to how ChatGPT or Claude works but specialized in mainframes. You have deep expertise across the entire IBM Z ecosystem:

Core: JCL, COBOL, REXX, Assembler, CLIST, PL/I
Data: VSAM, DB2 for z/OS, IMS DB/DC, QSAM, BSAM
Online: CICS Transaction Server, IMS/TM, MQ Series
System: z/OS internals, USS, TSO/ISPF, SDSF, WLM, RMF, SMF
Security: RACF, Top Secret, ACF2
Utilities: DFSORT, ICETOOL, IDCAMS, SMP/E, IEBGENER, IEBCOPY
Scheduling: CA7, TWS, AutoSys, Control-M
Modern: Zowe, z/OS Connect EE, DevOps, Git on z/OS, APIs, Python on z/OS
Infrastructure: Linux on Z, OpenShift on Z, z/VM, PR/SM
Career: Interview prep, salary guidance, learning paths, certifications

Behavior guidelines:
- Be conversational and natural — respond like a knowledgeable colleague chatting, not a textbook
- Answer ANY question a user asks — including general tech, career advice, coding help, and life questions — but naturally weave in mainframe expertise when relevant
- For mainframe questions: include code snippets (JCL, COBOL, REXX, SQL), abend explanations, and practical examples
- Use markdown formatting: **bold** for emphasis, \`inline code\`, code blocks with \`\`\`, bullet points
- When explaining errors or abends, give the cause AND the fix with concrete steps
- Be encouraging to beginners, technically precise for experts
- Keep initial responses focused but expand if the user asks for more detail
- Remember the full conversation context and refer back to earlier messages naturally
- If you're unsure about something, say so honestly rather than making things up
- For interview questions, give thorough real-world answers
- Vary your response length — short for simple questions, detailed for complex ones`,Fe=r.useRef(null),Ga=async t=>{const n=await fetch("/.netlify/functions/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system:ka,messages:t.slice(-20)})});if(!n.ok)throw new Error("API error "+n.status);const o=await n.json();if(o.error)throw new Error(o.error);if(o.content?.[0]?.text)return o.content[0].text;throw new Error("No response")},Ln=async()=>{if(!Se.trim()||Yt)return;const t=Se.trim();wt("");const n=[...Be,{role:"user",content:t}];at(n),gn(!0);let o="";try{const R=n.filter((b,ye)=>ye>0).map(b=>({role:b.role,content:b.content}));o=await Ga(R)}catch{o=Wa(t)}gn(!1),at(R=>[...R,{role:"assistant",content:""}]);const s=o.split(/(\s+)/);let a="",l=0;const C=Math.max(8,Math.min(25,3e3/s.length));Fe.current&&clearInterval(Fe.current),Fe.current=setInterval(()=>{if(l>=s.length){clearInterval(Fe.current),Fe.current=null;return}a+=s[l],l++,at(R=>{const b=[...R];return b[b.length-1]={role:"assistant",content:a},b})},C)},Wa=t=>{const n=t.toLowerCase().trim(),o=n.match(/s0c[0-9a-f]|s[0-9]{3}|sb37|sd37|se37|s[0-9a-f]{3}|asra|asrb|aey[0-9a-z]|aei[a-z]|aeq|aexl|atsp|aall|abmb|akcs|00c9|04[ef]|047|071|u[0-9]{4}|jcl\s*err/i);if(o){const l=o[0].toUpperCase().replace(/\s/g,""),C=la.find(R=>R.code.toUpperCase()===l||R.code.toUpperCase().replace("-","")===l);if(C)return`**${C.code} — ${C.name}** (${C.category} | Severity: ${C.severity})

**⚠️ Cause:**
${C.cause}

**✅ Fix:**
${C.fix}

${C.tips?.length?`**💡 Tips:**
`+C.tips.map(R=>"• "+R).join(`
`):""}`}const s=[{keys:["deadlock","dead lock","lock contention","lock timeout","sqlcode -911","sqlcode -913","00c9"],answer:`**How to Clear/Resolve Deadlocks in Mainframe:**

A deadlock occurs when two or more tasks each hold a lock that the other needs.

**In DB2:**
• SQLCODE -911 = timeout, SQLCODE -913 = deadlock (DB2 chose a victim)
• Fix: Ensure consistent lock ordering across programs
• Use \`COMMIT\` frequently to release locks sooner
• Increase \`IRLMRWT\` (lock timeout) parameter
• Use \`ISOLATION(UR)\` for read-only queries when dirty reads are acceptable
• Run \`DISPLAY THREAD\` to identify blocking threads

**In CICS:**
• AEYB abend = deadlock timeout
• Check VSAM file string waits with \`CEMT I FILE\`
• Check DB2 thread waits
• Increase \`DTIMOUT\` in transaction definition

**In IMS:**
• PCB status AI = deadlock detected
• Review DL/I call sequence for lock ordering

**Prevention Best Practices:**
1. Always access tables/files in the same order across all programs
2. Keep transactions short — \`COMMIT\` early and often
3. Avoid \`SELECT *\` — lock only what you need
4. Use appropriate \`ISOLATION\` level
5. Schedule conflicting batch jobs sequentially, not in parallel`},{keys:["jcl basic","jcl tutorial","what is jcl","jcl explain","learn jcl","jcl beginner"],answer:`**JCL (Job Control Language) Basics:**

JCL tells z/OS what program to run, what files to use, and where to put the output.

**Three main statements:**
• \`JOB\` — identifies the job (name, accounting, class)
• \`EXEC\` — specifies the program to run (\`PGM=\`) or PROC
• \`DD\` — defines datasets (input/output files)

**Example:**
\`\`\`
//MYJOB  JOB (ACCT),'MY JOB',CLASS=A,MSGCLASS=X
//STEP1  EXEC PGM=IEBGENER
//SYSUT1 DD DSN=MY.INPUT.FILE,DISP=SHR
//SYSUT2 DD DSN=MY.OUTPUT.FILE,DISP=(NEW,CATLG),
//          SPACE=(CYL,(10,5)),UNIT=SYSDA
//SYSPRINT DD SYSOUT=*
//SYSIN  DD DUMMY
\`\`\`

**Key parameters:**
• \`DISP=(status,normal,abnormal)\` — OLD/SHR/NEW/MOD
• \`SPACE=(unit,(primary,secondary))\` — CYL/TRK/bytes
• \`DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)\``},{keys:["cobol comp","comp-3","packed decimal","comp vs comp-3","binary cobol","computational"],answer:`**COBOL COMP Types Explained:**

• **COMP (COMP-4/BINARY):** Pure binary. PIC 9(4) COMP = 2 bytes (halfword), PIC 9(9) COMP = 4 bytes (fullword), PIC 9(18) COMP = 8 bytes (doubleword)

• **COMP-3 (PACKED-DECIMAL):** Each digit takes half a byte + 1 nibble for sign. PIC 9(7) COMP-3 = 4 bytes. Formula: (digits+1)/2 rounded up

• **COMP-1:** Single-precision float (4 bytes). Rarely used in business
• **COMP-2:** Double-precision float (8 bytes). Rarely used in business

**When to use:**
• COMP-3 for money/arithmetic (most common in business COBOL)
• COMP for subscripts, counters, and indexes
• DISPLAY (default) for fields that need to be readable in dumps

**S0C7 Connection:** If a COMP-3 field contains spaces (X'40') instead of packed digits, any arithmetic on it causes S0C7. Always INITIALIZE before use.`},{keys:["vsam","ksds","esds","rrds","vsam type","vsam explain"],answer:`**VSAM File Types:**

• **KSDS (Key-Sequenced):** Records accessed by a key field. Like a DB table with a primary key. Most common type. Supports random and sequential access.

• **ESDS (Entry-Sequenced):** Records stored in insertion order. Like a log file. No key — accessed by RBA (Relative Byte Address). Good for sequential processing.

• **RRDS (Relative Record):** Records accessed by relative record number (slot number). Like an array. Fixed slots — can have empty slots.

• **LDS (Linear):** Raw byte stream. Used by DB2 for tablespaces.

**Key Concepts:**
• CI (Control Interval) = smallest I/O unit
• CA (Control Area) = group of CIs
• CI/CA splits degrade performance — use FREESPACE and schedule REORGs
• SHAREOPTIONS control multi-job access
• Use \`IDCAMS LISTCAT ALL\` to check health`},{keys:["cics","what is cics","cics basic","cics explain","cics transaction"],answer:`**CICS (Customer Information Control System):**

CICS is IBM's online transaction processing (OLTP) system. It manages thousands of concurrent users accessing mainframe programs in real-time.

**Key concepts:**
• **Pseudo-conversational:** Program ends after each screen send, restarts when user responds. Saves resources.
• **COMMAREA:** Data passed between program invocations (max 32KB). Use channels/containers for larger data.
• **BMS Maps:** Define screen layouts (like HTML forms)
• **EXEC CICS commands:** SEND MAP, RECEIVE MAP, READ FILE, LINK, XCTL, RETURN

**Debugging:**
• CEDF = interactive debugger (step through EXEC CICS commands)
• ASRA = program check (equivalent of S0C7/S0C4 in batch)
• CEMT = master terminal commands for administration

**Common commands:**
• \`CEMT I TRANS\` — view transaction status
• \`CEMT SET PROG(name) NEWCOPY\` — refresh after recompile
• \`CEMT I FILE\` — view file status`},{keys:["db2 sql","sqlcode","sql error","db2 error","sqlcode -805","sqlcode -818","db2 explain"],answer:`**Common DB2 SQLCODEs:**

• **SQLCODE 0** = Success
• **SQLCODE 100** = Row not found (normal for end of cursor)
• **SQLCODE -805** = DBRM/package not found. Run BIND/REBIND.
• **SQLCODE -811** = SELECT returned more than one row. Use cursor or add WHERE.
• **SQLCODE -818** = Plan/program timestamp mismatch. REBIND the plan.
• **SQLCODE -904** = Resource unavailable. Check if object is stopped.
• **SQLCODE -911** = Lock timeout. Another job holds the lock.
• **SQLCODE -913** = Deadlock. DB2 killed your transaction.
• **SQLCODE -551** = Authorization failure. GRANT needed.

**Performance Tips:**
1. Run RUNSTATS after data loads — optimizer needs fresh statistics
2. EXPLAIN your SQL — check for tablespace scans
3. Use appropriate ISOLATION level
4. COMMIT frequently in batch to release locks`},{keys:["sort","dfsort","icetool","sort jcl","sort example","syncsort"],answer:"**DFSORT Quick Reference:**\n\n**Basic sort:**\n```\n//SORT EXEC PGM=SORT\n//SORTIN  DD DSN=MY.INPUT,DISP=SHR\n//SORTOUT DD DSN=MY.OUTPUT,DISP=(,CATLG)\n//SYSIN   DD *\n  SORT FIELDS=(1,10,CH,A)\n/*\n```\n\n**Key operations:**\n• `SORT FIELDS=(pos,len,format,order)` — A=ascending, D=descending\n• `INCLUDE COND=(1,3,CH,EQ,C'ABC')` — filter records\n• `OMIT COND=` — exclude records\n• `INREC` — reformat input before sort\n• `OUTREC` — reformat output after sort\n• `OUTFIL` — multiple output files from one sort\n• `OPTION COPY` — copy without sorting\n\n**ICETOOL (multi-step):**\n• `SPLICE` — join two files by key\n• `DISPLAY` — formatted reports\n• `STATS` — min/max/avg/count statistics"},{keys:["interview","interview question","interview prep","mainframe interview"],answer:`**Top Mainframe Interview Questions:**

**JCL:**
1. What's the difference between DISP=OLD, SHR, and MOD?
2. Explain COND parameter vs IF/THEN/ELSE
3. What happens if secondary space runs out?

**COBOL:**
1. Difference between COMP, COMP-3, and DISPLAY?
2. What causes S0C7? How do you debug it?
3. Explain PERFORM VARYING vs PERFORM UNTIL

**DB2:**
1. What is SQLCODE -805 and how to fix it?
2. When do you run RUNSTATS and why?
3. Explain DB2 isolation levels

**CICS:**
1. What is pseudo-conversational programming?
2. How to debug ASRA abend?
3. LINK vs XCTL — when to use which?

**Tips:**
• Know your abend codes (S0C7, S0C4, S878, SB37)
• Be ready to explain a production issue you resolved
• Understand batch vs online processing
• Practice JCL debugging scenarios`},{keys:["racf","security","racf permit","racf profile","access control"],answer:`**RACF Security Basics:**

**Key commands:**
• \`PERMIT 'dataset' ID(userid) ACCESS(READ)\` — grant access
• \`RLIST DATASET 'dsn' ALL\` — view profile details
• \`SEARCH CLASS(USER)\` — list users
• \`ALTUSER userid PASSWORD(newpass)\` — reset password
• \`CONNECT userid GROUP(grpname)\` — add to group

**Access levels (low to high):**
NONE → EXECUTE → READ → UPDATE → CONTROL → ALTER

**Common issues:**
• **ICH408I** message = access denied. Check the profile and PERMIT.
• **S913 abend** = RACF denied dataset access
• **UACC(NONE)** = no default access, must be explicitly PERMITted

**SPECIAL attribute** = full RACF admin. Limit to 3-5 people max.`},{keys:["rexx","rexx script","rexx example","rexx tutorial","tso rexx"],answer:"**REXX Scripting on z/OS:**\n\n**Basic example:**\n```\n/* REXX - Hello World */\nSAY 'Hello from z/OS!'\nPARSE ARG INPUT_NAME\nIF INPUT_NAME = '' THEN\n  SAY 'No name provided'\nELSE\n  SAY 'Hello,' INPUT_NAME\nEXIT 0\n```\n\n**Key functions:**\n• `SYSDSN(dsname)` — check if dataset exists\n• `OUTTRAP(var)` — capture command output into stem variable\n• `EXECIO` — read/write files from REXX\n• `ADDRESS TSO` — run TSO commands\n• `ADDRESS ISPEXEC` — run ISPF services\n\n**Common patterns:**\n• Parse arguments: `PARSE ARG var1 var2`\n• Loops: `DO i = 1 TO 10 ... END`\n• Stem variables: `name.1 = 'John'`, `name.0 = count`"},{keys:["moderniz","zowe","z/os connect","api","rest api","devops mainframe","cloud mainframe"],answer:`**Mainframe Modernization Overview:**

**z/OS Connect EE:**
Exposes CICS/IMS/batch programs as REST/JSON APIs without changing COBOL code. Maps JSON ↔ copybook automatically.

**Zowe:**
Open-source framework for modern mainframe interaction:
• Zowe CLI — command-line access to z/OS from your laptop
• Zowe Explorer — VS Code extension for mainframe development
• Zowe API Mediation Layer — unified API gateway

**Strangler Fig Pattern:**
The safest modernization approach:
1. Put an API layer in front of existing COBOL
2. Build new features as microservices
3. Gradually route traffic from old → new
4. Retire COBOL modules when fully replaced

**Key principle:** 75% of rewrite projects fail. Modernize incrementally, don't rewrite.`},{keys:["performance","tuning","slow","optimize","cpu","response time"],answer:`**Mainframe Performance Tuning:**

**DB2:**
1. Run \`RUNSTATS\` — stale stats = bad access paths
2. \`EXPLAIN\` your SQL — look for tablespace scans
3. Check \`CLUSTERRATIO\` — below 80% means REORG needed
4. Use appropriate index for WHERE clause columns

**COBOL:**
1. Use \`COMP-3\` for arithmetic (faster than DISPLAY)
2. Binary search (\`SEARCH ALL\`) instead of serial SEARCH
3. \`PERFORM VARYING\` with inline code vs paragraph CALL
4. Minimize I/O — buffer records, process in blocks

**CICS:**
1. Keep transactions short (pseudo-conversational)
2. Avoid file string waits — check \`STRINGS\` parameter
3. Use \`READNEXT\` instead of repeated \`READ\` for sequential access

**Batch:**
1. Increase \`BUFNO\` for sequential files
2. Use \`REGION=0M\` for maximum storage
3. DFSORT is 10-100x faster than COBOL for file processing
4. Use checkpoint/restart for long-running jobs`},{keys:["career","salary","job","future","mainframe future","mainframe career","mainframe job"],answer:`**Mainframe Career Guide:**

**Current market:**
• Average mainframe developer salary: $85K-$130K (US)
• Severe talent shortage — 60% of mainframe workforce retiring by 2030
• Growing demand as banks/insurers can't replace mainframe systems

**Career path:**
1. **Trainee** (0-1 yr): TSO/ISPF, JCL, basic COBOL
2. **Junior** (1-3 yr): VSAM, DB2, production support
3. **Developer** (3-5 yr): CICS, IMS, complex batch
4. **Senior** (5-8 yr): Performance tuning, mentoring
5. **Lead/Architect** (8+ yr): Modernization, strategy

**Top skills in demand:**
• COBOL + DB2 + CICS (core combination)
• z/OS Connect + REST APIs (modernization)
• DevOps for mainframe (Zowe, Git, Jenkins)
• Cloud integration (AWS/Azure + mainframe)

Check our **Learning Roadmap** page for a detailed skill path!`},{keys:["ispf","tso","ispf command","tso command","sdsf","navigate"],answer:"**TSO/ISPF Quick Reference:**\n\n**Key ISPF panels:**\n• **3.4** — Dataset list (most used!). Enter HLQ to browse datasets.\n• **3.14** — Search-For. Find strings across PDS members.\n• **2** — Edit. Open a dataset for editing.\n• **3.1** — Library utility\n• **6** — Command entry\n\n**Edit commands:**\n• `C 'old' 'new' ALL` — change all occurrences\n• `F 'text'` — find text\n• `COPY` / `MOVE` — copy/move lines\n• Line commands: `I` (insert), `D` (delete), `R` (repeat), `C`/`M` (copy/move)\n\n**SDSF:**\n• `ST` — view job status\n• `DA` — active jobs\n• `H` — held output\n• `LOG` — system log\n• `PREFIX *` — show all jobs (not just yours)"},{keys:["s0c7","data exception","non numeric","invalid data","0c7"],answer:`**S0C7 — Data Exception (The #1 Mainframe Debug Question):**

**What happened:** Your program tried to do arithmetic on a field that contains non-numeric data (spaces, low-values, garbage).

**Most common causes:**
1. **Uninitialized COMP-3/packed field** — has spaces (X'40') instead of packed zeros (X'0C')
2. **Wrong record layout** — reading a different record type with the wrong copybook
3. **File not found / empty read** — READ returned spaces but you didn't check FILE STATUS
4. **REDEFINES issue** — two fields share the same memory, one has text, you're treating it as numeric

**How to fix:**
1. \`DISPLAY\` the field right before the failing statement
2. \`INITIALIZE\` all group items in WORKING-STORAGE
3. Always check \`FILE STATUS\` after READ
4. Use \`IF field IS NUMERIC\` before arithmetic
5. Compile with \`LIST\` option — the offset in the dump maps to a line in the listing

**Pro tip:** Hex \`F0-F9\` = valid zoned decimal. Hex \`0C, 1C...9C\` = valid positive packed. \`X'40'\` = space = S0C7 guaranteed.`}];for(const l of s)if(l.keys.filter(R=>n.includes(R)).length>0)return l.answer;const a=[];if(y.forEach(l=>{l.sections?.forEach(C=>{const R=((C.content||"")+" "+(C.code||"")).toLowerCase(),b=(C.title||"").toLowerCase(),ye=n.split(/\s+/).filter(Te=>Te.length>2),Me=ye.filter(Te=>b.includes(Te)).length*3,Ct=ye.filter(Te=>R.includes(Te)).length,He=Me+Ct;He>=2&&a.push({topic:l.title,section:C.title,content:C.content||C.code||"",score:He})})}),a.sort((l,C)=>C.score-l.score),a.length>0){const l=a[0],C=l.content.split(`

`),R=n.split(/\s+/).filter(Me=>Me.length>2),ye=C.reduce((Me,Ct)=>{const He=R.filter(Te=>Ct.toLowerCase().includes(Te)).length;return He>Me.score?{text:Ct,score:He}:Me},{text:C[0],score:0}).text.substring(0,500).trim();return`**${l.topic} → ${l.section}:**

${ye}

💡 *Visit the **${l.topic}** topic for complete details and code examples.*`}return`Great question! I can help with IBM mainframe topics including:

• **JCL, COBOL, REXX** — syntax, debugging, best practices
• **DB2, CICS, IMS** — SQL, transactions, database programming
• **VSAM, RACF, TSO/ISPF** — files, security, navigation
• **Abend codes** — S0C7, S0C4, S878, ASRA, and 87 more
• **Career & interview prep**

Try asking:
• "How to clear deadlock in DB2?"
• "What is S0C7 and how to fix it?"
• "Explain CICS pseudo-conversational"
• "DFSORT INCLUDE example"
• "Mainframe career path"`},kt=t=>{if(!t)return"";let n=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const o=[],s=(a,l,C)=>{const R=o.length;return o.push(`<span style="color:${l}${C?";font-weight:700":""}">${a}</span>`),`«${R}»`};n=n.replace(/(\/\/\*.*)/g,a=>s(a,"#94a3b8")),n=n.replace(/(\/\*[\s\S]*?\*\/)/g,a=>s(a,"#94a3b8")),n=n.replace(/'([^']*?)'/g,a=>s(a,"#fbbf24")),n=n.replace(/"([^"]*?)"/g,a=>s(a,"#fbbf24")),n=n.replace(/^(\/\/\w+)/gm,a=>s(a,"#22d3ee",1)),n=n.replace(/^(\/\/)/gm,a=>s(a,"#22d3ee")),n=n.replace(/\b(PROCEDURE DIVISION|DATA DIVISION|WORKING-STORAGE SECTION|LINKAGE SECTION|FILE SECTION|IDENTIFICATION DIVISION|ENVIRONMENT DIVISION)\b/g,a=>s(a,"#c084fc",1)),n=n.replace(/\b(EXEC PGM|EXEC CICS|END-EXEC|EXEC)\b/g,a=>s(a,"#f472b6",1)),n=n.replace(/\b(JOB|DD|DSN|DISP|SPACE|REGION|CLASS|COND|NOTIFY|SYSOUT|PGM|PROC|SET|INCLUDE|OUTFIL|SORT|MERGE|PARM|DCB|VOL|SER|UNIT|LABEL|OUTPUT|LRECL|BLKSIZE|RECFM|MSGCLASS|MSGLEVEL|TYPRUN|RESTART|PRTY|TIME)\b/g,a=>s(a,"#f472b6")),n=n.replace(/\b(MOVE|PERFORM|DISPLAY|COMPUTE|ADD|SUBTRACT|MULTIPLY|DIVIDE|INITIALIZE|STRING|UNSTRING|INSPECT|READ|WRITE|REWRITE|STOP RUN|GOBACK|EVALUATE|WHEN|OTHER|END-EVALUATE|END-IF|END-PERFORM|END-READ|END-WRITE|END-COMPUTE|END-STRING|END-CALL|JSON GENERATE|END-JSON|ACCEPT|SEARCH|GO TO)\b/g,a=>s(a,"#60a5fa")),n=n.replace(/\b(IF|ELSE|CALL|RETURN|OPEN|CLOSE|EXIT|NOT|AND|OR|UNTIL|VARYING|THRU|THROUGH|FROM|TO|BY|GIVING|INTO|ON|SIZE|ERROR|OVERFLOW|AT|END|DELETE|START)\b/g,a=>s(a,"#60a5fa")),n=n.replace(/\b(PIC|PICTURE|COMP|COMP-3|COMP-1|COMP-2|BINARY|PACKED-DECIMAL|VALUE|REDEFINES|OCCURS|INDEXED|DEPENDING|FILLER|COPY|REPLACING)\b/g,a=>s(a,"#34d399")),n=n.replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|ORDER|GROUP|HAVING|JOIN|LEFT|RIGHT|INNER|OUTER|CREATE|ALTER|DROP|GRANT|REVOKE|FETCH|FIRST|ROWS|ONLY|COMMIT|ROLLBACK|DECLARE|CURSOR|DECIMAL|SUBSTR|COUNT|SUM|AVG|MAX|MIN|BETWEEN|LIKE|EXISTS|DISTINCT|UNION|TABLE|INDEX|VIEW|RUNSTATS|BIND|PLAN|PACKAGE)\b/g,a=>s(a,"#fbbf24")),n=n.replace(/\b(SEND|RECEIVE|LINK|XCTL|READNEXT|STARTBR|ENDBR|PUT|GET|CONTAINER|CHANNEL|PROGRAM|MAP|MAPSET|COMMAREA|RESP|RESP2|SYNCPOINT|HANDLE|CONDITION|ABEND|TRANSID|FLENGTH|FREEMAIN|GETMAIN|DEFINE|CLUSTER|REPRO|VERIFY|LISTCAT|ENTRIES|PRINT|INFILE|EXPORT|IMPORT)\b/g,a=>s(a,"#fb923c")),n=n.replace(/\b(PARSE|ARG|SAY|DO|THEN|SIGNAL|ADDRESS|PULL|PUSH|QUEUE|TRACE|INTERPRET|OTHERWISE|LEAVE|ITERATE|NOP|OUTTRAP|SYSDSN|ALLOC|EXECIO|NUMERIC|UPPER|LOWER|STRIP|COPIES|CENTER|OVERLAY|WORD|WORDS|QUEUED)\b/g,a=>s(a,"#a78bfa"));for(let a=o.length-1;a>=0;a--)n=n.split("«"+a+"»").join(o[a]);return n},Pn=t=>{if(!t)return null;const n=t.split(`
`),o=[];let s=0;for(;s<n.length;){const a=n[s].trim();if(!a){s++;continue}if(a.endsWith(":")&&a.length<120&&!a.match(/^\d+\./)){o.push(e.jsxs("div",{style:{marginTop:o.length?28:0,marginBottom:14,display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:4,height:24,borderRadius:4,background:`linear-gradient(to bottom,${p?.color||"#0071e3"},${p?.color||"#7c3aed"})`,flexShrink:0}}),e.jsx("h3",{style:{fontSize:18,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.3px",lineHeight:1.4},children:a})]},s)),s++;continue}if(a.match(/^\d+[\.\)]/)){const l=[];for(;s<n.length&&n[s].trim().match(/^\d+[\.\)]/);){const C=n[s].trim().replace(/^\d+[\.\)]\s*/,"");l.push(C),s++}o.push(e.jsx("div",{style:{margin:"12px 0",display:"flex",flexDirection:"column",gap:8},children:l.map((C,R)=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:`${p?.color||"#0071e3"}12`,color:p?.color||"#0071e3",fontSize:13,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1},children:R+1}),e.jsx("p",{style:{fontSize:15,color:"#cbd5e1",lineHeight:1.85,flex:1},children:C})]},R))},`list-${s}`));continue}if(a.match(/^[•\-·]\s/)){const l=[];for(;s<n.length&&n[s].trim().match(/^[•\-·]\s/);)l.push(n[s].trim().replace(/^[•\-·]\s*/,"")),s++;o.push(e.jsx("div",{style:{margin:"12px 0 12px 4px",display:"flex",flexDirection:"column",gap:6},children:l.map((C,R)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:6,height:6,borderRadius:"50%",background:p?.color||"#0071e3",flexShrink:0,marginTop:9}}),e.jsx("p",{style:{fontSize:15,color:"#cbd5e1",lineHeight:1.85},children:C})]},R))},`bul-${s}`));continue}if(a.match(/^[A-Z][A-Z0-9\/\-_]{1,20}\s*(—|–|-|=|:)\s/)&&a.length<200){const l=a.match(/^([A-Z][A-Z0-9\/\-_]{1,20})\s*(—|–|-|=|:)\s*(.*)/);if(l){o.push(e.jsxs("div",{style:{margin:"6px 0",padding:"10px 16px",background:"rgba(30,41,59,0.6)",borderRadius:10,borderLeft:`3px solid ${p?.color||"#0071e3"}`},children:[e.jsx("span",{style:{fontWeight:700,color:"#f1f5f9",fontFamily:"'SF Mono',Menlo,Consolas,monospace",fontSize:14},children:l[1]}),e.jsxs("span",{style:{color:"#94a3b8"},children:[" ",l[2]," "]}),e.jsx("span",{style:{color:"#cbd5e1",fontSize:14.5},children:l[3]})]},s)),s++;continue}}o.push(e.jsx("p",{style:{fontSize:15.5,color:"#cbd5e1",lineHeight:2,margin:"8px 0",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif"},children:a},s)),s++}return e.jsx("div",{children:o})},Ha=t=>t?t.split(/(```[\s\S]*?```)/g).map((o,s)=>{if(o.startsWith("```")){const a=o.slice(3,-3).split(`
`),l=a[0].trim(),C=(l&&!l.includes(" ")?a.slice(1):a).join(`
`);return e.jsxs("div",{style:{margin:"8px 0",borderRadius:10,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)"},children:[l&&!l.includes(" ")&&e.jsx("div",{style:{background:"#0f172a",padding:"6px 12px",fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",borderBottom:"1px solid rgba(255,255,255,0.06)"},children:l}),e.jsx("pre",{style:{margin:0,padding:"14px 16px",background:"#0f172a",color:"#f1f5f9",fontSize:13,lineHeight:1.8,overflowX:"auto",fontFamily:Tt},dangerouslySetInnerHTML:{__html:kt(C)}})]},s)}return o.split(`
`).map((a,l)=>{let C=a.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/`(.+?)`/g,'<code style="background:rgba(0,113,227,0.2);padding:2px 7px;border-radius:4px;font-size:12px;font-family:monospace;color:#60a5fa">$1</code>').replace(/\*(.+?)\*/g,"<em>$1</em>");if(/^#{1,3}\s/.test(a)){const R=a.match(/^(#+)/)[1].length,b=a.replace(/^#+\s*/,"");C=`<strong style="font-size:${18-R*2}px;display:block;margin:8px 0 4px">${b}</strong>`}return(a.startsWith("• ")||a.startsWith("- ")||/^\d+[\.\)]\s/.test(a))&&(C='<span style="display:inline-block;width:16px;flex-shrink:0"></span>'+C),e.jsx("div",{dangerouslySetInnerHTML:{__html:C||"&nbsp;"}},`${s}-${l}`)})}):null,[Xa,Gt]=r.useState([]),[Nn,Wt]=r.useState(!1),[Q,ot]=r.useState({title:"",content:"",category:"General"}),Va=["JCL","COBOL","REXX","VSAM","DB2","CICS","IMS","RACF","z/OS","Modernization","Linux on Z","Career","General"],Ht=c&&(parseInt(c.mfYears||0)>=5||parseInt(c.itYears||0)>=5);r.useEffect(()=>{(async()=>{try{const{data:n}=await g.from("user_blogs").select("*").order("created_at",{ascending:!1});n&&Gt(n.map(o=>({id:o.id,title:o.title,content:o.content,category:o.category,date:(o.created_at||"").slice(0,10),readTime:Math.max(1,Math.round((o.content||"").split(/\s+/).length/200))+" min read",author:o.author,authorRole:o.author_role,isUserBlog:!0,likes:0})))}catch{}})()},[]);const ja=async()=>{if(!Q.title.trim()||!Q.content.trim()||!c)return;await g.from("user_blogs").insert({user_id:c.id,title:Q.title.trim(),content:Q.content.trim(),category:Q.category,author:c.name,author_role:c.role});const{data:t}=await g.from("user_blogs").select("*").order("created_at",{ascending:!1});t&&Gt(t.map(n=>({id:n.id,title:n.title,content:n.content,category:n.category,date:(n.created_at||"").slice(0,10),readTime:Math.max(1,Math.round((n.content||"").split(/\s+/).length/200))+" min read",author:n.author,authorRole:n.author_role,isUserBlog:!0,likes:0}))),ot({title:"",content:"",category:"General"}),Wt(!1)},za=t=>{if(!c){N("signin"),I("");return}Gt(n=>n.map(o=>o.id===t?{...o,likes:(o.likes||0)+1}:o))},yn=[...Xa,...Ko],[Xt,Vt]=r.useState([]),[we,Ja]=r.useState("hot"),[jt,Ka]=r.useState("All"),[st,Qa]=r.useState(""),[V,de]=r.useState(null),[Mn,zt]=r.useState(!1),[Ee,it]=r.useState({title:"",body:"",topic:"General",author:""}),[Jt,bn]=r.useState(""),Un=r.useRef(!1);r.useEffect(()=>{const t=async()=>{try{const{data:n}=await g.from("qa_posts").select("*").order("created_at",{ascending:!1}),{data:o}=await g.from("qa_answers").select("*").order("created_at",{ascending:!0});if(n){const s=n.map(a=>({id:a.id,title:a.title,body:a.body,topic:a.topic,author:a.author,authorRole:a.author_role,date:(a.created_at||"").slice(0,10),votes:a.votes||1,answers:(o||[]).filter(l=>l.post_id===a.id).map(l=>({id:l.id,body:l.body,author:l.author,authorRole:l.author_role,date:(l.created_at||"").slice(0,10),votes:l.votes||1}))}));Vt(s)}}catch{}};if(m==="community"&&!Un.current&&(Un.current=!0,t()),m==="community")try{const n=g.channel("qa").on("postgres_changes",{event:"*",schema:"public",table:"qa_posts"},()=>t()).on("postgres_changes",{event:"*",schema:"public",table:"qa_answers"},()=>t()).subscribe();return()=>g.removeChannel(n)}catch{}},[m]);const rt=async(t,n)=>{if(!c){N("signin"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""});return}Xt.find(s=>s.id===t)&&(await g.rpc("vote_post",{post_id:t,vote_dir:n}),Vt(s=>s.map(a=>a.id===t?{...a,votes:a.votes+n}:a)))},xn=async(t,n,o)=>{if(!c){N("signin"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""});return}await g.rpc("vote_answer",{answer_id:n,vote_dir:o}),Vt(s=>s.map(a=>a.id===t?{...a,answers:a.answers.map(l=>l.id===n?{...l,votes:l.votes+o}:l)}:a))},qa=async()=>{if(!c){N("signin"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""});return}Ee.title.trim()&&(await g.from("qa_posts").insert({user_id:c.id,author:c.name,author_role:c.role,title:Ee.title,body:Ee.body,topic:Ee.topic}),it({title:"",body:"",topic:"General",author:""}),zt(!1))},Za=async t=>{if(!c){N("signin"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""});return}Jt.trim()&&(await g.from("qa_answers").insert({post_id:t,user_id:c.id,author:c.name,author_role:c.role,body:Jt}),bn(""))},vn=[...Xt].filter(t=>jt==="All"||t.topic===jt).filter(t=>!st||t.title.toLowerCase().includes(st.toLowerCase())||t.body.toLowerCase().includes(st.toLowerCase())).sort((t,n)=>we==="new"?n.date.localeCompare(t.date):we==="top"?n.votes-t.votes:n.votes+n.answers.length*2-(t.votes+t.answers.length*2)),[Kt,lt]=r.useState([]),[pe,Bn]=r.useState(""),[Ye,Fn]=r.useState(!1),[Qt,wn]=r.useState(!1),[Ce,Yn]=r.useState(j.TEXT),[fe,qt]=r.useState(null),[Zt,kn]=r.useState(""),[ct,_a]=r.useState(!1),[_t,$a]=r.useState(new Set),[ue,Gn]=r.useState(!1),[$t,ae]=r.useState(!1),[oe,re]=r.useState(0),[en,eo]=r.useState([]),Wn=r.useRef(null),Hn=r.useRef(null),tn=t=>({id:t.id,type:t.msg_type||"text",text:t.content,del:t.deleted||!1,reactions:t.reactions||{},replyTo:t.reply_to,time:new Date(t.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),_name:t.sender_name,_role:t.sender_role,_color:t.sender_color||"#0071e3",_emoji:t.sender_emoji||"🧑‍💻",_userId:t.user_id,_isSelf:t.user_id===c?.id}),Xn=r.useRef(!1);r.useEffect(()=>{if(m!=="community"&&!Xn.current)return;Xn.current=!0,(async()=>{try{const{data:n}=await g.from("chat_messages").select("*").order("created_at",{ascending:!0}).limit(200);n&&lt(n.map(tn))}catch{}})();try{const n=g.channel("chat").on("postgres_changes",{event:"INSERT",schema:"public",table:"chat_messages"},o=>{lt(s=>[...s,tn(o.new)])}).on("postgres_changes",{event:"UPDATE",schema:"public",table:"chat_messages"},o=>{lt(s=>s.map(a=>a.id===o.new.id?tn(o.new):a))}).subscribe();return()=>{g.removeChannel(n)}}catch{}},[c,m]),r.useEffect(()=>{if(m!=="community")return;const t=async()=>{try{const{data:o}=await g.from("user_presence").select("*").gte("last_seen",new Date(Date.now()-3e5).toISOString());o&&eo(o)}catch{}};t();const n=setInterval(t,3e4);return()=>clearInterval(n)},[m]),r.useEffect(()=>{if(!c)return;const t=async()=>{try{await g.from("user_presence").upsert({user_id:c.id,name:c.name,role:c.role,emoji:"🧑‍💻",color:"#0071e3",last_seen:new Date().toISOString()})}catch{}};t();const n=setInterval(t,6e4);return()=>clearInterval(n)},[c]),r.useEffect(()=>{if(!$t)return;re(0);const t=setTimeout(()=>re(1),100),n=setTimeout(()=>re(2),500),o=setTimeout(()=>re(3),900);return()=>{clearTimeout(t),clearTimeout(n),clearTimeout(o)}},[$t]),r.useEffect(()=>{m==="community"&&(Ye||c)&&setTimeout(()=>Wn.current?.scrollIntoView({behavior:"smooth"}),50)},[Kt,m,Ye,c]),r.useEffect(()=>{c&&Fn(!0)},[c]);const Vn=async()=>{!pe.trim()||!c||(await g.from("chat_messages").insert({user_id:c.id,sender_name:c.name,sender_role:c.role||"Member",sender_color:"#0071e3",sender_emoji:"🧑‍💻",msg_type:Ce,content:pe.trim(),reply_to:fe?.id||null}),Bn(""),Yn(j.TEXT),qt(null),Hn.current?.focus())},to=async(t,n)=>{const o=Kt.find(a=>a.id===t);if(!o||!c)return;const s={...o.reactions||{}};s[n]||(s[n]=[]),s[n].includes(c.id)?(s[n]=s[n].filter(a=>a!==c.id),s[n].length||delete s[n]):s[n]=[...s[n],c.id],await g.rpc("react_message",{msg_id:t,new_reactions:s})},no=async t=>{await g.rpc("delete_message",{msg_id:t})},ao=t=>$a(n=>{const o=new Set(n);return o.has(t)?o.delete(t):o.add(t),o}),jn=(()=>{let t=Kt;return ue&&(t=t.filter(n=>_t.has(n.id))),Zt.trim()&&(t=t.filter(n=>n.text.toLowerCase().includes(Zt.toLowerCase()))),t})(),ke=en.length||0,k=en.length>0?en.map(t=>({name:t.name,role:t.role,color:t.color||"#0071e3",status:"online",emoji:t.emoji||"🧑‍💻"})):on,nn=c?0:null,oo=!1,so=()=>{},io={current:999},zn=()=>{c?(Fn(!0),v("community"),de("chat"),ae(!1)):(ae(!1),te(0),N("signup"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}))},[ro,Jn]=r.useState(!0),[Ge,St]=r.useState(`//MYJOB   JOB ,'MY JOB',CLASS=A,NOTIFY=&SYSUID
//STEP1   EXEC PGM=IEBGENER
//SYSUT1  DD DSN=INPUT.FILE,DISP=SHR
//SYSUT2  DD DSN=OUTPUT.FILE,
//           DISP=(NEW,CATLG,DELETE),
//           SPACE=(TRK,(10,5),RLSE)
//SYSPRINT DD SYSOUT=*
//SYSIN   DD DUMMY`),[me,Kn]=r.useState("JCL"),[ee,lo]=r.useState("explain"),[Qn,Le]=r.useState(null),[We,qn]=r.useState(!1),co={JCL:`//MYJOB   JOB ,'MY JOB',CLASS=A,NOTIFY=&SYSUID
//STEP1   EXEC PGM=IEBGENER
//SYSUT1  DD DSN=INPUT.FILE,DISP=SHR
//SYSUT2  DD DSN=OUTPUT.FILE,
//           DISP=(NEW,CATLG,DELETE),
//           SPACE=(TRK,(10,5),RLSE)
//SYSPRINT DD SYSOUT=*
//SYSIN   DD DUMMY`,COBOL:`       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-NAME PIC X(30) VALUE 'MAINFRAME'.
       01 WS-COUNT PIC 9(4) COMP VALUE 0.
       PROCEDURE DIVISION.
           DISPLAY 'HELLO ' WS-NAME
           ADD 1 TO WS-COUNT
           STOP RUN.`,REXX:`/* REXX - Check dataset existence */
PARSE ARG DSNAME
IF DSNAME = '' THEN DO
  SAY 'Usage: DSCHK dataset.name'
  EXIT 8
END
X = SYSDSN("'"DSNAME"'")
IF X = 'OK' THEN
  SAY DSNAME 'exists'
ELSE
  SAY DSNAME 'not found:' X
EXIT 0`,"DB2 SQL":`SELECT E.EMPNO, E.LASTNAME, E.SALARY,
       D.DEPTNAME,
       AVG(E.SALARY) OVER(PARTITION BY E.WORKDEPT) AS DEPT_AVG
FROM EMPLOYEE E
JOIN DEPARTMENT D ON E.WORKDEPT = D.DEPTNO
WHERE E.SALARY > 50000
ORDER BY E.SALARY DESC
FETCH FIRST 20 ROWS ONLY;`},So=async()=>{if(!Ge.trim())return;qn(!0),Le(null);const t={explain:`You are an expert IBM z/OS mainframe instructor. Analyze this ${me} code line by line. For EACH statement/line, explain: what it does, why it matters, and any important parameters. Use clear formatting with line references. End with a "Key Takeaways" summary.`,errors:`You are an expert IBM z/OS mainframe debugger. Analyze this ${me} code for errors, potential issues, and bad practices. For each issue found: describe the problem, explain why it's wrong, and provide the corrected code. If the code is correct, say so and suggest optimizations. Be specific with line numbers.`,simulate:`You are an IBM z/OS mainframe simulator. Given this ${me} code, explain step by step what would happen if this ran on z/OS. Include: what z/OS does at each step, what datasets are allocated/accessed, what output is generated, and what the expected return code would be. Make it feel like watching the job run in real-time.`};try{const o=await(await fetch("/.netlify/functions/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system:t[ee],messages:[{role:"user",content:Ge}]})})).json();o.content?.[0]?.text?Le(o.content[0].text):Le("Error: "+(o.error||"No response"))}catch{Le("Connection error. Please try again.")}qn(!1)},[Eo,dt]=r.useState(!1),[po,Zn]=r.useState(!1),[G,Et]=r.useState({rating:0,message:"",name:"",email:""}),[_n,$n]=r.useState(!1),ea=r.useRef(!1);r.useEffect(()=>{if(localStorage.getItem("mfsh_feedback_done"))return;const n=setTimeout(()=>{ea.current||(ea.current=!0,dt(!0))},5*60*1e3);return()=>clearTimeout(n)},[]);const Co=async()=>{if(G.message.trim()){$n(!0);try{await g.from("feedback").insert({user_id:c?.id||null,name:G.name.trim()||c?.name||"Anonymous",email:G.email.trim()||c?.email||null,rating:G.rating||null,message:G.message.trim(),page:m})}catch{}localStorage.setItem("mfsh_feedback_done","1"),$n(!1),Zn(!0),setTimeout(()=>{dt(!1),Zn(!1)},2500)}},[pt,te]=r.useState(0),Pe=r.useRef({welcome:!1,signin:!1,community:!1});r.useEffect(()=>{const t=()=>{Pe.current.welcome||setTimeout(()=>{te(1),Pe.current.welcome=!0},1500),window.removeEventListener("scroll",t)};window.addEventListener("scroll",t,{passive:!0});const n=setTimeout(()=>{!c&&!Pe.current.signin&&(te(2),Pe.current.signin=!0)},6e4),o=setTimeout(()=>{!Ye&&!Pe.current.community&&(te(3),Pe.current.community=!0)},12e4);return()=>{window.removeEventListener("scroll",t),clearTimeout(n),clearTimeout(o)}},[c,Ye]);const ta=[{id:"all",label:"All"},{id:"languages",label:"Languages",ids:["jcl","cobol","rexx","procs"]},{id:"databases",label:"Databases",ids:["db2","imsdb","vsam"]},{id:"middleware",label:"Middleware",ids:["cics","tso"]},{id:"operations",label:"Operations",ids:["ca7","smf","security"]},{id:"modern",label:"Modern Z",ids:["modernization","linuxonz","zowe"]}];r.useEffect(()=>{const t=()=>Na(window.scrollY>20);return window.addEventListener("scroll",t),os().then(n=>pn(n)),()=>window.removeEventListener("scroll",t)},[]),r.useEffect(()=>{window.scrollTo(0,0)},[m,p]);const na=y.filter(t=>{const n=Pt.toLowerCase(),o=t.title.toLowerCase().includes(n)||t.subtitle.toLowerCase().includes(n)||t.description.toLowerCase().includes(n),s=Ze==="all"||(ta.find(a=>a.id===Ze)?.ids||[]).includes(t.id);return o&&s}),Ne=t=>{B(t),Z(0),v("topics"),Oe(!1),window.scrollTo(0,0)},q=(t,n)=>{v(t),B(null),Oe(!1),Sn(null),yt(null),de(t==="community"?"chat":null)},uo=t=>{if(P.selected!==null)return;const n=$?ln:sn,o=t===n[P.index].answer;le(s=>({...s,selected:t,score:o?s.score+1:s.score,showExp:!0})),setTimeout(()=>{P.index+1<n.length?le(s=>({...s,index:s.index+1,selected:null,showExp:!1})):(le(s=>({...s,done:!0})),$&&Oa(o?P.score+1:P.score))},2200)},aa=()=>le({index:0,score:0,selected:null,done:!1,showExp:!1}),oa=async t=>{bt(!0),vt(null),Ua(t),Ut(null),Cn("tip");const n=await as(t.id);if(n){Ut(n),bt(!1);return}try{const o=await ts(t);o?(o.topicId=t.id,o.generatedDate=new Date().toLocaleString(),await ns(t.id,o),Ut(o),pn(new Date().toISOString())):vt("Could not parse update. Try again.")}catch(o){vt("Failed to fetch update: "+o.message)}finally{bt(!1)}},mo=async()=>{if(ie){try{localStorage.removeItem("weekly_"+ie.id)}catch{}oa(ie)}},To=ra.filter(t=>(_e==="All"||t.category===_e)&&($e==="All"||t.difficulty===$e)),Do=["All",...new Set(ra.map(t=>t.category))],Io=["All","Beginner","Intermediate","Advanced"];return e.jsxs("div",{style:i.root,children:[e.jsxs("div",{className:"mesh-bg",children:[e.jsx("div",{className:"mesh-orb",style:{width:600,height:600,top:"-10%",right:"-5%",background:"radial-gradient(circle,#7c3aed,transparent 70%)",animationDelay:"0s"}}),e.jsx("div",{className:"mesh-orb",style:{width:500,height:500,bottom:"10%",left:"-8%",background:"radial-gradient(circle,#0071e3,transparent 70%)",animationDelay:"4s"}}),e.jsx("div",{className:"mesh-orb",style:{width:400,height:400,top:"40%",right:"20%",background:"radial-gradient(circle,#06b6d4,transparent 70%)",animationDelay:"8s",opacity:.1}})]}),e.jsx("style",{children:`
        /* system fonts used — no external fonts needed */
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#080b16;color:#e2e8f0;overflow-x:hidden}
        body::before{content:'';position:fixed;inset:0;z-index:-1;pointer-events:none;
          background:
            radial-gradient(ellipse at 15% 20%, rgba(0,113,227,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 30%, rgba(124,58,237,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(0,179,101,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 90%, rgba(6,182,212,0.05) 0%, transparent 40%);
        }
        body::after{content:'';position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:0.4;
          background-image:radial-gradient(circle at 1px 1px, rgba(0,113,227,0.12) 1px, transparent 0);
          background-size:40px 40px;
        }
        @keyframes float3d{0%,100%{transform:translateY(0) rotateX(0)}50%{transform:translateY(-12px) rotateX(3deg)}}
        @keyframes morphBlob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(0,113,227,0.15)}50%{box-shadow:0 0 40px rgba(124,58,237,0.25)}}
        .card:hover{transform:translateY(-4px) scale(1.01);transition:transform 0.3s ease,box-shadow 0.3s ease}
        .content-card{animation:float3d 6s ease-in-out infinite;animation-play-state:paused}
        .content-card:hover{animation-play-state:running}
        .nav-scroll::-webkit-scrollbar{display:none}
        .nav-scroll{-ms-overflow-style:none;scrollbar-width:none}
        .topic-sidebar::-webkit-scrollbar{width:3px}
        .topic-sidebar::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes commPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}
        @keyframes slideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes popIn{from{transform:scale(0.85) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes avatarPulse{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.15);opacity:0.8}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInRight{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}
        .fu{animation:fadeUp 0.5s cubic-bezier(.25,.46,.45,.94) both}
        .fi{animation:fadeIn 0.4s ease both}
        .slideL{animation:slideInLeft 0.5s ease both}
        .slideR{animation:slideInRight 0.5s ease both}
        .scaleIn{animation:scaleIn 0.4s cubic-bezier(.25,.46,.45,.94) both}
        .card:hover{transform:translateY(-8px) rotateX(2deg) rotateY(-1deg) scale(1.01)!important;box-shadow:0 24px 60px rgba(0,0,0,0.12),0 0 0 1px rgba(0,113,227,0.08)!important}
        .content-card{background:rgba(17,24,39,0.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:22px;padding:44px 48px;box-shadow:0 4px 30px rgba(0,0,0,0.3),0 1px 3px rgba(0,0,0,0.15);transition:box-shadow 0.3s ease}
        .content-card:hover{box-shadow:0 8px 40px rgba(0,0,0,0.06)}
        .content-card pre{font-size:15px!important;line-height:2!important;color:#cbd5e1!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif!important}
        .mesh-bg{position:fixed;top:0;left:0;right:0;bottom:0;z-index:-1;pointer-events:none;overflow:hidden}
        .mesh-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.18;animation:float 12s ease-in-out infinite}
        .tab:hover{background:rgba(255,255,255,0.06)!important}
        .glow-line{height:2px;background:linear-gradient(90deg,transparent,#0071e3,#7c3aed,transparent);background-size:200% 100%;animation:shimmer 3s linear infinite}
        .hero-glow{position:absolute;width:320px;height:320px;border-radius:50%;filter:blur(100px);opacity:0.2;animation:pulse 5s ease-in-out infinite}
        .card{transition:all 0.35s cubic-bezier(.25,.46,.45,.94)!important;transform-style:preserve-3d!important;perspective:800px!important}
        .card:hover .card-icon{transform:scale(1.2) rotate(-5deg);transition:transform 0.3s ease}
        .card-icon{transition:transform 0.3s ease;display:inline-block}
        .scenario-card{transition:all 0.3s ease!important}
        .scenario-card:hover{transform:translateY(-3px)!important;box-shadow:0 12px 36px rgba(0,0,0,0.1)!important}
        .glow-btn{position:relative;overflow:hidden}
        .glow-btn::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,0.25) 0%,transparent 70%);transform:scale(0);transition:transform 0.5s ease;border-radius:50%}
        .glow-btn:hover::after{transform:scale(1)}
        .hero-float{animation:float 6s ease-in-out infinite}
        .hero-float-delay{animation:float 6s ease-in-out 2s infinite}
        .text-gradient{background:linear-gradient(135deg,#0071e3 0%,#7c3aed 50%,#0071e3 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradientShift 4s ease infinite}
        .stat-card{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.08)}
        @keyframes chatBounce{0%{transform:scale(0.8);opacity:0}50%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
        @keyframes chatSlideUp{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes dotPulse{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
        .chat-fab{animation:chatBounce 0.4s ease both;transition:transform 0.2s,box-shadow 0.2s}
        .chat-fab:hover{transform:scale(1.08)!important;box-shadow:0 8px 32px rgba(124,58,237,0.4)!important}
        .chat-window{animation:chatSlideUp 0.3s ease both}
        .chat-msg-enter{animation:fadeUp 0.3s ease both}
        .chat-input:focus{border-color:#7c3aed!important;box-shadow:0 0 0 3px rgba(124,58,237,0.1)!important}
        .card{transition:transform .22s ease,box-shadow .22s ease!important}
        .nav-btn:hover{color:#ffffff!important}
        .pill:hover{opacity:.85!important}
        .tab:hover{color:#ffffff!important}
        .scenario-card:hover{border-color:#0071e3!important}
        .scenario-card{transition:border-color .2s ease!important}
        @keyframes revealUp{from{opacity:0;transform:translateY(40px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .reveal{opacity:0;animation:revealUp 0.7s cubic-bezier(.25,.46,.45,.94) forwards}
        @keyframes glow3d{0%{box-shadow:0 0 20px rgba(0,113,227,0.15)}50%{box-shadow:0 0 40px rgba(124,58,237,0.2)}100%{box-shadow:0 0 20px rgba(0,113,227,0.15)}}
        .card:hover .card-icon{transform:scale(1.3) rotate(-8deg) translateZ(20px)!important;transition:transform 0.4s cubic-bezier(.34,1.56,.64,1)!important}

        @keyframes slideRight{from{transform:translateX(-100%)}to{transform:translateX(0)}}
        /* ═══ TOPIC LAYOUT RESPONSIVE ═══ */
        .topic-mobile-nav{display:none!important}
        .topic-content-main{flex:1;min-width:0;padding:32px 0 32px 40px;max-width:800px}
        @media(max-width:900px){
          .topic-sidebar{display:none!important}
          .topic-mobile-nav{display:block!important}
          .topic-content-main{padding:20px 0 32px 0!important;max-width:100%!important;width:100%!important}
          .topic-layout{flex-direction:column!important}
        }
        @media(max-width:480px){
          .topic-content-main{padding:12px 0 24px 0!important}
        }

        /* ═══ RESPONSIVE — TABLET (≤768px) ═══ */
        @media(max-width:768px){
          .content-card{padding:24px 20px!important;border-radius:16px!important}
          .content-card pre{font-size:12.5px!important;white-space:pre-wrap!important;word-break:break-all!important}
          .hero-glow{width:200px!important;height:200px!important;filter:blur(60px)!important}
          .hero-float,.hero-float-delay{display:none!important}
        }

        /* ═══ RESPONSIVE — MOBILE (≤480px) ═══ */
        @media(max-width:480px){
          .content-card{padding:18px 14px!important;border-radius:14px!important}
          .content-card pre{font-size:11.5px!important;padding:12px!important}
          .chat-fab{width:52px!important;height:52px!important;font-size:22px!important;bottom:16px!important;right:16px!important}
          .chat-window{bottom:78px!important;right:8px!important;left:8px!important;width:auto!important;max-width:none!important;border-radius:20px!important}
          .hero-glow{width:150px!important;height:150px!important}
        }

        /* ═══ TOUCH TARGETS — all mobile ═══ */
        @media(hover:none) and (pointer:coarse){
          button,a,[role="button"]{min-height:44px}
          .tab{min-height:44px!important}
          .pill{min-height:36px!important}
          input,select,textarea{font-size:16px!important}
        }

        /* ═══ SAFE AREA — iPhone notch ═══ */
        @supports(padding: env(safe-area-inset-bottom)){
          .chat-fab{bottom:calc(16px + env(safe-area-inset-bottom))!important}
          .chat-window{bottom:calc(78px + env(safe-area-inset-bottom))!important}
        }

        /* ═══ PRINT ═══ */
        @media print{
          .chat-fab,.chat-window,.mesh-bg,.mesh-orb,.hero-glow{display:none!important}
          body{background:#080b16!important}
          .content-card{box-shadow:none!important;border:1px solid rgba(255,255,255,0.08)!important}
        }
      `}),e.jsx("nav",{role:"navigation","aria-label":"Main navigation",style:{...i.nav,background:cn?"rgba(8,11,22,0.95)":"rgba(8,11,22,0.8)",boxShadow:cn?"0 1px 0 rgba(0,0,0,0.1)":"none",backdropFilter:"saturate(180%) blur(20px)",WebkitBackdropFilter:"saturate(180%) blur(20px)"},children:e.jsxs("div",{style:i.navInner,children:[e.jsxs("button",{style:i.navLogo,onClick:()=>q("home"),children:[e.jsx("img",{src:"/favicon.svg",alt:"logo",style:{width:28,height:28,borderRadius:6}}),e.jsx("span",{style:{fontWeight:700,fontSize:15,letterSpacing:"-.3px"},children:"MainframeStudyHub"})]}),e.jsx("div",{className:"nav-scroll",style:i.navLinks,children:[["home","Overview"],["topics","Topics"],["scenarios","Scenarios"],["blog","Blog"],["quiz","Quiz"],["playground","Code Lab"],["community","Community"],["abends","Abend Solver"],["roadmap","Roadmap"],["weekly","Weekly Update"],["about","About"]].map(([t,n])=>e.jsx("button",{className:"nav-btn",onClick:()=>q(t),style:{...i.navLink,color:m===t?"#ffffff":"#94a3b8",fontWeight:m===t?600:400},children:n},t))}),c?e.jsx(Xe,{name:c.name,size:32,showRing:!0,onClick:()=>N(Y==="profile"?null:"profile"),style:{marginLeft:8}}):e.jsx("button",{onClick:()=>{N("signin"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""})},style:{marginLeft:8,background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",borderRadius:980,padding:"6px 16px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:S,whiteSpace:"nowrap",flexShrink:0},children:"Sign In"}),e.jsxs("button",{"aria-label":"Menu",style:i.hamburger,onClick:()=>Oe(t=>!t),children:[e.jsx("div",{style:{width:18,height:1.5,background:"#e2e8f0",marginBottom:5,transform:Ue?"rotate(45deg) translate(4px,4px)":"none",transition:"all .2s"}}),e.jsx("div",{style:{width:18,height:1.5,background:"#e2e8f0",marginBottom:5,opacity:Ue?0:1,transition:"all .2s"}}),e.jsx("div",{style:{width:18,height:1.5,background:"#e2e8f0",transform:Ue?"rotate(-45deg) translate(4px,-4px)":"none",transition:"all .2s"}})]})]})}),Ue&&e.jsxs("div",{style:i.drawer,className:"fi",children:[e.jsx("div",{style:{height:52}}),c?e.jsxs("div",{style:{padding:"12px 24px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(255,255,255,0.06)",marginBottom:8},children:[e.jsx(Xe,{name:c.name,size:36,showRing:!0}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#f1f5f9"},children:c.name}),e.jsxs("div",{style:{fontSize:11,color:"#94a3b8"},children:[c.role," · ",c.mfYears,"yr MF"]})]}),e.jsx("button",{onClick:()=>{Dn(),Oe(!1)},style:{fontSize:11,color:"#fca5a5",background:"rgba(239,68,68,0.15)",border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontFamily:S},children:"Sign Out"})]}):e.jsx("div",{style:{padding:"8px 24px 12px",borderBottom:"1px solid rgba(255,255,255,0.06)",marginBottom:8},children:e.jsx("button",{onClick:()=>{N("signin"),I(""),Oe(!1)},style:{width:"100%",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",borderRadius:10,padding:"10px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:S},children:"Sign In / Sign Up"})}),[["home","🏠 Overview"],["topics","📚 Topics"],["scenarios","🎯 Scenarios"],["blog","📰 Blog"],["quiz","🧠 Quiz"],["community","💬 Community"],["abends","🔍 Abend Solver"],["roadmap","🗺️ Roadmap"],["weekly","🔄 Weekly Update"],["about","👤 About"]].map(([t,n])=>e.jsx("button",{onClick:()=>q(t),style:{...i.drawerLink,color:m===t?"#0071e3":"#e2e8f0"},children:n},t)),e.jsx("div",{style:{height:1,background:"#1e293b",margin:"8px 0"}}),y.map(t=>e.jsxs("button",{onClick:()=>Ne(t),style:i.drawerTopicLink,children:[t.icon," ",t.title]},t.id))]}),Ue&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:998},onClick:()=>Oe(!1)}),ro&&e.jsxs("div",{style:{position:"fixed",top:52,left:0,right:0,zIndex:900,background:"linear-gradient(90deg,#0a1628 0%,#0d2040 50%,#0a1628 100%)",borderBottom:"1px solid rgba(0,113,227,0.2)",padding:"8px 0",animation:"slideDown 0.5s ease",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,rgba(0,113,227,0.08),transparent 70%)"}}),e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"center",gap:16,position:"relative"},children:[e.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:"#00b365",boxShadow:"0 0 6px #00b365",animation:"commPulse 2s ease-in-out infinite",flexShrink:0}}),e.jsxs("span",{style:{fontSize:13,color:"rgba(255,255,255,0.8)",fontWeight:500},children:["🖥️ ",e.jsx("strong",{style:{color:"#fff"},children:"MainframeStudyHub Community"})," is live — ",ke," members online"]}),e.jsx("button",{onClick:()=>{ae(!0),re(0),Jn(!1)},style:{background:"rgba(0,113,227,0.9)",color:"#fff",border:"none",borderRadius:980,padding:"5px 16px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:S,flexShrink:0},children:"Join Now"}),e.jsx("button",{onClick:()=>Jn(!1),style:{position:"absolute",right:24,background:"none",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:16,padding:4},"aria-label":"Close",children:"✕"})]})]}),e.jsxs("main",{id:"main-content",role:"main",style:{paddingTop:52,minHeight:"100vh"},children:[(Y==="signin"||Y==="signup")&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)"},onClick:t=>{t.target===t.currentTarget&&N(null)},children:e.jsxs("div",{className:"scaleIn",style:{background:"rgba(8,11,22,0.97)",backdropFilter:"blur(20px)",borderRadius:24,padding:"36px 32px",maxWidth:420,width:"90%",boxShadow:"0 24px 80px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.08)"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[e.jsx("img",{src:"/favicon.svg",alt:"logo",style:{width:48,height:48,borderRadius:12,marginBottom:12}}),e.jsx("h2",{style:{fontSize:24,fontWeight:800,letterSpacing:"-0.5px",color:"#f1f5f9",marginBottom:4},children:Y==="signin"?"Welcome Back":"Join MainframeStudyHub"}),e.jsx("p",{style:{fontSize:14,color:"#94a3b8"},children:Y==="signin"?"Sign in to your account":"Create your account to join the community"})]}),e.jsxs("button",{onClick:xa,disabled:J,style:{width:"100%",padding:"11px",background:"#1e293b",color:"#f1f5f9",border:"1.5px solid rgba(255,255,255,0.15)",borderRadius:12,fontSize:14,fontWeight:600,cursor:J?"wait":"pointer",fontFamily:S,display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,transition:"background 0.2s,box-shadow 0.2s"},onMouseEnter:t=>{t.currentTarget.style.background="rgba(30,41,59,0.8)",t.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.08)"},onMouseLeave:t=>{t.currentTarget.style.background="rgba(30,41,59,0.5)",t.currentTarget.style.boxShadow="none"},children:[e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",fill:"#4285F4"}),e.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),e.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),e.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),Y==="signin"?"Sign in with Google":"Sign up with Google"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16},children:[e.jsx("div",{style:{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}),e.jsx("span",{style:{fontSize:12,color:"#94a3b8",fontWeight:500},children:"or"}),e.jsx("div",{style:{flex:1,height:1,background:"rgba(255,255,255,0.1)"}})]}),un&&e.jsx("div",{style:{background:"rgba(239,68,68,0.15)",color:"#fca5a5",padding:"10px 14px",borderRadius:10,fontSize:13,marginBottom:16,border:"1px solid rgba(239,68,68,0.25)"},children:un}),Y==="signup"&&e.jsx("input",{value:h.name,onChange:t=>x({...h,name:t.target.value}),"aria-label":"Full name",placeholder:"Full Name *",style:_}),e.jsx("input",{value:h.email,onChange:t=>x({...h,email:t.target.value}),"aria-label":"Email address",placeholder:"Email *",type:"email",style:_}),e.jsx("input",{value:h.password,onChange:t=>x({...h,password:t.target.value}),placeholder:Y==="signup"?"Password (min 6 chars) *":"Password *",type:"password",style:_,onKeyDown:t=>{t.key==="Enter"&&!J&&(t.preventDefault(),Y==="signin"?Tn():mn())}}),Y==="signup"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#94a3b8",display:"block",marginBottom:4},children:"Current Role"}),e.jsxs("select",{value:h.role,onChange:t=>x({...h,role:t.target.value}),style:{..._,marginBottom:0,cursor:"pointer",color:h.role?"#f1f5f9":"#64748b"},children:[e.jsx("option",{value:"",children:"Select your role..."}),An.map(t=>e.jsx("option",{value:t,children:t},t))]})]}),e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:20},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#94a3b8",display:"block",marginBottom:4},children:"IT Experience (years)"}),e.jsx("input",{value:h.itYears,onChange:t=>x({...h,itYears:t.target.value}),"aria-label":"IT experience years",placeholder:"e.g. 5",type:"number",min:"0",max:"50",style:{..._,marginBottom:0}})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#94a3b8",display:"block",marginBottom:4},children:"Mainframe Exp (years)"}),e.jsx("input",{value:h.mfYears,onChange:t=>x({...h,mfYears:t.target.value}),"aria-label":"Mainframe experience years",placeholder:"e.g. 2",type:"number",min:"0",max:"50",style:{..._,marginBottom:0}})]})]})]}),e.jsx("button",{onClick:Y==="signin"?Tn:mn,disabled:J,className:"glow-btn",style:{width:"100%",padding:"12px",background:J?"#334155":"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:J?"wait":"pointer",fontFamily:S,marginTop:Y==="signin"?16:0},children:J?"Please wait...":Y==="signin"?"Sign In":"Create Account"}),Y==="signin"&&e.jsx("div",{style:{textAlign:"center",marginTop:10},children:e.jsx("button",{onClick:va,style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontFamily:S,fontSize:12,fontWeight:500},children:"Forgot your password?"})}),e.jsx("div",{style:{textAlign:"center",marginTop:12,fontSize:13,color:"#94a3b8"},children:Y==="signin"?e.jsxs(e.Fragment,{children:["Don't have an account? ",e.jsx("button",{onClick:()=>{N("signup"),I("")},style:{background:"none",border:"none",color:"#0071e3",cursor:"pointer",fontWeight:600,fontFamily:S,fontSize:13},children:"Sign Up"})]}):e.jsxs(e.Fragment,{children:["Already have an account? ",e.jsx("button",{onClick:()=>{N("signin"),I("")},style:{background:"none",border:"none",color:"#0071e3",cursor:"pointer",fontWeight:600,fontFamily:S,fontSize:13},children:"Sign In"})]})})]})}),Y==="profile"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9998},onClick:()=>N(null)}),e.jsxs("div",{className:"scaleIn",style:{position:"fixed",top:48,right:16,zIndex:9999,background:"rgba(8,11,22,0.97)",backdropFilter:"blur(20px)",borderRadius:18,padding:24,boxShadow:"0 16px 56px rgba(0,0,0,0.18)",border:"1px solid rgba(255,255,255,0.06)",minWidth:260},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:18,paddingBottom:16,borderBottom:"1px solid rgba(255,255,255,0.06)"},children:[e.jsx(Xe,{name:c?.name,size:52,showRing:!0}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:17,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.3px"},children:c?.name}),e.jsx("div",{style:{fontSize:12,color:"#0071e3",fontWeight:600},children:c?.role}),e.jsx("div",{style:{fontSize:11,color:"#94a3b8"},children:c?.email})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:18},children:[e.jsxs("div",{style:{background:"rgba(30,41,59,0.8)",borderRadius:12,padding:"12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:22,fontWeight:800,color:"#f1f5f9"},children:c?.itYears}),e.jsx("div",{style:{fontSize:10,color:"#94a3b8",fontWeight:600},children:"IT YEARS"})]}),e.jsxs("div",{style:{background:"rgba(30,41,59,0.8)",borderRadius:12,padding:"12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:22,fontWeight:800,color:"#f1f5f9"},children:c?.mfYears}),e.jsx("div",{style:{fontSize:10,color:"#94a3b8",fontWeight:600},children:"MF YEARS"})]})]}),e.jsxs("div",{style:{fontSize:12,color:"#94a3b8",marginBottom:16,textAlign:"center"},children:["Member since ",c?.joinDate]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("button",{onClick:Fa,style:{width:"100%",padding:"10px",background:"rgba(0,113,227,0.08)",color:"#0071e3",border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:S},children:"✏️ Edit Profile"}),e.jsx("button",{onClick:()=>{tt(!0),N(null),ce(""),Ft("")},style:{width:"100%",padding:"10px",background:"rgba(30,41,59,0.8)",color:"#cbd5e1",border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:S},children:"🔒 Change Password"}),e.jsx("button",{onClick:()=>{Dn(),N(null)},style:{width:"100%",padding:"10px",background:"rgba(239,68,68,0.15)",color:"#fca5a5",border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:S},children:"Sign Out"})]})]})]}),Y==="forgot-sent"&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)"},onClick:t=>{t.target===t.currentTarget&&N(null)},children:e.jsxs("div",{className:"scaleIn",style:{background:"rgba(8,11,22,0.97)",backdropFilter:"blur(20px)",borderRadius:24,padding:"40px 32px",maxWidth:400,width:"90%",textAlign:"center",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:16},children:"📧"}),e.jsx("h2",{style:{fontSize:22,fontWeight:800,color:"#f1f5f9",marginBottom:8},children:"Check Your Email"}),e.jsxs("p",{style:{fontSize:14,color:"#94a3b8",lineHeight:1.6,marginBottom:24},children:["We've sent a password reset link to ",e.jsx("strong",{style:{color:"#f1f5f9"},children:h.email}),". Click the link in the email to set a new password."]}),e.jsx("button",{onClick:()=>{N("signin"),I("")},className:"glow-btn",style:{padding:"10px 28px",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:S},children:"Back to Sign In"})]})}),Ba&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)"},onClick:t=>{t.target===t.currentTarget&&et(!1)},children:e.jsxs("div",{className:"scaleIn",style:{background:"rgba(8,11,22,0.97)",backdropFilter:"blur(20px)",borderRadius:24,padding:"36px 32px",maxWidth:420,width:"90%",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",fontSize:24,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12},children:K.name?.charAt(0)?.toUpperCase()||"U"}),e.jsx("h2",{style:{fontSize:22,fontWeight:800,color:"#f1f5f9"},children:"Edit Profile"})]}),e.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#94a3b8",display:"block",marginBottom:4},children:"Full Name"}),e.jsx("input",{value:K.name,onChange:t=>ve({...K,name:t.target.value}),"aria-label":"Full name",placeholder:"Full Name *",style:_}),e.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#94a3b8",display:"block",marginBottom:4},children:"Current Role"}),e.jsxs("select",{value:K.role,onChange:t=>ve({...K,role:t.target.value}),style:{..._,cursor:"pointer",color:"#f1f5f9"},children:[e.jsx("option",{value:"",children:"Select your role..."}),An.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:20},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#94a3b8",display:"block",marginBottom:4},children:"IT Experience (years)"}),e.jsx("input",{value:K.itYears,onChange:t=>ve({...K,itYears:t.target.value}),type:"number",min:"0",max:"50",style:{..._,marginBottom:0}})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#94a3b8",display:"block",marginBottom:4},children:"Mainframe Exp (years)"}),e.jsx("input",{value:K.mfYears,onChange:t=>ve({...K,mfYears:t.target.value}),type:"number",min:"0",max:"50",style:{..._,marginBottom:0}})]})]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("button",{onClick:wa,disabled:J,className:"glow-btn",style:{flex:1,padding:"12px",background:J?"#334155":"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:J?"wait":"pointer",fontFamily:S},children:J?"Saving...":"Save Changes"}),e.jsx("button",{onClick:()=>et(!1),style:{padding:"12px 20px",background:"rgba(30,41,59,0.8)",color:"#cbd5e1",border:"none",borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:S},children:"Cancel"})]})]})}),Ya&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)"},onClick:t=>{t.target===t.currentTarget&&tt(!1)},children:e.jsxs("div",{className:"scaleIn",style:{background:"rgba(8,11,22,0.97)",backdropFilter:"blur(20px)",borderRadius:24,padding:"36px 32px",maxWidth:380,width:"90%",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[e.jsx("div",{style:{fontSize:48,marginBottom:8},children:"🔒"}),e.jsx("h2",{style:{fontSize:22,fontWeight:800,color:"#f1f5f9"},children:"Change Password"})]}),nt&&e.jsx("div",{style:{background:nt.includes("✅")?"rgba(22,101,52,0.2)":"rgba(239,68,68,0.15)",color:nt.includes("✅")?"#4ade80":"#fca5a5",padding:"10px 14px",borderRadius:10,fontSize:13,marginBottom:16},children:nt}),e.jsx("input",{value:Bt,onChange:t=>Ft(t.target.value),placeholder:"New password (min 6 chars)",type:"password",style:_,onKeyDown:t=>{t.key==="Enter"&&In()}}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("button",{onClick:In,disabled:J,className:"glow-btn",style:{flex:1,padding:"12px",background:J?"#334155":"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:J?"wait":"pointer",fontFamily:S},children:J?"Updating...":"Update Password"}),e.jsx("button",{onClick:()=>tt(!1),style:{padding:"12px 20px",background:"rgba(30,41,59,0.8)",color:"#cbd5e1",border:"none",borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:S},children:"Cancel"})]})]})}),m==="home"&&e.jsxs("div",{children:[e.jsxs("section",{style:{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#030712 0%,#0a0e27 40%,#0f1642 70%,#1a0a3e 100%)",padding:"100px 0 70px",minHeight:"85vh",display:"flex",alignItems:"center"},children:[U&&e.jsx(r.Suspense,{fallback:null,children:e.jsx(Zo,{})}),e.jsx("div",{style:{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 50%,rgba(0,113,227,0.12) 0%,transparent 60%)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 60%,rgba(124,58,237,0.1) 0%,transparent 50%)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",inset:0,opacity:.04,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",backgroundSize:"60px 60px"}}),e.jsxs("div",{style:{...i.heroInner,position:"relative",zIndex:2},children:[e.jsxs("div",{className:"fu",style:{animationDelay:"0ms",display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:980,padding:"8px 20px 8px 12px",marginBottom:20,backdropFilter:"blur(10px)"},children:[e.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:"#22c55e",animation:"pulse 2s ease infinite"}}),e.jsx("span",{style:{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.8)",letterSpacing:"0.5px"},children:"IBM Z Knowledge Platform"})]}),e.jsxs("h1",{className:"fu",style:{fontSize:"clamp(40px,7vw,76px)",fontWeight:900,lineHeight:1.04,letterSpacing:"-3px",color:"#fff",marginBottom:20,animationDelay:"80ms"},children:["Everything",e.jsx("br",{}),"Mainframe."]}),e.jsx("h2",{className:"fu",style:{fontSize:"clamp(22px,3.5vw,36px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-1px",marginBottom:24,animationDelay:"140ms",background:"linear-gradient(135deg,#60a5fa 0%,#a78bfa 40%,#f472b6 70%,#22d3ee 100%)",backgroundSize:"200% auto",animation:"gradientShift 4s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"Beginner to Professional."}),e.jsx("p",{className:"fu",style:{fontSize:"clamp(15px,1.6vw,18px)",color:"rgba(255,255,255,0.55)",lineHeight:1.7,maxWidth:560,marginBottom:36,animationDelay:"200ms",fontWeight:400},children:"The most comprehensive IBM Z reference. JCL, COBOL, REXX, DB2, CICS, IMS, RACF — every topic, every level, updated weekly."}),e.jsxs("div",{className:"fu",style:{display:"flex",gap:12,flexWrap:"wrap",animationDelay:"260ms"},children:[e.jsx("button",{className:"glow-btn",onClick:()=>q("topics"),style:{padding:"14px 32px",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",borderRadius:14,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:S,boxShadow:"0 4px 24px rgba(0,113,227,0.4),0 0 0 1px rgba(255,255,255,0.1) inset",transition:"transform 0.2s,box-shadow 0.2s"},children:"Explore Topics →"}),e.jsx("button",{onClick:()=>q("quiz"),style:{padding:"14px 28px",background:"rgba(255,255,255,0.06)",color:"#fff",border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:S,backdropFilter:"blur(10px)",transition:"all 0.2s"},onMouseOver:t=>{t.currentTarget.style.background="rgba(255,255,255,0.12)",t.currentTarget.style.borderColor="rgba(255,255,255,0.3)"},onMouseOut:t=>{t.currentTarget.style.background="rgba(255,255,255,0.06)",t.currentTarget.style.borderColor="rgba(255,255,255,0.15)"},children:"Take the Quiz"}),e.jsx("button",{onClick:()=>q("abends"),style:{padding:"14px 28px",background:"rgba(255,255,255,0.06)",color:"#fff",border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:S,backdropFilter:"blur(10px)",transition:"all 0.2s"},onMouseOver:t=>{t.currentTarget.style.background="rgba(255,255,255,0.12)",t.currentTarget.style.borderColor="rgba(255,255,255,0.3)"},onMouseOut:t=>{t.currentTarget.style.background="rgba(255,255,255,0.06)",t.currentTarget.style.borderColor="rgba(255,255,255,0.15)"},children:"Abend Solver"})]}),e.jsx("div",{className:"fu",style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:40,animationDelay:"320ms"},children:["JCL","COBOL","DB2","CICS","VSAM","REXX","IMS","RACF","z/OS","TSO"].map(t=>e.jsx("span",{style:{fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:980,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.45)",letterSpacing:"0.5px"},children:t},t))})]})]}),e.jsx("section",{style:{background:"#111827",position:"relative",zIndex:3},children:e.jsx("div",{style:{maxWidth:1e3,margin:"0 auto",padding:"0 24px",transform:"translateY(-40px)"},children:e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:0,flexWrap:"wrap",background:"rgba(8,11,22,0.95)",backdropFilter:"blur(20px)",borderRadius:20,padding:"24px 16px",boxShadow:"0 8px 40px rgba(0,0,0,0.3),0 0 0 1px rgba(255,255,255,0.06)"},children:[["15","Topics","📚"],["192+","Sections","📄"],["200","Quiz Qs","🧠"],["87","Abend Codes","🔍"],["6","Levels","🗺️"],["Weekly","AI Updates","🤖"]].map(([t,n,o],s)=>e.jsxs("div",{className:"fu stat-card",style:{flex:"1 1 120px",textAlign:"center",padding:"12px 8px",borderRadius:12,animationDelay:`${s*60}ms`,cursor:"default"},children:[e.jsx("div",{style:{fontSize:11,marginBottom:4},children:o}),e.jsx("div",{style:{fontSize:24,fontWeight:800,color:"#f1f5f9",letterSpacing:"-1px",lineHeight:1},children:t}),e.jsx("div",{style:{fontSize:11,color:"#94a3b8",fontWeight:600,marginTop:4},children:n})]},n))})})}),e.jsx("section",{style:{...i.section,background:"rgba(17,24,39,0.5)"},children:e.jsxs("div",{style:i.inner,children:[e.jsx("h2",{style:i.sectionTitle,children:"All Topics — A to Z."}),e.jsx("div",{style:i.topicsGrid,children:y.map((t,n)=>e.jsxs("button",{className:"card fu",style:{...i.topicCard,borderTop:`3px solid ${t.color}`,animationDelay:`${n*25}ms`},onClick:()=>Ne(t),children:[e.jsx("div",{style:{fontSize:32,marginBottom:12},children:t.icon}),e.jsx("div",{style:i.tcTitle,children:t.title}),e.jsx("div",{style:i.tcSub,children:t.subtitle}),e.jsx("div",{style:{fontSize:11,color:"#94a3b8",marginBottom:10},children:t.level}),e.jsx("div",{style:{...i.tcMore,color:Sa(t.color)},children:"Learn more →"})]},t.id))})]})}),e.jsx("section",{style:i.section,children:e.jsx("div",{style:i.inner,children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24},children:[e.jsxs("div",{className:"card",style:i.featureCard,onClick:()=>q("scenarios"),children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:"🎯"}),e.jsx("h3",{style:i.fcTitle,children:"Real-World Scenarios"}),e.jsx("p",{style:i.fcDesc,children:"Production abends, performance issues, security incidents. Solve real problems with expert analysis and step-by-step solutions."}),e.jsx("div",{style:{color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16},children:"Browse Scenarios →"})]}),e.jsxs("div",{className:"card",style:i.featureCard,onClick:()=>q("blog"),children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:"📰"}),e.jsx("h3",{style:i.fcTitle,children:"Expert Blog"}),e.jsx("p",{style:i.fcDesc,children:"Deep dives into mainframe topics. Why COBOL will outlive all of us. Debugging production abends at 3 AM. IMS vs DB2 explained."}),e.jsx("div",{style:{color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16},children:"Read Articles →"})]}),e.jsxs("div",{className:"card",style:i.featureCard,onClick:()=>q("weekly"),children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:"🔄"}),e.jsx("h3",{style:i.fcTitle,children:"Weekly AI Updates"}),e.jsx("p",{style:i.fcDesc,children:"Every Saturday, fresh content generated by AI for any mainframe topic. New tips, new scenarios, new code examples — always current."}),e.jsx("div",{style:{color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16},children:"Get This Week's Update →"})]}),e.jsxs("div",{className:"card",style:i.featureCard,onClick:()=>{de("chat"),q("community")},children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:"💬"}),e.jsx("h3",{style:i.fcTitle,children:"Community Hub"}),e.jsxs("p",{style:i.fcDesc,children:["WhatsApp-style group chat + Q&A forum. Jobs, doubts, knowledge sharing — all real-time with ",k.length,"+ members."]}),e.jsx("div",{style:{color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16},children:"Join the Community →"})]}),e.jsxs("div",{className:"card",style:i.featureCard,onClick:()=>q("abends"),children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:"🔍"}),e.jsx("h3",{style:i.fcTitle,children:"Abend Solver"}),e.jsx("p",{style:i.fcDesc,children:"Quick-search 30+ IBM ABEND codes with instant cause, fix, and pro tips. Debug production issues in seconds."}),e.jsx("div",{style:{color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16},children:"Search Abends →"})]}),e.jsxs("div",{className:"card",style:i.featureCard,onClick:()=>q("roadmap"),children:[e.jsx("div",{style:{fontSize:40,marginBottom:16},children:"🗺️"}),e.jsx("h3",{style:i.fcTitle,children:"Learning Roadmap"}),e.jsx("p",{style:i.fcDesc,children:"Your guided path from Trainee to Architect. Six levels with skills, milestones, and direct links to study material."}),e.jsx("div",{style:{color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16},children:"View Roadmap →"})]})]})})}),e.jsx("section",{style:{padding:"72px 0",background:"linear-gradient(180deg, rgba(8,11,22,0.95) 0%, rgba(12,18,32,0.95) 100%)"},children:e.jsx("div",{style:{...i.inner,display:"flex",flexDirection:"column",alignItems:"center"},children:e.jsxs("div",{style:{position:"relative",width:"100%",maxWidth:820,borderRadius:28,overflow:"hidden",background:"linear-gradient(135deg, #0a1628, #0d2040, #0a1628)",border:"1.5px solid rgba(0,113,227,0.15)",minHeight:420,cursor:"pointer",boxShadow:"0 24px 80px rgba(0,0,0,0.18), 0 0 60px rgba(0,113,227,0.06)"},onClick:()=>{ae(!0),re(0)},children:[e.jsx(Ve,{}),e.jsxs("div",{style:{position:"relative",zIndex:2,padding:"52px 44px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},children:[e.jsxs("div",{className:"fu",style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,179,101,0.12)",border:"1px solid rgba(0,179,101,0.25)",borderRadius:20,padding:"6px 16px",marginBottom:24,animationDelay:"0ms"},children:[e.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:"#00b365",boxShadow:"0 0 10px #00b365",animation:"commPulse 2s ease-in-out infinite"}}),e.jsxs("span",{style:{fontSize:13,color:"#00b365",fontWeight:600},children:[ke," members online now"]})]}),e.jsxs("h2",{className:"fu",style:{fontSize:"clamp(28px,4.5vw,46px)",fontWeight:800,color:"#fff",letterSpacing:"-1.5px",marginBottom:14,lineHeight:1.1,animationDelay:"80ms"},children:["Join Our ",e.jsx("span",{style:{background:"linear-gradient(135deg,#58a6ff,#0071e3)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Live Community"})]}),e.jsxs("p",{className:"fu",style:{fontSize:16,color:"rgba(255,255,255,0.55)",maxWidth:480,lineHeight:1.6,marginBottom:28,animationDelay:"160ms"},children:[k.length,"+ mainframe professionals sharing knowledge, posting jobs, solving doubts — all in real-time group chat."]}),e.jsx("div",{className:"fu",style:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:28,animationDelay:"240ms"},children:[{i:"💬",t:"Live Chat"},{i:"💼",t:"Jobs"},{i:"❓",t:"Doubt Solving"},{i:"💭",t:"Knowledge"},{i:"📊",t:"Polls"}].map((t,n)=>e.jsxs("span",{style:{padding:"5px 14px",borderRadius:20,fontSize:12,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.55)",display:"flex",alignItems:"center",gap:5},children:[t.i," ",t.t]},n))}),e.jsxs("div",{className:"fu",style:{display:"flex",marginBottom:28,animationDelay:"320ms"},children:[k.slice(0,6).map((t,n)=>e.jsx("div",{style:{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${t.color}35,${t.color}12)`,border:`2px solid ${t.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginLeft:n>0?-8:0,zIndex:6-n,boxShadow:`0 0 14px ${t.color}18`},children:t.emoji},n)),e.jsxs("div",{style:{width:40,height:40,borderRadius:"50%",background:"rgba(0,113,227,0.15)",border:"2px solid rgba(0,113,227,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#58a6ff",fontWeight:700,marginLeft:-8},children:["+",k.length-6]})]}),e.jsx("button",{className:"fu glow-btn",onClick:t=>{t.stopPropagation(),ae(!0),re(0)},style:{background:"#0071e3",color:"#fff",border:"none",borderRadius:980,padding:"14px 40px",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:S,boxShadow:"0 4px 24px rgba(0,113,227,0.4)",animationDelay:"400ms"},children:"Join Community →"})]})]})})})]}),m==="topics"&&e.jsx("div",{children:p?e.jsxs("div",{className:"fi",children:[e.jsx("div",{style:{...i.inner,paddingTop:24},children:e.jsx("button",{style:i.backBtn,onClick:()=>B(null),children:"‹ All Topics"})}),e.jsx("div",{style:{background:`linear-gradient(135deg,${p.color}15 0%,rgba(17,24,39,0.6) 50%,${p.color}08 100%)`,padding:"20px 0",borderBottom:"1px solid rgba(255,255,255,0.06)"},children:e.jsxs("div",{style:i.inner,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx("span",{style:{fontSize:40},children:p.icon}),e.jsxs("div",{children:[e.jsxs("h1",{style:{fontSize:28,fontWeight:800,letterSpacing:"-1px",color:"#f1f5f9",marginBottom:2},children:[p.title," Tutorial"]}),e.jsxs("div",{style:{fontSize:13,color:"#94a3b8"},children:["Progress ",e.jsx("span",{style:{fontWeight:700,color:p.color},children:D+1})," of ",p.sections.length," lessons"]})]})]}),e.jsx("div",{style:{marginTop:12,height:4,background:"rgba(255,255,255,0.08)",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${(D+1)/p.sections.length*100}%`,background:`linear-gradient(90deg,${p.color},${p.color}cc)`,borderRadius:4,transition:"width 0.3s ease"}})})]})}),e.jsxs("div",{className:"topic-layout",style:{...i.inner,display:"flex",gap:0,alignItems:"flex-start",paddingTop:0,paddingBottom:60},children:[e.jsxs("div",{className:"topic-sidebar",style:{width:300,flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.06)",position:"sticky",top:52,height:"calc(100vh - 52px)",overflowY:"auto",padding:"8px 0"},children:[e.jsxs("div",{style:{padding:"12px 16px 8px",marginBottom:4},children:[e.jsxs("div",{style:{fontSize:17,fontWeight:800,color:"#f1f5f9",marginBottom:2},children:[p.icon," ",p.title," Tutorial"]}),e.jsxs("div",{style:{fontSize:12,color:"#64748b"},children:[p.sections.length," Lessons"]})]}),(()=>{const t={},n=["Beginner","Intermediate","Advanced","Expert","All Levels","General"];p.sections.forEach((a,l)=>{const C=a.level||"General";t[C]||(t[C]=[]),t[C].push({...a,idx:l})});const o=Object.entries(t).sort((a,l)=>{const C=n.indexOf(a[0]),R=n.indexOf(l[0]);return(C===-1?99:C)-(R===-1?99:R)}),s=o.map(a=>a[0]).find(a=>t[a].some(l=>l.idx===D));return o.map(([a,l])=>{const C=je[a]!==void 0?je[a]:a===s,R=l.some(b=>b.idx===D);return e.jsxs("div",{style:{marginBottom:2},children:[e.jsxs("button",{onClick:()=>Rt(b=>({...b,[a]:!C})),style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"10px 16px",background:R?"rgba(255,255,255,0.03)":"transparent",border:"none",borderLeft:R?`3px solid ${p.color}`:"3px solid transparent",cursor:"pointer",fontFamily:S,transition:"all 0.15s"},children:[e.jsx("span",{style:{fontSize:13,fontWeight:600,color:R?"#f1f5f9":"#94a3b8",textAlign:"left"},children:a}),e.jsx("span",{style:{fontSize:12,color:"#64748b",transition:"transform 0.2s",transform:C?"rotate(90deg)":"rotate(0)",flexShrink:0},children:"▸"})]}),C&&l.map(b=>e.jsxs("button",{onClick:()=>{Z(b.idx),window.scrollTo(0,280)},style:{display:"flex",alignItems:"center",gap:8,width:"100%",textAlign:"left",padding:"8px 16px 8px 28px",background:D===b.idx?`${p.color}12`:"transparent",border:"none",cursor:"pointer",fontFamily:S,fontSize:12.5,color:D===b.idx?"#ffffff":"#94a3b8",fontWeight:D===b.idx?600:400,transition:"all 0.15s",lineHeight:1.4},children:[e.jsx("span",{style:{fontSize:14,color:D===b.idx?p.color:"#475569",flexShrink:0},children:(D===b.idx,"📄")}),e.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:b.title})]},b.idx))]},a)})})()]}),e.jsx("div",{className:"topic-mobile-nav",style:{width:"100%",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.06)"},children:e.jsx("select",{value:D,onChange:t=>Z(Number(t.target.value)),"aria-label":"Select lesson",style:{width:"100%",padding:"12px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.12)",fontSize:14,fontFamily:S,background:"#111827",color:"#f1f5f9",cursor:"pointer",appearance:"auto"},children:(()=>{const t={},n=["Beginner","Intermediate","Advanced","Expert","All Levels","General"];return p.sections.forEach((o,s)=>{const a=o.level||"General";t[a]||(t[a]=[]),t[a].push({...o,idx:s})}),Object.entries(t).sort((o,s)=>{const a=n.indexOf(o[0]),l=n.indexOf(s[0]);return(a===-1?99:a)-(l===-1?99:l)}).map(([o,s])=>e.jsx("optgroup",{label:o,children:s.map(a=>e.jsxs("option",{value:a.idx,children:[a.idx+1,". ",a.title]},a.idx))},o))})()})}),e.jsxs("div",{className:"topic-content-main scaleIn",children:[e.jsxs("div",{style:{fontSize:12,color:"#64748b",marginBottom:16},children:[e.jsx("span",{style:{cursor:"pointer",color:"#0071e3"},onClick:()=>B(null),children:"Topics"})," › ",e.jsx("span",{style:{cursor:"pointer",color:"#0071e3"},onClick:()=>Z(0),children:p.title})," › ",e.jsx("span",{style:{color:"#94a3b8"},children:p.sections[D].title})]}),e.jsx("h2",{style:{fontSize:28,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.5px",marginBottom:6},children:p.sections[D].title}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",marginBottom:24},children:[e.jsx("span",{style:{...i.diffBadge,background:p.sections[D].level==="Beginner"?"rgba(22,101,52,0.2)":p.sections[D].level==="Intermediate"?"rgba(30,64,175,0.2)":p.sections[D].level==="Advanced"?"rgba(107,33,168,0.2)":"rgba(153,27,27,0.2)",color:p.sections[D].level==="Beginner"?"#4ade80":p.sections[D].level==="Intermediate"?"#60a5fa":p.sections[D].level==="Advanced"?"#c084fc":"#f87171"},children:p.sections[D].level}),e.jsxs("span",{style:{fontSize:12,color:"#64748b"},children:["Lesson ",D+1," of ",p.sections.length]}),e.jsxs("span",{style:{fontSize:12,color:"#64748b"},children:["· ~",Math.max(3,Math.round((p.sections[D].content||"").length/900))," min read"]})]}),e.jsxs("div",{className:"content-card",style:{border:"none",boxShadow:"none",padding:0},children:[p.sections[D].content&&Pn(p.sections[D].content),p.sections[D].code&&e.jsxs("div",{style:i.codeWrap,children:[e.jsxs("div",{style:i.codeTopBar,children:[e.jsx("div",{style:{display:"flex",gap:6},children:["#ff5f57","#febc2e","#28c840"].map(t=>e.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:t}},t))}),e.jsx("span",{style:{fontSize:11,color:"#94a3b8",letterSpacing:"1px"},children:"CODE EXAMPLE"})]}),e.jsx("pre",{style:{...i.codePre,background:"#0f172a",color:"#f8fafc"},dangerouslySetInnerHTML:{__html:kt(p.sections[D].code)}})]})]}),e.jsxs("div",{style:{display:"flex",gap:12,marginTop:40,paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.06)"},children:[D>0&&e.jsxs("button",{onClick:()=>{Z(D-1),window.scrollTo(0,280)},style:{flex:1,padding:"14px 18px",borderRadius:12,border:"1.5px solid rgba(255,255,255,0.1)",background:"#111827",cursor:"pointer",textAlign:"left",fontFamily:S},children:[e.jsx("div",{style:{fontSize:11,color:"#64748b",marginBottom:4},children:"‹ Previous Lesson"}),e.jsx("div",{style:{fontSize:14,fontWeight:600,color:"#f1f5f9"},children:p.sections[D-1].title})]}),D<p.sections.length-1&&e.jsxs("button",{onClick:()=>{Z(D+1),window.scrollTo(0,280)},style:{flex:1,padding:"14px 18px",borderRadius:12,border:`1.5px solid ${p.color}50`,background:`${p.color}08`,cursor:"pointer",textAlign:"right",fontFamily:S},children:[e.jsx("div",{style:{fontSize:11,color:"#64748b",marginBottom:4},children:"Next Lesson ›"}),e.jsx("div",{style:{fontSize:14,fontWeight:600,color:p.color},children:p.sections[D+1].title})]})]})]},D)]}),e.jsxs("div",{style:{...i.inner,paddingBottom:60,borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:28,display:"flex",gap:16,flexWrap:"wrap"},children:[y[y.indexOf(p)-1]&&e.jsxs("button",{style:i.prevNextBtn,onClick:()=>Ne(y[y.indexOf(p)-1]),children:[e.jsx("span",{style:{fontSize:11,color:"#94a3b8",display:"block",marginBottom:4},children:"Previous"}),e.jsxs("span",{style:{fontSize:15,fontWeight:500},children:[y[y.indexOf(p)-1].icon," ",y[y.indexOf(p)-1].title]})]}),y[y.indexOf(p)+1]&&e.jsxs("button",{style:{...i.prevNextBtn,textAlign:"right",marginLeft:"auto"},onClick:()=>Ne(y[y.indexOf(p)+1]),children:[e.jsx("span",{style:{fontSize:11,color:"#94a3b8",display:"block",marginBottom:4},children:"Next"}),e.jsxs("span",{style:{fontSize:15,fontWeight:500},children:[y[y.indexOf(p)+1].icon," ",y[y.indexOf(p)+1].title]})]})]})]}):e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:"Topics"}),e.jsxs("p",{style:i.pageHeroSub,children:["Every IBM Z topic from absolute beginner to ultra pro. ",y.length," subjects, hundreds of code examples."]})]}),e.jsx("div",{style:{borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"14px 0",position:"sticky",top:52,background:"rgba(8,11,22,0.95)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",zIndex:100},children:e.jsxs("div",{style:{...i.inner,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[e.jsxs("div",{style:{position:"relative",flexShrink:0},children:[e.jsx("span",{style:{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#64748b",fontSize:14},children:"⌕"}),e.jsx("input",{role:"searchbox",style:i.searchInput,placeholder:"Search all topics…",value:Pt,onChange:t=>La(t.target.value)})]}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:ta.map(t=>e.jsx("button",{className:"pill",style:{...i.pill,background:Ze===t.id?"#0071e3":"rgba(30,41,59,0.8)",color:Ze===t.id?"#fff":"#94a3b8"},onClick:()=>Pa(t.id),children:t.label},t.id))})]})}),e.jsxs("div",{style:{...i.inner,paddingTop:32,paddingBottom:80},children:[e.jsx("div",{style:i.topicsGrid,children:na.map((t,n)=>e.jsxs("button",{className:"card fu",style:{...i.topicCard,borderTop:`3px solid ${t.color}`,animationDelay:`${n*20}ms`},onClick:()=>Ne(t),children:[e.jsx("div",{style:{fontSize:32,marginBottom:12},children:t.icon}),e.jsx("div",{style:i.tcTitle,children:t.title}),e.jsx("div",{style:i.tcSub,children:t.subtitle}),e.jsx("div",{style:{fontSize:11,color:"#94a3b8",marginBottom:10},children:t.level}),e.jsx("div",{style:{...i.tcMore,color:Sa(t.color)},children:"Learn more →"})]},t.id))}),na.length===0&&e.jsxs("div",{style:{textAlign:"center",padding:"80px 0",color:"#94a3b8"},children:[e.jsx("div",{style:{fontSize:48,marginBottom:12},children:"🔍"}),'No results for "',Pt,'"']})]})]})}),m==="scenarios"&&e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:"Real-World Scenarios"}),e.jsx("p",{style:i.pageHeroSub,children:"Production incidents, performance crises, security audits. Learn from real problems with expert step-by-step solutions."})]}),e.jsx("div",{style:{borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"12px 0",position:"sticky",top:52,background:"rgba(8,11,22,0.95)",backdropFilter:"blur(20px)",zIndex:100},children:e.jsxs("div",{style:{...i.inner,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,color:"#94a3b8",fontWeight:500},children:"Category:"}),Do.map(t=>e.jsx("button",{className:"pill",style:{...i.pill,fontSize:11,padding:"5px 12px",background:_e===t?"#0071e3":"rgba(30,41,59,0.8)",color:_e===t?"#fff":"#94a3b8"},onClick:()=>Ma(t),children:t},t)),e.jsx("span",{style:{fontSize:12,color:"#94a3b8",fontWeight:500,marginLeft:8},children:"Level:"}),Io.map(t=>e.jsx("button",{className:"pill",style:{...i.pill,fontSize:11,padding:"5px 12px",background:$e===t?"#0071e3":"rgba(255,255,255,0.1)",color:$e===t?"#fff":"#94a3b8"},onClick:()=>ba(t),children:t},t))]})}),e.jsx("div",{style:{...i.inner,paddingTop:28,paddingBottom:80},children:To.map((t,n)=>e.jsxs("div",{className:"scenario-card fu",style:{border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:16,marginBottom:16,overflow:"hidden",animationDelay:`${n*60}ms`},children:[e.jsx("button",{style:{width:"100%",background:"none",border:"none",padding:"20px 24px",cursor:"pointer",textAlign:"left",fontFamily:S},onClick:()=>Sn(Nt===t.id?null:t.id),children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[e.jsx("span",{style:{...i.diffBadge,background:t.difficulty==="Beginner"?"rgba(22,101,52,0.2)":t.difficulty==="Intermediate"?"rgba(133,77,14,0.2)":"rgba(153,27,27,0.2)",color:t.difficulty==="Beginner"?"#4ade80":t.difficulty==="Intermediate"?"#fbbf24":"#f87171"},children:t.difficulty}),e.jsx("span",{style:{...i.diffBadge,background:"rgba(30,64,175,0.15)",color:"#60a5fa"},children:t.category}),e.jsx("h3",{style:{fontSize:16,fontWeight:600,color:"#f1f5f9",flex:1,textAlign:"left"},children:t.question}),e.jsx("span",{style:{fontSize:20,color:"#94a3b8",transition:"transform .2s",transform:Nt===t.id?"rotate(180deg)":"none"},children:"⌄"})]})}),Nt===t.id&&e.jsxs("div",{className:"fi",style:{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"24px"},children:[e.jsx("div",{style:{marginBottom:12,fontSize:13,fontWeight:600,color:"#0071e3"},children:"Expert Answer & Solution:"}),e.jsx("div",{style:{background:"#111827",padding:24,borderRadius:14,border:"1px solid rgba(255,255,255,0.08)"},children:t.answer.split(`
`).map((o,s)=>{const a=o.trim();if(!a)return null;if(a.match(/^\d+[\.\)]/)){const l=a.match(/^(\d+)/)[1],C=a.replace(/^\d+[\.\)]\s*/,"");return e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8},children:[e.jsx("span",{style:{width:24,height:24,borderRadius:8,background:"#0071e312",color:"#0071e3",fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2},children:l}),e.jsx("span",{style:{fontSize:14.5,color:"#cbd5e1",lineHeight:1.8},children:C})]},s)}return e.jsx("p",{style:{fontSize:14.5,color:"#cbd5e1",lineHeight:1.8,marginBottom:6},children:a},s)})}),e.jsx("div",{style:{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"},children:t.tags.map(o=>e.jsxs("span",{style:{fontSize:11,background:"#1e293b",color:"#94a3b8",padding:"3px 10px",borderRadius:980},children:["#",o]},o))})]})]},t.id))})]}),m==="blog"&&e.jsxs("div",{children:[e.jsx("div",{style:i.pageHero,children:e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:16},children:[e.jsxs("div",{children:[e.jsx("h1",{style:i.pageHeroTitle,children:"Expert Blog"}),e.jsx("p",{style:i.pageHeroSub,children:"Deep technical insights, career guidance, and industry perspective from mainframe practitioners."})]}),Ht&&e.jsx("button",{onClick:()=>Wt(!Nn),className:"glow-btn",style:{...i.btnBlue,fontSize:14,padding:"10px 22px",marginTop:8,whiteSpace:"nowrap"},children:"✍️ Write Expert Blog"}),c&&!Ht&&e.jsx("div",{style:{fontSize:12,color:"#94a3b8",background:"rgba(30,41,59,0.8)",borderRadius:10,padding:"8px 14px",maxWidth:220,marginTop:8},children:"💡 Members with 5+ years experience can write expert blogs"})]})}),e.jsxs("div",{style:{...i.inner,paddingBottom:80},children:[Nn&&Ht&&e.jsxs("div",{className:"scaleIn",style:{background:"rgba(17,24,39,0.9)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:32,marginBottom:32,boxShadow:"0 8px 32px rgba(0,0,0,0.3)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20},children:[e.jsx(Xe,{name:c.name,size:40,showRing:!0}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:15,fontWeight:700},children:c.name}),e.jsxs("div",{style:{fontSize:12,color:"#94a3b8"},children:[c.role," · ",c.mfYears," yrs mainframe experience"]})]}),e.jsx("span",{style:{marginLeft:"auto",fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:980,background:"linear-gradient(135deg,#059669,#0d9488)",color:"#fff"},children:"✦ Expert Author"})]}),e.jsx("input",{value:Q.title,onChange:t=>ot({...Q,title:t.target.value}),placeholder:"Blog title — make it compelling *",style:{width:"100%",padding:"14px 16px",fontSize:18,fontWeight:700,border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:12,outline:"none",fontFamily:S,background:"rgba(30,41,59,0.6)",marginBottom:14,color:"#f1f5f9"}}),e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:14},children:[e.jsx("select",{value:Q.category,onChange:t=>ot({...Q,category:t.target.value}),style:{padding:"8px 14px",fontSize:13,border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:10,outline:"none",fontFamily:S,background:"rgba(30,41,59,0.6)",cursor:"pointer",color:"#f1f5f9"},children:Va.map(t=>e.jsx("option",{children:t},t))}),e.jsx("span",{style:{fontSize:12,color:"#94a3b8",alignSelf:"center"},children:Q.content?Math.max(1,Math.round(Q.content.split(/\s+/).length/200))+" min read":""})]}),e.jsx("textarea",{value:Q.content,onChange:t=>ot({...Q,content:t.target.value}),placeholder:`Share your expertise...

Write about real-world experiences, technical deep dives, best practices, lessons learned, or career advice.

Tip: Use clear paragraphs and include code examples where relevant.`,rows:14,style:{width:"100%",padding:"16px",fontSize:15,lineHeight:1.8,border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:12,outline:"none",fontFamily:S,background:"rgba(30,41,59,0.6)",resize:"vertical",minHeight:200,color:"#cbd5e1"}}),e.jsxs("div",{style:{display:"flex",gap:10,marginTop:16},children:[e.jsx("button",{onClick:ja,className:"glow-btn",style:{...i.btnBlue,fontSize:14,padding:"10px 24px",opacity:Q.title&&Q.content?1:.5},children:"Publish Blog"}),e.jsx("button",{onClick:()=>Wt(!1),style:{...i.btnGhost,fontSize:14,padding:"10px 20px"},children:"Cancel"})]})]}),dn?e.jsxs("div",{className:"fi",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("button",{style:i.backBtn,onClick:()=>yt(null),children:"‹ Blog"}),(()=>{const t=yn.find(n=>n.id===dn);return t?e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{...i.diffBadge,background:"rgba(30,64,175,0.15)",color:"#60a5fa"},children:t.category}),e.jsx("span",{style:{...i.diffBadge,background:"#1e293b",color:"#94a3b8"},children:t.readTime}),e.jsx("span",{style:{...i.diffBadge,background:"#1e293b",color:"#94a3b8"},children:t.date}),t.isUserBlog&&e.jsx("span",{style:{...i.diffBadge,background:"linear-gradient(135deg,#059669,#0d9488)",color:"#fff"},children:"✦ Community Expert"})]}),e.jsx("h1",{style:{fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-1px",color:"#f1f5f9",marginBottom:16,lineHeight:1.2},children:t.title}),t.isUserBlog&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:28,padding:"16px 20px",background:"rgba(30,41,59,0.7)",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",fontSize:18,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"},children:t.author?.charAt(0)}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:15,fontWeight:700,color:"#f1f5f9"},children:t.author}),e.jsxs("div",{style:{fontSize:12,color:"#94a3b8"},children:[t.authorRole," · ",t.authorMfYears," years mainframe experience"]})]}),e.jsxs("button",{onClick:n=>{n.stopPropagation(),za(t.id)},style:{marginLeft:"auto",background:"none",border:"1.5px solid #fecaca",borderRadius:10,padding:"6px 14px",cursor:"pointer",fontSize:13,color:"#ef4444",fontFamily:S,fontWeight:600},children:["❤️ ",t.likes||0]})]}),e.jsx("div",{className:"content-card",style:{padding:"36px 40px"},children:e.jsx("div",{style:{fontSize:16,color:"#cbd5e1",lineHeight:1.9,whiteSpace:"pre-wrap"},children:t.content})})]}):null})()]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24},children:yn.map((t,n)=>e.jsxs("button",{className:"card fu",onClick:()=>yt(t.id),style:{...i.blogCard,animationDelay:`${n*60}ms`},children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{...i.diffBadge,background:"rgba(30,64,175,0.15)",color:"#60a5fa"},children:t.category}),e.jsx("span",{style:{...i.diffBadge,background:"#1e293b",color:"#94a3b8"},children:t.readTime}),t.isUserBlog&&e.jsx("span",{style:{...i.diffBadge,background:"linear-gradient(135deg,#059669,#0d9488)",color:"#fff"},children:"✦ Community"})]}),e.jsx("h3",{style:{fontSize:18,fontWeight:700,color:"#f1f5f9",lineHeight:1.4,marginBottom:12,textAlign:"left"},children:t.title}),e.jsxs("p",{style:{fontSize:13,color:"#94a3b8",marginBottom:16,textAlign:"left"},children:[t.content.substring(0,150),"…"]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{fontSize:12,color:"#94a3b8",textAlign:"left"},children:[t.isUserBlog?e.jsxs(e.Fragment,{children:[e.jsx("strong",{style:{color:"#f1f5f9"},children:t.author})," · ",t.authorRole," · "]}):"",t.date]}),t.isUserBlog&&t.likes>0&&e.jsxs("span",{style:{fontSize:12,color:"#ef4444"},children:["❤️ ",t.likes]})]}),e.jsx("div",{style:{color:"#0071e3",fontSize:13,fontWeight:500,marginTop:12,textAlign:"left"},children:"Read Article →"})]},t.id))})]})]}),m==="quiz"&&e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:$?"Daily Challenge":"Knowledge Quiz"}),e.jsx("p",{style:i.pageHeroSub,children:$?"5 questions • One attempt per day • Beat the clock!":`${De.length} questions across all mainframe topics. Beginner to expert level.`})]}),e.jsxs("div",{style:{...i.inner,paddingBottom:80},children:[!$&&e.jsxs("div",{className:"fi",style:{background:"linear-gradient(135deg,#0f172a,#1e1b4b)",borderRadius:20,padding:"28px 28px",marginBottom:28,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap",justifyContent:"space-between",border:"1px solid rgba(124,58,237,0.2)",boxShadow:"0 4px 24px rgba(0,0,0,0.1)"},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:6},children:[e.jsx("span",{style:{fontSize:28},children:"🏆"}),e.jsx("span",{style:{color:"#f59e0b",fontSize:18,fontWeight:800,letterSpacing:"-0.3px"},children:"Daily Challenge"}),Ke()>0&&e.jsxs("span",{style:{background:"rgba(239,68,68,0.2)",color:"#f87171",padding:"3px 10px",borderRadius:980,fontSize:12,fontWeight:700},children:["🔥 ",Ke(),"-day streak"]})]}),e.jsx("p",{style:{color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:1.5},children:se?`Today's score: ${se.score}/5 in ${se.time}s — Come back tomorrow!`:"5 random questions. Timed. One attempt per day. How fast can you go?"})]}),se?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("div",{style:{fontSize:28,fontWeight:800,color:"#f59e0b"},children:[se.score,"/5"]}),e.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.4)"},children:[se.time,"s"]})]}),e.jsx("div",{style:{fontSize:32},children:se.score===5?"🏅":se.score>=3?"⭐":"💪"})]}):e.jsx("button",{onClick:Ra,className:"glow-btn",style:{padding:"12px 28px",background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:S,whiteSpace:"nowrap",flexShrink:0},children:"Start Challenge →"})]}),$&&!P.done&&e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,background:"rgba(30,41,59,0.8)",borderRadius:12,padding:"10px 18px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{style:{fontSize:18},children:"⏱️"}),e.jsxs("span",{style:{fontSize:20,fontWeight:800,color:"#f1f5f9",fontFamily:"'SF Mono',Menlo,monospace"},children:[Math.floor(ze/60),":",String(ze%60).padStart(2,"0")]})]}),e.jsx("button",{onClick:()=>{Ot(!1),clearInterval(ht.current),le({index:0,score:0,selected:null,done:!1,showExp:!1})},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:13,fontFamily:S},children:"✕ Exit Challenge"})]}),!$&&e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24,justifyContent:"center"},children:Ia.map(t=>e.jsx("button",{onClick:()=>{Da(t),le({index:0,score:0,selected:null,done:!1,showExp:!1})},style:{padding:"6px 14px",borderRadius:980,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:S,border:"none",background:Ae===t?"linear-gradient(135deg,#0071e3,#7c3aed)":"rgba(30,41,59,0.8)",color:Ae===t?"#fff":"#94a3b8",transition:"all .15s"},children:t==="All"?`All (${De.length})`:`${t} (${De.filter(n=>n.topic===t).length})`},t))}),(()=>{const t=$?ln:sn;return e.jsx("div",{style:{maxWidth:640,margin:"0 auto"},children:t.length===0?e.jsx("div",{style:{textAlign:"center",padding:60,color:"#94a3b8"},children:"No questions for this topic yet."}):P.done?e.jsxs("div",{className:"fi",style:{textAlign:"center",padding:"60px 0"},children:[$&&e.jsx("div",{style:{marginBottom:16},children:e.jsxs("span",{style:{background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",padding:"6px 16px",borderRadius:980,fontSize:13,fontWeight:700},children:["⏱️ Completed in ",ze,"s"]})}),e.jsxs("div",{style:{fontSize:72,fontWeight:800,letterSpacing:"-3px",color:"#f1f5f9",lineHeight:1,marginBottom:8},children:[P.score,"/",t.length]}),e.jsx("div",{style:{fontSize:24,fontWeight:700,letterSpacing:"-.5px",color:"#f1f5f9",marginBottom:10},children:P.score===t.length?"🏆 Perfect — Mainframe Master!":P.score>=t.length*.8?"🎉 Expert Level":P.score>=t.length*.5?"📚 Solid Knowledge":"💪 Keep Learning"}),e.jsx("p",{style:{color:"#94a3b8",fontSize:15,marginBottom:28},children:$?`Daily Challenge — ${new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}${Ke()>0?` • 🔥 ${Ke()}-day streak`:""}`:`${Math.round(P.score/t.length*100)}% correct${Ae!=="All"?` in ${Ae}`:""}`}),e.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"},children:[$?e.jsx("button",{style:i.btnBlue,onClick:()=>{Ot(!1),aa()},children:"Back to Quiz"}):e.jsx("button",{style:i.btnBlue,onClick:aa,children:"Try Again"}),e.jsx("button",{style:i.btnGhost,onClick:()=>q("topics"),children:"Study Topics"}),e.jsx("button",{style:i.btnGhost,onClick:()=>q("scenarios"),children:"Practice Scenarios"})]})]}):e.jsxs("div",{className:"fi",children:[e.jsx("div",{style:{height:4,background:"#1e293b",borderRadius:2,marginBottom:20,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:$?"#f59e0b":"#0071e3",borderRadius:2,width:`${P.index/t.length*100}%`,transition:"width .4s ease"}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:24,fontSize:13,color:"#94a3b8"},children:[e.jsxs("span",{children:["Question ",P.index+1," of ",t.length]}),e.jsxs("span",{children:["Score: ",P.score,"/",P.index]})]}),t[P.index].topic&&e.jsx("span",{style:{display:"inline-block",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:980,marginBottom:14,background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff"},children:t[P.index].topic}),e.jsx("h2",{style:{fontSize:"clamp(17px,2.5vw,22px)",fontWeight:700,color:"#f1f5f9",letterSpacing:"-.5px",lineHeight:1.4,marginBottom:24},children:t[P.index].q}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:t[P.index].options.map((n,o)=>{let s="#1e293b",a="1.5px solid rgba(255,255,255,0.12)",l="#e2e8f0",C="rgba(30,41,59,0.8)",R="#94a3b8";return P.selected!==null&&(o===t[P.index].answer?(s="rgba(22,163,74,0.15)",a="1.5px solid #22c55e",l="#4ade80",C="#22c55e",R="#fff"):o===P.selected&&(s="rgba(239,68,68,0.15)",a="1.5px solid #ef4444",l="#fca5a5",C="#ef4444",R="#fff")),e.jsxs("button",{onClick:()=>uo(o),style:{display:"flex",alignItems:"center",gap:12,padding:"15px 18px",borderRadius:12,cursor:"pointer",fontSize:15,textAlign:"left",fontFamily:S,background:s,border:a,color:l,transition:"all .15s",width:"100%"},children:[e.jsx("span",{style:{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,flexShrink:0,background:C,color:R,transition:"all .2s"},children:String.fromCharCode(65+o)}),n]},o)})}),P.showExp&&P.selected!==null&&e.jsxs("div",{className:"fi",style:{marginTop:20,padding:16,background:"rgba(17,24,39,0.8)",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)"},children:[e.jsx("div",{style:{fontSize:13,fontWeight:600,color:"#0071e3",marginBottom:8},children:P.selected===t[P.index].answer?"✅ Correct!":"❌ Incorrect"}),e.jsx("div",{style:{fontSize:13,color:"#cbd5e1",lineHeight:1.6},children:t[P.index].explanation})]})]},P.index)})})()]})]}),m==="weekly"&&e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:"Weekly AI Update"}),e.jsxs("p",{style:i.pageHeroSub,children:["Every Saturday, fresh mainframe content generated by AI. Pick any topic — get new tips, scenarios, and code examples.",En&&e.jsxs("span",{style:{display:"block",fontSize:13,color:"#94a3b8",marginTop:6},children:["Last updated: ",new Date(En).toLocaleDateString()]})]})]}),e.jsxs("div",{style:{...i.inner,paddingBottom:80},children:[e.jsxs("div",{style:{marginBottom:32},children:[e.jsx("h3",{style:{fontSize:17,fontWeight:700,color:"#f1f5f9",marginBottom:16},children:"Choose a topic to update:"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10},children:y.map(t=>e.jsxs("button",{onClick:()=>oa(t),style:{background:ie?.id===t.id?"#0071e3":"rgba(30,41,59,0.8)",color:ie?.id===t.id?"#fff":"#94a3b8",border:"none",borderRadius:12,padding:"12px 16px",cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:S,textAlign:"left",display:"flex",alignItems:"center",gap:8,transition:"background .2s,color .2s"},children:[t.icon," ",t.title]},t.id))})]}),Mt&&e.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[e.jsx("div",{style:{width:40,height:40,border:"3px solid rgba(255,255,255,0.1)",borderTop:"3px solid #0071e3",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}}),e.jsxs("div",{style:{fontSize:16,color:"#94a3b8"},children:["Fetching fresh content for ",ie?.title,"…"]}),e.jsx("div",{style:{fontSize:13,color:"#94a3b8",marginTop:6},children:"This may take a moment"})]}),xt&&e.jsxs("div",{style:{background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:12,padding:20,color:"#fca5a5",marginBottom:24},children:[e.jsx("strong",{children:"Error:"})," ",xt,e.jsx("br",{}),e.jsx("span",{style:{fontSize:13},children:"Make sure you're connected to the internet and try again."})]}),H&&!Mt&&e.jsxs("div",{className:"fi",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:24},children:[e.jsxs("div",{children:[e.jsxs("h2",{style:{fontSize:22,fontWeight:700,color:"#f1f5f9"},children:[ie?.icon," ",ie?.title," — Weekly Update"]}),e.jsxs("div",{style:{fontSize:13,color:"#94a3b8",marginTop:4},children:["Generated: ",H.generatedDate]})]}),e.jsx("button",{style:{...i.btnGhost,fontSize:13,padding:"8px 16px"},onClick:mo,children:"↻ Refresh Content"})]}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:24,flexWrap:"wrap"},children:["tip","scenario","code","facts"].map(t=>e.jsx("button",{onClick:()=>Cn(t),style:{background:he===t?"#0071e3":"rgba(30,41,59,0.8)",color:he===t?"#fff":"#94a3b8",border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:S,textTransform:"capitalize"},children:t==="tip"?"💡 New Tip":t==="scenario"?"🎯 New Scenario":t==="code"?"💻 Code Example":"📊 Key Facts"},t))}),he==="tip"&&H.tip&&e.jsxs("div",{className:"fi",style:{background:"rgba(17,24,39,0.8)",borderRadius:16,padding:28,border:"1px solid rgba(255,255,255,0.08)"},children:[e.jsx("h3",{style:{fontSize:18,fontWeight:700,color:"#f1f5f9",marginBottom:16},children:H.tip.title}),e.jsx("div",{style:{fontSize:15,color:"#cbd5e1",lineHeight:1.8,whiteSpace:"pre-wrap"},children:H.tip.content})]}),he==="scenario"&&H.scenario&&e.jsxs("div",{className:"fi",children:[e.jsxs("div",{style:{background:"rgba(30,64,175,0.15)",borderRadius:12,padding:20,border:"1px solid #bfdbfe",marginBottom:16},children:[e.jsx("div",{style:{fontSize:13,fontWeight:600,color:"#60a5fa",marginBottom:8},children:"Scenario Question:"}),e.jsx("div",{style:{fontSize:15,color:"#1e3a8a",fontWeight:500,lineHeight:1.6},children:H.scenario.question})]}),e.jsxs("div",{style:{background:"rgba(34,197,94,0.12)",borderRadius:12,padding:20,border:"1px solid rgba(34,197,94,0.25)"},children:[e.jsx("div",{style:{fontSize:13,fontWeight:600,color:"#4ade80",marginBottom:8},children:"Expert Answer:"}),e.jsx("pre",{style:{fontSize:14,color:"#14532d",lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:S},children:H.scenario.answer})]})]}),he==="code"&&H.code&&e.jsxs("div",{className:"fi",children:[e.jsx("h3",{style:{fontSize:17,fontWeight:700,color:"#f1f5f9",marginBottom:12},children:H.code.title}),e.jsxs("div",{style:i.codeWrap,children:[e.jsx("div",{style:i.codeTopBar,children:e.jsx("div",{style:{display:"flex",gap:6},children:["#ff5f57","#febc2e","#28c840"].map(t=>e.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:t}},t))})}),e.jsx("pre",{style:{...i.codePre,background:"#0f172a",color:"#f8fafc"},dangerouslySetInnerHTML:{__html:kt(H.code.snippet)}})]}),H.code.explanation&&e.jsx("div",{style:{marginTop:16,fontSize:15,color:"#cbd5e1",lineHeight:1.7,padding:"16px 20px",background:"rgba(17,24,39,0.8)",borderRadius:12},children:H.code.explanation})]}),he==="facts"&&H.facts&&e.jsx("div",{className:"fi",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:H.facts.map((t,n)=>e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"flex-start",background:"rgba(17,24,39,0.8)",borderRadius:12,padding:20,border:"1px solid rgba(255,255,255,0.08)"},children:[e.jsx("div",{style:{fontSize:24,fontWeight:800,color:"#0071e3",minWidth:32,lineHeight:1},children:n+1}),e.jsx("div",{style:{fontSize:15,color:"#cbd5e1",lineHeight:1.6},children:t})]},n))})})]}),!Mt&&!H&&!xt&&e.jsxs("div",{style:{textAlign:"center",padding:"60px 0",color:"#94a3b8"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:16},children:"🔄"}),e.jsx("div",{style:{fontSize:18,fontWeight:600,color:"#f1f5f9",marginBottom:8},children:"Select a topic above"}),e.jsx("div",{style:{fontSize:15},children:"AI will generate fresh tips, a new scenario, a code example, and key facts — every Saturday."})]})]})]}),m==="playground"&&e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:"🧪 Code Lab"}),e.jsx("p",{style:i.pageHeroSub,children:"Paste JCL, COBOL, REXX, or DB2 SQL — get instant AI-powered explanations, error detection, and execution simulation."})]}),e.jsxs("div",{style:{...i.inner,paddingTop:24,paddingBottom:80},children:[e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16,alignItems:"center"},children:[["JCL","COBOL","REXX","DB2 SQL"].map(t=>e.jsx("button",{onClick:()=>{Kn(t),St(co[t]),Le(null)},style:{padding:"8px 16px",borderRadius:10,border:me===t?"2px solid #0071e3":"2px solid rgba(255,255,255,0.12)",background:me===t?"rgba(0,113,227,0.15)":"rgba(30,41,59,0.6)",color:me===t?"#60a5fa":"#94a3b8",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:S},children:t},t)),e.jsx("div",{style:{marginLeft:"auto",display:"flex",gap:6},children:[["explain","💡 Explain"],["errors","🔍 Find Errors"],["simulate","▶️ Simulate"]].map(([t,n])=>e.jsx("button",{onClick:()=>lo(t),style:{padding:"8px 14px",borderRadius:10,border:ee===t?"2px solid #7c3aed":"2px solid rgba(255,255,255,0.12)",background:ee===t?"rgba(124,58,237,0.15)":"rgba(30,41,59,0.6)",color:ee===t?"#a78bfa":"#94a3b8",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:S},children:n},t))})]}),e.jsxs("div",{style:{borderRadius:16,overflow:"hidden",border:"1.5px solid rgba(255,255,255,0.1)",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",background:"#1e293b"},children:[e.jsx("div",{style:{display:"flex",gap:6},children:["#ff5f57","#febc2e","#28c840"].map(t=>e.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:t}},t))}),e.jsx("span",{style:{fontSize:11,color:"#64748b",letterSpacing:"1px",fontFamily:Tt},children:me}),e.jsx("button",{onClick:So,disabled:We,style:{background:We?"#64748b":"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",borderRadius:8,padding:"6px 18px",fontSize:12,fontWeight:700,cursor:We?"wait":"pointer",fontFamily:S},children:We?"Analyzing...":ee==="explain"?"💡 Explain Code":ee==="errors"?"🔍 Find Errors":"▶️ Run Simulation"})]}),e.jsx("textarea",{value:Ge,onChange:t=>St(t.target.value),"aria-label":"Code editor",spellCheck:!1,style:{width:"100%",minHeight:280,padding:"20px",margin:0,border:"none",resize:"vertical",background:"#0f172a",color:"#f8fafc",fontSize:13.5,lineHeight:1.8,fontFamily:Tt,outline:"none",tabSize:2},onKeyDown:t=>{if(t.key==="Tab"){t.preventDefault();const n=t.target.selectionStart;St(Ge.substring(0,n)+"  "+Ge.substring(t.target.selectionEnd)),setTimeout(()=>{t.target.selectionStart=t.target.selectionEnd=n+2},0)}}})]}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:12,color:"#64748b",lineHeight:"32px"},children:"Try:"}),[["JCL","SORT Job",`//SORTJOB JOB ,'SORT',CLASS=A
//STEP1  EXEC PGM=SORT
//SORTIN DD DSN=MY.INPUT.FILE,DISP=SHR
//SORTOUT DD DSN=MY.OUTPUT.FILE,
//          DISP=(NEW,CATLG,DELETE),
//          SPACE=(CYL,(10,5),RLSE)
//SYSIN DD *
  SORT FIELDS=(1,10,CH,A)
  OUTREC FIELDS=(1,80)
/*`],["COBOL","File Processing",`       IDENTIFICATION DIVISION.
       PROGRAM-ID. FILREAD.
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT INFILE ASSIGN TO INDD
             FILE STATUS IS WS-FS.
       DATA DIVISION.
       FILE SECTION.
       FD INFILE RECORDING MODE F.
       01 IN-REC PIC X(80).
       WORKING-STORAGE SECTION.
       01 WS-FS PIC XX.
       01 WS-EOF PIC 9 VALUE 0.
       01 WS-COUNT PIC 9(6) COMP VALUE 0.
       PROCEDURE DIVISION.
           OPEN INPUT INFILE
           PERFORM UNTIL WS-EOF = 1
             READ INFILE
               AT END MOVE 1 TO WS-EOF
               NOT AT END ADD 1 TO WS-COUNT
             END-READ
           END-PERFORM
           CLOSE INFILE
           DISPLAY 'RECORDS READ: ' WS-COUNT
           STOP RUN.`],["DB2 SQL","Employee Report",`SELECT D.DEPTNAME,
       COUNT(*) AS EMP_COUNT,
       AVG(E.SALARY) AS AVG_SALARY,
       MAX(E.SALARY) AS MAX_SALARY
FROM EMPLOYEE E
INNER JOIN DEPARTMENT D
  ON E.WORKDEPT = D.DEPTNO
GROUP BY D.DEPTNAME
HAVING COUNT(*) > 5
ORDER BY AVG_SALARY DESC;`]].map(([t,n,o])=>e.jsx("button",{onClick:()=>{Kn(t),St(o),Le(null)},style:{padding:"4px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)",background:"#0f172a",color:"#94a3b8",fontSize:11,cursor:"pointer",fontFamily:S},children:n},n))]}),Qn&&e.jsxs("div",{style:{marginTop:24,borderRadius:16,border:"1px solid rgba(0,113,227,0.15)",background:"rgba(0,113,227,0.08)",padding:"24px 28px",animation:"fadeUp 0.3s ease"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:16},children:[e.jsx("span",{style:{fontSize:20},children:ee==="explain"?"💡":ee==="errors"?"🔍":"▶️"}),e.jsx("span",{style:{fontSize:16,fontWeight:700,color:"#f1f5f9"},children:ee==="explain"?"Code Explanation":ee==="errors"?"Error Analysis":"Execution Simulation"})]}),e.jsx("div",{style:i.contentPre,children:Pn(Qn)})]}),We&&e.jsxs("div",{style:{marginTop:24,textAlign:"center",padding:"40px 0"},children:[e.jsx("div",{style:{width:40,height:40,border:"3px solid rgba(255,255,255,0.12)",borderTop:"3px solid #0071e3",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 16px"}}),e.jsx("p",{style:{fontSize:14,color:"#94a3b8"},children:ee==="explain"?"Analyzing your code line by line...":ee==="errors"?"Checking for errors and bad practices...":"Simulating execution on z/OS..."})]})]})]}),m==="community"&&e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:"💬 Community"}),e.jsx("p",{style:i.pageHeroSub,children:"Real-time group chat, job postings, doubt solving & Q&A — all in one place."}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:20},children:[e.jsx("button",{onClick:()=>de("chat"),style:{padding:"10px 24px",borderRadius:980,border:V==="chat"||V===null?"none":"1.5px solid rgba(255,255,255,0.12)",background:V==="chat"||V===null?"#0071e3":"rgba(30,41,59,0.8)",color:V==="chat"||V===null?"#fff":"#94a3b8",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:S},children:"🖥️ Group Chat"}),e.jsx("button",{onClick:()=>de("qa"),style:{padding:"10px 24px",borderRadius:980,border:V==="qa"?"none":"1.5px solid rgba(255,255,255,0.12)",background:V==="qa"?"#0071e3":"rgba(30,41,59,0.8)",color:V==="qa"?"#fff":"#94a3b8",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:S},children:"❓ Q&A Forum"})]})]}),(V==="chat"||V===null)&&e.jsx("div",{style:{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"},children:Ye?e.jsxs("div",{style:{border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:20,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.3)",height:"70vh",display:"flex"},children:[e.jsxs("div",{style:{width:Qt?260:0,minWidth:Qt?260:0,background:"#0f172a",borderRight:"1px solid rgba(255,255,255,0.12)",transition:"all 0.3s",overflow:"hidden",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("span",{style:{fontSize:13,fontWeight:700,color:"#f1f5f9"},children:["Members (",k.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{onClick:()=>so(),style:{background:"rgba(0,113,227,0.15)",border:"none",borderRadius:8,color:"#0071e3",padding:"3px 8px",cursor:"pointer",fontSize:11,fontWeight:600},children:"+ Add"}),e.jsx("button",{onClick:()=>wn(!1),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:14},"aria-label":"Close",children:"✕"})]})]}),e.jsx("div",{style:{flex:1,overflowY:"auto",padding:"4px 0"},children:k.map((t,n)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 16px"},children:[e.jsx(Ta,{m:t,sz:30}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{fontSize:12,color:"#f1f5f9",fontWeight:600,display:"flex",alignItems:"center",gap:4},children:[t.name,n===0&&e.jsx("span",{style:{fontSize:9,background:"#e8f8f0",color:"#00b365",padding:"1px 5px",borderRadius:6},children:"Admin"}),n===nn&&e.jsx("span",{style:{fontSize:9,background:"rgba(0,113,227,0.15)",color:"#0071e3",padding:"1px 5px",borderRadius:6},children:"You"})]}),e.jsx("div",{style:{fontSize:10,color:"#94a3b8"},children:t.role})]}),n!==0&&n!==nn&&e.jsx("button",{onClick:()=>lt(o=>[...o,{id:io.current++,sender:-1,type:j.SYS,text:`${t.name} was removed`,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),reactions:{},del:!1}]),style:{background:"none",border:"none",color:"rgba(255,255,255,0.1)",cursor:"pointer",fontSize:12},onMouseEnter:o=>o.target.style.color="#e74c3c",onMouseLeave:o=>o.target.style.color="rgba(255,255,255,0.1)","aria-label":"Close",children:"✕"})]},n))})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",minWidth:0},children:[e.jsxs("div",{style:{padding:"10px 16px",background:"#111827",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",gap:10},children:[e.jsx("button",{onClick:()=>wn(!Qt),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:16,padding:2},"aria-label":"Toggle menu",children:"☰"}),e.jsx("div",{style:{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,rgba(0,113,227,0.15),rgba(0,113,227,0.08))",border:"1px solid rgba(0,113,227,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18},children:"🖥️"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#f1f5f9"},children:"MainframeStudyHub"}),e.jsxs("div",{style:{fontSize:11,color:"#94a3b8"},children:[k.length," members • ",ke," online"]})]}),e.jsx("button",{onClick:()=>{_a(!ct),kn("")},style:{background:ct?"rgba(0,113,227,0.15)":"transparent",border:"none",borderRadius:6,color:ct?"#60a5fa":"#94a3b8",cursor:"pointer",fontSize:14,padding:"4px 8px"},"aria-label":"Search",children:"🔍"}),e.jsx("button",{onClick:()=>Gn(!ue),"aria-label":"Toggle bookmarks",style:{background:ue?"rgba(212,160,23,0.15)":"transparent",border:"none",borderRadius:6,color:ue?"#d4a017":"#94a3b8",cursor:"pointer",fontSize:14,padding:"4px 8px"},children:ue?"⭐":"☆"})]}),ct&&e.jsx("div",{style:{padding:"6px 16px",background:"#1e293b",borderBottom:"1px solid rgba(255,255,255,0.12)"},children:e.jsx("input",{value:Zt,onChange:t=>kn(t.target.value),placeholder:"Search messages...",autoFocus:!0,style:{width:"100%",boxSizing:"border-box",padding:"6px 12px",borderRadius:8,border:"1.5px solid rgba(255,255,255,0.1)",background:"#111827",color:"#f1f5f9",fontSize:13,outline:"none",fontFamily:S}})}),ue&&e.jsxs("div",{style:{padding:"5px 16px",background:"rgba(251,191,36,0.15)",borderBottom:"1px solid #fde68a",fontSize:12,color:"#d4a017",display:"flex",alignItems:"center",gap:4},children:["⭐ Starred (",_t.size,")",e.jsx("button",{onClick:()=>Gn(!1),style:{background:"none",border:"none",color:"#d4a017",cursor:"pointer",marginLeft:"auto",fontSize:12},children:"Show all"})]}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"12px 0",background:"#0f172a"},children:[jn.map(t=>e.jsx(es,{msg:t,members:k,self:nn,onReact:to,onReply:qt,onDel:no,onStar:ao,starred:_t.has(t.id)},t.id)),jn.length===0&&e.jsx("div",{style:{textAlign:"center",padding:40,color:"#94a3b8",fontSize:13},children:ue?"No starred messages":"No messages found"}),e.jsx("div",{ref:Wn})]}),fe&&e.jsxs("div",{style:{padding:"6px 16px",background:"#1e293b",borderTop:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:3,height:24,borderRadius:2,background:k[fe.sender]?.color||"#0071e3"}}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontSize:11,color:k[fe.sender]?.color,fontWeight:600},children:k[fe.sender]?.name}),e.jsx("div",{style:{fontSize:11,color:"#94a3b8",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:fe.text})]}),e.jsx("button",{onClick:()=>qt(null),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:14},"aria-label":"Close",children:"✕"})]}),e.jsxs("div",{style:{padding:"8px 12px",background:"#111827",borderTop:"1px solid rgba(255,255,255,0.06)"},children:[e.jsx("div",{style:{display:"flex",gap:4,marginBottom:6},children:[{t:j.TEXT,i:"💬",l:"Message"},{t:j.JOB,i:"💼",l:"Job"},{t:j.DOUBT,i:"❓",l:"Doubt"},{t:j.THOUGHT,i:"💭",l:"Thought"}].map(t=>e.jsxs("button",{onClick:()=>Yn(t.t),style:{padding:"3px 10px",borderRadius:980,border:`1.5px solid ${Ce===t.t?"#0071e3":"rgba(255,255,255,0.1)"}`,background:Ce===t.t?"rgba(0,113,227,0.15)":"rgba(30,41,59,0.6)",color:Ce===t.t?"#60a5fa":"#94a3b8",fontSize:11,cursor:"pointer",fontFamily:S,display:"flex",alignItems:"center",gap:3},children:[t.i," ",t.l]},t.t))}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"flex-end"},children:[e.jsx("textarea",{ref:Hn,value:pe,onChange:t=>Bn(t.target.value),onKeyDown:t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),Vn())},placeholder:Ce===j.JOB?"Paste job details...":Ce===j.DOUBT?"Ask your doubt...":Ce===j.THOUGHT?"Share your thought...":"Type a message...",rows:1,style:{flex:1,padding:"9px 12px",borderRadius:12,border:"1.5px solid rgba(255,255,255,0.1)",background:"#1e293b",color:"#f1f5f9",fontSize:13,fontFamily:S,outline:"none",resize:"none",minHeight:38,maxHeight:90}}),e.jsx("button",{onClick:Vn,disabled:!pe.trim(),style:{width:38,height:38,borderRadius:10,border:"none",background:pe.trim()?"#0071e3":"rgba(255,255,255,0.1)",color:pe.trim()?"#fff":"#64748b",fontSize:16,cursor:pe.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:"➤"})]})]})]}),oo]}):e.jsxs("div",{style:{position:"relative",borderRadius:24,overflow:"hidden",background:"linear-gradient(135deg, #0a1628, #0d2040)",border:"1.5px solid rgba(0,113,227,0.2)",minHeight:380},children:[e.jsx(Ve,{style:{opacity:.5}}),e.jsxs("div",{style:{position:"relative",zIndex:2,padding:"48px 36px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,179,101,0.12)",border:"1px solid rgba(0,179,101,0.25)",borderRadius:20,padding:"6px 16px",marginBottom:20},children:[e.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:"#00b365",boxShadow:"0 0 8px #00b365",animation:"commPulse 2s ease-in-out infinite"}}),e.jsxs("span",{style:{fontSize:13,color:"#00b365",fontWeight:600},children:[ke," members online"]})]}),e.jsxs("h2",{style:{fontSize:28,fontWeight:800,color:"#fff",letterSpacing:"-1px",marginBottom:8},children:["Join ",e.jsx("span",{style:{color:"#58a6ff"},children:"MainframeStudyHub"})," Group"]}),e.jsxs("p",{style:{fontSize:14,color:"rgba(255,255,255,0.5)",maxWidth:400,lineHeight:1.6,marginBottom:24},children:[k.length," members sharing knowledge, jobs & solving doubts in real-time"]}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:24},children:["💬 Chat","💼 Jobs","❓ Doubts","💭 Ideas","📊 Polls"].map((t,n)=>e.jsx("span",{style:{padding:"4px 12px",borderRadius:16,fontSize:11,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)"},children:t},n))}),e.jsx("div",{style:{display:"flex",marginBottom:24},children:k.slice(0,6).map((t,n)=>e.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:`${t.color}25`,border:`2px solid ${t.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,marginLeft:n>0?-8:0,zIndex:6-n},children:t.emoji},n))}),e.jsxs("div",{style:{width:"100%",maxWidth:320},children:[e.jsx("button",{onClick:()=>{ae(!1),te(0),N("signin"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""})},style:{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"#0071e3",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:S,boxShadow:"0 4px 16px rgba(0,113,227,0.3)"},children:"Sign In →"}),e.jsx("p",{style:{fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:10},children:"New here? Create a free account to join the community"}),e.jsx("button",{onClick:zn,style:{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#7c3aed,#0071e3)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:S,boxShadow:"0 4px 16px rgba(0,113,227,0.3)"},children:"Join Community →"})]})]})]})}),V==="qa"&&e.jsxs("div",{style:{...i.inner,maxWidth:900,paddingBottom:80},children:[e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24,alignItems:"center"},children:[e.jsxs("div",{style:{position:"relative",flex:"1 1 200px"},children:[e.jsx("span",{style:{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#94a3b8"},children:"🔍"}),e.jsx("input",{value:st,onChange:t=>Qa(t.target.value),"aria-label":"Search questions",placeholder:"Search questions...",style:{...i.searchInput,width:"100%",paddingLeft:32}})]}),e.jsx("div",{style:{display:"flex",gap:4},children:["hot","new","top"].map(t=>e.jsx("button",{onClick:()=>Ja(t),style:{...i.pill,background:we===t?"#0071e3":"rgba(30,41,59,0.8)",color:we===t?"#fff":"#94a3b8",border:we===t?"none":"1.5px solid rgba(255,255,255,0.12)",textTransform:"capitalize"},children:t==="hot"?"🔥 Hot":t==="new"?"🕐 New":"⬆️ Top"},t))}),e.jsxs("select",{value:jt,onChange:t=>Ka(t.target.value),style:{padding:"6px 12px",borderRadius:8,border:"1.5px solid rgba(255,255,255,0.1)",background:"#111827",fontSize:13,color:"#f1f5f9",fontFamily:S,cursor:"pointer"},children:[e.jsx("option",{children:"All"}),y.map(t=>e.jsx("option",{value:t.title,children:t.title},t.id)),e.jsx("option",{children:"General"})]}),e.jsx("button",{onClick:()=>{if(!c){N("signin");return}zt(!Mn)},style:{...i.btnBlue,padding:"8px 18px",fontSize:13,display:"flex",alignItems:"center",gap:6},children:"✍️ Ask Question"})]}),Mn&&e.jsxs("div",{className:"fi",style:{border:"1.5px solid #0071e3",borderRadius:16,padding:20,marginBottom:24,background:"#0f172a"},children:[e.jsx("input",{value:Ee.title,onChange:t=>it(n=>({...n,title:t.target.value})),placeholder:"Question title...",style:{width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.1)",background:"#111827",fontSize:15,fontWeight:600,color:"#f1f5f9",outline:"none",fontFamily:S,marginBottom:10}}),e.jsx("textarea",{value:Ee.body,onChange:t=>it(n=>({...n,body:t.target.value})),placeholder:"Details (optional)...",rows:3,style:{width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.1)",background:"#111827",fontSize:14,color:"#f1f5f9",outline:"none",fontFamily:S,resize:"vertical",marginBottom:10}}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsxs("select",{value:Ee.topic,onChange:t=>it(n=>({...n,topic:t.target.value})),style:{padding:"8px 12px",borderRadius:8,border:"1.5px solid rgba(255,255,255,0.1)",fontSize:13,fontFamily:S},children:[y.map(t=>e.jsx("option",{value:t.title,children:t.title},t.id)),e.jsx("option",{children:"General"})]}),e.jsx("button",{onClick:qa,style:{...i.btnBlue,padding:"8px 20px",fontSize:13},children:"Post Question"}),e.jsx("button",{onClick:()=>zt(!1),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:13,fontFamily:S},children:"Cancel"})]})]}),vn.length===0&&e.jsxs("div",{style:{textAlign:"center",padding:"48px 0",color:"#94a3b8"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:12},children:"🔍"}),"No questions found."]}),vn.map(t=>e.jsx("div",{className:"card",style:{border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"20px 24px",marginBottom:16,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.2)"},onClick:()=>de(t.id),children:e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"flex-start"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:40},children:[e.jsx("button",{onClick:n=>{n.stopPropagation(),rt(t.id,1)},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:16},children:"▲"}),e.jsx("span",{style:{fontSize:16,fontWeight:800,color:"#f1f5f9"},children:t.votes}),e.jsx("button",{onClick:n=>{n.stopPropagation(),rt(t.id,-1)},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:16},children:"▼"})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#f1f5f9",marginBottom:6,lineHeight:1.4},children:t.title}),t.body&&e.jsx("div",{style:{fontSize:13,color:"#94a3b8",lineHeight:1.5,marginBottom:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:t.body}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center",fontSize:12,color:"#94a3b8"},children:[e.jsx("span",{style:{...i.pill,background:"rgba(0,113,227,0.12)",color:"#0071e3",padding:"3px 10px",fontSize:11},children:t.topic}),e.jsxs("span",{children:["by ",e.jsx("strong",{style:{color:"#f1f5f9"},children:t.author})]}),e.jsx("span",{children:t.date}),e.jsxs("span",{style:{color:"#0071e3"},children:["💬 ",t.answers.length," ",t.answers.length===1?"answer":"answers"]})]})]})]})},t.id))]}),V&&V!=="chat"&&V!=="qa"&&(()=>{const t=Xt.find(n=>n.id===V);return t?e.jsxs("div",{style:{...i.inner,maxWidth:800,paddingBottom:80},children:[e.jsx("button",{onClick:()=>de("qa"),style:i.backBtn,children:"← Back to all questions"}),e.jsx("div",{style:{border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"28px 32px",marginBottom:32,background:"#111827"},children:e.jsxs("div",{style:{display:"flex",gap:16},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("button",{onClick:()=>rt(t.id,1),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:20},children:"▲"}),e.jsx("span",{style:{fontSize:24,fontWeight:800,color:"#f1f5f9"},children:t.votes}),e.jsx("button",{onClick:()=>rt(t.id,-1),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:20},children:"▼"})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{display:"flex",gap:8,marginBottom:12},children:e.jsx("span",{style:{...i.pill,background:"rgba(0,113,227,0.12)",color:"#0071e3",padding:"4px 12px"},children:t.topic})}),e.jsx("h2",{style:{fontSize:22,fontWeight:800,color:"#f1f5f9",marginBottom:12,letterSpacing:"-.3px"},children:t.title}),t.body&&e.jsx("div",{style:{fontSize:15,color:"#cbd5e1",lineHeight:1.8,marginBottom:16,whiteSpace:"pre-wrap"},children:t.body}),e.jsxs("div",{style:{fontSize:13,color:"#94a3b8"},children:["Asked by ",e.jsx("strong",{style:{color:"#f1f5f9"},children:t.author}),t.authorRole&&e.jsxs("span",{style:{color:"#0071e3"},children:[" • ",t.authorRole]})," on ",t.date]})]})]})}),e.jsxs("h3",{style:{fontSize:18,fontWeight:700,marginBottom:16,color:"#f1f5f9"},children:[t.answers.length," ",t.answers.length===1?"Answer":"Answers"]}),t.answers.map(n=>e.jsx("div",{style:{border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"20px 24px",marginBottom:16,background:"#111827"},children:e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("button",{onClick:()=>xn(t.id,n.id,1),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:16},children:"▲"}),e.jsx("span",{style:{fontSize:16,fontWeight:800,color:"#f1f5f9"},children:n.votes}),e.jsx("button",{onClick:()=>xn(t.id,n.id,-1),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:16},children:"▼"})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:14,color:"#cbd5e1",lineHeight:1.8,whiteSpace:"pre-wrap"},children:n.body}),e.jsxs("div",{style:{fontSize:12,color:"#94a3b8",marginTop:10},children:["Answered by ",e.jsx("strong",{style:{color:"#f1f5f9"},children:n.author}),n.authorRole&&e.jsxs("span",{style:{color:"#0071e3"},children:[" • ",n.authorRole]})," on ",n.date]})]})]})},n.id)),c?e.jsxs("div",{style:{border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:20,background:"#0f172a"},children:[e.jsx("h4",{style:{fontSize:15,fontWeight:700,color:"#f1f5f9",marginBottom:12},children:"Your Answer"}),e.jsx("textarea",{value:Jt,onChange:n=>bn(n.target.value),rows:4,placeholder:"Write your answer...",style:{width:"100%",boxSizing:"border-box",padding:"12px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.1)",background:"#111827",fontSize:14,color:"#f1f5f9",outline:"none",fontFamily:S,resize:"vertical",marginBottom:12}}),e.jsx("button",{onClick:()=>Za(t.id),style:{...i.btnBlue,padding:"10px 24px",fontSize:14},children:"Post Answer"})]}):e.jsxs("div",{style:{border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"24px 20px",textAlign:"center",background:"#0f172a"},children:[e.jsx("p",{style:{color:"#94a3b8",marginBottom:12},children:"Sign in to post your answer"}),e.jsx("button",{onClick:()=>{N("signin"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""})},style:i.btnBlue,children:"Sign In"})]})]}):null})()]}),m==="abends"&&e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:"Abend Solver"}),e.jsx("p",{style:i.pageHeroSub,children:"Quick-search IBM ABEND codes — get the cause and fix instantly"})]}),e.jsxs("div",{style:{...i.inner,paddingBottom:80},children:[e.jsxs("div",{className:"content-card fi",style:{marginBottom:24},children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:18},children:[e.jsxs("div",{style:{flex:1,minWidth:200,position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:18},children:"🔍"}),e.jsx("input",{value:Qe,onChange:t=>{ha(t.target.value),ft(null)},"aria-label":"Search abend codes",placeholder:"Search abend code (e.g. S0C7, ASRA, S878...)",style:{width:"100%",padding:"14px 14px 14px 44px",fontSize:15,border:"2px solid rgba(0,0,0,0.08)",borderRadius:14,outline:"none",background:"rgba(30,41,59,0.8)",fontFamily:"inherit",color:"#f1f5f9",transition:"border-color 0.2s"},onFocus:t=>t.target.style.borderColor="#7c3aed",onBlur:t=>t.target.style.borderColor="rgba(0,0,0,0.08)"})]}),e.jsxs("div",{style:{fontSize:13,color:"#94a3b8",fontWeight:600},children:[Lt.length," codes"]})]}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:Qo.map(t=>e.jsx("button",{onClick:()=>{ga(t),ft(null)},style:{padding:"6px 16px",borderRadius:980,border:"1.5px solid",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s",background:be===t?"linear-gradient(135deg,#0071e3,#7c3aed)":"transparent",color:be===t?"#fff":"#94a3b8",borderColor:be===t?"transparent":"rgba(0,0,0,0.1)"},children:t},t))})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[Lt.length===0&&e.jsxs("div",{style:{textAlign:"center",padding:"48px 0",color:"#94a3b8"},children:[e.jsx("div",{style:{fontSize:48,marginBottom:12},children:"🔎"}),e.jsx("p",{children:"No abend codes found. Try a different search term."})]}),Lt.map((t,n)=>e.jsxs("div",{className:"fi",style:{animationDelay:`${Math.min(n,8)*40}ms`},children:[e.jsxs("div",{onClick:()=>ft(qe===t.code?null:t.code),style:{background:"rgba(17,24,39,0.92)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:qe===t.code?"16px 16px 0 0":"16px",padding:"18px 22px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all 0.2s",boxShadow:"0 2px 12px rgba(0,0,0,0.3)"},children:[e.jsx("div",{style:{background:ut[t.severity]+"18",color:ut[t.severity],padding:"8px 14px",borderRadius:10,fontSize:18,fontWeight:800,fontFamily:"'SF Mono',Menlo,monospace",letterSpacing:"0.5px",minWidth:70,textAlign:"center",border:`1.5px solid ${ut[t.severity]}30`},children:t.code}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:15,fontWeight:700,color:"#f1f5f9",marginBottom:2},children:t.name}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:11,color:ut[t.severity],fontWeight:700},children:qo[t.severity]}),e.jsx("span",{style:{fontSize:11,color:"#94a3b8",background:"rgba(30,41,59,0.8)",padding:"2px 8px",borderRadius:980},children:t.category})]})]}),e.jsx("span",{style:{fontSize:18,color:"#94a3b8",transition:"transform 0.3s",transform:qe===t.code?"rotate(180deg)":"rotate(0)"},children:"▼"})]}),qe===t.code&&e.jsxs("div",{style:{background:"rgba(8,11,22,0.95)",borderRadius:"0 0 16px 16px",padding:"24px 22px",borderTop:"2px solid",borderImage:"linear-gradient(90deg,#0071e3,#7c3aed) 1",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"},children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10},children:e.jsx("span",{style:{background:"rgba(239,68,68,0.15)",color:"#dc2626",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:700},children:"⚠️ CAUSE"})}),e.jsx("p",{style:{fontSize:14,color:"#cbd5e1",lineHeight:1.75},children:t.cause})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10},children:e.jsx("span",{style:{background:"rgba(34,197,94,0.15)",color:"#16a34a",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:700},children:"✅ FIX"})}),e.jsx("div",{style:{fontSize:14,color:"#cbd5e1",lineHeight:1.75,whiteSpace:"pre-line"},children:t.fix})]}),t.tips&&t.tips.length>0&&e.jsxs("div",{style:{background:"rgba(0,113,227,0.08)",borderRadius:12,padding:"14px 18px",border:"1px solid rgba(0,113,227,0.08)"},children:[e.jsx("div",{style:{fontSize:12,fontWeight:700,color:"#0071e3",marginBottom:8},children:"💡 PRO TIPS"}),t.tips.map((o,s)=>e.jsxs("div",{style:{fontSize:13,color:"#cbd5e1",lineHeight:1.6,paddingLeft:16,position:"relative",marginBottom:4},children:[e.jsx("span",{style:{position:"absolute",left:0,color:"#0071e3"},children:"›"}),o]},s))]})]})]},t.code))]})]})]}),m==="roadmap"&&e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:"Learning Roadmap"}),e.jsx("p",{style:i.pageHeroSub,children:"Your path from Trainee to Architect — click any level to explore"})]}),e.jsx("div",{style:{...i.inner,paddingBottom:80,maxWidth:900},children:e.jsxs("div",{style:{position:"relative",paddingLeft:40},children:[e.jsx("div",{style:{position:"absolute",left:18,top:0,bottom:0,width:4,background:"linear-gradient(to bottom,#22c55e,#3b82f6,#8b5cf6,#ec4899,#f59e0b,#ef4444)",borderRadius:4}}),ca.map((t,n)=>e.jsxs("div",{className:"fi",style:{marginBottom:n<ca.length-1?32:0,position:"relative",animationDelay:`${n*100}ms`},children:[e.jsx("div",{style:{position:"absolute",left:-30,top:20,width:28,height:28,borderRadius:"50%",background:t.color,border:"4px solid #fff",boxShadow:`0 0 0 3px ${t.color}40, 0 2px 8px ${t.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,zIndex:1},children:e.jsx("span",{style:{filter:"grayscale(0)"},children:t.icon})}),e.jsxs("div",{onClick:()=>fa(Re===t.level?null:t.level),className:"scenario-card",style:{background:"rgba(17,24,39,0.9)",backdropFilter:"blur(20px)",border:`1.5px solid ${Re===t.level?t.color+"50":"rgba(0,0,0,0.05)"}`,borderRadius:18,padding:"24px 26px",cursor:"pointer",boxShadow:Re===t.level?`0 8px 32px ${t.color}15`:"0 2px 12px rgba(0,0,0,0.3)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:Re===t.level?16:0},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:4},children:[e.jsxs("span",{style:{fontSize:11,fontWeight:800,color:t.color,background:t.color+"15",padding:"3px 10px",borderRadius:980},children:["LEVEL ",t.level]}),e.jsx("span",{style:{fontSize:11,color:"#94a3b8"},children:t.duration})]}),e.jsxs("div",{style:{fontSize:20,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.3px"},children:[t.icon," ",t.title]}),e.jsx("div",{style:{fontSize:13,color:"#94a3b8"},children:t.subtitle})]}),e.jsx("span",{style:{fontSize:18,color:"#94a3b8",transition:"transform 0.3s",transform:Re===t.level?"rotate(180deg)":"rotate(0)",flexShrink:0},children:"▼"})]}),Re===t.level&&e.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:16},children:[e.jsx("div",{style:{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.5px"},children:"Skills to Master"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginBottom:16},children:t.skills.map((o,s)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:8,height:8,borderRadius:"50%",background:t.color,flexShrink:0}}),e.jsx("span",{style:{fontSize:14,color:"#cbd5e1"},children:o.name}),e.jsx("button",{onClick:a=>{a.stopPropagation();const l=y.find(C=>C.id===o.topic);l&&Ne(l)},style:{background:t.color+"12",color:t.color,border:"none",padding:"2px 10px",borderRadius:980,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginLeft:"auto",flexShrink:0},children:"Study →"})]},s))}),e.jsxs("div",{style:{background:`${t.color}08`,borderRadius:12,padding:"14px 18px",border:`1px solid ${t.color}15`},children:[e.jsx("div",{style:{fontSize:12,fontWeight:700,color:t.color,marginBottom:4},children:"🎯 MILESTONE"}),e.jsx("div",{style:{fontSize:13,color:"#cbd5e1",lineHeight:1.6},children:t.milestone})]})]})]})]},t.level))]})})]}),m==="about"&&e.jsxs("div",{children:[e.jsxs("div",{style:i.pageHero,children:[e.jsx("h1",{style:i.pageHeroTitle,children:"About"}),e.jsx("p",{style:i.pageHeroSub,children:"The story behind MainframeStudyHub"})]}),e.jsxs("div",{style:{...i.inner,paddingBottom:80,maxWidth:800},children:[e.jsxs("div",{className:"content-card fi",style:{marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:28},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#0071e3,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0},children:"🎯"}),e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:24,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.5px"},children:"About This Platform"}),e.jsx("p",{style:{fontSize:14,color:"#94a3b8"},children:"Built with passion for the Mainframe community"})]})]}),e.jsxs("div",{style:{fontSize:15,color:"#cbd5e1",lineHeight:1.85},children:[e.jsxs("p",{style:{marginBottom:18},children:["Welcome to this dedicated learning space built for the ",e.jsx("strong",{style:{color:"#f1f5f9"},children:"Mainframe community"}),"."]}),e.jsxs("p",{style:{marginBottom:18},children:["I created this website with a simple mission — to bring together all essential Mainframe concepts in one place and make learning ",e.jsx("strong",{style:{color:"#f1f5f9"},children:"easier, structured, and practical"}),". As someone deeply interested in Mainframe technologies and real-world development practices, I wanted to build a platform that helps beginners and experienced professionals strengthen their fundamentals and prepare confidently for interviews and projects."]}),e.jsxs("p",{style:{marginBottom:18},children:["My growing interest in modern development approaches and ",e.jsx("em",{children:'"vibe coding"'})," inspired me to design and develop this site in a clean, focused, and user-friendly way. This platform reflects both my passion for Mainframe technology and my curiosity for building efficient digital learning experiences."]}),e.jsxs("p",{style:{marginBottom:18},children:["I will be truly happy to see learners use this site effectively for their ",e.jsx("strong",{style:{color:"#f1f5f9"},children:"study purposes, career growth, and skill enhancement"}),". If this platform helps even one person gain clarity in COBOL, JCL, DB2, CICS, or overall Mainframe concepts — it fulfills its purpose."]}),e.jsx("p",{style:{fontSize:17,fontWeight:700,color:"#0071e3",fontStyle:"italic"},children:"Let's grow and learn together. 🚀"})]})]}),e.jsxs("div",{className:"content-card fi",style:{marginBottom:32,animationDelay:"0.1s"},children:[e.jsx("h3",{style:{fontSize:20,fontWeight:800,color:"#f1f5f9",marginBottom:20,letterSpacing:"-0.3px"},children:"What You'll Find Here"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14},children:[["📚","15 Topics","Comprehensive coverage from z/OS to Modernization"],["🧠","200 Quiz Questions","Test your knowledge across all mainframe domains"],["🎯","Real Scenarios","Practice with production-like interview scenarios"],["💬","Community Q&A","Ask questions and share knowledge with peers"],["📰","Expert Blogs","Insights from experienced mainframe professionals"],["🤖","AI Assistant","Get instant help with mainframe concepts and debugging"]].map(([t,n,o],s)=>e.jsxs("div",{style:{background:"rgba(30,41,59,0.6)",borderRadius:14,padding:"18px 16px",border:"1px solid rgba(255,255,255,0.06)"},children:[e.jsx("div",{style:{fontSize:24,marginBottom:8},children:t}),e.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:4},children:n}),e.jsx("div",{style:{fontSize:12,color:"#94a3b8",lineHeight:1.5},children:o})]},s))})]}),e.jsxs("div",{className:"content-card fi",style:{animationDelay:"0.2s"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:24},children:[e.jsx("div",{style:{width:4,height:28,borderRadius:4,background:"linear-gradient(135deg,#0071e3,#7c3aed)"}}),e.jsx("h3",{style:{fontSize:20,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.3px"},children:"Meet the Founder"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"},children:[e.jsxs("div",{style:{position:"relative",flexShrink:0},children:[e.jsx("div",{style:{position:"absolute",inset:-4,borderRadius:"50%",background:"conic-gradient(#0071e3, #7c3aed, #00b365, #0071e3)",animation:"spin 4s linear infinite",opacity:.7}}),e.jsx("img",{src:"/founder.jpg",alt:"Harikrishnan K",style:{width:90,height:90,borderRadius:"50%",objectFit:"cover",border:"3px solid #fff",position:"relative",zIndex:1,boxShadow:"0 8px 24px rgba(0,113,227,0.25)"}})]}),e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontSize:24,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.5px",marginBottom:2},children:"Harikrishnan K"}),e.jsx("div",{style:{fontSize:14,color:"#94a3b8",marginBottom:10},children:"Founder & Creator of MainframeStudyHub"}),e.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",padding:"5px 14px",borderRadius:980,fontSize:12,fontWeight:700,marginBottom:14},children:"🖥️ Mainframe Developer"}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[e.jsx("a",{href:"mailto:harikrish17642@gmail.com",style:{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(30,41,59,0.8)",color:"#cbd5e1",padding:"8px 14px",borderRadius:10,fontSize:12,fontWeight:600,textDecoration:"none",border:"1px solid rgba(255,255,255,0.06)",transition:"all 0.2s"},children:"📧 Email"}),e.jsxs("a",{href:"https://www.linkedin.com/in/harikrishnan-k-4560241a2",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:6,background:"#0A66C2",color:"#fff",padding:"8px 14px",borderRadius:10,fontSize:12,fontWeight:700,textDecoration:"none",transition:"all 0.2s"},children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"white",children:e.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),"LinkedIn"]})]})]})]}),e.jsx("div",{style:{marginTop:24,padding:"18px 22px",background:"linear-gradient(135deg,rgba(0,113,227,0.08),rgba(124,58,237,0.04))",borderRadius:14,border:"1px solid rgba(0,113,227,0.08)"},children:e.jsx("p",{style:{fontSize:13.5,color:"#94a3b8",lineHeight:1.7,margin:0},children:"Passionate about making mainframe knowledge accessible to everyone. Built MainframeStudyHub to bridge the gap between experienced professionals and newcomers entering the IBM Z world. Have suggestions or want to contribute? I'd love to connect!"})})]})]})]})]}),pt>0&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:2400,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.4s ease"},onClick:()=>te(0),children:e.jsxs("div",{onClick:t=>t.stopPropagation(),style:{background:"#111827",borderRadius:24,overflow:"hidden",width:420,maxWidth:"92vw",boxShadow:"0 30px 80px rgba(0,0,0,0.25)",animation:"popIn 0.5s cubic-bezier(0.16,1,0.3,1)"},children:[pt===1&&e.jsxs("div",{children:[e.jsxs("div",{style:{position:"relative",height:180,background:"linear-gradient(135deg, #0a1628, #0d2040)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx(Ve,{style:{opacity:.5}}),e.jsxs("div",{style:{position:"relative",zIndex:2,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:8,animation:"popIn 0.6s ease 0.2s both"},children:"🖥️"}),e.jsxs("h2",{style:{margin:0,fontSize:26,fontWeight:800,color:"#fff",letterSpacing:"-0.5px",animation:"popIn 0.6s ease 0.3s both"},children:["Welcome to the",e.jsx("br",{}),e.jsx("span",{style:{background:"linear-gradient(135deg,#58a6ff,#0071e3)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Mainframe World"})]})]})]}),e.jsxs("div",{style:{padding:"24px 28px 28px",textAlign:"center"},children:[e.jsx("p",{style:{fontSize:15,color:"#94a3b8",lineHeight:1.6,marginBottom:20},children:"The most comprehensive IBM Z learning platform. Master JCL, COBOL, DB2, CICS and more — from beginner to architect."}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:24},children:["📚 15+ Topics","🧠 Quiz","🎯 Scenarios","🔍 Abend Solver","💬 Community","🗺️ Roadmap"].map((t,n)=>e.jsx("span",{style:{padding:"4px 12px",borderRadius:16,fontSize:12,background:"rgba(0,113,227,0.12)",color:"#0071e3",border:"1px solid rgba(0,113,227,0.2)"},children:t},n))}),e.jsx("button",{onClick:()=>te(0),style:{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"#0071e3",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:S,boxShadow:"0 4px 16px rgba(0,113,227,0.3)"},children:"Start Exploring →"})]})]}),pt===2&&e.jsxs("div",{children:[e.jsx("div",{style:{position:"relative",height:140,background:"linear-gradient(135deg, #1a0a38, #2d1060)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("div",{style:{position:"relative",zIndex:2,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:48,marginBottom:6},children:"🔐"}),e.jsx("h2",{style:{margin:0,fontSize:22,fontWeight:800,color:"#fff"},children:"Create Your Account"})]})}),e.jsxs("div",{style:{padding:"20px 28px 28px",textAlign:"center"},children:[e.jsx("p",{style:{fontSize:14,color:"#94a3b8",lineHeight:1.6,marginBottom:20},children:"Sign in to save progress, post in Q&A, get personalized recommendations, and track your learning journey."}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("button",{onClick:()=>te(0),style:{flex:1,padding:"12px",borderRadius:12,border:"1.5px solid rgba(255,255,255,0.1)",background:"transparent",color:"#94a3b8",cursor:"pointer",fontSize:14,fontFamily:S},children:"Maybe Later"}),e.jsx("button",{onClick:()=>{te(0),N("signup"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""})},style:{flex:1,padding:"12px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#7c3aed,#0071e3)",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:S},children:"Sign Up Free"})]})]})]}),pt===3&&e.jsxs("div",{children:[e.jsxs("div",{style:{position:"relative",height:160,background:"linear-gradient(135deg, #0a1628, #0d2040)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx(Ve,{style:{opacity:.4}}),e.jsxs("div",{style:{position:"relative",zIndex:2,textAlign:"center"},children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:10},children:k.slice(0,5).map((t,n)=>e.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:`${t.color}25`,border:`2px solid ${t.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginLeft:n>0?-6:0,zIndex:5-n},children:t.emoji},n))}),e.jsxs("h2",{style:{margin:0,fontSize:22,fontWeight:800,color:"#fff"},children:["Join the ",e.jsx("span",{style:{color:"#58a6ff"},children:"Community"})]})]})]}),e.jsxs("div",{style:{padding:"20px 28px 28px",textAlign:"center"},children:[e.jsxs("p",{style:{fontSize:14,color:"#94a3b8",lineHeight:1.6,marginBottom:20},children:[k.length,"+ mainframe professionals are chatting right now. Share knowledge, find jobs, solve doubts in real-time!"]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("button",{onClick:()=>te(0),style:{flex:1,padding:"12px",borderRadius:12,border:"1.5px solid rgba(255,255,255,0.1)",background:"transparent",color:"#94a3b8",cursor:"pointer",fontSize:14,fontFamily:S},children:"Later"}),e.jsx("button",{onClick:()=>{te(0),ae(!0),re(0)},style:{flex:1,padding:"12px",borderRadius:12,border:"none",background:"#0071e3",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:S},children:"Join Community"})]})]})]})]})}),Eo&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.3s ease"},onClick:()=>dt(!1),children:e.jsx("div",{onClick:t=>t.stopPropagation(),className:"scaleIn",style:{background:"rgba(17,24,39,0.98)",backdropFilter:"blur(20px)",borderRadius:24,padding:"36px 32px",maxWidth:440,width:"90%",boxShadow:"0 24px 80px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.08)"},children:po?e.jsxs("div",{style:{textAlign:"center",padding:"20px 0"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:12},children:"🎉"}),e.jsx("h3",{style:{fontSize:22,fontWeight:800,color:"#f1f5f9",marginBottom:8},children:"Thank You!"}),e.jsx("p",{style:{fontSize:14,color:"#94a3b8"},children:"Your feedback helps us improve."})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:20},children:[e.jsx("div",{style:{fontSize:40,marginBottom:8},children:"💬"}),e.jsx("h3",{style:{fontSize:22,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.5px",marginBottom:4},children:"How's your experience?"}),e.jsx("p",{style:{fontSize:13,color:"#94a3b8"},children:"We'd love your feedback to make MainframeStudyHub even better"})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:8,marginBottom:20},children:[1,2,3,4,5].map(t=>e.jsx("button",{onClick:()=>Et({...G,rating:t}),style:{background:"none",border:"none",fontSize:32,cursor:"pointer",transform:G.rating>=t?"scale(1.15)":"scale(1)",filter:G.rating>=t?"none":"grayscale(1) opacity(0.4)",transition:"all 0.15s ease"},children:"⭐"},t))}),e.jsx("textarea",{value:G.message,onChange:t=>Et({...G,message:t.target.value}),"aria-label":"Feedback message",placeholder:"What do you like? What can we improve? Any features you'd love to see?",rows:3,style:{..._,resize:"vertical",minHeight:72}}),!c&&e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("input",{value:G.name,onChange:t=>Et({...G,name:t.target.value}),"aria-label":"Your name",placeholder:"Name (optional)",style:{..._,flex:1}}),e.jsx("input",{value:G.email,onChange:t=>Et({...G,email:t.target.value}),"aria-label":"Your email",placeholder:"Email (optional)",style:{..._,flex:1}})]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("button",{onClick:()=>{dt(!1),localStorage.setItem("mfsh_feedback_done","1")},style:{flex:1,padding:"12px",borderRadius:12,border:"1.5px solid rgba(255,255,255,0.1)",background:"transparent",color:"#94a3b8",cursor:"pointer",fontSize:14,fontFamily:S},children:"Maybe Later"}),e.jsx("button",{onClick:Co,disabled:_n||!G.message.trim(),style:{flex:1,padding:"12px",borderRadius:12,border:"none",background:G.message.trim()?"linear-gradient(135deg,#0071e3,#7c3aed)":"#d1d1d6",color:"#fff",fontSize:14,fontWeight:700,cursor:G.message.trim()?"pointer":"default",fontFamily:S},children:_n?"Sending...":"Submit Feedback"})]})]})})}),$t&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:2500,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center"},onClick:()=>ae(!1),children:e.jsxs("div",{onClick:t=>t.stopPropagation(),style:{width:420,maxWidth:"92vw",background:"#111827",borderRadius:24,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.2)",transform:oe>=1?"scale(1) translateY(0)":"scale(0.85) translateY(30px)",opacity:oe>=1?1:0,transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"},children:[e.jsxs("div",{style:{position:"relative",height:150,background:"linear-gradient(135deg,#0a1628,#0d2040)",overflow:"hidden"},children:[e.jsx(Ve,{style:{opacity:.6}}),e.jsxs("div",{style:{position:"relative",zIndex:2,padding:"26px 26px 0",textAlign:"center"},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(0,179,101,0.15)",border:"1px solid rgba(0,179,101,0.3)",borderRadius:20,padding:"4px 12px",marginBottom:10,opacity:oe>=2?1:0,transition:"opacity 0.4s ease 0.1s"},children:[e.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:"#00b365",boxShadow:"0 0 6px #00b365"}}),e.jsxs("span",{style:{fontSize:12,color:"#00b365",fontWeight:600},children:[ke," online"]})]}),e.jsxs("h3",{style:{margin:0,fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-0.5px",opacity:oe>=2?1:0,transform:oe>=2?"translateY(0)":"translateY(10px)",transition:"all 0.4s ease 0.2s"},children:["MainframeStudyHub ",e.jsx("span",{style:{color:"#58a6ff"},children:"Community"})]})]})]}),e.jsx("div",{style:{padding:"16px 26px 6px",display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",opacity:oe>=2?1:0,transition:"opacity 0.4s ease 0.3s"},children:["💬 Chat","💼 Jobs","❓ Doubts","💭 Ideas","📊 Polls"].map((t,n)=>e.jsx("span",{style:{padding:"4px 10px",borderRadius:16,fontSize:11,background:"#1e293b",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.08)"},children:t},n))}),e.jsxs("div",{style:{padding:"14px 26px",display:"flex",justifyContent:"center",opacity:oe>=3?1:0,transition:"opacity 0.4s ease 0.35s"},children:[k.slice(0,6).map((t,n)=>e.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:`${t.color}15`,border:`2px solid ${t.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginLeft:n>0?-6:0,zIndex:6-n},children:t.emoji},n)),e.jsxs("div",{style:{width:32,height:32,borderRadius:"50%",background:"rgba(0,113,227,0.15)",border:"2px solid #c0d8ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#0071e3",fontWeight:700,marginLeft:-6},children:["+",Math.max(0,k.length-6)]})]}),e.jsxs("div",{style:{padding:"0 26px 26px",opacity:oe>=3?1:0,transform:oe>=3?"translateY(0)":"translateY(10px)",transition:"all 0.4s ease 0.4s"},children:[e.jsx("button",{onClick:()=>{ae(!1),te(0),N("signin"),I(""),x({name:"",email:"",password:"",role:"",itYears:"",mfYears:""})},style:{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"#0071e3",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:S,boxShadow:"0 4px 16px rgba(0,113,227,0.25)"},children:"Sign In →"}),e.jsx("p",{style:{fontSize:11,color:"#94a3b8",marginTop:8,textAlign:"center"},children:"New here? Create a free account"}),e.jsx("button",{onClick:zn,style:{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#7c3aed,#0071e3)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:S,boxShadow:"0 4px 16px rgba(0,113,227,0.25)"},children:"Join Community →"})]})]})}),e.jsx("button",{className:"chat-fab",onClick:()=>On(t=>!t),style:{position:"fixed",bottom:24,right:24,zIndex:3e3,width:60,height:60,borderRadius:"50%",border:"none",cursor:"pointer",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 24px rgba(124,58,237,0.35)"},children:Rn?"✕":"🤖"}),Rn&&e.jsxs("div",{className:X?"":"chat-window",style:X?{position:"fixed",inset:0,zIndex:3001,background:"rgba(17,24,39,0.99)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",overflow:"hidden"}:{position:"fixed",bottom:96,right:24,zIndex:3e3,width:400,maxWidth:"calc(100vw - 32px)",height:560,maxHeight:"calc(100vh - 140px)",background:"rgba(8,11,22,0.97)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderRadius:24,boxShadow:"0 20px 60px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.05)",display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx("div",{style:{padding:X?"16px 24px":"18px 22px",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",flexShrink:0},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:38,height:38,borderRadius:12,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22},children:"🤖"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:X?18:16,fontWeight:700},children:"MainframeStudyHub AI"}),e.jsx("div",{style:{fontSize:11,opacity:.85},children:"Your mainframe learning companion"})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("button",{onClick:()=>hn(t=>!t),title:X?"Minimize":"Maximize",style:{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:13,fontFamily:S,fontWeight:600},children:X?"⊖":"⊕"}),e.jsx("button",{onClick:()=>{at([Be[0]])},style:{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:11,fontFamily:S,fontWeight:600},children:"Clear"}),X&&e.jsx("button",{onClick:()=>{hn(!1),On(!1)},style:{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:13,fontFamily:S,fontWeight:600},children:"✕"})]})]})}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:X?"24px 0":"16px 18px",display:"flex",flexDirection:"column",gap:12,...X?{maxWidth:720,margin:"0 auto",width:"100%",paddingLeft:24,paddingRight:24}:{}},children:[Be.map((t,n)=>e.jsxs("div",{className:n>0?"chat-msg-enter":"",style:{display:"flex",gap:10,flexDirection:t.role==="user"?"row-reverse":"row",animationDelay:`${Math.min(n,3)*80}ms`},children:[t.role==="assistant"&&e.jsx("div",{style:{width:30,height:30,borderRadius:10,background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:"🤖"}),e.jsx("div",{style:{maxWidth:X?"90%":"82%",padding:X?"16px 20px":"12px 16px",borderRadius:t.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:t.role==="user"?"linear-gradient(135deg,#0071e3,#7c3aed)":"rgba(30,41,59,0.9)",color:t.role==="user"?"#fff":"#e2e8f0",fontSize:X?15:13.5,lineHeight:1.7,border:t.role==="user"?"none":"1px solid rgba(255,255,255,0.06)"},children:Ha(t.content)}),t.role==="user"&&c&&e.jsx(Xe,{name:c.name,size:30})]},n)),Yt&&e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("div",{style:{width:30,height:30,borderRadius:10,background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:"🤖"}),e.jsx("div",{style:{padding:"14px 20px",background:"rgba(30,41,59,0.9)",borderRadius:"18px 18px 18px 4px",display:"flex",gap:6,alignItems:"center",border:"1px solid rgba(255,255,255,0.06)"},children:[0,1,2].map(t=>e.jsx("div",{style:{width:8,height:8,borderRadius:"50%",background:"#7c3aed",animation:"dotPulse 1.2s ease infinite",animationDelay:`${t*.2}s`}},t))})]}),e.jsx("div",{ref:fn})]}),Be.length<=2&&e.jsx("div",{style:{padding:"0 18px 8px",display:"flex",gap:6,flexWrap:"wrap"},children:["What causes S0C7 and how to fix it?","Write JCL to sort a file by column 1-10","Explain CICS pseudo-conversational","DB2 performance tuning tips","COBOL COMP-3 vs COMP","How to debug a production abend","Mainframe career path & salary","What is Zowe?"].map(t=>e.jsx("button",{onClick:()=>{wt(t)},style:{fontSize:11,padding:"5px 10px",borderRadius:980,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(17,24,39,0.8)",color:"#cbd5e1",cursor:"pointer",fontFamily:S,fontWeight:500,transition:"all 0.15s"},onMouseOver:n=>n.currentTarget.style.background="rgba(0,113,227,0.1)",onMouseOut:n=>n.currentTarget.style.background="rgba(30,41,59,0.8)",children:t},t))}),e.jsxs("div",{style:{padding:X?"16px 24px":"12px 16px",borderTop:"1px solid rgba(255,255,255,0.06)",background:"rgba(17,24,39,0.9)",flexShrink:0,...X?{maxWidth:720,margin:"0 auto",width:"100%"}:{}},children:[e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("input",{className:"chat-input",value:Se,onChange:t=>wt(t.target.value),"aria-label":"Ask about mainframes",placeholder:"Ask about mainframes...",onKeyDown:t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),Ln())},style:{flex:1,padding:X?"14px 18px":"10px 14px",fontSize:X?16:14,border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:14,outline:"none",fontFamily:S,background:"rgba(30,41,59,0.6)",color:"#f1f5f9",transition:"all 0.2s"}}),e.jsx("button",{onClick:Ln,disabled:Yt||!Se.trim(),style:{width:42,height:42,borderRadius:14,border:"none",cursor:Se.trim()?"pointer":"default",background:Se.trim()?"linear-gradient(135deg,#0071e3,#7c3aed)":"rgba(30,41,59,0.8)",color:Se.trim()?"#fff":"#64748b",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0},children:"↑"})]}),e.jsx("div",{style:{fontSize:10,color:"#b0b0b6",textAlign:"center",marginTop:6},children:"AI assistant for mainframe learning · Powered by Claude"})]})]}),e.jsx("footer",{style:{borderTop:"1px solid rgba(255,255,255,0.06)",background:"rgba(17,24,39,0.6)",backdropFilter:"blur(20px)",padding:"28px 0"},children:e.jsxs("div",{style:{...i.inner,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12},children:[e.jsxs("span",{style:{fontSize:12,color:"#94a3b8",display:"flex",alignItems:"center",gap:6},children:[e.jsx("img",{src:"/favicon.svg",alt:"",style:{width:16,height:16,borderRadius:3}})," MainframeStudyHub Hub — The complete IBM Z knowledge platform. A to Z, Beginner to Professional."]}),e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap"},children:[["home","Overview"],["topics","Topics"],["scenarios","Scenarios"],["blog","Blog"],["quiz","Quiz"],["community","Community"],["weekly","Weekly"]].map(([t,n])=>e.jsx("button",{onClick:()=>q(t),style:{background:"none",border:"none",color:"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:S},children:n},t))})]})})]})}const _={width:"100%",padding:"12px 14px",fontSize:14,border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:10,outline:"none",fontFamily:S,background:"rgba(30,41,59,0.8)",marginBottom:12,color:"#f1f5f9",transition:"border-color 0.2s"},i={root:{fontFamily:S,background:"transparent",color:"#e2e8f0",minHeight:"100vh",overflowX:"hidden"},nav:{position:"fixed",top:0,left:0,right:0,zIndex:1e3,height:52,transition:"background .3s,box-shadow .3s",background:"rgba(8,11,22,0.85)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.06)"},navInner:{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:52,display:"flex",alignItems:"center"},navLogo:{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",color:"#f1f5f9",fontFamily:S},navLinks:{display:"flex",gap:0,marginLeft:"auto",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none",maxWidth:"calc(100vw - 200px)",flexShrink:1},navLink:{background:"none",border:"none",cursor:"pointer",fontSize:13,padding:"6px 11px",borderRadius:6,fontFamily:S,transition:"color .2s",whiteSpace:"nowrap",flexShrink:0},hamburger:{display:"flex",flexDirection:"column",background:"none",border:"none",cursor:"pointer",padding:"8px",marginLeft:"auto"},drawer:{position:"fixed",top:0,left:0,right:0,background:"rgba(8,11,22,0.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",zIndex:999,padding:"8px 0 24px",boxShadow:"0 8px 30px rgba(0,0,0,0.1)",maxHeight:"90vh",overflowY:"auto"},drawerLink:{display:"block",width:"100%",textAlign:"left",padding:"12px 24px",background:"none",border:"none",fontSize:17,fontWeight:500,cursor:"pointer",fontFamily:S,color:"#e2e8f0"},drawerTopicLink:{display:"block",width:"100%",textAlign:"left",padding:"9px 24px",background:"none",border:"none",fontSize:14,color:"#f1f5f9",cursor:"pointer",fontFamily:S},heroInner:{maxWidth:720,margin:"0 auto",padding:"0 24px"},btnBlue:{background:"#0071e3",color:"#fff",border:"none",borderRadius:980,padding:"12px 24px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:S},btnGhost:{background:"transparent",color:"#0071e3",border:"1.5px solid #0071e3",borderRadius:980,padding:"12px 24px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:S},section:{padding:"72px 0"},inner:{maxWidth:1200,margin:"0 auto",padding:"0 24px"},sectionTitle:{fontSize:"clamp(26px,4vw,44px)",fontWeight:800,letterSpacing:"-1.5px",color:"#f1f5f9",marginBottom:36},topicsGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:14},topicCard:{background:"rgba(17,24,39,0.8)",borderRadius:16,border:"1px solid rgba(255,255,255,0.08)",padding:"20px 18px",cursor:"pointer",textAlign:"left",boxShadow:"0 2px 16px rgba(0,0,0,0.3)",backdropFilter:"blur(12px)",transition:"transform 0.3s ease,box-shadow 0.3s ease"},tcTitle:{fontSize:16,fontWeight:700,color:"#f1f5f9",marginBottom:4},tcSub:{fontSize:12,color:"#94a3b8",marginBottom:6,lineHeight:1.4},tcMore:{fontSize:13,fontWeight:600},featureCard:{background:"rgba(17,24,39,0.8)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:"32px 28px",cursor:"pointer",textAlign:"left",boxShadow:"0 4px 20px rgba(0,0,0,0.3)",backdropFilter:"blur(12px)",transition:"transform 0.3s ease,box-shadow 0.3s ease"},fcTitle:{fontSize:20,fontWeight:700,color:"#f1f5f9",marginBottom:10},fcDesc:{fontSize:14,color:"#94a3b8",lineHeight:1.6},pageHero:{padding:"64px 24px 36px",maxWidth:1200,margin:"0 auto"},pageHeroTitle:{fontSize:"clamp(34px,5vw,60px)",fontWeight:800,letterSpacing:"-2px",color:"#f1f5f9",marginBottom:12},pageHeroSub:{fontSize:18,color:"#94a3b8",fontWeight:400,maxWidth:620},searchInput:{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"8px 12px 8px 32px",fontSize:14,color:"#e2e8f0",outline:"none",fontFamily:S,width:220},pill:{border:"none",borderRadius:980,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:S,transition:"all .15s"},backBtn:{background:"none",border:"none",color:"#60a5fa",cursor:"pointer",fontSize:15,fontFamily:S,marginBottom:20,padding:0},contentPre:{fontSize:15.5,color:"#cbd5e1",lineHeight:2.05,whiteSpace:"pre-wrap",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif",letterSpacing:"-.15px",wordSpacing:"0.5px"},codeWrap:{borderRadius:14,overflow:"hidden",border:"1.5px solid rgba(255,255,255,0.1)",background:"#1c1c1e",marginTop:20},codeTopBar:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",background:"#2c2c2e"},codePre:{padding:"22px",margin:0,fontSize:13,lineHeight:1.85,overflowX:"auto",fontFamily:Tt},prevNextBtn:{background:"rgba(17,24,39,0.6)",border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"14px 18px",cursor:"pointer",textAlign:"left",fontFamily:S,color:"#f1f5f9",flex:"0 0 auto",maxWidth:260},diffBadge:{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:980},blogCard:{background:"rgba(17,24,39,0.8)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:18,padding:"24px",cursor:"pointer",textAlign:"left",boxShadow:"0 2px 16px rgba(0,0,0,0.3)",backdropFilter:"blur(12px)"}};class is extends Ie.Component{constructor(T){super(T),this.state={error:null}}static getDerivedStateFromError(T){return{error:T}}render(){return this.state.error?Ie.createElement("div",{style:{padding:40,fontFamily:"system-ui",textAlign:"center"}},Ie.createElement("h1",{style:{color:"#e74c3c"}},"Something went wrong"),Ie.createElement("pre",{style:{background:"#f5f5f5",padding:20,borderRadius:12,textAlign:"left",overflow:"auto",maxWidth:600,margin:"20px auto",fontSize:13}},this.state.error.toString()),Ie.createElement("button",{onClick:()=>{this.setState({error:null}),window.location.reload()},style:{background:"#0071e3",color:"#fff",border:"none",borderRadius:8,padding:"10px 24px",cursor:"pointer",fontSize:15,marginTop:16}},"Reload")):this.props.children}}an.createRoot(document.getElementById("root")).render(Ie.createElement(is,null,Ie.createElement(ss)));export{e as j};
//# sourceMappingURL=index-CmGPCDUU.js.map
