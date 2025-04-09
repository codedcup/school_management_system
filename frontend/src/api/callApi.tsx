import apiClient from './apiClient';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Makes an API request using the specified parameters.
 *
 * @param endpoint - The API endpoint to call (not including the base URL).
 * @param method - The HTTP method to use for the request ('GET', 'POST', 'PUT', or 'DELETE').
 * @param payload - An object containing the data to be sent with the request (if applicable).
 *
 * @returns A promise that resolves with the response from the server.
 */
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