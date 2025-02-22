import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { selectCampers } from "../../redux/campers/selectors.js";
import { fetchCampers } from "../../services/api.js";
import css from "./CamperReviewsPage.module.css";

function CamperReviewsPage() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'reviews';
    const campers = useSelector(selectCampers);
    const [camper, setCamper] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        console.log("Campers in store (Reviews):", campers); // Логування campers

        const cachedCamper = campers.find(c => c.id === id);
        if (cachedCamper) {
            console.log("Found in cache (Reviews):", cachedCamper);
            setCamper(cachedCamper);
            return;
        }

        const fetchCamperReviews = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const fetchedCampers = await fetchCampers({ id: id });
                console.log("Fetched campers (Reviews):", fetchedCampers); // Логування fetchedCampers
                if (fetchedCampers && fetchedCampers.length > 0) {
                    setCamper(fetchedCampers[0]);
                } else {
                    setError("Camper not found");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCamperReviews();
    }, [id, campers]);

    if (isLoading) {
        return (
            <div className={css.loaderContainer}>
                <ClipLoader color="#36D7B7" size={50} />
            </div>
        );
    }

    if (error) {
        return <div className={css.error}>Error: {error}</div>;
    }

    if (!camper) {
        return <div className={css.error}>⚠️ Camper not found.</div>;
    }

    return (
        <Outlet context={{ camper, activeTab }} />
    );
}

export default CamperReviewsPage;



