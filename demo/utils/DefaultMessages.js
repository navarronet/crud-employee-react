export const ALREADY_EXISTS = 'Already exists.';
export const DATA_SAVED = 'Data successfully saved.';
export const DATA_EDITED = 'Data successfully edited.';
export const AN_ERROR_HAS_OCCURRED = 'An error has occurred.';
export const DATA_DETELED = 'Data successfully deleted.';
export const DATA_DETELED_ALL = 'All records have been deleted.';

export const ARE_YOU_SURE_YOU_WANT_TO_DELETE = 'Are you sure you want to delete ';
export const ARE_YOU_SURE_YOU_WANT_TO_DISABLE = 'Are you sure you want to disable ';
export const QUESTION_MARK = '?';
export const ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_LIST = 'Are you sure you want to delete the items selected?';
export const ARE_YOU_SURE_YOU_WANT_TO_DISABLE_THE_LIST = 'Are you sure you want to disable the items selected?';

export const EMAIL_NOT_VALID = 'The email is not valid.';
export const PASSWORDS_DO_NOT_MATCH = 'The passwords do not match.';

export const TOAST_SEVERITY_SUCCESS = 'success';
export const TOAST_SEVERITY_WARN = 'warn';
export const TOAST_SEVERITY_ERROR = 'error';

export const TOAST_SUMMARY_SUCCESS = 'Success';
export const TOAST_SUMMARY_WARN = 'Warning';
export const TOAST_SUMMARY_ERROR = 'Error';

export const TOAST_LIFE = 3000;

export const SHOW_SUCCESSFUL_NEW_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: DATA_SAVED, life: TOAST_LIFE });
};

export const SHOW_SUCCESSFUL_EDIT_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: DATA_EDITED, life: TOAST_LIFE });
};

export const SHOW_SUCCESSFUL_DELETED_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: DATA_DETELED, life: TOAST_LIFE });
};

export const SHOW_SUCCESSFUL_DELETED_ALL_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: DATA_DETELED_ALL, life: TOAST_LIFE });
};

export const SHOW_ERROR_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_ERROR, summary: TOAST_SUMMARY_ERROR, detail: AN_ERROR_HAS_OCCURRED, life: TOAST_LIFE });
};

export const SHOW_DUPLICATED_TOAST = (myToast) => {
    myToast.current.show({ severity: TOAST_SEVERITY_WARN, summary: TOAST_SUMMARY_WARN, detail: ALREADY_EXISTS, life: TOAST_LIFE });
};

export const SHOW_SUCCESS_TOAST_CUSTOM_MESSAGE = (myToast, customMessage) => {
    myToast.current.show({ severity: TOAST_SEVERITY_SUCCESS, summary: TOAST_SUMMARY_SUCCESS, detail: customMessage, life: TOAST_LIFE });
};

export const SHOW_WARNING_TOAST_CUSTOM_MESSAGE = (myToast, customMessage) => {
    myToast.current.show({ severity: TOAST_SEVERITY_WARN, summary: TOAST_SUMMARY_WARN, detail: customMessage, life: TOAST_LIFE });
};
