export const CICS_TOPIC = {
  id:"cics", icon:"🔄", title:"CICS", subtitle:"Customer Information Control System", color:"#eab308", level:"Beginner → Expert",
  description:"The world's most powerful transaction processing engine. 30 billion transactions daily. Every bank uses it.",
  sections:[
    { title:"Introduction to CICS", level:"Beginner",
      content:`CICS (Customer Information Control System) is IBM's enterprise transaction processing monitor for z/OS. It processes an estimated 30+ billion transactions per day worldwide — handling everything from ATM withdrawals to airline bookings.

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
  CICSPlex SM (System Manager): Central management tool.`
    },
    { title:"CICS Commands — EXEC CICS", level:"Beginner",
      content:`EXEC CICS Commands — The CICS API:

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
  EXEC CICS FORMATTIME ABSTIME(WS-ABS) DATESEP('/') YYYYMMDD(WS-DATE) TIME(WS-TIME) END-EXEC`
    },
    { title:"BMS Maps — Screen Design", level:"Beginner",
      content:`BMS (Basic Mapping Support) — 3270 Screen Design:

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
  Each field has: length (L), attribute (A), color (C), and data (D/I/O) subfields.`,
      code:`* BMS MAP DEFINITION EXAMPLE
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
         END`
    },
    { title:"Complete CICS COBOL Program", level:"Intermediate",
      code:`       IDENTIFICATION DIVISION.
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
           EXEC CICS RETURN END-EXEC.`,
      content:`Anatomy of a CICS COBOL Program:

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
   DATAONLY: Send only data fields (faster, for updates)`
    },
    { title:"CICS Error Handling & ABEND Codes", level:"Intermediate",
      content:`CICS Error Handling:

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
    Fix: Cold start CICS or restore catalog.`
    },
    { title:"Pseudo-Conversational vs Conversational", level:"Intermediate",
      content:`CICS Transaction Design Patterns:

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
     No 32K limit. More structured than COMMAREA.`
    },
    { title:"CICS Resource Definitions", level:"Intermediate",
      content:`CICS Resource Definitions — CSD (CICS System Definition):

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
  CICS starts up with a list of groups to install (GRPLIST parameter).`
    },
    { title:"CICS Web Services & APIs", level:"Advanced",
      content:`CICS Modern Integration — Web Services, APIs & JSON:

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
  Enables real-time integration without modifying existing programs.`
    },
    { title:"CICS Performance Tuning", level:"Advanced",
      content:`CICS Performance — Making Transactions Fly:

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
  • DSA utilization (are we running out of storage?)`
    },
    { title:"CICS Security", level:"Advanced",
      content:`CICS Security — Protecting Transactions and Data:

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
  • Performance data`
    },
    { title:"CICS Recovery & Restart", level:"Advanced",
      content:`CICS Recovery — Ensuring Data Integrity:

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
  Terminals reconnect automatically.`
    },
    { title:"CICS Interview Questions", level:"All Levels",
      content:`CICS Interview Questions — 35+ Q&A organized by level.

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

💡 Study Tip: Master pseudo-conversational logic, COMMAREA, BMS maps, and file control. These are in every CICS interview.`,
    },

    { title:"CICS Cheat Sheet", level:"All Levels",
      content:`CICS Quick Reference — Cheat Sheet

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
CEBR — TS queue browser`,
    },
  ]
};
