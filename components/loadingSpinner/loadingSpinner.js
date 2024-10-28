import './loadingSpinner.css'
// showing loading
const displayLoading = () => {
  const alertContainer = document.querySelector('#alerts-container')
  const loader = document.createElement('div')
  loader.classList.add('loading')
  alertContainer.appendChild(loader)
  // to stop loading after some time
  setTimeout(() => {
    hideLoading()
  }, 30000)
}

// hiding loading
const hideLoading = () => {
  console.log('hidingLoading')
  const alertContainer = document.querySelector('#alerts-container')
  if (alertContainer.childElementCount > 0) {
    for (let index = 0; index < alertContainer.childElementCount; index++) {
      console.log('hide: ' + index)
      alertContainer.removeChild(alertContainer.firstChild)
    }
  }
}
const loadingSpinner = { displayLoading, hideLoading }
export default loadingSpinner
