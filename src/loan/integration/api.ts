import {EMethod} from "../enums/httpMethod";
import {IExternalApiCallParams} from "../interfaces/externalApiCallParams";
import {IResponse} from "../interfaces/customResponse";

export const externalApiCall = async ({
                                          url,
                                          method = EMethod.GET,
                                          body,
                                      }: IExternalApiCallParams) => {
    const options = build(method, body);
    const response = await fetch(url, options);
    return await responseData(response);
};

const build = (method: EMethod, body?: any) => {

    let options: any = {
        method: method,
        headers: {
            'content-type': 'application/json',
        },
    };

    if (method !== EMethod.GET) {
        options.body = JSON.stringify(body);
    }

    return options;
};

const httpResponse = (body: any, statusCode: number): IResponse => {
    return {
        bodyResponse: body,
        statusCode: statusCode,
    };
};

const responseData = async (response: Response) => {
    try {
        const body = await response.json();
        return httpResponse(body, response.status);
    } catch (err) {
        return httpResponse({}, response.status);
    }
}