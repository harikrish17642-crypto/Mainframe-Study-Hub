export const TSO_TOPIC = {
  id:"tso", icon:"🖥️", title:"TSO / ISPF", subtitle:"z/OS Interactive Environment", color:"#14b8a6", level:"Beginner → Expert",
  description:"The interactive command shell and editor of z/OS. Every mainframe developer's daily workspace.",
  sections:[
    { title:"Introduction to TSO & ISPF", level:"Beginner",
      content:`TSO (Time Sharing Option) and ISPF (Interactive System Productivity Facility) are the primary interactive interfaces on z/OS.

TSO — The Command Shell:
  TSO is z/OS's interactive command processor. Think of it as the mainframe equivalent of a Unix shell or Windows command prompt. TSO allows users to:
  • Execute commands interactively
  • Edit datasets
  • Submit batch jobs
  • Manage files and catalogs
  • Run programs and REXX scripts
  • Access system utilities

ISPF — The Full-Screen Interface:
  ISPF runs on top of TSO and provides a full-screen panel-driven interface. It's the "desktop" of the mainframe — where developers spend most of their day.

  ISPF provides:
  • A powerful text editor (option 2)
  • Dataset management utilities (option 3)
  • Job submission and output viewing
  • Search and compare tools
  • Customizable panels and dialogs
  • SDSF integration for job monitoring

How to Connect:
  Users connect to z/OS via a 3270 terminal emulator:
  • IBM Personal Communications (PCOMM)
  • Mocha TN3270 (Mac)
  • x3270 (Linux/Mac open source)
  • wc3270 (Windows open source)
  • Zowe Terminal (modern)
  • Vista TN3270 (popular)

  Connection: TN3270 to the z/OS TCP/IP address on port 23 (or custom port).
  You see the TSO logon screen → enter user ID and password → ISPF starts.

The 3270 Screen:
  The 3270 terminal is a block-mode terminal:
  • You type into fields on the screen
  • Press ENTER to send the entire screen to z/OS
  • The screen refreshes with the response
  • Function keys (PF keys) invoke specific actions

  Key PF Keys:
  PF1  — Help
  PF3  — Exit/End (go back)
  PF5  — Find (in editor)
  PF7  — Scroll Up
  PF8  — Scroll Down
  PF10 — Scroll Left
  PF11 — Scroll Right
  PF12 — Cancel/Retrieve`
    },
    { title:"ISPF Primary Option Menu", level:"Beginner",
      content:`ISPF Primary Option Menu:

When you log in, ISPF displays the Primary Option Menu:

  ┌──────────────────────────────────────────────┐
  │  Menu  Utilities  Compilers  Options  Status │
  │ ─────────────────────────────────────────────│
  │  0  Settings      Terminal and user settings │
  │  1  View          Display source data        │
  │  2  Edit          Create or change source    │
  │  3  Utilities     Dataset/file utilities      │
  │  4  Foreground    Interactive processing      │
  │  5  Batch         Submit jobs for processing  │
  │  6  Command       Enter TSO/ISPF commands     │
  │  7  Dialog Test   Test ISPF dialog panels     │
  │  8  LM Utilities  Library management         │
  │  9  IBM Products  IBM application aids        │
  │  10 SCLM          SW Config Library Mgr      │
  │  11 Workplace     ISPF Object Workplace      │
  │  SD SDSF          System Display & Search    │
  │  M  More          Additional ISPF options     │
  │ ─────────────────────────────────────────────│
  │ Option ===> _                                │
  └──────────────────────────────────────────────┘

Most Used Options:

Option 2 — EDIT (where developers live):
  Edit PDS members, sequential files, any text dataset.
  Full-screen editor with line commands and primary commands.

Option 3 — UTILITIES:
  3.1 — Library display (browse PDS directory)
  3.2 — Dataset allocate (create new datasets)
  3.3 — Move/Copy (copy members between PDS)
  3.4 — Dataset list (DSLIST — most used utility!)
  3.5 — Reset Statistics
  3.6 — Hardcopy
  3.7 — Merge datasets
  3.8 — Outlist (view job output)

Option 3.4 — DSLIST (Dataset List):
  The most-used ISPF utility. Enter a dataset pattern:
  DSNAME LEVEL ===> PROD.PAYROLL
  Shows all matching datasets with line commands:
  E — Edit    V — View    B — Browse
  D — Delete  R — Rename  I — Info    M — Member list

SDSF (System Display and Search Facility):
  Usually accessed from the ISPF menu as option "SD" or "S".
  The primary tool for monitoring jobs and viewing output.`
    },
    { title:"ISPF Editor", level:"Beginner",
      content:`ISPF Editor — The Mainframe Developer's Best Friend:

The ISPF editor is where you write code, edit JCL, modify data files, and do most of your daily work.

Entering the Editor:
  Option 2 from ISPF menu:
  ISPF LIBRARY:
    Project  ===> MY
    Group    ===> COBOL
    Type     ===> SOURCE
    Member   ===> PAYROLL    (blank for member list)

  Or OTHER DATASET:
    Data Set Name ===> 'PROD.COBOL.SOURCE(PAYROLL)'

Primary Commands (typed on the command line):
  FIND text     — Search for text (F text)
  CHANGE a b    — Replace text (C old new ALL)
  SAVE          — Save changes
  CANCEL        — Discard changes and exit
  SUBMIT        — Submit JCL for execution
  COPY          — Copy from another dataset
  MOVE          — Move from another dataset
  SORT           — Sort lines
  RESET         — Clear all line commands
  COLS          — Show column ruler
  HEX ON/OFF    — Toggle hexadecimal display
  HILITE JCL    — Syntax highlighting for JCL
  HILITE COBOL  — Syntax highlighting for COBOL
  PROFILE       — Show editor profile settings
  BOUNDS        — Set left/right edit boundaries
  NUM ON/OFF    — Toggle line numbers
  UNDO          — Undo last change

Line Commands (typed in the line number area):
  I   — Insert a blank line (I5 = insert 5 lines)
  D   — Delete line (D5 = delete 5 lines, DD/DD = block delete)
  C   — Copy line (CC/CC = block copy, then A or B to place)
  M   — Move line (MM/MM = block move, then A or B to place)
  R   — Repeat line (R5 = repeat 5 times, RR/RR = block repeat)
  A   — After (paste copied/moved lines after this line)
  B   — Before (paste copied/moved lines before this line)
  O   — Overlay (merge lines)
  X   — Exclude (hide lines)
  S   — Show (unhide excluded lines)
  TE  — Text Entry (enter multi-line text)
  TF  — Text Flow (reformat paragraph)
  TS  — Text Split (break line at cursor position)
  >   — Shift right (>5 = shift 5 columns)
  <   — Shift left (<5 = shift 5 columns)
  UC  — Uppercase
  LC  — Lowercase

FIND and CHANGE — Power Features:
  F 'PERFORM' 1 72      — Find only in columns 1-72
  F 'SECTION' NEXT      — Find next occurrence
  F 'ERROR' ALL         — Find all and count
  F 'MOVE' FIRST        — Find first occurrence
  F P'¬' 1 72           — Find non-blank (picture string)
  C 'OLD' 'NEW' ALL     — Change all occurrences
  C 'OLD' 'NEW' ALL NX  — Change all, not excluded lines
  C 'A' 'B' 10 20       — Change only in columns 10-20`
    },
    { title:"TSO Commands", level:"Intermediate",
      content:`TSO Commands — The z/OS Command Line:

TSO commands can be entered from ISPF option 6, the TSO READY prompt, or the ISPF command line (prefixed with TSO).

Dataset Commands:
  ALLOCATE — Create/allocate a dataset
    ALLOC DA('MY.NEW.FILE') NEW CATALOG -
      SPACE(10,5) TRACKS -
      RECFM(F B) LRECL(80) BLKSIZE(0)

  FREE — Release (deallocate) a dataset
    FREE DA('MY.FILE')

  DELETE — Delete a dataset
    DELETE 'MY.OLD.FILE'

  RENAME — Rename a dataset
    RENAME 'MY.OLD.NAME' 'MY.NEW.NAME'

  LISTDS — List dataset information
    LISTDS 'MY.FILE' STATUS MEMBERS
    Shows: DSORG, RECFM, LRECL, BLKSIZE, volumes, members

  LISTCAT — List catalog entry
    LISTCAT ENTRIES('MY.FILE') ALL

File Transfer:
  IND$FILE — Transfer files to/from PC
    Used through 3270 emulator file transfer function.
    From PC to mainframe: "send" command
    From mainframe to PC: "receive" command

Program Execution:
  CALL 'MY.LOADLIB(MYPROG)'  — Execute a program
  EXEC 'MY.REXX.LIB(MYSCRIPT)' — Run a REXX exec
  SUBMIT 'MY.JCL.LIB(MYJOB)'  — Submit JCL

System Information:
  LISTUSER        — Display your RACF user profile
  TIME            — Display system time
  STATUS          — Show active jobs for your user ID
  SEND 'message' USER(userid)  — Send message to another user
  PROFILE         — Display/change TSO profile settings

ISPF Commands (from command line):
  TSO LISTDS 'MY.FILE'  — Run TSO command from ISPF
  =3.4                   — Jump to ISPF option 3.4
  =SD                    — Jump to SDSF
  START 2                — Open second edit session (split screen)
  SWAP                   — Switch between split screen sessions
  KEYS                   — Define PF key assignments
  CUT / PASTE            — Clipboard operations`
    },
    { title:"SDSF — Job Monitoring", level:"Beginner",
      content:`SDSF (System Display and Search Facility):

SDSF is the essential tool for monitoring batch jobs and viewing their output. Every mainframe developer uses SDSF daily.

Accessing SDSF:
  From ISPF: Enter "SD" or "S" on the command line (installation-dependent)
  Or navigate through the ISPF menu to the SDSF option.

Main SDSF Panels:
  DA  — Display Active (currently running jobs)
  I   — Input Queue (jobs waiting to execute)
  O   — Output Queue (completed, output available)
  H   — Held Output Queue
  ST  — Status (all jobs — most comprehensive view)
  LOG — System Log (console messages)
  SYSLOG — System Log (permanent)
  SE  — Scheduler Environment
  PR  — Printers
  INIT — Initiators

Using ST (Status) Panel:
  Command ===> ST
  PREFIX ===> userid*    ← Show only your jobs (or * for all)
  OWNER  ===> *          ← Filter by owner

  Job list shows: JOBNAME, JOBID, OWNER, PRTY, C (class), STATUS, RC
  Status values: ACTIVE, INPUT, OUTPUT, HELD

Line Commands on Job List:
  S   — Select (view job output — JESMSGLG, JESJCL, JESYSMSG, sysout)
  ?   — View JCL that was submitted
  P   — Purge (delete job and all output)
  C   — Cancel (stop a running job)
  H   — Hold output
  A   — Release held output
  SJ  — Submit JCL from output
  SE  — View extended job info

Viewing Job Output (after selecting with S):
  JESMSGLG — JES message log (timestamps, job status)
  JESJCL   — Expanded JCL (with PROC expansion)
  JESYSMSG — System messages (allocation, return codes, abend info)
  SYSPRINT — Program output (your application's print)
  SYSOUT   — Other program output

  Navigation in output:
  PF7/PF8  — Scroll up/down
  PF10/PF11 — Scroll left/right
  FIND text — Search within output
  BOTTOM    — Go to end
  TOP       — Go to beginning

Finding Errors:
  1. Check RC (return code) on ST panel
  2. Select the job → go to JESYSMSG
  3. Search for "IEF" messages (allocation/deallocation)
  4. Search for "ICH" messages (security violations)
  5. Check SYSPRINT for program-specific errors
  6. Check SYSUDUMP/SYSABEND for dump information`
    },
    { title:"Dataset Utilities (3.x)", level:"Intermediate",
      content:`ISPF Utilities — Dataset Management:

ISPF Option 3 provides utilities for creating, copying, and managing datasets.

3.1 — Library Utility:
  Display and manage PDS members.
  Enter a PDS name → see member list with statistics:
  Name, VV.MM (version), Created, Changed, Size, Init, Mod, ID

3.2 — Dataset Allocate:
  Create new datasets:
  Data Set Name: MY.NEW.DATASET
  Management class: (SMS)
  Storage class:    (SMS)
  Volume serial:    (or SMS-managed)
  Space units:      TRACKS / CYLINDERS / KILOBYTES
  Primary quantity:  100
  Secondary:         50
  Directory blocks:  20  (for PDS)
  Record format:     FB
  Record length:     80
  Block size:        0  (system-determined)
  Data set type:     PDS / PDSE / Sequential

3.3 — Move/Copy:
  Copy or move members between PDS:
  From: MY.SOURCE.LIB
  To:   MY.TARGET.LIB
  Options: Copy, Move, Replace existing members

3.4 — Dataset List (DSLIST):
  The most powerful utility. Enter a DSN pattern:
  DSNAME LEVEL ===> MY.**
  
  Shows all matching datasets with actions:
  Line Commands:
    E — Edit             V — View (read-only)
    B — Browse           D — Delete
    R — Rename           I — Dataset Information
    M — Member list      S — Short info
    C — Catalog info     X — Print index
    Z — Compress PDS     = — Repeat last action

  Member List (from M command on a PDS):
  Shows all members with line commands:
    E — Edit member      V — View member
    B — Browse           D — Delete member
    R — Rename           S — Select
    C — Copy             P — Print

3.5 — Reset Statistics:
  Reset ISPF statistics on PDS members.

3.6 — Hardcopy:
  Print datasets to SYSOUT.

Dataset Information (I command):
  Shows comprehensive details:
  DSORG, RECFM, LRECL, BLKSIZE, creation date,
  expiration date, volumes, extents, used tracks,
  SMS classes, catalog information.`
    },
    { title:"ISPF Edit Macros", level:"Advanced",
      content:`Edit Macros — Automating Editor Tasks:

ISPF edit macros are REXX (or CLIST) programs that automate repetitive editing tasks. They're incredibly powerful productivity tools.

How Edit Macros Work:
  1. Write a REXX program that uses ISREDIT commands
  2. Store it in a SYSPROC or SYSEXEC library
  3. Invoke it from the ISPF editor command line

Basic Edit Macro Structure:
  /* REXX - Edit macro to add standard header */
  ADDRESS ISREDIT
  "MACRO"                     /* Declare this as a macro */
  "ISREDIT (MEMBER) = MEMBER" /* Get member name */
  "ISREDIT LINE_BEFORE 1 = MSGLINE '* ═══════════════════'"
  "ISREDIT LINE_BEFORE 1 = MSGLINE '* Program: '"member
  "ISREDIT LINE_BEFORE 1 = MSGLINE '* Date:    '"date()
  "ISREDIT LINE_BEFORE 1 = MSGLINE '* ═══════════════════'"
  EXIT

ISREDIT Commands (used in macros):
  Navigation:
    ISREDIT CURSOR = row col    — Position cursor
    ISREDIT (r,c) = CURSOR      — Get cursor position
    ISREDIT LOCATE label        — Go to a label

  Line Operations:
    ISREDIT LINE n = text       — Set line content
    ISREDIT (text) = LINE n     — Get line content
    ISREDIT LINE_BEFORE n = DATALINE text — Insert before
    ISREDIT LINE_AFTER n = DATALINE text  — Insert after
    ISREDIT DELETE n            — Delete line n
    ISREDIT (last) = LINENUM .ZLAST — Get last line number

  Find/Change:
    ISREDIT FIND text           — Find text
    ISREDIT CHANGE old new ALL  — Replace text
    ISREDIT (count) = FIND_COUNTS — Get find count

  Data Info:
    ISREDIT (member) = MEMBER   — Get member name
    ISREDIT (dsn) = DATASET     — Get dataset name
    ISREDIT (changed) = DATA_CHANGED — Was data modified?

Practical Edit Macro Examples:
  • ADDHEADER — Add standard program header
  • FIXCOLS — Fix column alignment in COBOL
  • FINDDUP — Find duplicate lines
  • LINEUP — Align COBOL VALUE clauses
  • XCOUNT — Count excluded lines
  • COMPARE — Compare with another member
  • NUMBER — Renumber COBOL sequence numbers`
    },
    { title:"Split Screen & Productivity", level:"Intermediate",
      content:`Power User Techniques:

Split Screen:
  ISPF supports up to 8 simultaneous screens:
  PF2  — Split screen at cursor position
  PF9  — Swap between split screens
  Or: SPLIT command, SWAP command

  Why split screen matters:
  • Edit COBOL in top half, view COPYBOOK in bottom
  • Edit JCL in one, check SDSF job output in other
  • Compare two files side by side
  • Browse documentation while coding

Command Stacking:
  Execute multiple ISPF options in sequence:
  =3.4;=2;=SD  — Jump to DSLIST, then Edit, then SDSF
  Semicolons separate commands.

Clipboard:
  CUT — Copy selected lines to clipboard
  PASTE — Paste from clipboard
  Works across split screens and even between datasets.

Dataset Name Shortcuts:
  When entering DSN, the system adds your prefix:
  If TSO prefix is USER01:
    Entering: COBOL.SOURCE → resolves to USER01.COBOL.SOURCE
    Entering: 'PROD.COBOL.SOURCE' → resolves exactly (quotes = fully qualified)

ISPF Tables and Settings:
  Use Option 0 to customize:
  • PF key assignments
  • Terminal type
  • Log/List dataset
  • Screen format

Bookmarks (Member Lists):
  In 3.4, you can save frequently-used DSN patterns.
  Create personal PDS member lists for quick navigation.

Batch from ISPF:
  You don't need to leave ISPF to submit jobs:
  1. Edit your JCL
  2. Type SUBMIT on command line (or SUB)
  3. Switch to SDSF to monitor
  4. Check output
  All without leaving the editor.

ISPF Command Table:
  Customize ISPF with your own commands:
  In the ISPF Command Table (option 3.9 or similar):
  Add shortcuts like:
    SS → SDSF
    ED → EDIT 'MY.COBOL.SOURCE'
    JL → EDIT 'MY.JCL.LIB'`
    },
    { title:"TSO/ISPF Interview Questions", level:"All Levels",
      content:`TSO/ISPF Interview Questions:

BEGINNER:

Q: What is the difference between TSO and ISPF?
A: TSO (Time Sharing Option) is the z/OS interactive command processor — like a Unix shell. ISPF (Interactive System Productivity Facility) runs on top of TSO and provides a full-screen panel-driven interface with an editor, utilities, and tools.

Q: How do you edit a dataset member?
A: Enter option 2 from ISPF, type the dataset name and member name, press Enter. Or from DSLIST (3.4), type "E" next to the dataset, then "E" next to the member.

Q: What are the most important ISPF editor line commands?
A: I (insert), D (delete), C/CC (copy), M/MM (move), R (repeat), A (after), B (before). These commands are typed in the line number area.

Q: How do you submit a JCL job from ISPF?
A: Edit the JCL and type SUBMIT (or SUB) on the command line. The job is sent to JES for execution. Check output in SDSF.

INTERMEDIATE:

Q: What is SDSF and what panels do you use most?
A: SDSF (System Display and Search Facility) monitors batch jobs. Most used panels: ST (status — all jobs), DA (active jobs), O (output queue). Line commands: S (select output), ? (view JCL), P (purge), C (cancel).

Q: How do you find and replace text in the ISPF editor?
A: FIND text to search, CHANGE old new ALL to replace all occurrences. Add column ranges (FIND text 1 72) and options (ALL, NEXT, FIRST, LAST, NX for not-excluded).

Q: What is the DSLIST utility (3.4)?
A: The most-used ISPF utility. Enter a dataset name pattern and it shows all matching datasets. Line commands: E (edit), V (view), B (browse), D (delete), I (info), M (member list).

Q: How do you use split screen?
A: PF2 splits the screen at the cursor, PF9 swaps between sessions. This lets you edit code in one panel and check output in another. You can have up to 8 sessions.

ADVANCED:

Q: What are ISPF edit macros?
A: REXX programs that automate editor tasks using ISREDIT commands. They can find/replace, insert headers, reformat code, compare files, and more. Invoked from the editor command line.

Q: How do you allocate a dataset from TSO?
A: Use the ALLOCATE (ALLOC) command: ALLOC DA('name') NEW CATALOG SPACE(10,5) TRACKS RECFM(F B) LRECL(80) BLKSIZE(0). Or use ISPF option 3.2 interactively.`
    },
  ]
};
