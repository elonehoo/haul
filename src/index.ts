import {Options,OptionsRaw,HaulError,HaulInstance} from './type'
import {removeNullishValues,stringifyQuery,joinURL} from './utils'
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
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

/**
 * Create a haul instance
 * @param baseUrl - absolute url
 * @param instanceOptions - optional options that will be applied to every
 * other request for this instance
 */
export function haul(baseUrl:string,passedInstanceOptions:OptionsRaw = {},fetchPolyfill?:Window['fetch']): HaulInstance{
  function _fetch(method:string,urlOrData?: string | number | any,dataOrOptions?: Options | any,localOptions: Options = {}){
    let url: string | number
    let data: any
    if (typeof urlOrData === 'object') {
      url = ''
      data = urlOrData
      localOptions = dataOrOptions || {}
    } else {
      url = urlOrData
      data = dataOrOptions
    }
    let mergedOptions: Options = {
      ...defaults,
      ...instanceOptions,
      method,
      ...localOptions,
      // we need to ditch nullish headers
      headers: removeNullishValues({
        ...defaults.headers,
        ...instanceOptions.headers,
        ...localOptions.headers,
      }),
    }

    let query = {
      ...defaults.query,
      ...instanceOptions.query,
      ...localOptions.query,
    }

    let { responseAs } = mergedOptions as Required<Options>

    url = joinURL(baseUrl, typeof url === 'number' ? '' + url : url || '')

    // TODO: warn about multiple queries provided not supported
    // if (__DEV__ && query && urlInstance.search)

    url += stringifyQuery(query)

    if (data) mergedOptions.body = JSON.stringify(data)

    return localFetch(url, mergedOptions)
      .then((response:any) =>
        Promise.all([
          response,
          responseAs === 'response'
            ? response
            : response[responseAs]().catch(() => null),
        ])
      )
      .then(([response, data]:any) => {
        if (response.status >= 200 && response.status < 300) {
          // data is a raw response when responseAs is response
          return responseAs !== 'response' && response.status == 204
            ? null
            : data
        }
        let err = new Error(response.statusText) as HaulError
        err.response = response
        err.body = data
        throw err
      })
  }

  const localFetch = typeof fetch != 'undefined' ? fetch : fetchPolyfill!

  if (!localFetch) {
    throw new Error(
      'No fetch function exists. Make sure to include a polyfill on Node.js.'
    )
  }

  const instanceOptions: HaulInstance['options'] = {
    query: {},
    headers: {},
    ...passedInstanceOptions,
  }

  return {
    options: instanceOptions,
    post: _fetch.bind(null, 'POST'),
    put: _fetch.bind(null, 'PUT'),
    patch: _fetch.bind(null, 'PATCH'),

    // these two have no body
    get: (url: string, options?: Options) => _fetch('GET', url, null, options),
    delete: (url: string, options?: Options) =>
      _fetch('DELETE', url, null, options),
  }
}


