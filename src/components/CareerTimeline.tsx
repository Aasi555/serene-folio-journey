import { Card, CardContent } from "@/components/ui/card";

const timelineSteps = [
  {
    id: 1,
    title: "Engineering Graduate",
    description: "Completed Bachelor's ",
    status: "completed",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Internship",
    description: "Software Development Intern at Tech Company",
    status: "completed",
    icon: "💼",
  },
  {
    id: 3,
    title: "Junior SDE",
    description: "Junior Software Development Engineer",
    status: "completed",
    icon: "👨‍💻",
  },
  {
    id: 4,
    title: "SDE",
    description: "Software Development Engineer - Current Role",
    status: "current",
    icon: "🚀",
  },
  {
    id: 5,
    title: "Cloud Development",
    description: "Currently learning AWS, Azure, and cloud architecture",
    status: "in-progress",
    icon: "☁️",
  },
  {
    id: 6,
    title: "MA in Psychology",
    description: "Pursuing Master's in Psychology as a side passion",
    status: "in-progress",
    icon: "🧠",
  },
  {
    id: 7,
    title: "Product Manager",
    description: "Goal: Transition to Product Management role",
    status: "future",
    icon: "🎯",
  },
];

const CareerTimeline = () => {
  return (
    <section className='py-20 px-6 bg-gradient-hero'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent'>
            Career Journey
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            My professional journey from engineering graduate to aspiring
            product manager
          </p>
        </div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform md:-translate-x-0.5' />

          <div className='space-y-12'>
            {timelineSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline dot */}
                <div className='absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10 shadow-glow' />

                {/* Content card */}
                <div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <Card
                    className={`
                    ${
                      step.status === "current"
                        ? "bg-primary/10 border-primary shadow-glow"
                        : "bg-card"
                    }
                    ${step.status === "completed" ? "bg-accent/30" : ""}
                    ${step.status === "in-progress" ? "bg-secondary/50" : ""}
                    ${step.status === "future" ? "bg-muted/50 opacity-75" : ""}
                    hover:shadow-medium transition-all duration-300 group
                  `}
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-start gap-4'>
                        <div className='text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                          {step.icon}
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-xl font-semibold mb-2 text-foreground'>
                            {step.title}
                          </h3>
                          <p className='text-muted-foreground'>
                            {step.description}
                          </p>
                          {step.status === "current" && (
                            <span className='inline-block mt-3 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full'>
                              Current
                            </span>
                          )}
                          {step.status === "in-progress" && (
                            <span className='inline-block mt-3 px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full'>
                              In Progress
                            </span>
                          )}
                          {step.status === "future" && (
                            <span className='inline-block mt-3 px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full'>
                              Future Goal
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
