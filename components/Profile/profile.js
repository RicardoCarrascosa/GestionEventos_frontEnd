import './profile.css'

const profileLayout = (user) => {
  return `
    <h2> Contact Information </h2>
    <div class= 'profile'>
      <img src= ${
        user.image
          ? user.image
          : '/assets/icons/icons8-gestión-de-clientes-100.png'
      } alt=${user.name}>
      <div>
        <h3 class=${user.rol}>${user.rol}</h3>
        <h2>${user.name}</h2>
        <h2>${user.email}</h2>
        <p>${user.birthday.split('T')[0]}</p>
      </div>
    </div>
  `
}

const profile = (user) => {
  // console.log(user)
  document.querySelector('#app-container').innerHTML = profileLayout(user)
}

export default profile
