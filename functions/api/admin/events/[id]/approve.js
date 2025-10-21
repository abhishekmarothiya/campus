// Cloudflare Pages Function - Event Approval
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
    const { approved, adminNotes } = body;
    
    // Approve/reject event
    const updatedEvent = {
      id: parseInt(eventId),
      approved: approved !== undefined ? approved : true,
      adminNotes: adminNotes || '',
      approvalDate: new Date().toISOString(),
      status: approved ? 'ACTIVE' : 'REJECTED'
    };
    
    return new Response(JSON.stringify({ ok: true, event: updatedEvent }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event approval error:', error);
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
