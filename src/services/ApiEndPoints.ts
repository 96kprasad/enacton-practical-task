import { IsProdMode } from "../../utils/AppSetting";

export const APIURL = (IsProdMode) ?
    process.env.NEXT_PUBLIC_PROD_API_URL
    :
    process.env.NEXT_PUBLIC_LOCAL_API_URL;

// All API End Points
export const LAUNCHES = '/launches';
export const ROCKETS = '/rockets';
export const LAUNCHPADS = '/launchpads';
