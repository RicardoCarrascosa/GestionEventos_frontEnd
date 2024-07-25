import mainMenu from '../mainMenu/mainMenu.js'
import StartMenu from '../startMenu/startMenu.js'
import './header.css'
// Añadir fondo con imagen en difuminado

const headerInfo = () => {
  return `
    <h2>Malaga Eventos</h2>
    <div id= headerNav> </div>
    `
}

const createHeader = () => {
  document.querySelector('#header-container').innerHTML = headerInfo()
  // If user is in localStorage
  if (localStorage.getItem('user')) {
    mainMenu()
  } else {
    StartMenu()
  }
}

export default createHeader
