# piyushgrover.com — Extracted Content (verbatim)

Extracted 2026-07-02 from the live Wix site (piyushgrover.com) for the like-for-like
migration. Text is verbatim from the live pages. Editorial annotations are in
`[square brackets — annotation]` and are NOT site copy. See NOTES.md for
discrepancies and decisions.

Site map (live):
- `/` Home
- `/blank-3` About
- `/blank-2` Playground
- `/nbs` Nationwide Building Society (case study hub)
- `/blank-1-2` NBS — CASS (Current Account Switch Service)
- `/blank-1` NBS — Authentication Uplift
- `/blank-7` NBS — Show/Hide & Re-Order Accounts
- `/blank-5` LinkedIn — Commission Calculation Tool
- `/rapipay` Rapipay
- `/blank-6` Kisan Mitr `[excluded from rebuild per brief]`
- `/blog` Blog `[empty "Check back soon" placeholder — excluded as Wix artifact]`

Global navigation: Home · About · Playground
Footer: "Piyush Grover" / "Made with Love ❤️" / Home · About · Contact /
Instagram · LinkedIn · Behance

Social links:
- LinkedIn: https://www.linkedin.com/in/piyushgroverdzn/
- Instagram: https://www.instagram.com/piyushgrover_/
- Behance: https://www.behance.net/piyushgrover
- Contact: `[no link target on live site — dead footer item, needs a destination]`

---

## Home (`/`)

**Page title:** Home | Piyush Portfolio

> Piyush Grover

> Designing Fluid and Functional Interfaces

> LinkedIn `[hero CTA button]`

**LATEST PROJECTS**

1. Nationwide Building Society
2. Rapipay
3. LinkedIn- Commission Calculation
4. Kisan Mitr `[excluded from rebuild per brief]`

`[Note: the "8 years experience · 3 industries · 2 platforms" stat line and the
"Senior Interaction Designer — fintech, banking & enterprise product" positioning
line from the brief do NOT appear anywhere on the live site. Flagged in NOTES.md.]`

**Assets:** `assets/home/` (project thumbnails), `assets/shared/Memoji1.webp` (logo/avatar)

---

## About (`/blank-3`)

**Page title:** About | Piyush Portfolio

### About Piyush

Hi, I'm a Senior User Experience Designer with 7 years of experience crafting
intuitive and visually engaging digital experiences. In my current role, I
specialize in designing user-centered interfaces that balance aesthetics with
seamless usability. With a deep understanding of user behavior and evolving
industry trends, I create solutions that enhance accessibility and engagement.

Beyond design, my passion for photography sharpens my eye for detail and
composition, influencing my creative approach. I also have a keen interest in
technology, staying up-to-date with the latest advancements to incorporate
innovative solutions into my work. This blend of design expertise, creativity,
and curiosity helps me build meaningful digital experiences that leave an impact.

`[Note: live site says "7 years", brief says 8. Live site has no experience
timeline, skills list, or company names (Accenture/IBM/HCLTech). Flagged in NOTES.md.]`

**Assets:** `assets/about/IMG_5889_HEIC.png` (portrait photo)

---

## Nationwide Building Society — hub (`/nbs`)

**Page title:** NBS Home | Piyush Portfolio

# Nationwide Building Society
Industry- Banking

View Case Studies →

## Designing Core Banking Experiences for 16M+ Members

Sole Interaction Designer embedded across multiple squads at Nationwide Building
Society, designing regulated digital banking experiences used by 16M+ members,
over a 3+ year engagement via IBM

### My Contribution Across Value Streams - Case Studies

**CASS- Current Account Switch Service**
Redesigning a regulated 7-day account switching journey.
→ View Case Study

**Authentication Uplift**
Balancing security compliance with frictionless login experiences.
→ View Case Study

**Show/Hide & Re-Order Accounts**
Enhancing account personalization and content control.
→ View Case Study

### Working Model & Environment

All design work was delivered within a phased, agile delivery model with regular
compliance and regulatory review checkpoints.

