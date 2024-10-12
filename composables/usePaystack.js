// composables/usePaystack.js
import { loadScript } from '@/utils/scriptLoader';

export function usePaystack() {
  const initializePayment = async (options) => {
    await loadScript('https://js.paystack.co/v1/inline.js');
    
    return new Promise((resolve) => {
      const handler = PaystackPop.setup({
        ...options,
        onClose: () => resolve({ status: 'closed' }),
        callback: (response) => resolve({ status: 'success', reference: response.reference }),
      });
      handler.openIframe();
    });
  };

  return {
    initializePayment,
  };
}