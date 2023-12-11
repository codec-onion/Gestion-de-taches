import { ref } from 'vue'

const sortedTaskList = ref(null)
const sortOrderWording = ref('')
const sortOrderStartTime = ref('')
const sortOrderEndTime = ref('')

const sortByWording = (taskList) => {
  sortOrderStartTime.value = sortOrderEndTime.value = ''
  sortedTaskList.value = JSON.parse(JSON.stringify(taskList))
  if (sortOrderWording.value === '') {
    sortOrderWording.value = '(ordre croissant)'
    sortedTaskList.value.sort((a, b) => {
      return a.wording.localeCompare(b.wording)
    })
  } else if (sortOrderWording.value === '(ordre croissant)') {
    sortOrderWording.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return b.wording.localeCompare(a.wording)
    })
  } else {
    sortOrderWording.value = ''
    sortedTaskList.value = null
  }
}

const sortByStartTime = (taskList) => {
  sortOrderWording.value = sortOrderEndTime.value = ''
  sortedTaskList.value = JSON.parse(JSON.stringify(taskList))
  if (sortOrderStartTime.value === '') {
    sortOrderStartTime.value = '(ordre croissant)'
    sortedTaskList.value.sort((a, b) => {
      return (
        parseInt(a.startTime.split(':').join('')) -
        parseInt(b.startTime.split(':').join(''))
      )
    })
  } else if (sortOrderStartTime.value === '(ordre croissant)') {
    sortOrderStartTime.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return (
        parseInt(b.startTime.split(':').join('')) -
        parseInt(a.startTime.split(':').join(''))
      )
    })
  } else {
    sortOrderStartTime.value = ''
    sortedTaskList.value = null
  }
}

const sortByEndTime = (taskList) => {
  sortOrderWording.value = sortOrderStartTime.value = ''
  sortedTaskList.value = JSON.parse(JSON.stringify(taskList))
  if (sortOrderEndTime.value === '') {
    sortOrderEndTime.value = '(ordre croissant)'
    sortedTaskList.value.sort((a, b) => {
      return (
        parseInt(a.endTime.split(':').join('')) -
        parseInt(b.endTime.split(':').join(''))
      )
    })
  } else if (sortOrderEndTime.value === '(ordre croissant)') {
    sortOrderEndTime.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return (
        parseInt(b.endTime.split(':').join('')) -
        parseInt(a.endTime.split(':').join(''))
      )
    })
  } else {
    sortOrderEndTime.value = ''
    sortedTaskList.value = null
  }
}

export {
  sortedTaskList,
  sortOrderWording,
  sortOrderStartTime,
  sortOrderEndTime,
  sortByWording,
  sortByStartTime,
  sortByEndTime,
}
