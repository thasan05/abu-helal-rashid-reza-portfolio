---
name: Abu Helal Rashid Reza Executive Portfolio
description: Architectural Monograph design system for senior construction executive leadership
colors:
  midnight-navy-deep: "#0B131F"
  midnight-navy-ground: "#101C2C"
  midnight-navy-surface: "#142236"
  midnight-navy-elevated: "#18283E"
  midnight-navy-border: "#263C5B"
  alabaster-ivory-canvas: "#FCFBF9"
  alabaster-ivory-surface: "#F7F5F0"
  alabaster-ivory-border: "#E2DDD2"
  champagne-gold-accent: "#B79A63"
  champagne-gold-light: "#CBB077"
  champagne-gold-pale: "#E0CFA8"
  champagne-gold-dark: "#9E814B"
  slate-steel-text: "#CBD5E1"
  slate-steel-muted: "#94A3B8"
  slate-steel-subtle: "#64748B"
  slate-steel-structural: "#334155"
  slate-steel-dark: "#1E293B"
  pure-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.champagne-gold-accent}"
    textColor: "{colors.midnight-navy-ground}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.champagne-gold-light}"
  button-secondary:
    backgroundColor: "{colors.midnight-navy-elevated}"
    textColor: "{colors.slate-steel-text}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  card-dark:
    backgroundColor: "{colors.midnight-navy-ground}"
    rounded: "{rounded.md}"
    padding: "24px"
  card-light:
    backgroundColor: "{colors.alabaster-ivory-surface}"
    rounded: "{rounded.md}"
    padding: "24px"
  badge-accent:
    backgroundColor: "{colors.midnight-navy-elevated}"
    textColor: "{colors.champagne-gold-pale}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  input-field:
    backgroundColor: "{colors.midnight-navy-elevated}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
---

# Design System: Abu Helal Rashid Reza Executive Portfolio

## Overview

**Creative North Star: "The Architectural Monograph"**

The design system embodies the gravitas, structural precision, and calm discipline of an international real estate investment monograph. Rather than resembling a high-churn SaaS landing page or a decorative portfolio template, every surface conveys the enduring weight of monumental physical construction and corporate stewardship. It pairs the architectural authority of structural civil engineering with the refined composure of a board-level executive suite.

The system alternates deliberately between high-contrast Deep Midnight Navy grounds (representing stability, structural foundation, and nighttime urban skyline) and Warm Alabaster/Ivory editorial canvases (evoking premium heavyweight architectural prints and analytical executive briefs). Muted Champagne Gold is deployed with surgical discipline as an executive seal of credibility and active focus, never as wanton decoration.

**Key Characteristics:**
- **Monographic Discipline:** Editorial typography pairing classical high-contrast serif headlines with razor-sharp technical sans-serif body copy.
- **Architectural Framing:** Subtle hairline borders, structural grid alignments, and tonal dark containment in place of loud gradients or floating cards.
- **Prestige Restraint:** Champagne Gold is strictly capped at ≤10% visual surface area to maintain its status as an authentic hallmark of prestige.
- **Verifiable Truth Focus:** Layouts foreground concrete metrics, certified affiliations (BUET, PMP®, NSU), and documented high-rise delivery without frivolous embellishment.

## Colors

The palette balances monolithic architectural depth with the refined warmth of archival print and restrained metallic accents.

### Primary Ground
- **Deep Midnight Navy Ground** (`#101C2C`): The normative canvas for the executive experience. Conveys structural weight, focus, and corporate permanence.
- **Midnight Navy Deep** (`#0B131F`): High-contrast background for deep footers, modal backdrops, and mobile navigation overlays.
- **Midnight Navy Surface** (`#142236` / `#18283E`): Elevated container backgrounds for interactive cards, input fields, and credential pills.

### Editorial Canvas (Alternating Sections)
- **Warm Alabaster Ivory Canvas** (`#FCFBF9` / `#FAF8F5`): Warm, human, and readable editorial backdrop for long-form biographical narratives and core leadership reflections.
- **Alabaster Ivory Surface** (`#F7F5F0` / `#EFECE3`): Contained cards and subtle dividers within light-themed chapters.

