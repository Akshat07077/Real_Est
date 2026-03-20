import { db } from "@/lib/db";
import { propertiesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { formatINR, formatBHK } from "@/lib/formatINR";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  CheckCircle,
  Train,
  School,
  Hospital,
  Compass,
  Home,
  Star,
} from "lucide-react";
import { PropertyDetailClient } from "./PropertyDetailClient";

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
  const allImages =
    imageUrls.length > 0
      ? imageUrls
      : [`https://picsum.photos/seed/${property.id}/1200/600`];

  const price = Number(property.price);

  // Key highlights derived from property data
  const highlights = [
    property.propertyType && {
      icon: "Home",
      label: "Property Type",
      value: property.propertyType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    },
    property.facing && {
      icon: "Compass",
      label: "Facing",
      value: property.facing,
    },
    property.vastuCompliant && {
      icon: "Star",
      label: "Vastu",
      value: "Compliant",
    },
    property.possessionStatus && {
      icon: "CheckCircle",
      label: "Possession",
      value: property.possessionStatus
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    },
    property.city && { icon: "MapPin", label: "City", value: property.city },
    property.country && {
      icon: "MapPin",
      label: "Country",
      value: property.country,
    },
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  const nearby = [
    property.nearbyMetro && {
      icon: "Train",
      label: "Metro / Transit",
      value: property.nearbyMetro,
    },
    property.nearbySchool && {
      icon: "School",
      label: "School",
      value: property.nearbySchool,
    },
    property.nearbyHospital && {
      icon: "Hospital",
      label: "Hospital",
      value: property.nearbyHospital,
    },
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Image Gallery */}
      <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-black">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
          <Badge className="bg-accent text-white text-sm px-3 py-1.5 shadow-lg">
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </Badge>
          {property.featured && (
            <Badge className="bg-white/90 text-foreground text-sm px-3 py-1.5 shadow-lg">
              ⭐ Featured
            </Badge>
          )}
          {property.possessionStatus === "ready_to_move" && (
            <Badge className="bg-green-500 text-white text-sm px-3 py-1.5 shadow-lg">
              Ready to Move
            </Badge>
          )}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            {property.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-white/80 text-sm">
            <MapPin size={15} />
            {property.address ? `${property.address}, ` : ""}
            {property.location}
          </p>
        </div>

        {/* Thumbnail strip */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-6 flex gap-2">
            {allImages.slice(0, 4).map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="w-16 h-12 object-cover rounded-lg border-2 border-white/50 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── LEFT / MAIN ── */}
          <div className="lg:col-span-2 space-y-10">
            {/* Price + quick stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-4xl font-bold text-foreground">
                  {formatINR(price, property.type === "rent")}
                </div>
                {property.possessionStatus && (
                  <span
                    className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${
                      property.possessionStatus === "ready_to_move"
                        ? "bg-green-100 text-green-700"
                        : property.possessionStatus === "under_construction"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {property.possessionStatus
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                )}
              </div>
            </div>

            {/* BHK / Bath / Area bar */}
            <div className="grid grid-cols-3 divide-x divide-border/50 bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              <div className="flex flex-col items-center py-5 gap-1">
                <Bed size={22} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  BHK
                </span>
                <span className="font-bold text-lg">
                  {formatBHK(property.bedrooms)}
                </span>
              </div>
              <div className="flex flex-col items-center py-5 gap-1">
                <Bath size={22} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Bathrooms
                </span>
                <span className="font-bold text-lg">{property.bathrooms}</span>
              </div>
              <div className="flex flex-col items-center py-5 gap-1">
                <Square size={22} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Area
                </span>
                <span className="font-bold text-lg">{property.area} sqft</span>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            {/* Key Highlights */}
            {highlights.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Key Highlights</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {highlights.map((h) => (
                    <div
                      key={h.label}
                      className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        {h.icon === "Home" && (
                          <Home size={16} className="text-accent" />
                        )}
                        {h.icon === "Compass" && (
                          <Compass size={16} className="text-accent" />
                        )}
                        {h.icon === "Star" && (
                          <Star size={16} className="text-accent" />
                        )}
                        {h.icon === "CheckCircle" && (
                          <CheckCircle size={16} className="text-accent" />
                        )}
                        {h.icon === "MapPin" && (
                          <MapPin size={16} className="text-accent" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          {h.label}
                        </div>
                        <div className="font-semibold text-sm">{h.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 text-sm text-foreground bg-muted/40 rounded-lg px-3 py-2"
                    >
                      <CheckCircle size={15} className="text-accent shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby */}
            {nearby.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Nearby</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {nearby.map((n) => (
                    <div
                      key={n.label}
                      className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                        {n.icon === "Train" && (
                          <Train size={18} className="text-primary" />
                        )}
                        {n.icon === "School" && (
                          <School size={18} className="text-primary" />
                        )}
                        {n.icon === "Hospital" && (
                          <Hospital size={18} className="text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">
                          {n.label}
                        </div>
                        <div className="font-semibold text-sm">{n.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMI Calculator — only for sale properties */}
            {property.type === "sale" && <PropertyDetailClient price={price} />}
          </div>

          {/* ── RIGHT / SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm sticky top-28 space-y-5">
              {/* Price */}
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {formatINR(price, property.type === "rent")}
                </div>
                {property.possessionStatus === "ready_to_move" && (
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                    Ready to Move
                  </span>
                )}
              </div>

              {/* Agent */}
              {property.agentName && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {property.agentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {property.agentName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {property.agentPhone}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {property.agentEmail}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3 pt-1">
                <a
                  href={`https://wa.me/${(property.agentPhone ?? "").replace(/\D/g, "")}?text=Hi, I'm interested in ${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <a
                  href={`tel:${property.agentPhone}`}
                  className="flex items-center justify-center gap-2 w-full border border-border hover:bg-muted text-foreground font-semibold py-3 rounded-xl transition-colors"
                >
                  📞 Call Agent
                </a>
              </div>

              {/* Inquiry form */}
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
                  Send Inquiry
                </p>
                <textarea
                  readOnly
                  defaultValue="I am interested in this property and would like to schedule a viewing."
                  className="w-full text-sm bg-muted/50 rounded-xl p-3 resize-none border border-border/50 text-muted-foreground"
                  rows={3}
                />
                <a
                  href={`mailto:${property.agentEmail}?subject=Inquiry: ${property.title}&body=I am interested in this property and would like to schedule a viewing.`}
                  className="mt-3 flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-colors"
                >
                  Send Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full Gallery */}
        {allImages.length > 1 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allImages.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${property.title} - ${i + 1}`}
                  className="rounded-xl object-cover aspect-video w-full hover:opacity-90 transition-opacity cursor-pointer"
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
