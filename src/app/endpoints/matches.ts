import { get, del } from '../utils/api';
import { environment } from '../../environments/environments'
const endpoint = environment.apiUrl;

export const getMatch = async (id: number): Promise<any> => {
    const url = endpoint + '/cric/v1/matches/' + id;
    return get(url);
};

export const removeMatch = async (id: number): Promise<any> => {
    const url = endpoint + '/cric/v1/matches/' + id;
    return del(url);
};