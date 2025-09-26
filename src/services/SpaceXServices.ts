import { LAUNCHES } from "./ApiEndPoints";
import { axiosGet } from "./AxiosRequest";
import { AxiosResponse } from 'axios';
import { Launch } from '../types/spacex';

export default class SpaceXServices {

    async fetchAllLaunches(): Promise<AxiosResponse<Launch[]>> {
        return axiosGet(LAUNCHES);
    }

    async fetchLaunchById(id: string): Promise<AxiosResponse<Launch>> {
        return axiosGet(`${LAUNCHES}/${id}`);
    }

}