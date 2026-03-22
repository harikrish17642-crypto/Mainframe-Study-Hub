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

    { title:"CICS File Control — READ & WRITE", level:"Intermediate",
      content:`File control commands access VSAM files in CICS.

READ:
  EXEC CICS READ DATASET('CUSTFILE')
    INTO(WS-REC) RIDFLD(WS-KEY) LENGTH(WS-LEN)
    RESP(WS-RESP) END-EXEC
  RESP(DFHRESP(NORMAL)) = success
  RESP(DFHRESP(NOTFND)) = record not found

WRITE:
  EXEC CICS WRITE DATASET('CUSTFILE')
    FROM(WS-REC) RIDFLD(WS-KEY) LENGTH(WS-LEN)
    RESP(WS-RESP) END-EXEC

UPDATE Pattern:
  READ with UPDATE option → modify → REWRITE
  EXEC CICS READ DATASET('CUSTFILE')
    INTO(WS-REC) RIDFLD(WS-KEY) UPDATE
    RESP(WS-RESP) END-EXEC
  ... modify WS-REC ...
  EXEC CICS REWRITE DATASET('CUSTFILE')
    FROM(WS-REC) RESP(WS-RESP) END-EXEC

DELETE:
  EXEC CICS DELETE DATASET('CUSTFILE')
    RIDFLD(WS-KEY) RESP(WS-RESP) END-EXEC

Pro Tip: Always use RESP option instead of HANDLE CONDITION — it's modern and explicit.`
    },

    { title:"CICS Browse Operations", level:"Intermediate",
      content:`Browse reads multiple records sequentially from VSAM in CICS.

START Browse:
  EXEC CICS STARTBR DATASET('CUSTFILE')
    RIDFLD(WS-KEY) GTEQ RESP(WS-RESP) END-EXEC
  GTEQ = start at key >= WS-KEY
  EQUAL = start at exact key

Read Next:
  EXEC CICS READNEXT DATASET('CUSTFILE')
    INTO(WS-REC) RIDFLD(WS-KEY) LENGTH(WS-LEN)
    RESP(WS-RESP) END-EXEC

Read Previous:
  EXEC CICS READPREV DATASET('CUSTFILE')
    INTO(WS-REC) RIDFLD(WS-KEY) RESP(WS-RESP) END-EXEC

End Browse:
  EXEC CICS ENDBR DATASET('CUSTFILE') RESP(WS-RESP) END-EXEC

Pattern — List first 20 customers:
  STARTBR → Loop READNEXT 20 times (or until ENDFILE) → ENDBR

Pro Tip: Always ENDBR when done. Forgetting leaves a browse token allocated — causes resource issues under load.`
    },

    { title:"CICS Temporary Storage (TS) Queues", level:"Intermediate",
      content:`TS queues store temporary data accessible by queue name.

WRITEQ TS:
  EXEC CICS WRITEQ TS QUEUE('MYQUEUE')
    FROM(WS-DATA) LENGTH(WS-LEN)
    ITEM(WS-ITEM-NUM) RESP(WS-RESP) END-EXEC
  ITEM returns the item number written.

READQ TS:
  EXEC CICS READQ TS QUEUE('MYQUEUE')
    INTO(WS-DATA) LENGTH(WS-LEN)
    ITEM(WS-ITEM-NUM) RESP(WS-RESP) END-EXEC

DELETEQ TS:
  EXEC CICS DELETEQ TS QUEUE('MYQUEUE') RESP(WS-RESP) END-EXEC

Storage Options:
  MAIN — Memory (fast, lost on CICS restart)
  AUXILIARY — Disk (persists across restarts)
  Default is AUXILIARY.

Common Uses:
  • Page-through screens (store all records, display page at a time)
  • Session scratch pad data
  • Passing large data between transactions
  • Building report data before display

Queue Naming:
  Often: TRANSID + EIBTRMID (terminal ID) for uniqueness.

Pro Tip: Delete TS queues when done. Orphaned queues waste storage.`
    },

    { title:"CICS Transient Data (TD) Queues", level:"Intermediate",
      content:`TD queues are for sequential one-direction data flow.

Types:
  Intrapartition — Within CICS. Can trigger transactions.
  Extrapartition — Maps to external file (dataset).

WRITEQ TD:
  EXEC CICS WRITEQ TD QUEUE('LOGA')
    FROM(WS-LOG-REC) LENGTH(WS-LEN) END-EXEC

READQ TD:
  EXEC CICS READQ TD QUEUE('LOGA')
    INTO(WS-REC) LENGTH(WS-LEN) END-EXEC

DELETEQ TD:
  EXEC CICS DELETEQ TD QUEUE('LOGA') END-EXEC

Trigger Level:
  Intrapartition queues can auto-start a transaction after N records.
  Define trigger level in CICS resource definition.

Extrapartition:
  Maps to JCL DD. Writes go to a sequential file.
  Used for: print output, audit logs, batch interface files.

TS vs TD:
  TS = random access by item number, read/write
  TD = sequential, one-direction flow, trigger capable

Pro Tip: Use TD for audit logs and print queues. Use TS for session data and scratch pads.`
    },

    { title:"CICS LINK, XCTL & RETURN", level:"Intermediate",
      content:`Three ways to transfer control between CICS programs.

LINK (Call — returns to caller):
  EXEC CICS LINK PROGRAM('SUBPROG')
    COMMAREA(WS-COMM) LENGTH(WS-LEN) END-EXEC
  Like COBOL CALL. Subprogram returns to caller.
  Both programs active in memory simultaneously.

XCTL (Transfer — doesn't return):
  EXEC CICS XCTL PROGRAM('NEXTPROG')
    COMMAREA(WS-COMM) LENGTH(WS-LEN) END-EXEC
  Current program ends. NEXTPROG takes over.
  Caller's resources freed.

RETURN (End program):
  Without TRANSID: Task ends completely.
  With TRANSID: Pseudo-conversational return.
  EXEC CICS RETURN TRANSID('TRN1')
    COMMAREA(WS-COMM) LENGTH(WS-LEN) END-EXEC

When to Use:
  LINK — Call a subroutine, need result back
  XCTL — Hand off to next program in a chain (menu → detail)
  RETURN with TRANSID — End pseudo-conversational interaction

Pro Tip: LINK keeps both programs in memory. XCTL frees the caller. For memory efficiency, prefer XCTL when you don't need to return.`
    },

    { title:"CICS SEND MAP & RECEIVE MAP", level:"Beginner",
      content:`BMS maps are the CICS screen interface — SEND displays, RECEIVE reads input.

SEND MAP:
  EXEC CICS SEND MAP('CUSTMAP') MAPSET('CUSTMST')
    MAPONLY ERASE END-EXEC
  MAPONLY — Send layout without data (first display)
  DATAONLY — Send data into existing layout (updates)
  ERASE — Clear screen first

RECEIVE MAP:
  EXEC CICS RECEIVE MAP('CUSTMAP') MAPSET('CUSTMST')
    INTO(CUSTMAPI) RESP(WS-RESP) END-EXEC
  Reads user input into the symbolic map structure.

Symbolic Map Fields:
  For field CUSTID: CUSTIDF (flag), CUSTIDL (length), CUSTIDI (input), CUSTIDO (output)
  Check CUSTIDL > 0 to see if user entered data.

Attribute Bytes:
  Control field behavior: protected, bright, dark, numeric, modified.
  MOVE DFHBMPRF TO CUSTIDA — Make field protected+bright.

SEND TEXT:
  EXEC CICS SEND TEXT FROM(WS-MSG) LENGTH(WS-LEN) ERASE END-EXEC
  Quick message without BMS map.

Pro Tip: Always check field length (xxxL > 0) before processing input. Users may press Enter without typing.`
    },

    { title:"CICS Attention Keys (AID)", level:"Beginner",
      content:`AID (Attention Identifier) keys trigger CICS input — ENTER, PF keys, PA keys.

EIBAID:
  EIB field set to the AID key pressed by user.
  Check after RECEIVE MAP.

Common AID Values:
  DFHENTER — Enter key
  DFHPF1 thru DFHPF24 — PF1-PF24
  DFHPA1, DFHPA2, DFHPA3 — PA keys
  DFHCLEAR — Clear key

Pattern:
  EXEC CICS RECEIVE MAP(...) END-EXEC
  EVALUATE EIBAID
    WHEN DFHENTER PERFORM PROCESS-INPUT
    WHEN DFHPF3   PERFORM EXIT-PROGRAM
    WHEN DFHPF7   PERFORM PAGE-UP
    WHEN DFHPF8   PERFORM PAGE-DOWN
    WHEN DFHPF12  PERFORM CANCEL-ACTION
    WHEN OTHER    PERFORM INVALID-KEY
  END-EVALUATE

PA Keys vs PF Keys:
  PA keys do NOT transmit screen data (fast, no I/O)
  PF keys transmit modified fields

HANDLE AID (Legacy):
  EXEC CICS HANDLE AID PF3(EXIT-LABEL) ENTER(PROCESS-LABEL) END-EXEC
  Legacy — use EIBAID with EVALUATE instead.

Pro Tip: Always handle PF3 as exit/back, ENTER as submit. This is the universal CICS convention.`
    },

    { title:"CICS COMMAREA Deep Dive", level:"Intermediate",
      content:`COMMAREA is the primary data-passing mechanism in pseudo-conversational CICS.

What It Is:
  Communication Area — data preserved between pseudo-conversational interactions.
  Max 32KB.

Setting COMMAREA:
  EXEC CICS RETURN TRANSID('TRN1')
    COMMAREA(WS-COMM) LENGTH(WS-COMM-LEN) END-EXEC

Receiving COMMAREA:
  LINKAGE SECTION.
  01 DFHCOMMAREA PIC X(n).
  
  PROCEDURE DIVISION.
  IF EIBCALEN = 0
    (First time — no COMMAREA yet)
  ELSE
    MOVE DFHCOMMAREA TO WS-COMM
  END-IF

Design Tips:
  • Include a "state" field: WS-COMM-STATE PIC X (I=inquiry, U=update)
  • Include key fields needed to re-read data
  • Keep it small — every byte is saved/restored per interaction
  • Version the layout — WS-COMM-VERSION PIC 9

COMMAREA vs TS Queue:
  COMMAREA: Small data (<32KB), fast, between interactions
  TS Queue: Large data, persist across transactions, shared

Pro Tip: First instruction in every CICS program: check EIBCALEN. 0 = first time. > 0 = returning user.`
    },

    { title:"CICS START & Interval Control", level:"Advanced",
      content:`START schedules transactions for later or deferred execution.

START:
  EXEC CICS START TRANSID('RPT1')
    INTERVAL(013000)
    FROM(WS-DATA) LENGTH(WS-LEN)
    RESP(WS-RESP) END-EXEC
  Runs RPT1 after 1 hour 30 minutes.

INTERVAL:
  INTERVAL(HHMMSS) — Delay from now
  TIME(HHMMSS) — Specific time today
  AFTER HOURS(1) MINUTES(30)

RETRIEVE (in started transaction):
  EXEC CICS RETRIEVE INTO(WS-DATA) LENGTH(WS-LEN) END-EXEC
  Gets the data passed by FROM in START.

CANCEL:
  EXEC CICS CANCEL REQID('REQ001') END-EXEC
  Cancels a previously STARTed request.

REQID:
  Identifier for the START request. Needed for CANCEL.

Common Uses:
  • Deferred processing (submit report at end of day)
  • Retry logic (retry failed operation after delay)
  • Scheduled cleanups
  • Asynchronous processing

Pro Tip: Use REQID when you need the ability to cancel. Without it, you can't cancel a STARTed transaction.`
    },

    { title:"CICS Debugging — CEDF, CECI, CEBR", level:"Intermediate",
      content:`Three essential CICS debugging tools.

CEDF (Execution Diagnostic Facility):
  Type CEDF at terminal → then run your transaction.
  Steps through every EXEC CICS command showing:
  - Command about to execute
  - Parameters and values
  - Response code after execution
  Press ENTER to continue, PF3 to stop debugging.

CECI (Command Interpreter):
  Test CICS commands interactively.
  CECI READ DATASET('CUSTFILE') RIDFLD('12345678')
  Shows the result immediately. Great for testing file access.

CEBR (TS Queue Browser):
  View contents of Temporary Storage queues.
  CEBR MYQUEUE
  Shows items in the queue — useful for debugging TS data.

CEMT (Master Terminal):
  INQ TASK — Show active tasks
  INQ PROG(name) — Check program status
  INQ FILE(name) — Check file status
  SET PROG(name) NEWCOPY — Load new version of program
  SET FILE(name) OPEN/CLOSE — Open/close file

Pro Tip: CEDF is the most powerful CICS debugging tool. Learn to read its output — it shows exactly what happens at each EXEC CICS command.`
    },

    { title:"CICS HANDLE ABEND & Recovery", level:"Advanced",
      content:`Production CICS programs must handle errors gracefully.

HANDLE ABEND:
  EXEC CICS HANDLE ABEND PROGRAM('ERRPGM') END-EXEC
  If this program ABENDs, CICS runs ERRPGM instead of crashing.

HANDLE ABEND LABEL:
  EXEC CICS HANDLE ABEND LABEL(ERR-RTN) END-EXEC
  Transfer to paragraph ERR-RTN on ABEND.

RESP Option (Modern — Preferred):
  EXEC CICS READ ... RESP(WS-RESP) END-EXEC
  IF WS-RESP NOT = DFHRESP(NORMAL)
    PERFORM HANDLE-ERROR
  END-IF
  No ABEND occurs — program checks response code.

ABEND Command:
  EXEC CICS ABEND ABCODE('MYAB') END-EXEC
  Intentionally ABEND with your code (for severe errors).

Syncpoint (Commit/Rollback):
  EXEC CICS SYNCPOINT END-EXEC — Commit all changes
  EXEC CICS SYNCPOINT ROLLBACK END-EXEC — Undo all changes

Dynamic Transaction Backout (DTB):
  If a transaction ABENDs, CICS automatically rolls back all recoverable resource changes (files, TS queues with RECOVERY).

Pro Tip: Use RESP on every EXEC CICS command. Reserve HANDLE ABEND for truly unexpected errors.`
    },

    { title:"CICS Channels & Containers", level:"Advanced",
      content:`Modern alternative to COMMAREA for passing data between programs. Overcomes 32KB limit.

Container:
  Named data area within a channel. Any size.
  EXEC CICS PUT CONTAINER('CUSTDATA') CHANNEL('MYCHAN')
    FROM(WS-DATA) FLENGTH(WS-LEN) END-EXEC

Channel:
  Collection of containers. Passed on LINK/XCTL/RETURN.
  EXEC CICS LINK PROGRAM('SUBPROG') CHANNEL('MYCHAN') END-EXEC

GET CONTAINER:
  EXEC CICS GET CONTAINER('CUSTDATA') CHANNEL('MYCHAN')
    INTO(WS-DATA) FLENGTH(WS-LEN) END-EXEC

Advantages over COMMAREA:
  • No 32KB limit
  • Multiple named containers (like a parameter list)
  • Pass different data types in different containers
  • Natural fit for web services (SOAP/REST)

COMMAREA vs Channels:
  Use COMMAREA for simple, small data (<32KB)
  Use Channels for large data, multiple data structures, web services

Pro Tip: New CICS development should use Channels. COMMAREA is legacy but still dominant in existing code.`
    },

    { title:"CICS Web Services — REST & SOAP", level:"Expert",
      content:`CICS can expose COBOL programs as REST/SOAP web services and consume external APIs.

Exposing as REST (CICS TS 5.2+):
  1. Write normal COBOL program with COMMAREA/Container interface
  2. Create URIMAP resource mapping URL to program
  3. CICS handles HTTP → COBOL data conversion
  4. JSON support: CICS auto-converts between JSON and COBOL structures

Consuming REST:
  EXEC CICS WEB OPEN ... END-EXEC (open HTTP connection)
  EXEC CICS WEB SEND ... END-EXEC (send request)
  EXEC CICS WEB RECEIVE ... END-EXEC (get response)

SOAP (Legacy):
  PIPELINE definitions + WSBIND files
  DFHWS2LS utility converts WSDL to COBOL language structure
  More complex setup than REST

z/OS Connect (Modern):
  API gateway that sits in front of CICS.
  Maps REST URLs to CICS programs automatically.
  No COBOL code changes needed.
  Swagger/OpenAPI support for API documentation.

Pro Tip: z/OS Connect is the modern way. For new projects, use REST with z/OS Connect. SOAP is legacy.`
    },

    { title:"CICS Multi-Threading & Task Control", level:"Expert",
      content:`CICS is a multi-tasking system — hundreds of transactions run concurrently.

Task:
  Each user interaction creates a CICS task.
  Tasks share CICS region resources (memory, files, queues).

ENQ/DEQ (Resource Locking):
  EXEC CICS ENQ RESOURCE('CUST-UPD-12345') LENGTH(16) END-EXEC
  ... exclusive processing ...
  EXEC CICS DEQ RESOURCE('CUST-UPD-12345') LENGTH(16) END-EXEC
  Prevents two users from updating the same record simultaneously.

SUSPEND & RESUME:
  EXEC CICS SUSPEND END-EXEC — Yield CPU to other tasks

DELAY:
  EXEC CICS DELAY INTERVAL(000005) END-EXEC — Wait 5 seconds

POST/WAIT:
  Timer-based event control for background processing.

Concurrency Issues:
  • Two users reading same record → both update → last one wins (lost update)
  • Fix: READ with UPDATE option (locks record) or use ENQ/DEQ
  • Deadlocks: Task A locks X, waits for Y. Task B locks Y, waits for X.
  • CICS detects deadlocks and ABENDs one task (ABEND code AKCS)

Pro Tip: Keep locks short. READ UPDATE → immediate REWRITE → release. Long locks cause timeouts for other users.`
    },



    { title:"CICS Transaction Routing", level:"Advanced",
      content:`Route transactions between CICS regions for load balancing and specialization.

Local vs Remote:
  Local: Transaction runs in the region where user is connected.
  Remote: Transaction routed to another CICS region.

Function Shipping:
  EXEC CICS READ DATASET('REMFILE') sends file request to owning region.
  Application code unchanged — CICS handles routing transparently.

Transaction Routing:
  User at Terminal → Region A → Routes TRN1 to Region B.
  Defined via: REMOTESYSTEM in TRANSACTION definition.

Distributed Program Link (DPL):
  EXEC CICS LINK PROGRAM('REMPROG') — Runs program in remote region.
  COMMAREA passed across regions.

MRO (Multi-Region Operation):
  CICS regions on same LPAR communicate via shared memory.
  Faster than ISC (Inter-System Communication) across LPARs.

ISC (Inter-System Communication):
  Cross-LPAR or cross-system communication via VTAM/TCP.

Pro Tip: MRO for same-LPAR communication (fast). ISC for cross-system (flexible but slower).`
    },

    { title:"CICS Storage Control", level:"Advanced",
      content:`CICS manages storage for all transactions in the region.

GETMAIN:
  EXEC CICS GETMAIN SET(ADDRESS OF WS-AREA) LENGTH(WS-LEN) INITIMG(X'00') END-EXEC
  Allocates memory dynamically. SET points to the acquired storage.

FREEMAIN:
  EXEC CICS FREEMAIN DATA(WS-AREA) END-EXEC
  Releases dynamically acquired storage.

Storage Types:
  User storage — Allocated for application use
  CICS storage — Internal CICS use
  Shared storage — Accessible across tasks

DSA (Dynamic Storage Area):
  UDSA — User Dynamic Storage Area (below 16MB line)
  ECDSA — Extended CICS DSA (above 16MB line)
  EUDSA — Extended User DSA
  Each has limits in CICS SIT parameters.

Short-on-Storage (SOS):
  When CICS runs low on storage, new transactions may be queued or rejected.
  Monitor with CEMT INQ DSAS.

Pro Tip: Avoid GETMAIN when possible — use COMMAREA or Channels. Dynamic storage that isn't FREEMAINed causes storage leaks.`
    },

    { title:"CICS Journal Control", level:"Advanced",
      content:`Journals record transaction activity for recovery and audit.

WRITE JOURNALNAME:
  EXEC CICS WRITE JOURNALNAME('DFHLOG')
    JTYPEID('XX') FROM(WS-DATA) LENGTH(WS-LEN)
    RESP(WS-RESP) END-EXEC

System Log (DFHLOG):
  Records all recoverable resource changes.
  Used by Dynamic Transaction Backout (DTB).
  Automatic — CICS writes to it for all recoverable operations.

User Journals:
  Custom journals for audit trails.
  JOURNAL01 through JOURNAL99.

Forward Recovery:
  Play back journal records to recreate changes.
  DFHJUP utility reads journal records.

Activity Keypoints:
  CICS periodically writes snapshots of active transactions.
  Used during emergency restart to determine in-flight transactions.

Pro Tip: System logging is automatic for recoverable resources. User journals are for custom audit requirements.`
    },

    { title:"CICS Monitoring & Statistics", level:"Advanced",
      content:`Monitor CICS performance and diagnose problems.

CEMT INQ Commands:
  CEMT INQ TASK — Active tasks (count, wait reasons)
  CEMT INQ DSAS — Storage usage
  CEMT INQ FILE — File status and access counts
  CEMT INQ TRAN — Transaction definitions
  CEMT INQ PROG — Program status and use counts
  CEMT INQ TDQUEUE — TD queue depths
  CEMT INQ TSQUEUE — TS queue info

CICS Statistics:
  Written to SMF or CICS statistics datasets.
  Transaction stats: Response time, CPU, I/O counts per transaction.
  File stats: Read/write counts, CI splits.
  Storage stats: DSA usage, peaks.

CICS Performance Analyzer (CPA):
  IBM tool for analyzing CICS statistics.
  Shows transaction response time breakdown.

Key Metrics:
  Transaction response time (average, 90th percentile)
  Task count and throughput
  File I/O counts
  Storage utilization
  Short-on-storage events

Pro Tip: Monitor transaction response time trends. Gradual degradation usually means growing data volumes or file splits.`
    },

    { title:"CICS System Initialization (SIT)", level:"Expert",
      content:`The SIT (System Initialization Table) configures how CICS starts up.

Key SIT Parameters:
  DSALIM — User storage limit below the line
  EDSALIM — Extended storage limit above the line
  MXT — Maximum tasks allowed concurrently
  AMAXTASKS — Active max tasks
  AKPFREQ — Activity keypoint frequency
  DTRTRAN — Default routing transaction
  GRPLIST — CSD group list to install at startup
  TCPIPSERVICE — TCP/IP listeners
  DB2CONN — DB2 connection name

Overriding SIT:
  At startup: PARM='SIT=6$,DSALIM=10M,MXT=200'
  $ triggers override prompts at console.

PLT (Program List Table):
  PLTPI — Programs to run during startup (initialization)
  PLTSD — Programs to run during shutdown (cleanup)

CEDA vs CSD:
  CSD (CICS System Definition) — File containing resource definitions.
  CEDA — Online transaction to define/alter/install resources.
  CICS reads CSD at startup, installs defined resources.

Pro Tip: Know SIT parameters for CICS admin interviews: MXT, DSALIM, EDSALIM, and GRPLIST are most asked.`
    },

    { title:"CICS — BMS Map Assembly", level:"Intermediate",
      content:`BMS maps are assembled to create physical and symbolic maps.

BMS Macros:
  DFHMSD — Mapset definition (collection of maps)
  DFHMDI — Map definition (one screen layout)
  DFHMDF — Field definition (one screen field)

Field Attributes:
  ATTRB=(PROT,BRT) — Protected, Bright
  ATTRB=(UNPROT,NORM) — Unprotected, Normal (input field)
  ATTRB=(UNPROT,BRT,IC) — Input, Bright, Initial Cursor
  ATTRB=(ASKIP) — Auto-skip
  ATTRB=(UNPROT,NUM) — Numeric input only

Assembly:
  Assemble with TYPE=DSECT → Symbolic map (COBOL copybook)
  Assemble with TYPE=MAP → Physical map (load module)
  Both needed: physical for display, symbolic for program data.

Symbolic Map Structure:
  For field CUSTID:
  CUSTIDF — Flag byte (MDT, etc.)
  CUSTIDL — Input length (S9(4) COMP)
  CUSTIDA — Attribute byte
  CUSTIDI — Input data (PIC X(n))
  CUSTIDO — Output data (PIC X(n))

Pro Tip: Check field length (xxxL > 0) to know if user entered data. Check MDT flag to know if field was modified.`
    },

    { title:"CICS — ASSIGN & INQUIRE", level:"Intermediate",
      content:`ASSIGN retrieves system values. INQUIRE checks resource status.

EXEC CICS ASSIGN:
  EXEC CICS ASSIGN USERID(WS-USERID) END-EXEC — Current user
  EXEC CICS ASSIGN SYSID(WS-SYSID) END-EXEC — Region name
  EXEC CICS ASSIGN APPLID(WS-APPLID) END-EXEC — CICS applid
  EXEC CICS ASSIGN FACILITY(WS-TERMID) END-EXEC — Terminal ID
  EXEC CICS ASSIGN NETNAME(WS-NETNAME) END-EXEC — Network name
  EXEC CICS ASSIGN STARTCODE(WS-START) END-EXEC — How started (TD, S, etc.)

EXEC CICS INQUIRE:
  EXEC CICS INQUIRE FILE('CUSTFILE')
    OPENSTATUS(WS-STATUS) ENABLESTATUS(WS-ENABLE)
    END-EXEC
  Checks if file is open/closed, enabled/disabled.

  EXEC CICS INQUIRE PROGRAM('MYPROG')
    STATUS(WS-STATUS) USECOUNT(WS-COUNT)
    END-EXEC

EXEC CICS SET:
  EXEC CICS SET FILE('CUSTFILE') OPEN END-EXEC — Open file
  EXEC CICS SET PROGRAM('MYPROG') NEWCOPY END-EXEC — Load new version

Pro Tip: Use ASSIGN USERID for security checks. Use INQUIRE before FILE operations to verify file is open.`
    },

    { title:"CICS — Batch Data Interchange (BDI)", level:"Expert",
      content:`Patterns for exchanging data between CICS (online) and batch processing.

Online-to-Batch:
  1. CICS writes to TD extrapartition queue → Dataset → Batch reads
  2. CICS writes to TS queue → Batch CICS transaction reads and writes to file
  3. CICS updates shared VSAM file → Batch reads VSAM

Batch-to-Online:
  1. Batch writes sequential file → CICS reads via extrapartition TD
  2. Batch updates shared VSAM → CICS reads VSAM
  3. Batch sends MQ message → CICS MQ trigger starts transaction

Shared VSAM:
  SHAREOPTIONS(2,3) — Batch reads, CICS writes
  Use CICS RLS for true sharing or BWO (batch window) approach.

Batch Window:
  1. Close files in CICS (CEMT SET FILE CLOSE)
  2. Run batch processing
  3. Reopen files (CEMT SET FILE OPEN)
  Traditional approach — increasingly replaced by RLS.

Pro Tip: MQ is the modern way for CICS-to-batch communication. File-based interchange is legacy but still dominant.`
    },

    { title:"CICS — Testing Strategies", level:"Intermediate",
      content:`Testing CICS programs before production deployment.

Unit Testing:
  CEDF — Step through EXEC CICS commands
  CECI — Test individual commands interactively
  CEBR — Verify TS queue contents

Integration Testing:
  Test full transaction flow: map → process → file → response
  Use test CICS region with test data

Regression Testing:
  Save screen captures of expected output
  Compare after code changes
  Automated tools: IBM CICS Test, CA Verify

Debugging:
  CEDF — Most powerful online debugger
  CEEDUMP DD — Formatted dumps for ABENDs
  EDF over terminal — Debug on user's terminal
  CEDX — Extended debugging

Common Test Scenarios:
  1. Normal path — Valid input, successful processing
  2. Not found — Record doesn't exist
  3. Duplicate — Record already exists
  4. Invalid input — Spaces, non-numeric in numeric field
  5. File closed — CICS file not available
  6. Security — User without authority

Pro Tip: Always test with CEDF first. It shows every EXEC CICS command's input and output — catches 80% of bugs.`
    },

    { title:"CICS — Application Design Patterns", level:"Advanced",
      content:`Proven architectural patterns for CICS applications.

Menu-Detail Pattern:
  Menu screen → User selects option → XCTL to detail program → Detail processes → XCTL back to menu.
  Each screen is a separate program.

Inquiry-Update Pattern:
  1. Display inquiry screen (SEND MAP MAPONLY)
  2. User enters key → RECEIVE → READ file → display data (SEND DATAONLY)
  3. User modifies → RECEIVE → validate → REWRITE → confirm

Scratchpad Pattern:
  Store complex state in TS queue (keyed by EIBTRMID).
  Each pseudo-conversational return saves state to TS.
  Each return retrieves state from TS.

Multi-Page Pattern:
  Large result set stored in TS queue.
  Display one page at a time.
  PF7 = page up, PF8 = page down.
  COMMAREA tracks current page number.

Error Handling Pattern:
  Central error program — LINK to it from any program.
  Passes: error code, program name, transaction ID.
  Error program logs, displays message, optionally ABENDs.

Pro Tip: Keep programs small (one function each). Use XCTL to chain them. COMMAREA or channels pass data between programs.`
    },



    { title:"CICS — FORMATTIME & Date Handling", level:"Beginner",
      content:`Working with dates and times in CICS programs.

ASKTIME:
  EXEC CICS ASKTIME ABSTIME(WS-ABSTIME) END-EXEC
  Gets current timestamp as absolute time (packed decimal).

FORMATTIME:
  EXEC CICS FORMATTIME ABSTIME(WS-ABSTIME)
    DDMMYYYY(WS-DATE) TIME(WS-TIME) TIMESEP(':') DATESEP('/')
    RESP(WS-RESP) END-EXEC
  Formats timestamp into readable fields.

Output Fields:
  DDMMYYYY, MMDDYYYY, YYYYMMDD — Date formats
  YYYYDDD — Julian date
  TIME — HHMMSS
  DAYCOUNT — Days since Jan 1, 1900
  DAYOFWEEK — 0=Sunday, 6=Saturday
  MONTHOFYEAR — 1-12

Common Use:
  Display current date/time on BMS screen.
  Stamp records with creation timestamp.

Pro Tip: Always use ASKTIME + FORMATTIME together. ASKTIME captures the moment, FORMATTIME converts it.`
    },

    { title:"CICS — Interval Control Timer", level:"Intermediate",
      content:`Schedule delayed and recurring tasks in CICS.

DELAY:
  EXEC CICS DELAY INTERVAL(000005) END-EXEC — Wait 5 seconds
  EXEC CICS DELAY FOR HOURS(1) MINUTES(30) END-EXEC

POST (Timer Event):
  EXEC CICS POST INTERVAL(001000) SET(WS-TIMER-PTR) REQID('TMR1') END-EXEC
  Posts a timer event after 10 minutes.

WAIT EVENT:
  EXEC CICS WAIT EVENT ECADDR(WS-TIMER-PTR) END-EXEC
  Waits until the timer fires.

CANCEL:
  EXEC CICS CANCEL REQID('TMR1') END-EXEC
  Cancels a pending timer.

START with INTERVAL:
  EXEC CICS START TRANSID('RPT1') INTERVAL(013000) END-EXEC
  Schedules transaction RPT1 to run in 1h30m.

Use Cases:
  • Delayed notifications
  • Scheduled cleanup tasks
  • Retry logic with backoff
  • Periodic health checks

Pro Tip: DELAY blocks the task. START launches a new task. Use START for background work, DELAY only for brief waits.`
    },

    { title:"CICS — Queue Management Patterns", level:"Intermediate",
      content:`Best practices for managing TS and TD queues in production.

TS Queue Naming:
  Convention: TRANSID + EIBTRMID for uniqueness per user.
  STRING EIBTRNID EIBTRMID INTO WS-QUEUE-NAME
  Or: 'CUST' + USER-ID for user-specific data.

TS Queue Cleanup:
  Always DELETEQ when done. Orphaned queues waste storage.
  Add cleanup logic in error paths too.

Paging Pattern (Multi-Page Display):
  1. Read all matching records into TS queue (one item per record)
  2. COMMAREA stores: current page, total items, queue name
  3. PF8 (forward): Read items N+1 to N+PAGESIZE from TS
  4. PF7 (backward): Read items N-PAGESIZE+1 to N from TS
  5. On exit: DELETEQ TS

TD Queue Monitoring:
  Use trigger levels to auto-start processing when queue fills.
  CEDA DEFINE TDQUEUE: TRIGGERLEVEL(100) TRANSID(PRTQ)
  After 100 records written, PRTQ transaction starts automatically.

TD Extrapartition for Batch Interface:
  CICS writes to TD → TD maps to JCL DD → Sequential dataset → Batch reads.
  Clean interface between online and batch.

Pro Tip: For TS queues, always include cleanup in both normal and error paths. Storage leaks are hard to diagnose in production.`
    },

    { title:"CICS — Security Implementation", level:"Advanced",
      content:`CICS security through RACF and CICS built-in mechanisms.

RACF Integration:
  CICS uses RACF (or equivalent) for authentication and authorization.
  User signs on to CICS → RACF validates → Security token created.

Transaction Security:
  RACF class: TCICSTRN
  PERMIT CUST IN CLASS(TCICSTRN) ID(USER1) ACCESS(READ)
  User1 can execute transaction CUST.

Resource Security:
  File security: RACF class FCICSFCT
  Program security: RACF class PCICSPPT
  TS Queue security: RACF class TCICSTST

EXEC CICS VERIFY:
  EXEC CICS VERIFY USERID(WS-USER) PASSWORD(WS-PASS) RESP(WS-RESP) END-EXEC
  Programmatic authentication check.

EXEC CICS QUERY SECURITY:
  EXEC CICS QUERY SECURITY RESTYPE('DATASET') RESID('MY.FILE')
    LOGMESSAGE(WS-LOG) RESP(WS-RESP) END-EXEC
  Check if current user has access before attempting operation.

SIGNON/SIGNOFF:
  EXEC CICS SIGNON USERID(WS-USER) PASSWORD(WS-PASS) END-EXEC
  Changes the security context of the terminal.

Pro Tip: Always use QUERY SECURITY before sensitive operations. Better to check access than ABEND with security violation.`
    },

    { title:"CICS — Problem Determination", level:"Advanced",
      content:`Diagnosing CICS problems in production.

Transaction Dumps:
  EXEC CICS DUMP TRANSACTION DUMPCODE('MYCD') END-EXEC
  Creates a transaction dump for analysis.

System Dump:
  Triggered by CICS or z/OS for severe errors.
  Analyzed with IPCS (Interactive Problem Control System).

CICS Messages:
  DFHxxnnnn format. xx = component, nnnn = message number.
  DFHFC — File Control. DFHDB — DB2. DFHTD — Transient Data.
  Look up messages in CICS Messages and Codes manual.

Trace:
  CETR — CICS trace transaction.
  Auxiliary trace → writes to trace dataset.
  Internal trace → circular buffer in memory.
  Use trace points to follow execution flow.

Common ABENDs:
  ASRA — Program check (like S0C7, S0C4 in batch)
  AICA — Runaway task (infinite loop)
  AEY9 — DB2 not available
  AKCS — Deadlock detected
  AEIO — File not found or disabled

Diagnostic Steps:
  1. Check CICS messages in CSMT log
  2. Check transaction dump
  3. Run CEDF to reproduce
  4. Check trace if needed
  5. Review CICS statistics for patterns

Pro Tip: ASRA is the CICS equivalent of batch S0C7/S0C4. Debug the same way — check data values and statement offsets.`
    },



    { title:"CICS — Program Control Table (PCT)", level:"Intermediate",
      content:`The PCT maps transaction IDs to programs. Every CICS transaction needs a PCT entry.

PCT Entry Contains:
  TRANSID — 4-character transaction identifier
  PROGRAM — Initial program to load
  TWASIZE — Transaction Work Area size
  TASKDATALOC — BELOW/ANY (storage location)
  PROFILE — Default profile for the transaction

Defining via RDO (CEDA):
  CEDA DEFINE TRANSACTION(CUST) GROUP(MYGROUP)
    PROGRAM(CUSTPGM) TWASIZE(0) TASKDATALOC(ANY)
  CEDA INSTALL TRANSACTION(CUST) GROUP(MYGROUP)

PCT vs RDO:
  PCT (macro) — Legacy. Assembled into CICS load module.
  RDO (CEDA/CSD) — Modern. Dynamic, no CICS restart needed.
  All new definitions should use RDO.

Listing Transactions:
  CEMT INQ TRANSACTION(CUST) — Shows status, program, profile
  CEMT SET TRANSACTION(CUST) DISABLED — Disable transaction
  CEMT SET TRANSACTION(CUST) ENABLED — Re-enable

Pro Tip: Use CEDA for all resource definitions. PCT macros are legacy — only found in very old shops.`
    },

    { title:"CICS — Processing Program Table (PPT)", level:"Intermediate",
      content:`The PPT tracks programs, mapsets, and partition sets available in CICS.

PPT Entry Contains:
  PROGRAM — Program name (up to 8 characters)
  LANGUAGE — COBOL, Assembler, C, PL/I
  DATALOCATION — BELOW/ANY
  EXECKEY — USER/CICS (security level)
  STATUS — ENABLED/DISABLED
  USECOUNT — Number of tasks currently using it

Defining:
  CEDA DEFINE PROGRAM(CUSTPGM) GROUP(MYGROUP) LANGUAGE(COBOL)
  CEDA INSTALL PROGRAM(CUSTPGM) GROUP(MYGROUP)

NEWCOPY:
  After recompiling a program:
  CEMT SET PROGRAM(CUSTPGM) NEWCOPY
  Loads the new version. Active tasks finish with old version.

PHASEOUT:
  CEMT SET PROGRAM(CUSTPGM) PHASEIN
  New tasks get new version. Old tasks continue with old. Gradual rollout.

Checking Status:
  CEMT INQ PROGRAM(CUSTPGM)
  Shows: Language, status, use count, load address.

Pro Tip: Always NEWCOPY after deploying updated load modules. Without it, CICS keeps using the cached old version.`
    },

    { title:"CICS — File Control Table (FCT)", level:"Intermediate",
      content:`The FCT defines VSAM and BDAM files accessible in CICS.

FCT Entry Contains:
  FILE — Logical file name (used in EXEC CICS commands)
  DSNAME — Physical dataset name
  RECORDFORMAT — V/F (variable/fixed)
  ADD/BROWSE/DELETE/READ/UPDATE — Operations allowed
  OPENTIME — STARTUP/FIRSTREF (when to open)
  DISPOSITION — SHARE/OLD
  RLSACCESS — YES/NO (Record Level Sharing)
  LSRPOOLID — Buffer pool assignment

Defining:
  CEDA DEFINE FILE(CUSTFILE) GROUP(MYGROUP)
    DSNAME(PROD.CUST.KSDS) ADD(YES) BROWSE(YES)
    DELETE(YES) READ(YES) UPDATE(YES)
    OPENTIME(FIRSTREF) DISPOSITION(SHARE)

Operations:
  CEMT SET FILE(CUSTFILE) OPEN — Open file
  CEMT SET FILE(CUSTFILE) CLOSE — Close file
  CEMT INQ FILE(CUSTFILE) — Check status

CEMT SET FILE CLOSE/OPEN Pattern:
  Close for batch window: CEMT SET FILE(CUSTFILE) CLOSE
  Reopen after batch: CEMT SET FILE(CUSTFILE) OPEN

Pro Tip: OPENTIME(FIRSTREF) opens files on first access — saves startup time. OPENTIME(STARTUP) opens at CICS initialization.`
    },

    { title:"CICS — Destination Control Table (DCT)", level:"Intermediate",
      content:`The DCT defines Transient Data queues and their properties.

Intrapartition TD Queue:
  CEDA DEFINE TDQUEUE(LOGA) GROUP(MYGROUP)
    TYPE(INTRA) TRIGGERLEVEL(50) TRANSID(PRTQ)
  When 50 records written → auto-start transaction PRTQ.

Extrapartition TD Queue:
  CEDA DEFINE TDQUEUE(PRNT) GROUP(MYGROUP)
    TYPE(EXTRA) DDNAME(PRTDD) DISPOSITION(MOD)
    RECORDFORMAT(FIXED) RECORDLENGTH(133)
  Maps to JCL DD: //PRTDD DD SYSOUT=*

Indirect TD Queue:
  Points to another queue. Used for redirection.

Trigger Level:
  Auto-starts a transaction when queue depth reaches the trigger.
  TRIGGERLEVEL(100) TRANSID(PROC) → After 100 records, start PROC.
  Powerful for event-driven processing.

Queue Management:
  CEMT INQ TDQUEUE(LOGA) — Check depth, trigger status
  CEMT SET TDQUEUE(LOGA) ENABLED/DISABLED

Pro Tip: Trigger levels are CICS's event-driven mechanism. Use them for automatic batch-like processing within CICS.`
    },

    { title:"CICS — System Programming Interface (SPI)", level:"Expert",
      content:`SPI commands let programs perform administrative tasks programmatically.

EXEC CICS INQUIRE:
  INQUIRE TRANSACTION/PROGRAM/FILE/TDQUEUE/TSQUEUE — Check resource status.
  Returns: Status, use count, open/close state, etc.

EXEC CICS SET:
  SET PROGRAM(name) NEWCOPY — Load new version
  SET FILE(name) OPEN/CLOSE — Open/close file
  SET TRANSACTION(name) ENABLED/DISABLED — Enable/disable
  SET TASK(num) PURGE — Force-end a stuck task

EXEC CICS CREATE:
  CREATE TRANSACTION(name) ATTRIBUTES(...) — Define resource dynamically
  Powerful for auto-scaling, dynamic configuration.

EXEC CICS DISCARD:
  DISCARD TRANSACTION(name) — Remove resource definition
  Opposite of CREATE/INSTALL.

EXEC CICS COLLECT STATISTICS:
  Programmatically gather CICS statistics for monitoring.

EXEC CICS PERFORM:
  PERFORM SHUTDOWN — Initiate CICS shutdown
  PERFORM RESETTIME — Reset CICS clock

Use Cases:
  • Automated monitoring programs
  • Self-healing applications (detect problem → restart resource)
  • Dynamic resource management

Pro Tip: SPI is for system programming, not application programming. Needs SYSADM authority.`
    },

    { title:"CICS — Event Processing", level:"Expert",
      content:`CICS Event Processing captures business events for real-time analytics and integration.

What It Does:
  CICS monitors program behavior and emits events when specific conditions occur.
  Events sent to: Event processing adapters (EP adapters) → external systems.

Event Types:
  System events — CICS internal (task start/end, abend, etc.)
  Custom events — Defined by application (e.g., "high-value transaction")

Defining Events:
  Use CICS Explorer or CEDA to define event bindings:
  • Which program/command triggers the event
  • What data to capture
  • Where to send it

EP Adapters:
  WebSphere MQ adapter — Send events to MQ queues
  HTTP adapter — POST events to REST endpoints
  Custom adapter — Your own processing logic

Event Emission:
  Transparent to the application — no code changes.
  CICS intercepts EXEC CICS commands and emits events based on definitions.

Use Cases:
  • Real-time fraud detection (high-value transactions)
  • Business activity monitoring (BAM)
  • Audit trail generation
  • Integration with analytics platforms

Pro Tip: Event processing enables real-time mainframe analytics without modifying legacy COBOL programs.`
    },

    { title:"CICS — Liberty JVM Server", level:"Expert",
      content:`CICS Liberty enables Java/web applications to run alongside COBOL in the same CICS region.

What It Is:
  WebSphere Liberty embedded in CICS.
  Runs Java servlets, JSPs, JAX-RS (REST) services.
  Java can call COBOL (via JCICS API) and vice versa.

Architecture:
  CICS Region → JVM Server → Liberty → Java Apps
  Java accesses CICS resources through JCICS.

JCICS API:
  Program prog = new Program(); prog.link() — LINK to COBOL
  Channel chan = Task.getChannel() — Get channel data
  KSDS file = new KSDS(); file.read() — Read VSAM

Benefits:
  • Run Java alongside COBOL in same region
  • Java accesses CICS resources natively
  • REST APIs from CICS without z/OS Connect
  • Modern deployment (WAR files, Maven/Gradle)
  • Spring Boot support

Deployment:
  Deploy Java apps as WAR/EAR to Liberty.
  Configure JVM server in CICS resource definitions.
  CEDA DEFINE JVMSERVER(DFHWLP) GROUP(WEBGRP)

Pro Tip: Liberty JVM Server is the modern CICS development model. New CICS applications are increasingly Java + COBOL hybrid.`
    },

    { title:"CICS — 3270 Bridge & Terminal Emulation", level:"Advanced",
      content:`Access 3270-based transactions programmatically without a real terminal.

3270 Bridge:
  Allows a program to drive a 3270 transaction as if it were a user.
  Used for: Screen scraping, web-to-3270, automated testing.

How It Works:
  Client program → LINK to bridge → Bridge creates virtual terminal → Runs target transaction → Returns screen data.

EXEC CICS START:
  START TRANSID('CUST') CHANNEL('BRIDGE')
  With appropriate bridge parameters in containers.

Web-to-3270:
  HTTP request → CICS web service → Bridge → Legacy 3270 transaction → Response.
  Enables web access to legacy apps without rewriting.

Bridge Exit:
  Customize bridge behavior — transform data, skip screens, handle errors.

CICSPlex SM:
  CICS management interface that uses bridge technology.

Modern Alternatives:
  • CICS web services (expose COBOL directly as API)
  • z/OS Connect (API gateway)
  • CICS Liberty (Java REST + JCICS)

Pro Tip: Bridge is useful for quick wins — web-enable legacy apps without code changes. For new development, use APIs instead.`
    },



    { title:"CICS — Best Practices Summary", level:"All Levels",
      content:`Essential CICS best practices for production applications.

Programming Best Practices:
  • Always use pseudo-conversational (never conversational)
  • Check EIBCALEN on entry — 0 means first invocation
  • Use RESP option on every EXEC CICS command (not HANDLE CONDITION)
  • Keep COMMAREA small — only essential state data
  • Always ENDBR after browse operations
  • Always DELETEQ TS when done with queues
  • Use CHANNELS for new development (>32KB data)

Error Handling:
  • RESP(WS-RESP) on every command — check for DFHRESP(NORMAL)
  • Handle NOTFND, DUPREC, ENDFILE explicitly
  • HANDLE ABEND for unexpected errors only
  • SYNCPOINT ROLLBACK on errors to undo changes

Performance Best Practices:
  • Keep transactions short (< 1 second response time target)
  • Minimize file I/O — read once, process in memory
  • Use MAPONLY for first display, DATAONLY for updates
  • READ with UPDATE only when actually updating (locks record)
  • Release locks quickly — REWRITE immediately after READ UPDATE

Debugging:
  • CEDF — Step through EXEC CICS commands
  • CECI — Test commands interactively
  • CEBR — Browse TS queues
  • CEMT — Check resource status
  • NEWCOPY after every recompile

Deployment:
  • Test in development CICS region first
  • CEMT SET PROGRAM(name) NEWCOPY after promoting load modules
  • Verify with CEMT INQ PROGRAM — check use count

Pro Tip: The golden rule of CICS: pseudo-conversational + RESP option + short transactions. Master these three and 90% of CICS problems disappear.`
    },



    { title:"CICS — Shared Data Tables", level:"Advanced",
      content:`Shared Data Tables (SDT) load VSAM data into memory for ultra-fast read access.

Types:
  Coupling Facility Data Table (CFDT) — Shared across regions via CF
  User-Maintained Data Table (UMT) — In-memory copy, app manages updates
  CICS-Maintained Data Table (CMT) — CICS auto-syncs with VSAM source

How CMT Works:
  1. CICS loads VSAM file into memory at OPEN time
  2. READ commands access memory (no disk I/O)
  3. WRITE/REWRITE/DELETE update both memory AND VSAM
  4. Other regions see updates via CF (if CFDT)

Benefits:
  Sub-millisecond read times. No disk I/O for lookups.
  Perfect for: reference tables, code lookups, rate tables.

Defining:
  CEDA DEFINE FILE(RATETBL) ... TABLE(YES) MAXNUMRECS(10000)

Limitations:
  Memory consumption. Not for large or frequently updated files.
  CMT adds overhead on writes (update memory + disk).

Pro Tip: Use CMT for small, read-heavy reference tables (country codes, currency rates). Dramatic performance improvement.`
    },

    { title:"CICS — Asynchronous Processing", level:"Expert",
      content:`Process work in the background without blocking the user's transaction.

START (Fire and Forget):
  EXEC CICS START TRANSID('BGND') FROM(WS-DATA) LENGTH(WS-LEN) END-EXEC
  Starts a new task. Current task continues immediately.

START with CHANNEL:
  EXEC CICS START TRANSID('BGND') CHANNEL('MYDATA') END-EXEC
  Pass complex data via channel containers.

RETRIEVE (in Background Task):
  EXEC CICS RETRIEVE INTO(WS-DATA) LENGTH(WS-LEN) END-EXEC
  Background task picks up the data.

Async Patterns:
  1. User submits request → START background task → Respond "Processing"
  2. Background task processes → Writes result to TS queue
  3. User polls or gets notification when done

MQ-Based Async:
  MQPUT to request queue → Separate task/region processes → MQPUT result to reply queue.
  Most robust pattern for cross-system async.

Benefits:
  • User gets fast response (no waiting for slow processing)
  • Background tasks can retry on failure
  • Decouple request from processing

Pro Tip: For long-running operations (reports, batch-like), always use async. Never make users wait more than 3 seconds.`
    },

    { title:"CICS — CICSPlex System Manager", level:"Expert",
      content:`CICSPlex SM manages multiple CICS regions as a single entity.

What It Does:
  • Monitor all CICS regions from one place
  • Route workload across regions
  • Deploy resources to multiple regions at once
  • Set alerts and automation rules

Components:
  CMAS — CICSPlex Management Address Space (manager)
  MAS — Managed Address Space (each CICS region)
  WUI — Web User Interface (browser-based management)

Workload Management:
  Routes transactions to optimal region based on:
  Health, capacity, affinity rules, response time targets.

Resource Management:
  Define resources once → deploy to all regions.
  BAS (Business Application Services) groups related resources.

Monitoring:
  Real-time dashboards: task counts, response times, storage, files.
  Historical data for trend analysis.
  Alerts when thresholds exceeded.

CPSM API:
  Programs can query CICSPlex SM data:
  EXEC CPSM CONNECT / INQUIRE / SET / DISCONNECT

Pro Tip: CICSPlex SM is essential for enterprises with 10+ CICS regions. Know it for systems programmer and architect roles.`
    },

    { title:"CICS — Containers & Document Templates", level:"Intermediate",
      content:`Beyond COMMAREA — modern data passing in CICS.

Containers:
  Named data items within a channel. Any size.
  PUT CONTAINER('CUSTDATA') CHANNEL('MYCHAN') FROM(WS-DATA)
  GET CONTAINER('CUSTDATA') CHANNEL('MYCHAN') INTO(WS-DATA)
  Multiple containers per channel (like named parameters).

Advantages Over COMMAREA:
  • No 32KB limit
  • Multiple named data items
  • Natural fit for web services (each container = one parameter)
  • BIT or CHAR data types

Document Templates:
  EXEC CICS DOCUMENT CREATE DOCTOKEN(WS-TOKEN) END-EXEC
  EXEC CICS DOCUMENT INSERT DOCTOKEN(WS-TOKEN) TEXT(WS-HTML) END-EXEC
  EXEC CICS DOCUMENT RETRIEVE DOCTOKEN(WS-TOKEN) INTO(WS-OUTPUT) END-EXEC
  Build dynamic HTML/XML responses.

Template Symbols:
  Define template: "Hello &NAME;, your balance is &BAL;"
  EXEC CICS DOCUMENT SET DOCTOKEN(WS-TOKEN) SYMBOL('NAME') VALUE('HARI')
  Symbols replaced with values at retrieve time.

Pro Tip: Use containers for program-to-program data. Use document templates for generating dynamic web content.`
    },

    { title:"CICS — Atom Feeds & RSS", level:"Expert",
      content:`CICS can serve Atom/RSS feeds directly from mainframe data.

How It Works:
  CICS serves XML-formatted Atom feeds via HTTP.
  Client (browser, feed reader) requests URL → CICS returns Atom XML.

Setup:
  1. Define ATOMSERVICE resource (maps URL to CICS service)
  2. Create Atom configuration file (XML template)
  3. CICS program provides data → Atom framework formats XML
  4. Client receives standard Atom feed

Use Cases:
  • Expose mainframe data changes as feeds
  • Real-time alerts (new transactions, status changes)
  • Integration with feed aggregators
  • Simple REST-like read access

Why It Matters:
  Low-effort way to expose mainframe data to web consumers.
  No COBOL changes — configuration only.

Modern Alternative:
  REST APIs via CICS Liberty or z/OS Connect are more flexible.
  Atom feeds are niche but useful for publish/subscribe patterns.

Pro Tip: Atom feeds are a lightweight alternative to full REST APIs for read-only data exposure.`
    },

    { title:"CICS — Abend Handling Deep Dive", level:"Intermediate",
      content:`Complete guide to CICS abend codes and recovery.

Common CICS Abends:
  ASRA — Program check (S0C7/S0C4 equivalent). Data exception or addressing error.
  AICA — Runaway task. Infinite loop detected.
  AEY9 — DB2 call failed. DB2 not connected or unavailable.
  AKCS — Deadlock. Two tasks waiting for each other's locks.
  AEIO — File I/O error. File not open, not found, or disabled.
  AEXL — Program not found (XCTL/LINK target missing).
  APCT — Transaction not defined in PCT.
  AFCR — File control error during recovery.

ASRA Debugging:
  1. Check transaction dump (CETR or dump dataset)
  2. Find offset in dump → map to source line
  3. Identify variable causing S0C7/S0C4
  4. Common cause: uninitialized COMP-3, bad subscript

AICA Debugging:
  1. CICS detected loop (exceeded ICVTSD timer)
  2. Check program logic for: missing READ in loop, wrong condition, missing EXIT
  3. CEDF to step through and find the loop

Recovery Options:
  HANDLE ABEND PROGRAM('errpgm') — Run recovery program
  HANDLE ABEND LABEL(err-para) — Jump to paragraph
  HANDLE ABEND CANCEL — Let CICS handle (transaction dump + rollback)

Pro Tip: ASRA is 80% of CICS abends. Debug it exactly like batch S0C7 — check data values at the failing statement.`
    },

    { title:"CICS — Global User Exit (GLUE)", level:"Expert",
      content:`Global User Exits let you customize CICS behavior at system-level intercept points.

What They Are:
  Hook points in CICS processing where your code gets control.
  Written in Assembler (not COBOL).

Common Exit Points:
  XFCREQ — File control request (before file I/O)
  XFCREQE — File control request end (after file I/O)
  XTSEREQ — TS queue request
  XTDEREQ — TD queue request
  XPCREQ — Program control request (before LINK/XCTL)
  XICEREQ — Interval control request

Use Cases:
  • Audit all file access (XFCREQ)
  • Custom security checks
  • Performance monitoring
  • Data masking for sensitive fields
  • Request routing/filtering

Enabling:
  EXEC CICS ENABLE EXIT('MYEXIT') PROGRAM('EXITPGM') START END-EXEC
  Or define in SIT: EXITS=YES

Caution:
  Exits run on EVERY matching request — must be very fast.
  Bugs in exits can crash entire CICS region.

Pro Tip: Global exits are for system programmers, not application programmers. Use only when no other option exists.`
    },

    { title:"CICS — Docker & Cloud Deployment", level:"Expert",
      content:`Modern CICS deployment options beyond traditional z/OS.

CICS TS on z/OS:
  Traditional. Most production CICS runs here.
  z/OS provides: security (RACF), storage (SMS), networking (VTAM/TCP).

CICS Liberty in Containers:
  Java/Liberty components can run in Docker/Kubernetes.
  JCICS apps packaged as container images.
  Deploy to OpenShift on Z or hybrid cloud.

z/OS Cloud Provisioning:
  Provision CICS regions on-demand via z/OSMF.
  Templates define: CICS configuration, DB2 connections, files.
  Self-service portal for developers.

CICS Cloud-Native:
  CICS TS V6 features:
  • Cloud-native APIs
  • JSON/REST native support
  • Enhanced Liberty integration
  • DevOps pipeline support (Git, Jenkins, Maven)

Hybrid Architecture:
  CICS on z/OS (core transactions) + Microservices on cloud (new features)
  Connected via: REST APIs, MQ, Event streaming.

Pro Tip: The future of CICS is hybrid — core COBOL on z/OS, new Java services on cloud, connected via APIs.`
    },

    { title:"CICS — Migration from Macro to RDO", level:"Intermediate",
      content:`Migrating from legacy macro-based resource definitions to modern RDO.

Legacy (Macro) Approach:
  Resources defined as Assembler macros: DFHPCT, DFHPPT, DFHFCT, DFHDCT.
  Assembled into CICS load modules.
  CICS restart needed for changes.

Modern (RDO) Approach:
  Resources defined via CEDA transaction or batch utility DFHCSDUP.
  Stored in CSD (CICS System Definition) file.
  Dynamic install — no CICS restart needed.

Migration Steps:
  1. DFHCSDUP EXTRACT — Export macro definitions to CSD format
  2. Review and organize into groups
  3. CEDA DEFINE — Create RDO equivalents
  4. Test in development CICS
  5. CEDA INSTALL — Make available in CICS
  6. Update GRPLIST in SIT to include new groups
  7. Gradually remove macro definitions

GRPLIST:
  List of groups installed at CICS startup.
  SIT parameter: GRPLIST=MYLIST
  CEDA ADD GROUP(MYGROUP) LIST(MYLIST)

DFHCSDUP Utility:
  Batch utility for CSD management.
  DFHCSDUP DEFINE/ALTER/DELETE/EXTRACT/COPY

Pro Tip: All new shops use RDO exclusively. If your shop still uses macros, advocate for migration — it saves hours of restart time.`
    },



    { title:"CICS — Troubleshooting Checklist", level:"All Levels",
      content:`Systematic approach to diagnosing CICS problems.

Transaction Won't Start:
  1. CEMT INQ TRAN(xxxx) — Is it defined? Enabled?
  2. CEMT INQ PROG(name) — Is the program enabled? Installed?
  3. Check security — Does user have access to transaction?
  4. Check MXT — Has max task limit been reached?

Transaction Abends:
  1. Note the abend code (ASRA, AICA, AEY9, etc.)
  2. Check transaction dump — find offset and failing statement
  3. CEDF to reproduce — step through commands
  4. For ASRA: Check data values (likely S0C7/S0C4)
  5. For AICA: Check for infinite loops
  6. For AEY9: Check DB2 connection (CEMT INQ DB2CONN)

File Problems:
  1. CEMT INQ FILE(name) — Open? Enabled?
  2. If closed: CEMT SET FILE(name) OPEN
  3. If disabled: CEMT SET FILE(name) ENABLED
  4. Check VSAM file: IDCAMS VERIFY, check SHAREOPTIONS

Performance Issues:
  1. CEMT INQ TASK — How many active? Any waiting?
  2. CEMT INQ DSAS — Storage usage near limit?
  3. Check response times in CICS statistics
  4. Look for file splits (LISTCAT on VSAM files)
  5. Check DB2 (EXPLAIN, lock waits)

Program Not Loading New Version:
  CEMT SET PROG(name) NEWCOPY — Forces reload from DFHRPL.

Pro Tip: 90% of CICS problems fall into: abend (check dump), file issue (check CEMT INQ FILE), or performance (check tasks and storage).`
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
