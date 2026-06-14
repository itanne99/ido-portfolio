import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import TopNavBar from "@/components/top-nav-bar";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project-card";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <Head>
        <title>Ido Tanne | Digital Architect</title>
        <meta
          name="description"
          content="Portfolio of Ido Tanne, a Full-Stack Web Developer crafting high-performance digital experiences where Mediterranean warmth meets systems precision."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden">
        {/* Navigation */}
        <TopNavBar />

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
                  Full-Stack Systems Engineering
                </motion.span>
                <motion.h1
                  variants={itemVariants}
                  className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background leading-[1.1] md:leading-[1.05]"
                >
                  Digital Architect of <br />
                  <span className="italic text-primary-container font-medium">Elegant</span> Solutions
                </motion.h1>
              </div>

              <motion.p
                variants={itemVariants}
                className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed"
              >
                Crafting high-performance digital experiences where Mediterranean warmth meets software engineering precision. I build scalable full-stack applications that feel as seamless as a luxury coastal retreat.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-6 pt-4"
              >
                <a
                  className="w-full sm:w-auto bg-primary text-on-primary px-10 py-4 rounded-full font-label-caps text-center font-bold tracking-wider hover:opacity-90 active:scale-95 transition-all hover:shadow-[0_20px_40px_rgba(153,70,42,0.2)] cursor-pointer"
                  href="#work"
                >
                  Explore Portfolio
                </a>
                <Link
                  className="w-full sm:w-auto border border-outline text-on-surface-variant px-10 py-4 rounded-full font-label-caps text-center hover:bg-surface-container font-bold tracking-wider transition-all cursor-pointer"
                  href="/about"
                >
                  My Philosophy
                </Link>
              </motion.div>

              {/* Stats/Trust Badges */}
              <motion.div
                variants={itemVariants}
                className="pt-8 flex gap-12 items-center opacity-65"
              >
                <div>
                  <p className="font-headline-sm text-primary font-bold">4+</p>
                  <p className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Years Experience</p>
                </div>
                <div className="w-px h-8 bg-outline-variant/50"></div>
                <div>
                  <p className="font-headline-sm text-primary font-bold">30+</p>
                  <p className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Projects Delivered</p>
                </div>
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
                  alt="Mediterranean architectural arch overlooking a turquoise sea under a warm, golden sun"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUB0kjXDCsSNzCNqr6U67HpnGbpWHH9_WVQaGIxc-B2JXn43TcEmtfMv6NA35aseyeXjJGXSvb-tA4-HgE2N1mBmfa3poDrlbh57UGS6M2SjrGlmAZtoO_L0GejvscQOtZV8O-weTZRdD9D8D1tzVEF0qizD05x-F50mYOC5jPCtlK9lUQYqEE_PLDPORTXcIXE33p3k1fWzo33k1fPjyqbUDd8_GJHQzLsi23b8f5jyRsuuE4nnCb97_D9JuEp1QGA1GhbK0RcAFz"
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
                  Systems Built
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
                <span className="font-label-caps text-primary uppercase tracking-widest font-bold">Selected Commissions</span>
                <h2 className="font-headline-md text-[40px] text-on-surface leading-tight">Digital Landmarks</h2>
              </div>
              <p className="font-body-lg text-on-surface-variant max-w-md">
                Case studies in professional software engineering. Every system is architected for speed, reliability, and visual precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Large Project */}
              <ProjectCard
                title="Gabay Estate Management"
                category="Next.js / Stripe / Supabase / Vercel"
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuD4heS-RA1I3cEAgVy45bpOxtC1OfcWwzKPdTm_awnRFtEnOvAS0KaENZ36gY76hshJ1dWPKH0djjEMHpGWd7gXFPvo9eUGJFWIqn3v9qmwvckmXTtf9rWWU4r6J0TzikgmS_Delkf1raJue1IW6yItzRUWRtQLSKJqA5dDhQEfYv-NrWmnzIceeMnjvE411_zKTvwn8UvFVog6THX12Q18KPOa7UjQ6KAN16dCZKgukFLN1dpXFX5ATxBiRfYz_ZfTZMDoW9y6TwaE"
                isLarge={true}
              />
              
              {/* Tall Project */}
              <ProjectCard
                title="Florida ACCESS Modernization"
                category="Enterprise Systems / Deloitte"
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDTSd20fKkiLI1eDSqth78OZqDq01sMDElVEF_m--TAajzfqo1Y18rfDsWkKVaSK9n7xzKl44bR6x28mQy3LMpYEo705gCY6zAmfS-gSUhVojlvn2erAjdDaK5UaPAZWCl6v4O0gFvdzwxGRUseOX3sdYQv9NghEdFFVibIdFV062sr-b5Ru6oEbZPlmB0l9VJcWFGzlxgHTJvdMAdWO2wuma1SFvhJAhqr9QwWyuhTlcndusqZjKuNQabXnbu2Fa3WN3uyMEI1jaIL"
                isLarge={false}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
