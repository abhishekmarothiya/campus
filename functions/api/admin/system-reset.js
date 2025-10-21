// Cloudflare Pages Function - System Reset
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { confirmReset, adminPassword } = body;
    
    if (!confirmReset) {
      return new Response(JSON.stringify({ ok: false, error: "Reset confirmation required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    if (adminPassword !== "Manish@2000") {
      return new Response(JSON.stringify({ ok: false, error: "Invalid admin password" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // System reset (in real app, this would clear all data)
    return new Response(JSON.stringify({ 
      ok: true, 
      message: "System reset completed successfully",
      resetDate: new Date().toISOString(),
      clearedData: {
        users: 150,
        events: 25,
        bookings: 320,
        media: 45,
        messages: 1200,
        notifications: 300
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('System reset error:', error);
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
