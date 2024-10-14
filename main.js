import './style.css'

import createHeader from './components/header/header.js'
import createFooter from './components/footer/footer.js'

const mainLayout = () => {
  return `
  <div id='header-container'></div>
  <div id='app-container'></div>
  <div id='footer-container'></div>
  <div id='alerts-container'></div>
  `
}

document.querySelector('#app').innerHTML = mainLayout()
createHeader()
createFooter()
