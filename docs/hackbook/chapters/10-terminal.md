# Chapter 10: The kOS Terminal

> *"The GUI lets you look at a system; the command line lets you speak with it."*

---

## 1. Purpose

This chapter explains the **kOS Terminal Emulator** (`components/ui/terminal.tsx`). It details why the terminal exists, where it belongs, how its virtual filesystem works, and how to add new commands.

---

## 2. Why a Terminal Emulator?

Many developer portfolios include decorative "fake code" windows that do nothing. KWAIX takes the opposite approach:

1. **Authentic System Interface:** The terminal is a fully interactive command-line environment built into the browser.
2. **Cybersecurity & Systems Metaphor:** Wisdom's core domain is Linux systems, security operations, and networking. The terminal allows technical visitors to explore the portfolio using commands they already use every day (`ls`, `cat`, `uname`, `whoami`, `nmap`).
3. **Explorability:** It provides alternative, keyboard-driven navigation for power users.

---

## 3. Where It Appears (and Where It Must NOT Appear)

- **WHERE IT BELONGS:**
  - As a floating interactive modal triggered by the `TerminalButton` at the bottom-right of every page.
  - In technical code blocks and architecture diagrams where real command output is shown.
- **WHERE IT MUST NEVER APPEAR:**
  - Inside the main hero text as an irritating "typewriter" animation (banned by project rules).
  - As fake decorative non-functional screenshots.

---

## 4. Technical Architecture (`components/ui/terminal.tsx`)

The terminal is a **Client Component (`'use client'`)** operating as an in-memory state machine:

```
┌────────────────────────────────────────────────────────┐
│ State: isOpen (boolean)                                │
├────────────────────────────────────────────────────────┤
│ State: history (Array of command input/output strings) │
├────────────────────────────────────────────────────────┤
│ State: commandHistory (Array of past commands)         │
├────────────────────────────────────────────────────────┤
│ State: historyIndex (For Up/Down arrow recall)         │
├────────────────────────────────────────────────────────┤
│ Virtual File System (In-memory text objects)           │
└────────────────────────────────────────────────────────┘
```

### Key Keyboard Controls:
- **`Enter`:** Executes the typed command and appends output to history.
- **`Up Arrow / Down Arrow`:** Cycles through previous command history (like bash).
- **`Escape`:** Instantly closes the terminal dialog.
- **`Tab` (Future):** Autocompletes available commands and virtual filenames.

---

## 5. Supported Commands Reference

| Command | Output / Action |
|---|---|
| `help` or `?` | Lists all available commands with brief descriptions. |
| `whoami` or `id` | Displays Wisdom's name, role, Greek alias (`φιλόσοφος`), and clearances. |
| `uname -a` or `sysinfo` | Prints workstation hardware info (`kOS 2.0 Athena x86_64 Linux/AMD Ryzen 5`). |
| `ls` or `dir` | Lists files in the virtual directory (`bio.txt`, `philosophy.txt`, `stack.txt`, etc.). |
| `cat <filename>` | Reads and displays the contents of a virtual text file. |
| `projects` | Lists all flagship workloads with their status and codenames. |
| `certs` | Lists verified certifications and active study tracks. |
| `status` | Displays live operational focus and current build task. |
| `clear` or `cls` | Clears the terminal screen buffer. |
| `exit` or `quit` | Closes the terminal modal window. |
| `sudo <cmd>` | Rejects with *"Permission denied: User 'visitor' is not in the sudoers file."* |
| `nmap <target>` | Executes a simulated security port scan against the target. |

---

## 6. How to Add a New Terminal Command

To add a new command, open `components/ui/terminal.tsx` and add a case to the `handleCommand` dispatcher:

```typescript
case 'quote':
  return [
    'wisdom@kOS:~$ quote',
    '"I blueprint things before they escape. Most of them turn into something real."',
    '— Wisdom Kinoti (φιλόσοφος)'
  ];
```

---

## 7. Accessibility & Dialog Focus

The terminal is built to be fully accessible:
1. **Focus Trapping:** When opened, focus immediately shifts to the `<input>` element.
2. **Keyboard Dismissal:** Pressing `Escape` closes the terminal from anywhere on the page.
3. **Screen Readers:** Uses `role="dialog"`, `aria-modal="true"`, and `aria-label="kOS Interactive Terminal"`.

---

## 8. Related Chapters

- [Chapter 5: Components](05-components.md) — The `Terminal` component specs.
- [Chapter 11: Rules & Philosophy](11-rules-and-philosophy.md) — Why fake typewriter heroes are banned.
