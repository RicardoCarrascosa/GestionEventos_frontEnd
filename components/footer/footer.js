import './footer.css'
// Hacer footer proper, about, contact, insta linkedin, ....
const footerLayout = () => {
  return `
<div class='footer-contact'>
  <h4>Contact us:</h4>
    <div>
      <img class= 'footer-icon' src='./assets/icons/icons8-nuevo-post-48.png' alt='Email' />
      <p>thisEmail@email.com</p>
    </div>
    <div>
      <img class= 'footer-icon' src='./assets/icons/icons8-teléfono-desconectado-48.png' alt='Phone' />
      <p>+34 952123456</p>
    </div>
    <div>
      <img class= 'footer-icon' src='./assets/icons/icons8-dirección-48.png' alt='Address' />
      <p>Málaga</p>
    </div>
  </div>
</div>
<div class='footer-follow'>
  <h4>Follow us:</h4>
  <div>
  <img class= 'footer-icon' src='./assets/icons/icons8-instagram-48.png' alt='Instagram' ><a href='#'></a></img>
  <img class= 'footer-icon' src='./assets/icons/icons8-twitter-48.png' alt='Instagram' ><a href='#'></a></img>
  <img class= 'footer-icon' src='./assets/icons/icons8-youtube-48.png' alt='Instagram' ><a href='#'></a></img>
  <img class= 'footer-icon' src='./assets/icons/icons8-linkedin-50.png' alt='LinkedIn' ><a href='#'></a></img>
  </div>
</div>
<div class='footer-extra'>
  <h4>About Us:</h4>
  <p>We host and organize all kind of events in Malaga</p>

</div>`
}

const createFooter = () => {
  document.querySelector('#footer-container').innerHTML = footerLayout()
}

export default createFooter
