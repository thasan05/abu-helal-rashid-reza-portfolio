import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { query } from "./client";
import { runMigrations } from "./migrate";
import { portfolioContent } from "../../data/content";

export async function seedDatabase() {
  console.log("Seeding database with full portfolio content...");
  await runMigrations();

  // 1. Admin User Provisioning
  const defaultUser = process.env.ADMIN_DEFAULT_USER || "admin";
  const defaultPass = process.env.ADMIN_DEFAULT_PASS || "Reza@Admin2026!";
  const passwordHash = await bcrypt.hash(defaultPass, 10);

  await query(
    `INSERT INTO admin_users (id, username, email, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (username) DO UPDATE
     SET password_hash = EXCLUDED.password_hash`,
    ["admin-primary-01", defaultUser, "adit.eng@gmail.com", passwordHash, "admin"]
  );
  console.log(`Admin user provisioned: ${defaultUser}`);

  // 2. Global Site Settings
  const { personalInfo } = portfolioContent;
  await query(
    `INSERT INTO site_settings (
      id, full_name, honorific_prefix, professional_headline,
      current_role_title, current_company, sub_headline, short_bio,
      email, phone, location, office_location, linkedin_url,
      resume_pdf_path, avatar_image_path, hero_image_path, secondary_image_path, updated_at
    ) VALUES (
      'default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW()
    ) ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      honorific_prefix = EXCLUDED.honorific_prefix,
      professional_headline = EXCLUDED.professional_headline,
      current_role_title = EXCLUDED.current_role_title,
      current_company = EXCLUDED.current_company,
      sub_headline = EXCLUDED.sub_headline,
      short_bio = EXCLUDED.short_bio,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      location = EXCLUDED.location,
      office_location = EXCLUDED.office_location,
      linkedin_url = EXCLUDED.linkedin_url,
      resume_pdf_path = EXCLUDED.resume_pdf_path,
      avatar_image_path = EXCLUDED.avatar_image_path,
      hero_image_path = EXCLUDED.hero_image_path,
      secondary_image_path = EXCLUDED.secondary_image_path,
      updated_at = NOW()`,
    [
      personalInfo.fullName,
      personalInfo.honorificPrefix,
      personalInfo.professionalHeadline,
      personalInfo.currentRole,
      personalInfo.currentCompany,
      personalInfo.subHeadline,
      personalInfo.shortBio,
      personalInfo.email,
      personalInfo.phone,
      personalInfo.location,
      portfolioContent.contact.officeLocation,
      personalInfo.linkedInUrl,
      personalInfo.resumePdfPath,
      personalInfo.avatarImagePath,
      personalInfo.heroImagePath,
      personalInfo.secondaryImagePath,
    ]
  );

  // 3. SEO Settings
  await query(
    `INSERT INTO seo_settings (
      id, meta_title, meta_description, keywords, og_image_url, canonical_url, updated_at
    ) VALUES (
      'default',
      'Abu Helal Rashid Reza | General Manager (Construction), Project Director & COO',
      'Official executive portfolio of Engr. Abu Helal Rashid Reza (PMP®, BUET Civil). Over 17 years directing landmark real estate condominiums (Verona 160 Katha), LEED commercial towers, and national infrastructure in Bangladesh.',
      $1,
      '/images/reza-portrait-standing.jpg',
      'https://abuhelalrashidreza.com',
      NOW()
    ) ON CONFLICT (id) DO NOTHING`,
    [
      JSON.stringify([
        "Abu Helal Rashid Reza",
        "Engr. Abu Helal Rashid Reza",
        "Edison Real Estate",
        "Verona Condominium",
        "Rangs Properties COO",
        "AWR Developments COO",
        "BUET Civil Engineer",
        "PMP Certified Bangladesh",
        "Real Estate Executive Bangladesh",
      ]),
    ]
  );

  // 4. Hero Settings
  await query(
    `INSERT INTO hero_settings (
      id, monograph_volume, monograph_year, availability_status,
      headline, subheadline, cta_primary_label, cta_primary_url,
      cta_secondary_label, cta_secondary_url, updated_at
    ) VALUES (
      'default', 'Vol. XVII', '2026 Edition',
      'Open for Select Executive Leadership & Strategic Consultation',
      'Engineering skylines with structural rigor and executive stewardship.',
      $1, 'Executive CV (PDF)', $2,
      'Initiate Dialogue', '#contact', NOW()
    ) ON CONFLICT (id) DO NOTHING`,
    [personalInfo.subHeadline, personalInfo.resumePdfPath]
  );

  // 5. Headline Metrics
  for (let i = 0; i < portfolioContent.metrics.length; i++) {
    const m = portfolioContent.metrics[i];
    const metricId = `metric-${i + 1}`;
    await query(
      `INSERT INTO headline_metrics (id, value, label, sublabel, sort_order, is_published)
       VALUES ($1, $2, $3, $4, $5, TRUE)
       ON CONFLICT (id) DO UPDATE SET
       value = EXCLUDED.value, label = EXCLUDED.label, sublabel = EXCLUDED.sublabel, sort_order = EXCLUDED.sort_order`,
      [metricId, m.value, m.label, m.sublabel, (i + 1) * 10]
    );
  }

  // 6. Executive Intro
  const { executiveIntro } = portfolioContent;
  await query(
    `INSERT INTO executive_intro (
      id, chapter_label, headline, subheading, paragraphs, quote_statement, quote_attribution, updated_at
    ) VALUES (
      'default', 'Chapter I • Executive Biography', $1, $2, $3, $4, $5, NOW()
    ) ON CONFLICT (id) DO UPDATE SET
      headline = EXCLUDED.headline,
      subheading = EXCLUDED.subheading,
      paragraphs = EXCLUDED.paragraphs,
      quote_statement = EXCLUDED.quote_statement,
      quote_attribution = EXCLUDED.quote_attribution,
      updated_at = NOW()`,
    [
      executiveIntro.headline,
      executiveIntro.subheading,
      JSON.stringify(executiveIntro.paragraphs),
      executiveIntro.quoteCallout.statement,
      executiveIntro.quoteCallout.attribution,
    ]
  );

  // 7. Career Roles Timeline
  for (let i = 0; i < portfolioContent.careerTimeline.length; i++) {
    const role = portfolioContent.careerTimeline[i];
    await query(
      `INSERT INTO career_roles (
        id, organization, role_title, tenure, is_current, location, summary,
        responsibilities, key_achievements, tags, verification_status, sort_order, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        organization = EXCLUDED.organization,
        role_title = EXCLUDED.role_title,
        tenure = EXCLUDED.tenure,
        is_current = EXCLUDED.is_current,
        location = EXCLUDED.location,
        summary = EXCLUDED.summary,
        responsibilities = EXCLUDED.responsibilities,
        key_achievements = EXCLUDED.key_achievements,
        tags = EXCLUDED.tags,
        sort_order = EXCLUDED.sort_order`,
      [
        role.id,
        role.organization,
        role.roleTitle,
        role.tenure,
        role.isCurrent || false,
        role.location,
        role.summary,
        JSON.stringify(role.responsibilities),
        JSON.stringify(role.keyAchievements),
        JSON.stringify(role.tags),
        role.verificationStatus,
        (i + 1) * 10,
      ]
    );
  }

  // 8. Projects Showcase
  for (let i = 0; i < portfolioContent.projects.length; i++) {
    const proj = portfolioContent.projects[i];
    await query(
      `INSERT INTO projects (
        id, slug, title, organization, role_contribution, category, location,
        description, metrics_or_scope, verified_highlights, image_url, image_alt,
        image_position, is_flagship, sort_order, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        organization = EXCLUDED.organization,
        role_contribution = EXCLUDED.role_contribution,
        category = EXCLUDED.category,
        location = EXCLUDED.location,
        description = EXCLUDED.description,
        metrics_or_scope = EXCLUDED.metrics_or_scope,
        verified_highlights = EXCLUDED.verified_highlights,
        image_url = EXCLUDED.image_url,
        image_alt = EXCLUDED.image_alt,
        image_position = EXCLUDED.image_position,
        is_flagship = EXCLUDED.is_flagship,
        sort_order = EXCLUDED.sort_order`,
      [
        proj.id,
        proj.id,
        proj.title,
        proj.organization,
        proj.roleContribution,
        proj.category,
        proj.location,
        proj.description,
        proj.metricsOrScope,
        JSON.stringify(proj.verifiedHighlights),
        proj.imageUrl,
        proj.imageAlt,
        proj.imagePosition || "object-top",
        proj.id === "verona-condominium",
        (i + 1) * 10,
      ]
    );
  }

  // 9. Expertise Areas
  for (let i = 0; i < portfolioContent.expertise.length; i++) {
    const exp = portfolioContent.expertise[i];
    await query(
      `INSERT INTO expertise_areas (
        id, title, subtitle, description, icon_name, capabilities, sort_order, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        description = EXCLUDED.description,
        icon_name = EXCLUDED.icon_name,
        capabilities = EXCLUDED.capabilities,
        sort_order = EXCLUDED.sort_order`,
      [
        exp.id,
        exp.title,
        exp.subtitle,
        exp.description,
        exp.iconName,
        JSON.stringify(exp.capabilities),
        (i + 1) * 10,
      ]
    );
  }

  // 10. Leadership Philosophy & Principles
  await query(
    `INSERT INTO leadership_philosophy (id, lead_statement, updated_at)
     VALUES ('default', $1, NOW())
     ON CONFLICT (id) DO UPDATE SET lead_statement = EXCLUDED.lead_statement`,
    [portfolioContent.philosophy.leadStatement]
  );

  for (let i = 0; i < portfolioContent.philosophy.principles.length; i++) {
    const p = portfolioContent.philosophy.principles[i];
    await query(
      `INSERT INTO leadership_principles (
        id, headline, quote, reflection, core_value, sort_order, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        headline = EXCLUDED.headline,
        quote = EXCLUDED.quote,
        reflection = EXCLUDED.reflection,
        core_value = EXCLUDED.core_value,
        sort_order = EXCLUDED.sort_order`,
      [p.id, p.headline, p.quote || null, p.reflection, p.coreValue, (i + 1) * 10]
    );
  }

  // 11. Mentorship Settings & Activities
  await query(
    `INSERT INTO mentorship_settings (id, overview, updated_at)
     VALUES ('default', $1, NOW())
     ON CONFLICT (id) DO UPDATE SET overview = EXCLUDED.overview`,
    [portfolioContent.mentorship.overview]
  );

  for (let i = 0; i < portfolioContent.mentorship.activities.length; i++) {
    const act = portfolioContent.mentorship.activities[i];
    await query(
      `INSERT INTO mentorship_activities (
        id, organization, role, timeframe, focus, description, impact_metrics,
        image_url, image_caption, sort_order, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        organization = EXCLUDED.organization,
        role = EXCLUDED.role,
        timeframe = EXCLUDED.timeframe,
        focus = EXCLUDED.focus,
        description = EXCLUDED.description,
        impact_metrics = EXCLUDED.impact_metrics,
        image_url = EXCLUDED.image_url,
        image_caption = EXCLUDED.image_caption,
        sort_order = EXCLUDED.sort_order`,
      [
        act.id,
        act.organization,
        act.role,
        act.timeframe,
        act.focus,
        act.description,
        act.impactMetrics || null,
        act.imageUrl || null,
        act.imageCaption || null,
        (i + 1) * 10,
      ]
    );
  }

  // 12. Insight Articles
  for (let i = 0; i < portfolioContent.insights.length; i++) {
    const art = portfolioContent.insights[i];
    await query(
      `INSERT INTO insight_articles (
        id, title, publication_platform, category, summary, read_time,
        url, is_external, topics, sort_order, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        publication_platform = EXCLUDED.publication_platform,
        category = EXCLUDED.category,
        summary = EXCLUDED.summary,
        read_time = EXCLUDED.read_time,
        url = EXCLUDED.url,
        is_external = EXCLUDED.is_external,
        topics = EXCLUDED.topics,
        sort_order = EXCLUDED.sort_order`,
      [
        art.id,
        art.title,
        art.publicationOrPlatform,
        art.category,
        art.summary,
        art.readTime,
        art.url,
        art.isExternal,
        JSON.stringify(art.topics),
        (i + 1) * 10,
      ]
    );
  }

  // 13. Credential Items (Academic, Certifications, Memberships)
  const allCredentials = [
    ...portfolioContent.credentials.academic,
    ...portfolioContent.credentials.certifications,
    ...portfolioContent.credentials.memberships,
  ];

  for (let i = 0; i < allCredentials.length; i++) {
    const cred = allCredentials[i];
    await query(
      `INSERT INTO credential_items (
        id, title, issuer_institution, period_or_year, category,
        details, badge_text, sort_order, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        issuer_institution = EXCLUDED.issuer_institution,
        period_or_year = EXCLUDED.period_or_year,
        category = EXCLUDED.category,
        details = EXCLUDED.details,
        badge_text = EXCLUDED.badge_text,
        sort_order = EXCLUDED.sort_order`,
      [
        cred.id,
        cred.title,
        cred.issuerOrInstitution,
        cred.periodOrYear,
        cred.category,
        cred.details,
        cred.badgeText || null,
        (i + 1) * 10,
      ]
    );
  }

  // 14. Personal Dimension
  await query(
    `INSERT INTO personal_dimension (id, intro, updated_at)
     VALUES ('default', $1, NOW())
     ON CONFLICT (id) DO UPDATE SET intro = EXCLUDED.intro`,
    [portfolioContent.personalDimension.intro]
  );

  for (let i = 0; i < portfolioContent.personalDimension.interests.length; i++) {
    const pi = portfolioContent.personalDimension.interests[i];
    const interestId = `interest-${i + 1}`;
    await query(
      `INSERT INTO personal_interests (
        id, title, description, highlight, icon_name, image_url, sort_order, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        highlight = EXCLUDED.highlight,
        icon_name = EXCLUDED.icon_name,
        image_url = EXCLUDED.image_url,
        sort_order = EXCLUDED.sort_order`,
      [interestId, pi.title, pi.description, pi.highlight, pi.iconName, pi.imageUrl || null, (i + 1) * 10]
    );
  }

  // 15. Contact Settings
  const { contact } = portfolioContent;
  await query(
    `INSERT INTO contact_settings (
      id, headline, subheadline, office_location, email_text, availability_note, updated_at
    ) VALUES (
      'default', $1, $2, $3, $4, $5, NOW()
    ) ON CONFLICT (id) DO UPDATE SET
      headline = EXCLUDED.headline,
      subheadline = EXCLUDED.subheadline,
      office_location = EXCLUDED.office_location,
      email_text = EXCLUDED.email_text,
      availability_note = EXCLUDED.availability_note,
      updated_at = NOW()`,
    [
      contact.headline,
      contact.subheadline,
      contact.officeLocation,
      contact.emailText,
      contact.availabilityNote,
    ]
  );

  // 16. Section Configurations
  const defaultSections = [
    { key: "hero", name: "Hero Monograph Spread", order: 10 },
    { key: "biography", name: "Executive Biography & Core Stats", order: 20 },
    { key: "timeline", name: "Career Journey & Verified Progression", order: 30 },
    { key: "projects", name: "Selected Landmark Developments", order: 40 },
    { key: "expertise", name: "Strategic Capabilities Matrix", order: 50 },
    { key: "philosophy", name: "Principles of Governance & Stewardship", order: 60 },
    { key: "mentorship", name: "Community Leadership & Mentorship", order: 70 },
    { key: "insights", name: "Publications & Thought Leadership", order: 80 },
    { key: "credentials", name: "Academic Pedigree & Licensure", order: 90 },
    { key: "personal", name: "The Discipline of Endurance (Athletic & Civic)", order: 100 },
    { key: "contact", name: "Executive Consultation & Direct Dialogue", order: 110 },
  ];

  for (const sec of defaultSections) {
    await query(
      `INSERT INTO section_configurations (section_key, display_name, is_visible, sort_order)
       VALUES ($1, $2, TRUE, $3)
       ON CONFLICT (section_key) DO UPDATE SET
       display_name = EXCLUDED.display_name, sort_order = EXCLUDED.sort_order`,
      [sec.key, sec.name, sec.order]
    );
  }

  // 17. Theme Settings
  await query(
    `INSERT INTO theme_settings (id, accent_color, accent_light, surface_tone)
     VALUES ('default', '#B79A63', '#CBB077', 'midnight')
     ON CONFLICT (id) DO NOTHING`
  );

  // 18. Index public/images/ into media_assets
  const imagesDir = path.join(process.cwd(), "public", "images");
  if (fs.existsSync(imagesDir)) {
    const imageFiles = fs.readdirSync(imagesDir);
    for (const file of imageFiles) {
      const filePath = path.join(imagesDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        const id = `asset-${path.parse(file).name}`;
        await query(
          `INSERT INTO media_assets (id, filename, file_path, file_size, mime_type, alt_text, category)
           VALUES ($1, $2, $3, $4, $5, $6, 'photography')
           ON CONFLICT (id) DO NOTHING`,
          [id, file, `/images/${file}`, stat.size, "image/jpeg", `Authentic image: ${file}`]
        );
      }
    }
  }

  // 19. Initial Activity Log
  await query(
    `INSERT INTO activity_logs (action, entity_type, entity_id, details, performed_by)
     VALUES ('SYSTEM_SEED', 'DATABASE', 'ALL', 'Successfully seeded entire portfolio content into PostgreSQL database.', 'system')`
  );

  console.log("Database seeded successfully with all entities!");
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
