// Cloudflare Pages Function - Admin Login
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Handle request body parsing for Cloudflare Pages Functions
    let body;
    try {
      // Try different methods to get request body
      if (typeof request.json === 'function') {
        body = await request.json();
      } else if (typeof request.text === 'function') {
        const text = await request.text();
        body = JSON.parse(text);
      } else {
        // Fallback: try to read as arrayBuffer and convert
        const arrayBuffer = await request.arrayBuffer();
        const text = new TextDecoder().decode(arrayBuffer);
        body = JSON.parse(text);
      }
    } catch (parseError) {
      console.error('Request parsing error:', parseError);
      return new Response(JSON.stringify({ ok: false, error: "Invalid request format" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const { username, password } = body;
    
    // Simple hardcoded admin check
    if (username === 'Chopraa03' && password === 'Manish@2000') {
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
