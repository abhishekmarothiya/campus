// Cloudflare Pages Function - Export Bookings Data
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    
    // Sample booking data for export
    const bookingsData = [
      {
        id: 1,
        eventId: parseInt(eventId) || 1,
        eventTitle: "Tech Conference 2024",
        userRegNumber: "2024001",
        userName: "John Doe",
        userEmail: "john.doe@example.com",
        ticketType: "GENERAL",
        quantity: 1,
        status: "CONFIRMED",
        bookingDate: "2024-10-15T10:00:00Z",
        totalAmount: 0
      },
      {
        id: 2,
        eventId: parseInt(eventId) || 1,
        eventTitle: "Tech Conference 2024",
        userRegNumber: "2024002",
        userName: "Jane Smith",
        userEmail: "jane.smith@example.com",
        ticketType: "VIP",
        quantity: 2,
        status: "CONFIRMED",
        bookingDate: "2024-10-16T14:30:00Z",
        totalAmount: 100
      }
    ];
    
    return new Response(JSON.stringify(bookingsData, null, 2), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="bookings-event-${eventId}-${new Date().toISOString().split('T')[0]}.json"`,
        ...corsHeaders 
      }
    });
  } catch (error) {
    console.error('Export bookings error:', error);
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
