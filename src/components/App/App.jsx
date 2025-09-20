import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../../components/Ui/Loader/Loader.jsx';
import ThankYouReviewPage from '../../pages/ThankYouReviewPage/ThankYouReviewPage.jsx';
import ThankYouBookingPage from '../../pages/ThankYouBookingPage/ThankYouBookingPage.jsx';

const PageHome = lazy(() => import('../../pages/PageHome/PageHome.jsx'));
const PageCatalog = lazy(
  () => import('../../pages/PageCatalog/PageCatalog.jsx')
);
const PageDetails = lazy(
  () => import('../../pages/PageDetails/PageDetails.jsx')
);
const PageReviews = lazy(
  () => import('../../pages/PageReviews/PageReviews.jsx')
);
const ContentDetails = lazy(
  () => import('../Content/ContentDetails/ContentDetails.jsx')
);
const ContentReviews = lazy(
  () => import('../Content/ContentReviews/ContentReviews.jsx')
);

function App() {
  return (
    <Router>
      {/* Use your custom Loader component as the fallback */}
      <Suspense fallback={<Loader type="container" />}>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/catalog" element={<PageCatalog />} />
          <Route path="/catalog/:_id" element={<PageDetails />}>
            <Route index element={<ContentDetails />} />
            <Route path="/catalog/:_id/reviews" element={<PageReviews />}>
              <Route index element={<ContentReviews />} />
            </Route>
          </Route>
          <Route path="/thank-you" element={<ThankYouReviewPage />} />
          <Route path="/booking-received" element={<ThankYouBookingPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
