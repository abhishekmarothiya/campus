// Cloudflare Pages Function - User Bookings Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const userRegNumber = url.searchParams.get('userRegNumber');
    
    // Sample user bookings
    const bookings = [
      {
        id: 1,
        eventId: 1,
        eventTitle: "Tech Conference 2024",
        eventDate: "2024-12-15",
        eventVenue: "Main Auditorium",
        userRegNumber: userRegNumber || 'test123',
        ticketType: 'GENERAL',
        quantity: 1,
        status: 'CONFIRMED',
        bookingDate: '2024-10-15T10:00:00Z',
        totalAmount: 0,
        qrCode: 'QR123456789'
      },
      {
        id: 2,
        eventId: 2,
        eventTitle: "Cultural Festival",
        eventDate: "2024-12-20",
        eventVenue: "Cultural Center",
        userRegNumber: userRegNumber || 'test123',
        ticketType: 'VIP',
        quantity: 2,
        status: 'CONFIRMED',
        bookingDate: '2024-10-16T14:30:00Z',
        totalAmount: 100,
        qrCode: 'QR987654321'
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, bookings }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('User bookings fetch error:', error);
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
