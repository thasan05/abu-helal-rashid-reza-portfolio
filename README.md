# Executive Portfolio — Engr. Abu Helal Rashid Reza
> **General Manager (Construction) & Project Director | BUET Civil Engineer | PMP®**

An editorial-quality, world-class personal executive headquarters designed and engineered for **Abu Helal Rashid Reza**, a senior leader in Bangladesh's real estate, construction, and infrastructure sectors.

---

## 1. Executive Summary & Design System

This website departs from generic developer/freelance templates to embody the visual discipline of an international real estate investment firm, a high-end architectural editorial, and a McKinsey-style corporate profile.

### Core Visual Palette
- **Midnight Navy (`#101C2C`, `#0B131F`)**: High-impact backgrounds conveying stability, authority, and architectural weight.
- **Warm Ivory / Alabaster (`#FAF8F5`, `#F7F5F0`)**: Editorial canvas providing warmth and high legibility for analytical narratives.
- **Muted Champagne Gold (`#B79A63`, `#CBB077`)**: Restrained executive accent used for rules, key credentials, and active focus points.
- **Slate Grey (`#667085`, `#334155`)**: Architectural structural typography and metadata.
- **Pure White (`#FFFFFF`)**: Crisp clarity for text and card containers.

### Typography Hierarchy
- **Serif Headings**: *Playfair Display* (Editorial gravitas, balance, and classical dignity).
- **Body & Technical Sans**: *Inter* (Crisp, clean legibility across mobile and high-DPI displays).

---

## 2. Implemented Sections & Architecture

The website provides a seamless, single-page responsive executive experience:

| Section | Component | Purpose & Verified Focus |
|---|---|---|
| **Sticky Navigation** | `Navbar.tsx` | Wordmark, quick section jumps, CV download, and "Let's Connect" action with responsive mobile drawer. |
| **Hero Experience** | `Hero.tsx` | Asymmetric 2-column layout with authentic portrait, current designation at Edison Real Estate, key credentials, and verified metrics. |
| **Executive Biography** | `ExecutiveIntroduction.tsx` | *"Leadership Grounded in Experience"* — Editorial narrative bridging BUET civil engineering foundations, C-suite operations, and team stewardship. |
| **Career Journey** | `CareerTimeline.tsx` | 17-year verified chronological timeline (Edison Real Estate, Rangs Properties COO, AWR Developments COO, VOLUMEZERO, Apan Builders) with expandable responsibilities. |
| **Strategic Expertise** | `ExpertiseGrid.tsx` | 8-card grid of core competencies (no arbitrary percentage bars; grounded in verified practice). |
| **Selected Projects & Impact** | `ProfessionalImpact.tsx` | Verified portfolio showcase: Verona Condominium (160 Katha), Simple Tree Anarkali (18-Story LEED tower), Jolshiri master plans, BNS Sher-E-Bangla naval base, Army Officers' Club, and CoxDA towers. |
| **Leadership Philosophy** | `LeadershipPhilosophy.tsx` | Core tenets reflecting ethical governance, technical stewardship, empathy, sustainable urbanism, and discipline. |
| **Mentorship & Community** | `Mentorship.tsx` | Photographic showcase of verified community leadership with LinkedIn Community Bangladesh (LCB, 24,000+ impacted) and PMI Bangladesh Chapter. |
| **Publications & Insights** | `InsightsGrid.tsx` | Editorial article cards and televised commentary (Channel i structural safety/disaster management, InCAP, LCB series). |
| **Education & Credentials** | `Credentials.tsx` | Verified degrees (BUET B.Sc. Civil '08, NSU EMBA '24, Notre Dame College '03) and PMP® licensure. |
| **Personal Dimension** | `PersonalDimension.tsx` | Authentic athletic endurance (15K Marathon Finisher — Bib #75767), reading, and daily physical discipline. |
| **Executive Contact** | `ContactSection.tsx` | Multi-channel communication: direct LinkedIn, official email (`adit.eng@gmail.com`), phone, and an interactive inquiry form with automated mailto fallback. |
| **Executive Footer** | `Footer.tsx` | Brand recap, sitemap, authenticity pledge, copyright, and smooth back-to-top navigation. |

---

## 3. Centralized Content Configuration

All public texts, career titles, projects, metrics, and assets are centralized in:
`src/data/content.ts`

Any future promotion, board appointment, new publication, or updated project can be modified in this single typed file without altering UI layout components.

---

## 4. Authentic Visual Assets Supplied

All 16 authentic high-resolution images provided in the workspace have been organized into `public/images/`:
- `reza-portrait-standing.jpg` — Official executive studio portrait in tailored pinstripe suit.
- `reza-headshot.jpg` — Studio close-up headshot for avatar and metadata.
- `reza-window-reflection.jpg` — High-rise executive office window portrait.
- `reza-desk-corporate.jpg` & `reza-desk-pen.jpg` — Corporate desk executive photography.
- `reza-site-coaching.jpg` — Active site engineering session with engineering teams.
- `reza-verona-team.jpg` — Verona Condominium engineering site team with Edison branding.
- `reza-pmi-speaker.jpg` — Keynote speaker at PMI Bangladesh Chapter engagement series.
- `reza-lcb-panel.jpg`, `reza-lcb-award.jpg`, `reza-lcb-honor.jpg`, `reza-lcb-community.jpg` — LinkedIn Community Bangladesh (LCB) stage speaking, awards, and community.
- `reza-mentoring-youth.jpg` — Youth mentorship and career coaching.
- `reza-marathon-run.jpg` & `reza-marathon-finisher.jpg` — Inspiring Bangladesh 15K Marathon run (Bib #75767).
- `public/docs/Abu_Helal_Rashid_Reza_Executive_Resume.pdf` — Original official executive resume available for direct download.

---

## 5. Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React + Inline SVGs
- **SEO & Structured Data**: JSON-LD Person schema, OpenGraph tags, dynamic `sitemap.xml`, and `robots.txt`
- **Linting & Type Safety**: ESLint 9 (0 errors, 0 warnings)

---

## 6. Local Setup & Development

To run the project locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser:
# http://localhost:3000
```

### Production Build & Verification

```bash
# Compile and optimize production build
npm run build

# Run lint checks
npm run lint

# Start optimized production server
npm run start
```

---

## 7. Deployment Instructions (Vercel)

This application is ready for 1-click deployment on [Vercel](https://vercel.com):

1. **Push Code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete executive portfolio for Engr. Abu Helal Rashid Reza"
   git remote add origin https://github.com/<your-username>/abu-helal-rashid-reza-portfolio.git
   git push -u origin main
   ```
2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your repository.
   - Framework preset: `Next.js` (automatically detected).
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Domain Configuration**:
   - In Vercel Project Settings &rarr; Domains, attach `abuhelalrashidreza.com` (or preferred custom domain).

---

## 8. Pre-Publication Checklist for Engr. Abu Helal Rashid Reza

Before connecting to a public domain, please review the following items in `src/data/content.ts`:

- [ ] **Current Designation Confirmation**: Confirm whether "General Manager (Construction) & Project Director (Verona Condominium)" at Edison Real Estate Limited is your exact preferred title for public media.
- [ ] **Public Contact Channels**: Verify if `adit.eng@gmail.com` and `+880 1781 735095` are preferred for public inquiries, or if an executive assistant / corporate address is desired.
- [ ] **Project Categorization**: Review the 8 highlighted showcase projects to confirm whether additional recent developments should be featured.
- [ ] **Custom Domain**: Confirm final chosen domain name (e.g., `abuhelalrashidreza.com` or `engr-reza.com`).
