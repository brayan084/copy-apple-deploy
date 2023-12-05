import React from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

export default function Descripcion() {
    return (
        <Inplace>
            <InplaceDisplay >CLICK AQUI, PARA VER LA DESCRIPCION</InplaceDisplay>
            <InplaceContent>
                <p className="text-4xl">
                Diseño cómodo y plegable: las almohadillas acolchadas suaves para las orejas están diseñadas para la comodidad de los auriculares y el aislamiento del ruido. Los auriculares son plegables y solo 0.42 libras. Auriculares giratorios de 90° para escuchar con un solo oído en cualquier momento. La diadema es ajustable y elástica para que encuentres el ángulo deseado en el que te gusta encajar.
Modo Bluetooth 5.0/modo con cable: los auriculares Bluetooth sobre la oreja adoptan la tecnología Bluetooth 5.0 que puede ofrecer una velocidad de transmisión más estable y una latencia más baja. Simplemente desliza el botón de encendido/apagado y los auriculares estarán en modo listo para emparejar.
                </p>
            </InplaceContent>
        </Inplace>
    );
}

