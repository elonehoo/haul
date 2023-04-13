# haul

> Create a Haul instance

## Signature

```ts
function haul(
  baseURL: string,
  passedInstanceOptions: OptionsRaw = {},
  fetchPolyfill?: Window['fetch']
): HaulInstance
```

## Parmeters

| Name | Type | Description |
| :------ | :------ | :------ |
| baseURL | `string` | The base URL of the API |
| passedInstanceOptions | `OptionsRaw` | The options to pass to the instance |
| fetchPolyfill | `Window['fetch']` | The fetch polyfill to use |

## Returns

HaulInstance

## Example

```ts
const users = haul('/api/users')

users.get('2').then(user => {
  // do something
})
```
