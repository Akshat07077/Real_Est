"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash2, MapPin, X, Pencil, Star, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { formatINR } from "@/lib/formatINR";
import Link from "next/link";
import type { PropertyListResponse, PropertyResponse } from "@/lib/types";

const emptyForm = {
  title: "", price: "", location: "", type: "sale",
  propertyType: "apartment", bedrooms: "1", bathrooms: "1",
  area: "", address: "", images: "", amenities: "",
  possessionStatus: "ready_to_move", featured: false,
};

type FormData = typeof emptyForm;

export default function DashboardProperties() {
  const [data, setData] = useState<PropertyListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  const fetchProperties = () => {
    setIsLoading(true);
    fetch("/api/properties?limit=100")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchProperties(); }, []);

  const openAdd = () => { setFormData(emptyForm); setEditingId(null); setModalMode("add"); };

  const openEdit = (prop: PropertyResponse) => {
    setFormData({
      title: prop.title,
      price: String(prop.price),
      location: prop.location,
      type: prop.type,
      propertyType: prop.propertyType,
      bedrooms: String(prop.bedrooms),
      bathrooms: String(prop.bathrooms),
      area: String(prop.area),
      address: prop.address || "",
      images: prop.images?.map((i) => i.url).join(", ") || "",
      amenities: prop.amenities?.join(", ") || "",
      possessionStatus: prop.possessionStatus || "ready_to_move",
      featured: prop.featured,
    });
    setEditingId(prop.id);
    setModalMode("edit");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await fetch(`/api/properties/${id}`, { method: "DELETE" });
    fetchProperties();
  };

  const toggleFeatured = async (prop: PropertyResponse) => {
    await fetch(`/api/properties/${prop.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !prop.featured }),
    });
    fetchProperties();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (modalMode === "edit" && editingId) {
        await fetch(`/api/properties/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setModalMode(null);
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
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {properties.length} listing{properties.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={openAdd} className="rounded-xl shadow-lg shadow-primary/20 w-full sm:w-auto">
          <Plus size={18} className="mr-2" /> Add Property
        </Button>
      </div>

      {/* Add / Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-card rounded-2xl border border-border/50 shadow-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-xl font-bold">{modalMode === "edit" ? "Edit Property" : "Add New Property"}</h2>
              <button onClick={() => setModalMode(null)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
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
                  <Input name="location" value={formData.location} onChange={set} required placeholder="e.g. Vijay Nagar, Indore" />
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
                    <option value="row_house">Row House</option>
                    <option value="builder_floor">Builder Floor</option>
                    <option value="farmhouse">Farmhouse</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Possession Status</label>
                  <select name="possessionStatus" value={formData.possessionStatus} onChange={set}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    <option value="ready_to_move">Ready to Move</option>
                    <option value="under_construction">Under Construction</option>
                    <option value="new_launch">New Launch</option>
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
                <div className="sm:col-span-2 flex items-center gap-3">
                  <input type="checkbox" id="featured" checked={formData.featured}
                    onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 accent-accent" />
                  <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                    Mark as Featured (shows on homepage)
                  </label>
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1 sm:flex-none" onClick={() => setModalMode(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none">
                  {isSubmitting ? <><Loader2 size={16} className="mr-2 animate-spin" />Saving...</> : modalMode === "edit" ? "Update Property" : "Save Property"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-2xl border border-dashed border-border/60">
          <p className="text-muted-foreground mt-3">No properties yet.</p>
          <Button className="mt-4" onClick={openAdd}><Plus size={16} className="mr-2" /> Add Property</Button>
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
                            <img src={prop.images?.[0]?.url || `https://picsum.photos/seed/${prop.id}/100/100`} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground line-clamp-1">{prop.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin size={10} /> {prop.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{prop.type === "sale" ? "For Sale" : "For Rent"}</td>
                      <td className="px-6 py-4 font-semibold">{formatINR(prop.price, prop.type === "rent")}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 capitalize">
                          {prop.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title={prop.featured ? "Unfeature" : "Feature"}
                            className={prop.featured ? "text-accent" : "text-muted-foreground hover:text-accent"}
                            onClick={() => toggleFeatured(prop)}>
                            <Star size={15} fill={prop.featured ? "currentColor" : "none"} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" onClick={() => openEdit(prop)}>
                            <Pencil size={15} />
                          </Button>
                          <Link href={`/properties/${prop.id}`} target="_blank">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                              <ExternalLink size={15} />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(prop.id)}>
                            <Trash2 size={15} />
                          </Button>
                        </div>
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
                  <img src={prop.images?.[0]?.url || `https://picsum.photos/seed/${prop.id}/100/100`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm line-clamp-1">{prop.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin size={10} /> {prop.location}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-sm font-bold">{formatINR(prop.price, prop.type === "rent")}</span>
                    {prop.featured && <span className="text-xs text-accent font-semibold">⭐ Featured</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" onClick={() => openEdit(prop)}>
                    <Pencil size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(prop.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

