# 🤖 AI-Powered Multi-Tool Web App  

An AI-powered **full-stack application** with:  
- 💬 **Chat Generator** – Intelligent responses from prompts  
- 🥘 **Recipe Generator** – Suggests recipes based on ingredients, cuisine, and dietary needs  
- 🎙 **Audio Transcriber** – Converts speech to text using OpenAI Whisper API  
- 🎨 **Image Generator** – Creates AI images from text prompts  

Built with **Spring Boot (Java)** for the backend and **React (Vite + MUI)** for the frontend.  

---

## 🚀 Features  

✅ AI Chat Generator (Spring Boot + OpenAI Chat API)  
✅ Recipe Suggestions with dietary restrictions  
✅ Audio-to-Text Transcription (OpenAI Whisper)  
✅ AI-Powered Image Generation (DALL·E / OpenAI API)  
✅ Full-stack integration with error handling  
✅ Responsive & modern UI using Material-UI  

---

## 📂 Project Structure  

```bash
├── backend (Spring Boot)
│   ├── src/main/java/com/example/aiapp
│   │   ├── controller
│   │   │   ├── ChatController.java
│   │   │   ├── RecipeController.java
│   │   │   ├── AudioController.java
│   │   │   └── ImageController.java
│   │   ├── service
│   │   │   ├── ChatService.java
│   │   │   ├── RecipeService.java
│   │   │   ├── AudioService.java
│   │   │   └── ImageService.java
│   │   └── config
│   │       └── OpenAIConfig.java
│   └── resources/application.properties
│
├── frontend (React + Vite)
│   ├── src/pages
│   │   ├── ChatGenerator.jsx
│   │   ├── RecipeGenerator.jsx
│   │   ├── AudioTranscriber.jsx
│   │   └── ImageGenerator.jsx
│   ├── src/components
│   │   ├── Navbar.jsx
│   │   └── ErrorMessage.jsx
│   ├── App.jsx
│   └── main.jsx
│
└── README.md

```
---

## ⚙️ Installation & Setup  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/your-username/projectname.git
cd projectname
````

---

### 2️⃣ Backend (Spring Boot) Setup

```bash
cd backend
./mvnw clean install
```

#### Dependencies (in `pom.xml` from start.spring.io): 

* spring-boot-starter-web
* spring-boot-starter-validation
* spring-boot-starter-json
* lombok
* OpenAI

#### Configure API Key

Set your OpenAI API key in `application.properties`:

```properties
server.port=8080
openai.api.key=your_openai_api_key_here
```

#### Run backend:

```bash
./mvn spring-boot:run
mvn clean package
```

---

### 3️⃣ Frontend (React) Setup

```bash
cd frontend
npm install
npm run dev
```

#### Dependencies:

* react, react-dom
* axios
* @mui/material @mui/icons-material
* tailwindcss (if used)

---

## 🔄 API Endpoints

| Feature           | Endpoint                     | Method | Body / Params                                                                          |
| ----------------- | ---------------------------- | ------ | -------------------------------------------------------------------------------------- |
| Chat Generator    | `/chat`                      | Get   | `{ "prompt": "Hello AI" }`                                                             |
| Recipe Generator  | `/recipe`                    | Get   | `{ "ingredients": ["tomato", "onion"], "cuisine": "Indian", "restrictions": "vegan" }` |
| Audio Transcriber | `/transcribe-audio`          | POST   | `multipart/form-data (audio file)`                                                     |
| Image Generator   | `/generate-image?prompt=...` | Get    | `prompt (query param)`                                                                 |

---

## ⚠️ Error Handling

* **Chat** → `"Unable to generate response. Try again."`
* **Recipe** → `"Failed to generate recipe. Invalid ingredients or server issue."`
* **Audio** → `"Transcription failed. Ensure audio format and API key validity."`
* **Image** → `"Image generation failed. Check tokens or prompt."`

Errors are displayed as styled **MUI alerts in red boxes**.

---

## 📸 Screenshots

### 🔹 Chat Generator

<img width="1220" alt="Recipe Generator" src="https://github.com/user-attachments/assets/fb86bd11-c952-4f9b-be7f-7789c3b334e5" />

### 🔹 Recipe Layout

<img width="959" alt="App Layout" src="https://github.com/user-attachments/assets/24f69fa5-b6d7-434b-b274-2668da472b8a" />

### 🔹 Audio-Transcriber

<img width="948" alt="Chat Generator" src="https://github.com/user-attachments/assets/f13118a7-a283-4895-9514-ca6434a9db99" />

### 🔹 Image Transcriber

<img width="953" alt="Audio Transcriber" src="https://github.com/user-attachments/assets/c04be03a-6723-450f-bb1f-f7970742fc9a" />

---

## 🔑 Future Improvements

* Add **user authentication (JWT / OAuth2)**
* Save **user chat/recipe history** in database
* Multi-language support for **speech-to-text**
* Advanced image customization (sizes, styles, backgrounds)

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch (`feature/xyz`)
3. Commit your changes
4. Push & create a PR

---
