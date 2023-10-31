import {EMethod} from "../enums/httpMethod";

export interface IExternalApiCallParams {
    url: any;
    method?: EMethod;
    body?: any;
}