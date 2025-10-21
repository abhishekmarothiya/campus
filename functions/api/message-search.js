// Cloudflare Pages Function - Message Search
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const eventId = url.searchParams.get('eventId');
    const userRegNumber = url.searchParams.get('userRegNumber');
    
    // Sample messages for search
    let messages = [
      {
        id: 1,
        message: "Looking forward to this event!",
        eventId: 1,
        eventTitle: "Tech Conference 2024",
        userRegNumber: "user001",
        userName: "John Doe",
        timestamp: "2024-10-15T10:00:00Z"
      },
      {
        id: 2,
        message: "What time does it start?",
        eventId: 1,
        eventTitle: "Tech Conference 2024",
        userRegNumber: "user002",
        userName: "Jane Smith",
        timestamp: "2024-10-15T10:30:00Z"
      },
      {
        id: 3,
        message: "Can't wait for the performances!",
        eventId: 2,
        eventTitle: "Cultural Festival",
        userRegNumber: "user003",
        userName: "Bob Johnson",
        timestamp: "2024-10-16T14:00:00Z"
      }
    ];
    
    // Apply search query
    if (query) {
      messages = messages.filter(msg => 
        msg.message.toLowerCase().includes(query.toLowerCase()) ||
        msg.userName.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply event filter
    if (eventId) {
      messages = messages.filter(msg => msg.eventId === parseInt(eventId));
    }
    
    // Apply user filter
    if (userRegNumber) {
      messages = messages.filter(msg => msg.userRegNumber === userRegNumber);
    }
    
    return new Response(JSON.stringify({ ok: true, messages, query, eventId, userRegNumber }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Message search error:', error);
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
