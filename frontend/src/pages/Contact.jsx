import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import { MaskLines, Reveal } from "../components/motion/Reveal";
import { PRODUCTS } from "../data/products";

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
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-hg-fg3">
        {label}
        {required && <span className="ml-1 text-hg-gold">*</span>}
      </span>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[9px] uppercase tracking-[0.14em] text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
    <div className={error ? "[&_.hg-input]:border-red-400/70" : ""}>{children}</div>
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
      toast.success("Enquiry received", {
        description: `Reference ${ref} — our export desk will respond within one business day.`,
        duration: 6000,
      });
    }, 900);
  };

  return (
    <div data-testid="page-contact" className="pt-[68px] sm:pt-[84px]">
      <section className="hg-container pt-20 pb-14 sm:pt-28 sm:pb-20">
        <p className="hg-eyebrow">Contact — Export desk</p>
        <MaskLines
          data-testid="contact-heading"
          delay={0.12}
          className="hg-display mt-6 text-[14vw] leading-[0.86] text-hg-fg sm:text-[9.5vw] lg:text-[7vw]"
          lines={["Let's talk", "tonnage."]}
        />
        <Reveal delay={0.35}>
          <p className="hg-italic mt-6 max-w-2xl text-xl text-hg-gold sm:text-2xl">
            Send us your specification. We reply with grades, packing options and FOB pricing
            within one business day.
          </p>
        </Reveal>
      </section>

      <section className="hg-container pb-24 sm:pb-32">
        <div className="grid grid-cols-1 gap-14 border-t border-hg-line pt-12 lg:grid-cols-12 lg:gap-16">
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
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-hg-gold/40 bg-hg-card p-8 sm:p-12"
                >
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="grid h-14 w-14 place-items-center rounded-full border border-hg-gold text-hg-gold"
                  >
                    <Check size={22} />
                  </motion.span>
                  <h2 className="hg-display mt-8 text-4xl text-hg-fg sm:text-5xl">
                    Enquiry logged
                  </h2>
                  <p className="hg-italic mt-3 text-xl text-hg-gold">
                    Reference {done.ref}
                  </p>
                  <p className="mt-6 max-w-lg text-sm leading-[1.85] text-hg-fg2">
                    Thank you, {done.name.split(" ")[0]}. Our export desk has your requirement
                    for <span className="text-hg-fg">{done.product}</span> and will respond to{" "}
                    <span className="text-hg-fg">{done.email}</span> within one business day
                    with grade options, packing formats and indicative pricing.
                  </p>
                  <dl className="mt-9 grid grid-cols-1 gap-y-4 border-t border-hg-line pt-7 sm:grid-cols-2">
                    {[
                      ["Company", `${done.company}, ${done.country}`],
                      ["Product interest", done.product],
                      ["Volume", done.volume || "To be confirmed"],
                      ["Incoterm", done.incoterm || "To be discussed"],
                      ["Destination port", done.port || "To be confirmed"],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-hg-fg3">
                          {k}
                        </dt>
                        <dd className="mt-1.5 text-sm text-hg-fg">{v}</dd>
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
                      className="hg-btn"
                    >
                      <span>Submit another enquiry</span>
                    </button>
                    <Link to="/products" className="hg-btn" data-testid="success-browse-products">
                      <span>Browse catalogue</span>
                    </Link>
                  </div>
                  <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.18em] text-hg-fg3">
                    Demo site — enquiries are validated locally and not transmitted.
                  </p>
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
                    <Field label="Full name" error={errors.name}>
                      <input
                        data-testid="enquiry-name-input"
                        className="hg-input"
                        value={values.name}
                        onChange={set("name")}
                        placeholder="Ana Ferreira"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Business email" error={errors.email}>
                      <input
                        data-testid="enquiry-email-input"
                        className="hg-input"
                        type="email"
                        value={values.email}
                        onChange={set("email")}
                        placeholder="ana@importco.com"
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Company" error={errors.company}>
                      <input
                        data-testid="enquiry-company-input"
                        className="hg-input"
                        value={values.company}
                        onChange={set("company")}
                        placeholder="ImportCo Trading BV"
                        autoComplete="organization"
                      />
                    </Field>
                    <Field label="Country" error={errors.country}>
                      <input
                        data-testid="enquiry-country-input"
                        className="hg-input"
                        value={values.country}
                        onChange={set("country")}
                        placeholder="Netherlands"
                        autoComplete="country-name"
                      />
                    </Field>
                    <Field label="Product interest" error={errors.product}>
                      <select
                        data-testid="enquiry-product-select"
                        className="hg-input"
                        value={values.product}
                        onChange={set("product")}
                      >
                        <option value="">Select a programme</option>
                        {PRODUCTS.map((p) => (
                          <option key={p.slug} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                        <option value="Multi-product container">Multi-product container</option>
                      </select>
                    </Field>
                    <Field label="Target volume" required={false}>
                      <input
                        data-testid="enquiry-volume-input"
                        className="hg-input"
                        value={values.volume}
                        onChange={set("volume")}
                        placeholder="1 x 20ft FCL / 20 MT monthly"
                      />
                    </Field>
                    <Field label="Preferred incoterm" required={false}>
                      <select
                        data-testid="enquiry-incoterm-select"
                        className="hg-input"
                        value={values.incoterm}
                        onChange={set("incoterm")}
                      >
                        <option value="">Select incoterm</option>
                        {INCOTERMS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Destination port" required={false}>
                      <input
                        data-testid="enquiry-port-input"
                        className="hg-input"
                        value={values.port}
                        onChange={set("port")}
                        placeholder="Rotterdam"
                      />
                    </Field>
                  </div>

                  <Field label="Specification & message" error={errors.message}>
                    <textarea
                      data-testid="enquiry-message-input"
                      className="hg-input resize-none"
                      rows={5}
                      value={values.message}
                      onChange={set("message")}
                      placeholder="Grades required, packaging format, certification needs, target landing window…"
                    />
                  </Field>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <button
                      type="submit"
                      data-testid="contact-form-submit-button"
                      disabled={submitting}
                      className="hg-btn hg-btn--solid disabled:opacity-60"
                    >
                      <span>{submitting ? "Sending…" : "Send enquiry"}</span>
                      {!submitting && <ArrowUpRight size={13} className="relative z-[2]" />}
                    </button>
                    <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-hg-fg3">
                      Fields marked * are required
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-hg-line bg-hg-card p-7 sm:p-8">
              <p className="hg-eyebrow">Export desk</p>
              <div className="mt-7 space-y-6">
                {[
                  [Mail, "exports@harvestgateoverseas.com", "mailto:exports@harvestgateoverseas.com"],
                  [Phone, "+91 90 0000 0000", "tel:+919000000000"],
                ].map(([Icon, text, href]) => (
                  <a
                    key={text}
                    href={href}
                    className="flex items-start gap-4 text-sm text-hg-fg2 transition-colors hover:text-hg-gold"
                  >
                    <Icon size={14} className="mt-0.5 shrink-0 text-hg-gold" />
                    <span className="break-all">{text}</span>
                  </a>
                ))}
                <p className="flex items-start gap-4 text-sm leading-relaxed text-hg-fg2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-hg-gold" />
                  Registered office: Patna, Bihar 800001, India
                  <br />
                </p>
                <p className="flex items-start gap-4 text-sm leading-relaxed text-hg-fg2">
                  <Clock size={14} className="mt-0.5 shrink-0 text-hg-gold" />
                  Mon – Sat, 09:30 – 19:00 IST (GMT +5:30)
                </p>
              </div>
            </div>

            <div className="mt-7 border border-hg-line p-7 sm:p-8">
              <p className="hg-eyebrow">What to expect</p>
              <ol className="mt-6 space-y-5">
                {[
                  "Spec sheet and grade options within 1 business day",
                  "Free samples couriered at buyer's freight cost",
                  "Indicative FOB / CIF pricing with validity window",
                  "Third-party inspection arranged on request",
                ].map((s, i) => (
                  <li key={s} className="flex gap-4 text-sm leading-relaxed text-hg-fg2">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-hg-gold">
                      0{i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-7 border border-hg-line bg-hg-bg2 p-7">
              <p className="hg-italic text-lg text-hg-fg">
                “Send the grade you want. We will tell you honestly whether we can hold it
                every month.”
              </p>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-hg-fg3">
                — Export desk, HarvestGate Overseas
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
