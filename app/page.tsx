import Hero from "@/components/home/Hero";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Blog from "@/components/home/Blog";
import GitHubCalendar from "@/components/home/GitHubCalendar";
import Contact from "@/components/home/Contact";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Blog />
      <GitHubCalendar />
      <Contact />
    </main>
  );
}
