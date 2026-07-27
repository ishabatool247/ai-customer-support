const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = false;

startBtn.onclick = () => {
    recognition.start();
    status.innerText = "🎤 Listening...";
};

stopBtn.onclick = () => {
    recognition.stop();
    status.innerText = "Stopped.";
};

recognition.onresult = async (event) => {

    const text = event.results[0][0].transcript;

    status.innerHTML =
        "<b>You:</b> " + text + "<br><br>Thinking...";

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

    status.innerHTML =
        "<b>You:</b> " + text +
        "<br><br><b>AI:</b> " + data.reply;

    const speech = new SpeechSynthesisUtterance(data.reply);

    speechSynthesis.speak(speech);
};