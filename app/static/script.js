async function sendMessage(){

    let input = document.getElementById("message");

    let message = input.value.trim();


    if(message === "") return;


    let chat = document.getElementById("chat-box");


    // User message
    chat.innerHTML += `

    <div class="message user">

        <div class="bubble">
            ${message}
        </div>

    </div>

    `;


    input.value = "";


    // Typing indicator
    chat.innerHTML += `

    <div class="message bot" id="typing">

        <div class="bubble">
            AI is typing...
        </div>

    </div>

    `;


    chat.scrollTop = chat.scrollHeight;


    try {

        let response = await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:message
            })

        });


        let data = await response.json();


        // Remove typing
        let typing = document.getElementById("typing");

        if(typing){
            typing.remove();
        }


        // AI response
        chat.innerHTML += `

        <div class="message bot">

            <div class="bubble">
                ${data.ai}
            </div>

        </div>

        `;


    }

    catch(error){

        let typing = document.getElementById("typing");

        if(typing){
            typing.remove();
        }


        chat.innerHTML += `

        <div class="message bot">

            <div class="bubble">
                Sorry, something went wrong. Please try again.
            </div>

        </div>

        `;

        console.log(error);

    }


    chat.scrollTop = chat.scrollHeight;

}



function clearChat(){

    document.getElementById("chat-box").innerHTML = `

    <div class="message bot">

        <div class="bubble">
            Hello 👋<br>
            How can I help you today?
        </div>

    </div>

    `;

}



function handleKey(event){

    if(event.key === "Enter"){

        sendMessage();

    }

}