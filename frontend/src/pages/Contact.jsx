import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, ArrowUpRight, Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { MaskLines, Reveal } from "../components/motion/Reveal";
import { PRODUCTS, CERTS } from "../data/products";

const INCOTERMS = ["FOB", "CIF", "CFR", "EXW", "Not sure yet"];

const EMPTY = {
  name: "",
  email: "",
  company: "",
  country: "",
  product: "",
  volume: "",
  incoterm: "",
  port: "",
  message: "",
};

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your full name";
  else if (v.name.trim().length < 2) e.name = "Name looks too short";
  if (!v.email.trim()) e.email = "Business email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v.email.trim()))
    e.email = "Enter a valid email address";
  if (!v.company.trim()) e.company = "Company name is required";
  if (!v.country.trim()) e.country = "Country is required";
  if (!v.product) e.product = "Select a product interest";
  if (!v.message.trim()) e.message = "Tell us what you need";
  else if (v.message.trim().length < 15) e.message = "Please add a little more detail (15+ characters)";
  return e;
};

const Field = ({ label, error, children, className = "", required = true }) => (
  <label className={`block ${className}`}>
    <span className="flex items-baseline justify-between gap-3">
      <span className="font-mono text-[11.5px] uppercase tracking-[0.22em] text-hg-fg font-bold">
        {label}
        {required && <span className="ml-1 text-hg-gold">*</span>}
      </span>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-red-500 font-bold"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
    <div className={error ? "[&_.hg-input]:border-red-400" : ""}>{children}</div>
  </label>
);

