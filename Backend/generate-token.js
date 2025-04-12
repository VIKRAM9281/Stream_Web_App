// generate-token.js
const { StreamVideoServerClient } = require('@stream-io/video-node-sdk');

const apiKey = "your-api-key";
const secret = "your-api-secret";
const userId = "user-123";

const serverClient = new StreamVideoServerClient({ apiKey, apiSecret: secret });
const token = serverClient.createToken(userId);

console.log("Token:", token);
