"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Thermometer, 
  Wind, 
  Droplets, 
  Gauge, 
  Sun, 
  CloudRain, 
  CloudSnow,
  CloudLightning,
  RefreshCw,
  TrendingUp,
  MapPin,
  Activity
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  lastUpdated: string;
}

interface Location {
  id: string;
  name: string;
  region: string;
  elevation: string;
}

const locations: Location[] = [
  { id: "1", name: "Tawang", region: "Arunachal Pradesh", elevation: "2,669m" },
  { id: "2", name: "Leh", region: "Ladakh", elevation: "3,524m" },
  { id: "3", name: "Haflong", region: "Assam", elevation: "966m" },
  { id: "4", name: "Kavaratti", region: "Lakshadweep", elevation: "0m" },
  { id: "5", name: "Port Blair", region: "Andaman", elevation: "0m" },
  { id: "6", name: "Keylong", region: "Himachal Pradesh", elevation: "3,080m" }
];

const generateMockWeatherData = (locationId: string): WeatherData => {
  const baseTemp = locationId === "2" || locationId === "6" ? 5 : 25; // Colder for mountain regions
  const baseHumidity = locationId === "4" || locationId === "5" ? 80 : 60; // More humid for islands
  
  return {
    temperature: baseTemp + Math.random() * 10 - 5,
    humidity: baseHumidity + Math.random() * 20 - 10,
    windSpeed: Math.random() * 30 + 5,
    rainfall: Math.random() * 50,
    pressure: 1013 + Math.random() * 20 - 10,
    visibility: Math.random() * 5 + 5,
    uvIndex: Math.random() * 10,
    lastUpdated: new Date().toISOString()
  };
};

const generateChartData = () => {
  const labels = [];
  const tempData = [];
  const humidityData = [];
  const pressureData = [];
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date();
    time.setHours(time.getHours() - i);
    labels.push(time.getHours() + ':00');
    tempData.push(20 + Math.random() * 15);
    humidityData.push(50 + Math.random() * 30);
    pressureData.push(1010 + Math.random() * 10);
  }
  
  return { labels, tempData, humidityData, pressureData };
};

const getWeatherIcon = (temp: number, rainfall: number) => {
  if (rainfall > 30) return <CloudRain className="w-8 h-8 text-blue-400" />;
  if (rainfall > 10) return <Cloud className="w-8 h-8 text-gray-400" />;
  if (temp > 30) return <Sun className="w-8 h-8 text-yellow-400" />;
  if (temp < 10) return <CloudSnow className="w-8 h-8 text-blue-200" />;
  return <Cloud className="w-8 h-8 text-gray-400" />;
};

const getWeatherCondition = (temp: number, rainfall: number): string => {
  if (rainfall > 30) return "Heavy Rain";
  if (rainfall > 10) return "Light Rain";
  if (temp > 30) return "Hot & Sunny";
  if (temp < 10) return "Cold";
  return "Partly Cloudy";
};

