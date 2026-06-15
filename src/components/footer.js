import Link from "next/link";
import content from "@/data/content.json";

export default function Footer() {
  const socialLinks = [
    { name: "LinkedIn", href: content.common.socials.linkedin },
    { name: "GitHub", href: content.common.socials.github },
  ];

  return (
    <footer className="w-full pt-20 pb-10 bg-surface-container-low border-t border-outline-variant/15">
      <div className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left space-y-4">
          <h2 className="font-headline-md text-headline-md text-primary">{content.common.name}</h2>
          <p className="font-body-md text-body-md text-secondary">
            © {new Date().getFullYear()} {content.common.footer.copyright}
          </p>
        </div>
        <div className="flex items-center gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mt-8 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-label-caps text-on-surface-variant opacity-50 uppercase tracking-widest">
        <span>{content.common.footer.release}</span>
        <span>{content.common.footer.availability}</span>
      </div>
    </footer>
  );
}
