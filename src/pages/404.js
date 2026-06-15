/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass as CompassIcon, Send, ArrowRight } from "lucide-react";
import Layout from "@/components/layout";
import BentoCard from "@/components/bento-card";
import content from "@/data/content.json";
import { containerVariants, itemVariants } from "@/utils/animations";

export default function NotFound() {
  return (
    <Layout
      title={content.notFound.seo.title}
      description={content.notFound.seo.description}
    >
      <main className="pt-36 pb-section-gap-desktop max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Main Error Details & Sailboat Animation (Full Width) */}
          <BentoCard styleVariant="normal" className="lg:col-span-12 flex flex-col justify-between">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-3">
                <span className="font-label-caps text-primary tracking-[0.2em] font-bold text-xs">
                  {content.notFound.label}
                </span>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
                  {content.notFound.titlePart1} <span className="text-primary-container italic font-medium">{content.notFound.titleItalic}</span> {content.notFound.titlePart2}
                </h1>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                {content.notFound.description}
              </p>
            </motion.div>

            {/* Sailboat Lost at Sea SVG Animation */}
            <motion.div
              variants={itemVariants}
              className="w-full flex justify-center py-8 md:py-12"
            >
              <img
                src={content.notFound.imageSrc}
                alt="Sailboat lost at sea animation"
                className="w-full max-w-[320px] md:max-w-[500px] aspect-[4/3] select-none pointer-events-none"
              />
            </motion.div>
          </BentoCard>

          {/* Navigation Action Links */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:col-span-12"
          >
            {/* Link 1: Home */}
            <Link href="/" className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 rounded-3xl min-h-[44px]">
              <BentoCard styleVariant="primary" className="h-full cursor-pointer flex flex-col justify-between p-8 min-h-[180px]">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <Home size={18} />
                  </div>
                  <h4 className="font-headline-sm text-[20px] font-bold text-on-surface">
                    {content.notFound.ctaHome}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Head back to the main lobby and explore from the start.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-label-caps text-primary font-bold mt-4 tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">
                  GO HOME <ArrowRight size={12} />
                </div>
              </BentoCard>
            </Link>

            {/* Link 2: Projects */}
            <Link href="/about#expertise" className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 rounded-3xl min-h-[44px]">
              <BentoCard styleVariant="secondary" className="h-full cursor-pointer flex flex-col justify-between p-8 min-h-[180px]">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-on-secondary-container/10 flex items-center justify-center text-on-secondary-container group-hover:scale-110 transition-transform duration-300">
                    <CompassIcon size={18} />
                  </div>
                  <h4 className="font-headline-sm text-[20px] font-bold text-on-secondary-container">
                    {content.notFound.ctaProjects}
                  </h4>
                  <p className="text-sm opacity-85 leading-relaxed">
                    Browse systems, tools, and visual frameworks.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-label-caps text-on-secondary-container font-bold mt-4 tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">
                  VIEW WORK <ArrowRight size={12} />
                </div>
              </BentoCard>
            </Link>

            {/* Link 3: Contact (Pre-selects System Diagnostic / Bug Report) */}
            <Link href="/contact?type=system-report" className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 rounded-3xl min-h-[44px]">
              <BentoCard styleVariant="highest" className="h-full cursor-pointer flex flex-col justify-between p-8 min-h-[180px]">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <Send size={18} />
                  </div>
                  <h4 className="font-headline-sm text-[20px] font-bold text-on-surface">
                    {content.notFound.ctaContact}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Get in touch to report a bug or discuss a potential project.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-label-caps text-primary font-bold mt-4 tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">
                  WRITE MESSAGE <ArrowRight size={12} />
                </div>
              </BentoCard>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </Layout>
  );
}
