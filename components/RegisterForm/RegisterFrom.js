import './RegisterForm.css'
import formInput from '../formInput/formInput'
import LoginForm from '../LoginForm/LoginForm'

import messOut from '../messageOutput/messageOutput'
import loadingSpinner from '../loadingSpinner/loadingSpinner'
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
  e.preventDefault() // Avoit the page to reload
  loadingSpinner.displayLoading()
  // const registerQuery = {
  //   name: document.querySelector('#regname').value,
  //   email: document.querySelector('#regemail').value.toLowerCase(),
  //   password: document.querySelector('#regpassword').value,
  //   birthday: document.querySelector('#regbirthday').value,
  //   profileImage: document.querySelector('#regprofileImage').value
  // }
  console.log(e.target)
  const [
    emailInput,
    passwordInput,
    nameInput,
    birthdayInput,
    profileImageFile
  ] = e.target
  console.log(profileImageFile.files)
  const body = new FormData()
  body.append('name', nameInput.value)
  body.append('email', emailInput.value.toLowerCase())
  body.append('password', passwordInput.value)
  body.append('birthday', birthdayInput.value)
  console.log(body)
  body.append('profileImage', profileImageFile.files[0])
  console.log(body)
  const res = await fetch(
    'https://gestion-eventos-back-end.vercel.app/api/v1/users/register',
    {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify(registerQuery)
      body: body
    }
  )
  const response = await res.json()
  loadingSpinner.hideLoading()
  if (res.status == 422) {
    messOut(response, 'warning')
  } else if (res.status == 400) {
    messOut(response, 'warning')
  } else {
    document.querySelector('#app-container').innerHTML = LoginForm.loginLayOut()
  }
}
const RegisterForm = { registerLayOut, registerSubmitFN }
export default RegisterForm
