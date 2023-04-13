export type ResponseAsTypes = 'json' | 'text' | 'response'

export type InferArgs<F> = F extends (api: HaulInstance, ...args: infer A) => any ? A : never
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
   * AbortSignal can only be passed to requests, not to a haul instance
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

export type HaulResponse<
  T = unknown,
  ResponseType extends ResponseAsTypes = 'json',
> = Promise<
  ResponseType extends 'response'
    ? Response
    : ResponseType extends 'text'
      ? string
      : T
>

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
  get<T = unknown, R extends ResponseAsTypes = 'json'>(
    options?: Options<R>
  ): HaulResponse<T, R>
  get<T = unknown, R extends ResponseAsTypes = 'json'>(
    url: string | number,
    options?: Options<R>
  ): HaulResponse<T, R>

  /**
   * Sends a POST request to the given url.
   * @param url - relative url to send the request to
   * @param data - optional body of the request
   * @param options - optional {@link Options}
   */
  post<T = unknown, R extends ResponseAsTypes = 'json'>(
    data?: any,
    options?: Options<R>
  ): HaulResponse<T, R>
  post<T = unknown, R extends ResponseAsTypes = 'json'>(
    url: string | number,
    data?: any,
    options?: Options<R>
  ): HaulResponse<T, R>

  /**
   * Sends a PUT request to the given url.
   * @param url - relative url to send the request to
   * @param data - optional body of the request
   * @param options - optional {@link Options}
   */
  put<T = unknown, R extends ResponseAsTypes = 'json'>(
    data?: any,
    options?: Options<R>
  ): HaulResponse<T, R>
  put<T = unknown, R extends ResponseAsTypes = 'json'>(
    url: string | number,
    data?: any,
    options?: Options<R>
  ): HaulResponse<T, R>

  /**
   * Sends a PATCH request to the given url.
   * @param url - relative url to send the request to
   * @param data - optional body of the request
   * @param options - optional {@link Options}
   */
  patch<T = unknown, R extends ResponseAsTypes = 'json'>(
    data?: any,
    options?: Options<R>
  ): HaulResponse<T, R>
  patch<T = unknown, R extends ResponseAsTypes = 'json'>(
    url: string | number,
    data?: any,
    options?: Options<R>
  ): HaulResponse<T, R>

  /**
   * Sends a DELETE request to the given url.
   * @param url - relative url to send the request to
   * @param options - optional {@link Options}
   */
  delete<T = unknown, R extends ResponseAsTypes = 'json'>(
    options?: Options<R>
  ): HaulResponse<T, R>
  delete<T = unknown, R extends ResponseAsTypes = 'json'>(
    url: string | number,
    options?: Options<R>
  ): HaulResponse<T, R>
}
