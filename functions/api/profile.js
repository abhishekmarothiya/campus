// Cloudflare Pages Function - User Profile Management
export async function onRequestGet(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const url = new URL(request.url);
    const regNumber = url.searchParams.get('regNumber');
    
    // Sample user profile
    const userProfile = {
      id: 1,
      regNumber: regNumber || 'test123',
      name: 'John',
      surname: 'Doe',
      age: 22,
      gender: 'Male',
      email: 'john.doe@example.com',
      phone: '9876543210',
      role: 'STUDENT',
      organizerStatus: null,
      lastLogin: new Date().toISOString(),
      joinDate: '2024-01-15',
      profileImage: '',
      bio: 'Computer Science Student',
      interests: ['Technology', 'Sports', 'Music']
    };
    
    return new Response(JSON.stringify({ ok: true, user: userProfile }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function onRequestPut(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const body = await request.json();
    const { regNumber, name, surname, age, gender, email, phone, bio, interests } = body;
    
    // Update user profile
    const updatedProfile = {
      regNumber,
      name,
      surname,
      age,
      gender,
      email,
      phone,
      bio: bio || '',
      interests: interests || [],
      lastUpdated: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ ok: true, user: updatedProfile }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Profile update error:', error);
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
