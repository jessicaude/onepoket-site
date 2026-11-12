# Rehearsal: Questions (section 4)

No Stage: typography and layout only, on the page's own type and spacing.

## Composition

- **Desktop:** the heading and a one-line support note sit in a left column that stays in view, clear of the sticky nav. The six questions run in the right column, two thirds of the width.
- **Below 900px:** the heading and note sit above the list.
- **Matches the page:** heading size, weight and tracking match the other section titles (bento, network). Questions are 17 to 19px semibold; answers are 16px on the page's secondary ink.

## Content

- **Questions and answers:** word for word from `reference/onepoket-website.html`, with one exception.
- **Answer 5** drops its last sentence, "There's no balance to top up.", because the brief rules out balances and top-ups. You confirmed that change.
- **Support line under the heading:** "Something else? Email support@onepoket.com." This is my copy; you asked to keep it.

## The accordion

Built to the WAI accordion pattern:

- Each question is a real `<button>` inside an `<h3>`, with `aria-expanded` and `aria-controls`.
- Each answer is a `role="region"` labelled by its button.
- One answer is open at a time.
- Keys: Enter and Space toggle (native button behaviour). Up and Down move between questions and wrap; Home and End jump to the ends.
- A closed answer is `visibility: hidden` once it has finished closing, so it leaves the accessibility tree and its link leaves the tab order.
- Answers open by their own height (a grid-row transition), with no motion under reduced motion.

## Fixes from review

- **Hover colour** applies only under `@media (hover: hover)`, so a tapped question doesn't stay green on a phone. This is checked with an emulated touch phone: after a tap the question is the page ink, `rgb(10, 21, 18)`.
- **Line breaks:** questions and answers use `text-wrap: pretty`. At 390, "Something's wrong with my order. What do I do?" breaks as "…What / do I do?" rather than leaving "do?" alone.
- **Alignment:** question and answer text sit flush with the dividers' left edge at every width. At 390 the question, answer and divider all start at 16px.

## Checked

- **Keyboard (Playwright):**
  - Enter opens question 1.
  - Down moves focus to question 2, and Space opens it while closing question 1.
  - End jumps to question 6, and Down wraps back to question 1.
  - Tab past the last question skips a closed answer's link and reaches an open answer's link.
  - Every region is labelled by the button that controls it.
- **Anchors:** the hero's "Questions" button lands with this section's heading below the nav at 1440 and 390, in light and dark. "See how it works" does the same for the bento (`id="how"`). Section anchors have a scroll margin that clears the sticky nav (88px, 76px on phones).
- **Layout audit:** run through a scroll wrapper, in-viewport.
  - Before the review fixes: `no-issues-detected` at 390, 768 and 1440, light and dark, with all answers closed and with the last one open.
  - After them (answer 5, hover, wrap, alignment): `no-issues-detected` at 390, 768, 1024 and 1440, light and dark. Six controls and one padded container were checked each time.

## Not checked

- Real screen readers (VoiceOver, NVDA). The ARIA wiring was checked in the DOM only.
- Safari's support for `text-wrap: pretty`. It falls back to normal wrapping.
