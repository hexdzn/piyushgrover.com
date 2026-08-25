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

## Round 12 — Scroll-jump fix, more eggs, Shagunly launch update (2026-07-11)

74. **Side-nav scroll jump fixed (root cause)**: round-10's load-time hash
    re-scroll fired whenever heavy images finished loading — so clicking a
    rail chapter (which writes #hash) before full page load caused an abrupt
    yank back to that chapter seconds later. Now the hash is only honored on
    load for true deep links (hash present at page open AND zero user
    interaction since); wheel/touch/key/pointer all cancel it. Verified the
    click path end-to-end; note the in-pane verification required
    behavior:'instant' because the preview tab is a hidden rendering context
    where Chrome pauses smooth-scroll — real browsers unaffected.
75. **Three new easter eggs** (joining Konami, heart, console): triple-click
    the header memoji → it spins and rains memojis; 5 rapid theme toggles →
    icon spin + confetti + "Both modes are hand-tuned" toast; typing
    "piyush" anywhere → confetti + the marquee's ✳ separators turn to ♥ for
    8s. All reduced-motion-safe, no invented claims in copy.
76. **Shagunly is LIVE ON THE APP STORE**
    (https://apps.apple.com/us/app/shagunly/id6783436742 — verified 200 +
    title). Updated: hero eyebrow, Status meta (linked), new "Download on
    the App Store" hero CTA, Testing section (TestFlight → shipped through
    full App Review), What's Next retitled "Beyond the Launch" with the two
    completed launch items removed (account deletion flow, store
    listing/launch), Reflection closing now links the store. Home page row
    tag → "iOS · Live on the App Store"; hover preview swapped from the gray
    hero-shot.svg placeholder to a real screen (tablet-home.jpg).
77. **New section 06 "Design Decisions & Trade-offs"** on shagunly.html
    (user asked to elaborate decisions/variations; chose decision-narratives
    now, Figma exports to be slotted in later). Six Considered/Shipped/Why
    cards — auspicious presets, People-as-balance framing, read-only detail,
    direction-first entry, optional occasion linking, serif/night identity —
    every claim grounded in the original case-study copy or directly visible
    in the shipped screenshots; the two annotated figures reuse existing
    screens with fx-tilt. All later sections renumbered 07–11, rail updated,
    anchors verified (11/11 resolve, order matches).
78. **V2 not yet synced** with the App Store launch or the new Decisions
    section — piyush-v2's Shagunly page still says TestFlight beta. Pending
    the v1-vs-v2 direction decision.

## Round 13 — Shagunly Design Kit (SVG export page) (2026-07-11)

79. **New standalone page `design-kit.html`** (NOT linked anywhere, meta
    robots=noindex; reachable only by direct URL
    /design-kit.html). Purpose: a source of designed SVG artifacts Piyush can
    "Copy SVG" and paste straight into Figma (⌘V pastes editable vectors +
    text) to build out the real Shagunly Figma file. 17 artifacts across 5
    sections: Design System (colour tokens, type scale, spacing, night+festive
    theme), Components (buttons/states, segmented toggle, auspicious chips,
    cards, FAB+nav), Explorations (5 A/B "Considered vs Shipped" pairs —
    amount entry, People, entry detail, direction-first, identity), Flows
    (capture + reciprocity), Handoff (annotated redline spec = the
    "Figma → AI build" story in one frame).
80. **Colours sampled from the shipped app screenshots** (PIL pixel sampling),
    nudged slightly more vivid to undo JPEG dulling: primary #7158D7, festive
    gradient #7E6BD6→#8B57E6, received #40C486, given #EC6A7C, gold #E8B04B,
    surfaces #0D0D14/#1B1B26/#15131F. Noted on the page.
81. **Fonts in the SVGs** are placeholders for Figma remap: display = serif
    (Georgia fallback), UI = Archivo, labels/numerals = IBM Plex Mono. The
    real Shagunly serif should be swapped in Figma after paste — called out in
    the page hint.
