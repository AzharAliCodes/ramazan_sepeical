import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Boys from './pages/Boys';
import Girls from './pages/Girls';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/boys" replace />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
