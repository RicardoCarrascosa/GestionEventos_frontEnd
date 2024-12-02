//  Page for the administator, to validate the events
//! Add try catch en todos los fetch, con algun mensaje que ha petado el sistema
// mejorar UIUX
import loadingSpinner from '../../components/loadingSpinner/loadingSpinner'
import messOut from '../../components/messageOutput/messageOutput'
import fetchAPI from '../../utils/fetchAPI'

import './adminPage.css'
let eventList = []
let userList = []

const adminHTML = `
  <h2> All Events </h2>
  <div id = adminEvents class ='adminContainer'>
  </div>
  <h2> All Users </h2>
  <div id = adminUsers class ='adminContainer'>
  </div>`

const eventCard = (event, subclass) => {
  return `<div class='adminCard'>
  <span class='hidden'>${event._id}</span>
  <h3>${event.name}</h3>
  <h5 class=${event.verified ? 'verified' : 'notVerified'}>${
    event.verified ? 'Verified' : 'Needs verification'
  }</h5>
  <img src =${event.eventImage}></img>
  <h4>${event.type}</h4>
  <h4>${event.date.split('T')[0]}</h4>
  <p>${event.description}</p>
  <button id='btnVerifyEvent'>Verify</button>
  <button id='btnDeleteEvent'>Delete</button>
  </div>`
}

const getAllEvents = async () => {
  loadingSpinner.displayLoading()
  const token = JSON.parse(localStorage.getItem('user')).token
  try {
    // await fetch(backURL('events/'), {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    await fetchAPI('events/', 'GET', token)
      .then((res) => res.json())
      .then((response) => {
        loadingSpinner.hideLoading()
        response.events.forEach((ele) => {
          eventList.push(ele)
        })
      })
  } catch {
    loadingSpinner.hideLoading()
    messOut({ message: `Could not connect with the server` }, 'warning')
  }
}

const verifyEvent = async (eventID) => {
  const userId = JSON.parse(localStorage.getItem('user')).user._id
  const token = JSON.parse(localStorage.getItem('user')).token
  try {
    // await fetch(backURL('events/verify/').concat(eventID), {
    //   method: 'PUT',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    await fetchAPI(`events/verify/${eventID}`, 'PUT', token)
      .then((res) => res.json())
      .then((response) => {
        adminPage()
        messOut(response, 'success')
      })
  } catch {
    loadingSpinner.hideLoading()
    messOut({ message: `Could not connect with the server` }, 'warning')
  }
}

const deleteEvent = async (eventID) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  try {
    // await fetch(backURL('events/').concat(eventID), {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    await fetchAPI(`events/${eventID}`, 'DELETE', token)
      .then((res) => res.json())
      .then((response) => {
        messOut(response, 'success')
        adminPage()
      })
  } catch {
    loadingSpinner.hideLoading()
    messOut({ message: `Could not connect with the server` }, 'warning')
  }
}
const getAllUsers = async () => {
  loadingSpinner.displayLoading()

  const token = JSON.parse(localStorage.getItem('user')).token
  try {
    // await fetch(backURL('users/'), {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    await fetchAPI(`users`, 'GET', token)
      .then((res) => res.json())
      .then((response) => {
        loadingSpinner.hideLoading()
        response.users.forEach((ele) => {
          userList.push(ele)
        })
      })
  } catch {
    loadingSpinner.hideLoading()
    messOut({ message: `Could not connect with the server` }, 'warning')
  }
}

const deleteUser = async (userID) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  try {
    // await fetch(backURL('users/'.concat(userID)), {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    await fetchAPI(`users/${userID}`, 'DELETE', token)
      .then((res) => res.json())
      .then((response) => {
        messOut(response, 'success')
        adminPage()
      })
  } catch {
    loadingSpinner.hideLoading()
    messOut({ message: `Could not connect with the server` }, 'warning')
  }
}
const upgradeUser = async (userID) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  try {
    // await fetch(backURL('users/'.concat(userID)), {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   },
    //   body: JSON.stringify({ rol: 'org' })
    // })
    fetchAPI(`users/${userID}`, 'PUT', token, JSON.stringify({ rol: 'org' }))
      .then((res) => res.json())
      .then((response) => {
        messOut(response, 'success')
        adminPage()
      })
  } catch {
    loadingSpinner.hideLoading()
    messOut({ message: `Could not connect with the server` }, 'warning')
  }
}

const userCard = (user) => {
  return `<div class='adminCard '>
  <span class='hidden'>${user._id}</span>
  <h3>${user.name}</h3>
  <h5 class=${user.rol}>${user.rol}</h5>
  <img src ="${user.profileImage}"></img>
  <h4>${user.email}</h4>
  <h4>${user.birthday.split('T')[0]}</h4>
  
  
  <button id= 'btnOrgUser'>Upgrade to Organizer</button>
  <button id= 'btnDeleteUser'>Delete</button>
  </div>`
}

const addEvntListToBtn = () => {
  const eventsVerBtn = document.querySelectorAll('#btnVerifyEvent')
  eventsVerBtn.forEach((btn) =>
    btn.addEventListener('click', () => {
      const eventID = btn.parentNode.firstElementChild.textContent
      verifyEvent(eventID)
    })
  )

  const eventsDELBtn = document.querySelectorAll('#btnDeleteEvent')
  eventsDELBtn.forEach((btn) =>
    btn.addEventListener('click', () => {
      const eventID = btn.parentNode.firstElementChild.textContent
      deleteEvent(eventID)
    })
  )
  const udpUserBtn = document.querySelectorAll('#btnOrgUser')
  udpUserBtn.forEach((btn) =>
    btn.addEventListener('click', () => {
      const userID = btn.parentNode.firstElementChild.textContent
      upgradeUser(userID)
    })
  )
  const userDELBtn = document.querySelectorAll('#btnDeleteUser')
  userDELBtn.forEach((btn) =>
    btn.addEventListener('click', () => {
      const userID = btn.parentNode.firstElementChild.textContent
      deleteUser(userID)
    })
  )
}

const adminPage = async () => {
  eventList.length = 0
  userList.length = 0
  await getAllEvents()
  await getAllUsers()

  document.querySelector('#app-container').innerHTML = adminHTML
  document.querySelector('#adminEvents').innerHTML = ''
  document.querySelector('#adminUsers').innerHTML = ''

  eventList.forEach((event) => {
    let subclass = 'notVerified'
    if (event.verified) {
      subclass = 'Verified'
    }
    if (event.eventImage == '' || !event.eventImage) {
      event.eventImage = '/assets/icons/icons8-conferencia-100.png'
    }
    document.querySelector('#adminEvents').innerHTML += eventCard(
      event,
      subclass
    )
  })

  userList.forEach((user) => {
    if (user.profileImage == '' || !user.profileImage) {
      user.profileImage = '/assets/icons/icons8-gestión-de-clientes-100.png'
    }

    document.querySelector('#adminUsers').innerHTML += userCard(user)
  })

  addEvntListToBtn()
}

export default adminPage
