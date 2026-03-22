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
