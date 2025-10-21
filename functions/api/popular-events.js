// Cloudflare Pages Function - Popular Events
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    
    // Sample popular events
    const popularEvents = [
      {
        id: 1,
        title: "Tech Conference 2024",
        category: "Technology",
        totalBookings: 45,
        attendanceRate: 93.3,
        rating: 4.5,
        popularityScore: 95
      },
      {
        id: 2,
        title: "Cultural Festival",
        category: "Cultural",
        totalBookings: 120,
        attendanceRate: 85.0,
        rating: 4.2,
        popularityScore: 88
      },
      {
        id: 3,
        title: "Sports Tournament",
        category: "Sports",
        totalBookings: 80,
        attendanceRate: 90.0,
        rating: 4.3,
        popularityScore: 86
      },
      {
        id: 4,
        title: "Music Concert",
        category: "Music",
        totalBookings: 200,
        attendanceRate: 88.5,
        rating: 4.7,
        popularityScore: 92
      },
      {
        id: 5,
        title: "Hackathon 2024",
        category: "Hackathon",
        totalBookings: 60,
        attendanceRate: 95.0,
        rating: 4.8,
        popularityScore: 94
      }
    ];
    
    // Sort by popularity score and limit results
    const sortedEvents = popularEvents
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit);
    
    return new Response(JSON.stringify({ ok: true, events: sortedEvents }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Popular events error:', error);
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
