import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech_used: string[];
  github_link: string | null;
  live_demo_link: string | null;
  image_url: string | null;
  created_at: string;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.tech_used || []).some(tech => 
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps'
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const shouldUseCarousel = filteredProjects.length > 6;
  const carouselSlides = shouldUseCarousel ? 
    Array.from({ length: Math.ceil(filteredProjects.length / 3) }, (_, i) =>
      filteredProjects.slice(i * 3, (i + 1) * 3)
    ) : [];

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className='group hover:shadow-glow transition-all duration-500 bg-gradient-card border-0 overflow-hidden h-full'>
      <div className='relative overflow-hidden'>
        <img
          src={project.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'}
          alt={project.title}
          className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      <CardHeader className='pb-3'>
        <CardTitle className='text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300'>
          {project.title}
        </CardTitle>
        <CardDescription className='text-muted-foreground line-clamp-2'>
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className='pt-0'>
        <div className='flex flex-wrap gap-2 mb-4'>
          {(project.tech_used || []).map((tech) => (
            <span
              key={tech}
              className='px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full'
            >
              {tech}
            </span>
          ))}
        </div>

        <div className='flex gap-3'>
          {project.github_link && (
            <Button
              variant='outline'
              size='sm'
              className='flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300'
              onClick={() => window.open(project.github_link!, "_blank")}
            >
              GitHub
            </Button>
          )}
          {project.live_demo_link && (
            <Button
              size='sm'
              className='flex-1 bg-primary hover:bg-primary-hover transition-all duration-300'
              onClick={() => window.open(project.live_demo_link!, "_blank")}
            >
              Live Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <section className='py-20 px-6 bg-background'>
        <div className='max-w-7xl mx-auto text-center'>
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='py-20 px-6 bg-background'>
        <div className='max-w-7xl mx-auto text-center'>
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchProjects} variant="outline">
            Try Again
          </Button>
        </div>
      </section>
    );
  }
  return (
    <section className='py-20 px-6 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent'>
            Featured Projects
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            A showcase of my recent work in web development, mobile
            applications, and data visualization
          </p>
        </div>

        <div className='mb-8 max-w-md mx-auto'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
            <Input
              type='text'
              placeholder='Search projects by title, description, or technology...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>No projects found matching your search.</p>
          </div>
        ) : shouldUseCarousel ? (
          <div className='relative'>
            {/* Carousel Navigation */}
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-xl font-semibold text-foreground'>
                {filteredProjects.length} Projects
              </h3>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={scrollPrev}
                  disabled={prevBtnDisabled}
                  className='p-2'
                >
                  <ChevronLeft className='w-4 h-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={scrollNext}
                  disabled={nextBtnDisabled}
                  className='p-2'
                >
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </div>
            </div>

            {/* Carousel Container */}
            <div className='overflow-hidden' ref={emblaRef}>
              <div className='flex'>
                {carouselSlides.map((slide, index) => (
                  <div key={index} className='flex-[0_0_100%] min-w-0'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2'>
                      {slide.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            {carouselSlides.length > 1 && (
              <div className='flex justify-center gap-2 mt-8'>
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    onClick={() => scrollTo(index)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Regular Grid Layout for ≤6 projects */
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
