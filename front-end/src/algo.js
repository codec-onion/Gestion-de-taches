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

const checkTaskInfo = () => {
  const wordingRegex = /^[a-zA-Z0-9À-ÿ\s]+$/
  const timeRegex = /^\d{2}:\d{2}$/
  const wordingTest = wordingRegex.test(task.value.wording)
  const startTimeTest = timeRegex.test(task.value.startTime)
  const endTimeTest = timeRegex.test(task.value.endTime)
  const comparisonTime =
    parseInt(task.value.endTime.split(':').join('')) -
    parseInt(task.value.startTime.split(':').join(''))
  if (
    wordingTest &&
    startTimeTest &&
    endTimeTest &&
    Math.sign(comparisonTime) === 1
  ) {
    console.log(task.value)
    return true
  } else {
    console.log('Regex refusée!')
    return false
  }
}
