import { Category, Product, Service, PublicSettings, LeadRecord } from '../types';

export const INITIAL_SETTINGS: PublicSettings = {
  whatsapp_number: '919876543210',
  business_name: 'BS Smart Solution',
  business_address: '123 Business Park, Guindy, Chennai, Tamil Nadu - 600032',
  business_email: 'info@bssmartsolution.com',
  business_phone: '+91 98765 43210',
};

// ==========================================
// 1. PRODUCT CATEGORIES & ITEMS
// ==========================================
export const PRODUCT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Packaging Materials', slug: 'packaging-materials', description: 'Corrugated boxes, courier bags, bubble wrap, stretch film & paper bags for e-commerce and warehouses.', productCount: 7, icon: 'Package' },
  { id: 'cat-2', name: 'Safety Products', slug: 'safety-products', description: 'Safety gloves, helmets, reflective jackets, safety shoes & face masks for construction & factories.', productCount: 5, icon: 'ShieldCheck' },
  { id: 'cat-3', name: 'Cleaning & Housekeeping Supplies', slug: 'cleaning-housekeeping-supplies', description: 'Cleaning chemicals, floor cleaners, toilet cleaners, mops, brooms & garbage bags for hotels & offices.', productCount: 6, icon: 'Droplets' },
  { id: 'cat-4', name: 'Electrical Products', slug: 'electrical-products', description: 'LED lights, switches, wires, extension boards & fans for builders, contractors & electricians.', productCount: 5, icon: 'Zap' },
  { id: 'cat-5', name: 'Plumbing Materials', slug: 'plumbing-materials', description: 'PVC pipes, taps, valves & bathroom fittings for plumbers and construction contractors.', productCount: 4, icon: 'Wrench' },
  { id: 'cat-6', name: 'Office Supplies', slug: 'office-supplies', description: 'Printer paper, pens, files, registers & toners for corporate offices and educational institutes.', productCount: 5, icon: 'Monitor' },
  { id: 'cat-7', name: 'Hotel & Restaurant Supplies', slug: 'hotel-restaurant-supplies', description: 'Disposable cups, food containers, tissues, kitchen gloves & food packaging supplies.', productCount: 5, icon: 'Gift' },
  { id: 'cat-8', name: 'Industrial Tools', slug: 'industrial-tools', description: 'Drill machines, hand tools, measuring tools, fasteners & industrial lubricants for workshops.', productCount: 5, icon: 'Hammer' },
  { id: 'cat-9', name: 'Promotional & Corporate Products', slug: 'promotional-corporate-products', description: 'Custom printed T-shirts, caps, mugs, pens, ID cards & corporate gifting items.', productCount: 6, icon: 'Gift' },
  { id: 'cat-10', name: 'Furniture & Interior Products', slug: 'furniture-interior-products', description: 'Ergonomic office chairs, tables, modular workstations, window blinds & decorative panels.', productCount: 5, icon: 'Building' },
];

