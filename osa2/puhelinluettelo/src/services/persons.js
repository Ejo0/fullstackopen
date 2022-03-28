import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const create = person => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(respose => respose.data)
}

const del = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

export default {create, getAll, del}
