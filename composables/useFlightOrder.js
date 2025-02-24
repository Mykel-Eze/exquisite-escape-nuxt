// composables/useOrder.js
import { useApi } from '~/utils/api';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useAuthStore } from '~/store/auth';

export function useFlightOrder() {
  const api = useApi();
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

      const orderPayload = {
        settlementPeriod: "during", // Assuming this is a fixed value
        name: "Exquisite", // Assuming this is a fixed value
        amount: orderDetails.totalPrice, // Assuming this is the total price
        details: "Thanks", // Assuming this is a fixed value
        userInfo: travellersInfo[0], // Assuming only one traveler for simplicity
        paymentData: {}, // Empty as per the new API structure
        paymentReference: `order_${Date.now()}`, // Generate a unique reference
        items: [
          {
            category: "flight",
            cabin: orderDetails.cabin, // Assuming cabin type is part of orderDetails
            provider: "Amadeus", // Assuming this is a fixed value
            body: {
              flightOffers: orderDetails.flightOffers, // Assuming flightOffers is part of orderDetails
              travelers: travellersInfo.map(traveller => ({
                id: traveller.passportNumber, // Assuming passportNumber as ID
                dateOfBirth: traveller.dateOfBirth,
                name: {
                  firstName: traveller.firstName,
                  lastName: traveller.lastName,
                },
                gender: traveller.gender.toUpperCase(),
                contact: {
                  emailAddress: traveller.email,
                  phones: [
                    {
                      deviceType: "MOBILE",
                      countryCallingCode: "234", // Assuming Nigeria as default
                      number: traveller.phoneNumber,
                    },
                  ],
                },
                documents: [
                  {
                    documentType: "PASSPORT",
                    issuanceLocation: traveller.passportAuthority,
                    number: traveller.passportNumber,
                    expiryDate: traveller.passportExpiryDate,
                    issuanceCountry: traveller.nationality,
                    validityCountry: traveller.nationality,
                    nationality: traveller.nationality,
                    holder: true,
                  },
                ],
              })),
              remarks: {
                general: [
                  {
                    subType: "GENERAL_MISCELLANEOUS",
                    text: "ONLINE BOOKING FROM EXQUISITE ESCAPE",
                  },
                ],
              },
              ticketingAgreement: {
                option: "DELAY_TO_CANCEL",
                delay: "6D",
              },
              contacts: [
                {
                  addresseeName: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                  },
                  companyName: "Exquisite Escape",
                  purpose: "STANDARD",
                  phones: [
                    {
                      deviceType: "MOBILE",
                      countryCallingCode: "234",
                      number: formData.phoneNumber,
                    },
                  ],
                  emailAddress: formData.email,
                  address: {
                    lines: ["Calle Prado, 16"], // Assuming a fixed address
                    postalCode: "28014", // Assuming a fixed postal code
                    cityName: "Madrid", // Assuming a fixed city
                    countryCode: "ES", // Assuming Spain as default
                  },
                },
              ],
            },
          },
        ],
      };

      const orderResponse = await api.post('/api/order/create-order', orderPayload, {
        headers: {
          'Authorization': `${authStore.token}`,
          'withCredentials': true,
        },
      });

      if (orderResponse.success) {
        toast.success("Booking Successful... Check your emails for more details");
        router.push('/');
        return true;
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