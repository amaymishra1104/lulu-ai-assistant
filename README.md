# 🤖 Lulu AI Assistant

<div align="center">

### An intelligent, knowledge-grounded AI assistant for Lulu Hypermarket

**AI • RAG • LLMs • Multi-Agent Routing • Customer Support • Full-Stack**

<br/>

<a href="https://github.com/amaymishra1104">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>

<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/AI-Groq%20%7C%20Llama%203.3-8A2BE2?style=for-the-badge" alt="AI"/>
<img src="https://img.shields.io/badge/RAG-Enabled-FF6F00?style=for-the-badge" alt="RAG"/>

<br/><br/>

> **A production-oriented conversational AI system designed to answer customer questions using structured business data, retrieval-augmented generation, specialized agents, and an LLM-powered response layer.**

</div>

---

## 🌟 Overview

**Lulu AI Assistant** is a full-stack conversational AI application designed to provide intelligent customer support for **Lulu Hypermarket**.

Instead of treating every customer query as a generic chatbot conversation, the system uses a combination of:

* 🧠 **Large Language Models**
* 🔎 **Retrieval-Augmented Generation (RAG)**
* 🧩 **Specialized task agents**
* 📦 **Structured business data**
* 🗃️ **Vector-based semantic retrieval**
* 💬 **Conversation memory**
* 🌐 **React-based chat interface**
* ⚡ **Express REST API**

This allows the assistant to handle different classes of questions through different processing paths.

For example:

```text
Customer
   │
   ▼
"What is the refund policy?"
   │
   ▼
Query Router
   │
   ├──────────────► RAG
   │
   │                ↓
   │          Knowledge Base
   │                ↓
   │          Semantic Search
   │                ↓
   │          Relevant Context
   │                ↓
   │              LLM
   │
   ▼
Customer-friendly Response
```

While structured queries can be routed to specialized agents:

```text
Customer Query
      │
      ▼
┌───────────────────┐
│    Query Router   │
└─────────┬─────────┘
          │
    ┌─────┼─────┬─────────┐
    ▼     ▼     ▼         ▼
 Orders Offers Stores    RAG
    │     │     │         │
    └─────┴─────┴─────────┘
              │
              ▼
       Response Formatter
              │
              ▼
             LLM
              │
              ▼
           Response
```

---

# ✨ Key Features

## 🤖 AI-Powered Customer Support

The assistant can understand natural-language questions and generate concise, customer-friendly responses.

The response layer uses:

**Groq + Llama 3.3 70B**

with a low-temperature configuration to keep responses more deterministic.

---

## 🔎 Retrieval-Augmented Generation

For knowledge-base questions, the system follows a retrieval-first approach instead of relying entirely on the model's internal knowledge.

The pipeline is approximately:

```text
User Question
      │
      ▼
Generate Query Embedding
      │
      ▼
Semantic Similarity Search
      │
      ▼
Retrieve Relevant Documents
      │
      ▼
Top 5 Results
      │
      ▼
Build Context
      │
      ▼
LLM
      │
      ▼
Grounded Answer
```

The project uses:

**`Xenova/all-MiniLM-L6-v2`**

for local feature extraction and semantic embeddings.

Retrieved documents are ranked using **cosine similarity** before the most relevant results are passed into the generation layer.

---

# 🧩 Specialized AI Agents

One of the main design decisions in this project is separating domain-specific tasks into specialized agents rather than forcing one generic handler to process everything.

## 📦 Order Agent

Handles order-tracking requests.

Example:

```text
Track ORD124
```

The agent:

1. Extracts the Order ID
2. Validates the identifier
3. Looks up the order
4. Retrieves structured order information
5. Passes the data to the response formatter
6. Generates a natural-language response

---

## 🏷️ Offers Agent

Handles offer-related queries.

The system can filter available offers based on relevant categories such as:

```text
Electronics
Fashion
```

The resulting structured data is then transformed into a customer-friendly response using the LLM.

---

## 🏬 Store Agent

Handles store-related questions.

The agent can work with:

* Cities
* Countries
* Store information
* Store timings
* Location-related queries

