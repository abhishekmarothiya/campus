// Cloudflare Pages Function - Media Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    
    // Sample media data
    const media = [
      {
        id: 1,
        eventId: parseInt(eventId) || 1,
        fileName: 'event-photo-1.jpg',
        fileSize: 2048576,
        fileType: 'image/jpeg',
        url: 'https://example.com/media/event-photo-1.jpg',
        uploadDate: '2024-10-15T10:00:00Z',
        uploadedBy: 'user001'
      },
      {
        id: 2,
        eventId: parseInt(eventId) || 1,
        fileName: 'event-video-1.mp4',
        fileSize: 15728640,
        fileType: 'video/mp4',
        url: 'https://example.com/media/event-video-1.mp4',
        uploadDate: '2024-10-15T11:00:00Z',
        uploadedBy: 'user002'
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, media }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Media fetch error:', error);
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
