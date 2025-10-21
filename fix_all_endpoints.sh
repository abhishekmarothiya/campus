#!/bin/bash

# Universal fix for all Cloudflare Pages Functions
# This script will fix URL parsing and request parsing issues

echo "🔧 Fixing ALL Cloudflare Pages Functions..."

# Function to fix URL parsing
fix_url_parsing() {
    local file="$1"
    echo "Fixing URL parsing in: $file"
    
    # Replace new URL(request.url) with simple string splitting
    sed -i 's/const url = new URL(request\.url);/const urlPath = request.url; const pathParts = urlPath.split("\/");/' "$file"
    sed -i 's/const \([a-zA-Z_][a-zA-Z0-9_]*\) = url\.pathname\.split("\/")\.pop();/const \1 = pathParts[pathParts.length - 1];/' "$file"
    sed -i 's/const \([a-zA-Z_][a-zA-Z0-9_]*\) = url\.searchParams\.get("\([^"]*\)");/const \1 = pathParts.includes("\2") ? pathParts[pathParts.indexOf("\2") + 1] : null;/' "$file"
}

# Function to fix request parsing
fix_request_parsing() {
    local file="$1"
    echo "Fixing request parsing in: $file"
    
    # Replace request.json() with robust parsing
    sed -i 's/const body = await request\.json();/let body; try { if (typeof request.json === "function") { body = await request.json(); } else if (typeof request.text === "function") { const text = await request.text(); body = JSON.parse(text); } else { const arrayBuffer = await request.arrayBuffer(); const text = new TextDecoder().decode(arrayBuffer); body = JSON.parse(text); } } catch (parseError) { return new Response(JSON.stringify({ ok: false, error: "Invalid request format" }), { status: 400, headers: { "Content-Type": "application\/json", ...corsHeaders } }); }/' "$file"
}

echo "✅ Fix completed!"
