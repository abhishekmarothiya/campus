// Cloudflare Pages Function - Event Booking
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { eventId, userRegNumber, ticketType, quantity } = body;
    
    // Create booking
    const booking = {
      id: Date.now(),
      eventId: parseInt(eventId),
      userRegNumber,
      ticketType: ticketType || 'GENERAL',
      quantity: parseInt(quantity) || 1,
      status: 'CONFIRMED',
      bookingDate: new Date().toISOString(),
      totalAmount: 0 // Will be calculated based on event price
    };
    
    return new Response(JSON.stringify({ ok: true, booking }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Booking error:', error);
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
