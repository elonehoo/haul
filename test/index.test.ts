import {describe,it,expect,beforeEach} from 'vitest'
import {haul,defaults} from '../src'
import {APIRequest} from './api'

function expectType<T>(_value: T): void {}

describe('haul',()=>{

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('',async ()=>{
    fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

    const res = await APIRequest('google');

    await expect(haul(fetchMock.requests()[0].url).get('')).resolves.toEqual(null)
  })
})
