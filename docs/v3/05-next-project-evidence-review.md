# Next portfolio candidates

Date: 2026-09-07. Read-only source review; no scripts or tests executed.

## Mr. Roboto — second case study candidate

Reviewed revision: `e1824ca63f389c31fcca8595f80976b3c9860a4f`.

Proposed title: **Making a command-line media workflow easier to run and recover.**

Defensible narrative: PowerShell and Bash orchestration around yt-dlp and FFmpeg, covering dependency setup, quality selection, output paths, logging, retries, and interrupted-session recovery. Credit upstream tools for extraction, downloading, and media handling. Confirm Wisdom's contribution before first-person attribution.

Evidence:

- [PowerShell implementation](https://github.com/kwisdomk/Mr.Roboto/blob/e1824ca63f389c31fcca8595f80976b3c9860a4f/roboto.ps1).
- [Bash implementation](https://github.com/kwisdomk/Mr.Roboto/blob/e1824ca63f389c31fcca8595f80976b3c9860a4f/roboto.sh): interruption handling, saved state and consent handling for cookie retries.
- [Testing instructions](https://github.com/kwisdomk/Mr.Roboto/blob/e1824ca63f389c31fcca8595f80976b3c9860a4f/TESTING.md): unchecked checklist, not completed test evidence.
- [Returned Actions run](https://github.com/kwisdomk/Mr.Roboto/actions/runs/28484866219): Copilot Code Review on an earlier revision, not Windows/Linux execution testing.

Qualifications:

- Windows stable/Linux beta are README labels, not findings from execution here.
- Inspected bootstrap paths use mutable release URLs without checksum verification; avoid “secure bootstrap” claims.
- Windows and Bash differ in browser-cookie retry consent. Do not claim platform parity.
- Bash checks zero-item outcomes; Windows relies on successful exit status. Verify actual output before claiming completion reliability.

Minimum next evidence: OS/shell/dependency versions; fresh bootstrap; permitted short media download; paths with spaces; interruption/resume; bad URL and network failure; actual usable output verification. Test auth branching with mocks or a dedicated test browser profile. Keep Linux beta. Capture real launcher/output and sanitised resume logs.

## AEGIS — third candidate; stronger claims on hold

Reviewed revision: `30f2b7d6d903e573b01de6861ad3e5645ce17be3`.

Proposed title: **Turning Windows telemetry into an explainable diagnostic workflow.**

Defensible narrative: a PowerShell diagnostic prototype that collects timestamped snapshots, applies weighted heuristics, prints guidance, and compares selected fields. Its strongest story includes the limits of its telemetry and heuristics.

| Source finding | Portfolio consequence |
|---|---|
| [Collector](https://github.com/kwisdomk/AEGIS/blob/30f2b7d6d903e573b01de6861ad3e5645ce17be3/scripts/AGcollect.ps1) infers channel state from RAM module count | Do not present channel operation as directly measured. |
| Failed wake-lock collection can leave an empty list that [rules](https://github.com/kwisdomk/AEGIS/blob/30f2b7d6d903e573b01de6861ad3e5645ce17be3/scripts/AGrules.ps1) describe as no active locks | Missing telemetry needs an unknown state before healthy-state claims. |
| [Comparator](https://github.com/kwisdomk/AEGIS/blob/30f2b7d6d903e573b01de6861ad3e5645ce17be3/scripts/AGcompare.ps1) treats lower CPU-minimum values as improvement, including unknown `-1` | Unknown data must not become an improvement. |
| Comparator counts selected field changes without rerunning weighted diagnostics | Avoid “confirmed issue resolution” or improved diagnostic-score claims. |
| Process-name checks inspect a limited process sample | Cannot establish absence of MDM, licence validity, compromise or prior ownership. |
| [Syntax helper](https://github.com/kwisdomk/AEGIS/blob/30f2b7d6d903e573b01de6861ad3e5645ce17be3/_check_syntax.ps1) checks two hardcoded paths | Not a portable behavioural test suite. |

No Actions runs were returned. The reviewed tree has no behavioural tests and no baseline results beyond `.gitkeep`. Static seller assertions, prices, numerical performance benefits and battery-life claims were not verified; exclude them from portfolio copy.

Minimum next evidence: parse all scripts; test missing/null/unknown telemetry and channel inference; verify comparisons across machine/time identities; capture a sanitised baseline and a real re-collection. Clearly distinguish synthetic fixtures from observed runs. Integrity fixes belong in a separate implementation assignment, not this website content pass.

## Attribution boundary

DeepSeek Harness is an external learning reference for AxA, as explicitly clarified by Wisdom. Exclude it from original-project candidates. Future AxA writing may identify lessons and upstream attribution while documenting AxA's own implementation.
