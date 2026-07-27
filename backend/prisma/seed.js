/**
 * Idempotent seed — safe to run multiple times (upserts everywhere).
 * Creates: super admin, core settings, sample categories/products, 6 services.
 * Run: npm run seed
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const env = require('../src/config/env');
const { BCRYPT_ROUNDS } = require('../src/config/constants');

const prisma = new PrismaClient();

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');

async function seedAdmin() {
  const password = await bcrypt.hash(env.SEED_ADMIN_PASSWORD, BCRYPT_ROUNDS);
  await prisma.admin.upsert({
    where: { email: env.SEED_ADMIN_EMAIL },
    update: {}, // never overwrite an existing admin's password on re-seed
    create: {
      name: env.SEED_ADMIN_NAME,
      email: env.SEED_ADMIN_EMAIL,
      password,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✅ Admin ready: ${env.SEED_ADMIN_EMAIL}`);
}

async function seedSettings() {
  const settings = [
    { key: 'business_name', value: 'BS Smart Solution' },
    { key: 'business_email', value: 'reach@shotzoo.com' },
    { key: 'business_address', value: 'Update your business address in Admin → Settings' },
    { key: 'whatsapp_number', value: env.WHATSAPP_NUMBER },
  ];
  for (const s of settings) {
    await prisma.settings.upsert({
      where: { key: s.key },
      update: {}, // keep admin-edited values on re-seed
      create: s,
    });
  }
  console.log('✅ Settings ready');
}

/** The 10 business categories shown on the Products page. */
const CATEGORIES = [
  { name: 'Packaging Materials', description: 'Corrugated boxes, courier bags, bubble wrap, stretch film, packing tape, paper bags, zip-lock pouches. For e-commerce sellers, manufacturers and warehouses.' },
  { name: 'Safety Products', description: 'Safety gloves, helmets, reflective jackets, safety shoes, face masks. For construction companies, factories and warehouses.' },
  { name: 'Cleaning & Housekeeping Supplies', description: 'Cleaning chemicals, floor cleaners, toilet cleaners, mops, brooms, garbage bags. For hotels, hospitals, offices and schools.' },
  { name: 'Electrical Products', description: 'LED lights, switches, wires, extension boards, fans. For electricians, builders and contractors.' },
  { name: 'Plumbing Materials', description: 'PVC pipes, taps, valves, bathroom fittings. For plumbers, builders and contractors.' },
  { name: 'Office Supplies', description: 'Printer paper, pens, files, registers, toners. For offices, schools and colleges.' },
  { name: 'Hotel & Restaurant Supplies', description: 'Disposable cups, food containers, tissues, kitchen gloves, cleaning supplies. For restaurants, catering businesses and hotels.' },
  { name: 'Industrial Tools', description: 'Drill machines, hand tools, measuring tools, fasteners, lubricants. For workshops and factories.' },
  { name: 'Promotional & Corporate Products', description: 'T-shirts, caps, pens, mugs, ID cards, corporate gift items. For companies and event organisers.' },
  { name: 'Furniture & Interior Products', description: 'Office chairs, tables, modular furniture, blinds, decorative panels.' },
];

async function seedCategories() {
  for (const [i, c] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: { description: c.description, sortOrder: i },
      create: { ...c, slug: slugify(c.name), sortOrder: i },
    });
  }
  console.log(`✅ ${CATEGORIES.length} categories ready`);
}

/** Migrate away from the old pilot categories (pre-10-category catalogue). */
async function removeLegacyCategories() {
  const legacy = ['Electrical Supplies', 'Safety & Security Equipment'];
  const fallback = {
    'Electrical Supplies': 'Electrical Products',
    'Safety & Security Equipment': 'Safety Products',
  };
  for (const name of legacy) {
    const old = await prisma.category.findUnique({ where: { name } });
    if (!old) continue;
    const target = await prisma.category.findUnique({ where: { name: fallback[name] } });
    await prisma.product.updateMany({ where: { categoryId: old.id }, data: { categoryId: target.id } });
    await prisma.category.delete({ where: { id: old.id } });
    console.log(`♻️  Moved products from "${name}" → "${fallback[name]}"`);
  }
}

