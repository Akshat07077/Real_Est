"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Loader2, Home, ArrowUpDown } from "lucide-react";
import type { PropertyResponse, PropertyListResponse } from "@/lib/types";

type SortKey = "newest" | "price_asc" | "price_desc" | "area_desc";

function sortProperties(props: PropertyResponse[], sort: SortKey): PropertyResponse[] {
  const arr = [...props];
  if (sort === "price_asc") return arr.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") return arr.sort((a, b) => b.price - a.price);
  if (sort === "area_desc") return arr.sort((a, b) => b.area - a.area);
  // newest — keep API order (already desc by createdAt)
  return arr;
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    possessionStatus: searchParams.get("possessionStatus") || "",
  });
  const [sort, setSort] = useState<SortKey>("newest");
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.location) params.set("location", filters.location);
      if (filters.type) params.set("type", filters.type);
      if (filters.propertyType) params.set("propertyType", filters.propertyType);
      if (filters.minPrice) params.set("minPrice", filters.minPrice);
      if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
      if (filters.bedrooms && filters.bedrooms !== "4+") params.set("bedrooms", filters.bedrooms);
      params.set("limit", "50");

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data: PropertyListResponse = await res.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const handleFilterChange = (key: string, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () => {
    setFilters({ location: "", type: "", propertyType: "", minPrice: "", maxPrice: "", bedrooms: "", possessionStatus: "" });
  };

  const filtered = properties.filter((p) => {
    if (filters.bedrooms === "4+" && p.bedrooms < 4) return false;
    if (filters.possessionStatus && p.possessionStatus !== filters.possessionStatus) return false;
    return true;
  });

  const sorted = sortProperties(filtered, sort);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="bg-primary py-16 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          Discover Properties
        </h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto">
          Browse our exclusive collection of luxury homes, apartments, and estates.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8 w-full">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-primary" /> Filters
              </h2>
              <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Clear All
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="City or neighborhood" className="pl-9 bg-muted/50 border-none"
                    value={filters.location} onChange={(e) => handleFilterChange("location", e.target.value)} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Listing Type</label>
                <Select value={filters.type} onValueChange={(v) => handleFilterChange("type", v === "any" ? "" : v)}>
                  <SelectTrigger className="bg-muted/50 border-none"><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Property Type</label>
                <Select value={filters.propertyType} onValueChange={(v) => handleFilterChange("propertyType", v === "any" ? "" : v)}>
                  <SelectTrigger className="bg-muted/50 border-none"><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="row_house">Row House</SelectItem>
                    <SelectItem value="builder_floor">Builder Floor</SelectItem>
                    <SelectItem value="farmhouse">Farmhouse</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">BHK</label>
                <Select value={filters.bedrooms} onValueChange={(v) => handleFilterChange("bedrooms", v === "any" ? "" : v)}>
                  <SelectTrigger className="bg-muted/50 border-none"><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1 BHK</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4 BHK</SelectItem>
                    <SelectItem value="4+">4+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Possession Status</label>
                <Select value={filters.possessionStatus} onValueChange={(v) => handleFilterChange("possessionStatus", v === "any" ? "" : v)}>
                  <SelectTrigger className="bg-muted/50 border-none"><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="ready_to_move">Ready to Move</SelectItem>
                    <SelectItem value="under_construction">Under Construction</SelectItem>
                    <SelectItem value="new_launch">New Launch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Price Range (₹)</label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="Min" className="bg-muted/50 border-none"
                    value={filters.minPrice} onChange={(e) => handleFilterChange("minPrice", e.target.value)} />
                  <span className="text-muted-foreground">–</span>
                  <Input type="number" placeholder="Max" className="bg-muted/50 border-none"
                    value={filters.maxPrice} onChange={(e) => handleFilterChange("maxPrice", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1">
          {/* Results bar with sort */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-muted-foreground text-sm">
              Showing <span className="font-semibold text-foreground">{sorted.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <ArrowUpDown size={15} className="text-muted-foreground" />
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-48 bg-card border-border/50 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="area_desc">Largest Area First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : sorted.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sorted.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-2xl border border-dashed border-border/60">
              <Home className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold text-foreground">No properties found</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                We couldn&apos;t find any properties matching your filters. Try adjusting your search.
              </p>
              <Button variant="outline" className="mt-6" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

