require('dotenv').config();
if (process.env.ENV && process.env.ENV.toLocaleLowerCase() === 'test') {
  // TODO: change "ENV" value in .env file
  require('console-stamp')(console, 'HH:MM:ss.l');
}
 
import './TogglPromise';
import { TotalHours, HoursToDo, SecondsToHours } from './Logic';
import { getClientsPromise, getClientProjectsPromise, getTimeEntriesPromise,
  getProjectNames } from './TogglPromise';

const TogglClient = require('toggl-api');
const t = new TogglClient({ apiToken: process.env.TOGGLE_TOKEN })

function x(data) { return null; }

(async function () {
  const clientsArray = await getClientsPromise(t)
  const clientId = clientsArray.filter(client => {
    return client.name === 'Software Imaging'
  })
    [0]
    .id;

  const projectArray = await getClientProjectsPromise(t, clientId, true);
  const projectIdArray = projectArray.map(project => project.id);
  
  const startDate = new Date(Date.UTC(2018, 1, 5))
  const endDate   = new Date();
  const entryArray = await getTimeEntriesPromise(t, startDate, endDate);
  const workedSeconds = entryArray
    .filter(timeEntry => projectIdArray.includes(timeEntry.pid) )
    .map(timeEntry => timeEntry.duration)
    .reduce((total, entry) => total + entry);
  const workedHours = SecondsToHours(workedSeconds);
  console.log(`done = ${workedHours.toFixed(2)}`);
  
  const totalHoursToDo = HoursToDo(startDate, endDate);
  console.log(`todo = ${totalHoursToDo.toFixed(2)}`);
  
  console.log(`--------------------`);
  const diff = workedHours - totalHoursToDo;
  console.log(`diff = ${diff.toFixed(2)}\n\n.`);
})()