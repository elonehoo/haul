# default

> Global default options as Options that are applied to **all** mande instances. Always contain an initialized headers property with the default headers: - Accept: ‘application/json’ - ‘Content-Type’: ‘application/json’

## Signature

```ts
const defaults: Options &
Pick<Required<Options>, 'headers' | 'responseAs'> = {
  responseAs: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}
```
