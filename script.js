const wsUri = "wss://echo.websocket.org/";
const chat = document.querySelector('.chat');
const inputMessage = document.querySelector('.inputMessage');
const btnSend = document.querySelector('.send');
const btnGeo = document.querySelector('.geo');
let websocket;

document.addEventListener('DOMContentLoaded', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    console.log("Open")
  };
  websocket.onclose = function(evt) {
  };
  websocket.onmessage = function(evt) {
    writeToScreen(evt.data,true)
  };
  websocket.onerror = function(evt) {
  };
});

btnSend.addEventListener('click', () => {
  let message = document.querySelector('input').value;
  if (message == "") return;
  websocket.send(message);
  writeToScreen( message,false);
  document.querySelector('input').value = "";
});

function writeToScreen(message,isRecieved) {
  let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chat.innerHTML += messageHTML;
}


const error = () => {
  writeToScreen(message = 'Невозможно получить ваше местоположение');
}


const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  const mapLink = `<a  target="_blank" href = https://www.openstreetmap.org/#map=18/${latitude}/${longitude}>Гео-локация</a>`;
  writeToScreen(mapLink,false)
}

btnGeo.addEventListener('click', () => { 
  if (!navigator.geolocation) {
    console.log('Geolocation не поддерживается вашим браузером');
  } else {
    console.log('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(success, error);
  }
});