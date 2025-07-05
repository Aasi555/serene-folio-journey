import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import CareerTimeline from "./CareerTimeline";
import ContactSection from "./ContactSection";

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectsSection />
      <CareerTimeline />
      <ContactSection />
    </div>
  );
};

export default Portfolio;