import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { FotosCarrusel } from './fotosCarrusel';

export default function Carrusel() {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    useEffect(() => { /* Llamada a la función para obtener datos y toma los primeros 6  */
        FotosCarrusel.getProductsSmall().then((data) => setProducts(data.slice(0, 6)));
    }, []);

    const productTemplate = (product) => {
        return (
            <div className="text-center my-4">
                <div> {/* las imagenes fueron subidas a imgBB, convina la parte fija "https://i.ibb.co/" con cada valor dinamico de "product.imagen" */}
                    <img src={`https://i.ibb.co/${product.imagen}`} alt={product.nombre} className="w-11 shadow-2 border-round" />
                </div>
            </div>
        );
    };

    return ( /* Carrusel de PrimeReact con modificaciones */
        <div style={{ marginTop: '5rem', marginBottom: '5rem' }}> {/* Del carrusel original solo se utilizó la imagen, se cambiaron el tamaño de las mismas y la distancia entre ellas */}
            <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} circular
                autoplayInterval={3000} itemTemplate={productTemplate} />
        </div>
    )
}
