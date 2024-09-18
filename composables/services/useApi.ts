import type { FetchOptions } from "ofetch";

// import RequestInterceptorConfig from "@/utils/services/api/requestInterceptor";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export function useCommonAPI(
  url: string,
  method: RequestMethod,
  body?: Record<string, any>,
  options?: FetchOptions | Record<string, any>
) {
  return useFetch(url, {
    method,
    body,
    // ...RequestInterceptorConfig,
    retry: 1,
    ...options,
  });
}

export const useApiGet = (url: string, options?: { [key: string]: any }) => {
  return useCommonAPI(url, "GET", undefined, options);
};

export const useApiGetClient = (
  url: string,
  options?: { [key: string]: any }
) => {
  return useCommonAPI(url, "GET", undefined, { server: false, ...options });
};

export const useApiPost = (
  url: string,
  payload: Record<string, any>,
  options?: FetchOptions
) => {
  return useCommonAPI(url, "POST", payload, options);
};

export const useApiPut = (
  url: string,
  payload: Record<string, any>,
  options?: FetchOptions
) => {
  return useCommonAPI(url, "PUT", payload, options);
};

export const useApiDelete = (
  url: string,
  payload?: Record<string, any>,
  options?: FetchOptions
) => {
  return useCommonAPI(url, "DELETE", payload, options);
};

// A LIST RETURNED OPTIONS/VALUES FROM useFetch()

//   data: Ref<DataT | null>
//   pending: Ref<boolean>
//   refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
//   execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
//   error: Ref<ErrorT | null>
//   status: Ref<AsyncDataRequestStatus>
