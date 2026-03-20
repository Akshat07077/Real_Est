import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { propertiesTable, inquiriesTable, visitsTable, dealsTable } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const [properties, inquiries, visits, deals] = await Promise.all([
      db.select().from(propertiesTable),
      db.select().from(inquiriesTable).orderBy(desc(inquiriesTable.createdAt)).catch(() => []), 
      db.select().from(visitsTable).orderBy(desc(visitsTable.visitDate)).catch(() => []),
      db.select().from(dealsTable).catch(() => []),
    ]);

    const totalProperties = properties.length;
    const activeProperties = properties.filter((p) => p.status === "active").length;

    const totalInquiries = inquiries.length;
    const activeInquiries = inquiries.filter(
      (i) => i.status === "new" || i.status === "contacted"
    ).length;

    const scheduledVisits = visits.filter((v) => v.status === "scheduled").length;
    const completedVisits = visits.filter((v) => v.status === "completed").length;

    const totalDeals = deals.length;
    const closedDeals = deals.filter((d) => d.dealStage === "closed").length;

    const totalRevenue = deals
      .filter((d) => d.dealStage === "closed")
      .reduce((sum, d) => sum + (Number(d.commission) || 0), 0);

    return NextResponse.json({
      totalProperties,
      activeProperties,
      totalInquiries,
      activeInquiries,
      scheduledVisits,
      completedVisits,
      totalDeals,
      closedDeals,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    // Return empty stats if db fails or tables don't exist yet
    return NextResponse.json({
      totalProperties: 0,
      activeProperties: 0,
      totalInquiries: 0,
      activeInquiries: 0,
      scheduledVisits: 0,
      completedVisits: 0,
      totalDeals: 0,
      closedDeals: 0,
      totalRevenue: 0,
    });
  }
}
