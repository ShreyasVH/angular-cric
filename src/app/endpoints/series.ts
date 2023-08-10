import { get } from '../utils/api';
import { environment } from '../../environments/environments'
const endpoint = 'https://cric.dotnet.com';
console.log(environment)

export const getById = async (id: number): Promise<any> => {
    const url = endpoint + '/cric/v1/series/' + id;
    return get(url);
}