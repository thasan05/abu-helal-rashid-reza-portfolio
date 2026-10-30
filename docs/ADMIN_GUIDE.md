# Engr. Abu Helal Rashid Reza Portfolio — CMS Administration Guide

Welcome to the private Content Management System (CMS) for your executive portfolio website. This guide explains how to manage content, publish projects, adjust site settings, reorder sections, review consultation inquiries, and customize visual settings.

---

## 1. Accessing the Admin Panel

- **Portal URL:** `https://helal2.vercel.app/admin` (or `/admin/login`)
- **Default Username:** `admin`
- **Default Password:** `Reza@Admin2026!`
- **Session Duration:** 7 days (secured by encrypted HTTP-only session cookies).

> [!IMPORTANT]
> Keep your administrative credentials confidential. You can update credentials or add additional administrative users directly in the database `admin_users` table.

---

## 2. Navigating the CMS Modules

The administrative sidebar is organized into 4 functional groups:

### 2.1 OVERVIEW
- **Dashboard (`/admin`):**
  - Real-time statistics derived directly from the PostgreSQL database:
    - Total Landmark Projects (and published counts)
    - Active Career Roles
    - Academic & Certification Credentials
    - Publications & Thought Leadership Features
    - Media Library Asset Count & Disk Footprint (MB)
    - Unread Inbound Consultation Inquiries
  - Quick action links and the latest 8 activity audit log transactions.

### 2.2 WEBSITE CONTENT
- **General Identity (`/admin/settings`):**
  - Full Name, Honorific Prefix (Engr.), Professional Headline.
  - Current Role Title, Current Organization.
  - Direct Email, Phone Number, Location, Office Address.
  - LinkedIn Profile URL and Executive CV PDF file path.
  - Master image paths (Avatar, Hero standing portrait, Secondary reflection portrait).
  - Search Engine Optimization (SEO): Meta Title, Meta Description, Search Keywords, Canonical URL, Open Graph image.
- **Hero Monograph (`/admin/hero`):**
  - Monograph Volume (e.g. `Vol. XVII`) and Edition Year (e.g. `2026 Edition`).
  - Executive Availability Badge text.
  - Master Headline and Subheadline.
  - Primary & Secondary Call-to-Action (CTA) button labels and destinations.
  - Baseline Landmark Metrics (add, edit values, toggle publication, or delete metrics).
- **Executive Biography (`/admin/biography`):**
  - Chapter I Headline and Subheading.
  - Narrative Paragraphs (multi-paragraph editor separated by blank lines).
  - Editorial Pull Quote Statement and Attribution.
- **Career Timeline (`/admin/timeline`):**
  - Chronological Ledger of executive positions.
  - Add new roles or edit existing ones: Organization, Role Title, Tenure, Location, Current Position toggle, Verification Status, Summary, Key Responsibilities, Milestone Deliverables, and Discipline Tags.
- **Landmark Projects (`/admin/projects`):**
  - Selected Works showcase.
  - Create, edit, and reorder projects:
    - Title, Organization, Role Contribution, Category, Location.
    - Scope & Technical Specifications.
    - Flagship Masterwork toggle (sets primary hero feature, e.g. Verona 160 Katha).
    - Verified Engineering Highlights (one bullet per line).
    - Project Thumbnail image path and alt text.
    - Publication status toggle.
- **Capabilities Matrix (`/admin/expertise`):**
  - Core strategic competencies across civil engineering, corporate governance, and urban joint ventures.
  - Title, subtitle, description, and list of specific capabilities.
- **Governance Philosophy (`/admin/philosophy`):**
  - Lead operating philosophy statement.
  - Leadership Principles: Core Value, Headline, Attribution Quote, and Reflection.
- **Mentorship & Community (`/admin/mentorship`):**
  - Community leadership overview narrative.
  - Mentorship initiatives, conference keynotes (LCB, PMI), documentary photography, and impact metrics.
- **Publications & Insights (`/admin/insights`):**
  - Articles, television commentary, and published thought leadership.
  - Title, publication platform, read time, category, external link, and topic tags.
- **Academic Credentials (`/admin/credentials`):**
  - Academic Degrees (BUET, NSU), Professional Certifications (PMP®), and Institutional Memberships (IEB).
  - Institution, year, category, registration details, and badge labels.
- **Endurance & Personal (`/admin/personal`):**
  - The Discipline of Endurance overview narrative.
  - Athletic accomplishments (15K Marathon pacing, finisher medals) and personal pursuits.
- **Contact & Dialogue (`/admin/contact`):**
  - Consultation section headline and subheadline.
  - Office address and direct consultation protocol note.

### 2.3 MEDIA & INBOX
- **Media Library (`/admin/media`):**
  - Upload new images directly through the dashboard.
  - Categorize by Hero, Projects, Mentorship, Credentials, or Personal.
  - Copy relative asset paths (`/images/...`) for use in any content form.
  - Delete unused media assets.
- **Consultation Inquiries (`/admin/inquiries`):**
  - Direct inbox receiving all submissions from the website contact form.
  - View sender's full name, email, organization, nature of consultation, date/time, and complete message.
  - Mark inquiries as read or delete archived submissions.

### 2.4 SYSTEM & CUSTOMIZATION
- **Section Visibility & Order (`/admin/layout-config`):**
  - Toggle any chapter ON or OFF dynamically. Disabled chapters automatically disappear from both the live page and the navigation menu.
  - Adjust numeric sort orders to reorder sections on the homepage.
- **Visual Appearance (`/admin/appearance`):**
  - Customize the Antiquarian Gold accent color, secondary gold tone, and dark surface theme tone.
- **Activity Logs (`/admin/logs`):**
  - Immutable audit trail recording every content change, creation, deletion, or cache purge.
- **Refresh Cache Button:**
  - Located in the top header bar (`Refresh Cache`). Instantly purges and revalidates cached pages on demand.

---

## 3. How-To Common Workflows

### How to add a new Landmark Project
1. Go to **Website Content** → **Landmark Projects** (`/admin/projects`).
2. Scroll to the **Register New Project** form at the bottom.
3. Enter Project Title (e.g. `Tri-Tower Commercial LEED Complex`).
4. Select Category (e.g. `High-Rise & Commercial`).
5. Fill in Location, Organization, Role Contribution, Scope Metrics, and Highlights.
6. Enter the image path (uploaded via Media Library or from `/images/...`).
7. Check **Publish Project to Live Monograph**.
8. Click **Register Landmark Project**. The project appears immediately on the live website.

### How to change your Professional Headline or Current Role
1. Go to **Website Content** → **General Identity** (`/admin/settings`).
2. Update **Current Role Title** and **Current Organization**.
3. Update **Professional Headline** or **Sub-Headline Narrative**.
4. Click **Save Identity Settings**.

### How to hide a section temporarily
1. Go to **System & Customization** → **Section Visibility & Order** (`/admin/layout-config`).
2. Locate the section (e.g., `personal` or `insights`).
3. Toggle the switch to **Hidden**.
4. Click **Update Section Configuration**. The section is instantly hidden from visitors.

---

## 4. Technical Support & Deployment

This portfolio website is deployed on **Vercel** (`https://helal2.vercel.app`) with live database sync to **Neon Serverless PostgreSQL**. All changes made in this administrative panel persist immediately to PostgreSQL and update live visitors in real time.
