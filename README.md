# haul

*convenient and modern wrapper around fetch with smart extensible defaults*

**Requires `fetch` support.**

## install

```bash
# npm
npm i @elonehoo/haul
# yarn
yarn add @elonehoo/haul
# pnpm
pnpm i @elonehoo/haul
```

## usage

usually we will write:

```typescript
// creating a new user
fetch('/api/users', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Elone Hoo',
    password: 'elonehoooohenole',
  }),
}).then((response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  // reject if the response is not 2xx
  throw new Error(response.statusText)
}).then((user) => {
  // ...
})
```

but now it can be written as

```typescript
const users = haul('/api/users')

users.post({
  name: 'Elone Hoo',
  password: 'elonehoooohenole',
}).then((user) => {
  // ...
})
```

creating a small layer to communicate to your API:

```typescript
// api/users
import { haul } from '@elonehoo/haul'

const users = haul('/api/users', globalOptions)

export function getUserById(id) {
  return users.get(id)
}

export function createUser(userData) {
  return users.post(userData)
}
```

adding Authorization tokens:

```typescript
// api/users
import { haul } from '@elonehoo/haul'

const todos = haul('/api/todos', globalOptions)

export function setToken(token) {
  // todos.options will be used for all requests
  todos.options.headers.Authorization = 'token ' + token
}

export function clearToken() {
  delete todos.options.headers.Authorization
}

export function createTodo(todoData) {
  return todo.post(todoData)
}
```

you can also globally add default options to all haul instances:

```typescript
import { defaults } from '@elonehoo/haul'

defaults.headers.Authorization = 'Bearer token'
```

### typescript

all methods defined on a `haul` instance accept a type generic to type their return:

```typescript
const todos = haul('/api/todos', globalOptions)

todos.get<{ text: string, id: number, isFinished: boolean }[]>().then(todos => {
  // todos is correctly typed
})
```

## Credits

Thanks to:

- [@posva/mande](https://github.com/posva/mande)
- [axios](https://github.com/axios/axios)
- [fetch](https://github.com/github/fetch)

## license

[MIT](./LICENSE) License © 2022 [Elone Hoo](https://github.com/elonehoo)
