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
      return a.libelle.localeCompare(b.libelle)
    })
  } else if (sortOrderWording.value === '(ordre croissant)') {
    sortOrderWording.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return b.libelle.localeCompare(a.libelle)
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
        parseInt(a.heureDebut.split(':').join('')) -
        parseInt(b.heureDebut.split(':').join(''))
      )
    })
  } else if (sortOrderStartTime.value === '(ordre croissant)') {
    sortOrderStartTime.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return (
        parseInt(b.heureDebut.split(':').join('')) -
        parseInt(a.heureDebut.split(':').join(''))
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
        parseInt(a.heureFin.split(':').join('')) -
        parseInt(b.heureFin.split(':').join(''))
      )
    })
  } else if (sortOrderEndTime.value === '(ordre croissant)') {
    sortOrderEndTime.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return (
        parseInt(b.heureFin.split(':').join('')) -
        parseInt(a.heureFin.split(':').join(''))
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
