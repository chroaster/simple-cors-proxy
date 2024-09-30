const express = require('express');
const https = require('node:https');
const http = require('node:http');
const url = require('node:url');

const app = express();

// provide a port number in environment or use default
const PORT = process.env.SIMPLE_CORS_PROXY_PORT || 8371;

// parse urlencoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  // retrieve the url provided as a query parameter
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const parsedUrl = url.parse(targetUrl);
  const protocol = parsedUrl.protocol === 'https:' ? https : http;

  const request = protocol.get(targetUrl, (response) => {
    // set content type based on the response from the target URL
    res.set('Content-Type', response.headers['content-type'] || 'application/json');

    // add header(s) for "wide open cors"
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });

    if (response.statusCode >= 200 && response.statusCode < 300) {
      // respond to original request with modified response from target
      response.pipe(res);
    } else {
      res.status(response.statusCode).json({ error: `${response.statusCode} ${response.statusMessage}` });
    }
  });

  request.on('error', (err) => {
    // error retrieving resource, respond with request dependency error
    res.status(424).json({ error: err.message });
  });

  request.end();
});

app.listen(PORT, () => {
  console.log(`CORS Proxy is running on port ${PORT}`);
});
