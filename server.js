// importing express
// const { Socket } = require('engine.io');
const express = require('express');

// sets up our express -> express to allows us to create a server
const app = express();

// making a server using http and express
const server = require('http').Server(app);

// giving public folder to my express app 
app.use(express.static('public'));

// importing socket.io and linking it with server
const io = require('socket.io')(server);

io.on('connection',(socket)=>{
console.log('connection established',socket.id);
    socket.on('message',(data)=>{ // user is sending the message
        //  giving that message to io
        io.emit('message',data); // emitting this msg to all other socket   
    })
    socket.on('disconnect',()=>{
        console.log('user left the chat');
})

})

const PORT = 9000;
server.listen(PORT, ()=>{
    console.log(`server is run on PORT ${9000}`);
})
