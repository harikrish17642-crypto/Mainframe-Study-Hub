export const VSAM_TOPIC = {
  id:"vsam", icon:"🗄️", title:"VSAM", subtitle:"Virtual Storage Access Method", color:"#8b5cf6", level:"Beginner → Expert",
  description:"The high-performance file system powering CICS, IMS, and enterprise batch. Master VSAM, master z/OS.",
  sections:[
    { title:"Introduction to VSAM", level:"Beginner",
      content:`Virtual Storage Access Method (VSAM) is the primary high-performance file access method on z/OS. Unlike simple sequential datasets, VSAM provides indexed access, direct (random) access, and sophisticated space management — making it the backbone of enterprise applications.

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
  Sphere — A base cluster plus all its alternate indexes.`
    },
    { title:"VSAM Architecture — CI, CA & Splits", level:"Beginner",
      content:`VSAM Internal Architecture:

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
  NSR (Non-Shared Resources): Dedicated buffers per file`
    },
    { title:"KSDS — Key-Sequenced Data Set", level:"Beginner",
      content:`KSDS — The Most Important VSAM Type:

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
    4 — Same as 3 with buffer refresh`,
      code:`  DEFINE CLUSTER -
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
     CONTROLINTERVALSIZE(4096))`
    },
    { title:"ESDS, RRDS & Linear Datasets", level:"Intermediate",
      content:`Other VSAM Dataset Types:

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
     CYLINDERS(20 10))`
    },
    { title:"IDCAMS for VSAM — Define, Delete, Alter", level:"Beginner",
      content:`IDCAMS — The Primary Tool for VSAM Management:

All VSAM datasets are created, modified, and deleted through IDCAMS (Access Method Services). You cannot create VSAM datasets with standard JCL DD statements.

DEFINE CLUSTER — Create a VSAM Dataset:
  This is the most important IDCAMS command for VSAM.`,
      code:`//* ═══════════════════════════════════════════════════════
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
/*`
    },
    { title:"Alternate Indexes (AIX)", level:"Intermediate",
      content:`Alternate Indexes — Access KSDS by Different Keys:

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
  • Limit to 253 AIX per base cluster`,
      code:`//* ═══════════════════════════════════════════════════════
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
//SYSOUT   DD SYSOUT=*`
    },
    { title:"VSAM in COBOL Programs", level:"Intermediate",
      code:`       ENVIRONMENT DIVISION.
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
           END-DELETE.`,
      content:`VSAM File Operations in COBOL:

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

Always check file status after every VSAM operation!`
    },
    { title:"VSAM Performance Tuning", level:"Advanced",
      content:`VSAM Performance Tuning — Make Your Files Fly:

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
   Reduces space but adds CPU overhead for compress/decompress.`
    },
    { title:"VSAM Backup & Recovery", level:"Advanced",
      content:`VSAM Backup & Recovery Strategies:

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
  Always run VERIFY before accessing a VSAM file after an abend.`,
      code:`//* ═══════════════════════════════════════════════════════
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
/*`
    },
    { title:"VSAM in CICS Environment", level:"Advanced",
      content:`VSAM Under CICS — Online File Access:

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

  When a transaction abends, CICS automatically backs out all changes to recoverable files — returning them to their state before the transaction started.`
    },
    { title:"VSAM Catalog & SMS Integration", level:"Advanced",
      content:`VSAM Catalog Structure & SMS:

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

  ACS (Automatic Class Selection) routines assign classes based on dataset name patterns, job name, user ID, etc.`
    },
    { title:"VSAM Troubleshooting Guide", level:"Intermediate",
      content:`Common VSAM Problems & Solutions:

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
  VERIFY DATASET(dsn) — Reset end-of-file after abend`
    },

    { title:"VSAM KSDS — Complete Guide", level:"Beginner",
      content:`KSDS (Key-Sequenced Data Set) is the most common VSAM type.

Structure:
  DATA component — Actual records stored in CIs
  INDEX component — B-tree index for key lookup

Key Characteristics:
  • Primary key — unique, identifies each record
  • Records stored in key sequence
  • Supports sequential, random, and skip-sequential access
  • Insertions cause CI/CA splits when space is full
  • Max record size: 32,761 bytes

DEFINE CLUSTER:
  DEFINE CLUSTER (NAME(MY.KSDS.FILE) INDEXED -
    KEYS(8 0) RECORDSIZE(100 200) SHAREOPTIONS(2 3)) -
  DATA (CYLINDERS(10 5) FREESPACE(20 10) CISZ(4096)) -
  INDEX (CYLINDERS(1 1))

  KEYS(length offset) — 8-byte key starting at position 0
  RECORDSIZE(avg max) — Average and maximum record sizes
  FREESPACE(CI% CA%) — Free space for inserts

Access Modes:
  Sequential — Read all records in key order
  Random — Direct access by key (RIDFLD)
  Dynamic — Both in same program (most flexible)

Pro Tip: Use DYNAMIC access mode as default for KSDS. It gives maximum flexibility with minimal overhead.`
    },

    { title:"VSAM CI and CA Splits", level:"Intermediate",
      content:`Splits occur when inserting a record into a full CI or CA. They degrade performance.

CI Split:
  CI is full → New record needs to insert → VSAM splits the CI:
  1. Allocates a new CI from free CIs in the CA
  2. Moves ~half the records to new CI
  3. Inserts the new record in correct position
  4. Updates index to reflect new CI

CA Split:
  All CIs in a CA are full → Needs new CI → VSAM splits the CA:
  1. Allocates an entirely new CA (secondary allocation)
  2. Moves half the CIs to the new CA
  3. Much more expensive than CI split

Impact:
  • Splits are I/O intensive (multiple reads/writes)
  • Records no longer physically sequential → random I/O
  • Sequential read performance degrades
  • CA splits are 10-100x worse than CI splits

Prevention:
  FREESPACE(CI% CA%) — Reserve space for future inserts
  CI% = 20: Leave 20% of each CI free
  CA% = 10: Leave 10% of CIs in each CA free

Fixing Splits:
  REORG (IDCAMS REPRO to sequential → DELETE → REDEFINE → REPRO back)
  Or AMS ALTER ... FREESPACE(20 10) then REORG

Pro Tip: Monitor split counts with LISTCAT ALL. If splits are high, REORG and increase FREESPACE.`
    },

    { title:"VSAM REPRO & PRINT", level:"Beginner",
      content:`REPRO copies data. PRINT displays data. Both are IDCAMS commands.

REPRO (Copy):
  REPRO INFILE(INPUT) OUTFILE(OUTPUT)
  Copies all records from INPUT to OUTPUT.

  REPRO INFILE(INPUT) OUTFILE(OUTPUT) COUNT(100)
  First 100 records only.

  REPRO INFILE(INPUT) OUTFILE(OUTPUT) SKIP(50) COUNT(100)
  Skip 50, copy next 100.

  REPRO INFILE(INPUT) OUTFILE(OUTPUT) FROMKEY(key) TOKEY(key)
  Copy key range.

REPRO Uses:
  • Backup: VSAM → Sequential flat file
  • Restore: Sequential → VSAM
  • Copy between VSAM clusters
  • Migrate data between environments

PRINT (Display):
  PRINT INFILE(INPUT) CHARACTER COUNT(10)
  PRINT INFILE(INPUT) HEX COUNT(5)
  PRINT INFILE(INPUT) DUMP COUNT(5)

  CHARACTER — Readable text
  HEX — Hexadecimal
  DUMP — Both character and hex

Pro Tip: Always REPRO a backup before any data migration or REORG. It's your safety net.`,
      code:`//STEP1    EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//INPUT    DD  DSN=PROD.CUST.KSDS,DISP=SHR
//OUTPUT   DD  DSN=BACKUP.CUST.SEQ,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),
//             DCB=(RECFM=VB,LRECL=32760,BLKSIZE=0)
//SYSIN    DD  *
  REPRO INFILE(INPUT) OUTFILE(OUTPUT)
  IF LASTCC > 0 THEN DO
    SET MAXCC = 16
  END
/*`
    },

    { title:"VSAM DEFINE — All Options", level:"Intermediate",
      content:`Complete DEFINE CLUSTER reference for all VSAM types.

KSDS:
  DEFINE CLUSTER (NAME(MY.KSDS) INDEXED -
    KEYS(8 0) RECORDSIZE(100 200) -
    SHAREOPTIONS(2 3) SPEED) -
  DATA (CYLINDERS(10 5) FREESPACE(20 10) -
    CISZ(4096) BUFFERSPACE(65536)) -
  INDEX (CYLINDERS(1 1) CISZ(2048))

ESDS:
  DEFINE CLUSTER (NAME(MY.ESDS) NONINDEXED -
    RECORDSIZE(80 80)) -
  DATA (CYLINDERS(5 2) CISZ(4096))

RRDS:
  DEFINE CLUSTER (NAME(MY.RRDS) NUMBERED -
    RECORDSIZE(200 200)) -
  DATA (CYLINDERS(5 2))

LDS:
  DEFINE CLUSTER (NAME(MY.LDS) LINEAR) -
  DATA (CYLINDERS(10 5))

Key Parameters:
  SPEED — Skip CI preformat (faster initial load)
  RECOVERY — Preformat CIs (safer, slower)
  SHAREOPTIONS(cross-region cross-system)
  ERASE — Zero-fill on delete (security)
  REUSE — Allows REPRO to reuse existing cluster
  SPANNED — Records can span CIs (for very large records)

Pro Tip: Use SPEED for initial loads, RECOVERY for production. Always specify SHAREOPTIONS.`
    },

    { title:"VSAM ALTER & VERIFY", level:"Intermediate",
      content:`ALTER modifies cluster attributes. VERIFY fixes end-of-file markers.

ALTER:
  ALTER MY.KSDS.FILE -
    FREESPACE(25 15) -
    BUFFERSPACE(131072) -
    SHAREOPTIONS(2 3)

  Can change: FREESPACE, BUFFERSPACE, SHAREOPTIONS, ERASE, REUSE, passwords.
  Cannot change: KEYS, RECORDSIZE, CISZ (require DELETE + REDEFINE).

VERIFY:
  VERIFY DATASET(MY.KSDS.FILE)
  
  Resets end-of-file marker after abnormal close.
  When needed: Program ABENDs with VSAM file open → file may be marked as "improperly closed."
  Without VERIFY, next OPEN may fail.

LISTCAT:
  LISTCAT ENT(MY.KSDS.FILE) ALL
  Shows ALL attributes: KEYS, CISZ, FREESPACE, record counts, split counts, extents.
  Most important fields:
  - REC-TOTAL — Record count
  - SPLITS-CI — CI split count
  - SPLITS-CA — CA split count
  - EXTENTS — Number of extents used

Pro Tip: Run LISTCAT before and after REORG to verify improvements. Watch split counts and extent counts.`
    },

    { title:"VSAM in JCL", level:"Beginner",
      content:`JCL DD statements connect COBOL SELECT to physical VSAM files.

Basic DD for VSAM:
  //CUSTMAST DD DSN=PROD.CUST.KSDS,DISP=SHR

  DISP=SHR — Shared read access
  DISP=OLD — Exclusive access (for update)
  AMP parameter for special VSAM options.

AMP Parameter:
  //CUSTMAST DD DSN=PROD.CUST.KSDS,DISP=SHR,
  //   AMP=('BUFND=10,BUFNI=5')
  BUFND — Data buffers (more = better sequential read)
  BUFNI — Index buffers (more = better random read)

Path (Alternate Index):
  //CUSTNAME DD DSN=PROD.CUST.NAME.PATH,DISP=SHR
  PATH connects to the AIX path, not the base cluster.

No DCB for VSAM:
  VSAM files do NOT need DCB (RECFM, LRECL, BLKSIZE).
  These are defined in the cluster definition (DEFINE CLUSTER).

IDCAMS in JCL:
  //STEP1 EXEC PGM=IDCAMS
  //SYSPRINT DD SYSOUT=*
  //SYSIN DD *
    DELETE MY.KSDS.FILE CLUSTER PURGE
    IF LASTCC = 8 THEN SET MAXCC = 0
  /*

Pro Tip: Use AMP BUFND/BUFNI for performance tuning in batch. Default buffers are often too small for large files.`
    },

    { title:"VSAM Performance Best Practices", level:"Advanced",
      content:`Optimize VSAM for maximum throughput in batch and online processing.

CI Size Selection:
  Small CI (4K) — Better for random access (less I/O per read)
  Large CI (16K-32K) — Better for sequential access (more records per I/O)
  Match CI size to access pattern.

Buffer Allocation:
  Batch: AMP=('BUFND=20,BUFNI=10') — More buffers for throughput
  CICS: LSR (Local Shared Resources) buffering — Shared pool
  
  Data buffers (BUFND): CI reads/writes
  Index buffers (BUFNI): Index lookups

FREESPACE Strategy:
  High insert rate: FREESPACE(30 20)
  Low insert rate: FREESPACE(10 5)
  Read-only: FREESPACE(0 0)

Regular Maintenance:
  1. Monitor with LISTCAT (check splits, extents)
  2. REORG when splits exceed threshold
  3. VERIFY after any ABEND
  4. REPRO backup before maintenance

Control Interval Processing:
  CISZ should be multiple of physical block size.
  3390 DASD: 4096 optimal for random, 16384+ for sequential.

Pro Tip: The #1 VSAM performance killer is uncontrolled CI/CA splits. Monitor and REORG regularly.`
    },

    { title:"VSAM GDG Integration", level:"Intermediate",
      content:`VSAM files can be managed as Generation Data Groups for versioning.

GDG for VSAM:
  GDGs version your VSAM files automatically.
  (+1) creates new generation, (0) is current, (-1) is previous.

DEFINE GDG Base:
  DEFINE GDG (NAME(MY.CUST.HISTORY) LIMIT(7) SCRATCH NOEMPTY)

Daily Pattern:
  1. Define new KSDS as (+1)
  2. REPRO from current to (+1) (backup)
  3. Process updates on current (0)
  
  Keeps 7 days of history automatically.

JCL:
  //HISTORY DD DSN=MY.CUST.HISTORY(+1),DISP=(NEW,CATLG),
  //   SPACE=(CYL,(10,5)),
  //   DCB=(RECFM=VB,LRECL=32760)

Note: GDG generations for VSAM are usually flat sequential copies (via REPRO), not VSAM clusters.

Pro Tip: Use GDG + REPRO for daily VSAM backups. Automatic rotation keeps storage manageable.`
    },



    { title:"VSAM ESDS — Entry-Sequenced", level:"Beginner",
      content:`ESDS stores records in the order they are written — like a sequential file with VSAM benefits.

Characteristics:
  • Records added at end only (no insert)
  • No primary key — accessed by RBA (Relative Byte Address)
  • Cannot delete individual records
  • Can update records in place (same length)
  • Supports alternate indexes

DEFINE:
  DEFINE CLUSTER (NAME(MY.ESDS.LOG) NONINDEXED -
    RECORDSIZE(200 200) SHAREOPTIONS(2 3)) -
  DATA (CYLINDERS(10 5) CISZ(4096))

Access in COBOL:
  SELECT LOG-FILE ASSIGN TO LOGDD
    ORGANIZATION IS SEQUENTIAL
    ACCESS MODE IS SEQUENTIAL
    FILE STATUS IS WS-FS.

Common Uses:
  • Log files — append-only records
  • Transaction journals
  • Audit trails
  • Data feeds (sequential processing)

ESDS vs Sequential (PS):
  ESDS: Password protection, alternate indexes, CI-based I/O
  PS: Simpler, standard tape/disk, wider utility support

Pro Tip: Use ESDS for logs and journals that need VSAM features. Use PS for simple sequential data.`
    },

    { title:"VSAM Linear Data Set (LDS)", level:"Advanced",
      content:`LDS is byte-addressable VSAM — used for DB2, CICS, and system components.

Characteristics:
  • No record structure — just a stream of bytes
  • Accessed by page (4K) via DIV (Data-in-Virtual)
  • No primary key, no control intervals in traditional sense
  • Used internally by DB2 tablespaces, CICS resources

DEFINE:
  DEFINE CLUSTER (NAME(MY.LDS.DATA) LINEAR) -
  DATA (CYLINDERS(50 10))

Access:
  Not directly accessible by COBOL programs.
  Accessed via DIV (Data-in-Virtual) macros in Assembler.
  Or indirectly through DB2/CICS which use LDS internally.

Common Uses:
  • DB2 tablespaces (each tablespace is one or more LDS)
  • CICS system datasets
  • Hiperspaces (data caching)
  • Coupling Facility structures

Pro Tip: You rarely interact with LDS directly. Know it for interviews — "What are the four VSAM types?" Always include LDS.`
    },

    { title:"VSAM Alternate Index — Complete Guide", level:"Intermediate",
      content:`Alternate indexes let you access KSDS records by fields other than the primary key.

Step 1 — DEFINE AIX:
  DEFINE AIX (NAME(MY.CUST.NAMEAIX) -
    RELATE(MY.CUST.KSDS) -
    KEYS(30 8) -
    NONUNIQUEKEY -
    RECORDSIZE(50 100) -
    SHAREOPTIONS(2 3)) -
  DATA (CYLINDERS(2 1))

  KEYS(30 8) = 30-byte key starting at offset 8 in base record
  NONUNIQUEKEY = Multiple records can have same alternate key
  UNIQUEKEY = Each alternate key value must be unique

Step 2 — DEFINE PATH:
  DEFINE PATH (NAME(MY.CUST.NAMEPATH) -
    PATHENTRY(MY.CUST.NAMEAIX))

Step 3 — BLDINDEX:
  BLDINDEX INDATASET(MY.CUST.KSDS) -
    OUTDATASET(MY.CUST.NAMEAIX)

In COBOL:
  SELECT CUST-BY-NAME ASSIGN TO NAMEPATH
    ORGANIZATION IS INDEXED
    ACCESS MODE IS DYNAMIC
    RECORD KEY IS CUST-NAME-KEY
    FILE STATUS IS WS-FS.

UPGRADE vs NOUPGRADE:
  UPGRADE (default) — AIX updated automatically when base cluster changes
  NOUPGRADE — AIX not maintained automatically (must rebuild manually)

Pro Tip: Always UPGRADE for production AIXes. NOUPGRADE means stale data on reads.`
    },

    { title:"VSAM Catalog Management", level:"Intermediate",
      content:`VSAM files are managed through ICF (Integrated Catalog Facility) catalogs.

Catalog Hierarchy:
  Master Catalog → User Catalogs → VSAM Clusters

LISTCAT:
  LISTCAT ENT(MY.CUST.KSDS) ALL
  Shows everything: attributes, statistics, space usage, split counts.

Key LISTCAT Fields:
  REC-TOTAL — Number of records
  REC-DELETED — Deleted records (reclaimable space)
  SPLITS-CI — CI split count
  SPLITS-CA — CA split count (bad if high)
  EXTENTS — Number of extents (max 123 per volume)
  FREESPACE-CI — Free space percentage in CIs
  HIGH-KEY — Highest key value
  HURBA — High Used RBA (end of data)

ALTER:
  ALTER MY.KSDS.FILE FREESPACE(25 15)
  ALTER MY.KSDS.FILE BUFFERSPACE(131072)

DELETE:
  DELETE MY.KSDS.FILE CLUSTER PURGE
  PURGE overrides retention period.
  Without CLUSTER, deletes only the entry (not data/index components).

Pro Tip: Check LISTCAT SPLITS-CA regularly. High CA splits = performance problem = time to REORG.`
    },

    { title:"VSAM REORG Procedure", level:"Intermediate",
      content:`REORG restores VSAM performance by eliminating splits and fragmentation.

Standard REORG Steps:
  1. REPRO to backup (VSAM → sequential)
  2. DELETE the VSAM cluster
  3. DEFINE new cluster (with updated FREESPACE)
  4. REPRO from backup (sequential → VSAM)
  5. BLDINDEX for any alternate indexes

JCL Pattern:
  //STEP1 — IDCAMS REPRO INFILE(VSAM) OUTFILE(BACKUP)
  //STEP2 — IDCAMS DELETE cluster PURGE
  //STEP3 — IDCAMS DEFINE CLUSTER (same definition, adjusted FREESPACE)
  //STEP4 — IDCAMS REPRO INFILE(BACKUP) OUTFILE(VSAM)
  //STEP5 — IDCAMS BLDINDEX (for each AIX)

When to REORG:
  • CI splits > 10% of total CIs
  • CA splits occurring regularly
  • Sequential read performance degrading
  • Many deleted records (wasted space)

During REORG:
  File is unavailable. Schedule in batch window.
  For CICS files: CEMT SET FILE CLOSE first.

Pro Tip: ALWAYS back up (REPRO to sequential) before DELETE. If anything fails, you can recover from the backup.`,
      code:`//REORG    JOB (ACCT),'VSAM REORG',CLASS=A,NOTIFY=&SYSUID
//*--- Backup ---
//STEP1    EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//INDD     DD DSN=PROD.CUST.KSDS,DISP=SHR
//OUTDD    DD DSN=TEMP.CUST.BACKUP,
//            DISP=(NEW,CATLG),SPACE=(CYL,(20,5))
//SYSIN    DD *
  REPRO INFILE(INDD) OUTFILE(OUTDD)
/*
//*--- Delete ---
//STEP2    EXEC PGM=IDCAMS,COND=(0,NE)
//SYSIN    DD *
  DELETE PROD.CUST.KSDS CLUSTER PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
/*
//*--- Redefine ---
//STEP3    EXEC PGM=IDCAMS,COND=(0,NE)
//SYSIN    DD *
  DEFINE CLUSTER (NAME(PROD.CUST.KSDS) INDEXED -
    KEYS(8 0) RECSZ(200 200) SHROPT(2 3)) -
  DATA (CYL(20 10) FSPC(20 10) CISZ(4096)) -
  INDEX (CYL(2 1))
/*
//*--- Reload ---
//STEP4    EXEC PGM=IDCAMS,COND=(0,NE)
//INDD     DD DSN=TEMP.CUST.BACKUP,DISP=SHR
//OUTDD    DD DSN=PROD.CUST.KSDS,DISP=SHR
//SYSIN    DD *
  REPRO INFILE(INDD) OUTFILE(OUTDD)
/*`
    },

    { title:"VSAM Record-Level Sharing (RLS)", level:"Expert",
      content:`RLS allows multiple CICS regions to access the same VSAM file simultaneously with record-level locking.

Without RLS:
  Only one region can open a VSAM file for update.
  Batch window needed to close CICS files for batch processing.

With RLS:
  Multiple CICS regions + batch can access same file.
  Locking at record level via Coupling Facility.
  No batch window needed.

Requirements:
  • Parallel Sysplex with Coupling Facility
  • SMSVSAM address space running
  • CF lock structure defined
  • File defined with LOG(UNDO) or LOG(ALL)

CICS Configuration:
  FILE definition: RLSACCESS(YES)
  File opened in RLS mode automatically.

LOG Options:
  LOG(NONE) — No logging. No recovery.
  LOG(UNDO) — Backout logging. CICS can rollback on ABEND.
  LOG(ALL) — Forward recovery logging. Can rebuild from log.

VSAM Non-RLS vs RLS:
  Non-RLS: SHAREOPTIONS controls sharing (limited)
  RLS: True record-level sharing via CF (scalable)

Pro Tip: RLS is required for modern Sysplex environments. Know it for CICS admin and systems programmer interviews.`
    },

    { title:"VSAM — Common Errors & Solutions", level:"Beginner",
      content:`Troubleshooting guide for the most common VSAM problems.

File Status 35 — File Not Found:
  Cause: Dataset doesn't exist or DD missing from JCL.
  Fix: Check DSN spelling. Verify LISTCAT shows the cluster. Check JCL DD name matches COBOL SELECT.

File Status 39 — Attribute Mismatch:
  Cause: COBOL program expects different attributes than actual file.
  Fix: Check RECFM, LRECL, KEY definition matches DEFINE CLUSTER.

File Status 97 — OPEN Failed:
  Cause: Various — security, file in use, improperly closed.
  Fix: VERIFY the dataset. Check RACF access. Check SHAREOPTIONS.

VSAM OPEN Error — IEC161I:
  Improperly closed. Run VERIFY DATASET(name).

VSAM Space Error — IEC070I:
  Out of space. Increase secondary allocation or add volumes.

CI Split Performance:
  LISTCAT shows high SPLITS-CI or SPLITS-CA.
  Fix: REORG with increased FREESPACE.

Record Not Found (Status 23):
  Key doesn't exist in file.
  Check: Key alignment, packed vs display, leading spaces.

Duplicate Key (Status 22):
  Record with this key already exists.
  Check: Is this an expected duplicate or data error?

Pro Tip: 90% of VSAM problems are: wrong DSN (35), needs VERIFY (97), or needs REORG (performance). Check these first.`
    },

    { title:"VSAM — Batch Window Processing", level:"Intermediate",
      content:`Traditional pattern for batch processing against CICS VSAM files.

The Batch Window:
  1. CICS closes files (CEMT SET FILE(name) CLOSE)
  2. Batch jobs run (updates, REORG, loads)
  3. CICS reopens files (CEMT SET FILE(name) OPEN)

Why Needed (without RLS):
  VSAM SHAREOPTIONS don't fully support concurrent update from CICS and batch.
  Batch needs exclusive access for heavy updates and REORGs.

Automated Batch Window:
  1. PLTSD program closes files at scheduled time
  2. Batch scheduler (CA-7) triggers batch jobs
  3. After batch completes, PLTPI or operator reopens files

Minimizing Batch Window:
  • Use RLS (eliminates batch window entirely)
  • Process only changed records (delta processing)
  • Parallel processing across partitions
  • Schedule long jobs for off-peak hours

BWO (Batch Window Overlap):
  Process KSDS data component in batch while CICS uses index.
  Requires careful design — partial overlap, not full concurrent access.

Pro Tip: RLS eliminates the batch window. If your shop hasn't moved to RLS yet, advocate for it — it's the modern standard.`
    },

    { title:"VSAM — SHAREOPTIONS Explained", level:"Intermediate",
      content:`SHAREOPTIONS control how multiple programs/regions access the same VSAM file.

Format: SHAREOPTIONS(cross-region, cross-system)

Cross-Region Values:
  1 — One writer OR multiple readers. Not both simultaneously. Safest.
  2 — One writer AND multiple readers. Readers may see stale data.
  3 — Multiple writers, multiple readers. No integrity guarantee. Use with care.
  4 — Like 3 but with buffer refresh for reads. Slightly safer.

Cross-System Values:
  3 — Common default. Multiple systems, no integrity.
  4 — Buffer refresh across systems.

Common Combinations:
  SHAREOPTIONS(2,3) — Standard production. One batch writer, multiple CICS readers.
  SHAREOPTIONS(1,3) — Strict. Only one accessor at a time.
  SHAREOPTIONS(3,3) — Maximum sharing. Risk of corruption without external coordination.
  SHAREOPTIONS(4,3) — Like (3,3) but readers refresh buffers.

Data Integrity Warning:
  SHAREOPTIONS 3 and 4 do NOT provide true serialization.
  If two writers update simultaneously, data can corrupt.
  For true sharing: Use CICS RLS or ENQ/DEQ in batch.

Pro Tip: Use SHAREOPTIONS(2,3) for most files. Only use (3,3) if you have external serialization (ENQ/DEQ or RLS).`
    },

    { title:"VSAM & SMS Integration", level:"Intermediate",
      content:`SMS (Storage Management Subsystem) automates VSAM storage management.

ACS Routines:
  Automatic Class Selection routines assign storage classes based on dataset naming rules.
  MY.PROD.*.KSDS → STORCLAS=PRODFAST, MGMTCLAS=PROD30DAY

Storage Classes:
  STORCLAS — Performance: which volumes, caching, I/O priority
  MGMTCLAS — Management: backup frequency, retention, migration
  DATACLAS — Data: RECFM, LRECL, space, VSAM attributes

SMS-Managed VSAM:
  DEFINE CLUSTER without VOLUMES — SMS picks the volume.
  STORCLAS, MGMTCLAS, DATACLAS applied automatically.
  Benefits: Automatic space management, tiered storage, HSM migration.

Extended Addressability:
  SMS allows VSAM files larger than 4GB (4GB barrier removed).
  DFSMS EXTENDED FORMAT required.

VSAM Data Striping:
  Spread data across multiple volumes for parallel I/O.
  Configured in SMS DATACLAS: DATACLASS(STRIPE4)

Pro Tip: In modern z/OS shops, all VSAM is SMS-managed. Know STORCLAS, MGMTCLAS, DATACLAS for interviews.`
    },



    { title:"VSAM — IDCAMS Return Codes", level:"Beginner",
      content:`Understanding IDCAMS return codes for proper error handling in JCL.

Return Codes:
  0 — Success. All operations completed normally.
  4 — Warning. Operation completed but with minor issues (e.g., dataset already cataloged).
  8 — Error. Operation failed (e.g., dataset not found for DELETE, duplicate on DEFINE).
  12 — Severe error. Logical error in IDCAMS commands.
  16 — Critical error. Unable to open SYSIN or SYSPRINT.

Handling in JCL:
  IF LASTCC = 8 THEN SET MAXCC = 0
  Resets the max condition code after an expected error (like DELETE of non-existent file).

Common Pattern:
  DELETE name CLUSTER PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
  DEFINE CLUSTER (...)
  
  This deletes-if-exists, ignores "not found" error, then defines fresh.

LASTCC vs MAXCC:
  LASTCC = Return code from last command
  MAXCC = Highest return code so far
  SET MAXCC = 0 resets the maximum (useful after expected errors)

Pro Tip: Always include IF LASTCC = 8 THEN SET MAXCC = 0 after DELETE. Every production JCL does this.`
    },

    { title:"VSAM — COBOL File Processing Patterns", level:"Intermediate",
      content:`Common VSAM access patterns in production COBOL programs.

Pattern 1 — Sequential Read (Full Scan):
  OPEN INPUT file → READ loop → CLOSE
  For: Reports, extracts, batch processing entire file.

Pattern 2 — Random Read (Lookup):
  OPEN INPUT file → MOVE key → READ → process → CLOSE
  For: Validations, single-record lookups.

Pattern 3 — Browse from Starting Point:
  OPEN INPUT file → MOVE start-key → START KEY >= → READNEXT loop → CLOSE
  For: Range queries, partial scans.

Pattern 4 — Random Update:
  OPEN I-O file → MOVE key → READ (locks record) → modify → REWRITE → CLOSE
  For: Online updates, transaction processing.

Pattern 5 — Sequential Load:
  OPEN OUTPUT file → Loop: build record → WRITE → CLOSE
  For: Initial data load, rebuilding from extract.

Pattern 6 — Insert & Update Mix:
  OPEN I-O file → READ (check if exists) → if yes REWRITE, if no WRITE → CLOSE
  For: Upsert logic, merge processing.

Error Handling:
  ALWAYS check FILE STATUS after every I/O.
  EVALUATE WS-FS: WHEN '00' WHEN '10' WHEN '22' WHEN '23' WHEN OTHER.

Pro Tip: Pattern 4 (random update) is the most common in production. Pattern 6 (upsert) is the trickiest — handle both paths.`
    },

    { title:"VSAM — Spanned Records", level:"Advanced",
      content:`Spanned records can exceed CI size by spanning across multiple CIs.

When Needed:
  Record size > CI size minus control fields.
  Normal max record per CI: CISZ - 10 bytes (overhead).
  With SPANNED: records can be any size up to 32,760 bytes.

DEFINE:
  DEFINE CLUSTER (NAME(MY.SPAN.FILE) INDEXED -
    KEYS(8 0) RECORDSIZE(200 8000) SPANNED -
    SHAREOPTIONS(2 3)) -
  DATA (CYLINDERS(10 5) CISZ(4096))

How It Works:
  Record split into segments. Each segment in a different CI.
  Segment 1 in one CI, segment 2 in next CI, etc.
  VSAM reassembles on read — transparent to program.

Performance Impact:
  Spanned records require multiple I/Os per read/write.
  Sequential: Manageable. Random: Slow.

When to Use:
  • Records genuinely vary in size (e.g., variable-length text)
  • Can't increase CI size (already at 32K max)
  • Very rare in practice

Alternative:
  Increase CI size to accommodate largest record.
  CISZ(8192) or CISZ(16384) often eliminates need for SPANNED.

Pro Tip: Avoid SPANNED if possible. Increase CI size first. SPANNED records have significant performance overhead.`
    },

    { title:"VSAM — Extended Format & Large Files", level:"Advanced",
      content:`Extended format removes the 4GB barrier and enables advanced VSAM features.

Extended Format:
  SMS DATACLAS with DSNTYPE=EXT enables extended format.
  Benefits: Large files (>4GB), data striping, compression.

Extended Addressability:
  Standard VSAM: Max ~4GB per component.
  Extended: Virtually unlimited size.
  Required for: Large databases, high-volume transaction logs.

Data Striping:
  Spreads data across multiple volumes for parallel I/O.
  DATACLAS with COMPACTION=YES and stripe count.
  Dramatic sequential read improvement.

Compression:
  VSAM extended format supports data compression.
  Reduces disk usage by 40-70% for text data.
  Slight CPU overhead on read/write.

System-Managed Buffering (SMB):
  ACCBIAS=USER/SYSTEM/DO/DW/SO/SW in DATACLAS.
  Lets DFSMS optimize buffering automatically based on access pattern.

Pro Tip: Extended format is the modern standard. New VSAM files should always be extended format in SMS-managed environments.`
    },



    { title:"VSAM — IDCAMS Scripting Patterns", level:"Intermediate",
      content:`Common IDCAMS command patterns used in every production JCL.

Delete-Define-Load:
  DELETE name CLUSTER PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
  DEFINE CLUSTER (NAME(name) ...)
  REPRO INFILE(dd) OUTFILE(dd)

Conditional Processing:
  IF LASTCC = 0 THEN DO
    REPRO INFILE(IN) OUTFILE(OUT)
  END
  ELSE DO
    SET MAXCC = 16
  END

Multiple Commands:
  One IDCAMS step can execute multiple commands sequentially.
  Each command sets LASTCC. MAXCC tracks the highest.

PRINT for Verification:
  REPRO INFILE(IN) OUTFILE(OUT)
  IF LASTCC = 0 THEN PRINT INFILE(OUT) CHARACTER COUNT(5)
  Verify first 5 records after copy.

SET MAXCC:
  SET MAXCC = 0 — Reset after expected error
  SET MAXCC = 16 — Force step failure for JCL COND

Pro Tip: IDCAMS scripting with IF/THEN/ELSE is powerful. You can build complete data management workflows in one step.`,
      code:`//STEP1    EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//INDD     DD  DSN=DAILY.EXTRACT,DISP=SHR
//OUTDD    DD  DSN=PROD.MASTER.KSDS,DISP=SHR
//SYSIN    DD  *
  /* Delete if exists */
  DELETE PROD.MASTER.KSDS CLUSTER PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
  /* Define fresh */
  DEFINE CLUSTER (NAME(PROD.MASTER.KSDS) INDEXED -
    KEYS(8 0) RECSZ(200 200) SHROPT(2 3)) -
  DATA (CYL(10 5) FSPC(20 10) CISZ(4096)) -
  INDEX (CYL(1 1))
  /* Load data */
  IF LASTCC = 0 THEN -
    REPRO INFILE(INDD) OUTFILE(OUTDD)
  /* Verify */
  IF LASTCC = 0 THEN -
    PRINT INFILE(OUTDD) CHAR COUNT(3)
/*`
    },

    { title:"VSAM — Multi-Volume & Multi-Extent", level:"Advanced",
      content:`Large VSAM files can span multiple volumes and have multiple extents.

Extents:
  Each space allocation (primary + secondaries) creates extents.
  Max 123 extents per volume for VSAM.
  Exceeding max → OPEN failure.

Multi-Volume:
  DEFINE CLUSTER ... VOLUMES(VOL001 VOL002 VOL003)
  Data spread across specified volumes.
  Or let SMS pick volumes automatically.

Monitoring Extents:
  LISTCAT ENT(name) ALL — Shows EXTENTS count
  If extents approaching 100+ → REORG to consolidate.

KEYRANGES (Partitioned KSDS):
  DEFINE CLUSTER ... DATA(KEYRANGES((LOW HIGH) ...))
  Different key ranges on different volumes.
  Like DB2 partitioning for VSAM.

Extending:
  When primary space fills, secondary allocation used.
  Up to 122 secondary extents (plus 1 primary = 123).
  If all extents used and more space needed → IEC070I error.

Prevention:
  Allocate adequate primary space.
  Regular REORG to reclaim deleted record space.
  Monitor with LISTCAT and SMF records.

Pro Tip: If you see extents > 50, schedule a REORG. High extent count = fragmented I/O = poor performance.`
    },

    { title:"VSAM — Backup & Recovery Strategies", level:"Intermediate",
      content:`Protect VSAM data with proper backup and recovery procedures.

REPRO Backup:
  REPRO INFILE(VSAM) OUTFILE(SEQBACKUP)
  Copies VSAM to sequential — simplest backup method.
  Can REPRO back to restore.

ADRDSSU (DFSMSdss):
  DUMP DATASET(INCLUDE(MY.KSDS.**)) OUTDD(BACKUP)
  Volume-level or dataset-level backup.
  Faster than REPRO for large files.
  RESTORE to recover.

CICSVR (CICS VSAM Recovery):
  Uses forward recovery logs to recover VSAM files.
  Requires LOG(ALL) in CICS file definition.
  Can recover to any point in time.

Backup Strategy:
  Daily: Full REPRO or ADRDSSU DUMP
  Retain: 7 days of backups (GDG with LIMIT(7))
  Before REORG: Always backup first
  After LOAD: Backup immediately

Recovery Steps:
  1. REPRO from backup to temporary file
  2. DELETE corrupted VSAM cluster
  3. DEFINE new cluster (same definition)
  4. REPRO from temporary to new cluster
  5. BLDINDEX for alternate indexes
  6. VERIFY the restored file

Pro Tip: Test your recovery procedure BEFORE you need it. A backup you can't restore from is worthless.`,
      code:`//*--- Daily VSAM Backup ---
//BACKUP   EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//INDD     DD  DSN=PROD.CUST.KSDS,DISP=SHR
//OUTDD    DD  DSN=BACKUP.CUST.SEQ(+1),
//             DISP=(NEW,CATLG),
//             SPACE=(CYL,(20,5)),
//             DCB=(RECFM=VB,LRECL=32760)
//SYSIN    DD  *
  REPRO INFILE(INDD) OUTFILE(OUTDD)
  IF LASTCC = 0 THEN -
    PRINT INFILE(OUTDD) CHAR COUNT(1)
/*`
    },

    { title:"VSAM — Comparison with DB2", level:"Beginner",
      content:`When to use VSAM vs DB2 — understanding the trade-offs.

VSAM Advantages:
  • Faster for simple key-based access (no SQL overhead)
  • Lower CPU cost per I/O
  • No DB2 subsystem dependency
  • Simpler administration for small files
  • Better for sequential batch processing

DB2 Advantages:
  • SQL for complex queries (JOINs, aggregations)
  • Referential integrity enforcement
  • Built-in security (GRANT/REVOKE)
  • Better concurrency (row-level locking)
  • Catalog-based metadata
  • Stored procedures, triggers, views

Use VSAM When:
  • Simple key-value lookup (master files)
  • High-volume sequential processing
  • Low-complexity data relationships
  • Performance-critical batch jobs
  • Application manages data integrity

Use DB2 When:
  • Complex queries and reporting
  • Multiple applications share data
  • Need referential integrity
  • Ad-hoc query requirements
  • Complex data relationships

Many shops use BOTH:
  DB2 for transactional data + reporting.
  VSAM for reference files, work files, and high-speed batch.

Pro Tip: Most modern mainframe apps use DB2 as primary store and VSAM for work files and lookups. Know both.`
    },



    { title:"VSAM — Best Practices Summary", level:"All Levels",
      content:`Essential VSAM best practices for production mainframe environments.

Design Best Practices:
  • Use KSDS for most files (indexed, flexible access)
  • Choose CI size based on access pattern (4K random, 16K+ sequential)
  • Set FREESPACE based on insert rate (20/10 typical, 0/0 for read-only)
  • Always specify SHAREOPTIONS explicitly
  • Use DYNAMIC access mode as default for KSDS

COBOL Programming:
  • Always check FILE STATUS after every I/O operation
  • INITIALIZE records before building output
  • Validate keys before READ (avoid unnecessary INVALID KEY)
  • Use 88-level for EOF flag: 88 EOF-REACHED VALUE 'Y'
  • Close files in error paths too (not just normal path)

Performance:
  • Monitor CI/CA splits with LISTCAT — REORG when high
  • Use AMP BUFND/BUFNI for batch performance tuning
  • REORG regularly — don't wait for performance complaints
  • Use SPEED (not RECOVERY) for initial bulk loads

Maintenance:
  • REPRO backup before every REORG
  • VERIFY after any ABEND with VSAM file open
  • BLDINDEX after REORG for alternate indexes
  • Golden sequence: REPRO backup → DELETE → DEFINE → REPRO reload → BLDINDEX

Production Operations:
  • LISTCAT regularly to monitor space and splits
  • Schedule REORGs in maintenance windows
  • Use GDG for daily backups (automatic rotation)
  • For CICS: close files before batch, reopen after

Pro Tip: The #1 VSAM problem is uncontrolled CI/CA splits. Monitor with LISTCAT, prevent with FREESPACE, fix with REORG.`
    },



    { title:"VSAM — KSDS vs ESDS vs RRDS Comparison", level:"Beginner",
      content:`Understanding when to use each VSAM dataset type.

KSDS (Key-Sequenced):
  Access: By unique primary key or sequentially
  Insert: Anywhere (in key order), causes CI/CA splits
  Delete: Yes (logical delete, space reclaimed on REORG)
  Update: Yes (same length or variable)
  Use for: Master files, customer records, any keyed data
  Most common type (~80% of production VSAM)

ESDS (Entry-Sequenced):
  Access: Sequential or by RBA (Relative Byte Address)
  Insert: Append only (end of file)
  Delete: No (cannot delete individual records)
  Update: Yes (same length only)
  Use for: Logs, journals, audit trails, chronological data

RRDS (Relative Record):
  Access: By record number (slot number)
  Insert: Into specific slot number
  Delete: Yes (slot becomes empty)
  Update: Yes (fixed length)
  Use for: Lookup tables by number, fixed slots (calendar data)

LDS (Linear):
  Access: Byte-addressable (via DIV macros)
  No record structure — raw byte stream
  Use for: DB2 tablespaces, system components

Decision Guide:
  Need keyed access? → KSDS
  Append-only log? → ESDS
  Access by number? → RRDS
  System component? → LDS

Pro Tip: When in doubt, use KSDS. It's the most flexible and most commonly used.`
    },

    { title:"VSAM — CI Size Selection Guide", level:"Intermediate",
      content:`CI (Control Interval) size directly impacts performance. Choose wisely.

What CI Size Affects:
  • Amount of data per I/O operation
  • Free space granularity
  • Number of records per CI
  • Buffer pool memory usage

Size Options:
  512, 1024, 2048, 4096, 8192, 16384, 32768 bytes

Guidelines:
  Random access (CICS online): 4096 (small CI = less data transferred per read)
  Sequential batch: 16384-32768 (large CI = more records per I/O)
  Mixed access: 4096-8192 (compromise)

Calculating Records per CI:
  Usable space = CISZ - 10 (control fields)
  Records per CI = Usable / Record size
  Example: CISZ(4096), RECSIZE=200 → (4096-10)/200 = ~20 records

Index CI Size:
  Typically 2048-4096 for index component.
  Smaller = more index levels but less memory.

FREESPACE Impact:
  FREESPACE(20 10) with CISZ(4096):
  20% of each CI free = ~800 bytes free per CI
  10% of CIs in each CA are completely free

3390 DASD Optimization:
  Track size on 3390 = 56,664 bytes
  Optimal CI sizes: 4096 (13 CIs/track), 8192 (7 CIs/track), 12288 (4 CIs/track)
  Non-optimal sizes waste track space.

Pro Tip: 4096 is the safest default. Only increase for sequential-heavy workloads with proven performance need.`
    },

    { title:"VSAM — Buffer Management", level:"Advanced",
      content:`Buffer allocation determines how much VSAM data is cached in memory.

Buffer Types:
  Data buffers (BUFND) — Cache data CIs
  Index buffers (BUFNI) — Cache index CIs
  BUFFERSPACE — Total bytes for both

Default Buffering:
  Without explicit settings: 2 data buffers + 1 index buffer.
  Bare minimum — poor performance for most workloads.

Batch Tuning:
  //CUSTMAST DD DSN=MY.KSDS,DISP=SHR,AMP=('BUFND=20,BUFNI=5')
  More buffers = more caching = fewer disk I/Os.
  Sequential: BUFND=10-30 (readahead benefits)
  Random: BUFND=5-10, BUFNI=5-10

CICS Buffering — LSR (Local Shared Resources):
  Shared buffer pool across all files in the region.
  LSRPOOLID in file definition assigns pool.
  More efficient than individual file buffers.
  CICS manages buffer pool sizes via SIT parameters.

NSR (Non-Shared Resources):
  Each file gets its own buffers.
  Used for high-volume sequential processing.
  Less memory-efficient than LSR.

System-Managed Buffering (SMB):
  SMS DATACLAS with ACCBIAS parameter.
  DFSMS auto-tunes buffers based on access patterns.

Pro Tip: For batch: always specify AMP BUFND/BUFNI — defaults are too small. For CICS: use LSR pools.`
    },

    { title:"VSAM — VERIFY Deep Dive", level:"Beginner",
      content:`VERIFY resets end-of-file markers after abnormal close.

When Needed:
  A program ABENDs with a VSAM file open → file marked as "improperly closed."
  Next OPEN may fail with file status 97 or IEC161I message.
  VERIFY resets the end-of-file pointer to the correct position.

Syntax:
  VERIFY DATASET(MY.KSDS.FILE)

In JCL:
  //VERIFY EXEC PGM=IDCAMS
  //SYSPRINT DD SYSOUT=*
  //SYSIN DD *
    VERIFY DATASET(MY.KSDS.FILE)
  /*

When NOT Needed:
  After normal CLOSE — file is already properly closed.
  After REPRO — REPRO handles its own file management.

Automated VERIFY:
  Many shops add VERIFY as first step in batch JCL:
  VERIFY DATASET(name)
  IF LASTCC <= 4 THEN SET MAXCC = 0
  Ensures file is in good state regardless of what happened before.

What VERIFY Does NOT Do:
  Does NOT fix corrupted data.
  Does NOT rebuild indexes.
  Does NOT fix CI/CA split damage.
  For those: REORG (REPRO → DELETE → DEFINE → REPRO).

Pro Tip: Add VERIFY as a standard first step in any JCL that opens VSAM files. It's cheap insurance against leftover ABEND damage.`
    },

    { title:"VSAM — LISTCAT Output Analysis", level:"Intermediate",
      content:`LISTCAT ALL provides a complete health check of your VSAM file.

Command:
  LISTCAT ENT(MY.KSDS.FILE) ALL

Key Sections to Check:

ATTRIBUTES:
  KEYLEN, RKP — Key length and position
  AVGLRECL, MAXLRECL — Record sizes
  CISIZE — CI size
  SHROPT — Share options
  FREESPACE — CI and CA free space percentages

STATISTICS:
  REC-TOTAL — Total records in file
  REC-DELETED — Deleted records (wasted space)
  REC-INSERTED — Records inserted after initial load
  REC-RETRIEVED — Read count
  REC-UPDATED — Update count
  SPLITS-CI — CI split count (monitor this!)
  SPLITS-CA — CA split count (RED FLAG if high!)
  FREESPACE-CI — Current free space

ALLOCATION:
  HI-ALLOC-RBA — Highest allocated byte
  HI-USED-RBA — Highest used byte
  EXTENTS — Number of extents (watch for >50)

Health Indicators:
  SPLITS-CA > 0 → Needs REORG soon
  SPLITS-CI > 10% of records → Consider increasing FREESPACE
  REC-DELETED > 20% of REC-TOTAL → Wasted space, REORG
  EXTENTS > 50 → Approaching limit, REORG

Pro Tip: Run LISTCAT weekly on critical files. Trending split counts reveals performance degradation before users notice.`
    },

    { title:"VSAM — DELETE Patterns", level:"Beginner",
      content:`IDCAMS DELETE removes VSAM clusters, AIXes, paths, and GDGs.

DELETE Cluster:
  DELETE MY.KSDS.FILE CLUSTER PURGE
  CLUSTER keyword removes data + index components.
  PURGE overrides retention period.

DELETE with IF:
  DELETE MY.KSDS.FILE CLUSTER PURGE
  IF LASTCC = 8 THEN SET MAXCC = 0
  Ignores "not found" error (RC=8). Standard pattern.

DELETE AIX:
  DELETE MY.AIX.FILE
  Deletes alternate index. Base cluster unaffected.

DELETE PATH:
  DELETE MY.PATH.NAME
  Removes path. AIX and base unaffected.

DELETE GDG Base:
  DELETE MY.GDG.BASE GDG
  Removes GDG base definition.

DELETE Non-VSAM:
  DELETE MY.SEQ.FILE NOSCRATCH
  NOSCRATCH uncatalogs without deleting from volume.
  SCRATCH (default) removes from both catalog and volume.

DELETE with MASK:
  DELETE MY.TEMP.** MASK
  Deletes all datasets matching pattern.

Pro Tip: Always use CLUSTER keyword when deleting KSDS. Without it, you may only delete the catalog entry, leaving orphaned data.`
    },

    { title:"VSAM — COBOL OPEN Modes", level:"Beginner",
      content:`OPEN mode determines what operations are allowed on the VSAM file.

OPEN INPUT:
  Read-only access. READ and START allowed.
  No WRITE, REWRITE, or DELETE.
  Use for: Reports, extracts, lookups.

OPEN OUTPUT:
  Write-only. Creates new file or replaces contents.
  WRITE allowed. No READ, REWRITE, or DELETE.
  Use for: Initial data loads, rebuilds.

OPEN I-O:
  Full access. READ, WRITE, REWRITE, DELETE all allowed.
  Use for: Updates, transaction processing.

OPEN EXTEND:
  Append only. Adds records after existing data.
  WRITE allowed (sequential only, at end).
  Use for: Log files, cumulative data.

File Status on OPEN:
  00 — Opened successfully
  35 — File not found
  37 — File type mismatch
  39 — Attribute conflict
  41 — File already open
  97 — VSAM OPEN failure (various causes)

Multiple OPEN:
  Cannot OPEN a file twice in same program.
  CLOSE first, then OPEN with different mode if needed.

Pro Tip: Use the most restrictive mode that works. INPUT for reads (shared access), I-O only when updating (exclusive access).`
    },

    { title:"VSAM — WRITE Patterns", level:"Beginner",
      content:`WRITE adds new records to VSAM files.

Sequential WRITE (OPEN OUTPUT):
  Records must be in ascending key order for KSDS.
  WRITE CUST-RECORD FROM WS-REC
  Used for: Initial load, rebuild from extract.

Random WRITE (OPEN I-O):
  Records can be in any order.
  WRITE CUST-RECORD FROM WS-REC
    INVALID KEY PERFORM DUP-KEY-HANDLER
  END-WRITE
  INVALID KEY fires if key already exists (status 22).

WRITE to ESDS:
  Always appends to end. No key needed.
  OPEN OUTPUT or OPEN EXTEND.

WRITE to RRDS:
  Specify record number in RELATIVE KEY field.
  MOVE 42 TO WS-REL-KEY
  WRITE RR-RECORD

Batch Load Pattern:
  OPEN OUTPUT CUST-FILE (creates empty or replaces)
  SORT input by key (ascending for KSDS)
  PERFORM: Build record → WRITE → Read next input
  CLOSE CUST-FILE
  Check total written = total input

Error Handling:
  22 — Duplicate key (KSDS/RRDS)
  24 — Boundary violation (no space)
  48 — File not opened for output

Pro Tip: For initial loads, always SORT by primary key first. Out-of-order WRITEs to KSDS in OUTPUT mode cause status 21.`
    },

    { title:"VSAM — REWRITE & DELETE Patterns", level:"Beginner",
      content:`REWRITE updates existing records. DELETE removes them.

REWRITE (Update):
  Must READ first (gets lock in CICS).
  MOVE new-value TO field-in-record
  REWRITE CUST-RECORD FROM WS-REC
    INVALID KEY PERFORM UPDATE-ERROR
  END-REWRITE

  For KSDS: Cannot change the primary key.
  For variable-length: Can change record size.

DELETE (Remove):
  KSDS — Can delete by key:
    MOVE key TO CUST-KEY
    DELETE CUST-FILE
      INVALID KEY PERFORM NOT-FOUND
    END-DELETE

  ESDS — Cannot delete individual records.
  RRDS — Deletes the slot (makes it empty).

Read-Update Pattern (KSDS):
  MOVE search-key TO CUST-KEY
  READ CUST-FILE INTO WS-REC
    INVALID KEY PERFORM NOT-FOUND
  END-READ
  IF WS-FS = '00'
    MOVE new-balance TO CUST-BALANCE
    REWRITE CUST-RECORD FROM WS-REC
  END-IF

Delete-If-Exists Pattern:
  MOVE target-key TO CUST-KEY
  DELETE CUST-FILE
  IF WS-FS = '00'
    ADD 1 TO WS-DELETE-COUNT
  ELSE IF WS-FS = '23'
    DISPLAY 'NOT FOUND: ' target-key
  END-IF

Pro Tip: Always READ before REWRITE — VSAM requires it. Direct REWRITE without prior READ causes status 43.`
    },

    { title:"VSAM — START & READ NEXT (Browse)", level:"Intermediate",
      content:`START positions for sequential reading. READ NEXT reads forward from that position.

START:
  MOVE start-key TO CUST-KEY
  START CUST-FILE KEY >= CUST-KEY
    INVALID KEY PERFORM NO-RECORDS
  END-START

  KEY = — Position at exact key (status 23 if not found)
  KEY >= — Position at first key >= given value
  KEY > — Position after given key
  KEY <= — Position at last key <= given value (KSDS only)
  KEY < — Position before given key

READ NEXT:
  READ CUST-FILE NEXT INTO WS-REC
    AT END SET EOF-REACHED TO TRUE
  END-READ
  Returns next record in key sequence after START position.

READ PREVIOUS:
  READ CUST-FILE PREVIOUS INTO WS-REC
  For backward browsing (requires DYNAMIC access).

Browse Pattern:
  MOVE 'A' TO CUST-KEY
  START CUST-FILE KEY >= CUST-KEY
  PERFORM UNTIL EOF-REACHED
    READ CUST-FILE NEXT INTO WS-REC
      AT END SET EOF-REACHED TO TRUE
    END-READ
    IF NOT EOF-REACHED
      PERFORM PROCESS-RECORD
    END-IF
  END-PERFORM

Skip-Sequential:
  Random READ to position → then READ NEXT for sequential.
  Best of both worlds with DYNAMIC access mode.

Pro Tip: START KEY >= is the most common pattern — finds the nearest match even if exact key doesn't exist.`
    },

    { title:"VSAM — Compression", level:"Advanced",
      content:`VSAM compression reduces disk usage and can improve I/O performance.

Types:
  Extended Format Compression — For DFSMS-managed VSAM
  Tailored compression — DB2 uses for tablespace LDS

Enabling:
  Defined in SMS DATACLAS: COMPACTION=YES
  Or ALTER cluster: ALTER MY.KSDS.FILE COMPACTION(YES)
  Requires extended format (DSNTYPE=EXT in DATACLAS).

How It Works:
  Data compressed when written, decompressed when read.
  Compression dictionary built from data patterns.
  Typical compression ratios: 40-70% for text data.

Benefits:
  • Less disk space (40-70% reduction)
  • Fewer I/Os for sequential read (more records per CI)
  • Less data transferred from disk

Costs:
  • CPU overhead for compress/decompress
  • Slightly higher CPU per I/O
  • Initial dictionary build time

When to Use:
  Large files with text data — biggest benefit.
  Small files or binary data — minimal benefit.
  CPU-constrained systems — may not be worth the CPU cost.

Pro Tip: Compression is most beneficial for large sequential files. Test CPU impact before enabling on high-volume random-access files.`
    },

    { title:"VSAM — Password & Security", level:"Intermediate",
      content:`VSAM file security through passwords and RACF.

VSAM Passwords (Legacy):
  DEFINE CLUSTER ... MASTERPW(secret) READPW(rdonly)
  MASTERPW — Full access (update, delete)
  CONTROLPW — Control interval access
  UPDATEPW — Read/write access
  READPW — Read-only access

Supplying Password:
  In JCL: //DD DSN=MY.KSDS/PASSWORD,DISP=SHR
  IDCAMS: DELETE MY.KSDS/PASSWORD

RACF (Modern — Preferred):
  RACF discrete or generic profiles protect VSAM files.
  PERMIT 'MY.KSDS.**' ID(USER1) ACCESS(READ)
  PERMIT 'MY.KSDS.**' ID(BATCHGRP) ACCESS(UPDATE)

RACF vs VSAM Passwords:
  RACF: Centralized, audit trail, group-based, flexible.
  VSAM passwords: Per-file, no audit, difficult to manage.
  All modern shops use RACF.

ERASE Option:
  DEFINE CLUSTER ... ERASE
  Zero-fills data on DELETE — prevents recovery of sensitive data.
  Required for files containing PII, financial data.

Pro Tip: VSAM passwords are obsolete. Use RACF for all file security. ERASE for files with sensitive data.`
    },

    { title:"VSAM — REPRO Advanced Options", level:"Intermediate",
      content:`Advanced REPRO options for selective copying and data migration.

Key Range:
  REPRO INFILE(IN) OUTFILE(OUT) FROMKEY(key1) TOKEY(key2)
  Copy only records within key range.

Count and Skip:
  REPRO INFILE(IN) OUTFILE(OUT) SKIP(1000) COUNT(500)
  Skip first 1000 records, copy next 500.

REPLACE Option:
  REPRO INFILE(IN) OUTFILE(OUT) REPLACE
  If target KSDS has matching key, replace the record.
  Without REPLACE: duplicate key error (RC=8).

NOREPLACE:
  REPRO INFILE(IN) OUTFILE(OUT) NOREPLACE
  Skip duplicates silently.

REUSE:
  Target file defined with REUSE option:
  REPRO INFILE(IN) OUTFILE(OUT)
  Resets target to empty before loading.

Cross-Type Copy:
  REPRO from KSDS to sequential (backup)
  REPRO from sequential to KSDS (restore)
  REPRO from KSDS to ESDS (change type)
  REPRO from ESDS to KSDS (must be in key order)

MERGECAT/NOMERGECAT:
  For catalog operations during REPRO.

Pro Tip: REPRO REPLACE is perfect for refreshing reference tables — new records added, existing records updated, old records kept.`
    },

    { title:"VSAM — Performance Monitoring", level:"Advanced",
      content:`Monitor VSAM performance to detect problems before users notice.

LISTCAT Statistics:
  LISTCAT ENT(name) ALL — Complete file health check.
  Key metrics: SPLITS-CI, SPLITS-CA, EXTENTS, REC-DELETED.

SMF Records:
  SMF Type 60-69 — VSAM activity records.
  Captured automatically by z/OS.
  Analyzed with SAS, MICS, or custom reports.

RMF (Resource Measurement Facility):
  I/O activity reports show VSAM file I/O rates.
  Identify hotspot files with high I/O counts.

CICS Statistics:
  File control statistics show READ/WRITE/BROWSE counts per file.
  Response time per file access.

Performance Indicators:
  High CI splits → Need FREESPACE increase + REORG
  High CA splits → Urgent REORG needed
  Many extents → REORG to consolidate
  High REC-DELETED → REORG to reclaim space
  Buffer hits low → Increase BUFND/BUFNI

Trending:
  Track weekly: Record count, split count, extent count.
  Set thresholds: Alert if CA splits > 0, extents > 50.

Pro Tip: Proactive monitoring prevents emergency REORGs. Schedule weekly LISTCAT reports on all critical VSAM files.`
    },

    { title:"VSAM — KSDS Design Checklist", level:"Intermediate",
      content:`Complete checklist for designing a production KSDS file.

1. Key Design:
  • What uniquely identifies each record?
  • Key length (shorter = faster lookups)
  • Key position (offset 0 is most common)
  • Will keys be added in order or randomly?

2. Record Design:
  • Fixed or variable length?
  • Average and maximum record sizes
  • Include all fields or normalize with related files?

3. Space Allocation:
  • Estimate record count × record size = total data
  • Primary allocation: 1.5× estimated size (growth room)
  • Secondary allocation: 10-20% of primary
  • CYLINDERS for large files, TRACKS for small

4. CI Size:
  • 4096 for random-heavy access (CICS)
  • 16384+ for sequential-heavy access (batch)

5. Free Space:
  • High insert rate: FREESPACE(20 15)
  • Low insert rate: FREESPACE(10 5)
  • Read-only: FREESPACE(0 0)

6. Share Options:
  • SHAREOPTIONS(2 3) — Standard (one writer, multiple readers)
  • SHAREOPTIONS(1 3) — Strict (exclusive access)

7. Alternate Indexes:
  • Which fields need alternate access?
  • UNIQUE or NONUNIQUE?
  • UPGRADE (auto-maintain) or NOUPGRADE?

8. Backup & Recovery:
  • Daily REPRO backup to sequential
  • GDG for automatic rotation
  • VERIFY in batch JCL

Pro Tip: Spend time on design. A well-designed KSDS runs trouble-free for years. A poorly designed one needs constant REORGs.`
    },

    { title:"VSAM — ESDS Use Cases & Patterns", level:"Intermediate",
      content:`ESDS (Entry-Sequenced) is the right choice for specific scenarios.

Transaction Log:
  Append-only. Each transaction record added at end.
  Never need to delete individual log entries.
  Browse sequentially for audit or analysis.

Audit Trail:
  WHO did WHAT to WHICH record and WHEN.
  ESDS perfect — records never modified or deleted.
  Includes: timestamp, user ID, action, before/after values.

Data Feed Staging:
  Receive external data feed → Append to ESDS → Batch processes sequentially.
  No key needed — process in arrival order.

Journal Recovery:
  Application writes change journal to ESDS.
  On recovery: replay ESDS records to rebuild master file.

ESDS with Alternate Index:
  Even though ESDS has no primary key, you CAN define AIX.
  AIX on ESDS uses RBA as the pointer (not primary key).
  Enables keyed access to sequential data.

Processing Pattern:
  Open INPUT → READ sequentially → process each record → CLOSE.
  Or: OPEN I-O → UPDATE in place (same-length records only).

Cleanup:
  Cannot delete individual records.
  To purge old data: REPRO to new ESDS (copying only records to keep).

Pro Tip: ESDS is underused. For any append-only, chronological data, it's simpler and faster than KSDS.`
    },

    { title:"VSAM — GDG Management for VSAM", level:"Intermediate",
      content:`Using GDGs (Generation Data Groups) with VSAM for versioned backups.

GDG Basics:
  GDG base + generations. (+1) creates new, (0) current, (-1) previous.
  LIMIT controls how many generations to keep.

Define GDG Base:
  DEFINE GDG (NAME(MY.CUST.BACKUP) LIMIT(7) SCRATCH NOEMPTY)
  LIMIT(7) — Keep 7 generations
  SCRATCH — Delete oldest when limit exceeded
  NOEMPTY — Keep at least one generation

Daily VSAM Backup Pattern:
  //BACKUP EXEC PGM=IDCAMS
  //INDD DD DSN=PROD.CUST.KSDS,DISP=SHR
  //OUTDD DD DSN=MY.CUST.BACKUP(+1),DISP=(NEW,CATLG),
  //    SPACE=(CYL,(20,5)),DCB=(RECFM=VB,LRECL=32760)
  //SYSIN DD *
    REPRO INFILE(INDD) OUTFILE(OUTDD)
  /*

Restore from GDG:
  //INDD DD DSN=MY.CUST.BACKUP(0),DISP=SHR  ← Latest backup
  REPRO INFILE(INDD) OUTFILE(OUTDD)

  Or specific generation:
  //INDD DD DSN=MY.CUST.BACKUP(-2),DISP=SHR  ← 3 days ago

GDG + VSAM Notes:
  GDG generations are typically flat sequential (REPRO output).
  The VSAM cluster itself is NOT a GDG — the backups are.

Automation:
  Schedule daily: REPRO to GDG(+1)
  GDG auto-rotates — oldest backup deleted when LIMIT reached.
  No manual cleanup needed.

Pro Tip: Every production VSAM file should have a daily GDG backup. It costs almost nothing and saves you from disaster.`
    },

    { title:"VSAM — Common JCL Errors", level:"Beginner",
      content:`Troubleshooting guide for VSAM-related JCL errors.

IEC161I — VSAM OPEN Error:
  Cause: File improperly closed (ABEND with file open).
  Fix: IDCAMS VERIFY DATASET(name)

IEC070I — Insufficient Space:
  Cause: Primary + all secondary allocations used up.
  Fix: Increase SPACE, REORG to consolidate, delete old data.

IEC141I — Catalog Error:
  Cause: Dataset not in catalog, or catalog damaged.
  Fix: Check catalog entry with LISTCAT. Recatalog if needed.

IGD17101I — SMS Allocation Failure:
  Cause: No suitable volume in storage group.
  Fix: Check SMS configuration, free space on volumes.

S013 — OPEN Error:
  Cause: Attribute mismatch between JCL and actual file.
  Fix: Check DCB parameters, RECFM, LRECL. Note: VSAM doesn't use DCB.

IDC3012I — Duplicate Key:
  During REPRO. Source has record with key that already exists in target.
  Fix: Use REPLACE option: REPRO ... REPLACE

IDC3009I — Dataset Not Found:
  DELETE target doesn't exist.
  Fix: IF LASTCC = 8 THEN SET MAXCC = 0

File Status 35 in COBOL:
  Dataset not found at OPEN time.
  Fix: Check DSN spelling, verify dataset exists (LISTCAT), check JCL DD name.

Pro Tip: 90% of VSAM JCL errors are: IEC161I (needs VERIFY), IEC070I (needs space/REORG), or status 35 (wrong DSN).`
    },

    { title:"VSAM — Batch Window Elimination", level:"Expert",
      content:`Modern approaches to eliminate the traditional CICS batch window.

Traditional Batch Window:
  CICS closes files → Batch runs → CICS reopens.
  Problem: No online access during batch. Limited processing time.

Solution 1 — VSAM RLS:
  Record Level Sharing via Coupling Facility.
  CICS and batch access same file simultaneously.
  Record-level locking prevents conflicts.
  Requires: Parallel Sysplex, CF, SMSVSAM.

Solution 2 — BWO (Batch Window Overlap):
  Partial overlap — batch reads data component while CICS uses index.
  Limited concurrency but simpler than full RLS.

Solution 3 — Shadow Files:
  Maintain two copies. CICS uses copy A, batch uses copy B.
  After batch: Swap pointers. CICS now uses B.
  Requires application-level synchronization.

Solution 4 — DB2 Migration:
  Move data from VSAM to DB2.
  DB2 has built-in concurrent access (row locking).
  Most flexible but biggest effort.

Solution 5 — MQ-Based:
  Online writes to MQ queue instead of VSAM directly.
  Background task applies changes to VSAM.
  Decouples online from batch.

Pro Tip: RLS is the enterprise standard for batch window elimination. If your shop hasn't migrated, present the business case — it enables 24/7 operations.`
    },



    { title:"VSAM — Troubleshooting Checklist", level:"All Levels",
      content:`Systematic approach to diagnosing and fixing VSAM problems.

File Won't Open (Status 35/97):
  1. LISTCAT ENT(name) — Does file exist?
  2. Check JCL DD name matches COBOL SELECT ASSIGN
  3. VERIFY DATASET(name) — Reset if improperly closed
  4. Check RACF access — PERMIT needed?
  5. Check SHAREOPTIONS — Another job holding exclusive?

Performance Degradation:
  1. LISTCAT ALL — Check SPLITS-CI and SPLITS-CA
  2. If splits high → REORG (REPRO → DELETE → DEFINE → REPRO)
  3. Check EXTENTS — If >50, consolidate with REORG
  4. Check FREESPACE — Increase if heavy inserts
  5. Check buffers — Add AMP BUFND/BUFNI in JCL

Duplicate Key (Status 22):
  1. Key already exists in file
  2. Check if record was already loaded
  3. For REPRO: use REPLACE or NOREPLACE option
  4. Check key alignment (offset and length)

Record Not Found (Status 23):
  1. Key doesn't exist — verify key value
  2. Check key format: packed vs display, leading zeros
  3. For START: use KEY >= instead of KEY =
  4. PRINT first few records to verify key format

Space Problems (IEC070I):
  1. File out of space — all extents used
  2. Options: REORG, increase allocation, delete old data
  3. Check REC-DELETED in LISTCAT — REORG reclaims space

CICS File Issues:
  1. CEMT INQ FILE(name) — Is it open? Enabled?
  2. CEMT SET FILE(name) OPEN — Reopen if closed
  3. CEMT SET FILE(name) ENABLED — Re-enable if disabled
  4. Check VSAM base cluster health with LISTCAT

Emergency Recovery:
  1. VERIFY the file first
  2. If still broken: REPRO from latest backup
  3. DELETE corrupted cluster → DEFINE fresh → REPRO reload
  4. BLDINDEX for all alternate indexes

Pro Tip: Keep this checklist handy. 90% of VSAM issues are diagnosed with: LISTCAT + VERIFY + checking FILE STATUS codes.`
    },


    { title:"VSAM Interview Questions", level:"All Levels",
      content:`VSAM Interview Questions — 30+ Q&A organized by level.

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

💡 Study Tip: Know KSDS vs ESDS vs RRDS, CI splits, SHAREOPTIONS, and file status codes.`,
    },

    { title:"VSAM Cheat Sheet", level:"All Levels",
      content:`VSAM Quick Reference — Cheat Sheet

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
(4,x) — Full sharing via buffering`,
    },
  ]
};