82. **These A/B explorations are reconstructions**, clearly framed as
    wireframe-level alternates (not claimed as original exploration history) —
    consistent with the earlier decision (#77) to power the case study's
    Decisions cards with real Figma frames once Piyush exports them. This kit
    is the tool to help produce/ää formalize those.
83. **Copy mechanism**: js/design-kit.js serializes each SVG standalone (adds
    xmlns) to the clipboard; verified the output is valid XML, starts with
    <svg>, retains gradients + text. Button → "Copied ✓" + toast. Deployed but
    unlinked, so it ships with the site without appearing in nav/sitemap.

## Round 14 — Real Figma artifacts + retina screens (2026-07-30)

84. **Piyush supplied 19 refined SVGs** (~/Documents/Shagunly Portfolio
    resources) — these are the design-kit artboards he pasted into Figma,
    refined, and exported back (text outlined to paths). Dimensions matched
    my kit 1:1; only the FAB/bottom-nav tile (760x260) wasn't returned.
    Imported to img/shagunly/design/ with semantic names, optimised
    (2dp rounding + whitespace collapse): 3.1MB → 2.77MB on disk, 959K
    gzipped across 19 lazy-loaded files. All valid XML post-optimisation.
85. **Case study reframed around the Figma work.** Lede, meta description,
    Overview and Building-It copy now lead with "designed end-to-end in
    Figma, then handed off and built AI-directed" rather than "vibe coded".
    Added a `Design` meta row. Rationale (agreed with Piyush): the old
    framing buried the actual design work and read as "I prompted an AI";
    the design rigour is what makes the AI build impressive, not vice versa.
86. **Two new sections**: `04 Design System` (colour/type/spacing/theme
    tokens + component states) and `08 Handoff` (the redlined spec — the
    "Figma → AI build" story in one frame, with the pull-quote "Design
    decided in Figma. The build only executed it."). Lo-fi wireframes added
    into `03 Process`, flow diagrams into `05 Screens`, and the five real
    A/B exploration frames into `07 Decisions`. Page went 11 → 13 sections;
    all labels renumbered programmatically and the rail rebuilt from
    document order (13/13 anchors verified resolving).
87. **Section image resolution fixed** (the reported blurriness): repo
    screens had been downscaled to 640px wide (phones) / 780px (tablets)
    while being displayed ~640 CSS px in the Decisions figures — i.e. 1x on
    retina. Re-exported from the untouched 1320x2868 originals on Desktop at
    1100px (phones) and 1400px (tablets), q88 progressive → ~1.7x density at
    display size. Screens dir 1.3MB total.
88. **New screen captured live from the simulator today**: the sign-in
    screen (email/password + Apple/Google SSO) at full 1320x2868, added to
    Building It. The app was installed and launched via `xcrun simctl`
    (bundle app.shagun.Shagunly on the booted iPhone 17 Pro Max).
    LIMITATION: could not navigate the app to capture other screens fresh —
    (a) the simulator MCP needs `sudo xcode-select -s
    /Applications/Xcode.app/Contents/Developer` which requires Piyush's
    password, and (b) the app was logged out and entering credentials is
    off-limits. All other screens therefore come from the 6 Jul originals,
    just re-exported at proper resolution. If the UI has changed since,
    Piyush should sign in + run the xcode-select command and I can recapture.
89. **Stale fact corrected**: "live on TestFlight today" → "cleared Beta App
    Review, then full App Review — live on the App Store today". Remaining
    TestFlight mentions are all correctly historical.

## Round 15 — Content brought current from Shagunly-CaseStudy.md (2026-07-30)

90. **Found a newer source doc**: ~/Desktop/Shagunly-CaseStudy.md (13 Jul),
    plus the app source at ~/Desktop/Shagunly-Swift with 14 Swift files
    modified after the 6 Jul screenshots (incl. FamilyViews.swift and
    WrappedView.swift). The live page was materially behind reality.
91. **Stale facts corrected**: "Family grouping" and "Account deletion flow"
    were listed under What's Next but have SHIPPED; "Dark mode" was listed as
    pending though the app is dark-first. Roadmap replaced with the real one
    (calendar sync, shareable Wrapped card, per-relationship insights,
    widgets, Hindi localisation, Android in Flutter).
92. **Role framing** (asked Piyush; he chose "designer-led, founder scope"):
    now "Product & design lead — solo founder, carrying design through to
    iOS, backend and web". Keeps the site-wide Senior Product Designer
    positioning while showing the range. Stack row now names SwiftUI /
    Supabase (Postgres, RLS, Edge Functions) / native Apple & Google Sign-In;
    platform notes iOS 17+ and Android (Flutter) in development.
93. **New section 08 "Product Decisions"** — six cards from his doc: the
    reciprocity engine, hosted occasions (flipping the book), family sharing
    with change-request approval enforced in RLS, wedding-season speed,
    Shagun Wrapped, privacy as a feature. This is the strongest senior-level
    material on the page and was previously absent entirely.
94. **Engineering Judgment rewritten** with the real war stories (nil-vs-NULL
    PATCH trap, scope-blind reminder rescheduling, native GoogleSignIn for
    branded auth, deployment-target lockout, deletion without data loss),
    replacing the earlier generic list.
95. **Problem section** gained the defining-moment callout: "standing at a
    venue, envelope in hand, trying to remember what they gave you three
    years ago."
96. Page is now 14 sections; renumbered programmatically, rail rebuilt from
    document order, 14/14 anchors verified, 0 broken images, no h-scroll.
97. **Still outstanding**: fresh screenshots of the shipped Family / Wrapped /
    hosted-occasion screens (app is logged out + simulator MCP needs
    `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`), and
    the 4 remaining placeholder SVGs. Also unused: shagunly.netlify.app
    marketing site — not linked from the case study yet.

## Round 16 — Occasions tabs merged into one paired view (2026-07-30)

98. **Two occasion tabs merged into one** (user request): the screen viewer
    had separate "Occasions" and "Occasion" bubbles. Now a single
    **Occasions** tab shows both states side by side — the list and the
    drilled-in detail — with mono labels underneath ("Occasions list" /
    "Occasion selected", the latter in accent). This demonstrates the
    drill-down relationship instead of hiding it behind a second tab.
    Tabs are now Home / People / Occasions / New Shagun.
99. **Implementation**: added `.device-frame.companion` frames (phone +
    tablet) holding the detail screen, shown only when
    `[data-screen='occasions']`; labels via `::after` on `data-pair-label`.
    Companion images carry `data-screen="occasions"` so the existing
    toggler keeps them active — without that attribute the JS stripped
    `is-active` and the frame rendered black (caught in verification).
    Removed the now-unreachable `data-screen="occasion-detail"` images from
    the primary frames (dead weight, ~280K).
100. Captions merged — the occasions caption now covers both states.
     Verified: iPhone + iPad pairing, labels rendering, mobile at 375px
     (two 150px frames, no overflow).
101. **Not done, deliberately**: shagunly.netlify.app is NOT linked from the
     case study — user explicitly declined.

## Round 17 — Placeholder graphics removed (2026-07-30)

102. **All remaining placeholder SVGs removed** from shagunly.html (user
     asked whether they were still needed; chose remove-all). Dropped the
     four still on the page — before-after-notebook (Overview),
     pwa-vs-native (Process), vibe-coding-workflow (Building It),
     testflight-feedback (Testing) — plus three already-orphaned from
     earlier rounds (hero-shot, screen-flow-tap-to-edit,
     closing-screens-grid). Files deleted from img/shagunly/; that folder
     now holds only the 3 app icons, design/ (19 Figma artifacts) and
     screens/ (11 retina screens).
     Rationale: a grey "PLACEHOLDER — replace with real screenshot" box on
     a live portfolio reads as an unfinished page, and one sat in the
     Overview as the first image a visitor saw. Two of the four needed
     photography/App-Store-Connect screenshots Piyush would have to supply;
     the other two were diagrams now largely redundant with the handoff
     spec (which already carries "Figma → structured spec → AI build →
     device test"). Surrounding copy already makes each point.
103. v2 (piyush-v2) still references its own copies of these placeholders in
     its own repo — untouched, separate files. If v2 becomes the live site
     they need the same cleanup.
104. Verified after removal: 14 sections, 0 broken images (42 total), no
     "PLACEHOLDER" string anywhere on the page, no empty sections, rail
     anchors all resolve, no horizontal scroll.

## Round 18 — Updated handoff spec + iPad companion bug (2026-07-30)

105. **handoff-spec.svg replaced** with Piyush's refined export
     (Newframe.svg, 1000x600 — same artboard, so no markup change needed).
     Optimised to 245K on disk / 84K gzipped, valid XML.
106. **BUG FIXED — iPad showed two frames on every tab.** My round-16
     companion-hide rule `.device-mockup .device-frame.companion` was
     specificity (0,3,0), but the pre-existing
     `.device-mockup[data-device='tablet'] .device-frame.tablet` is (0,4,0)
     — so on iPad the tablet companion won and rendered on Home, People and
     New Shagun too. Rewrote the hide rule as
     `.device-mockup[data-device] .device-frame.companion` (matching (0,4,0)
     and placed later) with explicit
     `[data-device='phone'|'tablet'][data-screen='occasions']` show rules.
     Verified all 8 device x screen combinations: exactly one frame
     everywhere, two only on Occasions.

## Round 19 — CASS + LinkedIn banners, Rapipay duplicate resolved (2026-07-30)

107. **Banner standardization completed (closes #49).** CASS and LinkedIn
     Commission now have 1600x600 landing banners like the other five case
     studies, in the same `<section class="wrap"><figure class="fig">`
     slot directly under the hero, `fetchpriority="high"`.
108. **The repo's real banner convention, which I followed**: on every
     existing case study the banner file appears *only* in the banner slot
     — NBS-Cover, Banner-3, Show-hide and the Rapipay hero are each used
     once on their page. So both new banners were built to be unique files,
     not re-crops of something already on the page. This is the same
     principle #56 was flagging.
109. **CASS banner** — `img/nbs-cass/cass-banner.jpg`, built from the
     full-res `assets/nbs-cass/Shot.png` (3200x2400, the single-phone
     "Joint account / Step 1 of 7" render). A straight 8:3 crop cut the
     "Joint account" heading in half, so instead I padded the source
     sideways to exactly 6400x2400 by replicating its outermost pixel
     columns — the backdrop is a smooth pale-blue gradient, so the
     extension is seamless — then downscaled to 1600x600. Result: the whole
     phone visible, screen content legible, airy gradient either side.
     Chose this screen because `Shot.jpg` is already the CASS card image on
     the NBS hub, so hub card and page banner now echo each other (same
     pattern Show/Hide already uses).
110. **Shot.jpg removed from the "Final Solution" fan** on nbs-cass.html so
     the banner stays unique to the page (per #108). Fan went cols-3 →
     cols-2, now Shot2 (2 screens) + Shot4 (3 screens) — still 5 screens,
     one more than before. Added a `.fx-fan.cols-2` hover rule in main.css
     so a two-up fan tilts symmetrically (-1.5deg / +1.5deg) instead of
     inheriting the three-up rhythm, where the second child would have
     lifted straight up with nothing to its right.
111. **LinkedIn banner** — `img/linkedin-commission/linkedin-banner.jpg`,
     the top 70% band (2880x1080 of 2880x1536) of
     `0c9a39_c7f4ccc367624c358769982db0cc7902_mv2.png`: the populated Users
     screen with sidebar, user list and the roles/permissions detail panel.
     Picked deliberately over the redesigned landing page (…10e2…), which is
     the better-looking screen but already appears twice further down (as
     the "After" half of the before/after slider and as the first tile of
     the redesigned-screens grid). Using it a third time as the banner would
     also have spoiled the slider's reveal. c7f4 was unused anywhere.
     Top-band crop keeps the LinkedIn-blue nav as the brand anchor; the
     bottom row of the user list bleeds off, which reads as scroll depth.
112. **#56 resolved, and it turned out to be a mislabeling bug, not just a
     duplicate.** Rapipay's "Design Process" figure and its "Information
     Architecture" figure were showing the wrong images:
     - `Illustration-(1).jpg` was captioned "Rapipay information
       architecture" but is actually the *design process* diagram —
       Discover / Research / Ideation / Design / Testing / Collaboration.
     - `wolfgang-hasselmann-1ICIhK-ElJs-unsplash-edited.png` — an Unsplash
       filename inherited from Wix, so it read like stock photography and
       had been left unused — is actually the *IA sitemap* (Home page →
       Services / About us / Chat bot / Contact us / User profile / FAQ /
       Media, with their children).
     Swapping each into its correct section fixed the labeling and removed
     the duplicated hero photograph in one move, with no image invented and
     nothing dropped. `Home-page-banner-1` now appears exactly once on the
     page (the hero). Alt text rewritten to describe what each diagram
     actually shows.
113. **Filename kept** on the IA sitemap (still "wolfgang-hasselmann-…
     unsplash-edited.png") per the standing convention of not renaming
     migrated assets — but flagging it, since the name actively misleads
     about the file's contents. Say the word and I'll rename it to
     `information-architecture.png`.
114. **Verified** at 1280x800 on all three pages: 0 broken images, both new
     banners load at their natural 1600x600 and render 938x353 in the
     content column, banner sits between `.cs-hero` and the first
     `.cs-section`, CASS rail anchors 5/5 resolve, CASS page now has zero
     duplicate image srcs, Rapipay's only remaining duplicates are the six
     filmstrip screens (intentional — the track is doubled for the seamless
     loop), no horizontal scroll anywhere.
115. **NOT done — #78/#103 are still open.** piyush-portfolio-v2 is
     untouched, still a single commit ("v2 'Kinetic Type'"), and its
     Shagunly page is materially behind v1: 10 sections vs v1's 14, Status
     still "Live in TestFlight beta", the "vibe code" framing v1 dropped in
     round 14, and its own copies of all four placeholder SVGs
     (before-after-notebook, pwa-vs-native, vibe-coding-workflow,
     testflight-feedback) still on the page. Nothing from rounds 12–18 has
     been ported. Blocked on the v1-vs-v2 direction decision.

## Round 20 — Click-to-expand on all project images, oversized figures (2026-07-31)

116. **The lightbox existed but was wired only to the Playground gallery.**
     `js/main.js` bound it to `[data-lightbox]` anchors, and the 41 of those
     on the site are all on playground.html — so every case-study image was
     inert. Extended it to `.fig img` plus the Rapipay filmstrip. Worth
     doing because the stored images are 1600px wide but display in a ~940px
     column, so expanding reveals real detail rather than just scaling up.
117. **Scope of what became clickable**: 14 images on Auth Uplift, 22 on
     Shagunly (including all 19 Figma artifacts — the design-system and
     handoff-spec frames are the ones most worth reading at full size), 10
     on Rapipay. Excluded on purpose: the six aria-hidden filmstrip
     duplicates (they exist only to seam the loop, so they'd have been
     phantom tab stops), the before/after slider halves (clipped and
     absolutely positioned), and the Shagunly `.device-frame` screens — the
     frame is the component, and its hidden companion images would have
     become focusable-but-invisible tab stops.
118. **Tall images no longer collapse.** The lightbox capped images at
     `max-height: 86vh`, so Rapipay's 1600x5913 UI-explorations board opened
     at roughly 186px wide — narrower than it is in the page. Images taller
     than 1.6x their width now get a `tall` class: max-height lifted, capped
     at 1100px wide, and the overlay scrolls. That board now opens at
     1100x4065 and scrolls. `place-items: start center` on the tall variant
     because a centred grid item that overflows its container clips on the
     leading edge — the top of the image would have been unreachable.
119. **Clicking the image no longer closes the lightbox** — only the
     backdrop, the × button, or Escape. Required by the above: you can't
     scroll through a tall image if any click on it dismisses.
120. **Keyboard + a11y**: expandable images get `role="button"` and
     `tabindex="0"`, respond to Enter/Space, take focus to the × on open and
     hand it back to the originating image on close, and show an accent
     focus ring. The custom cursor already supported `data-cursor="view"`
     with a label, so figures reuse it and show "Expand"; the native
     `cursor: zoom-in` is applied only under `body:not(.has-cursor)` so
     pointer devices never get both the ring and a system cursor.
121. **BUG FOUND AND FIXED during verification — a stranded invisible
     overlay.** The original CSS animated `visibility` with a delay
     (`transition: opacity .3s ease, visibility 0s linear .3s`) to keep the
     element around for the fade-out. If that transition never runs — which
     is exactly what happens in a backgrounded or throttled tab — the
     lightbox stays `visibility: visible` at `opacity: 0`: invisible, but
     still covering the viewport at z-index 90 and swallowing every click on
     the page. Confirmed live: after closing, `elementFromPoint` at the
     viewport centre still returned the overlay. Replaced with two
     JS-controlled classes — `.mounted` (visibility) and `.open` (the fade)
     — with the unmount on a `setTimeout`, which still fires in a
     backgrounded tab. This pre-dated this round and would have affected the
     Playground gallery too.
122. **Related timing trap**: focusing the × button one frame later via
     `requestAnimationFrame` silently did nothing, because rAF doesn't fire
     in a hidden tab either. Now it forces a style flush (`void
     lb.offsetWidth`) and focuses synchronously.
123. **Tappability.jpg resized (user report).** It's a simple diagram — one
     bell icon with two dashed boxes labelled "visual bounds" vs "tap/touch
     target size" — and it was rendering 938x697, the full content width,
     which read as a mistake. New `.fig-narrow` utility caps it at 560px and
     centres it: now 560x416. Full detail still available on click.
124. **Persona photos resized (user report).** Two 1600x2057 portraits in a
     cols-2 grid were rendering 461x592 each — taller than the persona cards
     they illustrate. `.fig-grid.cols-2.fig-narrow` caps the pair at 680px:
     now 332x426 each. Chose to scale rather than re-crop so the photos stay
     whole; the lightbox covers anyone who wants a closer look.
125. Both caps are max-widths, so at mobile widths they're inert and the
     figures still fill the column (verified: 350px wide at a 390px
     viewport, no horizontal scroll).
126. **Verified** at 1280x800 and 390x844: open/close via click, Enter,
     Escape, backdrop and × button; focus moves to × and returns to the
     image; page scroll locks and unlocks; `src` cleared and `tall` reset on
     close; the page is clickable again afterwards; the Playground gallery's
     41 anchors still work unchanged; no hidden-but-focusable images on
     Shagunly; no horizontal scroll at either width.
127. **Not deployed.** These are local commits-in-waiting — the live site at
     hexdzn.github.io/piyushgrover.com won't show any of rounds 19-20 until
     it's pushed to origin/main. Say the word and I'll commit and push.

## Round 21 — Persona portraits moved into their cards (2026-07-31)

128. **Layout fix (user report).** Round 20 shrank the two persona portraits
     but left them where they'd always been: a separate two-up figure grid
     sitting *below* the two persona cards. That's what actually read as
     broken — the photos were orphaned from the names they belong to, and
     the section was two stacked grids of different proportions.
129. **Each portrait now lives inside its own persona card**, top-left,
     with the name and meta line beside it — the conventional persona-card
     shape. New `.persona-head` flex row and an 88px `.persona-avatar`
     cropped square via `object-fit: cover` with `object-position: 50% 26%`.
     The 26% bias is deliberate: both source photos are full-length
     portraits, and a straight centre crop would have framed torsos. Checked
     the exact crop offline against both files — face fully in frame and at
     roughly the same height in each.
130. Section height went from ~1170px to 580px, and the separate
     `.fig-grid.cols-2.fig-narrow` block is gone. The `.fig-narrow` utility
     stays — Tappability.jpg still uses it, and it's now cheap to reuse.
131. **Avatars stay expandable**: added `.persona-avatar` to the lightbox
     selector, so clicking one opens the full 1600x2057 portrait. Without
     that they'd have dropped out of the round-20 click-to-expand set, since
     they're no longer inside a `.fig`.
132. **Verified** at 1280x800 and 390x844: both avatars share a top edge and
     an identical 33px inset from their card's left padding, cards are equal
     height, cards stack cleanly on mobile with the meta line wrapping
     inside the head row, no stray figure grid left in the section, both
     avatars zoomable, no horizontal scroll at either width.

## Round 22 — Shagunly home-page hover preview (2026-07-31)

133. **Hover preview replaced** (user request). The Shagunly row on the home
     page previewed `screens/tablet-home.jpg` — a portrait iPad screenshot
     (1400x1867, 0.75 aspect) inside a `.project-preview` box that is
     `aspect-ratio: 4/3` with `object-fit: cover`. So ~44% of its height was
     cropped away and what actually showed was a mid-screen band of the
     transaction list: no device, no app identity, and the header cropped
     off. It also sat oddly beside the other three previews, which are all
     landscape device/brand covers.
134. **New file `img/shagunly/shagunly-cover.jpg`** (1200x900, exactly 4:3 —
     so `cover` now crops nothing). Composed in Pillow from the real
     screenshots: the Home and New Shagun phone screens in device frames,
     tilted and overlapping, with the default app icon in the top-left glow.
135. **Background and frames replicate the case study's own CSS** rather
     than being invented: the two radial gradients from `.shag-hero`
     (marigold `rgba(217,154,63,.32)` at 18%/12%, purple
     `rgba(168,85,190,.26)` at 88%/88%, over `--card` #15171C) and the
     `.device-frame.phone` bezel (1320:2868 aspect, 34px radius, 9px
     padding, `linear-gradient(160deg,#232329,#08080a)`, inset white
     hairline) — all scaled proportionally. So the home preview and the
     case-study hero now read as the same composition.
136. First attempt was too tight — phones bled off all four edges and the
     icon collided with the screens. Rescaled to 332px/292px screen widths
     so both devices sit whole with margin, matching how NBS/Rapipay/
     LinkedIn covers frame their devices.
137. `screens/tablet-home.jpg` is **not orphaned** — still used twice on
     shagunly.html (the device viewer in Key Screens, and the closing grid).
138. **Verified** at 1280x800: preview box 300x225, image aspect 1.333 vs
     box aspect 1.333 (zero crop), hovering the Shagunly row activates only
     that image, no broken images, and rendered all four previews side by
     side at true display size to confirm the new cover reads in the same
     visual family as the other three.

## Round 23 — "See the Not Work" CTA removed from About (2026-07-31)

139. **Removed the `See the Not Work →` ghost button** from the About page's
     CTA row (user request), leaving `Connect on LinkedIn` as the single
     call to action. Nothing else changed — the row keeps its height and
     left alignment.
140. Not Work stays reachable from the About page via the header nav and the
     mobile menu overlay, so nothing is orphaned by the removal.
141. **Noted, not changed**: no page's footer links to playground.html —
     the footer nav is Work / About / Contact site-wide. Round 12's note #36
     said the footer was relabelled alongside the header and mobile overlay,
     but Not Work never made it into the footer column. Consistent across
     all 10 pages, so it predates this change. Flag if you want it added.

## Round 24 — CRITICAL: site was invisible without JavaScript (2026-07-31)

142. **Root cause.** `css/main.css` had `[data-reveal] { opacity: 0 }` as the
     default with `html.no-js [data-reveal] { opacity: 1 }` as the escape
     hatch — but **nothing ever set `class="no-js"` on `<html>`**, so that
     rule had never once applied. Dead code since the original build.
     Verified by rendering each page with every `<script>` stripped: 100% of
     reveal elements sat at `opacity: 0`. Scope: 93 elements on Shagunly, 38
     on nbs-auth, 34 on nbs-cass, 26 show-hide, 25 rapipay, 23 linkedin, 19
     nbs, and the entire "Latest Projects" list on the home page.
     On index the preloader also stayed up, covering the page at z-index 100.
143. **Fix**: `class="no-js"` added to `<html>` on all 11 pages, cleared in
     the existing inline head script (the earliest JS on the page, already
     there for the theme flash) via
     `document.documentElement.classList.remove('no-js')`. Added
     `html.no-js .preloader { display: none }`. No new requests, no new
     files — the CSS was already written for exactly this pattern.
144. **Why it mattered beyond no-JS users**: Googlebot renders JS but does it
     in a deferred second pass, and non-rendering crawlers (social scrapers,
     several AI crawlers) see the raw DOM. Content hidden at opacity 0 behind
     an animation library is a well-known indexing risk — and it made *any*
     JS error a total blank-page failure.
145. **Preloader safety net added** (`js/main.js`): the intro overlay covers
     the whole viewport until a GSAP timeline finishes, so anything that
     stalls that timeline strands the page. `requestAnimationFrame` does not
     advance in a background tab, so a cmd-clicked "open in new tab" hits
     exactly that. Now a `setTimeout(dismissPre, 6000)` clears it
     unconditionally (~2.4s after the ~2.6s intro), and `dismissPre` is
     idempotent so the normal path is unaffected.
146. **Verified**, scripts stripped, cache-busted: 0 invisible elements on
     index / about / rapipay / nbs-cass / nbs-auth / shagunly, preloader
     hidden, and real readable text present (17,458 chars on Shagunly, 5,419
     on nbs-auth, 3,650 on nbs-cass). With JS on: `no-js` is removed, GSAP
     and ScrollTrigger both load, and the timeout fallback correctly tore the
     preloader down and restored `body` overflow in a hidden tab.

## Round 25 — SEO foundations, built for piyushgrover.com (2026-07-31)

147. **Target domain decided**: Piyush owns piyushgrover.com (registered via
     Wix). All canonical, og:url, sitemap and JSON-LD URLs are written
     against `https://piyushgrover.com` — apex, no www, no trailing
     index.html on the home URL.
148. **CNAME deliberately NOT committed.** Adding it makes GitHub Pages
     redirect hexdzn.github.io/piyushgrover.com/ to the custom domain
     immediately; if DNS isn't pointed yet the site is unreachable at *both*
     URLs. It goes in only once the Wix DNS records are live.
149. **Canonical + social meta on all 10 indexable pages**: `rel=canonical`,
     `author`, dual `theme-color` (dark/light), full Open Graph block
     (type/site_name/locale/url/title/description/image + explicit
     1200x630 dimensions + image:alt) and `twitter:card=summary_large_image`.
     Titles and descriptions were already unique and well-sized, so they were
     reused rather than rewritten.
150. **Share images generated** into `img/og/` (10 files, 544K total). Three
     are designed cards (home, about, playground) — dark surface, accent
     kicker, name, domain rule — composed in Pillow. The other seven are the
     existing case-study banners contain-fitted onto the brand background at
     1200x630 so nothing is cropped. NOTE: the cards use Helvetica Neue, not
     Archivo — the site's fonts are woff2 and neither `fonttools` nor
     `brotli` is installed to convert them for Pillow. Close enough for a
     share card; regenerate if the fonts become available.
151. **JSON-LD structured data** — the highest-leverage item for ranking on a
     personal name. `Person` (+`WebSite`) on the home page with `sameAs`
     pointing at LinkedIn, Instagram and Behance, which is how Google ties
     the query "Piyush Grover" to this specific person; `ProfilePage` on
     about; `CreativeWork` on each of the 7 case studies with `author`/
     `creator` referencing the same `@id`. Every field is drawn from what the
     site already claims — no invented employer, school or award. All 9
     blocks parse as valid JSON.
152. **sitemap.xml** (10 URLs, priorities weighted to home/about/Shagunly)
     and **robots.txt** (allows all, disallows /design-kit.html, points at
     the sitemap). design-kit stays `noindex` as before.
153. **404.html added** — on-brand, `noindex`, and it carries a **legacy Wix
     URL redirect map**. The domain currently serves the old Wix site, whose
     pages live at `/blank-1`, `/blank-1-2`, `/blank-2`, `/blank-3`,
     `/blank-5`, `/blank-7`, `/blank-6`, plus `/home`, `/about`, `/blog`
     (slugs recovered from content.md). Those may be linked or indexed today
     and would become dead ends the moment the domain switches. GitHub Pages
     cannot issue a real 301, so this is a client-side `location.replace` —
     weaker than a true redirect for link equity, but far better than a dead
     end. It also gives the new pages clean extensionless URLs (/rapipay,
     /about) for free.
154. **Honest limits, stated to Piyush**: technical SEO is fully in scope and
     now done; ranking position is not guaranteed. "Piyush Grover" is a
     common name competing against other people's LinkedIn profiles, and
     Google weighs domain authority and inbound links, which are earned over
     time, not coded. The exact-match domain plus Person/sameAs schema are
     the two strongest levers available.
155. **Verified**: 9/9 JSON-LD blocks valid; all 10 pages carry canonical +
     10 og tags + 4 twitter tags + theme-color; all og:image files return
     200; sitemap.xml is valid XML with 10 `<loc>`s; robots.txt serves;
     Shagunly still renders 14 sections, 14/14 rail anchors, 0 broken images,
     no horizontal scroll after the head injection.

## Round 26 — Images converted to WebP (2026-07-31)

156. **All referenced rasters converted to WebP** (quality 80, method 6):
     150 files, 30.56 MB → 7.11 MB. Total referenced image weight across the
     site went **33.51 MB → 9.77 MB (−71%)**. 172 `src`/`href` references
     rewritten across all 11 pages.
157. **Measured the alternatives first** rather than guessing: re-encoding in
     place as JPEG q82 progressive saved only 24%; WebP saved 77%. Worth the
     format change by a wide margin.
158. **Deliberately NOT converted**:
     - `img/og/*.jpg` — social scrapers (LinkedIn, WhatsApp, Slack) are
       unreliable with WebP for `og:image`. Share cards stay JPEG.
     - `img/shared/Memoji1.png` — it's the `rel=icon` source; PNG is the
       safe favicon format. Resized 512px → 128px instead: 118KB → 11KB.
       It's displayed at 30px, so 512 was ~17x oversampled.
     - The `image` field in the JSON-LD blocks still points at
       `IMG_5889_HEIC.jpg`; standard formats are safer for crawlers and the
       file is still on disk.
     - SVGs (the 19 Shagunly Figma artifacts) — already vector, and GitHub
       Pages serves them gzipped.
159. **Originals kept on disk**, per the standing convention (#32/#55) of not
     deleting migrated assets. The conversion is reversible by rewriting the
     references back. Repo is bigger; the *served* site is 71% lighter.
160. **Persona avatars right-sized.** They were the worst offender: two
     1600px files (864KB combined) rendering into 88px boxes, ~18x
     oversampled — introduced in round 21 when the portraits moved into the
     cards. Now `Persona-{1,2}-avatar.webp` at 220px (10KB each) with the
     full-resolution file carried on a new `data-full` attribute.
161. **Lightbox learned `data-full`** (`js/main.js`): it now prefers
     `data-full` over `currentSrc`/`src`, so clicking a downsized avatar
     still opens the full 1600x2057 image. This is the general mechanism for
     any future "small inline, large on click" pair.
162. **Verified** across 9 pages after conversion: 0 broken images (index,
     playground 42, shagunly 42, rapipay, nbs-cass, linkedin, about, nbs,
     show-hide), the only non-WebP `src` anywhere is the intentional favicon
     PNG, no horizontal scroll at 1280, Shagunly still 14 sections with
     14/14 rail anchors, and the persona lightbox confirmed opening the
     1600x2057 original from a 220px avatar rendered at 88px.
163. **Known caveat, stated**: WebP-only means no fallback for Safari 13 and
     older (~1-2% of traffic, browsers from before 2020). Judged acceptable
     for a portfolio; a `<picture>` fallback would mean rewriting ~170 `img`
     tags and risks layout regressions across the fig grids, sliders,
     filmstrip and device viewer. Reversible if it ever matters.

## Round 27 — Research matrix moved, a11y pass, content fixes (2026-07-31)

164. **Research matrix moved off Auth Uplift onto Show/Hide** (user
     decision, "if it makes sense" — it does). `User-testing_edited` is a
     ten-participant synthesis grid whose columns are entirely about hiding
     and reordering accounts on the home screen; it was sitting in the
     Authentication research section under the alt "User testing session —
     observing login friction", which was wrong twice over. Copied to
     `img/nbs-show-hide/research-matrix.webp`, placed under "What Testing
     Revealed" where it is the direct evidence for that paragraph, with a
     descriptive alt and a figcaption. Also consistent with round 7, where
     the Show/Hide *content* was deliberately removed from the Auth page.
165. **Show/Hide de-duplicated.** `show-hide-exploration` and `show-hide-2`
     each appeared twice — inside the Key Solutions toggle *and* again as
     standalone "Explorations" and "Final UI" sections. Removed both
     standalone sections: the interactive swap already shows the same two
     images and is the better presentation. Page went 7 → 5 sections, rail
     rebuilt from document order and renumbered. Page now has zero duplicate
     image srcs, and gained the research matrix, so it lost nothing visually.
166. **CASS "Structuring Unhappy Paths" fixed.** The section carried two
     images, neither about unhappy paths. Split them to where they belong:
     the Internet-Banking-vs-mobile comparison now sits under "From Dense
     Pages to Single-Intent Screens" (it *is* that argument, in one frame),
     and the full journey wireframe board under "Wayfinding Without Breaking
     Compliance". Both gained real alt text and figcaptions in place of
     "CASS flow structure exploration" / "CASS journey design exploration".
167. **Rapipay filmstrip alts corrected** — all six were invented at
     migration and named the wrong pages. Now Loans / About Us / International
     Transfers / POS solutions / Careers / Consumers, matching what each
     capture actually shows.
168. **LinkedIn grid**: dropped the tile repeating the landing page (already
     the slider's "After"), and rewrote the five remaining alts, which named
     screens that do not exist — "team management view" was the admin
     dashboard, "team creation flow" the pay-file table, "role assignment
     forms" a re-open-pay-file modal.
169. **Accessibility pass:**
     - **Skip link** on all 12 pages, first tab stop, `href="#main"`, with
       `<main id="main" tabindex="-1">` as the target. Positioned off-screen
       by transform rather than `display:none` so it stays in the tab order.
     - **Heading order fixed everywhere — 0 skips on all 11 pages** (was
       h2→h5 on most, h2→h4 twice on Shagunly). Footer column headings
       h5 → `h2.foot-col-title`; Shagunly decision cards h4 →
       `h3.decision-title`. CSS selectors updated to match, so nothing
       moved visually.
     - **Touch targets**: header nav was 19px, footer links 16px, mobile
       menu socials 23.75px — all now ≥24px via `min-height` + inline-flex,
       leaving the type scale untouched. The `aria-current` underline moved
       from `bottom:-6px` to `bottom:1px` to stay snug on the taller link.
       Zero sub-24px targets remain.
170. **Verified**: 0 heading skips and a working skip link on all 11 pages;
     0 remaining sub-24px targets; 0 broken images and no horizontal scroll
     on the five edited pages; all rails resolve; no generic/incorrect alt
     text left. The skip link's `:focus` state could not be observed
     directly because the preview pane reports `document.hasFocus() === false`
     (so `:focus` never matches), but forcing the focus declaration placed it
     at top 0 and the unfocused state measures fully off-screen (bottom
     -9.6px) — correct in both states.
171. **Left alone deliberately**: Rapipay's six `aria-hidden` filmstrip
     duplicates (they seam the infinite loop) and LinkedIn's `Old-image`
     appearing as both the "Existing Screen" figure and the slider's
     "Before" half — the comparison needs it, and unlike the Show/Hide case
     it is a recognised before/after pattern rather than a repeat.

## Round 28 — Shagunly meta block trimmed (2026-08-03)

172. **Hero meta grid reduced 7 fields → 4** (user request). It was the
     outlier on the site: Rapipay has 2, CASS 4, Auth and LinkedIn 5, while
     Shagunly carried Role, Platform, Status, Stack, Design, Build method
     and Timeline, each a full sentence. It now reads Role · Platform ·
     Status · Design & build and fits one row at desktop (grid height 128px,
     down from 233px at the intermediate 5-field pass).
173. **What was merged, and why:**
     - *Design* + *Build method* → **Design & build**: "Designed in Figma,
       built AI-directed — zero hand-written code". Keeps the round-14
       reframing (design first, AI build second) in one line instead of two.
     - *Platform* + *Stack* → **Platform**: both rows opened with "SwiftUI",
       so the pair was partly restating itself. Now "iOS 17+ · SwiftUI ·
       Supabase · Android in development".
     - *Timeline* dropped: "Ongoing — shipped to the App Store" restated
       Status, which sits two columns away, and the "Download on the App
       Store" CTA directly beneath said it a third time.
174. **Nothing was lost from the case study** — checked every dropped detail
     against the body text before committing: founder scope (backend/web),
     "originally a PWA", Flutter, Postgres/RLS, Claude as the build partner,
     Apple/Google Sign-In, and the live-feedback iteration are all still
     stated in Overview, Process, Product Decisions, Building It or What's
     Next. Only the summary block got shorter.
175. **Verified** at 1280x900 and 390x844: single row on desktop, clean
     four-item stack on mobile, no cell overflow, no horizontal scroll,
     App Store link in Status intact and the hero CTA untouched.

## Round 29 — Building It layout fixed (2026-08-03)

176. **Two separate problems made this section look broken** (user report):
     - The `phone-auth` screenshot was **30% empty background**. Measured it
       row-by-row: real content ends at y=1673 of 2390, so the bottom 717px
       was flat dark backdrop. At 340px wide that rendered a 739px-tall
       figure, most of the lower third being nothing.
     - The figure sat full-width and alone, so the entire right half of the
       section was blank next to it, and the `.icon-strip` was stranded
       below, centre-aligned to nothing.
177. **Screenshot cropped** 1100x2390 → 1100x1800 from the uncropped
     `phone-auth.jpg` kept during the WebP pass (so this is reversible).
     Leaves ~127px of breathing room below the sign-in card. Figure is now
     300x544 instead of 340x739 — 26% shorter — and the `width`/`height`
     attributes were updated to match so CLS still holds.
178. **New `.build-artifacts` pairing**: the auth screen and the three app
     icons are two halves of the same "what this actually produced" point,
     so they now sit side by side — `minmax(0,300px) 1fr`, vertically
     centred, with the icon strip switched to `justify-content: flex-start`
     inside the pairing so the icons align to the screenshot rather than
     floating in the middle of the leftover column. Stacks and re-centres
     below 760px.
179. **Verified** at 1280x900: figure and icon strip share a row, side by
     side, vertically centred to within 12px, no horizontal scroll. At
     390x844: cleanly stacked, figure capped at 280px, icons on one row, no
     overflow. The screenshot is still lightbox-bound (`is-zoomable`).

## Round 30 — Content currency pass before launch (2026-08-05)

180. **Four stale/ambiguous claims corrected**, all confirmed with Piyush
     rather than guessed:
     - **nbs-auth Duration**: "2+ Years (Ongoing)" → "2+ years (completed)".
       The engagement has ended.
     - **nbs-cass Timeline**: "In development (launch pending)" → a new
       **Status: "Design delivered for build"**. Piyush has left the
       organisation and doesn't know whether it shipped, so the page now
       states what *he* did rather than making a claim about the product's
       fate. The `dt` changed from Timeline to Status because the value is
       no longer a timeframe.
     - **about.html**: dropped "In my current role," (his pick of three
       options). The sentence now reads "I specialize in designing
       user-centered interfaces…" — makes no employment claim, so it can't
       go stale between roles.
     - **Home hero stat**: "8 years experience · 3 industries · 2 platforms"
       → "8 years experience · Design systems · Shipped an iOS app solo".
       He wanted to keep the 8 years and drop industry/platform counts.
       Chose the shipped-app line because it's his strongest differentiator
       and is fully grounded — Shagunly is live on the App Store and that
       case study already says "solo founder".
181. **Checked nothing else claims ongoing work**: the only remaining
     "ongoing"/"in development" strings are Shagunly's own roadmap ("Android
     in development"), its problem statement ("a real, ongoing social
     obligation") and a Show/Hide reflection sentence — all legitimate.
182. **Verified**: hero stat sits on one line down to 768px and wraps to two
     at 390/360 with no overflow and no horizontal scroll at any of
     1440/1280/768/390/360; About paragraph and both meta grids render the
     new values; zero occurrences of "current role", "Ongoing)" or "launch
     pending" left anywhere in the site.
183. **Jitter videos — instruction recorded for when they arrive**: map each
     video *visually* to the image it replaces (don't trust the Jitter export
     filename), rename it semantically to match its section, then swap
     `<img>` → `<video>`. Saved to memory alongside the existing swap notes
     (keep width/height for CLS, honour prefers-reduced-motion, and extend
     the lightbox selector since it binds to `.fig img`).

## Round 31 — Jitter videos mapped and swapped in (2026-08-05)

184. **Three videos supplied**: `Scene.mp4`, `Scene (1).mp4`, `List-16-9.mp4`.
     Mapped them **visually** rather than by filename, as instructed — no
     ffmpeg on this machine, so frames were extracted with a small Swift
     AVFoundation utility and reviewed as contact sheets.
185. **The mapping turned out to be exact, and provable twice over.** The
     three static images sitting under the round-7 TODO in nbs-auth
     "Final Solution" measured 1280x720, 1280x720 and 960x720 — the identical
     dimensions of the three clips — and visual comparison confirmed they are
     literally poster frames of them (they even carry the same watermark). So:
     - `Scene.mp4` (1280x720) → `0c9a39_0f54d527…` — three phones: choose a
       new six-digit passnumber, success confirmation, Pay or Move Money
     - `Scene (1).mp4` (960x720) → `0c9a39_bb339089…` — scrolling board of
       shipped screens incl. connection error, passnumber entry, VRP payment
       permissions, products, Face ID capture
     - `List-16-9.mp4` (1280x720) → `0c9a39_3e370f41…` — kinetic type loop of
       interaction verbs (Tap, Hover, Drag, Scroll, Long-press, Focus, Flick,
       Trigger, Rules, Feedback, Modes, States)
186. **Renamed semantically** into a new top-level `video/` folder mirroring
     `img/`: `passnumber-change-flow.mp4`, `auth-screens-walkthrough.mp4`,
     `micro-interaction-terms.mp4`.
187. **The type animation was moved to a different section.** It had been
     sitting in "Final Solution" captioned "Final UI screen — payments",
     which was wrong on both counts — it isn't a UI screen and isn't
     payments. It's a micro-interaction vocabulary, so it now illustrates
     **section 08 "Micro-Interaction — Feedback at Key Touchpoints"**, which
     previously had no image at all. Final Solution went from a 3-up grid to
     a 2-up of the two genuine screen walkthroughs.
188. **All three alt texts were wrong** and have been replaced with accurate
     `aria-label`s: "account overview" was the passnumber flow, "payments"
     was the type animation, "product hub" was the screen inventory.
189. **Transcoded for web**: 16.3MB → 5.3MB (−67%) via AVAssetExportSession
     at 960x540, `shouldOptimizeForNetworkUse` so the moov atom is at the
     front for streaming. Measured 1280x720 as an alternative — it saved
     almost nothing (List passed straight through at 7.8MB) for no visible
     gain. At 960 wide the clips render 2.08x density in the 2-up grid and
     1.02x full-width, and small UI text stays legible (checked against
     extracted frames).
190. **Posters** are the existing static webps, renamed `poster-*.webp` —
     they were already the exact right frames, so first paint is unchanged
     and there is no flash before the video decodes.
191. **Reduced motion**: `autoplay` is in the markup so clips still play
     without JS, and `js/main.js` strips it, pauses and enables controls when
     `prefers-reduced-motion` is set. Also added `.fig video` to the `.fig
     img` rule — video has no `max-width:100%` from the base reset, so
     without it the clips overflowed on mobile (caught in verification).
192. **Verified**: all three decode (readyState 4) with correct durations
     (3.63s / 3.03s / 9.03s), poster + aria-label + loop + muted + playsinline
     on each, Final Solution grid is 2-up, Micro-Interaction has its figure,
     old statics and the TODO comment gone, rail resolves, 0 broken images,
     no horizontal scroll at 1280 or 390 (350px wide each on mobile).
193. **FLAG — all three carry a `jitter.video` watermark**, bottom-right, and
     the type animation also shows "Blur Effect" and "Template — 01" template
     chrome. This is Jitter's free-plan export. It was already present in the
     static frames so it isn't new, but it is far more noticeable in motion
     and reads as unfinished on a portfolio. Worth re-exporting on a paid plan
     before the domain switch.
194. **Videos are deliberately not lightbox-bound** — the lightbox selector is
     `.fig img`, and a looping clip is self-evident without a zoom affordance.
     The three now-unreferenced statics stay on disk per convention #32.

## Round 32 — Micro-interaction video cropped (2026-08-07)

195. **Cropped `micro-interaction-terms.mp4`** to a 3.2:1 letterbox band per
     Piyush's reference frame: `x 0, y 176, 1280x400` — a **vertical crop
     only**. Confirmed the reference was uncropped horizontally by matching
     the arrow's position: 230/1280 = 18.0% in the source, ~18.1% in the
     reference screenshot.
196. **Crop derived by measurement, not eyeballing.** Sampled 24 frames and
     took the bounding box of near-white pixels (the active word is the only
     sharp, bright content): x 230..1043, y 303..505 across the whole clip.
     That fixed the safe vertical band and proved the longest word
     ("Long-press") is never clipped.
197. **Removes the Jitter free-plan chrome as a side effect** — the
     `jitter.video` watermark and the "Blur Effect" / "Template — 01" labels
     all sit below y=660, well outside the crop. Round 31's flag (#193) is
     resolved for this clip; the two NBS screen clips still carry the
     watermark and would need re-exporting on a paid plan.
198. **Encoded** with AVFoundation using an `AVMutableVideoComposition` —
     `renderSize` set to the crop, layer transform translated by the crop
     origin — at `AVAssetExportPresetHighestQuality` with
     `shouldOptimizeForNetworkUse`. 2.33MB, slightly *smaller* than the
     uncropped 540p version it replaces (2.66MB) despite the higher preset,
     because there are far fewer pixels per frame.
199. **Poster regenerated from the cropped clip** so first paint matches the
     video exactly, and the `width`/`height` attributes updated 1280x720 →
     1280x400 to keep the CLS reservation correct.
200. **Verified**: natural 1280x400, renders 938x294 full-width, attributes
     match, decodes (readyState 4), duration still 9.03s, no horizontal
     scroll. The other two clips are untouched.

## Round 33 — Custom domain live (2026-08-07)

201. **DNS switched at Wix and verified.** Apex now resolves to all four
     GitHub Pages IPs (185.199.108–111.153), `www` CNAMEs to
     `hexdzn.github.io`, and the `en.` Wix multilingual alias was removed.
     The `google-site-verification` TXT record was deliberately left intact —
     it predates the migration and is needed to submit the sitemap in Search
     Console.
202. **CNAME file committed.** GitHub stored the custom domain in Pages
     settings but did not write the file to the repo; without it in version
     control a later push can silently clear the setting. Held back until now
     on purpose (see #148) — committing it before DNS resolved would have made
     the site unreachable at both the github.io path and the custom domain.
203. All canonical, og:url, sitemap and JSON-LD URLs written back in round 25
     now resolve to a live site, so the SEO work stops being inert.

## Round 34 — Marquee loop fixed on wide displays (2026-08-07)

204. **BUG (user report): the home marquee left a gap on wide screens.** The
     track is authored as two identical copies animated to
     `translateX(-50%)`, which only loops cleanly while *half* the track is at
     least as wide as the strip. Measured: one copy is 1427px, so the loop
     broke on **any viewport wider than ~1430px** — not just large monitors.
     At 2560px the gap was 1133px of empty space; a 1512px MacBook already
     showed ~85px.
205. **Fix** in `js/main.js`: measure and append copies **two at a time**
     (keeping the count even so `-50%` still lands on a repeat boundary)
     until half the track covers the strip. Re-runs on a debounced resize.
206. **Duration is now derived, not fixed.** Appending copies with a hard-coded
     28s would have made the marquee scroll proportionally faster on bigger
     screens. The pace is pinned to the original 51 px/s by setting
     `animationDuration = halfWidth / 51`.
207. **Verified at five widths** — 390, 1280, 1512, 2560, 3440px: seamless at
     every one (gap 0), span count scaling 12 → 24 → 36 as needed, and a
     constant 51 px/s throughout.
208. The two authored copies stay in the HTML, so with JS disabled the
     marquee still loops correctly on viewports up to ~1430px.

## Round 35 — Fabricated origin line removed from Shagunly (2026-08-07)

209. **Removed an invented claim I introduced in round 15 (#95).** The
     callout "The moment that defined the product: standing at a venue,
     envelope in hand, trying to remember what they gave you three years ago"
     was written as colour and was **not true** — Piyush flagged it.
210. **Replaced with the real origin**, in his words: the idea came from his
     father, who is tech-savvy and wanted the record off paper registers and
     onto a phone — less physical copy, less friction, information
     retrievable in seconds rather than leafed through.
211. Worth noting as a process point: this is exactly the failure mode the
     original brief warned against and that round 5 (#46) pushed back on for
     invented metrics. A scene-setting sentence reads as harmless narrative
     but is a factual claim about the designer's own experience, and is
     precisely the kind of thing an interviewer will ask about.

## Round 36 — Audit for fabricated first-person claims (2026-08-07)

212. **Method**: extracted every first-person / experiential sentence from the
     migrated case studies and matched each against `content.md`, the verbatim
     Wix extraction, plus Shagunly against `~/Desktop/Shagunly-CaseStudy.md`.
213. **NBS (hub, CASS, Auth, Show/Hide) and LinkedIn came back clean.** Both
     CASS callouts — "Switching accounts carries emotional weight…" and
     "Failure handling was designed as part of the system — not an
     afterthought" — are **verbatim in the Wix source**. The one nbs-auth
     sentence flagged as not-in-source ("UX research was led by the onshore
     team; I worked closely with them…") is the round-4 grammar rewrite of
     "Since UX research was led by the onshore team, I collaborated closely
     with them to extract actionable insights" — same substance.
214. **Rapipay Outcomes contained two invented specifics — mine, from round 5
     (#47).** I had replaced the source's vague "marked improvement in user
     engagement and an increase in website traffic" with:
     - "**Stakeholders reported** the site felt more aligned with Rapipay's
       positioning…" — no source mentions stakeholder feedback at all
     - "the friction points identified in **the original audit**" — no audit
       exists anywhere in the source
     In trying to fix an unsourced claim I produced *specific-sounding*
     unsourced claims, which is worse: specificity invites the follow-up
     question. Rewritten to state only the deliverables, which are evidenced
     by the design-solution images and the objectives listed in the source.
215. **Shagunly pull-quote softened**: "Design decided in Figma. The build
     **only executed** it" → "…The build **followed the spec**." The absolute
     was not accurate — NOTES #76 and #94 record design decisions that came
     out of the build and tester feedback (the read/edit split, the
     forgot-password flow).
216. **Flagged, not changed** — "These aren't things I coded; they're things I
     had to understand well enough to direct, and to catch when the build got
     them subtly wrong" (Shagunly, Engineering Judgment). Not in the source
     doc; it's my characterisation of Piyush's experience in his voice. The
     surrounding war stories *are* his, so it's plausible — but the clause
     about catching the build getting things wrong is mine to justify, not
     his. **Piyush should confirm or reword it.**
217. **Piyush's original Wix outcome claim for Rapipay** ("marked improvement
     in engagement and traffic") is his to make and was deliberately not
     restored — round 5 chose qualitative-only. If he can stand behind it, it
     can go back; that is his call, not mine.

## Round 37 — Responsive audit, 280px to 3440px (2026-08-07)

218. **Swept all 11 pages** at 280, 320, 390, 430, 1280, 1512, 1920, 2560 and
     3440px. Distinguished *real* breakage (content past the viewport with no
     clipping ancestor) from measurement noise — `documentElement.scrollWidth`
     over-reports because the marquee's 2854px track sits inside an
     `overflow:hidden` strip, and `body { overflow-x: clip }` means no
     horizontal scrollbar is possible site-wide anyway.
219. **Bug 1 — Shagunly decision cards overflowed at 320px.**
     `repeat(auto-fit, minmax(310px, 1fr))` forces a 310px track, but the
     content column at a 320px viewport is only 280px. Fixed with
     `minmax(min(310px, 100%), 1fr)`, and applied the same guard to the other
     four fixed minimums (180/280/310/280/200px) — two of which (280px) were
     exactly on the edge and would have broken on anything narrower than
     320px. `design-kit.css` already used this pattern.
220. **Bug 2 — home project rows cut off the tag and arrow at 280px.** The
     grid was `auto 1fr auto auto`; an `auto` track cannot shrink below its
     content, so the longest tag ("iOS · Live on the App Store") pushed the
     arrow off-screen. Changed to
     `auto minmax(0, 1fr) minmax(0, auto) auto` so the title and tag can both
     shrink. No breakpoint needed — at 280/320px the longest tag now wraps to
     two lines, and at 390px and above every row is single-line exactly as
     before.
221. **Verified after both fixes**: nothing cut off on any page at any of the
     nine widths, all project-row arrows inside the viewport at every width.

## Round 38 — Decisions closed (2026-08-07)

222. **Jitter watermarks: keeping them.** Piyush's call. The `jitter.video`
     mark stays on the two NBS clips (`passnumber-change-flow`,
     `auth-screens-walkthrough`). The micro-interaction clip no longer has one
     — the round-32 crop removed it as a side effect, not by request. Flag
     #193 is closed, no action.
223. **Profile links done** — LinkedIn / Instagram / Behance now point at
     piyushgrover.com, which is what corroborates the `sameAs` block in the
     JSON-LD.
224. **`www` redirect: my earlier concern was wrong.** Round 33 reported www
     serving a 200 instead of redirecting, and I flagged possible duplicate
     content. Re-tested with `curl --resolve` against GitHub's IP directly:
     www returns `301 → https://piyushgrover.com/` from GitHub.com. The Wix
     page I had been seeing was this machine's resolver still holding the old
     `www → cdn1.wixdns.net` record under its 1-hour TTL. Nothing to fix.
225. **piyush-v2 parked.** Added a README to
     github.com/hexdzn/piyush-v2 marking it as a parked alternate direction,
     naming the live site and repo, and listing exactly how far behind its
     content is, so nothing gets copied across by mistake later. Committed
     locally; push and the GitHub "Archive" toggle are Piyush's to do.
     Note: archiving makes a repo read-only until unarchived — reversible,
     but it does block updates while archived.

## Round 39 — Designer feedback: back-nav bug + rail alignment (2026-08-07)

226. **"Broken back links" was not a link problem — every internal link and
     anchor on the site resolves.** It was the page-transition curtain. On an
     internal click the curtain animates to `scaleY(1)`, covering the viewport
     at z-index 95, then navigates. Browsers restore a bfcache page *exactly
     as it was left*, inline GSAP transform included — so pressing Back
     brought the previous page back with the curtain still down: a blank
     screen that reads as a dead link. Nothing ever reset it.
227. **Fix**: a `pageshow` listener that resets the curtain on every restore,
     plus a 3s safety timeout after a click so a stalled or cancelled
     navigation can't strand the reader behind it either. Verified: with the
     curtain forced down the page is fully covered (`wouldBlankPage: true`),
     and dispatching `pageshow {persisted:true}` returns it to `scaleY(0)`.
228. **Rail alignment bug confirmed and measured.** `body.has-rail main .wrap`
     adds the 240px rail offset — but `.pn-nav` and `.site-foot` sit **outside
     `<main>`**, so they never got it. On a case study at 1280px, article text
     began at 291px while prev/next and the footer began at 51px: a 240px step
     at the bottom of every case-study page.
229. **Second, subtler misalignment above 1320px**: `.wrap` is `max-width:
     1320px` and centred, but `.pn-nav` is full-bleed, so even after adding the
     offset they drifted apart again (356 vs 296 at 1440px). Fixed by reusing
     the rail's own centring formula —
     `max((100vw - var(--w-max)) / 2, 0px) + var(--pad-x)` — applied to the
     first child's left padding and the last child's right padding, so the
     outer edges track the content column while the inner edges still meet at
     the divider.
230. **Verified at 390 / 1100 / 1180 / 1280 / 1440 / 1920px**: content,
     prev/next and footer share one left edge at every width, and the "next"
     link's right edge matches the content's right edge. Non-rail pages
     (index) unchanged.
231. **Outstanding from the same review**: Shagunly is 2,834 words across 14
     sections (~13 min read) against 710 for the next longest case study —
     4x. The feedback that it is too verbose is quantitatively fair. Proposed
     options put to Piyush; no content cut made unilaterally.

## Round 40 — Shagunly condensed (2026-08-07)

232. **Acted on the designer feedback that the page is too verbose.** It was
     2,834 words across 14 sections against 710 for the next longest case
     study — 4x everything else on the site. Now **2,062 words across 9
     sections (-27%)**.
233. **Merges (14 -> 9):**
     - `principles` -> `process`. Two of its three bullets survived; "calm by
       default, read-only detail" was cut because it restated decision D3.
     - `product` -> `decisions`. These were the same idea twice — "here's a
       call I made and why" in two formats, 813 words combined.
     - `judgment` + `testing` -> `building`. All three were about the build;
       splitting them across three sections made the page feel longer than it
       was.
     - `next` -> `reflection`, roadmap first then the closing thought.
234. **Cuts within the merges.** The six D cards were compressed roughly 30%
     each. Of the six P cards, four survived — P1 reciprocity engine, P2
     hosted occasions, P3 family sharing/RLS, P6 privacy. Dropped P4
     (wedding-season speed, overlapping D1/D5 — its best detail, live Indian
     digit grouping, was folded into D1) and P5 (Shagun Wrapped, thin, and
     already in the roadmap). Engineering Judgment kept 3 of 5 war stories.
235. **Prose trimmed** in overview, problem, process, building and reflection.
     The redundant "a problem I understood firsthand" line went — it now
     restates the father callout added in round 35.
236. **One intended cut deliberately abandoned.** I had flagged "The home
     screen surfaces what matters first…" as a duplicated recap paragraph. It
     is not a paragraph — it's the `data-caption` text inside the device
     viewer, which swaps per screen. Deleting it would have silently broken
     the viewer's captions. Caught because the regex didn't match and I
     checked why rather than forcing it.
237. **Two scripted edits failed safely and are worth noting for next time.**
     Exact-string replacement asserted on entity encoding — the file uses
     literal curly quotes, not `&rsquo;` — and three regexes missed because
     the paragraphs contain inline `<strong>` tags. Anchoring on a distinctive
     prefix with `.*?</p>` is the reliable pattern here.
238. **Rail rebuilt from document order** and section labels renumbered
     programmatically, so nothing points at a deleted section.
239. **Verified**: 9 sections, 9/9 rail anchors resolve, 0 orphan `#` links,
     42 images with 0 broken, device viewer and its 4 captions intact, 10
     decision cards, closing grid and icon strip present, 4 App Store links
     live, no horizontal scroll at 320 / 390 / 768 / 1280 / 1920px.

## Round 41 — Layout break fixed (my bug), Shagunly trimmed further (2026-08-07)

240. **I broke the Shagunly layout in round 40.** When merging sections I
     inserted the moved blocks by appending before `</section>` — which is
     *after* `.wrap` closes. Content outside `.wrap` gets no max-width, no
     padding and no rail offset, so it rendered full-bleed from x=0 and sat
     directly on top of the fixed chapter rail. Affected the merged
     Principles block in `process` and the whole Engineering Judgment block
     in `building` (1,590 chars of text overlapping the rail).
241. **Fixed** by relocating both blocks inside the `.wrap` (the wrap closes
     at 6-space indent; everything after it was moved before it). Verified
     structurally: a parser that strips each section's `.wrap` subtree and
     checks for leftover text now reports nothing outside on any section.
242. **Lesson for future scripted merges**: inserting before `</section>`
     is wrong for this markup. Content must go before the `.wrap` closing
     `</div>`. The structural check in #241 is the way to catch it — it is
     cheap and would have caught this immediately.
243. **Shagunly trimmed again** per feedback that Building still read long:
     merged the two intro paragraphs, collapsed the three working-loop
     bullets into one, dropped two of five "what this produced" bullets (the
     backend one, and the app-icon one which the icon strip below already
     shows), and cut the third war story. Building 435 -> 317 words.
     **Page total now 1,944 words, down from 2,834 originally (-31%),
     across 9 sections instead of 14.**
244. **Full layout sweep, 22 page x width combinations** (320 and 1440px
     across all 11 pages), checking three things at once: content cut off
     past the viewport, elements colliding with the fixed rail, and dead
     rail anchors. **Zero failures.** Also confirmed on all 7 case studies at
     1440px that the rail occupies 116-316px and content starts at 356px,
     with no overlap.

## Round 42 — Prev/next columns rebalanced (2026-08-07)

245. **Round 39's alignment fix over-corrected.** I put the 240px rail offset
     on `.pn-nav a:first-child`. But the grid is `1fr 1fr` of the *full*
     element width, so padding inside a cell eats that cell's text area
     rather than shifting the split. Measured at 1440px and 2000px: "prev"
     had **308px** of text width against "next"'s **548px**, so a long title
     ("LinkedIn — Commission Calculation") wrapped to three lines beside a
     one-line title. Visibly lopsided.
246. **Fix**: move the indent from the first cell to `.pn-nav` itself, via
     `padding-inline`. The two `1fr` halves then split what *remains*, so
     both cells get identical text width, and the block's left edge still
     lands on the content column.
247. **Verified** at 390 / 1100 / 1280 / 1440 / 2000px: text widths identical
     in both cells at every width (350/350, 474/474, 437/437, 452/452), left
     edge matches the article column exactly, no horizontal scroll. Swept all
     7 case studies at 1440px — balanced, aligned, no dead anchors.
248. **One deliberate visual change**: the hover background on each half now
     stops at the content column instead of running to the page edge, because
     the padding moved to the container. Arguably tidier; flagging it as a
     change rather than an accident.
249. **Note on the wrap that remains**: "LinkedIn — Commission Calculation"
     still takes two lines at wide viewports. That is simply a long title in
     a half-width column, not a bug — it now has exactly the same room as the
     title opposite it.

## Round 43 — Shagunly cut to the bone, interactions verified (2026-08-08)

250. **Decisions rewritten per feedback ("very long and boring")**: the ten
     three-row Considered/Shipped/Why cards became **seven one-line cards**
     (607 -> 225 words). Kept: auspicious presets, relationships-as-balances,
     direction-first, calm read/deliberate edit, flipping the book, one book
     per family, privacy. Dropped as cards: D5 occasion linking (weak), D6
     visual identity (already the Design System section's story), P1
     reciprocity engine (its essence lives in the balances card).
251. **The section's physical length was mostly figures, not words**: five
     full-width exploration SVGs stacked vertically. Now four in a 2-col
     grid (dropped exp-identity with its card); the two shipped-screen
     fx-tilt shots stay as the closing pair. Page height at 1440px is down
     roughly 2,500px.
252. **Screens section**: the six-bullet list restated the device viewer's
     own captions and the decision cards below it. Replaced with a
     two-sentence intro (239 -> 157 words). Process: folded the one-paragraph
     "Research & Framing" heading away and merged the two PWA paragraphs
     (230 -> 218).
253. **Page total now 1,468 words — 48% below the original 2,834** — across
     the same 9 sections. Building (317w) is now the longest section; left
     as-is since it was trimmed in round 41 and carries the war stories.
254. **Interaction sweep, all passing**: device viewer stepped through
     phone/tablet x home/people/occasions — right image every time, the
     companion frame appears only on Occasions (2 frames) and collapses back
     to 1; lightbox opens and closes on the new grid figures; 9/9 rail
     anchors resolve; 41 images, 0 broken.
255. **Responsive sweep at 320/390/768/1180/1440/1920px**: zero cut-off
     elements, zero rail collisions; decision grid flows 1 -> 2 -> 3
     columns, exploration grid 1 -> 2. Structural check confirms all section
     content sits inside .wrap (the round-41 lesson, now a standing check).
