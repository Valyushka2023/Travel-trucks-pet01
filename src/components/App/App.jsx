import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
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
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <ClipLoader color="#36D7B7" size={50} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/catalog" element={<PageCatalog />} />
          <Route path="/catalog/:_id" element={<PageDetails />}>
            <Route index element={<ContentDetails />} />
            <Route path="/catalog/:_id/reviews" element={<PageReviews />}>
              <Route index element={<ContentReviews />} />
            </Route>
          </Route>
          <Route path="/thank-you" element={<ThankYouReviewPage />} />{' '}
          {/* Доданий маршрут для ThankYouReviewPage */}
          <Route
            path="/booking-received"
            element={<ThankYouBookingPage />}
          />{' '}
          {/* ✅ Новий маршрут */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
