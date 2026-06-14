import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, CheckCircle2, ChevronDown, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import TopNavBar from "@/components/top-nav-bar";
import Footer from "@/components/footer";

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
    case "other": {
      return "Something Else";
    }
    default: {
      return "General Inquiry";
    }
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateAdminID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN;
    const templateClientID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateAdminID || !templateClientID || !publicKey) {
      console.error("EmailJS environment variables are missing.");
      setSubmitError("Inquiry configuration is not set up correctly. Please contact me directly.");
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
      })
      .catch((error) => {
        console.error("EmailJS submission failure:", error);
        setSubmitError("Failed to send message. Please check your internet connection and try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const connectLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/in/idotanne" },
    { name: "GitHub", href: "https://github.com/itanne99" },
  ];

  return (
    <>
      <Head>
        <title>Contact | Ido Tanne</title>
        <meta
          name="description"
          content="Initiate a project or reach out to Ido Tanne. Let&apos;s build something timeless."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
        <TopNavBar />

        <main className="min-h-screen pt-40 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-hidden">
          {/* Header */}
          <header className="max-w-4xl mx-auto mb-20 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight"
            >
              Let&apos;s build something <span className="italic font-normal">timeless</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
            >
              Whether you have a specific project in mind or just want to explore the possibilities of a new collaboration, I&apos;m here to bring precision and warmth to your vision.
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
                  Availability
                </span>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                  <p className="font-body-md text-on-surface font-semibold">Accepting new projects</p>
                </div>
              </section>

              {/* Location */}
              <section>
                <span className="font-label-caps text-primary mb-4 block uppercase tracking-widest font-bold">
                  Location
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
                  Northeast US / Remote
                </p>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Working across timezones with software engineering discipline and coastal design inspiration.
                </p>
              </section>

              {/* Connect */}
              <section>
                <span className="font-label-caps text-primary mb-4 block uppercase tracking-widest font-bold">
                  Connect
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
                    <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Inquiry Received</h2>
                    <p className="font-body-lg text-on-surface-variant max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. I personally review all inquiries and will respond within 48 business hours to discuss your project.
                    </p>
                    <button
                      className="mt-8 text-primary font-label-caps font-bold underline underline-offset-4 hover:text-primary-container transition-colors"
                      onClick={() => {
                        setFormData({ name: "", email: "", subject: "", message: "" });
                        setIsSubmitted(false);
                      }}
                    >
                      Back to Form
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
                      <div className="relative flex flex-col">
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
                          Your Name
                        </label>
                      </div>

                      {/* Email Field */}
                      <div className="relative flex flex-col">
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
                          Email Address
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
                        <option value="" disabled>Project Type</option>
                        <option value="web-design">Product Design</option>
                        <option value="development">Full-Stack Development</option>
                        <option value="consultancy">Creative Strategy</option>
                        <option value="other">Something Else</option>
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
                        Your Vision
                      </label>
                    </div>

                    {submitError && (
                      <div
                        className="p-4 bg-error-container text-on-error-container rounded-2xl text-sm font-medium border border-error/20 flex items-center justify-between"
                        role="alert"
                      >
                        <span>{submitError}</span>
                        <button
                          type="button"
                          onClick={() => setSubmitError("")}
                          className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
                          aria-label="Dismiss error"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                      <p className="font-body-md text-on-surface-variant italic text-sm text-center md:text-left">
                        By clicking send, you agree to our{" "}
                        <button
                          type="button"
                          onClick={() => setIsPrivacyModalOpen(true)}
                          className="underline hover:text-primary cursor-pointer font-medium bg-transparent border-none p-0 inline focus:outline-none"
                        >
                          privacy terms
                        </button>
                        .
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
                            Initiate Project
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

        <Footer />
      </div>

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
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Privacy Terms</h3>
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="font-body-md text-on-surface-variant text-sm leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <p>
                  Your privacy is highly valued. Any personal information submitted through this inquiry form—including your name, email address, and project details—is treated with complete confidentiality.
                </p>
                <p>
                  <strong>Data Usage:</strong> Your details are solely used to review, reply to, and coordinate on your service inquiries.
                </p>
                <p>
                  <strong>Data Sharing:</strong> Under no circumstances is your information sold, shared, or distributed to third-party services or marketing lists.
                </p>
                <p>
                  <strong>Data Retention:</strong> Information is kept securely within our project review queue for communication reference and is deleted upon request.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-caps font-bold tracking-wider hover:opacity-90 transition-all cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
