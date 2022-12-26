#! /usr/bin/env node
import inquirer from "inquirer";
// These rates are with respect to doller
const CURRENCIES = [
    { name: "United States Doller (USD)", rate: 1 },
    { name: "Pakistani Rupee (PKR)", rate: 226.33 },
    { name: "Indian Rupee (INR)", rate: 82.83 },
    { name: "Great British Pound (GBP)", rate: 0.83 },
    { name: "Japanese Yen (JPY)", rate: 132.66 },
    { name: "Chinese Yen (CNY)", rate: 6.99 },
    { name: "Euro (EUR)", rate: 0.942 },
    { name: "United Arab Emirates Dirham (AED)", rate: 3.67 },
];
//https://api.exchangerate-api.com/v4/latest/USD
async function main() {
    const { fromCurrency, amount, toCurrency } = await inquirer.prompt([
        {
            message: "Select the currency",
            name: "fromCurrency",
            choices: CURRENCIES,
            type: "list",
        },
        {
            message: "Enter the amount",
            name: "amount",
            type: "input",
            validate: (value) => {
                if (isNaN(value) || "") {
                    return "Please enter a number";
                }
                return true;
            },
        },
        {
            message: "Select the currency you want to convert",
            name: "toCurrency",
            choices: CURRENCIES,
            type: "list",
        },
    ]);
    convertCurrency(fromCurrency, amount, toCurrency);
}
function convertCurrency(fromCurrency, amount, toCurrency) {
    let fromCurrencyRate = 0;
    let toCurrencyRate = 0;
    for (let i = 0; i < CURRENCIES.length; i++) {
        if (CURRENCIES[i].name === fromCurrency) {
            fromCurrencyRate = CURRENCIES[i].rate;
        }
        if (CURRENCIES[i].name === toCurrency) {
            toCurrencyRate = CURRENCIES[i].rate;
        }
    }
    const convertedAmount = amount * fromCurrencyRate;
    console.log(convertedAmount);
}
main();
