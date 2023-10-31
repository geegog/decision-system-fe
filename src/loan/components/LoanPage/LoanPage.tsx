import React from 'react';
import {Flex, Form, Input, InputNumber} from "antd";
import {ILoadFormField} from "../../interfaces/loadFormField";
import useLoanPage from "../../hooks/useLoanPage";
import {limits} from "../../constants/limiits";


const LoanPage = () => {

    const {
        form,
        formLayout,
        validateMessages,
        codeRegex,
        onPersonalCodeChanged,
        onLoanAmountChanged,
        onLoanPeriodChanged,
        loadDecisionResponse,
        moneyFormatter,
    } = useLoanPage();

    return <Flex vertical={true} justify={"center"} align={"center"}>
        <div style={{marginTop: 300}}>
            <Form
                name="loan-decision-form"
                form={form}
                validateMessages={validateMessages} {...formLayout}
                style={{width: 500}}
                autoComplete="off"
            >
                <Form.Item<ILoadFormField>
                    label="Personal Code"
                    name="personalCode"
                    rules={[{
                        required: false,
                        message: 'Please enter a valid personal code',
                        pattern: codeRegex
                    }]}
                >
                    <Input onChange={onPersonalCodeChanged} placeholder={'Personal code'}/>
                </Form.Item>
                <Form.Item<ILoadFormField>
                    label="Loan Amount"
                    name="loanAmount"
                    rules={[{
                        type: 'number',
                        required: false,
                        min: limits.MIN_LOAN_AMOUNT,
                        max: limits.MAX_LOAN_AMOUNT
                    }]}
                >
                    <InputNumber prefix="€" onChange={onLoanAmountChanged} placeholder={'Loan amount'} step={100}
                                 defaultValue={limits.MIN_LOAN_AMOUNT} style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item<ILoadFormField>
                    label="Loan Period"
                    name="loanPeriodInMonths"
                    rules={[{
                        type: 'number',
                        required: false,
                        min: limits.MIN_LOAN_PERIOD,
                        max: limits.MAX_LOAN_PERIOD
                    }]}
                >
                    <InputNumber onChange={onLoanPeriodChanged} placeholder={'Loan period'}
                                 defaultValue={limits.MIN_LOAN_PERIOD}
                                 style={{width: '100%'}}/>
                </Form.Item>
            </Form>

        </div>

        <div style={{marginTop: 10, width: 500, fontSize: 20}}>
            {loadDecisionResponse && loadDecisionResponse.canApproved ?
                `Loan CAN be approved. ${loadDecisionResponse.loanDecisionRequest.loanAmount < loadDecisionResponse.approvableLoan.maxPossibleLoanAmount ? `Please note that you can take a bigger loan of ${moneyFormatter.format(loadDecisionResponse.approvableLoan.maxPossibleLoanAmount)} for a period of ${loadDecisionResponse.approvableLoan.maxSuitablePeriod} months.` : ''}` : ''}
            {loadDecisionResponse && !loadDecisionResponse.canApproved && !loadDecisionResponse.hasDebt ? `Loan CANNOT be approved. Please, consider taking a loan of ${moneyFormatter.format(loadDecisionResponse?.approvableLoan.maxPossibleLoanAmount)} for a period of ${loadDecisionResponse?.approvableLoan.maxSuitablePeriod} months.` : ''}
            {loadDecisionResponse && loadDecisionResponse.hasDebt ? `Loan CANNOT be approved.` : ''}
        </div>
    </Flex>
}

export default LoanPage;
