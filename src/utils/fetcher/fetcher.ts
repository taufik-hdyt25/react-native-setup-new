import { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { axiosInstance } from './axios';

interface CallAPIProps<TBody = unknown, TQuery = unknown> {
  method: Method;
  path: string;
  query?: TQuery;
  body?: TBody;
  headers?: Record<string, string>;
  baseURL?: string;
}

const callAPI = async <TResponse = unknown, TBody = unknown, TQuery = unknown>({
  method,
  path,
  query,
  body,
  headers,
  baseURL,
}: CallAPIProps<TBody, TQuery>): Promise<TResponse> => {
  try {
    const config: AxiosRequestConfig = {
      baseURL,
      url: path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params: query,
      data: body,
    };

    const { data } = await axiosInstance.request<TResponse>(config);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data ?? error;
  }
};

export default callAPI;
