import { Button, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [productsCart, setProductsCart] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Get data function
    const getData = async () => {
        try {
            const response = await fetch('/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }; 
    
    //Add to cart function
    const addToCart = (productCode) => {

        setCart([...cart, productCode]);  

        setProductsCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.code === productCode);

            if (existingProduct) {
                // Si el producto ya existe, incrementar la cantidad
                return prevCart.map(item =>
                    item.code === productCode ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Si es un nuevo producto, agregarlo al carrito
                const product = products.find(product => product.code === productCode);
                return [...prevCart, { code: productCode, name: product.name, quantity: 1 }];
            }
        });
    };
    
    //Checkout function
    const checkout = async () => {
        try {
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ basket: cart }),
            });
            const data = await response.json();
            setTotal(data.total);
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    //Clean cart function
    const cleanCart = () =>{
        setCart([]);
        setProductsCart([]);
        setTotal(0);
    };
    
    useEffect(() => {
        getData();
    }, []);
    
    return (
      <div className='box'>
        <h2>Products</h2>
        <div className='productsCard'>
          {products.map((product) => (
            <div className='card' key={product.code}>
              <p>{product.name} - {product.price}€</p>
              <Button variant="dark" onClick={() => addToCart(product.code)}>Add to Cart</Button>
            </div>
          ))}
        </div>
        <h2>Cart</h2>
        <Card>
          {productsCart.map((item, index) => (
            <p key={index}>{item.name} - {item.quantity}</p> 
          ))}
        </Card>
        <Button variant='danger' onClick={cleanCart}>Clean cart</Button>
        <hr />
        <Button variant="warning" onClick={checkout}>Checkout</Button>

        <hr />
        <h2>Total: {total}€</h2>
      </div>
    );
};
