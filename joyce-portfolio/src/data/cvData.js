export const profile = {
  name: 'Joyce Alam',
  role: 'Full Stack Developer · Shopify Developer',
  location: 'Zahle, Lebanon',
  phone: '+961 81 210 560',
  email: 'joyce3alam@gmail.com',
  linkedin: 'https://linkedin.com/in/joyce-alam-a0a53a209',
  available: true,
  headline: ['Full-stack', 'systems', 'for', 'healthcare', '&', 'commerce.'],
  lead:
    'I build web and mobile products end to end. Most recently LbCare, a doctor-facing healthcare web and mobile app built with the team at DigiLab Solutions — and, alongside it, Shopify storefronts that stay compliant and convert.',
  summary:
    "I build web and mobile applications end to end. At DigiLab Solutions I worked on LbCare, a healthcare web and mobile app with an AI-based medicine interaction checker, built with React, React Native, Node.js and PostgreSQL. On the e-commerce side, I keep Shopify stores compliant with Google Merchant Center and fix the data and storefront issues that get in the way of sales.",
}

export const skillGroups = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C/C++', 'C#'],
  },
  {
    label: 'Frontend & Mobile',
    items: ['React.js', 'React Native', 'HTML5', 'CSS3', 'AJAX', 'jQuery', 'Bootstrap'],
  },
  {
    label: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'REST APIs', 'ASP.NET MVC'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB'],
  },
  {
    label: 'Shopify & E-Commerce',
    items: ['Shopify Development', 'Google Merchant Center Compliance', 'Product Data Management', 'Storefront Customization'],
  },
  {
    label: 'Microsoft 365',
    items: ['Power Apps', 'Power Automate', 'SharePoint', 'SPFx'],
  },
  {
    label: 'Cloud & Tools',
    items: ['Azure', 'IIS', 'Git', 'Visual Studio', 'VS Code'],
  },
  {
    label: 'Data & AI',
    items: ['Power BI', 'Machine Learning Fundamentals', 'NLP Fundamentals'],
  },
  {
    label: 'Embedded & Automation',
    items: ['Arduino', 'Raspberry Pi', 'PLC Programming'],
  },
]

