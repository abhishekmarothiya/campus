// Cloudflare Pages Function - Chat/Messages
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    
    // Sample messages
    const messages = [
      {
        id: 1,
        eventId: parseInt(eventId) || 1,
        userRegNumber: 'user001',
        userName: 'John Doe',
        message: 'Looking forward to this event!',
        timestamp: new Date().toISOString(),
        type: 'TEXT'
      },
      {
        id: 2,
        eventId: parseInt(eventId) || 1,
        userRegNumber: 'user002',
        userName: 'Jane Smith',
        message: 'What time does it start?',
        timestamp: new Date().toISOString(),
        type: 'TEXT'
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, messages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Messages fetch error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { eventId, userRegNumber, userName, message, type } = body;
    
    // Create message
    const newMessage = {
      id: Date.now(),
      eventId: parseInt(eventId),
      userRegNumber,
      userName,
      message,
      timestamp: new Date().toISOString(),
      type: type || 'TEXT'
    };
    
    return new Response(JSON.stringify({ ok: true, message: newMessage }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Message creation error:', error);
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
