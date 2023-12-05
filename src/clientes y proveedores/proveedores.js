import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function Proveedores() {
    let emptyProduct = {
        id: null,
        nombre: '',
        cuit: 0
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        getProductos()
    }, [])

    const getProductos = async () => {

        axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/proveedores').then(r => {
            setProducts(r.data)
        }).catch(error => {
            console.log(error);
        });

    }

    const saveProduct = async (e) => {
         e.preventDefault();

        try {
            if (product.id) {
                await axios.put(`https://deploybackendtp-44411f5799d1.herokuapp.com/proveedores/${product.id}`, product);
                const updatedProducts = [...products];
                const productIndex = updatedProducts.findIndex((p) => p.id === product.id);
                updatedProducts[productIndex] = { ...product };
                setProducts(updatedProducts);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Producto editado', life: 3000 });
            } else {
                const response = await axios.post('https://deploybackendtp-44411f5799d1.herokuapp.com/proveedores/createProveedores', product);
                const newProduct = response.data;
                setProducts([...products, newProduct]);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Producto creado', life: 3000 });
            }
            hideDialog();
            getProductos();
        } catch (error) {
            console.error(error);
        } 
    };

    const deleteProduct = async (e) => {
        try {
            if (product.id) {
                await axios.delete(`https://deploybackendtp-44411f5799d1.herokuapp.com/proveedores/${product.id}`);
                const updatedProducts = products.filter((p) => p.id !== product.id);
                setProducts(updatedProducts);
                setDeleteProductDialog(false);
                setProduct(emptyProduct);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Producto eliminado', life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };


    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} rounded raised/>
            </div>
        );
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
        </div>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div>
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" header={header}>
                    <Column field="id" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nombre" header="NOMBRE" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="cuit" header="CUIT" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" onHide={hideDialog}>

                <form  onSubmit={saveProduct}>
                    <div className="field">
                        <label htmlFor="nombre" className="font-bold">
                            Nombre
                        </label>
                        <InputText id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nombre })} />
                        {submitted && !product.nombre && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="cuit" className="font-bold">
                            cuit
                        </label>
                        <InputNumber id="cuit" value={product.cuit} onChange={(e) => onInputNumberChange(e, 'cuit')} required rows={3} cols={20} />
                    </div>

                    <Button label="Save" icon="pi pi-check" type='submit' rounded/>
                    <Button label="Cancel" icon="pi pi-times" outlined rounded onClick={hideDialog} className='mt-2' />
                </form>

            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
