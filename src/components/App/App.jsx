import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import CatalogPage from '../../pages/CatalogPage/CatalogPage.jsx';
import CamperDetailsPage from '../../pages/CamperDetailsPage/CamperDetailsPage.jsx';
import CamperReviewsPage from '../../pages/CamperReviewsPage/CamperReviewsPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailsPage />} />
      <Route path="/catalog/:id/reviews" element={<CamperReviewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

