export const SECURITY_TOPIC = {
  id:"security", icon:"🔐", title:"RACF & Security", subtitle:"z/OS Access Control", color:"#ec4899", level:"Beginner → Expert",
  description:"Protecting the world's most sensitive data. RACF, ACF2, TopSecret — z/OS security from login to dataset.",
  sections:[
    { title:"z/OS Security Fundamentals", level:"Beginner",
      content:`Mainframe Security — Why It's the Gold Standard:

IBM mainframes process the world's most sensitive transactions: banking, healthcare, government, insurance. z/OS security is built into the operating system at every level — it's not an add-on.

Three Pillars of z/OS Security:

1. Identification — Who are you?
   Every user has a unique user ID. No anonymous access.

2. Authentication — Prove you are who you claim to be.
   Passwords, passphrases, digital certificates, MFA, PassTickets.

3. Authorization — What are you allowed to do?
   Access to datasets, programs, CICS transactions, DB2 tables, system commands.

External Security Managers (ESMs):
  z/OS delegates security to an ESM (External Security Manager):

  RACF (Resource Access Control Facility) — IBM's native ESM
    • Most common (~70% of installations)
    • Integrated with z/OS
    • Included with z/OS license

  ACF2 (Access Control Facility 2) — Broadcom
    • Rule-based access control
    • Default-deny philosophy
    • Popular in financial institutions

  Top Secret (TSS) — Broadcom
    • Department/division-based security model
    • Good for large organizations with complex structures
    • Used by government and defense

  All three ESMs provide the same core functions but with different
  syntax, philosophy, and administrative models.

Security Layers in z/OS:
  Layer 1: Physical — Data center access, hardware security
  Layer 2: Network — Firewalls, TLS/SSL, IP filtering
  Layer 3: z/OS — ESM (RACF/ACF2/TSS), system integrity
  Layer 4: Subsystem — DB2 security, CICS security, MQ security
  Layer 5: Application — Program-level security checks
  Layer 6: Data — Encryption at rest and in transit

z/OS System Integrity:
  z/OS guarantees that no user program can:
  • Bypass security controls
  • Access another user's memory
  • Modify the operating system
  • Gain unauthorized privileges
  This is enforced by hardware (System/z architecture) and software.`
    },
    { title:"RACF User Administration", level:"Beginner",
      content:`RACF User Profiles — Managing Access:

Every person (and batch job) that accesses z/OS must have a RACF user profile.

Creating Users:
  ADDUSER userid NAME('First Last') -
    DFLTGRP(group) -
    OWNER(owner) -
    PASSWORD(initial) -
    TSO(ACCTNUM(acct) PROC(loginproc) SIZE(4096) MAXSIZE(0))

  Key Parameters:
  userid   — 1-8 characters, unique across the system
  NAME     — Full name (for display)
  DFLTGRP  — Default RACF group (organizational unit)
  OWNER    — Who manages this profile (user or group)
  PASSWORD — Initial password (user must change at first logon)

User Profile Segments:
  BASE     — Core identity: name, group, owner, attributes
  TSO      — TSO logon parameters: account, procedure, region
  CICS     — CICS access parameters: operator ID, timeout
  OMVS     — Unix System Services: UID, home directory, shell
  OPERPARM — Console operator parameters
  LANGUAGE — Language preferences
  KERB     — Kerberos authentication
  EIM      — Enterprise Identity Mapping

Modifying Users:
  ALTUSER userid NAME('New Name')
  ALTUSER userid PASSWORD(newpwd) NOEXPIRED
  ALTUSER userid TSO(SIZE(8192))
  ALTUSER userid REVOKE    ← Lock the account
  ALTUSER userid RESUME    ← Unlock the account

Deleting Users:
  DELUSER userid
  (All access permissions for this user are also removed)

Listing User Information:
  LISTUSER userid         ← Brief listing
  LISTUSER userid ALL     ← Complete listing
  LISTUSER userid TSO     ← TSO segment only
  LISTUSER userid OMVS    ← USS segment only

Password Rules:
  RACF enforces password policies through SETROPTS:
  • Minimum/maximum length (1-8 chars for passwords, up to 100 for passphrases)
  • Password history (prevent reuse of last N passwords)
  • Expiration interval (days between required changes)
  • Revocation after N failed attempts
  • Password complexity rules (mixed case, special chars)

  Passphrases (14-100 chars) provide much stronger security than
  traditional 8-character passwords.`,
      code:`/* ─── RACF USER ADMINISTRATION COMMANDS ────────────── */

/* Create a new developer user */
ADDUSER DEVUSR1 NAME('JOHN DEVELOPER') -
  DFLTGRP(DEVTEAM) -
  OWNER(DEVTEAM) -
  PASSWORD(INITIAL1) -
  TSO(ACCTNUM(DEVACCT) -
      PROC(ISPFPROC) -
      SIZE(4096) -
      MAXSIZE(0) -
      UNIT(SYSDA) -
      MSGCLASS(X) -
      JOBCLASS(A)) -
  OMVS(UID(50001) -
       HOME('/u/devusr1') -
       PROGRAM('/bin/sh'))

/* Modify user - change password, no expiration */
ALTUSER DEVUSR1 PASSWORD(NEWPASS1) NOEXPIRED

/* Revoke (lock) a user account */
ALTUSER DEVUSR1 REVOKE

/* Resume (unlock) a user account */
ALTUSER DEVUSR1 RESUME

/* Grant special attributes */
ALTUSER ADMUSER SPECIAL    /* RACF admin */
ALTUSER ADMUSER OPERATIONS /* Bypass dataset auth */
ALTUSER AUDUSER AUDITOR    /* Read any profile */

/* List user details */
LISTUSER DEVUSR1 ALL`
    },
    { title:"RACF Groups", level:"Beginner",
      content:`RACF Groups — Organizational Security Units:

Groups organize users and simplify access management. Instead of granting access to 50 individual users, grant it to one group.

Group Hierarchy:
  RACF groups form a hierarchy (tree):
  SYS1 (top group)
    ├── PRODTEAM
    │   ├── PRODBATCH
    │   └── PRODOPER
    ├── DEVTEAM
    │   ├── DEVCOBOL
    │   └── DEVDB2
    └── QAATEAM

Creating Groups:
  ADDGROUP DEVTEAM SUPGROUP(SYS1) OWNER(SYSADM)
  ADDGROUP DEVCOBOL SUPGROUP(DEVTEAM) OWNER(DEVLEAD)

Connecting Users to Groups:
  CONNECT userid GROUP(groupname) AUTH(authority)

  Authority Levels:
  USE     — Basic member (default)
  CREATE  — Can create datasets with this group's HLQ
  CONNECT — Can connect other users to this group
  JOIN    — Can create subgroups
  SPECIAL — Group-level RACF admin

  Example:
  CONNECT DEVUSR1 GROUP(DEVCOBOL) AUTH(USE)
  CONNECT DEVLEAD GROUP(DEVTEAM) AUTH(CONNECT)

Group Access Lists:
  When you permit a group to access a resource, ALL members inherit that access:
  PERMIT 'PROD.DATA.**' ID(PRODTEAM) ACCESS(READ)
  Every member of PRODTEAM can now read datasets matching PROD.DATA.**

Default Group:
  Every user has a default group (DFLTGRP).
  When the user creates datasets, the group name may be used as HLQ.
  The default group determines ownership of user-created profiles.

Listing Group Information:
  LISTGRP groupname           ← Brief listing
  LISTGRP groupname ALL       ← Complete details
  LISTGRP groupname MEMBERS   ← Show all members

Group Best Practices:
  • Mirror organizational structure (dept → team → role)
  • Use groups for access control, not individual users
  • Regularly audit group membership
  • Remove users from groups promptly when they transfer
  • Use meaningful group names (PRODBA, DEVCOBOL, not GROUP1)`
    },
    { title:"Dataset Protection", level:"Intermediate",
      content:`Protecting Datasets with RACF:

Dataset profiles control who can read, write, create, and delete datasets. This is the most common type of RACF protection.

Profile Types:

Discrete Profile — Protects exactly one dataset:
  ADDSD 'PROD.PAYROLL.MASTER' UACC(NONE) OWNER(PRODTEAM)
  Protects only PROD.PAYROLL.MASTER

Generic Profile — Protects multiple datasets matching a pattern:
  ADDSD 'PROD.PAYROLL.**' UACC(NONE) OWNER(PRODTEAM)
  Protects all datasets starting with PROD.PAYROLL

  Pattern Characters:
  * — matches one qualifier (PROD.*.MASTER)
  ** — matches one or more qualifiers (PROD.**)
  % — matches one character (PROD.FILE%%)

Access Levels (lowest to highest):
  NONE    — No access
  EXECUTE — Execute load modules only (cannot read data)
  READ    — Read only
  UPDATE  — Read and write (modify existing records)
  CONTROL — VSAM control interval access
  ALTER   — Full control: read, write, rename, delete, scratch

Granting Access (PERMIT):
  PERMIT 'PROD.PAYROLL.**' ID(PAYROLL) ACCESS(UPDATE)
  PERMIT 'PROD.PAYROLL.**' ID(AUDITORS) ACCESS(READ)
  PERMIT 'PROD.PAYROLL.**' ID(DEVUSR1) ACCESS(READ)

Universal Access (UACC):
  The default access for anyone NOT specifically permitted:
  UACC(NONE)  — Deny by default (most secure, recommended)
  UACC(READ)  — Anyone can read (public data)
  UACC(ALTER) — Anyone has full access (dangerous!)

Profile Listing:
  LISTDSD DATASET('PROD.PAYROLL.**') ALL
  Shows: owner, UACC, access list, audit settings, creation date

Searching Profiles:
  SEARCH FILTER('PROD.PAYROLL.**')  ← Find matching profiles
  SEARCH CLASS(DATASET) MASK(PROD)  ← All profiles starting with PROD

WARNING Mode:
  Test new profiles without denying access:
  ALTDSD 'PROD.PAYROLL.**' WARNING
  RACF logs access violations but allows them.
  Use this to validate profiles before enforcement.

Best Practices:
  • Always use UACC(NONE) for production datasets
  • Use generic profiles (**) to reduce administration
  • Grant access to groups, not individual users
  • Use READ as the default grant (least privilege)
  • Audit ALTER and UPDATE access regularly
  • Use WARNING mode to test before enforcing`,
      code:`/* ─── DATASET PROTECTION EXAMPLES ──────────────────── */

/* Protect all production payroll datasets */
ADDSD 'PROD.PAYROLL.**' UACC(NONE) -
  OWNER(PAYROLL)

/* Grant access */
PERMIT 'PROD.PAYROLL.**' ID(PAYTEAM) ACCESS(UPDATE)
PERMIT 'PROD.PAYROLL.**' ID(AUDITORS) ACCESS(READ)
PERMIT 'PROD.PAYROLL.**' ID(BATCHJOB) ACCESS(UPDATE)

/* Protect sensitive system datasets */
ADDSD 'SYS1.**' UACC(NONE) OWNER(SYSADM)
PERMIT 'SYS1.**' ID(SYSPROGS) ACCESS(ALTER)

/* Protect a specific dataset (discrete) */
ADDSD 'PROD.MASTER.FILE' UACC(NONE)
PERMIT 'PROD.MASTER.FILE' ID(APPTEAM) ACCESS(READ)

/* Check who has access */
LISTDSD DATASET('PROD.PAYROLL.**') ALL AUTHUSER

/* Remove someone's access */
PERMIT 'PROD.PAYROLL.**' ID(EXUSR01) DELETE

/* Set WARNING mode for testing */
ALTDSD 'TEST.NEWRULE.**' WARNING

/* Enable auditing on sensitive data */
ALTDSD 'PROD.PAYROLL.**' -
  AUDIT(ALL(READ)) -
  GLOBALAUDIT(ALL(UPDATE))`
    },
    { title:"General Resource Protection", level:"Intermediate",
      content:`General Resource Classes — Protecting Everything Else:

RACF protects much more than just datasets. General resource classes control access to system resources, transactions, commands, and more.

Common Resource Classes:

FACILITY — System facilities and services:
  BPX.SUPERUSER    — Unix superuser (root equivalent)
  BPX.SERVER       — Server-level USS permissions
  IRR.DIGTCERT.*   — Digital certificate management

TCICSTRN — CICS transactions:
  Protect individual CICS transactions
  RDEFINE TCICSTRN TRAN01 UACC(NONE)
  PERMIT TRAN01 CLASS(TCICSTRN) ID(USERGRP) ACCESS(READ)

DSNR — DB2 resources:
  Protect DB2 subsystems, plans, packages
  RDEFINE DSNR DB2P.RUN ID(BATCHGRP) ACCESS(READ)

MQQUEUE — MQ Series queues
MQCONN — MQ Series connections

PROGRAM — Program access:
  Control who can execute specific programs
  RDEFINE PROGRAM PAYROLL UACC(NONE)
  PERMIT PAYROLL CLASS(PROGRAM) ID(PAYTEAM) ACCESS(READ)

OPERCMDS — Operator commands:
  Control who can issue system commands
  MVS.VARY.*, MVS.CANCEL.*, MVS.STOP.*

SDSF — SDSF access:
  Control SDSF panel access and job manipulation

RACF Commands for General Resources:
  RDEFINE class profile UACC(access)     ← Define a profile
  RALTER class profile ...                ← Modify a profile
  RDELETE class profile                   ← Delete a profile
  RLIST class profile ALL                 ← List a profile
  PERMIT profile CLASS(class) ID(id) ACCESS(level)
  SETROPTS CLASSACT(class)               ← Activate a class
  SETROPTS RACLIST(class) REFRESH        ← Refresh in-memory profiles

Class Activation:
  Before RACF protects a resource class, the class must be ACTIVE:
  SETROPTS CLASSACT(TCICSTRN)    ← Activate CICS transaction protection
  SETROPTS RACLIST(TCICSTRN)     ← Cache profiles in memory (performance)
  SETROPTS RACLIST(TCICSTRN) REFRESH ← Reload after changes`
    },
    { title:"RACF Auditing & Reporting", level:"Intermediate",
      content:`Auditing — Who Did What, When:

RACF maintains a comprehensive audit trail through SMF (System Management Facilities) records. This is critical for compliance, forensics, and security monitoring.

SMF Record Types for Security:
  Type 30 — Common address space work (job info)
  Type 80 — RACF processing records (the main audit records)
  Type 81 — RACF initialization statistics
  Type 83 — RACF event notifications

What RACF Logs:
  • Successful and failed logon attempts
  • Password changes and failures
  • Dataset access (successful and failed)
  • Resource access violations
  • RACF command execution
  • Profile changes (who changed what)
  • Group connections and disconnections

Audit Settings on Profiles:
  AUDIT keyword on dataset and general resource profiles:
  AUDIT(SUCCESS(READ))     — Log all successful reads
  AUDIT(FAILURES(READ))    — Log all failed read attempts
  AUDIT(ALL(READ))         — Log both successful and failed
  AUDIT(NONE)              — No auditing (default for most)

  Global Audit (cannot be overridden by profile owner):
  GLOBALAUDIT(ALL(UPDATE)) — System-wide audit of updates

SETROPTS Audit Controls:
  SETROPTS AUDIT(DATASET)        — Enable dataset auditing
  SETROPTS LOGOPTIONS(FAILURES)  — Log all access failures
  SETROPTS SAUDIT                — Audit SPECIAL user actions
  SETROPTS OPERAUDIT             — Audit OPERATIONS user actions

RACF Reports (DSMON):
  RACF Data Security Monitor generates reports:
  • Users with SPECIAL attribute (RACF admins)
  • Users with OPERATIONS attribute
  • Datasets without RACF protection
  • Users not connected to any group
  • Users with expired passwords
  • Group hierarchy report

IRRUT100 — RACF Database Unload:
  Unloads the RACF database to a flat file for custom reporting.
  Commonly used with DFSORT or SAS for analysis.

Compliance Requirements:
  PCI-DSS — Payment card industry security
  SOX — Sarbanes-Oxley financial controls
  HIPAA — Healthcare data protection
  GDPR — European data protection
  All require comprehensive audit trails that RACF provides.`
    },
    { title:"Digital Certificates & Encryption", level:"Advanced",
      content:`Modern Security — Certificates, TLS, and Encryption:

Modern mainframe security extends far beyond passwords and dataset profiles.

Digital Certificates on z/OS:
  RACF manages X.509 digital certificates for:
  • TLS/SSL communication (HTTPS, FTPS, secure connections)
  • Client authentication (certificate-based logon)
  • Code signing (verify program integrity)
  • S/MIME email encryption

  RACF Certificate Commands:
  RACDCERT GENCERT — Generate a self-signed certificate
  RACDCERT CERTAUTH — Define a Certificate Authority certificate
  RACDCERT CONNECT — Associate certificate with key ring
  RACDCERT ALTER — Modify certificate properties
  RACDCERT LIST — Display certificate details

  Key Rings:
  RACDCERT ADDRING(keyring-name) — Create a key ring
  Certificates are connected to key rings.
  Applications reference key rings to find their certificates.

z/OS Encryption:
  Data at Rest:
  • z/OS dataset encryption (RACF-managed keys)
  • DB2 native encryption
  • Pervasive encryption (encrypt everything)
  • Hardware crypto (CPACF — CP Assist for Cryptographic Function)

  Data in Transit:
  • AT-TLS (Application Transparent TLS)
  • Policy-based TLS without application changes
  • TLS 1.2/1.3 support
  • IBM Crypto Express cards for hardware acceleration

  Key Management:
  • ICSF (Integrated Cryptographic Service Facility)
  • PKDS (Public Key Data Set)
  • CKDS (Cryptographic Key Data Set)
  • TKDS (Token Key Data Set)

Multi-Factor Authentication (MFA):
  IBM Z MFA adds a second factor beyond passwords:
  • TOTP (time-based one-time passwords)
  • Certificate-based authentication
  • PIV/CAC smart cards
  • RADIUS integration
  • RSA SecurID tokens

  MFA protects against:
  • Stolen passwords
  • Brute force attacks
  • Credential sharing
  • Phishing attacks`
    },
    { title:"System-Level Security", level:"Advanced",
      content:`z/OS System Security — Protecting the Platform:

Beyond user access control, z/OS has system-level security features that protect the operating system itself.

SETROPTS — System-Wide Security Options:
  SETROPTS controls global RACF behavior:

  SETROPTS PASSWORD(INTERVAL(30))  — Password expires every 30 days
  SETROPTS PASSWORD(REVOKE(3))     — Revoke after 3 failed attempts
  SETROPTS PASSWORD(HISTORY(8))    — Remember last 8 passwords
  SETROPTS PASSWORD(MINCHANGE(1))  — Min 1 day between changes
  SETROPTS INITSTATS(DATASET)      — Initialize statistics
  SETROPTS AUDIT(DATASET)          — Audit dataset access
  SETROPTS PROTECTALL              — All datasets require profiles
  SETROPTS ERASE(ALL)              — Erase deleted dataset space

PROTECTALL:
  When active, RACF denies access to ANY dataset that doesn't have a profile.
  This is the highest security setting — nothing slips through.

Program Control:
  SETROPTS WHEN(PROGRAM)
  Controls which programs can run and from which libraries.
  Prevents execution of unauthorized programs.
  Libraries must be PROGRAM CONTROLLED.

APF Authorization:
  Authorized Program Facility — allows specific programs to run in
  supervisor state (privileged mode).
  Only APF-authorized programs can:
  • Issue privileged SVCs
  • Modify system control blocks
  • Access other address spaces
  APF libraries are defined in PROGxx member of SYS1.PARMLIB.

System Integrity:
  z/OS + System z hardware guarantees:
  • User programs CANNOT access kernel memory
  • User programs CANNOT bypass security checks
  • Each address space is completely isolated
  • Hardware keys protect storage
  This is why mainframes are trusted for the most sensitive workloads.

SMF Security:
  SMF records themselves must be protected:
  • Prevent tampering with audit logs
  • Restrict who can read SMF data
  • Archive SMF data securely for compliance

Security Health Checks:
  IBM Health Checker for z/OS includes security checks:
  • RACF database integrity
  • Expired certificates
  • Weak encryption settings
  • Missing dataset profiles
  • Users with excessive privileges`
    },
    { title:"ACF2 & Top Secret Overview", level:"Intermediate",
      content:`Alternative Security Products — ACF2 and Top Secret:

While RACF is the most common ESM, many shops use ACF2 or Top Secret. Understanding all three makes you more versatile.

ACF2 (Access Control Facility 2):

Philosophy: "Everything is denied unless explicitly permitted."
  (RACF's default is to ALLOW access if no profile exists, unless PROTECTALL is set.)

Key Concepts:
  • LOGONID (LID) — equivalent to RACF user ID
  • Access Rules — define who can access what
  • Resource Rules — protect non-dataset resources
  • Entry Source — where the user logs in from

ACF2 Rule Syntax:
  $KEY(PROD)                    ← HLQ being protected
  PAYROLL.- UID(PAYTEAM) R(A)  ← PAYTEAM can access all PROD.PAYROLL.*
  DEFAULT.- UID(*) PREVENT     ← Everyone else denied

ACF2 Advantages:
  • Default-deny is inherently more secure
  • Rule-based approach can be simpler for large environments
  • Centralized rule management

Top Secret (TSS):

Philosophy: Department-based security with strict compartmentalization.

Key Concepts:
  • ACID — Access Control ID (like RACF user ID)
  • Facility — A protected subsystem or environment
  • Profile — Access rights definition
  • Department — Organizational unit
  • Division — Higher-level org unit

TSS Command Syntax:
  TSS ADD(userid) NAME('Full Name') DEPT(dept)
  TSS PER(userid) DSN(PROD.PAYROLL.**) ACC(READ)
  TSS REV(userid)   ← Revoke user

TSS Advantages:
  • Strong compartmentalization (need-to-know basis)
  • Ownership model (each department manages its own security)
  • Good for government/defense with strict classification

Comparing ESMs:
  Feature      RACF           ACF2            Top Secret
  ──────────────────────────────────────────────────────
  Default      Allow*         Deny            Deny
  Model        Profile-based  Rule-based      Dept-based
  Vendor       IBM            Broadcom        Broadcom
  z/OS bundle  Yes            No (separate)   No (separate)
  Market share ~70%           ~15%            ~15%

  * RACF allows if no profile exists; ACF2/TSS deny by default.
    RACF with PROTECTALL=ON also denies by default.`
    },

    { title:"RACF User Administration", level:"Beginner",
      content:`Managing user IDs in RACF.

ADDUSER:
  ADDUSER USER1 NAME('John Smith') DFLTGRP(DEVGRP) PASSWORD(TEMP1234) OWNER(ADMIN1)
  Creates new user. Password must be changed on first login.

ALTUSER:
  ALTUSER USER1 NAME('John A Smith') OPERATIONS  /* Grant OPERATIONS */
  ALTUSER USER1 NOOPERATIONS  /* Revoke OPERATIONS */
  ALTUSER USER1 REVOKE  /* Suspend user */
  ALTUSER USER1 RESUME  /* Reactivate user */
  ALTUSER USER1 PASSWORD(NEWPASS) NOEXPIRED  /* Reset password */

DELUSER:
  DELUSER USER1  /* Remove user entirely */

LISTUSER:
  LISTUSER USER1  /* Show user details */
  LU USER1 ALL  /* Show all attributes */

User Attributes:
  SPECIAL — Can manage RACF (super admin)
  OPERATIONS — Can access any dataset (operations staff)
  AUDITOR — Can view audit logs
  REVOKE — Account suspended

Groups:
  ADDGROUP DEVGRP OWNER(ADMIN1) SUPGROUP(SYS1)
  CONNECT USER1 GROUP(DEVGRP) AUTH(USE)
  REMOVE USER1 GROUP(DEVGRP)

Pro Tip: Never give SPECIAL to application IDs. Use group-based access. Minimum privilege always.`
    },

    { title:"RACF Dataset Profiles", level:"Intermediate",
      content:`Dataset profiles control who can access files.

Discrete Profile:
  Protects one specific dataset.
  ADDSD 'MY.PROD.DATA' UACC(NONE) OWNER(ADMIN1)

Generic Profile:
  Protects all matching datasets.
  ADDSD 'MY.PROD.**' UACC(NONE)
  ** matches any number of qualifiers
  * matches one qualifier

PERMIT:
  PERMIT 'MY.PROD.**' ID(USER1) ACCESS(READ)
  PERMIT 'MY.PROD.**' ID(DEVGRP) ACCESS(UPDATE)
  PERMIT 'MY.PROD.**' ID(BATCHID) ACCESS(ALTER)

Access Levels:
  NONE — No access (default)
  READ — Read only
  UPDATE — Read + Write
  CONTROL — Read + Write + Full control
  ALTER — Everything including change security

UACC (Universal Access):
  Default access for everyone not explicitly PERMITted.
  UACC(NONE) — Deny all by default (most secure).

LISTDSD:
  LISTDSD DA('MY.PROD.**') ALL AUTH
  Shows profile details, access list, audit settings.

Pro Tip: Always UACC(NONE) for production datasets. Explicit PERMIT for each user/group that needs access.`
    },

    { title:"RACF Program Security", level:"Intermediate",
      content:`Control which programs can be executed and who can run them.

Program Profile:
  RDEFINE PROGRAM MYPGM UACC(NONE) ADDMEM('PROD.LOADLIB'/NOPADCHK)
  PERMIT MYPGM CLASS(PROGRAM) ID(BATCHID) ACCESS(READ)

Program Control:
  SETROPTS WHEN(PROGRAM) — Activate program control
  Only authorized programs from authorized libraries can run.

Controlled Libraries:
  RALTER PROGRAM ** ADDMEM('SYS1.LINKLIB'/NOPADCHK)
  Libraries in the program control list are "clean" — programs verified.

EXECUTE Authority:
  RDEFINE FACILITY BPX.FILEATTR.PROGCTL UACC(NONE)
  Controls execution of USS programs.

Use Cases:
  Prevent unauthorized programs from accessing sensitive data.
  Ensure only approved load modules run in production.
  Audit program execution.

Pro Tip: Program control is complex. Most shops use dataset security (who can update LOADLIB) rather than program-level security.`
    },

    { title:"RACF — Auditing & SMF", level:"Intermediate",
      content:`RACF generates audit records for security events.

SMF Type 80:
  RACF security events. Every access check generates SMF 80.
  Subtypes: SUCCESS, VIOLATION, WARNING.

Audit Settings:
  ALTDSD 'MY.PROD.**' AUDIT(SUCCESS(READ) FAILURES(READ))
  Log all successful reads and all failed attempts.

Global Audit:
  SETROPTS AUDIT(class) — Audit all accesses in a class.
  Generates high volume — use selectively.

RACF Reports:
  DSMON — Dataset Security Monitor
  RACFRW — RACF Report Writer
  Generate reports from SMF 80 records.

What to Audit:
  • All failures (access violations) — Always
  • Success on sensitive datasets — Production data, security databases
  • User administration changes — ADDUSER, ALTUSER, PERMIT
  • System authority changes — SPECIAL, OPERATIONS

Compliance:
  SOX, PCI-DSS, HIPAA require audit trails.
  RACF + SMF provides the evidence.

Pro Tip: Audit all failures globally, successes selectively on sensitive resources. Review audit reports weekly.`
    },

    { title:"RACF — FACILITY Class", level:"Advanced",
      content:`FACILITY class controls access to system functions and services.

Common FACILITY Resources:
  BPX.SUPERUSER — USS superuser (root equivalent)
  BPX.SERVER — Run as server in USS
  IRR.DIGTCERT.* — Digital certificate management
  IRR.PWRESET — Password reset authority
  BPX.FILEATTR.PROGCTL — USS program control
  CEE.* — Language Environment settings

Defining:
  RDEFINE FACILITY BPX.SUPERUSER UACC(NONE)
  PERMIT BPX.SUPERUSER CLASS(FACILITY) ID(ADMIN1) ACCESS(READ)

Activating:
  SETROPTS CLASSACT(FACILITY) RACLIST(FACILITY)
  SETROPTS RACLIST(FACILITY) REFRESH  /* After changes */

System Authorization:
  RDEFINE FACILITY IRR.RADMIN.* UACC(NONE)
  Controls who can perform RACF administration remotely.

Pro Tip: FACILITY class is the key to z/OS system security. Know BPX.SUPERUSER and IRR.* profiles for security admin roles.`
    },

    { title:"z/OS Encryption & Cryptography", level:"Advanced",
      content:`z/OS provides hardware-accelerated encryption.

CPACF (CP Assist for Cryptographic Functions):
  Hardware crypto on every z processor. No extra cost.
  AES, SHA, DES acceleration.

Crypto Express (CEX):
  Dedicated crypto hardware cards.
  RSA, ECC, key management.
  Required for PKCS#11, digital certificates.

Dataset Encryption:
  z/OS 2.3+: Encrypt datasets at rest.
  RACF key labels control encryption.
  Transparent to applications — encrypt/decrypt on I/O.

TLS/SSL:
  AT-TLS (Application Transparent TLS).
  Encrypts network traffic without application changes.
  Policy-based: Define rules in PAGENT configuration.

Key Management:
  ICSF (Integrated Cryptographic Service Facility).
  PKDS (Public Key Dataset) stores keys.
  RACF manages key labels and access.

Pervasive Encryption:
  Encrypt everything: data at rest, data in flight, data in use.
  z15+ hardware supports transparent encryption everywhere.

Pro Tip: z/OS encryption is hardware-accelerated — virtually zero performance impact. Enable it for all sensitive data.`
    },

    { title:"RACF — Digital Certificates", level:"Advanced",
      content:`RACF manages digital certificates for TLS, authentication, and signing.

Certificate Authority (CA):
  RACDCERT CERTAUTH GENCERT SUBJECTSDN(CN('My CA')) SIZE(2048) WITHLABEL('MYCA')
  Creates a local CA for issuing certificates.

Server Certificate:
  RACDCERT ID(WEBSERV) GENCERT SUBJECTSDN(CN('myserver.com')) SIZE(2048) WITHLABEL('SERVERSSL') SIGNWITH(CERTAUTH LABEL('MYCA'))

Key Ring:
  RACDCERT ID(WEBSERV) ADDRING(SSLRING)
  RACDCERT ID(WEBSERV) CONNECT(ID(WEBSERV) LABEL('SERVERSSL') RING(SSLRING) DEFAULT)
  RACDCERT ID(WEBSERV) CONNECT(CERTAUTH LABEL('MYCA') RING(SSLRING))
  Key rings hold certificates for TLS connections.

Certificate Management:
  RACDCERT LIST — Show all certificates
  RACDCERT CHECKCERT — Verify certificate
  RACDCERT DELETE — Remove certificate

Use Cases:
  CICS HTTPS, DB2 DDF TLS, FTP over TLS, AT-TLS.

Pro Tip: Certificate expiration causes outages. Track expiration dates and renew before they expire.`
    },

    { title:"z/OS Security Hardening", level:"Expert",
      content:`Best practices for securing a z/OS system.

Principle of Least Privilege:
  UACC(NONE) on all profiles. Explicit PERMIT for each user.
  No blanket access. No shared IDs.

Password Policy:
  SETROPTS PASSWORD(MINLENGTH(8) MIXEDCASE HISTORY(24) INTERVAL(90))
  Require complexity, prevent reuse, force rotation.

Remove Default Access:
  Audit all UACC(READ) or UACC(UPDATE) profiles.
  Change to UACC(NONE) and add explicit PERMITs.

Protect System Datasets:
  SYS1.** — Only system programmers
  RACF database — Only RACF admins
  APF libraries — Restrict UPDATE access

Audit Critical Resources:
  AUDIT(ALL(READ)) on: security databases, production data, crypto keys.

Monitor:
  Review SMF 80 records daily for violations.
  Alert on: failed logins, privilege escalation, sensitive data access.

Network:
  AT-TLS for encryption.
  Firewall rules for mainframe ports.
  SSH instead of telnet.

Pro Tip: Security is layers: RACF + encryption + auditing + monitoring. No single measure is sufficient.`
    },


    { title:"Security Interview Questions", level:"All Levels",
      content:`RACF/Security Interview Questions — 20+ Q&A.

Q: What is RACF?
A: Resource Access Control Facility — z/OS security subsystem. Controls who can access what. Alternatives: ACF2, Top Secret.

Q: What are the three pillars of RACF?
A: Users (ADDUSER), Groups (ADDGROUP), Resources (dataset profiles, general resource profiles). Connect users to groups, permit access to resources.

Q: What is a RACF profile?
A: Definition of access rules. Discrete profiles (one dataset) or Generic profiles (pattern matching with * and %).

Q: What access levels does RACF provide?
A: NONE, READ, UPDATE, CONTROL, ALTER (highest). ALTER includes all others.

Q: What is a RACF group?
A: Collection of users. Used for managing access. Users connect to groups. One group is the default group.

Q: How do you give a user access to a dataset?
A: PERMIT 'dataset.name' ID(userid) ACCESS(READ). Or through group membership.

💡 Study Tip: Know ADDUSER, PERMIT, LISTDSD, and profile types.`,
    },

    { title:"RACF & Security Cheat Sheet", level:"All Levels",
      content:`RACF Quick Reference — Cheat Sheet

═══ COMMANDS ═══
ADDUSER userid NAME('name') DFLTGRP(group) PASSWORD(pass)
ALTUSER userid NAME('new name') RESUME
DELUSER userid
CONNECT userid GROUP(group) AUTH(USE/CREATE/CONNECT/JOIN)
PERMIT 'profile' ID(userid/group) ACCESS(READ/UPDATE/ALTER)
LISTUSER userid ALL
LISTDSD DA('dataset') ALL
SEARCH FILTER(pattern)

═══ ACCESS LEVELS ═══
NONE → READ → UPDATE → CONTROL → ALTER`,
    },

    { title:"20 — RACF Group Administration", level:"Intermediate",
      content:`RACF groups organize users and simplify access.

Commands: ADDGROUP (AG), LISTGRP (LG), CONNECT (CO), REMOVE (RE).
Group authority levels: USE, CREATE, CONNECT, JOIN.

Best Practices: Use groups not individual permits. Name descriptively. Review membership quarterly.

Pro Tip: Add users to groups rather than individual permits — makes auditing 10x easier.`,
      code:``
    },

    { title:"21 — RACF General Resource Security", level:"Advanced",
      content:`General resource profiles protect non-dataset resources.

Classes: FACILITY, PROGRAM, SURROGAT, APPL, OPERCMDS, JESSPOOL, TERMINAL, SDSF.
FACILITY examples: BPX.SUPERUSER, BPX.DAEMON, IRR.DIGTCERT.CREATE.

Commands:
  RDEFINE class profile UACC(NONE)
  PERMIT profile CLASS(class) ID(user) ACCESS(READ)
  SETROPTS RACLIST(class) REFRESH

Pro Tip: Always SETROPTS RACLIST REFRESH after changing general resource profiles.`,
      code:``
    },

    { title:"22 — RACF Password and Passphrase Policies", level:"Intermediate",
      content:`RACF supports passwords (8 char) and passphrases (14-100 char).

Password Rules (SETROPTS): MINLENGTH, HISTORY, INTERVAL, REVOKE, RULES.
Passphrases: Much more secure, easier to remember. Enable via SETROPTS PASSWORD(PASSPHRASE).
KDFAES: AES-based password encryption (recommended over legacy DES).
MFA: IBM MFA for z/OS supports TOTP, smart cards, RSA/Duo integration.

Pro Tip: Migrate to passphrases. 20 characters = effectively unbreakable.`,
      code:``
    },

    { title:"23 — RACF and USS/UNIX Security", level:"Advanced",
      content:`RACF secures UNIX System Services on z/OS.

Mapping: UID to RACF user, GID to RACF group, permissions to rwx.
Setup: ALTUSER userid OMVS(UID(nnnnn) HOME('/u/userid') PROGRAM('/bin/sh'))
FACILITY profiles: BPX.SUPERUSER, BPX.DAEMON, BPX.SERVER.
File security: Both POSIX permissions AND RACF. ACLs via setfacl.

Pro Tip: Never assign UID 0 to regular users. Use BPX.SUPERUSER with PERMIT.`,
      code:``
    },

    { title:"24 — RACF Logging and SMF Records", level:"Advanced",
      content:`RACF logs security events to SMF.

Type 80 subtypes: ACCESS events, DEFINE events, PERMIT events, CONNECT events, PASSWORD events.
Type 83: Dataset access attempts (success and failure).
Auditing: UAUDIT (per user), GLOBALAUDIT, AUDIT(SUCCESS/FAILURE/ALL) per profile.
Compliance: SOX, PCI-DSS, HIPAA, GDPR all require SMF-based audit trails.

Pro Tip: Set UAUDIT on all users with SPECIAL or OPERATIONS authority.`,
      code:``
    },

    { title:"25 — RACF Database Administration", level:"Advanced",
      content:`RACF maintains its own database.

Utilities:
  IRRUT200 — Backup RACF database
  IRRUT400 — Restructure/initialize
  IRRDBU00 — Unload to sequential file for reporting
  IRRRID00 — Remove residual IDs

Sysplex: RRSFDATA for RACF Remote Sharing. Automatic propagation across systems.

Pro Tip: Run IRRDBU00 weekly and build custom reports — most flexible way to answer audit questions.`,
      code:``
    },

    { title:"26 — z/OS Pervasive Encryption", level:"Expert",
      content:`IBM Z provides encryption at every level.

Layers: Dataset (DFSMS), Network (TLS/IPSec), Database (DB2 column), Tape (hardware), Memory (Secure Execution).
CPACF: Hardware acceleration for AES, SHA, RSA. No CPU cost — separate crypto engine.
Key Management: ICSF with PKDS, CKDS, TKDS. Hardware Security Module (Crypto Express).

Expert Tip: With CPACF, encryption is essentially free on Z. No performance reason to NOT encrypt.`,
      code:``
    },

    { title:"27 — RACF and CICS Security", level:"Intermediate",
      content:`RACF controls CICS security at multiple levels.

Layers: Signon (CESN), Transaction (TCICSTRN), Resource (per type), Command (CCICSCMD).
Classes: TCICSTRN (transactions), CCICSCMD (commands), FCICSFCT (files), MCICSPPT (programs).
Setup: Create groups per app, permit groups not individual transactions, separate dev/test/prod.

Pro Tip: Use RACF-based security over CICS exits for audit compliance.`,
      code:``
    },

    { title:"28 — RACF and DB2 Security", level:"Intermediate",
      content:`RACF controls DB2 access at multiple levels.

Layers: Connection (DSNR class), Authorization (GRANT/REVOKE), Resource (RACF classes).
RACF Classes: DSNR (connection), MDSNB (BIND), MDSNS (admin).
GRANT vs RACF: Most shops use RACF for consistency. Centralizes all security.

Pro Tip: Use RACF for DB2 security rather than DB2 GRANT. Simplifies audits.`,
      code:``
    },

    { title:"29 — Security Incident Response", level:"Expert",
      content:`Responding to security incidents on z/OS.

Detection: Multiple failed logons (SMF 80), unusual access patterns (SMF 83), privilege escalation, after-hours activity.

Response:
  1. Verify — Confirm real incident
  2. Contain — ALTUSER userid REVOKE
  3. Preserve — Capture SMF logs
  4. Investigate — Extract relevant records
  5. Remediate — Fix vulnerability
  6. Report — Document per policy

Expert Tip: Build pre-written SMF extraction JCL for incident response in advance.`,
      code:``
    },

    { title:"30 — RACF Interview Q&A + Cheat Sheet", level:"Beginner",
      content:`Common RACF interview questions.

Q: What is RACF? A: Resource Access Control Facility — z/OS security subsystem.
Q: Privileged attributes? A: SPECIAL (admin), OPERATIONS (all datasets), AUDITOR (view all).
Q: Give dataset access? A: PERMIT 'dsn' ID(user) ACCESS(READ|UPDATE|ALTER)
Q: Generic profile? A: Wildcard profile covering multiple resources.
Q: Reset password? A: ALTUSER userid PASSWORD(newpw)

Cheat Sheet:
  AU/ALU/LU — Add/Alter/List User
  AG/CO/RE — Add Group/Connect/Remove
  ADDSD/PERMIT — Dataset profiles
  SETROPTS — System options
  IRRDBU00 — Unload database`,
      code:``
    },

    { title:"20 — RACF Group Administration", level:"Intermediate",
      content:`RACF groups organize users and simplify access management.

Group Concepts: Every user belongs to a default group. Users can connect to multiple groups. Group authority levels: USE, CREATE, CONNECT, JOIN.

Commands: ADDGROUP (AG), LISTGRP (LG), CONNECT (CO), REMOVE (RE).

Best Practices: Use groups for access, not individual permits. Name descriptively. Review membership quarterly.

💡 Pro Tip: When someone asks for access, add them to the appropriate group rather than individual permits. Makes auditing 10x easier.`,
      code:``
    },
    { title:"21 — RACF General Resource Security", level:"Advanced",
      content:`General resource profiles protect non-dataset resources.

Common Classes: FACILITY (system facilities), PROGRAM (program access), SURROGAT (surrogate submission), APPL (application access), OPERCMDS (operator commands), JESSPOOL, TERMINAL, SDSF.

FACILITY Examples: BPX.SUPERUSER (UNIX superuser), BPX.DAEMON (daemon authority), IRR.DIGTCERT.CREATE (certificates).

Commands: RDEFINE, PERMIT, RLIST, SETROPTS RACLIST REFRESH.

💡 Pro Tip: After changing general resource profiles, always SETROPTS RACLIST REFRESH. Changes do not take effect until refreshed.`,
      code:``
    },
    { title:"22 — RACF Password and Passphrase Policies", level:"Intermediate",
      content:`RACF supports traditional passwords and modern passphrases.

Password Rules: MINLENGTH, HISTORY (remember last N), INTERVAL (expiry days), REVOKE (failed attempts).

Passphrases: 14-100 characters, much more secure than 8-char passwords, easier to remember.

MFA: IBM MFA for z/OS supports TOTP, smart cards, RSA/Duo integration.

💡 Pro Tip: Migrate to passphrases. An 8-char password has ~2 trillion combinations. A 20-char passphrase has ~10^28.`,
      code:``
    },
    { title:"23 — RACF and USS/UNIX Security", level:"Advanced",
      content:`RACF secures UNIX System Services on z/OS.

USS maps UNIX security to RACF: UID to RACF user, GID to RACF group, rwx permissions, superuser via UID 0 or BPX.SUPERUSER.

User Setup: ALTUSER userid OMVS(UID(nnnnn) HOME('/u/userid') PROGRAM('/bin/sh')).

Key FACILITY Profiles: BPX.SUPERUSER, BPX.DAEMON, BPX.SERVER, BPX.FILEATTR.APF.

💡 Pro Tip: Never assign UID 0 to regular users. Use BPX.SUPERUSER FACILITY profile with PERMIT for controlled access.`,
      code:``
    },
    { title:"24 — RACF Logging and SMF Records", level:"Advanced",
      content:`RACF logs security events to SMF for auditing.

SMF Type 80 Subtypes: ACCESS events, DEFINE events, PERMIT events, CONNECT events, PASSWORD events.

SMF Type 83: Records dataset access attempts for data loss prevention.

Auditing Controls: UAUDIT (audit all actions by a user), GLOBALAUDIT, AUDIT(SUCCESS/FAILURE/ALL) per profile.

💡 Pro Tip: Set UAUDIT on all users with SPECIAL or OPERATIONS authority. Every privileged action should be logged.`,
      code:``
    },
    { title:"25 — RACF Database Administration", level:"Advanced",
      content:`RACF maintains its own database requiring careful management.

Components: Primary database (active), backup database (auto copy), shared on DASD for Sysplex.

Utilities: IRRUT200 (backup), IRRUT400 (restructure), IRRDBU00 (unload for reporting), IRRRID00 (remove residual IDs).

IRRDBU00: Extracts RACF data to flat file for custom reporting and compliance audits.

💡 Pro Tip: Run IRRDBU00 weekly and build custom reports. Most flexible way to answer audit questions about access.`,
      code:``
    },
    { title:"26 — z/OS Pervasive Encryption", level:"Expert",
      content:`IBM Z provides encryption at every level.

Layers: Dataset encryption (DFSMS), network (TLS/SSL, AT-TLS), database (DB2 column-level), tape (hardware), memory (Secure Execution).

CPACF: Hardware acceleration for AES, SHA, RSA. No CPU cost — separate crypto engine. Millions of operations per second.

Key Management (ICSF): PKDS (public keys), CKDS (symmetric keys), TKDS (PKCS #11), Crypto Express adapter.

💡 Expert Tip: With CPACF, encryption is essentially free on Z. No performance reason to NOT encrypt.`,
      code:``
    },
    { title:"27 — RACF and CICS Security", level:"Intermediate",
      content:`RACF controls CICS transaction and resource security.

Security Layers: Signon (CESN), transaction security (TCICSTRN class), resource security, command security (CCICSCMD), surrogate security.

Transaction Security: RDEFINE TCICSTRN tranid UACC(NONE), then PERMIT to groups. READ = permission to execute.

Resource Classes: TCICSTRN (transactions), CCICSCMD (commands), FCICSFCT (files), MCICSPPT (programs).

💡 Pro Tip: Permit transaction groups, not individual transactions. Separate dev/test/prod security profiles.`,
      code:``
    },
    { title:"28 — RACF and DB2 Security", level:"Intermediate",
      content:`RACF controls DB2 access at multiple levels.

Security Layers: Connection (DSNR class), authorization (GRANT/REVOKE), RACF resource security, row/column access control.

GRANT vs RACF: DB2 supports both. Most shops use RACF for consistency and audit.

Connection: RDEFINE DSNR DB2P.BATCH UACC(NONE), then PERMIT to batch groups.

💡 Pro Tip: Use RACF for DB2 security rather than DB2 GRANT. Centralizes all security, making audits simpler.`,
      code:``
    },
    { title:"29 — Security Incident Response", level:"Expert",
      content:`Responding to security incidents on z/OS.

Detection: Multiple failed logons (SMF 80), unusual dataset access (SMF 83), privilege escalation, after-hours activity.

Immediate Response: Verify, contain (ALTUSER userid REVOKE), preserve SMF logs, investigate, remediate, report.

Forensics: SMF Type 80 (RACF events), Type 30 (jobs run), Type 83 (dataset access), LISTUSER, IRRDBU00 unload.

💡 Expert Tip: Build pre-written SMF extraction JCL for incident response. Do not waste time writing DFSORT cards during an incident.`,
      code:``
    },
    { title:"30 — RACF Interview Q&A + Cheat Sheet", level:"Beginner",
      content:`Common RACF interview questions.

Q: What is RACF?
A: Resource Access Control Facility — z/OS security subsystem controlling access to datasets, resources, and services.

Q: What are RACF privileged attributes?
A: SPECIAL (full admin), OPERATIONS (access all datasets), AUDITOR (view all profiles/logs).

Q: How do you give dataset access?
A: PERMIT 'dataset.name' ID(userid) ACCESS(READ|UPDATE|ALTER)

Cheat Sheet:
  ADDUSER (AU), ALTUSER (ALU), LISTUSER (LU)
  ADDGROUP (AG), CONNECT (CO)
  ADDSD, PERMIT, SEARCH, SETROPTS
  Classes: DATASET, FACILITY, PROGRAM, TCICSTRN, DSNR
  SMF 80 — Security events
  SMF 83 — Dataset access
  IRRDBU00 — Unload database`,
      code:``
    },
  ]
};
