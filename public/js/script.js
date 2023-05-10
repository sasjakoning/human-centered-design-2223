import camera from "./camera.js";

let socket = io();

const emojiBtn = document.querySelector(".textInput--emojiBtn");
const cameraOverlay = document.querySelector(".cameraOverlay");

emojiBtn.addEventListener("click", () => {
    if(cameraOverlay.classList.contains("hidden")){
        cameraOverlay.classList.remove("hidden");
        camera.handleCamera(socket);
    }else {
        cameraOverlay.classList.add("hidden");
        camera.closeCamera(socket);
    }

});


let messages = document.querySelector(".chat");
let input = document.querySelector(".chatInput");
const chatForm = document.querySelector(".textInput")

const usernameForm = document.querySelector("#usernameForm");

/* ---------- set username ---------- */

if(usernameForm) {
    usernameForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const usernameInput = document.querySelector("#usernameInput");
        const username = usernameInput.value;
        socket.emit("setUsername", username);
    });

    socket.on("userSet", (data) => {
        // change url to /chat
        // window.location.href = "/chat";

        const usernameFormContainer = document.querySelector(
            "#usernameForm"
          );
        usernameFormContainer.style.display = "none";
    })
}

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
