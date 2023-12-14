const checkTaskInfo = (task) => {
  const wordingRegex = /^[a-zA-Z0-9À-ÿ\s]+\S$/
  const wordingIsValid = wordingRegex.test(task.wording)
  
  const startTime = new Date(task.startTime)
  const endTime = new Date(task.endTime)
  
  let response = ""
  
  if (!wordingIsValid){
    response += "Le libellé ne doit pas contenir de caractère spéciaux ou d'espace à la fin. "
  }
  if (isNaN(startTime)) {
    response += "Le format de la date de début n'est pas valide. "
  }
  if (isNaN(endTime)) {
    response += "Le format de la date de fin n'est pas valide. "
  }
  if (endTime <= startTime) {
    response += 'La date de fin ne peut être antérieure ou égale à la date de début.'
  }
  return response
}

module.exports = {
  checkTaskInfo
}