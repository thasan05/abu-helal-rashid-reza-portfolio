export interface CareerRole {
  id: string;
  organization: string;
  roleTitle: string;
  tenure: string;
  isCurrent?: boolean;
  location: string;
  summary: string;
  responsibilities: string[];
  keyAchievements: string[];
  tags: string[];
  verificationStatus: "Verified via Resume & Public Records" | "Pending Final Confirmation";
}

export interface ProjectShowcase {
  id: string;
  title: string;
  organization: string;
  roleContribution: string;
  category: "High-Rise & Commercial" | "Master Planned & Condos" | "Defense & Institutional" | "Industrial & Infrastructure";
  location: string;
  description: string;
  metricsOrScope: string;
  verifiedHighlights: string[];
  imageUrl: string;
  imageAlt: string;
  imagePosition?: string;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  capabilities: string[];
}

export interface LeadershipPrinciple {
  id: string;
  headline: string;
  quote?: string;
  reflection: string;
  coreValue: string;
}

export interface MentorshipActivity {
  id: string;
  organization: string;
  role: string;
  timeframe: string;
  focus: string;
  description: string;
  impactMetrics?: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  publicationOrPlatform: string;
  category: string;
  summary: string;
  readTime: string;
  url: string;
  isExternal: boolean;
  topics: string[];
}

export interface CredentialItem {
  id: string;
  title: string;
  issuerOrInstitution: string;
  periodOrYear: string;
  category: "Academic Degree" | "Professional Certification" | "Institutional Membership";
  details: string;
  badgeText?: string;
}

export interface PersonalInterest {
  title: string;
  description: string;
  highlight: string;
  iconName: string;
  imageUrl?: string;
}

export interface PortfolioContent {
  personalInfo: {
    fullName: string;
    honorificPrefix: string;
    professionalHeadline: string;
    currentRole: string;
    currentCompany: string;
    subHeadline: string;
    shortBio: string;
    email: string;
    phone: string;
    location: string;
    linkedInUrl: string;
    resumePdfPath: string;
    avatarImagePath: string;
    heroImagePath: string;
    secondaryImagePath: string;
  };
  metrics: Array<{
    value: string;
    label: string;
    sublabel: string;
  }>;
  executiveIntro: {
    headline: string;
    subheading: string;
    paragraphs: string[];
    quoteCallout: {
      statement: string;
      attribution: string;
    };
  };
  careerTimeline: CareerRole[];
  expertise: ExpertiseArea[];
  projects: ProjectShowcase[];
  philosophy: {
    leadStatement: string;
    principles: LeadershipPrinciple[];
  };
  mentorship: {
    overview: string;
    activities: MentorshipActivity[];
  };
  insights: InsightArticle[];
  credentials: {
    academic: CredentialItem[];
    certifications: CredentialItem[];
    memberships: CredentialItem[];
  };
  personalDimension: {
    intro: string;
    interests: PersonalInterest[];
  };
  contact: {
    headline: string;
    subheadline: string;
    officeLocation: string;
    emailText: string;
    availabilityNote: string;
  };
  verificationNotes: string[];
}

