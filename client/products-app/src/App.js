import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

const App = () => {
  const [products, setProducts] = useState([]);


    useEffect(() => {
    // Fetch products from your backend API
    // Update the URL with the appropriate endpoint of your backend API
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.log(error));
  }, []);

    return (
        <div>
            <ProductList products={products} />
        </div>
    );
};

export default App;
