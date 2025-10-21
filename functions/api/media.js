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
