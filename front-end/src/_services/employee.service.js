import Axios from './axios.services'

export const getAllEmployees = () => {
  return Axios.get('/employee')
}
