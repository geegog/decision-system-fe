import {externalApiCall} from "../integration/api";
import {EMethod} from "../enums/httpMethod";
import {ILoanResponse} from "../interfaces/loanResponse";

export const callLoanDecisionService = async (personalCode: string, loanAmount: number, periodInMonths: number) => {

    try {
        const response = await externalApiCall({
            url: 'http://localhost:8080/api/v1/loan/decision',
            method: EMethod.POST,
            body: {personalCode, loanAmount, periodInMonths}
        });

        const loanResponse: ILoanResponse = response.bodyResponse;

        return loanResponse;
    } catch (e) {
        // console.log(e);
        return null;
    }

}