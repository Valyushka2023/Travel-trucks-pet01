import { useTranslation } from 'react-i18next';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.js';
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
  const { t } = useTranslation(); // Використання хука

  const topRef = useRef(null);
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
    dispatch(getCampers());
  }, [dispatch]);

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
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({
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
    setActiveEquipmentFilters(currentEquipmentFilters);
    setActiveTypeFilters(currentTypeFilters);
    setLoadedCount(4);
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({
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
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 50);
  };
  const handleRetry = () => {
    dispatch(getCampers());
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
    <div className={css.containerPage}>
      <div ref={topRef} />
      <div className={css.container}>
        <Header />
        <div className={css.containerCatalog}>
          <div className={css.containerFilters}>
            <h4 className={css.locationTitle}>
              {t('location_title', { ns: 'catalog' })}
            </h4>
            <FilterLocation
              campers={campers}
              setLocation={handleLocationChange}
              location={currentLocationFilter}
            />
            <h4 className={css.filterTitle}>
              {t('filters_title', { ns: 'catalog' })}
            </h4>
            <FilterVehicleEquipment
              onFilter={handleEquipmentFilterChange}
              currentFilters={currentEquipmentFilters}
            />
            <FilterVehicleType
              onFilter={handleTypeFilterChange}
              currentFilters={currentTypeFilters}
            />
            <div className={css.filterButtonsContainer}>
              <Button
                variant="primary"
                size="medium"
                onClick={handleSearchClick}
              >
                {t('filter_out_button', { ns: 'catalog' })}
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
                  className={css.clearFiltersButton}
                >
                  {t('clear_filters_button', { ns: 'catalog' })}
                </Button>
              )}
            </div>
          </div>
          <div className={css.containerCards}>
            {isLoading ? (
              <Loader type="container" />
            ) : error ? (
              <ErrorComponent error={error} onRetry={handleRetry} />
            ) : visibleCampers.length > 0 ? (
              <>
                <CardList campers={visibleCampers} />
                {loadedCount < filteredCampers.length && (
                  <div className={css.containerLoadMore}>
                    <Button
                      variant="default"
                      size="small"
                      onClick={handleLoadMore}
                    >
                      {t('load_button', { ns: 'button' })}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div>{t('no_campers_message', { ns: 'catalog' })}</div>
            )}
          </div>
        </div>
        <ScrollToTopButton
          visible={visible}
          onClick={handleScrollToTopAndReset}
          className={scrollToTopButtonCss.fixedPosition}
          label={t('up_button', { ns: 'button' })}
        />
      </div>
    </div>
  );
}

export default PageCatalog;
