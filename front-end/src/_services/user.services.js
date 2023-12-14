import Axios from './axios.services'
import router from '@/router'

export const login = (credentials) => {
  return Axios.post('/user/login', credentials)
}

export const isLogged = () => {
  return Axios.get('/user/logged')
}
