// New Event form page
import './newEvent.css'
import formInput from '../../components/formInput/formInput'
import messOut from '../../components/messageOutput/messageOutput.js'
import loadingSpinner from '../../components/loadingSpinner/loadingSpinner.js'
// Hacer un check de lo que entra antes de lanzarlo a api

// const newEvent = () => {
//   return `<form class="newEventForm">
//   <label> Register </label>
//   <label for="name">Name:</label>
//   <input type="text" id="name" name="name" placeholder="Name" required>
//   <label for="type">Type:</label>
//   <select id="type" name="type" required>
//   <option value = "Training Seminar"> Training Seminar</option>
//   <option value = "WorkShop"> WorkShop</option>
//   <option value = "Festival"> Festival</option>
//   <option value = "Retreats"> Retreats</option>
//   <option value = "Expos"> Expos</option>
//   <option value = "Turnament"> Turnament</option>
//   <option value = "AfterWork"> AfterWork</option>
//    <option value = "Convention"> Convention</option>
//   <option value = "Congress"> Congress</option>
//   </select>
//   <label for="date">Date:</label>
//   <input type="date" id="date" name="date">
//   <label for="description">Description:</label>
//   <input type="text" id="description" name="description" placeholder="Description" required>
//   <label for="eventImage"> Event Image:</label>
//   <input type="file" id="eventImage" name="eventImage" accept="image/png, image/jpeg" />
//   <button id= registerSubmit class= 'formSubmit btnStartPage'>Register</button>
// </form>`
// }

const newEvent = () => {
  const Options = [
    'Training Seminar',
    'WorkShop',
    'Festival',
    'Retreats',
    'Expos',
    'Turnament',
    'AfterWork',
    'Convention',
    'Congress'
  ]
  return `<form id="newEventForm">
  <h2> Register </h2>
  ${formInput.formInputText('name', 'Name', true)}
  ${formInput.formInputSelect('type', 'Type', true, Options)}
  ${formInput.formInputDate('date', 'Date')}
  ${formInput.formInputText('description', 'Description', true)}
  ${formInput.formInputFile('eventImage', 'Event Image')}
  ${formInput.formInputButton('registerSubmit', 'Register')}
</form>`
}
const newEventRegistry = async (ev, user) => {
  loadingSpinner.displayLoading()
  ev.preventDefault() // Avoit the page to reloada
  const [name, type, date, description, eventImage] = ev.target

  const body = new FormData()
  body.append('name', name.value)
  body.append('type', type.value)
  body.append('date', date.value)
  body.append('description', description.value)
  body.append('eventImage', eventImage.files[0])
  body.append('organizer', user._id)

  const token = JSON.parse(localStorage.getItem('user')).token

  await fetch(
    'https://gestion-eventos-back-end.vercel.app/api/v1/events/register',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: body
    }
  )
    .then((res) => res.json())
    .then((response) => {
      loadingSpinner.hideLoading()

      if (response.status == 'error') {
        messOut(response, 'warning')
      } else if (response.status == 'success') {
        messOut(response, 'success')
      } else {
        console.log(res.status)
      }
    })
}

const newEventPage = (user) => {
  document.querySelector('#app-container').innerHTML = newEvent()

  document.querySelector('#newEventForm').addEventListener('submit', (ev) => {
    newEventRegistry(ev, user)
  })
}

export default newEventPage
