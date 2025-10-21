// Cloudflare Pages Function - Admin Login
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // For Cloudflare Pages Functions, use FormData or URLSearchParams
    let username, password;
    
    try {
      // Try FormData first (most reliable for Cloudflare)
      const formData = await request.formData();
      username = formData.get('username');
      password = formData.get('password');
    } catch (formError) {
      try {
        // Try URLSearchParams if FormData fails
        const url = new URL(request.url);
        username = url.searchParams.get('username');
        password = url.searchParams.get('password');
      } catch (urlError) {
        // Last resort: try to parse as JSON with arrayBuffer
        try {
          const arrayBuffer = await request.arrayBuffer();
          const text = new TextDecoder().decode(arrayBuffer);
          const body = JSON.parse(text);
          username = body.username;
          password = body.password;
        } catch (jsonError) {
          // If all fails, return error
          return new Response(JSON.stringify({ ok: false, error: "Could not parse request" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }
    }
    
    // Check if we got the credentials
    if (!username || !password) {
      return new Response(JSON.stringify({ ok: false, error: "Username and password required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
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
