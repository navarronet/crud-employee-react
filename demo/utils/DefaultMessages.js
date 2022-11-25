export const YA_EXISTE = 'Ya existe.';
export const DATOS_GUARDADOS = 'Datos guardados exitosamente.';
export const DATOS_EDITADOS = 'Datos editados exitosamente.';
export const HA_OCURRIDO_UN_ERROR = 'Ha ocurrido un error.';
export const DATOS_ELIMINADOS = 'Datos eliminados exitosamente.';
export const DATOS_ELIMINADOS_TODOS = 'Todos los registros han sido eliminados';

export const ESTA_SEGURO_QUE_DESEA_ELIMINAR = '¿Está seguro que desea eliminar ';
export const ESTA_SEGURO_QUE_DESEA_DESHABILITAR = '¿Está seguro que desea deshabilitar ';
export const QUESTION_MARK = '?';
export const ESTA_SEGURO_QUE_DESEA_ELIMINAR_LISTADO = '¿Está seguro que desea eliminar el listado seleccionado?';
export const ESTA_SEGURO_QUE_DESEA_DESHABILITAR_LISTADO = '¿Está seguro que desea deshabilitar el listado seleccionado?';

export const CORREO_ELECTRONICO_NO_VALIDO = 'El correo electrónico no es valido.';
export const CONTRASENAS_NO_COINDICEN = 'Las contraseñas no coinciden.';

export const TOAST_SEVERITY_SUCCESS = 'success';
export const TOAST_SEVERITY_WARN = 'warn';
export const TOAST_SEVERITY_ERROR = 'error';

export const TOAST_SUMMARY_SUCCESS = 'Exito';
export const TOAST_SUMMARY_WARN = 'Precaución';
export const TOAST_SUMMARY_ERROR = 'Error';

export const TOAST_LIFE = 3000;

export const PREVENTA = {
    PRODUCTO_AGREGADO: 'Producto agregado',
    CLIENTE_FECHA_MONEDA: 'Seleccione un cliente, fecha y moneda'
};

export const SHOW_SUCCESSFUL_NEW_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: DATOS_GUARDADOS, life: TOAST_LIFE });
};

export const SHOW_SUCCESSFUL_EDIT_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: DATOS_EDITADOS, life: TOAST_LIFE });
};

export const SHOW_SUCCESSFUL_DELETED_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: DATOS_ELIMINADOS, life: TOAST_LIFE });
};

export const SHOW_SUCCESSFUL_DELETED_ALL_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: DATOS_ELIMINADOS_TODOS, life: TOAST_LIFE });
};

export const SHOW_ERROR_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_ERROR, summary: TOAST_SUMMARY_ERROR, detail: HA_OCURRIDO_UN_ERROR, life: TOAST_LIFE });
};

export const SHOW_DUPLICATED_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_WARN, summary: TOAST_SUMMARY_WARN, detail: YA_EXISTE, life: TOAST_LIFE });
};

export const SHOW_SUCCESS_TOAST_CUSTOM_MESSAGE = (myToast, customMessage) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: customMessage, life: TOAST_LIFE });
};

export const SHOW_WARNING_TOAST_CUSTOM_MESSAGE = (myToast, customMessage) => {
    myToast.current.show({ severity: TOAST_SEVERITY_WARN, summary: TOAST_SUMMARY_WARN, detail: customMessage, life: TOAST_LIFE });
};
