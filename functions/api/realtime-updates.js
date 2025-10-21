// Cloudflare Pages Function - Real-time Updates (SSE)
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const userRegNumber = url.searchParams.get('userRegNumber');
    const eventId = url.searchParams.get('eventId');
    
    // Create SSE stream for real-time updates
    const stream = new ReadableStream({
      start(controller) {
        // Send initial connection message
        controller.enqueue(`data: ${JSON.stringify({ 
          type: 'connection', 
          message: 'Connected to real-time updates',
          timestamp: new Date().toISOString()
        })}\n\n`);
        
        // Send periodic updates
        const interval = setInterval(() => {
          const update = {
            type: 'heartbeat',
            message: 'System alive',
            timestamp: new Date().toISOString(),
            userRegNumber,
            eventId
          };
          controller.enqueue(`data: ${JSON.stringify(update)}\n\n`);
        }, 30000); // Every 30 seconds
        
        // Cleanup on close
        request.signal?.addEventListener('abort', () => {
          clearInterval(interval);
          controller.close();
        });
      }
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('SSE error:', error);
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
