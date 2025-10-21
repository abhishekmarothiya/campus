// Cloudflare Pages Function - Health Check
export async function onRequest() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
