// import { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   selectCampers,
//   selectIsLoading,
//   selectError,
// } from '../../redux/campers/selectors.js';
// import { getCampers } from '../../redux/campers/operations.js';

// import Header from '../../components/Header/Header.jsx';
// import Button from '../../components/Ui/Button/Button.jsx';
// import ScrollToTopButton from '../../components/Ui/Button/ScrollToTopButton.jsx';
// import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.jsx';

// import scrollToTopButtonCss from '../../components/Ui/Button/ScrollToTopButton.module.css';
// import FilterLocation from '../../components/Filters/FilterLocation/FilterLocation.jsx';
// import FilterVehicleEquipment from '../../components/Filters/FilterEquipment/FilterVehicleEquipment.jsx';
// import FilterVehicleType from '../../components/Filters/FilterType/FilterVehicleType.jsx';
// import CardList from '../../components/CardList/CardList.jsx';
// import { ClipLoader } from 'react-spinners';
// import ErrorComponent from '../../components/ErrorComponent/ErrorComponent.jsx';

// import css from './PageCatalog.module.css';

// function PageCatalog() {
//   const { visible, scrollToTop } = useWindowScrollToTopButton(300);
//   const dispatch = useDispatch();

//   const campers = useSelector(selectCampers);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);

//   const [visibleCampers, setVisibleCampers] = useState([]);
//   const [loadedCount, setLoadedCount] = useState(4);

//   const [filterLocation, setFilterLocation] = useState('all');
//   const [equipmentFilters, setEquipmentFilters] = useState({});
//   const [typeFilters, setTypeFilters] = useState({});
//   const [activeEquipmentFilters, setActiveEquipmentFilters] = useState({});
//   const [activeTypeFilters, setActiveTypeFilters] = useState({});

//   // Завантаження кемперів
//   useEffect(() => {
//     dispatch(getCampers());
//   }, [dispatch]);

//   // Фільтрація кемперів
//   const filteredCampers = useMemo(() => {
//     if (!campers || campers.length === 0) return [];

//     let result = campers;

//     // Фільтр по локації
//     if (filterLocation !== 'all') {
//       result = result.filter(camper => camper.location === filterLocation);
//     }

//     // Фільтр по обладнанню
//     result = result.filter(camper => {
//       for (const filterName in activeEquipmentFilters) {
//         if (
//           camper.hasOwnProperty(filterName) &&
//           camper[filterName] !== activeEquipmentFilters[filterName]
//         ) {
//           return false;
//         }
//       }
//       return true;
//     });

//     // Фільтр по типу кемпера
//     if (Object.keys(activeTypeFilters).some(key => activeTypeFilters[key])) {
//       result = result.filter(camper => activeTypeFilters[camper.form]);
//     }

//     return result;
//   }, [campers, filterLocation, activeEquipmentFilters, activeTypeFilters]);

//   // Оновлення видимих кемперів після фільтрації або при натисканні "Load more"
//   useEffect(() => {
//     setVisibleCampers(filteredCampers.slice(0, loadedCount));
//   }, [filteredCampers, loadedCount]);

//   // Зміна фільтрів
//   const handleLocationChange = newLocation => {
//     setFilterLocation(newLocation);
//   };

//   const handleEquipmentFilterChange = filters => {
//     setEquipmentFilters(filters);
//   };

//   const handleTypeFilterChange = filters => {
//     setTypeFilters(filters);
//   };

//   // Пошук (активує фільтри та скидає видимий ліміт до 4)
//   const handleSearchClick = () => {
//     setActiveEquipmentFilters(equipmentFilters);
//     setActiveTypeFilters(typeFilters);
//     setLoadedCount(4); // Показує перші 4 кемпери після фільтрації
//   };

//   // Повторна спроба завантажити кемперів
//   const handleRetry = () => {
//     dispatch(getCampers());
//   };

//   // Показати більше
//   const handleLoadMore = () => {
//     setLoadedCount(prevCount => prevCount + 4);
//   };

//   return (
//     <div className={css.container}>
//       <Header />
//       <div className={css.containerCatalog}>
//         <div className={css.containerFilters}>
//           <FilterLocation
//             campers={campers}
//             setLocation={handleLocationChange}
//             location={filterLocation}
//           />
//           <h4 className={css.filterTitle}>Filters</h4>
//           <FilterVehicleEquipment onFilter={handleEquipmentFilterChange} />
//           <FilterVehicleType onFilter={handleTypeFilterChange} />
//           <Button variant="primary" size="medium" onClick={handleSearchClick}>
//             Search
//           </Button>
//         </div>

//         <div className={css.containerCards}>
//           {isLoading ? (
//             <div className={css.loaderContainer}>
//               <ClipLoader color="#36D7B7" size={50} />
//             </div>
//           ) : error ? (
//             <ErrorComponent error={error} onRetry={handleRetry} />
//           ) : visibleCampers.length > 0 ? (
//             <>
//               <CardList campers={visibleCampers} />
//               {loadedCount < filteredCampers.length && (
//                 <div className={css.containerLoadMore}>
//                   <Button
//                     variant="default"
//                     size="small"
//                     onClick={handleLoadMore}
//                   >
//                     Load more
//                   </Button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div>No campers available.</div>
//           )}
//         </div>
//       </div>

//       <ScrollToTopButton
//         visible={visible}
//         onClick={scrollToTop}
//         className={scrollToTopButtonCss.fixedPosition}
//       />
//     </div>
//   );
// }

// export default PageCatalog;

