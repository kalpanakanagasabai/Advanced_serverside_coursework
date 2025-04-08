// const db = require('../db');

// const apiKeyAuth = (req, res, next) => {
//   const apiKey = req.headers['api-key'];
//   if (!apiKey) return res.status(400).json({ message: 'API key required' });

//   db.query('SELECT * FROM api_keys WHERE api_key = ?', [apiKey], (err, results) => {
//     if (err || results.length === 0)
//       return res.status(401).json({ message: 'Invalid API key' });

//     const record = results[0];
//     req.userId = record.user_id;

//     db.query('UPDATE api_keys SET usage_count = usage_count + 1, last_used = NOW() WHERE api_key = ?', [apiKey]);
//     next();
//   });
// };

// module.exports = apiKeyAuth;
