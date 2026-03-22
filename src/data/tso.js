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

    { title:"TSO Commands Reference", level:"Beginner",
      content:`Essential TSO commands for daily mainframe work.

Dataset Commands:
  ALLOC — Allocate (create/assign) dataset
  FREE — Release allocation
  DELETE — Delete dataset
  RENAME — Rename dataset
  LISTDS — List dataset information
  LISTCAT — List catalog information

Job Commands:
  SUBMIT — Submit JCL for execution
  STATUS — Check job status
  CANCEL — Cancel running job
  OUTPUT — Retrieve job output

Utility Commands:
  SEND — Send message to user or console
  RECEIVE — Receive transmitted datasets
  TRANSMIT — Send dataset to another user/system
  EXEC — Execute REXX or CLIST
  CALL — Execute load module

System Commands:
  LOGON — Start TSO session
  LOGOFF — End TSO session
  PROFILE — Set session parameters
  TIME — Display date and time

Pro Tip: Most work is done through ISPF, but knowing TSO commands is essential for REXX scripting and automation.`
    },

    { title:"ISPF Option 2 — Edit", level:"Beginner",
      content:`ISPF Edit is where you write and modify code.

Primary Commands (command line):
  SAVE — Save changes
  CANCEL — Exit without saving
  FIND string — Search for text
  CHANGE old new ALL — Find and replace
  SUBMIT — Submit as JCL
  RESET — Reset line commands
  COLS — Show column ruler
  HEX ON/OFF — Hex display mode
  UNDO — Undo last change

Line Commands (line number area):
  I — Insert line after
  D — Delete line (DD = block delete)
  C — Copy (CC = block copy)
  M — Move (MM = block move)
  R — Repeat line (RR = block repeat)
  A — After (destination for C/M)
  B — Before (destination for C/M)
  ) / ( — Shift right/left

FIND Options:
  FIND 'text' FIRST/LAST/NEXT/PREV/ALL
  FIND 'text' 1 72 — Search columns 1-72 only
  FIND P'.' — Picture string (any character)

CHANGE Options:
  CHANGE 'old' 'new' ALL — Replace all
  CHANGE 'old' 'new' FIRST — Replace first only

Pro Tip: Learn line commands by heart — CC/MM/A/B for copy/move, DD for delete. They're used hundreds of times daily.`
    },

    { title:"ISPF Option 3 — Utilities", level:"Beginner",
      content:`ISPF utilities for dataset and member management.

3.1 — Library Utility:
  Browse, print, rename, delete members in a PDS.
  Reset stats. Compress PDS.

3.2 — Dataset Utility:
  Allocate (create) new datasets.
  Rename, catalog, uncatalog datasets.
  Space and attribute management.

3.3 — Move/Copy Utility:
  Copy members between PDS libraries.
  Move datasets.

3.4 — Dataset List (DSLIST):
  List datasets matching a pattern.
  MY.** — All datasets starting with MY
  Actions: B(browse), E(edit), D(delete), I(info), S(short), M(members)

3.5 — Reset ISPF Statistics:
  Reset member statistics (create date, change date).

3.6 — Hardcopy:
  Print datasets to SYSOUT or printer.

3.14 — Search-For Utility:
  Search for strings across multiple PDS members.
  Powerful for finding where a copybook or variable is used.

Pro Tip: 3.4 (DSLIST) is the most-used utility. Learn the action codes: B, E, D, I, S. You'll use them constantly.`
    },

    { title:"SDSF — Job Management", level:"Beginner",
      content:`SDSF (System Display and Search Facility) monitors and manages batch jobs.

Panels:
  ST — Status: Active and recently completed jobs
  H — Held output queue
  O — Output queue
  DA — Display active: Currently running address spaces
  LOG — System log
  SE — System resources

ST Panel Actions:
  S — Select (view output)
  ? — Job details
  P — Purge job and output
  C — Cancel running job
  SE — See job log

Filtering:
  PREFIX jobname* — Show only matching jobs
  OWNER userid — Show only your jobs
  DEST destination — Filter by output destination

Viewing Output:
  Select job → Shows DD list → Select DD to browse
  JESMSGLG — JES messages
  JESJCL — Submitted JCL
  JESYSMSG — System messages
  SYSPRINT — Program output

Useful Commands:
  WHO — Show your userid
  SORT columns — Sort display
  FIND string — Search in output

Pro Tip: SDSF ST is your primary job monitoring tool. Check JESMSGLG for JCL errors, SYSPRINT for program output.`
    },

    { title:"ISPF Edit Macros", level:"Intermediate",
      content:`ISPF edit macros automate repetitive editing tasks.

Creating:
  Write a REXX exec that starts with:
  ADDRESS ISREDIT 'MACRO (PARMS)'

Useful ISREDIT Commands:
  FIND 'text' — Find text
  CHANGE 'old' 'new' ALL — Replace
  "(line) = LINE .ZCSR" — Get current line
  "LINE .ZCSR = (newline)" — Replace current line
  "LINE_AFTER .ZCSR = DATALINE (text)" — Insert line
  "DELETE .ZCSR" — Delete line
  "(last) = LINENUM .ZLAST" — Last line number

Example — Add Header:
  ADDRESS ISREDIT 'MACRO'
  ADDRESS ISREDIT "LINE_BEFORE 1 = DATALINE '//*'"
  ADDRESS ISREDIT "LINE_BEFORE 1 = DATALINE '//* Generated:' DATE('S')"

Running:
  In ISPF editor command line, type the macro member name.
  The PDS containing the macro must be in SYSPROC/SYSEXEC.

Pro Tip: Build a personal library of edit macros: format code, add standard headers, validate syntax, generate boilerplate.`
    },

    { title:"TSO ALLOC & FREE", level:"Intermediate",
      content:`ALLOC creates or assigns datasets. FREE releases them.

Allocate New Dataset:
  ALLOC DA('MY.NEW.FILE') NEW CATALOG SPACE(5,1) CYLINDERS DSORG(PS) RECFM(F B) LRECL(80) BLKSIZE(27920)

Allocate Existing (Assign to DD):
  ALLOC FI(INDD) DA('MY.EXISTING.FILE') SHR

Allocate PDS:
  ALLOC DA('MY.PDS.SOURCE') NEW CATALOG SPACE(10,5) CYLINDERS DSORG(PO) RECFM(F B) LRECL(80) BLKSIZE(27920) DSNTYPE(LIBRARY)

FREE:
  FREE FI(INDD)  — Free by DD name
  FREE DA('MY.FILE')  — Free by dataset name
  FREE ALL — Free all allocations

ALLOC Options:
  SHR — Shared access (read)
  OLD — Exclusive access (update)
  NEW — Create new dataset
  MOD — Append to existing
  CATALOG — Catalog the dataset
  UNIT(SYSDA) — Disk type

Pro Tip: ALLOC/FREE is essential for REXX scripts. ALLOC assigns DD names, EXECIO uses DD names for I/O.`
    },

    { title:"TSO/ISPF — Advanced Edit Features", level:"Intermediate",
      content:`Power features for advanced ISPF editing.

Compare:
  COMPARE member — Compare current member with another
  Shows differences side-by-side.

CREATE/REPLACE:
  CREATE member — Save block of lines as new member
  REPLACE member — Save block replacing existing member

MODEL:
  MODEL class — Insert code templates
  JCL, COBOL, REXX templates available.

LOCATE:
  LOCATE label — Jump to line label

Bounds:
  BOUNDS 1 72 — Restrict editing to columns 1-72
  Important for COBOL (columns 7-72).

TABS:
  TABS ON — Enable tab stops
  Define tab positions for COBOL column alignment.

RECOVERY:
  SET RECOVERY ON — Enable edit recovery
  If session crashes, changes can be recovered.

DEFINE Alias:
  KEYS panel — Define PF key assignments
  Customize PF3=END, PF5=FIND, PF6=CHANGE, etc.

Pro Tip: Set RECOVERY ON in your ISPF profile. It saves your work if TSO disconnects unexpectedly.`
    },

    { title:"ISPF Panels & Tables", level:"Advanced",
      content:`Building custom ISPF applications with panels and tables.

ISPF Panel:
  Defined in a PDS member. Sections:
  )ATTR — Define field attributes
  )BODY — Screen layout
  )INIT — Initialization logic
  )PROC — Processing logic
  )END — End of panel

Displaying:
  ADDRESS ISPEXEC "DISPLAY PANEL(MYPANEL)"
  REXX variables automatically populate panel fields.

Tables:
  TBCREATE — Create table
  TBADD — Add row
  TBPUT — Update row
  TBDELETE — Delete row
  TBDISPL — Display with scrollable panel
  TBCLOSE — Save and close

File Tailoring:
  Build output files from templates (skeletons).
  FTOPEN → FTINCL skeleton → FTCLOSE
  Skeleton contains variables: &VAR1 replaced at runtime.

LIBDEF:
  Point ISPF to your panel/skeleton libraries:
  ADDRESS ISPEXEC "LIBDEF ISPPLIB DATASET ID('MY.PANELS')"

Pro Tip: ISPF panels + REXX = custom mainframe tools. Every sysprog builds ISPF apps for their team.`
    },

    { title:"TSO/ISPF — Productivity Tips", level:"Beginner",
      content:`Tips to work faster in ISPF.

Quick Navigation:
  =3.4 — Jump directly to DSLIST from any panel
  =S — Jump to SDSF
  =6 — Jump to TSO command

DSLIST Tricks:
  V next to dataset — View (VSAM) info
  = — Repeat last action
  / — ISPF action bar

Edit Shortcuts:
  F5/F6 — FIND/CHANGE (if mapped)
  HILITE COBOL — Syntax highlighting for COBOL
  HILITE JCL — Syntax highlighting for JCL

Member Selection:
  In PDS member list: S=select, B=browse, E=edit, V=view
  Sort by: NAME, CHANGED, SIZE, ID

Command Stacking:
  TSO cmd1; cmd2; cmd3 — Execute multiple commands

Clipboard:
  CUT/PASTE between edit sessions.
  CUT DISPLAY — Show clipboard contents.

ISPF Settings:
  =0 — ISPF settings panel
  Change: Colors, PF keys, log/list defaults, edit settings.

Pro Tip: Customize PF keys in every panel. Map frequently used commands to F-keys. Every second saved adds up.`
    },


    { title:"TSO/ISPF Interview Questions", level:"All Levels",
      content:`TSO/ISPF Interview Questions — 20+ Q&A.

Q: What is TSO?
A: Time Sharing Option — z/OS interactive command facility. Users log on to TSO, then typically enter ISPF.

Q: What is ISPF?
A: Interactive System Productivity Facility — panel-driven interface. Options: 1=View, 2=Edit, 3=Utilities, 3.4=Dataset list, 6=Command, S=SDSF.

Q: How do you submit JCL from ISPF?
A: Open in editor (option 2), type SUB on command line. Or TSO SUBMIT 'dataset(member)'.

Q: What is SDSF?
A: System Display and Search Facility — monitor jobs. DA=active, ST=output, I=input. Line commands: S=browse, P=purge, C=cancel.

Q: How do you allocate a dataset in TSO?
A: ALLOC DA('name') NEW SPACE(10,5) TRACKS RECFM(F B) LRECL(80). Or use ISPF 3.2.

Q: What are ISPF edit commands?
A: C/CC=copy, M/MM=move, D/DD=delete, R/RR=repeat, I=insert. Command line: F/FIND, C/CHANGE, SAVE, SUBMIT, RESET.

💡 Study Tip: Know ISPF options (1-6), edit line commands, and SDSF panels.`,
    },

    { title:"TSO / ISPF Cheat Sheet", level:"All Levels",
      content:`TSO/ISPF Quick Reference — Cheat Sheet

═══ ISPF OPTIONS ═══
1 — Browse      2 — Edit        3 — Utilities
3.4 — Dataset list  6 — TSO command  S — SDSF

═══ EDIT LINE COMMANDS ═══
I — Insert after    C/CC — Copy    M/MM — Move
D/DD — Delete       R/RR — Repeat  ) — Shift right
( — Shift left      COLS — Show columns

═══ EDIT PRIMARY COMMANDS ═══
F 'text' — Find        C 'old' 'new' ALL — Change
SAVE — Save            SUB — Submit
RES — Reset            UNDO — Undo
HI OFF — Remove highlighting

═══ SDSF PANELS ═══
DA — Active jobs   ST — Output   I — Input
H — Held output    LOG — System log
PREFIX userid* — Filter jobs`,
    },
  ]
};
