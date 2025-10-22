// Cloudflare Pages Function - Admin Event Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Get search parameters from URL
    const urlPath = request.url;
    const urlParts = urlPath.split('?');
    const searchParams = urlParts.length > 1 ? urlParts[1] : '';
    const params = new URLSearchParams(searchParams);
    const search = params.get('search');
    const category = params.get('category');
    
    // Sample events data
    let events = [
      {
        id: 1,
        title: "Tech Conference 2024",
        description: "Annual technology conference",
        date: "2024-12-15",
        time: "09:00",
        venue: "Main Auditorium",
        category: "Technology",
        creatorRegNumber: "org001",
        creatorName: "Tech Committee",
        maxAttendees: 200,
        currentAttendees: 45,
        status: "ACTIVE",
        createdAt: "2024-10-01T10:00:00Z"
      },
      {
        id: 2,
        title: "Cultural Festival",
        description: "Celebrate diversity",
        date: "2024-12-20",
        time: "18:00",
        venue: "Cultural Center",
        category: "Cultural",
        creatorRegNumber: "org002",
        creatorName: "Cultural Committee",
        maxAttendees: 500,
        currentAttendees: 120,
        status: "ACTIVE",
        createdAt: "2024-10-02T14:30:00Z"
      }
    ];
    
    // Apply filters
    if (search) {
      events = events.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.creatorName.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      events = events.filter(event => event.category === category);
    }
    
    return new Response(JSON.stringify({ ok: true, events }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Admin events fetch error:', error);
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
    // Get event ID from URL path
    const urlPath = request.url;
    const pathParts = urlPath.split('/');
    const eventId = pathParts[pathParts.length - 1];
    
    // Delete event
    return new Response(JSON.stringify({ 
      ok: true, 
      message: `Event ${eventId} deleted successfully` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event deletion error:', error);
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
