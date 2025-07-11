import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCampers,
  selectIsLoading,
  selectError,
} from '../../redux/campers/selectors.js';
import { getCampers } from '../../redux/campers/operations.js';

import Header from '../../components/Header/Header.jsx';
import Button from '../../components/Ui/Button/Button.jsx';
import ScrollToTopButton from '../../components/Ui/Button/ScrollToTopButton.jsx';
import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.jsx';

import scrollToTopButtonCss from '../../components/Ui/Button/ScrollToTopButton.module.css';
import FilterLocation from '../../components/Filters/FilterLocation/FilterLocation.jsx';
import FilterVehicleEquipment from '../../components/Filters/FilterEquipment/FilterVehicleEquipment.jsx';
import FilterVehicleType from '../../components/Filters/FilterType/FilterVehicleType.jsx';
import CardList from '../../components/CardList/CardList.jsx';
import { ClipLoader } from 'react-spinners';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent.jsx';

import css from './PageCatalog.module.css';

function PageCatalog() {
  const topRef = useRef(null);

  const { visible } = useWindowScrollToTopButton(300);

  const dispatch = useDispatch();

  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [visibleCampers, setVisibleCampers] = useState([]);
  const [loadedCount, setLoadedCount] = useState(4); // Кількість кемперів, яку бачимо на початку

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
    // Встановлюємо видимі кемпери
    setVisibleCampers(filteredCampers.slice(0, loadedCount));
  }, [filteredCampers, loadedCount]); // Залежність від loadedCount

  const handleLocationChange = newLocation => {
    setCurrentLocationFilter(newLocation);
    setActiveLocationFilter(newLocation);
    setCurrentEquipmentFilters({});
    setCurrentTypeFilters({});
    setActiveEquipmentFilters({});
    setActiveTypeFilters({});
    setLoadedCount(4); // Скидаємо до 4 кемперів
    // Прокручуємо до верху після зміни фільтра
    setTimeout(() => {
      // Додаємо затримку
      if (topRef.current) {
        topRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 50); // Невелика затримка, наприклад, 50 мс
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
    setLoadedCount(4); // Скидаємо до 4 кемперів
    // Прокручуємо до верху після застосування фільтрів
    setTimeout(() => {
      // Додаємо затримку
      if (topRef.current) {
        topRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 50); // Невелика затримка
  };

  const handleClearFilters = () => {
    setCurrentLocationFilter('all');
    setCurrentEquipmentFilters({});
    setCurrentTypeFilters({});
    setActiveLocationFilter('all');
    setActiveEquipmentFilters({});
    setActiveTypeFilters({});
    setLoadedCount(4); // Скидаємо до 4 кемперів
    // Прокручуємо до верху після очищення фільтрів
    setTimeout(() => {
      // Додаємо затримку
      if (topRef.current) {
        topRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 50); // Невелика затримка
  };

  const handleRetry = () => {
    dispatch(getCampers());
  };

  const handleLoadMore = () => {
    const prevScrollY = window.scrollY;
    setLoadedCount(prevCount => prevCount + 4);

    // Даємо React час оновити DOM, потім прокручуємо
    setTimeout(() => {
      window.scrollTo({
        top: prevScrollY + window.innerHeight * 0.7,
        behavior: 'smooth',
      });
    }, 100);
  };

  // ✅ ГОЛОВНА ДОПРАВКА: функція для скролу до верху і скидання до 4 кемперів
  const handleScrollToTopAndReset = () => {
    setLoadedCount(4); // Скидаємо кількість видимих кемперів до 4
    // Важливо: додаємо затримку, щоб DOM встиг оновитися після setLoadedCount
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Забезпечуємо, що елемент буде на початку видимій області
        });
      }
    }, 50); // Спробуйте 50 мс, якщо все ще не працює, збільште до 100-200 мс
  };

  return (
    <div>
      {/* Цей div слугує якорем для скролу до верху */}
      <div ref={topRef} />
      <div className={css.container}>
        <Header />
        <div className={css.containerCatalog}>
          <div className={css.containerFilters}>
            <FilterLocation
              campers={campers}
              setLocation={handleLocationChange}
              location={currentLocationFilter}
            />
            <h4 className={css.filterTitle}>Filters</h4>
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
                Filter out
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
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          <div className={css.containerCards}>
            {isLoading ? (
              <div className={css.loaderContainer}>
                <ClipLoader color="#36D7B7" size={50} />
              </div>
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
                      Load more
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div>No campers available matching your criteria.</div>
            )}
          </div>
        </div>

        <ScrollToTopButton
          visible={visible}
          onClick={handleScrollToTopAndReset}
          className={scrollToTopButtonCss.fixedPosition}
        />
      </div>
    </div>
  );
}

export default PageCatalog;
