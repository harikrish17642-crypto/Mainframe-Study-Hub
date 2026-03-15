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
    { title:"Security Interview Questions", level:"All Levels",
      content:`RACF & Security Interview Questions:

BEGINNER:

Q: What are the three pillars of z/OS security?
A: Identification (who are you — user ID), Authentication (prove it — password/certificate), and Authorization (what can you do — access permissions).

Q: What is RACF?
A: RACF (Resource Access Control Facility) is IBM's External Security Manager for z/OS. It controls user authentication, dataset protection, resource authorization, and auditing. It's the most widely used security product on mainframes.

Q: What are the RACF access levels for datasets?
A: NONE, EXECUTE, READ, UPDATE, CONTROL, ALTER — in increasing order of privilege. READ allows reading, UPDATE allows reading and writing, ALTER allows full control including delete.

Q: What is the difference between a discrete and generic profile?
A: A discrete profile protects exactly one dataset. A generic profile uses pattern matching (* and **) to protect multiple datasets matching the pattern. Generic profiles reduce administrative overhead.

INTERMEDIATE:

Q: Explain UACC and why NONE is recommended.
A: UACC (Universal Access) is the default access for anyone not specifically listed in the access list. UACC(NONE) is recommended because it enforces the principle of least privilege — only users explicitly permitted can access the resource.

Q: What is the OPERATIONS attribute and why is it dangerous?
A: OPERATIONS gives a user the ability to bypass dataset authorization checks. The user can access any dataset regardless of RACF profiles. It should only be used by system programmers for emergency maintenance and should be audited carefully.

Q: How does RACF auditing work?
A: RACF generates SMF Type 80 records for security events (logons, access attempts, profile changes). These are written to SMF datasets and can be analyzed with tools like IRRUT100, DSMON, or third-party products. Audit settings can be configured per profile or globally.

Q: What is a key ring?
A: A key ring is a RACF construct that holds digital certificates and private keys. Applications reference key rings to find the certificates they need for TLS/SSL communication. Multiple certificates can be connected to a single key ring.

ADVANCED:

Q: Explain Pervasive Encryption on z/OS.
A: Pervasive Encryption encrypts data transparently at the dataset level using hardware-accelerated cryptography (CPACF). RACF manages the encryption keys. It provides data-at-rest protection without application changes. Combined with AT-TLS for data-in-transit, it provides end-to-end encryption.

Q: What is the difference between RACF, ACF2, and Top Secret?
A: RACF is profile-based with default-allow (unless PROTECTALL), ACF2 is rule-based with default-deny, and Top Secret is department-based with default-deny. RACF is bundled with z/OS (~70% market share), while ACF2 and TSS are separate Broadcom products (~15% each).

Q: How would you secure a new CICS application?
A: Define users/groups, activate TCICSTRN class, create profiles for each transaction, grant access via groups, protect associated DB2 plans (DSNR class), protect CICS resources, enable auditing, test with WARNING mode first, then enforce.`
    },
  ]
};
