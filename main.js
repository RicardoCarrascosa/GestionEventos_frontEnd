import './style.css'

import StartPage from './pages/startPages/startPage.js'
import mainPage from './pages/mainPage/mainPage.js'
import headerInfo from './components/header/header.js'
import footerInfo from './components/footer/footer.js'
//  Render the elements
document.querySelector('header').innerHTML = headerInfo()
document.querySelector('footer').innerHTML = footerInfo()
// If user is in localStorage
if (localStorage.getItem('user')) {
  mainPage()
} else {
  StartPage()
}
