import { db } from "@/lib/db";
import { propertiesTable } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { PropertyCard } from "@/components/PropertyCard";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, Home as HomeIcon, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "LuxeEstate — Discover Your Dream Home",
  description: "Explore the most exclusive luxury properties in prime locations. Elevate your lifestyle with LuxeEstate.",
};

export const revalidate = 60; // Revalidate every minute

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

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button size="lg" className="h-14 px-8 text-base rounded-xl bg-accent text-white hover:bg-accent/90">
                  <Search className="mr-2" size={20} /> Explore Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60">
                  Contact Us <ArrowRight className="ml-2" size={18} />
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

      <Footer />
    </div>
  );
}
