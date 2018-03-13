import { expect } from 'chai';
import 'mocha';

import {
  TotalHours,
  HoursToDo,
  BeginingOfWeek,
  EndOfWeek
} from './index';
import { IEntry } from './../TogglPromise/IEntry';

describe('Total hours', () => {
  it('should return 1', () => {
    const data: IEntry[] = [
      { date: new Date(), duration: 3100 },
      { date: new Date(), duration: 200 },
      { date: new Date(), duration: 300 }
    ];
    expect(1).to.equal(TotalHours(data));
  });
});

describe('Hours to do', () => {
  it('should return 187.5', () => {
    expect(187.5).to.equal(HoursToDo(
      new Date(Date.UTC(2018, 1, 5)),
      new Date(Date.UTC(2018, 2, 11))
    ));
  });
});

describe('Beginning of week', () => {
  it('should return 1', () => expect(1).to.equal(BeginingOfWeek(new Date(Date.UTC(2018,0,1))).getDay()));
  it('should return 1', () => expect(1).to.equal(BeginingOfWeek(new Date(Date.UTC(2018,0,2))).getDay()));
  it('should return 1', () => expect(1).to.equal(BeginingOfWeek(new Date(Date.UTC(2018,0,3))).getDay()));
  it('should return 1', () => expect(1).to.equal(BeginingOfWeek(new Date(Date.UTC(2018,0,4))).getDay()));
  it('should return 1', () => expect(1).to.equal(BeginingOfWeek(new Date(Date.UTC(2018,0,5))).getDay()));
  it('should return 1', () => expect(1).to.equal(BeginingOfWeek(new Date(Date.UTC(2018,0,6))).getDay()));
  it('should return 1', () => expect(1).to.equal(BeginingOfWeek(new Date(Date.UTC(2018,0,7))).getDay()));
});

describe('End of week', () => {
  it('should return 5', () => expect(5).to.equal(EndOfWeek(new Date(Date.UTC(2018,0,1))).getDay()));
  it('should return 5', () => expect(5).to.equal(EndOfWeek(new Date(Date.UTC(2018,0,2))).getDay()));
  it('should return 5', () => expect(5).to.equal(EndOfWeek(new Date(Date.UTC(2018,0,3))).getDay()));
  it('should return 5', () => expect(5).to.equal(EndOfWeek(new Date(Date.UTC(2018,0,4))).getDay()));
  it('should return 5', () => expect(5).to.equal(EndOfWeek(new Date(Date.UTC(2018,0,5))).getDay()));
  it('should return 5', () => expect(5).to.equal(EndOfWeek(new Date(Date.UTC(2018,0,6))).getDay()));
  it('should return 5', () => expect(5).to.equal(EndOfWeek(new Date(Date.UTC(2018,0,7))).getDay()));
});

