import axios from 'axios';

export const get = async (url: string, additionalHeaders: any = {}): Promise<any> => {
    let defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest'
    };
    let headers = Object.assign({}, defaultHeaders, additionalHeaders);

    return execute({
        method: 'get',
        url,
        headers
    });
};

export const post = (url: string, payload: any, additionalHeaders:any = {}): Promise<any> => {
    let defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    };
    let headers = Object.assign({}, defaultHeaders, additionalHeaders);

    let data = (('application/json' === headers["Content-Type"]) ? JSON.stringify(payload) : payload);

    return execute({
        method: 'post',
        data,
        url,
        headers
    });
};

export const put = (url: string, payload: any, additionalHeaders = {}): any => {
    let defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    };
    let headers = Object.assign({}, defaultHeaders, additionalHeaders);

    let data = (('application/json' === headers["Content-Type"]) ? JSON.stringify(payload) : payload);

    return execute({
        method: 'put',
        data,
        url,
        headers
    });
};

export const del = (url:string, additionalHeaders: any = {}): any => {
    let defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest'
    };
    let headers = Object.assign({}, defaultHeaders, additionalHeaders);

    return execute({
        method: 'delete',
        url,
        headers
    });
};

export const execute = (options: any): any => (axios(options));