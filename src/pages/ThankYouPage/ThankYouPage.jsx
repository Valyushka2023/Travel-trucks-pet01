import React from 'react';

const ThankYouPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 60px)', flexDirection: 'column' }}>
      <h1>Дякуємо за ваш відгук!!!</h1>
      <p>Ваша думка дуже важлива для нас.</p>
      {/* Ви можете додати тут додатковий контент або посилання */}
    </div>
  );
};

export default ThankYouPage;