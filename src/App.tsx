import { Features } from './features/Features'
import { Hero } from './hero/Hero'
import { Network } from './network/Network'

// Sections are added one at a time (reference/BRIEF.md, Page plan).
function App() {
  return (
    <main>
      <Hero />
      <Features />
      <Network />
    </main>
  )
}

export default App
