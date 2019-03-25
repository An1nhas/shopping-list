//make connection
var socket = io.connect('http://localhost:4000');


//query DOM
let item = document.getElementById('item');
let name = document.getElementById('name');
let btn = document.getElementById('add');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');


//emit events
btn.addEventListener('click', ()=>{
    socket.emit('chat', {
        id: Math.random()*1000,
        item: item.value,
        name: name.value,
    })
})

item.addEventListener('keyup', (event) => {
    if(event.keyCode === 13){
        event.preventDefault();
        btn.click();
    }
});


item.addEventListener('keypress', () =>{
    socket.emit('typing', name.value);
});

output.addEventListener('click', (e) =>{
    socket.emit('remove', {
        id: e.target.id
    });
    //document.getElementById(e.target.id).style["text-decoration"] = "line-through";
    
})




//listen events
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    item.value = '';
    output.innerHTML += `<p id=${data.id}><strong>` + data.name + ': </strong>' + data.item + '</p>' ;
});


socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});


socket.on('remove', (data)=>{
    console.log(data)
   document.getElementById(data.id).style["text-decoration"] = "line-through";
})
