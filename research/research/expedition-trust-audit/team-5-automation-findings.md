# Team 5 Findings: Self-Healing & Automation Audit
## Date: 2026-03-10

---

### Critical Issues

#### CRIT-1: No validation of Claude Code output before deployment
The `launch_claude_update()` function treats `returncode == 0` as success and immediately considers the site updated. However, Claude Code returning exit code 0 means only that the CLI process exited cleanly — it does not mean the templates were correctly updated. Claude could:
- Silently fail to update pdf-generator.js but still exit 0
- Introduce incorrect regulatory language
- Remove required disclaimers (e.g., "Not legal advice")
- Re-add previously removed language like money-back guarantees
- Corrupt the PDF generation logic

The `.update-success` file (mentioned in the CLAUDE_UPDATE_PROMPT as step 5c) is written by Claude itself and never read by the Python script. It is completely orphaned logic — it does not serve as a validation gate. Nothing in `main()` checks for its existence before concluding success.

**Result:** A legally inaccurate document could be deployed and sold to customers with zero detection.

---

#### CRIT-2: pause_sales_fallback() is not a reliable safety net — it can silently fail without stopping sales

The fallback has at least three undetected failure modes that leave sales live while the site is in an unknown state:

**Failure mode A — git push fails silently:**
```python
subprocess.run(["git", "push", "origin", "main"], cwd=PROJECT_DIR, capture_output=True)
```
The `capture_output=True` with no `check=True` means if git push fails (no internet, SSH key missing, remote conflict), the script logs "Sales paused as fallback. Site is protected." — but the old, unmodified JS files were never pushed. The live site remains unpausable.

**Failure mode B — Vercel deploy fails silently:**
Same pattern. The Vercel deploy step has no return code check. If it fails (auth token expired, CLI not in PATH), the old deployment stays live. The log says everything is fine.

**Failure mode C — questionnaire.js string match fails:**
The replacement targets the exact string `"function handleCheckout() {"`. Examining questionnaire.js line 320:
```javascript
function handleCheckout() {
```
This currently matches. However, if a future edit adds a space, changes the formatting, or if Claude Code (in a prior auto-update run) modified the function signature, this regex will silently not match. The `if "SALES_PAUSED" not in q_content` guard means it won't retry — it will just write the file unchanged and proceed to git commit with the pause-injection missing. Sales remain live.

---

#### CRIT-3: Claude Code has broad write permissions with no guardrails on legal content

The `--allowedTools` flag grants: `Read,Write,Edit,Bash,WebFetch,WebSearch,Glob,Grep`. The CLAUDE_UPDATE_PROMPT says:
> "If you cannot determine what changed, update the verified date only."

There is no instruction preventing Claude from:
- Removing the "not legal advice" disclaimer from generated PDFs
- Changing required notice language to incorrect versions
- Adding new document sections that weren't in the original
- Removing required HB3773 elements entirely
- Modifying the Stripe checkout flow or pricing

Claude is also instructed to run `git add -A && git commit` which stages ALL files — meaning any hallucinated file Claude created during its session gets committed and deployed.

The prompt also says "Do NOT pause sales or add banners" — this is correct intent, but combined with broad write access and no post-run validation, Claude operates as an unreviewed autonomous editor of legal compliance documents sold for $299.

---

#### CRIT-4: Machine-off failure produces no fallback and no alert

`setup-scheduler.ps1` sets `StartWhenAvailable`, which means if the machine is off at 6 AM Sunday, the task runs when the machine next boots. However:

