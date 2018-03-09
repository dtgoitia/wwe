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
function MillisecondsToDays(sec) {
    return sec / (24 * 3600 * 1000);
}
exports.MillisecondsToDays = MillisecondsToDays;
function TotalHours(data) {
    // TODO data argument implement appropiate interface
    // IEntry is provisional
    return data.map((entry) => {
        return SecondsToHours(entry.duration);
    }).reduce((total, h) => total + h);
}
exports.TotalHours = TotalHours;
function BeginingOfWeek(date) {
    // TODO Update hard coded date
    return new Date(Date.UTC(2018, 2, 8));
}
exports.BeginingOfWeek = BeginingOfWeek;
function EndOfWeek(date) {
    // TODO Update hard coded date
    return new Date(Date.UTC(2018, 2, 9));
}
exports.EndOfWeek = EndOfWeek;
function DaysBetweenDates(start, end) {
    const timeStart = MillisecondsToDays(start.getTime());
    const timeEnd = MillisecondsToDays(end.getTime());
    return timeEnd - timeStart;
}
exports.DaysBetweenDates = DaysBetweenDates;
function HoursToDo(startDate) {
    const Weekstart = BeginingOfWeek(startDate);
    const WeekEnd = EndOfWeek(startDate);
    const days = DaysBetweenDates(Weekstart, WeekEnd) + 1;
    const workingHours = 7.5 * days;
    console.log(`workingHours: ${workingHours}`);
    return workingHours;
}
exports.HoursToDo = HoursToDo;
//# sourceMappingURL=index.js.map