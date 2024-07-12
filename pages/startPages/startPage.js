import './startPage.css'
import mainPage from '../mainPage/mainPage'
const startPage = `
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

const loginDiv = `
<form class="loginForm">
  <label> Login </label>
  <input type="text" id="email" name="email" placeholder="Email">
  <input type="password" id="password" name="pasword" placeholder="password">
  <button id= loginSubmit class= 'formSubmit btnStartPage'>Login</button>
</form>`

const registerDiv = `
<form class="registerForm">
  <label> Register </label>
  <label for="email">Email:</label>
  <input type="text" id="regemail" name="email" placeholder="Email" required>
  <label for="password">Password:</label>
  <input type="password" id="regpassword" name="pasword" placeholder="password" required>
  <label for="name">Name:</label>
  <input type="text" id="regname" name="name" placeholder="Name" required>
  <label for="birthday">Birthday:</label>
  <input type="date" id="regbirthday" name="birthday">
  <label for="profileImage"> Profile Image:</label>
  <input type="file" id="regprofileImage" name="profileImage" accept="image/png, image/jpeg" />
  <button id= registerSubmit class= 'formSubmit btnStartPage'>Register</button>
</form>`

const loginSubmitFN = async () => {
  // When we click on the login
  const email = document.querySelector('#email').value.toLowerCase()
  const password = document.querySelector('#password').value
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

const registerSubmitFN = async () => {
  const registerQuery = {
    name: document.querySelector('#regname').value,
    email: document.querySelector('#regemail').value.toLowerCase(),
    password: document.querySelector('#regpassword').value,
    birthday: document.querySelector('#regbirthday').value,
    profileImage: document.querySelector('#regprofileImage').value
  }
  // console.log(registerQuery)
  const res = await fetch('http://localhost:3000/api/v1/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerQuery)
  })

  if (res.status == 400) {
    const msg = document.querySelector('.msg')
    msg.textContent = 'ups something happened'
  } else {
    document.querySelector('.forms').innerHTML = loginDiv
  }
}
// Main Function for this login
const Login = () => {
  document.querySelector('#app').innerHTML = startPage
  document.querySelector('.forms').innerHTML = loginDiv

  // Add the Event Listeners
  // Submit Button
  document.querySelector('#loginSubmit').addEventListener('click', (ev) => {
    ev.preventDefault() // Avoit the page to reload
    loginSubmitFN() // Calls the function to ask the API
  })
  // Register Button

  document.querySelector('#registerBtn').addEventListener('click', (ev) => {
    // ev.preventDefault() // Avoit the page to reload
    document.querySelector('.forms').innerHTML = registerDiv

    document
      .querySelector('#registerSubmit')
      .addEventListener('click', (ev) => {
        ev.preventDefault() // Avoit the page to reload
        console.log('butttonnnn')
        registerSubmitFN()
      })
  })

  // Login Button
  document.querySelector('#loginBtn').addEventListener('click', (ev) => {
    // ev.preventDefault() // Avoit the page to reload
    document.querySelector('.forms').innerHTML = loginDiv
  })
}

export default Login
