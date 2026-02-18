const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Proxy API requests to LM Studio (running on port 1234)
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:1234', // LM Studio default port
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api', // keep the /api prefix, or remove if LM studio doesn't need it. 
                     // LM Studio usually expects /v1/chat/completions, so we might need to adjust based on how script.js calls it.
                     // Script currently calls `${BASE_URL}api/v0/completions`.
                     // If BASE_URL is '/', it becomes `/api/v0/completions`.
                     // So we just forward everything starting with /api to localhost:1234.
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add CORS headers just in case, though LM Studio handles it usually
    // console.log(`Proxying request: ${req.method} ${req.url} -> http://localhost:1234`);
  }
}));

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`🔗 Point Ngrok here: ngrok http --domain=YOUR-DOMAIN ${PORT}\n`);
});
