// Cloudflare Pages Function - Event Search by Title/Organizer
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const organizer = url.searchParams.get('organizer');
    
    // Sample events for search
    let events = [
      {
        id: 1,
        title: "Tech Conference 2024",
        organizer: "Tech Committee",
        organizerRegNumber: "org001",
        date: "2024-12-15",
        category: "Technology"
      },
      {
        id: 2,
        title: "Cultural Festival",
        organizer: "Cultural Committee",
        organizerRegNumber: "org002",
        date: "2024-12-20",
        category: "Cultural"
      },
      {
        id: 3,
        title: "Sports Tournament",
        organizer: "Sports Committee",
        organizerRegNumber: "org003",
        date: "2024-12-25",
        category: "Sports"
      }
    ];
    
    // Apply search query
    if (query) {
      events = events.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.organizer.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply organizer filter
    if (organizer) {
      events = events.filter(event => 
        event.organizerRegNumber === organizer ||
        event.organizer.toLowerCase().includes(organizer.toLowerCase())
      );
    }
    
    return new Response(JSON.stringify({ ok: true, events, query, organizer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event search error:', error);
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
