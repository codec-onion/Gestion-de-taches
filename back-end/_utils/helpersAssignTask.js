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
  const returnValue = {
    isValid: false,
    errorMsg: ""
  }

  if(taskList.length === 0) {
    returnValue.isValid = true
    return returnValue
  }

  for (let i = 0; i < taskList.length; i++) {
    const startTime1 = new Date(taskAdd.startTime)
    const endTime1 = new Date(taskAdd.endTime)
    const startTime2 = new Date(taskList[i].startTime)
    const endTime2 = new Date(taskList[i].endTime)
    
    if (endTime1 > startTime2 && startTime1 < endTime2 || startTime1 === startTime2 && endTime1 === endTime2) {
      const formatedStartTime2 = formatHoursMinutes(startTime2)
      const formatedEndTime2 = formatHoursMinutes(endTime2)
      returnValue.errorMsg = `Une tâche est déjà prévue dans cette plage horaire ce jour-ci:  ${taskList[i].wording} qui a lieu entre ${formatedStartTime2} et ${formatedEndTime2}`
      return returnValue
    }
  }
  returnValue.isValid = true
  return returnValue
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

const formatHoursMinutes = (date) => {
const hours = date.getHours()
const minutes = date.getMinutes()

let formated
let formatedHours
let formatedMinutes

  if(hours >= 0 && hours <= 9){
    formatedHours = `0${hours}`
  }
  if(minutes >= 0 && minutes <= 9) {
    formatedMinutes = `0${minutes}`
  }
  if(formatedHours && !formatedMinutes){
    formated = `${formatedHours}:${minutes}`
  } else if (!formatedHours && formatedMinutes){
    formated = `${hours}:${formatedMinutes}`
  } else if (formatedHours && formatedMinutes) {
    formated = `${formatedHours}:${formatedMinutes}`
  }
  if(formated) {
    return formated
  } else {
    return `${hours}:${minutes}`
  }
}

module.exports = {
  filterDateSameDay,
  checkTaskOverlap,
  checkTotalTaskTime
}