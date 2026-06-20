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
}

export const jurisdictions: JurisdictionInfo[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    law: "CCPA/CPRA (California), COPPA, HIPAA, various state laws",
    year: "2020/2018",
    keyRights: [
      "Right to Know what personal information is collected",
      "Right to Delete personal information (with exceptions)",
      "Right to Opt-Out of sale of personal information",
      "Right to Non-Discrimination for exercising rights",
      "Children under 13 require parental consent (COPPA)"
    ],
    dataLocalization: false,
    breachNotify: "Varies by state (30-60 days typical)",
    consentAge: 13,
    regulator: "FTC + State Attorneys General",
    color: "blue"
  },
  {
    country: "EU/EEA",
    flag: "🇪🇺",
    law: "General Data Protection Regulation (GDPR)",
    year: "2018",
    keyRights: [
      "Right to be Informed about data collection and usage",
      "Right of Access to your personal data",
      "Right to Rectification of inaccurate data",
      "Right to Erasure ('Right to be Forgotten')",
      "Right to Restrict Processing",
      "Right to Data Portability",
      "Right to Object to processing for direct marketing",
      "Rights related to Automated Decision-Making"
    ],
    dataLocalization: false,
    breachNotify: "72 hours",
    consentAge: 16,
    regulator: "Your local Data Protection Authority (DPA)",
    color: "indigo"
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    law: "UK GDPR / Data Protection Act 2018",
    year: "2021",
    keyRights: [
      "Same rights as EU GDPR (post-Brexit)",
      "Right to be Informed",
      "Right of Access (Subject Access Request)",
      "Right to Erasure",
      "Right to Data Portability",
      "Automated decision-making protections"
    ],
    dataLocalization: false,
    breachNotify: "72 hours",
    consentAge: 13,
    regulator: "Information Commissioner's Office (ICO)",
    color: "blue"
  },
  {
    country: "India",
    flag: "🇮🇳",
    law: "Digital Personal Data Protection Act (DPDP Act) 2023",
    year: "2023",
    keyRights: [
      "Right to Information about personal data processing",
      "Right to Correction and Erasure of personal data",
      "Right to Grievance Redressal",
      "Right to Nominate a representative for data处理后",
      "Consent must be free, specific, informed, unconditional, unambiguous",
      "Significant Data Fiduciaries have additional obligations"
    ],
    dataLocalization: true,
    breachNotify: "72 hours to Data Protection Board",
    consentAge: 18,
    regulator: "Data Protection Board of India (DPBI)",
    color: "orange"
  },
  {
    country: "Brazil",
    flag: "🇧🇷",
    law: "Lei Geral de Proteção de Dados Pessoais (LGPD) - Lei 13.709/2018",
    year: "2020",
    keyRights: [
      "Right to Confirmation of processing existence",
      "Right to Access to personal data",
      "Right to Correction of incomplete/inaccurate data",
      "Right to Anonymization, blocking, or deletion",
      "Right to Data Portability",
      "Right to Revoke consent at any time",
      "Right to Oppose processing for certain purposes"
    ],
    dataLocalization: false,
    breachNotify: "Reasonable time (typically 72 hours)",
    consentAge: 18,
    regulator: "Autoridade Nacional de Proteção de Dados (ANPD)",
    color: "green"
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    law: "Act on Protection of Personal Information (APPI)",
    year: "2022 (latest amendment)",
    keyRights: [
      "Right to Disclosure of retained personal data",
      "Right to Correction of personal data",
      "Right to Cessation of use or deletion",
      "Right to Explanation of processing methods",
      "Opt-out required before sharing with third parties",
      "Sensitive personal information requires explicit consent"
    ],
    dataLocalization: false,
    breachNotify: "Required (no fixed statutory period, typically promptly)",
    consentAge: 15,
    regulator: "Personal Information Protection Commission (PPC)",
    color: "red"
  },
  {
    country: "South Africa",
    flag: "🇿🇦",
    law: "Protection of Personal Information Act (POPIA)",
    year: "2021",
    keyRights: [
      "Right to Access personal information held",
      "Right to Correction of inaccurate data",
      "Right to Deletion (subject to legal requirements)",
      "Right to Object to direct marketing",
      "Right to be notified of data breaches",
      "Right to lodge complaints with the Regulator"
    ],
    dataLocalization: false,
    breachNotify: "As soon as reasonably possible",
    consentAge: 18,
    regulator: "Information Regulator (South Africa)",
    color: "yellow"
  },
  {
    country: "Russia",
    flag: "🇷🇺",
    law: "Federal Law No. 152-FZ on Personal Data",
    year: "2006 (amended 2015 for localization)",
    keyRights: [
      "Right to Access your personal data",
      "Right to Rectification of inaccurate data",
      "Right to Block or Destroy data when processed unlawfully",
      "Right to Object to processing for direct marketing",
      "Mandatory data localization for Russian citizens' data",
      "Consent required for cross-border data transfers"
    ],
    dataLocalization: true,
    breachNotify: "24 hours to Roskomnadzor",
    consentAge: 18,
    regulator: "Roskomnadzor (Federal Service for Supervision of Communications)",
    color: "red"
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    law: "Law on Protection of Personal Data (KVKK) No. 6698",
    year: "2016",
    keyRights: [
      "Right to Learn whether data is processed",
      "Right to Request information about processing",
      "Right to Learn purpose and whether used appropriately",
      "Right to Request Correction of inaccurate data",
      "Right to Request Deletion or Anonymization",
      "Right to Object to unfavorable automated decisions"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to KVKK Board",
    consentAge: 18,
    regulator: "Kişisel Verileri Koruma Kurumu (KVKK)",
    color: "blue"
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    law: "Privacy Act 1988 (amended 2023)",
    year: "1988/2023",
    keyRights: [
      "Right to Access personal information held",
      "Right to Correction of personal information",
      "Right to Deletion (limited circumstances)",
      "Right to be informed about data collection",
      "Enhanced penalties for serious breaches (2023 amendments)",
      "Children's privacy enhanced protections"
    ],
    dataLocalization: false,
    breachNotify: "As soon as practicable (30 days max)",
    consentAge: 15,
    regulator: "Office of the Australian Information Commissioner (OAIC)",
    color: "green"
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    law: "Nigeria Data Protection Regulation (NDPR) / Data Protection Act 2023",
    year: "2023",
    keyRights: [
      "Right to Access personal data",
      "Right to Correction of inaccurate data",
      "Right to Deletion of personal data",
      "Right to Object to processing",
      "Right to Data Portability",
      "Consent required for processing sensitive data"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to NDPC",
    consentAge: 18,
    regulator: "Nigeria Data Protection Commission (NDPC)",
    color: "green"
  },
  {
    country: "Indonesia",
    flag: "🇮🇩",
    law: "Personal Data Protection Law (UU PDP) No. 27 of 2022",
    year: "2022",
    keyRights: [
      "Right to Information about data processing",
      "Right to Access personal data",
      "Right to Correction and Update of data",
      "Right to Deletion of personal data",
      "Right to Data Portability",
      "Right to Withdraw consent",
      "Right to Object to automated decisions"
    ],
    dataLocalization: true,
    breachNotify: "3 days (72 hours)",
    consentAge: 18,
    regulator: "To be established (under UU PDP)",
    color: "blue"
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    law: "Personal Data Protection Act (PDPA) B.E. 2562",
    year: "2022",
    keyRights: [
      "Right of Access to personal data",
      "Right to Data Portability",
      "Right to Object to collection/use/disclosure",
      "Right to Erasure of personal data",
      "Right to Restrict Processing",
      "Right to Rectification of inaccurate data"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to PDPC",
    consentAge: 20,
    regulator: "Personal Data Protection Committee (PDPC)",
    color: "blue"
  },
  {
    country: "Philippines",
    flag: "🇵🇭",
    law: "Data Privacy Act of 2012 (Republic Act No. 10173)",
    year: "2012",
    keyRights: [
      "Right to be Informed about data processing",
      "Right to Access personal information",
      "Right to Object to processing",
      "Right to Erasure or Blocking of data",
      "Right to Damages for violation of rights",
      "Right to Data Portability",
      "Right to File a complaint with NPC"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to NPC",
    consentAge: 18,
    regulator: "National Privacy Commission (NPC)",
    color: "blue"
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
    color: "black"
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
      'Higher administrative fines (up to 4% of global turnover or €20M)'
    ],
    dataLocalization: false,
    breachNotify: "72 hours (GDPR)",
    consentAge: 15,
    regulator: "Commission Nationale de l'Informatique et des Libertés (CNIL)",
    color: "blue"
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
    color: "yellow"
  },
  {
    country: "Netherlands",
    flag: "🇳🇱",
    law: "Uitvoeringswet AVG (UAVG) + GDPR",
    year: "2018",
    keyRights: [
      "All EU GDPR rights",
      "Strict enforcement (among most active DPAs)",
      "Employee monitoring strict rules",
      "CCTV and surveillance specific regulations",
      "Cookie walls restricted"
    ],
    dataLocalization: false,
    breachNotify: "72 hours (GDPR)",
    consentAge: 16,
    regulator: "Autoriteit Persoonsgegevens (AP)",
    color: "orange"
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    law: "Data Protection Act 2019",
    year: "2019",
    keyRights: [
      "Right to be Informed of data collection",
      "Right of Access to personal data",
      "Right to Object to processing",
      "Right to Correction or Deletion",
      "Right to Data Portability",
      "Right to not be subject to automated decision-making"
    ],
    dataLocalization: true,
    breachNotify: "72 hours to ODPC",
    consentAge: 18,
    regulator: "Office of the Data Protection Commissioner (ODPC)",
    color: "green"
  },
  {
    country: "South Korea",
    flag: "🇰🇷",
    law: "Personal Information Protection Act (PIPA)",
    year: "2011 (amended 2023)",
    keyRights: [
      "Right to Consent before collection/use",
      "Right to Access personal information",
      "Right to Correction of inaccurate info",
      "Right to Deletion of personal info",
      "Right to Suspension of processing",
      "Strict cross-border transfer requirements",
      "Pseudonymized data processing rules"
    ],
    dataLocalization: true,
    breachNotify: "72 hours to PIPC",
    consentAge: 14,
    regulator: "Personal Information Protection Commission (PIPC)",
    color: "blue"
  },
  {
    country: "Sri Lanka",
    flag: "🇱🇰",
    law: "Personal Data Protection Act No. 9 of 2022",
    year: "2022",
    keyRights: [
      "Right to be Informed about processing",
      "Right of Access to personal data",
      "Right to Correction of inaccurate data",
      "Right to Erasure of personal data",
      "Right to Restrict Processing",
      "Right to Data Portability",
      "Right to Object to processing"
    ],
    dataLocalization: false,
    breachNotify: "72 hours to DPA",
    consentAge: 18,
    regulator: "Data Protection Authority (DPA) of Sri Lanka",
    color: "blue"
  },
  {
    country: "Kazakhstan",
    flag: "🇰🇿",
    law: "Law on Personal Data and Their Protection No. 94-V",
    year: "2013 (amended 2021)",
    keyRights: [
      "Right to Access personal data",
      "Right to Change/Supplement personal data",
      "Right to Block unlawful processing",
      "Right to Delete personal data",
      "Consent required for third-party sharing",
      "Data localization requirements"
    ],
    dataLocalization: true,
    breachNotify: "3 days to authorized body",
    consentAge: 18,
    regulator: "Ministry of Digital Development (MDDIAI)",
    color: "blue"
  },
  {
    country: "Yemen",
    flag: "🇾🇪",
    law: "No comprehensive federal privacy law; limited protections under constitutional provisions",
    year: "Constitutional basis",
    keyRights: [
      "Limited statutory privacy protections",
      "Constitutional right to privacy (Article 40)",
      "Telecommunications data protections",
      "We follow minimum international standards for all users",
      "Additional safeguards extended voluntarily"
    ],
    dataLocalization: false,
    breachNotify: "We notify as soon as practicable (voluntary standard)",
    consentAge: 18,
    regulator: "General Authority for Communications and IT (pending formal data protection authority)",
    color: "gray"
  },
  {
    country: "Iran",
    flag: "🇮🇷",
    law: "No comprehensive data protection law; limited provisions in Computer Crimes Law and constitutional law",
    year: "Constitutional basis",
    keyRights: [
      "Constitutional privacy protections (Articles 22-25)",
      "Computer Crimes Law protections",
      "Telecommunication regulations",
      "Limited enforcement mechanisms",
      "Extended international standard protections voluntarily"
    ],
    dataLocalization: true,
    breachNotify: "We notify as soon as practicable (voluntary standard)",
    consentAge: 18,
    regulator: "ICT Ministry (formal data protection authority pending)",
    color: "gray"
  }
];

export function getJurisdictionsByLocalization(): { localized: JurisdictionInfo[], nonLocalized: JurisdictionInfo[] } {
  return {
    localized: jurisdictions.filter(j => j.dataLocalization),
    nonLocalized: jurisdictions.filter(j => !j.dataLocalization)
  };
}
