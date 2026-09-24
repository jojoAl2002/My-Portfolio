import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Domains from './components/Domains'
import Ticker from './components/Ticker'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import { Preloader, ScrollProgress, CursorGlow, Aurora } from './components/Chrome'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen bg-void">
        <Preloader />
        <ScrollProgress />
        <CursorGlow />
        <Aurora />

        <Nav />

        <main className="relative">
          <Hero />
          <Highlights />
          <Domains />
          <Ticker />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  )
}
