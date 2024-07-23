// PAge for the normal user, to check the events he is asisting, and the event that are open to go to

// mejorar UIUX
import './userPage.css'

const EventUserTemplate = () => {
  return `
  <div id='selEventContainer'>
  <h3>Events</h3>
    <select id= 'selectEvents'>
      <option value ='enrolled'>Events Enrolled</option>
      <option value ='available'>Events Available</option>
    <select>
  </div>
  <section class="card-container">
  
  <div class= "enrolledEvents">
  <h2> Events Enroled </h2>
  </div>
  <div class= "availableEvents hidden">
  <h2> Events Available </h2>
  </div>
  </section>
  `
}

// const eventCards = (card, btnText = 'Attend') => {
//   return `<div class= "card">
//   <span>${card.id}</span>
//   <h3>${card.name}</h4>
//   <p>${card.date}</p>
//   <img src='../../public/assets/programming2.png'></img>
//   <h4>${card.type}</h4>
//   <p>${card.description}</p>
//   <button id =${btnText} >${btnText}</button>
//   </div>`
// }

const eventCards = (card, btnText = 'Attend') => {
  return `<div class= "card">
  <span>${card.id}</span>
  <div >
  <h3>${card.name}</h3>
  <h4>${card.type}</h4>
  <button id =${btnText} >${btnText}</button>
  </div>

  <div>
  <p>${card.date}</p>
  <p>${card.description}</p>
  </div>
  <div>
  <img src='../../public/assets/programming2.png'></img>
    </div>`
}

const extractEventInfo = (data) => {
  const cards = []
  if (data) {
    data.forEach((element) => {
      if (element.verified) {
        const card = {
          id: element._id,
          name: element.name,
          description: element.description,
          type: element.type,
          date: element.date.split('T')[0]
        }
        cards.push(card)
      }
    })
  }
  return cards
}

const getEvents = async () => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const res = await fetch('http://localhost:3000/api/v1/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (res.status === 200) {
    const data = await res.json()
    return extractEventInfo(data)
  } else {
    return []
  }
}

const getEventsUserAsists = async (user) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const res = await fetch(
    `http://localhost:3000/api/v1/attendees/user/${user}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (res.status === 200) {
    const data = await res.json()
    if (data) {
      return extractEventInfo(data.events)
    } else {
      return []
    }
  } else {
    return []
  }
}
const attendEvent = async (userId, eventId) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  await fetch(`http://localhost:3000/api/v1/attendees/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      user: userId,
      events: eventId
    })
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
      alert(`Event Added`)
      EventUser(userId)
    })
}
const deleteAttend = async (userId, eventId) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  console.log('Delete Event')
  await fetch(`http://localhost:3000/api/v1/attendees/delete/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      user: userId,
      events: eventId
    })
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
      alert(`Event deleted`)
      EventUser(userId)
    })
  // Haer para eliminar la asistencia al evento de este usuario / Incluir en el backend
}
const renderEvents = (events, atendEvent, userID) => {
  events.forEach((event) => {
    if (atendEvent.some((e) => e.id === event.id)) {
      document.querySelector('.enrolledEvents').innerHTML += eventCards(
        event,
        'Delete'
      )
    } else {
      document.querySelector('.availableEvents').innerHTML += eventCards(
        event,
        'Attend'
      )
    }
  })
  const userAttendAsist = document.querySelectorAll('#Attend')
  userAttendAsist.forEach((btn) =>
    btn.addEventListener('click', () => {
      const eventID = btn.parentNode.parentNode.firstElementChild.textContent
      attendEvent(userID, eventID)
    })
  )
  const userDeleteAsist = document.querySelectorAll('#Delete')
  userDeleteAsist.forEach((btn) =>
    btn.addEventListener('click', () => {
      const eventID = btn.parentNode.parentNode.firstElementChild.textContent
      deleteAttend(userID, eventID)
    })
  )
}
const EventUser = async (userID) => {
  document.querySelector('#subPage').innerHTML = EventUserTemplate()
  const events = await getEvents()
  const atendEvent = await getEventsUserAsists(userID)

  document.querySelector('#selectEvents').addEventListener('change', (ev) => {
    if (ev.target.value == 'enrolled') {
      document.querySelector('.enrolledEvents').classList.remove('hidden')
      document.querySelector('.availableEvents').classList.add('hidden')
    } else if (ev.target.value == 'available') {
      document.querySelector('.enrolledEvents').classList.add('hidden')
      document.querySelector('.availableEvents').classList.remove('hidden')
    }
  })
  renderEvents(events, atendEvent, userID)
}

export default EventUser
