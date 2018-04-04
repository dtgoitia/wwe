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
const fs = require("fs");
require("./TogglPromise");
const Logic_1 = require("./Logic");
const TogglPromise_1 = require("./TogglPromise");
const TogglClient = require('toggl-api');
const t = new TogglClient({ apiToken: process.env.TOGGLE_TOKEN });
function x(data) { return null; }
function importExcludedDays() {
    const fileHandler = fs.readFileSync('./excludedDays.json', 'utf8');
    const obj = JSON.parse(fileHandler);
    return obj["excludedDays"].length;
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const clientsArray = yield TogglPromise_1.getClientsPromise(t);
        const clientId = clientsArray.filter((client) => {
            return client.name === 'Software Imaging';
        })[0]
            .id;
        const projectArray = yield TogglPromise_1.getClientProjectsPromise(t, clientId, true);
        const projectIdArray = projectArray.map((project) => project.id);
        const startDate = new Date(Date.UTC(2018, 1, 5));
        const endDate = new Date();
        const entryArray = yield TogglPromise_1.getTimeEntriesPromise(t, startDate, endDate);
        const workedSeconds = entryArray
            .filter((timeEntry) => projectIdArray.includes(timeEntry.pid))
            .map((timeEntry) => {
            if (!timeEntry.hasOwnProperty("stop")) {
                const startString = timeEntry.start === undefined ? '' : timeEntry.start;
                const start = new Date(startString);
                const now = new Date();
                return Logic_1.SecondsBetweenDates(start, now);
            }
            return timeEntry.duration;
        })
            .reduce((total, entry) => total + entry);
        const workedHours = Logic_1.SecondsToHours(workedSeconds);
        const excludedDays = importExcludedDays();
        const totalHoursToDo = Logic_1.HoursToDo(startDate, endDate, excludedDays);
        const diff = workedHours - totalHoursToDo;
        let diffString;
        diff > 0
            ? diffString = '+' + diff.toFixed(2)
            : diffString = diff.toFixed(2);
        console.log(`  done = ${workedHours.toFixed(2)}`);
        console.log(`  todo = ${totalHoursToDo.toFixed(2)}`);
        console.log(`----------------`);
        console.log(`          ${diffString}  ${Logic_1.FormatHours(Math.abs(diff))}\n\n.`);
    });
})();
//# sourceMappingURL=index.js.map