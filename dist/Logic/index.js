"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SecondsToHours(sec) {
    return sec / 3600;
}
exports.SecondsToHours = SecondsToHours;
function MillisecondsToHours(sec) {
    return sec / 3600000;
}
exports.MillisecondsToHours = MillisecondsToHours;
function TotalHours(data) {
    // TODO data argument implement appropiate interface
    // IEntry is provisional
    return data.map((entry) => {
        return SecondsToHours(entry.duration);
    }).reduce((total, h) => total + h);
}
exports.TotalHours = TotalHours;
function EndOfWeek(startDate) {
    // TODO Update hard coded date
    return new Date(Date.UTC(2018, 2, 9));
}
exports.EndOfWeek = EndOfWeek;
function HoursToDo(startDate) {
    const endDate = EndOfWeek(startDate);
    const timeStart = MillisecondsToHours(startDate.getTime());
    const timeEnd = MillisecondsToHours(endDate.getTime());
    console.log(timeStart);
    console.log(timeEnd);
    return timeEnd - timeStart;
}
exports.HoursToDo = HoursToDo;
//# sourceMappingURL=index.js.map