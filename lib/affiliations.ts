export interface Affiliation {
  name: string
  description: string
  logo: string
  category: string
  url?: string
  featured?: boolean
  details?: string
}

// Sample affiliations data
// In a real application, this would come from a CMS or database
const affiliations: Affiliation[] = [
  {
    name: "National Association of Home Builders",
    description: "Leading industry association for residential construction",
    logo: "/images/affiliations/nahb-logo.png",
    category: "Industry Associations",
    url: "https://www.nahb.org",
    featured: true,
    details: `
      The National Association of Home Builders (NAHB) is a trade association based in Washington, D.C. that promotes the policies that make housing a national priority. Since 1942, NAHB has been serving its members, the housing industry, and the public at large.
      
      Our partnership with NAHB provides our clients with access to industry-leading research, networking opportunities, and advocacy resources that help navigate the complex regulatory environment in the building products and services industry.
    `,
  },
  {
    name: "American Institute of Architects",
    description: "Professional organization for architects",
    logo: "/images/affiliations/aia-logo.png",
    category: "Industry Associations",
    url: "https://www.aia.org",
    featured: true,
    details: `
      The American Institute of Architects (AIA) is a professional organization for architects in the United States. Founded in 1857, the AIA offers education, government advocacy, community redevelopment, and public outreach to support the architecture profession.
      
      Our affiliation with AIA connects our clients with leading architectural firms and provides insights into emerging design trends that impact building products manufacturers and suppliers.
    `,
  },
  {
    name: "Construction Financial Management Association",
    description: "Organization dedicated to financial professionals in construction",
    logo: "/images/affiliations/cfma-logo.png",
    category: "Industry Associations",
    url: "https://www.cfma.org",
    featured: false,
    details: `
      The Construction Financial Management Association (CFMA) is the only nonprofit organization dedicated to serving the financial professionals in the construction industry. CFMA provides valuable resources and education to help construction financial professionals.
      
      Through our partnership with CFMA, we gain valuable insights into financial benchmarking and best practices that help our clients optimize their financial performance before going to market.
    `,
  },
  {
    name: "U.S. Green Building Council",
    description: "Organization committed to sustainable building practices",
    logo: "/images/affiliations/usgbc-logo.png",
    category: "Industry Associations",
    url: "https://www.usgbc.org",
    featured: true,
    details: `
      The U.S. Green Building Council (USGBC) is committed to transforming how buildings are designed, constructed, and operated through LEED (Leadership in Energy and Environmental Design), the world's most widely used green building rating system.
      
      Our affiliation with USGBC helps our clients navigate the growing importance of sustainability in the building products industry and identify value-creation opportunities related to green building practices.
    `,
  },
  {
    name: "Association of Corporate Growth",
    description: "Global community for middle-market M&A dealmakers",
    logo: "/images/affiliations/acg-logo.png",
    category: "Financial Organizations",
    url: "https://www.acg.org",
    featured: true,
    details: `
      The Association for Corporate Growth (ACG) is the global community for middle-market M&A dealmakers and business leaders focused on driving growth. ACG members have access to data, content, and networking opportunities to access capital, make deals, and drive corporate growth.
      
      Our active involvement with ACG provides our clients with access to a broad network of potential buyers, investors, and capital sources, enhancing our ability to create competitive tension in transaction processes.
    `,
  },
  {
    name: "Alliance of M&A Advisors",
    description: "Professional association for M&A professionals",
    logo: "/images/affiliations/amaa-logo.png",
    category: "Financial Organizations",
    url: "https://www.amaaonline.com",
    featured: false,
    details: `
      The Alliance of Merger & Acquisition Advisors (AM&AA) is the premiere international organization serving the educational and resource needs of the middle market M&A profession.
      
      Our membership in AM&AA ensures that our team stays current with best practices in M&A advisory services and provides our clients with access to a network of qualified professionals to support their transaction needs.
    `,
  },
  {
    name: "Harvard Business School Alumni Association",
    description: "Network of HBS graduates",
    logo: "/images/affiliations/hbs-logo.png",
    category: "Educational Institutions",
    url: "https://www.alumni.hbs.edu",
    featured: false,
    details: `
      The Harvard Business School Alumni Association connects graduates of one of the world's premier business schools, providing networking, continuing education, and professional development opportunities.
      
      Our founder's active involvement in the HBS Alumni Association provides our clients with access to a global network of business leaders and potential transaction partners.
    `,
  },
  {
    name: "Wharton Private Equity & Venture Capital Association",
    description: "Network for Wharton alumni in private equity",
    logo: "/images/affiliations/wharton-logo.png",
    category: "Educational Institutions",
    url: "https://www.whartonpevca.com",
    featured: false,
    details: `
      The Wharton Private Equity & Venture Capital Association (WPEVCA) is a global organization that connects alumni of the Wharton School who work in the private equity and venture capital industries.
      
      Our connection to WPEVCA provides our clients with access to a network of sophisticated financial buyers and investors who understand the building products and services industry.
    `,
  },
  {
    name: "Goldman Sachs 10,000 Small Businesses",
    description: "Program helping entrepreneurs create jobs and economic opportunity",
    logo: "/images/affiliations/goldman-10k-logo.png",
    category: "Business Development",
    url: "https://www.goldmansachs.com/citizenship/10000-small-businesses/",
    featured: true,
    details: `
      Goldman Sachs 10,000 Small Businesses is an investment to help entrepreneurs create jobs and economic opportunity by providing greater access to education, capital, and business support services.
      
      As a graduate of this program, our founder brings valuable insights and resources to help our clients optimize their businesses for growth and eventual exit.
    `,
  },
  {
    name: "Vistage International",
    description: "Executive coaching and peer advisory organization",
    logo: "/images/affiliations/vistage-logo.png",
    category: "Business Development",
    url: "https://www.vistage.com",
    featured: false,
    details: `
      Vistage is the world's largest executive coaching organization for small and midsize businesses. For more than 60 years, Vistage has been bringing together exclusive groups of CEOs to help them improve their businesses and their lives.
      
      Our active participation in Vistage provides our team with ongoing leadership development and access to a network of successful business leaders who can provide valuable perspectives on strategic transactions.
    `,
  },
  {
    name: "Entrepreneurs' Organization",
    description: "Global network of entrepreneurs",
    logo: "/images/affiliations/eo-logo.png",
    category: "Business Development",
    url: "https://www.eonetwork.org",
    featured: false,
    details: `
      The Entrepreneurs' Organization (EO) is a global, peer-to-peer network of more than 14,000+ influential business owners with 198 chapters in 61 countries. Founded in 1987, EO enables business owners to learn from each other, leading to greater business success and an enriched personal life.
      
      Our involvement with EO connects us with successful entrepreneurs who understand the challenges and opportunities of building and exiting a business, providing valuable insights for our clients.
    `,
  },
  {
    name: "National Association of Manufacturers",
    description: "Largest manufacturing association in the United States",
    logo: "/images/affiliations/nam-logo.png",
    category: "Industry Associations",
    url: "https://www.nam.org",
    featured: true,
    details: `
      The National Association of Manufacturers (NAM) is the largest manufacturing association in the United States, representing small and large manufacturers in every industrial sector and in all 50 states.
      
      Our affiliation with NAM provides our clients with access to industry-specific data, regulatory insights, and networking opportunities that enhance our understanding of manufacturing trends and challenges.
    `,
  },
]

// Get all affiliations
export function getAffiliations(): Affiliation[] {
  return affiliations
}

// Get featured affiliations
export function getFeaturedAffiliations(): Affiliation[] {
  return affiliations.filter((affiliation) => affiliation.featured)
}

// Get affiliation by name (slug)
export function getAffiliation(name: string): Affiliation | undefined {
  return affiliations.find((affiliation) => affiliation.name.toLowerCase().replace(/\s+/g, "-") === name.toLowerCase())
}

// Get affiliations by category
export function getAffiliationsByCategory(category: string): Affiliation[] {
  return affiliations.filter((affiliation) => affiliation.category === category)
}

// Get all categories
export function getAffiliationCategories(): string[] {
  const categories = new Set(affiliations.map((affiliation) => affiliation.category))
  return Array.from(categories)
}
