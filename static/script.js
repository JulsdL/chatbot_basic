const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");

function sendMessage() {
  const question = userInput.value.trim();
  if (question) {
    addMessage("user", question);
    userInput.value = "";
    fetchChatbotResponse(question)
      .then(response => addMessage("assistant", response));
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function addMessage(role, content) {
  const message = document.createElement("div");
  message.className = "message";
  message.innerHTML = `<span class="${role}">${role === "user" ? "You" : "Assistant"}:</span> ${content}`;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  const message = document.createElement("div");
  message.className = "message typing-indicator-container";
  message.innerHTML = `
    <span class="assistant">Assistant:</span>
    <div class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>`;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.querySelector(".typing-indicator-container");
  if (typingIndicator) {
    chatMessages.removeChild(typingIndicator);
  }
}

async function fetchChatbotResponse(question) {
  showTypingIndicator();

  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  hideTypingIndicator();

  const data = await response.json();
  return data.response;
}