async function seedProducts() {
  const products = [
    {
      name: 'Copper House Wire 90m Coil',
      category: 'Electrical Products',
      description:
        'FR-grade PVC insulated copper wire, 90 metre coil. Available in 1.0, 1.5, 2.5 and 4.0 sq.mm. ISI marked. Ideal for contractors and wholesale buyers.',
      shortDescription: 'FR-grade ISI copper wire coils, multiple gauges.',
      specifications: { insulation: 'FR PVC', length: '90m', gauges: '1.0–4.0 sq.mm', standard: 'ISI' },
      minOrderQty: '20 coils',
      priceRange: '₹1,100–₹2,800 / coil',
      unit: 'coil',
      isFeatured: true,
    },
    {
      name: 'Dome CCTV Camera 2MP (Bulk Pack)',
      category: 'Safety Products',
      description:
        '2MP HD dome camera with IR night vision, indoor use. Sold in bulk packs of 10 for installers and resellers. 1-year replacement warranty.',
      shortDescription: '2MP IR dome cameras, pack of 10 for installers.',
      specifications: { resolution: '2MP', nightVision: 'IR 20m', pack: '10 units', warranty: '1 year' },
      minOrderQty: '1 pack (10 units)',
      priceRange: '₹9,500–₹11,000 / pack',
      unit: 'pack',
      isFeatured: true,
    },
  ];
  for (const [i, p] of products.entries()) {
    const category = await prisma.category.findUnique({ where: { name: p.category } });
    const { category: _c, ...data } = p;
    await prisma.product.upsert({
      where: { slug: slugify(p.name) },
      update: {},
      create: { ...data, slug: slugify(p.name), categoryId: category.id, sortOrder: i },
    });
  }
  console.log('✅ Products ready');
}

/**
 * Full bulk-supply catalogue: every item sold, grouped by category.
 * [name, shortDescription, unit]
 */
