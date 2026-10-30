"use server";

import { revalidatePath } from "next/cache";
import { query, queryOne } from "@/lib/db/client";
import { getAdminSession } from "@/lib/auth/session";

// Helper to assert admin authorization and log activity
async function assertAdmin(action: string, entityType: string, entityId: string, details: string) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized administrative access.");
  }
  await query(
    `INSERT INTO activity_logs (action, entity_type, entity_id, details, performed_by)
     VALUES ($1, $2, $3, $4, $5)`,
    [action, entityType, entityId, details, session.username]
  );
  return session;
}

// ==========================================
// 1. SITE SETTINGS & GENERAL IDENTITY
// ==========================================
export async function updateSiteSettings(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "SITE_SETTINGS", "default", "Updated global site settings and personal identity.");

  const fullName = formData.get("fullName") as string;
  const honorificPrefix = formData.get("honorificPrefix") as string;
  const professionalHeadline = formData.get("professionalHeadline") as string;
  const currentRoleTitle = formData.get("currentRoleTitle") as string;
  const currentCompany = formData.get("currentCompany") as string;
  const subHeadline = formData.get("subHeadline") as string;
  const shortBio = formData.get("shortBio") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const officeLocation = formData.get("officeLocation") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string;
  const resumePdfPath = formData.get("resumePdfPath") as string;
  const avatarImagePath = formData.get("avatarImagePath") as string;
  const heroImagePath = formData.get("heroImagePath") as string;
  const secondaryImagePath = formData.get("secondaryImagePath") as string;

  await query(
    `UPDATE site_settings SET
      full_name = $1, honorific_prefix = $2, professional_headline = $3,
      current_role_title = $4, current_company = $5, sub_headline = $6,
      short_bio = $7, email = $8, phone = $9, location = $10,
      office_location = $11, linkedin_url = $12, resume_pdf_path = $13,
      avatar_image_path = $14, hero_image_path = $15, secondary_image_path = $16,
      updated_at = NOW()
    WHERE id = 'default'`,
    [
      fullName, honorificPrefix, professionalHeadline, currentRoleTitle, currentCompany,
      subHeadline, shortBio, email, phone, location, officeLocation, linkedinUrl,
      resumePdfPath, avatarImagePath, heroImagePath, secondaryImagePath
    ]
  );

  revalidatePath("/", "layout");
}

// ==========================================
// 2. SEO SETTINGS
// ==========================================
export async function updateSeoSettings(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "SEO_SETTINGS", "default", "Updated SEO meta tags and social sharing graph.");

  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const keywordsRaw = formData.get("keywords") as string;
  const ogImageUrl = formData.get("ogImageUrl") as string;
  const canonicalUrl = formData.get("canonicalUrl") as string;

  const keywords = keywordsRaw
    ? keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

  await query(
    `UPDATE seo_settings SET
      meta_title = $1, meta_description = $2, keywords = $3,
      og_image_url = $4, canonical_url = $5, updated_at = NOW()
    WHERE id = 'default'`,
    [metaTitle, metaDescription, JSON.stringify(keywords), ogImageUrl, canonicalUrl]
  );

  revalidatePath("/", "layout");
}

// ==========================================
// 3. HERO SETTINGS & METRICS
// ==========================================
export async function updateHeroSettings(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "HERO_SETTINGS", "default", "Updated hero monograph configuration.");

  const monographVolume = formData.get("monographVolume") as string;
  const monographYear = formData.get("monographYear") as string;
  const availabilityStatus = formData.get("availabilityStatus") as string;
  const headline = formData.get("headline") as string;
  const subheadline = formData.get("subheadline") as string;
  const ctaPrimaryLabel = formData.get("ctaPrimaryLabel") as string;
  const ctaPrimaryUrl = formData.get("ctaPrimaryUrl") as string;
  const ctaSecondaryLabel = formData.get("ctaSecondaryLabel") as string;
  const ctaSecondaryUrl = formData.get("ctaSecondaryUrl") as string;

  await query(
    `UPDATE hero_settings SET
      monograph_volume = $1, monograph_year = $2, availability_status = $3,
      headline = $4, subheadline = $5, cta_primary_label = $6, cta_primary_url = $7,
      cta_secondary_label = $8, cta_secondary_url = $9, updated_at = NOW()
    WHERE id = 'default'`,
    [
      monographVolume, monographYear, availabilityStatus, headline, subheadline,
      ctaPrimaryLabel, ctaPrimaryUrl, ctaSecondaryLabel, ctaSecondaryUrl
    ]
  );

  revalidatePath("/", "layout");
}

