import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = async (newObject) => {
    console.log(newObject, 'data in sevices')
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

export default { getAll, create }
