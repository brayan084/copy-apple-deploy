import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

/* boton desplegable que contiene la cantidad del producto a comprar */
export default function Dropdownn() {
    const [selectedItem, setSelectedItem] = useState(null);
    const items = Array.from({ length: 5 }).map((_, i) => ({ label: `${i}`, value: i }));

    return (
        <div className="flex justify-content-left">
            <Dropdown value={selectedItem} onChange={(e) => setSelectedItem(e.value)} options={items} virtualScrollerOptions={{ itemSize: 38 }} 
                placeholder="Cantidad" className="w-full md:w-14rem" />
        </div>
    )
}
        