export async function saveHeadlineMetric(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `metric-${Date.now()}`;
  const value = formData.get("value") as string;
  const label = formData.get("label") as string;
  const sublabel = formData.get("sublabel") as string;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  await assertAdmin("UPSERT", "HEADLINE_METRIC", id, `Saved headline metric: ${value} ${label}`);

  await query(
    `INSERT INTO headline_metrics (id, value, label, sublabel, sort_order, is_published, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     ON CONFLICT (id) DO UPDATE SET
      value = EXCLUDED.value, label = EXCLUDED.label, sublabel = EXCLUDED.sublabel,
      sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [id, value, label, sublabel, sortOrder, isPublished]
  );

  revalidatePath("/", "layout");
}

export async function deleteHeadlineMetric(id: string): Promise<void> {
  await assertAdmin("DELETE", "HEADLINE_METRIC", id, `Deleted metric ${id}`);
  await query(`DELETE FROM headline_metrics WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 4. EXECUTIVE BIOGRAPHY
// ==========================================
export async function updateExecutiveIntro(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "EXECUTIVE_INTRO", "default", "Updated executive biography narrative and pull quote.");

  const chapterLabel = formData.get("chapterLabel") as string;
  const headline = formData.get("headline") as string;
  const subheading = formData.get("subheading") as string;
  const paragraphsRaw = formData.get("paragraphs") as string;
  const quoteStatement = formData.get("quoteStatement") as string;
  const quoteAttribution = formData.get("quoteAttribution") as string;

  const paragraphs = paragraphsRaw
    ? paragraphsRaw.split("\n\n").map((p) => p.trim()).filter(Boolean)
    : [];

  await query(
    `UPDATE executive_intro SET
      chapter_label = $1, headline = $2, subheading = $3,
      paragraphs = $4, quote_statement = $5, quote_attribution = $6, updated_at = NOW()
    WHERE id = 'default'`,
    [chapterLabel, headline, subheading, JSON.stringify(paragraphs), quoteStatement, quoteAttribution]
  );

  revalidatePath("/", "layout");
}

// ==========================================
// 5. CAREER TIMELINE ROLES
// ==========================================
export async function saveCareerRole(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `role-${Date.now()}`;
  const organization = formData.get("organization") as string;
  const roleTitle = formData.get("roleTitle") as string;
  const tenure = formData.get("tenure") as string;
  const isCurrent = formData.get("isCurrent") === "true";
  const location = formData.get("location") as string;
  const summary = formData.get("summary") as string;
  const responsibilitiesRaw = formData.get("responsibilities") as string;
  const keyAchievementsRaw = formData.get("keyAchievements") as string;
  const tagsRaw = formData.get("tags") as string;
  const verificationStatus = (formData.get("verificationStatus") as string) || "Verified via Resume & Public Records";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  const responsibilities = responsibilitiesRaw
    ? responsibilitiesRaw.split("\n").map((r) => r.trim()).filter(Boolean)
    : [];
  const keyAchievements = keyAchievementsRaw
    ? keyAchievementsRaw.split("\n").map((a) => a.trim()).filter(Boolean)
    : [];
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  await assertAdmin("UPSERT", "CAREER_ROLE", id, `Saved career role: ${roleTitle} at ${organization}`);

  await query(
    `INSERT INTO career_roles (
      id, organization, role_title, tenure, is_current, location, summary,
      responsibilities, key_achievements, tags, verification_status, sort_order, is_published, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
    ON CONFLICT (id) DO UPDATE SET
      organization = EXCLUDED.organization, role_title = EXCLUDED.role_title,
      tenure = EXCLUDED.tenure, is_current = EXCLUDED.is_current,
      location = EXCLUDED.location, summary = EXCLUDED.summary,
      responsibilities = EXCLUDED.responsibilities, key_achievements = EXCLUDED.key_achievements,
      tags = EXCLUDED.tags, verification_status = EXCLUDED.verification_status,
      sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [
      id, organization, roleTitle, tenure, isCurrent, location, summary,
      JSON.stringify(responsibilities), JSON.stringify(keyAchievements), JSON.stringify(tags),
      verificationStatus, sortOrder, isPublished
    ]
  );

  revalidatePath("/", "layout");
}

export async function deleteCareerRole(id: string): Promise<void> {
  await assertAdmin("DELETE", "CAREER_ROLE", id, `Deleted career role: ${id}`);
  await query(`DELETE FROM career_roles WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 6. PROJECTS SHOWCASE
// ==========================================
export async function saveProject(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `proj-${Date.now()}`;
  const slug = (formData.get("slug") as string) || id;
  const title = formData.get("title") as string;
  const organization = formData.get("organization") as string;
  const roleContribution = formData.get("roleContribution") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const metricsOrScope = formData.get("metricsOrScope") as string;
  const verifiedHighlightsRaw = formData.get("verifiedHighlights") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const imageAlt = formData.get("imageAlt") as string;
  const imagePosition = (formData.get("imagePosition") as string) || "object-center";
  const isFlagship = formData.get("isFlagship") === "true";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  const verifiedHighlights = verifiedHighlightsRaw
    ? verifiedHighlightsRaw.split("\n").map((h) => h.trim()).filter(Boolean)
    : [];

  await assertAdmin("UPSERT", "PROJECT", id, `Saved landmark project: ${title}`);

  // If this project is marked flagship, unset other flagships
  if (isFlagship) {
    await query(`UPDATE projects SET is_flagship = FALSE WHERE id != $1`, [id]);
  }

  await query(
    `INSERT INTO projects (
      id, slug, title, organization, role_contribution, category, location,
      description, metrics_or_scope, verified_highlights, image_url, image_alt,
      image_position, is_flagship, sort_order, is_published, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug, title = EXCLUDED.title, organization = EXCLUDED.organization,
      role_contribution = EXCLUDED.role_contribution, category = EXCLUDED.category,
      location = EXCLUDED.location, description = EXCLUDED.description,
      metrics_or_scope = EXCLUDED.metrics_or_scope, verified_highlights = EXCLUDED.verified_highlights,
      image_url = EXCLUDED.image_url, image_alt = EXCLUDED.image_alt,
      image_position = EXCLUDED.image_position, is_flagship = EXCLUDED.is_flagship,
      sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [
      id, slug, title, organization, roleContribution, category, location,
      description, metricsOrScope, JSON.stringify(verifiedHighlights),
      imageUrl, imageAlt, imagePosition, isFlagship, sortOrder, isPublished
    ]
  );

  revalidatePath("/", "layout");
}

export async function deleteProject(id: string): Promise<void> {
  await assertAdmin("DELETE", "PROJECT", id, `Deleted project: ${id}`);
  await query(`DELETE FROM projects WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 7. EXPERTISE AREAS
// ==========================================
export async function saveExpertiseArea(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `exp-${Date.now()}`;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const iconName = formData.get("iconName") as string;
  const capabilitiesRaw = formData.get("capabilities") as string;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  const capabilities = capabilitiesRaw
    ? capabilitiesRaw.split("\n").map((c) => c.trim()).filter(Boolean)
    : [];

  await assertAdmin("UPSERT", "EXPERTISE_AREA", id, `Saved expertise capability: ${title}`);

  await query(
    `INSERT INTO expertise_areas (
      id, title, subtitle, description, icon_name, capabilities, sort_order, is_published, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title, subtitle = EXCLUDED.subtitle,
      description = EXCLUDED.description, icon_name = EXCLUDED.icon_name,
      capabilities = EXCLUDED.capabilities, sort_order = EXCLUDED.sort_order,
      is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [id, title, subtitle, description, iconName, JSON.stringify(capabilities), sortOrder, isPublished]
  );

  revalidatePath("/", "layout");
}

export async function deleteExpertiseArea(id: string): Promise<void> {
  await assertAdmin("DELETE", "EXPERTISE_AREA", id, `Deleted expertise capability: ${id}`);
  await query(`DELETE FROM expertise_areas WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 8. LEADERSHIP PHILOSOPHY & PRINCIPLES
// ==========================================
export async function updateLeadershipPhilosophy(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "PHILOSOPHY", "default", "Updated leadership philosophy lead statement.");
  const leadStatement = formData.get("leadStatement") as string;
  await query(
    `UPDATE leadership_philosophy SET lead_statement = $1, updated_at = NOW() WHERE id = 'default'`,
    [leadStatement]
  );
  revalidatePath("/", "layout");
}

export async function saveLeadershipPrinciple(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `principle-${Date.now()}`;
  const headline = formData.get("headline") as string;
  const quote = (formData.get("quote") as string) || null;
  const reflection = formData.get("reflection") as string;
  const coreValue = formData.get("coreValue") as string;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  await assertAdmin("UPSERT", "LEADERSHIP_PRINCIPLE", id, `Saved leadership principle: ${headline}`);

  await query(
    `INSERT INTO leadership_principles (
      id, headline, quote, reflection, core_value, sort_order, is_published, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
    ON CONFLICT (id) DO UPDATE SET
      headline = EXCLUDED.headline, quote = EXCLUDED.quote,
      reflection = EXCLUDED.reflection, core_value = EXCLUDED.core_value,
      sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [id, headline, quote, reflection, coreValue, sortOrder, isPublished]
  );

  revalidatePath("/", "layout");
}

export async function deleteLeadershipPrinciple(id: string): Promise<void> {
  await assertAdmin("DELETE", "LEADERSHIP_PRINCIPLE", id, `Deleted principle: ${id}`);
  await query(`DELETE FROM leadership_principles WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 9. MENTORSHIP & COMMUNITY
// ==========================================
export async function updateMentorshipSettings(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "MENTORSHIP_SETTINGS", "default", "Updated mentorship overview.");
  const overview = formData.get("overview") as string;
  await query(
    `UPDATE mentorship_settings SET overview = $1, updated_at = NOW() WHERE id = 'default'`,
    [overview]
  );
  revalidatePath("/", "layout");
}

export async function saveMentorshipActivity(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `activity-${Date.now()}`;
  const organization = formData.get("organization") as string;
  const role = formData.get("role") as string;
  const timeframe = formData.get("timeframe") as string;
  const focus = formData.get("focus") as string;
  const description = formData.get("description") as string;
  const impactMetrics = (formData.get("impactMetrics") as string) || null;
  const imageUrl = (formData.get("imageUrl") as string) || null;
  const imageCaption = (formData.get("imageCaption") as string) || null;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  await assertAdmin("UPSERT", "MENTORSHIP_ACTIVITY", id, `Saved mentorship initiative: ${role} at ${organization}`);

  await query(
    `INSERT INTO mentorship_activities (
      id, organization, role, timeframe, focus, description,
      impact_metrics, image_url, image_caption, sort_order, is_published, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
    ON CONFLICT (id) DO UPDATE SET
      organization = EXCLUDED.organization, role = EXCLUDED.role,
      timeframe = EXCLUDED.timeframe, focus = EXCLUDED.focus,
      description = EXCLUDED.description, impact_metrics = EXCLUDED.impact_metrics,
      image_url = EXCLUDED.image_url, image_caption = EXCLUDED.image_caption,
      sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [id, organization, role, timeframe, focus, description, impactMetrics, imageUrl, imageCaption, sortOrder, isPublished]
  );

  revalidatePath("/", "layout");
}

export async function deleteMentorshipActivity(id: string): Promise<void> {
  await assertAdmin("DELETE", "MENTORSHIP_ACTIVITY", id, `Deleted activity: ${id}`);
  await query(`DELETE FROM mentorship_activities WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 10. PUBLICATIONS & INSIGHTS
// ==========================================
export async function saveInsightArticle(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `insight-${Date.now()}`;
  const title = formData.get("title") as string;
  const publicationPlatform = formData.get("publicationPlatform") as string;
  const category = formData.get("category") as string;
  const summary = formData.get("summary") as string;
  const readTime = formData.get("readTime") as string;
  const url = formData.get("url") as string;
  const isExternal = formData.get("isExternal") === "true";
  const topicsRaw = formData.get("topics") as string;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  const topics = topicsRaw
    ? topicsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  await assertAdmin("UPSERT", "INSIGHT_ARTICLE", id, `Saved thought leadership article: ${title}`);

  await query(
    `INSERT INTO insight_articles (
      id, title, publication_platform, category, summary, read_time,
      url, is_external, topics, sort_order, is_published, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title, publication_platform = EXCLUDED.publication_platform,
      category = EXCLUDED.category, summary = EXCLUDED.summary,
      read_time = EXCLUDED.read_time, url = EXCLUDED.url,
      is_external = EXCLUDED.is_external, topics = EXCLUDED.topics,
      sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [id, title, publicationPlatform, category, summary, readTime, url, isExternal, JSON.stringify(topics), sortOrder, isPublished]
  );

  revalidatePath("/", "layout");
}

export async function deleteInsightArticle(id: string): Promise<void> {
  await assertAdmin("DELETE", "INSIGHT_ARTICLE", id, `Deleted publication: ${id}`);
  await query(`DELETE FROM insight_articles WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 11. CREDENTIALS & LICENSURE
// ==========================================
export async function saveCredentialItem(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `cred-${Date.now()}`;
  const title = formData.get("title") as string;
  const issuerInstitution = formData.get("issuerInstitution") as string;
  const periodOrYear = formData.get("periodOrYear") as string;
  const category = formData.get("category") as string;
  const details = formData.get("details") as string;
  const badgeText = (formData.get("badgeText") as string) || null;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  await assertAdmin("UPSERT", "CREDENTIAL_ITEM", id, `Saved credential: ${title}`);

  await query(
    `INSERT INTO credential_items (
      id, title, issuer_institution, period_or_year, category,
      details, badge_text, sort_order, is_published, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title, issuer_institution = EXCLUDED.issuer_institution,
      period_or_year = EXCLUDED.period_or_year, category = EXCLUDED.category,
      details = EXCLUDED.details, badge_text = EXCLUDED.badge_text,
      sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [id, title, issuerInstitution, periodOrYear, category, details, badgeText, sortOrder, isPublished]
  );

  revalidatePath("/", "layout");
}

export async function deleteCredentialItem(id: string): Promise<void> {
  await assertAdmin("DELETE", "CREDENTIAL_ITEM", id, `Deleted credential: ${id}`);
  await query(`DELETE FROM credential_items WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 12. PERSONAL DIMENSION & ENDURANCE
// ==========================================
export async function updatePersonalDimension(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "PERSONAL_DIMENSION", "default", "Updated personal dimension intro.");
  const intro = formData.get("intro") as string;
  await query(
    `UPDATE personal_dimension SET intro = $1, updated_at = NOW() WHERE id = 'default'`,
    [intro]
  );
  revalidatePath("/", "layout");
}

export async function savePersonalInterest(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string) || `interest-${Date.now()}`;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const highlight = (formData.get("highlight") as string) || null;
  const iconName = formData.get("iconName") as string;
  const imageUrl = (formData.get("imageUrl") as string) || null;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);
  const isPublished = formData.get("isPublished") === "true";

  await assertAdmin("UPSERT", "PERSONAL_INTEREST", id, `Saved personal dimension interest: ${title}`);

  await query(
    `INSERT INTO personal_interests (
      id, title, description, highlight, icon_name, image_url, sort_order, is_published, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title, description = EXCLUDED.description,
      highlight = EXCLUDED.highlight, icon_name = EXCLUDED.icon_name,
      image_url = EXCLUDED.image_url, sort_order = EXCLUDED.sort_order,
      is_published = EXCLUDED.is_published, updated_at = NOW()`,
    [id, title, description, highlight, iconName, imageUrl, sortOrder, isPublished]
  );

  revalidatePath("/", "layout");
}

export async function deletePersonalInterest(id: string): Promise<void> {
  await assertAdmin("DELETE", "PERSONAL_INTEREST", id, `Deleted interest: ${id}`);
  await query(`DELETE FROM personal_interests WHERE id = $1`, [id]);
  revalidatePath("/", "layout");
}

// ==========================================
// 13. CONTACT SETTINGS & INQUIRIES
// ==========================================
export async function updateContactSettings(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "CONTACT_SETTINGS", "default", "Updated contact information and availability note.");

  const headline = formData.get("headline") as string;
  const subheadline = formData.get("subheadline") as string;
  const officeLocation = formData.get("officeLocation") as string;
  const emailText = formData.get("emailText") as string;
  const availabilityNote = formData.get("availabilityNote") as string;

  await query(
    `UPDATE contact_settings SET
      headline = $1, subheadline = $2, office_location = $3,
      email_text = $4, availability_note = $5, updated_at = NOW()
    WHERE id = 'default'`,
    [headline, subheadline, officeLocation, emailText, availabilityNote]
  );

  revalidatePath("/", "layout");
}

export async function markInquiryRead(id: number): Promise<void> {
  await assertAdmin("UPDATE", "CONTACT_INQUIRY", String(id), `Marked inquiry ${id} as read.`);
  await query(`UPDATE contact_inquiries SET is_read = TRUE WHERE id = $1`, [id]);
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: number): Promise<void> {
  await assertAdmin("DELETE", "CONTACT_INQUIRY", String(id), `Deleted inquiry ${id}.`);
  await query(`DELETE FROM contact_inquiries WHERE id = $1`, [id]);
  revalidatePath("/admin/inquiries");
}

// Public form submission for website visitors
export async function submitPublicInquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const organization = (formData.get("organization") as string) || "";
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "Please fill out all required fields." };
  }

  await query(
    `INSERT INTO contact_inquiries (name, email, organization, subject, message)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, email, organization, subject, message]
  );

  return { success: true, message: "Your consultation inquiry has been delivered directly to Engr. Reza's executive office." };
}

// ==========================================
// 14. SECTION CONFIGURATION & VISIBILITY
// ==========================================
export async function updateSectionConfig(sectionKey: string, isVisible: boolean, sortOrder: number): Promise<void> {
  await assertAdmin("UPDATE", "SECTION_CONFIG", sectionKey, `Updated section ${sectionKey} visibility: ${isVisible}, order: ${sortOrder}`);
  await query(
    `UPDATE section_configurations SET is_visible = $1, sort_order = $2, updated_at = NOW() WHERE section_key = $3`,
    [isVisible, sortOrder, sectionKey]
  );
  revalidatePath("/", "layout");
}

export async function saveSectionConfig(formData: FormData): Promise<void> {
  const sectionKey = formData.get("sectionKey") as string;
  const isVisible = formData.get("isVisible") === "true";
  const sortOrder = parseInt(formData.get("sortOrder") as string, 10) || 0;
  await updateSectionConfig(sectionKey, isVisible, sortOrder);
}

// ==========================================
// 15. THEME CUSTOMIZATION
// ==========================================
export async function updateThemeSettings(formData: FormData): Promise<void> {
  await assertAdmin("UPDATE", "THEME_SETTINGS", "default", "Updated visual accent tone and theme settings.");
  const accentColor = formData.get("accentColor") as string;
  const accentLight = formData.get("accentLight") as string;
  const surfaceTone = formData.get("surfaceTone") as string;

  await query(
    `UPDATE theme_settings SET accent_color = $1, accent_light = $2, surface_tone = $3, updated_at = NOW() WHERE id = 'default'`,
    [accentColor, accentLight, surfaceTone]
  );

  revalidatePath("/", "layout");
}

// ==========================================
// 16. MEDIA MANAGEMENT
// ==========================================
export async function saveMediaAsset(formData: FormData): Promise<void> {
  await assertAdmin("CREATE", "MEDIA_ASSET", "new", "Uploaded or added new media asset.");
  const filename = formData.get("filename") as string;
  const filePath = formData.get("filePath") as string;
  const fileSize = parseInt((formData.get("fileSize") as string) || "0", 10);
  const mimeType = (formData.get("mimeType") as string) || "image/jpeg";
  const altText = (formData.get("altText") as string) || filename;
  const category = (formData.get("category") as string) || "general";
  const id = `asset-${Date.now()}`;

  await query(
    `INSERT INTO media_assets (id, filename, file_path, file_size, mime_type, alt_text, category)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [id, filename, filePath, fileSize, mimeType, altText, category]
  );

  revalidatePath("/admin/media");
}

export async function deleteMediaAsset(id: string): Promise<void> {
  await assertAdmin("DELETE", "MEDIA_ASSET", id, `Deleted media asset: ${id}`);
  await query(`DELETE FROM media_assets WHERE id = $1`, [id]);
  revalidatePath("/admin/media");
}

// Global cache purge / instant revalidation
export async function purgeGlobalCache(): Promise<void> {
  await assertAdmin("PURGE_CACHE", "SYSTEM", "ALL", "Triggered full on-demand cache revalidation.");
  revalidatePath("/", "layout");
}
