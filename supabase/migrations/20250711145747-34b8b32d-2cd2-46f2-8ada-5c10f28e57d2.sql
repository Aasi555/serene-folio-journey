-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_used TEXT[] NOT NULL DEFAULT '{}',
  github_link TEXT,
  live_demo_link TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to projects
CREATE POLICY "Projects are publicly viewable" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to insert projects
CREATE POLICY "Authenticated users can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects" 
ON public.projects 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects" 
ON public.projects 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Insert sample projects data
INSERT INTO public.projects (title, description, tech_used, github_link, live_demo_link, image_url) VALUES
('PACE OS', 'A comprehensive web application for data visualization and analytics with real-time charts and insights.', ARRAY['React', 'TypeScript', 'Chart.js'], 'https://github.com', 'https://scdjv.pace-os.com/', '/api/placeholder/400/300'),
('Carbon Emission Calculator', 'Feature-rich mobile application for online shopping with seamless user experience and payment integration.', ARRAY['React Native', 'Redux', 'Firebase'], 'https://github.com', 'https://aasif-sustain-build.netlify.app', '/api/placeholder/400/300'),
('Drive Share', 'Interactive platform for creating beautiful charts and graphs from complex datasets with AI-powered insights.', ARRAY['Python', 'D3.js', 'PostgreSQL'], 'https://github.com', 'https://aasifdriveshare.netlify.app', '/api/placeholder/400/300'),
('E-commerce', 'Collaborative project management application with kanban boards, team chat, and progress tracking.', ARRAY['Vue.js', 'Node.js', 'MongoDB'], 'https://github.com', 'https://shop-aasify.netlify.app/', '/api/placeholder/400/300'),
('Blog', 'Modern social networking application with real-time messaging, posts, and user engagement features.', ARRAY['React', 'GraphQL', 'AWS'], 'https://github.com', 'https://echoes-of-wisdom.netlify.app/', '/api/placeholder/400/300'),
('Portfolio Cosmic Theme', 'Intelligent chatbot application powered by machine learning with natural language processing capabilities.', ARRAY['Next.js', 'OpenAI', 'Prisma'], 'https://github.com', 'https://aasifportfolio.netlify.app/', '/api/placeholder/400/300');