const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const distPath = path.join(__dirname, 'dist/hospitalUI');
const indexHtmlPath = path.join(distPath, 'index.html');

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error(`ERROR: Build directory not found at ${distPath}`);
  console.error('Please run "npm run build" before starting the server.');
  process.exit(1);
}

if (!fs.existsSync(indexHtmlPath)) {
  console.error(`ERROR: index.html not found at ${indexHtmlPath}`);
  console.error('Please run "npm run build" before starting the server.');
  process.exit(1);
}

// Serve static files from the Angular app
app.use(express.static(distPath));

// Handle Angular routing - return index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(indexHtmlPath);
});

// Get port from environment variable or use default
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from ${distPath}`);
});

