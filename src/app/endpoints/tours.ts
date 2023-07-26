import { get } from '../utils/api';
const endpoint = 'https://cric.dotnet.com';


export const getToursForYear = async (year: number, page: number, pageSize: number): Promise<any> => {
    const url = endpoint + '/cric/v1/tours/year/' + year + '?page=' + page + '&limit=' + pageSize;
    return get(url);
}

export const getAllYears = async (): Promise<any> => {
    const url = endpoint + '/cric/v1/tours/years';
    return get(url);
}

export const getById = async (id: number): Promise<any> => {
    const url = endpoint + '/cric/v1/tours/' + id;
    return get(url);
}