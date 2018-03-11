import {
  BeginingOfWeek,
  EndOfWeek
} from './Logic';

const date: Date = new Date(Date.UTC(2018,0,6));
console.log(date);
EndOfWeek(date);