import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const create = person => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

export default {create}
