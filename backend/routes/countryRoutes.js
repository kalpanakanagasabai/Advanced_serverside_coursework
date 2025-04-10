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

