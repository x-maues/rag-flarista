import os
from typing import List
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from langchain_community.document_loaders import DirectoryLoader, TextLoader, UnstructuredMarkdownLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from contextlib import asynccontextmanager
import uuid

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in environment variables")
genai.configure(api_key=GOOGLE_API_KEY)

# session storage for chat history
chat_sessions = {}

app = FastAPI(title="Flare dApp Builder Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    prompt: str
    session_id: str = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

# Global variables
vector_db = None
qa_chain = None
general_chat_chain = None

#### System instruction: here you can define what your chatbot should behave like, tell it what it is supposed to be


FLARE_SYSTEM_INSTRUCTION = """
You are Flarista, aspecialized AI assistant for Flare blockchain developers. Your purpose is to help developers build decentralized applications (dApps) on the Flare network.
You are an experienced software developer with expertise in web development and blockchain developement (dApps). You a Solidity jedi and can build extensive end to end solidity protocols, upto modern standards.

Core information about Flare:
- Flare is a blockchain network that enables smart contracts with data from other chains
- Key features include the State Connector, the Flare Time Series Oracle (FTSO), and the FAssets system
- Flare uses the Avalanche consensus protocol with the Federated Byzantine Agreement (FBA)
- Native token is FLR, used for network fees and FTSO delegations
- Develops cross-chain applications with EVM compatibility

You might be trained on a knowledge base of Flare docs, and hence you should know technicalities about developing on Flare, along with solidity expertise.

When responding to questions:
1. Prioritize accuracy and clarity in all explanations about Flare technology
2. Provide code examples when appropriate, using Solidity for smart contracts
3. Reference official Flare documentation concepts when possible
4. Be helpful and supportive to developers at all skill levels
5. If you don't know something specific about Flare, be honest about limitations

Your goal is to make developing on Flare more accessible and help users understand the unique value propositions of the Flare network.
"""

#### in the backend/docs folder, paste any text, md, mdx files you want to include in the knowledge base of the bot

def load_and_chunk_docs(directory='docs'):
    print(f"----- Loading documents from '{directory}' -----")
    try:
        if not os.path.exists(directory):
            print(f"ERROR: Directory '{directory}' not found. RAG will be unavailable.")
            return None

        loaders = []

        # TextLoader for .txt files
        txt_loader = DirectoryLoader(directory, glob="**/*.txt", loader_cls=TextLoader)
        loaders.append(txt_loader)

        # UnstructuredMarkdownLoader for .md and .mdx files - handles markdown better
        md_loader = DirectoryLoader(directory, glob="**/*.md", loader_cls=UnstructuredMarkdownLoader)
        loaders.append(md_loader)
        mdx_loader = DirectoryLoader(directory, glob="**/*.mdx", loader_cls=UnstructuredMarkdownLoader)
        loaders.append(mdx_loader)


        all_documents = []
        for loader in loaders:
            try:
                docs = loader.load()
                all_documents.extend(docs)
                print(f"Loaded {len(docs)} documents from {loader}")
            except Exception as e:
                print(f"Error loading documents with loader: {loader}, error: {e}")

        if not all_documents:
            print(f"ERROR: No documents found after loading from all loaders in '{directory}'. RAG will be unavailable.")
            return None

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(all_documents)
        print(f"SUCCESS: Loaded and chunked {len(chunks)} documents.")
        return chunks
    except Exception as e:
        print(f"ERROR: An unexpected error occurred during document loading: {e}")
        return None

def create_vector_db(chunks):
    print("----- Creating vector database -----")
    if not chunks:
        print("ERROR: No chunks provided. Cannot create vector database.")
        return None
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_db = Chroma.from_documents(chunks, embeddings)
    print("SUCCESS: Vector database created.")
    return vector_db

#### if you have uploaded documents in knowledge base, rag chain is initiated

def create_retrieval_qa_chain(vector_db):
    print("----- Creating RetrievalQA chain -----")
    if vector_db is None:
        print("ERROR: Vector database is None. Cannot create RAG chain.")
        return None
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.4)

    # Use the Flare-specific system instruction
    system_instructions = FLARE_SYSTEM_INSTRUCTION

    prompt = PromptTemplate(
        template=system_instructions + "\n\nContext: {context}\n\nQuestion: {question}",
        input_variables=["context", "question"]
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vector_db.as_retriever(search_kwargs={"k": 5}),
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=False,
    )
    print("SUCCESS: RetrievalQA chain created.")
    return qa_chain