export const experience = [
  {
    role: 'Shopify Developer',
    company: 'Trust ADS s.r.o.',
    location: 'Czech Republic',
    period: 'Sep 2025 — Present',
    points: [
      'Ensure Shopify stores comply with Google Merchant Center requirements and platform policies.',
      'Audit and correct product data, broken links, storefront issues, and catalog-related problems.',
      'Perform front-end customization and functionality improvements across Shopify stores.',
      'Create visual content and promotional banners using Canva.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'DigiLab Solutions',
    location: 'Fanar, Lebanon (Hybrid)',
    period: 'Feb 2026 — Aug 2026',
    points: [
      'Built LbCare, a healthcare web and mobile application, from the ground up with a development team.',
      'Developed the doctor-facing web app in React.js and the mobile app in React Native.',
      'Built and maintained the shared backend and REST APIs with Node.js and Express.js, backed by PostgreSQL.',
      "Worked on the doctors' side of the product, implementing the workflows doctors rely on day to day.",
      'Contributed to architecture, testing, debugging, deployment, Agile ceremonies, Git workflows and code review.',
      "Worked on an AI-based medicine interaction model that checks a newly prescribed medicine against a patient's existing medicines and alerts the doctor to potential interactions.",
    ],
  },
  {
    role: 'Shopify Developer',
    company: 'Adon Technologies',
    location: 'Lebanon',
    period: 'May 2025 — Sep 2025',
    points: [
      'Optimized Shopify stores and supported Google Merchant Center compliance.',
      'Fixed broken pages, product issues, and user experience problems.',
      'Performed front-end adjustments and created visual banners.',
    ],
  },
  {
    role: 'IT Support',
    company: 'Mimosa Sanitary Paper Co.',
    location: 'Lebanon',
    period: 'Jan 2025 — May 2025',
    points: [
      'Maintained Windows and Ubuntu systems, providing technical troubleshooting and user support.',
      'Assisted ERP migration activities, including Odoo data preparation and business data handling.',
      'Supported ERP-related processes and developed familiarity with accounting and business workflows.',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'Win Deep Tech',
    location: 'Lebanon',
    period: 'Feb 2024 — May 2024',
    points: [
      'Developed full-stack applications using ASP.NET MVC, C#, JavaScript, HTML, CSS and SQL Server.',
      'Worked with jQuery, Bootstrap, DataTables, Select2, modals and SweetAlert.',
    ],
  },
]

export const education = [
  {
    degree: "Master's in Computer Science",
    school: 'Lebanese University, Faculty of Science, Fanar',
    period: '2025 — Present',
  },
  {
    degree: 'BSc in Computer Science',
    school: 'Lebanese University, Faculty of Science, Fanar',
    period: '2022 — 2025',
    note: 'Relevant areas: Machine Learning, NLP, Cloud Computing, Networking, MongoDB, Flutter, Java.',
  },
]

export const certifications = [
  { name: 'NDG Linux Essentials', org: 'Cisco Networking Academy' },
  { name: 'Introduction to Cybersecurity', org: 'Cisco Networking Academy' },
  { name: 'Power BI Workshop', org: 'BMB Smart' },
  { name: 'Raspberry Pi Training', org: 'Michel Daher Foundation' },
  { name: 'Robotics (Arduino) Training', org: 'DOT Lebanon' },
  { name: 'Accounting Essentials & Bookkeeping', org: 'PRO Training Center' },
  { name: 'PLC Programming (Beginner)', org: 'Engineering Solutions' },
]

export const stats = [
  { value: '05', label: 'Professional roles', sub: 'Healthcare, e-commerce & IT' },
  { value: '07', label: 'Certifications', sub: 'Linux, security, BI, robotics' },
  { value: '09', label: 'Stack domains', sub: 'Frontend to embedded' },
]

export const flagship = {
  name: 'LbCare',
  role: 'Full Stack Developer',
  company: 'DigiLab Solutions',
  period: 'Feb 2026 — Aug 2026',
  summary:
    'A healthcare web and mobile application, built from the ground up with the team at DigiLab Solutions. I worked across the stack — the doctor-facing web app, the React Native mobile app, and the shared Node.js API behind both.',
  facets: [
    {
      label: 'Web',
      title: 'Doctor-facing web application',
      detail:
        'Built the React.js app doctors use day to day, implementing the workflows the product is built around.',
      tags: ['React.js', 'REST APIs'],
    },
    {
      label: 'Mobile',
      title: 'React Native companion app',
      detail:
        'The mobile side of the same platform, sharing the backend and API layer with the web app.',
      tags: ['React Native', 'Express.js'],
    },
    {
      label: 'AI',
      title: 'Medicine interaction checker',
      detail:
        "Worked on the model that checks a newly prescribed medicine against a patient's existing medicines and alerts the doctor to potential interactions.",
      tags: ['Node.js', 'PostgreSQL'],
    },
  ],
}

/**
 * What she builds, said plainly in the banner. Class names are written out in
 * full because Tailwind scans source text — a template like `bg-${accent}`
 * would be purged from the stylesheet.
 */
export const domains = [
  { label: 'Web apps', dot: 'bg-mint' },
  { label: 'Mobile apps', dot: 'bg-iris' },
  { label: 'Shopify storefronts', dot: 'bg-rose' },
  { label: 'Embedded & robotics', dot: 'bg-solar' },
]

/**
 * The areas she works in. `origin` is deliberate: Professional means paid work
 * on the CV, Training means a certified course, Academic means degree
 * coursework. Stating it keeps the breadth honest instead of implying five
 * years of robotics.
 */
export const domainAreas = [
  {
    glyph: 'web',
    label: 'Websites',
    title: 'Web applications',
    detail: 'React front ends over Node and Express APIs, built from the data model up.',
    tags: ['React.js', 'Node.js', 'PostgreSQL'],
    origin: 'Professional',
  },
  {
    glyph: 'app',
    label: 'Apps',
    title: 'Mobile applications',
    detail: 'React Native apps sharing one backend and API layer with the web client.',
    tags: ['React Native', 'REST APIs'],
    origin: 'Professional',
  },
  {
    glyph: 'shop',
    label: 'Commerce',
    title: 'Shopify storefronts',
    detail:
      'Storefront customisation, product data, and keeping catalogues compliant with Google Merchant Center.',
    tags: ['Shopify', 'Merchant Center'],
    origin: 'Professional',
  },
  {
    glyph: 'robot',
    label: 'Robotics',
    title: 'Arduino & robotics',
    detail: 'Microcontroller programming and robotics fundamentals, from the DOT Lebanon training on.',
    tags: ['Arduino', 'C/C++'],
    origin: 'Training',
  },
  {
    glyph: 'iot',
    label: 'IoT',
    title: 'Raspberry Pi & PLC',
    detail: 'Single-board computers and industrial controllers — the automation end of the stack.',
    tags: ['Raspberry Pi', 'PLC'],
    origin: 'Training',
  },
  {
    glyph: 'data',
    label: 'Data & AI',
    title: 'Python, ML & BI',
    detail: 'Machine learning and NLP fundamentals from the CS degree, plus Power BI reporting.',
    tags: ['Python', 'Power BI'],
    origin: 'Academic',
  },
]
