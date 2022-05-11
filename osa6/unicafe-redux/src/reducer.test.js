import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  const good = {
    type: 'GOOD'
  }
  const ok = {
    type: 'OK'
  }
  const bad = {
    type: 'BAD'
  }
  const zero = {
    type: 'ZERO'
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, good)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok and bad is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newStateOne = counterReducer(state, ok)
    deepFreeze(newStateOne)
    const newStateTwo = counterReducer(newStateOne, ok)
    deepFreeze(newStateTwo)
    const newStateThree = counterReducer(newStateTwo, bad)
    
    expect(newStateThree).toEqual({
      good: 0,
      ok: 2,
      bad: 1
    })
  })

  test('whole state is reset', () => {
    const state = initialState

    deepFreeze(state)
    const newStateOne = counterReducer(state, ok)
    deepFreeze(newStateOne)
    const newStateTwo = counterReducer(newStateOne, good)

    expect(newStateTwo).toEqual({
      good: 1,
      ok: 1,
      bad: 0
    })

    deepFreeze(newStateTwo)
    const resetState = counterReducer(newStateTwo, zero)

    expect(resetState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})