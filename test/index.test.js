import { helloWorld } from '../src/index.js'

jest.useFakeTimers()

test('index helloWorld', () => {
  let str = helloWorld()
  expect(str).toBe('hello world!')
})
