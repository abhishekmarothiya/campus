// Cloudflare Pages Function - Event Details & Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.pathname.split('/').pop();
    
    // Sample event details
    const event = {
      id: parseInt(eventId),
      title: "Tech Conference 2024",
      description: "Annual technology conference featuring latest innovations in AI, blockchain, and cloud computing. Join industry experts and students for a day of learning and networking.",
      date: "2024-12-15",
      time: "09:00",
      venue: "Main Auditorium",
      category: "Technology",
      maxAttendees: 200,
      currentAttendees: 45,
      creatorRegNumber: "org001",
      creatorName: "Tech Committee",
      creatorGender: "Other",
      status: "ACTIVE",
      price: 0,
      imageUrl: "",
      requirements: "Bring laptop and notebook",
      resources: [
        { name: "Presentation Slides", url: "https://example.com/slides.pdf" },
        { name: "Event Schedule", url: "https://example.com/schedule.pdf" }
      ],
      volunteerRequests: [
        { id: 1, role: "EVENT_COORDINATOR", status: "APPROVED" },
        { id: 2, role: "TECHNICAL", status: "PENDING" }
      ],
      media: [
        { id: 1, type: "IMAGE", url: "https://example.com/image1.jpg" },
        { id: 2, type: "VIDEO", url: "https://example.com/video1.mp4" }
      ],
      createdAt: "2024-10-01T10:00:00Z",
      updatedAt: "2024-10-15T14:30:00Z"
    };
    
    return new Response(JSON.stringify({ ok: true, event }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event details error:', error);
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
    const url = new URL(request.url);
    const eventId = url.pathname.split('/').pop();
    const body = await request.json();
    
    // Update event
    const updatedEvent = {
      id: parseInt(eventId),
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ ok: true, event: updatedEvent }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event update error:', error);
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
    const eventId = url.pathname.split('/').pop();
    
    // Delete event
    return new Response(JSON.stringify({ ok: true, message: `Event ${eventId} deleted successfully` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event deletion error:', error);
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
