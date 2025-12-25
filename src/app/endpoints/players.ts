import { post } from '../utils/api';
import { environment } from '../../environments/environments'
const endpoint = environment.apiUrl;

export const getStats = async (payload: any): Promise<any> => {
    const url = endpoint + '/cric/v1/stats';
    return post(url, payload);
};