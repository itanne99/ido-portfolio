import { motion } from "framer-motion";

export default function ProjectCard({ title, category, imageSrc, isLarge = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group cursor-pointer ${isLarge ? "md:col-span-8" : "md:col-span-4"}`}
    >
      <div
        className={`relative overflow-hidden rounded-3xl bg-surface-container-highest shadow-sm transition-all duration-500 group-hover:shadow-2xl border border-outline-variant/10 ${
          isLarge ? "aspect-[16/9]" : "min-h-[400px] h-full"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-multiply opacity-20" />

        {/* Info Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 md:p-12">
          <div className="text-white space-y-2">
            <span className="font-label-caps text-white/70 text-xs tracking-widest">{category}</span>
            <h3 className="font-headline-md text-white text-2xl md:text-3xl leading-tight font-bold">{title}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
