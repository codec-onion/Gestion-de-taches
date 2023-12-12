const filterDateSameDay = (taskList, taskAdd) => {
  if(taskList.length === 0) {
    return []
  }

  const filteredTaskList = taskList.filter((task) => {
    const taskDate = new Date(task.startTime)
    const taskAddDate = new Date(taskAdd.startTime)
  
    return (
      taskDate.getFullYear() === taskAddDate.getFullYear() &&
      taskDate.getMonth() === taskAddDate.getMonth() &&
      taskDate.getDate() === taskAddDate.getDate()
    )
  })
  return filteredTaskList
}

function checkTaskOverlap(taskList, taskAdd) {
  
  for (let i = 0; i < taskList.length; i++) {
    const startTime1 = new Date(taskAdd.startTime)
    const endTime1 = new Date(taskAdd.endTime)
    const startTime2 = new Date(taskList[i].startTime)
    const endTime2 = new Date(taskList[i].endTime)
    
    if (endTime1 > startTime2 && startTime1 < endTime2) {
      return false
    }
  }
  return true
}

const checkTotalTaskTime = (taskList, taskAdd) => {
  const maxTotal = 1000 * 3600 * 8
  let sum = 0
  if (taskList.length > 0) {
    for (let task of taskList) {
      sum += new Date(task.endTime) - new Date(task.startTime)
    }
  }
  sum += new Date(taskAdd.endTime) - new Date(taskAdd.startTime)
  if (sum > maxTotal) {
    return false
  }
  return true
}

module.exports = {
  filterDateSameDay,
  checkTaskOverlap,
  checkTotalTaskTime
}