**Operating in a Regulated, Distributed Environment**
- Worked within cross-location teams (India + UK stakeholders)
- Collaborated with Product Owners, Business Analysts, Engineers
- Navigated regulatory reviews and compliance checkpoints
- Designed within phased delivery

**Assets:** `assets/nbs/`

---

## NBS — CASS (`/blank-1-2`)

**Page title:** NBS-CASS | Piyush Portfolio

# Re-Architecting a Regulated Switching Journey for Mobile

Transforming a dense desktop CASS flow into a cognitively lighter, mobile-first
interaction architecture without changing regulatory structure.

### Project Overview
- Role: Product Designer
- Timeline: In development (launch pending)
- Tools: Figma, Miro
- Team Setup: Product Manager, BA, Engineering, Design System (NEL), Content

### Strategic Framing - Designing for Reuse, Compliance & Scale

Before design began, stakeholders raised foundational questions:
- How can this journey be reusable across Internet Banking and Mobile?
- How can we leverage existing CASS APIs?
- Where should switch initiation live in the app?
- How should unhappy paths be surfaced?
- How do we ensure accessibility compliance?

This reframed the project from a mobile migration to a cross-channel architecture
initiative. My role was to translate these platform-level concerns into a scalable
interaction system.

### Existing System Analysis - Understanding the Structural Baseline

The Internet Banking CASS journey consisted of 4–5 steps. However, each step
clustered multiple unrelated inputs on a single page.

Challenges identified:
- High information density
- Mixed categories within single screens
- Cognitive overload
- Limited mobile adaptability
- Implicit differentiation between Full vs Partial switch

While compliant, the structure was not optimized for mobile interaction patterns.

### Behavioral & Process Insight - Mapping Emotional and Operational Friction

We reviewed:
- As-Is Journey Mapping (Bangalore workshop)
- Empathy mapping artifacts
- User story & persona created using the IBM ICA tool to accelerate discussion

Key insight: Switching accounts carries emotional weight — users seek clarity,
reassurance, and control.

This validated the need for:
- Explicit switch-type differentiation
- Clear sequencing
- Strong confirmation states
- Reduced cognitive stacking

### Market & Pattern Benchmarking - Understanding Switching Design Patterns

A competitor review helped identify:
- Step structuring approaches
- How reassurance is surfaced
- How progress indicators are handled
- Error-state communication strategies

This informed decisions around sequencing and clarity without overcomplicating
the regulated structure.

### Interaction Architecture Redesign

**From Dense Pages to Single-Intent Screens**

Instead of compressing steps, the mobile strategy decomposed them.

Internet Banking:
- Fewer steps
- More information per screen

Mobile:
- One primary question per screen
- Logical sequencing
- Progressive disclosure
- Clear branching between Full and Partial switch

This reduced cognitive load while maintaining backend compatibility.

**Wayfinding Without Breaking Compliance**

A key debate centered around the progress indicator.

Options considered:
- Dynamic step adaptation based on branch logic
- Retaining fixed regulatory structure

Final decision:
- Maintain regulatory step structure
- Simplify sequencing clarity
- Reduce visual noise

This balanced usability improvements with system constraints.

**Structuring Unhappy Paths**

We explored how failed or incomplete switches should be surfaced.

Considerations included:
- Clear status communication
- Error state messaging
- Recovery pathways
- Maintaining user trust even during rejection

Failure handling was designed as part of the system — not an afterthought.

### Feature Spotlight: Digital Cheque Deposit (POC)

Goal: Enable users to deposit cheques digitally via the mobile app

UI/UX Considerations:
- Simple step-by-step capture process
- Clear confirmation and receipt post-deposit
- Help icons and microcopy to guide users unfamiliar with digital cheque deposits
- Mobile camera permissions and image quality indicators for clarity

Stakeholder Feedback: The feature was well received internally and appreciated
for its potential to reduce reliance on branch visits and manual processing.

`[Live site literally shows "[Placeholder for visuals: Wireframes and final
screens of cheque deposit flow]" — Wix-era unfinished content. This same
"Feature Spotlight" block is duplicated across all three NBS case-study pages.
See NOTES.md.]`

**Assets:** `assets/nbs-cass/`

---

## NBS — Authentication Uplift (`/blank-1`)

