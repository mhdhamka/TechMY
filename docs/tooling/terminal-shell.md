---
title: Developer Tooling, Shell & Terminal Mastery
description: Essential CLI workflows, modern shell utilities, terminal multiplexing with tmux, and accelerated developer productivity
---

<div class="se-hero">
  <div class="se-hero-badge">Developer Tooling & Workflows</div>
  <h1>Developer Tooling, Shell & Terminal Mastery</h1>
  <p class="se-hero-subtitle">Master the Unix command line, terminal multiplexing with tmux, blazing-fast search with ripgrep and fzf, structured JSON inspection with jq, and professional SSH configuration.</p>
</div>

---

## 1. The Modern CLI Productivity Stack

Modern command-line utilities leverage Rust and Go to deliver 10x–50x performance gains over traditional GNU coreutils:

| Traditional Tool | Modern Replacement | Written In | Key Advantage |
| :--- | :--- | :--- | :--- |
| `grep` | `ripgrep` (`rg`) | Rust | Blazing fast, respects `.gitignore` automatically |
| `find` | `fd` | Rust | Intuitive syntax, colorized output, ignores hidden files |
| `cat` | `bat` | Rust | Syntax highlighting, line numbers, git modifications |
| `ls` | `eza` | Rust | Tree views, file icons, git status inline |
| `cd` | `zoxide` (`z`) | Rust | Frecency-based intelligent directory jumping |
| `top` / `htop` | `btm` (bottom) | Rust | GPU stats, battery, process tree visualizer |

---

## 2. Interactive Navigation with `fzf` & `ripgrep`

Integrating `fzf` (command-line fuzzy finder) with `ripgrep` creates an interactive search experience directly inside your shell:

```bash
# 1. Search file contents interactively with live preview
rg --line-number --no-heading --color=always --smart-case "" | fzf \
  --ansi \
  --delimiter : \
  --preview 'bat --style=numbers --color=always --highlight-line {2} {1}' \
  --preview-window 'up,60%,border-bottom,+{2}+3/3,~3'

# 2. Fuzzy find and open file in your editor (e.g., Neovim / VS Code)
alias fz="fd --type f --hidden --exclude .git | fzf --preview 'bat --style=numbers --color=always {}' | xargs -r nvim"

# 3. Interactive Git Checkout of branches
git-branch-select() {
  git branch -a --color=always | grep -v '/HEAD\s' | \
  fzf --ansi --multi --tac --preview-window right:70% \
      --preview 'git log --oneline --graph --date=short --color=always --pretty="format:%C(auto)%cd %h%d %s" $(sed s/^..// <<< {} | cut -d" " -f1)' | \
  sed 's/^..//' | cut -d' ' -f1 | \
  sed 's#^remotes/##' | xargs git checkout
}
```

---

## 3. Terminal Multiplexing with `tmux`

`tmux` allows you to manage multiple persistent terminal sessions inside a single window. Crucially, when SSH connections to remote cloud instances (e.g. AWS Singapore or Cyberjaya data centers) drop, running processes continue uninterrupted inside your detached tmux session.

```
┌─────────────────────────────────────────────────────────────┐
│ tmux Session: "backend-dev"                                 │
│ ┌───────────────────────────┬─────────────────────────────┐ │
│ │ Window 1: nvim (Code)     │ Window 2: Server Logs       │ │
│ │                           │                             │ │
│ │ Pane 1 (Main Editor)      │ $ docker compose logs -f    │ │
│ │                           │                             │ │
│ ├───────────────────────────┴─────────────────────────────┤ │
│ │ Pane 2: Fast Shell Execution / Tests                    │ │
│ │ $ pytest tests/test_payments.py                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│ [0:backend-dev*] 1:nvim- 2:logs  "ip-10-0-1-4" 14:32 17-Sep │
└─────────────────────────────────────────────────────────────┘
```

### Essential tmux Commands Cheatsheet:
- **`tmux new -s <name>`**: Start a named session
- **`tmux ls`**: List all running sessions
- **`tmux attach -t <name>`**: Reattach to a running session
- **`Ctrl+b` then `d`**: Detach cleanly without killing background processes
- **`Ctrl+b` then `c`**: Create a new window
- **`Ctrl+b` then `%`**: Split pane vertically
- **`Ctrl+b` then `"`**: Split pane horizontally
- **`Ctrl+b` then `z`**: Toggle pane zoom (maximize/restore active pane)

---

## 4. Structured JSON Processing with `jq`

When inspecting API responses, Kubernetes specs, or CloudWatch logs, `jq` transforms complex JSON payloads directly on the command line:

```bash
# Extract names and roles from a JSON API response
curl -s https://api.techmy.dev/v1/team | jq '.members[] | {name: .full_name, role: .title}'

# Filter only production environments from a config map
cat config.json | jq '.deployments[] | select(.environment == "production") | .replica_count'

# Pretty print and sort keys
echo '{"c":1,"a":2,"b":3}' | jq -S .

# Aggregate counts and sums
cat access_logs.json | jq -s 'group_by(.status_code) | map({status: .[0].status_code, count: length})'
```

---

## 5. Professional SSH Configuration (`~/.ssh/config`)

Instead of memorizing long IP addresses, non-standard ports, and key paths, define structured configurations in `~/.ssh/config`:

```ssh-config
# Host alias for development server in AWS Malaysia region
Host aws-my-dev
    HostName 13.215.42.10
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519_techmy
    Port 22
    ServerAliveInterval 60
    ServerAliveCountMax 3

# Production Bastion / Jump Host Architecture
Host prod-bastion
    HostName bastion.prod.techmy.dev
    User bastion-admin
    IdentityFile ~/.ssh/id_ed25519_bastion

Host prod-internal-db
    HostName 10.0.4.15
    User postgres
    ProxyJump prod-bastion
    IdentityFile ~/.ssh/id_ed25519_prod

# Speed up repeated SSH connections via ControlMaster (Connection Multiplexing)
Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 10m
```

Once configured, connecting through the jump host to the private database is as simple as:
```bash
ssh prod-internal-db
```
The SSH client automatically proxies traffic through the bastion host transparently.
