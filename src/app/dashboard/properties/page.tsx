"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash2, MapPin, X } from "lucide-react";
import { useState, useEffect } from "react";
import { formatINR } from "@/lib/formatINR";
import type { PropertyListResponse, PropertyResponse } from "@/lib/types";

const emptyForm = {
  title: "", price: "", location: "", type: "sale",
  propertyType: "apartment", bedrooms: "1", bathrooms: "1",
  area: "", address: "", images: "", amenities: "",
};

export default function DashboardProperties() {
  const [data, setData] = useState<PropertyListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const fetchProperties = () => {
    setIsLoading(true);
    fetch("/api/properties?limit=100")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await fetch(`/api/properties/${id}`, { method: "DELETE" });
    fetchProperties();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsAddOpen(false);
      setFormData(emptyForm);
      fetchProperties();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const properties = data?.properties ?? [];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Properties
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {properties.length} listing{properties.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="rounded-xl shadow-lg shadow-primary/20 w-full sm:w-auto"
        >
          <Plus size={18} className="mr-2" /> Add Property
        </Button>
      </div>

      {/* Add Property Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-card rounded-2xl border border-border/50 shadow-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-xl font-bold">Add New Property</h2>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium block mb-1.5">Title *</label>
                  <Input name="title" value={formData.title} onChange={set} required placeholder="e.g. Luxury Sea View Apartment" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Location *</label>
                  <Input name="location" value={formData.location} onChange={set} required placeholder="e.g. Mumbai, Maharashtra" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Address</label>
                  <Input name="address" value={formData.address} onChange={set} placeholder="Street address" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Price (₹) *</label>
                  <Input name="price" type="number" value={formData.price} onChange={set} required placeholder="e.g. 5000000" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Area (sqft) *</label>
                  <Input name="area" type="number" value={formData.area} onChange={set} required placeholder="e.g. 1200" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Bedrooms</label>
                  <Input name="bedrooms" type="number" min="0" value={formData.bedrooms} onChange={set} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Bathrooms</label>
                  <Input name="bathrooms" type="number" min="0" value={formData.bathrooms} onChange={set} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Listing Type</label>
                  <select name="type" value={formData.type} onChange={set}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Property Type</label>
                  <select name="propertyType" value={formData.propertyType} onChange={set}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium block mb-1.5">Image URLs (comma separated)</label>
                  <Input name="images" value={formData.images} onChange={set}
                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium block mb-1.5">Amenities (comma separated)</label>
                  <Input name="amenities" value={formData.amenities} onChange={set}
                    placeholder="Swimming Pool, Gym, Parking" />
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1 sm:flex-none" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none">
                  {isSubmitting ? <><Loader2 size={16} className="mr-2 animate-spin" />Saving...</> : "Save Property"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Properties List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-2xl border border-dashed border-border/60">
          <Building2Icon />
          <p className="text-muted-foreground mt-3">No properties yet. Add your first listing.</p>
          <Button className="mt-4" onClick={() => setIsAddOpen(true)}>
            <Plus size={16} className="mr-2" /> Add Property
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 font-medium">Property</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {properties.map((prop: PropertyResponse) => (
                    <tr key={prop.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                            <img
                              src={prop.images?.[0]?.url || `https://picsum.photos/seed/${prop.id}/100/100`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-foreground line-clamp-1">{prop.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin size={10} /> {prop.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground capitalize">
                        {prop.type === "sale" ? "For Sale" : "For Rent"}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {formatINR(prop.price, prop.type === "rent")}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 capitalize">
                          {prop.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(prop.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {properties.map((prop: PropertyResponse) => (
              <div key={prop.id} className="bg-card rounded-2xl border border-border/50 p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden shrink-0">
                  <img
                    src={prop.images?.[0]?.url || `https://picsum.photos/seed/${prop.id}/100/100`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm line-clamp-1">{prop.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {prop.location}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-bold text-foreground">
                      {formatINR(prop.price, prop.type === "rent")}
                    </span>
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 capitalize">
                      {prop.status}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 shrink-0"
                  onClick={() => handleDelete(prop.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

function Building2Icon() {
  return (
    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
      </svg>
    </div>
  );
}
