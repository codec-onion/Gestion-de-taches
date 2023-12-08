export default class TaskListManager {
  static sortByWording(taskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return a.libelle.localeCompare(b.libelle)
    })
    return newTaskList
  }
  static sortByStartTime(taskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return (
        parseInt(a.heureDebut.split(':').join('')) -
        parseInt(b.heureDebut.split(':').join(''))
      )
    })
    return newTaskList
  }
  static sortByEndTime(taskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return (
        parseInt(a.heureFin.split(':').join('')) -
        parseInt(b.heureFin.split(':').join(''))
      )
    })
    return newTaskList
  }
}
