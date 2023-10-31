import {ILoadFormField} from "./loadFormField";
import {IApprovableLoan} from "./approvalLoan";

export interface ILoanResponse {

    loanDecisionRequest: ILoadFormField;

    canApproved: boolean;

    hasDebt: boolean;

    approvableLoan: IApprovableLoan;
}