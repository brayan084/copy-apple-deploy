import React from 'react'; 
import { Button } from 'primereact/button';

    export default function Botones_compra() {
    return (
        <div className="flex flex-wrap justify-content-left gap-5">
            <Button label="AÑADIR AL CARRITO" severity="help" raised />
            <Button label="COMPRAR" severity="danger" raised />
        </div>
    )
}