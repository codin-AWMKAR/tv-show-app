import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import MovieForm from './components/MovieForm';
import Navbar from './Navbar';
import './App.css'; // Import your CSS file for additional styling

const App = () => {
  return (
    <div className="app-container"> {/* Added a CSS class for styling */}
      <Navbar /> {/* Render the Navbar component */}
      <Router>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<ShowList />} /> {/* Render ShowList component on root path */}
          <Route path="/details/:showId" element={<ShowDetails />} /> {/* Render ShowDetails component */}
          <Route path="/form/:showId" element={<MovieForm />} /> {/* Render MovieForm component */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;

