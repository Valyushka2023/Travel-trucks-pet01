
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { selectCampers, selectCurrentCamper, setCamper } from "../../redux/campers/slice.js";
import { fetchCampers } from "../../services/api.js";
import css from "./PageDetails.module.css";

function PageDetails() {
    const { _id } = useParams();
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "features";

    const dispatch = useDispatch();
    const campers = useSelector(selectCampers);
    const reduxCamper = useSelector(selectCurrentCamper);
    const navigate = useNavigate();
    const location = useLocation(); 

    const [localCamper, setLocalCamper] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state && location.state.camper) {
            setLocalCamper(location.state.camper); 
        } else {
            if (!_id) {
                setError("ID кемпера не заданий.");
                return;
            }

            const fetchCamperDetails = async () => {
                setIsLoading(true);
                setError(null);

                try {
                    console.log("Fetching camper from API with id:", _id);
                    const fetchedCampers = await fetchCampers({ id: _id });
                    console.log("Campers fetched from API:", fetchedCampers);

                    if (fetchedCampers?.length > 0) {
                        const camper = fetchedCampers[0];
                        setLocalCamper(camper);
                        dispatch(setCamper(camper));
                    } else {
                        const reduxCamperData = campers.find(camper => camper._id === _id);
                        if (reduxCamperData) {
                            setLocalCamper(reduxCamperData);
                            dispatch(setCamper(reduxCamperData));
                        } else {
                            setError("Camper not found");
                        }
                    }
                } catch (err) {
                    console.error("Error fetching camper from API:", err);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCamperDetails();
        }
    }, [_id, dispatch, campers, location.state]); 

    const cachedCamper = useMemo(() => localCamper, [localCamper]);

    console.log("Cached Camper:", cachedCamper);
    console.log("Active Tab:", activeTab);

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

    if (!cachedCamper) {
        return <div className={css.error}>⚠️ Camper not found.</div>;
    }



    return (
        <div>
            <Outlet context={{ camper: cachedCamper }} />
         
        </div>
    );
}

export default PageDetails;