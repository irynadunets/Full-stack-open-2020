import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return  axios.get(baseUrl)
}

const create = newObject => {
  axios.post(baseUrl, newObject)
  return axios.get(baseUrl)
}

const update = (id, newObject) => {
  axios.put(`${baseUrl}/${id}`, newObject)
  return axios.get(baseUrl)
}

const delate = (id) => {
  axios.delete(`${baseUrl}/${id}`)
  return axios.get(baseUrl)
}

export default { getAll, create, update, delate }
