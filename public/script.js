// const socket = io(); 

// let username = "";

// document.getElementById('join-btn').addEventListener('click',(event)=>{
//     event.preventDefault();
//     username = document.getElementById("username-input").value;
//     if(username.trim()!=""){
//         document.querySelector(".form-username").style.display='none';
//         document.querySelector(".chatroom-container").style.display='block';
//         // document.querySelector('.chatroom-header').innerHTML = `Chatroom - ${username}`;
//         document.querySelector('.userNameForHeader').innerHTML = `${username}`;
//         // document.querySelector('.chatroomIcon').innerHTML = ` Chatroom`;
//     }
// })

// document.getElementById('send-btn').addEventListener('click',(event)=>{
//     event.preventDefault();
//     const data = {
//         username: username,
//         message: (document.getElementById('message-input').value).trim(),
//     }
//     // emitting with msg event
//     socket.emit('message',data);
//     addMessage(data,true); // true-> sent
// })

// // reciving the message

// socket.on('message',(data)=>{
//     if(data.username !== username){
//         addMessage(data,false);
//     }
// })

// // this function is just for appending messige

// function addMessage(data, check){
//     // check true=> for sent
//     // check false=> for recived
//     var msgDiv = document.createElement('div');
//     msgDiv.innerText = `${data.username}: ${data.message}`;
//     if(check){
//         msgDiv.setAttribute('class','message-sent');
//     }else{
//         msgDiv.setAttribute('class','message-received');
//     }

//     document.getElementById('message-container').appendChild(msgDiv);
//     document.getElementById('message-input').value="";
// }



const socket = io();
let username = "";

// User joins chat
document.getElementById('join-btn').addEventListener('click', (event) => {
    event.preventDefault();
    username = document.getElementById("username-input").value.trim();

    if (username !== "") {
        document.querySelector(".form-username").style.display = 'none';
        document.querySelector(".chatroom-container").style.display = 'block';
        document.querySelector('.userNameForHeader').innerText = username;
    }
});

// Sending message
document.getElementById('send-btn').addEventListener('click', (event) => {
    event.preventDefault();
    
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        const data = { username, message: messageText };

        // Emit message to the server
        socket.emit('message', data);

        // Display sent message
        addMessage(data, true);

        // Clear input field
        messageInput.value = "";
    }
});

// Receiving message from server
socket.on('message', (data) => {
    if (data.username !== username) {
        addMessage(data, false);
    }
});

// Function to append messages in chat
function addMessage(data, isSent) {
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    msgDiv.classList.add(isSent ? 'message-sent' : 'message-received');

    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-container').scrollTop = document.getElementById('message-container').scrollHeight;
}
