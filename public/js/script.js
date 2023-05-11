import rive  from './rive.js';

let socket = io();

const emojiBtn = document.querySelector(".textInput--emojiBtn");
const emojiOverlay = document.querySelector(".emojiOverlay");
const emojiCanvas = document.querySelector("#canvas-emoji");

const inputNeutral = document.querySelector("#emoji-neutral");
const inputHappy = document.querySelector("#emoji-happy");
const inputAngry = document.querySelector("#emoji-angry");

const eyebrowsSlider = document.querySelector(".eyebrowsSlider");
const mouthSlider = document.querySelector(".mouthSlider");
const colorSlider = document.querySelector(".colorSlider");

const confirmEmojiBtn = document.querySelector(".emojiOverlay--confirmBtn");

emojiBtn.addEventListener("click", () => {
    if(emojiOverlay.classList.contains("hidden")){
        emojiOverlay.classList.remove("hidden");
        rive.riveAnimEmoji(emojiCanvas, eyebrowsSlider, mouthSlider, colorSlider, inputNeutral, inputHappy, inputAngry);
        // camera.handleCamera(socket);
    }else {
        emojiOverlay.classList.add("hidden");
        // camera.closeCamera(socket);
    }

});


confirmEmojiBtn.addEventListener("click", () => {
    emojiOverlay.classList.add("hidden");
    const chat = document.querySelector(".chat");

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(emojiCanvas, 0, 0, canvas.width, canvas.height);

    const newImg = document.createElement("img");
    newImg.src = canvas.toDataURL('image/png');
    const li = document.createElement("li");
    li.classList.add("sendImage")
    li.appendChild(newImg)

    chat.appendChild(li)
})

let messages = document.querySelector(".chat");
let input = document.querySelector(".chatInput");
const chatForm = document.querySelector(".textInput")

/* -------------- chat -------------- */

if (chatForm){

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value) {
        const message = input.value;
        const senderId = socket.id;
        socket.emit("chatMessage", { message, senderId });
        input.value = "";
      }
    });

    socket.on('image', (data) => {
        // append recieved image to DOM
        const listItem = document.createElement("li");
        const img = document.createElement('img');
        console.log(data)
        console.log("image received on client")
        img.src = data.data
        listItem.appendChild(img)
        messages.appendChild(
            // create a new li element
            Object.assign(listItem)
        );
    })
    
    socket.on("chatMessage", (data) => {
        console.log(data)
        const { message, username, senderId } = data;
        
        const isFromSelf = senderId === socket.id;
        
        console.log(message, username)
        // add the message to the DOM
        const listItem = document.createElement("li");

        if(!isFromSelf){
            const userTitle = document.createElement("p");
            userTitle.textContent = username;

            listItem.appendChild(userTitle);

            listItem.classList.add("receivedText");
        }else {
            listItem.classList.add("sentText");

        }

        const userMessage = document.createElement("p");
        userMessage.textContent = message;

        listItem.appendChild(userMessage);


        messages.appendChild(
        // create a new li element
        Object.assign(listItem)
        );

        messages.scrollTop = messages.scrollHeight;
    });
}
