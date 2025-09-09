"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Download, 
  Upload, 
  Activity, 
  Satellite, 
  Wifi, 
  RefreshCw,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  server: string;
  isp: string;
  testId: string;
}

interface TestPhase {
  phase: 'idle' | 'ping' | 'download' | 'upload' | 'complete';
  progress: number;
  currentSpeed?: number;
}

const generateMockSpeedTestResult = (): SpeedTestResult => {
  return {
    download: Math.random() * 80 + 20, // 20-100 Mbps
    upload: Math.random() * 40 + 10,   // 10-50 Mbps
    ping: Math.random() * 100 + 20,     // 20-120 ms
    jitter: Math.random() * 10 + 1,     // 1-11 ms
    server: "AuraSAT Ground Station - Delhi",
    isp: "AuraSAT Satellite Network",
    testId: `AST-${Date.now()}`
  };
};

const servers = [
  { id: "1", name: "AuraSAT Ground Station - Delhi", distance: "0 km" },
  { id: "2", name: "AuraSAT Ground Station - Mumbai", distance: "1200 km" },
  { id: "3", name: "AuraSAT Ground Station - Bangalore", distance: "1800 km" },
  { id: "4", name: "AuraSAT Ground Station - Kolkata", distance: "1400 km" }
];

export default function SpeedTestPage() {
  const [testPhase, setTestPhase] = useState<TestPhase>({ phase: 'idle', progress: 0 });
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [selectedServer, setSelectedServer] = useState("1");
  const [testHistory, setTestHistory] = useState<SpeedTestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  const runSpeedTest = async () => {
    setIsTesting(true);
    setTestPhase({ phase: 'idle', progress: 0 });
    setResult(null);

    // Ping test
    setTestPhase({ phase: 'ping', progress: 0 });
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setTestPhase({ phase: 'ping', progress: i });
    }

    // Download test
    setTestPhase({ phase: 'download', progress: 0 });
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 150));
      const currentSpeed = (i / 100) * (Math.random() * 80 + 20);
      setTestPhase({ phase: 'download', progress: i, currentSpeed });
    }

    // Upload test
    setTestPhase({ phase: 'upload', progress: 0 });
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 150));
      const currentSpeed = (i / 100) * (Math.random() * 40 + 10);
      setTestPhase({ phase: 'upload', progress: i, currentSpeed });
    }

    // Complete test
    setTestPhase({ phase: 'complete', progress: 100 });
    
    const newResult = generateMockSpeedTestResult();
    setResult(newResult);
    setTestHistory(prev => [newResult, ...prev.slice(0, 4)]);
    setIsTesting(false);
  };

  const getConnectionQuality = (speed: number): { label: string; color: string; icon: React.ReactNode } => {
    if (speed >= 50) return { 
      label: "Excellent", 
      color: "text-green-400", 
      icon: <CheckCircle className="w-4 h-4" /> 
    };
    if (speed >= 25) return { 
      label: "Good", 
      color: "text-blue-400", 
      icon: <CheckCircle className="w-4 h-4" /> 
    };
    if (speed >= 10) return { 
      label: "Fair", 
      color: "text-yellow-400", 
      icon: <AlertCircle className="w-4 h-4" /> 
    };
    return { 
      label: "Poor", 
      color: "text-orange-400", 
      icon: <AlertCircle className="w-4 h-4" /> 
    };
  };

  const formatSpeed = (speed: number): string => {
    if (speed >= 1000) return `${(speed / 1000).toFixed(1)} Gbps`;
    return `${speed.toFixed(1)} Mbps`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary bg-primary/10">
              <Zap className="w-4 h-4 mr-2" />
              Speed Test
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              AuraSAT Connection Test
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Test your simulated AuraSAT satellite connection speed and performance
            </p>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <InfoIcon className="w-5 h-5 mr-2 text-primary" />
                  How to Test Your AuraSAT Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Test Instructions</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Select your nearest AuraSAT ground station</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Click "Start Speed Test" to begin the test</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>The test will measure ping, download, and upload speeds</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Results will show simulated AuraSAT performance</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">What This Test Shows</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Simulated satellite internet speeds</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Expected latency for LEO satellite connections</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Performance compared to traditional internet</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Real-world usability for remote areas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Speed Test Interface */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Server Selection */}
            <Card className="bg-card border-border mb-8">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Satellite className="w-5 h-5 mr-2 text-primary" />
                  Select Test Server
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose the AuraSAT ground station for your speed test
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {servers.map((server) => (
                    <div
                      key={server.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-primary/10 ${
                        selectedServer === server.id
                          ? "border-primary bg-primary/10"
                          : "border-border"
                      }`}
                      onClick={() => setSelectedServer(server.id)}
                    >
                      <div className="text-center">
                        <Satellite className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium text-foreground text-sm">{server.name}</h3>
                        <p className="text-xs text-muted-foreground">{server.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Speed Test Main Interface */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Wifi className="w-5 h-5 mr-2 text-primary" />
                  AuraSAT Speed Test
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Test your simulated satellite connection speed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  {/* Test Status */}
                  <div className="mb-8">
                    {testPhase.phase === 'idle' && (
                      <div className="space-y-4">
                        <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                          <Zap className="w-16 h-16 text-primary" />
                        </div>
                        <p className="text-muted-foreground">Ready to test your AuraSAT connection</p>
                      </div>
                    )}

                    {testPhase.phase !== 'idle' && testPhase.phase !== 'complete' && (
                      <div className="space-y-4">
                        <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                          <RefreshCw className="w-16 h-16 text-primary animate-spin" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-foreground capitalize">
                            {testPhase.phase} Test
                          </p>
                          {testPhase.currentSpeed && (
                            <p className="text-2xl font-bold text-primary">
                              {formatSpeed(testPhase.currentSpeed)}
                            </p>
                          )}
                        </div>
                        <Progress value={testPhase.progress} className="w-64 mx-auto" />
                      </div>
                    )}

                    {testPhase.phase === 'complete' && result && (
                      <div className="space-y-6">
                        <div className="w-32 h-32 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-16 h-16 text-green-400" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-foreground">Test Complete!</p>
                          <p className="text-sm text-muted-foreground">Test ID: {result.testId}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Start Test Button */}
                  <div className="mb-8">
                    <Button
                      onClick={runSpeedTest}
                      disabled={isTesting}
                      className="bg-primary hover:bg-primary/90 px-8 py-3"
                    >
                      {isTesting ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Start Speed Test
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Results */}
                  {result && (
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                          <Download className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold text-foreground">
                          {formatSpeed(result.download)}
                        </div>
                        <div className="text-sm text-muted-foreground">Download</div>
                        <Badge variant="secondary" className="mt-2">
                          {getConnectionQuality(result.download).label}
                        </Badge>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                          <Upload className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-foreground">
                          {formatSpeed(result.upload)}
                        </div>
                        <div className="text-sm text-muted-foreground">Upload</div>
                        <Badge variant="secondary" className="mt-2">
                          {getConnectionQuality(result.upload).label}
                        </Badge>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                          <Activity className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold text-foreground">
                          {result.ping.toFixed(0)} ms
                        </div>
                        <div className="text-sm text-muted-foreground">Ping</div>
                        <Badge variant="secondary" className="mt-2">
                          {result.ping < 50 ? "Excellent" : result.ping < 100 ? "Good" : "Fair"}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Additional Details */}
                  {result && (
                    <div className="bg-input rounded-lg p-6 text-left">
                      <h3 className="font-semibold text-foreground mb-4">Test Details</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">Server:</span>
                            <span className="text-foreground">{result.server}</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">ISP:</span>
                            <span className="text-foreground">{result.isp}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">Jitter:</span>
                            <span className="text-foreground">{result.jitter.toFixed(1)} ms</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">Test Time:</span>
                            <span className="text-foreground">{new Date().toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Test History */}
            {testHistory.length > 0 && (
              <Card className="bg-card border-border mt-8">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Recent Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testHistory.map((test, index) => (
                      <div key={test.testId} className="flex items-center justify-between p-4 bg-input rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground">
                            Test #{testHistory.length - index}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <span className="text-muted-foreground">↓</span>
                              <span className="text-foreground ml-1">{formatSpeed(test.download)}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">↑</span>
                              <span className="text-foreground ml-1">{formatSpeed(test.upload)}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Ping:</span>
                              <span className="text-foreground ml-1">{test.ping.toFixed(0)}ms</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-primary text-primary">
                          {getConnectionQuality(Math.min(test.download, test.upload)).label}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                How AuraSAT Improves Connectivity
              </h2>
              <p className="text-lg text-muted-foreground">
                Understanding the benefits of LEO satellite technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Performance Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Low Latency:</strong> LEO satellites provide 20-50ms latency vs 600ms for traditional satellites
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>High Speed:</strong> Capable of delivering 50-100 Mbps to remote areas
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Reliable Connection:</strong> Redundant satellite network ensures uptime
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Global Coverage:</strong> Can reach the most remote locations
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Satellite className="w-5 h-5 mr-2 text-primary" />
                    Real-World Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Education:</strong> Enables online learning and digital classrooms
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Healthcare:</strong> Supports telemedicine and remote consultations
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Business:</strong> Enables e-commerce and digital entrepreneurship
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        <strong>Communication:</strong> Connects families and communities globally
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-card border-border rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Simulated vs Real Performance</h3>
                <p className="text-muted-foreground mb-6">
                  This speed test demonstrates the expected performance of AuraSAT's LEO satellite network. 
                  Real-world performance may vary based on weather conditions, equipment quality, 
                  and network congestion. The prototype aims to deliver consistent, high-speed internet 
                  to areas that have never had reliable connectivity before.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">20-50ms</div>
                    <div className="text-sm text-muted-foreground">Latency</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">50-100 Mbps</div>
                    <div className="text-sm text-muted-foreground">Download Speed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Info icon component
function InfoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}