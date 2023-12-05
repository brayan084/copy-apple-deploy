import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { FileUpload } from 'primereact/fileupload';
// import { Dropdown } from 'primereact/dropdown';



export default function ListadoDeProductos() {
    let emptyProduct = {
        id: null,
        nombre: '',
        nombreComercial: '',
        imagen: '',
        precio: 0,
        categoria: null,
        cantidad: 0,
        compra: 0,
        inventario: null,
        rating: null,
        proveedorID: null,
        unidadDeMedida: null,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [file, setFile] = useState(null)
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    /* const [selectedUnidad, setSelectedUnidad] = useState(null);
    const opciones = [
        { name: 'Unidad', code: 'I' },
        { name: 'Kilo', code: 'k' },
        { name: 'Kilogramo', code: 'kg' },
        { name: 'Gramo', code: 'g' },
    ];
 */

    useEffect(() => {
        getProductos()
    }, [])

    const getProductos = async () => {
        try {
            const r = await axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/productos/verProducto');
            setProducts(r.data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formdata = new FormData();
            if (file) {
                formdata.append('imagen', file); // Agrega la imagen al FormData solo si hay un archivo seleccionado
            }
    
            // Agrega los datos del producto al FormData
            Object.keys(product).forEach((key) => {
                formdata.append(key, product[key]);
            });
    
            if (product.id) {
                await axios.put(`https://deploybackendtp-44411f5799d1.herokuapp.com/productos/${product.id}`, product);
                const updatedProducts = [...products];
                const productIndex = updatedProducts.findIndex((p) => p.id === product.id);
                updatedProducts[productIndex] = { ...product };
                setProducts(updatedProducts);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Producto editado', life: 3000 });
            } else {
                const response = await axios.post('https://deploybackendtp-44411f5799d1.herokuapp.com/productos/crearProducto', product);
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


    const deleteProduct = async () => {
        try {
            if (product.id) {
                await axios.delete(`https://deploybackendtp-44411f5799d1.herokuapp.com/productos/${product.id}`);
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

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['categoria'] = e.value;
        setProduct(_product);
    };

    const onStatusChange = (e) => {
        let _product = { ...product };

        _product['inventario'] = e.value;
        setProduct(_product);
    };

    const onMedidaChange = (e) => {
        let _product = { ...product };

        _product['unidadDeMedida'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, nombre) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${nombre}`] = val;

        setProduct(_product);
    };

    const onInputChangeRating = (e, nombre) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${nombre}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, nombre) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${nombre}`] = val;

        setProduct(_product);
    };


    const imageBodyTemplate = (rowData) => {
        const base64Image = new Uint8Array(rowData.imagen).reduce((data, byte) => data + String.fromCharCode(byte), '');
        const imageSrc = `data:image/png;base64,${btoa(base64Image)}`;

        return <img src={imageSrc} alt={rowData.nombre} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };


    const selectedHandler = (event) => {
        const selectedFile = event.files[0]; // Obtiene el archivo seleccionado
        setFile(selectedFile); // Guarda el archivo seleccionado en el estado 'file'
    };


    const moneyTemplate = (amount) => {
        return (
            <React.Fragment>
                <div>
                    {amount?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </div>
            </React.Fragment>
        )

    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => { /* función que devuelve un tag de PrimeReact, donde toma el valor del estado de inventario del objeto rowData, y severity, que toma el valor retornado por la función getSeverity al pasarle el estado de inventario */
        return <Tag value={rowData.inventario} severity={getSeverity(rowData)}></Tag>;
    };

    const unidadTemplate = (rowData) => {
        return <Tag value={rowData.unidadDeMedida}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded text raised className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded text raised severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (product) => { /* switch que cambia el color del estado del inventario en el que se encuentre el producto */
        switch (product.inventario) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Productos</h4>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New Product" icon="pi pi-plus" severity="success" onClick={openNew} rounded raised />
            </div>
        );
    };

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );


    return (
        <div> {/* componente de PrimeReact */}
            <Toast ref={toast} />
            <div>
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" header={header}>
                    <Column field="id" header="Id"></Column>
                    <Column field="nombre" header="Nombre" sortable></Column>
                    <Column field="nombreComercial" header="Nombre Comercial"></Column>
                    <Column field="imagen" header="Imagen" body={imageBodyTemplate}></Column>
                    <Column field="precio" header="Precio" body={(rowData) => { return moneyTemplate(rowData.precio) }} sortable ></Column>
                    <Column field="categoria" header="Categoría" sortable></Column>
                    <Column field="reseñas" header="Reseñas" body={ratingBodyTemplate} sortable></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable></Column>
                    <Column field="proveedorID" header="Proveedor"></Column>
                    <Column field="cantidad" header="cantidad"></Column>
                    <Column field="compra" header="Compra" body={(rowData) => { return moneyTemplate(rowData.compra) }}></Column>
                    <Column field="unidadDeMedida" header="Unidad de Medida" sortable body={unidadTemplate} ></Column>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" onHide={hideDialog}>
                {product.imagen && <img src={`${product.imagen}`} alt={product.imagen} className="product-image block m-auto pb-3" style={{ width: '100px' }} />}

                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label htmlFor="nombre" className="font-bold">
                            Nombre
                        </label>
                        <InputText id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nombre })} />
                        {submitted && !product.nombre && <small className="p-error">El nombre es requerido.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="nombreComercial" className="font-bold">
                            Nombre Comercial
                        </label>
                        <InputText id="nombreComercial" value={product.nombreComercial} onChange={(e) => onInputChange(e, 'nombreComercial')} required rows={3} cols={20} />
                    </div>

                    <div className="field">
                        <label htmlFor="proveedorID" className="font-bold">
                            Proveedor
                        </label>
                        <InputNumber id="proveedorID" value={product.proveedorID} onValueChange={(e) => onInputNumberChange(e, "proveedorID")} required rows={3} cols={20} />
                    </div>

                    <div className="field">
                        <label htmlFor="imagen" className="font-bold">
                            Imagen
                        </label>
                        <FileUpload id="imagen" mode="basic" onSelect={selectedHandler} name="imagen" url="http://localhost:3001/productos/imagen/post" accept="image/*" maxFileSize={1000000} />

                    </div>

                    <div className="field mt-2">
                        <label htmlFor="rating" className="font-bold">
                            Reseña
                        </label>
                        <Rating id="rating" value={product.rating} onChange={(e) => onInputChangeRating(e, 'rating')} cancel={false} />
                    </div>

                    <div className="field">
                        <label className="mb-3 font-bold">Categoría</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category1" name="category" value="Electrodomesticos" onChange={onCategoryChange} checked={product.categoria === 'Electrodomesticos'} />
                                <label htmlFor="category1">Electrodomesticos</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category2" name="category" value="Ropa" onChange={onCategoryChange} checked={product.categoria === 'Ropa'} />
                                <label htmlFor="category2">Ropa</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category3" name="category" value="Tecnología" onChange={onCategoryChange} checked={product.categoria === 'Tecnología'} />
                                <label htmlFor="category3">Tecnología</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category4" name="category" value="Deporte" onChange={onCategoryChange} checked={product.categoria === 'Deporte'} />
                                <label htmlFor="category4">Deporte</label>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="mb-3 font-bold">Unidad de Medida</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="unidadDeMedida1" name="unidadDeMedida" value="Unidad" onChange={onMedidaChange} checked={product.unidadDeMedida === 'Unidad'} />
                                <label htmlFor="unidadDeMedida1">Unidad</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="unidadDeMedida2" name="unidadDeMedida" value="Kilo" onChange={onMedidaChange} checked={product.unidadDeMedida === 'Kilo'} />
                                <label htmlFor="unidadDeMedida2">Kilo</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="unidadDeMedida3" name="unidadDeMedida" value="Kilogramo" onChange={onMedidaChange} checked={product.unidadDeMedida === 'Kilogramo'} />
                                <label htmlFor="unidadDeMedida3">Kilogramo</label>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="mb-3 font-bold">Status</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="INSTOCK" name="Status" value="INSTOCK" onChange={onStatusChange} checked={product.inventario === 'INSTOCK'} />
                                <label htmlFor="INSTOCK">INSTOCK</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="LOWSTOCK" name="Status" value="LOWSTOCK" onChange={onStatusChange} checked={product.inventario === 'LOWSTOCK'} />
                                <label htmlFor="LOWSTOCK">LOWSTOCK</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="OUTOFSTOCK" name="Status" value="OUTOFSTOCK" onChange={onStatusChange} checked={product.inventario === 'OUTOFSTOCK'} />
                                <label htmlFor="OUTOFSTOCK">OUTOFSTOCK</label>
                            </div>
                        </div>
                    </div>

                    <div className="formgrid grid">

                        <div className="field col">
                            <label htmlFor="precio" className="font-bold">
                                Precio
                            </label>
                            <InputNumber id="precio" value={product.precio} onValueChange={(e) => onInputNumberChange(e, "precio")} />
                        </div>

                        <div className="field col">
                            <label htmlFor="compra" className="font-bold">
                                Compra
                            </label>
                            <InputNumber id="compra" value={product.compra} onValueChange={(e) => onInputNumberChange(e, "compra")} />
                        </div>

                    </div>

                    <div className="formgrid grid">

                        <div className="field col">
                            <label htmlFor="cantidad" className="font-bold">
                                Cantidad
                            </label>
                            <InputNumber id="cantidad" value={product.cantidad} onValueChange={(e) => onInputNumberChange(e, 'cantidad')} />
                        </div>

                        {/* <div className="field col">
                            <label className="font-bold">Unidad de Medida</label>
                            <Dropdown
                                value={selectedUnidad}
                                options={opciones}
                                onChange={(e) => {
                                    setSelectedUnidad(e.value);
                                    setProduct((prevProduct) => ({
                                        ...prevProduct,
                                        unidadDeMedida: e.value,
                                    }));
                                }}
                                placeholder="Seleccionar Unidad de Medida"
                                optionLabel="name"
                            />
                        </div> */}

                    </div>

                    <Button label="Save" icon="pi pi-check" type='submit' rounded />
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
