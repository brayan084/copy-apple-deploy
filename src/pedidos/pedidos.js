
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



export default function Pedidos() {


    let emptyPedidos = {
        pedidoId: null,
        cliente: '',
        saldoTotal: 0,
        cantidad: 0,
        fechaDeCarga: Date,
        fechaDeEntrega: Date
    };

    useEffect(() => {
        obtenerPedidos();
        getProducts();
        obtenerListadoProductos();
    }, []);

    const obtenerPedidos = async () => {
        setLoading(true);

        try {
            const response1 = await axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/pedidos/verPedido');
            setPedidos(response1.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    // const [selectedCity, setSelectedCity] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [pedido, setPedido] = useState(emptyPedidos);
    const [pedidoDialog, setPedidoDialog] = useState(false);
    const [deletePedidoDialog, setDeletePedidoDialog] = useState(false);
    const [deletePedidosDialog, setDeletePedidosDialog] = useState(false);
    const [selectedPedidos, setSelectedPedidos] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(selectedPedidos)
    // console.log(pedido)
    // console.log(pedidos)

    const getProducts = async () => {
        try {
            const response = await axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/pedidos/getProducts');
            // console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const [products, setProducts] = useState([]);

    const Cosas = products.map((items) => {
        return items.map((item) => {
            return item.nombre
        })
    })
    const nombreDeProducto = [...new Set(Cosas.flat())];
    // console.log(nombreDeProducto);


    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };


    const openNewPedido = () => {
        setPedido(emptyPedidos);
        setProducto(emptyProduct);
        setPedidoDialog(true);
    }

    const hideDialogPedido = () => {
        setPedidoDialog(false);
    };


    const hideDeletePedidoDialog = () => {
        setDeletePedidoDialog(false);
    };


    const hideDeletePedidosDialog = () => {
        setDeletePedidosDialog(false);
    };

    /* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    let emptyProduct = {
        productos: [{ nombreProducto: '', cantidad: 0, pedidoId: 1 }]
    }


    const [producto, setProducto] = useState(emptyProduct);
    const [listadoProductos, setListadoProductos] = useState([])
    // console.log(listadoProductos);

    const obtenerListadoProductos = async () => {
        try {
            const response = await axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/listaProductos/verProducto')
            setListadoProductos(response.data)
        } catch (error) {
            console.log(error)
        }
        // console.log(producto);
    }

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


    const handleAgregarProducto = () => {
        setProducto(prevPedido => ({
            ...prevPedido,
            productos: [...prevPedido.productos, { nombreProducto: '', cantidad: 0, pedidoId: 1 }]
        }));
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


    /* ------------------------------------------------------------------------------------------------------------------------------------------------ */



    const savePedido = async () => {
        let _pedidos = [...pedidos];
        // let _pedido = { ...pedido };
        setPedidoDialog(false);
        setLoading(true);

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
                // console.log(pedido)
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });


            }
        }


        setProducto(emptyProduct);
        setPedido(emptyPedidos);
        setLoading(false);
        setPedidos(pedidos)
        await obtenerPedidos();
        await obtenerListadoProductos();

    }


    const editPedido = async (pedido) => {
        // console.log(pedido)
        // console.log(pedido.pedidoId)

        try {
            const response = await axios.get(`https://deploybackendtp-44411f5799d1.herokuapp.com/ListaProductos/${pedido.pedidoId}`)
            // console.log(response.data)
            setProducto({ productos: response.data })
        } catch (error) {
            console.log(error)
        }

        const fechaDeEntregaDate = new Date(pedido.fechaDeEntrega);

        setPedido({ ...pedido, fechaDeEntrega: fechaDeEntregaDate });

        setPedidoDialog(true);
    };

    const confirmDeletePedido = (pedido) => {
        setPedido(pedido);
        setDeletePedidoDialog(true);
    };

    const deletePedido = async () => {
        // let _pedidos = pedidos.filter((val) => val.id !== pedido.id);
        setDeletePedidoDialog(false);
        setLoading(true);

        const { pedidoId: id } = pedido;

        console.log(id)
        try {
            await axios.delete(`https://deploybackendtp-44411f5799d1.herokuapp.com/pedidos/${id}`);
            // Eliminación exitosa, realiza las acciones adicionales que necesites
        } catch (error) {
            // Manejo de errores en caso de que la eliminación falle
            console.log(error);
        }
        setLoading(false);

        setPedido(emptyPedidos);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        obtenerPedidos();
    };

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


    // const exportCSV = () => {
    //     dt.current.exportCSV();
    // };

    const confirmDeleteSelectedP = () => {
        setDeletePedidosDialog(true);
    };

    const deleteSelectedPedidos = async () => {
        const selectedIds = selectedPedidos.map(pedido => pedido.id);
        // console.log(selectedIds)
        setDeletePedidosDialog(false);
        setLoading(true);

        try {
            await axios.post('https://deploybackendtp-44411f5799d1.herokuapp.com/pedidos/borrarPedidos', { ids: selectedIds })
        } catch (error) {
            console.log('hubo un error en la eliminación', error)
        }

        setLoading(false);
        setSelectedPedidos(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        obtenerPedidos();
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

    const botonCrear = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNewPedido} rounded raised />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelectedP} disabled={!selectedPedidos || !selectedPedidos.length} rounded raised />
            </div>
        );
    };
    const botonCuadricula = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <a href="/pedidos/pedidosMain"><Button label='Cards' icon="pi pi-clone" severity="success" rounded raised /></a>
            </div>
        )
    }
    const fechaEntregaBodyTemplate = (rowData) => {
        const fecha = new Date(rowData.fechaDeEntrega);
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString(undefined, opciones);

        return <span>{fechaFormateada}</span>;
    };
    const fechaCargaBodyTemplate = (rowData) => {
        const fecha = new Date(rowData.fechaDeCarga);
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString(undefined, opciones);

        return <span>{fechaFormateada}</span>;
    };
    // const rightToolbarTemplateExport = () => {
    //     return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    // };

    // const cantidadTemplate = (productos) => {
    //     <React.Fragment>
    //         <div>
    //             <h1>{productos.cantidad}</h1>
    //         </div>
    //     </React.Fragment>
    // }


    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.saldoTotal);
    };
    const priceBodyTemplateProducto = (rowData) => {
        return formatCurrency(rowData.precioXproductos);
    };

    // const moneyTemplate = (amount) => {
    //     return (
    //         <React.Fragment>
    //             <div>
    //                 {amount?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
    //             </div>
    //         </React.Fragment>
    //     )

    // };


    const actionBodyTemplatePedido = (rowData) => {
        // console.log(rowData)
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editPedido(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeletePedido(rowData)} />
            </React.Fragment>
        );
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
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePedidoDialog} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={deletePedido} />
        </React.Fragment>
    );

    const deletePedidosDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePedidosDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedPedidos} />
        </React.Fragment>
    );



    return (
        <div>
            {/* tabla de pedido  */}
            <Toast ref={toast} />

            <Toolbar className="mb-4" left={botonCrear} right={botonCuadricula}></Toolbar>
            <div className='containerPedidos mb-4'>

                <DataTable ref={dt} value={[...pedidos]} selection={selectedPedidos} onSelectionChange={(e) => setSelectedPedidos(e.value)}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]} loading={loading}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="pedidoId" header="Code Pedido" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="cantidad" header="Cantidad Total Productos" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="cliente" header="Cliente" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="saldoTotal" header="Precio Total" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="fechaDeCarga" header="Fecha de carga" body={fechaCargaBodyTemplate} sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="fechaDeEntrega" header="Fecha de entrega" body={fechaEntregaBodyTemplate} sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplatePedido} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <div className='containerPedidos'>

                <DataTable ref={dt} value={[...listadoProductos]}
                    paginator rows={10} rowsPerPageOptions={[5, 10, 25]} loading={loading}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" header={headerProductos}>
                    <Column field="pedidoId" header="Code Pedido"></Column>
                    <Column field="nombreProducto" header="Nombre Producto"></Column>
                    <Column field="precioXproductos" body={priceBodyTemplateProducto} header="Precio"></Column>
                    <Column field="cantidad" header="Cantidad individual"></Column>
                </DataTable>
            </div>

            {/* dialog de pedido  */}

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
    );
}
