"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import type { PropertyListResponse, PropertyResponse } from "@/lib/types";

export default function DashboardProperties() {
  const [data, setData] = useState<PropertyListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "", price: "", location: "", type: "sale", propertyType: "apartment",
    bedrooms: "1", bathrooms: "1", area: "", address: "", images: "", amenities: ""
  });

  const fetchProperties = () => {
    setIsLoading(true);
    fetch("/api/properties?limit=100")
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure you want to delete this property?')) {
      try {
        await fetch(`/api/properties/${id}`, { method: 'DELETE' });
        fetchProperties();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setIsAddOpen(false);
      setFormData({
        title: "", price: "", location: "", type: "sale", propertyType: "apartment",
        bedrooms: "1", bathrooms: "1", area: "", address: "", images: "", amenities: ""
      });
      fetchProperties();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground mt-1">Manage your real estate listings.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="rounded-xl shadow-lg shadow-primary/20">
          <Plus className="mr-2" size={18}/> Add Property
        </Button>
      </div>

      {isAddOpen && (
        <div className="mb-8 bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Add New Property</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input name="title" value={formData.title} onChange={handleInputChange} required className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input name="location" value={formData.location} onChange={handleInputChange} required className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input name="price" type="number" value={formData.price} onChange={handleInputChange} required className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Area (sqft)</label>
                <Input name="area" type="number" value={formData.area} onChange={handleInputChange} required className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Bedrooms</label>
                  <Input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleInputChange} required className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Bathrooms</label>
                  <Input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleInputChange} required className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Listing Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mt-1">
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Image URLs (comma separated)</label>
                <Input name="images" value={formData.images} onChange={handleInputChange} className="mt-1" placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Save Property"}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Property</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></td></tr>
              ) : data?.properties?.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No properties found.</td></tr>
              ) : data?.properties?.map((prop: PropertyResponse) => (
                <tr key={prop.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                        <img src={prop.images?.[0]?.url || `https://picsum.photos/seed/${prop.id}/100/100`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{prop.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin size={10}/> {prop.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">₹{prop.price.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 capitalize">
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(prop.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