**Page title:** NBS-Auth Uplift | Piyush Portfolio

# From Card Readers to Face ID: Reinventing Secure Banking

Reducing login friction and simplifying everyday banking through biometric
authentication and streamlined information architecture.

### Project Overview
- Client: Nationwide Building Society
- Role: Sr. UI/UX Designer
- Duration: 2+ Years (Ongoing)
- Tools: Figma, Miro
- Team Setup: Collaborated with on-shore design team; worked individually and as
  part of cross-functional teams across value streams.

### Design Brief

Nationwide's mobile banking app, used by millions of UK customers, was
experiencing friction due to outdated authentication methods and scattered
navigation patterns. Users had to rely on hardware card readers for critical
tasks like transfers, leading to delays and dissatisfaction. As the bank moved
towards modernizing its digital infrastructure, our task was to redesign the
mobile banking experience to be seamless, secure, and efficient, empowering
customers with intuitive interactions and smarter workflows.

### Problem

Customers were frustrated by an outdated login process, especially when quick
access was needed for tasks like checking balances or transferring funds. The
lack of biometric authentication and a fragmented information hierarchy made
everyday banking cumbersome. While the legacy UI adhered to baseline
accessibility standards, it still posed usability challenges for older customers
and those with visual impairments particularly around contrast, type sizing, and
content discoverability.

### Hypothesis

We hypothesized that redesigning the mobile app with a streamlined IA, integrated
biometric authentication, and a component-driven design system would:
- Reduce user drop-offs during login and transaction flows by 30–40%
- Improve time-to-task completion for core actions like "view balance" or "make a payment"
- Enhance user trust through consistency, accessibility, and modern UI patterns

### Research Approach

Since UX research was led by the onshore team, I collaborated closely with them
to extract actionable insights. This included:
- Supported the onshore research team by translating key research findings into
  actionable UI design decisions, particularly around login friction, content
  discoverability, and mobile-first interactions
- Studying competitor apps for patterns in biometrics, cardless transactions, and dashboards

### Competitor Analysis

We reviewed mobile banking apps from top UK and global financial institutions,
focusing on authentication flows, navigation models, and product discoverability.

Key takeaways included:
- Most modern apps prominently featured Face ID or fingerprint login with fallback options.
- Competitors like Monzo and Revolut offered simplified dashboards with upfront
  access to balances and transactions.
- Quick-access shortcuts (like recent payees or 'Send again') were standard in
  most payment flows.
- Financial products were grouped under a single hub, avoiding deep navigation trees.

### Key Insights

- Biometric demand was high. Users wanted Face ID or fingerprint login to avoid
  using card readers.
- Account information was scattered. Users had difficulty accessing summary views
  or toggling between accounts.
- Navigation was unintuitive. Important features like savings goals or passcode
  updates were buried under layers.

### Goals

- Reduce login friction by integrating Face ID and fingerprint authentication,
  allowing users to skip card reader steps and access the app more efficiently.
- Improve discoverability by restructuring product and account navigation, making
  it easier to find key financial tools and insights.
- Create a component-driven design using scalable UI elements for consistency
  across features and smoother developer collaboration.

### Design Process

**Component-Driven UI System**
- Designed reusable components (cards, toggles, summary views, modals)
- Proposed inclusion into the design system to ensure scalability across teams

**Mobile-First Patterns**
- Focused on thumb-reach zones and tap target sizes
- Applied progressive disclosure in features like mortgage applications

`[Live site runs "...across teamsMobile-First Patterns" together — missing line
break, clear Wix artifact, split here as intended.]`

**Components** `[image section]`

### User Persona

**James Connor**
- Age: 34
- Occupation: Digital Marketing Manager
- Location: Manchester, UK
- Goals: Access accounts quickly with Face ID; consolidate account tracking
- Pain Points: Frustrated by old passcode logins; navigation feels slow
- Traits: Daily app user, prefers minimal-step flows and personalization

**Mary Thompson**
- Age: 55
- Occupation: Teacher
- Location: Leeds, UK
- Goals: View pension and savings easily; complete tasks without help
- Pain Points: Struggles with multi-step flows and small UI text
- Traits: Uses tablet, values clarity and accessibility

