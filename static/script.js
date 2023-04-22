const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");

sendBtn.addEventListener("click", async () => {
  const question = userInput.value.trim();
  if (question) {
    addMessage("user", question);
    userInput.value = "";
    const response = await fetchChatbotResponse(question);
    addMessage("assistant", response);
  }
});

function addMessage(role, content) {
  const message = document.createElement("div");
  message.className = "message";
  message.innerHTML = `<span class="${role}">${role === "user" ? "You" : "Assistant"}:</span> ${content}`;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function fetchChatbotResponse(question) {
  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  return data.response;
}
