const express = require('express');
const { StreamVideoServerClient } = require('@stream-io/video-node');

const app = express();
const port = 3002;

const apiKey = '38jem57dj4av';
const apiSecret = 'nzz66egzedbq4e9m5v92mztqeu9xtgm3h56q5x9m7fmx6tzxqsfnvjpvrqmhn2dp'; // Replace with your actual secret

const serverClient = new StreamVideoServerClient({ apiKey, secret: apiSecret });

app.get('/generate-token', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).send('Missing userId');

  const token = serverClient.createToken(userId);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Token server running at http://localhost:${port}`);
});
