const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

  // retrieve the url provided as a query parameter
  const url = req.query.url;

  // set content type for json
  res.set('Content-Type', 'application/json');

  try {
    // "forward" the original request to the target and capture response
    const response = await fetch(url);

    if (response.ok) {
      // add header(s) for "wide open cors" (uncomment as needed)
      res.set({
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      });

      // respond to original request with modified response from target
      res.send(await response.text());
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    // error retrieving resource, respond with request dependency error
    res.status(424).send(err);
  }
});

app.listen();
