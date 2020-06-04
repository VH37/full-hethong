const URL = 'http://127.0.0.1:3000/api/list-port'
let portsList = []

let dropdown = document.getElementById('list-port')
dropdown.length = 0
let defaultOption = document.createElement('option')

defaultOption.text = 'Choose port to connect'

dropdown.appendChild(defaultOption)
dropdown.selectIndex = 0

fetch(URL)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    portsList = data
    let option
    data.map((port) => {
      option = document.createElement('option')
      option.text = port.path
      dropdown.appendChild(option)
    })
  })
  .catch((err) => {
    console.log(err)
  })

const formSelectPort = document.getElementById('form-select-port')
formSelectPort.addEventListener('submit', (e) => {
  e.preventDefault()
  window.location.href = `/connect.html?port=${dropdown.value}`
})