### User Journey `[image section]`

### Micro-Interaction

To enhance user feedback and system clarity, I created micro-interactions for key
touchpoints like biometric login, error states, and payment confirmations.

These subtle animations helped:
- Reinforce success and error cues
- Guide user attention through state changes
- Improve perceived responsiveness of the interface

### Final Solution `[image section]`

### Feature Enhancements: Show/Hide and Reorder Accounts

Introduced customization options allowing users to hide selected accounts from
the dashboard and reorder accounts by priority. These features improved
personalization, reduced clutter, and increased user satisfaction. The design
leveraged new and existing components with accessibility considerations, informed
by user research and ongoing collaboration with the project manager and UX
researcher.

Read More `[links to Show/Hide case study]`

### Feature Spotlight: Digital Cheque Deposit (POC)

`[Same duplicated block as on CASS page — see NOTES.md.]`

**Assets:** `assets/nbs-auth/`

---

## NBS — Show/Hide & Re-Order Accounts (`/blank-7`)

**Page title:** NBS- Show & Hide | Piyush Portfolio

`[Wix artifact: this page's hero repeats the CASS heading "Re-Architecting a
Regulated Switching Journey for Mobile" + its subtitle — clearly left over from
page duplication in Wix. The NBS hub calls this case study "Show/Hide & Re-Order
Accounts — Enhancing account personalization and content control." See NOTES.md.]`

### Design Brief

Following the comprehensive redesign of Nationwide's mobile banking app to
modernize authentication and navigation, the introduction of two new features —
Account Show/Hide and Account Reorder — aimed to empower users to customize their
dashboard experience on the homepage. These features enable users to hide less
active accounts from their dashboard and reorder accounts to their preference for
easier access.

### Client Motivation

The client identified an opportunity to enhance user satisfaction by providing
personalization options that allow users to control what accounts they see and in
what order, streamlining their interaction with the app and reducing cognitive load.

### Target Users

The feature targeted a broad demographic of banking app users aged 18 to 80 who
actively use current and savings accounts. The intent was to appeal equally
across gender and user proficiency levels while considering typical banking app
usage patterns.

### Research Insights

User testing revealed challenges in account discoverability, with average task
completion times of 2 minutes 40 seconds to find accounts. Savings accounts were
most commonly hidden by users to avoid temptation for spending. However, users
initially misunderstood that reordering accounts affected category headings,
highlighting areas for improved UI clarity. Confirmation screens indicating
progress (e.g., "A of B") were well understood.

### Feature Spotlight: Digital Cheque Deposit (POC)

`[Same duplicated block as on CASS page — see NOTES.md.]`

### Collaboration

The design process involved frequent standup meetings with the project manager
and close collaboration with an onshore UX researcher. As the sole designer
working on the feature, this enabled maintaining a consistent vision and rapid
iteration through continuous feedback and teamwork.

### Key Solutions

- Implemented toggles for show/hide functionality on accounts directly from the dashboard
- Enabled drag-and-drop or menu-based reorder of accounts to prioritize those most relevant
- Added microcopy and confirmation states to reinforce user actions
- Proposed inclusion of 'More options' icons and tooltips to enhance
  discoverability and guide users through new functionality

### Outcomes

While quantitative metrics are still emerging, initial feedback indicates
increased customer satisfaction due to the ability to personalize the app
interface, reducing frustration and improving task efficiency.

### Future Considerations

This experience reinforces the value of ongoing user engagement and iterative
enhancements in enhancing personalization within banking apps. Future projects
will continue prioritizing usability, customization, and accessibility to meet
diverse user needs.

### Explorations `[image section]`

### Final UI `[image section]`

**Assets:** `assets/nbs-show-hide/`

---

## LinkedIn — Commission Calculation Tool (`/blank-5`)

**Page title:** Linkedin Commission Calculation | Piyush Portfolio

# Internal Commission Tool for LinkedIn Sales Teams
Industry- Technology

