const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (payload, secretKey, expiresIn) => {
  // Sign the token with the payload, secret key, and optional expiration time
  return jwt.sign(payload, secretKey, { expiresIn });
};

module.exports = { generateToken };
