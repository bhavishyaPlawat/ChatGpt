# Full-Stack AI Chatbot with RAG & Dual-Memory

A robust, full-stack AI chat application that replicates the ChatGPT experience with an advanced twist: **Persistent Memory**. By leveraging **Retrieval-Augmented Generation (RAG)**, this application allows the AI to "remember" past conversations (Long-Term Memory) while maintaining the context of the current session (Short-Term Memory).

## 🌟 Key Features

### 🧠 Advanced AI Capabilities
* **Hybrid Memory System:**
    * **Short-Term Memory (STM):** Uses MongoDB to fetch the last 20 messages of the current chat session for immediate context.
    * **Long-Term Memory (LTM):** Uses **Pinecone Vector Database** to semantically search and retrieve relevant information from *any* past conversation the user has had.
* **Google Gemini Integration:** Powered by `gemini-2.5-flash` for fast responses and `gemini-embedding-001` for vector embeddings.

### 💻 Frontend (Client)
* **Modern React Stack:** Built with React 19, Vite, and React Router v7.
* **Real-Time Messaging:** Instant bi-directional communication using `socket.io-client`.
* **Markdown Support:** Renders AI responses with code highlighting using `react-markdown` and `react-syntax-highlighter`.
* **Authentication UI:** Dedicated pages for Login, Registration, and Chat interface.

### ⚙️ Backend (Server)
* **Architecture:** Node.js & Express.js with a modular structure (Controllers, Services, Routes).
* **Secure Auth:** HTTP-only Cookie-based authentication with JWT.
* **Vector Storage:** Seamless integration with Pinecone for storing and querying vector embeddings.

---

## 🛠️ Technology Stack

| Component | Tech |
| :--- | :--- |
| **Frontend** | React, Vite, Axios, Socket.io-Client, React Router DOM |
| **Backend** | Node.js, Express.js, Socket.io, Mongoose |
| **Database** | MongoDB (Relational Data), Pinecone (Vector Data) |
| **AI Models** | Google Gemini Flash 2.5 (Text), Gemini Embedding 001 (Vectors) |
| **Auth** | JSON Web Token (JWT), BCryptJS, Cookie-Parser |

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* MongoDB installed locally or a MongoDB Atlas URI
* Google Gemini API Key
* Pinecone API Key

### 1. Backend Setup

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PINECONE_API_KEY=your_pinecone_api_key
    GOOGLE_API_KEY=your_google_gemini_api_key
    ```
    *Note: Ensure your Pinecone index is named `chat-gpt` with `768` dimensions.*

4.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

---

## 📂 Project Structure

### Backend (`/backend`)
* **`src/controller/`**: Handles HTTP requests (e.g., `createChat`, `getMessages`).
* **`src/models/`**: Mongoose schemas for `User`, `Chat`, and `Message`.
* **`src/services/`**: External API logic.
    * `ai.service.js`: Configures Google Gemini.
    * `vector.service.js`: Manages Pinecone embeddings.
* **`src/sockets/`**: Core RAG logic and real-time event handling.

### Frontend (`/frontend`)
* **`src/api/`**: Centralized Axios instances for API calls.
* **`src/pages/`**: Main views (`Landing`, `Login`, `Register`, `ChatLayout`).
* **`src/components/`**: Reusable UI components.

---

## ⚡ How It Works (The RAG Pipeline)

1.  **User Input:** You send a message via the frontend.
2.  **Vectorization:** The backend receives the message and converts it into a vector embedding using `gemini-embedding-001`.
3.  **Context Retrieval:**
    * **LTM:** The system queries Pinecone for the top 5 most similar past messages.
    * **STM:** The system queries MongoDB for the last 20 messages in the current chat.
4.  **Augmented Generation:** The AI receives a prompt containing both the retrieved history (LTM) and the immediate conversation (STM).
5.  **Response & Storage:** The AI generates a response, which is sent back to the user via Socket.io. Simultaneously, this response is vectorized and stored in Pinecone for future recall.

---

## 🔒 Authentication

The application uses a secure authentication flow:
* **Registration/Login:** Returns a JWT (JSON Web Token).
* **Session Management:** The token is stored in an HTTP-Only cookie, preventing XSS attacks.
* **Socket Auth:** The Socket.io connection parses the cookie to validate the user before allowing message exchange.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your features or fixes.
