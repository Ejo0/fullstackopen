import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = {
  blogs: blogReducer,
  notification: notificationReducer,
}

export const store = configureStore({ reducer })
