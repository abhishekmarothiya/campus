#!/bin/bash

# Comprehensive fix for ALL remaining Cloudflare Pages Functions
echo "🔧 Fixing ALL remaining Cloudflare Pages Functions..."

# List of files that still need fixing
files=(
  "functions/api/admin/messages.js"
  "functions/api/error-logging.js"
  "functions/api/realtime-updates.js"
  "functions/api/session.js"
  "functions/api/message-search.js"
  "functions/api/media-search.js"
  "functions/api/event-search.js"
  "functions/api/user-search.js"
  "functions/api/popular-events.js"
  "functions/api/attendance-reports.js"
  "functions/api/admin/backups.js"
  "functions/api/admin/logs.js"
  "functions/api/notification-settings.js"
  "functions/api/event-analytics.js"
  "functions/api/dashboard.js"
  "functions/api/admin/volunteers/[id]/approve.js"
  "functions/api/admin/events/[id]/approve.js"
  "functions/api/events/[id]/status.js"
  "functions/api/admin/notifications.js"
  "functions/api/admin/media.js"
  "functions/api/admin/organizers.js"
  "functions/api/export-bookings.js"
  "functions/api/booking-stats.js"
  "functions/api/events-venue/[venue].js"
  "functions/api/events-date/[date].js"
  "functions/api/categories/[category].js"
  "functions/api/media/[id].js"
  "functions/api/messages/[id].js"
  "functions/api/notifications/[id].js"
  "functions/api/volunteers/[id].js"
  "functions/api/waitlist.js"
  "functions/api/bookings/[id].js"
  "functions/api/bookings-user.js"
  "functions/api/events/[id].js"
  "functions/api/events-search.js"
  "functions/api/profile.js"
  "functions/api/messages.js"
  "functions/api/notifications.js"
  "functions/api/volunteers.js"
)

# Function to fix URL parsing in a file
fix_file() {
  local file="$1"
  if [ -f "$file" ]; then
    echo "Fixing: $file"
    
    # Replace new URL(request.url) with simple string splitting
    sed -i 's/const url = new URL(request\.url);/const urlPath = request.url; const pathParts = urlPath.split("\/");/' "$file"
    sed -i 's/const \([a-zA-Z_][a-zA-Z0-9_]*\) = url\.pathname\.split("\/")\.pop();/const \1 = pathParts[pathParts.length - 1];/' "$file"
    sed -i 's/const \([a-zA-Z_][a-zA-Z0-9_]*\) = url\.searchParams\.get("\([^"]*\)");/const \1 = pathParts.includes("\2") ? pathParts[pathParts.indexOf("\2") + 1] : null;/' "$file"
    
    # Fix request.json() calls
    sed -i 's/const body = await request\.json();/let body; try { if (typeof request.json === "function") { body = await request.json(); } else if (typeof request.text === "function") { const text = await request.text(); body = JSON.parse(text); } else { const arrayBuffer = await request.arrayBuffer(); const text = new TextDecoder().decode(arrayBuffer); body = JSON.parse(text); } } catch (parseError) { return new Response(JSON.stringify({ ok: false, error: "Invalid request format" }), { status: 400, headers: { "Content-Type": "application\/json", ...corsHeaders } }); }/' "$file"
  else
    echo "File not found: $file"
  fi
}

# Fix all files
for file in "${files[@]}"; do
  fix_file "$file"
done

echo "✅ All files fixed!"
