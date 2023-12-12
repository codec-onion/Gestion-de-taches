const checkTaskInfo = (task) => {
  const wordingRegex = /^[a-zA-Z0-9À-ÿ\s]+\S$/
  const wordingIsValid = wordingRegex.test(task.wording)
  
  const startTime = new Date(task.startTime)
  const endTime = new Date(task.endTime)
  
  let response = ""
  
  if(!wordingIsValid){
    response += "Le libellé ne doit pas contenir de caractère spéciaux ou d'espace à la fin. "
  }
  if (isNaN(startTime)) {
    response += "Le format de la date de début n'est pas valide. "
  }
  if (isNaN(endTime)) {
    response += "Le format de la date de fin n'est pas valide."
  }
  return response
}

module.exports = {
  checkTaskInfo
}