- If the machine is off for multiple days and the regulation changed during that window, customers bought stale documents during the entire gap with no protection triggered
- `StartWhenAvailable` only runs the task once when the machine wakes — it does not catch up on missed weeks
- If the machine has not been booted in over a week, only one check runs on next boot, not one per missed week
- There is no external monitoring (no cloud cron job, no healthcheck ping, no dead-man's switch) to detect that the machine-based scheduler has gone silent

There is zero alerting of any kind. If the entire system stops running, nobody knows.

---

### Moderate Issues

#### MOD-1: First run records baselines — not a problem in isolation, but invisible

On first run with no state file, `load_state()` returns `{}`, and every URL is treated as new (`previous_hash is None`). All four sources are logged as `[INIT]` and baselines are saved. No auto-update is triggered.

This is correct behavior. However: if the state file is ever deleted (manual cleanup, disk issue, OS reinstall), the next run treats everything as a fresh baseline. If regulation content had changed since the last real check, the change is silently discarded — the monitor resets to the new state as if it had always been current.

---

#### MOD-2: URL fetch errors skip the source entirely — no escalation

```python
if current_hash.startswith("ERROR:"):
    log(f"[WARN] Could not fetch {name}: {current_hash}")
    continue
```

If a government URL is unreachable (server down, URL changed, network error), the source is silently skipped. The state file is not updated for that source. On the next run, it will try again — but if the URL has permanently changed or the page was taken down (common for legislative tracking pages after a session ends), the monitor will permanently fail to check that source and log only a warning nobody reads.

There is no escalation path. No email. No counter for consecutive failures. No transition to "this source is dead, treat as unknown."

---

#### MOD-3: PDF hash instability — false positive regulation change triggers

The IDHR homepage (`https://dhr.illinois.gov/`) and IDHR rules page are HTML and will change hash on any server-side update: cookie banners, analytics scripts, navigation changes, seasonal banners, staff directory updates. The Illinois government PDF (`10300HB3773.pdf`) may be regenerated server-side periodically, changing its binary hash even if the regulation text is identical (PDF metadata, generation timestamp embedded in file).

A false positive triggers the full auto-update pipeline: Claude Code is launched, it reads the URL, (hopefully) determines it's cosmetic, and updates only the verified date. But during this window, the site has gone through a real Claude Code invocation that could make unintended changes. The frequency of false positives for homepage monitoring is high.

---

#### MOD-4: The CLAUDE_UPDATE_PROMPT lacks critical safety constraints

The prompt does not include:
- "Do not remove any disclaimer language"
- "Do not modify stripe-checkout.js or questionnaire.js"
- "Do not change document prices"
- "Do not add new sections that are not already present"
- "Preserve all existing 'not legal advice' language verbatim"
- "Do not modify any file outside of js/pdf-generator.js and index.html"

Claude is instructed to "update js/pdf-generator.js to reflect the new regulatory requirements" — but with no constraint on how aggressively to update. A model that interprets a regulation change broadly could restructure the entire document generation logic.

---

#### MOD-5: stripe-checkout.js pause mechanism is weak

`pause_sales_fallback()` prepends `const SALES_PAUSED = true;` to stripe-checkout.js, and then injects a check in `handleCheckout()` in questionnaire.js. The SALES_PAUSED variable is defined in stripe-checkout.js, which is a separate script file. The guard in questionnaire.js uses `typeof SALES_PAUSED !== 'undefined'` — this works only if stripe-checkout.js loads before questionnaire.js, and only in environments where the browser hasn't cached an older version of either file.

There is no cache-busting mechanism. A customer with a cached version of either file may bypass the pause entirely.

---

#### MOD-6: subprocess.run timeout is 10 minutes, but Claude Code may run longer for complex updates

```python
timeout=600,  # 10 minute max
```

If Claude Code is doing substantial work (fetching multiple URLs, reading pdf-generator.js at 689 lines, making edits, running git and vercel), 10 minutes may be insufficient. On timeout, `launch_claude_update()` returns `False` and `pause_sales_fallback()` is triggered. This means a legitimate, correct Claude Code update that simply needed more time triggers the sales pause — an unnecessary disruption.

---

### Minor Issues

#### MIN-1: Log file grows unbounded

`LOG_FILE` is written with `"a"` (append) mode and never rotated. Over months of weekly runs, with verbose output including 500-character Claude stdout excerpts, this will grow without bound in `scripts/monitor.log`. No rotation, no max size, no archival.

---

#### MIN-2: State file has no integrity check

`load_state()` does a bare `json.load()` with no try/except. If `regulation-state.json` is corrupted (partial write, disk issue), the script crashes at startup with an unhandled exception and logs nothing useful, because the crash happens before any structured error handling.

---

#### MIN-3: The scheduler runs python from PATH with no virtual environment

`setup-scheduler.ps1` calls `python` (bare) with the script path. If:
- Python is not in the system PATH for the scheduled task's execution context
- Multiple Python versions are installed and the wrong one is selected
- Required libraries are missing

...the task fails silently. There is no `pythonw` vs `python` distinction, meaning a console window may flash briefly on Sunday mornings (cosmetic, but confirms no virtual environment discipline).

---

#### MIN-4: setup-scheduler.ps1 working directory is set to scripts/ not project root

```powershell
-WorkingDirectory 'C:\Users\baenb\projects\project _cameron\compliance-tool\scripts'
```

The script itself computes `PROJECT_DIR` correctly via `os.path.abspath(os.path.join(SCRIPT_DIR, ".."))`, so this is not a bug. However, any relative path assumptions in git or vercel subprocesses could be affected if those tools rely on CWD. The git and vercel commands all pass `cwd=PROJECT_DIR` explicitly, so this is currently safe — but fragile.

---

#### MIN-5: .update-success file is orphaned logic

The CLAUDE_UPDATE_PROMPT instructs Claude to create `scripts/.update-success`. The Python script never checks for this file. It exists in the prompt as a vestigial validation step that was never wired up. It creates false confidence in the prompt (implying validation) without providing any.

---

### Gaps and Unknowns

**GAP-1: Are the 4 government URLs currently reachable?**
This audit is read-only and cannot verify live URL reachability. The ilga.gov PDF URL and bill status URL are for the 103rd General Assembly (HB3773). If Illinois moves to a 104th GA session, these URLs may redirect, return 404, or serve different content. The monitor has no handling for HTTP redirect chains or 404 responses — a 404 returns an error string starting with "ERROR:" and is silently skipped.

**GAP-2: Claude Code authentication state**
The auto-update pipeline assumes `claude -p` is authenticated and has an active API key. Claude Code authentication is stored per-user in the OS credential store. If the API key expires, is revoked, or if the user profile changes, `claude -p` will fail. The error will be caught by `FileNotFoundError` only if the binary is missing — an auth failure would likely return a non-zero exit code and be logged, but `pause_sales_fallback()` would then be triggered. Whether the auth failure message is surfaced anywhere useful is unknown.

**GAP-3: Vercel CLI authentication state**
Same issue as Claude Code auth. `vercel --yes --prod` requires an authenticated session. Token expiry is not handled.

**GAP-4: What does pdf-generator.js's "not legal advice" disclaimer language look like?**
The audit brief specifically asked about protection of disclaimers. The pdf-generator.js file (689 lines) was not fully read. If it contains inline disclaimer text, Claude Code could modify it during an auto-update. This warrants a separate read to confirm disclaimer language is present and to assess whether the CLAUDE_UPDATE_PROMPT provides any protection for it.

**GAP-5: No record of whether the scheduler has ever successfully run**
There is no `monitor.log` visible in this audit (it would be created at runtime). It is unknown whether the scheduler has been registered, whether it has ever fired, and whether the state file exists with current baselines.

---

### Synthesis

The self-healing system is architecturally sound in concept but critically fragile in execution. The core failure is that **success is assumed rather than verified at every stage of the pipeline.**

The highest-risk scenario is not that the site breaks — it's that Claude Code runs, produces subtly wrong legal content, exits cleanly, gets committed and deployed, and customers buy compliance documents that don't accurately reflect current HB3773 requirements. This scenario produces no alerts, no logs that indicate a problem, and no mechanism for discovery. It is the definition of a silent failure in a legally consequential product.

The second-highest risk is that the fallback (`pause_sales_fallback()`) itself fails silently due to git or Vercel errors, leaving the site live with stale content and the owner believing sales are paused.

The machine-dependency is a known limitation but manageable with `StartWhenAvailable`. The more serious structural gap is the complete absence of external monitoring or alerting — no healthcheck, no dead-man's switch, no email on failure. The entire system reports only to a local log file on the machine that may not be checked for weeks.

**Priority remediation order:**
1. Add output validation before treating Claude Code as successful (check for known strings, run a diff review, require human confirmation for substantive changes)
2. Add `check=True` or explicit return code checks on all subprocess calls in `pause_sales_fallback()`
3. Add email or webhook alerting on any failure condition
4. Constrain the CLAUDE_UPDATE_PROMPT to specific files and forbid disclaimer removal
5. Replace homepage hash-monitoring with content-targeted monitoring to reduce false positives
6. Wire up or remove the `.update-success` orphaned logic
7. Add state file load error handling
