// Cloudflare Pages Function - Admin Login
import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb+srv://abhishekmarothiya072002_db_user:vdHyqmX1RLzyccRu@cluster0.xgxmkt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "campus_event_hub";
const COLLECTION_NAME = "app_data";

let client = null;
let collection = null;

async function initMongoDB() {
  if (!client) {
    try {
      client = new MongoClient(MONGODB_URI, {
        maxPoolSize: 1,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,
        maxIdleTimeMS: 10000,
        connectTimeoutMS: 10000,
        minPoolSize: 0,
        retryWrites: true,
        retryReads: true
      });
      
      await client.connect();
      const db = client.db(DB_NAME);
      collection = db.collection(COLLECTION_NAME);
      
      console.log("✅ MongoDB connected");
      return true;
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err.message);
      return false;
    }
  }
  return true;
}

async function loadData() {
  const base = { users: [], events: [], media: [], notifications: {}, messages: [], admin: { username: "Chopraa03", password: "Manish@2000" } };
  
  if (!collection) {
    return base;
  }
  
  try {
    const result = await collection.findOne({ type: "app_data" });
    if (result && result.data) {
      return {
        users: result.data.users || [],
        events: result.data.events || [],
        media: result.data.media || [],
        notifications: result.data.notifications || {},
        messages: result.data.messages || [],
        admin: result.data.admin || base.admin
      };
    }
  } catch (err) {
    console.error("❌ Failed to load from MongoDB:", err);
  }
  
  return base;
}

export async function onRequestPost(request) {
  // Initialize MongoDB
  await initMongoDB();
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
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
  } catch (error) {
    console.error('Admin login error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
