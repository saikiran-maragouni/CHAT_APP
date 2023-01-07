// const socket = io('http://localhost:8000');
const socket = io('http://localhost:8000',{transports:['websocket']});

const form = document.getElementById('send-container')
const messageInput = document.getElementById('msg-Inp')
const messageContainer = document.querySelector(".container")


const append = (message , pos)=>{
    const msgEle = document.createElement('div');
    msgEle.innerText = message;
    msgEle.classList.add('msg');
    msgEle.classList.add(pos);
    messageContainer.append(msgEle);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault(); // page will not load.
    const message = messageInput.value;
    append('you :'+message+'','right');
    socket.emit('send', message);
    messageInput.value='';
})

const name = prompt("Enter your name to join LetsChat");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
    append( name+' joined the chat','right');
});

socket.on('receive',data=>{
    append( data.name+' : '+data.message+'','left');
});

socket.on('leave',name=>{
    append(name+' left the chat','left');
});
