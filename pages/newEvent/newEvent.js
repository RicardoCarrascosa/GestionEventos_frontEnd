// New Event form page
import './newEvent.css'
import formInput from '../../components/formInput/formInput'
import messOut from '../../components/messageOutput/messageOutput.js'
import loadingSpinner from '../../components/loadingSpinner/loadingSpinner.js'
import backURL from '../../utils/fetchURL.js'

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
  try {
    await fetch(backURL('events/register'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: body
    })
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
  } catch {
    loadingSpinner.hideLoading()
    messOut({ message: `Could not connect with the server` }, 'warning')
  }
}

const newEventPage = (user) => {
  document.querySelector('#app-container').innerHTML = newEvent()

  document.querySelector('#newEventForm').addEventListener('submit', (ev) => {
    newEventRegistry(ev, user)
  })
}

export default newEventPage
