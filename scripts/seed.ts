import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { propertiesTable } from "../src/lib/db/schema";

const DATABASE_URL =
  "postgresql://neondb_owner:npg_0e5bkoSYVEpP@ep-falling-cloud-adhb7imn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle(pool);

const properties = [
  {
    title: "Luxury Beachfront Villa",
    description: "Stunning beachfront villa with panoramic ocean views, private pool, and direct beach access. Perfect for those seeking the ultimate coastal lifestyle.",
    price: "2850000",
    type: "sale",
    propertyType: "villa",
    status: "active",
    bedrooms: 5,
    bathrooms: 4,
    area: "420",
    location: "Malibu, CA",
    address: "123 Pacific Coast Hwy",
    city: "Malibu",
    country: "USA",
    amenities: ["Swimming Pool", "Private Beach", "Home Theater", "Smart Home", "Garage"],
    imageUrls: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    agentName: "Sarah Johnson",
    agentPhone: "+1-310-555-0101",
    agentEmail: "sarah@luxeestate.com",
    featured: true,
    possessionStatus: "ready_to_move",
    facing: "West",
    vastuCompliant: false,
    nearbyMetro: "PCH Bus Stop",
    nearbySchool: "Malibu High School",
    nearbyHospital: "UCLA Medical Center",
  },
  {
    title: "Modern Downtown Apartment",
    description: "Sleek and stylish apartment in the heart of Manhattan. Floor-to-ceiling windows with breathtaking city skyline views.",
    price: "3500",
    type: "rent",
    propertyType: "apartment",
    status: "active",
    bedrooms: 2,
    bathrooms: 2,
    area: "95",
    location: "New York, NY",
    address: "456 5th Avenue, Unit 32B",
    city: "New York",
    country: "USA",
    amenities: ["Gym", "Concierge", "Rooftop Terrace", "In-unit Laundry", "Doorman"],
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    agentName: "Michael Chen",
    agentPhone: "+1-212-555-0202",
    agentEmail: "michael@luxeestate.com",
    featured: true,
    possessionStatus: "ready_to_move",
    facing: "South",
    vastuCompliant: false,
    nearbyMetro: "5th Ave / 53rd St",
    nearbySchool: "PS 59",
    nearbyHospital: "Lenox Hill Hospital",
  },
  {
    title: "Charming Victorian Family Home",
    description: "Beautifully restored Victorian home in a prestigious neighborhood. Original architectural details blended with modern amenities.",
    price: "1250000",
    type: "sale",
    propertyType: "house",
    status: "active",
    bedrooms: 4,
    bathrooms: 3,
    area: "280",
    location: "San Francisco, CA",
    address: "789 Painted Ladies Row",
    city: "San Francisco",
    country: "USA",
    amenities: ["Garden", "Fireplace", "Wine Cellar", "Hardwood Floors", "Bay Windows"],
    imageUrls: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    agentName: "Emily Rodriguez",
    agentPhone: "+1-415-555-0303",
    agentEmail: "emily@luxeestate.com",
    featured: true,
    possessionStatus: "ready_to_move",
    facing: "East",
    vastuCompliant: false,
    nearbyMetro: "Castro Station",
    nearbySchool: "Eureka Valley Elementary",
    nearbyHospital: "UCSF Medical Center",
  },
  {
    title: "Penthouse Sky Suite",
    description: "Exclusive penthouse with 360-degree city views, private rooftop terrace, and bespoke interiors designed by award-winning architects.",
    price: "8500000",
    type: "sale",
    propertyType: "apartment",
    status: "active",
    bedrooms: 4,
    bathrooms: 5,
    area: "520",
    location: "Miami, FL",
    address: "1 Brickell City Centre, PH",
    city: "Miami",
    country: "USA",
    amenities: ["Private Rooftop", "Infinity Pool", "Private Elevator", "Smart Home", "Wine Room"],
    imageUrls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    agentName: "David Kim",
    agentPhone: "+1-305-555-0404",
    agentEmail: "david@luxeestate.com",
    featured: true,
    possessionStatus: "ready_to_move",
    facing: "North",
    vastuCompliant: false,
    nearbyMetro: "Brickell Station",
    nearbySchool: "Brickell Academy",
    nearbyHospital: "Brickell Medical Center",
  },
  {
    title: "Serene Mountain Retreat",
    description: "Breathtaking mountain chalet with ski-in/ski-out access, stone fireplace, and panoramic alpine views. A true four-season escape.",
    price: "3200000",
    type: "sale",
    propertyType: "villa",
    status: "active",
    bedrooms: 6,
    bathrooms: 5,
    area: "650",
    location: "Aspen, CO",
    address: "42 Snowmass Ridge",
    city: "Aspen",
    country: "USA",
    amenities: ["Ski-in/Ski-out", "Hot Tub", "Sauna", "Game Room", "Heated Driveway"],
    imageUrls: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    ],
    agentName: "Jessica Park",
    agentPhone: "+1-970-555-0505",
    agentEmail: "jessica@luxeestate.com",
    featured: false,
    possessionStatus: "ready_to_move",
    facing: "South",
    vastuCompliant: false,
    nearbyMetro: "Aspen Airport Shuttle",
    nearbySchool: "Aspen Country Day School",
    nearbyHospital: "Aspen Valley Hospital",
  },
  {
    title: "Contemporary Loft Studio",
    description: "Industrial-chic loft in a converted warehouse. Exposed brick, soaring ceilings, and an open-plan layout perfect for creatives.",
    price: "2800",
    type: "rent",
    propertyType: "apartment",
    status: "active",
    bedrooms: 1,
    bathrooms: 1,
    area: "75",
    location: "Brooklyn, NY",
    address: "88 Williamsburg Lofts",
    city: "Brooklyn",
    country: "USA",
    amenities: ["Exposed Brick", "High Ceilings", "Pet Friendly", "Bike Storage", "Rooftop Access"],
    imageUrls: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    ],
    agentName: "Alex Turner",
    agentPhone: "+1-718-555-0606",
    agentEmail: "alex@luxeestate.com",
    featured: false,
    possessionStatus: "ready_to_move",
    facing: "West",
    vastuCompliant: false,
    nearbyMetro: "Bedford Ave L Train",
    nearbySchool: "PS 84",
    nearbyHospital: "Woodhull Medical Center",
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  // Create table if it doesn't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS properties (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      price NUMERIC(12, 2) NOT NULL,
      type TEXT NOT NULL DEFAULT 'sale',
      property_type TEXT NOT NULL DEFAULT 'apartment',
      status TEXT NOT NULL DEFAULT 'active',
      bedrooms INTEGER NOT NULL DEFAULT 0,
      bathrooms INTEGER NOT NULL DEFAULT 0,
      area NUMERIC(10, 2) NOT NULL DEFAULT 0,
      location TEXT NOT NULL,
      address TEXT,
      city TEXT,
      country TEXT,
      latitude NUMERIC(10, 7),
      longitude NUMERIC(10, 7),
      amenities JSONB DEFAULT '[]',
      image_urls JSONB DEFAULT '[]',
      agent_name TEXT,
      agent_phone TEXT,
      agent_email TEXT,
      featured BOOLEAN NOT NULL DEFAULT false,
      possession_status TEXT DEFAULT 'ready_to_move',
      possession_date TIMESTAMP,
      facing TEXT,
      vastu_compliant BOOLEAN NOT NULL DEFAULT false,
      nearby_metro TEXT,
      nearby_school TEXT,
      nearby_hospital TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  console.log("✅ Table ready");

  // Clear existing data
  await db.delete(propertiesTable);
  console.log("🗑️  Cleared existing properties");

  for (const property of properties) {
    await db.insert(propertiesTable).values(property as any);
    console.log(`✅ Inserted: ${property.title}`);
  }

  console.log(`\n🎉 Done! Seeded ${properties.length} properties.`);
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
