import { EventDispatcher } from '../lib'

interface ITestEvents {
  'test1': 'EventDispatcher test string 1'
  'test2': 'EventDispatcher test string 2'
}

const eventDispatcher = new EventDispatcher<ITestEvents>()
const callback1 = jest.fn()
const callback2 = jest.fn()

test('register and dispatch event', () => {
  eventDispatcher.on('test1', callback1)
  eventDispatcher.on('test2', callback2)

  eventDispatcher.dispatch('test1', 'EventDispatcher test string 1')
  eventDispatcher.dispatch('test2', 'EventDispatcher test string 2')

  expect(callback1).toHaveBeenCalledWith('EventDispatcher test string 1')
  expect(callback2).toHaveBeenCalledWith('EventDispatcher test string 2')
})

test('delete and dispatch event', () => {
  eventDispatcher.off('test1')
  eventDispatcher.dispatch('test1', 'EventDispatcher test string 1')

  // Should be called only once from the first test
  expect(callback1).toHaveBeenCalledTimes(1)
})

test('dispose and dispatch event', () => {
  eventDispatcher.dispose()
  eventDispatcher.dispatch('test2', 'EventDispatcher test string 2')

  // Should be called only once from the first test
  expect(callback2).toHaveBeenCalledTimes(1)
})
