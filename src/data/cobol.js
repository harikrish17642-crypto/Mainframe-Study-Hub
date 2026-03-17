export const COBOL_TOPIC = {
  id:"cobol", icon:"📝", title:"COBOL", subtitle:"Common Business Oriented Language", color:"#ff6b35", level:"Beginner → Expert",
  description:"Powers $3 trillion in daily commerce. 800 billion lines in production. The language that runs the world.",
  sections:[
    { title:"COBOL Fundamentals", level:"Beginner",
      content:`COBOL (Common Business Oriented Language) was designed in 1959 by Grace Hopper and the CODASYL committee. It was created to be readable like English, making it accessible to business users and auditors — not just programmers.

COBOL remains dominant because:
  • 95% of ATM transactions run on COBOL
  • 80% of in-person transactions use COBOL
  • $3 trillion moves through COBOL systems daily
  • 800 billion lines of COBOL code in production
  • 5 billion lines of new COBOL written annually

COBOL Program Structure — Four Divisions:
  1. IDENTIFICATION DIVISION — Identifies the program
  2. ENVIRONMENT DIVISION — Hardware & file assignments
  3. DATA DIVISION — All data structures and variables
  4. PROCEDURE DIVISION — Program logic

Column Rules (Fixed Format):
  Col 1-6:  Sequence number (optional)
  Col 7:    Indicator (* comment, - continuation, / page eject)
  Col 8-11: Area A (divisions, sections, paragraphs, 01/77 levels)
  Col 12-72: Area B (all other statements)
  Col 73-80: Identification (ignored)

COBOL Data Types:
  PIC X(n) — Alphanumeric
  PIC 9(n) — Numeric display (zoned decimal)
  PIC 9(n) COMP-3 — Packed decimal (2 digits/byte)
  PIC 9(n) COMP — Binary integer
  COMP-1 / COMP-2 — Floating point (single/double)`
    },
    { title:"IDENTIFICATION & ENVIRONMENT", level:"Beginner",
      code:`       IDENTIFICATION DIVISION.
       PROGRAM-ID.    PAYROLL.
       AUTHOR.        MAINFRAME-OS-HUB.
       DATE-WRITTEN.  2025-01-15.
       DATE-COMPILED.
      *
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SOURCE-COMPUTER. IBM-Z.
       OBJECT-COMPUTER. IBM-Z.
       SPECIAL-NAMES.
           DECIMAL-POINT IS COMMA.
      *
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT EMPLOYEE-FILE
               ASSIGN TO EMPFILE
               ORGANIZATION IS SEQUENTIAL
               ACCESS MODE IS SEQUENTIAL
               FILE STATUS IS WS-EMP-STATUS.
      *
           SELECT EMPLOYEE-VSAM
               ASSIGN TO EMPVSAM
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS EMP-ID
               ALTERNATE RECORD KEY IS EMP-NAME
                   WITH DUPLICATES
               FILE STATUS IS WS-VSAM-STATUS.`,
      content:`IDENTIFICATION DIVISION:
  Only PROGRAM-ID is required. Others are informational.

ENVIRONMENT DIVISION:
  CONFIGURATION SECTION:
    SPECIAL-NAMES for DECIMAL-POINT IS COMMA, CURRENCY SIGN.

  INPUT-OUTPUT SECTION:
    FILE-CONTROL — Assign logical files to physical DD names.
    SELECT file ASSIGN TO ddname
    ORGANIZATION: SEQUENTIAL, INDEXED, RELATIVE
    ACCESS MODE: SEQUENTIAL, RANDOM, DYNAMIC
    RECORD KEY for INDEXED (VSAM KSDS)
    ALTERNATE RECORD KEY WITH DUPLICATES
    FILE STATUS IS ws-variable (always code this!)

  File Status Codes:
    00 Successful, 02 Duplicate alt key
    10 End of file, 22 Duplicate primary key
    23 Record not found, 35 File not found
    39 Attributes conflict, 41 Already open
    42 Not open, 46 Read after EOF`
    },
    { title:"DATA DIVISION — Working Storage", level:"Beginner",
      code:`       DATA DIVISION.
       WORKING-STORAGE SECTION.
      *
      * --- Simple Variables ---
       01  WS-NAME            PIC X(30).
       01  WS-EMP-ID          PIC 9(06).
       01  WS-SALARY          PIC 9(07)V99 COMP-3.
       01  WS-TAX-RATE        PIC V9(04) VALUE 0.2500.
       01  WS-COUNTER         PIC 9(05) COMP VALUE ZERO.
       01  WS-EOF-FLAG        PIC X(01) VALUE 'N'.
           88 END-OF-FILE               VALUE 'Y'.
           88 NOT-END-OF-FILE           VALUE 'N'.
      *
      * --- Group Item (Record Layout) ---
       01  WS-EMPLOYEE-RECORD.
           05 WS-EMP-ID       PIC 9(06).
           05 WS-EMP-NAME.
              10 WS-FIRST     PIC X(15).
              10 WS-LAST      PIC X(20).
           05 WS-DEPT         PIC X(04).
           05 WS-SALARY       PIC 9(07)V99 COMP-3.
           05 WS-HIRE-DATE.
              10 WS-YEAR      PIC 9(04).
              10 WS-MONTH     PIC 9(02).
              10 WS-DAY       PIC 9(02).
           05 WS-STATUS       PIC X(01).
              88 ACTIVE                 VALUE 'A'.
              88 INACTIVE               VALUE 'I'.
              88 TERMINATED             VALUE 'T'.
      *
      * --- Table (Array) ---
       01  WS-TAX-TABLE.
           05 WS-TAX-ENTRY OCCURS 10 TIMES
                            INDEXED BY WS-IDX.
              10 WS-BRACKET   PIC 9(07)V99.
              10 WS-PERCENT   PIC V9(04).
      *
      * --- Edited Fields ---
       01  WS-EDIT-SALARY    PIC $ZZZ,ZZZ.99.
       01  WS-EDIT-DATE      PIC 9999/99/99.`,
      content:`DATA DIVISION — Where ALL Data Lives:

Level Numbers:
  01 — Record level (group or standalone)
  02-49 — Subordinate items in a group
  66 — RENAMES (alternative grouping)
  77 — Standalone elementary items
  88 — Condition names (booleans)

PIC (Picture) Clause:
  X=alphanumeric, 9=digit, V=implied decimal, S=sign, A=alpha
  PIC X(30) = 30-char text, PIC 9(06) = 6-digit number
  PIC S9(07)V99 COMP-3 = signed packed decimal

USAGE:
  DISPLAY (default), COMP (binary), COMP-3 (packed decimal)
  COMP-1 (float single), COMP-2 (float double)

VALUE Clause:
  Initialize at compile time. VALUE SPACES, ZEROS, HIGH-VALUES.

88-Level Condition Names:
  01 WS-STATUS PIC X. 88 ACTIVE VALUE 'A'.
  In code: IF ACTIVE ... SET ACTIVE TO TRUE

Figurative Constants:
  SPACES, ZEROS, HIGH-VALUES, LOW-VALUES, QUOTES, ALL literal`
    },
    { title:"PROCEDURE DIVISION — Logic", level:"Beginner",
      code:`       PROCEDURE DIVISION.
       0000-MAIN-PARA.
           PERFORM 1000-INITIALIZE
           PERFORM 2000-PROCESS
               UNTIL END-OF-FILE
           PERFORM 3000-FINALIZE
           STOP RUN.
      *
       1000-INITIALIZE.
           OPEN INPUT  EMPLOYEE-FILE
                OUTPUT PAYROLL-REPORT
           READ EMPLOYEE-FILE INTO WS-EMPLOYEE-RECORD
               AT END SET END-OF-FILE TO TRUE
           END-READ.
      *
       2000-PROCESS.
           PERFORM 2100-CALCULATE-PAY
           PERFORM 2200-WRITE-REPORT
           READ EMPLOYEE-FILE INTO WS-EMPLOYEE-RECORD
               AT END SET END-OF-FILE TO TRUE
           END-READ.
      *
       2100-CALCULATE-PAY.
           COMPUTE WS-NET-PAY =
               WS-SALARY * (1 - WS-TAX-RATE)
           ADD 1 TO WS-COUNTER.
      *
       2200-WRITE-REPORT.
           MOVE WS-EMP-NAME TO RPT-NAME
           MOVE WS-NET-PAY  TO RPT-PAY-EDIT
           WRITE REPORT-REC FROM RPT-DETAIL
               AFTER ADVANCING 1 LINE.
      *
       3000-FINALIZE.
           DISPLAY 'RECORDS: ' WS-COUNTER
           CLOSE EMPLOYEE-FILE PAYROLL-REPORT.`,
      content:`PROCEDURE DIVISION — The Program Logic:

PERFORM — Most important verb:
  PERFORM para-name
  PERFORM para-name THRU end-para
  PERFORM para-name n TIMES
  PERFORM para-name UNTIL condition
  PERFORM para-name VARYING counter FROM 1 BY 1 UNTIL...

  Inline: PERFORM UNTIL ... END-PERFORM

Conditional Logic:
  IF condition ... ELSE ... END-IF
  EVALUATE TRUE/variable WHEN ... WHEN OTHER ... END-EVALUATE

Arithmetic:
  ADD a TO b, SUBTRACT a FROM b
  MULTIPLY a BY b, DIVIDE a INTO b
  COMPUTE result = expression
  ON SIZE ERROR ... END-ADD/SUBTRACT/etc.

String Handling:
  MOVE, STRING, UNSTRING, INSPECT
  INSPECT field TALLYING/REPLACING/CONVERTING

File I/O:
  OPEN, READ ... AT END, WRITE, REWRITE, DELETE, CLOSE
  Always check FILE STATUS after each operation.`
    },
    { title:"Sequential File Processing", level:"Beginner",
      code:`       FILE SECTION.
       FD  EMPLOYEE-FILE
           RECORDING MODE IS F
           BLOCK CONTAINS 0 RECORDS
           RECORD CONTAINS 200 CHARACTERS.
       01  EMP-RECORD.
           05 EMP-ID           PIC 9(06).
           05 EMP-NAME         PIC X(35).
           05 EMP-DEPT         PIC X(04).
           05 EMP-SALARY       PIC S9(07)V99 COMP-3.
           05 FILLER           PIC X(150).
      *
       FD  PAYROLL-REPORT
           RECORDING MODE IS F
           RECORD CONTAINS 133 CHARACTERS.
       01  REPORT-RECORD       PIC X(133).
      *
       WORKING-STORAGE SECTION.
       01  WS-EMP-STATUS       PIC XX.
       01  WS-EOF              PIC X VALUE 'N'.
           88 END-OF-FILE             VALUE 'Y'.
      *
       PROCEDURE DIVISION.
           OPEN INPUT  EMPLOYEE-FILE
                OUTPUT PAYROLL-REPORT
           IF WS-EMP-STATUS NOT = '00'
               DISPLAY 'OPEN ERROR: ' WS-EMP-STATUS
               STOP RUN
           END-IF
      *    Priming read
           READ EMPLOYEE-FILE
               AT END SET END-OF-FILE TO TRUE
           END-READ
      *    Process loop
           PERFORM UNTIL END-OF-FILE
               PERFORM PROCESS-EMPLOYEE
               READ EMPLOYEE-FILE
                   AT END SET END-OF-FILE TO TRUE
               END-READ
           END-PERFORM
           CLOSE EMPLOYEE-FILE PAYROLL-REPORT
           STOP RUN.`,
      content:`Sequential File Processing — The Core Pattern:

1. Define file in FILE-CONTROL (SELECT/ASSIGN)
2. Define record layout in FILE SECTION (FD)
3. OPEN the file
4. Priming READ (first read before the loop)
5. PERFORM UNTIL END-OF-FILE
6. CLOSE the file

File Status — ALWAYS check after every I/O:
  IF WS-STATUS NOT = '00'
      DISPLAY 'ERROR: ' WS-STATUS
      PERFORM 9999-ABORT
  END-IF

Common Patterns:
  Read-Process-Write: Copy with transformation
  Match-Merge: Two sorted inputs, compare keys
  Master-Transaction: Apply updates to create new master

FD (File Descriptor):
  RECORDING MODE IS F/V/U
  BLOCK CONTAINS 0 RECORDS (let system determine)
  RECORD CONTAINS nnn CHARACTERS`
    },
    { title:"VSAM File Operations", level:"Intermediate",
      code:`      * RANDOM READ by primary key
           MOVE 100234 TO EMP-ID
           READ EMPLOYEE-VSAM
               INVALID KEY
                   DISPLAY 'NOT FOUND: ' EMP-ID
               NOT INVALID KEY
                   DISPLAY 'FOUND: ' EMP-NAME
           END-READ
      *
      * SEQUENTIAL BROWSE
           READ EMPLOYEE-VSAM NEXT
               AT END SET END-OF-FILE TO TRUE
           END-READ
      *
      * DYNAMIC: Position then browse
           MOVE 100000 TO EMP-ID
           START EMPLOYEE-VSAM
               KEY IS >= EMP-ID
               INVALID KEY DISPLAY 'NO MATCH'
           END-START
           READ EMPLOYEE-VSAM NEXT
               AT END SET END-OF-FILE TO TRUE
           END-READ
      *
      * INSERT new record
           MOVE 999999 TO EMP-ID
           MOVE 'NEW EMPLOYEE' TO EMP-NAME
           WRITE EMP-VSAM-RECORD
               INVALID KEY
                   DISPLAY 'DUPLICATE: ' EMP-ID
           END-WRITE
      *
      * UPDATE existing record
           READ EMPLOYEE-VSAM
           MOVE 'UPDATED' TO EMP-NAME
           REWRITE EMP-VSAM-RECORD
               INVALID KEY DISPLAY 'REWRITE FAIL'
           END-REWRITE
      *
      * DELETE
           MOVE 999999 TO EMP-ID
           DELETE EMPLOYEE-VSAM
               INVALID KEY DISPLAY 'DELETE FAIL'
           END-DELETE`,
      content:`VSAM File Processing in COBOL:

Access Modes:
  SEQUENTIAL — Browse records in key order
  RANDOM — Read/write by key
  DYNAMIC — Both sequential and random

Operations:
  READ file — Random read by primary key
  READ file NEXT — Sequential read (next record)
  WRITE record — Insert new record
  REWRITE record — Update (must READ first)
  DELETE file — Delete by key
  START file KEY IS >= field — Position for browse

Error Handling:
  INVALID KEY — Not found, duplicate, etc.
  AT END — End of file in sequential read
  Always check FILE STATUS for specific error code.

START Command:
  Positions file pointer for subsequent NEXT reads.
  KEY IS = (exact), >= (start from), > (after)
  Used for range queries in DYNAMIC access.`
    },
    { title:"STRING & UNSTRING", level:"Intermediate",
      code:`      * STRING — Concatenate fields
           STRING WS-FIRST-NAME DELIMITED BY SPACES
                  ', '           DELIMITED BY SIZE
                  WS-LAST-NAME  DELIMITED BY SPACES
             INTO WS-FULL-NAME
             WITH POINTER WS-PTR
             ON OVERFLOW
                DISPLAY 'NAME TOO LONG'
           END-STRING
      *
      * UNSTRING — Split delimited string
           UNSTRING WS-CSV-LINE
               DELIMITED BY ','
               INTO WS-FIELD1
                    WS-FIELD2
                    WS-FIELD3
                    WS-FIELD4
               TALLYING IN WS-FIELD-COUNT
               ON OVERFLOW
                   DISPLAY 'TOO MANY FIELDS'
           END-UNSTRING
      *
      * INSPECT — Count and replace
           INSPECT WS-DATA
               TALLYING WS-COUNT
                   FOR ALL 'A'
                   FOR LEADING SPACES
      *
           INSPECT WS-DATA
               REPLACING ALL SPACES BY ZEROS
      *
           INSPECT WS-DATA
               CONVERTING 'abcdefghijklmnopqrstuvwxyz'
                       TO 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      *
      * REFERENCE MODIFICATION
           MOVE WS-NAME(1:5) TO WS-SHORT-NAME
           MOVE WS-DATE(5:2) TO WS-MONTH`,
      content:`String Handling in COBOL:

STRING — Concatenate multiple fields:
  STRING source1 DELIMITED BY delimiter
         source2 DELIMITED BY SIZE
    INTO target
    WITH POINTER pointer-var
    ON OVERFLOW handle-error
  END-STRING

UNSTRING — Split delimited data:
  UNSTRING source DELIMITED BY ','
    INTO field1 field2 field3
    TALLYING IN count-var
  END-UNSTRING

INSPECT — Count, replace, convert:
  TALLYING counter FOR ALL/LEADING/characters
  REPLACING ALL/LEADING/FIRST old BY new
  CONVERTING old-chars TO new-chars

Reference Modification:
  variable(start:length) — substring
  WS-NAME(1:5) = first 5 chars
  WS-DATE(5:2) = 2 chars starting at position 5`
    },
    { title:"Tables & SEARCH", level:"Intermediate",
      code:`      * Table definition
       01  WS-STATE-TABLE.
           05 WS-STATE-DATA.
              10 FILLER PIC X(22) VALUE 'NYNEW YORK       '.
              10 FILLER PIC X(22) VALUE 'CACALIFORNIA     '.
              10 FILLER PIC X(22) VALUE 'TXEXAS           '.
              10 FILLER PIC X(22) VALUE 'FLFLORIDA        '.
              10 FILLER PIC X(22) VALUE 'ILILLINOIS       '.
           05 WS-STATE-ENTRIES REDEFINES WS-STATE-DATA.
              10 WS-STATE-ENTRY OCCURS 5 TIMES
                  INDEXED BY WS-ST-IDX.
                 15 WS-STATE-CODE  PIC X(02).
                 15 WS-STATE-NAME  PIC X(20).
      *
      * SEARCH (linear)
           SET WS-ST-IDX TO 1
           SEARCH WS-STATE-ENTRY
               AT END
                   DISPLAY 'STATE NOT FOUND'
               WHEN WS-STATE-CODE(WS-ST-IDX) =
                    WS-INPUT-STATE
                   DISPLAY 'FOUND: '
                       WS-STATE-NAME(WS-ST-IDX)
           END-SEARCH
      *
      * SEARCH ALL (binary — table must be sorted)
       01  WS-ZIP-TABLE.
           05 WS-ZIP-ENTRY OCCURS 1000 TIMES
              ASCENDING KEY IS WS-ZIP-CODE
              INDEXED BY WS-ZIP-IDX.
              10 WS-ZIP-CODE  PIC 9(05).
              10 WS-ZIP-CITY  PIC X(25).
      *
           SEARCH ALL WS-ZIP-ENTRY
               AT END
                   DISPLAY 'ZIP NOT FOUND'
               WHEN WS-ZIP-CODE(WS-ZIP-IDX) =
                    WS-INPUT-ZIP
                   DISPLAY WS-ZIP-CITY(WS-ZIP-IDX)
           END-SEARCH`,
      content:`Tables (Arrays) in COBOL:

Definition:
  OCCURS n TIMES — fixed size table
  OCCURS min TO max TIMES DEPENDING ON var — variable
  INDEXED BY idx — implicit index variable
  ASCENDING/DESCENDING KEY IS field — for SEARCH ALL

Accessing Elements:
  WS-TABLE(subscript) — 1-based subscript
  WS-TABLE(WS-IDX) — using index

SET Statement:
  SET WS-IDX TO 1 — initialize
  SET WS-IDX UP BY 1 — increment
  SET WS-IDX DOWN BY 1 — decrement

SEARCH (Linear):
  Sequential scan. Requires SET index TO 1 first.
  SEARCH table AT END ... WHEN condition ... END-SEARCH

SEARCH ALL (Binary):
  Binary search on sorted table.
  Must have ASCENDING/DESCENDING KEY.
  No need to SET index — it's automatic.
  Much faster for large tables (O(log n) vs O(n)).

Multi-Dimensional Tables:
  05 WS-ROW OCCURS 12 TIMES.
    10 WS-COL OCCURS 31 TIMES.
      15 WS-VALUE PIC 9(05).
  Access: WS-VALUE(month, day)`
    },
    { title:"COPY & REPLACE", level:"Intermediate",
      content:`Copybooks — Shared Data Definitions:

COPY statement includes external source at compile time.
Copybooks are stored in PDS members referenced by SYSLIB DD.

COPY membername.
COPY membername OF libraryname.
COPY membername REPLACING ==old== BY ==new==.

Why Copybooks:
  • Share record layouts across programs
  • Single source of truth for data definitions
  • Change once, recompile all programs
  • Standard across development team

Common Uses:
  • File record layouts (FD definitions)
  • WORKING-STORAGE common structures
  • DB2 DCLGEN output (table declarations)
  • CICS DFHCOMMAREA layouts
  • Constants and configuration values

REPLACE Statement:
  REPLACE ==:TAG:== BY ==EMPLOYEE==.
  Applies to all subsequent source until next REPLACE OFF.
  More powerful than COPY REPLACING for bulk changes.

DB2 DCLGEN:
  Generates COBOL copybooks from DB2 table definitions.
  Creates both host variable declarations and SQLCA.`,
      code:`      * In the program:
           COPY EMPREC.
      * Compiler inserts content of member EMPREC
      *
      * EMPREC copybook might contain:
      *    05 EMP-ID       PIC 9(06).
      *    05 EMP-NAME     PIC X(35).
      *    05 EMP-SALARY   PIC S9(07)V99 COMP-3.
      *
      * COPY with REPLACING
           COPY EMPREC REPLACING
               ==EMP-== BY ==WS-EMP-==.
      * Result: WS-EMP-ID, WS-EMP-NAME, etc.
      *
      * DB2 DCLGEN copybook (auto-generated):
           EXEC SQL INCLUDE DCLEMP END-EXEC.
      * Generates:
      *    01 DCLEMP.
      *       10 EMP-ID      PIC X(06).
      *       10 EMP-NAME    PIC X(35).
      *       10 EMP-SALARY  PIC S9(07)V99 COMP-3.
      *    01 EMP-NULL-IND.
      *       10 EMP-ID-NI   PIC S9(04) COMP.
      *       10 EMP-NAME-NI PIC S9(04) COMP.
      *       10 EMP-SALARY-NI PIC S9(04) COMP.`
    },
    { title:"EVALUATE (CASE/SWITCH)", level:"Beginner",
      code:`      * EVALUATE TRUE (most common pattern)
           EVALUATE TRUE
               WHEN WS-DEPT = 'FIN'
                   PERFORM PROCESS-FINANCE
               WHEN WS-DEPT = 'HR'
                   PERFORM PROCESS-HR
               WHEN WS-DEPT = 'IT'
                   PERFORM PROCESS-IT
               WHEN OTHER
                   PERFORM PROCESS-DEFAULT
           END-EVALUATE
      *
      * EVALUATE variable
           EVALUATE WS-TRANSACTION-CODE
               WHEN 'A' PERFORM ADD-RECORD
               WHEN 'C' PERFORM CHANGE-RECORD
               WHEN 'D' PERFORM DELETE-RECORD
               WHEN OTHER
                   DISPLAY 'INVALID CODE: '
                       WS-TRANSACTION-CODE
           END-EVALUATE
      *
      * EVALUATE with ranges
           EVALUATE TRUE
               WHEN WS-SCORE >= 90
                   MOVE 'A' TO WS-GRADE
               WHEN WS-SCORE >= 80
                   MOVE 'B' TO WS-GRADE
               WHEN WS-SCORE >= 70
                   MOVE 'C' TO WS-GRADE
               WHEN WS-SCORE >= 60
                   MOVE 'D' TO WS-GRADE
               WHEN OTHER
                   MOVE 'F' TO WS-GRADE
           END-EVALUATE
      *
      * EVALUATE with ALSO (multiple conditions)
           EVALUATE WS-GENDER ALSO WS-AGE-GROUP
               WHEN 'M' ALSO 'SENIOR'
                   ADD 1 TO WS-MALE-SENIOR
               WHEN 'F' ALSO 'SENIOR'
                   ADD 1 TO WS-FEMALE-SENIOR
               WHEN ANY ALSO 'JUNIOR'
                   ADD 1 TO WS-JUNIOR-COUNT
           END-EVALUATE`,
      content:`EVALUATE — COBOL's Powerful Switch/Case:

Much more powerful than IF/ELSE for multi-way branching.

Forms:
  EVALUATE TRUE — test multiple conditions
  EVALUATE variable — match against values
  EVALUATE var1 ALSO var2 — test combinations

Special Values:
  OTHER — default case (like ELSE)
  ANY — matches any value in ALSO
  TRUE/FALSE — boolean match
  value THRU value — range match

EVALUATE is cleaner than nested IF:
  Instead of IF A ... ELSE IF B ... ELSE IF C ...
  Use EVALUATE TRUE WHEN A ... WHEN B ... WHEN C ...

Performance:
  Compiler may optimize EVALUATE into a branch table.
  Generally as fast as or faster than nested IF.`
    },
    { title:"Embedded SQL (DB2)", level:"Intermediate",
      code:`       WORKING-STORAGE SECTION.
           EXEC SQL INCLUDE SQLCA END-EXEC.
           EXEC SQL INCLUDE DCLEMP END-EXEC.
       01  WS-SQLCODE       PIC S9(09) COMP.
      *
       PROCEDURE DIVISION.
      * Single-row SELECT
           EXEC SQL
               SELECT EMP_NAME, EMP_SALARY
                 INTO :EMP-NAME, :EMP-SALARY
                 FROM EMPLOYEE
                WHERE EMP_ID = :WS-EMP-ID
           END-EXEC
           MOVE SQLCODE TO WS-SQLCODE
           EVALUATE WS-SQLCODE
               WHEN 0    CONTINUE
               WHEN 100  DISPLAY 'NOT FOUND'
               WHEN OTHER
                   DISPLAY 'SQL ERROR: ' WS-SQLCODE
           END-EVALUATE
      *
      * CURSOR for multiple rows
           EXEC SQL
               DECLARE EMP-CURSOR CURSOR FOR
               SELECT EMP_ID, EMP_NAME, EMP_SALARY
                 FROM EMPLOYEE
                WHERE EMP_DEPT = :WS-DEPT
                ORDER BY EMP_NAME
           END-EXEC
      *
           EXEC SQL OPEN EMP-CURSOR END-EXEC
           PERFORM UNTIL SQLCODE NOT = 0
               EXEC SQL
                   FETCH EMP-CURSOR
                    INTO :EMP-ID, :EMP-NAME,
                         :EMP-SALARY
               END-EXEC
               IF SQLCODE = 0
                   PERFORM PROCESS-ROW
               END-IF
           END-PERFORM
           EXEC SQL CLOSE EMP-CURSOR END-EXEC
      *
      * INSERT
           EXEC SQL
               INSERT INTO EMPLOYEE
                   (EMP_ID, EMP_NAME, EMP_SALARY)
               VALUES (:WS-EMP-ID, :WS-EMP-NAME,
                       :WS-EMP-SALARY)
           END-EXEC
      *
      * UPDATE
           EXEC SQL
               UPDATE EMPLOYEE
                  SET EMP_SALARY = :WS-NEW-SALARY
                WHERE EMP_ID = :WS-EMP-ID
           END-EXEC`,
      content:`Embedded SQL — COBOL-DB2 Programming:

Embedding SQL in COBOL requires:
  EXEC SQL ... END-EXEC wrapper
  INCLUDE SQLCA for return codes
  DCLGEN copybooks for table declarations
  Host variables prefixed with : in SQL

SQLCODE Values:
  0    — Successful
  100  — Not found / no more rows
  -803 — Duplicate key on insert
  -811 — Multiple rows returned (expected one)
  -904 — Resource unavailable
  -911 — Deadlock or timeout (rollback occurred)

Cursors for Multi-Row Processing:
  DECLARE CURSOR — define the query
  OPEN — execute the query
  FETCH — get next row
  CLOSE — release resources

WITH HOLD — Keep cursor open across COMMIT.

Null Indicators:
  :host-var :null-indicator
  If indicator < 0, the column value is NULL.`
    },
    { title:"CICS Programming in COBOL", level:"Advanced",
      code:`      * CICS SEND MAP (display screen)
           EXEC CICS SEND MAP('EMPMAP')
               MAPSET('EMPMAPS')
               FROM(EMPMPO)
               ERASE
           END-EXEC
      *
      * CICS RECEIVE MAP (get user input)
           EXEC CICS RECEIVE MAP('EMPMAP')
               MAPSET('EMPMAPS')
               INTO(EMPMPI)
           END-EXEC
      *
      * CICS READ (VSAM random read)
           EXEC CICS READ
               DATASET('EMPFILE')
               INTO(WS-EMP-RECORD)
               RIDFLD(WS-EMP-ID)
               KEYLENGTH(6)
               RESP(WS-RESP)
           END-EXEC
           EVALUATE WS-RESP
               WHEN DFHRESP(NORMAL) CONTINUE
               WHEN DFHRESP(NOTFND)
                   MOVE 'NOT FOUND' TO WS-MSG
               WHEN OTHER
                   MOVE 'READ ERROR' TO WS-MSG
           END-EVALUATE
      *
      * CICS WRITE (insert)
           EXEC CICS WRITE
               DATASET('EMPFILE')
               FROM(WS-EMP-RECORD)
               RIDFLD(WS-EMP-ID)
               KEYLENGTH(6)
               RESP(WS-RESP)
           END-EXEC
      *
      * CICS LINK (call another program)
           EXEC CICS LINK
               PROGRAM('SUBPROG')
               COMMAREA(WS-COMMAREA)
               LENGTH(WS-COMM-LEN)
           END-EXEC`,
      content:`CICS Programming — Online Transactions:

CICS programs handle real-time user interactions (screens).
All CICS commands: EXEC CICS ... END-EXEC.

Screen I/O (BMS Maps):
  SEND MAP — display screen to terminal
  RECEIVE MAP — get user input from screen

File I/O:
  READ — random read by key
  WRITE — insert new record
  REWRITE — update (after READ UPDATE)
  DELETE — delete by key
  STARTBR/READNEXT/READPREV/ENDBR — browse

Program Control:
  LINK — call subprogram (returns)
  XCTL — transfer control (no return)
  RETURN — return to CICS or caller
  RETURN TRANSID — pseudo-conversational return

COMMAREA:
  Communication area passed between programs/transactions.
  DFHCOMMAREA in LINKAGE SECTION.
  Maximum 32KB in standard CICS.

RESP/RESP2:
  Error handling. DFHRESP(NORMAL), DFHRESP(NOTFND).

Temporary Storage:
  WRITEQ TS / READQ TS — named queues in memory.`
    },
    { title:"Subprograms & CALL", level:"Intermediate",
      code:`      * STATIC CALL (linked at compile time)
           CALL 'CALCTAX' USING WS-SALARY
                                WS-TAX-RATE
                                WS-TAX-AMOUNT
      *
      * DYNAMIC CALL (loaded at runtime)
           MOVE 'CALCTAX' TO WS-PROG-NAME
           CALL WS-PROG-NAME USING WS-SALARY
                                   WS-TAX-RATE
                                   WS-TAX-AMOUNT
           IF RETURN-CODE NOT = 0
               DISPLAY 'CALCTAX FAILED RC='
                   RETURN-CODE
           END-IF
           CANCEL WS-PROG-NAME
      *
      * Called program (CALCTAX):
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CALCTAX.
       DATA DIVISION.
       LINKAGE SECTION.
       01  LS-SALARY      PIC S9(07)V99 COMP-3.
       01  LS-TAX-RATE    PIC V9(04).
       01  LS-TAX-AMOUNT  PIC S9(07)V99 COMP-3.
      *
       PROCEDURE DIVISION USING LS-SALARY
                                LS-TAX-RATE
                                LS-TAX-AMOUNT.
           COMPUTE LS-TAX-AMOUNT =
               LS-SALARY * LS-TAX-RATE
           GOBACK.`,
      content:`Subprograms — Modular COBOL:

CALL Statement:
  CALL 'PROGNAME' USING param1 param2 ...
  Static: CALL 'literal' — linked at bind time
  Dynamic: CALL variable — loaded at runtime

  BY REFERENCE (default) — caller sees changes
  BY CONTENT — copy passed, caller doesn't see changes
  BY VALUE — for C-compatible calls

Called Program:
  LINKAGE SECTION defines received parameters
  PROCEDURE DIVISION USING param1 param2 ...
  GOBACK to return to caller

CANCEL:
  CANCEL 'PROGNAME' — unload dynamically loaded program

RETURN-CODE:
  Special register set by called program.
  Check after CALL for success/failure.

Nested Programs:
  Programs defined inside other programs.
  PROGRAM-ID. INNER IS COMMON.
  Scope: inner programs access outer data.`
    },
    { title:"Report Writing", level:"Intermediate",
      content:`Generating Reports in COBOL:

Report Structure:
  Page Header — Title, date, page number (every page)
  Column Headers — Field labels
  Detail Lines — Actual data
  Control Break Totals — Subtotals when grouping changes
  Grand Totals — Final summary
  Page Footer — Optional footer

ASA Print Control (RECFM=FBA):
  Column 1 is the carriage control character:
  ' ' (space) — Single space before print
  '0' — Double space before print
  '-' — Triple space before print
  '1' — Skip to new page
  '+' — Suppress spacing (overprint)

  WRITE REPORT-LINE AFTER ADVANCING 1 LINE
  WRITE REPORT-LINE AFTER ADVANCING PAGE

Control Break Logic:
  When a group key changes:
  1. Print subtotal for previous group
  2. Reset accumulators
  3. Print new group header
  4. Process current record

Page Overflow:
  Track line count. When near page size:
  1. Print page footer
  2. Advance to new page
  3. Print page header
  4. Reset line counter`,
      code:`       01  WS-LINE-COUNT    PIC 99 VALUE 0.
       01  WS-PAGE-COUNT    PIC 999 VALUE 0.
       01  WS-PAGE-SIZE     PIC 99 VALUE 60.
       01  RPT-HEADER.
           05 FILLER         PIC X     VALUE '1'.
           05 FILLER         PIC X(50)
              VALUE 'PAYROLL REPORT'.
           05 FILLER         PIC X(20)
              VALUE '           PAGE: '.
           05 RPT-PAGE-NO    PIC ZZ9.
       01  RPT-COL-HDR.
           05 FILLER         PIC X     VALUE '0'.
           05 FILLER         PIC X(06) VALUE 'EMP-ID'.
           05 FILLER         PIC X(03) VALUE SPACES.
           05 FILLER         PIC X(30) VALUE 'NAME'.
           05 FILLER         PIC X(15)
              VALUE '        SALARY'.
       01  RPT-DETAIL.
           05 FILLER         PIC X     VALUE ' '.
           05 RPT-EMP-ID     PIC 9(06).
           05 FILLER         PIC X(03) VALUE SPACES.
           05 RPT-NAME       PIC X(30).
           05 RPT-SALARY     PIC $ZZZ,ZZZ.99.
      *
       PRINT-HEADER.
           ADD 1 TO WS-PAGE-COUNT
           MOVE WS-PAGE-COUNT TO RPT-PAGE-NO
           WRITE REPORT-RECORD FROM RPT-HEADER
           WRITE REPORT-RECORD FROM RPT-COL-HDR
           MOVE 3 TO WS-LINE-COUNT.
      *
       WRITE-DETAIL.
           IF WS-LINE-COUNT >= WS-PAGE-SIZE
               PERFORM PRINT-HEADER
           END-IF
           MOVE EMP-ID     TO RPT-EMP-ID
           MOVE EMP-NAME   TO RPT-NAME
           MOVE EMP-SALARY TO RPT-SALARY
           WRITE REPORT-RECORD FROM RPT-DETAIL
           ADD 1 TO WS-LINE-COUNT.`
    },
    { title:"Error Handling & Debugging", level:"Intermediate",
      content:`Error Handling Best Practices:

1. Always Check File Status:
   After EVERY file operation (OPEN, READ, WRITE, CLOSE).
   Don't just check AT END — check the status code.

2. Always Check SQLCODE:
   After every EXEC SQL statement.
   0=OK, 100=not found, negative=error.

3. Use EVALUATE for Error Routing:
   EVALUATE SQLCODE/FILE-STATUS to handle specific errors.

4. Defensive Programming:
   Validate all input data before processing.
   Check for zeros before DIVIDE.
   Check field lengths before STRING/UNSTRING.
   Initialize all variables at program start.

5. DISPLAY for Debugging:
   DISPLAY 'STEP: ' WS-STEP ' VALUE: ' WS-VALUE
   Goes to SYSOUT DD in JCL.

6. Compiler Options for Debugging:
   SSRANGE — runtime subscript range checking
   FLOW — trace paragraph execution
   TEST — generate debug info (for Debug Tool)
   LIST/MAP/XREF — compile listing cross-references

7. Language Environment (LE) Options:
   TRAP(ON) — trap abends for handling
   STORAGE(00) — initialize storage to zeros
   CHECK(ON) — additional runtime checks

Common Debugging Techniques:
  • Add DISPLAY statements at paragraph entry/exit
  • Display key variables before calculations
  • Check return codes after EVERY call
  • Use SSRANGE to catch array overflows
  • Check compiler listing for warnings`
    },
    { title:"Performance & Best Practices", level:"Advanced",
      content:`COBOL Performance Optimization:

Data Definition:
  Use COMP-3 for calculations (packed decimal)
  Use COMP for subscripts and counters
  Align COMP on fullword boundaries (level 01 or 05)
  Avoid unnecessary MOVEs — use qualified names
  Minimize data conversions between COMP types

File I/O:
  Use BLOCK CONTAINS 0 (let system optimize)
  Read/write full blocks, not single records
  Minimize OPEN/CLOSE operations
  Use VSAM LSR (Local Shared Resources) for random access
  Buffer sufficiently (BUFNI/BUFND)

Program Logic:
  Use EVALUATE instead of nested IF
  Use SEARCH ALL instead of SEARCH for large tables
  Minimize PERFORMs — inline small logic
  Avoid GO TO (except GO TO para-EXIT)
  Use inline PERFORM for tight loops

DB2 Performance:
  Use WHERE clauses to minimize data retrieved
  Index your query predicates
  Use FETCH with rowset for bulk reads
  COMMIT periodically in batch (avoid long-running units)
  Use BIND options REOPT(ALWAYS) for variable predicates

Coding Standards:
  • Meaningful paragraph names (verb-noun format)
  • Consistent naming: WS- for working storage, LS- for linkage
  • One statement per line
  • Comment every paragraph purpose
  • Handle ALL error conditions
  • Initialize all working storage variables
  • Use 88-levels for flag/status testing
  • Use copybooks for shared definitions`
    },
    { title:"Interview Questions", level:"All Levels",
      content:`COBOL Interview Questions — 40+ Q&A organized by level.

=== BEGINNER ===

Q: What is COBOL?
A: Common Business Oriented Language — English-like programming language created in 1959, processing 95% of ATM transactions and $3 trillion daily.

Q: What are the four COBOL divisions?
A: IDENTIFICATION (program name), ENVIRONMENT (hardware/file mapping), DATA (variables/files), PROCEDURE (business logic).

Q: What is the difference between Area A and Area B?
A: Area A (columns 8-11): Division/Section/Paragraph headers, 01/77 level numbers, FD entries. Area B (columns 12-72): All other statements, subordinate data items.

Q: What is WORKING-STORAGE SECTION?
A: Contains variables that persist throughout program execution. Declared in DATA DIVISION. Most program variables live here.

Q: What is a PICTURE (PIC) clause?
A: Defines data format. X=alphanumeric, 9=numeric, A=alphabetic, S=signed, V=implied decimal, Z=zero-suppress. PIC 9(5)V99 = 5 digits with 2 decimal places.

Q: What is the difference between PIC 9 and PIC X?
A: PIC 9 is numeric only (0-9), used for calculations. PIC X is alphanumeric (any character), used for text.

Q: What does MOVE do?
A: Copies data from source to destination. MOVE 'HELLO' TO WS-NAME. Truncation/padding occurs if sizes differ.

Q: What is PERFORM?
A: Executes a paragraph or section. PERFORM para-name. PERFORM para THRU para-exit. PERFORM para N TIMES. PERFORM para UNTIL condition.

Q: What does STOP RUN do?
A: Terminates program execution and returns control to the operating system. Sets return code.

Q: What is a level number?
A: Defines data hierarchy. 01=record, 02-49=subordinate fields, 77=standalone, 88=condition name, 66=RENAMES.

Q: What is COMP-3?
A: Packed decimal storage. Each byte holds 2 digits plus sign nibble. PIC S9(5) COMP-3 uses 3 bytes. Most efficient for business calculations.

=== INTERMEDIATE ===

Q: Difference between COMP, COMP-1, COMP-2, COMP-3?
A: COMP=binary, COMP-1=single-precision float, COMP-2=double-precision float, COMP-3=packed decimal. For money, always use COMP-3.

Q: What is EVALUATE?
A: COBOL's CASE/SWITCH statement. EVALUATE TRUE / WHEN condition / WHEN OTHER / END-EVALUATE. Cleaner than nested IF.

Q: What is STRING and UNSTRING?
A: STRING concatenates fields with delimiters. UNSTRING splits a delimited string into fields. Both use POINTER and TALLYING for control.

Q: What is a COPY statement?
A: Includes a copybook (shared code) from a library. COPY CUSTCOPY. COPY CUSTCOPY REPLACING ==:TAG:== BY ==CUST==. Essential for standardization.

Q: Explain COBOL file handling.
A: SELECT (map logical to physical) → FD (describe record) → OPEN → READ/WRITE → CLOSE. File status (2 bytes) checked after every I/O.

Q: What is FILE STATUS?
A: 2-byte code set after every file I/O. 00=success, 10=end-of-file, 35=file not found, 22=duplicate key, 23=record not found. Always check it.

Q: What is an 88-level?
A: Condition name. Defines meaningful values for a field. 88 MALE VALUE 'M'. Used in IF: IF MALE instead of IF GENDER = 'M'.

Q: What is SEARCH and SEARCH ALL?
A: SEARCH=sequential table lookup (SET index, WHEN condition). SEARCH ALL=binary search (table must be sorted, uses KEY IS).

Q: What is REFERENCE MODIFICATION?
A: Substring extraction. WS-FIELD(start:length). WS-NAME(1:5) extracts first 5 characters. 1-based indexing.

Q: Explain PERFORM VARYING.
A: Loop with counter. PERFORM para VARYING WS-I FROM 1 BY 1 UNTIL WS-I > 10. Equivalent to a FOR loop.

Q: What is REDEFINES?
A: Allows two data definitions to share the same memory. 01 WS-DATE PIC X(8). 01 WS-DATE-R REDEFINES WS-DATE. Useful for interpreting data differently.

Q: What are CALL and its types?
A: CALL 'program' USING params. Static CALL=linked at compile, Dynamic CALL=loaded at runtime. CANCEL releases dynamically loaded program.

Q: What is the RETURN-CODE special register?
A: Sets the program's return code visible to JCL. MOVE 0 TO RETURN-CODE (success). MOVE 8 TO RETURN-CODE (error).

=== ADVANCED ===

Q: How do you handle S0C7 in COBOL?
A: S0C7 = non-numeric data in numeric field. Fix: INITIALIZE all working storage, validate input with IF NUMERIC test, check REDEFINES alignment, inspect data with DISPLAY.

Q: How does COBOL interact with DB2?
A: EXEC SQL ... END-EXEC blocks. Include SQLCA for return codes. SQLCODE=0 success, 100=not found, negative=error. Compile with DB2 precompiler or integrated coprocessor.

Q: What is CURSOR in DB2 COBOL?
A: Handles multi-row results. DECLARE CURSOR → OPEN → FETCH (in loop until SQLCODE=100) → CLOSE. Like a pointer through result set.

Q: Explain COBOL-CICS interaction.
A: Programs are pseudo-conversational. EXEC CICS SEND MAP / RECEIVE MAP / RETURN TRANSID. BMS maps define screens. COMMAREA passes data between pseudo-conversations.

Q: What is ON SIZE ERROR?
A: Traps arithmetic overflow. ADD A TO B ON SIZE ERROR PERFORM ERROR-RTN. Without it, truncation happens silently.

Q: How do you optimize COBOL performance?
A: Use COMP-3 for calculations, binary subscripts for tables, SEARCH ALL for large tables, minimize I/O operations, use SORT USING instead of manual sorting, avoid unnecessary MOVEs.

Q: What is INITIALIZE?
A: Sets all fields to default values. INITIALIZE WS-RECORD sets alphanumeric to spaces, numeric to zeros. INITIALIZE...REPLACING allows custom defaults.

💡 Study Tip: Master COMP-3, FILE STATUS, EVALUATE, COPY, and DB2 interaction — these cover 80% of interview questions.`,
    },

    { title:"COBOL Cheat Sheet", level:"All Levels",
      content:`COBOL Quick Reference — Cheat Sheet

═══ PROGRAM STRUCTURE ═══
IDENTIFICATION DIVISION.
PROGRAM-ID. program-name.
ENVIRONMENT DIVISION.
INPUT-OUTPUT SECTION.
FILE-CONTROL.
  SELECT file ASSIGN TO ddname FILE STATUS IS ws-fs.
DATA DIVISION.
FILE SECTION.
  FD file. 01 record PIC X(100).
WORKING-STORAGE SECTION.
  01 WS-VAR PIC X(10) VALUE SPACES.
PROCEDURE DIVISION.
  PERFORM main-logic STOP RUN.

═══ PICTURE CLAUSE ═══
X — Alphanumeric    9 — Numeric    A — Alphabetic
S — Sign            V — Implied decimal
Z — Zero suppress   , . — Insertion
PIC X(10) — 10-char string
PIC 9(5)V99 — 5.2 numeric
PIC S9(7) COMP-3 — Packed decimal

═══ DATA LEVELS ═══
01    — Record level / standalone
02-49 — Subordinate fields
66    — RENAMES
77    — Standalone (non-group)
88    — Condition name (boolean)

═══ COMP TYPES ═══
COMP   — Binary (2/4/8 bytes)
COMP-1 — Single float (4 bytes)
COMP-2 — Double float (8 bytes)
COMP-3 — Packed decimal (most used)

═══ KEY VERBS ═══
MOVE src TO dest       — Copy data
COMPUTE x = expr       — Arithmetic
ADD/SUBTRACT/MULTIPLY/DIVIDE — Math
IF/EVALUATE/PERFORM    — Control flow
STRING/UNSTRING        — String ops
INSPECT TALLYING/REPLACING — Scan/replace
OPEN/READ/WRITE/CLOSE  — File I/O
CALL 'prog' USING args — Subprogram
DISPLAY/ACCEPT         — Screen I/O

═══ FILE I/O PATTERN ═══
OPEN INPUT file-name
PERFORM UNTIL WS-EOF = 'Y'
  READ file INTO ws-rec
    AT END MOVE 'Y' TO WS-EOF
    NOT AT END PERFORM process-rec
  END-READ
END-PERFORM
CLOSE file-name

═══ FILE STATUS CODES ═══
00 — Success          10 — End of file
22 — Duplicate key    23 — Record not found
35 — File not found   39 — File attribute conflict

═══ DB2 PATTERN ═══
EXEC SQL
  SELECT col INTO :ws-var FROM table WHERE key = :ws-key
END-EXEC
IF SQLCODE = 0 ... (success)
IF SQLCODE = 100 ... (not found)
IF SQLCODE < 0 ... (error)

═══ COMMON ABENDS ═══
S0C7 — Non-numeric in numeric field
S0C4 — Addressing/subscript error
S0C1 — Invalid operation
S322 — CPU time exceeded`,
    },
  ]
};
