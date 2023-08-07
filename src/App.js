import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import MovieForm from './components/MovieForm';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/details/:showId" element={<ShowDetails />} />
          <Route path="/form/:showId" element={<MovieForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
