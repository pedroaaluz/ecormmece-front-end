import './Product.css'
import { onError } from "./../../libs/errorLibs";
import React, { useState, useEffect } from "react";
import { useAppContext } from "./../../libs/contextLibs";
import { API } from 'aws-amplify'
import ScrollAnimation from 'react-animate-on-scroll';
import { useHistory } from "react-router-dom"


export default function Product(props) {

    const [show, setShow] = useState(false);

    const history = useHistory();
    const [Listproducts, setProducts] = useState([]);
    const { isAuthenticated } = useAppContext();
    useEffect(() => {
        async function onLoad() {
            try {
                const product = await loadProducts();
                setProducts(product.product);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();

    }, [true]);

    function loadProducts() {
        return API.get("products", "/products");
    }

    function buyProducts() {
        API.get("products", "/send-email");
        setShow(true)
    }
    //const product = Listproducts.find(({id}) === props.match.params.id);
    const _id = props.match.params.id


    return (
        <>

            {Listproducts.map(({ id, name, s3ImageUrl, price, description }) => (
                id === _id &&

                (

                    <>

                        <ScrollAnimation animateIn='fadeIn'>
                            <main className="container">

                                <div className="left-column">

                                    <img image="black" alt="" src={s3ImageUrl} />
                                </div>
                                <div className="right-column">

                                    <div className="product-description">
                                        <span>Minion</span>
                                        <h1>{name}</h1>
                                        <p>{description}</p>
                                    </div>

                                    <div className="product-price">
                                        <span>R${price}</span>

                                        {isAuthenticated ?
                                            <>
                                                <a href="#" className="cart-btn" onClick={buyProducts}>Reserva</a>


                                            </> : <a href="/login" className="cart-btn">Login necessário</a>}

                                    </div>
                                    {show &&

                                        <p className="reser">
                                            Seu produto <span className="yellow">{name}</span> foi reservado com sucesso!
                                        </p>

                                    }
                                </div>

                            </main>
                        </ScrollAnimation>
                    </>
                )


            ))}
        </>
    )
}
