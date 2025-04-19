// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let blockedSites = [
  { id: 1, domain: 'facebook.com', category: 'Social Media', blockedCount: 12 },
  { id: 2, domain: 'twitter.com', category: 'Social Media', blockedCount: 8 },
  { id: 3, domain: 'youtube.com', category: 'Entertainment', blockedCount: 15 },
  { id: 4, domain: 'reddit.com', category: 'Social Media', blockedCount: 5 },
  { id: 5, domain: 'amazon.com', category: 'Shopping', blockedCount: 3 },
];

// Get all blocked sites
app.get('/api/blocked-sites', (req, res) => {
  res.json(blockedSites);
});

// Add new blocked site
app.post('/api/blocked-sites', (req, res) => {
  const { domain, category } = req.body;
  const newSite = {
    id: blockedSites.length + 1,
    domain,
    category: category || 'Uncategorized',
    blockedCount: 0
  };
  blockedSites.push(newSite);
  res.status(201).json(newSite);
});

// Remove blocked site
app.delete('/api/blocked-sites/:id', (req, res) => {
  const id = parseInt(req.params.id);
  blockedSites = blockedSites.filter(site => site.id !== id);
  res.status(204).send();
});

// Proxy endpoint that checks if URL is blocked
app.post('/api/check-blocked', (req, res) => {
  const { url } = req.body;
  const domain = new URL(url).hostname;
  
  const isBlocked = blockedSites.some(site => 
    domain.includes(site.domain) || 
    site.domain.includes(domain)
  );
  
  res.json({ blocked: isBlocked });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});