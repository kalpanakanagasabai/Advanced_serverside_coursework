// const express = require('express');
// const router = express.Router();
// const countryController = require('../controllers/countryController');
// const jwt = require('jsonwebtoken');

// // Middleware to check API Key
// const verifyApiKey = (req, res, next) => {
//   const apiKey = req.header('x-api-key');
//   if (!apiKey) return res.status(401).json({ error: 'API key required' });

//   // Validate API key
//   connection.query('SELECT * FROM api_keys WHERE key = ?', [apiKey], (err, result) => {
//     if (err || result.length === 0) return res.status(403).json({ error: 'Invalid API key' });
//     next();
//   });
// };

// router.get('/data', verifyApiKey, countryController.getCountryData);

// module.exports = router;


const express = require('express');
const axios = require('axios');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const router = express.Router();

// Route to fetch country info
router.get('/info', apiKeyMiddleware, async (req, res) => {
  const countryName = req.query.name;

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = response.data[0];

    const result = {
      name: data.name.common,
      currency: data.currencies ? Object.values(data.currencies)[0].name : 'N/A',
      capital: data.capital ? data.capital[0] : 'N/A',
      languages: data.languages ? Object.values(data.languages).join(', ') : 'N/A',
      flag: data.flags?.png || 'N/A',
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Country not found or error fetching data' });
  }
});

module.exports = router;

