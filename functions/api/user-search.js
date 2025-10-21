// Cloudflare Pages Function - User Search
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const role = url.searchParams.get('role');
    
    // Sample users for search
    let users = [
      {
        id: 1,
        regNumber: "2024001",
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        role: "STUDENT",
        lastLogin: "2024-10-20T10:00:00Z"
      },
      {
        id: 2,
        regNumber: "2024002",
        name: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        role: "STUDENT",
        lastLogin: "2024-10-19T14:30:00Z"
      },
      {
        id: 3,
        regNumber: "org001",
        name: "Admin",
        surname: "User",
        email: "admin@example.com",
        role: "ORGANIZER",
        lastLogin: "2024-10-21T09:00:00Z"
      }
    ];
    
    // Apply search query
    if (query) {
      users = users.filter(user => 
        user.regNumber.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.surname.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply role filter
    if (role) {
      users = users.filter(user => user.role === role);
    }
    
    return new Response(JSON.stringify({ ok: true, users, query, role }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('User search error:', error);
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