const Contact = () => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k) => (e) => {
    const val = e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error("Please correct the highlighted fields", {
        description: `${Object.keys(found).length} field(s) need attention.`,
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const ref = `HG-${Date.now().toString().slice(-6)}`;
      setSubmitting(false);
      setDone({ ...values, ref });
      toast.success("Export Enquiry Logged", {
        description: `Reference ${ref} — our export desk will respond within one business day.`,
        duration: 6000,
      });
    }, 800);
  };

  return (
    <div data-testid="page-contact" className="pt-[110px] sm:pt-[130px]">
      <section className="hg-container pt-14 pb-14 sm:pt-20 sm:pb-20">
        <p className="hg-eyebrow text-[12px] font-bold">Contact — Direct Export Desk</p>
        <MaskLines
          data-testid="contact-heading"
          delay={0.12}
          className="hg-display mt-6 text-[14vw] leading-[0.88] text-hg-fg sm:text-[9vw] lg:text-[7vw] font-extrabold"
          lines={["Let's talk", "tonnage."]}
        />
        <Reveal delay={0.25}>
          <p className="hg-italic mt-6 max-w-3xl text-2xl text-hg-gold font-medium sm:text-3xl">
            Send us your crop specification, required grade and target container volume. We reply with certified specs, packing formats and FOB / CIF pricing within one business day.
          </p>
        </Reveal>
      </section>

      <section className="hg-container pb-24 sm:pb-32">
        <div className="grid grid-cols-1 gap-14 border-t-2 border-hg-line pt-12 lg:grid-cols-12 lg:gap-16">
          {/* FORM */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  data-testid="enquiry-success-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-2 border-hg-gold bg-hg-card p-8 sm:p-12 shadow-xl"
                >
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="grid h-16 w-16 place-items-center rounded-full border-2 border-hg-gold text-hg-gold bg-hg-gold/10"
                  >
                    <Check size={28} />
                  </motion.span>
                  <h2 className="hg-display mt-8 text-4xl text-hg-fg sm:text-5xl font-extrabold">
                    Enquiry Logged
                  </h2>
                  <p className="hg-italic mt-2 text-2xl text-hg-gold font-semibold">
                    Reference ID: {done.ref}
                  </p>
                  <p className="mt-6 max-w-xl text-base leading-[1.85] text-hg-fg font-medium">
                    Thank you, <span className="font-bold">{done.name.split(" ")[0]}</span>. Our export desk has received your requirement
                    for <span className="font-bold text-hg-gold">{done.product}</span> and will respond to{" "}
                    <span className="font-bold text-hg-fg underline">{done.email}</span> within one business day
                    with grade options, packing formats and indicative container pricing.
                  </p>
                  <dl className="mt-9 grid grid-cols-1 gap-y-4 border-t-2 border-hg-line pt-7 sm:grid-cols-2">
                    {[
                      ["Company", `${done.company}, ${done.country}`],
                      ["Commodity Interest", done.product],
                      ["Target Volume", done.volume || "1 x 20ft FCL"],
                      ["Incoterm", done.incoterm || "FOB / CIF"],
                      ["Destination Port", done.port || "To be confirmed"],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-hg-fg3 font-bold">
                          {k}
                        </dt>
                        <dd className="mt-1.5 text-[15px] font-bold text-hg-fg">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <button
                      type="button"
                      data-testid="enquiry-new-button"
                      onClick={() => {
                        setValues(EMPTY);
                        setErrors({});
                        setDone(null);
                      }}
                      className="hg-btn font-bold text-[12px]"
                    >
                      <span>Submit Another Requirement</span>
                    </button>
                    <Link to="/products" className="hg-btn hg-btn--solid font-bold text-[12px]" data-testid="success-browse-products">
                      <span>Browse Full Catalogue</span>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  data-testid="enquiry-form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-9"
                >
                  <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <Field label="Full Name" error={errors.name}>
                      <input
                        data-testid="enquiry-name-input"
                        className="hg-input"
                        value={values.name}
                        onChange={set("name")}
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Business Email" error={errors.email}>
                      <input
                        data-testid="enquiry-email-input"
                        className="hg-input"
                        type="email"
                        value={values.email}
                        onChange={set("email")}
                        placeholder="buyer@globalimport.com"
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Company / Entity" error={errors.company}>
                      <input
                        data-testid="enquiry-company-input"
                        className="hg-input"
                        value={values.company}
                        onChange={set("company")}
                        placeholder="Global Foods Trading Ltd."
                        autoComplete="organization"
                      />
                    </Field>
                    <Field label="Destination Country" error={errors.country}>
                      <input
                        data-testid="enquiry-country-input"
                        className="hg-input"
                        value={values.country}
                        onChange={set("country")}
                        placeholder="United States / UAE / UK"
                        autoComplete="country-name"
                      />
                    </Field>
                    <Field label="Product / Commodity Interest" error={errors.product}>
                      <select
                        data-testid="enquiry-product-select"
                        className="hg-input font-medium"
                        value={values.product}
                        onChange={set("product")}
                      >
                        <option value="">Select a commodity</option>
                        {PRODUCTS.map((p) => (
                          <option key={p.slug} value={p.name}>
                            {p.name} ({p.subtitle})
                          </option>
                        ))}
                        <option value="Multi-Commodity Consolidated Container">Multi-Commodity Consolidated Container</option>
                      </select>
                    </Field>
                    <Field label="Target Volume" required={false}>
                      <input
                        data-testid="enquiry-volume-input"
                        className="hg-input"
                        value={values.volume}
                        onChange={set("volume")}
                        placeholder="e.g. 1 x 20ft FCL / 50 MT monthly"
                      />
                    </Field>
                    <Field label="Preferred Incoterm" required={false}>
                      <select
                        data-testid="enquiry-incoterm-select"
                        className="hg-input font-medium"
                        value={values.incoterm}
                        onChange={set("incoterm")}
                      >
                        <option value="">Select Incoterm</option>
                        {INCOTERMS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Destination Port" required={false}>
                      <input
                        data-testid="enquiry-port-input"
                        className="hg-input"
                        value={values.port}
                        onChange={set("port")}
                        placeholder="e.g. Jebel Ali / Rotterdam / Houston"
                      />
                    </Field>
                  </div>

                  <Field label="Specifications, Quality Parameters & Notes" error={errors.message}>
                    <textarea
                      data-testid="enquiry-message-input"
                      className="hg-input resize-none"
                      rows={5}
                      value={values.message}
                      onChange={set("message")}
                      placeholder="Specify required grades, moisture limits, packaging format (vacuum/PP/jute/retail), labeling requirements, or delivery schedule…"
                    />
                  </Field>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <button
                      type="submit"
                      data-testid="contact-form-submit-button"
                      disabled={submitting}
                      className="hg-btn hg-btn--solid disabled:opacity-60 text-[13px] font-bold py-4 px-8 shadow-md"
                    >
                      <span>{submitting ? "Processing…" : "Submit Export Enquiry"}</span>
                      {!submitting && <ArrowUpRight size={15} className="relative z-[2]" />}
                    </button>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-hg-fg3 font-semibold">
                      Fields marked * are required
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 lg:col-start-9 space-y-7">
            <div className="border-2 border-hg-line bg-hg-card p-7 sm:p-8 shadow-md">
              <p className="hg-eyebrow text-[12px] font-bold">Export Desk Contacts</p>
              <div className="mt-7 space-y-6">
                {[
                  [Mail, "admin@harvestgateoverseas.com", "mailto:admin@harvestgateoverseas.com"],
                  [Phone, "+91 8077078313", "tel:+918077078313"],
                ].map(([Icon, text, href]) => (
                  <a
                    key={text}
                    href={href}
                    className="flex items-start gap-4 text-[15px] font-bold text-hg-fg transition-colors hover:text-hg-gold"
                  >
                    <Icon size={18} className="mt-0.5 shrink-0 text-hg-gold" />
                    <span className="break-all">{text}</span>
                  </a>
                ))}
                <p className="flex items-start gap-4 text-[14px] leading-relaxed text-hg-fg font-medium">
                  <MapPin size={18} className="mt-1 shrink-0 text-hg-gold" />
                  <span>Mig-14, Kanth Rd, near Muskan Nursing Home, Ashiyana Colony, Harthala, Moradabad, Uttar Pradesh, India - 244001</span>
                </p>
                <p className="flex items-start gap-4 text-[14px] leading-relaxed text-hg-fg font-medium">
                  <Clock size={18} className="mt-0.5 shrink-0 text-hg-gold" />
                  <span>Mon – Sat, 09:30 – 19:00 IST (GMT +5:30)</span>
                </p>
              </div>
            </div>

            <div className="border-2 border-hg-line bg-hg-bg2 p-7 sm:p-8 shadow-md">
              <p className="hg-eyebrow text-[12px] font-bold">Registration & Tax Identifiers</p>
              <ul className="mt-6 space-y-3 font-mono text-[12px]">
                {CERTS.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 font-bold text-hg-fg">
                    <CheckCircle2 size={14} className="text-hg-gold shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-hg-line bg-hg-card p-7 shadow-md">
              <p className="hg-italic text-xl text-hg-fg font-semibold leading-snug">
                “Direct farm contracts and laboratory certificates on every container.”
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-hg-gold font-bold">
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
