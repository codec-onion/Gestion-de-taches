import Task from '../entities/Task'

export default class TaskManager {
  createTask(libelle, heureDebut, heureFin) {
    const task = new Task(libelle, heureDebut, heureFin)
    return task
  }
}
