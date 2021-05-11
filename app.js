const express = require('express');
const fetch = require('node-fetch');

const app = express();

// provide a port number in environment or use default
const port = process.env.SIMPLE_CORS_PROXY_PORT || 8371;

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

  // retrieve the url provided as a query parameter
  const url = req.query.url;

  // "forward" the fetch request and return the response
  try {
    const response = await fetch(url);
    if (response.ok) {
      // add cors header for "wide open cors" (uncomment as needed)
      res.header('Access-Control-Allow-Origin', '*');
      // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

      // send the response from the target with the added cors headers
      res.send(await response.text());
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    // error retrieving resource, respond with request dependency error
    res.status(424).send();
  }
});

app.listen(port);
