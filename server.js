const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/hospitalUI')));

// Handle Angular routing - return index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/hospitalUI/index.html'));
});

// Get port from environment variable or use default
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

