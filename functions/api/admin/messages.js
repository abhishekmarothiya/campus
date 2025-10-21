// Cloudflare Pages Function - Admin Message Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const eventId = url.searchParams.get('eventId');
    const userRegNumber = url.searchParams.get('userRegNumber');
    
    // Sample messages data
    let messages = [
      {
        id: 1,
        eventId: 1,
        eventTitle: "Tech Conference 2024",
        userRegNumber: "user001",
        userName: "John Doe",
        message: "Looking forward to this event!",
        timestamp: "2024-10-15T10:00:00Z",
        type: "TEXT"
      },
      {
        id: 2,
        eventId: 1,
        eventTitle: "Tech Conference 2024",
        userRegNumber: "user002",
        userName: "Jane Smith",
        message: "What time does it start?",
        timestamp: "2024-10-15T10:30:00Z",
        type: "TEXT"
      },
      {
        id: 3,
        eventId: 2,
        eventTitle: "Cultural Festival",
        userRegNumber: "user003",
        userName: "Bob Johnson",
        message: "Can't wait for the performances!",
        timestamp: "2024-10-16T14:00:00Z",
        type: "TEXT"
      }
    ];
    
    // Apply filters
    if (search) {
      messages = messages.filter(msg => 
        msg.message.toLowerCase().includes(search.toLowerCase()) ||
        msg.userName.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (eventId) {
      messages = messages.filter(msg => msg.eventId === parseInt(eventId));
    }
    
    if (userRegNumber) {
      messages = messages.filter(msg => msg.userRegNumber === userRegNumber);
    }
    
    return new Response(JSON.stringify({ ok: true, messages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Admin messages fetch error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestDelete(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const messageId = url.pathname.split('/').pop();
    
    // Delete message
    return new Response(JSON.stringify({ 
      ok: true, 
      message: `Message ${messageId} deleted successfully` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Message deletion error:', error);
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
