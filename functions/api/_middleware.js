// Cloudflare Pages Function - Main API Handler
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import cors from 'cors';

// MongoDB Configuration
const MONGODB_URI = "mongodb+srv://abhishekmarothiya072002_db_user:vdHyqmX1RLzyccRu@cluster0.xgxmkt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "campus_event_hub";
const COLLECTION_NAME = "app_data";

let client = null;
let db = null;
let collection = null;
let gridFSBucket = null;

// Initialize MongoDB connection
async function initMongoDB() {
  if (!MONGODB_URI) {
    console.log("📋 No MongoDB URI provided, skipping MongoDB connection");
    return false;
  }
  
  try {
    console.log("🔗 Connecting to MongoDB Atlas...");
    
    client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 1, // Single connection for serverless
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxIdleTimeMS: 10000,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,
      minPoolSize: 0,
      retryWrites: true,
      retryReads: true
    });
    
    await client.connect();
    console.log("✅ MongoDB client connected!");
    
    db = client.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);
    
    gridFSBucket = new GridFSBucket(db, { 
      bucketName: 'media',
      chunkSizeBytes: 1024 * 1024,
      writeConcern: { w: 'majority', j: true },
      readConcern: { level: 'majority' }
    });
    
    await db.admin().ping();
    console.log("✅ Database ping successful!");
    
    await collection.createIndex({ "type": 1 }, { background: true });
    await collection.createIndex({ "lastUpdated": 1 }, { background: true });
    console.log("📊 Database indexes created");
    
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    return false;
  }
}

// Load data from MongoDB
async function loadData() {
  const base = { users: [], events: [], media: [], notifications: {}, messages: [], admin: { username: "Chopraa03", password: "Manish@2000" } };
  
  if (!collection) {
    console.log("📄 MongoDB not available, using default data");
    return base;
  }
  
  try {
    const result = await collection.findOne({ type: "app_data" });
    if (result && result.data) {
      const data = {
        users: result.data.users || [],
        events: result.data.events || [],
        media: result.data.media || [],
        notifications: result.data.notifications || {},
        messages: result.data.messages || [],
        admin: result.data.admin || base.admin
      };
      
      console.log(`📊 Loaded from MongoDB: ${data.users?.length || 0} users, ${data.events?.length || 0} events`);
      return data;
    }
  } catch (err) {
    console.error("❌ Failed to load from MongoDB:", err);
  }
  
  return base;
}

// Save data to MongoDB
async function saveData(data) {
  if (!collection) {
    console.log("❌ MongoDB not available, cannot save data");
    return;
  }
  
  try {
    const validatedData = {
      users: Array.isArray(data.users) ? data.users : [],
      events: Array.isArray(data.events) ? data.events : [],
      media: Array.isArray(data.media) ? data.media : [],
      notifications: data.notifications && typeof data.notifications === 'object' ? data.notifications : {},
      messages: Array.isArray(data.messages) ? data.messages : [],
      admin: data.admin || { username: "Chopraa03", password: "Manish@2000" }
    };
    
    await collection.updateOne(
      { type: "app_data" },
      { 
        $set: { 
          data: validatedData,
          lastUpdated: new Date(),
          version: "1.0"
        }
      },
      { upsert: true }
    );
    
    console.log(`✅ Data saved to MongoDB: ${validatedData.users?.length || 0} users, ${validatedData.events?.length || 0} events`);
    
  } catch (err) {
    console.error('❌ Failed to save data to MongoDB:', err);
    throw err;
  }
}

// Initialize MongoDB on first request
let mongoInitialized = false;
async function ensureMongoDB() {
  if (!mongoInitialized) {
    mongoInitialized = await initMongoDB();
  }
  return mongoInitialized;
}

export default {
  async fetch(request, env, ctx) {
    // Initialize MongoDB
    await ensureMongoDB();
    
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }
    
    try {
      // Health check endpoint
      if (path === '/healthz') {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      
      // Admin login endpoint
      if (path === '/api/admin/login' && method === 'POST') {
        const body = await request.json();
        const { username, password } = body;
        
        const data = await loadData();
        const stored = data.admin;
        
        if (String(stored.username).toLowerCase() === String(username).toLowerCase() && 
            String(stored.password) === String(password)) {
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        } else {
          return new Response(JSON.stringify({ ok: false, error: "Invalid admin credentials" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }
      
      // User login endpoint
      if (path === '/api/login' && method === 'POST') {
        const body = await request.json();
        const { regNumber, password } = body;
        
        const data = await loadData();
        const user = data.users.find(u => 
          String(u.regNumber).trim() === String(regNumber).trim() && 
          String(u.password) === String(password)
        );
        
        if (!user) {
          return new Response(JSON.stringify({ ok: false, error: "Invalid credentials" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Update last seen
        user.lastSeen = new Date().toISOString();
        await saveData(data);
        
        return new Response(JSON.stringify({ ok: true, user }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      
      // User signup endpoint
      if (path === '/api/signup' && method === 'POST') {
        const body = await request.json();
        const { name, surname, age, gender, email, phone, regNumber, password, role } = body;
        
        if (!name || !surname || !age || !gender || !email || !phone || !regNumber || !password || !role) {
          return new Response(JSON.stringify({ ok: false, error: "All fields are required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        const data = await loadData();
        
        // Check for existing user
        if (data.users.find(u => u.regNumber === regNumber)) {
          return new Response(JSON.stringify({ ok: false, error: "Registration number already exists" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        if (data.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
          return new Response(JSON.stringify({ ok: false, error: "Email already in use" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Create new user
        const user = { 
          id: Date.now(), 
          name, surname, age, gender, email, phone, regNumber, password, 
          role: role === 'ORGANIZER' ? 'STUDENT' : role,
          organizerStatus: role === 'ORGANIZER' ? 'PENDING' : undefined
        };
        
        data.users.push(user);
        await saveData(data);
        
        return new Response(JSON.stringify({ ok: true, user }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      
      // Events endpoint
      if (path === '/api/events' && method === 'GET') {
        const data = await loadData();
        const augmentedEvents = data.events.map(event => {
          const creator = data.users.find(u => u.regNumber === event.creatorRegNumber);
          const eventMedia = data.media.filter(m => m.eventId === event.id);
          return { 
            ...event, 
            creatorName: creator ? `${creator.name} ${creator.surname}` : 'Unknown Organizer',
            creatorGender: creator ? creator.gender : 'Other',
            media: eventMedia,
            volunteerRequests: event.volunteerRequests || [],
            resources: Array.isArray(event.resources) ? event.resources : []
          };
        });
        
        return new Response(JSON.stringify({ ok: true, events: augmentedEvents }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      
      // Default response for unmatched routes
      return new Response(JSON.stringify({ ok: false, error: "Endpoint not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
      
    } catch (error) {
      console.error('API Error:', error);
      return new Response(JSON.stringify({ ok: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};
