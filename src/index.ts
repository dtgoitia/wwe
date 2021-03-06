require('dotenv').config();

import fs = require('fs');
import './TogglPromise';
import { TotalHours, HoursToDo, SecondsToHours, SecondsBetweenDates, FormatHours } from './Logic';
import { getClientsPromise, getClientProjectsPromise, getTimeEntriesPromise,
  getProjectNames } from './TogglPromise';
import { IClient } from './TogglPromise/IClient';
import { IProject } from './TogglPromise/IProject';
import { IEntry } from './TogglPromise/IEntry';

const TogglClient = require('toggl-api');
const t = new TogglClient({ apiToken: process.env.TOGGLE_TOKEN })

function x(data: any) { return null; }

function importExcludedDays(): number {
  const fileHandler = fs.readFileSync('./excludedDays.json', 'utf8');
  const obj = JSON.parse(fileHandler);
  return obj["excludedDays"].length;
}

(async function () {
  const clientsArray = await getClientsPromise(t)
  const clientId: string = clientsArray.filter((client: IClient) => {
    return client.name === 'Software Imaging'
  })
    [0]
    .id;

  const projectArray = await getClientProjectsPromise(t, clientId, true);
  const projectIdArray = projectArray.map((project: IProject) => project.id);
  
  const startDate = new Date(Date.UTC(2018, 1, 5))
  const endDate   = new Date();
  const entryArray = await getTimeEntriesPromise(t, startDate, endDate);
  const workedSeconds = entryArray
    .filter((timeEntry: IEntry) => projectIdArray.includes(timeEntry.pid) )
    .map((timeEntry: IEntry) => {
      if (!timeEntry.hasOwnProperty("stop"))
      {
        const startString: string = timeEntry.start === undefined ? '' : timeEntry.start;
        const start: Date = new Date(startString);
        const now: Date = new Date();
        return SecondsBetweenDates(start, now);
      }
      return timeEntry.duration;
    })
    .reduce((total: number, entry: number) => total + entry);
  const workedHours = SecondsToHours(workedSeconds);
  const excludedDays = importExcludedDays();
  const totalHoursToDo = HoursToDo(startDate, endDate, excludedDays);
  const diff = workedHours - totalHoursToDo;
  let diffString: string;
  diff > 0
    ? diffString = '+' + diff.toFixed(2)
    : diffString = diff.toFixed(2)
  
  console.log(`  done = ${workedHours.toFixed(2)}`);
  console.log(`  todo = ${totalHoursToDo.toFixed(2)}`);
  console.log(`----------------`);
  console.log(`          ${diffString}  ${FormatHours(Math.abs(diff))}\n\n.`);
})()