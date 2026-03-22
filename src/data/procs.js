export const PROCS_TOPIC = {
  id:"procs", icon:"📋", title:"PROCs & Utilities", subtitle:"JCL PROCs, DFSORT, ICETOOL, Utilities", color:"#ef4444", level:"Beginner → Expert",
  description:"Production JCL is built on reusable procedures and powerful utilities. Master them and you can automate anything.",
  sections:[
    { title:"Understanding JCL PROCs", level:"Beginner",
      content:`JCL Procedures (PROCs) — Reusable JCL Templates:

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
  Overridden on EXEC statement: //STEP EXEC MYPROC,PARAM=value`,
      code:`//* ═══ IN-STREAM PROC ════════════════════════════════════
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
//         DD DSN=PROD.SHARED.LOADLIB,DISP=SHR`
    },
    { title:"DFSORT Fundamentals", level:"Beginner",
      content:`DFSORT (Data Facility Sort) — The Universal Data Tool:

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
  Y2T, Y2W, etc. — Date formats`,
      code:`//* ─── BASIC SORT ──────────────────────────────────────
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
//SYSOUT   DD SYSOUT=*`
    },
    { title:"DFSORT INCLUDE/OMIT & INREC/OUTREC", level:"Intermediate",
      content:`Filtering and Transforming Records:

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
  EDIT=(TTT-TT-TTTT)   → 123-45-6789`,
      code:`//* ─── COMPLEX FILTER ──────────────────────────────────
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
//SYSOUT   DD SYSOUT=*`
    },
    { title:"DFSORT OUTFIL — Multiple Outputs", level:"Intermediate",
      content:`OUTFIL — Write to Multiple Output Files:

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

This means DFSORT can replace many report-generating COBOL programs!`,
      code:`//* ─── SPLIT FILE BY REGION ─────────────────────────────
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
//SYSOUT   DD SYSOUT=*`
    },
    { title:"ICETOOL — Multi-Function Utility", level:"Intermediate",
      content:`ICETOOL — The Power Tool of DFSORT:

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
  EQUAL(n)  — keys occurring exactly n times`,
      code:`//* ─── ICETOOL: Multiple operations in one step ────────
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
/*`
    },
    { title:"IBM Utility Programs", level:"Intermediate",
      content:`Essential IBM Utility Programs — Complete Reference:

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
  RELEASE — release unused space`,
      code:`//* ─── ICEGENER: Fast copy ─────────────────────────────
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
/*`
    },
    { title:"Advanced DFSORT Techniques", level:"Advanced",
      content:`Advanced DFSORT — Replace COBOL Programs:

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
   Y4T — 4-digit year, TRAN=MDYY etc.`,
      code:`//* ─── JOINKEYS: Full outer join ────────────────────────
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
//SYSOUT   DD SYSOUT=*`
    },
    { title:"Production PROC Patterns", level:"Advanced",
      content:`Production PROC Design Patterns:

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
  //*   2025-02-01 Added DB2 precompile support`,
      code:`//* ═══════════════════════════════════════════════════════
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
//       PEND`
    },

    { title:"DFSORT SORT FIELDS", level:"Beginner",
      content:`SORT FIELDS specifies which fields to sort by and in what order.

Syntax:
  SORT FIELDS=(start,length,format,order)
  
  start — Starting byte position (1-based)
  length — Field length in bytes
  format — Data format
  order — A (ascending) or D (descending)

Formats:
  CH — Character (EBCDIC)
  ZD — Zoned Decimal (display numeric)
  PD — Packed Decimal (COMP-3)
  BI — Binary (COMP)
  FI — Fixed-point binary (signed)

Examples:
  SORT FIELDS=(1,8,CH,A) — Sort by first 8 chars ascending
  SORT FIELDS=(1,5,CH,A,10,3,PD,D) — Sort by pos 1-5 ascending, then pos 10-12 packed descending

COPY:
  SORT FIELDS=COPY — Copy without sorting (just apply INCLUDE/OMIT/OUTREC)

Pro Tip: Always verify byte positions against the record layout. Off-by-one position errors produce garbage sorts.`
    },

    { title:"DFSORT INCLUDE & OMIT", level:"Beginner",
      content:`Filter records — INCLUDE keeps matching records, OMIT removes them.

INCLUDE:
  INCLUDE COND=(1,2,CH,EQ,C'IT') — Keep records where pos 1-2 = 'IT'
  INCLUDE COND=(10,5,PD,GT,+50000) — Keep where packed field > 50000

OMIT:
  OMIT COND=(1,2,CH,EQ,C'XX') — Remove records where pos 1-2 = 'XX'

Operators:
  EQ — Equal
  NE — Not equal
  GT — Greater than
  GE — Greater or equal
  LT — Less than
  LE — Less or equal

Compound Conditions:
  INCLUDE COND=(1,2,CH,EQ,C'IT',AND,10,5,PD,GT,+50000)
  INCLUDE COND=(1,2,CH,EQ,C'IT',OR,1,2,CH,EQ,C'HR')

Substring:
  INCLUDE COND=(1,80,SS,EQ,C'ERROR') — Substring search anywhere in pos 1-80

Pro Tip: INCLUDE and OMIT are mutually exclusive — use one or the other, not both.`
    },

    { title:"DFSORT OUTREC & INREC", level:"Intermediate",
      content:`Reformat records — add, remove, rearrange fields.

OUTREC (after sort):
  OUTREC FIELDS=(1,8,20,5,C' - ',10,10)
  Output: bytes 1-8, then bytes 20-24, then literal ' - ', then bytes 10-19

INREC (before sort):
  INREC FIELDS=(1,8,20,5,10,10)
  Reformat input BEFORE sorting — useful to reduce sort work.

Literals:
  C'text' — Character literal
  X'F0F1' — Hex literal
  +0 — Numeric zero

Padding/Truncating:
  OUTREC FIELDS=(1,50,51:C' ',80:C' ') — Pad with spaces to position 80

Date Formatting:
  OUTREC FIELDS=(1,8,Y4T=TOGREG,TOSTD=(MDs,C'/',DDs,C'/',Y4T))
  Convert date formats.

IFTHEN:
  OUTREC IFTHEN=(WHEN=(1,2,CH,EQ,C'HR'),BUILD=(1,80,81:C'HUMAN RESOURCES')),
         IFTHEN=(WHEN=NONE,BUILD=(1,80,81:C'OTHER'))
  Conditional reformatting.

Pro Tip: INREC for reshaping input, OUTREC for formatting output. INREC reduces data before sort — faster for large files.`
    },

    { title:"DFSORT SUM & Aggregation", level:"Intermediate",
      content:`SUM consolidates duplicate records by accumulating numeric fields.

SUM FIELDS:
  SORT FIELDS=(1,5,CH,A)
  SUM FIELDS=(10,4,PD)
  
  Groups records by sort key (pos 1-5).
  Adds packed decimal field at pos 10-13 across duplicates.
  Output: One record per unique key with totals.

SUM FIELDS=NONE:
  SORT FIELDS=(1,5,CH,A)
  SUM FIELDS=NONE
  
  Remove duplicates without summing. Keep first occurrence only.

Multiple SUM Fields:
  SUM FIELDS=(10,4,PD,20,4,PD,30,8,PD)
  Sum three fields simultaneously.

Count:
  No built-in count. Use ICETOOL COUNT or add a 1 field:
  INREC FIELDS=(1,80,81:+1,4,PD)
  SUM FIELDS=(81,4,PD)
  Adds a 1 to each record, SUM counts them.

Pro Tip: SORT + SUM FIELDS=NONE is the fastest way to deduplicate a file — much faster than a COBOL program.`
    },

    { title:"DFSORT JOINKEYS", level:"Advanced",
      content:`JOINKEYS merges two files by matching key fields — like SQL JOIN in DFSORT.

Syntax:
  JOINKEYS FILE=F1,FIELDS=(1,8,A)
  JOINKEYS FILE=F2,FIELDS=(1,8,A)
  JOIN UNPAIRED,F1,F2
  REFORMAT FIELDS=(F1:1,80,F2:9,72)

JOIN Types:
  JOIN UNPAIRED — All records from both files (FULL OUTER JOIN)
  JOIN UNPAIRED,F1 — All from F1, matched from F2 (LEFT JOIN)
  JOIN UNPAIRED,F2 — All from F2, matched from F1 (RIGHT JOIN)
  JOIN (default) — Only matched records (INNER JOIN)

REFORMAT:
  Combines fields from both files into output record.
  F1:start,length — Fields from file 1
  F2:start,length — Fields from file 2
  ?,length,format — Fill with blanks/zeros for unmatched

Example — Match Employees with Departments:
  //F1 DD — Employee file (empid pos 1-8, name pos 9-38)
  //F2 DD — Department file (deptid pos 1-8, deptname pos 9-28)
  JOINKEYS FILE=F1,FIELDS=(40,3,A)  /* dept code in emp file */
  JOINKEYS FILE=F2,FIELDS=(1,3,A)   /* dept code in dept file */
  JOIN UNPAIRED,F1
  REFORMAT FIELDS=(F1:1,80,F2:9,20)

Pro Tip: JOINKEYS is incredibly powerful — it replaces what would take a 200-line COBOL match-merge program.`
    },

    { title:"ICETOOL — Multi-Function Utility", level:"Intermediate",
      content:`ICETOOL performs multiple DFSORT operations in one step.

Operations:
  SORT — Sort a file
  COPY — Copy with selection
  COUNT — Count records
  SELECT — Select records by occurrence count
  UNIQUE — Unique values of a field
  STATS — Statistics (min, max, avg, sum, count)
  DISPLAY — Formatted report output
  RANGE — Count values in ranges
  VERIFY — Check data validity
  OCCUR — Count occurrences per value

Example — Statistics:
  ICETOOL
    STATS FROM(INPUT) ON(10,4,PD) — Min, max, avg, total for packed field

Example — Count Duplicates:
  ICETOOL
    SELECT FROM(INPUT) TO(DUPES) ON(1,8,CH) HIGHER(1)
  Selects records where key appears more than once.

Example — Report:
  ICETOOL
    DISPLAY FROM(INPUT) LIST(REPORT) -
      HEADER('Employee Report') -
      ON(1,8,CH,A1) ON(10,20,CH,A2) ON(40,8,PD,N1) -
      TITLE('ID') TITLE('Name') TITLE('Salary')

Pro Tip: ICETOOL replaces many one-off COBOL report programs. STATS + DISPLAY handles 80% of quick analysis needs.`
    },

    { title:"DFSORT — JCL Patterns", level:"Beginner",
      content:`Standard JCL for running DFSORT.

Basic SORT:
  //SORT EXEC PGM=SORT
  //SORTIN DD DSN=input,DISP=SHR
  //SORTOUT DD DSN=output,DISP=(NEW,CATLG),
  //   SPACE=(CYL,(10,5)),DCB=(RECFM=FB,LRECL=80)
  //SYSOUT DD SYSOUT=*
  //SYSIN DD *
    SORT FIELDS=(1,8,CH,A)
  /*

ICETOOL:
  //TOOL EXEC PGM=ICETOOL
  //TOOLMSG DD SYSOUT=*
  //DFSMSG DD SYSOUT=*
  //INPUT DD DSN=input,DISP=SHR
  //OUTPUT DD DSN=output,...
  //TOOLIN DD *
    SORT FROM(INPUT) TO(OUTPUT) USING(CTL1)
  /*
  //CTL1CNTL DD *
    INCLUDE COND=(1,2,CH,EQ,C'IT')
    SORT FIELDS=(10,8,CH,A)
  /*

Work Datasets:
  //SORTWKnn DD — Sort work space
  SORT automatically allocates if not provided.
  For large sorts: explicitly allocate SORTWKs for better performance.

Pro Tip: Let DFSORT auto-allocate work datasets for most jobs. Explicit SORTWKs only for very large sorts (100M+ records).`
    },

    { title:"DFSORT — Real-World Examples", level:"Intermediate",
      content:`Common DFSORT recipes for everyday mainframe tasks.

Remove Duplicates:
  SORT FIELDS=(1,10,CH,A)
  SUM FIELDS=NONE

Extract Unique Values:
  SORT FIELDS=(20,3,CH,A)
  SUM FIELDS=NONE
  OUTREC FIELDS=(20,3)

Top N Records:
  SORT FIELDS=(40,8,PD,D)
  OUTFIL STARTREC=1,ENDREC=10

Split File by Value:
  OUTFIL FNAMES=ITMEM,INCLUDE=(1,2,CH,EQ,C'IT')
  OUTFIL FNAMES=HRMEM,INCLUDE=(1,2,CH,EQ,C'HR')
  OUTFIL FNAMES=OTHER,SAVE

Add Sequence Numbers:
  INREC FIELDS=(1,80,SEQNUM,8,ZD)

Count Records by Group:
  SORT FIELDS=(1,3,CH,A)
  OUTFIL REMOVECC,SECTIONS,
    HEADER1=(1,3,5:COUNT=(M11,LENGTH=8))

Add Header and Trailer:
  OUTFIL HEADER1=('HD',DATE=(4MD/),C',',TIME),
         TRAILER1=('TR',COUNT=(M11,LENGTH=8))

Pro Tip: DFSORT handles most data transformation tasks faster than COBOL. Learn these recipes — they save hours of coding.`
    },

    { title:"DFSORT — OUTFIL Advanced", level:"Advanced",
      content:`OUTFIL creates multiple output files and adds headers/trailers.

Multiple Outputs:
  OUTFIL FNAMES=OUT1,INCLUDE=(1,2,CH,EQ,C'AA')
  OUTFIL FNAMES=OUT2,INCLUDE=(1,2,CH,EQ,C'BB')
  OUTFIL FNAMES=OUT3,SAVE  /* Everything else */

SECTIONS (Control Break):
  OUTFIL SECTIONS=(1,3,
    HEADER3=(1,3,10:C'Section Total:'),
    TRAILER3=(10:TOT=(20,8,PD,EDIT=(TTT,TTT,TTT.TT))))
  Automatic subtotals per section.

Conversion:
  OUTREC FIELDS=(1,8,10,8,PD,EDIT=(TTT,TTT,TTT.TT))
  Packed decimal → Readable number with commas and decimal.

EDIT Patterns:
  EDIT=(TTT,TTT,TTT.TT) — 999,999,999.99
  EDIT=(TTTTTTTT) — 99999999
  EDIT=(SI,TTT.TT) — Sign + number
  T = digit, I = insert sign

SPLIT:
  OUTFIL FNAMES=OUT1,SPLIT — Round-robin across output files
  OUTFIL FNAMES=OUT1,SPLITBY=1000 — 1000 records per file

Pro Tip: OUTFIL SECTIONS with TRAILER3 TOT= is the fastest way to get subtotals — no COBOL needed.`
    },


    { title:"Interview Questions", level:"All Levels",
      content:`DFSORT/Utilities Interview Questions — 15+ Q&A.

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

💡 Study Tip: Master SORT FIELDS, INCLUDE/OMIT, OUTREC BUILD, and JOINKEYS.`,
    },

    { title:"PROCs & Utilities Cheat Sheet", level:"All Levels",
      content:`DFSORT/Utilities Quick Reference

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
EQ NE GT LT GE LE`,
    },
    { title:"Interview Questions — PROCs & Utilities", level:"All Levels",
      content:`PROCs & Utilities Interview Questions:

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
A: Use ICETOOL SPLICE or DFSORT JOINKEYS. SPLICE is simpler for basic joins: SPLICE FROM(MASTER) TO(OUTPUT) ON(1,6,CH) WITH(TRANS) USING(CTL1). JOINKEYS is more powerful for complex joins including outer joins: JOINKEYS FILE=F1,FIELDS=(1,6,A) / JOINKEYS FILE=F2,FIELDS=(1,6,A) / JOIN UNPAIRED,F1,F2.`
    }
  ]
};
