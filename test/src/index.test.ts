import { test } from 'vitest'

import {haul} from '@elonehoo/haul'
import fetch from 'node-fetch'
import Global = NodeJS.Global;
export interface GlobalWithCognitoFix extends Global {
    fetch: any
}
declare const global: GlobalWithCognitoFix;
global.fetch = fetch

test('test in mock',()=>{
  const hi = haul('http://localhost:8080/item/hi')
  hi.get('/').then(res=>{
    console.log(res)
  })
})
