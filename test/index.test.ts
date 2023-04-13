import { beforeEach, describe, expect, it } from 'vitest'
import { defaults, haul } from '../src'

function expectType<T>(_value: T): void {}

describe('haul', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('calls fetch', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({}))

    await expect(api.get('')).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api/')
  })

  it('can use a number', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({}))
    await expect(api.get(0)).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api/0')
  })

  it('works with non trailing slashes', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({}))
    await expect(api.get('/2')).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api/2')
  })

  it('can use get without parameters', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({}))
    await expect(api.get()).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api/')
  })

  it('allows an absolute base', async () => {
    const api = haul('http://example.com/api/')
    fetchMock.mockResponseOnce(JSON.stringify({}))
    await expect(api.get('')).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('http://example.com/api/')
  })

  it('returns null on 204', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce('', { status: 204 })
    await expect(api.get('')).resolves.toEqual(null)
    expect(fetchMock.requests()[0].url).toEqual('/api/')
  })

  it('calls delete', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce('', { status: 204 })
    await expect(api.delete('')).resolves.toEqual(null)
    expect(fetchMock.requests()[0].url).toEqual('/api/')
  })

  it('calls delete without parameters', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce('', { status: 204 })
    await expect(api.delete()).resolves.toEqual(null)
    expect(fetchMock.requests()[0].url).toEqual('/api/')
  })

  it('rejects if not ok', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce('', { status: 404 })
    await expect(api.get('')).rejects.toMatchObject({
      response: expect.anything(),
    })
  })

  it('serializes body on error', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'nope' }), { status: 404 })
    await expect(api.get('')).rejects.toMatchObject({
      response: expect.anything(),
      body: { message: 'nope' },
    })
  })

  it('works with empty failed request', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce('', { status: 404 })
    await expect(api.get('')).rejects.toMatchObject({
      response: expect.anything(),
      body: null,
    })
  })

  it('can pass a query', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({ }))
    await expect(
      api.get('', { query: { foo: 'a', bar: 'b' } }),
    ).resolves.toEqual({})
  })

  it('can use get with options only', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({ }))
    await expect(api.get({ query: { foo: 'a', bar: 'b' } })).resolves.toEqual(
      {},
    )
  })

  it('merges global query', async () => {
    const api = haul('/api/', { query: { foo: 'a' } })
    fetchMock.mockResponseOnce(JSON.stringify({ }))
    await expect(api.get('', { query: { bar: 'b' } })).resolves.toEqual({})
  })

  it('can pass a body', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({ }))
    await expect(api.put('', { foo: 'a', bar: 'b' })).resolves.toEqual({})
    expect(fetchMock.requests()[0].body?.toString()).toEqual(JSON.stringify({ foo: 'a', bar: 'b' }))
  })

  it('can omit the url', async () => {
    const api = haul('/api/users')
    fetchMock.mockResponseOnce(JSON.stringify({ }))
    await expect(api.put({ foo: 'a', bar: 'b' })).resolves.toEqual({})
    expect(fetchMock.requests()[0].body?.toString()).toEqual(JSON.stringify({ foo: 'a', bar: 'b' }))
  })

  it('can add custom headers', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({ foo: 'a', bar: 'b' }))
    await expect(api.get('2', { headers: { Authorization: 'Bearer foo' } })).resolves.toEqual({ foo: 'a', bar: 'b' })
    expect(fetchMock.requests()[0].headers.get('Authorization')).toEqual('Bearer foo')
  })

  it('can add custom headers through instance', async () => {
    const api = haul('/api/')
    api.options.headers.Authorization = 'token secret'
    fetchMock.mockResponseOnce(JSON.stringify({ foo: 'a', bar: 'b' }))
    await expect(api.get('2', { headers: { other: 'foo' } })).resolves.toEqual({ foo: 'a', bar: 'b' })
    expect(fetchMock.requests()[0].headers.get('Authorization')).toEqual('token secret')
    expect(fetchMock.requests()[0].headers.get('other')).toEqual('foo')
    api.options.headers.Authorization = 'token secret'
  })

  it('can remove a default header', async () => {
    const api = haul('/api/', { headers: { 'Content-Type': null } })
    fetchMock.mockResponseOnce(JSON.stringify({ }))
    await expect(api.get('2')).resolves.toEqual({})
    expect(fetchMock.requests()[0].headers.get('Content-Type')).toEqual(null)
  })

  it('keeps empty strings headers', async () => {
    const api = haul('/api/', { headers: { 'Content-Type': '' } })
    fetchMock.mockResponseOnce(JSON.stringify({ }))
    await expect(api.get('2')).resolves.toEqual({})
    expect(fetchMock.requests()[0].headers.get('Content-Type')).toEqual('')
  })

  it('can return a raw response when called without url parameter', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({ foo: 'a', bar: 'b' }))
    await api.get({ responseAs: 'response' }).then((res) => {
      expect(res).not.toBeNull()
      expectType<Response>(res)
    })
  })

  it('can return a raw response with status code 204', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce('', { status: 204 })
    await api.get('', { responseAs: 'response' }).then((res) => {
      expect(res).not.toBeNull()
      expectType<Response>(res)
    })
  })

  it('can return a text response when called without url parameter', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({ foo: 'a', bar: 'b' }))
    await api.get({ responseAs: 'text' }).then((res) => {
      expect(res).not.toBeNull()
      expectType<string>(res)
    })
  })

  it('can return a raw response when delete called without url parameter', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce('', { status: 204 })
    await api.delete({ responseAs: 'response' }).then((res) => {
      expect(res).not.toBeNull()
      expectType<Response>(res)
    })
  })

  it('can return a text response when delete called without url parameter', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce('', { status: 200 })
    await api.delete({ responseAs: 'text' }).then((res) => {
      expect(res).not.toBeNull()
      expectType<string>(res)
    })
  })

  it('can add global defaults', async () => {
    const api = haul('/api/')
    defaults.query = { foo: 'bar' }
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 })
    await expect(api.get('2')).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api/2?foo=bar')
    delete defaults.query
  })

  it('does not add trailing slashes', async () => {
    const api = haul('/api')
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 })
    await expect(api.get('')).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api')
  })

  it('ensure in between slashes', async () => {
    const api = haul('/api')
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 })
    await expect(api.get('2')).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api/2')
  })

  it('adds explicit trailing slash', async () => {
    const api = haul('/api')
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 })
    await expect(api.get('/')).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api/')
  })

  it('avoids duplicated slashes', async () => {
    const api = haul('/api/')
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 })
    await expect(api.get('/2')).resolves.toEqual({})
    expect(fetchMock.requests()[0].url).toEqual('/api/2')
  })
})
