import Link from "next/link";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                LUXE<span className="text-accent">ESTATE</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-primary-foreground/70">
              Indore की सबसे भरोसेमंद रियल एस्टेट कंपनी। प्रीमियम प्रॉपर्टी, बेहतरीन सेवा।
            </p>
            <p className="max-w-xs text-sm text-primary-foreground/70">
              Redefining luxury real estate in Madhya Pradesh with unparalleled service and exclusive listings.
            </p>
          </div>
          <div>
            <h3 className="font-display mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/properties" className="hover:text-accent transition-colors">Properties</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/login" className="hover:text-accent transition-colors">Broker Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>📍 204, Scheme No. 54, Vijay Nagar</li>
              <li>Indore, Madhya Pradesh – 452010</li>
              <li>📧 info@luxeestate.in</li>
              <li>📞 +91 98765 43210</li>
              <li>🕐 Mon–Sat: 10:00 AM – 7:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} LuxeEstate India. All rights reserved. | RERA Reg. No. MP/RERA/2024/001</p>
        </div>
      </div>
    </footer>
  );
}
