export class TaskListManager {
  static sortAscendingOrderByWording(taskList, sortedTaskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return a.libelle.localeCompare(b.libelle)
    })
    sortedTaskList = newTaskList
    console.log('coucou')
    return sortedTaskList
  }
  static sortAscendingOrderByStartTime(taskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return (
        parseInt(a.heureDebut.split(':').join('')) -
        parseInt(b.heureDebut.split(':').join(''))
      )
    })
    return newTaskList
  }
  static sortAscendingOrderByEndTime(taskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return (
        parseInt(a.heureFin.split(':').join('')) -
        parseInt(b.heureFin.split(':').join(''))
      )
    })
    return newTaskList
  }

  static sortDescendingOrderByWording(taskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return b.libelle.localeCompare(a.libelle)
    })
    return newTaskList
  }
  static sortDescendingOrderByStartTime(taskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return (
        parseInt(b.heureDebut.split(':').join('')) -
        parseInt(a.heureDebut.split(':').join(''))
      )
    })
    return newTaskList
  }
  static sortDescendingOrderByEndTime(taskList) {
    const newTaskList = JSON.parse(JSON.stringify(taskList))
    newTaskList.sort((a, b) => {
      return (
        parseInt(b.heureFin.split(':').join('')) -
        parseInt(a.heureFin.split(':').join(''))
      )
    })
    return newTaskList
  }
}

// export function sortAscendingOrderByWording(taskList) {
//   const newTaskList = JSON.parse(JSON.stringify(taskList))
//   newTaskList.sort((a, b) => {
//     return a.libelle.localeCompare(b.libelle)
//   })
//   return newTaskList
// }