It also handles ambiguous requests such as:

> "What are the store timings?"

by asking the user to specify a city rather than guessing.

---

# 🧠 Knowledge Base

The project includes a local knowledge layer containing structured and unstructured information.

```text
knowledge/
│
├── offers.json
├── orders.json
├── stores.json
│
└── website/
    ├── FAQs.txt
    ├── courier-delivered-products.txt
    ├── delivery-charge-policy.txt
    ├── items_return-policy.txt
    ├── refund-policy.txt
    ├── return-policy.txt
    └── terms.txt
```

This allows the assistant to answer questions using project-specific information rather than relying solely on general model knowledge.

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                        USER                                │
│                                                             │
│             React Chat Interface                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP POST /chat
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     EXPRESS SERVER                          │
│                                                             │
│                     Chat Route                              │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     ROUTER LAYER                            │
│                                                             │
│                  Query Classification                       │
└───────────────┬─────────────┬───────────────┬───────────────┘
                │             │               │
                ▼             ▼               ▼
        ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
        │ Order Agent │ │Offers Agent │ │ Store Agent │
        └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
               │               │               │
               └───────────────┼───────────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │   Agent Formatter  │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │    Groq / Llama     │
                    │       3.3 70B       │
                    └──────────┬─────────┘
                               │
                               ▼
                         AI Response


        ┌──────────────────────────────────────┐
        │              RAG PIPELINE             │
        │                                      │
        │ Knowledge Base → Chunking → Embedding│
        │       → Vector Store → Retrieval     │
        │       → Context → LLM Response       │
        └──────────────────────────────────────┘
```

---

# 🔄 Request Lifecycle

A typical customer request follows this flow:

### 1. User sends a message

The React frontend sends:

```http
POST /chat
```

with:

```json
{
  "message": "How much is delivery?"
}
```

---

### 2. Backend receives the request

The Express server accepts the request and passes it to the routing layer.

---

### 3. Message is stored

The application stores the user message in conversation memory.

---

### 4. Query is routed

Depending on the type of request, the system selects an appropriate processing path.

```text
Order Query   → Order Agent
Offer Query   → Offers Agent
Store Query   → Store Agent
Policy / FAQ  → RAG
```

---

### 5. Relevant information is retrieved

For RAG queries, the system:

* Generates an embedding
* Compares semantic similarity
* Ranks available chunks
* Retrieves the top results
* Builds the context

---

### 6. LLM generates the response

The selected information is provided to the LLM with explicit grounding instructions.

The system instructs the model to:

* Use the supplied context
* Avoid inventing information
* Respond in the user's language
* Clearly communicate when information is unavailable

---

### 7. Response is returned

The backend returns:

```json
{
  "success": true,
  "answer": "..."
}
```

along with conversation history.

---

# 🛡️ Grounded AI Design

A major objective of the RAG layer is to reduce unsupported answers.

The knowledge-grounded prompt explicitly instructs the model to:

```text
Answer ONLY using the provided context.

Do not make up information.

If the answer is not available:
tell the user that the information
could not be found in the knowledge base.
```

This creates a more controlled generation pipeline:

```text
                 User Question
                       │
                       ▼
               Retrieve Evidence
                       │
                       ▼
              Relevant Context
                       │
                       ▼
                 LLM Generation
                       │
                       ▼
              Grounded Response
```

This is preferable to allowing the model to freely answer questions about business policies from its general training knowledge.

---

# 🌍 Multilingual Response Support

The response layer is designed to respond in the **same language as the user**.

This behavior is applied both to:

* RAG responses
* Specialized agent responses

This makes the assistant more suitable for a diverse customer-support environment.

---

# 💬 Conversation Memory

The backend maintains conversation history using a user identifier.

The chat API supports:

```json
{
  "message": "Track my order",
  "userId": "default"
}
```

Messages are stored as:

```text
User Message
     ↓
Conversation Memory
     ↓
Assistant Response
     ↓