### Project Overview
- Client: LinekdIn Internal Tool `[sic — typo on live site, see NOTES.md]`
- Role: Sole UI/UX Designer
- Duration: ~2 months (2022)
- Tools: Figma
- Team Setup: Worked independently with direct collaboration with product
  managers and senior leadership

### Project Background

LinkedIn's sales teams were struggling with a fragmented commission calculation
process that pulled data from multiple sources including HR systems and
compensation databases. Sales representatives and leadership needed a centralized
platform to accurately track performance metrics and manage team compensation
plans, but the existing system was cluttered and inefficient.

### Project Goals

- De-clutter and simplify the landing page for ease of navigation
- Enable seamless creation and management of new teams and their members
- Assign and manage roles efficiently within the platform
- Ensure data visibility and interaction were intuitive and accurate for sales operations

### Key Contributions

- Redesigned the landing page with a clear visual hierarchy to present key
  performance data upfront
- Introduced new functionality to create, edit, and manage teams and team members
- Created streamlined forms to assign roles within teams, with intuitive
  dropdowns and auto-complete features
- Worked closely with senior leadership to align design with strategic business goals
- Delivered all designs and handoffs in Figma

### UX & UI Considerations

Since I was the only designer on the project, I focused on:
- Keeping the interface minimal and clean to reduce cognitive load
- Ensuring consistent use of spacing, typography, and iconography for a cohesive experience
- Prioritizing data legibility and readability (e.g., tables with sticky headers,
  collapsible filters)
- Including inline feedback for actions (like role assignments and team updates)
- Adopting intuitive flows for user management without deep navigation

### Collaboration & Process

- Worked independently, but in close coordination with the product manager and
  senior stakeholders
- Participated in regular design reviews and incorporated iterative feedback from leadership
- Maintained version control in Figma and documented design rationale for smooth
  developer handoff

### Outcome & Feedback

- The redesigned landing experience was praised for its clarity and professionalism
- New team management flows improved operational efficiency and reduced reliance
  on manual processes
- Leadership commended the design for aligning with internal branding and
  enhancing user trust
- The project was completed within scope and helped set a foundation for future
  enhancements

### Existing screen `[image section]`

### Redesigned screens `[image section]`

**Assets:** `assets/linkedin-commission/`

---

## Rapipay (`/rapipay`)

**Page title:** Rapipay | Piyush Portfolio

# Rapipay
Industry- Neo Banking

### My Role

As the Lead Product Designer, I was responsible for:
- Redesigning the website to improve accessibility, responsiveness, and overall usability.
- Solving for low user engagement and poor traffic performance.
- Integrating modern UI patterns such as bold typography, 3D illustrations, and
  an elevated visual language to align with contemporary digital aesthetics.

### Problem Statement

- Lack of user engagement (low website traffic)
- Limited responsiveness across devices
- Poor user experience due to complex navigation or outdated design elements

### Objectives

- Enhance the website's accessibility and responsiveness to improve user experience.
- Increase site traffic by aligning the design with current UX trends.

### Design Process `[image section]`

### Challenges

- Aligning design trends with usability and functionality.
- Managing stakeholder expectations while adhering to project timelines.

### Tools used
- Figma
- Photoshop

### Outcomes

The redesign led to a marked improvement in user engagement and an increase in
website traffic, demonstrating the effectiveness of the updated information
architecture and contemporary visual design elements.

### Information Architecture `[image section]`

### UI Explorations `[image section]`

### Design Solution `[image section]`

**Assets:** `assets/rapipay/`

---

## Playground (`/blank-2`)

**Page title:** Playground | Piyush Portfolio

# Beyond the 9-to-5

Sections (image galleries):
- #36daysoftype
- Generative Art
- Photography

`[~40 gallery images downloaded to assets/playground/ — Wix filenames are opaque
IDs, so which image belongs to which of the three galleries needs visual sorting
during the build. See NOTES.md.]`

**Assets:** `assets/playground/`

---

## Excluded pages

- **Kisan Mitr (`/blank-6`)** — excluded per brief (academic project).
- **Blog (`/blog`)** — live page is an empty Wix placeholder ("Check back soon /
  Once posts are published, you'll see them here."). Excluded as a Wix artifact.
