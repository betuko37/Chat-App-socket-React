import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return; // Prevenir envío de mensajes vacíos
    
    const newMessage = {
      body: message,
      from: 'You'
    };
  
    setMessages([...messages, newMessage]);
    socket.emit("message", newMessage);
    setMessage(""); // Limpiar el estado
    e.target.reset();
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700 text-center">Chat App</h1>
        
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] rounded-lg p-3 ${
                msg.from === 'You' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-700 text-white rounded-bl-none'
              }`}>
                <p className="text-sm font-semibold mb-1">{msg.from}</p>
                <p className="text-sm">{msg.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