export default function WeatherPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("1");
  const [weatherData, setWeatherData] = useState<WeatherData>(generateMockWeatherData("1"));
  const [chartData, setChartData] = useState(generateChartData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000); // Auto-refresh every 30 seconds

    return () => clearInterval(interval);
  }, [selectedLocation]);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setWeatherData(generateMockWeatherData(selectedLocation));
      setChartData(generateChartData());
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocation(locationId);
    setWeatherData(generateMockWeatherData(locationId));
    setChartData(generateChartData());
    setLastRefresh(new Date());
  };

  const currentLocation = locations.find(loc => loc.id === selectedLocation);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#FFFFFF'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const chartDataConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: chartData.tempData,
        borderColor: '#28A745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        tension: 0.4
      },
      {
        label: 'Humidity (%)',
        data: chartData.humidityData,
        borderColor: '#17A2B8',
        backgroundColor: 'rgba(23, 162, 184, 0.1)',
        tension: 0.4
      },
      {
        label: 'Pressure (hPa)',
        data: chartData.pressureData,
        borderColor: '#FFC107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary bg-primary/10">
              <Cloud className="w-4 h-4 mr-2" />
              Weather Data
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Real-Time Weather Monitoring
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Live weather data from AuraSAT satellites monitoring remote regions across India
            </p>
          </div>
        </div>
      </section>

      {/* Location Selector */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">Select Location:</span>
                </div>
                <Select value={selectedLocation} onValueChange={handleLocationChange}>
                  <SelectTrigger className="w-64 bg-input border-border">
                    <SelectValue placeholder="Choose location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}, {location.region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
                </div>
                <Button 
                  onClick={refreshData} 
                  disabled={isRefreshing}
                  className="bg-primary hover:bg-primary/90"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
              </div>
            </div>
            
            {currentLocation && (
              <div className="mt-4 text-center">
                <p className="text-muted-foreground">
                  Monitoring: {currentLocation.name}, {currentLocation.region} • Elevation: {currentLocation.elevation}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Weather Dashboard */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Current Weather Overview */}
            <Card className="bg-card border-border mb-8">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Cloud className="w-5 h-5 mr-2 text-primary" />
                  Current Weather Conditions
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Real-time data from AuraSAT satellite {currentLocation?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Weather Icon and Condition */}
                  <div className="text-center">
                    <div className="mb-4">
                      {getWeatherIcon(weatherData.temperature, weatherData.rainfall)}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {weatherData.temperature.toFixed(1)}°C
                    </h3>
                    <p className="text-muted-foreground">
                      {getWeatherCondition(weatherData.temperature, weatherData.rainfall)}
                    </p>
                  </div>

                  {/* Temperature */}
                  <Card className="bg-input border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground flex items-center">
                        <Thermometer className="w-4 h-4 mr-2 text-orange-400" />
                        Temperature
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-2xl font-bold text-foreground">
                        {weatherData.temperature.toFixed(1)}°C
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Feels like {(weatherData.temperature + 2).toFixed(1)}°C
                      </div>
                    </CardContent>
                  </Card>

                  {/* Humidity */}
                  <Card className="bg-input border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground flex items-center">
                        <Droplets className="w-4 h-4 mr-2 text-blue-400" />
                        Humidity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-2xl font-bold text-foreground">
                        {weatherData.humidity.toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {weatherData.humidity > 70 ? 'High' : weatherData.humidity > 40 ? 'Moderate' : 'Low'}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wind Speed */}
                  <Card className="bg-input border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground flex items-center">
                        <Wind className="w-4 h-4 mr-2 text-gray-400" />
                        Wind Speed
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-2xl font-bold text-foreground">
                        {weatherData.windSpeed.toFixed(1)} km/h
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {weatherData.windSpeed > 20 ? 'Strong' : weatherData.windSpeed > 10 ? 'Moderate' : 'Light'}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <CloudRain className="w-4 h-4 mr-2 text-blue-400" />
                    Rainfall
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {weatherData.rainfall.toFixed(1)} mm
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last 24 hours
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <Gauge className="w-4 h-4 mr-2 text-purple-400" />
                    Pressure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {weatherData.pressure.toFixed(0)} hPa
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {weatherData.pressure > 1013 ? 'High' : 'Low'}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-green-400" />
                    Visibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {weatherData.visibility.toFixed(1)} km
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {weatherData.visibility > 8 ? 'Excellent' : 'Good'}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <Sun className="w-4 h-4 mr-2 text-yellow-400" />
                    UV Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {weatherData.uvIndex.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {weatherData.uvIndex > 6 ? 'High' : weatherData.uvIndex > 3 ? 'Moderate' : 'Low'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weather Trends Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  24-Hour Weather Trends
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Temperature, humidity, and pressure trends over the last 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <Line options={chartOptions} data={chartDataConfig} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Benefits for Remote Communities
              </h2>
              <p className="text-lg text-muted-foreground">
                How AuraSAT weather data transforms lives in remote India
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Thermometer className="w-5 h-5 mr-2 text-orange-400" />
                    Agricultural Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Optimal planting and harvesting schedules based on weather patterns
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Early warning systems for extreme weather events
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Irrigation planning based on rainfall forecasts
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Wind className="w-5 h-5 mr-2 text-gray-400" />
                    Maritime Safety
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Real-time weather updates for fishing communities
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Storm warnings and high wind alerts
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Sea condition forecasts for safe navigation
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Cloud className="w-5 h-5 mr-2 text-blue-400" />
                    Disaster Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Early flood warnings for mountainous regions
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Cyclone tracking for coastal communities
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Landslide risk assessment based on rainfall data
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Sun className="w-5 h-5 mr-2 text-yellow-400" />
                    Health & Wellbeing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Heat wave warnings for vulnerable populations
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Air quality monitoring and alerts
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        UV index warnings for skin protection
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