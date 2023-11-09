import React, { useState } from 'react';

function Financing() {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const calculateMonthlyPayment = (e) => {
        e.preventDefault();

        // Calculate the monthly mortgage payment here using the input values.
        const monthlyInterestRate = interestRate / 1200; // Monthly interest rate
        const numberOfPayments = loanTerm * 12; // Total number of payments
        const mortgagePayment =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        setMonthlyPayment(mortgagePayment.toFixed(2));

        fetch('/api/financing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mortgagePayment)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response error");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // nav("/financing");
            })
            .catch(error => {
                console.log("error", error.message);
            });
    };

    return (
        <div className="relative w-full min-h-screen">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        'url(https://www.tileclub.com/cdn/shop/files/roman-flower-blue-celeste-marble-mosaic-tile-kitchen-new-colorway.jpg?v=1684529970)',
                }}
            >
                <div className="max-w-md w-full p-4 space-y-4 bg-white rounded-lg shadow-md">
                    <form
                        className="bg-white p-6 rounded-lg shadow-md w-96"
                        onSubmit={calculateMonthlyPayment}
                    >
                        <h2 className="text-3xl text-center font-bold mb-4 text-gray-600">Mortgage Calculator</h2>
                        <div className="mb-4">
                            <label className="block text-gray-600">Loan Amount:</label>
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Interest Rate (%):</label>
                            <input
                                type="number"
                                value={interestRate}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Loan Term (years):</label>
                            <input
                                type="number"
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md"
                        >
                            Calculate
                        </button>
                        <div className="mt-4 text-3xl text-center font-bold mb-4 text-gray-600">
                            <strong className="text-lg text-gray-800">Monthly Payment:</strong> ${monthlyPayment}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Financing;
