const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set the correct path to the build directory of your React app
  const buildPath = path.join(__dirname, 'fiske-app', 'build');

  // Serve index.html for all routes
  const indexPath = path.join(buildPath, 'index.html');

  // Check if the requested URL does not match any specific route patterns
  if (!req.url.startsWith('/static/') && !req.url.startsWith('/api/')) {
    serveFile(res, indexPath, 'text/html');
  } else {
    // Serve static files from the build directory
    const filePath = path.join(buildPath, req.url);
    serveFile(res, filePath);
  }
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to serve static files and set appropriate content type
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType || getContentType(filePath) });
      res.end(data);
    }
  });
}

// Helper function to determine content type based on file extension
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    case '.html':
      return 'text/html';
    default:
      return 'text/plain';
  }
}