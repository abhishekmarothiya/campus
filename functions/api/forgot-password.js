// Cloudflare Pages Function - Password Recovery
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { email, regNumber } = body;
    
    if (!email && !regNumber) {
      return new Response(JSON.stringify({ ok: false, error: "Email or registration number is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // For now, just return success (in real app, send reset email)
    return new Response(JSON.stringify({ 
      ok: true, 
      message: "Password reset instructions sent to your email",
      resetToken: "temp-reset-token-123" // Temporary token for demo
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Password recovery error:', error);
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
