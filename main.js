import './style.css'

import Login from './pages/startPages/startPage.js'
import mainPage from './pages/mainPage/mainPage.js'

//  Render the elements

// If user is in localStorage
if (localStorage.getItem('user')) {
  mainPage()
} else {
  Login()
}
