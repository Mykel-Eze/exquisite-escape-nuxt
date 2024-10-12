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
      // Create travellersInfo array with formData
      const travellersInfo = [
        {
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
        }
      ];
      const membershipDetails = [
        {
            promoCode: formData.promoCode,
            corporateCode: formData.corporateCode,
        }
      ]

      // Check if user is authenticated
      if (!authStore.isAuthenticated) {
        toast.error("Please login or register to continue");
        router.push('/signin');  // Redirect to signin page
        return false;
      }

      // Create order
      const orderResponse = await api.post('/api/order/create-order', {
        travellersInfo,
        membershipDetails,
        ...orderDetails,
      });

      if (orderResponse.success) {
        // Initialize Paystack payment
        const paymentResponse = await initializePayment({
          email: formData.email,
          amount: parseFloat(orderDetails.totalPrice) * 100, // Convert to kobo
          currency: orderDetails.currency,
          ref: orderResponse.data.orderReference,
        });

        if (paymentResponse.status === 'success') {
          // Payment successful
          toast.success("Booking Successful... Check your emails for more details");
          router.push('/');
          return true;
        } else {
          throw new Error('Payment failed');
        }
      } else {
        throw new Error('Order creation failed');
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