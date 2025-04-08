import { 
    useQuery, 
    UseQueryResult, 
    UseQueryOptions, 
    QueryKey, 
    useMutation, 
    UseMutationOptions, 
    UseMutationResult, 
    useQueryClient 
  } from '@tanstack/react-query';
  import { callApi, HttpMethod } from './callApi';
  
  /**
   * Hook for performing GET (or non-mutative) API calls.
   *
   * @param queryKey - Unique key used for caching and refetching.
   * @param endpoint - API endpoint to be called.
   * @param method - HTTP method (defaults to 'GET').
   * @param payload - Optional payload for non-GET requests.
   * @param options - Additional react-query options (except queryKey and queryFn).
   *
   * @returns A react-query result object with data, error, and status flags.
   */
  export function useApiQuery<T>(
    queryKey: QueryKey,
    endpoint: string,
    method: HttpMethod = 'GET',
    payload?: any,
    options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
  ): UseQueryResult<T, Error> {
    return useQuery<T, Error>({
      queryKey,
      queryFn: () => callApi<T>(endpoint, method, payload),
      ...options,
    });
  }
  
  /**
   * Hook for performing mutations (POST, PUT, DELETE).
   *
   * @param endpoint - API endpoint to be called.
   * @param method - HTTP method (must not be 'GET').
   * @param options - react-query mutation options.
   *
   * @returns A mutation result object with mutate and status flags.
   */
  export function useApiMutation<T, U>(
    endpoint: string,
    method: Exclude<HttpMethod, 'GET'>,
    options?: UseMutationOptions<T, Error, U, unknown>
  ): UseMutationResult<T, Error, U, unknown> {
    const queryClient = useQueryClient();
  
    return useMutation<T, Error, U, unknown>({
      mutationFn: (data: U) => callApi<T>(endpoint, method, data),
      // Combine our onSuccess with any provided in options:
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(); // Invalidate all queries or target a specific key as needed.
        if (options && options.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    });
  }