import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, CheckCircle2, ChevronDown, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import Layout from "@/components/layout";
import content from "@/data/content.json";
import { useAlert } from "@/context/alert-context";

const getProjectTypeLabel = (value) => {
  switch (value) {
    case "web-design": {
      return "Product Design";
    }
    case "development": {
      return "Full-Stack Development";
    }
    case "consultancy": {
      return "Creative Strategy";
    }
    case "system-report": {
      return "System Diagnostic / Bug Report";
    }
    case "other": {
      return "Something Else";
    }
    default: {
      return "General Inquiry";
    }
  }
};

export default function Contact() {
  const { showAlert } = useAlert();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (router.isReady && router.query.type) {
      const queryType = router.query.type;
      const isValidType = content.contact.form.projectTypes.some(
        (t) => t.value === queryType
      );
      if (isValidType) {
        timeoutId = setTimeout(() => {
          setFormData((previous) => ({ ...previous, subject: queryType }));
        }, 0);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [router.isReady, router.query]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showAlert("Please fill in all required fields.", {
        type: "error",
        title: "Validation Error",
      });
      return;
    }

    setIsSubmitting(true);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateAdminID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN;
    const templateClientID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateAdminID || !templateClientID || !publicKey) {
      console.error("EmailJS environment variables are missing.");
      showAlert(
        "Inquiry configuration is not set up correctly. Please contact me directly.",
        {
          type: "error",
          title: "Configuration Error",
          duration: 10_000,
        }
      );
      setIsSubmitting(false);
      return;
    }

    const templateParameters = {
      name: formData.name,
      email: formData.email,
      subject: getProjectTypeLabel(formData.subject),
      message: formData.message,
    };

    Promise.all([
      emailjs.send(serviceID, templateAdminID, templateParameters, publicKey),
      emailjs.send(serviceID, templateClientID, templateParameters, publicKey),
    ])
      .then(() => {
        setIsSubmitted(true);
        showAlert("Your message has been sent successfully!", {
          type: "success",
          title: "Message Sent",
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error("EmailJS submission failure:", error);
        showAlert(
          "Failed to send message. Please check your internet connection and try again.",
          {
            type: "error",
            title: "Delivery Failed",
            duration: 8000,
          }
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const connectLinks = [
    { name: "LinkedIn", href: content.common.socials.linkedin },
    { name: "GitHub", href: content.common.socials.github },
  ];

  return (
    <Layout
      title={content.contact.seo.title}
      description={content.contact.seo.description}
    >
      <main className="min-h-screen pt-40 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-hidden">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-20 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight"
          >
            {content.contact.header.titlePart1}<span className="italic font-normal">{content.contact.header.titleItalic}</span>{content.contact.header.titleSuffix}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
          >
            {content.contact.header.description}
          </motion.p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Sidebar (Left column) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="lg:col-span-4 space-y-12"
          >
            {/* Availability */}
            <section>
              <span className="font-label-caps text-primary mb-4 block uppercase tracking-widest font-bold">
                {content.contact.sidebar.availabilityLabel}
              </span>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                <p className="font-body-md text-on-surface font-semibold">{content.contact.sidebar.availabilityStatus}</p>
              </div>
            </section>

            {/* Location */}
            <section>
              <span className="font-label-caps text-primary mb-4 block uppercase tracking-widest font-bold">
                {content.contact.sidebar.locationLabel}
              </span>
              <p className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
                {content.contact.sidebar.locationValue}
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {content.contact.sidebar.locationDescription}
              </p>
            </section>

            {/* Connect */}
            <section>
              <span className="font-label-caps text-primary mb-4 block uppercase tracking-widest font-bold">
                {content.contact.sidebar.connectLabel}
              </span>
              <div className="flex flex-col gap-4">
                {connectLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-transparent hover:border-outline-variant transition-all duration-300 cursor-pointer"
                  >
                    <span className="font-body-lg text-on-surface font-semibold">{link.name}</span>
                    <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Contact Form / Success Container (Right column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="lg:col-span-8 bg-surface-container-lowest p-8 md:p-12 lg:p-16 rounded-[2.5rem] luxury-shadow border border-surface-container-highest"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-20 space-y-6"
                >
                  <div className="flex justify-center text-secondary">
                    <CheckCircle2 size={64} className="stroke-[1.5]" />
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">{content.contact.success.title}</h2>
                  <p className="font-body-lg text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    {content.contact.success.description}
                  </p>
                  <button
                    className="mt-8 text-primary font-label-caps font-bold underline underline-offset-4 hover:text-primary-container transition-colors"
                    onClick={() => {
                      setFormData({ name: "", email: "", subject: "", message: "" });
                      setIsSubmitted(false);
                    }}
                  >
                    {content.contact.success.backButton}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-12"
                  suppressHydrationWarning={true}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {/* Name Field */}
                    <div className="relative flex flex-col" suppressHydrationWarning={true}>
                      <input
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="floating-label-input peer form-input-border text-body-lg w-full py-2"
                        placeholder=" "
                        type="text"
                        required
                        suppressHydrationWarning={true}
                      />
                      <label
                        className="absolute left-0 top-0 font-label-caps transition-all pointer-events-none font-bold"
                        htmlFor="name"
                      >
                        {content.contact.form.nameLabel}
                      </label>
                    </div>

                    {/* Email Field */}
                    <div className="relative flex flex-col" suppressHydrationWarning={true}>
                      <input
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="floating-label-input peer form-input-border text-body-lg w-full py-2"
                        placeholder=" "
                        type="email"
                        required
                        suppressHydrationWarning={true}
                      />
                      <label
                        className="absolute left-0 top-0 font-label-caps transition-all pointer-events-none font-bold"
                        htmlFor="email"
                      >
                        {content.contact.form.emailLabel}
                      </label>
                    </div>
                  </div>

                  {/* Subject/Project Selector */}
                  <div className="relative flex flex-col">
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input-border text-body-lg w-full py-2 appearance-none cursor-pointer pr-8 text-on-surface-variant font-medium"
                    >
                      <option value="" disabled>{content.contact.form.projectTypeLabel}</option>
                      {content.contact.form.projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={20} className="absolute right-0 bottom-2.5 pointer-events-none text-on-surface-variant" />
                  </div>

                  {/* Message Field */}
                  <div className="relative flex flex-col pt-4">
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="floating-label-input peer form-input-border text-body-lg w-full py-2 resize-none"
                      placeholder=" "
                      rows={4}
                      required
                      suppressHydrationWarning={true}
                    />
                    <label
                      className="absolute left-0 top-4 font-label-caps transition-all pointer-events-none font-bold"
                      htmlFor="message"
                    >
                      {content.contact.form.messageLabel}
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                    <p className="font-body-md text-on-surface-variant italic text-sm text-center md:text-left">
                      {content.contact.form.privacyPrefix}
                      <button
                        type="button"
                        onClick={() => setIsPrivacyModalOpen(true)}
                        className="underline hover:text-primary cursor-pointer font-medium bg-transparent border-none p-0 inline focus:outline-none"
                      >
                        {content.contact.form.privacyTermsLink}
                      </button>
                      {content.contact.form.privacySuffix}
                    </p>
                    <button
                      className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 rounded-full font-label-caps font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                      type="submit"
                      disabled={isSubmitting}
                      aria-disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          Sending...
                          <svg className="animate-spin h-4 w-4 text-on-primary" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        </>
                      ) : (
                        <>
                          {content.contact.form.submitButton}
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {isPrivacyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsPrivacyModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg p-8 md:p-10 rounded-[2rem] bg-surface border border-outline-variant/30 shadow-2xl space-y-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{content.contact.privacyModal.title}</h3>
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  aria-label={content.contact.privacyModal.closeLabel}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="font-body-md text-on-surface-variant text-sm leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {content.contact.privacyModal.paragraphs.map((p, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-caps font-bold tracking-wider hover:opacity-90 transition-all cursor-pointer"
                >
                  {content.contact.privacyModal.button}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