const CATALOGUE = {
  'Packaging Materials': [
    ['Corrugated Boxes', 'Strong 3/5/7-ply boxes in all standard sizes.', 'bundle'],
    ['Courier Bags', 'Tamper-proof poly courier bags with POD pocket.', 'pack of 100'],
    ['Bubble Wrap', 'Air-bubble protective wrap rolls, 1m width.', 'roll'],
    ['Stretch Film', 'Machine & hand-grade pallet stretch wrap.', 'roll'],
    ['Packing Tape', 'BOPP self-adhesive tape, clear/brown/printed.', 'box of 72'],
    ['Paper Bags', 'Eco-friendly kraft paper carry bags.', 'pack of 100'],
    ['Zip-Lock Pouches', 'Reusable zip-lock pouches in multiple sizes.', 'pack of 100'],
  ],
  'Safety Products': [
    ['Safety Gloves', 'Cut-resistant, nitrile-coated & cotton knitted gloves.', 'pack of 12'],
    ['Safety Helmets', 'ISI-marked industrial safety helmets with ratchet.', 'piece'],
    ['Reflective Jackets', 'High-visibility reflective safety jackets.', 'piece'],
    ['Safety Shoes', 'Steel-toe leather safety shoes, all sizes.', 'pair'],
    ['Face Masks', '3-ply disposable & N95 face masks.', 'box of 50'],
  ],
  'Cleaning & Housekeeping Supplies': [
    ['Cleaning Chemicals', 'Multi-surface disinfectants & degreasers, 5L cans.', 'can'],
    ['Floor Cleaner', 'Perfumed floor cleaning concentrate, 5L.', 'can'],
    ['Toilet Cleaner', 'Heavy-duty toilet bowl cleaner, bulk pack.', 'carton'],
    ['Mops', 'Wet/dry mops with refills for housekeeping teams.', 'piece'],
    ['Brooms', 'Soft & hard brooms for indoor and outdoor use.', 'dozen'],
    ['Garbage Bags', 'Biodegradable garbage bags — small to XXL.', 'pack of 30'],
  ],
  'Electrical Products': [
    ['LED Lights', 'LED bulbs, battens & panel lights, 9W–36W.', 'box of 10'],
    ['Switches', 'Modular switches & sockets, ISI marked.', 'box of 20'],
    ['Electrical Wires', 'FR PVC insulated copper wires, all gauges.', 'coil'],
    ['Extension Boards', 'Surge-protected multi-socket extension boards.', 'piece'],
    ['Fans', 'Ceiling, wall & exhaust fans for projects.', 'piece'],
  ],
  'Plumbing Materials': [
    ['PVC Pipes', 'PVC/CPVC/UPVC pipes and fittings, all sizes.', 'length'],
    ['Taps', 'Brass & stainless taps and mixers.', 'piece'],
    ['Valves', 'Ball, gate & check valves for plumbing lines.', 'piece'],
    ['Bathroom Fittings', 'Complete bathroom accessory sets.', 'set'],
  ],
  'Office Supplies': [
    ['Printer Paper', 'A4/A3 copier paper, 70–80 GSM reams.', 'carton'],
    ['Pens', 'Ball & gel pens for office bulk orders.', 'box of 50'],
    ['Files', 'Box files, folders and document organisers.', 'dozen'],
    ['Registers', 'Ruled office registers, 100–300 pages.', 'dozen'],
    ['Printer Toners', 'Compatible & original toners for major brands.', 'piece'],
  ],
  'Hotel & Restaurant Supplies': [
    ['Disposable Cups', 'Paper & PP cups, 65–250 ml.', 'sleeve of 100'],
    ['Food Containers', 'Leak-proof takeaway containers with lids.', 'pack of 50'],
    ['Tissues', 'Napkins, facial tissues & kitchen rolls.', 'carton'],
    ['Kitchen Gloves', 'Food-grade nitrile & rubber gloves.', 'box of 100'],
    ['Hotel Cleaning Supplies', 'Housekeeping kit: chemicals, scrubbers, wipes.', 'kit'],
  ],
  'Industrial Tools': [
    ['Drill Machines', 'Corded & cordless drill machines, 10–13 mm.', 'piece'],
    ['Hand Tools', 'Spanners, pliers, screwdriver sets & tool kits.', 'set'],
    ['Measuring Tools', 'Tapes, vernier calipers & spirit levels.', 'piece'],
    ['Fasteners', 'Bolts, nuts, screws & anchors — all sizes.', 'kg'],
    ['Lubricants', 'Industrial greases & machine oils.', 'can'],
  ],
  'Promotional & Corporate Products': [
    ['Custom T-Shirts', 'Printed/embroidered T-shirts with your logo.', 'piece'],
    ['Caps', 'Custom-branded caps for events & teams.', 'piece'],
    ['Promotional Pens', 'Logo-printed pens for giveaways.', 'box of 100'],
    ['Mugs', 'Sublimation-printed ceramic mugs.', 'piece'],
    ['ID Cards', 'PVC ID cards with lanyards & holders.', 'piece'],
    ['Corporate Gift Items', 'Curated gift sets, diaries & drinkware.', 'set'],
  ],
  'Furniture & Interior Products': [
    ['Office Chairs', 'Ergonomic mesh & executive chairs.', 'piece'],
    ['Office Tables', 'Workstations, desks & meeting tables.', 'piece'],
    ['Modular Furniture', 'Modular storage & partition systems.', 'set'],
    ['Blinds', 'Roller, vertical & zebra window blinds.', 'sq.ft'],
    ['Decorative Panels', 'PVC/WPC wall & ceiling decorative panels.', 'panel'],
  ],
};

async function seedCatalogue() {
  let count = 0;
  for (const [categoryName, items] of Object.entries(CATALOGUE)) {
    const category = await prisma.category.findUnique({ where: { name: categoryName } });
    if (!category) continue;
    for (const [i, [name, shortDescription, unit]] of items.entries()) {
      await prisma.product.upsert({
        where: { slug: slugify(name) },
        update: {},
        create: {
          name,
          slug: slugify(name),
          shortDescription,
          description: `${name} supplied in bulk / wholesale quantities. ${shortDescription} Best rates for businesses — send an enquiry with your required quantity and we will share a quote on WhatsApp.`,
          unit,
          minOrderQty: 'Bulk / wholesale',
          categoryId: category.id,
          sortOrder: i,
          isFeatured: i === 0, // first item of each category is featured
        },
      });
      count += 1;
    }
  }
  console.log(`✅ Catalogue ready (${count} products)`);
}

