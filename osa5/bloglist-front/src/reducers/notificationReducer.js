const setNotification = (content, isError) => ({
  type: 'SET_CONTENT',
  data: { content, isError },
})

const remove = () => ({
  type: 'REMOVE_NOTIFICATION',
})

const setTimerId = (timerId) => ({
  type: 'SET_TIMERID',
  data: timerId,
})

const notificationReducer = (
  state = { content: null, timerId: null, isError: false },
  action
) => {
  switch (action.type) {
    case 'SET_CONTENT': {
      clearTimeout(state.timerId)
      return {
        content: action.data.content,
        timerId: null,
        isError: action.data.isError,
      }
    }
    case 'REMOVE_NOTIFICATION': {
      return {
        content: null,
        timerId: null,
        isError: false,
      }
    }
    case 'SET_TIMERID': {
      return {
        content: state.content,
        timerId: action.data,
        isError: state.isError,
      }
    }
    default:
      return state
  }
}

export const showNotification = (content, time, type = 'notification') => {
  const isError = type === 'error' ? true : false
  return async (dispatch) => {
    dispatch(setNotification(content, isError))

    const timerId = setTimeout(() => {
      dispatch(remove())
    }, time * 1000)

    dispatch(setTimerId(timerId))
  }
}

export default notificationReducer
