import {Options,OptionsRaw} from './type'

let trailingSlashRE = /\/+$/

let leadingSlashRE = /^\/+/

export function stringifyQuery(query: any): string {
  let searchParams = Object.keys(query)
    .map((k) => [k, query[k]].map(encodeURIComponent).join('='))
    .join('&')
  return searchParams ? '?' + searchParams : ''
}

export function joinURL(base: string, url: string): string {
  return (
    base.replace(trailingSlashRE, '') + '/' + url.replace(leadingSlashRE, '')
  )
}

export function removeNullishValues(
  headers: Exclude<OptionsRaw['headers'], undefined>
): Exclude<Options['headers'], undefined> {
  return Object.keys(headers).reduce((newHeaders, headerName) => {
    if (headers[headerName] != null) {
      // @ts-ignore
      newHeaders[headerName] = headers[headerName]
    }
    return newHeaders
  }, {} as Exclude<Options['headers'], undefined>)
}