import { useEffect, useState, useMemo } from 'react';
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
  const { visible, scrollToTop } = useWindowScrollToTopButton(300);
  const dispatch = useDispatch();

  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [visibleCampers, setVisibleCampers] = useState([]);
  const [loadedCount, setLoadedCount] = useState(4);

  // UI-стани для відображення вибору користувача у фільтрах
  const [currentLocationFilter, setCurrentLocationFilter] = useState('all');
  const [currentEquipmentFilters, setCurrentEquipmentFilters] = useState({});
  const [currentTypeFilters, setCurrentTypeFilters] = useState({});

  // АКТИВНІ фільтри, які застосовуються для рендерингу кемперів
  // Локація застосовується миттєво
  // Обладнання та тип - тільки після натискання "Search"
  const [activeLocationFilter, setActiveLocationFilter] = useState('all');
  const [activeEquipmentFilters, setActiveEquipmentFilters] = useState({});
  const [activeTypeFilters, setActiveTypeFilters] = useState({});

  // Завантаження кемперів при першому рендері
  useEffect(() => {
    dispatch(getCampers());
  }, [dispatch]);

  // Фільтрація кемперів на основі активних фільтрів
  const filteredCampers = useMemo(() => {
    if (!campers || campers.length === 0) return [];

    let result = campers;

    // Фільтр по локації (застосовується миттєво з activeLocationFilter)
    if (activeLocationFilter !== 'all') {
      result = result.filter(
        camper => camper.location === activeLocationFilter
      );
    }

    // Фільтр по обладнанню (застосовується з activeEquipmentFilters після "Search")
    result = result.filter(camper => {
      for (const filterName in activeEquipmentFilters) {
        const activeValue = activeEquipmentFilters[filterName];

        if (!activeValue) {
          // Пропускаємо неактивовані фільтри
          continue;
        }

        if (typeof activeValue === 'boolean') {
          if (!camper[filterName]) {
            return false;
          }
        } else if (typeof activeValue === 'string') {
          if (camper[filterName] !== activeValue) {
            return false;
          }
        }
      }
      return true;
    });

    // Фільтр по типу кемпера (застосовується з activeTypeFilters після "Search")
    if (Object.keys(activeTypeFilters).some(key => activeTypeFilters[key])) {
      result = result.filter(camper => {
        return activeTypeFilters[camper.form];
      });
    }

    return result;
  }, [
    campers,
    activeLocationFilter, // Локація тепер оновлюється миттєво
    activeEquipmentFilters, // Обладнання оновлюється через Search
    activeTypeFilters, // Тип оновлюється через Search
  ]);

  // Оновлення видимих кемперів після фільтрації або при натисканні "Load more"
  useEffect(() => {
    setVisibleCampers(filteredCampers.slice(0, loadedCount));
  }, [filteredCampers, loadedCount]);

  // Обробники зміни значень фільтрів у формі (оновлюють UI-state)
  const handleLocationChange = newLocation => {
    setCurrentLocationFilter(newLocation); // Оновлюємо UI-вибір локації
    setActiveLocationFilter(newLocation); // Миттєво застосовуємо фільтр локації

    // При зміні локації, скидаємо вибір інших фільтрів в UI та їх активні стани
    setCurrentEquipmentFilters({});
    setCurrentTypeFilters({});
    setActiveEquipmentFilters({});
    setActiveTypeFilters({});

    setLoadedCount(4); // Скидаємо лічильник видимості до 4
  };

  const handleEquipmentFilterChange = filters => {
    setCurrentEquipmentFilters(filters);
    // Ці фільтри НЕ застосовуються одразу до activeEquipmentFilters
    // setLoadedCount(4); // Не скидаємо тут, бо фільтри ще не активні
  };

  const handleTypeFilterChange = filters => {
    setCurrentTypeFilters(filters);
    // Ці фільтри НЕ застосовуються одразу до activeTypeFilters
    // setLoadedCount(4); // Не скидаємо тут, бо фільтри ще не активні
  };

  // Обробник кліку на кнопку "Search" (активує фільтри обладнання/типу, скидає loadedCount)
  const handleSearchClick = () => {
    // Активуємо фільтри обладнання та типу на основі поточного UI-вибору
    setActiveEquipmentFilters(currentEquipmentFilters);
    setActiveTypeFilters(currentTypeFilters);
    setLoadedCount(4); // Скидаємо лічильник завантажених кемперів до початкових 4
  };

  // Повторна спроба завантажити кемперів
  const handleRetry = () => {
    dispatch(getCampers());
  };

  // Показати більше
  const handleLoadMore = () => {
    setLoadedCount(prevCount => prevCount + 4);
  };

  return (
    <div className={css.container}>
      <Header />
      <div className={css.containerCatalog}>
        <div className={css.containerFilters}>
          <FilterLocation
            campers={campers}
            setLocation={handleLocationChange}
            location={currentLocationFilter} // Передаємо поточний UI-вибір для відображення
          />
          <h4 className={css.filterTitle}>Filters</h4>
          <FilterVehicleEquipment
            onFilter={handleEquipmentFilterChange}
            currentFilters={currentEquipmentFilters} // Передаємо UI-state для відображення
          />
          <FilterVehicleType
            onFilter={handleTypeFilterChange}
            currentFilters={currentTypeFilters} // Передаємо UI-state для відображення
          />
          <Button variant="primary" size="medium" onClick={handleSearchClick}>
            Filter out
          </Button>
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
        onClick={scrollToTop}
        className={scrollToTopButtonCss.fixedPosition}
      />
    </div>
  );
}

export default PageCatalog;
