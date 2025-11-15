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

  const setAndStoreCamper = useCallback(
    camper => {
      setLocalCamper(camper);
      dispatch(setCamper(camper));
    },
    [dispatch]
  );

  const fetchCamperDetails = useCallback(async () => {
    if (!_id) {
      setError('Camper ID is missing.');
      return;
    }

    setError(null);
    let camperToUse = null;

    const camperFromState = location.state?.camper;
    const camperFromRedux = campers.find(c => c._id === _id);

    if (camperFromState && camperFromState._id === _id) {
      camperToUse = camperFromState;
    } else if (camperFromRedux) {
      camperToUse = camperFromRedux;
    }

    if (camperToUse) {
      setLocalCamper(camperToUse);
    } else {
      setIsLoading(true);
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
