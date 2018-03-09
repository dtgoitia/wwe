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

export function TotalHours(data: IEntry[]): number {
  // TODO data argument implement appropiate interface
  // IEntry is provisional
  return data.map((entry: IEntry) => {
    return SecondsToHours(entry.duration)
  }).reduce((total:number, h: number) => total + h);
}

export function EndOfWeek(startDate: Date): Date {
  // TODO Update hard coded date
  return new Date(Date.UTC(2018, 2, 9));
}

export function HoursToDo(startDate: Date): number {
  const endDate: Date = EndOfWeek(startDate);
  const timeStart: number = MillisecondsToHours(startDate.getTime());
  const timeEnd: number = MillisecondsToHours(endDate.getTime());
  console.log(timeStart);
  console.log(timeEnd);
  return timeEnd-timeStart;
}