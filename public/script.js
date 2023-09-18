const socket = io(); 

let username = "";

document.getElementById('join-btn').addEventListener('click',(event)=>{
    event.preventDefault();
    username = document.getElementById("username-input").value;
    if(username.trim()!=""){
        document.querySelector(".form-username").style.display='none';
        document.querySelector(".chatroom-container").style.display='block';
        document.querySelector('.chatroom-header').innerHTML = `Chatroom - ${username}`;
    }
})

document.getElementById('send-btn').addEventListener('click',(event)=>{
    event.preventDefault();
    const data = {
        username: username,
        message: (document.getElementById('message-input').value).trim(),
    }
    // emitting with msg event
    socket.emit('message',data);
    addMessage(data,true); // true-> sent
})

// reciving the message

socket.on('message',(data)=>{
    if(data.username !== username){
        addMessage(data,false);
    }
})

// this function is just for appending messige

function addMessage(data, check){
    // check true=> for sent
    // check false=> for recived
    var msgDiv = document.createElement('div');
    msgDiv.innerText = `${data.username}: ${data.message}`;
    if(check){
        msgDiv.setAttribute('class','message sent');
    }else{
        msgDiv.setAttribute('class','message recieved');
    }

    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value="";
}