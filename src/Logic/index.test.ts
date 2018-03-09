import { expect } from 'chai';
import 'mocha';

import { TotalHours, HoursToDo } from './index';

describe('Total hours', () => {
  it('should return 1', () => {
    const data = [
      { date: new Date(), duration: 3100 },
      { date: new Date(), duration: 200 },
      { date: new Date(), duration: 300 }
    ];
    expect(1).to.equal(TotalHours(data));
  });
});

describe('Hours to do', () => {
  it('should return 7.5', () => {
    expect(7.5).to.equal(HoursToDo(new Date()));
  });
});

