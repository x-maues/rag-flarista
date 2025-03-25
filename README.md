# Flare RAG Project - User Guide

## Overview 🚀

This project is a **Retrieval-Augmented Generation (RAG)** application.
It enhances the capabilities of language models by allowing them to access and incorporate information from external sources.
This application combines:
    - A backend API built with Python and Flask 🐍
    - A user interface built with Next.js and React ⚛️

Users can interact with a language model through this application, receiving responses that are enriched with relevant external knowledge, making the conversations more informative and context-aware.

## Technologies Used 🛠️

- **Core RAG Components:**
    - **Langchain:**  A framework for developing applications powered by language models. It's used here to orchestrate the RAG pipeline, connecting the language model with the knowledge retrieval process.
    - **Gemini Model:** A powerful language model from Google, used to generate responses. In this project, Gemini is the model that answers user queries, informed by retrieved external knowledge.

- **Frontend:**
    - Next.js (React framework)
    - Tailwind CSS (for styling)
    - JavaScript (programming language)
    - npm (package manager)

- **Backend:**
    - Python (programming language)
    - Flask (web framework)
    - pip (package installer for Python)

## User Guide

This guide will walk you through setting up and running the Flare RAG project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js and npm:**  Required for running the frontend. You can download them from [nodejs.org](https://nodejs.org/).
- **Python:** Required for running the backend. Ensure you have Python 3.7 or higher installed. You can download it from [python.org](https://www.python.org/).

### Setup and Run Instructions

Follow these steps to get the project running:

**1. Clone the repository:**

```bash
git clone <repository_url>
cd flare-rag
```

**2. Setup the Backend:**

- Navigate to the `backend` directory:
  ```bash
  cd backend
  ```
- Create a virtual environment (recommended):
  ```bash
  python -m venv venv
  ```
- Activate the virtual environment:
    - On Windows:
      ```bash
      venv\\Scripts\\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```
- Install the required Python packages:
  ```bash
  pip install -r requirements.txt
  ```
- Run the backend application:
  ```bash
  python app.py
  ```
  The backend server should now be running, typically on `http://127.0.0.1:5000`.

**3. Setup the Frontend:**

- Open a new terminal window and navigate to the `ui` directory:
  ```bash
  cd ui
  ```
- Install the required npm packages:
  ```bash
  npm install
  ```
- Run the frontend development server:
  ```bash
  npm run dev
  ```
  The frontend application should now be running, typically on `http://localhost:3000`.

**4. Access the Application:**

- Open your web browser and go to `http://localhost:3000` to access the Flare RAG application.

### Using the Application

Once both the frontend and backend are running, you can interact with the RAG application through your browser. The user interface should be intuitive, allowing you to input queries and receive responses enhanced by the RAG system.

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

[Specify the license for your project here, e.g., MIT License, Apache 2.0, etc.]

---

**Note:** Replace `<repository_url>` with the actual URL of your project's Git repository.