export const portfolioContent: PortfolioContent = {
  personalInfo: {
    fullName: "Abu Helal Rashid Reza",
    honorificPrefix: "Engr.",
    professionalHeadline: "General Manager (Construction) & Project Director | Civil Engineer | PMP®",
    currentRole: "General Manager (Construction) & Project Director",
    currentCompany: "Edison Real Estate Limited",
    subHeadline:
      "Bringing together 17+ years of BUET engineering rigor, corporate C-level operations experience, and sustainable construction discipline to create lasting urban value.",
    shortBio:
      "A seasoned real estate and construction executive with a 17-year track record spanning flagship condominium developments, LEED-certified commercial towers, high-security defense installations, and national infrastructure projects across Bangladesh.",
    email: "adit.eng@gmail.com",
    phone: "+880 1781 735095",
    location: "Dhaka, Bangladesh",
    linkedInUrl: "https://www.linkedin.com/in/abu-helal-rashid-reza-01062057/",
    resumePdfPath: "/docs/Abu_Helal_Rashid_Reza_Executive_Resume.pdf",
    avatarImagePath: "/images/reza-headshot.jpg",
    heroImagePath: "/images/reza-portrait-standing.jpg",
    secondaryImagePath: "/images/reza-desk-corporate.jpg",
  },

  metrics: [
    {
      value: "17+",
      label: "Years Experience",
      sublabel: "Real estate development & construction leadership",
    },
    {
      value: "160",
      label: "Katha Condominium",
      sublabel: "Verona Condominium Director at Uttara Diyabari",
    },
    {
      value: "PMP®",
      label: "Project Management",
      sublabel: "Certified by Project Management Institute",
    },
    {
      value: "BUET",
      label: "Civil Engineering",
      sublabel: "Graduated with B.Sc. Civil Engineering foundation",
    },
    {
      value: "24k+",
      label: "Professionals Impacted",
      sublabel: "Through LCB mentorship & industry connect initiatives",
    },
  ],

  executiveIntro: {
    headline: "Leadership Grounded in Experience",
    subheading:
      "Bridging technical engineering precision with enterprise operational strategy to execute complex urban landmarks.",
    paragraphs: [
      "Over the past 17 years, Abu Helal Rashid Reza has built a distinguished career bridging structural engineering precision with senior corporate stewardship. His path spans the complete lifecycle of modern infrastructure—from hands-on site coordination and LEED-certified high-rise execution to C-suite operational governance and multi-project portfolio oversight.",
      "As General Manager (Construction) and Project Director at Edison Real Estate Limited, he currently directs landmark condominium developments spanning 160 katha in Uttara Diyabari alongside overseeing 11 strategic residential developments across Jolshiri. His previous leadership as Chief Operating Officer at Rangs Properties Limited and Chief Operating Officer at AWR Developments (BD) Limited established benchmarks in cross-functional coordination, supply chain resilience, and sustainable building methodologies.",
      "Having earned his B.Sc. in Civil Engineering from the Bangladesh University of Engineering and Technology (BUET) and an Executive MBA from North South University, complemented by the global Project Management Professional (PMP®) certification, Engr. Reza leads with technical acumen, financial discipline, and an enduring commitment to developing high-performing teams.",
    ],
    quoteCallout: {
      statement:
        "Real estate leadership is not merely about erecting physical structures. It is about orchestrating people, materials, and processes with unwavering ethics, safety, and long-term purpose.",
      attribution: "Leadership Philosophy — Abu Helal Rashid Reza",
    },
  },

  careerTimeline: [
    {
      id: "edison-real-estate",
      organization: "Edison Real Estate Limited",
      roleTitle: "General Manager (Construction) & Project Director (Verona Condominium)",
      tenure: "2025 — Present",
      isCurrent: true,
      location: "Dhaka, Bangladesh",
      summary:
        "Directing the engineering execution, site operations, contractor governance, and delivery schedule of prime condominium and residential master projects.",
      responsibilities: [
        "Directing high-density condominium developments totaling 160 katha in Uttara Diyabari (including the flagship Verona Condominium).",
        "Overseeing 11 concurrent projects in Jolshiri from initial planning and structural execution through to fit-out and handover.",
        "Supervising multi-building sites across the Uttara urban zone, ensuring rigorous adherence to structural safety, QA/QC standards, and budget milestones.",
        "Driving stakeholder alignment between corporate leadership, consultants, architectural teams, and site engineering staff.",
      ],
      keyAchievements: [
        "Successfully coordinated high-volume developments across three strategic capital zones simultaneously.",
        "Streamlined cross-project supervision and digitized weekly milestone reporting, elevating delivery efficiency.",
      ],
      tags: ["Project Direction", "Condominium Execution", "Jolshiri Master Plan", "Uttara Diyabari", "Quality Assurance"],
      verificationStatus: "Verified via Resume & Public Records",
    },
    {
      id: "rangs-properties",
      organization: "Rangs Properties Ltd.",
      roleTitle: "Chief Operating Officer (COO)",
      tenure: "2024 — 2025",
      isCurrent: false,
      location: "Dhaka, Bangladesh",
      summary:
        "Led enterprisewide operational strategy, supply chain management, sales and marketing alignment, and sustainable construction practices for one of Bangladesh's premier real estate brands.",
      responsibilities: [
        "Directed daily operations across interlinked divisions: supply chain, sales & marketing, land acquisition, design coordination, and logistics.",
        "Pioneered the institutional adoption of sustainable, low-impact construction practices to support environmentally conscious corporate growth.",
        "Fostered cross-functional synergy among structural engineers, procurement managers, and commercial heads to minimize project timeline variance.",
        "Maintained proactive governance reporting for board members, institutional stakeholders, and discerning luxury clientele.",
      ],
      keyAchievements: [
        "Spearheaded sustainable construction frameworks, elevating statutory compliance and corporate brand equity.",
        "Accelerated organizational agility through digital process integration and performance benchmarking.",
        "Solidified stakeholder confidence and client retention through transparent project reporting protocols.",
      ],
      tags: ["COO Leadership", "Supply Chain Optimization", "Sustainable Construction", "Cross-Functional Governance"],
      verificationStatus: "Verified via Resume & Public Records",
    },
    {
      id: "awr-developments",
      organization: "AWR Developments (BD) Ltd.",
      roleTitle: "Chief Operating Officer (COO)",
      tenure: "2016 — 2024",
      isCurrent: false,
      location: "Dhaka, Bangladesh",
      summary:
        "Delivered 8 years of executive leadership spearheading real estate portfolios across Gulshan, Bashundhara, and Jolshiri, alongside public and defense infrastructure projects.",
      responsibilities: [
        "Held executive operational responsibility for urban real estate and national infrastructure developments across Gulshan, Bashundhara, Jolshiri, Chittagong, Sylhet, and Cox's Bazar.",
        "Formulated multi-year capital budgets, milestone forecasts, cash disbursement plans, and contract negotiation strategies.",
        "Cultivated high-level relationships with government ministries, defense directorates, municipal authorities, and private institutional landholders.",
        "Supervised multi-tier teams of project managers, structural consultants, procurement leads, and site engineering personnel.",
        "Managed proposals, detailed feasibility studies, contract bidding, and VIP client/delegation inspections.",
      ],
      keyAchievements: [
        "Delivered critical national projects for the Bangladesh Army and Navy, including the Army Officers' Club (Dhaka Cantonment), Shaheed Col Nafiz Auditorium (ACC&S Bogra), Divisional Headquarters (Barisal), and 12+ naval installations in Patuakhali.",
        "Executed cyclone shelter and residential tower developments in coastal and regional zones including Khurushkul Ashrayan Project (Cox's Bazar).",
        "Instituted standardized site safety protocols and systematic cost control that minimized operational overhead across an 8-year tenure.",
      ],
      tags: ["Executive Management", "Defense & Public Infrastructure", "Budget Forecasting", "8-Year Tenure", "National Projects"],
      verificationStatus: "Verified via Resume & Public Records",
    },
    {
      id: "volumezero-limited",
      organization: "VOLUMEZERO Limited",
      roleTitle: "Construction Manager",
      tenure: "2013 — 2016",
      isCurrent: false,
      location: "Gulshan Avenue, Dhaka",
      summary:
        "Managed on-site structural execution of flagship architectural commercial developments, including 18-story LEED-certified commercial towers.",
      responsibilities: [
        "Managed the structural construction of 'Simple Tree Anarkali'—an 18-story LEED-certified landmark commercial tower with 3 basements on Gulshan Avenue.",
        "Supervised structural construction for the Shahjalal Islami Bank building on Gulshan Avenue.",
        "Bridged architectural drawings with on-site structural reality, providing real-time feedback to lead architects and engineering consultants.",
        "Enforced rigorous quality assurance, concrete compressive testing, steel elongation verification, and strict site safety compliance.",
      ],
      keyAchievements: [
        "Successfully delivered the 18-story LEED-certified commercial tower adhering to international green building parameters.",
        "Maintained zero-fatality safety records during deep basement excavation (3 basements) in dense urban corridors.",
      ],
      tags: ["LEED Certified Construction", "High-Rise Commercial", "Gulshan Avenue", "Deep Excavation", "QA/QC Discipline"],
      verificationStatus: "Verified via Resume & Public Records",
    },
    {
      id: "apan-builders",
      organization: "Apan Builders Ltd. / Apan Real Estate",
      roleTitle: "Senior Project Engineer",
      tenure: "2009 — 2013",
      isCurrent: false,
      location: "Dhaka, Bangladesh",
      summary:
        "Managed comprehensive planning, scheduling, cost estimation, and site execution for high-end residential and infrastructure projects.",
      responsibilities: [
        "Directed the complete construction lifecycle for two premier residential developments in the Baridhara Diplomatic Zone.",
        "Formulated work breakdown structures (WBS), bar charts, material procurement schedules, and site resource allocations.",
        "Ensured compliance with Bangladesh National Building Code (BNBC) and municipal regulatory standards.",
      ],
      keyAchievements: [
        "Delivered two luxury diplomatic-zone residences within strict specification tolerances and client satisfaction benchmarks.",
        "Instituted comprehensive project documentation and daily milestone tracking systems.",
      ],
      tags: ["Residential Development", "Baridhara Diplomatic Zone", "Project Scheduling", "BNBC Compliance"],
      verificationStatus: "Verified via Resume & Public Records",
    },
  ],

  expertise: [
    {
      id: "strategic-leadership",
      title: "Strategic Corporate & Operations Leadership",
      subtitle: "Aligning boardroom vision with field execution",
      description:
        "Proven ability as COO and General Manager to lead cross-functional organizations, establish operational discipline, and align supply chain, sales, finance, and engineering towards predictable delivery.",
      iconName: "Compass",
      capabilities: [
        "Enterprisewide operational strategy",
        "Cross-functional team harmonization",
        "P&L and resource allocation oversight",
        "Corporate governance & stakeholder reporting",
      ],
    },
    {
      id: "real-estate-development",
      title: "Real Estate & Master-Planned Development",
      subtitle: "From land feasibility to condominium handovers",
      description:
        "Deep domain expertise in steering medium to large-scale residential condominiums and mixed-use communities across Dhaka's key growth corridors including Uttara Diyabari, Jolshiri, Gulshan, and Bashundhara.",
      iconName: "Building2",
      capabilities: [
        "160-Katha condominium project direction",
        "Jolshiri master plan project supervision",
        "High-density urban development",
        "Customer handover & retention management",
      ],
    },
    {
      id: "project-management-pmp",
      title: "Project Management (PMP® Methodology)",
      subtitle: "Global standards applied to urban complexity",
      description:
        "Certified Project Management Professional (PMP®) applying PMI standards across scope baselining, schedule compression, Earned Value Management, risk mitigation, and quality auditing.",
      iconName: "CheckCircle2",
      capabilities: [
        "Critical Path Method (CPM) scheduling",
        "Earned Value & cost variance control",
        "Rigorous risk identification & mitigation",
        "Comprehensive contract & dispute resolution",
      ],
    },
    {
      id: "sustainable-engineering",
      title: "Sustainable & Green Construction",
      subtitle: "LEED certification & environmental stewardship",
      description:
        "Direct experience managing LEED-certified commercial towers (such as Simple Tree Anarkali), incorporating fair face concrete, resource-efficient mechanical systems, and eco-conscious construction workflows.",
      iconName: "Leaf",
      capabilities: [
        "LEED-certified building construction",
        "Fair face architectural concrete finishing",
        "Material waste reduction strategies",
        "Energy-efficient envelope execution",
      ],
    },
    {
      id: "public-defense-infrastructure",
      title: "Defense & Public Sector Infrastructure",
      subtitle: "High-security, mission-critical national delivery",
      description:
        "Extensive track record collaborating with Bangladesh Army, Bangladesh Navy, Border Guard Bangladesh (BGB), and municipal corporations to deliver auditoriums, headquarters, barracks, and coastal bases.",
      iconName: "ShieldCheck",
      capabilities: [
        "Military base & cantonment projects",
        "Coastal naval installations & helipads",
        "Institutional civic markets & post offices",
        "Government ministry & VIP protocol compliance",
      ],
    },
    {
      id: "procurement-cost-control",
      title: "Procurement, Supply Chain & Cost Control",
      subtitle: "Value engineering with financial discipline",
      description:
        "Extensive experience overseeing multi-million taka budgets, negotiating high-volume vendor contracts, mitigating inflationary raw material price volatility, and safeguarding gross margins.",
      iconName: "TrendingUp",
      capabilities: [
        "Capital expenditure budgeting & cash forecasting",
        "High-volume raw material procurement (steel, cement)",
        "Contract negotiation & disbursement controls",
        "Vendor performance & lead time management",
      ],
    },
    {
      id: "team-engineering-coaching",
      title: "Team Mentorship & Engineering Coaching",
      subtitle: "Fostering the next generation of industry leaders",
      description:
        "Active involvement in technical capability building, running site-level engineering clinics, mentoring project managers, and serving as a speaker/mentor with LinkedIn Community Bangladesh and PMI Chapter.",
      iconName: "Users",
      capabilities: [
        "Technical engineering coaching for site staff",
        "Structured corporate mentorship programs",
        "Safety and quality compliance workshops",
        "Performance reviews & talent development",
      ],
    },
    {
      id: "quality-safety-discipline",
      title: "Quality Assurance & Zero-Harm Safety",
      subtitle: "Uncompromising standards in deep excavations",
      description:
        "Deep foundation expertise including 3-basement excavations in dense urban corridors, diaphragm walls, pile load testing, concrete core sampling, and zero-compromise environmental health and safety (EHS).",
      iconName: "HardHat",
      capabilities: [
        "Deep basement excavation & shoring safety",
        "Comprehensive QA/QC concrete testing",
        "Strict site safety & EHS protocol enforcement",
        "BNBC and international code compliance",
      ],
    },
  ],

  projects: [
    {
      id: "verona-condominium",
      title: "Verona Condominium & Uttara Diyabari Developments",
      organization: "Edison Real Estate Limited",
      roleContribution: "General Manager (Construction) & Project Director",
      category: "Master Planned & Condos",
      location: "Uttara Diyabari, Dhaka",
      description:
        "Flagship condominium master development covering 160 katha in the rapidly growing modern urban hub of Uttara Diyabari, designed to deliver high-amenity sustainable community living.",
      metricsOrScope: "160 Katha land parcel | Multi-unit residential condominium",
      verifiedHighlights: [
        "Directing end-to-end site execution and engineering coordination.",
        "Managing multi-tier contractor teams and scheduling milestones.",
        "Integrating modern structural frameworks with high-quality communal amenities.",
      ],
      imageUrl: "/images/reza-verona-team.jpg",
      imageAlt: "Engr. Abu Helal Rashid Reza with Verona Condominium project engineering team",
    },
    {
      id: "simple-tree-anarkali",
      title: "Simple Tree Anarkali Commercial Tower",
      organization: "VOLUMEZERO Limited",
      roleContribution: "Construction Manager",
      category: "High-Rise & Commercial",
      location: "Gulshan Avenue, Dhaka",
      description:
        "A premier 18-story commercial landmark on prestigious Gulshan Avenue boasting LEED certification and 3 deep basements, recognized as a benchmark for contemporary urban architecture in Dhaka.",
      metricsOrScope: "18 Stories | 3 Basements | LEED Certified Commercial Tower",
      verifiedHighlights: [
        "Supervised structural construction and 3-basement deep excavation in dense commercial corridor.",
        "Ensured compliance with strict LEED green building criteria and architectural specifications.",
        "Coordinated with international design teams and advanced MEP specialists.",
      ],
      imageUrl: "/images/reza-desk-corporate.jpg",
      imageAlt: "Executive overview of high-rise commercial developments",
    },
    {
      id: "jolshiri-residential",
      title: "Jolshiri Master Planned Residential Portfolio",
      organization: "Edison Real Estate Limited",
      roleContribution: "General Manager (Construction) & Portfolio Oversight",
      category: "Master Planned & Condos",
      location: "Jolshiri Abashon, Dhaka",
      description:
        "Strategic residential development portfolio comprising 11 distinct contemporary housing projects within the premier Jolshiri Abashon township.",
      metricsOrScope: "11 Projects from planning through execution",
      verifiedHighlights: [
        "Oversaw concurrent project rollout across multiple sectors within Jolshiri.",
        "Harmonized architectural intent with cost efficiency and procurement schedules.",
        "Enforced standardized structural quality controls across all 11 plots.",
      ],
      imageUrl: "/images/reza-site-coaching.jpg",
      imageAlt: "Engr. Reza conducting site coordination meeting for residential developments",
    },
    {
      id: "bns-sher-e-bangla",
      title: "BNS Sher-E-Bangla Naval Complex",
      organization: "Bangladesh Navy / AWR Developments",
      roleContribution: "Chief Operating Officer — Construction Governance",
      category: "Defense & Institutional",
      location: "Kolapara, Patuakhali",
      description:
        "Extensive coastal defense infrastructure execution encompassing 12 distinct naval facilities, an official parade ground, a designated helipad, and a mosque at Bangladesh Navy's forward base.",
      metricsOrScope: "12 Naval Buildings | Helipad | Parade Ground | Mosque",
      verifiedHighlights: [
        "Coordinated coastal engineering works, soil stabilization, and high-salinity concrete mix designs.",
        "Delivered mission-critical military facilities in strict adherence to naval specifications.",
        "Maintained high-level security clearance and protocol alignment.",
      ],
      imageUrl: "/images/reza-window-reflection.jpg",
      imageAlt: "Executive leadership in defense infrastructure delivery",
      imagePosition: "object-top",
    },
    {
      id: "army-officers-club-auditorium",
      title: "Army Officers' Club & Shaheed Col Nafiz Auditorium",
      organization: "Bangladesh Army / AWR Developments",
      roleContribution: "Chief Operating Officer — Project Delivery",
      category: "Defense & Institutional",
      location: "Dhaka Cantonment & Bogra Cantonment",
      description:
        "Execution of high-profile multipurpose defense installations, including the 3-story Army Officers' Club multipurpose complex in Dhaka Cantonment and the Shaheed Col Nafiz Auditorium at ACC&S Majhira Cantonment.",
      metricsOrScope: "Multipurpose complex (Dhaka) & Cantonment Auditorium (ACC&S)",
      verifiedHighlights: [
        "Delivered grand-scale acoustic and structural requirements for major military gatherings.",
        "Facilitated VIP site inspections and high-ranking defense ministry walkthroughs.",
        "Demonstrated adherence to tight cantonment protocols and architectural excellence.",
      ],
      imageUrl: "/images/reza-pmi-speaker.jpg",
      imageAlt: "Professional leadership delivering institutional landmarks",
      imagePosition: "object-center",
    },
    {
      id: "coxda-residential-towers",
      title: "Cox's Bazar Development Authority (CoxDA) Residential Towers",
      organization: "CoxDA / AWR Developments",
      roleContribution: "Chief Operating Officer — Operations Oversight",
      category: "Defense & Institutional",
      location: "Cox's Bazar, Bangladesh",
      description:
        "Construction of four 15-story residential towers under Cox's Bazar Development Authority (CoxDA), providing modern, seismically resilient housing in Bangladesh's premier coastal city.",
      metricsOrScope: "Four 15-Story Residential Towers | Coastal Environmental Standards",
      verifiedHighlights: [
        "Engineered seismic and wind load compliance for coastal weather environments.",
        "Managed regional logistics and continuous material supply lines from central hubs.",
        "Partnered with municipal and statutory development authorities.",
      ],
      imageUrl: "/images/reza-site-team.jpg",
      imageAlt: "Engr. Abu Helal Rashid Reza with site engineering team for residential development",
      imagePosition: "object-center",
    },
    {
      id: "shimanto-tower",
      title: "Shimanto Tower Commercial Complex",
      organization: "Border Guard Bangladesh (BGBWT) / AWR Developments",
      roleContribution: "Chief Operating Officer — Executive Supervision",
      category: "High-Rise & Commercial",
      location: "Pilkhana, Dhaka",
      description:
        "A striking 10-story commercial building located at Border Guard Bangladesh Welfare Trust (BGBWT) Headquarters in the heart of Pilkhana, Dhaka.",
      metricsOrScope: "10-Story Commercial Center | BGB Headquarters Complex",
      verifiedHighlights: [
        "Executed premium commercial building finishing and structural systems.",
        "Managed strict security and access compliance within military perimeter.",
        "Delivered robust commercial spaces supporting institutional welfare operations.",
      ],
      imageUrl: "/images/reza-portrait-standing.jpg",
      imageAlt: "Engr. Abu Helal Rashid Reza commercial project supervision",
      imagePosition: "object-top",
    },
    {
      id: "industrial-economic-zones",
      title: "BEPZA & Mongla EPZ Industrial Facilities",
      organization: "BEPZA / Mongla EPZ / AWR Developments",
      roleContribution: "Chief Operating Officer — Industrial Infrastructure",
      category: "Industrial & Infrastructure",
      location: "Chattogram & Mongla, Bangladesh",
      description:
        "Heavy-duty factory and logistics infrastructure development in BEPZA Economic Zone, Chattogram and Mongla Export Processing Zone, supporting national industrial export capacity.",
      metricsOrScope: "Large-span industrial factory buildings & security barracks",
      verifiedHighlights: [
        "Engineered wide-span industrial flooring, heavy floor load designs, and rapid steel erection.",
        "Constructed security barracks and worker welfare facilities to export standards.",
        "Aligned with export zone statutory requirements and customs zones.",
      ],
      imageUrl: "/images/reza-desk-pen.jpg",
      imageAlt: "Strategic planning for industrial infrastructure projects",
    },
  ],

  philosophy: {
    leadStatement:
      "A building outlasts its creators. True leadership in the built environment means making ethical, deliberate decisions that stand firm decades after the project handover.",
    principles: [
      {
        id: "ethics-governance",
        headline: "Integrity as Structural Reinforcement",
        coreValue: "Ethical Governance",
        reflection:
          "Just as high-grade rebar gives concrete its tensile strength, unyielding ethical integrity gives an organization its true resilience. Short-term shortcuts in procurement or engineering inevitably cause long-term cracks. We build with honesty, regulatory transparency, and uncompromised specifications.",
      },
      {
        id: "engineering-strategy",
        headline: "Technical Precision Informs Strategic Decision",
        coreValue: "Technical Stewardship",
        reflection:
          "Sound executive strategy cannot be divorced from engineering physics. Having walked muddy foundation trenches, conducted pile tests, and supervised concrete pours gives an executive the sharp discernment required to evaluate schedules, mitigate risks, and hold contractors accountable.",
      },
      {
        id: "empathy-teamwork",
        headline: "High Standards Balanced with Deep Empathy",
        coreValue: "Human-Centric Culture",
        reflection:
          "Construction sites are demanding environments with tremendous human pressures. Demanding excellence without empathy breeds fatigue and errors. When we listen to site supervisors, mentor young engineers, and prioritize the dignity and safety of every laborer, the entire team executes with pride.",
      },
      {
        id: "sustainable-future",
        headline: "Generational Value Over Transient Hype",
        coreValue: "Sustainable Stewardship",
        reflection:
          "Sustainability is not a marketing badge; it is a moral obligation to Bangladesh's urban future. From energy-efficient commercial towers with LEED certification to well-planned residential communities, our responsibility is to build spaces that conserve resources and uplift their neighborhoods.",
      },
      {
        id: "continuous-learning",
        headline: "Discipline and Lifelong Mastery",
        coreValue: "Continuous Improvement",
        reflection:
          "From BUET to North South University, from PMP® certification to running marathons, the pursuit of discipline never ends. A leader must remain an active student of the industry, adopting digital integrations, new materials, and modern management methodologies.",
      },
    ],
  },

  mentorship: {
    overview:
      "Believing that an executive's lasting legacy is measured by the people they elevate, Engr. Abu Helal Rashid Reza actively dedicates time to mentoring university students, early-career engineers, and project management professionals across Bangladesh.",
    activities: [
      {
        id: "lcb-mentorship",
        organization: "LinkedIn Community Bangladesh (LCB)",
        role: "Assistant Director, Mentor & Industry Connect Team",
        timeframe: "Ongoing Leadership Role",
        focus: "Bridging the Academia-to-Industry Divide & Career Coaching",
        description:
          "Serves in the leadership team of LCB—the country's premier professional community having positively impacted over 24,000+ students and professionals. Regularly headlines panels including 'From Campus to Career: Leveraging University Life to Secure Your Dream Job' and guides young graduates on corporate navigation, networking, and career roadmapping.",
        impactMetrics: "24,000+ students & professionals engaged nationwide",
        imageUrl: "/images/reza-lcb-panel.jpg",
        imageCaption: "Speaking at LCB Offline Get-Together on corporate transition and leadership skills.",
      },
      {
        id: "pmi-bangladesh-chapter",
        organization: "Project Management Institute (PMI) Bangladesh Chapter",
        role: "Active Member, Speaker & Professional Mentor",
        timeframe: "Continuous Involvement",
        focus: "Advancing Global PMP® Standards in Bangladesh Real Estate",
        description:
          "Engages with the PMI Bangladesh Chapter as an active speaker and participant in Member Engagement Series, sharing actionable case studies on risk mitigation, earned value tracking, and ethical stakeholder management with aspiring PMP® practitioners.",
        impactMetrics: "Direct engagement with senior project managers & engineers",
        imageUrl: "/images/reza-pmi-speaker.jpg",
        imageCaption: "Addressing peers and aspiring PMP® professionals at PMI Bangladesh Chapter engagement series.",
      },
      {
        id: "engineering-site-clinics",
        organization: "Corporate & Site Level Engineering Clinics",
        role: "Technical Coach & Operational Mentor",
        timeframe: "Throughout Executive Career",
        focus: "Hands-on Site Engineering, EHS & Quality Protocols",
        description:
          "Conducts regular on-site engineering workshops for junior site engineers, supervisors, and sub-contractors covering blueprint interpretation, structural testing standards, safety compliance, and crisis resolution.",
        impactMetrics: "Hundreds of site engineers coached into senior roles",
        imageUrl: "/images/reza-site-coaching.jpg",
        imageCaption: "Conducting technical site workshop with project engineers and site supervisors.",
      },
      {
        id: "young-professional-connect",
        organization: "University & Youth Outreach",
        role: "Industry Speaker & One-on-One Mentoring",
        timeframe: "Continuous",
        focus: "Personal Branding, Interview Preparation & Emotional Intelligence",
        description:
          "Maintains direct accessibility for young engineers seeking guidance on career shifts, higher education choices (BUET / EMBA), and building resilience in high-stakes corporate environments.",
        impactMetrics: "Accessible advisory for aspiring engineering leaders",
        imageUrl: "/images/reza-mentoring-youth.jpg",
        imageCaption: "Engaging in informal, candid mentorship with young professionals post-seminar.",
      },
    ],
  },

  insights: [
    {
      id: "campus-to-career-leadership",
      title: "From Campus to Corporate: Navigating the Engineering Career Bridge",
      publicationOrPlatform: "LinkedIn Community Bangladesh (LCB) Editorial",
      category: "Career & Mentorship",
      summary:
        "Key takeaways on how engineering graduates can translate theoretical BUET coursework into real-world site authority, emotional intelligence, and cross-functional leadership.",
      readTime: "5 min read",
      url: "https://www.linkedin.com/in/abu-helal-rashid-reza-01062057/",
      isExternal: true,
      topics: ["Career Strategy", "Mentorship", "Engineering Transition", "LCB"],
    },
    {
      id: "sustainable-construction-bangladesh",
      title: "Sustainable Real Estate in Bangladesh: Beyond the Marketing Facade",
      publicationOrPlatform: "Executive Reflection & Industry Analysis",
      category: "Sustainability & LEED",
      summary:
        "Reflections on delivering 18-story LEED commercial towers and large-scale residential communities while balancing cost control, local supply constraints, and green compliance.",
      readTime: "6 min read",
      url: "https://theincap.com/dynamic-corporate-leader-abu-helal-rashid-reza/",
      isExternal: true,
      topics: ["LEED Certified", "Green Building", "Sustainable Development", "InCAP"],
    },
    {
      id: "pmp-rigor-real-estate",
      title: "Applying PMP® Methodologies to Bangladesh's High-Velocity Construction",
      publicationOrPlatform: "Project Management Institute (PMI) Forum",
      category: "Project Management",
      summary:
        "How disciplined Earned Value Management (EVM), rigorous stakeholder communication, and preemptive risk registers prevent chronic schedule overruns in high-density urban environments.",
      readTime: "7 min read",
      url: "https://www.linkedin.com/in/abu-helal-rashid-reza-01062057/",
      isExternal: true,
      topics: ["PMP® Methodology", "Risk Mitigation", "Cost Control", "PMI Bangladesh"],
    },
    {
      id: "structural-safety-urban-preparedness",
      title: "Structural Safety, Earthquake Resilience and Disaster Management",
      publicationOrPlatform: "Broadcast Discussion & Industry Commentary (Channel i)",
      category: "Structural Safety",
      summary:
        "Insights from televised roundtable panels on structural integrity, building code compliance (BNBC), and disaster preparedness for Dhaka's growing high-rise urban landscape.",
      readTime: "Video Roundtable",
      url: "https://www.linkedin.com/in/abu-helal-rashid-reza-01062057/",
      isExternal: true,
      topics: ["Structural Engineering", "Disaster Management", "Channel i", "BNBC"],
    },
  ],

  credentials: {
    academic: [
      {
        id: "buet-bsc",
        title: "Bachelor of Science in Civil Engineering",
        issuerOrInstitution: "Bangladesh University of Engineering and Technology (BUET)",
        periodOrYear: "2003 – 2008",
        category: "Academic Degree",
        details:
          "Rigorous 4-year foundational engineering degree from the nation's premier engineering institution, specializing in structural design, fluid mechanics, soil dynamics, and project economics.",
        badgeText: "BUET Civil Engineering",
      },
      {
        id: "nsu-emba",
        title: "Executive Master of Business Administration (EMBA)",
        issuerOrInstitution: "North South University (NSU)",
        periodOrYear: "2022 – 2024",
        category: "Academic Degree",
        details:
          "Advanced corporate management curriculum focusing on strategic management, corporate finance, organizational behavior, supply chain optimization, and executive decision-making.",
        badgeText: "NSU Executive MBA",
      },
      {
        id: "ndc-hsc",
        title: "Higher Secondary Certificate (HSC) — Science",
        issuerOrInstitution: "Notre Dame College, Dhaka",
        periodOrYear: "2001 – 2003",
        category: "Academic Degree",
        details: "Graduated with highest distinction under Dhaka Board from one of Bangladesh's most venerable colleges.",
        badgeText: "Notre Dame College",
      },
      {
        id: "ssc-motijheel",
        title: "Secondary School Certificate (SSC) — Science",
        issuerOrInstitution: "Motijheel Govt Boys High School, Dhaka",
        periodOrYear: "1999 – 2001",
        category: "Academic Degree",
        details: "Graduated under Dhaka Board with stellar academic honors in science and mathematics.",
        badgeText: "Motijheel Govt Boys",
      },
    ],
    certifications: [
      {
        id: "pmp-certification",
        title: "Project Management Professional (PMP)®",
        issuerOrInstitution: "Project Management Institute (PMI), USA",
        periodOrYear: "2026",
        category: "Professional Certification",
        details:
          "Globally recognized gold standard certification verifying mastery across predictive, agile, and hybrid project management approaches, scope governance, and stakeholder orchestration.",
        badgeText: "PMP® Certified",
      },
    ],
    memberships: [
      {
        id: "ieb-membership",
        title: "Member, The Institution of Engineers, Bangladesh (IEB)",
        issuerOrInstitution: "The Institution of Engineers, Bangladesh",
        periodOrYear: "Active Fellow/Member",
        category: "Institutional Membership",
        details: "Official national body governing professional engineering standards and licensure in Bangladesh.",
        badgeText: "IEB Member",
      },
      {
        id: "pmi-chapter-membership",
        title: "Member & Mentor, PMI Bangladesh Chapter",
        issuerOrInstitution: "Project Management Institute (PMI) Bangladesh",
        periodOrYear: "Active Member",
        category: "Institutional Membership",
        details: "Engaged chapter member contributing to professional development and knowledge sharing forums.",
        badgeText: "PMI Bangladesh",
      },
      {
        id: "lcb-leadership",
        title: "Assistant Director, Mentor & Industry Connect",
        issuerOrInstitution: "LinkedIn Community Bangladesh (LCB)",
        periodOrYear: "Active Leadership",
        category: "Institutional Membership",
        details: "Serving the nation's premier professional network impacting 24,000+ emerging talents and professionals.",
        badgeText: "LCB Leadership",
      },
      {
        id: "lfb-membership",
        title: "Member, Leaders Forum Bangladesh (LFB)",
        issuerOrInstitution: "Leaders Forum Bangladesh",
        periodOrYear: "Active Member",
        category: "Institutional Membership",
        details: "Collaborative network of senior corporate directors, CXOs, and industry changemakers.",
        badgeText: "LFB Member",
      },
      {
        id: "cnbl-membership",
        title: "Life Member, Club NotreDamians Bangladesh Limited (CNBL)",
        issuerOrInstitution: "Club NotreDamians Bangladesh",
        periodOrYear: "Active Member",
        category: "Institutional Membership",
        details: "Alumni network uniting accomplished graduates of Notre Dame College Dhaka.",
        badgeText: "Club NotreDamians",
      },
      {
        id: "bgcl-membership",
        title: "Member, BUET Graduates Club Limited (BGCL)",
        issuerOrInstitution: "BUET Graduates Club",
        periodOrYear: "Active Member",
        category: "Institutional Membership",
        details: "Elite fellowship and alumni association of engineers from BUET.",
        badgeText: "BUET Graduates Club",
      },
    ],
  },

  personalDimension: {
    intro:
      "Beyond structural calculations and corporate boardrooms, Abu Helal Rashid Reza brings deep discipline into his daily life through endurance athletics, continuous reading, and personal growth.",
    interests: [
      {
        title: "Endurance Athletics & Long-Distance Running",
        description:
          "An active distance runner who recently completed the 15-Kilometer Inspiring Bangladesh Family Run (Bib #75767). Distance running cultivates the mental resilience, steady pacing, and cardiovascular endurance vital for navigating high-pressure corporate milestones.",
        highlight: "15K Marathon Finisher — Inspiring Bangladesh 2026",
        iconName: "Flame",
        imageUrl: "/images/reza-marathon-run.jpg",
      },
      {
        title: "Leadership Reading & Lifelong Study",
        description:
          "An avid student of strategic governance, organizational behavior, behavioral economics, and architectural history. Believes that every executive must spend weekly dedicated hours learning outside their immediate discipline.",
        highlight: "Continual synthesis of management and behavioral science",
        iconName: "BookOpen",
        imageUrl: "/images/reza-desk-pen.jpg",
      },
      {
        title: "Physical Wellness & Everyday Discipline",
        description:
          "Believes that mental clarity on complex multi-crore project sites directly stems from disciplined physical conditioning, structured routines, and intentional recovery habits.",
        highlight: "Unbroken early morning routine and athletic regimen",
        iconName: "Activity",
        imageUrl: "/images/reza-marathon-finisher.jpg",
      },
    ],
  },

  contact: {
    headline: "Let's Build Something Meaningful.",
    subheadline:
      "Open to strategic conversations, executive advisory, industry partnerships, and impactful mentorship initiatives.",
    officeLocation: "Edison Real Estate Limited / Dhaka, Bangladesh",
    emailText: "adit.eng@gmail.com",
    availabilityNote:
      "Inquiries regarding executive leadership, real estate project direction, corporate speaking, or LCB/PMI mentorship are typically reviewed within 24–48 hours.",
  },

  verificationNotes: [
    "Confirmed: Current role as General Manager (Construction) & Project Director (Verona Condominium) at Edison Real Estate Limited (2025 - Present) from official resume and public event credentials.",
    "Confirmed: Former Chief Operating Officer (COO) at Rangs Properties Ltd. (2024 - 2025).",
    "Confirmed: Former Chief Operating Officer (COO) at AWR Developments (BD) Ltd. (2016 - 2024, 8 years).",
    "Confirmed: B.Sc. Civil Engineering from BUET (2003 - 2008) and Executive MBA from North South University (2022 - 2024).",
    "Confirmed: PMP® certified by Project Management Institute (PMI) (2026).",
    "Confirmed: Active leadership role as Assistant Director & Mentor at LinkedIn Community Bangladesh (LCB) with photo documentation of stage panels and awards.",
    "Confirmed: Active membership & speaker involvement at PMI Bangladesh Chapter with event photo documentation.",
    "Confirmed: 15K runner in Inspiring Bangladesh Family Run 2026 with photo proof (Bib #75767).",
  ],
};
