import './messageOutput.css'

const messOut = (messageArray, type = 'warning') => {
  console.log(messageArray)
  let message = `<p>${messageArray.message}</p>`
  if (messageArray['details']) {
    messageArray['details'].forEach((element) => {
      message = message + `<p>${element['path']} --> ${element['msg']}</p>`
    })
    // ! Mirar como sacar todos los errores que puedan salir del array
  }

  const msgBox = `
    <div class='messageOutput ${type}'>
      <span class= "closeBtn"> &times </span>
      <div>
      ${message}
      </div>
    </div>
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
