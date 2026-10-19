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

export type IntegrationApiCall = {
  body?: Object;
  method: Method;
  urlParams?: Object;
  queryParams?: Object;
  endpoint: PathWithTrailingSlash<string>;
};

export const URLEndpoint = ({
  query,
  params,
  baseUrl,
  endpoint,
}: {
  query?: Object;
  baseUrl: Url;
  params?: Object;
  endpoint: PathWithTrailingSlash<string>;
}) => {
  //replace params in url
  let url = baseUrl + endpoint;

  if (params) {
    Object.keys(params).forEach((key: string) => {
      url = url.replace(`:${key}`, params[key]);
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
