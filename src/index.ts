#! /usr/bin/env node
import inquirer from 'inquirer';
import * as dotenv from 'dotenv';
dotenv.config();

interface ApiType {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
}

const CURRENCIES = [
  { name: 'United States Doller (USD)', code: 'USD' },
  { name: 'Pakistani Rupee (PKR)', code: 'PKR' },
  { name: 'Indian Rupee (INR)', code: 'INR' },
  { name: 'Great British Pound (GBP)', code: 'GBP' },
  { name: 'Japanese Yen (JPY)', code: 'JPY' },
  { name: 'Chinese Yen (CNY)', code: 'CNY' },
  { name: 'Euro (EUR)', code: 'EUR' },
  { name: 'United Arab Emirates Dirham (AED)', code: 'AED' },
];

async function main() {
  const { fromCurrency, amount, toCurrency } = await inquirer.prompt([
    {
      message: 'Select the currency',
      name: 'fromCurrency',
      choices: CURRENCIES,
      type: 'list',
    },
    {
      message: 'Enter the amount',
      name: 'amount',
      type: 'input',
      validate: (value) => {
        if (isNaN(value) || value.length === 0) {
          return 'Please enter a number';
        }
        return true;
      },
    },
    {
      message: 'Select the currency you want to convert',
      name: 'toCurrency',
      choices: CURRENCIES,
      type: 'list',
    },
  ]);

  convertCurrency(fromCurrency, amount, toCurrency);
}

async function convertCurrency(fromCurrency: string, amount: number, toCurrency: string) {
  let fromCurrencyCode = '';
  let toCurrencyCode = '';
  for (let i = 0; i < CURRENCIES.length; i++) {
    if (CURRENCIES[i].name === fromCurrency) fromCurrencyCode = CURRENCIES[i].code;

    if (CURRENCIES[i].name === toCurrency) toCurrencyCode = CURRENCIES[i].code;
  }

  try {
    const apiResponse = await fetch(`${process.env.API_KEY}/${fromCurrencyCode}/${toCurrencyCode}`);
    const data: ApiType = await apiResponse.json();

    const exChangeCurrency = (data.conversion_rate * amount).toFixed(2);

    console.log(`${amount} ${fromCurrencyCode} = ${exChangeCurrency} ${toCurrencyCode}`);
  } catch (error) {
    console.log(error);
  }
}

main();
