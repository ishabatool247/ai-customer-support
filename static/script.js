const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");
const chatBox = document.getElementById("chatBox");


const recognition = new (
    window.SpeechRecognition ||
    window.webkitSpeechRecognition
);


recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = false;


// Start voice
startBtn.onclick = () => {

    recognition.start();

    status.innerText = "🎤 Listening...";
    status.className = "listening";

};


// Stop voice
stopBtn.onclick = () => {

    recognition.stop();

    status.innerText = "🛑 Stopped.";

};


// When user speaks
recognition.onresult = async (event) => {

    const text = event.results[0][0].transcript;


    status.innerText = "🤔 Thinking...";
    status.className = "thinking";


    addMessage("You", text);


    const response = await fetch("/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: text
        })

    });


    const data = await response.json();


    addMessage("AI", data.reply);


    status.innerText = "✅ Ready";
    status.className = "";


    const speech = new SpeechSynthesisUtterance(
        data.reply
    );


    speechSynthesis.speak(speech);

};


// Add chat messages
function addMessage(sender, message) {

    const div = document.createElement("div");

    div.className = "message";


    div.innerHTML =
        "<b>" + sender + ":</b> " + message;


    chatBox.appendChild(div);


    chatBox.scrollTop = chatBox.scrollHeight;

}