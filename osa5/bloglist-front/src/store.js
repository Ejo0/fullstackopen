import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = {
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
}

export const store = configureStore({ reducer })
