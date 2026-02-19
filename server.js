const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Proxy API requests to LM Studio (running on port 1234)
app.use('/api', createProxyMiddleware({
  target: 'http://127.0.0.1:1234', // LM Studio default port (IPv4)
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding to LM Studio
  },
  onProxyReq: (proxyReq, req, res) => {
    // console.log(`Proxying request: ${req.method} ${req.url} -> http://127.0.0.1:1234`);
  }
}));

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`🔗 Point Ngrok here: ngrok http --domain=YOUR-DOMAIN ${PORT}\n`);
});
