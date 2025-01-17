import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080});

wss.on('connection', (ws) => {
    
    ws.on('error', console.error)

    console.log('WS server started')

    ws.on('message', (data) => {
        console.log(data)
    })

    ws.send('Connected')
})