# Type

## HaulError

> Extended Error with the raw `Response` object.

### Signature

```ts
interface HaulError<T = any> extends Error {
  body: T
  response: Response
}
```

### Parmeters

| Name | Type | Description |
| :------ | :------ | :------ |
| Body | `T` | |
| response | `Response` | |

## HaulInstance

> Object returned by [haul()](/function/haul)

### Signature

```ts
interface HaulInstance{}
```

### Parmeters

| Name | Type | Description |
| :------ | :------ | :------ |
| options | `Required<Pick<OptionsRaw, 'headers'>> & Pick<OptionsRaw, 'responseAs' \| 'query'>` | |

### Methods

| Name | Description |
| :------ | :------ |
| `get(options:Options)` | Sends a GET request to the given url. |
| `get(url:string,options:Options)` | |
| `delete(options:Options)` | Sends a DELETE request to the given url. |
| `delete(url:string,options:Options)` | |
| `patch(options:Options)` | Sends a PATCH request to the given url. |
| `patch(url:string,options:Options)` | |
| `post(options:Options)` | Sends a POST request to the given url. |
| `post(url:string,options:Options)` | |
| `put(options:Options)` | Sends a PUT request to the given url. |
| `put(url:string,options:Options)` | |

## Options

> Allowed options for a request. Extends native RequestInit.

### Signature

```ts
interface Options<ResponseAs extends ResponseAsTypes = ResponseAsTypes> extends RequestInit {}
```

### Parmeters

| Name | Type | Description |
| :------ | :------ | :------ |
| headers | `Record<string, string>` | (Optional) Headers sent alongside the request |
| query | `any` | (Optional) Optional query object. Does not support arrays. Will get stringified |
| responseAs | `ResponseAs` | (Optional) What kind of response is expected. Defaults to `json`. `response` will return the raw response from `fetch`. |

## OptionsRaw

### Signature

```ts
interface OptionsRaw<R extends ResponseAsTypes = ResponseAsTypes>
  extends Omit<Options<R>, 'headers' | 'signal'>{}
```

### Parmeters

| Name | Type | Description |
| :------ | :------ | :------ |
| headers | `Record<string, string \| null>` | (Optional) Headers sent alongside the request. Set any header to null to remove it. |
| signal | `never` | (Optional) AbortSignal can only be passed to requests, not to a haul instance because it can only be used once. |

## HaulResponse

```ts
type HaulResponse<
  T = unknown,
  ResponseType extends ResponseAsTypes = 'json',
> = Promise<
  ResponseType extends 'response'
    ? Response
    : ResponseType extends 'text'
      ? string
      : T
>
```

## ResponseAsTypes

```ts
type ResponseAsTypes = 'json' | 'text' | 'response'
```
