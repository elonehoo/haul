# HaulError

> Extended Error with the raw `Response` object.

## Signature

```ts
interface HaulError<T = any> extends Error {
  body: T
  response: Response
}
```

## Parmeters

| Name | Type | Description |
| :------ | :------ | :------ |
| Body | `T` | |
| response | `Response` | |
