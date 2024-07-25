// Main page for the users, it will have a nav bar, with the available options acording to the user level
// It will have the profile Info, logOut and the subpages

// Mejorar profileArea o hacer una pagina de perfil
import './mainMenu.css'

import EventUser from '../../pages/EventUser/userPage.js'
import newEventPage from '../../pages/newEvent/newEvent.js'
import adminPage from '../../pages/adminPage/adminPage.js'
import orgEventPage from '../../pages/OrgEvents/orgEvents.js'
import profile from '../Profile/profile.js'
import StartMenu from '../startMenu/startMenu.js'

// Import all the other pages here
const mainMenuLayout = () => {
  return `
  <div class='navBtns'>
    <div class='pageBtns'>
      <button id = "eventListPage" class= 'btnNavMenu'> Event List </button>
      <button id = "eventOrganizedPage" class= 'btnNavMenu'> Events Organized </button>
      <button id = "createEventPage" class= 'btnNavMenu'> Create Event </button>
      <button id= "adminPage" class= 'btnNavMenu'> Administrator </button>
    </div>
    <div class='userBtns'>
      <button id= "profile" class= 'btnMainMenu'><img src='./assets/icons/icons8-hombre-menú-de-usuario-48.png'/>  </button>
      <button id= "logOut" class= 'btnMainMenu'> <img src='./assets/icons/icons8-salida-50.png'/> </button>
    </div>
  </div>
`
}

const mainMenu = () => {
  const user = JSON.parse(localStorage.getItem('user')).user
  const rol = JSON.parse(localStorage.getItem('user')).user.rol // Encriptar ?
  document.querySelector('#headerNav').innerHTML = mainMenuLayout()

  EventUser(user._id)

  document.querySelector('#eventListPage').addEventListener('click', () => {
    EventUser(user._id)
  })

  if (rol === 'admin' || rol === 'org') {
    document
      .querySelector('#eventOrganizedPage')
      .addEventListener('click', () => {
        orgEventPage(user._id)
      })
    document.querySelector('#createEventPage').addEventListener('click', () => {
      newEventPage(user)
    })
  } else {
    document.querySelector('#eventOrganizedPage').remove()
    document.querySelector('#createEventPage').remove()
  }
  if (rol === 'admin') {
    document.querySelector('#adminPage').addEventListener('click', () => {
      adminPage(user)
    })
  } else {
    document.querySelector('#adminPage').remove()
  }
  document.querySelector('#profile').addEventListener('click', () => {
    profile(user)
  })
  document.querySelector('#logOut').addEventListener('click', () => {
    localStorage.removeItem('user')
    alert('See you soon!')
    StartMenu()
  })
}

export default mainMenu