### Primary Accent
- **Muted Champagne Gold** (`#B79A63`): The executive seal. Used for primary call-to-action buttons, credential icons, active filter states, and section rule accents.
- **Champagne Gold Light** (`#CBB077`): Hover state for gold buttons and emphasized inline italic typography.
- **Champagne Gold Pale** (`#E0CFA8`): Low-intensity text color for pill badges and high-contrast dark-mode subheaders.
- **Champagne Gold Dark** (`#9E814B` / `#80673A`): Active click states and subdued borders.

### Neutral Scaffolding
- **Slate Steel Text** (`#CBD5E1`): Primary dark-mode body copy providing comfortable reading contrast.
- **Slate Steel Muted** (`#94A3B8` / `#64748B`): Secondary labels, timestamps, locations, and metadata.
- **Slate Steel Structural** (`#334155` / `#1E293B`): Hairline card borders, timeline tracks, and table rules.
- **Pure White** (`#FFFFFF`): Editorial headings and critical numerical metric values.

### Named Rules
**The Ten Percent Gold Rule.** Muted Champagne Gold must never exceed 10% of any viewport's surface area. Its rarity is what gives it prestige and focus; overuse degrades executive gravitas into commercial clutter.

**The Ground Inversion Rule.** Transitions between Midnight Navy and Warm Ivory mark structural chapter changes in the narrative (e.g., from Executive Overview to Biography). When inverting grounds, text and borders immediately invert their contrast roles without introducing intermediate pastel shades.

## Typography

**Display Font:** Playfair Display (with Georgia, serif fallback)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif fallback)

**Character:** The typographic pairing bridges classical editorial heritage with crisp contemporary engineering legibility. Playfair Display delivers deliberate, considered gravitas suited for senior leadership; Inter provides uncompromising clarity across dense technical data and mobile viewports.

### Hierarchy
- **Display** (Regular 400, `2.5rem` to `3.75rem`, line-height `1.15`, letter-spacing `-0.02em`): Used exclusively for the Hero headline and major chapter headings.
- **Headline** (Regular 400, `1.75rem` to `2.5rem`, line-height `1.2`, letter-spacing `-0.01em`): Section headings across all primary content blocks.
- **Title** (SemiBold 600, `1.125rem` to `1.375rem`, line-height `1.3`): Project names, company designations, and card titles.
- **Body** (Light 300 to Regular 400, `0.9375rem` to `1.125rem`, line-height `1.65`, max-width `65ch`–`75ch`): Executive biography narrative, project case summaries, and philosophy reflections.
- **Label / Eyebrow** (SemiBold 600, `0.6875rem` to `0.8125rem`, line-height `1.2`, letter-spacing `0.08em` to `0.1em`, uppercase): Category badges, timeline tenures, section subtitles, and metric captions.

### Named Rules
**The Structural Editorial Rule.** Serif typography (*Playfair Display*) is strictly reserved for primary headlines, section titles, and highlighted pull-quotes. All body copy, numerical data, navigation labels, and UI controls must be set in clean sans-serif (*Inter*) to ensure instant scanability.

## Layout

- **Container Model:** Centralized maximum width of `1280px` (`max-w-7xl mx-auto`) with fluid horizontal padding (`px-4 sm:px-6 lg:px-8`).
- **Spatial Grid:** 12-column asymmetric grid enabling harmonious balance between editorial portraits, narrative text, and credential highlights.
- **Vertical Cadence:** Generous rhythmic spacing between major sections (`py-16 sm:py-20 lg:py-24`, 64px to 96px) to give content breathing room befitting a monograph.
- **Mobile First Touch Adaptation:** Horizontal scroll containers with hidden scrollbars for multi-category filter chips (`overflow-x-auto no-scrollbar`) that seamlessly wrap into a multi-row flex layout on desktop screens.

## Elevation & Depth

The system rejects aggressive drop shadows, artificial 3D skewing, and thick glassy blur layers in favor of **Architectural Tonal Layering**. Depth is achieved through surface tone progression (from `#0B131F` ground up to `#18283E` surface) combined with hairline structural borders.

