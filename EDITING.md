# Editing this site

A plain-English guide to updating piyushgrover.com without writing code.

Written for Piyush. No terminal, no software to install, no coding knowledge
assumed. If you can edit a Google Doc, you can do everything in the "Everyday
edits" section.

---

## The 30-second version

- The site is **plain HTML files**. No build step, no framework, nothing to compile.
  What you see in the repo is exactly what visitors get.
- Edit a file on **github.com**, click "Commit changes", and the live site updates
  in about a minute.
- **Nothing you do is permanent.** Every change is saved forever and can be undone.
- Repo: <https://github.com/hexdzn/piyushgrover.com>

---

## How to edit anything (the basic loop)

1. Go to <https://github.com/hexdzn/piyushgrover.com>
2. Click the file you want to change (e.g. `about.html`)
3. Click the **pencil icon** (top right of the file) — "Edit this file"
4. Make your change
5. Scroll to the bottom → **Commit changes** → **Commit changes** again
6. Wait ~1 minute, then hard-reload the site (**⌘⇧R**) to see it

That's it. That loop covers everything below.

### If you break something

Go to the repo → **Commits** (clock icon near the top) → find the commit before
your change → **⋯** → **Revert**. The site goes back to how it was, in a minute.

You genuinely cannot lose the site. Don't be precious about experimenting.

---

## Reading HTML (the only two rules you need)

Text lives **between** tags. Edit the words, leave the tags alone:

```html
<p>This text you can change.</p>
 ↑                            ↑
 leave this            leave this
```

Tags come in pairs — `<p>` opens, `</p>` closes. As long as you don't delete
the pointy-bracket bits, you can't break the page.

**Special characters:** write `&amp;` instead of `&`. Curly quotes (`'` `"`)
and em-dashes (`—`) are fine to paste directly.

---

## Everyday edits

### Change any text on a page

Find the file, find the words, change them.

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| Not Work | `playground.html` |
| Nationwide (hub) | `nbs.html` |
| CASS | `nbs-cass.html` |
| Authentication Uplift | `nbs-auth.html` |
| Show/Hide | `nbs-show-hide.html` |
| Rapipay | `rapipay.html` |
| LinkedIn | `linkedin-commission.html` |
| Shagunly | `shagunly.html` |

**Tip:** press **⌘F** in the GitHub editor to find the sentence you want.

### Update a job title, date or status

These live in the `meta-grid` block near the top of each case study:

```html
<div><dt>Role</dt><dd>Sr. Product Designer</dd></div>
<div><dt>Duration</dt><dd>2+ years (completed)</dd></div>
```

`dt` is the label, `dd` is the value. Change the `dd`.

**This is the thing most likely to go stale.** When a project ships, or you
change jobs, this is what needs updating.

### Change the page title or Google description

At the top of each file, inside `<head>`:

```html
<title>About | Piyush Grover — Portfolio</title>
<meta name="description" content="About Piyush Grover — Senior Product Designer...">
```

If you change these, **also update the three copies further down** in the same
`<head>` — `og:title`, `og:description`, `twitter:title`, `twitter:description`.
They're what show when someone shares the link on LinkedIn or WhatsApp. Use
**⌘F** for `og:title` to find them.

### Reorder or retitle the projects on the home page

In `index.html`, find `project-row`. Each project is one block:

```html
<a class="project-row" href="shagunly.html" data-preview="shagunly" data-cursor="view" data-reveal>
  <span class="num">01</span>
  <span class="p-title">Shagunly</span>
  <span class="p-tag">iOS · Live on the App Store</span>
  <span class="p-arrow">↗</span>
</a>
```

To reorder, cut and paste whole blocks, then **renumber the `num` values** so
they read 01, 02, 03, 04 down the page.

---

## Working with images

Three rules:

1. **Format: `.webp`.** Everything on the site is WebP — it's about 70% smaller
   than JPEG. Convert at <https://squoosh.app> (drag in, pick WebP, quality ~80,
   download).
2. **Width: 1600px** for anything full-width. Never upload a 4000px photo — it
   makes the page slow.
3. **Landing banners: exactly 1600 × 600.**

### Swapping an image

1. Go to the folder (e.g. `img/rapipay/`) → **Add file** → **Upload files**
2. Drag your `.webp` in → **Commit changes**
3. Edit the page's HTML and point at your new file:

```html
<img src="img/rapipay/your-new-image.webp" width="1600" height="600" alt="Describe what's in the image">
```

