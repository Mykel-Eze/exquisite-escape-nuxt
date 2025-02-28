import { useApi } from '~/utils/api';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useAuthStore } from '~/store/auth';

export function useFlightOrder() {
  const api = useApi();
  const router = useRouter();
  const toast = useToast();
  const authStore = useAuthStore();

  const createFlightOrder = async (formData, orderDetails) => {
    try {
      if (!authStore.isAuthenticated) {
        toast.error("Please login or register to continue");
        router.push('/signin');
        return false;
      }

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

      const orderPayload = {
        settlementPeriod: "during",
        name: "Exquisite",
        amount: orderDetails.totalPrice,
        details: "Thanks",
        userInfo: travellersInfo[0],
        paymentData: {},
        paymentReference: `order_${Date.now()}`,
        items: [
          {
            category: "flight",
            cabin: orderDetails.flightDetails.travelerPricings[0].fareDetailsBySegment[0].cabin,
            provider: "Amadeus",
            body: {
              flightOffers: {
                ...orderDetails.flightDetails,
                travelerPricings: orderDetails.flightDetails.travelerPricings.map((pricing, index) => ({
                  ...pricing,
                  travelerId: travellersInfo[index].passportNumber // Use passport number as travelerId
                }))
              },
              travelers: travellersInfo.map((traveller, index) => ({
                id: traveller.passportNumber, // Use passport number as ID
                dateOfBirth: traveller.dateOfBirth,
                name: {
                  firstName: traveller.firstName,
                  lastName: traveller.lastName,
                },
                gender: traveller.gender.toUpperCase(),
                contact: {
                  emailAddress: traveller.email,
                  phones: [{
                    deviceType: "MOBILE",
                    countryCallingCode: "234",
                    number: traveller.phoneNumber.startsWith('+') ? traveller.phoneNumber.slice(4) : traveller.phoneNumber,
                  }],
                },
                documents: [{
                  documentType: "PASSPORT",
                  issuanceLocation: traveller.passportAuthority,
                  number: traveller.passportNumber,
                  expiryDate: traveller.passportExpiryDate,
                  issuanceCountry: traveller.nationality,
                  validityCountry: traveller.nationality,
                  nationality: traveller.nationality,
                  holder: true,
                }],
              })),
              remarks: {
                general: [{
                  subType: "GENERAL_MISCELLANEOUS",
                  text: "ONLINE BOOKING FROM EXQUISITE ESCAPE",
                }],
              },
              ticketingAgreement: {
                option: "DELAY_TO_CANCEL",
                delay: "6D",
              },
              contacts: [{
                addresseeName: {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                },
                companyName: "Exquisite Escape",
                purpose: "STANDARD",
                phones: [{
                  deviceType: "MOBILE",
                  countryCallingCode: "234",
                  number: formData.phoneNumber.startsWith('+') ? formData.phoneNumber.slice(4) : formData.phoneNumber,
                }],
                emailAddress: formData.email,
                address: {
                  lines: ["Calle Prado, 16"],
                  postalCode: "28014",
                  cityName: "Madrid",
                  countryCode: "ES",
                },
              }],
            },
          },
        ],
      };

    //   console.log('Sending Payload:', JSON.stringify(orderPayload, null, 2)); // Debug
      const orderResponse = await api.post('/api/order/create-order', orderPayload, {
        headers: {
          'Authorization': `${authStore.token}`,
          'Content-Type': 'application/json',
          'withCredentials': true,
        },
      });

    //   console.log('Order Response:', orderResponse);

      if (orderResponse.success && orderResponse.data.successfulOrders?.length > 0) {
        // Order creation succeeded
        const checkoutUrl = orderResponse.data.checkout?.authorization_url;
        if (checkoutUrl) {
          toast.info("Redirecting to payment page...");
          window.location.href = checkoutUrl; // Redirect to Paystack payment
          return true; // Indicate order creation success
        } else {
          throw new Error('No checkout URL provided in response');
        }
      } else if (orderResponse.data.failedOrders?.length > 0) {
        // Order creation failed
        const errorDetails = orderResponse.data.failedOrders[0]?.description[0].title || 'Unknown error';
        throw new Error(`Order creation failed: ${JSON.stringify(errorDetails)}`);
      } else {
        throw new Error('Order creation failed with no specific error details');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error(error.message || 'An error occurred during checkout. Please try again.');
      return false; // Indicate failure, stay on flight-checkout
    }
  };

  return { createFlightOrder };
}