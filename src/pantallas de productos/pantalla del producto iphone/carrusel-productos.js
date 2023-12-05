
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { Productos } from '../../productos/productos';

export default function Mas_productos() {
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

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    useEffect(() => {
        Productos.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
    }, []);

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <a href={product.url}><img src={`https://i.ibb.co/${product.imagen}`} alt={product.nombre} className="w-6 shadow-2 border-round" /></a>
                </div>
                <div>
                    <a href={product.url} className='producto_titulo'><h2 className="mb-1 ">{product.nombre}</h2></a>
                    <h4 className="mt-0 mb-3">${product.precio}</h4>
                    <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-comments" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-danger p-button-rounded" />
                        <Button icon="pi pi-shopping-cart" className="p-button-success p-button-rounded" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="">
            <Carousel value={products} numVisible={6} numScroll={6} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
    )
}
        