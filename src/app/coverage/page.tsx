"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Wifi, AlertTriangle, Satellite } from "lucide-react";

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

// Handle Leaflet CSS import only on client side
if (typeof window !== 'undefined') {
  import("leaflet/dist/leaflet.css");
}

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "planned" | "active" | "testing";
  population: string;
  description: string;
  challenges: string[];
}

const locations: Location[] = [
  {
    id: "1",
    name: "Tawang, Arunachal Pradesh",
    lat: 27.5883,
    lng: 91.8689,
    status: "planned",
    population: "20,000",
    description: "Remote mountainous region near the Chinese border",
    challenges: ["High altitude", "Difficult terrain", "Extreme weather"]
  },
  {
    id: "2",
    name: "Leh, Ladakh",
    lat: 34.1526,
    lng: 77.5770,
    status: "testing",
    population: "30,000",
    description: "High-altitude desert region in the Himalayas",
    challenges: ["Low oxygen", "Cold climate", "Limited infrastructure"]
  },
  {
    id: "3",
    name: "Haflong, Assam",
    lat: 25.1833,
    lng: 93.0167,
    status: "planned",
    population: "45,000",
    description: "Hilly region in Northeast India",
    challenges: ["Hilly terrain", "Heavy rainfall", "Limited connectivity"]
  },
  {
    id: "4",
    name: "Kavaratti, Lakshadweep",
    lat: 10.5667,
    lng: 72.6333,
    status: "active",
    population: "10,000",
    description: "Island territory in the Arabian Sea",
    challenges: ["Island location", "Salt water corrosion", "Logistical challenges"]
  },
  {
    id: "5",
    name: "Port Blair, Andaman",
    lat: 11.6234,
    lng: 92.7265,
    status: "active",
    population: "150,000",
    description: "Island capital in the Bay of Bengal",
    challenges: ["Island location", "Tropical climate", "Distance from mainland"]
  },
  {
    id: "6",
    name: "Keylong, Himachal Pradesh",
    lat: 32.5776,
    lng: 77.0333,
    status: "testing",
    population: "3,000",
    description: "High-altitude town in the Himalayas",
    challenges: ["Mountainous terrain", "Heavy snowfall", "Limited access"]
  }
];

const getStatusColor = (status: Location["status"]) => {
  switch (status) {
    case "active": return "bg-green-500";
    case "testing": return "bg-yellow-500";
    case "planned": return "bg-blue-500";
    default: return "bg-gray-500";
  }
};

const getStatusText = (status: Location["status"]) => {
  switch (status) {
    case "active": return "Active";
    case "testing": return "Testing";
    case "planned": return "Planned";
    default: return "Unknown";
  }
};

export default function CoveragePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Center of India
  const [mapZoom, setMapZoom] = useState(5);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
      
      if (filtered.length > 0) {
        setMapCenter([filtered[0].lat, filtered[0].lng]);
        setMapZoom(8);
      }
    } else {
      setFilteredLocations(locations);
      setMapCenter([20.5937, 78.9629]);
      setMapZoom(5);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Only import Leaflet and set up markers on client side
    if (typeof window !== 'undefined') {
      import("leaflet").then(L => {
        // Fix for default markers in React Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
        setIsMapReady(true);
      });
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setMapZoom(10);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary bg-primary/10">
              <MapPin className="w-4 h-4 mr-2" />
              Coverage Map
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              AuraSAT Coverage Areas
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our planned and active coverage areas across India's remote regions
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for a location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Satellite className="w-5 h-5 mr-2 text-primary" />
                    Coverage Areas
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {filteredLocations.length} locations found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-primary/10 ${
                          selectedLocation?.id === location.id
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                        onClick={() => handleLocationClick(location)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-foreground">{location.name}</h3>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(location.status)} text-white text-xs`}
                          >
                            {getStatusText(location.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {location.description}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>Population: {location.population}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="bg-card border-border mt-6">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Active Coverage</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Testing Phase</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Planned Coverage</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="lg:col-span-3">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Interactive Coverage Map</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Click on markers to view location details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 rounded-lg overflow-hidden">
                    {isMapReady ? (
                      <MapContainer
                        center={mapCenter}
                        zoom={mapZoom}
                        style={{ height: "100%", width: "100%" }}
                        className="dark-map"
                      >
                      <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      />
                      
                      {locations.map((location) => (
                        <div key={location.id}>
                          <Marker position={[location.lat, location.lng]}>
                            <Popup>
                              <div className="text-foreground">
                                <h3 className="font-bold">{location.name}</h3>
                                <p className="text-sm mb-2">{location.description}</p>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge
                                    variant="secondary"
                                    className={`${getStatusColor(location.status)} text-white text-xs`}
                                  >
                                    {getStatusText(location.status)}
                                  </Badge>
                                  <span className="text-xs">Population: {location.population}</span>
                                </div>
                                <div className="text-xs">
                                  <div className="font-medium mb-1">Challenges:</div>
                                  <ul className="list-disc list-inside">
                                    {location.challenges.map((challenge, index) => (
                                      <li key={index}>{challenge}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                          
                          {/* Coverage circle */}
                          <Circle
                            center={[location.lat, location.lng]}
                            radius={location.status === "active" ? 50000 : location.status === "testing" ? 30000 : 20000}
                            color={location.status === "active" ? "#28A745" : location.status === "testing" ? "#FFC107" : "#007BFF"}
                            fillColor={location.status === "active" ? "#28A745" : location.status === "testing" ? "#FFC107" : "#007BFF"}
                            fillOpacity={0.2}
                          />
                        </div>
                      ))}
                    </MapContainer>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-muted">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-muted-foreground">Loading map...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Selected Location Details */}
              {selectedLocation && (
                <Card className="bg-card border-border mt-6">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      {selectedLocation.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Detailed coverage information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Coverage Status</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge
                              variant="secondary"
                              className={`${getStatusColor(selectedLocation.status)} text-white`}
                            >
                              {getStatusText(selectedLocation.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Population:</span>
                            <span className="text-foreground">{selectedLocation.population}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Signal Strength:</span>
                            <span className="text-foreground">
                              {selectedLocation.status === "active" ? "Excellent" : 
                               selectedLocation.status === "testing" ? "Good" : "Planned"}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Challenges</h4>
                        <div className="space-y-2">
                          {selectedLocation.challenges.map((challenge, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-muted-foreground">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-3">Technical Notes</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>
                          <strong>Line of Sight:</strong> Mountainous terrain may require additional ground stations for optimal coverage.
                        </p>
                        <p>
                          <strong>Weather Impact:</strong> Heavy monsoon rains and extreme weather conditions may affect signal quality.
                        </p>
                        <p>
                          <strong>Infrastructure:</strong> Limited local infrastructure may require backup power solutions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Coverage Challenges
              </h2>
              <p className="text-lg text-muted-foreground">
                Understanding the obstacles in providing satellite coverage to remote India
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                    Technical Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Mountainous Terrain:</strong> Himalayan regions create line-of-sight obstacles
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Extreme Weather:</strong> Heavy rainfall, snow, and storms affect signal quality
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Island Locations:</strong> Salt water corrosion and logistical difficulties
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Limited Infrastructure:</strong> Lack of power and ground station facilities
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Wifi className="w-5 h-5 mr-2 text-primary" />
                    Solutions & Innovations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Low Earth Orbit:</strong> Reduced latency and better signal penetration
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Mesh Networking:</strong> Satellite-to-satellite communication for coverage
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Adaptive Signal:</strong> Dynamic power adjustment for weather conditions
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Solar Power:</strong> Sustainable power solutions for remote ground stations
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}