import anecdoteService from "../services/anecdotes"

const addAnecdote = (object) => ({
  type: 'ADD',
  data: object
})

const addVote = (object) => ({
  type: 'VOTE',
  data: object
})

const setAnecdotes = (anecdotes) => ({
  type: 'SET',
  data: anecdotes
})

const orderedByVotes = state => state.sort((a, b) => b.votes - a.votes)

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': {
      const voted = action.data
      return orderedByVotes(state.map(a => a.id !== voted.id ? a : voted))
    }
    case 'ADD': {
      return state.concat(action.data)
    }
    case 'SET': {
      return orderedByVotes(action.data)
    }
    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const vote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(id)
    dispatch(addVote(votedAnecdote))
  }
}

export default anecdoteReducer
