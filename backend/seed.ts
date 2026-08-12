import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import { Restaurant } from "./models/restaurant.model.js";
import { Booking } from "./models/bookings.model.js";

const MONGODB_URI = process.env.MONGODB_URI || "";

const seedData = async () => {
  try {
    console.log("Connecting to Database for seeding...");

    await mongoose.connect(MONGODB_URI);
    console.log("Database connected. Clearing existing collections...");

    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Booking.deleteMany({});

    console.log("Creating default users...");

    const salt = await bcrypt.genSalt(10);

    const adminPassword = await bcrypt.hash("Ali@1122", salt);
    const userPassword = await bcrypt.hash("user123", salt);
    const ownerPassword = await bcrypt.hash("owner123", salt);

    // Admin
    const adminUser = await User.create({
      name: "Admin",
      email: "admin@quickdine.com",
      password: adminPassword,
      phone: "+923001234567",
      role: "admin",
    });

    // User
    const testUser = await User.create({
      name: "Sarah Jenkins",
      email: "user@example.com",
      password: userPassword,
      phone: "+01234567788",
      role: "user",
    });

    // Owner
    const ownerUser = await User.create({
      name: "Marc Dubios",
      email: "owner@example.com",
      password: ownerPassword,
      phone: "+01234567788",
      role: "owner",
    });

    console.log("Creating restaurants...");

    const restaurants = [
      {
        name: "Monal Restaurant",
        slug: "monal-restaurant",
        description:
          "An iconic dining destination offering Pakistani and continental cuisine with panoramic views and an elegant dining atmosphere.",
        cuisine: "Pakistani",
        priceRange: "$$$",
        rating: 4.6,
        reviewCount: 3250,
        location: "Islamabad, Pakistan",
        address: "Pir Sohawa Road, Islamabad, Pakistan",
        image:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Muhammad Ali",
        tags: ["Pakistani", "Hill View", "Fine Dining", "Family"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: true,
        exclusive: true,
      },

      {
        name: "Kolachi Restaurant",
        slug: "kolachi-restaurant",
        description:
          "A sophisticated Karachi dining destination with a beautiful seaside atmosphere, elegant outdoor seating and traditional Pakistani cuisine.",
        cuisine: "Pakistani",
        priceRange: "$$$",
        rating: 4.7,
        reviewCount: 4100,
        location: "Karachi, Pakistan",
        address: "Do Darya, DHA Phase 8, Karachi, Pakistan",
        image:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Ahmed Khan",
        tags: ["Pakistani", "Sea View", "Outdoor Dining", "Family"],
        availableSlots: [
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
        ],
        featured: true,
        exclusive: false,
      },

      {
        name: "Butt Karahi",
        slug: "butt-karahi",
        description:
          "A classic Lahore restaurant known for its lively traditional dining atmosphere and authentic Punjabi cuisine.",
        cuisine: "Punjabi",
        priceRange: "$$",
        rating: 4.6,
        reviewCount: 2900,
        location: "Lahore, Pakistan",
        address: "Lakshmi Chowk, Lahore, Pakistan",
        image:
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Imran Butt",
        tags: ["Punjabi", "Traditional", "Family", "Casual Dining"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: true,
        exclusive: false,
      },

      {
        name: "Andaaz Restaurant",
        slug: "andaaz-restaurant",
        description:
          "An elegant rooftop restaurant in Lahore featuring traditional architecture, heritage surroundings and a sophisticated Pakistani dining experience.",
        cuisine: "Pakistani",
        priceRange: "$$$",
        rating: 4.5,
        reviewCount: 1800,
        location: "Lahore, Pakistan",
        address: "Fort Road Food Street, Lahore, Pakistan",
        image:
          "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Hassan Raza",
        tags: ["Pakistani", "Rooftop", "Heritage", "Fine Dining"],
        availableSlots: ["13:00", "14:00", "18:00", "19:00", "20:00", "21:00"],
        featured: true,
        exclusive: true,
      },

      {
        name: "Haveli Restaurant",
        slug: "haveli-restaurant",
        description:
          "A traditional Lahore dining venue featuring Mughal-inspired architecture, rooftop seating and stunning views of the historic city.",
        cuisine: "Pakistani",
        priceRange: "$$$",
        rating: 4.5,
        reviewCount: 2400,
        location: "Lahore, Pakistan",
        address: "Fort Road Food Street, Lahore, Pakistan",
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Usman Tariq",
        tags: ["Traditional", "Rooftop", "Heritage", "Pakistani"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: true,
        exclusive: false,
      },

      {
        name: "Savour Foods",
        slug: "savour-foods",
        description:
          "A popular Pakistani dining restaurant with a casual, welcoming atmosphere and spacious seating for families and groups.",
        cuisine: "Pakistani",
        priceRange: "$$",
        rating: 4.4,
        reviewCount: 3600,
        location: "Islamabad, Pakistan",
        address: "Blue Area, Islamabad, Pakistan",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Asif Malik",
        tags: ["Pakistani", "Casual", "Family", "Affordable"],
        availableSlots: ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00"],
        featured: false,
        exclusive: false,
      },

      {
        name: "Khyber Restaurant",
        slug: "khyber-restaurant",
        description:
          "A traditional Peshawari dining destination featuring warm interiors, wooden details and an authentic Pashtun atmosphere.",
        cuisine: "Pashtun",
        priceRange: "$$",
        rating: 4.5,
        reviewCount: 1750,
        location: "Peshawar, Pakistan",
        address: "University Road, Peshawar, Pakistan",
        image:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Rahim Khan",
        tags: ["Pashtun", "Traditional", "Peshawari", "Family"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: false,
        exclusive: false,
      },

      {
        name: "Namak Mandi",
        slug: "namak-mandi",
        description:
          "A traditional Peshawari restaurant with a rustic atmosphere, comfortable seating and an authentic Pashtun dining environment.",
        cuisine: "Peshawari",
        priceRange: "$$",
        rating: 4.6,
        reviewCount: 2100,
        location: "Peshawar, Pakistan",
        address: "Namak Mandi, Peshawar, Pakistan",
        image:
          "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Shahid Afridi",
        tags: ["Peshawari", "Traditional", "Rustic", "Family"],
        availableSlots: ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00"],
        featured: true,
        exclusive: false,
      },

      {
        name: "Tuscany Courtyard",
        slug: "tuscany-courtyard",
        description:
          "An elegant Islamabad restaurant with European-inspired interiors, lush greenery and a peaceful courtyard dining atmosphere.",
        cuisine: "Italian",
        priceRange: "$$$",
        rating: 4.5,
        reviewCount: 1900,
        location: "Islamabad, Pakistan",
        address: "Kohsar Market, Islamabad, Pakistan",
        image:
          "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Marco Rossi",
        tags: ["Italian", "Mediterranean", "Courtyard", "Elegant"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: true,
        exclusive: false,
      },

      {
        name: "Laal Qila",
        slug: "laal-qila",
        description:
          "A Mughal-themed restaurant featuring traditional architecture, decorative interiors and an immersive heritage dining environment.",
        cuisine: "Mughlai",
        priceRange: "$$$",
        rating: 4.4,
        reviewCount: 2800,
        location: "Karachi, Pakistan",
        address: "Main Shahrah-e-Faisal, Karachi, Pakistan",
        image:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Bilal Ahmed",
        tags: ["Mughlai", "Mughal Theme", "Traditional", "Family"],
        availableSlots: ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00"],
        featured: true,
        exclusive: false,
      },

      {
        name: "BBQ Tonight",
        slug: "bbq-tonight",
        description:
          "A modern Pakistani restaurant with spacious interiors, comfortable family seating and a lively evening dining atmosphere.",
        cuisine: "BBQ",
        priceRange: "$$",
        rating: 4.5,
        reviewCount: 4500,
        location: "Karachi, Pakistan",
        address: "Multiple Locations, Karachi, Pakistan",
        image:
          "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Faisal Ahmed",
        tags: ["BBQ", "Modern", "Family", "Casual"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: true,
        exclusive: false,
      },

      {
        name: "Fuchsia",
        slug: "fuchsia",
        description:
          "A stylish contemporary Asian restaurant featuring modern interiors, ambient lighting and an upscale dining atmosphere.",
        cuisine: "Asian",
        priceRange: "$$$",
        rating: 4.5,
        reviewCount: 1300,
        location: "Karachi, Pakistan",
        address: "Khayaban-e-Shahbaz, DHA, Karachi, Pakistan",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Daniel Wong",
        tags: ["Asian", "Modern", "Upscale", "Contemporary"],
        availableSlots: ["13:00", "14:00", "18:00", "19:00", "20:00", "21:00"],
        featured: false,
        exclusive: true,
      },

      {
        name: "The Monal Lahore",
        slug: "the-monal-lahore",
        description:
          "A premium Lahore dining venue with elegant interiors, spacious seating and a sophisticated city dining atmosphere.",
        cuisine: "Continental",
        priceRange: "$$$",
        rating: 4.5,
        reviewCount: 2200,
        location: "Lahore, Pakistan",
        address: "Liberty Chowk, Lahore, Pakistan",
        image:
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Hamza Malik",
        tags: ["Continental", "Pakistani", "Fine Dining", "Modern"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: true,
        exclusive: false,
      },

      {
        name: "Cooco's Den",
        slug: "coocos-den",
        description:
          "A distinctive Lahore restaurant blending traditional architecture, local art and rooftop dining with views of the historic city.",
        cuisine: "Pakistani",
        priceRange: "$$$",
        rating: 4.4,
        reviewCount: 1650,
        location: "Lahore, Pakistan",
        address: "Fort Road Food Street, Lahore, Pakistan",
        image:
          "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Salman Rauf",
        tags: ["Pakistani", "Heritage", "Rooftop", "Art"],
        availableSlots: ["13:00", "14:00", "18:00", "19:00", "20:00", "21:00"],
        featured: false,
        exclusive: true,
      },

      {
        name: "Andaaz Islamabad",
        slug: "andaaz-islamabad",
        description:
          "A contemporary restaurant with elegant interiors, comfortable seating and a refined Pakistani dining atmosphere.",
        cuisine: "Pakistani",
        priceRange: "$$$",
        rating: 4.3,
        reviewCount: 980,
        location: "Islamabad, Pakistan",
        address: "F-7 Markaz, Islamabad, Pakistan",
        image:
          "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Ali Hassan",
        tags: ["Pakistani", "Continental", "Modern", "Family"],
        availableSlots: ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00"],
        featured: false,
        exclusive: false,
      },

      {
        name: "Salt'n Pepper Restaurant",
        slug: "salt-n-pepper-restaurant",
        description:
          "A spacious family restaurant offering a comfortable modern dining environment with both local and continental cuisine.",
        cuisine: "Pakistani",
        priceRange: "$$",
        rating: 4.3,
        reviewCount: 3200,
        location: "Lahore, Pakistan",
        address: "Liberty Market, Lahore, Pakistan",
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Kamran Shah",
        tags: ["Pakistani", "Continental", "Family", "Modern"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: false,
        exclusive: false,
      },

      {
        name: "Bundu Khan",
        slug: "bundu-khan",
        description:
          "A well-known Pakistani restaurant with a warm family atmosphere, traditional décor and spacious indoor dining areas.",
        cuisine: "Pakistani",
        priceRange: "$$",
        rating: 4.2,
        reviewCount: 2900,
        location: "Lahore, Pakistan",
        address: "MM Alam Road, Lahore, Pakistan",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Tariq Khan",
        tags: ["BBQ", "Karahi", "Pakistani", "Family"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: false,
        exclusive: false,
      },

      {
        name: "Zameer Ansari",
        slug: "zameer-ansari",
        description:
          "A popular Lahore restaurant featuring a casual traditional atmosphere, comfortable seating and an authentic Pakistani dining experience.",
        cuisine: "BBQ",
        priceRange: "$$",
        rating: 4.3,
        reviewCount: 1450,
        location: "Lahore, Pakistan",
        address: "MM Alam Road, Lahore, Pakistan",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Zameer Ansari",
        tags: ["BBQ", "Karahi", "Pakistani", "Traditional"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: false,
        exclusive: false,
      },

      {
        name: "Usmania Restaurant",
        slug: "usmania-restaurant",
        description:
          "A traditional Islamabad restaurant offering Pakistani and Mughlai cuisine in a comfortable family-friendly setting.",
        cuisine: "Mughlai",
        priceRange: "$$",
        rating: 4.2,
        reviewCount: 1800,
        location: "Islamabad, Pakistan",
        address: "Blue Area, Islamabad, Pakistan",
        image:
          "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Naveed Ahmed",
        tags: ["Mughlai", "BBQ", "Pakistani", "Family"],
        availableSlots: ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00"],
        featured: false,
        exclusive: false,
      },

      {
        name: "Kababjees",
        slug: "kababjees",
        description:
          "A popular Karachi restaurant with spacious modern interiors, outdoor seating and a lively atmosphere for family dining.",
        cuisine: "BBQ",
        priceRange: "$$",
        rating: 4.5,
        reviewCount: 3700,
        location: "Karachi, Pakistan",
        address: "Super Highway, Karachi, Pakistan",
        image:
          "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80",
        chef: "Chef Arif Hussain",
        tags: ["BBQ", "Kebab", "Pakistani", "Family"],
        availableSlots: [
          "12:00",
          "13:00",
          "14:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ],
        featured: true,
        exclusive: false,
      },
    ];

   
    const updatedRestaurantsData = restaurants.map((rest: any, idx: number) => {
      const { ...restInfo } = rest;
      return {
        ...restInfo,
        owner: ownerUser._id,
        status: "approved",
        totalSeats: 20 + idx * 5,
      };
    });

    await Restaurant.insertMany(updatedRestaurantsData);

    console.log("Seeding completed! Disconnecting...");

    await mongoose.disconnect();
    console.log("Disconnected from database.");
  } catch (error: any) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
