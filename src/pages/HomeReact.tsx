import { motion } from "motion/react";
import NightSkyConstellations from "../components/NightSkyConstellations";
import NameTitle from "../components/NameTitle.tsx";

export default function HomeReact() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <NightSkyConstellations></NightSkyConstellations>

      <div
        id="main-content-container"
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
      >
        <section>
          <section className="flex justify-center pt-10 font-[monument] text-4xl">
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
            <NameTitle />
          </section>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[24px] border border-white/10 bg-slate-950/35 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.9)] backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Panel one
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">Hello</h2>
            <p className="mt-3 text-sm text-slate-200">
              This is placeholder copy for the left area of the page. It is
              intentionally simple and easy to replace once the real content is
              ready.
            </p>
          </article>

          <article className="rounded-[24px] border border-white/10 bg-slate-950/35 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.9)] backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Panel two
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">World</h2>
            <p className="mt-3 text-sm text-slate-200">
              This is placeholder copy for the right area of the page. It is
              intentionally simple and easy to replace once the real content is
              ready.
            </p>
          </article>
        </section>

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
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                animate={{
                  x: [0, 1000],
                  transition: { duration: 5 },
                }}
              >
                HARP HARP HAPR!
              </motion.div>
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
