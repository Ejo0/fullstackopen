import loginService from '../services/login'
import blogService from '../services/blogs'

const login = (user) => ({
  type: 'LOGIN',
  data: user,
})

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.data
    }
    case 'LOGOUT': {
      return null
    }
    default:
      return state
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(login(user))
    blogService.setToken(user.token)
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(login(user))
      return true
    } catch (exception) {
      return false
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('blogAppUser')
  }
}

export default userReducer
