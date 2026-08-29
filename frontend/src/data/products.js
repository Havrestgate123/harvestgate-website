const CDN =
  "https://static.prod-images.emergentagent.com/jobs/ee36022f-d0ea-4536-908f-9c1b130f8012/images";

export const IMG = {
  heroField: `${CDN}/5fec7d18427722ea85f409abf021232cfaf0aa751169f9c3c6e3a7bb9df5c022.jpeg`,
  hands: `${CDN}/ad728388dcb701992fd2aa50358fcf1d6f241e13b61cda170cf2e53e95cb8022.jpeg`,
  port: `${CDN}/f8e5cadb98fe8564f523054af49f315bc8a6c59d601ea40be0638faafc0d2f82.jpeg`,
  lab: `${CDN}/b520962468c102869d13925128916890833ba65a581ae3b95e54aeeb4b294cf1.jpeg`,
  foxnuts: `${CDN}/057bbac088c24df0e3541c1299268e853fc0cdb881519bb8027705acd2f6b6d6.jpeg`,
  millets: `${CDN}/00cf471d9322f8dcbe3c15ef040a682f66837b098bf964591794c4b93c03f8b1.jpeg`,
  oats: "https://images.unsplash.com/photo-1614961909013-1e2212a2ca8b?q=80&w=1200&auto=format&fit=crop",
  sugar: `${CDN}/b738ca1c6d3335cc6e8c2aa5c6a281d1313cc8f790c318b42bd07684fc42bfcf.jpeg`,
  pulses: "https://images.unsplash.com/photo-1585994192700-112349e5d4cb?q=80&w=1200&auto=format&fit=crop",
  grains: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200&auto=format&fit=crop",
  daliya: "https://images.unsplash.com/photo-1607672632458-9eb56696346b?q=80&w=1200&auto=format&fit=crop",
};

