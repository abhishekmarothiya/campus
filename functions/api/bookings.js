// Cloudflare Pages Function - Event Bookings Management
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
    
    // Sample bookings data
    let bookings = [
      {
        id: 1,
        eventId: 1,
        userRegNumber: 'test123',
        ticketType: 'GENERAL',
        quantity: 2,
        status: 'CONFIRMED',
        bookingDate: '2024-10-20T10:00:00Z',
        totalAmount: 0,
        eventTitle: 'Tech Conference 2024'
      },
      {
        id: 2,
        eventId: 2,
        userRegNumber: 'test456',
        ticketType: 'VIP',
        quantity: 1,
        status: 'CONFIRMED',
        bookingDate: '2024-10-19T14:30:00Z',
        totalAmount: 50,
        eventTitle: 'Cultural Festival'
      }
    ];
    
    // Apply filters
    if (eventId) {
      bookings = bookings.filter(booking => booking.eventId === parseInt(eventId));
    }
    
    if (userRegNumber) {
      bookings = bookings.filter(booking => booking.userRegNumber === userRegNumber);
    }
    
    return new Response(JSON.stringify({ ok: true, bookings }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Bookings fetch error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

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
