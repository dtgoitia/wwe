require('dotenv').config();
require('console-stamp')(console, 'HH:MM:ss.l');

const TogglClient = require('toggl-api');
const t = new TogglClient({ apiToken: process.env.TOGGLE_TOKEN })
/*
ASYNC
  getClients()
  Filter by name and get id value.

  getClientProjects(clientId)
  get array with all of projectId of the client

ASYNC
  getTimeEntries()
  await for projectId array
  filter all the tasks matching projectId
  calculate the total amount hours spend in the client

ASYNC
  calculate theoretical hours you should have worked until today

TogglApi docs:
  http://7eggs.github.io/node-toggl-api/TogglClient.html
*/
console.log('.a');