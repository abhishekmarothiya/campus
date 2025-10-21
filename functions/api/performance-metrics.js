// Cloudflare Pages Function - Performance Metrics
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Sample performance metrics
    const metrics = {
      responseTimes: {
        average: 150, // ms
        p95: 300,
        p99: 500,
        min: 50,
        max: 1000
      },
      errorRates: {
        total: 0.5, // percentage
        byEndpoint: {
          '/api/login': 0.1,
          '/api/events': 0.2,
          '/api/bookings': 0.3,
          '/api/media': 0.8
        }
      },
      userActivity: {
        activeUsers: 45,
        newUsersToday: 8,
        returningUsers: 37,
        averageSessionDuration: 1800 // seconds
      },
      systemHealth: {
        status: 'HEALTHY',
        uptime: '99.9%',
        memoryUsage: '65%',
        cpuUsage: '45%',
        diskUsage: '30%'
      },
      resourceUsage: {
        apiCalls: 1250,
        databaseQueries: 3200,
        fileUploads: 45,
        cacheHits: 85,
        cacheMisses: 15
      }
    };
    
    return new Response(JSON.stringify({ ok: true, metrics }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Performance metrics error:', error);
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
