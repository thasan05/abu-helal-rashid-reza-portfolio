# Reza Portfolio CMS — System Architecture & Technical Specification

## 1. Executive Summary

This document specifies the technical architecture, security governance, database schema, data access layer, and deployment model for the custom, independent Content Management System (CMS) engineered exclusively for **Engr. Abu Helal Rashid Reza's Personal Executive Portfolio**.

The CMS empowers Engr. Reza and authorized administrators to manage every piece of content—from executive biography, landmark projects, career timeline, and capabilities matrix to theme tokens, section visibility, and media assets—without touching source code or invoking engineering intervention.

---

## 2. Technology Stack

- **Framework:** Next.js 16.4.3 (App Router with Turbopack & React 19)
- **Database:** Serverless PostgreSQL via Neon (`@neondatabase/serverless`)
- **Connection Strategy:** HTTP/WebSocket connection pooling (`@neondatabase/serverless`) preventing serverless connection exhaustion.
- **Authentication & Security:** 
  - Password hashing: `bcryptjs` (Blowfish-based adaptive hashing)
  - Administrative session management: Encrypted JSON Web Tokens (JWT) using `jose` (`SignJWT` / `jwtVerify`, HS256 algorithm)
  - Cookie Security: `httpOnly: true`, `secure: true` in production, `sameSite: "lax"`, scoped to `/` with 7-day TTL.
- **Styling & Design System:** Tailwind CSS v4 with bespoke Architectural Monograph design tokens:
  - Surface: Midnight (`#070C14`), Card Surface (`#0B121E`, `#142236`), Paper Ivory (`#FCFBF9`)
  - Accent: Antiquarian Gold (`#B79A63`), Warm Brass (`#CBB077`), Pale Champagne (`#E0CFA8`)
  - Typography: Playfair Display (editorial headings) & Inter (structural monospaced / tabular body)
- **Hosting & Edge Delivery:** Vercel Production Infrastructure (`helal2.vercel.app`)

---

## 3. Database Architecture (Neon PostgreSQL)

The database schema is organized into 23 normalized tables with relational integrity, typed enum constraints, indexes on sort orders, and audit triggers.

```mermaid
erDiagram
    admin_users ||--o{ activity_logs : "performed_by"
    site_settings {
        string id PK
        string full_name
        string honorific_prefix
        string current_role_title
        string current_company
        string email
        string phone
        string hero_image_path
        timestamp updated_at
    }
    career_roles {
        string id PK
        string organization
        string role_title
        string tenure
        boolean is_current
        jsonb responsibilities
        jsonb key_achievements
        int sort_order
        boolean is_published
    }
    projects {
        string id PK
        string title
        string organization
        string category
        boolean is_flagship
        string image_url
        jsonb verified_highlights
        int sort_order
        boolean is_published
    }
    credential_items {
        string id PK
        string title
        string issuer_institution
        string category
        int sort_order
        boolean is_published
    }
    contact_inquiries {
        serial id PK
        string name
        string email
        string subject
        text message
        boolean is_read
        timestamp created_at
    }
    activity_logs {
        serial id PK
        string action
        string entity_type
        string entity_id
        text details
        string performed_by
        timestamp created_at
    }
```

### Table Directory

1. **`site_settings`**: Global personal identity, honorifics, titles, contact endpoints, and master image paths.
2. **`seo_settings`**: Meta title, description, keywords array, canonical URL, and Open Graph share image.
3. **`hero_settings`**: Monograph volume, edition year, availability status, master headline, subheadline, and primary/secondary CTA configurations.
4. **`headline_metrics`**: High-impact editorial numbers (e.g., 17+ Years, 160 Katha, 24,000+ Engineers) with order and publishing status.
5. **`executive_intro`**: Chapter I executive biography paragraphs, pull quote statements, and attribution.
6. **`career_roles`**: Detailed executive progression ledger with tenure, location, responsibilities, and achievements.
7. **`projects`**: Landmark real estate developments with scope metrics, verified highlights, flagship flags, and categories.
8. **`expertise_areas`**: Operational domains, architectural capabilities, and competency tags.
9. **`leadership_philosophy`**: Chapter V governance manifesto lead statement.
10. **`leadership_principles`**: Operating tenets, core values, quotations, and governance reflections.
11. **`mentorship_settings`**: Community leadership overview and chapter introduction.
12. **`mentorship_activities`**: Verified community initiatives, keynote roles, and documentary event photography.
13. **`insight_articles`**: Articles, publications, television commentary, and thought leadership pieces.
14. **`credential_items`**: Academic degrees (BUET, NSU), professional certifications (PMP®), and institutional memberships (IEB).
15. **`personal_dimension`**: Chapter IX endurance introduction.
16. **`personal_interests`**: Athletic discipline (15K marathon finish, pacing) and personal pursuits.
17. **`contact_settings`**: Direct consultation headline, subheadline, office location, and advisory protocols.
18. **`contact_inquiries`**: Inbound consultation requests submitted from the live website form.
19. **`section_configurations`**: Dynamic section ordering (`sort_order`) and visibility flags (`is_visible`).
20. **`theme_settings`**: Dynamic visual tokens (accent color, surface tone, lighting).
21. **`media_assets`**: File registry for uploaded images with mime types, sizes, and categorization.
22. **`admin_users`**: Privileged administrative accounts with bcrypt-hashed credentials.
23. **`activity_logs`**: Immutable security audit trail recording every content mutation, deletion, or login event.

---

## 4. Security & Access Control

1. **Route Protection (`src/middleware.ts`):**
   - Intercepts requests to `/admin/*` (except `/admin/login`).
   - Verifies the encrypted `reza_admin_session` cookie via `jose`.
   - Unauthenticated requests are immediately redirected to `/admin/login?from=...`.
2. **Server Action Authorization (`src/app/admin/cms-actions.ts`):**
   - Every mutation function calls `assertAdmin(action, entityType, entityId, details)`.
   - If no valid administrative session exists in the cookie jar, an exception is thrown before any SQL query executes.
   - An immutable transaction record is written to `activity_logs`.
3. **Public Form Isolation (`submitPublicInquiry`):**
   - Public visitors can only insert records into `contact_inquiries`.
   - Parameterized queries (`$1, $2, ...`) strictly prevent SQL injection.
   - No administrative privileges are required for public inquiry submissions.

---

## 5. Resilient Data Layer & Zero-Downtime Fallback

To ensure the portfolio website never crashes during database maintenance or cold starts:
- `src/lib/db/data.ts` queries Neon PostgreSQL.
- If the database is initializing or temporarily unreachable, `getPublishedPortfolioData()` falls back seamlessly to `src/data/content.ts`.
- The frontend renders flawlessly in all environments.

---

## 6. Environment Configuration

The following environment variables are required for full CMS operation:

| Variable | Description | Example / Default |
|---|---|---|
| `DATABASE_URL` | Neon Serverless PostgreSQL connection URI | `postgresql://neondb_owner:***@ep-***.neon.tech/neondb?sslmode=require` |
| `ADMIN_SESSION_SECRET` | 64-char cryptographic key for JWT signing | `c28f6e87a53e4b17b8f99e43b91a7d6e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9` |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for production SEO | `https://helal2.vercel.app` |
