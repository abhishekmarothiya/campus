// Cloudflare Pages Function - Admin User Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const role = url.searchParams.get('role');
    
    // Sample users data
    let users = [
      {
        id: 1,
        regNumber: '2024001',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        role: 'STUDENT',
        organizerStatus: null,
        lastLogin: '2024-10-20T10:00:00Z',
        joinDate: '2024-01-15',
        isActive: true
      },
      {
        id: 2,
        regNumber: '2024002',
        name: 'Jane',
        surname: 'Smith',
        email: 'jane.smith@example.com',
        phone: '9876543211',
        role: 'STUDENT',
        organizerStatus: 'PENDING',
        lastLogin: '2024-10-19T14:30:00Z',
        joinDate: '2024-01-16',
        isActive: true
      },
      {
        id: 3,
        regNumber: 'org001',
        name: 'Admin',
        surname: 'User',
        email: 'admin@example.com',
        phone: '9876543212',
        role: 'ORGANIZER',
        organizerStatus: 'APPROVED',
        lastLogin: '2024-10-21T09:00:00Z',
        joinDate: '2024-01-01',
        isActive: true
      }
    ];
    
    // Apply filters
    if (search) {
      users = users.filter(user => 
        user.regNumber.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (role) {
      users = users.filter(user => user.role === role);
    }
    
    return new Response(JSON.stringify({ ok: true, users }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Users fetch error:', error);
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
    const userId = url.pathname.split('/').pop();
    
    // Delete user
    return new Response(JSON.stringify({ 
      ok: true, 
      message: `User ${userId} deleted successfully` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('User deletion error:', error);
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
