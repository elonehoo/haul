import type { HaulError, HaulInstance, Options, OptionsRaw } from './type'
import { joinURL, removeNullishValues, stringifyQuery } from './utils'
/**
 * Global default options as {@link Options} that are applied to **all** haul
 * instances. Always contain an initialized `headers` property with the default
 * headers:
 * - Accept: 'application/json'
 * - 'Content-Type': 'application/json'
 */
export const defaults: Options &
Pick<Required<Options>, 'headers' | 'responseAs'> = {
  responseAs: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}

/**
 * Create a haul instance
 * @param baseUrl - absolute url
 * @param passedInstanceOptions - optional options that will be applied to every
 * other request for this instance
 */
export function haul(baseURL: string, passedInstanceOptions: OptionsRaw = {}, fetchPolyfill?: Window['fetch']): HaulInstance {
  const instanceOptions: HaulInstance['options'] = {
    query: {},
    headers: {},
    ...passedInstanceOptions,
  }

  function _fetch(
    method: string,
    urlOrDataOrOptions?: string | number | Options | any,
    dataOrOptions?: Options | any,
    localOptions: Options = {},
  ) {
    let url: string | number

    let data: any

    if (typeof urlOrDataOrOptions === 'object') {
      url = ''
      localOptions = dataOrOptions || urlOrDataOrOptions || {}
      data = urlOrDataOrOptions
    }
    else {
      url = urlOrDataOrOptions
      data = dataOrOptions
    }
    const mergedOptions: Options = {
      ...defaults,
      ...instanceOptions,
      method,
      ...localOptions,
      headers: removeNullishValues({
        ...defaults.headers,
        ...instanceOptions.headers,
        ...localOptions.headers,
      }),
    }

    const query = {
      ...defaults.query,
      ...instanceOptions.query,
      ...localOptions.query,
    }

    const { responseAs } = mergedOptions as Required<Options>

    url = joinURL(baseURL, typeof url === 'number' ? `${url}` : url || '')

    // TODO: warn about multiple queries provided not supported
    // if (__DEV__ && query && urlInstance.search)

    url += stringifyQuery(query)

    if (method[0] === 'P' && data)
      mergedOptions.body = JSON.stringify(data)

    const localFetch = typeof fetch != 'undefined' ? fetch : fetchPolyfill!

    if (!localFetch) {
      throw new Error(
        'No fetch function exists. Make sure to include a polyfill on Node.js.',
      )
    }

    return localFetch(url, mergedOptions)
      .then(response =>
        // This is to get the response directly in the next then
        Promise.all([
          response,
          responseAs === 'response'
            ? response
            : response[responseAs]().catch(() => null),
        ]),
      )
      .then(([response, dataOrError]) => {
        if (response.status >= 200 && response.status < 300) {
          return responseAs !== 'response' && response.status === 204
            ? null
            : dataOrError
        }
        const err = new Error(response.statusText) as HaulError
        err.response = response
        err.body = dataOrError
        throw err
      })
  }

  return {
    options: instanceOptions,
    post: _fetch.bind(null, 'POST'),
    put: _fetch.bind(null, 'PUT'),
    patch: _fetch.bind(null, 'PATCH'),

    // these two have no body
    get: (url?: string | number | Options, options?: Options) =>
      _fetch('GET', url, null, options),
    delete: (url?: string | number | Options, options?: Options) =>
      _fetch('DELETE', url, null, options),
  }
}

