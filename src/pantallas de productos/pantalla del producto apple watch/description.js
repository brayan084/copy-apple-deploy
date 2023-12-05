import React from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

/* Es la descripccion del producto */
export default function Descripcion() {
    return (
        <Inplace>
            <InplaceDisplay >CLICK AQUI, PARA VER LA DESCRIPCION</InplaceDisplay>
            <InplaceContent>
                <p className="text-4xl">
                    ¿Por qué Apple Watch Series 8? Tu compañero esencial para una vida saludable ahora es aún más potente. Los sensores avanzados proporcionan información para ayudarte a entender mejor tu salud. Las nuevas características de seguridad pueden ayudarte cuando lo necesites. La brillante pantalla Retina siempre encendida es fácil de leer, incluso cuando tu muñeca está baja.
                    Aviso legal: este es un resumen de las principales características del producto. Consulta más abajo para obtener más información.
                </p>
            </InplaceContent>
        </Inplace>
    );
}
