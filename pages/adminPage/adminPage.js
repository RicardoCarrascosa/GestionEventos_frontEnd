//  Page for the administator, to validate the events

// mejorar UIUX

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
  console.log(event)
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
  const token = JSON.parse(localStorage.getItem('user')).token
  await fetch('http://localhost:3000/api/v1/events/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((response) => {
      response.forEach((ele) => {
        eventList.push(ele)
      })
    })
}

const verifyEvent = async (eventID) => {
  const userId = JSON.parse(localStorage.getItem('user')).user._id
  const token = JSON.parse(localStorage.getItem('user')).token
  await fetch('http://localhost:3000/api/v1/events/verify/'.concat(eventID), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      res.json()
    })
    .then((response) => {
      adminPage()
    })
}

const deleteEvent = async (eventID) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  await fetch('http://localhost:3000/api/v1/events/'.concat(eventID), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      res.json()
    })
    .then((response) => {
      adminPage()
    })
}
const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem('user')).token
  await fetch('http://localhost:3000/api/v1/users/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((response) => {
      response.forEach((ele) => {
        userList.push(ele)
      })
    })
}

const deleteUser = async (userID) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  await fetch('http://localhost:3000/api/v1/users/'.concat(userID), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      res.json()
    })
    .then((response) => {
      adminPage()
    })
}
const upgradeUser = async (userID) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  await fetch('http://localhost:3000/api/v1/users/'.concat(userID), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ rol: 'org' })
  })
    .then((res) => {
      res.json()
    })
    .then((response) => {
      adminPage()
    })
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
    console.log(user.profileImage)
    if (user.profileImage == '' || !user.profileImage) {
      user.profileImage = '/assets/icons/icons8-gestión-de-clientes-100.png'
    }

    document.querySelector('#adminUsers').innerHTML += userCard(user)
  })

  addEvntListToBtn()
}

export default adminPage
