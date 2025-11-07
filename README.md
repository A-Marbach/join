# Join_WN

A task manager inspired by the Kanban method. You can create and organize tasks using drag and drop, assign tasks to users and define subtasks.


![image](https://user-images.githubusercontent.com/113894308/231970925-2c054d65-0989-4e01-9436-3d02ed0919e7.png)
![image](https://user-images.githubusercontent.com/113894308/231971068-45141932-231d-49e8-9283-8f96b0e6486e.png)

---

## Features

- Create, edit, and delete tasks
- Drag & drop task organization (Kanban style)
- Assign tasks to users
- Define subtasks
- Persistent storage with mini-backend.js

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Dockerized for easy deployment

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

Build and run the Docker container:
```bash
docker build -t join .
docker run -d -p 3000:3000 join
```

* Access the app at http://<VM_IP>:3000 (replace <VM_IP> with the IP address of your VM)
* Your server runs isolated in a container, making it portable and reproducible


## CI/CD with GitHub Actions
This project includes a GitHub Actions workflow that automatically builds and deploys the Docker container to your VM whenever code is pushed to the main branch.

Workflow Highlights

* Node.js setup and dependency installation
* Docker image build
* SSH deployment to VM

How it works
1. Add the following secrets in your GitHub repository settings:

* SSH_KEY → your private SSH key for the VM
* SSH_USER → username to access the VM
* SSH_HOST → IP address or hostname of the VM
* SSH_PORT → SSH port of the VM (default is 22)

2. On push to main, GitHub Actions:

* Checks out the repository
* Installs dependecies
* Builds the DOcker image
* SSH into your VM and restarts the container

trigger*