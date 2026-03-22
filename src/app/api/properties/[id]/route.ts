import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { propertiesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.title !== undefined) updates.title = body.title;
    if (body.price !== undefined) updates.price = String(body.price);
    if (body.location !== undefined) updates.location = body.location;
    if (body.address !== undefined) updates.address = body.address;
    if (body.type !== undefined) updates.type = body.type;
    if (body.propertyType !== undefined) updates.propertyType = body.propertyType;
    if (body.bedrooms !== undefined) updates.bedrooms = Number(body.bedrooms);
    if (body.bathrooms !== undefined) updates.bathrooms = Number(body.bathrooms);
    if (body.area !== undefined) updates.area = String(body.area);
    if (body.featured !== undefined) updates.featured = Boolean(body.featured);
    if (body.status !== undefined) updates.status = body.status;
    if (body.possessionStatus !== undefined) updates.possessionStatus = body.possessionStatus;
    if (body.images !== undefined) {
      updates.imageUrls = typeof body.images === "string"
        ? body.images.split(",").map((s: string) => s.trim()).filter(Boolean)
        : body.images;
    }
    if (body.amenities !== undefined) {
      updates.amenities = typeof body.amenities === "string"
        ? body.amenities.split(",").map((s: string) => s.trim()).filter(Boolean)
        : body.amenities;
    }

    const [updated] = await db
      .update(propertiesTable)
      .set(updates)
      .where(eq(propertiesTable.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(propertiesTable).where(eq(propertiesTable.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
