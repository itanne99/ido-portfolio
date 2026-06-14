import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import content from "@/data/content.json";

export default function TopNavBar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [previousPath, setPreviousPath] = useState(router.pathname);

  // Adjust state during render when pathname changes
  if (router.pathname !== previousPath) {
    setPreviousPath(router.pathname);
    setActiveHash("");
  }

  const navLinks = content.common.nav.links;

  useEffect(() => {
    if (router.pathname !== "/about") {
      return;
    }

    const expertiseSection = globalThis.document.querySelector("#expertise");

    const handleScrollSpy = () => {
      if (!expertiseSection) {
        return;
      }
      const rect = expertiseSection.getBoundingClientRect();
      const targetHash = rect.top <= globalThis.innerHeight * 0.4 ? "#expertise" : "";
      setActiveHash((previous) => (previous === targetHash ? previous : targetHash));
    };

    // Defer initial check to avoid synchronous setState inside useEffect
    const frameId = globalThis.requestAnimationFrame(handleScrollSpy);

    globalThis.addEventListener("scroll", handleScrollSpy);

    return () => {
      globalThis.cancelAnimationFrame(frameId);
      globalThis.removeEventListener("scroll", handleScrollSpy);
    };
  }, [router.pathname]);

  const isActive = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    if (router.pathname === "/about") {
      if (href === "/about#expertise") {
        return activeHash === "#expertise";
      }
      if (href === "/about") {
        return activeHash === "";
      }
    }
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      return router.pathname === path && router.asPath.includes(`#${hash}`);
    }
    if (router.asPath.includes("#")) {
      return false;
    }
    return router.asPath.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-8 px-6 md:px-8 py-3 max-w-4xl mx-auto rounded-full mt-6 bg-surface/80 backdrop-blur-md border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow duration-300 w-[90%] md:w-full"
      >
        <Link href="/" className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight cursor-pointer">
          {content.common.name}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-body-lg text-body-lg transition-all hover:text-primary cursor-pointer ${
                isActive(link.href)
                  ? "text-primary border-b border-primary pb-0.5"
                  : "text-on-surface-variant"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:inline-block font-body-lg text-body-lg px-6 py-2 bg-primary text-on-primary rounded-full hover:opacity-90 active:scale-95 transition-all cursor-pointer">
            {content.common.nav.contactButton}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface hover:text-primary transition-colors md:hidden focus:outline-none cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-40 p-6 rounded-2xl bg-surface/95 backdrop-blur-lg border border-outline-variant/20 shadow-xl flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-headline-sm text-lg py-2 border-b border-outline-variant/10 cursor-pointer ${
                  isActive(link.href) ? "text-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-primary text-on-primary py-3 rounded-full font-label-caps cursor-pointer"
            >
              {content.common.nav.contactButton}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
