import { query, queryOne } from "./client";
import { portfolioContent, PortfolioContent } from "@/data/content";

export interface DatabasePortfolioData extends PortfolioContent {
  sectionConfigs: Array<{
    sectionKey: string;
    displayName: string;
    isVisible: boolean;
    sortOrder: number;
  }>;
  themeSettings: {
    accentColor: string;
    accentLight: string;
    surfaceTone: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImageUrl: string;
    canonicalUrl: string;
  };
  heroSettings: {
    monographVolume: string;
    monographYear: string;
    availabilityStatus: string;
    headline: string;
    subheadline: string;
    ctaPrimaryLabel: string;
    ctaPrimaryUrl: string;
    ctaSecondaryLabel: string;
    ctaSecondaryUrl: string;
  };
}

// Public Data Loader: Fetches published content with zero-crash fallback
export async function getPublishedPortfolioData(): Promise<DatabasePortfolioData> {
  try {
    const [
      siteSettingsRows,
      seoRows,
      heroRows,
      metricsRows,
      executiveIntroRows,
      careerRolesRows,
      projectsRows,
      expertiseRows,
      philosophyRows,
      principlesRows,
      mentorshipSettingsRows,
      mentorshipActivitiesRows,
      insightsRows,
      credentialsRows,
      personalDimensionRows,
      personalInterestsRows,
      contactSettingsRows,
      sectionsRows,
      themeRows,
    ] = await Promise.all([
      query(`SELECT * FROM site_settings WHERE id = 'default'`),
      query(`SELECT * FROM seo_settings WHERE id = 'default'`),
      query(`SELECT * FROM hero_settings WHERE id = 'default'`),
      query(`SELECT * FROM headline_metrics WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM executive_intro WHERE id = 'default'`),
      query(`SELECT * FROM career_roles WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM projects WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM expertise_areas WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM leadership_philosophy WHERE id = 'default'`),
      query(`SELECT * FROM leadership_principles WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM mentorship_settings WHERE id = 'default'`),
      query(`SELECT * FROM mentorship_activities WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM insight_articles WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM credential_items WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM personal_dimension WHERE id = 'default'`),
      query(`SELECT * FROM personal_interests WHERE is_published = TRUE ORDER BY sort_order ASC`),
      query(`SELECT * FROM contact_settings WHERE id = 'default'`),
      query(`SELECT * FROM section_configurations ORDER BY sort_order ASC`),
      query(`SELECT * FROM theme_settings WHERE id = 'default'`),
    ]);

    // If database returned data, transform to application structure
    if (siteSettingsRows.length > 0) {
      const s = siteSettingsRows[0];
      const seo = seoRows[0] || {};
      const hero = heroRows[0] || {};
      const intro = executiveIntroRows[0] || {};
      const philo = philosophyRows[0] || {};
      const mentor = mentorshipSettingsRows[0] || {};
      const pers = personalDimensionRows[0] || {};
      const contact = contactSettingsRows[0] || {};
      const theme = themeRows[0] || {};

      return {
        personalInfo: {
          fullName: s.full_name || portfolioContent.personalInfo.fullName,
          honorificPrefix: s.honorific_prefix || portfolioContent.personalInfo.honorificPrefix,
          professionalHeadline: s.professional_headline || portfolioContent.personalInfo.professionalHeadline,
          currentRole: s.current_role_title || portfolioContent.personalInfo.currentRole,
          currentCompany: s.current_company || portfolioContent.personalInfo.currentCompany,
          subHeadline: s.sub_headline || portfolioContent.personalInfo.subHeadline,
          shortBio: s.short_bio || portfolioContent.personalInfo.shortBio,
          email: s.email || portfolioContent.personalInfo.email,
          phone: s.phone || portfolioContent.personalInfo.phone,
          location: s.location || portfolioContent.personalInfo.location,
          linkedInUrl: s.linkedin_url || portfolioContent.personalInfo.linkedInUrl,
          resumePdfPath: s.resume_pdf_path || portfolioContent.personalInfo.resumePdfPath,
          avatarImagePath: s.avatar_image_path || portfolioContent.personalInfo.avatarImagePath,
          heroImagePath: s.hero_image_path || portfolioContent.personalInfo.heroImagePath,
          secondaryImagePath: s.secondary_image_path || portfolioContent.personalInfo.secondaryImagePath,
        },
        metrics: metricsRows.map((m: any) => ({
          value: m.value,
          label: m.label,
          sublabel: m.sublabel || "",
        })),
        executiveIntro: {
          headline: intro.headline || portfolioContent.executiveIntro.headline,
          subheading: intro.subheading || portfolioContent.executiveIntro.subheading,
          paragraphs: Array.isArray(intro.paragraphs) ? intro.paragraphs : JSON.parse(intro.paragraphs || "[]"),
          quoteCallout: {
            statement: intro.quote_statement || portfolioContent.executiveIntro.quoteCallout.statement,
            attribution: intro.quote_attribution || portfolioContent.executiveIntro.quoteCallout.attribution,
          },
        },
        careerTimeline: careerRolesRows.map((r: any) => ({
          id: r.id,
          organization: r.organization,
          roleTitle: r.role_title,
          tenure: r.tenure,
          isCurrent: r.is_current,
          location: r.location,
          summary: r.summary,
          responsibilities: Array.isArray(r.responsibilities) ? r.responsibilities : JSON.parse(r.responsibilities || "[]"),
          keyAchievements: Array.isArray(r.key_achievements) ? r.key_achievements : JSON.parse(r.key_achievements || "[]"),
          tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags || "[]"),
          verificationStatus: r.verification_status,
        })),
        expertise: expertiseRows.map((e: any) => ({
          id: e.id,
          title: e.title,
          subtitle: e.subtitle,
          description: e.description,
          iconName: e.icon_name,
          capabilities: Array.isArray(e.capabilities) ? e.capabilities : JSON.parse(e.capabilities || "[]"),
        })),
        projects: projectsRows.map((p: any) => ({
          id: p.id,
          title: p.title,
          organization: p.organization,
          roleContribution: p.role_contribution,
          category: p.category,
          location: p.location,
          description: p.description,
          metricsOrScope: p.metrics_or_scope,
          verifiedHighlights: Array.isArray(p.verified_highlights) ? p.verified_highlights : JSON.parse(p.verified_highlights || "[]"),
          imageUrl: p.image_url,
          imageAlt: p.image_alt,
          imagePosition: p.image_position,
        })),
        philosophy: {
          leadStatement: philo.lead_statement || portfolioContent.philosophy.leadStatement,
          principles: principlesRows.map((pr: any) => ({
            id: pr.id,
            headline: pr.headline,
            quote: pr.quote,
            reflection: pr.reflection,
            coreValue: pr.core_value,
          })),
        },
        mentorship: {
          overview: mentor.overview || portfolioContent.mentorship.overview,
          activities: mentorshipActivitiesRows.map((a: any) => ({
            id: a.id,
            organization: a.organization,
            role: a.role,
            timeframe: a.timeframe,
            focus: a.focus,
            description: a.description,
            impactMetrics: a.impact_metrics,
            imageUrl: a.image_url,
            imageCaption: a.image_caption,
          })),
        },
        insights: insightsRows.map((i: any) => ({
          id: i.id,
          title: i.title,
          publicationOrPlatform: i.publication_platform,
          category: i.category,
          summary: i.summary,
          readTime: i.read_time,
          url: i.url,
          isExternal: i.is_external,
          topics: Array.isArray(i.topics) ? i.topics : JSON.parse(i.topics || "[]"),
        })),
        credentials: {
          academic: credentialsRows.filter((c: any) => c.category === "Academic Degree").map(mapCredential),
          certifications: credentialsRows.filter((c: any) => c.category === "Professional Certification").map(mapCredential),
          memberships: credentialsRows.filter((c: any) => c.category === "Institutional Membership").map(mapCredential),
        },
        personalDimension: {
          intro: pers.intro || portfolioContent.personalDimension.intro,
          interests: personalInterestsRows.map((pi: any) => ({
            title: pi.title,
            description: pi.description,
            highlight: pi.highlight,
            iconName: pi.icon_name,
            imageUrl: pi.image_url,
          })),
        },
        contact: {
          headline: contact.headline || portfolioContent.contact.headline,
          subheadline: contact.subheadline || portfolioContent.contact.subheadline,
          officeLocation: contact.office_location || portfolioContent.contact.officeLocation,
          emailText: contact.email_text || portfolioContent.contact.emailText,
          availabilityNote: contact.availability_note || portfolioContent.contact.availabilityNote,
        },
        verificationNotes: portfolioContent.verificationNotes,
        sectionConfigs: sectionsRows.map((sec: any) => ({
          sectionKey: sec.section_key,
          displayName: sec.display_name,
          isVisible: sec.is_visible,
          sortOrder: sec.sort_order,
        })),
        themeSettings: {
          accentColor: theme.accent_color || "#B79A63",
          accentLight: theme.accent_light || "#CBB077",
          surfaceTone: theme.surface_tone || "midnight",
        },
        seoSettings: {
          metaTitle: seo.meta_title || "Abu Helal Rashid Reza | General Manager (Construction), Project Director & COO",
          metaDescription: seo.meta_description || "Official executive portfolio of Engr. Abu Helal Rashid Reza (PMP®, BUET Civil).",
          keywords: Array.isArray(seo.keywords) ? seo.keywords : JSON.parse(seo.keywords || "[]"),
          ogImageUrl: seo.og_image_url || "/images/reza-portrait-standing.jpg",
          canonicalUrl: seo.canonical_url || "https://abuhelalrashidreza.com",
        },
        heroSettings: {
          monographVolume: hero.monograph_volume || "Vol. XVII",
          monographYear: hero.monograph_year || "2026 Edition",
          availabilityStatus: hero.availability_status || "Open for Select Executive Leadership & Strategic Consultation",
          headline: hero.headline || "Engineering skylines with structural rigor and executive stewardship.",
          subheadline: hero.subheadline || portfolioContent.personalInfo.subHeadline,
          ctaPrimaryLabel: hero.cta_primary_label || "Executive CV (PDF)",
          ctaPrimaryUrl: hero.cta_primary_url || portfolioContent.personalInfo.resumePdfPath,
          ctaSecondaryLabel: hero.cta_secondary_label || "Initiate Dialogue",
          ctaSecondaryUrl: hero.cta_secondary_url || "#contact",
        },
      };
    }
  } catch (error) {
    console.error("Database connection fallback to static content:", error);
  }

  // Graceful fallback if database is not reachable during build
  return {
    ...portfolioContent,
    sectionConfigs: [
      { sectionKey: "hero", displayName: "Hero Monograph Spread", isVisible: true, sortOrder: 10 },
      { sectionKey: "biography", displayName: "Executive Biography & Core Stats", isVisible: true, sortOrder: 20 },
      { sectionKey: "timeline", displayName: "Career Journey & Verified Progression", isVisible: true, sortOrder: 30 },
      { sectionKey: "projects", displayName: "Selected Landmark Developments", isVisible: true, sortOrder: 40 },
      { sectionKey: "expertise", displayName: "Strategic Capabilities Matrix", isVisible: true, sortOrder: 50 },
      { sectionKey: "philosophy", displayName: "Principles of Governance & Stewardship", isVisible: true, sortOrder: 60 },
      { sectionKey: "mentorship", displayName: "Community Leadership & Mentorship", isVisible: true, sortOrder: 70 },
      { sectionKey: "insights", displayName: "Publications & Thought Leadership", isVisible: true, sortOrder: 80 },
      { sectionKey: "credentials", displayName: "Academic Pedigree & Licensure", isVisible: true, sortOrder: 90 },
      { sectionKey: "personal", displayName: "The Discipline of Endurance", isVisible: true, sortOrder: 100 },
      { sectionKey: "contact", displayName: "Executive Consultation & Direct Dialogue", isVisible: true, sortOrder: 110 },
    ],
    themeSettings: {
      accentColor: "#B79A63",
      accentLight: "#CBB077",
      surfaceTone: "midnight",
    },
    seoSettings: {
      metaTitle: "Abu Helal Rashid Reza | General Manager (Construction), Project Director & COO",
      metaDescription: "Official executive portfolio of Engr. Abu Helal Rashid Reza (PMP®, BUET Civil). Over 17 years directing landmark real estate condominiums (Verona 160 Katha), LEED commercial towers, and national infrastructure in Bangladesh.",
      keywords: ["Abu Helal Rashid Reza", "Engr. Abu Helal Rashid Reza", "Edison Real Estate", "PMP Certified Bangladesh"],
      ogImageUrl: "/images/reza-portrait-standing.jpg",
      canonicalUrl: "https://abuhelalrashidreza.com",
    },
    heroSettings: {
      monographVolume: "Vol. XVII",
      monographYear: "2026 Edition",
      availabilityStatus: "Open for Select Executive Leadership & Strategic Consultation",
      headline: "Engineering skylines with structural rigor and executive stewardship.",
      subheadline: portfolioContent.personalInfo.subHeadline,
      ctaPrimaryLabel: "Executive CV (PDF)",
      ctaPrimaryUrl: portfolioContent.personalInfo.resumePdfPath,
      ctaSecondaryLabel: "Initiate Dialogue",
      ctaSecondaryUrl: "#contact",
    },
  };
}

function mapCredential(c: any) {
  return {
    id: c.id,
    title: c.title,
    issuerOrInstitution: c.issuer_institution,
    periodOrYear: c.period_or_year,
    category: c.category,
    details: c.details,
    badgeText: c.badge_text,
  };
}
