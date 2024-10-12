// server/api/verify-transaction.js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { reference } = await readBody(event);

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${config.paystackSecretKey}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw createError({
      statusCode: 500,
      statusMessage: data.message || 'Failed to verify transaction',
    });
  }

  return data;
});