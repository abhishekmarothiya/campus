# Cloudflare Pages Environment Variables

## Required Environment Variables
Set these in Cloudflare Pages dashboard → Settings → Environment Variables:

### MongoDB Configuration
```
MONGODB_URI=mongodb+srv://abhishekmarothiya072002_db_user:vdHyqmX1RLzyccRu@cluster0.xgxmkt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### Application Settings
```
NODE_ENV=production
PORT=8787
CF_PAGES=1
```

## Optional Environment Variables
```
CF_PAGES_PERSISTENT_DISK=false
DATA_FILE=/tmp/data.json
UPLOAD_DIR=/tmp/uploads
BACKUP_DIR=/tmp/backups
```

## MongoDB Atlas Network Access
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (allows all IPs)
3. Save changes

## Serverless Optimizations Applied
- Single connection pool for serverless environment
- Shorter timeouts for faster cold starts
- Background index creation
- Optimized GridFS chunk size
- Retryable writes and reads enabled
