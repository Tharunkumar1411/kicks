import React from 'react';

const RemoteProductApp = React.lazy(() => import('home/ProductApp'));

const ProductPage = () => {
  return (
    <div>
      <RemoteProductApp />
    </div>
  );
};

export default ProductPage;
