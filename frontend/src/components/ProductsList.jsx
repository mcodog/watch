import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './css/ProductsList.css';
import Skeleton from '@mui/material/Skeleton';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loaderRef = useRef(null);  // To store the items added to the cart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/paged', {
          params: { page, limit: 6 }, 
        });
        console.log(response.data.products)
        setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchProducts();
    }, 1000)
    
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [totalPages]);

  // Function to add products to the cart
  const handleAddToCart = (productId, quantity) => {
    const product = products.find((prod) => prod._id === productId);
    if (!product) {
      alert('Product not found');
      return;
    }

    const newCartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      totalPrice: product.price * quantity
    };

    setCart((prevCart) => [...prevCart, newCartItem]); // Add new item to the cart
  };

  // Function to handle the order placement
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }

      const orderData = {
        products: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: cart.reduce((total, item) => total + item.totalPrice, 0)
      };

      const response = await axios.post(
        'http://localhost:5000/api/orders',
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert('Order placed successfully');
        setCart([]); // Clear the cart after placing the order
      }
    } catch (err) {
      console.error('Error placing order', err);
      alert('Error placing order: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-page">
      <h1>All Watches for Sale</h1>
      <div className="products-container">
      {products.map((product, index) => (
          <div key={index} className="product-card">
            {product.image && (
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="product-image"
              />
            )}
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.description || 'No description available'}</p>
              <p><strong>Price:</strong> ₱{product.price}</p>
              <p><strong>Stock:</strong> {product.stocks}</p>
              <p><strong>Brand:</strong> {product.brand?.name || product.brand || 'Unknown'}</p>
              <input
                type="number"
                min="1"
                max={product.stocks}
                defaultValue="1"
                id={`quantity-${product._id}`}
              />
              <button
                className="order-button"
                onClick={() =>
                  handleAddToCart(
                    product._id,
                    parseInt(document.getElementById(`quantity-${product._id}`).value)
                  )
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      { page < totalPages && (
        <div className="products-container">
          <Skeleton sx={{ backgroundColor: '#f0f0f0' }} className="product-card" variant="rounded" width={281} height={400} />
          <Skeleton sx={{ backgroundColor: '#f0f0f0' }} className="product-card" variant="rounded" width={281} height={400} />
          <Skeleton sx={{ backgroundColor: '#f0f0f0' }} className="product-card" variant="rounded" width={281} height={400} />
        </div>
      )}
      

      {/* Cart Summary Section */}
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} - ₱{item.totalPrice}
                </li>
              ))}
            </ul>
            <p><strong>Total Price:</strong> ₱{cart.reduce((total, item) => total + item.totalPrice, 0)}</p>
            <button className="order-button" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        )}
      </div>

      <div ref={loaderRef} />
    </div>
  );
};

export default ProductsList;
