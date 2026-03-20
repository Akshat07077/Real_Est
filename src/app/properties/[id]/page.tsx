import { db } from "@/lib/db";
import { propertiesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { formatINR, formatBHK } from "@/lib/formatINR";
import { Bed, Bath, Square, MapPin, Phone, Mail, User, CheckCircle } from "lucide-react";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [property] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, parseInt(id)));

  if (!property) notFound();

  const imageUrls = (property.imageUrls as string[]) ?? [];
  const amenities = (property.amenities as string[]) ?? [];
  const primaryImage =
    imageUrls[0] || `https://picsum.photos/seed/${property.id}/1200/600`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 flex gap-2">
          <Badge className="bg-accent text-white text-sm px-3 py-1">
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </Badge>
          {property.featured && (
            <Badge variant="secondary" className="bg-white/90 text-foreground text-sm px-3 py-1">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {property.title}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                <MapPin size={16} className="text-accent" />
                {property.address ? `${property.address}, ` : ""}{property.location}
              </p>
              <div className="mt-4 text-3xl font-bold text-accent">
                {formatINR(Number(property.price), property.type === "rent")}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-card rounded-2xl border border-border/50">
              <div className="text-center">
                <Bed size={24} className="mx-auto text-muted-foreground mb-2" />
                <div className="font-bold text-lg">{formatBHK(property.bedrooms)}</div>
                <div className="text-sm text-muted-foreground">Bedrooms</div>
              </div>
              <div className="text-center border-x border-border/50">
                <Bath size={24} className="mx-auto text-muted-foreground mb-2" />
                <div className="font-bold text-lg">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Bathrooms</div>
              </div>
              <div className="text-center">
                <Square size={24} className="mx-auto text-muted-foreground mb-2" />
                <div className="font-bold text-lg">{property.area} sqft</div>
                <div className="text-sm text-muted-foreground">Area</div>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="text-xl font-bold mb-3">About this property</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle size={16} className="text-accent shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby */}
            {(property.nearbyMetro || property.nearbySchool || property.nearbyHospital) && (
              <div>
                <h2 className="text-xl font-bold mb-4">Nearby</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {property.nearbyMetro && <p>🚇 Metro: {property.nearbyMetro}</p>}
                  {property.nearbySchool && <p>🏫 School: {property.nearbySchool}</p>}
                  {property.nearbyHospital && <p>🏥 Hospital: {property.nearbyHospital}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Agent Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm sticky top-28 space-y-5">
              <h2 className="text-lg font-bold">Contact Agent</h2>
              {property.agentName && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{property.agentName}</div>
                    <div className="text-sm text-muted-foreground">Listing Agent</div>
                  </div>
                </div>
              )}
              {property.agentPhone && (
                <a
                  href={`tel:${property.agentPhone}`}
                  className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors"
                >
                  <Phone size={16} className="text-accent" />
                  {property.agentPhone}
                </a>
              )}
              {property.agentEmail && (
                <a
                  href={`mailto:${property.agentEmail}`}
                  className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors"
                >
                  <Mail size={16} className="text-accent" />
                  {property.agentEmail}
                </a>
              )}
              <div className="pt-2 space-y-2">
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Property Type</span>
                  <span className="font-medium text-foreground capitalize">{property.propertyType}</span>
                </div>
                {property.possessionStatus && (
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>Possession</span>
                    <span className="font-medium text-foreground capitalize">
                      {property.possessionStatus.replace(/_/g, " ")}
                    </span>
                  </div>
                )}
                {property.facing && (
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>Facing</span>
                    <span className="font-medium text-foreground">{property.facing}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {imageUrls.length > 1 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imageUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${property.title} - ${i + 1}`}
                  className="rounded-xl object-cover aspect-video w-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
