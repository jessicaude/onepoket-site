import { Features } from './features/Features'
import { Hero } from './hero/Hero'

// Sections are added one at a time (reference/BRIEF.md, Page plan).
function App() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  )
}

export default App
