import Head from "next/head";
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
  ArrowRight 
} from "lucide-react";
import TopNavBar from "@/components/top-nav-bar";
import Footer from "@/components/footer";
import BentoCard from "@/components/bento-card";
import RepoCard from "@/components/repo-card";

export default function About({ repos }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <>
      <Head>
        <title>About & Work | Ido Tanne</title>
        <meta
          name="description"
          content="Learn about Ido Tanne's design philosophy, full-stack expertise, tech stack, and explore public GitHub repositories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
        <TopNavBar />

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
                  CRAFTING DIGITAL EXPERIENCES
                </span>
                <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
                  I bridge the gap between <span className="text-primary italic font-medium">human experience</span> and digital precision.
                </h1>
              </div>
              <div className="text-on-surface-variant max-w-2xl space-y-6">
                <p className="font-body-lg text-body-lg leading-relaxed">
                  I am Ido Tanne, a full-stack engineer and digital systems architect based in the Northeast. 
                  My journey began at the intersection of information systems logic and responsive web interface design, 
                  leading me to build robust digital platforms that combine industrial-strength backend engineering with sleek, accessible UI.
                </p>
                <p className="font-body-lg text-body-lg leading-relaxed">
                  As an engineer at Deloitte, I specialize in translating complex business processes and enterprise 
                  requirements into highly polished, reliable, and accessible systems. I believe software should breathe. 
                  Every database query, API transition, and hover animation is an opportunity to cultivate trust and ease.
                </p>
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
                alt="Portrait of Ido Tanne"
                className="w-full h-full object-cover rounded-[2rem] shadow-xl relative z-10 border border-outline-variant/15"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnEWVS8kCbqz2iGh2gN7yPBJyzRhYbkkUXZP3pY0TXfN84SaJ7wKzVEvsp1WdH72HEmKYuqlc_FBMxNj-FyH4Lv2prTLQCJA0gT7vy9Ky4QMuLbl12BpcxoGt65vLsHShtiC1_Gi3JfAcLT-e4TaSRw0zPtg8WDNsotKw1ZGS4CGeqTcAU7hFsbeb_KiLtXvRK9z8BO48fElcXgBxIqnlOcDZDeZ_EJ_TnrzKf3Gk0TgFLy32C-Nk_QjUOHS0Yooz_Jz5akYKd44CD"
              />
            </motion.div>
          </section>

          {/* Experience Section */}
          <section className="mb-24 md:mb-32">
            <div className="mb-12">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-4">
                Work Experience <span className="h-px flex-1 bg-outline-variant/30"></span>
              </h2>
            </div>

            <div className="space-y-12 max-w-4xl">
              {/* Deloitte */}
              <div className="relative pl-8 border-l-2 border-primary/20">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-surface" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="font-headline-sm text-xl md:text-2xl font-bold text-on-surface">Deloitte</h3>
                    <p className="font-body-md text-primary font-medium">Analyst 2 / Full-Stack Engineer</p>
                  </div>
                  <span className="font-label-caps text-xs text-on-surface-variant bg-outline-variant/20 px-3 py-1 rounded-full w-fit">
                    Sep 2022 – Present
                  </span>
                </div>

                <div className="space-y-8 mt-6">
                  {/* Florida ACCESS */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-body-lg font-bold text-on-surface">Florida ACCESS Modernization</h4>
                      <span className="font-label-caps text-[10px] text-primary bg-primary/5 px-2 py-0.5 rounded-full font-bold">Jul 2023 – Present</span>
                    </div>
                    <ul className="space-y-2 list-disc list-inside text-on-surface-variant font-body-md">
                      <li>Secured platform access for 4,000+ users via Okta SSO and custom role-based permission maps.</li>
                      <li>Developed high-performance ASP.NET REST APIs and structured relational schemas across Postgres, MSSQL, and Oracle.</li>
                      <li>Built highly accessible employee interfaces using React and Bootstrap, strictly conforming to WCAG 2.2 standards.</li>
                      <li>Integrated AI agents and custom developer-focused MCP servers to optimize SQL queries (25% speed increase) and automate Azure DevOps task resolution.</li>
                      <li>Constructed robust automated Jest and C# REST testing environments to ensure 100% stability.</li>
                    </ul>
                  </div>

                  {/* AI Division */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-body-lg font-bold text-on-surface">Cloud Service Client, Artificial Intelligence Division</h4>
                      <span className="font-label-caps text-[10px] text-primary bg-primary/5 px-2 py-0.5 rounded-full font-bold">Nov 2022 – Feb 2023</span>
                    </div>
                    <ul className="space-y-2 list-disc list-inside text-on-surface-variant font-body-md">
                      <li>Generated and structured 4,000+ natural language training datasets and labels across 9 enterprise business use cases.</li>
                      <li>Developed custom React.js dashboard tools to optimize data ingestion workflows and improve annotation efficiency.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="mb-24 md:mb-32">
            <div className="mb-12">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-4">
                Education <span className="h-px flex-1 bg-outline-variant/30"></span>
              </h2>
            </div>

            <div className="space-y-12 max-w-4xl">
              {/* Education - NJIT */}
              <div className="relative pl-8 border-l-2 border-primary/20">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-surface" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <div>
                    <h3 className="font-headline-sm text-xl md:text-2xl font-bold text-on-surface">New Jersey Institute of Technology</h3>
                    <p className="font-body-md text-primary font-medium">Bachelor of Science in Information Technology</p>
                  </div>
                  <span className="font-label-caps text-xs text-on-surface-variant bg-outline-variant/20 px-3 py-1 rounded-full w-fit">
                    Sep 2018 – May 2022
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Expertise Section */}
          <section id="expertise" className="mb-24 md:mb-32">
            <div className="mb-12">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-4">
                Expertise <span className="h-px flex-1 bg-outline-variant/30"></span>
              </h2>
            </div>

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
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Architecture</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
                      <span className="font-body-md text-on-surface-variant">System Design</span>
                      <span className="font-label-caps text-primary/70 font-bold text-[10px]">EXPERT</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
                      <span className="font-body-md text-on-surface-variant">API Engine Integration</span>
                      <span className="font-label-caps text-primary/70 font-bold text-[10px]">EXPERT</span>
                    </li>
                    <li className="flex items-center justify-between pb-2">
                      <span className="font-body-md text-on-surface-variant">Cloud Infrastructure</span>
                      <span className="font-label-caps text-primary/70 font-bold text-[10px]">ADVANCED</span>
                    </li>
                  </ul>
                </div>
              </BentoCard>

              {/* Visual Language Card */}
              <BentoCard styleVariant="high" className="md:col-span-6 lg:col-span-8">
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between h-full">
                  <div className="flex-1 space-y-4">
                    <div className="text-primary"><Brush size={36} /></div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Visual Language</h3>
                    <p className="font-body-md text-on-surface-variant">
                      Crafting unified brand aesthetics through typographic discipline, HSL-guided colors, and tactile micro-animations. 
                      Every layout is spaced as a gallery to avoid cognitive clutter.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1 bg-secondary/15 text-secondary font-label-caps text-[10px] rounded-full font-bold">Editorial UI</span>
                      <span className="px-3 py-1 bg-secondary/15 text-secondary font-label-caps text-[10px] rounded-full font-bold">Design Systems</span>
                      <span className="px-3 py-1 bg-secondary/15 text-secondary font-label-caps text-[10px] rounded-full font-bold">Motion Principles</span>
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
                    <h3 className="font-headline-sm text-headline-sm text-on-secondary-container font-bold">Human Centricity</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-on-secondary-container">
                    <div className="space-y-1">
                      <p className="font-body-md font-bold">WCAG 2.2 Accessibility</p>
                      <p className="text-sm opacity-80">Semantic markup and keyboard-first navigability.</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-body-md font-bold">Interactive Feedback</p>
                      <p className="text-sm opacity-80">Reassuring micro-states during long tasks.</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-body-md font-bold">Intelligent Flows</p>
                      <p className="text-sm opacity-80">Anticipating error boundary behaviors gracefully.</p>
                    </div>
                  </div>
                </div>
              </BentoCard>

              {/* Tech Stack Card */}
              <BentoCard styleVariant="highest" className="md:col-span-12 lg:col-span-7">
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">The Tech Stack</h3>
                    <span className="font-label-caps text-on-surface-variant font-bold text-xs">UPDATED 2026</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-label-caps text-xs text-primary font-bold tracking-wider">Languages & DBs</h4>
                      <ul className="space-y-1.5 font-body-md text-on-surface-variant text-sm">
                        <li>C# / .NET Core</li>
                        <li>Python / Java / C++</li>
                        <li>Postgres / MSSQL / SQL</li>
                        <li>Oracle / Supabase / Redis</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-label-caps text-xs text-primary font-bold tracking-wider">Frameworks & UI</h4>
                      <ul className="space-y-1.5 font-body-md text-on-surface-variant text-sm">
                        <li>React / Next.js</li>
                        <li>ASP.NET / EF Core</li>
                        <li>Django / Flask / Express</li>
                        <li>Tailwind / Bootstrap</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-label-caps text-xs text-primary font-bold tracking-wider">DevOps & Cloud</h4>
                      <ul className="space-y-1.5 font-body-md text-on-surface-variant text-sm">
                        <li>Azure DevOps / Git</li>
                        <li>Docker / DevContainers</li>
                        <li>Vercel / Heroku / Unraid</li>
                        <li>Linux / Proxmox / Windows</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-label-caps text-xs text-primary font-bold tracking-wider">AI, Auth & Tools</h4>
                      <ul className="space-y-1.5 font-body-md text-on-surface-variant text-sm">
                        <li>AI Agents / MCP Servers</li>
                        <li>Okta / OAuth / OnBase</li>
                        <li>Azure Storage Accounts</li>
                        <li>Figma / Photoshop</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </motion.div>
          </section>

          {/* GitHub Repositories Section */}
          <section className="mb-24 md:mb-32">
            <div className="mb-12">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-4">
                Open Source & Repositories <span class="h-px flex-1 bg-outline-variant/30"></span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
                A selection of experimental libraries, utility tools, and core architectures dynamically synchronized from GitHub.
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {repos.map((repo) => (
                <motion.div key={repo.id} variants={itemVariants}>
                  <RepoCard repo={repo} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Call To Action */}
          <section className="py-20 md:py-24 px-8 md:px-12 rounded-[2.5rem] bg-inverse-surface text-center relative overflow-hidden border border-outline-variant/10 shadow-xl">
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-inverse-on-surface leading-tight">
                Let&apos;s create something timeless.
              </h2>
              <p className="font-body-lg text-body-lg text-inverse-on-surface/75 max-w-xl mx-auto leading-relaxed">
                Whether it&apos;s a high-performance backend infrastructure integration or a pixel-perfect, interactive web application, I bring craft and scale together.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link
                  href="/contact"
                  className="px-10 py-4 bg-primary text-on-primary rounded-full font-label-caps font-bold tracking-[0.2em] hover:scale-105 transition-transform uppercase cursor-pointer"
                >
                  Start a Project
                </Link>
              </div>
            </div>
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const username = "itanne99";
  let repos = [];

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
    if (res.ok) {
      const data = await res.json();
      repos = data
        .filter((r) => !r.fork)
        .toSorted((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);
    }
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
  }

  // Robust fallback state if API fails or returns no repos
  if (repos.length === 0) {
    repos = [
      {
        id: 1,
        name: "Aether-Engine",
        description: "A high-performance rendering engine for WebGL built on Mediterranean design principles. Focuses on soft shadows and organic motion.",
        stargazers_count: 12,
        language: "TypeScript",
        html_url: "https://github.com/itanne99",
      },
      {
        id: 2,
        name: "Vault-Core",
        description: "The backbone microservices architecture used in Deloitte Vault API integrations. Lightweight, scalable, and secure by default.",
        stargazers_count: 8,
        language: "C#",
        html_url: "https://github.com/itanne99",
      },
      {
        id: 3,
        name: "Aegean-Tokens",
        description: "A comprehensive design token system for Tailwind CSS inspired by Aegean landscapes and architectural textures.",
        stargazers_count: 4,
        language: "JavaScript",
        html_url: "https://github.com/itanne99",
      },
    ];
  }

  return {
    props: {
      repos,
    },
    revalidate: 3600, // Regenerate page in the background once every hour
  };
}
