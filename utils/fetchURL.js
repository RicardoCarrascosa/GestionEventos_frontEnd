const server = 'https://gestion-eventos-back-end.vercel.app/'
const api = 'api/v1/'
const backURL = (route) => {
  return server + api + route
}

export default backURL
