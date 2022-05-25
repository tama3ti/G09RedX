import React, {useEffect, useState} from 'react';
import ProductCard from "../productCard/ProductCard";
import "./ProductSection.css";
import axios from "axios";
import {getAllProducts} from "../../services/ProductService";

function ProductSection() {

        const [products, setProducts] = useState([]);

        useEffect(() => {
            getAllProducts().then((productData) => {
                setProducts(productData);
            })
        }, [])

        return (
            <section id={"product-card-section"}>
               {
                    products.map((product) => {
                        return (
                            <ProductCard
                                imageUrl={"/images/squoosed-product" + product.productId + ".jpg"}
                                imageAlt={"First-aid kit"}
                                title={product.productName}
                                description={product.description}
                                navigation={"/checkout/product/" + product.productId}
                            />
                        )
                    })
                }
            </section>
        );
}

export default ProductSection;
