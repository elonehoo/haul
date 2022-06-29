export type ResponseAsTypes = 'json' | 'text' | 'response'
/**
 * Allowed options for a request. Extends native `RequestInit`.
 */
export interface Options<ResponseAs extends ResponseAsTypes = ResponseAsTypes> extends RequestInit {
  /**
   * Optional query object. Does not support arrays. Will get stringified
   */
  query?: any

  /**
   * What kind of response is expected. Defaults to `json`. `response` will
   * return the raw response from `fetch`.
   */
  responseAs?: ResponseAs

  /**
   * Headers sent alongside the request
   */
  headers?: Record<string, string>
}

export interface OptionsRaw<R extends ResponseAsTypes = ResponseAsTypes>
  extends Omit<Options<R>, 'headers' | 'signal'> {
  /**
   * Headers sent alongside the request. Set any header to null to remove it.
   */
  headers?: Record<string, string | null>

  /**
   * AbortSignal can only be passed to requests, not to a mande instance
   * because it can only be used once.
   */
  signal?: never
}

/**
 * Extended Error with the raw `Response` object.
 */
export interface HaulError<T = any> extends Error {
  body: T
  response: Response
}

/**
 * Object returned by {@link haul}
 */
 export interface HaulInstance {
  /**
   * Writable options.
   */
  options: Required<Pick<OptionsRaw, 'headers'>> &
    Pick<OptionsRaw, 'responseAs' | 'query'>

  /**
   * Sends a GET request to the given url.
   * @param url - relative url to send the request to
   * @param options - optional {@link Options}
   */
  get(url: string | number, options: Options<'response'>): Promise<Response>
  get(url: string | number, options: Options<'text'>): Promise<string>
  get<T = unknown>(url: string | number, options?: Options): Promise<T>

  /**
   * Sends a POST request to the given url.
   * @param url - relative url to send the request to
   * @param data - optional body of the request
   * @param options - optional {@link Options}
   */
  post(
    url: string | number,
    data: any,
    options: Options<'text'>
  ): Promise<string>
  post(data: any, options: Options<'text'>): Promise<string>
  post(
    url: string | number,
    data: any,
    options: Options<'response'>
  ): Promise<Response>
  post(data: any, options: Options<'response'>): Promise<Response>
  post<T = unknown>(data?: any, options?: Options): Promise<T>
  post<T = unknown>(
    url: string | number,
    data?: any,
    options?: Options
  ): Promise<T>

  /**
   * Sends a PUT request to the given url.
   * @param url - relative url to send the request to
   * @param data - optional body of the request
   * @param options - optional {@link Options}
   */
  put(
    url: string | number,
    data: any,
    options: Options<'text'>
  ): Promise<string>
  put(data: any, options: Options<'text'>): Promise<string>
  put(
    url: string | number,
    data: any,
    options: Options<'response'>
  ): Promise<Response>
  put(data: any, options: Options<'response'>): Promise<Response>
  put<T = unknown>(
    url: string | number,
    data?: any,
    options?: Options
  ): Promise<T>
  put<T = unknown>(data?: any, options?: Options): Promise<T>

  /**
   * Sends a PATCH request to the given url.
   * @param url - relative url to send the request to
   * @param data - optional body of the request
   * @param options - optional {@link Options}
   */
  patch(
    url: string | number,
    data: any,
    options: Options<'response'>
  ): Promise<Response>
  patch(data: any, options: Options<'response'>): Promise<Response>
  patch(
    url: string | number,
    data: any,
    options: Options<'text'>
  ): Promise<string>
  patch(data: any, options: Options<'text'>): Promise<string>
  patch<T = unknown>(
    url: string | number,
    data?: any,
    options?: Options
  ): Promise<T>
  patch<T = unknown>(data?: any, options?: Options): Promise<T>

  /**
   * Sends a DELETE request to the given url.
   * @param url - relative url to send the request to
   * @param options - optional {@link Options}
   */
  delete(url: string | number, options: Options<'response'>): Promise<Response>
  delete(url: string | number, options: Options<'text'>): Promise<string>
  delete<T = unknown>(url: string | number, options?: Options): Promise<T>
}
