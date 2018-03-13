require('dotenv').config();
if (process.env.ENV && process.env.ENV.toLocaleLowerCase() === 'test') {
  // TODO: change "ENV" value in .env file
  require('console-stamp')(console, 'HH:MM:ss.l');
}
 

import './TogglPromise';
import { TotalHours, HoursToDo, SecondsToHours } from './Logic';
import {
  getClientsPromise,
  getClientProjectsPromise,
  // getProjectTasksPromise
  getTimeEntriesPromise,
  getProjectNames
} from './TogglPromise';

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
// function selectClient;

let projectIds;
let taskArray;

const startDate = new Date(Date.UTC(2018, 2, 5))
const endDate   = new Date();


function processData(data: any[]|any): number {
  // Join entries that are in the same day and return an array with worked hours per day
  const workedHours: number = TotalHours(data);
  console.log(`workedHours = ${workedHours}`);
  
  // const totalHoursToDo = HoursToDo(new Date(Date.UTC(2018, 1, 5)), new Date());
  // console.log(`totalHoursToDo = ${totalHoursToDo}`);
  return workedHours;
}

(async function () {
  const clientsArray = await getClientsPromise(t)
  const clientId = clientsArray.filter(client => {
    return client.name === 'Software Imaging'
  })
    [0]
    .id;
  const projectArray = await getClientProjectsPromise(t, clientId, true);
  const projectIdArray = projectArray.map(project => project.id);
  const entryArray = await getTimeEntriesPromise(t, startDate, endDate);
  const workedSeconds = entryArray
    .filter(timeEntry => projectIdArray.includes(timeEntry.pid) )
    .map(timeEntry => timeEntry.duration)
    .reduce((total, entry) => total + entry);
  const workedHours = SecondsToHours(workedSeconds);
  console.log(`workedSeconds = ${workedSeconds}`);
  console.log(`workedHours = ${workedHours}`);
  
})()