import About from "./components/About"
import Channels from "./components/Channels"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Nav from "./components/Nav"
import Stack from "./components/Stack"
import Work from "./components/Work"

export default function App() {
  return (
    <div className="min-h-screen bg-base text-fg">
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Channels />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
