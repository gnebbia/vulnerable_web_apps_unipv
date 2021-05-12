const net = require('net')



const request = `
GET / HTTP/1.1
Host: example.com

`.slice(1)

const socket = net.createConnection({
    host: '93.184.216.34',
    port: 80
})


console.log(request)
socket.write(request)
socket.pipe(process.stdout)

