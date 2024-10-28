const server = 'https://gestion-eventos-back-end.vercel.app/'
// const server = 'http://localhost:3000/'
const api = 'api/v1/'
const backURL = (route) => {
  return server + api + route
}

export default backURL
