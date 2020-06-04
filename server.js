const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const express = require('express')
const path = require('path')

const app = express()

const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

const publicDir = __dirname + '/public'

app.use(express.static(publicDir))

const SERVERPORT = 3000
app.get('/api/list-port', async (req, res) => {
  const portLists = []
  await SerialPort.list().then((ports) => {
    ports.forEach(function (port) {
      if (port.manufacturer) {
        portLists.push(port)
      }
    })
  })
  res.json(portLists)
})

io.on('connection', (socket) => {
  socket.on('connectPort', (portFromClient) => {
    const portSerial = new SerialPort(portFromClient, {
      baudRate: 9600,
      autoOpen: false,
    })
    const parser = new Readline()
    portSerial.pipe(parser)
    portSerial.open((err) => {
      parser.on('data', (line) => {
        socket.emit('fromSerial', line)
      })
      socket.on('controlButton', (rs) => {
        portSerial.write(rs)
      })
    })
  })
})

server.listen(SERVERPORT, () => {
  console.log(`Server is listen on port ${SERVERPORT}`)
})
