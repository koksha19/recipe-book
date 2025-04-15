# Recipe book

## Description

This repo contains code for a recipe book app.

## Project installation and setup

### Node.js installation
To try this app Node.js has to be installed on your computer.
To check if it is installed run the following command:

```bash
node -v
```

If you get the version number, you're good to go. Otherwise, visit
[Node.js](https://nodejs.org/en/download) for installation.

### Cloning
After that, make a local copy of this repository by running this command:

```bash
git clone https://github.com/koksha19/recipe-book.git
```

### Installing dependencies
Now, you have to install necessary dependencies for both backend and 
frontend. Firstly, checkout to backend folder by running
```bash
cd backend
```
from the root folder of this repo. Now, run this command to install dependencies:
```bash
npm install
```
Secondly, checkout to frontend folder and run the same command.

### Creating environment variables

In the backend folder you need to create a .env file and paste two variables:

```bash
PORT=3000
API_URL='https://www.themealdb.com/api/json/v1/1'
```

## Launching

To launch the project you have to open terminals for backend and frontend folders.
Run:
```bash
npm run dev
```
in both terminals to start API and frontend servers. The frontend app is
running on ``` http://localhost:5173/ ```.