export const MOCK_PRODUCTS: Product[] = [
  // --- Packaging Materials ---
  {
    id: 'prod-101',
    slug: 'corrugated-boxes',
    name: 'Heavy Duty Corrugated Shipping Boxes',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'Industrial grade 3-ply and 7-ply corrugated boxes engineered for high burst strength and heavy shipments.',
    description: 'Our corrugated boxes are crafted from top-grade kraft paper. Designed to withstand stacking pressure during warehousing and logistics. Target Customers: E-commerce sellers, manufacturers, warehouses.',
    specifications: { 'Target Customers': 'E-commerce sellers, manufacturers, warehouses', 'Ply Rating': '3-Ply, 5-Ply & 7-Ply', 'Recyclable': '100% Eco-friendly' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Box',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-102',
    slug: 'courier-bags',
    name: 'Tamper Evident Courier Bags & Poly Mailers',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'Self-adhesive tamper-proof courier mailer bags for secure e-commerce product dispatch.',
    description: 'High-tensile poly mailers with strong peel-and-seal adhesive strip. Water-resistant and tear-proof protection for online parcel shipping.',
    specifications: { 'Target Customers': 'E-commerce sellers, logistics partners', 'Adhesive': 'Permanent hot-melt tape', 'Waterproof': 'Yes' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Pack',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-103',
    slug: 'bubble-wrap',
    name: 'Shock Absorbent Air Bubble Wrap Roll',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'High cushioning air bubble roll for fragile goods, electronics, and glassware protection.',
    description: 'Heavy duty polyethylene air bubble film providing maximum impact absorption during transit and handling.',
    specifications: { 'Target Customers': 'Warehouses, glass & electronics shippers', 'Roll Width': '1 Meter / 1.5 Meters', 'Feature': 'High Air Retention' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Roll',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-104',
    slug: 'stretch-film',
    name: 'Machine Grade Pallet Stretch Film Wrap',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'High-stretch LLDPE pallet wrapping film for cargo unitization and moisture resistance.',
    description: 'Superior puncture resistance stretch film designed for wrapping heavy pallets in industrial plants and freight depots.',
    specifications: { 'Thickness': '23 Micron', 'Stretchability': 'Up to 300%', 'Material': 'Cast LLDPE' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Roll',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-105',
    slug: 'packing-tape',
    name: 'BOPP Self Adhesive Industrial Packaging Tape',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'High tack acrylic adhesive BOPP carton sealing tapes in brown, transparent, and custom printed logo formats.',
    description: 'Durable tape with excellent holding power across hot and cold storage conditions.',
    specifications: { 'Width': '48 mm / 72 mm', 'Adhesive': 'Water-based Acrylic', 'Colors': 'Brown, Clear, Custom Logo' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Box',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-106',
    slug: 'paper-bags',
    name: 'Eco-Friendly Kraft Paper Shopping Bags',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'Biodegradable brown and white kraft paper bags with twisted handle for retail & takeaway.',
    description: 'Sustainable packaging solution for retail stores, boutiques, and eco-conscious businesses.',
    specifications: { 'GSM': '120 - 150 GSM Kraft Paper', 'Handles': 'Twisted Paper Handle', 'Eco Rating': '100% Recyclable' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Pack',
    image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-107',
    slug: 'zip-lock-pouches',
    name: 'Resealable Transparent Zip-Lock Pouches',
    category: 'Packaging Materials',
    categorySlug: 'packaging-materials',
    shortDescription: 'Heavy-duty airtight zip-lock polythene bags for hardware parts, food, and small items.',
    description: 'Re-closable seal pouches keeping moisture out and contents securely organized.',
    specifications: { 'Material': 'Food-Grade LDPE', 'Seal Type': 'Press & Lock Zipper', 'Transparency': 'High Clarity' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Pack',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Safety Products ---
  {
    id: 'prod-201',
    slug: 'safety-gloves',
    name: 'Cut Resistant Nitrile Coated Safety Gloves',
    category: 'Safety Products',
    categorySlug: 'safety-products',
    shortDescription: 'High-grip anti-slip safety work gloves for industrial assembly, handling, and construction.',
    description: 'Ergonomic hand protection with oil-resistant nitrile palm coating. Target Customers: Construction companies, factories, warehouses.',
    specifications: { 'Target Customers': 'Construction companies, factories, warehouses', 'Coating': 'Nitrile / PU', 'Rating': 'EN388 Cut Level 3/5' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Pair',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-202',
    slug: 'safety-helmets',
    name: 'ANSI Certified Industrial Safety Hard Hat Helmet',
    category: 'Safety Products',
    categorySlug: 'safety-products',
    shortDescription: 'HDPE impact resistant protective site helmet with 6-point ratchet suspension.',
    description: 'Engineered for construction sites and factory floors. High impact protection with ventilation channels and sweatband.',
    specifications: { 'Standard': 'IS 2925 & ANSI Z89.1', 'Material': 'High-Density Polyethylene', 'Suspension': '6-Point Ratchet' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Piece',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-203',
    slug: 'reflective-jackets',
    name: 'High Visibility Reflective Safety Vests & Jackets',
    category: 'Safety Products',
    categorySlug: 'safety-products',
    shortDescription: 'Neon safety vest with 3M reflective tape for night visibility and road work safety.',
    description: 'Lightweight polyester mesh vest with high intensity reflective strips ensuring 360-degree night visibility.',
    specifications: { 'Reflective Tape': '2-inch High Visibility Tape', 'Standard': 'EN ISO 20471 Class 2', 'Colors': 'Neon Yellow, Orange' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Piece',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-204',
    slug: 'safety-shoes',
    name: 'Steel Toe Leather Industrial Safety Boots',
    category: 'Safety Products',
    categorySlug: 'safety-products',
    shortDescription: 'Water-resistant genuine leather safety shoes with 200J steel toe cap and anti-skid PU sole.',
    description: 'Durable protective footwear engineered against sharp objects, impacts, and slip hazards in manufacturing plants.',
    specifications: { 'Toe Cap': '200 Joules Steel Toe', 'Sole': 'Dual Density Oil Resistant PU', 'Standard': 'IS 15298 / EN 20345' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Pair',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-205',
    slug: 'face-masks',
    name: 'N95 Respirator & 3-Ply Protective Face Masks',
    category: 'Safety Products',
    categorySlug: 'safety-products',
    shortDescription: 'High filtration multi-layer face protection masks against dust, particulate matter, and airborne contaminants.',
    description: 'Certified dust and virus protective masks with ultrasonic welded ear loops and adjustable nose clip.',
    specifications: { 'Filtration Efficiency': '≥95% (0.3 Micron Particles)', 'Layers': '5 Layer / 3-Ply Meltblown', 'Comfort': 'Breathable Design' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Box',
    image: 'https://images.unsplash.com/photo-1586942593568-29364ef87860?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Cleaning & Housekeeping Supplies ---
  {
    id: 'prod-301',
    slug: 'cleaning-chemicals',
    name: 'Industrial Grade Multi-Surface Cleaning Chemicals',
    category: 'Cleaning & Housekeeping Supplies',
    categorySlug: 'cleaning-housekeeping-supplies',
    shortDescription: 'Concentrated sanitizers, glass cleaners, degreasers, and surface disinfectants.',
    description: 'High efficiency commercial cleaning formulations for hospitals, hotels, and office facilities. Target Customers: Hotels, hospitals, offices, schools.',
    specifications: { 'Target Customers': 'Hotels, hospitals, offices, schools', 'Formulation': 'Eco-Friendly Concentrate', 'Volume': '5 Liters / 20 Liters Cans' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Can',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-302',
    slug: 'floor-cleaners',
    name: 'Heavy Duty Floor Sanitizers & Disinfectants',
    category: 'Cleaning & Housekeeping Supplies',
    categorySlug: 'cleaning-housekeeping-supplies',
    shortDescription: 'Fragranced deep floor cleaning solution suitable for marble, tile, epoxy, and concrete floors.',
    description: 'Removes stubborn grime and kills 99.9% germs while leaving a long-lasting pleasant citrus/pine scent.',
    specifications: { 'pH Level': 'Neutral 7.0', 'Kill Rate': '99.9% Germ Protection', 'Dilution Ratio': '1:50 Water Mix' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Can',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-303',
    slug: 'mops-and-brooms',
    name: 'Commercial Microfiber Wet Mops & Heavy Brooms',
    category: 'Cleaning & Housekeeping Supplies',
    categorySlug: 'cleaning-housekeeping-supplies',
    shortDescription: 'Heavy-duty clip mops, floor squeegees, and hard-bristle outdoor brooms for janitorial staff.',
    description: 'Durable stainless steel handles with high absorbency washable microfiber mop heads.',
    specifications: { 'Mop Material': 'Microfiber / Cotton Yarn', 'Handle': 'Telescopic Stainless Steel', 'Durability': 'Commercial Grade' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Set',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-304',
    slug: 'garbage-bags',
    name: 'Heavy Duty Industrial Waste Garbage Bags',
    category: 'Cleaning & Housekeeping Supplies',
    categorySlug: 'cleaning-housekeeping-supplies',
    shortDescription: 'Puncture-resistant black, green, and blue trash bin liners for office and hotel bio-waste management.',
    description: 'Leak-proof bottom sealed heavy duty poly trash bags in sizes from 10 liters to 120 liters.',
    specifications: { 'Sizes': 'Small, Medium, Large, XL (30x40 inches)', 'Sealing': 'Star Seal Leak Proof', 'Color Coding': 'Bio-waste compliant' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Pack',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Electrical Products ---
  {
    id: 'prod-401',
    slug: 'commercial-led-lighting',
    name: 'High Lumen Commercial LED Panel & High Bay Lights',
    category: 'Electrical Products',
    categorySlug: 'electrical-products',
    shortDescription: 'Energy-efficient LED ceiling panels, spotlights, and industrial UFO high bay fixtures.',
    description: 'Delivers bright shadow-free lighting with up to 80% energy savings for offices, factories, and commercial buildings. Target Customers: Electricians, builders, contractors.',
    specifications: { 'Target Customers': 'Electricians, builders, contractors', 'Wattage': '18W to 150W', 'Lumen Efficiency': '130 lm/W' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Piece',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-402',
    slug: 'modular-switches',
    name: 'Modular Electrical Switches & Sockets Set',
    category: 'Electrical Products',
    categorySlug: 'electrical-products',
    shortDescription: 'Flame-retardant polycarbonate modular switches, MCBs, and socket plates for residential & office buildings.',
    description: 'Modern aesthetic touch switches engineered for 100,000+ clicks with heavy-duty silver brass contacts.',
    specifications: { 'Material': 'Fire Retardant Polycarbonate', 'Rating': '6A / 16A / 25A', 'Standard': 'IS 3854 Certified' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Box',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'prod-403',
    slug: 'copper-wires-cables',
    name: 'FR-LSH Insulated Copper Building Wires & Power Cables',
    category: 'Electrical Products',
    categorySlug: 'electrical-products',
    shortDescription: 'Multi-strand 99.97% pure electrolytic copper house wiring cables with Flame Retardant Low Smoke (FR-LSH) sheath.',
    description: 'Certified electrical wiring for safe commercial and domestic installations.',
    specifications: { 'Conductor': '99.97% Bare Electrolytic Copper', 'Gauge Range': '0.75 sq mm to 10 sq mm', 'Standard': 'IS 694' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Roll',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Plumbing Materials ---
  {
    id: 'prod-501',
    slug: 'pvc-cpvc-pipes',
    name: 'Heavy Duty UPVC / CPVC Plumbing Pipes & Fittings',
    category: 'Plumbing Materials',
    categorySlug: 'plumbing-materials',
    shortDescription: 'High-pressure lead-free CPVC and UPVC pipes for hot & cold water distribution.',
    description: 'Corrosion resistant pressure pipes and elbows engineered for lifetime leak-free plumbing. Target Customers: Plumbers, builders, contractors.',
    specifications: { 'Target Customers': 'Plumbers, builders, contractors', 'Pressure Rating': 'SDR 11 / SCH 40 / SCH 80', 'Standard': 'ASTM D1785 / IS 15778' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Length',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-502',
    slug: 'taps-valves-fittings',
    name: 'Brass & Stainless Steel Plumbing Taps & Gate Valves',
    category: 'Plumbing Materials',
    categorySlug: 'plumbing-materials',
    shortDescription: 'Industrial ball valves, bib cocks, wall mixers, and sanitary chrome fittings.',
    description: 'Precision machined brass valves and chrome-finished taps engineered against scale deposit and drip leaks.',
    specifications: { 'Body Material': 'Forged Brass / SS304', 'Finish': 'Triple Chrome Plated', 'Pressure Capacity': '16 Bar' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Piece',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Office Supplies ---
  {
    id: 'prod-601',
    slug: 'printer-paper-stationery',
    name: 'Premium 75/80 GSM A4 Copier Paper & Files',
    category: 'Office Supplies',
    categorySlug: 'office-supplies',
    shortDescription: 'High brightness jam-free A4 copier paper reams, lever arch files, pens, and registers.',
    description: 'Smooth ultra-white 80 GSM paper for high-speed laser printing and office documentation. Target Customers: Offices, schools, colleges.',
    specifications: { 'Target Customers': 'Offices, schools, colleges', 'Paper Size': 'A4 (210 x 297 mm)', 'Brightness': '98% ISO Brightness' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Ream',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'prod-602',
    slug: 'printer-toners-cartridges',
    name: 'High Yield Laser Printer Toner Cartridges',
    category: 'Office Supplies',
    categorySlug: 'office-supplies',
    shortDescription: 'Compatible and OEM laserjet toner cartridges for HP, Canon, Brother, and Xerox printers.',
    description: 'Delivers crisp black text printing with high page yields for commercial office printers.',
    specifications: { 'Page Yield': 'Up to 3,000 Pages', 'Compatibility': 'Major Laser Printer Brands', 'Print Quality': 'Smudge-Proof Black' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Piece',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Hotel & Restaurant Supplies ---
  {
    id: 'prod-701',
    slug: 'disposable-food-containers',
    name: 'Microwave Safe Food Delivery Containers & Cups',
    category: 'Hotel & Restaurant Supplies',
    categorySlug: 'hotel-restaurant-supplies',
    shortDescription: 'Leak-proof plastic meal trays, eco paper cups, aluminum foil rolls, and facial tissues.',
    description: 'BPA-free food grade containers with tight snap-fit lids for takeaway and cloud kitchens. Target Customers: Restaurants, catering businesses, hotels.',
    specifications: { 'Target Customers': 'Restaurants, catering businesses, hotels', 'Material': 'Food Grade Polypropylene / Sugarcane Bagasse', 'Microwaveable': 'Yes' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Pack',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Industrial Tools ---
  {
    id: 'prod-801',
    slug: 'industrial-drill-power-tools',
    name: 'Heavy Duty Rotary Hammer Drill & Tool Kit',
    category: 'Industrial Tools',
    categorySlug: 'industrial-tools',
    shortDescription: 'Professional grade electric power drills, angle grinders, hand tools, fasteners, and lubricants.',
    description: 'High torque power tools for metal fabrication, masonry drilling, and workshop operations. Target Customers: Workshops and factories.',
    specifications: { 'Target Customers': 'Workshops and factories', 'Motor Power': '800W - 1200W', 'Chuck Capacity': '13 mm' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Set',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Promotional & Corporate Products ---
  {
    id: 'prod-901',
    slug: 'corporate-branded-tshirts-merchandise',
    name: 'Custom Branded Corporate T-Shirts, Mugs & Welcome Kits',
    category: 'Promotional & Corporate Products',
    categorySlug: 'promotional-corporate-products',
    shortDescription: 'Custom embroidered polo T-shirts, printed caps, metal pens, ceramic mugs & employee ID cards.',
    description: 'Premium custom branded corporate gifts and event promotional giveaways. Target Customers: Companies, event organisers.',
    specifications: { 'Target Customers': 'Companies, event organisers', 'Branding': 'Screen Print / Embroidery / Laser Engraving', 'T-Shirt Fabric': '100% Super Combed Cotton' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Set',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Furniture & Interior Products ---
  {
    id: 'prod-1001',
    slug: 'ergonomic-office-chairs-furniture',
    name: 'Ergonomic Mesh Office Chairs & Executive Workstations',
    category: 'Furniture & Interior Products',
    categorySlug: 'furniture-interior-products',
    shortDescription: 'High-back mesh ergonomic chairs, modular office desks, office blinds, and acoustic wall panels.',
    description: 'Designed for lumbar support and long-hour working comfort in modern corporate offices. Target Customers: Corporate offices, interior designers.',
    specifications: { 'Target Customers': 'Corporate offices, interior designers', 'Mechanism': 'Synchro Tilt with 3D Armrest', 'Base': 'Heavy Chrome / Nylon Base' },
    moq: 'Bulk Supply',
    priceRange: 'Quote on Request',
    unit: 'Piece',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=800&q=80',
    featured: true
  }
];

// ==========================================
// 2. SERVICE CATEGORIES & ITEMS
// ==========================================
export const SERVICE_CATEGORIES: Category[] = [
  { id: 'scat-1', name: 'Construction & Interior', slug: 'construction-interior', description: 'Building Construction, Home Renovation, Civil Contractor, Architecture, Interior Design, False Ceiling, Painting, Flooring & Waterproofing.', serviceCount: 11, kind: 'BUSINESS' },
  { id: 'scat-2', name: 'Plumbing', slug: 'plumbing-services', description: 'Plumbing Installation, Pipe Repair, Water Tank Cleaning, Borewell Services, Bathroom Fittings & Drainage Solutions.', serviceCount: 6, kind: 'BUSINESS' },
  { id: 'scat-3', name: 'Electrical', slug: 'electrical-services', description: 'House Wiring, Commercial Electrical, Solar Installation, CCTV Installation, Inverter & Generator Services.', serviceCount: 7, kind: 'BUSINESS' },
  { id: 'scat-4', name: 'AC & Appliances', slug: 'ac-appliances', description: 'AC Installation & Repair, Refrigerator, Washing Machine, Microwave & TV Repair.', serviceCount: 6, kind: 'BUSINESS' },
  { id: 'scat-5', name: 'Home Services', slug: 'home-services', description: 'House Cleaning, Deep Cleaning, Sofa & Carpet Cleaning, Pest Control & Water Tank Sanitization.', serviceCount: 6, kind: 'BUSINESS' },
  { id: 'scat-6', name: 'Outdoor Services', slug: 'outdoor-services', description: 'Gardening, Landscaping, Tree Cutting & Lawn Maintenance.', serviceCount: 4, kind: 'BUSINESS' },
  { id: 'scat-7', name: 'Transport & Logistics', slug: 'transport-logistics', description: 'Packers & Movers, Mini Truck Rental, Goods Transport, Warehouse Services & Courier Services.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-8', name: 'Industrial & Factory Services', slug: 'industrial-factory-services', description: 'Machine Maintenance, Industrial Cleaning, Factory Fabrication, Electrical Maintenance & Equipment Installation.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-9', name: 'IT & Digital Services', slug: 'it-digital-services', description: 'Website Development, Mobile Apps, AI Solutions, Software, Digital Marketing, SEO & Graphic Design.', serviceCount: 10, kind: 'BUSINESS' },
  { id: 'scat-10', name: 'Creative Services', slug: 'creative-services', description: 'Photography, Videography, Drone Photography, Product Photography & Event Coverage.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-11', name: 'Event Services', slug: 'event-services', description: 'Wedding Decoration, Catering, Sound & Lighting, Stage Setup & Event Management.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-12', name: 'Automobile Services', slug: 'automobile-services', description: 'Car Repair, Bike Repair, Car Wash, Towing & Tyre Services.', serviceCount: 5, kind: 'BUSINESS' },
  { id: 'scat-13', name: 'Business Services', slug: 'business-services', description: 'GST Registration, Company Registration, Accounting, Tax Filing, HR Services & Consulting.', serviceCount: 6, kind: 'BUSINESS' },
  { id: 'scat-14', name: 'Security Services', slug: 'security-services', description: 'Security Guards, CCTV Monitoring, Access Control & Fire Safety Solutions.', serviceCount: 4, kind: 'BUSINESS' },
  { id: 'scat-15', name: 'Healthcare Services', slug: 'healthcare-services', description: 'Home Nursing, Physiotherapy, Ambulance Services & Medical Equipment Rental.', serviceCount: 4, kind: 'BUSINESS' },
  { id: 'scat-16', name: 'Education & Training', slug: 'education-training', description: 'Home Tuition, Computer Training, Spoken English, Skill Development & Corporate Training.', serviceCount: 5, kind: 'BUSINESS' },
];

export const MOCK_SERVICES: Service[] = [
  // --- Construction & Interior ---
  {
    id: 'serv-101',
    slug: 'building-construction-interior-design',
    name: 'Turnkey Building Construction & Interior Design',
    category: { name: 'Construction & Interior', slug: 'construction-interior', kind: 'BUSINESS' },
    shortDescription: 'Full building construction, home renovation, civil contracting, 3D architectural interior design & waterproofing.',
    description: 'Complete execution covering architectural planning, false ceiling, painting, tiles & flooring, structural welding, and fabrication.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Tamil Nadu, Karnataka, Telangana, Andhra Pradesh',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'serv-102',
    slug: 'home-renovation-painting-flooring',
    name: 'Home Renovation, Painting & Tile Flooring',
    category: { name: 'Construction & Interior', slug: 'construction-interior', kind: 'BUSINESS' },
    shortDescription: 'Professional house painting, modular false ceiling installation, tile laying & civil renovation.',
    description: 'Revamp your home with expert painters, masonry specialists, acoustic ceiling fitters, and skilled tile craftsmen.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'All Major South Indian Cities',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Plumbing ---
  {
    id: 'serv-201',
    slug: 'plumbing-installation-pipe-repair',
    name: 'Plumbing Installation & Water Tank Cleaning Services',
    category: { name: 'Plumbing', slug: 'plumbing-services', kind: 'BUSINESS' },
    shortDescription: 'Complete sanitary plumbing setup, pipe leak repair, borewell service, and overhead tank sanitization.',
    description: 'Experienced master plumbers for bathroom fitting installations, underground drainage clearing, and hydro jet tank cleaning.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Citywide On-site Service',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Electrical ---
  {
    id: 'serv-301',
    slug: 'electrical-house-wiring-solar-cctv',
    name: 'Electrical House Wiring, Solar & CCTV Installation',
    category: { name: 'Electrical', slug: 'electrical-services', kind: 'BUSINESS' },
    shortDescription: 'Certified residential & commercial wiring, rooftop solar panel setup, inverter & CCTV security installation.',
    description: 'Comprehensive electrical contractor team for panel wiring, generator maintenance, LED lighting, and smart inverter setups.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Pan-State On-site Service',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- AC & Appliances ---
  {
    id: 'serv-401',
    slug: 'ac-appliance-installation-repair',
    name: 'AC Installation, Repair & Appliance Maintenance',
    category: { name: 'AC & Appliances', slug: 'ac-appliances', kind: 'BUSINESS' },
    shortDescription: 'Expert AC gas refilling, split/window AC installation, refrigerator, washing machine, microwave & TV repair.',
    description: 'Prompt doorstep technician service for all home and commercial cooling & kitchen appliance brands.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Doorstep Service within 2 Hours',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Home Services ---
  {
    id: 'serv-501',
    slug: 'deep-house-cleaning-pest-control',
    name: 'Deep House Cleaning, Sofa Wash & Pest Control',
    category: { name: 'Home Services', slug: 'home-services', kind: 'BUSINESS' },
    shortDescription: 'Full house sanitization deep cleaning, sofa shampooing, carpet steam wash & termite pest control.',
    description: 'Professional cleaning crews using industrial vacuuming, eco-chemical sanitization, and odorless pest treatments.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Metro Citywide Doorstep Delivery',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Outdoor Services ---
  {
    id: 'serv-601',
    slug: 'gardening-landscaping-lawn-maintenance',
    name: 'Gardening, Landscaping & Lawn Maintenance',
    category: { name: 'Outdoor Services', slug: 'outdoor-services', kind: 'BUSINESS' },
    shortDescription: 'Garden landscape design, tree cutting, grass lawn mowing, and outdoor botanical care.',
    description: 'Transform outdoor spaces into lush green landscapes with professional horticulturists and garden maintenance crews.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Residential & Commercial Estates',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Transport & Logistics ---
  {
    id: 'serv-701',
    slug: 'packers-movers-goods-transport',
    name: 'Packers & Movers, Mini Truck Rental & Logistics',
    category: { name: 'Transport & Logistics', slug: 'transport-logistics', kind: 'BUSINESS' },
    shortDescription: 'Hassle-free household & office relocation, mini truck hire (Tata Ace/Bolero), warehousing & freight transport.',
    description: 'Safe packing, GPS tracked transport trucks, and insured goods movement across all Indian states.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Pan-India Freight Network',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Industrial & Factory Services ---
  {
    id: 'serv-801',
    slug: 'industrial-machine-maintenance-fabrication',
    name: 'Factory Machine Maintenance & Heavy Fabrication',
    category: { name: 'Industrial & Factory Services', slug: 'industrial-factory-services', kind: 'BUSINESS' },
    shortDescription: 'Industrial machinery overhaul, factory structural steel fabrication, electrical maintenance & equipment installation.',
    description: 'Expert industrial engineers providing routine preventive maintenance, heavy equipment erection, and plant cleaning.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Industrial Zones & SEZs',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- IT & Digital Services ---
  {
    id: 'serv-901',
    slug: 'website-app-development-ai-solutions',
    name: 'Website, Mobile App, AI Solutions & Digital Marketing',
    category: { name: 'IT & Digital Services', slug: 'it-digital-services', kind: 'BUSINESS' },
    shortDescription: 'Custom Web & Mobile app engineering, AI automation tools, B2B digital marketing, SEO & graphic design.',
    description: 'Full-stack technology team creating scalable web portals, Android/iOS mobile apps, AI workflows, and social media campaigns.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Global / Remote & Hybrid Deployment',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Creative Services ---
  {
    id: 'serv-1001',
    slug: 'photography-videography-drone-shoot',
    name: 'Commercial Photography, Videography & Drone Shooting',
    category: { name: 'Creative Services', slug: 'creative-services', kind: 'BUSINESS' },
    shortDescription: 'Professional product photography, corporate video shoots, drone aerial cinematography & event coverage.',
    description: '4K cameras and licensed drone pilots delivering cinema-grade promotional videos and product catalogue shoots.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Pan-State Location Shoots',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Event Services ---
  {
    id: 'serv-1101',
    slug: 'wedding-event-decoration-catering',
    name: 'Wedding Decoration, Event Management & Catering',
    category: { name: 'Event Services', slug: 'event-services', kind: 'BUSINESS' },
    shortDescription: 'Turnkey event planning, stage flower decoration, sound & lighting setup, and multi-cuisine catering.',
    description: 'Memorable corporate conferences, grand weddings, and social celebrations managed from venue setup to banquet dining.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'All Event Venues & Resorts',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Automobile Services ---
  {
    id: 'serv-1201',
    slug: 'car-bike-repair-towing-wash',
    name: 'Car & Bike Repair, Doorstep Car Wash & 24/7 Towing',
    category: { name: 'Automobile Services', slug: 'automobile-services', kind: 'BUSINESS' },
    shortDescription: 'Multi-brand vehicle servicing, emergency roadside breakdown towing, foam wash & tyre replacement.',
    description: 'Certified auto mechanics equipped for engine diagnostics, denting/painting, and 24-hour flatbed towing assistance.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: '24/7 Emergency City Coverage',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Business Services ---
  {
    id: 'serv-1301',
    slug: 'gst-company-registration-tax-filing',
    name: 'GST Registration, Company Formation & Tax Accounting',
    category: { name: 'Business Services', slug: 'business-services', kind: 'BUSINESS' },
    shortDescription: 'Corporate legal registration, GST return filing, bookkeeping accounting, HR payroll & business consulting.',
    description: 'Chartered accountants and legal advisors simplifying compliance, trademark registration, and tax filings for startups & enterprises.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Pan-India Online Legal Services',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    featured: true
  },

  // --- Security Services ---
  {
    id: 'serv-1401',
    slug: 'security-guards-cctv-monitoring',
    name: 'Uniformed Security Guards & Fire Safety Solutions',
    category: { name: 'Security Services', slug: 'security-services', kind: 'BUSINESS' },
    shortDescription: 'Trained static security guards, biometric access control, 24/7 CCTV surveillance & fire safety audits.',
    description: 'Rigorous security guard deployment for corporate parks, gated apartments, factories, and commercial centers.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Statewide Security Deployment',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Healthcare Services ---
  {
    id: 'serv-1501',
    slug: 'home-nursing-physiotherapy-ambulance',
    name: 'Home Nursing Care, Physiotherapy & Medical Equipment',
    category: { name: 'Healthcare Services', slug: 'healthcare-services', kind: 'BUSINESS' },
    shortDescription: 'Compassionate home nursing care, doorstep physiotherapy, 24/7 emergency ambulance & medical bed rental.',
    description: 'Qualified nurses and certified physiotherapists caring for elderly patients and post-surgery recovery at home.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: '24/7 Doorstep Patient Care',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    featured: false
  },

  // --- Education & Training ---
  {
    id: 'serv-1601',
    slug: 'home-tuition-computer-training-skills',
    name: 'Home Tuition, Computer Training & Skill Development',
    category: { name: 'Education & Training', slug: 'education-training', kind: 'BUSINESS' },
    shortDescription: 'Academic home tutors, software programming bootcamps, spoken English & corporate soft skills training.',
    description: 'Experienced tutors and corporate trainers providing personalized 1-on-1 coaching and career development programs.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Online & Home Doorstep Classes',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    featured: false
  }
];

// ==========================================
// 3. SOCIAL SERVICE CATEGORIES & CAUSES
// ==========================================
export const SOCIAL_CAUSES: Category[] = [
  { id: 'soc-1', name: 'Food Donation', slug: 'food-donation', description: 'Donate extra food from weddings/events, restaurant meals, grocery kits & community meal support.', serviceCount: 5, kind: 'SOCIAL' },
  { id: 'soc-2', name: 'Clothing Donation', slug: 'clothing-donation', description: 'Donate old/new clothes, winter blankets, and school uniforms to needy families.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-3', name: 'Education Support', slug: 'education-support', description: 'Donate books, school bags, stationery, and sponsor student education fees.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-4', name: 'Children Support', slug: 'children-support', description: 'Donate toys, baby care items, school supplies & nutrition kits for underprivileged kids.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-5', name: 'Household Essentials', slug: 'household-essentials', description: 'Donate furniture, mattresses, blankets, kitchen utensils & home appliances.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-6', name: 'Digital Donation', slug: 'digital-donation', description: 'Donate old mobile phones, laptops, computers, tablets & printers for student digital literacy.', serviceCount: 5, kind: 'SOCIAL' },
  { id: 'soc-7', name: 'Health & Medical', slug: 'health-medical', description: 'Blood donation registration, medicine donation, medical equipment & wheelchair drives.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-8', name: 'Environment', slug: 'environment-drives', description: 'Tree plantation drives, beach cleaning, plastic recycling & e-waste collection.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-9', name: 'Volunteer Services', slug: 'volunteer-services', description: 'Become a volunteer, NGO support, teaching volunteer & event volunteering.', serviceCount: 4, kind: 'SOCIAL' },
  { id: 'soc-10', name: 'Community Support', slug: 'community-support', description: 'Support orphanages, old-age homes, homeless shelters & disaster relief donations.', serviceCount: 4, kind: 'SOCIAL' },
];

export const MOCK_SOCIAL_SERVICES: Service[] = [
  {
    id: 'soc-serv-1',
    slug: 'food-donation-relief-drive',
    name: 'Annadhanam Extra Food & Grocery Relief Drive',
    category: { name: 'Food Donation', slug: 'food-donation', kind: 'SOCIAL' },
    shortDescription: 'Collecting surplus food from weddings/restaurants and distributing fresh hot meals to hospital attendants & shelters.',
    description: 'Donate surplus event food, sponsor monthly grocery kits, or volunteer in our daily hot meal distribution kitchens. Verified 100% free community initiative.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Chennai Urban & District Shelters',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'soc-serv-2',
    slug: 'clothes-blanket-donation-drive',
    name: 'Old & New Clothes & Winter Blanket Drive',
    category: { name: 'Clothing Donation', slug: 'clothing-donation', kind: 'SOCIAL' },
    shortDescription: 'Donating gently used clothes, new garments, school uniforms & warm winter blankets to needy rural families.',
    description: 'Doorstep pickup of wearable garments. Clothes are sorted, washed, ironed and handed over to destitute families and night shelters.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Doorstep Pickup Across City',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'soc-serv-3',
    slug: 'education-support-book-sponsorship',
    name: 'Donate Books, School Bags & Sponsor Student Education',
    category: { name: 'Education Support', slug: 'education-support', kind: 'SOCIAL' },
    shortDescription: 'Sponsoring school fees, donating notebooks, bags, stationery & supporting high school education for orphan kids.',
    description: 'Empower bright young minds by contributing school supplies or directly sponsoring a child annual tuition fee.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Government & Trust Schools',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'soc-serv-4',
    slug: 'digital-device-laptop-phone-donation',
    name: 'Refurbished Phone, Laptop & Computer Donation',
    category: { name: 'Digital Donation', slug: 'digital-donation', kind: 'SOCIAL' },
    shortDescription: 'Donate working laptops, smartphones, computers & printers for government school digital literacy labs.',
    description: 'We refurbish old gadgets, install educational software, and gift them to underprivileged students for online learning.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Free Pickup & Refurbish Unit',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'soc-serv-5',
    slug: 'tree-plantation-environment-drive',
    name: 'Urban Tree Plantation & Beach Cleaning Campaign',
    category: { name: 'Environment', slug: 'environment-drives', kind: 'SOCIAL' },
    shortDescription: 'Sapling planting drives, beach litter cleanup, plastic recycling awareness & e-waste collection.',
    description: 'Join hands to protect mother earth by participating in weekend greening drives and coastal cleanup events.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: 'Public Parks & Coastal Areas',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'soc-serv-6',
    slug: 'blood-donation-medical-wheelchair-support',
    name: 'Blood Donation Drive & Wheelchair Equipment Support',
    category: { name: 'Health & Medical', slug: 'health-medical', kind: 'SOCIAL' },
    shortDescription: 'Emergency blood donor registry, medicine distribution, wheelchair & medical equipment support.',
    description: 'Connecting voluntary blood donors with critical hospital requests and loaning mobility equipment to elderly patients.',
    priceLabel: 'ON_INSPECTION',
    coverageArea: '24/7 Voluntary Blood Network',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
    featured: false
  }
];

export const MOCK_LEADS: LeadRecord[] = [
  {
    id: 'lead-101',
    name: 'Rajesh Kumar',
    phone: '9840123456',
    email: 'rajesh@apexindustries.in',
    enquiryType: 'PRODUCT',
    productId: 'prod-101',
    productName: 'Heavy Duty Corrugated Shipping Boxes',
    quantity: '2000 Boxes',
    message: 'Need urgent quote for monthly supply of corrugated boxes.',
    status: 'NEW',
    createdAt: '2026-07-26T10:30:00Z'
  },
  {
    id: 'lead-102',
    name: 'Anitha Ramesh',
    phone: '9790987654',
    email: 'anitha@techspaces.com',
    enquiryType: 'SERVICE',
    serviceId: 'serv-101',
    serviceName: 'Turnkey Building Construction & Interior Design',
    quantity: '15000 Sq.Ft.',
    message: 'Looking for turnkey interior fitout for our new office branch.',
    status: 'IN_PROGRESS',
    createdAt: '2026-07-25T14:15:00Z'
  }
];
