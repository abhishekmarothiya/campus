// Cloudflare Pages Function - Log Monitoring
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const level = url.searchParams.get('level') || 'all';
    const limit = parseInt(url.searchParams.get('limit')) || 50;
    
    // Sample system logs
    const logs = [
      {
        id: 1,
        level: "INFO",
        message: "User login successful",
        timestamp: "2024-10-21T10:00:00Z",
        userId: "user001",
        ip: "192.168.1.100"
      },
      {
        id: 2,
        level: "WARNING",
        message: "Failed login attempt",
        timestamp: "2024-10-21T09:45:00Z",
        userId: "unknown",
        ip: "192.168.1.101"
      },
      {
        id: 3,
        level: "ERROR",
        message: "Database connection timeout",
        timestamp: "2024-10-21T09:30:00Z",
        userId: "system",
        ip: "localhost"
      },
      {
        id: 4,
        level: "INFO",
        message: "Event created successfully",
        timestamp: "2024-10-21T09:15:00Z",
        userId: "org001",
        ip: "192.168.1.102"
      },
      {
        id: 5,
        level: "INFO",
        message: "Media uploaded successfully",
        timestamp: "2024-10-21T09:00:00Z",
        userId: "user002",
        ip: "192.168.1.103"
      }
    ];
    
    // Filter by level
    let filteredLogs = logs;
    if (level !== 'all') {
      filteredLogs = logs.filter(log => log.level.toLowerCase() === level.toLowerCase());
    }
    
    // Limit results
    filteredLogs = filteredLogs.slice(0, limit);
    
    return new Response(JSON.stringify({ 
      ok: true, 
      logs: filteredLogs,
      totalLogs: logs.length,
      filteredCount: filteredLogs.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Log monitoring error:', error);
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
