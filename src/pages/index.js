import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import Layout from "@/components/layout";
import ProjectCard from "@/components/project-card";
import { containerVariants, itemVariants } from "@/utils/animations";
import content from "@/data/content.json";

export default function Home() {
  return (
    <Layout
      title={content.home.seo.title}
      description={content.home.seo.description}
    >
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-surface overflow-hidden pt-28 md:pt-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-7 z-10 space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                variants={itemVariants}
                className="inline-block font-label-caps text-primary tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold"
              >
                {content.home.hero.label}
              </motion.span>
              <motion.h1
                variants={itemVariants}
                className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background leading-[1.1] md:leading-[1.05]"
              >
                {content.home.hero.titlePart1} <br />
                <span className="italic text-primary-container font-medium">{content.home.hero.titleItalic}</span> {content.home.hero.titlePart2}
              </motion.h1>
            </div>

            <motion.p
              variants={itemVariants}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed"
            >
              {content.home.hero.description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6 pt-4"
            >
              <a
                className="w-full sm:w-auto bg-primary text-on-primary px-10 py-4 rounded-full font-label-caps text-center font-bold tracking-wider hover:opacity-90 active:scale-95 transition-all hover:shadow-[0_20px_40px_rgba(153,70,42,0.2)] cursor-pointer"
                href="#work"
              >
                {content.home.hero.ctaPrimary}
              </a>
              <Link
                className="w-full sm:w-auto border border-outline text-on-surface-variant px-10 py-4 rounded-full font-label-caps text-center hover:bg-surface-container font-bold tracking-wider transition-all cursor-pointer"
                href="/about"
              >
                {content.home.hero.ctaSecondary}
              </Link>
            </motion.div>

            {/* Stats/Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="pt-8 flex gap-12 items-center opacity-65"
            >
              {content.home.stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  {index > 0 && <div className="w-px h-8 bg-outline-variant/50"></div>}
                  <div>
                    <p className="font-headline-sm text-primary font-bold">{stat.value}</p>
                    <p className="font-label-caps text-[9px] uppercase tracking-widest font-bold">{stat.label}</p>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Sun-drenched Mediterranean Imagery */}
          <div className="md:col-span-5 relative h-[400px] md:h-[600px] mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl border border-outline-variant/15"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt={content.home.hero.imageAlt}
                src={content.home.hero.imageSrc}
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-multiply" />
            </motion.div>

            {/* Floating Decorative Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 md:-left-12 bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-outline-variant/20 hidden sm:flex flex-col items-center"
            >
              <div className="text-primary-container p-2 bg-primary/5 rounded-full mb-2">
                <Cpu size={28} />
              </div>
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                {content.home.hero.systemsBuiltLabel}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Background Abstract Texture */}
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-surface-container opacity-30 skew-x-[-12deg] translate-x-1/2" />
      </section>

      {/* Projects (Bento Grid) */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-low" id="work">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="font-label-caps text-primary uppercase tracking-widest font-bold">{content.home.projects.label}</span>
              <h2 className="font-headline-md text-[40px] text-on-surface leading-tight">{content.home.projects.title}</h2>
            </div>
            <p className="font-body-lg text-on-surface-variant max-w-md">
              {content.home.projects.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {content.home.projects.items.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                category={project.category}
                imageSrc={project.imageSrc}
                isLarge={project.isLarge}
                url={project.url}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
