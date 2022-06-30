import {expect, test } from 'vitest'

import {haul} from '@elonehoo/haul'

test('test in mock',()=>{
  const base = haul('http://example.com/api/')
  base.get('').then((res)=>{
    console.log(res)
  })
})
