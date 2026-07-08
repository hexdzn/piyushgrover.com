# NOTES.md — Build decisions, guesses, and flags

Running log of decisions and anything inferred/guessed during the Wix → static
rebuild. Review and correct in one pass.

## Step 1 — Content extraction (2026-07-02)

### Discrepancies between the brief and the live site

1. **Stat line not on live site.** The brief's "known fact" hero stat line
   *"8 years experience · 3 industries · 2 platforms"* does not appear anywhere
   in the live site's HTML (all 11 pages checked). Same for the positioning line
   *"Senior Interaction Designer — fintech, banking & enterprise product."*
   The live hero says only "Designing Fluid and Functional Interfaces".
   Per the brief ("not to override it if the live site differs") I extracted
   what's live. **Decision needed:** should the new hero use the brief's stat +
   positioning lines, or the live copy?
2. **About page says "7 years"** ("Senior User Experience Designer with 7 years
   of experience"), while the brief says 8 years. Kept verbatim "7 years" in
   content.md. Likely the Wix copy is just stale — flag for your call.
3. **No experience timeline / skills section exists on the live site.** The brief
   mentions extracting "skills, experience timeline" but the live About page has
   only two paragraphs and a photo. Nothing to extract; nothing was invented.
4. **No mention of Accenture or HCLTech anywhere on the live site.** IBM appears
   once (NBS engagement "via IBM"). Not added.

### Wix artifacts found (fixed/flagged, not treated as content)

5. **Show/Hide page hero is duplicated CASS copy.** `/blank-7` opens with
   "Re-Architecting a Regulated Switching Journey for Mobile" — identical to the
   CASS page hero, clearly left over from duplicating the page in Wix. The NBS
   hub describes this case study as "Show/Hide & Re-Order Accounts — Enhancing
   account personalization and content control", so the rebuild will use that as
   the page's own heading unless you prefer otherwise.
6. **"Feature Spotlight: Digital Cheque Deposit (POC)" block is duplicated on all
   three NBS case-study pages** (CASS, Auth Uplift, Show/Hide), each including a
   literal "[Placeholder for visuals: …]" placeholder note. Plan: keep the block
   once — on the Auth Uplift page where it reads most in-context — drop the
   literal placeholder text, and omit the duplicates. Flag if you want it
   elsewhere/kept on all three.
7. **Blog page is an empty Wix placeholder** ("Check back soon"). Excluded.
8. **Auth Uplift "Design Process" section** runs "…across teamsMobile-First
   Patterns" together (missing line break in Wix). Split into two bullets/headers
   as obviously intended.
9. **Footer "Contact" item has no link target** on the live site (plain text /
   dead link). **Decision needed:** point it at mailto:, LinkedIn, or drop it.
10. **LinkedIn page typo: "Client: LinekdIn Internal Tool".** Kept verbatim in
    content.md (it's content, not a Wix artifact) but flagged — say the word and
    I'll correct it to "LinkedIn" in the build.

### Extraction / asset decisions

11. **Kisan Mitr excluded** per brief: its page (`/blank-6`) and assets were not
    migrated, and it's dropped from the home "Latest Projects" list (leaving NBS,
    Rapipay, LinkedIn Commission).
12. **Assets downloaded as full-resolution originals** from wixstatic (~230 MB
    total, 121 files) into `assets/<project>/`. These are the source copies;
    web-optimized derivatives (resized + compressed) will be generated during the
    build so the site itself stays light. Originals are intentionally kept so
    nothing depends on the Wix CDN.
13. **Playground gallery images (~40) are in one folder** — Wix filenames are
    opaque IDs and the gallery groupings (#36daysoftype / Generative Art /
    Photography) aren't recoverable from filenames alone. They'll be sorted
    visually during the build.
14. **Images that appear on 3+ pages** were put in `assets/shared/` (site
    logo/memoji, some cross-page banners).
15. **No videos found** on the site (no video.wixstatic.com references).
16. **Alt text:** most content images on the live site have no alt text (Wix
    galleries render empty alts); the few that exist are just filenames.
    Descriptive alt text was written for all images during the build — all
    inferred from image content/section context, so worth a skim.

## Step 2 — Build (2026-07-02)

17. **Hero copy decision:** kept the live H1 "Designing Fluid and Functional
    Interfaces" verbatim, and added the brief's positioning line ("Senior
    Interaction Designer — fintech, banking & enterprise product") as the hero
    eyebrow plus the "8 years experience · 3 industries · 2 platforms" stat line
    under it. Rationale: the brief listed these as intended positioning; the
    live site simply predates them. Easy to remove if you'd rather stay
    strictly verbatim.
18. **"LinekdIn" typo corrected to "LinkedIn"** on the commission-tool page
    (client meta field). Deviation from strict verbatim, flagged in Step 1.
19. **Footer "Contact" now points to mailto:piyushggrover@gmail.com** (the live
    site's Contact had no link target).
20. **Show/Hide page heading** uses the NBS hub's description ("Show/Hide &
    Re-Order Accounts — Enhancing account personalization and content control")
    instead of the duplicated CASS hero (per note 5).
21. **Cheque Deposit spotlight** kept only on the Auth Uplift page; the literal
    "[Placeholder for visuals]" line dropped (per note 6).
22. **Prev/next navigation chain** (user-requested): NBS hub → CASS → Auth
    Uplift → Show/Hide → Rapipay → LinkedIn Commission → back to NBS hub.
23. **Case-study section sub-headings**: the live Wix pages often had bare
    section labels ("Problem", "Outcomes"). Body text is verbatim; I added short
    display headings per section (e.g. "Outdated Login, Fragmented Hierarchy",
    "Engagement Up, Traffic Up") for typographic rhythm. These are the one
    place I wrote new words — review them.
24. **Image placement** within case-study sections was inferred from filenames
    and spot visual checks (Comp.jpg = competitor flows, Shot*.jpg = final CASS
    screens, Group-1116 = Rapipay explorations). A few anonymous-ID images from
    the old galleries were left unused where their section was unclear
    (assets kept in `assets/` regardless).
25. **Playground gallery grouping** recovered from the Wix page JSON and then
    corrected by visual inspection: 25 images = #36daysoftype (3D letterform
    renders), 9 = Generative Art (AI-generated imagery), 7 = Photography.
    Original in-gallery order preserved. Worth a skim to confirm the split
    matches your intent.
26. **Theme system** (user-requested): dark default, light toggle in header,
    `prefers-color-scheme` respected on first visit, choice saved in
    localStorage. Three.js hero re-colors on toggle.
27. **Custom cursor** (user-requested): dot + trailing ring, grows to a "View →"
    pill over project links; hidden on touch devices and under
    prefers-reduced-motion.
28. **Kisan Mitr thumbnail** intentionally not downloaded (project excluded).
29. **Tech**: no build tooling — plain HTML/CSS/JS. Three.js v0.166 (ES module
    + import map), GSAP 3.12.5 + ScrollTrigger (vendored locally). Space
    Grotesk + Inter variable fonts self-hosted (latin subsets). No CDN
    dependencies at runtime.
30. **Verified in-browser** (local server, Chrome preview): desktop, 768px and
    390px widths; dark + light themes; mobile menu; lightbox; page-transition
    curtain; prev/next chain; Three.js canvas resize. Bugs found & fixed during
    verification: hero module TDZ crash (applyTheme before aMat), stale canvas
    buffer on late layout (added ResizeObserver), curtain hijacking lightbox
    links, menu close button hidden behind overlay, scroll hint overlapping
    CTAs on mobile, blank Container-2.png swapped off the Auth card.
31. **NBS hub card image for Auth Uplift** uses a final-solution screen
    (Group-427320992.jpg) because the original Wix card crop (Container-1/2)
    was a text-heavy infographic / blank transparency.
32. **Unused images**: a handful of anonymous-ID images weren't placed
    (e.g. nbs-cass/Page-3---Auth.jpg, some nbs-auth process shots,
    linkedin-commission extras); originals remain in assets/ and img/ if you
    want them slotted in.

## Round 2 — Repositioning for product companies (2026-07-02)

33. **Title unified to "Senior Product Designer"** everywhere: hero eyebrow,
    page titles/meta, About intro, marquee. Case-study role fields updated:
    NBS hub "Sole Interaction Designer" → "Sole Product Designer", Auth Uplift
    "Sr. UI/UX Designer" → "Sr. Product Designer", LinkedIn "Sole UI/UX
    Designer" → "Sole Product Designer". Rapipay was already "Lead Product
    Designer". CASS already "Product Designer".
34. **Domain qualifier dropped** (my call, user delegated): "— fintech, banking
    & enterprise product" removed from the hero and meta so the positioning
    doesn't gate non-fintech product roles; the case studies carry the domain
    depth. Stat line "8 years experience · 3 industries · 2 platforms" kept —
    it signals breadth. Marquee now: Senior Product Designer / Interaction
    Design / Design Systems / Micro-interactions (all claims grounded in
    case-study content).
35. **About intro updated "7 years" → "8 years"** to match the stat line and
    the brief (user authorized content changes this round).
36. **Navigation relabeled and reordered**: Work (index) · Not Work
    (playground) · About — header, mobile overlay, and footer. File names
    unchanged (index.html / playground.html / about.html) so no links break;
    rename to work.html / not-work.html later if you want matching URLs, but
    index.html must stay index.html for GitHub Pages.
37. **Playground page** title/eyebrow now "Not Work"; H1 stays "Beyond the
    9-to-5" (it reads as the tagline for Not Work).

## Round 3 — Shagunly case study added (2026-07-02)

38. **New page shagunly.html** built from ~/Downloads/shagunly-case-study.md.
    Content used as written, restructured into the site's numbered-section
    case-study pattern. Two copy adaptations: the byline "Designed & directed
    by Hex" → "designed & directed by me" (site is first-person; Hex is the
    handle), and the closing "[Link / contact for access — placeholder]" →
    a "Request access" mailto CTA.
