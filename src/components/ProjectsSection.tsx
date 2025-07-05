import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const projects = [
  {
    id: 1,
    title: "Analytics Dashboard",
    description: "A comprehensive web application for data visualization and analytics with real-time charts and insights.",
    image: project1,
    github: "https://github.com",
    demo: "https://demo.com",
    tech: ["React", "TypeScript", "Chart.js"]
  },
  {
    id: 2,
    title: "E-Commerce Mobile App",
    description: "Feature-rich mobile application for online shopping with seamless user experience and payment integration.",
    image: project2,
    github: "https://github.com",
    demo: "https://demo.com",
    tech: ["React Native", "Redux", "Firebase"]
  },
  {
    id: 3,
    title: "Data Visualization Platform",
    description: "Interactive platform for creating beautiful charts and graphs from complex datasets with AI-powered insights.",
    image: project3,
    github: "https://github.com",
    demo: "https://demo.com",
    tech: ["Python", "D3.js", "PostgreSQL"]
  },
  {
    id: 4,
    title: "Project Management Tool",
    description: "Collaborative project management application with kanban boards, team chat, and progress tracking.",
    image: project4,
    github: "https://github.com",
    demo: "https://demo.com",
    tech: ["Vue.js", "Node.js", "MongoDB"]
  },
  {
    id: 5,
    title: "Social Media Platform",
    description: "Modern social networking application with real-time messaging, posts, and user engagement features.",
    image: project5,
    github: "https://github.com",
    demo: "https://demo.com",
    tech: ["React", "GraphQL", "AWS"]
  },
  {
    id: 6,
    title: "AI Chat Application",
    description: "Intelligent chatbot application powered by machine learning with natural language processing capabilities.",
    image: project6,
    github: "https://github.com",
    demo: "https://demo.com",
    tech: ["Next.js", "OpenAI", "Prisma"]
  }
];

const ProjectsSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in web development, mobile applications, and data visualization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-glow transition-all duration-500 bg-gradient-card border-0 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    GitHub
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-primary hover:bg-primary-hover transition-all duration-300"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;