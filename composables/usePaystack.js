export function usePaystack() {
  const initializePayment = (data) => {
    const handler = PaystackPop.setup(data)
    handler.openIframe()
  }

  return {
    initializePayment
  }
}