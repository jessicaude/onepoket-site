# Rehearsal: hero (section 1)

Gold: `overlap` for the layout (a chromeless card in front of a window). Timing from `hero-demo`, and the button that confirms on itself from `form-error`.
- Kept: one browser window behind, one card in front straddling its left edge, the hero shadow on the window, and the stacked button layers.
- Changed:
  - No plate. The page is the ground (framing.md, "The page is the ground").
  - The window is Ilé Living's checkout page. It runs off the page's right edge and off the hero section's foot, and the hero section cuts it at both with hard edges. A hairline under the hero marks the foot.
  - Steps (Contact, Delivery, Payment) on the white left. On wide layouts the order summary sits in a tinted panel that runs to the window's right edge, with the real lines from `reference/onepoket-website.html`.
  - The card is the OnePoket sheet over the payment step.
  - Brand tokens: #0A5C48, the mint wash, Geist, and Geist Mono for amounts. The stage is pinned to `theme="light"` because product surfaces stay light in both themes (BRIEF.md, Look).

Beats:
1. Opening frame held for 1.4s.
2. The cursor travels from beside Delivery (in the store header on a phone) to Pay.
3. Press, and the button turns pending ("Paying").
4. The button confirms on itself ("Paid $23.40").
5. The page's Payment step ticks 0.45s later. The cursor stays on the paid button through the 2.4s payoff.

Plays once (`play="once"`), about 6s. Poster = the paid state. Replay is a host button above the picture that remounts the stage.

Geometry:
- Wide design 660×484, shown 1:1 beside the copy at 1180 and up. Below 1180 it sits under the copy, against the right margin.
- Compact design 374×344 below a 600px container. At 390 the stage runs into the page margin and ends at the screen edge.
- The host measures how far the page runs past the stage's right edge (`--hs-bleed`, in design px). The window is always that long plus 24px, so its right edge is never on screen.
- On a phone the steps sit in one row and the sheet comes up under them, so what shows of the window stays wider than tall (354×344). The sheet sits on the page's tinted payment area, which runs on past the hero's foot.

Captured:
- Gate at 390, 1024 and 1440 (full desktop), light and `--dark` each: `rehearsal passed` on all six.
- Full-page screenshots at 390, 768, 1024, 1280 and 1440 in light and in the OS dark scheme.
- `layout.mjs --strict` after the story settles at 390, 1024 and 1440: no issues.
- Theme switching during playback, below.

Gate lines left, all deliberate:
- `unclipped: div.ss-window runs Npx past the stage's right edge` (24px at 390, 76px at 1024, 184px at 1440). The page edge is the crop by design: the hero section clips the window there, and it always runs 24px past the screen. Clipping at the stage instead would put a hard window edge mid-page. Not a gating line.
- Every motion run reports `inconclusive` because of sampling gaps on this machine (largest gap 28 to 38ms).

Film fixes this round:
- `framing: div.ss-window runs only 8px past the bottom edge` (fade version, 768 to 1440) → superseded: the window now runs 80px past the stage's foot, into the hero's clip.
- `empty pane: div.ss-window__body has 229px of nothing` (390) → the page's tinted payment area under the steps, with the sheet sitting on it.
- `framing: div.ss-window shows 338x354, narrower than tall` (390) → steps in one row, a tighter header and sheet, and the phone stage widened to the screen edge. It now shows 354×344.
- Seen in screenshots, not flagged by the film:
  - In the stacked layout at 1024 the picture sat left, so the window stretched about 350px past its content → the picture now sits against the right margin.
  - "Payment" sat 2px above the other steps in the phone row → the steps share one row height.

Review feedback (two rounds), and what changed:
1. Rounded panel behind the scene → removed. No plate; the window bleeds off the right page edge on desktop and off the right screen edge on a phone.
2. Placeholder bars in the order summary → the three real lines and the total. The bars in the store's top nav stay.
3. The cursor parked in empty space after the tap → it stays on the paid button.
4. Dark band at the window's fade on a phone, then a grey band from the fade on the dark page → no fade at all. The window ends with a hard edge at the hero's foot, at every width.
5. Empty right half of the window at wide widths → the order summary sits in a tinted panel running to the window's right edge, steps on the left.

Theme switching during playback (Playwright, flipping three times: during the cursor's travel, during pending, at paid):
- 1280, OS scheme and `data-theme`: no errors. The story reaches paid, the stage element survives (no remount), the store page and sheet stay `rgb(255, 255, 255)`, and there's no horizontal scroll.
- 390, `data-theme`: the same, all clean.
- 390, OS scheme: 1 run of 9 ended with a new stage element and the story reset to idle near "press". Seven reruns (three traced with a mutation log, four repeating the original check) were all clean. The trace shows nothing reacting to the scheme change. Cause not found. A dev-server reload during that run is possible but unverified.

Assumptions:
- The hairline under the hero (`--line`) is there so the window's cut reads as the section's end. It isn't in the brief.
- The tinted payment area on a phone has no words, because the sheet covers it.
- The nav (lockup and "For businesses", linking to https://centryos.xyz/) is built with this section.
- Hero copy is taken from `reference/onepoket-website.html`.

Unresolved:
- The one unexplained reset in the 390 OS-scheme theme-switch runs, above.

Not checked:
- Real-browser frame pacing (only headless Chrome).
- Touch.
- Widths between 600 and 1024 other than 768 (screenshots only, no gate at 768 after the last redesign).
- Very wide screens past 1440, where the order panel's tint gets wider.
- Safari: `overflow: clip` on the hero (Safari 16 and up) and `text-box` (falls back to normal line boxes).
- `film.mjs --dark` forces the stage's own kit theme, so the window's title bar shows dark in those contact sheets. The real page keeps it light; that was checked with OS-dark page screenshots.
