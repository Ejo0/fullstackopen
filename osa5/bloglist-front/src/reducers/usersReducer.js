import userService from '../services/users'

const getAll = (users) => ({
  type: 'GET_USERS',
  data: users,
})

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS': {
      return action.data
    }
    default: {
      return state
    }
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(getAll(users))
  }
}

export default usersReducer