### Shadow Vocabulary
- **Ambient Card Grounding** (`box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4)`): Anchors prominent floating dark cards against the ground canvas.
- **Subtle Button Glow** (`box-shadow: 0 4px 14px 0 rgba(183, 154, 99, 0.2)`): Applied to primary Gold action buttons to elevate them above dark backgrounds.
- **Modal & Drawer Shadow** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)`): Isolates executive inquiry modals and the mobile navigation drawer.

### Named Rules
**The Hairline Structure Rule.** Surface boundaries must be defined primarily by 1px hairline borders (`border border-slate-800` or `border border-[#B79A63]/20`) rather than fuzzy drop shadows. Shadows serve only as ambient grounding, never as edge definitions.

## Shapes

- **Base Radii:**
  - `4px` (`rounded`): Primary and secondary action buttons, input fields, and compact credential tags. Reflects geometric architectural precision.
  - `8px` (`rounded-lg`): Standard content cards, project showcase cards, and image frames.
  - `12px` to `16px` (`rounded-xl`): Outer contact form container and modal dialogs.
  - `9999px` (`rounded-full`): Reserved exclusively for verified status badges, category filter chips, and circular portrait avatars.
- **Border Treatments:** Strict 1px hairline strokes. Decorative frames use a 2px offset translated border (`-translate-x-2 -translate-y-2`) to evoke architectural drawing guides.

## Components

### Buttons
- **Shape:** Crisp architectural radius (`4px`). Minimum touch target of `44px` height.
- **Primary:** Background `colors.champagne-gold-accent` (`#B79A63`), text `colors.midnight-navy-ground` (`#101C2C`), font weight 600, uppercase, letter-spacing `0.05em`. Hover shifts to `#CBB077` with subtle ambient lift (`translateY(-1px)`).
- **Secondary / Outlined:** Background `#18283E`, text `slate-200`, border `1px solid slate-700`. Hover shifts border to `[#B79A63]/60` and background to `#223753`.
- **Text / Link Action:** Understated text with gold icon arrow and subtle underline on hover (`underline-offset-4`).

### Filter Chips & Status Badges
- **Shape:** Full pill (`rounded-full` or `4px` micro-badge).
- **Default State:** Dark slate surface (`#18283E`), subtle border (`1px solid slate-700`), text in pale gold or muted slate.
- **Active Filter State:** Full Gold fill (`#B79A63`), deep navy text (`#101C2C`), with mild elevation shadow.

### Cards & Project Showcase Containers
- **Corner Style:** `8px` (`rounded-lg`).
- **Dark Ground:** `#101C2C` body with `#18283E` header/metadata strip and `border border-slate-800`.
- **Hover Behavior:** Subtle scale transition (`scale-102`) on imagery and border illumination from `slate-800` to `[#B79A63]/40`.
- **Internal Padding:** `20px` to `28px`.

### Inputs & Fields
- **Shape:** `4px` (`rounded`). Height `46px` to ensure comfortable interaction.
- **Default State:** Background `#18283E`, border `1px solid #334155`, text `#FFFFFF`, placeholder `#64748B`.
- **Focus State:** Border shifts cleanly to `#B79A63` with zero ring distortion (`focus:outline-none focus:border-[#B79A63]`).

### Navigation
- **Desktop Bar:** Fixed header with smooth transition on scroll to `bg-[#101C2C]/95` with `backdrop-blur-md` and hairline gold bottom border (`border-[#B79A63]/20`).
- **Mobile Navigation:** High-impact full-screen drawer with backdrop blur, locked body scroll, and oversized editorial navigation links.

### Signature Component: Career Timeline Node
- **Track & Indicator:** Continuous `2px` vertical slate rail (`border-slate-800`) punctuated by `16px` circular nodes. Active/current role features a solid Gold node surrounded by a pulsing `ring-4 ring-[#B79A63]/30`.
- **Expandable Role Card:** Interactive role summary with collapsible key achievements, verified documentation badge, and metadata pills.

## Do's and Don'ts

### Do:
- **Do** maintain the 10% limit on Muted Champagne Gold across all pages and components.
- **Do** preserve 1px hairline borders to establish crisp architectural boundaries.
- **Do** pair Playfair Display for editorial headlines with Inter for all body and tabular data.
- **Do** ensure all interactive buttons and inputs meet the 44px minimum touch target height.
- **Do** use authentic project photographs and verified metrics directly from content source of truth.

### Don't:
- **Don't** use multi-color rainbow badges, bright neon accents, or unconstrained gradients.
- **Don't** use arbitrary percentage bars (e.g. "AutoCAD 90%", "Leadership 95%") to describe competencies; express capabilities through verified projects and achievements.
- **Don't** apply Playfair Display to buttons, navigation menus, labels, or multi-paragraph body text.
- **Don't** use bubbly rounded card radii (>16px) or heavy cartoonish drop shadows.
- **Don't** invent speculative claims, fictional corporate partnerships, or unverified project sizes.
