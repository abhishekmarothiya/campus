// Cloudflare Pages Function - Admin Dashboard Data
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Sample admin dashboard data
    const dashboardData = {
      stats: {
        totalUsers: 150,
        totalEvents: 25,
        activeEvents: 8,
        totalBookings: 320,
        pendingVolunteers: 12
      },
      recentEvents: [
        {
          id: 1,
          title: "Tech Conference 2024",
          attendees: 45,
          maxAttendees: 200,
          status: "ACTIVE"
        },
        {
          id: 2,
          title: "Cultural Festival",
          attendees: 120,
          maxAttendees: 500,
          status: "ACTIVE"
        }
      ],
      recentUsers: [
        {
          id: 1,
          name: "John Doe",
          regNumber: "2024001",
          role: "STUDENT",
          joinDate: "2024-10-15"
        },
        {
          id: 2,
          name: "Jane Smith",
          regNumber: "2024002",
          role: "STUDENT",
          joinDate: "2024-10-16"
        }
      ],
      pendingApprovals: [
        {
          id: 1,
          type: "EVENT",
          title: "Music Concert",
          submittedBy: "org001",
          submittedDate: "2024-10-20"
        },
        {
          id: 2,
          type: "VOLUNTEER",
          eventTitle: "Tech Conference 2024",
          volunteerName: "vol001",
          submittedDate: "2024-10-21"
        }
      ]
    };
    
    return new Response(JSON.stringify({ ok: true, data: dashboardData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
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
