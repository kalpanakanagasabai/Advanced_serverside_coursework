import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const UsageStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get('/api/usage-report').then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>API Key Usage</h2>
      <ul>
        {stats.map((stat, index) => (
          <li key={index}>
            Key: {stat.api_key}, Used: {stat.usage_count} times, Last Used: {stat.last_used}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsageStats;