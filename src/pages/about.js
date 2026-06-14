import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Compass, 
  Brush, 
  Sparkles, 
  Terminal, 
  Layers, 
  Database, 
  Key, 
  Cloud, 
  Settings, 
  ArrowRight,
  RefreshCw
} from "lucide-react";
import Layout from "@/components/layout";
import SectionHeader from "@/components/section-header";
import TimelineItem from "@/components/timeline-item";
import BentoCard from "@/components/bento-card";
import RepoCard from "@/components/repo-card";
import CustomAlert from "@/components/custom-alert";
import { useAlert } from "@/context/alert-context";
import { containerVariants, itemVariants } from "@/utils/animations";
import content from "@/data/content.json";

export default function About({ repos, fetchFailed }) {
  const { showAlert } = useAlert();
  const [reposList, setReposList] = useState(repos);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(fetchFailed);
  const [alertDismissed, setAlertDismissed] = useState(false);

  useEffect(() => {
    if (fetchFailed) {
      showAlert(
        "Could not fetch the latest GitHub repositories. Displaying cached data.",
        {
          type: "warning",
          title: "Connection Alert",
          duration: 7000,
        }
      );
    }
  }, [fetchFailed, showAlert]);

  async function handleRefresh() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/github-repos");
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.error || "Failed to retrieve live GitHub repositories. Please check your network and try again.";
        setHasError(true);
        showAlert(message, {
          type: "error",
          title: "Sync Failed",
          duration: 8000,
          action: {
            label: "Retry",
            onClick: () => handleRefresh(),
          },
        });
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      setReposList(data);
      setHasError(false);
      setAlertDismissed(false);
      showAlert("GitHub repositories successfully updated.", {
        type: "success",
        title: "Success",
        duration: 4000,
      });
    } catch (error) {
      console.error("Failed to refresh repos client-side:", error);
      setHasError(true);
      showAlert(
        "Failed to retrieve live GitHub repositories. Please check your network and try again.",
        {
          type: "error",
          title: "Sync Failed",
          duration: 8000,
          action: {
            label: "Retry",
            onClick: () => handleRefresh(),
          },
        }
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <Layout
      title={content.about.seo.title}
      description={content.about.seo.description}
    >
      <main className="pt-36 pb-section-gap-desktop max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Identity Section */}
        <section id="bio" className="flex flex-col lg:flex-row gap-16 items-start mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] font-bold">
                {content.about.identity.label}
              </span>
              <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
                {content.about.identity.titlePart1} <span className="text-primary-container italic font-medium">{content.about.identity.titleItalic}</span> {content.about.identity.titlePart2}
              </h1>
            </div>
            <div className="text-on-surface-variant max-w-2xl space-y-6">
              {content.about.identity.paragraphs.map((p, index) => (
                <p key={index} className="font-body-lg text-body-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Profile Image Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full lg:w-[400px] aspect-[4/5] relative group"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3 transition-transform group-hover:rotate-6 duration-500" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={content.about.identity.imageAlt}
              className="w-full h-full object-cover rounded-[2rem] shadow-xl relative z-10 border border-outline-variant/15"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnEWVS8kCbqz2iGh2gN7yPBJyzRhYbkkUXZP3pY0TXfN84SaJ7wKzVEvsp1WdH72HEmKYuqlc_FBMxNj-FyH4Lv2prTLQCJA0gT7vy9Ky4QMuLbl12BpcxoGt65vLsHShtiC1_Gi3JfAcLT-e4TaSRw0zPtg8WDNsotKw1ZGS4CGeqTcAU7hFsbeb_KiLtXvRK9z8BO48fElcXgBxIqnlOcDZDeZ_EJ_TnrzKf3Gk0TgFLy32C-Nk_QjUOHS0Yooz_Jz5akYKd44CD"
            />
          </motion.div>
        </section>

        {/* Experience Section */}
        <section className="mb-24 md:mb-32">
          <SectionHeader title={content.about.experience.title} />

          <div className="space-y-12 max-w-4xl">
            {content.about.experience.jobs.map((job) => (
              <TimelineItem
                key={job.company}
                title={job.company}
                subtitle={job.role}
                period={job.period}
              >
                <div className="space-y-8">
                  {job.subroles.map((subrole) => (
                    <div key={subrole.title} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-body-lg font-bold text-on-surface">{subrole.title}</h4>
                        <span className="font-label-caps text-[10px] text-primary bg-primary/5 px-2 py-0.5 rounded-full font-bold">{subrole.period}</span>
                      </div>
                      <ul className="space-y-2 list-disc list-inside text-on-surface-variant font-body-md">
                        {subrole.bullets.map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TimelineItem>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-24 md:mb-32">
          <SectionHeader title={content.about.education.title} />

          <div className="space-y-12 max-w-4xl">
            {content.about.education.schools.map((school) => (
              <TimelineItem
                key={school.institution}
                title={school.institution}
                subtitle={school.degree}
                period={school.period}
              />
            ))}
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="mb-24 md:mb-32">
          <SectionHeader title={content.about.expertise.title} />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
          >
            {/* Architecture Card */}
            <BentoCard styleVariant="primary" className="md:col-span-6 lg:col-span-4">
              <div className="space-y-6">
                <div className="text-primary"><Compass size={36} /></div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {content.about.expertise.architecture.title}
                </h3>
                <ul className="space-y-4">
                  {content.about.expertise.architecture.skills.map((skill, index) => (
                    <li key={skill.name} className={`flex items-center justify-between pb-2 ${
                      index < content.about.expertise.architecture.skills.length - 1 ? "border-b border-outline-variant/10" : ""
                    }`}>
                      <span className="font-body-md text-on-surface-variant">{skill.name}</span>
                      <span className="font-label-caps text-primary/70 font-bold text-[10px]">{skill.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BentoCard>

            {/* Visual Language Card */}
            <BentoCard styleVariant="high" className="md:col-span-6 lg:col-span-8">
              <div className="flex flex-col md:flex-row gap-8 items-start justify-between h-full">
                <div className="flex-1 space-y-4">
                  <div className="text-primary"><Brush size={36} /></div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {content.about.expertise.visualLanguage.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    {content.about.expertise.visualLanguage.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {content.about.expertise.visualLanguage.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-secondary/15 text-secondary font-label-caps text-[10px] rounded-full font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Human Centricity Card */}
            <BentoCard styleVariant="secondary" className="md:col-span-12 lg:col-span-5">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-on-secondary-container flex items-center justify-center text-secondary-container">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-secondary-container font-bold">
                    {content.about.expertise.humanCentricity.title}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-on-secondary-container">
                  {content.about.expertise.humanCentricity.features.map((feat) => (
                    <div key={feat.title} className="space-y-1">
                      <p className="font-body-md font-bold">{feat.title}</p>
                      <p className="text-sm opacity-80">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Tech Stack Card */}
            <BentoCard styleVariant="highest" className="md:col-span-12 lg:col-span-7">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {content.about.expertise.techStack.title}
                  </h3>
                  <span className="font-label-caps text-on-surface-variant font-bold text-xs">
                    {content.about.expertise.techStack.updatedLabel}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {content.about.expertise.techStack.categories.map((cat) => (
                    <div key={cat.name} className="space-y-3">
                      <h4 className="font-label-caps text-xs text-primary font-bold tracking-wider">{cat.name}</h4>
                      <ul className="space-y-1.5 font-body-md text-on-surface-variant text-sm">
                        {cat.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>
        </section>

        {/* GitHub Repositories Section */}
        <section className="mb-24 md:mb-32">
          <SectionHeader 
            title={content.about.repositories.title}
            description={content.about.repositories.description}
            action={
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest transition-all rounded-full font-label-caps text-[11px] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 min-h-[44px]"
                aria-label="Refresh repository data"
              >
                <RefreshCw size={14} className={`text-primary ${loading ? "animate-spin" : ""}`} />
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            }
          />

          {hasError && !alertDismissed && (
            <div className="mb-8 w-full">
              <CustomAlert
                type="warning"
                title="Showing Fallback Data"
                message="We are currently displaying cached GitHub repository data because the live connection is unavailable. You can attempt to refresh to pull real-time data."
                onClose={() => setAlertDismissed(true)}
                action={{
                  label: "Refresh Data",
                  onClick: handleRefresh,
                }}
              />
            </div>
          )}

          <motion.div 
            key={loading ? "loading" : "loaded"}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="p-8 bg-surface-container-low border border-outline-variant/10 rounded-2xl flex flex-col justify-between min-h-[260px] animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="w-8 h-8 rounded-full bg-outline-variant/30" />
                      <div className="w-12 h-4 rounded bg-outline-variant/30" />
                    </div>
                    <div className="w-3/4 h-6 rounded bg-outline-variant/30" />
                    <div className="space-y-2">
                      <div className="w-full h-4 rounded bg-outline-variant/30" />
                      <div className="w-5/6 h-4 rounded bg-outline-variant/30" />
                      <div className="w-2/3 h-4 rounded bg-outline-variant/30" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-outline-variant/10">
                    <div className="w-16 h-5 rounded-full bg-outline-variant/30" />
                    <div className="w-24 h-4 rounded bg-outline-variant/30" />
                  </div>
                </div>
              ))
            ) : (
              reposList.map((repo) => (
                <motion.div key={repo.id} variants={itemVariants}>
                  <RepoCard repo={repo} />
                </motion.div>
              ))
            )}
          </motion.div>
        </section>

        {/* Call To Action */}
        <section className="py-20 md:py-24 px-8 md:px-12 rounded-[2.5rem] bg-inverse-surface text-center relative overflow-hidden border border-outline-variant/10 shadow-xl">
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-inverse-on-surface leading-tight">
              {content.about.cta.title}
            </h2>
            <p className="font-body-lg text-body-lg text-inverse-on-surface/75 max-w-xl mx-auto leading-relaxed">
              {content.about.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                href="/contact"
                className="px-10 py-4 bg-primary text-on-primary rounded-full font-label-caps font-bold tracking-[0.2em] hover:scale-105 transition-transform uppercase cursor-pointer"
              >
                {content.about.cta.button}
              </Link>
            </div>
          </div>
          {/* Soft decorative background circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const username = "itanne99";
  let repos = [];
  let fetchFailed = false;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
    if (res.ok) {
      const data = await res.json();
      repos = data
        .filter((r) => !r.fork)
        .toSorted((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);
    } else {
      fetchFailed = true;
    }
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    fetchFailed = true;
  }

  // Robust fallback state if API fails or returns no repos
  if (repos.length === 0) {
    repos = content.about.repositories.fallback;
    fetchFailed = true;
  }

  return {
    props: {
      repos,
      fetchFailed,
    },
    revalidate: 3600, // Regenerate page in the background once every hour
  };
}
