// Main page for the users, it will have a nav bar, with the available options acording to the user level
// It will have the profile Info, logOut and the subpages

// Mejorar profileArea o hacer una pagina de perfil

import './mainPage.css'
import Login from '../startPages/startPage'
import EventUser from '../EventUser/userPage.js'
import newEventPage from '../newEvent/newEvent.js'
import adminPage from '../adminPage/adminPage.js'
import orgEventPage from '../OrgEvents/orgEvents.js'

// Import all the other pages here
const mainTemplate = (user) => {
  return `
   <div class='navBtns'>
  <button id = "eventListPage"> Event List </button>
  <button id = "eventOrganizedPage" > Events Organized </button>
  <button id = "createEventPage" > Create Event </button>
  <button id= "adminPage"> Administrator </button>
  <button id= "logOut"> LogOut </button>
  </div>
  <div id= "subPage"></div>
  `
}

const mainPage = () => {
  const user = JSON.parse(localStorage.getItem('user')).user
  const rol = JSON.parse(localStorage.getItem('user')).user.rol // Encriptar ?

  document.querySelector('#app').innerHTML = mainTemplate(user)

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

  document.querySelector('#logOut').addEventListener('click', () => {
    localStorage.removeItem('user')
    alert('See you soon!')
    Login()
  })
}

export default mainPage
