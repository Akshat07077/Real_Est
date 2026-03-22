"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("location", query.trim());
    if (type) params.set("type", type);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-10 flex flex-col sm:flex-row gap-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl max-w-2xl"
    >
      {/* Type toggle */}
      <div className="flex border-b sm:border-b-0 sm:border-r border-white/20">
        {["", "sale", "rent"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`px-4 py-4 text-sm font-semibold transition-colors whitespace-nowrap ${
              type === t
                ? "bg-accent text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {t === "" ? "All" : t === "sale" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      {/* Location input */}
      <div className="flex-1 flex items-center px-4 gap-3">
        <Search size={18} className="text-white/50 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by location, area or project..."
          className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm py-4 focus:outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 text-sm transition-colors whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}
