import React, { useEffect, useState } from "react";
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
import css from "./CatalogPage.module.css";

function CatalogPage() {
    const dispatch = useDispatch();
    const campers = useSelector(selectCampers);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const location = useLocation();
    const navigate = useNavigate();

    const [visibleCampers, setVisibleCampers] = useState([]);
    const [loadedCount, setLoadedCount] = useState(4);
    const [showScrollButton, setShowScrollButton] = useState(false); // Стан для відображення кнопки

    useEffect(() => {
        dispatch(getCampers());
    }, [dispatch]);

    useEffect(() => {
        if (campers && campers.length > 0) {
            console.log('Campers data:', campers);  // Лог для перевірки даних
            setVisibleCampers(campers.slice(0, loadedCount));
        }
    }, [campers, loadedCount]);

    useEffect(() => {
        // Додаємо слухач події прокручування
        window.addEventListener("scroll", handleScroll);
        return () => {
            // Видаляємо слухач події при розмонтуванні компонента
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Пустий масив залежностей, щоб ефект спрацював один раз

    const setLocation = (newLocation) => {
        navigate(newLocation);
    };

    const handleLoadMore = () => {
        setLoadedCount((prevCount) => prevCount + 4);
    };

    const handleScroll = () => {
        if (window.pageYOffset > 300) { // Позиція, з якої показувати кнопку
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Плавна прокрутка
        });
    };

    return (
        <div className={css.container}>
            <Header />
            <div className={css.containerCatalog}>
                <div className={css.containerFilters}>
                    <FilterLocation setLocation={setLocation} location={location} />
                    <h4 className={css.filterTitle}>Filters</h4>
                    <FilterVehicleEquipment />
                    <FilterVehicleType />
                    <Button variant="primary" size="medium">
                        Search
                    </Button>
                </div>
                <div className={css.containerCards}>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : visibleCampers && visibleCampers.length > 0 ? (
                        <CardList campers={visibleCampers} />
                    ) : (
                        <div>No campers available.</div>
                    )}
                    {campers && loadedCount < campers.length && !isLoading && !error && visibleCampers.length > 0 && (
                    <div className={css.containerLoadMore}>
                        <Button variant="secondary" size="small" onClick={handleLoadMore}>
                            Load more
                        </Button>
                    </div>
                    )}
                </div>
            </div>
            {showScrollButton && ( // Умовне відображення кнопки
                <button className={css.scrollButton} onClick={scrollToTop}>
                    Up
                </button>
            )}
        </div>
    );
}

export default CatalogPage;