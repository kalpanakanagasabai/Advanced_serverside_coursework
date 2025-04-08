const axios = require('axios');

const getCountryData = async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map(country => ({
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'N/A',
      currency: country.currencies ? Object.values(country.currencies)[0].name : 'N/A',
      languages: country.languages ? Object.values(country.languages) : ['N/A'],
      flag: country.flags[1] // Use the 2nd flag image (SVG)
    }));
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch country data' });
  }
};

module.exports = { getCountryData };
