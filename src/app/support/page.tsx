"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Satellite,
  Wifi,
  Cloud
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "How does AuraSAT work?",
    answer: "AuraSAT uses Low Earth Orbit (LEO) satellites positioned 500-2000 km above Earth's surface. These satellites communicate with ground stations to provide internet connectivity and collect weather data. The low orbit altitude ensures low latency (20-50ms) and reliable connections even in remote areas. The system uses advanced signal processing and mesh networking to maintain coverage across challenging terrain.",
    category: "Technology",
    icon: <Satellite className="w-5 h-5" />
  },
  {
    id: "2",
    question: "What's the project's impact on remote communities?",
    answer: "AuraSAT aims to transform remote communities by providing reliable internet access for education, healthcare, and economic opportunities. Students can access online learning resources, doctors can conduct telemedicine consultations, and local businesses can participate in the digital economy. Weather data helps farmers make informed decisions and improves disaster preparedness in vulnerable regions.",
    category: "Impact",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: "3",
    question: "What areas will AuraSAT cover?",
    answer: "AuraSAT focuses on India's most remote and underserved regions, including Northeast India, Himalayan areas, island territories like Lakshadweep and Andaman & Nicobar, and other rural communities with limited connectivity. The phased rollout prioritizes areas with the greatest need and strategic importance for national development.",
    category: "Coverage",
    icon: <MapPin className="w-5 h-5" />
  },
  {
    id: "4",
    question: "How is AuraSAT different from traditional satellite internet?",
    answer: "Unlike traditional geostationary satellites (35,000+ km altitude) with 600ms+ latency, AuraSAT's LEO satellites provide 20-50ms latency comparable to terrestrial broadband. The lower altitude allows for stronger signals, lower power requirements, and better performance in challenging weather conditions. The constellation design ensures redundancy and continuous coverage.",
    category: "Technology",
    icon: <Wifi className="w-5 h-5" />
  },
  {
    id: "5",
    question: "What weather data does AuraSAT provide?",
    answer: "AuraSAT satellites collect comprehensive weather data including temperature, humidity, wind speed and direction, atmospheric pressure, rainfall, visibility, and UV index. This data is processed in real-time and made available through user-friendly dashboards and APIs. The information helps with agricultural planning, disaster management, and daily weather forecasting for remote communities.",
    category: "Features",
    icon: <Cloud className="w-5 h-5" />
  },
  {
    id: "6",
    question: "Is AuraSAT a commercial project?",
    answer: "AuraSAT is currently a college project focused on research, development, and educational impact. While the technology has commercial potential, our primary goal is to demonstrate the feasibility of LEO satellite solutions for remote connectivity and to provide hands-on learning experience for students. Future commercialization may be considered based on project success and stakeholder interest.",
    category: "General",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: "7",
    question: "How can I get involved with AuraSAT?",
    answer: "We welcome collaboration from students, researchers, and organizations interested in satellite technology and rural development. You can contribute through technical expertise, research partnerships, or funding support. Students can join the project team through our college's engineering programs, while organizations can explore partnership opportunities for pilot deployments and technology validation.",
    category: "Participation",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: "8",
    question: "What are the technical challenges AuraSAT addresses?",
    answer: "AuraSAT tackles several key challenges: providing connectivity in mountainous terrain with line-of-sight obstacles, maintaining reliable links during extreme weather conditions, ensuring power efficiency for satellite operations, managing signal interference, and creating cost-effective ground station infrastructure. Our solutions include adaptive signal processing, mesh networking, and robust hardware design.",
    category: "Technology",
    icon: <Satellite className="w-5 h-5" />
  }
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const categories = [...new Set(faqItems.map(item => item.category))];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary bg-primary/10">
              <HelpCircle className="w-4 h-4 mr-2" />
              Support & Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get Help & Learn More
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions and get in touch with the AuraSAT team
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Need Immediate Help?</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Get in touch with our support team through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                    <p className="text-muted-foreground mb-3">support@aurasat.edu</p>
                    <p className="text-sm text-muted-foreground">Response within 24-48 hours</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <Phone className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
                    <p className="text-muted-foreground mb-3">+91 123 456 7890</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM IST</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Visit Us</h3>
                    <p className="text-muted-foreground mb-3">Engineering College</p>
                    <p className="text-sm text-muted-foreground">By appointment only</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about AuraSAT
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <Badge variant="outline" className="border-primary text-primary cursor-pointer hover:bg-primary hover:text-white">
                All Categories
              </Badge>
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className="border-border text-muted-foreground cursor-pointer hover:bg-primary hover:text-white hover:border-primary"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* FAQ Accordion */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-border">
                      <AccordionTrigger className="text-foreground hover:text-primary">
                        <div className="flex items-center space-x-3">
                          <div className="text-primary">{item.icon}</div>
                          <span className="text-left">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        <div className="pt-2">
                          <p>{item.answer}</p>
                          <div className="mt-3">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <p className="text-lg text-muted-foreground">
                Send us a message and we'll get back to you as soon as possible
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Send a Message</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Fill out the form below and we'll respond within 24-48 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-input border-border text-foreground"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-input border-border text-foreground"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-input border-border text-foreground"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="bg-input border-border text-foreground"
                        placeholder="Please provide detailed information about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {submitStatus === 'success' && (
                      <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                        <span>Message sent successfully! We'll get back to you soon.</span>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="flex items-center space-x-2 text-orange-400 bg-orange-400/10 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>There was an error sending your message. Please try again.</span>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>

              {/* Support Information */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Support Information</h3>
                <div className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-primary" />
                        Response Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Technical Support</span>
                          <Badge variant="secondary">24-48 hours</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Partnership Inquiries</span>
                          <Badge variant="secondary">3-5 business days</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Media Requests</span>
                          <Badge variant="secondary">48-72 hours</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Student Applications</span>
                          <Badge variant="secondary">1-2 weeks</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-primary" />
                        Email Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span className="text-muted-foreground">
                            <strong>Technical Support:</strong> satellite operations, connectivity issues, weather data access
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span className="text-muted-foreground">
                            <strong>Partnership:</strong> collaboration opportunities, pilot programs, research partnerships
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span className="text-muted-foreground">
                            <strong>Media:</strong> press inquiries, interviews, project information
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span className="text-muted-foreground">
                            <strong>Student:</strong> academic inquiries, project participation, internship opportunities
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team is here to help you with any questions about AuraSAT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}