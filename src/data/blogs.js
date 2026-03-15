export const BLOGS = [
  {
    id:"b1",
    title:"Why COBOL Will Outlive All of Us (And That's a Good Thing)",
    date:"2025-01-15",
    category:"COBOL",
    readTime:"8 min read",
    content:`Every few years, a new article declares "COBOL is dead." Every few years, the people running the world's financial systems laugh quietly and go back to processing billions of transactions.

Let's look at the numbers honestly:

The COBOL Reality Check
IBM estimates there are 800 billion lines of COBOL in production today. That's not a typo — 800 billion. The global banking system processes $3 trillion through COBOL every day. The IRS processes 90% of tax filings through COBOL systems. 95% of ATM transactions touch COBOL at some point.

These aren't systems built by companies that couldn't do better. They're systems built by companies that needed the best — and COBOL was, and in many ways remains, the best tool for the job.

Why COBOL Persists (Technical Reasons)
1. Fixed-point arithmetic: COBOL's packed decimal (COMP-3) arithmetic is exact. Java's double? Not exact. When you're processing $1.2 billion in payroll, "close enough" isn't close enough.

2. File I/O maturity: The COBOL/VSAM/JCL ecosystem for batch processing is incredibly mature. Record-level locking, checkpoint/restart, and ABEND handling have been refined over 60 years.

3. Performance: Modern z/OS COBOL programs compiled with the Enterprise COBOL compiler with aggressive optimization flags can outperform equivalent Java on the same hardware.

4. Reliability: IBM's z/OS platform has reliability characteristics that no other platform matches. "Five nines" (99.999%) is the floor, not the ceiling.

The Real Challenge
The genuine problem isn't technical. It's demographic. The average age of COBOL programmers is rising. Universities stopped teaching it. But this is an opportunity, not a death sentence.

Companies like IBM, Broadcom, and Microfocus have invested in modern tooling — VS Code extensions, Git integration, CI/CD pipelines for COBOL. The language is modern; the perception is lagging.

What's Actually Happening
Smart organizations aren't rewriting their COBOL. They're:
- Exposing COBOL business logic as REST APIs
- Adding modern front-ends to existing COBOL applications  
- Integrating COBOL with cloud services via IBM MQ and z/OS Connect
- Using Zowe to let developers work in VS Code while the code runs on z/OS

The mainframe isn't dying. It's becoming invisible infrastructure — exactly what it should be.`
  },
  {
    id:"b2",
    title:"Debugging a Production Abend at 3 AM: A Survival Guide",
    date:"2025-02-01",
    category:"JCL",
    readTime:"12 min read",
    content:`The phone rings at 3 AM. The production PAYROLL job abended. 50,000 employees won't get paid tomorrow unless you fix it in the next few hours. This is the reality of mainframe operations.

Here's the systematic approach that gets you from panic to resolution.

Step 1: Don't Panic, Get Information
Before touching anything, gather:
- Exact job name and job number
- Abend code (S0C7, S322, S80A, etc.)
- Which step failed (Step name from JESMSGLG)
- Time of failure
- Was this a new deployment or has it run before?

Step 2: Know Your Abend Codes
S0C7  — Data exception (non-numeric data in numeric field)
S0C4  — Protection exception (storage violation / null pointer)
S0C1  — Operation exception (invalid instruction — usually link error)
S322  — Time exceeded (TIME= parameter exceeded)
S80A  — Virtual storage exceeded (not enough memory)
S213  — Dataset not found (JCL DISP issue)
S237  — Volume error (DASD volume not available)
S722  — Output exceeded OUTLIM (too much print output)
S806  — Load module not found (program not in STEPLIB or link list)
S878  — Virtual storage not available (getmain failure)
S9nn  — VSAM errors (S913=not authorized, S918=no space)
U1000–U4095 — User abend codes (program-specific)

Step 3: Read the Dump
SYSUDUMP in your JCL output is your friend. In SDSF:
- Navigate to the job
- Press S next to SYSUDUMP
- Look for "COMPLETION CODE" near the top
- Find "PSW AT ENTRY TO ABEND"
- Match the offset to your compiler listing

Step 4: Common Fixes by Abend

S0C7 - Data Exception:
Find the numeric field that contains non-numeric data.
Check IF WS-FIELD IS NUMERIC before using it.
Check LRECL in your JCL — misaligned records cause this.

S213 - Dataset Not Found:
Is the DSN spelled correctly?
Does the dataset exist on the volume specified?
Is the DISP correct (SHR vs OLD)?
GDG — did the previous generation get created?

S806 - Program Not Found:
Add //STEPLIB DD to point to the load library
Check that the compile/link completed successfully
Verify the member name in EXEC PGM=

Step 5: Fix, Test, Document
- Fix in the lowest environment first (if time allows)
- Implement in production
- Run the job
- Document what happened and why
- Update runbook for future occurrences

The 3 AM mindset: Methodical beats frantic. Every time.`
  },
  {
    id:"b3",
    title:"IMS vs DB2: Choosing the Right Database for Your Workload",
    date:"2025-02-20",
    category:"Database",
    readTime:"10 min read",
    content:`"Why does this bank still run IMS when DB2 exists?" is a question I hear regularly. The answer reveals something fundamental about database design philosophy that's still relevant today.

The Short Answer
IMS excels at hierarchical, high-volume, predictable access patterns.
DB2 excels at ad-hoc queries, complex relationships, and SQL flexibility.

Most large financial institutions run both — and for good reason.

IMS: When the Hierarchy is the Data
Consider a banking data model:
  Customer → Accounts → Transactions
  Customer → Loans → Payments
  Customer → Address History

This is inherently hierarchical. In IMS, navigating from a customer to their accounts to their transactions is a series of GU/GN/GNP calls — lightning fast because the physical data structure mirrors the logical structure.

IMS processes this through direct physical pointers (in HDAM) or index-based direct access (HIDAM). No joins. No parsing SQL. No query optimizer overhead. Just direct physical access.

The numbers: IMS processes approximately 50 billion transactions daily globally. That's not a typo.

DB2: When You Need Flexibility
The relational model shines when you don't know your access patterns in advance. "Show me all customers in Texas with balances over $50,000 who haven't logged in for 90 days and have at least one loan" — this is a SQL query, not an IMS use case.

DB2's query optimizer can evaluate multiple access paths and choose the most efficient one at bind time or runtime. IMS requires you to know your access patterns when you design the database.

The Hybrid Reality
Most large shops run:
- IMS for core transactional processing (new account, debit, credit)
- DB2 for reporting, analytics, and complex queries
- DB2 for application data that doesn't fit hierarchical model
- IMS for historical data that's accessed by known keys

The data often flows: IMS (OLTP) → DB2 (reporting/analytics) via batch or real-time CDC (Change Data Capture).

Modern Consideration: IMS Universal Drivers
IBM's IMS Universal Drivers allow Java applications and SQL-like access to IMS data through JDBC and SQL-like syntax. This significantly reduces the argument for "we have to move to DB2 to get SQL access" — you can get SQL-like access while keeping IMS's performance characteristics.`
  },
];
