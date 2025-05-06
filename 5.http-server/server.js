//mkdir folderName
//cd folderName
//npm init -y
//create a file named server.js



// Import the http module to create the HTTP server
const http = require('http');

// Define the hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Set the response header with status code and content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // Send the response to the client
  res.end('Hello, World!\n');
});

// Make the server listen on the defined port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
