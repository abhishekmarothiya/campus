// Cloudflare Pages Function - Event Filtering by Venue
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const venue = url.pathname.split('/').pop();
    
    // Sample events filtered by venue
    const events = [
      {
        id: 1,
        title: "Venue Event",
        description: "Event at specified venue",
        date: "2024-12-20",
        time: "14:00",
        venue: venue,
        category: "General",
        maxAttendees: 150,
        currentAttendees: 30,
        status: "ACTIVE",
        price: 0
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, events, venue }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Venue events fetch error:', error);
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
