// import { useTranslation } from 'react-i18next';
// import { useEffect, useState } from 'react';
// import {
//   useParams,
//   useSearchParams,
//   Outlet,
//   useLocation,
// } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.js';

// import Loader from '../../components/Ui/Loader/Loader.jsx';
// import { selectCampers, setCamper } from '../../redux/campers/slice.js';
// import { fetchCamperById } from '../../services/api.js';
// import ScrollToTopButton from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.jsx';
// import scrollToTopButtonCss from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.module.css';
// import css from './PageDetails.module.css';

// function PageDetails() {
//   const { t } = useTranslation();
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
//     if (!_id) {
//       setError('Camper ID is missing.');
//       return;
//     }

//     const setAndStoreCamper = camper => {
//       setLocalCamper(camper);
//       dispatch(setCamper(camper));
//     };

//     const fetchCamperDetails = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const camperFromState = location.state?.camper;
//         if (camperFromState && camperFromState._id === _id) {
//           setAndStoreCamper(camperFromState);
//           return;
//         }

//         const camperFromRedux = campers.find(c => c._id === _id);
//         if (camperFromRedux) {
//           setAndStoreCamper(camperFromRedux);
//           return;
//         }

//         const camper = await fetchCamperById(_id);
//         if (camper) {
//           setAndStoreCamper(camper);
//         } else {
//           setError('Camper not found.');
//         }
//       } catch (err) {
//         setError(err.message || 'Unknown error');
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
//       <div className={css['loader-container']}>
//         <Loader type="container" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className={css.error}>⚠️ Error: {error}</div>;
//   }

//   if (!localCamper) {
//     return <div className={css.error}>⚠️ Camper not found</div>;
//   }

//   return (
//     <div className={css['container-page']}>
//       <Outlet context={{ camper: localCamper, activeTab }} />
//       <ScrollToTopButton
//         visible={visible}
//         onClick={scrollToTop}
//         className={scrollToTopButtonCss['fixed-position']}
//         label={t('up_button', { ns: 'button' })}
//       />
//     </div>
//   );
// }

// export default PageDetails;
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';
import {
  useParams,
  useSearchParams,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.js';

import Loader from '../../components/Ui/Loader/Loader.jsx';
import { selectCampers, setCamper } from '../../redux/campers/slice.js';
import { fetchCamperById } from '../../services/api.js';
import ScrollToTopButton from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.jsx';
import scrollToTopButtonCss from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.module.css';
import css from './PageDetails.module.css';

function PageDetails() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const { _id } = useParams();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'features';

  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const location = useLocation();

  const [localCamper, setLocalCamper] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { visible, scrollToTop } = useWindowScrollToTopButton(300);

  // Функція для встановлення кемпера в локальний стейт та Redux
  const setAndStoreCamper = useCallback(
    camper => {
      setLocalCamper(camper);
      dispatch(setCamper(camper));
    },
    [dispatch]
  );

  // ✅ Оновлена логіка завантаження (Cache + API + Translation)
  const fetchCamperDetails = useCallback(async () => {
    if (!_id) {
      setError('Camper ID is missing.');
      return;
    }

    setError(null);
    let camperToUse = null;
    // ⚠️ ЗМІННА `apiCallNeeded` ВИДАЛЕНА

    // A. Пріоритет: дані з Redux/location.state (для швидкого першого рендерингу)
    const camperFromState = location.state?.camper;
    const camperFromRedux = campers.find(c => c._id === _id);

    if (camperFromState && camperFromState._id === _id) {
      camperToUse = camperFromState;
    } else if (camperFromRedux) {
      camperToUse = camperFromRedux;
    }

    // Якщо ми знайшли дані в кеші, використовуємо їх негайно.
    if (camperToUse) {
      setLocalCamper(camperToUse);
    } else {
      setIsLoading(true); // Показуємо лоадер, якщо немає даних взагалі
    }

    try {
      // B. Виклик API для отримання актуального перекладу та повного об'єкта
      const apiCamper = await fetchCamperById(_id, currentLang);

      if (apiCamper) {
        // Використовуємо дані з API, оскільки вони мають актуальний переклад та повну структуру
        setAndStoreCamper(apiCamper);
      } else if (!camperToUse) {
        // Якщо API не повернуло даних і в кеші нічого немає
        setError('Camper not found.');
      }
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setIsLoading(false);
      setDataLoaded(true);
    }
  }, [_id, currentLang, campers, location.state, setAndStoreCamper]);

  // useEffect запускає завантаження при зміні ID або мови
  useEffect(() => {
    fetchCamperDetails();
  }, [fetchCamperDetails]);

  // Ефект для прокрутки сторінки (без змін)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, activeTab]);

  // Лоадер показуємо лише, якщо дані ще не були завантажені
  if (isLoading && !dataLoaded) {
    return (
      <div className={css['loader-container']}>
        <Loader type="container" />
      </div>
    );
  }

  if (error) {
    return <div className={css.error}>⚠️ Error: {error}</div>;
  }

  if (!localCamper) {
    return <div className={css.error}>⚠️ Camper not found</div>;
  }

  return (
    <div className={css['container-page']}>
      <Outlet context={{ camper: localCamper, activeTab }} />
      <ScrollToTopButton
        visible={visible}
        onClick={scrollToTop}
        className={scrollToTopButtonCss['fixed-position']}
        label={t('up_button', { ns: 'button' })}
      />
    </div>
  );
}

export default PageDetails;
