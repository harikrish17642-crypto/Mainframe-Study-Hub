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