export const PRODUCTS = [
  {
    slug: "foxnuts",
    index: "01",
    name: "Phool Makhana",
    subtitle: "Foxnuts / Lotus Seeds",
    tagline: "Grade-A jumbo lotus seeds, hand-popped in the Mithila wetlands.",
    accent: "#F7F4EB",
    accentLight: "#8A7343",
    accentName: "Cream / Ivory",
    origin: "Mithila Region, Bihar, India",
    hsCode: "0802.99.00",
    season: "August — November",
    image: IMG.foxnuts,
    intro:
      "Harvested from managed freshwater ponds and popped by hand within hours of roasting, our Phool Makhana retains the crisp, hollow bite and clean ivory colour that premium retail and snack manufacturers demand.",
    description:
      "HarvestGate contracts directly with 340+ makhana-farming households across Darbhanga, Madhubani and Purnia. Each lot is size-graded by suta calibration, sortex-cleaned, metal-detected and nitrogen flushed before it leaves our processing facility.",
    grades: [
      { name: "5+ Suta", spec: "18 – 20 mm", note: "Retail pouch & flavoured snack base" },
      { name: "6+ Suta", spec: "20 – 22 mm", note: "Premium gifting & horeca" },
      { name: "Handpicked Premium", spec: "22 mm +", note: "Ultra-white, zero black spot" },
    ],
    specs: [
      ["Moisture", "< 8.0 %"],
      ["Purity", "99.8 %"],
      ["Broken / Black spot", "< 1.0 %"],
      ["Shelf life", "18 months"],
      ["Aflatoxin", "< 4 ppb"],
      ["Packaging", "10 kg / 20 kg nitrogen-flushed vacuum bags"],
    ],
    moq: "1 x 20ft FCL — approx. 4 MT",
    incoterms: ["FOB Kolkata", "CIF", "CFR", "EXW Facility"],
    markets: ["United States", "United Arab Emirates", "United Kingdom", "Australia", "Canada"],
  },
  {
    slug: "millets",
    index: "02",
    name: "Ancient Millets",
    subtitle: "Bajra · Jowar · Ragi · Foxtail",
    tagline: "Sortex-clean organic grain from the drylands of Rajasthan and Karnataka.",
    accent: "#8A9A86",
    accentLight: "#4C5A48",
    accentName: "Olive / Sage",
    origin: "Rajasthan & Karnataka, India",
    hsCode: "1008.21.00",
    season: "October — March",
    image: IMG.millets,
    intro:
      "Rain-fed, low-input and naturally climate resilient. Our millet programme supplies mills, health-food brands and institutional buyers with consistent, residue-tested ancient grain at container scale.",
    description:
      "We aggregate through farmer producer organisations under a documented organic control system, then clean on twin-pass sortex with de-stoner and gravity separation. Every consignment ships with a residue panel covering 210+ pesticide molecules.",
    grades: [
      { name: "Pearl Millet (Bajra)", spec: "Sortex 99.5 %", note: "Flour milling & feed-grade options" },
      { name: "Sorghum (Jowar)", spec: "White / Cream", note: "Popping, flaking, brewing" },
      { name: "Finger Millet (Ragi)", spec: "Brown, machine cleaned", note: "Malt & infant nutrition" },
      { name: "Little & Foxtail Millet", spec: "Polished / unpolished", note: "Retail ready-to-cook" },
    ],
    specs: [
      ["Moisture", "< 10.0 %"],
      ["Purity", "99.5 % sortex cleaned"],
      ["Foreign matter", "< 0.5 %"],
      ["Shelf life", "24 months"],
      ["Certification", "NPOP / NOP organic available"],
      ["Packaging", "25 kg / 50 kg PP woven export bags"],
    ],
    moq: "1 x 20ft FCL — 25 MT",
    incoterms: ["FOB Mundra", "FOB Nhava Sheva", "CIF", "CFR"],
    markets: ["Germany", "Netherlands", "Saudi Arabia", "Singapore", "Japan"],
  },
  {
    slug: "oats",
    index: "03",
    name: "Premium Oats",
    subtitle: "Rolled · Steel-Cut · Instant Oats",
    tagline: "High-beta-glucan export grade oats, kiln-steamed and uniformly flaked.",
    accent: "#E2C391",
    accentLight: "#9B7637",
    accentName: "Golden Oat / Warm Sand",
    origin: "Northern Plains, India",
    hsCode: "1104.12.00",
    season: "Year-round availability",
    image: IMG.oats,
    intro:
      "Precision de-hulled, kiln-toasted and stabilized to prevent rancidity. Our export oats deliver consistent thickness, high absorption and clean nutty aroma required by international cereal and porridge brands.",
    description:
      "Processed in automated HACCP & ISO-certified oat milling lines. The grain undergoes magnetic separation, optical color sorting, steam conditioning and heavy-duty roller flaking to lock in dietary fiber and essential micronutrients.",
    grades: [
      { name: "Jumbo Rolled Oats", spec: "Thickness 0.8 – 1.0 mm", note: "Granola, muesli & retail bakery" },
      { name: "Quick-Cooking Flakes", spec: "Thickness 0.4 – 0.6 mm", note: "Instant porridge & breakfast bowls" },
      { name: "Steel-Cut Groats", spec: "Clean cut 2 – 3 pieces", note: "Artisanal hot cereals & meal kits" },
    ],
    specs: [
      ["Moisture", "< 10.5 %"],
      ["Purity", "99.8 %"],
      ["Beta-Glucan", "> 4.2 %"],
      ["Foreign matter", "< 0.1 %"],
      ["Shelf life", "18 months sealed"],
      ["Packaging", "25 kg multilayer paper bags with PE liner"],
    ],
    moq: "1 x 20ft FCL — 18 MT",
    incoterms: ["FOB Nhava Sheva", "FOB Mundra", "CIF", "CFR"],
    markets: ["United Kingdom", "United Arab Emirates", "South Africa", "Malaysia", "Australia"],
  },
  {
    slug: "sugar",
    index: "04",
    name: "Sugar & Jaggery",
    subtitle: "Refined ICUMSA 45 · Artisanal Cane Gur",
    tagline: "Ultra-pure refined cane sugar and open-pan chemical-free artisanal jaggery.",
    accent: "#D99B26",
    accentLight: "#8F6208",
    accentName: "Deep Gold / Ochre",
    origin: "Maharashtra & Uttar Pradesh, India",
    hsCode: "1701.14.90",
    season: "November — May",
    image: IMG.sugar,
    intro:
      "From crystal-white ICUMSA 45 refined sugar for industrial beverage formulators to pure organic jaggery blocks and powder made with zero sodium hydrosulphite.",
    description:
      "HarvestGate supplies institutional and wholesale buyers with certified cane sugar and artisanal gur. Each consignment is tested for polarization, color ICUMSA rating, ash content, and moisture under FSSAI and international food safety protocols.",
    grades: [
      { name: "Refined White Sugar", spec: "ICUMSA 45 RBU", note: "Confectionery, beverage & industrial" },
      { name: "Artisanal Organic Jaggery", spec: "Hydros-free 100%", note: "Cubes, powder & solid blocks" },
      { name: "Raw Brown Sugar", spec: "ICUMSA 600 – 1200", note: "Bakery & clean-label sweetening" },
    ],
    specs: [
      ["Polarization", "> 99.80 % degrees"],
      ["Moisture", "< 0.04 %"],
      ["Ash content", "< 0.04 % max"],
      ["Solubility", "100 % dry & free flowing"],
      ["Shelf life", "24 months"],
      ["Packaging", "50 kg PP woven bags with inner poly liner"],
    ],
    moq: "1 x 20ft FCL — 25 MT",
    incoterms: ["FOB Nhava Sheva", "FOB Mundra", "CIF", "CFR"],
    markets: ["United States", "Middle East", "Kenya", "New Zealand", "European Union"],
  },
  {
    slug: "pulses",
    index: "05",
    name: "Pulses & Lentils",
    subtitle: "Toor · Chana · Moong · Urad · Masoor",
    tagline: "Triple-polished, sortex-cleaned Indian export pulses with zero foreign matter.",
    accent: "#C26D45",
    accentLight: "#8C3B14",
    accentName: "Terracotta / Amber Pulse",
    origin: "Madhya Pradesh, Maharashtra & UP, India",
    hsCode: "0713.40.00",
    season: "Year-round availability",
    image: IMG.pulses,
    intro:
      "High-protein, machine-cleaned, and size-graded Indian pulses. Sourced directly from major primary producing mandis and processed through modern Buhler sortex lines.",
    description:
      "Our pulses programme provides global supermarkets, ethnic distributors, and food service companies with unpolished (natural) and oil/water-polished dal. Every batch is certified for grain uniformity, cooking time, and moisture retention.",
    grades: [
      { name: "Pigeon Peas (Toor Dal)", spec: "Oily / Plain Sortex", note: "Staple catering & retail retail packaging" },
      { name: "Chickpeas (Kabuli & Desi)", spec: "7 mm, 8 mm, 9 mm", note: "Hummus, canning & bulk wholesale" },
      { name: "Green & Yellow Moong", spec: "Whole & Split washed", note: "Sprouting, soups & snack extrusion" },
      { name: "Black Matpe / Urad Dal", spec: "Whole, Split & Washed", note: "Fermentation, papad & ethnic cuisine" },
    ],
    specs: [
      ["Moisture", "< 11.0 %"],
      ["Purity", "99.5 % Sortex cleaned"],
      ["Foreign matter", "< 0.2 %"],
      ["Broken grains", "< 1.5 %"],
      ["Shelf life", "24 months"],
      ["Packaging", "25 kg / 50 kg PP / Jute bags with custom branding"],
    ],
    moq: "1 x 20ft FCL — 24 MT",
    incoterms: ["FOB Nhava Sheva", "FOB Mundra", "CIF", "CFR"],
    markets: ["United Kingdom", "Canada", "United States", "UAE", "Singapore"],
  },
  {
    slug: "grains",
    index: "06",
    name: "Grains & Cereals",
    subtitle: "Basmati & Non-Basmati Rice · Wheat · Maize",
    tagline: "Aged long-grain Basmati rice, premium Sharbati wheat and yellow feed maize.",
    accent: "#6B8E63",
    accentLight: "#3A5C33",
    accentName: "Paddy Green / Field Sage",
    origin: "Punjab, Haryana & Uttar Pradesh, India",
    hsCode: "1006.30.20",
    season: "September — April",
    image: IMG.grains,
    intro:
      "From aromatic 1121 and Traditional aged Basmati rice with exceptional elongation to premium milling wheat and high-starch yellow corn.",
    description:
      "HarvestGate contracts directly with grain silos and modernized hulling mills across the Indo-Gangetic plains. Rigorous testing checks kernel length, chalkiness, broken percentage, and aroma index before vessel stuffing.",
    grades: [
      { name: "1121 XXL Basmati Rice", spec: "Aged 2 yrs, 8.35 mm+", note: "Five-star hospitality, pilaf & retail" },
      { name: "PR-11 / Sona Masoori", spec: "Non-Basmati silky finish", note: "Daily staple & catering contracts" },
      { name: "Sharbati Milling Wheat", spec: "Protein > 12.5%", note: "Flatbreads, bakery flour & semolina" },
      { name: "Yellow Dent Maize", spec: "Aflatoxin < 20 ppb", note: "Starch production & poultry feed" },
    ],
    specs: [
      ["Moisture", "< 12.0 %"],
      ["Purity", "99.0 %"],
      ["Damaged / Discolored", "< 0.5 %"],
      ["Average Grain Length", "8.35 mm (1121 Basmati)"],
      ["Shelf life", "24 months"],
      ["Packaging", "10 kg / 25 kg / 50 kg BOPP, Non-Woven & Jute bags"],
    ],
    moq: "1 x 20ft FCL — 25 MT",
    incoterms: ["FOB Mundra", "FOB Kandla", "FOB Nhava Sheva", "CIF"],
    markets: ["Saudi Arabia", "Iraq", "Kuwait", "United Kingdom", "United States", "Yemen"],
  },
  {
    slug: "daliya",
    index: "07",
    name: "Roasted Daliya",
    subtitle: "Cracked Wheat · Multigrain Porridge",
    tagline: "Clean, golden broken wheat, pre-cleaned and toasted for wholesome nutrition.",
    accent: "#B8860B",
    accentLight: "#7A5703",
    accentName: "Wheat Ochre / Golden Amber",
    origin: "Uttar Pradesh & Madhya Pradesh, India",
    hsCode: "1103.11.00",
    season: "Year-round availability",
    image: IMG.daliya,
    intro:
      "Coarsely ground from select hard durum wheat grains. Naturally rich in dietary fiber, protein, and complex carbohydrates, our daliya is pre-sifted for uniform grit sizing.",
    description:
      "Manufactured in dust-free roller mill systems with de-stoners and magnetic separators. Available in raw golden granules or slow-roasted formats that cook evenly without clumping, ideal for porridge, savory upma, and healthy meal formulations.",
    grades: [
      { name: "Fine Daliya (Lapsi Rawa)", spec: "Uniform grit 1.0 – 1.5 mm", note: "Sweet lapsi, desserts & baby food" },
      { name: "Medium Broken Wheat", spec: "Standard grit 1.5 – 2.5 mm", note: "Breakfast porridge & savory khichdi" },
      { name: "Roasted Multigrain Daliya", spec: "Wheat + Moong + Millets", note: "Health foods & dietary retail packs" },
    ],
    specs: [
      ["Moisture", "< 10.0 %"],
      ["Purity", "99.8 %"],
      ["Foreign matter", "< 0.1 %"],
      ["Dietary Fiber", "> 11.5 %"],
      ["Shelf life", "12 months"],
      ["Packaging", "500g / 1kg retail pouch & 25kg bulk master bags"],
    ],
    moq: "1 x 20ft FCL — 20 MT",
    incoterms: ["FOB Nhava Sheva", "FOB Mundra", "CIF", "CFR"],
    markets: ["United States", "United Kingdom", "Canada", "Australia", "UAE"],
  },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

/* Accent readable against the current surface colour */
export const surfaceAccent = (product, theme) =>
  theme === "light" ? product.accentLight : product.accent;

export const MANIFESTO = [
  {
    number: "01",
    title: "Single-origin direct sourcing",
    body: "We contract directly with agrarian cooperatives across Uttar Pradesh, Bihar, Rajasthan, Maharashtra and Punjab. No intermediaries, no blended lots — every container is traceable to a named cluster and crop window.",
  },
  {
    number: "02",
    title: "Phytosanitary & laboratory rigour",
    body: "Each batch passes triple-stage analysis for moisture, aflatoxins, heavy metals and pesticide residue in NABL-accredited labs before a single bag is stuffed at port.",
  },
  {
    number: "03",
    title: "Moisture-locked export packaging",
    body: "Vacuum sealing, modified-atmosphere packaging and nitrogen-flushed bulk liners protect crunch, color, and aroma across sixty days of ocean freight.",
  },
  {
    number: "04",
    title: "Documented, guaranteed shipping",
    body: "FOB, CIF, CFR and EXW terms with a complete document set: Certificate of Origin, APEDA registration, FSSAI, GSTIN, IEC, phytosanitary certificate and third-party SGS inspection on request.",
  },
];

export const STATS = [
  ["18+", "Export destinations"],
  ["500+", "Contracted farm households"],
  ["99.8%", "Sortex purity standard"],
  ["ISO 22000", "Food safety certified"],
];

export const CERTS = [
  "GSTIN: 09AAICH2946R1ZR",
  "IEC: AAICH2946R",
  "APEDA Registered Exporter",
  "FSSAI Licensed",
  "ISO 22000 : 2018",
  "HACCP Compliant",
  "Spices Board / DGFT",
];
