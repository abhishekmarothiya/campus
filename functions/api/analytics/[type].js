// Cloudflare Pages Function - Analytics & Reports (DEPLOYMENT FORCE)
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Get type from URL path
    const urlPath = request.url;
    const pathParts = urlPath.split('/');
    const type = pathParts[pathParts.length - 1];
    
    if (type === 'events') {
      // Event analytics
      const analytics = {
        totalEvents: 25,
        activeEvents: 8,
        completedEvents: 15,
        cancelledEvents: 2,
        totalAttendees: 1250,
        averageAttendance: 50,
        popularCategories: [
          { category: "Technology", count: 8 },
          { category: "Cultural", count: 6 },
          { category: "Sports", count: 4 },
          { category: "Education", count: 3 }
        ],
        attendanceTrends: [
          { month: "Jan", events: 2, attendees: 100 },
          { month: "Feb", events: 3, attendees: 150 },
          { month: "Mar", events: 4, attendees: 200 },
          { month: "Apr", events: 5, attendees: 250 }
        ]
      };
      
      return new Response(JSON.stringify({ ok: true, analytics }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    if (type === 'users') {
      // User analytics
      const analytics = {
        totalUsers: 150,
        activeUsers: 120,
        newUsersThisMonth: 25,
        userEngagement: {
          high: 45,
          medium: 60,
          low: 45
        },
        roleDistribution: {
          STUDENT: 130,
          ORGANIZER: 20
        },
        loginTrends: [
          { date: "2024-10-15", logins: 45 },
          { date: "2024-10-16", logins: 52 },
          { date: "2024-10-17", logins: 38 },
          { date: "2024-10-18", logins: 61 },
          { date: "2024-10-19", logins: 48 }
        ]
      };
      
      return new Response(JSON.stringify({ ok: true, analytics }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    return new Response(JSON.stringify({ ok: false, error: "Invalid analytics type" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Analytics error:', error);
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
