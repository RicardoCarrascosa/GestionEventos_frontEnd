import './startMenu.css'

import RegisterForm from '../RegisterForm/RegisterFrom.js'
import LoginForm from '../LoginForm/LoginForm.js'

const startMenuLayOut = () => {
  return `
  <div class= startMenuHeader>
  <button id= registerBtn class ='btnStartMenu'>Register</button>
  <button id = loginBtn class ='btnStartMenu btnMenuSelected'>Login</button>
  </div>`
}
// <div class= " startPagebtn-grp"> // </div>
// Main Function for this login
const StartMenu = () => {
  document.querySelector('#headerNav').innerHTML = startMenuLayOut()
  document.querySelector('#app-container').innerHTML = LoginForm.loginLayOut()

  // Add the Event Listeners
  // Login Button
  document.querySelector('#loginBtn').addEventListener('click', (ev) => {
    // ev.preventDefault() // Avoit the page to reload
    document.querySelector('#app-container').innerHTML = LoginForm.loginLayOut()
    document.querySelector('#loginBtn').classList.add('btnMenuSelected')
    document.querySelector('#registerBtn').classList.remove('btnMenuSelected')
  })
  // Submit Button
  document.querySelector('#loginSubmit').addEventListener('click', (ev) => {
    ev.preventDefault() // Avoit the page to reload
    LoginForm.loginSubmitFN() // Calls the function to ask the API
  })

  // Register Button

  document.querySelector('#registerBtn').addEventListener('click', (ev) => {
    // ev.preventDefault() // Avoit the page to reload
    document.querySelector('#registerBtn').classList.add('btnMenuSelected')
    document.querySelector('#loginBtn').classList.remove('btnMenuSelected')
    document.querySelector('#app-container').innerHTML =
      RegisterForm.registerLayOut()
    document
      .querySelector('#registerSubmit')
      .addEventListener('click', (ev) => {
        ev.preventDefault() // Avoit the page to reload
        RegisterForm.registerSubmitFN()
      })
  })
}

export default StartMenu
