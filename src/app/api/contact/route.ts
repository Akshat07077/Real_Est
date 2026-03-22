import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pool } from "@/lib/db";

// Ensure inquiries table exists and store the submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, requirement, budget, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Create table if it doesn't exist (lightweight, no migration needed)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        requirement TEXT,
        budget TEXT,
        message TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(
      `INSERT INTO inquiries (name, phone, email, requirement, budget, message)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, phone, email || null, requirement || null, budget || null, message || null]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
