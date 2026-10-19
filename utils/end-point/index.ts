import { config } from "@/config";
import axios, { Method } from "axios";
import axiosRetry from "axios-retry";

export interface ClientApiMethods {
  [key: string]: {
    endpoint: string;
    method: string;
  };
}

type PathWithTrailingSlash<T extends string> = `/${T}`;
import type { UrlObject } from "url";
export type Url = string | UrlObject;
type EndpointParamValues = string | number | boolean;
type EndpointParams = Record<string, EndpointParamValues>;
type EndpointQueryValue = string | number | boolean | null | undefined;
type EndpointQuery = Record<string, EndpointQueryValue>;

export type IntegrationApiCall = {
  body?: unknown;
  method: Method;
  urlParams?: EndpointParams;
  queryParams?: EndpointQuery;
  endpoint: PathWithTrailingSlash<string>;
};

export const URLEndpoint = ({
  query,
  params,
  baseUrl,
  endpoint,
}: {
  query?: EndpointQuery;
  baseUrl: Url;
  params?: EndpointParams;
  endpoint: PathWithTrailingSlash<string>;
}) => {
  //replace params in url
  let url = baseUrl + endpoint;

  if (params) {
    Object.keys(params).forEach((key: string) => {
      url = url.replace(`:${key}`, String(params[key]));
    });
  }

  //add query params
  if (query) {
    url += "?";
    Object.keys(query).forEach((key: string) => {
      if (query[key]) {
        url += `${key}=${query[key]}&`;
      }
    });
    url = url.slice(0, -1);
  }

  return url;
};

export const makeAxios = async ({
  body,
  method,
  endpoint,
  urlParams = {},
  queryParams = {},
}: IntegrationApiCall) => {
  const url = URLEndpoint({
    params: urlParams,
    query: queryParams,
    endpoint: endpoint,
    baseUrl: config.url.api,
  });

  axiosRetry(axios, {
    retries: 3,
    retryCondition: (error) => error.response?.status === 500,
  });
  const response = await axios.request({
    method,
    url: url,
    data: body,
    withCredentials: true,
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });

  return response;
};
