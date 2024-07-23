import './startPage.css'
import mainPage from '../mainPage/mainPage'

import RegisterForm from '../../components/RegisterForm/RegisterFrom.js'
import LoginForm from '../../components/LoginForm/LoginForm.js'

const startPageLayOut = () => {
  return `
<div id = "startPage"> 

<div class= "btn-grp">
  <button id= registerBtn class ='btnStartPage'>Register</button>
  <button id = loginBtn class ='btnStartPage'>Login</button>
</div>
<div class="forms">
</div>

<p class="msg"></p>
</div>
`
}

// Main Function for this login
const StartPage = () => {
  document.querySelector('#app').innerHTML = startPageLayOut()
  document.querySelector('.forms').innerHTML = LoginForm.loginLayOut()

  // Add the Event Listeners
  // Submit Button
  document.querySelector('#loginSubmit').addEventListener('click', (ev) => {
    ev.preventDefault() // Avoit the page to reload
    LoginForm.loginSubmitFN() // Calls the function to ask the API
  })
  // Register Button

  document.querySelector('#registerBtn').addEventListener('click', (ev) => {
    // ev.preventDefault() // Avoit the page to reload
    document.querySelector('.forms').innerHTML = RegisterForm.registerLayOut()

    document
      .querySelector('#registerSubmit')
      .addEventListener('click', (ev) => {
        ev.preventDefault() // Avoit the page to reload
        RegisterForm.registerSubmitFN()
      })
  })

  // Login Button
  document.querySelector('#loginBtn').addEventListener('click', (ev) => {
    // ev.preventDefault() // Avoit the page to reload
    document.querySelector('.forms').innerHTML = LoginForm.loginLayOut()
  })
}

export default StartPage
