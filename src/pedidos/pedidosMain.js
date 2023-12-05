
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';


export default function PedidosMain() {

    let emptyPedidos = {
        pedidoId: null,
        cliente: '',
        saldoTotal: 0,
        cantidad: 0,
        fechaDeCarga: Date,
        fechaDeEntrega: Date
    };

    let emptyProduct = {
        productos: [{ nombreProducto: '', cantidad: 0, pedidoId: 1 }]
    }

    const [pedido, setPedido] = useState(emptyPedidos);
    const [producto, setProducto] = useState(emptyProduct);
    const [pedidoDialog, setPedidoDialog] = useState(false);
    const [deletePedidosDialog, setDeletePedidosDialog] = useState(false);
    const [selectedPedidos, setSelectedPedidos] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deletePedidoDialog, setDeletePedidoDialog] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const toast = useRef(null);
    const dt = useRef(null);


    const [products, setProducts] = useState([]);

    const Cosas = products.map((items) => {
        return items.map((item) => {
            return item.nombre
        })
    })
    const nombreDeProducto = [...new Set(Cosas.flat())];

    useEffect(() => {
        getProducts();
        obtenerPedidos();
    }, []);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/pedidos/getProducts');
            // console.log(response.data);
            setProducts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerPedidos = async () => {

        try {
            setIsLoading(true);
            const response1 = await axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/pedidos/verPedido');
            console.log(response1.data);
            setPedidos(response1.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }

    };

    const savePedido = async () => {
        let _pedidos = [...pedidos];
        // let _pedido = { ...pedido };
        setPedidoDialog(false);
        if (pedido) {

            if (pedido.pedidoId) {

                const index = findIndexById(pedido.pedidoId);
                // console.log(index)
                _pedidos[index] = pedido;
                const id = _pedidos[index].pedidoId
                // console.log(id)


                try {
                    await axios.put(`https://deploybackendtp-44411f5799d1.herokuapp.com/pedidos/${id}`, pedido)
                    console.log(pedido)

                    await axios.put(`https://deploybackendtp-44411f5799d1.herokuapp.com/listaProductos/${id}`, producto);
                    console.log(producto)

                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                } catch (error) {
                    console.log('hubo un error en la actualización', error)
                }

            } else {
                await axios.post('https://deploybackendtp-44411f5799d1.herokuapp.com/listaProductos/crearProducto', producto)
                await axios.post('https://deploybackendtp-44411f5799d1.herokuapp.com/pedidos/crearPedido', pedido)
                // setIsLoading(true);
                // console.log(pedido)
                // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }
        }
        setProducto(emptyProduct);
        setPedido(emptyPedidos);
        setPedidos(pedidos)  

        await obtenerPedidos();
        // setIsLoading(false);
    }

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const handleAgregarProducto = () => {
        setProducto(prevPedido => ({
            ...prevPedido,
            productos: [...prevPedido.productos, { nombreProducto: '', cantidad: 0, pedidoId: 1 }]
        }));
    };


    const openNewPedido = () => {
        setPedido(emptyPedidos);
        setProducto(emptyProduct);
        setPedidoDialog(true);
    }

    const confirmDeleteSelectedP = () => {
        setDeletePedidosDialog(true);
    };

    const botonCrear = () => {

        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNewPedido} rounded raised />
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelectedP} disabled={!selectedPedidos || !selectedPedidos.length} rounded raised /> */}
            </div>
        );
    };

    const botonLista = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <a href="/pedidos/pedidos"><Button label='List' icon="pi pi-list" severity="success" rounded raised /></a>
            </div>
        )
    }

    const hideDialogPedido = () => {
        setPedidoDialog(false);
    };


    const hideDeletePedidoDialog = () => {
        // setDeletePedidoDialog(false);
    };


    const hideDeletePedidosDialog = () => {
        setDeletePedidosDialog(false);
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target || e.value;
        setProducto(prevPedido => {
            const nuevosProductos = [...prevPedido.productos];
            nuevosProductos[index][name] = value;
            return {
                ...prevPedido,
                productos: nuevosProductos
            };
        });
    };

    const handleEliminarProducto = (index) => {
        setProducto(prevPedido => {
            const nuevosProductos = [...prevPedido.productos];
            nuevosProductos.splice(index, 1);
            return {
                ...prevPedido,
                productos: nuevosProductos
            };
        });
    };

    const onInputChangePedido = (e, name) => {
        const val = (e.target && e.target.value) || '';
        // console.log(val)
        let _pedido = { ...pedido };

        _pedido[`${name}`] = val;

        setPedido(_pedido);
    };

    const handleChangeFechaDeEntrega = (event) => {
        const newFechaDeEntrega = event.value; // Obtener la nueva fecha seleccionada del evento

        setPedido(prevPedido => ({
            ...prevPedido,
            fechaDeEntrega: newFechaDeEntrega
        }));
    };

    const fechaCargaBodyTemplate = (rowData) => {
        const fecha = new Date(rowData.fechaDeCarga);
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString(undefined, opciones);

        return <span>{fechaFormateada}</span>;
    };

    const fechaEntregaBodyTemplate = (rowData) => {
        const fecha = new Date(rowData.fechaDeEntrega);
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString(undefined, opciones);

        return <span>{fechaFormateada}</span>;
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Lista de Pedidos</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const headerProductos = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Lista de Productos</h4>
        </div>
    );

    const pedidoDialogFooter = (
        <React.Fragment>
            <Button type="button" label="Agregar Producto" icon="pi pi-plus" className="mt-2" onClick={handleAgregarProducto} />
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialogPedido} />
            <Button label="Save" icon="pi pi-check" type='Submit' onClick={savePedido} />
        </React.Fragment>
    );

    const deletePedidoDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined /* onClick={hideDeletePedidoDialog} */ />
            <Button label="Si" icon="pi pi-check" severity="danger" /* onClick={deletePedido} */ />
        </React.Fragment>
    );

    const deletePedidosDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined /* onClick={hideDeletePedidosDialog} */ />
            <Button label="Yes" icon="pi pi-check" severity="danger" /* onClick={deleteSelectedPedidos} */ />
        </React.Fragment>
    );

    return (

        <div>
            <Toolbar className="mb-4" left={botonCrear} right={botonLista}></Toolbar>
            <header className='flex justify-content-center mb-3'>
                <h1>Pedidos</h1>
            </header>
            <div className='containerPedidos'>

                {isLoading ? (
                    // Mostrar el skeleton mientras los marcadores están cargando
                    <div className="border-round border-1 surface-border p-4 surface-card">
                        <div className="flex mb-3">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div>
                                <Skeleton width="10rem" className="mb-2"></Skeleton>
                                <Skeleton width="5rem" className="mb-2"></Skeleton>
                                <Skeleton height=".5rem"></Skeleton>
                            </div>
                        </div>
                        <Skeleton width="100%" height="150px"></Skeleton>
                        <div className="flex justify-content-between mt-3">
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                        </div>

                        <br className="mt-3" />

                        <div className="flex mb-3">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div>
                                <Skeleton width="10rem" className="mb-2"></Skeleton>
                                <Skeleton width="5rem" className="mb-2"></Skeleton>
                                <Skeleton height=".5rem"></Skeleton>
                            </div>
                        </div>
                        <Skeleton width="100%" height="150px"></Skeleton>
                        <div className="flex justify-content-between mt-3">
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                        </div>
                    </div>
                ) : (

                    <div className="grid cardPedidos" >
                        {pedidos.map((data, index) => (
                            <div className="col-12 md:col-6 lg:col-3 " key={index}>
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Pedido ID: {data.id}</span>
                                            <div className="text-900 font-medium text-xl mb-3">Cliente Nombre: {data.cliente}</div>
                                            <div className="text-900 font-medium text-xl mb-3">Cantidad de productos: {data.cantidad}</div>
                                            <div className="text-900 font-medium text-xl mb-3">Total: ${data.saldoTotal}</div>

                                        </div>
                                        <div className='mt-5 ml-5'>
                                            <div className="text-900 font-medium text-xl mb-3">fecha de carga: {fechaCargaBodyTemplate(data)}</div>
                                            <div className="text-900 font-medium text-xl mb-3">fechaDeEntrega: {fechaEntregaBodyTemplate(data)}</div>
                                        </div>
                                        {/* <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                                    </div> */}
                                    </div>
                                    <span className="text-green-500 font-medium">24 new </span>
                                    <span className="text-500">since last visit</span>
                                </div>
                            </div>

                        ))}

                    </div>

                )}
            </div>


            <form >
                <Dialog visible={pedidoDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Pedido Details" modal className="p-fluid" footer={pedidoDialogFooter} onHide={hideDialogPedido}>


                    {producto.productos.map((producto, index) => (
                        <div key={index}>
                            <div className='formgrid grid'>

                                <div className="field col">
                                    <label htmlFor={`nombreProducto-${index}`} className="font-bold">Producto</label>
                                    <Dropdown
                                        id={`nombreProducto-${index}`}
                                        name="nombreProducto"
                                        value={producto.nombreProducto}
                                        onChange={(e) => handleChange(e, index)}
                                        options={nombreDeProducto}
                                        showClear
                                        placeholder="Select a Product"
                                        className="w-full md:w-14rem" />
                                </div>

                                <div className="field col">
                                    <label htmlFor={`cantidad-${index}`} className="font-bold">Cantidad</label>
                                    <InputNumber
                                        id={`cantidad-${index}`}
                                        name="cantidad"
                                        value={producto.cantidad}
                                        onValueChange={(e) => handleChange(e, index)}
                                        showButtons
                                    />
                                </div>

                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {index > 0 && (
                                    <Button type="button" label="Eliminar Producto" className="p-button-danger p-button-am mi-boton" icon="pi pi-trash" outlined onClick={() => handleEliminarProducto(index)} style={{ width: '45%', height: '50%', marginBottom: '1rem' }} />
                                )}

                            </div>
                        </div>
                    ))}


                    <div className="field">
                        <label htmlFor="cliente" className="font-bold">
                            Cliente
                        </label>
                        <InputText id="cliente" value={pedido.cliente} onChange={e => onInputChangePedido(e, 'cliente')} />
                    </div>
                    <div className="field">
                        <label htmlFor="fechaDeEntrega" className="font-bold">
                            Fecha de entrega
                        </label>
                        <Calendar id="fechaDeEntrega" type="datetime" value={pedido.fechaDeEntrega} onChange={handleChangeFechaDeEntrega} showIcon />
                    </div>
                </Dialog>

            </form>

            {/* comfimacion de borrar pedido */}

            <Dialog visible={deletePedidoDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePedidoDialogFooter} onHide={hideDeletePedidoDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {pedido && (
                        <span>
                            estas seguro que desea eliminar el pedido de <b>{pedido.cliente}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/* confirmacion para borrar varios pedidos  */}

            <Dialog visible={deletePedidosDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePedidosDialogFooter} onHide={hideDeletePedidosDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {pedido && <span>
                        Estas seguro de queres eliminar los pedidos seleccionados?
                    </span>}
                </div>
            </Dialog>
        </div>
    )

}