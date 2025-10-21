// Cloudflare Pages Function - Organizer Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Sample organizers data
    const organizers = [
      {
        id: 1,
        regNumber: "org001",
        name: "Tech",
        surname: "Committee",
        email: "tech@example.com",
        phone: "9876543210",
        role: "ORGANIZER",
        organizerStatus: "APPROVED",
        lastLogin: "2024-10-21T09:00:00Z",
        joinDate: "2024-01-01",
        eventsCreated: 5,
        totalAttendees: 250,
        isActive: true
      },
      {
        id: 2,
        regNumber: "org002",
        name: "Cultural",
        surname: "Committee",
        email: "cultural@example.com",
        phone: "9876543211",
        role: "ORGANIZER",
        organizerStatus: "APPROVED",
        lastLogin: "2024-10-20T14:30:00Z",
        joinDate: "2024-01-15",
        eventsCreated: 3,
        totalAttendees: 180,
        isActive: true
      },
      {
        id: 3,
        regNumber: "org003",
        name: "Sports",
        surname: "Committee",
        email: "sports@example.com",
        phone: "9876543212",
        role: "ORGANIZER",
        organizerStatus: "PENDING",
        lastLogin: "2024-10-19T11:00:00Z",
        joinDate: "2024-02-01",
        eventsCreated: 0,
        totalAttendees: 0,
        isActive: true
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, organizers }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Organizers fetch error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestPut(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const organizerId = url.pathname.split('/').pop();
    const body = await request.json();
    const { organizerStatus } = body;
    
    // Update organizer status
    const updatedOrganizer = {
      id: parseInt(organizerId),
      organizerStatus: organizerStatus || 'APPROVED',
      updatedAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ ok: true, organizer: updatedOrganizer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Organizer update error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestDelete(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const organizerId = url.pathname.split('/').pop();
    
    // Delete organizer
    return new Response(JSON.stringify({ 
      ok: true, 
      message: `Organizer ${organizerId} deleted successfully` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Organizer deletion error:', error);
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
