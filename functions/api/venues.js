// Cloudflare Pages Function - Event Venues
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const venues = [
      "LH-C", "LH-D", "LH-A", "LHB (MB)", "SJA", "MAIN BUILDING", 
      "SEMINAR HALL A (MB)", "SEMINAR HALL B (MB)", "SEMINAR HALL C (MB)", 
      "OPEN THEATER", "NEW SPORTS COMPLEX", "MAIN GROUND", "NITK BEACH", 
      "CRF", "GYM"
    ];
    
    return new Response(JSON.stringify({ ok: true, venues }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Venues fetch error:', error);
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
