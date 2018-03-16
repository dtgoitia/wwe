"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SecondsToHours(sec) {
    return sec / 3600;
}
exports.SecondsToHours = SecondsToHours;
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
function RoundToDay(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
exports.RoundToDay = RoundToDay;
function SecondsBetweenDates(start, end) {
    const timeStart = start.getTime() / 1000;
    const timeEnd = end.getTime() / 1000;
    return timeEnd - timeStart;
}
exports.SecondsBetweenDates = SecondsBetweenDates;
function DaysBetweenDates(start, end) {
    const timeStart = MillisecondsToDays(RoundToDay(start).getTime());
    const timeEnd = MillisecondsToDays(RoundToDay(end).getTime());
    return timeEnd - timeStart;
}
function HoursToDo(start, end) {
    const firstDay = BeginingOfWeek(start);
    const lastDay = end;
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