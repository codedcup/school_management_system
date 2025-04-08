import apiClient from './apiClient';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function callApi<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  payload?: any
): Promise<T> {
  const response = await apiClient.request<T>({
    url: endpoint,
    method,
    data: payload,
  });
  return response.data;
}