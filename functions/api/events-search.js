// Cloudflare Pages Function - Event Search & Filter
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const category = url.searchParams.get('category');
    const date = url.searchParams.get('date');
    const venue = url.searchParams.get('venue');
    const sort = url.searchParams.get('sort') || 'upcoming';
    
    // Sample events data
    let events = [
      {
        id: 1,
        title: "Tech Conference 2024",
        description: "Annual technology conference featuring latest innovations",
        date: "2024-12-15",
        time: "09:00",
        venue: "Main Auditorium",
        category: "Technology",
        maxAttendees: 200,
        currentAttendees: 45,
        status: "ACTIVE",
        price: 0
      },
      {
        id: 2,
        title: "Cultural Festival",
        description: "Celebrate diversity with music, dance, and food",
        date: "2024-12-20",
        time: "18:00",
        venue: "Cultural Center",
        category: "Cultural",
        maxAttendees: 500,
        currentAttendees: 120,
        status: "ACTIVE",
        price: 50
      },
      {
        id: 3,
        title: "Sports Tournament",
        description: "Annual sports competition",
        date: "2024-12-25",
        time: "08:00",
        venue: "Sports Complex",
        category: "Sports",
        maxAttendees: 100,
        currentAttendees: 80,
        status: "ACTIVE",
        price: 25
      }
    ];
    
    // Apply filters
    if (search) {
      events = events.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      events = events.filter(event => event.category === category);
    }
    
    if (venue) {
      events = events.filter(event => event.venue === venue);
    }
    
    if (date) {
      events = events.filter(event => event.date === date);
    }
    
    // Apply sorting
    if (sort === 'upcoming') {
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === 'past') {
      events.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return new Response(JSON.stringify({ ok: true, events }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event search error:', error);
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
