import './formInput.css'

// Ver como añadir un type list
// Añadir tambien los botones del form y darle formato distito a los otros

const formInputText = (id, name, required = false) => {
  return `<div class= "input-container">
      <input   type="text" id=${id} name=${name.toLowerCase()} 
      ${required ? 'required' : ''}/>
    <label  for=${name.toLowerCase()}>${name}:</label>
    </div>`
}
const formInputEmail = (id, name, required = false) => {
  return `<div class= "input-container">
      <input   type="email" id=${id} name=${name.toLowerCase()} 
      ${required ? 'required' : ''}/>
    <label  for=${name.toLowerCase()}>${name}:</label>
    </div>`
}
const formInputPassword = (id, name, required = false) => {
  return `<div class= "input-container">
  
    <input   type="password" id=${id} name=${name.toLowerCase()}  
    ${required ? 'required' : ''} 
    <label  for=${name.toLowerCase()}>${name}:</label>
    </div>`
}
//pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"/>
const formInputDate = (id, name, required = false) => {
  return `<div class= "input-container">
  
  <input type="date" id=${id} name=${name.toLowerCase()} placeholder=${name} 
  ${required ? 'required' : ''}/>
  <label for=${name.toLowerCase()}>${name}:</label>
  </div>`
}
const formInputFile = (id, name, required = false) => {
  return `<div class= "input-container">
  
  <input type="file" id=${id} name=${name.toLowerCase()} placeholder=${name} 
  ${required ? 'required' : ''} accept = 'image/png, image/jpeg'/>
  <label for=${name.toLowerCase()}>${name}:</label>
  </div>`
}
const formInput = {
  formInputText,
  formInputEmail,
  formInputPassword,
  formInputDate,
  formInputFile
}
export default formInput
