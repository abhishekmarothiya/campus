// Cloudflare Pages Function - Waitlist Management
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { eventId, userRegNumber, ticketType, quantity } = body;
    
    // Add to waitlist
    const waitlistEntry = {
      id: Date.now(),
      eventId: parseInt(eventId),
      userRegNumber,
      ticketType: ticketType || 'GENERAL',
      quantity: parseInt(quantity) || 1,
      status: 'WAITING',
      joinDate: new Date().toISOString(),
      position: Math.floor(Math.random() * 10) + 1 // Random position for demo
    };
    
    return new Response(JSON.stringify({ ok: true, waitlistEntry }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Waitlist join error:', error);
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
    
    // Sample waitlist entries
    const waitlist = [
      {
        id: 1,
        eventId: parseInt(eventId) || 1,
        userRegNumber: 'wait001',
        userName: 'Alice Johnson',
        ticketType: 'GENERAL',
        quantity: 1,
        status: 'WAITING',
        joinDate: '2024-10-15T10:00:00Z',
        position: 1
      },
      {
        id: 2,
        eventId: parseInt(eventId) || 1,
        userRegNumber: 'wait002',
        userName: 'Bob Smith',
        ticketType: 'VIP',
        quantity: 2,
        status: 'WAITING',
        joinDate: '2024-10-15T11:00:00Z',
        position: 2
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, waitlist }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Waitlist fetch error:', error);
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
