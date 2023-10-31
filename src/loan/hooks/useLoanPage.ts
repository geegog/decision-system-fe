import {useEffect, useState} from "react";
import {Form} from "antd";
import {limits} from "../constants/limiits";
import {callLoanDecisionService} from "../services/LoanService";
import {ILoanResponse} from "../interfaces/loanResponse";

export const useLoanPage = () => {

    const [form] = Form.useForm();

    const [personalCode, setPersonalCode] = useState<string | null>(null);

    const [loanAmount, setLoanAmount] = useState<number>(limits.MIN_LOAN_AMOUNT);

    const [periodInMonths, setLoanPeriodInMonths] = useState<number>(limits.MIN_LOAN_PERIOD);

    const [loadDecisionResponse, setLoadDecisionResponse] = useState<ILoanResponse | null>(null);

    const [codeRegex] = useState<RegExp>(() => RegExp("^[0-9]{11}$"));

    const [validateMessages] = useState(() => {
        return {
            number: {
                range: "'${label}' must can from '${min}' to '${max}'",
            },
        }
    });

    const [formLayout] = useState(() => {
        return {
            labelCol: {span: 10},
            wrapperCol: {span: 16},
        };
    })

    const [moneyFormatter] = useState(() => {
        return new Intl.NumberFormat('et-EE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2, // Minimum number of decimal places
            maximumFractionDigits: 2, // Maximum number of decimal places
        });
    });

    useEffect(() => {

        // console.log({personalCode, loanAmount, periodInMonths});

        if (personalCode && loanAmount && periodInMonths) {
            callLoanDecisionService(personalCode, loanAmount, periodInMonths).then(result => {
              // console.log(result);
                setLoadDecisionResponse(result);
            })
        }


    }, [personalCode, loanAmount, periodInMonths]);

    const onPersonalCodeChanged = (event: any) => {
        const value = event.target.value;
        if (codeRegex.test(value)) {
            setPersonalCode(value);
        }
    }

    const onLoanAmountChanged = (value: any) => {
        if (value >= limits.MIN_LOAN_AMOUNT && value <= limits.MAX_LOAN_AMOUNT) {
            setLoanAmount(value);
        }
    }

    const onLoanPeriodChanged = (value: any) => {
        if (value >= limits.MIN_LOAN_PERIOD && value <= limits.MAX_LOAN_PERIOD) {
            setLoanPeriodInMonths(value);
        }
    }

    return {
        formLayout,
        validateMessages,
        form,
        codeRegex,
        onPersonalCodeChanged,
        onLoanAmountChanged,
        onLoanPeriodChanged,
        loadDecisionResponse,
        moneyFormatter,
    }

}

export default useLoanPage;