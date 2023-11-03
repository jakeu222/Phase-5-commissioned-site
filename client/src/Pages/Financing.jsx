import React, { useState } from 'react';

function Financing() {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const calculateMonthlyPayment = () => {
        // Calculate the monthly mortgage payment here using the input values.
        // You can use the formula for calculating monthly payments.

        // For example:
        const monthlyInterestRate = interestRate / 1200; // Monthly interest rate
        const numberOfPayments = loanTerm * 12; // Total number of payments
        const mortgagePayment =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        setMonthlyPayment(mortgagePayment.toFixed(2));
    };

    return (
        <div>
            <h2>Mortgage Calculator</h2>
            <div>
                <label>
                    Loan Amount:
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Interest Rate (%):
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Loan Term (years):
                    <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <button onClick={calculateMonthlyPayment}>Calculate</button>
            <div>
                <strong>Monthly Payment:</strong> ${monthlyPayment}
            </div>
        </div>
    );
}

export default Financing;
