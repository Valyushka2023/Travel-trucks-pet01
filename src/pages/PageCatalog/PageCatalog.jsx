import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.js';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive'; // <--- ДОДАНО: Для визначення брейкпоінта
import {
  selectCampers,
  selectIsLoading,
  selectError,
} from '../../redux/campers/selectors.js';
import { getCampers } from '../../redux/campers/operations.js';

import Header from '../../components/Header/Header.jsx';
import Button from '../../components/Ui/Buttons/BaseButton/Button.jsx';
import ScrollToTopButton from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.jsx';

import scrollToTopButtonCss from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.module.css';
import FilterLocation from '../../components/Filters/FilterLocation/FilterLocation.jsx';
import FilterVehicleEquipment from '../../components/Filters/FilterEquipment/FilterVehicleEquipment.jsx';
import FilterVehicleType from '../../components/Filters/FilterType/FilterVehicleType.jsx';
import CardList from '../../components/CardList/CardList.jsx';

import ErrorComponent from '../../components/ErrorComponent/ErrorComponent.jsx';
import Loader from '../../components/Ui/Loader/Loader.jsx';

import css from './PageCatalog.module.css';

function PageCatalog() {
  const { t: tCatalog } = useTranslation('catalog');
  const { t: tButton } = useTranslation('button');
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const topRef = useRef(null);
  const firstCardRef = useRef(null); // <--- НОВИЙ РЕФ для першого кемпера

  // Перевірка, чи екран менший за 1440px (тобто < 1440px)
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 }); // <--- НОВА ЛОГІКА

  const { visible } = useWindowScrollToTopButton(300);
  const dispatch = useDispatch();

  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [visibleCampers, setVisibleCampers] = useState([]);
  const [loadedCount, setLoadedCount] = useState(4);
  const [currentLocationFilter, setCurrentLocationFilter] = useState('all');
  const [currentEquipmentFilters, setCurrentEquipmentFilters] = useState({});
  const [currentTypeFilters, setCurrentTypeFilters] = useState({});
  const [activeLocationFilter, setActiveLocationFilter] = useState('all');
  const [activeEquipmentFilters, setActiveEquipmentFilters] = useState({});
  const [activeTypeFilters, setActiveTypeFilters] = useState({});

  useEffect(() => {
    dispatch(getCampers(currentLang));
  }, [dispatch, currentLang]);

  const filteredCampers = useMemo(() => {
    if (!campers || campers.length === 0) return [];
    let result = campers;

    if (activeLocationFilter !== 'all') {
      result = result.filter(
        camper => camper.location === activeLocationFilter
      );
    }
    result = result.filter(camper => {
      for (const filterName in activeEquipmentFilters) {
        const activeValue = activeEquipmentFilters[filterName];
        if (activeValue == null) continue;
        if (typeof activeValue === 'boolean') {
          if (!camper[filterName]) return false;
        } else if (typeof activeValue === 'string') {
          if (camper[filterName] !== activeValue) return false;
        }
      }
      return true;
    });
    if (Object.keys(activeTypeFilters).some(key => activeTypeFilters[key])) {
      result = result.filter(camper => activeTypeFilters[camper.form]);
    }
    return result;
  }, [
    campers,
    activeLocationFilter,
    activeEquipmentFilters,
    activeTypeFilters,
  ]);

  useEffect(() => {
    setVisibleCampers(filteredCampers.slice(0, loadedCount));
  }, [filteredCampers, loadedCount]);

  const handleLocationChange = newLocation => {
    setCurrentLocationFilter(newLocation);
    setActiveLocationFilter(newLocation);
    setCurrentEquipmentFilters({});
    setCurrentTypeFilters({});
    setActiveEquipmentFilters({});
    setActiveTypeFilters({});
    setLoadedCount(4);

    // Визначаємо, куди прокручувати. Зміна локації завжди прокручує до верху.
    const targetRef = topRef;

    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 50);
  };

  const handleEquipmentFilterChange = filters => {
    setCurrentEquipmentFilters(filters);
  };

  const handleTypeFilterChange = filters => {
    setCurrentTypeFilters(filters);
  };

  const handleSearchClick = () => {
    // <--- ЗМІНЕНА ЛОГІКА ПРОКРУТКИ ТУТ
    setActiveEquipmentFilters(currentEquipmentFilters);
    setActiveTypeFilters(currentTypeFilters);
    setLoadedCount(4);

    // Визначаємо реф для прокрутки:
    // topRef - для широких екранів (>= 1440px)
    // firstCardRef - для малих екранів (< 1440px)
    const targetRef = isSmallScreen ? firstCardRef : topRef;

    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 50);
  };

  const handleClearFilters = () => {
    setCurrentLocationFilter('all');
    setCurrentEquipmentFilters({});
    setCurrentTypeFilters({});
    setActiveLocationFilter('all');
    setActiveEquipmentFilters({});
    setActiveTypeFilters({});
    setLoadedCount(4);

    // При очищенні фільтрів прокручуємо до верху сторінки
    const targetRef = topRef;

    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 50);
  };

  const handleRetry = () => {
    dispatch(getCampers(currentLang));
  };

  const handleLoadMore = () => {
    const prevScrollY = window.scrollY;
    setLoadedCount(prevCount => prevCount + 4);
    setTimeout(() => {
      window.scrollTo({
        top: prevScrollY + window.innerHeight * 0.7,
        behavior: 'smooth',
      });
    }, 100);
  };

  // Ця функція використовується для кнопки "Scroll to Top", і вона має прокручувати до верху сторінки.
  const handleScrollToTopAndReset = () => {
    setLoadedCount(4);
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 50);
  };

  return (
    <div className={css['container-page']}>
      <div ref={topRef} />
      <div className={css.container}>
        <Header />
        <div className={css['container-catalog']}>
          <div className={css['container-filters']}>
            <h4 className={css['location-title']}>
              {tCatalog('location_title')}
            </h4>
            <FilterLocation
              campers={campers}
              setLocation={handleLocationChange}
              location={currentLocationFilter}
            />
            <h4 className={css['filter-title']}>{tCatalog('filters_title')}</h4>
            <FilterVehicleEquipment
              onFilter={handleEquipmentFilterChange}
              currentFilters={currentEquipmentFilters}
            />
            <FilterVehicleType
              onFilter={handleTypeFilterChange}
              currentFilters={currentTypeFilters}
            />
            <div className={css['filter-buttons-container']}>
              <Button
                variant="primary"
                size="medium"
                onClick={handleSearchClick}
              >
                {tCatalog('filter_out_button')}
              </Button>
              {(Object.keys(currentEquipmentFilters).some(
                key => currentEquipmentFilters[key]
              ) ||
                Object.keys(currentTypeFilters).some(
                  key => currentTypeFilters[key]
                ) ||
                currentLocationFilter !== 'all') && (
                <Button
                  variant="primary"
                  size="medium"
                  onClick={handleClearFilters}
                  className={css['clear-filters-button']}
                >
                  {tCatalog('clear_filters_button')}
                </Button>
              )}
            </div>
          </div>
          <div className={css['container-cards']}>
            {isLoading ? (
              <Loader type="container" />
            ) : error ? (
              <ErrorComponent error={error} onRetry={handleRetry} />
            ) : visibleCampers.length > 0 ? (
              <>
                <CardList
                  campers={visibleCampers}
                  firstCardRef={firstCardRef} // <--- ПЕРЕДАЧА РЕФУ
                />
                {loadedCount < filteredCampers.length && (
                  <div className={css['container-load-more']}>
                    <Button
                      variant="default"
                      size="small"
                      onClick={handleLoadMore}
                    >
                      {tButton('load_button')}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className={css['no-results-message']}>
                {tCatalog('no_campers_message')}
              </div>
            )}
          </div>
        </div>
        <ScrollToTopButton
          visible={visible}
          onClick={handleScrollToTopAndReset}
          className={scrollToTopButtonCss['fixed-position']}
          label={tButton('up_button')}
        />
      </div>
    </div>
  );
}

export default PageCatalog;
