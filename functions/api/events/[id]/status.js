// Cloudflare Pages Function - Event Status Management
export async function onRequestPut(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.pathname.split('/').pop();
    const body = await request.json();
    const { status, visibility } = body;
    
    // Update event status and visibility
    const updatedEvent = {
      id: parseInt(eventId),
      status: status || 'ACTIVE',
      visibility: visibility || 'PUBLIC',
      updatedAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ ok: true, event: updatedEvent }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event status update error:', error);
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
