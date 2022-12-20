import getConfig from 'next/config';
import axios from 'axios';
import * as API from '../utils/Endpoints';

export class EmployeeService {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getAll() {
        return axios.get(API.EMPLOYEE).then((res) => res.data);
    }

    getById(id) {
        return axios.get(API.GET_BY_ID + id).then((res) => res.data);
    }
}
