require('dotenv').config(); // Load environment variables from .env file
let PORT = 5000
const express = require('express'); // Import Express framework
const https = require('https'); // Import HTTPS module for creating secure servers
const fs = require('fs'); // Import File System module for reading files
const path = require('path'); // Import Path module for handling file paths

const app = express(); // Initialize Express application

const helmet = require('helmet'); // Import Helmet for securing HTTP headers
const rateLimit = require('express-rate-limit'); // Import rate limiter for request throttling

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.' // Rate limit exceeded message
});

// Create an HTTPS server with SSL/TLS encryption
const sslserver = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), // Read private key
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'certificate.pem')), // Read certificate
}, app);

// Middleware for parsing query parameters
const { queryParser } = require('express-query-parser');
app.use(queryParser({
  parseNull: true, // Parse null values in query parameters
  parseBoolean: true // Parse boolean values in query parameters
}));

const morgan = require('morgan'); // Import Morgan for HTTP request logging
app.use(morgan('dev')); // Use Morgan for development logging

app.use(limiter); // Apply rate limiting middleware
app.use(helmet()); // Apply Helmet for securing HTTP headers
app.disable('x-powered-by'); // Disable X-Powered-By header to avoid revealing server details

app.use(express.json()); // Middleware for parsing JSON request bodies

// Define routes for various services
app.use("/EmailServices", require("./Routes/Email"));
app.use("/ImageRecogServices", require("./Routes/ImageRecognition"));
app.use("/NLPServices", require("./Routes/NLP"));
app.use("/dataSecurityServices", require("./Routes/Security"));
app.use("/DM", require("./Routes/DataManagement"));
app.use("/databaseOperations", require("./Routes/DyanmoDbCrud"));

// Route to set AWS credentials
app.post("/set-aws-credentials", (req, res) => {
  const { createClient, encryptData } = require("./Data_Security");
  createClient(req,res); // Initialize KMS client

  // Encrypt AWS credentials
  let region = encryptData(req.body.AWS_REGION);
  let accessKeyId = encryptData(req.body.AWS_ACCESS_KEY_ID);
  let secretAccessKey = encryptData(req.body.AWS_SECRET_ACCESS_KEY);

  // Update environment variables in memory
  process.env.AWS_REGION = region;
  process.env.AWS_ACCESS_KEY_ID = accessKeyId;
  process.env.AWS_SECRET_ACCESS_KEY = secretAccessKey;
  process.env.PORT = req.body.PORT;

  // Persist encrypted environment variables to .env file
  const envVariables = `
  AWS_REGION=${region}
  AWS_ACCESS_KEY_ID=${accessKeyId}
  AWS_SECRET_ACCESS_KEY=${secretAccessKey}
   process.env.PORT = ${req.body.PORT};
  `;
PORT=process.env.PORT || 5000
  fs.writeFileSync(".env", envVariables); // Write to .env file

  res.status(200).send("AWS credentials have been set successfully"); // Send success response
});

// Start the HTTPS server on port 5000
sslserver.listen(PORT, () => {
  console.log(`My application is running at ${PORT}`); // Log server start message
});
