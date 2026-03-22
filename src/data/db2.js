export const DB2_TOPIC = {
  id:"db2", icon:"🏛️", title:"DB2", subtitle:"Relational Database for z/OS", color:"#0ea5e9", level:"Beginner → Expert",
  description:"IBM's crown jewel database. Petabytes of data. Millions of transactions per second. Zero downtime.",
  sections:[
    { title:"DB2 Architecture", level:"Beginner",
      content:`DB2 for z/OS is IBM's flagship relational database management system. It powers the most critical applications in banking, insurance, healthcare, and government — handling millions of transactions per second with legendary reliability.

DB2 Architecture — Major Components:

1. System Services:
   • Log Manager — Writes all changes to active logs for recovery
   • Buffer Manager — Manages buffer pools (data cached in memory)
   • Lock Manager (IRLM) — Controls concurrent access to data
   • Recovery Manager — Ensures data integrity after failures

2. Database Services:
   • Relational Data System (RDS) — SQL optimizer and executor
   • Data Manager — Reads/writes data pages from/to disk
   • Buffer Manager — Caches pages in buffer pools

3. Distributed Data Facility (DDF):
   • Handles distributed SQL (DRDA protocol)
   • Allows remote applications to access DB2 data
   • Enables DB2-to-DB2 and DB2-to-other-DBMS connections

DB2 Address Spaces:
  ssnmDBM1 — Database Services (main DB2 engine)
  ssnmMSTR — System Services (log, checkpoint, recovery)
  ssnmDIST — Distributed Data Facility
  IRLM     — Internal Resource Lock Manager
  (ssn = DB2 subsystem name, e.g., DB2P for production)

Storage Hierarchy:
  Database → Tablespace → Table → Page → Row
  Database → Indexspace → Index → Page → Entry

  Tablespace: Physical storage container for table data
  Indexspace: Physical storage for index entries
  Both stored as VSAM linear datasets (LDS)

Buffer Pools:
  BP0-BP49: 4K page buffer pools
  BP8K0-BP8K9: 8K page pools
  BP16K0-BP16K9: 16K page pools
  BP32K, BP32K1-BP32K9: 32K page pools

  Buffer pools are the PRIMARY performance lever in DB2.
  Data accessed from buffer pool = no disk I/O = fast.
  Data not in pool = physical read from disk = slow.

Logging:
  Active Log: Circular set of datasets for current changes
  Archive Log: Historical log datasets (on disk or tape)
  Every change is written to the log BEFORE the data page — Write-Ahead Logging.
  This guarantees recovery to any point in time.`
    },
    { title:"SQL Fundamentals — SELECT", level:"Beginner",
      code:`-- Basic SELECT
SELECT EMPNO, LASTNAME, SALARY
  FROM EMPLOYEE
  WHERE DEPT = 'D11'
  ORDER BY SALARY DESC;

-- Column aliases and expressions
SELECT EMPNO,
       LASTNAME || ', ' || FIRSTNME AS FULL_NAME,
       SALARY,
       SALARY * 12 AS ANNUAL_SALARY,
       SALARY * 0.20 AS TAX_ESTIMATE
  FROM EMPLOYEE
  WHERE SALARY > 50000;

-- BETWEEN, IN, LIKE
SELECT * FROM EMPLOYEE
  WHERE HIREDATE BETWEEN '2020-01-01' AND '2024-12-31'
    AND DEPT IN ('D11', 'D21', 'E01')
    AND LASTNAME LIKE 'SM%';

-- IS NULL check
SELECT EMPNO, LASTNAME, COMM
  FROM EMPLOYEE
  WHERE COMM IS NULL;

-- Aggregate functions
SELECT DEPT,
       COUNT(*) AS EMP_COUNT,
       AVG(SALARY) AS AVG_SAL,
       MAX(SALARY) AS MAX_SAL,
       MIN(SALARY) AS MIN_SAL,
       SUM(SALARY) AS TOTAL_SAL
  FROM EMPLOYEE
  GROUP BY DEPT
  HAVING COUNT(*) > 5
  ORDER BY AVG_SAL DESC;

-- CASE expression
SELECT EMPNO, LASTNAME, SALARY,
       CASE
         WHEN SALARY > 100000 THEN 'EXECUTIVE'
         WHEN SALARY > 70000  THEN 'SENIOR'
         WHEN SALARY > 40000  THEN 'MID-LEVEL'
         ELSE 'ENTRY-LEVEL'
       END AS SALARY_BAND
  FROM EMPLOYEE;

-- Scalar functions
SELECT EMPNO,
       UPPER(LASTNAME) AS NAME_UPPER,
       LENGTH(LASTNAME) AS NAME_LEN,
       SUBSTR(EMPNO, 1, 3) AS EMP_PREFIX,
       CHAR(SALARY, '999,999.99') AS SAL_FORMATTED,
       CURRENT DATE AS TODAY,
       DAYS(CURRENT DATE) - DAYS(HIREDATE) AS DAYS_EMPLOYED
  FROM EMPLOYEE;`,
      content:`SQL SELECT — Retrieving Data:

SELECT is the most used SQL statement. Master it thoroughly.

Clause Order:
  SELECT columns       — What to retrieve
  FROM tables          — Where to get it
  WHERE condition      — Filter rows
  GROUP BY columns     — Group for aggregation
  HAVING condition     — Filter groups (after GROUP BY)
  ORDER BY columns     — Sort results
  FETCH FIRST n ROWS ONLY — Limit rows returned

WHERE Operators:
  = , <> , < , > , <= , >=   — Comparison
  BETWEEN low AND high       — Range (inclusive)
  IN (val1, val2, val3)      — Set membership
  LIKE 'pattern'              — Pattern match (% = any, _ = single char)
  IS NULL / IS NOT NULL      — Null check
  EXISTS (subquery)          — Existence check
  AND, OR, NOT               — Logical operators

Aggregate Functions:
  COUNT(*) — Count all rows
  COUNT(column) — Count non-null values
  COUNT(DISTINCT column) — Count unique values
  SUM(column), AVG(column), MAX(column), MIN(column)

Important DB2 Specifics:
  • CURRENT DATE, CURRENT TIME, CURRENT TIMESTAMP — system values
  • DAYS(date) — converts date to integer (days since year 1)
  • CHAR(numeric, format) — format numbers as character
  • SUBSTR(string, start, length) — extract substring
  • COALESCE(col, default) — return first non-null value
  • NULLIF(expr1, expr2) — return null if equal
  • VALUE(col, default) — DB2 synonym for COALESCE`
    },
    { title:"SQL — JOINs & Subqueries", level:"Beginner",
      code:`-- INNER JOIN (only matching rows)
SELECT E.EMPNO, E.LASTNAME, D.DEPTNAME
  FROM EMPLOYEE E
  INNER JOIN DEPARTMENT D
    ON E.DEPT = D.DEPTNO;

-- LEFT OUTER JOIN (all employees, even without dept)
SELECT E.EMPNO, E.LASTNAME,
       COALESCE(D.DEPTNAME, 'UNASSIGNED') AS DEPT
  FROM EMPLOYEE E
  LEFT JOIN DEPARTMENT D
    ON E.DEPT = D.DEPTNO;

-- Multi-table JOIN
SELECT E.EMPNO, E.LASTNAME, D.DEPTNAME,
       P.PROJNAME, A.ACTDESC
  FROM EMPLOYEE E
  JOIN DEPARTMENT D ON E.DEPT = D.DEPTNO
  JOIN EMP_PROJECT EP ON E.EMPNO = EP.EMPNO
  JOIN PROJECT P ON EP.PROJNO = P.PROJNO
  JOIN ACTIVITY A ON EP.ACTNO = A.ACTNO
  WHERE D.DEPTNAME = 'PLANNING';

-- Correlated subquery
SELECT EMPNO, LASTNAME, SALARY, DEPT
  FROM EMPLOYEE E
  WHERE SALARY > (SELECT AVG(SALARY)
                    FROM EMPLOYEE
                    WHERE DEPT = E.DEPT);

-- EXISTS subquery
SELECT D.DEPTNO, D.DEPTNAME
  FROM DEPARTMENT D
  WHERE EXISTS (SELECT 1 FROM EMPLOYEE E
                  WHERE E.DEPT = D.DEPTNO
                    AND E.SALARY > 100000);

-- NOT EXISTS (departments with no employees)
SELECT D.DEPTNO, D.DEPTNAME
  FROM DEPARTMENT D
  WHERE NOT EXISTS (SELECT 1 FROM EMPLOYEE E
                      WHERE E.DEPT = D.DEPTNO);

-- Subquery in SELECT (scalar subquery)
SELECT EMPNO, LASTNAME, SALARY,
       (SELECT AVG(SALARY) FROM EMPLOYEE
          WHERE DEPT = E.DEPT) AS DEPT_AVG
  FROM EMPLOYEE E;

-- UNION (combine result sets)
SELECT EMPNO, LASTNAME, 'ACTIVE' AS STATUS
  FROM EMPLOYEE WHERE STATUS = 'A'
UNION ALL
SELECT EMPNO, LASTNAME, 'RETIRED' AS STATUS
  FROM RETIREES;`,
      content:`JOINs — Combining Tables:

INNER JOIN: Returns only rows that have matches in both tables.
LEFT OUTER JOIN: Returns all rows from left table, matched with right (NULLs for no match).
RIGHT OUTER JOIN: Returns all rows from right table.
FULL OUTER JOIN: Returns all rows from both tables.
CROSS JOIN: Cartesian product (every row × every row). Rarely used.

JOIN Performance Tips:
  • Always join on indexed columns
  • Use INNER JOIN when possible (more restrictive = faster)
  • Avoid joining on expressions or functions (prevents index use)
  • JOIN order matters — DB2 optimizer usually handles this, but awareness helps

Subqueries:
  Non-correlated: Executes once, result used for outer query
  Correlated: Executes once per row of outer query (can be slow)

  IN vs EXISTS:
  • Use EXISTS for correlated subqueries (often faster)
  • Use IN for small sets of values
  • NOT EXISTS is usually faster than NOT IN (NULL handling)

UNION vs UNION ALL:
  UNION: Removes duplicates (requires sort)
  UNION ALL: Keeps all rows (faster — no sort needed)
  Always use UNION ALL unless you specifically need deduplication.

Common Table Expressions (CTE):
  WITH dept_stats AS (
    SELECT DEPT, AVG(SALARY) AS AVG_SAL
      FROM EMPLOYEE GROUP BY DEPT
  )
  SELECT E.EMPNO, E.LASTNAME, E.SALARY, D.AVG_SAL
    FROM EMPLOYEE E
    JOIN dept_stats D ON E.DEPT = D.DEPT
    WHERE E.SALARY > D.AVG_SAL * 1.5;`
    },
    { title:"SQL — INSERT, UPDATE, DELETE", level:"Beginner",
      code:`-- INSERT single row
INSERT INTO EMPLOYEE
  (EMPNO, FIRSTNME, LASTNAME, DEPT, SALARY, HIREDATE)
  VALUES
  ('999001', 'JOHN', 'SMITH', 'D11', 55000.00, CURRENT DATE);

-- INSERT from SELECT
INSERT INTO EMPLOYEE_ARCHIVE
  SELECT * FROM EMPLOYEE
    WHERE HIREDATE < '2010-01-01';

-- UPDATE
UPDATE EMPLOYEE
   SET SALARY = SALARY * 1.05,
       BONUS = SALARY * 0.10
 WHERE DEPT = 'D11'
   AND SALARY < 60000;

-- UPDATE with subquery
UPDATE EMPLOYEE E
   SET SALARY = (SELECT AVG(SALARY) * 1.1
                   FROM EMPLOYEE
                   WHERE DEPT = E.DEPT)
 WHERE E.JOB = 'TRAINEE';

-- DELETE
DELETE FROM EMPLOYEE
 WHERE EMPNO = '999001';

-- DELETE with subquery
DELETE FROM EMPLOYEE
 WHERE DEPT IN (SELECT DEPTNO FROM DEPARTMENT
                  WHERE STATUS = 'CLOSED');

-- MERGE (UPSERT) — insert or update
MERGE INTO EMPLOYEE_TARGET T
USING EMPLOYEE_SOURCE S
ON T.EMPNO = S.EMPNO
WHEN MATCHED THEN
  UPDATE SET T.SALARY = S.SALARY,
             T.DEPT = S.DEPT
WHEN NOT MATCHED THEN
  INSERT (EMPNO, FIRSTNME, LASTNAME, DEPT, SALARY)
  VALUES (S.EMPNO, S.FIRSTNME, S.LASTNAME,
          S.DEPT, S.SALARY);`,
      content:`Data Modification Statements:

INSERT:
  Adds new rows to a table. Two forms:
  1. INSERT ... VALUES — single row with literal values
  2. INSERT ... SELECT — bulk insert from another table/query
  
  Important: The INSERT must satisfy all constraints (primary key uniqueness, foreign keys, check constraints, NOT NULL).

UPDATE:
  Modifies existing rows. Always use WHERE to avoid updating all rows.
  SET clause can reference other columns, expressions, and subqueries.
  
  ⚠️ UPDATE without WHERE updates EVERY ROW. Always double-check.

DELETE:
  Removes rows from a table. Always use WHERE.
  
  ⚠️ DELETE without WHERE deletes ALL ROWS. Be extremely careful.

MERGE (UPSERT):
  Combines INSERT and UPDATE in one statement.
  If the key matches: UPDATE the row
  If the key doesn't match: INSERT a new row
  Very efficient for ETL/batch processing.

Transaction Control:
  By default in DB2, changes are not committed until you issue COMMIT.
  COMMIT — Make all changes permanent
  ROLLBACK — Undo all changes since last COMMIT
  
  In COBOL: Changes are committed when program ends normally.
  In CICS: EXEC CICS SYNCPOINT commits.
  In SPUFI/QMF: AUTO COMMIT option controls behavior.

Concurrency:
  DB2 uses page-level or row-level locking during modifications.
  ISOLATION levels control how much concurrent access is allowed:
  • CS (Cursor Stability) — Lock only the row being processed (default)
  • RR (Repeatable Read) — Lock all rows accessed until COMMIT
  • UR (Uncommitted Read) — No locks, can see uncommitted changes
  • RS (Read Stability) — Lock qualifying rows until COMMIT`
    },
    { title:"DB2 Objects — Tables, Indexes, Views", level:"Intermediate",
      code:`-- Create database and tablespace
CREATE DATABASE EMPDB;

CREATE TABLESPACE EMPTS
  IN EMPDB
  USING STOGROUP SYSDEFLT
  PRIQTY 7200
  SECQTY 3600
  BUFFERPOOL BP1
  LOCKSIZE ROW
  CLOSE NO
  COMPRESS YES;

-- Create table
CREATE TABLE EMPLOYEE (
  EMPNO     CHAR(6)        NOT NULL,
  FIRSTNME  VARCHAR(30)    NOT NULL,
  LASTNAME  VARCHAR(30)    NOT NULL,
  DEPT      CHAR(3),
  JOB       CHAR(8),
  SALARY    DECIMAL(9,2)   NOT NULL WITH DEFAULT 0,
  BONUS     DECIMAL(9,2)   WITH DEFAULT 0,
  COMM      DECIMAL(9,2),
  HIREDATE  DATE           NOT NULL WITH DEFAULT,
  STATUS    CHAR(1)        NOT NULL WITH DEFAULT 'A',
  CONSTRAINT PK_EMP PRIMARY KEY (EMPNO),
  CONSTRAINT FK_DEPT FOREIGN KEY (DEPT)
    REFERENCES DEPARTMENT(DEPTNO)
    ON DELETE SET NULL,
  CONSTRAINT CK_SALARY CHECK (SALARY >= 0),
  CONSTRAINT CK_STATUS CHECK (STATUS IN ('A','I','T'))
) IN EMPDB.EMPTS;

-- Create indexes
CREATE UNIQUE INDEX IX_EMP_PK
  ON EMPLOYEE (EMPNO)
  USING STOGROUP SYSDEFLT
  BUFFERPOOL BP0
  CLOSE NO
  CLUSTER;

CREATE INDEX IX_EMP_DEPT
  ON EMPLOYEE (DEPT, SALARY DESC)
  BUFFERPOOL BP0;

CREATE INDEX IX_EMP_NAME
  ON EMPLOYEE (LASTNAME, FIRSTNME)
  INCLUDE (DEPT, SALARY);

-- Create view
CREATE VIEW ACTIVE_EMPLOYEES AS
  SELECT EMPNO, FIRSTNME, LASTNAME, DEPT, SALARY
    FROM EMPLOYEE
    WHERE STATUS = 'A'
  WITH CHECK OPTION;

-- Create alias
CREATE ALIAS PROD.EMPLOYEE
  FOR TEST.EMPLOYEE;`,
      content:`DB2 Objects Hierarchy:

Stogroup → Database → Tablespace → Table
                    → Indexspace → Index

Stogroup: Defines the DASD volumes where data is stored.
Database: Logical container for related tablespaces and indexspaces.
Tablespace: Physical container for table data (one or more VSAM LDS datasets).
  Simple: One table per tablespace (legacy)
  Segmented: Multiple tables, each in segments (legacy)
  Partition-by-Range (PBR): Data partitioned by key range (modern, preferred)
  Partition-by-Growth (PBG): Automatically adds partitions as data grows
  Universal (UTS): Modern tablespace type (PBR or PBG)

Table: Standard relational table with columns and rows.
  Columns: Typed fields (CHAR, VARCHAR, INTEGER, DECIMAL, DATE, etc.)
  Constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL

Index: B-tree structure for fast data lookup.
  UNIQUE: No duplicate key values allowed
  CLUSTER: Data stored in physical order of this index (huge for sequential performance)
  INCLUDE: Store extra columns in index leaf (index-only access — avoid table I/O)
  Partitioned: Each partition has its own index partition

View: Stored SQL query that behaves like a table.
  WITH CHECK OPTION: Prevents inserting/updating rows that don't satisfy the view's WHERE.
  Views can be used for: security (restrict columns), simplification, data transformation.

Alias: Alternate name for a table or view. Useful for:
  • Pointing test programs to test tables without code changes
  • Simplifying long table names

Data Types:
  CHAR(n) — Fixed-length character (1-255)
  VARCHAR(n) — Variable-length character (1-32704)
  INTEGER / SMALLINT / BIGINT — Whole numbers
  DECIMAL(p,s) — Packed decimal (precision, scale)
  DATE / TIME / TIMESTAMP — Date/time types
  CLOB(n) — Character Large Object (up to 2GB)
  BLOB(n) — Binary Large Object (up to 2GB)
  XML — Native XML storage`
    },
    { title:"Embedded SQL in COBOL", level:"Intermediate",
      code:`       WORKING-STORAGE SECTION.
      *
      * --- Host Variables (shared with DB2) ---
           EXEC SQL INCLUDE SQLCA END-EXEC.
      *
       01  HV-EMPNO              PIC X(06).
       01  HV-LASTNAME           PIC X(30).
       01  HV-SALARY             PIC S9(07)V99 COMP-3.
       01  HV-DEPT               PIC X(03).
       01  HV-IND-COMM           PIC S9(04) COMP.
       01  HV-COMM               PIC S9(07)V99 COMP-3.
      *
      * --- Cursor declaration ---
           EXEC SQL
             DECLARE EMP_CURSOR CURSOR FOR
               SELECT EMPNO, LASTNAME, SALARY
                 FROM EMPLOYEE
                WHERE DEPT = :HV-DEPT
                ORDER BY SALARY DESC
           END-EXEC.
      *
       PROCEDURE DIVISION.
      *
      * --- Single row SELECT INTO ---
           MOVE '000010' TO HV-EMPNO
           EXEC SQL
             SELECT LASTNAME, SALARY, COMM
               INTO :HV-LASTNAME,
                    :HV-SALARY,
                    :HV-COMM :HV-IND-COMM
               FROM EMPLOYEE
              WHERE EMPNO = :HV-EMPNO
           END-EXEC
           EVALUATE SQLCODE
             WHEN 0
               DISPLAY 'FOUND: ' HV-LASTNAME
               IF HV-IND-COMM < 0
                 DISPLAY 'COMMISSION IS NULL'
               END-IF
             WHEN 100
               DISPLAY 'NOT FOUND'
             WHEN OTHER
               DISPLAY 'SQL ERROR: ' SQLCODE
           END-EVALUATE
      *
      * --- Cursor processing (multiple rows) ---
           MOVE 'D11' TO HV-DEPT
           EXEC SQL OPEN EMP_CURSOR END-EXEC
      *
           PERFORM UNTIL SQLCODE NOT = 0
             EXEC SQL
               FETCH EMP_CURSOR
                 INTO :HV-EMPNO, :HV-LASTNAME, :HV-SALARY
             END-EXEC
             IF SQLCODE = 0
               DISPLAY HV-EMPNO ' ' HV-LASTNAME ' ' HV-SALARY
             END-IF
           END-PERFORM
      *
           EXEC SQL CLOSE EMP_CURSOR END-EXEC
      *
      * --- INSERT ---
           MOVE '999001' TO HV-EMPNO
           MOVE 'NEWGUY' TO HV-LASTNAME
           MOVE 50000.00 TO HV-SALARY
           EXEC SQL
             INSERT INTO EMPLOYEE (EMPNO, LASTNAME, SALARY)
               VALUES (:HV-EMPNO, :HV-LASTNAME, :HV-SALARY)
           END-EXEC
           IF SQLCODE = 0
             EXEC SQL COMMIT END-EXEC
           ELSE
             DISPLAY 'INSERT FAILED: ' SQLCODE
             EXEC SQL ROLLBACK END-EXEC
           END-IF.`,
      content:`Embedded SQL — COBOL Programs with DB2:

Most mainframe DB2 access comes from COBOL programs with embedded SQL. The SQL statements are mixed with COBOL code, delimited by EXEC SQL ... END-EXEC.

Host Variables:
  COBOL variables shared with DB2. Prefixed with : in SQL statements.
  Declared in WORKING-STORAGE just like regular COBOL variables.
  Must match DB2 column data types:
    CHAR/VARCHAR → PIC X(n)
    INTEGER      → PIC S9(9) COMP
    SMALLINT     → PIC S9(4) COMP
    DECIMAL(p,s) → PIC S9(p-s)V9(s) COMP-3
    DATE         → PIC X(10) (format: YYYY-MM-DD)

Indicator Variables:
  Detect NULL values. PIC S9(4) COMP.
  :HV-COMM :HV-IND-COMM — if IND < 0, the value is NULL
  Always use indicators for nullable columns!

SQLCA (SQL Communication Area):
  EXEC SQL INCLUDE SQLCA END-EXEC
  Contains return information after every SQL statement:
  • SQLCODE: 0 = success, 100 = not found, negative = error
  • SQLERRD(3): Number of rows affected by INSERT/UPDATE/DELETE
  • SQLWARN flags: Warning indicators

Critical SQLCODE Values:
  0     — Success
  100   — Row not found / End of cursor
  -180  — Invalid date/time/timestamp
  -204  — Object not found (table doesn't exist)
  -206  — Column not found
  -305  — Null value without indicator
  -803  — Duplicate key on INSERT
  -811  — More than one row for SELECT INTO
  -818  — Plan/program timestamp mismatch (needs rebind)
  -904  — Resource unavailable
  -911  — Deadlock or timeout (rollback occurred)
  -913  — Deadlock detected

Cursors:
  For multi-row result sets, use cursors:
  1. DECLARE — Define the SQL query
  2. OPEN — Execute the query, create result set
  3. FETCH — Retrieve one row at a time
  4. CLOSE — Release resources

  Cursor types:
  • Static: Read-only, can scroll
  • Dynamic: Updatable (FOR UPDATE OF column)
  • WITH HOLD: Keep open across COMMITs`
    },
    { title:"DB2 BIND & Application Program Lifecycle", level:"Intermediate",
      content:`The DB2 Application Lifecycle:

DB2 programs go through a unique build process because SQL statements must be processed by DB2 separately from the COBOL compiler.

1. PRECOMPILE (DB2 Precompiler — DSNHPC):
   • Scans COBOL source for EXEC SQL statements
   • Replaces SQL with COBOL CALL statements
   • Creates a DBRM (Database Request Module) containing the SQL
   • Creates modified COBOL source

2. COMPILE (COBOL Compiler — IGYCRCTL):
   • Compiles the modified COBOL source (no SQL — just CALL statements)
   • Creates an object module

3. LINK-EDIT (IEWBLINK):
   • Creates an executable load module
   • Links with DB2 runtime library (DSNELI)

4. BIND (DB2 BIND command):
   • Processes the DBRM (SQL statements)
   • DB2 optimizer creates an access path for each SQL statement
   • Creates a PACKAGE or PLAN
   • Access paths are stored in the DB2 catalog

   PLAN: A collection of packages. Programs run under a plan.
   PACKAGE: Access paths for one DBRM. Plans can include packages.

BIND Parameters:
  BIND PLAN(planname) — Create/replace a plan
  BIND PACKAGE(collection.packagename) — Create/replace a package
  ACTION(REPLACE) — Replace if exists, create if not
  ISOLATION(CS) — Cursor Stability (default)
  VALIDATE(BIND) — Validate SQL at BIND time
  ACQUIRE(USE) — Acquire locks when tables are accessed (not at allocation)
  RELEASE(COMMIT) — Release locks at COMMIT

When to REBIND:
  • After changing SQL in the program (new DBRM)
  • After creating/dropping indexes (access paths may change)
  • After RUNSTATS (updated statistics may improve access paths)
  • After DB2 version upgrade
  • Periodically, to pick up new statistics

FREE:
  FREE PLAN(planname) — Remove a plan
  FREE PACKAGE(collection.packagename) — Remove a package`,
      code:`//* ═══════════════════════════════════════════════════════
//* FULL DB2 COBOL BUILD: PRECOMPILE → COMPILE → LINK → BIND
//* ═══════════════════════════════════════════════════════
//DB2BUILD JOB ,'DB2 BUILD',CLASS=A,NOTIFY=&SYSUID
//*
//* STEP 1: DB2 PRECOMPILE
//PREC     EXEC PGM=DSNHPC,
//              PARM='HOST(IBMCOB),APOST,SOURCE,XREF'
//STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
//DBRMLIB  DD DSN=MY.DBRMLIB(PAYROLL),DISP=SHR
//SYSCIN   DD DSN=&&MODSRC,DISP=(NEW,PASS),
//            SPACE=(CYL,(5,5))
//SYSIN    DD DSN=MY.COBOL.SOURCE(PAYROLL),DISP=SHR
//SYSLIB   DD DSN=MY.COPYBOOK.LIB,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSUT1   DD UNIT=SYSDA,SPACE=(CYL,(2,2))
//SYSUT2   DD UNIT=SYSDA,SPACE=(CYL,(2,2))
//*
//* STEP 2: COBOL COMPILE
//COMP     EXEC PGM=IGYCRCTL,COND=(8,LT,PREC),
//              PARM='LIB,APOST,MAP,XREF,OFFSET'
//STEPLIB  DD DSN=IGY.SIGYCOMP,DISP=SHR
//SYSIN    DD DSN=&&MODSRC,DISP=(OLD,DELETE)
//SYSLIB   DD DSN=MY.COPYBOOK.LIB,DISP=SHR
//SYSLIN   DD DSN=&&OBJ,DISP=(NEW,PASS),
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
//* STEP 3: LINK-EDIT
//LKED     EXEC PGM=IEWBLINK,COND=(8,LT,COMP),
//              PARM='LIST,MAP'
//SYSLIB   DD DSN=CEE.SCEELKED,DISP=SHR
//         DD DSN=DB2.SDSNLOAD,DISP=SHR
//SYSLIN   DD DSN=&&OBJ,DISP=(OLD,DELETE)
//         DD *
  INCLUDE SYSLIB(DSNELI)
/*
//SYSLMOD  DD DSN=MY.LOADLIB(PAYROLL),DISP=SHR
//SYSPRINT DD SYSOUT=*
//*
//* STEP 4: BIND PACKAGE
//BIND     EXEC PGM=IKJEFT01,COND=(4,LT,LKED)
//STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
//DBRMLIB  DD DSN=MY.DBRMLIB,DISP=SHR
//SYSTSPRT DD SYSOUT=*
//SYSTSIN  DD *
  DSN SYSTEM(DB2P)
  BIND PACKAGE(MYPKG) -
       MEMBER(PAYROLL) -
       ACTION(REPLACE) -
       ISOLATION(CS) -
       VALIDATE(BIND) -
       RELEASE(COMMIT)
  BIND PLAN(PAYPLAN) -
       PKLIST(MYPKG.*) -
       ACTION(REPLACE) -
       ISOLATION(CS)
  END
/*`
    },
    { title:"DB2 Access Tools — SPUFI & QMF", level:"Beginner",
      content:`Interactive SQL Tools:

SPUFI (SQL Processor Using File Input):
  Built into ISPF. Execute SQL statements interactively.
  
  How to use:
  1. Go to DB2I Primary Option Menu (usually ISPF option DB2)
  2. Select option 1 (SPUFI)
  3. Enter the input dataset (PDS member with your SQL)
  4. Enter the output dataset (where results go)
  5. Set parameters (auto-commit, max rows, etc.)
  6. Press Enter — SQL executes and results appear

  SPUFI is basic but always available. Good for:
  • Ad-hoc queries
  • DDL (CREATE, ALTER, DROP)
  • Quick data verification
  • Database administration tasks

QMF (Query Management Facility):
  More powerful interactive tool with formatting capabilities.
  
  Features:
  • Interactive query editing with prompts
  • Formatted reports (column headers, alignment, totals)
  • FORMS — Define report layouts
  • PROCS — Save and run query sequences
  • Export to PC formats
  
  QMF Commands:
  RUN QUERY — Execute the current query
  SAVE QUERY AS name — Save for reuse
  DISPLAY TABLE tablename — Quick browse
  PRINT REPORT — Print formatted output
  EXPORT DATA — Export results

DB2 Command Line (DSN):
  Batch access through IKJEFT01 utility:
  DSN SYSTEM(ssid)
  RUN PROGRAM(pgmname) PLAN(planname)
  END

  Used in JCL to run DB2 batch programs.

Other Tools:
  • Data Studio — IBM's modern graphical IDE
  • DSNTEP2 / DSNTEP4 — Batch SQL execution utilities
  • File Manager for DB2 — Browse/edit tables
  • BMC/CA products — Third-party management tools`
    },
    { title:"DB2 Performance & EXPLAIN", level:"Advanced",
      code:`-- Run EXPLAIN to see access path
EXPLAIN ALL SET QUERYNO = 1 FOR
  SELECT E.EMPNO, E.LASTNAME, D.DEPTNAME
    FROM EMPLOYEE E
    JOIN DEPARTMENT D ON E.DEPT = D.DEPTNO
   WHERE E.SALARY > 80000
   ORDER BY E.SALARY DESC;

-- Check PLAN_TABLE for access path
SELECT QUERYNO, QBLOCKNO, PLANNO,
       METHOD, TNAME, ACCESSTYPE,
       MATCHCOLS, ACCESSNAME,
       INDEXONLY, SORTC_GROUPBY,
       SORTC_ORDERBY, SORTN_JOIN
  FROM PLAN_TABLE
 WHERE QUERYNO = 1
 ORDER BY QUERYNO, QBLOCKNO, PLANNO;

-- RUNSTATS — Update optimizer statistics
//RUNSTAT  EXEC PGM=DSNUTILB,
//         PARM='DB2P,RUNSTATS'
//STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  RUNSTATS TABLESPACE EMPDB.EMPTS
    TABLE(EMPLOYEE)
    INDEX(ALL)
    SHRLEVEL REFERENCE
    UPDATE ALL
    REPORT YES
/*`,
      content:`DB2 Performance Tuning:

The DB2 Optimizer:
  DB2's cost-based optimizer chooses the most efficient way to execute each SQL statement. It considers: indexes available, table sizes, data distribution, buffer pool sizes, and more.

EXPLAIN:
  Shows the access path chosen by the optimizer. Critical for performance tuning.
  
  ACCESSTYPE values:
  I  — Index scan (best for selective queries)
  I1 — One-index scan  
  R  — Tablespace scan (reads every page — slow for large tables)
  M  — Multiple index scan
  N  — Index scan using IN-list
  MX — Index scan with OR optimization

  MATCHCOLS: Number of index columns used in the predicate match.
  Higher = more selective = better performance.

  INDEXONLY = Y: The query was answered entirely from the index
  without accessing the table data pages. This is the best case!

RUNSTATS:
  Updates the DB2 catalog with current table and index statistics.
  The optimizer uses these statistics to choose access paths.
  Run RUNSTATS after significant data changes, before REBIND.

  Key statistics collected:
  • CARDF — Number of rows in the table
  • NLEAF — Number of leaf pages in index
  • NLEVELS — Number of index levels
  • FULLKEYCARDF — Number of distinct key values
  • CLUSTERRATIOF — How well data is clustered (0-1, higher is better)
  • Column distribution statistics (COLCARDF, FREQ/QUANTILE stats)

Performance Checklist:
  1. Use appropriate indexes (most important)
  2. Write efficient SQL (avoid SELECT *, use WHERE)
  3. Run RUNSTATS regularly
  4. REBIND after RUNSTATS and index changes
  5. Size buffer pools adequately
  6. Use EXPLAIN to verify access paths
  7. Avoid Stage 2 predicates (non-indexable)
  8. Keep transactions short (reduce lock contention)
  9. Use appropriate ISOLATION level
  10. Monitor with DB2 PM / OMEGAMON`
    },
    { title:"DB2 Utilities", level:"Advanced",
      content:`DB2 Utilities — Database Administration:

DB2 provides powerful utilities for data management, maintenance, and recovery. Run through JCL using DSNUTILB.

LOAD:
  High-speed bulk data loading into DB2 tables.
  Much faster than INSERT for large volumes.
  Options: REPLACE (delete + load), RESUME (append), LOG NO (no logging for speed)
  
  LOAD DATA REPLACE INTO TABLE EMPLOYEE
    (EMPNO POSITION(1:6) CHAR,
     LASTNAME POSITION(7:36) CHAR,
     SALARY POSITION(37:45) DECIMAL EXTERNAL)

UNLOAD:
  Extract data from DB2 tables to sequential files.
  Faster than SELECT for full table extracts.
  
  UNLOAD DATA FROM TABLE EMPLOYEE
    SHRLEVEL REFERENCE

REORG:
  Reorganize tablespace or indexspace to reclaim space and restore clustering order.
  Essential for maintaining performance after many inserts/updates/deletes.
  
  REORG TABLESPACE EMPDB.EMPTS
    SHRLEVEL REFERENCE
    LOG NO
    SORTDATA YES
    SORTKEYS YES

CHECK DATA:
  Verify referential integrity between tables.
  CHECK DATA TABLESPACE EMPDB.EMPTS
    SCOPE ALL

CHECK INDEX:
  Verify index consistency with table data.
  CHECK INDEX(IX_EMP_PK) SHRLEVEL REFERENCE

COPY:
  Create image copy backups of tablespaces.
  COPY TABLESPACE EMPDB.EMPTS
    FULL YES SHRLEVEL REFERENCE

RECOVER:
  Restore tablespace from image copy + apply log.
  RECOVER TABLESPACE EMPDB.EMPTS
    TORBA X'00000000000C'
    TOLOGPOINT X'00000000F1A2'

MODIFY:
  Delete old entries from the DB2 catalog (SYSIBM.SYSCOPY).
  MODIFY RECOVERY TABLESPACE EMPDB.EMPTS
    DELETE AGE(30)

Utility Execution:
  All utilities run through DSNUTILB:
  //UTILSTEP EXEC PGM=DSNUTILB,PARM='DB2P,utilname'
  //STEPLIB  DD DSN=DB2.SDSNLOAD,DISP=SHR
  //SYSPRINT DD SYSOUT=*
  //SYSIN    DD * (utility control statements)`
    },
    { title:"DB2 Locking & Concurrency", level:"Advanced",
      content:`DB2 Locking — Managing Concurrent Access:

DB2 uses a sophisticated locking mechanism to ensure data consistency when multiple applications access the same data simultaneously.

Lock Types:
  S (Share):     Read lock. Multiple share locks can coexist.
  U (Update):    Intent to update. Only one U lock allowed, but S locks can coexist.
  X (Exclusive): Write lock. No other locks allowed.
  IS/IX/SIX:     Intent locks at tablespace/table level.

Lock Granularity:
  Row Lock:   Locks individual rows (finest granularity)
  Page Lock:  Locks an entire 4K/8K/16K/32K page
  Table Lock: Locks an entire table
  Tablespace Lock: Locks the entire tablespace
  
  LOCKSIZE ROW (on tablespace) — Use row-level locking
  Finer granularity = more concurrency but more lock overhead

Lock Escalation:
  When too many row/page locks are held, DB2 escalates to table lock.
  This can cause unexpected contention.
  Threshold: LOCKMAX parameter on tablespace (or NUMLKTS system parameter)

Deadlocks:
  Transaction A locks Row 1, wants Row 2.
  Transaction B locks Row 2, wants Row 1.
  DB2 detects this and rolls back one transaction (SQLCODE -911).
  
  Prevention:
  • Access tables/rows in consistent order across programs
  • Keep transactions short
  • Use appropriate ISOLATION level
  • Avoid unnecessary UPDATE locks

Isolation Levels:
  CS (Cursor Stability): Default. Lock only current row. Minimal locking.
  RR (Repeatable Read): Lock all rows read until COMMIT. No phantom reads.
  RS (Read Stability): Lock qualifying rows. Middle ground.
  UR (Uncommitted Read): No locks for reads. Can see dirty data.
  
  Choose based on:
  • CS for most OLTP applications
  • RR for batch reporting needing consistency
  • UR for rough estimates where dirty reads are acceptable

Timeout:
  If a lock wait exceeds IRLMRWT (default ~30 seconds), the waiting transaction is rolled back with SQLCODE -913.

Lock Avoidance:
  DB2 uses techniques to avoid unnecessary locking:
  • Uncommitted read can avoid locks entirely
  • Lock avoidance through CLSN (Commit Log Sequence Number)
  • Optimistic locking patterns in application design`
    },
    { title:"DB2 Data Sharing & Sysplex", level:"Expert",
      content:`DB2 Data Sharing — Multiple DB2 Members Accessing Same Data:

In a Parallel Sysplex environment, multiple DB2 subsystems (members) can access the same database simultaneously. This provides:
  • Scalability: Add members to handle more workload
  • Availability: If one member fails, others continue
  • Workload balancing: Distribute work across members

Data Sharing Architecture:
  Coupling Facility (CF):
    Specialized hardware that provides:
    • Group Buffer Pool (GBP): Shared cache across members
    • Lock Structure: Shared locking across members
    • SCA (Shared Communications Area): Metadata coordination

  Each member has:
  • Its own buffer pool (local)
  • Access to Group Buffer Pools in CF
  • Connection to IRLM for cross-member locking

How Cross-Member Access Works:
  1. Member A updates a row (lock + local buffer + log)
  2. Member A writes changed page to GBP (so other members can see it)
  3. Member B reads the same row — checks GBP first, then disk
  4. CF lock manager coordinates so only one member updates at a time

Data Sharing Groups:
  DB2 members organized into groups. All members share:
  • Same catalog (SYSIBM tables)
  • Same data (tablespaces, indexspaces)
  • Same log (each member has own log, but recovery coordinates across group)

Benefits:
  • Near-continuous availability (planned maintenance without outage)
  • Linear scalability (add members for more throughput)
  • Workload isolation (different members for different workloads)
  • Disaster recovery (combined with GDPS)

Monitoring Data Sharing:
  • CF structure activity (GBP hit ratios)
  • Cross-invalidation (XI) rates
  • Lock contention between members
  • Inter-DB2 read/write activity`
    },

    { title:"SQL — WHERE Clause & Operators", level:"Beginner",
      content:`WHERE filters rows. Master the operators for effective queries.

Comparison: =, <>, <, >, <=, >=
Logical: AND, OR, NOT
Range: BETWEEN low AND high
List: IN ('A','B','C')
Pattern: LIKE 'pattern' (% = any chars, _ = one char)
Null: IS NULL, IS NOT NULL
Exists: EXISTS (subquery)

BETWEEN:
  WHERE SALARY BETWEEN 50000 AND 100000
  Inclusive on both ends.

IN:
  WHERE DEPT IN ('HR','FIN','IT')
  Cleaner than multiple OR conditions.

LIKE:
  WHERE NAME LIKE 'HAR%' — Starts with HAR
  WHERE NAME LIKE '%KRISH%' — Contains KRISH
  WHERE CODE LIKE 'A_B' — A, any char, B

IS NULL:
  WHERE MANAGER IS NULL
  Cannot use = NULL (always false in SQL).

Pro Tip: Put the most selective condition first in WHERE for better performance.`,
      code:`-- Various WHERE examples:
SELECT * FROM EMPLOYEE
WHERE DEPT = 'IT'
  AND SALARY > 60000
  AND HIRE_DATE BETWEEN '2020-01-01' AND '2026-12-31'
  AND STATUS IN ('A','L')
  AND NAME LIKE '%KUMAR%'
  AND MANAGER IS NOT NULL
ORDER BY SALARY DESC;`
    },

    { title:"SQL — Aggregate Functions", level:"Beginner",
      content:`Aggregate functions compute values across groups of rows.

Functions:
  COUNT(*) — Total rows
  COUNT(col) — Non-null values
  COUNT(DISTINCT col) — Unique values
  SUM(col) — Total of numeric column
  AVG(col) — Average
  MIN(col) — Minimum value
  MAX(col) — Maximum value

GROUP BY:
  SELECT DEPT, COUNT(*), AVG(SALARY)
  FROM EMPLOYEE
  GROUP BY DEPT

HAVING (filter groups):
  SELECT DEPT, COUNT(*) AS CNT
  FROM EMPLOYEE
  GROUP BY DEPT
  HAVING COUNT(*) > 10

Order of Operations:
  FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
  WHERE filters rows BEFORE grouping.
  HAVING filters groups AFTER grouping.

Pro Tip: Never put aggregate functions in WHERE — use HAVING instead.`,
      code:`-- Department summary:
SELECT DEPT,
       COUNT(*) AS EMP_COUNT,
       SUM(SALARY) AS TOTAL_SAL,
       AVG(SALARY) AS AVG_SAL,
       MIN(HIRE_DATE) AS EARLIEST,
       MAX(SALARY) AS HIGHEST
FROM EMPLOYEE
WHERE STATUS = 'A'
GROUP BY DEPT
HAVING COUNT(*) >= 5
ORDER BY AVG_SAL DESC;`
    },

    { title:"SQL — CASE Expression", level:"Beginner",
      content:`CASE provides if-then-else logic within SQL statements.

Simple CASE:
  CASE DEPT
    WHEN 'HR' THEN 'Human Resources'
    WHEN 'FIN' THEN 'Finance'
    ELSE 'Other'
  END

Searched CASE:
  CASE
    WHEN SALARY > 100000 THEN 'Executive'
    WHEN SALARY > 60000 THEN 'Senior'
    WHEN SALARY > 30000 THEN 'Mid-Level'
    ELSE 'Junior'
  END AS LEVEL

Uses:
  • SELECT (computed columns)
  • WHERE (conditional filtering)
  • ORDER BY (custom sort order)
  • UPDATE SET (conditional updates)

Pro Tip: CASE is evaluated top-down — first matching WHEN wins. Put specific conditions before general ones.`,
      code:`SELECT EMP_ID, NAME, SALARY,
  CASE
    WHEN SALARY > 100000 THEN 'HIGH'
    WHEN SALARY > 50000 THEN 'MED'
    ELSE 'LOW'
  END AS PAY_BAND,
  CASE DEPT
    WHEN 'IT' THEN SALARY * 1.10
    WHEN 'HR' THEN SALARY * 1.05
    ELSE SALARY * 1.03
  END AS PROJECTED_SAL
FROM EMPLOYEE
ORDER BY SALARY DESC;`
    },

    { title:"SQL — String Functions", level:"Beginner",
      content:`DB2 string functions for text manipulation in queries.

SUBSTR(str, pos, len) — Extract substring (1-based)
LENGTH(str) — String length
TRIM(str) — Remove leading/trailing spaces
LTRIM/RTRIM — Left/Right trim
UPPER(str) / LOWER(str) — Case conversion
CONCAT(s1, s2) or s1 || s2 — Concatenation
LOCATE(search, str) — Find position (0 if not found)
REPLACE(str, old, new) — Replace text
LEFT(str, n) / RIGHT(str, n) — Extract from left/right
CHAR(num) — Convert number to string
STRIP(str) — Remove blanks
COALESCE(a, b, c) — First non-null value

Pro Tip: COALESCE is essential for handling NULLs in output — COALESCE(MANAGER, 'NO MANAGER').`,
      code:`SELECT
  EMP_ID,
  TRIM(FIRST_NAME) || ' ' || TRIM(LAST_NAME) AS FULL_NAME,
  UPPER(DEPT) AS DEPT_UPPER,
  SUBSTR(HIRE_DATE, 1, 4) AS HIRE_YEAR,
  LENGTH(TRIM(EMAIL)) AS EMAIL_LEN,
  COALESCE(PHONE, 'N/A') AS PHONE,
  LOCATE('@', EMAIL) AS AT_POS
FROM EMPLOYEE
WHERE UPPER(LAST_NAME) LIKE 'K%';`
    },

    { title:"SQL — Date/Time Functions", level:"Beginner",
      content:`DB2 date arithmetic and formatting functions.

CURRENT DATE — Today's date
CURRENT TIME — Current time
CURRENT TIMESTAMP — Date + time + microseconds

Date Arithmetic:
  CURRENT DATE + 30 DAYS
  CURRENT DATE - 1 MONTH
  HIRE_DATE + 1 YEAR

DAYS(date) — Integer days since year 0
  DAYS(CURRENT DATE) - DAYS(HIRE_DATE) = tenure in days

DATE(expression) — Convert to date
YEAR(date), MONTH(date), DAY(date) — Extract parts
DAYOFWEEK(date) — 1=Sunday, 7=Saturday

Formatting:
  CHAR(date, ISO) → '2026-03-21'
  CHAR(date, USA) → '03/21/2026'
  CHAR(date, EUR) → '21.03.2026'

TIMESTAMPDIFF:
  TIMESTAMPDIFF(16, CHAR(CURRENT TIMESTAMP - HIRE_TIMESTAMP))
  Element 16 = days, 256 = months, 1 = fractions of second

Pro Tip: Use CURRENT DATE (not HOST variable) in SQL for consistency and optimizer efficiency.`,
      code:`SELECT EMP_ID, NAME, HIRE_DATE,
  DAYS(CURRENT DATE) - DAYS(HIRE_DATE) AS DAYS_EMPLOYED,
  YEAR(CURRENT DATE) - YEAR(HIRE_DATE) AS YEARS_APPROX,
  HIRE_DATE + 90 DAYS AS PROBATION_END,
  CASE
    WHEN HIRE_DATE + 1 YEAR > CURRENT DATE
    THEN 'NEW HIRE'
    ELSE 'VETERAN'
  END AS STATUS
FROM EMPLOYEE
WHERE HIRE_DATE >= CURRENT DATE - 5 YEARS
ORDER BY HIRE_DATE DESC;`
    },

    { title:"Cursors — Complete Guide", level:"Intermediate",
      content:`Cursors process multi-row result sets one row at a time in COBOL.

Lifecycle: DECLARE → OPEN → FETCH (loop) → CLOSE

DECLARE:
  EXEC SQL DECLARE C1 CURSOR FOR
    SELECT col1, col2 FROM table WHERE condition
    ORDER BY col1
  END-EXEC

WITH HOLD:
  DECLARE C1 CURSOR WITH HOLD FOR ...
  Keeps cursor open across COMMITs. Without HOLD, COMMIT closes all cursors.

FOR UPDATE OF:
  DECLARE C1 CURSOR FOR SELECT ... FOR UPDATE OF col
  Allows positioned UPDATE: UPDATE table SET col = val WHERE CURRENT OF C1

FOR FETCH ONLY:
  DECLARE C1 CURSOR FOR SELECT ... FOR FETCH ONLY
  Read-only. Allows DB2 to optimize (block fetch, parallelism).

SCROLLABLE:
  DECLARE C1 SCROLL CURSOR FOR ...
  FETCH FIRST, FETCH LAST, FETCH PRIOR, FETCH ABSOLUTE n

Best Practices:
  • Use FOR FETCH ONLY when not updating
  • Use WITH HOLD if COMMITting inside fetch loop
  • Close cursors as soon as done
  • Don't FETCH into too many host variables — use a structure

Pro Tip: COMMIT every 500-1000 rows to release locks. Use WITH HOLD so cursor stays open.`,
      code:`EXEC SQL DECLARE CUST_CUR CURSOR WITH HOLD FOR
  SELECT CUST_ID, CUST_NAME, BALANCE
  FROM CUSTOMER
  WHERE STATUS = :WS-STATUS
  ORDER BY CUST_NAME
  FOR FETCH ONLY
END-EXEC

EXEC SQL OPEN CUST_CUR END-EXEC

PERFORM UNTIL SQLCODE NOT = 0
  EXEC SQL FETCH CUST_CUR
    INTO :WS-ID, :WS-NAME, :WS-BAL
  END-EXEC
  IF SQLCODE = 0
    PERFORM PROCESS-ROW
    ADD 1 TO WS-COUNT
    IF WS-COUNT >= 1000
      EXEC SQL COMMIT END-EXEC
      MOVE 0 TO WS-COUNT
    END-IF
  END-IF
END-PERFORM

EXEC SQL CLOSE CUST_CUR END-EXEC`
    },

    { title:"NULL Handling", level:"Intermediate",
      content:`NULLs represent unknown/missing values. They require special handling in DB2.

Testing:
  WHERE col IS NULL — Has no value
  WHERE col IS NOT NULL — Has a value
  NEVER use col = NULL (always evaluates to UNKNOWN)

Indicator Variables (COBOL):
  01 WS-NAME PIC X(30).
  01 WS-NAME-IND PIC S9(4) COMP.
  
  EXEC SQL SELECT NAME INTO :WS-NAME :WS-NAME-IND FROM...
  IF WS-NAME-IND < 0 → value is NULL
  IF WS-NAME-IND >= 0 → value is valid

COALESCE:
  SELECT COALESCE(PHONE, 'NO PHONE') FROM EMPLOYEE
  Returns first non-null argument.

NULLIF:
  NULLIF(A, B) — Returns NULL if A = B, else returns A.
  Useful for avoiding divide-by-zero: SUM(AMT) / NULLIF(COUNT, 0)

NULLs in Aggregates:
  SUM, AVG, MIN, MAX ignore NULLs.
  COUNT(*) counts all rows. COUNT(col) counts non-null only.

NULLs in Sorting:
  DB2 sorts NULLs HIGH by default (last in ASC, first in DESC).

Pro Tip: SQLCODE -305 means you tried to FETCH a NULL into a host variable without an indicator. Always use indicator variables for nullable columns.`,
      code:`-- COBOL host variables with indicators:
EXEC SQL
  SELECT CUST_NAME, PHONE, EMAIL
  INTO :WS-NAME :WS-NAME-IND,
       :WS-PHONE :WS-PHONE-IND,
       :WS-EMAIL :WS-EMAIL-IND
  FROM CUSTOMER
  WHERE CUST_ID = :WS-CUST-ID
END-EXEC

IF WS-PHONE-IND < 0
  MOVE 'NO PHONE' TO WS-PHONE-DISPLAY
ELSE
  MOVE WS-PHONE TO WS-PHONE-DISPLAY
END-IF`
    },

    { title:"Stored Procedures", level:"Intermediate",
      content:`Stored procedures run SQL logic on the DB2 server, reducing network calls.

Creating:
  CREATE PROCEDURE schema.proc_name
    (IN p_id INTEGER, OUT p_name VARCHAR(30))
    LANGUAGE SQL
  BEGIN
    SELECT NAME INTO p_name FROM EMPLOYEE WHERE EMP_ID = p_id;
  END;

Calling from COBOL:
  EXEC SQL CALL schema.proc_name(:WS-ID, :WS-NAME) END-EXEC

Parameter Modes:
  IN — Input to procedure (read-only)
  OUT — Output from procedure
  INOUT — Both input and output

LANGUAGE SQL vs EXTERNAL:
  LANGUAGE SQL — Written in SQL PL (runs inside DB2)
  LANGUAGE COBOL — External COBOL program called by DB2

Benefits:
  • Reduces network traffic (logic runs on server)
  • Encapsulates business logic
  • Security (GRANT EXECUTE, not table access)
  • Reusable across programs

Result Sets:
  Procedures can return multiple result sets using DECLARE CURSOR and SET RESULT SETS.

Pro Tip: Use stored procedures for complex multi-table operations. One CALL replaces many individual SQL statements.`,
      code:`-- Create:
CREATE PROCEDURE GET_CUST_BALANCE
  (IN P_ID INTEGER,
   OUT P_NAME VARCHAR(30),
   OUT P_BAL DECIMAL(11,2))
  LANGUAGE SQL
BEGIN
  SELECT CUST_NAME, BALANCE
  INTO P_NAME, P_BAL
  FROM CUSTOMER
  WHERE CUST_ID = P_ID;
END;

-- Call from COBOL:
EXEC SQL
  CALL GET_CUST_BALANCE(:WS-CUST-ID,
                         :WS-CUST-NAME,
                         :WS-CUST-BAL)
END-EXEC`
    },

    { title:"Tablespace Types & Design", level:"Intermediate",
      content:`Tablespaces are the physical storage containers for DB2 tables.

Types:
  Simple — Multiple tables, one dataset. Legacy, avoid.
  Segmented — Tables in segments. Good for small tables.
  Partitioned (Classic) — Large tables split by key range. Up to 4096 partitions.
  Partition-by-Growth (PBG) — Auto-adds partitions as data grows.
  Universal (UTS) — Modern default. Range-partitioned or PBG.

Partitioned Tables:
  CREATE TABLESPACE ts1 IN dbname
    USING STOGROUP sg1
    NUMPARTS 12
    BUFFERPOOL BP1;
  
  Table partitioned by date range — each month in its own partition.
  Benefits: Partition-level utilities (REORG one partition, not whole table).

Buffer Pools:
  BP0 — Default (4K pages)
  BP1-BP49 — 4K pages
  BP8K0-BP8K9 — 8K pages
  BP16K0-BP16K9 — 16K pages
  BP32K — 32K pages
  
  Larger pages for large rows. More buffer pool = more caching = faster reads.

LOB Tablespace:
  For BLOB/CLOB columns. Separate storage.

Pro Tip: Use Universal Tablespace (UTS) for all new tables. Classic partitioned is legacy.`,
      code:`-- Create partitioned tablespace:
CREATE TABLESPACE CUSTTS
  IN CUSTDB
  USING STOGROUP PRODSGRP
  NUMPARTS 12
  BUFFERPOOL BP1
  LOCKSIZE ROW
  CLOSE NO
  COMPRESS YES;

-- Create table in tablespace:
CREATE TABLE CUSTOMER (
  CUST_ID INTEGER NOT NULL,
  CUST_NAME VARCHAR(50),
  BALANCE DECIMAL(11,2),
  REGION CHAR(2)
) IN CUSTDB.CUSTTS
  PARTITION BY (REGION ASC);`
    },

    { title:"Index Design & Strategy", level:"Intermediate",
      content:`Indexes speed up data retrieval but slow down inserts/updates.

Unique Index:
  CREATE UNIQUE INDEX idx1 ON table(col1);
  Enforces uniqueness. Required for primary keys.

Non-Unique Index:
  CREATE INDEX idx2 ON table(col1, col2);
  Speeds up WHERE, JOIN, ORDER BY on these columns.

Clustering Index:
  One per table. Determines physical row order.
  CREATE INDEX idx3 ON table(col1) CLUSTER;
  Rows stored in index order — sequential reads are fast.

Index-Only Access:
  If all needed columns are IN the index, DB2 reads only the index (no table access).
  CREATE INDEX idx4 ON table(key, col1, col2) — includes non-key columns.

When to Index:
  • Primary key (always)
  • Foreign keys (for JOINs)
  • Frequently filtered columns (WHERE)
  • Columns in ORDER BY
  • Columns in GROUP BY

When NOT to Index:
  • Small tables (full scan is faster)
  • Columns with few distinct values (low cardinality)
  • Frequently updated columns (index maintenance overhead)

Pro Tip: Run EXPLAIN to see if your index is actually being used. An unused index is pure overhead.`,
      code:`-- Primary key index:
CREATE UNIQUE INDEX CUST_PK
  ON CUSTOMER(CUST_ID)
  CLUSTER
  BUFFERPOOL BP1;

-- Foreign key index:
CREATE INDEX ORDER_CUST_FK
  ON ORDERS(CUST_ID);

-- Composite index for common query:
CREATE INDEX CUST_NAME_IDX
  ON CUSTOMER(LAST_NAME, FIRST_NAME)
  INCLUDE(EMAIL, PHONE);
-- Enables index-only access for name lookups`
    },

    { title:"SQL — UNION, INTERSECT, EXCEPT", level:"Intermediate",
      content:`Set operations combine results from multiple SELECT statements.

UNION:
  SELECT col FROM table1
  UNION
  SELECT col FROM table2
  Combines results, removes duplicates.

UNION ALL:
  Same but KEEPS duplicates. Faster (no sort needed).

INTERSECT:
  Returns rows that exist in BOTH queries.

EXCEPT:
  Returns rows in first query that are NOT in second.

Rules:
  • Same number of columns in both SELECTs
  • Compatible data types
  • Column names come from first SELECT
  • ORDER BY applies to the combined result (goes at the end)

Pro Tip: Always use UNION ALL unless you specifically need duplicate removal. UNION sorts internally which is expensive.`,
      code:`-- Active employees from both systems:
SELECT EMP_ID, NAME FROM SYSTEM_A
WHERE STATUS = 'A'
UNION ALL
SELECT EMP_ID, NAME FROM SYSTEM_B
WHERE STATUS = 'A'
ORDER BY NAME;

-- Employees in HR but not in TRAINING table:
SELECT EMP_ID FROM EMPLOYEE
WHERE DEPT = 'HR'
EXCEPT
SELECT EMP_ID FROM TRAINING_COMPLETED;`
    },

    { title:"DB2 Catalog & System Tables", level:"Intermediate",
      content:`The DB2 catalog stores metadata about all DB2 objects.

Key Catalog Tables:
  SYSIBM.SYSTABLES — All tables/views
  SYSIBM.SYSCOLUMNS — All columns
  SYSIBM.SYSINDEXES — All indexes
  SYSIBM.SYSTABLESPACE — Tablespaces
  SYSIBM.SYSRELS — Foreign key relationships
  SYSIBM.SYSDATABASE — Databases
  SYSIBM.SYSPLAN — Plans
  SYSIBM.SYSPACKAGE — Packages

Useful Queries:
  List tables in a schema:
  SELECT NAME, TYPE FROM SYSIBM.SYSTABLES WHERE CREATOR = 'MYSCHEMA'

  List columns:
  SELECT NAME, COLTYPE, LENGTH FROM SYSIBM.SYSCOLUMNS WHERE TBNAME = 'CUSTOMER'

  Find indexes on a table:
  SELECT NAME, UNIQUERULE, CLUSTERING FROM SYSIBM.SYSINDEXES WHERE TBNAME = 'CUSTOMER'

RUNSTATS updates the catalog with current data distribution statistics. DB2 optimizer uses catalog stats to choose access paths.

Pro Tip: Query SYSIBM.SYSCOLUMNS to quickly understand any table structure without needing documentation.`,
      code:`-- What tables exist in my schema?
SELECT NAME, TYPE, CARDF
FROM SYSIBM.SYSTABLES
WHERE CREATOR = 'PRODSCHM'
  AND TYPE = 'T'
ORDER BY NAME;

-- What columns does CUSTOMER have?
SELECT NAME, COLTYPE, LENGTH, NULLS, DEFAULT
FROM SYSIBM.SYSCOLUMNS
WHERE TBNAME = 'CUSTOMER'
  AND TBCREATOR = 'PRODSCHM'
ORDER BY COLNO;`
    },

    { title:"DB2 Triggers", level:"Advanced",
      content:`Triggers execute automatically when INSERT, UPDATE, or DELETE occurs.

Types:
  BEFORE — Runs before the operation (can modify values)
  AFTER — Runs after the operation (for auditing, cascading)
  INSTEAD OF — Runs instead of the operation (on views)

Granularity:
  FOR EACH ROW — Fires per row affected
  FOR EACH STATEMENT — Fires once per statement

Transition Variables:
  OLD.col — Value before change
  NEW.col — Value after change (modifiable in BEFORE trigger)

Common Uses:
  • Audit logging (AFTER INSERT/UPDATE/DELETE)
  • Auto-populating columns (BEFORE INSERT)
  • Business rule enforcement (BEFORE UPDATE)
  • Cascading updates to related tables

Pro Tip: Be careful with triggers on high-volume tables — they add overhead to every DML operation.`,
      code:`-- Audit trigger:
CREATE TRIGGER CUST_AUDIT
  AFTER UPDATE ON CUSTOMER
  REFERENCING OLD AS O NEW AS N
  FOR EACH ROW
BEGIN ATOMIC
  INSERT INTO CUSTOMER_AUDIT
    (CUST_ID, FIELD_CHANGED, OLD_VAL, NEW_VAL, CHG_DATE)
  VALUES
    (O.CUST_ID, 'BALANCE',
     CHAR(O.BALANCE), CHAR(N.BALANCE),
     CURRENT TIMESTAMP);
END;

-- Auto-populate timestamp:
CREATE TRIGGER CUST_MODIFIED
  BEFORE UPDATE ON CUSTOMER
  REFERENCING NEW AS N
  FOR EACH ROW
  SET N.LAST_MODIFIED = CURRENT TIMESTAMP;`
    },

    { title:"Dynamic SQL", level:"Advanced",
      content:`Dynamic SQL builds and executes SQL statements at runtime.

EXECUTE IMMEDIATE:
  MOVE 'DELETE FROM TEMP_TABLE' TO WS-SQL-STMT
  EXEC SQL EXECUTE IMMEDIATE :WS-SQL-STMT END-EXEC
  For DDL or DML without host variables.

PREPARE + EXECUTE:
  MOVE 'SELECT NAME FROM EMP WHERE ID = ?' TO WS-SQL
  EXEC SQL PREPARE S1 FROM :WS-SQL END-EXEC
  EXEC SQL EXECUTE S1 USING :WS-EMP-ID END-EXEC
  For parameterized queries.

PREPARE + DECLARE CURSOR:
  EXEC SQL PREPARE S1 FROM :WS-SQL END-EXEC
  EXEC SQL DECLARE C1 CURSOR FOR S1 END-EXEC
  EXEC SQL OPEN C1 USING :WS-PARAM END-EXEC
  EXEC SQL FETCH C1 INTO :WS-RESULT END-EXEC

Static vs Dynamic:
  Static — SQL known at compile, bound into package. Faster, secure.
  Dynamic — SQL built at runtime. Flexible but overhead per execution.

SQLDA:
  SQL Descriptor Area — describes columns of dynamic query results.
  Used when column count/types unknown at compile time.

Pro Tip: Static SQL is preferred for production batch. Dynamic SQL is useful for ad-hoc tools and variable table names.`,
      code:`-- Dynamic DELETE:
MOVE 'DELETE FROM TEMP_EXTRACT' TO WS-SQL
EXEC SQL EXECUTE IMMEDIATE :WS-SQL END-EXEC

-- Parameterized dynamic query:
STRING 'SELECT NAME, BALANCE FROM '
       WS-TABLE-NAME
       ' WHERE STATUS = ?'
  DELIMITED BY SIZE INTO WS-SQL
EXEC SQL PREPARE STMT1 FROM :WS-SQL END-EXEC
EXEC SQL DECLARE CUR1 CURSOR FOR STMT1 END-EXEC
EXEC SQL OPEN CUR1 USING :WS-STATUS END-EXEC`
    },

    { title:"SQLCODE Reference", level:"Beginner",
      content:`SQLCODE is set after every SQL statement. Always check it.

Success:
  0 — Successful execution
  100 — Not found (SELECT INTO) or end of data (FETCH)

Warnings (positive):
  +100 — No rows found
  +304 — Value truncated
  +802 — Null eliminated from function

Common Errors (negative):
  -180 — Invalid date/time value
  -181 — Value not valid for date/time
  -204 — Object not defined
  -206 — Column not in table
  -305 — NULL without indicator variable
  -530 — Foreign key violation (parent not found)
  -532 — DELETE restricted by foreign key
  -803 — Duplicate key on unique index
  -805 — Plan/package not found
  -811 — SELECT INTO returned multiple rows
  -818 — Timestamp mismatch (rebind needed)
  -904 — Resource unavailable (locked/stopped)
  -911 — Deadlock or timeout (rollback occurred)
  -922 — Authorization failure
  -927 — DB2 not available

SQLCA Fields:
  SQLCODE — Return code
  SQLERRM — Error message text
  SQLERRD(3) — Rows affected
  SQLWARN — Warning flags

Pro Tip: Memorize -803, -805, -811, -904, -911 — these are asked in every DB2 interview.`,
      code:`EXEC SQL
  INSERT INTO CUSTOMER VALUES(...)
END-EXEC

EVALUATE SQLCODE
  WHEN 0    DISPLAY 'INSERT OK'
  WHEN -803 DISPLAY 'DUPLICATE KEY'
  WHEN -530 DISPLAY 'FK VIOLATION'
  WHEN -904 DISPLAY 'TABLE LOCKED'
  WHEN -911 DISPLAY 'DEADLOCK - RETRY'
  WHEN OTHER
    DISPLAY 'SQL ERROR: ' SQLCODE
    DISPLAY 'MSG: ' SQLERRMC
END-EVALUATE`
    },

    { title:"EXPLAIN & Access Path Analysis", level:"Advanced",
      content:`EXPLAIN shows how DB2 will execute your query — essential for tuning.

How to Run:
  EXPLAIN PLAN FOR SELECT ... — Populates PLAN_TABLE
  Or use SPUFI/QMF: EXPLAIN ALL SET QUERYNO=n FOR SELECT ...

PLAN_TABLE Key Columns:
  ACCESSTYPE — How table is accessed:
    I = Index, R = Table scan, N = Index-only
  MATCHCOLS — Index columns used for matching
  INDEXONLY — Y/N (reading only the index?)
  SORTC_UNIQ — Sort needed for DISTINCT?
  SORTC_ORDERBY — Sort needed for ORDER BY?
  PREFETCH — S=Sequential, L=List, D=Dynamic

What to Look For:
  • Table scans (ACCESSTYPE=R) on large tables — BAD
  • MATCHCOLS=0 on index access — index not fully used
  • Sorts (SORTC=Y) — expensive, can we avoid?
  • INDEXONLY=Y — GOOD (no table access needed)

Fixing Bad Access Paths:
  1. Add/modify indexes for MATCHCOLS > 0
  2. Run RUNSTATS to update catalog statistics
  3. Rewrite SQL (avoid functions on indexed columns)
  4. REBIND to pick up new stats/indexes

Pro Tip: Run EXPLAIN after every SQL change. A small syntax change can completely alter the access path.`,
      code:`-- Run EXPLAIN:
EXPLAIN ALL SET QUERYNO = 100 FOR
SELECT C.NAME, O.ORDER_DATE, O.TOTAL
FROM CUSTOMER C
JOIN ORDERS O ON C.CUST_ID = O.CUST_ID
WHERE C.REGION = 'EAST'
  AND O.ORDER_DATE > '2026-01-01'
ORDER BY O.TOTAL DESC;

-- Check results:
SELECT QUERYNO, QBLOCKNO, PLANNO, ACCESSTYPE,
       MATCHCOLS, INDEXONLY, TNAME, ACCESSNAME
FROM PLAN_TABLE
WHERE QUERYNO = 100
ORDER BY QBLOCKNO, PLANNO;`
    },

    { title:"RUNSTATS, REORG & COPY", level:"Intermediate",
      content:`The three essential DB2 maintenance utilities.

RUNSTATS:
  Updates catalog statistics about data distribution.
  DB2 optimizer uses stats to choose access paths.
  Run AFTER: bulk loads, major INSERT/DELETE, index changes.
  
  RUNSTATS TABLESPACE dbname.tsname TABLE(ALL) INDEX(ALL)
  SHRLEVEL CHANGE — Allows concurrent access during RUNSTATS.

REORG:
  Reorganizes tablespace/index to restore physical order.
  Reclaims space from DELETEs.
  Run WHEN: Data fragmented, many CI splits, poor clustering.
  
  REORG TABLESPACE dbname.tsname SHRLEVEL CHANGE

COPY (Image Copy):
  Backs up tablespace for recovery.
  FULL COPY — Complete backup
  INCREMENTAL — Only changed pages since last full
  
  COPY TABLESPACE dbname.tsname FULL YES

Typical Maintenance Order:
  1. REORG (fix fragmentation)
  2. RUNSTATS (update statistics)
  3. REBIND (pick up new stats)
  4. COPY (backup)

Pro Tip: Always RUNSTATS after REORG. Always REBIND after RUNSTATS. This is the golden maintenance sequence.`,
      code:`//* DB2 Maintenance JCL sequence:
//*
//REORG   EXEC DSNUPROC,UID='REORG',
//        UTPROC='',SYSTEM='DB2P'
//SYSIN    DD *
  REORG TABLESPACE CUSTDB.CUSTTS
    SHRLEVEL CHANGE
/*
//*
//RSTATS  EXEC DSNUPROC,UID='RSTATS',
//        UTPROC='',SYSTEM='DB2P'
//SYSIN    DD *
  RUNSTATS TABLESPACE CUSTDB.CUSTTS
    TABLE(ALL) INDEX(ALL)
    SHRLEVEL CHANGE
/*`
    },

    { title:"DB2 Security & Authorization", level:"Intermediate",
      content:`DB2 uses GRANT/REVOKE to control access to objects.

GRANT:
  GRANT SELECT ON CUSTOMER TO USERID1
  GRANT INSERT, UPDATE ON CUSTOMER TO ROLE_WRITER
  GRANT EXECUTE ON PROCEDURE GET_BALANCE TO PUBLIC
  GRANT ALL ON CUSTOMER TO DBA_ROLE WITH GRANT OPTION

REVOKE:
  REVOKE UPDATE ON CUSTOMER FROM USERID1

Authorities:
  SYSADM — Full DB2 authority
  DBADM — Database administration
  SQLADM — Can explain/tune but not access data
  DATAACCESS — Can access any table data

Object Privileges:
  SELECT, INSERT, UPDATE, DELETE — Table DML
  ALTER — Modify table structure
  INDEX — Create indexes
  REFERENCES — Create foreign keys
  EXECUTE — Run stored procedures

Roles (DB2 10+):
  CREATE ROLE APP_READER
  GRANT SELECT ON CUSTOMER TO ROLE APP_READER
  GRANT ROLE APP_READER TO USERID1
  Simplifies authorization management.

Pro Tip: Use roles instead of granting to individual users. When someone leaves, just revoke the role.`,
      code:`-- Create role and grant access:
CREATE ROLE CUST_READER;
GRANT SELECT ON CUSTOMER TO ROLE CUST_READER;
GRANT SELECT ON ORDERS TO ROLE CUST_READER;

-- Assign role to users:
GRANT ROLE CUST_READER TO USER1, USER2;

-- Application role with write access:
CREATE ROLE CUST_WRITER;
GRANT SELECT, INSERT, UPDATE ON CUSTOMER
  TO ROLE CUST_WRITER;
GRANT EXECUTE ON PROCEDURE UPDATE_BALANCE
  TO ROLE CUST_WRITER;`
    },



    { title:"SQL — Views", level:"Beginner",
      content:`Views are virtual tables based on SELECT statements. They simplify access and enhance security.

CREATE VIEW:
  CREATE VIEW ACTIVE_CUSTOMERS AS
    SELECT CUST_ID, NAME, BALANCE FROM CUSTOMER WHERE STATUS = 'A';

Using Views:
  SELECT * FROM ACTIVE_CUSTOMERS WHERE BALANCE > 1000;
  Behaves like a table but no physical storage.

Updatable Views:
  Simple views (single table, no aggregates, no DISTINCT) can be updated:
  UPDATE ACTIVE_CUSTOMERS SET BALANCE = 5000 WHERE CUST_ID = 123;

WITH CHECK OPTION:
  CREATE VIEW HIGH_BAL AS SELECT * FROM CUSTOMER WHERE BALANCE > 10000 WITH CHECK OPTION;
  Prevents inserting rows that don't satisfy the view's WHERE clause.

Benefits: Simplify complex queries, restrict column/row access, present data differently per application.

Pro Tip: Use views for security — grant SELECT on view, not on base table. Users see only what they need.`
    },

    { title:"SQL — Subqueries", level:"Intermediate",
      content:`Subqueries are queries nested inside other queries.

Scalar Subquery (returns one value):
  SELECT NAME, SALARY, (SELECT AVG(SALARY) FROM EMPLOYEE) AS COMPANY_AVG FROM EMPLOYEE;

IN Subquery:
  SELECT * FROM EMPLOYEE WHERE DEPT IN (SELECT DEPT_ID FROM DEPARTMENT WHERE LOCATION = 'NYC');

EXISTS Subquery:
  SELECT * FROM CUSTOMER C WHERE EXISTS (SELECT 1 FROM ORDERS O WHERE O.CUST_ID = C.CUST_ID);
  Returns TRUE if subquery returns any rows. Faster than IN for large datasets.

NOT EXISTS:
  SELECT * FROM CUSTOMER C WHERE NOT EXISTS (SELECT 1 FROM ORDERS O WHERE O.CUST_ID = C.CUST_ID);
  Customers with no orders.

Correlated Subquery:
  References outer query. Executes once per outer row.
  SELECT E.* FROM EMPLOYEE E WHERE E.SALARY > (SELECT AVG(SALARY) FROM EMPLOYEE WHERE DEPT = E.DEPT);

Pro Tip: EXISTS is generally faster than IN for correlated subqueries. Use EXPLAIN to compare.`
    },

    { title:"SQL — Common Table Expressions (CTE)", level:"Intermediate",
      content:`CTEs (WITH clause) create temporary named result sets for complex queries.

Syntax:
  WITH cte_name AS (SELECT ...) SELECT ... FROM cte_name;

Example:
  WITH DEPT_STATS AS (
    SELECT DEPT, AVG(SALARY) AS AVG_SAL, COUNT(*) AS CNT FROM EMPLOYEE GROUP BY DEPT
  )
  SELECT E.NAME, E.SALARY, D.AVG_SAL
  FROM EMPLOYEE E JOIN DEPT_STATS D ON E.DEPT = D.DEPT
  WHERE E.SALARY > D.AVG_SAL;

Multiple CTEs:
  WITH cte1 AS (...), cte2 AS (SELECT ... FROM cte1 ...) SELECT ... FROM cte2;

Recursive CTE:
  WITH RECURSIVE hierarchy AS (
    SELECT emp_id, mgr_id, name, 1 AS level FROM employee WHERE mgr_id IS NULL
    UNION ALL
    SELECT e.emp_id, e.mgr_id, e.name, h.level+1 FROM employee e JOIN hierarchy h ON e.mgr_id = h.emp_id
  ) SELECT * FROM hierarchy;

Pro Tip: CTEs make complex queries readable. Use them instead of nested subqueries.`
    },

    { title:"SQL — INSERT with SELECT", level:"Beginner",
      content:`Insert data from one table into another using INSERT...SELECT.

Basic:
  INSERT INTO ARCHIVE_TABLE SELECT * FROM ACTIVE_TABLE WHERE STATUS = 'C';

With Column List:
  INSERT INTO SUMMARY (DEPT, TOTAL_SAL, EMP_COUNT)
  SELECT DEPT, SUM(SALARY), COUNT(*) FROM EMPLOYEE GROUP BY DEPT;

MERGE (Upsert):
  MERGE INTO TARGET T USING SOURCE S ON T.KEY = S.KEY
  WHEN MATCHED THEN UPDATE SET T.VAL = S.VAL
  WHEN NOT MATCHED THEN INSERT (KEY, VAL) VALUES (S.KEY, S.VAL);
  Combines INSERT and UPDATE in one statement.

INSERT with VALUES (multiple rows):
  INSERT INTO TABLE VALUES (1,'A'), (2,'B'), (3,'C');

Pro Tip: MERGE is the most efficient way to synchronize two tables — one pass, no duplicates.`
    },

    { title:"SQL — Temporary Tables", level:"Intermediate",
      content:`Temporary tables store intermediate results during a session or transaction.

DECLARED Global Temporary Table (DGTT):
  DECLARE GLOBAL TEMPORARY TABLE SESSION.TEMP_CUST
    (ID INT, NAME VARCHAR(30), BAL DECIMAL(11,2))
    ON COMMIT PRESERVE ROWS;
  • Exists only for the session
  • No GRANT needed, no catalog entry
  • Qualified with SESSION schema
  • ON COMMIT DELETE ROWS or PRESERVE ROWS

Created Global Temporary Table (CGTT):
  CREATE GLOBAL TEMPORARY TABLE TEMP_WORK (...);
  Definition persists in catalog. Data is session-specific.

When to Use:
  • Store intermediate results in complex batch processing
  • Break complex queries into steps
  • Avoid repeating expensive subqueries
  • Stage data for multi-step transformations

Pro Tip: DGTT is preferred for batch — no catalog overhead, automatic cleanup.`
    },

    { title:"DB2 BIND Process", level:"Intermediate",
      content:`BIND converts a DBRM into an executable plan or package.

What BIND Does:
  1. Reads DBRM (compiled SQL extracted from program)
  2. Checks SQL syntax and authorization
  3. Optimizes access paths (using current catalog stats)
  4. Creates a plan or package in DB2 catalog

BIND PACKAGE:
  BIND PACKAGE(collection) MEMBER(dbrm) ACT(REP) ISO(CS) VALIDATE(BIND)
  One package per program. Stored in collection.

BIND PLAN:
  BIND PLAN(planname) PKLIST(collection.*) ACT(REP)
  Plan = collection of packages. Application runs under a plan.

Key Options:
  ACT(REP) — Replace existing
  ISO(CS/RR/UR/RS) — Isolation level
  VALIDATE(BIND/RUN) — Check auth at bind or runtime
  EXPLAIN(YES) — Populate PLAN_TABLE

REBIND:
  REBIND PACKAGE(coll.pkg) — Reoptimize with current stats
  Run after RUNSTATS to pick up new statistics.

Free:
  FREE PACKAGE(coll.pkg) — Remove package
  FREE PLAN(planname) — Remove plan

Pro Tip: RUNSTATS → REBIND is the golden sequence after data changes. Without REBIND, DB2 uses stale access paths.`
    },

    { title:"DB2 LOAD Utility", level:"Intermediate",
      content:`LOAD is the fastest way to bulk-insert data into DB2 tables.

Syntax:
  LOAD DATA INDDN SYSREC INTO TABLE schema.table
    (col1 POSITION(1:8) CHAR,
     col2 POSITION(9:18) DECIMAL EXTERNAL)
  When loaded, indexes are rebuilt automatically.

Phases:
  UTILINIT — Initialization
  RELOAD — Load data
  SORT — Sort index keys
  BUILD — Rebuild indexes
  UTILTERM — Cleanup

Options:
  REPLACE — Delete existing data, then load
  RESUME YES — Append to existing data
  LOG NO — Skip logging (faster, but no recovery)
  ENFORCE NO — Skip referential integrity checks (faster)

LOAD vs INSERT:
  LOAD: 10-100x faster for bulk data. Bypasses SQL layer.
  INSERT: Row-by-row through SQL. Slower but supports triggers/constraints.

After LOAD:
  RUNSTATS (update statistics)
  COPY (image backup — required if LOG NO used)
  REBIND (pick up new stats)

Pro Tip: Always RUNSTATS + COPY after LOAD. Without COPY, tablespace goes to COPY-pending status.`
    },

    { title:"DB2 UNLOAD Utility", level:"Intermediate",
      content:`UNLOAD extracts data from DB2 tables to sequential files.

Syntax:
  UNLOAD TABLESPACE dbname.tsname
    FROM TABLE schema.tablename
    WHEN (DEPT = 'IT')

Output:
  SYSREC — Data records
  SYSPUNCH — LOAD control statements (for reload)

WITH SELECT:
  UNLOAD DATA FROM TABLE schema.table
    HEADER NONE
    SELECT col1, col2 FROM table WHERE condition ORDER BY col1;
  Custom selection and ordering.

UNLOAD vs SELECT INTO FLAT FILE:
  UNLOAD: Faster, utility-level (bypasses SQL)
  SPUFI/QMF export: Through SQL layer, more flexible formatting

Common Pattern:
  UNLOAD (extract) → Transform (SORT/COBOL) → LOAD (target table)
  Classic ETL on mainframe.

Pro Tip: UNLOAD generates matching LOAD statements in SYSPUNCH — use them to reload data into another table/environment.`
    },

    { title:"DB2 CHECK Utility", level:"Intermediate",
      content:`CHECK verifies data integrity — referential constraints and check constraints.

CHECK DATA:
  CHECK DATA TABLESPACE dbname.tsname
  Finds rows that violate referential integrity.
  Violations written to exception table.

CHECK INDEX:
  CHECK INDEX(schema.indexname)
  Verifies index entries match table data.
  Detects corrupted or inconsistent indexes.

CHECK LOB:
  Validates LOB data consistency.

Exception Tables:
  Create before CHECK DATA:
  CREATE TABLE schema.EXCEPT_tablename LIKE schema.tablename;
  ALTER TABLE schema.EXCEPT_tablename ADD RID ROWID NOT NULL GENERATED ALWAYS;
  Violations go here for review.

When to Run:
  After LOAD with ENFORCE NO
  After system crash or ABEND during update
  After REORG with SHRLEVEL CHANGE
  Periodic integrity audits

Pro Tip: Schedule CHECK DATA monthly on critical tables. Finding data corruption early prevents cascading errors.`
    },

    { title:"DB2 Recovery — COPY & RECOVER", level:"Advanced",
      content:`COPY creates backups. RECOVER restores from backups.

IMAGE COPY:
  COPY TABLESPACE dbname.tsname FULL YES SHRLEVEL CHANGE
  FULL YES — Complete copy
  FULL NO — Incremental (only changed pages since last full)
  SHRLEVEL CHANGE — Allow concurrent access during copy

RECOVER:
  RECOVER TABLESPACE dbname.tsname
  Restores from most recent image copy + applies log records.

Point-in-Time Recovery:
  RECOVER TABLESPACE dbname.tsname TOLOGPOINT X'...'
  Recover to a specific log point (before a bad UPDATE, for example).

Recovery Process:
  1. Find last image copy
  2. Restore from copy
  3. Apply log records forward to desired point
  4. Tablespace back online

QUIESCE:
  QUIESCE TABLESPACE dbname.tsname
  Establishes a recovery point — all pending changes flushed.
  Creates a known-good point for point-in-time recovery.

Pending States:
  COPY-pending: Needs image copy (after LOAD LOG NO)
  RECOVER-pending: Needs recovery (after failed operation)
  CHECK-pending: Needs CHECK DATA (after LOAD ENFORCE NO)

Pro Tip: Take FULL COPY after every REORG and LOAD. Your recovery can only go back as far as your last copy.`
    },

    { title:"DB2 Application Programming — SPUFI", level:"Beginner",
      content:`SPUFI (SQL Processing Using File Input) executes SQL interactively from ISPF.

Accessing SPUFI:
  ISPF → DB2I (DB2 Interactive) → Option 1: SPUFI

How It Works:
  1. Write SQL in an input dataset
  2. SPUFI executes it against DB2
  3. Results appear in an output dataset
  4. Browse output in ISPF

SPUFI Settings:
  Input dataset — PDS member with your SQL
  Output dataset — Where results go
  AUTOCOMMIT — YES (commit after each statement) or NO
  ISOLATION — CS, RR, UR, RS

Good For:
  • Ad-hoc queries during development
  • Testing SQL before embedding in COBOL
  • DDL (CREATE, ALTER, DROP)
  • Quick data checks and fixes

Limitations:
  • One SQL statement per execution (by default)
  • No procedural logic
  • Output formatting basic

Alternatives:
  QMF — Better formatting, reports, charts
  Data Studio — Modern GUI tool
  DBeaver — Open source, connects to DB2 z/OS

Pro Tip: Test ALL SQL in SPUFI before embedding in COBOL. Debugging SQL in a COBOL program is 10x harder.`
    },

    { title:"DB2 Stored Procedure — SQL PL", level:"Advanced",
      content:`SQL PL (SQL Procedural Language) adds procedural logic to stored procedures.

Variables:
  DECLARE v_count INTEGER DEFAULT 0;
  SET v_count = v_count + 1;

IF/ELSE:
  IF v_balance > 10000 THEN SET v_status = 'HIGH';
  ELSEIF v_balance > 0 THEN SET v_status = 'NORMAL';
  ELSE SET v_status = 'OVERDRAWN';
  END IF;

WHILE Loop:
  WHILE v_count < 100 DO
    SET v_count = v_count + 1;
    INSERT INTO LOG VALUES(v_count, CURRENT TIMESTAMP);
  END WHILE;

FOR Loop:
  FOR v_row AS SELECT * FROM EMPLOYEE DO
    IF v_row.SALARY > 100000 THEN
      UPDATE EMPLOYEE SET BONUS = 5000 WHERE EMP_ID = v_row.EMP_ID;
    END IF;
  END FOR;

CASE:
  CASE v_type WHEN 'A' THEN ... WHEN 'B' THEN ... ELSE ... END CASE;

Error Handling:
  DECLARE CONTINUE HANDLER FOR SQLSTATE '23505'
    SET v_dup = TRUE;
  Catches specific SQL errors without ABENDing.

Pro Tip: SQL PL runs inside DB2 — much faster than multiple CALL/FETCH cycles from COBOL.`
    },

    { title:"DB2 — Referential Integrity", level:"Intermediate",
      content:`Foreign keys enforce parent-child relationships between tables.

Defining:
  CREATE TABLE ORDERS (
    ORDER_ID INT NOT NULL PRIMARY KEY,
    CUST_ID INT NOT NULL,
    FOREIGN KEY (CUST_ID) REFERENCES CUSTOMER(CUST_ID)
      ON DELETE RESTRICT
  );

ON DELETE Options:
  RESTRICT — Prevent delete if children exist (default)
  CASCADE — Delete children automatically
  SET NULL — Set FK to NULL in children
  NO ACTION — Like RESTRICT but checked at statement end

ON UPDATE:
  No CASCADE for UPDATE in DB2 z/OS. Must update manually.

Benefits:
  • Data integrity guaranteed by DB2
  • No orphan child records
  • Self-documenting relationships

Performance Impact:
  Every INSERT checks parent exists. Every DELETE checks children.
  Index on FK column is essential for performance.

Pro Tip: Always create an index on foreign key columns. Without it, FK checks cause table scans on the child table.`
    },

    { title:"DB2 — Constraints", level:"Intermediate",
      content:`Constraints enforce data rules at the database level.

PRIMARY KEY:
  CREATE TABLE EMP (EMP_ID INT NOT NULL PRIMARY KEY);
  Unique + NOT NULL. One per table. Creates unique index.

UNIQUE:
  ALTER TABLE EMP ADD CONSTRAINT UQ_EMAIL UNIQUE(EMAIL);
  Allows NULL (unlike PK). Multiple unique constraints per table.

NOT NULL:
  EMP_NAME VARCHAR(50) NOT NULL
  Column must have a value.

CHECK:
  ALTER TABLE EMP ADD CONSTRAINT CK_SAL CHECK(SALARY >= 0);
  Validates data on INSERT/UPDATE. Rejected if condition fails.
  CHECK(STATUS IN ('A','I','T'))
  CHECK(END_DATE >= START_DATE)

DEFAULT:
  HIRE_DATE DATE DEFAULT CURRENT DATE
  STATUS CHAR(1) DEFAULT 'A'

FOREIGN KEY:
  Referential integrity (see previous lesson).

Pro Tip: Use CHECK constraints for business rules. They're enforced by DB2 — no COBOL code needed.`
    },

    { title:"DB2 — Sequences & Identity Columns", level:"Intermediate",
      content:`Auto-generated unique numbers for primary keys.

IDENTITY Column:
  CREATE TABLE ORDERS (
    ORDER_ID INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    ORDER_DATE DATE, ...
  );
  DB2 auto-assigns ORDER_ID on INSERT.

GENERATED ALWAYS vs BY DEFAULT:
  ALWAYS — DB2 always generates (can't specify value)
  BY DEFAULT — DB2 generates unless you provide a value

SEQUENCE:
  CREATE SEQUENCE ORDER_SEQ START WITH 1000 INCREMENT BY 1 NO CYCLE;
  
  INSERT INTO ORDERS (ORDER_ID, ...) VALUES (NEXT VALUE FOR ORDER_SEQ, ...);
  
  Separate from table. Can be used across multiple tables.

SEQUENCE vs IDENTITY:
  IDENTITY: Tied to one table. Automatic.
  SEQUENCE: Independent object. Manual reference. More flexible.

In COBOL:
  EXEC SQL SELECT NEXT VALUE FOR ORDER_SEQ INTO :WS-ORDER-ID FROM SYSIBM.SYSDUMMY1 END-EXEC

Pro Tip: Use IDENTITY for simple auto-increment. Use SEQUENCE when multiple tables need coordinated numbering.`
    },

    { title:"DB2 Data Types Reference", level:"Beginner",
      content:`Complete DB2 data type reference for z/OS.

Numeric:
  SMALLINT — 2 bytes (-32768 to 32767)
  INTEGER — 4 bytes (-2.1B to 2.1B)
  BIGINT — 8 bytes
  DECIMAL(p,s) — Packed decimal (p digits, s decimal places)
  REAL — Single float. DOUBLE — Double float.
  DECFLOAT — Decimal floating point (financial precision)

String:
  CHAR(n) — Fixed-length (1-255). Padded with spaces.
  VARCHAR(n) — Variable-length (1-32704). Stores actual length.
  CLOB — Character Large Object (up to 2GB)
  GRAPHIC/VARGRAPHIC — Double-byte character strings
  DBCLOB — Double-byte CLOB

Binary:
  BINARY(n) — Fixed-length binary
  VARBINARY(n) — Variable-length binary
  BLOB — Binary Large Object (up to 2GB)

Date/Time:
  DATE — YYYY-MM-DD (4 bytes)
  TIME — HH.MM.SS (3 bytes)
  TIMESTAMP — Date + Time + microseconds (10 bytes)

Special:
  ROWID — Unique row identifier
  XML — Native XML storage

COBOL Mapping:
  INTEGER → PIC S9(9) COMP
  DECIMAL(7,2) → PIC S9(5)V99 COMP-3
  VARCHAR(30) → 49 WS-LEN PIC S9(4) COMP. 49 WS-DATA PIC X(30).

Pro Tip: Use DECIMAL for money (exact). Never REAL/DOUBLE for financial data (rounding errors).`
    },

    { title:"DB2 — GRANT & Authorization IDs", level:"Intermediate",
      content:`DB2 security controls who can access what.

Authorization IDs:
  Primary: TSO user ID
  Secondary: RACF group memberships
  Roles: Named collections of privileges (DB2 10+)

GRANT on Tables:
  GRANT SELECT ON CUSTOMER TO USER1;
  GRANT INSERT, UPDATE ON CUSTOMER TO ROLE APP_WRITER;
  GRANT ALL ON CUSTOMER TO DBA_ROLE WITH GRANT OPTION;

GRANT on Plans/Packages:
  GRANT EXECUTE ON PLAN MYPLAN TO USER1;
  GRANT BIND ON PACKAGE COLL.PKG TO DEVELOPER1;

System Authorities:
  SYSADM — Everything. DBADM — Database admin.
  SQLADM — Explain/tune. DATAACCESS — Read any table.

Revoking:
  REVOKE UPDATE ON CUSTOMER FROM USER1;

Checking Authorization:
  SELECT * FROM SYSIBM.SYSPLANAUTH WHERE GRANTEE = 'USER1';
  SELECT * FROM SYSIBM.SYSTABAUTH WHERE GRANTEE = 'USER1';

Pro Tip: Use roles for application access. GRANT to role, then GRANT role to users. Much easier to manage.`
    },

    { title:"DB2 — Locking Deep Dive", level:"Advanced",
      content:`DB2 uses locks to manage concurrent access. Understanding locking prevents deadlocks and timeouts.

Lock Modes:
  S (Share) — Read lock. Others can read, not write.
  U (Update) — Intention to update. Upgrades to X when updating.
  X (Exclusive) — Write lock. No one else can read or write.
  IS/IX/SIX — Intent locks at tablespace/table level.

Lock Granularity:
  ROW — Lock individual rows (default for most)
  PAGE — Lock pages (4K-32K of data)
  TABLE — Lock entire table
  TABLESPACE — Lock entire tablespace
  LOCKSIZE ROW on CREATE TABLESPACE for finest granularity.

Lock Escalation:
  Too many row locks → DB2 escalates to table lock.
  Threshold: LOCKMAX parameter. Default: system-defined.
  Escalation hurts concurrency — other transactions wait.

Deadlock:
  Task A locks Row 1, waits for Row 2.
  Task B locks Row 2, waits for Row 1.
  DB2 detects and ABENDs one (SQLCODE -911 REASON 2).

Prevention:
  • COMMIT frequently (release locks)
  • Access tables in same order across programs
  • Use lowest isolation level needed
  • Keep transactions short
  • Index FK columns

LOCK TABLE:
  LOCK TABLE schema.tablename IN EXCLUSIVE MODE;
  For batch updates — prevents deadlocks by locking everything upfront.

Pro Tip: SQLCODE -911 REASON 2 = deadlock, REASON 68 = timeout. Both mean lock contention. Fix: COMMIT more often.`
    },

    { title:"DB2 — Connection & Thread Management", level:"Advanced",
      content:`How COBOL programs connect to DB2 in batch and online.

Batch Connection:
  Via TSO (IKJEFT01) or CAF (Call Attach Facility).
  JCL: EXEC PGM=IKJEFT01 with SYSTSIN: DSN SYSTEM(subsystem) RUN PROGRAM(prog) PLAN(plan)
  Thread created at RUN, released at END.

CICS Connection:
  CICS DB2 Attachment Facility manages threads.
  Threads created from pool when transaction starts.
  CICS COBOL: Just use EXEC SQL — thread management is automatic.

Thread Types:
  ALLIED — For batch and TSO
  DATABASE ACCESS — For distributed requests (DRDA)

Connection Pooling (CICS):
  CICS maintains a pool of DB2 threads.
  Protects: THREADLIM, ACCOUNTREC parameters in RCT.

RELEASE(COMMIT) vs RELEASE(DEALLOCATE):
  COMMIT — Thread released after COMMIT (shares with others)
  DEALLOCATE — Thread held for entire transaction (faster, but consumes resources)

DDF (Distributed Data Facility):
  Enables remote DB2 access. DRDA protocol.
  CONNECT TO location. Three-part names: location.schema.table.

Pro Tip: Use RELEASE(COMMIT) in CICS for better thread utilization. DEALLOCATE only for high-frequency transactions.`
    },

    { title:"DB2 — Data Sharing & Sysplex", level:"Expert",
      content:`Data sharing allows multiple DB2 subsystems to access the same data simultaneously.

Parallel Sysplex:
  Multiple z/OS LPARs connected via Coupling Facility (CF).
  Each LPAR runs its own DB2 — all share the same database.

Data Sharing Group:
  Collection of DB2 members sharing data.
  Each member has its own buffer pools and log.
  CF coordinates locking and buffer coherency.

Coupling Facility:
  Lock Structure — Global lock manager
  SCA (Shared Communications Area) — Status info
  Group Buffer Pools — Shared caching

Benefits:
  • Horizontal scaling (add members for more capacity)
  • High availability (one member fails, others continue)
  • Workload balancing across members
  • Near-zero downtime for maintenance

DSNZPARM:
  Each DB2 member has its own system parameters.
  Some parameters must be consistent across the group.

Sysplex Routing:
  WLM/DVIPA routes work to least-loaded member.

Pro Tip: Data sharing is enterprise-grade HA. Know the concepts for architect-level interviews.`
    },

    { title:"DB2 — REXX & DB2", level:"Intermediate",
      content:`REXX can execute SQL dynamically — useful for automation and ad-hoc tasks.

Setup:
  In REXX: ADDRESS DSNREXX "CONNECT subsystem"
  Execute SQL: ADDRESS DSNREXX "EXECSQL stmt"

Pattern:
  /* REXX */
  ADDRESS DSNREXX "CONNECT DB2P"
  sqlstmt = "SELECT NAME, SALARY FROM EMPLOYEE WHERE DEPT = 'IT'"
  ADDRESS DSNREXX "EXECSQL PREPARE S1 FROM :sqlstmt"
  ADDRESS DSNREXX "EXECSQL DECLARE C1 CURSOR FOR S1"
  ADDRESS DSNREXX "EXECSQL OPEN C1"
  DO WHILE SQLCODE = 0
    ADDRESS DSNREXX "EXECSQL FETCH C1 INTO :name, :salary"
    IF SQLCODE = 0 THEN SAY name salary
  END
  ADDRESS DSNREXX "EXECSQL CLOSE C1"
  ADDRESS DSNREXX "DISCONNECT"

Use Cases:
  • Quick data queries from TSO
  • Automated reports
  • Data migration scripts
  • Database administration tasks

Pro Tip: REXX + DB2 is perfect for one-off queries and automation scripts that don't need full COBOL programs.`
    },

    { title:"DB2 — Pagination & FETCH FIRST", level:"Beginner",
      content:`Limit result rows for display or performance.

FETCH FIRST n ROWS ONLY:
  SELECT * FROM EMPLOYEE ORDER BY SALARY DESC FETCH FIRST 10 ROWS ONLY;
  Returns top 10 highest-paid employees.

OFFSET (DB2 12+):
  SELECT * FROM EMPLOYEE ORDER BY NAME OFFSET 20 ROWS FETCH FIRST 10 ROWS ONLY;
  Skip 20, return next 10. Perfect for page 3 of results.

ROW_NUMBER():
  SELECT * FROM (
    SELECT ROW_NUMBER() OVER(ORDER BY SALARY DESC) AS RN, NAME, SALARY FROM EMPLOYEE
  ) WHERE RN BETWEEN 11 AND 20;
  Page 2 (rows 11-20). Works in all DB2 versions.

OPTIMIZE FOR n ROWS:
  SELECT ... OPTIMIZE FOR 20 ROWS;
  Tells DB2 optimizer you only need ~20 rows. May choose different access path.

In COBOL:
  Fetch first 100 rows into a table, display page by page.
  Or fetch one page at a time using key-based pagination.

Pro Tip: Key-based pagination (WHERE key > last_key FETCH FIRST n) is faster than OFFSET for large tables.`
    },

    { title:"DB2 — Error Handling Patterns", level:"Intermediate",
      content:`Robust error handling for production DB2 COBOL programs.

Basic Pattern:
  EXEC SQL statement END-EXEC
  IF SQLCODE < 0 PERFORM DB2-ERROR END-IF
  IF SQLCODE = 100 PERFORM NOT-FOUND END-IF

WHENEVER (Automatic):
  EXEC SQL WHENEVER SQLERROR GO TO DB2-ERR-RTN END-EXEC
  EXEC SQL WHENEVER NOT FOUND GO TO NOT-FOUND-RTN END-EXEC
  EXEC SQL WHENEVER SQLWARNING CONTINUE END-EXEC
  Legacy approach — modern code prefers explicit checking.

Deadlock Retry:
  IF SQLCODE = -911
    ADD 1 TO WS-RETRY-COUNT
    IF WS-RETRY-COUNT <= 3
      EXEC SQL ROLLBACK END-EXEC
      PERFORM DELAY-1-SECOND
      PERFORM RETRY-OPERATION
    ELSE
      PERFORM FATAL-ERROR
    END-IF

Logging Errors:
  MOVE SQLCODE TO WS-SAVE-SQLCODE
  MOVE SQLERRMC TO WS-SAVE-ERRMSG
  MOVE SQLERRD(3) TO WS-ROWS-AFFECTED
  DISPLAY 'SQL ERROR: ' WS-SAVE-SQLCODE ' MSG: ' WS-SAVE-ERRMSG

Pro Tip: Always save SQLCODE/SQLERRMC immediately — the next SQL statement overwrites them.`
    },

    { title:"DB2 — Batch Processing Patterns", level:"Advanced",
      content:`Production batch DB2 patterns used in every mainframe shop.

Cursor-Based Update:
  DECLARE cur CURSOR WITH HOLD FOR SELECT ... FOR UPDATE OF col
  OPEN → FETCH loop → UPDATE WHERE CURRENT OF cur → COMMIT every N rows → CLOSE

Mass DELETE:
  DELETE FROM ARCHIVE WHERE CREATE_DATE < CURRENT DATE - 1 YEAR;
  For millions of rows: delete in batches with COMMIT to avoid log full.

Bulk INSERT:
  INSERT INTO TARGET SELECT * FROM SOURCE WHERE condition;
  Faster than row-by-row INSERT from COBOL.

ETL Pattern:
  1. UNLOAD source data
  2. SORT/Transform with DFSORT or COBOL
  3. LOAD into target table
  4. RUNSTATS → REBIND → COPY

Commit Strategy:
  COMMIT every 500-1000 rows for updates/deletes.
  Prevents: log full, lock escalation, long rollback on failure.
  WITH HOLD cursor stays open across COMMITs.

Restart Pattern:
  Track last-processed key in control table.
  On restart: SELECT last_key FROM CONTROL → resume from there.

Pro Tip: The #1 batch DB2 problem is log full (SQLCODE -904). Fix: COMMIT frequently.`
    },

    { title:"DB2 — Performance Tuning Checklist", level:"Advanced",
      content:`Systematic approach to DB2 performance optimization.

SQL Tuning:
  1. Run EXPLAIN — check access paths
  2. Avoid table scans on large tables (need index)
  3. Use MATCHCOLS > 0 (index is being used effectively)
  4. Avoid functions on indexed columns in WHERE
  5. Use BETWEEN instead of >= AND <=
  6. Avoid SELECT * — specify only needed columns
  7. Use EXISTS instead of IN for correlated subqueries

Index Tuning:
  1. Index columns in WHERE, JOIN, ORDER BY
  2. Consider index-only access (INCLUDE columns)
  3. Clustering index on most-used access path
  4. Remove unused indexes (overhead on INSERT)

Utility Tuning:
  1. Current RUNSTATS (stale stats = bad access paths)
  2. Regular REORG (fix fragmentation)
  3. Adequate BUFFERPOOL size

Application Tuning:
  1. COMMIT frequently (release locks)
  2. FOR FETCH ONLY on read cursors
  3. OPTIMIZE FOR n ROWS for pagination
  4. Static SQL over dynamic (bound access paths)
  5. Array FETCH/INSERT for bulk operations

Pro Tip: 90% of DB2 performance problems are solved by: current RUNSTATS + proper indexes + EXPLAIN analysis.`
    },


    { title:"DB2 Interview Questions", level:"All Levels",
      content:`DB2 Interview Questions — 40+ Q&A organized by level.

=== BEGINNER ===

Q: What is DB2?
A: IBM's relational database management system for z/OS. Stores data in tables with rows/columns. Accessed via SQL.

Q: What is SQL?
A: Structured Query Language — standard language for relational databases. SELECT, INSERT, UPDATE, DELETE for data manipulation. CREATE, ALTER, DROP for structure.

Q: What is a tablespace?
A: Physical storage for DB2 tables. Types: Simple (multiple tables), Segmented (one table per segment), Partitioned (large tables split by key range), Universal (modern default).

Q: What is a PLAN and PACKAGE?
A: PLAN = collection of packages bound together, represents application's DB2 access. PACKAGE = compiled SQL from one program. BIND creates plans/packages from DBRMs.

Q: What is SQLCODE?
A: Return code from DB2. 0=success, 100=not found/end of data, negative=error. -805=plan not found, -811=multiple rows, -904=resource unavailable.

Q: What is a primary key?
A: Unique identifier for each row. Cannot be NULL. Automatically creates a unique index.

Q: What is a foreign key?
A: Column referencing another table's primary key. Enforces referential integrity — child row can't exist without parent.

Q: What is an index?
A: B-tree structure for fast data retrieval. CREATE INDEX name ON table(col). Speeds up WHERE, JOIN, ORDER BY. Trade-off: faster reads, slower inserts.

=== INTERMEDIATE ===

Q: Difference between INNER JOIN and LEFT JOIN?
A: INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from left table plus matching rows from right (NULLs for no match).

Q: What is a cursor?
A: Mechanism to process multiple rows one at a time. DECLARE → OPEN → FETCH (loop) → CLOSE. WITH HOLD keeps cursor open across COMMITs.

Q: Explain ISOLATION levels.
A: CS (Cursor Stability) — lock current row only (default). RR (Repeatable Read) — lock all accessed rows. UR (Uncommitted Read) — no locks, read dirty data. RS (Read Stability) — lock qualifying rows.

Q: What is EXPLAIN?
A: Analyzes SQL access paths. Populates PLAN_TABLE with access method, index usage, sort needs. Essential for performance tuning.

Q: What is RUNSTATS?
A: Updates DB2 catalog statistics about table data distribution. Run after major data changes. Without current stats, DB2 optimizer makes poor access path choices.

Q: What is REORG?
A: Reorganizes tablespace/index to reclaim space, restore clustering order, and improve performance. Run after heavy INSERT/DELETE activity.

Q: What is a DBRM?
A: Database Request Module — compiled SQL extracted from program by DB2 precompiler. Input to the BIND process.

Q: Explain COMMIT and ROLLBACK.
A: COMMIT saves all changes since last commit. ROLLBACK undoes all changes. DB2 uses logging for recovery. Frequent COMMITs reduce lock contention and log usage.

Q: What are NULL values?
A: Represents unknown/missing data. Not the same as zero or spaces. Use IS NULL / IS NOT NULL to test. Indicator variables in COBOL handle NULLs.

Q: What is a stored procedure?
A: Program stored in DB2, callable via CALL statement. Can contain SQL and procedural logic. Reduces network traffic for complex operations.

=== ADVANCED ===

Q: What causes -811 SQLCODE?
A: SELECT INTO returned more than one row. Fix: Add more WHERE conditions, or use a CURSOR.

Q: What is DB2 lock escalation?
A: When too many page/row locks exist, DB2 escalates to table lock. Causes concurrency issues. Fix: COMMIT frequently, optimize SQL to touch fewer rows, use LOCKSIZE ROW.

Q: How do you tune a slow DB2 query?
A: Run EXPLAIN to check access path. Ensure RUNSTATS is current. Add/modify indexes. Rewrite SQL (avoid functions on indexed columns, avoid SELECT *). Check for lock contention.

Q: What is dynamic SQL vs static SQL?
A: Static: SQL known at compile time, bound into package (faster, more secure). Dynamic: SQL built at runtime via PREPARE/EXECUTE (flexible, but overhead for each execution).

Q: Explain DB2 utilities.
A: LOAD (bulk insert), UNLOAD (bulk extract), REORG (reorganize), RUNSTATS (update stats), COPY (backup), RECOVER (restore), CHECK (integrity check).

💡 Study Tip: Know SQLCODE values, ISOLATION levels, EXPLAIN, and CURSOR processing — core DB2 interview topics.`,
    },

    { title:"DB2 Cheat Sheet", level:"All Levels",
      content:`DB2 Quick Reference — Cheat Sheet

═══ SQL DML ═══
SELECT col FROM table WHERE condition ORDER BY col
INSERT INTO table (cols) VALUES (vals)
UPDATE table SET col=val WHERE condition
DELETE FROM table WHERE condition

═══ JOIN TYPES ═══
INNER JOIN — Matching rows only
LEFT JOIN — All left + matching right
RIGHT JOIN — All right + matching left
FULL OUTER JOIN — All rows from both

═══ KEY SQLCODES ═══
0     — Success        100   — Not found
-803  — Duplicate key   -805  — Plan not found
-811  — Multiple rows   -818  — Timestamp mismatch
-904  — Resource unavail -911  — Deadlock/timeout
-180  — Invalid date    -305  — NULL indicator needed

═══ CURSOR PATTERN ═══
EXEC SQL DECLARE cur CURSOR FOR SELECT ... END-EXEC
EXEC SQL OPEN cur END-EXEC
PERFORM UNTIL SQLCODE = 100
  EXEC SQL FETCH cur INTO :vars END-EXEC
END-PERFORM
EXEC SQL CLOSE cur END-EXEC

═══ ISOLATION LEVELS ═══
UR — Uncommitted Read (dirty reads)
CS — Cursor Stability (default)
RS — Read Stability
RR — Repeatable Read (most restrictive)

═══ UTILITIES ═══
BIND — Create plan/package from DBRM
RUNSTATS — Update catalog statistics
REORG — Reorganize tablespace/index
COPY/RECOVER — Backup/restore
LOAD/UNLOAD — Bulk data operations`,
    },
  ]
};
