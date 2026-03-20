import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us — LuxeEstate India",
  description: "Get in touch with LuxeEstate Indore. We're here to help you find your dream property in Madhya Pradesh.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: ["204, Scheme No. 54, Vijay Nagar", "Indore, Madhya Pradesh – 452010"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    lines: ["+91 98765 43210", "+91 73100 00001"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@luxeestate.in", "sales@luxeestate.in"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Sat: 10:00 AM – 7:00 PM", "Sunday: 11:00 AM – 4:00 PM"],
  },
];

const agents = [
  {
    name: "Rajesh Sharma",
    role: "Senior Property Consultant",
    phone: "+91 98765 43210",
    email: "rajesh@luxeestate.in",
    initials: "RS",
    color: "bg-blue-500",
  },
  {
    name: "Priya Malhotra",
    role: "Luxury Homes Specialist",
    phone: "+91 87654 32109",
    email: "priya@luxeestate.in",
    initials: "PM",
    color: "bg-purple-500",
  },
  {
    name: "Amit Verma",
    role: "Commercial & Investment",
    phone: "+91 76543 21098",
    email: "amit@luxeestate.in",
    initials: "AV",
    color: "bg-emerald-500",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            संपर्क करें
          </h1>
          <p className="text-white/70 text-lg">
            हम आपकी सपनों की प्रॉपर्टी ढूंढने में मदद करने के लिए यहाँ हैं।
          </p>
          <p className="text-white/50 text-sm mt-2">
            We&apos;re here to help you find your perfect property in Indore.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
            <p className="text-muted-foreground mb-8 text-sm">
              Fill in the form and our team will get back to you within 24 hours.
            </p>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Gupta"
                    className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Mobile Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 XXXXX"
                    className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">I&apos;m looking for</label>
                <select className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition">
                  <option value="">Select requirement</option>
                  <option value="buy">Buy a Property</option>
                  <option value="rent">Rent a Property</option>
                  <option value="sell">Sell my Property</option>
                  <option value="invest">Investment Advice</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Budget Range</label>
                <select className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition">
                  <option value="">Select budget</option>
                  <option>Under ₹25 Lakh</option>
                  <option>₹25 – ₹50 Lakh</option>
                  <option>₹50 Lakh – ₹1 Crore</option>
                  <option>₹1 Crore – ₹3 Crore</option>
                  <option>Above ₹3 Crore</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your requirements — location preference, BHK, possession timeline..."
                  className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} />
                Send Inquiry
              </button>
              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to be contacted by our team. We respect your privacy.
              </p>
            </form>
          </div>

          {/* Right side — info + agents */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-2xl border border-border/50 p-5 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                      {item.title}
                    </p>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm font-medium text-foreground leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi, I'm interested in a property at LuxeEstate Indore."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Our Agents */}
            <div>
              <h3 className="text-lg font-bold mb-4">Meet Our Agents</h3>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center gap-4 bg-card rounded-2xl border border-border/50 p-4"
                  >
                    <div className={`w-12 h-12 rounded-full ${agent.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {agent.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.role}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a
                        href={`tel:${agent.phone}`}
                        className="w-9 h-9 rounded-xl bg-primary/5 hover:bg-primary/10 flex items-center justify-center transition-colors"
                        title={agent.phone}
                      >
                        <Phone size={15} className="text-primary" />
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="w-9 h-9 rounded-xl bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors"
                        title={agent.email}
                      >
                        <Mail size={15} className="text-accent" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-border/50 h-64 bg-muted/30 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin size={32} className="mx-auto mb-2 text-accent" />
            <p className="font-medium">204, Scheme No. 54, Vijay Nagar, Indore – 452010</p>
            <a
              href="https://maps.google.com/?q=Vijay+Nagar+Indore+Madhya+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline mt-1 inline-block"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
