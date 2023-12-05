import React from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

export default function Descripcion() {
    return (
        <Inplace>
            <InplaceDisplay >CLICK AQUI, PARA VER LA DESCRIPCION</InplaceDisplay>
            <InplaceContent>
                <p className="text-4xl">
                    El iPhone 12 tiene una espectacular pantalla Super Retina XDR de 6.1 pulgadas (1). Un frente de Ceramic Shield, cuatro veces más resistente a las caídas (2). Modo Noche en todas las cámaras, para que puedas tomar fotos increíbles con poca luz. Grabación, edición y reproducción de video en Dolby Vision con calidad cinematográfica. Y el potente chip A14 Bionic. Además, es compatible con los nuevos accesorios MagSafe, que se acoplan fácilmente a tu iPhone y permiten una carga inalámbrica más rápida (3). Que comience la diversión.
                </p>
            </InplaceContent>
        </Inplace>
    );
}
