export const REXX_TOPIC = {
  id:"rexx", icon:"🧩", title:"REXX", subtitle:"Restructured Extended Executor", color:"#f97316", level:"Beginner → Expert",
  description:"The Swiss-army-knife scripting language of z/OS. Automate anything on TSO, ISPF, batch, and beyond.",
  sections:[
    { title:"REXX Fundamentals", level:"Beginner",
      content:`REXX (Restructured Extended Executor) is a powerful, interpreted scripting language created by Mike Cowlishaw at IBM in 1979. On z/OS, REXX is the primary automation and scripting language.

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
  DROP x resets variable to uninitialized state.`
    },
    { title:"REXX Language Reference", level:"Beginner",
      code:`/* REXX - Language Basics */

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
IF active \\= 0 THEN SAY "Active"`,
      content:`REXX Built-in Functions (Selected):

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
  X2D(hex) — hex to decimal`
    },
    { title:"Control Structures", level:"Beginner",
      code:`/* REXX - Control Structures */

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
END`,
      content:`Control Structures:

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
  No operation — placeholder in SELECT/IF.`
    },
    { title:"Stems (Arrays & Structures)", level:"Intermediate",
      code:`/* REXX - Stems (Compound Variables) */

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
PULL item   /* item = "FIRST" */`,
      content:`Stems (Compound Variables):

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
  QUEUED() — number of items in queue`
    },
    { title:"PARSE Instruction", level:"Intermediate",
      code:`/* REXX - PARSE (the most powerful instruction) */

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
SAY "Running:" exec_name "on" os`,
      content:`PARSE — REXX's Most Powerful Instruction:

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
  It's the key to REXX's text processing power.`
    },
    { title:"Functions & Subroutines", level:"Intermediate",
      code:`/* REXX - Functions & Subroutines */

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
  EXIT 12`,
      content:`Functions and Subroutines:

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
  TIME('L') — long: 14:30:45.123456`
    },
    { title:"TSO & ISPF Integration", level:"Intermediate",
      code:`/* REXX - TSO/ISPF Integration */

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
ADDRESS ISPEXEC "TBDISPL MYTABLE PANEL(TBLPANEL)"`,
      content:`TSO & ISPF Integration:

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
ADDRESS ISREDIT — ISPF edit macro commands`
    },
    { title:"REXX Batch Execution", level:"Intermediate",
      code:`//* JCL to run REXX in batch using IRXJCL
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
//SYSTSPRT DD SYSOUT=*`,
      content:`Running REXX in Batch:

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
  EXIT 0 = success, EXIT 8 = error, etc.`
    },
    { title:"REXX Edit Macros", level:"Advanced",
      code:`/* REXX - ISPF Edit Macro */
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

ADDRESS ISREDIT "END"`,
      content:`ISPF Edit Macros in REXX:

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
  Insert debug DISPLAY statements`
    },
    { title:"Advanced REXX Patterns", level:"Advanced",
      content:`Advanced REXX Techniques:

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
   Available as external function for pattern matching.`
    },
    { title:"Interview Questions", level:"All Levels",
      content:`REXX Interview Questions — 25+ Q&A.

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
A: SIGNAL ON ERROR/SYNTAX/NOVALUE. Trap RC from commands. IF RC \= 0 THEN handle error.

💡 Study Tip: Know EXECIO, OUTTRAP, stem variables, and PARSE — these are the most-used REXX features.`,
    },

    { title:"REXX Cheat Sheet", level:"All Levels",
      content:`REXX Quick Reference — Cheat Sheet

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
PARSE VALUE expr WITH var1 ',' var2`,
    },
  ]
};
