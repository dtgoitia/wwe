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
    const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
    let returnDate = date;
    let weekDay = returnDate.getDay();
    while (weekDay !== 1) {
        if (weekDay === 0) {
            returnDate.setTime(returnDate.getTime() + oneDay);
            weekDay = returnDate.getDay();
        }
        else {
            returnDate.setTime(returnDate.getTime() - oneDay);
            weekDay = returnDate.getDay();
        }
    }
    return returnDate;
}
exports.BeginingOfWeek = BeginingOfWeek;
function EndOfWeek(date) {
    const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
    let returnDate = date;
    let weekDay = returnDate.getDay();
    while (weekDay !== 5) {
        if (weekDay === 0 || weekDay === 6) {
            returnDate.setTime(returnDate.getTime() - oneDay);
            weekDay = returnDate.getDay();
        }
        else {
            returnDate.setTime(returnDate.getTime() + oneDay);
            weekDay = returnDate.getDay();
        }
    }
    return returnDate;
}
exports.EndOfWeek = EndOfWeek;
function DaysBetweenDates(start, end) {
    const timeStart = MillisecondsToDays(start.getTime());
    const timeEnd = MillisecondsToDays(end.getTime());
    return timeEnd - timeStart;
}
exports.DaysBetweenDates = DaysBetweenDates;
function HoursToDo(start, end) {
    const firstDay = BeginingOfWeek(start);
    const lastDay = EndOfWeek(end);
    const days = DaysBetweenDates(firstDay, lastDay) + 1;
    const remainderDays = days % 7;
    const wholeWeeks = (days - remainderDays) / 7;
    const workingDays = wholeWeeks * 5 + remainderDays;
    const workingHours = 7.5 * workingDays;
    // console.log(`workingHours: ${workingHours}`);
    return workingHours;
}
exports.HoursToDo = HoursToDo;
//# sourceMappingURL=index.js.map