import React from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

export default function Descripcion() {
    return (
        <Inplace>
            <InplaceDisplay >CLICK AQUI, PARA VER LA DESCRIPCION</InplaceDisplay>
            <InplaceContent>
                <p className="text-4xl">
                SUPERCARGADA POR M2: la laptop MacBook Pro de 13 pulgadas es portátil y potente. Es más rápida que una CPU de 8 núcleos de próxima generación, tiene una unidad de procesamiento de gráficos de 10 núcleos y hasta 24 GB de memoria unificada.
Batería de hasta 20 horas de duración: puedes usarla todo el día hasta la noche, gracias al rendimiento eficiente del chip M2 de Apple.
                </p>
            </InplaceContent>
        </Inplace>
    );
}

