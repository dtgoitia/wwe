interface IEntry {
  duration: number;
  // TODO move this to a separate file
}

export function SecondsToHours(sec: number): number{
  return sec/3600;
}

export function MillisecondsToHours(sec: number): number{
  return sec/3600000;
}

export function MillisecondsToDays(sec: number): number{
  return sec/(24*3600*1000);
}

export function TotalHours(data: IEntry[]): number {
  // TODO data argument implement appropiate interface
  // IEntry is provisional
  return data.map((entry: IEntry) => {
    return SecondsToHours(entry.duration)
  }).reduce((total:number, h: number) => total + h);
}

export function BeginingOfWeek(date: Date): Date {
  const oneDay: number = 24 * 60 * 60 * 1000 // in milliseconds
  let returnDate: Date = date;
  let weekDay: number = returnDate.getDay();
  let kk: any;
  while (weekDay !== 1) {
    if ( weekDay === 0) {
      returnDate.setTime(returnDate.getTime() + oneDay);
      weekDay = returnDate.getDay();
    } else {
      returnDate.setTime(returnDate.getTime() - oneDay);
      weekDay = returnDate.getDay();
    }
  }
  return returnDate;
}

export function EndOfWeek(date: Date): Date {
  const oneDay: number = 24 * 60 * 60 * 1000 // in milliseconds
  let returnDate: Date = date;
  let weekDay: number = returnDate.getDay();
  while (weekDay !== 5) {
    if ( weekDay === 0) {
      returnDate.setTime(returnDate.getTime() - oneDay);
      weekDay = returnDate.getDay();
    } else if (weekDay >= 1){
      returnDate.setTime(returnDate.getTime() + oneDay);
      weekDay = returnDate.getDay();
    } else {
      returnDate.setTime(returnDate.getTime() - oneDay);
      weekDay = returnDate.getDay();
    }
  }
  return returnDate;
}

export function DaysBetweenDates(start: Date, end: Date): number {
  const timeStart: number = MillisecondsToDays(start.getTime());
  const timeEnd: number = MillisecondsToDays(end.getTime());
  return timeEnd - timeStart;
}

export function HoursToDo(start: Date, end: Date): number {
  const firstDay: Date = BeginingOfWeek(start);
  const lastDay: Date = EndOfWeek(end);
  const days: number = DaysBetweenDates(firstDay, lastDay) + 1;
  const remainderDays: number = days % 7;
  const wholeWeeks: number = (days - remainderDays) / 7;
  const workingDays: number = wholeWeeks * 5 + remainderDays;
  const workingHours: number = 7.5 * workingDays;

  // console.log(`workingHours: ${workingHours}`);
  return workingHours;
}