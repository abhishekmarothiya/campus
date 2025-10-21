// Cloudflare Pages Function - Media Search
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const eventId = url.searchParams.get('eventId');
    const uploader = url.searchParams.get('uploader');
    
    // Sample media for search
    let media = [
      {
        id: 1,
        fileName: "tech-conference-photo.jpg",
        eventId: 1,
        eventTitle: "Tech Conference 2024",
        uploadedBy: "user001",
        uploadDate: "2024-10-15T10:00:00Z"
      },
      {
        id: 2,
        fileName: "cultural-festival-video.mp4",
        eventId: 2,
        eventTitle: "Cultural Festival",
        uploadedBy: "user002",
        uploadDate: "2024-10-16T14:30:00Z"
      },
      {
        id: 3,
        fileName: "sports-tournament-photo.jpg",
        eventId: 3,
        eventTitle: "Sports Tournament",
        uploadedBy: "user003",
        uploadDate: "2024-10-17T09:15:00Z"
      }
    ];
    
    // Apply search query
    if (query) {
      media = media.filter(item => 
        item.fileName.toLowerCase().includes(query.toLowerCase()) ||
        item.eventTitle.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply event filter
    if (eventId) {
      media = media.filter(item => item.eventId === parseInt(eventId));
    }
    
    // Apply uploader filter
    if (uploader) {
      media = media.filter(item => item.uploadedBy === uploader);
    }
    
    return new Response(JSON.stringify({ ok: true, media, query, eventId, uploader }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Media search error:', error);
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
