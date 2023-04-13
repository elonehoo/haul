# HaulInstance

> Object returned by [haul()](/function/haul)

## Signature

```ts
interface HaulInstance
```

## Parmeters

| Name | Type | Description |
| :------ | :------ | :------ |
| options | `Required<Pick<OptionsRaw, 'headers'>> & Pick<OptionsRaw, 'responseAs' \| 'query'>` | |

## Methods

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
