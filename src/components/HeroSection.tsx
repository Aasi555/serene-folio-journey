import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const handleDownloadResume = () => {
    // Create a dummy PDF download link
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'resume.pdf';
    link.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Alex Johnson
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Software Development Engineer
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Passionate software engineer with expertise in full-stack development, 
            cloud technologies, and a growing interest in product management. 
            Currently expanding my skills in cloud development while pursuing psychology studies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg font-medium bg-primary hover:bg-primary-hover shadow-medium transition-all duration-300 hover:shadow-glow"
              onClick={handleDownloadResume}
            >
              Download Resume
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg font-medium border-2 hover:bg-accent transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;