import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { propertiesTable } from "../src/lib/db/schema";

const DATABASE_URL =
  "postgresql://neondb_owner:npg_0e5bkoSYVEpP@ep-falling-cloud-adhb7imn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle(pool);

const properties = [
  // ── FEATURED 3 (shown on homepage) ──
  {
    title: "Luxury Villa with Private Pool",
    description:
      "Stunning 5 BHK villa in the heart of Vijay Nagar with a private swimming pool, landscaped garden, and premium Italian marble flooring. Perfect for families seeking the finest lifestyle in Indore.",
    price: "28500000",
    type: "sale",
    propertyType: "villa",
    status: "active",
    bedrooms: 5,
    bathrooms: 4,
    area: "4200",
    location: "Vijay Nagar, Indore",
    address: "12, Scheme No. 54, Vijay Nagar",
    city: "Indore",
    country: "India",
    amenities: [
      "Swimming Pool",
      "Modular Kitchen",
      "Home Theatre",
      "Smart Home",
      "3-Car Garage",
      "Solar Panels",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    agentName: "Rajesh Sharma",
    agentPhone: "+91 98765 43210",
    agentEmail: "rajesh@luxeestate.in",
    featured: true,
    possessionStatus: "ready_to_move",
    facing: "East",
    vastuCompliant: true,
    nearbyMetro: "Vijay Nagar Bus Rapid Transit",
    nearbySchool: "Delhi Public School, Indore",
    nearbyHospital: "Bombay Hospital, Indore",
  },
  {
    title: "Modern 2 BHK Flat for Rent",
    description:
      "Beautifully furnished 2 BHK apartment in a premium gated society in Palasia. Floor-to-ceiling windows, modular kitchen, and 24/7 security. Ideal for working professionals and small families.",
    price: "25000",
    type: "rent",
    propertyType: "apartment",
    status: "active",
    bedrooms: 2,
    bathrooms: 2,
    area: "1100",
    location: "indore, Plasaia"    
    address: "Flat 8B, Shalimar Township, Palasia",
    city: "Indore",
    country: "India",
    amenities: [
      "Gym",
      "24/7 Security",
      "Power Backup",
      "Covered Parking",
      "Club House",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    agentName: "Priya Malhotra",
    agentPhone: "+91 87654 32109",
    agentEmail: "priya@luxeestate.in",
    featured: true,
    possessionStatus: "ready_to_move",
    facing: "North",
    vastuCompliant: true,
    nearbyMetro: "Palasia Square Bus Stop",
    nearbySchool: "Choithram School, Manik Bagh",
    nearbyHospital: "Choithram Hospital",
  },
  {
    title: "Premium 4 BHK Row House",
    description:
      "Elegant row house in the prestigious Super Corridor area. Spacious rooms, private terrace, and a beautifully designed interior. Close to IT parks and top schools.",
    price: "12500000",
    type: "sale",
    propertyType: "row_house",
    status: "active",
    bedrooms: 4,
    bathrooms: 3,
    area: "2800",
    location: "Super Corridor, Indore",
    address: "Plot 22, Anand Vihar Colony, Super Corridor",
    city: "Indore",
    country: "India",
    amenities: [
      "Private Terrace",
      "Modular Kitchen",
      "Vastu Compliant",
      "Covered Parking",
      "Garden",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    agentName: "Amit Verma",
    agentPhone: "+91 76543 21098",
    agentEmail: "amit@luxeestate.in",
    featured: true,
    possessionStatus: "ready_to_move",
    facing: "North-East",
    vastuCompliant: true,
    nearbyMetro: "Super Corridor BRTS",
    nearbySchool: "Emerald Heights International School",
    nearbyHospital: "Medanta Hospital, Indore",
    nearyHospital: "tehre are many hospital"

  },

  // ── ADDITIONAL INDIAN PROPERTIES ──
  {
    title: "3 BHK Penthouse with City View",
    description:
      "Exclusive top-floor penthouse in AB Road with panoramic views of Indore city. Private terrace, premium fittings, and a dedicated servant quarter. A rare find in the heart of the city.",
    price: "18500000",
    type: "sale",
    propertyType: "penthouse",
    status: "active",
    bedrooms: 3,
    bathrooms: 3,
    area: "3200",
    location: "AB Road, Indore",
    address: "Penthouse, Prestige Tower, AB Road",
    city: "Indore",
    country: "India",
    amenities: [
      "Private Terrace",
      "Infinity Pool",
      "Private Elevator",
      "Smart Home",
      "Servant Quarter",
      "2-Car Parking",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    agentName: "Sunita Patidar",
    agentPhone: "+91 99001 12345",
    agentEmail: "sunita@luxeestate.in",
    featured: false,
    possessionStatus: "ready_to_move",
    facing: "West",
    vastuCompliant: false,
    nearbyMetro: "Rajwada Bus Stop",
    nearbySchool: "St. Raphael's Higher Secondary School",
    nearbyHospital: "CHL Hospital, AB Road",
  },
  {
    title: "Affordable 1 BHK Studio Flat",
    description:
      "Compact and well-designed 1 BHK studio apartment in Scheme 78. Ideal for bachelors and young professionals. Fully furnished with all modern amenities and excellent connectivity.",
    price: "12000",
    type: "rent",
    propertyType: "apartment",
    status: "active",
    bedrooms: 1,
    bathrooms: 1,
    area: "650",
    location: "Scheme 78, Indore",
    address: "Flat 3A, Shree Residency, Scheme 78",
    city: "Indore",
    country: "India",
    amenities: [
      "Fully Furnished",
      "WiFi Ready",
      "Power Backup",
      "CCTV Security",
      "Lift",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    ],
    agentName: "Deepak Joshi",
    agentPhone: "+91 88001 56789",
    agentEmail: "deepak@luxeestate.in",
    featured: false,
    possessionStatus: "ready_to_move",
    facing: "South",
    vastuCompliant: true,
    nearbyMetro: "Scheme 78 BRTS Stop",
    nearbySchool: "Kendriya Vidyalaya, Scheme 78",
    nearbyHospital: "Vishesh Jupiter Hospital",
  },
  {
    title: "Spacious 3 BHK Builder Floor",
    description:
      "Independent builder floor in the sought-after Nipania area. Separate entrance, large balconies, and a private terrace. Excellent for families wanting privacy with community living.",
    price: "7500000",
    type: "sale",
    propertyType: "builder_floor",
    status: "active",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800",
    location: "Nipania, Indore",
    address: "Plot 45, Shivam Nagar, Nipania",
    city: "Indore",
    country: "India",
    amenities: [
      "Private Entrance",
      "Large Balcony",
      "Terrace",
      "Parking",
      "Vastu Compliant",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    ],
    agentName: "Kavita Rathore",
    agentPhone: "+91 77001 98765",
    agentEmail: "kavita@luxeestate.in",
    featured: false,
    possessionStatus: "ready_to_move",
    facing: "East",
    vastuCompliant: true,
    nearbyMetro: "Nipania Square Bus Stop",
    nearbySchool: "The Shishukunj International School",
    nearbyHospital: "Apollo Hospitals, Indore",
  },
  {
    title: "New Launch: 2 BHK in Gated Township",
    description:
      "Brand new 2 BHK apartments in a fully integrated township near Bypass Road. World-class amenities including clubhouse, swimming pool, and landscaped gardens. Pre-launch prices available.",
    price: "4800000",
    type: "sale",
    propertyType: "apartment",
    status: "active",
    
    bedrooms: 2,
    bathrooms: 2,
    area: "1050",
    location: "Bypass Road, Indore",
    address: "Omaxe City, Bypass Road, Indore",
    city: "Indore",
    country: "India",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Jogging Track",
      "Kids Play Area",
      "24/7 Security",
      "Rainwater Harvesting",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    ],
    agentName: "Rajesh Sharma",
    agentPhone: "+91 98765 43210",
    agentEmail: "rajesh@luxeestate.in",
    featured: false,
    possessionStatus: "new_launch",
    facing: "North",
    vastuCompliant: true,
    nearbyMetro: "Bypass Road BRTS",
    nearbySchool: "Indore Public School",
    nearbyHospital: "Bombay Hospital, Indore",
  },
  {
    title: "Commercial Shop in Prime Location",
    description:
      "Ground floor commercial space in the bustling Sarafa Bazaar area. High footfall, excellent visibility, and ideal for retail, showroom, or office use. Immediate possession available.",
    price: "9500000",
    type: "sale",
    propertyType: "commercial",
    status: "active",
    bedrooms: 0,
    bathrooms: 1,
    area: "800",
    location: "Sarafa Bazaar, Indore",
    address: "Shop No. 12, Sarafa Plaza, Sarafa Bazaar",
    city: "Indore",
    country: "India",
    amenities: [
      "Ground Floor",
      "High Footfall Area",
      "Parking Available",
      "Power Backup",
      "CCTV",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
    agentName: "Amit Verma",
    agentPhone: "+91 76543 21098",
    agentEmail: "amit@luxeestate.in",
    featured: false,
    possessionStatus: "ready_to_move",
    facing: "South",
    vastuCompliant: false,
    nearbyMetro: "Rajwada Chowk",
    nearbySchool: "N/A",
    nearbyHospital: "MY Hospital, Indore",
  },
  {
    title: "Farmhouse with 1 Acre Land",
    description:
      "Sprawling farmhouse on 1 acre of lush land on the outskirts of Indore near Mhow. Perfect weekend getaway or investment property. Includes a 4 BHK bungalow, fruit orchard, and open lawn.",
    price: "35000000",
    type: "sale",
    propertyType: "farmhouse",
    status: "active",
    bedrooms: 4,
    bathrooms: 3,
    area: "5000",
    location: "Mhow Road, Indore",
    address: "Survey No. 112, Mhow Road, Near Indore",
    city: "Indore",
    country: "India",
    amenities: [
      "1 Acre Land",
      "Fruit Orchard",
      "Open Lawn",
      "Borewell",
      "Caretaker Quarter",
      "Boundary Wall",
    ],
    imageUrls: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
    ],
    agentName: "Priya Malhotra",
    agentPhone: "+91 87654 32109",
    agentEmail: "priya@luxeestate.in",
    featured: false,
    possessionStatus: "ready_to_move",
    facing: "East",
    vastuCompliant: true,
    nearbyMetro: "Mhow Bus Stand",
    nearbySchool: "Military School, Mhow",
    nearbyHospital: "Military Hospital, Mhow",
  },
];

async function seed() {
  console.log("🌱 Seeding database with Indian properties...");

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

  await db.delete(propertiesTable);
  console.log("🗑️  Cleared existing properties");

  for (const property of properties) {
    await db.insert(propertiesTable).values(property as never);
    console.log(`✅ Inserted: ${property.title}`);
  }

  console.log(`\n🎉 Done! Seeded ${properties.length} Indian properties.`);
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
