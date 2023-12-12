import Axios from './axios.services'

export const getAllTasks = () => {
  return Axios.get('/task')
}

export const createTask = (task) => {
  return Axios.post('/task', task)
}

export const assignTask = (employeeAndTaskId) => {
  return Axios.put('/task/assign', employeeAndTaskId)
}

export const deleteTask = (taskId) => {
  return Axios.delete(`/task/${taskId}`)
}
