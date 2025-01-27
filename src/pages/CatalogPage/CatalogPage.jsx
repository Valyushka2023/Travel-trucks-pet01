//	Каталог: сторінка, де відображаються всі доступні транспортні засоби з можливістю фільтрації за певними критеріями (локація, тип транспорту, наявність кондиціонера, кухні тощо) та можливістю додати кемпер до обраних.

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Button from '..//..//components/Button/Button.jsx';
import css from './CatalogPage.module.css';

function CatalogPage() {
  const navigate = useNavigate();
  
  return (
    <div className={css.container}>
      {/* Header */}
      <Header />   
      {/* Hero Section */}   
      <div className={css.containerCatalog}>
        <div className={css.containerLocationFilter}>
          <div className={css.textInputContainer}>
            <h5 className={css.supportingText}>Location</h5>
            <div className={css.textInput}>
              <div className={css.location}>
                      <svg
                        className={css.iconMap}
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-map"></use>
                      </svg>
                <p className={css.textLocation}>Kyiv, Ukraine</p>
              </div>
            </div>
          </div>
          <h4 className={css.filterTitle}>Filters</h4>
          <div className={css.vehicleEquipment}>
            <h3 className={css.textEquipment}>Vehicle equipment</h3>
            <hr className={css.divider} />
            <div className={css.equipmentRaw1}>
             <div className={css.rawIcon}>
                    <svg
                        className={css.iconAc}
                        width="32"
                        height="64"
                        viewBox="0 0 16 32"
                      >
                        <use href="/icons.svg#icon-icon-AC"></use>
              </svg>
              </div>
              <div className={css.rawIcon}>
                <svg
                        className={css.iconAutomatic}
                        width="78"
                        height="64"
                        viewBox="0 0 39 32"
                      >
                        <use href="/icons.svg#icon-icon-automatic"></use>
              </svg>
              </div>
              <div className={css.rawIcon}>
                <svg
                        className={css.iconKitchen}
                        width="59"
                        height="64"
                        viewBox="0 0 30 32"
                      >
                        <use href="/icons.svg#icon-icon-kitchen"></use>
              </svg>
              </div> 
            </div>
            <div className={css.equipmentRaw2}>
              <div className={css.rawIcon}>
                    <svg
                        className={css.iconTv}
                        width="32"
                        height="64"
                        viewBox="0 0 16 32"
                      >
                        <use href="/icons.svg#icon-icon-TV"></use>
              </svg>
              </div>
              <div className={css.rawIcon}>
                <svg
                        className={css.iconBathroom}
                        width="75"
                        height="64"
                        viewBox="0 0 38 32"
                      >
                        <use href="/icons.svg#icon-icon-bathroom"></use>
              </svg>
              </div>
            </div>
          </div>
          <div className={css.vehicleType}>
            <h3 className={css.textType}>Vehicle type</h3>
            <hr className={css.divider} />
            <div className={css.typeRaw}>
              <div className={css.rawIcon}>
                    <svg
                        className={css.iconVan}
                        width="32"
                        height="64"
                        viewBox="0 0 16 32"
                      >
                        <use href="/icons.svg#icon-icon-Van"></use>
              </svg>
              </div>
              <div className={css.rawIcon}>
                <svg
                        className={css.iconFully}
                        width="80"
                        height="88"
                        viewBox="0 0 29 32"
                      >
                        <use href="/icons.svg#icon-icon-fully"></use>
              </svg>
              </div>
              <div className={css.rawIcon}>
                <svg
                        className={css.iconAlcove}
                        width="52"
                        height="64"
                        viewBox="0 0 26 32"
                      >
                        <use href="/icons.svg#icon-icon-Alcove"></use>
              </svg>
              </div>           
            </div>
          </div>  
            <Button 
              variant="primary" 
              size="medium" 
              to="/catalog/:id"
            >
             Search
            </Button>
        </div>
        <div className={css.containerCards}>
          <div className={css.card}>
            <div className={css.contentCard}>
              <div className={css.containerPic}>
                <img
                  src="/images/PicMavericks@1x.jpg"
                  srcSet="/images/PicMavericks@1x.jpg 1x, /images/PicMavericks@2x.jpg 2x"
                  alt="Mavericks panel truck"
                />
              </div>
              <div className={css.containerInfo}>
                <div className={css.textContainerInfo}>
                  <div className={css.titleInfo}>
                    <h2 className={css.textTitleInfo}>Mavericks</h2>
                    <div className={css.priceInfo}>
                      <h2 className={css.textPriceInfo}>
                        €8000
                        <svg
                          className={css.iconHeart}
                          width="26"
                          height="24"
                          viewBox="0 0 32 32"
                        >
                          <use href="/icons.svg#icon-icon-heart"></use>
                        </svg>
                      </h2>
                    </div>
                  </div>
                  <div className={css.detailsInfo}>
                    <div className={css.reviewsInfo}>
                      <svg
                        className={css.iconStar}
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-icon-star-icon"></use>
                      </svg>
                      <p className={css.textReviewsInfo}>4.4 (2 Reviews)</p>
                    </div>
                    <div className={css.locationInfo}>
                      <svg
                        className={css.iconMap}
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-map"></use>
                      </svg>
                      <p className={css.textLocation}>Kyiv, Ukraine</p>
                    </div>
                  </div>
                  <div className={css.supportingTextInfo}>
                    <p className={css.textInfo}>
                      Embrace simplicity and freedom with the Mavericks panel
                      truck...
                    </p>
                  </div>
                  <div className={css.badgesContainerInfo}>
                    <div className={css.row1}>
                      <div className={css.buttonAutomatic}>
                        <svg
                          className={css.iconButtonAutomatic}
                          width="143"
                          height="48"
                          viewBox="0 0 104 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Automatic"></use>
                        </svg>
                      </div>
                      <div className={css.buttonPetrol}>
                        <svg
                          className={css.iconButtonPetrol}
                          width="109"
                          height="48"
                          viewBox="0 0 79 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Petrol"></use>
                        </svg>
                      </div>
                      <div className={css.buttonKitchen}>
                        <svg
                          className={css.iconButtonKitchen}
                          width="123"
                          height="48"
                          viewBox="0 0 89 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Kitchen"></use>
                        </svg>
                      </div>
                    </div>
                    <div className={css.row2}>
                      <div className={css.buttonAC}>
                        <svg
                          className={css.iconButtonAC}
                          width="87"
                          height="48"
                          viewBox="0 0 63 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-AC"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={css.showMore}>           
                    <Button 
                      variant="primary" 
                      size="medium" 
                      to="/catalog/:id"
                    >
                      Show more
                    </Button>                 
                  </div>
                </div>
              </div>
            </div>
          </div>       
          <div className={css.card}>
            <div className={css.contentCard}>
              <div className={css.containerPic}>
                <img
                  src="/public/images/PicKuga@1x.jpg"
                  srcSet="/images/PicKuga@1x.jpg 1x, /images/PicKuga@2x.jpg 2x"
                  alt="Kuga Camper"
                />
              </div>
              <div className={css.containerInfo}>
                <div className={css.textContainerInfo}>
                  <div className={css.titleInfo}>
                    <h2 className={css.textTitleInfo}>Kuga Camper</h2>
                    <div className={css.priceInfo}>
                      <h2 className={css.textPriceInfo}>
                        €8000
                        <svg
                          className={css.iconHeart}
                          width="26"
                          height="24"
                          viewBox="0 0 37 32"
                        >
                          <use href="/icons.svg#icon-icon-heart"></use>
                        </svg>
                      </h2>
                    </div>
                  </div>
                  <div className={css.detailsInfo}>
                    <div className={css.reviewsInfo}>
                      <svg
                        className={css.iconStar}
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-icon-star-icon"></use>
                      </svg>
                      <p className={css.textReviewsInfo}>4.2 (10 Reviews)</p>
                    </div>
                    <div className={css.locationInfo}>
                      <svg
                        className={css.iconMap}
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-map"></use>
                      </svg>
                      <p className={css.textLocationInfo}>Kyiv, Ukraine</p>
                    </div>
                  </div>
                  <div className={css.supportingTextInfo}>
                    <p className={css.textInfo}>
                     The pictures shown here are example vehicles of the respective...
                    </p>
                  </div>
                  <div className={css.badgesContainerInfo}>
                    <div className={css.row1}>
                      <div className={css.buttonAutomatic}>
                        <svg
                          className={css.iconButtonAutomatic}
                          width="143"
                          height="48"
                          viewBox="0 0 104 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Automatic"></use>
                        </svg>
                      </div>
                      <div className={css.buttonPetrol}>
                        <svg
                          className={css.iconButtonPetrol}
                          width="109"
                          height="48"
                          viewBox="0 0 79 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Petrol"></use>
                        </svg>
                      </div>
                      <div className={css.buttonKitchen}>
                        <svg
                          className={css.iconButtonKitchen}
                          width="123"
                          height="48"
                          viewBox="0 0 89 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Kitchen"></use>
                        </svg>
                      </div>
                    </div>
                    <div className={css.row2}>
                      <div className={css.buttonAC}>
                        <svg
                          className={css.iconButtonAC}
                          width="87"
                          height="48"
                          viewBox="0 0 63 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-AC"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={css.showMore}>
                    <Button 
                      variant="primary" 
                      size="medium" 
                      to="/catalog/:id"
                    >
                     Show more
                    </Button>
                  </div>
                </div>
              </div>
          </div>
          </div>
          <div className={css.card}>
            <div className={css.contentCard}>
              <div className={css.containerPic}>
                <img
                  src="/public/images/PicRoad@1x.jpg"
                  srcSet="/images/PicRoad@1x.jpg 1x, /images/PicRoad@2x.jpg 2x"
                  alt="Road Bear"
                />
              </div>
              <div className={css.containerInfo}>
                <div className={css.textContainerInfo}>
                  <div className={css.titleInfo}>
                    <h2 className={css.textTitleInfo}>Road Bear C 23-25</h2>
                    <div className={css.priceInfo}>
                      <h2 className={css.textPriceInfo}>
                        €8000
                        <svg
                          className={css.iconHeart}
                          width="26"
                          height="24"
                          viewBox="0 0 32 32"
                        >
                          <use href="/icons.svg#icon-icon-heart"></use>
                        </svg>
                      </h2>
                    </div>
                  </div>
                  <div className={css.detailsInfo}>
                    <div className={css.reviewsInfo}>
                      <svg
                        className={css.iconStar}
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-icon-star-icon"></use>
                      </svg>
                      <p className={css.textReviewsInfo}>4 (1 Reviews)</p>
                    </div>
                    <div className={css.locationInfo}>
                      <svg
                        className={css.iconMap}
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-map"></use>
                      </svg>
                      <p className={css.textLocationInfo}>Kyiv, Ukraine</p>
                    </div>
                  </div>
                  <div className={css.supportingTextInfo}>
                    <p className={css.textInfo}>
                     The pictures shown here are example vehicles of the respective...
                    </p>
                  </div>
                  <div className={css.badgesContainerInfo}>
                    <div className={css.row1}>
                      <div className={css.buttonAutomatic}>
                        <svg
                          className={css.iconButtonAutomatic}
                          width="143"
                          height="48"
                          viewBox="0 0 104 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Automatic"></use>
                        </svg>
                      </div>
                      <div className={css.buttonPetrol}>
                        <svg
                          className={css.iconButtonPetrol}
                          width="109"
                          height="48"
                          viewBox="0 0 79 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Petrol"></use>
                        </svg>
                      </div>
                      <div className={css.buttonKitchen}>
                        <svg
                          className={css.iconButtonKitchen}
                          width="123"
                          height="48"
                          viewBox="0 0 89 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Kitchen"></use>
                        </svg>
                      </div>
                    </div>
                    <div className={css.row2}>
                      <div className={css.buttonAC}>
                        <svg
                          className={css.iconButtonAC}
                          width="87"
                          height="48"
                          viewBox="0 0 63 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-AC"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={css.showMore}>             
                    <Button 
                      variant="primary" 
                      size="medium" 
                      to="/catalog/:id"
                    >
                      Show more
                    </Button>
                  </div>
                </div>
              </div>
          </div>
          </div>
          <div className={css.card}>
            <div className={css.contentCard}>
              <div className={css.containerPic}>
                <img
                  src="/public/images/PicMighty@1x.jpg"
                  srcSet="/images/PicMighty@1x.jpg 1x, /images/PicMighty@2x.jpg 2x"
                  alt="Mighty"
                />
              </div>
              <div className={css.containerInfo}>
                <div className={css.textContainerInfo}>
                  <div className={css.titleInfo}>
                    <h2 className={css.textTitleInfo}>Mighty Class C Medium [MD]</h2>
                    <div className={css.priceInfo}>
                      <h2 className={css.textPriceInfo}>
                        €8000
                        <svg
                          className={css.iconHeart}
                          width="26"
                          height="24"
                          viewBox="0 0 32 32"
                        >
                          <use href="/icons.svg#icon-icon-heart"></use>
                        </svg>
                      </h2>
                    </div>
                  </div>
                  <div className={css.detailsInfo}>
                    <div className={css.reviewsInfo}>
                      <svg
                        className={css.iconStar}
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-icon-star-icon"></use>
                      </svg>
                      <p className={css.textReviewsInfo}>4 (1 Reviews)</p>
                    </div>
                    <div className={css.locationInfo}>
                      <svg
                        className={css.iconMap}
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                      >
                        <use href="/icons.svg#icon-map"></use>
                      </svg>
                      <p className={css.textLocationInfo}>Kyiv, Ukraine</p>
                    </div>
                  </div>
                  <div className={css.supportingTextInfo}>
                    <p className={css.textInfo}>
                     The pictures shown here are example vehicles of the respective...
                    </p>
                  </div>
                  <div className={css.badgesContainerInfo}>
                    <div className={css.row1}>
                      <div className={css.buttonAutomatic}>
                        <svg
                          className={css.iconButtonAutomatic}
                          width="143"
                          height="48"
                          viewBox="0 0 104 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Automatic"></use>
                        </svg>
                      </div>
                      <div className={css.buttonPetrol}>
                        <svg
                          className={css.iconButtonPetrol}
                          width="109"
                          height="48"
                          viewBox="0 0 79 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Petrol"></use>
                        </svg>
                      </div>
                      <div className={css.buttonKitchen}>
                        <svg
                          className={css.iconButtonKitchen}
                          width="123"
                          height="48"
                          viewBox="0 0 89 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-Kitchen"></use>
                        </svg>
                      </div>
                    </div>
                    <div className={css.row2}>
                      <div className={css.buttonAC}>
                        <svg
                          className={css.iconButtonAC}
                          width="87"
                          height="48"
                          viewBox="0 0 63 32"
                        >
                          <use href="/icons.svg#icon-icon-Button-AC"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={css.showMore}>                  
                    <Button 
                      variant="primary" 
                      size="medium" 
                      to="/catalog/:id"
                    >
                     Show more
                    </Button>
                  </div>
                </div>
              </div>
          </div>
          </div>
          <div className={css.containerLoadMore}>
            <Button 
              variant="secondary" 
              size="small" 
              to="/catalog/:id"
            >
              Load more
            </Button>
          </div>
        </div>
        </div> 
    </div>
  );
}
 
export default CatalogPage;                    