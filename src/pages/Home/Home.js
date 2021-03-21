import './Home.css';
import ScrollAnimation from 'react-animate-on-scroll';
import Product from './../../components/Products/Products';
import { onError } from "./../../libs/errorLibs";
import React, { useState, useEffect } from "react";
import { API } from 'aws-amplify'

export default function Home() {

    const [Listproducts, setProducts] = useState([]);

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

    console.log(Listproducts);




    return (
        <>
            <div className="header">
                <ScrollAnimation animateIn='fadeIn'>
                    <div className="box-download">
                        <p className="box-download-text">Eles provam que maldade não tem tamanho </p>
                        <p className="box-download-text">Meu <span className="box-download-text2">Minion</span> favorito </p>
                    </div>
                </ScrollAnimation>
            </div>
            <div className="content">
                <ul className="products">
                    {Listproducts.map(({id, name, s3ImageUrl, price, description}) => (

                        <Product
                            name={name}
                            image={s3ImageUrl}
                            description={description}
                            price={price}
                            id={id}
                        />


                    ))}
                </ul>
            </div>

            <footer className="foot">
                <p>Todos os direitos de imagem são de seus respectivos autores.</p>
            </footer>
        </>
    );

}

