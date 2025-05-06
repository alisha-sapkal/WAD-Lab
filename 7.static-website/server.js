// server.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Static website running at http://localhost:${PORT}`);
});
