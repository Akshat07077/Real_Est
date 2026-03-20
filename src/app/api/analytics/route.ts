import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { propertiesTable } from "@/lib/db/schema";

export async function GET() {
  try {
    const properties = await db.select().from(propertiesTable);

    const totalProperties = properties.length;
    const activeProperties = properties.filter((p) => p.status === "active").length;

    return NextResponse.json({
      totalProperties,
      activeProperties,
      totalInquiries: 0,
      activeInquiries: 0,
      scheduledVisits: 0,
      completedVisits: 0,
      totalDeals: 0,
      closedDeals: 0,
      totalRevenue: 0,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
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
