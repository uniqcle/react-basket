import { useState, useEffect, createContext } from 'react';
import CartHeader from '../CartHeader/'
import Product from '../Product';
import CartFooter from '../CartFooter';
import AddProduct from './../AddProduct/index';
import { serverPath } from '../../helpers/vars'

export const AppContext = createContext(null)

const Cart = () => {

    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(null);
    const [fetchDataFlag, setFetchDataFlag] = useState(true)


    useEffect(() => {
        fetch(serverPath + 'products').then((response) => {
            return response.json()
        }).then((data) => {

            setCart(data)

        })
    }, [fetchDataFlag]);

    useEffect(() => {

        if (cart) {
            setTotal({
                price: cart.reduce((prev, cur) => { return prev + cur.priceTotal }, 0),
                count: cart.reduce((prev, cur) => { return prev + cur.count }, 0)
            })
        }

    }, [cart])

    const increase = (id) => {

        const product = cart.find(product => {
            return product.id === id
        })

        const data = {
            ...product,
            count: product.count + 1,
            priceTotal: (product.count + 1) * product.price
        }

        fetch(serverPath + 'products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((res) => {
            res.ok && setFetchDataFlag((value) => !value);
        });



    }

    const decrease = (id) => {

        const product = cart.find(product => product.id === id)

        const newCount = product.count - 1 > 1 ? product.count - 1 : 1;

        const data = {
            ...product,
            count: newCount,
            priceTotal: newCount * product.price,
        }

        fetch(serverPath + 'products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => {
            res.ok && setFetchDataFlag(value => !value)
        })

    }

    const changeValue = (id, value) => {

        const product = cart.find(product => product.id === id)

        const data = {
            ...product,
            count: value,
            priceTotal: value * product.price
        }


        fetch(serverPath + 'products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.ok && setFetchDataFlag(value => !value))

        // setCart(cart => {
        //     return cart.map(product => {
        //         if (product.id === id) {
        //             return {
        //                 ...product,
        //                 count: value,
        //                 priceTotal: value * product.price
        //             }
        //         } else {
        //             return product;
        //         }
        //     })
        // })
    }

    const deleteProduct = (id) => {
        // setCart((cart) => {
        //     return cart.filter(item => item.id !== id)
        // })

        fetch(serverPath + 'products/' + id, {
            method: 'DELETE'
        }).then((result) => {
            if (result.ok === true) {
                setFetchDataFlag(value => {
                    return !value
                })
            }
        })

    }

    // const products = cart.map(product => {
    //     return (
    //         <Product key={product.id} product={product} increase={increase} decrease={decrease} deleteProduct={deleteProduct} changeValue={changeValue} />
    //     )
    // })


    const addProduct = () => {

        const titles = ["Apple MacBook Air 13", "Apple watch", "Mac Pro"];
        const imgs = ["macbook.jpg", "apple-watch.jpg", "mac-pro.jpg"];
        const prices = [19000, 25000, 7000];

        const randomValue = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)]
        }

        const price = randomValue(prices)

        const data = {
            img: randomValue(imgs),
            title: randomValue(titles),
            count: 1,
            price: price,
            priceTotal: price
        }

        fetch(serverPath + 'products/', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            res.ok && setFetchDataFlag(value => !value)
        })
    }


    const products = () => {
        return cart.map(product => {
            return (
                <Product key={product.id} product={product} />
            )
        })
    }

    return (
        <>
            {/* 1ый скобки, чтобы писать js-код, а 2ые - описание объекта */}
            <AppContext.Provider value={{ deleteProduct, increase, decrease, changeValue }}>
                <section className="cart">

                    <AddProduct title={'Добавить продукт'} onClick={addProduct} />

                    <CartHeader />

                    {/* проверяем что корзина не пуста и запускем ф-ию products() */}
                    {cart && products()}
                    {total && <CartFooter total={total} />}

                </section>
            </AppContext.Provider>
        </>
    );
}

export default Cart;