/** Service catalogue: 16 categories → services. */
const SERVICE_CATALOGUE = {
  'Construction & Interior': ['Building Construction', 'Home Renovation', 'Civil Contractor', 'Architecture', 'Interior Design', 'False Ceiling', 'Painting', 'Tiles & Flooring', 'Waterproofing', 'Fabrication', 'Welding'],
  'Plumbing': ['Plumbing Installation', 'Pipe Repair', 'Water Tank Cleaning', 'Borewell Services', 'Bathroom Fittings Installation', 'Drainage Solutions'],
  'Electrical': ['House Wiring', 'Commercial Electrical', 'Solar Installation', 'CCTV Installation', 'Inverter Installation', 'Generator Services', 'LED Lighting'],
  'AC & Appliances': ['AC Installation', 'AC Repair', 'Refrigerator Repair', 'Washing Machine Repair', 'Microwave Repair', 'TV Repair'],
  'Home Services': ['House Cleaning', 'Deep Cleaning', 'Sofa Cleaning', 'Carpet Cleaning', 'Pest Control'],
  'Outdoor Services': ['Gardening', 'Landscaping', 'Tree Cutting', 'Lawn Maintenance'],
  'Transport & Logistics': ['Packers & Movers', 'Mini Truck Rental', 'Goods Transport', 'Warehouse Services', 'Courier Services'],
  'Industrial & Factory Services': ['Machine Maintenance', 'Industrial Cleaning', 'Factory Fabrication', 'Electrical Maintenance', 'Equipment Installation'],
  'IT & Digital Services': ['Website Development', 'Mobile App Development', 'AI Solutions', 'Software Development', 'Automation', 'Digital Marketing', 'SEO', 'Social Media Marketing', 'Graphic Design', 'Video Editing'],
  'Creative Services': ['Photography', 'Videography', 'Drone Photography', 'Product Photography', 'Event Coverage'],
  'Event Services': ['Wedding Decoration', 'Catering', 'Sound & Lighting', 'Stage Setup', 'Event Management'],
  'Automobile Services': ['Car Repair', 'Bike Repair', 'Car Wash', 'Towing', 'Tyre Services'],
  'Business Services': ['GST Registration', 'Company Registration', 'Accounting', 'Tax Filing', 'HR Services', 'Business Consulting'],
  'Security Services': ['Security Guards', 'CCTV Monitoring', 'Access Control', 'Fire Safety Solutions'],
  'Healthcare Services': ['Home Nursing', 'Physiotherapy', 'Ambulance', 'Medical Equipment Rental'],
  'Education & Training': ['Home Tuition', 'Computer Training', 'Spoken English', 'Skill Development', 'Corporate Training'],
};

async function seedServices() {
  // 1. Categories
  const names = Object.keys(SERVICE_CATALOGUE);
  for (const [i, name] of names.entries()) {
    await prisma.serviceCategory.upsert({
      where: { name },
      update: { sortOrder: i },
      create: {
        name,
        slug: slugify(name),
        description: `${SERVICE_CATALOGUE[name].slice(0, 4).join(', ')} and more.`,
        sortOrder: i,
      },
    });
  }
  console.log(`✅ ${names.length} service categories ready`);

  // 2. Services (upsert also re-assigns category for existing rows)
  let count = 0;
  for (const [categoryName, services] of Object.entries(SERVICE_CATALOGUE)) {
    const category = await prisma.serviceCategory.findUnique({ where: { name: categoryName } });
    for (const [i, name] of services.entries()) {
      await prisma.service.upsert({
        where: { slug: slugify(name) },
        update: { categoryId: category.id },
        create: {
          name,
          slug: slugify(name),
          description: `Professional ${name.toLowerCase()} service by verified providers. Submit an enquiry with your requirement and we will reach you on WhatsApp with a quote.`,
          shortDescription: `Trusted ${name.toLowerCase()} at the best rates.`,
          priceType: 'ON_INSPECTION',
          coverageArea: 'Local city & suburbs',
          categoryId: category.id,
          sortOrder: i,
          isFeatured: i === 0,
        },
      });
      count += 1;
    }
  }
  console.log(`✅ Service catalogue ready (${count} services)`);

  // 3. Remove legacy pilot services superseded by the catalogue.
  const legacy = ['electrician', 'plumbing', 'ac-service', 'home-maintenance', 'interior-works'];
  const removed = await prisma.service.deleteMany({ where: { slug: { in: legacy } } });
  if (removed.count) console.log(`♻️  Removed ${removed.count} legacy services`);
}

