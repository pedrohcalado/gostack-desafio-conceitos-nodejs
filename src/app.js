const express = require("express");
const cors = require("cors");
const { v4: uuidv4, uuid } = require('uuid');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepo = {
    id: uuidv4(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(newRepo);
  response.status(201).json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repo = repositories.find((repo) => repo.id === id);
  if (repo) {
    repo.title = title;
    repo.url = url;
    repo.techs = techs;
    response.status(201).json(repo);
  } else {
    response.status(400).json({ message: 'ID inexistente' });
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex((repo) => repo.id === id);
  if (repoIndex !== -1) {
    repositories.splice(repoIndex, 1);
    response.status(204).json();
  } else {
    response.status(400).json({ message: 'ID inexistente' });
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find((repo) => repo.id === id);
  if (repo) {
    repo.likes += 1;
    response.status(201).json(repo);
  } else {
    response.status(400).json({ message: 'ID inexistente' });
  }
});

module.exports = app;
