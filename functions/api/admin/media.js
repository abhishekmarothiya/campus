// Cloudflare Pages Function - Admin Media Management
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
    
    // Sample media data
    let media = [
      {
        id: 1,
        fileName: "event-photo-1.jpg",
        fileSize: 2048576,
        fileType: "image/jpeg",
        url: "https://example.com/media/event-photo-1.jpg",
        uploadDate: "2024-10-15T10:00:00Z",
        uploadedBy: "user001",
        eventId: 1,
        eventTitle: "Tech Conference 2024"
      },
      {
        id: 2,
        fileName: "event-video-1.mp4",
        fileSize: 15728640,
        fileType: "video/mp4",
        url: "https://example.com/media/event-video-1.mp4",
        uploadDate: "2024-10-15T11:00:00Z",
        uploadedBy: "user002",
        eventId: 1,
        eventTitle: "Tech Conference 2024"
      },
      {
        id: 3,
        fileName: "cultural-photo-1.jpg",
        fileSize: 1536000,
        fileType: "image/jpeg",
        url: "https://example.com/media/cultural-photo-1.jpg",
        uploadDate: "2024-10-16T14:30:00Z",
        uploadedBy: "user003",
        eventId: 2,
        eventTitle: "Cultural Festival"
      }
    ];
    
    // Apply filters
    if (search) {
      media = media.filter(item => 
        item.fileName.toLowerCase().includes(search.toLowerCase()) ||
        item.eventTitle.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (eventId) {
      media = media.filter(item => item.eventId === parseInt(eventId));
    }
    
    return new Response(JSON.stringify({ ok: true, media }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Admin media fetch error:', error);
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
    const mediaId = url.pathname.split('/').pop();
    
    // Delete media
    return new Response(JSON.stringify({ 
      ok: true, 
      message: `Media ${mediaId} deleted successfully` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Media deletion error:', error);
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
