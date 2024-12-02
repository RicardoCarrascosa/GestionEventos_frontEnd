const server = 'https://gestion-eventos-back-end.vercel.app/'
// const server = 'http://localhost:3000/'
const api = 'api/v1/'
const backURL = () => {
  return server + api
}
const fetchAPI = async (url, method, token = '', body, multer = false) => {
  let headers = {}
  if (token && multer) {
    headers = {
      Authorization: `Bearer ${token}`
    }
  } else if (token) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  } else if (multer) {
    headers = {}
  } else {
    headers = { 'Content-Type': 'application/json' }
  }

  return await fetch(backURL().concat(url), {
    method: method,
    headers: headers,
    body: body
  })
}
export default fetchAPI
