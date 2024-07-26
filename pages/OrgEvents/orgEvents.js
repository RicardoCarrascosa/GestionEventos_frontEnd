// Page for the Organizer to check the events he Organizes, the asistants etc...

// mejorar  -  lista de participantes
import './orgEvent.css'
const eventList = []

const orgContainer = () => {
  const containerHTML = `<h2>Events you Organize</h2>
  <div id = orgEvsContainer>
  
  </div>`
  return containerHTML
}

const orgEventsContainer = async (userId) => {
  const container = document.querySelector('#orgEvsContainer')
  container.innerHTML = ''
  eventList.length = 0
  await getEventsOrganized(userId)
  if (eventList.length != 0) {
    eventList.forEach(async (eve) => {
      let eventAsistant = await getAsistants(eve._id)
      let usersCards = asistContainer(eventAsistant)
      container.innerHTML += OrgContainer(eve, usersCards)
    })
  } else {
    container.innerHTML = `<h2 class= noOrgEv >You dont organize an event</h2>`
  }
}
const OrgContainer = (event, usersCards) => {
  let validState = { text: 'Not Verified', value: 'notverifiedOrg' }
  if (event.verified) {
    validState = { text: 'Verified', value: 'verifiedOrg' }
  }

  if (event.eventImage == '' || !event.eventImage) {
    event.eventImage = '../../public/assets/icons/icons8-conferencia-100.png'
  }

  return `<div class = 'eventOrg'>
  <div class = 'eventOrgCard'>
    <div>
      <h3>${event.name}</h3>
      <h4>${event.type}</h4>
      <h4 class= "verification ${validState.value}"> ${validState.text}</h4>
    </div>
    <div>
      <h4>${event.date.split('T')[0]}</h4>
      <p>${event.description}</p>
    </div>
      <img src =${event.eventImage}></img>
  </div>
  <h3>Users Attending:</h3>
  <div class = 'asistants'>
    ${usersCards}
  </div>
  </div>`
}

const asistContainer = (userlist) => {
  const userContainer = [
    `<div class= 'contTable userContHead'><p> Name:</p> <p> Email:</p></div>`
  ]
  userlist.forEach((user) => {
    const text = `<div class= 'contTable userCont'>
    <p>${user.name}</p>
    <p>${user.email}</p>
    </div>`
    userContainer.push(text)
  })
  return userContainer.join(' ')
}

const getEventsOrganized = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem('user')).token
    await fetch(
      'https://gestion-eventos-back-end.vercel.app/api/v1/events/organized/'.concat(
        userId
      ),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => res.json())
      .then((response) => {
        response.forEach((ele) => {
          eventList.push(ele)
        })
      })
  } catch {}
}
const getAsistants = async (eventID) => {
  try {
    let usersData = []
    const token = JSON.parse(localStorage.getItem('user')).token
    await fetch(
      'https://gestion-eventos-back-end.vercel.app/api/v1/attendees/event/'.concat(
        eventID
      ),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => res.json())
      .then((response) => {
        response.forEach((ele) => {
          usersData.push({
            name: ele.user.name,
            email: ele.user.email
          })
        })
      })
    return usersData
  } catch {
    return []
  }
}
const orgEventPage = async (userId) => {
  document.querySelector('#app-container').innerHTML = orgContainer()
  await orgEventsContainer(userId)
}
export default orgEventPage
