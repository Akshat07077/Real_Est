import { db } from "@/lib/db";
import { propertiesTable } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { PropertyCard } from "@/components/PropertyCard";
import { HeroSearch } from "@/components/HeroSearch";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, Home as HomeIcon, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "LuxeEstate — Discover Your Dream Home",
  description: "Explore the most exclusive luxury properties in prime locations. Elevate your lifestyle with LuxeEstate.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  type PropertyRow = typeof propertiesTable.$inferSelect;
  let featuredProperties: PropertyRow[] = [];
  try {
    featuredProperties = await db
      .select()
      .from(propertiesTable)
      .where(eq(propertiesTable.featured, true))
      .orderBy(desc(propertiesTable.createdAt))
      .limit(3);
  } catch (error) {
    console.error("Failed to fetch featured properties:", error);
  }

  // Format properties to match the component props expectation
  const formattedProperties = featuredProperties.map(p => {
      const imageUrls = (p.imageUrls as string[]) ?? [];
      const images = imageUrls.map((url, i) => ({
        id: String(i),
        url,
        alt: p.title,
        isPrimary: i === 0,
      }));
      return {
        id: String(p.id),
        title: p.title,
        description: p.description ?? undefined,
        price: Number(p.price),
        type: p.type,
        propertyType: p.propertyType,
        status: p.status,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: Number(p.area),
        location: p.location,
        address: p.address ?? undefined,
        city: p.city ?? undefined,
        country: p.country ?? undefined,
        latitude: p.latitude ? Number(p.latitude) : null,
        longitude: p.longitude ? Number(p.longitude) : null,
        amenities: (p.amenities as string[]) ?? [],
        images,
        agentName: p.agentName ?? null,
        agentPhone: p.agentPhone ?? null,
        agentEmail: p.agentEmail ?? null,
        featured: p.featured,
        possessionStatus: p.possessionStatus ?? null,
        possessionDate: p.possessionDate ? p.possessionDate.toISOString() : null,
        facing: p.facing ?? null,
        vastuCompliant: p.vastuCompliant ?? null,
        nearbyMetro: p.nearbyMetro ?? null,
        nearbySchool: p.nearbySchool ?? null,
        nearbyHospital: p.nearbyHospital ?? null,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">
              Discover Your <br />
              <span className="text-accent">Dream Home</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-lg">
              Explore the most exclusive luxury properties in prime locations. Elevate your lifestyle with LuxeEstate.
            </p>

            <HeroSearch />

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 px-6 text-sm rounded-xl border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60">
                  Contact Us <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Residences Showcase */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">Featured Residences</h2>
              <p className="text-muted-foreground text-lg">Handpicked luxury properties that define modern living.</p>
            </div>
            <Link href="/properties" className="group flex items-center gap-2 text-foreground font-semibold hover:text-accent transition-colors">
              View All Properties <ArrowRight size={20} className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {formattedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {formattedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 opacity-50 pointer-events-none">
              <div className="h-96 bg-muted rounded-2xl animate-pulse"></div>
              <div className="h-96 bg-muted rounded-2xl animate-pulse hidden md:block"></div>
              <div className="h-96 bg-muted rounded-2xl animate-pulse hidden xl:block"></div>
             </div>
          )}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12">Why Choose LuxeEstate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Curated Selection</h3>
              <p className="text-muted-foreground">Every property is thoroughly vetted to ensure it meets our strict luxury standards.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HomeIcon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Agents</h3>
              <p className="text-muted-foreground">Our brokers are industry leaders with deep local market knowledge.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Prime Locations</h3>
              <p className="text-muted-foreground">Access to off-market listings in the most desirable neighborhoods globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Thousands of happy families found their dream home through LuxeEstate Indore.
            </p>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5 text-accent fill-accent" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
              <span className="ml-2 text-sm font-semibold text-foreground">4.9 / 5</span>
              <span className="ml-1 text-sm text-muted-foreground">(200+ reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul & Neha Gupta",
                location: "Vijay Nagar, Indore",
                initials: "RG",
                color: "bg-blue-500",
                rating: 5,
                text: "LuxeEstate made our home buying journey completely stress-free. Rajesh bhai was always available, explained every detail patiently, and helped us get the best deal on our 3 BHK. Highly recommended!",
                property: "3 BHK in Super Corridor",
              },
              {
                name: "Sunita Agarwal",
                location: "Palasia, Indore",
                initials: "SA",
                color: "bg-purple-500",
                rating: 5,
                text: "मैंने LuxeEstate से अपना फ्लैट किराए पर लिया। Priya ji ने बहुत अच्छी सर्विस दी। सब कुछ transparent था और कोई hidden charges नहीं थे। बहुत अच्छा अनुभव रहा।",
                property: "2 BHK Rental in Palasia",
              },
              {
                name: "Vikram Malhotra",
                location: "AB Road, Indore",
                initials: "VM",
                color: "bg-emerald-500",
                rating: 5,
                text: "Invested in a commercial property through LuxeEstate. Amit Verma gave excellent market insights and the ROI has been fantastic. Their knowledge of Indore's real estate market is unmatched.",
                property: "Commercial Space, Sarafa",
              },
              {
                name: "Pooja & Deepak Sharma",
                location: "Scheme 78, Indore",
                initials: "PS",
                color: "bg-rose-500",
                rating: 5,
                text: "We were first-time home buyers and were quite nervous. The team at LuxeEstate held our hand through the entire process — from site visits to registration. Couldn't have asked for better support.",
                property: "2 BHK in Bypass Road Township",
              },
              {
                name: "Ankit Jain",
                location: "Nipania, Indore",
                initials: "AJ",
                color: "bg-amber-500",
                rating: 4,
                text: "Got a great builder floor in Nipania at a very competitive price. The vastu consultation they arranged was a bonus. Quick documentation and smooth handover. Will definitely use them again.",
                property: "3 BHK Builder Floor, Nipania",
              },
              {
                name: "Meera Tiwari",
                location: "Mhow Road, Indore",
                initials: "MT",
                color: "bg-teal-500",
                rating: 5,
                text: "Bought a farmhouse through LuxeEstate and the experience was exceptional. They arranged multiple site visits, negotiated well on our behalf, and the post-sale support has been wonderful too.",
                property: "Farmhouse, Mhow Road",
              },
            ].map((review) => (
              <div key={review.name} className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted fill-muted'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
                <div className="text-xs text-accent font-medium">{review.property}</div>
                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  <div className={`w-9 h-9 rounded-full ${review.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
