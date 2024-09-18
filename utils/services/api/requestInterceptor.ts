import type {
  FetchRequest,
  FetchResponse,
  FetchError,
  FetchOptions,
} from "ofetch";

// import { LOGGER } from "@/utils/helper/functions";

interface ApiRequestParams {
  request: FetchRequest;
  options: FetchOptions;
  error: FetchError;
  response: FetchResponse<Record<string, any>>;
}

const RequestInterceptorConfig = {
  // ON REQUEST INTERCEPTOR
  async onRequest({ options }: Pick<ApiRequestParams, "options">) {
    // Api Request interception code goes here
    const config = useRuntimeConfig();

    options.baseURL = config.public.BASE_URL;

    let accessToken = "";

    // if (process.client) {
    //   const { getUser, logout } = useAuthService()

    //   await getUser()
    //     .then(async (user) => {
    //       accessToken = user?.access_token as string

    //       if (user?.expired) {
    //         await logout()

    //         throw new Error('Auth expired')
    //       }
    //     })
    //     .catch((error) => LOGGER('USER ACCESS ERROR', error.response))
    // }

    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accessToken}`,
    };
  },

  // ON REQUEST ERROR INTERCEPTOR
  onRequestError({ error }: Pick<ApiRequestParams, "error">) {
    LOGGER("Request Error: ", error);
    // Api Request error interception code goes here
    if (error && error.data) {
      // notification.error({
      //   message: 'ERROR',
      //   description: error.data.error,
      // })
      console.log(error);
    }
  },

  // ON RESPONSE INTERCEPTOR
  // onResponse({ response }: Pick<ApiRequestParams, 'response'>) {
  //   // Api Response interception code goes here
  //   // LOGGER('interceptor on submit', response)
  // },

  // ON RESPONSE ERROR INTERCEPTOR
  // async onResponseError({
  //   response,
  //   options,
  // }: Pick<ApiRequestParams, 'response' | 'options'>) {
  //   // Api Response interception code goes here
  //   LOGGER('Response Error', response)

  //   const { logout } = useAuthService()

  //   if (
  //     response &&
  //     (response._data?.error ||
  //       response._data?.Error ||
  //       response._data?.Message)
  //   ) {
  //     notification.error({
  //       message: 'ERROR',
  //       description:
  //         response._data?.error ||
  //         response._data?.Error ||
  //         response._data?.Message,
  //       duration: 10,
  //     })
  //   } else if (response.status === 401) {
  //     // notification.error({
  //     //   message: 'Authorization Error',
  //     //   description: 'Please re-login or contact the appopriate authority',
  //     //   duration: 9,
  //     // })
  //     await logout()
  //   }
  //   LOGGER('Error from response', options)
  // },
};

export default RequestInterceptorConfig;
