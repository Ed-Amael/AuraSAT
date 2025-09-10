import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Satellite, Users, Target, Award, Lightbulb, Rocket } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarath",
      role: "Team Leader & Hardware Engineer",
      description: "Leading the AuraSAT project with expertise in satellite hardware design and project management.",
      skills: ["Hardware Design", "Project Management", "Systems Engineering"]
    },
    {
      name: "Avadhut",
      role: "Software Developer",
      description: "Developing the software systems for satellite communication and data processing.",
      skills: ["Software Architecture", "Data Processing", "Communication Systems"]
    },
    {
      name: "Sumanth",
      role: "Software Developer",
      description: "Working on the ground station software and user interface development.",
      skills: ["Frontend Development", "API Design", "User Experience"]
    },
    {
      name: "Diya",
      role: "Software Developer",
      description: "Specializing in weather data algorithms and machine learning applications.",
      skills: ["Machine Learning", "Data Science", "Weather Algorithms"]
    },
    {
      name: "Hemachandra",
      role: "Hardware Engineer",
      description: "Assisting with hardware design, testing, and prototype development.",
      skills: ["Circuit Design", "Testing", "Prototype Development"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary bg-primary/10">
              <Satellite className="w-4 h-4 mr-2" />
              About AuraSAT
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Mission & Vision
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bringing internet connectivity and weather insights to remote India through innovative LEO satellite technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                AuraSAT is a college project initiative aimed at developing a cost-effective LEO (Low Earth Orbit) satellite prototype 
                to bridge the digital divide in India's most remote regions. Our mission is to provide reliable internet connectivity 
                and real-time weather monitoring capabilities to communities that have been historically underserved by traditional infrastructure.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="bg-card border-border card-glow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">Connectivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    Providing high-speed internet access to remote villages and communities across India.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border card-glow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    Developing cutting-edge satellite technology with cost-effective solutions for maximum impact.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border card-glow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    Empowering students with hands-on experience in satellite technology and space engineering.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground">
                Passionate students working together to make a difference
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-card border-border card-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4">
                      {member.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Project Overview
              </h2>
              <p className="text-lg text-muted-foreground">
                Understanding the AuraSAT LEO satellite prototype
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">LEO Satellite Technology</h3>
                <p className="text-muted-foreground mb-6">
                  Our LEO (Low Earth Orbit) satellite prototype operates at an altitude of approximately 500-2000 km above Earth's surface. 
                  This proximity allows for lower latency communication and reduced power requirements compared to traditional geostationary satellites.
                </p>
                <p className="text-muted-foreground mb-6">
                  The satellite is designed to provide two primary services: internet connectivity through a relay system and real-time weather 
                  data collection using onboard sensors. This dual-purpose approach maximizes the impact of each satellite deployment.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Low latency communication (20-50ms)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Weather monitoring with 30-minute updates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Cost-effective deployment and maintenance</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  {/* Simple SVG diagram */}
                  <svg width="300" height="300" viewBox="0 0 300 300" className="w-full max-w-md">
                    {/* Earth */}
                    <circle cx="150" cy="200" r="60" fill="#1A1A2E" stroke="#28A745" strokeWidth="2"/>
                    
                    {/* Satellite orbit */}
                    <ellipse cx="150" cy="150" rx="120" ry="40" fill="none" stroke="#28A745" strokeWidth="2" strokeDasharray="5,5"/>
                    
                    {/* Satellite */}
                    <g transform="translate(270, 150)">
                      <rect x="-15" y="-8" width="30" height="16" fill="#28A745" rx="2"/>
                      <rect x="-20" y="-3" width="8" height="6" fill="#28A745"/>
                      <rect x="12" y="-3" width="8" height="6" fill="#28A745"/>
                      <circle cx="0" cy="0" r="3" fill="#FFFFFF"/>
                    </g>
                    
                    {/* Signal lines */}
                    <line x1="255" y1="150" x2="200" y2="180" stroke="#28A745" strokeWidth="2" opacity="0.7"/>
                    <line x1="255" y1="150" x2="180" y2="200" stroke="#28A745" strokeWidth="2" opacity="0.7"/>
                    
                    {/* Ground stations */}
                    <circle cx="200" cy="180" r="4" fill="#28A745"/>
                    <circle cx="180" cy="200" r="4" fill="#28A745"/>
                    
                    {/* Labels */}
                    <text x="150" y="280" textAnchor="middle" fill="#FFFFFF" fontSize="12">Earth</text>
                    <text x="270" y="140" textAnchor="middle" fill="#FFFFFF" fontSize="10">AuraSAT</text>
                    <text x="150" y="100" textAnchor="middle" fill="#28A745" fontSize="10">LEO Orbit</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Goals & Future Potential
              </h2>
              <p className="text-lg text-muted-foreground">
                Building a foundation for sustainable connectivity
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Rocket className="w-5 h-5 mr-2 text-primary" />
                    Short-term Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">Complete prototype development and testing</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">Establish ground station infrastructure</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">Conduct field trials in selected remote areas</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">Validate weather data accuracy and reliability</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Long-term Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">Deploy constellation of satellites for wider coverage</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">Partner with government agencies for large-scale implementation</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">Expand to other developing regions globally</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">Create educational programs for satellite technology</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Implementation Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Phased rollout starting with pilot regions</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Partnership with local communities and authorities</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Continuous monitoring and improvement</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Scalable architecture for future expansion</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground flex items-center">
                      <Rocket className="w-5 h-5 mr-2 text-primary" />
                      Community Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Access to education and healthcare services</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Economic opportunities through digital connectivity</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Improved disaster preparedness and response</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Enhanced agricultural productivity</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}