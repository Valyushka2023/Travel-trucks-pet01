import React from 'react';
import { useParams } from 'react-router-dom';  
import { useSelector } from 'react-redux';
import { selectCampers } from '../../redux/campers/selectors'; 
import CamperReviewsContent from '../../components/CamperReviewsContent/CamperReviewsContent.jsx'; 


function ReviewsPage() {
    const { id } = useParams();
    const campers = useSelector(selectCampers);
    const camper = campers.find(camper => camper.id === id);

    if (!camper) {
        return <div>Camper not found</div>;
    }
    return (
        <CamperReviewsContent camper={camper} activeTab="reviews" />
    );
}

export default ReviewsPage;