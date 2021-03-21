import React from 'react';
import './Products.css';
import { Link } from 'react-router-dom';

export default function Products(props) {

    return (

        <>

            <li>
                <Link to={"/product/" + props.id} className="product">
                    <img className="product-image" src={props.image} alt="product" />
                    <div className="product-name">
                        <h3>{props.name}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="product-price">R${props.price}
                    </div>
                    <div >
                        <button className="product-btn">RESERVAR</button>
                    </div>
                </Link>

            </li>


        </>
    );

}
