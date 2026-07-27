import { Category, Product, Service, PublicSettings, LeadRecord } from '../types';

export const INITIAL_SETTINGS: PublicSettings = {
  whatsapp_number: '919876543210',
  business_name: 'BS Smart Solution',
  business_address: '123 Business Park, Guindy, Chennai, Tamil Nadu - 600032',
  business_email: 'info@bssmartsolution.com',
  business_phone: '+91 98765 43210',
};

export const PRODUCT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Packaging Materials', slug: 'packaging-materials', description: 'Corrugated boxes, stretch film, tapes & protective packing solutions.', productCount: 7, icon: 'Package' },
  { id: 'cat-2', name: 'Safety Equipment', slug: 'safety-equipment', description: 'Helmets, safety shoes, high-vis vests, goggles & PPE kits.', productCount: 6, icon: 'ShieldCheck' },
  { id: 'cat-3', name: 'Electrical Supplies', slug: 'electrical-supplies', description: 'Industrial cables, switchgear, LED lighting & distribution boards.', productCount: 6, icon: 'Zap' },
  { id: 'cat-4', name: 'Plumbing Materials', slug: 'plumbing-materials', description: 'CPVC/UPVC pipes, industrial valves, fittings & sanitary hardware.', productCount: 5, icon: 'Wrench' },
  { id: 'cat-5', name: 'Construction Hardware', slug: 'construction-hardware', description: 'Fasteners, scaffolding fittings, cement additives & steel mesh.', productCount: 6, icon: 'Building' },
  { id: 'cat-6', name: 'Industrial Tools', slug: 'industrial-tools', description: 'Power tools, hand tools, cutting wheels & pneumatic equipment.', productCount: 5, icon: 'Hammer' },
  { id: 'cat-7', name: 'Office & IT Hardware', slug: 'office-it-hardware', description: 'Computers, printers, networking racks & workstation accessories.', productCount: 5, icon: 'Monitor' },
  { id: 'cat-8', name: 'Chemicals & Cleaning', slug: 'chemicals-cleaning', description: 'Industrial degreasers, disinfectants, floor cleaners & mops.', productCount: 5, icon: 'Droplets' },
  { id: 'cat-9', name: 'Corporate Gifting', slug: 'corporate-gifting', description: 'Custom branded merchandise, tech gadgets & welcome onboarding kits.', productCount: 5, icon: 'Gift' },
  { id: 'cat-10', name: 'Logistics & Material Handling', slug: 'logistics-material-handling', description: 'Hand pallet trucks, plastic crates, storage bins & trolleys.', productCount: 5, icon: 'Truck' },
];

