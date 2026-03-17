export const JCL_TOPIC = {
  id:"jcl", icon:"⚙️", title:"JCL", subtitle:"Job Control Language", color:"#0071e3", level:"Beginner → Expert",
  description:"The command language of z/OS batch. Every production job on the planet's busiest systems starts here.",
  sections:[
    { title:"What is JCL?", level:"Beginner",
      content:`Job Control Language (JCL) is the scripting language used to instruct IBM z/OS how to run batch jobs. It acts as the interface between your program and the operating system — telling z/OS which program to run, what data to use, and what to do with the results.

JCL was introduced with OS/360 in 1964 and has evolved through MVS, OS/390, and z/OS. Despite its age, JCL remains the backbone of mainframe batch processing because of its precision, reliability, and integration with z/OS subsystems.

Every JCL job stream consists of three fundamental types of statements:
  • JOB statement   — Identifies the job and provides accounting info
  • EXEC statement  — Names the program or catalogued procedure to run
  • DD statement    — Defines every dataset (file) the program uses

JCL is column-sensitive in positions 1–72. Position 73–80 is the sequence number field (ignored by z/OS but used by editors). All JCL statements begin with // in columns 1–2.

Why JCL still matters:
  • 68% of the world's transactions pass through mainframes
  • Every bank, airline, insurance company, and government agency runs JCL daily
  • A single JCL error can halt millions of dollars in processing
  • Understanding JCL is the gateway to every other mainframe technology

JCL Processing Flow:
  1. You submit JCL through TSO/ISPF, a scheduling tool, or internal reader
  2. JES2 (or JES3) receives the job and assigns a job number
  3. JES scans for syntax errors (conversion phase)
  4. The job enters the input queue, prioritized by CLASS and PRTY
  5. The initiator selects the job when resources are available
  6. z/OS allocates datasets, loads programs, and executes each step
  7. Output is routed to SPOOL (held or printed based on MSGCLASS)
  8. The job is purged from JES after output is processed

Key Terminology:
  • Job — A unit of work submitted to z/OS for batch execution
  • Step — One program execution within a job (a job can have 255 steps)
  • Dataset — A mainframe file (sequential, partitioned, or VSAM)
  • SPOOL — Temporary storage for job output managed by JES
  • Initiator — A z/OS address space that selects and runs batch jobs
  • Catalog — The master index of all datasets on the system`
    },
    { title:"JCL Structure & Syntax Rules", level:"Beginner",
      content:`Understanding JCL syntax is critical — a misplaced comma or a column error will cause your job to fail before it even starts.

JCL Statement Format:
  Columns 1-2:    // (identifies this as a JCL statement)
  Column 3:       Name field begins (optional, 1-8 chars)
  After name:     At least one space, then the operation field
  After operation: At least one space, then the operand field
  After operand:  At least one space, then optional comments

Statement Types:
  //name     JOB    operands    — Job statement
  //name     EXEC   operands    — Execute statement
  //name     DD     operands    — Data Definition statement
  //*                           — Comment statement
  //         IF/THEN/ELSE/ENDIF — Conditional processing
  /*                            — Delimiter statement (end of in-stream data)

Continuation Rules:
  • To continue a statement, break after a complete parameter (including comma)
  • Code // in columns 1–2 of the next line
  • Continue the operand starting anywhere in columns 4–16
  • Non-operand continuations start in column 16 (convention)

Special Statements:
  //*  — Comment. JES ignores everything after //*
  /*   — Delimiter. Marks the end of in-stream data (SYSIN DD *)
  //   — Null statement. Marks the end of a job

Naming Rules:
  • Names must start with A-Z or national character (@, #, $)
  • Names can be 1–8 characters: A-Z, 0-9, @, #, $
  • Names are NOT case-sensitive (converted to uppercase)
  • Step names must be unique within a job
  • DD names must be unique within a step

Common Syntax Errors:
  • Missing comma between parameters — remainder treated as comment
  • Continuation not in column 4-16 — statement not recognized
  • Space within a parameter — operands considered finished
  • Name longer than 8 characters — truncation or error`,
      code:`//* ─── JCL STATEMENT ANATOMY ─────────────────────
//* Col 1-2: //
//* Col 3:   Name field starts (1-8 chars)
//* Then:    Space + Operation + Space + Operands
//*
//PAYROLL  JOB (ACCT001,'DEPT-FIN'),
//             'PAYROLL PROCESSING',
//             CLASS=A,
//             MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID
//*
//STEP1    EXEC PGM=PAYROLLP
//*
//INPUT    DD DSN=PAY.MASTER.FILE,
//            DISP=SHR
//*
//OUTPUT   DD DSN=PAY.REPORT.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE),
//            DCB=(RECFM=FB,LRECL=133,BLKSIZE=0)
//*
//SYSPRINT DD SYSOUT=*
//* This is a comment — ignored by JES`
    },
    { title:"JOB Statement Deep Dive", level:"Beginner",
      code:`//PAYROLL  JOB (ACCT001,'DEPT-FIN'),
//             'PAYROLL PROCESSING',
//             CLASS=A,
//             MSGCLASS=X,
//             MSGLEVEL=(1,1),
//             NOTIFY=&SYSUID,
//             REGION=0M,
//             TIME=(0,30),
//             TYPRUN=SCAN,
//             RESTART=STEP3,
//             PRTY=8`,
      content:`JOB Statement Parameters — Complete Reference:

CLASS (Job Class):
  Controls which initiator can run the job.
  CLASS=A might be high priority production, CLASS=T testing.
  Classes are defined by your installation's JES2 init parameters.

MSGCLASS (Message Class):
  Where job output (JESMSGLG, JESJCL, JESYSMSG) is written.
  X = held output, A = auto-purge after printing, H = held indefinitely.

MSGLEVEL=(statements, messages):
  Controls how much JCL and allocation info appears in output.
  stmts:    0=JOB only, 1=all JCL, 2=all JCL+expanded procs
  messages: 0=only if abend, 1=all allocation/termination messages
  Best practice: (1,1) for development, (0,0) for clean production.

REGION:
  Virtual storage available. REGION=0M gives maximum.
  Common: 4M (small), 64M (COBOL), 0M (no limit).

TIME:
  CPU time limit. TIME=(minutes,seconds).
  TIME=1440 means no limit. If exceeded: S322 abend.

NOTIFY:
  Send completion message. NOTIFY=&SYSUID sends to submitter.

TYPRUN:
  SCAN — syntax check only, no execution
  HOLD — place in hold queue, must be released manually

RESTART:
  Restart from a specific step after failure.
  RESTART=STEP3 — skip steps before STEP3.

PRTY:
  JES scheduling priority. Higher = selected sooner.

USER/GROUP:
  RACF security identity for the job.

SCHENV:
  WLM scheduling environment — ensures job runs on correct system.`
    },
    { title:"EXEC Statement", level:"Beginner",
      code:`//STEP1   EXEC PGM=IDCAMS
//STEP2   EXEC PROC=COBCLG
//STEP3   EXEC COBCLG
//STEP4   EXEC PGM=MYPROG,
//             PARM='MODE=BATCH,DEBUG=Y',
//             REGION=4M,
//             TIME=(1,0),
//             COND=(0,LT,STEP1)`,
      content:`EXEC Statement — Complete Reference:

PGM= (Program Name):
  Specifies the load module to execute. z/OS searches:
  1. STEPLIB DD (if coded in this step)
  2. JOBLIB DD (if coded after JOB statement)
  3. Link Pack Area (LPA)
  4. System link list (LNKLST)

PROC= (Procedure Name):
  Execute a catalogued procedure from PROCLIB.
  PROC= is optional: //STEP EXEC COBCLG works too.

PARM= (Parameters):
  Pass parameters to the program. Max 100 characters.
  In COBOL: accessed via LINKAGE SECTION.
  Enclose in quotes for special characters.

COND= (Condition Code):
  COND=(code,operator,stepname) — SKIP this step if true
  Operators: LT, LE, EQ, NE, GE, GT

  Logic: IF (code operator stepname.RC) THEN SKIP
  COND=(0,LT,STEP1) → IF 0 < STEP1.RC THEN SKIP
  In English: skip if STEP1 had a non-zero return code

  COND=EVEN — run even if previous step abended
  COND=ONLY — run ONLY if previous step abended
  Multiple: COND=((4,LT,STEP1),(8,LT,STEP2)) — OR logic`
    },
    { title:"DD Statement Mastery", level:"Intermediate",
      code:`//INPUT    DD DSN=MY.INPUT.FILE,
//             DISP=(OLD,KEEP,KEEP),
//             UNIT=SYSDA,
//             VOL=SER=PACK01
//
//OUTPUT   DD DSN=MY.OUTPUT.FILE,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(5,2),RLSE),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)
//
//SYSOUT   DD SYSOUT=*
//SYSIN    DD *
  SORT FIELDS=(1,10,CH,A)
/*
//
//CONCAT   DD DSN=FILE.ONE,DISP=SHR
//         DD DSN=FILE.TWO,DISP=SHR
//         DD DSN=FILE.THREE,DISP=SHR
//
//NULLDD   DD DUMMY
//TEMPDS   DD DSN=&&TEMP,
//             DISP=(NEW,PASS),
//             SPACE=(TRK,(10,5))`,
      content:`DD Statement — The Heart of JCL:

DSN= (Dataset Name):
  Fully qualified name up to 44 characters, qualifiers 1-8 chars.
  &&name — temporary dataset (job duration only)
  *.stepname.ddname — referback (use DSN from another DD)

DISP= (Disposition):
  DISP=(status, normal-disp, abnormal-disp)

  Status: NEW, OLD, SHR, MOD
  Normal: KEEP, DELETE, CATLG, UNCATLG, PASS
  Abnormal: same options

  Shorthand: DISP=SHR → (SHR,KEEP,KEEP)
  Best practice: DISP=(NEW,CATLG,DELETE) for new datasets

SPACE= (Space Allocation):
  SPACE=(unit,(primary,secondary,directory),RLSE)
  Units: TRK (tracks), CYL (cylinders), bytes
  RLSE releases unused space after job

DCB= (Data Control Block):
  RECFM: F, FB, V, VB, FBA, U
  LRECL: logical record length
  BLKSIZE: block size (0 = system determined)

UNIT=: SYSDA (disk), TAPE, 3390
VOL=SER=: specific volume serial
SYSOUT=: route output to JES spool
DUMMY: null file (program thinks it exists but no I/O)

Concatenation: Multiple DDs with same name (no name on 2nd+)`
    },
    { title:"Dataset Types & Organization", level:"Beginner",
      content:`z/OS Dataset Types — Complete Guide:

1. Sequential (PS — Physical Sequential):
   Records stored one after another. Read from beginning to end.
   Use: reports, flat files, logs. DSORG=PS.

2. Partitioned Dataset (PDS):
   Contains "members" — like a folder with files.
   Has directory pointing to each member. DSORG=PO.
   Limited to 16 extents, directory pre-allocated.
   Use: source code, JCL, load modules.

3. Partitioned Dataset Extended (PDSE):
   Modern PDS replacement. Dynamic directory, no extent limit,
   space automatically reused. DSNTYPE=LIBRARY.

4. VSAM Datasets:
   High-performance with multiple access methods:
   • KSDS — Key Sequenced (indexed, most common)
   • ESDS — Entry Sequenced (insertion order)
   • RRDS — Relative Record (by record number)
   • LDS  — Linear (byte-stream, used by DB2)
   Defined through IDCAMS, not JCL DCB.

5. Generation Data Groups (GDG):
   Version-controlled sequential datasets.
   Base: MY.DAILY.BACKUP
   Generation: MY.DAILY.BACKUP.G0001V00
   Relative: (0)=current, (-1)=previous, (+1)=new

6. Temporary Datasets:
   &&name syntax. Exist only during the job.
   DISP=(NEW,PASS) to pass to next step.

Dataset Naming:
  Max 44 chars. Qualifiers separated by dots (1-8 chars each).
  HLQ often = user ID or group.`,
      code:`//* Sequential Dataset
//SEQFILE  DD DSN=MY.SEQ.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE),
//            DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//*
//* PDS with directory blocks
//PDSLIB   DD DSN=MY.SOURCE.LIB,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(20,10,50)),
//            DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//*
//* PDSE (Partitioned Extended)
//PDSELIB  DD DSN=MY.PDSE.LIB,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(20,10,1)),
//            DSNTYPE=LIBRARY,
//            DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//*
//* GDG: New generation
//NEWGEN   DD DSN=MY.DAILY.BACKUP(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(50,25),RLSE)
//*
//* GDG: Read current
//CURGEN   DD DSN=MY.DAILY.BACKUP(0),DISP=SHR
//*
//* Temporary dataset
//TEMPFILE DD DSN=&&TEMP,
//            DISP=(NEW,PASS),
//            SPACE=(CYL,(5,2))`
    },
    { title:"Condition Codes & IF/THEN/ELSE", level:"Intermediate",
      content:`Return Codes and Conditional Processing:

Every program sets a return code (RC) on exit. By convention:
  RC = 0  — Successful
  RC = 4  — Warning (minor issue, usually OK)
  RC = 8  — Error (something significant)
  RC = 12 — Severe error
  RC = 16 — Terminal error

COND Parameter (Legacy):
  Tests return codes to SKIP a step.
  COND=(code,op,step) → IF (code op step.RC) THEN SKIP

  COND=(0,LT,STEP1) → skip if STEP1.RC > 0
  COND=(4,LT,STEP1) → skip if STEP1.RC > 4
  Multiple: COND=((4,LT,STEP1),(0,NE,STEP2)) — OR logic

IF/THEN/ELSE/ENDIF (Modern — Preferred):
  Much clearer and more powerful than COND.
  Supports: =, >, <, >=, <=, NOT, &(AND), |(OR)
  Can test: RC, ABEND, ABENDCC, RUN
  Can nest IF statements.`,
      code:`//* IF/THEN/ELSE Examples
//STEP1   EXEC PGM=EXTRACT
//*
//         IF (STEP1.RC = 0) THEN
//STEP2    EXEC PGM=TRANSFORM
//         ELSE
//STEP2B   EXEC PGM=ERRORLOG
//         ENDIF
//*
//* Complex conditions
//         IF (STEP1.RC <= 4 & STEP2.RC = 0) THEN
//STEP3    EXEC PGM=LOADDATA
//         ENDIF
//*
//* Check for abends
//         IF (STEP1.ABEND) THEN
//CLEANUP  EXEC PGM=CLEANUP
//         ENDIF
//*
//* NOT operator
//         IF (NOT STEP1.ABEND & STEP1.RC < 8) THEN
//STEP4    EXEC PGM=FINALRPT
//         ENDIF
//*
//* Nested IF
//         IF (STEP1.RC = 0) THEN
//           IF (STEP2.RC = 0) THEN
//STEP5      EXEC PGM=SUCCESS
//           ELSE
//STEP5B     EXEC PGM=PARTIAL
//           ENDIF
//         ELSE
//STEP5C   EXEC PGM=FAILURE
//         ENDIF`
    },
    { title:"JCL Procedures (PROCs)", level:"Intermediate",
      content:`Procedures — Reusable JCL Modules:

A PROC is a pre-written set of JCL statements that can be reused. Think of it as a function in JCL.

Types: In-stream (defined in the job) and Catalogued (stored in PROCLIB).

Benefits:
  • Eliminate repetitive coding
  • Standardize processing
  • Reduce errors — maintain one copy
  • Parameterize through symbolic parameters

Symbolic Parameters:
  Variables replaced at execution time. Defined with &prefix.
  SET statement defines defaults. Override on EXEC statement.
  System symbols: &SYSUID, &LYYMMDD, &SYSNAME.

  Double period for DSN qualifiers:
  &HLQ..COBOL → if HLQ=USER01, result is USER01.COBOL

Overriding PROC DD Statements:
  //stepname.ddname DD new-parameters
  Must match step.ddname format exactly.

PROC Rules:
  • Begins with //name PROC, ends with // PEND (in-stream)
  • Catalogued PROCs don't need PROC/PEND
  • Can contain EXEC and DD, but NOT JOB statements
  • Can be nested up to 15 levels`,
      code:`//* IN-STREAM PROC
//MYPROC  PROC HLQ=USER01,LIB=TEST.LOADLIB
//*
//COMPILE EXEC PGM=IGYCRCTL,
//             PARM='NOSEQUENCE,LIB,APOST'
//STEPLIB  DD DSN=IGY.V6R4M0.SIGYCOMP,DISP=SHR
//SYSIN    DD DSN=&HLQ..COBOL.SOURCE(&MBR),DISP=SHR
//SYSLIB   DD DSN=&HLQ..COPYBOOK,DISP=SHR
//SYSLIN   DD DSN=&&LOADSET,DISP=(MOD,PASS),
//            SPACE=(TRK,(10,10))
//SYSPRINT DD SYSOUT=*
//*
//LKED    EXEC PGM=IEWBLINK,COND=(8,LT,COMPILE)
//SYSLIB   DD DSN=CEE.SCEELKED,DISP=SHR
//SYSLIN   DD DSN=&&LOADSET,DISP=(OLD,DELETE)
//SYSLMOD  DD DSN=&LIB.(&MBR),DISP=SHR
//SYSPRINT DD SYSOUT=*
//        PEND
//*
//* CALLING THE PROC with overrides
//MYJOB   JOB ,'COMPILE',CLASS=A,NOTIFY=&SYSUID
//STEP1   EXEC MYPROC,HLQ=PROD,LIB=PROD.LOADLIB,
//             MBR=PAYROLL
//* Override a DD:
//COMPILE.SYSLIB DD DSN=PROD.COPYBOOK,DISP=SHR
//         DD DSN=PROD.COPYBOOK2,DISP=SHR`
    },
    { title:"IDCAMS Utility", level:"Intermediate",
      content:`IDCAMS — The Swiss Army Knife of z/OS:

The most important utility program. Manages catalogs, VSAM, and non-VSAM datasets.

Key Commands:
  DEFINE CLUSTER — Create VSAM dataset
  REPRO — Copy data between datasets
  DELETE — Delete dataset or catalog entry
  LISTCAT — Display catalog information
  PRINT — Display dataset contents
  ALTER — Change dataset attributes
  VERIFY — Reset end-of-file after abend
  DEFINE GDG — Create Generation Data Group base

DEFINE CLUSTER parameters:
  INDEXED (KSDS), NONINDEXED (ESDS), NUMBERED (RRDS)
  KEYS(length offset) — Key definition for KSDS
  RECORDSIZE(avg max) — Record size
  FREESPACE(ci ca) — Free space percentages
  SHAREOPTIONS(cross-region cross-system)

Common Return Codes:
  RC=0 Successful, RC=4 Warning, RC=8 Error, RC=12 Severe

SET MAXCC = 0 — Reset return code (useful after conditional DELETE).`,
      code:`//* CREATE VSAM KSDS
//DEFKSDS  EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  DELETE MY.EMPLOYEE.KSDS CLUSTER PURGE
  SET MAXCC = 0
  DEFINE CLUSTER -
    (NAME(MY.EMPLOYEE.KSDS) -
     INDEXED -
     KEYS(6 0) -
     RECORDSIZE(200 250) -
     FREESPACE(20 10) -
     SHAREOPTIONS(2 3) -
     SPEED) -
    DATA -
    (NAME(MY.EMPLOYEE.KSDS.DATA) -
     CYLINDERS(10 5)) -
    INDEX -
    (NAME(MY.EMPLOYEE.KSDS.INDEX) -
     TRACKS(5 2))
/*
//*
//* LOAD DATA INTO VSAM
//LOADVSAM EXEC PGM=IDCAMS
//INPUT    DD DSN=MY.FLAT.FILE,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  REPRO INFILE(INPUT) -
        OUTDATASET(MY.EMPLOYEE.KSDS)
/*
//*
//* DEFINE GDG BASE
//DEFGDG   EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  DEFINE GDG -
    (NAME(MY.DAILY.BACKUP) -
     LIMIT(30) SCRATCH NOEMPTY)
/*`
    },
    { title:"SORT & DFSORT", level:"Intermediate",
      content:`DFSORT — Data Transformation Powerhouse:

IBM's high-performance sort/merge/transform utility.

SORT FIELDS=(start,length,format,order,...)
  Formats: CH (char), ZD (zoned), PD (packed), BI (binary)
  Order: A (ascending), D (descending)

INCLUDE/OMIT — Filter records:
  INCLUDE COND=(1,5,CH,EQ,C'ACTIVE')
  OMIT COND=(10,2,ZD,LT,+18)

INREC/OUTREC — Transform records:
  OUTREC FIELDS=(1,10,X,20,5,C'TOTAL: ',
                 30,8,ZD,EDIT=(IIIIT.TT))

SUM — Summarize or deduplicate:
  SUM FIELDS=(50,8,PD) — sum packed field
  SUM FIELDS=NONE — remove duplicates

OUTFIL — Write to multiple output files:
  OUTFIL FNAMES=OUT1,INCLUDE=(1,2,CH,EQ,C'NY')
  OUTFIL FNAMES=OUT2,INCLUDE=(1,2,CH,EQ,C'CA')
  OUTFIL FNAMES=OUT3,SAVE

ICETOOL — Multi-purpose companion utility:
  COUNT, SELECT, UNIQUE, RANGE, DISPLAY, SPLICE.`,
      code:`//* BASIC SORT
//SORTJOB  EXEC PGM=SORT
//SORTIN   DD DSN=MY.INPUT.FILE,DISP=SHR
//SORTOUT  DD DSN=MY.SORTED.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE)
//SYSIN    DD *
  SORT FIELDS=(1,10,CH,A,15,5,ZD,D)
  INCLUDE COND=(30,6,CH,EQ,C'ACTIVE')
/*
//SYSOUT   DD SYSOUT=*
//*
//* SORT WITH REFORMATTING
//REFORM   EXEC PGM=SORT
//SORTIN   DD DSN=MY.RAW.DATA,DISP=SHR
//SORTOUT  DD DSN=MY.REPORT,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE),
//            DCB=(RECFM=FB,LRECL=133,BLKSIZE=0)
//SYSIN    DD *
  SORT FIELDS=(1,10,CH,A)
  OUTREC FIELDS=(C'Employee: ',1,30,
                 C' Salary: $',
                 40,8,ZD,EDIT=(IIII,IIT.TT),
                 C' Dept: ',50,4)
/*
//SYSOUT   DD SYSOUT=*
//*
//* REMOVE DUPLICATES
//DEDUP    EXEC PGM=SORT
//SORTIN   DD DSN=MY.FILE.DUPES,DISP=SHR
//SORTOUT  DD DSN=MY.UNIQUE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE)
//SYSIN    DD *
  SORT FIELDS=(1,10,CH,A)
  SUM FIELDS=NONE
/*
//SYSOUT   DD SYSOUT=*`
    },
    { title:"Common IBM Utilities", level:"Intermediate",
      content:`Essential IBM Utility Programs:

IEBGENER — Copy Sequential Datasets:
  Copies one sequential dataset to another.
  Modern alternative: ICEGENER (faster, uses DFSORT).

IEBCOPY — Copy PDS Members:
  Copy, compress, or merge partitioned datasets.
  SELECT MEMBER= to copy specific members.

IEFBR14 — The "Do Nothing" Program:
  Returns RC=0 immediately. Used solely for DD processing:
  Create empty datasets (DISP=NEW), delete (DISP=OLD,DELETE).

IEBUPDTE — Update PDS Members:
  Add, replace, modify members. Uses ./ control statements.

IEHLIST — List VTOC and Catalog:
  Display Volume Table of Contents information.

IEHMOVE — Move/Copy Datasets:
  Move or copy between volumes.

ADRDSSU (DFSMSdss) — Dump/Restore:
  High-performance backup/restore. Handles volumes and datasets.

IKJEFT01 — TSO Batch:
  Execute TSO commands in batch. Used for DB2 programs (DSN command).

IRXJCL — REXX in Batch:
  Execute REXX programs in batch mode.`,
      code:`//* IEBGENER: Copy a dataset
//COPY     EXEC PGM=IEBGENER
//SYSUT1   DD DSN=MY.SOURCE,DISP=SHR
//SYSUT2   DD DSN=MY.TARGET,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE)
//SYSPRINT DD SYSOUT=*
//SYSIN    DD DUMMY
//*
//* IEBCOPY: Copy PDS members
//PDSCP    EXEC PGM=IEBCOPY
//SYSUT3   DD UNIT=SYSDA,SPACE=(TRK,(5,5))
//SYSUT4   DD UNIT=SYSDA,SPACE=(TRK,(5,5))
//INDD     DD DSN=MY.SOURCE.PDS,DISP=SHR
//OUTDD    DD DSN=MY.TARGET.PDS,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  COPY OUTDD=OUTDD,INDD=INDD
  SELECT MEMBER=(MBR1,MBR2,MBR3)
/*
//*
//* IEFBR14: Create empty dataset
//CREATE   EXEC PGM=IEFBR14
//NEWFILE  DD DSN=MY.NEW.FILE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5)),
//            DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
//*
//* IKJEFT01: Run DB2 program
//DB2RUN   EXEC PGM=IKJEFT01
//STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
//SYSTSPRT DD SYSOUT=*
//SYSTSIN  DD *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(MYPROG) PLAN(MYPLAN) -
      LIB('MY.LOADLIB')
  END
/*`
    },
    { title:"GDG (Generation Data Groups)", level:"Intermediate",
      content:`GDGs — Version-Controlled Datasets:

Maintain multiple versions of a dataset under a single base name. Essential for daily/weekly processing.

Concepts:
  GDG Base — Catalog entry defining the group
  Generation — Individual dataset in the group
  Absolute: MY.DATA.G0001V00 (system-assigned)
  Relative: MY.DATA(0)=current, (-1)=previous, (+1)=new

GDG Base Parameters:
  LIMIT — Max generations to keep (1-255)
  SCRATCH — Delete dataset when rolled off
  NOSCRATCH — Uncatalog but keep rolled-off
  EMPTY — Delete ALL when limit reached
  NOEMPTY — Delete only oldest when limit reached

Creating a GDG:
  1. Define GDG base (IDCAMS DEFINE GDG)
  2. Create generations with (+1) in JCL

Best Practices:
  Always DISP=(NEW,CATLG,DELETE) for new generations.
  Use SCRATCH to auto-clean old data.
  Use NOEMPTY to avoid losing all data at once.
  Monitor catalog entries to prevent pollution.`,
      code:`//* Define GDG base
//DEFGDG   EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  DEFINE GDG -
    (NAME(PROD.DAILY.EXTRACT) -
     LIMIT(30) SCRATCH NOEMPTY)
/*
//*
//* Create new generation
//NEWGEN   EXEC PGM=MYPROG
//OUTPUT   DD DSN=PROD.DAILY.EXTRACT(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(50,25),RLSE),
//            DCB=(RECFM=FB,LRECL=200,BLKSIZE=0)
//*
//* Read current and previous
//COMPARE  EXEC PGM=COMPPROG
//CURRENT  DD DSN=PROD.DAILY.EXTRACT(0),DISP=SHR
//PREVIOUS DD DSN=PROD.DAILY.EXTRACT(-1),DISP=SHR
//*
//* Process all generations
//ALLGENS  EXEC PGM=HISTPROG
//ALLDATA  DD DSN=PROD.DAILY.EXTRACT,DISP=SHR`
    },
    { title:"Symbolic Parameters & SET", level:"Intermediate",
      content:`Symbolic Parameters — Dynamic JCL:

User-Defined Symbols:
  & prefix, 1-8 chars after. Defaults in PROC or SET.
  Double period to end before qualifier:
  &HLQ..COBOL → USER01.COBOL (if HLQ=USER01)

SET Statement:
  //name SET symbolic=value
  Can be used in job streams, not just PROCs.
  Later SET overrides earlier for same symbol.

System Symbols:
  &SYSUID   — TSO user ID of submitter
  &SYSNAME  — z/OS system name
  &SYSPLEX  — Sysplex name
  &LYYMMDD  — Date YYMMDD
  &LHHMMSS  — Time HHMMSS
  &LYR4     — 4-digit year
  &LMON     — Month (01-12)
  &LDAY     — Day of month
  &LWDAY    — Day of week (1=Mon)`,
      code:`//MYJOB   JOB ,'SYMBOL DEMO',CLASS=A,
//             MSGCLASS=X,NOTIFY=&SYSUID
//*
//         SET HLQ=PROD
//         SET ENV=LIVE
//         SET RUNDATE=&LYYMMDD
//*
//STEP1    EXEC PGM=MYPROG
//INPUT    DD DSN=&HLQ..&ENV..INPUT.DATA,DISP=SHR
//OUTPUT   DD DSN=&HLQ..&ENV..OUTPUT.D&RUNDATE,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE)
//*
//* Resolves to:
//* INPUT:  PROD.LIVE.INPUT.DATA
//* OUTPUT: PROD.LIVE.OUTPUT.D250227`
    },
    { title:"JCLLIB, STEPLIB & JOBLIB", level:"Intermediate",
      content:`Library Search Order:

JCLLIB — Where to find PROCs:
  Must be immediately after JOB statement.
  //MYJOB JCLLIB ORDER=(MY.PROCLIB1,MY.PROCLIB2)
  Search: in-stream PROCs → JCLLIB → default PROCLIBs

JOBLIB — Program library for ALL steps:
  DD statement after JOB, before first EXEC.
  //JOBLIB DD DSN=MY.LOADLIB,DISP=SHR

STEPLIB — Program library for ONE step:
  DD within a specific step.
  If STEPLIB coded, JOBLIB is NOT searched for that step.

Program Search Order:
  1. STEPLIB (if coded)
  2. JOBLIB (if coded and no STEPLIB)
  3. LPA (Link Pack Area)
  4. LNKLST (system link list)

Common Issues:
  S806 — program not found in any library
  Wrong version — library order matters
  RACF auth — user needs READ to load library`,
      code:`//MYJOB   JOB ,'LIBRARY DEMO',CLASS=A
//         JCLLIB ORDER=(MY.DEV.PROCLIB,
//                       SHARED.PROCLIB)
//*
//JOBLIB   DD DSN=MY.PROD.LOADLIB,DISP=SHR
//         DD DSN=SHARED.LOADLIB,DISP=SHR
//*
//STEP1    EXEC PGM=MYPROG1
//* → Searches JOBLIB then LPA then LNKLST
//*
//STEP2    EXEC PGM=MYPROG2
//STEPLIB  DD DSN=MY.TEST.LOADLIB,DISP=SHR
//* → STEPLIB ONLY (JOBLIB skipped)
//*
//* Common pattern: Test new version
//STEP3    EXEC PGM=PAYROLL
//STEPLIB  DD DSN=MY.TEST.LOADLIB,DISP=SHR
//         DD DSN=MY.PROD.LOADLIB,DISP=SHR`
    },
    { title:"JES2/JES3 & Job Processing", level:"Advanced",
      content:`JES — The Traffic Controller:

JES manages the lifecycle of every batch job. JES2 (most common ~90%) and JES3 (complex sysplex).

JES2 Job Processing Phases:

1. INPUT: Job received, number assigned, syntax scanned.
2. CONVERSION: JCL converted to control blocks, PROCs expanded, symbols resolved.
3. EXECUTION: Initiator selects job, datasets allocated, programs run.
4. OUTPUT: Output processed per MSGCLASS/SYSOUT classes.
5. PURGE: Job removed, SPOOL released.

JES2 vs JES3:
  JES2: Independent per system, own job queue, simpler.
  JES3: Centralized scheduling, global processor, auto device allocation.

SDSF Panels:
  DA — Active jobs, I — Input queue, O — Output queue
  H — Held output, ST — Status, LOG — System log

SDSF Commands:
  S — Select (view), ? — Browse JCL, P — Purge, C — Cancel`
    },
    { title:"Multi-Step Job Design", level:"Intermediate",
      content:`Designing Complex Multi-Step Jobs:

Design Principles:
  1. Single purpose per step
  2. Use &&temp for intermediate data
  3. Code proper IF/COND logic
  4. Include cleanup steps (even on failure)
  5. Make jobs restartable from any failed step
  6. Include NOTIFY for completion

Passing Data Between Steps:
  Temporary: //STEP1.OUT DD DSN=&&TEMP,DISP=(NEW,PASS)
  Permanent: //STEP1.OUT DD DSN=MY.WORK,DISP=(NEW,CATLG)
  Referback:  //STEP2.IN DD DSN=*.STEP1.OUT

Restartability:
  Use RESTART= on JOB. Design idempotent steps.
  Conditional delete before recreate.
  Cleanup with COND=EVEN.`,
      code:`//* PRODUCTION ETL JOB
//ETLJOB   JOB (PROD,'ETL'),CLASS=A,MSGCLASS=X,
//              NOTIFY=&SYSUID,RESTART=STEP010
//*
//STEP010  EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  LISTCAT ENTRIES(PROD.DAILY.INPUT) NAME
/*
//*
//         IF (STEP010.RC = 0) THEN
//STEP020  EXEC PGM=SORT
//SORTIN   DD DSN=PROD.DAILY.INPUT,DISP=SHR
//SORTOUT  DD DSN=&&SORTED,DISP=(NEW,PASS),
//            SPACE=(CYL,(20,10))
//SYSIN    DD *
  SORT FIELDS=(1,10,CH,A)
  INCLUDE COND=(80,1,CH,EQ,C'A')
/*
//SYSOUT   DD SYSOUT=*
//         ENDIF
//*
//         IF (STEP020.RC <= 4) THEN
//STEP030  EXEC PGM=ETLTRANS
//STEPLIB  DD DSN=PROD.LOADLIB,DISP=SHR
//INPUT    DD DSN=&&SORTED,DISP=(OLD,DELETE)
//OUTPUT   DD DSN=&&TRANSFORMED,DISP=(NEW,PASS),
//            SPACE=(CYL,(30,15))
//SYSPRINT DD SYSOUT=*
//         ENDIF
//*
//         IF (STEP030.RC = 0) THEN
//STEP040  EXEC PGM=IKJEFT01
//STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
//SYSTSPRT DD SYSOUT=*
//SYSTSIN  DD *
  DSN SYSTEM(DB2P)
  RUN PROGRAM(ETLLOAD) PLAN(ETLPLAN)
  END
/*
//         ENDIF
//*
//* CLEANUP — ALWAYS runs
//STEP050  EXEC PGM=IEFBR14,COND=EVEN
//TEMP1    DD DSN=&&SORTED,DISP=(OLD,DELETE)
//TEMP2    DD DSN=&&TRANSFORMED,DISP=(OLD,DELETE)`
    },
    { title:"JCL for COBOL Programs", level:"Intermediate",
      content:`Compiling and Running COBOL with JCL:

Three-Step Process:
  1. COMPILE — IGYCRCTL converts source to object code
  2. LINK-EDIT — IEWBLINK creates executable load module
  3. RUN — Execute the load module

Compile DD Statements:
  SYSIN — Source code, SYSLIB — Copybooks
  SYSLIN — Object output, SYSPRINT — Listing
  SYSUT1-7 — Work files

Link-Edit DD Statements:
  SYSLIN — Object input, SYSLIB — Runtime (CEE.SCEELKED)
  SYSLMOD — Load module output, SYSPRINT — Listing

COBOL-DB2: Extra steps for DBRM bind using IKJEFT01.`,
      code:`//* COMPILE + LINK + RUN
//COBRUN   JOB ,'COBOL BUILD',CLASS=A,
//              MSGCLASS=X,NOTIFY=&SYSUID
//*
//COMPILE  EXEC PGM=IGYCRCTL,
//              PARM='NOSEQUENCE,LIB,APOST,MAP,XREF'
//STEPLIB  DD DSN=IGY.V6R4M0.SIGYCOMP,DISP=SHR
//SYSIN    DD DSN=MY.COBOL.SRC(PAYROLL),DISP=SHR
//SYSLIB   DD DSN=MY.COPYBOOK,DISP=SHR
//SYSLIN   DD DSN=&&OBJMOD,DISP=(MOD,PASS),
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
//LKED     EXEC PGM=IEWBLINK,
//              COND=(8,LT,COMPILE)
//SYSLIB   DD DSN=CEE.SCEELKED,DISP=SHR
//SYSLIN   DD DSN=&&OBJMOD,DISP=(OLD,DELETE)
//SYSLMOD  DD DSN=MY.LOADLIB(PAYROLL),DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSUT1   DD UNIT=SYSDA,SPACE=(CYL,(1,1))
//*
//         IF (LKED.RC = 0) THEN
//RUN      EXEC PGM=PAYROLL
//STEPLIB  DD DSN=MY.LOADLIB,DISP=SHR
//INPUT    DD DSN=MY.EMPLOYEE.FILE,DISP=SHR
//OUTPUT   DD DSN=MY.PAYROLL.REPORT,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(5,2),RLSE)
//SYSOUT   DD SYSOUT=*
//         ENDIF`
    },
    { title:"Common Abend Codes", level:"Intermediate",
      content:`JCL & System Abend Codes — Quick Reference:

System Abends (Sxxx):
  S013 — Dataset I/O error. DCB mismatch, member not found.
  S0C1 — Operation exception. Invalid instruction.
  S0C4 — Protection exception. Bad pointer, subscript OOB.
  S0C7 — Data exception. Invalid packed decimal data.
  S0CB — Division by zero.
  S222 — Job cancelled by operator.
  S322 — CPU time exceeded. Increase TIME or fix infinite loop.
  S522 — Wait time exceeded.
  S706 — Module not found (load module).
  S806 — Program not found. Check PGM=, STEPLIB/JOBLIB.
  S913 — RACF security violation.
  SB37 — Out of space (end of volume).
  SD37 — Out of space (no secondary allocation).
  SE37 — Out of space (max extents reached).

User Abends:
  U0016 — SORT: SORTIN empty.
  U1026 — DFSORT: Invalid control statement.

JCL Errors (not abends):
  IEF212I — Dataset not found.
  IEF605I — Unbalanced parentheses.
  IEF621I — Invalid DD parameter.
  IEFC452I — Unresolved symbolic parameter.`
    },
    { title:"Advanced JCL Techniques", level:"Expert",
      content:`Advanced Patterns for Production Systems:

1. Checkpoint/Restart:
  For long jobs. Continue from checkpoint after failure.
  //STEP1 EXEC PGM=MYPROG,RD=R
  //SYSCHK DD DSN=MY.CHKPT.FILE,DISP=OLD

2. INCLUDE Groups:
  Reusable JCL fragments from a library.
  // INCLUDE MEMBER=STDALLOC

3. Output Descriptors (JES2):
  //RPTOUT OUTPUT DEST=REMOTE1,COPIES=3
  //REPORT DD SYSOUT=A,OUTPUT=*.RPTOUT

4. Dynamic Allocation (SVC 99):
  Allocate/deallocate within running program.

5. Backward References:
  //STEP2.IN DD DSN=*.STEP1.OUT

6. SMS Integration:
  Data Class, Storage Class, Management Class.
  DATACLAS=, STORCLAS=, MGMTCLAS= on DD.
  Simplifies JCL — SMS provides defaults.

7. CNTL/ENDCNTL:
  Pass complex control statements to programs.`,
      code:`//* INCLUDE Group
//PRODJOB  JOB (PROD,'ETL'),CLASS=A
//         JCLLIB ORDER=(PROD.INCLUDE.LIB)
// INCLUDE MEMBER=STDJOBHDR
//*
//STEP1   EXEC PGM=EXTRACT
// INCLUDE MEMBER=DB2LIBS
//INPUT   DD DSN=PROD.INPUT,DISP=SHR
//*
//* OUTPUT Descriptor
//RPT1OUT OUTPUT DEST=NYC.PRINTER,COPIES=3,
//               FORMS=GREENBAR,CLASS=A
//STEP2   EXEC PGM=REPORTER
//REPORT  DD SYSOUT=(A,,INVOICE),
//           OUTPUT=*.RPT1OUT
//*
//* Backward Reference
//STEP3   EXEC PGM=VERIFY
//INPUT   DD DSN=*.STEP1.OUTPUT`
    },
    { title:"Interview Questions & Practice", level:"All Levels",
      content:`JCL Interview Questions:

BEGINNER:
Q: Three basic JCL statements?
A: JOB, EXEC, DD.

Q: DISP=SHR vs DISP=OLD?
A: SHR=shared read, OLD=exclusive access.

Q: What is DISP=(NEW,CATLG,DELETE)?
A: Create NEW, catalog if OK, delete if abend.

Q: PDS vs PDSE?
A: PDS: fixed directory, 16 extents max, no space reclaim.
   PDSE: dynamic directory, more extents, auto space reclaim.

INTERMEDIATE:
Q: Explain COND=(4,LT,STEP1).
A: IF 4 < STEP1.RC THEN SKIP. Skip if RC > 4.

Q: JOBLIB vs STEPLIB?
A: JOBLIB for all steps, STEPLIB for one step. STEPLIB overrides JOBLIB.

Q: How pass data between steps?
A: Temp datasets (&&), permanent datasets, or referbacks (*.STEP.DD).

ADVANCED:
Q: What is SMS?
A: Storage Management Subsystem. Automates allocation via Data/Storage/Management classes.

Q: JES2 vs JES3?
A: JES2: independent per system. JES3: centralized sysplex scheduling.

Q: Design a restartable job?
A: RESTART= parameter, idempotent steps, conditional deletes, cleanup with COND=EVEN.`
    },
  ]
};
