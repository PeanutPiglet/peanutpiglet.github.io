import { useState } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import NightSkyConstellations from "../components/NightSkyConstellations.tsx";
import NameTitle from "../components/Home/NameTitle.tsx";
import RisingText from "../components/RisingText.tsx";
import ScrambleText from "../components/ScrambleText.tsx";
import BorderTracer from "../components/Home/BorderTracer.tsx";
import IconButton from "../components/Buttons/IconButton.tsx";

export default function Home() {
  const SCROLL_THRESHOLD_HINT = 0.5;

  const [showScrollHint, setShowScrollHint] = useState(true);
  const isSidebarCollapsed = !showScrollHint;

  const pageLinks = [
    {
      href: "https://jacktangzzz.com",
      icon: "M24 2.5a21.5 21.5 0 0 0-6.8 41.9c1.08.2 1.47-.46 1.47-1v-3.65c-6 1.3-7.24-2.88-7.24-2.88A5.7 5.7 0 0 0 9 33.68c-1.95-1.33.15-1.31.15-1.31a4.52 4.52 0 0 1 3.29 2.22c1.92 3.29 5 2.34 6.26 1.79a4.61 4.61 0 0 1 1.37-2.88c-4.78-.54-9.8-2.38-9.8-10.62a8.29 8.29 0 0 1 2.22-5.77 7.68 7.68 0 0 1 .21-5.69s1.8-.58 5.91 2.2a20.46 20.46 0 0 1 10.76 0c4.11-2.78 5.91-2.2 5.91-2.2a7.74 7.74 0 0 1 .21 5.69 8.28 8.28 0 0 1 2.21 5.77c0 8.26-5 10.07-9.81 10.61a5.12 5.12 0 0 1 1.46 4v5.9c0 .71.39 1.24 1.48 1A21.5 21.5 0 0 0 24 2.5",
      viewSize: "0 0 48 48",
      label: "Blog",
      external: false,
    },
    {
      href: "https://jacktangzzz.com",
      icon: "M22 3.47v17.06A1.47 1.47 0 0 1 20.53 22H3.47A1.47 1.47 0 0 1 2 20.53V3.47A1.47 1.47 0 0 1 3.47 2h17.06A1.47 1.47 0 0 1 22 3.47ZM7.882 9.648h-2.94v9.412h2.94V9.647Zm.265-3.235a1.694 1.694 0 0 0-1.682-1.706h-.053a1.706 1.706 0 0 0 0 3.412 1.694 1.694 0 0 0 1.735-1.653v-.053Zm10.912 6.93c0-2.83-1.8-3.93-3.588-3.93a3.353 3.353 0 0 0-2.977 1.517h-.082V9.647H9.647v9.412h2.941v-5.006a1.953 1.953 0 0 1 1.765-2.106h.112c.935 0 1.63.588 1.63 2.07v5.042h2.94l.024-5.718Z",
      viewSize: "0 0 24 24",
      label: "Projects",
      external: false,
    },
    {
      href: "https://jacktangzzz.com",
      icon: "M3.75 5.25 3 6v12l.75.75h16.5L21 18V6l-.75-.75H3.75Zm.75 2.446v9.554h15V7.695L12 14.514 4.5 7.696Zm13.81-.946H5.69L12 12.486l6.31-5.736Z",
      viewSize: "0 0 24 24",
      label: "Gallery",
      external: false,
    },
  ];

  const contactLinks = [
    {
      href: "https://github.com/peanutpiglet",
      icon: "M24 2.5a21.5 21.5 0 0 0-6.8 41.9c1.08.2 1.47-.46 1.47-1v-3.65c-6 1.3-7.24-2.88-7.24-2.88A5.7 5.7 0 0 0 9 33.68c-1.95-1.33.15-1.31.15-1.31a4.52 4.52 0 0 1 3.29 2.22c1.92 3.29 5 2.34 6.26 1.79a4.61 4.61 0 0 1 1.37-2.88c-4.78-.54-9.8-2.38-9.8-10.62a8.29 8.29 0 0 1 2.22-5.77 7.68 7.68 0 0 1 .21-5.69s1.8-.58 5.91 2.2a20.46 20.46 0 0 1 10.76 0c4.11-2.78 5.91-2.2 5.91-2.2a7.74 7.74 0 0 1 .21 5.69 8.28 8.28 0 0 1 2.21 5.77c0 8.26-5 10.07-9.81 10.61a5.12 5.12 0 0 1 1.46 4v5.9c0 .71.39 1.24 1.48 1A21.5 21.5 0 0 0 24 2.5",
      viewSize: "0 0 48 48",
      label: "GitHub",
      external: true,
    },
    {
      href: "https://linkedin.com",
      icon: "M22 3.47v17.06A1.47 1.47 0 0 1 20.53 22H3.47A1.47 1.47 0 0 1 2 20.53V3.47A1.47 1.47 0 0 1 3.47 2h17.06A1.47 1.47 0 0 1 22 3.47ZM7.882 9.648h-2.94v9.412h2.94V9.647Zm.265-3.235a1.694 1.694 0 0 0-1.682-1.706h-.053a1.706 1.706 0 0 0 0 3.412 1.694 1.694 0 0 0 1.735-1.653v-.053Zm10.912 6.93c0-2.83-1.8-3.93-3.588-3.93a3.353 3.353 0 0 0-2.977 1.517h-.082V9.647H9.647v9.412h2.941v-5.006a1.953 1.953 0 0 1 1.765-2.106h.112c.935 0 1.63.588 1.63 2.07v5.042h2.94l.024-5.718Z",
      viewSize: "0 0 24 24",
      label: "LinkedIn",
      external: true,
    },
    {
      href: "mailto:hello@example.com",
      icon: "M3.75 5.25 3 6v12l.75.75h16.5L21 18V6l-.75-.75H3.75Zm.75 2.446v9.554h15V7.695L12 14.514 4.5 7.696Zm13.81-.946H5.69L12 12.486l6.31-5.736Z",
      viewSize: "0 0 24 24",
      label: "Email",
      external: false,
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
      <div className="-z-50">
        <NightSkyConstellations></NightSkyConstellations>
      </div>

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
              className="my-auto flex h-1/2 w-7/8 flex-col items-center justify-center gap-6 p-4 sm:flex-row sm:gap-8"
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
                  {pageLinks.map(
                    ({ href, icon, viewSize, label, external }) => (
                      <IconButton
                        href={href}
                        icon={icon}
                        viewSize={viewSize}
                        label={label}
                        external={external}
                        collapsed={isSidebarCollapsed}
                        justifyRight={false}
                        key={label}
                      ></IconButton>
                    ),
                  )}
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
                  {contactLinks.map(
                    ({ href, icon, viewSize, label, external }) => (
                      <IconButton
                        href={href}
                        icon={icon}
                        viewSize={viewSize}
                        label={label}
                        external={external}
                        collapsed={isSidebarCollapsed}
                        justifyRight={true}
                        key={label}
                      ></IconButton>
                    ),
                  )}
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