**Always update `width` and `height` to the real pixel size** — they stop the
page jumping around while images load.

**Always write real `alt` text** — it's what screen readers announce and what
Google reads. Describe the content, not the file ("Redesigned homepage with
device mockups", not "image1").

---

## Adding a new case study

This is the one job that isn't a five-minute edit. It touches **eight** places.
Miss one and something breaks quietly — usually the navigation or the sitemap.

If you'd rather hand this to someone: give them this section and `NOTES.md`.
That's a complete brief.

### The checklist

- [ ] **1. Create the page.** Duplicate the closest existing case study
      (`nbs-cass.html` is the simplest). Rename it, e.g. `newproject.html`.
- [ ] **2. Update everything in `<head>`** — `title`, `description`, `canonical`,
      all the `og:` and `twitter:` tags, and the `JSON-LD` block at the bottom
      of the head. Every URL must say `newproject.html`.
- [ ] **3. Write the content.** Replace the sections. Keep the existing
      structure — `cs-section`, `cs-label`, `cs-cols`.
- [ ] **4. Update the chapter rail** (`cs-rail`, near the top of `<main>`) so
      each entry matches a section `id` on the page, numbered in order.
- [ ] **5. Add it to the home page** — a new `project-row` block in
      `index.html`, and renumber the others.
- [ ] **6. Add a hover preview image** — a `1200 × 900` `.webp` in the
      `project-preview` block in `index.html`, with `data-key` matching the
      row's `data-preview`.
- [ ] **7. Fix the prev/next chain.** It's a **loop** — every page points at the
      one before and after it. Slotting a page in means editing the `pn-nav`
      block on the new page *and* on its two neighbours. Current order:

      nbs → nbs-cass → nbs-auth → nbs-show-hide → rapipay
          → linkedin-commission → shagunly → (back to nbs)

- [ ] **8. Add it to `sitemap.xml`** — copy an existing `<url>` block, change
      the `<loc>`, update `<lastmod>` to today.
- [ ] **9. Make a share image** — `1200 × 630` `.jpg` (JPEG, *not* WebP — social
      sites are unreliable with WebP) in `img/og/`, referenced by the `og:image`
      and `twitter:image` tags from step 2.

### Afterwards

- Open the page and click every chapter-rail link — they should all jump correctly
- Click prev and next, and check the two neighbouring pages point back at it
- Check it on your phone
- Paste the URL into <https://www.linkedin.com/post-inspector/> to confirm the
  share card looks right

---

## Don't touch these unless you know what you're doing

| File / folder | What it is |
|---|---|
| `css/` | All styling. One typo can break the layout site-wide. |
| `js/` | All behaviour — menu, theme toggle, lightbox, animations. |
| `vendor/`, `fonts/` | Third-party library and font files. |
| `CNAME` | Points the domain here. **Deleting it takes the site offline.** |
| `robots.txt` | Tells Google what to crawl. |
| `.nojekyll` | Stops GitHub mangling the files. Must stay. |
| `assets/` | Full-resolution originals, not used by the live site. |

`design-kit.html` is a private page — not linked from anywhere and hidden from
Google on purpose. Reach it at `/design-kit.html` if you need it.

---

## Getting help

**The site is deliberately built to be handed over.** No framework, no build
step, standard HTML/CSS/JS — any developer or AI assistant can work on it, not
just the one that built it.

If you're asking someone (or something) for help, give them:

1. The repo URL
2. `NOTES.md` — every decision made and why, in order
3. This file

That's a complete handover brief. `NOTES.md` in particular saves hours: it
records not just what was done but what was deliberately *not* done, and why.

### Useful links

- Live site — <https://piyushgrover.com>
- Repo — <https://github.com/hexdzn/piyushgrover.com>
- Deploy status — repo → **Actions** tab (green tick = live)
- Search Console — <https://search.google.com/search-console>
- Domain & DNS — Wix account → Domains
- Image compression — <https://squoosh.app>
- Share-card preview — <https://www.linkedin.com/post-inspector/>

---

## Two habits worth keeping

**Write a real commit message.** The box defaults to "Update about.html". Type
what you actually changed — "Update job title to X". In two years that's the
difference between a usable history and a wall of noise.

**Keep claims true.** The hardest thing to fix later isn't code, it's a claim
you can't back up in an interview. If a project's status changes, update it. If
you can't evidence a number, don't publish it. `NOTES.md` records a few places
where that principle was applied deliberately — it's worth a skim before adding
new copy.
