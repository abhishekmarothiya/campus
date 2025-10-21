// Cloudflare Pages Function - Events Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Sample events data
    const events = [
      {
        id: 1,
        title: "Tech Conference 2024",
        description: "Annual technology conference featuring latest innovations",
        date: "2024-12-15",
        time: "09:00",
        location: "Main Auditorium",
        maxAttendees: 200,
        currentAttendees: 45,
        creatorRegNumber: "admin001",
        creatorName: "Admin User",
        creatorGender: "Other",
        status: "ACTIVE",
        category: "Technology",
        price: 0,
        imageUrl: "",
        requirements: "Bring laptop and notebook",
        resources: [],
        volunteerRequests: [],
        media: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Cultural Festival",
        description: "Celebrate diversity with music, dance, and food",
        date: "2024-12-20",
        time: "18:00",
        location: "Cultural Center",
        maxAttendees: 500,
        currentAttendees: 120,
        creatorRegNumber: "org001",
        creatorName: "Cultural Committee",
        creatorGender: "Other",
        status: "ACTIVE",
        category: "Cultural",
        price: 50,
        imageUrl: "",
        requirements: "Traditional attire welcome",
        resources: [],
        volunteerRequests: [],
        media: [],
        createdAt: new Date().toISOString()
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, events }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Events fetch error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { title, description, date, time, location, maxAttendees, creatorRegNumber, category, price, requirements } = body;
    
    // Create new event
    const event = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      location,
      maxAttendees: parseInt(maxAttendees),
      currentAttendees: 0,
      creatorRegNumber,
      creatorName: "Event Creator",
      creatorGender: "Other",
      status: "ACTIVE",
      category,
      price: parseFloat(price) || 0,
      imageUrl: "",
      requirements: requirements || "",
      resources: [],
      volunteerRequests: [],
      media: [],
      createdAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ ok: true, event }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event creation error:', error);
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
