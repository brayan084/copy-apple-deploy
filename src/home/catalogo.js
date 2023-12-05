import React, { useState, useEffect } from 'react';
import { Productos } from '../productos/productos';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

export default function Catalogo() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => { /* Llamada a la función para obtener datos y toma los primeros 6 */
        Productos.getProducts().then((data) => setProducts(data.slice(0, 6)));
    }, []);

    const getSeverity = (product) => { /* switch que cambia el color del estado del inventario en el que se encuentre el producto */
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

    /* dos formatos en los que se muestran los productos usando PrimeReact */

    const listItem = (product) => { /* los productos se muestran en formato de listado */
        return (
            <div className="col-12" id="catalogo"> {/* id para dare funcionabilidad al boton dentro del hero */}
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"> {/* las imagenes fueron subidas a imgBB, convina la parte fija "https://i.ibb.co/" con cada valor dinamico de "product.imagen" */}
                    <a href={product.url}><img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://i.ibb.co/${product.imagen}`} alt={product.nombre} /></a>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <a href={product.url} className='producto_titulo'><div className="text-2xl font-bold text-900">{product.nombreComercial}</div></a>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.categoria}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.precio}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> 
                            {/* si el estatus del producto es OUTOFSTOCK, se desactiba el botón de compra */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => { /* los productos se muestran en formato de grid */
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 bg-gray-900" id="catalogo">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.categoria}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <a href={product.url} className='fotito'><img className="w-9 shadow-2 border-round" src={`https://i.ibb.co/${product.imagen}`} alt={product.nombre} /></a>
                        <a href={product.url} className='producto_titulo'><div className="text-2xl font-bold">{product.nombreComercial}</div></a>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.precio}</span>
                        <a href={`${product.url}`}><Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button></a>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout) => { /* condicional si layout es list, genera un listado y si layout es grid, genera una cuadricula (basadas en listItem y gridItem)  */
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product);
        else if (layout === 'grid') return gridItem(product);
    };

    const header = () => {
        return ( /* permite seleccionar opciones de diseño para la vista de los datos. */ 
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div>
            <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div>
    )
}
        