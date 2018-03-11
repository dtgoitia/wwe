"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const index_1 = require("./index");
describe('Total hours', () => {
    it('should return 1', () => {
        const data = [
            { date: new Date(), duration: 3100 },
            { date: new Date(), duration: 200 },
            { date: new Date(), duration: 300 }
        ];
        chai_1.expect(1).to.equal(index_1.TotalHours(data));
    });
});
xdescribe('Hours to do', () => {
    it('should return 7.5', () => {
        // expect(7.5).to.equal(HoursToDo(new Date()));
        chai_1.expect(7.5).to.equal(index_1.HoursToDo(new Date(Date.UTC(2018, 1, 5)), new Date()));
    });
});
describe('Beginning of week', () => {
    it('should return 1', () => chai_1.expect(1).to.equal(index_1.BeginingOfWeek(new Date(Date.UTC(2018, 0, 1))).getDay()));
    it('should return 1', () => chai_1.expect(1).to.equal(index_1.BeginingOfWeek(new Date(Date.UTC(2018, 0, 2))).getDay()));
    it('should return 1', () => chai_1.expect(1).to.equal(index_1.BeginingOfWeek(new Date(Date.UTC(2018, 0, 3))).getDay()));
    it('should return 1', () => chai_1.expect(1).to.equal(index_1.BeginingOfWeek(new Date(Date.UTC(2018, 0, 4))).getDay()));
    it('should return 1', () => chai_1.expect(1).to.equal(index_1.BeginingOfWeek(new Date(Date.UTC(2018, 0, 5))).getDay()));
    it('should return 1', () => chai_1.expect(1).to.equal(index_1.BeginingOfWeek(new Date(Date.UTC(2018, 0, 6))).getDay()));
    it('should return 1', () => chai_1.expect(1).to.equal(index_1.BeginingOfWeek(new Date(Date.UTC(2018, 0, 7))).getDay()));
});
describe('End of week', () => {
    it('should return 5', () => chai_1.expect(5).to.equal(index_1.EndOfWeek(new Date(Date.UTC(2018, 0, 1))).getDay()));
    it('should return 5', () => chai_1.expect(5).to.equal(index_1.EndOfWeek(new Date(Date.UTC(2018, 0, 2))).getDay()));
    it('should return 5', () => chai_1.expect(5).to.equal(index_1.EndOfWeek(new Date(Date.UTC(2018, 0, 3))).getDay()));
    it('should return 5', () => chai_1.expect(5).to.equal(index_1.EndOfWeek(new Date(Date.UTC(2018, 0, 4))).getDay()));
    it('should return 5', () => chai_1.expect(5).to.equal(index_1.EndOfWeek(new Date(Date.UTC(2018, 0, 5))).getDay()));
    it('should return 5', () => chai_1.expect(5).to.equal(index_1.EndOfWeek(new Date(Date.UTC(2018, 0, 6))).getDay()));
    // it('should return 5', () => expect(5).to.equal(EndOfWeek(new Date(Date.UTC(2018,0,7))).getDay()));
});
//# sourceMappingURL=index.test.js.map