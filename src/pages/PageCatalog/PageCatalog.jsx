
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCampers, selectIsLoading, selectError } from "../../redux/campers/selectors.js";
import { getCampers } from "../../redux/campers/operations.js";
import Header from "../../components/Header/Header.jsx";
import Button from "../../components/Ui/Button/Button.jsx";
import FilterLocation from "../../components/Filters/FilterLocation/FilterLocation.jsx";
import FilterVehicleEquipment from "../../components/Filters/FilterEquipment/FilterVehicleEquipment.jsx";
import FilterVehicleType from "../../components/Filters/FilterType/FilterVehicleType.jsx";
import CardList from "../../components/CardList/CardList.jsx";
import { ClipLoader } from 'react-spinners';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent.jsx';
import css from "./PageCatalog.module.css";

function PageCatalog() {
    const dispatch = useDispatch();
    const campers = useSelector(selectCampers);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const [visibleCampers, setVisibleCampers] = useState([]);
    const [loadedCount, setLoadedCount] = useState(4);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [filterLocation, setFilterLocation] = useState("all");
    const [activeEquipmentFilters, setActiveEquipmentFilters] = useState({});
    const [activeTypeFilters, setActiveTypeFilters] = useState({});
    const [equipmentFilters, setEquipmentFilters] = useState({});
    const [typeFilters, setTypeFilters] = useState({});

    useEffect(() => {
        dispatch(getCampers());
    }, [dispatch]);

    const filteredCampers = useMemo(() => {
        if (!campers || campers.length === 0) {
            return [];
        }

        let filtered = campers;

        if (filterLocation !== "all") {
            filtered = filtered.filter((camper) => camper.location === filterLocation);
        }

        filtered = filtered.filter((camper) => {
            for (const filterName in activeEquipmentFilters) {
                if (camper.hasOwnProperty(filterName) && camper[filterName] !== activeEquipmentFilters[filterName]) {
                    return false;
                }
            }
            return true;
        });

        if (Object.keys(activeTypeFilters).some((key) => activeTypeFilters[key])) {
            filtered = filtered.filter((camper) => activeTypeFilters[camper.form]);
        }

        return filtered;
    }, [campers, filterLocation, activeEquipmentFilters, activeTypeFilters]);

    useEffect(() => {
        setVisibleCampers(filteredCampers.slice(0, loadedCount));
    }, [filteredCampers, loadedCount]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLocationChange = (newLocation) => {
        setFilterLocation(newLocation);
    };

    const handleEquipmentFilterChange = (filters) => {
        setEquipmentFilters(filters);
    };

    const handleTypeFilterChange = (filters) => {
        setTypeFilters(filters);
    };

    const handleSearchClick = () => {
        setActiveEquipmentFilters(equipmentFilters);
        setActiveTypeFilters(typeFilters);
        setVisibleCampers(filteredCampers.slice(0, loadedCount));
    };

    const handleRetry = () => {
        dispatch(getCampers());
    };

    const handleLoadMore = () => {
        setLoadedCount((prevCount) => prevCount + 4);
    };

    const handleScroll = () => {
        setShowScrollButton(window.pageYOffset > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
return (
    <div className={css.container}>
      <Header />
      <div className={css.containerCatalog}>
        <div className={css.containerFilters}>
          <FilterLocation
            campers={campers}
            setLocation={handleLocationChange}
            location={filterLocation}
          />
          <h4 className={css.filterTitle}>Filters</h4>
          <FilterVehicleEquipment onFilter={handleEquipmentFilterChange} />
          <FilterVehicleType onFilter={handleTypeFilterChange} />
          <Button variant="primary" size="medium" onClick={handleSearchClick}>
            Search
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
            <CardList campers={visibleCampers} />
          ) : (
            <div>No campers available.</div>
          )}
          {visibleCampers.length > 0 && loadedCount < filteredCampers.length && !isLoading && !error && (
            <div className={css.containerLoadMore}>
              <Button variant="default" size="small" onClick={handleLoadMore}>
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>
      {showScrollButton && (
        <button className={css.scrollButton} onClick={scrollToTop}>
          Up
        </button>
      )}
    </div>
  );
}

export default PageCatalog;


