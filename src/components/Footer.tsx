import Link from "next/link";
import { Satellite, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Satellite className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">AuraSAT</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Connecting India's remotest areas with internet and weather insights through innovative LEO satellite technology.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@aurasat.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 123 456 7890</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="text-muted-foreground hover:text-primary transition-colors">
                  Coverage Map
                </Link>
              </li>
              <li>
                <Link href="/weather" className="text-muted-foreground hover:text-primary transition-colors">
                  Weather Data
                </Link>
              </li>
              <li>
                <Link href="/speedtest" className="text-muted-foreground hover:text-primary transition-colors">
                  Speed Test
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* College Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">College Project</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Engineering College</span>
              </div>
              <p className="text-xs">
                A student-led initiative focused on bringing connectivity to remote India through satellite technology.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 AuraSAT College Project. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}