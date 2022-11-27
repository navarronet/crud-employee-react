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
import * as API from '../demo/utils/Endpoints';
import * as DEFAULT_MESSAGES from '../demo/utils/DefaultMessages';

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
    const [productDialog, setModelDialog] = useState(false);
    const [deleteProductDialog, setDeleteModelDialog] = useState(false);
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
        setDeleteModelDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveModel = () => {
        setSubmitted(true);

        if (model.firstName.trim() || model.lastName.trim()) {
            let _models = [...models];

            if (model.id) {
                const service = new EmployeeService();

                axios
                    .put(API.EMPLOYEE, {
                        id: model.id,
                        firstName: model.firstName,
                        lastName: model.lastName,
                        dob: model.dob,
                        hiredDate: model.hiredDate,
                        salary: model.salary,
                        email: model.email,
                        phoneNumber: model.phoneNumber
                    })
                    .then((res) => {
                        DEFAULT_MESSAGES.SHOW_SUCCESSFUL_EDIT_TOAST(toast);

                        service.getAll().then((data) => setModels(data));

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
                const service = new EmployeeService();
                try {
                    axios
                        .post(API.EMPLOYEE, {
                            firstName: model.firstName,
                            lastName: model.lastName,
                            dob: model.dob,
                            hiredDate: model.hiredDate,
                            salary: model.salary,
                            email: model.email,
                            phoneNumber: model.phoneNumber
                        })
                        .then((res) => {
                            DEFAULT_MESSAGES.SHOW_SUCCESSFUL_NEW_TOAST(toast);
                            service.getAll().then((data) => setModels(data));

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
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    const editModel = (_model) => {
        setModel({ ..._model });
        setModelDialog(true);

        setModel({ ..._model, dob: new Date(_model.dob), hiredDate: new Date(_model.hiredDate) });
    };

    const confirmDeleteModel = (product) => {
        setModel(product);
        setDeleteModelDialog(true);
    };

    const deleteModel = () => {
        axios
            .delete(API.EMPLOYEE + model.id)
            .then((res) => {
                let _models = models.filter((val) => val.id !== model.id);
                setModels(_models);
                setDeleteModelDialog(false);
                setModel(emptyModel);
                DEFAULT_MESSAGES.SHOW_SUCCESSFUL_DELETED_TOAST(toast);
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    DEFAULT_MESSAGES.SHOW_ERROR_TOAST(toast);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = models.filter((val) => !selectedProducts.includes(val));
        setModels(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
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
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
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

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editModel(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteModel(rowData)} />
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
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteModel} />
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
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employees"
                        globalFilter={globalFilter}
                        emptyMessage="No employees found."
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
                            <InputText id="firstName" value={model.firstName} onChange={(e) => setModel({ ...model, firstName: e.target.value })} required autoFocus className={classNames({ 'p-invalid': submitted && !model.firstName })} />
                            {submitted && !model.firstName && <small className="p-invalid">the first name is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="lastName">Last Name</label>
                            <InputText id="lastName" value={model.lastName} onChange={(e) => setModel({ ...model, lastName: e.target.value })} required className={classNames({ 'p-invalid': submitted && !model.lastName })} />
                            {submitted && !model.lastName && <small className="p-invalid">the last name is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="dob">Date of birth</label>
                            <Calendar id="dob" dateFormat="mm/dd/yy" value={model.dob} onChange={(e) => setModel({ ...model, dob: e.value })} required className={classNames({ 'p-invalid': submitted && !model.dob })} showIcon />
                            {submitted && !model.dob && <small className="p-invalid">the date of birth is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={model.email} onChange={(e) => setModel({ ...model, email: e.target.value })} required className={classNames({ 'p-invalid': submitted && !model.email })} />
                            {submitted && !model.email && <small className="p-invalid">the email is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <InputText id="phoneNumber" value={model.phoneNumber} onChange={(e) => setModel({ ...model, phoneNumber: e.target.value })} required className={classNames({ 'p-invalid': submitted && !model.phoneNumber })} />
                            {submitted && !model.phoneNumber && <small className="p-invalid">the phone number is mandatory</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="salary">Salary</label>
                            <InputNumber id="salary" value={model.salary} onValueChange={(e) => setModel({ ...model, salary: e.value })} required className={classNames({ 'p-invalid': submitted && !model.salary })} />
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
                            {model && <span>Are you sure you want to delete the selected employees?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default employee;
