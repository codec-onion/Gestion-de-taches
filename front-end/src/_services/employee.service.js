import Axios from './axios.services'

const getAllEmployees = () => {
  return Axios.get('/employee')
}

export { getAllEmployees }
