// Cloudflare Pages Function - Event Analytics
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    
    // Sample event analytics
    const analytics = {
      eventId: parseInt(eventId) || 1,
      eventTitle: "Tech Conference 2024",
      bookingAnalytics: {
        totalBookings: 45,
        confirmedBookings: 42,
        cancelledBookings: 3,
        bookingTrends: [
          { date: "2024-10-15", bookings: 5 },
          { date: "2024-10-16", bookings: 8 },
          { date: "2024-10-17", bookings: 12 },
          { date: "2024-10-18", bookings: 15 },
          { date: "2024-10-19", bookings: 5 }
        ]
      },
      attendanceTracking: {
        expectedAttendance: 200,
        confirmedAttendance: 42,
        attendanceRate: 21,
        checkInRate: 0
      },
      performanceMetrics: {
        bookingConversionRate: 85,
        cancellationRate: 7,
        averageBookingTime: "2.5 days",
        peakBookingDay: "2024-10-18"
      },
      userEngagement: {
        totalMessages: 25,
        mediaUploads: 8,
        volunteerApplications: 5,
        averageEngagementScore: 7.5
      }
    };
    
    return new Response(JSON.stringify({ ok: true, analytics }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Event analytics error:', error);
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
