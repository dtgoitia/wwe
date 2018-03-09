"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require('console-stamp')(console, 'HH:MM:ss.l');
require("./TogglPromise");
const TogglPromise_1 = require("./TogglPromise");
const TogglClient = require('toggl-api');
const t = new TogglClient({ apiToken: process.env.TOGGLE_TOKEN });
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
// function selectClient;
let projectIds;
let taskArray;
const startDate = new Date(Date.UTC(2018, 1, 5));
const endDate = new Date();
function processData(data) {
    console.log(data);
    // Join entries that are in the same day and return an array with worked hours per day
}
const clients = TogglPromise_1.getClientsPromise(t)
    .then(clientsArray => clientsArray.filter(client => client.name === 'Software Imaging'))
    .then(clientsArray => clientsArray.length === 1 ? clientsArray[0] : new Error('more than one client is called "Software Imaging"'))
    .then(client => client.id)
    .then(clientId => {
    TogglPromise_1.getClientProjectsPromise(t, clientId, true)
        .then(projectsArray => projectsArray.map(project => project.id))
        .then(projectIdArray => projectIdArray.map(projectId => {
        TogglPromise_1.getTimeEntriesPromise(t, startDate, endDate)
            .then(timeEntries => timeEntries.filter(timeEntry => {
            return projectIdArray.includes(timeEntry.pid);
        }).map(timeEntry => {
            // console.log(timeEntry)
            return {
                date: timeEntry.start,
                duration: timeEntry.duration
            };
        }))
            .then((data) => processData(data));
        // .then((x) => console.log(x));
    }));
    // .then(() => console.log(projectIds));
});
console.log(`End of the file reached at ${__filename}`);
//# sourceMappingURL=index.js.map