export const SERVICE_CATEGORIES: Category[] = [
  { id: 'scat-1', name: 'Construction & Interior', slug: 'construction-interior', description: 'Turnkey civil construction, office interiors & renovation services.', serviceCount: 11, kind: 'BUSINESS' },
  { id: 'scat-2', name: 'IT & Digital Solutions', slug: 'it-digital-solutions', description: 'Custom software, cloud infrastructure, networking & IT support.', serviceCount: 10, kind: 'BUSINESS' },
  { id: 'scat-3', name: 'Transport & Logistics', slug: 'transport-logistics', description: 'Pan-India freight transport, warehousing & fleet management.', serviceCount: 8, kind: 'BUSINESS' },
  { id: 'scat-4', name: 'Facility Management', slug: 'facility-management', description: 'Housekeeping, security, HVAC maintenance & pest control.', serviceCount: 7, kind: 'BUSINESS' },
  { id: 'scat-5', name: 'Electrical Engineering', slug: 'electrical-engineering', description: 'Substation maintenance, industrial wiring & transformer service.', serviceCount: 6, kind: 'BUSINESS' },
  { id: 'scat-6', name: 'HVAC & Refrigeration', slug: 'hvac-refrigeration', description: 'Chiller maintenance, duct installation & VRF system service.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-7', name: 'Corporate Legal & Audit', slug: 'corporate-legal-audit', description: 'Taxation, regulatory compliance, legal drafting & statutory audit.', serviceCount: 6, kind: 'BUSINESS' },
  { id: 'scat-8', name: 'HR & Staff Augmentation', slug: 'hr-staff-augmentation', description: 'Manpower supply, payroll management & executive search.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-9', name: 'Solar & Renewable Energy', slug: 'solar-renewable-energy', description: 'Rooftop solar plant design, installation & green energy audit.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-10', name: 'Industrial Printing', slug: 'industrial-printing', description: 'Flex printing, product packaging print, banners & signage.', serviceCount: 4, kind: 'BUSINESS' },
  { id: 'scat-11', name: 'Security & Surveillance', slug: 'security-surveillance', description: 'CCTV installation, access control systems & biometric setup.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-12', name: 'Waste Management', slug: 'waste-management', description: 'Hazardous waste disposal, e-waste recycling & scrap handling.', serviceCount: 4, kind: 'BUSINESS' },
  { id: 'scat-13', name: 'Event Management', slug: 'event-management', description: 'Corporate expos, product launches & AGM event production.', serviceCount: 4, kind: 'BUSINESS' },
  { id: 'scat-14', name: 'Equipment Rental', slug: 'equipment-rental', description: 'Generators, cranes, excavators & aerial work platform rental.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-15', name: 'ISO Certification', slug: 'iso-certification', description: 'ISO 9001, 14001, 45001 audit & consultancy services.', serviceCount: 4, kind: 'BUSINESS' },
  { id: 'scat-16', name: 'Digital Marketing & SEO', slug: 'digital-marketing-seo', description: 'B2B lead generation, search optimization & corporate branding.', serviceCount: 4, kind: 'BUSINESS' },
];

