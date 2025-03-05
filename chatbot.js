document.addEventListener("DOMContentLoaded", function () {
    const chatBtn = document.getElementById("chatbot-btn");
    const chatWindow = document.getElementById("chat-window");
    const closeChat = document.getElementById("close-chat");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatBody = document.getElementById("chat-body");
    
    // Create welcome message container
    const welcomeMessageContainer = document.createElement("div");
    welcomeMessageContainer.id = "welcome-message";
    welcomeMessageContainer.classList.add("welcome-message", "hidden");
    
    // Style the welcome message using JavaScript
    Object.assign(welcomeMessageContainer.style, {
        position: "fixed",
        bottom: "80px",
        right: "20px",
        backgroundColor: "rgb(40, 35, 105)",
        color: "white",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
        zIndex: "1001",
        maxWidth: "250px",
        textAlign: "center",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
        fontFamily: "'Tajawal', sans-serif"
    });
    
    welcomeMessageContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="flex-grow: 1;">هل تحتاج الى مساعدة</span>
            <button id="dismiss-welcome" style="
                background: none; 
                border: none; 
                color: white; 
                cursor: pointer; 
                margin-left: 10px;
                font-size: 20px;
            ">×</button>
        </div>
    `;
    
    // Function to show welcome message
    function showWelcomeMessage() {
        document.body.appendChild(welcomeMessageContainer);
        
        // Small delay to trigger CSS transition
        setTimeout(() => {
            welcomeMessageContainer.classList.remove("hidden");
            welcomeMessageContainer.style.opacity = "1";
            welcomeMessageContainer.style.transform = "translateY(0)";
        }, 50);
    }
    
    // Function to hide welcome message
    function hideWelcomeMessage() {
        welcomeMessageContainer.style.opacity = "0";
        welcomeMessageContainer.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            if (welcomeMessageContainer.parentNode) {
                document.body.removeChild(welcomeMessageContainer);
            }
        }, 500);
    }
    
    // Show welcome message after 5 seconds
    setTimeout(showWelcomeMessage, 5000);
    
    // Auto-hide after 10 seconds
    const autoHideTimeout = setTimeout(hideWelcomeMessage, 15000);
    
    // Dismiss button functionality
    const dismissButton = welcomeMessageContainer.querySelector("#dismiss-welcome");
    dismissButton.addEventListener("click", () => {
        clearTimeout(autoHideTimeout);
        hideWelcomeMessage();
    });

    // Ensure chat window is hidden by default
    chatWindow.classList.add("hidden");
  
    // Toggle chat window when clicking the chatbot button
    chatBtn.addEventListener("click", function (event) {
        // Remove welcome message if it's still there
        if (document.getElementById("welcome-message")) {
            clearTimeout(autoHideTimeout);
            hideWelcomeMessage();
        }
        
        // If window is hidden, show it
        if (chatWindow.classList.contains("hidden")) {
            chatWindow.classList.remove("hidden");
        } else {
            // If window is already open, hide it
            chatWindow.classList.add("hidden");
        }
        event.stopPropagation(); // Prevents event bubbling to document
    });
  
    // Close chat when clicking outside of the chat window
    document.addEventListener("click", function (event) {
        // Check if chat window is visible and click is outside both window and button
        if (!chatWindow.classList.contains("hidden") && 
            !chatWindow.contains(event.target) && 
            !chatBtn.contains(event.target)) {
            chatWindow.classList.add("hidden");
        }
    });
  
    // Prevent clicks inside the chat window from closing it
    chatWindow.addEventListener("click", function (event) {
        event.stopPropagation();
    });
  
    // Close chat when clicking the close button
    closeChat.addEventListener("click", function () {
        chatWindow.classList.add("hidden");
    });
  
    // Send message function
    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;
  
        // Display user message
        const userMsgElem = document.createElement("p");
        userMsgElem.className = "user-message";
        userMsgElem.textContent = userMessage;
        chatBody.appendChild(userMsgElem);
  
        // Clear input
        userInput.value = "";
  
        // Simulate AI response (Replace this with real API call)
        setTimeout(() => {
            const botMsgElem = document.createElement("p");
            botMsgElem.className = "bot-message";
            botMsgElem.textContent = "هذا مجرد رد تجريبي، استبدل هذا بمنطق الذكاء الاصطناعي.";
            chatBody.appendChild(botMsgElem);
            chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
        }, 1000);
    }
  
    // Send message on button click or Enter key
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});