# Campus Event Hub - Fly.io Deployment Guide

## Prerequisites
1. Install Fly.io CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Create Fly.io account: https://fly.io/app/sign-up
3. Login to Fly.io: `fly auth login`

## Deployment Steps

### 1. Initialize Fly.io App
```bash
fly launch --no-deploy
```

### 2. Set Environment Variables (Optional)
```bash
# Set MongoDB URI as environment variable (more secure)
fly secrets set MONGODB_URI="mongodb+srv://abhishekmarothiya072002_db_user:vdHyqmX1RLzyccRu@cluster0.xgxmkt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Set other environment variables if needed
fly secrets set NODE_ENV="production"
```

### 3. Deploy the Application
```bash
fly deploy
```

### 4. Check Deployment Status
```bash
fly status
fly logs
```

### 5. Open Your App
```bash
fly open
```

## Configuration Files Created

### `fly.toml`
- App name: `campus-event-hub-backend`
- Primary region: `bom` (Mumbai for better India performance)
- Port: `8080`
- Memory: `256MB`
- CPU: `1 shared core`

### `Dockerfile`
- Node.js 18 Alpine base image
- Production dependencies only
- Exposes port 8080
- Creates necessary directories

## MongoDB Atlas Configuration

### Network Access
Add Fly.io IP ranges to your MongoDB Atlas Network Access:
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (for development) or specific Fly.io IPs
3. Save changes

### Connection String
The app uses your MongoDB Atlas connection:
```
mongodb+srv://abhishekmarothiya072002_db_user:vdHyqmX1RLzyccRu@cluster0.xgxmkt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## Useful Fly.io Commands

```bash
# View app status
fly status

# View logs
fly logs

# SSH into the machine
fly ssh console

# Scale the app
fly scale count 1

# Set secrets
fly secrets set KEY=value

# View secrets
fly secrets list

# Deploy new version
fly deploy

# Open app in browser
fly open

# Stop the app
fly scale count 0

# Start the app
fly scale count 1
```

## Performance Features

### Global Edge Deployment
- Your app will be deployed globally for low latency
- Automatic HTTPS with Let's Encrypt certificates
- Auto-scaling based on traffic

### File Storage
- Uses MongoDB GridFS for media storage
- Persistent data storage across deployments
- Automatic backup and recovery

## Monitoring

### Health Checks
- Built-in health endpoint: `/healthz`
- Automatic restart on failures
- Real-time monitoring dashboard

### Logs
- Real-time log streaming
- Structured logging with timestamps
- Error tracking and debugging

## Cost Optimization

### Auto-scaling
- Machines start/stop automatically based on traffic
- Pay only for what you use
- Minimum machines: 0 (saves costs)

### Resource Limits
- Memory: 256MB (sufficient for your app)
- CPU: 1 shared core
- Storage: Uses MongoDB Atlas (no local storage costs)

## Troubleshooting

### Common Issues
1. **MongoDB Connection Failed**: Check Network Access settings
2. **Deployment Failed**: Check `fly logs` for errors
3. **App Not Starting**: Verify environment variables

### Debug Commands
```bash
# Check app status
fly status

# View recent logs
fly logs --tail

# SSH into machine for debugging
fly ssh console

# Check machine details
fly machine list
```

## Production Considerations

### Security
- Use environment variables for sensitive data
- Enable MongoDB Atlas IP whitelisting
- Regular security updates

### Performance
- Monitor resource usage
- Optimize database queries
- Use CDN for static assets

### Backup
- MongoDB Atlas provides automatic backups
- Regular data exports recommended
- Test restore procedures

Your Campus Event Hub is now ready for Fly.io deployment! 🚀
