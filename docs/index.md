# Haul

> convenient and modern wrapper around fetch with smart extensible defaults

<p>
  <a href="https://www.npmjs.com/package/@elonehoo/haul">
    <img src="https://img.shields.io/npm/v/@elonehoo/haul?color=43B36B&label=" />
  </a>
</p>

## Install

::: code-group

```sh [pnpm]
$ pnpm add -D @elonehoo/haul
```

```sh [npm]
$ npm install -D @elonehoo/haul
```

```sh [yarn]
$ yarn add -D @elonehoo/haul
```

:::


## Usage

usually we will write:

```ts
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

```ts
const users = haul('/api/users')

users.post({
  name: 'Elone Hoo',
  password: 'elonehoooohenole',
}).then((user) => {
  // ...
})
```

creating a small layer to communicate to your API:

```ts
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

```ts
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

```ts
import { defaults } from '@elonehoo/haul'

defaults.headers.Authorization = 'Bearer token'
```

### typescript

all methods defined on a haul instance accept a type generic to type their return:

```ts
const todos = haul('/api/todos', globalOptions)

todos.get<{ text: string, id: number, isFinished: boolean }[]>().then(todos => {
  // todos is correctly typed
})
```
