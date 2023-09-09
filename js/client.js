const socket = io ('http://localhost:8000');

const from = document.getElementById('send-container');
const messageInput = document.getElementById('messaageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.create('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
if(position == 'left'){
    audio.play();
}
}

from.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('sent',message);
    messageInput.value = ' '
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

socket.on('user-joined', name =>{
append(`${name} jooined the chat`, 'right')
})

socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('leave', name =>{
    append(`${name}: left the chat`,'left')
})