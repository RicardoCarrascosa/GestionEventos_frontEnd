import './RegisterForm.css'
import formInput from '../formInput/formInput'
// Hacer un check de lo que entra antes de lanzarlo a api
const registerLayOut = () => {
  return `
  <form class="registerForm">
  <h2> Register </h2>
  ${formInput.formInputEmail('regemail', 'Email', true)}
  ${formInput.formInputPassword('regpassword', 'Password', true)}
  ${formInput.formInputText('regname', 'Name', true)}
  ${formInput.formInputDate('regbirthday', 'Birthday')}
  ${formInput.formInputFile('regprofileImage', 'Profile Image')}
  ${formInput.formInputButton('registerSubmit', 'Register')}
  </form>`
}

const registerSubmitFN = async () => {
  const registerQuery = {
    name: document.querySelector('#regname').value,
    email: document.querySelector('#regemail').value.toLowerCase(),
    password: document.querySelector('#regpassword').value,
    birthday: document.querySelector('#regbirthday').value,
    profileImage: document.querySelector('#regprofileImage').value
  }
  // console.log(registerQuery)
  const res = await fetch(
    'https://gestion-eventos-back-end.vercel.app/api/v1/users/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerQuery)
    }
  )

  if (res.status == 400) {
    const msg = document.querySelector('.msg')
    msg.textContent = 'ups something happened'
  } else {
    document.querySelector('.forms').innerHTML = loginDiv
  }
}
const RegisterForm = { registerLayOut, registerSubmitFN }
export default RegisterForm
