import io from 'socket.io-client'; 
import { useState, useEffect } from 'react'; 
const socket = io("/"); 

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, []);

  const reciveMessage = (message) => setMessages((state) => [...state, message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-4">Live Chat</h1>
        <div className="mb-4">
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>

      <ul className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-lg space-y-2">
        {messages.map((message, i) => (
          <li key={i} className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">{message.from}</span>: 
            <span className="text-gray-600">{message.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
