import React from 'react';
import css from './BookingForm.module.css';
import Button from '..//..//components/Button/Button.jsx';


function BookingForm() {
  return (
    <div className={css.form}>
      <div className={css.titleForm}>
        <h3 className={css.textTitleForm}>Book your campervan now</h3>
        <p className={css.textForm}>Stay connected! We are always ready to help you.</p>
      </div>
      <div className={css.inputs}>
         <div className={css.inputForm}>
        <div className={css.fieldForm}>
          <label htmlFor="user-name-input" className={css.label}>Name*</label>
          <input id="user-name-input" name="user-name" type="text" className={css.modalInput} />
        </div>
        <div className={css.fieldForm}>
          <label htmlFor="user-email-input" className={css.label}>Email*</label>
          <input id="user-email-input" name="user-email" type="email" className={css.modalInput} />
        </div>
        <div className={css.fieldForm}>
          <label htmlFor="user-date-input" className={css.label}>Booking date*</label>
          <input id="user-date-input" name="user-date" type="date" className={css.modalInput} />
        </div>
        <div className={css.fieldArea}>
          <label htmlFor="user-comment" className={css.label}>Comment</label>
          <textarea id="user-comment" name="user-comment" placeholder="Text input" className={css.modalTextArea} />
          </div>
        </div>
        <div className={css.elementSend}>           
                      <Button 
                      variant="primary" 
                      size="medium" 
                      to="/catalog/:id/reviews"
                     >
                      Send
                     </Button>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;

  