function checkTaskOverlap(tasks, taskAdd) {
  for (let i = 0; i < tasks.length; i++) {
    const task1 = taskAdd
    const task2 = tasks[i]

    const startTime1 = parseInt(taskAdd.startTime.split(':').join(''))
    const endTime1 = parseInt(taskAdd.endTime.split(':').join(''))
    const startTime2 = parseInt(tasks[i].startTime.split(':').join(''))
    const endTime2 = parseInt(tasks[i].endTime.split(':').join(''))

    if (endTime1 > startTime2 && startTime1 < endTime2) {
      console.log(
        `Chevauchement trouvé entre "${task1.wording}" et "${task2.wording}"`
      )
      return false
    }
  }
  console.log('Aucun chevauchement trouvé.')
  return true
}

const checkTotalTaskTime = (taskList, taskAdd) => {
  const maxTotal = 1000 * 3600 * 8
  let sum = 0
  for (let task of taskList) {
    sum +=
      new Date(`2000-01-01T${task.endTime}`) -
      new Date(`2000-01-01T${task.startTime}`)
  }
  sum +=
    new Date(`2000-01-01T${taskAdd.endTime}`) -
    new Date(`2000-01-01T${taskAdd.startTime}`)
  if (sum > maxTotal) {
    console.log('Temps de travail maximum dépassé!')
    return false
  }
  console.log('Tâches ajoutée.')
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
