import { useEffect, useState } from "react";
import io from "socket.io-client";

// URL of your backend server (if running locally, use localhost)
//const socket = io("http://localhost:5000"); // Replace with your backend URL

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Listen for incoming messages
  // useEffect(() => {
  //   socket.on("chat message", (msg) => {
  //     setChatMessages((prevMessages) => [...prevMessages, msg]);
  //   });

  //   // Clean up the socket listener when the component unmounts
  //   return () => {
  //     socket.off("chat message");
  //   };
  // }, []);

  const sendMessage = () => {
    //socket.emit("chat message", message); // Emit the message to the server
    setMessage("chat happened"); // Clear input after sending the message
  };

  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {chatMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
