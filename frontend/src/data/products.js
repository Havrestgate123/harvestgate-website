const CDN =
  "https://static.prod-images.emergentagent.com/jobs/ee36022f-d0ea-4536-908f-9c1b130f8012/images";

export const IMG = {
  heroField: `${CDN}/5fec7d18427722ea85f409abf021232cfaf0aa751169f9c3c6e3a7bb9df5c022.jpeg`,
  hands: `${CDN}/ad728388dcb701992fd2aa50358fcf1d6f241e13b61cda170cf2e53e95cb8022.jpeg`,
  port: `${CDN}/f8e5cadb98fe8564f523054af49f315bc8a6c59d601ea40be0638faafc0d2f82.jpeg`,
  lab: `${CDN}/b520962468c102869d13925128916890833ba65a581ae3b95e54aeeb4b294cf1.jpeg`,
  foxnuts: `${CDN}/057bbac088c24df0e3541c1299268e853fc0cdb881519bb8027705acd2f6b6d6.jpeg`,
  millets: `${CDN}/00cf471d9322f8dcbe3c15ef040a682f66837b098bf964591794c4b93c03f8b1.jpeg`,
  walnuts: `${CDN}/23dc7595a3087368d8087e88d3ba47700733c07e421e80d5cc4bce1ea9c97547.jpeg`,
  jaggery: `${CDN}/b738ca1c6d3335cc6e8c2aa5c6a281d1313cc8f790c318b42bd07684fc42bfcf.jpeg`,
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
      "HarvestGate contracts directly with 340+ makhana-farming households across Darbhanga, Madhubani and Purnia. Each lot is size-graded by suta calibration, sortex-cleaned, metal-detected and nitrogen flushed before it leaves our Patna facility.",
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
    incoterms: ["FOB Kolkata", "CIF", "CFR", "EXW Patna"],
    markets: ["United States", "United Arab Emirates", "United Kingdom", "Australia"],
  },
  {
    slug: "millets",
    index: "02",
    name: "Ancient Millets",
    subtitle: "Bajra · Jowar · Ragi",
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
    markets: ["Germany", "Netherlands", "Saudi Arabia", "Singapore"],
  },
  {
    slug: "walnuts",
    index: "03",
    name: "Kashmiri Walnuts",
    subtitle: "In-Shell & Kernel",
    tagline: "High-altitude, cold-stored kernels from Anantnag and Shopian.",
    accent: "#B87333",
    accentLight: "#8A4E17",
    accentName: "Warm Amber / Chestnut",
    origin: "Kashmir Valley, Jammu & Kashmir",
    hsCode: "0802.31.00",
    season: "September — December",
    image: IMG.walnuts,
    intro:
      "Grown on rain-fed, unirrigated orchards at 1,600 – 2,400 m, Kashmiri walnuts carry a thinner shell, higher kernel recovery and the pale amber colour that confectionery buyers pay a premium for.",
    description:
      "Fruit is shade-dried, mechanically cracked and colour-sorted into halves and quarters, then held at 2 – 4 °C until export. Vacuum cartons with food-grade desiccant protect against rancidity across long ocean transits.",
    grades: [
      { name: "Extra Light Halves", spec: "≥ 80 % halves", note: "Bakery, confectionery, gifting" },
      { name: "Light Amber Quarters", spec: "Quarter pieces", note: "Industrial & ingredient use" },
      { name: "Soft-Shell In-Shell", spec: "30 – 34 mm", note: "Retail nut-in-shell packs" },
    ],
    specs: [
      ["Moisture", "< 5.0 %"],
      ["Kernel yield", "> 48 %"],
      ["Rancidity", "Nil — cold chain maintained"],
      ["Shelf life", "12 months cold-stored"],
      ["Aflatoxin", "< 4 ppb"],
      ["Packaging", "10 kg vacuum cartons with desiccant"],
    ],
    moq: "1 x 20ft FCL — 12 MT kernel",
    incoterms: ["FOB Nhava Sheva", "CIF", "CFR"],
    markets: ["United Kingdom", "France", "Japan", "Canada"],
  },
  {
    slug: "jaggery",
    index: "04",
    name: "Artisanal Jaggery",
    subtitle: "Gur — Block, Powder, Liquid",
    tagline: "Chemical-free, hydros-free cane sugar from Kolhapur's open pans.",
    accent: "#D99B26",
    accentLight: "#8F6208",
    accentName: "Deep Gold / Ochre",
    origin: "Kolhapur, Western Maharashtra",
    hsCode: "1701.14.90",
    season: "November — April",
    image: IMG.jaggery,
    intro:
      "Boiled in open pans within four hours of cane crushing, clarified only with natural bhindi extract — never sodium hydrosulphite. The result is a deep gold, mineral-rich unrefined sugar with a clean caramel finish.",
    description:
      "Our Kolhapur units run dedicated hydros-free production windows for export clients, with batch-wise sucrose, ash and colour testing. Available as cubes, discs, fine powder and clarified liquid gur for beverage formulators.",
    grades: [
      { name: "Organic Golden Cubes", spec: "20 – 25 g cubes", note: "Retail & foodservice" },
      { name: "Natural Fine Powder", spec: "Free-flowing, 30 mesh", note: "Bakery & blending" },
      { name: "Clarified Liquid Gur", spec: "70 – 75 Brix", note: "Beverage & syrup formulation" },
    ],
    specs: [
      ["Sucrose", "> 80.0 %"],
      ["Additives", "0 % — hydros & sulphur free"],
      ["Moisture", "< 6.0 %"],
      ["Shelf life", "18 months"],
      ["Certification", "FSSAI, organic on request"],
      ["Packaging", "1 kg food-grade pouch / 25 kg master box"],
    ],
    moq: "1 x 20ft FCL — 20 MT",
    incoterms: ["FOB Nhava Sheva", "CIF", "CFR", "EXW Kolhapur"],
    markets: ["United States", "Kenya", "Malaysia", "New Zealand"],
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
    body: "We contract directly with agrarian cooperatives across Bihar, Kashmir, Rajasthan and Maharashtra. No intermediaries, no blended lots — every container is traceable to a named cluster and crop window.",
  },
  {
    number: "02",
    title: "Phytosanitary & laboratory rigour",
    body: "Each batch passes triple-stage analysis for moisture, aflatoxins, heavy metals and pesticide residue in NABL-accredited labs before a single bag is stuffed at port.",
  },
  {
    number: "03",
    title: "Moisture-locked export packaging",
    body: "Vacuum sealing, modified-atmosphere packaging and nitrogen-flushed bulk liners protect crunch, colour and aroma across sixty days of ocean freight.",
  },
  {
    number: "04",
    title: "Documented, guaranteed shipping",
    body: "FOB, CIF, CFR and EXW terms with a complete document set: Certificate of Origin, APEDA registration, FSSAI, phytosanitary certificate and third-party inspection on request.",
  },
];

export const STATS = [
  ["18", "Export destinations"],
  ["340+", "Contracted farm households"],
  ["99.5%", "Sortex purity standard"],
  ["ISO 22000", "Food safety system"],
];

export const CERTS = [
  "APEDA Registered Exporter",
  "FSSAI Licensed",
  "ISO 22000 : 2018",
  "HACCP Compliant",
  "IEC Certified",
  "Spices Board / DGFT",
];
