export interface JurisdictionInfo {
  country: string;
  flag: string;
  law: string;
  year: string;
  keyRights: string[];
  dataLocalization: boolean;
  breachNotify: string;
  consentAge: number;
  regulator: string;
  color: string;
  /** Coarse grouping used by the policy-site filter chips. */
  region: "Americas" | "Europe" | "Asia-Pacific" | "Middle East & Africa";
  /** The markets Arkynox names explicitly in its public policy clauses. */
  featured?: boolean;
}

export const jurisdictions: JurisdictionInfo[] = [
  {
    country: "India",
    flag: "🇮🇳",
    law: "Digital Personal Data Protection Act 2023 + DPDP Rules 2025 (G.S.R. 846(E), notified 13 Nov 2025)",
    year: "2023/2025",
    keyRights: [
      "Right to access information about personal data processing",
      "Right to correction, completion, updating and erasure",
      "Right to readily available grievance redressal",
      "Right to nominate another person to exercise rights on death or incapacity",
      "Consent must be free, specific, informed, unconditional and unambiguous",
      "Significant Data Fiduciaries carry additional obligations (annual DPIA, audit, localization)"
    ],
    dataLocalization: true,
    breachNotify: "Without delay to the Data Protection Board; detailed report within 72 hours; 48h notice to Data Principal before erasure",
    consentAge: 18,
    regulator: "Data Protection Board of India (DPBI)",
    color: "orange",
    region: "Asia-Pacific",
    featured: true
  },
  {
    country: "United States",
    flag: "🇺🇸",
    law: "CCPA/CPRA (California), other state privacy laws, COPPA, HIPAA (sectoral); no federal omnibus statute",
    year: "2020/2018",
    keyRights: [
      "Right to know what personal information is collected",
      "Right to delete personal information (with exceptions)",
      "Right to opt out of sale or sharing of personal information",
      "Right to non-discrimination for exercising rights",
      "Children under 13 require verifiable parental consent (COPPA)"
    ],
    dataLocalization: false,
    breachNotify: "Varies by state (30-60 days typical)",
    consentAge: 13,
    regulator: "FTC + State Attorneys General",
    color: "blue",
    region: "Americas",
    featured: true
  },
  {
    country: "EU/EEA",
    flag: "🇪🇺",
    law: "General Data Protection Regulation (GDPR)",
    year: "2018",
    keyRights: [
      "Right to be informed about data collection and usage",
      "Right of access to your personal data",
      "Right to rectification of inaccurate data",
      "Right to erasure ('right to be forgotten')",
      "Right to restriction of processing",
      "Right to data portability",
      "Right to object to processing for direct marketing",
      "Rights related to automated decision-making (Art. 22)"
    ],
    dataLocalization: false,
    breachNotify: "72 hours",
    consentAge: 16,
    regulator: "Your local Data Protection Authority (DPA)",
    color: "indigo",
    region: "Europe",
    featured: true
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    law: "UK GDPR / Data Protection Act 2018 / Data (Use and Access) Act 2025",
    year: "2021/2025",
    keyRights: [
      "Same core rights as EU GDPR (post-Brexit)",
      "Right to be informed",
      "Right of access (Subject Access Request)",
      "Right to erasure",
      "Right to data portability",
      "Automated decision-making protections"
    ],
    dataLocalization: false,
    breachNotify: "72 hours",
    consentAge: 13,
    regulator: "Information Commissioner's Office (ICO)",
    color: "blue",
    region: "Europe",
    featured: true
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    law: "Act on the Protection of Personal Information (APPI)",
    year: "2022 (latest amendment)",
    keyRights: [
      "Right to disclosure of retained personal data",
      "Right to correction of personal data",
      "Right to cessation of use or deletion",
      "Right to explanation of processing methods",
      "Opt-out required before sharing with third parties",
      "Sensitive personal information requires explicit consent"
    ],
    dataLocalization: false,
    breachNotify: "Required (no fixed statutory period; promptly, per PPC guidance)",
    consentAge: 15,
    regulator: "Personal Information Protection Commission (PPC)",
    color: "red",
    region: "Asia-Pacific",
    featured: true
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    law: "Privacy Act 1988 (as amended, incl. Privacy and Other Legislation Amendment Act 2024)",
    year: "1988/2024",
    keyRights: [
      "Right to access personal information held",
      "Right to correction of personal information",
      "Right to be informed about data collection",
      "Statutory tort for serious invasions of privacy (from 2025)",
      "Enhanced penalties for serious or repeated breaches",
      "Children's online privacy code obligations"
    ],
    dataLocalization: false,
    breachNotify: "As soon as practicable (30 days max)",
    consentAge: 15,
    regulator: "Office of the Australian Information Commissioner (OAIC)",
    color: "green",
    region: "Asia-Pacific",
    featured: true
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    law: "PIPEDA (federal, in force); Quebec Law 25; Alberta & BC PIPA; Bill C-36 (PPCDA) tabled June 2026, not yet in force",
    year: "2000/2021-2024",
    keyRights: [
      "Right to access and correct personal information (PIPEDA)",
      "Mandatory breach reporting to the OPC and affected individuals on real risk of significant harm",
      "Quebec Law 25: portability, de-indexing, mandatory privacy impact assessments",
      "Quebec Law 25: private right of action with statutory damages",
      "Quebec Law 25 treats transfer to another province as a cross-border transfer",
      "Withdrawal of consent at any time"
    ],
    dataLocalization: false,
    breachNotify: "As soon as feasible (PIPEDA); promptly to the CAI (Quebec)",
    consentAge: 14,
    regulator: "Office of the Privacy Commissioner of Canada (OPC); Commission d'accès à l'information (CAI, Quebec)",
    color: "red",
    region: "Americas",
    featured: true
  },
  {
    country: "Mexico",
    flag: "🇲🇽",
    law: "Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP, new statute in force 21 March 2025)",
    year: "2025",
    keyRights: [
      "ARCO rights: access, rectification, cancellation and opposition",
      "Right to revoke consent at any time",
      "Right to object to solely automated decisions with significant effects",
      "Privacy notice must distinguish mandatory from voluntary purposes",
      "Express consent for sensitive and financial data",
      "Decisions of the authority are challengeable by amparo proceedings"
    ],
    dataLocalization: false,
    breachNotify: "Without undue delay (implementing regulation by the SABG is pending)",
    consentAge: 18,
    regulator: "Secretaría Anticorrupción y Buen Gobierno (SABG) — INAI dissolved March 2025",
    color: "green",
    region: "Americas",
    featured: true
  },
  {
    country: "Brazil",
    flag: "🇧🇷",
    law: "Lei Geral de Proteção de Dados Pessoais (LGPD) - Lei 13.709/2018",
    year: "2020",
    keyRights: [
      "Right to confirmation of the existence of processing",
      "Right of access to personal data",
      "Right to correction of incomplete or inaccurate data",
      "Right to anonymization, blocking or deletion",
      "Right to data portability",
      "Right to revoke consent at any time",
      "Right to oppose processing for certain purposes"
    ],
    dataLocalization: false,
    breachNotify: "Reasonable time (typically 72 hours)",
    consentAge: 18,
    regulator: "Autoridade Nacional de Proteção de Dados (ANPD)",
    color: "green",
    region: "Americas"
  },
  {
    country: "South Africa",
    flag: "🇿🇦",
    law: "Protection of Personal Information Act (POPIA)",
    year: "2021",
    keyRights: [
      "Right of access to personal information held",
      "Right to correction of inaccurate data",
      "Right to deletion (subject to legal requirements)",
      "Right to object to direct marketing",
      "Right to be notified of data breaches",
      "Right to lodge complaints with the Regulator"
    ],
    dataLocalization: false,
    breachNotify: "As soon as reasonably possible",
    consentAge: 18,
    regulator: "Information Regulator (South Africa)",
    color: "yellow",
    region: "Middle East & Africa"
  },
  {
    country: "Russia",
    flag: "🇷🇺",
    law: "Federal Law No. 152-FZ on Personal Data",
    year: "2006 (amended 2015 for localization)",
    keyRights: [
      "Right of access to your personal data",
      "Right to rectification of inaccurate data",
      "Right to block or destroy data when processed unlawfully",
      "Right to object to processing for direct marketing",
      "Mandatory data localization for Russian citizens' data",
      "Consent required for cross-border data transfers"
    ],
    dataLocalization: true,
    breachNotify: "24 hours to Roskomnadzor",
    consentAge: 18,
    regulator: "Roskomnadzor (Federal Service for Supervision of Communications)",
    color: "red",
    region: "Europe"
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    law: "Law on the Protection of Personal Data (KVKK) No. 6698",
    year: "2016",
    keyRights: [
      "Right to learn whether data is processed",
      "Right to request information about processing",
      "Right to learn the purpose and whether it is used appropriately",
      "Right to request correction of inaccurate data",
      "Right to request deletion or anonymization",
      "Right to object to unfavorable automated decisions"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to the KVKK Board",
    consentAge: 18,
    regulator: "Kişisel Verileri Koruma Kurumu (KVKK)",
    color: "blue",
    region: "Europe"
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    law: "Nigeria Data Protection Act 2023 (successor to the NDPR)",
    year: "2023",
    keyRights: [
      "Right of access to personal data",
      "Right to correction of inaccurate data",
      "Right to deletion of personal data",
      "Right to object to processing",
      "Right to data portability",
      "Consent required for processing sensitive data"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to the NDPC",
    consentAge: 18,
    regulator: "Nigeria Data Protection Commission (NDPC)",
    color: "green",
    region: "Middle East & Africa"
  },
  {
    country: "Indonesia",
    flag: "🇮🇩",
    law: "Personal Data Protection Law (UU PDP) No. 27 of 2022",
    year: "2022",
    keyRights: [
      "Right to information about data processing",
      "Right of access to personal data",
      "Right to correction and update of data",
      "Right to deletion of personal data",
      "Right to data portability",
      "Right to withdraw consent",
      "Right to object to automated decisions"
    ],
    dataLocalization: true,
    breachNotify: "3 days (72 hours)",
    consentAge: 18,
    regulator: "Data protection authority designated under UU PDP",
    color: "blue",
    region: "Asia-Pacific"
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    law: "Personal Data Protection Act (PDPA) B.E. 2562",
    year: "2022",
    keyRights: [
      "Right of access to personal data",
      "Right to data portability",
      "Right to object to collection, use or disclosure",
      "Right to erasure of personal data",
      "Right to restriction of processing",
      "Right to rectification of inaccurate data"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to the PDPC",
    consentAge: 20,
    regulator: "Personal Data Protection Committee (PDPC)",
    color: "blue",
    region: "Asia-Pacific"
  },
  {
    country: "Philippines",
    flag: "🇵🇭",
    law: "Data Privacy Act of 2012 (Republic Act No. 10173)",
    year: "2012",
    keyRights: [
      "Right to be informed about data processing",
      "Right of access to personal information",
      "Right to object to processing",
      "Right to erasure or blocking of data",
      "Right to damages for violation of rights",
      "Right to data portability",
      "Right to file a complaint with the NPC"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to the NPC",
    consentAge: 18,
    regulator: "National Privacy Commission (NPC)",
    color: "blue",
    region: "Asia-Pacific"
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    law: "Federal Data Protection Act (BDSG) + GDPR",
    year: "2018",
    keyRights: [
      "All EU GDPR rights (extensive interpretation)",
      "Stricter rules on employee data processing",
      "Video surveillance and biometric data restrictions",
      "Special categories (health, religion) heightened protection",
      "Data Protection Officer mandatory for many organizations"
    ],
    dataLocalization: false,
    breachNotify: "72 hours (GDPR)",
    consentAge: 16,
    regulator: "State Data Protection Authorities (Landesdatenschutz)",
    color: "black",
    region: "Europe"
  },
  {
    country: "France",
    flag: "🇫🇷",
    law: "Loi Informatique et Libertés + GDPR",
    year: "1978/2018",
    keyRights: [
      "All EU GDPR rights",
      "Stronger rules on cookies (CNIL guidelines)",
      "Right to define post-mortem data usage",
      "Health data processing strict controls",
      "Administrative fines up to 4% of global turnover or €20M"
    ],
    dataLocalization: false,
    breachNotify: "72 hours (GDPR)",
    consentAge: 15,
    regulator: "Commission Nationale de l'Informatique et des Libertés (CNIL)",
    color: "blue",
    region: "Europe"
  },
  {
    country: "Spain",
    flag: "🇪🇸",
    law: "Ley Orgánica de Protección de Datos (LOPDGDD) + GDPR",
    year: "2018",
    keyRights: [
      "All EU GDPR rights",
      "Digital rights (right to digital disconnection)",
      "Credit reporting specific protections",
      "Health data enhanced safeguards",
      "Video surveillance specific regulations"
    ],
    dataLocalization: false,
    breachNotify: "72 hours (GDPR)",
    consentAge: 14,
    regulator: "Agencia Española de Protección de Datos (AEPD)",
    color: "yellow",
    region: "Europe"
  },
  {
    country: "Netherlands",
    flag: "🇳🇱",
    law: "Uitvoeringswet AVG (UAVG) + GDPR",
    year: "2018",
    keyRights: [
      "All EU GDPR rights",
      "Strict enforcement (among the most active DPAs)",
      "Employee monitoring strict rules",
      "CCTV and surveillance specific regulations",
      "Cookie walls restricted"
    ],
    dataLocalization: false,
    breachNotify: "72 hours (GDPR)",
    consentAge: 16,
    regulator: "Autoriteit Persoonsgegevens (AP)",
    color: "orange",
    region: "Europe"
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    law: "Data Protection Act 2019",
    year: "2019",
    keyRights: [
      "Right to be informed of data collection",
      "Right of access to personal data",
      "Right to object to processing",
      "Right to correction or deletion",
      "Right to data portability",
      "Right not to be subject to automated decision-making"
    ],
    dataLocalization: true,
    breachNotify: "72 hours to the ODPC",
    consentAge: 18,
    regulator: "Office of the Data Protection Commissioner (ODPC)",
    color: "green",
    region: "Middle East & Africa"
  },
  {
    country: "South Korea",
    flag: "🇰🇷",
    law: "Personal Information Protection Act (PIPA)",
    year: "2011 (amended 2023)",
    keyRights: [
      "Right to consent before collection and use",
      "Right of access to personal information",
      "Right to correction of inaccurate information",
      "Right to deletion of personal information",
      "Right to suspension of processing",
      "Strict cross-border transfer requirements",
      "Pseudonymized data processing rules"
    ],
    dataLocalization: true,
    breachNotify: "72 hours to the PIPC",
    consentAge: 14,
    regulator: "Personal Information Protection Commission (PIPC)",
    color: "blue",
    region: "Asia-Pacific"
  },
  {
    country: "Sri Lanka",
    flag: "🇱🇰",
    law: "Personal Data Protection Act No. 9 of 2022",
    year: "2022",
    keyRights: [
      "Right to be informed about processing",
      "Right of access to personal data",
      "Right to correction of inaccurate data",
      "Right to erasure of personal data",
      "Right to restriction of processing",
      "Right to data portability",
      "Right to object to processing"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to the DPA",
    consentAge: 18,
    regulator: "Data Protection Authority (DPA) of Sri Lanka",
    color: "blue",
    region: "Asia-Pacific"
  },
  {
    country: "Kazakhstan",
    flag: "🇰🇿",
    law: "Law on Personal Data and Their Protection No. 94-V",
    year: "2013 (amended 2021)",
    keyRights: [
      "Right of access to personal data",
      "Right to change or supplement personal data",
      "Right to block unlawful processing",
      "Right to delete personal data",
      "Consent required for third-party sharing",
      "Data localization requirements"
    ],
    dataLocalization: true,
    breachNotify: "3 days to the authorized body",
    consentAge: 18,
    regulator: "Ministry of Digital Development (MDDIAI)",
    color: "blue",
    region: "Asia-Pacific"
  },
  {
    country: "Yemen",
    flag: "🇾🇪",
    law: "No comprehensive privacy statute; limited protections under constitutional provisions",
    year: "Constitutional basis",
    keyRights: [
      "Limited statutory privacy protections",
      "Constitutional right to privacy (Article 40)",
      "Telecommunications data protections",
      "Arkynox applies its global baseline safeguards voluntarily",
      "Additional safeguards extended voluntarily"
    ],
    dataLocalization: false,
    breachNotify: "No statutory requirement; Arkynox notifies as soon as practicable",
    consentAge: 18,
    regulator: "General Authority for Communications and IT (no dedicated data protection authority)",
    color: "gray",
    region: "Middle East & Africa"
  },
  {
    country: "Iran",
    flag: "🇮🇷",
    law: "No comprehensive data protection statute; limited provisions in the Computer Crimes Law and constitutional law",
    year: "Constitutional basis",
    keyRights: [
      "Constitutional privacy protections (Articles 22-25)",
      "Computer Crimes Law protections",
      "Telecommunication regulations",
      "Limited enforcement mechanisms",
      "Arkynox applies its global baseline safeguards voluntarily"
    ],
    dataLocalization: true,
    breachNotify: "No statutory requirement; Arkynox notifies as soon as practicable",
    consentAge: 18,
    regulator: "ICT Ministry (no dedicated data protection authority)",
    color: "gray",
    region: "Middle East & Africa"
  }
];

export function getJurisdictionsByLocalization(): { localized: JurisdictionInfo[]; nonLocalized: JurisdictionInfo[] } {
  return {
    localized: jurisdictions.filter(j => j.dataLocalization),
    nonLocalized: jurisdictions.filter(j => !j.dataLocalization)
  };
}

export function getFeaturedJurisdictions(): JurisdictionInfo[] {
  return jurisdictions.filter(j => j.featured);
}

export const jurisdictionRegions = ["Americas", "Europe", "Asia-Pacific", "Middle East & Africa"] as const;