def create_general_chat_chain():
    print("----- Creating general chat chain -----")
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-pro-exp-02-05", temperature=0.7)

    # Use the Flare-specific system instruction for consistency
    prompt_template = f"""
    {FLARE_SYSTEM_INSTRUCTION}

    Chat History: {{history}}

    User Question: {{input}}

    Please provide a helpful response about Flare blockchain. If you don't know the answer because it's not in your knowledge, provide general information about blockchain concepts that might be relevant.
    """

    prompt = PromptTemplate(
        input_variables=["history", "input"],
        template=prompt_template
    )

    general_chat_chain = prompt | llm
    print("SUCCESS: General chat chain created.")
    return general_chat_chain

@asynccontextmanager
async def lifespan(app: FastAPI):
    global vector_db, qa_chain, general_chat_chain
    print("----- Initializing application -----")
    chunks = load_and_chunk_docs()
    vector_db = create_vector_db(chunks)
    qa_chain = create_retrieval_qa_chain(vector_db)
    general_chat_chain = create_general_chat_chain()
    if qa_chain:
        print("RAG AVAILABLE: Ready for Flare-specific questions.")
    else:
        print("RAG UNAVAILABLE: Falling back to general chat.")
    print("----- Application initialization complete -----")
    yield
    print("----- Shutting down application -----")
    # Clean up session data on shutdown
    chat_sessions.clear()

app.router.lifespan_context = lifespan

@app.get("/")
async def health_check():
    print("----- Health check requested -----")
    rag_status = "available" if qa_chain else "unavailable"
    return {"status": "healthy", "rag": rag_status}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, client_request: Request):
    print("\n----- Received chat request -----")

    # Handle session management
    session_id = request.session_id
    if not session_id or session_id not in chat_sessions:
        session_id = str(uuid.uuid4())
        chat_sessions[session_id] = []
        print(f"Created new session: {session_id}")

    messages = request.messages
    prompt = request.prompt

    # Store client IP for logging (optional)
    client_ip = client_request.client.host
    print(f"Client IP: {client_ip}")
    print(f"Session ID: {session_id}")
    print(f"Prompt Received: {prompt}")

    # Build history string from session storage or message history
    if chat_sessions[session_id]:
        history_str = "\n".join([f"{msg.role}: {msg.content}" for msg in chat_sessions[session_id]])
    else:
        history_str = "\n".join([f"{msg.role}: {msg.content}" for msg in messages])

    print(f"History:\n{history_str}")

    try:
        if qa_chain and prompt.strip():
            print("----- Using RAG chain -----")
            result = qa_chain.invoke({"query": prompt, "context": "", "question": prompt})
            response = result['result']
            print(f"RAG response: {response}")
        else:
            print("----- Using general chat chain -----")
            result = general_chat_chain.invoke({"input": prompt, "history": history_str})

            # Extract content from the AIMessage object
            if hasattr(result, 'content'):
                response = result.content
            else:
                response = str(result)

            print(f"General chat response: {response}")

        # Update session history
        chat_sessions[session_id].append(Message(role="user", content=prompt))
        chat_sessions[session_id].append(Message(role="assistant", content=response))

        # Limit history length to prevent memory issues
        if len(chat_sessions[session_id]) > 20:  # Keep last 10 exchanges (20 messages)
            chat_sessions[session_id] = chat_sessions[session_id][-20:]

        return ChatResponse(response=response, session_id=session_id)

    except Exception as e:
        print(f"ERROR: An error occurred during chat processing: {type(e).__name__} - {e}")
        if "is not found for API version" in str(e):
            error_detail = "The specified Gemini model is not available."
        else:
            error_detail = str(e)
        raise HTTPException(status_code=500, detail=error_detail)

@app.post("/api/reset")
async def reset_session(request: Request):
    data = await request.json()
    session_id = data.get("session_id")

    if session_id and session_id in chat_sessions:
        chat_sessions[session_id] = []
        print(f"----- Reset session: {session_id} -----")
        return {"status": "success", "message": f"Session {session_id} reset successfully"}
    else:
        print(f"----- Session not found: {session_id} -----")
        return {"status": "error", "message": "Session not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)