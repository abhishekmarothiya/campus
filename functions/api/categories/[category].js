// Cloudflare Pages Function - Event Filtering by Category
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const category = url.pathname.split('/').pop();
    
    // Sample events filtered by category
    const events = [
      {
        id: 1,
        title: "Tech Conference 2024",
        description: "Annual technology conference",
        date: "2024-12-15",
        time: "09:00",
        venue: "Main Auditorium",
        category: category,
        maxAttendees: 200,
        currentAttendees: 45,
        status: "ACTIVE",
        price: 0
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, events, category }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Category events fetch error:', error);
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
