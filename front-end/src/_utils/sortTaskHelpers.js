let sortOrderWording = ''
let sortOrderStartTime = ''
let sortOrderEndTime = ''
let sortedTaskList = []

export const sortByWording = (taskList) => {
  sortOrderStartTime = sortOrderEndTime = ''
  sortedTaskList = JSON.parse(JSON.stringify(taskList))
  if (sortOrderWording === '') {
    sortOrderWording = '(ordre croissant)'
    sortedTaskList.sort((a, b) => {
      return a.wording.localeCompare(b.wording)
    })
  } else if (sortOrderWording === '(ordre croissant)') {
    sortOrderWording = '(ordre décroissant)'
    sortedTaskList.sort((a, b) => {
      return b.wording.localeCompare(a.wording)
    })
  } else {
    sortOrderWording = ''
    sortedTaskList = null
  }
  return {
    sortOrderWording,
    sortOrderStartTime,
    sortOrderEndTime,
    sortedTaskList,
  }
}

export const sortByStartTime = (taskList) => {
  sortOrderWording = sortOrderEndTime = ''
  sortedTaskList = JSON.parse(JSON.stringify(taskList))
  if (sortOrderStartTime === '') {
    sortOrderStartTime = '(ordre croissant)'
    sortedTaskList.sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime)
    })
  } else if (sortOrderStartTime === '(ordre croissant)') {
    sortOrderStartTime = '(ordre décroissant)'
    sortedTaskList.sort((a, b) => {
      return new Date(b.startTime) - new Date(a.startTime)
    })
  } else {
    sortOrderStartTime = ''
    sortedTaskList = null
  }
  return {
    sortOrderWording,
    sortOrderStartTime,
    sortOrderEndTime,
    sortedTaskList,
  }
}

export const sortByEndTime = (taskList) => {
  sortOrderWording = sortOrderStartTime = ''
  sortedTaskList = JSON.parse(JSON.stringify(taskList))
  if (sortOrderEndTime === '') {
    sortOrderEndTime = '(ordre croissant)'
    sortedTaskList.sort((a, b) => {
      return new Date(a.endTime) - new Date(b.endTime)
    })
  } else if (sortOrderEndTime === '(ordre croissant)') {
    sortOrderEndTime = '(ordre décroissant)'
    sortedTaskList.sort((a, b) => {
      return new Date(b.endTime) - new Date(a.endTime)
    })
  } else {
    sortOrderEndTime = ''
    sortedTaskList = null
  }
  return {
    sortOrderWording,
    sortOrderStartTime,
    sortOrderEndTime,
    sortedTaskList,
  }
}
