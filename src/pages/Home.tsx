import { useState } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import NightSkyConstellations from "../components/NightSkyConstellations.tsx";
import NameTitle from "../components/Home/NameTitle.tsx";
import RisingText from "../components/RisingText.tsx";
import ScrambleText from "../components/ScrambleText.tsx";
import BorderTracer from "../components/Home/BorderTracer.tsx";

export default function Home() {
  const SCROLL_THRESHOLD_HINT = 0.5;

  const [showScrollHint, setShowScrollHint] = useState(true);
  const isSidebarCollapsed = !showScrollHint;

  const contactLinks = [
    {
      href: "https://github.com/peanutpiglet",
      icon: "GH",
      label: "GitHub",
      external: true,
    },
    {
      href: "mailto:hello@example.com",
      icon: "@",
      label: "Email",
      external: false,
    },
    {
      href: "https://www.linkedin.com/",
      icon: "in",
      label: "LinkedIn",
      external: true,
    },
  ];

  useLenis(({ progress, direction }) => {
    if (direction === 1 && progress > SCROLL_THRESHOLD_HINT) {
      setShowScrollHint(false);
    } else if (direction === -1 && progress <= SCROLL_THRESHOLD_HINT) {
      setShowScrollHint(true);
    }
  });

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <NightSkyConstellations></NightSkyConstellations>

      <div
        id="main-content-container"
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
      >
        <div id="HeroSection" className="border h-screen -mt-6 flex flex-col">
          <div id="HeroTop" className="relative pb-10 mt-6">
            <div
              id="Hero-LeftBanner"
              className="absolute left-0 w-20 h-[97%] bottom-0"
            >
              <BorderTracer
                color="#ff549e"
                anim_delay={4}
                anim_duration={0.5}
                left={true}
                bottom={true}
                thickness="1px"
                origin="0 100%"
              ></BorderTracer>
            </div>
            <div
              id="Hero-RightBanner"
              className="absolute right-0 w-20 h-[97%] top-0"
            >
              <BorderTracer
                color="#ff549e"
                anim_delay={4}
                anim_duration={0.5}
                right={true}
                top={true}
                thickness="1px"
                origin="100% 0"
              ></BorderTracer>
            </div>

            <section>
              <section className="flex justify-center font-[monument] pt-6 text-2xl">
                <motion.div
                  animate={{
                    opacity: [0, 1],
                    transition: { duration: 2 },
                  }}
                >
                  Hello, this is
                </motion.div>
              </section>
              <section className="flex items-center justify-center">
                <NameTitle></NameTitle>
              </section>
            </section>

            <section className="mt-12 font-[nugo]">
              <h1 className="text-center italic text-md px-12">
                <RisingText
                  text="an undergraduate seeking the secrets of the universe while trying not to scare people away"
                  stagger={0.013}
                  initialY={-800}
                  easing={[0.23, 0.96, 0.29, 0.98]}
                  delay={1}
                ></RisingText>
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0, delay: 1.1 }}
              >
                <div className="mt-6 text-lg text-justify px-12">
                  <ScrambleText
                    initialDelay={1000}
                    cyclesPerLetter={0.3}
                    shuffleTime={30}
                    canHoverStart={false}
                    canHoverStop={false}
                    trail={5}
                  >
                    My interests orbit around fundamental theories: computation,
                    physics, philosophy, and — spookiest of all — logic.
                    However, this doesn't stop me from getting myself immersed
                    in game development and music production. After all, we have
                    equations describing the rules of the universe, but none yet
                    capture the vibrant complex of the human condition.
                  </ScrambleText>
                </div>
              </motion.div>
            </section>
          </div>

          <motion.div
            id="HeroBottom"
            className="grow justify-center items-center flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5 }}
          >
            <motion.div
              id="heroBottom-container-middle"
              layout
              transition={{
                layout: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              }}
              className="my-auto flex h-1/2 w-2/3 flex-col items-center justify-center gap-6 border-2 p-4 sm:flex-row sm:gap-8"
            >
              {/* Host container for pagelinks buttons initial layout*/}
              <div className="flex w-full flex-col items-center gap-4 sm:w-2/3">
                {/* Pagelinks buttons morphing container */}
                <motion.div
                  layout
                  className={
                    isSidebarCollapsed
                      ? "fixed left-4 top-1/8 z-30 flex w-14 -translate-y-1/2 flex-col items-center gap-2 border border-white/20 bg-black/35 p-2 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md"
                      : "flex w-full flex-col items-center gap-4"
                  }
                >
                  {contactLinks.map(({ href, icon, label, external }) => (
                    <motion.a
                      key={label}
                      layout
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      aria-label={label}
                      title={label}
                      className={
                        isSidebarCollapsed
                          ? "flex aspect-square w-10 items-center justify-center border border-white/30 text-sm transition-colors hover:border-[#ff549e] hover:text-[#ff549e]"
                          : "flex w-full max-w-md items-center gap-2 border border-white/30 px-4 py-2 transition-colors hover:border-[#ff549e]"
                      }
                    >
                      <span aria-hidden="true">{icon}</span>
                      <motion.span
                        initial={false}
                        animate={{
                          opacity: isSidebarCollapsed ? 0 : 1,
                          width: isSidebarCollapsed ? 0 : "auto",
                        }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Scroll down hint */}
              <motion.div
                layout
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 5 }}
                // className={isSidebarCollapsed ? "hidden" : "block"}
              >
                <motion.div
                  className="flex items-center justify-center gap-3 sm:w-1/3 md:w-2/3 lg:w-full sm:justify-start"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: showScrollHint ? 1 : 0,
                    y: showScrollHint ? 0 : 12,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="text-2xl leading-none text-[#ff549e]"
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 1.5, delay: 5, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                  <p className="text-center text-sm italic text-white/70 sm:text-left">
                    Scroll down for more content
                  </p>
                </motion.div>
              </motion.div>

              {/* Host container for contact buttons initial layout*/}
              <div className="flex w-full flex-col items-center gap-4 sm:w-2/3">
                {/* Contact buttons morphing container */}
                <motion.div
                  layout
                  className={
                    isSidebarCollapsed
                      ? "fixed right-4 top-1/8 z-30 flex w-14 -translate-y-1/2 flex-col items-center gap-2 border border-white/20 bg-black/35 p-2 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md"
                      : "flex w-full flex-col items-center gap-4"
                  }
                >
                  {contactLinks.map(({ href, icon, label, external }) => (
                    <motion.a
                      key={label}
                      layout
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      aria-label={label}
                      title={label}
                      className={
                        isSidebarCollapsed
                          ? "flex aspect-square w-10 items-center justify-center border border-white/30 text-sm transition-colors hover:border-[#ff549e] hover:text-[#ff549e]"
                          : "flex w-full max-w-md items-center gap-2 border border-white/30 px-4 py-2 transition-colors hover:border-[#ff549e]"
                      }
                    >
                      <span aria-hidden="true">{icon}</span>
                      <motion.span
                        initial={false}
                        animate={{
                          opacity: isSidebarCollapsed ? 0 : 1,
                          width: isSidebarCollapsed ? 0 : "auto",
                        }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. The
            vertical space here is intentionally expanded to show how scrolling
            behaves.
          </article>
          <article className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            More placeholder text, more placeholder notes, and more copy to make
            the page feel full without committing to real content yet.
          </article>
          <article className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            A third column keeps the layout flexible while the main container
            continues to grow downwards for the overflow effect.
          </article>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-slate-950/35 p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.95)] backdrop-blur-md">
          <h2 className="text-xl font-semibold text-white">
            Extra placeholder blocks
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-[20px] border border-white/10 bg-white/6 p-4 text-sm text-slate-200">
              Block A — the content is now stacked in a flex column, which gives
              the container room to overflow vertically instead of clipping.
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/6 p-4 text-sm text-slate-200">
              Block B — this gives you extra depth to preview the scroll
              behavior without worrying about the final copy yet.
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/6 p-4 text-sm text-slate-200">
              Block C — the layout is intentionally simple and easy to swap for
              actual sections later.
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/6 p-4 text-sm text-slate-200">
              Block D — the page can now keep expanding downward as you add more
              content.
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-300">
            Overflow test
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            This panel exists to make the page scroll.
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-slate-200 sm:text-base">
            Adding more cards and longer placeholder text below ensures the main
            content area stays taller than the viewport, so the scroll behavior
            is visible. This is enough vertical content to confirm the effect.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-100">
            <p>• A longer narrative block to stretch the page.</p>
            <p>• Another short note to keep the flow balanced.</p>
            <p>
              • A final placeholder paragraph so the container definitely has
              more height than the window.
            </p>
            <p>
              • This also gives you a simple preview of how the finished page
              will feel when real material is inserted.
            </p>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-slate-950/35 p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.95)] backdrop-blur-md">
          <h2 className="text-xl font-semibold text-white">
            Final placeholder stretch
          </h2>
          <p className="mt-3 text-sm text-slate-200">
            This last block is here to ensure the panel continues to overflow
            vertically. You can delete or replace these items once you plug in
            the real page content.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-slate-100">
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2">
              Scroll
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2">
              Flex
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2">
              Overflow
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2">
              Placeholder
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
