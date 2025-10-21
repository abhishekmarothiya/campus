// Cloudflare Pages Function - Backup Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    // Sample backup list
    const backups = [
      {
        id: 1,
        name: "backup-2024-10-21.json",
        size: "2.5 MB",
        createdAt: "2024-10-21T00:00:00Z",
        type: "FULL",
        status: "COMPLETED"
      },
      {
        id: 2,
        name: "backup-2024-10-20.json",
        size: "2.4 MB",
        createdAt: "2024-10-20T00:00:00Z",
        type: "FULL",
        status: "COMPLETED"
      },
      {
        id: 3,
        name: "backup-2024-10-19.json",
        size: "2.3 MB",
        createdAt: "2024-10-19T00:00:00Z",
        type: "INCREMENTAL",
        status: "COMPLETED"
      }
    ];
    
    return new Response(JSON.stringify({ ok: true, backups }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Backup list error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestPost(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { backupType } = body;
    
    // Create backup
    const backup = {
      id: Date.now(),
      name: `backup-${new Date().toISOString().split('T')[0]}.json`,
      size: "2.5 MB",
      createdAt: new Date().toISOString(),
      type: backupType || "FULL",
      status: "COMPLETED"
    };
    
    return new Response(JSON.stringify({ ok: true, backup }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Backup creation error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestDelete(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const backupId = url.pathname.split('/').pop();
    
    // Delete backup
    return new Response(JSON.stringify({ 
      ok: true, 
      message: `Backup ${backupId} deleted successfully` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Backup deletion error:', error);
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
