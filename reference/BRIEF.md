# OnePoket site: build brief

Read this file before any task in this repo. It records decisions that are already made. Do not reopen them; ask if something here blocks the work.

## What OnePoket is

OnePoket is a checkout widget that sits inside online stores. A shopper saves a payment method once, then pays at any store that offers OnePoket.

- Payment methods: card, bank, Apple Pay, Google Pay, Cash App.
- Each order is charged to the method the shopper picks. OnePoket holds no balance.
- First payment: the shopper creates an account inside the store's checkout (email, then an ID check). Nothing to download.
- Returning shopper on a known device pays in one tap. On a new device they confirm a passcode first.
- A shopper verified at one store logs in at another store and pays. No new ID check.
- Stores can also send a payment link (chat, invoices). It opens the same widget.
- If a store adds a fee, it is shown before the shopper taps Pay. The amount on the button is the amount charged.
- The widget shows the Poket logo, optionally with a "by CentryOS" line under it.

## Audience and scope

- The site is for shoppers. Merchants have their own landing page; link to it as "For businesses".
- The "For businesses" link goes to https://centryos.xyz/.
- OnePoket is the leading brand name in all copy.
- Out of scope, never mention: the wallet, balances, top-ups, transfers, withdrawals, stablecoin, merchant settlement, sign-in.

## Copy rules

- Plain verbs, sentence case, short sentences. No em dashes.
- No invented numbers: no user counts, store counts or percentages.
- Do not state these until they are confirmed: PCI DSS level, FDIC, encryption strength, specific fee amounts as real pricing.
- Never name regulated categories (gaming, peptides and similar).
- Protection claims come only from the Terms in `reference/onepoket-website.html`: delivery within 30 days (physical) or 24 hours (digital); refunds to the original payment method; report a problem within 60 days, reply within 10 to 15 business days.
- Support email: support@onepoket.com.

## Look

- Keep the brand tokens from `reference/onepoket-website.html`: ink #0A1512, brand green #0A5C48, mint #3FE0A3, wash #F2F7F4, line #E4EBE7. Font: Geist, Geist Mono for amounts. Light and dark themes.
- Display-size amounts (large statement figures outside the widget) use Geist with tabular figures, not Geist Mono, because the mono zero has a slash. Amounts inside the widget keep Geist Mono.
- The widget itself always renders in its light product colours, in both themes.
- Avoid the generic fintech layout: rows of text on the left and a centred card on a grey panel on the right, a four-up benefit strip, and a closing band of three equal tiles. Every section should have its own composition.
- Store names in demos are fictional (Ilé Living, Kola Books). Give them simple wordmarks, not a letter in a coloured square.

## Page plan

Build with the Stageshow skill. One Stage per picture; page copy stays outside the Stage.

1. **Hero.** Layout: overlapping windows (start from the `overlap` and `hero-demo` gold examples). Ilé Living's checkout page as a browser window off the bottom right; the OnePoket sheet over the payment step. Story: returning shopper, saved card, cursor taps Pay, the payment confirms on the sheet. Poster frame: the paid state.
2. **Feature bento** (start from `bento`, layout "hero and strip"). Tiles:
   - Pay your way: one component, the payment-method row cropped large.
   - Verify once: a diagram of several stores, one verified mark carried between them.
   - Pay from a link: a phone with a chat thread and a payment link (kit `Phone`, `Thread`, `Bubble`).
   - The total you see: a statement tile, the button amount in large type.
   - If an order goes wrong: a tilted stack of receipts (`tilted-stack`).
3. **Network.** Many store checkouts off every edge, one in focus (`many-of-one`). Copy: works at stores on the CentryOS network.
4. **Questions.** FAQ, copied from the reference file.
5. **Footer and legal pages.** Port the Privacy, Terms and Payment Partners pages from the reference file unchanged, including the Customer | Partners switch on the Terms page. Do not edit legal text.

## How to work

- One section per task. Stop after each and wait for review.
- Before showing a scene, film it with the skill's scripts using `--gate` at its shown width and at 390, and fix every fault it reports.
- Files in `reference/` are read-only.
- Every scene works with reduced motion (the poster frame) and on mobile.
