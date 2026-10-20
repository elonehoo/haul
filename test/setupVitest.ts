import createFetchMock from 'vitest-fetch-mock'
import { vi } from 'vitest'

// Node's Request rejects relative URLs. vitest-fetch-mock resolves them
// against `location`, matching a browser document.
globalThis.location = { origin: 'http://localhost' } as unknown as Location

const fetchMocker = createFetchMock(vi)

fetchMocker.enableMocks()
