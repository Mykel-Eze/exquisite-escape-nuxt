// composables/useOrder.js
import { useApi } from '~/utils/api';
import { usePaystack } from '~/composables/usePaystack';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useAuthStore } from '~/store/auth';

export function useOrder() {
  const api = useApi();
  const { initializePayment } = usePaystack();
  const router = useRouter();
  const toast = useToast();
  const authStore = useAuthStore();

  const createOrder = async (formData, orderDetails) => {
    try {
      // Check if user is authenticated
      if (!authStore.isAuthenticated) {
        toast.error("Please login or register to continue");
        router.push('/signin');
        return false;
      }

      //   console.log('Order Details:', orderDetails);

      // Initialize Paystack payment first
      const paymentResponse = await initializePayment({
        email: formData.email,
        amount: Math.round(parseFloat(orderDetails.totalPrice) * 100), // Convert to kobo and ensure it's an integer
        currency: orderDetails.currency,
        currency: `NGN`,
        ref: `order_${Date.now()}`, // Generate a unique reference
      });

      console.log('Paystack payment response:', paymentResponse);

      if (paymentResponse.status === 'success') {
        // Payment successful, now create the order
        const travellersInfo = [{
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          passportAuthority: formData.passportAuthority,
          passportNumber: formData.passportNumber,
          passportExpiryDate: formData.passportExpiryDate,
          nationality: formData.nationality,
        }];

        const membershipDetails = [{
          promoCode: formData.promoCode,
          corporateCode: formData.corporateCode,
        }];

        const orderResponse = await api.post('/api/order/create-order', 
          {
            travellersInfo,
            membershipDetails,
            ...orderDetails,
            paymentReference: paymentResponse.reference,
          },
          {
            headers: {
              'Authorization': `${authStore.token}`,
            }
          }
        );

        console.log('Order Response:', orderResponse);

        if (orderResponse.success) {
          toast.success("Booking Successful... Check your emails for more details");
          router.push('/');
          return true;
        } else {
          throw new Error('Order creation failed');
        }
      } else {
        throw new Error('Payment failed or was cancelled');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error(error.message || 'An error occurred during checkout. Please try again.');
      return false;
    }
  };

  return {
    createOrder,
  };
}