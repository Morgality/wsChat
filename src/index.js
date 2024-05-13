import { WebSocketServer } from "ws";
import fs, { readFileSync } from 'fs';

const wss = new WebSocketServer({port: 8080});

const startMessage = {
    text : 'Hello',
    user : 'Server',
    id : crypto.randomUUID(),
    date : new Date()
}

const file = readFileSync('story.txt');
let file1 = new TextDecoder().decode(file).split('\n')

wss.on('connection', (ws) => {

    file1.forEach(item => {
        if (item.trim().length > 0) ws.send(item)
    })    

    // ws.send(JSON.stringify(startMessage))

    ws.send()
    
    ws.on('message', (data) => {

        const messsage = JSON.parse(new TextDecoder().decode(data))

        console.log(messsage)

        fs.appendFileSync('story.txt', JSON.stringify(messsage) + '\n')

        wss.clients.forEach(client => {
            client.send(JSON.stringify({
                text : messsage.text,
                user : messsage.user.trim().length ? messsage.user : 'Anonim',
                id : crypto.randomUUID(),
                date : new Date()
            }))
        })

        console.log(ws)

    })

    ws.on('close', () => {
        console.log(`User disconnected ${new Date()}`)
    })
})

console.log('Server started')

