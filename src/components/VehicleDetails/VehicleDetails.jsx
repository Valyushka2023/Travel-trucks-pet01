import React from 'react';
import css from './VehicleDetails.module.css';



function VehicleDetails() {
  return (
             <div className={css.vehicleContainer}>
                    <h3 className={css.textDetails}>Vehicle details</h3>               
                  <hr className={css.divider} />
                  <div className={css.vehicleInfo}>
                  <div className={css.texts}>
                    <p>Form</p>
                    <p>Panel truck</p>
                  </div>
                  <div className={css.texts}>
                    <p>Length</p>
                    <p>5.4 m</p>
                  </div>
                  <div className={css.texts}>
                    <p>Width</p>
                    <p>2.01 m</p>
                  </div>
                  <div className={css.texts}>
                    <p>Height</p>
                    <p>2.05 m</p>
                  </div>
                  <div className={css.texts}>
                    <p>Tank</p>
                    <p>132 I</p>
                  </div>
                  <div className={css.texts}>
                    <p>Consumption</p>
                    <p>12.4l/100km</p>
                  </div>
                </div>
          </div>
  );
}

     
              

 export default VehicleDetails;