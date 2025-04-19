// proxy.js
const express = require('express');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const API_URL = 'http://localhost:3001';

// Check if URL is blocked before proxying
app.use(async (req, res, next) => {
  try {
    const response = await axios.post(`${API_URL}/api/check-blocked`, {
      url: req.url
    });
    
    if (response.data.blocked) {
      return res.status(403).send(`
        <html>
          <body style="background: #111827; color: white; padding: 2rem;">
            <h1>Website Blocked</h1>
            <p>${req.url} has been blocked by HocusFocus.</p>
          </body>
        </html>
      `);
    }
    next();
  } catch (error) {
    console.error('Error checking blocked status:', error);
    next();
  }
});

// Proxy all other requests
app.use('/', createProxyMiddleware({
  target: 'https://chatgpt.com/', // This would be dynamic in real implementation
  changeOrigin: true,
}));

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});