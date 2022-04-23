import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlog) => {
    const config = {headers: { Authorization: token }}

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

// note: due to slightly different solution in backend, body contains only amount of new likes
const like = async (blog) => {
    const response = await axios.put(
        `${baseUrl}/${blog.id}/like`,
        {likes : blog.likes + 1}
    )
    return response.data
}

const remove = async (blog) => {
    const config = {headers: { Authorization: token }}

    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)

    return response.status
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, like, remove }
