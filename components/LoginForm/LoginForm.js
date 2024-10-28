import './LogingForm.css'
import formInput from '../formInput/formInput'
import mainPage from '../mainMenu/mainMenu'
import messOut from '../messageOutput/messageOutput'
import loadingSpinner from '../loadingSpinner/loadingSpinner'
import backURL from '../../utils/fetchURL'

const loginLayOut = () => {
  return `
<form id="loginForm">
  <h2> Login </h2>
  ${formInput.formInputText('email', 'Email', true)}
  ${formInput.formInputPassword('password', 'Password', true)}
  ${formInput.formInputButton('loginSubmit', 'Login')}
</form>`
}

const loginSubmitFN = async (e) => {
  e.preventDefault() // Avoid the page to reload

  loadingSpinner.displayLoading()
  // When we click on the login
  const email = document.querySelector('#email').value.toLowerCase()
  const password = document.querySelector('#password').value
  try {
    // Hago la solicitud a la api para logearme
    const res = await fetch(backURL('users/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    loadingSpinner.hideLoading()
    if (res.status === 400) {
      messOut(await res.json(), 'warning')
    } else {
      // If no error in log - continue
      // Get the response from the petition to the server - > login
      const resData = await res.json()
      // save in the localStorage
      localStorage.setItem('user', JSON.stringify(resData))
      // Show a mesage that has been logged
      messOut({ message: `Welcome Back: ${email}` }, 'success')
      // Call the User Page
      mainPage()
    }
  } catch {
    messOut({ message: `Could not connect with the server` }, 'warning')
  }
}

const LoginForm = { loginLayOut, loginSubmitFN }

export default LoginForm
