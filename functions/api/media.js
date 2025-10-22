// Cloudflare Pages Function - Media Management (DEPLOYMENT FORCE)
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Get search parameters from URL
    const urlPath = request.url;
    const urlParts = urlPath.split('?');
    const searchParams = urlParts.length > 1 ? urlParts[1] : '';
    const params = new URLSearchParams(searchParams);
    const eventId = params.get('eventId');
    const userRegNumber = params.get('userRegNumber');
    
    // Sample media data
    let media = [
      {
        id: 1,
        eventId: 1,
        userRegNumber: 'test123',
        fileName: 'tech-conference-photo.jpg',
        fileSize: 2048576,
        fileType: 'image/jpeg',
        uploadDate: '2024-10-20T10:00:00Z',
        url: '/media/tech-conference-photo.jpg',
        description: 'Main stage setup'
      },
      {
        id: 2,
        eventId: 1,
        userRegNumber: 'test456',
        fileName: 'speaker-presentation.pdf',
        fileSize: 5120000,
        fileType: 'application/pdf',
        uploadDate: '2024-10-20T11:30:00Z',
        url: '/media/speaker-presentation.pdf',
        description: 'Keynote presentation slides'
      }
    ];
    
    // Apply filters
    if (eventId) {
      media = media.filter(item => item.eventId === parseInt(eventId));
    }
    
    if (userRegNumber) {
      media = media.filter(item => item.userRegNumber === userRegNumber);
    }
    
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

// Cloudflare Pages Function - File Upload (Media)
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const eventId = formData.get('eventId');
    const userRegNumber = formData.get('userRegNumber');
    
    if (!file) {
      return new Response(JSON.stringify({ ok: false, error: "No file provided" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // For now, just return success with file info
    // In a real implementation, you'd upload to Cloudflare R2 or similar
    const mediaItem = {
      id: Date.now(),
      eventId: parseInt(eventId),
      userRegNumber,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadDate: new Date().toISOString(),
      url: `https://example.com/uploads/${file.name}` // Placeholder URL
    };
    
    return new Response(JSON.stringify({ ok: true, media: mediaItem }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('File upload error:', error);
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