export const SOCIAL_CAUSES: Category[] = [
  { id: 'soc-1', name: 'Food & Hunger Relief', slug: 'food-hunger-relief', description: 'Daily meal distribution to underprivileged urban & rural communities.', serviceCount: 5, kind: 'SOCIAL' },
  { id: 'soc-2', name: 'Education for Children', slug: 'education-for-children', description: 'Sponsoring school fees, books & stationery for low-income kids.', serviceCount: 5, kind: 'SOCIAL' },
  { id: 'soc-3', name: 'Clothing & Blanket Drive', slug: 'clothing-blanket-drive', description: 'Providing warm winter wear and apparel during extreme seasons.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-4', name: 'Digital Literacy Campaign', slug: 'digital-literacy-campaign', description: 'Donating refurbished computers & hosting free coding workshops.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-5', name: 'Clean Drinking Water', slug: 'clean-drinking-water', description: 'Installing community RO water purifiers in rural public schools.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-6', name: 'Healthcare & Medical Camps', slug: 'healthcare-medical-camps', description: 'Free eye checkups, blood donation & health screening camps.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-7', name: 'Tree Plantation & Greenery', slug: 'tree-plantation-greenery', description: 'Urban afforestation, sapling distribution & environmental drives.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-8', name: 'Women Empowerment', slug: 'women-empowerment', description: 'Skill development, tailoring kits & micro-entrepreneurship support.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-9', name: 'Disaster Relief Support', slug: 'disaster-relief-support', description: 'Emergency ration kits & rehabilitation support during flood/cyclone.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-10', name: 'Elderly Care & Support', slug: 'elderly-care-support', description: 'Sponsoring medicines & companion programs for senior citizen homes.', serviceCount: 4, kind: 'SOCIAL' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'heavy-duty-corrugated-boxes',
    name: 'Heavy Duty 7-Ply Corrugated Packing Boxes',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'Industrial grade 7-ply shipping boxes engineered for high burst strength and heavy export shipments.',
    description: 'Our 7-ply corrugated boxes are crafted from top-grade virgin kraft paper. Designed to withstand stacking pressure up to 500 kg during long-distance warehousing and international logistics.',
    specifications: {
      'Material': '7-Ply Virgin Kraft Paper',
      'Bursting Factor': '24 BF',
      'Dimensions': '600 x 400 x 400 mm (Customizable)',
      'Load Capacity': 'Up to 50 kg per box',
      'Recyclable': '100% Eco-friendly'
    },
    moq: '500 Units',
    priceRange: '₹45.00 - ₹95.00 / Box',
    unit: 'Box',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-2',
    slug: 'industrial-safety-helmet',
    name: 'ANSI Certified Industrial Hard Hat Helmet',
    category: 'Safety Equipment',
    categorySlug: 'safety-equipment',
    shortDescription: 'High-density HDPE impact resistant protective helmet with adjustable 6-point ratchet suspension.',
    description: 'Engineered for extreme construction and factory environments. High durability shell with ventilation channels and sweatband for all-day comfortable site operation.',
    specifications: {
      'Standard': 'ANSI Z89.1 & IS 2925 Certified',
      'Material': 'UV Stabilized High-Density Polyethylene',
      'Suspension': '6-Point Textile Ratchet System',
      'Colors': 'Yellow, White, Blue, Orange, Red',
      'Weight': '380 grams'
    },
    moq: '100 Pieces',
    priceRange: '₹180.00 - ₹350.00 / Piece',
    unit: 'Piece',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-3',
    slug: '3-phase-armoured-copper-cable',
    name: '3.5 Core XLPE Armoured Underground Cable',
    category: 'Electrical Supplies',
    categorySlug: 'electrical-supplies',
    shortDescription: 'Heavy-duty 1.1kV cross-linked polyethylene insulated aluminium/copper power distribution cable.',
    description: 'Designed for sub-main power distribution in factory plants, commercial complexes, and infrastructure projects. High temperature tolerance and flame-retardant sheath.',
    specifications: {
      'Voltage Rating': '1100 Volts (1.1 kV)',
      'Conductor': 'Class 2 Stranded Pure Copper/Aluminium',
      'Insulation': 'XLPE (Cross-linked Polyethylene)',
      'Armouring': 'Galvanized Steel Strip / Wire',
      'Standard': 'IS 7098 Part 1'
    },
    moq: '100 Meters',
    priceRange: '₹320.00 - ₹1,450.00 / Meter',
    unit: 'Meter',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-4',
    slug: 'cpvc-heavy-duty-industrial-pipe',
    name: 'SDR 11 Heavy Duty CPVC Pressure Pipe System',
    category: 'Plumbing Materials',
    categorySlug: 'plumbing-materials',
    shortDescription: 'Corrosion resistant high-pressure hot & cold water CPVC pipes for industrial chemical processing.',
    description: 'Engineered to handle aggressive liquids, high temperature hot water systems, and industrial fluid transmission without scale buildup or degradation.',
    specifications: {
      'Pressure Rating': 'SDR 11 (28.1 kg/cm² at 23°C)',
      'Temperature Range': 'Up to 93°C (200°F)',
      'Sizes Available': '1/2 inch to 4 inches',
      'Standard': 'ASTM F441 / IS 15778',
      'Life Expectancy': '50+ Years'
    },
    moq: '50 Lengths (3m)',
    priceRange: '₹210.00 - ₹980.00 / Length',
    unit: 'Length',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-5',
    slug: 'transparent-stretch-wrap-film',
    name: '23 Micron Machine Grade Pallet Stretch Film',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'High elongation LLDPE stretch film roll for secure pallet wrapping and cargo stabilization.',
    description: 'Superior puncture resistance and stretch capability up to 300%. Keeps pallets tightly unitized during rough transit and protects goods against moisture and dust.',
    specifications: {
      'Thickness': '23 Micron',
      'Roll Width': '500 mm',
      'Roll Length': '1500 Meters',
      'Material': '100% Cast LLDPE',
      'Color': 'Clear Transparent'
    },
    moq: '20 Rolls',
    priceRange: '₹850.00 - ₹1,200.00 / Roll',
    unit: 'Roll',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-6',
    slug: 'steel-toe-leather-safety-shoes',
    name: 'S3 Grade Steel Toe Leather Safety Work Boots',
    category: 'Safety Equipment',
    categorySlug: 'safety-equipment',
    shortDescription: 'Water-resistant genuine leather safety footwear with 200J steel toe cap and anti-skid PU sole.',
    description: 'Breathable full-grain leather construction with shock-absorbing dual density polyurethane sole. Perfect for warehousing, oil rigs, and manufacturing plants.',
    specifications: {
      'Toe Protection': '200 Joules Steel Toe Cap',
      'Upper Material': 'Genuine Water-Resistant Leather',
      'Sole': 'Dual Density Anti-Slip PU Sole',
      'Standard': 'EN ISO 20345:2011 S3 / IS 15298',
      'Sizes': '6 UK to 12 UK'
    },
    moq: '50 Pairs',
    priceRange: '₹750.00 - ₹1,450.00 / Pair',
    unit: 'Pair',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-7',
    slug: 'led-high-bay-warehouse-light',
    name: '150W IP65 High Bay Industrial LED Light',
    category: 'Electrical Supplies',
    categorySlug: 'electrical-supplies',
    shortDescription: 'Energy-saving 150LM/W die-cast aluminium UFO high bay fixture for factories and cold storage.',
    description: 'Delivers 22,500 lumens of continuous shadow-free illumination. Built with Meanwell driver and surge protection to withstand voltage fluctuations.',
    specifications: {
      'Wattage': '150 Watts',
      'Luminous Flux': '22,500 Lumens (150 lm/W)',
      'IP Rating': 'IP65 Water & Dust Proof',
      'Color Temp': '6500K Cool Daylight',
      'Warranty': '5 Years Full Replacement'
    },
    moq: '20 Units',
    priceRange: '₹2,400.00 - ₹3,800.00 / Unit',
    unit: 'Unit',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80',
    featured: false
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 'serv-1',
    slug: 'turnkey-commercial-interior-fitout',
    name: 'Turnkey Commercial Office Interior & Civil Fitout',
    category: {
      name: 'Construction & Interior',
      slug: 'construction-interior',
      kind: 'BUSINESS'
    },
    shortDescription: 'Complete end-to-end design, civil partition, modular furniture, MEP & acoustic ceiling installation.',
    description: 'We transform raw commercial spaces into state-of-the-art office spaces. Our turnkey execution handles architectural planning, HVAC ducting, glass partitions, ergonomic workstations, and compliance approvals.',
    priceLabel: 'STARTING_FROM',
    priceValue: '₹1,200 / Sq.Ft.',
    coverageArea: 'Pan South India (Tamil Nadu, Karnataka, Telangana, Kerala)',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'serv-2',
    slug: 'cloud-infrastructure-cybersecurity-audit',
    name: 'Enterprise Cloud Migration & Cybersecurity Setup',
    category: {
      name: 'IT & Digital Solutions',
      slug: 'it-digital-solutions',
      kind: 'BUSINESS'
    },
    shortDescription: 'AWS/Azure cloud architecture design, DevOps deployment, firewall configuration & SOC monitoring.',
    description: 'Empower your company with robust, scalable cloud infrastructure. Includes 24/7 network uptime monitoring, automated disaster recovery backups, zero-trust security architecture, and SOC audit.',
    priceLabel: 'ON_INSPECTION',
    priceValue: 'Custom Proposal Basis',
    coverageArea: 'Global / Remote & On-Site Support',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'serv-3',
    slug: 'pan-india-freight-warehousing-logistics',
    name: 'Pan-India FTL Freight Transport & Cold Storage',
    category: {
      name: 'Transport & Logistics',
      slug: 'transport-logistics',
      kind: 'BUSINESS'
    },
    shortDescription: 'Full truck load (FTL) logistics, GPS-tracked container transport & bonded warehouse storage.',
    description: 'Reliable freight logistics with a managed fleet of 32ft multi-axle container trucks. Integrated GPS real-time tracking, cargo insurance, and automated warehouse inventory management.',
    priceLabel: 'STARTING_FROM',
    priceValue: '₹45 / Km',
    coverageArea: 'All 28 States & Union Territories of India',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'serv-4',
    slug: 'corporate-facility-housekeeping-security',
    name: 'Integrated Corporate Facility Management & Security',
    category: {
      name: 'Facility Management',
      slug: 'facility-management',
      kind: 'BUSINESS'
    },
    shortDescription: 'Uniformed security guards, deep sanitization housekeeping, landscaping & building maintenance.',
    description: 'Complete operational support for corporate IT parks, factories, and residential gated communities. Trained staff compliance with PF, ESI, and labor regulations.',
    priceLabel: 'FIXED',
    priceValue: '₹22,000 / Staff / Month',
    coverageArea: 'Chennai, Bengaluru, Hyderabad, Coimbatore',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  // Social Initiative Service
  {
    id: 'serv-5',
    slug: 'community-daily-meal-distribution-drive',
    name: 'Annadhanam Daily Meal & Nutrition Relief Drive',
    category: {
      name: 'Food & Hunger Relief',
      slug: 'food-hunger-relief',
      kind: 'SOCIAL'
    },
    shortDescription: 'Providing hygienic, freshly cooked nutritious meals daily to homeless families and hospital attendants.',
    description: 'BS Smart Solution Social Wing conducts daily hot meal distribution across government hospitals and urban shelters. Join as a volunteer or sponsor meals.',
    priceLabel: 'FIXED',
    priceValue: 'Free Community Initiative',
    coverageArea: 'Chennai Urban & Suburb Districts',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'serv-6',
    slug: 'rural-school-digital-lab-donation',
    name: 'Rural School Computer Lab & Coding Workshop Drive',
    category: {
      name: 'Digital Literacy Campaign',
      slug: 'digital-literacy-campaign',
      kind: 'SOCIAL'
    },
    shortDescription: 'Setting up refurbished computer labs and conducting weekend basic IT literacy classes for rural children.',
    description: 'Bridging the digital divide in government village schools by providing hardware, internet connectivity, and volunteer weekend instructors.',
    priceLabel: 'FIXED',
    priceValue: 'Free Community Initiative',
    coverageArea: 'Rural Tamil Nadu & Border Districts',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    featured: true
  }
];

export const MOCK_LEADS: LeadRecord[] = [
  {
    id: 'lead-101',
    name: 'Rajesh Kumar',
    phone: '9840123456',
    email: 'rajesh@apexindustries.in',
    enquiryType: 'PRODUCT',
    productId: 'prod-1',
    productName: 'Heavy Duty 7-Ply Corrugated Packing Boxes',
    quantity: '2000 Boxes',
    message: 'Need urgent quote for monthly supply of export corrugated boxes.',
    status: 'NEW',
    createdAt: '2026-07-26T10:30:00Z'
  },
  {
    id: 'lead-102',
    name: 'Anitha Ramesh',
    phone: '9790987654',
    email: 'anitha@techspaces.com',
    enquiryType: 'SERVICE',
    serviceId: 'serv-1',
    serviceName: 'Turnkey Commercial Office Interior & Civil Fitout',
    quantity: '15000 Sq.Ft.',
    message: 'Looking for turnkey interior fitout for our new office branch in Guindy.',
    status: 'IN_PROGRESS',
    createdAt: '2026-07-25T14:15:00Z'
  },
  {
    id: 'lead-103',
    name: 'Suresh Babu',
    phone: '9176543210',
    email: 'suresh@greenbuild.org',
    enquiryType: 'GENERAL',
    message: 'Want to partner with BS Smart Solution for bulk electrical hardware supply.',
    status: 'CONTACTED',
    createdAt: '2026-07-24T09:00:00Z'
  }
];
