// Cloudflare Pages Function - Personal Dashboard Data
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const userRegNumber = url.searchParams.get('userRegNumber');
    
    // Sample personal dashboard data
    const dashboardData = {
      userRegNumber: userRegNumber || 'test123',
      myEvents: [
        {
          id: 1,
          title: "Tech Conference 2024",
          date: "2024-12-15",
          status: "BOOKED",
          bookingId: 1
        },
        {
          id: 2,
          title: "Cultural Festival",
          date: "2024-12-20",
          status: "BOOKED",
          bookingId: 2
        }
      ],
      myBookings: [
        {
          id: 1,
          eventTitle: "Tech Conference 2024",
          eventDate: "2024-12-15",
          ticketType: "GENERAL",
          quantity: 1,
          status: "CONFIRMED",
          bookingDate: "2024-10-15T10:00:00Z"
        }
      ],
      myVolunteers: [
        {
          id: 1,
          eventTitle: "Sports Tournament",
          role: "EVENT_COORDINATOR",
          status: "APPROVED",
          appliedDate: "2024-10-10T09:00:00Z"
        }
      ],
      myMessages: [
        {
          id: 1,
          eventTitle: "Tech Conference 2024",
          lastMessage: "Looking forward to this event!",
          timestamp: "2024-10-15T10:00:00Z",
          unreadCount: 2
        }
      ],
      myMedia: [
        {
          id: 1,
          fileName: "my-photo.jpg",
          eventTitle: "Tech Conference 2024",
          uploadDate: "2024-10-15T11:00:00Z"
        }
      ],
      activityFeed: [
        {
          id: 1,
          type: "BOOKING",
          message: "Booked ticket for Tech Conference 2024",
          timestamp: "2024-10-15T10:00:00Z"
        },
        {
          id: 2,
          type: "VOLUNTEER",
          message: "Applied to volunteer for Sports Tournament",
          timestamp: "2024-10-10T09:00:00Z"
        }
      ]
    };
    
    return new Response(JSON.stringify({ ok: true, dashboard: dashboardData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Personal dashboard error:', error);
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
