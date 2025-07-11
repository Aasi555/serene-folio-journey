import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// EmailJS Configuration - Replace with your actual IDs
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_PUBLIC_KEY = "your_public_key";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Missing Message",
        description: "Please write a message before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_name: "Asif", // Replace with your name
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id='contact' className='py-20 px-6 bg-background'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent'>
            Get In Touch
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Let's connect! Whether you have a project in mind, want to
            collaborate, or just want to say hello.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* Contact Info */}
          <div className='space-y-8'>
            <div>
              <h3 className='text-2xl font-semibold mb-6 text-foreground'>
                Let's Start a Conversation
              </h3>
              <p className='text-muted-foreground mb-8 leading-relaxed'>
                I'm always interested in hearing about new opportunities,
                innovative projects, and meaningful collaborations. Don't
                hesitate to reach out!
              </p>
            </div>

            <div className='space-y-6'>
              <Card className='bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300'>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-4'>
                    <div className='text-2xl'>📧</div>
                    <div>
                      <h4 className='font-semibold text-foreground'>Email</h4>
                      <p className='text-muted-foreground'>
                        dangeaasif30@gmail.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300'>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-4'>
                    <div className='text-2xl'>📱</div>
                    <div>
                      <h4 className='font-semibold text-foreground'>Phone</h4>
                      <p className='text-muted-foreground'>+91 8888789064</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300'>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-4'>
                    <div className='text-2xl'>🌍</div>
                    <div>
                      <h4 className='font-semibold text-foreground'>
                        Location
                      </h4>
                      <p className='text-muted-foreground'>Mumbai India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className='bg-gradient-card border-0 shadow-medium'>
            <CardHeader>
              <CardTitle className='text-2xl text-foreground'>
                Send a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label
                      htmlFor='name'
                      className='text-foreground font-medium'
                    >
                      Name *
                    </Label>
                    <Input
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder='Your full name'
                      className='bg-background/50 border-border focus:border-primary'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label
                      htmlFor='email'
                      className='text-foreground font-medium'
                    >
                      Email *
                    </Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='your.email@example.com'
                      className='bg-background/50 border-border focus:border-primary'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='phone'
                    className='text-foreground font-medium'
                  >
                    Phone
                  </Label>
                  <Input
                    id='phone'
                    name='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder='+91 8888789064'
                    className='bg-background/50 border-border focus:border-primary'
                  />
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='message'
                    className='text-foreground font-medium'
                  >
                    Message
                  </Label>
                  <Textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder='Tell me about your project or just say hello...'
                    rows={5}
                    className='bg-background/50 border-border focus:border-primary resize-none'
                  />
                </div>

                <Button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-3 shadow-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
