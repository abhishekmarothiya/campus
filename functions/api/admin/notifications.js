// Cloudflare Pages Function - Admin Notification Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const type = url.searchParams.get('type');
    const userRegNumber = url.searchParams.get('userRegNumber');
    
    // Sample notifications data
    let notifications = [
      {
        id: 1,
        userRegNumber: "user001",
        userName: "John Doe",
        title: "Event Reminder",
        message: "Your event 'Tech Conference 2024' starts in 2 hours",
        type: "EVENT_REMINDER",
        isRead: false,
        createdAt: "2024-10-21T08:00:00Z"
      },
      {
        id: 2,
        userRegNumber: "user002",
        userName: "Jane Smith",
        title: "Booking Confirmed",
        message: "Your booking for 'Cultural Festival' has been confirmed",
        type: "BOOKING_CONFIRMATION",
        isRead: true,
        createdAt: "2024-10-20T14:30:00Z"
      },
      {
        id: 3,
        userRegNumber: "user003",
        userName: "Bob Johnson",
        title: "Volunteer Update",
        message: "Your volunteer application has been approved",
        type: "VOLUNTEER_UPDATE",
        isRead: false,
        createdAt: "2024-10-19T16:45:00Z"
      }
    ];
    
    // Apply filters
    if (search) {
      notifications = notifications.filter(notif => 
        notif.title.toLowerCase().includes(search.toLowerCase()) ||
        notif.message.toLowerCase().includes(search.toLowerCase()) ||
        notif.userName.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (type) {
      notifications = notifications.filter(notif => notif.type === type);
    }
    
    if (userRegNumber) {
      notifications = notifications.filter(notif => notif.userRegNumber === userRegNumber);
    }
    
    return new Response(JSON.stringify({ ok: true, notifications }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Admin notifications fetch error:', error);
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
    const notificationId = url.pathname.split('/').pop();
    
    // Delete notification
    return new Response(JSON.stringify({ 
      ok: true, 
      message: `Notification ${notificationId} deleted successfully` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Notification deletion error:', error);
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
