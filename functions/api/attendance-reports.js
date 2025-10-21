// Cloudflare Pages Function - Attendance Reports
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    const date = url.searchParams.get('date');
    
    // Sample attendance report
    const report = {
      eventId: parseInt(eventId) || 1,
      eventTitle: "Tech Conference 2024",
      reportDate: date || new Date().toISOString().split('T')[0],
      attendance: {
        totalBooked: 45,
        totalAttended: 42,
        attendanceRate: 93.3,
        noShows: 3
      },
      demographics: {
        students: 35,
        faculty: 5,
        external: 2
      },
      checkInTimes: [
        { time: "09:00", count: 5 },
        { time: "09:15", count: 8 },
        { time: "09:30", count: 12 },
        { time: "09:45", count: 10 },
        { time: "10:00", count: 7 }
      ],
      feedback: {
        averageRating: 4.5,
        totalResponses: 38,
        positiveComments: 32,
        negativeComments: 6
      }
    };
    
    return new Response(JSON.stringify({ ok: true, report }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Attendance report error:', error);
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
