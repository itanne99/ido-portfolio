import { motion } from "framer-motion";
import { Star, ArrowRight, Terminal, Database, Palette, FileCode } from "lucide-react";
import content from "@/data/content.json";

const getRepoIcon = (lang) => {
  const l = lang?.toLowerCase() || "";
  if (l.includes("typescript") || l.includes("javascript") || l.includes("c#") || l.includes("net")) {
    return <Terminal size={24} />;
  }
  if (l.includes("go") || l.includes("python") || l.includes("sql") || l.includes("postgres") || l.includes("db")) {
    return <Database size={24} />;
  }
  if (l.includes("json") || l.includes("html") || l.includes("css") || l.includes("design")) {
    return <Palette size={24} />;
  }
  return <FileCode size={24} />;
};

export default function RepoCard({ repo }) {
  const { name, description, stargazers_count, language, html_url } = repo;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="repo-card p-8 bg-surface-container-low border border-outline-variant/20 rounded-2xl flex flex-col justify-between min-h-[260px] h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-primary">
            {getRepoIcon(language)}
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <Star size={14} className="text-primary" />
            <span className="font-label-caps text-[10px] font-bold">{stargazers_count || 0}</span>
          </div>
        </div>
        
        <h3 className="font-headline-sm text-[20px] text-on-surface mb-2 tracking-tight line-clamp-1">
          {name}
        </h3>
        
        <p className="font-body-md text-on-surface-variant text-sm mb-6 line-clamp-3 leading-relaxed">
          {description || content.repoCard.noDescription}
        </p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
        <span className="px-3 py-1 bg-primary/10 text-primary font-label-caps text-[10px] rounded-full uppercase font-bold">
          {language || content.repoCard.defaultLanguage}
        </span>
        
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 font-label-caps text-primary hover:text-primary-container transition-colors font-bold text-xs cursor-pointer"
        >
          {content.repoCard.viewOnGithub} 
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
