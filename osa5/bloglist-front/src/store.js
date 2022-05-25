import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = {
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
  users: usersReducer,
}

export const store = configureStore({ reducer })
