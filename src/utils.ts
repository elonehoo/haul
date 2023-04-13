import type { Options, OptionsRaw } from './type'

const leadingSlashRE = /^\/+/

export function stringifyQuery(query: any): string {
  const searchParams = Object.keys(query)
    .map(k => [k, query[k]].map(encodeURIComponent).join('='))
    .join('&')
  return searchParams ? `?${searchParams}` : ''
}

export function joinURL(base: string, url: string): string {
  return (
    base
    + (url
      && (base.endsWith('/')
        ? url.replace(leadingSlashRE, '')
        : url.startsWith('/')
          ? url
          : `/${url}`))
  )
}

export function removeNullishValues(
  headers: Exclude<OptionsRaw['headers'], undefined>,
): Exclude<Options['headers'], undefined> {
  return Object.keys(headers).reduce((newHeaders, headerName) => {
    if (headers[headerName] != null)
      newHeaders[headerName] = headers[headerName]!

    return newHeaders
  }, {} as Exclude<Options['headers'], undefined>)
}