Conversation Memory
```

This provides the foundation for maintaining conversational state across requests.

---

# 🎨 Frontend

The frontend is built with:

* **React**
* **Vite**
* **Axios**
* Modern component-based UI

The interface contains:

```text
┌─────────────────────────────────────┐
│ 🛒 Lulu Hypermarket                 │
│    Lulu AI Assistant       ● Online │
├─────────────────────────────────────┤
│                                     │
│        Conversation Area             │
│                                     │
│   User message                      │
│                      AI response    │
│                                     │
├─────────────────────────────────────┤
│ Quick Replies                       │
│                                     │
│ [Return Policy] [Delivery]           │
│ [Refund] [Courier Delivery]          │
│                                     │
│ Ask something...             [➤]    │
└─────────────────────────────────────┘
```

### Frontend responsibilities

* Chat interface
* Message rendering
* Loading state
* Error handling
* Quick replies
* API communication
* Assistant/user message differentiation

---

# 🛠️ Technology Stack

<div align="center">

| Layer               | Technologies                           |
| :------------------ | :------------------------------------- |
| **Frontend**        | React, Vite, Axios                     |
| **Backend**         | Node.js, Express                       |
| **AI / LLM**        | Groq, Llama 3.3 70B                    |
| **Embeddings**      | Xenova Transformers                    |
| **Embedding Model** | all-MiniLM-L6-v2                       |
| **RAG**             | LangChain, custom retrieval pipeline   |
| **Vector Search**   | Vector database / similarity retrieval |
| **Data**            | JSON, TXT, PDF knowledge sources       |
| **API**             | REST                                   |
| **Configuration**   | dotenv                                 |
| **Cross-Origin**    | CORS                                   |

</div>

---

# 📁 Project Structure

```text
lulu-ai-assistant/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInput.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   └── MessageBubble.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── knowledge/
│   │
│   ├── offers.json
│   ├── orders.json
│   ├── stores.json
│   │
│   └── website/
│       ├── FAQs.txt
│       ├── delivery-charge-policy.txt
│       ├── refund-policy.txt
│       ├── return-policy.txt
│       └── ...
│
├── src/
│   │
│   ├── agents/
│   │   ├── offersAgent.js
│   │   ├── orderAgent.js
│   │   └── storeAgent.js
│   │
│   ├── rag/
│   │   ├── buildVectors.js
│   │   ├── chunker.js
│   │   ├── embed.js
│   │   ├── ingest.js
│   │   ├── ragServices.js
│   │   ├── retriever.js
│   │   └── storeChunks.js
│   │
│   ├── routes/
│   │   └── chat.js
│   │
│   ├── services/
│   │   ├── agentFormatter.js
│   │   ├── geminiService.js
│   │   ├── memoryService.js
│   │   └── routerService.js
│   │
│   └── server.js
│
├── package.json
├── .gitignore
└── README.md
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* **Node.js 18+**
* **npm**
* A valid **Groq API key**

---

## 1. Clone the repository

```bash
git clone https://github.com/amaymishra1104/lulu-ai-assistant.git

cd lulu-ai-assistant
```

---

## 2. Install backend dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

> Never commit your `.env` file or expose API keys publicly.

---

## 4. Start the backend

```bash
node src/server.js
```

The backend will run on:

```text
http://localhost:5000
```

You should see:

```text
=== LULU SERVER V2 ===
Server running on port 5000
```

---

# 🎨 Running the Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a local development URL, typically:

```text
http://localhost:5173
```

Open it in your browser and start chatting with Lulu AI Assistant.

---

# 🔐 Environment Variables

| Variable       | Description                    |
| :------------- | :----------------------------- |
| `GROQ_API_KEY` | API key used for LLM inference |
| `PORT`         | Backend server port            |

Example:

```env
GROQ_API_KEY=your_secret_key
PORT=5000
```

---

# 💡 Example Queries

The assistant can handle different categories of questions.

### 📦 Orders

```text
Track ORD124
```

```text
Where is ORD125?
```

---

### 🏷️ Offers

```text
Show me electronics offers
```

```text
What fashion offers are available?
```

---

### 🏬 Stores

```text
What are the store timings in Dubai?
```

```text
Show Lulu stores in Doha
```

---

### 📄 Policies & FAQs

```text
What is the return policy?
```

