require('dotenv').config();
if (process.env.ENV && process.env.ENV.toLocaleLowerCase() === 'test') {
  // TODO: change "ENV" value in .env file
  require('console-stamp')(console, 'HH:MM:ss.l');
}
 

import './TogglPromise';
import { TotalHours, HoursToDo } from './Logic';
import {
  getClientsPromise,
  getClientProjectsPromise,
  // getProjectTasksPromise
  getTimeEntriesPromise
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

const clients = getClientsPromise(t)
  // .then(clientsArray => clientsArray.map(client => client))  // Return all clients
  .then(clientsArray => clientsArray.filter(client => client.name === 'Software Imaging'))
  .then(clientsArray => clientsArray.length === 1 ? clientsArray[0] : new Error('more than one client is called "Software Imaging"'))
  .then(client => client.id)
  .then(clientId => {
    getClientProjectsPromise(t, clientId, true)
      .then(projectsArray => projectsArray.map(project => project.id))
      .then(projectIdArray => projectIdArray.map(projectId => {
        getTimeEntriesPromise(t, startDate, endDate)
          .then(timeEntries => timeEntries.filter(timeEntry => {
            return projectId === timeEntry.pid;
            // return projectIdArray.includes(timeEntry.pid);
          }).map(timeEntry => {
            return {
              date: timeEntry.start,
              duration: timeEntry.duration
            };
          }))
          .then(data => TotalHours(data))
      })
      .map(x => console.log('lalala',x)))
      // .reduce((totalWorkedAccumulated, hoursPerProject) => {
      //   return totalWorkedAccumulated + hoursPerProject;
      // })
      // .map(x => console.log('lalala',x)))
  });
;


// console.log(`End of the file reached at ${__filename}`);