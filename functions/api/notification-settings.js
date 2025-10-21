// Cloudflare Pages Function - Notification Settings
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const userRegNumber = url.searchParams.get('userRegNumber');
    
    // Sample notification settings
    const settings = {
      userRegNumber: userRegNumber || 'test123',
      emailNotifications: {
        eventReminders: true,
        bookingConfirmations: true,
        volunteerUpdates: true,
        messageNotifications: false,
        systemUpdates: true
      },
      pushNotifications: {
        eventReminders: true,
        bookingConfirmations: true,
        volunteerUpdates: true,
        messageNotifications: true,
        systemUpdates: false
      },
      frequency: {
        eventReminders: "2 hours before",
        bookingConfirmations: "immediately",
        volunteerUpdates: "immediately",
        messageNotifications: "immediately",
        systemUpdates: "daily"
      }
    };
    
    return new Response(JSON.stringify({ ok: true, settings }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Notification settings error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestPut(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { userRegNumber, emailNotifications, pushNotifications, frequency } = body;
    
    // Update notification settings
    const updatedSettings = {
      userRegNumber,
      emailNotifications: emailNotifications || {},
      pushNotifications: pushNotifications || {},
      frequency: frequency || {},
      updatedAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ ok: true, settings: updatedSettings }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Notification settings update error:', error);
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
