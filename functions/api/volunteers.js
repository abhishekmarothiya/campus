// Cloudflare Pages Function - Volunteer Management
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { eventId, userRegNumber, role, skills, availability } = body;
    
    // Create volunteer request
    const volunteerRequest = {
      id: Date.now(),
      eventId: parseInt(eventId),
      userRegNumber,
      role: role || 'GENERAL',
      skills: skills || [],
      availability: availability || 'FLEXIBLE',
      status: 'PENDING',
      appliedDate: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ ok: true, volunteerRequest }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Volunteer request error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    
    // Sample volunteer requests
    const volunteerRequests = [
      {
        id: 1,
        eventId: parseInt(eventId) || 1,
        userRegNumber: 'vol001',
        role: 'EVENT_COORDINATOR',
        skills: ['Leadership', 'Communication'],
        availability: 'WEEKEND',
        status: 'APPROVED',
        appliedDate: new Date().toISOString()
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, volunteerRequests }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Volunteer fetch error:', error);
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
