import { get } from '../utils/api';
import { environment } from '../../environments/environments';
const endpoint = environment.apiUrl;

export const getStadiums = async (page: number, pageSize: number) => {
    const url = endpoint + '/cric/v1/stadiums?page=' + page + '&limit=' + pageSize;
    return get(url);
};

export const getAllStadiums = async () => {
    let stadiums: any[] = [];
    const pageSize = 20;
    let page = 1;

    let totalCount = 0;

    do
    {
        const apiResponse = await getStadiums(page, pageSize);
        const response = apiResponse.data;
        const data = response.data;
        if (page === 1) {
            totalCount = data.totalCount;
        }
        const batchStadiums = data.items;
        stadiums = stadiums.concat(batchStadiums);
        page += 1;
    }
    while (stadiums.length < totalCount);
    return stadiums;
};