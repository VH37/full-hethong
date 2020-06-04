const socket = io()

const urlParams = new URLSearchParams(window.location.search)
const portParam = urlParams.get('port')

socket.emit('connectPort', portParam)

const buttonStart = document.getElementById('button-start')
const buttonPause = document.getElementById('button-pause')
const buttonReset = document.getElementById('button-reset')

const countShort = document.getElementById('count-short')
const countMedium = document.getElementById('count-medium')
const countTall = document.getElementById('count-tall')

const countTotal = document.getElementById('count-total')

const gifStart = document.getElementById('gif-start')
const gifPause = document.getElementById('gif-pause')

buttonStart.addEventListener('click', (e) => {
  socket.emit('controlButton', '1')
  gifPause.style.display = 'none'
  gifStart.style.display = 'block'
})

buttonPause.addEventListener('click', (e) => {
  socket.emit('controlButton', '0')
  gifStart.style.display = 'none'
  gifPause.style.display = 'block'
})

buttonReset.addEventListener('click', (e) => {
  socket.emit('controlButton', '2')
  countShort.innerHTML = 0
  countMedium.innerHTML = 0
  countTall.innerHTML = 0
  countTotal.innerHTML = 0
})

socket.on('fromSerial', (line) => {
  let trimLine = line.trim()
  if (trimLine === 's') {
    let currentValue = Number(countShort.textContent)
    currentValue += 1
    countShort.innerHTML = currentValue
    setTotalValue()
  } else if (trimLine === 'm') {
    let currentValue = Number(countMedium.textContent)
    currentValue += 1
    countMedium.innerHTML = currentValue
    setTotalValue()
  } else if (trimLine === 't') {
    let currentValue = Number(countTall.textContent)
    currentValue += 1
    countTall.innerHTML = currentValue
    setTotalValue()
  }
})

function getTotalValue() {
  let currentShortValue = Number(countShort.textContent)
  let currentMediumValue = Number(countMedium.textContent)
  let currentTallValue = Number(countTall.textContent)
  return (currentShortValue + currentMediumValue + currentTallValue -1)
}

function setTotalValue () {
  let currentValue = getTotalValue()
  currentValue += 1
  countTotal.innerHTML = currentValue
}