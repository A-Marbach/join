# Join_WN – Kanban Task Manager

This project is a Kanban-style task management application built with JavaScript.  
It focuses on drag-and-drop interaction, task organization, and a clean user experience.

The application demonstrates frontend logic, DOM manipulation, and lightweight backend integration for persistent data storage.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Running Locally](#running-locally)
- [Docker Deployment](#docker-deployment)
- [Project Purpose](#project-purpose)
- [Extras](#extras)

---

![image](https://user-images.githubusercontent.com/113894308/231970925-2c054d65-0989-4e01-9436-3d02ed0919e7.png)
![image](https://user-images.githubusercontent.com/113894308/231971068-45141932-231d-49e8-9283-8f96b0e6486e.png)

---

## Features

- Create, edit, and delete tasks
- Drag & drop Kanban board (To Do / In Progress / Done)
- Assign tasks to users
- Create and manage subtasks
- Persistent storage via lightweight backend (`server.js`)

---

## Tech Stack

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.Js
- Express

**Optional:**
- Docker

---

## Running Locally

1. Clone the repository:

```bash
git clone git@github.com:A-Marbach/join.git
cd join
```

2. Install dependencies:
``` bash
npm install
node server.js
```
* Access the app at http://localhost:3000

## Docker Deployment

# Docker ensures consistent deployment across environments

Build and run the Docker container:
```bash
docker build -t join .
docker run -d -p 3000:3000 join
```

* Access the app at http://<VM_IP>:3000 (replace <VM_IP> with the IP address of your VM)
* Your server runs isolated in a container, making it portable and reproducible


## Project Purpose

This project was built to demonstrate:

- Focus on scalable frontend architecture, state handling, and interactive UI patterns using JavaScript 
- DOM manipulation and UI logic  
- Drag & drop interactions (Kanban system)  
- Basic backend integration with Node.js  
- Application deployment using Docker (optional)  

---

## Extras

- The project can be extended with authentication  
- Additional backend persistence improvements are possible  
- UI can be enhanced with frameworks (e.g. Angular or React)  

---

> Note: Environment variables or sensitive data should never be committed to the repository.