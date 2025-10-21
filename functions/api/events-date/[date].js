// Cloudflare Pages Function - Event Filtering by Date
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const date = url.pathname.split('/').pop();
    
    // Sample events filtered by date
    const events = [
      {
        id: 1,
        title: "Daily Event",
        description: "Event happening on specified date",
        date: date,
        time: "10:00",
        venue: "Main Hall",
        category: "General",
        maxAttendees: 100,
        currentAttendees: 25,
        status: "ACTIVE",
        price: 0
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, events, date }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Date events fetch error:', error);
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
