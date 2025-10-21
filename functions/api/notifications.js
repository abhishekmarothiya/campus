// Cloudflare Pages Function - Notifications
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const userRegNumber = url.searchParams.get('userRegNumber');
    
    // Sample notifications
    const notifications = [
      {
        id: 1,
        userRegNumber: userRegNumber || 'test123',
        title: 'Event Reminder',
        message: 'Your event "Tech Conference 2024" starts in 2 hours',
        type: 'EVENT_REMINDER',
        isRead: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        userRegNumber: userRegNumber || 'test123',
        title: 'Booking Confirmed',
        message: 'Your booking for "Cultural Festival" has been confirmed',
        type: 'BOOKING_CONFIRMATION',
        isRead: true,
        createdAt: new Date().toISOString()
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, notifications }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Notifications fetch error:', error);
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
    const { userRegNumber, title, message, type } = body;
    
    // Create notification
    const notification = {
      id: Date.now(),
      userRegNumber,
      title,
      message,
      type: type || 'GENERAL',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ ok: true, notification }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Notification creation error:', error);
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
