import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function Dropdown_color() {
    let color = ["rojo", "azul", "amarillo", "verde", "negro", "blanco"];
    const [selectedItem, setSelectedItem] = useState(null);
    const items = Array.from({ length: 6 }).map((_, i) => ({ label: `${color[i]}`, value: i }));

    return (
        <div className="flex justify-content-left mt-3 mb-3">
            <Dropdown value={selectedItem} onChange={(e) => setSelectedItem(e.value)} options={items} virtualScrollerOptions={{ itemSize: 38 }} 
                placeholder="Seleccione un color" className="w-full md:w-14rem" disabled />
        </div>
    )
}
        