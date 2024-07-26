// New Event form page
import './newEvent.css'
import formInput from '../../components/formInput/formInput'

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
  return `<form class="newEventForm">
  <h2> Register </h2>
  ${formInput.formInputText('name', 'Name', true)}
  ${formInput.formInputSelect('type', 'Type', true, Options)}
  ${formInput.formInputDate('date', 'Date')}
  ${formInput.formInputText('description', 'Description', true)}
  ${formInput.formInputFile('eventImage', 'Event Image')}
  ${formInput.formInputButton('registerSubmit', 'Register')}
</form>`
}
const newEventRegistry = async (user) => {
  console.log(user)
  const registryJSON = {
    name: document.querySelector('#name').value,
    type: document.querySelector('#type').value,
    date: document.querySelector('#date').value,
    description: document.querySelector('#description').value,
    eventImage: document.querySelector('#eventImage').value,
    organizer: user._id
  }
  var form_data = new FormData()
  for (var key in registryJSON) {
    form_data.append(key, registryJSON[key])
  }
  //ERROR -- No puedo mandar con PartForm -  da error de boundary
  const token = JSON.parse(localStorage.getItem('user')).token
  await fetch(
    'https://gestion-eventos-back-end.vercel.app/api/v1/events/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(registryJSON)
    }
  ).then((res) => {
    if (res.status == 400) {
      console.log('Error Creating an Event FR-End')
      alert(`An error Happened`)
    } else if (res.status == 201) {
      alert(`Event Created - Administrator needs to validate`)
    } else {
      console.log(res.status)
    }
  })
}

const newEventPage = (user) => {
  document.querySelector('#app-container').innerHTML = newEvent()

  document.querySelector('#registerSubmit').addEventListener('click', (ev) => {
    ev.preventDefault() // Avoit the page to reload
    newEventRegistry(user)
  })
}

export default newEventPage
