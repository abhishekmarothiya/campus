// Cloudflare Pages Function - User Signup
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
      if (typeof request.json === 'function') {
        body = await request.json();
      } else if (typeof request.text === 'function') {
        const text = await request.text();
        body = JSON.parse(text);
      } else {
        const arrayBuffer = await request.arrayBuffer();
        const text = new TextDecoder().decode(arrayBuffer);
        body = JSON.parse(text);
      }
    } catch (parseError) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid request format" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    const { name, surname, age, gender, email, phone, regNumber, password, role } = body;
    
    // Simple validation
    if (!name || !surname || !age || !gender || !email || !phone || !regNumber || !password || !role) {
      return new Response(JSON.stringify({ ok: false, error: "All fields are required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Create new user (for now, just return success)
    const user = {
      id: Date.now(),
      name,
      surname,
      age,
      gender,
      email,
      phone,
      regNumber,
      role: role === 'ORGANIZER' ? 'STUDENT' : role,
      organizerStatus: role === 'ORGANIZER' ? 'PENDING' : undefined
    };
    
    return new Response(JSON.stringify({ ok: true, user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('User signup error:', error);
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
