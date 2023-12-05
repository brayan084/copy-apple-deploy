import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from './PhotoService';

/* es el carrusel principal en la pantalla del producto donde se ven las fotos de el mismo */
export default function Carrusel_Producto() {
/* tamaño y ajustes de el carrusel */
    const [images, setImages] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

/* obtiene las fotos de la carpeta PhotoService.js */
    useEffect(() => {
        PhotoService.getImages().then(data => setImages(data));
    }, [])

/* muesta la imagen del carrusel y se puede cambiar el ancho */
const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
}

/* muesta la imagen de previsualizacion del carrusel */
    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} />
    }

/* renderiza el carrusel y se puede ajustar el ancho y la cantidad de imagenes de previsualizacion a mostrar sin cambiar de imagen */
    return (
        <div className="">
            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={3} style={{ maxWidth: '540px', borderRadius: '5px' }} 
                item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
    )
}
        