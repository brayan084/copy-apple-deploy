import React from "react";
import Carrusel_Producto from "./fotos_carrusel";
import Descripcion from "./description";
import Dropdownn from "./drop_down_cantidad";
import Dropdown_color from "./drop_down_color";
import Etiquetas from "./etiquetas";
import Botones_compra from "./botones";
import Mas_productos from "./carrusel-productos";

/* pantalla del producto macbook */
export default function Pantalla_producto_MacBook_Air() {
    return (
        <div>
            <div className="contenedor">
                <div className="fotos">
                    <Carrusel_Producto />
                </div>
                <div className="panel">
                    <div>
                        <Etiquetas />
                    </div>
                    <section>
                        <h1>MacBook Air M1 gris espacial 13.3 macOS</h1>
                    </section>
                    <div className="precio">
                        <h3>$ 700999</h3>
                    </div>
                    <div className="dropdown_cantidad">
                        <Dropdownn />
                    </div>
                    <div className="dropdown_color">
                        <Dropdown_color />
                    </div>
                    <div className="botones">
                        <Botones_compra />
                    </div>
                </div>
                <div className="descripcion">
                    <Descripcion />
                </div>
            </div>
            <div className="mas_productos" >
                <section className="titulo">
                    <h1>Mas productos que te pueden interesar !</h1>
                </section>
                <div className="carrusel_mas_productos">
                    <Mas_productos />
                </div>
            </div>
        </div>
    )
}


