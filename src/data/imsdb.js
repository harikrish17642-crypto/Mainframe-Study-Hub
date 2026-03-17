export const IMSDB_TOPIC = {
  id:"imsdb", icon:"🌳", title:"IMS DB", subtitle:"Hierarchical Database System", color:"#22c55e", level:"Beginner → Expert",
  description:"The grandfather of all databases. Still processing millions of transactions for the world's largest financial systems.",
  sections:[
    { title:"Introduction to IMS", level:"Beginner",
      content:`IMS (Information Management System) was developed by IBM and North American Rockwell for the Apollo space program in 1966. It is the world's first commercial database management system and remains one of the most powerful transaction processors ever built.

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
  IMS Connect — TCP/IP access for distributed applications`
    },
    { title:"Hierarchical Data Model", level:"Beginner",
      content:`Understanding the IMS Hierarchical Data Model:

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
  • There is no way to directly query TRANSACTION without knowing the path`
    },
    { title:"DL/I Calls — The IMS API", level:"Intermediate",
      code:`      * ─── DL/I CALL FORMAT ──────────────────────────────
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
                                 TXN-IO-AREA`,
      content:`DL/I (Data Language/Interface) — The IMS Programming API:

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
  where data to be inserted/replaced is staged.`
    },
    { title:"DBD — Database Description", level:"Intermediate",
      content:`DBD (Database Description) — Defining IMS Database Structure:

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
    Supports multiple areas, sequential dependent segments.`,
      code:`* ─── SAMPLE DBD GENERATION ──────────────────────────
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
         END`
    },
    { title:"PSB — Program Specification Block", level:"Intermediate",
      content:`PSB (Program Specification Block) — Program's View of the Database:

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
  • Missing SENSEG means that segment is NOT accessible`,
      code:`* ─── SAMPLE PSB GENERATION ──────────────────────────
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
         END`
    },
    { title:"COBOL-IMS Programming", level:"Intermediate",
      code:`       IDENTIFICATION DIVISION.
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
           END-PERFORM.`,
      content:`Writing COBOL Programs for IMS Databases:

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
   Plus IMS-specific DD statements: DFSRESLB, IEFRDER, DFSVSAMP, etc.`
    },
    { title:"Secondary Indexes", level:"Advanced",
      content:`Secondary Indexes in IMS:

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
  • Use sparse indexes for large databases`
    },
    { title:"Logical Relationships", level:"Advanced",
      content:`Logical Relationships — Cross-Hierarchy Links:

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
  This allows a single DL/I call path from customer to product details.`
    },
    { title:"IMS Database Recovery & Utilities", level:"Advanced",
      content:`IMS Database Recovery and Maintenance:

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
  • DBRC commands and output`,
      code:`//* ─── IMAGE COPY JCL ──────────────────────────────────
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
//SYSPRINT DD SYSOUT=*`
    },
    { title:"DBCTL — IMS Databases from CICS", level:"Advanced",
      content:`DBCTL (Database Control) — Accessing IMS from CICS:

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
  DBCTL handles thread management and buffer pools.`
    },
    { title:"IMS Interview Questions", level:"All Levels",
      content:`IMS Interview Questions — 20+ Q&A.

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

💡 Study Tip: Focus on DL/I calls (GU/GN/GNP/ISRT), PCB/PSB concepts, and hierarchical navigation.`,
    },

    { title:"IMS DB Cheat Sheet", level:"All Levels",
      content:`IMS Quick Reference — Cheat Sheet

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
Operators: =, >=, <=, >, <, !=`,
    },
  ]
};
