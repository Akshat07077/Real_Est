import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { propertiesTable } from "@/lib/db/schema";
import { eq, like, gte, lte, and, type SQL } from "drizzle-orm";

function propertyToResponse(p: typeof propertiesTable.$inferSelect) {
  const imageUrls = (p.imageUrls as string[]) ?? [];
  const images = imageUrls.map((url, i) => ({
    id: String(i),
    url,
    alt: p.title,
    isPrimary: i === 0,
  }));
  return {
    id: String(p.id),
    title: p.title,
    description: p.description ?? undefined,
    price: Number(p.price),
    type: p.type,
    propertyType: p.propertyType,
    status: p.status,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: Number(p.area),
    location: p.location,
    address: p.address ?? undefined,
    city: p.city ?? undefined,
    country: p.country ?? undefined,
    latitude: p.latitude ? Number(p.latitude) : null,
    longitude: p.longitude ? Number(p.longitude) : null,
    amenities: (p.amenities as string[]) ?? [],
    images,
    agentName: p.agentName ?? null,
    agentPhone: p.agentPhone ?? null,
    agentEmail: p.agentEmail ?? null,
    featured: p.featured,
    possessionStatus: p.possessionStatus ?? null,
    possessionDate: p.possessionDate ? p.possessionDate.toISOString() : null,
    facing: p.facing ?? null,
    vastuCompliant: p.vastuCompliant ?? null,
    nearbyMetro: p.nearbyMetro ?? null,
    nearbySchool: p.nearbySchool ?? null,
    nearbyHospital: p.nearbyHospital ?? null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // In a real app we would validate with zod
    const [newProperty] = await db
      .insert(propertiesTable)
      .values({
        ...body,
        price: String(body.price),
        area: String(body.area),
        bedrooms: Number(body.bedrooms),
        bathrooms: Number(body.bathrooms),
        imageUrls: body.images ? body.images.split(",").map((s: string) => s.trim()) : [],
        amenities: body.amenities ? body.amenities.split(",").map((s: string) => s.trim()) : [],
      })
      .returning();

    return NextResponse.json(propertyToResponse(newProperty), { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const propertyType = searchParams.get("propertyType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "12";

    const conditions: SQL[] = [];

    if (location) {
      conditions.push(like(propertiesTable.location, `%${location}%`));
    }
    if (type) {
      conditions.push(eq(propertiesTable.type, type));
    }
    if (propertyType) {
      conditions.push(eq(propertiesTable.propertyType, propertyType));
    }
    if (status) {
      conditions.push(eq(propertiesTable.status, status));
    }
    if (minPrice) {
      conditions.push(gte(propertiesTable.price, minPrice));
    }
    if (maxPrice) {
      conditions.push(lte(propertiesTable.price, maxPrice));
    }
    if (bedrooms) {
      conditions.push(eq(propertiesTable.bedrooms, parseInt(bedrooms)));
    }
    if (bathrooms) {
      conditions.push(eq(propertiesTable.bathrooms, parseInt(bathrooms)));
    }
    if (featured === "true") {
      conditions.push(eq(propertiesTable.featured, true));
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [allProps, allCount] = await Promise.all([
      db
        .select()
        .from(propertiesTable)
        .where(where)
        .limit(limitNum)
        .offset(offset),
      db.select().from(propertiesTable).where(where),
    ]);

    const total = allCount.length;
    const totalPages = Math.ceil(total / limitNum);

    return NextResponse.json({
      properties: allProps.map(propertyToResponse),
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
