import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import GitHubCalendar from "@/components/GitHubCalendar";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Blog />
      <GitHubCalendar />
      <Contact />
    </main>
  );
}
