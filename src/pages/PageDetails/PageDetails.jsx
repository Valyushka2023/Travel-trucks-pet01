// import { useEffect, useState } from 'react';
// import {
//   useParams,
//   useSearchParams,
//   Outlet,
//   useLocation,
// } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { ClipLoader } from 'react-spinners';
// import { selectCampers, setCamper } from '../../redux/campers/slice.js';
// import { fetchCampers } from '../../services/api.js';
// import ScrollToTopButton from '../../components/Ui/Button/ScrollToTopButton.jsx';
// import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.jsx';
// import scrollToTopButtonCss from '../../components/Ui/Button/ScrollToTopButton.module.css';
// import css from './PageDetails.module.css';

// function PageDetails() {
//   const { _id } = useParams();
//   const [searchParams] = useSearchParams();
//   const activeTab = searchParams.get('tab') || 'features';

//   const dispatch = useDispatch();
//   const campers = useSelector(selectCampers);
//   const location = useLocation();

//   const [localCamper, setLocalCamper] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { visible, scrollToTop } = useWindowScrollToTopButton(300);

//   useEffect(() => {
//     const fetchCamperDetails = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const camperFromState = location.state?.camper;
//         if (camperFromState && camperFromState._id === _id) {
//           setLocalCamper(camperFromState);
//           dispatch(setCamper(camperFromState));
//           setIsLoading(false);
//           return;
//         }

//         const camperFromRedux = campers.find(camper => camper._id === _id);
//         if (camperFromRedux) {
//           setLocalCamper(camperFromRedux);
//           dispatch(setCamper(camperFromRedux));
//           setIsLoading(false);
//           return;
//         }

//         if (!_id) {
//           setError('ID кемпера не заданий.');
//           setIsLoading(false);
//           return;
//         }

//         const fetchedCampers = await fetchCampers({ id: _id });
//         if (fetchedCampers?.length > 0) {
//           const camper = fetchedCampers[0];
//           setLocalCamper(camper);
//           dispatch(setCamper(camper));
//         } else {
//           setError('Camper not found');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCamperDetails();
//   }, [_id, dispatch, campers, location.state]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname, activeTab]);

//   if (isLoading) {
//     return (
//       <div className={css.loaderContainer}>
//         <ClipLoader color="#36D7B7" size={50} />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className={css.error}>Error: {error}</div>;
//   }

//   if (!localCamper) {
//     return <div className={css.error}>⚠️ Camper not found.</div>;
//   }

//   return (
//     <div>
//       <Outlet context={{ camper: localCamper, activeTab }} />
//       <ScrollToTopButton
//         visible={visible}
//         onClick={scrollToTop}
//         className={scrollToTopButtonCss.fixedPosition}
//       />
//     </div>
//   );
// }
// export default PageDetails;
import { useEffect, useState } from 'react';
import {
  useParams,
  useSearchParams,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { selectCampers, setCamper } from '../../redux/campers/slice.js';
import { fetchCamperById } from '../../services/api.js'; // ← уточнена функція
import ScrollToTopButton from '../../components/Ui/Button/ScrollToTopButton.jsx';
import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.jsx';
import scrollToTopButtonCss from '../../components/Ui/Button/ScrollToTopButton.module.css';
import css from './PageDetails.module.css';

function PageDetails() {
  const { _id } = useParams();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'features';

  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const location = useLocation();

  const [localCamper, setLocalCamper] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { visible, scrollToTop } = useWindowScrollToTopButton(300);

  useEffect(() => {
    if (!_id) {
      setError('Camper ID is missing.');
      return;
    }

    const setAndStoreCamper = camper => {
      setLocalCamper(camper);
      dispatch(setCamper(camper));
    };

    const fetchCamperDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const camperFromState = location.state?.camper;
        if (camperFromState && camperFromState._id === _id) {
          setAndStoreCamper(camperFromState);
          return;
        }

        const camperFromRedux = campers.find(c => c._id === _id);
        if (camperFromRedux) {
          setAndStoreCamper(camperFromRedux);
          return;
        }

        const camper = await fetchCamperById(_id);
        if (camper) {
          setAndStoreCamper(camper);
        } else {
          setError('Camper not found.');
        }
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCamperDetails();
  }, [_id, dispatch, campers, location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, activeTab]);

  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <ClipLoader color="#36D7B7" size={50} />
      </div>
    );
  }

  if (error) {
    return <div className={css.error}>⚠️ Error: {error}</div>;
  }

  if (!localCamper) {
    return <div className={css.error}>⚠️ Camper not found.</div>;
  }

  return (
    <div>
      <Outlet context={{ camper: localCamper, activeTab }} />
      <ScrollToTopButton
        visible={visible}
        onClick={scrollToTop}
        className={scrollToTopButtonCss.fixedPosition}
      />
    </div>
  );
}

export default PageDetails;
