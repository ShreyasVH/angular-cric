import { get } from '../utils/api';
import { environment } from '../../environments/environments';
const endpoint = environment.apiUrl;

export const getTeams = async (page: number, pageSize: number): Promise<any> => {
    const url = endpoint + '/cric/v1/teams?page=' + page + '&limit=' + pageSize;
    return get(url);
};

export const getAllTeams = async () => {
    let teams: any[] = [];
    const pageSize = 20;
    let page = 1;

    let totalCount = 0;

    do
    {
        const apiResponse = await getTeams(page, pageSize);
        const response = apiResponse.data;
        const data = response.data;
        if (page === 1) {
            totalCount = data.totalCount;
        }
        const batchTeams = data.items;
        teams = teams.concat(batchTeams);
        page += 1;
    }
    while (teams.length < totalCount);
    return teams;
};