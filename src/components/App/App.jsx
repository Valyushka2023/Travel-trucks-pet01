import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogPage from '../../pages/CatalogPage/CatalogPage.jsx';
import CamperDetailsPage from '../../pages/CamperDetailsPage/CamperDetailsPage.jsx';
import CamperReviewsPage from '../../pages/CamperReviewsPage/CamperReviewsPage.jsx';
import CamperDetailsContent from '../../components/CamperDetailsContent/CamperDetailsContent.jsx';
import CamperReviewsContent from '../../components/CamperReviewsContent/CamperReviewsContent.jsx';
import HomePage from '../../pages/HomePage/HomePage.jsx'; 
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/catalog/:id" element={<CamperDetailsPage />}>
                    <Route index element={<CamperDetailsContent />} /> {/* Головний вміст */}
                    <Route path="reviews" element={<CamperReviewsPage />}>
                        <Route index element={<CamperReviewsContent />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

