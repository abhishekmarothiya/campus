// Cloudflare Pages Function - Error Handling & Logging
export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { level, message, userId, endpoint, error } = body;
    
    // Log error
    const logEntry = {
      id: Date.now(),
      level: level || 'ERROR',
      message: message || 'Unknown error',
      userId: userId || 'anonymous',
      endpoint: endpoint || 'unknown',
      error: error || null,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('User-Agent') || 'unknown',
      ip: request.headers.get('CF-Connecting-IP') || 'unknown'
    };
    
    // In a real app, this would be saved to a logging system
    console.error('Error logged:', logEntry);
    
    return new Response(JSON.stringify({ 
      ok: true, 
      message: 'Error logged successfully',
      logId: logEntry.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error logging failed:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const level = url.searchParams.get('level') || 'all';
    const limit = parseInt(url.searchParams.get('limit')) || 100;
    
    // Sample error logs
    const errorLogs = [
      {
        id: 1,
        level: 'ERROR',
        message: 'Database connection failed',
        userId: 'system',
        endpoint: '/api/events',
        timestamp: '2024-10-21T10:00:00Z'
      },
      {
        id: 2,
        level: 'WARNING',
        message: 'Slow query detected',
        userId: 'user001',
        endpoint: '/api/bookings',
        timestamp: '2024-10-21T09:45:00Z'
      },
      {
        id: 3,
        level: 'ERROR',
        message: 'File upload failed',
        userId: 'user002',
        endpoint: '/api/media',
        timestamp: '2024-10-21T09:30:00Z'
      }
    ];
    
    // Filter by level
    let filteredLogs = errorLogs;
    if (level !== 'all') {
      filteredLogs = errorLogs.filter(log => log.level.toLowerCase() === level.toLowerCase());
    }
    
    // Limit results
    filteredLogs = filteredLogs.slice(0, limit);
    
    return new Response(JSON.stringify({ 
      ok: true, 
      logs: filteredLogs,
      totalLogs: errorLogs.length,
      filteredCount: filteredLogs.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error logs fetch failed:', error);
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
