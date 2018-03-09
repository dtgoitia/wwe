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
  // TODO Update hard coded date
  return new Date(Date.UTC(2018, 2, 8));
}

export function EndOfWeek(date: Date): Date {
  // TODO Update hard coded date
  return new Date(Date.UTC(2018, 2, 9));
}

export function DaysBetweenDates(start: Date, end: Date): number {
  const timeStart: number = MillisecondsToDays(start.getTime());
  const timeEnd: number = MillisecondsToDays(end.getTime());
  return timeEnd - timeStart;
}

export function HoursToDo(startDate: Date): number {
  const Weekstart: Date = BeginingOfWeek(startDate);
  const WeekEnd: Date = EndOfWeek(startDate);
  const days: number = DaysBetweenDates(Weekstart, WeekEnd) + 1;
  const workingHours: number = 7.5 * days;

  console.log(`workingHours: ${workingHours}`);
  return workingHours;
}