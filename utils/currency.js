// utils/currency.js

export const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    'USD': '$',   // US Dollar
    'EUR': '€',   // Euro
    'GBP': '£',   // British Pound Sterling
    'JPY': '¥',   // Japanese Yen
    'NGN': '₦',   // Nigerian Naira
    'CAD': 'C$',  // Canadian Dollar
    'AUD': 'A$',  // Australian Dollar
    'CHF': 'CHF', // Swiss Franc
    'CNY': '¥',   // Chinese Yuan Renminbi
    'INR': '₹',   // Indian Rupee
    'ZAR': 'R',   // South African Rand
    'BRL': 'R$',  // Brazilian Real
    'MXN': 'Mex$',// Mexican Peso
    'RUB': '₽',   // Russian Ruble
    'SEK': 'kr',  // Swedish Krona
    'NOK': 'kr',  // Norwegian Krone
    'DKK': 'kr',  // Danish Krone
    'SGD': 'S$',  // Singapore Dollar
    'HKD': 'HK$', // Hong Kong Dollar
    'KRW': '₩',   // South Korean Won
    'GHS': '₵',   // Ghanian Cedis
    // Add more currency symbols as needed
  };
  return symbols[currencyCode] || currencyCode;
};

export const formatCurrency = (amount, currencyCode) => {
  // Handle Infinity
  if (amount === Infinity) {
    return '-';
  }

  // Handle undefined or null currency
  if (!currencyCode) {
    return 'N/A';
  }

  const symbol = getCurrencySymbol(currencyCode);

  try {
    // Format the number part
    const formattedNumber = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);

    // Combine the symbol and the formatted number
    return `${symbol}${formattedNumber}`;
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback format
    return `${symbol}${amount}`;
  }
};