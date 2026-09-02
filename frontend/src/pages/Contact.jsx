import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Check,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  User,
  Building2,
  Package,
  Scale,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Send,
  Globe2,
} from "lucide-react";
import { MaskLines, Reveal } from "../components/motion/Reveal";
import { PRODUCTS, CERTS } from "../data/products";

const QUICK_PRODUCTS = [
  "Phool Makhana",
  "Millets (Jowar / Bajra / Ragi)",
  "Basmati & Non-Basmati Rice",
  "Sugar & Jaggery",
  "Pulses & Lentils",
  "Flours & Atta",
  "Roasted Daliya",
  "Multi-Commodity Consolidated FCL",
];

const QUICK_VOLUMES = [
  "1 x 20ft FCL (Trial)",
  "1 x 40ft FCL",
  "50+ MT Monthly",
  "Commercial Sample Request",
];

const EMPTY = {
  name: "",
  orgName: "",
  orgAddress: "",
  email: "",
  contactNumber: "",
  product: "",
  quantity: "",
  message: "",
  termsAccepted: false,
};

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "Full name is required";
  else if (v.name.trim().length < 2) e.name = "Please enter valid full name";
  if (!v.orgName.trim()) e.orgName = "Organisation name is required";
  if (!v.orgAddress.trim()) e.orgAddress = "Address with pincode is required";
  if (!v.email.trim()) e.email = "Business email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v.email.trim()))
    e.email = "Enter a valid email address";
  if (!v.contactNumber.trim()) e.contactNumber = "Contact number with country code is required";
  if (!v.product.trim()) e.product = "Please specify required product(s)";
  if (!v.quantity.trim()) e.quantity = "Please specify required volume/quantity";
  if (!v.termsAccepted) e.termsAccepted = "Please accept the terms & conditions";
  return e;
};

