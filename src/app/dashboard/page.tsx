"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { Building, Users, Calendar, DollarSign, TrendingUp, Loader2 } from "lucide-react";

interface DashboardData {
  totalProperties: number;
  activeProperties: number;
  totalInquiries: number;
  activeInquiries: number;
  scheduledVisits: number;
  completedVisits: number;
  totalDeals: number;
  closedDeals: number;
  totalRevenue: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const stats = [
    {
      title: "Total Properties",
      value: data?.totalProperties || 0,
      icon: Building,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Inquiries",
      value: data?.activeInquiries || 0,
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Scheduled Visits",
      value: data?.scheduledVisits || 0,
      icon: Calendar,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Total Revenue",
      value: `₹${(data?.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
          Overview
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Welcome back. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <TrendingUp
                  size={20}
                  className="text-muted-foreground/40"
                />
              </div>
              <h3 className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-foreground mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
