import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectCampers, selectIsLoading, selectError } from "../../redux/campers/selectors.js";
import { getCampers } from "../../redux/campers/operations.js";
import Header from "../../components/Header/Header.jsx";
import Button from "../../components/Button/Button.jsx";
import FilterLocation from "../../components/Filters/FilterLocation/FilterLocation.jsx";
import FilterVehicleEquipment from "../../components/Filters/FilterEquipment/FilterVehicleEquipment.jsx";
import FilterVehicleType from "../../components/Filters/FilterType/FilterVehicleType.jsx";
import CardList from "../../components/CardList/CardList.jsx";
import { ClipLoader } from 'react-spinners';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent.jsx';
import css from "./CatalogPage.module.css";

function CatalogPage() {
    const dispatch = useDispatch();
    const campers = useSelector(selectCampers);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const navigate = useNavigate();
    const location = useLocation();

    const [visibleCampers, setVisibleCampers] = useState([]);
    const [loadedCount, setLoadedCount] = useState(4);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [filterLocation, setFilterLocation] = useState("all");
    const [activeEquipmentFilters, setActiveEquipmentFilters] = useState({});
    const [activeTypeFilters, setActiveTypeFilters] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [equipmentFilters, setEquipmentFilters] = useState({});
    const [typeFilters, setTypeFilters] = useState({});

    useEffect(() => {
        dispatch(getCampers());
    }, [dispatch]);

    const filteredCampers = useMemo(() => {
        if (!campers || campers.length === 0) {
            return [];
        }

        const filteredByLocation = campers.filter((camper) => {
            if (filterLocation === "all") {
                return true;
            }
            return camper.location === filterLocation;
        });

        const filterByEquipment = (campersToFilter) => {
            return campersToFilter.filter((camper) => {
                for (const filterName in activeEquipmentFilters) {
                    const filterValue = activeEquipmentFilters[filterName];

                    if (camper.hasOwnProperty(filterName)) {
                        const camperValue = camper[filterName];
                        if (!filterMatches(camperValue, filterValue)) {
                            return false;
                        }
                    }
                }
                return true;
            });
        };

        const filterByType = (campersToFilter) => {
            return campersToFilter.filter((camper) => {
                if (Object.values(activeTypeFilters).every((value) => value === false)) {
                    return true;
                }
                return Object.entries(activeTypeFilters).every(([key, value]) => {
                    return !value || camper.form === key;
                });
            });
        };

        const filterMatches = (camperValue, filterValue) => {
            if (filterValue === null || filterValue === undefined) {
                return true;
            }

            if (typeof filterValue === "string") {
                return camperValue && camperValue.toLowerCase().includes(filterValue.toLowerCase());
            } else if (typeof filterValue === "boolean") {
                return camperValue === filterValue;
            }
            return false;
        };

        return filterByType(filterByEquipment(filteredByLocation));
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

    const handleScroll = () => {
        setShowScrollButton(window.pageYOffset > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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
        dispatch(getCampers()); // Повторюємо завантаження даних
    };

    const handleShowMoreClick = (id) => {
        navigate(`/catalog/${id}`);
    };

    const handleLoadMore = () => {
        setLoadedCount((prevCount) => prevCount + 4);
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
                    ) : (
                        <CardList campers={visibleCampers} onShowMore={handleShowMoreClick} />
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

export default CatalogPage;