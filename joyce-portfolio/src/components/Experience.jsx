import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'
import SectionHeading from './ui/SectionHeading'
import { experience } from '../data/cvData'

export default function Experience() {
  const trackRef = useRef(null)

  // The beam fills as the timeline scrolls past, so progress is felt, not read.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end 55%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="relative z-10 border-t border-line/50 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="03"
          kicker="Trajectory"
          title="From IT support to building a healthcare platform."
          blurb="Five roles. Each one added a layer — systems and support, then storefronts, then full-stack product work on LbCare with the team at DigiLab."
        />

        <div ref={trackRef} className="perspective relative mt-16 md:mt-20">
          {/* Rail + beam */}
          <div className="absolute left-[11px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-line md:block">
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="h-full w-full bg-gradient-to-b from-mint via-iris to-solar shadow-glow"
            />
          </div>

          <div className="space-y-6">
            {experience.map((job, i) => (
              <Reveal
                key={job.role + job.company}
                delay={0.05}
                rotateY={-10}
                x={-24}
                className="relative md:pl-16"
              >
                {/* Node */}
                <span className="absolute left-0 top-8 hidden h-[23px] w-[23px] place-items-center rounded-full border border-line bg-void md:grid">
                  <span className="h-2 w-2 rounded-full bg-mint shadow-glow" />
                </span>

                <TiltCard intensity={4} className="p-6 md:p-8">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-display text-xl text-ink md:text-2xl">{job.role}</h3>
                      <p className="mt-1 text-sm text-mint">{job.company}</p>
                    </div>

                    <div className="flex shrink-0 flex-col md:items-end">
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-ink/80">
                        {job.period}
                      </span>
                      <span className="mt-2 font-mono text-[11px] text-mute">{job.location}</span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 text-[14.5px] leading-relaxed text-ink/75"
                      >
                        <span className="absolute left-0 top-[0.62em] h-1.5 w-1.5 rotate-45 bg-iris/80" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
