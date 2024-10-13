// composables/usePaystack.js
import { ref } from 'vue';

export function usePaystack() {
  const isScriptLoaded = ref(false);

  const loadPaystackScript = () => {
    return new Promise((resolve, reject) => {
      if (isScriptLoaded.value) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        isScriptLoaded.value = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.body.appendChild(script);
    });
  };

  const initializePayment = async (options) => {
    await loadPaystackScript();
    
    const config = useRuntimeConfig();
    console.log('Runtime Config:', config);
    console.log('Paystack Public Key:', config.public.paystackPublicKey);

    if (!config.public.paystackPublicKey) {
      throw new Error('Paystack public key is not defined');
    }

    return new Promise((resolve) => {
      const handler = PaystackPop.setup({
        ...options,
        key: config.public.paystackPublicKey,
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