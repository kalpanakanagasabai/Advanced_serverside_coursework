// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import LoginComponent from './components/LoginComponent';
// import RegisterComponent from './components/RegisterComponent';
// import GetCountryData from './components/GetCountryData';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//           <Link to="/country-data">Country Data</Link>
//         </nav>

//         <Routes>
//           <Route path="/login" element={<LoginComponent />} />
//           <Route path="/register" element={<RegisterComponent />} />
//           <Route path="/country-data" element={<GetCountryData />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import GetCountryData from './components/GetCountryData';
import GenerateApiKey from './components/GenerateApiKey'; // Import the new GenerateApiKey component

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/country-data">Country Data</Link>
          <Link to="/generate-api-key">Generate API Key</Link> {/* Added link to Generate API Key */}
        </nav>

        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/country-data" element={<GetCountryData />} />
          <Route path="/generate-api-key" element={<GenerateApiKey />} /> {/* Added the route for Generate API Key */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
