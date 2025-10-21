// Cloudflare Pages Function - Booking Statistics
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    
    // Sample booking statistics
    const stats = {
      eventId: parseInt(eventId) || 1,
      totalBookings: 45,
      confirmedBookings: 42,
      cancelledBookings: 3,
      pendingBookings: 0,
      totalRevenue: 0,
      bookingTrends: [
        { date: '2024-10-15', bookings: 5 },
        { date: '2024-10-16', bookings: 8 },
        { date: '2024-10-17', bookings: 12 },
        { date: '2024-10-18', bookings: 15 },
        { date: '2024-10-19', bookings: 5 }
      ],
      ticketTypes: {
        GENERAL: 40,
        VIP: 2,
        STUDENT: 0
      }
    };
    
    return new Response(JSON.stringify({ ok: true, stats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Booking statistics error:', error);
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
