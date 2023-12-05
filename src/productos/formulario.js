import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

export default function InputDemo() {
    const [value, setValue] = useState(0);
    const [value2, setValue2] = useState(0);
    const [seleccionarCategoria, setCategoria] = useState(null);
    const categoria = [
        { name: 'Tecnología', code: 'T' },
        { name: 'Ropa', code: 'R' },
        { name: 'Accesorios', code: 'A' },
        { name: 'Electrodomesticos', code: 'E' },
    ];

    const [seleccionarStatus, setStatus] = useState(null);
    const status = [
        { name: 'INSTOCK', code: 'I' },
        { name: 'LOWSTOCK', code: 'L' },
        { name: 'OUTOFSTOCK', code: 'O' },
    ];

    const [seleccionarUnidad, setUnidad] = useState(null);
    const unidadDeMedida = [
        { name: 'Unidades', code: 'I' },
        { name: 'Kilo', code: 'k' },
        { name: 'Kilogramo', code: 'kg' },
        { name: 'Gramo', code: 'g' },
    ];

    const [seleccionarProveedor, setProveedor] = useState(null);
    const proveedor = [
        { name: 'aptecno.ar', code: 'A' },
        { name: 'apjuan.ar', code: 'AJ' },
        { name: 'appalex', code: 'AA' },
    ];

    //Formulario, junte varios componentes como un Dropdown, InputNumber, entre otros. tambien dandole estilo con CSS
    return (
        <div className="justify-content-center p-fluid container form">
            <div className="col-12 md:col-6">
                <div className="card">
                    <div className="justify-content-center flex flex-column md:flex-row gap-3">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-hashtag"></i>
                            </span>
                            <InputNumber className="p-inputtext-addon" inputId="minmax-buttons" value={value} onValueChange={(e) => setValue(e.value)} mode="decimal" showButtons min={0} max={100} />
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-cart-plus"></i>
                            </span>
                            <InputText className="p-inputtext-addon" placeholder="Nombre" />
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-apple"></i>
                            </span>
                            <InputText className="p-inputtext-addon" placeholder="Nombre Comercial" />
                        </div>

                    </div>

                    <div className="justify-content-center flex flex-column md:flex-row gap-3 mt-3">

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">$</span>
                            <InputNumber className="p-inputtext-addon" placeholder="Precio" />
                            <span className="p-inputgroup-addon">.00</span>
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-tags"></i>
                            </span>
                            <Dropdown value={seleccionarCategoria} onChange={(e) => setCategoria(e.value)} options={categoria} optionLabel="name"
                                placeholder="Categoría" className="w-full md:w-14rem p-inputtext-addon" />
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-tags"></i>
                            </span>
                            <Dropdown value={seleccionarUnidad} onChange={(e) => setUnidad(e.value)} options={unidadDeMedida} optionLabel="name"
                                placeholder="Unidad de Medida" className="w-full md:w-14rem p-inputtext-addon" />
                        </div>

                    </div>

                    <div className="justify-content-center flex flex-column md:flex-row gap-3 mt-3">

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-angle-double-up"></i>
                            </span>
                            <Dropdown value={seleccionarStatus} onChange={(e) => setStatus(e.value)} options={status} optionLabel="name"
                                placeholder="Status" className="w-full md:w-14rem p-inputtext-addon" />
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-hashtag"></i>
                            </span>
                            <InputNumber className="p-inputtext-addon" inputId="minmax-buttons" value={value2} onValueChange={(e) => setValue2(e.value)} mode="decimal" showButtons min={0} max={100} />
                        </div>

                    </div>

                    <div className="justify-content-center flex flex-column md:flex-row gap-3 mt-3">

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-fw pi-users"></i>
                            </span>
                            <Dropdown value={seleccionarProveedor} onChange={(e) => setProveedor(e.value)} options={proveedor} optionLabel="name"
                                placeholder="Proveedor" className="w-full md:w-14rem p-inputtext-addon" />
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">$</span>
                            <InputNumber className="p-inputtext-addon" placeholder="Precio de Compra" />
                            <span className="p-inputgroup-addon">.00</span>
                        </div>


                    </div><div className="card flex justify-content-center">
                        <Button label="Enviar" />
                    </div>
                </div>

            </div>

        </div>
    )
}