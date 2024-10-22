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
                // If its included + 1
                return prevCart.map(item =>
                    item.code === productCode ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add if it's not included
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

    //Adding and subtracting functions
    const addFunction = (code) => {
        setProductsCart((products) => {
            return products.map(item =>
                item.code === code ? { ...item, quantity: item.quantity + 1 } : item
            ); 
        });
        setCart([...cart, code]);
    };

    const subtractFunction = (code) => {
        setProductsCart((products) => {
            return products.map((item) => {
                // Checking if you can subtract or if you are deleting the product from the cart
                if (item.code === code) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return null; // Return null if we are deleting the product
                    }
                }
                return item; // Return the item as is if it doesn't match
            }).filter(item => item !== null); // Filter out nulls (deleted products)
        });
    
        // Update the cart as well
        setCart(prevCart => {
            const updatedCart = [...prevCart];
            const index = updatedCart.lastIndexOf(code); // Find the last occurrence of the code
            if (index !== -1) {
                updatedCart.splice(index, 1); // Remove the code from the cart
            }
            return updatedCart;
        });
    };
    
    
    useEffect(() => {
        getData();
    }, [cart]);
    
    return (
      <div className='box'>
        <div>
            <h3>Products</h3>
            <div className='productsCard'>
            {products.map((product) => (
                <div className='card' key={product.code}>
                <p>{product.name} - {product.price}€</p>
                <Button variant="dark" onClick={() => addToCart(product.code)}>Add to Cart</Button>
                </div>
            ))}
            </div>
        </div>
        <div>
            <h3>Products on list</h3>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"end",margin:"2%", gap:"2%", minHeight:"30vh"}}>
                <Card className='cart'>
                    {/* Guard clause */}
                    {productsCart.length > 0 ? (
                        <>
                            {productsCart.map((item, index) => (
                            <p key={index}>{item.name} <Button onClick={() => addFunction(item.code)} className='cartButton' variant="outline-primary">+</Button > {item.quantity} <Button onClick={() => subtractFunction(item.code) } className='cartButton' variant="outline-primary">-</Button></p> 
                            ))} 
                        </>
                    ) : (<p>No items added yet</p>)} 

                </Card>
                <div style={{display: "flex", flexDirection:"column", justifyContent:"end", gap:"2vh"}}>
                    <Button variant='danger'  style={{minWidth:"10vw"}} onClick={cleanCart}>Clean cart</Button>
                    <Button variant="warning" onClick={checkout}>Checkout</Button>
                </div>
            </div>
        </div>
        <Card style={{minWidth:"25vw", display:"flex", alignItems:"end"}}>
            <h3>Total: {total}€</h3>
        </Card>
      </div>
    );
};
