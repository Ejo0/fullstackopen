import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: null,
    timerId: null
  },
  reducers: {
    setNotification(state, action) {
      clearTimeout(state.timerId)
      return {
        content: action.payload,
        timerId: null
      }
    },
    removeNotification(state, action) {
      return {
        content: null,
        timerId: null
      }
    },
    setTimerId(state, action) {
      return {
        content: state.content,
        timerId: action.payload
      }
    }
  }
})

export const showNotification = (content, time) => {
  return async dispatch => {
    dispatch(setNotification(content))

    const timerId = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)

    dispatch(setTimerId(timerId))
  }
}

const { setNotification, removeNotification, setTimerId } = notificationSlice.actions
export default notificationSlice.reducer
