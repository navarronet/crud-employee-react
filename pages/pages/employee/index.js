import getConfig from 'next/config';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '/demo/service/ProductService';
import { EmployeeService } from '/demo/service/EmployeeService';
import axios from 'axios';
// import * as API from '../../demo/utils/Endpoints';
import * as API from '../../../demo/utils/Endpoints';
import * as DEFAULT_MESSAGES from '../../../demo/utils/DefaultMessages';

const employee = () => {
    let emptyModel = {
        id: null,
        firstName: '',
        lastName: '',
        dob: null,
        hiredDate: null,
        salary: 0,
        email: '',
        phoneNumber: ''
    };

    const [models, setModels] = useState(null);
    const [products, setProducts] = useState(null);
    const [productDialog, setModelDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

    const [model, setModel] = useState(emptyModel);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    useEffect(() => {
        // const productService = new ProductService();
        const service = new EmployeeService();

        service.getAll().then((data) => setModels(data));

        // productService.getProducts().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        // setModel(emptyProduct);
        setModel(emptyModel);
        setSubmitted(false);
        setModelDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setModelDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveModel = () => {
        setSubmitted(true);

        if (model.nombreTalla.trim()) {
            let _models = [...models];

            if (model.id) {
                const servicio = new EmployeeService();

                axios
                    .patch(API.EMPLOYEE, {
                        id: model.id,
                        nombreTalla: model.nombreTalla,
                        modifiedBy: 1
                    })
                    .then((res) => {
                        DEFAULT_MESSAGES.SHOW_SUCCESSFUL_EDIT_TOAST(toast);

                        servicio.getAll().then((data) => setModels(data));

                        setModels(_models);
                        setModelDialog(false);
                        setModel(emptyModel);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            // Request made and server responded
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);

                            if (error.response.status === 409) DEFAULT_MESSAGES.SHOW_DUPLICATED_TOAST(toast);
                        } else if (error.request) {
                            // The request was made but no response was received
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }
                    });
            } else {
                const tallaService = new EmployeeService();
                try {
                    axios
                        .post(API.EMPLOYEE, {
                            nombreTalla: marca.nombreTalla,
                            createdBy: 1
                        })
                        .then((res) => {
                            DEFAULT_MESSAGES.SHOW_SUCCESSFUL_NEW_TOAST(toast);
                            tallaService.getAll().then((data) => setTallaes(data));

                            setTallaes(_marcas);
                            setTallaDialog(false);
                            setTalla(emptyTalla);
                        })
                        .catch(function (error) {
                            if (error.response) {
                                // Request made and server responded
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);

                                if (error.response.status === 409) DEFAULT_MESSAGES.SHOW_DUPLICATED_TOAST(toast);
                            } else if (error.request) {
                                // The request was made but no response was received
                                console.log(error.request);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                            }
                        });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (model.nombreTalla.trim()) {
            let _products = [...products];
            let _product = { ...model };

            let _models = [...models];
            let _model = { ...model };

            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setModelDialog(false);
            setModel(emptyModel);
        }
    };

    const editModel = (_model) => {
        setModel({ ..._model });
        setModelDialog(true);

        setModel({ ..._model, dob: new Date(_model.dob), hiredDate: new Date(_model.hiredDate) });
    };

    const confirmDeleteProduct = (product) => {
        setModel(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setModel(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setModel(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let model = { ...model };
        model[`${name}`] = val;
        setModel(model);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _model = { ...model };
        _model[`${name}`] = val;

        setModel(_model);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    };

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">id</span>
                {rowData.id}
            </>
        );
    };

    const firstNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">First Name</span>
                {rowData.firstName}
            </>
        );
    };

    const lastNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Last Name</span>
                {rowData.lastName}
            </>
        );
    };

    const hiredDateBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Hired Date</span>
                {rowData.hiredDate}
            </>
        );
    };

    const dobBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Date of Birth</span>
                {new Date(rowData['dob']).toLocaleDateString('en-US')}
            </>
        );
    };

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const phoneNumberBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Phone Number</span>
                {rowData.phoneNumber}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`${contextPath}/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        );
    };

    const salaryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Salary</span>
                {formatCurrency(rowData.salary)}
            </>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readOnly cancel={false} />
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editModel(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Employees</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveModel} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={models}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="firstName" header="First Name" sortable body={firstNameBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="lastName" header="Last Name" sortable body={lastNameBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="dob" header="Date of Birth" sortable body={dobBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="phoneNumber" header="Phone Number" sortable body={phoneNumberBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Employee Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="firstName">First Name</label>
                            <InputText id="firstName" value={model.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !model.firstName })} />
                            {submitted && !model.firstName && <small className="p-invalid">the first name is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="lastName">Last Name</label>
                            <InputText id="lastName" value={model.lastName} onChange={(e) => onInputChange(e, 'lastName')} required className={classNames({ 'p-invalid': submitted && !model.lastName })} />
                            {submitted && !model.lastName && <small className="p-invalid">the last name is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="dob">Date of birth</label>
                            <Calendar id="dob" dateFormat="mm/dd/yy" value={model.dob} onChange={(e) => setModel({ ...model, dob: e.value })} required className={classNames({ 'p-invalid': submitted && !model.dob })} showIcon />
                            {submitted && !model.dob && <small className="p-invalid">the date of birth is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={model.email} onChange={(e) => onInputChange(e, 'email')} required className={classNames({ 'p-invalid': submitted && !model.email })} />
                            {submitted && !model.email && <small className="p-invalid">the email is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <InputText id="phoneNumber" value={model.phoneNumber} onChange={(e) => onInputChange(e, 'phoneNumber')} required className={classNames({ 'p-invalid': submitted && !model.phoneNumber })} />
                            {submitted && !model.phoneNumber && <small className="p-invalid">the phone number is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="salary">Salary</label>
                            <InputNumber id="salary" value={model.salary} onValueChange={(e) => onInputChange(e, 'salary')} required className={classNames({ 'p-invalid': submitted && !model.salary })} />
                            {submitted && !model.salary && <small className="p-invalid">the salary is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="hiredDate">Hired Date</label>
                            <Calendar
                                id="hiredDate"
                                dateFormat="mm/dd/yy"
                                value={model.hiredDate}
                                onChange={(e) => setModel({ ...model, hiredDate: e.value })}
                                required
                                className={classNames({ 'p-invalid': submitted && !model.hiredDate })}
                                showIcon
                            />
                            {submitted && !model.hiredDate && <small className="p-invalid">the hired date is mandatory</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {model && (
                                <span>
                                    Are you sure you want to delete{' '}
                                    <b>
                                        {model.firstName} {model.lastName}
                                    </b>
                                    ?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {model && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default employee;
