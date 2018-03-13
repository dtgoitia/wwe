"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
if (process.env.ENV && process.env.ENV.toLocaleLowerCase() === 'test') {
    // TODO: change "ENV" value in .env file
    require('console-stamp')(console, 'HH:MM:ss.l');
}
require("./TogglPromise");
const Logic_1 = require("./Logic");
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
const startDate = new Date(Date.UTC(2018, 2, 5));
const endDate = new Date();
function processData(data) {
    // Join entries that are in the same day and return an array with worked hours per day
    const workedHours = Logic_1.TotalHours(data);
    console.log(`workedHours = ${workedHours}`);
    // const totalHoursToDo = HoursToDo(new Date(Date.UTC(2018, 1, 5)), new Date());
    // console.log(`totalHoursToDo = ${totalHoursToDo}`);
    return workedHours;
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const clientsArray = yield TogglPromise_1.getClientsPromise(t);
        const clientId = clientsArray.filter(client => {
            return client.name === 'Software Imaging';
        })[0]
            .id;
        const projectArray = yield TogglPromise_1.getClientProjectsPromise(t, clientId, true);
        const projectIdArray = projectArray.map(project => project.id);
        const entryArray = yield TogglPromise_1.getTimeEntriesPromise(t, startDate, endDate);
        const workedSeconds = entryArray
            .filter(timeEntry => projectIdArray.includes(timeEntry.pid))
            .map(timeEntry => timeEntry.duration)
            .reduce((total, entry) => total + entry);
        const workedHours = Logic_1.SecondsToHours(workedSeconds);
        console.log(`workedSeconds = ${workedSeconds}`);
        console.log(`workedHours = ${workedHours}`);
    });
})();
//# sourceMappingURL=index.js.map