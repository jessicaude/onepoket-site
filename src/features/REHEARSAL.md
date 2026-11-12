# Rehearsal: feature bento (section 2)

Gold: `bento`, layout "hero and strip". Tiles: each picture is its own Stage at 1:1, pinned to its tile's foot and cropped by the tile, with run-in copy as page text above it. The receipts tile also borrows from `tilted-stack`.

## The tile list

| Tile | Span (3 col) | Kind | The one thing | Moves |
|---|---|---|---|---|
| Pay your way | 2 × 1 | Component (hero) | The OnePoket sheet's "Pay with" row, words only, drawn large, with the Pay button that matches the method | Card to Apple Pay; the button goes from green "Pay $23.40" to black "Pay with Apple Pay" |
| Pay from a link | 1 × 1 | Hero UI | A phone at 1:1 on Ilé Living's business chat | The payment link arrives under the store's message |
| Verify once | 1 × 1 | Diagram | Three stores on one dashed line; one "Ada, verified" identity | The badge travels from Ilé Living to Kola Books, then Nori Tea; each store it visits keeps a tick inside its card |
| The total you see | 1 × 1 | Statement | "Pay $23.40", the amount in display type, on the grid's one green tile | Still |
| If an order goes wrong | 1 × 1 | Object | A tilted pile of receipts, a refund on top | The Refund tag arrives |

- **Layouts:** 3 columns at 900px of column and up; 2 columns (hero across, then pairs) from 600px; stacked below that.
- **Motion:** each tile plays once as it scrolls in, 110ms after the tile before it. Reduced motion shows the posters.

## Changed from the gold

- **Brand:** OnePoket's tokens, Geist, and Geist Mono for amounts inside the widget.
- **Display amounts:** these use Geist with tabular figures, the new rule in BRIEF.md, Look.
- **Grounds:** tiles sit on the page wash, one step lighter in the dark theme. The statement tile is the one accent, in brand green. Product surfaces stay light in both themes.
- **Measured stages:** every bleeding stage takes its slot's width and height, so pictures start one gap under their copy whatever it wraps to.
- **Font gate:** pictures wait for the web fonts, through the same gate the hero uses (`src/brand/fonts.ts`).

## Captured

- **Gate, all five tile stages per run:** 390, 768, 1024 and 1440, `--gate` light and `--dark` each. The last run ends `rehearsal passed` at all eight, with no lines on any bento stage.
- **Full-section screenshots:** reduced motion, light and OS dark, at each width.
- **Layout audit:** `scripts/layout-core.mjs` unchanged, run through a scroll wrapper so the section is audited inside the same 1000px viewport `layout.mjs` uses. `layout.mjs` alone only checks the first viewport, which never reaches this section at 768 and 1024. The final run is `no-issues-detected` at 390, 768, 1024 and 1440, light and dark, checking 14 to 20 padded containers and 1 to 2 controls per width.

## Gate fixes, in order

- **Uneven padding on the method tiles:** their content was centred in fixed boxes. They became one inset on every side; later, words only.
- **Text stepping on the "$" glyph:** it used the unloaded 800 weight, and the stages mounted before the fonts. Fixed with 700, and the shared font gate.
- **Receipt pile:**
  - `onion skin`: the under-cards' bars had see-through fills. They're opaque now; Bar sets its fill inline, so it goes through `style`.
  - `framing`: it ended 12px short of the bottom. It now starts one gap under the copy, with the slack below it.
  - `near-tangent`: two card tops sat 1px apart. The back card was offset.
  - `dashed edge resizes`: the receipt's dashed rules were redrawn as gradients.
  - `lands on a transform`: the top card got `will-change: transform`. It no longer moves; the tag does.
  - `uneven padding`: tilting grows the content boxes sideways, so the top inset is deeper to compensate.
- **`small text` on the phone:** 9.2px at 390. The phone's small type went to 15pt; later the phone went to 1:1.
- **Pay your way crop:**
  - `framing: span.fw-method runs only 10px past the right edge`, then `cut by the crop`. A labelled control reads whole or not at all.
  - All five methods now show whole, and the tile crops the sheet, not the row. The brief says "cropped large": the row is as large as five whole tiles allow.
- **Phone gutters:** `framing: corner bleed with a 12px gutter above but 28px to its left`. It now has one 28px gutter, the copy's.
- **`lopsided: span.fv-badge`:** the badge's padding was made even.

