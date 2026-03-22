"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", requirement: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", requirement: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold">Inquiry Received!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thank you, <span className="font-semibold text-foreground">{form.name || "there"}</span>! Our team will call you back within 24 hours.
        </p>
        <button onClick={() => setStatus("idle")} className="text-sm text-accent hover:underline mt-2">
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1.5">Full Name *</label>
          <input name="name" value={form.name} onChange={set} required
            placeholder="e.g. Rahul Gupta"
            className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Mobile Number *</label>
          <input name="phone" value={form.phone} onChange={set} required type="tel"
            placeholder="+91 98765 XXXXX"
            className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium block mb-1.5">Email Address</label>
        <input name="email" value={form.email} onChange={set} type="email"
          placeholder="rahul@example.com"
          className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition" />
      </div>
      <div>
        <label className="text-sm font-medium block mb-1.5">I&apos;m looking for</label>
        <select name="requirement" value={form.requirement} onChange={set}
          className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition">
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
        <select name="budget" value={form.budget} onChange={set}
          className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition">
          <option value="">Select budget</option>
          <option value="under_25l">Under ₹25 Lakh</option>
          <option value="25l_50l">₹25 – ₹50 Lakh</option>
          <option value="50l_1cr">₹50 Lakh – ₹1 Crore</option>
          <option value="1cr_3cr">₹1 Crore – ₹3 Crore</option>
          <option value="above_3cr">Above ₹3 Crore</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium block mb-1.5">Message</label>
        <textarea name="message" value={form.message} onChange={set} rows={4}
          placeholder="Tell us about your requirements — location preference, BHK, possession timeline..."
          className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition resize-none" />
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>
      )}
      <button type="submit" disabled={status === "loading"}
        className="w-full h-12 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Sending...</>
          : <><MessageSquare size={18} /> Send Inquiry</>}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to be contacted by our team. We respect your privacy.
      </p>
    </form>
  );
}
