import './LogingForm.css'
import formInput from '../formInput/formInput'
import mainPage from '../../pages/mainPage/mainPage'
const loginLayOut = () => {
  return `
<form class="loginForm">
  <h2> Login </h2>
  ${formInput.formInputText('email', 'Email', true)}
  ${formInput.formInputPassword('password', 'Password', true)}
  <button id= loginSubmit class= 'formSubmit btnStartPage btn-login'>Login</button>
</form>`
}

const loginSubmitFN = async () => {
  // When we click on the login
  const email = document.querySelector('#email').value.toLowerCase()
  const password = document.querySelector('#password').value

  console.log(email, password)
  // Hago la solicitud a la api para logearme
  const res = await fetch('http://localhost:3000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  if (res.status === 400) {
    // Its an error
    const msg = document.querySelector('.msg')
    msg.textContent = await res.json()
  } else {
    // If no error in log - continue
    // Get the response from the petition to the server - > login
    const resData = await res.json()
    // save in the localStorage
    localStorage.setItem('user', JSON.stringify(resData))
    // Show a mesage that has been logged
    alert(`Welcome Back: ${email}`)
    // Call the User Page
    mainPage()
  }
}

const LoginForm = { loginLayOut, loginSubmitFN }

export default LoginForm
