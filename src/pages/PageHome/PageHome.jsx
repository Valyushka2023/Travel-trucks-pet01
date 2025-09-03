// import { useState } from 'react';
// import Header from '../../components/Header/Header.jsx';
// import Button from '../../components/Ui/Buttons/BaseButton/Button.jsx';
// import Footer from '../../components/Footer/Footer.jsx';
// import Modal from '../../components/Modal/Modal.jsx';
// import css from './PageHome.module.css';

// function PageHome() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <div className={css.container}>
//       <Header />

//       <section className={css.heroSection}>
//         <div className={css.heroOverlay}>
//           <div className={css.title}>
//             <div className={css.text}>
//               <h1 className={css.heroTitle}>Campers of your dreams</h1>
//               <h2 className={css.heroContent}>
//                 You can find everything you want in our catalog
//               </h2>
//             </div>
//             <Button variant="primary" size="large" onClick={handleOpenModal}>
//               View Now
//             </Button>
//           </div>
//         </div>

//         {/* Модальне вікно всередині hero */}
//         {isModalOpen && (
//           <div className={css.modalWrapper}>
//             <Modal title="About us" onClose={handleCloseModal}>
//               <p>
//                 We are TravelTrucks — a company specializing in modern camper
//                 rentals for comfortable travel across Ukraine.
//               </p>
//               <p>TravelTrucks was founded in 2024.</p>
//               <p>
//                 Our fleet includes 24 campers ranging from Economy to Premium
//                 class.
//               </p>
//               <p>
//                 We operate in Kyiv, Odesa, Kharkiv, Sumy, Poltava, Dnipro, and
//                 Lviv.
//               </p>
//               <p>
//                 The TravelTrucks team consists of young, energetic individuals.
//               </p>
//               <p>
//                 Booking the camper you want is easy — just give us a call or
//                 leave a request on our website!
//               </p>
//             </Modal>
//           </div>
//         )}
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default PageHome;
import { Link } from 'react-router-dom'; // Імпортуємо Link
import Header from '../../components/Header/Header.jsx';
import Button from '../../components/Ui/Buttons/BaseButton/Button.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import css from './PageHome.module.css';

function PageHome() {
  // Логіка для модального вікна видалена, оскільки вона не потрібна для цієї кнопки.

  return (
    <div className={css.container}>
      <Header />

      <section className={css.heroSection}>
        <div className={css.heroOverlay}>
          <div className={css.title}>
            <div className={css.text}>
              <h1 className={css.heroTitle}>Campers of your dreams</h1>
              <h2 className={css.heroContent}>
                You can find everything you want in our catalog
              </h2>
            </div>
            {/* Замість Button використовуємо Link */}
            <Link to="/catalog" className={css.viewButton}>
              <Button variant="primary" size="large">
                View Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PageHome;
