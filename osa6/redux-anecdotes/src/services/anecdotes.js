import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const object = await axios.get(`${baseUrl}/${id}`)
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...object.data,
    votes: object.data.votes + 1
  })
  return response.data
}

export default { getAll, createNew, addVote }
