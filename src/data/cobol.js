export const COBOL_TOPIC = {
  id:"cobol", icon:"📝", title:"COBOL", subtitle:"Common Business Oriented Language", color:"#ff6b35", level:"Beginner → Expert",
  description:"Powers $3 trillion in daily commerce. 220 billion lines in production. The language that runs the world.",
  sections:[
    { title:"What is COBOL?", level:"Beginner",
      content:`COBOL (Common Business Oriented Language) is the world's most-used business programming language. Created in 1959 by a committee including Grace Hopper, it processes $3 trillion in daily commerce.

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

💡 Interview Tip: Know why COBOL survives — cost of replacement, billions of lines, proven reliability.`,
      code:`       IDENTIFICATION DIVISION.
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
           STOP RUN.`
    },

    { title:"IDENTIFICATION DIVISION", level:"Beginner",
      content:`The first division. Identifies the program. Only PROGRAM-ID is required.

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

💡 Pro Tip: Only PROGRAM-ID matters to the compiler. Others are documentation.`,
      code:`       IDENTIFICATION DIVISION.
       PROGRAM-ID. PAYCALC.
       AUTHOR. HARIKRISHNAN K.
       DATE-WRITTEN. 2026-03-16.
       DATE-COMPILED.`
    },

    { title:"ENVIRONMENT DIVISION", level:"Beginner",
      content:`Maps the program to its runtime environment. Two sections: CONFIGURATION and INPUT-OUTPUT.

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

💡 Interview Tip: Always code FILE STATUS. Check it after every I/O operation.`,
      code:`       ENVIRONMENT DIVISION.
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
               FILE STATUS IS WS-RPT-FS.`
    },

    { title:"DATA DIVISION Overview", level:"Beginner",
      content:`The DATA DIVISION declares all data — files, variables, constants, parameters. Four sections:

FILE SECTION:
  Describes record layouts for files defined in SELECT statements.
  FD (File Description) → 01 record → subordinate fields.

WORKING-STORAGE SECTION:
  Variables that persist throughout program execution. Most program variables live here.

LOCAL-STORAGE SECTION:
  Variables reinitialized each time the program is called. Used in called subprograms.

LINKAGE SECTION:
  Variables passed from calling program via CALL...USING. Also receives JCL PARM data.

💡 Pro Tip: WORKING-STORAGE is initialized once (at load). LOCAL-STORAGE reinitializes on every CALL.`,
      code:`       DATA DIVISION.
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
           05  LS-PARM-DATA     PIC X(100).`
    },

    { title:"PIC Clause — Defining Data", level:"Beginner",
      content:`PICTURE (PIC) clause defines a field's type, size, and format.

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

💡 Interview Favorite: "What's PIC S9(5)V99 COMP-3?" Answer: "Signed 5.2 packed decimal, stores 7 digits + sign in 4 bytes. Used for financial calculations." `,
      code:`       01  WS-EXAMPLES.
           05  WS-NAME          PIC X(30).
           05  WS-AGE           PIC 99.
           05  WS-SALARY        PIC S9(7)V99 COMP-3.
           05  WS-COUNT         PIC S9(4) COMP.
           05  WS-RATE          PIC 9V9(4).
           05  WS-EDITED-SAL    PIC $ZZZ,ZZ9.99.
           05  WS-DATE-DISP     PIC 9(4)/99/99.`
    },

    { title:"Level Numbers & Data Hierarchy", level:"Beginner",
      content:`Level numbers define the structure of data — parent-child relationships.

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

💡 Pro Tip: Use 05, 10, 15 increments — leaves room for inserting levels later.`,
      code:`       01  EMPLOYEE-RECORD.
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
       77  WS-COUNTER             PIC S9(4) COMP VALUE 0.`
    },

    { title:"COMP Types — Storage Formats", level:"Beginner",
      content:`USAGE clause controls how data is stored in memory. Critical for performance and storage.

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

💡 Interview Tip: "For money, always COMP-3. For subscripts/counters, always COMP." `,
      code:`       01  WS-STORAGE-EXAMPLES.
      *    DISPLAY — 5 bytes
           05  WS-DISP        PIC 9(5).
      *    COMP (binary) — 2 bytes
           05  WS-BINARY      PIC S9(4) COMP.
      *    COMP-3 (packed) — 4 bytes
           05  WS-PACKED      PIC S9(5)V99 COMP-3.
      *    COMP-1 (float) — 4 bytes
           05  WS-FLOAT       COMP-1.
      *    COMP-2 (double) — 8 bytes
           05  WS-DOUBLE      COMP-2.`
    },

    { title:"MOVE Statement", level:"Beginner",
      content:`MOVE copies data from source to destination. The most-used COBOL statement.

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

💡 Common Mistake: MOVE numeric-display TO comp-3 field when source has spaces → S0C7.`,
      code:`           MOVE 'HARIKRISHNAN' TO WS-NAME
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
      *    Result: 'HELLO' (truncated)`
    },

    { title:"Arithmetic Statements", level:"Beginner",
      content:`COBOL provides English-like arithmetic. All support ON SIZE ERROR for overflow detection.

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

💡 Pro Tip: Use COMPUTE for complex math. It's cleaner than chained ADD/SUBTRACT.`,
      code:`           ADD WS-AMOUNT TO WS-TOTAL
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
           END-COMPUTE`
    },

    { title:"IF/ELSE Conditional Logic", level:"Beginner",
      content:`IF tests conditions and branches logic accordingly.

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

💡 Pro Tip: Always use END-IF (not periods) to terminate IF blocks. Periods end ALL nested IFs.`,
      code:`           IF WS-BALANCE > 1000
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
           END-IF`
    },

    { title:"PERFORM Statement", level:"Beginner",
      content:`PERFORM is COBOL's loop and subroutine mechanism. Most important control statement.

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

💡 Interview Tip: Know the difference between PERFORM UNTIL (test before) and PERFORM WITH TEST AFTER (test after).`,
      code:`       PROCEDURE DIVISION.
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
           DISPLAY 'RECORDS: ' WS-COUNT.`
    },

    { title:"EVALUATE (Switch/Case)", level:"Beginner",
      content:`EVALUATE replaces nested IF statements. Like switch/case in other languages.

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

💡 Pro Tip: Always prefer EVALUATE over nested IF. It's cleaner and easier to maintain.`,
      code:`           EVALUATE TRUE
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
           END-EVALUATE`
    },

    { title:"DISPLAY & ACCEPT", level:"Beginner",
      content:`DISPLAY writes to SYSOUT (or terminal). ACCEPT reads from SYSIN (or terminal).

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

💡 Pro Tip: Use DISPLAY liberally during development. Add variable dumps before S0C7-prone code. Remove (or use compiler directives) for production.`,
      code:`           DISPLAY '*** PROGRAM STARTED ***'
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
           DISPLAY '*** PROGRAM ENDED RC=0 ***'`
    },

    { title:"Sequential File Processing", level:"Beginner",
      content:`Most COBOL programs process sequential files — read input, process, write output.

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

💡 Interview Tip: The read-process-write loop is in every COBOL interview. Know it by heart.`,
      code:`       PROCEDURE DIVISION.
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
           PERFORM READ-INPUT.`
    },

    { title:"STRING & UNSTRING", level:"Intermediate",
      content:`STRING concatenates multiple fields. UNSTRING splits a delimited string.

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

💡 Pro Tip: UNSTRING with TALLYING tells you how many fields were found — great for validation.`,
      code:`      *    STRING — Build full name:
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
           END-UNSTRING`
    },

    { title:"INSPECT (Tallying & Replacing)", level:"Intermediate",
      content:`INSPECT scans a field and counts or replaces characters.

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

💡 Pro Tip: INSPECT CONVERTING is the fastest way to do case conversion in COBOL.`,
      code:`      *    Count spaces in a field:
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
               REPLACING LEADING '0' BY ' '`
    },

    { title:"Reference Modification", level:"Intermediate",
      content:`Extract a substring from any field using position and length.

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

💡 Pro Tip: Reference modification is faster than UNSTRING for fixed-position data.`,
      code:`      *    Extract parts of a date (YYYYMMDD):
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
           END-IF`
    },

    { title:"Tables & OCCURS", level:"Intermediate",
      content:`Tables (arrays) use the OCCURS clause. Critical for batch processing.

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

💡 Pro Tip: Always use COMP subscripts. DISPLAY subscripts cause a conversion on every access.`,
      code:`       01  WS-DEPT-TABLE.
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
           END-PERFORM`
    },

    { title:"SEARCH & SEARCH ALL", level:"Intermediate",
      content:`SEARCH looks up values in tables. Two types: sequential and binary.

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

💡 Interview Tip: "When do you use SEARCH vs SEARCH ALL?" Answer: "SEARCH for small/unsorted tables, SEARCH ALL for large sorted tables. SEARCH ALL requires KEY IS clause." `,
      code:`      *    Sequential SEARCH:
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
           END-SEARCH`
    },

    { title:"COPY & REPLACE", level:"Intermediate",
      content:`COPY includes a copybook from a library. Essential for standardization.

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

💡 Pro Tip: Every DB2 table should have a DCLGEN copybook. Every file layout should be in a copybook.`,
      code:`      *    In the program:
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
           EXEC SQL INCLUDE DCUSTMER END-EXEC`
    },

    { title:"REDEFINES", level:"Intermediate",
      content:`REDEFINES allows two data definitions to share the same memory location.

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

💡 Common Mistake: REDEFINES with different-sized items can cause data corruption if you're not careful with which definition you write through.`,
      code:`       01  WS-DATE-CHAR     PIC X(8).
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
           05  FILLER         PIC X(84).`
    },

    { title:"Subprograms & CALL", level:"Intermediate",
      content:`CALL invokes another COBOL program. Essential for modular design.

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

💡 Interview Tip: "BY REFERENCE lets subprogram modify caller's data. BY CONTENT protects it." `,
      code:`      *    Calling program:
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
      *        GOBACK.`
    },

    { title:"VSAM File Processing", level:"Intermediate",
      content:`COBOL accesses VSAM files through SELECT with ORGANIZATION IS INDEXED.

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

💡 Pro Tip: Always use DYNAMIC access if your program does both random and sequential reads.`,
      code:`           MOVE WS-SEARCH-KEY TO CUST-KEY
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
           END-PERFORM`
    },

    { title:"File Status Codes", level:"Intermediate",
      content:`FILE STATUS is a 2-byte code set after every I/O. ALWAYS check it.

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

💡 Interview Favorite: "What is file status 23?" Answer: "Record not found — READ with invalid key or START with non-existent key." `,
      code:`       PERFORM READ-RECORD
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
       END-EVALUATE`
    },

    { title:"Embedded SQL (DB2)", level:"Intermediate",
      content:`COBOL programs access DB2 using EXEC SQL...END-EXEC blocks.

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

💡 Pro Tip: Always check SQLCODE after EVERY SQL statement. Don't assume success.`,
      code:`           EXEC SQL
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
           EXEC SQL CLOSE CUST-CURSOR END-EXEC`
    },

    { title:"SORT Verb", level:"Intermediate",
      content:`COBOL's SORT verb sorts files within the program — no external DFSORT needed.

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

💡 Pro Tip: USING/GIVING is simpler. INPUT/OUTPUT PROCEDURE gives you filtering and transformation control.`,
      code:`       FILE SECTION.
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
           CLOSE INPUT-FILE.`
    },

    { title:"Report Writing", level:"Intermediate",
      content:`Generating formatted reports is a core COBOL task. Headers, detail lines, footers, page breaks.

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

💡 Pro Tip: Always format amounts with edited PIC (ZZZ,ZZ9.99) for readability in reports.`,
      code:`       01  PRINT-LINE          PIC X(133).
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
               AFTER ADVANCING 1 LINE`
    },

    { title:"Error Handling & Debugging", level:"Intermediate",
      content:`Production COBOL must handle errors gracefully.

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

💡 Pro Tip: Add DISPLAY tracing in development. Use compiler DEBUG option for D-lines.`,
      code:`       PROCEDURE DIVISION.
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
           END-IF`
    },

    { title:"INITIALIZE Statement", level:"Intermediate",
      content:`INITIALIZE sets all fields to appropriate default values.

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

💡 Interview Tip: "How do you prevent S0C7?" Answer: "INITIALIZE working storage, validate input with IF NUMERIC, check for spaces in numeric fields." `,
      code:`      *    Initialize entire record:
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
           END-PERFORM`
    },

    { title:"CICS Programming Basics", level:"Advanced",
      content:`CICS programs are pseudo-conversational and use EXEC CICS commands.

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

💡 Pro Tip: Master pseudo-conversational pattern. It's the most asked CICS-COBOL interview topic.`,
      code:`       PROCEDURE DIVISION.
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
           END-EXEC.`
    },

    { title:"Compile, Link & Run", level:"Advanced",
      content:`The COBOL build process: source → compile → link-edit → load module.

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

💡 Pro Tip: For ABEND debugging, compile with OFFSET and LIST. The listing shows which source line matches the ABEND offset.`,
      code:`      *    COMPILE step:
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
      //SYSPRINT DD SYSOUT=*`
    },

    { title:"Performance Best Practices", level:"Advanced",
      content:`Optimize COBOL for z/OS performance — every CPU cycle costs money.

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

💡 Pro Tip: The #1 COBOL performance gain is using COMP-3 for calculations instead of DISPLAY numeric.`,
      code:`      *    COMP subscript (fast):
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
           END-IF`
    },


    { title:"FILLER & Data Alignment", level:"Beginner",
      content:`FILLER is an unnamed field used for spacing, padding, and alignment in record layouts.

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

💡 Pro Tip: Always pad records to exact LRECL. Unpadded records cause S013 or data corruption.`,
      code:`       01  REPORT-HEADER.
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
           05  DL-SALARY    PIC $$$$,$$9.99.`
    },

    { title:"VALUE Clause & Initialization", level:"Beginner",
      content:`VALUE sets initial values for data items at program load time.

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

💡 Pro Tip: INITIALIZE resets fields at runtime. VALUE sets them at compile/load time. Use both strategically.`,
      code:`       01  WS-DEFAULTS.
           05  WS-NAME      PIC X(30) VALUE SPACES.
           05  WS-AMOUNT    PIC S9(7)V99 COMP-3 VALUE +0.
           05  WS-FLAG      PIC X VALUE 'N'.
               88  PROCESS-YES  VALUE 'Y'.
               88  PROCESS-NO   VALUE 'N'.
           05  WS-HIGH      PIC X(10) VALUE HIGH-VALUES.
           05  WS-PATTERN   PIC X(20) VALUE ALL '*'.
           05  WS-MSG       PIC X(40)
               VALUE 'PROGRAM STARTED SUCCESSFULLY'.`
    },

    { title:"GOBACK vs STOP RUN", level:"Beginner",
      content:`Both end program execution, but they work differently.

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

💡 Interview Tip: "STOP RUN in a subprogram kills the entire call chain. GOBACK returns to caller."`,
      code:`      *    Main program:
       PROCEDURE DIVISION.
           CALL 'SUBPROG' USING WS-DATA
           DISPLAY 'BACK FROM SUBPROG'
           STOP RUN.
      *
      *    Subprogram (SUBPROG):
       PROCEDURE DIVISION USING LS-DATA.
           PERFORM PROCESS-LOGIC
           MOVE 0 TO RETURN-CODE
           GOBACK.`
    },

    { title:"Scope Terminators (END-IF, END-PERFORM)", level:"Beginner",
      content:`Scope terminators explicitly end statements. Always use them — avoid period-terminated statements.

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

💡 Pro Tip: Most S0C7 and logic bugs come from misplaced periods. Scope terminators prevent 90% of them.`,
      code:`      *    BAD — period-terminated:
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
           END-IF`
    },

    { title:"Paragraph & Section Design", level:"Beginner",
      content:`Paragraphs and sections organize PROCEDURE DIVISION into logical units.

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

💡 Pro Tip: Keep paragraphs small and focused. If you can't name it clearly, it's doing too much.`,
      code:`       PROCEDURE DIVISION.
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
           EXIT.`
    },

    { title:"Condition Names (88-Level) Deep Dive", level:"Beginner",
      content:`88-level condition names make code self-documenting and reduce errors.

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

💡 Pro Tip: Use 88-levels for ALL flags and status fields. Code reads like English.`,
      code:`       05  WS-TRANS-TYPE   PIC X.
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
           SET IS-DEPOSIT TO TRUE`
    },

    { title:"ACCEPT FROM DATE/TIME", level:"Beginner",
      content:`ACCEPT retrieves system date and time for processing.

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

💡 Pro Tip: Use FUNCTION CURRENT-DATE for timezone-aware timestamps in production.`,
      code:`       01  WS-DATE-WORK.
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
           DISPLAY 'TIME: ' WS-TIME-WORK`
    },

    { title:"CORRESPONDING Option", level:"Intermediate",
      content:`CORRESPONDING (CORR) operates on matching field names between two groups.

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

💡 Pro Tip: MOVE CORR saves code but can be hard to debug. Use sparingly and document which fields match.`,
      code:`       01  INPUT-REC.
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
           MOVE CORR INPUT-REC TO OUTPUT-REC`
    },

    { title:"RENAMES (66-Level)", level:"Intermediate",
      content:`66-level RENAMES redefines a contiguous range of fields under a new name.

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

💡 Pro Tip: RENAMES is mostly legacy. Use REDEFINES or reference modification instead.`,
      code:`       01  WS-FULL-DATE.
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
       66  WS-CITY-STATE RENAMES WS-CITY THRU WS-STATE.`
    },

    { title:"CONTINUE & NEXT SENTENCE", level:"Intermediate",
      content:`CONTINUE is a no-op placeholder. NEXT SENTENCE is legacy — avoid it.

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

💡 Pro Tip: Use CONTINUE in empty IF branches. Use EXIT PERFORM to break loops.`,
      code:`      *    CONTINUE — placeholder:
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
           END-PERFORM`
    },

    { title:"Intrinsic Functions", level:"Intermediate",
      content:`COBOL intrinsic functions perform common operations without external calls.

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

💡 Pro Tip: Date arithmetic with INTEGER-OF-DATE is the cleanest way to calculate date differences.`,
      code:`      *    Uppercase conversion:
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
               FUNCTION LENGTH(WS-NAME)`
    },

    { title:"OCCURS DEPENDING ON (ODO)", level:"Intermediate",
      content:`Variable-length tables use OCCURS DEPENDING ON. The table size changes at runtime.

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

💡 Pro Tip: Always validate WS-ACTUAL-COUNT is within range before accessing ODO tables.`,
      code:`       01  WS-INVOICE.
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
           END-PERFORM`
    },

    { title:"Multi-Dimensional Tables", level:"Intermediate",
      content:`COBOL supports up to 7 dimensions of OCCURS nesting.

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

💡 Pro Tip: Use INDEXED BY for multi-dimensional tables — SET and SEARCH work with indexes.`,
      code:`       01  WS-MONTHLY-SALES.
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
           ADD 1 TO WS-UNIT-COUNT(IX-MON, IX-REG)`
    },

    { title:"Indexed Files (KSDS I/O)", level:"Intermediate",
      content:`Complete KSDS processing patterns — random, sequential, and dynamic access.

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

💡 Pro Tip: For update, always READ first (gets lock), then REWRITE. Never REWRITE without prior READ.`,
      code:`      *    Complete CRUD pattern:
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
           END-DELETE`
    },

    { title:"Alternate Index Processing", level:"Intermediate",
      content:`Alternate indexes let you access VSAM KSDS by fields other than the primary key.

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

💡 Pro Tip: Alternate indexes add overhead on writes (index maintained automatically). Only create AIX you actually need.`,
      code:`      *    SELECT for alternate index path:
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
           END-PERFORM`
    },

    { title:"Cursor Processing (DB2 Advanced)", level:"Advanced",
      content:`Cursors process multiple rows from DB2 queries one at a time.

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

💡 Pro Tip: Always use WITH HOLD if you COMMIT inside a FETCH loop. Otherwise cursor closes on COMMIT.`,
      code:`           EXEC SQL DECLARE CUST-CUR CURSOR
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
           EXEC SQL CLOSE CUST-CUR END-EXEC`
    },

    { title:"DB2 Error Handling (SQLCA)", level:"Advanced",
      content:`SQLCA (SQL Communication Area) provides detailed DB2 return information.

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

💡 Pro Tip: Always use indicator variables for nullable columns. Without them, NULL causes -305.`,
      code:`       01  WS-SQLCODE       PIC S9(9) COMP.
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
           END-EVALUATE`
    },

    { title:"Batch Update Patterns", level:"Advanced",
      content:`Common batch processing patterns used in production daily.

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

💡 Pro Tip: The sequential master update and control break are the two most common patterns in mainframe COBOL.`,
      code:`      *    Control Break Pattern:
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
           PERFORM PRINT-GRAND-TOTAL`
    },

    { title:"Dynamic CALL & CANCEL", level:"Advanced",
      content:`Dynamic CALL loads programs at runtime. CANCEL frees them from memory.

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

💡 Pro Tip: Use ON EXCEPTION with dynamic CALL to handle missing programs gracefully.`,
      code:`      *    Dynamic CALL with error handling:
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
           END-CALL`
    },

    { title:"SPECIAL-NAMES & Configuration", level:"Advanced",
      content:`SPECIAL-NAMES in ENVIRONMENT DIVISION configures system-specific settings.

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

💡 Pro Tip: Most shops use standard US format. Know DECIMAL-POINT IS COMMA for international projects.`,
      code:`       ENVIRONMENT DIVISION.
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
      *    IF WS-INPUT IS VALID-CHARS ...`
    },

    { title:"XML & JSON Processing", level:"Advanced",
      content:`Modern COBOL (Enterprise COBOL 5+) supports XML and JSON natively.

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

💡 Pro Tip: JSON GENERATE/PARSE enables COBOL programs to be REST API backends — key for modernization.`,
      code:`       01  WS-CUSTOMER.
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
      *      "CUST-BALANCE":15000.50}`
    },

    { title:"Object-Oriented COBOL", level:"Expert",
      content:`Enterprise COBOL supports object-oriented programming for Java interop and modern design patterns.

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

💡 Pro Tip: OO COBOL is niche. Focus on procedural COBOL for interviews unless the job specifically mentions OO.`,
      code:`      *    OO COBOL class definition:
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
      *        USING 'HARIKRISHNAN'`
    },

    { title:"COBOL & CICS Web Services", level:"Expert",
      content:`Expose COBOL programs as REST/SOAP web services through CICS.

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

💡 Pro Tip: z/OS Connect is the modern way to expose COBOL as APIs. No program changes required.`,
      code:`      *    COBOL program exposed as web service:
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
      *    Client sees REST API, COBOL sees COMMAREA`
    },

    { title:"Unit Testing COBOL", level:"Advanced",
      content:`Modern COBOL development includes automated testing.

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

💡 Pro Tip: Even simple batch testing (run + compare) catches 80% of bugs. Automate it in your scheduler.`,
      code:`      *    Test harness JCL:
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
      //OUTDD    DD  SYSOUT=*`
    },



    { title:"Nested COPY & Large Copybooks", level:"Intermediate",
      content:`Managing copybooks effectively in large applications.

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

💡 Pro Tip: One copybook per DB2 table (DCLGEN). One per file layout. Change once, recompile affected programs.`
    },

    { title:"COBOL Compile Options Deep Dive", level:"Advanced",
      content:`Compiler options affect code generation, debugging, and performance.

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

💡 Pro Tip: SSRANGE catches subscript errors before they become S0C4. Use in test, remove in production.`
    },

    { title:"COBOL & Batch Restart/Checkpoint", level:"Advanced",
      content:`Long-running batch jobs need restart capability to avoid reprocessing.

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

💡 Pro Tip: Design every batch program to be restartable from day one. Production ABENDs happen.`
    },



    { title:"Working with Dates in COBOL", level:"Intermediate",
      content:`Date handling is critical in batch processing — month-end, year-end, business days.

ACCEPT FROM DATE:
  ACCEPT WS-DATE FROM DATE YYYYMMDD — Gets 8-digit date
  ACCEPT WS-TIME FROM TIME — Gets HHMMSSss
  ACCEPT WS-DOW FROM DAY-OF-WEEK — 1=Mon, 7=Sun

FUNCTION CURRENT-DATE:
  Returns 21-char: YYYYMMDDHHMMSSss±HHMM (with timezone)
  MOVE FUNCTION CURRENT-DATE TO WS-FULL-TIMESTAMP

Date Arithmetic:
  COMPUTE WS-DAYS = FUNCTION INTEGER-OF-DATE(WS-END-DATE)
                   - FUNCTION INTEGER-OF-DATE(WS-START-DATE)
  COMPUTE WS-FUTURE = FUNCTION DATE-OF-INTEGER(
    FUNCTION INTEGER-OF-DATE(WS-TODAY) + 30)

Date Validation:
  FUNCTION TEST-DATE-YYYYMMDD(WS-DATE) returns 0 if valid, nonzero if invalid.

Common Patterns:
  • Month-end: Check if next day is different month
  • Business day: Exclude weekends (DAY-OF-WEEK = 6 or 7)
  • Age calculation: INTEGER-OF-DATE(today) - INTEGER-OF-DATE(birthdate) / 365

💡 Pro Tip: Always validate dates from input files. Invalid dates cause S0C7 when used in date functions.`,
      code:`       01  WS-DATES.
           05  WS-TODAY        PIC 9(8).
           05  WS-FUTURE       PIC 9(8).
           05  WS-DAYS-DIFF    PIC S9(5) COMP-3.
      *
           ACCEPT WS-TODAY FROM DATE YYYYMMDD
      *    Calculate 30 days from now:
           COMPUTE WS-FUTURE = FUNCTION DATE-OF-INTEGER(
               FUNCTION INTEGER-OF-DATE(WS-TODAY) + 30)
      *    Days between two dates:
           COMPUTE WS-DAYS-DIFF =
               FUNCTION INTEGER-OF-DATE(WS-END-DATE) -
               FUNCTION INTEGER-OF-DATE(WS-START-DATE)`
    },

    { title:"Variable-Length Records", level:"Intermediate",
      content:`Files with records of different lengths use RECORD IS VARYING.

FD Definition:
  FD MY-FILE RECORD IS VARYING IN SIZE
    FROM 50 TO 500 CHARACTERS
    DEPENDING ON WS-REC-LEN.
  01 MY-RECORD PIC X(500).

WS-REC-LEN:
  01 WS-REC-LEN PIC S9(4) COMP.
  System sets this on READ. You set it before WRITE.

Reading Variable-Length:
  READ MY-FILE INTO WS-BUFFER
  (WS-REC-LEN now contains actual record length)

Writing Variable-Length:
  MOVE desired-length TO WS-REC-LEN
  WRITE MY-RECORD FROM WS-BUFFER

Common Uses:
  • Header/detail/trailer records of different sizes
  • Packed records with variable number of line items
  • VSAM variable-length KSDS files

💡 Pro Tip: Always check WS-REC-LEN after READ — don't assume all records are the same size.`,
      code:`       FILE SECTION.
       FD  VAR-FILE
           RECORD IS VARYING IN SIZE
           FROM 20 TO 200 CHARACTERS
           DEPENDING ON WS-REC-LEN.
       01  VAR-RECORD         PIC X(200).
      *
       WORKING-STORAGE SECTION.
       01  WS-REC-LEN         PIC S9(4) COMP.
      *
      *    Reading:
           READ VAR-FILE INTO WS-BUFFER
      *    WS-REC-LEN now = actual length
           DISPLAY 'LENGTH: ' WS-REC-LEN
      *
      *    Writing:
           MOVE 80 TO WS-REC-LEN
           WRITE VAR-RECORD FROM WS-SHORT-REC`
    },

    { title:"Relative File Processing (RRDS)", level:"Intermediate",
      content:`Relative files access records by record number — like an array on disk.

SELECT:
  SELECT REL-FILE ASSIGN TO RELDD
    ORGANIZATION IS RELATIVE
    ACCESS MODE IS RANDOM
    RELATIVE KEY IS WS-REL-KEY
    FILE STATUS IS WS-FS.

RELATIVE KEY:
  01 WS-REL-KEY PIC 9(8) — Record number (1-based).

Operations:
  READ: MOVE 5 TO WS-REL-KEY / READ REL-FILE
  WRITE: MOVE 10 TO WS-REL-KEY / WRITE REL-RECORD
  REWRITE: READ first, then REWRITE REL-RECORD
  DELETE: MOVE n TO WS-REL-KEY / DELETE REL-FILE
  START: START REL-FILE KEY >= WS-REL-KEY (for browse)

Access Modes:
  SEQUENTIAL — Read in order (record 1, 2, 3...)
  RANDOM — Direct by record number
  DYNAMIC — Both sequential and random

When to Use:
  • Lookup tables loaded by record number
  • Fixed slots (e.g., calendar day data, 1-366)
  • When record number IS the key

💡 Pro Tip: RRDS is rare in production. KSDS is far more common. Know RRDS for interviews.`,
      code:`           MOVE 42 TO WS-REL-KEY
           READ REL-FILE INTO WS-REC
               INVALID KEY
                   DISPLAY 'RECORD 42 NOT FOUND'
               NOT INVALID KEY
                   DISPLAY 'FOUND: ' WS-REC
           END-READ`
    },

    { title:"MERGE Verb", level:"Intermediate",
      content:`MERGE combines multiple sorted files into one sorted output.

Syntax:
  MERGE MERGE-FILE
    ON ASCENDING KEY M-KEY
    USING FILE-1 FILE-2 FILE-3
    GIVING OUTPUT-FILE

Requirements:
  • SD (Sort Description) in FILE SECTION
  • Input files must ALREADY be sorted on the merge key
  • Output is a single merged, sorted file

MERGE vs SORT:
  SORT takes one unsorted input → one sorted output
  MERGE takes multiple sorted inputs → one sorted output
  MERGE is faster than SORT when inputs are pre-sorted

With OUTPUT PROCEDURE:
  MERGE MERGE-FILE ON ASCENDING KEY M-KEY
    USING FILE-1 FILE-2
    OUTPUT PROCEDURE IS FORMAT-OUTPUT
  (RETURN merge-record to process each merged record)

💡 Pro Tip: MERGE is perfect for combining daily extracts into a weekly file. Much faster than SORT on concatenated input.`,
      code:`       FILE SECTION.
       SD  MERGE-FILE.
       01  MERGE-REC.
           05  M-KEY           PIC X(10).
           05  M-DATA          PIC X(90).
      *
           MERGE MERGE-FILE
               ON ASCENDING KEY M-KEY
               USING DAILY-MON DAILY-TUE DAILY-WED
                     DAILY-THU DAILY-FRI
               GIVING WEEKLY-FILE`
    },

    { title:"Inter-Program Communication", level:"Advanced",
      content:`COBOL programs communicate via CALL parameters, COMMAREA, or shared files.

CALL...USING (Batch):
  Main calls sub with shared data areas.
  BY REFERENCE — Sub modifies caller's data
  BY CONTENT — Sub gets a copy (read-only to caller)
  BY VALUE — Passes actual value (for C/Java interop)

COMMAREA (CICS):
  Data passed between pseudo-conversational interactions.
  Max 32KB. Stored by CICS between transactions.
  IF EIBCALEN = 0 → first invocation, no COMMAREA.

Shared Files:
  Multiple programs in a job step share files via JCL DD.
  Open in main program, pass file status/data via CALL.

RETURN-CODE:
  Set by called program: MOVE 0 TO RETURN-CODE
  Checked by caller or JCL COND parameter.

EXTERNAL Data:
  01 WS-SHARED EXTERNAL PIC X(100).
  Shared across programs in same run unit — same memory.

💡 Pro Tip: Use RETURN-CODE for status (0=OK, 4=warn, 8=error). Use CALL parameters for data.`,
      code:`      *    Main program passes customer record to validator:
           CALL 'VALIDATE' USING
               BY REFERENCE WS-CUST-REC
               BY CONTENT   WS-VALID-TABLE
               BY REFERENCE WS-ERROR-MSG
           END-CALL
           EVALUATE RETURN-CODE
               WHEN 0 PERFORM PROCESS-VALID
               WHEN 4 PERFORM PROCESS-WARNING
               WHEN 8 PERFORM PROCESS-ERROR
           END-EVALUATE`
    },

    { title:"Condition Handling (USE AFTER ERROR)", level:"Advanced",
      content:`DECLARATIVES provide automatic error handling for file I/O.

Syntax:
  DECLARATIVES.
  FILE-ERR SECTION.
    USE AFTER ERROR PROCEDURE ON file-name.
  FILE-ERR-PARA.
    DISPLAY 'FILE ERROR: ' WS-FS
    MOVE 8 TO RETURN-CODE.
  END DECLARATIVES.

How It Works:
  When any I/O error occurs on the named file, control transfers to the USE procedure automatically. After the procedure, control returns to the statement AFTER the failed I/O.

Scope:
  USE AFTER ERROR ON file-name — specific file
  USE AFTER ERROR ON INPUT — all input files
  USE AFTER ERROR ON OUTPUT — all output files
  USE AFTER ERROR ON I-O — all I-O files
  USE AFTER ERROR ON EXTEND — all extend files

Modern Alternative:
  Most shops prefer FILE STATUS checking after each I/O operation instead of DECLARATIVES. It's more explicit and easier to debug.

💡 Pro Tip: DECLARATIVES are legacy. Use FILE STATUS checking — it's clearer and every mainframe shop expects it.`,
      code:`       PROCEDURE DIVISION.
       DECLARATIVES.
       FILE-ERR SECTION.
           USE AFTER ERROR PROCEDURE ON CUST-FILE.
       FILE-ERR-PARA.
           DISPLAY 'CUST-FILE ERROR: ' WS-CUST-FS
           MOVE 12 TO RETURN-CODE
           STOP RUN.
       END DECLARATIVES.
      *
       MAIN SECTION.
       MAIN-PARA.
           OPEN INPUT CUST-FILE
           PERFORM READ-LOOP UNTIL EOF
           CLOSE CUST-FILE
           STOP RUN.`
    },

    { title:"Debugging with SYSUDUMP & CEEDUMP", level:"Advanced",
      content:`When a COBOL program ABENDs, dump datasets help identify the failing statement.

SYSUDUMP (Unformatted Dump):
  //SYSUDUMP DD SYSOUT=*
  Shows raw memory — registers, PSW, storage areas.
  Use OFFSET compiler option to map PSW to source line.

SYSABEND (Full Dump):
  //SYSABEND DD SYSOUT=*
  More detail than SYSUDUMP including system areas.

CEEDUMP (Language Environment):
  //CEEDUMP DD SYSOUT=*
  Formatted, readable. Shows COBOL variable names and values!
  Best option for COBOL debugging.

Debugging Steps:
  1. Get the ABEND code (e.g., S0C7)
  2. Find the PSW address in the dump
  3. Subtract the EPA (Entry Point Address) to get offset
  4. Look up offset in compiler listing (OFFSET option)
  5. Find the source line → identify the failing variable
  6. Check variable contents in CEEDUMP

Compile for Debug:
  IGYCRCTL PARM='LIB,MAP,XREF,OFFSET,LIST,TEST'
  • OFFSET — Maps machine code offsets to source lines
  • MAP — Shows variable memory locations
  • TEST — Enables z/OS Debugger

💡 Pro Tip: Always compile with OFFSET in production. Without it, ABEND debugging is nearly impossible.`,
      code:`      //* JCL for dump output:
      //STEP1    EXEC PGM=MYPROG
      //STEPLIB  DD  DSN=MY.LOADLIB,DISP=SHR
      //CEEDUMP  DD  SYSOUT=*
      //SYSUDUMP DD  SYSOUT=*
      //SYSOUT   DD  SYSOUT=*
      //*
      //* CEEDUMP shows:
      //*   Condition: CEE3207S
      //*   Location: MYPROG, statement 247
      //*   WS-AMOUNT = X'0000000F4C'
      //*   (Non-numeric data in numeric field)`
    },

    { title:"Common S0C7 Debugging", level:"Intermediate",
      content:`S0C7 (Data Exception) is the #1 COBOL ABEND. Always caused by non-numeric data in a numeric field during arithmetic or MOVE.

Common Causes:
  1. Uninitialized COMP-3 field (contains garbage)
  2. Spaces in a numeric field from input file
  3. REDEFINES misalignment — writing alpha, reading numeric
  4. Missing initialization after first READ
  5. Packed field corrupted by wrong MOVE

How to Find It:
  1. Check CEEDUMP for variable values
  2. Find the statement number from dump offset
  3. Look at which variables are on that line
  4. DISPLAY suspect variables BEFORE the failing line

Prevention:
  • INITIALIZE all working storage
  • Validate input: IF WS-FIELD IS NUMERIC
  • Use SSRANGE compiler option to catch bad subscripts
  • Check FILE STATUS after every I/O
  • Be careful with REDEFINES

Quick Fix Pattern:
  IF WS-AMOUNT IS NUMERIC
    ADD WS-AMOUNT TO WS-TOTAL
  ELSE
    DISPLAY 'BAD DATA: ' WS-AMOUNT
    MOVE 0 TO WS-AMOUNT
  END-IF

💡 Interview Favorite: "How do you debug S0C7?" — This is asked in every mainframe interview. Know the full debugging flow.`,
      code:`      *    Prevention pattern:
           INITIALIZE WS-OUTPUT-RECORD
      *
      *    Validation before computation:
           IF WS-INPUT-AMT IS NUMERIC
               COMPUTE WS-TAX ROUNDED =
                   WS-INPUT-AMT * WS-TAX-RATE
           ELSE
               DISPLAY 'S0C7 PREVENTED: '
                       WS-INPUT-AMT
               DISPLAY 'RECORD: ' WS-KEY
               ADD 1 TO WS-ERROR-COUNT
               MOVE 0 TO WS-INPUT-AMT
           END-IF
      *
      *    Dump numeric field contents:
           DISPLAY 'FIELD HEX: ' WS-PACKED-FLD`
    },

    { title:"COBOL & JCL Integration", level:"Intermediate",
      content:`COBOL programs run via JCL. Understanding the connection is essential.

DD → SELECT Mapping:
  JCL: //CUSTMAST DD DSN=MY.CUST.FILE,DISP=SHR
  COBOL: SELECT CUST-FILE ASSIGN TO CUSTMAST

PARM Parameter:
  JCL: //STEP1 EXEC PGM=MYPROG,PARM='20260321'
  COBOL: LINKAGE SECTION.
         01 LS-PARM.
           05 LS-PARM-LEN PIC S9(4) COMP.
           05 LS-PARM-DATA PIC X(100).
         PROCEDURE DIVISION USING LS-PARM.
  Max 100 characters.

SYSIN Data:
  JCL: //SYSIN DD *
       PARAM1=VALUE1
       /*
  COBOL: SELECT SYSIN-FILE ASSIGN TO SYSIN.
  Read SYSIN like any sequential file.

Return Codes:
  COBOL: MOVE 0 TO RETURN-CODE (or 4, 8, 12, 16)
  JCL: //STEP2 EXEC PGM=NEXT,COND=(4,LT,STEP1)
  RC controls conditional step execution.

SYSOUT:
  DISPLAY 'message' — goes to //SYSOUT DD SYSOUT=*
  WRITE print-rec — goes to //REPORT DD SYSOUT=*

💡 Pro Tip: Every COBOL developer must understand JCL. They're inseparable in mainframe batch processing.`,
      code:`      //* JCL calling COBOL with PARM:
      //STEP1    EXEC PGM=DAYRPT,PARM='20260321'
      //STEPLIB  DD  DSN=PROD.LOADLIB,DISP=SHR
      //CUSTMAST DD  DSN=PROD.CUST.MASTER,DISP=SHR
      //TRANSIN  DD  DSN=DAILY.TRANS.FILE,DISP=SHR
      //REPORT   DD  SYSOUT=*
      //ERRFILE  DD  DSN=DAILY.ERRORS,
      //             DISP=(NEW,CATLG,DELETE),
      //             SPACE=(CYL,(1,1)),
      //             DCB=(RECFM=FB,LRECL=200)
      //SYSOUT   DD  SYSOUT=*
      //CEEDUMP  DD  SYSOUT=*`
    },

    { title:"COBOL Naming Conventions", level:"Beginner",
      content:`Consistent naming makes programs readable and maintainable across teams.

Standard Prefixes:
  WS- — Working Storage variables
  LS- — Linkage Section variables
  FD- — File record fields
  WS-I, WS-J — Loop counters/subscripts
  WS-EOF — End-of-file flag
  WS-FS — File status

Naming Rules:
  • Max 30 characters (COBOL-85)
  • Letters, digits, hyphens only (no underscores)
  • Must contain at least one letter
  • Cannot start/end with hyphen
  • Case insensitive (CUST-NAME = cust-name)

Best Practices:
  • Descriptive names: WS-CUSTOMER-BALANCE not WS-CB
  • Consistent prefixes per section
  • Group names reflect hierarchy: EMP-RECORD → EMP-NAME → EMP-FIRST
  • 88-level names should read as conditions: VALID-STATUS, EOF-REACHED
  • Paragraph names describe action: PROCESS-TRANSACTION, VALIDATE-INPUT

Copybook Conventions:
  Use prefix tags for REPLACING: :TAG:-FIELD-NAME
  COPY GENREC REPLACING ==:TAG:== BY ==CUST==

💡 Pro Tip: Adopt your shop's naming conventions from day one. Inconsistent naming is the fastest way to get code rejected in review.`,
      code:`       01  WS-CUSTOMER-RECORD.
           05  WS-CUST-ID         PIC 9(8).
           05  WS-CUST-NAME.
               10  WS-CUST-FIRST  PIC X(20).
               10  WS-CUST-LAST   PIC X(25).
           05  WS-CUST-STATUS     PIC X.
               88  CUST-ACTIVE    VALUE 'A'.
               88  CUST-INACTIVE  VALUE 'I'.
               88  CUST-VALID     VALUE 'A' 'I'.
           05  WS-CUST-BALANCE    PIC S9(9)V99 COMP-3.
      *
       01  WS-FLAGS.
           05  WS-EOF-FLAG        PIC X VALUE 'N'.
               88  EOF-REACHED    VALUE 'Y'.
           05  WS-CUST-FS         PIC XX VALUE '00'.`
    },

    { title:"Packed Decimal Arithmetic Deep Dive", level:"Intermediate",
      content:`COMP-3 (packed decimal) is the backbone of mainframe financial processing. Understanding its internals prevents bugs.

Storage Format:
  Each byte holds 2 digits. Last nibble = sign (C=positive, D=negative, F=unsigned).
  PIC S9(5) COMP-3 = 3 bytes: dd dd ds (5 digits + sign)
  PIC S9(7)V99 COMP-3 = 5 bytes: dd dd dd dd ds

Sign Nibble:
  X'C' = positive (+)
  X'D' = negative (-)
  X'F' = unsigned (no sign)
  If sign nibble is invalid (e.g., X'0') → S0C7

Precision Rules:
  ADD A TO B — result precision = max(A,B) digits
  MULTIPLY A BY B — result can be larger than either
  Use COMPUTE with ROUNDED for controlled precision

Truncation:
  Without ROUNDED: COMPUTE X = 10 / 3 → 3 (truncated)
  With ROUNDED: COMPUTE X ROUNDED = 10 / 3 → 3 (rounds to pic)
  ON SIZE ERROR catches overflow

Why Not COMP (Binary)?
  Binary arithmetic rounds differently than decimal.
  $1.00 / 3 = $0.33 in packed (exact), but floating point may give $0.33333...
  Financial regulations require exact decimal arithmetic.

💡 Pro Tip: COMP-3 with S9(n)V99 and ROUNDED — this is how every bank does it.`,
      code:`       01  WS-MONEY.
           05  WS-PRICE      PIC S9(5)V99 COMP-3.
           05  WS-QTY        PIC S9(5) COMP-3.
           05  WS-SUBTOTAL   PIC S9(9)V99 COMP-3.
           05  WS-TAX        PIC S9(7)V99 COMP-3.
           05  WS-TOTAL      PIC S9(9)V99 COMP-3.
      *
           COMPUTE WS-SUBTOTAL ROUNDED =
               WS-PRICE * WS-QTY
           COMPUTE WS-TAX ROUNDED =
               WS-SUBTOTAL * 0.085
           ADD WS-SUBTOTAL WS-TAX
               GIVING WS-TOTAL ROUNDED
               ON SIZE ERROR
                   DISPLAY 'OVERFLOW IN TOTAL'
                   MOVE 99999999.99 TO WS-TOTAL
           END-ADD`
    },

    { title:"COBOL & MQ Series Basics", level:"Expert",
      content:`IBM MQ (formerly MQSeries/WebSphere MQ) enables COBOL programs to exchange messages with other systems.

How It Works:
  COBOL puts messages on queues → MQ delivers to target.
  Target can be: another COBOL program, Java app, web service, another mainframe.

Key Concepts:
  Queue Manager — Manages queues on this system
  Queue — Named message store (like a pipe)
  Message — Data payload (your COBOL record)
  Channel — Connection between queue managers
  MQPUT — Send a message to a queue
  MQGET — Receive a message from a queue

COBOL API Calls:
  CALL 'MQCONN' USING WS-QM-NAME WS-HCONN WS-CC WS-RC
  CALL 'MQOPEN' USING WS-HCONN WS-OBJ-DESC WS-OPTIONS ...
  CALL 'MQPUT'  USING WS-HCONN WS-HOBJ WS-MSG-DESC WS-PUT-OPTS WS-MSG-LEN WS-MSG-BUFFER ...
  CALL 'MQGET'  USING WS-HCONN WS-HOBJ WS-MSG-DESC WS-GET-OPTS WS-BUF-LEN WS-MSG-BUFFER WS-MSG-LEN ...
  CALL 'MQCLOSE' ...
  CALL 'MQDISC' ...

Common Pattern:
  Batch COBOL reads file → MQPUTs each record → MQ delivers to target system.

💡 Pro Tip: MQ is how mainframes talk to the rest of the world. Know MQPUT/MQGET for enterprise integration interviews.`,
      code:`      *    Simplified MQ PUT pattern:
           CALL 'MQCONN' USING WS-QM-NAME
                WS-HCONN WS-COMP-CODE WS-REASON
           IF WS-COMP-CODE NOT = MQCC-OK
               DISPLAY 'MQCONN FAILED: ' WS-REASON
               STOP RUN
           END-IF
      *
           CALL 'MQOPEN' USING WS-HCONN
                WS-OBJECT-DESC WS-OPEN-OPTS
                WS-HOBJ WS-COMP-CODE WS-REASON
      *
           MOVE WS-OUTPUT-REC TO WS-MSG-BUFFER
           MOVE LENGTH OF WS-OUTPUT-REC TO WS-MSG-LEN
           CALL 'MQPUT' USING WS-HCONN WS-HOBJ
                WS-MSG-DESC WS-PUT-OPTS
                WS-MSG-LEN WS-MSG-BUFFER
                WS-COMP-CODE WS-REASON`
    },

    { title:"Production COBOL Patterns", level:"Advanced",
      content:`Patterns used in every production mainframe shop.

1. Read-Process-Write:
  OPEN files → Read first record → Loop until EOF → Close files
  This is 80% of all batch COBOL programs.

2. Match-Merge:
  Two sorted files, same key → Walk both simultaneously
  Match: both have key → update. Master only → pass through. Trans only → new record.

3. Control Break:
  Sorted input by group key → Detect key change → Print subtotals → Accumulate grand total.

4. Multi-File Split:
  One input → multiple outputs based on record type or criteria.

5. Accumulator Pattern:
  INITIALIZE counters before loop. Accumulate in loop. Report after loop.
  Always: record count, total amount, error count.

6. Error File Pattern:
  Write bad records to error file with error reason.
  Continue processing good records. Report error count at end.

7. Checkpoint/Restart:
  Commit every N records. Write checkpoint info. On restart, skip past checkpoint.

8. Header/Detail/Trailer:
  First record = header (date, file ID). Middle = details. Last = trailer (record count, hash total). Validate trailer counts.

💡 Pro Tip: Learn patterns 1-4 by heart. You'll write variations of these every day.`,
      code:`      *    Match-Merge pattern (skeleton):
       MAIN-LOGIC.
           OPEN INPUT MASTER-FILE TRANS-FILE
                OUTPUT OUTPUT-FILE
           PERFORM READ-MASTER
           PERFORM READ-TRANS
           PERFORM UNTIL MAST-EOF AND TRAN-EOF
               EVALUATE TRUE
                   WHEN MAST-KEY < TRAN-KEY
                       PERFORM WRITE-MASTER-ONLY
                       PERFORM READ-MASTER
                   WHEN MAST-KEY = TRAN-KEY
                       PERFORM UPDATE-MASTER
                       PERFORM READ-MASTER
                       PERFORM READ-TRANS
                   WHEN MAST-KEY > TRAN-KEY
                       PERFORM ADD-NEW-RECORD
                       PERFORM READ-TRANS
               END-EVALUATE
           END-PERFORM
           CLOSE MASTER-FILE TRANS-FILE OUTPUT-FILE.`
    },

    { title:"COBOL Migration & Modernization", level:"Expert",
      content:`Strategies for keeping COBOL relevant in modern architectures.

API Wrapping:
  Expose existing COBOL via REST APIs using CICS Web Services or z/OS Connect.
  No COBOL changes needed — the middleware handles JSON conversion.

Micro-Frontend:
  Replace 3270 screens with web UI that calls COBOL backend via API.
  COBOL stays as-is. Only the presentation layer modernizes.

DevOps Integration:
  Git for source control (replace Endevor/ChangeMan for new projects)
  Jenkins/IBM DBB for automated builds
  zUnit for unit testing
  IDz (Eclipse) or VS Code + Zowe Explorer for editing

Code Quality:
  SonarQube has COBOL plugins for static analysis.
  Detect dead code, complexity, naming violations, missing error handling.

Refactoring:
  Break monolithic programs into smaller callable modules.
  Extract business rules into separate programs.
  Use copybooks for shared data structures.

What NOT to Do:
  Don't rewrite working COBOL to Java. The risk is enormous — hidden business logic, edge cases, performance regression.
  Wrap and modernize the interface, keep the proven engine.

💡 Pro Tip: "Modernize the interface, not the engine" — this is the industry consensus.`,
      code:`      *    Modern COBOL — exposed as REST API:
      *    No code changes needed in COBOL.
      *    z/OS Connect or CICS Web Services handles:
      *    HTTP request → JSON → COBOL COMMAREA → process → JSON → HTTP response
      *
      *    Your COBOL program just does:
       PROCEDURE DIVISION.
           MOVE DFHCOMMAREA TO WS-REQUEST
           EVALUATE WS-ACTION
               WHEN 'GET'  PERFORM GET-CUSTOMER
               WHEN 'UPD'  PERFORM UPDATE-CUSTOMER
               WHEN 'DEL'  PERFORM DELETE-CUSTOMER
           END-EVALUATE
           MOVE WS-RESPONSE TO DFHCOMMAREA
           EXEC CICS RETURN END-EXEC.`
    },

    { title:"COBOL Signed Numbers & Display", level:"Beginner",
      content:`Understanding signed vs unsigned is critical for correct arithmetic.

Unsigned:
  PIC 9(5) — Always positive. No sign stored. 5 bytes DISPLAY.

Signed:
  PIC S9(5) — Positive or negative. Sign stored in last byte (overpunch).
  PIC S9(5) COMP-3 — Sign in last nibble (C/D/F).

Why Sign Matters:
  Without S, SUBTRACT gives wrong results when result goes negative.
  SUBTRACT 100 FROM 50 without S → result wraps or truncates.
  SUBTRACT 100 FROM 50 with S → result = -50.

Display of Signed Numbers:
  PIC S9(5) DISPLAY — last digit "overpunched" with sign.
  +12345 displays as 1234E (E = +5 in EBCDIC)
  -12345 displays as 1234N (N = -5 in EBCDIC)

Separate Sign:
  PIC S9(5) SIGN LEADING SEPARATE — +12345 stored as +12345 (6 bytes)
  PIC S9(5) SIGN TRAILING SEPARATE — 12345+ (6 bytes)

For Display/Print:
  Use edited PIC: PIC -(5)9 → shows "  -100"
  Or PIC +ZZZZ9 → shows "  +100" or "  -100"

💡 Interview Tip: "Always use PIC S for any field involved in arithmetic. Unsigned fields cause silent errors."`,
      code:`       01  WS-EXAMPLES.
      *    Unsigned — NEVER use for arithmetic
           05  WS-COUNT      PIC 9(5).
      *    Signed — use for ALL calculations
           05  WS-AMOUNT     PIC S9(7)V99 COMP-3.
           05  WS-BALANCE    PIC S9(9)V99 COMP-3.
      *    For display/print:
           05  WS-DISP-AMT   PIC -(7)9.99.
           05  WS-DISP-BAL   PIC $$$,$$$,$$9.99CR.
      *
      *    Correct: signed arithmetic
           SUBTRACT WS-DEBIT FROM WS-BALANCE
      *    If BALANCE=50, DEBIT=100 → BALANCE=-50 (correct)
      *
      *    WRONG: unsigned arithmetic
      *    SUBTRACT 100 FROM WS-COUNT
      *    If COUNT=50 → result is WRONG (no negative)`
    },

    { title:"Alphanumeric Operations", level:"Beginner",
      content:`COBOL treats text (PIC X) differently from numbers (PIC 9). Know the rules.

MOVE Rules for Alphanumeric:
  Left-justified, space-padded on right.
  MOVE 'HI' TO WS-NAME (PIC X(10)) → 'HI        '
  Truncated from right if too long.

Comparison:
  Alphanumeric comparison is left-to-right, character by character, using EBCDIC collating sequence.
  SPACES < numbers < uppercase < lowercase (in EBCDIC)

Concatenation:
  Use STRING verb (not + operator like other languages).
  STRING WS-FIRST DELIMITED BY SPACES
         ' ' DELIMITED BY SIZE
         WS-LAST DELIMITED BY SPACES
    INTO WS-FULL-NAME

Justification:
  JUSTIFIED RIGHT on PIC X fields right-justifies the data.
  05 WS-CODE PIC X(10) JUSTIFIED RIGHT.
  MOVE 'ABC' TO WS-CODE → '       ABC'

Case Conversion:
  FUNCTION UPPER-CASE(WS-INPUT)
  FUNCTION LOWER-CASE(WS-INPUT)
  Or INSPECT CONVERTING 'abc...z' TO 'ABC...Z'

Padding/Trimming:
  FUNCTION TRIM(WS-FIELD) (COBOL 6.3+)
  Or use INSPECT TALLYING...FOR LEADING SPACES

💡 Pro Tip: Always understand EBCDIC collating sequence — it's different from ASCII. Spaces sort BEFORE numbers in EBCDIC.`,
      code:`      *    String concatenation:
           INITIALIZE WS-FULL-NAME
           STRING WS-FIRST-NAME DELIMITED BY '  '
                  ' ' DELIMITED BY SIZE
                  WS-LAST-NAME DELIMITED BY '  '
             INTO WS-FULL-NAME
           END-STRING
      *
      *    Case conversion:
           MOVE FUNCTION UPPER-CASE(WS-INPUT)
               TO WS-UPPER
      *
      *    Right justify:
       05  WS-RJUST  PIC X(10) JUSTIFIED RIGHT.
           MOVE 'ABC' TO WS-RJUST
      *    Result: '       ABC'`
    },

    { title:"COBOL Program Structure Best Practices", level:"Beginner",
      content:`A well-structured COBOL program is easy to read, debug, and maintain.

Recommended Layout:
  1. IDENTIFICATION DIVISION — Program name, author
  2. ENVIRONMENT DIVISION — File mappings
  3. DATA DIVISION
     - FILE SECTION — Record layouts
     - WORKING-STORAGE — Variables, flags, counters
     - LINKAGE SECTION — Parameters from caller
  4. PROCEDURE DIVISION
     - MAIN paragraph — Overall flow (open, process loop, close, stop)
     - Functional paragraphs — One task per paragraph
     - Exit paragraphs — Clean exit points

Main Paragraph Pattern:
  MAIN-PARA.
    PERFORM INIT-PARA
    PERFORM PROCESS-PARA UNTIL EOF-REACHED
    PERFORM CLEANUP-PARA
    STOP RUN.

Paragraph Guidelines:
  • 30-50 lines max per paragraph
  • One logical function per paragraph
  • Descriptive names: VALIDATE-INPUT, WRITE-REPORT
  • Always have an exit paragraph: MAIN-EXIT. EXIT.
  • Use PERFORM...THRU for paragraphs with multiple paths

Comment Standards:
  * in column 7 for full-line comments
  *--- separator lines between sections
  Comment blocks before each paragraph explaining purpose

💡 Pro Tip: A senior developer should understand your program by reading ONLY the MAIN paragraph. If they can't, refactor.`,
      code:`       PROCEDURE DIVISION.
      *============================================*
      *    MAIN PROCESSING LOGIC                   *
      *============================================*
       MAIN-PARA.
           PERFORM INIT-PARA
           PERFORM READ-INPUT
           PERFORM PROCESS-LOOP
               UNTIL EOF-REACHED
           PERFORM PRINT-SUMMARY
           PERFORM CLEANUP-PARA
           STOP RUN.
       MAIN-EXIT.
           EXIT.
      *
      *--- Initialize files and counters ---
       INIT-PARA.
           INITIALIZE WS-COUNTERS
           OPEN INPUT  CUST-FILE
                OUTPUT REPORT-FILE ERROR-FILE
           IF WS-CUST-FS NOT = '00'
               DISPLAY 'OPEN ERROR: ' WS-CUST-FS
               MOVE 12 TO RETURN-CODE
               STOP RUN
           END-IF.
       INIT-EXIT.
           EXIT.`
    },



    { title:"Sequential vs Random vs Dynamic Access", level:"Beginner",
      content:`ACCESS MODE controls how records are read/written in indexed and relative files.

SEQUENTIAL:
  Records processed in key order (first to last).
  READ gets next record. No key needed.
  Used for: batch processing, full-file scans.

RANDOM:
  Direct access by key value.
  MOVE key TO record-key, then READ.
  Used for: lookups, single-record access.

DYNAMIC:
  Both sequential AND random in the same program.
  Use READ (random) and READ NEXT (sequential).
  START positions for sequential browse after random access.
  Used for: lookup + browse patterns.

File Type Compatibility:
  Sequential files: SEQUENTIAL only
  Indexed files (KSDS): All three
  Relative files (RRDS): All three

When to Use:
  SEQUENTIAL — Process entire file or large portion
  RANDOM — Individual record lookups
  DYNAMIC — Mix of both (most flexible, slight overhead)

Pro Tip: Use DYNAMIC as default for VSAM KSDS files — it gives you maximum flexibility.`,
      code:`           SELECT CUST-FILE ASSIGN TO CUSTVSAM
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS CUST-KEY
               FILE STATUS IS WS-FS.
      *
      *    Random read:
           MOVE '12345678' TO CUST-KEY
           READ CUST-FILE
      *
      *    Then browse from that point:
           READ CUST-FILE NEXT
           READ CUST-FILE NEXT`
    },

    { title:"COBOL Copybook Design", level:"Intermediate",
      content:`Copybooks are shared data definitions included at compile time. Good design is critical.

What Goes in a Copybook:
  - Record layouts for files (one copybook per file)
  - DCLGEN for DB2 tables (auto-generated)
  - SQLCA and other system areas
  - Common constants and configuration values
  - Shared data structures for CALL parameters

Naming Convention:
  CUSTREC — Customer record layout
  DCUSTMR — DCLGEN for CUSTOMER table
  WSCOMON — Common working storage constants

Using REPLACING:
  Design copybooks with tag placeholders:
  05 :TAG:-ID PIC 9(8).
  Then: COPY GENREC REPLACING ==:TAG:== BY ==CUST==
  Result: 05 CUST-ID PIC 9(8).
  Same copybook, different prefixes — reduces duplication.

Version Control:
  One source of truth. Change the copybook → recompile all affected programs.
  Track which programs use which copybooks (XREF listing).

Common Mistakes:
  - Duplicating record layouts instead of using copybooks
  - Including VALUE clauses in FILE SECTION copybooks
  - Not recompiling all programs after copybook change

Pro Tip: Run a compile of ALL programs using a changed copybook. Missing even one causes production ABENDs.`,
      code:`      *    Copybook: CUSTREC
      *    (stored in PDS library)
           05  CUST-ID            PIC 9(8).
           05  CUST-NAME          PIC X(30).
           05  CUST-ADDR.
               10  CUST-STREET    PIC X(40).
               10  CUST-CITY      PIC X(20).
               10  CUST-STATE     PIC XX.
               10  CUST-ZIP       PIC 9(5).
           05  CUST-BALANCE       PIC S9(9)V99 COMP-3.
      *
      *    In the program:
           COPY CUSTREC.
      *
      *    With REPLACING:
           COPY GENREC REPLACING ==:PFX:== BY ==INP==.
      *    :PFX:-ID becomes INP-ID`
    },

    { title:"Handling Multiple Return Codes", level:"Intermediate",
      content:`Production programs must handle return codes from every called program and utility.

Setting Return Codes:
  MOVE 0 TO RETURN-CODE — Success
  MOVE 4 TO RETURN-CODE — Warning
  MOVE 8 TO RETURN-CODE — Error (processing continued)
  MOVE 12 TO RETURN-CODE — Severe error
  MOVE 16 TO RETURN-CODE — Terminal error

Checking After CALL:
  CALL 'SUBPROG' USING WS-DATA
  EVALUATE RETURN-CODE
    WHEN 0    CONTINUE
    WHEN 4    ADD 1 TO WS-WARN-COUNT
    WHEN 8    PERFORM LOG-ERROR
    WHEN OTHER
      DISPLAY 'FATAL: RC=' RETURN-CODE
      MOVE 16 TO RETURN-CODE
      STOP RUN
  END-EVALUATE

Max Return Code Pattern:
  Track the highest RC throughout the program:
  IF RETURN-CODE > WS-MAX-RC
    MOVE RETURN-CODE TO WS-MAX-RC
  END-IF
  At end: MOVE WS-MAX-RC TO RETURN-CODE

JCL COND Interaction:
  JCL COND=(4,LT) means: skip if prior RC > 4
  So RC=0 or 4 continues. RC=8+ stops dependent steps.

Pro Tip: Always set RETURN-CODE before STOP RUN. JCL uses it for conditional step execution.`,
      code:`       01  WS-MAX-RC     PIC S9(4) COMP VALUE 0.
      *
           CALL 'VALIDATE' USING WS-REC
           IF RETURN-CODE > WS-MAX-RC
               MOVE RETURN-CODE TO WS-MAX-RC
           END-IF
      *
           CALL 'PROCESS' USING WS-REC
           IF RETURN-CODE > WS-MAX-RC
               MOVE RETURN-CODE TO WS-MAX-RC
           END-IF
      *
      *    Set final RC for JCL:
           MOVE WS-MAX-RC TO RETURN-CODE
           DISPLAY 'FINAL RC: ' RETURN-CODE
           STOP RUN`
    },


    { title:"COBOL Interview Q&A (40+)", level:"All Levels",
      content:`COBOL Interview Questions — 40+ Q&A organized by level.

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

💡 Study Tip: Master COMP-3, FILE STATUS, EVALUATE, COPY, DB2 interaction, and S0C7 prevention.`,
      code:`      *    Classic read-process-write pattern:
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
           STOP RUN.`
    },

    { title:"COBOL Cheat Sheet", level:"All Levels",
      content:`COBOL Quick Reference — Bookmark this.

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
IGYCRCTL PARM='LIB,MAP,XREF,OFFSET'`,
      code:`      *    COBOL TEMPLATE:
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
           STOP RUN.`
    }
  ]
};
