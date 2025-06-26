const express = require('express')
const app = express();

const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 3001;

let increment = 0;

app.ws('/', (ws, req) => {
    console.log('Connected ws')
    ws.send(JSON.stringify({username: 'Server', message: 'You successfully connected', date: new Date().getTime()}));

    ws.on('message', msg => {
        const msgObj = JSON.parse(msg)

        switch (msgObj.method) {
            case 'connection':
                console.log('connection:')
                ws.id = msgObj.user.id;
                console.log({msgObj, clients: aWss.clients})
                aWss.clients.forEach(client => client.send(msg))
                break;
            case 'message':
                console.log('message case:')
                // ws.send(msg)
                aWss.clients.forEach(client => client.send(msg))
                break;
        }
    })
})

app.listen(PORT, () => console.log(`Server started on http://localhost${PORT}`))

function connectionHandler(ws, msg) {
    ws.id = ++increment;

    console.log('connectionHandler', increment)
}

function broadcastConnection(ws, msg) {
    aWss.clients.forEach(client => {
        // if (client.id === msg.id)
        console.log(111, {client})
    })
}
