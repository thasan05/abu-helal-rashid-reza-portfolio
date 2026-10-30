-- Abu Helal Rashid Reza Portfolio CMS Database Schema
-- Compatible with PostgreSQL 14+ / Neon Serverless Postgres

CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  full_name TEXT NOT NULL,
  honorific_prefix TEXT,
  professional_headline TEXT NOT NULL,
  current_role_title TEXT NOT NULL,
  current_company TEXT NOT NULL,
  sub_headline TEXT,
  short_bio TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  office_location TEXT,
  linkedin_url TEXT,
  resume_pdf_path TEXT,
  avatar_image_path TEXT,
  hero_image_path TEXT,
  secondary_image_path TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords JSONB DEFAULT '[]'::jsonb,
  og_image_url TEXT,
  canonical_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  monograph_volume TEXT,
  monograph_year TEXT,
  availability_status TEXT,
  headline TEXT NOT NULL,
  subheadline TEXT,
  cta_primary_label TEXT,
  cta_primary_url TEXT,
  cta_secondary_label TEXT,
  cta_secondary_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS headline_metrics (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  sublabel TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS executive_intro (
  id TEXT PRIMARY KEY DEFAULT 'default',
  chapter_label TEXT DEFAULT 'Chapter I • Executive Biography',
  headline TEXT NOT NULL,
  subheading TEXT,
  paragraphs JSONB NOT NULL DEFAULT '[]'::jsonb,
  quote_statement TEXT,
  quote_attribution TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS career_roles (
  id TEXT PRIMARY KEY,
  organization TEXT NOT NULL,
  role_title TEXT NOT NULL,
  tenure TEXT NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  location TEXT,
  summary TEXT,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  key_achievements JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  verification_status TEXT DEFAULT 'Verified via Resume & Public Records',
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  role_contribution TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  metrics_or_scope TEXT,
  verified_highlights JSONB DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  image_position TEXT DEFAULT 'object-top',
  is_flagship BOOLEAN DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expertise_areas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  capabilities JSONB DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leadership_philosophy (
  id TEXT PRIMARY KEY DEFAULT 'default',
  lead_statement TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leadership_principles (
  id TEXT PRIMARY KEY,
  headline TEXT NOT NULL,
  quote TEXT,
  reflection TEXT NOT NULL,
  core_value TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mentorship_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  overview TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mentorship_activities (
  id TEXT PRIMARY KEY,
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  focus TEXT,
  description TEXT NOT NULL,
  impact_metrics TEXT,
  image_url TEXT,
  image_caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS insight_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  publication_platform TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  read_time TEXT,
  url TEXT NOT NULL,
  is_external BOOLEAN DEFAULT TRUE,
  topics JSONB DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS credential_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer_institution TEXT NOT NULL,
  period_or_year TEXT NOT NULL,
  category TEXT NOT NULL,
  details TEXT NOT NULL,
  badge_text TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS personal_dimension (
  id TEXT PRIMARY KEY DEFAULT 'default',
  intro TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS personal_interests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  highlight TEXT,
  icon_name TEXT NOT NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  headline TEXT NOT NULL,
  subheadline TEXT,
  office_location TEXT,
  email_text TEXT NOT NULL,
  availability_note TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INT DEFAULT 0,
  mime_type TEXT,
  alt_text TEXT,
  category TEXT DEFAULT 'general',
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS section_configurations (
  section_key TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS theme_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  accent_color TEXT DEFAULT '#B79A63',
  accent_light TEXT DEFAULT '#CBB077',
  surface_tone TEXT DEFAULT 'midnight',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  performed_by TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_career_roles_sort ON career_roles(sort_order);
CREATE INDEX IF NOT EXISTS idx_expertise_sort ON expertise_areas(sort_order);
CREATE INDEX IF NOT EXISTS idx_principles_sort ON leadership_principles(sort_order);
CREATE INDEX IF NOT EXISTS idx_mentorship_sort ON mentorship_activities(sort_order);
CREATE INDEX IF NOT EXISTS idx_insights_sort ON insight_articles(sort_order);
CREATE INDEX IF NOT EXISTS idx_credentials_sort ON credential_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_interests_sort ON personal_interests(sort_order);
CREATE INDEX IF NOT EXISTS idx_metrics_sort ON headline_metrics(sort_order);
CREATE INDEX IF NOT EXISTS idx_sections_sort ON section_configurations(sort_order);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at DESC);
