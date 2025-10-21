# Campus Event Hub - Render.com Deployment Guide (NO CREDIT CARD REQUIRED!)

## 🆓 **Render.com Benefits:**
- **No Credit Card Required** for free tier
- **Generous Free Tier** - Perfect for campus projects
- **Automatic Deployments** from GitHub
- **Built-in SSL** certificates
- **Easy Setup** - Just connect GitHub repo

## 🚀 **Quick Deployment Steps:**

### 1. **Push Your Code to GitHub** (if not done already)
```bash
# In Git Bash
cd /c/Users/Abhishek/Downloads/se_project
git add .
git commit -m "Add Render.com configuration"
git push origin main
```

### 2. **Deploy on Render.com**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (no credit card needed!)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository: `abhishekmarothiya/campus`
5. Configure:
   - **Name**: `campus-event-hub-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
6. Click "Create Web Service"

### 3. **Set Environment Variables** (Optional)
In Render dashboard → Environment:
```
NODE_ENV=production
PORT=10000
```

## 📁 **Files Created for Render:**

### `render.yaml` - Render Configuration
- Service type: Web
- Environment: Node.js
- Plan: Free
- Health check: `/healthz`

### Updated `backend.js`
- Port: 10000 (Render's default)
- Render environment detection
- Optimized for Render's infrastructure

## 💰 **Render.com Free Tier Limits:**
- **750 hours/month** (enough for 24/7 operation)
- **512MB RAM**
- **Sleeps after 15 minutes** of inactivity
- **Wakes up** when accessed (takes ~30 seconds)
- **No credit card required**

## 🔧 **MongoDB Atlas Configuration:**

### Network Access
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (allows all IPs)
3. Save changes

### Connection String
Your app uses:
```
mongodb+srv://abhishekmarothiya072002_db_user:vdHyqmX1RLzyccRu@cluster0.xgxmkt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## 🌟 **Render vs Fly.io Comparison:**

| Feature | Render.com | Fly.io |
|---------|------------|--------|
| **Credit Card** | ❌ Not Required | ✅ Required |
| **Free Tier** | ✅ 750 hours/month | ✅ $5-10 credits |
| **Setup Time** | ⚡ 5 minutes | ⚡ 10 minutes |
| **Performance** | 🟢 Good | 🟢 Excellent |
| **Global CDN** | ❌ Limited | ✅ Global edge |
| **Auto-scaling** | ✅ Yes | ✅ Yes |

## 🎯 **Perfect for Campus Projects:**

### **Why Render is Ideal:**
- **No upfront costs** - Perfect for student projects
- **Easy deployment** - Just connect GitHub
- **Reliable uptime** - Good for campus events
- **Automatic SSL** - Secure HTTPS out of the box
- **MongoDB compatible** - Works perfectly with your setup

### **When to Consider Fly.io Later:**
- If you need **global edge performance**
- If you have **high traffic** requirements
- If you want **more control** over infrastructure

## 📋 **Deployment Checklist:**

- [ ] Code pushed to GitHub
- [ ] Render account created (no credit card)
- [ ] GitHub repository connected
- [ ] Web service created
- [ ] MongoDB Atlas IP whitelisted
- [ ] App deployed and running
- [ ] Health check passing (`/healthz`)

## 🔍 **Monitoring Your App:**

### **Render Dashboard:**
- View logs in real-time
- Monitor resource usage
- Check deployment status
- Manage environment variables

### **Health Check:**
Visit: `https://your-app-name.onrender.com/healthz`
Should return: `{"ok": true}`

## 🚨 **Troubleshooting:**

### **App Not Starting:**
1. Check Render logs
2. Verify MongoDB connection
3. Check environment variables

### **MongoDB Connection Issues:**
1. Verify IP whitelist in MongoDB Atlas
2. Check connection string
3. Test connection locally first

### **Slow Startup:**
- Normal for free tier (sleeps after inactivity)
- First request after sleep takes ~30 seconds
- Subsequent requests are fast

## 🎉 **Success!**

Your Campus Event Hub will be live at:
`https://campus-event-hub-backend.onrender.com`

**No credit card required, completely free!** 🆓

Perfect for campus projects, student portfolios, and learning deployments.