/** Social service catalogue: 10 donation/volunteer categories. */
const SOCIAL_CATALOGUE = {
  'Food Donation': ['Donate Extra Food', 'Wedding & Event Food Donation', 'Restaurant Food Donation', 'Grocery Donation', 'Community Meal Support'],
  'Clothing Donation': ['Old Clothes Donation', 'New Clothes Donation', 'Winter Clothes Donation', 'School Uniform Donation'],
  'Education Support': ['Donate Books', 'Donate School Bags', 'Donate Stationery', 'Sponsor Student Education'],
  'Children Support': ['Donate Toys', 'Baby Care Items', 'School Supplies Donation', 'Nutrition Kits'],
  'Household Essentials': ['Furniture Donation', 'Mattress & Blanket Donation', 'Kitchen Utensils Donation', 'Home Appliances Donation'],
  'Digital Donation': ['Old Mobile Phones', 'Donate Laptops', 'Donate Computers', 'Donate Tablets', 'Donate Printers'],
  'Health & Medical': ['Blood Donation Registration', 'Medicine Donation', 'Medical Equipment Donation', 'Wheelchair Donation'],
  'Environment': ['Tree Plantation', 'Beach Cleaning', 'Plastic Recycling', 'E-Waste Collection'],
  'Volunteer Services': ['Become a Volunteer', 'NGO Support', 'Teaching Volunteer', 'Event Volunteer'],
  'Community Support': ['Support Orphanages', 'Support Old-Age Homes', 'Support Shelters', 'Disaster Relief Donations'],
};

async function seedSocialServices() {
  const names = Object.keys(SOCIAL_CATALOGUE);
  for (const [i, name] of names.entries()) {
    await prisma.serviceCategory.upsert({
      where: { name },
      update: { kind: 'SOCIAL', sortOrder: i },
      create: {
        name,
        slug: slugify(name),
        description: `${SOCIAL_CATALOGUE[name].slice(0, 3).join(', ')} and more.`,
        kind: 'SOCIAL',
        sortOrder: i,
      },
    });
  }
  console.log(`✅ ${names.length} social categories ready`);

  let count = 0;
  for (const [categoryName, items] of Object.entries(SOCIAL_CATALOGUE)) {
    const category = await prisma.serviceCategory.findUnique({ where: { name: categoryName } });
    for (const [i, name] of items.entries()) {
      await prisma.service.upsert({
        where: { slug: slugify(name) },
        update: { categoryId: category.id },
        create: {
          name,
          slug: slugify(name),
          description: `${name} — part of the BS Smart Solution social initiative. Send an enquiry telling us what you would like to contribute (or the support you need) and our team will coordinate with you on WhatsApp. Every contribution reaches verified people and organisations.`,
          shortDescription: 'Free community initiative — join via WhatsApp.',
          priceType: 'ON_INSPECTION',
          coverageArea: 'Local city & suburbs',
          categoryId: category.id,
          sortOrder: i,
        },
      });
      count += 1;
    }
  }
  console.log(`✅ Social catalogue ready (${count} items)`);
}

async function main() {
  await seedAdmin();
  await seedSettings();
  await seedCategories();
  await removeLegacyCategories();
  await seedProducts();
  await seedCatalogue();
  await seedServices();
  await seedSocialServices();
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