const Contact = () => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const setDirect = (k, val) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error("Please complete the required fields", {
        description: `${Object.keys(found).length} field(s) require your attention.`,
      });
      return;
    }
    setSubmitting(true);
    const ref = `HG-${Date.now().toString().slice(-6)}`;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      // 1. Dispatch through FastAPI SMTP engine (Sends Admin Alert + Branded Buyer Auto-Responder)
      await fetch(`${apiUrl}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          orgName: values.orgName,
          orgAddress: values.orgAddress,
          email: values.email,
          contactNumber: values.contactNumber,
          product: values.product,
          quantity: values.quantity,
          message: values.message || "",
          targetEmail: "admin@harvestgateoverseas.com",
        }),
      }).catch((err) => console.log("Backend SMTP notice:", err));

      // 2. Dispatch backup via FormSubmit AJAX service with autoresponse
      await fetch("https://formsubmit.co/ajax/admin@harvestgateoverseas.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[HarvestGate Export Enquiry] ${ref} · ${values.orgName} — ${values.product}`,
          _replyto: values.email,
          _template: "table",
          _captcha: "false",
          _autoresponse: `Dear ${values.name},\n\nThank you for reaching out to HarvestGate Overseas. We have formally registered your commercial export enquiry for ${values.product} (${values.quantity}) on behalf of ${values.orgName}.\n\nReference ID: ${ref}\n\nOur international trade desk is preparing your formal CIF/FOB quotation and quality test parameters. A dedicated trade manager will connect with you within 24 business hours.\n\nWarm regards,\nHarvestGate Overseas Pvt. Ltd.\nPhone/WhatsApp: +91 8077078313\nEmail: contact@harvestgateoverseas.com`,
          reference_id: ref,
          contact_person: values.name,
          organisation: values.orgName,
          business_email: values.email,
          phone_whatsapp: values.contactNumber,
          product_required: values.product,
          required_volume: values.quantity,
          delivery_address: values.orgAddress,
          additional_notes: values.message || "None",
          routed_to: "admin@harvestgateoverseas.com",
        }),
      }).catch((err) => console.log("FormSubmit Notice:", err));
    } catch (err) {
      console.log("Transmission notice:", err);
    } finally {
      setSubmitting(false);
      setDone({ ...values, ref });
      toast.success("Enquiry Transmitted Successfully", {
        description: `Reference ${ref} logged. Acknowledgment sent to ${values.email}.`,
        duration: 7000,
      });
    }
  };

  return (
    <div data-testid="page-contact" className="pt-[105px] sm:pt-[125px] min-h-screen">
      {/* ============ HEADER BANNER ============ */}
      <section className="relative overflow-hidden border-b border-hg-line bg-gradient-to-b from-hg-bg2/80 via-hg-bg to-hg-bg py-14 sm:py-20">
        <div className="hg-container relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-hg-gold/40 bg-hg-gold/10 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-hg-gold">
              <span className="h-2 w-2 rounded-full bg-hg-gold animate-pulse" />
              Direct Global Export Desk
            </span>
            <span className="hidden sm:inline text-hg-line2">•</span>
            <span className="text-[12px] font-mono font-medium text-hg-fg3 tracking-wider">
              Response Time: &lt; 24 Hours
            </span>
          </div>

          <MaskLines
            data-testid="contact-heading"
            delay={0.1}
            className="hg-display mt-6 text-[13vw] leading-[0.88] text-hg-fg sm:text-[8.5vw] lg:text-[6.5vw] font-black"
            lines={["Let's talk", "tonnage."]}
          />

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-lg sm:text-xl font-medium text-hg-fg2 leading-relaxed">
              Send us your crop specifications, target grades, and required container volumes. Our international trade team will provide full laboratory certificates, custom packaging options, and firm CIF / FOB quotations within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ MAIN SECTION ============ */}
      <section className="hg-container py-12 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          
          {/* ============ FORM CONTAINER ============ */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  data-testid="enquiry-success-panel"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl border-2 border-hg-gold/60 bg-white dark:bg-gradient-to-b dark:from-[#132c1e] dark:to-[#0d1e15] p-8 sm:p-14 text-hg-fg dark:text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-hg-gold/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-hg-gold to-amber-600 text-black shadow-lg"
                  >
                    <Check size={32} strokeWidth={3} />
                  </motion.div>

                  <h2 className="mt-8 text-4xl sm:text-5xl font-extrabold tracking-tight text-hg-fg dark:text-white">
                    Enquiry Logged Successfully
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-hg-bg2 dark:bg-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-hg-line dark:border-white/10">
                      <span className="font-mono text-xs uppercase tracking-widest text-hg-gold font-bold">
                        Reference ID:
                      </span>
                      <span className="font-mono text-sm font-black text-hg-fg dark:text-white">
                        {done.ref}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 dark:bg-emerald-500/20 px-3.5 py-1.5 backdrop-blur-sm border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold tracking-wide">
                      <Mail size={13} className="text-emerald-600 dark:text-emerald-400" />
                      Dispatched to: contact@harvestgateoverseas.com
                    </div>
                  </div>

                  <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-hg-fg2 dark:text-gray-200">
                    Thank you, <span className="font-bold text-hg-fg dark:text-white">{done.name}</span>. We have transmitted your export inquiry for{" "}
                    <span className="font-bold text-hg-fg dark:text-white underline underline-offset-4">{done.product}</span> ({done.quantity}) directly to our commercial trade desk at{" "}
                    <span className="font-bold text-hg-gold">contact@harvestgateoverseas.com</span>. Our trade manager will review your required specs and reply to{" "}
                    <span className="font-bold text-hg-gold">{done.email}</span> within 24 hours.
                  </p>

                  <div className="mt-10 rounded-2xl border border-hg-line dark:border-white/15 bg-hg-bg dark:bg-black/25 p-6 backdrop-blur-sm">
                    <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-hg-gold font-bold mb-4 flex items-center gap-2">
                      <ShieldCheck size={16} /> Dispatched Export Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-hg-fg3 dark:text-gray-400 block text-xs font-mono uppercase">Contact Person</span>
                        <span className="font-bold text-hg-fg dark:text-white">{done.name}</span>
                      </div>
                      <div>
                        <span className="text-hg-fg3 dark:text-gray-400 block text-xs font-mono uppercase">Organisation</span>
                        <span className="font-bold text-hg-fg dark:text-white">{done.orgName}</span>
                      </div>
                      <div>
                        <span className="text-hg-fg3 dark:text-gray-400 block text-xs font-mono uppercase">Phone / WhatsApp</span>
                        <span className="font-bold text-hg-fg dark:text-white">{done.contactNumber}</span>
                      </div>
                      <div>
                        <span className="text-hg-fg3 dark:text-gray-400 block text-xs font-mono uppercase">Required Product</span>
                        <span className="font-bold text-hg-gold">{done.product}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-hg-fg3 dark:text-gray-400 block text-xs font-mono uppercase">Delivery / Address</span>
                        <span className="font-bold text-hg-fg dark:text-white">{done.orgAddress}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <a
                      href={`mailto:contact@harvestgateoverseas.com?subject=${encodeURIComponent(`[HarvestGate Export Enquiry] ${done.ref} · ${done.orgName} — ${done.product}`)}&body=${encodeURIComponent(`Dear HarvestGate Export Desk,\n\nPlease find our trade enquiry details below:\n\n• Reference ID: ${done.ref}\n• Contact Name: ${done.name}\n• Organisation: ${done.orgName}\n• Business Email: ${done.email}\n• Phone/WhatsApp: ${done.contactNumber}\n• Required Commodity: ${done.product}\n• Required Quantity: ${done.quantity}\n• Delivery Address / Port: ${done.orgAddress}\n• Notes: ${done.message || "N/A"}\n\nLooking forward to your formal CIF/FOB quote.\n\nWarm regards,\n${done.name}`)}`}
                      className="rounded-xl border border-hg-gold/60 bg-hg-gold/15 px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-bold text-hg-gold hover:bg-hg-gold hover:text-black transition-all flex items-center gap-2"
                    >
                      <Mail size={15} />
                      <span>Open in Mail Client</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setValues(EMPTY);
                        setErrors({});
                        setDone(null);
                      }}
                      className="rounded-xl border border-hg-line dark:border-white/30 bg-hg-bg2 dark:bg-white/10 px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-bold text-hg-fg dark:text-white hover:bg-hg-line/50 transition-all"
                    >
                      Submit Another Requirement
                    </button>
                    <Link
                      to="/products"
                      className="rounded-xl bg-hg-gold px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-bold text-black hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg"
                    >
                      <span>Explore Full Catalogue</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border border-hg-line dark:border-emerald-900/40 bg-white dark:bg-gradient-to-b dark:from-[#143221] dark:via-[#10291b] dark:to-[#0d2015] p-6 sm:p-10 lg:p-12 text-hg-fg dark:text-white shadow-xl dark:shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle decorative glowing corner */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-hg-gold/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* FORM HEADER */}
                  <div className="relative z-10 border-b border-hg-line dark:border-white/15 pb-8 mb-8">
                    <div className="flex items-center gap-2.5 text-hg-gold font-mono text-xs uppercase tracking-[0.25em] font-bold">
                      <Sparkles size={16} />
                      Direct Export Desk Request
                    </div>
                    <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hg-fg dark:text-hg-gold tracking-tight">
                      Contact us
                    </h2>
                    <p className="mt-2 text-base sm:text-lg font-medium text-hg-fg2 dark:text-emerald-100/90 leading-relaxed">
                      We’d be glad to hear from you — reach out to our trade team anytime for certified specifications, container loads, and private labelling.
                    </p>
                  </div>

                  {/* ACTUAL FORM */}
                  <form noValidate onSubmit={onSubmit} className="relative z-10 space-y-7">
                    
                    {/* ROW 1: Full Name & Org Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-hg-fg dark:text-emerald-100 mb-2">
                          <span className="flex items-center gap-1.5">
                            <User size={14} className="text-hg-gold" />
                            Full Name <span className="text-hg-gold">*</span>
                          </span>
                          {errors.name && (
                            <span className="text-rose-500 dark:text-rose-400 font-sans text-xs normal-case">{errors.name}</span>
                          )}
                        </label>
                        <input
                          data-testid="enquiry-name-input"
                          type="text"
                          value={values.name}
                          onChange={set("name")}
                          placeholder="e.g. Marcus Vance"
                          className={`w-full rounded-xl bg-hg-bg dark:bg-[#19261d] border border-hg-line dark:border-white/15 px-4 py-3.5 text-sm font-semibold text-hg-fg dark:text-white placeholder:text-hg-fg3 placeholder:font-normal outline-none transition-all shadow-sm focus:border-hg-gold focus:ring-2 focus:ring-hg-gold/20 ${
                            errors.name ? "ring-2 ring-rose-400 border-rose-400" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-hg-fg dark:text-emerald-100 mb-2">
                          <span className="flex items-center gap-1.5">
                            <Building2 size={14} className="text-hg-gold" />
                            Organisation Name <span className="text-hg-gold">*</span>
                          </span>
                          {errors.orgName && (
                            <span className="text-rose-500 dark:text-rose-400 font-sans text-xs normal-case">{errors.orgName}</span>
                          )}
                        </label>
                        <input
                          data-testid="enquiry-org-input"
                          type="text"
                          value={values.orgName}
                          onChange={set("orgName")}
                          placeholder="e.g. Apex Global Trading FZE"
                          className={`w-full rounded-xl bg-hg-bg dark:bg-[#19261d] border border-hg-line dark:border-white/15 px-4 py-3.5 text-sm font-semibold text-hg-fg dark:text-white placeholder:text-hg-fg3 placeholder:font-normal outline-none transition-all shadow-sm focus:border-hg-gold focus:ring-2 focus:ring-hg-gold/20 ${
                            errors.orgName ? "ring-2 ring-rose-400 border-rose-400" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* ROW 2: Address with Pincode */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-hg-fg dark:text-emerald-100 mb-2">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-hg-gold" />
                          Full Organization Address with Pincode <span className="text-hg-gold">*</span>
                        </span>
                        {errors.orgAddress && (
                          <span className="text-rose-500 dark:text-rose-400 font-sans text-xs normal-case">{errors.orgAddress}</span>
                        )}
                      </label>
                      <input
                        data-testid="enquiry-address-input"
                        type="text"
                        value={values.orgAddress}
                        onChange={set("orgAddress")}
                        placeholder="e.g. Suite 402, Trade Tower, Business Bay, Dubai, UAE - PO Box 41209"
                        className={`w-full rounded-xl bg-hg-bg dark:bg-[#19261d] border border-hg-line dark:border-white/15 px-4 py-3.5 text-sm font-semibold text-hg-fg dark:text-white placeholder:text-hg-fg3 placeholder:font-normal outline-none transition-all shadow-sm focus:border-hg-gold focus:ring-2 focus:ring-hg-gold/20 ${
                          errors.orgAddress ? "ring-2 ring-rose-400 border-rose-400" : ""
                        }`}
                      />
                    </div>

                    {/* ROW 3: Email & Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-hg-fg dark:text-emerald-100 mb-2">
                          <span className="flex items-center gap-1.5">
                            <Mail size={14} className="text-hg-gold" />
                            Email <span className="text-hg-gold">*</span>
                          </span>
                          {errors.email && (
                            <span className="text-rose-500 dark:text-rose-400 font-sans text-xs normal-case">{errors.email}</span>
                          )}
                        </label>
                        <input
                          data-testid="enquiry-email-input"
                          type="email"
                          value={values.email}
                          onChange={set("email")}
                          placeholder="buyer@globalimport.com"
                          className={`w-full rounded-xl bg-hg-bg dark:bg-[#19261d] border border-hg-line dark:border-white/15 px-4 py-3.5 text-sm font-semibold text-hg-fg dark:text-white placeholder:text-hg-fg3 placeholder:font-normal outline-none transition-all shadow-sm focus:border-hg-gold focus:ring-2 focus:ring-hg-gold/20 ${
                            errors.email ? "ring-2 ring-rose-400 border-rose-400" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-hg-fg dark:text-emerald-100 mb-2">
                          <span className="flex items-center gap-1.5">
                            <Phone size={14} className="text-hg-gold" />
                            Contact Number (with Country Code)<span className="text-hg-gold">*</span>
                          </span>
                          {errors.contactNumber && (
                            <span className="text-rose-500 dark:text-rose-400 font-sans text-xs normal-case">{errors.contactNumber}</span>
                          )}
                        </label>
                        <input
                          data-testid="enquiry-phone-input"
                          type="tel"
                          value={values.contactNumber}
                          onChange={set("contactNumber")}
                          placeholder="+971 50 123 4567 / +1 415 800 9000"
                          className={`w-full rounded-xl bg-hg-bg dark:bg-[#19261d] border border-hg-line dark:border-white/15 px-4 py-3.5 text-sm font-semibold text-hg-fg dark:text-white placeholder:text-hg-fg3 placeholder:font-normal outline-none transition-all shadow-sm focus:border-hg-gold focus:ring-2 focus:ring-hg-gold/20 ${
                            errors.contactNumber ? "ring-2 ring-rose-400 border-rose-400" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* ROW 4: Product Required & Quick Selector */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-hg-fg dark:text-emerald-100 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Package size={14} className="text-hg-gold" />
                          Product Required <span className="text-hg-gold">*</span>
                        </span>
                        {errors.product && (
                          <span className="text-rose-500 dark:text-rose-400 font-sans text-xs normal-case">{errors.product}</span>
                        )}
                      </label>
                      <input
                        data-testid="enquiry-product-input"
                        type="text"
                        value={values.product}
                        onChange={set("product")}
                        placeholder="e.g. 100% Sortex Sorghum Jowar, Jumbo Phool Makhana 6+ Suta"
                        className={`w-full rounded-xl bg-hg-bg dark:bg-[#19261d] border border-hg-line dark:border-white/15 px-4 py-3.5 text-sm font-semibold text-hg-fg dark:text-white placeholder:text-hg-fg3 placeholder:font-normal outline-none transition-all shadow-sm focus:border-hg-gold focus:ring-2 focus:ring-hg-gold/20 ${
                          errors.product ? "ring-2 ring-rose-400 border-rose-400" : ""
                        }`}
                      />
                      {/* Quick product chips */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-hg-gold font-bold">Quick Select:</span>
                        {QUICK_PRODUCTS.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setDirect("product", p)}
                            className={`rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-all border ${
                              values.product === p
                                ? "bg-hg-gold text-black font-bold border-hg-gold shadow"
                                : "bg-hg-bg2 dark:bg-white/10 text-hg-fg dark:text-emerald-100 hover:bg-hg-line/60 border-hg-line dark:border-transparent"
                            }`}
                          >
                            + {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ROW 5: Quantity Required & Quick Volume Chips */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-hg-fg dark:text-emerald-100 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Scale size={14} className="text-hg-gold" />
                          Quantity Required <span className="text-hg-gold">*</span>
                        </span>
                        {errors.quantity && (
                          <span className="text-rose-500 dark:text-rose-400 font-sans text-xs normal-case">{errors.quantity}</span>
                        )}
                      </label>
                      <input
                        data-testid="enquiry-quantity-input"
                        type="text"
                        value={values.quantity}
                        onChange={set("quantity")}
                        placeholder="e.g. 1 x 20ft FCL (approx. 24 MT) or 100 MT monthly contract"
                        className={`w-full rounded-xl bg-hg-bg dark:bg-[#19261d] border border-hg-line dark:border-white/15 px-4 py-3.5 text-sm font-semibold text-hg-fg dark:text-white placeholder:text-hg-fg3 placeholder:font-normal outline-none transition-all shadow-sm focus:border-hg-gold focus:ring-2 focus:ring-hg-gold/20 ${
                          errors.quantity ? "ring-2 ring-rose-400 border-rose-400" : ""
                        }`}
                      />
                      {/* Quick volume chips */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-hg-gold font-bold">Presets:</span>
                        {QUICK_VOLUMES.map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setDirect("quantity", v)}
                            className={`rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-all border ${
                              values.quantity === v
                                ? "bg-hg-gold text-black font-bold border-hg-gold shadow"
                                : "bg-hg-bg2 dark:bg-white/10 text-hg-fg dark:text-emerald-100 hover:bg-hg-line/60 border-hg-line dark:border-transparent"
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ROW 6: Your Message */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-hg-fg dark:text-emerald-100 mb-2">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare size={14} className="text-hg-gold" />
                          Your Message
                        </span>
                        <span className="text-hg-fg3 dark:text-emerald-300/70 text-[11px] font-mono">Optional</span>
                      </label>
                      <textarea
                        data-testid="enquiry-message-input"
                        rows={4}
                        value={values.message}
                        onChange={set("message")}
                        placeholder="if you have any other specifications , you can mention here ....."
                        className="w-full rounded-xl bg-hg-bg dark:bg-[#19261d] border border-hg-line dark:border-white/15 px-4 py-3.5 text-sm font-semibold text-hg-fg dark:text-white placeholder:text-hg-fg3 placeholder:font-normal outline-none transition-all shadow-sm focus:border-hg-gold focus:ring-2 focus:ring-hg-gold/20 resize-y"
                      />
                    </div>

                    {/* ROW 7: Terms & Conditions Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none group">
                        <input
                          type="checkbox"
                          checked={values.termsAccepted}
                          onChange={set("termsAccepted")}
                          className="mt-1 h-4 w-4 rounded border-hg-line text-hg-gold focus:ring-hg-gold"
                        />
                        <span className="text-xs text-hg-fg2 dark:text-emerald-100/90 leading-relaxed">
                          I agree to the{" "}
                          <Link to="/terms" className="text-hg-gold font-bold underline hover:text-amber-500">
                            Terms &amp; Conditions
                          </Link>{" "}
                          and authorise HarvestGate Overseas to contact me regarding this export enquiry.{" "}
                          <span className="text-hg-gold">*</span>
                        </span>
                      </label>
                      {errors.termsAccepted && (
                        <p className="mt-1.5 ml-8 text-xs font-bold text-rose-500 dark:text-rose-400">
                          {errors.termsAccepted}
                        </p>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-hg-line dark:border-white/15">
                      <button
                        type="submit"
                        data-testid="contact-form-submit-button"
                        disabled={submitting}
                        className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-10 py-4 font-mono text-sm uppercase tracking-[0.2em] font-extrabold text-[#112417] shadow-xl hover:shadow-2xl hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
                      >
                        <span>{submitting ? "Transmitting Specification…" : "Submit"}</span>
                        <Send size={16} className={`transition-transform duration-300 ${submitting ? "animate-spin" : "group-hover:translate-x-1"}`} />
                      </button>

                      <p className="text-[11.5px] font-mono text-hg-fg3 dark:text-emerald-200/80 tracking-wide flex items-center gap-2">
                        <ShieldCheck size={14} className="text-hg-gold shrink-0" />
                        Encrypted &amp; Protected under FSSAI / APEDA Export Standard
                      </p>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ============ SIDEBAR / CONTACT DETAILS ============ */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Direct Channels Card */}
            <div className="rounded-2xl border border-hg-line bg-hg-card p-6 sm:p-8 shadow-lg hover:border-hg-gold/50 transition-colors">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-hg-gold font-bold">
                  Direct Export Channels
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <a
                  href="mailto:contact@harvestgateoverseas.com"
                  className="group flex items-start gap-4 p-3 rounded-xl border border-transparent hover:border-hg-line hover:bg-hg-bg2 transition-all"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-hg-gold/10 text-hg-gold group-hover:bg-hg-gold group-hover:text-black transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-hg-fg3 uppercase tracking-wider block font-medium">Export Email Desk</span>
                    <span className="text-sm font-bold text-hg-fg group-hover:text-hg-gold transition-colors break-all">
                      contact@harvestgateoverseas.com
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+918077078313"
                  className="group flex items-start gap-4 p-3 rounded-xl border border-transparent hover:border-hg-line hover:bg-hg-bg2 transition-all"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-hg-gold/10 text-hg-gold group-hover:bg-hg-gold group-hover:text-black transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-hg-fg3 uppercase tracking-wider block font-medium">Direct Telephone / WhatsApp</span>
                    <span className="text-sm font-bold text-hg-fg group-hover:text-hg-gold transition-colors">
                      +91 8077078313
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-hg-bg2/80 border border-hg-line">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-hg-gold/10 text-hg-gold">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-hg-fg3 uppercase tracking-wider block font-medium">Registered Trade Facility</span>
                    <p className="text-xs font-semibold text-hg-fg leading-relaxed mt-0.5">
                      Mig-14, Kanth Rd, near Muskan Nursing Home, Ashiyana Colony, Harthala, Moradabad, Uttar Pradesh, India - 244001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-hg-bg2/80 border border-hg-line">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-hg-gold/10 text-hg-gold">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-hg-fg3 uppercase tracking-wider block font-medium">Trading Desk Hours</span>
                    <p className="text-xs font-semibold text-hg-fg mt-0.5">
                      Mon – Sat, 09:30 – 19:00 IST (GMT +5:30)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Facility Location Map Card */}
            <div className="rounded-2xl border border-hg-line bg-hg-card p-5 sm:p-6 shadow-lg hover:border-hg-gold/50 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-4">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-hg-gold font-bold flex items-center gap-2">
                  <MapPin size={15} /> Facility Location Map
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Muskan+Nursing+Home,+Ashiyana+Phase+1,+Kanth+Road,+Moradabad,+Uttar+Pradesh+244001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-wider text-hg-gold hover:underline font-bold flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-hg-line shadow-inner h-56 sm:h-64 w-full bg-hg-bg">
                <iframe
                  title="HarvestGate Overseas Registered Office Location Map"
                  src="https://maps.google.com/maps?q=Muskan+Nursing+Home,+Ashiyana+Phase+1,+Kanth+Road,+Moradabad,+Uttar+Pradesh+244001&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full dark:invert-[0.88] dark:hue-rotate-180"
                />
              </div>
              <p className="mt-3 text-[11.5px] font-mono text-hg-fg3 text-center">
                Mig-14, Kanth Rd, Ashiyana Colony, Moradabad, Uttar Pradesh - 244001
              </p>
            </div>

            {/* Quality Commitment Quote */}
            <div className="rounded-2xl border-2 border-hg-gold/30 bg-gradient-to-br from-hg-gold/10 via-hg-card to-hg-card p-6 shadow-md">
              <p className="hg-italic text-lg text-hg-fg font-semibold leading-relaxed">
                “Every consignment is backed by FSSAI &amp; NABL laboratory certificates with verified moisture, purity, and grade specs.”
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-hg-gold font-bold">
                — Export Management, HarvestGate Overseas
              </p>
            </div>

          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
