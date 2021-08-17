const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();
const port = process.env.PORT || 2000;

app.use(cors({ origin: '*' }));

app.get("/items", async (req, res) => {
  const inputValue = req.query;
  console.log(inputValue);
  const SEARCH_URL = `https://api.mercadolibre.com/sites/MLA/search?q=${inputValue}`;

  https.get(`${SEARCH_URL}`, (response) => {
    const dataChunks = [];
    response.on('data', function (chunk) {
      dataChunks.push(chunk);
    });

    response.on('end', () => {
      const data = Buffer.concat(dataChunks);
      const searchData = JSON.parse(data);
      const results = searchData.results;
      const firstFourObjects = [];
      for (i = 0; i <= 3; i++) {
        firstFourObjects.push(results[i]);
      };
      res.send(firstFourObjects)
    });
  });
});


app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});