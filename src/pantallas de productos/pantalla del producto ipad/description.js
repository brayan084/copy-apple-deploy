import React from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

export default function Descripcion() {
    return (
        <Inplace>
            <InplaceDisplay >CLICK AQUI, PARA VER LA DESCRIPCION</InplaceDisplay>
            <InplaceContent>
                <p className="text-4xl">
                ¿Por qué iPad Pro? El iPad Pro es la mejor experiencia de iPad, con el impresionante rendimiento del chip M2, conectividad inalámbrica superrápida y experiencia de Apple Pencil de última generación. Además de potentes funciones de productividad en iPadOS.
IPADOS + aplicaciones: iPadOS hace que el iPad sea más productivo, intuitivo y versátil. Con iPadOS, ejecuta varias aplicaciones a la vez, utiliza Apple Pencil para escribir en cualquier campo de texto con Scribble, y edita y comparte fotos. Stage Manager facilita la multitarea con aplicaciones ajustables y superpuestas y soporte de pantalla externa. El iPad Pro viene con aplicaciones esenciales como Safari, mensajes y Keynote, con más de un millón de aplicaciones más disponibles en la App Store.
                </p>
            </InplaceContent>
        </Inplace>
    );
}
