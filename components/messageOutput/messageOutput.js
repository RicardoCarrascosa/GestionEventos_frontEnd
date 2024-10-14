import './messageOutput.css'

const messOut = (messageArray, type = 'warning') => {
  let message = ''
  if (messageArray['errors']) {
    messageArray['errors'].forEach((element) => {
      message = message + '\n\u2022 ' + element['msg']
    })
    // ! Mirar como sacar todos los errores que puedan salir del array
  } else {
    message = messageArray['msg']
  }

  const msgBox = `
    <div class='messageOutput ${type}'>
      <span class= "closeBtn"> &times </span>
      <p>${message}<p>
    <div>
    `

  document.querySelector('#alerts-container').innerHTML = msgBox

  document.querySelector('.closeBtn').addEventListener('click', () => {
    document.querySelector('#alerts-container').innerHTML = ''
  })

  if (type == 'success') {
    setTimeout(() => {
      document.querySelector('#alerts-container').innerHTML = ''
    }, 2000)
  }
}

export default messOut
