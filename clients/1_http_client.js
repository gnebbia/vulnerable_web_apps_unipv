const dns = require('dns')
const net = require('net')


const uri = process.argv[2] || "localhost"

const request = `
GET / HTTP/1.1
Host: ${uri}

`.slice(1)

function http_request(err, address){
    if (err) throw err

    const socket = net.createConnection({
        host: address,
        port: 80
    })

    socket.write(request)
    socket.pipe(process.stdout)
}


dns.lookup(uri, http_request);
