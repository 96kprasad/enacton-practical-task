import { LAUNCHES } from "./ApiEndPoints";
import { axiosGet } from "./AxiosRequest";

export default class SpaceXServices {

    async fetchAllLaunches() {
        return axiosGet(LAUNCHES);
    }

    async fetchLaunchById(id) {
        return axiosGet(`${LAUNCHES}/${id}`);
    }

}