// setupVitest.js or similar file
import createFetchMock from 'vitest-fetch-mock'
import { vi } from 'vitest'

const fetchMocker = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks()

// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMocker.dontMock()
