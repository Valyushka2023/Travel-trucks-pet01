import React from 'react';
import { useParams } from 'react-router-dom';  // Якщо вам потрібно отримати параметри URL
import { useSelector } from 'react-redux';
import { selectCampers } from '../../redux/campers/selectors'; // Правильний шлях до вашого селектора
import CamperDetailsContent from '../../components/CamperDetailsContent/CamperDetailsContent.jsx'; // Імпортуємо спільний компонент


function FeaturesPage() {
    const { id } = useParams();
    const campers = useSelector(selectCampers);
    const camper = campers.find(camper => camper.id === id);

    if (!camper) {
        return <div>Camper not found</div>;
    }
    return (
        <CamperDetailsContent camper={camper} activeTab="features" />
    );
}

export default FeaturesPage;