## Fresh-eye review (one round), and what changed

1. **The hero wasn't "cropped large", with a gap above and a white band below.**
   - The sheet is drawn large on wide layouts (bigger lockup, eyebrow and button).
   - It's anchored to the tile's foot, so the button always ends 32px above the crop.
   - Row heights keep it close under the copy.
2. **The phone was drawn small and centred.** It's now at 1:1, a gutter from the left, running off the right and bottom. Ada's right-aligned question was dropped, since it would be cut.
3. **The receipt pile touched the copy.** It now starts one gap under it.
4. **Verify once left its right side empty and ended on a grey placeholder store.** The tile was rebuilt (see below).
5. **The hero's visual weight was inverted.** Addressed by 1 and 2.
6. **A grey bar sat where the eye lands in Verify.** Gone; every store is a wordmark.
7. **Apple Pay and Google Pay used the same glyph.** First declined: they were the widget's own glyphs, and I wouldn't hand-draw the brands. Then removed at your request; the tiles are words only.
8. **"$12 . 00" in mono at display size.** Tightened at first; then display amounts moved to Geist with tabular figures (your rule).
9. **The receipt tile opened on a placeholder.** The refund is readable from the first frame; the beat is its tag.
10. **The verified mark was copied, not carried.** It's now one identity carried along (your redesign).
11. **No OnePoket cue in the link bubble.** Declined: the Poket mark is already in the hero tile, and bento rule 9 says no mark repeats between tiles. The tile copy names OnePoket.
12. **Dark tiles barely separated from the page.** The dark tile ground was lifted one step.

## Your review rounds, and what changed

- **Verify once:**
  - One verified identity carries over: "Ada, verified" travels from Ilé Living (where she verified first) to Kola Books, then Nori Tea.
  - The stores spread down the tile, so the middle is filled.
  - Ticks sit inside the cards, so nothing notches an edge.
- **The total you see:**
  - Geist with tabular figures, and the rule added to BRIEF.md, Look (the only edit to the brief this round).
  - The amount is now $23.40.
- **Pay your way:**
  - The button follows the method as the reference prototype does: Card green "Pay $23.40", Apple Pay and Google Pay black "Pay with …", Cash App #00C244, Bank green "Pay by bank $23.40".
  - Icons were removed at every width.
  - At 390 the sheet ends 32px under the button.
  - At 768 it sits about 32px under the copy (that row went from 420 to 340).
- **Nav:** clear over the hero's top, then a solid page-coloured bar with a hairline once the page scrolls, in both themes.

## Assumptions

- **Store and product names:** Nori Tea, Ayo Studio, "Linen tote" and its $18.00 are invented fictional demo content. Ilé Living and Kola Books are the brief's.
- **"Ada, verified":** this string is from your example.
- **Copy:**
  - Tile copy is from `reference/onepoket-website.html`, shortened to a lead and one sentence.
  - "If an order goes wrong" keeps two sentences, close to the reference.
  - The section title is the reference's "One account for every checkout."
- **`id="how"`:** on this section, for the hero's "See how it works".

## Unresolved

- **"$23.40" appears in three tiles:** the Pay your way button on Card (not in the poster, which shows Apple Pay), the link bubble, and the statement. That's by your instruction, and it goes against bento rule 9, which says no real string repeats.
- **Ilé Living appears in two tiles:** the link chat and Verify once. That's by your example, and against the same rule.
- **Gap at three columns:** in the hero tile the sheet sits about 120 to 140px under the copy. That row's height is set by the phone tile beside it, which needs it.

## Brand check needed

Official Apple Pay and Google Pay marks and buttons (and Cash App's) need a brand-guidelines check before they're used. Until then, the method tiles are words only. The Pay button's black "Pay with Apple Pay" and "Pay with Google Pay" follow the reference prototype's colours, not the official button artwork.

## Not checked

- **Real-browser frame pacing:** only headless Chrome. Every motion run reports `inconclusive` because of sampling gaps on this machine.
- **Touch.**
- **Widths:** none between the four filmed widths, except by the layout maths.
- **Dark contact sheets:** `film.mjs --dark` forces the stages' own kit theme, which these stages never use, so dark mode was judged from OS-dark page screenshots.
- **Safari:** not tested.