```text
How much is delivery?
```

```text
What is the refund process?
```

```text
Can courier-delivered products be returned?
```

---

# 🧪 Example Architecture in Practice

### Query:

```text
"What is Lulu's refund policy?"
```

### Processing

```text
User
 │
 ▼
React UI
 │
 ▼
POST /chat
 │
 ▼
Express
 │
 ▼
Router
 │
 ▼
RAG Pipeline
 │
 ├── Embed question
 │
 ├── Compare vectors
 │
 ├── Rank results
 │
 └── Retrieve top 5
 │
 ▼
Relevant policy context
 │
 ▼
Llama 3.3 70B
 │
 ▼
Grounded answer
 │
 ▼
React UI
```

---

# 📌 Design Decisions

## Why use RAG?

Business information such as:

* policies
* delivery charges
* returns
* refunds
* FAQs

can change over time.

Rather than expecting an LLM to remember this information accurately, the application retrieves relevant knowledge at query time.

---

## Why use specialized agents?

Different tasks have different requirements.

An order lookup requires structured data access.

A store query requires location-based filtering.

An FAQ requires semantic retrieval.

Separating these responsibilities makes the system easier to reason about and extend.

---

## Why use an LLM after retrieving structured data?

The raw data isn't necessarily the best user experience.

For example:

```json
{
  "orderId": "ORD124",
  "status": "Delivered",
  "date": "..."
}
```

can be transformed into a natural customer response through the LLM.

This separates:

**Data retrieval**

from

**Natural-language generation**

---

# 🔮 Future Improvements

The current architecture provides a foundation that can be extended significantly.

Potential improvements include:

* [ ] Persistent conversation storage
* [ ] Authentication and user accounts
* [ ] Streaming LLM responses
* [ ] Better intent classification
* [ ] More specialized agents
* [ ] Improved retrieval evaluation
* [ ] RAG citations / source references
* [ ] Conversation summarization
* [ ] Redis-based session storage
* [ ] Production-grade vector database
* [ ] Automated evaluation of responses
* [ ] Observability and structured logging
* [ ] Rate limiting
* [ ] API authentication
* [ ] Better error recovery
* [ ] Automated CI/CD
* [ ] Comprehensive unit and integration tests

---

# 🔒 Security Considerations

The application is designed with several important boundaries in mind.

### API keys

Secrets should be stored using environment variables.

```text
.env
```

should never be committed to Git.

### Knowledge grounding

The RAG prompt explicitly limits answers to retrieved context.

### Input validation

Structured requests such as order tracking validate the expected Order ID format before attempting a lookup.

### Controlled generation

The LLM is instructed not to fabricate information when the knowledge base does not contain an answer.

---

# 📈 What This Project Demonstrates

This project goes beyond a basic chatbot implementation.

It demonstrates experience with:

```text
                    AI APPLICATION
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
       LLMs             RAG        Specialized Agents
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
                   Backend APIs
                         │
                         ▼
                    Data Layer
                         │
                         ▼
                   React Frontend
```

### Engineering concepts demonstrated

* AI/LLM integration
* Retrieval-Augmented Generation
* Semantic search
* Embeddings
* Vector similarity
* Agent-based architecture
* REST API development
* Backend routing
* Structured data processing
* Conversation memory
* React component architecture
* Error handling
* Environment-based configuration
* Full-stack integration

---

# 🌐 Application

### Frontend

**Lulu AI Assistant**

A conversational interface for interacting with the assistant.

### Backend

**Express API**

Responsible for:

* request handling
* routing
* agents
* retrieval
* memory
* LLM interaction

---

# 🧑‍💻 Author

<div align="center">

### Amay Mishra

**Software Engineer | AI/ML | Agentic Systems | Full-Stack**

I enjoy building intelligent systems that combine **AI with practical software engineering**.

<br/>

<a href="https://github.com/amaymishra1104">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://www.linkedin.com/">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

</div>

---

<div align="center">

## ⭐ If you found this project interesting, consider giving it a star.

### Built with curiosity, AI, and a lot of debugging.

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&height=130&section=footer" width="100%"/>

</div>
