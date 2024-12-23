import './RegisterForm.css'
import formInput from '../formInput/formInput'
import LoginForm from '../LoginForm/LoginForm'

import messOut from '../messageOutput/messageOutput'
import loadingSpinner from '../loadingSpinner/loadingSpinner'
import fetchAPI from '../../utils/fetchAPI'
// Hacer un check de lo que entra antes de lanzarlo a api
const registerLayOut = () => {
  return `
  <form id="registerForm">
  <h2> Register </h2>
  ${formInput.formInputEmail('regemail', 'Email', true)}
  ${formInput.formInputPassword('regpassword', 'Password', true)}
  ${formInput.formInputText('regname', 'Name', true)}
  ${formInput.formInputDate('regbirthday', 'Birthday')}
  ${formInput.formInputFile('regprofileImage', 'Profile Image')}
  ${formInput.formInputButton('registerSubmit', 'Register')}
  </form>`
}

const registerSubmitFN = async (e) => {
  e.preventDefault() // Avoid the page to reload
  loadingSpinner.displayLoading()

  const [
    emailInput,
    passwordInput,
    nameInput,
    birthdayInput,
    profileImageFile
  ] = e.target

  const body = new FormData()
  body.append('name', nameInput.value)
  body.append('email', emailInput.value.toLowerCase())
  body.append('password', passwordInput.value)
  body.append('birthday', birthdayInput.value)
  body.append('profileImage', profileImageFile.files[0])
  // try {
  // const res = await fetch(backURL('users/register'), {
  //   method: 'POST',
  //   body: body
  // })
  const res = await fetchAPI('users/register', 'POST', '', body, true)
  const response = await res.json()
  if (response.status == 'error') {
    loadingSpinner.hideLoading()
    messOut(response, 'warning')
  } else {
    loadingSpinner.hideLoading()
    messOut({ message: 'Registered sucesfully' }, 'success')
    document.querySelector('#loginBtn').click()
    // document.querySelector('#app-container').innerHTML =
    //   LoginForm.loginLayOut()
  }
  // } catch {
  //   loadingSpinner.hideLoading()
  //   messOut({ message: `Could not connect with the server` }, 'warning')
  // }
}
const RegisterForm = { registerLayOut, registerSubmitFN }
export default RegisterForm
