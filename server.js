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
    '^/api': '/api', // keep the /api prefix
  },
  onProxyReq: (proxyReq, req, res) => {
    // console.log(`Proxying request: ${req.method} ${req.url} -> http://localhost:1234`);
  }
}));

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`🔗 Point Ngrok here: ngrok http --domain=YOUR-DOMAIN ${PORT}\n`);
});
