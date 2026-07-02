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
