const socket = io(`http://localhost:8000`);

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const bold = document.querySelector(".bold");
const italic = document.querySelector(".italic");
const strikeThrough = document.querySelector(".strikeThrough");
var audio = new Audio("ting.mp3");

const append = (msg, pos) => {
  console.log("hello");
  const msgEl = document.createElement("div");
  msgEl.innerText = msg;
  msgEl.classList.add("message");
  msgEl.classList.add(pos);
  messageContainer.append(msgEl);
  if (pos == "right") return;
  audio.play();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You:${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

const namex = prompt("Enter your name to join");

socket.emit("new-user-joined", namex);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "centre");
});

socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "centre");
});

bold.addEventListener("click", () => {
  messageInput.value = messageInput.value.bold();
});
