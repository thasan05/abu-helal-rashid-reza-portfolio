import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B121E",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://abuhelalrashidreza.com"),
  title: "Abu Helal Rashid Reza | General Manager (Construction), Project Director & COO",
  description:
    "Official executive portfolio of Engr. Abu Helal Rashid Reza (PMP®, BUET Civil). Over 17 years directing landmark real estate condominiums (Verona 160 Katha), LEED commercial towers, and national infrastructure in Bangladesh.",
  keywords: [
    "Abu Helal Rashid Reza",
    "Engr. Abu Helal Rashid Reza",
    "Edison Real Estate",
    "Verona Condominium",
    "Rangs Properties COO",
    "AWR Developments COO",
    "BUET Civil Engineer",
    "PMP Certified Bangladesh",
    "Real Estate Executive Bangladesh",
    "LinkedIn Community Bangladesh LCB",
    "PMI Bangladesh Chapter",
    "Sustainable Construction Dhaka",
  ],
  authors: [{ name: "Abu Helal Rashid Reza" }],
  creator: "Abu Helal Rashid Reza",
  openGraph: {
    type: "profile",
    firstName: "Abu Helal Rashid",
    lastName: "Reza",
    username: "abu-helal-rashid-reza",
    gender: "male",
    title: "Abu Helal Rashid Reza | Senior Executive in Real Estate & Construction",
    description:
      "17+ years of engineering rigor and executive leadership. General Manager at Edison Real Estate, former COO at Rangs Properties & AWR Developments, BUET Civil Engineer, PMP® certified.",
    url: "https://abuhelalrashidreza.com",
    siteName: "Abu Helal Rashid Reza Executive Portfolio",
    images: [
      {
        url: "/images/reza-portrait-standing.jpg",
        width: 1200,
        height: 1800,
        alt: "Abu Helal Rashid Reza - Executive Leader & Civil Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abu Helal Rashid Reza | Executive Portfolio",
    description:
      "General Manager & Project Director at Edison Real Estate Limited | Former COO, Rangs Properties | BUET Civil Engineer | PMP®",
    images: ["/images/reza-portrait-standing.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abu Helal Rashid Reza",
  alternateName: "Engr. Abu Helal Rashid Reza",
  jobTitle: "General Manager (Construction) & Project Director",
  worksFor: {
    "@type": "Organization",
    name: "Edison Real Estate Limited",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Bangladesh University of Engineering and Technology (BUET)",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "North South University (NSU)",
    },
    {
      "@type": "EducationalOrganization",
      name: "Notre Dame College, Dhaka",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Project Management Professional (PMP)®",
      recognizedBy: {
        "@type": "Organization",
        name: "Project Management Institute (PMI)",
      },
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/abu-helal-rashid-reza-01062057/",
    "https://theincap.com/dynamic-corporate-leader-abu-helal-rashid-reza/",
  ],
  image: "https://abuhelalrashidreza.com/images/reza-headshot.jpg",
  description:
    "Executive Leader in Real Estate, Construction Operations & Infrastructure with 17+ years of experience across Bangladesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#070C14] text-slate-100 antialiased selection:bg-[#B79A63] selection:text-[#070C14]">
        {children}
      {/* impeccable-live-start */}
{/* eslint-disable-next-line @next/next/no-sync-scripts */}
<script src="http://localhost:8400/live.js?token=a68fbf83-2167-44a6-85de-431264de5ed0"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