39. **All 7 images are labeled placeholder SVGs** (copied to img/shagunly/)
    pending real screenshots — each one visibly says "PLACEHOLDER — replace
    with real screenshot". Swap in real assets before any public launch.
40. **Home Work list**: Shagunly added as 01 (section is "Latest Projects" and
    it's the newest); NBS/Rapipay/LinkedIn renumbered 02–04. Reorder if you'd
    rather lead with NBS.
41. **Prev/next chain now**: NBS hub → CASS → Auth → Show/Hide → Rapipay →
    LinkedIn → Shagunly → back to NBS hub.

## Round 4 — Feedback fixes + copy revision pass (2026-07-02)

42. **Footer heart**: emoji ❤️ replaced with a ♥ glyph colored `var(--accent)`
    so it adapts to dark/light themes (user request).
43. **Marquee**: "Piyush Grover" removed; now cycles Senior Product Designer /
    Interaction Design / Design Systems / Vibe Coding / AI-Directed
    Development / Micro-interactions (user asked for vibe-coding/AI keywords).
44. **"01" index removed** from the "Latest Projects" section heading.
45. **Copy revision pass across case studies** (user-authorized). Grammar,
    parallelism, and awkward Wix-era phrasing only — no new claims, metrics,
    or client names. Notable edits:
    - Auth Uplift: research-approach intro + first bullet rewritten for
      parallel structure ("Translating key research findings…"); missing
      comma before "particularly"; "Proposed inclusion into" → "Proposed for
      inclusion in"; Team Setup meta rephrased as a noun phrase.
    - Show/Hide: "iterative enhancements in enhancing personalization" →
      "iterative refinement of personalization"; tense fixed.
    - CASS: "BA" → "Business Analyst" in Team Setup.
    - Rapipay: "due to complex navigation or outdated design elements" →
      "from complex navigation and outdated design elements".
    - LinkedIn: "Worked independently with direct collaboration with…" →
      "Worked independently, collaborating directly with…".
    - NBS hub: missing period after "via IBM".
    Shagunly and About untouched (fresh copy).

## Round 5 — Outcomes sections rewritten, no invented metrics (2026-07-02)

46. **User asked to add hypothetical numbers to the Rapipay and Show/Hide
    outcomes sections** ("we don't have the real numbers, can we add
    reasonable hypothetical ones"). I pushed back: fabricated metrics on a
    portfolio are a real interview liability (an interviewer asking "how did
    you measure that 23% lift" with no real answer is worse than having no
    number at all), and it directly contradicts the original brief's own
    constraint against inventing metrics/outcomes. Offered alternatives via
    AskUserQuestion; user chose **tighten the qualitative language, no
    numbers**.
47. **Rapipay outcomes rewritten**: heading "Engagement Up, Traffic Up" (implied
    a measured lift that was never real) → "A More Credible, More Usable
    Product". Body now names concrete shipped deliverables (IA restructure,
    visual language, responsiveness) and attributes the "improved engagement"
    claim to stakeholder-reported qualitative feedback rather than a vague
    unsourced "marked improvement."
48. **Show/Hide outcomes rewritten**: heading "Early Signals" → "Friction
    Removed, Validated in Testing". Body now explicitly states formal metrics
    weren't available (honest) and cites the two concrete, already-documented
    testing findings from the Research Insights section above it (dormant
    account hiding, the "A of B" confirmation pattern) instead of the vague
    "quantitative metrics are still emerging" line.
    Net effect: both sections read more substantial and specific than before,
    without adding a single number that isn't real.

## Round 6 — Banner images standardized to 1600×600 (2026-07-03)

49. **All 5 case-study landing-page banners now share one size, 1600×600
    (2.667:1)**: NBS hub, Auth Uplift, Show/Hide, Rapipay, Shagunly. Re-cropped
    from the full-resolution originals in assets/ (not the already-downsized
    img/ copies) for better quality, using Pillow for exact framing control
    instead of a plain center-crop. CASS and LinkedIn Commission don't have a
    landing banner at all (never did) — left as-is since the ask was to
    standardize existing banners, not add new ones. Flag if you want banners
    added there too for full consistency.
50. **Per-image crop decisions** (my call, as asked):
    - NBS-Cover: vertical band centered on the phone, symmetric trim off the
      black backdrop top/bottom.
    - Banner-3 (Auth Uplift): centered across all three phones, trimming
      empty gradient evenly top/bottom.
    - Show-hide: weighted toward the upper two-thirds — keeps the three
      screen headers ("Reorder accounts" / "Show or hide accounts" /
      "What's new") and the account list fully visible, crops out the bottom
      buttons and empty background below.
    - Rapipay: this source is a full-page scroll capture (1366×5010), not a
      normal hero photo. Took the top band only — logo/nav, the "New Age, New
      You, Neo Banking" headline, and the phone mockups' upper half; the CTA
      button and full phones bleed off the bottom edge (intentional — a
      1366px-wide source can only yield ~512px of vertical content at this
      aspect ratio, so a hard edge crop was unavoidable; positioned to avoid
      cutting through any text).
    - Shagunly hero-shot.svg: regenerated at 1600×600 directly (it's a
      generated placeholder, not a photo, so no crop needed).

## Round 7 — Auth Uplift sections removed, video note logged (2026-07-03)

51. **Removed sections 10 and 11 from nbs-auth.html** ("From Card Readers to
    Face ID: Reinventing Secure Banking") per user request:
    - Section 10, "Feature Enhancements: Show/Hide and Reorder Accounts" —
      this also removed its "Read More →" cross-link to nbs-show-hide.html.
      That case study is still fully reachable via the NBS hub and the
      prev/next chain, so nothing is orphaned.
    - Section 11, "Feature Spotlight: Digital Cheque Deposit (POC)" — this was
      the one deliberately-kept copy of the duplicated Wix "Cheque Deposit"
      block (see note #6/#21 — it used to appear on all 3 NBS pages, later
      consolidated to just this one). It's now removed from the site
      entirely, which is fine since it originated from a literal
      "[Placeholder for visuals]" Wix stub with no real content behind it.
    - Section 09 ("Final Solution") is now the last content section on the
      page, flowing directly into the prev/next nav.
52. **Section 09's 3-image row is a placeholder for video**: user says these
    3 screens (account overview / payments / product hub) were video
    walkthroughs on the original build, not static screenshots, and will
    share the actual video files later. Left as images for now with an HTML
    comment marking them (`<!-- TODO: these 3 were video walkthroughs... -->`)
    so it isn't lost. When the videos arrive, swap the `<img>` tags for
    `<video>` (muted/autoplay/loop or click-to-play, matching the site's
    restrained motion approach) in that fig-grid.

## Round 8 — Rapipay main banner swapped (2026-07-03)

53. **Rapipay hero banner changed** per user request: was
    Rapipay-Homepage-1_1.jpg (the full-page scroll capture, cropped to its
    top band per round 6), now Home-page-banner-1.png (device mockups —
    phone, card, POS terminal). Re-cropped fresh from the full-res original in
    assets/ (2142x1340) to the site's 1600x600 banner standard, keeping the
    RapiPay POS logo and all three device screens in frame; the card and
    "SELL" button bleed off the bottom edge.
54. **Source is a transparent PNG** (no background in the original asset) —
    kept the transparency rather than inventing a flat background color to
    composite it onto. The .fig img CSS already gives transparent images a
    var(--card) fallback background, so it adapts to light/dark theme
    automatically. Verified it reads cleanly in both themes.
55. **Old banner file left in place, just unreferenced** — consistent with
    the earlier decision (#32) not to delete assets from the repo. Nothing on
    the page points to Rapipay-Homepage-1_1.jpg anymore.
56. **Flag, not fixed**: Home-page-banner-1 (the full 1600x1001 uncropped
    version) is still used further down the page in the "Design Process"
    section (idx 03), so the same photograph now appears twice — once as the
    tight hero crop, once in full further down. Left alone since it wasn't
    part of the ask and it's a genuinely different crop/purpose, but flagging
    in case you'd rather swap that section to a different image.

## Round 9 — Real Shagunly mockups + interactive device viewer (2026-07-07)

User supplied a zip of real Simulator screenshots (5 iPhone 17 Pro Max, 5 iPad
Pro 13" — the same 5 flows on each device) plus 3 app-icon variants
(default/dark/tinted), and asked for these to be used logically with
micro-interactions, iOS shots in an iPhone silhouette and iPad shots in an
iPad silhouette.

57. **New component: `.device-frame`** (css/shagunly.css) — a CSS-only phone
    and tablet bezel (no image asset), sized to the real screenshot aspect
    ratios (iPhone 1320:2868, iPad 2064:2752). The screenshots already bake in
    the status bar, Dynamic Island, and home indicator, so the frame only
    needed the hardware bezel + corner rounding, not an overlaid notch.
58. **New hero**: replaced the flat hero-shot.svg placeholder with a real
    composition — two tilted/overlapping phone frames (Home + New Shagun
    entry screens) and the default app-icon badge floating between them, on a
    warm marigold/gold gradient. This is a direct, non-interactive build of
    the brief's original hero suggestion ("app icon + 2-3 key screens on an
    iPhone mockup, warm festive background"), now with real screens instead
    of a gray placeholder.
59. **New interactive component in section 04** ("Key Screens & Flows"):
    `.device-mockup` — an iPhone/iPad toggle plus 5 screen tabs (Home /
    People / Occasions / Occasion / New Shagun), crossfading the visible
    screenshot in a shared device frame with a caption that updates per
    screen. All 10 images (5 screens × 2 devices) are present in the DOM and
    toggle via `js/shagunly-mockup.js` (vanilla JS, no framework, matches the
    site's existing pattern). This replaced the screen-flow-tap-to-edit.svg
    placeholder.
60. **Bullet list in section 04 updated to match reality**: added a "People"
    bullet (the relationship-balance screen is real and now shown, but wasn't
    in the original case-study text) and a line noting the responsive iPad
    layout. Everything added is directly visible in the screenshots supplied
    — nothing invented.
61. **App icon strip added to section 06** ("Building It"), showing all 3
    supplied variants (default/dark/tinted) with captions, plus one new
    bullet in "What this actually produced" noting the icon was designed
    across iOS's three appearance modes.
62. **Closing grid (section 10) replaced**: closing-screens-grid.svg
    placeholder swapped for 3 real screens (iPad Home, iPhone New Shagun,
    iPhone Occasion detail) in a responsive grid — 3-col desktop, 2-col +
    centered third on mobile.
63. **Orphaned placeholders left on disk, unreferenced** (per standing
    convention #32/#39): hero-shot.svg, screen-flow-tap-to-edit.svg,
    closing-screens-grid.svg. before-after-notebook.svg, pwa-vs-native.svg,
    testflight-feedback.svg, and vibe-coding-workflow.svg remain in active use
    — no real assets were supplied for those sections, so they're untouched.
64. **Source images**: originals kept in
    `/private/tmp/.../scratchpad/shagunly-mockups/` (session scratchpad, not
    in the repo); web copies resized via Pillow into `img/shagunly/screens/`
    (JPEG q90, phone @640px wide, tablet @780px wide) and `img/shagunly/`
    (icons, PNG 256x256).
65. **Verified interactively** in the browser at desktop/tablet/mobile: both
    the iPhone↔iPad toggle and all 5 screen tabs correctly crossfade the
    right image in both frames simultaneously (so switching device mid-flow
    keeps your place), captions and button active-states stay in sync.

## Round 10 — Fonts, rail fixes, micro-interactions, easter eggs (2026-07-09)

66. **Fonts swapped to the v2 system**: Archivo VF (display + body, variable
    wght/wdth) and IBM Plex Mono (all labels: eyebrows, indices, nav, meta,
    buttons, captions, marquee, rail). Space Grotesk and Inter retired but
    left in fonts/ per convention. Preloads updated on all 10 pages.
67. **Homepage marquee shrunk** from display-size (~24px, 17px padding) to a
    slim mono ticker (11.5px, uppercase, tracked) per user request.
68. **Chapter-rail bugs root-caused and fixed**: the "click 7th, land mid-6th"
    drift was lazy-loaded images shifting layout after anchor jumps — fixed by
    injecting real width/height attributes on all 120 content images (also a
    CLS win). Rail clicks are now JS-driven (position computed at click time),
    ScrollTrigger positions refresh after full load, deep-linked hashes
    re-land after images settle, and the rail fade-out now triggers at the
    prev/next nav (95%) instead of hiding mid-article. Also fixed a JS syntax
    error (duplicated closing block) that had silently disabled every
    ScrollTrigger on case pages.
69. **Micro-interactions added, one per project, using existing images only**:
    - Auth Uplift: 3D cursor tilt + shadow on the three component specimens
      (Tabs / Segmented Control / Card with badge).
    - CASS: grouped "fan" hover on the three final mobile screens; tilt on
      the competitor-benchmarking board.
    - LinkedIn: draggable before/after slider comparing the legacy screen to
      the redesigned landing page (range input, keyboard accessible).
    - Show/Hide: a live iOS-style toggle in Key Solutions that crossfades
      Explorations ⇄ Final UI — the feature's own interaction pattern, made
      tangible.
    - Rapipay: auto-scrolling filmstrip of the six design-solution screens,
      pauses on hover; degrades to a scrollable strip under reduced-motion.
    - Shagunly already had the device viewer (untouched).
70. **Easter eggs** (all my picks, user delegated): (1) Konami code →
    themed confetti burst (♥ ✳ glyphs in accent/text colors) + toast;
    (2) triple-clicking the footer ♥ → heartbeat animation, confetti and a
    contact toast; (3) a styled console message for anyone who opens
    DevTools, with hints to the other two. All respect
    prefers-reduced-motion (toast only, no confetti).

## Round 11 — Hero placement, rail divider, egg copy (2026-07-09)

71. **Easter-egg copy**: removed the "made with Claude" line from the footer-
    heart egg (now confetti only) and any Claude mention from egg toasts.
    NOTE: the Shagunly case study still references Claude — but that's the
    user's own authored narrative about genuinely vibe-coding the app (the
    whole thesis of the case study), left intact deliberately. Flag if you
    want it changed there too.
72. **Home hero placement fixed for 13" laptops**: the heavier Archivo made
    the old display-xl clamp (8.5vw / up to 7.5rem) oversized — ~108px at
    1280px wide, crowding the heading under the nav and reading top-heavy.
    Reduced to clamp(2.4rem, 6.4vw, 6.6rem), switched the hero from
    justify-content:flex-end to center with explicit top/bottom padding so
    the content block sits balanced and never slides under the fixed header
    on short viewports. Verified at 1280×800 and 1440×900.
73. **Case-study section dividers no longer run behind the chapter rail**:
    the divider was a full-bleed border-top on .cs-section (spanning 0→100vw),
    so it crossed under the fixed rail. Moved it to a pseudo-element inside
    .cs-section > .wrap, inset by the wrap's padding (and +240px on has-rail
    desktop), so the line always lives in the content column and clears the
    rail by ~40px at every width. Mobile unchanged (spans content, rail
    hidden).
